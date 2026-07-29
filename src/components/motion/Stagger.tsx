"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ease, staggerParent, viewportOnce } from "./tokens";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  step?: number;
  delay?: number;
}

/** Container that reveals its `StaggerItem` children in sequence. */
export function Stagger({ children, className, step = 0.055, delay = 0 }: StaggerProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={staggerParent(reduced ? 0 : step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

export function StaggerItem({ children, className, distance = 16 }: StaggerItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : distance, filter: "blur(5px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.55, ease: ease.out },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
