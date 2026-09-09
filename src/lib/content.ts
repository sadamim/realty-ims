// src/lib/content.ts
//
// SERVER ONLY. Blogs and homepage banners, read from the same Atlas database
// the admin panel writes to. The `blog` collection came from the old MySQL
// dump, so reads map every legacy column name onto one canonical shape; the
// `banner` collection is new and written only by the admin panel.
import { getDb } from '@/lib/mongodb';
import type { Document } from 'mongodb';
import { resolveImageSrc } from '@/lib/image-src';

// Re-exported so the existing import sites keep working.
export { resolveImageSrc } from '@/lib/image-src';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image: string | null;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string | null;
  dateLabel: string;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  image: string | null;
  ctaLabel: string;
  ctaHref: string;
}

const first = (...values: unknown[]) => {
  for (const value of values) {
    if (value === null || value === undefined) continue;
    const text = String(value).trim();
    if (text) return text;
  }
  return '';
};

const escapeRegex = (value: string) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


const slugify = (value: string) =>
  String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 90);

function toPost(doc: Document): BlogPost {
  const title = first(doc.title, doc.blog_title, doc.heading, doc.name, 'Untitled post');
  const body = first(doc.body, doc.content, doc.blog_content, doc.description, doc.blog_description);
  const plain = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  const rawDate = doc.publishedAt ?? doc.date ?? doc.blog_date ?? doc.created_date ?? doc.createdAt;
  const published = rawDate ? new Date(rawDate as string) : null;
  const valid = published && !Number.isNaN(published.getTime()) ? published : null;

  const words = plain.split(/\s+/).filter(Boolean).length;

  return {
    _id: String(doc._id),
    title,
    slug: first(doc.slug, doc.blog_slug) || slugify(title),
    excerpt: first(doc.excerpt, doc.short_description, doc.short_desc, doc.summary) || plain.slice(0, 180),
    body,
    image: resolveImageSrc(first(doc.image, doc.blog_image, doc.featured_image, doc.thumbnail), 'blog'),
    category: first(doc.category, doc.blog_category, doc.category_name, 'General'),
    author: first(doc.author, doc.posted_by, doc.created_by, 'RealtyFocus Team'),
    readTime: first(doc.readTime) || `${Math.max(1, Math.round(words / 200))} min read`,
    publishedAt: valid ? valid.toISOString() : null,
    dateLabel: valid
      ? valid.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : '',
  };
}

/**
 * Drafts never reach the website. Posts written here use status "draft";
 * rows imported from MySQL used "0" for hidden, so both are excluded and
 * everything else (including rows with no status at all) is published.
 */
const PUBLISHED_FILTER = { status: { $nin: ['draft', '0', 0] } };

export async function getPublishedBlogs(opts: { category?: string; limit?: number } = {}): Promise<
  BlogPost[]
> {
  try {
    const db = await getDb();
    const filter: Document = { ...PUBLISHED_FILTER };
    if (opts.category && opts.category !== 'All') {
      filter.category = new RegExp(`^${escapeRegex(opts.category)}$`, 'i');
    }

    const docs = await db
      .collection('blog')
      .find(filter)
      .sort({ publishedAt: -1, _id: -1 })
      .limit(opts.limit ?? 60)
      .toArray();

    return docs.map(toPost);
  } catch (error) {
    console.warn('[content] blogs unavailable:', (error as Error).message);
    return [];
  }
}

export async function getBlogCategories(): Promise<string[]> {
  try {
    const db = await getDb();
    const values = await db.collection('blog').distinct('category', PUBLISHED_FILTER);
    return values
      .map((value) => String(value ?? '').trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = await getDb();
    const collection = db.collection('blog');

    const direct = await collection.findOne({
      ...PUBLISHED_FILTER,
      $or: [{ slug }, { blog_slug: slug }],
    });
    if (direct) return toPost(direct);

    // Imported rows have no slug column, so the listing links to a slug derived
    // from the title. Resolve those by deriving it the same way. Bounded scan,
    // titles only — the blog collection is small, and a post saved from the
    // admin panel gets a real slug written to it.
    const candidates = await collection
      .find(PUBLISHED_FILTER, { projection: { title: 1, blog_title: 1, heading: 1, name: 1 } })
      .limit(400)
      .toArray();

    const match = candidates.find(
      (doc) => slugify(first(doc.title, doc.blog_title, doc.heading, doc.name)) === slug,
    );
    if (!match) return null;

    const full = await collection.findOne({ _id: match._id });
    return full ? toPost(full) : null;
  } catch (error) {
    console.warn('[content] blog lookup failed:', (error as Error).message);
    return null;
  }
}

export async function getRelatedBlogs(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection('blog')
      .find({
        ...PUBLISHED_FILTER,
        slug: { $ne: post.slug },
        category: new RegExp(`^${escapeRegex(post.category)}$`, 'i'),
      })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();

    if (docs.length >= limit) return docs.map(toPost);

    // Top up with the newest posts from any category.
    const extra = await db
      .collection('blog')
      .find({ ...PUBLISHED_FILTER, slug: { $ne: post.slug } })
      .sort({ publishedAt: -1 })
      .limit(limit * 2)
      .toArray();

    const seen = new Set(docs.map((doc) => String(doc._id)));
    for (const doc of extra) {
      if (docs.length >= limit) break;
      if (seen.has(String(doc._id))) continue;
      docs.push(doc);
    }
    return docs.slice(0, limit).map(toPost);
  } catch {
    return [];
  }
}

