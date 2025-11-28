<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  import MenuProject from "./MenuProject.svelte";
  import MenuGlossary from './MenuGlossary.svelte';
  import TOCList from "./TOCList.svelte";
  import DoubtList from "./DoubtList.svelte";
  import SearchBar from "../SearchBar.svelte";

  let {activeItem} = $props();

  import type { Component } from "svelte";

  const panels: Record<string, Component> = {
    "Projects": MenuProject,
    "Glossary": MenuGlossary,
    "Search": SearchBar,
    "Content": TOCList,
    "Issues": DoubtList,
  };

  let Panel = $state(panels[activeItem.title]);

  $effect(() => {
    Panel = panels[activeItem.title];
  })

</script>

<Sidebar.Root collapsible="none" class="hidden flex-1 md:flex">
  <Sidebar.Header class="gap-3.5 border-b p-4">
    <div class="flex w-full items-center justify-between">
      <div class="text-foreground text-base font-medium">
        {activeItem.title}
      </div>
    </div>
  </Sidebar.Header>
  <ScrollArea class="h-full">
    <Sidebar.Content class="mb-12">
      <Sidebar.Group class="px-0">
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Panel />
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group> 
    </Sidebar.Content>
  </ScrollArea>
</Sidebar.Root>