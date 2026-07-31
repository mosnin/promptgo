import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "markup-vs-margin-calculator",
  name: "Markup vs Margin Calculator",
  title: "Markup vs Margin Calculator",
  category: "sales-pricing-tools",
  summary:
    "Turns a cost price and a selling price into both markup and margin at once, so the two percentages never get quoted as if they were the same number.",

  seo: {
    primaryKeyword: "markup vs margin calculator",
    keywords: [
      "markup vs margin calculator",
      "markup vs margin difference",
      "how to calculate margin from markup",
      "free markup and margin calculator",
      "what is the difference between markup and margin",
    ],
    seoTitle: "Markup vs Margin Calculator: See Both Percentages At Once",
    seoDescription:
      "A free markup vs margin calculator that turns one cost price and one selling price into both percentages side by side, so the two are never confused.",
  },

  fields: [
    {
      kind: "number",
      token: "costPrice",
      label: "Cost price",
      help: "What the item actually costs to buy in or produce, before any markup is added.",
      placeholder: "40",
      example: 40,
      min: 0.01,
      step: 0.01,
      prefix: "$",
    },
    {
      kind: "number",
      token: "sellingPrice",
      label: "Selling price",
      help: "What the item actually sells for, after any standard discount, not the list price if the two differ.",
      placeholder: "60",
      example: 60,
      min: 0,
      step: 0.01,
      prefix: "$",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard markup and gross margin formulas"],
    testingNote:
      "Verified against hand calculated cases including the standard 40-to-60 sale where markup and margin diverge to 50 percent and 33.3 percent from the same profit, a round doubling case, a sale where price exactly equals cost, a loss where selling price sits below cost price, a zero or negative cost price, and a zero selling price, all checked against the standard formulas rather than against each other.",
  },

  article: {
    intro: [
      "A markup vs margin calculator exists because the two words describe the same profit from two different starting points, and mixing them up is not a rounding error, it is a different number entirely. Markup measures profit against what an item cost. Margin measures profit against what it sold for. Enter a cost price and a selling price and this tool returns both figures at once, rather than the single percentage most spreadsheets default to.",
      "This free markup and margin calculator is built for the moment a price gets quoted out loud: a supplier states a sixty percent markup, a buyer hears that as a sixty percent margin, and both sides walk away from the same sentence expecting a different profit. Seeing both figures from the same sale closes that gap before it becomes a pricing mistake.",
      "Cost price and selling price go in. Profit, markup and margin come out, restated so the difference between dividing by cost and dividing by selling price is visible rather than buried inside one percentage.",
    ],

    sections: [
      {
        heading: "How a markup vs margin calculator keeps two percentages straight",
        body: [
          "Markup and margin start from the identical number: profit, which is simply selling price minus cost price. Where they diverge is the denominator. Markup divides that profit by the cost price, answering how much was added on top of what the item cost. Margin divides the same profit by the selling price, answering what share of the final sale price is actually profit.",
          "Both are legitimate ways to describe a sale. Neither is more correct than the other. The mistake is using the two words interchangeably as though they named the same fraction, when they are two different fractions built from the same numerator.",
        ],
      },
      {
        heading: "The markup vs margin difference in one worked sale",
        body: [
          "Take an item that costs $40 to buy in or produce and sells for $60. Profit is $20 either way. As markup, that $20 is measured against the $40 cost price: $20 divided by $40 is 50 percent. As margin, the same $20 is measured against the $60 selling price: $20 divided by $60 is 33.3 percent.",
          "Fifty percent and 33.3 percent are not two roundings of one figure. They are two different numbers, both correct, both describing the exact same $20 of profit on the same $60 sale. A retailer who marks an item up 50 percent over cost is running a 33.3 percent margin business, not a 50 percent one.",
        ],
        list: [
          "$40 cost, $60 price: $20 profit, 50 percent markup, 33.3 percent margin",
          "$50 cost, $100 price: $50 profit, 100 percent markup, 50 percent margin",
          "$100 cost, $80 price: -$20 profit, -20 percent markup, -25 percent margin",
        ],
      },
      {
        heading: "How to calculate margin from markup, and markup from margin",
        body: [
          "How to calculate margin from markup without a calculator: divide the markup percentage by 100 plus the markup percentage, then multiply by 100. A 50 percent markup becomes 50 divided by 150, which is 33.3 percent margin, matching the worked example above.",
          "The reverse conversion divides margin by 100 minus margin. A 33.3 percent margin becomes 33.3 divided by 66.7, returning to 50 percent markup, since both conversions describe the same sale from different denominators.",
        ],
      },
      {
        heading: "Why margin is always smaller than markup on a profitable sale",
        body: [
          "On any sale where selling price exceeds cost price, selling price is the larger number, so dividing the same profit by it always produces a smaller percentage. Margin sits below markup on every profitable sale, and the gap widens as markup climbs: a 25 percent markup is a 20 percent margin, a 100 percent markup is a 50 percent margin, and a 300 percent markup is a 75 percent margin.",
          "This is also why margin, not markup, answers what fraction of revenue is actual profit. Quoting a markup percentage as though it were margin overstates how much of each sales dollar a business keeps.",
        ],
      },
      {
        heading: "When a sale is a loss: negative markup and negative margin",
        body: [
          "A selling price below cost price is a loss, not an invalid input, and the calculator treats it that way rather than refusing to answer. Profit comes out negative, and both markup and margin come out negative with it: at $100 cost and $80 selling price, profit is -$20, markup is -20 percent and margin is -25 percent.",
          "What the calculator does refuse is a selling price of exactly zero, since margin divides profit by selling price and division by zero has no result. A zero or negative cost price is refused for the same reason: markup divides by cost price, and there is no percentage to report against a cost never actually paid.",
        ],
      },
      {
        heading: "Common pricing mistakes a markup vs margin calculator catches",
        body: [
          "The most common mistake is quoting one figure while a listener assumes the other: a stated 40 percent markup gets copied into a spreadsheet as a 40 percent margin, and every downstream projection overstates real profit. The second most common mistake is setting a target margin and then applying it to a cost price as though it were a markup, which produces a selling price that undershoots the actual target.",
          "Running both figures from the same two inputs is a cheap way to catch either mistake before a price goes live, not after a quarter of sales has priced against the wrong assumption.",
        ],
      },
    ],

    howTo: {
      name: "How to use the markup vs margin calculator",
      steps: [
        {
          name: "Enter the cost price",
          text: "What the item costs to buy in or produce, before any markup is added.",
        },
        {
          name: "Enter the selling price",
          text: "What the item actually sells for, after any standard discount, not the list price if the two differ.",
        },
        {
          name: "Read the margin figure first",
          text: "The headline result is margin, profit as a percentage of selling price, the number that answers what share of revenue is profit.",
        },
        {
          name: "Compare it against the markup figure",
          text: "Markup, the same profit as a percentage of cost price, sits alongside it. The two only match at exactly zero percent profit.",
        },
        {
          name: "Re-run it before quoting a price out loud",
          text: "Change only the selling price and watch margin move faster than markup, the gap that causes most pricing miscommunication.",
        },
      ],
    },

    faq: [
      {
        question: "What is the difference between markup and margin?",
        answer:
          "Markup is profit expressed as a percentage of cost price: how much was added on top of what an item cost to arrive at its selling price. Margin is profit expressed as a percentage of selling price: what share of the final sale price is actually profit. Both use the same profit figure, divided by two different numbers.",
      },
      {
        question: "Why are markup and margin never the same percentage?",
        answer:
          "Because they divide identical profit by two different denominators. Markup divides profit by cost price, margin divides the same profit by selling price, and selling price is always the larger number on a profitable sale. Dividing by a larger denominator always produces a smaller percentage, which is why margin sits below markup on every sale that actually makes money.",
      },
      {
        question: "How do I calculate margin from markup?",
        answer:
          "Divide the markup percentage by 100 plus the markup percentage, then multiply the result by 100. A 50 percent markup becomes 50 divided by 150, which works out to a 33.3 percent margin. This calculator performs the conversion automatically, but the formula is useful for checking a markup figure that gets quoted verbally before it reaches a spreadsheet.",
      },
      {
        question: "Can markup and margin ever both be negative?",
        answer:
          "Yes, whenever the selling price is lower than the cost price. Profit comes out negative, and dividing a negative profit by either cost price or selling price produces a negative percentage for both. The calculator reports both figures plainly in that case rather than treating a loss as an invalid input, since a loss is a real outcome a business needs to see clearly.",
      },
      {
        question: "Why does the calculator reject a selling price of zero?",
        answer:
          "Because margin is calculated by dividing profit by the selling price, and division by zero has no defined result. A selling price of zero would also mean the item was given away rather than sold, a different kind of transaction than one with a calculable profit percentage, so the calculator returns an explicit error instead of a meaningless number.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/break-even-point-calculator",
        label: "break-even point calculator",
        description: "For turning the margin figure into the unit volume a price needs to sell before it covers fixed costs.",
      },
      {
        href: "/tools/discount-stacking-calculator",
        label: "discount stacking calculator",
        description: "For seeing how much margin a stacked discount code gives away before a price goes live.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For building a walk away price floor once the real margin behind a quote is known.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "For putting the margin figure inside a funding request alongside a priced counterfactual.",
      },
    ],

    externalLinks: [
      {
        href: "https://en.wikipedia.org/wiki/Markup_(business)",
        label: "Wikipedia: Markup (business)",
        description: "Defines markup as the difference between selling price and cost, and the formula this tool implements.",
      },
      {
        href: "https://corporatefinanceinstitute.com/resources/accounting/gross-margin/",
        label: "Corporate Finance Institute: Gross Margin Ratio",
        description: "Covers the gross margin formula, profit divided by selling price, this tool's margin figure is built on.",
      },
      {
        href: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
        label: "U.S. Small Business Administration: Write Your Business Plan",
        description: "Federal guidance on the pricing and profitability figures a business plan is normally built around.",
      },
    ],
  },

  tags: ["pricing", "markup", "margin", "finance"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
