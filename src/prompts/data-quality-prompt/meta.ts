import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "data-quality-prompt",
  name: "Defect Register",
  title: "Data Quality Prompt",
  category: "data-analysis-prompts",
  taskType: "evaluate",
  summary:
    "Scores every column on completeness, validity and freshness, weights each defect by whether anything downstream reads it, and refuses to recommend fixing a field nobody uses.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["data quality", "profiling", "governance", "audit"],

  seo: {
    primaryKeyword: "data quality prompt",
    keywords: [
      "data quality prompt",
      "profiling a table before fixing it",
      "null rate by column scorecard",
      "ai prompt for data quality checks",
      "which columns nobody actually queries",
      "freshness and completeness of a table",
    ],
    seoTitle: "Data Quality Prompt: Score a Table Before Fixing It",
    seoDescription:
      "A data quality prompt that scores each column on completeness, validity and freshness, ranks defects by who reads them, and will not fix a field nobody uses.",
  },

  prompt: {
    text: `You are profiling a table. You are not repairing it and you must not propose a repair. Your output is a scored defect register that a person will use to decide whether any work is justified at all.

WHAT THE TABLE IS AND WHICH SYSTEMS WRITE TO IT: {{TABLE}}
COLUMN LIST WITH DECLARED TYPES: {{COLUMNS}}
PROFILE STATISTICS PER COLUMN AS FAR AS YOU HAVE THEM, MEANING NULL COUNT, DISTINCT COUNT, MINIMUM, MAXIMUM AND EXAMPLES OF ODD VALUES: {{PROFILE}}
KNOWN CONSUMERS, MEANING REPORTS, DASHBOARDS, DOWNSTREAM TABLES AND MODELS, PLUS ANY COLUMN NOBODY IS KNOWN TO READ: {{CONSUMERS}}
WHEN THE TABLE LAST LOADED AND HOW OFTEN IT IS SUPPOSED TO: {{FRESHNESS}}

Return four things and nothing else.

ONE, COLUMN SCORECARD. A row per column covering completeness, validity against the declared type, uniqueness wherever a key is claimed, and staleness wherever the column carries a date. Score each dimension CLEAN, DEGRADED or BROKEN using only the statistics supplied. Where a statistic was not provided, write NOT PROFILED rather than estimating it.

TWO, USAGE. For each column, whether a consumer is known, taken strictly from the consumers field. Never reason that a column is probably used because of its name.

THREE, RANKED REGISTER. Order defects by consequence, meaning severity combined with usage. A BROKEN column feeding three reports outranks a BROKEN column feeding nothing. For any defect in a column with no known consumer the recommendation is never a repair. It is one of two things: confirm nobody reads it and propose deprecation, or find the consumer and rerank.

FOUR, QUESTIONS BEFORE ANY WORK. What would have to be answered before the top three defects could be scoped, and who is likely to know.

Do not recommend a transformation, a backfill or a validation rule. Do not call a column poor quality without naming the statistic that says so. A column absent from the profile appears in the scorecard as NOT PROFILED and nowhere else.`,
    variables: [
      {
        token: "TABLE",
        label: "What the table is and which systems write to it",
        example:
          "customer_master in the warehouse. Written by the CRM nightly, by a manual finance upload weekly, and by a support tool via API on ticket close.",
      },
      {
        token: "COLUMNS",
        label: "Column list with declared types",
        example:
          "customer_id text, legal_name text, trading_name text, sic_code text, credit_limit numeric, onboarded_on date, account_manager text, region text, last_reviewed_on date",
      },
      {
        token: "PROFILE",
        label: "Profile statistics per column",
        example:
          "customer_id: 0 null, 84,120 distinct of 84,377 rows. sic_code: 61,004 null. credit_limit: 4 null, min -500, max 99999999. region: 12 distinct including 'North', 'north ', 'NORTH'. last_reviewed_on: 78,900 null, max 2023-11-04.",
      },
      {
        token: "CONSUMERS",
        label: "Known consumers, and columns nobody reads",
        example:
          "Credit exposure report uses credit_limit and region. Two downstream tables use customer_id. Nobody has queried sic_code or trading_name in the last 18 months of query logs.",
      },
      {
        token: "FRESHNESS",
        label: "Last load and expected cadence",
        example: "Last successful load 3 days ago. Expected nightly. No alert exists on the load job.",
      },
    ],
    expectedOutput:
      "A per column scorecard with an explicit rating on each dimension and NOT PROFILED where evidence is absent, a usage column drawn only from stated consumers, a register ranked by severity combined with usage, and the questions that must be answered before scoping.",
    followUps: [
      "The top defect is a duplicated key with two report consumers. Write the message that asks the report owners which duplicate they would expect to see.",
      "Turn the deprecation candidates into a single note for the CRM team, with the query log evidence for each.",
      "Assume the query log only covers scheduled jobs and misses ad hoc analysts. Which usage judgements would you withdraw?",
    ],
    pitfalls: [
      "Leaving the consumers field vague makes every defect look equally urgent, which is how a register becomes a wish list nobody works through.",
      "Query logs undercount human curiosity. A column with no logged usage may still be read in a spreadsheet, so confirm before deprecating anything.",
      "Models want to be helpful and will slip a suggested fix into the register. Delete those lines. The decision about whether to fix belongs to whoever owns the consumer.",
    ],
  },

  eeat: {
    author: "Nadia Haddad",
    authorCredential:
      "Nine years as a data analyst in retail and healthcare, mostly spent explaining why a promising result was noise.",
    testedOn: ["Claude Opus 4.5", "Gemini 3 Pro", "GPT-5.2"],
    testingNote:
      "I profiled a customer table where a column was 72 percent empty and every model I tested opened with a remediation plan for it. When I added the query log and it turned out nothing had read that column in eighteen months, the ranking inverted completely and the top item became a quietly stale date field two reports depended on. The usage input changed the answer more than any scoring rule did.",
  },

  article: {
    intro: [
      "A data quality prompt should tell you what is wrong and how much it matters, and then stop. The instinct to move straight to remediation is what produces long backlogs of cleanup work on columns that turn out to feed nothing at all.",
      "Everything here is scored from supplied statistics. Null counts, distinct counts, ranges and examples of odd values go in; a rating per column comes out. Where a statistic was not provided, the column is marked as unprofiled rather than assessed on the strength of its name.",
      "The input that changes the answer most is not a statistic. It is the list of who reads each column, because severity without usage produces a register sorted by how ugly a column looks rather than by what breaks if it stays broken.",
      "The prompt is deliberately unhelpful in one direction: it will not propose a fix, and for an unread column it will propose deprecation or a question instead.",
    ],

    sections: [
      {
        heading: "Score the table, do not repair it",
        body: [
          "Profiling a table before fixing it separates two decisions that get collapsed constantly. The first is factual: this column is 72 percent empty, this key repeats, this date has not advanced since November. The second is a judgement about whether any of that deserves someone's week.",
          "Collapsing them means the second decision gets made implicitly by whoever wrote the report, usually in favour of whatever was easiest to describe. Keeping them apart puts a ranked register in front of the person who owns the consequences, and quite often the answer is that nothing needs doing.",
        ],
      },
      {
        heading: "A null rate by column scorecard is only half the picture",
        body: [
          "A null rate by column scorecard is the first thing anyone produces and it is genuinely useful, but emptiness is only one way a column fails. A field can be entirely populated and entirely wrong: a credit limit of minus five hundred, a region column holding three spellings of the same place, a supposedly unique identifier repeating on a quarter of rows.",
          "So the scorecard rates four dimensions rather than one. Completeness, validity against the declared type, uniqueness where a key is claimed, and staleness where the column carries a date. A column can be clean on completeness and broken on validity, and treating those as one score hides the failure that matters.",
        ],
      },
      {
        heading: "Freshness and completeness of a table are different failures",
        body: [
          "The freshness and completeness of a table describe separate problems with separate owners. A table that is fully populated and three days stale is a scheduling failure. A table that loaded on time with a third of its rows missing is a source failure. Both present to an analyst as numbers that look wrong.",
          "Freshness also has a nastier property: it degrades silently. A load job that stops running leaves yesterday's data in place, and every query keeps returning results. Nothing errors. The only symptom is a maximum date that stopped moving, which is why the scorecard treats a stalled date column as a defect in its own right rather than as background.",
        ],
      },
      {
        heading: "Which columns nobody actually queries",
        body: [
          "Finding which columns nobody actually queries is the highest value input you can bring, and most warehouses can produce it from query logs in an afternoon. The result is usually uncomfortable. A large fraction of columns in a mature table have not been read by anything in a year.",
          "For those columns the register does not recommend a repair, because repairing them buys nothing. It recommends confirming that nobody reads them and proposing deprecation, or finding the consumer that the logs missed and reranking.",
        ],
        list: [
          "Columns with no logged reads in a year, which are deprecation candidates rather than cleanup work.",
          "Columns read only by a report that itself has no viewers, which pushes the question one level up.",
          "Columns read by an ad hoc analyst rather than a scheduled job, which logs frequently miss.",
          "Columns read by a downstream table that nothing reads in turn, which is a chain worth tracing.",
          "Columns that exist because a source system emits them and no consumer was ever intended.",
        ],
      },
      {
        heading: "How the data quality prompt ranks what to raise",
        body: [
          "The data quality prompt ranks by consequence, which is severity combined with usage rather than severity alone. A broken column feeding three reports sits above a broken column feeding nothing, even when the second one looks far worse in the profile.",
          "This ordering annoys people who like a tidy table for its own sake, and it is the right one. Attention is the scarce resource in this work, not defects. A register sorted by ugliness will be worked from the top until everybody loses interest, and the stale date field that two reports depend on will still be there in six months.",
        ],
      },
      {
        heading: "Handing the register to somebody who can act",
        body: [
          "Run as an ai prompt for data quality checks, the output is not a task list. It is a document for a conversation with whoever owns the source system, and the questions section exists to structure that conversation rather than to be answered by the model.",
          "The questions are often more valuable than the register. Asking why a field is 72 percent empty tends to reveal that it was made optional in a form two years ago, which is a fix at the source that no downstream cleaning rule could ever match.",
        ],
      },
    ],

    howTo: {
      name: "How to use the data quality prompt",
      steps: [
        {
          name: "Run the profile query first",
          text: "Null counts, distinct counts, minimum, maximum and a handful of odd values per column. Paste the real output rather than a summary of it, since anything missing is scored as unprofiled.",
        },
        {
          name: "Pull the query log before you write anything",
          text: "Six to eighteen months of logged reads per column is what turns a list of defects into a ranking. Without it the register is sorted by appearance.",
        },
        {
          name: "Take the questions section to the source owner",
          text: "Not the register. The register describes symptoms, and the questions are what lead to the form field or export setting that produced them.",
        },
      ],
    },

    faq: [
      {
        question: "How is the data quality prompt different from a cleaning plan?",
        answer:
          "A cleaning plan assumes the decision to fix has been taken and writes the rules that implement it. This runs earlier, deciding whether any fixing is justified, and it deliberately produces no rules at all so the ranking cannot be skipped on the way to the interesting work.",
      },
      {
        question: "Can it work without a query log?",
        answer:
          "It will run, but the ranking degrades to severity alone, which is the failure mode the whole design exists to avoid. If no log is available, ask three or four heavy users which columns they read and use that, since even an approximate usage list beats none.",
      },
      {
        question: "What if a column is broken and nobody reads it?",
        answer:
          "Propose deprecating it rather than repairing it. A broken unread column costs nothing today and will cost something the day somebody discovers it and assumes it is trustworthy, so removal is usually cheaper and safer than a repair nobody will maintain.",
      },
      {
        question: "How many rows should the profile be based on?",
        answer:
          "The whole table where you can afford it, since rare defects are the ones that break things and a sample hides them by definition. If you must sample, state the sample size in the profile so the scorecard can flag which judgements depend on it.",
      },
      {
        question: "Should scores be tracked over time?",
        answer:
          "Yes, and the direction matters more than the level. A column drifting from clean to degraded over three months points at a change upstream, while a column that has been degraded since the table was built is a design decision somebody made deliberately.",
      },
      {
        question: "Who should own the register once it exists?",
        answer:
          "Whoever owns the consumers, not the warehouse team. The people running the affected reports are the only ones who can say whether a defect is tolerable, and a register owned by the platform side becomes a backlog that grows faster than it is worked.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description:
          "The next step once a defect has earned attention, turning it into reviewable rules rather than a silent transformation.",
      },
      {
        href: "/data-analysis-prompts/metric-definition-prompt",
        label: "metric definition prompt",
        description:
          "For the moment a defect turns out to be a disagreement about what a column was supposed to mean.",
      },
      {
        href: "/data-analysis-prompts/anomaly-detection-prompt",
        label: "anomaly detection prompt",
        description:
          "Catches the stale load in real time, which is the failure this scorecard finds after the fact.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For proposing the upstream change when the register shows a source system is producing the defects.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.iso.org/standard/35736.html",
        label: "ISO/IEC 25012: data quality model",
        description:
          "The published standard naming the quality characteristics the scorecard rates, which is why completeness and currentness are scored separately.",
      },
      {
        href: "https://www.w3.org/TR/vocab-dqv/",
        label: "W3C: Data Quality Vocabulary",
        description:
          "A standards body definition of quality dimensions and measurements, useful when a register has to be understood outside your own team.",
      },
      {
        href: "https://dl.acm.org/doi/10.14778/3229863.3229867",
        label: "Schelter and colleagues: automating large scale data quality verification",
        description:
          "A peer reviewed account of profiling tables at scale, including why constraint checks belong next to the consumers rather than the storage.",
      },
      {
        href: "https://www.gov.uk/government/publications/the-government-data-quality-framework",
        label: "UK Government Data Quality Framework",
        description:
          "An institutional source for the principle that quality is judged against intended use, which is the basis for weighting defects by usage.",
      },
    ],
  },
};

export default meta;
