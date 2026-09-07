'use client';

// Dark stats band with count-up figures — replaces the thin
// "highly recommended" strip and gives the page a confident anchor.
import React from 'react';
import AnimatedCounter from '@/components/motion/AnimatedCounter';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

const stats = [
  { value: 450, suffix: '+', label: 'Curated projects', hint: 'Across Bangalore' },
  { value: 120, suffix: '+', label: 'Partner builders', hint: 'RERA registered' },
  { value: 15, suffix: ' yrs', label: 'Market experience', hint: 'Since 2010' },
  { value: 9800, suffix: '+', label: 'Families advised', hint: 'And counting' },
];

export default function StatsBand() {
  return (
    <section className="grain relative overflow-hidden bg-realty-navy py-16 md:py-20">
      {/* Gold hairline top & bottom */}
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold-line opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-realty-red/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-realty-gold/10 blur-3xl" />

      <div className="container relative mx-auto">
        <Stagger className="grid grid-cols-2 gap-y-12 lg:grid-cols-4" staggerChildren={0.12}>
          {stats.map((stat, index) => (
            <StaggerItem
              key={stat.label}
              className={`px-2 text-center lg:px-8 ${
                index !== stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              <p className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-white md:text-[3.2rem]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-luxe text-realty-goldLight">
                {stat.label}
              </p>
              <p className="mt-1.5 text-[13px] text-white/45">{stat.hint}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
