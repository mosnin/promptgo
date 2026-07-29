import type { TaskType } from "./types";

/**
 * The task type facet.
 *
 * These are browse filters and search index fields, never URL segments. See the
 * note on `TaskType` in types.ts for why: giving each prompt a second valid
 * address would create duplicate content with no search demand to justify it.
 */
export const taskTypes: { slug: TaskType; name: string; description: string }[] = [
  {
    slug: "generate",
    name: "Generate",
    description: "Produces new material from a brief, such as copy, code or ideas that did not exist before.",
  },
  {
    slug: "rewrite",
    name: "Rewrite",
    description: "Takes text you already have and changes its tone, length, reading level or format.",
  },
  {
    slug: "summarise",
    name: "Summarise",
    description: "Compresses a long input into the parts that matter, without inventing anything new.",
  },
  {
    slug: "analyse",
    name: "Analyse",
    description: "Breaks an input apart and explains what it means, why it behaves that way or where it fails.",
  },
  {
    slug: "plan",
    name: "Plan",
    description: "Turns a goal into an ordered sequence of steps, milestones or allocations.",
  },
  {
    slug: "brainstorm",
    name: "Brainstorm",
    description: "Produces a wide spread of options deliberately, favouring range over polish.",
  },
  {
    slug: "evaluate",
    name: "Evaluate",
    description: "Scores or critiques something against stated criteria and justifies the judgement.",
  },
  {
    slug: "extract",
    name: "Extract",
    description: "Pulls structured fields out of unstructured input and returns them in a fixed shape.",
  },
  {
    slug: "translate",
    name: "Translate",
    description: "Moves content between languages, dialects or between technical and plain register.",
  },
  {
    slug: "roleplay",
    name: "Roleplay",
    description: "Puts the model in a specific persona so it answers from a defined point of view.",
  },
];

export const taskTypeBySlug = new Map(taskTypes.map((task) => [task.slug, task]));

export function getTaskType(slug: string) {
  return taskTypeBySlug.get(slug as TaskType);
}

export const taskTypeSlugs = taskTypes.map((task) => task.slug);
