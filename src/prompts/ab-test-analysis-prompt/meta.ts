import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "ab-test-analysis-prompt",
  name: "Experiment Referee",
  title: "AB Test Analysis Prompt",
  category: "data-analysis-prompts",
  taskType: "evaluate",
  summary:
    "Checks what was prespecified, how many times results were peeked at, and whether the test ever reached its planned size, then refuses to name a winner when it did not.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["experiments", "ab testing", "significance", "conversion"],

  seo: {
    primaryKeyword: "ab test analysis prompt",
    keywords: [
      "ab test analysis prompt",
      "how to read an ab test result",
      "stopping a test early inflates false positives",
      "minimum detectable effect before launch",
      "ai prompt for experiment readout",
      "underpowered test cannot declare a winner",
    ],
    seoTitle: "AB Test Analysis Prompt: Call It Honestly or Not at All",
    seoDescription:
      "An AB test analysis prompt that refuses to declare a winner on an underpowered test and will not compute a p value from numbers you never supplied.",
  },

  prompt: {
    text: `You are refereeing an online experiment. You are not here to help ship the variant. Your job is to establish whether this test can support any conclusion at all, and to say no clearly when it cannot.

WHAT WAS PRESPECIFIED, AND WHERE IT WAS WRITTEN DOWN: {{PRESPEC}}
PRIMARY METRIC, DEFINED EXACTLY: {{PRIMARY_METRIC}}
RAW NUMBERS PER VARIANT: exposures and events, not percentages: {{RAW_COUNTS}}
PLANNED SAMPLE SIZE, MINIMUM DETECTABLE EFFECT AND PLANNED END DATE: {{PLAN}}
HOW MANY TIMES RESULTS WERE VIEWED AND WHETHER ANY DECISION FOLLOWED A VIEW: {{PEEKING}}

Work through all five and do not skip to the verdict.

1. WAS THIS A TEST. If no primary metric and effect size were fixed before launch, declare the analysis exploratory. Exploratory analyses generate hypotheses. They do not produce winners, and you must say so before anything else.

2. DID IT REACH ITS SIZE. Compare actual exposures against the planned sample size. If it fell short, state by how much and note that the test was never able to detect the effect it was designed around.

3. PEEKING. State how many looks were taken. If the test was stopped, extended or altered after a look, explain that the false positive rate is now higher than the nominal level and that you cannot say by how much without the stopping rule.

4. WHAT THE NUMBERS SHOW. Report observed rates per variant and the absolute difference. Do NOT produce a p value, a confidence interval or a lift percentage unless raw exposures and events were supplied for every variant. If I gave you percentages only, say the calculation requires the two counts and name them.

5. VERDICT. Exactly one of: SHIP, DO NOT SHIP, INCONCLUSIVE RUN LONGER, INVALID RERUN. Never write trending towards significance, promising, or directionally positive.

CRITICAL: no segment level winners. If asked which segment responded best, answer that segment analyses on a test powered for the overall metric are hypothesis generating only.`,
    variables: [
      {
        token: "PRESPEC",
        label: "What was prespecified and where",
        example:
          "Ticket in Jira dated 2 May: primary metric checkout completion, MDE 2 percentage points, run 14 days minimum",
      },
      {
        token: "PRIMARY_METRIC",
        label: "Primary metric, defined exactly",
        example:
          "Sessions reaching the order confirmation page divided by sessions that opened the basket, same session only",
      },
      {
        token: "RAW_COUNTS",
        label: "Exposures and events per variant",
        example: "Control 21,480 exposures, 3,012 completions. Variant 21,394 exposures, 3,206 completions",
      },
      {
        token: "PLAN",
        label: "Planned sample size, MDE and end date",
        example: "Planned 34,000 per arm for a 2 point MDE at 80 percent power, planned end 16 May",
      },
      {
        token: "PEEKING",
        label: "How many times results were viewed, and any decisions taken",
        example:
          "Checked daily from day 3. Test stopped on day 9 because the variant looked ahead and the team wanted to ship before a release freeze",
      },
    ],
    expectedOutput:
      "A statement of whether anything was prespecified, a comparison of actual against planned sample, a count of looks with their effect on the error rate, observed rates with an absolute difference, and one of four named verdicts with no hedging.",
    followUps: [
      "Given what we actually observed, calculate how many more exposures per arm we would need to detect this effect properly, and how long that takes at current traffic.",
      "Write the two sentence summary I send the team explaining why we are not shipping yet, without implying the variant failed.",
      "Design the rerun. State the stopping rule in advance and what we would do at each possible outcome.",
    ],
    pitfalls: [
      "Supplying percentages instead of raw counts blocks every quantitative statement the prompt is willing to make. Give exposures and events per arm.",
      "Understating the number of looks makes the peeking section useless. Count every dashboard glance, not just formal reviews.",
      "A verdict of INCONCLUSIVE RUN LONGER is often reported upward as no difference found. Those are different claims and the second one is usually false.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "Given two percentages and no counts, models will still return a p value on request, formatted confidently and computed from nothing. The figure is plausible enough to survive a glance and a hand check. Demanding raw exposures and events per arm, and requiring the missing counts to be named when they are absent, is the instruction that reliably stops it.",
  },

  article: {
    intro: [
      "An AB test analysis prompt should be harder to please than the person running the test. The pressure at readout time all points one way: a release is waiting, the variant looks ahead, and a model asked to interpret the numbers will find a reading that supports shipping because that is the reading the question implies.",
      "This one is written as a referee rather than an assistant. It establishes whether a test was actually specified, whether it reached the size it needed, and how many times somebody looked at the results, before it will comment on the numbers at all.",
      "It also declines to invent statistics. Given two percentages and asked for significance, the honest answer is that the calculation needs the underlying counts, and naming those counts is more useful than a figure assembled out of nothing.",
    ],

    sections: [
      {
        heading: "If nothing was prespecified, it is not a test",
        body: [
          "Fixing a primary metric and a minimum detectable effect before launch is what separates an experiment from a rummage through a dashboard. Without it, the metric that looks best after the fact becomes the primary metric, and with enough secondary metrics one of them always looks good.",
          "Setting a minimum detectable effect before launch also does something people find annoying and useful: it tells you how long the test must run before it can say anything. Teams frequently discover at this point that detecting the effect they care about would take eleven weeks at current traffic, which is a genuine finding and better learned in advance.",
          "Where nothing was written down, the prompt labels the analysis exploratory and stops calling anything a winner. That label is not a formality. It changes what the result can justify from a rollout to a hypothesis for a properly designed run.",
        ],
      },
      {
        heading: "Why the AB test analysis prompt refuses to name a winner",
        body: [
          "An underpowered test cannot declare a winner, and the arithmetic is unforgiving. A test planned for 34,000 exposures per arm and stopped at 21,000 was never capable of resolving the effect it was designed around, so the difference on screen is compatible with a real improvement, no difference, and a real decline.",
          "The refusal is uncomfortable because the numbers still show something. A variant sitting two points ahead looks like evidence. What the prompt insists on is that looking ahead and being ahead are different claims, and only one of them survives being asked how much data was collected.",
        ],
      },
      {
        heading: "Stopping a test early inflates false positives",
        body: [
          "Stopping a test early inflates false positives, and this is the failure mode that survives every process improvement because it feels like efficiency. Results are checked daily, the variant crosses a threshold on day nine, the test is stopped and the win is banked. Nothing about that sequence feels like cheating.",
          "The mechanism is simple enough to state plainly. Each look is another chance for random variation to cross the line, so a test peeked at daily for two weeks has many more opportunities to produce an apparent win than the nominal error rate assumes. Stopping the moment it does converts noise into a decision.",
          "This is why the prompt asks how many times results were viewed and whether any action followed. It cannot correct the error rate without knowing the stopping rule, and it says so rather than pretending the standard calculation still applies.",
        ],
        list: [
          "Fix the end date and the sample size before launch and write both somewhere dated.",
          "If you need to look early, use a sequential method designed for it rather than the standard test.",
          "Treat every dashboard glance as a look, because it is one.",
          "Never extend a test that has just gone flat, and never stop one that has just gone positive.",
          "Record the stopping rule with the result, so the next reader knows what the number is worth.",
        ],
      },
      {
        heading: "Numbers it will not calculate for you",
        body: [
          "Given raw exposures and events, comparing two proportions is standard arithmetic and worth doing in a tool you trust rather than in prose. Given only percentages, it is impossible, and the prompt will name the two counts it needs instead of producing something.",
          "This matters more than it sounds because a fabricated interval is indistinguishable from a computed one once it reaches a slide. The rule also blocks lift percentages calculated from rounded inputs, which is a smaller error that compounds when relative uplift gets quoted onward as though it were measured.",
        ],
      },
      {
        heading: "Reading the readout without softening it",
        body: [
          "Used as an ai prompt for experiment readout, the value shows up in the vocabulary it refuses. Trending towards significance, directionally positive and promising all describe a result that did not meet its bar while sounding like one that did, and they are how inconclusive tests get shipped.",
          "Anyone asking how to read an AB test result is usually looking for a threshold to compare against. The more reliable questions come earlier: what was fixed in advance, did it run to size, and how many times did somebody look. If those three answers are unsatisfactory, the numbers underneath them cannot be rescued by any amount of analysis.",
        ],
      },
    ],

    howTo: {
      name: "How to use the AB test analysis prompt",
      steps: [
        {
          name: "Find the prespecification, or admit there was none",
          text: "Paste the dated ticket or document. Reconstructing intent from memory after seeing results is exactly what the first section is designed to catch.",
        },
        {
          name: "Supply exposures and events per arm",
          text: "Raw counts, never percentages. Everything quantitative the prompt is prepared to say depends on having both numbers for every variant.",
        },
        {
          name: "Be honest about the looks",
          text: "Say how often the results were checked and whether anything was stopped, extended or changed afterwards. Undercounting here hides the largest source of false wins.",
        },
        {
          name: "Take the verdict as written",
          text: "Four options with no hedged fifth. Passing on INCONCLUSIVE RUN LONGER as inconclusive is fine; passing it on as no difference is a different and usually wrong claim.",
        },
        {
          name: "Convert a refusal into a plan",
          text: "Ask for the exposures needed and the time that takes at current traffic, so the outcome of the conversation is a rerun rather than an argument.",
        },
      ],
    },

    faq: [
      {
        question: "Can the AB test analysis prompt work out significance from my results?",
        answer:
          "Only when you supply exposures and events for each variant, and even then it will describe the comparison rather than pretend to be a statistics package. Given percentages alone it refuses and names the two counts required, because the calculation genuinely cannot be done without them.",
      },
      {
        question: "What if we stopped early for a business reason rather than the numbers?",
        answer:
          "Say so in the peeking field. Stopping because a release freeze arrived does not inflate the error rate the way stopping because the variant looked ahead does. The distinction matters, and the prompt treats the two situations differently once you tell it which happened.",
      },
      {
        question: "Is a segment result ever usable?",
        answer:
          "As a hypothesis for the next test, yes. As a reason to ship to that segment, no. A test powered for the overall metric has far less power within any subgroup, and checking several subgroups reintroduces exactly the multiple looks problem the design was meant to avoid.",
      },
      {
        question: "How do I explain an inconclusive result to stakeholders?",
        answer:
          "Report what the test could and could not have detected, then give the exposures and time needed to answer the question properly. Framing it as a measurement limit rather than a failed idea keeps the conversation on whether the effect is worth the traffic to measure.",
      },
      {
        question: "Does this apply to tests with very large traffic?",
        answer:
          "The prespecification and peeking checks apply unchanged. What changes at high volume is that tiny differences become detectable, so the harder question moves from whether an effect exists to whether an effect of that size is worth shipping and maintaining.",
      },
      {
        question: "What about tests with more than two variants?",
        answer:
          "Declare every arm in the raw counts and expect the verdict to be stricter, since comparing several variants against a control multiplies the comparisons. Prespecifying which arm is the real candidate, before launch, avoids most of the trouble that follows.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "The observational counterpart, for findings that were noticed in existing data rather than designed in advance.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description:
          "For writing up an inconclusive result so it reads as a measurement limit rather than a failed idea.",
      },
      {
        href: "/data-analysis-prompts/dashboard-design-prompt",
        label: "dashboard design prompt",
        description:
          "A live results tile is what makes daily peeking effortless, so the layout decision and the stopping rule are related problems.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "Generates the variants worth testing, with each one built around a distinct claim rather than a reworded sentence.",
      },
    ],

    externalLinks: [
      {
        href: "https://arxiv.org/abs/1512.04922",
        label: "Johari et al: peeking at A/B tests",
        description:
          "Quantifies how continuous monitoring inflates the false positive rate, which is the research behind the peeking section.",
      },
      {
        href: "https://dl.acm.org/doi/10.1145/3097983.3105833",
        label: "Kohavi et al: online controlled experiments at large scale",
        description:
          "Practitioner research from teams running thousands of experiments, including how often apparent wins fail to replicate.",
      },
      {
        href: "https://exp-platform.com/Documents/2017-08%20KDDMetricInterpretationPitfalls.pdf",
        label: "Experimentation Platform: metric interpretation pitfalls",
        description:
          "A catalogue of specific ways experiment metrics mislead, useful for checking whether your primary metric measures what you assume.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section2/prc24.htm",
        label: "NIST/SEMATECH e-Handbook: comparing two proportions",
        description:
          "The standard reference for the comparison itself, so the arithmetic is done in a documented procedure rather than by a language model.",
      },
    ],
  },
};

export default meta;
