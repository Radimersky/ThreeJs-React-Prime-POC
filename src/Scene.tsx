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
  // Create hook for text, image and groups and render them
  // Give every element an GUID and save the structure into context and then each component will know which object to update in the context
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
