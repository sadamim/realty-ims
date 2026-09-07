'use client';

// Premium sticky header: a slim gold contact bar that retracts on scroll, a
// glass navigation shell, animated underlines and a motion-driven mega dropdown.
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail, ChevronDown, ArrowUpRight } from 'lucide-react';

const postLinks = [
  { label: 'Buy Properties', href: '/buy-properties', hint: 'Ready-to-move & new launch homes' },
  { label: 'Sell Properties', href: '/sell-properties-in-bangalore', hint: 'List your property with us' },
  { label: 'Rent Properties', href: '/rent-properties-in-bangalore', hint: 'Verified rentals across Bangalore' },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Post', href: '#', dropdown: postLinks },
  { label: 'Projects', href: '/projects' },
  { label: 'Builders', href: '/builders' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
];

const Header = () => {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePostOpen, setMobilePostOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility bar — collapses away as the user scrolls */}
      <motion.div
        initial={false}
        animate={{ height: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-realty-navy text-white"
      >
        <div className="container mx-auto flex h-10 items-center justify-between text-[12px]">
          <p className="hidden items-center gap-2 tracking-wide text-white/70 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-realty-gold" />
            Bangalore&apos;s trusted real-estate advisory since 2010
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-white/75 transition-colors hover:text-realty-goldLight"
            >
              <Phone className="h-3.5 w-3.5" />
              +91 98765 43210
            </a>
            <a
              href="mailto:info@realtyfocus.info"
              className="hidden items-center gap-2 text-white/75 transition-colors hover:text-realty-goldLight sm:flex"
            >
              <Mail className="h-3.5 w-3.5" />
              info@realtyfocus.info
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main navigation */}
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,1)',
          boxShadow: scrolled
            ? '0 8px 30px -18px rgba(13,21,36,.45)'
            : '0 1px 0 0 rgba(13,21,36,.06)',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="backdrop-blur-xl"
      >
        <div className="container mx-auto flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center">
            <motion.div whileHover={reduced ? undefined : { scale: 1.03 }} transition={{ duration: 0.35 }}>
              <Image
                src="/images/logo-light.png"
                alt="Realty Focus"
                width={140}
                height={54}
                priority
                className="h-11 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`nav-link flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] focus:outline-none ${
                      openDropdown === item.label ? 'active' : ''
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-5"
                      >
                        <div className="overflow-hidden rounded-2xl border border-realty-line bg-white/95 p-2 shadow-lift backdrop-blur-xl">
                          {item.dropdown.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="group flex items-start gap-3 rounded-xl px-4 py-3 transition-colors duration-300 hover:bg-realty-cream"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-realty-red/40 transition-all duration-300 group-hover:bg-realty-red" />
                              <span className="flex-1">
                                <span className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-wide text-realty-navy">
                                  {link.label}
                                  <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                </span>
                                <span className="mt-0.5 block text-xs text-realty-slate">{link.hint}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link text-[13px] font-semibold uppercase tracking-[0.12em] ${
                    isActive(item.href) ? 'active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden xl:block">
              <span className="btn-primary sheen text-[12px] uppercase tracking-[0.14em]">
                Enquire Now
              </span>
            </Link>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="rounded-full border border-realty-line p-2.5 text-realty-navy transition-colors hover:border-realty-red/40 hover:text-realty-red lg:hidden">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] border-l border-white/10 bg-realty-navy p-0 text-white sm:w-[380px]">
                <div className="flex h-full flex-col">
                  <div className="border-b border-white/10 px-6 py-6">
                    <Image
                      src="/images/logo-dark.png"
                      alt="Realty Focus"
                      width={130}
                      height={50}
                      className="h-10 w-auto object-contain brightness-0 invert"
                    />
                  </div>

                  <nav className="flex-1 overflow-y-auto px-6 py-6">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={reduced ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="border-b border-white/8"
                      >
                        {item.dropdown ? (
                          <>
                            <button
                              onClick={() => setMobilePostOpen((v) => !v)}
                              className="flex w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/85"
                            >
                              {item.label}
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  mobilePostOpen ? 'rotate-180 text-realty-goldLight' : ''
                                }`}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {mobilePostOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-3 pl-4">
                                    {item.dropdown.map((link) => (
                                      <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-2.5 text-[13px] uppercase tracking-wide text-white/60 transition-colors hover:text-realty-goldLight"
                                      >
                                        {link.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${
                              isActive(item.href) ? 'text-realty-goldLight' : 'text-white/85 hover:text-realty-goldLight'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>

                  <div className="border-t border-white/10 px-6 py-6">
                    <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-white/70">
                      <Phone className="h-4 w-4 text-realty-goldLight" />
                      +91 98765 43210
                    </a>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary mt-4 w-full text-[12px] uppercase tracking-[0.14em]"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
