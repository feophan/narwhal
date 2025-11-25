<script lang="ts">
 import SunIcon from "@lucide/svelte/icons/sun";
 import MoonIcon from "@lucide/svelte/icons/moon";
 
 import { toggleMode, userPrefersMode } from "mode-watcher";
 import { Button } from "$lib/components/ui/button";
 import { theme } from "$lib/stores/ui";

 function switchMode() {
  userPrefersMode.current === "dark" ? theme.set("light") : theme.set("dark");
  toggleMode();
 }
</script>

<Button
	variant="ghost"
	size="icon"
	class="h-7 w-7"
	type="button"
	onclick={switchMode}
>
	<SunIcon
  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
 />
 <MoonIcon
  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
 />
	<span class="sr-only">Toggle Sidebar</span>
</Button>