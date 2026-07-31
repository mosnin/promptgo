/**
 * The single source of truth for prompt content. Every prompt folder exports a
 * `PromptMeta` object shaped exactly like this, which lets the rendering layer,
 * the sitemap, the search index and the SEO auditor all share one contract.
 */

/**
 * Categories are job functions, not task types.
 *
 * This is the one taxonomy decision that has to be made once and never
 * revisited, because the category slug is the first URL segment and therefore
 * baked into every canonical. Job function wins over task type for two
 * reasons: it matches how people actually search ("ai prompts for marketing"
 * is a real query, "ai prompts for summarising" is not), and it produces
 * categories that do not overlap, so no two category pages compete for the
 * same term.
 *
 * Task type still matters for browsing, so it exists as a facet on every
 * prompt rather than as a second URL segment. See `TaskType`.
 */
export type CategorySlug =
  | "marketing-prompts"
  | "writing-prompts"
  | "coding-prompts"
  | "business-prompts"
  | "sales-prompts"
  | "education-prompts"
  | "design-prompts"
  | "data-analysis-prompts"
  | "productivity-prompts"
  | "career-prompts"
  | "promo-prompts";

/**
 * The second axis of the hybrid taxonomy: what the prompt actually does to the
 * input, independent of who is asking.
 *
 * Deliberately NOT a URL segment. Faceting by task type in the path would give
 * every prompt two valid addresses (/marketing-prompts/x and /rewrite/x) and
 * hand Google a duplicate content problem for no gain, since nobody searches
 * "rewrite prompts" with commercial intent. It is a filter on the browse pages
 * and a field in the search index, which is where the value actually is.
 */
export type TaskType =
  | "generate"
  | "rewrite"
  | "summarise"
  | "analyse"
  | "plan"
  | "brainstorm"
  | "evaluate"
  | "extract"
  | "translate"
  | "roleplay";

export interface Category {
  slug: CategorySlug;
  /** Plural display name used in navigation. */
  name: string;
  /** H1 for the category page. Contains the exact match primary keyword. */
  title: string;
  /** <title> tag for the category page. */
  seoTitle: string;
  /** Meta description for the category page, 135 to 165 characters. */
  seoDescription: string;
  /** Exact match keyword shared by slug, title, seoTitle and seoDescription. */
  primaryKeyword: string;
  keywords: string[];
  /** One or two sentence lede rendered under the category H1. */
  intro: string;
  /** Longer supporting copy that gives the category page indexable substance. */
  body: string[];
  icon: CategoryIcon;
  /** Tailwind friendly accent used for gradients and hover states. */
  accent: string;
  order: number;
}

export type CategoryIcon =
  | "megaphone"
  | "type"
  | "code"
  | "briefcase"
  | "handshake"
  | "graduation"
  | "palette"
  | "database"
  | "bolt"
  | "compass"
  | "spark";

export interface FaqItem {
  question: string;
  answer: string;
}

/** A curated link to another page on this site. Builds the topic cluster. */
export interface InternalLink {
  /** Root relative path, for example /marketing-prompts/cold-email-prompt */
  href: string;
  /** Anchor text. Should read as a natural keyword phrase. */
  label: string;
  /** One sentence of context rendered beside the link. */
  description: string;
}

/** A citation to a high authority third party source. */
export interface ExternalLink {
  href: string;
  label: string;
  /** Why the source is authoritative, shown as supporting context. */
  description: string;
}

export interface ArticleSection {
  /** Rendered as an h2. Should contain a secondary keyword where natural. */
  heading: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** Optional bulleted list rendered after the paragraphs. */
  list?: string[];
  /** Optional h3 sub sections for deeper topical coverage. */
  subsections?: { heading: string; body: string[] }[];
}

export interface HowTo {
  /** For example "How to use the cold email prompt" */
  name: string;
  steps: { name: string; text: string }[];
}

/**
 * Experience, Expertise, Authoritativeness and Trust signals.
 *
 * Google's quality raters look for evidence that a page was produced by
 * someone who has actually done the thing. For a prompt directory the honest
 * version of that is: state who tested the prompt, on which models, and what
 * they observed. Every field here renders visibly on the page, because a trust
 * signal that only exists in a meta tag is not a trust signal.
 */
