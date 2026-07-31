import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# List Parallelism Audit

Use this skill whenever you are asked to review a document, article, README, or set
of instructions and check whether its bulleted or numbered lists maintain parallel
grammatical structure, meaning every item in a list takes the same grammatical form.

## What counts as a parallel structure break

A list is parallel when every item follows the same grammatical pattern: all items
open with an imperative verb ("Open the file," "Save your work"), all items are noun
phrases ("Employee satisfaction," "Revenue growth"), all items are gerund phrases
("Reviewing the contract," "Confirming the date"), or all items are complete
sentences with a subject and a verb ("The team reviewed the draft."). A list breaks
parallel structure when one or more items switch to a different grammatical form
partway through, even though each item reads correctly when judged on its own.

This is a real, checkable defect, not a style preference. A reader scanning a list
relies on the pattern the first two or three items establish to predict how the rest
will read. An item that breaks the pattern forces the reader to stop and re-parse it,
which is why the defect survives an ordinary line-by-line proofread: each sentence is
grammatically fine, the failure only exists between items.

## Step 1: quote the exact list

Copy the list under review exactly as written, item by item, before analysing
anything. Do not paraphrase or summarise it first. An audit built from a paraphrase
can miss the exact wording that causes the break, or introduce a break that was not
actually in the original.

## Step 2: identify the dominant pattern

Read every item and classify its grammatical form: imperative verb opening, noun
phrase, gerund phrase, complete sentence, or something else. Count how many items
fall into each form. The dominant pattern is the form the clear majority of items
use, not simply the form the first item uses. A list that opens with one odd item and
then settles into a consistent pattern for the rest still has a real dominant
pattern, different from its opening item.

## Step 3: flag the item or items that break the dominant pattern

Once the dominant pattern is identified, name the exact item, or items, that do not
match it. Quote the flagged item exactly as written. State which grammatical form the
majority uses and which form the flagged item actually uses, so the mismatch is
specific rather than a vague sense that something reads oddly.

## Step 4: rewrite the flagged item without changing its meaning

Propose a rewrite of only the flagged item, converted into the dominant pattern. Do
not rewrite items that already match the pattern, and do not change the facts,
claims, or scope of the flagged item, only its grammatical form. If converting the
item into the dominant form would drop information or change what it means, say so
and offer the narrowest rewrite that preserves the original meaning, even if that
rewrite is imperfectly parallel.

## When there is no dominant pattern to establish

Not every list needs to be forced into one shape. Two situations call for
recognising that no dominant pattern exists rather than inventing one.

1. Too few items. A list of two items does not have enough items to establish a
   majority. If the two items differ in grammatical form, name both forms and note
   that a two item list is too short to call either one dominant.
2. Genuinely mixed by design. Some lists intentionally pair a heading with a
   sub-detail, such as a table of contents entry followed by a one line description
   of what that section covers. Forcing every item into one grammatical shape there
   would remove information the list is meant to convey. State plainly that the list
   is mixed by design and explain why, rather than flagging a break that is not
   actually a defect.

## What this skill does not do

It does not rewrite a list's content, tone, or level of detail, and it does not flag
a list simply because its items are different lengths, only because they take
different grammatical forms. It does not touch lists that already share a dominant
pattern, even an unusual one; a list of sentence fragments or an all lowercase list
is fine as long as every item follows the same pattern. It also does not judge
whether the list should exist at all, only whether the list that does exist is
internally consistent.
`;

const WORKED_EXAMPLES_MD = `# Worked examples: parallel structure across four list forms

