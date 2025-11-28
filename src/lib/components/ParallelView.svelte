<script lang="ts">
  import { tree } from '$lib/stores';
  import DOMPurify from 'dompurify';
  import type { Inline } from '$lib/types';

  // ui components
  import { Card, CardHeader, CardContent } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  //z
  export function renderContent(content: Inline[], annotations: Map<string, string>): string {
    const html = content.map(piece => {
      if (!piece.text) return '';

      switch (piece.type) {
        case 'Text':
          return `<span>${escapeHTML(piece.text)}</span>`;

        case 'Reference': {
          const num = piece.text.slice(1); // remove ^
          const title = annotations.get(num) || '';
          return `<sup class="ref" title="${escapeHTML(title)}">${escapeHTML(num)}</sup>`;
        }

        case 'Italic':
          return `<em>${escapeHTML(piece.text.slice(1, -1))}</em>`; // remove _ delimiters

        case 'Bold':
          return `<strong>${escapeHTML(piece.text.slice(1, -1))}</strong>`; // remove * delimiters

        case 'Doubt':
          return `<span class="doubt">${escapeHTML(piece.text.slice(1, -1))}</span>`; // remove {} delimiters

        default:
          return escapeHTML(piece.text);
      }
    }).join('');

    // Sanitize final HTML
    return DOMPurify.sanitize(html);
  }

  // Helper to escape plain text
  function escapeHTML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
</script>

{#if $tree?.children}
<Card>
  {#each $tree.children as chapter}
    {#each chapter.children as section}

      {#if section.type === "Label"}
        <CardHeader>
          <h2 id={`line-${chapter.line}`} class="text-lg font-bold">{section.text}</h2>
        </CardHeader>

      {:else if section.type === "Section"}
        <CardContent>
        <!-- Extract block-level info -->
        {@const blockLabel = section.children.find(c => c.type === "Label")}
        {@const langs = section.children.filter(c => c.type === "Language")}
        {@const annoNode = section.children.find(c => c.type === "Annotation")}

        <!-- Build annotations map -->
        {@const annotations = (() => {
          const map = new Map<string, string>();
          if (annoNode?.children) {
            for (const note of annoNode.children) {
              if (note.type === "Note") {
                const label = note.children.find(c => c.type === "Label")?.text?.trim();
                const text  = note.children.find(c => c.type === "Text")?.text?.trim();
                if (label && text) map.set(label, text);
              }
            }
           }
          return map;
        })()}

          <Card class="w-full shadow-sm">
            <CardContent class="p-4">
              <!-- Outer grid: label + content column -->
              <div class="grid gap-6 grid-cols-[auto,1fr]">
                <!-- Block label column -->
                <div id={`line-${section.line}`} class="flex items-start justify-start text-sm font-medium text-muted-foreground pr-4">
                  {blockLabel?.text}
                </div>

                <!-- Content column: allow shrinking -->
                <div class="min-w-0">
                  <!-- Inner grid: auto-fit language cards -->
                  <div
                    class="grid gap-6"
                    style="grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));"
                  >
                    {#each langs as lang}
                      <div class="flex flex-col gap-2">
                        <h4 class="text-base font-semibold leading-none tracking-tight">
                          {lang.children.find(c => c.type === "Label")?.text}
                        </h4>

                        <Separator />

                        <div class="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
                          {@html renderContent(
                            lang.children.find(c => c.type === "Content")?.children || [],
                            annotations
                          )}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      {/if}
    {/each}
  {/each}
</Card>
{/if}


<style>


:global(.ref) {
  color: #555;
  cursor: pointer;
}

:global(.doubt) {
  color: oklch(0.577 0.245 27.325);
}

</style>
