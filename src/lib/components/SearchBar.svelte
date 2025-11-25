<script lang="ts">
  import { searchQuery, searchResults } from "$lib/stores/search";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="p-4 space-y-4">
  <Input bind:value={$searchQuery} type="text" placeholder="Search all files…" class="max-w-xs" />

  {#if $searchResults.length === 0 && $searchQuery.length > 1}
    <p class="text-sm text-muted-foreground">No results.</p>
  {/if}

  {#each $searchResults as result}
    <div class="p-2 border rounded hover:bg-accent">
      <div class="font-semibold">{result.file}</div>
      <div class="text-xs text-muted-foreground">{result.preview}</div>
    </div>
  {/each}
</div>
