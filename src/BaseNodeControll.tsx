import { isTextElement } from './SceneTreeTraversalHelpers';
import { BaseElement, TextElement } from './types/SceneTypes';
import { TextNodeControll } from './TextNodeControll';
import { ImageNodeControll } from './ImageNodeControll';

export const BaseNodeControll: React.FC<BaseNodeControllProps> = ({
  node,
  rootSceneIndex,
  path,
}) => {
  if (isTextElement(node)) {
    return null;
  }

  switch (node.name) {
    case 'Image':
      return (
        <ImageNodeControll
          node={node}
          path={path}
          rootSceneIndex={rootSceneIndex}
        />
      );
    case 'Text':
      return (
        <TextNodeControll
          node={node}
          path={path}
          rootSceneIndex={rootSceneIndex}
        />
      );
    default: {
      return (
        <>
          {node.elements.map((child, index) => (
            <BaseNodeControll
              key={index}
              node={child}
              rootSceneIndex={rootSceneIndex}
              path={[...path, index]}
            />
          ))}
        </>
      );
    }
  }
};

type BaseNodeControllProps = {
  node: BaseElement | TextElement;
  rootSceneIndex: number;
  path: number[];
};
