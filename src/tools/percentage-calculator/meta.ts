import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "percentage-calculator",
  name: "Percentage Calculator",
  title: "Percentage Calculator",
  category: "productivity-time-tools",
  summary:
    "Runs the three calculations people actually mean by percentage: a share of a number, what share one number is of another, and the percent change between two values.",

  seo: {
    primaryKeyword: "percentage calculator",
    keywords: [
      "percentage calculator",
      "free online percentage calculator",
      "how to calculate percentage change",
      "percent of a number calculator",
      "percentage increase or decrease calculator",
      "how to find what percent one number is of another",
    ],
    seoTitle: "Percentage Calculator: Find A Percent, Share Or Change",
    seoDescription:
      "A free online percentage calculator that finds a percent of a number, what percent one number is of another, and the percent change between two values.",
  },

  fields: [
    {
      kind: "select",
      token: "mode",
      label: "Calculation",
      help: "Pick the question you actually need answered. The two numbers below take on a different meaning depending on which one you choose.",
      options: [
        { value: "of", label: "X% of Y" },
        { value: "isWhatPercent", label: "X is what % of Y" },
        { value: "change", label: "% change from X to Y" },
      ],
      example: "of",
    },
    {
      kind: "number",
      token: "x",
      label: "First number",
      help: "Its meaning depends on the calculation above: the percentage in \"X% of Y\", the part in \"X is what % of Y\", or the starting value in \"% change from X to Y\".",
      placeholder: "20",
      example: 20,
      step: 0.01,
    },
    {
      kind: "number",
      token: "y",
      label: "Second number",
      help: "Its meaning also depends on the calculation above: the whole in both \"X% of Y\" and \"X is what % of Y\", or the ending value in \"% change from X to Y\".",
      placeholder: "150",
      example: 150,
      step: 0.01,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard percentage arithmetic"],
    testingNote:
      "Verified against hand calculated cases for all three modes, including a share that reduces to a whole number, a division that does not resolve evenly and has to round rather than truncate, a percent change that is negative because the value fell, and the two divide-by-zero inputs each mode has to reject with an explicit error rather than a computed result.",
  },

  article: {
    intro: [
      "A percentage calculator only earns its keep if it asks which question is actually being asked before it multiplies anything, because \"percentage\" covers three unrelated calculations that get typed into the same search box: a share of a number, what share one number is of another, and how far a number moved between two points. This free online percentage calculator keeps those three apart with an explicit mode switch, so the two numbers entered only ever mean one thing at a time.",
      "Three modes cover the ground: \"X% of Y\" for a share of a number, the calculation behind a tip or a tax; \"X is what % of Y\" for what share one number is of another, the calculation behind a completion rate; and \"% change from X to Y\" for the move between two values, reported as positive for an increase and negative for a decrease.",
      "The one thing this percentage calculator refuses to do is return a number when the arithmetic is undefined. Dividing by zero has no answer, so both modes that divide return an explicit error instead of a plausible looking guess.",
    ],

    sections: [
      {
        heading: "How this percentage calculator handles three different questions",
        body: [
          "Each mode reuses the same two fields, first number and second number, but assigns them a different role, so switching from one question to a related one takes one click rather than a new set of typed values. The mode selector exists because the three calculations are not interchangeable; picking the wrong one produces a real number that answers the wrong question.",
        ],
      },
      {
        heading: "How to calculate a percent of a number",
        body: [
          "Used as a percent of a number calculator, mode one divides the first number by 100 and multiplies by the second. 20% of 150 divides 20 by 100 to get 0.2, then multiplies by 150 to get 30, the same arithmetic behind a tip, a tax line or a markup. The result scales linearly, so doubling either input roughly doubles the answer, a quick sanity check before trusting a larger figure.",
        ],
      },
      {
        heading: "How to find what percent one number is of another",
        body: [
          "How to find what percent one number is of another comes down to one division: divide the part by the whole, then multiply by 100. 30 is what percent of 150 divides 30 by 150 to get 0.2, then multiplies by 100 to get 20%, and reversing the two numbers answers a different question entirely. This mode rejects a second number of zero, since dividing by zero has no defined result.",
        ],
      },
      {
        heading: "How to calculate percentage change, and why the sign matters",
        body: [
          "How to calculate percentage change subtracts the starting value from the ending value, divides by the starting value, and multiplies by 100. From 100 to 150 that is a 50% increase; from 150 to 100 it is roughly a 33.3% decrease, the same two numbers in reverse order. The sign is not decoration: a negative result means the second value is smaller, and dropping it would make a rise and a fall look identical.",
        ],
      },
      {
        heading: "Why a starting value of zero breaks percentage change",
        body: [
          "Used as a percentage increase or decrease calculator, mode three rejects a starting value of zero for the same reason mode two rejects a zero second number: the formula divides by the starting value, and there is no meaningful percentage change from nothing. A metric that moved from 0 to any positive number did not increase by a calculable percentage; it started existing, which the formula cannot express as a multiple of zero.",
        ],
      },
      {
        heading: "Reading the result: rounding and what stays exact",
        body: [
          "Plain results are shown to two decimal places and trimmed to a whole number when the answer lands on one. Percentage results, from the other two modes, are shown to one decimal place, precise enough to separate 33.3% from 33.0% without implying accuracy the two typed numbers cannot support. None of the three modes round the input numbers before calculating; only the final displayed result is rounded, since rounding an intermediate step first would compound a small error into a larger one, which is why this percentage calculator keeps full precision internally and only formats at the last step.",
        ],
      },
    ],

    howTo: {
      name: "How to use the percentage calculator",
      steps: [
        {
          name: "Pick the calculation",
          text: "Choose X% of Y, X is what % of Y, or % change from X to Y, depending on the question being asked.",
        },
        {
          name: "Enter the first number",
          text: "Its role changes with the mode: the percentage, the part, or the starting value.",
        },
        {
          name: "Enter the second number",
          text: "Its role also changes with the mode: the whole, the whole, or the ending value.",
        },
        {
          name: "Read the result",
          text: "A plain result shows as a number; the other two modes show a percentage, with a minus sign for a small share or a decrease.",
        },
        {
          name: "Switch modes to check a related question",
          text: "Change only the mode and compare the new answer, since the same two numbers answer three different questions depending on which mode reads them.",
        },
      ],
    },

    faq: [
      {
        question: "What does \"X is what % of Y\" actually mean?",
        answer:
          "It answers what share the first number represents of the second, as a percentage. Entering 30 and 150 asks what percent 30 is of 150, and returns 20%, because 30 is one fifth of 150. Reversing the two numbers changes the answer entirely, since 150 is 500% of 30 rather than the other way round.",
      },
      {
        question: "Why is percentage change reported as a negative number when a value falls?",
        answer:
          "Because the sign carries real information a bare size figure would discard. A change of negative 33.3% and one of positive 33.3% are opposite outcomes with the same magnitude, and dropping the sign would make a falling metric and a rising one look identical on the page.",
      },
      {
        question: "Why does the calculator reject a second number of zero in \"X is what % of Y\" mode?",
        answer:
          "That mode divides the first number by the second, and division by zero has no defined result. Asking what percent a number is of zero is not a question with a small or large answer; the calculator returns an explicit error rather than a misleading 0% or an undefined figure.",
      },
      {
        question: "Why does percentage change need a non-zero starting value?",
        answer:
          "The formula divides the difference between the two values by the starting value, so a starting value of zero causes the same division by zero problem. A metric that started at exactly zero and became positive has no calculable percentage increase, even though it clearly grew, so the calculator asks for a non-zero starting value instead of guessing at one.",
      },
      {
        question: "What is the difference between a percentage change and a percentage point change?",
        answer:
          "A percentage change compares two values relative to the starting value, while a percentage point change is the plain difference between two percentages. Moving from a 40% rate to a 50% rate is a 10 percentage point increase, but a 25% percentage change, since 10 is 25% of the original 40. The two figures answer different questions.",
      },
      {
        question: "Can I use this to work out a markup, a discount or a tip?",
        answer:
          "Yes. This percentage calculator's \"X% of Y\" mode covers a tip, a sales tax amount and a markup alike: the percentage as the first number and the price as the second. A discount uses the same calculation to find the amount taken off, then that figure is subtracted from the original price separately.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/discount-stacking-calculator",
        label: "discount stacking calculator",
        description: "For applying more than one percent-off discount in sequence once a single percentage is worked out here.",
      },
      {
        href: "/tools/roi-calculator",
        label: "roi calculator",
        description: "For turning a cost and a return into the percentage figure that decides whether a spend paid off.",
      },
      {
        href: "/tools/break-even-point-calculator",
        label: "break-even point calculator",
        description: "For a related percentage figure, contribution margin ratio, once price and variable cost are known.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description: "For framing a percentage raise worked out here inside an actual negotiation conversation.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.mathsisfun.com/percentage.html",
        label: "Math Is Fun: Introduction To Percents",
        description: "A primary reference for the basic percentage formula behind the X% of Y and X is what % of Y modes.",
      },
      {
        href: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-percent-word-problems/a/percent-word-problems",
        label: "Khan Academy: Percent Word Problems",
        description: "Covers the part-over-whole formula this tool's X is what % of Y mode implements.",
      },
      {
        href: "https://www.bls.gov/cpi/factsheets/calculating-percent-changes.htm",
        label: "U.S. Bureau of Labor Statistics: Calculating Percent Changes",
        description: "A government reference for the percent change formula this tool's third mode implements, including the sign convention.",
      },
      {
        href: "https://corporatefinanceinstitute.com/resources/excel/calculate-percentage-in-excel/",
        label: "Corporate Finance Institute: How To Calculate Percentage",
        description: "Covers the same three percentage calculations in a spreadsheet context, for checking this tool's output by hand.",
      },
    ],
  },

  tags: ["percentage", "math", "calculator", "productivity"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
