import { useCallback, useContext, useMemo, useState } from 'react';
import SceneParser from './SceneParser';
import Canvas from './Canvas';
import { RootSceneElement } from './types/SceneTypes';
import { SceneNode } from './SceneNode';
import {
  selectTextElementValueOrThrow,
  getSceneFromRootElementOrThrow,
  selectElementOrThrow,
  getAttributesOrThrow,
} from './SceneTreeTraversalHelpers';
import { CanvasContext } from './CanvasContextProvider';
import { Size } from './types/Size';

const getSceneSize = (rootSceneElement: RootSceneElement): Size => {
  const scene = getSceneFromRootElementOrThrow(rootSceneElement);
  const sizeElement = selectElementOrThrow(scene, [
    'Canvas',
    'Resolution',
    'Size',
  ]);

  return getAttributesOrThrow<Size>(sizeElement);
};

export const CanvasContainer: React.FC = () => {
  const [scenes, setScenes] = useState<RootSceneElement[]>([]);
  const [, , setSceneSize] = useContext(CanvasContext);

  const handleParsedScenes = useCallback(
    (scenes: RootSceneElement[]) => {
      console.log(scenes);
      if (scenes.length > 0) {
        setScenes(scenes);
        setSceneSize(getSceneSize(scenes[0]));
      }
    },
    [setSceneSize],
  );

  const sceneComponents = useMemo(
    () =>
      scenes.map(rootSceneElement => {
        const scene = getSceneFromRootElementOrThrow(rootSceneElement);
        return (
          <SceneNode
            node={scene}
            path={[]}
            key={selectTextElementValueOrThrow(scene, ['Name'])}
          />
        );
      }),
    [scenes],
  );

  return (
    <>
      <Canvas>
        {sceneComponents}
        {/*   {sceneComponents} */}
        {/*   <Scene position={[50, 5, 0]}>
          <Text
              position={[250, 250, 0]}
              fontSize={80}
              color="black"
              anchorX="left" // 'left', 'center', or 'right'
              anchorY="bottom-baseline" //'top', 'top-baseline', 'top-ex', 'middle', 'bottom-baseline', or 'bottom'
            >
              Hello World
          </Text>
        </Scene>
        <Scene position={[50, 5, 0]}>
          <Text
              position={[250, 250, 0]}
              fontSize={30}
              color="red" 
              anchorX="left" 
              anchorY="bottom-baseline"
            >
            Hello Drei
          </Text>
        </Scene> */}
      </Canvas>
      <div className="tool-container">
        <SceneParser onScenesParsed={handleParsedScenes} />
      </div>
    </>
  );
};
