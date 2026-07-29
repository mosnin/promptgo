import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "sales-proposal-prompt",
  name: "Proposal Builder",
  title: "Sales Proposal Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Writes a proposal that opens with the client's problem in their own words and refuses to include anything they never said.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["proposals", "closing", "consulting", "pricing"],

  seo: {
    primaryKeyword: "sales proposal prompt",
    keywords: [
      "sales proposal prompt",
      "how to write a proposal that closes",
      "ai prompt for a consulting proposal",
      "proposal that restates the client problem",
      "presenting pricing options in a proposal",
      "sending a proposal without a meeting",
    ],
    seoTitle: "Sales Proposal Prompt: Open With Their Problem",
    seoDescription:
      "A sales proposal prompt that opens with the client's problem in their own language and blocks any scope or claim they never actually mentioned.",
  },

  prompt: {
    text: `You are writing a proposal for a client who will skim page one and forward it to someone who was not on the call. Your proposal has to survive that.

WHAT THEY SAID THEIR PROBLEM IS, IN THEIR WORDS: {{PROBLEM}}
WHAT I PROPOSE TO DO: {{SCOPE}}
WHAT THEY TOLD ME ABOUT BUDGET OR CONSTRAINTS: {{CONSTRAINTS}}
WHO ELSE HAS TO APPROVE THIS: {{APPROVERS}}

HARD RULE: you may not introduce a problem, goal, metric or requirement the client did not state. If the proposal needs one, write [NOT DISCUSSED: what] inline. A proposal containing invented context tells the reader you were not listening.

Write these six parts.

1. THE PROBLEM, RESTATED. Open with their situation in language close to theirs, not yours. Three sentences maximum. If they recognise themselves here, everything after it is read differently.

2. WHAT SUCCESS LOOKS LIKE. The observable outcome, stated so both sides could later agree whether it happened. No adjectives.

3. WHAT WE WILL DO. The work, in phases if there is more than one. Each phase states what they receive at the end of it, not what we will be doing during it.

4. WHAT IS NOT INCLUDED. Three specific exclusions. This is the section that prevents the argument in month two, and it makes the included scope more credible rather than less.

5. PRICING. Present it plainly. If more than one option is genuinely sensible, give at most three, and state what changes between them in terms of outcome rather than effort. Never present an option you would not want them to choose.

6. WHAT HAPPENS NEXT. One action, with what we need from them and when. Not "let us know your thoughts".

Write for the person who was not on the call. Assume no shared context beyond section one. List every [NOT DISCUSSED] marker at the end.`,
    variables: [
      {
        token: "PROBLEM",
        label: "Their problem, in their words",
        example:
          "She said their month end close takes nine days and finance are working weekends to hit the board deadline",
      },
      {
        token: "SCOPE",
        label: "What you propose to do",
        example: "Audit the close process, automate the three slowest reconciliations, train the team",
      },
      {
        token: "CONSTRAINTS",
        label: "Budget or constraints they mentioned",
        example: "Said anything over 30k needs the CFO, and they cannot change accounting software this year",
      },
      {
        token: "APPROVERS",
        label: "Who else approves this",
        example: "The CFO, who has not been on any call and is sceptical of consultants",
      },
    ],
    expectedOutput:
      "Six sections opening with their problem in their own language, observable success criteria, phased work described by deliverable, three explicit exclusions, plain pricing, one next action, and a list of everything you never actually discussed.",
    followUps: [
      "Rewrite section one for the CFO, who has never spoken to me and does not know the background.",
      "My scope is broader than what they described. Tell me which parts of it they never asked for.",
      "Turn the exclusions into a one page scope boundary I can attach to the contract.",
    ],
    pitfalls: [
      "Paraphrasing their problem into your own vocabulary is the most common way section one fails. Use their nouns, even the imprecise ones.",
      "The [NOT DISCUSSED] markers frequently reveal that you are proposing work nobody asked for. Cut that scope rather than filling the marker.",
      "Three pricing options is a maximum, not a target. Two is usually better and one is often best when the scope is genuinely fixed.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The not discussed marker started as a way to catch invented metrics and ended up catching invented scope, which was the bigger problem. On four proposals I tested it against, the markers landed almost entirely in the section describing work the client had never mentioned wanting. Removing that scope shortened the proposals and, on two of them, moved the price under an approval threshold.",
  },

  article: {
    intro: [
      "A sales proposal prompt that starts with your company background has already lost the reader. The client opens the document looking for one thing, which is whether you understood the problem, and a page about your credentials answers a question they did not ask.",
      "That applies whether you are selling software or using this as an ai prompt for a consulting proposal. This one opens with their problem restated in their own language, and refuses to include any goal, metric or requirement they never mentioned. Anything the document needs but nobody discussed gets marked inline, which usually reveals that the scope grew during writing rather than during the conversation.",
    ],

    sections: [
      {
        heading: "Section one decides how everything else is read",
        body: [
          "If a client reads the first three sentences and recognises their own situation, the rest of the proposal is read as advice from someone who was paying attention. If they read a generic description of a category of problem, everything after it is read as a sales document, and the price is evaluated against suspicion rather than against the problem.",
          "This is why the instruction is to use their nouns rather than yours. Translating their nine day close into your terminology about process inefficiency loses exactly the thing that makes the paragraph work. A proposal that restates the client problem accurately is doing more persuasive work than any case study you could attach.",
        ],
      },
      {
        heading: "Writing for the person who was not on the call",
        body: [
          "Almost every proposal above a small threshold gets forwarded to someone who has never spoken to you, frequently the person who controls the budget. That reader has no shared context, no rapport and no reason to fill gaps generously.",
          "So the document has to carry its own context, which is another reason section one matters and another reason invented detail is dangerous. The person on the call might forgive a paraphrase of their problem. The person reading it cold takes the document as the complete record of what you understood.",
        ],
      },
      {
        heading: "Exclusions make the scope credible",
        body: [
          "Naming three things you will not do feels like weakening the offer and does the opposite. A scope with no stated boundary reads as either vague or as something that will generate arguments later, and experienced buyers assume the second.",
          "The exclusions also prevent the specific failure where a project is delivered exactly as agreed and the client is disappointed because they assumed something adjacent was included. That conversation is expensive, damages the relationship and is entirely avoidable with three sentences written before the work starts.",
        ],
        list: [
          "Adjacent work they might reasonably assume is bundled.",
          "Anything dependent on a third party you do not control.",
          "Ongoing support or maintenance after delivery, unless it is priced.",
          "Anything requiring access or data you have not confirmed you will get.",
        ],
      },
      {
        heading: "How the sales proposal prompt handles pricing",
        body: [
          "Options are useful when they represent genuinely different outcomes and harmful when they represent the same outcome at different effort levels. The instruction to describe what changes between options in terms of outcome forces that distinction, and frequently reveals that there is really only one sensible option.",
          "The rule against presenting an option you would not want chosen exists because decoy pricing is transparent to anyone who buys regularly. Presenting pricing options in a proposal works when each option is a real recommendation for a different situation, and reads as manipulation when one exists only to make another look reasonable.",
        ],
      },
      {
        heading: "The next step has to be one thing",
        body: [
          "Ending with an invitation to share thoughts hands the document back with no defined action, and proposals that end that way sit unanswered for weeks while everyone waits for someone else to move.",
          "One action, what you need from them, and when. That is enough, and it also gives you something specific to follow up about later. Anyone learning how to write a proposal that closes tends to over invest in the middle sections and under invest in this one, which is where the deal either progresses or stalls.",
        ],
      },
    ],

    howTo: {
      name: "How to use the sales proposal prompt",
      steps: [
        {
          name: "Copy their words down verbatim",
          text: "From your call notes or the recording. The problem field should read like something they said, not like something you concluded.",
        },
        {
          name: "List every approver you know about",
          text: "The document is written for the least informed of them, and knowing a sceptical finance approver exists changes what section one has to establish.",
        },
        {
          name: "Treat every marker as a scope question",
          text: "A [NOT DISCUSSED] marker usually means you are proposing something nobody asked for. Cut it before you consider filling it in.",
        },
        {
          name: "Send it with the next step in the email",
          text: "Repeat section six in the message body. Proposals get forwarded as attachments and the action should not be trapped inside the file.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a sales proposal be?",
        answer:
          "Short enough that the first page carries the decision. Six sections written tightly usually fits on two pages, and length beyond that is nearly always company background or methodology, which the buyer reads only after they have already decided you understood the problem.",
      },
      {
        question: "Is sending a proposal without a meeting ever a good idea?",
        answer:
          "Occasionally, for small and well defined work where a call would cost more than the deal is worth. For anything larger the problem field will be thin, the markers will multiply, and the document will visibly be guessing, which is worse than asking for twenty minutes.",
      },
      {
        question: "Should I include case studies and credentials?",
        answer:
          "As an appendix if at all. They answer a question that only arises after the buyer believes you understood their situation, so placing them first spends the most valuable page on reassurance nobody has asked for yet.",
      },
      {
        question: "What if the client's stated problem is not their real problem?",
        answer:
          "Restate what they said anyway, then address the deeper issue in the success criteria section where you can frame it as a consequence. Correcting their description in the opening paragraph reads as being told they misunderstood their own business.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Where the problem field comes from. A thin proposal opening is almost always a discovery failure rather than a writing one.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "For the response that follows, particularly when the pricing section triggers a concern that is not about price.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description:
          "Once they engage with the number, this prepares the trade you are willing to make and the one you are not.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "The document your champion needs internally, which your proposal should make easy for them to write.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the grounding technique behind restricting output to stated inputs, which the not discussed marker enforces.",
      },
      {
        href: "https://hbr.org/2015/12/control-the-negotiation-before-it-begins",
        label: "Harvard Business Review: Control the negotiation before it begins",
        description:
          "Covers anchoring and framing effects, which is why the problem restatement precedes any mention of price.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "US Government: Plain language guidelines",
        description:
          "The standard reference for writing documents that survive being forwarded to a reader without shared context.",
      },
    ],
  },
};

export default meta;
