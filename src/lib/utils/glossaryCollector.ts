import type { Book, Node } from "../types";

export function collectGlossary(root: Book | null): string[][] {
  const results: string[][] = [];

  function walk(node: Node) {
    if (node.type === "Glossary" && node.children) {
      for (const gloss of node.children) {
        if (gloss.children) {
          const block: string[] = [];
          for (const term of gloss.children) {
            const text = term.text ?? "";
            if (text.startsWith("=")) {
              block.push(text.replace(/^=+/, "").trim());
            }
          }
          // only add if we actually collected something
          if (block.length > 0) {
            results.push(block);
          }
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
