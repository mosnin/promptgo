"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { CategoryVolume } from "@/lib/stats";
import { cn } from "@/lib/cn";

/**
 * Distribution of the catalogue across categories.
 *
 * Every bar is a count from the registry, so the chart cannot drift out of step
 * with the site: add a tool and the column it belongs to grows on the next
 * build. The segmenting is not decoration either. Each column is divided into
 * as many blocks as the category has tools, which means the chart reads as a
 * tally at a glance and the height and the number agree by construction rather
 * than by a designer choosing a percentage.
 *
 * Bars grow from the baseline on entry, staggered left to right, and a column
 * lifts when pointed at. Under reduced motion they are simply drawn at full
 * height.
 */
export function CatalogueChart({
  volumes,
  total,
}: {
  volumes: CategoryVolume[];
  total: number;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const average = Math.round((total / Math.max(volumes.length, 1)) * 10) / 10;

  return (
    <div className="panel lit relative overflow-hidden p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.25rem]">
            Where the {total} tools sit
          </h3>
          <p className="mt-1 text-[0.75rem] text-ink-subtle">
            One block per tool, counted from the catalogue itself.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-subtle">
          {volumes.length} categories
        </span>
      </div>

      <div className="mt-7 flex h-44 items-end justify-between gap-1.5 sm:gap-3">
        {volumes.map((volume, index) => {
          const isActive = active === volume.slug;

          return (
            <div
              key={volume.slug}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
              onMouseEnter={() => setActive(volume.slug)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={`/${volume.slug}`}
                onFocus={() => setActive(volume.slug)}
                onBlur={() => setActive(null)}
                className="relative flex w-full flex-1 items-end justify-center"
                aria-label={`${volume.name}, ${volume.count} tools`}
              >
                <motion.span
                  aria-hidden
                  className={cn(
                    "font-mono text-[0.6875rem] tabular-nums transition-colors duration-200",
                    "absolute -top-5 left-1/2 -translate-x-1/2",
                    isActive ? "text-ink" : "text-ink-faint",
                  )}
                >
                  {volume.count}
                </motion.span>

                <motion.span
                  className="flex w-full max-w-[2.75rem] flex-col justify-end gap-[3px] overflow-hidden rounded-full border border-hairline bg-canvas p-[3px]"
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{
                    height: `${Math.max(volume.ratio * 100, 12)}%`,
                    opacity: 1,
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  {Array.from({ length: volume.count }).map((_, blockIndex) => (
                    <span
                      key={blockIndex}
                      className="w-full flex-1 rounded-full transition-opacity duration-300"
                      style={{
                        background: volume.accent,
                        opacity: isActive ? 0.95 : 0.3 + (blockIndex / volume.count) * 0.4,
                      }}
                    />
                  ))}
                </motion.span>
              </Link>

              <span
                className={cn(
                  "w-full truncate text-center text-[0.625rem] transition-colors duration-200",
                  isActive ? "text-ink" : "text-ink-faint",
                )}
              >
                {volume.name.split(" ")[0]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4 text-[0.75rem] text-ink-subtle">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-signal" />
          One block per published tool
        </span>
        <span>
          Average per category <span className="font-medium text-ink">{average}</span>
        </span>
      </div>
    </div>
  );
}
