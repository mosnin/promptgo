import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "competitor-analysis-prompt",
  name: "Competitor Reader",
  title: "Competitor Analysis Prompt",
  category: "marketing-prompts",
  taskType: "analyse",
  summary:
    "Reads what a competitor's own copy reveals about their strategy and customer, and separates what you observed from what you inferred.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["competitors", "positioning", "market research", "strategy"],

  seo: {
    primaryKeyword: "competitor analysis prompt",
    keywords: [
      "competitor analysis prompt",
      "how to analyse a competitor from their website",
      "ai prompt for competitive positioning",
      "how to find a gap in the market",
      "reading pricing pages for strategy signals",
      "how to do competitor research for free",
    ],
    seoTitle: "Competitor Analysis Prompt: Read What They Reveal",
    seoDescription:
      "A competitor analysis prompt that reads their own copy for strategy signals, finds the customer they are ignoring, and marks every inference as an inference.",
  },

  prompt: {
    text: `You are a positioning strategist. You are working only from material the competitor published themselves, so your job is careful reading, not speculation dressed as research.

COMPETITOR COPY, PASTED: {{COMPETITOR_COPY}}
WHAT WE SELL: {{OUR_OFFER}}
WHAT WE BELIEVE ABOUT THIS MARKET: {{OUR_VIEW}}

Produce six sections. Tag every single claim [OBSERVED] if it is visible in the pasted copy or [INFERRED] if you reasoned to it. Untagged claims are not acceptable.

1. WHO THEY ARE ACTUALLY FOR. Not who they say they serve, but who the copy is written for. Evidence: vocabulary level, which objections they pre-empt, what they assume the reader already has, the size of company implied by their examples.

2. WHAT THEY ARE BETTING ON. The one thing their positioning depends on being true about the market. Every position is a bet. Name theirs.

3. WHAT THEIR COPY DEFENDS. Pages spend words on their weakest point. Identify what they over explain, what they justify unprompted, and what they conspicuously do not mention. Absence is evidence and should be reported as such.

4. PRICING SIGNALS. If pricing is visible, read it for strategy: what the tiers reveal about who they want, which feature they gate and what that says about cost or value, whether the top tier is real or a decoy. If pricing is hidden, say what hiding it implies and for whom that is normally true.

5. THE GAP. Which customer does their positioning actively exclude, and is that customer worth having. Be specific about the type of buyer, not a market segment name. If their positioning has no meaningful gap, say so rather than manufacturing one.

6. WHAT I SHOULD VERIFY. The three inferences that would most change my strategy if wrong, and the cheapest way to check each.

Never speculate about their revenue, headcount, funding or internal decisions. If I ask, say that it is not visible from the material given.`,
    variables: [
      {
        token: "COMPETITOR_COPY",
        label: "Their copy, pasted verbatim",
        example:
          "Their homepage, pricing page and the first two paragraphs of three product pages, pasted in full",
      },
      {
        token: "OUR_OFFER",
        label: "What you sell",
        example: "Bookkeeping software for sole traders who file their own tax return",
      },
      {
        token: "OUR_VIEW",
        label: "What you believe about this market",
        example:
          "We think most tools are built for accountants and then sold to their clients, which is why they feel wrong to a sole trader",
      },
    ],
    expectedOutput:
      "Six sections where every claim is tagged as observed or inferred, including who the copy is really written for, the bet their positioning depends on, what their wording defends, pricing read as strategy, a named excluded customer, and three inferences worth verifying.",
    followUps: [
      "Take the gap you identified and write the positioning statement we would need to own it, in one sentence.",
      "Compare this competitor against the second one I paste below, and tell me which of them we are actually competing with for the same buyer.",
      "Their bet in section two looks correct to me. Rewrite section five assuming we cannot win by opposing it.",
    ],
    pitfalls: [
      "Paste the copy rather than the URL. Working from a name alone produces confident description of a company the model has partly imagined.",
      "The inferred tags cluster in section one, which is expected. Treat any inference there as a hypothesis about their customer rather than a finding.",
      "If it reports no meaningful gap, believe it. Manufacturing a gap is how companies end up positioned against a customer nobody wants.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Given only a company name, a model describes that competitor fluently and partly from memory, mixing current positioning with product lines that no longer exist. Requiring pasted copy and a tag on every claim closes both gaps at once. The section on what the copy defends stays useful because over explanation shows up in word counts and points at real weaknesses.",
  },

  article: {
    intro: [
      "A competitor analysis prompt given a company name will describe that company confidently and partly incorrectly, mixing whatever it absorbed during training with plausible invention. The output reads like research and cannot be relied on for anything.",
      "This one works only from copy you paste, and tags every claim as either observed in that copy or inferred from it. The distinction sounds pedantic until you notice how much of a normal competitive analysis is inference presented as fact, and how many strategies get built on the inferred half.",
    ],

    sections: [
      {
        heading: "Their copy is evidence, their name is not",
        body: [
          "Published marketing copy is a genuinely rich source, because it was written to persuade a specific person and its choices reveal who that person is. Vocabulary level, which objections get pre-empted, what the examples assume about company size: all of it is observable and none of it requires a subscription to anything.",
          "A company name, by contrast, retrieves a mixture of stale training data and confident generalisation. Anyone asking how to do competitor research for free already has the answer, and it starts with copy and paste rather than with a question.",
        ],
      },
      {
        heading: "Reading what a page defends",
        body: [
          "Section three is the one that surprises people. Copy spends words in proportion to anxiety, so the paragraph explaining why their onboarding is not as slow as you might think is telling you their onboarding is slow, or at least that enough prospects said so to warrant a rebuttal.",
          "Absence works the same way and is easier to miss. A pricing page with no mention of migration, a product page that never says who it is not for, a homepage silent on integrations: each omission is a choice. Learning how to analyse a competitor from their website is largely learning to read the gaps between paragraphs as deliberately as the paragraphs.",
        ],
      },
      {
        heading: "Pricing as a strategy document",
        body: [
          "Tier structures encode decisions that never appear in prose. Which feature sits behind the first paywall tells you what they believe people will pay to unlock. A top tier priced far above the others is often a decoy making the middle tier look reasonable, and knowing that changes how you price against them.",
          "Hidden pricing is also information. It usually implies a sales led motion, variable deal sizes and a buyer who expects a negotiation, which tells you the customer they are built for is not the one who wants to sign up on a Tuesday afternoon. Reading pricing pages for strategy signals gets you further than most published competitive reports.",
        ],
        list: [
          "The first gated feature: what they think has the clearest value.",
          "The jump between tiers: whether they want expansion revenue or a clean segmentation.",
          "A named enterprise tier with no price: they expect procurement, not a card.",
          "A free tier with a hard usage limit: acquisition strategy, and the limit tells you their cost driver.",
        ],
      },
      {
        heading: "The gap, and the discipline not to invent one",
        body: [
          "Every position excludes somebody, and the excluded customer is where an opportunity might sit. The prompt asks for that person specifically, described as a type of buyer rather than as a segment label, because segment labels are where positioning goes to become vague.",
          "It is also instructed to report honestly when no meaningful gap exists. Knowing how to find a gap in the market is valuable when the gap is real and actively harmful when it is manufactured, because a position built around a customer nobody wants is expensive and slow to discover.",
        ],
      },
      {
        heading: "Why the competitor analysis prompt tags every claim",
        body: [
          "The tagging is what makes the output safe to circulate. A competitive analysis gets forwarded, quoted in a strategy deck and eventually treated as established fact, and by then nobody remembers which parts were read off a page and which were reasoned.",
          "Tagging fixes the provenance in the document itself. It also concentrates the inferences where you can see them, which is usually section one, and section six then turns the three riskiest into a short verification list. As an ai prompt for competitive positioning it produces less certainty than most and considerably more that survives being checked.",
        ],
      },
    ],

    howTo: {
      name: "How to use the competitor analysis prompt",
      steps: [
        {
          name: "Paste real copy, generously",
          text: "Homepage, pricing page and two or three product pages in full. More material makes the observed tags outnumber the inferred ones, which is the goal.",
        },
        {
          name: "State your own view of the market",
          text: "Section two identifies their bet, which is most useful when it can be compared against yours. Withholding your view gets you a neutral summary instead of a contrast.",
        },
        {
          name: "Read the inferred claims sceptically",
          text: "These are hypotheses about a company you cannot see inside. Useful for deciding what to test, not for deciding what to build.",
        },
        {
          name: "Verify the three flagged inferences",
          text: "Section six names the cheapest check for each. A trial signup or a single customer conversation usually settles the one that matters most.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the competitor analysis prompt refuse to estimate revenue or headcount?",
        answer:
          "Because none of it is visible in published copy and every figure would be fabricated. Those numbers are also the ones most likely to end up quoted in a board deck, where an invented estimate becomes a planning input nobody can trace back to its absence of a source.",
      },
      {
        question: "How many competitors should I analyse?",
        answer:
          "Two or three properly rather than eight superficially. The comparison follow up is where most of the insight appears, because it shows which competitors are actually chasing your buyer and which merely look similar from the outside.",
      },
      {
        question: "Is analysing a competitor's public copy this way legitimate?",
        answer:
          "Yes. It is published marketing material, deliberately made public to persuade. This is ordinary competitive reading, distinct from anything involving private data, scraped customer information or misrepresenting yourself to obtain access.",
      },
      {
        question: "What if their positioning looks better than ours?",
        answer:
          "That is a useful finding rather than a discouraging one, and section two is where it becomes actionable. A strong position still rests on a bet about the market, and the question worth asking is whether you agree with the bet rather than whether the copy is good.",
      },
      {
        question: "How often is this worth rerunning?",
        answer:
          "When their site changes materially, which for most companies is once or twice a year. Rerunning against unchanged copy produces the same reading, and the useful signal is the difference between two analyses rather than either one alone.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "The excluded customer from section five is the natural input here, turning a gap into a described buyer.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "Once you know their bet and their gap, this is where your own position gets written against both.",
      },
      {
        href: "/marketing-prompts/seo-keyword-research-prompt",
        label: "seo keyword research prompt",
        description:
          "Checks whether the cluster a competitor dominates is worth contesting before you commit content to it.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For turning a positioning finding into an actual decision, with the inferred claims stated as assumptions.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/1996/11/what-is-strategy",
        label: "Harvard Business Review: What is strategy",
        description:
          "The foundational argument that a position is defined by what it deliberately excludes, which section five is built on.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents grounding output in supplied material and self tagging, the two techniques that keep the analysis to the pasted copy.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/competition",
        label: "FTC: Competition guidance for businesses",
        description:
          "Sets out where ordinary competitive research ends and unlawful information gathering or coordination begins.",
      },
    ],
  },
};

export default meta;
