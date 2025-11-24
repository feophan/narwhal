<script lang="ts">
  import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { remove, rename } from '@tauri-apps/plugin-fs';
  import { join } from '@tauri-apps/api/path';

  export let file: { name: string; path: string };

  let showDeleteDialog = false;
  let isEditing = false;
  let fileName = file.name.slice(0,-4);

  async function renameFile() {
    try {
     isEditing = true;
    } catch (err) {
      console.log("Failed to rename file", err);
    }
  }

    async function saveName() {
    const dir = file.path.substring(0, file.path.lastIndexOf('\\'));
    try {
     let newName = dir.concat("\\",fileName.concat('.ptm'));
     await rename(file.path, newName);
    } catch (err) {
      console.log("Failed to rename file", err);
    } finally {
      isEditing = false;
    }
  }

  async function deleteFile() {
    try {
      await remove(file.path);
    } catch (err) {
      console.error('Failed to delete file', err);
    } finally {
      showDeleteDialog = false;
    }
  }
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    {#if isEditing}
      <Input bind:value={fileName} onblur={saveName} onchange={saveName}/>
    {:else}
      {file.name.slice(0, -4)}
    {/if}
  </ContextMenu.Trigger>

  <ContextMenu.Content>
    <ContextMenu.Item onclick={renameFile}>Rename</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item onclick={() => (showDeleteDialog = true)} class="text-red-600">
      Delete
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>

{#if showDeleteDialog}
  <AlertDialog.Root bind:open={showDeleteDialog}>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Delete file</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete {file.name.slice(0, -4)}?
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel onclick={() => (showDeleteDialog = false)}>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action onclick={deleteFile}>Continue</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}
