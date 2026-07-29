import { categories } from "./categories";
import { getPromptsByCategory, totalPromptCount } from "./prompts";
import type { CategoryIcon } from "./types";

/**
 * Compact navigation payload. Built in a server component and passed to the
 * client header as plain props, which keeps the full prompt registry, including
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
  /** The first eight prompts, shown inside the mega menu panel. */
  prompts: NavTool[];
}

export interface NavData {
  categories: NavCategory[];
  totalTools: number;
}

export function buildNavData(): NavData {
  return {
    totalTools: totalPromptCount,
    categories: categories.map((category) => {
      const categoryTools = getPromptsByCategory(category.slug);
      return {
        slug: category.slug,
        name: category.name,
        href: `/${category.slug}`,
        icon: category.icon,
        accent: category.accent,
        intro: category.intro.split(". ")[0] + ".",
        count: categoryTools.length,
        prompts: categoryTools.slice(0, 8).map((prompt) => ({
          name: prompt.name,
          href: prompt.href,
          summary: prompt.summary,
        })),
      };
    }),
  };
}
