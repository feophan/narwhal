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
          <h2 class="text-lg font-bold">{section.text}</h2>
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

        <div class="parallel-container">
  <Card class="w-full shadow-sm">
    <CardContent class="p-4">
      <div
        class="grid gap-6"
        style={`grid-template-columns: auto repeat(${langs.length}, 1fr);`}
      >
        <!-- Block label column -->
        <div class="flex items-start justify-start text-sm font-medium text-muted-foreground pr-4">
          {blockLabel?.text}
        </div>

        <!-- Language columns -->
        {#each langs as lang}
          <div class="flex flex-col gap-2">
            <h4 class="text-base font-semibold leading-none tracking-tight">
              {lang.children.find(c => c.type === "Label")?.text}
            </h4>

            <Separator />

            <div
              class="prose prose-sm dark:prose-invert max-w-none">
              {@html renderContent(
                lang.children.find(c => c.type === "Content")?.children || [],
                annotations
              )}
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>
        </CardContent>
      {/if}



    {/each}
  {/each}
</Card>
{/if}


<style>
.parallel-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.parallel {
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top: 1px solid #eee;
  align-items: start;
}

.block-label {
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.5rem;
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
}


.col {
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.2;
}

h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  font-weight: 600;
}

:global(.ref) {
  color: #555;
  cursor: pointer;
}

.panel-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
}

.text {
  white-space: pre-line;
  margin: 0;
}
</style>
