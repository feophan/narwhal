// selectFolder.ts
import { open } from '@tauri-apps/plugin-dialog';
import { workingFolder } from '$lib/stores';
import { readFolder } from "$lib/utils/readFolder";

export async function selectFolder() {
  const folder = await open({ directory: true });
  if (!folder) return;

  workingFolder.set(folder);

  readFolder(folder);
}
