import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Dashboard Metric Relevance Skill

Use this skill whenever you are asked to review a dashboard, an existing one or a proposed set
of tiles, and decide whether each metric on it actually belongs there. Its only job is to check
whether a metric maps to a real decision the dashboard's audience would make differently based
on the number, not whether the metric is well designed, well labelled, or interesting on its
own.

## Required input

This skill cannot judge relevance in a vacuum. It needs two things before doing anything else:
the actual list of metrics on the dashboard, and the real, stated purpose of the dashboard,
specifically the decisions the audience is meant to make while looking at it. If the purpose or
decision list has not been supplied, ask for it before evaluating a single metric. A metric that
looks essential against one stated purpose is pure decoration against another, so relevance
cannot be judged from the metric's name alone, however familiar or professional that name
sounds.

## Step one: list the metrics and the stated decisions side by side

Write out every metric on the dashboard in one column, and every decision the dashboard is
meant to support in a second column, quoted or paraphrased from what was actually supplied.
This working record is what every later judgement traces back to, since a comparison nobody can
see cannot be checked by anyone downstream.

## Step two: map each metric to the decision it would change

For each metric ask: if this number moved significantly in either direction, which listed
decision would the audience make differently, and how? Write the answer as a specific action,
not a general feeling of usefulness. "Would prompt a manager to move staff to that site" is a
mapped decision. "Would be good context to have" is not a mapped decision.

If a metric maps cleanly to one of the stated decisions, record which decision and the specific
action a change in the number would trigger. If two or three metrics all map to the same single
decision, note that too, since each one may still earn its place by informing a different part
of the same call.

## Step three: flag anything that does not map, and say specifically why

A metric that cannot be tied to any listed decision gets flagged as a vanity metric. The flag
must never read as a vague "this metric seems unnecessary." It must name the specific decision,
or the full list of stated decisions if none come close, the metric fails to inform, and explain
concretely what about the metric prevents it from informing that decision: no threshold exists
at which the audience would act differently, the number moves for reasons unrelated to anything
the audience controls, or the decision it might inform belongs to a different audience than the
one this dashboard actually serves.

## Step four: confirm what does map, not only what does not

State plainly, for every metric that does map to a real decision, which decision it serves and
what action a meaningful change would trigger. A dashboard where every metric earns its place
deserves a clear statement that the check was run and the metrics held up, not silence. Silence
reads as though the audit never happened at all.

## What this skill does not do

It does not judge whether a decision listed as the dashboard's purpose is itself a good decision
to be tracking, and it does not redesign the dashboard's layout. Its output is the mapping: which
metric serves which decision, which metric maps to none, and why. It also does not decide whether
a metric is calculated correctly or defined consistently elsewhere in an organisation; that is a
separate, prior question about the metric's internal correctness, not about whether it belongs on
this particular dashboard.

## How this differs from a metric definition audit

A metric definition audit checks whether a metric already on a dashboard or in a report means
the same thing everywhere it appears, the same population, window, and denominator, wherever the
name recurs. This skill asks a different, earlier question: whether the metric belongs on the
dashboard at all, regardless of how consistently it is defined. A metric can be defined with
perfect consistency everywhere it appears and still be a vanity metric that no decision depends
on. Run a relevance check before or independently of a definition audit; the two find different
kinds of problem and neither substitutes for the other.

## Using the worked example

