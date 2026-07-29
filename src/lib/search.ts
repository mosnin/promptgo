import { categories } from "./categories";
import { tools } from "./tools";
import type { SearchDoc } from "./search-core";

/**
 * SERVER ONLY.
 *
 * This module imports the tool registry, which contains every article body on
 * the site. Importing it from a client component would add roughly a megabyte
 * to the browser bundle. Client components must import `@/lib/search-core`
 * instead, which carries the types and the scoring function with no registry
 * dependency.
 */

export { searchDocs } from "./search-core";
export type { SearchDoc, SearchResult } from "./search-core";

export function buildSearchIndex(): SearchDoc[] {
  return tools.map((tool) => ({
    s: tool.slug,
    n: tool.name,
    h: tool.href,
    c: tool.category,
    d: tool.summary,
    k: [
      ...tool.seo.keywords,
      ...tool.tags,
      ...(tool.accepts ?? []),
      tool.outputs ?? "",
      tool.title,
    ]
      .join(" ")
      .toLowerCase(),
  }));
}

/** Category records in the compact form the palette needs for its group labels. */
export const searchCategoryNames = Object.fromEntries(
  categories.map((category) => [category.slug, category.name]),
) as Record<string, string>;
