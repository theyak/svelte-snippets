<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prism-svelte';
	import { prism } from '$lib/prism.js';
	import { svelteCode } from './svelteCode';

	interface Languages {
		cpp: boolean | string;
		php: boolean | string;
		python: boolean | string;
		ruby: boolean | string;
		rust: boolean | string;
		svelte?: boolean;
	}

	let show = {
		cpp: false,
		php: false,
		python: false,
		ruby: false,
		rust: false,
		svelte: false
	} as Languages;

	const code = {
		cpp: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}`,
		php: `<?php\necho "Hello, World!\\n";`,
		python: `print("Hello, world!")`,
		ruby: `puts "Hello, World!"`,
		rust: `fn main() {\n    println!("Hello, world!");\n}`
	} as Languages;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js';
		document.head.append(script);
		script.onload = () => Prism.highlightAll();
	});

	function toggle(language: keyof Languages) {
		show[language] = !show[language];
	}
</script>

<button on:click={() => toggle('cpp')}>C++</button>
<button on:click={() => toggle('php')}>PHP</button>
<button on:click={() => toggle('python')}>Python</button>
<button on:click={() => toggle('ruby')}>Ruby</button>
<button on:click={() => toggle('rust')}>Rust</button>
<button on:click={() => toggle('svelte')}>Svelte</button>

{#if show.cpp}
	<pre><code use:prism class="language-cpp">{code.cpp}</code></pre>
{/if}

{#if show.php}
	<pre><code use:prism class="language-php">{code.php}</code></pre>
{/if}

{#if show.ruby}
	<pre><code use:prism class="language-ruby">{code.ruby}</code></pre>
{/if}

{#if show.python}
	<pre><code use:prism class="language-python">{code.python}</code></pre>
{/if}

{#if show.rust}
	<pre><code use:prism class="language-rust">{code.rust}</code></pre>
{/if}

{#if show.svelte}
	<pre><code use:prism class="language-svelte">{svelteCode}</code></pre>
{/if}
