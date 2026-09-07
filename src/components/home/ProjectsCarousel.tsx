'use client';
// Shared client-side carousel. Project data is fetched on the server and passed
// in as a prop; Swiper only takes over interactivity on hydration.
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/home/ProjectCard';
import SectionHeading from '@/components/motion/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { decodeHtml, formatDate, formatPrice } from '@/lib/format';
import type { MicrositeListItem } from '@/lib/microsites';

const titleCase = (value: string | null) =>
  (value || '')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

interface Props {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  badge: string;
  projects: MicrositeListItem[];
  emptyMessage?: string;
  tone?: 'light' | 'cream';
  viewAllHref?: string;
}

export default function ProjectsCarousel({
  eyebrow = 'Apartments for sale',
  heading,
  subtitle,
  badge,
  projects,
  emptyMessage = 'No projects to show yet.',
  tone = 'light',
  viewAllHref = '/projects',
}: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = (swiper: SwiperClass) => {
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  };

  return (
    <section
      className={`relative overflow-hidden py-20 md:py-24 ${
        tone === 'cream' ? 'bg-realty-cream' : 'bg-white'
      }`}
    >
      {/* Soft decorative wash */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-realty-gold/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-realty-red/[0.05] blur-3xl" />

      <div className="container relative mx-auto">
        {/* Header row */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={eyebrow} title={heading} subtitle={subtitle} align="left" />

          {projects.length > 0 && (
            <Reveal direction="left" delay={0.15} className="flex items-center gap-3">
              <button
                aria-label="Previous projects"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={atStart}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-realty-navy/12 bg-white text-realty-navy transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:border-realty-red hover:bg-realty-red hover:text-white disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next projects"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={atEnd}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-realty-navy/12 bg-white text-realty-navy transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:border-realty-red hover:bg-realty-red hover:text-white disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href={viewAllHref}
                className="ml-2 hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-realty-navy transition-colors hover:text-realty-red sm:flex"
              >
                <span className="link-underline">View all</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-realty-line bg-white/60 py-16 text-center">
            <p className="text-sm text-realty-slate">{emptyMessage}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                syncEdges(swiper);
              }}
              onSlideChange={syncEdges}
              onResize={syncEdges}
              spaceBetween={28}
              slidesPerView={1}
              speed={750}
              autoplay={{ delay: 5200, disableOnInteraction: true, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1.15 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {projects.slice(0, 9).map((project) => (
                <SwiperSlide key={project.micro_id} className="!h-auto">
                  <div className="h-full pb-2">
                    <ProjectCard
                      project={{
                        title: project.name,
                        location: titleCase(project.location),
                        category: project.type?.toUpperCase() || 'N/A',
                        configuration:
                          decodeHtml(project.rooms).replace(/(<([^>]+)>)/gi, '') || 'N/A',
                        area:
                          project.min_sqft && project.max_sqft
                            ? `${project.min_sqft} - ${project.max_sqft} sq.ft.`
                            : 'N/A',
                        possession: formatDate(project.possession),
                        price:
                          project.min_basic_cost && project.max_basic_cost
                            ? `₹ ${formatPrice(project.min_basic_cost)} - ₹ ${formatPrice(project.max_basic_cost)}`
                            : 'Price on Request',
                        imageUrl: project.featured_image,
                        buildername: project.builder_name || '',
                        slug: project.name?.toLowerCase().replace(/\s+/g, '-'),
                        project_type: badge,
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
}
