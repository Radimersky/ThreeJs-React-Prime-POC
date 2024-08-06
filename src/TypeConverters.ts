import { Vector3 } from '@react-three/fiber';
import { Point3D } from './types/Point';

export const convertToVector = (point3D: Point3D): Vector3 => {
  return [point3D.X, point3D.Y, point3D.Z];
};

export const stringToNumberOrThrow = (value: string): number => {
  const numberValue = Number(value);

  if (isNaN(numberValue) || value.trim() === '') {
    throw new Error(`${value} is not a number.`);
  }

  return numberValue;
};
