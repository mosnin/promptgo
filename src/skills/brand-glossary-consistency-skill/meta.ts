import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Brand Glossary Consistency Check

Use this skill whenever you are asked to review or write copy (a landing page, a
help article, an email, a product description) and that copy needs to use the
same standardized terms the company has already decided on for its own
product name, feature names and category terms.

This is a terminology check, not a tone check. It never asks whether a
sentence sounds like the brand; it only asks whether the sentence uses the
one exact word the company has standardized on for a specific thing.

## Before you check or write anything

Ask for, or locate, the company's real glossary: a list of standardized
terms, each with a short definition and the competitor or generic synonyms
that should not be used instead. Use \`reference/glossary-entry-format.md\` as
the shape that glossary should already exist in.

Do not invent what a company calls its own product from the product name or
industry alone. A company might call its product "the platform," "the app,"
or "the console," and there is no way to guess correctly; guessing is exactly
the shortcut this skill exists to prevent. If no real glossary is supplied,
say so explicitly and stop before flagging anything, rather than proceeding
against assumed terms.

## Checking a piece of copy for terminology drift

For every glossary entry that is relevant to the copy under review:

1. Search the copy for the standardized term itself, for any of the terms
   marked "not to use instead" on that glossary entry, and for generic or
   competitor synonyms that describe the same thing.
2. If a drifting term appears, quote the exact sentence containing it, quote
   the exact drifting word or phrase, and state the correct standardized term
   from the glossary entry that should replace it. Cite the glossary entry by
   its term name so the correction traces back to a real source, not a
   preference.
3. If the same thing is named with two different terms in different places
   within the same piece of copy, even if one of the two is the correct
   standardized term, flag that inconsistency separately. Internal drift
   inside one piece is a defect even before checking it against the glossary.

Do not flag a term that is not on the glossary. An unlisted word is outside
this skill's scope, not an error.

## Writing new copy against a glossary

When asked to draft copy rather than review it, use only the standardized
terms from the glossary for anything the glossary covers, then run the
finished draft back through the check above before returning it, so the
same discipline applies to copy you write as to copy you review.

## How this differs from a brand voice check

A brand voice check asks how something is said: sentence length, contractions,
humour, formality. This skill asks which exact word is used for a specific
named thing, regardless of how formal or casual the surrounding sentence is.
A piece of copy can pass a voice check and still fail this check by calling
the product "the tool" in one paragraph and "the platform" in the next. Run
both checks when both a documented voice and a real glossary exist; they
catch different defects and neither substitutes for the other.

## What this skill does not do

It does not invent glossary entries, guess a company's preferred term from
its name or industry, or flag a synonym that is not listed against a real
glossary entry. It also does not judge tone, formality or persuasiveness;
that is a separate check with a separate skill. If no glossary exists yet,
this skill's job is to say so, not to draft one from a guess.
`;

const GLOSSARY_FORMAT_MD = `# Glossary entry format

Use this alongside \`SKILL.md\`. Every entry a company supplies should carry
four parts: the standardized term itself, a short definition of the thing it
names, the terms that should not be used instead, and the reason drift
matters for that specific term. A glossary entry missing the "not to use"
list is still usable, but checking against it will catch fewer real drifts,
since near synonyms are exactly what slips into copy unnoticed.

## The four parts

- **Term**: the exact standardized word or phrase, written exactly as it
  should appear in copy, including capitalization.
- **Definition**: one sentence stating what the term refers to, specific
  enough that a reader who has never seen the product would still know what
  is being named.
- **Not to use instead**: every competitor name, generic synonym or older
  internal name that has been seen replacing this term in copy. This list is
  what a check is actually run against, so it should be as complete as the
  company can make it, not just the obvious candidates.
- **Why it matters**: a short note on the cost of drift for this specific
  term, such as confusing a feature with a competitor's similarly named
  feature, or reviving a retired product name customers no longer recognize.

## Worked example: the product name

- Term: Northlane Studio
- Definition: the company's flagship design application, sold as a single
  named product rather than a suite.
- Not to use instead: "the platform," "the app," "the tool," "the software,"
  or the product's former beta name, "Northlane Draft."
- Why it matters: "the platform" is also how a direct competitor refers to
  its own product in comparison content, so using it here makes search
  snippets and support articles ambiguous about which product is meant.

## Worked example: a feature name

- Term: Smart Layout
- Definition: the feature that automatically repositions design elements
  when a canvas is resized.
- Not to use instead: "auto layout," "responsive layout," or "the resizing
  feature," all of which are either a competitor's feature name or a
  generic description that does not match what support documentation calls
  the feature.
- Why it matters: support articles and in-product tooltips already use
  "Smart Layout" verbatim, so marketing copy that uses a different phrase
  breaks the connection between an ad and the feature a reader later finds
  inside the product.

## Worked example: a category term

- Term: design system
- Definition: the company's word for the shared set of components, tokens
  and rules a team builds and reuses across projects.
- Not to use instead: "style guide," "brand kit," or "component library"
  used as if interchangeable with "design system," even though each of
  those is a real, narrower term the company also uses for a different
  thing.
- Why it matters: swapping these terms for each other inside one company's
  copy does not just sound inconsistent, it misdescribes the product, since
  the company's design system is deliberately broader than any one of the
  narrower terms.

## Worked example: an audience or plan term

- Term: Studio Teams
- Definition: the paid plan tier built for multiple named seats collaborating
  in one shared workspace.
- Not to use instead: "the business plan," "the pro plan," or "the team
  tier," none of which is the plan's actual billed name.
- Why it matters: pricing pages, invoices and the billing dashboard all show
  "Studio Teams" as the plan name, so marketing copy using a different label
  creates a mismatch a customer notices at the exact moment they are about
  to pay.

## When a glossary has no entry for something

Treat any term not listed as outside this skill's scope. Do not extend the
"not to use" logic to a word simply because it resembles a listed term; only
flag what a real entry actually names.
`;

