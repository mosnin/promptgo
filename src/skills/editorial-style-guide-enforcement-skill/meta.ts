import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Editorial Style Guide Enforcement Check

Use this skill whenever you are asked to check or edit a piece of writing for
mechanical style compliance in a document, article, or draft, and that
writing needs to follow one specific house style's mechanical rules. This is
not a tone or voice review. It is a check against the concrete, checkable
rules a style guide actually rules on: commas, number formatting,
capitalization, quotation marks, acronyms, dashes, hyphenation and dates.

## Before you check anything

Ask which style guide governs this content, or confirm the one that has
already been supplied. An acceptable answer is a specific, well known
published style guide named directly, for example "Associated Press style"
or "The Chicago Manual of Style, 17th edition", or a specific internal house
style document or rule list the team actually uses.

If nothing has been specified, do not assume a default silently. State
plainly that no style guide was named, offer two or three commonly used
options as a way to prompt a decision, and wait for a confirmed answer before
checking a single sentence. A check performed against an assumed default is
not a real check, it is a guess dressed up as a result, and it will
contradict the team's actual standard as often as it matches it.

## Checking a piece of writing

Once the style guide is confirmed, run the piece against
\`reference/mechanical-rules-checklist.md\`, which lists the categories of
mechanical rule worth checking rather than any one guide's specific ruling,
since rulings vary from guide to guide. For each category that applies to the
piece:

1. State the confirmed guide's actual rule for that category. If you are not
   certain of the guide's exact ruling on an edge case, say so rather than
   guessing at it.
2. Quote the specific sentence, heading, or fragment that appears to violate
   the rule.
3. Name the category and the exact rule it violates in your flag. Never write
   a vague "this looks off" comment; every flagged issue must cite the
   specific rule, not a general impression.
4. Propose the minimal correction, changing only what the rule requires and
   leaving the rest of the sentence untouched.

## What this skill does not do

It does not judge tone, sentence rhythm, or brand voice. Whether a sentence
sounds like the brand or whether a paragraph lands the way it should is a
different job entirely, covered by a voice or line edit skill instead. This
skill's whole job is mechanics, the rules that do not vary with a writer's
mood and that a style guide actually adjudicates in black and white.

It also does not invent a ruling for a case the named guide does not clearly
cover. If the guide is ambiguous or silent on a specific edge case, say so
and ask rather than picking a plausible sounding answer and presenting it as
settled.

## Handling a document with mixed conventions

If a document mixes conventions inconsistently, for example spelling out
some numbers under ten and using numerals for others, flag the inconsistency
itself against the confirmed guide's rule. You may note the document's own
dominant convention as context, but do not silently adopt the more common
form in the document and call it correct. The named guide is the standard
being enforced, not whichever form happens to appear more often already.

## Output format

Return one entry per flagged issue: the category, the exact rule from the
confirmed guide, the quoted fragment, and the minimal proposed correction.
Close with a short note on which categories were checked and which, if any,
did not apply to this piece, so the person reading the review can see the
standard was actually applied in full rather than partially.
`;

const MECHANICAL_RULES_MD = `# Mechanical rule checklist: nine checkable categories

Use this alongside \`SKILL.md\` once a specific style guide has been
confirmed. Each category below names what to check, not the ruling itself,
because the correct ruling depends entirely on which named guide is in
force. Two documents can both be correctly styled and still disagree on
every one of these nine categories, because they follow different guides.

## 1. Serial comma (Oxford comma)

What to check: whether a comma appears before the final "and" or "or" in a
list of three or more items. Associated Press style omits it in a simple
series; The Chicago Manual of Style requires it throughout. Confirm which
applies before flagging either form as an error.

## 2. Number formatting

What to check: whether numbers under a stated threshold (commonly ten, some
guides use nine or one hundred) are spelled out in words and numbers at or
above that threshold are written as numerals, and whether the threshold
itself matches the confirmed guide. Also check that a number starting a
sentence is spelled out regardless of size, which most guides require even
when the same number would be a numeral mid sentence.

## 3. Heading and title capitalization

What to check: whether headings use title case, where most words are
capitalized, or sentence case, where only the first word and proper nouns
are capitalized, and whether that choice is applied consistently across
every heading level in the document, not just the top one.

## 4. Quotation mark placement relative to punctuation

What to check: whether a comma or period sits inside or outside a closing
quotation mark. American convention places them inside; British or logical
convention places them outside based on whether the punctuation is part of
the quoted material. The confirmed guide determines which applies.

## 5. Acronym and abbreviation first use expansion

What to check: whether every acronym is spelled out in full on its first
appearance in the piece, with the abbreviation given immediately after,
before that abbreviation is used unexpanded anywhere later in the same
document. A second, unrelated acronym reusing the same letters needs its own
first use expansion too.

## 6. Em dash and en dash usage

What to check: whether the confirmed guide permits em dashes or en dashes at
all, and if it does, whether spaces surround them, and whether a hyphen, an
en dash, or a word like "to" is used for a range such as a set of years.
Some house styles ban dashes entirely in favor of commas or parentheses;
confirm this before flagging a dash as acceptable or not.

## 7. Hyphenation of compound modifiers

What to check: whether a compound adjective is hyphenated when it sits
before the noun it modifies, such as "a well known author", and left open
when the same words follow the noun, such as "the author is well known",
matching the confirmed guide's own compounding rules and its list of
exceptions.

## 8. Date format

What to check: whether dates follow month, day, year with a comma, such as
"July 31, 2026", or day, month, year with no comma, such as "31 July 2026",
and whether that format is applied consistently everywhere a date appears,
including in captions and footnotes.

## 9. Capitalization of job titles and proper nouns

What to check: whether a job title is capitalized only when it directly
precedes a person's name, such as "Editor Jane Smith" against "Jane Smith,
the editor", per the confirmed guide, and whether a brand or product name in
the piece matches its own official capitalization rather than a generic
sentence case rule.

## How to use this checklist when no guide is confirmed

Do not run any of the nine categories above against an assumed default.
Confirm the specific guide first, using the process in \`SKILL.md\`. A
checklist run against the wrong guide will confidently produce wrong
answers, which is worse for trust in the review than declining to check
until the guide is named.
`;

