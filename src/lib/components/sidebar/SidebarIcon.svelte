<script lang="ts">
  import { navMain } from "$lib/config/menu"; // adjust this when adding new menus
  import { useSidebar } from "$lib/components/ui/sidebar/context.svelte.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  let { activeItem = $bindable() } = $props()
  const sidebar = useSidebar();

  import OpenFolder from "$lib/components/OpenFolder.svelte";
  import CreateProject from "$lib/components/CreateProject.svelte";
</script>

<Sidebar.Root collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-e">
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupContent class="px-1.5 md:px-0">
          <Sidebar.Menu>
            {#each navMain as item (item.title)}
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