<script lang="ts">
	import DOMPurify from 'dompurify';
	import { FONTS } from '$lib/stores/settings.svelte';
	import { stripTashkeelFromHtml } from '$lib/utils/tashkeel';
	import { onSyncMessage } from '$lib/utils/sync';

	const SANITIZE_CONFIG = {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'span', 'mark', 'sub', 'sup', 'div'],
		ALLOWED_ATTR: ['dir', 'class', 'data-segment-marker']
	};

	let scrollPosition = $state(0);
	let text = $state('<p>في انتظار الاتصال بنافذة التحكم...</p>');
	let fontSize = $state(56);
	let fontFamily = $state('Amiri');
	let lineHeight = $state(2.0);
	let margins = $state(10);
	let mirrorMode = $state(false);
	let showTashkeel = $state(true);

	const fontConfig = $derived(FONTS.find((f) => f.name === fontFamily));
	const displayHtml = $derived(showTashkeel ? text : stripTashkeelFromHtml(text));

	$effect(() => {
		return onSyncMessage((state) => {
			if (state.scrollPosition != null) scrollPosition = state.scrollPosition;
			if (state.text != null) text = DOMPurify.sanitize(state.text, SANITIZE_CONFIG);
			if (state.fontSize != null) fontSize = state.fontSize;
			if (state.fontFamily != null) fontFamily = state.fontFamily;
			if (state.lineHeight != null) lineHeight = state.lineHeight;
			if (state.margins != null) margins = state.margins;
			if (state.mirrorMode != null) mirrorMode = state.mirrorMode;
			if (state.showTashkeel != null) showTashkeel = state.showTashkeel;
		});
	});
</script>

<div class="talent-display">
	<div class="reading-guide"></div>

	<div
		class="text-content"
		dir="rtl"
		style="
			transform: {mirrorMode ? 'scaleX(-1) ' : ''}translateY(-{scrollPosition}px);
			font-size: {fontSize}px;
			font-family: {fontConfig?.family ?? "'Amiri', serif"};
			line-height: {lineHeight};
			padding-left: {margins}%;
			padding-right: {margins}%;
		"
	>
		{@html displayHtml}
	</div>
</div>

<style>
	.talent-display {
		position: fixed;
		inset: 0;
		background: #000;
		overflow: hidden;
		cursor: none;
	}

	.reading-guide {
		position: fixed;
		top: 30%;
		left: 0;
		right: 0;
		height: 3px;
		background: rgba(255, 60, 60, 0.25);
		z-index: 10;
		pointer-events: none;
		box-shadow: 0 0 20px 4px rgba(255, 60, 60, 0.08);
	}

	.text-content {
		color: #fff;
		text-align: right;
		padding-top: 30vh;
		padding-bottom: 100vh;
		will-change: transform;
		user-select: none;
		-webkit-user-select: none;
	}

	.text-content :global(p) {
		margin: 0;
		padding: 0.1em 0;
	}

	.text-content :global(p:empty) {
		min-height: 0.5em;
	}

	.text-content :global(p[dir='ltr']) {
		text-align: left;
	}

	.text-content :global(mark) {
		border-radius: 2px;
		padding: 0 3px;
	}

	.text-content :global(.segment-marker) {
		border-top: 2px solid rgba(255, 255, 255, 0.15);
		margin: 0.8em 0;
		padding: 0.3em 0;
		color: rgba(255, 255, 255, 0.35);
		font-size: 0.6em;
		text-align: center;
	}
</style>
