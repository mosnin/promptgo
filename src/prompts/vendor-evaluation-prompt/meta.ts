import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "vendor-evaluation-prompt",
  name: "Scorecard Referee",
  title: "Vendor Evaluation Prompt",
  category: "business-prompts",
  taskType: "evaluate",
  summary:
    "Freezes your weighted criteria before the first demo, scores only what you watched happen, prices the cost of leaving, and logs every score you quietly moved.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["procurement", "vendors", "evaluation", "governance"],

  seo: {
    primaryKeyword: "vendor evaluation prompt",
    keywords: [
      "vendor evaluation prompt",
      "how to compare software vendors objectively",
      "weighting requirements before seeing demos",
      "ai prompt for a vendor scorecard",
      "exit cost and switching cost",
      "reference call questions for a vendor",
    ],
    seoTitle: "Vendor Evaluation Prompt: Weight Before You Look",
    seoDescription:
      "A vendor evaluation prompt that locks your weights before the first demo, scores only what you observed, and prices the cost of leaving in year two.",
  },

  prompt: {
    text: `You referee a software selection. You run in two modes and you must be told which one you are in. In mode ONE nobody has seen a vendor yet. In mode TWO the weights are already fixed and may not be changed without being logged.

MODE: {{MODE}}
THE PROBLEM WE ARE BUYING A SOLUTION TO: {{PROBLEM}}
WHO WILL USE IT DAILY AND WHO ADMINISTERS IT: {{USERS}}
CONSTRAINTS THAT ARE NOT NEGOTIABLE: {{CONSTRAINTS}}
WHAT I HAVE OBSERVED SO FAR, PER VENDOR, AND HOW I OBSERVED IT: {{EVIDENCE}}
BUDGET AND CONTRACT PERIOD: {{COMMERCIALS}}

IN MODE ONE, produce the frozen scorecard and nothing else.
a. Must haves, expressed as binary tests a person could run in a trial account. No must have may be a preference. If a criterion cannot fail a vendor outright, it is not a must have and belongs below.
b. Weighted criteria, at most eight, weights summing to 100, each with the observation that would earn a high score and the observation that would earn a low one. Write the weights before any vendor is named.
c. Two criteria most teams forget: the effort to get our existing data in, and the effort to get it out again.
d. A one line statement that these weights are frozen as of today, to be pasted at the top of the sheet.

IN MODE TWO, score.
a. Score each vendor per criterion using only my observed evidence. Beside every score put the source: watched in demo, tried in sandbox, told by sales, read in documentation, or reference call. Any score sourced from told by sales is capped at the midpoint and marked UNVERIFIED.
b. List what you could not score at all, and the specific test that would resolve each gap.
c. Price the exit. For each vendor, estimate what leaving in year two would cost in data extraction effort, contract termination terms, retraining and rebuilt integrations, using my evidence only.
d. Write six reference call questions that make failure easy to disclose, such as what did you end up building yourself, and what took longer than they said. No question may be answerable with yes.
e. Produce the change log: any weight or must have that differs from the frozen version, with who changed it and the reason.

Do not recommend a winner unless one vendor leads on the weighted total and passes every must have. If the leader wins by less than five points, say the comparison is inconclusive and name the single test that would separate them.`,
    variables: [
      {
        token: "MODE",
        label: "Which mode you are running",
        example: "MODE TWO, weights were frozen on 14 July and three vendors have now demoed",
      },
      {
        token: "PROBLEM",
        label: "The problem you are buying a solution to",
        example:
          "Support tickets arrive across email, chat and a form, nothing is deduplicated, and we cannot report on response time by channel",
      },
      {
        token: "USERS",
        label: "Who uses it daily and who administers it",
        example: "Nine support agents daily, two team leads for reporting, one operations person part time as admin",
      },
      {
        token: "CONSTRAINTS",
        label: "Constraints that are not negotiable",
        example: "Data must stay in the EU, must integrate with our existing identity provider, under 30k a year",
      },
      {
        token: "EVIDENCE",
        label: "What you observed per vendor, and how",
        example:
          "Vendor A: watched deduplication work in a demo on their data, sales said EU hosting is available next quarter. Vendor B: built a working inbox in their sandbox in an afternoon, no reporting by channel. Vendor C: documentation confirms EU region, never got a sandbox.",
      },
      {
        token: "COMMERCIALS",
        label: "Budget and contract period",
        example: "Up to 30k a year, they all want three year terms, we would prefer one year with an option",
      },
    ],
    expectedOutput:
      "In mode one a frozen scorecard with binary must haves and at most eight weighted criteria summing to 100. In mode two a scored comparison where every cell shows its evidence source, unverified claims are capped, unscorable gaps are named with the test that closes them, an exit cost estimate per vendor, six disclosure friendly reference questions, and a change log.",
    followUps: [
      "Vendor C has no sandbox and three UNVERIFIED scores. Write the email asking for trial access that makes refusing it awkward.",
      "The leader wins by three points. Design the one week test that would separate the top two, with what we would measure.",
      "Turn the exit cost section into two questions I put to each vendor in writing before signing.",
    ],
    pitfalls: [
      "Running mode one after the first demo defeats the mechanism entirely. Weights written once you have seen a product describe that product, and everybody involved will believe they were objective.",
      "Told by sales gets upgraded to watched in demo during scoring because a slide was on screen. A slide is a claim with a rectangle around it.",
      "The change log is the section teams remove before circulating. It is the only evidence that the comparison was not reverse engineered from a preference somebody already had.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Scoring without an evidence source column produces numbers that feel researched when most cells rest on what a salesperson said, which is also why two evaluators can disagree so hard about the same product. Naming the source per cell turns a scoring argument into a testing plan. Exit cost is the other routine omission, and it tends to change the contract length rather than the choice.",
  },

  article: {
    intro: [
      "A vendor evaluation prompt is only honest if it runs before you have seen anything. Once a demo has happened, the criteria a team writes describe the product that impressed them, the weights follow the criteria, and the resulting scorecard is a justification wearing the costume of an assessment.",
      "So this one has two modes. In the first, nobody has been named and you produce a frozen scorecard: binary must haves, at most eight weighted criteria adding to 100, and a dated freeze line. In the second, you score against those weights and every score has to declare where it came from.",
      "The parts most selections omit are at the end. What it costs to leave, what you could not test at all, and a log of every weight that moved after the demos started.",
    ],

    sections: [
      {
        heading: "Lock the weights before the first demo",
        body: [
          "Weighting requirements before seeing demos is the entire mechanism, and it is the step people skip because it feels premature. It is not premature. You know what problem you are solving and who has to use it daily, and those two facts are enough to set weights.",
          "The vendor evaluation prompt freezes them with a date, which does something a spreadsheet alone cannot. It converts a later adjustment from an invisible edit into an event that has to be explained, which is usually enough to stop it happening.",
        ],
      },
      {
        heading: "Must haves are binary or they are not must haves",
        body: [
          "A must have has to be a test a person can run and fail. Data stays in the EU is a must have. Good user experience is not, and putting it in that column means the column no longer eliminates anybody.",
          "The discipline here is deletion. Most requirement lists arrive with fourteen must haves, of which three would genuinely stop a purchase. The rest belong in the weighted section, where being merely good at something is allowed to count.",
        ],
      },
      {
        heading: "Score what you watched, not what you were told",
        body: [
          "Every score carries its source: watched in demo, tried in sandbox, told by sales, read in documentation, or heard on a reference call. Anything sourced from a sales conversation is capped at the midpoint and flagged unverified.",
          "This one column does most of the work in how to compare software vendors objectively, because it makes the shape of your ignorance visible. A vendor leading on a column of unverified scores is not leading, they are selling well, and those are different things.",
        ],
      },
      {
        heading: "Say what you could not test",
        body: [
          "The gap list is the section nobody writes. It names each criterion you were unable to score for a given vendor and the specific test that would resolve it, such as a sandbox account, a sample data import or a named customer to speak to.",
          "Gaps concentrate. When one vendor accounts for most of the unscorable cells, that is itself a finding about how they sell and how they will behave once you are a customer with a support ticket.",
        ],
      },
      {
        heading: "Exit cost and switching cost belong in the scorecard",
        body: [
          "The question is not what this costs. It is what it costs to leave in year two, once your data is inside it, your integrations point at it, and nine people have learned it. Exit cost and switching cost are the numbers that make a three year term feel different from a one year term.",
          "Four components carry most of it: extracting your data in a usable shape, the termination terms in the contract, retraining, and rebuilding integrations. An ai prompt for a vendor scorecard that omits these produces a comparison of licence fees, which is the smallest part of the total.",
          "This section also changes what you negotiate. A large exit cost is an argument for a shorter initial term and a written data export commitment, rather than an argument against the vendor.",
        ],
      },
      {
        heading: "Reference calls designed to surface failure",
        body: [
          "A reference supplied by a vendor is a happy customer, so asking whether they are happy wastes the call. Reference call questions for a vendor work when they make disclosure easy and specific: what did you end up building yourselves, what took longer than the sales team said, what would you check if you were doing this again.",
          "No question may be answerable with yes. That single constraint removes most of the questions people actually ask on these calls, and what is left produces information you cannot get anywhere else.",
        ],
      },
      {
        heading: "The change log that catches a rigged comparison",
        body: [
          "Weights move. Sometimes for good reasons, because a demo revealed a genuine consideration nobody had thought of. The requirement is only that the movement is recorded with who changed it and why.",
          "In practice the log is read once, at the decision meeting, and it either shows two small documented adjustments or it shows the reporting weight halving in the week after the vendor with weak reporting demoed. Both outcomes are worth knowing before signing a three year contract.",
        ],
      },
      {
        heading: "What the vendor evaluation prompt does with a close result",
        body: [
          "No recommendation is produced unless one vendor leads on weighted total and passes every must have. Where the margin is under five points, the output says the comparison is inconclusive and names the single test that would separate the leaders.",
          "That refusal is the most useful behaviour in the whole thing. A five point gap between two vendors scored partly on unverified claims is noise, and treating it as a decision means the team spends the next two years explaining a choice that was effectively arbitrary.",
          "The incumbent, or continuing without a tool at all, should be scored on the same sheet. It usually loses, but scoring it stops the comparison from starting at the assumption that something must be bought.",
        ],
      },
    ],

    howTo: {
      name: "How to use the vendor evaluation prompt",
      steps: [
        {
          name: "Run mode one before you book any demos",
          text: "Weights written after a demo describe the demo. If you have already seen one, say so in the input and expect the change log to be more interesting.",
        },
        {
          name: "Cut your must haves to the ones that eliminate",
          text: "Read each aloud and ask whether you would genuinely walk away over it. If the answer is no, move it to the weighted section.",
        },
        {
          name: "Get a sandbox for every serious candidate",
          text: "An afternoon in a trial account produces better evidence than three demos, and refusal to provide one is itself a data point worth scoring.",
        },
        {
          name: "Record the source as you score, not afterwards",
          text: "Reconstructing where a score came from a week later is how a sales claim becomes an observation nobody questions.",
        },
        {
          name: "Ask for the exit terms in writing before shortlisting",
          text: "Data export format, notice period and termination fees. Vendors answer these quite differently before and after they know they have won.",
        },
        {
          name: "Read the change log out loud at the decision meeting",
          text: "Thirty seconds, and it is the only moment in the process where an unconscious preference has to be defended in front of everyone.",
        },
      ],
    },

    faq: [
      {
        question: "What if the requirements genuinely change during the process?",
        answer:
          "Change them and log it. The mechanism is not that weights are permanent, it is that a change is visible and attributable. A logged adjustment explained by something a demo revealed is legitimate, and it looks entirely different from an unlogged one.",
      },
      {
        question: "How many vendors should be in a comparison?",
        answer:
          "Three is usually right, and more than four means nobody gets tested properly. Depth of evidence matters more than breadth of options here, because a shallow comparison of six vendors is really a comparison of six sales teams.",
      },
      {
        question: "Should the daily users score, or the buyer?",
        answer:
          "The people who will use it daily should score the usability criteria from a sandbox, and whoever owns the budget should score commercial and exit criteria. Mixing both into one opinion per vendor loses the disagreement, which is normally the most informative part of the exercise.",
      },
      {
        question: "Is a weighted scorecard not just false precision?",
        answer:
          "It would be if the numbers were the decision, and the vendor evaluation prompt is explicit that they are not. The score is a way of finding out where you disagree and how much of your view rests on things nobody verified, and the evidence source column is what keeps the arithmetic honest.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description:
          "The funding side of the same purchase, where the exit cost estimate belongs in the cost model rather than in a footnote.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "How the scorecard becomes a recommendation somebody can answer yes or no to without reading the spreadsheet.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description:
          "Every unscorable gap you sign anyway is a register entry, and it needs an owner and a trigger before the contract starts.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "The view from the other chair, useful for recognising which parts of a demo were built to answer your stated problem.",
      },
    ],

    externalLinks: [
      {
        href: "https://csrc.nist.gov/pubs/sp/800/161/r1/final",
        label: "NIST SP 800-161: supply chain risk management practices",
        description:
          "Primary standard covering vendor dependency and exit planning, which is what the switching cost section operationalises.",
      },
      {
        href: "https://www.ncsc.gov.uk/collection/supply-chain-security",
        label: "NCSC: supply chain security collection",
        description:
          "National guidance on assessing supplier claims with evidence rather than assurance statements, matching the source column rule.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: prompting strategies for Gemini",
        description:
          "Documents the two mode instruction pattern that stops the model scoring and defining criteria in the same pass.",
      },
    ],
  },
};

export default meta;
