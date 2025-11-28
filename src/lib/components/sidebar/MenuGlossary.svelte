<script lang="ts">
  import { Input } from "$lib/components/ui/sidebar/index.js";
  import GlossaryTable from "./GlossaryTable.svelte";
  let search = $state("");
</script>
<!-- Show glossary table -->
<Input placeholder="Type to search..." bind:value={search} />
<GlossaryTable {search} />