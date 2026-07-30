import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "dashboard-design-prompt",
  name: "Tile Auditor",
  title: "Dashboard Design Prompt",
  category: "data-analysis-prompts",
  taskType: "plan",
  summary:
    "Makes every tile justify itself with a decision and an action threshold, caps the count, and flags metrics whose daily numbers are too small to read.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["dashboards", "metrics", "reporting", "bi"],

  seo: {
    primaryKeyword: "dashboard design prompt",
    keywords: [
      "dashboard design prompt",
      "choosing metrics for an executive dashboard",
      "dashboard design best practices",
      "ai prompt for dashboard layout",
    ],
    seoTitle: "Dashboard Design Prompt: Build One People Actually Use",
    seoDescription:
      "A dashboard design prompt that ties every tile to a decision and an action threshold, caps the chart count, and names the metrics nobody would ever act on.",
  },

  prompt: {
    text: `You are designing a dashboard that will be looked at for about forty seconds a day. Space is scarce and attention is scarcer. Your instinct to include a metric because it is available must be overridden.

WHO OPENS THIS AND HOW OFTEN: {{VIEWERS}}
THE DECISIONS THEY CAN ACTUALLY MAKE: {{DECISIONS}}
METRICS AVAILABLE, WITH REFRESH LAG: {{METRICS}}
TYPICAL DAILY VOLUME BEHIND THE SMALLEST METRIC: {{VOLUME}}
WHAT EXISTS TODAY, IF ANYTHING: {{CURRENT}}

Produce this.

1. THE ONE QUESTION. State the single question this dashboard answers. Not three. If the decisions listed need more than one question, tell me it is two dashboards and split them.

2. TILE LIST, EACH JUSTIFIED. For every proposed tile give: the metric, the decision it feeds, and the threshold at which a viewer would do something differently. Any tile without a threshold is cut. Say which ones you cut and why.

3. NOISE WARNING. Using the daily volume, state for each rate or ratio whether a single day's value is readable or whether it must be shown as a rolling window. Name the window. A conversion rate on forty sessions a day is a random number generator and you must label it as one.

4. LAYOUT. Order tiles by decision urgency, not by data source. State what sits in the top left, since that is the only position guaranteed to be read.

5. WHAT THIS DASHBOARD CANNOT TELL YOU. A permanent panel of questions people will try to answer here and should not, with where they should go instead.

CRITICAL: do not propose a metric that is not in the available list. Do not include a tile because it is conventional. If the honest recommendation is four tiles, recommend four.`,
    variables: [
      {
        token: "VIEWERS",
        label: "Who opens this and how often",
        example: "Three regional operations managers, first thing each morning, on a phone",
      },
      {
        token: "DECISIONS",
        label: "The decisions they can actually make",
        example:
          "Move staff between sites, escalate a stock shortage, pause a promotion, call a site manager",
      },
      {
        token: "METRICS",
        label: "Metrics available, with refresh lag",
        example:
          "Sales by site hourly, stock on hand overnight, staff hours next day, NPS weekly, waste weekly",
      },
      {
        token: "VOLUME",
        label: "Typical daily volume behind the smallest metric",
        example: "The quietest site takes about 60 transactions a day",
      },
      {
        token: "CURRENT",
        label: "What exists today",
        example: "An eighteen tile report nobody scrolls past the second row of",
      },
    ],
    expectedOutput:
      "One stated question, a tile list where each entry names a decision and an action threshold, an explicit list of cuts, a rolling window recommendation for every rate too small to read daily, and a panel of questions this dashboard should not be used for.",
    followUps: [
      "Rewrite the tile list for a phone screen, keeping only what survives above the fold.",
      "For each cut tile, say whether it belongs in a monthly report instead or should stop being produced.",
      "Draft the alert rule that would replace the tile people currently check most often out of habit.",
    ],
    pitfalls: [
      "Listing every metric your warehouse can produce guarantees a crowded result. List the decisions properly and keep the metric list to what is genuinely maintained.",
      "Thresholds get invented if you do not push back. A threshold nobody agreed to is worse than none, because it looks like policy.",
      "Skipping the daily volume field removes the only defence against tiles that swing wildly for purely arithmetic reasons.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Every metric a model can name ends up on the dashboard, because adding a tile costs nothing and looks thorough. The filter that works is a threshold column: each tile has to state the number that would prompt an action, and any tile that cannot state one comes off. Applying that rule cuts a proposed layout by more than half and leaves only what somebody would act on.",
  },

  article: {
    intro: [
      "A dashboard design prompt is worth running mainly for what it removes. Most dashboards fail by addition: a tile gets added because someone asked, nobody ever removes one, and within a year the screen holds twenty numbers of which four are read and none are acted on.",
      "The constraint that does the work here is a threshold. Every proposed tile has to name the value at which a viewer would do something differently. Metrics that cannot produce such a number are not monitoring, they are scenery, and the prompt cuts them and tells you which it cut.",
    ],

    sections: [
      {
        heading: "Every tile needs a decision behind it",
        body: [
          "Choosing metrics for an executive dashboard usually starts from availability, which is the wrong end. The right end is the short list of things the viewer can actually change this week. A regional manager can move staff, escalate stock and pause a promotion, and a metric that touches none of those is reference material rather than a dashboard tile.",
          "Working from decisions also fixes the ownership question quietly. If a tile feeds a decision, somebody owns that decision and therefore owns the tile. Tiles with no decision have no owner, which is why nobody ever removes them and why they accumulate.",
          "The threshold is the harder half. Asking what number would make you act tends to expose that a widely watched metric has no such number, and that conversation is worth having even if the dashboard never gets built.",
        ],
      },
      {
        heading: "Dashboard design best practices for how many charts to show",
        body: [
          "Dashboard design best practices rarely give the count people want a rule for, and the honest rule is however many survive the threshold test, which is usually between four and eight. The count matters less than the fact that each one earned its place through the same filter.",
          "Position matters more than most layouts admit. The top left is the only tile guaranteed to be seen, so it should hold the number tied to the most urgent decision rather than the one that was easiest to compute. Everything below the fold on a phone is effectively an archive, and treating it as one is more honest than pretending the whole grid gets scanned.",
        ],
      },
      {
        heading: "Vanity metrics on a dashboard, and how to spot them",
        body: [
          "Vanity metrics on a dashboard are not always the obvious ones. Cumulative totals qualify, because they can only rise and therefore never signal anything. So do ratios with small denominators, which move violently for arithmetic reasons and get interpreted as events.",
          "The noise warning section handles that second case directly. A site taking sixty transactions a day cannot support a readable daily conversion rate, and showing one guarantees a weekly phone call about a number that reverted to its mean. A seven day rolling window costs nothing and removes the false alarm entirely.",
        ],
        list: [
          "Cumulative counters, which only ever go up and so contain no signal.",
          "Rates whose denominator is small enough that one event moves them several points.",
          "Metrics with a refresh lag longer than the decision cycle they are meant to inform.",
          "Anything nobody can name a threshold for, however senior the person who requested it.",
          "Comparisons against a target that has not been revised since the target was set.",
        ],
      },
      {
        heading: "Running the dashboard design prompt against a layout you already have",
        body: [
          "The most useful run is not a blank page. Paste the current tiles into the field for what exists today and let each one face the threshold test alongside the proposals. Used as an ai prompt for dashboard layout it reorders things sensibly; used as an audit of what is already on screen it deletes things, which is the more valuable operation.",
          "Expect resistance to the cuts, and expect some of it to be justified. A tile can exist for reassurance rather than decision, and reassurance is a legitimate purpose as long as it is stated. What the prompt prevents is reassurance tiles quietly outnumbering the ones people act on.",
          "The permanent panel listing what the screen cannot answer is the piece teams underrate. A dashboard that answers one question well will be asked ten others, and writing the honest boundary on the page itself redirects those questions faster than any conversation about scope.",
        ],
      },
    ],

    howTo: {
      name: "How to use the dashboard design prompt",
      steps: [
        {
          name: "Write the decision list before the metric list",
          text: "Name the handful of actions the viewer can take without asking permission. Everything else in the process follows from this list.",
        },
        {
          name: "Include the refresh lag with each metric",
          text: "A number that arrives a day after the decision window belongs in a report, and stating the lag is what surfaces that.",
        },
        {
          name: "Supply the smallest daily volume",
          text: "This is what drives the rolling window recommendations. Without it, every rate gets shown daily and several will be unreadable.",
        },
        {
          name: "Argue each cut with the person who asked for the tile",
          text: "Bring the missing threshold rather than the recommendation. The conversation is about what they would do, not about screen space.",
        },
        {
          name: "Publish the cannot answer panel on the dashboard itself",
          text: "Keep it visible rather than in documentation. It is read when someone is about to misuse the screen, which is the only moment it helps.",
        },
      ],
    },

    faq: [
      {
        question: "Will the dashboard design prompt work for a self serve BI tool?",
        answer:
          "Yes, since it produces a specification rather than an implementation. The tile list, thresholds and rolling window recommendations transfer to any tool, and the layout instructions are simple enough to follow in a builder that limits how tiles can be arranged.",
      },
      {
        question: "What if a senior stakeholder demands a tile with no threshold?",
        answer:
          "Keep it, label it as context rather than monitoring, and place it below the tiles that drive decisions. The point of the exercise is not to win every argument but to stop reference numbers occupying positions that action numbers need.",
      },
      {
        question: "How do I choose the rolling window length?",
        answer:
          "Pick the shortest window where a single event no longer moves the value noticeably, which for small sites is usually seven days. The prompt suggests one from your stated volume, and you should sanity check it against how quickly you actually need to react.",
      },
      {
        question: "Should targets appear on the dashboard?",
        answer:
          "Only when someone reviews them on a schedule. A stale target quietly becomes a permanent red tile that people learn to ignore, and that habit spreads to the tiles that matter. Show the target with the date it was last agreed.",
      },
      {
        question: "How often should the whole layout be revisited?",
        answer:
          "Twice a year is enough for most teams, and the trigger to do it sooner is a change in what viewers can decide rather than a change in available data. New metrics tempt you to add tiles; new decisions are the only good reason to.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/chart-selection-prompt",
        label: "chart selection prompt",
        description:
          "Once a tile has earned its place, this picks the form that answers its comparison without hiding the base size.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "For the moment a tile moves and somebody wants to know whether the movement means anything at all.",
      },
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description:
          "Tiles inherit every defect in their source table, so agreeing the cleaning rules first stops a dashboard reporting an export bug.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "Turns the weekly review a dashboard feeds into recorded owners and dates rather than a shared glance at a screen.",
      },
    ],

    externalLinks: [
      {
        href: "https://sre.google/sre-book/monitoring-distributed-systems/",
        label: "Google SRE Book: monitoring distributed systems",
        description:
          "The clearest published argument that every signal must be actionable, and the source of the alert fatigue reasoning behind the threshold rule.",
      },
      {
        href: "https://www.nngroup.com/articles/dashboards-preattentive/",
        label: "Nielsen Norman Group: dashboards and preattentive processing",
        description:
          "Usability research on how little of a dashboard is actually scanned, which is the evidence behind prioritising the top left position.",
      },
      {
        href: "https://www.gov.uk/service-manual/measuring-success",
        label: "GOV.UK Service Manual: measuring success",
        description:
          "An institutional standard for tying each published metric to a decision and an owner rather than to data availability.",
      },
      {
        href: "https://hbr.org/2019/09/dont-let-metrics-undermine-your-business",
        label: "Harvard Business Review: do not let metrics undermine your business",
        description:
          "Documents how a displayed metric becomes a target and distorts the behaviour it was meant to observe, which is the cost of a badly chosen tile.",
      },
    ],
  },
};

export default meta;
