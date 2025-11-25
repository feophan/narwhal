import { derived, writable } from "svelte/store";
import { ptmFiles } from "../stores";
import { readTextFile } from "@tauri-apps/plugin-fs";

export const searchQuery = writable("");

type SearchResult = { file: string; path: string; preview: string };

export const searchResults = derived<[typeof searchQuery, typeof ptmFiles], SearchResult[]>(
  [searchQuery, ptmFiles],
  ([$query, $files], set) => {
    if ($query.length < 2) {
      set([]);
      return;
    }

    (async () => {
      const results: SearchResult[] = [];

      if ($files) {
        for (const file of $files) {
          const text = await readTextFile(file.path);
          const index = text.toLowerCase().indexOf($query.toLowerCase());
          if (index !== -1) {
            const preview = text
              .slice(Math.max(0, index - 30), index + 70)
              .replace(/\n/g, " ");
            results.push({ file: file.name, path: file.path, preview });
          }
        }
      }

      set(results);
    })();
  },
  [] // now correctly typed as SearchResult[]
);


