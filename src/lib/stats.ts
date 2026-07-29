import { categories } from "./categories";
import { getToolsByCategory, tools, totalToolCount } from "./tools";

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

/** Distinct file extensions the catalogue can read. */
function countInputFormats() {
  const formats = new Set<string>();
  for (const tool of tools) {
    for (const extension of tool.accepts ?? []) {
      formats.add(extension.replace(/^\./, "").toLowerCase());
    }
  }
  return formats.size;
}

/** Distinct formats the catalogue can produce. */
function countOutputFormats() {
  const formats = new Set<string>();
  for (const tool of tools) {
    if (tool.outputs) formats.add(tool.outputs.replace(/^\./, "").toLowerCase());
  }
  return formats.size;
}

/** Tools that declare a format in and a different format out. */
function countConversionPaths() {
  return tools.filter((tool) => (tool.accepts?.length ?? 0) > 0 && !!tool.outputs).length;
}

export const catalogueStats = {
  tools: totalToolCount,
  categories: categories.length,
  inputFormats: countInputFormats(),
  outputFormats: countOutputFormats(),
  conversionPaths: countConversionPaths(),
  /** Not a rounded figure. The tools have no upload path at all. */
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

/** Tools per category, sorted heaviest first, for the distribution chart. */
export function categoryVolumes(): CategoryVolume[] {
  const rows = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    accent: category.accent,
    count: getToolsByCategory(category.slug).length,
  }));

  const largest = Math.max(...rows.map((row) => row.count), 1);

  return rows
    .sort((a, b) => b.count - a.count)
    .map((row) => ({ ...row, ratio: row.count / largest }));
}
