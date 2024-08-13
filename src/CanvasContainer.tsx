import { useCallback, useContext, useMemo } from 'react';
import SceneParser from './SceneParser';
import Canvas from './Canvas';
import { RootSceneElement } from './types/SceneTypes';
import {
  selectTextElementValueOrThrow,
  getSceneFromRootElementOrThrow,
  selectElementOrThrow,
  getAttributesOrThrow,
} from './misc/SceneTreeTraversalHelpers';
import { CanvasContext } from './contextProviders/CanvasContextProvider';
import { Size } from './types/Size';
import { SceneGroupNode } from './nodes/SceneGroupNode';
import {
  SceneContext,
  SceneUpdateContext,
} from './contextProviders/SceneContextProvider';
import { BaseNodeControll } from './nodeControlls/BaseNodeControll';
import { convertToXml } from './misc/MathUtils';

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
      if (scenes.length > 0) {
        setNewRootSceneElements(scenes);
        setSceneSize(getSceneSize(scenes[0]));
      }
    },
    [setSceneSize, setNewRootSceneElements],
  );

  const sceneComponents = useMemo(
    () =>
      rootSceneElements.map((rootSceneElement, index) => {
        const scene = getSceneFromRootElementOrThrow(rootSceneElement);
        return (
          <SceneGroupNode
            rootSceneIndex={index}
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
            <BaseNodeControll rootSceneIndex={index} node={scene} path={[]} />
          </div>
        );
      }),
    [rootSceneElements],
  );

  const handleConvertToXml = () => {
    const xmls = convertToXml(rootSceneElements);
    console.log(xmls);
    window.alert('XMLs are printed to console.');
  };

  return (
    <>
      <Canvas>{sceneComponents}</Canvas>
      <div className="tool-container">
        <SceneParser onScenesParsed={handleParsedScenes} />
        <button onClick={handleConvertToXml}>Convert back to XML</button>
      </div>
      {sceneControllComponents}
    </>
  );
};
