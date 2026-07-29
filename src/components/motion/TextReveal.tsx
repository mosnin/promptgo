"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { ease, viewportOnce } from "./tokens";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Highlight these words with the signal gradient. Case insensitive. */
  highlight?: string[];
}

/**
 * Word by word masked reveal for display headings. Each word sits inside an
 * overflow hidden span and slides up from below the baseline, which reads as a
 * deliberate typographic effect rather than a generic fade.
 */
export function TextReveal({
  text,
  className,
  as = "h1",
  delay = 0,
  highlight = [],
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");
  const highlightSet = new Set(highlight.map((word) => word.toLowerCase()));

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
        }}
        className="inline"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              className={
                highlightSet.has(word.toLowerCase().replace(/[^a-z0-9]/g, ""))
                  ? "signal-ink inline-block"
                  : "inline-block"
              }
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.78, ease: ease.out },
                },
              }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
