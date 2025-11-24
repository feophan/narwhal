import type { Diagnostic } from "@codemirror/lint";
import { parser } from "./dslParser.js";

export function dslLinter(view) {
  const text = view.state.doc.toString();
  const tree = parser.parse(text);

  let diagnostics: Diagnostic[] = [];

  // Example rule 1: detect incorrect tokens

  tree.cursor().iterate((node, from, to) => {
    // Detect raw tokens
    if (node.name === "⚠") {
      diagnostics.push({
        from: node.from,
        to: node.to + 1,
        severity: "error",
        message: "Unknown token"
      });
    }
  });

  return diagnostics;
}
