import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Data Source Freshness Audit

Use this skill whenever you are given a report or dashboard that pulls
figures from more than one data source, and asked whether the numbers on it
are current. Its job is narrow: for every source feeding the report, check
the real last updated date against that source's own stated freshness
requirement, and flag exactly which sources have gone stale and by how much.

## What this skill needs before it can run

Ask for, or locate, two real facts for every source feeding the report:

1. The source's actual last updated date and time, as recorded by the system
   that produced it, not a guess at how current the data feels.
2. The freshness requirement stated for that specific source or data type,
   meaning the maximum age that source is allowed to reach before the
   figures it feeds are no longer considered current.

Also ask for the date and time the audit itself is being run. Every age is
computed relative to that specific point in time, supplied directly, never
to "now" left implicit or assumed from context.

Do not proceed without both facts for a source. A source with no recorded
last updated date cannot be scored as fresh or stale; mark it NO TIMESTAMP
and treat that as a defect in its own right, since a dashboard that cannot
say when a number was last true is not one anyone can trust regardless of
how the figure itself looks.

## The core rule: never assume a source is fresh

A source is never treated as current because it appears on a dashboard, has
always updated on schedule before, or belongs to a system that is generally
reliable. Freshness is established only from the actual last updated
timestamp given for that source at the time of this specific audit. If a
timestamp cannot be produced, the source is unverified, not fresh, and the
audit must say so plainly rather than passing it through silently.

The same discipline applies to the requirement side. Do not assume every
source needs the same allowance. A financial figure, a market data feed, and
a customer support metric can carry very different real thresholds, and
applying one blanket rule to all of them, such as treating everything as
current if it loaded today, hides exactly the failures a source by source
requirement exists to catch.

## Computing age, not estimating it

For every source with a real last updated timestamp, compute the exact age:
the difference between the audit timestamp and the source's last updated
timestamp, expressed in the same unit the source's own freshness
requirement uses, whether that is hours, days, or weeks. Do the arithmetic
from the two real timestamps given. Never round a gap to a vague phrase such
as "recently" or "a little while ago", and never infer an age from how the
figure looks or how important the source seems.

Compare the computed age against the source's own stated freshness
requirement, not a requirement borrowed from a different source or a general
site wide default. A source is FRESH when its age is at or under its
requirement, and STALE when its age exceeds it. For every STALE source,
report the exact overage: the computed age minus the requirement, in the
same concrete unit, so the reader sees precisely how far past its own
allowance that source has drifted rather than a vague warning that it is
old.

## Producing the audit output

For every source, output one line stating: the source name, its last
updated timestamp, its stated freshness requirement, its computed age, its
status of FRESH, STALE, or NO TIMESTAMP, and for a STALE source the exact
overage. Do not summarise the whole dashboard as current or stale as a
single verdict; a report with five sources and one stale source is a report
with one specific problem, not a generally untrustworthy report, and
naming the exact source lets the reader fix the one thing that is actually
wrong.

If any source is STALE or NO TIMESTAMP, say so explicitly in your overall
reply before restating any of the report's headline figures. Never present a
dashboard's numbers as current in a summary sentence while a source behind
one of those numbers has failed its own freshness check further down the
same reply; the flag belongs at the top, next to the figures it affects, not
buried in a table nobody reading the summary will scroll to.

## Using the reference file

