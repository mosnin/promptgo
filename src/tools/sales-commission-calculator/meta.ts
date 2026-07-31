import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "sales-commission-calculator",
  name: "Sales Commission Calculator",
  title: "Sales Commission Calculator",
  category: "sales-pricing-tools",
  summary:
    "Turns a total sales amount into commission earned, either at one flat rate or across a marginal tier where a bonus rate applies only to the portion of the sale above a threshold, the same shape as a tax bracket.",

  seo: {
    primaryKeyword: "sales commission calculator",
    keywords: [
      "sales commission calculator",
      "free sales commission calculator",
      "tiered commission calculator",
      "how to calculate sales commission",
      "commission calculator for sales reps",
    ],
    seoTitle: "Sales Commission Calculator: Flat And Tiered Rates",
    seoDescription:
      "A free sales commission calculator that works in flat-rate or tiered mode, paying a bonus rate only on the sales amount above your threshold.",
  },

  fields: [
    {
      kind: "number",
      token: "salesAmount",
      label: "Total sales amount",
      help: "The full value of the sale or the sales period this commission is being calculated on.",
      placeholder: "50000",
      example: 50000,
      min: 0.01,
      step: 0.01,
      prefix: "$",
    },
    {
      kind: "number",
      token: "baseCommissionPercent",
      label: "Base commission rate (%)",
      help: "The standard rate paid on the sales amount, or on the portion up to the bonus threshold if one is set.",
      placeholder: "8",
      example: 8,
      min: 0,
      max: 100,
      step: 0.1,
      suffix: "%",
    },
    {
      kind: "number",
      token: "bonusThresholdAmount",
      label: "Bonus tier threshold",
      help: "Sales above this amount earn the bonus rate instead of the base rate. Leave at 0 to disable tiered commission and use a single flat rate.",
      placeholder: "30000",
      example: 30000,
      min: 0,
      step: 0.01,
      prefix: "$",
    },
    {
      kind: "number",
      token: "bonusCommissionPercent",
      label: "Bonus tier rate (%)",
      help: "Only applies to the portion of sales above the threshold",
      placeholder: "12",
      example: 12,
      min: 0,
      max: 100,
      step: 0.1,
      suffix: "%",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Marginal-tier commission arithmetic, the same structure as a progressive tax bracket"],
    testingNote:
      "Verified against hand calculated cases covering flat-rate mode with the threshold at $0, a tiered sale that crosses the threshold and splits across both rates, a sale that stays under the threshold so the bonus rate never applies, and a sale landing exactly on the threshold boundary, alongside rejected cases for a zero sales amount and an out-of-range commission percentage.",
  },

  article: {
    intro: [
      "A sales commission calculator turns a total sales figure into the actual dollar amount a rep earns, and the arithmetic changes depending on whether the plan pays one flat rate or a tiered rate that kicks in above a target. Leave the bonus threshold at $0 for a single flat rate, or set a threshold and a bonus rate to see how much of a sale falls into each tier.",
      "The tiered mode here uses a marginal calculation, meaning the bonus rate applies only to the slice of the sale above the threshold, not the whole sale once crossed. That distinction changes the commission by hundreds or thousands of dollars depending on how far over the threshold the sale lands.",
      "Every figure entered stays in the browser and is never transmitted anywhere, so the calculator can be checked against a real deal without sending a real number to a server.",
    ],

    sections: [
      {
        heading: "How the sales commission calculator works",
        body: [
          "Four numbers go in: the total sales amount, the base commission rate, an optional bonus tier threshold, and the bonus rate above it. At $0, tiering is switched off and the calculator pays the base rate on the full sales amount, the simplest structure for a straight commission plan.",
          "When a threshold greater than $0 is entered, a sale below it is paid entirely at the base rate, since the bonus tier was never reached. A sale above it splits into two pieces, each at a different rate, added together for the total commission.",
        ],
      },
      {
        heading: "Flat rate versus tiered commission: switching modes with one field",
        body: [
          "The bonus tier threshold field switches the calculator between the two structures. At $0, every dollar earns the same base rate, and the bonus rate field is ignored. This matches a flat commission plan, common on retail or inside sales roles where every sale is worth the same percentage.",
          "Setting the threshold above $0 turns on tiered commission, rewarding a rep with a higher rate once a sale clears a set point. This is common on quota-based plans, where hitting a monthly or quarterly number unlocks a richer rate on everything sold past that point.",
        ],
      },
      {
        heading: "Marginal tier commission versus a flat bonus on the whole sale",
        body: [
          "This is the single most important thing to check on a real commission plan, because two structures that sound identical produce different paychecks. A marginal tier structure, which is what this calculator computes, pays the base rate only on the portion of the sale up to the threshold and the bonus rate only on the portion above it, the same shape as a progressive tax bracket where a higher rate never applies retroactively to money already taxed at a lower one.",
          "A flat-bonus structure instead pays the bonus rate on the entire sale once the threshold is crossed, including the part already under it. On a $50,000 sale with an 8 percent base rate, a 12 percent bonus rate and a $30,000 threshold, the marginal version pays $4,800: $2,400 on the first $30,000 and $2,400 on the remaining $20,000. A flat-bonus version of the same plan would pay 12 percent on the full $50,000, or $6,000, a $1,200 difference on one sale.",
        ],
        list: [
          "Marginal tier: bonus rate applies only to the amount above the threshold",
          "Flat bonus: bonus rate applies to the entire sale once the threshold is crossed",
          "Same threshold and same two rates can produce very different commission depending on which structure a plan actually uses",
        ],
      },
      {
        heading: "How to calculate sales commission by hand",
        body: [
          "How to calculate sales commission without a tool starts the same way this calculator does: multiply the sales amount by the commission rate. In flat mode that is the entire calculation. In tiered mode, split the sale first, multiply the base-rate portion and the bonus-rate portion separately, then add the two results.",
          "A rep checking a paycheck by hand should confirm which structure the plan specifies first, since assuming the marginal version on a plan that pays flat-bonus produces a number that will not match what finance calculates.",
        ],
      },
      {
        heading: "Why the effective commission rate matters more than the headline number",
        body: [
          "The effective commission rate is the total commission divided by the total sales amount, as a percentage. On a flat-rate sale it equals the base rate exactly. On a tiered sale, it lands between the base rate and the bonus rate, closer to whichever rate applies to more of the sale.",
          "That blended figure is useful for comparing sales of different sizes, or for a rep estimating what a bigger deal would be worth once it crosses into the bonus tier, rather than assuming the bonus rate applies to money it never touches.",
        ],
      },
      {
        heading: "A free sales commission calculator for tiered and flat-rate plans",
        body: [
          "This commission calculator for sales reps and sales managers covers the two structures that show up most in a real compensation plan without a spreadsheet: a single flat rate for straightforward plans, and a tiered commission calculator mode for plans built around a quota or target.",
          "Every result includes the effective rate and, in tiered mode, how much of the sale was paid at each rate, so the split behind the total commission is visible rather than hidden inside one number.",
        ],
      },
    ],

    howTo: {
      name: "How to use the sales commission calculator",
      steps: [
        {
          name: "Enter the total sales amount",
          text: "Use the full value of the sale or the sales period this commission covers.",
        },
        {
          name: "Enter the base commission rate",
          text: "The standard percentage paid on the sale, or on the portion up to the bonus threshold if tiering is used.",
        },
        {
          name: "Set the bonus tier threshold, or leave it at $0",
          text: "Leave it at $0 for a single flat rate. Enter an amount to switch on tiered commission above that point.",
        },
        {
          name: "Enter the bonus tier rate",
          text: "Only used once a threshold is set. This rate applies to the portion of the sale above the threshold.",
        },
        {
          name: "Read the total commission and the effective rate",
          text: "In tiered mode, check the two tier amounts shown alongside the total to see how the sale split between rates.",
        },
      ],
    },

    faq: [
      {
        question: "Does a free sales commission calculator like this one store or transmit my sales figures?",
        answer:
          "No. Every number entered stays in the browser and is never sent anywhere. The calculation runs client side using plain arithmetic, so a real sales amount or commission rate can be checked here without leaving the device it was typed into.",
      },
      {
        question: "What is the difference between a marginal tier and a flat bonus commission structure?",
        answer:
          "A marginal tier structure pays the bonus rate only on the portion of a sale above the threshold, the same way a tax bracket works. A flat-bonus structure pays it on the entire sale once crossed. This calculator computes the marginal version, so check which one your own plan uses before comparing the result to a paycheck.",
      },
      {
        question: "How do I switch the calculator to a single flat commission rate?",
        answer:
          "Leave the bonus tier threshold at $0. With no threshold set, the calculator pays the base commission rate on the entire sales amount and ignores the bonus rate field, matching a straightforward flat commission plan with no tiering.",
      },
      {
        question: "What happens if the sales amount does not reach the bonus threshold?",
        answer:
          "The entire sale is paid at the base commission rate. The bonus rate only applies to a portion of a sale that clears the threshold, so a sale that stays under it produces the same result as flat-rate mode, even with a threshold and bonus rate entered.",
      },
      {
        question: "Why does the effective commission rate differ from the base or bonus rate?",
        answer:
          "The effective rate is the total commission divided by the total sales amount, and on a tiered sale it blends both rates rather than matching either one. It sits closer to the base rate when most of the sale falls under the threshold, and closer to the bonus rate when most falls above.",
      },
      {
        question: "Can this calculator handle a sale that lands exactly on the threshold?",
        answer:
          "Yes. A sales amount equal to the threshold is treated as not yet reaching the bonus tier, so it is paid entirely at the base rate. The bonus rate applies only once the sales amount goes above the threshold, not at the boundary itself.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/roi-calculator",
        label: "ROI calculator",
        description: "For checking whether a deal's return still holds up once the commission cost is factored in.",
      },
      {
        href: "/tools/discount-stacking-calculator",
        label: "discount stacking calculator",
        description: "For finding the real sale price behind a deal before running the commission on it.",
      },
      {
        href: "/tools/markup-vs-margin-calculator",
        label: "markup vs margin calculator",
        description: "For checking that a discounted deal still clears enough margin to support the commission paid on it.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For deciding what to hold firm on in a deal once its commission value to the rep is known.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.dol.gov/general/topic/wages/commissions",
        label: "U.S. Department of Labor: Commissions",
        description: "Federal guidance on how commission-based pay works and how it interacts with wage law.",
      },
      {
        href: "https://www.law.cornell.edu/cfr/text/29/541.500",
        label: "Cornell Legal Information Institute: 29 CFR 541.500",
        description: "The federal regulation defining an outside sales employee, the classification most commission-paid sales roles fall under.",
      },
      {
        href: "https://corporatefinanceinstitute.com/resources/career/commission/",
        label: "Corporate Finance Institute: Commission",
        description: "Covers flat and ramped commission structures, the same distinction this calculator's flat and tiered modes implement.",
      },
      {
        href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
        label: "IRS: Federal Income Tax Rates And Brackets",
        description: "The published example of a marginal bracket structure, the same arithmetic shape this calculator's tiered mode uses.",
      },
    ],
  },

  tags: ["commission", "sales", "pricing", "compensation"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
