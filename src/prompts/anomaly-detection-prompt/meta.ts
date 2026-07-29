import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "anomaly-detection-prompt",
  name: "Four Gates",
  title: "Anomaly Detection Prompt",
  category: "data-analysis-prompts",
  taskType: "evaluate",
  summary:
    "Runs a fixed elimination order over a metric movement: pipeline completeness, then calendar, then the historical range of change, and only then a genuine break.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["anomalies", "time series", "monitoring", "alerts"],

  seo: {
    primaryKeyword: "anomaly detection prompt",
    keywords: [
      "anomaly detection prompt",
      "is this drop real or normal variation",
      "reporting lag makes yesterday look bad",
      "ai prompt for investigating a metric drop",
      "day of week seasonality in daily metrics",
      "spotting a broken data pipeline first",
    ],
    seoTitle: "Anomaly Detection Prompt: Real Break or Normal Noise?",
    seoDescription:
      "An anomaly detection prompt that eliminates reporting lag, weekday patterns and ordinary variation in a fixed order before it will call a movement a real break.",
  },

  prompt: {
    text: `You are triaging a movement in a time series. Your method is elimination in a fixed order, and you may not jump ahead to a business explanation because it is the interesting one.

THE METRIC AND THE MOVEMENT THAT PROMPTED THIS: {{ALERT}}
THE LAST SIXTY PERIODS OF THE SAME METRIC: {{SERIES}}
WHEN EACH PERIOD FINISHES ARRIVING, AND WHEN THIS SERIES WAS PULLED: {{PIPELINE}}
CALENDAR CONTEXT: WEEKDAY, HOLIDAYS, MONTH LENGTH, TERM DATES, ANYTHING RECURRING: {{CALENDAR}}
DEPLOYS, TRACKING CHANGES AND CAMPAIGNS IN THE LAST FOURTEEN PERIODS: {{EVENTS}}

Work four gates in order. Stop at the first gate that accounts for the movement.

GATE ONE, COMPLETENESS. Compare the pull time against the arrival schedule and estimate what fraction of the latest period had landed when the series was captured. If the period is still filling, stop here and state that the movement is not yet observable.

GATE TWO, CALENDAR. Compare the period against the same weekday and the same position in the month across the whole history. Express that comparison as a number rather than as an impression.

GATE THREE, ORDINARY RANGE. From the history supplied, give the median absolute period over period change and the five largest moves with their dates. Say where the current move sits in that distribution. A move inside the usual range is not an anomaly, however unwelcome it is.

GATE FOUR, GENUINE BREAK. Only reachable if the first three gates were passed. Classify the shape as a step, a spike, a drift or a level change confined to one segment. Say what class of cause produces that shape, and note which entries in the events list are consistent with it without asserting that any of them is responsible.

Finish with three checks in the order you would run them, cheapest first.

Never name a specific cause. You cannot see the deploy, the outage or the campaign, and naming one sends people to investigate a story instead of the data.`,
    variables: [
      {
        token: "ALERT",
        label: "The metric and the movement that prompted this",
        example: "Completed checkouts fell from about 3,100 a day to 2,410 yesterday, a drop of 22 percent",
      },
      {
        token: "SERIES",
        label: "The last sixty periods of the same metric",
        example:
          "Daily completed checkouts, 60 values oldest first: 2980, 3120, 3305, 3290, 2740, 2210, 2905, 3040 ... ending 2410",
      },
      {
        token: "PIPELINE",
        label: "Arrival schedule and pull time",
        example:
          "Payment events land in the warehouse hourly, but refunds and card settlements backfill for up to 36 hours. Series pulled at 09:00 the following morning.",
      },
      {
        token: "CALENDAR",
        label: "Weekday, holidays, month length and other recurring context",
        example:
          "Yesterday was a Monday. Saturdays run about 30 percent below weekdays. Last Monday was a bank holiday. Payday falls on the 28th.",
      },
      {
        token: "EVENTS",
        label: "Deploys, tracking changes and campaigns in the recent window",
        example:
          "Checkout redesign released to 50 percent of traffic four days ago, analytics tag updated six days ago, email campaign sent nine days ago",
      },
    ],
    expectedOutput:
      "A gate by gate verdict that stops at the first sufficient explanation, a numeric weekday comparison, the median and five largest historical moves with dates, a shape classification if the movement survives, and three ordered checks to run next.",
    followUps: [
      "Gate one says the period is still filling. Tell me the earliest hour tomorrow at which the figure becomes readable.",
      "Rerun gate three using only Mondays from the history rather than all sixty periods, and tell me if the verdict changes.",
      "Write the message I send to the engineering channel that describes the movement without implying the deploy caused it.",
    ],
    pitfalls: [
      "Pasting a short series makes gate three meaningless. Sixty periods is the minimum for a usable distribution of ordinary changes, and more is better for weekly patterns.",
      "If you omit the arrival schedule, gate one passes automatically and every incomplete period looks like a crash.",
      "Analysts skim to gate four because it is the interesting section. The order exists because the first three gates explain most alerts and cost nothing to check.",
    ],
  },

  eeat: {
    author: "Nadia Haddad",
    authorCredential:
      "Nine years as a data analyst in retail and healthcare, mostly spent explaining why a promising result was noise.",
    testedOn: ["GPT-5.2", "Gemini 3 Pro", "Claude Opus 4.5"],
    testingNote:
      "I tested this on eleven alerts saved from a retail warehouse over one winter. Seven of them stopped at gate one or gate two, which matched what had actually happened at the time. The gate that needed the most rewriting was the third: without the explicit demand for the five largest historical moves with dates, every model described the current change as unusual while the series plainly contained bigger ones.",
  },

  article: {
    intro: [
      "An anomaly detection prompt is mostly a device for slowing you down. A number moves, somebody screenshots it, and within ten minutes three people are theorising about a deploy. The theories are fluent, they are usually wrong, and they are expensive because they send engineers looking at code rather than at the arrival schedule.",
      "The structure here is four gates worked in a fixed order. Completeness first, then the calendar, then the historical range of ordinary change, and only after all three a genuine break.",
      "The order is not negotiable. A model allowed to reach the interesting conclusion first will build the earlier gates to support it.",
      "It also declines to name a cause, which is the constraint people argue with most. It cannot see your deployment history or your supplier's outage, so any specific cause it produced would be a guess wearing the tone of a diagnosis.",
    ],

    sections: [
      {
        heading: "Spotting a broken data pipeline before blaming the business",
        body: [
          "Spotting a broken data pipeline first is the highest yield habit in metric triage, and it is skipped because it is dull. A job that failed silently, a schema change upstream, a partition that never landed: all three produce a clean vertical drop that looks exactly like customers leaving.",
          "The tell is usually the shape. Real behaviour rarely falls to a round fraction of normal overnight and stays there. A figure that drops to precisely zero, or to almost exactly half, is describing an ingestion problem far more often than a market one.",
        ],
      },
      {
        heading: "Reporting lag makes yesterday look bad",
        body: [
          "Reporting lag makes yesterday look bad on almost every dashboard that has ever been built, because the most recent bar is drawn from a period that has not finished arriving. Settlements backfill, refunds post late, an offline sync runs overnight, and the freshest number is structurally the lowest one on the chart.",
          "Gate one asks for the arrival schedule and the pull time and compares them, which turns a recurring false alarm into an arithmetic statement. If eighty percent of yesterday had landed when you looked, a twenty percent drop is not a finding.",
        ],
      },
      {
        heading: "Day of week seasonality in daily metrics",
        body: [
          "Day of week seasonality in daily metrics is strong enough in most businesses to dwarf whatever people are worried about. Weekend volume can sit thirty percent below a weekday, so a Saturday to Monday comparison manufactures a recovery and a Friday to Saturday comparison manufactures a crisis.",
          "Gate two compares like with like and reports the difference as a number. It also catches the neighbours of that problem: a bank holiday landing on the comparison day, a five Monday month against a four Monday one, and a payday that shifts by a weekend and moves a whole week's shape with it.",
        ],
        list: [
          "The same weekday one week ago, and the same weekday four weeks ago.",
          "Public holidays in every market the metric aggregates over, not only the head office one.",
          "Month length, which quietly changes February by ten percent against January.",
          "Any promotion that ran on the comparison day and not on this one.",
        ],
      },
      {
        heading: "Is this drop real or normal variation",
        body: [
          "Is this drop real or normal variation is the question every alert is really asking, and it has an empirical answer that takes about a minute. Take the history, compute how much the metric moves from one period to the next as a matter of routine, and see where today sits in that distribution.",
          "Most alerts do not survive this. A series whose median daily change is eight percent and whose worst five days include a twenty six percent move has no business raising an alarm at twenty two percent. Gate three prints the five largest historical moves with their dates specifically so that the comparison is concrete rather than a claim about typical behaviour.",
        ],
      },
      {
        heading: "What the anomaly detection prompt will not tell you",
        body: [
          "The anomaly detection prompt will not tell you what caused the movement. It classifies the shape, which is genuinely informative, since a step, a spike and a slow drift are produced by different families of cause and point investigations in different directions. What it will not do is pick a member of that family.",
          "It also declines to compute a control limit or a z score unless the history supports one, and it will say which figures are missing instead of producing a threshold that looks authoritative. A fabricated limit is worse than no limit, because it gets encoded into an alerting rule and then fires forever.",
        ],
      },
      {
        heading: "Using it as a first response rather than a retrospective",
        body: [
          "Run as an ai prompt for investigating a metric drop, the value is in the first twenty minutes. That is the window where a wrong theory hardens into the working assumption, and also the window where the four gates cost least to check.",
          "Keep the output. A saved gate report gives the next person a baseline, and after a dozen alerts the pattern of which gate usually closes them tells you what to fix. If gate one keeps catching them, the problem is your refresh schedule rather than your customers.",
        ],
      },
    ],

    howTo: {
      name: "How to run the anomaly detection prompt",
      steps: [
        {
          name: "Pull sixty periods, not seven",
          text: "Gate three needs a distribution of ordinary changes. A week of history cannot tell you whether today's move is common, and it will make every move look severe.",
        },
        {
          name: "Write down the arrival schedule",
          text: "Ask whoever owns the pipeline when each period is complete, once, and reuse the answer. This single fact retires the most common false alarm on any dashboard.",
        },
        {
          name: "List events without ranking them",
          text: "Include the deploy, the tag change and the campaign, and resist marking one as the likely culprit. A ranked list is a conclusion the gates are supposed to reach.",
        },
        {
          name: "Run the three checks in the order given",
          text: "They are ordered by cost. Working the cheapest one first is what stops a fifteen minute question from consuming an engineer's afternoon.",
        },
      ],
    },

    faq: [
      {
        question: "How is the anomaly detection prompt different from a threshold alert?",
        answer:
          "A threshold fires when a number crosses a line and knows nothing about why. This works after the alert has fired, deciding whether it deserved to. In practice it becomes a filter that stops most alerts reaching a human as an emergency rather than as a note.",
      },
      {
        question: "How many periods of history does it need?",
        answer:
          "Sixty is a reasonable floor for a daily metric, since it gives roughly eight of each weekday and enough period over period changes to describe a range. Weekly metrics need proportionally longer histories, and anything with an annual shape needs at least two full years before the calendar gate means much.",
      },
      {
        question: "Why does it refuse to name a cause?",
        answer:
          "Because it has no access to your deploys, your suppliers or your outage log, so any named cause would be a plausible sentence rather than a finding. Naming one is actively harmful, since a specific and confident answer stops people checking the boring explanations that would have closed the alert.",
      },
      {
        question: "Can it work on a metric with no weekday pattern?",
        answer:
          "Yes, and gate two will simply report that the weekday comparison shows nothing. The gate is cheap enough to run regardless, and metrics people believe have no weekly rhythm frequently turn out to have one driven by internal processes rather than customer behaviour.",
      },
      {
        question: "What if the movement passes all four gates?",
        answer:
          "Then you have a genuine break and a shape classification, which is where investigation should start rather than where it should have started forty minutes ago. Use the three ordered checks, and treat the shape as a filter on which explanations are even possible.",
      },
      {
        question: "Should the output go to engineers or to the business?",
        answer:
          "Send the gate verdict to both and the shape classification to whoever investigates. The most valuable line for a non technical reader is usually gate one, since provisional data explains a startling share of the screenshots that arrive with a question mark attached.",
      },
      {
        question: "Does it handle several metrics moving at once?",
        answer:
          "Run it separately for each and then compare the gate verdicts. Correlated movements that all stop at gate one point at a shared pipeline. Correlated movements that all reach gate four point at something real, and the shared shape narrows the search considerably.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "For a movement that reached gate four and is about to be presented as a finding with a cause attached.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description:
          "When gate one keeps closing your alerts, this profiles the fields and the freshness behind the recurring problem.",
      },
      {
        href: "/data-analysis-prompts/report-automation-prompt",
        label: "report automation prompt",
        description:
          "Applies the same restraint to a recurring document, so commentary only appears when a number moves beyond its normal range.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "sql query prompt",
        description:
          "For writing the three ordered checks as queries against the warehouse without inventing columns.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc31.htm",
        label: "NIST/SEMATECH e-Handbook: control charts",
        description:
          "The primary reference for distinguishing routine variation from a signal, which is the formal version of the third gate.",
      },
      {
        href: "https://qualitysafety.bmj.com/content/12/6/458",
        label: "Benneyan and colleagues: statistical process control in healthcare",
        description:
          "A peer reviewed account of common cause against special cause variation, including how often ordinary swings get investigated as incidents.",
      },
      {
        href: "https://otexts.com/fpp3/stl.html",
        label: "Hyndman and Athanasopoulos: STL decomposition",
        description:
          "Explains how a series is split into seasonal, trend and remainder components, which is what the calendar gate approximates by hand.",
      },
      {
        href: "https://www.census.gov/data/software/x13as.html",
        label: "US Census Bureau: X-13ARIMA-SEATS",
        description:
          "The reference implementation for holiday and trading day adjustment, documenting the calendar effects that most internal dashboards ignore.",
      },
    ],
  },
};

export default meta;
