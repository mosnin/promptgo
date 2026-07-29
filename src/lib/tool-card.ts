import type { RegisteredTool } from "./types";

/**
 * The fields a tool card actually renders.
 *
 * Deliberately not RegisteredTool. ToolCard is a client component, so whatever
 * it receives is serialised into the payload for every card on the page, and a
 * RegisteredTool carries the tool's entire long form article. Twelve cards on a
 * category page would ship twelve full articles to the browser in order to
 * render twelve titles.
 *
 * This lives in lib rather than beside the component because the projection has
 * to run on the server. A "use client" module cannot export a function that
 * server components call.
 */
export interface ToolCardData {
  slug: string;
  name: string;
  href: string;
  summary: string;
  accepts?: string[];
  outputs?: string;
}

export function toCardData(tool: RegisteredTool): ToolCardData {
  return {
    slug: tool.slug,
    name: tool.name,
    href: tool.href,
    summary: tool.summary,
    accepts: tool.accepts,
    outputs: tool.outputs,
  };
}
