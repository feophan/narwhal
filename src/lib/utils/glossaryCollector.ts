import type { Book, Node } from "../types";

export function collectGlossary(root: Book | null): [string, string][] {
  let block = [];
  const results = [];

  function walk(node: Node) {
    if (node.type === "Glossary" && node.children) {
      for (const gloss of node.children) {
        if (gloss.children) {
          for (const term of gloss.children) block.push(term.text.replace(/^=+/, "").trim());
          results.push(block);
          block = [];
        }
      }
    }

    if (node.children) {
      for (const child of node.children) walk(child);
    }
  }

  if (root) walk(root);
  return results;
}
