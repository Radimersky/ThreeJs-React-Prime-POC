import { createContext, useState } from 'react';
import { BaseElement, RootSceneElement, TextElement } from './types/SceneTypes';
import { getSceneFromRootElementOrThrow } from './SceneTreeTraversalHelpers';

type SceneUpdateContext = [
  (
    rootSceneElementIndex: number,
    path: number[],
    newValue: BaseElement | TextElement,
  ) => void,
  (elements: RootSceneElement[]) => void,
];

export const SceneUpdateContext = createContext<SceneUpdateContext>([
  () => {},
  () => {},
]);

export const SceneContext = createContext<RootSceneElement[]>([]);

const replaceElement = (
  node: BaseElement | TextElement,
  path: number[],
  newValue: BaseElement | TextElement,
): BaseElement | TextElement => {
  if (node.type === 'element') {
    const [head, ...tail] = path;
    return {
      ...node,
      elements: node.elements.map((element, index) =>
        index === head ? replaceElement(element, tail, newValue) : element,
      ),
    };
  }

  return node;
};

export const SceneContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [rootSceneElements, setRootSceneElements] = useState<
    RootSceneElement[]
  >([]);

  const updateRootSceneElements = (
    rootSceneElementIndex: number,
    path: number[],
    newValue: BaseElement | TextElement,
  ) => {
    const rootNode = rootSceneElements[rootSceneElementIndex];
    const scene = getSceneFromRootElementOrThrow(rootNode);

    const updatedScene = replaceElement(scene, path, newValue);
    const updatedRootSceneElement = {
      ...rootSceneElements[rootSceneElementIndex],
    };

    if (updatedScene.type === 'element') {
      updatedRootSceneElement.elements[0] = updatedScene;
    }

    const newList = [
      ...rootSceneElements.slice(0, rootSceneElementIndex),
      updatedRootSceneElement,
      ...rootSceneElements.slice(rootSceneElementIndex + 1),
    ];

    setRootSceneElements(newList);
  };

  const setNewRootSceneElements = (elements: RootSceneElement[]) => {
    setRootSceneElements(elements);
  };

  return (
    <SceneContext.Provider value={rootSceneElements}>
      <SceneUpdateContext.Provider
        value={[updateRootSceneElements, setNewRootSceneElements]}
      >
        {props.children}
      </SceneUpdateContext.Provider>
    </SceneContext.Provider>
  );
};
