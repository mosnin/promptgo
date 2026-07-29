"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** CSS colour for the cursor halo. Defaults to the signal colour. */
  accent?: string;
  /** Halo radius in pixels. */
  radius?: number;
}

/**
 * Card surface that tracks the pointer and paints a soft radial highlight on
 * the border. Uses motion values written directly to a CSS variable so the
 * effect never triggers a React render on mouse move.
 */
export function SpotlightCard({
  children,
  className = "",
  accent = "var(--color-signal)",
  radius = 320,
}: SpotlightCardProps) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, color-mix(in oklch, ${accent} 26%, transparent), transparent 72%)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  function handleLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
