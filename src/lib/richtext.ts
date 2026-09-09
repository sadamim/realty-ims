// Renders blog bodies.
//
// Two shapes exist: posts written in the admin panel (plain text with light
// Markdown) and legacy rows imported with raw HTML. Markdown text is escaped
// before any tag is added, so nothing a writer types can inject markup.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const inline = (value: string) =>
  value
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
      '<a href="$2" class="text-realty-red underline underline-offset-2">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');

/** True when the stored body already contains markup (a legacy row). */
export const looksLikeHtml = (value: string) =>
  /<\/?(p|div|br|h[1-6]|ul|ol|li|strong|em|b|i|a|img|table|blockquote|span)\b/i.test(value);

export function renderBody(body: string): string {
  const text = String(body ?? '');
  if (!text.trim()) return '';
  if (looksLikeHtml(text)) return text;

  return escapeHtml(text)
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      if (/^###\s+/.test(trimmed)) return `<h3>${inline(trimmed.replace(/^###\s+/, ''))}</h3>`;
      if (/^##\s+/.test(trimmed)) return `<h2>${inline(trimmed.replace(/^##\s+/, ''))}</h2>`;
      if (/^#\s+/.test(trimmed)) return `<h2>${inline(trimmed.replace(/^#\s+/, ''))}</h2>`;

      const lines = trimmed.split('\n');
      if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
        const items = lines
          .map((line) => `<li>${inline(line.replace(/^\s*[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }

      return `<p>${inline(trimmed).replace(/\n/g, '<br />')}</p>`;
    })
    .join('');
}
