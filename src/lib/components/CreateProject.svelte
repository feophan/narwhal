<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import FilePlusIcon from "@lucide/svelte/icons/file-plus";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  import { createPTM } from "$lib/utils/createProject";

  let newFileName = "Untitled";
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button size="sm" onclick={createPTM}><FilePlusIcon class="size-4" /></Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="right" sideOffset={10}>
      <p>Create new project</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>