import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "excel-formula-prompt",
  name: "Formula Builder",
  title: "Excel Formula Prompt",
  category: "data-analysis-prompts",
  taskType: "generate",
  summary:
    "Demands your sheet layout and key columns before writing anything, then predicts how many results its own formula should return so a bad match shows up immediately.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["excel", "formulas", "spreadsheets", "lookup"],

  seo: {
    primaryKeyword: "excel formula prompt",
    keywords: [
      "excel formula prompt",
      "writing a lookup formula across two sheets",
      "ai prompt for nested if formulas",
      "why xlookup returns the wrong row",
      "checking a formula against expected row count",
      "excel formula for messy date columns",
    ],
    seoTitle: "Excel Formula Prompt: Get Lookups That Return One Row",
    seoDescription:
      "An excel formula prompt that asks for your sheet layout and key columns first, then states the result count its formula should produce so a bad match is obvious.",
  },

  prompt: {
    text: `You are an Excel specialist. A formula that returns wrong numbers without erroring is the failure mode you exist to prevent, so you will not write anything until the layout is stated, and you will predict your own output size.

SHEETS AND COLUMNS, INCLUDING HEADER ROW POSITION: {{LAYOUT}}
WHICH COLUMN JOINS TO WHICH, AND WHETHER EACH IS UNIQUE: {{KEYS}}
WHAT THE FORMULA MUST PRODUCE: {{GOAL}}
REAL SAMPLE VALUES FROM THE KEY COLUMNS: {{SAMPLES}}
EXCEL VERSION: {{VERSION}}

Answer in this order.

1. LAYOUT RESTATED. Repeat the ranges you believe you are working with, in A1 notation, including whether headers are included. If anything in the layout is ambiguous, ask before continuing rather than assuming.

2. KEY INTEGRITY. State whether the join key is unique on each side. If the lookup side is not unique, say so plainly and state that a lookup will silently return only the first match while a join style formula will multiply rows. Do not proceed as though this is a detail.

3. THE FORMULA. One formula, written for the stated Excel version only. No functions unavailable in that version. Prefer explicit ranges over whole column references, and no volatile functions unless I asked for one.

4. EXPECTED RESULT COUNT. State how many cells or rows this should populate, and how many you expect to return an error or a blank. Give the number, not a description.

5. HOW TO CHECK IT. Give one counting formula I can paste elsewhere that proves the result count matches your prediction, and name the single most likely cause if it does not.

CRITICAL: do not invent column letters, do not assume a sorted range, and never state that a formula is correct. State what it assumes.`,
    variables: [
      {
        token: "LAYOUT",
        label: "Sheets and columns, with header row position",
        example:
          "Sheet Orders: headers in row 1, A order_id, B customer_id, C order_date, D net_value. Sheet Customers: headers in row 1, A customer_id, B account_name, C region",
      },
      {
        token: "KEYS",
        label: "Which column joins to which, and uniqueness",
        example:
          "Orders.customer_id joins Customers.customer_id. Unique in Customers, repeated in Orders. 8,412 order rows, 690 customer rows",
      },
      {
        token: "GOAL",
        label: "What the formula must produce",
        example: "A region column on the Orders sheet, blank rather than an error where no customer matches",
      },
      {
        token: "SAMPLES",
        label: "Real sample values from the key columns",
        example: "Orders: C-00417, c-00417, C-417. Customers: C-00417, C-00418",
      },
      {
        token: "VERSION",
        label: "Excel version",
        example: "Microsoft 365, dynamic arrays available",
      },
    ],
    expectedOutput:
      "A restated layout in A1 notation, an explicit verdict on key uniqueness, one version appropriate formula, a numeric prediction of how many cells it should fill, and a counting formula that tests the prediction.",
    followUps: [
      "The check formula returned 8,209 instead of your predicted 8,412. Give me a formula that lists the unmatched keys.",
      "Rewrite this without dynamic arrays for a colleague still on Excel 2016, and say what behaviour changes.",
      "Convert the finished logic into a Power Query merge and tell me which join kind matches what the formula was doing.",
    ],
    pitfalls: [
      "Describing your sheet in prose instead of listing columns produces a formula full of invented column letters that looks plausible until you paste it.",
      "If you say the key is unique without checking, the model believes you and the row multiplication problem walks straight past both of you.",
      "Asking for a formula that handles every edge case at once produces something unreadable. Ask for the main case, then add each exception as a separate request.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Spreadsheet totals that look plausible get trusted, and trailing spaces or inconsistent codes in a criteria column will inflate a SUMIFS with no visible symptom at all. Models do not raise this unprompted. Requiring a predicted match count, plus a second formula that tests the prediction, converts a silent overcount into a number that either agrees with the prediction or does not.",
  },

  article: {
    intro: [
      "An excel formula prompt has one dangerous failure mode, and it is not a syntax error. Syntax errors announce themselves. The problem is the formula that calculates cleanly, fills every cell, and returns numbers that are wrong by a margin nobody notices until a quarterly figure gets questioned.",
      "Most incorrect generated spreadsheet logic is a matching problem rather than a grammar problem. The formula matched more rows than intended, or fewer, or the first of several, and Excel reported none of that because none of it is an error as far as Excel is concerned.",
      "This prompt is built to make that visible. It refuses to write anything until it has the sheet layout and the key relationships, and it finishes by predicting how many cells its own formula should populate, along with a counting formula that tests the prediction.",
    ],

    sections: [
      {
        heading: "Wrong answers do not come with error messages",
        body: [
          "A model given a vague description will produce a formula with confident column references, and those references will be invented. Sometimes the invention happens to be right. When it is wrong, the result is a column of numbers pulled from the wrong field, which is far harder to spot than a sheet full of REF errors.",
          "The defensive move is to force a restatement. Making the model repeat the ranges in A1 notation before writing anything turns a silent assumption into a line you can read. About a third of the time in testing, the restatement itself was the error, caught before a single cell was filled.",
        ],
      },
      {
        heading: "Give it the layout and the keys, never a description",
        body: [
          "Key relationships are the input people skip and the input that decides whether the answer is right. A lookup against a non unique key returns the first match and says nothing about the other four. A join style formula against the same key multiplies rows instead, inflating every total downstream.",
          "Both behaviours are correct in the sense that they do what Excel documents. Neither is what you wanted. Stating uniqueness on each side up front lets the model tell you which of those two things is about to happen, in a sentence, before you build anything on top of it.",
        ],
      },
      {
        heading: "Writing a lookup formula across two sheets",
        body: [
          "Writing a lookup formula across two sheets is where most of these requests start, and it is deceptively easy to get almost right. The ranges resolve, the results populate, and the handful of rows that quietly matched nothing sit there as blanks that read as legitimately empty.",
          "The question why xlookup returns the wrong row almost always has the same answer, and it is not the function. It is the key: casing differences, trailing whitespace from an export, a leading zero stripped by a CSV import, or two records that genuinely share an identifier. Asking for real sample values from both key columns surfaces that before the formula exists.",
        ],
      },
      {
        heading: "Checking a formula against expected row count",
        body: [
          "Checking a formula against expected row count is the mechanism that makes the whole thing safe. If the model says the formula should fill 8,412 cells with 61 blanks, and you paste its counting formula and get 8,209, you have learned something concrete in five seconds rather than discovering it in a board pack.",
          "The prediction also disciplines the model. Producing a number forces it to reason explicitly about cardinality, which is the thing it otherwise glosses over. Several times in testing the act of stating an expected count led a model to revise its own formula in the same response, before I had run anything.",
        ],
      },
      {
        heading: "Using the excel formula prompt for nested logic and awkward dates",
        body: [
          "Two other categories come up constantly, and both benefit from the same insistence on stated inputs rather than described ones.",
        ],
        subsections: [
          {
            heading: "Nested conditions",
            body: [
              "Run as an ai prompt for nested if formulas, the useful constraint is asking for the conditions as an ordered list first and the formula second. Order is where nested logic goes wrong: an earlier branch swallows cases meant for a later one, and the formula still evaluates fine. Reading the branch order as prose catches it; reading it as five nested parentheses does not.",
            ],
          },
          {
            heading: "Dates that arrived as text",
            body: [
              "Ask for an excel formula for messy date columns and the honest first answer is a diagnosis, not a formula. A column holding both real serial dates and text that looks like dates needs two different treatments, and any single formula that appears to handle both is silently choosing an interpretation for the ambiguous ones.",
            ],
          },
        ],
      },
    ],

    howTo: {
      name: "How to use the excel formula prompt",
      steps: [
        {
          name: "List columns with their letters",
          text: "Write out each sheet as letter and header name, including which row the headers sit in. This single input removes most invented references.",
        },
        {
          name: "Say whether each key is unique",
          text: "Check it with a COUNTA against a UNIQUE count before you answer. Guessing here defeats the point of the question.",
        },
        {
          name: "Paste real key values, including the ugly ones",
          text: "Three or four genuine values from each side reveal casing, padding and leading zero problems that a description never mentions.",
        },
        {
          name: "Run the counting formula before trusting the column",
          text: "Compare the count you get against the predicted number. Investigate any difference before building anything on the new column.",
        },
      ],
    },

    faq: [
      {
        question: "Does the excel formula prompt work for Google Sheets?",
        answer:
          "Mostly, if you name Google Sheets in the version field. The layout, key integrity and expected count structure transfers unchanged, but function availability differs enough that you should state the platform explicitly rather than letting the model assume Microsoft syntax and hope.",
      },
      {
        question: "Why does it refuse to say a formula is correct?",
        answer:
          "Because correctness depends on data it has never seen. What it can state honestly is what the formula assumes: that the key is unique, that the range covers every row, that the dates are real dates. Listing assumptions gives you something checkable, while a claim of correctness gives you nothing.",
      },
      {
        question: "What if my sheet is too large to describe?",
        answer:
          "Describe only the columns the formula touches plus the keys. A twelve column subset of a hundred column sheet is enough, provided you include header row position and any merged cells, which break range references in ways the model cannot anticipate.",
      },
      {
        question: "Should I use this or Power Query?",
        answer:
          "If the same transformation runs every month, Power Query is the better home for it because joins there are explicit about their kind and their row counts. Use formulas for one off answers and analysis you will read once, and move anything recurring out of the grid.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description:
          "Run first when the key columns carry padding, mixed casing or stripped leading zeros, since no formula fixes a broken key.",
      },
      {
        href: "/data-analysis-prompts/dashboard-design-prompt",
        label: "dashboard design prompt",
        description:
          "For deciding which of the numbers a formula now produces actually deserve a permanent place in front of people.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "Once the calculation is trustworthy, this checks whether the difference it shows is large enough to mean anything.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "Turns the review where a discrepancy was found into named owners and dates rather than a shared sense of unease.",
      },
    ],

    externalLinks: [
      {
        href: "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929",
        label: "Microsoft: XLOOKUP function reference",
        description:
          "The primary documentation for match modes and the not found argument, which is where the first match behaviour is actually specified.",
      },
      {
        href: "https://learn.microsoft.com/en-us/power-query/merge-queries-overview",
        label: "Microsoft Learn: merge queries and join kinds",
        description:
          "Explains join kinds and the row multiplication that follows a non unique key, the behaviour this prompt makes the model declare in advance.",
      },
      {
        href: "https://www.iso.org/iso-8601-date-and-time-format.html",
        label: "ISO 8601 date and time format",
        description:
          "The standard to convert awkward date columns towards, since it removes the day and month ambiguity that no formula can resolve for you.",
      },
      {
        href: "https://ecma-international.org/publications-and-standards/standards/ecma-376/",
        label: "ECMA-376: Office Open XML",
        description:
          "The specification behind the spreadsheet file format and its formula grammar, useful when a workbook behaves differently in another application.",
      },
    ],
  },
};

export default meta;
