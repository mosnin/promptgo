import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Brand Voice Consistency Check

Use this skill whenever you are asked to write or review marketing copy (an email,
a landing page, an ad, a social post) and the brand's voice needs to stay
consistent with everything else that brand has published.

## Before you write or review anything

Ask for, or locate, the brand's actual voice reference material if it exists:
a style guide, a list of "we say this, not that" pairs, or a handful of
previously approved pieces of copy. Do not invent a voice from the brand name
alone. A brand called "Northlane Outdoors" tells you nothing reliable about
whether that brand is playful or formal; guessing from the name is exactly the
kind of unchecked assumption this skill exists to prevent.

If no reference material exists, say so explicitly in your output rather than
proceeding as if a voice had been defined. Offer to draft a first tone
description sourced from the specific inputs the user does give you (past
copy, a stated audience, explicit adjectives), and label it clearly as a
draft, not a confirmed standard.

## Checking a piece of copy against a voice

Run the piece against \`reference/voice-checklist.md\`. That file has six
concrete, checkable dimensions (sentence length pattern, contraction use,
second person address, humour, jargon tolerance, exclamation use). For each
one:

1. State the brand's actual position on that dimension, cited from the
   reference material you were given (quote the exact source line where
   possible).
2. State whether the piece being checked matches it.
3. If it does not match, quote the specific sentence that breaks the pattern
   and rewrite only that sentence, not the whole piece.

Do not produce a vague "this feels off-brand" comment. Every flagged issue
must trace to one of the six checklist dimensions and a specific sentence.

## Writing new copy in a known voice

Once the voice is established (from real reference material, not assumed),
draft the requested copy, then self-check it against the same six dimensions
before returning it. State which dimensions you checked in your reply so the
person you're writing for can see the standard was actually applied, not just
claimed.

## What this skill does not do

It does not invent brand facts, offers, pricing or claims that were not given
to you. Voice is how something is said; it is never a licence to change what
is being said. If the requested copy needs a fact you were not given (a price,
a specific feature, a date), ask for it instead of filling it in.
`;

const VOICE_CHECKLIST_MD = `# Voice checklist: six checkable dimensions

Use this alongside \`SKILL.md\`. Each dimension below is written as a spectrum
with two ends, not a single "correct" answer, because the correct position
depends entirely on the specific brand's actual reference material.

## 1. Sentence length pattern

- One end: short, clipped sentences, frequently under ten words.
- Other end: longer, connected sentences with subordinate clauses.
- What to check: pull three representative sentences from the reference
  material and count words. State the brand's typical range before judging
  the piece against it.

## 2. Contraction use

- One end: contractions throughout ("we're," "don't," "you'll").
- Other end: contractions avoided, full forms used ("we are," "do not").
- What to check: count contractions per hundred words in the reference
  material versus the piece under review.

## 3. Second person address

- One end: speaks directly to the reader as "you" throughout.
- Other end: speaks about the product or company in third person, reader
  address minimal.
- What to check: whether the reference material addresses the reader
  directly, and whether the piece under review does the same.

## 4. Humour and levity

- One end: jokes, wordplay, or a wink are part of the brand's normal register.
- Other end: humour is rare or absent, tone stays measured throughout.
- What to check: does the reference material contain any joke, pun or playful
  aside. If none exists across multiple samples, treat humour as absent by
  default rather than assumed present.

## 5. Jargon and technical language tolerance

- One end: technical or industry terms are used freely, assuming a fluent
  reader.
- Other end: technical terms are defined inline or avoided in favour of plain
  language.
- What to check: pull any technical term from the reference material and see
  whether it is defined on first use or left unexplained.

## 6. Exclamation and emphasis use

- One end: exclamation points and emphatic phrasing appear regularly.
- Other end: emphasis is restrained, exclamation points are rare or absent.
- What to check: count exclamation points per hundred words across the
  reference material.

## How to use this when no reference material exists

State plainly that no reference material was provided, and that a first
voice description is being drafted from the audience and adjectives supplied
directly by the user, then treat that draft as unconfirmed rather than
established. Do not fill in any of the six dimensions from a guess about the
brand name or industry alone.
`;

