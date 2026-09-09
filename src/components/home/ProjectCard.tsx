'use client';

// Premium project card: slow image zoom on hover, gradient reveal, glass price
// plate, spec grid and a CTA that fills from the left.
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { resolveImageSrc } from '@/lib/image-src';
import { Building2, MapPin, BedDouble, Ruler, CalendarClock, ArrowRight } from 'lucide-react';

const titleCase = (value?: string | null) =>
  (value || '')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export interface ProjectCardData {
  title?: string;
  location?: string;
  category?: string;
  configuration?: string;
  area?: string;
  possession?: string;
  price?: string;
  imageUrl?: string;
  buildername?: string;
  slug?: string;
  project_type?: string;
  status?: string | null;
  /** Extra fields from callers are tolerated rather than fought with. */
  [key: string]: unknown;
}

const ProjectCard = ({ project }: { project: ProjectCardData }) => {
  const reduced = useReducedMotion();

  // Handles all three shapes a featured image can take: an uploaded
  // "/api/media/<id>" path, an absolute URL, or a bare legacy filename. The old
  // version prefixed the CDN unconditionally, which turned an uploaded image
  // into a 404.
  const imageSrc =
    resolveImageSrc(project.imageUrl, 'fimage') ?? '/images/slider-image.webp';

  const specs = [
    { icon: BedDouble, label: 'Configuration', value: project.configuration },
    { icon: Ruler, label: 'Saleable area', value: project.area },
    { icon: CalendarClock, label: 'Possession', value: project.possession },
  ].filter((spec) => spec.value && spec.value !== 'N/A');

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-realty-line/80 bg-white shadow-card transition-shadow duration-500 ease-luxe hover:shadow-lift"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={project.title || 'Project'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1100ms] ease-luxe group-hover:scale-[1.08]"
        />

        {/* Bottom gradient for the price plate */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-realty-navy/85 via-realty-navy/25 to-transparent" />
        {/* Hover tint */}
        <div className="absolute inset-0 bg-realty-navy/0 transition-colors duration-500 group-hover:bg-realty-navy/10" />

        {/* Category chip */}
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-realty-navy/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-luxe text-white backdrop-blur-md">
            {project.category}
          </span>
        )}

        {/* Price plate */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-luxe text-white/60">
              Starting from
            </p>
            <p className="mt-0.5 font-display text-[17px] font-semibold leading-tight text-white">
              {project.price}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-realty-gold text-realty-navy opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.35rem] font-semibold leading-snug tracking-tight text-realty-navy transition-colors duration-300 group-hover:text-realty-red">
          {titleCase(project.title)}
        </h3>

        <div className="mt-3 space-y-1.5">
          {project.buildername && (
            <p className="flex items-center gap-2 text-[13px] text-realty-slate">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-realty-red/70" />
              <span className="truncate">{project.buildername}</span>
            </p>
          )}
          {project.location && (
            <p className="flex items-center gap-2 text-[13px] text-realty-slate">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-realty-red/70" />
              <span className="truncate">{titleCase(project.location)}</span>
            </p>
          )}
        </div>

        {/* Spec grid */}
        {specs.length > 0 && (
          <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-realty-line bg-realty-line sm:grid-cols-1">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-realty-cream px-4 py-3">
                <Icon className="h-4 w-4 shrink-0 text-realty-gold" />
                <div className="min-w-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-luxe text-realty-slate/70">
                    {label}
                  </dt>
                  <dd className="truncate text-[13px] font-medium text-realty-navy">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        )}

        <div className="flex-1" />

        <Link
          href={`/projects/${project.slug}`}
          className="group/cta relative mt-6 flex items-center justify-center gap-2 overflow-hidden rounded-full border border-realty-navy/12 bg-realty-cream py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-realty-navy transition-colors duration-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-realty-red transition-transform duration-500 ease-luxe group-hover/cta:translate-x-0" />
          <span className="relative transition-colors duration-500 group-hover/cta:text-white">
            View Details
          </span>
          <ArrowRight className="relative h-3.5 w-3.5 transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:text-white" />
        </Link>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