See \`reference/worked-example.md\` for a dashboard's stated purpose, a full set of proposed
metrics, most mapped to specific decisions, and two flagged as vanity metrics with the specific
reasoning the flag requires.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a dashboard metric relevance check

Use this alongside \`SKILL.md\`. It applies the four step process to one dashboard: a stated
purpose, a list of proposed metrics, and the relevance check run against each one.

## The dashboard's stated purpose

Audience: a regional retail operations manager, opening the dashboard each morning on a phone
before the first shift starts.

Decisions the dashboard is meant to support:

1. Move staff between two nearby sites on the same day if one site is overwhelmed.
2. Escalate a stock shortage to the supplier team before it becomes a stockout.
3. Pause a running promotion if it is costing more in discount than it is earning in extra sales.

## Metrics proposed for the dashboard

- Sales by site, updated hourly
- Queue length by site, updated hourly
- Stock on hand by site, overnight count
- Promotion margin impact, redemptions against discount cost, daily
- Social media impressions for the current promotion, daily
- Total lifetime page views on the online store

## Metrics that map to a real decision

Sales by site, hourly, maps to decision one. A site running well above its normal hourly sales
pace while a nearby site runs below it is the specific signal that would prompt the manager to
move a staff member across today, not next week. The threshold is comparative and immediate,
which is exactly what a same day staffing call needs.

Queue length by site also maps to decision one, and sits alongside sales rather than duplicating
it: sales tells the manager which site is busier, queue length tells the manager whether that
site's current staffing is actually failing to keep up. Both metrics earn a place because each
informs a different part of the same staffing decision.

Stock on hand by site, overnight, maps to decision two. Once a site's count falls under its
agreed reorder threshold, that is the specific number that triggers escalating a shortage to the
supplier team before the shelf actually empties.

Promotion margin impact, daily, maps to decision three directly. Once the discount cost given
away exceeds the extra sales the promotion is generating, that is the specific threshold at
which the manager would pause it. This is the one metric on the list that can actually answer
the stated question about the promotion.

## Metrics flagged as vanity metrics, with the specific reasoning

Social media impressions for the current promotion is flagged. It fails to inform decision
three, whether to pause the promotion, because impressions measure how many people saw an ad,
not whether the promotion is profitable. Impressions can keep climbing while the promotion loses
money on every redemption, so no threshold on this number would ever tell the manager to pause
anything; the margin impact metric already answers that question directly, and this one cannot.

Total lifetime page views on the online store is flagged against all three stated decisions. It
is a cumulative counter that can only rise, so a change in the number carries no information at
all, and it maps to none of the three decisions: it says nothing about which site needs staff,
nothing about which site is short on stock, and nothing about whether the current promotion is
profitable. It reads as an impressive, ever growing figure with no action attached to it in this
dashboard's stated purpose.
`;

