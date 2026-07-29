"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PrimaryNav } from "./PrimaryNav";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";
import { ease } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";
import type { NavData } from "@/lib/nav";

interface HeaderClientProps extends NavData {
  categoryNames: Record<string, string>;
}

export function HeaderClient({ categories, totalTools, categoryNames }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 12);
  });

  const openSearch = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const isPaletteShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const isSlash =
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement);

      if (isPaletteShortcut || isSlash) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: ease.out, delay: 0.05 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_82%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        {/* Positioning context for the mega menu panel, which is a sibling of
            the nav so that it can span the full shell width. */}
        <div className="shell relative flex h-16 items-center gap-3">
          <Link
            href="/"
            aria-label="Fast Prompts home"
            className="mr-1 flex shrink-0 items-center gap-2.5"
          >
            <Wordmark />
          </Link>

          <PrimaryNav categories={categories} totalTools={totalTools} />

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search prompts"
              className="group flex h-9 items-center gap-2 rounded-full border border-hairline bg-surface-2/60 pl-2.5 pr-2 text-ink-subtle transition-colors duration-200 hover:border-hairline-strong hover:text-ink sm:w-56"
            >
              <Icon name="search" size={15} className="shrink-0" />
              <span className="hidden flex-1 text-left text-[0.8125rem] sm:block">
                Search prompts
              </span>
              <kbd className="hidden rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-faint sm:block">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink lg:hidden"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        categoryNames={categoryNames}
      />
      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        categories={categories}
        totalTools={totalTools}
      />
    </>
  );
}
