import { Token, TokenType } from "@/types/syntax";

const keywords = [
  "function",
  "const",
  "let",
  "var",
  "if",
  "else",
  "for",
  "while",
  "return",
  "import",
  "export",
  "class",
  "className",
  "extends",
  "implements",
  "interface",
  "type",
  "enum",
  "public",
  "private",
  "protected",
  "static",
  "async",
  "await",
  "try",
  "catch",
  "throw",
  "new",
  "this",
  "super",
  "typeof",
];

const builtInTypes = [
  "string",
  "number",
  "boolean",
  "any",
  "void",
  "null",
  "undefined",
  "never",
  "object",
  "symbol",
  "bigint",
  "unknown",
];

const removeLeadingNewline = (code: string): string => {
  return code.startsWith("\n") ? code.slice(1) : code;
};

const tokenize = (code: string): Token[] => {
  code = removeLeadingNewline(code);
  const tokens: Token[] = [];
  let current = "";
  let type: TokenType = "default";

  const push = () => {
    if (current) {
      tokens.push({ type, content: current });
      current = "";
      type = "default";
    }
  };

  const isAlphaNumeric = (char: string) => /[a-zA-Z0-9_$]/.test(char);

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (char === '"' || char === "'") {
      push();
      type = "string";
      current += char;
      i++;
      while (i < code.length && code[i] !== char) {
        current += code[i];
        i++;
      }
      if (i < code.length) current += code[i];
      push();
    } else if (char === "`") {
      push();
      type = "template-string";
      current += char;
      i++;
      while (i < code.length && code[i] !== "`") {
        if (code[i] === "$" && code[i + 1] === "{") {
          push();
          type = "template-expression";
          current += "${";
          i += 2;
          let braceCount = 1;
          while (i < code.length && braceCount > 0) {
            if (code[i] === "{") braceCount++;
            if (code[i] === "}") braceCount--;
            current += code[i];
            i++;
          }
          push();
          type = "template-string";
        } else {
          current += code[i];
          i++;
        }
      }
      if (i < code.length) current += code[i];
      push();
    } else if (/[0-9]/.test(char)) {
      push();
      type = "number";
      current += char;
      while (i + 1 < code.length && /[0-9.]/.test(code[i + 1])) {
        i++;
        current += code[i];
      }
      push();
    } else if (isAlphaNumeric(char)) {
      push();
      type = "identifier";
      current += char;
      while (i + 1 < code.length && isAlphaNumeric(code[i + 1])) {
        i++;
        current += code[i];
      }
      if (keywords.includes(current)) {
        type = "keyword";
      } else if (builtInTypes.includes(current)) {
        type = "type";
      }
      push();
    } else if (/[(){}[\]]/.test(char)) {
      push();
      tokens.push({ type: "punctuation", content: char });
    } else if (/\s/.test(char)) {
      push();
      tokens.push({ type: "whitespace", content: char });
    } else if (char === "/" && code[i + 1] === "/") {
      push();
      type = "comment";
      while (i < code.length && code[i] !== "\n") {
        current += code[i];
        i++;
      }
      push();
    } else if (char === "/" && code[i + 1] === "*") {
      push();
      type = "comment";
      current += "/*";
      i += 2;
      while (i < code.length && (code[i] !== "*" || code[i + 1] !== "/")) {
        current += code[i];
        i++;
      }
      if (i < code.length) {
        current += "*/";
        i++;
      }
      push();
    } else {
      push();
      tokens.push({ type: "operator", content: char });
    }
  }

  push();
  return tokens;
};

export const highlightCode = (code: string): Token[] => {
  return tokenize(code);
};

export const getLanguageName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const languageMap: { [key: string]: string } = {
    js: "JavaScript",
    ts: "TypeScript",
    jsx: "React JSX",
    tsx: "React TSX",
    py: "Python",
    rb: "Ruby",
    java: "Java",
    cpp: "C++",
    c: "C++",
    go: "Go",
    rs: "Rust",
    php: "PHP",
    swift: "Swift",
    kt: "Kotlin",
    cs: "C#",
    html: "HTML",
    css: "CSS",
    scss: "SCSS",
    json: "JSON",
    md: "Markdown",
    yml: "YAML",
    yaml: "YAML",
    sh: "Shell",
    sql: "SQL",
    dockerfile: "Dockerfile",
    dart: "Dart",
    xml: "XML",
  };

  switch (extension) {
    default:
      return extension ? languageMap[extension] || "Plain Text" : "Plain Text";
  }
};
