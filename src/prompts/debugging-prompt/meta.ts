import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "debugging-prompt",
  name: "Hypothesis Ranker",
  title: "Debugging Prompt",
  category: "coding-prompts",
  taskType: "analyse",
  summary:
    "Blocks the model from suggesting a fix until it has ranked competing explanations and named the cheapest observation that eliminates each one.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["stack traces", "diagnosis", "incidents", "reproduction"],

  seo: {
    primaryKeyword: "debugging prompt",
    keywords: [
      "debugging prompt",
      "how to debug a stack trace with ai",
      "ai prompt for reading a python traceback",
      "how to reproduce a bug from logs",
      "why a bug only happens in production",
    ],
    seoTitle: "Debugging Prompt: Rank Hypotheses Before You Patch",
    seoDescription:
      "A debugging prompt that withholds any fix until it has ranked the competing explanations and named the one cheap observation that rules each of them out.",
  },

  prompt: {
    text: `You are diagnosing a defect. You may not propose a fix until you have produced ranked hypotheses and, for each one, the single observation that would rule it out. A patch offered before that point is a guess in a lab coat.

SYMPTOM AS OBSERVED: {{SYMPTOM}}
STACK TRACE OR ERROR OUTPUT: {{TRACE}}
WHAT CHANGED RECENTLY: {{RECENT_CHANGES}}
WHERE IT HAPPENS AND WHERE IT DOES NOT: {{ENVIRONMENT}}

STEP 1: SPLIT THE TRACE. Label every frame as application code, first party library, third party library or runtime. Name the deepest application frame. An error is usually reported inside a library and caused in the application above it.

STEP 2: FACTS ONLY. List what the symptom, the trace and the environment directly evidence. Mark anything you are filling in yourself as INFERRED. Do not smooth over a missing detail to make the story continuous.

STEP 3: HYPOTHESES. Produce three to five, ranked by probability given the evidence rather than by how interesting they are. Each needs the mechanism in one sentence, the evidence for it, the evidence against it, and a DISCRIMINATOR: the cheapest single observation whose outcome eliminates either this hypothesis or every hypothesis ranked above it. Prefer a discriminator that reads a value or log line that already exists over one that needs a deployment.

STEP 4: REPRODUCTION. Give the concrete input, state and ordering that should trigger the symptom on demand. If the evidence cannot support a reproduction, name the specific piece that is missing.

STEP 5: WHAT YOU CANNOT SEE. Versions, configuration, concurrency, data shape. Say what you would ask for and how it would change the ranking.

Only after step five, and only when the top hypothesis is clearly ahead of the second, propose a fix. Otherwise propose the next observation.`,
    variables: [
      {
        token: "SYMPTOM",
        label: "Symptom as observed",
        example:
          "About one request in three hundred to POST /orders returns 500. Started Tuesday afternoon. No pattern by customer, and retrying the same payload usually succeeds.",
      },
      {
        token: "TRACE",
        label: "Stack trace or error output",
        example:
          "KeyError: 'shipping_rate'\n  File \"app/orders/handler.py\", line 88, in create_order\n  File \"app/pricing/quote.py\", line 34, in build_quote\n  File \"vendor/cache/redis_client.py\", line 210, in get_json",
      },
      {
        token: "RECENT_CHANGES",
        label: "What changed recently",
        example:
          "Monday: added a Redis cache in front of the shipping rate lookup with a 60 second TTL. Nothing else deployed since Friday.",
      },
      {
        token: "ENVIRONMENT",
        label: "Where it happens and where it does not",
        example:
          "Production only, four app instances behind a load balancer. Never seen in staging, which runs one instance and a local Redis.",
      },
    ],
    expectedOutput:
      "A trace split into application and library frames, a fact list with inferences marked, three to five ranked hypotheses each carrying a cheap discriminating observation, a concrete reproduction attempt, and an honest account of the missing context.",
    followUps: [
      "I ran your top discriminator and the result was the opposite of what hypothesis one predicts. Re-rank without discarding the evidence you already have.",
      "Write the log line I should add to distinguish hypotheses two and three in a single production request.",
      "Assume all four instances warm the cache at the same moment after a restart. Which hypothesis does that support?",
    ],
    pitfalls: [
      "Pasting a truncated trace makes the frame split useless. The middle frames are usually where the application hands control to the library, which is the part that matters.",
      "Describing the symptom as it was reported to you rather than as you observed it introduces a second layer of interpretation, and the ranking inherits whatever the reporter assumed.",
      "The discriminator is only cheap if you actually run it. Skipping straight to the top hypothesis and patching it works often enough to be a habit, and the habit is what produces four fixes for one bug.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "The first plausible fix arrives before any diagnosis and is usually aimed at the symptom, proposing cache invalidation for what is really a serialisation mismatch. Banning fixes until a cause is named raises the quality of everything after it. The discriminator field matters just as much, since GPT-5.2 will otherwise list hypotheses that are all consistent with the same evidence, which is a list and not a diagnosis.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "The default failure of a debugging prompt is speed. Paste an error, get a fix, apply it, and discover an hour later that the fix addressed a mechanism that was never operating. The model was never wrong exactly, it just answered a question about plausible causes when you needed an answer about the actual one.",
      "This version withholds the fix. It splits the trace into application and library frames, separates evidence from inference, ranks candidate mechanisms against each other, and attaches to each one the cheapest observation that would knock it out.",
      "That last piece is what makes it a diagnostic tool rather than a suggestion engine. A ranked list you cannot test is still a guess. A ranked list where each entry comes with a log line to check is a plan for the next five minutes.",
    ],

    sections: [
      {
        heading: "Forming a hypothesis before changing code",
        body: [
          "Forming a hypothesis before changing code is the whole discipline, and it is the step under most pressure when something is broken in production. Editing feels like progress. Reading does not.",
          "Requiring three to five ranked mechanisms costs about thirty seconds and changes what happens next. Two of them are usually eliminated by something already in the logs, which means the first thing you do is read rather than deploy, and the deploy you eventually make is aimed at a cause you confirmed.",
        ],
      },
      {
        heading: "How to debug a stack trace with ai",
        body: [
          "The frame split in step one exists because traces mislead by construction. The exception surfaces at the deepest point, which is almost always inside somebody else's library, and an unconstrained model will attach itself to that frame and start theorising about the library.",
          "Labelling each frame forces the deepest application frame into view, which is where the bad value was constructed or the wrong argument passed. Used as an ai prompt for reading a python traceback this matters more than in most languages, because a long chain of framework frames sits between the handler and the point of failure.",
        ],
      },
      {
        heading: "What the debugging prompt does with competing explanations",
        body: [
          "Three hypotheses that all fit the evidence equally are not a diagnosis. They are a restatement of your uncertainty, and models produce them readily because each one sounds reasonable on its own.",
          "The discriminator requirement breaks the tie. For each mechanism the debugging prompt has to name one observation whose result eliminates something, and it is instructed to prefer observations that cost nothing over ones that need a release.",
        ],
        subsections: [
          {
            heading: "A value you already have",
            body: [
              "The best discriminators are already sitting in a log, a metric or a database row. Checking whether the cache key includes the region, or whether the failing requests share a shard, takes a minute and usually removes half the list.",
            ],
          },
          {
            heading: "An experiment worth running",
            body: [
              "When nothing existing distinguishes the candidates, the next best thing is the smallest experiment that does. One temporary log line in the right place beats a debugger session against a bug that appears once in three hundred requests.",
            ],
          },
        ],
      },
      {
        heading: "How to reproduce a bug from logs",
        body: [
          "Step four asks for the input, state and ordering that would trigger the symptom deliberately. Working out how to reproduce a bug from logs is often possible when nobody has tried, because the log contains the request body, the timestamp and the instance identifier, and the missing part is only the sequence.",
          "When reproduction is not possible the prompt has to say which piece is absent rather than construct a scenario that fits. That refusal is valuable: it tells you what to add to the logging before the next occurrence, which is frequently the fastest route to a bug that appears twice a week.",
        ],
      },
      {
        heading: "Why a bug only happens in production",
        body: [
          "Why a bug only happens in production nearly always reduces to a difference the environment field is meant to capture: instance count, concurrency, data volume, cache warmth, clock skew, or a configuration value nobody thinks of as code.",
          "Stating where the defect does not occur is as informative as stating where it does. One instance in staging and four in production immediately promotes every hypothesis involving shared state, and demotes anything about the request handler in isolation.",
        ],
      },
      {
        heading: "The limits worth knowing",
        body: [
          "Step five is the honest part. The model cannot see your dependency versions, your connection pool size, the shape of the row that triggered this, or what the other three instances were doing at the time.",
          "Naming those gaps turns the debugging prompt into a request for specific evidence rather than a confident narrative built on defaults. In practice the ask is usually small: one config value, one version number, one count of rows matching a condition.",
        ],
      },
    ],

    howTo: {
      name: "How to use the debugging prompt",
      steps: [
        {
          name: "Paste the whole trace",
          text: "Including the framework frames you normally skip. The split in step one needs the boundary between your code and everything under it, and a trimmed trace hides exactly that.",
        },
        {
          name: "Say where it does not happen",
          text: "The environment field is doing comparative work. Two lines describing the place the defect never appears usually eliminates more hypotheses than a paragraph about the place it does.",
        },
        {
          name: "Run the top discriminator before reading further",
          text: "Then feed the result back. The ranking after one real observation is worth more than the initial ranking, and the second pass tends to collapse to a single mechanism.",
        },
      ],
    },

    faq: [
      {
        question: "Why not just ask for the fix?",
        answer:
          "Because a fix that is applied without a confirmed mechanism usually changes the symptom rather than the cause. You then have a second bug layered on the first, and the original evidence is gone because the code that produced it no longer exists in that form.",
      },
      {
        question: "What if I only have the error message and nothing else?",
        answer:
          "It still works, but the ranking will be shallow and step five gets long. Fill in the recent changes field even roughly, because deployment timing eliminates more candidate mechanisms per word than any other input you can give it.",
      },
      {
        question: "Does this help with a defect that has no exception at all?",
        answer:
          "Yes, and the symptom field carries the weight instead of the trace. Describe the wrong output next to the expected output precisely, including the values, since silent wrongness is diagnosed by the difference between two numbers rather than by a frame list.",
      },
      {
        question: "Can I use it on a bug in a language I do not know well?",
        answer:
          "That is one of its stronger uses, because the frame split tells you which parts of the trace are yours and which belong to the ecosystem. Be more sceptical of the hypotheses themselves, and lean on the discriminators, which you can usually check without knowing the language deeply.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Once step four produces a reproduction, this converts it into a regression test before the fix is written.",
      },
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description:
          "Useful when the deepest application frame sits in code nobody on the team has read this year.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description:
          "For the defects that reached customers, where the diagnosis is only the first half of the work.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.python.org/3/library/traceback.html",
        label: "Python: the traceback module",
        description:
          "Primary documentation for how frames are ordered and chained, which is what the frame split in step one relies on.",
      },
      {
        href: "https://dl.acm.org/doi/10.1109/32.988498",
        label: "Zeller and Hildebrandt: simplifying failure inducing input",
        description:
          "The published basis for narrowing a failing input by systematic elimination rather than by inspection.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: prompt engineering guide",
        description:
          "Vendor documentation on splitting a task into ordered steps, which is why the fix is gated behind step five here.",
      },
    ],
  },
};

export default meta;
