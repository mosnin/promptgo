import { toolMetas } from "@/generated/tool-metas";
import { toolCategories, toolCategoryBySlug } from "./tool-categories";
import type { RegisteredTool, ToolCategorySlug } from "./tool-types";

/** Every tool, sorted alphabetically inside its category. */
export const tools: RegisteredTool[] = toolMetas
  .map((meta) => ({ ...meta, href: `/tools/${meta.slug}` }))
  .sort((a, b) => {
    const orderA = toolCategoryBySlug.get(a.category)?.order ?? 99;
    const orderB = toolCategoryBySlug.get(b.category)?.order ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });

export const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export function getTool(slug: string): RegisteredTool | undefined {
  return toolBySlug.get(slug);
}

export function getToolsByCategory(category: ToolCategorySlug): RegisteredTool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getFeaturedTools(limit = 8): RegisteredTool[] {
  const featured = tools.filter((tool) => tool.featured);
  return (featured.length >= limit ? featured : [...featured, ...tools]).slice(0, limit);
}

/**
 * Related tools for the cluster block at the bottom of a tool page. Same
 * preference order as `getRelatedPrompts`: curated links first, then same
 * category siblings.
 */
export function getRelatedTools(tool: RegisteredTool, limit = 6): RegisteredTool[] {
  const curated = tool.article.internalLinks
    .map((link) => tools.find((candidate) => candidate.href === link.href))
    .filter((candidate): candidate is RegisteredTool => Boolean(candidate));

  const siblings = getToolsByCategory(tool.category).filter(
    (candidate) => candidate.slug !== tool.slug,
  );

  const seen = new Set<string>([tool.slug]);
  const result: RegisteredTool[] = [];

  for (const candidate of [...curated, ...siblings]) {
    if (seen.has(candidate.slug)) continue;
    seen.add(candidate.slug);
    result.push(candidate);
    if (result.length === limit) break;
  }

  return result;
}

export const toolCategoriesWithTools = toolCategories.map((category) => ({
  ...category,
  tools: getToolsByCategory(category.slug),
}));

export const totalToolCount = tools.length;
