import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "cart-abandonment-discount-prompt",
  name: "Abandoned Cart Writer",
  title: "Cart Abandonment Discount Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Decides whether a discount is actually warranted before writing the message that might offer one, so the first reminder stays a reminder.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["ecommerce", "email", "cart abandonment", "discount"],

  seo: {
    primaryKeyword: "cart abandonment discount prompt",
    keywords: [
      "cart abandonment discount prompt",
      "how to write an abandoned cart email without a discount",
      "ai prompt for cart abandonment recovery email",
      "chatgpt prompt for abandoned cart follow up",
      "when to offer a discount for cart abandonment",
      "abandoned cart email sequence prompt",
    ],
    seoTitle: "Cart Abandonment Discount Prompt: Earn The Discount First",
    seoDescription:
      "A cart abandonment discount prompt that writes a plain reminder first and only offers a discount on a later, clearly justified follow up message.",
  },

  prompt: {
    text: `You are an ecommerce lifecycle copywriter writing one abandoned cart message. You know that most cart abandonment is not a price objection, so the first reminder after a cart is abandoned must never lead with, or even mention, a discount, and that a discount only belongs on a later follow up, clearly justified by that later stage, never offered by default.

CUSTOMER: {{CUSTOMER_NAME}}
ITEMS LEFT IN THE CART: {{CART_ITEMS}}
CART VALUE: {{CART_VALUE}}
ABANDONMENT STAGE: {{ABANDONMENT_STAGE}}
DISCOUNT YOU ARE AUTHORISED TO OFFER, IF ANY: {{DISCOUNT_AUTHORITY}}
BRAND VOICE: {{TONE}}

Write one short email of 60 to 120 words plus a subject line.

If ABANDONMENT_STAGE is a first reminder, write a helpful, low pressure message that names the actual items left in the cart and makes it easy to return to checkout. Do not mention a discount, a percentage off, or any code, even if DISCOUNT_AUTHORITY names one.

If ABANDONMENT_STAGE names a later stage, such as a second follow up or a final notice, you may offer the discount in DISCOUNT_AUTHORITY, but only after stating, in one sentence, why this specific stage warrants it. Never invent a discount that is not present in DISCOUNT_AUTHORITY.

Output the subject line, the email body, then one line stating which stage rule you applied and why, so I can check the reasoning against the stage I gave you.`,
    variables: [
      {
        token: "CUSTOMER_NAME",
        label: "Customer's first name",
        example: "Jordan",
      },
      {
        token: "CART_ITEMS",
        label: "What was actually left in the cart",
        example: "Two ceramic plant pots and a medium watering can",
      },
      {
        token: "CART_VALUE",
        label: "Total value of the abandoned cart",
        example: "$68",
      },
      {
        token: "ABANDONMENT_STAGE",
        label: "Which message in the sequence this is: a first reminder or a later follow up",
        example: "first reminder, sent four hours after the cart was abandoned",
      },
      {
        token: "DISCOUNT_AUTHORITY",
        label: "The exact discount you are authorised to offer at this stage, if any",
        example: "10% off with code COMEBACK10, valid 48 hours, approved for stage two only",
      },
      {
        token: "TONE",
        label: "Brand voice",
        example: "Warm and brief, one light joke allowed",
      },
    ],
    expectedOutput:
      "A subject line and a short email that, on a first reminder, contains no discount at all and simply makes it easy to return to checkout, or on a later follow up, offers only the discount named in DISCOUNT_AUTHORITY together with one sentence justifying why this stage earned it.",
    followUps: [
      "The customer did not convert after the first reminder. Run it again with ABANDONMENT_STAGE set to the follow up and DISCOUNT_AUTHORITY filled in, and compare the two emails side by side.",
      "Write the same first reminder for three different carts with different item counts, and check that none of the three mention a discount.",
      "Rewrite the follow up assuming DISCOUNT_AUTHORITY is empty, so the justification sentence has to explain what changes instead of a price.",
    ],
    pitfalls: [
      "Setting ABANDONMENT_STAGE to a later follow up on every single send, including the very first message, defeats the entire discipline: the prompt discounts because it was asked to, not because a plain reminder genuinely failed first.",
      "Leaving DISCOUNT_AUTHORITY vague, such as 'whatever gets them to convert', gives the model room to invent a number on the follow up message, which is exactly the guessing this prompt exists to prevent.",
      "Putting a discount code in the email template or subject line before the prompt even runs undoes the constraint at a layer the prompt has no control over.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A model asked to recover an abandoned cart treats a discount as the safest lever available, since a percentage off is easy to justify and hard to get obviously wrong, so it reaches for one on the very first message even though most carts are abandoned for reasons a coupon never touches, such as an unfinished decision or a shipping cost that only appears at checkout. Making the abandonment stage a required input, and withholding any discount until that stage names one, is what stops the easiest lever from becoming the only one.",
  },

  article: {
    intro: [
      "A cart abandonment discount prompt that opens every message with a percentage off is solving the wrong problem for most of the customers it reaches. The majority of abandoned carts are not a price objection at all. They are a shipping cost that only appeared at the last step, an account creation wall, a customer who was comparing options, or simply a decision that was not finished yet.",
      "This prompt treats a discount as something that has to be earned by the stage of the sequence, not handed out by default. The first message after a cart is abandoned is a reminder: specific about what was left behind, easy to act on, and free of any code or percentage off. A discount only appears later, on a follow up, and only once the prompt has stated why that particular stage warrants one.",
    ],

    sections: [
      {
        heading: "Why the first abandoned cart message should never open with a discount",
        body: [
          "Research on cart abandonment consistently finds that unexpected costs, not the sticker price, are the single biggest driver, alongside a large share of shoppers who were simply browsing. A discount answers neither of those. It answers a complaint nobody made, which is why a coupon dropped into the very first reminder so often reads as generic rather than persuasive.",
          "Knowing how to write an abandoned cart email without a discount starts with accepting that most abandonment is not a price problem, and that a low pressure message will outperform a discount aimed at a reason the customer never had.",
        ],
      },
      {
        heading: "What a cart abandonment discount prompt has to decide before it writes anything",
        body: [
          "The prompt requires ABANDONMENT_STAGE before it writes a word, and it will not default to a later stage just because a discount is available in DISCOUNT_AUTHORITY. A first reminder and a second follow up are different messages with different jobs.",
          "This is the discipline the page is built around: decide whether a discount is warranted before writing the message that might offer one, rather than reaching for a discount because it was sitting there in the brief.",
        ],
        list: [
          "First reminder: no discount, no code, no percentage off, regardless of what DISCOUNT_AUTHORITY contains.",
          "Later follow up: a discount only if DISCOUNT_AUTHORITY names one, and only with a stated reason for that stage.",
          "No stage given: the prompt should not guess. Supply the real stage rather than leaving it implied.",
          "No discount available: the follow up should still run, arguing urgency or scarcity instead of inventing a number.",
        ],
      },
      {
        heading: "The first reminder: helpful, specific, and free of any discount",
        body: [
          "A first reminder that names the actual items left in the cart reads as attentive rather than automated. That is what an ai prompt for cart abandonment recovery email should do on the first message: remind, not negotiate, and make returning to checkout the easiest action in the email.",
          "The instruction to withhold a discount even when DISCOUNT_AUTHORITY names one is deliberate. A customer who gets a coupon on message one learns that abandoning a cart is rewarded, which trains exactly the behaviour a helpful reminder is meant to discourage.",
        ],
      },
      {
        heading: "When to offer a discount for cart abandonment",
        body: [
          "Knowing when to offer a discount for cart abandonment means treating it as a decision tied to evidence, not a default tied to the channel. If a plain reminder did not convert, a later follow up is a reasonable place to test whether price was ever part of the hesitation, and the prompt requires the output to say so in one sentence before the offer appears.",
          "That single sentence of justification is what keeps the discount from feeling arbitrary, both to the customer reading it and to whoever is checking the output before it sends.",
        ],
      },
      {
        heading: "What DISCOUNT_AUTHORITY should contain, and what it shouldn't",
        body: [
          "DISCOUNT_AUTHORITY should be a specific, already-approved offer: a percentage, a code, an expiry window, and which stage it is cleared for. It should never be a loose instruction like 'use your judgement', because a specific input is what stops the model inventing a number nobody actually authorised.",
          "Leaving the field empty is a valid input, not an oversight. A follow up with no discount available still has a job to do, arguing urgency or simple helpfulness instead of manufacturing an offer that does not exist.",
        ],
      },
      {
        heading: "Running it twice: from reminder to abandoned cart email sequence prompt",
        body: [
          "Run once for the first reminder and again later with the stage and the discount filled in, it functions as an abandoned cart email sequence prompt rather than a single one-off email. Each run answers a different input, so the two messages stay distinct instead of reading like the same coupon email sent twice.",
          "As a chatgpt prompt for abandoned cart follow up specifically, the value is in the constraint holding across every account it runs on: the follow up still has to justify itself, batch after batch, rather than defaulting to a discount because that is the fastest output to generate. That is the same discipline a cart abandonment discount prompt is meant to enforce on every send, not just the first one.",
        ],
      },
    ],

    howTo: {
      name: "How to use the cart abandonment discount prompt",
      steps: [
        {
          name: "Confirm which stage this message actually is",
          text: "Do not default to a later stage to unlock a discount. If this is the first message the customer will see since abandoning, ABANDONMENT_STAGE is a first reminder, full stop.",
        },
        {
          name: "Pull the real cart contents and value",
          text: "Use the items and total that are actually in the cart. A vague 'your items' line is the first sign an email was templated rather than written for this cart.",
        },
        {
          name: "Only fill DISCOUNT_AUTHORITY if a discount is genuinely approved",
          text: "Leave it empty for a first reminder every time. For a later follow up, fill it only with an offer that is real, specific, and cleared for that stage.",
        },
        {
          name: "Run the reminder stage before the follow up stage",
          text: "Send the plain reminder first and give it time to work. Generating the discounted follow up before the reminder has had a chance defeats the sequence.",
        },
        {
          name: "Read the stage note before sending",
          text: "The prompt states which stage rule it applied and why. If that note does not match what you expected, the stage input was ambiguous and needs fixing before the email goes out.",
        },
      ],
    },

    faq: [
      {
        question: "Should the first abandoned cart email always include a discount?",
        answer:
          "No. Most cart abandonment is not caused by price, so a discount on the very first message answers a problem the customer usually does not have. The first reminder should just make the items easy to find and checkout easy to finish, with no discount mentioned at all.",
      },
      {
        question: "I don't know exactly why customers abandon carts. Does that still work?",
        answer:
          "Yes. The prompt does not require a churn reason, only the abandonment stage. A first reminder stays discount free regardless of why the cart was left, and a later follow up can test whether price mattered without needing to know that in advance.",
      },
      {
        question: "How is this different from a standard abandoned cart email template?",
        answer:
          "A template usually applies the same structure, and often the same discount, to every stage of the sequence. This prompt ties the presence of a discount to the stage input, so the first and second messages are structurally different rather than the same email with a coupon pasted in later.",
      },
      {
        question: "What if I never want to offer a discount at all?",
        answer:
          "Leave DISCOUNT_AUTHORITY empty on every run. The first reminder is unaffected, and later follow ups will argue urgency, stock, or simple helpfulness instead of manufacturing an offer, which keeps the sequence honest even without a discount in the budget.",
      },
      {
        question: "Is one prompt enough for a full recovery sequence, or do I need several?",
        answer:
          "One prompt covers the whole sequence. Running it again with a different ABANDONMENT_STAGE and, where warranted, a filled DISCOUNT_AUTHORITY produces the next message, so the sequence stays consistent in voice while each stage still earns its own content on its own terms.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/win-back-campaign-prompt",
        label: "win back campaign prompt",
        description:
          "Applies the same discipline to a lapsed customer: address the real reason before reaching for a discount, or ask rather than guess when there is none.",
      },
      {
        href: "/promo-prompts/flash-sale-announcement-prompt",
        label: "flash sale announcement prompt",
        description:
          "For the stage where a discount genuinely is warranted, this prompt writes the urgency and end time cleanly once the offer itself is decided.",
      },
      {
        href: "/promo-prompts/bundle-offer-description-prompt",
        label: "bundle offer description prompt",
        description:
          "A bundle is often a better answer than a percentage off for a cart abandoned over price, and this prompt writes that alternative honestly.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Sharpens the subject line once the reminder or follow up body is written, since a vague subject line undoes a specific, discount free reminder.",
      },
    ],

    externalLinks: [
      {
        href: "https://baymard.com/lists/cart-abandonment-rate",
        label: "Baymard Institute: Cart Abandonment Rate Statistics",
        description:
          "The research behind the claim that unexpected costs and unfinished browsing, not price itself, are the leading causes of cart abandonment, which is the case for not defaulting to a discount.",
      },
      {
        href: "https://www.nngroup.com/articles/transactional-notifications/",
        label: "Nielsen Norman Group: Transactional notifications",
        description:
          "The usability distinction between a brief, timely reminder and a heavier marketing message, which is the basis for keeping the first cart abandonment message plain.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of instructing a model to state which conditional branch it took, which is what the stage note at the end of the output is built on.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide for business",
        description:
          "The legal baseline for any commercial recovery email, including the identification and opt-out requirements a discounted follow up has to meet regardless of tone.",
      },
    ],
  },
};

export default meta;
