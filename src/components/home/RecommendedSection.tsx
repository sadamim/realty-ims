'use client';

// Trust strip: an infinitely scrolling marquee of the builders we work with.
import React from 'react';
import { Reveal } from '@/components/motion/Reveal';

const builders = [
  'Prestige Group',
  'Brigade',
  'Sobha',
  'Godrej Properties',
  'Puravankara',
  'Embassy',
  'Total Environment',
  'Salarpuria Sattva',
  'Mantri Developers',
];

export default function RecommendedSection() {
  const loop = [...builders, ...builders];

  return (
    <section className="border-y border-realty-line bg-white py-10">
      <div className="container mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow justify-center text-realty-slate/70">
            <span className="h-px w-6 bg-realty-line" />
            Trusted by Bangalore&apos;s leading developers
            <span className="h-px w-6 bg-realty-line" />
          </p>
        </Reveal>
      </div>

      {/* Marquee — masked at both edges so it fades rather than clips */}
      <div
        className="relative mt-7 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
          {loop.map((builder, index) => (
            <span
              key={`${builder}-${index}`}
              className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-realty-navy/30 transition-colors duration-300 hover:text-realty-navy/70"
            >
              {builder}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
