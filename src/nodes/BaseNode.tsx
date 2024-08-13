import { isTextElement } from '../misc/SceneTreeTraversalHelpers';
import { BaseElement, TextElement } from '../types/SceneTypes';
import { TextNode } from './TextNode';
import { ImageNode } from './ImageNode';

export const BaseNode: React.FC<BaseNodeProps> = ({
  node,
  path,
  rootSceneIndex,
}) => {
  if (isTextElement(node)) {
    return null;
  }

  switch (node.name) {
    case 'Image':
      return (
        <ImageNode node={node} path={path} rootSceneIndex={rootSceneIndex} />
      );
    case 'Text':
      return <TextNode node={node} />;
    default: {
      return (
        <>
          {node.elements.map((child, index) => (
            <BaseNode
              key={index}
              node={child}
              path={[...path, index]}
              rootSceneIndex={rootSceneIndex}
            />
          ))}
        </>
      );
    }
  }
};

type BaseNodeProps = {
  node: BaseElement | TextElement;
  path: number[];
  rootSceneIndex: number;
};
