<script>
  import Editor from '$lib/components/Editor.svelte';
  import ParallelView from '$lib/components/ParallelView.svelte';
  import { layoutMode } from "$lib/stores";
</script>

<div class="flex justify-center gap-8 p-8 w-full">
  {#if $layoutMode === "both"}
      <div class="flex-1 min-w-0">
        <Editor />
      </div>
      <div class="flex-1 min-w-0">
        <ParallelView />
      </div>

    {:else if $layoutMode === "editor"}
      <div class="flex-1 min-w-0">
        <Editor />
      </div>

    {:else if $layoutMode === "parallel"}
      <div class="flex-1 min-w-0">
        <ParallelView />
      </div>
    {/if}
</div>
