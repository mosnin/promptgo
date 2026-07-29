import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "objection-handling-prompt",
  name: "Objection Decoder",
  title: "Objection Handling Prompt",
  category: "sales-prompts",
  taskType: "analyse",
  summary:
    "Works out what a sales objection actually means underneath before suggesting any response, so you ask a question instead of arguing.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["objections", "sales calls", "negotiation", "closing"],

  seo: {
    primaryKeyword: "objection handling prompt",
    keywords: [
      "objection handling prompt",
      "how to respond to sales objections",
      "ai prompt for overcoming price objections",
      "what to say when a prospect says too expensive",
      "sales objection response generator",
      "diagnosing objections instead of rebutting them",
    ],
    seoTitle: "Objection Handling Prompt: Decode What They Mean",
    seoDescription:
      "An objection handling prompt that diagnoses the concern underneath before you reply. Gives you the clarifying question first and the rebuttal second, or not at all.",
  },

  prompt: {
    text: `You are a sales coach who believes almost every objection is a symptom rather than the actual concern. You do not write rebuttals. You diagnose first.

THE OBJECTION, VERBATIM: {{OBJECTION}}
WHERE IN THE PROCESS IT CAME UP: {{STAGE}}
WHAT THEY ALREADY KNOW ABOUT US: {{CONTEXT}}

Respond in exactly four parts:

1. LITERAL READING. Restate what they said at face value, in one sentence, with no interpretation added.

2. THREE THINGS IT MIGHT ACTUALLY MEAN. List three distinct underlying concerns that could produce this exact sentence. Rank them by likelihood given the stage and context. At least one must be a reason that is not about our product at all, for example internal politics, a competing priority, or the person lacking authority they do not want to admit to.

3. THE DIAGNOSTIC QUESTION. One question that distinguishes between those three readings. It must be answerable in a sentence, must not be leading, and must not contain a pitch. If a single question cannot separate them, give the two questions needed and say which to ask first.

4. RESPONSES, ONE PER READING. For each of the three readings, the response IF that reading turns out to be right. Each response must be under 40 words. Where the honest response is to disqualify or walk away, say that plainly instead of inventing a save.

Never suggest that I overcome, push past, or reframe the objection before the diagnostic question has been answered. If the objection is a straightforward no with no ambiguity, say so and stop.`,
    variables: [
      {
        token: "OBJECTION",
        label: "What they said, word for word",
        example: "This looks great but it's more than we were planning to spend this quarter",
      },
      {
        token: "STAGE",
        label: "When it came up",
        example: "End of the second call, right after I gave pricing for the first time",
      },
      {
        token: "CONTEXT",
        label: "What they already know",
        example:
          "They have seen a demo, know we are twice the price of the incumbent, and their team lead is enthusiastic",
      },
    ],
    expectedOutput:
      "A literal restatement, three ranked interpretations with at least one unrelated to your product, one non leading diagnostic question, and three short conditional responses including an honest walk away where that is the right call.",
    followUps: [
      "I asked the diagnostic question and they said this. Which of the three readings does that rule out, and what is the next question?",
      "Rewrite reading two assuming the person I am talking to is not the budget holder and does not want to say so.",
      "Give me the version of the walk away response that keeps the relationship open for two quarters from now.",
    ],
    pitfalls: [
      "Paraphrasing the objection ruins it. Paste the exact words, including the hedges, because the hedges are where the real concern leaks out.",
      "Models default to treating every price objection as a value communication failure. If all three readings are about your product, ask again and insist one is external.",
      "The walk away option gets suggested less often than it should be true. Treat its absence as a prompt to ask yourself whether the deal is real, not as confirmation that it is.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Early drafts asked for likely meanings and got three variations of the customer not understanding the value, which is the flattering answer and rarely the true one. Requiring that one reading be external to the product surfaced the reason that turned out to be correct in most of the deals I tested it against, which was that the person on the call could not approve the spend and was reluctant to say so.",
  },

  article: {
    intro: [
      "An objection handling prompt that jumps straight to a rebuttal will make your deals worse. The moment a prospect raises a concern and you answer it fluently, you have committed to an interpretation of what they meant, and roughly half the time that interpretation is wrong. You then spend the rest of the call solving a problem they do not have.",
      "This one refuses to write a response until it has proposed what the objection might actually mean and given you a question to find out. The output is diagnostic before it is persuasive, which sounds slower and is considerably faster in practice.",
      "The most common example is price. When someone says a product is too expensive they occasionally mean the number is too high. More often they mean they cannot see how to justify it internally, they have no budget line for this category, or they are not the person who decides and do not want to admit it. Those four situations need four different conversations, and only one of them is about price.",
    ],

    sections: [
      {
        heading: "Why rebuttals lose deals that questions would win",
        body: [
          "A rebuttal is a claim that the prospect is wrong. Even delivered warmly, it puts the two of you on opposite sides of a position, and the prospect's next move is to defend the position rather than examine it. Once someone has defended a statement out loud, they are measurably more committed to it than before you replied.",
          "A question does the opposite. It signals that you have not decided what they meant, which is accurate, and it invites them to say the thing they did not say the first time. Learning how to respond to sales objections well is mostly learning to delay the response.",
        ],
      },
      {
        heading: "The three readings rule",
        body: [
          "Asking a model what an objection means produces one confident answer, and a single interpretation is exactly the failure this is meant to prevent. Forcing three readings keeps the ambiguity visible, which is the honest state of affairs at that point in a conversation.",
          "The requirement that one reading be unrelated to the product is the part that earns its place. Sales content overwhelmingly frames objections as communication failures, so a model trained on it will generate three flavours of the same explanation. In testing, the external reading, usually about authority or a competing priority, was correct more often than either product centred alternative.",
        ],
        list: [
          "A budget objection is often an authority objection wearing a disguise.",
          "A timing objection is often a priority objection, and priorities are set by someone not on the call.",
          "A feature objection late in a deal is often a risk objection about switching, not about the feature.",
          "A silence after pricing is usually internal arithmetic, not disapproval.",
        ],
      },
      {
        heading: "What the diagnostic question has to avoid",
        body: [
          "The prompt bans leading questions specifically, because they are the natural thing to write and they destroy the value of asking. If you ask whether the concern is about proving return on investment internally, you have supplied the answer and a polite person will take it.",
          "It also bans questions containing a pitch. A question with a benefit statement attached is a rebuttal with a question mark on the end, and prospects hear the difference immediately. The constraint produces plainer questions than most reps would write unprompted, which is the point.",
        ],
      },
      {
        heading: "Using the objection handling prompt on a price objection",
        body: [
          "Price is worth walking through because it is the case people search for most and the case where the reflex answer is least reliable. Given the sentence about spending more than planned this quarter, the prompt reliably produces three readings: the amount genuinely exceeds an approved figure, the value is clear but the internal case is not, or this person cannot approve it alone.",
          "Any ai prompt for overcoming price objections that opens with a discount has skipped this step. The diagnostic question generated here is usually some version of asking what would need to be true for the spend to be approved, which separates all three readings cleanly. Someone with no budget describes a process. Someone who needs a business case describes a document. Someone without authority describes a person. Anyone wondering what to say when a prospect says too expensive is better served by that question than by any discount.",
        ],
      },
      {
        heading: "When the honest output is to walk away",
        body: [
          "The instruction to name a disqualifying reading exists because a sales objection response generator with no walk away option is a machine for prolonging dead deals. Some objections are a plain no, and treating them as puzzles wastes weeks that belonged to a live opportunity.",
          "The prompt is told to say so plainly when that is the case. It does this less often than it should, which is a real limitation rather than a quirk, so treat a missing walk away as a question to ask yourself rather than as evidence the deal is alive.",
        ],
      },
    ],

    howTo: {
      name: "How to use the objection handling prompt",
      steps: [
        {
          name: "Capture the exact words",
          text: "Write down what they said verbatim, hedges included, as soon as the call ends. A cleaned up paraphrase removes the signals the diagnosis depends on.",
        },
        {
          name: "Add the stage and what they know",
          text: "The same sentence means different things on a first call and after a proposal, so the stage field materially changes the ranking of the three readings.",
        },
        {
          name: "Read the three readings before the responses",
          text: "Decide which you believe before you look at what to say. Reading the responses first anchors you to one interpretation, which is the habit this is meant to break.",
        },
        {
          name: "Ask the diagnostic question and wait",
          text: "Send or ask it with nothing attached. The silence after it is where the real concern arrives, and filling that silence with a benefit statement wastes the whole exercise.",
        },
      ],
    },

    faq: [
      {
        question: "Does the objection handling prompt work in live conversation?",
        answer:
          "Not really, and that is worth being honest about. It takes long enough to run that it belongs between calls or before replying to an email. What it does improve live is your instinct, because after a few dozen diagnoses you start generating the three readings yourself in the pause before answering.",
      },
      {
        question: "Why does it refuse to give me a rebuttal straight away?",
        answer:
          "Because a rebuttal to a misread objection is worse than no answer at all. It commits you publicly to an interpretation, invites the prospect to defend their position, and burns the one chance you had to ask what they meant without it sounding evasive.",
      },
      {
        question: "What if the prospect genuinely just has no money?",
        answer:
          "Then the diagnostic question surfaces that in one exchange and the prompt is instructed to tell you to walk away rather than manufacture a save. That outcome is the tool working. The cost of discovering it in week one instead of week six is the main return on using it at all.",
      },
      {
        question: "Can I use this for objections that are not about sales?",
        answer:
          "Yes. Internal proposals, hiring negotiations and stakeholder pushback all have the same structure, where the stated concern is a socially acceptable version of a real one. Replace the offer context with the proposal and the three readings framework transfers without modification.",
      },
      {
        question: "How is this different from a list of objection scripts?",
        answer:
          "A script matches on the surface wording and returns a prewritten answer, which is precisely the mistake, because the same words carry different meanings depending on who said them and when. This is diagnosing objections instead of rebutting them, so the output depends on the stage and context rather than only the sentence.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Most objections trace back to a problem that was never properly established. This plans the call where that gets fixed.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "Objections about relevance usually start at the first touch, with an opener built on nothing specific.",
      },
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "For sending the diagnostic question in writing when the objection arrives by email rather than on a call.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When the real blocker is an internal business case, this builds the document your champion needs to argue it.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: Chain of thought prompting",
        description:
          "Documents why forcing the reasoning step before the answer improves output, which is the mechanism behind diagnosing before responding.",
      },
      {
        href: "https://hbr.org/2015/12/control-the-negotiation-before-it-begins",
        label: "Harvard Business Review: Control the negotiation before it begins",
        description:
          "Covers the anchoring research behind why a stated position becomes harder to move once its holder has defended it aloud.",
      },
      {
        href: "https://www.apa.org/pubs/journals/releases/psp-pspa0000121.pdf",
        label: "APA: Belief perseverance research",
        description:
          "The published evidence that people strengthen commitment to a claim after defending it, which is the cost a premature rebuttal pays.",
      },
    ],
  },
};

export default meta;
