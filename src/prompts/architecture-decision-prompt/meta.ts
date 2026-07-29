import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "architecture-decision-prompt",
  name: "One Way Door",
  title: "Architecture Decision Prompt",
  category: "coding-prompts",
  taskType: "evaluate",
  summary:
    "Drafts a decision record that rejects each option by naming the constraint it fails, classifies how expensive the choice is to undo, and writes down what would prove it wrong.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["architecture", "adr", "trade offs", "technical strategy"],

  seo: {
    primaryKeyword: "architecture decision prompt",
    keywords: [
      "architecture decision prompt",
      "writing an architecture decision record",
      "choosing between two technical designs",
      "how to document a technical trade off",
      "reversible and irreversible decisions in software",
      "ai prompt for comparing system designs",
    ],
    seoTitle: "Architecture Decision Prompt: Write the Record, Not Advice",
    seoDescription:
      "An architecture decision prompt that rejects each option by the constraint it fails, says whether the choice is reversible, and states what would prove it wrong.",
  },

  prompt: {
    text: `You are drafting an architecture decision record. Produce the record itself, not advice about how to decide. Every claim in it traces back to a stated constraint, a measured number, or an assumption you have explicitly labelled as an assumption.

THE DECISION TO BE MADE: {{DECISION}}
CONSTRAINTS THAT ARE GIVEN: {{CONSTRAINTS}}
WHAT IS KNOWN ABOUT LOAD, TEAM AND TIMELINE: {{CONTEXT}}
OPTIONS ALREADY ON THE TABLE: {{OPTIONS}}

CONTEXT. Restate the problem in five sentences without naming any product or technology. If it cannot be stated that way, the decision has already been made somewhere upstream, and your first job is to say so.

ASSUMPTIONS. Split every input into GIVEN, meaning it came from the constraints or the context above, and ASSUMED, meaning you supplied it. Each ASSUMED line carries the sentence that becomes true if the assumption is false.

OPTIONS. Cover the options supplied, plus any obvious one that was left out, including changing nothing. For each: how it works in three sentences, the constraint it satisfies most cheaply, and the specific numbered constraint it fails. An option with no failing constraint has not been examined properly. Look again, or state plainly why it dominates the others.

REVERSIBILITY. Classify the decision. ONE WAY means undoing it costs more than building it. REVERSIBLE means it can be unwound inside a sprint. For a one way decision, name what is actually locked in: data already written in the new shape, an interface published to third parties, a contract signed, or people hired against it.

DECISION AND CONSEQUENCES. Name the chosen option. State what gets harder, not only what gets easier. Name the future option this forecloses.

FALSIFICATION. Write the observation that would show this was the wrong call, phrased so it is measurable within ninety days. Then name the cheapest thing that could produce that observation this week: a load test, a query against data you already hold, a two day spike, or a conversation with a team that has done it.

Do not rate anything as high, medium or low. Do not write that it depends. Where a number would settle the argument and you do not have it, name the number and say where it lives.`,
    variables: [
      {
        token: "DECISION",
        label: "The decision to be made",
        example:
          "Whether to keep orders and inventory in one Postgres database or split inventory into its own service with its own store.",
      },
      {
        token: "CONSTRAINTS",
        label: "Constraints that are given",
        example:
          "1. Stock counts must never oversell. 2. Checkout p99 stays under 800ms. 3. No more than two engineers on this for one quarter. 4. The warehouse system polls us every 30 seconds and cannot change.",
      },
      {
        token: "CONTEXT",
        label: "Load, team and timeline",
        example:
          "Peak 400 orders per minute in November, 12 per minute otherwise. Six backend engineers, none with production Kafka experience. Black Friday is 16 weeks away and there is a change freeze for the two weeks before it.",
      },
      {
        token: "OPTIONS",
        label: "Options already on the table",
        example:
          "A: leave it in one database and add an index plus a row level lock. B: separate inventory service with an event stream. C: keep one database but move stock counts to Redis with periodic reconciliation.",
      },
    ],
    expectedOutput:
      "A record with a technology free problem statement, assumptions separated from givens, each option rejected against a numbered constraint, a reversibility verdict naming what is locked in, and one falsifiable observation with a cheap way to get it.",
    followUps: [
      "Rewrite this assuming constraint 3 disappears and we can put six engineers on it for a quarter. Which rejections stop holding?",
      "The falsification observation needs an owner and a date. Turn it into a check that runs on a schedule and says pass or fail without interpretation.",
      "Draft the two paragraph version for people who will read this in eighteen months without any of the current context.",
    ],
    pitfalls: [
      "Supplying constraints as goals. Should be fast and scalable cannot fail an option, so nothing gets eliminated and the record becomes a survey. Numbered, testable constraints are what make the rejections real.",
      "Letting the chosen option arrive with no downside. Every architecture buys something with something, and a record listing only benefits is a sales document that will be quoted against you later.",
      "Skipping the falsification section because the decision feels obvious. That is precisely the case where nobody sets a tripwire, and the wrongness is discovered by an outage rather than by a metric.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Without a constraint that can actually fail, a model writes a balanced survey of every option and eliminates none of them, which is a summary rather than a decision. Numbering the constraints and forcing each option to name the specific one it breaks produces real elimination. GPT-5.2 still tends to call a one way door reversible when the irreversible part is stored data rather than code.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
  },

  article: {
    intro: [
      "An architecture decision prompt should produce a record, not a recommendation. The recommendation is the cheap part and it is usually already known in the room. What is missing eighteen months later is why the other options were rejected and what everybody believed at the time.",
      "This one is built around elimination. Options are not scored, they are failed against a numbered constraint, which means the constraints have to be written as things a design can actually break rather than as adjectives.",
      "The other half is honesty about cost of reversal. Read as an ai prompt for comparing system designs it is unremarkable until the reversibility section, which is where a decision that felt like a preference turns out to be a door that only opens one way.",
    ],

    sections: [
      {
        heading: "State the problem without naming a technology",
        body: [
          "The opening instruction sounds like a writing exercise and functions as a diagnostic. Teams routinely arrive with should we use Kafka, which is not a problem, it is a candidate answer that has already excluded everything else.",
          "Forcing five sentences about ordering guarantees, throughput and who consumes what usually reveals that two people in the discussion were solving different problems. That is worth finding before anyone builds a comparison.",
        ],
      },
      {
        heading: "Writing an architecture decision record that outlives its author",
        body: [
          "Writing an architecture decision record is an exercise in writing for a stranger. The reader is a new engineer in two years who has found a constraint that seems arbitrary and wants to know whether they can remove it.",
          "That reader is served by the rejected options and the assumptions, not by the decision. A record that lists only what was chosen leaves them to rediscover the reasoning by breaking something, which is the expensive way to learn it.",
        ],
      },
      {
        heading: "Reversible and irreversible decisions in software",
        body: [
          "Reversible and irreversible decisions in software deserve different amounts of deliberation, and treating them the same is how teams spend three weeks choosing a logging library and an afternoon choosing a data model.",
          "The useful question is not whether the code can be deleted. It is what remains after the code is deleted: rows written in a shape you no longer want, an interface third parties now depend on, a queue with a year of retained messages, or an operational skill the team was hired for.",
        ],
      },
      {
        heading: "Choosing between two technical designs by elimination",
        body: [
          "Choosing between two technical designs by comparison invites a tie. Both options do the job, both have merits, and the discussion converges on taste. Elimination breaks the tie because it needs only one constraint and one failure.",
          "This is why the prompt refuses an option that fails nothing. Either the analysis is shallow, or the option genuinely dominates and that fact deserves to be stated outright rather than buried in a table of comparable virtues.",
        ],
      },
      {
        heading: "What the architecture decision prompt does instead of a rating table",
        body: [
          "Rating tables with high, medium and low are the most common output shape and the least useful. Nobody can say what medium scalability means, the ratings are assigned to justify a conclusion already reached, and the table survives into the wiki as though it were evidence.",
          "So the architecture decision prompt bans the vocabulary. Where a rating would have gone, it has to name the number that would settle the question and say where that number could be found, which converts a vague comparison into a short list of things somebody can go and measure.",
        ],
      },
      {
        heading: "How to document a technical trade off without hedging",
        body: [
          "How to document a technical trade off comes down to writing the cost as plainly as the benefit. Splitting a service buys independent deploys and costs you a distributed transaction you did not previously have. Both halves belong in the same sentence.",
          "The consequences section also asks what the decision forecloses. That is the part reviewers find most uncomfortable and the part most often quoted back later, because a foreclosed option is exactly what somebody will propose in the next planning cycle.",
        ],
      },
      {
        heading: "The falsification line nobody wants to write",
        body: [
          "Every record ends with an observation that would prove it wrong inside ninety days, plus the cheapest way to get that observation now. A design that cannot be wrong is not a decision, it is a preference with a document attached.",
          "In practice the cheap experiment is usually available and simply was not asked for: a query against last November's traffic, a load test on a laptop, or ten minutes with a team who already tried it and can say what broke.",
        ],
      },
    ],

    table: {
      caption: "What is still there after you delete the code",
      headers: ["Decision", "Reversibility", "What is actually locked in"],
      rows: [
        ["Adding a cache in front of a query", "Reversible", "Nothing beyond the cache invalidation bugs you fixed on the way"],
        ["Changing a stored data shape", "One way", "Every row already written, plus the backfill to undo it"],
        ["Publishing a public API version", "One way", "Third party clients you cannot deploy or contact"],
        ["Introducing a message broker", "One way in practice", "Retained messages, on call knowledge, and hiring done against it"],
        ["Choosing a test framework", "Reversible", "The migration cost of the tests already written in it"],
      ],
    },

    howTo: {
      name: "How to use the architecture decision prompt",
      steps: [
        {
          name: "Number the constraints and make each one testable",
          text: "Stock must never oversell and checkout p99 under 800ms can fail a design. Should be scalable cannot, and an unfailable constraint eliminates nothing.",
        },
        {
          name: "Include the option you have already dismissed",
          text: "Especially doing nothing. It is the baseline every other option is measured against, and leaving it out is how teams justify work that the current system was handling.",
        },
        {
          name: "Run the cheap experiment before circulating the record",
          text: "The falsification section names it. Doing it first turns one assumption into a given, and a record with fewer assumptions is much harder to argue with.",
        },
      ],
    },

    faq: [
      {
        question: "Is this only for large decisions?",
        answer:
          "It pays for itself on anything with a stored data shape or a published interface, however small it looks. Purely internal choices that can be deleted in an afternoon rarely justify the record, and the reversibility section will tell you which of the two you are holding.",
      },
      {
        question: "What if the decision has already been made politically?",
        answer:
          "The record is still worth writing, and the assumptions section is where that shows up. Documenting what has to be true for the chosen option to work gives you the tripwire, so when one of those assumptions fails there is a written record of what everybody agreed to.",
      },
      {
        question: "Can it be trusted on technologies it has no operational experience of?",
        answer:
          "Treat its factual claims about throughput, failure modes and operational burden as assumptions to verify, because that is exactly where a model reproduces marketing material. The structure of the argument is reliable in a way the performance numbers inside it are not.",
      },
      {
        question: "How long should the finished record be?",
        answer:
          "One page for the decision and consequences, with the option analysis underneath for whoever wants it. If the first page does not fit, the problem statement is probably covering two decisions that should be recorded separately.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-migration-prompt",
        label: "code migration prompt",
        description:
          "For when the record says the current shape has to change and the change is mechanical across a large codebase.",
      },
      {
        href: "/coding-prompts/performance-profiling-prompt",
        label: "performance profiling prompt",
        description:
          "Produces the measured numbers that turn an assumption in the record into a given.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "api documentation prompt",
        description:
          "Relevant the moment the decision publishes an interface, which is the most common one way door on the list.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "The version for a non technical audience, where the reader cares about cost and timing rather than constraints.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/welcome.html",
        label: "AWS prescriptive guidance: architectural decision records",
        description:
          "Vendor guidance on the record format, including why rejected options belong in the document rather than in a meeting.",
      },
      {
        href: "https://www.sec.gov/Archives/edgar/data/1018724/000119312516530910/d168744dex991.htm",
        label: "Amazon 2015 shareholder letter: one way and two way doors",
        description:
          "The primary published source for classifying decisions by cost of reversal rather than by apparent size.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc7282.html",
        label: "RFC 7282: on consensus and humming in the IETF",
        description:
          "A standards body's own account of why unresolved objections must be recorded rather than averaged away.",
      },
      {
        href: "https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record",
        label: "Microsoft Azure Well Architected: decision records",
        description:
          "Documentation on capturing assumptions and consequences, which is the section teams most often drop.",
      },
    ],
  },
};

export default meta;
