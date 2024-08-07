import { isTextElement } from './SceneTreeTraversalHelpers';
import { BaseElement, TextElement } from './types/SceneTypes';
import { TextContainer } from './TextContainer';

export const SceneNode: React.FC<SceneNodeProps> = ({ node, path }) => {
  if (isTextElement(node)) {
    return null;
  }

  switch (node.name) {
    /* case 'Image':
      return <ImageComponent node={node} path={path} />; */
    case 'Text':
      return <TextContainer node={node} path={path} />;
    /* case 'Group':
      return (
        <group>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} path={[...path, index]} />
          ))}
        </group>
      ); */
    default: {
      return (
        <>
          {node.elements.map((child, index) => (
            <SceneNode key={index} node={child} path={[...path, index]} />
          ))}
        </>
      );
    }
  }
};

type SceneNodeProps = {
  node: BaseElement | TextElement;
  path: number[];
};
