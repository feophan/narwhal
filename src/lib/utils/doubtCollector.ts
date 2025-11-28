import type { Book, Node } from "../types";

export function collectDoubts(root: Book | null): string[] {
  const results: string[] = [];

  function walk(node: Node) {
    if (node.type === "Doubt") results.push(node.text.slice(1,-1).trim());      
    if (node.children) {
      for (const child of node.children) walk(child);
    }
  }

  if (root) walk(root);
  return results;
}
