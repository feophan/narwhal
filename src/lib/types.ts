export interface Node {
  type: string;
  text: string;
  children?: Node[];
  line: number;
}

export interface Book extends Node {
  type: "Book";
  text: string;
  children: Chapter[];
}

export interface Chapter extends Node {
  type: "Chapter";
  text: string;
  children: [Label, ...Section[]];
}

export interface Section extends Node {
  type: "Section";
  text: string;
  children: [Label, ...(Language | Glossary | Annotation)[]];
}

export interface Language extends Node {
  type: "Language";
  text: string;
  children: [Label, Content];
}

export interface Annotation extends Node {
  type: "Annotation";
  text: string;
  children: Note[];
}

export interface Glossary extends Node {
  type: "Glossary";
  text: string;
  children: Gloss[];
}

export interface Content extends Node {
  type: "Content";
  text: string;
  children: Inline[];
}

export interface Note extends Node {
  type: "Note";
  text: string;
  children: [Label, Text];
}

export interface Gloss extends Node {
  type: "Gloss";
  text: string;
  children: Term[];
}

export interface Inline<T extends string = string> extends Node {
  type: T;
  text: string;
}

export type Label = Inline<"Label">;
export type Text = Inline<"Text">;
export type Reference = Inline<"Reference">;
export type Italic = Inline<"Italic">;
export type Bold = Inline<"Bold">;
export type Term = Inline<"Term">;