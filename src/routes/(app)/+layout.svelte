<script lang="ts">
	import '@fontsource/amiri/400.css';
	import '@fontsource/amiri/700.css';
	import '@fontsource/cairo/400.css';
	import '@fontsource/cairo/700.css';
	import '@fontsource/noto-naskh-arabic/400.css';
	import '@fontsource/noto-naskh-arabic/700.css';
	import '@fontsource/tajawal/400.css';
	import '@fontsource/tajawal/700.css';
	import { loadSettings, saveSettings } from '$lib/stores/settings.svelte';
	import { loadScript, saveScript, saveCrashState, clearCrashState } from '$lib/stores/script.svelte';
	import { settings } from '$lib/stores/settings.svelte';
	import { scriptStore } from '$lib/stores/script.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	loadSettings();
	loadScript();

	// Auto-save settings
	$effect(() => {
		void settings.fontSize;
		void settings.scrollSpeed;
		void settings.fontFamily;
		void settings.lineHeight;
		void settings.margins;
		void settings.highContrast;
		void settings.mirrorMode;
		void settings.showTashkeel;
		saveSettings();
	});

	// Auto-save script
	$effect(() => {
		void scriptStore.text;
		void scriptStore.title;
		saveScript();
	});

	// Crash recovery: save state periodically (debounced to avoid 60fps writes)
	let crashSaveTimer: number | undefined;
	$effect(() => {
		void scriptStore.scrollPosition;
		void scriptStore.mode;
		clearTimeout(crashSaveTimer);
		crashSaveTimer = window.setTimeout(() => {
			saveCrashState();
		}, 2000);
		return () => clearTimeout(crashSaveTimer);
	});

	// Mark clean exit on beforeunload
	$effect(() => {
		function handleBeforeUnload() {
			clearCrashState();
			saveScript();
			saveSettings();
		}

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	});
</script>

{@render children()}
