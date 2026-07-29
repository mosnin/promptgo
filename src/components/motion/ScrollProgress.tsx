"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline reading progress bar pinned under the header. On long prompt articles
 * it gives the page a sense of length without adding visual weight.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-signal via-signal-bright to-accent-violet"
    />
  );
}
