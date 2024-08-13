import { useContext, useState } from 'react';
import { SceneUpdateContext } from '../contextProviders/SceneContextProvider';
import { BaseElement } from '../types/SceneTypes';
import {
  getTextElement,
  selectBaseElementChildOrThrow,
  selectTextElementValue,
  selectTextElementValueOrThrow,
} from '../misc/SceneTreeTraversalHelpers';

export const TextNodeControll: React.FC<TextNodeControllProps> = ({
  path,
  node,
  rootSceneIndex,
}) => {
  const [updateRootSceneElements] = useContext(SceneUpdateContext);
  const [text, setText] = useState<string>(
    selectTextElementValue(node, ['Text']) ?? '',
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);

    const textNodeParrent = selectBaseElementChildOrThrow(node, 'Text');
    const textNode = getTextElement(textNodeParrent);

    const nodeIndex = node.elements.findIndex(
      el => el.type === 'element' && el.name === 'Text',
    );

    if (!textNode && newText.length > 0) {
      const newTextNode = { ...textNodeParrent };
      newTextNode.elements.push({ type: 'text', text: newText });
      updateRootSceneElements(
        rootSceneIndex,
        [...path, nodeIndex],
        newTextNode,
      );
    } else if (newText.length === 0) {
      // Empty text means no text element exists in the PBX
      const updatedTextNode = { ...textNodeParrent };
      updatedTextNode.elements = [];
      updateRootSceneElements(
        rootSceneIndex,
        [...path, nodeIndex],
        updatedTextNode,
      );
    } else if (textNode) {
      const updatedTextNode = { ...textNode };
      updatedTextNode.text = newText;
      updateRootSceneElements(
        rootSceneIndex,
        [...path, nodeIndex, 0],
        updatedTextNode,
      );
    }
  };

  const name = selectTextElementValueOrThrow(node, ['Name']);

  return (
    <div className="list-item">
      <span>{name}: </span>
      <input type="text" value={text} onChange={handleInputChange} />
    </div>
  );
};

type TextNodeControllProps = {
  path: number[];
  node: BaseElement;
  rootSceneIndex: number;
};
