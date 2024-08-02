import { useCallback, useContext, useMemo, useState } from 'react';
import SceneParser from '../SceneParser';
import { PrimeScene } from '../types/PrimeScene';
import { CanvasContext } from './CanvasContextProvider';
import { Size } from '../types/Size';
import CanvasTextBox from './CanvasTextBox';
import CanvasImage from './CanvasImage';

const CanvasSceneControll: React.FC = () => {
  const [canvas, , scalingFactor, , setSceneSize] = useContext(FabricContext);
  const [scene, setScene] = useState<PrimeScene | null>(null);

  const handleNewScene = useCallback(
    (scene: PrimeScene) => {
      console.log(scene);
      const sceneSize: Size = {
        Width: scene.Canvas.Resolution.Size.Width,
        Height: scene.Canvas.Resolution.Size.Height,
      };

      setSceneSize(sceneSize);
      setScene(scene);
    },
    [setSceneSize],
  );

  const textBoxComponents = useMemo(() => {
    const sceneTexts = scene?.Canvas.Graphics.Text;
    return canvas && sceneTexts
      ? reverseIfArray(sceneTexts).map((textOptions, index) => (
          <CanvasTextBox
            canvas={canvas}
            options={textOptions}
            scalingFactor={scalingFactor}
            key={index}
          />
        ))
      : null;
  }, [scene, canvas, scalingFactor]);

  const imageComponents = useMemo(() => {
    const sceneImage = scene?.Canvas.Graphics.Image;
    return canvas && sceneImage
      ? reverseIfArray(sceneImage).map((imageOptions, index) => (
          <CanvasImage
            canvas={canvas}
            options={imageOptions}
            scalingFactor={scalingFactor}
            key={index}
          />
        ))
      : null;
  }, [scene, canvas, scalingFactor]);

  return (
    <>
      <div className="tool-container">
        <SceneParser onSceneParsed={handleNewScene} />
      </div>
      {textBoxComponents && (
        <div className="tool-container tool-column">{textBoxComponents}</div>
      )}
      {imageComponents && (
        <div className="tool-container tool-column">{imageComponents}</div>
      )}
    </>
  );
};

const reverseIfArray = <T,>(data: T | T[]): T[] => {
  if (Array.isArray(data)) {
    return data.slice().reverse();
  }
  return [data];
};

export default CanvasSceneControll;
