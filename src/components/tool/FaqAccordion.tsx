"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ease } from "@/components/motion/tokens";
import type { FaqItem } from "@/lib/types";

/**
 * FAQ block rendered at the bottom of every tool page.
 *
 * The first question starts open so there is always visible answer text in the
 * initial render, and every answer stays in the DOM as real text rather than
 * being injected on click, so crawlers index the full content of the block.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-hairline)] overflow-hidden rounded-lg border border-hairline">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-surface-2/60 sm:px-6 sm:py-5"
              >
                <span className="flex-1 text-[0.9375rem] font-medium text-ink">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.26, ease: ease.out }}
                  className="mt-0.5 flex shrink-0 text-ink-faint"
                >
                  <Icon name="chevron-down" size={16} />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: ease.inOut }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-muted sm:px-6 sm:pb-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Answer text kept in the markup for crawlers even when the panel
                is visually collapsed. */}
            {!isOpen && (
              <div className="sr-only">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
