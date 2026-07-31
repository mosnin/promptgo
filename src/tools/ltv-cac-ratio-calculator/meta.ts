import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "ltv-cac-ratio-calculator",
  name: "LTV CAC Ratio Calculator",
  title: "LTV CAC Ratio Calculator",
  category: "sales-pricing-tools",
  summary:
    "Divides customer lifetime value by customer acquisition cost and returns the ratio alongside the industry context that turns it into a decision.",

  seo: {
    primaryKeyword: "ltv cac ratio calculator",
    keywords: [
      "ltv cac ratio calculator",
      "free ltv cac ratio calculator",
      "what is a good ltv cac ratio",
      "how to calculate ltv cac ratio",
      "customer lifetime value to cac calculator",
      "best ltv cac ratio for saas",
    ],
    seoTitle: "LTV CAC Ratio Calculator: Customer Value Vs Acquisition Cost",
    seoDescription:
      "A free LTV CAC ratio calculator that divides customer lifetime value by acquisition cost and explains what the ratio commonly signals for a subscription business.",
  },

  fields: [
    {
      kind: "number",
      token: "ltv",
      label: "Customer lifetime value (LTV)",
      help: "The total revenue or gross margin one customer is expected to generate over their entire relationship with the business.",
      placeholder: "1200",
      example: 1200,
      min: 0,
      step: 1,
      prefix: "$",
    },
    {
      kind: "number",
      token: "cac",
      label: "Customer acquisition cost (CAC)",
      help: "The fully loaded cost of acquiring one customer: marketing spend plus sales cost, divided by the customers acquired in the period.",
      placeholder: "300",
      example: 300,
      min: 0.01,
      step: 1,
      prefix: "$",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard lifetime value to acquisition cost ratio"],
    testingNote:
      "Verified against hand calculated cases including a clean 3:1 result, an exact 1:1 breakeven where lifetime value equals acquisition cost, a ratio below 1:1 where acquisition spend was never recovered, an uneven division that has to round to one decimal place rather than truncate, and a zero or negative acquisition cost that should return an error rather than a division result.",
  },

  article: {
    intro: [
      "An LTV:CAC ratio calculator answers one question with no room for a vague answer: for every dollar spent acquiring a customer, how many dollars of value does that customer return over the life of the relationship. Divide customer lifetime value by customer acquisition cost and the answer is a single number, expressed as a ratio against 1.",
      "That single number is what this free LTV:CAC ratio calculator is built to produce, from two inputs: lifetime value and acquisition cost. Nothing about the acquisition channel, the sales motion or the pricing tier changes the arithmetic once those two figures are known, which is exactly why the ratio travels so well between very different businesses.",
      "What the calculator will not do is tell a business whether its ratio is good. That depends on industry and margin structure, so the page states the commonly cited range as commentary, not a pass or fail grade the result is checked against.",
    ],

    sections: [
      {
        heading: "How this LTV CAC ratio calculator turns two numbers into one decision",
        body: [
          "Customer lifetime value is the total revenue, or ideally the total gross margin, one customer is expected to generate across their full relationship with the business, discounted for churn. Customer acquisition cost is the fully loaded cost of winning that one customer: marketing spend, sales salaries, tools and commissions, divided by the number of customers acquired in the period those costs cover.",
          "Divide the first by the second and the ratio says how many dollars came back for every dollar spent getting the customer in the door. A 4:1 ratio means four dollars of value for every dollar of acquisition spend; a 1:1 ratio means the acquisition spend was returned with nothing left over.",
        ],
      },
      {
        heading: "What is a good LTV CAC ratio, and why the answer is a range, not one number",
        body: [
          "What is a good LTV CAC ratio depends on who is asking. SaaS and subscription business literature commonly cites roughly 3:1 or higher as a healthy range: high enough that acquisition spend is clearly justified, not so high that the business is under-investing in growth it could otherwise afford.",
          "That figure is a widely repeated rule of thumb, not a fixed standard, and it varies by category. A hardware business, a thin-margin marketplace and a high-margin software product do not share the same healthy range, because the cost structure behind lifetime value is not the same.",
        ],
      },
      {
        heading: "How to calculate LTV CAC ratio by hand before trusting a dashboard number",
        body: [
          "How to calculate LTV CAC ratio in two steps: total the revenue or margin one customer generates over its expected lifetime to get LTV, total the fully loaded acquisition spend divided by customers won in the same period to get CAC, then divide the first figure by the second.",
          "The step most dashboards skip silently is discounting lifetime value for churn and for the time value of money on revenue collected years out. A raw revenue total without that adjustment overstates LTV, and an overstated LTV produces a ratio that looks healthier than the business actually is.",
        ],
      },
      {
        heading: "Customer lifetime value to CAC calculator: reading the ratio at different levels",
        body: [
          "A customer lifetime value to CAC calculator becomes more useful once the ratio is read at more than one level: the blended ratio across every acquisition channel, and the ratio for each channel individually. A healthy blended number can still hide one channel that is quietly losing money on every customer it brings in.",
        ],
        list: [
          "3.0:1 blended, one channel at 5.0:1 and another at 0.8:1: the losing channel needs a decision, not more blended reporting",
          "1.0:1 blended: acquisition spend is being returned with no margin left to reinvest",
          "0.5:1 blended: half of every acquisition dollar is not coming back at all",
        ],
      },
      {
        heading: "What a ratio below 1:1 actually means for the business behind it",
        body: [
          "A ratio below 1:1 means the acquisition cost of a customer was not recovered over that customer's entire lifetime, before any margin, overhead or fixed cost is even considered. That is not a warning sign to watch; it is a statement that the current acquisition motion is destroying value on every customer it produces.",
          "The fix is rarely to simply spend less. Raising lifetime value through retention, lowering acquisition cost through narrower targeting, or both, moves the ratio; cutting spend alone just slows the rate value is destroyed.",
        ],
      },
      {
        heading: "Best LTV CAC ratio for SaaS compared with other business models",
        body: [
          "The best LTV CAC ratio for SaaS businesses tends to sit higher than for models with lower gross margin, because SaaS lifetime value is usually built from recurring revenue at 70 to 90 percent margin, leaving more room above 1:1 before the number looks concerning.",
          "A retailer or a low-margin marketplace can be healthy at a lower ratio than a software business would be, simply because a smaller share of each revenue dollar was ever going to reach profit. Comparing a ratio across business models without adjusting for that is a common way the figure gets misread.",
        ],
      },
    ],

    howTo: {
      name: "How to use the LTV CAC ratio calculator",
      steps: [
        {
          name: "Total customer lifetime value",
          text: "Add up the revenue or, ideally, the gross margin one customer generates over their full expected relationship with the business, discounted for expected churn.",
        },
        {
          name: "Total customer acquisition cost",
          text: "Divide the fully loaded acquisition spend for a period, marketing plus sales cost, by the number of customers won in that same period.",
        },
        {
          name: "Enter both figures into the calculator",
          text: "Lifetime value first, acquisition cost second. Both accept decimals if the underlying figures are not round numbers.",
        },
        {
          name: "Read the ratio and the value recovered per dollar",
          text: "The headline ratio and the per-dollar figure say the same thing two ways: how many dollars, or fractions of a dollar, came back for every acquisition dollar spent.",
        },
        {
          name: "Recompute per channel before trusting one blended number",
          text: "Run the same two inputs for each acquisition channel separately. A healthy blended ratio can still be hiding one channel that is losing money on every customer.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the LTV CAC ratio calculator reject a CAC of zero or below?",
        answer:
          "Because dividing by zero has no defined result, and a negative acquisition cost is not a real input. Zero acquisition cost usually means the field was left blank or the acquisition spend for the period was not actually tracked, and reporting a ratio against a placeholder number would be worse than reporting no ratio at all.",
      },
      {
        question: "What is a good LTV CAC ratio in practice?",
        answer:
          "SaaS and subscription business literature commonly cites 3:1 or higher as healthy, but it is a widely repeated rule of thumb, not a fixed standard, and it depends on margin structure and how capital-intensive the business is. A ratio meaningfully above 3:1 can also signal under-investment in growth rather than genuine outperformance.",
      },
      {
        question: "Is a higher LTV CAC ratio always better?",
        answer:
          "Not necessarily. A very high ratio can mean a business is spending too little on acquisition relative to the value each customer is worth, leaving growth on the table that a well-funded competitor would capture. The ratio is one input into a spending decision, not the only one.",
      },
      {
        question: "Does this calculator include a discount rate for future revenue?",
        answer:
          "No. It takes lifetime value as a single input, so any discounting for churn or the time value of money has to happen before that figure is entered. A lifetime value total built from undiscounted future revenue will overstate the ratio this tool returns.",
      },
      {
        question: "How to calculate LTV CAC ratio when acquisition spans more than one channel?",
        answer:
          "Compute a blended ratio using total acquisition spend and total customers across every channel, then repeat the calculation once per channel using that channel's own spend and customers won. The two views commonly disagree, and the per-channel view is usually the more actionable one.",
      },
      {
        question: "Can the LTV CAC ratio calculator be used for a business that is not subscription based?",
        answer:
          "Yes, the arithmetic is the same for any business with a definable customer lifetime value and acquisition cost. The commonly cited 3:1 benchmark comes from SaaS and subscription literature specifically, so a non-subscription business should treat that figure as a loose reference point rather than a target.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/break-even-point-calculator",
        label: "break-even point calculator",
        description: "For checking the unit economics behind the acquisition cost feeding this ratio.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "For building a funding request around a ratio once it has been computed.",
      },
      {
        href: "/data-analysis-prompts/demand-forecasting-prompt",
        label: "demand forecasting prompt",
        description: "For forecasting the customer volume that acquisition cost and lifetime value are both built on.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description: "For identifying which customer segments are actually driving lifetime value up or down.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.forentrepreneurs.com/saas-metrics-2/",
        label: "For Entrepreneurs: SaaS Metrics 2.0",
        description: "The widely cited source of the LTV:CAC greater than 3 rule of thumb this tool's notes reference.",
      },
      {
        href: "https://www.investopedia.com/terms/c/customer-acquisition-cost.asp",
        label: "Investopedia: Customer Acquisition Cost (CAC)",
        description: "A primary reference for the acquisition cost definition and formula this tool implements.",
      },
      {
        href: "https://hbr.org/2014/10/the-right-way-to-calculate-customer-lifetime-value",
        label: "Harvard Business Review: The Right Way to Calculate Customer Lifetime Value",
        description: "Covers the lifetime value methodology and the churn discounting this tool's LTV input assumes.",
      },
      {
        href: "https://blog.hubspot.com/service/what-is-customer-lifetime-value",
        label: "HubSpot: What Is Customer Lifetime Value (CLV)?",
        description: "Practical guidance on building the lifetime value figure this ratio is calculated from.",
      },
    ],
  },

  tags: ["sales", "ltv", "cac", "unit economics", "saas metrics"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
