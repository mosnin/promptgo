import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "statistical-check-prompt",
  name: "Noise Filter",
  title: "Statistical Check Prompt",
  category: "data-analysis-prompts",
  taskType: "evaluate",
  summary:
    "Forces alternative explanations onto the page before any pattern is reported, names which comparisons are too small to support a claim, and refuses to compute figures it was not given.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["statistics", "significance", "sample size", "review"],

  seo: {
    primaryKeyword: "statistical check prompt",
    keywords: [
      "statistical check prompt",
      "how to tell if a result is noise",
      "checking sample size before drawing conclusions",
      "ai prompt for reviewing an analysis",
      "multiple comparisons problem in practice",
      "alternative explanations before reporting a pattern",
    ],
    seoTitle: "Statistical Check Prompt: Test a Finding Before You Send It",
    seoDescription:
      "A statistical check prompt that lists alternative explanations before reporting a pattern, flags underpowered comparisons, and states plainly what it cannot verify.",
  },

  prompt: {
    text: `You are a sceptical reviewer of quantitative findings. Your default position is that the pattern is noise until the numbers rule that out. You will not be encouraging.

THE FINDING AS SOMEONE WOULD STATE IT: {{FINDING}}
HOW THE MEASURE WAS DEFINED AND COLLECTED: {{METHOD}}
GROUP SIZES, INCLUDING THE SMALLEST CELL: {{GROUP_SIZES}}
EVERY COMPARISON THAT WAS LOOKED AT, NOT JUST THIS ONE: {{COMPARISONS}}
WHAT ELSE CHANGED IN THE SAME PERIOD: {{CONTEXT}}

Work in this exact order and do not reorder it.

1. ALTERNATIVE EXPLANATIONS FIRST. Before assessing the finding at all, list at least five explanations other than the stated one: seasonality, a definition change, a composition shift, differential missingness, an outlier, a reporting lag, a change in who is being measured. For each, say what evidence would rule it in or out.

2. WHAT THE NUMBERS CAN AND CANNOT SUPPORT. Using only the group sizes given, judge whether the smallest cell can support the claim. Say which comparisons are underpowered and should not be reported as findings at all.

3. MULTIPLE LOOKS. Count how many comparisons were examined. State how many apparent findings you would expect from that many looks at pure noise, and whether this one stands out from that expectation.

4. VERDICT. One of: SUPPORTED BY WHAT IS HERE, PLAUSIBLE BUT NOT ESTABLISHED, or NOT DISTINGUISHABLE FROM NOISE. No hedged fourth option.

5. WHAT YOU CANNOT VERIFY. List every input you would need and were not given.

CRITICAL: never calculate a p value, confidence interval or effect size from numbers I did not supply. If I did not give you the variance or the raw counts, say that the calculation requires them and name exactly which. Do not produce a plausible looking statistic to fill a gap.`,
    variables: [
      {
        token: "FINDING",
        label: "The finding as someone would state it",
        example:
          "Customers who used the mobile app in their first week renewed at 71 percent against 58 percent for everyone else",
      },
      {
        token: "METHOD",
        label: "How the measure was defined and collected",
        example:
          "Renewal counted 13 months after signup, app use taken from event logs, cohort is signups from March to August",
      },
      {
        token: "GROUP_SIZES",
        label: "Group sizes including the smallest cell",
        example: "App users 1,240, non users 9,870, smallest monthly cell is 96 app users in August",
      },
      {
        token: "COMPARISONS",
        label: "Every comparison that was examined",
        example:
          "Renewal by app use, by plan tier, by acquisition channel, by region, by signup month, and app use crossed with tier",
      },
      {
        token: "CONTEXT",
        label: "What else changed in the same period",
        example:
          "Pricing changed in May, and the onboarding email sequence was rewritten in June for new signups only",
      },
    ],
    expectedOutput:
      "Five or more competing explanations with the evidence that would settle each, a clear statement of which comparisons are too small to report, a count of how many looks were taken, one of three named verdicts, and a list of missing inputs.",
    followUps: [
      "Take your strongest alternative explanation and write the exact query or cut of the data that would rule it out.",
      "Assume the finding is real. What is the smallest business decision it could justify, and what would we need before justifying a larger one?",
      "Rewrite the finding as a sentence I could put in front of a director without overclaiming, keeping the uncertainty visible.",
    ],
    pitfalls: [
      "Listing only the comparison you liked, rather than every comparison you ran, disables the multiple looks section and it is the section that catches most false findings.",
      "If you supply a p value in the input, models will build on it uncritically. Supply the raw counts and let the verdict rest on those.",
      "A verdict of PLAUSIBLE BUT NOT ESTABLISHED gets read as agreement by anyone skimming. Quote the alternative explanations, not the verdict, when you pass it on.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Sequence decides the answer here. Ask for a verdict and then for alternative explanations, and the alternatives arrive shaped to support the verdict already committed to. Moving alternative explanations into the first step, before any assessment exists, changes what the model finds: GPT-5.2 will surface a composition shift rather than confirm the effect it was handed.",
  },

  article: {
    intro: [
      "A statistical check prompt exists because a language model handed a table will find a pattern in it whether or not one is there, and will describe that pattern in confident, readable prose. Fluency is not evidence, and a well written paragraph about noise is harder to argue with than a badly written one.",
      "The defence built into this prompt is ordering. Alternative explanations are produced first, before any assessment of the finding exists, because a model that has already announced a conclusion generates alternatives that flatter it.",
      "After that come the parts most analyses skip: how small the smallest cell was, how many comparisons were examined before this one looked interesting, and which numbers the model refuses to calculate because it was never given the inputs.",
    ],

    sections: [
      {
        heading: "Alternative explanations before reporting a pattern",
        body: [
          "Putting alternative explanations before reporting a pattern is a sequencing trick with a real effect. Ask for a verdict and then for caveats, and the caveats arrive as decoration around a conclusion. Ask for competing explanations first, and the verdict has to survive them.",
          "The five demanded here are deliberately mundane, because mundane causes explain most surprising results. A definition changed. A source system started backfilling. The composition of the group shifted because acquisition moved to a different channel. None of these are interesting and all of them produce exactly the shape of finding people rush to present.",
          "Each explanation has to come with the evidence that would settle it, which converts a philosophical objection into a query you can run this afternoon. That is the difference between scepticism and obstruction.",
        ],
      },
      {
        heading: "Checking sample size before drawing conclusions",
        body: [
          "Checking sample size before drawing conclusions sounds obvious and is skipped constantly, usually because the headline number is large. A cohort of eleven thousand can still contain a monthly cell of ninety, and the monthly chart is the one that gets shown.",
        ],
        subsections: [
          {
            heading: "The smallest cell governs the claim",
            body: [
              "Whatever the total, the strength of a claim is set by the thinnest slice it depends on. If you segment by month, by region and by tier, the interesting cell is often a few dozen observations, and a difference of several percentage points there is unremarkable variation.",
            ],
          },
          {
            heading: "Power is about the effect you would act on",
            body: [
              "The useful question is not whether a difference is detectable but whether a difference worth acting on would have been detectable. A comparison too small to detect the effect you care about tells you nothing when it comes back flat, which is a result people routinely report as evidence of no difference.",
            ],
          },
        ],
      },
      {
        heading: "The multiple comparisons problem in practice",
        body: [
          "The multiple comparisons problem in practice rarely looks like a statistician running twenty tests. It looks like an afternoon spent slicing a dashboard by region, then by tier, then by channel, then by month, until something interesting appears. Nobody counted the slices, so nobody adjusted for them.",
          "That is why the prompt asks for every comparison examined rather than the one being reported. With that count it can say how many apparent findings pure noise would have produced, which reframes the question from is this real to does this stand out from what chance alone would have given us.",
        ],
      },
      {
        heading: "What the statistical check prompt refuses to compute",
        body: [
          "It will not produce a p value, a confidence interval or an effect size from numbers it was not given. This restriction removes the single most dangerous output a model can generate here, because a fabricated statistic is indistinguishable from a real one once it has been pasted into a slide.",
          "Instead it names the missing input. Telling you that the interval requires the raw counts per group is more useful than a figure that looks authoritative and was assembled from nothing. The check is easy to run yourself once you know exactly which number is absent.",
        ],
      },
      {
        heading: "Using it as a review step rather than an oracle",
        body: [
          "Run as an ai prompt for reviewing an analysis, it belongs between finishing the work and sending it, in the slot where a sceptical colleague would sit if one were available. It is not a replacement for that colleague and it does not see your data.",
          "The practical answer to how to tell if a result is noise is usually not a test statistic. It is discovering that the definition changed in May, that the interesting cell holds ninety observations, and that you looked at eighteen cuts before this one. Those three facts are cheap to establish and they resolve most findings before any statistics are needed.",
        ],
      },
    ],

    howTo: {
      name: "How to run the statistical check prompt",
      steps: [
        {
          name: "State the finding as you would say it aloud",
          text: "Use the overclaiming version, the one you would put in a subject line. Softened phrasing hides the claim that needs testing.",
        },
        {
          name: "Count every cut you looked at",
          text: "Include the ones that showed nothing. Those are the denominator of the multiple looks calculation and leaving them out is how findings survive.",
        },
        {
          name: "Give the smallest cell, not just the total",
          text: "The thinnest slice your claim rests on decides what the claim can support, regardless of how large the overall dataset is.",
        },
        {
          name: "List what else changed",
          text: "Pricing, definitions, tracking, seasonality, staffing. Most alternative explanations come from this field, and an empty one produces a weaker review.",
        },
        {
          name: "Chase the top alternative before presenting",
          text: "Ask for the query that would rule it out, run it, and add the answer to your write up whichever way it goes.",
        },
      ],
    },

    faq: [
      {
        question: "Can the statistical check prompt replace a significance test?",
        answer:
          "No, and it explicitly refuses to imitate one. It handles the parts around the test that decide whether a test is even meaningful: whether the comparison was prespecified, how many were run, how small the cells are, and what else could produce the same shape of result.",
      },
      {
        question: "Why does it never compute a p value?",
        answer:
          "Because it usually lacks the variance or the raw counts required, and a model asked for a number will supply one anyway. A fabricated statistic carries the same authority as a calculated one once it reaches a slide, so refusing outright is safer than a caveat nobody rereads.",
      },
      {
        question: "What counts as a comparison I should declare?",
        answer:
          "Every cut you looked at, including exploratory ones that showed nothing and slices you glanced at on a dashboard. The count only works if it reflects the real search you conducted rather than the tidy story you assembled afterwards for the write up.",
      },
      {
        question: "Is a verdict of not distinguishable from noise the end of it?",
        answer:
          "Usually it means gather more data or wait, rather than abandon the idea. It is also a reasonable point to design a deliberate test instead of continuing to slice historical data, since a prespecified comparison avoids the multiple looks problem entirely.",
      },
      {
        question: "Does it work on qualitative findings too?",
        answer:
          "Partly. The alternative explanations and the multiple looks logic transfer well to interview themes and support ticket patterns. The sample size sections assume counting, so treat those as prompts for judgement about who you spoke to rather than as arithmetic.",
      },
      {
        question: "Should I run this before or after building the chart?",
        answer:
          "Before, ideally. A chart makes a pattern feel established and it becomes noticeably harder to abandon a finding once someone has designed a figure for it, briefed a colleague on it, and put it into a deck that already has a title slide.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/ab-test-analysis-prompt",
        label: "ab test analysis prompt",
        description:
          "The prespecified version of the same discipline, for experiments where the comparison was declared before the data arrived.",
      },
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description:
          "Applies the same scrutiny to survey results, where nonresponse is usually a bigger threat than sampling error.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description:
          "For writing up a finding that survived this review without quietly upgrading it to a certainty in the process.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "Where a surviving finding turns into a proposal, with the alternative explanations recorded as stated assumptions.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf",
        label: "American Statistical Association: statement on p-values",
        description:
          "The profession's own position on what a p value does and does not establish, including its warning about selective reporting.",
      },
      {
        href: "https://royalsocietypublishing.org/doi/10.1098/rsos.140216",
        label: "Colquhoun: the false discovery rate of significance tests",
        description:
          "Quantifies how often an apparently significant result is wrong, which is the arithmetic behind the multiple looks section.",
      },
      {
        href: "https://www.bmj.com/content/310/6973/170",
        label: "BMJ Statistics Notes: multiple significance tests",
        description:
          "A short primary explanation of why testing many comparisons inflates false positives, written for practitioners rather than statisticians.",
      },
      {
        href: "https://www.stat.columbia.edu/~gelman/research/published/ForkingPaths.pdf",
        label: "Gelman and Loken: the garden of forking paths",
        description:
          "Shows how analyst choices made in good faith produce false findings without anybody running a single extra test.",
      },
    ],
  },
};

export default meta;