Use these alongside \`SKILL.md\`. Each example shows a broken list quoted in full,
names the dominant pattern, flags the specific item that breaks it, and gives a
rewrite that fixes only that item. The final two examples show lists that should not
be flagged at all.

## Example 1: verb-led list (imperative form)

Broken list:

1. Open the settings panel.
2. Click the security tab.
3. You should enable two factor authentication.
4. Save your changes.

Dominant pattern: imperative verb opening ("Open," "Click," "Save"), three of four
items.

Flagged item: item 3, "You should enable two factor authentication," switches to a
second person statement rather than a direct instruction.

Fix: "Enable two factor authentication." This keeps the same instruction and drops
only the "you should" framing that breaks the imperative pattern the other three
items already use.

## Example 2: noun-phrase list

Broken list:

- Employee satisfaction
- Revenue growth
- We reduced customer churn
- Market share

Dominant pattern: noun phrase, three of four items.

Flagged item: "We reduced customer churn" is a complete sentence with a subject and a
past tense verb, not a noun phrase.

Fix: "Customer churn reduction," or "Reduced customer churn" if the list is meant to
read as a set of achievements rather than neutral metric names. Either rewrite keeps
the original claim, that churn went down, without asserting it as a full sentence the
way the other items do not.

## Example 3: complete-sentence list

Broken list:

1. The team reviewed the draft on Monday.
2. Legal signed off by Wednesday.
3. Final formatting.
4. The release went out on Friday.

Dominant pattern: complete sentence with a subject and a verb, three of four items.

Flagged item: item 3, "Final formatting," is a noun phrase fragment with no subject
or verb.

Fix: "The design team finished final formatting on Thursday," if that detail is
available, or at minimum "Formatting was finished before release" to supply a verb.
Flag to the person you hand this back to that a missing detail, who did the
formatting and when, had to be assumed or noted as missing, since a bare noun phrase
does not carry that information the way the other items do.

## Example 4: gerund-led list

Broken list:

- Reviewing the contract terms
- Confirming the delivery date
- The vendor must sign the agreement
- Filing the signed copy

Dominant pattern: gerund phrase opening, three of four items.

Flagged item: "The vendor must sign the agreement" is a complete sentence with a
named subject and a modal verb, not a gerund phrase.

Fix: "Getting the vendor's signature on the agreement." This preserves the
requirement, that the vendor needs to sign, while matching the gerund pattern the
surrounding items use.

## Example 5: a list too short to have a dominant pattern

List under review:

- Q3 roadmap
- Budget review

This list has only two items. Both happen to be short noun phrases here, but even if
they differed in form, two items are not enough to establish a majority. Note that
the list is too short to call anything dominant, and move on without flagging it.

## Example 6: a list that is mixed by design

List under review:

- Getting started: install the CLI and authenticate.
- Configuration: where the config file lives and what each key does.
- Troubleshooting: the three most common errors and their fixes.

Each item pairs a short heading with a one line description of what that section
covers. Forcing every item into a single grammatical shape, such as making every item
a bare noun phrase, would remove the description half of each item, which is the part
doing the actual work for the reader. State plainly that this list is a set of
heading-plus-description pairs, not a broken parallel list, and leave it as written.
`;

