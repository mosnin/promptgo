import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Assumption Logging Skill

Use this skill whenever you are asked to analyse data, summarise a dataset,
or present a conclusion drawn from numbers, no matter how small the analysis
is. Its job is narrow and specific: no conclusion leaves your hands without a
visible, numbered list of every consequential assumption that went into it,
and a plain statement of why each one was necessary.

## Why this exists

An analysis with hidden assumptions is the single most common way a data
conclusion misleads someone who did not do the analysis themselves. Missing
rows get dropped without a note. An extreme value gets removed because it
looked wrong. A date range gets narrowed until the chart looks clean. A
metric like "active user" gets defined one way this week and a different way
next week. None of these choices are dishonest on their own, but a reader who
cannot see them has no way to judge whether the conclusion still holds if the
choice had gone the other way.

## The core rule

Every time you present a conclusion drawn from data, whatever the size of the
analysis, you must also produce a section titled "Assumptions made in this
analysis" as a numbered list. Do not skip this section because the analysis
felt simple or the assumptions felt minor. A short list is still required.
Refuse to present a conclusion on its own, even when asked only for the
headline number or a one line summary; append the assumptions log regardless
of how the request was phrased.

## What each entry must contain

Every numbered entry states two things, always in this order:

1. What was assumed, written as a specific and checkable decision, not a
   vague caveat.
2. Why it was necessary, naming the exact ambiguity or gap in the data that
   forced the choice.

An entry that only states what was assumed, with no stated reason, is
incomplete. "Rows with a missing signup date were excluded" is not enough on
its own. "Rows with a missing signup date were excluded because signup date
is required to compute tenure, and 40 of 2,150 rows had no value recorded"
gives the reader what they actually need to judge the choice.

## Where consequential assumptions usually hide

Check every analysis against these four categories before writing the
assumptions log, because each one is a place a choice gets made silently:

- How missing data was handled: dropped, imputed, or kept as its own
  category, and how much of the data that decision touched.
- How outliers or extreme values were treated: kept, capped, or removed, and
  what rule decided a value counted as an outlier in the first place.
- What date range or population was included or excluded, and why that
  boundary was chosen rather than a wider or narrower one.
- What a metric definition actually means: the exact numerator, denominator,
  and any exclusions folded into a term like "active", "churned", or
  "qualified".

Not every analysis touches all four categories. Only log the ones that were
actually consequential to the conclusion being presented, but check all four
every time rather than relying on memory of what usually matters.

## When no consequential assumption was needed

This is rare but it happens, for example a complete dataset with an
unambiguous metric and no excluded rows. Even then, do not omit the section.
State plainly that no consequential assumptions were required, and name the
one or two facts that made the data unambiguous, for example "no rows were
missing this field" or "the metric already had a single definition in use
downstream." This keeps the format consistent so a reader never has to wonder
whether the list was simply skipped rather than genuinely empty.

## What this skill does not do

It does not decide which assumption is correct, and it does not require the
safest or most conservative choice available. It only requires that whatever
choice was actually made is visible, numbered, and paired with the reason it
was necessary. A conclusion built on a debatable assumption is still allowed
to stand, as long as the debate is visible to the reader rather than resolved
silently on their behalf. It also does not fabricate a justification for a
choice it cannot actually explain; if the real reason was convenience rather
than a genuine data gap, say so rather than inventing a tidier sounding one.

## Using the worked example

See \`reference/worked-example.md\` for a small dataset description, the
resulting numbered assumptions log, and the conclusion that log supports, as
a concrete template for the format described above.
`;

