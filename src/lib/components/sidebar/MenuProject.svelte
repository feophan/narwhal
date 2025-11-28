<script lang="ts">
  import FileListItem from "./FileListItem.svelte";
  import { MenuItem, MenuButton } from "$lib/components/ui/sidebar/index.js";

  import {ptmFiles, editorText, uploadFlag, currentProject, workingFolder} from "$lib/stores";
  import { readTextFile, watchImmediate } from '@tauri-apps/plugin-fs';
  import { readFolder } from "$lib/utils/readFolder";


  async function openFile(filePath: string) {
    try {
      const content = await readTextFile(filePath);
      currentProject.set(filePath);
      editorText.set(content);
      uploadFlag.set(true);
    } catch (err) {
      console.error('Failed to read file', err);
    }
  }

  $effect(() => {
      if (!$workingFolder) return;

      // Register new watcher
      watchImmediate($workingFolder as string, () => {
        readFolder($workingFolder);
      });
    });
</script>

<!-- Show file list -->
{#each $ptmFiles as file (file.path)}
  <MenuItem class="px-2">
    <MenuButton onclick={() => openFile(file.path)}>
      <FileListItem {file}/>
    </MenuButton>
  </MenuItem>
{/each}