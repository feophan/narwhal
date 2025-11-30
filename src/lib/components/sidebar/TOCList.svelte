<script lang="ts">
  import {MenuItem, MenuButton, MenuSub, MenuSubItem, MenuSubButton} from "$lib/components/ui/sidebar/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { tree, lineNum } from "$lib/stores";

  import { layoutMode} from "$lib/stores/ui";

  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

  async function selectChapter(line: number) {
    if (["editor", "both"].includes($layoutMode)) {
      lineNum.set(line);
    }
    else {
      const el = document.getElementById(`line-${line}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
</script>

{#if $tree?.children}
  {#each $tree.children as chapter}
  <Collapsible.Root class="group/collapsible">
    <Collapsible.Trigger class="px-2">
      <MenuItem>
        {#if chapter.children && chapter.children[0]}
          <MenuButton onclick={() => selectChapter(chapter.line)}>
            {chapter.children[0].text}
            <ChevronRightIcon
              class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </MenuButton>
        {/if}
      </MenuItem>
    </Collapsible.Trigger>
    <Collapsible.Content>
        <MenuSub>
          {#each chapter.children as section}
            {#if section.type === "Section"}
            <MenuSubItem>
              {#if section.children && section.children[0]}
                <MenuSubButton onclick={() => selectChapter(section.line)}>
                  {section.children[0].text}
                </MenuSubButton>
              {/if}
            </MenuSubItem>
            {/if}
        {/each}
        </MenuSub>
    </Collapsible.Content>
  </Collapsible.Root>
  {/each}
{/if}