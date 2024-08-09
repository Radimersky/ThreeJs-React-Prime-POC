import { useContext, useState } from 'react';
import { SceneUpdateContext } from './SceneContextProvider';
import { BaseElement } from './types/SceneTypes';
import {
  getTextElementOrThrow,
  selectBaseElementChildOrThrow,
  selectTextElementValueOrThrow,
} from './SceneTreeTraversalHelpers';

export const TextNodeControll: React.FC<TextNodeControllProps> = ({
  path,
  node,
  rootSceneIndex,
}) => {
  const [updateRootSceneElements] = useContext(SceneUpdateContext);
  const [text, setText] = useState<string>(
    selectTextElementValueOrThrow(node, ['Text']),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    const textNode = getTextElementOrThrow(
      selectBaseElementChildOrThrow(node, 'Text'),
    );

    const updatedTextNode = { ...textNode };
    updatedTextNode.text = newText;

    const nodeIndex = node.elements.findIndex(
      el => el.type === 'element' && el.name === 'Text',
    );

    setText(newText);
    updateRootSceneElements(
      rootSceneIndex,
      [...path, nodeIndex, 0],
      updatedTextNode,
    );
  };

  const name = selectTextElementValueOrThrow(node, ['Name']);

  return (
    <>
      <span>{name}: </span>
      <input type="text" value={text} onChange={handleInputChange} />
    </>
  );
};

type TextNodeControllProps = {
  path: number[];
  node: BaseElement;
  rootSceneIndex: number;
};
