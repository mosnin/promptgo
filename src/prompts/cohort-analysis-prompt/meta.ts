import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "cohort-analysis-prompt",
  name: "Cohort Reader",
  title: "Cohort Analysis Prompt",
  category: "data-analysis-prompts",
  taskType: "analyse",
  summary:
    "Marks which cells of a retention grid are old enough to compare, keeps raw counts beside every rate, and refuses to fill a period that has not happened yet.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["cohorts", "retention", "churn", "customer analytics"],

  seo: {
    primaryKeyword: "cohort analysis prompt",
    keywords: [
      "cohort analysis prompt",
      "reading a retention curve correctly",
      "how to compare signup cohorts",
      "ai prompt for retention analysis",
      "cohort size too small to segment",
      "separating tenure effects from calendar effects",
    ],
    seoTitle: "Cohort Analysis Prompt: Read a Retention Grid Honestly",
    seoDescription:
      "A cohort analysis prompt that marks which cells are old enough to compare, keeps counts beside every rate, and never fills a period that has not happened yet.",
  },

  prompt: {
    text: `You are reading a cohort grid. Before you say anything about retention, establish which cells are comparable, because a retention table always contains cells that render like data and are actually incomplete observation.

HOW COHORT MEMBERSHIP IS ASSIGNED: {{COHORT_DEF}}
THE GRID ITSELF, COHORT BY PERIOD, AS RAW COUNTS RATHER THAN PERCENTAGES: {{GRID}}
STARTING SIZE OF EVERY COHORT: {{COHORT_SIZES}}
AS OF DATE, AND HOW LONG EACH COHORT HAS BEEN OBSERVED: {{OBSERVATION}}
WHAT CHANGED IN ACQUISITION, PRODUCT OR PRICE DURING THE WINDOW: {{CHANGES}}

Answer in five parts.

1. COMPARABILITY MAP. Mark every cell as fully observed, partially observed, or not yet observable. Name any comparison that crosses those bands and refuse it explicitly.

2. DENOMINATOR CHECK. For each cohort give the starting size and the count behind the latest period shown. Where a cell rests on fewer than fifty members, report the count and label the percentage unstable.

3. THREE COMPETING READINGS. For every difference between cohorts, write a tenure reading, a calendar reading and a composition reading before naming the one you favour. A cohort acquired through a different channel is a different population, not a worse one.

4. CURVE SHAPE. Say whether the curve has flattened and at which period, using only cohorts old enough to show it. Never infer a flattening from a cohort that has not reached that period.

5. WHAT THIS GRID CANNOT ANSWER. List the questions people will put to this table that the table cannot settle, and name the data that would settle them.

Never convert a count into a rate I did not request, never fill an unobserved cell, and never state a lifetime value or payback period unless I supplied revenue figures.`,
    variables: [
      {
        token: "COHORT_DEF",
        label: "How cohort membership is assigned",
        example:
          "Cohort is the calendar month of first paid subscription, assigned once and never changed if the customer later switches plan",
      },
      {
        token: "GRID",
        label: "The grid as raw counts, cohort by period",
        example:
          "Mar: 2040, 1420, 1105, 930, 812, 744 | Apr: 1880, 1290, 1010, 855, 760 | May: 2210, 1495, 1180, 990 | Jun: 1450, 980, 770 | Jul: 610, 402",
      },
      {
        token: "COHORT_SIZES",
        label: "Starting size of every cohort",
        example: "Mar 2040, Apr 1880, May 2210, Jun 1450, Jul 610",
      },
      {
        token: "OBSERVATION",
        label: "As of date and observation length per cohort",
        example:
          "As of 30 June. March observed six months, April five, May four, June three, July two and still open",
      },
      {
        token: "CHANGES",
        label: "What changed in acquisition, product or price",
        example:
          "Paid search paused in May, annual billing introduced in June, and the free trial shortened from 30 days to 14 in July",
      },
    ],
    expectedOutput:
      "A cell by cell comparability map, starting sizes and current counts for every cohort, three competing readings for each difference before a preferred one is named, a flattening point drawn only from mature cohorts, and a list of unanswerable questions.",
    followUps: [
      "Redraw the grid keeping only fully observed cells, and tell me which of my conclusions survive that cut.",
      "The June cohort came almost entirely from one partner referral. Rewrite the composition reading with that in mind.",
      "Write the two sentences I can safely say about the July cohort to a board that wants a number today.",
    ],
    pitfalls: [
      "Pasting percentages instead of counts removes the only defence against thin cells, and the model cannot recover the counts from rounded rates.",
      "Reassigning a customer to a new cohort when they upgrade rewrites earlier months and makes every old curve improve slightly. Fix membership at first purchase.",
      "The newest cohort always looks best because nobody has had time to leave. Expect the model to say this and do not argue with it.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "Retention grids flatter the newest cohort and models take the bait. Fewer observed months means the later rows are simply missing their worst periods, which reads as improvement. An observation length field plus a comparability map removes the illusion. Gemini 3 Pro then goes further and questions whether cohorts acquired through different channels belong in the same comparison at all.",
  },

  article: {
    intro: [
      "A cohort analysis prompt has to decide which cells of the grid may be compared before it says a word about retention. A cohort table is mostly triangle. The newest cohort has one observed period and the oldest has twelve, yet every cell renders at the same size and in the same colour.",
      "Percentages make that worse. A retention rate keeps a fixed denominator while its numerator shrinks, so the far columns of a small cohort move by whole points whenever three people change their minds. Counts sit beside rates throughout this prompt for exactly that reason.",
      "The last problem is attribution. Cohorts differ because time has passed, because the calendar moved underneath them, and because the people in them arrived through different channels. All three produce a fanned set of curves, and only one of them is usually the claim being made.",
    ],

    sections: [
      {
        heading: "Reading a retention curve correctly means watching the denominator",
        body: [
          "Reading a retention curve correctly begins with the count behind each point rather than the shape of the line. A cohort of 2,000 sitting at 18 percent in month six rests on 360 people. A cohort of 120 at the same rate rests on 22, and 22 is a number that moves for reasons no analysis will ever recover.",
          "So the prompt prints the raw count beside every rate and declines to describe a cell built on fewer than fifty members as a percentage at all. That one rule removes most of the drama from a retention chart, because most of the drama lives in the thin cells at the bottom right.",
        ],
      },
      {
        heading: "Separating tenure effects from calendar effects",
        body: [
          "Separating tenure effects from calendar effects is the specific move a cohort grid exists to support, and it is the move people skip. Reading down a column holds tenure fixed and lets the calendar vary. Reading across a row holds the cohort fixed and lets tenure vary. A diagonal holds neither, which is why outages and price changes show up on diagonals.",
          "A model asked to summarise the grid will blend all three directions into one cheerful sentence about improving retention. Demanding a tenure reading, a calendar reading and a composition reading for every difference keeps them apart long enough for you to see which one your evidence actually supports.",
        ],
      },
      {
        heading: "How to compare signup cohorts that have run for unequal lengths",
        body: [
          "How to compare signup cohorts is mostly a question of observation time. A March cohort watched for five months and a July cohort watched for one are not two data points about retention. They are one data point and a partial reading, and plotting them on the same axis invites a conclusion the second cannot carry.",
          "The comparability map makes that refusal explicit. Cells are marked fully observed, partially observed or not yet observable, and any comparison crossing those bands gets named and blocked. It reads as pedantic right up to the first time it stops somebody announcing that retention improved when the truth is that the newest cohort has not had time to churn.",
        ],
      },
      {
        heading: "Segmenting until the cells stop meaning anything",
        body: [
          "A cohort size too small to segment is easy to manufacture without noticing. Split monthly cohorts by plan tier, then by region, and a respectable four thousand signups becomes forty cells of a hundred people, several of which will show striking differences for purely arithmetic reasons.",
        ],
        list: [
          "Cohorts cut so finely that one account moves the rate by more than a point.",
          "A recent cohort held up against an old one at different stages of their lives.",
          "Rates displayed for cells whose starting population was never large to begin with.",
          "Members reassigned between cohorts on upgrade, which quietly rewrites every earlier month.",
          "Churn dated by when the cancellation was processed rather than when usage actually stopped.",
        ],
      },
      {
        heading: "What the cohort analysis prompt refuses to calculate",
        body: [
          "The cohort analysis prompt will not return a lifetime value, a payback period or a projected curve unless the revenue and the observed periods were both supplied. Those are the three numbers stakeholders ask for and the three most often assembled out of nothing, because a model asked for a figure will produce a figure.",
          "It also refuses to fill an unobserved cell. A blank in the bottom right is information: that period has not happened yet. Interpolating it yields a grid that looks complete and quietly contains a forecast nobody agreed to.",
        ],
      },
      {
        heading: "Fitting it into a monthly retention review",
        body: [
          "Run as an ai prompt for retention analysis, it belongs at the opening of the review rather than the end. Once somebody has drawn the fanned curves and written a title slide, comparability objections arrive too late to change what gets presented.",
          "The section worth keeping longest is the last one, the list of questions the grid cannot settle. Retention tables attract questions about causes, and a table of counts by month has almost nothing to say about causes. Writing that boundary down once saves repeating it in every meeting for a quarter.",
        ],
      },
    ],

    howTo: {
      name: "How to run the cohort analysis prompt",
      steps: [
        {
          name: "Export counts, not percentages",
          text: "Rates cannot be turned back into counts once rounded, and the counts are what every honest caveat in the output depends on.",
        },
        {
          name: "Write the membership rule in one sentence",
          text: "State when a customer joins a cohort and whether they can ever move. Movable membership is the commonest silent defect in a retention grid.",
        },
        {
          name: "Give the as of date and each observation length",
          text: "Without these the comparability map is guesswork, and the newest cohort will be praised for churn that has not occurred yet.",
        },
        {
          name: "Present only the fully observed region",
          text: "Show the mature triangle in the chart and put the partial cells in an appendix with their counts, clearly labelled as still filling in.",
        },
      ],
    },

    faq: [
      {
        question: "Does the cohort analysis prompt need my raw event data?",
        answer:
          "No, and it cannot read it. It works from an aggregated grid of counts plus the cohort sizes and observation lengths. That is enough for the comparability and denominator work, which is where most retention mistakes are made rather than in the aggregation itself.",
      },
      {
        question: "What is the minimum cohort size worth charting?",
        answer:
          "There is no universal floor, but below roughly fifty members a later period the percentage stops being informative because a single departure shifts it by two points. Show the count in those cells and reserve the curve for cohorts large enough to have a stable shape.",
      },
      {
        question: "Should cohorts be monthly or weekly?",
        answer:
          "Pick whichever period gives cohorts large enough to read and matches the rhythm of the decision. Weekly cohorts respond faster to a product change but thin out quickly, and teams often end up with forty tiny curves that mostly describe the noise floor.",
      },
      {
        question: "How do I handle customers who leave and come back?",
        answer:
          "Decide once, write it into the membership rule, and never revisit it mid analysis. Counting a returner as retained in the intervening months rewrites history, while treating them as a new cohort member inflates recent cohorts and flatters whatever you shipped last.",
      },
      {
        question: "Can it tell me why retention changed?",
        answer:
          "Only within the limits of what you supplied in the changes field, and even then it offers competing explanations rather than a cause. A grid of counts by month contains no mechanism, so causal claims have to come from an experiment or from evidence outside the table.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "For deciding whether the gap between two cohorts survives scrutiny once the comparability work is done.",
      },
      {
        href: "/data-analysis-prompts/demand-forecasting-prompt",
        label: "demand forecasting prompt",
        description:
          "When somebody wants the retention curve projected forward, this is the format that forces a range rather than a single line.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description:
          "Turns a comparability map into a narrative that keeps the partial cohorts visible instead of quietly dropping them.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "Where a retention finding becomes a proposal, with the observation windows recorded as stated assumptions.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.bmj.com/content/317/7172/1572",
        label: "BMJ Statistics Notes: survival probabilities",
        description:
          "The standard practitioner explanation of why partially observed subjects cannot be treated as complete, which is the same defect as an immature cohort.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/apr/section1/apr181.htm",
        label: "NIST/SEMATECH e-Handbook: censored data",
        description:
          "A primary reference on right censoring, the formal name for the empty cells in the bottom corner of every retention grid.",
      },
      {
        href: "https://support.google.com/analytics/answer/6158745",
        label: "Google Analytics: cohort exploration",
        description:
          "Documents how one widely used tool assigns cohort membership and date windows, which is worth checking before trusting its curves.",
      },
      {
        href: "https://hbr.org/2014/10/the-value-of-keeping-the-right-customers",
        label: "Harvard Business Review: the value of keeping the right customers",
        description:
          "An institutional source for the retention economics people invoke when they ask a cohort grid for a payback period it cannot supply.",
      },
    ],
  },
};

export default meta;
