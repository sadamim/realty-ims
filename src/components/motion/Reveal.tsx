'use client';

// Scroll-triggered reveal primitives built on framer-motion.
// Everything respects prefers-reduced-motion via framer's useReducedMotion.
import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Direction the element travels *from*. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  /** Slight scale-in for hero/featured elements. */
  scale?: boolean;
  once?: boolean;
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'header';
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  distance = 26,
  scale = false,
  once = true,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offsetFor(direction, distance), ...(scale ? { scale: 0.96 } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its <RevealItem> children as they scroll into view. */
export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren, staggerChildren },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export default Reveal;
