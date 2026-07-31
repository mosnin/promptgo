import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Outlier Explanation Audit

Use this skill whenever you are given a real dataset, or a real described set of data
points, where specific values have already been identified as statistical outliers and a
decision has already been made about each one: kept, removed, or adjusted. Its job is
narrow: check whether every one of those decisions has a real, stated cause behind it, or
whether it is riding on no justification at all, or on a justification that only restates
that the value is unusual without naming why.

## Before you audit anything: get the real decisions

Ask for, or locate, the exact outlier value, the exact decision made about it, and the
exact justification given for that decision, if any was given. Do not proceed from a
summary of the reasoning. Quote the value and the justification exactly as they were
stated, in the source data, the analysis notes, or the user's own description. If a
decision or its justification is missing, say so plainly rather than filling the gap with
a plausible sounding guess about what the reasoning probably was.

## The core distinction: a real cause versus a circular restatement

A real cause names something that happened outside the number itself and can, in
principle, be checked against another source: a known data entry error such as a
misplaced decimal or a duplicate scan, a documented one off event such as a facility
closure or a scheduled maintenance window, a sensor or instrument fault, or a confirmed
process change. A circular restatement only repeats the statistical fact that made the
value stand out in the first place: "it's an outlier," "it deviates from the mean," "it's
way higher than the rest," "it looked wrong," "it didn't fit the pattern." Language like
that explains why the value drew attention. It does not explain why removing, adjusting,
or keeping it was the right call.

## What each audited decision must produce

For every outlier decision you review, produce, in this fixed order:

1. The exact outlier value, quoted as given, with its unit and the record it belongs to
   when that is known.
2. The decision made, exactly as stated: kept, removed, or adjusted, and if adjusted, the
   value it was changed to.
3. The exact justification given, quoted directly, or the words "no justification given"
   if none was supplied.
4. The verdict: JUSTIFIED, when a real and checkable cause is present, or UNJUSTIFIED,
   when no cause was given or the given reasoning is circular.

## The rule for removed and adjusted values specifically

Removing or adjusting a value changes the dataset a later conclusion gets drawn from.
Flag any removal or adjustment UNJUSTIFIED whenever it lacks a real stated cause,
regardless of how far the value sits from the rest of the data or how confident the
stated reasoning sounds, if that reasoning never actually names a cause outside the
number. Silently dropping an inconvenient value without a real cause is one of the most
common ways an analysis quietly becomes unreliable, precisely because the size of a
deviation is not, by itself, evidence about why that deviation occurred.

## Kept values are not exempt from the check

A kept decision does not change the dataset, but stating that a value was kept "because
it's still valid data" is exactly as circular as removing one "because it's an outlier."
Audit kept decisions with the same two questions: was a real cause given for treating the
value as genuine, and is that cause checkable against something outside the number itself.
The downstream risk differs, an unjustified kept outlier can distort an average with
nobody re-examining it, but the check for a real cause versus a circular restatement stays
identical across all three kinds of decision.

## Never invent a cause on the user's behalf

Only evaluate the cause actually given. Never supply one yourself, however plausible it
seems, such as guessing that an extreme value was probably a data entry error when nobody
said so, and never mark a decision JUSTIFIED on the strength of a cause you invented. When
a justification is missing or circular, flag it UNJUSTIFIED and state plainly what
specific, checkable information would resolve it, for example asking whether the extreme
reading lines up with a known instrument fault on that date, rather than filling the gap
with a guess of your own.

## Using the worked example

