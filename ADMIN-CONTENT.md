# Blogs and banners now come from the database

The admin panel (`realtyfocus-admin-next`) writes to the same Atlas database
this site reads. Nothing about projects, builders or the microsite pages
changed, and **no dependencies were added**.

## New and changed files

| File | Change |
|---|---|
| `src/lib/content.ts` | **New.** Published blogs, categories, single post, related posts, active hero banners |
| `src/lib/richtext.ts` | **New.** Renders a post body |
| `src/app/api/media/[id]/route.ts` | **New.** Serves images uploaded from the admin panel |
| `src/app/blogs/page.tsx` | Was a hardcoded array of nine posts. Now reads the database, with working category filters and pagination |
| `src/app/blogs/[slug]/page.tsx` | **New.** This route did not exist — every "Read more" link was a 404 |
| `src/app/page.tsx` | Fetches active banners and passes them to the hero |
| `src/components/home/HeroSection.tsx` | Takes an optional `slides` prop |
| `src/app/globals.css` | Added `.prose-realty` for article bodies |

## The hero still works with no banners

`HeroSection` falls back to its built-in `/images/slider-image.webp` and its
existing headline whenever no active banner exists, so the homepage is never
dependent on the collection. With banners configured it cross-fades between
them every 6.5 seconds (paused under `prefers-reduced-motion`), uses the
slide's headline and supporting line when they are set, and adds a call-to-action
button when one is configured. The search console, trust row and scroll cue are
unchanged.

## Images

Uploaded images live in the shared `media` collection, not in `public/`, because
Vercel's filesystem is read-only. They are referenced as `/api/media/<id>` and
served by the route above with a one-year immutable cache header, so the CDN
serves them after the first request.

Blog and banner images use a plain `<img>` rather than `next/image`: an editor
can point a post at any host, and `next/image` rejects hostnames that are not
listed in `next.config.mjs`. Image optimisation is already disabled site-wide
(`images.unoptimized: true`), so nothing is lost.

## Article bodies

Posts written in the admin panel are plain text with light Markdown — `##`
headings, `**bold**`, `*italic*`, `[links](url)`, `-` bullets. That text is
HTML-escaped before any tag is added, so a writer cannot inject markup.
Legacy imported rows that already contain HTML are rendered as HTML, which is
the same trust level the old site had.

## Pre-existing TypeScript errors, fixed

`tsc --noEmit` failed on this project before any of this work — 25 errors in
`src/app/projects/[slug]/page.tsx` and `src/lib/microsites.ts`. A Vercel build
runs that check, so it would have blocked any deploy. Three minimal fixes:

1. `tsconfig.json` — `target` `es5` → `es2017`. Fixes two `Set` iteration errors
   and is what Next recommends anyway.
2. `src/lib/microsites.ts` — widened one `serialize()` cast through `unknown`.
3. `src/app/projects/[slug]/page.tsx` — the microsite document is legacy and its
   columns vary per row, so it is now typed as dynamic rather than against a
   fixed interface. No runtime behaviour changed.

Both projects now pass `tsc --noEmit` and ESLint with zero errors.

## Caching

`/blogs` and `/blogs/[slug]` use `revalidate = 30`; the homepage keeps its
existing `revalidate = 60`. Edits appear within that window without a redeploy.

---

# Second pass — builders, testimonials, team and the image resolver

Added alongside the blogs and banners work above. Still no dependency change:
`package.json` is untouched.

## New and changed pages

- **`/builders`** now reads the `builder` collection — the same rows the admin
  panel edits — instead of a hardcoded array of twelve developers. If the
  collection is unreachable the page falls back to three of the original
  entries, so it can never come up blank.
- **`/builders/[slug]`** is a new route. Every "View Projects" link on the
  builders page was a 404 before this. It shows the builder, their stats and
  every project linked to them through `microsite_detail.builder_id`.
- **`/` (homepage)** renders a testimonials section between the trending slider
  and "Why Us". It reads the `testimonial` collection and **renders nothing at
  all when that collection is empty**, so the homepage is unchanged until
  someone adds a quote.
- **`/about`** renders a team section between "Why Choose Us" and "Our Values",
  from the `team` collection, on the same all-or-nothing basis.

Both new sections revalidate every 60 seconds, like the homepage, so a change in
the admin panel appears without a redeploy.

## One image resolver

`src/lib/image-src.ts` is new and holds the only copy of `resolveImageSrc`.
`content.ts` re-exports it, so existing imports still work, and it has no
database import — which is what lets client components (`ProjectCard`,
`FloorPlan`, `MasterPlan`) use it too.

It handles the three shapes an image field can take:

| Stored value | Resolves to |
|---|---|
| `/api/media/<id>` | itself — this app serves that route |
| `https://…` | itself |
| `photo.jpg` | `https://realtyfocus.info/images/<folder>/photo.jpg` |

Before this, each call site prefixed the legacy CDN by hand — `ProjectCard`,
the project detail page's `BASE` table, `FloorPlan` and `MasterPlan` all did it
slightly differently, and all of them turned an uploaded `/api/media/<id>` path
into a 404. They now share the resolver.

One related fix: the amenities grid on a project page skips the image rather
than passing an empty `src` to `next/image`, which throws. An amenity created in
the panel may not have an icon yet.
