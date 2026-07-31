import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Data Cleaning Log Skill

Use this skill whenever you are told what cleaning steps were applied to a
raw dataset (deduplication, missing value handling, type coercion, outlier
removal, unit standardization, or any other transformation) and asked to
produce a record of that work. Its job is narrow: turn a description of
cleaning actions into a structured, numbered log that can travel with the
dataset to anyone who was not in the room when the cleaning happened.

## Why this exists

A dataset that has been cleaned but not logged is a dataset nobody downstream
can trust or reproduce. Someone querying the numbers six months later has no
way to know that 40 rows were dropped for a missing customer id, that a
currency column was assumed to be in one unit and converted, or that three
extreme values were removed rather than kept. Each of those choices can
change a result. None of them are visible in a finished, tidy table.

This skill does not clean data itself. It documents cleaning that has
already happened, or that is being described to it step by step, in a
format built to survive being handed to a stranger.

## The core rule: every entry states a rule, not just an action

A logged step is incomplete if it only says what changed. "Duplicate rows
were removed" describes an action with no reasoning attached, and a reader
cannot tell whether the same choice would be correct on their own copy of
the data. Every entry in this log must instead state the rule that was
applied, meaning the specific condition and the reason it was chosen, for
example: rows with a null in the required customer_id field were dropped,
not imputed, because a synthetic customer id would misattribute revenue to
the wrong account. The rule is what makes the decision checkable rather than
merely announced.

## What each numbered entry must contain

Write every entry with all four parts, in this fixed order:

1. Step number, counted sequentially from 1 for the whole cleaning pass.
2. Action taken, naming the exact column, table or field affected.
3. Rule applied, stating the condition and the reason the rule was chosen
   over an alternative such as imputing instead of dropping, or keeping an
   outlier instead of removing it.
4. Records affected, given as an exact or estimated count whenever that
   number is knowable from what was described. If the count genuinely
   cannot be known from the information given, write "count not stated" so
   a reader can tell the gap apart from a step that affected zero rows.

## Refuse the vague summary

Never collapse a cleaning pass into a line like "data was cleaned and
standardized." That sentence hides every decision a reader would need in
order to trust or reproduce the result. If you are given a general
description of cleaning work rather than a step by step account, ask for
the specific actions taken, column by column, rather than writing a
plausible sounding summary in place of the missing detail.

## The five categories to check on every pass

Check a described cleaning pass against these categories, since each is a
common place a decision happens without being written down:

- Deduplication: which key defines a duplicate, and what happened to the
  losing rows.
- Missing value handling: whether a gap was dropped, imputed, or flagged,
  and why that treatment fit the specific field.
- Type coercion: what a column was converted to, and what happened to
  values that failed the conversion.
- Outlier removal: what rule defined an outlier, and whether flagged values
  were removed, capped, or kept with a note.
- Unit standardization: what the source and target units were, and how a
  mixed or ambiguous unit was resolved.

Not every pass touches all five. Log only the categories that actually
occurred, but check the description against all five before writing the log
so a silent step does not get missed.

## Using the reference file

See \`reference/log-entry-format.md\` for the exact four part entry format
laid out with worked examples, so the structure below can be copied
directly rather than reconstructed from this description alone.
`;

const LOG_FORMAT_MD = `# Reference: the data cleaning log entry format

Use this alongside \`SKILL.md\`. It shows the four part entry format in
practice, with three worked examples drawn from a single dataset, so the
structure can be copied directly.

## The four part format

Every entry has this exact shape:

Step [number]: [action]
Rule: [the condition and the reason it was chosen]
Records affected: [a number, an estimate, or "count not stated"]

Nothing is summarized. If five separate actions happened to a single
column, that column gets five separate numbered entries, not one paragraph
describing all five at once.

## The dataset behind the worked examples

A retail team hands over 12,400 rows of order records exported from two
merged point of sale systems. The order_total column mixes two currencies
with no currency flag, the customer_id field is blank on some rows, and the
order_date column contains a small number of dates far outside the store's
three year trading history.

## Worked example entries

Step 1: Action taken: rows missing a value in the required customer_id
field were dropped from the cleaned dataset rather than filled in.
Rule: a synthetic or guessed customer id would misattribute revenue to the
wrong account in every downstream report that groups by customer, and no
reliable value could be recovered from any other column in the export.
Records affected: 187 of 12,400 rows.

Step 2: Action taken: the order_total column was split by source system tag
and the values originating from the second point of sale system were
converted from the secondary currency to the primary currency using the
exchange rate stated in the export's accompanying documentation.
Rule: the two point of sale systems recorded totals in different
currencies with no per row currency flag, so leaving the column mixed would
silently understate or overstate revenue depending on which system a given
row came from, and the documented rate was the only reliable conversion
available.
Records affected: 3,940 rows converted, 8,460 rows left unchanged as
already being in the primary currency.

Step 3: Action taken: rows with an order_date more than three years before
the store's recorded opening date were flagged in a new review_reason
column rather than deleted.
Rule: a date that predates the store's existence is very likely a data
entry error rather than a genuine order, but deleting the row would remove
evidence of the defect and prevent anyone from checking whether the same
error pattern appears elsewhere in the export.
Records affected: 14 rows flagged, 0 rows removed.

## What the format deliberately leaves out

The format never uses a phrase like "cleaned and standardized the dataset"
in place of an itemized entry. A single vague line cannot be checked
against the rule that was actually applied, and it gives a reader nothing
to compare their own copy of the data against. Every action, no matter how
small, gets its own numbered entry with a stated rule and a records
affected count whenever that count can be known.
`;

