import { categories } from "./categories";
import { toolCategories } from "./tool-categories";
import { prompts } from "./prompts";
import { tools } from "./tools";
import type { SearchDoc } from "./search-core";

/**
 * SERVER ONLY.
 *
 * This module imports the prompt and tool registries, which contain every
 * article body on the site. Importing it from a client component would add
 * roughly a megabyte to the browser bundle. Client components must import
 * `@/lib/search-core` instead, which carries the types and the scoring
 * function with no registry dependency.
 */

export { searchDocs } from "./search-core";
export type { SearchDoc, SearchResult } from "./search-core";

export function buildSearchIndex(): SearchDoc[] {
  const promptDocs: SearchDoc[] = prompts.map((prompt) => ({
    s: prompt.slug,
    n: prompt.name,
    h: prompt.href,
    c: prompt.category,
    d: prompt.summary,
    k: [
      ...prompt.seo.keywords,
      ...prompt.tags,
      prompt.taskType,
      prompt.title,
    ]
      .join(" ")
      .toLowerCase(),
  }));

  const toolDocs: SearchDoc[] = tools.map((tool) => ({
    s: tool.slug,
    n: tool.name,
    h: tool.href,
    c: tool.category,
    d: tool.summary,
    k: [...tool.seo.keywords, ...tool.tags, "tool", tool.title].join(" ").toLowerCase(),
  }));

  return [...promptDocs, ...toolDocs];
}

/** Category records in the compact form the palette needs for its group labels. */
export const searchCategoryNames = Object.fromEntries(
  [...categories, ...toolCategories].map((category) => [category.slug, category.name]),
) as Record<string, string>;
