<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	 import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Toaster richColors />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
