import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Jargon First Use Audit

Use this skill whenever you are asked to review a document against a specific, stated audience
and check whether every piece of jargon or technical vocabulary in it is explained in plain
language the first time that audience would actually meet it. This is not a check against a
universal list of "hard words." What counts as jargon depends entirely on who is reading, so the
audit cannot begin until a real audience has been stated.

## Before you scan anything

Ask for the real target audience the document is written for, described specifically: "new
customers of a budgeting app with no financial planning background" is a real audience.
"Readers," "users," or "a general audience" is not specific enough to judge anything against, and
this skill must not proceed on a vague description. Do not invent an audience from the document's
subject matter or the fact that it exists at all. If no audience is given, say so plainly and ask
for one before scanning a single sentence.

Once a real audience is stated, hold it in mind as the single standard for the entire pass. A
term like "amortization" is unremarkable to a mortgage underwriter and genuinely opaque to a first
time homebuyer reading a welcome email; the same three sentences can pass a review for one
audience and fail it for another. Never substitute a generic sense of "technical sounding" for the
stated audience's actual, specific unfamiliarity.

## The single pass, in reading order

Read the document from the first word to the last, maintaining one running list of terms already
explained for this audience. For each term or phrase encountered, in the order it appears:

1. Check the running list first. If the term is already on it, this is a later use, not a first
   use, so no explanation is required here. Move on.
2. If it is not on the running list, judge whether the stated audience would find it jargon or
   technical vocabulary rather than ordinary language. If not, it needs no explanation; skip it.
3. If it does count as jargon for this audience, check whether a plain language explanation
   appears in the same sentence, the sentence immediately before it, or the sentence immediately
   after it.
4. If an explanation is present, add the term to the running list with its explanation and
   location, then continue reading. If no explanation is present, record it as an open item: the
   exact term, its exact first-use sentence quoted in full, and the fact that no explanation was
   found nearby.

Never collect every candidate term first and judge each one afterward against the whole document.
That approach cannot distinguish a term explained before its first real use from one left
unexplained for several paragraphs, because both look identical once every occurrence has already
been gathered into one flat list.

## Closing an open item

When a later sentence finally explains an open item, close it, but flag it as explained late
rather than a clean first use: quote the earlier unexplained sentence, quote the sentence where
the explanation eventually appears, and state plainly that a reader who stopped earlier had no way
to understand the term at that point.

If an open item reaches the end of the document with no explanation ever supplied, flag it as
never explained, listing every location it was used.

## How this differs from an acronym check

This skill is not the acronym first use skill. That skill tracks letter abbreviations and
initialisms against their spelled out expansion. This skill tracks ordinary words and multi word
technical phrases, industry terms, insider shorthand, against a plain language explanation, judged
relative to a specific stated audience rather than a fixed spelled out form. Run both on a document
that mixes acronyms and jargon; each catches a failure the other does not.

## What to return

Return two lists: every term successfully explained, with its explanation and first-use location,
and every flagged item, grouped by the two flag types above (explained late, never explained). For
each flagged item, quote the exact sentence rather than describing the problem in general terms.

## What this skill does not do

It does not judge whether a term should exist in the document, rewrite the document into plain
language, or maintain a standing list of jargon words that applies across documents. It checks one
thing only: whether a term the stated audience would not already know gets a plain language
explanation at the first point that audience actually meets it.
`;

const WORKED_EXAMPLE_MD = `# Worked example: an onboarding email, read in order

