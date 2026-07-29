import { promptMetas } from "@/generated/prompt-metas";
import { categories, categoryBySlug } from "./categories";
import type { CategorySlug, RegisteredPrompt, TaskType } from "./types";

/** Every prompt, sorted alphabetically inside its category. */
export const prompts: RegisteredPrompt[] = promptMetas
  .map((meta) => ({ ...meta, href: `/${meta.category}/${meta.slug}` }))
  .sort((a, b) => {
    const orderA = categoryBySlug.get(a.category)?.order ?? 99;
    const orderB = categoryBySlug.get(b.category)?.order ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

export const promptBySlug = new Map(prompts.map((prompt) => [prompt.slug, prompt]));

export function getPrompt(slug: string): RegisteredPrompt | undefined {
  return promptBySlug.get(slug);
}

export function getPromptsByCategory(category: CategorySlug): RegisteredPrompt[] {
  return prompts.filter((prompt) => prompt.category === category);
}

export function getPromptsByTaskType(taskType: TaskType): RegisteredPrompt[] {
  return prompts.filter((prompt) => prompt.taskType === taskType);
}

export function getFeaturedPrompts(limit = 8): RegisteredPrompt[] {
  const featured = prompts.filter((prompt) => prompt.featured);
  return (featured.length >= limit ? featured : [...featured, ...prompts]).slice(0, limit);
}

/**
 * Related prompts for the cluster block at the bottom of a prompt page.
 *
 * Prefers the curated internal links from the article, then fills any remaining
 * slots with same category siblings so the block is never sparse. Siblings
 * sharing a task type are preferred over the rest of the category, since a
 * reader who wanted a rewriting prompt usually wants another one.
 */
export function getRelatedPrompts(
  prompt: RegisteredPrompt,
  limit = 6,
): RegisteredPrompt[] {
  const curated = prompt.article.internalLinks
    .map((link) => prompts.find((candidate) => candidate.href === link.href))
    .filter((candidate): candidate is RegisteredPrompt => Boolean(candidate));

  const siblings = getPromptsByCategory(prompt.category)
    .filter((candidate) => candidate.slug !== prompt.slug)
    .sort((a, b) => {
      const scoreA = a.taskType === prompt.taskType ? 0 : 1;
      const scoreB = b.taskType === prompt.taskType ? 0 : 1;
      return scoreA - scoreB;
    });

  const seen = new Set<string>([prompt.slug]);
  const result: RegisteredPrompt[] = [];

  for (const candidate of [...curated, ...siblings]) {
    if (seen.has(candidate.slug)) continue;
    seen.add(candidate.slug);
    result.push(candidate);
    if (result.length === limit) break;
  }

  return result;
}

export const categoriesWithPrompts = categories.map((category) => ({
  ...category,
  prompts: getPromptsByCategory(category.slug),
}));

export const totalPromptCount = prompts.length;
