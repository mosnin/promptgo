import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "chart-selection-prompt",
  name: "Chart Chooser",
  title: "Chart Selection Prompt",
  category: "data-analysis-prompts",
  taskType: "evaluate",
  summary:
    "Starts from the question the figure has to answer, checks how many categories and how small each base is, then names what the chart could mislead about.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["charts", "visualisation", "reporting", "figures"],

  seo: {
    primaryKeyword: "chart selection prompt",
    keywords: [
      "chart selection prompt",
      "which chart type for my data",
      "when to use a pie chart",
      "choosing a chart for a distribution",
      "ai prompt for choosing a visualisation",
    ],
    seoTitle: "Chart Selection Prompt: Match the Chart to the Question",
    seoDescription:
      "A chart selection prompt that names the question first, checks category counts and base sizes, then states exactly what the recommended chart could mislead about.",
  },

  prompt: {
    text: `You are a data visualisation reviewer. Your job is to choose a chart form for one specific question and to name what that form will hide. You do not produce decoration.

THE ONE QUESTION THIS FIGURE MUST ANSWER: {{QUESTION}}
VARIABLES AND THEIR TYPES: {{VARIABLES}}
HOW MANY CATEGORIES OR SERIES: {{CARDINALITY}}
SAMPLE SIZE OVERALL AND IN THE SMALLEST GROUP: {{SAMPLE_SIZES}}
WHO READS IT AND WHAT THEY DECIDE: {{AUDIENCE}}

Respond in five parts.

1. THE QUESTION, RESTATED AS A COMPARISON. Every chart answers a comparison. Say which one. If the stated question contains two comparisons, split it and tell me it needs two figures.

2. RECOMMENDED FORM, WITH THE REASON. Name one chart type. Justify it by the comparison and the variable types, not by convention. State the axis, the sort order and whether the value axis must include zero.

3. WHAT THIS CHART HIDES. Every form suppresses something. Name it. A mean hides spread, a share hides base size, a smoothed line hides volatility, a truncated axis exaggerates a small difference.

4. BASE SIZE CHECK. For any rate, percentage or average, state the denominator behind each plotted point. Refuse to plot a rate where the smallest group has fewer than 30 observations, and instead recommend showing counts or merging the group, saying which.

5. WHAT YOU CANNOT JUDGE. List anything about the data you would need to see before standing behind this recommendation, for example the shape of the distribution or whether the time series has gaps.

CRITICAL: never recommend a second axis. Never recommend a chart form purely because the data would fit it. If the honest answer is a small table, say so.`,
    variables: [
      {
        token: "QUESTION",
        label: "The one question the figure must answer",
        example:
          "Did average basket value differ between our four store formats last quarter, enough to change the range we stock?",
      },
      {
        token: "VARIABLES",
        label: "Variables and their types",
        example:
          "store_format categorical with 4 levels, basket_value continuous in GBP, quarter categorical with 1 level",
      },
      {
        token: "CARDINALITY",
        label: "How many categories or series",
        example: "4 store formats, no time series, one measure",
      },
      {
        token: "SAMPLE_SIZES",
        label: "Sample size overall and in the smallest group",
        example: "412,000 baskets overall, smallest format has 3,100 baskets",
      },
      {
        token: "AUDIENCE",
        label: "Who reads it and what they decide",
        example: "Range planners deciding whether to differentiate stock by format",
      },
    ],
    expectedOutput:
      "One named chart form with the comparison it serves, an explicit statement of what that form hides, the denominator behind every plotted rate, and a short list of what the recommendation depends on that it could not check.",
    followUps: [
      "The smallest format has only 3,100 baskets but they are concentrated in two stores. Does that change your recommendation?",
      "Redo this for a slide read in ninety seconds rather than a report someone studies, and say what you dropped.",
      "Write the caption for the chart you recommended, stating the comparison and the base sizes in one sentence.",
    ],
    pitfalls: [
      "Giving it a topic rather than a question produces a chart of the data instead of a chart of an argument, and those look similar until someone asks what it shows.",
      "If you leave the smallest group size out, the base size check silently passes and a rate built on eleven observations gets plotted next to one built on eleven thousand.",
      "Models default to whatever chart is most common for a data shape. The reason field is there so you can reject convention when the comparison calls for something else.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "Rates get charted without their denominators unless the denominator is a required field. Asked to compare rates across groups, models recommend a clean ranked bar chart, and the category built on a handful of observations sits at the top of the axis looking like the strongest performer. Requiring base sizes next to every rate forces either suppression or a visible count on the chart.",
  },

  article: {
    intro: [
      "A chart selection prompt is only useful if it starts from the question rather than the columns. Given a table, a model will happily suggest a chart that the data physically fits, and a figure that fits the data while answering nothing is the most common thing in a corporate deck.",
      "The version here takes a question, the variable types, the category count and the smallest group size, and returns one recommended form plus an explicit statement of what that form conceals. Then it checks denominators, because a rate plotted on a base of nine is a decoration with an axis.",
    ],

    sections: [
      {
        heading: "The question decides the chart, not the data type",
        body: [
          "Every chart answers a comparison: this against that, now against then, one part against the whole, one variable against another. Naming the comparison out loud usually settles the form in a sentence, which is why the prompt refuses to move on until the question has been restated as one.",
          "People asking which chart type for my data are usually one step earlier than they think. Two comparisons squeezed into one figure is the more common problem, and the fix is two figures rather than a cleverer chart. The restatement step catches that, because a question containing the word and often turns out to contain two questions.",
        ],
      },
      {
        heading: "Choosing a chart for a distribution",
        body: [
          "Choosing a chart for a distribution is where the most damage gets done, because the default is a bar chart of the mean and a mean is a single number standing in for a shape. Two groups with identical averages can have completely different spreads, and only one of them supports the decision you are about to make.",
          "A histogram or a box plot costs nothing extra and shows whether the average is describing anything real. When someone insists on the bar chart, the honest compromise is a bar with the interquartile range drawn on it and the group size printed underneath, which at least admits what is being summarised.",
        ],
      },
      {
        heading: "When to use a pie chart, and when not to",
        body: [
          "Asking when to use a pie chart has a short answer: not when the reader needs to rank the slices or compare two of them. Angle is the hardest visual encoding to judge accurately, so two segments within a few points of each other are simply unrankable, and that is usually the exact comparison the figure was made for.",
          "Pies survive in one narrow case, which is showing that a single share dominates or is negligible against everything else. Even then a sorted horizontal bar does the same job more precisely, and it keeps working when a fifth category appears next quarter.",
        ],
        list: [
          "More than about five segments, at which point the legend becomes the chart.",
          "Any figure where the reader must rank the parts rather than notice one of them.",
          "Two pies side by side, which asks readers to compare angles across two different origins.",
          "Shares built on different denominators, where equal slices represent unequal counts.",
          "Anything that changes over time, since a sequence of pies destroys the trend it should show.",
        ],
      },
      {
        heading: "Small denominators and the chart that does not mislead the reader",
        body: [
          "A chart that does not mislead the reader is mostly a chart that shows its base sizes. Percentages hide their denominators by design, and a bar reaching the top of an axis looks identical whether it represents nine cases out of ten or nine hundred out of a thousand.",
          "The prompt therefore requires the smallest group size and refuses to plot rates when that group falls under thirty observations, offering counts or a merged category instead. That refusal is unpopular and it is correct. The alternative is a figure that invites a decision the data cannot support, drawn beautifully.",
        ],
      },
      {
        heading: "Where the chart selection prompt still needs a human",
        body: [
          "The recommendation is made without seeing your data, which is why the last section lists what it could not check. Time series gaps, bimodal distributions and outliers that dominate a scale are all invisible from a description, and any of them can invalidate an otherwise sound choice of form.",
          "Treated as an ai prompt for choosing a visualisation it is quick and generally right about form. Treated as a substitute for looking at the numbers first, it is a way to produce a confidently wrong figure faster than before. Plot it roughly, look at it, then ask.",
        ],
      },
    ],

    table: {
      caption: "The comparison you are making, and the form that serves it",
      headers: ["What you are asking", "Form that answers it", "Common wrong choice"],
      rows: [
        [
          "How is one measure spread out?",
          "Histogram or box plot",
          "Bar chart of the mean, which hides the spread entirely",
        ],
        [
          "How did one measure move over time?",
          "Line chart on an unbroken time axis",
          "Monthly bars, which invite missing months to read as zero",
        ],
        [
          "How do a handful of categories compare?",
          "Horizontal bars sorted by value",
          "Pie chart, which makes similar slices impossible to rank",
        ],
        [
          "How do two measures relate?",
          "Scatter plot showing every point",
          "Two lines on a dual axis, which manufactures a relationship",
        ],
        [
          "What is a whole made of?",
          "Stacked bar, or a table beyond five parts",
          "Donut chart whose legend the reader must match by colour",
        ],
        [
          "How does one group differ from another?",
          "Small multiples sharing one axis range",
          "A single panel with eight overlapping series",
        ],
      ],
    },

    howTo: {
      name: "How to use the chart selection prompt",
      steps: [
        {
          name: "Write the question as a comparison",
          text: "If you cannot phrase it as this against that, you are not ready for a chart. That sentence also becomes the title of the finished figure.",
        },
        {
          name: "Supply the smallest group size",
          text: "Not just the total. The base size check is the part that catches misleading figures, and it needs the weakest denominator to work with.",
        },
        {
          name: "Read the hidden section before drawing anything",
          text: "Decide whether what the form conceals is acceptable for this audience. If it is not, ask for the second best form and compare the two.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the chart selection prompt refuse dual axes?",
        answer:
          "Because the reader cannot tell where the two scales were set, and any apparent relationship between the lines is a property of that arbitrary choice. Two stacked panels sharing a time axis show the same information without implying a correlation that nobody has actually tested.",
      },
      {
        question: "Is thirty observations a real threshold or a convention?",
        answer:
          "It is a working convention rather than a law, chosen because below it a single case can move a percentage by several points. The value of the rule is that it forces the denominator into the conversation, and you can raise or lower the number for your own context.",
      },
      {
        question: "Can it choose a chart if I paste the data itself?",
        answer:
          "It can, and it will still be reasoning from a sample rather than the full distribution. Pasting data tends to make the recommendation more confident without making it better informed, so the structured description plus your own quick plot is the more reliable combination.",
      },
      {
        question: "What if the honest answer really is a table?",
        answer:
          "Then take it. Tables beat charts whenever readers need exact values, when there are fewer than about five numbers, or when the comparison is between rows rather than trends. The prompt is instructed to say so, and it says so more often than people expect.",
      },
      {
        question: "Does it help with colour and labelling?",
        answer:
          "Only indirectly, through the sort order and axis instructions it returns. Colour choices, accessible contrast and label placement are separate decisions, and getting the form wrong first cannot be rescued by getting the styling right afterwards.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/dashboard-design-prompt",
        label: "dashboard design prompt",
        description:
          "Once individual figures are sound, this decides which of them earn permanent space and which belong in an occasional report.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description:
          "For writing the sentence a chart is supposed to support, which is the fastest way to discover the chart answers a different question.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "Use before drawing a difference between two bars, so the figure is not illustrating a gap that sampling alone explains.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "Shares the discipline of one message per unit, which is the rule a cluttered figure and a cluttered advert both break.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/data-visualization-alternatives/",
        label: "Nielsen Norman Group: choosing data visualisations",
        description:
          "Usability research on how readers actually decode charts, which is the evidence behind ranking position above angle.",
      },
      {
        href: "https://vega.github.io/vega-lite/docs/mark.html",
        label: "Vega-Lite: mark types",
        description:
          "A formal grammar mapping data types to visual encodings, useful for checking that a recommended form is expressible and unambiguous.",
      },
      {
        href: "https://www.w3.org/WAI/tutorials/images/complex/",
        label: "W3C WAI: complex images and charts",
        description:
          "The accessibility standard for describing a figure in text, which also forces you to state the comparison the chart makes.",
      },
      {
        href: "https://ggplot2-book.org/statistical-summaries",
        label: "ggplot2: statistical summaries",
        description:
          "Documents what each summary layer computes, making explicit what a box plot or a smoothed line is hiding from the reader.",
      },
    ],
  },
};

export default meta;
