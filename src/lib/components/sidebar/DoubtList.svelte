<script lang="ts">
  import { collectDoubts } from "$lib/utils/doubtCollector";
  import { tree } from '$lib/stores';

  import * as Table from "$lib/components/ui/table/index.js";

  $: data = collectDoubts($tree);

</script>

<Table.Root>
  <Table.Body>
    {#each data as doubt}
      <Table.Row>
        <Table.Cell>{doubt}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
