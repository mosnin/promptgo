import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "roi-calculator",
  name: "ROI Calculator",
  title: "ROI Calculator",
  category: "sales-pricing-tools",
  summary:
    "Turns what something cost and what it returned into a single ROI percentage, with net profit shown as a plain dollar figure alongside it, including honest negative numbers when the return came in below cost.",

  seo: {
    primaryKeyword: "roi calculator",
    keywords: [
      "roi calculator",
      "how to calculate roi",
      "free roi calculator for a small business",
      "what is a good roi",
      "roi calculator for marketing campaigns",
      "return on investment calculator",
    ],
    seoTitle: "ROI Calculator: Return On Investment, Percentage And Profit",
    seoDescription:
      "A free ROI calculator that turns cost and total return into a return on investment percentage and net profit, including negative ROI when a return falls short.",
  },

  fields: [
    {
      kind: "number",
      token: "cost",
      label: "Cost",
      help: "What was spent or invested: an ad budget, a tool subscription, a project's total cost.",
      placeholder: "5000",
      example: 5000,
      min: 0.01,
      step: 1,
      prefix: "$",
    },
    {
      kind: "number",
      token: "totalReturn",
      label: "Total return",
      help: "The full value received back: revenue attributed to the spend, or the total sale value of an investment.",
      placeholder: "8000",
      example: 8000,
      min: 0,
      step: 1,
      prefix: "$",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard ROI formula: (net profit / cost) x 100"],
    testingNote:
      "Verified against hand calculated cases including a clear profit, a total return that exactly equals cost for a 0% break-even result, a total return below cost that produces a negative ROI rather than an error, and a cost of zero rejected outright because dividing by zero is undefined rather than merely an unusual input.",
  },

  article: {
    intro: [
      "An ROI calculator answers one question in a single percentage: for every dollar that went in, how much came back out. This free ROI calculator for a small business turns a cost and a total return into the ROI percentage and the net profit in dollars, shown side by side so nothing about how the percentage was reached stays hidden.",
      "The formula behind it is the standard one, not a house variant: net profit is total return minus cost, and ROI is net profit divided by cost, multiplied by 100. That is the same calculation a marketing budget review or a small equipment purchase would use, so a number from this tool matches one worked out by hand.",
      "The one thing this tool refuses to do is disguise a loss as an error. If the total return comes in under the cost, the result is a negative percentage, stated plainly, because a loss is a real answer and not a broken input.",
    ],

    sections: [
      {
        heading: "What the roi calculator actually computes",
        body: [
          "Two numbers go in: cost, meaning what was spent or invested, and total return, meaning the full value that came back from it. From those two, net profit is total return minus cost, and ROI is net profit divided by cost, expressed as a percentage.",
          "A $5,000 spend that returned $8,000 has a $3,000 net profit and a 60 percent ROI: every dollar spent returned an extra 60 cents. The same $3,000 profit on a $30,000 spend would only be a 10 percent ROI, which is why net profit alone is a poor way to compare investments of different sizes.",
        ],
      },
      {
        heading: "How to calculate ROI by hand, and why cost cannot be zero",
        body: [
          "How to calculate ROI in two steps: subtract cost from total return to get net profit, then divide that net profit by cost and multiply by 100. A $2,000 spend returning $2,600 has a $600 profit and a 30 percent ROI.",
          "Cost sits in the denominator of that division, which is why this tool rejects a cost of zero outright rather than returning a number. Dividing by zero has no defined result, and a cost that is entered as zero almost always means the real spend was left out rather than that the investment genuinely cost nothing.",
        ],
      },
      {
        heading: "What is a good ROI depends entirely on what is being measured",
        body: [
          "What is a good ROI has no single universal answer, since the number that counts as strong varies by category: a paid ad campaign, a piece of equipment with a multi-year payback, and a short freelance project carry different baseline expectations for a healthy return.",
          "A useful habit is comparing an ROI against the next best use of the same money and against the time it took to earn, rather than against a number from an unrelated industry. A 20 percent ROI earned in one month reads very differently from the same 20 percent earned over three years.",
        ],
      },
      {
        heading: "When ROI is negative: reading a loss without flinching from it",
        body: [
          "A negative ROI means the total return came in below the cost, and it is a legitimate, common result rather than a sign that the inputs were entered wrong. A $4,000 spend that only returned $3,000 has a negative $1,000 net profit and a negative 25 percent ROI.",
          "The calculator shows that negative percentage exactly as computed, with no rounding toward zero and no substituted message. Treating a loss as an error would hide the one case where seeing the real number matters most: deciding whether to keep funding something that is losing money.",
        ],
      },
      {
        heading: "Using an roi calculator for marketing campaigns and other recurring spend",
        body: [
          "Using this roi calculator for marketing campaigns usually means running it once per channel or per campaign, with cost as the full spend for the period and total return as the revenue that spend can be credibly attributed to, not total company revenue for the same period.",
          "The same two-field shape works for a software subscription measured against the hours it saves, or a piece of equipment measured against the revenue it enables. Whatever the category, the discipline is the same: only count return that would not have happened without the cost.",
        ],
      },
      {
        heading: "Net profit versus ROI: why this tool shows both",
        body: [
          "Net profit and ROI answer different questions on this return on investment calculator, and both belong in the same result: net profit is the raw dollar amount, useful for knowing whether an investment is worth running at all, while ROI is the normalised percentage, useful for comparing investments of different sizes.",
          "A $50,000 net profit sounds decisive until the ROI shows it came from a $2,000,000 cost, only 2.5 percent. Showing both figures together, rather than collapsing to one, keeps a big dollar number from being mistaken for a strong return.",
        ],
      },
    ],

    howTo: {
      name: "How to use the ROI calculator",
      steps: [
        {
          name: "Enter the cost",
          text: "The full amount spent or invested: an ad budget, a subscription cost, a project's total spend. This has to be greater than zero.",
        },
        {
          name: "Enter the total return",
          text: "The full value received back: attributed revenue, a sale price, or the measurable benefit the cost produced.",
        },
        {
          name: "Read the ROI percentage",
          text: "The headline figure is net profit divided by cost, as a percentage. Zero percent means the investment broke even exactly.",
        },
        {
          name: "Check net profit alongside it",
          text: "The dollar figure below the percentage shows whether the raw scale of the return is meaningful on its own, not just as a ratio.",
        },
        {
          name: "Re-run it for each cost and return pair separately",
          text: "Comparing two investments means running the calculator twice and comparing the two ROI percentages, not combining costs and returns together first.",
        },
      ],
    },

    faq: [
      {
        question: "What is the ROI formula this calculator uses?",
        answer:
          "ROI equals net profit divided by cost, multiplied by 100, where net profit is total return minus cost. This is the standard return on investment formula used across finance and marketing, so a result from this tool will match a hand calculation using the same two input numbers.",
      },
      {
        question: "Why does the calculator reject a cost of zero?",
        answer:
          "Cost is the denominator in the ROI formula, and dividing by zero has no defined mathematical result. A cost entered as zero almost always means the actual spend was left out of the input rather than that the investment genuinely had no cost, so the calculator returns an error instead of a meaningless number.",
      },
      {
        question: "Is a negative ROI an error?",
        answer:
          "No. A negative ROI means the total return came in below the cost, which is a real and fairly common outcome, not an invalid input. The calculator reports the exact negative percentage rather than substituting an error message, because knowing the size of a loss is often more useful than a warning that one exists.",
      },
      {
        question: "What is a good ROI for a marketing campaign?",
        answer:
          "There is no single number that applies everywhere; a good ROI depends on the channel, the time period the return took to arrive, and what the next best use of the same budget would have earned instead. A useful check is comparing the ROI against a realistic alternative use of the money rather than against a generic industry benchmark.",
      },
      {
        question: "Does total return mean revenue, or profit?",
        answer:
          "Total return should be the full value received back before cost is subtracted, the same way revenue is counted before expenses. The calculator subtracts cost from it internally to get net profit, so entering an already-profit figure as total return would subtract cost twice and understate the ROI.",
      },
      {
        question: "Can this calculator be used for a non-marketing investment, like equipment?",
        answer:
          "Yes. The formula is identical regardless of category: cost is what was spent, total return is the full measurable value that spend produced over the period being evaluated, whether that is equipment, a course, a software subscription, or a marketing campaign. Only the labels attached to the two numbers change.",
      },
      {
        question: "How is ROI different from net profit?",
        answer:
          "Net profit is the raw dollar difference between total return and cost, while ROI expresses that same difference as a percentage of cost. Two investments can share an identical net profit dollar figure while having very different ROI percentages if their costs were different sizes, which is why the calculator always shows both together.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/break-even-point-calculator",
        label: "break-even point calculator",
        description: "For finding the unit volume a cost has to sell before an investment's ROI turns positive.",
      },
      {
        href: "/tools/discount-stacking-calculator",
        label: "discount stacking calculator",
        description: "For checking how a promotional discount changes the total return side of an ROI calculation.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For deciding what to hold firm on once a deal's ROI floor is known.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "For putting an ROI figure inside a funding request alongside a priced counterfactual.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.investopedia.com/terms/r/returnoninvestment.asp",
        label: "Investopedia: Return On Investment (ROI)",
        description: "A primary reference for the ROI definition and the standard formula this tool implements.",
      },
      {
        href: "https://corporatefinanceinstitute.com/resources/valuation/return-on-investment-roi-formula/",
        label: "Corporate Finance Institute: ROI Formula",
        description: "Covers the ROI formula and how net profit and cost combine into the percentage this tool reports.",
      },
      {
        href: "https://www.score.org/resource/blog-post/how-calculate-return-investment-roi",
        label: "SCORE: How To Calculate Return On Investment",
        description: "Small business mentoring guidance on applying the ROI formula to a real marketing or equipment spend.",
      },
      {
        href: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
        label: "U.S. Small Business Administration: Write Your Business Plan",
        description: "Federal guidance on the financial projections an ROI figure is normally used to support.",
      },
    ],
  },

  tags: ["roi", "return on investment", "pricing", "finance"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
