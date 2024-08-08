import { BaseElement } from './types/SceneTypes';
import {
  selectElementOrThrow,
  getAttributesOrThrow,
  selectBaseElementChildOrThrow,
} from './SceneTreeTraversalHelpers';
import { Point3D } from './types/Point';
import { scalePoint3D, degreesToEuler } from './MathUtils';
import { convertToVector } from './TypeConverters';
import { useContext } from 'react';
import { CanvasContext } from './CanvasContextProvider';
import { SceneNode } from './SceneNode';

export const SceneGroup: React.FC<SceneGroupProps> = ({ scene }) => {
  const [, scalingFactor, ,] = useContext(CanvasContext);

  const canvas = selectElementOrThrow(scene, ['Canvas']);

  const scale = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(canvas, 'Scale'),
  );
  const position = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(canvas, 'Position'),
  );
  const rotation = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(canvas, 'Rotation'),
  );

  return (
    <group
      scale={convertToVector(scale)}
      position={convertToVector(scalePoint3D(position, scalingFactor))}
      rotation={degreesToEuler(rotation)}
    >
      <SceneNode node={scene} path={[]} />
    </group>
  );
};

export type SceneGroupProps = {
  scene: BaseElement;
};
