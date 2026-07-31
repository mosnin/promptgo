import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "discount-stacking-calculator",
  name: "Discount Stacking Calculator",
  title: "Discount Stacking Calculator",
  category: "marketing-promo-tools",
  summary:
    "Applies a list of percent and fixed dollar discounts to a price in the exact order given, so the final price reflects which discount ran first rather than treating all of them as one combined percentage off.",

  seo: {
    primaryKeyword: "discount stacking calculator",
    keywords: [
      "discount stacking calculator",
      "free discount stacking calculator",
      "how to stack multiple discounts",
      "percentage and fixed discount calculator",
      "what is the best discount order",
    ],
    seoTitle: "Discount Stacking Calculator: See How Order Changes the Price",
    seoDescription:
      "A free discount stacking calculator that applies percent and fixed discounts in the order you list them, so you can see exactly how order changes the final price.",
  },

  fields: [
    {
      kind: "number",
      token: "originalPrice",
      label: "Original price",
      help: "The price before any discounts are applied, in dollars.",
      placeholder: "100",
      example: 100,
      min: 0,
      step: 0.01,
      prefix: "$",
    },
    {
      kind: "list",
      token: "discounts",
      label: "Discounts to stack, in the order they apply",
      itemLabel: "discount",
      min: 1,
      max: 8,
      fields: [
        {
          kind: "select",
          token: "type",
          label: "Discount type",
          options: [
            { value: "percent", label: "Percent off" },
            { value: "fixed", label: "Fixed amount off" },
          ],
          example: "percent",
        },
        {
          kind: "number",
          token: "value",
          label: "Discount value",
          help: "A percent such as 20, or a dollar amount such as 5, depending on the type chosen above.",
          example: 20,
          min: 0,
          step: 0.01,
        },
      ],
      example: [
        { type: "percent", value: 20 },
        { type: "fixed", value: 5 },
      ],
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Sequential percentage and fixed-amount discount arithmetic"],
    testingNote:
      "Verified against known correct hand-worked cases before publishing, including the same two discounts applied in both possible orders to confirm they produce two different final prices, and a fixed discount larger than the remaining price to confirm it caps at $0 rather than going negative.",
  },

  article: {
    intro: [
      "A discount stacking calculator answers a question a single discount field cannot: what happens to a price when more than one discount applies, in a specific order. A 20 percent off code and a 5 dollar off coupon do not combine into one flat number. The result depends entirely on which one runs first, because a percentage taken off a smaller remaining balance removes fewer dollars than the same percentage taken off the full price.",
      "This tool applies each discount in the exact order it is listed, one at a time, against whatever price is left after the discount before it. That is what stacking actually means in a checkout: a promo code layered on top of a loyalty discount, layered on top of a clearance markdown, each one working on the number the previous one left behind, not on the original sticker price.",
    ],

    sections: [
      {
        heading: "How a discount stacking calculator applies more than one discount",
        body: [
          "Each row entered into the calculator is either a percent off or a fixed dollar amount off. A percent row multiplies the current price by that percentage and subtracts the result. A fixed row subtracts a flat dollar figure regardless of the current price. Both types can appear in any order and any combination, which is what makes the tool useful for a real checkout rather than a single-discount estimate.",
          "The price used for each row is the price left over after every row before it, not the original price entered at the top. That single detail is why two people applying the exact same two discounts can land on two different final numbers, depending only on the order they typed them in.",
        ],
      },
      {
        heading: "Why the order of percent and fixed discounts changes the final price",
        body: [
          "Take a 100 dollar item with a 20 percent discount and a 5 dollar discount. Apply the percentage first: 100 dollars becomes 80 dollars, then the flat 5 comes off that, landing on 75 dollars. Apply the fixed discount first instead: 100 dollars becomes 95 dollars, then 20 percent comes off that larger remaining balance, landing on 76 dollars. Same two discounts, same two numbers, one dollar apart, purely because of order.",
          "That gap grows with a bigger percentage or a bigger fixed amount, and again once a third or fourth discount is stacked on top. A percentage discount always removes more in absolute dollars against a larger balance, so applying the biggest percentage as early as possible, before a fixed discount shrinks the balance it is calculated against, tends to save the most.",
        ],
        list: [
          "Percent first, then fixed: the percentage is calculated on the full price",
          "Fixed first, then percent: the percentage is calculated on a smaller, already-reduced price",
          "Two percentages in either order: the result is the same, since multiplication is commutative",
        ],
      },
      {
        heading: "How to stack multiple discounts without the math going wrong",
        body: [
          "The most common mistake in manual discount stacking is adding the percentages together before applying them, treating a 20 percent code and a 10 percent code as one flat 30 percent discount. That is not what happens at checkout: each discount is applied to whatever balance remains after the one before it, so the two remove less in total than one 30 percent discount would.",
          "A second mistake is applying a fixed discount to the pre-tax subtotal in one calculation and the post-discount subtotal in another. Working through the rows one at a time avoids both mistakes, since there is only ever one current price at any point in the calculation.",
        ],
      },
      {
        heading: "A percentage and fixed discount calculator for stacked coupon codes",
        body: [
          "Retail checkouts routinely combine a percentage off promo code with a fixed dollar off loyalty credit. A percentage and fixed discount calculator that only accepts one type cannot model that combination, which is why this tool treats every row the same way and allows either type in any sequence.",
          "The same logic covers business to business pricing, where a volume discount, an early payment discount and a promotional code can all apply to one invoice line. The arithmetic is identical to a retail checkout; only the labels on the discounts change.",
        ],
      },
      {
        heading: "What happens when a fixed discount is larger than the price",
        body: [
          "A fixed dollar discount does not know how much is left on the price when it runs. If earlier discounts have already brought a 40 dollar item down to 8 dollars, and the next row is a 10 dollar fixed discount, a naive calculation would show a negative 2 dollar price, which is not a real outcome.",
          "This calculator caps the price at 0 dollars the moment any discount would take it below that, and flags it in the result rather than showing a negative number. Any rows still left in the list after that point have nothing further to reduce, since the price cannot go lower than free.",
        ],
      },
      {
        heading: "What is the best discount order for a retailer to offer",
        body: [
          "From a shopper's side, the best order is whichever produces the lowest final price, and running the same discounts through this calculator both ways shows that directly. From a retailer's side, the decision usually runs the other way: stacking rules are often set deliberately, applying the smallest discount first and the largest last, or excluding some discounts from a clearance price entirely.",
          "A shopper checking whether a stack of codes is worth using benefits from seeing the real final number rather than guessing at a combined percentage, and a retailer setting a stacking order benefits from seeing how much margin a given order gives away.",
        ],
      },
    ],

    howTo: {
      name: "How to use the discount stacking calculator",
      steps: [
        {
          name: "Enter the original price",
          text: "Use the price before any discount is applied, including a previous markdown if that reduced price is the real starting point for this stack.",
        },
        {
          name: "Add each discount as its own row",
          text: "Choose percent or fixed for each one and enter its value. A 20 percent code is entered as 20 under percent; a 5 dollar coupon is entered as 5 under fixed.",
        },
        {
          name: "Put the rows in the order they will actually apply",
          text: "Checkout systems apply discounts in a specific sequence, usually the order codes are entered or a fixed rule the retailer sets. Match that order here to get the real final price rather than an estimate.",
        },
        {
          name: "Read the final price, total saved and effective discount",
          text: "The effective discount is the total saved as one percentage of the original price, useful for comparing a stack of discounts against a single flat offer.",
        },
      ],
    },

    faq: [
      {
        question: "Does a free discount stacking calculator like this one store or send my prices anywhere?",
        answer:
          "No. Every field on this page stays in the browser while it is open and is never transmitted anywhere, so an original price, a discount value or a final result never leaves the device it was typed into. The calculation runs client side using ordinary arithmetic.",
      },
      {
        question: "Why do two 20 percent discounts not equal one 40 percent discount?",
        answer:
          "The second 20 percent discount is calculated on the price left after the first, which is already smaller than the original price. Two sequential 20 percent discounts remove 36 percent of the original price in total, not 40 percent, since the second discount has a smaller base to work from.",
      },
      {
        question: "Can I use this to check a coupon stack before I get to checkout?",
        answer:
          "Yes. Entering the listed price and each coupon as its own row, in the order the store applies them, shows the final price checkout should land on. If the actual total does not match, that is a sign the store applied the discounts in a different order, or excluded one from stacking entirely.",
      },
      {
        question: "What happens if I enter a discount value as a negative number?",
        answer:
          "The calculator rejects it and asks for a non-negative value instead of silently increasing the price. A negative percent or fixed value is never a real discount, so treating it as invalid input prevents a result that looks correct but is not.",
      },
      {
        question: "Is there a limit to how many discounts can be stacked?",
        answer:
          "The calculator accepts up to eight discount rows in one pass, comfortably covering a promo code, a loyalty credit, a referral bonus and a clearance markdown together. Each row is applied in sequence exactly as described above, regardless of how many are added.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description: "For writing the promotion once the final stacked price is known.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description: "For announcing a stacked discount to a subscriber list with the correct final number.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For responding to a buyer asking whether a discount can be combined with another one.",
      },
      {
        href: "/tools/utm-link-builder",
        label: "UTM link builder",
        description: "For tagging the checkout link once the stacked discount is confirmed, to track which channel drove the redemption.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/legal-library/browse/rules/deceptive-pricing",
        label: "FTC: Guides Against Deceptive Pricing",
        description: "The federal guidance on how sale and discount price claims must be presented accurately.",
      },
      {
        href: "https://www.nist.gov/pml/owm/national-legal-metrology/us-retail-pricing-laws-and-regulations",
        label: "NIST: A Guide to U.S. Retail Pricing Laws and Regulations",
        description: "How retail pricing accuracy, including discounted pricing, is regulated at the point of sale.",
      },
      {
        href: "https://www.gov.uk/government/publications/price-transparency-cma209",
        label: "GOV.UK / CMA: Price transparency guidance",
        description: "UK guidance on presenting discounts and reference prices so a stated saving is genuine.",
      },
    ],
  },

  tags: ["marketing", "discount", "pricing", "promo", "coupon"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
