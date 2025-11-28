<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";
  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

  import { navMain } from "$lib/config/menu";
  import SidebarIcon from "$lib/components/sidebar/SidebarIcon.svelte";
  import SidebarContent from "$lib/components/sidebar/SidebarContent.svelte";

  let activeItem = $state(navMain[0]);

  import { watchImmediate } from '@tauri-apps/plugin-fs';
  import { readFolder } from "$lib/utils/readFolder";
  import { workingFolder } from '$lib/stores';

  $effect(() => {
      if (!$workingFolder) return;

      // Register new watcher
      watchImmediate($workingFolder as string, () => {
        readFolder($workingFolder);
      });
    });
</script>

<Sidebar.Root
  bind:ref
  collapsible="icon"
  class="pt-8 overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
  {...restProps}
>
  <SidebarIcon bind:activeItem />
  <SidebarContent {activeItem} />
</Sidebar.Root>