<script lang="ts">
  // ui
  import { Button } from "$lib/components/ui/button";
  import CommandIcon from "@lucide/svelte/icons/component";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  import { selectFolder } from "$lib/utils/selectFolder";

</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button size="sm" onclick={selectFolder}><CommandIcon class="size-4" /></Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="right" sideOffset={10}>
      <p>Choose directory</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