const meta: SkillMeta = {
  slug: "list-parallelism-audit-skill",
  name: "List Parallelism Audit",
  title: "List Parallelism Audit Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that quotes a document's exact lists, names the dominant grammatical pattern the majority of items follow, and flags only the specific item that breaks it with a meaning-preserving rewrite.",

  seo: {
    primaryKeyword: "list parallelism audit skill",
    keywords: [
      "list parallelism audit skill",
      "parallel structure checker for lists",
      "ai skill to fix broken bullet points",
      "downloadable checklist for parallel structure",
      "how to check parallel structure in a list",
    ],
    seoTitle: "List Parallelism Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable list parallelism audit skill that quotes each broken list, names its dominant pattern, and rewrites only the item that breaks it.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-examples.md", content: WORKED_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a list reliably check each item for correctness on its own and miss a break in parallel structure, because a sentence like 'you should enable two factor authentication' reads as a fine sentence in isolation even when it breaks the imperative pattern the surrounding items establish. This skill forces the check to run against the list as a set, naming the dominant pattern before any single item can be flagged.",
  },

  article: {
    intro: [
      "A list parallelism audit skill exists to catch a specific defect that a spellchecker and a general grammar checker both miss: a bulleted or numbered list where every item reads correctly on its own, but one item quietly breaks the grammatical pattern the rest of the list establishes. A checklist that opens with three imperative verbs and then drifts into a full sentence is not a style quirk, it is a checkable structural error, and this skill exists to name it precisely rather than gesture at a vague sense that a list feels uneven.",
      "It ships as two plain text files: a main instructions file that walks through quoting the list, identifying its dominant pattern, and flagging the item that breaks it, and a worked examples reference file covering verb-led, noun-phrase, gerund-led and complete-sentence lists side by side. Used this way, it functions as an ai skill to fix broken bullet points without touching items that were never broken in the first place. Both files are previewable in full on this page before you download the .zip.",
    ],
    sections: [
      {
        heading: "Why an item can read fine alone and still break the list",
        body: [
          "A single list item almost never looks wrong in isolation. \"You should enable two factor authentication\" is a correct sentence on its own. The defect only becomes visible when that item sits inside a list of otherwise imperative instructions: \"Open the settings panel,\" \"Click the security tab,\" \"Save your changes.\" Read together, the third item breaks a pattern the first two already set.",
          "This is why the break survives a normal proofread. A line-by-line read checks each sentence for correctness, not for whether it matches the shape of the sentences around it. This list parallelism audit skill checks the list as a set, which is the only way this specific defect gets caught.",
        ],
      },
      {
        heading: "What a parallel structure checker for lists actually checks",
        body: [
          "Four grammatical forms account for most real-world lists: imperative verb openings (\"Open,\" \"Click,\" \"Save\"), noun phrases (\"Revenue growth,\" \"Employee satisfaction\"), gerund phrases (\"Reviewing the contract,\" \"Confirming the date\"), and complete sentences with a subject and a verb. A parallel structure checker for lists classifies every item into one of these forms, then counts which form the clear majority use. That majority is the dominant pattern, not whatever form the first item happens to use, because a list that opens with one odd item and settles into consistency for the rest still has a real dominant pattern. Only after the pattern is established does the skill flag anything.",
        ],
      },
      {
        heading: "Worked example: a verb-led checklist that drifts mid-list",
        body: [
          "Take a four-step checklist: \"Open the settings panel,\" \"Click the security tab,\" \"You should enable two factor authentication,\" \"Save your changes.\" Three of the four items open with an imperative verb, so that is the dominant pattern. Item three breaks it by switching to a second-person statement.",
          "The fix touches only that item: \"Enable two factor authentication.\" The instruction does not change, only its grammatical form, and the other three items are left exactly as written. reference/worked-examples.md carries this example in full, alongside a noun-phrase, a gerund-led and a complete-sentence version of the same break.",
        ],
      },
      {
        heading: "Worked example: a noun-phrase list broken by a full sentence",
        body: [
          "A metrics list reading \"Employee satisfaction,\" \"Revenue growth,\" \"We reduced customer churn,\" \"Market share\" has the same defect in a different form. Three items are bare noun phrases naming a metric; the third is a full sentence with a subject and a past-tense verb. The fix converts only that item into a noun phrase, \"Customer churn reduction,\" without changing the underlying claim that churn went down.",
        ],
      },
      {
        heading: "How to check parallel structure in a list with no dominant pattern",
        body: [
          "Not every list needs forcing into one shape. Two situations call for saying plainly that no dominant pattern exists rather than inventing one. A list with only two items does not have enough items to establish a majority; if the two differ in form, the skill names both forms and says the list is too short to call either one dominant. A list that pairs a short heading with a one-line description, such as a table of contents entry followed by what that section covers, is often mixed by design, and forcing every item into one grammatical shape would strip out the description doing the actual work. Knowing how to check parallel structure in a list without forcing a pattern onto one that never had one is as much a part of this skill as flagging a real break.",
        ],
      },
      {
        heading: "Why this is a downloadable checklist for parallel structure, not a general grammar check",
        body: [
          "A general grammar or style pass catches a misplaced comma or a passive sentence, but correctness inside a single item says nothing about whether that item matches the items around it. This is a narrower tool: a downloadable checklist for parallel structure that only looks at how list items relate to each other as a set, and it deliberately does nothing else, no tone judgment, no content rewrite.",
        ],
      },
    ],
    howTo: {
      name: "How to use the list parallelism audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-examples.md directly on this page before downloading, so you can see the exact worked examples this skill uses before handing it to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Give your assistant the document with its lists intact",
          text: "Paste the full document, or the specific list you want checked, keeping the original bullets or numbers exactly as written rather than retyping them.",
        },
        {
          name: "Review the flagged item and the proposed rewrite",
          text: "Confirm the rewrite proposed for the flagged item keeps the original meaning and only changes its grammatical form before you accept it into the document.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly counts as a broken parallel structure in a list?",
        answer:
          "This list parallelism audit skill treats a list as broken when the clear majority of its items share one grammatical form, imperative verbs, noun phrases, gerund phrases or complete sentences, and one or more items switch to a different form partway through. Each item can be a correct sentence on its own; the defect only shows up when the list is read as a set.",
      },
      {
        question: "Will this skill flag a list just because its items are different lengths?",
        answer:
          "No. Length is not part of the check. A list where every item is an imperative verb phrase stays parallel whether one item is four words and another is fourteen, as long as every item shares the same grammatical form. Only a genuine shift in grammatical form gets flagged.",
      },
      {
        question: "What happens if a list only has two items?",
        answer:
          "The skill says so rather than forcing a pattern onto it. Two items are not enough to establish a majority, so if they differ in grammatical form the skill names both forms and states plainly that the list is too short to call either one the dominant pattern.",
      },
      {
        question: "Does the skill rewrite the whole list once it finds a broken item?",
        answer:
          "No. It rewrites only the specific item, or items, that break the dominant pattern, and leaves every item that already matches the pattern untouched. This keeps the review targeted rather than turning a small structural fix into a full rewrite of a list that was mostly fine already.",
      },
      {
        question: "Can this skill tell when a list is mixed by design on purpose?",
        answer:
          "Yes. A list pairing a short heading with a one-line description, such as a table of contents entry followed by what that section covers, is a common example. Forcing every item into one grammatical shape there would strip out the description doing the actual work, so the skill states plainly that the list is mixed by design instead of flagging a false break.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no document or list you eventually run this skill against is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/writing-skills/structural-outline-audit-skill",
        label: "structural outline audit skill",
        description: "For checking whether a whole document has the sections its type requires, in the right order, rather than whether one list's items share a grammatical form.",
      },
      {
        href: "/writing-skills/editorial-style-guide-enforcement-skill",
        label: "editorial style guide enforcement skill",
        description: "For mechanical style rules against a named house style, a different and narrower kind of consistency than the grammar shared across a list's items.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description: "A natural next pass once a list's items are parallel, for tightening sentence level prose in the rest of the document.",
      },
      {
        href: "/productivity-prompts/checklist-builder-prompt",
        label: "checklist builder prompt",
        description: "For drafting a new checklist from a procedure in the first place, before this skill audits it for parallel structure.",
      },
    ],
    externalLinks: [
      {
        href: "https://owl.purdue.edu/owl/general_writing/mechanics/parallel_structure.html",
        label: "Purdue OWL: Parallel Structure",
        description: "A widely cited university writing lab reference defining parallel structure across words, phrases and clauses.",
      },
      {
        href: "https://www.grammar-monster.com/lessons/parallel_lists.htm",
        label: "Grammar Monster: Parallel Lists",
        description: "An independent grammar reference focused specifically on keeping bulleted list items in a consistent grammatical form.",
      },
      {
        href: "https://www.chompchomp.com/terms/parallelstructure.htm",
        label: "Grammar Bytes: Parallel Structure",
        description: "A reference explaining why a list of actions or items requires equal grammatical units, with corrected examples.",
      },
      {
        href: "https://www.grammarly.com/blog/rhetorical-devices/parallelism/",
        label: "Grammarly: Parallelism in Writing",
        description: "An independent explainer on common parallelism mistakes, including mismatched verb forms and mixed parts of speech.",
      },
    ],
  },

  tags: ["writing", "editing", "grammar", "lists"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