const meta: SkillMeta = {
  slug: "dashboard-metric-relevance-skill",
  name: "Dashboard Metric Relevance Check",
  title: "Dashboard Metric Relevance Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks whether each metric on a dashboard maps to a real, stated decision its audience would make differently, flagging vanity metrics with the specific decision they fail to inform.",

  seo: {
    primaryKeyword: "dashboard metric relevance skill",
    keywords: [
      "dashboard metric relevance skill",
      "free ai skill to audit dashboard metrics",
      "downloadable vanity metric checklist",
      "ai skill to check if a dashboard metric maps to a decision",
      "vanity metric audit for dashboards",
    ],
    seoTitle: "Dashboard Metric Relevance Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable dashboard metric relevance skill that checks whether each metric maps to a real decision, flagging vanity metrics with specific reasoning.",
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
      "Models reviewing a proposed dashboard reliably accept an impressive looking metric, a large follower count, a rising page view total, a wide reach figure, at face value once it is on the list, without checking whether any of the dashboard's stated decisions would actually change based on that number moving. This skill forces every metric to be mapped to a named decision before it earns a place, and requires any flag to state exactly which decision the metric fails to inform rather than a general sense that it seems unnecessary.",
  },

  article: {
    intro: [
      "A dashboard metric relevance skill has one job: decide whether a metric on a dashboard maps to a decision its audience would actually make differently, not whether the metric looks impressive or well designed. Handed a list of tiles and nothing about what the dashboard is for, most AI assistants judge a metric on how professional it sounds, approving a follower count or a page view total alongside numbers that genuinely drive a call someone makes each morning. This skill refuses that shortcut: it requires the dashboard's real, stated purpose before it will judge a single metric, and every flag it raises ties to the specific decision the metric fails to inform.",
      "It ships as two plain text files: a main instructions file setting a four step relevance check, and a worked reference file applying that check to one dashboard's full metric list, most mapped to a stated decision and two flagged as vanity metrics with the specific reasoning the flag requires. Both are previewable in full here before you download the zip.",
    ],
    sections: [
      {
        heading: "Why a metric needs a decision behind it, not just a name",
        body: [
          "A metric name alone tells an assistant nothing about whether it belongs on a given dashboard. Social media impressions is reasonable on a marketing reach dashboard and useless on a staffing dashboard, because the two support entirely different decisions. Judging relevance from a name is pattern matching against nothing, which is why this skill's first instruction is to require the dashboard's real, stated purpose before evaluating a single tile.",
          "When the purpose has not been supplied, the skill does not proceed as though relevance could still be judged. It asks for the decisions the audience is actually meant to make, because a metric that looks essential against one purpose can be pure decoration against another.",
        ],
      },
      {
        heading: "What this dashboard metric relevance skill actually checks",
        body: [
          "Given the dashboard's metric list and its stated decisions, the skill works through four steps. First it lists every metric against every decision side by side. Second it maps each metric to the specific decision it would change, as a concrete action, not a general feeling of usefulness. Third it flags anything that fails to map, naming the decision it fails to inform. Fourth it confirms everything that does map, so a clean dashboard gets a statement rather than silence. Downloaded as plain text, it works as a free ai skill to audit dashboard metrics in any tool that reads a text file.",
        ],
      },
      {
        heading: "Why a flag has to name the specific decision it fails to inform",
        body: [
          "A vague flag gives the dashboard's owner nothing to argue with or fix. This skill's instructions forbid a bare statement that a metric seems unnecessary. Every flag has to name the decision, or the full list of decisions, the metric fails to inform, and explain what specifically prevents it: no threshold exists at which the audience would act differently, the number moves for reasons the audience does not control, or the decision it might inform belongs to a different audience entirely. Used this way it functions as an ai skill to check if a dashboard metric maps to a decision, not a general opinion pass over the tile list.",
          "The same discipline applies to confirmations. A metric that does map gets the decision named and the action a meaningful change would trigger, which is what turns a downloadable vanity metric checklist into something a dashboard owner can act on rather than a list of opinions.",
        ],
      },
      {
        heading: "Worked example: metrics that map to a real decision",
        body: [
          "In the reference file's worked dashboard, a regional manager needs to move staff between sites, escalate stock shortages, and decide whether to pause a losing promotion. Sales by site, hourly, maps to the staffing decision: a site running well above its normal pace while a nearby site runs below it is the signal that would move a person across today. Stock on hand maps to the escalation decision once a count falls under its reorder threshold, and promotion margin impact, discount cost against extra sales, maps to the pause decision once the discount given away exceeds what the promotion earns back.",
        ],
      },
      {
        heading: "Worked example: catching a vanity metric with the specific reasoning",
        body: [
          "The same dashboard also proposes social media impressions for the promotion and total lifetime page views on the store. Run as a vanity metric audit for dashboards, the skill flags both, and says exactly why. Impressions cannot inform the pause decision because they measure how many people saw an ad, not whether the promotion is profitable, so no impression threshold would trigger a pause while the margin metric already answers that question. Lifetime page views is flagged against all three decisions at once, since it is a cumulative counter that only rises and maps to none of them, an impressive figure with no action attached to it here.",
        ],
      },
      {
        heading: "How this differs from a metric definition audit",
        body: [
          "A metric definition audit checks whether a metric already on a dashboard means the same thing everywhere it recurs: the same population, window, and denominator. This skill asks the earlier question, whether the metric belongs on the dashboard at all, regardless of how consistently it is defined. A metric can be defined with perfect consistency and still be a vanity metric no decision depends on, so the two checks catch different problems.",
        ],
      },
    ],
    howTo: {
      name: "How to use the dashboard metric relevance skill",
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
          name: "Supply the dashboard's stated purpose and decisions",
          text: "Hand the assistant the full metric list plus the real, specific decisions the dashboard's audience is meant to make, not a general description of the dashboard's topic.",
        },
        {
          name: "Require a named decision for every flag and confirmation",
          text: "Do not accept a bare verdict of relevant or vanity. Ask for the specific decision each metric maps to, or the specific decision each flagged metric fails to inform.",
        },
      ],
    },
    faq: [
      {
        question: "What does the skill need before it can judge whether a metric belongs?",
        answer:
          "It needs the dashboard's actual metric list and the real, stated decisions the audience is meant to make while looking at it. Without a stated purpose, relevance cannot be judged from a metric's name alone, since the same metric can be essential on one dashboard and decoration on another.",
      },
      {
        question: "What counts as a vanity metric flag versus a metric that just feels unnecessary?",
        answer:
          "A valid flag names the specific decision the metric fails to inform and explains concretely why, no threshold exists, the number moves for unrelated reasons, or it serves a different audience. A vague comment that a metric seems unnecessary without naming the decision it fails is exactly what this skill's instructions forbid.",
      },
      {
        question: "Does the skill only hunt for vanity metrics, or does it also confirm what works?",
        answer:
          "It does both. Every metric that maps to a real decision gets confirmed explicitly, naming the decision and the action a meaningful change would trigger, so a clean dashboard gets a clear statement that the check was run rather than silence about the metrics that were fine.",
      },
      {
        question: "How is this different from a metric definition audit skill?",
        answer:
          "A metric definition audit checks whether a metric already on a dashboard means the same thing every time it appears. This skill asks the earlier question, whether the metric belongs on the dashboard at all, regardless of how it is defined elsewhere.",
      },
      {
        question: "Can this be used on a dashboard that has not been built yet, only proposed?",
        answer:
          "Yes. The check works the same way against a proposed metric list as against an existing dashboard, since all it needs is the list of metrics under consideration and the decisions the finished dashboard is meant to support.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and no dashboard or decision list you eventually run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/data-analysis-skills/metric-definition-audit-skill",
        label: "metric definition audit skill",
        description: "For checking whether a metric already on a dashboard means the same thing everywhere it appears, a distinct question from whether it belongs there at all.",
      },
      {
        href: "/data-analysis-prompts/dashboard-design-prompt",
        label: "dashboard design prompt",
        description: "For building a new dashboard's tile list from scratch, a proactive design task this skill's reactive relevance check can later be run against.",
      },
      {
        href: "/data-analysis-prompts/metric-definition-prompt",
        label: "metric definition prompt",
        description: "For pinning down a metric's exact numerator, denominator and exclusions, useful before deciding whether that metric maps to a real decision.",
      },
      {
        href: "/data-analysis-prompts/report-automation-prompt",
        label: "report automation prompt",
        description: "For assembling a recurring report whose repeated metrics are exactly the kind of list this skill's relevance check should be run against periodically.",
      },
    ],
    externalLinks: [
      {
        href: "https://tim.blog/2009/05/19/vanity-metrics-vs-actionable-metrics/",
        label: "Eric Ries: Vanity Metrics vs. Actionable Metrics",
        description: "The original essay distinguishing metrics that make you feel good from metrics that show clear cause and effect and drive a specific action.",
      },
      {
        href: "https://www.kaushik.net/avinash/kill-useless-web-metrics-apply-so-what-test/",
        label: "Occam's Razor: the So What test for web metrics",
        description: "A practical test for whether a metric deserves a place on a report, asking so what until a concrete action either emerges or does not.",
      },
      {
        href: "https://www.nngroup.com/articles/vanity-metrics/",
        label: "Nielsen Norman Group: Vanity Metrics",
        description: "Independent usability research on why cumulative counters carry no signal and how converting a raw number into a rate can restore its meaning.",
      },
      {
        href: "https://amplitude.com/blog/actionable-metrics",
        label: "Amplitude: How to Identify and Use Actionable Metrics",
        description: "A working framework for testing whether a metric ties to a business result, the same test this skill applies at the level of a single dashboard.",
      },
    ],
  },

  tags: ["data analysis", "dashboards", "metrics", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
