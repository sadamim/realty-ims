// src/lib/seo.ts
//
// One place that builds a page's <title>, description, canonical URL and social
// cards, so every route is described the same way and no page ships with only
// the site-wide default from the root layout.
//
// Pure — no database import — so it can be used from any page, static or not.
import type { Metadata } from 'next';

/** Set NEXT_PUBLIC_SITE_URL on Vercel once a custom domain is attached. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://realtyfocus.info').replace(/\/$/, '');

export const SITE_NAME = 'Realty Focus';

const DEFAULT_DESCRIPTION =
  "Bangalore's top real estate platform. Verified apartments, villas and plots from the city's most trusted builders, with honest pricing and zero brokerage advisory.";

/** Search engines cut descriptions around 155–160 characters. */
function clamp(text: string, max = 158): string {
  const clean = String(text ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  // Cut on a word boundary rather than mid-word.
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

export interface SeoInput {
  /** The page's own title, without the site name — that is appended here. */
  title: string;
  description?: string;
  /** Path only, e.g. "/builders". Used for the canonical and og:url. */
  path?: string;
  image?: string | null;
  /** Set for anything that should not be indexed. */
  noIndex?: boolean;
  type?: 'website' | 'article';
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
  type = 'website',
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const desc = clamp(description || DEFAULT_DESCRIPTION);
  // An absolute URL is required by most crawlers; a stored "/api/media/…" path
  // is relative, so it is resolved against the site here.
  const absoluteImage = image
    ? /^https?:\/\//i.test(image)
      ? image
      : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`
    : undefined;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      url,
      siteName: SITE_NAME,
      type,
      ...(absoluteImage ? { images: [{ url: absoluteImage }] } : {}),
    },
    twitter: {
      card: absoluteImage ? 'summary_large_image' : 'summary',
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      ...(absoluteImage ? { images: [absoluteImage] } : {}),
    },
  };
}

/**
 * Picks the admin-authored SEO override when there is one, and falls back to the
 * record's own content otherwise — so a page is always described, and an editor
 * only has to write something when the default is not good enough.
 */
export const seoText = (override: unknown, fallback: unknown): string =>
  String(override ?? '').trim() || String(fallback ?? '').trim();
