// VSCode and npm run check were getting all whiney when this was embedded
// in the main page, so I've separated it out into its own file.

export const svelteCode = `<script>
  import Prism from "prismjs";
  import "prism-svelte";
  import {onMount} from "svelte";
  let show = false;

  onMount(() => {
    console.log("Mounted");
  });
</script>

<button on:click={() => show = !show}>Show!</button>

{#if show}
  <div>
	  This showcases the Svelte language syntax highlighting.
  </div>
{/if}
`;
