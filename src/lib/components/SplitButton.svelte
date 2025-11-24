<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import SpliScreenIcon from "@lucide/svelte/icons/between-vertical-start";

  import { layoutMode } from "$lib/stores";

  function nextLayout() {
    const order = ["both", "editor", "parallel"] as const;
    const current = order.indexOf($layoutMode);
    layoutMode.set(order[(current + 1) % order.length]);
  }
</script>

<Button
	variant="ghost"
	size="icon"
	class="h-7 w-7"
	type="button"
	onclick={nextLayout}
>
	<SpliScreenIcon />
	<span class="sr-only">Toggle Sidebar</span>
</Button>