const WORKED_EXAMPLE_MD = `# Worked example: assumption log for a small dataset

Use this alongside \`SKILL.md\`. It shows the format in practice: a small
dataset description, the numbered assumptions log a proper analysis of it
would produce, and the conclusion that log actually supports.

## The dataset

A support team exports 640 ticket records covering six weeks. Each row has a
ticket_id, an opened_at timestamp, a resolved_at timestamp that is blank for
54 rows, a resolution_time_hours column computed from those two timestamps, a
category field with 11 distinct values including a blank category on 22
rows, and a customer_tier field of "standard" or "priority". The request put
to the analysis is: what is our average resolution time, and is it faster
for priority customers?

## Assumptions made in this analysis

1. What was assumed: the 54 rows with no resolved_at timestamp were excluded
   from the resolution time calculation rather than treated as zero or
   filled with the dataset average.
   Why it was necessary: a blank resolved_at means the ticket was still open
   when the export was taken, not that it resolved instantly, so treating it
   as zero or filling it with an average would misstate the true resolution
   time rather than reflect a real value.

2. What was assumed: three rows with a resolution_time_hours value above 900
   hours were treated as data entry errors and excluded, rather than genuine
   long running tickets.
   Why it was necessary: every other value in the dataset falls under 200
   hours, all three flagged rows have an opened_at date that is clearly a
   typo in a different year, and including them would move the average by a
   factor the rest of the data cannot support.

3. What was assumed: the 22 rows with a blank category were kept in the
   overall average but excluded from any breakdown by category.
   Why it was necessary: a blank category cannot be assigned to a real group
   without guessing, so folding it into the overall figure is defensible
   while forcing it into a named category is not.

4. What was assumed: the analysis covers only the six weeks present in the
   export, not a longer trailing window.
   Why it was necessary: no data outside this window was supplied, so any
   claim about a longer period would be an assumption about tickets nobody
   has seen rather than a reading of the data actually provided.

5. What was assumed: "priority customer" was defined using the customer_tier
   field exactly as labelled in the export, with no attempt to reclassify
   accounts that may have changed tier during the six week window.
   Why it was necessary: the export has no tier history, only a current tier
   value, so a mid window tier change cannot be detected or corrected for
   from the data actually given.

## The conclusion this log supports

Average resolution time across the 583 tickets with a recorded resolution,
excluding the three flagged outliers, is 18.4 hours. Priority tickets
resolved in an average of 11.2 hours against 21.6 hours for standard
tickets, a gap that holds across the six week window covered by this export.
This conclusion should be read with the assumptions above in mind,
particularly that the 54 still open tickets are not represented in the
average at all, and that a longer window or a corrected tier history could
change the specific numbers even if the general pattern proves stable.

## Why the log format matters here

Without the numbered list above, a reader would see "average resolution
time is 18.4 hours, priority is faster" and have no way to know that open
tickets were dropped, that three implausible values were removed, or that
tier assignment could not account for a mid window change. Each of those
choices is reasonable on its own. None of them are visible in the headline
numbers alone, which is exactly why the log has to sit next to the
conclusion rather than live in a notebook nobody downstream ever opens.
`;

