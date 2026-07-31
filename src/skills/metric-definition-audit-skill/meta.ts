import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Metric Definition Audit Skill

Use this skill whenever you are asked to review a report, dashboard narrative, or analysis
document where a named metric, such as active users, conversion rate, or churn, appears more
than once. Its only job is to check whether that metric means the same thing everywhere it is
used, and to say so precisely.

## Required input

This skill needs the actual report or analysis text, not a summary of it and not a description
of what the report probably says. If the underlying text has not been supplied, ask for it
before doing anything else. A metric definition audit cannot be performed against a memory of
what a report likely said. It can only be performed against the specific sentences the report
actually contains.

## Step one: find every place the metric is named

Read the full text and list every passage that names the metric under audit, in the order it
appears. For each passage, quote the exact sentence or clause and note where it sits in the
document (which section or paragraph). This list is the working record for the rest of the
audit, not a mental note, since a comparison nobody can see cannot be checked by anyone
downstream.

## Step two: extract the definition attached to each use

For each passage on the list, extract what the metric is defined to mean at that point: the
population it counts, the time window it uses, any denominator, and any stated or implied
exclusion. Some passages state a definition explicitly. Others only imply one through the
number quoted or a footnote elsewhere in the document; note the implied definition and mark it
as implied rather than explicit, so the difference is visible in the audit output.

If a passage genuinely gives no way to infer a definition, mark it as undetermined rather than
guessing at what was probably meant.

## Step three: compare every pair of uses

Compare the definitions extracted in step two against each other, pass by pass. Two uses of the
same metric name agree when their population, window, denominator, and exclusions all match.
They conflict when any one of those differs without the document flagging that a change
occurred.

When two uses conflict, report the drift by quoting both passages side by side, in full, exactly
as they appear in the document, followed by a plain statement of what specifically differs
between them: the window, the population, the denominator, or an exclusion. Never report a
drift as a vague statement that a metric seems inconsistent. The two quoted passages and the
specific point of difference are the whole finding.

## Step four: report what agrees, not only what conflicts

When two or more uses of the same metric genuinely share the same definition, say so explicitly,
naming the passages that agree and the shared definition they use. A document that uses
conversion rate five times with one consistent definition every time deserves a clear statement
that consistency was checked and held, not silence. Silence reads as though the check was never
run at all.

## What counts as a genuine conflict versus a false alarm

Not every apparent difference is a conflict. A report that states active users, defined here as
logged in within the last seven days, once, then reuses the shorter phrase active users, seven
day, consistently afterward, is using one definition with a shorthand label, not drifting. A
genuine conflict is when the same unqualified name is given two different numerators,
denominators, or windows without the document ever announcing the change. Distinguish the two
before flagging anything.

## What this skill does not do

It does not decide which of two conflicting definitions is correct, and it does not rewrite the
report to fix the drift. Its output is the audit itself: the passages, the extracted
definitions, the comparison, and a plain statement of any conflict or confirmed consistency.
Correcting the report is a separate task for whoever owns it, done with full knowledge of exactly
where and how the definition changed. It also does not audit a metric that appears only once in
a document, since a single use has nothing to be compared against.

## How this differs from an assumption log

An assumption log records the choices made while producing a new analysis: which rows were
dropped, which outlier rule was applied, which definition was picked for a metric being computed
for the first time. This skill instead audits a document that already exists, checking whether a
metric name used repeatedly in that finished text keeps one meaning throughout it or silently
shifts partway through. Use an assumption logging skill while building an analysis. Use this
skill after a report is written, or when reviewing someone else's.

## Using the worked example

See \`reference/worked-example.md\` for a short report containing a genuine definition drift in a
named metric, the audit output that quotes both conflicting passages side by side, and a second
short example where the same metric is used consistently throughout.
`;

