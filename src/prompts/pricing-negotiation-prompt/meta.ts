import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "pricing-negotiation-prompt",
  name: "Negotiation Planner",
  title: "Pricing Negotiation Prompt",
  category: "sales-prompts",
  taskType: "plan",
  summary:
    "Prepares the trades you will make before the call, so a discount request meets a prepared exchange rather than an improvised concession.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["negotiation", "pricing", "discounting", "closing"],

  seo: {
    primaryKeyword: "pricing negotiation prompt",
    keywords: [
      "pricing negotiation prompt",
      "how to respond to a discount request",
      "ai prompt for preparing a negotiation",
      "what to trade instead of cutting price",
      "setting a walk away number before the call",
      "discount request that is really a budget problem",
    ],
    seoTitle: "Pricing Negotiation Prompt: Decide Trades In Advance",
    seoDescription:
      "A pricing negotiation prompt that sets your walk away number and your tradeable concessions before the call, so no discount is improvised under pressure.",
  },

  prompt: {
    text: `You are a negotiation coach. You believe almost every bad discount is given by someone who had not decided in advance what they were willing to trade, and improvised under mild social pressure.

THE DEAL: {{DEAL}}
WHAT THEY HAVE ASKED FOR: {{ASK}}
WHAT I KNOW ABOUT THEIR ALTERNATIVES: {{ALTERNATIVES}}
MY ACTUAL COSTS AND MARGINS: {{ECONOMICS}}

Produce five parts.

1. WHAT THE ASK PROBABLY MEANS. A discount request is rarely about the number. Give three readings: the budget genuinely does not exist, the value case is unproven internally, or asking is simply their standard practice. Rank them from the context given and name the question that distinguishes them.

2. MY WALK AWAY NUMBER. Using the economics above, state the price below which this deal is not worth doing, and show the arithmetic. If I have not given you enough to calculate it, say what is missing rather than estimating. This number is decided now, in writing, not during the call.

3. THE TRADE LIST. Everything I can give that costs me less than the discount they asked for, ranked by cost to me. For each, state what I should ask for in return. Nothing on this list may be given away unilaterally. Include at least two non price trades.

4. THE SCRIPT FOR THE MOMENT. What to say in the ten seconds after they ask, before I have decided anything. It must buy time, must not be evasive, and must not concede in principle. Then the sentence that introduces a trade rather than a discount.

5. WHAT I SHOULD NOT SAY. Three specific things reps say under this pressure that cost them the negotiation, phrased as the exact wording to avoid.

Never suggest a discount with nothing asked in return. If the honest answer is that the deal should be walked away from, say so plainly.`,
    variables: [
      {
        token: "DEAL",
        label: "The deal as it stands",
        example: "Annual contract, 24k, twelve month term, they have been evaluating for six weeks",
      },
      {
        token: "ASK",
        label: "What they have asked for",
        example: "A 20 percent discount, said their budget is 20k and it came from procurement not the sponsor",
      },
      {
        token: "ALTERNATIVES",
        label: "What you know about their alternatives",
        example:
          "One competitor is cheaper but does not do the reporting piece their sponsor cares about, and building it internally was ruled out in month two",
      },
      {
        token: "ECONOMICS",
        label: "Your costs and margins",
        example:
          "Gross margin 78 percent, onboarding costs us about 2k in engineer time, annual prepay is worth roughly 6 percent to us",
      },
    ],
    expectedOutput:
      "Three ranked readings of the discount request with a distinguishing question, a calculated walk away number with the arithmetic shown, a ranked trade list where every item has something asked in return, the exact words for the first ten seconds, and three things not to say.",
    followUps: [
      "They rejected the trade and repeated the discount ask. Give me the second position and tell me what it costs.",
      "Procurement is running this, not the sponsor. Rebuild the trade list for someone measured on savings rather than outcomes.",
      "Work out whether accepting their 20k number with a two year term beats walking away, using my economics.",
    ],
    pitfalls: [
      "If you leave the economics field vague it cannot calculate a walk away number, and a negotiation without one is where large concessions happen quietly.",
      "The trade list is only useful if you refuse to give anything on it away for free. One unilateral concession teaches the buyer that asking works.",
      "Models suggest payment terms as a trade more readily than anything else. Check the cash flow effect on your side before treating it as cheap.",
    ],
  },

  eeat: {
    author: "Marcus Bell",
    authorCredential:
      "Fifteen years in B2B outbound, most recently running a six person SDR team selling infrastructure software.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Requiring the walk away number to be calculated with visible arithmetic, rather than described, is what made this useful. Given a soft instruction the models produced reasonable sounding floors that did not survive being checked against the margin figures. The ten second script was added after watching two reps concede in principle within one sentence of a discount request, which no later position could undo.",
  },

  article: {
    intro: [
      "A pricing negotiation prompt written to generate discount responses solves the wrong half of the problem. By the time you are choosing words, the negotiation has already been decided by whether you knew your floor and your trades before the conversation started.",
      "This one is preparation rather than scripting, which is what an ai prompt for preparing a negotiation should be. It calculates a walk away number from your actual economics, builds a ranked list of things you can trade that cost less than the discount requested, and gives you a way to hold the first ten seconds without conceding in principle.",
    ],

    sections: [
      {
        heading: "The ten seconds after the ask",
        body: [
          "Discounts are lost in the moment immediately after the request, before any deliberate decision is made. The buyer asks, silence follows, and the rep says something accommodating to relieve it. Even a phrase like let me see what I can do concedes that the price is negotiable, and everything afterwards is arguing about how much.",
          "Having a prepared sentence removes the improvisation. It buys time, acknowledges the request without agreeing to it, and moves to a question. Learning how to respond to a discount request is largely learning to have that one sentence ready before you need it.",
        ],
      },
      {
        heading: "A discount request is usually about something else",
        body: [
          "The three readings exist because the number is rarely the issue. Sometimes the budget genuinely stops at a figure, which is a real constraint you can work with. Sometimes the value case is unproven internally and the buyer is trying to reduce the risk of championing you. Sometimes asking is simply procurement doing its job and a refusal costs nothing.",
          "These require completely different responses, and treating all three as a price problem means discounting your way through situations that had nothing to do with price. A discount request that is really a budget problem needs a scope change or a payment structure, not a lower rate for the same work.",
        ],
      },
      {
        heading: "Deciding the walk away number in writing",
        body: [
          "The prompt calculates a floor from your margin, your delivery costs and the value of terms, and shows the arithmetic so you can check it. Doing this before the call is what makes the number real, because a floor decided during a negotiation is not a floor, it is a preference.",
          "It also refuses to estimate when the economics input is incomplete, which is deliberate. A fabricated floor is worse than no floor, since it carries false confidence into exactly the situation where confidence matters. Setting a walk away number before the call is the single highest return preparation step available.",
        ],
      },
      {
        heading: "Trading rather than discounting",
        body: [
          "Every trade on the list has to cost you less than the discount requested and has to come with something asked in return. That second rule is what separates a negotiation from a series of concessions, and it is the one people abandon first under pressure.",
          "The requirement for at least two non price trades matters because price is usually the least creative variable available. Working out what to trade instead of cutting price tends to reveal that the buyer wanted certainty, speed or reduced risk, and that several of those are cheap for you to provide.",
        ],
        list: [
          "Term length: a longer commitment for a lower effective rate, which improves your revenue certainty.",
          "Payment timing: annual prepay in exchange for a modest reduction, if your cash position benefits.",
          "Scope: remove something they do not value rather than discounting what they do.",
          "Case study or reference rights: genuinely valuable and often free to them.",
          "Onboarding speed or a named contact: certainty and risk reduction, which is frequently the real ask.",
        ],
      },
      {
        heading: "Using the pricing negotiation prompt when the answer is no",
        body: [
          "Some deals should not be done, and the walk away number exists so that this is a calculation rather than a judgement made while someone is being pleasant to you on a call. When the requested price falls below the floor, the prompt says so plainly rather than constructing a way to make the numbers work.",
          "Walking away also has a longer effect than the individual deal. A buyer who learns that your price moves under pressure will apply that pressure at every renewal, and a market where several buyers have learned it is a durable problem. Holding a floor once is usually cheaper than defending a discounted rate indefinitely.",
        ],
      },
    ],

    howTo: {
      name: "How to use the pricing negotiation prompt",
      steps: [
        {
          name: "Put your real economics in",
          text: "Margin, delivery cost and what terms are worth to you. Without these the walk away number cannot be calculated and the whole exercise softens.",
        },
        {
          name: "Run it before the call, not after the ask",
          text: "The output is preparation. Running it once a discount has been requested means the first ten seconds have already happened.",
        },
        {
          name: "Memorise the holding sentence",
          text: "Just the first one. It is the only part you need available under pressure, and having it removes the reflex to fill silence with accommodation.",
        },
        {
          name: "Never give a trade away free",
          text: "Each item on the list has a paired request. Giving one without asking teaches the buyer that the next request will also work.",
        },
      ],
    },

    faq: [
      {
        question: "Should I ever give a discount with nothing in return?",
        answer:
          "Almost never, and the prompt will not suggest it. A unilateral concession does not just cost margin on this deal, it establishes that your price responds to asking, which affects every renewal and every referral that buyer makes to a peer.",
      },
      {
        question: "What if procurement genuinely cannot go above a number?",
        answer:
          "Then the negotiation is about scope rather than rate. Reduce what is included so the price fits their ceiling honestly, which preserves your effective rate and gives them a defensible outcome. Discounting the full scope teaches them your list price was inflated.",
      },
      {
        question: "How does the pricing negotiation prompt handle multi year deals?",
        answer:
          "Term appears on the trade list, since a longer commitment is genuinely worth something to you and often costs the buyer little. Put the value of that certainty in the economics field, otherwise the ranking treats it as free and offers it too early.",
      },
      {
        question: "Is preparing this much necessary for a small deal?",
        answer:
          "The walk away number and one holding sentence take five minutes and cover most of the value. The full trade list is worth building once per offer rather than once per deal, since the same trades apply across similar contracts.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/sales-proposal-prompt",
        label: "sales proposal prompt",
        description:
          "The document that sets the anchor. A proposal with a clear exclusion list gives you scope to trade rather than only rate.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "For diagnosing whether the discount request is a price concern at all before you prepare any trade.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Negotiating leverage comes from knowing what the problem costs them, which is established here or not at all.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When the real blocker is an unproven internal case, your champion needs a document rather than a lower price.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2004/04/getting-past-yes-negotiating-as-if-implementation-mattered",
        label: "Harvard Business Review: Negotiating as if implementation mattered",
        description:
          "The research on why concessions made to close a deal frequently damage the delivery relationship that follows.",
      },
      {
        href: "https://www.pon.harvard.edu/daily/batna/",
        label: "Harvard Program on Negotiation: BATNA",
        description:
          "The primary source for the walk away concept and why it must be established before a negotiation rather than during it.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the refusal to estimate pattern that keeps the walk away calculation from being fabricated when inputs are missing.",
      },
    ],
  },
};

export default meta;
