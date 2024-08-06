interface DeclarationAttributes {
  version: string;
  encoding: string;
}

interface Declaration {
  attributes: DeclarationAttributes;
}

export interface TextElement {
  type: 'text';
  text: string;
}

export interface BaseElement {
  type: 'element';
  name: string;
  attributes?: Record<string, string>;
  elements: (BaseElement | TextElement)[];
}

export interface RootSceneElement {
  declaration: Declaration;
  elements: BaseElement[];
}
