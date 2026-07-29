"use client";

import { BorderBeam } from "border-beam";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PromptCard } from "./PromptCard";
import type { PromptCardData } from "@/lib/prompt-card";
import { taskTypes } from "@/lib/task-types";
import { cn } from "@/lib/cn";
import { useThemeAttribute } from "@/lib/use-theme";

/**
 * Search, task type facet and grid for a single category.
 *
 * This is where the second half of the hybrid taxonomy actually lands. Job
 * function is the URL segment and the only indexable path, so task type has to
 * earn its keep as a browse filter instead. Someone on the marketing page who
 * wants a rewriting prompt rather than a generating one can narrow to it here,
 * and no second URL is minted for the narrowed view, which is the whole reason
 * the facet is a filter rather than a route.
 *
 * The text filter runs over name, summary, task type and the prompt's opening
 * instruction. Including the opening line matters: people search for the thing
 * the prompt makes the model do, which is often absent from a short name.
 *
 * Filtering is local and synchronous over a list of at most a few dozen, so
 * there is nothing to debounce and no loading state to design. Results animate
 * out and in by layout rather than being swapped, so a card that survives the
 * query moves to its new position instead of disappearing and reappearing.
 */
export function CategoryPromptBrowser({
  prompts,
  accent,
  categoryName,
}: {
  prompts: PromptCardData[];
  accent: string;
  categoryName: string;
}) {
  const [query, setQuery] = useState("");
  const [task, setTask] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const theme = useThemeAttribute();

  /** Only offer facets that this category actually contains. */
  const availableTasks = useMemo(() => {
    const present = new Set(prompts.map((prompt) => prompt.taskType));
    return taskTypes.filter((entry) => present.has(entry.slug));
  }, [prompts]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const byTask = task ? prompts.filter((prompt) => prompt.taskType === task) : prompts;
    if (!needle) return byTask;

    return byTask.filter((prompt) => {
      const haystack = [
        prompt.name,
        prompt.summary,
        prompt.taskType,
        prompt.opening,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, task, prompts]);

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
          {results.length} of {prompts.length} shown
        </p>
      </div>

      {availableTasks.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            Task
          </span>
          <button
            type="button"
            onClick={() => setTask(null)}
            aria-pressed={task === null}
            className={cn(
              "rounded-full border px-3 py-1 text-[0.75rem] transition-colors duration-200",
              task === null
                ? "border-transparent bg-surface-3 text-ink"
                : "border-hairline text-ink-faint hover:text-ink-muted",
            )}
          >
            All
          </button>
          {availableTasks.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              onClick={() => setTask(task === entry.slug ? null : entry.slug)}
              aria-pressed={task === entry.slug}
              title={entry.description}
              style={task === entry.slug ? { borderColor: accent, color: accent } : undefined}
              className={cn(
                "rounded-full border px-3 py-1 text-[0.75rem] transition-colors duration-200",
                task === entry.slug
                  ? "bg-transparent"
                  : "border-hairline text-ink-faint hover:text-ink-muted",
              )}
            >
              {entry.name}
            </button>
          ))}
        </div>
      )}

      {results.length > 0 ? (
        <motion.div layout className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((prompt, index) => (
              <motion.div
                key={prompt.slug}
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <PromptCard prompt={prompt} accent={accent} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-hairline p-10 text-center">
          <p className="text-[0.9375rem] text-ink">
            Nothing in {categoryName.toLowerCase()} matches that.
          </p>
          <p className="mt-2 text-[0.8125rem] text-ink-subtle">
            Clear the task filter, try the word you would use for the job itself, or search
            every category with the command palette.
          </p>
        </div>
      )}
    </div>
  );
}
