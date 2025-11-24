<script lang="ts">
	import '../app.css';
  import "$lib/autosave";
  import { ModeWatcher } from "mode-watcher";
  import AppSidebar from '$lib/components/CombinedSidebar.svelte';
  import LoginCard from "$lib/components/LoginCard.svelte";

  // sidebar
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
 
  let { children } = $props();

  import { layoutMode, windowWidth } from "$lib/stores";

  const MIN_BOTH_WIDTH = 1100; // adjust as needed

  $effect(() => {
    if ($windowWidth < MIN_BOTH_WIDTH && $layoutMode === "both") {
      layoutMode.set("editor");
    }
  });
</script>

<ModeWatcher />
<Sidebar.Provider>
  <AppSidebar />
  <main class="min-w-0 w-full">
    <Sidebar.Trigger />
    <LoginCard />
    {@render children?.()}
  </main>
</Sidebar.Provider>
