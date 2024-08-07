import { BaseElement, TextElement, RootSceneElement } from './types/SceneTypes';

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

const getTextElementValueOrThrow = (
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

export const getTextElementValue = (
  textElementParrent: BaseElement,
): string | null => {
  if (textElementParrent.elements.length === 0) {
    return null;
  }

  const childElement = textElementParrent.elements[0];

  if (!isTextElement(childElement)) {
    return null;
  }

  return childElement.text;
};

const hasExactlyOneTextElement = (element: BaseElement): boolean => {
  const textElements = element.elements.filter(
    (el): el is TextElement => el.type === 'text',
  );
  return textElements.length === 1;
};

const selectParrentOfTextElement = (
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

export const selectBaseElementChildOrThrow = (
  parrentElement: BaseElement,
  childName: string,
): BaseElement => {
  for (const el of parrentElement.elements) {
    if (el.type === 'element' && el.name === childName) {
      return el;
    }
  }

  throw new Error(
    `Child element ${childName} cannot be found for parrent ${parrentElement.name}.`,
  );
};

export const isTextElement = (
  element: BaseElement | TextElement,
): element is TextElement => {
  return (element as TextElement).type === 'text';
};

export const selectTextElementValueOrThrow = (
  root: BaseElement,
  namePath: string[],
): string => {
  const baseElementWithTextElement = selectParrentOfTextElement(root, namePath);

  if (!baseElementWithTextElement) {
    throw new Error(`Path does not exists: ${namePath.join(' -> ')}`);
  }

  return getTextElementValueOrThrow(baseElementWithTextElement);
};

export const selectTextElementValue = (
  root: BaseElement,
  namePath: string[],
): string | null => {
  const baseElementWithTextElement = selectParrentOfTextElement(root, namePath);

  if (!baseElementWithTextElement) {
    return null;
  }

  return getTextElementValue(baseElementWithTextElement);
};

export const selectElement = (
  root: BaseElement,
  namePath: string[],
): BaseElement | null => {
  return traverseTree(root, namePath, 0);
};

export const selectElementOrThrow = (
  root: BaseElement,
  namePath: string[],
): BaseElement => {
  const element = selectElement(root, namePath);

  if (!element) {
    throw new Error(
      `Element on given path does not exists: ${namePath.join(' -> ')}`,
    );
  }

  return element;
};

const traverseTree = (
  element: BaseElement,
  namePath: string[],
  index: number,
): BaseElement | null => {
  if (index === namePath.length) {
    return element;
  }

  for (const el of element.elements) {
    if (el.type === 'element' && el.name === namePath[index]) {
      const result = traverseTree(el, namePath, index + 1);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

export function getAttributesOrThrow<T>(element: BaseElement): T {
  if (!element.attributes) {
    throw new Error(`Element ${element.name} does not have attributes.`);
  }

  return element.attributes as T;
}
