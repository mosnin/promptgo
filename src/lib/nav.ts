import { categories } from "./categories";
import { getToolsByCategory, totalToolCount } from "./tools";
import type { CategoryIcon } from "./types";

/**
 * Compact navigation payload. Built in a server component and passed to the
 * client header as plain props, which keeps the full tool registry, including
 * every long form article, out of the client bundle.
 */
export interface NavTool {
  name: string;
  href: string;
  summary: string;
}

export interface NavCategory {
  slug: string;
  name: string;
  href: string;
  icon: CategoryIcon;
  accent: string;
  intro: string;
  count: number;
  /** The first eight tools, shown inside the mega menu panel. */
  tools: NavTool[];
}

export interface NavData {
  categories: NavCategory[];
  totalTools: number;
}

export function buildNavData(): NavData {
  return {
    totalTools: totalToolCount,
    categories: categories.map((category) => {
      const categoryTools = getToolsByCategory(category.slug);
      return {
        slug: category.slug,
        name: category.name,
        href: `/${category.slug}`,
        icon: category.icon,
        accent: category.accent,
        intro: category.intro.split(". ")[0] + ".",
        count: categoryTools.length,
        tools: categoryTools.slice(0, 8).map((tool) => ({
          name: tool.name,
          href: tool.href,
          summary: tool.summary,
        })),
      };
    }),
  };
}
