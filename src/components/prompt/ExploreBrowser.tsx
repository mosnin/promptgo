"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { BorderBeam } from "border-beam";
import { Icon } from "@/components/ui/Icon";
import { PromptCard } from "./PromptCard";
import type { PromptCardData } from "@/lib/prompt-card";
import type { CategorySlug, TaskType } from "@/lib/types";
import { taskTypes } from "@/lib/task-types";
import { cn } from "@/lib/cn";
import { useThemeAttribute } from "@/lib/use-theme";

export interface ExploreCategoryOption {
  slug: CategorySlug;
  name: string;
  accent: string;
  icon: Parameters<typeof Icon>[0]["name"];
}

/**
 * Catalogue wide filter, sitting above the per category sections on /explore.
 *
 * The category page browser filters inside one job function. This filters
 * across all of them at once, by category and by task type together, which is
 * the thing a directory this size actually needs: someone who wants every
 * "rewrite" prompt regardless of which job it belongs to has had no way to
 * ask that question before, short of opening ten category pages in turn.
 *
 * Both facets are multi select rather than single, because the two questions
 * "which job" and "which kind of task" are genuinely independent, and a
 * reader narrowing to two categories while also narrowing to one task type is
 * a normal thing to want on a catalogue with this much surface area.
 *
 * This sits above the existing static category sections rather than
 * replacing them. Nothing crawlable is removed: every prompt is still listed,
 * grouped, and linked in the plain HTML below for a client with no
 * JavaScript, and this bar is additive progressive enhancement for the
 * common case of a reader who already knows roughly what they want.
 */
export function ExploreBrowser({
  prompts,
  categories,
}: {
  prompts: PromptCardData[];
  categories: ExploreCategoryOption[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<CategorySlug>>(new Set());
  const [activeTasks, setActiveTasks] = useState<Set<TaskType>>(new Set());
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();
  const theme = useThemeAttribute();

  const availableTasks = useMemo(() => {
    const present = new Set(prompts.map((prompt) => prompt.taskType));
    return taskTypes.filter((entry) => present.has(entry.slug));
  }, [prompts]);

  const accentBySlug = useMemo(
    () => new Map(categories.map((category) => [category.slug, category.accent])),
    [categories],
  );

  const filtersActive = query.trim().length > 0 || activeCategories.size > 0 || activeTasks.size > 0;

  const results = useMemo(() => {
    if (!filtersActive) return [];
    const needle = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      if (activeCategories.size > 0 && !activeCategories.has(prompt.category)) return false;
      if (activeTasks.size > 0 && !activeTasks.has(prompt.taskType)) return false;
      if (!needle) return true;
      const haystack = [prompt.name, prompt.summary, prompt.taskType, prompt.opening]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, activeCategories, activeTasks, prompts, filtersActive]);

  function toggle<T>(set: Set<T>, value: T, setter: (next: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  function clearAll() {
    setQuery("");
    setActiveCategories(new Set());
    setActiveTasks(new Set());
  }

  return (
    <div className="mb-14">
      <div className="flex flex-wrap items-center gap-3">
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
              placeholder={`Search all ${prompts.length} prompts`}
              aria-label="Search every prompt"
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

        {filtersActive && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-[0.8125rem] text-ink-faint transition-colors duration-200 hover:text-ink"
          >
            <Icon name="close" size={12} />
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Category
        </span>
        {categories.map((category) => {
          const isActive = activeCategories.has(category.slug);
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => toggle(activeCategories, category.slug, setActiveCategories)}
              aria-pressed={isActive}
              style={isActive ? { borderColor: category.accent, color: category.accent } : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.75rem] transition-colors duration-200",
                isActive ? "bg-transparent" : "border-hairline text-ink-faint hover:text-ink-muted",
              )}
            >
              <Icon name={category.icon} size={11} />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Task
        </span>
        {availableTasks.map((entry) => {
          const isActive = activeTasks.has(entry.slug);
          return (
            <button
              key={entry.slug}
              type="button"
              onClick={() => toggle(activeTasks, entry.slug, setActiveTasks)}
              aria-pressed={isActive}
              title={entry.description}
              className={cn(
                "rounded-full border px-3 py-1 text-[0.75rem] transition-colors duration-200",
                isActive
                  ? "border-transparent bg-surface-3 text-ink"
                  : "border-hairline text-ink-faint hover:text-ink-muted",
              )}
            >
              {entry.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {filtersActive && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              aria-live="polite"
              className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint"
            >
              {results.length} of {prompts.length} match
            </p>

            {results.length > 0 ? (
              <motion.div layout className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                      <PromptCard
                        prompt={prompt}
                        accent={accentBySlug.get(prompt.category)}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-hairline p-8 text-center">
                <p className="text-[0.9375rem] text-ink">Nothing matches that combination.</p>
                <p className="mt-2 text-[0.8125rem] text-ink-subtle">
                  Try clearing a category or task filter, or browse the full list below instead.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
