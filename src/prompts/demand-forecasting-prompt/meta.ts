import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "demand-forecasting-prompt",
  name: "Range Forecaster",
  title: "Demand Forecasting Prompt",
  category: "data-analysis-prompts",
  taskType: "plan",
  summary:
    "Blocks any single number forecast that arrives without a range, measures the proposal against a naive baseline, and writes down in advance the events that would break it.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["forecasting", "seasonality", "planning", "uncertainty"],

  seo: {
    primaryKeyword: "demand forecasting prompt",
    keywords: [
      "demand forecasting prompt",
      "forecast range instead of a single number",
      "how much history before forecasting seasonality",
      "ai prompt for sales forecasting",
      "what would invalidate a forecast",
      "naive baseline to beat before modelling",
    ],
    seoTitle: "Demand Forecasting Prompt: Ranges, Not a Single Number",
    seoDescription:
      "A demand forecasting prompt that refuses a point estimate without a stated range, scores itself against a naive baseline, and names the events that would break it.",
  },

  prompt: {
    text: `You are producing a demand outlook, not a number. A single figure with no interval attached will be treated as a commitment by whoever reads it, so you may never present one.

WHAT IS BEING FORECAST AND IN WHAT UNITS: {{TARGET}}
HISTORY, PERIOD BY PERIOD, OLDEST FIRST: {{HISTORY}}
KNOWN ONE OFF EVENTS AND THEIR DATES: {{EVENTS}}
CAPACITY, STOCK OR SUPPLY LIMITS THAT APPLIED IN ANY PERIOD: {{CONSTRAINTS}}
THE HORIZON AND THE DECISION THIS FEEDS: {{HORIZON}}

Work through the following and label each part.

A. HISTORY AUDIT. Count the periods supplied. State how many full seasonal cycles that covers. If it is fewer than two complete cycles, declare seasonality unestimable and say so before anything else. Identify any period where the constraints field means the recorded figure is capped demand rather than true demand.

B. DECOMPOSITION IN WORDS. Describe the level, the direction of drift, the repeating within year shape, and the one off spikes, keeping them separate. Attribute each spike to a listed event or mark it unexplained. Do not smooth away an unexplained spike.

C. BASELINE. State what the seasonal naive method would predict for each horizon period, meaning the value from the same period one cycle ago. This is the number to beat.

D. OUTLOOK. For every horizon period give a low, central and high figure, and say in one sentence what has to be true for each. If your central figure equals the baseline, say that plainly rather than dressing it up.

E. INVALIDATORS. List at least four specific, observable events that would make this outlook wrong, each with the date by which you would know.

Never quote an accuracy percentage, a MAPE or an interval width derived from a backtest you did not run on data I gave you. If you cannot compute it from the history above, say which figures are missing.`,
    variables: [
      {
        token: "TARGET",
        label: "What is being forecast, in units",
        example: "Weekly units sold of a single SKU, 500ml sports drink, across 22 convenience stores",
      },
      {
        token: "HISTORY",
        label: "History period by period, oldest first",
        example:
          "2024 weekly units: 410, 388, 402, 455, 512, 630, 780, 905, 870, 640, 505, 430 ... continuing to week 52 of 2025",
      },
      {
        token: "EVENTS",
        label: "Known one off events and dates",
        example:
          "Heatwave in weeks 27 to 29 of 2024, a two for one promotion in week 44 of 2024, and a competitor delisting from week 6 of 2025",
      },
      {
        token: "CONSTRAINTS",
        label: "Capacity, stock or supply limits by period",
        example: "Out of stock in nine stores for weeks 28 and 29 of 2024 because the depot ran dry",
      },
      {
        token: "HORIZON",
        label: "Horizon and the decision it feeds",
        example: "Next 13 weeks, feeding a purchase order placed six weeks ahead of delivery",
      },
    ],
    expectedOutput:
      "A count of seasonal cycles in the history with a verdict on whether seasonality can be estimated at all, a written decomposition, a seasonal naive baseline per period, low central and high figures with the condition attached to each, and at least four dated invalidators.",
    followUps: [
      "Rewrite the outlook assuming weeks 28 and 29 were stock capped, and tell me how much that changes the summer peak.",
      "Convert the invalidator list into a weekly check I can run in ten minutes, naming the number I look at each time.",
      "The buyer wants one number for the purchase order. Give it, state which end of the range it sits at, and say what stock cover that implies.",
    ],
    pitfalls: [
      "Supplying sales history without the stock outs teaches the model that demand fell in exactly the weeks it was highest.",
      "Two years of weekly data is two seasonal cycles, which is the bare minimum. Anyone forecasting a yearly shape from fourteen months is fitting one summer.",
      "If you ask for accuracy figures the model will produce plausible ones. Backtest yourself and pass the result in as history if you want them referenced.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "An elaborate outlook is cheap to generate and frequently lands no closer than simply repeating last year, which no model volunteers on its own. Putting the seasonal naive figure on the page before the forecast makes that comparison unavoidable, and sometimes the honest answer is that last year is the forecast. GPT-5.2 in particular writes confident narrative around a baseline it never computed.",
  },

  article: {
    intro: [
      "A demand forecasting prompt earns its place by refusing things. The refusal that matters most is the single number, because a lone figure sent to a planner becomes a target, then a commitment, and finally an explanation for why the warehouse is full in October.",
      "The second refusal is quieter. A model handed thirteen months of sales will describe a seasonal pattern with total confidence, having seen each season exactly once. Counting complete cycles before estimating a repeating shape is the cheapest guard available and almost nobody applies it.",
      "The third is arithmetical honesty about the past. Recorded sales are not demand in any week when the shelf was empty, and a forecast trained on capped weeks learns that demand dips at the peak.",
    ],

    sections: [
      {
        heading: "Why a point estimate is the wrong deliverable",
        body: [
          "Asking for a forecast range instead of a single number changes what the reader does with it. A range invites a question about which end to plan for, which is the actual decision. A point estimate invites agreement, and agreement with a number nobody attached a condition to is how a plan becomes brittle.",
          "The prompt attaches a sentence to each of the low, central and high figures saying what would have to be true for that one to land. Those sentences are more useful than the numbers. They tell a buyer that the high case assumes the competitor stays delisted, which is something a buyer can go and check on Monday.",
        ],
      },
      {
        heading: "How much history before forecasting seasonality",
        body: [
          "How much history before forecasting seasonality has a boring answer: at least two complete cycles, and preferably three, before anyone claims a repeating annual shape. One cycle is an anecdote. Two lets you see whether the shape recurs. Three lets you see whether the shape is drifting.",
          "The audit section counts the periods and states the verdict before any modelling language appears, which stops the rest of the answer being written as though a season had been established. When it declares seasonality unestimable, the correct response is usually to forecast the level and the direction only, and to say openly that the seasonal shape is being carried over from an assumption rather than measured.",
        ],
      },
      {
        heading: "Sales are not demand once the shelf is empty",
        body: [
          "Every out of stock week is a censored observation. The number in the file is the smaller of what people wanted and what was available, and no method distinguishes the two without being told which weeks were constrained. This is why the prompt asks for capacity and stock limits as a separate field rather than hoping they show up as outliers.",
          "The effect is nastier than a missing week because it is systematic. Shortages happen when demand is high, so the capped periods are exactly the peaks, and a model fitted through them produces a summer curve that is flatter than reality every single year.",
        ],
      },
      {
        heading: "The demand forecasting prompt starts from a baseline it must beat",
        body: [
          "Establishing a naive baseline to beat before modelling is the discipline forecasting competitions taught the field and business planning mostly ignored. The seasonal naive method predicts this July from last July, costs nothing, and is embarrassingly hard to improve on for stable products.",
          "Printing that baseline next to the outlook makes the value of the extra work visible. Sometimes the demand forecasting prompt produces a central figure meaningfully different from last year and explains why. Sometimes it lands within a couple of percent, which is a real result and worth saying out loud rather than hiding behind a more elaborate description of the same number.",
        ],
      },
      {
        heading: "Writing invalidators before the forecast fails",
        body: [
          "Asking what would invalidate a forecast at the moment it is written, rather than at the post mortem, converts a prediction into something monitorable. Each invalidator carries a date by which you would know, so the list doubles as a review schedule.",
          "Used as an ai prompt for sales forecasting inside a monthly planning cycle, this section is the part that survives contact with reality. Numbers get superseded within weeks. A written list saying the high case dies if the competitor relists by March keeps its value until March, and it tells everyone what to watch instead of waiting for the variance report.",
        ],
        list: [
          "A competitor returning to the category, with the week you would see it in scan data.",
          "A price change of more than five percent, ours or anyone else's.",
          "Any supply interruption, which invalidates the outlook and the history at the same time.",
          "Weather departing sharply from the seasonal norm the shape was fitted on.",
          "A distribution change, since more stores makes the units incomparable with last year.",
        ],
      },
    ],

    howTo: {
      name: "How to run the demand forecasting prompt",
      steps: [
        {
          name: "Count your cycles before you start",
          text: "Divide the periods you have by the length of one season. If the answer is under two, expect and accept a verdict of unestimable seasonality.",
        },
        {
          name: "Mark every constrained period",
          text: "List the weeks when stock ran out, capacity was full or the product was unavailable. These are the observations that must not be read as demand.",
        },
        {
          name: "Date the one off events",
          text: "Promotions, weather, competitor moves and outages. An unlabelled spike gets marked unexplained, which is honest but less useful than a label.",
        },
        {
          name: "Compare the central figure with the baseline",
          text: "If they nearly match, the seasonal naive method is your forecast and the sophistication was decoration. That is a legitimate and cheap outcome.",
        },
        {
          name: "Diary the invalidators",
          text: "Put each dated check into the planning calendar. An invalidator nobody looks for is just a paragraph, and the forecast fails silently instead.",
        },
      ],
    },

    faq: [
      {
        question: "Can the demand forecasting prompt replace a statistical forecasting tool?",
        answer:
          "No. It produces a structured outlook and a set of conditions, not a fitted model, and it has no way to run an optimisation over your history. Use it to frame the problem, to test whether a fitted model beats the naive baseline, and to write the assumptions that a tool will never state for you.",
      },
      {
        question: "Why will it not give me an accuracy percentage?",
        answer:
          "Because an error metric requires a backtest on data it has not been shown, and a model asked for one will invent a figure that looks entirely reasonable. If you have run a backtest yourself, pass those results in as part of the history and it will reference them rather than fabricate them.",
      },
      {
        question: "How wide should the range be?",
        answer:
          "Wide enough that you would be genuinely surprised to land outside it, which is usually wider than feels comfortable. A range narrow enough to be reassuring is a point estimate with decoration, and it fails in the same way when a competitor relists or a supplier misses a delivery.",
      },
      {
        question: "What about a brand new product with no history?",
        answer:
          "The prompt will say the history audit fails, and that is the right answer. Forecast a new line from an analogue product with a stated similarity argument, keep the range very wide, and set a review date early enough that the first few weeks of real data can replace the guess.",
      },
      {
        question: "Does it handle intermittent demand?",
        answer:
          "Poorly, and it should tell you so. A series that is mostly zeros with occasional orders needs a method built for that pattern, and a written decomposition into level and season is misleading when most periods have no sales at all. Treat a mostly zero history as a signal to change approach.",
      },
      {
        question: "How often should the outlook be refreshed?",
        answer:
          "On the cadence of the decision it feeds, not on a monthly habit. If the purchase order goes out every six weeks, refresh before each order. Refreshing more often than you can act generates churn in the numbers and trains people to ignore whichever version arrived most recently.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/anomaly-detection-prompt",
        label: "anomaly detection prompt",
        description:
          "For deciding whether a period that missed the outlook is a genuine break or ordinary variation around it.",
      },
      {
        href: "/data-analysis-prompts/cohort-analysis-prompt",
        label: "cohort analysis prompt",
        description:
          "When the demand you are forecasting depends on retained customers rather than on a seasonal shape.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "Applies the same scepticism to a claimed driver of demand before it gets built into next year's assumptions.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "Carries the range and its conditions into a document where the commitment being made is written down explicitly.",
      },
    ],

    externalLinks: [
      {
        href: "https://otexts.com/fpp3/prediction-intervals.html",
        label: "Hyndman and Athanasopoulos: prediction intervals",
        description:
          "The standard open textbook treatment of why an interval, not a point, is the output of a forecast, and how intervals widen with horizon.",
      },
      {
        href: "https://forecasters.org/resources/time-series-data/m-competitions/",
        label: "International Institute of Forecasters: the M competitions",
        description:
          "Decades of published results showing how often simple benchmarks match or beat elaborate methods, which is the evidence behind the baseline rule.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc4.htm",
        label: "NIST/SEMATECH e-Handbook: time series analysis",
        description:
          "A primary reference on separating level, trend and seasonal components, and on how much data each component needs before it can be estimated.",
      },
      {
        href: "https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/seasonaladjustment",
        label: "Office for National Statistics: seasonal adjustment",
        description:
          "A national statistics office explaining the cycle length requirements and revision behaviour behind any seasonally adjusted figure.",
      },
    ],
  },
};

export default meta;
