import { Euler } from '@react-three/fiber';
import { MAX_CANVAS_SIZE } from './Constants';
import { Point3D } from './types/Point';
import { Size } from './types/Size';

export const calculateCanvasScalingFactor = (original: Size): number => {
  const widthScalingFactor = MAX_CANVAS_SIZE.Width / original.Width;
  const heightScalingFactor = MAX_CANVAS_SIZE.Height / original.Height;

  const scalingFactor = Math.min(widthScalingFactor, heightScalingFactor);

  return scalingFactor;
};

export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const degreesToEuler = (degrees: Point3D): Euler => {
  return [
    degreesToRadians(degrees.X),
    degreesToRadians(degrees.Y),
    degreesToRadians(degrees.Z),
  ];
};
