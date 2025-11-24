import { create } from '@tauri-apps/plugin-fs';
import { join } from '@tauri-apps/api/path';
import { ptmFiles, workingFolder } from '$lib/stores';
import { get } from 'svelte/store';

export async function createPTM() {
  const folder = get(workingFolder);
  if (!folder) throw new Error("No working folder selected");

  const filename = 'Untitled.ptm';
  const path = await join(folder as string, filename);
  const file = await create(path);

  console.log("File created!");

  // Update the ptmFiles store
  ptmFiles.update((files) => [...files, { name: filename, path }]);
}
