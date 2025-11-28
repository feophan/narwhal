import { EditorView } from "@codemirror/view";
import { Compartment } from "@codemirror/state";

export const themeCompartment = new Compartment();

export const cmLightTheme = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff", // bg-white
    color: "#111827",           // text-gray-900
  },
  ".cm-content": {
    caretColor: "#000000",      // caret-black
  },
  ".cm-gutters": {
    backgroundColor: "#f3f4f6", // bg-gray-100
    color: "#6b7280",           // text-gray-500
    borderRight: "1px solid #d1d5db", // border-gray-300
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#bfdbfe", // bg-blue-200
  },
});

export const cmDarkTheme = EditorView.theme({
  "&": {
    backgroundColor: "#111827", // bg-gray-900
    color: "#f9fafb",           // text-gray-100
  },
  ".cm-content": {
    caretColor: "#ffffff",
  },
  ".cm-gutters": {
    backgroundColor: "#1f2937", // bg-gray-800
    color: "#9ca3af",           // text-gray-400
    borderRight: "1px solid #374151", // border-gray-700
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#1e40af", // bg-blue-900
  },
    ".ͼs": {
    color: "#CCCCCC", // text
  },
    ".ͼu": {
    color: "#21d441ff", // glossary
  },
    ".ͼq, .ͼp, .ͼo": {
    color: "#0088FF", // header
  },
    ".ͼw": {
    color: "#FFEE80", // comment
  },
    ".ͼz": {
    color: "#e7000b", // doubt
  }
}, { dark: true });
