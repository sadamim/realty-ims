// src/lib/image-src.ts
//
// Pure image-path helpers — no database import, so client components can use
// them too. This is the single place that knows how to turn whatever is stored
// in an image field into something an <img> or next/image can load.
//
// Three kinds of value reach these functions:
//
//   "/api/media/<id>"     uploaded through the admin panel; this app serves it
//                         from its own /api/media/[id] route
//   "https://…/photo.jpg" an absolute URL (the legacy CDN, GCS, anywhere)
//   "photo.jpg"           a bare filename left over from the MySQL import,
//                         which lives under realtyfocus.info/images/<folder>/
//
// Before uploads existed, every call site prefixed the legacy base URL by hand.
// That is why an uploaded image would previously come out as
// ".../images/fimage//api/media/abc" — a 404. Route every image field through
// resolveImageSrc instead of concatenating.

export const LEGACY_IMAGE_BASE = 'https://realtyfocus.info/images';

export function resolveImageSrc(src: unknown, legacyFolder = 'fimage'): string | null {
  const value = String(src ?? '').trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;
  if (value.startsWith('/')) return value;
  return `${LEGACY_IMAGE_BASE}/${legacyFolder}/${value}`;
}

/** Same, but never null — for the props that must always have a string. */
export const imageSrcOr = (src: unknown, fallback: string, legacyFolder = 'fimage') =>
  resolveImageSrc(src, legacyFolder) ?? fallback;

/**
 * A comma-separated list of filenames or URLs (slider_image, gallery_image).
 * Legacy entries sometimes omit the extension, which is why ".jpg" is appended
 * when there isn't one — uploaded paths and absolute URLs are left alone.
 */
export function resolveImageList(csv: unknown, legacyFolder: string): string[] {
  return String(csv ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((entry) => {
      if (/^https?:\/\//i.test(entry) || entry.startsWith('/')) return entry;
      const hasExtension = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(entry);
      return `${LEGACY_IMAGE_BASE}/${legacyFolder}/${entry}${hasExtension ? '' : '.jpg'}`;
    });
}
