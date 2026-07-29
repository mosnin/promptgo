import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every animation on the site pulls its easing and
 * duration from here, which is what makes a heavily animated interface feel
 * like one system instead of a pile of unrelated effects.
 */

export const ease = {
  /** Decisive entrances. Fast start, long settle. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Symmetric moves such as accordions and drawers. */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** Slight overshoot for anything that should feel physical. */
  spring: [0.34, 1.56, 0.64, 1] as const,
};

export const spring = {
  soft: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
  snappy: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
  gentle: { type: "spring", stiffness: 140, damping: 24, mass: 1 },
} satisfies Record<string, Transition>;

export const transition = {
  fast: { duration: 0.24, ease: ease.out },
  base: { duration: 0.42, ease: ease.out },
  slow: { duration: 0.72, ease: ease.out },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease.out },
  },
};

/** Parent container that walks its children in with a small offset. */
export function staggerParent(stagger = 0.06, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Standard viewport config: animate once, trigger slightly before entry. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;
