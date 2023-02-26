<script lang="ts">
	import { onMount } from 'svelte';
	import Prism, { highlightElement } from 'prismjs';
	import 'prism-svelte';
	import { prism } from '$lib/prism.js';
	import Button from '$lib/Button.svelte';
	import { svelteCode } from './svelteCode';

	let mycode = '';
	let highlighted = '';
	let currentLanguage = 'php';

	interface Languages<T> {
		cpp: T;
		php: T;
		python: T;
		ruby: T;
		rust: T;
		svelte: T;
	}

	let show = {
		cpp: false,
		php: false,
		python: false,
		ruby: false,
		rust: false,
		svelte: false
	} as Languages<boolean>;

	const code = {
		cpp: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}`,
		php: `<?php\necho "Hello, World!\\n";`,
		python: `print("Hello, world!")`,
		ruby: `puts "Hello, World!"`,
		rust: `fn main() {\n    println!("Hello, world!");\n}`,
		svelte: svelteCode
	} as Languages<string>;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js';
		document.head.append(script);
		script.onload = () => Prism.highlightAll();
	});

	const debounce = (func: Function, wait: number) => {
		let timeout: any;

		// This is the function that is returned and will be executed many times
		// We spread (...args) to capture any number of parameters we want to pass
		return function executedFunction(...args: any[]) {
			// The callback function to be executed after
			// the debounce time has elapsed
			const later = () => {
				// null timeout to indicate the debounce ended
				timeout = null;

				// Execute the callback
				func(...args);
			};
			// This will reset the waiting every function execution.
			// This is the step that prevents the function from
			// being executed because it will never reach the
			// inside of the previous setTimeout
			clearTimeout(timeout);

			// Restart the debounce waiting period.
			// setTimeout returns a truthy value (it differs in web vs Node)
			timeout = setTimeout(later, wait);
		};
	};

	const updateCode = debounce(() => {
		highlighted = Prism.highlight(mycode, Prism.languages[currentLanguage], currentLanguage);
	}, 500);

	function toggle(language: keyof Languages<string>) {
		mycode = code[language];
		currentLanguage = language;
		highlighted = Prism.highlight(mycode, Prism.languages[language], language);
	}
</script>

<div class="flex flex-col h-screen">
	<div>
		<Button on:click={() => toggle('cpp')}>C++</Button>
		<Button on:click={() => toggle('php')}>PHP</Button>
		<Button on:click={() => toggle('python')}>Python</Button>
		<Button on:click={() => toggle('ruby')}>Ruby</Button>
		<Button on:click={() => toggle('rust')}>Rust</Button>
		<Button on:click={() => toggle('svelte')}>Svelte</Button>
	</div>

	<div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
		<div
			style="width: 230px; min-width: 230px"
			class="w-full flex-shrink flex-grow-0 bg-gray-100 p-4 border-r border-red-500"
		>
			Column 1
		</div>
		<div class="top-0 bg-gray-100 w-full h-full border-r-4 border-red-500">
			<textarea
				class="w-full h-full p-4"
				style="outline: none"
				bind:value={mycode}
				on:input={updateCode}
			/>
		</div>
		<div class="w-full h-full" style="background-color: #272822">
			<pre><code class="language-svelte">{@html highlighted}</code></pre>
		</div>
	</div>
</div>

<div style="display: none">
	<pre><code class="language-cpp" /></pre>
	<pre><code class="language-python" /></pre>
	<pre><code class="language-ruby" /></pre>
	<pre><code class="language-php" /></pre>
	<pre><code class="language-rust" /></pre>
</div>