const WORKED_EXAMPLE_MD = `# Worked example: metric definition audit on two short reports

Use this alongside \`SKILL.md\`. It shows the audit applied twice: once to a report where a metric
genuinely drifts, and once to a report where the same metric holds one definition throughout.

## Example one: a report with a genuine drift

Passage A, from the growth summary near the top of the report:

"Active users grew 18 percent quarter over quarter, from 42,000 to 49,600. We define active
users as any account that logged in at least once in the trailing 30 days."

Passage B, four paragraphs later, in a section about engagement:

"Active users are more engaged than ever, with average session length up 12 percent. Active
users are measured as accounts with at least one logged in session within the trailing 7 days,
giving a daily active figure of 31,200."

### Audit output

Passages found naming active users: two, quoted above as Passage A and Passage B.

Definition extracted from Passage A: population is any account with at least one login, window
is trailing 30 days, denominator is none stated, no exclusion mentioned. Explicit definition.

Definition extracted from Passage B: population is any account with at least one login session,
window is trailing 7 days, denominator is none stated, no exclusion mentioned. Explicit
definition.

Comparison: the two passages name the same unqualified metric, active users, with two different
windows, a 30 day trailing count in Passage A against a 7 day trailing count in Passage B. Panel
never announces this change between the two mentions.

Finding: this is a genuine metric definition drift. Passage A's 49,600 and Passage B's 31,200 are
not two readings of one continuous trend. They describe two different populations measured over
two different windows, and presenting them together without noting the change makes the report's
growth narrative misleading.

## Example two: a report where the metric holds consistent

Passage C, from the summary line: "Conversion rate this quarter was 3.4 percent."

Passage D, from a channel breakdown: "By channel, conversion rate was 4.1 percent for search and
2.6 percent for social."

Passage E, from a footnote: "Conversion rate is defined throughout this report as checkout
completions divided by total site visitors within the calendar month shown."

### Audit output

Passages found naming conversion rate: three, quoted above as Passage C, Passage D, and Passage
E.

Definition extracted from each: population is total site visitors, window is the calendar month
shown, denominator is total site visitors, numerator is checkout completions, no exclusion
mentioned. Passage E states this explicitly; Passages C and D imply it by using the same label
with no competing definition offered anywhere in the document.

Comparison: all three passages are consistent with the single definition stated in Passage E. No
pair conflicts on population, window, or denominator.

Finding: conversion rate is used consistently throughout this report. Passages C, D, and E all
share the definition in Passage E, and no drift was found.
`;

