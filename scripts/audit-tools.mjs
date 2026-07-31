#!/usr/bin/env node
/**
 * Tools compliance auditor. The /tools counterpart to audit-seo.mjs.
 *
 * A tool page carries two kinds of risk a prompt page does not: the compute
 * function can be simply wrong (a formula that produces the wrong number),
 * and the interactive shell can throw at runtime on a value the form allows.
 * Both are checked here, not just the content contract.
 *
 * Usage:
 *   npm run audit:tools              audit everything
 *   npm run audit:tools -- <slug>    audit a single tool
 *
 * Exits non zero when any error level rule fails.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const toolsDir = path.join(root, "src", "tools");
const promptsDir = path.join(root, "src", "prompts");

/* ---- Rule thresholds ------------------------------------------------------
 * Shares its reasoning with scripts/audit-seo.mjs's RULES block; see the
 * comments there for why each threshold is what it is. Kept as a separate
 * object rather than imported, since the two scripts are meant to be
 * readable and runnable independently. */

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
  keywords: { min: 4, max: 7 },
  intro: { min: 2, max: 4 },
  keywordLeadFraction: 0.1,
  duplicateSimilarity: { warn: 0.1, error: 0.18 },
  sentenceReuse: 2,
  headingReuse: 2,
  /** Every tool needs at least this many self tests, and every one has to pass. */
  minSelfTests: 3,
  /** Every tool needs at least this many input fields to be a real tool. */
  minFields: 1,
};

const FIRST_PERSON = [
  /\bI\b/,
  /\bI'(?:d|ve|m|ll)\b/i,
  /\bmy\b/i,
  /\bmine\b/i,
  /\bwe (?:tested|ran|tried|observed|found)\b/i,
  /\bour own\b/i,
];

