import { BaseElement, TextElement, RootSceneElement } from './types/SceneTypes';

export const selectBaseElementByName = (
  parrent: BaseElement,
  name: string,
): BaseElement | null => {
  for (const element of parrent.elements) {
    if (element.type !== 'element') {
      continue;
    }

    if (element.name === name) {
      return element;
    }
  }
  return null;
};

export const getTextElementValueOrThrow = (
  textElementParrent: BaseElement,
): string => {
  if (textElementParrent.elements.length !== 1) {
    throw new Error(
      `Child elements list should contain exactly one element. Element name ${textElementParrent.name}`,
    );
  }

  const childElement = textElementParrent.elements[0];

  if (!isTextElement(childElement)) {
    throw new Error(
      `Child element should be of type text. Element name ${textElementParrent.name}`,
    );
  }

  return childElement.text;
};

const hasExactlyOneTextElement = (element: BaseElement): boolean => {
  const textElements = element.elements.filter(
    (el): el is TextElement => el.type === 'text',
  );
  return textElements.length === 1;
};

export const findElementWithText = (
  root: BaseElement,
  namePath: string[],
): BaseElement | null => {
  // Recursive function to traverse the tree based on the namePath
  const traverseTree = (
    element: BaseElement,
    path: string[],
    index: number,
  ): BaseElement | null => {
    if (index === path.length) {
      return hasExactlyOneTextElement(element) ? element : null;
    }

    for (const el of element.elements) {
      if (el.type === 'element' && el.name === path[index]) {
        const result = traverseTree(el, path, index + 1);
        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  return traverseTree(root, namePath, 0);
};

const isTextElement = (
  element: BaseElement | TextElement,
): element is TextElement => {
  return (element as TextElement).type === 'text';
};

export const findTextElementValueOrThrow = (
  root: BaseElement,
  namePath: string[],
): string => {
  const baseElementWithTextElement = findElementWithText(root, namePath);

  if (!baseElementWithTextElement) {
    throw new Error(`Path does not exists: ${namePath.join(' -> ')}`);
  }

  return getTextElementValueOrThrow(baseElementWithTextElement);
};

export const getSceneFromRootElementOrThrow = (
  rootElement: RootSceneElement,
): BaseElement => {
  const rootElementChildrenLength = rootElement.elements.length;
  if (rootElementChildrenLength === 1) {
    return rootElement.elements[0];
  }

  throw new Error(
    `RootElement should have exactly one child element but has ${rootElementChildrenLength}`,
  );
};
