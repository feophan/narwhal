import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

export const dslHighlightStyle = HighlightStyle.define([
  { tag: t.heading1, color: "#003366", fontWeight: "bold" },
  { tag: t.heading2, color: "#004c99", fontWeight: "bold" },
  { tag: t.heading3, color: "#0066cc", fontWeight: "bold" },
  { tag: t.keyword, color: "#990099", fontWeight: "bold" },
  { tag: t.string, color: "#222222" },
  { tag: t.lineComment, color: "#888888ff" },
  { tag: t.comment, color: "#1c680aff" },
  { tag: t.annotation, color: "#888888" },
  { tag: t.link, color: "#888888" },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
])

// ✅ Wrap the style in syntaxHighlighting to produce a Highlighter
export const dslSyntaxHighlighting = syntaxHighlighting(dslHighlightStyle)
