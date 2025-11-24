<script lang="ts">
import { onMount } from "svelte";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { dsl } from "$lib/dslLanguage";
import { dslSyntaxHighlighting } from "$lib/dslHighlight";
import { tree, editorText, uploadFlag } from "$lib/stores";
import { treeToJSON } from "$lib/utils/treeParser";
import { customKeymap } from "$lib/editor/keymap";

// lint
import { linter, lintGutter } from "@codemirror/lint";
import { dslLinter } from "$lib/dslLinter";
//

// mode switching

import { cmLightTheme, cmDarkTheme, themeCompartment } from "$lib/editor/theme";
import { theme } from "$lib/stores";
//

let parent: HTMLDivElement;
let editor: EditorView;

onMount(() => {
  const state = EditorState.create({
    doc: $editorText,
    extensions: [
      basicSetup,
      themeCompartment.of(cmLightTheme), // initial theme
      customKeymap, // custom key shortcuts
      EditorView.lineWrapping,
      dsl(),
      dslSyntaxHighlighting,
      lintGutter(),
      linter(dslLinter),
      EditorView.updateListener.of((update) => {
          const newBlocks = treeToJSON(update.state.doc.toString());
          tree.set(newBlocks);
          editorText.set(update.state.doc.toString());
      }),
    ],
  });

  // Reactively update CodeMirror when theme changes
  $effect(() => {
    if (!editor) return;

    editor.dispatch({
      effects:themeCompartment.reconfigure($theme === "dark" ? cmDarkTheme : cmLightTheme)
    });
  });

  editor = new EditorView({ state, parent });

  uploadFlag.subscribe((flag) => {
    if (flag) {
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: $editorText },
    });
    uploadFlag.set(false);
    };
  })
});
</script>

<div bind:this={parent} class="editor"></div>