import { isTextElement } from './SceneTreeTraversalHelpers';
import { BaseElement, TextElement } from './types/SceneTypes';
import { TextNodeControll } from './TextNodeControll';

export const SceneNodeControll: React.FC<SceneNodeControllProps> = ({
  node,
  rootSceneIndex,
  path,
}) => {
  if (isTextElement(node)) {
    return null;
  }

  switch (node.name) {
    /* case 'Image':
      return <ImageComponent node={node} path={path} />; */
    case 'Text':
      return (
        <TextNodeControll
          node={node}
          path={path}
          rootSceneIndex={rootSceneIndex}
        />
      );
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
            <SceneNodeControll
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

type SceneNodeControllProps = {
  node: BaseElement | TextElement;
  rootSceneIndex: number;
  path: number[];
};