This file shows the skill applied to a five paragraph welcome email from a budgeting app, exactly
as \`SKILL.md\` describes: a stated audience, one ordered pass, a running list of explained terms,
and two flag types.

## The stated audience

New customers of the app who have just linked their first bank account and have no background in
personal finance, investing, or accounting. They signed up to track spending, not to manage
investments or study financial terminology.

## The source document

\`\`\`
1. Welcome aboard. Now that your account is linked, we will start building your amortization
   schedule for any loans you add, so you can see exactly how much of each payment goes toward
   interest versus principal.

2. Your dashboard also tracks liquidity, which just means how much of your money is sitting in
   cash or accounts you could spend from today, as opposed to money tied up somewhere you cannot
   touch quickly.

3. If you connect a brokerage account, we will show your cost basis on every holding automatically.
   Most people find this the most useful number on the whole dashboard once they add investments.

4. For anyone with employer stock, we also surface your vesting schedule so you always know how
   much of your grant is actually yours to keep if you left tomorrow.

5. One more thing worth knowing: your cost basis updates automatically every time you buy more of
   the same holding, since the app recalculates the average across all your purchases.
\`\`\`

## The pass, paragraph by paragraph

Paragraph 1: "amortization schedule" appears. For this audience, brand new customers with no
finance background, this is jargon. Checking the same sentence and the one after it for an
explanation: the same sentence supplies one, "how much of each payment goes toward interest versus
principal." Clean first use. Running list gains amortization schedule, explained as the split
between interest and principal per payment, location paragraph 1.

Paragraph 2: "liquidity" appears. Jargon for this audience. The same sentence explains it in
plain terms: "how much of your money is sitting in cash or accounts you could spend from today."
Clean first use. Running list gains liquidity, explained as spendable cash versus tied up money,
location paragraph 2.

Paragraph 3: "cost basis" appears with no explanation in the same sentence or the one before or
after it; the surrounding sentences describe why the number is useful, not what it means. This is
an open item: cost basis, first seen paragraph 3, no explanation nearby.

Paragraph 4: "vesting schedule" appears. Jargon for this audience. The same sentence explains it:
"how much of your grant is actually yours to keep if you left tomorrow." Clean first use. Running
list gains vesting schedule, explained as the portion of a stock grant you would keep on leaving,
location paragraph 4.

Paragraph 5: "cost basis" appears again. Because it was already an open item from paragraph 3,
this does not start a new first use; the running list still shows no explanation was ever supplied
for it, and this later sentence, about how the number updates, does not explain what it means
either. The open item remains open through the end of the document.

## Final report

Explained on first use: amortization schedule, paragraph 1; liquidity, paragraph 2; vesting
schedule, paragraph 4. Each with its plain language explanation quoted above.

Flagged, never explained: cost basis, used in paragraph 3 and again in paragraph 5, with no plain
language explanation appearing anywhere in the document for a reader with no finance background.

## Why this reads differently for a different audience

If the stated audience were the app's own financial analysts instead, "cost basis" would not be
flagged at all, since it is ordinary working vocabulary for that reader. The document itself never
changes; only the judgment of what counts as jargon changes, because that judgment is relative to
the specific stated audience, never to a fixed list of hard words.
`;

