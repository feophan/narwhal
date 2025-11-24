<script lang="ts" module>
  import ProjectIcon from "@lucide/svelte/icons/clipboard-list";
  import GlossaryIcon from "@lucide/svelte/icons/book-a";
  import OpenFolder from "$lib/components/OpenFolder.svelte";
  import CreateProject from "./CreateProject.svelte";

  import FileListItem from "./FileListItem.svelte";

  // menu list
  const menu = {
    navMain: [
      {
        title: "Projects",
        url: "#",
        icon: ProjectIcon,
        isActive: true,
      },
      {
        title: "Glossary",
        url: "#",
        icon: GlossaryIcon,
        isActive: false,
      }
    ],
  };

  import {ptmFiles, editorText, uploadFlag, currentProject, tree} from "$lib/stores";
  import { readTextFile } from '@tauri-apps/plugin-fs';

  import GlossaryTable from '$lib/components/GlossaryTable.svelte';

  async function openFile(filePath: string) {
    try {
      const content = await readTextFile(filePath);
      currentProject.set(filePath);
      editorText.set(content);
      uploadFlag.set(true);
    } catch (err) {
      console.error('Failed to read file', err);
    }
  }
</script>
<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar/context.svelte.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";
  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
  let activeItem = $state(menu.navMain[0]);
  const sidebar = useSidebar();

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

  let search = $state("");
</script>

<Sidebar.Root
  bind:ref
  collapsible="icon"
  class="pt-8 overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
  {...restProps}
>
  <!-- This is the first sidebar -->
  <!-- We disable collapsible and adjust width to icon. -->
  <!-- This will make the sidebar appear as icons. -->
  <Sidebar.Root collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-e">
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupContent class="px-1.5 md:px-0">
          <Sidebar.Menu>
            {#each menu.navMain as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  tooltipContentProps={{
                    hidden: false,
                  }}
                  onclick={() => {
                    activeItem = item;
                    sidebar.setOpen(true);
                  }}
                  isActive={activeItem.title === item.title}
                  class="px-2.5 md:px-2"
                >
                  {#snippet tooltipContent()}
                    {item.title}
                  {/snippet}
                  <item.icon />
                  <span>{item.title}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <CreateProject />
      <OpenFolder />
    </Sidebar.Footer>
  </Sidebar.Root>
  <!-- This is the second sidebar -->
  <!-- We disable collapsible and let it fill remaining space -->
  <Sidebar.Root collapsible="none" class="hidden flex-1 md:flex">
    <Sidebar.Header class="gap-3.5 border-b p-4">
      <div class="flex w-full items-center justify-between">
        <div class="text-foreground text-base font-medium">
          {activeItem.title}
        </div>
      </div>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group class="px-0">
        <Sidebar.GroupContent>
          {#if activeItem.title === "Projects"}
            <!-- Show file list -->
            <Sidebar.Menu>
              {#each $ptmFiles as file (file.path)}
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton onclick={() => openFile(file.path)}>
                    <FileListItem {file}/>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              {/each}
            </Sidebar.Menu>
          {:else if activeItem.title === "Glossary"}
            <!-- Show glossary table -->
            <Sidebar.Menu>
              <Sidebar.Input placeholder="Type to search..." bind:value={search} />
              <GlossaryTable {search} />
            </Sidebar.Menu>
          {/if}
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Root>
</Sidebar.Root>