See \`reference/freshness-worked-example.md\` for a full worked audit across
six real sources feeding a single sales and operations dashboard, with the
freshness requirement, the last updated timestamp, the computed age, and the
resulting status for each one, including the exact overage for every source
that fails its own requirement.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing six sources behind one dashboard

Use this alongside \`SKILL.md\`. It shows the audit format in practice: six
real sources feeding a single sales and operations dashboard, each with its
own last updated timestamp and its own stated freshness requirement, the age
computed for each, and the exact overage for every source that fails.

## The audit is run at 2026-07-31 09:00 UTC

Every age below is the exact difference between this audit timestamp and
each source's own last updated timestamp, in the unit that source's stated
requirement uses.

## The six sources and their stated requirements

1. Payment processor feed (financial figures). Freshness requirement: no
   more than 24 hours old. Last updated: 2026-07-30 08:00 UTC.
2. Market data feed (competitor pricing). Freshness requirement: no more
   than 1 week old. Last updated: 2026-07-24 09:00 UTC.
3. Inventory warehouse system (stock counts). Freshness requirement: no more
   than 6 hours old. Last updated: 2026-07-31 04:00 UTC.
4. Customer support ticket export (satisfaction score). Freshness
   requirement: no more than 48 hours old. Last updated: 2026-07-28 10:00
   UTC.
5. Marketing campaign spend tracker. Freshness requirement: no more than 24
   hours old. Last updated: 2026-07-31 07:30 UTC.
6. Headcount and payroll system. Freshness requirement: no more than 30 days
   old. Last updated: 2026-06-25 09:00 UTC.

## Computed ages and status

1. Payment processor feed: age is 25 hours (2026-07-30 08:00 UTC to
   2026-07-31 09:00 UTC). Requirement is 24 hours. Status: STALE, overage of
   1 hour.
2. Market data feed: age is 7 days and 0 hours (2026-07-24 09:00 UTC to
   2026-07-31 09:00 UTC). Requirement is 1 week. Status: FRESH, exactly at
   the requirement with no overage.
3. Inventory warehouse system: age is 5 hours (2026-07-31 04:00 UTC to
   2026-07-31 09:00 UTC). Requirement is 6 hours. Status: FRESH.
4. Customer support ticket export: age is 71 hours (2026-07-28 10:00 UTC to
   2026-07-31 09:00 UTC). Requirement is 48 hours. Status: STALE, overage of
   23 hours.
5. Marketing campaign spend tracker: age is 1 hour and 30 minutes
   (2026-07-31 07:30 UTC to 2026-07-31 09:00 UTC). Requirement is 24 hours.
   Status: FRESH.
6. Headcount and payroll system: age is 36 days (2026-06-25 09:00 UTC to
   2026-07-31 09:00 UTC). Requirement is 30 days. Status: STALE, overage of
   6 days.

## The audit summary this produces

Three of the six sources behind this dashboard are STALE against their own
stated freshness requirement: the payment processor feed by 1 hour, the
customer support ticket export by 23 hours, and the headcount and payroll
system by 6 days. The financial figures and the customer satisfaction score
on this dashboard should not be presented as current until the payment
processor feed and the ticket export are re-pulled, and any headcount based
metric should carry the 6 day overage as a caveat rather than being read as
this week's true count.

## Why the per source requirement matters here

Applying one blanket rule, such as flagging anything over 24 hours old,
would have wrongly cleared the market data feed at exactly 7 days and
wrongly flagged the headcount system days earlier than its own 30 day
allowance actually permits. Each source's own stated requirement is what
decides its status, never a single number borrowed from the source that
happens to sit next to it on the same dashboard.

## What this worked example deliberately leaves out

No source above is scored without both a real last updated timestamp and a
real stated requirement. If either fact is missing for a source in an
actual audit, that source is marked NO TIMESTAMP or held back from scoring
until the requirement is supplied, rather than assumed fresh so the audit
can proceed with a clean looking result.
`;

