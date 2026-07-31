import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Competitor Messaging Audit

Use this skill whenever you are asked to analyse a competitor's positioning, claims
or messaging gaps. Its entire value depends on one rule that is not optional: the
audit is built from the competitor's actual published copy, pasted in verbatim by
the person asking for it, never from the competitor's name, category or general
reputation.

## Before you audit anything

Ask for the competitor's actual copy if it has not been supplied: their homepage,
pricing page, an ad, an email, whatever piece of marketing text is under review.
It must be pasted in as text, not summarised from memory or described secondhand.

If no real copy is supplied, say so plainly and stop there. Do not produce an
audit anyway. A sentence like "Competitor X probably focuses on price" is a guess
dressed up as analysis, and this skill exists specifically to refuse that shortcut.
A company's name and category tell you almost nothing reliable about what its
actual copy says, who it is written for, or what it claims without evidence, so
treat a request with no pasted copy as a request for real copy, not as a request
for a plausible sounding substitute.

## Running the audit

Once real copy is in hand, work through \`reference/messaging-audit-checklist.md\`.
That file lists four specific, checkable dimensions: value proposition clarity,
target audience signals, proof points offered versus merely asserted, and
differentiation claims. For each dimension:

1. Quote the exact sentence or phrase in the pasted copy that the finding is based
   on. A finding with no quoted source line is not acceptable.
2. State what that quote reveals about the competitor's positioning on that
   dimension.
3. Note anything the copy conspicuously avoids saying, since an absence can be as
   informative as a claim, but must be labelled as an absence, not invented as a
   fact.

## Separating positioning analysis from unsubstantiated claims

Keep two passes distinct and never merge them into one finding. The first pass is
positioning analysis: what the competitor is choosing to say and to whom. The
second pass is a substantiation check: scanning the same copy for claims that read
as unsubstantiated, meaning a superlative or comparison with no evidence attached,
such as "the fastest" or "the most trusted" with no basis given anywhere in the
pasted text. Flag each one separately, quoting the exact claim, and say plainly
that no evidence for it was found in what was supplied. Do not fold a flagged claim
into the positioning analysis as if it were a confirmed differentiator; an
unsupported superlative is a red flag about the copy, not proof of a real
advantage.

## What this skill does not do

It does not produce a competitor audit from a brand name, a category guess, or
prior familiarity with a company. It does not assume a competitor's strategy from
what similar companies typically do. If the pasted copy is thin, an incomplete
audit built only from what was actually supplied is the correct output, clearly
marked as partial, rather than a fuller sounding audit padded out with invented
detail.
`;

const CHECKLIST_MD = `# Messaging audit checklist: four dimensions

Use this alongside \`SKILL.md\`. Every dimension below is worked directly from the
competitor's pasted copy. If a dimension cannot be assessed because the pasted
copy does not cover it, say so rather than filling the gap with a guess.

## 1. Value proposition clarity

- What to check: does the copy state, in a sentence a reader could repeat back,
  what the product or service actually does and why that matters.
- Strong signal: a specific outcome named early, in the first screen or first
  paragraph of the pasted copy, without requiring the reader to infer it.
- Weak signal: the copy describes the technology or method used before it
  describes the outcome for the reader, or the value proposition only becomes
  clear several paragraphs in.
- What to quote: the exact sentence functioning as the value proposition, plus
  its position in the pasted copy (opening line, subheading, buried in body text).

## 2. Target audience signals

- What to check: who the copy is actually written for, judged from vocabulary
  level, the objections it pre-empts, and the size or type of buyer implied by
  any examples or case studies mentioned.
- What to quote: specific word choices, named roles, company sizes, or industries
  that appear in the pasted copy, not a guess about who the product suits.
- If the copy is written generically with no audience signal at all, record that
  as the finding rather than inventing an audience.

## 3. Proof points offered versus proof points merely asserted

- What to check: split every claim of quality, results or trust into two piles.
  Offered proof means a named number, a named customer, a citation, a specific
  study or a verifiable detail. Asserted proof means a claim with no evidence
  attached anywhere in the pasted copy.
- What to quote: for each claim, the exact sentence, and whichever evidence
  sentence sits near it, if any exists.
- This is the direct input to the unsubstantiated claims flag in SKILL.md. A
  claim landing in the asserted pile with a superlative or comparison word is a
  candidate for that flag.

## 4. Differentiation claims

- What to check: what the copy says makes this company different from
  alternatives, and whether that difference is a mechanism (how it works), an
  outcome (what results from using it), or a vague sentiment with no substance
  either way.
- What to quote: the exact differentiation sentence, and note whether a
  competitor in the same category could plausibly claim the identical sentence
  without changing a word. If they could, the differentiation is weak regardless
  of how confident the copy sounds.
- Record whether the differentiation claim is paired with any evidence from
  dimension three, since an unpaired differentiation claim is the most common
  place an unsubstantiated superlative hides.

## Working with thin or partial copy

When the pasted copy only covers part of these four dimensions, such as a single
paragraph of ad copy rather than a full page, complete the dimensions the copy
actually supports and mark the rest as not assessable from the material supplied.
Do not extend the audit past what the pasted text can support.
`;

