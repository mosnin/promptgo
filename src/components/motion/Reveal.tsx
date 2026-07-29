"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo, type ElementType, type ReactNode } from "react";
import { ease, viewportOnce } from "./tokens";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay before the reveal starts. */
  delay?: number;
  /** Travel distance in pixels. */
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  as?: ElementType;
  /** Disable the blur pass on very large blocks where it costs paint time. */
  blur?: boolean;
}

/**
 * Scroll triggered entrance used across every section of the site. Honours the
 * reduced motion preference by collapsing to a plain fade with no travel.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 20,
  direction = "up",
  className,
  as = "div",
  blur = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  // Memoised because motion.create returns a new component type on every call.
  // Creating it inline during render would remount the subtree on each render
  // and restart the entrance animation.
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  const offset = reduced
    ? { x: 0, y: 0 }
    : {
        x: direction === "left" ? distance : direction === "right" ? -distance : 0,
        y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      };

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        filter: blur && !reduced ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: reduced ? 0.2 : 0.65, ease: ease.out, delay }}
    >
      {children}
    </MotionTag>
  );
}
