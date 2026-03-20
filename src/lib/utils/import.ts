import DOMPurify from 'dompurify';

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function plainTextToHtml(text: string): string {
	return text
		.split('\n')
		.map((line) => (line.trim() === '' ? '<p></p>' : `<p>${escapeHtml(line)}</p>`))
		.join('');
}

export function isHtml(content: string): boolean {
	return /<[a-z][\s\S]*>/i.test(content.trim());
}

export async function importTxt(file: File): Promise<string> {
	const text = await file.text();
	return plainTextToHtml(text);
}

export async function importDocx(file: File): Promise<string> {
	const mammothModule = await import('mammoth');
	const mammoth = (mammothModule as Record<string, unknown>).default ?? mammothModule;
	const arrayBuffer = await file.arrayBuffer();
	const result = await (mammoth as typeof mammothModule).convertToHtml({ arrayBuffer });
	return DOMPurify.sanitize(result.value, {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'span', 'mark', 'sub', 'sup'],
		ALLOWED_ATTR: ['dir', 'class']
	});
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function parseFile(file: File): Promise<string> {
	if (file.size > MAX_FILE_SIZE) {
		throw new Error('حجم الملف يتجاوز الحد الأقصى (10 ميغابايت)');
	}
	const ext = file.name.split('.').pop()?.toLowerCase();
	switch (ext) {
		case 'docx':
			return importDocx(file);
		case 'txt':
		case 'text':
		default:
			return importTxt(file);
	}
}

export function countWordsInHtml(html: string): number {
	const text = html
		.replace(/<[^>]+>/g, ' ')
		.replace(/&[a-z]+;/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text ? text.split(/\s+/).length : 0;
}
