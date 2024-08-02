import { createContext, useCallback, useState } from 'react';
import { Size } from '../types/Size';
import { Props } from '@react-three/fiber';

type ThreeCanvas = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLCanvasElement>
>;

type CanvasContext = [
  ThreeCanvas | null,
  Size | null,
  number,
  (canvas: ThreeCanvas) => void,
  (sceneSize: Size) => void,
  (setScalingFactor: number) => void,
];

export const CanvasContext = createContext<CanvasContext>([
  null,
  null,
  1,
  () => {},
  () => {},
  () => {},
]);

export const CanvasContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [canvas, setCanvas] = useState<ThreeCanvas | null>(null);
  const [sceneSize, setSceneSize] = useState<Size | null>(null);
  const [scalingFactor, setScalingFactor] = useState<number>(1);

  const initCanvas = useCallback((newCanvas: ThreeCanvas): void => {
    setCanvas(newCanvas);
  }, []);

  return (
    <CanvasContext.Provider
      value={[
        canvas,
        sceneSize,
        scalingFactor,
        initCanvas,
        setSceneSize,
        setScalingFactor,
      ]}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};
