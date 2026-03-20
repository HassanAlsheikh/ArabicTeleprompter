<script lang="ts">
	import { settings } from '$lib/stores/settings.svelte';
	import { scriptStore } from '$lib/stores/script.svelte';
	import { isTauri } from '$lib/utils/platform';

	function exitToEditor() {
		scriptStore.mode = 'edit';
		scriptStore.isPlaying = false;
	}

	async function openTalentWindow() {
		if (isTauri()) {
			const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
			new WebviewWindow('talent', {
				url: '/talent',
				title: 'التلقين - شاشة العرض',
				fullscreen: true,
				decorations: false
			});
		} else {
			window.open('/talent', '_blank', 'popup,width=1920,height=1080');
		}
	}
</script>

<div class="controls" dir="rtl">
	<div class="controls-row">
		<button class="btn-icon btn-back" onclick={exitToEditor} title="رجوع (Esc)" aria-label="رجوع (Esc)">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>

		<button
			class="btn-icon btn-play"
			onclick={() => (scriptStore.isPlaying = !scriptStore.isPlaying)}
			title={scriptStore.isPlaying ? 'إيقاف' : 'تشغيل'}
			aria-label={scriptStore.isPlaying ? 'إيقاف' : 'تشغيل'}
		>
			{#if scriptStore.isPlaying}
				<svg viewBox="0 0 24 24" fill="currentColor">
					<rect x="6" y="4" width="4" height="16" />
					<rect x="14" y="4" width="4" height="16" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="currentColor">
					<polygon points="6,4 20,12 6,20" />
				</svg>
			{/if}
		</button>

		<div class="control-group">
			<span class="control-label">السرعة</span>
			<input type="range" min="0.5" max="10" step="0.5" bind:value={settings.scrollSpeed} />
			<span class="control-value">{settings.scrollSpeed}</span>
		</div>

		<div class="control-group">
			<span class="control-label">الخط</span>
			<input type="range" min="24" max="120" step="2" bind:value={settings.fontSize} />
			<span class="control-value">{settings.fontSize}</span>
		</div>

		<button
			class="btn-icon"
			class:active={settings.mirrorMode}
			onclick={() => (settings.mirrorMode = !settings.mirrorMode)}
			title="وضع المرآة (M)"
			aria-label="وضع المرآة (M)"
			aria-pressed={settings.mirrorMode}
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 3v18" />
				<path d="M8 6l-4 6 4 6" />
				<path d="M16 6l4 6-4 6" />
			</svg>
		</button>

		<button
			class="btn-icon"
			class:active={!settings.showTashkeel}
			onclick={() => (settings.showTashkeel = !settings.showTashkeel)}
			title="التشكيل"
			aria-label="التشكيل"
			aria-pressed={!settings.showTashkeel}
		>
			<span style="font-size: 1.4rem">{settings.showTashkeel ? 'شَكل' : 'شكل'}</span>
		</button>

		<button
			class="btn-icon btn-reset"
			onclick={() => (scriptStore.scrollPosition = 0)}
			title="البداية"
			aria-label="البداية"
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="1 4 1 10 7 10" />
				<path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
			</svg>
		</button>

		<button class="btn-icon" onclick={openTalentWindow} title="شاشة العرض" aria-label="شاشة العرض">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="2" y="3" width="20" height="14" rx="2" />
				<line x1="8" y1="21" x2="16" y2="21" />
				<line x1="12" y1="17" x2="12" y2="21" />
			</svg>
		</button>
	</div>

	<div class="controls-hint">
		مسافة: تشغيل/إيقاف &nbsp;|&nbsp; سهم/صفحة: تمرير &nbsp;|&nbsp; +/−: سرعة &nbsp;|&nbsp; M:
		مرآة &nbsp;|&nbsp; عجلة الماوس: تمرير &nbsp;|&nbsp; Esc: رجوع
	</div>
</div>

<style>
	.controls {
		background: linear-gradient(transparent, var(--controls-bg, rgba(0, 0, 0, 0.85)) 30%);
		padding: 3rem 2rem 1.5rem;
	}

	.controls-row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		padding: 0;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
		flex-shrink: 0;
	}

	.btn-icon:hover {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
	}

	.btn-icon.active {
		background: var(--accent);
		color: #fff;
	}

	.btn-icon svg {
		width: 32px;
		height: 32px;
	}

	.btn-play {
		width: 88px;
		height: 88px;
		background: var(--accent);
	}

	.btn-play:hover {
		background: var(--accent-hover);
	}

	.btn-play svg {
		width: 40px;
		height: 40px;
	}

	.control-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: rgba(255, 255, 255, 0.7);
		font-size: 1.2rem;
	}

	.control-label {
		white-space: nowrap;
	}

	.control-value {
		min-width: 2.5rem;
		text-align: center;
		font-variant-numeric: tabular-nums;
	}

	.control-group input[type='range'] {
		width: 140px;
		background: rgba(255, 255, 255, 0.15);
	}

	.controls-hint {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.25);
	}
</style>
