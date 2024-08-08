import { useCallback, useContext, useMemo, useState } from 'react';
import SceneParser from './SceneParser';
import Canvas from './Canvas';
import { BaseElement, RootSceneElement, TextElement } from './types/SceneTypes';
import {
  selectTextElementValueOrThrow,
  getSceneFromRootElementOrThrow,
  selectElementOrThrow,
  getAttributesOrThrow,
} from './SceneTreeTraversalHelpers';
import { CanvasContext } from './CanvasContextProvider';
import { Size } from './types/Size';
import { SceneGroup } from './SceneGroup';

const getSceneSize = (rootSceneElement: RootSceneElement): Size => {
  const scene = getSceneFromRootElementOrThrow(rootSceneElement);
  const sizeElement = selectElementOrThrow(scene, [
    'Canvas',
    'Resolution',
    'Size',
  ]);

  return getAttributesOrThrow<Size>(sizeElement);
};

const updateNode = (
  node: BaseElement | TextElement,
  path: number[],
  newValue: BaseElement | TextElement,
): BaseElement | TextElement => {
  if (path.length === 0) {
    return { ...node, ...newValue };
  }

  if (node.type === 'element') {
    const [head, ...tail] = path;
    return {
      ...node,
      elements: node.elements.map((element, index) =>
        index === head ? updateNode(element, tail, newValue) : element,
      ),
    };
  }

  return node;
};

type Action = {
  type: 'update';
  path: number[];
  newValue: BaseElement | TextElement;
};

const baseElementReducer = (
  state: BaseElement,
  action: Action,
): BaseElement => {
  switch (action.type) {
    case 'update':
      return updateNode(state, action.path, action.newValue) as BaseElement;
    default:
      return state;
  }
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
          <SceneGroup
            scene={scene}
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
