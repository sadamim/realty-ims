# Premium redesign — homepage

## Run it

```bash
npm install
npm run dev
```

A `.env` file is included in the project root. Open it and replace the
placeholder with your real connection string:

```
MONGODB_URI=<your connection string>
MONGODB_DB=realtyfocus
```

Until you do, `src/lib/mongodb.ts` cannot connect and the homepage will not render.
Next.js reads `.env` automatically; a `.env.local` would override it if you add one.
On Netlify these two are set under Site configuration → Environment variables.

## What changed

**New dependency:** `framer-motion` (added to `package.json`).

### Design system
- `tailwind.config.ts` — premium palette (`realty.navy #0d1524`, `realty.gold #c9a227`
  alongside the existing red), shadow scale (`soft` / `card` / `lift` / `glass`),
  `ease-luxe` easing, `tracking-luxe`, and keyframes for ken-burns, shimmer,
  marquee, float and the scroll cue.
- `src/app/layout.tsx` — Fraunces (display serif) + Inter (body), wired as
  `--font-display` / `--font-sans`.
- `src/app/globals.css` — restyled tokens, button/heading/glass component classes,
  refined scrollbar and Swiper pagination, and a global
  `prefers-reduced-motion` guard that disables every animation.

### New files
| File | Purpose |
|---|---|
| `src/components/motion/Reveal.tsx` | `Reveal`, `Stagger`, `StaggerItem` scroll-reveal primitives |
| `src/components/motion/AnimatedCounter.tsx` | count-up numbers, fires once on scroll into view |
| `src/components/motion/MagneticButton.tsx` | cursor-following hover with spring physics |
| `src/components/motion/SectionHeading.tsx` | shared eyebrow + word-by-word title + gold rule |
| `src/components/home/StatsBand.tsx` | dark stats band with count-up figures |
| `src/components/home/WhyUs.tsx` | value-prop block with parallax image stack |
| `src/components/home/CtaBand.tsx` | closing call-to-action band |

### Rewritten
- `layout/Header.tsx` — sticky glass nav, retracting contact bar, animated
  underlines, motion dropdown, full-screen mobile sheet.
- `layout/Footer.tsx` — navy gradient, data-driven link columns (every original
  link preserved), enquiry card, animated socials.
- `home/HeroSection.tsx` — ken-burns background, layered scrim, word-by-word
  headline, floating glass search console, trust row, scroll cue.
- `home/ProjectCard.tsx` — image zoom, gradient price plate, spec grid, fill-in CTA.
- `home/ProjectsCarousel.tsx` — custom arrows, autoplay, view-all link, gradient pagination.
- `home/RecommendedSection.tsx` — builder marquee replacing the thin text strip.
- `app/page.tsx` — new section order (hero → marquee → featured → stats → trending → why-us → CTA).

## Known issues (pre-existing, not from this redesign)

1. `next build` fails type-checking on `src/app/projects/[slug]/page.tsx` and
   `src/lib/microsites.ts`. These files were already broken before the redesign;
   everything in the redesign type-checks clean. `next dev` runs fine.
2. `public/images/logo-light.png` and `logo-dark.png` are byte-identical dark-ink
   versions. The footer and mobile menu CSS-invert the logo to white
   (`brightness-0 invert`). A real white PNG would look better.

## Placeholder copy to replace

Phone `+91 98765 43210`, email `info@realtyfocus.info`, the stat figures in
`StatsBand.tsx`, and the builder names in `RecommendedSection.tsx`.
