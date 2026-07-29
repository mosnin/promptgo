import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "python-analysis-prompt",
  name: "Self Reporting Code",
  title: "Python Analysis Prompt",
  category: "data-analysis-prompts",
  taskType: "generate",
  summary:
    "Writes pandas that prints its own shape, nulls and join cardinality at every step, and forbids the model from describing results it has no way of seeing.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["python", "pandas", "code", "reproducibility"],

  seo: {
    primaryKeyword: "python analysis prompt",
    keywords: [
      "python analysis prompt",
      "pandas code that checks its own assumptions",
      "asserting row counts after a merge",
      "ai prompt for writing pandas code",
      "why a groupby silently drops nulls",
      "printing null rates before analysing",
    ],
    seoTitle: "Python Analysis Prompt: Pandas Code That Checks Itself",
    seoDescription:
      "A python analysis prompt that makes every step print its shape, nulls and join cardinality, and blocks the model from narrating results it cannot actually see.",
  },

  prompt: {
    text: `You are writing analysis code that somebody else will run and read the output of. You will never see that output. Everything you write must therefore report on itself, and you must not describe any result.

THE QUESTION IN ONE SENTENCE: {{QUESTION}}
EXACT COLUMN NAMES AND DTYPES, COPIED FROM df.info(): {{SCHEMA}}
ROW COUNT AND GRAIN, MEANING WHAT ONE ROW REPRESENTS: {{GRAIN}}
JOINS THE ANSWER NEEDS, EACH WITH ITS EXPECTED CARDINALITY: {{JOINS}}
LIBRARY VERSIONS AND ANY CONSTRAINTS ON WHAT I CAN INSTALL: {{ENVIRONMENT}}

Produce four blocks and nothing else.

BLOCK ONE, PROFILE. Code that prints, before any transformation happens: shape, dtypes, null count and null percentage per column, distinct value counts for every key column, and the minimum and maximum of every date column. Nothing is modified in this block.

BLOCK TWO, ANALYSIS. Numbered steps. Every step prints the shape before and after plus a one line label saying what it did. Every merge passes the validate argument with the cardinality I stated and is followed by an assert on the resulting row count. Every groupby on a column containing nulls either sets dropna to False or prints the number of rows being discarded, and a comment states which you chose and why.

BLOCK THREE, HOW TO READ THE OUTPUT. For each printed line, what value is normal and what value means stop and investigate. Give specific numbers where my schema supports them and write UNKNOWN where it does not.

BLOCK FOUR, WHAT WOULD MAKE THIS WRONG. The assumptions the code embeds, about grain, join cardinality, nulls meaning zero, timezone handling and duplicate keys.

Use only column names present in the schema above. If the question cannot be answered from those columns, name the missing column and stop. Do not print a conclusion, do not write a comment guessing what the numbers will show, and do not append a summary of findings.`,
    variables: [
      {
        token: "QUESTION",
        label: "The question in one sentence",
        example:
          "Which pharmacy sites had a median dispensing turnaround above four hours in the last quarter?",
      },
      {
        token: "SCHEMA",
        label: "Exact column names and dtypes from df.info()",
        example:
          "script_id object, site_code object, received_at datetime64[ns, UTC], dispensed_at datetime64[ns, UTC], item_count int64, priority object (3 nulls of 51204)",
      },
      {
        token: "GRAIN",
        label: "Row count and what one row represents",
        example: "51,204 rows, one row per prescription script received, not per item",
      },
      {
        token: "JOINS",
        label: "Joins needed and expected cardinality",
        example:
          "Join to sites on site_code, expected many to one. Join to staffing on site_code plus date, expected many to one but staffing has gaps at weekends.",
      },
      {
        token: "ENVIRONMENT",
        label: "Library versions and constraints",
        example: "pandas 2.2, no internet access, cannot install new packages, running in a locked down notebook",
      },
    ],
    expectedOutput:
      "A profile block that transforms nothing, numbered analysis steps each printing shape before and after, validated merges with row count asserts, a reading guide with thresholds, and an explicit list of the assumptions the code depends on.",
    followUps: [
      "The staffing join assert failed at step four with more rows out than in. Give me the three lines that diagnose which key duplicated.",
      "Rewrite block two so each step is a function with a docstring stating its precondition, and add a test for the grain assumption.",
      "Priority has three nulls. Show me both versions of step six, one dropping them and one keeping them, and print the difference in the result.",
    ],
    pitfalls: [
      "Paraphrasing your schema instead of pasting df.info() gets you code full of near miss column names that fail on the first line.",
      "If you do not state the grain, the model assumes one row per whatever the question is about, and every count is quietly wrong by an item multiplier.",
      "Models will add a print statement announcing the conclusion at the end. Delete it. It was written before any data existed.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "The instruction against narrating results came from a run where Claude produced clean code and then a paragraph beginning with the observation that turnaround had clearly worsened at the larger sites. It had seen no data at all. Both models did this until told not to, and GPT-5.2 still likes to leave a final print statement announcing a conclusion, which I delete before running anything.",
  },

  article: {
    intro: [
      "A python analysis prompt has an unusual failure mode: the code is fine and the commentary around it is fiction. A model asked to analyse a dataset it has never seen will write correct pandas and then describe what the output shows, in complete sentences, with a plausible direction and a plausible magnitude.",
      "The fix is to split the two jobs apart. The model writes instrumented code and a guide to reading its output, and no findings, because it has access to none. Every step prints what it did to the shape of the data, so the person running it sees the transformation rather than trusting it.",
    ],

    sections: [
      {
        heading: "Code that reports on itself at every step",
        body: [
          "Pandas code that checks its own assumptions looks noisier than the tidy version and is worth the extra lines. A chain of six operations that prints nothing is a black box: if the answer is wrong, every step is equally suspect.",
          "Printing shape before and after each step turns that into a bisection. The row count that changed unexpectedly tells you which line to read, usually in seconds, and it catches the class of bug where the code runs perfectly and quietly operates on eighty percent of the data.",
        ],
        subsections: [
          {
            heading: "Profile before you transform",
            body: [
              "Printing null rates before analysing is the block people delete first and regret most. A column that is thirty percent empty produces a mean over the remaining seventy percent without complaint, and nothing in the result hints at the missing rows.",
              "The profile block also prints distinct counts on key columns and the date range. A join key with more distinct values than rows is impossible and points at whitespace or case differences. A date column whose maximum is three weeks old points at a stalled pipeline rather than at the business.",
            ],
          },
          {
            heading: "Say what would break it",
            body: [
              "The final block lists the assumptions the code embeds: the grain, the cardinality of each join, whether a null means zero, how timezones were handled. They are invisible in working code and exactly what someone reusing the notebook next quarter needs.",
            ],
          },
        ],
      },
      {
        heading: "Asserting row counts after a merge",
        body: [
          "Asserting row counts after a merge is a two line habit that prevents the most expensive silent bug in analysis work. A many to one join where the right hand side turns out to contain duplicate keys becomes a many to many join, the row count multiplies, and every subsequent sum is inflated by an amount nobody can see.",
          "The pandas merge function takes a validate argument that raises immediately when the cardinality is not what you claimed. Combined with an assert on the expected row count, it converts a wrong total into an exception at the line that caused it. The cost is one keyword argument. The alternative is finding out when a figure fails to reconcile with finance.",
        ],
      },
      {
        heading: "Why a groupby silently drops nulls",
        body: [
          "Why a groupby silently drops nulls surprises people every time, and the reason is a default. Grouping by a column excludes rows whose group key is missing, so a category column with two hundred empty cells produces a table whose totals no longer add up to the dataset, with no warning issued.",
          "The prompt forces an explicit choice: set dropna to False, or print the number of rows being discarded and record why that was acceptable. Either is defensible. The undocumented default is not, because it changes the denominator of everything downstream.",
        ],
        list: [
          "Grouping keys with nulls, which vanish from the result without a message.",
          "Integer columns promoted to float the moment a single null appears.",
          "Chained assignment that modifies a copy and leaves the original untouched.",
          "String keys differing only by trailing whitespace or case, which never match on a join.",
          "Timezone aware and naive datetimes compared together, which raises in some versions and coerces in others.",
        ],
      },
      {
        heading: "What the python analysis prompt must never narrate",
        body: [
          "The python analysis prompt is forbidden from stating a result, and this is the constraint that people remove first and regret later. A model with no data access that writes a sentence about what the analysis found has generated the sentence from the shape of the question, not from the numbers.",
          "It is a convincing sentence: right columns, plausible direction, the cadence of a real finding. That is why it survives into a summary. Blocking it costs nothing, because the reading guide in block three does the useful half of the same job: it tells you which printed values would mean something is wrong.",
          "Used as an ai prompt for writing pandas code inside a notebook, the practical rhythm is to run the profile block on its own, read it, and only then paste the analysis block. Half the time the profile changes the question.",
        ],
      },
    ],

    howTo: {
      name: "How to use the python analysis prompt",
      steps: [
        {
          name: "Paste df.info() verbatim",
          text: "Not a description of the columns. The exact output, including dtypes and the non null counts, which is where most of the useful context lives.",
        },
        {
          name: "State the grain in plain words",
          text: "One row per order, per line item, per day per site. Getting this wrong multiplies every count and the code will not notice.",
        },
        {
          name: "Declare each join's cardinality",
          text: "Say whether you expect one to one, many to one or one to many. That claim becomes the validate argument and the assert that follows it.",
        },
        {
          name: "Run the profile block alone",
          text: "Read the null rates and date ranges before running anything else. This is the cheapest point at which to discover the data will not answer your question.",
        },
        {
          name: "Delete any sentence about findings",
          text: "If a conclusion survived into the output, remove it before the notebook is shared. It was written without reference to a single value.",
        },
        {
          name: "Keep block four with the notebook",
          text: "The assumption list is what makes the analysis reusable. Paste it into the top cell so the next person meets it first.",
        },
      ],
    },

    faq: [
      {
        question: "Does the python analysis prompt need my actual data?",
        answer:
          "No, and it works better without it. It needs the schema, the row count and the grain, which is enough to write correct code and to set sensible thresholds in the reading guide. Keeping the data local also means nothing sensitive leaves your environment.",
      },
      {
        question: "Why not just ask for the answer directly?",
        answer:
          "Because a model cannot execute code against a dataset it has not been given, so the answer would be constructed rather than computed. Generating instrumented code that you run yourself keeps the arithmetic in a tool that actually touched the numbers.",
      },
      {
        question: "Will the code run first time?",
        answer:
          "Often, if you pasted the schema exactly. The common failures are a column name that differs by a suffix, a dtype the model assumed was numeric, and a pandas version where a keyword argument was renamed. Fill in the environment field.",
      },
      {
        question: "Is all the printing not going to be noisy?",
        answer:
          "Yes, and that is the trade. A notebook with a hundred lines of diagnostic output is unpleasant to read once and invaluable when a number looks wrong, because the transformation history is already on screen rather than needing to be reconstructed.",
      },
      {
        question: "Can I use this with polars or with SQL instead?",
        answer:
          "The structure transfers, but the specific instructions do not. Validate arguments and dropna defaults are pandas behaviours, so replace those clauses with the equivalents in your tool and keep the profile block, the asserts and the assumption list, which are library independent.",
      },
      {
        question: "What if the schema does not contain what I need?",
        answer:
          "The prompt is instructed to name the missing column and stop rather than improvise one. That refusal is useful output: it converts a vague sense that the analysis is hard into a specific request to whoever owns the source table.",
      },
      {
        question: "Should the asserts stay in production code?",
        answer:
          "Keep them. An assert that has never fired costs microseconds and documents an expectation in a form the interpreter enforces. The ones worth removing are those that fire routinely, since a check people learn to comment out is worse than no check.",
      },
      {
        question: "How do I handle a merge that legitimately duplicates rows?",
        answer:
          "Declare it as one to many in the joins field and assert the expected multiplied count rather than the original. The point is not that row counts must stay constant, it is that a change in row count should be predicted before it happens.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description:
          "Produces the numbered rules this code should implement, so the transformations are agreed before they are written.",
      },
      {
        href: "/data-analysis-prompts/cohort-analysis-prompt",
        label: "cohort analysis prompt",
        description:
          "The reading side of a retention grid, once the code that built it has printed its counts and passed its asserts.",
      },
      {
        href: "/data-analysis-prompts/chart-selection-prompt",
        label: "chart selection prompt",
        description:
          "For deciding what the resulting table should look like before writing any plotting code on top of it.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "sql query prompt",
        description:
          "When the aggregation belongs in the warehouse instead, with the same insistence on stated cardinality.",
      },
    ],

    externalLinks: [
      {
        href: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html",
        label: "pandas: DataFrame.merge and the validate argument",
        description:
          "The primary documentation for the cardinality check this prompt requires on every join, including what each validate value enforces.",
      },
      {
        href: "https://scikit-learn.org/stable/common_pitfalls.html",
        label: "scikit-learn: common pitfalls and recommended practices",
        description:
          "A maintained list of the silent errors that produce plausible numbers in Python data work, written by the library authors.",
      },
      {
        href: "https://arxiv.org/abs/2211.12588",
        label: "Chen and colleagues: program of thoughts prompting",
        description:
          "Research showing that making a model emit code rather than reason numerically in prose reduces arithmetic errors substantially.",
      },
      {
        href: "https://docs.python.org/3/tutorial/floatingpoint.html",
        label: "Python documentation: floating point arithmetic",
        description:
          "Explains why two sums of the same column can differ in the last digits, which is worth knowing before treating a reconciliation gap as a bug.",
      },
    ],
  },
};

export default meta;