const meta: SkillMeta = {
  slug: "metric-definition-audit-skill",
  name: "Metric Definition Audit Check",
  title: "Metric Definition Audit Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks whether a named metric like active users or conversion rate holds one consistent definition everywhere it appears in a report, quoting any conflicting passages side by side rather than flagging a vague inconsistency.",

  seo: {
    primaryKeyword: "metric definition audit skill",
    keywords: [
      "metric definition audit skill",
      "free ai skill for metric consistency",
      "downloadable metric definition checklist",
      "ai skill to check metric consistency in reports",
      "metric drift audit for data reports",
    ],
    seoTitle: "Metric Definition Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable metric definition audit skill that checks whether a report's metric holds one definition everywhere it is used, quoting every drift found.",
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
      "Models auditing a long report reliably accept a metric name at face value wherever it appears, carrying an early definition forward even after a later passage quietly narrows the population, shortens the window, or changes the denominator, then present the resulting numbers as one continuous trend. This skill forces every use of the named metric to be quoted, its definition extracted on its own, and every pair compared before any figure is treated as comparable to another.",
  },

  article: {
    intro: [
      "A metric definition audit skill only earns its name if it catches the moment a report starts using one metric name to mean two different things. Handed a document that says active users grew eighteen percent in one section and then quotes a smaller active user number two pages later, most AI assistants accept both figures as part of the same trend, because nothing in the text announces that the definition changed underneath the label. This skill reads a report the way a careful reader should: quoting the exact passages that use the metric, then comparing what each one actually means before accepting that two numbers describe the same thing.",
      "It ships as two plain text files: a main instructions file setting a three step audit process, and a worked reference file applying that process to two short sample reports, one with a genuine drift and one with a metric that holds steady throughout. Both are previewable in full here before you download the zip.",
    ],
    sections: [
      {
        heading: "Why the same metric name can mean two different things in one report",
        body: [
          "A report rarely announces a definition change in so many words. A metric like active users, conversion rate, or churn gets defined once, often in a footnote near the top, then gets reused across later mentions without anyone rereading the original definition each time. A monthly window quietly becomes a weekly window in a section written later. A denominator that once excluded trial accounts starts including them once a chart gets copied from a different dashboard. None of these changes are usually deliberate, but once a document mixes them, every number that follows is being compared against a moving target rather than a fixed one, and the reader is never told.",
        ],
      },
      {
        heading: "What this metric definition audit skill actually checks",
        body: [
          "Given the actual report or analysis text, not a summary of what it probably says, the skill works through three passes. First it lists every passage that names the metric under audit, quoted exactly and in order. Second it extracts what each passage defines the metric to mean: the population counted, the time window, the denominator, and any stated or implied exclusion. Third it compares every pair of extracted definitions, flagging any pair that differs without the document ever announcing a change. Downloaded as plain text, it works as a free ai skill for metric consistency in any tool that reads a text file.",
        ],
      },
      {
        heading: "How to tell a real drift from a shorthand label",
        body: [
          "Not every apparent difference is a conflict worth flagging. A report that states active users, defined as logged in within the last seven days, once near the top, then reuses the shorter label active users, seven day, consistently afterward, is applying one definition with a shorthand name, not drifting. A genuine conflict looks different: the same unqualified name, active users, appears twice with two different windows or denominators, and neither passage tells the reader anything changed. The skill is built to tell these two situations apart before it flags anything, because a false alarm on a labelled shorthand wastes the same trust a missed real drift does.",
        ],
      },
      {
        heading: "Worked example: a genuine metric definition drift caught mid report",
        body: [
          "A sample growth update states in its second paragraph that active users grew eighteen percent quarter over quarter, from 42,000 to 49,600, defining active users as any account that logged in at least once in the trailing 30 days. Four paragraphs later, in a section about engagement, the same report states that active users are measured as any account with a logged in session within the trailing 7 days, giving a daily figure of 31,200. Run against this text, the skill quotes both passages side by side, states that the window changed from 30 days to 7 days between the two mentions, and flags that 49,600 and 31,200 describe two different populations, not one continuous trend. The reference file doubles as a downloadable metric definition checklist walking through this exact comparison.",
        ],
      },
      {
        heading: "Worked example: confirming a metric that stays consistent",
        body: [
          "The same reference file also works through a report where conversion rate appears three times: once in a summary line, once in a channel breakdown, once in a footnote. Each mention uses the same definition, checkout completions divided by total site visitors within the same calendar month, and none of the three passages changes the window, population, or denominator. Run as a metric drift audit for data reports, the skill states this plainly, names the three passages by location, and reports the shared definition rather than staying silent because nothing was wrong. A clean pass deserves the same visible statement a real conflict gets.",
        ],
      },
      {
        heading: "How this differs from an assumption logging skill",
        body: [
          "An assumption logging skill records choices made while producing a new analysis: which rows got dropped, which outlier rule got applied, which definition got picked for a metric being computed for the first time. This metric definition audit skill instead starts after a report already exists, checking whether a metric name used repeatedly in that finished text keeps one meaning throughout or silently shifts partway through. Think of it as an ai skill to check metric consistency in reports someone else has already written, rather than a record of decisions made while numbers were first produced. Use an assumption log while building an analysis. Use this skill once a report using that analysis is already in front of you.",
        ],
      },
    ],
    howTo: {
      name: "How to use the metric definition audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Supply the full report text",
          text: "Hand the assistant the complete report or analysis text you want audited, not a summary of it, plus the specific metric name to check across every mention.",
        },
        {
          name: "Require quoted passages for every finding",
          text: "Do not accept a bare verdict of consistent or inconsistent. Ask for the specific passages quoted side by side, whether the finding is a genuine drift or a confirmed match.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as a genuine metric definition drift versus an acceptable shorthand?",
        answer:
          "A genuine drift is when the same unqualified metric name gets two different populations, windows, denominators, or exclusions across a document with no note that anything changed. A shorthand is when a full definition is stated once and then reused as a shorter label consistently afterward, which is one definition, not two.",
      },
      {
        question: "Does this skill need the full report text, or can I just describe what it says?",
        answer:
          "It needs the actual text. A description of what a report probably says cannot be checked passage by passage, since the audit depends on quoting the exact sentences that name the metric and comparing what each one specifically defines.",
      },
      {
        question: "What happens if the same metric is used consistently throughout the report?",
        answer:
          "The skill says so explicitly rather than staying quiet. It names the passages that agree and states the shared definition they use, so a clean report gets a clear, checkable statement that consistency was actually verified rather than simply assumed.",
      },
      {
        question: "How is this different from just asking an assistant to check the numbers?",
        answer:
          "A general request to check numbers tends to produce a vague comment about whether figures feel plausible. This skill instead ties every finding, a drift or a confirmed match, to the exact quoted passages that support it, which turns a feeling into something a reader can verify.",
      },
      {
        question: "Can this skill fix a report once it finds a drift?",
        answer:
          "No, and it is not built to. Its output is the audit itself: the quoted passages, the extracted definitions, and the comparison between them. Deciding which definition should stand and rewriting the report is a separate task left to whoever owns the document.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and no report you eventually run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/data-analysis-skills/assumption-logging-skill",
        label: "assumption logging skill",
        description: "For logging the choices made while producing a new analysis, a distinct job from auditing whether a finished report reuses a metric consistently.",
      },
      {
        href: "/data-analysis-prompts/metric-definition-prompt",
        label: "metric definition prompt",
        description: "For pinning down the exact numerator, denominator and exclusions behind a metric before it is first written into a report this skill can later audit.",
      },
      {
        href: "/data-analysis-prompts/report-automation-prompt",
        label: "report automation prompt",
        description: "For assembling a recurring report whose repeated metric mentions are exactly what this skill checks for definitional drift.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description: "For checking the underlying dataset a report's numbers come from, a separate concern from whether the report's own text defines its metric consistently.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.getdbt.com/docs/build/about-metricflow",
        label: "dbt Labs: About MetricFlow",
        description: "A working example of centralising a metric's definition so every downstream report reuses the same numerator and denominator instead of redefining it separately.",
      },
      {
        href: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/conformed-dimension/",
        label: "Kimball Group: Conformed Dimension",
        description: "The classic data warehousing discipline of defining a shared attribute once so it means the same thing everywhere it is reused, applied here to metrics instead of dimensions.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Data_governance",
        label: "Wikipedia: Data governance",
        description: "Background on the organisational practices that keep a term's meaning stable across an organisation, the wider discipline a single report's metric consistency sits inside.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to auditing metric definitions.",
      },
    ],
  },

  tags: ["data analysis", "metrics", "consistency", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