See \`reference/outlier-audit-worked-example.md\` for four full outlier decisions from a
single real looking dataset, audited in the exact four part format above, including at
least one decision with a real, checkable cause and at least one decision flagged
UNJUSTIFIED for circular reasoning, so the format can be copied directly rather than
reconstructed from this description alone.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing four outlier decisions

Use this alongside \`SKILL.md\`. It shows the four part audit format applied to four real
looking outlier decisions drawn from a single dataset, so the format can be copied
directly.

## The dataset

A regional water utility exports daily consumption readings, in gallons, for 90 residential
meters across a billing quarter. During review, four readings were flagged as statistical
outliers, defined by the utility as more than three standard deviations from that specific
meter's own daily mean, and a decision was recorded for each one.

## Decision 1: meter 114, March 3 reading

The exact outlier value: 58,200 gallons on March 3, against meter 114's daily mean of
roughly 1,850 gallons.

The decision made: removed.

The exact justification given: "Field technician log confirms meter 114 registered a stuck
read valve on March 3, and maintenance ticket 4471 documents the valve was replaced on
March 4."

The verdict: JUSTIFIED. The justification names a real, checkable cause outside the number
itself, a documented instrument fault tied to a specific maintenance ticket, not a
restatement of how unusual the reading looks.

## Decision 2: meter 229, March 15 reading

The exact outlier value: 9,400 gallons on March 15, against meter 229's daily mean of
roughly 2,100 gallons.

The decision made: removed.

The exact justification given: "This is clearly an outlier compared to the rest of the
readings."

The verdict: UNJUSTIFIED. The justification only restates that the value is far from the
others, which is the observation that triggered scrutiny in the first place, not a reason
the reading is wrong or unrepresentative. No data entry error, sensor fault, or documented
event is named anywhere in the record.

## Decision 3: meter 87, April 2 reading

The exact outlier value: 6,750 gallons on April 2, against meter 87's daily mean of
roughly 2,300 gallons.

The decision made: kept.

The exact justification given: "Work order 5820 confirms a scheduled pressure test and
line flush for the property served by meter 87 on April 1 and April 2, which explains the
elevated flow."

The verdict: JUSTIFIED. A real, checkable cause, a documented work order for a specific
maintenance event on the exact dates in question, explains why the elevated reading is
genuine rather than an error, which is a real reason to keep it rather than a restatement
that the value merely happens to be unusual.

## Decision 4: meter 331, March 22 reading

The exact outlier value: 41,000 gallons on March 22, against meter 331's daily mean of
roughly 1,975 gallons.

The decision made: adjusted, to 4,100 gallons.

The exact justification given: "Value adjusted because it's way too high to be real."

The verdict: UNJUSTIFIED. Nothing in the record confirms a misplaced decimal, a
transcription error, or any other checkable cause for the adjustment. "Too high to be
real" restates the size of the deviation and asserts a decimal error without evidence; it
does not point to a technician log, a meter reading correction, or any source that could
confirm the assumed error actually happened. The adjustment stands unverified.

## The audit summary this format supports

Of the four decisions reviewed, two carry a real, checkable cause, the stuck valve on
meter 114 and the scheduled pressure test on meter 87, and two do not, the removal on
meter 229 and the decimal adjustment on meter 331. The two UNJUSTIFIED decisions changed
the dataset a quarterly consumption total gets drawn from, without any stated reason that
could be checked against a technician log, a work order, or any other record outside the
readings themselves.
`;

