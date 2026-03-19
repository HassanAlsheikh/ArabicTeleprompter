const CHANNEL_NAME = 'arabic-teleprompter-sync';

export interface SyncState {
	scrollPosition: number;
	isPlaying: boolean;
	text: string;
	fontSize: number;
	fontFamily: string;
	lineHeight: number;
	margins: number;
	mirrorMode: boolean;
	showTashkeel: boolean;
}

function isValidSyncState(data: unknown): data is SyncState {
	if (data === null || typeof data !== 'object') return false;
	const d = data as Record<string, unknown>;

	if ('scrollPosition' in d && typeof d.scrollPosition !== 'number') return false;
	if ('isPlaying' in d && typeof d.isPlaying !== 'boolean') return false;
	if ('text' in d && typeof d.text !== 'string') return false;
	if ('fontSize' in d && typeof d.fontSize !== 'number') return false;
	if ('fontFamily' in d && typeof d.fontFamily !== 'string') return false;
	if ('lineHeight' in d && typeof d.lineHeight !== 'number') return false;
	if ('margins' in d && typeof d.margins !== 'number') return false;
	if ('mirrorMode' in d && typeof d.mirrorMode !== 'boolean') return false;
	if ('showTashkeel' in d && typeof d.showTashkeel !== 'boolean') return false;

	return true;
}

let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel {
	if (!channel && typeof BroadcastChannel !== 'undefined') {
		channel = new BroadcastChannel(CHANNEL_NAME);
	}
	return channel!;
}

export function broadcastState(state: SyncState): void {
	try {
		getChannel()?.postMessage(state);
	} catch {
		// BroadcastChannel not available
	}
}

export function onSyncMessage(callback: (state: SyncState) => void): () => void {
	try {
		const ch = getChannel();
		if (!ch) return () => {};
		const handler = (e: MessageEvent) => {
			if (isValidSyncState(e.data)) callback(e.data);
		};
		ch.addEventListener('message', handler);
		return () => ch.removeEventListener('message', handler);
	} catch {
		return () => {};
	}
}
