const STORAGE_KEY = 'arabic-teleprompter-settings';

export interface FontOption {
	name: string;
	family: string;
	label: string;
}

export const FONTS: FontOption[] = [
	{ name: 'Amiri', family: "'Amiri', serif", label: 'أميري' },
	{ name: 'Cairo', family: "'Cairo', sans-serif", label: 'القاهرة' },
	{ name: 'Noto Naskh Arabic', family: "'Noto Naskh Arabic', serif", label: 'نوتو نسخ' },
	{ name: 'Tajawal', family: "'Tajawal', sans-serif", label: 'تجوال' }
];

class SettingsStore {
	fontSize = $state(56);
	scrollSpeed = $state(2);
	fontFamily = $state('Amiri');
	lineHeight = $state(2.0);
	margins = $state(10);
	highContrast = $state(true);
	showSettings = $state(false);
	mirrorMode = $state(false);
	showTashkeel = $state(true);
}

export const settings = new SettingsStore();

export function saveSettings(): void {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				fontSize: settings.fontSize,
				scrollSpeed: settings.scrollSpeed,
				fontFamily: settings.fontFamily,
				lineHeight: settings.lineHeight,
				margins: settings.margins,
				highContrast: settings.highContrast,
				mirrorMode: settings.mirrorMode,
				showTashkeel: settings.showTashkeel
			})
		);
	} catch (err) {
		console.error('Failed to save settings:', err);
	}
}

export function loadSettings(): void {
	if (typeof localStorage === 'undefined') return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const data = JSON.parse(raw);
		if (typeof data.fontSize === 'number' && data.fontSize >= 12 && data.fontSize <= 200) settings.fontSize = data.fontSize;
		if (typeof data.scrollSpeed === 'number' && data.scrollSpeed >= 0.5 && data.scrollSpeed <= 10) settings.scrollSpeed = data.scrollSpeed;
		if (typeof data.fontFamily === 'string' && FONTS.some((f) => f.name === data.fontFamily)) settings.fontFamily = data.fontFamily;
		if (typeof data.lineHeight === 'number' && data.lineHeight >= 0.5 && data.lineHeight <= 5) settings.lineHeight = data.lineHeight;
		if (typeof data.margins === 'number' && data.margins >= 0 && data.margins <= 50) settings.margins = data.margins;
		if (typeof data.highContrast === 'boolean') settings.highContrast = data.highContrast;
		if (typeof data.mirrorMode === 'boolean') settings.mirrorMode = data.mirrorMode;
		if (typeof data.showTashkeel === 'boolean') settings.showTashkeel = data.showTashkeel;
	} catch (err) {
		console.error('Failed to load settings:', err);
	}
}
