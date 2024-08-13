import { useContext } from 'react';
import { CanvasContext } from '../contextProviders/CanvasContextProvider';
import { degreesToEuler, scalePoint3D } from '../misc/MathUtils';
import {
  getAttributesOrThrow,
  selectBaseElementChildOrThrow,
  selectElementOrThrow,
  selectTextElementValue,
  selectTextElementValueOrThrow,
} from '../SceneTreeTraversalHelpers';
import { convertToVector, stringToNumberOrThrow } from '../TypeConverters';
import { Point3D } from '../types/Point';
import { BaseElement } from '../types/SceneTypes';
import { Text } from '@react-three/drei';

export const TextNode: React.FC<TextNodeProps> = ({ node }) => {
  const [, scalingFactor] = useContext(CanvasContext);

  const scale = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(node, 'Scale'),
  );
  const position = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(node, 'Position'),
  );
  const rotation = getAttributesOrThrow<Point3D>(
    selectBaseElementChildOrThrow(node, 'Rotation'),
  );

  const opacity = stringToNumberOrThrow(
    selectTextElementValueOrThrow(node, ['Opacity']),
  );
  const color = selectTextElementValueOrThrow(node, ['Color']);
  const text = selectTextElementValue(node, ['Text']);

  const textAlign = selectTextElementValueOrThrow(node, [
    'HorizontalAlignment',
  ]);

  const font = selectElementOrThrow(node, ['Font']);
  const fontSize = stringToNumberOrThrow(
    selectTextElementValueOrThrow(font, ['Size']),
  );

  return (
    <Text
      scale={convertToVector(scale)}
      fillOpacity={opacity}
      position={convertToVector(scalePoint3D(position, scalingFactor))}
      rotation={degreesToEuler(rotation)}
      fontSize={fontSize * scalingFactor}
      color={'#' + color}
      anchorX="left" // 'left', 'center', or 'right'
      anchorY="bottom-baseline" // 'top', 'top-baseline', 'top-ex', 'middle', 'bottom-baseline', or 'bottom'
      textAlign={textAlign as 'left' | 'right' | 'center' | 'justify'}
    >
      {text ?? ''}
    </Text>
  );
};

type TextNodeProps = {
  node: BaseElement;
};
