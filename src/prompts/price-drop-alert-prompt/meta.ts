import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "price-drop-alert-prompt",
  name: "Price Drop Writer",
  title: "Price Drop Alert Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "States a price change plainly using the real old and new price, and refuses to reach for massive or huge when the arithmetic says the drop is small.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["pricing", "email", "ecommerce", "notification"],

  seo: {
    primaryKeyword: "price drop alert prompt",
    keywords: [
      "price drop alert prompt",
      "how to write a price drop alert email",
      "ai prompt for price drop notification",
      "chatgpt prompt for a price drop email",
      "how to calculate the real percentage price drop",
      "price drop alert prompt for ecommerce",
    ],
    seoTitle: "Price Drop Alert Prompt: States The Real Percentage",
    seoDescription:
      "A price drop alert prompt that calculates the real percentage decrease and only uses bold language once the drop actually earns it, every time.",
  },

  prompt: {
    text: `You are a lifecycle marketing copywriter writing a price drop alert for one product. You know that stating a real number builds trust, and that reaching for words like massive, huge or unbeatable on a small drop breaks that trust the moment a customer does the arithmetic themselves.

PRODUCT: {{PRODUCT_NAME}}
OLD PRICE: {{OLD_PRICE}}
NEW PRICE: {{NEW_PRICE}}
SUPERLATIVE THRESHOLD (percent): {{SUPERLATIVE_THRESHOLD}}
BRAND VOICE: {{TONE}}

First, calculate the percentage decrease from OLD_PRICE to NEW_PRICE and round it to the nearest whole number. State the old price, the new price and this exact percentage plainly in the alert, in that order, before any other claim.

Only use superlative or urgency language such as "massive", "huge", "unbeatable" or "don't miss out" if the calculated percentage is equal to or greater than SUPERLATIVE_THRESHOLD. If it is below that threshold, describe the drop factually, without superlatives or exclamation marks, and do not word it in a way that implies a bigger saving than the number supports.

Write one alert of 40 to 70 words plus a subject line. End with one line stating the calculated percentage and whether it met or missed the threshold, so I can check the arithmetic against the input I gave you.`,
    variables: [
      {
        token: "PRODUCT_NAME",
        label: "Product name",
        example: "Aria Wireless Headphones",
      },
      {
        token: "OLD_PRICE",
        label: "Old price, with currency symbol",
        example: "$129",
      },
      {
        token: "NEW_PRICE",
        label: "New price, with currency symbol",
        example: "$124",
      },
      {
        token: "SUPERLATIVE_THRESHOLD",
        label: "Minimum percent decrease required before using bold language",
        example: "20",
      },
      {
        token: "TONE",
        label: "Brand voice",
        example: "Direct and confident, no exclamation marks",
      },
    ],
    expectedOutput:
      "A subject line and a short alert that states the old price, the new price and the exact computed percentage decrease, using superlative language only when that percentage meets or exceeds the stated threshold, plus a closing line confirming the calculation and whether the threshold was met.",
    followUps: [
      "Here are ten products with old and new prices, five above the threshold and five below. Write all ten and keep the two registers clearly distinct.",
      "Rewrite this alert assuming SUPERLATIVE_THRESHOLD is 10 instead of 20, and check whether the language changes appropriately.",
      "The price dropped again a week later. Write the second alert using the previous alert's new price as this one's old price.",
    ],
    pitfalls: [
      "Setting SUPERLATIVE_THRESHOLD very low, or leaving it out, lets a four percent drop borrow language it has not earned, which is the exact failure the prompt exists to stop.",
      "Skipping the calculation and eyeballing the percentage produces a number that does not match the two prices printed right above it, which a customer can check in seconds.",
      "Basing the headline percentage on the biggest discount in a multi item sale while this specific product dropped by far less tells the customer a number that is not about the thing they are looking at.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to announce a price drop will reach for the highest energy language its training rewards, regardless of the actual number involved, because a confident superlative reads as more persuasive than a modest fact. Requiring the percentage to be calculated first and gating superlative language behind an explicit threshold is what stops a four percent decrease being announced as a massive saving.",
  },

  article: {
    intro: [
      "A price drop alert prompt has one job the copy cannot fudge: the arithmetic. A customer can check the old price against the new price in the time it takes to read the email, and if the language promises more than the numbers deliver, the alert has cost you credibility on every future send from that address.",
      "This prompt calculates the real percentage decrease from the two prices it is given and states it plainly, in that order, before any adjective is allowed near the copy. Bold language such as massive or unbeatable is not banned outright. It is gated behind a threshold you set, so it only appears once the drop actually crosses the size that makes it true.",
    ],

    sections: [
      {
        heading: "What a price drop alert prompt should refuse to do",
        body: [
          "The easy failure mode is not lying about the price. It is choosing a word that implies a bigger drop than the one that happened. A model asked to write an alert for a four percent decrease will, left alone, often reach for the same vocabulary it would use for forty percent, because urgency reads as more persuasive in isolation than accuracy does.",
          "The fix is structural rather than stylistic. Instead of asking the model to sound exciting and hoping restraint follows, the prompt asks it to calculate the number first and then makes the vocabulary a function of that number. A four percent drop gets described as a four percent drop. A sixty percent drop gets to sound like one.",
        ],
      },
      {
        heading: "How to calculate the real percentage price drop before you write anything",
        body: [
          "The formula is simple and that is exactly why it gets skipped: subtract the new price from the old price, divide by the old price, multiply by one hundred, round to the nearest whole number. Knowing how to calculate the real percentage price drop before any copy exists means the number in the headline and the two prices printed underneath it always agree, because they came from the same arithmetic rather than a separate guess.",
          "Doing the calculation inside the prompt rather than outside it also catches the case where someone hands over the wrong old price, a common source of an alert that overstates a sale, because the stated percentage is the one thing in the output a reader can independently verify against the two numbers right beside it.",
        ],
      },
      {
        heading: "Writing the alert once the number is known",
        body: [
          "How to write a price drop alert email once the percentage is settled is a matter of ordering, not decoration. The prompt requires the old price, the new price and the computed percentage to appear in that sequence before any other claim, which means the reader gets the fact before the framing, rather than a mood followed by a number that has to catch up to it.",
        ],
        list: [
          "Lead with the product, the old price, the new price and the percentage, in that order.",
          "Hold every superlative until the threshold check has run.",
          "Never phrase a small drop so it reads like a bigger one, even without using a banned word outright.",
          "End with the calculation check line so the number can be audited before the send goes out.",
        ],
      },
      {
        heading: "The threshold is what makes bold language honest",
        body: [
          "SUPERLATIVE_THRESHOLD is the field that does the actual work in this prompt. Set it to twenty and a twelve percent drop gets a plain, factual sentence: now this price, down from that price, a twelve percent decrease. Set the same input to a sale that actually cleared thirty percent, and the same prompt is free to use language that a twelve percent drop was never entitled to.",
          "This is a deliberate choice to make the vocabulary conditional rather than fixed, because a brand that only ever writes calm, factual alerts loses the ability to signal when a drop is genuinely unusual, and a brand that always writes urgent ones loses the customer's ability to tell the difference at all.",
        ],
      },
      {
        heading: "A chatgpt prompt for a price drop email versus a fixed template",
        body: [
          "A chatgpt prompt for a price drop email that takes the threshold as an input behaves differently from a static template in exactly the situation where it matters: the small, ordinary markdown that happens every week and does not deserve the same register as a genuine clearance event. A template applies the same excited voice to both. This prompt only applies it to the one that earned it.",
          "An ai prompt for price drop notification work built this way also scales cleanly across a catalog, because the discipline lives in the instruction rather than in a person remembering to tone down the copy for the smaller markdowns buried in a long list.",
        ],
      },
      {
        heading: "Using a price drop alert prompt for ecommerce catalogs at scale",
        body: [
          "A price drop alert prompt for ecommerce work is rarely run once. It is run across a feed of products with different old and new prices, some of which crossed the threshold and most of which did not, and the value of gating the language on a calculation rather than a human judgment call is that the same rule applies consistently across all of them without anyone re-reading each line for exaggeration before it ships.",
        ],
      },
    ],

    howTo: {
      name: "How to use the price drop alert prompt",
      steps: [
        {
          name: "Confirm the two prices are correct",
          text: "Pull OLD_PRICE and NEW_PRICE from the same source, ideally the price history record rather than memory, since a wrong old price produces a wrong percentage no matter how careful the copy is afterward.",
        },
        {
          name: "Set a threshold you can defend",
          text: "Pick the percentage that genuinely marks an unusual drop for this product category, not a round number chosen for effect. Twenty percent means something different for a coffee subscription than for a laptop.",
        },
        {
          name: "Generate the alert and check the closing line",
          text: "The prompt states the calculated percentage and whether it met the threshold. Verify that line against the two prices before anything else in the output.",
        },
        {
          name: "Read the copy for language that outran the number",
          text: "Even below the threshold, check the sentence for phrasing that implies a bigger saving without naming a banned word directly. The instruction limits vocabulary; it does not replace a read through.",
        },
        {
          name: "Re-run at the same threshold across the catalog",
          text: "Applying one threshold consistently across every product in a sale is what keeps the register fair between the deepest markdown and the shallowest one.",
        },
      ],
    },

    faq: [
      {
        question: "What is a price drop alert prompt for, exactly?",
        answer:
          "It generates the notification sent when a specific product's price falls, calculating the real percentage decrease from the two prices given and writing copy whose language matches the size of that number rather than a generic sense of excitement applied to every markdown regardless of size.",
      },
      {
        question: "Why does the prompt need a threshold instead of just writing exciting copy every time?",
        answer:
          "Without a threshold, a model tends to describe every drop with similarly enthusiastic language, which means a shopper cannot tell a routine four percent markdown from a genuine clearance event by reading the copy alone. The threshold makes the vocabulary a signal again rather than a constant.",
      },
      {
        question: "My drop is only three percent. Is this prompt still useful?",
        answer:
          "Yes, and arguably more useful for a small drop than a large one, since a small drop is exactly where the temptation to inflate the language is strongest. The prompt states the true number plainly and withholds superlatives that a three percent decrease has not earned.",
      },
      {
        question: "Can I use this for a whole catalog of markdowns at once?",
        answer:
          "Run it once per product with that product's own old and new price, keeping the threshold constant across the batch. That consistency is what makes the register comparable between the deepest and shallowest discounts in the same sale, rather than each one being judged on its own vibe.",
      },
      {
        question: "How is this different from a normal sale announcement template?",
        answer:
          "A template applies the same tone regardless of the numbers behind it. This prompt takes the actual old and new price as inputs, computes the real percentage, and changes the register of the copy based on that calculation, which a fixed block of marketing copy cannot do.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/flash-sale-announcement-prompt",
        label: "flash sale announcement prompt",
        description:
          "For a time boxed sale across multiple items rather than a single product's price change, with its own rules for stating urgency honestly.",
      },
      {
        href: "/promo-prompts/bundle-offer-description-prompt",
        label: "bundle offer description prompt",
        description:
          "Shares the same discipline of describing a discount by the real numbers behind it rather than the most flattering framing available.",
      },
      {
        href: "/promo-prompts/win-back-campaign-prompt",
        label: "win back campaign prompt",
        description:
          "For a lapsed customer, a price drop can be the reason to write, and this prompt handles addressing a specific reason for leaving with the same directness.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Sharpens the subject line once the alert body is written, so the headline promise still matches the calculated percentage inside it.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/guides-against-deceptive-pricing",
        label: "FTC: Guides Against Deceptive Pricing",
        description:
          "The federal guidance on stating a price comparison accurately, which is the regulatory backdrop for why the percentage in a price drop alert has to match the two prices shown.",
      },
      {
        href: "https://www.nngroup.com/articles/trustworthy-design/",
        label: "Nielsen Norman Group: Trustworthy design",
        description:
          "The usability research on why a claim a user can independently verify, such as a printed percentage against two prices, builds or breaks trust faster than tone does.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: Chain of thought prompting",
        description:
          "Documents why instructing a model to calculate a value before writing the copy that depends on it produces more consistent arithmetic than asking for both at once.",
      },
      {
        href: "https://www.iab.com/guidelines/",
        label: "IAB: Advertising and marketing guidelines",
        description:
          "Industry guidance on honest promotional claims in digital advertising, relevant to how a discount percentage should be represented in a commercial email.",
      },
    ],
  },
};

export default meta;
