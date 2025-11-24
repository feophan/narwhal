import { editorText, currentProject } from "$lib/stores";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { get } from "svelte/store";

let timeout: any = null;

editorText.subscribe((text) => {
  const path = get(currentProject);
  if (!path) return; // No file open, skip autosave

  // Debounce: wait 500ms after last change
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    try {
      await writeTextFile(path, text);
      console.log("Autosaved:", path);
    } catch (err) {
      console.error("Autosave failed:", err);
    }
  }, 500);
});