const meta: SkillMeta = {
  slug: "assumption-logging-skill",
  name: "Assumption Logging Check",
  title: "Assumption Logging Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that forces every data conclusion to ship with a numbered, visible log of the consequential assumptions behind it, each paired with the reason it was necessary, and refuses to present a conclusion without one.",

  seo: {
    primaryKeyword: "assumption logging skill",
    keywords: [
      "assumption logging skill",
      "free ai skill for assumption logging",
      "downloadable assumptions log template",
      "ai skill to document data assumptions",
      "assumptions log for data analysis",
    ],
    seoTitle: "Assumption Logging Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable assumption logging skill that forces every data conclusion to ship with a numbered log of the assumptions behind it and why.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models handling a data analysis task default to resolving every ambiguous choice silently and returning a single confident number, so a reader sees a clean conclusion with no way to tell that a missing field was dropped, an extreme value was removed, or a metric was defined without notice. This skill forces every consequential choice into a visible, numbered list with a stated reason, and refuses to present a conclusion without one attached.",
  },

  article: {
    intro: [
      "An assumption logging skill only earns its name if it makes hidden choices visible rather than merely promising to. Handed a spreadsheet with missing signup dates, a handful of extreme values, and a metric like active user that nobody has pinned down precisely, most AI assistants will quietly resolve every one of those questions themselves and hand back a single confident number. This skill is built to stop that: no conclusion is presented without a numbered, visible list of exactly which choices were made and why.",
      "It ships as two plain text files: a main instructions file that sets the rule, and a worked reference file showing the format applied to a real dataset. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why hidden assumptions are the core risk in any data conclusion",
        body: [
          "An analysis with hidden assumptions is the single most common way a data conclusion misleads someone who did not do the analysis themselves. Missing rows get dropped without a note. An extreme value gets removed because it looked wrong. A date range gets narrowed until the chart looks clean. None of these choices are dishonest on their own, but a reader who cannot see them has no way to judge whether the conclusion survives if the choice had gone the other way.",
          "This is exactly the gap an assumption logging skill is built to close. Every consequential choice becomes a line in a numbered list instead of a silent step buried inside the calculation, so the finding that impressed someone and the finding a different reasonable choice would have produced are both visible at once.",
        ],
      },
      {
        heading: "What counts as a consequential assumption",
        body: [
          "Four categories cover most of the choices that actually move a conclusion: how missing data was handled, how outliers or extreme values were treated, what date range or population was included or excluded, and what a metric definition actually means once its numerator, denominator and exclusions are written down. This assumption logging skill checks all four every time, whether or not each one turns out to matter for the specific dataset in front of it.",
          "Think of it as an ai skill to document data assumptions rather than a tool that decides which choice is correct. A defensible assumption, clearly stated, is allowed to stand; an invisible one is not, regardless of how reasonable it later turns out to have been.",
        ],
      },
      {
        heading: "The format this skill enforces",
        body: [
          "Every numbered entry states two things in a fixed order: what was assumed, written as a specific and checkable decision rather than a vague caveat, and why it was necessary, naming the exact ambiguity or gap in the data that forced the choice. An entry with no stated reason is treated as incomplete, because the reason is what lets a reader judge whether the same choice would hold on their own data.",
          "The reference file that ships alongside the main instructions doubles as a downloadable assumptions log template, showing the exact two part format applied line by line to a real dataset rather than described in the abstract.",
        ],
      },
      {
        heading: "Worked example: the assumption logging skill applied to a small dataset",
        body: [
          "A support team exports 640 ticket records covering six weeks, with 54 rows missing a resolution timestamp, three implausible resolution times, and a customer tier field with no history. Run against that export, the log states five numbered entries: why the 54 open tickets were excluded rather than treated as zero, why three timestamps were dropped as entry errors rather than genuine outliers, why a blank category was kept in the overall figure but dropped from any category breakdown, why the analysis covers only the six weeks present in the export, and why customer tier was read exactly as labelled with no attempt to correct for a mid window change. The conclusion, an average resolution time of 18.4 hours with priority tickets resolving faster, is only trustworthy once a reader can see those five choices sitting next to it.",
          "Keeping an assumptions log for data analysis like this one only works if it is produced every time a conclusion is presented, not only when something already feels uncertain, because the choices that go unnoticed are exactly the ones nobody thought to flag in the first place.",
        ],
      },
      {
        heading: "When no consequential assumption was needed",
        body: [
          "This is rare, but it happens: a complete dataset with an unambiguous metric and no excluded rows. Even then, the skill does not omit the section. It states plainly that no consequential assumptions were required, and names the one or two facts that made the data unambiguous, so a reader never has to wonder whether the list was simply skipped rather than genuinely empty.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not decide which assumption is correct, and it does not require the most conservative choice available. It only requires that whatever choice was made is visible, numbered and paired with the reason it was necessary. Downloaded as plain text, it works as a free ai skill for assumption logging in any tool capable of reading a text file, and it will not fabricate a justification it cannot honestly give.",
        ],
      },
    ],
    howTo: {
      name: "How to use the assumption logging skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Point it at a real analysis",
          text: "Hand the assistant the dataset or the finished analysis you want checked, along with any known gaps such as missing fields or a metric that has more than one definition in use.",
        },
        {
          name: "Require the assumptions log before accepting a conclusion",
          text: "Do not accept a headline number or a one line summary on its own; ask for the numbered assumptions log every time, even when the analysis feels simple.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if the analysis genuinely has no consequential assumptions?",
        answer:
          "The skill still produces the section rather than omitting it. It states plainly that no consequential assumptions were required and names the specific facts that made the data unambiguous, such as no missing values or a metric with a single existing definition, so a reader never has to guess whether the list was skipped.",
      },
      {
        question: "Does the assumption logging skill replace checking the data myself?",
        answer:
          "No. It makes the choices already being made visible so you can judge them, but it does not verify the underlying data is correct or catch a defect nobody flagged. Treat the numbered log as the starting point for your own review rather than a substitute for looking at the data yourself.",
      },
      {
        question: "What if I only want a quick headline number, not a full write up?",
        answer:
          "The skill still refuses to hand back a bare number. Even a one line answer gets the numbered assumptions log appended below it, because a short analysis can hide exactly the same missing data or outlier decision as a long one, and the length of the answer has no bearing on whether a choice was made.",
      },
      {
        question: "Can this skill be used for qualitative analysis, not just numeric data?",
        answer:
          "Partly. The categories around population and date range transfer directly, and metric definition maps onto how a qualitative theme or response category was defined. The missing data and outlier categories assume something countable, so treat those two as prompts to think about coverage and unusual responses rather than arithmetic.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no dataset or analysis you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Why does every assumption entry need a stated reason, not just the choice itself?",
        answer:
          "Because the choice alone does not let a reader judge it. Stating that missing rows were dropped tells you what happened; stating that they were dropped because the field is required for the calculation and no reasonable substitute exists tells you whether the choice was defensible for your own purposes.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description: "For producing the numbered cleaning rules, including missing value and duplicate handling, that this skill expects to see logged as assumptions afterward.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "For testing whether a finding survives scrutiny of sample size and alternative explanations once its assumptions are already on record.",
      },
      {
        href: "/data-analysis-prompts/metric-definition-prompt",
        label: "metric definition prompt",
        description: "For pinning down the exact numerator, denominator and exclusions behind a metric before this skill logs that definition as a stated assumption.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description: "For writing up a finding that has already been through this skill's assumptions log, without losing the caveats in the retelling.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.gov.uk/government/publications/the-aqua-book-guidance-on-producing-quality-analysis-for-government",
        label: "gov.uk: The Aqua Book, guidance on producing quality analysis",
        description: "Official UK government guidance requiring analysts to keep a register of assumptions that have been risk assessed and signed off, the same discipline this skill applies to a single conclusion.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm",
        label: "NIST/SEMATECH e-Handbook: outliers and data checking",
        description: "A primary statistical reference for deciding whether an extreme value is an error to flag or a real observation to keep, one of the four categories this skill checks.",
      },
      {
        href: "https://book.the-turing-way.org/reproducible-research/reproducible-research",
        label: "The Turing Way: Reproducible Research",
        description: "An open handbook on making the choices behind an analysis available and rerunnable, the wider discipline that a visible assumptions log serves in miniature.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to logging assumptions.",
      },
    ],
  },

  tags: ["data analysis", "assumptions", "transparency", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
