import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "salary-hourly-converter",
  name: "Salary Hourly Converter",
  title: "Salary Hourly Converter",
  category: "career-finance-tools",
  summary:
    "Converts an annual salary to an hourly, weekly and monthly rate, or an hourly rate to an annual, weekly and monthly one, using your actual hours per week and paid weeks per year rather than a fixed forty hour, fifty two week assumption.",

  seo: {
    primaryKeyword: "salary hourly converter",
    keywords: [
      "salary hourly converter",
      "salary to hourly calculator",
      "annual salary to hourly rate calculator",
      "hourly to annual salary calculator",
      "how many weeks are in a work year",
    ],
    seoTitle: "Salary Hourly Converter: Annual, Weekly and Monthly Pay",
    seoDescription:
      "A free salary hourly converter that turns an annual salary into an hourly, weekly and monthly rate, or an hourly rate back into an annual one, from your own hours.",
  },

  fields: [
    {
      kind: "select",
      token: "mode",
      label: "Conversion direction",
      options: [
        { value: "fromAnnual", label: "Convert annual salary to hourly/weekly/monthly" },
        { value: "fromHourly", label: "Convert hourly rate to annual/weekly/monthly" },
      ],
      example: "fromAnnual",
    },
    {
      kind: "number",
      token: "amount",
      label: "Annual salary or hourly rate",
      help: "Enter your annual salary if converting from annual, or your hourly rate if converting from hourly, matching the direction chosen above.",
      min: 0.01,
      example: 75000,
      prefix: "$",
    },
    {
      kind: "number",
      token: "hoursPerWeek",
      label: "Hours worked per week",
      help: "The hours actually worked in a typical week, not a contracted minimum. A week has 168 hours at most.",
      min: 1,
      max: 168,
      example: 40,
    },
    {
      kind: "number",
      token: "weeksPerYear",
      label: "Paid weeks per year",
      help: "52 minus any unpaid weeks off, if relevant.",
      min: 1,
      max: 52,
      example: 52,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard annual-to-hourly pay conversion arithmetic (annual divided by hours per week multiplied by weeks per year)"],
    testingNote:
      "Verified against hand computed cases in both directions, including a full time forty hour week, a reduced schedule with unpaid weeks off, a part time hourly rate, and the boundary values of 168 hours in a week and 52 weeks in a year, plus zero and out of range inputs that must return an error rather than a number.",
  },

  article: {
    intro: [
      "A salary hourly converter answers a question that sounds simple and rarely is: what an annual number actually works out to per hour, or the reverse, what an hourly rate would add up to across a full year. The answer depends on exactly two things beyond the headline figure: how many hours actually get worked in a week, and how many of the year's weeks are actually paid ones.",
      "This salary hourly converter takes both as real inputs rather than assuming a tidy forty hour, fifty two week year for everyone. Enter an annual salary and it returns the hourly, weekly and monthly figures; enter an hourly rate and it returns the annual, weekly and monthly figures, with all four shown together so the full picture is visible regardless of which direction was entered.",
    ],

    sections: [
      {
        heading: "Why a salary hourly converter needs more than one number",
        body: [
          "An annual salary on its own cannot become an hourly rate without knowing how many hours it covers. Two people on the same $75,000 salary, one working a genuine 40 hour week and one regularly working 50, are being paid meaningfully different hourly rates for identical pay.",
          "Used as a salary to hourly calculator, entering $75,000 at 40 hours a week across 52 paid weeks returns $36.06 an hour. Used the other direction, as an hourly to annual salary calculator, entering $25 an hour at the same schedule returns $52,000 a year before tax. Both are the identical arithmetic run in opposite directions, which is why one tool handles both.",
        ],
      },
      {
        heading: "Why weeks per year is not always fifty two",
        body: [
          "A year has 52 complete weeks, but not every one is necessarily a paid working week for a given person. Unpaid parental leave, an unpaid sabbatical, a seasonal role, or a probation period without paid holiday all reduce the number of weeks a salary is actually spread across, without changing the salary figure itself.",
          "This matters most when converting from annual to hourly, since dividing by too many weeks understates the real hourly value of the work. Someone paid $60,000 across 52 weeks and someone paid the same $60,000 across 48 paid weeks with four unpaid are earning different hourly rates for the time actually worked.",
        ],
      },
      {
        heading: "Why monthly is annual divided by twelve, not a weekly figure multiplied out",
        body: [
          "It is tempting to get a monthly figure by multiplying the weekly one by four, which produces a plausible looking number that is nonetheless wrong. Most months are not exactly four weeks long: they run between roughly 4.0 and 4.4 weeks, so a weekly figure times four understates most months of the year.",
          "The monthly figure here is always the annual salary divided by twelve, which is what an actual monthly paycheck is built from. It will not exactly match a biweekly or semimonthly pay schedule figure multiplied out either, since those cadences split the year into 26 or 24 pay periods rather than 12.",
        ],
      },
      {
        heading: "What counts as a standard workweek in the United States",
        body: [
          "Under the Fair Labor Standards Act, a covered employee's workweek is a fixed, recurring block of 168 hours, and overtime pay is owed for hours worked beyond 40 in that block, at one and a half times the regular rate. That 40 hour threshold is why it is this tool's default hours per week value.",
          "The Bureau of Labor Statistics separately treats 35 or more hours a week as the line between full time and part time work. Neither figure is a legal cap on how many hours an adult can be asked to work, which is why the hours per week field here accepts anything up to 168 rather than stopping at 40.",
        ],
      },
      {
        heading: "Working hour limits outside the United States",
        body: [
          "Not every jurisdiction leaves hours per week uncapped. Under the UK's working time regulations, most workers cannot be required to work more than 48 hours a week on average, usually averaged over a 17 week period, unless they have individually opted out in writing.",
          "An annual salary to hourly rate calculator built only around a 40 hour American workweek would understate the hourly value of a different schedule elsewhere. Entering the actual hours worked, rather than a default, keeps the result meaningful across a role with a different standard week.",
        ],
      },
      {
        heading: "Using a salary hourly converter before a negotiation or a freelance quote",
        body: [
          "A salary figure is the easiest number to compare between two job offers and the hardest one to compare fairly, since it says nothing about the hours behind it. Converting both offers to an hourly rate, using each role's actual expected hours, is what makes the comparison honest before a negotiation conversation.",
          "The same arithmetic works the other way for anyone pricing freelance work from a target income: convert the income figure to an hourly rate first, then treat that as a floor, since a freelance rate also has to cover time that is not billable.",
        ],
      },
    ],

    howTo: {
      name: "How to use the salary hourly converter",
      steps: [
        {
          name: "Choose a conversion direction",
          text: "Pick whether you are converting an annual salary into an hourly, weekly and monthly figure, or an hourly rate into an annual, weekly and monthly one.",
        },
        {
          name: "Enter the salary or hourly rate",
          text: "Enter the annual salary if converting from annual, or the hourly rate if converting from hourly, matching the direction chosen above.",
        },
        {
          name: "Enter hours per week and paid weeks per year",
          text: "Use the hours actually worked in a typical week, and 52 minus any unpaid weeks off for the weeks per year field.",
        },
        {
          name: "Read all four figures at once",
          text: "The annual, monthly, weekly and hourly figures are all shown together, so the full picture is visible regardless of which direction was entered.",
        },
      ],
    },

    faq: [
      {
        question: "How many weeks are in a work year?",
        answer:
          "A calendar year has 52 complete weeks, but a work year is only as many of those weeks as are actually paid. Someone with unpaid leave, an unpaid gap between contracts, or a seasonal role has fewer paid weeks than 52, and the weeks per year field should reflect that real number.",
      },
      {
        question: "Does this salary hourly converter account for tax or deductions?",
        answer:
          "No. Every figure this salary hourly converter returns is a gross amount, calculated purely from the salary or rate, hours per week and weeks per year entered. It does not model income tax, national insurance or pension contributions, since those vary by jurisdiction and personal circumstances in ways a single formula cannot capture.",
      },
      {
        question: "What hours per week should I use if my schedule changes from week to week?",
        answer:
          "Use a realistic average across a normal period, such as the last three to six months, rather than an unusually light or an unusually heavy week. A single unrepresentative week entered here will skew the hourly and monthly figures away from what the pay actually works out to.",
      },
      {
        question: "Why is the monthly figure not just the weekly figure multiplied by four?",
        answer:
          "Because most months are not exactly four weeks long. The monthly figure here is the annual amount divided by twelve, which is what a real monthly paycheck is built from, rather than a weekly figure restated at a fixed multiple that would understate most months of the year.",
      },
      {
        question: "Is a 40 hour week a legal maximum?",
        answer:
          "In the United States it is not a cap, it is the point at which overtime pay becomes owed under the Fair Labor Standards Act. Outside the United States some jurisdictions cap average weekly hours directly, such as the UK's 48 hour limit, so the correct figure to enter depends on where the role is based.",
      },
      {
        question: "Can I use this as a freelance or contractor rate calculator?",
        answer:
          "You can use it to see what a target income works out to per hour, but a freelance rate needs to cover more than that figure alone, including unbillable admin time and business costs. Treat the hourly figure from this tool as a floor rather than the finished freelance rate.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description: "For turning a converted hourly or annual figure into a sourced number you can defend in a negotiation.",
      },
      {
        href: "/career-prompts/freelance-rate-prompt",
        label: "freelance rate prompt",
        description: "For pricing freelance or contract work properly once the target hourly figure is only a starting floor.",
      },
      {
        href: "/tools/percentage-calculator",
        label: "percentage calculator",
        description: "For working out a raise, a bonus percentage or a pay cut once the hourly or annual figure is known.",
      },
      {
        href: "/tools/working-days-calculator",
        label: "working days calculator",
        description: "For counting actual working days across a date range when unpaid weeks off need to be worked out precisely.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.dol.gov/agencies/whd/overtime",
        label: "US Department of Labor: Overtime pay",
        description: "The Fair Labor Standards Act's 40 hour workweek and overtime threshold this tool's default hours per week is built around.",
      },
      {
        href: "https://www.bls.gov/opub/hom/cps/concepts.htm",
        label: "Bureau of Labor Statistics: Current Population Survey concepts",
        description: "The federal definition of hours worked and the 35 hour line between full time and part time employment.",
      },
      {
        href: "https://www.gov.uk/maximum-weekly-working-hours",
        label: "GOV.UK: Maximum weekly working hours",
        description: "The UK's 48 hour average weekly working limit, cited for hours per week outside the United States.",
      },
    ],
  },

  tags: ["salary", "hourly rate", "pay", "career", "finance"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
