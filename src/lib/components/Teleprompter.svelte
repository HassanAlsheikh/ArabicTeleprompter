<script lang="ts">
	import DOMPurify from 'dompurify';
	import { settings, FONTS } from '$lib/stores/settings.svelte';
	import { scriptStore } from '$lib/stores/script.svelte';
	import { stripTashkeelFromHtml } from '$lib/utils/tashkeel';
	import { broadcastState } from '$lib/utils/sync';
	import Controls from './Controls.svelte';

	const SANITIZE_CONFIG = {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'span', 'mark', 'sub', 'sup', 'div'],
		ALLOWED_ATTR: ['dir', 'class', 'data-segment-marker']
	};

	let textEl: HTMLDivElement | undefined = $state();
	let animationFrameId: number;
	let lastTimestamp = 0;
	let controlsVisible = $state(true);
	let autoHideTimer: number;

	const fontConfig = $derived(FONTS.find((f) => f.name === settings.fontFamily));
	const displayHtml = $derived(
		DOMPurify.sanitize(
			settings.showTashkeel ? scriptStore.text : stripTashkeelFromHtml(scriptStore.text),
			SANITIZE_CONFIG
		)
	);

	function scrollLoop(timestamp: number) {
		if (lastTimestamp > 0 && scriptStore.isPlaying) {
			const delta = timestamp - lastTimestamp;
			const pxPerSecond = settings.scrollSpeed * 50;
			const newPosition = scriptStore.scrollPosition + (delta / 1000) * pxPerSecond;

			if (textEl) {
				const maxScroll = Math.max(0, textEl.scrollHeight - window.innerHeight * 0.7);
				if (newPosition >= maxScroll) {
					scriptStore.scrollPosition = maxScroll;
					scriptStore.isPlaying = false;
				} else {
					scriptStore.scrollPosition = newPosition;
				}
			} else {
				scriptStore.scrollPosition = newPosition;
			}
		}
		lastTimestamp = timestamp;
		animationFrameId = requestAnimationFrame(scrollLoop);
	}

	$effect(() => {
		lastTimestamp = 0;
		animationFrameId = requestAnimationFrame(scrollLoop);
		return () => cancelAnimationFrame(animationFrameId);
	});

	// Broadcast state for dual-screen sync (debounced)
	let syncTimer: number | undefined;
	$effect(() => {
		// Read all reactive values first so Svelte tracks them
		const state = {
			scrollPosition: scriptStore.scrollPosition,
			isPlaying: scriptStore.isPlaying,
			text: scriptStore.text,
			fontSize: settings.fontSize,
			fontFamily: settings.fontFamily,
			lineHeight: settings.lineHeight,
			margins: settings.margins,
			mirrorMode: settings.mirrorMode,
			showTashkeel: settings.showTashkeel
		};

		clearTimeout(syncTimer);
		syncTimer = window.setTimeout(() => {
			broadcastState(state);
		}, 50);

		return () => clearTimeout(syncTimer);
	});

	function toggleControls() {
		controlsVisible = !controlsVisible;
		scheduleAutoHide();
	}

	function scheduleAutoHide() {
		clearTimeout(autoHideTimer);
		if (controlsVisible) {
			autoHideTimer = window.setTimeout(() => {
				controlsVisible = false;
			}, 5000);
		}
	}

	// Auto-hide controls after 5 seconds on mount
	$effect(() => {
		scheduleAutoHide();
		return () => clearTimeout(autoHideTimer);
	});

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case ' ':
				e.preventDefault();
				scriptStore.isPlaying = !scriptStore.isPlaying;
				break;
			case 'ArrowUp':
			case 'PageUp':
				e.preventDefault();
				scriptStore.scrollPosition = Math.max(
					0,
					scriptStore.scrollPosition - (e.key === 'PageUp' ? 500 : 100)
				);
				break;
			case 'ArrowDown':
			case 'PageDown':
				e.preventDefault();
				scriptStore.scrollPosition += e.key === 'PageDown' ? 500 : 100;
				break;
			case '+':
			case '=':
				settings.scrollSpeed = Math.min(10, settings.scrollSpeed + 0.5);
				break;
			case '-':
				settings.scrollSpeed = Math.max(0.5, settings.scrollSpeed - 0.5);
				break;
			case 'Escape':
				scriptStore.mode = 'edit';
				scriptStore.isPlaying = false;
				break;
			case 'm':
			case 'M':
				settings.mirrorMode = !settings.mirrorMode;
				break;
		}
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		scriptStore.scrollPosition = Math.max(0, scriptStore.scrollPosition + e.deltaY * 0.5);
	}

	let touchStartY = 0;
	let touchStartScroll = 0;
	let wasTouchDrag = false;

	function handleTouchStart(e: TouchEvent) {
		touchStartY = e.touches[0].clientY;
		touchStartScroll = scriptStore.scrollPosition;
		wasTouchDrag = false;
	}

	function handleTouchMove(e: TouchEvent) {
		e.preventDefault();
		const deltaY = touchStartY - e.touches[0].clientY;
		if (Math.abs(deltaY) > 5) wasTouchDrag = true;
		scriptStore.scrollPosition = Math.max(0, touchStartScroll + deltaY);
	}

	function handleTouchEnd() {
		if (!wasTouchDrag) {
			scriptStore.isPlaying = !scriptStore.isPlaying;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="teleprompter"
	role="presentation"
	onwheel={handleWheel}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
>
	<div class="reading-guide"></div>

	<div
		class="text-content"
		bind:this={textEl}
		dir="rtl"
		style="
			transform: {settings.mirrorMode ? 'scaleX(-1) ' : ''}translateY(-{scriptStore.scrollPosition}px);
			font-size: {settings.fontSize}px;
			font-family: {fontConfig?.family ?? "'Amiri', serif"};
			line-height: {settings.lineHeight};
			padding-left: {settings.margins}%;
			padding-right: {settings.margins}%;
		"
	>
		{@html displayHtml}
	</div>

	{#if controlsVisible}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="controls-overlay"
			onmousemove={scheduleAutoHide}
			onmousedown={scheduleAutoHide}
			oninput={scheduleAutoHide}
			onclick={scheduleAutoHide}
		>
			<Controls />
		</div>
	{/if}

	{#if !controlsVisible}
		<button
			class="controls-toggle"
			onclick={toggleControls}
			title="إظهار لوحة التحكم"
			aria-label="إظهار لوحة التحكم"
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
				<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
				<path d="m15 5 4 4" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.teleprompter {
		position: fixed;
		inset: 0;
		background: var(--prompter-bg, #000);
		overflow: hidden;
		z-index: 100;
		cursor: default;
	}

	.reading-guide {
		position: fixed;
		top: 30%;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--reading-guide, rgba(255, 60, 60, 0.25));
		z-index: 101;
		pointer-events: none;
		box-shadow: 0 0 20px 4px rgba(255, 60, 60, 0.08);
	}

	.text-content {
		color: var(--prompter-text, #fff);
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

	.controls-overlay {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 102;
	}

	.controls-toggle {
		position: fixed;
		bottom: 16px;
		left: 16px;
		z-index: 102;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		transition: background 0.2s, color 0.2s;
	}

	.controls-toggle:hover {
		background: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.8);
	}
</style>
