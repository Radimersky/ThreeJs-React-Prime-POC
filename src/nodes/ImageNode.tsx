import { useContext } from 'react';
import { CanvasContext } from '../contextProviders/CanvasContextProvider';
import { degreesToEuler, scalePoint3D } from '../misc/MathUtils';
import {
  getAttributesOrThrow,
  selectBaseElementChildOrThrow,
} from '../SceneTreeTraversalHelpers';
import { convertToVector } from '../TypeConverters';
import { Point3D } from '../types/Point';
import { BaseElement } from '../types/SceneTypes';
import { Image } from '@react-three/drei';
import { useImageUrl } from '../UseImageUrl';
import { createImageUrlKey } from '../HelperFunctions';
import { Size } from '../types/Size';

export const ImageNode: React.FC<ImageNodeProps> = ({
  node,
  path,
  rootSceneIndex,
}) => {
  const { urlDictonary } = useImageUrl();
  const [, scalingFactor] = useContext(CanvasContext);

  const imageUrl = urlDictonary[createImageUrlKey(rootSceneIndex, path)];

  const position = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(node, 'Position'),
  );
  const rotation = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(node, 'Rotation'),
  );
  const size = getAttributesOrThrow<Size>(
    selectBaseElementChildOrThrow(node, 'Size'),
  );

  if (!imageUrl) {
    return null;
  }

  return (
    <Image
      position={convertToVector(scalePoint3D(position, scalingFactor))}
      scale={[size.Width * scalingFactor, size.Height * scalingFactor]}
      url={imageUrl}
      rotation={degreesToEuler(rotation)}
    />
  );
};

type ImageNodeProps = {
  node: BaseElement;
  path: number[];
  rootSceneIndex: number;
};
