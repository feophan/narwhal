import { parser } from "../dslParser.js";
import type { Book, Node } from "../types.js";
import type { Text } from "@codemirror/state";

const INLINE_TYPES = new Set(["Label", "Text", "Reference", "Term", "Italic", "Bold", "Doubt"]);

export function treeToJSON(doc: Text): Book {
  const input = doc.toString();
  const tree = parser.parse(input);

  function nodeToJSON(cursor: any): Node {
    const type = cursor.type.name;
    let line = doc.lineAt(cursor.from).number;

    // Only inline nodes store text
    const node: any = INLINE_TYPES.has(type)
      ? { type, text: input.slice(cursor.from, cursor.to), line }
      : { type, children: [], line };

    if (!INLINE_TYPES.has(type) && cursor.firstChild()) {
      do {
        const childNode = nodeToJSON(cursor);
        // Push child only if it matches expected types
        switch (type) {
          case "Book":
            if (childNode.type === "Chapter") node.children.push(childNode);
            break;
          case "Chapter":
            if (childNode.type === "Label" || childNode.type === "Section") node.children.push(childNode);
            break;
          case "Section":
            if (childNode.type === "Label" || childNode.type === "Language" || childNode.type === "Annotation" || childNode.type === "Glossary")
              node.children.push(childNode);
            break;
          case "Language":
            if (childNode.type === "Label" || childNode.type === "Content") node.children.push(childNode);
            break;
          case "Content":
            if (INLINE_TYPES.has(childNode.type)) node.children.push(childNode);
            break;
          case "Annotation":
            if (childNode.type === "Note") node.children.push(childNode);
            break;
          case "Glossary":
            if (childNode.type === "Gloss") node.children.push(childNode);
            break;
          default:
            node.children.push(childNode);
        }
      } while (cursor.nextSibling());
      cursor.parent();
    }

    return node;
  }

  return nodeToJSON(tree.cursor()) as Book;
}
