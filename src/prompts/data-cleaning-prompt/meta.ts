import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "data-cleaning-prompt",
  name: "Cleaning Plan",
  title: "Data Cleaning Prompt",
  category: "data-analysis-prompts",
  taskType: "analyse",
  summary:
    "Produces a reviewable cleaning plan written as numbered rules instead of a cleaned table, and refuses to delete a row or invent a value.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["data cleaning", "spreadsheets", "data quality", "preparation"],

  seo: {
    primaryKeyword: "data cleaning prompt",
    keywords: [
      "data cleaning prompt",
      "how to clean a messy dataset with ai",
      "detecting duplicate rows in a spreadsheet",
      "handling missing values without deleting rows",
      "ai prompt for standardising inconsistent categories",
      "data cleaning checklist before analysis",
    ],
    seoTitle: "Data Cleaning Prompt: Fix a Messy Table Safely",
    seoDescription:
      "A data cleaning prompt that returns numbered rules instead of a cleaned table, flags rows it cannot decide about, and never silently drops or invents data.",
  },

  prompt: {
    text: `You are a data analyst preparing a table for analysis. You will not clean anything yet. You will produce a cleaning plan I can review, because a silent transformation is more dangerous than a dirty column.

WHAT THE TABLE IS: {{DATASET}}
COLUMNS AND THEIR INTENDED TYPES: {{SCHEMA}}
SAMPLE ROWS, PASTED AS THEY ACTUALLY LOOK: {{SAMPLE}}
WHAT I INTEND TO ANALYSE AFTERWARDS: {{ANALYSIS_GOAL}}
ROW COUNT OF THE RAW TABLE: {{ROW_COUNT}}

Produce five sections.

1. WHAT YOU CAN AND CANNOT SEE. State how many rows you were shown out of the stated row count. List every judgement below that depends on the sample being representative. If you were shown fewer than 20 rows, mark all type inferences provisional.

2. PER COLUMN DIAGNOSIS. For each column give the inferred real type, how it deviates from the intended type, the specific malformed values visible in the sample, and whether the problem looks systematic (an export setting, a locale, two source systems) or scattered (manual entry).

3. RULES, WRITTEN AS RULES. Every fix is numbered and phrased as IF condition THEN action. No rule may delete a row. A rule that would discard data must instead write a reason into a new column called review_reason.

4. DUPLICATES AND KEYS. Name the column or combination intended to be unique. Separate exact duplicate rows from repeated keys carrying conflicting values, which are a different defect with a different fix, and do not choose which conflicting row survives.

5. EXPECTED ROW COUNT AFTER CLEANING. State the number and how you derived it. If your rules cannot change the row count, say so explicitly.

CRITICAL: never invent a value for a missing cell and never introduce a category that does not appear in the sample. Anything too ambiguous to rule on goes under NEEDS A HUMAN DECISION with the question I would have to answer.`,
    variables: [
      {
        token: "DATASET",
        label: "What the table is",
        example:
          "Six months of pharmacy stock transfers exported from an old inventory system as CSV",
      },
      {
        token: "SCHEMA",
        label: "Columns and their intended types",
        example:
          "transfer_id text, site_code text, drug_name text, quantity integer, transferred_on date, cost_gbp decimal",
      },
      {
        token: "SAMPLE",
        label: "Sample rows exactly as they look",
        example:
          "TR-0091, ST12 , Amoxicillin 500mg, 24, 03/04/25, £14.60 | TR-0091, st12, AMOXICILLIN 500MG, 24, 2025-04-03, 14.6",
      },
      {
        token: "ANALYSIS_GOAL",
        label: "What you intend to analyse afterwards",
        example: "Monthly transfer cost per site, to find which sites over order",
      },
      {
        token: "ROW_COUNT",
        label: "Row count of the raw table",
        example: "48,210 rows",
      },
    ],
    expectedOutput:
      "A per column diagnosis, a numbered list of IF THEN rules none of which delete anything, an explicit separation of exact duplicates from conflicting keys, a stated expected row count, and a list of the decisions it refused to make for you.",
    followUps: [
      "Rewrite rules 3 to 9 as a single pandas function with a comment naming the rule number each block implements.",
      "The review_reason column came back with 1,900 rows flagged. Group those reasons and tell me which group is worth fixing at the source instead.",
      "Assume the sample was not representative because it came from one site. Which of your type inferences would you withdraw?",
    ],
    pitfalls: [
      "Pasting a neat sample defeats the whole exercise. Paste the ugly rows, including the ones that broke your import.",
      "Models will happily standardise two categories that are genuinely different business units because the strings look alike. Check every grouping proposal against what the codes mean, not how they read.",
      "If you skip the row count input, the expected row count section becomes a guess dressed as arithmetic.",
    ],
  },

  eeat: {
    author: "Nadia Haddad",
    authorCredential:
      "Nine years as a data analyst in retail and healthcare, mostly spent explaining why a promising result was noise.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "An early draft asked for a cleaned table back and I nearly shipped it. Claude had parsed a column of British dates as month first for the twelve rows where that was possible and day first for the rest, producing a column that was internally inconsistent and looked perfect. Forcing rules instead of output made the ambiguity visible in one line, and every model I tried then asked me which format the source system wrote.",
  },

  article: {
    intro: [
      "A data cleaning prompt is only safe when it returns a plan rather than a cleaned table. Ask a model to tidy up a messy export and it will hand back something tidy, with no record of what it changed, what it guessed, or which rows quietly stopped existing on the way.",
      "This version refuses to transform anything. It reads your sample, diagnoses each column, and writes every fix as a numbered rule you can read, argue with and apply yourself. Reviewing those rules is the slow part, and it is also the only part that protects whatever analysis comes next.",
      "The underlying habit is treating preparation as a documented sequence of decisions rather than a chore to get past before the interesting work starts.",
    ],

    sections: [
      {
        heading: "Why a data cleaning prompt should never touch the table",
        body: [
          "A model asked to return cleaned data will return cleaned data. In the same response it may also have read three dates in the wrong order, folded two genuinely different categories together because the strings looked alike, and skipped four rows it could not parse. None of that is visible afterwards, because the result is a neat table and neat tables look correct.",
          "Rules make each decision inspectable. IF the country column contains UK THEN write United Kingdom is a sentence you can accept or reject in two seconds. A finished column with United Kingdom already in it tells you nothing about what else was folded into it along the way.",
          "The prohibition on deleting rows works the same way. Writing a reason into a review_reason column keeps the count stable, so the number you started with is the number you finish with, and any drift is a bug rather than a judgement somebody made on your behalf.",
        ],
      },
      {
        heading: "Handling missing values without deleting rows",
        body: [
          "Handling missing values without deleting rows is the choice that moves a result most and gets discussed least. Drop every row containing a blank and you have restricted the analysis to whoever filled in the optional fields, which is almost never a random slice of the population you care about.",
          "The prompt drags the pattern into the open: how many blanks sit in each column, whether they cluster in the same rows, and whether a blank means unknown, means zero, or means the question did not apply. Those are three different facts needing three different treatments, and no automatic default gets all three right.",
          "Imputation is allowed, but it has to be written down. A median fill is defensible and belongs in the plan as rule 7. A number that simply appears in a cell with no rule behind it is not defensible at all, and by the time somebody queries the total it is untraceable.",
        ],
      },
      {
        heading: "Detecting duplicate rows in a spreadsheet is not a distinct count",
        body: [
          "Detecting duplicate rows in a spreadsheet feels like a job for a distinct count, and for byte identical copies it is. The expensive case is the repeated key: two rows for the same order id carrying different totals, one a correction and one stale, with nothing in the file saying which is which.",
          "A distinct count treats both as legitimate. A blanket deduplication keeps whichever appears first, which is arbitrary and reproducible only by accident. The prompt splits the two cases apart and deliberately refuses to pick a survivor, because picking correctly depends on how the export was generated and that fact is not in the data.",
        ],
      },
      {
        heading: "Categories, dates and the export settings behind them",
        body: [
          "Most inconsistency is systematic rather than random, and systematic problems usually have one fix at the source. Three date formats inside one column normally means two systems wrote to it, not that a hundred people typed carelessly, and repairing the export beats repairing the symptom every month from now on.",
          "Used as an ai prompt for standardising inconsistent categories, the value sits in the grouping proposal rather than the rewrite. Models are reliable at noticing that Ltd, Limited and LTD are the same suffix. They are unreliable at knowing whether North and North Region are the same business unit, and they will guess confidently either way.",
        ],
        list: [
          "Dates: ambiguous day and month ordering, two digit years, and strings that never parsed at all.",
          "Numbers stored as text, complete with thousands separators, currency symbols and trailing export spaces.",
          "Categories that differ by casing or punctuation, mixed in with values that are genuinely distinct.",
          "Encoding damage in names, which is a file reading fault rather than a data fault and should be fixed upstream.",
          "Invisible whitespace, which breaks joins later without breaking anything you can see now.",
        ],
      },
      {
        heading: "Reading the output as a data cleaning checklist before analysis",
        body: [
          "The finished plan works as a data cleaning checklist before analysis, and the order you read it in matters. Start at the expected row count, because a plan that changes the count has done something you did not ask for and the reason needs to be in rule form.",
          "Read the NEEDS A HUMAN DECISION block second rather than last. Those are the columns the model declined to guess at, and in practice they are the columns that decide the answer, which is exactly why it declined.",
          "Anyone asking how to clean a messy dataset with ai is really asking whether the result can be trusted without checking it. It cannot. The plan format is what turns that check into ten minutes of reading rather than an afternoon of comparing two spreadsheets side by side.",
        ],
      },
    ],

    howTo: {
      name: "How to run the data cleaning prompt",
      steps: [
        {
          name: "Paste the ugly rows",
          text: "Choose the sample from the records that broke your import, not the first twenty rows. A tidy sample produces a plan for a table you do not have.",
        },
        {
          name: "State the intended types",
          text: "Deviation only means something against an intention. Without a declared schema the model reports what it sees and calls it correct.",
        },
        {
          name: "Argue with the rules line by line",
          text: "Reject any rule whose condition you cannot verify yourself. This is the review that the whole format exists to make possible.",
        },
        {
          name: "Apply the rules yourself and compare counts",
          text: "Run the rules in your own tool, then check the resulting row count against the number the plan predicted. A mismatch means a rule did more than it said.",
        },
      ],
    },

    faq: [
      {
        question: "Can the data cleaning prompt work on a file I cannot paste?",
        answer:
          "It works on a pasted sample plus a stated row count, so a large file is fine as long as the sample is honest. What it cannot do is scan the whole file for rare defects, which is why every inference in the plan is marked as depending on the sample being representative.",
      },
      {
        question: "Why does it refuse to pick which duplicate row to keep?",
        answer:
          "Because the correct survivor depends on how the export was produced, and that information sits outside the file. Two rows with the same key and different totals could be a correction, a partial refund or a double write, and each of those wants a different fix applied by someone who knows the system.",
      },
      {
        question: "Should I let it impute missing numbers?",
        answer:
          "Only when the rule is visible and you agree with it. A median fill written as a numbered rule is a defensible modelling choice you can reverse later, while a filled cell with no rule behind it becomes permanent the moment somebody builds a total on top of it.",
      },
      {
        question: "How large should the pasted sample be?",
        answer:
          "Twenty to fifty rows is usually enough for type inference, and the prompt explicitly downgrades its confidence below twenty. Bias the selection towards oddities rather than typical records, since the typical records are the ones already parsing correctly in your tool.",
      },
      {
        question: "Does this replace a validation script?",
        answer:
          "No. It produces the specification a validation script should implement, which is the part people usually skip. Once the rules are agreed, encoding them in code gives you something repeatable that runs on every future export without another round of review.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "Run this once the table is clean, to test whether the pattern you found survives scrutiny of sample size and alternative explanations.",
      },
      {
        href: "/data-analysis-prompts/excel-formula-prompt",
        label: "excel formula prompt",
        description:
          "For turning agreed cleaning rules into formulas when the work has to stay inside a spreadsheet rather than move to code.",
      },
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description:
          "Survey exports carry their own defects, including partial responses that must not be treated as missing at random.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When the cleaning plan reveals that a source system is producing the defects, this is the document that gets it fixed.",
      },
    ],

    externalLinks: [
      {
        href: "https://vita.had.co.nz/papers/tidy-data.pdf",
        label: "Wickham: Tidy Data",
        description:
          "The paper that defines the target state this plan cleans towards, including why one variable per column is a structural rather than aesthetic rule.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm",
        label: "NIST/SEMATECH e-Handbook: outliers and data checking",
        description:
          "A primary statistical reference for deciding whether an extreme value is an error to flag or a real observation to keep.",
      },
      {
        href: "https://pandas.pydata.org/docs/user_guide/missing_data.html",
        label: "pandas: working with missing data",
        description:
          "Documents exactly how a common analysis library treats blanks, which matters because its defaults differ from a spreadsheet's.",
      },
      {
        href: "https://www.w3.org/TR/tabular-data-model/",
        label: "W3C: Model for Tabular Data",
        description:
          "The standard describing how a CSV declares its own types and keys, which is the upstream fix for most recurring format defects.",
      },
    ],
  },
};

export default meta;
