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

---

# Third pass — brand colours, responsive banners, SEO

## Brand

`tailwind.config.ts` and the CSS variables in `globals.css` now carry the colours
sampled from the live site at realtyfocus.info — navy `#090545` (the logo
wordmark and headings there) and red `#C00F1B` (its Submit button). Every
component already referenced `realty-navy` / `realty-red` / `--primary` rather
than hard-coded hexes, so this was a change to the token values and nothing
else. Shadows were re-tinted to the same navy.

The live site uses square buttons. This one stays rounded, because `--radius`
also rounds every card — flip that one value if you want the square look.

## Builder logos

Fixed. `builder.logo` is a bare filename and was being resolved against
`/images/logo/`, which 404s; the real folder is `/images/builder/` (probed
against the live CDN: `builder` returns a 250×150 image, `logo` returns 404).

## Banners are responsive now

A banner carries three images — desktop (required), tablet and mobile. The hero
renders a `<picture>`, narrowest `<source>` first, so a phone downloads the tall
crop instead of the wide desktop artwork. Missing crops fall back to the desktop
image inside `getActiveBanners`, so banners saved before this change behave
exactly as they did.

## SEO

`src/lib/seo.ts` builds title, description, canonical and social cards for every
page. The root layout sets `metadataBase` and a `%s | Realty Focus` template.

Seven routes had no metadata and inherited the site-wide title — the homepage,
About, Contact, the three property pages, and `/projects/[slug]`. That last one
matters most: every project page looked identical to a crawler. All seven now
describe themselves, and an editor can override the text per record from the
admin panel (`metaTitle`/`metaDescription` on blogs and builders,
`meta_title`/`meta_description` on a project).

Set `NEXT_PUBLIC_SITE_URL` on Vercel once a real domain is attached — canonicals
currently point at realtyfocus.info.

## Project highlights

`microsite_detail.highlights`, one per line, renders as a feature grid on the
project page above the amenities. Empty means the block is skipped.

## Removed

The Team section on the About page is gone, along with `getTeamMembers` and the
`TeamMember` type. The About page is fully static again.
