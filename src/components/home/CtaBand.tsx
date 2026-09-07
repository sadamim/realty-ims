'use client';

// Closing call-to-action: full-bleed image, heavy scrim, and a pair of
// magnetic buttons. Deliberately the loudest moment on the page.
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';

export default function CtaBand() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/about-bg.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-realty-navy/[0.94]" />
      <div className="absolute inset-0 bg-gradient-to-b from-realty-darkNavy/70 via-transparent to-realty-darkNavy/70" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_50%,rgba(201,162,39,.14),transparent_70%)]" />
      <div className="grain absolute inset-0" />

      <div className="container relative mx-auto py-20 text-center md:py-28">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow justify-center text-realty-goldLight"
        >
          <span className="h-px w-6 bg-realty-goldLight/50" />
          Let&apos;s find your address
          <span className="h-px w-6 bg-realty-goldLight/50" />
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.12] tracking-tight text-white md:text-[3.2rem]"
        >
          Talk to an advisor who knows the{' '}
          <span className="text-gradient-gold">street, not just the brochure.</span>
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/75"
        >
          Share what you are looking for and we will come back within 24 hours with a
          shortlist, honest pricing context and site visits arranged around your schedule.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="btn-primary sheen group w-full text-[12px] uppercase tracking-[0.14em] sm:w-auto"
          >
            <span className="relative flex items-center gap-2">
              Book a consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
          <a href="tel:+919876543210" className="btn-ghost-light w-full text-[12px] uppercase tracking-[0.14em] sm:w-auto">
            <PhoneCall className="mr-2 h-4 w-4" />
            +91 98765 43210
          </a>
        </motion.div>
      </div>
    </section>
  );
}
