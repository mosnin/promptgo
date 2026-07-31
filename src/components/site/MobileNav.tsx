"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ease } from "@/components/motion/tokens";
import type { NavCategory } from "@/lib/nav";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  categories: NavCategory[];
  totalTools: number;
}

/**
 * Full screen navigation drawer for small viewports. Categories expand in place
 * so the whole catalogue is reachable in at most two taps.
 */
export function MobileNav({ open, onClose, categories, totalTools }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[90] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-[color-mix(in_oklch,var(--color-canvas)_78%,transparent)] backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.nav
            aria-label="Mobile navigation"
            initial={{ x: reduced ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduced ? 0 : "100%" }}
            transition={{ duration: 0.36, ease: ease.out }}
            className="absolute inset-y-0 right-0 flex w-[min(24rem,90vw)] flex-col border-l border-hairline bg-surface"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-hairline px-5">
              <span className="eyebrow">Navigate</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink"
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-3">
              <Link
                href="/explore"
                onClick={onClose}
                className="mb-2 flex items-center justify-between rounded-md border border-hairline bg-surface-2 px-4 py-3.5"
              >
                <span className="text-sm font-medium text-ink">Explore all categories</span>
                <Icon name="arrow-right" size={15} className="text-ink-subtle" />
              </Link>

              <Link
                href="/tools"
                onClick={onClose}
                className="mb-2 flex items-center justify-between rounded-md border border-hairline bg-surface-2 px-4 py-3.5"
              >
                <span className="text-sm font-medium text-ink">Browse every tool</span>
                <Icon name="arrow-right" size={15} className="text-ink-subtle" />
              </Link>

              {categories.map((category) => {
                const isOpen = expanded === category.slug;
                return (
                  <div key={category.slug} className="border-b border-hairline last:border-0">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : category.slug)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-3 px-1.5 py-3.5 text-left"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-hairline"
                        style={{
                          color: category.accent,
                          background: `color-mix(in oklch, ${category.accent} 12%, transparent)`,
                        }}
                      >
                        <Icon name={category.icon} size={15} />
                      </span>
                      <span className="flex-1 text-sm font-medium text-ink">
                        {category.name}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-ink-faint">
                        {category.count}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.24, ease: ease.out }}
                        className="flex text-ink-subtle"
                      >
                        <Icon name="chevron-down" size={15} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: ease.inOut }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-11">
                            {category.prompts.map((prompt) => (
                              <Link
                                key={prompt.href}
                                href={prompt.href}
                                onClick={onClose}
                                className="block rounded-[8px] px-2 py-2 text-[0.8125rem] text-ink-muted active:bg-surface-2"
                              >
                                {prompt.name}
                              </Link>
                            ))}
                            <Link
                              href={category.href}
                              onClick={onClose}
                              className="mt-1 block rounded-[8px] px-2 py-2 text-[0.8125rem] font-medium text-signal-bright"
                            >
                              All {category.count} {category.name.toLowerCase()} prompts
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 border-t border-hairline px-5 py-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                {totalTools} browser based prompts
              </p>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
