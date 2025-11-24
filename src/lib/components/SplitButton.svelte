<script lang="ts">
  import { MenuButton } from "$lib/components/ui/sidebar";
  import SpliScreenIcon from "@lucide/svelte/icons/between-vertical-start";

  import { layoutMode } from "$lib/stores";

  function nextLayout() {
    const order = ["both", "editor", "parallel"] as const;
    const current = order.indexOf($layoutMode);
    layoutMode.set(order[(current + 1) % order.length]);
  }
</script>

<MenuButton
  tooltipContentProps={{
    hidden: false,
  }}
  onclick={nextLayout}
  class="px-2.5 md:px-2"
>
  {#snippet tooltipContent()}
    Change view
  {/snippet}
  <SpliScreenIcon />
  <span>Change view</span>
</MenuButton>
