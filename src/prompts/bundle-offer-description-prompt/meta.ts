import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "bundle-offer-description-prompt",
  name: "Bundle Describer",
  title: "Bundle Offer Description Prompt",
  category: "promo-prompts",
  taskType: "generate",
  summary:
    "Describes a product or service bundle by showing the sum of individual prices, the bundle price and the exact saving, and refuses to round that saving in the customer's favour.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["bundle", "pricing", "discount", "ecommerce"],

  seo: {
    primaryKeyword: "bundle offer description prompt",
    keywords: [
      "bundle offer description prompt",
      "how to describe a bundle discount accurately",
      "ai prompt for bundle pricing copy",
      "how to calculate bundle savings correctly",
      "chatgpt prompt for product bundle description",
      "example of an honest bundle discount description",
    ],
    seoTitle: "Bundle Offer Description Prompt: Savings That Add Up",
    seoDescription:
      "A bundle offer description prompt that states the sum of individual prices, the bundle price and the exact saving, and refuses to round it in the customer's favour.",
  },

  prompt: {
    text: `You are a copywriter describing a product or service bundle for a listing page. Your only job is to make the saving mathematically obvious, not to make it sound impressive.

BUNDLE NAME: {{BUNDLE_NAME}}
ITEMS AND THEIR INDIVIDUAL PRICES: {{ITEMS_AND_PRICES}}
BUNDLE PRICE: {{BUNDLE_PRICE}}
WHO IS BUYING: {{AUDIENCE}}
VOICE: {{TONE}}

First, on a line the reader can see, add up the individual prices, state the bundle price, then show the dollar saving and the percent saving to two decimal places with the working visible. Do not round either figure in the customer's favour: if the true numbers are $29.98 and 23.07 percent, write $29.98 and 23.07 percent, never $30 and 23 percent, and never round up. If the maths produces an unimpressive or awkward number, state that real number rather than reaching for a rounder one nearby.

Then write the description itself in three short paragraphs: what the bundle solves for {{AUDIENCE}} as one use case, what is inside it, and the saving restated once in plain language using the exact figures already calculated. Do not use the words great value, unbeatable, incredible or steal. Do not state a saving larger than the one you calculated above it. Output the worked sum first, then the description, then a one line comparison a reader could verify with a calculator.`,
    variables: [
      {
        token: "BUNDLE_NAME",
        label: "What the bundle is called",
        example: "Commuter Audio Bundle",
      },
      {
        token: "ITEMS_AND_PRICES",
        label: "Every item in the bundle with its individual price",
        example: "Wireless earbuds $89.99, charging case $24.99, carry pouch $14.99",
      },
      {
        token: "BUNDLE_PRICE",
        label: "What the whole bundle actually costs",
        example: "$99.99",
      },
      {
        token: "AUDIENCE",
        label: "Who is buying it",
        example: "Commuters who already own a phone and want one less thing to charge separately",
      },
      {
        token: "TONE",
        label: "The voice the copy should be written in",
        example: "Plain and specific, no exclamation marks, short sentences",
      },
    ],
    expectedOutput:
      "A worked sum showing the individual prices adding to a total, the bundle price beside it, the dollar saving and percent saving calculated to two decimal places without being rounded in the customer's favour, followed by a three paragraph description that restates the saving once in plain language and never claims more than the number above it supports.",
    followUps: [
      "Here are four more bundles with their real prices. Run the same calculation on each and flag any where the saving is under 10 percent.",
      "Rewrite the description at half the length, keeping the worked sum exactly as it is.",
      "The supplier changed the carry pouch price to $19.99. Recalculate the saving and tell me what changes in the description.",
    ],
    pitfalls: [
      "Feeding in rounded list prices defeats the point, because the no rounding rule has nothing precise to protect. Paste the real prices to the cent, including any that already end in .99, or the worked sum will look cleaner than the actual saving is.",
      "A bundle assembled from items already on sale elsewhere produces a smaller real saving than the sticker suggests. The individual prices supplied have to be what a customer would actually pay today, not the original list price nobody pays.",
      "Two item bundles often produce a percent saving under 10, which reads as unimpressive next to a headline discount. That is the correct output when the arithmetic says so, and the fix is to change the bundle, not to ask the prompt for a bigger number.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A model asked to sell a bundle reaches for value language before it reaches for a calculator, and that language survives even when the underlying arithmetic does not support it. Requiring the worked sum before the description, and explicitly forbidding the saving from being rounded upward, converts a plausible sounding discount into one a reader could check against the individual prices themselves.",
  },

  article: {
    intro: [
      "A bundle offer description prompt earns its place in a listing by doing arithmetic, not by reaching for the word value. Most bundle copy states a saving as a feeling: great deal, unbeatable price, save big. None of that survives a reader who opens a calculator, and enough readers now do exactly that before checking out.",
      "This prompt does the opposite. It adds up what the items cost separately, states what the bundle costs, and shows the dollar and percent saving worked out from those two numbers, to two decimal places, with a hard rule against rounding either figure upward. If the honest saving is 23.07 percent, the copy says 23.07 percent.",
    ],

    sections: [
      {
        heading: "Why great value is not a bundle offer description",
        body: [
          "Great value, unbeatable price and save big are claims, not descriptions. They carry no information a reader can check, which is precisely why they get skimmed past by anyone who has been burned by a bundle before. A shopper who has once discovered that a bundle discount only applied to the cheapest item in it reads every unverifiable superlative afterward with suspicion.",
          "Knowing how to describe a bundle discount accurately starts with treating the saving as a number to prove, not an adjective to reach for. The individual prices, added up in view of the reader, do the persuading. The adjectives do not, and the prompt is written to leave them out almost entirely.",
        ],
      },
      {
        heading: "What a bundle offer description prompt actually calculates",
        body: [
          "Given the individual price of each item and the bundle price, the maths is short: sum the individual prices, subtract the bundle price for the dollar saving, then divide that saving by the summed price for the percent. Three earbud accessories at $89.99, $24.99 and $14.99 sum to $129.97. A $99.99 bundle price makes the saving $29.98, which is 23.07 percent of the summed total.",
          "How to calculate bundle savings correctly is exactly that sequence, done from the real prices rather than from a headline figure decided first and worked backward from. The prompt performs the calculation before it writes a single sentence of description, and shows the working rather than only the answer, which is what makes the number checkable rather than asserted.",
        ],
      },
      {
        heading: "Refusing to round the saving in the customer's favour",
        body: [
          "The instruction is explicit: 23.07 percent is written as 23.07 percent, not rounded up to 23, and never rounded to a rounder nearby figure like 25. A dollar saving of $29.98 stays $29.98, not $30. This matters because rounding a saving upward, even by cents, is a comparative price claim that the number underneath does not actually support.",
          "Regulatory guidance on advertised price comparisons treats an inflated saving the same way it treats an inflated original price: as a claim that has to be true, not merely close. The prompt is built to fail safely on this point rather than to optimise for a headline that sounds better than the arithmetic underneath it.",
        ],
      },
      {
        heading: "Built as an ai prompt for bundle pricing copy across models",
        body: [
          "As an ai prompt for bundle pricing copy, it is written to be model agnostic. The worked sum, the two decimal place figures and the ban on inflating language are instructions any current model can follow, which means it also works as a chatgpt prompt for product bundle description without adjustment, and the same is true in Claude or Gemini.",
          "Showing the summed individual price beside the bundle price also does real work for the reader beyond honesty. It sets the anchor the discounted price is judged against, and a visible, correct anchor is what makes a saving legible rather than merely claimed. An invented or inflated anchor produces the opposite effect once a reader notices the maths does not close.",
        ],
        list: [
          "State every individual price to the cent, not rounded.",
          "Show the addition, not just the total.",
          "State the dollar saving and the percent saving separately.",
          "Never let the description repeat a bigger number than the worked sum produced.",
        ],
      },
      {
        heading: "When the honest number does not look impressive",
        body: [
          "Sometimes the real saving is 8 percent, not 30. The prompt is instructed to write that number plainly rather than dress it up, because a description that oversells a thin discount trains the same reader to distrust the next one, including the one that is genuinely strong. An example of an honest bundle discount description is one where a modest saving is stated as a modest saving.",
          "The fix for a weak saving is changing what is in the bundle or what it costs, not changing how the prompt phrases the arithmetic. Treating that as a merchandising problem rather than a copywriting problem is what keeps every bundle on the site telling the truth about itself.",
        ],
      },
    ],

    howTo: {
      name: "How to use the bundle offer description prompt",
      steps: [
        {
          name: "Collect the real, current individual prices",
          text: "Use what a customer would actually pay for each item today, to the cent, not a list price nobody pays or a figure rounded for tidiness.",
        },
        {
          name: "Confirm the bundle price is final",
          text: "Include any bundle specific shipping or fee difference if one exists, since a saving calculated against a price the customer will not actually pay at checkout is not a real saving.",
        },
        {
          name: "Run the prompt and check the worked sum yourself",
          text: "Add the individual prices with a calculator before reading the description. The worked sum should match your own total exactly, to the cent.",
        },
        {
          name: "If the saving is weak, change the bundle, not the copy",
          text: "Add an item, drop the bundle price, or do not run the bundle as a promotion this cycle. Asking the prompt to write around a thin saving is the one thing it is instructed to refuse.",
        },
      ],
    },

    faq: [
      {
        question: "What does an example of an honest bundle discount description look like?",
        answer:
          "It states the individual prices adding to a total, the bundle price beside it, and a saving such as $29.98 or 23.07 percent written exactly as calculated rather than rounded to $30 or 23 percent. If the saving is only 8 percent, the description says 8 percent rather than reaching for stronger language to compensate for a thin number.",
      },
      {
        question: "Can this be used for service bundles, not just physical products?",
        answer:
          "Yes, provided each service in the bundle has a real standalone price a customer could actually book at. A consulting package bundling three services works the same way as a physical bundle: the individual prices are summed, the bundle price is stated, and the saving is calculated from those two real figures rather than from a marketing target.",
      },
      {
        question: "What happens if I only give it two items instead of three or more?",
        answer:
          "It runs the same calculation with two prices instead of three. Two item bundles frequently produce a smaller percent saving, and the prompt states that smaller number rather than treating fewer items as a reason to inflate the figure it reports.",
      },
      {
        question: "Will it stop me writing save up to claims?",
        answer:
          "It will refuse to write save up to language attached to a single, specific bundle, because up to implies a range this prompt is not given and cannot calculate. For a single fixed bundle price, it states the one real saving that applies, which is a stronger and more checkable claim than a vague upper bound.",
      },
      {
        question: "Does the tone input change the numbers it produces?",
        answer:
          "No. The tone input changes only the sentences in the description, such as sentence length and formality. The worked sum, the dollar saving and the percent saving are calculated the same way regardless of voice, and the prompt is instructed to keep the arithmetic identical across any tone requested.",
      },
    ],

    internalLinks: [
      {
        href: "/promo-prompts/referral-program-copy-prompt",
        label: "referral program copy prompt",
        description:
          "Applies the same discipline about stating real terms plainly to a referral reward rather than a bundle discount.",
      },
      {
        href: "/promo-prompts/win-back-campaign-prompt",
        label: "win back campaign prompt",
        description:
          "For the message that follows a bundle promotion once a customer has gone quiet, written with the same refusal to inflate what is on offer.",
      },
      {
        href: "/marketing-prompts/product-description-prompt",
        label: "product description prompt",
        description:
          "For describing a single item honestly, the same specificity requirement this prompt applies to a bundle of several.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "For the underlying claim about who the bundle is for, which this prompt assumes has already been worked out before the copy is written.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/legal-library/browse/rules/deceptive-pricing",
        label: "FTC: Guides against deceptive pricing",
        description:
          "The regulatory basis for treating an inflated savings claim the same way as an inflated original price, which is what the no rounding rule is built to satisfy.",
      },
      {
        href: "https://www.nngroup.com/articles/anchoring-principle/",
        label: "Nielsen Norman Group: The anchoring principle",
        description:
          "Explains why showing the summed individual price beside the bundle price sets the anchor a reader judges the saving against.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "The guidance behind stating the no rounding rule as an explicit, literal instruction rather than a general request for honesty.",
      },
    ],
  },
};

export default meta;
