#!/usr/bin/env node
/**
 * SEO compliance auditor.
 *
 * Runs against every prompt meta and enforces the contract documented in
 * .claude/skills/seo-prompt-page/SKILL.md. This is the gate that keeps 148
 * pages written across many sessions consistent enough to rank, and more
 * importantly, distinct enough not to be classified as a content farm.
 *
 * Usage:
 *   npm run audit:seo              audit everything
 *   npm run audit:seo -- <slug>    audit a single prompt
 *
 * Exits non zero when any error level rule fails.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const promptsDir = path.join(root, "src", "prompts");

/* ---- Rule thresholds ---------------------------------------------------- */

const RULES = {
  words: { min: 900, max: 1380 },
  density: { min: 0.7, max: 2.0 },
  seoTitle: { min: 40, max: 65 },
  seoDescription: { min: 135, max: 165 },
  faq: { min: 4, max: 8 },
  internalLinks: { min: 3, max: 4 },
  externalLinks: { min: 3, max: 4 },
  sections: { min: 4, max: 8 },
  howToSteps: { min: 3, max: 6 },
  /**
   * Focus keyword plus 3 to 6 long tails.
   *
   * The floor used to be 6 keywords, meaning 5 long tails, and that quota was
   * a mistake. Most prompts do not have five distinct phrasings that a person
   * actually types, so authors met the count by coining descriptive phrases
   * nobody searches. Worse, the global uniqueness rule actively rewarded that:
   * a phrase nobody else has claimed is very often a phrase nobody queries.
   *
   * Four good keywords beat seven where three are invented, so the floor is
   * now 4 and the QUERY_ANCHOR check below enforces that what remains looks
   * like something a person would type.
   */
  keywords: { min: 4, max: 7 },
  intro: { min: 2, max: 4 },
  /** The focus keyword must land inside this fraction of the article. */
  keywordLeadFraction: 0.1,
  /** Jaccard similarity over 5 word shingles above which two articles are duplicates. */
  duplicateSimilarity: { warn: 0.10, error: 0.18 },
  /**
   * The same test applied to prompt.text. Prompts share structural scaffolding
   * (role line, input block, numbered instructions) so a higher floor is
   * correct here, but two prompts that are substantially the same instruction
   * are two pages that did not need to both exist.
   */
  promptSimilarity: { warn: 0.22, error: 0.32 },
  /** A sentence repeated across more than this many pages reads as templated. */
  sentenceReuse: 2,
  /** An h2 heading reused on more than this many pages reads as a template. */
  headingReuse: 2,
};

/**
 * First person markers in a design note.
 *
 * The trust block renders under the H1 and is the strongest signal on the
 * page, which is why it must not contain a claim nobody can stand behind. An
 * earlier generation of these pages carried 148 invented first person testing
 * anecdotes, each individually plausible, describing occasions that never
 * happened. They were convincing precisely because the authoring contract at
 * the time asked for lived experience.
 *
 * This check exists so that failure cannot recur silently. A design note
 * states what models reliably get wrong and the constraint that prevents it.
 * The moment it says "I", it is asserting a provenance nobody verified.
 */
const FIRST_PERSON = [
  /\bI\b/,
  /\bI'(?:d|ve|m|ll)\b/i,
  /\bmy\b/i,
  /\bmine\b/i,
  /\bwe (?:tested|ran|tried|observed|found)\b/i,
  /\bour own\b/i,
];

/**
 * The same fabrication risk, found leaking into the article body and FAQ
 * rather than the testing note. This is narrower than FIRST_PERSON on purpose:
 * the article and FAQ legitimately use "I" and "my" in reader facing questions
 * like "Can I use this before I have any customers?", and a bare first person
 * check would flag those constantly. What actually cannot appear is a claim of
 * personal occasion or lived tally, so this checks for the verbs that carry
 * that claim, not the pronoun alone.
 */
