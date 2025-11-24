<script lang="ts">
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { Button } from "$lib/components/ui/button";
  import MinusIcon from "@lucide/svelte/icons/minus";
  import SquareIcon from "@lucide/svelte/icons/square";
  import XIcon from "@lucide/svelte/icons/x";

  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import SplitButton from "./SplitButton.svelte";
  import ModeButton from "./ModeButton.svelte";

  const window = getCurrentWindow();
</script>

<div data-tauri-drag-region class="fixed top-0 left-0 right-0 z-50 
         flex gap-8 items-center justify-between h-8 
         bg-background border-b px-2">
  <!-- drag region -->
  <div class="flex-1" data-tauri-drag-region></div>

  <!-- window controls -->
  <div class="flex gap-1">
    <Sidebar.Trigger />
    <SplitButton />
    <ModeButton />
  </div>
  <div class="flex gap-1">
    <Button
      size="icon"
      variant="ghost"
      class="h-6 w-6 rounded-none"
      title="Minimize"
      onclick={() => window.minimize()}
    >
      <MinusIcon class="h-3 w-3" />
    </Button>

    <Button
      size="icon"
      variant="ghost"
      class="h-6 w-6 rounded-none"
      title="Maximize"
      onclick={() => window.toggleMaximize()}
    >
      <SquareIcon class="h-3 w-3" />
    </Button>

    <Button
      size="icon"
      variant="ghost"
      class="h-6 w-6 rounded-none hover:bg-destructive hover:text-destructive-foreground"
      title="Close"
      onclick={() => window.close()}
    >
      <XIcon class="h-3 w-3" />
    </Button>
  </div>
</div>

<style>
  /* optional: prevent text selection in the title bar */
  .titlebar {
    -webkit-user-select: none;
    user-select: none;
  }
</style>
