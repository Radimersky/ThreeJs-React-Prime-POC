import { useContext, useEffect, useState } from 'react';
import { CanvasContext } from './contextProviders/CanvasContextProvider';
import { CANVAS_BACKGROUND, MAX_CANVAS_SIZE } from './Constants';
import { calculateCanvasScalingFactor } from './misc/MathUtils';
import { Size } from './types/Size';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  const [sceneSize, , , setScalingFactor] = useContext(CanvasContext);

  const [canvasSize, setCanvasSize] = useState<Size>(MAX_CANVAS_SIZE);

  useEffect(() => {
    const scalingFactor = sceneSize
      ? calculateCanvasScalingFactor(sceneSize)
      : 1;

    const scaledSize: Size = sceneSize
      ? {
          Width: sceneSize.Width * scalingFactor,
          Height: sceneSize.Height * scalingFactor,
        }
      : MAX_CANVAS_SIZE;

    setScalingFactor(scalingFactor);
    setCanvasSize(scaledSize);
  }, [sceneSize, setScalingFactor]);

  const { Width, Height } = canvasSize;

  return (
    <div
      id="canvas-container"
      style={{ background: CANVAS_BACKGROUND, width: Width, height: Height }}
    >
      <ThreeCanvas>
        <OrthographicCamera
          makeDefault
          position={[Width / 2, Height / 2, 1000]}
          zoom={1}
        />
        {children}
      </ThreeCanvas>
    </div>
  );
};

interface CanvasProps {
  children: React.ReactNode;
}

export default Canvas;
