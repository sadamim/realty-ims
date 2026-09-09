'use client';

// Client testimonials, written in the admin panel.
//
// The whole section is rendered by the homepage only when there is at least one
// active testimonial, so an empty collection changes nothing about the page —
// no empty heading, no placeholder cards.
import React from 'react';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import SectionHeading from '@/components/motion/SectionHeading';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import type { Testimonial } from '@/lib/content';

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-realty-cream/40 py-20 md:py-28">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="In their words"
          title="What our clients say"
          subtitle="Families and investors who found their address with us."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item._id}>
              <figure className="flex h-full flex-col rounded-2xl border border-realty-line/80 bg-white p-7 shadow-card transition-shadow duration-500 ease-luxe hover:shadow-lift">
                <Quote className="h-7 w-7 shrink-0 text-realty-red/25" aria-hidden />

                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-realty-slate">
                  {item.quote}
                </blockquote>

                {item.rating > 0 && (
                  <div
                    className="mt-5 flex items-center gap-0.5"
                    aria-label={`Rated ${item.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < item.rating
                            ? 'fill-realty-gold text-realty-gold'
                            : 'text-realty-line'
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>
                )}

                <figcaption className="mt-5 flex items-center gap-3 border-t border-realty-line/70 pt-5">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-realty-navy/5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      // No photo is normal — the initial keeps the row aligned.
                      <span className="font-display text-base font-semibold text-realty-navy/60">
                        {item.name.slice(0, 1).toUpperCase() || '•'}
                      </span>
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-realty-navy">
                      {item.name}
                    </span>
                    <span className="block truncate text-sm text-realty-slate/80">
                      {[item.role, item.project || item.location].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
