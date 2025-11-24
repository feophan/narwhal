import type { Book, Node } from "../types";

export function collectGlossary(root: Book | null): [string, string][] {
  let block = [];
  const results = [];

  function walk(node: Node) {
    if (node.type === "Glossary" && node.children) {
      for (const child of node.children) block.push(child.text.replace(/^=+/, "").trim());
      results.push(block);
      block = [];
    }

    if (node.children) {
      for (const child of node.children) walk(child);
    }
  }

  if (root) walk(root);
  return results;
}
