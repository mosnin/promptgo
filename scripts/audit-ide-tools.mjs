#!/usr/bin/env node
/**
 * Builder tools compliance auditor. The /ide-tools counterpart to
 * audit-skills.mjs.
 *
 * A builder tool carries the same risk a skill does: the exact starter file
 * content shown in the page's editor is what a visitor's session begins
 * from, so a hollow or placeholder starter file is a real product defect,
 * not just a content quality problem. This checks both the article contract
 * (shared with prompts, tools and skills) and the starter files themselves
 * (non-empty, unique paths, a real starting point rather than a stub).
 *
 * Usage:
 *   npm run audit:ide-tools              audit everything
 *   npm run audit:ide-tools -- <slug>    audit a single tool
 *
 * Exits non zero when any error level rule fails.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ideToolsDir = path.join(root, "src", "ide-tools");
const skillsDir = path.join(root, "src", "skills");
const promptsDir = path.join(root, "src", "prompts");
const toolsDir = path.join(root, "src", "tools");

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
  /** Every builder tool needs at least one starter file. */
  minFiles: 1,
  /** A file this short is very unlikely to be a real, useful starting point rather than a stub. */
  minFileWords: 50,
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

const QUERY_ANCHOR =
  /\b(tool|tools|builder|build|free|download|downloadable|ai|template|starter|generator|editor|how to|how do|guide|best|for)\b/i;

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
  return parts.join(" ");
}
function claimCheckText(article) {
  const parts = [...article.intro];
  for (const section of article.sections) {
    parts.push(section.heading, ...section.body);
  }
  for (const item of article.faq) parts.push(item.answer);
  return parts.join(" ");
}
function shingles(text, size = 5) {
  const list = words(text);
  const out = new Set();
  for (let i = 0; i + size <= list.length; i += 1) out.add(list.slice(i, i + size).join(" "));
  return out;
}
function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function transpile(source) {
  return ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}