const meta: SkillMeta = {
  slug: "editorial-style-guide-enforcement-skill",
  name: "Editorial Style Guide Enforcement",
  title: "Editorial Style Guide Enforcement Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that checks a document's mechanical style, commas, numbers, capitalization, quotation marks, acronyms, dashes, hyphenation and dates, against a specific named style guide, and asks rather than guessing when none has been given.",

  seo: {
    primaryKeyword: "editorial style guide enforcement skill",
    keywords: [
      "editorial style guide enforcement skill",
      "free ai skill for editorial style checks",
      "downloadable style guide enforcement checklist",
      "ai skill to check mechanical style rules",
      "house style guide checker for ai assistant",
    ],
    seoTitle: "Editorial Style Guide Enforcement Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable editorial style guide enforcement skill that checks mechanical rules like commas, numbers and headings against your named style guide.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/mechanical-rules-checklist.md", content: MECHANICAL_RULES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Models asked to check a document's mechanical style reliably default to an unstated blend of common conventions when no style guide is named, then present the result as correct rather than as one possible standard among several. This skill's process requires the specific guide to be confirmed before a single rule is applied, and requires every flagged issue to cite the exact rule and guide it comes from rather than a general impression of what looks off.",
  },

  article: {
    intro: [
      "An editorial style guide enforcement skill only earns its name if it enforces a real, named style guide instead of a guess. Handed a draft and no stated standard, most AI assistants quietly apply whatever mechanical style feels default to them and then declare the result correct. This skill refuses that shortcut. Before it flags a single issue, it requires the specific style guide in force, either a well known published guide named directly or the team's own house rules, and it says so plainly when neither has been given.",
      "It ships as two plain text files: a main instructions file and a nine category reference checklist the instructions point to, covering the mechanical rules that actually vary between published style guides, from the serial comma to date format. Both are previewable in full on this page before you download the zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "This is a free ai skill for editorial style checks built specifically for mechanics, the countable rules a style guide actually adjudicates, not for whether a sentence sounds like the brand. A separate check answers that second question; this skill answers the first one, and only against whichever guide the team actually names.",
    ],
    sections: [
      {
        heading: "Why an assumed default style is not a real check",
        body: [
          "A model with no stated style guide does not refuse to produce an opinion, it produces one anyway, usually a hybrid of the most common conventions it has seen across countless documents. That hybrid has no relationship to what a specific publication or team actually requires, and presenting it as a finished check invites confident corrections that contradict the real standard as often as they match it.",
          "This skill's first instruction is to confirm the guide before checking anything, because a rule cited from the wrong style guide is worse than no rule at all: it looks authoritative while being wrong for the document in front of it.",
        ],
      },
      {
        heading: "Mechanics versus tone: why this is not a brand voice check",
        body: [
          "This skill and a brand voice check answer two different questions about the same piece of writing. Mechanics asks whether a comma, a number, a capital letter or a quotation mark follows the confirmed style guide's rule, a question with a single correct answer once the guide is named. Tone asks whether the sentence sounds like the brand, a question with no single correct answer and no rule to cite, only a reference sample to compare against.",
          "Running a mechanical check as though it were a tone check, or the reverse, produces exactly the vague feedback both are meant to prevent. For the tone side of that pair, use the brand voice consistency skill directly rather than asking this skill to do a job its checklist was never built to answer.",
        ],
      },
      {
        heading: "The nine checkable mechanical rule categories",
        body: [
          "The reference file behind this skill is a downloadable style guide enforcement checklist covering nine categories: serial comma use, number formatting, heading and title capitalization, quotation mark placement relative to punctuation, acronym first use expansion, em dash and en dash usage, hyphenation of compound modifiers, date format, and capitalization of job titles and proper nouns.",
          "Each category names what to check, never a single universal answer, since the correct answer for every one of the nine depends entirely on which guide is confirmed. Two documents can both be styled correctly and still disagree on every category, because they follow different guides.",
        ],
      },
      {
        heading: "How the review pass cites every rule it flags",
        body: [
          "As an ai skill to check mechanical style rules, every flagged issue follows the same four part shape: the confirmed guide's actual rule for that category, the exact sentence or fragment that appears to break it, a plain statement of the rule it violates, and a minimal correction that changes only what the rule requires.",
          "That structure is what turns a vague 'this looks off' comment into something checkable: a named category, a specific rule, and a quoted fragment anyone can verify against the guide itself.",
        ],
      },
      {
        heading: "What happens when no style guide is specified",
        body: [
          "If a request arrives with a document to check but no named style guide, the skill does not proceed on an assumed default. It states plainly that no guide was specified, names a small number of commonly used options such as Associated Press style or The Chicago Manual of Style, and waits for a confirmed answer before checking a single sentence.",
          "The same discipline applies mid review. If a specific edge case is ambiguous or simply not covered by the confirmed guide, the skill says so rather than inventing a plausible sounding ruling and presenting it as settled.",
        ],
      },
      {
        heading: "Using the downloaded files as a house style guide checker for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file points to the reference checklist by its relative path inside the archive. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link once the files are unzipped on your own machine.",
        ],
      },
    ],
    howTo: {
      name: "How to use the editorial style guide enforcement skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/mechanical-rules-checklist.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Confirm the style guide in force",
          text: "Decide, or ask your team, which named style guide or house rule document applies to the piece before running any check against it.",
        },
        {
          name: "Hand both files to your assistant with the draft",
          text: "Keep the folder structure intact so the instructions file can point to the checklist, then supply the confirmed style guide and the piece of writing to check.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't name a style guide before checking a document?",
        answer:
          "The skill will not proceed on an assumed default. It states plainly that no style guide was specified, offers a short list of commonly used named guides as a starting point, and waits for a confirmed answer before checking a single sentence of the document.",
      },
      {
        question: "Does this skill judge tone or brand voice as well as mechanics?",
        answer:
          "No. It checks only mechanical rules such as commas, numbers, capitalization, quotation marks, acronyms, dashes, hyphenation and dates. Tone and brand voice are a separate job with a separate skill, since a sentence can be mechanically correct and still sound nothing like the brand, or the reverse.",
      },
      {
        question: "Which style guides can this skill check a document against?",
        answer:
          "Any specific, named guide you supply, whether a well known published one such as Associated Press style or The Chicago Manual of Style, or an internal house style document your team already uses. The skill does not have a built in default; it always checks against whichever guide is confirmed for that document.",
      },
      {
        question: "Does the skill invent a ruling when the guide is ambiguous about a specific case?",
        answer:
          "No, and its instructions explicitly forbid it. If the confirmed guide is silent or unclear on a specific edge case, the skill says so rather than picking a plausible sounding answer and presenting it as a settled rule, since a confident wrong ruling is worse than an honest gap.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the document or style guide you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading them?",
        answer:
          "Yes. Both files are plain text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing the checklist categories or the instructions themselves happens afterward in your own editor.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-skills/brand-voice-consistency-skill",
        label: "brand voice consistency skill",
        description: "The companion check for tone and voice, a different job from this skill's mechanical rule enforcement.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "A one-off pass for catching typos and consistency slips, useful before or after a full style guide check.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description: "For sentence level craft questions a style guide never rules on, a separate job from mechanical enforcement.",
      },
      {
        href: "/tools/text-case-converter",
        label: "text case converter",
        description: "A quick way to fix a heading's capitalization once this skill has flagged which convention the guide requires.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.chicagomanualofstyle.org/",
        label: "The Chicago Manual of Style",
        description: "The published guide behind many of the serial comma, hyphenation and capitalization rulings this skill checks.",
      },
      {
        href: "https://www.apstylebook.com/",
        label: "Associated Press Stylebook",
        description: "The published guide behind many newsroom number formatting and date format conventions this skill checks.",
      },
      {
        href: "https://www.merriam-webster.com/",
        label: "Merriam-Webster",
        description: "An independent reference for confirming a specific word's standard spelling and hyphenation.",
      },
      {
        href: "https://owl.purdue.edu/owl/purdue_owl.html",
        label: "Purdue Online Writing Lab",
        description: "An independent, widely used reference for grammar and mechanics questions that sit alongside a named style guide.",
      },
    ],
  },

  tags: ["writing", "editing", "style guide", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