export interface Eeat {
  /**
   * Who is responsible for the page. Normally the organisation rather than an
   * individual: attributing a page to a named person implies that person wrote
   * and checked it, which must be true if it is claimed.
   */
  author: string;
  /** One sentence on the standard the page was produced against. */
  authorCredential: string;
  /** Models the prompt is written for. Rendered as "Written for ...". */
  testedOn: string[];
  /**
   * Design note: the failure mode this prompt exists to prevent, and the
   * constraint that prevents it.
   *
   * Must NOT be written as a first person account of testing. An invented
   * anecdote about a specific occasion is a fabricated provenance claim, and
   * on a directory this size it is also the thing most likely to be noticed.
   * State what models reliably do wrong on this task and why the prompt is
   * shaped the way it is. That is substantively true and just as useful.
   *
   * Still required and still checked for uniqueness, because a shared note
   * across pages means the pages were not thought about separately.
   */
  testingNote: string;
}

export interface PromptVariable {
  /** Token as it appears in the prompt body, without braces. */
  token: string;
  label: string;
  /** A concrete example value, used to prefill the copy ready preview. */
  example: string;
}

/**
 * The prompt itself. This is what a visitor came for, so it renders above the
 * article rather than buried underneath it.
 */
export interface PromptPayload {
  /** The prompt text. Variable tokens are written as {{TOKEN}}. */
  text: string;
  variables: PromptVariable[];
  /** What a good response to this prompt looks like, so people can tell. */
  expectedOutput: string;
  /** Optional chained prompts to run after the first response. */
  followUps?: string[];
  /** Common ways this prompt is misused, each paired with the correction. */
  pitfalls?: string[];
}

export interface PromptArticle {
  /**
   * Opening paragraphs. The exact match keyword must appear inside the first
   * 10 percent of total article words, which in practice means the first
   * sentence or two of intro[0].
   */
  intro: string[];
  sections: ArticleSection[];
  howTo: HowTo;
  faq: FaqItem[];
  /** Exactly 3 or 4 internal links forming the topic cluster. */
  internalLinks: InternalLink[];
  /** Exactly 3 or 4 external links to authoritative sources. */
  externalLinks: ExternalLink[];
  /** Optional comparison table rendered inside the article. */
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

export interface PromptSeo {
  /** The single exact match phrase. Must appear in slug, title, seoTitle,
   *  seoDescription and the first 10 percent of the article. */
  primaryKeyword: string;
  /**
   * 6 to 7 entries. Index 0 is the primary keyword, the rest are 5 to 6 long
   * tail variants. Every entry must be globally unique across the whole site,
   * which is what stops two pages cannibalising one term.
   */
  keywords: string[];
  /** <title>. 40 to 65 characters, leads with the exact match keyword. */
  seoTitle: string;
  /** Meta description. 135 to 165 characters, contains the exact match keyword. */
  seoDescription: string;
}

export interface PromptMeta {
  /** URL segment. Must be the primary keyword, lowercased and hyphenated. */
  slug: string;
  /** H1 on the prompt page. Must contain the exact match primary keyword. */
  title: string;
  /** Short label used in navigation, cards and the mega menu. */
  name: string;
  category: CategorySlug;
  /** Browse facet. Never appears in a URL path. */
  taskType: TaskType;
  /** One sentence summary used on cards and in the search index. */
  summary: string;
  seo: PromptSeo;
  prompt: PromptPayload;
  eeat: Eeat;
  article: PromptArticle;
  /** Extra search terms that should surface this prompt. */
  tags: string[];
  /** ISO date of the last meaningful content update. */
  updated: string;
  /** ISO date the page first went live. Renders as datePublished. */
  published: string;
  /** Set true for the handful of flagship prompts promoted on the home page. */
  featured?: boolean;
}

export interface RegisteredPrompt extends PromptMeta {
  /** Root relative canonical path, derived at build time. */
  href: string;
}
