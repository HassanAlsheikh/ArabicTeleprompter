# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Arabic Teleprompter — a desktop teleprompter built for Arabic-first content (RTL, tashkeel, Arabic fonts). SvelteKit frontend inside a Tauri 2.0 native shell. Runs fully offline.

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Vite dev server on localhost:1420
pnpm build                # Build frontend (output: build/)
pnpm check                # svelte-kit sync + svelte-check (type checking)
pnpm tauri dev             # Full Tauri dev mode (Vite + native window)
pnpm tauri build           # Production build (output: src-tauri/target/release/bundle/)
```

No test runner is configured. No linter is configured.

## Architecture

**Stack:** SvelteKit 2 + Svelte 5 (runes) → Tauri 2.0 (Rust) → adapter-static (fallback: `200.html`).

**Two modes:** The app toggles between `edit` and `prompt` mode via `scriptStore.mode`. Edit mode shows the TipTap rich-text editor + toolbar. Prompt mode shows the full-screen scrolling teleprompter.

**Route groups:**
- `(marketing)/` — SSR-enabled, pre-rendered landing page for SEO. Only loads Cairo + Amiri fonts.
- `(app)/` — SPA (SSR disabled). Loads all 4 fonts, stores, auto-save, crash recovery.

**Routes:**
- `/` — Pre-rendered landing page (marketing)
- `/app` — Main app (editor + teleprompter + controls)
- `/talent` — Passive display window for a second screen. Receives all state via BroadcastChannel (`sync.ts`). No controls, cursor hidden.

**Deployment:** Cloudflare Pages at `arabicteleprompter.alsheikhmedia.com`. `_redirects` and `_headers` in `static/` handle SPA fallback and caching.

### Stores (Svelte 5 class-based `$state`)

- `settings.svelte.ts` — `SettingsStore` class with `$state` fields (fontSize, scrollSpeed, fontFamily, etc.). Exported as singleton `settings`. Persisted to localStorage.
- `script.svelte.ts` — `ScriptStore` class. `text` holds **HTML** (not plain text). `setContent(html, title)` increments `_contentVersion` to signal external updates. Includes crash recovery via localStorage flag.

### TipTap 3.x Editor

**Critical:** TipTap 3.x uses **named exports** — `import { StarterKit } from '@tiptap/starter-kit'`, NOT default imports.

**Critical:** The Editor instance is stored in `{ current: Editor }` wrapper object, NOT in `$state()`. Svelte 5 proxies break TipTap class internals. A separate `editorReady = $state(false)` flag drives reactivity.

**Content sync:** The editor watches `scriptStore._contentVersion` — when it increments (e.g., file import), the editor calls `setContent()` to re-sync.

### Custom TipTap Extensions (`src/lib/extensions/`)

- `text-direction.ts` — Per-paragraph `dir` attribute (RTL/LTR). Adds `setTextDirection` command.
- `segment-marker.ts` — Atom node for visual scene/topic dividers.
- `tashkeel-toggle.ts` — ProseMirror decoration plugin. Wraps Arabic diacritics in `<span class="tashkeel-hidden">` with `font-size: 0`. Toggled via `tashkeelPluginKey` meta.

### Key Patterns

- **Teleprompter scroll:** `requestAnimationFrame` loop in Teleprompter.svelte. `scrollPosition` is px offset applied as `translateY`. Auto-stops at end of content.
- **Dual-screen sync:** BroadcastChannel posts full state every 50ms during prompting. Talent page listens and mirrors.
- **Crash recovery:** `+layout.svelte` writes crash state to localStorage every 2s. On load, `+page.svelte` checks for uncleared crash flag and offers session restore.
- **File import:** Drag-and-drop on the main page. `.txt` → HTML paragraphs, `.docx` → mammoth conversion. Both go through `scriptStore.setContent()`.
- **Tashkeel in teleprompter:** Stripped via regex in `tashkeel.ts` (outside editor). Inside editor, hidden via ProseMirror decorations (preserves document structure).
- **Mirror mode:** `scaleX(-1)` CSS transform on both editor and teleprompter content.
- **Persistence:** `+layout.svelte` auto-saves settings and script on every reactive change. `beforeunload` does a final save and clears crash flag.

### Svelte 5 Gotchas

- **`$` prefix is reserved** — Can't destructure `$from` from ProseMirror selections. Use bracket notation: `(selection as any)['$from']`.
- **Don't wrap class instances in `$state()`** — Proxies break TipTap, ProseMirror, and similar libraries. Use a plain object wrapper + a boolean flag for reactivity.

## Design System

Dark theme defined in `src/app.css` via CSS custom properties (`--bg-primary`, `--accent`, etc.). Global direction is RTL. UI text is Arabic. Toolbar labels use Arabic letters: غ=bold, م=italic, خ=underline.

## Tauri

The Rust backend (`src-tauri/src/main.rs`) is minimal — just `tauri::Builder::default()`. All logic lives in the frontend. Tauri config is in `src-tauri/tauri.conf.json`. Dev server runs on port 1420 (hardcoded in both `vite.config.ts` and Tauri config). Tauri `devUrl` points to `/app` to skip the landing page.
