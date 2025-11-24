<script lang="ts">
  import { collectGlossary } from "$lib/utils/glossaryCollector";
  import { tree } from '$lib/stores';

  import * as Table from "$lib/components/ui/table/index.js";

  $: data = collectGlossary($tree);

  console.log(data);

  export let search = "";

  // filtered results
  $: filtered = data.filter(([term, definition]) =>
    term.toLowerCase().includes(search.toLowerCase()) ||
    definition.toLowerCase().includes(search.toLowerCase())
  );
</script>

<Table.Root>
  <Table.Body>
    {#each filtered as gloss}
      <Table.Row>
        <Table.Cell class="font-medium">{gloss[0]}</Table.Cell>
        <Table.Cell>{gloss[1]}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
