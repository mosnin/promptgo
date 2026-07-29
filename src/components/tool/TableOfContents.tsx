"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";

export interface TocEntry {
  id: string;
  label: string;
}

/**
 * Sticky in page navigation for the article body. Tracks the section currently
 * in view with an IntersectionObserver rather than a scroll listener, which
 * keeps it off the main thread during scroll.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id ?? "");

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -68% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 3) return null;

  return (
    <nav aria-label="On this page" className="hidden xl:block">
      <p className="eyebrow mb-3">On this page</p>
      <ul className="space-y-0.5 border-l border-hairline">
        {entries.map((entry) => {
          const isActive = entry.id === active;
          return (
            <li key={entry.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-indicator"
                  className="absolute -left-px top-0 h-full w-px bg-signal"
                  transition={{ duration: 0.28, ease: ease.out }}
                />
              )}
              <a
                href={`#${entry.id}`}
                className={cn(
                  "block py-1.5 pl-4 pr-2 text-[0.8125rem] leading-snug transition-colors duration-200",
                  isActive ? "text-ink" : "text-ink-faint hover:text-ink-muted",
                )}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
