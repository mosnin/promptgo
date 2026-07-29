"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { ease } from "@/components/motion/tokens";
import type { NavCategory } from "@/lib/nav";

interface MegaPanelProps {
  categories: NavCategory[];
  totalTools: number;
  onNavigate: () => void;
}

/**
 * The dropdown body: one column per category, each headed by its icon and name,
 * with a rule under the whole header row so the columns read as a single table
 * rather than five stacked lists.
 *
 * Columns walk in on a short stagger. The delay is small enough that the panel
 * still feels instant, but it gives the eye a left to right reading order
 * instead of presenting forty links at once.
 */
export function MegaPanel({ categories, totalTools, onNavigate }: MegaPanelProps) {
  const reduced = useReducedMotion();

  return (
    <div className="lit grain relative overflow-hidden rounded-xl border border-hairline bg-[color-mix(in_oklch,var(--color-surface)_92%,transparent)] shadow-[0_40px_90px_-28px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
      <div className="grid grid-cols-2 gap-x-5 gap-y-7 p-6 lg:grid-cols-5">
        {categories.map((category, columnIndex) => (
          <motion.div
            key={category.slug}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.34,
              ease: ease.out,
              delay: reduced ? 0 : 0.03 + columnIndex * 0.035,
            }}
            className="min-w-0"
          >
            <Link
              href={category.href}
              onClick={onNavigate}
              className="group/head flex items-center gap-2 border-b border-hairline pb-2.5"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] transition-transform duration-300 group-hover/head:scale-110"
                style={{
                  color: category.accent,
                  background: `color-mix(in oklch, ${category.accent} 14%, transparent)`,
                }}
              >
                <Icon name={category.icon} size={13} />
              </span>
              <span className="truncate text-[0.8125rem] font-semibold tracking-[-0.01em] text-ink">
                {category.name}
              </span>
            </Link>

            <ul className="mt-2.5 space-y-px">
              {category.tools.slice(0, 7).map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    onClick={onNavigate}
                    className="group/link relative flex items-center gap-1 rounded-[8px] px-2 py-[0.3125rem] text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
                  >
                    <span className="truncate">{tool.name}</span>
                    <Icon
                      name="arrow-up-right"
                      size={10}
                      className="shrink-0 -translate-x-1 text-ink-faint opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                    />
                  </Link>
                </li>
              ))}

              {category.count > 7 && (
                <li>
                  <Link
                    href={category.href}
                    onClick={onNavigate}
                    className="group/all inline-flex items-center gap-1 px-2 py-[0.3125rem] text-[0.8125rem] font-medium text-signal-bright"
                  >
                    {category.count - 7} more
                    <Icon
                      name="arrow-right"
                      size={10}
                      className="transition-transform duration-200 group-hover/all:translate-x-0.5"
                    />
                  </Link>
                </li>
              )}

              {category.count === 0 && (
                <li className="px-2 py-1 text-[0.8125rem] text-ink-faint">Publishing soon</li>
              )}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_50%,transparent)] px-6 py-3">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
          {totalTools} tools. Every one runs in your browser.
        </p>
        <Link
          href="/explore"
          onClick={onNavigate}
          className="group/foot inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          Explore all categories
          <Icon
            name="arrow-right"
            size={13}
            className="transition-transform duration-200 group-hover/foot:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
