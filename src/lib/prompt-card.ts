import type { CategorySlug, RegisteredPrompt, TaskType } from "./types";

/**
 * The fields a prompt card actually renders.
 *
 * Deliberately not RegisteredPrompt. PromptCard is a client component, so
 * whatever it receives is serialised into the payload for every card on the
 * page, and a RegisteredPrompt carries the prompt's entire long form article.
 * Twelve cards on a category page would ship twelve full articles to the
 * browser in order to render twelve titles.
 *
 * This lives in lib rather than beside the component because the projection has
 * to run on the server. A "use client" module cannot export a function that
 * server components call.
 */
export interface PromptCardData {
  slug: string;
  name: string;
  href: string;
  summary: string;
  category: CategorySlug;
  taskType: TaskType;
  /** First line of the prompt, used as the card's specimen line. */
  opening: string;
  variableCount: number;
}

/**
 * The specimen line shown on the card.
 *
 * The first sentence of a prompt is the instruction that defines it, so it is
 * both the most informative thing to show and guaranteed to differ between
 * prompts. That second property is what makes a grid of these scannable
 * instead of a wall of near identical cards.
 */
function opening(text: string): string {
  const firstLine = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith("#"));

  const sentence = (firstLine ?? text).split(/(?<=[.?!])\s/)[0] ?? "";
  const cleaned = sentence.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, token: string) =>
    token.toLowerCase().replace(/_/g, " "),
  );

  return cleaned.length > 110 ? `${cleaned.slice(0, 108).trimEnd()}...` : cleaned;
}

export function toCardData(prompt: RegisteredPrompt): PromptCardData {
  return {
    slug: prompt.slug,
    name: prompt.name,
    href: prompt.href,
    summary: prompt.summary,
    category: prompt.category,
    taskType: prompt.taskType,
    opening: opening(prompt.prompt.text),
    variableCount: prompt.prompt.variables.length,
  };
}
