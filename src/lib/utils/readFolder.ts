// selectFolder.ts
import { readDir } from '@tauri-apps/plugin-fs';
import { join } from '@tauri-apps/api/path';
import { ptmFiles } from '$lib/stores';

export async function readFolder(folder: string) {
  
  const entries = await readDir(folder as string);

  const files = await Promise.all(
    entries
      .filter((e) => e.isFile && e.name.endsWith('.ptm'))
      .map(async (e) => ({
        name: e.name,
        path: await join(folder as string, e.name),
      }))
  );

  ptmFiles.set(files);
}
