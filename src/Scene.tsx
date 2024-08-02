import { Euler, Vector3 } from '@react-three/fiber';
import { Graphics } from './types/PrimeScene';

export const Scene: React.FC<SceneProps> = ({
  position,
  opacity,
  rotation,
  scale,
  graphics,
  children,
}) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {children}
    </group>
  );
};

export type SceneProps = {
  position: Vector3;
  opacity: number;
  rotation: Euler;
  scale: Vector3;
  graphics: Graphics;
  children?: React.ReactNode;
};
