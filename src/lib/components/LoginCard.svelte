<script lang="ts">
  import { workingFolder } from "$lib/stores";
  import { Button } from "$lib/components/ui/button";
  import { selectFolder } from "$lib/utils/selectFolder";

  let open = true;

  // show overlay whenever there is no folder
  $: open = $workingFolder === null;

</script>

{#if open}
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-8 w-full max-w-sm border">
      <h2 class="text-xl font-semibold mb-4">No working directory selected</h2>
      <p class="text-sm mb-6 text-neutral-600 dark:text-neutral-300">
        Choose a directory to load your files.
      </p>
      <Button size="sm" onclick={selectFolder}>Open project folder</Button>
    </div>
  </div>
{/if}