const meta: SkillMeta = {
  slug: "outlier-explanation-audit-skill",
  name: "Outlier Explanation Audit",
  title: "Outlier Explanation Audit Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks whether every kept, removed, or adjusted outlier decision in a real dataset has a real, checkable cause behind it, quotes the exact value and justification, and flags any decision resting on no cause or a circular restatement as UNJUSTIFIED.",

  seo: {
    primaryKeyword: "outlier explanation audit skill",
    keywords: [
      "outlier explanation audit skill",
      "free ai skill for outlier explanation audit",
      "downloadable outlier justification checklist",
      "ai skill to check outlier removal decisions",
      "outlier removal justification for datasets",
    ],
    seoTitle: "Outlier Explanation Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable outlier explanation audit skill that checks every kept, removed or adjusted decision for a real cause and flags circular reasoning UNJUSTIFIED.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/outlier-audit-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to review a set of outlier decisions reliably accept a justification like it's an outlier or it deviates from the mean as sufficient, because the phrase sounds like a reason even though it only restates the statistical fact that triggered scrutiny. This skill forces every decision through a fixed four part audit that quotes the exact value and the exact justification, and it withholds a JUSTIFIED verdict unless a real, checkable cause outside the number itself is actually named.",
  },

  article: {
    intro: [
      "An outlier explanation audit skill only earns its name if it can tell a real, checkable cause apart from a sentence that merely sounds like one. Handed a list of outlier decisions, most AI assistants accept a justification such as it's an outlier or it deviates from the mean as sufficient, when both sentences only restate why the value drew attention in the first place. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file that sets the four part audit format, and a reference file applying that format to four worked decisions from a single utility dataset. Both are previewable in full on this page before you download the .zip, exactly what an AI assistant or a teammate receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a decision already made still needs auditing",
        body: [
          "By the time a value is labelled an outlier and a decision recorded, kept, removed, or adjusted, it is easy to treat the matter as settled. But a decision that changed the data, or a decision to leave a strange value untouched, is only as trustworthy as the reason behind it, and that reason is frequently never checked once the decision itself has been made. This skill goes back to the exact value and the exact words used to justify what happened to it, and asks whether those words name a real cause or only repeat the observation that the value was unusual.",
        ],
      },
      {
        heading: "A real cause versus a circular restatement",
        body: [
          "A real cause names something outside the number itself: a documented data entry error, a one off event on record, a sensor fault confirmed by a maintenance log, a confirmed process change. A circular restatement does the opposite. It's an outlier, it deviates from the mean, it's way too high to be real: each describes the statistical fact that made the value stand out, not a reason removing, adjusting, or keeping it was correct. Used as an ai skill to check outlier removal decisions, this is the single distinction the whole audit turns on.",
        ],
      },
      {
        heading: "The four part format every decision gets audited against",
        body: [
          "Every audited decision states four things in a fixed order: the exact outlier value, quoted with its unit and record; the exact decision, kept, removed, or adjusted, and to what value if adjusted; the exact justification given, quoted directly, or a note that none was supplied; and a verdict of JUSTIFIED or UNJUSTIFIED. Nothing is paraphrased, since a summarised value or justification loses the specific wording a reader needs to judge it. The reference file that ships with the main instructions works as a downloadable outlier justification checklist, showing the format applied line by line to four decisions.",
        ],
      },
      {
        heading: "Worked example: two justified decisions, two that are not",
        body: [
          "A water utility flags four meter readings as statistical outliers across a billing quarter. A removal on meter 114 is backed by a maintenance ticket documenting a stuck read valve, a real and checkable cause, and a kept value on meter 87 is backed by a work order for a scheduled pressure test on the same dates. The other two decisions do not clear the bar: a removal on meter 229 is justified only as this is clearly an outlier compared to the rest of the readings, and an adjustment on meter 331 is justified only as it's way too high to be real. Neither names anything checkable, so both are flagged UNJUSTIFIED even though the values were genuinely extreme.",
        ],
      },
      {
        heading: "Why removed and adjusted values get the sharpest scrutiny",
        body: [
          "Removing or adjusting a value changes the dataset every later conclusion gets drawn from, so any removal or adjustment without a real stated cause is flagged UNJUSTIFIED, no matter how extreme the value or how confident the wording sounds. Silently dropping an inconvenient reading without a real reason is one of the more common ways an analysis becomes unreliable, precisely because the size of a deviation is a fact about the number, not evidence about why it happened. This is outlier removal justification for datasets treated as a checkable claim rather than an assumed formality; a kept decision carries a lower structural risk since it changes nothing about the underlying data, but it is still audited against the same real cause standard.",
        ],
      },
      {
        heading: "What this outlier explanation audit skill will not do",
        body: [
          "It will not invent a plausible cause on the user's behalf. If a justification is missing or circular, it states that plainly and names the specific, checkable information that would resolve it, such as asking whether an extreme reading matches a known instrument fault on that date, rather than guessing at a decimal error nobody confirmed. Downloaded as plain text, it works as a free ai skill for outlier explanation audit work in any tool capable of reading a text file.",
        ],
      },
    ],
    howTo: {
      name: "How to use the outlier explanation audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/outlier-audit-worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real decisions",
          text: "List every outlier value already flagged, the exact decision made about each one, kept, removed, or adjusted, and the exact words used to justify it, if any were given.",
        },
        {
          name: "Require the four part verdict",
          text: "Ask for each decision to be audited in the fixed value, decision, justification, verdict format, and reject a summary that skips straight to a JUSTIFIED or UNJUSTIFIED label without quoting the source wording.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill decide whether a value really is an outlier?",
        answer:
          "No. It starts after a value has already been flagged as an outlier and a decision made about it. Its whole job is auditing the stated reason behind that decision, not recomputing whether the value should have been flagged in the first place.",
      },
      {
        question: "What counts as a real cause versus a circular restatement?",
        answer:
          "A real cause names something checkable outside the number itself, a documented data entry error, a one off event on record, a confirmed sensor fault. A circular restatement, such as it's an outlier or it deviates from the mean, only repeats the statistical fact that made the value stand out, which is not a reason for what was done about it.",
      },
      {
        question: "Will this skill guess a likely cause when none was given?",
        answer:
          "No, and its instructions explicitly forbid it. When a justification is missing or circular, the skill flags the decision UNJUSTIFIED and states what specific, checkable information would resolve it, rather than inventing a plausible sounding explanation on the user's behalf.",
      },
      {
        question: "How is this different from the data cleaning log skill on this site?",
        answer:
          "That skill documents every category of cleaning action applied to a dataset, deduplication, missing values, type coercion, unit standardization, and outlier handling among them, as one line in a broader numbered record. This skill does a narrower and different job: it takes outlier decisions that already exist and audits only whether each one's stated justification names a real cause or merely restates that the value was unusual.",
      },
      {
        question: "How is this different from the assumption logging skill on this site?",
        answer:
          "The assumption logging skill covers the full range of judgement calls behind an analysis at once, missing data, date ranges, metric definitions, and outliers included, each logged with a reason. This skill is specific to outlier decisions already made and checks the quality of the justification given for each one, flagging circular reasoning that an assumptions log would otherwise record without questioning.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no dataset or decision you use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-skills/data-cleaning-log-skill",
        label: "data cleaning log skill",
        description: "For recording every category of cleaning action applied to a dataset as a numbered log, of which outlier handling is only one of five categories checked.",
      },
      {
        href: "/data-analysis-skills/assumption-logging-skill",
        label: "assumption logging skill",
        description: "For logging the full range of judgement calls behind an entire analysis, rather than specifically auditing the quality of the cause behind each outlier decision.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description: "For profiling a raw dataset and surfacing candidate defects, including extreme values, before any outlier decision has been made or needs auditing.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "For testing whether a finding built on the audited data survives scrutiny of sample size and alternative explanations once outlier decisions are settled.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm",
        label: "NIST/SEMATECH e-Handbook: outliers and data checking",
        description: "A primary statistical reference on identifying an extreme value and the difference between a data error and a genuine, if unusual, observation.",
      },
      {
        href: "https://www.gov.uk/government/publications/the-aqua-book-guidance-on-producing-quality-analysis-for-government",
        label: "gov.uk: The Aqua Book, guidance on producing quality analysis",
        description: "Official UK government guidance requiring analysts to document and justify the judgement calls behind an analysis, the same discipline this skill applies to a single outlier decision.",
      },
      {
        href: "https://book.the-turing-way.org/reproducible-research/reproducible-research",
        label: "The Turing Way: Reproducible Research",
        description: "An open handbook on making the choices behind an analysis available and checkable by someone else, the wider discipline an audited outlier decision serves in miniature.",
      },
    ],
  },

  tags: ["data analysis", "outliers", "data quality", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
