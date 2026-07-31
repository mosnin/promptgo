import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Sample Size Sanity Check

Use this skill whenever you are handed a comparison between two or more
groups (an A/B test result, a survey cross tab, a before and after change) and
the actual sample sizes involved, and asked whether the difference being
claimed is something to trust or something to question.

## What this skill is and is not

This is a rough sanity check on sample size, not a real statistical
significance test. It does not compute a p value, a confidence interval or an
effect size, because doing that honestly requires the raw variance and the
baseline rate, not just a headline percentage and a group count. Never
produce a p value or a confidence interval under this skill's instructions,
even when asked directly for one. State plainly that a real test needs more
inputs than a sample size check can supply, and name what those inputs are.

## What you need before starting

Collect two things before applying the heuristic:

1. The claim, stated as a comparison, for example "variant B converted at 12
   percent versus variant A at 8 percent."
2. The sample size of every group in the comparison, including the smallest
   one, since the smallest group is what governs the check.

If either sample size is missing, ask for it. Do not guess a number from
context, and do not assume a total figure quoted elsewhere in a document
applies evenly to every group inside it.

## The heuristic bands

Apply this heuristic to the smallest group size in the comparison:

- Under 30: red flag, always. A gap between groups this small can appear or
  vanish from a handful of different outcomes, so treat any claimed
  difference as unproven regardless of how large the reported gap looks.
- 30 to 100: red flag unless the reported difference is very large, for
  example more than a two fold relative change or more than twenty points on
  a rate. Even then, label the finding as worth a real test before anyone
  acts on it.
- 100 to 300: caution. Flag anything but a large, clearly stated effect. A
  ten point difference on a rate around ten to fifty percent is still
  plausibly noise at this size.
- 300 and above: no automatic flag from size alone, but still note that a
  proper test, not this heuristic, is what actually confirms the result.

State which band the comparison falls into and why, citing the real sample
size given, not a rounded or estimated one.

## How to phrase the output

Every response has three parts, in this order:

1. The band the smallest group falls into and the exact number that put it
   there.
2. A plain sentence naming the finding as a red flag, worth a closer look, or
   not flagged by size alone. Never phrase this as a confirmed result.
3. A pointer to what would actually settle the question: a properly powered
   test run in advance, or a full statistical review such as this site's
   statistical check prompt, for a comparison worth the extra work.

## What this skill will not do

It will not assert that a comparison is statistically significant or not
significant, because that is a claim only a real test can support. It will
not fabricate a p value, a confidence interval or a standard error to make
the output look more rigorous than the inputs allow. When a user pushes back
and asks for a number anyway, restate that the number cannot be produced
honestly from a sample size alone and name the missing inputs instead.
`;

const HEURISTIC_REFERENCE_MD = `# The heuristic bands and their honest limits

This file expands on the four bands in \`SKILL.md\` and states plainly where
the heuristic stops being useful, so nobody mistakes a quick red flag check
for a calculated result.

## Why the bands are rough on purpose

The thresholds (30, 100, 300) are not derived from a formula run against the
specific comparison in front of you. A real required sample size depends on
the baseline rate, the size of the effect worth detecting and how sure you
need to be, and those numbers are rarely all available from a quick
comparison. The bands exist to catch the common, obvious case: a comparison
built on a handful of observations per group, presented as though it were
established. They are not a substitute for a calculation once the real
inputs are known.

## What the heuristic ignores

Several things that change a real answer are deliberately left out of this
rough check:

- The baseline rate. A ten point gap means something different at a five
  percent baseline than at a fifty percent baseline, and the heuristic bands
  do not adjust for that.
- Variance in the underlying measure. Two counts of successes out of a total
  behave differently from a continuous measure like revenue per user, and
  this check does not distinguish between them.
- Whether the comparison was decided on in advance or found by looking at
  many cuts of the same data. A sample size flag says nothing about the
  multiple comparisons problem; that needs a separate review.
- Paired or repeated measurements from the same people, which behave
  differently from independent groups and can make a small sample size more
  or less trustworthy than the bands assume.

## When the heuristic gives a false sense of safety

A comparison with hundreds of observations per group can still be
untrustworthy for reasons the size bands do not catch: a broken tracking
event, a definition that changed partway through, or a group that is not
actually comparable to the other one. Passing the size check is not the same
as a comparison being sound. It only means the raw count is not the reason to
doubt it.

## When to move past this check

Once a comparison survives the size bands, or once it needs a real answer
rather than a rough flag, hand it to an actual statistical test or a fuller
review process. A properly designed test states its required sample size in
advance, using the actual baseline rate and the smallest effect worth
detecting, rather than a generic rule of thumb applied after the fact. This
file's job ends at the point where that real calculation begins.
`;

