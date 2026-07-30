import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "report-automation-prompt",
  name: "Cycle Writer",
  title: "Report Automation Prompt",
  category: "data-analysis-prompts",
  taskType: "generate",
  summary:
    "Splits a recurring document into wording that must not change and figures that must, and writes commentary only for movements that crossed a stated threshold.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["reporting", "automation", "monthly report", "writing"],

  seo: {
    primaryKeyword: "report automation prompt",
    keywords: [
      "report automation prompt",
      "which parts of a report to recompute",
      "how to automate a monthly report",
      "ai prompt for a recurring report",
    ],
    seoTitle: "Report Automation Prompt: Recompute Only What Changed",
    seoDescription:
      "A report automation prompt that keeps stable wording untouched, recomputes only the figures, and writes commentary solely when a movement crosses its threshold.",
  },

  prompt: {
    text: `You are maintaining a document that ships on the same day every cycle to the same readers. Most of it should be word for word identical to last time. Your job is knowing which parts are not.

WHO READS IT AND WHAT THEY DO WITH IT: {{AUDIENCE}}
LAST CYCLE'S PUBLISHED DOCUMENT, IN FULL: {{PREVIOUS}}
THIS CYCLE'S FIGURES, LABELLED EXACTLY AS THEY WERE LAST TIME: {{CURRENT}}
MATERIALITY, MEANING THE MOVEMENT PER METRIC THAT EARNS A SENTENCE: {{THRESHOLDS}}
ANY EARLIER FIGURE THAT HAS SINCE BEEN CORRECTED: {{RESTATEMENTS}}

Return the document followed by a change log, under these headings.

STABLE. Reproduce the sections whose wording should not move: purpose, definitions, method, standing caveats. Copy them exactly from the previous cycle and do not improve the phrasing. If a definition genuinely has to change, leave the old wording in place and raise it in the change log instead.

RECOMPUTED. Every figure with its previous value beside it and the movement between them. Label each one as within threshold or beyond threshold.

COMMENTARY. Write prose only for metrics beyond their threshold. For each, state the movement, then two competing explanations, then what evidence would separate them. Metrics within threshold receive the words no material change and nothing further. Do not write a sentence about a metric merely because it is important to the reader.

RESTATEMENTS. For every corrected figure give the old value, the new value, the reason, and which previously published sentences are now wrong.

CHANGE LOG. Everything differing from last cycle apart from the numbers: metrics added, metrics retired, definitions altered, thresholds altered.

You may not use a figure absent from the current input, and you may not compute a change against a previous value you were not given. Never write a trend sentence spanning more periods than you were supplied.`,
    variables: [
      {
        token: "AUDIENCE",
        label: "Who reads it and what they do with it",
        example:
          "Regional directors, who use it to decide whether to intervene at a site before the quarterly review",
      },
      {
        token: "PREVIOUS",
        label: "Last cycle's published document in full",
        example:
          "Paste the whole of June's operations pack, including the definitions appendix and the standing caveat about weekend staffing data",
      },
      {
        token: "CURRENT",
        label: "This cycle's figures with the same labels",
        example:
          "Attendance rate 88.2 percent, mean wait 34 minutes, DNA rate 7.9 percent, staffed hours 12,410, complaints 46",
      },
      {
        token: "THRESHOLDS",
        label: "Movement per metric that earns a sentence",
        example:
          "Attendance rate 1.5 points, mean wait 5 minutes, DNA rate 1 point, staffed hours 3 percent, complaints 10",
      },
      {
        token: "RESTATEMENTS",
        label: "Earlier figures since corrected",
        example:
          "May complaints were published as 31 and are now 39, because two sites submitted their logs after the cut off",
      },
    ],
    expectedOutput:
      "A document whose stable sections are byte for byte the previous ones, a figure table showing movement and threshold status, commentary confined to metrics beyond threshold, a restatement block naming the sentences it invalidates, and a change log.",
    followUps: [
      "Three metrics crossed threshold this cycle and the commentary runs to a page. Cut it to the two that a director could act on.",
      "The restatement invalidates a sentence in last month's summary. Draft the two line note that goes at the top of this cycle's document.",
      "Propose new thresholds using the last twelve cycles of movement, so that roughly two metrics cross in a typical month.",
    ],
    pitfalls: [
      "Omitting last cycle's document turns this into a fresh write up, and the stable sections get quietly reworded every month until nobody trusts the definitions.",
      "Thresholds set by intuition are usually too tight, so everything crosses and the commentary becomes noise again. Derive them from historical movement.",
      "Models find no material change unsatisfying and will pad it. Check that within threshold metrics really did stay silent.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Regenerated reports drift. Told to reproduce a definitions appendix, a model improves the prose slightly on every cycle, and after enough cycles the wording no longer matches the query that produces the number. Instructing it to copy stable sections verbatim rather than reproduce them stops the drift, and any diff against the previous cycle then becomes a defect worth inspecting before sending.",
  },

  article: {
    intro: [
      "A report automation prompt is not a template filler. The hard part of a recurring document is not producing text, it is deciding which text should be identical to last cycle and which has genuinely earned a rewrite.",
      "Get that split wrong in one direction and every figure is buried in fresh prose that has to be read from scratch. Get it wrong in the other and the definitions drift a little each month until the wording no longer matches the query underneath it.",
      "The second constraint is a materiality threshold per metric. Without one, a model will write a paragraph about every number, because a number that moved half a point still moved and prose can always be produced about it.",
    ],

    sections: [
      {
        heading: "The two layers of a recurring document",
        body: [
          "Deciding which parts of a report to recompute is the whole design question. Purpose, definitions, method and standing caveats are stable: they were argued over once and they should survive untouched until somebody deliberately changes them. Figures, movements and commentary are the recomputed layer.",
          "Keeping the stable layer byte for byte identical has a benefit beyond consistency. A reader who has seen the document before skips it instantly, and a reader who has not can rely on it meaning the same thing it meant last quarter. Prose that improves slightly every cycle offers neither.",
          "It also makes the diff useful. If the stable sections never change without a change log entry, then a difference between two cycles is either a number or a decision, and both are worth someone's attention.",
        ],
      },
      {
        heading: "Commentary only when a number moves enough",
        body: [
          "Writing commentary only when a number moves enough is the rule that stops a recurring document becoming unreadable. Every metric has a range it wanders in for no reason at all, and a threshold set from historical movement is what separates wandering from news.",
          "The discipline is easier to state than to hold. A director asks why there is nothing about complaints this month, and the honest answer, that complaints moved less than they usually do, feels evasive. Publishing the thresholds alongside the report converts that awkward conversation into a one line reference, and it makes the silence informative rather than suspicious.",
          "Where a metric does cross, the prompt demands two competing explanations and the evidence that would separate them, rather than a single confident cause. A recurring document is exactly where an unsupported causal claim becomes permanent, because next month's writer treats last month's sentence as background.",
        ],
      },
      {
        heading: "Restating a figure that changed since last month",
        body: [
          "Restating a figure that changed since last month is the section most internal reports simply do not have, which is why so many of them quietly contradict each other. Late submissions, corrections and backfilled data all move published numbers, and a silent change is the fastest way to lose a reader's trust permanently.",
          "The restatement block names the old value, the new value, the reason and, critically, which previously published sentences are now wrong. That last item is the one people forget. A corrected complaints figure may invalidate a paragraph in an earlier summary, and the paragraph is what somebody remembers.",
        ],
        list: [
          "The metric, with the cycle it was originally published in.",
          "Old value, new value, and the size of the correction.",
          "The reason, in one sentence, without apology or explanation of process.",
          "Any earlier statement that the correction makes untrue.",
          "Whether the same cause is likely to move figures again next cycle.",
        ],
      },
      {
        heading: "What the report automation prompt writes when nothing happened",
        body: [
          "The report automation prompt is at its most valuable in a quiet month. Every metric sat inside its threshold, nothing needs a decision, and the document says so in about a page. That is a correct output, and it is the one a model will fight you on.",
          "Left alone, a language model presented with a table of numbers will find something to say about each of them, and the resulting prose is fluent, specific and about nothing. Forcing the words no material change onto the metrics that did not move is a small constraint with a large effect on how the document reads.",
        ],
      },
      {
        heading: "Where automation stops and a person is required",
        body: [
          "How to automate a monthly report has a clean answer for the mechanical layer and none for the judgement. Assembling figures, computing movements, flagging thresholds and reproducing stable text are all rule following. Deciding that a threshold was set wrong, or that a crossing does not matter this quarter because of something not in the data, is not.",
          "Run as an ai prompt for a recurring report, the sensible division is that the model drafts and a named person signs. The signature is what keeps the thresholds honest, since a document nobody owns tends to acquire new metrics and never lose any.",
        ],
      },
    ],

    howTo: {
      name: "How to run the report automation prompt",
      steps: [
        {
          name: "Paste last cycle's document whole",
          text: "Including the appendices. The stable layer cannot be preserved from a summary of itself, and partial input is how definitions start drifting.",
        },
        {
          name: "Derive thresholds from history, not instinct",
          text: "Look at how much each metric has moved cycle to cycle over the last year and set the threshold so that roughly one or two cross in a normal month.",
        },
        {
          name: "Keep the labels identical",
          text: "A metric renamed between cycles cannot be matched to its previous value, and the movement column silently goes blank rather than raising an error.",
        },
        {
          name: "List every correction, however small",
          text: "A figure that changed by one is still a figure that changed. Readers who spot an unannounced difference stop believing the announced ones.",
        },
        {
          name: "Diff the stable sections before sending",
          text: "A two second comparison against last cycle catches any wording the model improved on its own initiative, which it will attempt regardless of instruction.",
        },
        {
          name: "Have a named person sign it",
          text: "The signer owns the threshold judgements and the decision to stay silent on a metric. Automation without an owner accumulates metrics nobody reads.",
        },
      ],
    },

    faq: [
      {
        question: "Can the report automation prompt connect to my data warehouse?",
        answer:
          "No. It takes figures you have already produced and turns them into a document, which keeps the arithmetic in a tool that actually queried the data. Pull the numbers with a scheduled query, paste them in with the same labels each cycle, and let the prompt handle the writing.",
      },
      {
        question: "How do I choose a materiality threshold?",
        answer:
          "Take a year of that metric's cycle to cycle movements and pick a value that roughly the largest quarter of them exceed. That produces a document where one or two metrics attract commentary in a normal month, which is about as much as anybody reads carefully.",
      },
      {
        question: "What if a metric crosses its threshold every single month?",
        answer:
          "The threshold is too tight, or the metric is genuinely volatile and needs a rolling figure rather than a point value. Either way it is a signal about the metric rather than about the business, and it belongs in the change log as a proposal.",
      },
      {
        question: "Should the report include charts?",
        answer:
          "Only for the metrics that crossed their threshold, and only where the shape adds something the number does not. A chart per metric turns a recurring document into a slide deck, and readers then scan pictures instead of reading the restatement block.",
      },
      {
        question: "How is this different from a dashboard?",
        answer:
          "A dashboard is checked whenever someone wonders about a number. This is a document that arrives on a schedule, carries commentary, records corrections, and can be read as a sequence over a year. The two coexist, and the report is the one with a memory.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/metric-definition-prompt",
        label: "metric definition prompt",
        description:
          "Supplies the definitions that live in the stable layer, including the restatement window this document has to honour.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description:
          "For the one off narrative a crossed threshold sometimes deserves, written for an audience that has not read the last eleven cycles.",
      },
      {
        href: "/data-analysis-prompts/dashboard-design-prompt",
        label: "dashboard design prompt",
        description:
          "Covers the always on companion to this document, where the threshold logic becomes an alert rather than a paragraph.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "For fitting the production cycle of a recurring report into a week that also contains other work.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/revisions",
        label: "Office for National Statistics: revisions",
        description:
          "A published revisions policy from a national statistics office, which is the model the restatement block is a compressed version of.",
      },
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: how users read",
        description:
          "Usability research showing that recurring documents are scanned rather than read, which is the evidence behind keeping stable sections skippable.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "PlainLanguage.gov: federal plain language guidelines",
        description:
          "Official guidance on writing documents that repeat on a schedule, including why consistent wording beats fresh phrasing.",
      },
      {
        href: "https://developers.google.com/style/highlights",
        label: "Google developer documentation style guide",
        description:
          "A maintained house style demonstrating how consistency rules are written down so that many authors produce a document that reads as one.",
      },
    ],
  },
};

export default meta;
