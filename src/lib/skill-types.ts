/**
 * The contract for the AI skills directory at /skills, a third product
 * alongside the prompt directory and the tools directory.
 *
 * A skill is a downloadable instruction pack: one or more plain text files
 * (a main instructions file plus, for some skills, supporting reference
 * documents or scripts) that someone downloads as a .zip and hands to an AI
 * assistant, an agent framework, or a teammate. Unlike a prompt, a skill is
 * not filled in and copied on this site; unlike a tool, it computes nothing
 * here. Its whole job is to be inspected (a read only file tree and content
 * viewer) and then downloaded intact.
 *
 * Every file's content is authored plainly, in the open, as part of `files`
 * below, so the exact same content that is reviewable in the browser is what
 * ships in the .zip. Nothing is generated at download time except the
 * archive container itself.
 */

import type { Eeat, PromptArticle } from "./types";

export type SkillCategorySlug =
  | "marketing-skills"
  | "writing-skills"
  | "coding-skills"
  | "business-skills"
  | "sales-skills"
  | "education-skills"
  | "design-skills"
  | "data-analysis-skills"
  | "productivity-skills"
  | "career-skills";

export type SkillCategoryIcon =
  | "megaphone"
  | "type"
  | "code"
  | "briefcase"
  | "handshake"
  | "graduation"
  | "palette"
  | "database"
  | "bolt"
  | "compass";

export interface SkillCategory {
  slug: SkillCategorySlug;
  name: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string;
  body: string[];
  icon: SkillCategoryIcon;
  accent: string;
  order: number;
}

/** A rough hint for the viewer's monospace rendering, not a syntax highlighter language id. */
export type SkillFileKind = "markdown" | "code" | "data" | "text";

export interface SkillFile {
  /** Path inside the downloaded archive, for example "SKILL.md" or "reference/checklist.md". */
  path: string;
  content: string;
  kind: SkillFileKind;
}

export interface SkillMeta {
  /** URL segment under /skills/<category>/. Must be the primary keyword, lowercased and hyphenated. */
  slug: string;
  /** H1 on the skill page. */
  title: string;
  /** Short label used in navigation, cards and the mega menu. */
  name: string;
  category: SkillCategorySlug;
  summary: string;
  seo: {
    primaryKeyword: string;
    keywords: string[];
    seoTitle: string;
    seoDescription: string;
  };
  /**
   * At least one file. By convention the first entry is the main
   * instructions file (named like a task, e.g. "SKILL.md") and any further
   * entries are supporting reference material the main file points to.
   */
  files: SkillFile[];
  eeat: Eeat;
  article: PromptArticle;
  tags: string[];
  updated: string;
  published: string;
  featured?: boolean;
}

export interface RegisteredSkill extends SkillMeta {
  href: string;
}