const meta: SkillMeta = {
  slug: "sample-size-sanity-check-skill",
  name: "Sample Size Sanity Check",
  title: "Sample Size Sanity Check Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that flags when a claimed comparison rests on a sample too small to trust, using a plainly caveated heuristic rather than a fabricated p value or confidence interval.",

  seo: {
    primaryKeyword: "sample size sanity check skill",
    keywords: [
      "sample size sanity check skill",
      "free ai skill for sample size checks",
      "downloadable sample size red flag checklist",
      "ai skill to flag a small sample size",
      "quick sample size check for ai assistants",
    ],
    seoTitle: "Sample Size Sanity Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable sample size sanity check skill that flags comparisons built on samples too small to trust, without faking a p value or a confidence interval.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/heuristic-bands.md", content: HEURISTIC_REFERENCE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to compare two small groups routinely describe the larger percentage as the winning variant and report it with confident language, without mentioning that a gap of a few points between groups of forty and fifty observations each sits well inside the range ordinary chance would produce on its own. This skill forces the group sizes onto the page before any verdict is given, so a plain red flag appears in place of a confident sounding conclusion the numbers cannot actually support.",
  },

  article: {
    intro: [
      "A sample size sanity check skill has one narrow job: look at the group sizes behind a stated comparison and say, in plain language, whether those numbers are big enough to support the claim being made. It does not run a real statistical test, and it never invents a p value or a confidence interval it was not given enough information to calculate honestly.",
      "It ships as two plain text files: a main instructions file with the heuristic bands built in, and a short reference file explaining where those bands come from and where they stop being useful. Both are previewable in full on this page before you download the zip, and both are exactly what an AI assistant receives once the archive is handed over.",
      "The comparisons it is built for read like a headline: variant B converted at twelve percent against variant A's eight percent. Before that gap goes into a slide, this skill checks whether the groups behind it were forty each or four thousand each, because the same four point gap means something very different depending on which.",
    ],
    sections: [
      {
        heading: "Why models need a sample size sanity check skill at all",
        body: [
          "Handed two percentages and nothing else, a language model will readily name a winner and describe the gap in confident language, because fluent prose is what it produces by default. It rarely volunteers that the groups behind those percentages were small enough for the entire gap to be ordinary chance.",
          "This skill exists to interrupt that default. Before any verdict is produced, the group sizes have to be stated and checked against a heuristic, so the output names the sample size risk directly rather than burying it in a hedge nobody rereads. That interruption is what a free ai skill for sample size checks is built to provide, on demand, inside any conversation already underway.",
        ],
      },
      {
        heading: "Why the smallest group governs the comparison",
        body: [
          "A comparison is only as strong as its thinnest slice. A dataset with eleven thousand total rows can still rest a headline claim on a monthly cell of forty observations, and that cell, not the total, is what an ai skill to flag a small sample size has to check.",
          "Reporting the overall total alongside a claim can make a comparison look sturdier than it is. The instructions in this skill ask specifically for the smaller of the two groups being compared, not the combined count, before applying any of the bands below.",
        ],
      },
      {
        heading: "The heuristic bands, as a downloadable sample size red flag checklist",
        body: [
          "The bands run from an automatic flag under thirty observations in the smaller group, through a caution zone that only clears for a large, clearly stated effect, up to a size where the check no longer flags on size alone. Each band is written as a rough rule of thumb, not a calculated threshold specific to any one comparison's variance or baseline rate.",
          "Every flag has to cite the real number that produced it: the smallest group size given, not a rounded estimate or a total pulled from elsewhere in the same document.",
        ],
      },
      {
        heading: "This is a sanity check, not a real statistical significance test",
        body: [
          "The instructions are explicit on this point because it is the easiest part to slide past. This skill never computes or asserts a p value, a confidence interval or an effect size, and it says so directly when a user asks for one anyway, naming the raw counts and variance that a real calculation would require instead.",
          "A rough flag and a calculated result look similar once they are both written in confident prose. Keeping the disclaimer attached to every output, not just the introduction, is what keeps a reader from mistaking one for the other.",
        ],
      },
      {
        heading: "How this differs from the statistical check prompt",
        body: [
          "The statistical check prompt on this site runs a full sceptical review: five or more alternative explanations before any verdict, a count of every comparison examined, and a named conclusion. This skill does one narrower thing inside that larger process, a quick sample size sanity check skill pass that flags whether the groups involved are even large enough to be worth that fuller review.",
          "Use this skill first, on the raw comparison, to decide whether a finding is worth the deeper work at all. Move to the fuller review once the sample size has cleared the bands, or once a flagged finding still needs a documented answer for someone else.",
        ],
      },
      {
        heading: "Where a flagged comparison should go next, as a quick sample size check for ai assistants",
        body: [
          "A red flag from this skill is a starting point, not a dead end. The instructions point toward two next steps: designing a properly powered test with the sample size decided in advance, or running the comparison through a fuller statistical review when more context is already available.",
          "What the skill will not do is quietly wait out the flag by rephrasing the finding until it sounds more confident. The disclaimer and the cited numbers travel with the output every time.",
        ],
      },
    ],
    howTo: {
      name: "How to use the sample size sanity check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/heuristic-bands.md directly on this page before downloading, so the exact heuristic and its limits are visible up front.",
        },
        {
          name: "Gather the comparison and both group sizes",
          text: "Write the claim as a plain comparison and note the sample size of every group involved, including the smallest one, before handing anything to an assistant.",
        },
        {
          name: "Apply the heuristic to the smallest group",
          text: "Hand both files and the comparison to your assistant, keeping the folder structure intact so the main file can point to the reference file.",
        },
        {
          name: "Route the flagged result onward",
          text: "Take a red flag or a caution result to a properly powered test or a fuller statistical review rather than treating the flag itself as a final answer.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill calculate statistical significance?",
        answer:
          "No, and its instructions explicitly forbid it. It only checks whether the group sizes behind a comparison are large enough to be worth trusting at all, using a rough heuristic, and directs anyone who needs a real determination toward a proper test with the actual variance and baseline rate supplied.",
      },
      {
        question: "What counts as a sample that is too small to trust?",
        answer:
          "The heuristic treats anything under thirty observations in the smaller group as an automatic red flag, and thirty to a few hundred as a caution zone unless the reported effect is large and clearly stated. Every flag cites the real number, not a rounded estimate, so the reasoning stays checkable.",
      },
      {
        question: "How is this different from the statistical check prompt on this site?",
        answer:
          "The statistical check prompt runs a full sceptical review with alternative explanations, a multiple comparisons count and a named verdict. This skill is a narrower first pass that only checks whether the sample sizes involved are large enough to make that fuller review worthwhile in the first place.",
      },
      {
        question: "Does the heuristic adjust for a different baseline rate?",
        answer:
          "No, and the reference file says so plainly. A ten point gap means something different at a five percent baseline than at a fifty percent one, and this rough check does not adjust for that difference, which is exactly why it directs a properly designed test to handle any comparison that actually matters.",
      },
      {
        question: "What should happen after a comparison gets flagged?",
        answer:
          "Treat the flag as a starting point rather than a verdict. The instructions point toward two next steps: designing a properly powered test with the sample size set in advance, or running the finding through a fuller statistical review such as the statistical check prompt when more context is available.",
      },
      {
        question: "Can this skill be used on survey results, not just an A/B test?",
        answer:
          "Yes, the same size bands apply to any comparison between groups, including a survey cross tab or a before and after change. The skill does not distinguish measurement types, so treat a small cross tab cell exactly as it would treat a small experiment group.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "The fuller sceptical review to run once a comparison has cleared this skill's sample size bands and needs a documented verdict.",
      },
      {
        href: "/data-analysis-prompts/ab-test-analysis-prompt",
        label: "ab test analysis prompt",
        description: "For reviewing whether an experiment was prespecified and peeked at correctly, once its sample size has passed this check.",
      },
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description: "Applies the wider review this skill points toward to survey cross tabs, where small cells are a common source of the same risk.",
      },
      {
        href: "/data-analysis-skills/assumption-logging-skill",
        label: "assumption logging skill",
        description: "For recording a sample size flag as a tracked, numbered assumption before a conclusion is presented to anyone else.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm",
        label: "NIST/SEMATECH e-Handbook: sample sizes required",
        description: "A primary statistical reference for how a required sample size is actually calculated once the baseline rate and effect size are known.",
      },
      {
        href: "https://www.evanmiller.org/how-not-to-run-an-ab-test.html",
        label: "Evan Miller: How Not To Run an A/B Test",
        description: "A widely cited, practitioner facing explanation of how small samples and early peeking combine to make an ordinary gap look like a finding.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Sample_size_determination",
        label: "Wikipedia: Sample size determination",
        description: "A general reference on how sample size requirements are estimated, useful background for the calculation this skill deliberately does not perform.",
      },
    ],
  },

  tags: ["data analysis", "sample size", "statistics", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
