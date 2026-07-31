import type { RegisteredTool, ToolCategorySlug } from "./tool-types";

/**
 * The fields a tool card actually renders, projected server side for the same
 * reason `PromptCardData` exists: a card grid is a client component, and a
 * `RegisteredTool` carries its whole article, form field set and compute
 * reference along with it.
 */
export interface ToolCardData {
  slug: string;
  name: string;
  href: string;
  summary: string;
  category: ToolCategorySlug;
  /** Rendered as the card's specimen line, e.g. "4 inputs". */
  inputCount: number;
}

export function toToolCardData(tool: RegisteredTool): ToolCardData {
  return {
    slug: tool.slug,
    name: tool.name,
    href: tool.href,
    summary: tool.summary,
    category: tool.category,
    inputCount: tool.fields.length,
  };
}
