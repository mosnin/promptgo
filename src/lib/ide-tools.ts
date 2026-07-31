import { ideToolMetas } from "@/generated/ide-tool-metas";
import { ideToolCategories, ideToolCategoryBySlug } from "./ide-tool-categories";
import type { RegisteredIdeTool, IdeToolCategorySlug } from "./ide-tool-types";

/** Every builder tool, sorted alphabetically inside its category. */
export const ideTools: RegisteredIdeTool[] = ideToolMetas
  .map((meta) => ({ ...meta, href: `/ide-tools/${meta.category}/${meta.slug}` }))
  .sort((a, b) => {
    const orderA = ideToolCategoryBySlug.get(a.category)?.order ?? 99;
    const orderB = ideToolCategoryBySlug.get(b.category)?.order ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

export const ideToolBySlug = new Map(ideTools.map((tool) => [tool.slug, tool]));

export function getIdeTool(slug: string): RegisteredIdeTool | undefined {
  return ideToolBySlug.get(slug);
}

export function getIdeToolsByCategory(category: IdeToolCategorySlug): RegisteredIdeTool[] {
  return ideTools.filter((tool) => tool.category === category);
}

export function getFeaturedIdeTools(limit = 8): RegisteredIdeTool[] {
  const featured = ideTools.filter((tool) => tool.featured);
  return (featured.length >= limit ? featured : [...featured, ...ideTools]).slice(0, limit);
}

/**
 * Related builder tools for the cluster block at the bottom of a tool page.
 * Same preference order as `getRelatedSkills`: curated links first, then
 * same category siblings.
 */
export function getRelatedIdeTools(tool: RegisteredIdeTool, limit = 6): RegisteredIdeTool[] {
  const curated = tool.article.internalLinks
    .map((link) => ideTools.find((candidate) => candidate.href === link.href))
    .filter((candidate): candidate is RegisteredIdeTool => Boolean(candidate));

  const siblings = getIdeToolsByCategory(tool.category).filter(
    (candidate) => candidate.slug !== tool.slug,
  );

  const seen = new Set<string>([tool.slug]);
  const result: RegisteredIdeTool[] = [];

  for (const candidate of [...curated, ...siblings]) {
    if (seen.has(candidate.slug)) continue;
    seen.add(candidate.slug);
    result.push(candidate);
    if (result.length === limit) break;
  }

  return result;
}

export const ideToolCategoriesWithTools = ideToolCategories.map((category) => ({
  ...category,
  tools: getIdeToolsByCategory(category.slug),
}));

export const totalIdeToolCount = ideTools.length;
