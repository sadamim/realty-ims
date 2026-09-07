// src/lib/format.ts
// Display helpers shared by the project cards. Safe to import from both server
// and client components — nothing here touches the DOM.

/**
 * Decode HTML entities without `document`. The imported MySQL data contains
 * raw entities like "2.5,3&amp;4bhk"; using a textarea would crash during
 * server rendering and risk a hydration mismatch.
 */
export const decodeHtml = (html: unknown): string =>
  String(html ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');

/** 19600000 -> "1.96 Cr", 9000000 -> "90.00 L" */
export const formatPrice = (value: number | string | null | undefined): string => {
  const num = Number(value);
  if (!value || !Number.isFinite(num)) return 'N/A';
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
  return String(num);
};

export const formatPriceRange = (
  min: number | null | undefined,
  max: number | null | undefined
): string => {
  if (!min && !max) return 'Price on Request';
  const minFormatted = formatPrice(min);
  const maxFormatted = formatPrice(max);
  return minFormatted === maxFormatted ? minFormatted : `${minFormatted} - ${maxFormatted}`;
};

/**
 * The possession column is inconsistent in the imported data — "12/31/2025",
 * "1970-01-01" and empty strings all appear. Handle both shapes, give up
 * gracefully otherwise.
 */
export const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr || typeof dateStr !== 'string') return 'TBA';

  const slashParts = dateStr.split('/');
  if (slashParts.length === 3) {
    const [month, day, year] = slashParts;
    const date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    if (!isNaN(date.getTime())) {
      return `${date.toLocaleString('en-US', { month: 'short' })}-${year}`;
    }
  }

  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() > 1971) {
    return `${parsed.toLocaleString('en-US', { month: 'short' })}-${parsed.getFullYear()}`;
  }

  return 'TBA';
};
