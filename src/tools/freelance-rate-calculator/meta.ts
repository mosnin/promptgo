import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "freelance-rate-calculator",
  name: "Freelance Rate Calculator",
  title: "Freelance Rate Calculator",
  category: "career-finance-tools",
  summary:
    "Turns a monthly income target, a real work week and an overhead percentage into the hourly and day rate floor that actually reaches it, with every step of the arithmetic shown.",

  seo: {
    primaryKeyword: "freelance rate calculator",
    keywords: [
      "freelance rate calculator",
      "how to calculate a freelance hourly rate",
      "free freelance rate calculator for self employed workers",
      "how many billable hours per year should i count",
      "what is a good freelance hourly rate to charge",
      "freelance rate calculator vs freelance rate prompt",
    ],
    seoTitle: "Freelance Rate Calculator: Hourly And Day Rate Floor",
    seoDescription:
      "A free freelance rate calculator that turns a monthly income target, work week and overhead percentage into the hourly and day rate floor that reaches it.",
  },

  fields: [
    {
      kind: "number",
      token: "monthlyIncomeTarget",
      label: "Monthly income target",
      help: "The take-home pay you want to end up with each month, after the overhead percentage below already accounts for costs and taxes set aside.",
      placeholder: "6000",
      example: 6000,
      min: 0.01,
      step: 1,
      prefix: "$",
    },
    {
      kind: "number",
      token: "workDaysPerWeek",
      label: "Work days per week",
      help: "How many days a week you work, whether or not every one of them ends up fully billable.",
      placeholder: "5",
      example: 5,
      min: 1,
      max: 7,
      step: 1,
    },
    {
      kind: "number",
      token: "billableHoursPerDay",
      label: "Billable hours per day",
      help: "Hours actually billed to clients on a working day, not hours spent at the desk. Admin, email and pitching are not billable hours.",
      placeholder: "6",
      example: 6,
      min: 0.5,
      max: 16,
      step: 0.5,
      suffix: "hrs",
    },
    {
      kind: "number",
      token: "weeksOffPerYear",
      label: "Weeks off per year",
      help: "Vacation, sick leave and any other unpaid time off, in weeks.",
      placeholder: "4",
      example: 4,
      min: 0,
      max: 51,
      step: 1,
    },
    {
      kind: "number",
      token: "overheadPercent",
      label: "Overhead percent",
      help: "Business costs, taxes set aside, and unbillable admin time, as a percent of revenue that never becomes take-home pay.",
      placeholder: "20",
      example: 20,
      min: 0,
      max: 95,
      step: 1,
      suffix: "%",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Annual income gross-up formula divided by billable hours per year"],
    testingNote:
      "Verified against hand calculated cases including a zero overhead input, an overhead percentage near the 95 percent cap, a four day work week, weeksOffPerYear set to its 51 week boundary, and a fractional billable hours per day figure, alongside inputs rejected outright when overhead percent or weeks off would leave no working capacity to divide by.",
  },

  article: {
    intro: [
      "A freelance rate calculator that returns a comfortable sounding number has usually skipped a step. This one works backward from a monthly income target through the days and hours actually available to bill, and forward through the overhead that eats into revenue, so the rate it returns is a real floor rather than a guess borrowed from a forum thread.",
      "Five numbers go in: monthly take-home target, the work week, how many of a working day's hours are genuinely billable, weeks off per year, and the share of revenue lost to overhead. One hourly rate and one day rate come out, alongside billable hours per year and the gross annual revenue those rates are built on.",
      "This free freelance rate calculator for self employed workers is deliberately narrow about what it claims. It states a floor, not a market rate, and assumes nothing about tax brackets or typical overhead percentages, because both vary by year, location and trade.",
    ],

    sections: [
      {
        heading: "How the freelance rate calculator turns five inputs into an hourly rate",
        body: [
          "The calculation runs in a fixed order. Monthly income target is multiplied by twelve. Weeks off per year is subtracted from fifty two to get billable weeks, multiplied by work days per week for billable days, multiplied again by billable hours per day for billable hours per year.",
          "Annual income target is then grossed up by overhead percent: if twenty percent of revenue goes to overhead, the business needs to bring in more than the take-home target so the remaining eighty percent still covers it. That gross revenue figure, divided by billable hours per year, is the hourly rate. Multiplying it back out by billable hours per day gives the day rate.",
        ],
      },
      {
        heading: "How to calculate a freelance hourly rate by hand, and where the errors creep in",
        body: [
          "How to calculate a freelance hourly rate by hand follows the same lines the calculator runs, and the two places people get it wrong are always the same: the billable hours figure and the overhead percentage.",
          "Dividing a target income straight by the hours in a normal working year, with no deduction for time off or unbillable hours, produces a rate that looks achievable and is not. The gap between hours at the desk and hours billed compounds across fifty two weeks into a different denominator.",
        ],
      },
      {
        heading: "Billable hours per day is not hours at the desk",
        body: [
          "How many billable hours per year should I count is the question this field exists to answer honestly. Billable hours per day means hours a client is actually paying for, not the length of a working day. Email, invoicing, proposals and unpaid pitching all belong outside that number, even though they fill real hours in the week.",
          "A person working an eight hour day might genuinely bill five or six once the rest is accounted for. Entering eight instead of the honest billable figure is the single most common way this calculator's output ends up too low to actually work.",
        ],
      },
      {
        heading: "Weeks off, overhead, and why the math never assumes a tax rate",
        body: [
          "Weeks off per year covers vacation, sickness and any other stretch with no billing, capped below fifty two so at least one working week remains. Overhead percent covers business costs, taxes set aside and unbillable admin time together, capped below one hundred so the gross-up division never reaches zero.",
          "Neither field carries a default. A typical self employment tax rate, overhead percentage, or benchmark number of vacation weeks would all be stale the moment they were written down, so both are left entirely to what is actually entered.",
        ],
      },
      {
        heading: "What is a good freelance hourly rate to charge above this floor",
        body: [
          "What is a good freelance hourly rate to charge is a different question from what this calculator answers. The number here is the point below which taking on work leaves you worse off than leaving the hour unbilled; it is not a recommendation for what to actually quote a client.",
          "A workable rate sits above the floor, with room for a slow month, a late payer, or a week with no billable hours. Treating the floor as the price leaves nothing in reserve.",
        ],
      },
      {
        heading: "Freelance rate calculator vs freelance rate prompt: which to use when",
        body: [
          "Freelance rate calculator vs freelance rate prompt is really a question about the shape of the answer needed. This calculator does the identical arithmetic behind both tools and shows the working: five numbers in, one hourly rate and one day rate out, recomputed instantly whenever a figure changes.",
          "The freelance rate prompt runs the same reasoning through a model instead, and fits better when a project also needs a written scope, named exclusions, and a change trigger alongside the rate. Reaching for the calculator first, then the prompt for the quote, is a reasonable way to use both.",
        ],
      },
    ],

    howTo: {
      name: "How to use the freelance rate calculator",
      steps: [
        {
          name: "Set the monthly income target",
          text: "Enter the take-home pay you want each month. Overhead is grossed up separately below, so this should be what lands in your pocket, not total billing.",
        },
        {
          name: "Enter your real work week and time off",
          text: "Work days per week and weeks off per year should reflect an honest year, including weeks that typically go unbooked.",
        },
        {
          name: "Enter billable hours per day honestly",
          text: "Count only hours a client is actually paying for. Admin, email and unpaid pitching do not belong in this figure.",
        },
        {
          name: "Set the overhead percentage",
          text: "Combine business costs, taxes set aside and unbillable admin time into one percentage of revenue, using your own figures rather than a guess.",
        },
        {
          name: "Read the hourly and day rate, then price above them",
          text: "Both figures are a floor, not a quote. A workable price sits above them, with room for a slow month or a late payer built in deliberately.",
        },
      ],
    },

    faq: [
      {
        question: "Is the hourly rate this calculator returns the rate I should actually charge?",
        answer:
          "No. It is the floor below which billing work leaves you worse off than not working, once income target, time off and overhead are all accounted for. A workable quote normally sits above that floor, with margin for a slow month, a late payer or a week with no billable hours, none of which the floor has room for on its own.",
      },
      {
        question: "What counts as overhead percent?",
        answer:
          "Anything that turns revenue into something other than take-home pay: software, insurance, an accountant, a coworking desk, taxes set aside, and the share of time spent on admin rather than billable work. There is no default built into the calculator, since a typical overhead share varies enormously by trade and location and would be wrong for most people if assumed.",
      },
      {
        question: "Why does billable hours per day matter more than hours worked per day?",
        answer:
          "Because the rate is only meaningful if the hours it is divided across are hours a client actually pays for. An eight hour working day commonly includes several hours of email, admin, invoicing and unpaid pitching a client never sees a bill for, and counting those hours as billable understates the true rate needed to hit the income target.",
      },
      {
        question: "Does this calculator use a fixed self employment tax rate?",
        answer:
          "No, and deliberately so. Self employment tax, income tax and any other contributions belong inside the overhead percent field as your own figure, since the real rate depends on country, income level and year, all of which change in ways a constant built into a calculator would quickly get wrong.",
      },
      {
        question: "What is the difference between this calculator and the freelance rate prompt?",
        answer:
          "They run the identical arithmetic and produce the same floor from the same inputs. This calculator shows the working instantly as numbers change, while the freelance rate prompt produces a written result including a scoped project price, named exclusions and a change trigger clause, more useful when a specific project needs a full quote rather than just the underlying rate.",
      },
      {
        question: "Why does the calculator reject weeksOffPerYear at 52 or overhead percent at 100?",
        answer:
          "Both values would divide the underlying calculation by zero or leave nothing to divide by: fifty two weeks off leaves no working weeks in the year, and one hundred percent overhead leaves no revenue that ever becomes take-home pay. Rather than return an infinite number, the calculator states plainly that the inputs leave no working capacity to calculate a rate from.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/freelance-rate-prompt",
        label: "freelance rate prompt",
        description: "The AI prompt version of the identical arithmetic, extended into a full scoped project quote.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description: "The employed equivalent, where the number to defend comes from a market band rather than your own costs.",
      },
      {
        href: "/tools/roi-calculator",
        label: "roi calculator",
        description: "For checking whether a project priced at this rate actually returned more than it cost once it wrapped.",
      },
      {
        href: "/tools/break-even-point-calculator",
        label: "break-even point calculator",
        description: "For the same floor-finding logic applied to a priced product instead of a billed hour.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
        label: "IRS: Self-Employment Tax (Social Security and Medicare Taxes)",
        description: "Federal guidance on the self employment tax rate this calculator deliberately leaves as an input rather than a constant.",
      },
      {
        href: "https://www.bls.gov/oes/current/oes_nat.htm",
        label: "U.S. Bureau of Labor Statistics: Occupational Employment and Wage Statistics",
        description: "A primary source for comparing a computed rate against published wage data by occupation, rather than an assumed benchmark.",
      },
      {
        href: "https://blog.freelancersunion.org/2015/12/14/charging-hour-how-calculate-your-rate/",
        label: "Freelancers Union: How To Calculate Your Hourly Rate",
        description: "Covers the same income, overhead and billable hours method this calculator's formula is built on.",
      },
      {
        href: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
        label: "U.S. Small Business Administration: Write Your Business Plan",
        description: "Federal guidance on the financial projections a freelance income target and cost structure normally feed into.",
      },
    ],
  },

  tags: ["freelance", "pricing", "self employment", "finance"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
