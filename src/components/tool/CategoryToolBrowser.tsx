"use client";

import { BorderBeam } from "border-beam";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ToolCard } from "./ToolCard";
import type { ToolCardData } from "@/lib/tool-card";
import { useThemeAttribute } from "@/lib/use-theme";

/**
 * Search and grid for a single category.
 *
 * The filter runs over name, summary and declared formats, which matters more
 * than it sounds: on a conversion catalogue people search by extension far more
 * often than by tool name, and a name only match would fail the person typing
 * "heic" into a page that lists "HEIC to JPG Converter" under a summary
 * mentioning iPhone photos.
 *
 * Filtering is local and synchronous over a list of at most a few dozen, so
 * there is nothing to debounce and no loading state to design. Results animate
 * out and in by layout rather than being swapped, so a card that survives the
 * query moves to its new position instead of disappearing and reappearing.
 */
export function CategoryToolBrowser({
  tools,
  accent,
  categoryName,
}: {
  tools: ToolCardData[];
  accent: string;
  categoryName: string;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const theme = useThemeAttribute();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return tools;

    return tools.filter((tool) => {
      const haystack = [
        tool.name,
        tool.summary,
        ...(tool.accepts ?? []),
        tool.outputs ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, tools]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BorderBeam
          size="pulse-outside"
          colorVariant="colorful"
          theme={theme}
          borderRadius={999}
          active={focused && !reduced}
          strength={0.75}
          className="block w-full sm:w-[26rem]"
        >
          <div className="relative">
            <Icon
              name="search"
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={`Search ${categoryName.toLowerCase()}`}
              aria-label={`Search ${categoryName}`}
              className="h-12 w-full rounded-full border border-hairline bg-surface-2/60 pl-11 pr-11 text-[0.875rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint hover:border-hairline-strong focus:border-signal"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-3 hover:text-ink"
              >
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
        </BorderBeam>

        <p
          aria-live="polite"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint"
        >
          {results.length} of {tools.length} shown
        </p>
      </div>

      {results.length > 0 ? (
        <motion.div layout className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((tool, index) => (
              <motion.div
                key={tool.slug}
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ToolCard tool={tool} accent={accent} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-hairline p-10 text-center">
          <p className="text-[0.9375rem] text-ink">No tool here matches “{query}”.</p>
          <p className="mt-2 text-[0.8125rem] text-ink-subtle">
            Try an extension such as png or mp4, or search the whole catalogue with the
            command palette.
          </p>
        </div>
      )}
    </div>
  );
}
