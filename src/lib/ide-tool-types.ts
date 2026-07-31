/**
 * The contract for the AI builder tools directory at /ide-tools, a fourth
 * product alongside the prompt directory, the tools directory and the skills
 * directory.
 *
 * A skill (see `skill-types.ts`) is downloaded and inspected but never
 * changed on this site. A builder tool is the opposite: it opens a starter
 * set of files in an in-browser, multi file editor (see
 * `components/ide/IdeEditor.tsx`) so a visitor can write, import, edit and
 * re-export exactly the kind of multi file artefact a skill or an agent
 * needs, before ever leaving the page. That covers three related jobs the
 * original request named directly: building a new skill, refining an
 * existing one (import its .zip, edit the files, download the result), and
 * scaffolding MCP server or agent starter files from a blank template.
 *
 * Every file's starting content is authored plainly as part of `files`
 * below, the same discipline `skill-types.ts` documents: nothing is
 * generated at load time except handing that content to the editor.
 */

import type { Eeat, PromptArticle } from "./types";

export type IdeToolCategorySlug =
  | "skill-authoring-tools"
  | "mcp-server-tools"
  | "agent-tools"
  | "agent-starter-templates"
  | "tool-definition-tools";

export type IdeToolCategoryIcon = "layers" | "globe" | "spark" | "bolt" | "code";

export interface IdeToolCategory {
  slug: IdeToolCategorySlug;
  name: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string;
  body: string[];
  icon: IdeToolCategoryIcon;
  accent: string;
  order: number;
}

/** A rough hint for the editor's monospace rendering, not a syntax highlighter language id. */
export type IdeToolFileKind = "markdown" | "code" | "data" | "text" | "json";

export interface IdeToolFile {
  /** Path inside the editor and the downloaded archive, for example "SKILL.md" or "src/server.py". */
  path: string;
  content: string;
  kind: IdeToolFileKind;
}

export interface IdeToolMeta {
  /** URL segment under /ide-tools/<category>/. Must be the primary keyword, lowercased and hyphenated. */
  slug: string;
  /** H1 on the tool page. */
  title: string;
  /** Short label used in navigation, cards and the mega menu. */
  name: string;
  category: IdeToolCategorySlug;
  summary: string;
  seo: {
    primaryKeyword: string;
    keywords: string[];
    seoTitle: string;
    seoDescription: string;
  };
  /**
   * The starter files loaded into the editor when the page opens. At least
   * one file. By convention the first entry is the main file a visitor is
   * most likely to edit first.
   */
  files: IdeToolFile[];
  eeat: Eeat;
  article: PromptArticle;
  tags: string[];
  updated: string;
  published: string;
  featured?: boolean;
}

export interface RegisteredIdeTool extends IdeToolMeta {
  href: string;
}
