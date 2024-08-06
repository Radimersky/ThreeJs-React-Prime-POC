import { useCallback, useMemo, useState } from 'react';
import SceneParser from './SceneParser';
import Canvas from './Canvas';
import { Text } from '@react-three/drei';
import { RootSceneElement } from './types/SceneTypes';
import { SceneNode } from './SceneNode';
import {
  findTextElementValueOrThrow,
  getSceneFromRootElementOrThrow,
} from './SceneTreeTraversalHelpers';

export const CanvasContainer: React.FC = () => {
  const [scenes, setScenes] = useState<RootSceneElement[]>([]);

  const handleParsedScenes = useCallback((scenes: RootSceneElement[]) => {
    console.log(scenes);
    setScenes(scenes);
  }, []);

  /*   const sceneComponents = useMemo(
    () =>
      scenes.map(scene => {
        const canvas = scene.Canvas;
        return (
          <Scene
            scale={convertToVector(canvas.Scale)}
            opacity={canvas.Opacity}
            position={convertToVector(canvas.Position)}
            rotation={degreesToEuler(canvas.Rotation)}
            graphics={canvas.Graphics}
            key={scene.Name}
          />
        );
      }),
    [scenes],
  );
 */

  const sceneComponents = useMemo(
    () =>
      scenes.map(rootSceneElement => {
        const scene = getSceneFromRootElementOrThrow(rootSceneElement);
        return (
          <SceneNode
            node={scene}
            path={[]}
            key={findTextElementValueOrThrow(scene, ['Name'])}
          />
        );
      }),
    [scenes],
  );

  return (
    <>
      {sceneComponents}
      <Canvas>
        <Text
          position={[250, 250, 0]}
          rotation={[1, 1, 0]}
          fontSize={80}
          color="white"
          anchorX="left" // 'left', 'center', or 'right'
          anchorY="bottom-baseline" //'top', 'top-baseline', 'top-ex', 'middle', 'bottom-baseline', or 'bottom'
        >
          Hello World
        </Text>
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
