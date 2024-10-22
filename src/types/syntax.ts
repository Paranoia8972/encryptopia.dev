export type TokenType =
  | "default"
  | "identifier"
  | "keyword"
  | "string"
  | "number"
  | "punctuation"
  | "operator"
  | "whitespace"
  | "comment"
  | "type"
  | "class"
  | "property"
  | "entity"
  | "template-string"
  | "template-expression";

export type Token = {
  type: TokenType;
  content: string;
};