/**
 * Active hero slides in display order. An empty result is normal and means the
 * hero keeps its built-in image — the site never depends on this collection.
 */
export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection('banner')
      .find({ active: { $ne: false } })
      .sort({ order: 1, _id: 1 })
      .limit(8)
      .toArray();

    return docs
      .map((doc) => ({
        _id: String(doc._id),
        title: String(doc.title ?? ''),
        subtitle: String(doc.subtitle ?? ''),
        image: resolveImageSrc(doc.image, 'banner'),
        ctaLabel: String(doc.ctaLabel ?? ''),
        ctaHref: String(doc.ctaHref ?? ''),
      }))
      .filter((banner) => Boolean(banner.image));
  } catch (error) {
    console.warn('[content] banners unavailable:', (error as Error).message);
    return [];
  }
}

/* -------------------------------------------------------------------------- */
/* Testimonials, team and builders                                            */
/*                                                                            */
/* All three follow the same rule as banners: the database is the source, and  */
/* an empty or unreachable collection returns [] so the page simply renders    */
/* without that section instead of failing. Nothing here can take the site     */
/* down if Atlas is slow or a collection has not been created yet.             */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string | null;
  rating: number;
  project: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  title: string;
  bio: string;
  image: string | null;
  email: string;
  phone: string;
  linkedin: string;
}

export interface SiteBuilder {
  _id: string;
  builder_id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string;
  established: string;
  completedProjects: string;
  ongoingProjects: string;
  locations: string[];
  website: string;
  address: string;
}

const ACTIVE_FILTER = { active: { $ne: false } };

export async function getTestimonials(limit = 12): Promise<Testimonial[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection('testimonial')
      .find(ACTIVE_FILTER)
      .sort({ order: 1, _id: 1 })
      .limit(limit)
      .toArray();

    return docs.map((doc) => ({
      _id: String(doc._id),
      name: String(doc.name ?? ''),
      role: String(doc.role ?? ''),
      location: String(doc.location ?? ''),
      quote: String(doc.quote ?? ''),
      image: resolveImageSrc(doc.image, 'testimonial'),
      rating: Math.min(5, Math.max(0, Number(doc.rating ?? 5) || 0)),
      project: String(doc.project ?? ''),
    }));
  } catch (error) {
    console.warn('[content] testimonials unavailable:', (error as Error).message);
    return [];
  }
}

export async function getTeamMembers(limit = 24): Promise<TeamMember[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection('team')
      .find(ACTIVE_FILTER)
      .sort({ order: 1, _id: 1 })
      .limit(limit)
      .toArray();

    return docs.map((doc) => ({
      _id: String(doc._id),
      name: String(doc.name ?? ''),
      title: String(doc.title ?? ''),
      bio: String(doc.bio ?? ''),
      image: resolveImageSrc(doc.image, 'team'),
      email: String(doc.email ?? ''),
      phone: String(doc.phone ?? ''),
      linkedin: String(doc.linkedin ?? ''),
    }));
  } catch (error) {
    console.warn('[content] team unavailable:', (error as Error).message);
    return [];
  }
}

const csvToList = (value: unknown): string[] =>
  String(value ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

/**
 * Builders for the /builders page, newest edits included.
 *
 * `projectCount` is deliberately NOT computed here — the builders page shows
 * the counts the panel stores, and joining 2,200 microsite_detail rows to
 * render a dozen cards is what made other pages slow.
 */
export async function getSiteBuilders(): Promise<SiteBuilder[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection('builder')
      .find(ACTIVE_FILTER)
      .sort({ name: 1 })
      .toArray();

    return docs.map((doc) => {
      const name = String(doc.name ?? '').trim();
      return {
        _id: String(doc._id),
        builder_id: String(doc.builder_id ?? ''),
        name,
        slug:
          String(doc.slug ?? '').trim() ||
          name.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-'),
        // Imported logos are bare filenames under /images/logo/.
        logo: resolveImageSrc(doc.logo ?? doc.image, 'logo'),
        description: String(doc.description ?? doc.about ?? ''),
        established: String(doc.established ?? ''),
        completedProjects: String(doc.completedProjects ?? ''),
        ongoingProjects: String(doc.ongoingProjects ?? ''),
        locations: csvToList(doc.locations),
        website: String(doc.website ?? ''),
        address: String(doc.address ?? ''),
      };
    });
  } catch (error) {
    console.warn('[content] builders unavailable:', (error as Error).message);
    return [];
  }
}

/**
 * One builder by slug.
 *
 * Imported rows have no `slug` column — the listing links to a slug derived
 * from the name — so an exact match is tried first and, failing that, the names
 * are derived the same way. The builder collection is small enough for that to
 * be one bounded scan rather than a per-request cost worth optimising.
 */
export async function getSiteBuilderBySlug(slug: string): Promise<SiteBuilder | null> {
  try {
    const all = await getSiteBuilders();
    return all.find((builder) => builder.slug === slug) ?? null;
  } catch (error) {
    console.warn('[content] builder lookup failed:', (error as Error).message);
    return null;
  }
}
