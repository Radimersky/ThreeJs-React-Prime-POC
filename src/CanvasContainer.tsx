import { useCallback, useContext, useMemo } from 'react';
import SceneParser from './SceneParser';
import Canvas from './Canvas';
import { RootSceneElement } from './types/SceneTypes';
import {
  selectTextElementValueOrThrow,
  getSceneFromRootElementOrThrow,
  selectElementOrThrow,
  getAttributesOrThrow,
} from './SceneTreeTraversalHelpers';
import { CanvasContext } from './CanvasContextProvider';
import { Size } from './types/Size';
import { SceneGroup } from './SceneGroup';
import { SceneContext, SceneUpdateContext } from './SceneContextProvider';
import { SceneNodeControll } from './SceneNodeControll';

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
  const rootSceneElements = useContext(SceneContext);
  const [, setNewRootSceneElements] = useContext(SceneUpdateContext);
  const [, , setSceneSize] = useContext(CanvasContext);

  const handleParsedScenes = useCallback(
    (scenes: RootSceneElement[]) => {
      console.log(scenes);
      if (scenes.length > 0) {
        setNewRootSceneElements(scenes);
        setSceneSize(getSceneSize(scenes[0]));
      }
    },
    [setSceneSize, setNewRootSceneElements],
  );

  const sceneComponents = useMemo(
    () =>
      rootSceneElements.map(rootSceneElement => {
        const scene = getSceneFromRootElementOrThrow(rootSceneElement);
        return (
          <SceneGroup
            scene={scene}
            key={selectTextElementValueOrThrow(scene, ['Name'])}
          />
        );
      }),
    [rootSceneElements],
  );

  const sceneControllComponents = useMemo(
    () =>
      rootSceneElements.map((rootSceneElement, index) => {
        const scene = getSceneFromRootElementOrThrow(rootSceneElement);
        return (
          <div
            className="tool-container"
            key={selectTextElementValueOrThrow(scene, ['Name'])}
          >
            <SceneNodeControll rootSceneIndex={index} node={scene} path={[]} />
          </div>
        );
      }),
    [rootSceneElements],
  );

  return (
    <>
      <Canvas>{sceneComponents}</Canvas>
      <div className="tool-container">
        <SceneParser onScenesParsed={handleParsedScenes} />
      </div>
      {sceneControllComponents}
    </>
  );
};
