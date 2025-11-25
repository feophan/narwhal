import { writable } from "svelte/store";
import { userPrefersMode } from "mode-watcher";

// track editor mode
export const layoutMode = writable<"editor" | "parallel" | "both">("both");
export const theme = writable<"light" | "dark">(userPrefersMode.current === "dark" ? "dark" : "light");

// track window size
export const windowWidth = writable(
  typeof window !== "undefined" ? window.innerWidth : 1000
);

// Update on resize
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    windowWidth.set(window.innerWidth);
  });
}