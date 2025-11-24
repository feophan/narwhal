import { writable } from "svelte/store";
import type { Book } from "$lib/types";

import { LazyStore } from '@tauri-apps/plugin-store';
import { readFolder } from "$lib/utils/readFolder";
import { userPrefersMode } from "mode-watcher";

// redo for JSON tree
export const tree = writable<Book | null>(null);

export const uploadFlag = writable(false);

export const editorText = writable(`# Chapter
## Paragraph
### Language1
Some text
### Language2
Some^1 text^2
%%
>1 annotation here
>2 annotation there`); // raw text

// list of files in working directory
export const ptmFiles = writable<{ name: string; path: string; }[] | null>(null);

// current working project
export const currentProject = writable<string | null>(null);

// persistent storage of current working folder
export const store = new LazyStore('store.json');
// current working project folder
export const workingFolder = writable<string | null>(null);

  // Load persisted value
  (async () => {
    const saved = await store.get<string>("cwd");
    if (saved) {
      workingFolder.set(saved);
      readFolder(saved);
    };
  })();

  // Whenever cwd changes, persist it
  workingFolder.subscribe(async (value) => {
    await store.set("cwd", value);
    await store.save(); // commit to disk
  });

// track editor mode
export const layoutMode = writable<"editor" | "parallel" | "both">("both");
export const theme = writable<"light" | "dark">(userPrefersMode.current === "dark" ? "dark" : "light");

// track window size
export const windowWidth = writable(
  typeof window !== "undefined" ? window.innerWidth : 1000
);

// Update on resize
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    windowWidth.set(window.innerWidth);
  });
}