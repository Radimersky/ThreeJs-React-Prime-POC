interface BaseElement {
  type: string;
}

interface TextElement extends BaseElement {
  type: 'text';
  text: string;
}

interface ElementWithAttributes extends BaseElement {
  attributes: {
    [key: string]: string;
  };
}

export interface ElementWithElements extends BaseElement {
  elements: BaseElement[];
}

export type Element = TextElement | ElementWithAttributes | ElementWithElements;

export interface RootElement extends ElementWithElements {
  type: 'element';
  name: string;
  elements: Element[];
}
