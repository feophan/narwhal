<script lang="ts">
	import '../app.css';
  import "$lib/autosave";
  import { ModeWatcher } from "mode-watcher";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import AppSidebar from '$lib/components/CombinedSidebar.svelte';
  import LoginCard from "$lib/components/LoginCard.svelte";

  import AppFrame from "$lib/components/AppFrame.svelte";

  // sidebar
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
 
  let { children } = $props();

  import { layoutMode, windowWidth } from "$lib/stores/ui";

  const MIN_BOTH_WIDTH = 1100; // adjust as needed

  $effect(() => {
    if ($windowWidth < MIN_BOTH_WIDTH && $layoutMode === "both") {
      layoutMode.set("editor");
    }
  });
</script>

<ModeWatcher />
<div class="flex flex-col h-screen">
  <!-- Sidebar + Main -->
  <div class="flex flex-1 overflow-hidden">
    <Sidebar.Provider>
      <AppFrame />
      <AppSidebar />
      
      <main class="flex-1 flex flex-col pt-8">
        <ScrollArea class="h-full">
            <LoginCard />
            {@render children?.()}
        </ScrollArea>
      </main>
    </Sidebar.Provider>
  </div>
</div>