const meta: SkillMeta = {
  slug: "data-cleaning-log-skill",
  name: "Data Cleaning Log",
  title: "Data Cleaning Log Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that turns a description of cleaning steps applied to a raw dataset into a structured, numbered audit trail, each entry stating the rule behind the action and the records it affected, and refuses to summarise cleaning work as a vague one line description.",

  seo: {
    primaryKeyword: "data cleaning log skill",
    keywords: [
      "data cleaning log skill",
      "free ai skill for data cleaning log",
      "downloadable data cleaning audit trail template",
      "ai skill to document data cleaning steps",
      "data cleaning log template for datasets",
    ],
    seoTitle: "Data Cleaning Log Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable data cleaning log skill that turns every deduplication, missing value and outlier decision into a numbered, auditable record for datasets.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/log-entry-format.md", content: LOG_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to summarise a cleaning pass reliably default to a single vague sentence such as data was cleaned and standardized, which leaves anyone downstream unable to audit or reproduce what actually happened to the dataset. This skill forces every action into a numbered entry with a stated rule and a records affected count, so the summary a model would rather write is replaced with a record that can be checked line by line.",
  },

  article: {
    intro: [
      "A data cleaning log skill only earns its name if it makes a cleaning pass checkable after the fact, not just tidy at the end. Handed a description of deduplication, missing value handling, type coercion, outlier removal and unit standardization, most AI assistants will happily compress it into one confident sentence and move on. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file that sets the four part entry format, and a reference file that shows that format applied to three worked entries from a single retail dataset. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant or a teammate receives once you hand the archive over.",
      "The result is a durable record that sits alongside the dataset, not a one time explanation that disappears once the conversation ends.",
    ],
    sections: [
      {
        heading: "Why a finished, clean table is not enough on its own",
        body: [
          "A table that looks tidy gives no evidence of what happened to produce it. Rows may have been dropped for a missing field, a column may have been silently converted between currencies, and extreme values may have been removed rather than kept, none of it visible in the final result. Anyone who did not do the cleaning has no way to check whether a different choice would have changed the numbers they now rely on.",
          "A data cleaning log skill exists specifically to close that gap. Instead of a finished table standing alone, the dataset travels with a numbered record of exactly what changed, in what order, and why, so a reader can evaluate the work rather than simply trust it. That is the difference between a free ai skill for data cleaning log work and a template that produces a tidy table with no way to check it.",
        ],
      },
      {
        heading: "How this differs from a data cleaning prompt",
        body: [
          "A data cleaning prompt does the cleaning itself in one pass: it reads a messy sample, diagnoses each column, and returns rules to apply to the raw data. This skill starts after that work is finished, or after a person describes what cleaning was actually done, and its job is to write that work down as a durable, reusable audit trail rather than decide what the cleaning rules should be.",
          "The two are meant to be used together. Once a pass is agreed and applied, whether from a data cleaning prompt or a person's own judgement, this skill turns the resulting actions into a numbered log built to be handed to someone who was never part of that conversation.",
        ],
      },
      {
        heading: "The four part entry format this skill enforces",
        body: [
          "Every numbered entry states four things in a fixed order: the step number, the specific action taken, the rule applied including the reason it was chosen over an alternative, and the number of records affected whenever that count is knowable. An entry that only states the action, with no stated rule, is treated as incomplete no matter how obvious the action might seem.",
          "Used as an ai skill to document data cleaning steps, the format forces a distinction most summaries skip: dropping a row for a missing field and imputing a value for that same field are two different rules with two different justifications, and collapsing them into one described action hides which choice was actually made. The reference file that ships alongside the main instructions doubles as a downloadable data cleaning audit trail template, showing the exact four part format applied line by line to a real dataset.",
        ],
      },
      {
        heading: "Worked example: a merged export with two currencies",
        body: [
          "A retail team hands over 12,400 order rows exported from two merged point of sale systems. Run against that description, the log produces three entries: 187 rows missing a customer id were dropped rather than filled in, because a synthetic id would misattribute revenue to the wrong account. Then 3,940 rows recorded in a secondary currency were converted using the documented exchange rate, while 8,460 rows already in the primary currency were left unchanged. Then 14 rows with an order date older than the store's opening date were flagged in a review column rather than deleted, so the defect stays visible for anyone checking the source system later.",
          "None of those entries could be replaced by a phrase like data was cleaned and standardized without losing information a downstream analyst needs to trust the resulting revenue totals.",
        ],
      },
      {
        heading: "The five categories checked on every pass",
        body: [
          "Deduplication, missing value handling, type coercion, outlier removal and unit standardization each get checked against the description given, since each is a common place a decision happens without being written down. Not every dataset touches all five categories, and the log only records what actually occurred, but skipping the check is exactly how a silent step goes unrecorded. Used this way, the same five categories work as a data cleaning log template for datasets from any source.",
        ],
      },
      {
        heading: "How this differs from the assumption logging skill",
        body: [
          "The assumption logging skill covers any analysis at all: a dropped outlier in a statistical test, a narrowed date range for a chart, a metric definition with more than one meaning in use. This skill is narrower. It logs only the cleaning actions applied directly to a dataset, deduplication, missing value handling, type coercion, outlier removal and unit standardization, in the four part rule and records affected format a cleaning audit trail needs.",
        ],
      },
    ],
    howTo: {
      name: "How to use the data cleaning log skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/log-entry-format.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Describe the cleaning steps in detail",
          text: "List the raw dataset, and every action taken: which rows were dropped or kept, which values were converted, and what rule justified each choice, column by column.",
        },
        {
          name: "Require the numbered log before accepting a summary",
          text: "Reject a one line description of the cleaning pass and ask for the four part entry format, with a stated rule and a records affected count for each action.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill clean the dataset itself?",
        answer:
          "No. It documents cleaning that has already happened, or that is being described to it step by step, as a numbered log. Deciding what the cleaning rules should be is a separate task, better suited to a dedicated cleaning prompt that reads the raw sample directly.",
      },
      {
        question: "What happens if the number of records affected is not known?",
        answer:
          "The entry states plainly that the count was not given, rather than guessing at a number or omitting the field. A reader needs to tell the difference between a step that affected zero records and a step whose effect on the data was never counted.",
      },
      {
        question: "How is this different from the data cleaning prompt on this site?",
        answer:
          "That prompt does the cleaning itself, reading a messy sample and returning rules to apply. This skill starts after a pass is finished and turns the actions taken into a durable, numbered audit trail that travels with the dataset, rather than deciding what should be cleaned.",
      },
      {
        question: "Can this skill be used for a cleaning pass that already happened months ago?",
        answer:
          "Yes, as long as the specific actions taken can still be described, ideally from a script, a change log, or someone's memory of the exact steps. The skill cannot reconstruct decisions nobody can describe, which is why logging a pass at the time it happens is worth doing rather than reconstructing it later.",
      },
      {
        question: "Will this skill accept a vague description of the cleaning work?",
        answer:
          "No. Given a general summary such as the data was cleaned and standardized rather than a step by step account, its instructions require it to ask for the specific actions taken instead of writing a plausible sounding entry to fill the gap.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no dataset or cleaning description you use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description: "For deciding the cleaning rules in the first place, reading a raw messy sample and returning numbered rules to apply, before this skill logs the actions actually taken.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description: "For scoring which defects in a table are worth fixing at all before any cleaning work begins, which this skill later documents once it happens.",
      },
      {
        href: "/data-analysis-skills/assumption-logging-skill",
        label: "assumption logging skill",
        description: "For logging the wider range of judgement calls behind any analysis, rather than specifically the cleaning actions applied to a dataset that this skill records.",
      },
      {
        href: "/data-analysis-prompts/python-analysis-prompt",
        label: "python analysis prompt",
        description: "For turning an agreed cleaning log into reproducible pandas code that reports its own row counts at every step, matching the numbers this skill recorded.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.w3.org/TR/prov-overview/",
        label: "W3C PROV Overview: data provenance standard",
        description: "The standards body definition of provenance as information about how a piece of data came to be, the discipline this skill applies at the scale of a single cleaning pass.",
      },
      {
        href: "https://www.go-fair.org/fair-principles/",
        label: "GO FAIR: the FAIR data principles",
        description: "An independent standard for making data findable, accessible, interoperable and reusable, which a documented cleaning log directly supports for anyone downstream.",
      },
      {
        href: "https://book.the-turing-way.org/reproducible-research/reproducible-research",
        label: "The Turing Way: Reproducible Research",
        description: "An open handbook on making the choices behind an analysis available and rerunnable, the wider discipline a cleaning audit trail serves in miniature.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm",
        label: "NIST/SEMATECH e-Handbook: outliers and data checking",
        description: "A primary statistical reference for deciding whether an extreme value is an error to flag or a real observation to keep, one of the five categories this skill checks.",
      },
    ],
  },

  tags: ["data analysis", "data cleaning", "audit trail", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
