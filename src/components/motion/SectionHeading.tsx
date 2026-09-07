'use client';

// Shared editorial section header: eyebrow, animated title and a gold hairline
// that draws itself in when the section enters the viewport.
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}: Props) {
  const reduced = useReducedMotion();
  const centered = align === 'center';

  const words = title.split(' ');

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`eyebrow ${centered ? 'justify-center' : ''} ${
            tone === 'dark' ? 'text-realty-goldLight' : ''
          }`}
        >
          <span
            className={`h-px w-6 ${
              tone === 'dark' ? 'bg-realty-goldLight/60' : 'bg-realty-red/50'
            }`}
          />
          {eyebrow}
          {centered && (
            <span
              className={`h-px w-6 ${
                tone === 'dark' ? 'bg-realty-goldLight/60' : 'bg-realty-red/50'
              }`}
            />
          )}
        </motion.div>
      )}

      <h2
        className={`mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.7rem] ${
          tone === 'dark' ? 'text-white' : 'text-realty-navy'
        }`}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            initial={reduced ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.7,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {index < words.length - 1 && ' '}
          </motion.span>
        ))}
      </h2>

      <motion.div
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-5 h-px w-20 origin-left bg-gradient-to-r from-realty-red via-realty-gold to-transparent ${
          centered ? 'mx-auto origin-center' : ''
        }`}
      />

      {subtitle && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 text-[15px] leading-relaxed ${
            tone === 'dark' ? 'text-white/65' : 'text-realty-slate'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