const meta: SkillMeta = {
  slug: "brand-glossary-consistency-skill",
  name: "Brand Glossary Consistency Check",
  title: "Brand Glossary Consistency Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks copy for terminology drift against a company's real glossary of standardized product, feature and category terms, and quotes the exact fix for every flagged term.",

  seo: {
    primaryKeyword: "brand glossary consistency skill",
    keywords: [
      "brand glossary consistency skill",
      "free ai skill for terminology consistency",
      "downloadable brand glossary checklist",
      "ai skill to check terminology drift",
      "brand terminology guide for ai assistant",
    ],
    seoTitle: "Brand Glossary Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable brand glossary consistency skill that checks copy for terminology drift against a company's real glossary of standardized terms.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/glossary-entry-format.md", content: GLOSSARY_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check copy for consistent terminology reliably reach for a generic or competitor synonym instead of a company's actual standardized term whenever the real glossary was not supplied, because a plausible sounding word fills the gap that only a real source can. This skill's instructions require a real glossary of standardized terms before any check runs, and require every flagged term to quote the exact drifting word alongside the correct term cited from a specific glossary entry.",
  },

  article: {
    intro: [
      "A brand glossary consistency skill only earns its name if it can tell the difference between a company's actual standardized term and a synonym that merely sounds close enough. Handed a piece of copy and no glossary, most AI assistants will happily accept whatever word the copy already uses, or worse, swap in a generic term of their own. This skill is built to check terminology drift against a real glossary instead, and to say plainly when no such glossary exists.",
      "It ships as two plain text files: a main instructions file and a glossary entry format reference the instructions point to, with four worked examples covering a product name, a feature name, a category term and a plan name. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "Terminology and tone are not the same defect. A sentence can be perfectly on brand in tone and still call the product by three different names across one page. This skill exists for that second, narrower failure.",
    ],
    sections: [
      {
        heading: "Why a company name alone tells you nothing about its own terms",
        body: [
          "Two companies selling nearly identical products can standardize on completely different words for the same kind of thing, one calling it a workspace and the other a project. A model asked to check terminology without a real glossary is pattern matching against nothing, which is why this skill's first instruction is to locate or request the actual glossary before flagging a single word.",
          "When no glossary exists, the skill does not proceed against assumed terms. It says so plainly rather than guessing at what a company probably calls its own product, because a guess presented as a finding is worse than no check at all. That is the standard a free ai skill for terminology consistency has to meet to be worth trusting.",
        ],
      },
      {
        heading: "The glossary entry format this skill checks against",
        body: [
          "Every term this skill can flag traces back to a real glossary entry with four parts: the standardized term, a short definition, the terms not to use instead, and why drift on that specific term matters. The reference file includes four worked examples, a product name, a feature name, a category term and a plan name, so the format is concrete rather than abstract.",
          "A downloadable brand glossary checklist built this way turns a vague sense that something reads oddly into something checkable: a named term, a listed alternative, a specific sentence where the swap happened. That is the whole job a brand glossary consistency skill has to do well to be worth downloading.",
        ],
      },
      {
        heading: "How a review pass works, as an ai skill to check terminology drift",
        body: [
          "Given a piece of copy, the skill searches it against each relevant glossary entry for the standardized term itself and for anything on that entry's not to use list. Every flag quotes the exact drifting sentence, the exact drifting word, and the correct standardized term cited from the matching glossary entry, so the correction traces back to a real source rather than a preference.",
          "The skill also checks for drift within a single piece: two different terms used for the same thing in different paragraphs, even when one of the two is technically correct. That inconsistency is a defect on its own, independent of which term the glossary prefers.",
        ],
      },
      {
        heading: "How this differs from the brand voice consistency skill",
        body: [
          "Tone is how something is said. Terminology is which exact word is used for a specific named thing. A brand voice consistency skill checks sentence length, contractions, humour and formality against a style guide; this skill checks whether the product, feature and category names in a piece of copy match the company's own glossary, regardless of how formal or casual the sentence around them is.",
          "A piece of copy can pass a voice check cleanly and still fail this check by calling a feature by its old internal name in one paragraph and its current name in the next. Run both checks when both a documented voice and a real glossary exist, since they catch different defects and neither one substitutes for the other.",
        ],
      },
      {
        heading: "Writing new copy from a real glossary, as a brand terminology guide for ai assistant work",
        body: [
          "When asked to draft copy rather than review it, the skill uses only the standardized terms the glossary covers, then runs the finished draft back through the same check before handing it back. This keeps drafting and reviewing held to one standard rather than treating a first draft as exempt from the check applied to everything that comes after it.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not invent glossary entries, guess a company's preferred term from its name or industry, or flag a synonym that is not listed against a real entry. An unlisted word is treated as outside scope rather than assumed wrong. It also never substitutes for a tone check; the two are separate instruction packs for two separate defects.",
        ],
      },
    ],
    howTo: {
      name: "How to use the brand glossary consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/glossary-entry-format.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Assemble the real glossary",
          text: "Before using the skill, write down the company's actual standardized terms in the four part format shown in the reference file: term, definition, terms not to use instead, and why it matters.",
        },
        {
          name: "Hand both files and the glossary to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the format reference, then supply your glossary alongside the copy to check or draft.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have a real glossary for the company?",
        answer:
          "The skill says so explicitly rather than guessing at the company's preferred terms. It stops before flagging anything against assumed terminology, because a guess presented as a finding would be a fabricated source, not a real check against real standards.",
      },
      {
        question: "How is this different from the brand voice consistency skill already on this site?",
        answer:
          "Voice is how something is said: sentence length, contractions, humour, formality. This skill checks which exact word names a specific product, feature or category, regardless of tone. A piece can pass a voice check and still fail this check by using two different names for the same feature.",
      },
      {
        question: "Does the skill flag any synonym it thinks sounds off?",
        answer:
          "No. It only flags a term that appears on a real glossary entry's not to use list, or a case where two different terms are used for the same thing within one piece of copy. A word not covered by any glossary entry is treated as outside scope, not an error.",
      },
      {
        question: "Can this skill write new copy, not just review existing copy?",
        answer:
          "Yes. Given a real glossary, the skill drafts requested copy using only the standardized terms it covers, then runs the finished draft back through the same terminology check before returning it, so drafting and reviewing follow one standard.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the glossary or copy you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the glossary entry format and its worked examples into their own reference file keeps this brand glossary consistency skill's main instructions focused on the check itself, while the format file can gain more worked examples later without restructuring the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/marketing-skills/brand-voice-consistency-skill",
        label: "brand voice consistency skill",
        description: "The tone counterpart to this skill: checks how copy sounds against a real style guide rather than which exact term it uses.",
      },
      {
        href: "/marketing-prompts/product-description-prompt",
        label: "product description prompt",
        description: "A natural piece of copy to run through this skill's terminology check once a real product glossary exists.",
      },
      {
        href: "/skills/marketing-skills/utm-campaign-naming-skill",
        label: "utm campaign naming skill",
        description: "For keeping campaign parameter names consistent, a narrower naming discipline than a full product and feature glossary.",
      },
      {
        href: "/skills/writing-skills/editorial-style-guide-enforcement-skill",
        label: "editorial style guide enforcement skill",
        description: "For grammar, punctuation and formatting rules, a different kind of consistency than the exact terms this skill checks.",
      },
    ],
    externalLinks: [
      {
        href: "https://developers.google.com/style/word-list",
        label: "Google Developer Documentation Style Guide: Word List",
        description: "A real, public example of a controlled vocabulary specifying one preferred term over its common alternatives.",
      },
      {
        href: "https://learn.microsoft.com/en-us/style-guide/welcome/",
        label: "Microsoft Writing Style Guide",
        description: "An independent style and terminology guide showing how a large organisation documents its standardized language.",
      },
      {
        href: "https://www.nngroup.com/articles/consistency-and-standards/",
        label: "Nielsen Norman Group: Consistency and Standards",
        description: "The usability heuristic explaining why consistent terminology reduces the effort a reader spends interpreting a page.",
      },
      {
        href: "https://digital.gov/guides/plain-language",
        label: "Digital.gov: Plain Language Guides",
        description: "Federal guidance on using one clear, consistent term for a concept instead of switching between near synonyms.",
      },
    ],
  },

  tags: ["marketing", "brand terminology", "glossary", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
