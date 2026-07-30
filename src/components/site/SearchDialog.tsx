"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ease } from "@/components/motion/tokens";
// Imports the registry free half of the search module on purpose. Pulling from
// "@/lib/search" here would drag every article body into the client bundle.
import { searchDocs, type SearchDoc, type SearchResult } from "@/lib/search-core";
import { cn } from "@/lib/cn";
import { track } from "@/lib/track";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  categoryNames: Record<string, string>;
}

/**
 * Command palette. The index is fetched once, lazily, the first time the dialog
 * opens, so the prompt catalogue costs nothing until a user actually searches.
 */
export function SearchDialog({ open, onClose, categoryNames }: SearchDialogProps) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || docs) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: SearchDoc[]) => {
        if (!cancelled) setDocs(data);
      })
      .catch(() => {
        if (!cancelled) setDocs([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, docs]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const results = useMemo<SearchResult[]>(
    () => (docs ? searchDocs(docs, query, 24) : []),
    [docs, query],
  );

  useEffect(() => setCursor(0), [query]);

  const go = useCallback(
    (href: string) => {
      track("search_result_selected", { query, destination: href });
      onClose();
      setQuery("");
      router.push(href);
    },
    [onClose, query, router],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor((value) => Math.max(value - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const target = results[cursor];
        if (target) go(target.h);
        else if (query.trim()) {
          onClose();
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
      } else if (event.key === "Escape") {
        onClose();
      }
    },
    [cursor, go, onClose, query, results, router],
  );

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-[color-mix(in_oklch,var(--color-canvas)_72%,transparent)] backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search prompts"
            initial={{ opacity: 0, y: reduced ? 0 : -14, scale: reduced ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: 0.28, ease: ease.out }}
            className="lit relative w-full max-w-2xl overflow-hidden rounded-xl border border-hairline bg-[color-mix(in_oklch,var(--color-surface)_92%,transparent)] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4">
              <Icon name="search" size={17} className="shrink-0 text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search 148 prompts. Try cold email, sql query, lesson plan"
                className="h-14 w-full bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-faint"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden shrink-0 rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-faint sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[min(26rem,52vh)] overflow-y-auto p-2">
              {query.trim().length === 0 && (
                <p className="px-3 py-8 text-center text-[0.8125rem] text-ink-faint">
                  Start typing to search every prompt by name, format or keyword.
                </p>
              )}

              {query.trim().length > 0 && docs === null && (
                <p className="px-3 py-8 text-center text-[0.8125rem] text-ink-faint">
                  Loading the prompt index.
                </p>
              )}

              {query.trim().length > 0 && docs !== null && results.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <p className="text-[0.8125rem] text-ink-muted">
                    No prompts match {`"${query}"`}.
                  </p>
                  <Link
                    href="/explore"
                    onClick={onClose}
                    className="mt-2 inline-block text-[0.8125rem] font-medium text-signal-bright"
                  >
                    Browse all categories
                  </Link>
                </div>
              )}

              {results.map((result, index) => (
                <button
                  key={result.s}
                  data-index={index}
                  type="button"
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => go(result.h)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors duration-150",
                    index === cursor ? "bg-surface-2" : "hover:bg-surface-2/60",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-surface-2 text-ink-subtle">
                    <Icon name="bolt" size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.875rem] font-medium text-ink">
                      {result.n}
                    </span>
                    <span className="block truncate text-[0.75rem] text-ink-faint">
                      {result.d}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint sm:block">
                    {categoryNames[result.c] ?? result.c}
                  </span>
                </button>
              ))}
            </div>

            {results.length > 0 && (
              <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
                <span>
                  {results.length} result{results.length === 1 ? "" : "s"}
                </span>
                <span className="hidden sm:block">Arrow keys to navigate. Enter to open.</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
