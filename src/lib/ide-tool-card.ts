import type { RegisteredIdeTool, IdeToolCategorySlug } from "./ide-tool-types";

/**
 * The fields a builder tool card actually renders, projected server side for
 * the same reason `SkillCardData` exists: a card grid is a client component,
 * and a `RegisteredIdeTool` carries its whole article and every starter
 * file's full content along with it.
 */
export interface IdeToolCardData {
  slug: string;
  name: string;
  href: string;
  summary: string;
  category: IdeToolCategorySlug;
  /** Rendered as the card's specimen line, e.g. "4 starter files". */
  fileCount: number;
}

export function toIdeToolCardData(tool: RegisteredIdeTool): IdeToolCardData {
  return {
    slug: tool.slug,
    name: tool.name,
    href: tool.href,
    summary: tool.summary,
    category: tool.category,
    fileCount: tool.files.length,
  };
}
