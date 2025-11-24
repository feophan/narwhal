import { syntaxTree } from '@codemirror/language';
import type { Block, Content } from '../types';
import type { EditorView } from "@codemirror/view";
import type { SyntaxNodeRef } from "@lezer/common";

// Extract all blocks
export function extractBlocks(view: EditorView) {
  const tree = syntaxTree(view.state);
  const blocks: Block[] = [];
  let currentBlock: Block | null = null;
  let title = "";

  tree.iterate({
    enter: (node) => {
      if (!node.node.firstChild) return; // skip incomplete nodes

      switch (node.name) {

        case "Title": {
          const labelNode = node.node.getChild("Label");
          if (labelNode) {
            title = view.state.doc.sliceString(labelNode.from, labelNode.to).trim();
          }
          break;
        }

        case 'Block':
          const labelNode = node.node.getChild("Label");
          const label = labelNode
            ? view.state.doc.sliceString(labelNode.from, labelNode.to).trim()
            : "";
          currentBlock = { label, langs: [], anno: {} };
          blocks.push(currentBlock);
          break;

        case 'Lang':
          if (currentBlock) {
            const lang = extractLang(view, node);
            currentBlock.langs.push(lang);
          }
          break;

        case 'Anno':
          if (currentBlock) {
            currentBlock.anno = extractAnno(view, node);
          }
          break;
      }
    }
  });

  return {title, blocks };
}

// Extract Lang node safely

function extractLang(view: EditorView, langNodeRef: SyntaxNodeRef) {

  const node = langNodeRef?.node;
  const labelNode = node.getChild('Label');
  const textNode = node.getChild('Content');

  const content: Content[] = [];
  
  const label = labelNode
    ? view.state.doc.sliceString(labelNode.from, labelNode.to).trim()
    : "";

  for (let child = textNode?.firstChild; child; child = child.nextSibling) {
    if (child.name === "Label") continue;
    if (!child) continue;

    let type: "Text" | "Ref";
    if (child.name === "Text") type = "Text";
    else if (child.name === "Ref") type = "Ref";
    else {
      console.log('Unexpected node');
      continue
    }; // ignore unexpected nodes

    content.push({
      type: child.name, // "Text" or "Reference"
      text: view.state.doc.sliceString(child.from, child.to)
    });
  }

  return { label, content };
}

// Extract Anno node safely

function extractAnno(view: EditorView, annoNodeRef: SyntaxNodeRef) {
  const node = annoNodeRef.node;
  const notes: Record<string, string> = {};

  for (let c = node.firstChild; c; c = c.nextSibling) {
    if (c.name === 'Note') {
      const labelNode = c.getChild('Label');
      const textNode = c.getChild('Text');

      const label = labelNode ? view.state.doc.sliceString(labelNode.from, labelNode.to).trim() : "";
      const text = textNode ? view.state.doc.sliceString(textNode.from, textNode.to).trim() : "";

      notes[label] = text;

    }
  }

  return notes;
}
