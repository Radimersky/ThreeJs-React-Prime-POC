import { useContext, useEffect, useState } from 'react';
import { CanvasContext } from './oldFiles/CanvasContextProvider';
import { CANVAS_BACKGROUND, MAX_CANVAS_SIZE } from './Constants';
import { calculateCanvasScalingFactor } from './MathUtils';
import { Size } from './types/Size';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  const [, sceneSize, , initCanvas, , setScalingFactor] =
    useContext(CanvasContext);

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

    //const canvas = createCanvas(scaledSize.Width, scaledSize.Height);
    //applyGlobalObjectTransformation(canvas);
    //canvas.requestRenderAll();

    //initCanvas(canvas);
    setScalingFactor(scalingFactor);
  }, [initCanvas, sceneSize, setScalingFactor]);

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
        {/* <ambientLight intensity={0.5} /> */}
        {children}
      </ThreeCanvas>
    </div>
  );
};

interface CanvasProps {
  children: React.ReactNode;
}

export default Canvas;
