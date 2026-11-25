const escapeMap: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => escapeMap[c]);

/** Minimal inline Markdown (links + bold) for front-matter strings such as project summaries. */
export function inlineMarkdown(s: string) {
  return escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => `<a href="${href}">${text}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/** Strip Markdown/HTML to plain text (for meta descriptions and excerpts). */
export function plainText(s: string) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(s: string, words = 40) {
  const parts = plainText(s).split(' ');
  return parts.length > words ? parts.slice(0, words).join(' ') + '…' : parts.join(' ');
}

const dateFmt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const monthFmt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
export const formatDate = (d: Date) => dateFmt.format(d);
export const formatMonth = (d: Date) => monthFmt.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);


const monthYearFmt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
/** "November 2026", the way Paul Graham dates his essays. */
export const formatMonthYear = (d: Date) => monthYearFmt.format(d);
