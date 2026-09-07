'use client';

// Premium footer: deep navy gradient, an editorial brand column, data-driven
// link columns with hover motion, a compact enquiry card and a fine-print bar.
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Location',
    links: [
      { label: 'Whitefield', href: '/location/whitefield' },
      { label: 'Sarjapur Road', href: '/location/sarjapur-road' },
      { label: 'Devanahalli', href: '/location/devanahalli' },
      { label: 'Electronic City', href: '/location/electronic-city' },
      { label: 'Yelahanka', href: '/location/yelahanka' },
      { label: 'Bannerghatta Road', href: '/location/bannerghatta-road' },
      { label: 'Sarjapur', href: '/location/sarjapur' },
      { label: 'Hennur Road', href: '/location/hennur-road' },
      { label: 'Hoskote', href: '/location/hoskote' },
      { label: 'Kanakapura Road', href: '/location/kanakapura-road' },
      { label: 'Old Madras Road', href: '/location/old-madras-road' },
      { label: 'JP Nagar', href: '/location/jp-nagar' },
      { label: 'Hebbal', href: '/location/hebbal' },
      { label: 'Mysore Road', href: '/location/mysore-road' },
      { label: 'Electronic City Phase I', href: '/location/electronic-city-phase-i' },
    ],
  },
  {
    title: 'Builder',
    links: [
      { label: 'Prestige Group', href: '/builders/prestige-group' },
      { label: 'Brigade Group', href: '/builders/brigade-group' },
      { label: 'Sobha Developers', href: '/builders/sobha-developers' },
      { label: 'Godrej Group', href: '/builders/godrej-group' },
      { label: 'Puravankara', href: '/builders/puravankara' },
      { label: 'Sattva Group', href: '/builders/sattva-group' },
      { label: 'Shriram Properties', href: '/builders/shriram-properties' },
      { label: 'Adarsh Developers', href: '/builders/adarsh-developers' },
      { label: 'Assetz Homes', href: '/builders/assetz-homes' },
      { label: 'Century Real Estate', href: '/builders/century-real-estate' },
      { label: 'Mahaveer Group', href: '/builders/mahaveer-group' },
      { label: 'DS Max Properties', href: '/builders/ds-max-properties' },
      { label: 'DSR Group', href: '/builders/dsr-group' },
      { label: 'Aratt Builders', href: '/builders/aratt-builders' },
      { label: 'Unishire Groups', href: '/builders/unishire-groups' },
    ],
  },
  {
    title: 'Property Type',
    links: [
      { label: 'Residential Apartment', href: '/type/residential-apartment' },
      { label: 'Residential Villas', href: '/type/residential-villas' },
      { label: 'Residential Plot', href: '/type/residential-plot' },
      { label: 'Apartment & Penthouse', href: '/type/residential-apartment-and-penthouse' },
      { label: 'Row House', href: '/type/row-house' },
      { label: 'Town House', href: '/type/town-house' },
      { label: '2 BHK', href: '/classification/2bhk' },
      { label: '3 BHK', href: '/classification/3bhk' },
      { label: '4 BHK', href: '/classification/4bhk' },
      { label: '5 BHK', href: '/classification/5bhk' },
      { label: 'Under Construction', href: '/status/under-construction' },
      { label: 'Completed', href: '/status/completed' },
      { label: 'Coming Soon', href: '/status/coming-soon' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Builders', href: '/builders' },
      { label: 'Buy Properties', href: '/buy-properties' },
      { label: 'Sell Properties', href: '/sell-properties' },
      { label: 'Rent Properties', href: '/rent-properties' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Area Converter', href: '/area-converter' },
    ],
  },
];

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://www.twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com', label: 'LinkedIn' },
];

const Footer = () => {
  const reduced = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-realty-darkNavy text-white">
      {/* Background image, heavily damped */}
      <div className="absolute inset-0 bg-footer bg-cover bg-center opacity-[0.06]" />
      <div className="absolute inset-0 bg-gradient-to-b from-realty-navy via-realty-darkNavy to-[#070d18]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-realty-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-realty-gold/[0.07] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-50" />

      <div className="container relative mx-auto pt-16 md:pt-20">
        {/* Brand + enquiry */}
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Image
              src="/images/logo-dark.png"
              alt="Realty Focus"
              width={150}
              height={56}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/55">
              Realty Focus is a Bangalore-based real-estate advisory. We curate RERA-verified
              apartments, villas and plots, and guide buyers end to end — from the first
              shortlist to registration.
            </p>

            <div className="mt-8 space-y-3.5">
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-realty-goldLight"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/5 transition-colors group-hover:border-realty-gold/40">
                  <Phone className="h-3.5 w-3.5 text-realty-goldLight" />
                </span>
                +91 98765 43210
              </a>
              <a
                href="mailto:info@realtyfocus.info"
                className="group flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-realty-goldLight"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/5 transition-colors group-hover:border-realty-gold/40">
                  <Mail className="h-3.5 w-3.5 text-realty-goldLight" />
                </span>
                info@realtyfocus.info
              </a>
              <p className="flex items-start gap-3 text-[14px] text-white/70">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/5">
                  <MapPin className="h-3.5 w-3.5 text-realty-goldLight" />
                </span>
                <span className="pt-2">Bangalore, Karnataka, India</span>
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/65 transition-colors duration-300 hover:border-realty-gold/50 hover:bg-realty-gold hover:text-realty-navy"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Enquiry card */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm">
            <h3 className="font-display text-[1.35rem] font-semibold tracking-tight text-white">
              Send us an enquiry
            </h3>
            <p className="mt-2 text-[13px] text-white/50">
              We reply within one business day.
            </p>

            <form className="mt-6 space-y-3">
              <Input
                type="text"
                placeholder="Name"
                className="h-11 rounded-xl border-white/12 bg-white/[0.06] text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-realty-gold/40"
              />
              <Input
                type="email"
                placeholder="Email"
                className="h-11 rounded-xl border-white/12 bg-white/[0.06] text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-realty-gold/40"
              />
              <div className="flex gap-2">
                <select
                  aria-label="Country code"
                  className="h-11 w-[30%] rounded-xl border border-white/12 bg-white/[0.06] px-3 text-sm text-white outline-none focus:ring-2 focus:ring-realty-gold/40"
                >
                  <option className="text-realty-navy" value="india">
                    (+91)
                  </option>
                </select>
                <Input
                  type="tel"
                  placeholder="Phone"
                  className="h-11 flex-1 rounded-xl border-white/12 bg-white/[0.06] text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-realty-gold/40"
                />
              </div>
              <Textarea
                placeholder="Message"
                rows={3}
                className="rounded-xl border-white/12 bg-white/[0.06] text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-realty-gold/40"
              />
              <button
                type="submit"
                className="btn-primary sheen group w-full text-[12px] uppercase tracking-[0.14em]"
              >
                <span className="relative flex items-center gap-2">
                  Submit enquiry
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <Stagger className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.08}>
          {columns.map((column) => (
            <StaggerItem key={column.title}>
              <h3 className="footer-heading">{column.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link inline-flex items-center gap-2 text-[13px]"
                    >
                      <span className="h-px w-0 bg-realty-gold transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Fine print */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-[12px] text-white/40">
            © {new Date().getFullYear()} Realty Focus. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px] text-white/40">
            <Link href="/privacy-policy" className="transition-colors hover:text-realty-goldLight">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-realty-goldLight">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