const meta: SkillMeta = {
  slug: "brand-voice-consistency-skill",
  name: "Brand Voice Consistency Check",
  title: "Brand Voice Consistency Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks marketing copy against a brand's own real voice reference material across six checkable dimensions, and refuses to invent a voice from the brand name alone.",

  seo: {
    primaryKeyword: "brand voice consistency skill",
    keywords: [
      "brand voice consistency skill",
      "free ai skill for brand voice",
      "downloadable brand voice checklist",
      "ai skill to check marketing copy tone",
      "brand voice guide for ai assistant",
    ],
    seoTitle: "Brand Voice Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable brand voice consistency skill that checks marketing copy against a brand's real voice guide across six checkable dimensions.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/voice-checklist.md", content: VOICE_CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check or write brand voice copy reliably default to inventing a plausible-sounding tone from the brand's name or industry when no real style guide is supplied, then present that guess as an established standard. This skill's checklist forces every judgment to trace to a specific line in real reference material, and requires the skill to say plainly when no such material was given rather than proceeding on an assumption.",
  },

  article: {
    intro: [
      "A brand voice consistency skill only earns its name if it can tell the difference between a real style guide and a guess. Handed a brand name and nothing else, most AI assistants will happily invent a tone that sounds plausible and has no relationship to what that brand has actually published before. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file and a six dimension reference checklist the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a brand name alone tells you nothing about tone",
        body: [
          "Two brands can share almost identical names, audiences and price points and still write in completely different voices, one playful and one formal. A model asked to infer tone from a brand name is pattern matching against nothing, which is why this skill's first instruction is to locate or ask for real reference material before writing or judging a single sentence.",
          "When no reference material exists, the skill does not proceed as though a voice had been defined. It says so plainly and offers a labelled draft instead, so nobody downstream mistakes an invented guess for a confirmed standard. That is the difference between a free ai skill for brand voice worth trusting and a template that just sounds confident.",
        ],
      },
      {
        heading: "The six checkable dimensions",
        body: [
          "Every voice judgment in this skill traces back to one of six specific, checkable dimensions: sentence length pattern, contraction use, second person address, humour, jargon tolerance, and exclamation use. Each is written as a spectrum rather than a single correct answer, because the correct position on that spectrum depends entirely on the brand's own real material, not a universal rule.",
          "A downloadable brand voice checklist with named, countable dimensions is what turns 'this feels off-brand' into something checkable: a specific sentence, a specific dimension, a specific mismatch.",
        ],
      },
      {
        heading: "How the review pass works, as an ai skill to check marketing copy tone",
        body: [
          "Given a piece of copy to check, the skill states the brand's actual position on each dimension, cited from the reference material, then states whether the piece matches it. A mismatch gets the exact sentence that breaks the pattern quoted and rewritten, not a wholesale rewrite of the entire piece.",
          "This keeps a review targeted: the parts of a draft that already match the brand's voice are left alone, and only the parts that genuinely drift get touched.",
        ],
      },
      {
        heading: "How the drafting pass works",
        body: [
          "When asked to write new copy rather than review existing copy, the skill establishes the voice from real reference material first, drafts the requested copy, then self-checks its own draft against the same six dimensions before handing it back. Which dimensions were checked is stated in the reply, so the standard being applied is visible rather than merely claimed.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "Voice governs how something is said, never a licence to change what is being said. This skill's instructions explicitly forbid inventing brand facts, offers, pricing or claims that were not supplied, and require asking for a missing fact rather than filling it in with something plausible sounding.",
        ],
      },
      {
        heading: "How to use the downloaded files as a brand voice guide for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file explicitly points to the checklist file by its relative path. Keeping them in the same folder structure they were downloaded in (SKILL.md alongside a reference folder) preserves that reference.",
        ],
      },
    ],
    howTo: {
      name: "How to use the brand voice consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/voice-checklist.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather real reference material",
          text: "Before using the skill, collect a style guide, a few previously approved pieces of copy, or an explicit list of tone adjectives for the brand in question.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the checklist file, then supply your reference material and the copy to check or draft.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have a style guide for the brand?",
        answer:
          "The skill says so explicitly rather than guessing. It offers to draft a first tone description from whatever specific input you do give it, such as past approved copy or a short list of adjectives, and labels that draft clearly as unconfirmed rather than an established standard.",
      },
      {
        question: "Can this skill write copy from scratch, not just review it?",
        answer:
          "Yes. Once a voice is established from real reference material, the skill drafts the requested copy and then self-checks its own draft against the same six dimensions before returning it, stating which dimensions were checked.",
      },
      {
        question: "Does the skill ever invent facts about the brand?",
        answer:
          "No, and its instructions explicitly forbid it. Voice is about how something is said, not what is claimed, so a missing fact like a price or a feature detail should be asked for rather than filled in with a plausible guess.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the brand material you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the six dimension checklist into its own reference file keeps the main instructions file focused on process, while the checklist can be extended with more dimensions later without restructuring the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description: "For a single one-off pass at establishing a brand's tone in prose, rather than a reusable downloadable checklist.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description: "A natural piece of copy to run through this skill's review pass once a voice is established.",
      },
      {
        href: "/writing-prompts/tone-adjustment-prompt",
        label: "tone adjustment prompt",
        description: "For adjusting a single piece of text's tone directly, rather than checking it against a brand's documented voice.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing exactly what changed between a draft and this skill's rewritten version, line by line.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/tone-voice-users/",
        label: "Nielsen Norman Group: Tone and Voice",
        description: "An independent explainer distinguishing a brand's voice from the tone it takes in a specific piece of writing.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "plainlanguage.gov Federal Plain Language Guidelines",
        description: "A real, checkable standard for the plain language end of the jargon tolerance dimension.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to voice review.",
      },
    ],
  },

  tags: ["marketing", "brand voice", "style guide", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: true,
};

export default meta;
