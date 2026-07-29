"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MegaPanel } from "./MegaMenu";
import { ease, spring } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";
import type { NavCategory } from "@/lib/nav";

/**
 * Which categories sit under which nav trigger. Two groups of five keeps each
 * dropdown to a single readable row of columns, which is the whole reason for
 * splitting the catalogue across two triggers rather than one enormous panel.
 */
const GROUPS: Record<string, string[]> = {
  // Split so each dropdown stays one readable row of columns. The division is
  // roughly commercial work against craft work, which is how people arrive.
  work: [
    "marketing-prompts",
    "sales-prompts",
    "business-prompts",
    "career-prompts",
    "productivity-prompts",
  ],
  craft: [
    "writing-prompts",
    "coding-prompts",
    "data-analysis-prompts",
    "design-prompts",
    "education-prompts",
  ],
};

interface PrimaryNavProps {
  categories: NavCategory[];
  totalTools: number;
}

/**
 * Desktop primary navigation.
 *
 * Two behaviours carry the feel of this bar. A single pill slides between items
 * on hover using a shared layout id, so the highlight reads as one object
 * moving rather than ten separate hover states fading in and out. And open and
 * close are intent based: a short close delay lets the pointer travel
 * diagonally from a trigger into the panel below it without the menu snapping
 * shut on the way.
 */
export function PrimaryNav({ categories, totalTools }: PrimaryNavProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpen(null);
      setHovered(null);
    }, 140);
  }, [cancelClose]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const bySlug = new Map(categories.map((category) => [category.slug, category]));
  const group = (key: string) =>
    GROUPS[key].map((slug) => bySlug.get(slug)).filter((value): value is NavCategory => !!value);

  interface NavItem {
    key: string;
    label: string;
    /** Present on plain links. Mutually exclusive with categories. */
    href?: string;
    /** Present on dropdown triggers. */
    categories?: NavCategory[];
  }

  const items: NavItem[] = [
    { key: "work", label: "For work", categories: group("work") },
    { key: "craft", label: "For craft", categories: group("craft") },
    { key: "explore", label: "Explore", href: "/explore" },
    { key: "about", label: "About", href: "/about" },
  ];

  const openItem = items.find((item) => item.key === open && item.categories);

  return (
    <>
    <nav
      aria-label="Primary"
      className="hidden items-center lg:flex"
      onMouseLeave={scheduleClose}
    >
      {items.map((item) => {
        const isLit = hovered === item.key || open === item.key;

        const inner = (
          <>
            {isLit && (
              <motion.span
                layoutId={reduced ? undefined : "nav-pill"}
                className="absolute inset-0 rounded-full bg-surface-2"
                transition={spring.snappy}
              />
            )}
            <span className="relative z-10">{item.label}</span>
            {item.categories && (
              <motion.span
                animate={{ rotate: open === item.key ? 180 : 0 }}
                transition={{ duration: 0.28, ease: ease.out }}
                className="relative z-10 inline-flex"
              >
                <Icon name="chevron-down" size={13} />
              </motion.span>
            )}
          </>
        );

        const className = cn(
          "relative inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors duration-200",
          isLit ? "text-ink" : "text-ink-muted",
        );

        if (item.href) {
          return (
            <Link
              key={item.key}
              href={item.href}
              className={className}
              onMouseEnter={() => {
                cancelClose();
                setHovered(item.key);
                setOpen(null);
              }}
              onFocus={() => setHovered(item.key)}
            >
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            aria-expanded={open === item.key}
            aria-haspopup="true"
            className={className}
            onMouseEnter={() => {
              cancelClose();
              setHovered(item.key);
              setOpen(item.key);
            }}
            onFocus={() => {
              setHovered(item.key);
              setOpen(item.key);
            }}
            onClick={() => setOpen((value) => (value === item.key ? null : item.key))}
          >
            {inner}
          </button>
        );
      })}

    </nav>

      {/* Rendered as a sibling of the nav rather than a child of it. The nav
          sits hard against the wordmark on the left of the header, so a panel
          positioned against the nav would centre on the nav and hang off the
          left edge of the viewport. Positioned against the header's shell
          container instead, it spans the page width like the rest of the
          layout. */}
      <AnimatePresence>
        {openItem?.categories && (
          <motion.div
            key={openItem.key}
            initial={{ opacity: 0, y: reduced ? 0 : -10, scale: reduced ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6, scale: reduced ? 1 : 0.99 }}
            transition={{ duration: 0.24, ease: ease.out }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-5 top-[calc(100%+6px)] z-50 hidden origin-top lg:block md:inset-x-8"
          >
            {/* Invisible bridge so the pointer can cross the gap to the panel. */}
            <div aria-hidden className="absolute inset-x-0 -top-4 h-4" />
            <MegaPanel
              categories={openItem.categories}
              totalTools={totalTools}
              onNavigate={() => setOpen(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