async function evalModule(code) {
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}
async function loadIdeToolMeta(slug) {
  const file = path.join(ideToolsDir, slug, "meta.ts");
  const module = await evalModule(transpile(await readFile(file, "utf8")));
  return module.default;
}
async function loadSkillMeta(slug) {
  const file = path.join(skillsDir, slug, "meta.ts");
  const module = await evalModule(transpile(await readFile(file, "utf8")));
  return module.default;
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

async function auditIdeTool(meta, seen) {
  const errors = [];
  const warnings = [];
  const add = (level, message) => (level === "error" ? errors : warnings).push(message);

  const { slug, title, seo, article, eeat, files, name, summary, updated, published } = meta;
  const keyword = seo?.primaryKeyword ?? "";

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
      add("error", `long tail "${secondary}" does not read as a search query for a builder tool.`);
    }
    if (occurrences(text, secondary) === 0) {
      add("error", `long tail "${secondary}" never appears in the article.`);
    }
  }

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

  if (article.intro.length < RULES.intro.min || article.intro.length > RULES.intro.max) {
    add("error", `intro has ${article.intro.length} paragraphs. Must be ${RULES.intro.min} to ${RULES.intro.max}.`);
  }
  if (article.sections.length < RULES.sections.min || article.sections.length > RULES.sections.max) {
    add("error", `${article.sections.length} sections. Must be ${RULES.sections.min} to ${RULES.sections.max}.`);
  }
  if (article.howTo.steps.length < RULES.howToSteps.min || article.howTo.steps.length > RULES.howToSteps.max) {
    add("error", `${article.howTo.steps.length} how-to steps. Must be ${RULES.howToSteps.min} to ${RULES.howToSteps.max}.`);
  }
  if (article.faq.length < RULES.faq.min || article.faq.length > RULES.faq.max) {
    add("error", `${article.faq.length} FAQ items. Must be ${RULES.faq.min} to ${RULES.faq.max}.`);
  }
  for (const item of article.faq) {
    if (countWords(item.answer) < 30) add("error", `FAQ answer "${item.question}" is under 30 words.`);
  }
  if (article.internalLinks.length < RULES.internalLinks.min || article.internalLinks.length > RULES.internalLinks.max) {
    add("error", `${article.internalLinks.length} internal links. Must be ${RULES.internalLinks.min} to ${RULES.internalLinks.max}.`);
  }
  if (article.externalLinks.length < RULES.externalLinks.min || article.externalLinks.length > RULES.externalLinks.max) {
    add("error", `${article.externalLinks.length} external links. Must be ${RULES.externalLinks.min} to ${RULES.externalLinks.max}.`);
  }
  const domains = article.externalLinks.map((link) => new URL(link.href).hostname);
  if (new Set(domains).size !== domains.length) {
    add("error", "external links must each be on a distinct domain.");
  }

  for (const phrase of FILLER) {
    if (text.toLowerCase().includes(phrase)) add("error", `contains filler phrase "${phrase}".`);
  }
  if (/—|–/.test(JSON.stringify(article)) || /—|–/.test((files ?? []).map((f) => f.content).join(""))) {
    add("error", "article or a starter file contains an em dash or en dash.");
  }

  if (!eeat?.author || !eeat?.authorCredential) {
    add("error", "eeat.author and eeat.authorCredential are required.");
  }
  if (!Array.isArray(eeat?.testedOn) || eeat.testedOn.length < 1) {
    add("error", "eeat.testedOn must name at least one model or context the tool was written for.");
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

  /* ---- Files: this is the exact starting point a visitor's editor opens ---- */
  if (!files || files.length < RULES.minFiles) {
    add("error", `tool has ${files?.length ?? 0} starter files. Needs at least ${RULES.minFiles}.`);
  }
  const paths = (files ?? []).map((file) => file.path);
  if (new Set(paths).size !== paths.length) {
    add("error", "two or more starter files share the same path.");
  }
  for (const file of files ?? []) {
    if (!file.path || file.path.trim() === "") add("error", "a starter file is missing its path.");
    if (file.path?.startsWith("/") || file.path?.includes("..")) {
      add("error", `file path "${file.path}" must be relative and cannot contain "..".`);
    }
    if (!file.content || countWords(file.content) < RULES.minFileWords) {
      add("error", `file "${file.path}" is ${countWords(file.content ?? "")} words, too short to be a real starting point (min ${RULES.minFileWords}).`);
    }
    if (!["markdown", "code", "data", "text", "json"].includes(file.kind)) {
      add("error", `file "${file.path}" has an invalid kind "${file.kind}".`);
    }
  }

  /* ---- Uniqueness across the whole catalogue (ide-tools + skills + tools + prompts) ---- */
  for (const kw of seo?.keywords ?? []) {
    const norm = normalise(kw);
    if (seen.keywords.has(norm)) {
      add("error", `keyword "${kw}" is already used by ${seen.keywords.get(norm)}.`);
    } else {
      seen.keywords.set(norm, `ide-tool:${slug}`);
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
  seen.articles.push({ slug: `ide-tool:${slug}`, shingles: shingleSet });

  if (!updated || !published) add("error", "updated and published dates are required.");

  return { slug, name, title, summary, errors, warnings };
}

async function main() {
  const filter = process.argv[2];

  if (!existsSync(ideToolsDir)) {
    console.log("[audit-ide-tools] no src/ide-tools directory yet.");
    return;
  }

  const entries = await readdir(ideToolsDir, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => existsSync(path.join(ideToolsDir, slug, "meta.ts")))
    .sort();

  const seen = { keywords: new Map(), articles: [] };

  // Seed keyword uniqueness with every prompt, tool and skill keyword too, so
  // a builder tool cannot cannibalise a term another catalogue already owns.
  for (const [dir, kind, loader] of [
    [promptsDir, "prompt", loadPromptMeta],
    [toolsDir, "tool", loadToolMeta],
    [skillsDir, "skill", loadSkillMeta],
  ]) {
    if (!existsSync(dir)) continue;
    const dirEntries = await readdir(dir, { withFileTypes: true });
    const dirSlugs = dirEntries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((slug) => existsSync(path.join(dir, slug, "meta.ts")));
    for (const slug of dirSlugs) {
      const meta = await loader(slug);
      for (const kw of meta.seo?.keywords ?? []) {
        seen.keywords.set(normalise(kw), `${kind}:${slug}`);
      }
    }
  }

  const results = [];
  for (const slug of slugs) {
    const meta = await loadIdeToolMeta(slug);
    results.push(await auditIdeTool(meta, seen));
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
  console.log(`\n[audit-ide-tools] ${audited.length} builder tools, ${totalErrors} errors, ${totalWarnings} warnings`);

  if (totalErrors > 0) process.exit(1);
}

main().catch((error) => {
  console.error("[audit-ide-tools] failed:", error);
  process.exit(1);
});
