<script lang="ts">
	import { scriptStore, loadCrashState, clearCrashState } from '$lib/stores/script.svelte';
	import { parseFile } from '$lib/utils/import';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Teleprompter from '$lib/components/Teleprompter.svelte';
	import SettingsPanel from '$lib/components/SettingsPanel.svelte';

	let isDragging = $state(false);
	let dragCounter = 0;
	let showRecovery = $state(false);
	let crashState: { scrollPosition: number; mode: 'edit' | 'prompt' } | null = null;

	// Check for crash recovery synchronously (before effects overwrite crash state)
	{
		const state = loadCrashState();
		if (state && state.mode === 'prompt') {
			crashState = state;
			showRecovery = true;
		} else {
			clearCrashState();
		}
	}

	function recoverSession() {
		if (crashState) {
			scriptStore.scrollPosition = crashState.scrollPosition;
			scriptStore.mode = 'prompt';
			scriptStore.isPlaying = false;
		}
		showRecovery = false;
		clearCrashState();
	}

	function dismissRecovery() {
		showRecovery = false;
		clearCrashState();
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (scriptStore.mode === 'edit') {
			dragCounter++;
			isDragging = true;
		}
	}

	function handleDragLeave(_e: DragEvent) {
		dragCounter--;
		if (dragCounter <= 0) {
			dragCounter = 0;
			isDragging = false;
		}
	}

	async function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		dragCounter = 0;

		const file = e.dataTransfer?.files?.[0];
		if (!file) return;

		try {
			const html = await parseFile(file);
			scriptStore.setContent(html, file.name.replace(/\.[^.]+$/, ''));
		} catch (err) {
			console.error('Drop import failed:', err);
		}
	}
</script>

<div
	class="app-container"
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	role="application"
>
	{#if scriptStore.mode === 'prompt'}
		<Teleprompter />
	{:else}
		<Toolbar />
		<Editor />
	{/if}

	{#if isDragging}
		<div class="drop-overlay">
			<div class="drop-content">
				<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M24 32V16M24 16l-8 8M24 16l8 8" />
					<rect x="6" y="6" width="36" height="36" rx="4" />
				</svg>
				<p>أفلت الملف هنا للاستيراد</p>
				<span>يدعم: TXT, DOCX</span>
			</div>
		</div>
	{/if}
</div>

<SettingsPanel />

{#if showRecovery}
	<div class="recovery-overlay">
		<div class="recovery-dialog" dir="rtl">
			<h3>استعادة الجلسة</h3>
			<p>تم إغلاق التطبيق أثناء التلقين. هل تريد الاستكمال من حيث توقفت؟</p>
			<div class="recovery-actions">
				<button class="btn-primary" onclick={recoverSession}>نعم، استكمال</button>
				<button class="btn-secondary" onclick={dismissRecovery}>لا، بداية جديدة</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.app-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.drop-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.drop-content {
		text-align: center;
		color: var(--accent);
	}

	.drop-content svg {
		width: 64px;
		height: 64px;
		margin-bottom: 1rem;
		color: var(--accent);
	}

	.drop-content p {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.drop-content span {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.recovery-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recovery-dialog {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 2rem;
		max-width: 420px;
		width: 90%;
	}

	.recovery-dialog h3 {
		font-size: 1.1rem;
		margin-bottom: 0.75rem;
		color: var(--accent);
	}

	.recovery-dialog p {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.recovery-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-start;
	}

	.btn-primary {
		background: var(--accent);
		color: #fff;
		font-weight: 600;
		padding: 0.6rem 1.5rem;
	}

	.btn-secondary {
		background: var(--bg-tertiary);
		color: var(--text-primary);
		padding: 0.6rem 1.5rem;
	}
</style>