const meta: SkillMeta = {
  slug: "jargon-first-use-audit-skill",
  name: "Jargon First Use Audit",
  title: "Jargon First Use Audit Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that checks a document against a specific stated audience, reading in order and flagging any jargon or technical term left unexplained the first time that audience would actually meet it.",

  seo: {
    primaryKeyword: "jargon first use audit skill",
    keywords: [
      "jargon first use audit skill",
      "free ai skill for jargon audit",
      "downloadable jargon checklist for writers",
      "ai skill to flag unexplained jargon",
      "jargon audit skill for target audience documents",
    ],
    seoTitle: "Jargon First Use Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable jargon first use audit skill that checks a document against a stated audience and flags any jargon left unexplained at first use.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Models asked to check a document for jargon reliably reach for a generic sense of what counts as a hard word, drawn from whatever vocabulary is statistically unusual to the model itself, rather than from the specific audience the document was actually written for. A term ordinary to the model, such as a common finance or engineering word, can still be genuinely unfamiliar to the stated readers, and the reverse happens just as often. This skill refuses to run until a real audience is stated, then judges every term against that stated audience rather than a general notion of complexity, and requires each flagged term to trace to a quoted first-use sentence rather than a general complaint about tone.",
  },

  article: {
    intro: [
      "A jargon first use audit skill is only trustworthy if it judges every term against the actual people who will read the document, not against a generic sense of what sounds technical. Handed a document and nothing else, most AI assistants default to flagging whatever vocabulary strikes them as unusual, which quietly substitutes the model's own sense of difficulty for the judgment that actually matters: whether the stated reader already knows the term.",
      "This skill refuses that shortcut. It ships as two plain text files: a main instructions file describing a single ordered pass built around a stated audience, and a worked reference example showing that pass applied to a welcome email, with some terms explained and one left unexplained across two occurrences. Both files are previewable in full on this page before you download the zip, and both are exactly what an assistant or a teammate receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why jargon only exists relative to a stated audience",
        body: [
          "No word is jargon in the abstract. \"Amortization\" is routine vocabulary to a loan officer and a genuine stumbling block to a first time borrower reading a welcome email; the same sentence can pass a review written for one reader and fail the identical review written for another. A jargon first use audit skill that skips naming the real audience is quietly grading against an invented, generic reader instead.",
          "That is why this skill's very first instruction is to ask for the actual audience, described specifically, before a single sentence is scanned. \"New customers with no financial background\" is usable. \"General readers\" is not, because it gives the pass nothing concrete to check unfamiliarity against.",
        ],
      },
      {
        heading: "The single ordered pass, and why a scan-then-judge approach breaks it",
        body: [
          "It is tempting to collect every candidate hard word first, then judge each one afterward against the whole document at once. That approach cannot tell a term explained before its first real use from one left unexplained for three paragraphs, because both look identical once every occurrence has already been flattened into one list with no ordering left.",
          "This skill reads top to bottom instead, maintaining a running list of terms already explained for the stated audience. A term is only judged against what has actually appeared before it in reading order, never against the document as a whole, which is what makes a genuine first-use check possible at all.",
        ],
      },
      {
        heading: "What every flagged item has to include",
        body: [
          "Every flag in this skill's output traces to a quoted term and a quoted first-use sentence, not a vague complaint that a passage \"feels too technical.\" For each term, the audit states whether a plain language explanation appears in the same sentence or an immediately adjacent one, and quotes that explanation when one exists.",
          "As a free ai skill for jargon audit, this specificity is the entire value: a writer can act on \"cost basis, quoted here, never explained\" in a way they cannot act on a general impression that a document reads as dense. Because the output reads as a downloadable jargon checklist for writers rather than a paragraph of prose, every flag is something a writer can check off once it is fixed.",
        ],
      },
      {
        heading: "How this differs from the acronym first use skill",
        body: [
          "This is not the acronym first use skill available elsewhere in this catalogue, and the two are built to be run together rather than interchangeably. That skill tracks letter abbreviations and initialisms against a spelled out expansion, a mechanically checkable pattern independent of audience. This skill tracks ordinary words and multi word technical phrases against a plain language explanation, and that judgment changes depending entirely on the stated reader.",
          "A document can pass an acronym check cleanly, every initialism spelled out correctly, and still fail a jargon audit for a specific audience, because a fully spelled out technical phrase can remain just as opaque as the abbreviation it replaced.",
        ],
      },
      {
        heading: "Explained late versus never explained",
        body: [
          "When a term is used unexplained and only gets a plain language explanation several paragraphs later, this skill flags it as explained late rather than treating the eventual explanation as a clean first use, since a reader who stopped earlier had no way to understand the term at that point. A term that reaches the end of the document with no explanation anywhere is flagged separately, as never explained, with every location it was used.",
          "This distinction matters for a writer deciding what to fix: an explained-late term usually just needs to be moved earlier, while a never-explained term needs an explanation written from scratch. Run as a jargon audit skill for target audience documents rather than a one-size document check, the same distinction holds however specialised or general the stated reader turns out to be.",
        ],
      },
      {
        heading: "Using the downloaded files as an ai skill to flag unexplained jargon",
        body: [
          "Hand both files to an AI assistant together along with the document to audit and a specific description of who will read it. The main instructions file assumes the worked example is available alongside it, so keeping the folder structure intact once the archive is unzipped preserves that reference.",
        ],
      },
    ],
    howTo: {
      name: "How to use the jargon first use audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you can see exactly how the ordered pass and the two flag types work.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Write down the real target audience",
          text: "Describe specifically who will read the document and what they already know, such as \"new customers with no technical background,\" before running the audit.",
        },
        {
          name: "Hand both files to your assistant with the document and audience",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your stated audience alongside the document to check.",
        },
      ],
    },
    faq: [
      {
        question: "Why does the skill refuse to run without a stated audience?",
        answer:
          "Because jargon is not a fixed property of a word, it is a relationship between a word and a specific reader's existing knowledge. A term ordinary to one audience can be genuinely unfamiliar to another, so judging a document without naming the real audience means judging it against an invented, generic reader instead of the people who will actually read it.",
      },
      {
        question: "How is this different from the acronym first use skill?",
        answer:
          "The acronym first use skill checks letter abbreviations and initialisms against a spelled out expansion, a pattern that does not depend on who is reading. This skill checks ordinary words and technical phrases against a plain language explanation, and that judgment changes with the stated audience. A document can pass one check and fail the other.",
      },
      {
        question: "What counts as an explanation being nearby?",
        answer:
          "The skill checks the same sentence the term appears in, the sentence immediately before it, and the sentence immediately after it. An explanation buried several paragraphs later does not count as a clean first use; it gets flagged as explained late instead, since a reader stopping earlier would still be stuck.",
      },
      {
        question: "What happens if a term is never explained anywhere in the document?",
        answer:
          "It is flagged as never explained, with every location it was used quoted so the gap is easy to find and fix. This is treated as a distinct flag from a term that eventually gets explained too late, since the two need different fixes: writing an explanation from scratch versus moving one earlier.",
      },
      {
        question: "Will the same document get flagged the same way for every audience?",
        answer:
          "No, and that is the point. A term like cost basis might need an explanation for new retail customers and need none at all for a document written for financial analysts. The skill's judgment of what counts as jargon is tied entirely to the audience stated before the pass begins, not to the document alone.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the document or audience you eventually run the skill against is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/writing-skills/acronym-first-use-skill",
        label: "acronym first use skill",
        description: "For checking letter abbreviations and initialisms against their spelled out expansion, a mechanically checkable pattern distinct from this skill's audience-relative jargon check.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description: "For rewriting a passage into plainer language once this skill has flagged a specific term as unexplained for the stated audience.",
      },
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description: "A broader clarity pass for a sentence once a flagged jargon term has been explained or replaced.",
      },
      {
        href: "/skills/education-skills/reading-level-alignment-skill",
        label: "reading level alignment skill",
        description: "Checks overall sentence complexity against a target grade level, a document-wide measure distinct from this skill's term by term first-use check.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.plainlanguage.gov/guidelines/words/",
        label: "plainlanguage.gov: Use Plain Words",
        description: "The federal plain language guidelines on replacing or explaining jargon and technical terms for a general reader.",
      },
      {
        href: "https://www.gov.uk/guidance/content-design/writing-for-gov-uk#avoid-jargon",
        label: "GOV.UK Content Design: Avoid Jargon",
        description: "A public sector writing standard with explicit guidance on identifying and explaining jargon for the reader it is written for.",
      },
      {
        href: "https://www.nngroup.com/articles/plain-language-experts/",
        label: "Nielsen Norman Group: Plain Language Is for Everyone, Even Experts",
        description: "Independent usability research showing that even expert audiences prefer jargon explained rather than assumed, supporting an audience-relative rather than universal jargon standard.",
      },
      {
        href: "https://www.merriam-webster.com/dictionary/jargon",
        label: "Merriam-Webster: Jargon",
        description: "An independent reference definition of jargon as language specific to a particular group, the audience-relative concept this skill's instructions rely on.",
      },
    ],
  },

  tags: ["writing", "editing", "jargon", "plain language", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
