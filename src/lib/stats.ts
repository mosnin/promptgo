import { categories } from "./categories";
import { getPromptsByCategory, prompts, totalPromptCount } from "./prompts";

/**
 * Figures about the catalogue, all derived from the registry at build time.
 *
 * Everything published as proof on the site comes from here, and every value is
 * countable from the source. That constraint is the point: invented traffic and
 * customer numbers are trivially disprovable, they are the sort of claim that
 * puts an advertising account at risk, and a catalogue this size does not need
 * them. What the site can honestly say is unusual is already the strongest
 * thing about it, which is that the number of bytes it receives is zero.
 */

/** Distinct task types represented in the catalogue. */
function countTaskTypes() {
  return new Set(prompts.map((prompt) => prompt.taskType)).size;
}

/** Distinct models any prompt has actually been tested against. */
function countTestedModels() {
  const models = new Set<string>();
  for (const prompt of prompts) {
    for (const model of prompt.eeat.testedOn) models.add(model.toLowerCase());
  }
  return models.size;
}

/** Total fill in variables across every prompt, a proxy for how specific they are. */
function countVariables() {
  return prompts.reduce((total, prompt) => total + prompt.prompt.variables.length, 0);
}

export const catalogueStats = {
  prompts: totalPromptCount,
  categories: categories.length,
  taskTypes: countTaskTypes(),
  testedModels: countTestedModels(),
  variables: countVariables(),
  /** Not a rounded figure. Nothing typed into a prompt panel is transmitted. */
  bytesUploaded: 0,
  serverCost: 0,
} as const;

export interface CategoryVolume {
  slug: string;
  name: string;
  accent: string;
  count: number;
  /** Share of the largest category, 0 to 1, for bar heights. */
  ratio: number;
}

/** Prompts per category, sorted heaviest first, for the distribution chart. */
export function categoryVolumes(): CategoryVolume[] {
  const rows = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    accent: category.accent,
    count: getPromptsByCategory(category.slug).length,
  }));

  const largest = Math.max(...rows.map((row) => row.count), 1);

  return rows
    .sort((a, b) => b.count - a.count)
    .map((row) => ({ ...row, ratio: row.count / largest }));
}
