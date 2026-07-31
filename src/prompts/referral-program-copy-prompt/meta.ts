import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "referral-program-copy-prompt",
  name: "Referral Writer",
  title: "Referral Program Copy Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Writes the one paragraph that states what the referrer gets, what the friend gets, and every condition that decides whether either reward is actually paid.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["referrals", "promo copy", "loyalty", "email"],

  seo: {
    primaryKeyword: "referral program copy prompt",
    keywords: [
      "referral program copy prompt",
      "how to write referral program terms clearly",
      "how to write referral program copy that discloses conditions",
      "ai prompt for referral program copy",
      "referral program email prompt that states the real terms",
      "how to explain give and get rewards honestly",
    ],
    seoTitle: "Referral Program Copy Prompt: State the Real Terms",
    seoDescription:
      "A referral program copy prompt that states what the referrer gets, what the friend gets, and every condition that decides payout, not vague fine print.",
  },

  prompt: {
    text: `You are a lifecycle marketer writing the copy for a referral program. Your only job is to state the actual mechanics plainly: what the referrer gets, what the friend gets, and every condition that affects whether either reward is actually paid out. You have no authority to simplify a stated condition into vaguer marketing language, and you never omit a condition you were given, even if stating it makes the offer look smaller than a headline version would.

PROGRAM NAME: {{PROGRAM_NAME}}
WHAT THE REFERRER GETS: {{REFERRER_REWARD}}
WHAT THE FRIEND GETS: {{FRIEND_REWARD}}
REAL CONDITIONS AND CAPS: {{CONDITIONS}}
WHERE THIS COPY RUNS: {{CHANNEL}}

Write one paragraph, under 90 words, that a reader could act on without needing to open a separate terms page. Open with both rewards stated in plain numbers. Then fold every condition supplied above into that same paragraph, written as ordinary sentences, never as a footnote or an asterisk. If a condition determines whether the reward is paid at all, for example a requirement that the friend's first purchase completes, it must appear before the paragraph ends and never only behind a linked terms page.

Do not invent a condition that was not supplied. Do not soften a stated cap or payout delay into vaguer language. If any of the four inputs above is missing, refuse to write the paragraph and state plainly which one is missing instead.`,
    variables: [
      {
        token: "PROGRAM_NAME",
        label: "The program's name",
        example: "Kindling Coffee Friends Program",
      },
      {
        token: "REFERRER_REWARD",
        label: "What the person doing the referring gets",
        example: "15 dollars of store credit",
      },
      {
        token: "FRIEND_REWARD",
        label: "What the new person gets",
        example: "20 percent off their first order",
      },
      {
        token: "CONDITIONS",
        label: "The real terms and caps, including anything that delays or blocks payout",
        example:
          "Referrer credit is only issued after the friend's first order ships, not at signup. Capped at 10 referrals per calendar year. Credit posts within 14 days and cannot be exchanged for cash.",
      },
      {
        token: "CHANNEL",
        label: "Where this copy will run",
        example: "post purchase confirmation email",
      },
    ],
    expectedOutput:
      "A single paragraph under 90 words that states both rewards in plain numbers and includes every supplied condition in the same paragraph, especially any condition that determines whether the reward is paid out. If an input is missing, a plain refusal naming which one, with no paragraph written.",
    followUps: [
      "Rewrite this as two lines for a referral page hero, then keep this paragraph underneath as the full mechanics.",
      "Here is a sixth condition I forgot, that credit expires after 12 months. Add it without lengthening the sentence about the friend's first order.",
      "Write the version of this for a customer whose last referral was rejected for missing the purchase requirement, without sounding like an apology.",
    ],
    pitfalls: [
      "People supply a round headline number like give 10 get 10 as the reward and leave the real condition out of the input entirely. The prompt cannot disclose a condition it was never given, so the CONDITIONS field has to carry the actual mechanics, not the marketing line.",
      "A cap phrased as unlimited referrals, terms apply is not a condition, it is a placeholder for one. Supply the actual number or the paragraph will correctly read as having no cap, which may not be true.",
      "Teams often want the payout delay left out because it reads as friction. Removing it does not remove the delay, it just moves the moment the customer discovers it from before they refer to after, which costs more trust than the sentence would have.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Referral copy under time pressure tends to lead with the reward and let the condition that actually withholds it slide into a linked terms page nobody opens. Requiring every supplied condition to sit inside the same paragraph as the reward, rather than allowing it as a permitted omission, is what keeps a reward that only pays out after a friend's first purchase from reading as an unconditional gift.",
  },

  article: {
    intro: [
      "A referral program copy prompt earns its place in a promo calendar by doing the one thing most give and get emails skip: stating the actual mechanics in a single paragraph a reader can act on. Give 10 dollars, get 10 dollars is not a mechanic, it is a headline with the mechanic missing, and the missing part usually turns out to include a first purchase requirement, an annual cap, or a payout delay the reward line never mentions.",
      "This one requires the real terms as input rather than letting a model invent tidy round numbers, and it refuses to let a condition that decides whether the reward is paid out slide into a separate terms link. If the friend has to complete a first order before the referrer sees a cent, that sentence sits next to the reward, not three clicks away in copy nobody reads.",
      "What comes out is one honest paragraph rather than a banner headline paired with buried fine print, built to run as written in an email or a landing page.",
    ],

    sections: [
      {
        heading: "Give 10, get 10 hides the mechanic",
        body: [
          "A referral headline is built to be short, and shortness strips the mechanic out. Give 10, get 10 tells a reader nothing about when the 10 arrives, whether it is cash or credit, or what the friend has to do before either party sees it. Each of those is a fact that changes whether the reward is worth the referral.",
          "How to write referral program copy that discloses conditions comes down to treating those facts as part of the offer, not as legal cover placed underneath it. A condition is not a caveat on the reward, it is a component of what the reward actually is.",
        ],
      },
      {
        heading: "What a referral program copy prompt actually checks",
        body: [
          "The prompt takes five inputs: the program name, what the referrer gets, what the friend gets, the real conditions and caps, and the channel it will run in. Running it as an ai prompt for referral program copy forces a decision most teams postpone, naming the exact numbers before a sentence gets written, rather than drafting a warm paragraph and backfilling the terms afterward.",
          "If any of the first four inputs is missing, the model refuses and names the gap. A reward with no stated cap is not treated as uncapped by default, because that is a claim about the program, not an absence of detail.",
        ],
      },
      {
        heading: "The condition that decides payout has to be in the paragraph",
        body: [
          "Some conditions are cosmetic, like the exact wording of a credit's expiry. Others decide whether money moves at all, and a first purchase requirement is the most common example: no reward for either party until the friend actually buys something, not merely signs up. Burying that distinction in a linked terms page is how a program earns a reputation for reneging on rewards that were, technically, conditional all along.",
          "Learning how to write referral program terms clearly mostly means sorting conditions by how much they change the reader's decision, then putting the ones that change it most in the same sentence as the number they modify.",
        ],
        list: [
          "A requirement that the friend's first purchase ships or completes, not just that they sign up.",
          "An annual or lifetime cap on how many referral rewards one person can earn.",
          "A delay between the qualifying action and the credit posting.",
          "A restriction that the reward is store credit rather than cash, or cannot be combined with another discount.",
        ],
      },
      {
        heading: "Why one paragraph beats a banner and a link",
        body: [
          "A banner paired with a terms link asks the reader to trust the headline and discover the conditions later, often after they have already referred someone and are waiting on a reward that has not arrived. That sequence is where most referral complaints originate, and it is avoidable at the copy stage rather than the support stage.",
          "One paragraph containing both the reward and its conditions costs the marketer a little punch, since give 10 get 10 free of qualifiers reads better on its own. It costs the customer nothing, since they now know exactly what they are signing up to bring a friend into.",
        ],
      },
      {
        heading: "Running it for email, landing pages and in app copy",
        body: [
          "A referral program email prompt that states the real terms should read the same in the first send of a campaign and the fifth, because the mechanics do not change with how badly the program needs referrals that quarter. The channel input matches the paragraph's register to where it appears, tighter for a push notification, fuller for a landing page, without dropping a condition to fit the space.",
          "For a hero section that cannot carry 90 words, keep this paragraph as the full mechanics directly underneath a short headline, rather than replacing it with one.",
        ],
      },
      {
        heading: "What this prompt cannot fix",
        body: [
          "It cannot make a genuinely bad referral offer look fair by writing it well. A reward that is effectively unreachable, a low cap paired with a narrow qualifying window, will read as unappealing once stated plainly, which reflects the program rather than a fault in the copy. Nor does it perform a legal read of the terms it is given. Disclosure rules for referral incentives vary by market, and a plain paragraph is not a substitute for confirming the program itself is compliant.",
        ],
      },
    ],

    howTo: {
      name: "How to write the referral program paragraph",
      steps: [
        {
          name: "Pull the real numbers before opening the prompt",
          text: "Get the exact referrer reward, the exact friend reward, and every condition from whoever owns the program's economics, not from the last campaign's headline.",
        },
        {
          name: "List every condition that changes payout, not just the ones legal flagged",
          text: "A first purchase requirement and an annual cap change the outcome as much as anything in a terms document, so they belong in the CONDITIONS input even if nobody asked for them to be there.",
        },
        {
          name: "Run it and read the paragraph as a first time referrer",
          text: "Would you know, from this paragraph alone, exactly when your reward arrives and what could stop it. If not, a condition is still missing from the input, not from the output.",
        },
        {
          name: "Reuse the same paragraph across channels",
          text: "Trim it for a push notification or a hero line, but keep the full version live somewhere a referrer can find it before they act, not only after a reward fails to show up.",
        },
      ],
    },

    faq: [
      {
        question: "Why does a referral program copy prompt refuse to write anything if a condition is missing?",
        answer:
          "Because writing around a missing condition produces copy that looks complete and is not. A paragraph with no stated cap reads as uncapped, which becomes a claim the program may not be able to honour. Naming the gap keeps that claim from being made by accident.",
      },
      {
        question: "Can I use this for a referral program that genuinely has no cap or delay?",
        answer:
          "Yes, state that plainly in the CONDITIONS field rather than leaving it blank. An explicit no cap on referrals this year reads very differently from an input the model had to work around, and it removes any ambiguity about whether the absence was checked or simply forgotten.",
      },
      {
        question: "How to explain give and get rewards honestly without the paragraph sounding like a legal notice?",
        answer:
          "Write the conditions as ordinary sentences about what happens next rather than as clauses. Your reward posts after your friend's first order ships reads as information. Referrer credit is contingent upon completion of a qualifying transaction reads as a notice. The prompt is instructed toward the first register throughout.",
      },
      {
        question: "What if marketing wants a shorter version for a banner?",
        answer:
          "Use the full paragraph as the source of truth and trim only the phrasing, never the conditions, for a shorter placement. A banner with a two line summary should still link to or sit above this same paragraph rather than an entirely separate terms page a reader has to go find.",
      },
      {
        question: "Does this work for partner or affiliate referral programs as well as customer ones?",
        answer:
          "Yes, with the same five inputs. A partner program typically adds a condition or two around exclusivity or minimum volume, which belongs in the CONDITIONS field exactly like a purchase requirement does. The rule that a payout determining condition has to sit in the paragraph does not change with the audience.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/giveaway-rules-terms-prompt",
        label: "giveaway rules terms prompt",
        description:
          "The same discipline applied to a contest, stating how a winner is actually chosen instead of leaving it to generic legal boilerplate.",
      },
      {
        href: "/promo-prompts/loyalty-tier-email-prompt",
        label: "loyalty tier email prompt",
        description:
          "For the ongoing relationship a referred customer enters once they convert, where the same refusal to guess at numbers applies.",
      },
      {
        href: "/marketing-prompts/case-study-prompt",
        label: "case study prompt",
        description:
          "A stronger draw for a hesitant referral than the reward itself, once a prospect can see the product worked for someone like them.",
      },
      {
        href: "/sales-prompts/referral-request-prompt",
        label: "referral request prompt",
        description:
          "For asking a specific customer for a specific introduction, a different job from publishing the program's standing terms.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
        label: "FTC: Bringing dark patterns to light",
        description:
          "The staff report on deceptive design, including burying key terms, which is the exact failure this paragraph is written to avoid at the copy stage.",
      },
      {
        href: "https://hbr.org/2011/06/why-customer-referrals-can-drive-stunning-profits",
        label: "Harvard Business Review: Why customer referrals can drive stunning profits",
        description:
          "The research on referred customers being more loyal and more valuable, which is the case for getting the mechanics right rather than treating the copy as an afterthought.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of a conditional refusal gate paired with a strict output constraint that this prompt depends on to avoid silently dropping a condition.",
      },
      {
        href: "https://faculty.wharton.upenn.edu/wp-content/uploads/2013/05/Schmitt_Skiera_VandenBulte_2013_Referrral_Programs_2.pdf",
        label: "Wharton: Referred customer profitability and retention research",
        description:
          "The underlying study behind the stunning profits figures, useful for weighing whether a proposed reward and cap are generous enough to be worth referring for at all.",
      },
    ],
  },
};

export default meta;
