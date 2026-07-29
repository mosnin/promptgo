import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "performance-profiling-prompt",
  name: "Ceiling First",
  title: "Performance Profiling Prompt",
  category: "coding-prompts",
  taskType: "analyse",
  summary:
    "Refuses to suggest an optimisation without a measurement, checks whether the profile is even valid, and discards any candidate whose best case win is too small to matter.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["profiling", "flame graphs", "latency", "benchmarking"],

  seo: {
    primaryKeyword: "performance profiling prompt",
    keywords: [
      "performance profiling prompt",
      "reading a flame graph with ai",
      "finding the bottleneck before optimising",
      "how to interpret a cpu profile",
      "measuring before you optimise code",
      "ai prompt for latency investigation",
    ],
    seoTitle: "Performance Profiling Prompt: No Profile, No Advice",
    seoDescription:
      "A performance profiling prompt that validates the measurement first, computes the ceiling on every candidate fix, and will not optimise what it has not measured.",
  },

  prompt: {
    text: `You are analysing a performance measurement. You may not recommend a change until you have stated what the measurement covers, what it leaves out, and the ceiling on any improvement it could produce. Advice offered before that is a code style preference wearing a stopwatch.

WHAT IS SLOW, AS OBSERVED: {{SYMPTOM}}
THE MEASUREMENT ITSELF: {{PROFILE}}
HOW IT WAS COLLECTED: {{METHOD}}
THE BUDGET BEING MISSED: {{TARGET}}

GATE. If no measurement was supplied, stop here. Do not infer hot paths by reading code. Instead specify precisely what to collect: which tool, wall clock or CPU time, sampled or instrumented, at what load, over what duration, warm or cold, and which single request path to isolate. Then wait.

1. VALIDITY. Say whether this measurement can answer the question at all. Does the workload during collection resemble the slow case. Are there enough samples to talk about the frames being discussed. Does it capture time spent off CPU waiting on IO, locks or a downstream service. Was the process warm. List every part of the request the measurement cannot see.

2. WHERE THE TIME IS. Separate self time from total time, and never quote total time as though it were a cost. Give the top contributors as a percentage of the measured window, and state how much of the window is unaccounted for.

3. CEILING. For each candidate, compute the best possible end to end improvement if its cost fell to zero. A frame holding 6 percent of wall time cannot produce a 30 percent win however it is rewritten. Discard every candidate whose ceiling is smaller than the gap to the budget.

4. MECHANISM AND FALSIFIER. For each survivor, say why it costs what it costs: algorithmic growth, allocation pressure, IO latency, lock contention, serialisation, or a call happening more times than anyone expects. Then give the single cheapest observation that would show you are wrong, preferring an existing counter or log field over a new experiment.

5. RANK by measured share divided by effort. Not by how much you dislike the code.

6. PREDICT. Before proposing the change, state the number you expect afterwards and the margin you would accept. Say what to re measure, under which conditions, and what result would count as a regression.

Do not propose caching, parallelism or a rewrite in a faster language unless the measurement shows the cost you would be removing. Do not comment on code that does not appear in the profile.`,
    variables: [
      {
        token: "SYMPTOM",
        label: "What is slow, as observed",
        example:
          "GET /reports/monthly has a p95 of 4.2 seconds and a p50 of 900ms. The p50 is fine. Complaints are all from accounts with more than 5,000 line items.",
      },
      {
        token: "PROFILE",
        label: "The measurement itself",
        example:
          "py-spy top over 60s: 41% self time in decimal.Decimal.__mul__, 18% in psycopg2 recv, 9% in json.dumps, 7% in dateutil.parser.parse, remainder spread under 2% each.",
      },
      {
        token: "METHOD",
        label: "How it was collected",
        example:
          "Sampled at 100Hz on one production pod during business hours, wall clock not CPU, no warmup, mixed traffic rather than only the slow endpoint.",
      },
      {
        token: "TARGET",
        label: "The budget being missed",
        example:
          "p95 must be under 1.5 seconds for the endpoint to stay inside the dashboard load budget. So we need to remove roughly 2.7 seconds at p95.",
      },
    ],
    expectedOutput:
      "A validity verdict naming what the profile cannot see, self time separated from total time, a ceiling calculation that eliminates most candidates outright, a mechanism and a cheap falsifier for each survivor, and a predicted number to check afterwards.",
    followUps: [
      "The profile was collected on mixed traffic. Tell me exactly how to isolate the slow endpoint and what would change in your ranking if the distribution differs.",
      "Take the top survivor and write the microbenchmark that measures only that cost, including the input size that reproduces the production shape.",
      "I made the change and p95 moved from 4.2s to 3.9s against your predicted 2.4s. What does that gap rule out?",
    ],
    pitfalls: [
      "Pasting a profile of the wrong thing. A CPU profile of a request that spends most of its time waiting on a database will show your serialisation code at the top, and the whole analysis then optimises 12 percent of the problem.",
      "Reporting total time instead of self time. Total time for a top level handler is always near 100 percent, and a candidate list ranked by it just recovers the call stack.",
      "Accepting a ranking built on a handful of samples. A frame seen four times in a sixty second sample is noise, and the statistical check on sample counts is the step people skip because the flame graph looks convincing.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Source code plus a complaint about slowness is enough for a model to propose batching a loop, and nothing in the source says that loop accounts for a trivial share of wall time. Refusing to answer without a profile is the gate that stops speculative tuning. The ceiling step exists because Gemini 3 Pro will rank a small frame first on the grounds that it looks easiest to fix.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
  },

  article: {
    intro: [
      "A performance profiling prompt earns its keep by refusing things. Asked to make code faster, a model will always find something to say, and what it says will be a list of habits: batch the loop, add a cache, avoid the allocation. None of that is anchored to where the time actually goes.",
      "The version here starts with a gate. No measurement, no advice. If you have not profiled, the only output is a precise description of what to collect and under what conditions, which is more useful than a confident guess and takes about ten minutes to act on.",
      "Once a profile exists, the first job is not interpretation but validation. A great deal of profiling effort is spent carefully analysing a measurement that never contained the slow case, and nothing later in the analysis can recover from that.",
      "Read as an ai prompt for latency investigation, its distinguishing feature is the arithmetic in step three, which throws away most candidate fixes before anyone has argued about them.",
    ],

    sections: [
      {
        heading: "A profile you cannot trust is worse than none",
        body: [
          "The validity step asks four questions that people skip because they are boring. Did the traffic during collection include the slow case. Are there enough samples to talk about a frame at 5 percent. Does the tool see time spent waiting rather than computing. Was anything warm.",
          "Each of those has a characteristic failure. A wall clock profile taken during quiet hours on mixed traffic will not contain your slow endpoint at all, so its frames belong to something else entirely. A CPU profile of an IO bound request shows you the small part of the work that happened to use the processor.",
        ],
      },
      {
        heading: "Reading a flame graph with ai",
        body: [
          "Reading a flame graph with ai works better than it should, provided the width semantics are stated. The model needs to know whether the widths are samples or milliseconds, whether the stacks are merged across threads, and whether the y axis is depth or time.",
          "What it is genuinely good at is spotting a frame appearing in two unrelated subtrees, which is the signature of a helper being called from a path nobody remembers. What it is bad at is inferring anything from a narrow tower, because narrow towers are usually deep call stacks and not costs.",
        ],
      },
      {
        heading: "Finding the bottleneck before optimising anything",
        body: [
          "Finding the bottleneck before optimising is not a slogan about discipline, it is arithmetic. If a candidate holds 6 percent of the measured window, removing it entirely buys you 6 percent, and no amount of cleverness inside that frame changes the number.",
          "So the ceiling step computes that bound for every candidate and discards anything that cannot close the gap to the budget on its own. It is unusual for more than two candidates to survive, and the ones that do not survive are frequently the ones the team had already agreed to work on.",
        ],
      },
      {
        heading: "What the performance profiling prompt asks for when there is no profile",
        body: [
          "The gate is the part people push against, and it is the part that saves the most time. Instead of an answer, the performance profiling prompt returns a collection recipe: the tool, whether to sample wall clock or CPU, the load to apply, the duration, and the single path to isolate.",
          "That recipe is specific enough to run without further thought, which matters because the reason nobody profiled is almost never disagreement about profiling. It is that nobody wanted to work out the flags.",
        ],
      },
      {
        heading: "How to interpret a cpu profile without mixing up self and total time",
        body: [
          "How to interpret a cpu profile reduces mostly to one distinction. Self time is work done in that frame. Total time includes everything it called. A ranking by total time puts your request handler at the top and tells you nothing you did not know when you opened the file.",
          "The unaccounted share matters too. When the listed frames add up to 62 percent of the window, the remaining 38 percent is either spread thinly across hundreds of call sites or is time the tool could not attribute, and those two possibilities lead to completely different next steps.",
        ],
      },
      {
        heading: "Predict the number before you change the code",
        body: [
          "Measuring before you optimise code is only half the discipline. The other half is committing to a predicted result beforehand, because a prediction turns the change into an experiment with a pass and a fail rather than a diff that feels faster.",
          "Predictions are also how you learn. A change that delivers a quarter of the predicted win means the mechanism was wrong even though the number moved, and that is worth knowing before the same reasoning gets applied to the next three candidates.",
          "This is where the performance profiling prompt stops being an analysis and becomes a record. Predicted number, measured number, and the gap, kept somewhere the next person can read them.",
        ],
      },
    ],

    howTo: {
      name: "How to use the performance profiling prompt",
      steps: [
        {
          name: "State the budget as a number and a gap",
          text: "p95 under 1.5 seconds against a current 4.2 gives the ceiling step something to eliminate against. Make it faster leaves every candidate alive.",
        },
        {
          name: "Describe the collection method honestly",
          text: "Sampling rate, duration, warm or cold, production or laptop, isolated endpoint or mixed traffic. The validity verdict is only as good as this field, and it is the one people leave blank.",
        },
        {
          name: "Take the collection recipe seriously if you get one",
          text: "Being told to go and measure feels like a non answer. Running the recipe usually takes less time than the argument about whether it is necessary, and it routinely contradicts everyone's guess.",
        },
        {
          name: "Re measure under the same conditions",
          text: "Same load, same warmup, same duration. A comparison against a differently collected baseline can show any result you like, and it usually shows the one you were hoping for.",
        },
      ],
    },

    faq: [
      {
        question: "What if the slowness only happens in production and I cannot profile there?",
        answer:
          "Continuous sampling profilers run in production at low overhead and are the right answer where they are available. Failing that, state in the method field that the profile is from staging with synthetic load, and the validity step will tell you which conclusions do not transfer.",
      },
      {
        question: "Does the ceiling calculation work for tail latency?",
        answer:
          "Only if the profile was collected over the tail rather than over the average. A profile of all traffic describes the median request, and applying its percentages to a p99 problem produces confident arithmetic about the wrong distribution.",
      },
      {
        question: "Can it analyse a database query plan instead of a code profile?",
        answer:
          "Yes, and the same structure holds. The plan is the measurement, estimated against actual rows is the validity check, and the ceiling arithmetic applies to any node whose cost you could drive to zero. Say in the method field whether the plan came from EXPLAIN or EXPLAIN ANALYZE.",
      },
      {
        question: "Why is caching treated with suspicion?",
        answer:
          "Because it is the default suggestion and it moves the cost rather than removing it. A cache is the right answer when the profile shows repeated identical work, and it is a new class of correctness bug when the profile shows one expensive computation per distinct input.",
      },
      {
        question: "How many samples are enough?",
        answer:
          "Enough that the frame you want to act on is not a rounding error. As a working rule, do not make an argument about a frame with fewer than a few hundred samples behind it, and be suspicious of any ranking where the top two candidates are within noise of each other.",
      },
      {
        question: "Does it help with memory rather than time?",
        answer:
          "The shape transfers, with allocation counts and retained bytes replacing wall clock share. The ceiling step becomes more useful rather than less, because peak memory is often dominated by one retained structure while attention goes to the many small allocations that are easier to see.",
      },
      {
        question: "What if the profile shows the time is in a third party library?",
        answer:
          "That is a result, not a dead end. The mechanism step still applies, and the useful question becomes how many times you are calling it and with what input size, since the most common finding is a library being invoked far more often than the author of the calling code believed.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description:
          "For slowness that turns out to be a defect, where the question is a mechanism rather than a distribution of time.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "sql query prompt",
        description:
          "When the profile points at database time and the next step is reading a query plan rather than a stack.",
      },
      {
        href: "/coding-prompts/architecture-decision-prompt",
        label: "architecture decision prompt",
        description:
          "For the case where no candidate has a high enough ceiling and the design itself is the constraint.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "Useful on the before and after numbers, where sample size and variance decide whether the win is real.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.brendangregg.com/flamegraphs.html",
        label: "Brendan Gregg: flame graphs",
        description:
          "The reference description of the visualisation from its author, including what the width of a frame does and does not mean.",
      },
      {
        href: "https://dl.acm.org/doi/10.1145/1465482.1465560",
        label: "Amdahl: validity of the single processor approach",
        description:
          "The published origin of the ceiling arithmetic that bounds any speedup by the share of time you can actually affect.",
      },
      {
        href: "https://go.dev/blog/pprof",
        label: "Go: profiling Go programs",
        description:
          "Primary vendor documentation on sampled profiling, including the distinction between self time and cumulative time.",
      },
      {
        href: "https://docs.python.org/3/library/profile.html",
        label: "Python: deterministic profiling",
        description:
          "Documentation on instrumented profiling and its overhead, which is why the collection method has to be recorded.",
      },
    ],
  },
};

export default meta;
