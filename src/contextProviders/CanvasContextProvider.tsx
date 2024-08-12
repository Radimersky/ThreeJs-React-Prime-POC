import { createContext, useState } from 'react';
import { Size } from '../types/Size';

type CanvasContext = [
  Size | null,
  number,
  (sceneSize: Size) => void,
  (setScalingFactor: number) => void,
];

export const CanvasContext = createContext<CanvasContext>([
  null,
  1,
  () => {},
  () => {},
]);

export const CanvasContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [sceneSize, setSceneSize] = useState<Size | null>(null);
  const [scalingFactor, setScalingFactor] = useState<number>(1);

  return (
    <CanvasContext.Provider
      value={[sceneSize, scalingFactor, setSceneSize, setScalingFactor]}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};
