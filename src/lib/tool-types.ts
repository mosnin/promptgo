/**
 * The contract for the interactive tools directory at /tools, parallel to the
 * AI prompt contract in `types.ts`.
 *
 * A prompt page has one job: fill variables into text and let you copy it. A
 * tool has to actually compute something correct, which is a different kind of
 * risk. Getting an AI prompt's phrasing slightly wrong produces an awkward
 * article. Getting a discount calculator's arithmetic wrong produces a page
 * that quietly tells someone the wrong number.
 *
 * The contract is split on purpose to make that risk checkable:
 *
 * - `fields` describes the form. It is pure data, rendered by one shared form
 *   component (`ToolForm`), so every tool gets the same accessible, tested
 *   input handling instead of 94 hand rolled forms.
 * - `compute` is a pure function: given the field values, it returns a
 *   `ToolResult`. It never touches the network, the DOM or the clock, which
 *   means it can be called directly from a test harness with known inputs and
 *   checked against a known correct answer, the same way any pure function
 *   would be tested. See `scripts/audit-tools.mjs`, which does exactly that
 *   for every tool before a build is considered clean.
 * - `ToolResult` is a small closed set of result shapes (a headline value, a
 *   table, a block of generated text, a colour swatch set, generated CSS, a QR
 *   code, a diff) rendered by one shared result view per shape. A tool that
 *   needs something genuinely bespoke (a live countdown, a randomised picker)
 *   is the rare exception, not the default, and is called out in its own
 *   meta.ts rather than becoming a second pattern silently.
 *
 * This mirrors the split this repo used before the prompt only rewrite: one
 * generated metadata module plus one generated module of the per item logic,
 * kept separate so the content can be scanned and audited without evaluating
 * arbitrary component code, and so the logic can be evaluated without needing
 * a DOM.
 */

import type { Eeat, PromptArticle } from "./types";

/**
 * Tool categories are a second taxonomy from the prompt categories, not a
 * reuse of it: "Marketing & Promo Tools" and "Marketing Prompts" are
 * genuinely different products (a UTM builder computes something; a prompt
 * generates text for a model), so they get their own slugs, their own URL
 * segment under /tools, and their own listing pages.
 */
export type ToolCategorySlug =
  | "marketing-promo-tools"
  | "sales-pricing-tools"
  | "writing-content-tools"
  | "design-visual-tools"
  | "productivity-time-tools"
  | "data-developer-tools"
  | "career-finance-tools";

export type ToolCategoryIcon =
  | "megaphone"
  | "handshake"
  | "type"
  | "palette"
  | "bolt"
  | "code"
  | "compass";

export interface ToolCategory {
  slug: ToolCategorySlug;
  name: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string;
  body: string[];
  icon: ToolCategoryIcon;
  accent: string;
  order: number;
}

interface FieldBase {
  /** Key the value is stored and read under. */
  token: string;
  label: string;
  /** Shown under the field, for anything not self-explanatory from the label. */
  help?: string;
}

export type ToolField =
  | (FieldBase & {
      kind: "number";
      placeholder?: string;
      example: number;
      min?: number;
      max?: number;
      step?: number;
      suffix?: string;
      prefix?: string;
    })
  | (FieldBase & { kind: "text"; placeholder?: string; example: string })
  | (FieldBase & { kind: "textarea"; placeholder?: string; example: string; rows?: number })
  | (FieldBase & { kind: "select"; options: { value: string; label: string }[]; example: string })
  | (FieldBase & { kind: "date"; example: string })
  | (FieldBase & { kind: "checkbox"; example: boolean })
  | (FieldBase & {
      kind: "list";
      /** Singular noun for one row, used on the add/remove controls. */
      itemLabel: string;
      fields: ToolField[];
      example: Record<string, unknown>[];
      min?: number;
      max?: number;
    });

/** Field values keyed by token. Numbers, strings, booleans or nested rows for a `list` field. */
export type ToolInputs = Record<string, unknown>;

/**
 * The closed set of result shapes. Adding a new one is a deliberate decision
 * (a new shared renderer to build and audit), not something a single tool
 * should reach for on its own.
 */
export type ToolResult =
  | {
      kind: "value";
      headline: { label: string; value: string };
      secondary?: { label: string; value: string }[];
      notes?: string[];
      warning?: string;
    }
  | { kind: "table"; caption: string; columns: string[]; rows: (string | number)[][]; notes?: string[] }
  | { kind: "text"; label: string; value: string; monospace?: boolean; notes?: string[] }
  | { kind: "list"; label: string; items: string[]; notes?: string[] }
  | { kind: "swatches"; label: string; swatches: { hex: string; label?: string }[]; notes?: string[] }
  | { kind: "css"; label: string; css: string; previewStyle: Record<string, string>; notes?: string[] }
  | { kind: "qr"; label: string; value: string; size?: number; notes?: string[] }
  | { kind: "diff"; label: string; before: string; after: string; notes?: string[] }
  | { kind: "error"; message: string };

/** A tool's actual logic. Pure: same inputs always produce the same result. */
export type ComputeFn = (inputs: ToolInputs) => ToolResult;

/**
 * A known-correct case for a tool's `compute()`, co-located in the same
 * `compute.ts` file as a named `selfTests` export. `scripts/audit-tools.mjs`
 * runs every one of these before a build is considered clean, which is what
 * makes the trust block's "built on / verified" claim actually true rather
 * than a design intention. `check` gets the real `ToolResult` and returns
 * true only when it is actually correct, not merely present: a check that
 * only confirms `result.kind === "value"` would pass a tool that computes
 * the wrong number just as happily as a correct one.
 */
export interface ToolSelfTest {
  name: string;
  inputs: ToolInputs;
  check: (result: ToolResult) => boolean;
}

export interface ToolMeta {
  /** URL segment under /tools. Must be the primary keyword, lowercased and hyphenated. */
  slug: string;
  /** H1 on the tool page. */
  title: string;
  /** Short label used in navigation, cards and the mega menu. */
  name: string;
  category: ToolCategorySlug;
  summary: string;
  seo: {
    primaryKeyword: string;
    keywords: string[];
    seoTitle: string;
    seoDescription: string;
  };
  fields: ToolField[];
  /**
   * Reuses the prompt trust block shape, with one field repurposed: `testedOn`
   * holds the standard, formula or browser API the tool is actually built on
   * (e.g. "WCAG 2.1 contrast formula", "SubtleCrypto"), not a list of AI
   * models, since a tool computes rather than prompts one. Unlike a prompt's
   * "written for" claim, this one is mechanically checkable: `scripts/
   * audit-tools.mjs` runs each tool's `compute()` against known-correct test
   * cases before a build is considered clean, so `testingNote` can describe
   * what was actually verified rather than a design intention.
   */
  eeat: Eeat;
  /**
   * The same shape a prompt's article uses (intro, sections, howTo, faq,
   * internal/external links, an optional table), reused as-is rather than
   * redeclared, so every shared article component (`ArticleView`,
   * `FaqAccordion`, `TableOfContents`, `HowToSteps`) renders a tool's article
   * with no changes at all.
   */
  article: PromptArticle;
  tags: string[];
  updated: string;
  published: string;
  featured?: boolean;
}

export interface RegisteredTool extends ToolMeta {
  href: string;
}