const meta: SkillMeta = {
  slug: "competitor-messaging-audit-skill",
  name: "Competitor Messaging Audit",
  title: "Competitor Messaging Audit Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that audits a competitor's positioning, proof points and differentiation claims from their actual pasted copy, and refuses to write an audit from the competitor's name alone.",

  seo: {
    primaryKeyword: "competitor messaging audit skill",
    keywords: [
      "competitor messaging audit skill",
      "free ai skill for competitor messaging audit",
      "downloadable competitor messaging checklist",
      "ai skill to audit competitor copy",
      "how to audit competitor messaging claims",
    ],
    seoTitle: "Competitor Messaging Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable competitor messaging audit skill that reads a competitor's real pasted copy for positioning, proof points and unsubstantiated claims.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/messaging-audit-checklist.md", content: CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to audit a named competitor reliably default to producing a plausible sounding analysis from the company name and category alone when no real copy is supplied, presenting that invention as if it were read from the competitor's own words. This skill's checklist forces every finding to trace to a quoted sentence in pasted copy, and requires the skill to say plainly when no real copy was given rather than proceeding on a guess.",
  },

  article: {
    intro: [
      "A competitor messaging audit skill is only as trustworthy as the copy it is actually built from. Handed nothing but a competitor's name, most AI assistants will still produce a confident sounding audit, one that reads like research but is really a guess about what a company in that category probably says. This skill is built to refuse that shortcut and to work only from real, pasted copy. It is written as a free ai skill for competitor messaging audit work specifically, not a general purpose research assistant.",
      "The download contains two plain text files: a main instructions file and a four dimension reference checklist the instructions rely on. Open this page first and you will see the identical wording sitting inside the archive, since the reader here and the .zip contents are the same file, not a summary of it.",
    ],
    sections: [
      {
        heading: "Why real copy is required, not a name based guess",
        body: [
          "A company's name and category tell you almost nothing about what its actual marketing copy says. Two companies selling the same kind of product can lead with a completely different value proposition, target a completely different buyer, and lean on completely different proof points, and no amount of familiarity with the category predicts which one a specific competitor chose. That is why this skill's first instruction is to require the competitor's actual copy pasted in as text before any audit begins.",
          "When no real copy is supplied, the skill does not fill the gap with a plausible sounding substitute. It says so plainly and stops there, because 'Competitor X probably focuses on price' is exactly the kind of unchecked assumption a downloadable competitor messaging checklist should prevent, not produce.",
        ],
      },
      {
        heading: "The four dimensions the audit checks",
        body: [
          "Every finding in this skill traces back to one of four specific dimensions: value proposition clarity, target audience signals, proof points offered versus merely asserted, and differentiation claims. Each dimension asks for a quoted sentence from the pasted copy as its evidence, not a general impression of what the competitor is probably trying to do.",
          "Splitting proof points into offered and asserted is the dimension that does the most work here. A number, a named customer or a citation counts as offered. A claim with no evidence attached anywhere in the pasted copy counts as asserted, and lands directly in the unsubstantiated claims check described below.",
        ],
      },
      {
        heading: "How the skill separates positioning analysis from unsubstantiated claims",
        body: [
          "Two passes stay distinct and are never merged into a single finding. The first pass reads the pasted copy for what the competitor is choosing to say and to whom, which is genuine positioning analysis. The second pass scans the same text specifically for a superlative or comparison offered with no evidence, such as 'the fastest' or 'the most trusted' with nothing in the copy to back it up.",
          "Each flagged claim is quoted exactly and reported as unsubstantiated within the pasted copy, never folded into the positioning analysis as if it were a confirmed advantage. An unsupported superlative is a fact about the copy's rhetoric, not proof that the underlying claim is true.",
        ],
      },
      {
        heading: "Working as an ai skill to audit competitor copy on thin material",
        body: [
          "When only a fragment of copy is available, such as one paragraph of ad text rather than a full page, the skill completes whichever dimensions that fragment actually supports and marks the rest as not assessable rather than stretching thin material into a full sounding report. A short, honest, partial audit is the correct output in that case.",
          "A competitor messaging audit skill that pads a thin fragment into a report covering all four dimensions has quietly started inventing again, just one layer removed from guessing off a brand name instead of guessing off a paragraph. Restraint on thin material is part of the same discipline, not a separate concern.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not produce a competitor audit from a brand name, a category assumption, or general familiarity with a company, and it will not infer a competitor's strategy from what similar companies typically do. Every instruction in the main file is written to route the model back to the pasted text, not around it.",
        ],
      },
      {
        heading: "How to audit competitor messaging claims with the downloaded files",
        body: [
          "Load SKILL.md and its reference folder into an assistant as one unit, because the relative file path inside the instructions only resolves if reference/messaging-audit-checklist.md sits where it did on download. Once loaded, every audit that follows can reuse the same four dimensions rather than re-explaining them per request.",
        ],
      },
    ],
    howTo: {
      name: "How to use the competitor messaging audit skill",
      steps: [
        {
          name: "Read the instructions and the checklist on this page",
          text: "Scroll through SKILL.md and reference/messaging-audit-checklist.md above so the four dimensions and the no-guessing rule are clear before anything downloads.",
        },
        {
          name: "Build the archive",
          text: "A single click assembles the .zip from the exact wording shown in the preview, and the whole process runs locally in your browser tab.",
        },
        {
          name: "Gather the competitor's real marketing copy",
          text: "Pull the actual homepage, pricing page, ad or email text you want audited and have it ready to paste as plain text, word for word.",
        },
        {
          name: "Load the files and the copy into your assistant",
          text: "Keep SKILL.md next to its reference folder so the file path reference still resolves, then paste in the competitor's copy and ask for the audit.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have the competitor's name, not their actual copy?",
        answer:
          "The skill says so explicitly rather than guessing. It will not produce an audit from a name or category alone, since that would be exactly the kind of unchecked assumption a real messaging audit is meant to catch, so it asks for real, pasted copy before doing any analysis at all.",
      },
      {
        question: "How does the skill decide a claim is unsubstantiated?",
        answer:
          "It looks for a superlative or comparison, such as a claim to be the fastest or the most trusted, with no evidence attached anywhere in the pasted copy. That claim is quoted exactly and flagged separately from the positioning analysis, rather than treated as a confirmed differentiator.",
      },
      {
        question: "Can the skill audit a single paragraph of ad copy, or does it need a full page?",
        answer:
          "It can work from a fragment. Whichever of the four dimensions the fragment actually supports gets completed, and anything the fragment cannot support is marked not assessable, so the output stays honest about how much material it was actually given.",
      },
      {
        question: "Does the audit ever assume what a competitor's strategy probably is?",
        answer:
          "No, and the instructions explicitly forbid it. Every finding has to trace to a quoted sentence in the pasted copy, so a general impression about what companies in that category typically do is never allowed to substitute for a real quote.",
      },
      {
        question: "Does this site ever see the competitor copy I paste into the assistant?",
        answer:
          "No. Reading the files on this page and building the .zip both run locally in your browser, with nothing sent to a server in either step, and the competitor copy you later paste into an assistant is a separate action this site never touches at all.",
      },
      {
        question: "Why is the checklist a separate file instead of being folded into SKILL.md?",
        answer:
          "Keeping the four dimensions in their own reference file lets the checklist grow, for example a fifth dimension added later, without every edit touching the core instructions that enforce the no-guessing rule, so the two concerns stay easy to update independently.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/competitor-analysis-prompt",
        label: "competitor analysis prompt",
        description: "For a single one-off read of a competitor's pasted copy in prose, rather than a reusable downloadable audit checklist.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description: "For drafting your own differentiated positioning once this skill has shown what a competitor's copy actually claims.",
      },
      {
        href: "/marketing-prompts/case-study-prompt",
        label: "case study prompt",
        description: "A natural companion for sorting your own proof points into on record, measured or inferred, the same discipline this skill applies to a competitor's claims.",
      },
      {
        href: "/tools/readability-score-checker",
        label: "readability score checker",
        description: "For checking how easily the quoted claims in a competitor's copy actually read, once the audit has pulled them out.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation",
        label: "FTC Policy Statement Regarding Advertising Substantiation",
        description: "The regulatory standard behind why an unsubstantiated superlative claim is treated as a genuine red flag, not a stylistic quirk.",
      },
      {
        href: "https://www.nngroup.com/articles/powered-by-ai-is-not-a-value-proposition/",
        label: "Nielsen Norman Group: Powered By AI Is Not a Value Proposition",
        description: "An independent explainer distinguishing a real value proposition from a vague technology claim, the same test this skill applies to the value proposition clarity dimension.",
      },
      {
        href: "https://cxl.com/blog/competitive-analysis/",
        label: "CXL: How To Do a Competitive Analysis",
        description: "A methodology reference for structured competitive research, including the caution that what works for a competitor will not necessarily work for you.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a messaging audit.",
      },
    ],
  },

  tags: ["marketing", "competitor analysis", "positioning", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
