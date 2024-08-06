import { BaseElement } from './types/SceneTypes';
import { Text } from '@react-three/drei';

export const TextContainer: React.FC<TextProps> = ({ node, path }) => {
  console.log(path);
  console.log(node);
  return (
    <Text
      position={[250, 250, 0]}
      rotation={[1, 1, 0]}
      fontSize={80}
      color="white"
      anchorX="left" // 'left', 'center', or 'right'
      anchorY="bottom-baseline" //'top', 'top-baseline', 'top-ex', 'middle', 'bottom-baseline', or 'bottom'
    >
      Hello World
    </Text>
  );
};

type TextProps = {
  node: BaseElement;
  path: number[];
};
