'use client';

// Value proposition: an editorial two-column block with a parallax image stack
// and a set of cards that lift on hover.
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Handshake, LineChart, KeyRound, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/motion/SectionHeading';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Verified, not vibes',
    body: 'Every project is checked for RERA registration, title clarity and approval status before it reaches this page.',
  },
  {
    icon: LineChart,
    title: 'Real pricing intelligence',
    body: 'Micro-market rate trends, builder track records and honest resale outlooks — so you negotiate from knowledge.',
  },
  {
    icon: Handshake,
    title: 'Zero brokerage advisory',
    body: 'We are paid by developers, never by you. Our advisors recommend the fit, not the highest commission.',
  },
  {
    icon: KeyRound,
    title: 'End-to-end handholding',
    body: 'Site visits, home-loan facilitation, documentation and registration — one team from shortlist to keys.',
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yBack = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);
  const yFront = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container mx-auto">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image stack */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              style={reduced ? undefined : { y: yBack }}
              className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-3xl shadow-lift"
            >
              <Image
                src="/images/about-img.jpeg"
                alt="Premium residential interiors"
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-realty-navy/25 to-transparent" />
            </motion.div>

            <motion.div
              style={reduced ? undefined : { y: yFront }}
              className="absolute -bottom-6 right-0 aspect-[4/3] w-[52%] overflow-hidden rounded-2xl border-[6px] border-white shadow-lift"
            >
              <Image
                src="/images/Untitled_design_15.jpg"
                alt="Bangalore skyline"
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </motion.div>

            {/* Floating credential badge */}
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-8 flex items-center gap-3 rounded-2xl border border-realty-line bg-white/90 px-5 py-4 shadow-lift backdrop-blur-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-realty-navy">
                <ShieldCheck className="h-5 w-5 text-realty-goldLight" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold leading-none text-realty-navy">
                  100%
                </span>
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-luxe text-realty-slate">
                  RERA verified
                </span>
              </span>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Why Realty Focus"
              title="A property decision deserves better than a listings wall."
              subtitle="We work like an advisory, not a portal. Fewer projects, deeper diligence, and a team that tells you when a deal is not worth it."
              align="left"
            />

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" staggerChildren={0.1}>
              {pillars.map(({ icon: Icon, title, body }) => (
                <StaggerItem key={title}>
                  <div className="group h-full rounded-2xl border border-realty-line bg-realty-cream/60 p-6 transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-realty-red/25 hover:bg-white hover:shadow-card">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-realty-line bg-white transition-all duration-500 group-hover:border-realty-red/30 group-hover:bg-realty-red">
                      <Icon className="h-5 w-5 text-realty-red transition-colors duration-500 group-hover:text-white" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.15rem] font-semibold tracking-tight text-realty-navy">
                      {title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-realty-slate">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-9">
              <Link href="/about" className="btn-secondary group text-[12px] uppercase tracking-[0.14em]">
                Our approach
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