const EXPERIENCE_CLAIM = [
  /\bin my experience\b/i,
  /\bI(?:'ve| have) (?:seen|run|found|inherited|tested|used|checked|watched|reviewed|caught|written|built|shipped|debugged|fixed)\b/i,
  /\bbefore I(?:'d| had) (?:run|tested|checked)\b/i,
  /\b(?:in|over) (?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+) years?,? I(?:'ve| have)\b/i,
  /\bnearly every \w+ I(?:'ve| have)\b/i,
  /\balmost every \w+ I(?:'ve| have)\b/i,
  /\bI (?:see|use|know|read|write|check|find|notice|recall|remember)\b/i,
];

/**
 * A tool's long tails describe a tool query rather than an AI prompt query,
 * so the anchor list swaps prompt/chatgpt/claude for the words that actually
 * appear in searches for a calculator or generator.
 */
const QUERY_ANCHOR =
  /\b(tool|tools|free|online|generator|calculator|checker|converter|builder|maker|how to|how do|how many|what is|what to|which|template|example|examples|guide|best|vs)\b/i;

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

/* ---- Helpers -------------------------------------------------------------- */

function normalise(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function words(text) {
  return normalise(text).split(" ").filter(Boolean);
}

function countWords(text) {
  return words(text).length;
}

function occurrences(text, keyword) {
  const haystackWords = words(text);
  const needleWords = words(keyword);
  if (needleWords.length === 0) return 0;
  let matches = 0;
  for (let i = 0; i + needleWords.length <= haystackWords.length; i += 1) {
    let isMatch = true;
    for (let j = 0; j < needleWords.length; j += 1) {
      if (haystackWords[i + j] !== needleWords[j]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) matches += 1;
  }
  return matches;
}

function density(text, keyword) {
  const total = countWords(text);
  if (total === 0) return 0;
  const phraseWords = normalise(keyword).split(" ").filter(Boolean).length;
  return (occurrences(text, keyword) * phraseWords * 100) / total;
}

function articleText(article) {
  const parts = [...article.intro];
  for (const section of article.sections) {
    parts.push(section.heading, ...section.body);
    if (section.list) parts.push(...section.list);
    if (section.subsections) {
      for (const sub of section.subsections) parts.push(sub.heading, ...sub.body);
    }
  }
  parts.push(article.howTo.name);
  for (const step of article.howTo.steps) parts.push(step.name, step.text);
  for (const item of article.faq) parts.push(item.question, item.answer);
  if (article.table) {
    const { caption, headers, rows } = article.table;
    parts.push(caption, ...headers, ...rows.flat());
  }
  return parts.join(" ");
}

function claimCheckText(article) {
  const parts = [...article.intro];
  for (const section of article.sections) {
    parts.push(section.heading, ...section.body);
    if (section.list) parts.push(...section.list);
    if (section.subsections) {
      for (const sub of section.subsections) parts.push(sub.heading, ...sub.body);
    }
  }
  parts.push(article.howTo.name);
  for (const step of article.howTo.steps) parts.push(step.name, step.text);
  for (const item of article.faq) parts.push(item.answer);
  return parts.join(" ");
}

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

/* ---- Loading modules ------------------------------------------------------
 * Same strip-and-eval technique as audit-seo.mjs: everything in these files
 * is either plain data or, for compute.ts, a pure function with no runtime
 * dependency beyond standard web APIs, so no compiler is needed. */

/**
 * meta.ts files are plain data (safe for a regex based strip). compute.ts
 * files are real logic with real local type annotations ("let url: URL;"),
 * which a regex cannot reliably strip. Both go through the TypeScript
 * compiler's transpileModule instead: syntax only, no type checking, no
 * project resolution, so it is as fast as the regex approach but actually
 * correct for arbitrary TypeScript rather than only for object literals.
 * `import type` specifiers are elided by the compiler automatically; a path
 * aliased value import (there are none in these files) would need resolving
 * separately, which is why compute.ts is kept dependency free by convention.
 */
function transpile(source) {
  return ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

async function evalModule(code) {
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}

async function loadPromptMeta(slug) {
  const file = path.join(promptsDir, slug, "meta.ts");
  const module = await evalModule(transpile(await readFile(file, "utf8")));
  return module.default;
}

async function loadToolMeta(slug) {
  const file = path.join(toolsDir, slug, "meta.ts");
  const module = await evalModule(transpile(await readFile(file, "utf8")));
  return module.default;
}

async function loadToolCompute(slug) {
  const file = path.join(toolsDir, slug, "compute.ts");
  const module = await evalModule(transpile(await readFile(file, "utf8")));
  return { compute: module.compute, selfTests: module.selfTests ?? [] };
}

/* ---- Field helpers --------------------------------------------------------- */

function fieldExamples(fields) {
  const values = {};
  for (const field of fields) values[field.token] = field.example;
  return values;
}

function validKind(result) {
  return (
    result &&
    typeof result === "object" &&
    ["value", "table", "text", "list", "swatches", "css", "qr", "diff", "error"].includes(result.kind)
  );
}

/* ---- Audit ------------------------------------------------------------------ */

async function auditTool(meta, computeInfo, seen) {
  const errors = [];
  const warnings = [];
  const add = (level, message) => (level === "error" ? errors : warnings).push(message);

  const { slug, title, seo, article, eeat, fields, name, summary, updated, published } = meta;
  const keyword = seo?.primaryKeyword ?? "";

  /* ---- Slug / title / seo exact match ---- */
  const expectedSlug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (slug !== expectedSlug) {
    add("error", `slug "${slug}" is not the primary keyword. Expected "${expectedSlug}".`);
  }
  if (!title?.toLowerCase().includes(keyword.toLowerCase())) {
    add("error", `title does not contain the primary keyword "${keyword}".`);
  }
  if (!seo?.seoTitle?.toLowerCase().startsWith(keyword.toLowerCase())) {
    add("warning", `seoTitle should lead with the primary keyword "${keyword}".`);
  }
  for (const [label, rule] of [
    ["seoTitle", RULES.seoTitle],
    ["seoDescription", RULES.seoDescription],
  ]) {
    const value = seo?.[label] ?? "";
    if (value.length < rule.min || value.length > rule.max) {
      add("error", `${label} is ${value.length} characters. Must be ${rule.min} to ${rule.max}.`);
    }
  }
  if (!seo?.seoDescription?.toLowerCase().includes(keyword.toLowerCase())) {
    add("error", "seoDescription does not contain the primary keyword.");
  }

  /* ---- Keywords ---- */
  if (!seo?.keywords || seo.keywords.length < RULES.keywords.min || seo.keywords.length > RULES.keywords.max) {
    add("error", `${seo?.keywords?.length ?? 0} keywords. Must be ${RULES.keywords.min} to ${RULES.keywords.max}.`);
  }
  if (seo?.keywords?.[0] !== keyword) {
    add("error", `keywords[0] must be the primary keyword "${keyword}".`);
  }
  if (seo?.keywords && new Set(seo.keywords.map(normalise)).size !== seo.keywords.length) {
    add("error", "keywords contains a duplicate entry.");
  }

  const text = articleText(article);

  for (const secondary of (seo?.keywords ?? []).slice(1)) {
    if (normalise(secondary).split(" ").length < 3) {
      add("warning", `long tail "${secondary}" is under three words.`);
    }
    if (!QUERY_ANCHOR.test(secondary)) {
      add("error", `long tail "${secondary}" does not read as a search query for a tool.`);
    }
    if (occurrences(text, secondary) === 0) {
      add("error", `long tail "${secondary}" never appears in the article.`);
    }
  }

  /* ---- Article volume, density, keyword placement ---- */
  const totalWords = countWords(text);
  if (totalWords < RULES.words.min || totalWords > RULES.words.max) {
    add("error", `article is ${totalWords} words. Must be ${RULES.words.min} to ${RULES.words.max}.`);
  }
  const kwDensity = density(text, keyword);
  if (kwDensity < RULES.density.min || kwDensity > RULES.density.max) {
    add("error", `keyword density is ${kwDensity.toFixed(2)}%. Must be ${RULES.density.min} to ${RULES.density.max}.`);
  }
  const leadWords = words(text).slice(0, Math.round(totalWords * RULES.keywordLeadFraction)).join(" ");
  if (!leadWords.includes(normalise(keyword))) {
    add("error", `primary keyword does not appear in the first ${RULES.keywordLeadFraction * 100}% of the article.`);
  }

  /* ---- Structure ---- */
  if (article.intro.length < RULES.intro.min || article.intro.length > RULES.intro.max) {
    add("error", `intro has ${article.intro.length} paragraphs. Must be ${RULES.intro.min} to ${RULES.intro.max}.`);
  }
  if (article.sections.length < RULES.sections.min || article.sections.length > RULES.sections.max) {
    add("error", `${article.sections.length} sections. Must be ${RULES.sections.min} to ${RULES.sections.max}.`);
  }
  if (
    article.howTo.steps.length < RULES.howToSteps.min ||
    article.howTo.steps.length > RULES.howToSteps.max
  ) {
    add("error", `${article.howTo.steps.length} how-to steps. Must be ${RULES.howToSteps.min} to ${RULES.howToSteps.max}.`);
  }
  if (article.faq.length < RULES.faq.min || article.faq.length > RULES.faq.max) {
    add("error", `${article.faq.length} FAQ items. Must be ${RULES.faq.min} to ${RULES.faq.max}.`);
  }
  for (const item of article.faq) {
    if (countWords(item.answer) < 30) add("error", `FAQ answer "${item.question}" is under 30 words.`);
  }
  if (
    article.internalLinks.length < RULES.internalLinks.min ||
    article.internalLinks.length > RULES.internalLinks.max
  ) {
    add("error", `${article.internalLinks.length} internal links. Must be ${RULES.internalLinks.min} to ${RULES.internalLinks.max}.`);
  }
  if (
    article.externalLinks.length < RULES.externalLinks.min ||
    article.externalLinks.length > RULES.externalLinks.max
  ) {
    add("error", `${article.externalLinks.length} external links. Must be ${RULES.externalLinks.min} to ${RULES.externalLinks.max}.`);
  }
  const domains = article.externalLinks.map((link) => new URL(link.href).hostname);
  if (new Set(domains).size !== domains.length) {
    add("error", "external links must each be on a distinct domain.");
  }

  /* ---- Filler ---- */
  for (const phrase of FILLER) {
    if (text.toLowerCase().includes(phrase)) add("error", `contains filler phrase "${phrase}".`);
  }
  if (/—|–/.test(JSON.stringify(article))) {
    add("error", "article contains an em dash or en dash.");
  }

  /* ---- EEAT / trust ---- */
  if (!eeat?.author || !eeat?.authorCredential) {
    add("error", "eeat.author and eeat.authorCredential are required.");
  }
  if (!Array.isArray(eeat?.testedOn) || eeat.testedOn.length < 1) {
    add("error", "eeat.testedOn must name at least one standard, formula or API the tool is built on.");
  }
  const note = eeat?.testingNote ?? "";
  if (countWords(note) < 25) add("error", "eeat.testingNote must be a substantive note of at least 25 words.");
  for (const marker of FIRST_PERSON) {
    if (marker.test(note)) {
      add("error", "eeat.testingNote is written in the first person.");
      break;
    }
  }
  if (eeat?.author && eeat.author !== "Fast Prompts") {
    add("warning", `eeat.author is "${eeat.author}". Pages are attributed to the organisation.`);
  }

  const claimText = claimCheckText(article);
  for (const marker of EXPERIENCE_CLAIM) {
    if (marker.test(claimText)) {
      add("error", `Article or FAQ answer contains a personal experience claim ("${claimText.match(marker)[0]}").`);
    }
  }

  /* ---- Fields ---- */
  if (!fields || fields.length < RULES.minFields) {
    add("error", `tool has ${fields?.length ?? 0} input fields. Needs at least ${RULES.minFields}.`);
  }
  for (const field of fields ?? []) {
    if (!field.token || !field.label) add("error", "every field needs a token and a label.");
    if (field.kind === "list") {
      if (!Array.isArray(field.example) || field.example.length === 0) {
        add("error", `list field "${field.token}" needs at least one example row.`);
      }
    } else if (field.example === undefined || field.example === null) {
      add("error", `field "${field.token}" needs an example value.`);
    }
  }

  /* ---- Compute correctness ---- */
  if (!computeInfo?.compute) {
    add("error", "compute.ts does not export a compute function.");
  } else {
    try {
      const result = computeInfo.compute(fieldExamples(fields ?? []));
      if (!validKind(result)) {
        add("error", `compute(example inputs) returned an invalid or missing result kind.`);
      }
    } catch (error) {
      add("error", `compute(example inputs) threw: ${error.message}`);
    }

    const selfTests = computeInfo.selfTests ?? [];
    if (selfTests.length < RULES.minSelfTests) {
      add("error", `only ${selfTests.length} self tests. Needs at least ${RULES.minSelfTests} known-correct cases.`);
    }
    for (const test of selfTests) {
      try {
        const result = computeInfo.compute(test.inputs);
        if (!test.check(result)) {
          add("error", `self test "${test.name}" failed: compute() did not produce the expected result.`);
        }
      } catch (error) {
        add("error", `self test "${test.name}" threw: ${error.message}`);
      }
    }
  }

  /* ---- Uniqueness across the whole catalogue (tools + prompts) ---- */
  for (const kw of seo?.keywords ?? []) {
    const norm = normalise(kw);
    if (seen.keywords.has(norm)) {
      add("error", `keyword "${kw}" is already used by ${seen.keywords.get(norm)}.`);
    } else {
      seen.keywords.set(norm, `tool:${slug}`);
    }
  }

  const shingleSet = shingles(text);
  for (const { slug: otherSlug, shingles: otherShingles } of seen.articles) {
    const similarity = jaccard(shingleSet, otherShingles);
    if (similarity >= RULES.duplicateSimilarity.error) {
      add("error", `article is ${(similarity * 100).toFixed(0)}% similar to ${otherSlug}.`);
    } else if (similarity >= RULES.duplicateSimilarity.warn) {
      add("warning", `article is ${(similarity * 100).toFixed(0)}% similar to ${otherSlug}.`);
    }
  }
  seen.articles.push({ slug: `tool:${slug}`, shingles: shingleSet });

  const headingSet = article.sections.map((section) => normalise(section.heading));
  for (const heading of headingSet) {
    seen.headings.set(heading, (seen.headings.get(heading) ?? 0) + 1);
  }

  const sentenceSet = sentences(text);
  for (const sentence of sentenceSet) {
    seen.sentences.set(sentence, (seen.sentences.get(sentence) ?? 0) + 1);
  }

  if (!updated || !published) add("error", "updated and published dates are required.");

  return { slug, name, title, summary, errors, warnings };
}

/* ---- Main ------------------------------------------------------------------ */

async function main() {
  const filter = process.argv[2];

  if (!existsSync(toolsDir)) {
    console.log("[audit-tools] no src/tools directory yet.");
    return;
  }

  const entries = await readdir(toolsDir, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => existsSync(path.join(toolsDir, slug, "meta.ts")) && existsSync(path.join(toolsDir, slug, "compute.ts")))
    .sort();

  const seen = { keywords: new Map(), articles: [], headings: new Map(), sentences: new Map() };

  // Seed keyword uniqueness with every prompt keyword too, so a tool cannot
  // cannibalise a term the prompt catalogue already owns.
  if (existsSync(promptsDir)) {
    const promptEntries = await readdir(promptsDir, { withFileTypes: true });
    const promptSlugs = promptEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((slug) => existsSync(path.join(promptsDir, slug, "meta.ts")));
    for (const slug of promptSlugs) {
      const meta = await loadPromptMeta(slug);
      for (const kw of meta.seo?.keywords ?? []) {
        seen.keywords.set(normalise(kw), `prompt:${slug}`);
      }
    }
  }

  const results = [];
  for (const slug of slugs) {
    const meta = await loadToolMeta(slug);
    const computeInfo = await loadToolCompute(slug);
    results.push(await auditTool(meta, computeInfo, seen));
  }

  for (const [heading, count] of seen.headings) {
    if (count > RULES.headingReuse) {
      for (const result of results) {
        console.warn(`[audit-tools] heading "${heading}" reused ${count} times across the catalogue.`);
        break;
      }
      break;
    }
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const result of results) {
    if (filter && result.slug !== filter) continue;
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    const status = result.errors.length > 0 ? "FAIL" : "PASS";
    console.log(`  ${status}  ${result.slug}`);
    for (const error of result.errors) console.log(`        error:   ${error}`);
    for (const warning of result.warnings) console.log(`        warning: ${warning}`);
  }

  const audited = filter ? results.filter((r) => r.slug === filter) : results;
  console.log(`\n[audit-tools] ${audited.length} tools, ${totalErrors} errors, ${totalWarnings} warnings`);

  if (totalErrors > 0) process.exit(1);
}

main().catch((error) => {
  console.error("[audit-tools] failed:", error);
  process.exit(1);
});
