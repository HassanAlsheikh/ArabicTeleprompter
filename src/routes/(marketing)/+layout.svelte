<script lang="ts">
	import '@fontsource/amiri/400.css';
	import '@fontsource/amiri/700.css';
	import '@fontsource/cairo/400.css';
	import '@fontsource/cairo/700.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<meta property="og:locale" content="ar_SA" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="التلقين العربي — Arabic Teleprompter" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}
