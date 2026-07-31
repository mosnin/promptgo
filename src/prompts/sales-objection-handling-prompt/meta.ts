import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "sales-objection-handling-prompt",
  name: "Verbatim Objection Responder",
  title: "Sales Objection Handling Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Writes a response to the exact sentence a prospect said, not a category label, and refuses to invent a statistic, result or guarantee to win the point.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["objections", "sales calls", "honesty", "closing"],

  seo: {
    primaryKeyword: "sales objection handling prompt",
    keywords: [
      "sales objection handling prompt",
      "how to respond to a specific sales objection",
      "ai prompt for handling sales objections",
      "how to handle sales objections without fabricating claims",
      "what to say when a prospect gives a specific objection",
      "chatgpt prompt for objection handling in sales calls",
    ],
    seoTitle: "Sales Objection Handling Prompt: Answer What They Said",
    seoDescription:
      "A sales objection handling prompt that responds to the prospect's exact words, not a category, and will not invent a stat, result or guarantee to win.",
  },

  prompt: {
    text: `You are a sales response writer whose only source of truth is the material given below. You never respond to a category of objection. You respond to the exact sentence a real prospect said.

THE OBJECTION, WORD FOR WORD: {{OBJECTION_TEXT}}
WHAT WE ARE SELLING: {{PRODUCT_CONTEXT}}
FACTS I CAN ACTUALLY STAND BEHIND: {{KNOWN_FACTS}}
WHERE THIS DEAL STANDS: {{RELATIONSHIP_STAGE}}
TONE: {{TONE}}

Before writing anything, find the specific claim, comparison or number inside the objection text. If the prospect named a competitor, a price, a feature or a specific reason, the response must engage with that named detail directly. Do not fall back on a generic answer to a category such as price objection or trust objection when the words given contain something more specific than that category. A response that would fit any objection of that type is a failed response, whatever the wording.

Write the reply itself, 80 to 120 words, in the tone given and appropriate to the relationship stage given. Use only the material listed under KNOWN_FACTS and PRODUCT_CONTEXT. Never invent a statistic, a customer result, a percentage, a named client, or a guarantee that is not present in what was given. If the facts provided are not enough to answer the specific point raised, say plainly what question to ask the prospect instead of manufacturing a plausible sounding claim to cover the gap.

Finish with one sentence naming which part of the objection text the reply is actually answering, so the specific detail addressed can be checked against what they actually said.`,
    variables: [
      {
        token: "OBJECTION_TEXT",
        label: "What the prospect actually said, word for word",
        example:
          "Your product seems expensive compared to Acme, and they throw in onboarding for free",
      },
      {
        token: "PRODUCT_CONTEXT",
        label: "What is being sold, briefly",
        example: "A project management tool for agencies, 49 dollars per seat per month, includes client reporting",
      },
      {
        token: "KNOWN_FACTS",
        label: "Real, verifiable things you can actually say",
        example:
          "Onboarding is a paid add on at 500 dollars flat, includes a setup call within 48 hours. Three agency case studies are published by name on our site. No published stats on retention exist yet.",
      },
      {
        token: "RELATIONSHIP_STAGE",
        label: "Where this deal stands",
        example: "Second call, they have seen a demo and are comparing us against one named competitor",
      },
      {
        token: "TONE",
        label: "How the reply should sound",
        example: "Direct and warm, not defensive, no exclamation marks",
      },
    ],
    expectedOutput:
      "An 80 to 120 word reply that names the specific comparison, number or claim in the objection and answers it using only the supplied facts, followed by one sentence naming what part of the objection was actually addressed. No invented statistic, result or guarantee anywhere in the output.",
    followUps: [
      "The prospect replied to that with this sentence. Which part of it is new information, and does the KNOWN_FACTS list still cover it?",
      "Rewrite the reply assuming RELATIONSHIP_STAGE is now the final decision call rather than the second call, and the tone needs to be shorter.",
      "List every claim in the reply and mark which line of KNOWN_FACTS or PRODUCT_CONTEXT supports it, so it can be checked before sending.",
    ],
    pitfalls: [
      "Typing a summary like price objection instead of pasting the sentence removes the one detail the prompt needs to avoid a templated answer.",
      "Leaving KNOWN_FACTS thin does not make the reply safer, it makes fabrication more likely, since the model still has to fill 80 words from somewhere.",
      "A named competitor in the objection has to be named back in the reply where the facts allow it. A reply that avoids the competitor's name entirely has usually dodged the actual point.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a specific objection, a model will often answer the nearest category instead, producing a fluent reply that ignores the named competitor or number actually in the sentence. Under pressure to sound persuasive it will also reach for a plausible statistic or guarantee nobody supplied. Requiring the exact wording as input and restricting every claim to a supplied facts list prevents both failure modes at once, rather than catching them after the reply is written.",
  },

  article: {
    intro: [
      "A sales objection handling prompt is only as good as the sentence it is given. Feed it a category, price objection, trust objection, too early, and it will write a reply that fits the category and misses the prospect standing in front of you. Feed it the actual words, including the part where they named a competitor or a specific number, and the reply can answer the thing that was actually said.",
      "This is an ai prompt for handling sales objections that refuses to run on a summary. It requires the objection pasted verbatim, requires a list of facts the salesperson can actually stand behind, and will not let the model invent a statistic, a customer result or a guarantee to close the gap when the real material runs short.",
      "Both rules exist for the same reason. A generic response and a fabricated claim are the model filling in for something it was not given, one filling in the specifics of the objection, the other filling in the specifics of the proof. Neither is worth the risk in a conversation the prospect can check.",
    ],

    sections: [
      {
        heading: "Why a sales objection handling prompt needs the exact words, not the category",
        body: [
          "Two prospects can both raise what looks like a price objection and mean entirely different things by it. One has compared your number against a named competitor and wants that comparison answered. The other has no budget line for the category at all. A category label collapses both into the same rebuttal, and a rebuttal built for the wrong one reads as evasive to the prospect who said something specific.",
          "How to respond to a specific sales objection starts with treating the sentence as data, not as an instance of a known type. The instruction to find the named detail inside the objection text before writing anything forces that. If the prospect wrote your product seems expensive compared to Acme, and they throw in onboarding for free, the reply has to be about Acme's onboarding, not value in general.",
          "What to say when a prospect gives a specific objection is rarely what to say to its category. A model that defaults to the category has thrown away the detail that made this objection different from the last hundred with the same label.",
        ],
      },
      {
        heading: "The rule against inventing a claim to win the point",
        body: [
          "A confident reply is persuasive whether or not the confidence is earned. Left unconstrained, a model asked to overcome an objection reaches for exactly the material that wins fastest: a specific percentage, a named client result, a guarantee stronger than the one actually offered. None of it has to be true to sound convincing.",
          "How to handle sales objections without fabricating claims is a matter of restricting the model to a list it did not write. KNOWN_FACTS is that list, and PRODUCT_CONTEXT is its boundary. Anything outside those two fields is off limits, including a plausible number missing from what was supplied.",
        ],
        list: [
          "An invented statistic with no source behind it, however small the number.",
          "A customer result or named client that was not listed as a known fact.",
          "A guarantee stronger, longer or less conditional than the one actually offered.",
          "A comparison claim about a competitor that was not confirmed as accurate.",
        ],
      },
      {
        heading: "What counts as a real known fact",
        body: [
          "KNOWN_FACTS works best as short, checkable statements: a real price, a feature that exists, a case study published somewhere findable. It should also state what is not known, since that gap is itself useful when the facts do not fully answer the point raised.",
          "A thin KNOWN_FACTS field does not make the output safer. The reply still has to reach 80 to 120 words, and a model with too little real material drifts toward the filler the constraint exists to prevent.",
        ],
      },
      {
        heading: "Matching the reply to where the deal actually stands",
        body: [
          "The same objection means something different on a first call than on the call where a decision is due. Early on, a comparison to a named competitor is usually genuine research and deserves a straightforward answer. Late in a deal, the same sentence is often a stated reason for a decision already made, and the reply needs to acknowledge that rather than restart the pitch.",
          "RELATIONSHIP_STAGE carries that difference into the output. Setting it honestly matters more than wording it well, since a reply tuned for a first call reads as tone deaf when the prospect wants to end the call, and a reply tuned for closing reads as pushy when nothing has been asked yet.",
        ],
      },
      {
        heading: "Reading a chatgpt prompt for objection handling in sales calls against a real example",
        body: [
          "Given your product seems expensive compared to Acme, and they throw in onboarding for free, a category level reply talks about value and hopes the comparison goes away. This sales objection handling prompt has to name Acme's free onboarding specifically, and if KNOWN_FACTS states that onboarding here is a paid add on with a setup call inside 48 hours, the reply can compare the two honestly.",
          "The closing sentence, naming which part of the objection text the reply actually answered, is worth reading first. If it names the onboarding comparison, the reply did its job. If it names something vaguer, the model reached for the category after all.",
        ],
      },
    ],

    howTo: {
      name: "How to use the sales objection handling prompt",
      steps: [
        {
          name: "Paste the objection exactly as they said it",
          text: "Word for word, hedges and all, straight after the call. A summary written from memory has already lost the detail the prompt needs.",
        },
        {
          name: "List only facts you can actually stand behind",
          text: "Real prices, real features, published case studies. Anything you would not restate to the prospect's face does not belong in KNOWN_FACTS.",
        },
        {
          name: "Set the relationship stage and the tone honestly",
          text: "A first call and a final decision call need different replies to the same words. Naming the stage accurately matters more than an impressive sounding tone.",
        },
        {
          name: "Check the closing sentence before sending anything",
          text: "It names what the reply actually answered. If that does not match the detail in the objection, the draft needs another pass.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the prompt refuse to work from a category like price objection?",
        answer:
          "A category throws away the one detail that made the objection specific to that prospect, whether a named competitor, a particular number or a stated reason. A reply built for the category fits any objection of that type and therefore answers none of them precisely, which reads as evasive to someone who said something exact.",
      },
      {
        question: "What happens if KNOWN_FACTS does not fully answer the objection?",
        answer:
          "The prompt is instructed to say plainly what question to ask the prospect instead of inventing a claim to cover the gap. A confident sounding fabrication is more damaging long term than an honest admission that more information is needed before answering fully.",
      },
      {
        question: "Can this write a strong reply without any invented guarantee or statistic?",
        answer:
          "Yes, and that is the constraint it is built around. Restricting every claim to KNOWN_FACTS and PRODUCT_CONTEXT does not weaken the reply, it forces the persuasive weight onto real material, a genuine price, an actual case study, rather than onto a number nobody can verify.",
      },
      {
        question: "How is this different from the objection handling prompt already on this site?",
        answer:
          "The other prompt diagnoses what an objection might mean before any reply is written, useful when the concern underneath is genuinely ambiguous. This one assumes the reply stage has arrived and focuses on answering the specific words honestly, without drifting into a category or inventing proof. Use the diagnostic prompt first when the meaning is unclear, and this one once a reply needs writing.",
      },
      {
        question: "Does this replace objection handling training?",
        answer:
          "No. It produces one honest, specific reply from the material given, not a general skill. A rep still needs to recognise which objections are worth a written reply, and which ones a diagnostic conversation should catch before a reply is drafted.",
      },
      {
        question: "What tone should be set for a first call versus a final decision call?",
        answer:
          "A first call tolerates a fuller, more explanatory tone, since the prospect is still evaluating. A final decision call needs something shorter and more direct, since a long reply then reads as an attempt to reopen a conversation the prospect is trying to close.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "For diagnosing what an ambiguous objection might actually mean before a reply is worth writing at all.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description: "The real facts a reply can draw on usually come from what was established on this call.",
      },
      {
        href: "/sales-prompts/sales-proposal-prompt",
        label: "sales proposal prompt",
        description: "For the document that should already contain the pricing and scope facts this prompt reuses.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description: "For building the honest, checkable claims that belong in KNOWN_FACTS in the first place.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.pon.harvard.edu/daily/business-negotiations/sales-negotiation-techniques/",
        label: "Harvard Program on Negotiation: Sales negotiation techniques",
        description: "A primary source on responding to the specific terms a counterpart raises rather than a generic position.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business",
        label: "Federal Trade Commission: Advertising FAQs for small business",
        description: "The regulatory basis for why a claim or guarantee made to a prospect has to be one the business can actually support.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description: "Documents why a specific, literal instruction produces a more targeted response than a vague or categorical one.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/safety-guidance",
        label: "Google AI: Safety and factuality guidance",
        description: "Covers why constraining a model's output to supplied source material reduces fabricated claims in generated text.",
      },
    ],
  },
};

export default meta;
