'use client';

// Cinematic hero: slow Ken Burns background, layered gradient scrim, a headline
// that resolves word by word, a floating glass search console and a scroll cue.
import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import MagneticButton from '@/components/motion/MagneticButton';
import { Search, MapPin, Building2, ShieldCheck, Sparkles } from 'lucide-react';

const headline = ['Find', 'the', 'address', 'that'];
const headlineAccent = ['feels', 'like', 'home.'];

const trustPoints = [
  { icon: ShieldCheck, label: 'RERA-verified listings' },
  { icon: Building2, label: '450+ curated projects' },
  { icon: Sparkles, label: 'Zero brokerage advisory' },
];

const HeroSection = () => {
  const reduced = useReducedMotion();

  const wordAnim = (index: number) => ({
    initial: reduced ? false : { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.85, delay: 0.25 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-realty-navy">
      {/* Background */}
      <div className="absolute inset-0">
        <div className={reduced ? 'h-full w-full' : 'h-full w-full animate-ken-burns'}>
          <Image
            src="/images/slider-image.webp"
            alt="Premium residences in Bangalore"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Scrims — vertical for legibility, side vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-realty-navy/85 via-realty-navy/45 to-realty-navy/92" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_20%,transparent_35%,rgba(10,17,32,.72)_100%)]" />
      <div className="grain absolute inset-0" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[92vh] flex-col justify-center pb-20 pt-24 md:pb-24 md:pt-28">
        <div className="max-w-3xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-realty-goldLight opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-realty-gold" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-luxe text-white/85">
              Bangalore · Premium Residences
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[2.7rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
            {headline.map((word, index) => (
              <motion.span key={word} className="mr-[0.28em] inline-block" {...wordAnim(index)}>
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {headlineAccent.map((word, index) => (
              <motion.span
                key={word}
                className="mr-[0.28em] inline-block text-gradient-gold"
                {...wordAnim(headline.length + index)}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-[17px]"
          >
            Hand-picked apartments, villas and plots from Bangalore&apos;s most trusted
            builders — with honest pricing, verified approvals and advisors who know
            every micro-market.
          </motion.p>
        </div>

        {/* Search console */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full max-w-5xl md:mt-12"
        >
          <div className="rounded-[1.6rem] border border-white/20 bg-white/[0.09] p-2 shadow-glass backdrop-blur-2xl">
            <div className="rounded-[1.3rem] bg-white/95 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1.4fr_auto]">
                <Select>
                  <SelectTrigger className="h-12 rounded-xl border-realty-line bg-white text-[14px] text-realty-navy transition-all focus:ring-4 focus:ring-realty-red/10">
                    <span className="flex items-center gap-2 truncate">
                      <MapPin className="h-4 w-4 shrink-0 text-realty-red" />
                      <SelectValue placeholder="Select City" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-12 rounded-xl border-realty-line bg-white text-[14px] text-realty-navy transition-all focus:ring-4 focus:ring-realty-red/10">
                    <span className="flex items-center gap-2 truncate">
                      <Building2 className="h-4 w-4 shrink-0 text-realty-red" />
                      <SelectValue placeholder="Project Category" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential-apartment">Residential Apartment</SelectItem>
                    <SelectItem value="residential-villas">Residential Villas</SelectItem>
                    <SelectItem value="residential-plot">Residential Plot</SelectItem>
                    <SelectItem value="apartment-penthouse">Apartment &amp; Penthouse</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-realty-slate/70" />
                  <Input
                    type="text"
                    placeholder="Project, locality or builder"
                    className="h-12 rounded-xl border-realty-line bg-white pl-10 text-[14px] text-realty-navy placeholder:text-realty-slate/60 focus-visible:ring-4 focus-visible:ring-realty-red/10"
                  />
                </div>

                <MagneticButton className="btn-primary sheen h-12 w-full px-8 text-[13px] uppercase tracking-[0.14em] md:w-auto">
                  <span className="relative flex items-center gap-2">
                    Search
                    <Search className="h-4 w-4" />
                  </span>
                </MagneticButton>
              </div>

              {/* Quick chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-realty-line pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-luxe text-realty-slate">
                  Popular
                </span>
                {['Whitefield', 'Sarjapur Road', 'Hebbal', 'Devanahalli', 'North Bangalore'].map(
                  (chip) => (
                    <button
                      key={chip}
                      className="rounded-full border border-realty-line bg-realty-cream px-3.5 py-1.5 text-[12px] text-realty-slate transition-all duration-300 hover:-translate-y-0.5 hover:border-realty-red/30 hover:bg-white hover:text-realty-red"
                    >
                      {chip}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-3"
        >
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-[13px] text-white/65">
              <Icon className="h-4 w-4 text-realty-goldLight" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] font-semibold uppercase tracking-luxe text-white/45">
          Scroll
        </span>
        <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-white/25">
          <span className="mt-2 h-1.5 w-1 animate-scroll-cue rounded-full bg-realty-goldLight" />
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