const EXPERIENCE_CLAIM = [
  /\bin my experience\b/i,
  /\bI(?:'ve| have) (?:seen|run|found|inherited|tested|used|checked|watched|reviewed|caught|written|built|shipped|debugged|fixed)\b/i,
  /\bbefore I(?:'d| had) (?:run|tested|checked)\b/i,
  /\b(?:in|over) (?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+) years?,? I(?:'ve| have)\b/i,
  /\bnearly every \w+ I(?:'ve| have)\b/i,
  /\balmost every \w+ I(?:'ve| have)\b/i,
];

/**
 * Phrases that mark generic filler. A page built out of these is exactly what a
 * thin content classifier is looking for, so they fail the build rather than
 * warn.
 */
/**
 * A long tail has to look like a search, not like a description of the page.
 *
 * These anchors are the words that actually appear in queries for this kind of
 * content: the artefact being sought, the tool being used, or an interrogative.
 * "stopping a test early inflates false positives" is a true sentence and is
 * not a query. "how to tell if an ab test is underpowered" is the same idea in
 * the shape someone types.
 */
const QUERY_ANCHOR =
  /\b(prompt|prompts|chatgpt|claude|gemini|copilot|ai|llm|how to|how do|what to|what is|why|when to|which|template|templates|generator|example|examples|script|checklist|ideas|guide|tips|best|free|vs|instead of|for)\b/i;

const FILLER = [
  "in today's digital world",
  "in todays digital world",
  "unlock the power",
  "game changer",
  "take it to the next level",
  "look no further",
  "in this article we will",
  "delve into",
  "it is important to note that",
  "harness the power",
  "revolutionize the way",
];

/* ---- Helpers ------------------------------------------------------------ */

function normalise(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(text) {
  return normalise(text).split(" ").filter(Boolean);
}

function countWords(text) {
  return words(text).length;
}

function occurrences(text, keyword) {
  const haystack = normalise(text);
  const needle = normalise(keyword);
  if (!needle) return 0;
  let matches = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    matches += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return matches;
}

/** density = occurrences x words_in_phrase / total_words x 100 */
function density(text, keyword) {
  const total = countWords(text);
  if (total === 0) return 0;
  const phraseWords = normalise(keyword).split(" ").filter(Boolean).length;
  return (occurrences(text, keyword) * phraseWords * 100) / total;
}

/** Collects every string in the article body, in reading order. */
function articleText(meta) {
  const parts = [...meta.article.intro];
  for (const section of meta.article.sections) {
    parts.push(section.heading, ...section.body);
    if (section.list) parts.push(...section.list);
    if (section.subsections) {
      for (const sub of section.subsections) parts.push(sub.heading, ...sub.body);
    }
  }
  parts.push(meta.article.howTo.name);
  for (const step of meta.article.howTo.steps) parts.push(step.name, step.text);
  for (const item of meta.article.faq) parts.push(item.question, item.answer);
  if (meta.article.table) {
    const { caption, headers, rows } = meta.article.table;
    parts.push(caption, ...headers, ...rows.flat());
  }
  return parts.join(" ");
}

/**
 * The same body, minus FAQ questions. Questions are written in the reader's
 * voice ("Can I use this before I have any customers?") and legitimately use
 * first person, so they would false positive against EXPERIENCE_CLAIM. Only
 * prose Fast Prompts itself writes, meaning everything except the questions,
 * needs to stay free of unverifiable personal claims.
 */
function claimCheckText(meta) {
  const parts = [...meta.article.intro];
  for (const section of meta.article.sections) {
    parts.push(section.heading, ...section.body);
    if (section.list) parts.push(...section.list);
    if (section.subsections) {
      for (const sub of section.subsections) parts.push(sub.heading, ...sub.body);
    }
  }
  parts.push(meta.article.howTo.name);
  for (const step of meta.article.howTo.steps) parts.push(step.name, step.text);
  for (const item of meta.article.faq) parts.push(item.answer);
  return parts.join(" ");
}

/** Overlapping n word shingles, used for near duplicate detection. */
function shingles(text, size = 5) {
  const list = words(text);
  const out = new Set();
  for (let i = 0; i + size <= list.length; i += 1) {
    out.add(list.slice(i, i + size).join(" "));
  }
  return out;
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function sentences(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .map((sentence) => normalise(sentence))
    .filter((sentence) => sentence.split(" ").length >= 8);
}

/* ---- Loading metas ------------------------------------------------------ */

/**
 * Prompt metas are TypeScript modules with a "@/lib/types" import. Rather than
 * spinning up a compiler, the type-only import is stripped and the object
 * literal is evaluated directly. Everything in a meta file is plain data, so
 * this is sufficient and keeps the auditor dependency free.
 */
async function loadMeta(slug) {
  const file = path.join(promptsDir, slug, "meta.ts");
  const source = await readFile(file, "utf8");

  const stripped = source
    .replace(/^\s*import\s+type\s+.*?;\s*$/gm, "")
    .replace(/^\s*import\s+.*?;\s*$/gm, "")
    .replace(/const\s+meta\s*:\s*PromptMeta\s*=/, "const meta =")
    .replace(/export\s+default\s+meta\s*;?/, "");

  const module = await import(
    `data:text/javascript;base64,${Buffer.from(
      `${stripped}\nexport default meta;`,
    ).toString("base64")}`
  );
  return module.default;
}

/* ---- Audit -------------------------------------------------------------- */

function auditPrompt(meta, seen) {
  const errors = [];
  const warnings = [];
  const add = (level, message) => (level === "error" ? errors : warnings).push(message);

  const { slug, title, seo, article, prompt, eeat, category, name, summary, updated, published } =
    meta;
  const keyword = seo?.primaryKeyword ?? "";

  /* ---- 1. Exact match across the four required surfaces ---- */
  const expectedSlug = keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (slug !== expectedSlug) {
    add("error", `slug "${slug}" is not the focus keyword. Expected "${expectedSlug}".`);
  }
  for (const [label, value] of [
    ["title", title],
    ["seoTitle", seo.seoTitle],
    ["seoDescription", seo.seoDescription],
  ]) {
    if (!normalise(value).includes(normalise(keyword))) {
      add("error", `${label} does not contain the exact focus keyword "${keyword}".`);
    }
  }
  if (!normalise(seo.seoTitle).startsWith(normalise(keyword))) {
    add("warning", `seoTitle should open with the exact focus keyword "${keyword}".`);
  }

  /* ---- 2. Lengths ---- */
  for (const [label, value, rule] of [
    ["seoTitle", seo.seoTitle, RULES.seoTitle],
    ["seoDescription", seo.seoDescription, RULES.seoDescription],
  ]) {
    if (value.length < rule.min || value.length > rule.max) {
      add("error", `${label} is ${value.length} characters. Must be ${rule.min} to ${rule.max}.`);
    }
  }

  /* ---- 3. Keyword set: 1 focus + 3 to 6 long tails, no cannibalisation ---- */
  if (seo.keywords.length < RULES.keywords.min || seo.keywords.length > RULES.keywords.max) {
    add(
      "error",
      `${seo.keywords.length} keywords. Must be ${RULES.keywords.min} to ${RULES.keywords.max} (focus keyword plus 3 to 6 long tails).`,
    );
  }
  if (seo.keywords[0] !== keyword) {
    add("error", `keywords[0] must be the focus keyword "${keyword}".`);
  }
  if (new Set(seo.keywords.map(normalise)).size !== seo.keywords.length) {
    add("error", "keywords contains a duplicate entry.");
  }

  const text = articleText(meta);

  const claimText = claimCheckText(meta);
  for (const marker of EXPERIENCE_CLAIM) {
    if (marker.test(claimText)) {
      add(
        "error",
        `Article or FAQ answer contains a personal experience claim ("${claimText.match(marker)[0]}"). This asserts an occasion nobody can verify. Rewrite as an impersonal statement of what the constraint is and why it exists.`,
      );
    }
  }

  /* Long tails must be genuinely long tail, must look like a query, and must
   * actually appear in the body. */
  for (const secondary of seo.keywords.slice(1)) {
    if (normalise(secondary).split(" ").length < 3) {
      add("warning", `long tail keyword "${secondary}" is under three words, so it is a head term.`);
    }
    if (!QUERY_ANCHOR.test(secondary)) {
      add(
        "error",
        `long tail "${secondary}" does not read as a search query. Rewrite it the way someone would type it, or drop it: four real keywords beat seven with three invented.`,
      );
    }
    if (occurrences(text, secondary) === 0) {
      add("error", `long tail keyword "${secondary}" never appears in the article.`);
    }
  }

  /* ---- 4. Article volume, density and keyword placement ---- */
  const totalWords = countWords(text);
  if (totalWords < RULES.words.min || totalWords > RULES.words.max) {
    add("error", `article is ${totalWords} words. Must be ${RULES.words.min} to ${RULES.words.max}.`);
  }

  const primaryDensity = density(text, keyword);
  if (primaryDensity < RULES.density.min || primaryDensity > RULES.density.max) {
    add(
      "error",
      `focus keyword density is ${primaryDensity.toFixed(2)} percent. Must be ${RULES.density.min} to ${RULES.density.max}.`,
    );
  }

  /* The focus keyword must land inside the first 10 percent of the article. */
  const lead = words(text).slice(0, Math.max(1, Math.floor(totalWords * RULES.keywordLeadFraction)));
  if (occurrences(lead.join(" "), keyword) === 0) {
    add(
      "error",
      `focus keyword "${keyword}" does not appear in the first ${Math.round(RULES.keywordLeadFraction * 100)} percent of the article.`,
    );
  }

  /* ---- 5. Structure counts ---- */
  const checks = [
    ["intro paragraphs", article.intro.length, RULES.intro],
    ["sections", article.sections.length, RULES.sections],
    ["FAQ items", article.faq.length, RULES.faq],
    ["internal links", article.internalLinks.length, RULES.internalLinks],
    ["external links", article.externalLinks.length, RULES.externalLinks],
    ["how to steps", article.howTo.steps.length, RULES.howToSteps],
  ];
  for (const [label, count, rule] of checks) {
    if (count < rule.min || count > rule.max) {
      add("error", `${count} ${label}. Must be ${rule.min} to ${rule.max}.`);
    }
  }

  const headings = article.sections.map((section) => section.heading);
  if (new Set(headings).size !== headings.length) {
    add("error", "duplicate section headings.");
  }
  if (!headings.some((heading) => occurrences(heading, keyword) > 0)) {
    add("warning", "no h2 heading contains the focus keyword.");
  }

  for (const item of article.faq) {
    if (!item.question.trim().endsWith("?")) {
      add("warning", `FAQ question does not end with a question mark: "${item.question}"`);
    }
    if (countWords(item.answer) < 30) {
      add("error", `FAQ answer is too thin (under 30 words): "${item.question}"`);
    }
  }

  /* ---- 6. Topic cluster: internal links stay mostly inside the category ---- */
  let sameCategory = 0;
  for (const link of article.internalLinks) {
    if (!link.href.startsWith("/")) {
      add("error", `internal link "${link.href}" must be root relative.`);
    }
    if (link.href === `/${category}/${slug}`) {
      add("error", "internal link points at this same page.");
    }
    if (link.href.startsWith(`/${category}/`)) sameCategory += 1;
    seen.internalRefs.push({ from: slug, href: link.href });
  }
  if (sameCategory < 2) {
    add(
      "error",
      `only ${sameCategory} internal links stay inside /${category}. At least 2 are needed to build the cluster.`,
    );
  }
  if (sameCategory === article.internalLinks.length) {
    add("warning", "every internal link stays in this category. One cross category link binds the site together.");
  }

  /* ---- 7. Outbound links must be real citations ---- */
  const hosts = [];
  for (const link of article.externalLinks) {
    if (!link.href.startsWith("https://")) {
      add("error", `external link "${link.href}" must use https.`);
    }
    try {
      hosts.push(new URL(link.href).hostname.replace(/^www\./, ""));
    } catch {
      add("error", `external link "${link.href}" is not a valid URL.`);
    }
  }
  if (new Set(hosts).size !== hosts.length) {
    add("error", "external links must cite distinct domains.");
  }

  /* ---- 8. EEAT ---- */
  if (!eeat?.author || !eeat?.authorCredential) {
    add("error", "eeat.author and eeat.authorCredential are required.");
  }
  if (!Array.isArray(eeat?.testedOn) || eeat.testedOn.length < 2) {
    add("error", "eeat.testedOn must name at least two models the prompt was run against.");
  }
  const note = eeat?.testingNote ?? "";
  if (countWords(note) < 25) {
    add("error", "eeat.testingNote must be a substantive design note of at least 25 words.");
  }
  for (const marker of FIRST_PERSON) {
    if (marker.test(note)) {
      add(
        "error",
        `eeat.testingNote is written in the first person, which claims a test that cannot be verified. State what models get wrong and the constraint that prevents it.`,
      );
      break;
    }
  }
  /* Authorship is the organisation. Naming an individual asserts that person
   * wrote and checked the page, which has to be true if it is claimed. */
  if (eeat?.author && eeat.author !== "Fast Prompts") {
    add(
      "warning",
      `eeat.author is "${eeat.author}". Pages are attributed to the organisation unless a named person really did write and review this one.`,
    );
  }
  seen.testingNotes.push({ slug, note: normalise(eeat?.testingNote ?? "") });

  /* ---- 9. The prompt itself has to be usable ---- */
  if (countWords(prompt?.text ?? "") < 60) {
    add("error", "prompt.text is under 60 words, which is too thin to be a real prompt.");
  }
  const declared = new Set((prompt?.variables ?? []).map((variable) => variable.token));
  const used = new Set([...(prompt?.text ?? "").matchAll(/\{\{([A-Z0-9_]+)\}\}/g)].map((m) => m[1]));
  for (const token of used) {
    if (!declared.has(token)) add("error", `prompt uses {{${token}}} but does not declare it.`);
  }
  for (const token of declared) {
    if (!used.has(token)) add("error", `prompt declares {{${token}}} but never uses it.`);
  }
  for (const variable of prompt?.variables ?? []) {
    if (!variable.example?.trim()) add("error", `variable {{${variable.token}}} has no example value.`);
  }
  if (countWords(prompt?.expectedOutput ?? "") < 20) {
    add("error", "prompt.expectedOutput must describe a good response in at least 20 words.");
  }

  /* ---- 10. House style ---- */
  const allText = [
    title,
    name,
    summary,
    seo.seoTitle,
    seo.seoDescription,
    ...seo.keywords,
    text,
    prompt?.text ?? "",
    eeat?.testingNote ?? "",
    ...article.internalLinks.flatMap((link) => [link.label, link.description]),
    ...article.externalLinks.flatMap((link) => [link.label, link.description]),
  ].join(" ");

  if (/[—–]/.test(allText)) {
    const sample = allText.match(/.{0,40}[—–].{0,40}/)?.[0] ?? "";
    add("error", `contains an em dash or en dash: "...${sample.trim()}..."`);
  }
  for (const phrase of FILLER) {
    if (normalise(allText).includes(normalise(phrase))) {
      add("error", `contains filler phrase "${phrase}", which reads as generated content.`);
    }
  }

  /* ---- 11. Metadata hygiene ---- */
  for (const [label, value] of [
    ["updated", updated],
    ["published", published],
  ]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
      add("error", `${label} must be an ISO date such as 2026-07-29.`);
    }
  }
  if (published && updated && published > updated) {
    add("error", "published is later than updated.");
  }
  if (countWords(summary) < 8) {
    add("error", "summary is too short to be useful on cards and in search.");
  }

  /* ---- 12. Global uniqueness, including every long tail ---- */
  for (const [label, value, map] of [
    ["seoTitle", seo.seoTitle, seen.titles],
    ["seoDescription", seo.seoDescription, seen.descriptions],
    ["summary", summary, seen.summaries],
  ]) {
    if (map.has(value)) add("error", `duplicate ${label}, also used by ${map.get(value)}.`);
    map.set(value, slug);
  }

  /* This is the anti cannibalisation rule: no phrase may be targeted twice
   * anywhere on the site, not just no focus keyword targeted twice. */
  for (const entry of seo.keywords) {
    const key = normalise(entry);
    if (seen.keywords.has(key)) {
      add("error", `keyword "${entry}" is already targeted by ${seen.keywords.get(key)}, which cannibalises it.`);
    }
    seen.keywords.set(key, slug);
  }

  seen.shingles.push({ slug, set: shingles(text) });
  seen.promptShingles.push({ slug, set: shingles(prompt?.text ?? "") });
  for (const heading of headings) {
    const key = normalise(heading);
    if (!seen.headings.has(key)) seen.headings.set(key, []);
    seen.headings.get(key).push(slug);
  }
  for (const sentence of sentences(text)) {
    if (!seen.sentences.has(sentence)) seen.sentences.set(sentence, []);
    seen.sentences.get(sentence).push(slug);
  }

  return { slug, category, errors, warnings, words: totalWords, density: primaryDensity };
}

/* ---- Runner ------------------------------------------------------------- */

async function main() {
  const filter = process.argv[2];

  const entries = await readdir(promptsDir, { withFileTypes: true }).catch(() => []);
  const slugs = entries
    .filter((entry) => entry.isDirectory() && existsSync(path.join(promptsDir, entry.name, "meta.ts")))
    .map((entry) => entry.name)
    .filter((slug) => !filter || slug === filter)
    .sort();

  if (slugs.length === 0) {
    console.log("[audit] no prompts found");
    return;
  }

  const seen = {
    titles: new Map(),
    descriptions: new Map(),
    summaries: new Map(),
    keywords: new Map(),
    internalRefs: [],
    shingles: [],
    promptShingles: [],
    headings: new Map(),
    sentences: new Map(),
    testingNotes: [],
  };
  const known = new Set();
  const reports = [];

  for (const slug of slugs) {
    try {
      const meta = await loadMeta(slug);
      known.add(`/${meta.category}/${meta.slug}`);
      reports.push(auditPrompt(meta, seen));
    } catch (caught) {
      reports.push({
        slug,
        category: "?",
        errors: [`could not be parsed: ${caught.message}`],
        warnings: [],
        words: 0,
        density: 0,
      });
    }
  }

  const byslug = (slug) => reports.find((report) => report.slug === slug);

  // Cross page checks only make sense over the whole catalogue.
  if (!filter) {
    for (const ref of seen.internalRefs) {
      if (known.has(ref.href)) continue;
      byslug(ref.from)?.errors.push(`internal link "${ref.href}" does not resolve to a published prompt.`);
    }

    /* Near duplicate detection. This is the check that stands between a
     * 148 page directory and a thin content classification, so it is an error
     * rather than a warning once the overlap gets serious. */
    for (let i = 0; i < seen.shingles.length; i += 1) {
      for (let j = i + 1; j < seen.shingles.length; j += 1) {
        const a = seen.shingles[i];
        const b = seen.shingles[j];
        const score = jaccard(a.set, b.set);
        if (score >= RULES.duplicateSimilarity.error) {
          byslug(a.slug)?.errors.push(
            `article is ${(score * 100).toFixed(1)} percent similar to ${b.slug}. Rewrite one of them.`,
          );
        } else if (score >= RULES.duplicateSimilarity.warn) {
          byslug(a.slug)?.warnings.push(
            `article is ${(score * 100).toFixed(1)} percent similar to ${b.slug}.`,
          );
        }
      }
    }

    /* The same check over the prompts themselves. The article can be entirely
     * distinct while two pages ship near identical instructions, which is the
     * version of duplication a reader notices first. */
    for (let i = 0; i < seen.promptShingles.length; i += 1) {
      for (let j = i + 1; j < seen.promptShingles.length; j += 1) {
        const a = seen.promptShingles[i];
        const b = seen.promptShingles[j];
        const score = jaccard(a.set, b.set);
        if (score >= RULES.promptSimilarity.error) {
          byslug(a.slug)?.errors.push(
            `prompt is ${(score * 100).toFixed(1)} percent similar to ${b.slug}. One of them is redundant.`,
          );
        } else if (score >= RULES.promptSimilarity.warn) {
          byslug(a.slug)?.warnings.push(
            `prompt is ${(score * 100).toFixed(1)} percent similar to ${b.slug}.`,
          );
        }
      }
    }

    /* Heading reuse. Two pages sharing an h2 is coincidence, several sharing
     * one is a template, and a templated heading set is the clearest signal a
     * thin content classifier has to work with. */
    for (const [heading, owners] of seen.headings) {
      if (owners.length <= RULES.headingReuse) continue;
      for (const owner of owners) {
        byslug(owner)?.errors.push(
          `h2 "${heading.slice(0, 50)}" is reused on ${owners.length} pages.`,
        );
      }
    }

    /* Sentence level reuse. Catches the template that near duplicate detection
     * misses because only a few sentences were copied. */
    for (const [sentence, owners] of seen.sentences) {
      if (owners.length <= RULES.sentenceReuse) continue;
      const preview = sentence.slice(0, 60);
      for (const owner of owners) {
        byslug(owner)?.errors.push(
          `sentence reused on ${owners.length} pages: "${preview}..."`,
        );
      }
    }

    /* A testing note copied between pages is a fabricated trust signal. */
    const notes = new Map();
    for (const { slug, note } of seen.testingNotes) {
      if (notes.has(note)) {
        byslug(slug)?.errors.push(`eeat.testingNote is identical to ${notes.get(note)}.`);
      }
      notes.set(note, slug);
    }
  }

  let errorCount = 0;
  let warningCount = 0;

  for (const report of reports) {
    errorCount += report.errors.length;
    warningCount += report.warnings.length;

    if (report.errors.length === 0 && report.warnings.length === 0) {
      console.log(`  PASS  ${report.slug}  (${report.words}w, ${report.density.toFixed(2)}% density)`);
      continue;
    }

    const badge = report.errors.length > 0 ? "FAIL" : "WARN";
    console.log(`\n  ${badge}  ${report.slug}  (${report.words}w, ${report.density.toFixed(2)}% density)`);
    for (const message of report.errors) console.log(`        error:   ${message}`);
    for (const message of report.warnings) console.log(`        warning: ${message}`);
  }

  console.log(`\n[audit] ${reports.length} prompts, ${errorCount} errors, ${warningCount} warnings`);

  if (errorCount > 0) process.exit(1);
}

main().catch((caught) => {
  console.error("[audit] failed:", caught);
  process.exit(1);
});
