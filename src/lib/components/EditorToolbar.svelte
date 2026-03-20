<script lang="ts">
	import type { Editor } from '@tiptap/core';

	let { editor }: { editor: Editor } = $props();

	let isBold = $state(false);
	let isItalic = $state(false);
	let isUnderline = $state(false);
	let isRtl = $state(true);
	let textColor = $state('#e0e0f0');

	$effect(() => {
		const update = () => {
			isBold = editor.isActive('bold');
			isItalic = editor.isActive('italic');
			isUnderline = editor.isActive('underline');
			// Read dir from the actual paragraph node at the cursor
			const resolvedPos = (editor.state.selection as any)['$from'];
			let dir = 'rtl';
			for (let d = resolvedPos.depth; d >= 0; d--) {
				const node = resolvedPos.node(d);
				if (node.type.name === 'paragraph' || node.type.name === 'heading') {
					dir = node.attrs.dir || 'rtl';
					break;
				}
			}
			isRtl = dir !== 'ltr';
		};

		editor.on('selectionUpdate', update);
		editor.on('transaction', update);
		update();

		return () => {
			editor.off('selectionUpdate', update);
			editor.off('transaction', update);
		};
	});

	let savedSelection: { from: number; to: number } | null = null;

	function saveSelection() {
		const { from, to } = editor.state.selection;
		savedSelection = { from, to };
	}

	function setColor(e: Event) {
		const color = (e.target as HTMLInputElement).value;
		textColor = color;
		if (savedSelection) {
			editor.chain().focus()
				.setTextSelection(savedSelection)
				.setColor(color)
				.run();
		} else {
			editor.chain().focus().setColor(color).run();
		}
	}

	function setHighlight(e: Event) {
		const color = (e.target as HTMLInputElement).value;
		if (savedSelection) {
			editor.chain().focus()
				.setTextSelection(savedSelection)
				.toggleHighlight({ color })
				.run();
		} else {
			editor.chain().focus().toggleHighlight({ color }).run();
		}
	}

	function toggleDirection() {
		const newDir = isRtl ? 'ltr' : 'rtl';
		const { state, view } = editor;
		const { from, to } = state.selection;
		const tr = state.tr;
		state.doc.nodesBetween(from, to, (node: any, pos: number) => {
			if (node.type.name === 'paragraph' || node.type.name === 'heading') {
				const mapped = tr.mapping.map(pos);
				tr.setNodeMarkup(mapped, undefined, { ...node.attrs, dir: newDir });
			}
		});
		view.dispatch(tr);
		editor.commands.focus();
	}

	function insertSegment() {
		const label = prompt('اسم المقطع (اتركه فارغاً للفاصل الافتراضي):') ?? '';
		editor.chain().focus().insertSegmentMarker(label).run();
	}
</script>

<div class="editor-toolbar" dir="rtl">
	<div class="toolbar-group">
		<button
			class="format-btn"
			class:active={isBold}
			onclick={() => editor.chain().focus().toggleBold().run()}
			title="غامق (Ctrl+B)"
			aria-label="غامق (Ctrl+B)"
			aria-pressed={isBold}
		>
			<strong>غ</strong>
		</button>
		<button
			class="format-btn"
			class:active={isItalic}
			onclick={() => editor.chain().focus().toggleItalic().run()}
			title="مائل (Ctrl+I)"
			aria-label="مائل (Ctrl+I)"
			aria-pressed={isItalic}
		>
			<em>م</em>
		</button>
		<button
			class="format-btn"
			class:active={isUnderline}
			onclick={() => editor.chain().focus().toggleUnderline().run()}
			title="تحته خط (Ctrl+U)"
			aria-label="تحته خط (Ctrl+U)"
			aria-pressed={isUnderline}
		>
			<u>خ</u>
		</button>
	</div>

	<div class="toolbar-sep"></div>

	<div class="toolbar-group">
		<label class="color-btn" title="لون النص" aria-label="لون النص" onmousedown={saveSelection}>
			<span class="color-icon">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
					<path d="M5 21h14M12 3l-5 14h2.5l1.2-3.5h4.6L16.5 17H19L14 3h-4z" />
				</svg>
				<span class="color-underline" style="background: {textColor}"></span>
			</span>
			<input type="color" value={textColor} oninput={setColor} />
		</label>
		<label class="color-btn" title="تظليل" aria-label="تظليل" onmousedown={saveSelection}>
			<span class="color-icon">
				<svg viewBox="0 0 24 24" fill="none" width="24" height="24">
					<rect x="2" y="14" width="20" height="7" rx="1" fill="currentColor" opacity="0.3" />
					<path d="M12 3l-5 14h2.5l1.2-3.5h4.6L16.5 17H19L14 3h-4z" stroke="currentColor" stroke-width="2" fill="none" />
				</svg>
				<span class="color-underline" style="background: #ffd43b"></span>
			</span>
			<input type="color" value="#ffd43b" oninput={setHighlight} />
		</label>
	</div>

	<div class="toolbar-sep"></div>

	<div class="toolbar-group">
		<button class="format-btn" onclick={toggleDirection} title="اتجاه النص" aria-label="اتجاه النص">
			{#if isRtl}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
					<path d="M21 12H3" />
					<path d="M9 18l-6-6 6-6" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
					<path d="M3 12h18" />
					<path d="M15 6l6 6-6 6" />
				</svg>
			{/if}
		</button>
	</div>

	<div class="toolbar-sep"></div>

	<div class="toolbar-group">
		<button class="format-btn" onclick={insertSegment} title="إدراج فاصل مقطع" aria-label="إدراج فاصل مقطع">
			فاصل
		</button>
	</div>
</div>

<style>
	.editor-toolbar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
		flex-wrap: wrap;
	}

	.toolbar-group {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.toolbar-sep {
		width: 1px;
		height: 40px;
		background: var(--border);
		margin: 0 0.6rem;
	}

	.format-btn {
		min-width: 48px;
		height: 48px;
		padding: 0 0.75rem;
		font-size: 1.2rem;
		border-radius: 6px;
		background: transparent;
		color: var(--text-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.format-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.format-btn.active {
		background: var(--accent);
		color: #fff;
	}

	.color-btn {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		cursor: pointer;
		border-radius: 6px;
	}

	.color-btn:hover {
		background: var(--bg-tertiary);
	}

	.color-btn input[type='color'] {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
		width: 100%;
		height: 100%;
	}

	.color-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
		color: var(--text-secondary);
	}

	.color-underline {
		width: 24px;
		height: 4px;
		border-radius: 2px;
	}
</style>