const meta: SkillMeta = {
  slug: "data-source-freshness-audit-skill",
  name: "Data Source Freshness Audit",
  title: "Data Source Freshness Audit Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks every real data source feeding a report or dashboard against its own stated freshness requirement, computing the exact age from real timestamps and flagging exactly how stale each failing source is.",

  seo: {
    primaryKeyword: "data source freshness audit skill",
    keywords: [
      "data source freshness audit skill",
      "free ai skill for data source freshness audit",
      "downloadable data freshness audit template",
      "ai skill to check dashboard data freshness",
      "data freshness checklist for reports",
    ],
    seoTitle: "Data Source Freshness Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable data source freshness audit skill that checks each report source's real last updated date against its own stated freshness requirement.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/freshness-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models handed a multi source dashboard reliably present every figure on it as current without checking each underlying source's real last updated timestamp against a real stated freshness requirement, since the dashboard's layout gives no visual signal that one feed loaded hours ago while another loaded weeks ago. This skill requires a real timestamp and a real per source requirement before any status is assigned, computes the exact age rather than estimating it, and refuses to summarise a dashboard as current while a source behind it has failed its own check.",
  },

  article: {
    intro: [
      "A data source freshness audit skill only earns its name if it can tell a reader which specific number on a dashboard is safe to trust right now, rather than declaring the whole report current or stale as a single verdict. Handed a dashboard pulling from several systems, most AI assistants will happily describe the figures as up to date without checking a single last updated timestamp against the requirement that actually applies to that source. This skill refuses that shortcut.",
      "It ships as two plain text files: a main instructions file and a worked reference file that runs the audit against six real sources feeding a single dashboard, each with its own last updated timestamp and its own stated freshness requirement. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant receives once you hand the archive over.",
      "The result names the exact source that has gone stale and by how much, instead of a single confident sentence that hides which figure a reader should not yet rely on.",
    ],
    sections: [
      {
        heading: "Why a dashboard gives no visual signal of staleness",
        body: [
          "A chart or a table looks exactly the same whether the data behind it loaded five minutes ago or five weeks ago. Nothing about a dashboard's layout warns a reader that one tile is current and the tile next to it is not, because both are rendered from whatever value the underlying system last wrote, with no indication of when that write happened.",
          "A data source freshness audit skill exists specifically to close that gap. Every source behind a dashboard is checked against a real timestamp and a real requirement, so the reader learns which specific figure is safe to act on and which one needs a fresher pull first.",
        ],
      },
      {
        heading: "The two real facts this skill will not proceed without",
        body: [
          "Every source needs its actual last updated date and time, recorded by the system that produced it, and its own stated freshness requirement: the maximum age that source may reach before the figures it feeds stop counting as current. Neither fact is invented. A source with no recorded timestamp is marked NO TIMESTAMP rather than assumed fresh, and a source with no stated requirement is held back from scoring.",
          "This is the discipline behind a free ai skill for data source freshness audit work: the check runs only on facts actually supplied, never a guess about how current a familiar system is.",
        ],
      },
      {
        heading: "Why one threshold never applies to every source",
        body: [
          "Different data types carry genuinely different real acceptable staleness. Financial figures might need to be no more than 24 hours old, while market pricing data might tolerate a week and a headcount system might tolerate a month. One blanket rule, such as flagging anything over a day old, would wrongly clear a market feed sitting at its real 7 day allowance and wrongly flag a payroll system days before its own 30 day requirement is reached.",
          "Used as an ai skill to check dashboard data freshness, this skill scores every source against its own stated requirement, never one borrowed from whichever source sits next to it on the same page.",
        ],
      },
      {
        heading: "Computing the exact age, not estimating it",
        body: [
          "The age of a source is the real difference between the audit timestamp and that source's last updated timestamp, computed in the same unit its requirement uses. A source is FRESH at or under its requirement, and STALE when it exceeds it, with every STALE source getting its exact overage reported in concrete hours or days, never a vague phrase like a while ago.",
          "The worked reference file that ships alongside the main instructions doubles as a downloadable data freshness audit template, and the same discipline works as a data freshness checklist for reports pulling from any number of systems.",
        ],
      },
      {
        heading: "Worked example: three stale sources on one dashboard",
        body: [
          "A sales and operations dashboard pulls from six sources: a payment processor feed, a market data feed, an inventory system, a customer support export, a marketing spend tracker and a payroll system, each with its own requirement. Audited at 2026-07-31 09:00 UTC, the payment feed comes back STALE by 1 hour against its 24 hour requirement, the support export is STALE by 23 hours against its 48 hour requirement, and the payroll system is STALE by 6 days against its 30 day requirement. The other three, including a market feed sitting exactly at its 7 day allowance, are FRESH.",
          "None of those three overages would surface from a summary that simply called the dashboard current, and each one points to a specific system that needs a fresher pull before use.",
        ],
      },
      {
        heading: "How this differs from a data cleaning log or an assumptions log",
        body: [
          "A data cleaning log records the actions taken to clean a dataset, such as how missing values or duplicates were handled, and an assumptions log records the judgement calls behind an analysis, such as which date range was included or how a metric was defined. Neither checks how old the data feeding a report actually is. This skill audits recency alone, source by source, using a real timestamp and a real requirement for each, and it deliberately does not touch cleaning decisions or analytical assumptions.",
        ],
      },
    ],
    howTo: {
      name: "How to use the data source freshness audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/freshness-worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather every source's real timestamp and requirement",
          text: "For each source feeding the report, collect its actual last updated date and time, and the freshness requirement stated for that specific data type, plus the date and time the audit is being run.",
        },
        {
          name: "Require the per source status before trusting a summary",
          text: "Reject a single verdict about the whole dashboard and ask for each source's computed age, its status, and the exact overage for any source marked STALE.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if a source has no recorded last updated timestamp?",
        answer:
          "The skill marks it NO TIMESTAMP rather than assuming it is fresh. A source that cannot say when it was last true is treated as a defect in its own right, separate from and at least as serious as a source that has a timestamp but has gone stale against its requirement.",
      },
      {
        question: "Does this skill decide what the freshness requirement should be?",
        answer:
          "No. It requires the requirement to be stated for each source, whether that is a company policy, a service level agreement, or a rule set by whoever owns the report, and it will not invent a default threshold or borrow one source's requirement for another source that has not stated its own.",
      },
      {
        question: "How is this different from the data cleaning log skill on this site?",
        answer:
          "That skill documents the cleaning actions applied to a single dataset, such as how duplicates or missing values were handled. This skill audits how old each data source feeding a report is, using a real timestamp and a real requirement, and does not touch cleaning decisions at all.",
      },
      {
        question: "How is this different from the assumption logging skill on this site?",
        answer:
          "The assumption logging skill records judgement calls behind an analysis, such as a narrowed date range or a metric definition. This skill checks recency alone: whether each source's real last updated date is within its own stated freshness requirement, computed in concrete hours or days rather than logged as a judgement call.",
      },
      {
        question: "Can this skill estimate how stale a source is if I do not have exact timestamps?",
        answer:
          "No, and its instructions explicitly forbid it. The age is computed as the exact difference between two real timestamps, the audit time and the source's last updated time. Without both, the skill withholds a status rather than rounding to a vague estimate like recently.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no report or timestamp you use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-skills/data-cleaning-log-skill",
        label: "data cleaning log skill",
        description: "For documenting the cleaning actions already applied to a dataset, rather than auditing how old each source feeding a report currently is.",
      },
      {
        href: "/data-analysis-skills/assumption-logging-skill",
        label: "assumption logging skill",
        description: "For logging the judgement calls behind an analysis, a different discipline from checking a source's real timestamp against its own stated freshness requirement.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description: "For scoring a table's completeness, validity and staleness column by column, a broader profiling pass this skill's per source recency check can feed into.",
      },
      {
        href: "/data-analysis-prompts/report-automation-prompt",
        label: "report automation prompt",
        description: "For deciding which figures in a recurring report need fresh commentary once every underlying source has passed this skill's freshness check.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.getdbt.com/docs/build/sources",
        label: "dbt Docs: source freshness",
        description: "The technical reference for defining a warn_after and error_after threshold per source and computing freshness from a real loaded_at timestamp, the same per source discipline this skill applies by hand.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Data_quality",
        label: "Wikipedia: Data quality",
        description: "An independent overview naming timeliness as one of the standard dimensions of data quality, the dimension this skill audits in isolation.",
      },
      {
        href: "https://montecarlo.ai/blog-data-freshness/",
        label: "Monte Carlo: what is data freshness",
        description: "A data observability practitioner's explainer on measuring freshness and setting service level agreements per data source rather than one blanket rule.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to auditing source freshness.",
      },
    ],
  },

  tags: ["data analysis", "data freshness", "dashboard audit", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
