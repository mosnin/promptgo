import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "sql-query-prompt",
  name: "Grain Declarer",
  title: "SQL Query Prompt",
  category: "coding-prompts",
  taskType: "generate",
  summary:
    "Declares the grain and the expected row count before writing a line of SQL, audits every join for fan out, and refuses to reference a column the schema does not contain.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["sql", "schemas", "joins", "analytics"],

  seo: {
    primaryKeyword: "sql query prompt",
    keywords: [
      "sql query prompt",
      "writing sql from a schema description",
      "estimating row counts before running a query",
      "avoiding accidental fan out in a join",
      "ai prompt for a postgres analytics query",
      "checking a generated query against the schema",
    ],
    seoTitle: "SQL Query Prompt: Declare the Grain Before You Join",
    seoDescription:
      "A sql query prompt that states the grain and expected row count before writing anything, audits each join for fan out, and never invents a column the schema lacks.",
  },

  prompt: {
    text: `You are writing SQL against a schema you may not extend. Every table and column you reference must appear in the schema below, spelled exactly as given. If the question cannot be answered with what is there, stop and name the missing column rather than inventing one.

SCHEMA, WITH KEYS AND NULLABILITY: {{SCHEMA}}
THE QUESTION IN BUSINESS TERMS: {{QUESTION}}
DIALECT AND VERSION: {{DIALECT}}
TABLE SIZES AND INDEXES: {{SCALE}}

STEP 1: GRAIN. Before writing any SQL, say in one sentence what a single row of the result represents. Then state the expected row count as an order of magnitude, with your reasoning. If you cannot predict the row count you do not yet understand the query.

STEP 2: JOIN LEDGER. For every join, give the two keys, the cardinality (one to one, one to many, many to many), and whether it can multiply rows on the left side. For each join that can multiply, state how you are preventing it: aggregate before joining, use a semi join, or accept the multiplication and justify it.

STEP 3: NULL AND EMPTY BEHAVIOUR. Say what the result contains when a joined row is absent, when a filtered column is NULL, and when the input set is empty. Explicitly flag any NOT IN against a nullable column, and any outer join whose filter sits in the WHERE clause rather than the ON clause.

STEP 4: VERIFICATION QUERY. Write a cheap query to run first that confirms the grain: row counts and distinct key counts at each stage. It must be runnable before the real query and must cost far less.

STEP 5: THE QUERY. Use only features available in the stated dialect and version. Comment every non obvious clause with the assumption it depends on.

STEP 6: WHAT WOULD MAKE THIS WRONG. List the schema facts you assumed but were not told, such as uniqueness that no constraint enforces.`,
    variables: [
      {
        token: "SCHEMA",
        label: "Schema with keys and nullability",
        example:
          "orders(id pk, customer_id fk not null, placed_at timestamptz not null, status text not null)\norder_items(id pk, order_id fk not null, sku text not null, qty int not null, unit_price_cents int not null)\nrefunds(id pk, order_id fk not null, amount_cents int not null, created_at timestamptz not null)\ncustomers(id pk, region text null, created_at timestamptz not null)",
      },
      {
        token: "QUESTION",
        label: "The question in business terms",
        example:
          "Net revenue by region for orders placed last month, excluding cancelled orders, with refunds subtracted. One row per region.",
      },
      {
        token: "DIALECT",
        label: "Dialect and version",
        example: "PostgreSQL 15, read replica, no materialised views available, statement timeout of 30 seconds.",
      },
      {
        token: "SCALE",
        label: "Table sizes and indexes",
        example:
          "orders 40 million rows, index on (placed_at) and (customer_id). order_items 220 million rows, index on (order_id). refunds 900 thousand rows, index on (order_id). customers 6 million rows.",
      },
    ],
    expectedOutput:
      "A one sentence grain statement with a predicted row count, a ledger listing every join and how fan out is prevented, an account of NULL and empty behaviour, a cheap verification query, then the final SQL with its assumptions commented.",
    followUps: [
      "The verification query says order_items joins produce 5.4 rows per order. Rewrite the main query so revenue is aggregated before the refunds join.",
      "Region is nullable. Show me both versions: one that drops null regions and one that groups them as unknown, and tell me which matches the question as asked.",
      "Give me the EXPLAIN output I should expect, and the one clause most likely to force a sequential scan on order_items.",
    ],
    pitfalls: [
      "Pasting a schema without nullability turns step three into guesswork, and NULL handling is where a query that runs cleanly returns the wrong total.",
      "Skipping the verification query because the main one looks right is how duplicated revenue reaches a dashboard. The count takes four seconds and it is the only step that actually proves the grain.",
      "A question phrased as a metric name rather than a definition invites the model to pick a definition. Net revenue means something different in three teams at the same company.",
    ],
  },

  eeat: {
    author: "Tom Vasquez",
    authorCredential:
      "Sixteen years as a backend engineer, the last five reviewing pull requests full time on a platform team.",
    testingNote:
      "Requiring a predicted row count before any SQL was the change that mattered. On a revenue question with a line item table in the middle, both models produced a query that quietly multiplied every order by its item count, and the totals looked plausible. Made to predict one row per region first, GPT-5.2 spotted the fan out itself and aggregated before joining.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "The dangerous output from a sql query prompt is not the query that errors. It is the query that runs, returns a tidy table, and is wrong by a factor nobody notices because the numbers are the right shape. A join that multiplies rows produces revenue figures that look high but believable, and they end up in a dashboard.",
      "This prompt front loads everything that would have caught that. The grain is declared in one sentence before any SQL exists, the expected row count is predicted out loud, each join is logged with its cardinality, and a cheap counting query is written to be run first. Used as an ai prompt for a postgres analytics query, that sequence catches more mistakes than reading the finished SQL does.",
      "It also refuses to invent. Every identifier has to appear in the schema you supplied, and a missing column ends the attempt rather than producing a plausible name.",
    ],

    sections: [
      {
        heading: "Writing sql from a schema description",
        body: [
          "Writing sql from a schema description works only when the description carries the constraints, not just the column names. Nullability, primary keys, foreign keys and any uniqueness that a constraint actually enforces are what decide whether a join is safe and whether a filter behaves.",
          "A schema dump with types alone leads the model to assume the friendly version of everything: that a foreign key means one row, that a text column is never empty, that a status field has the four values you mentioned. Each assumption is reasonable and each one is a place the result silently diverges from the question.",
        ],
      },
      {
        heading: "Estimating row counts before running a query",
        body: [
          "Estimating row counts before running a query sounds like a formality and is the strongest single check in the prompt. It forces the model to hold the grain in mind while it composes, and a wrong prediction is visible in a way that wrong SQL is not.",
          "The mechanism is simple. If the answer should be one row per region and you have eleven regions, any result with four hundred rows is a fan out, and you know that in one second without reading the query. If the model predicts a number it cannot justify, it has not worked out the shape of the result and the SQL underneath will reflect that.",
        ],
      },
      {
        heading: "Avoiding accidental fan out in a join",
        body: [
          "Avoiding accidental fan out in a join is mostly bookkeeping, which is why step two is a ledger rather than a paragraph. Each join gets its two keys, its cardinality and a yes or no on whether it can multiply the left side.",
          "Every yes then needs a stated remedy: aggregate before joining, use a semi join or an exists clause, or accept the multiplication with a reason. The failure that hurts is joining two one to many tables to the same parent, where each side multiplies the other and the totals are inflated by a factor that varies per row, so no constant correction exists.",
        ],
      },
      {
        heading: "Why the sql query prompt will not invent a column",
        body: [
          "Hallucinated identifiers are the most reported problem with generated SQL and the easiest to defend against, because the failure is loud. A missing column throws, you notice, you move on. The real cost is the near miss: a column that does exist but means something slightly different, chosen because its name matched the question better.",
          "The sql query prompt handles both by requiring exact spelling from the supplied schema and by ending the attempt when nothing fits. A response saying the schema has no cancellation timestamp, only a status string, is more useful than a query that treats an updated_at column as the cancellation time.",
        ],
      },
      {
        heading: "Checking a generated query against the schema",
        body: [
          "Checking a generated query against the schema is what steps four and six are for, and they attack it from different directions. The verification query proves the grain empirically with counts. The final list of unstated assumptions tells you what the model relied on that nobody confirmed.",
          "That last list is usually short and usually contains one item worth acting on: an assumption that a pairing is unique when no constraint enforces it. Uniqueness held by convention rather than by a constraint is where duplicate rows come from, and it is invisible in a schema dump.",
        ],
      },
    ],

    table: {
      caption: "What the result is supposed to be, and the join that quietly breaks it",
      headers: ["Requested output", "One row per", "Join that multiplies it"],
      rows: [
        ["Revenue by region", "Region", "orders to order_items, before aggregation"],
        ["Orders with refund totals", "Order", "orders to refunds, when an order has two refunds"],
        ["Customers and their last order", "Customer", "customers to orders, without a window or lateral limit"],
        ["Daily active accounts", "Day and account", "events to sessions, when both are one to many on account"],
        ["Products never ordered", "Product", "any inner join, which removes the rows you are looking for"],
      ],
    },

    howTo: {
      name: "How to use the sql query prompt",
      steps: [
        {
          name: "Paste constraints, not just columns",
          text: "Include nullability, keys and any unique index. The output quality tracks this more closely than it tracks how carefully you phrase the question.",
        },
        {
          name: "Define the metric, do not name it",
          text: "Net revenue is a label. Gross line item total minus refunds, excluding cancelled orders, by the date the order was placed, is a definition the model can implement without choosing for you.",
        },
        {
          name: "Run the verification query first",
          text: "Actually run it. Comparing its distinct key count against the predicted grain takes seconds and catches the fan out class of error completely.",
        },
        {
          name: "Read the unstated assumptions last",
          text: "Anything there about uniqueness deserves a check against the real index list, because a duplicate that appears once a month is the hardest wrong number to explain later.",
        },
      ],
    },

    faq: [
      {
        question: "Does the sql query prompt work without table sizes?",
        answer:
          "It works, but you lose the performance reasoning and part of the row count estimate. Approximate magnitudes are enough: knowing a table holds hundreds of millions rather than thousands changes whether the model aggregates early or leaves the planner to handle it.",
      },
      {
        question: "Which dialects has this been used with?",
        answer:
          "Postgres and BigQuery in testing, and the structure carries to any dialect provided you state the version. The version matters more than the engine, since features such as filtered aggregates and lateral joins determine whether the fan out remedy in step two is even available.",
      },
      {
        question: "Why write a separate verification query rather than just checking the result?",
        answer:
          "Because the final result has already collapsed the evidence. Once rows are grouped and summed, a duplicate from three joins earlier is invisible. Counting distinct keys at each stage shows you exactly where the row count stopped matching the grain.",
      },
      {
        question: "Can it optimise a slow query I already have?",
        answer:
          "That is a different task and it needs the plan, not just the SQL. Paste the EXPLAIN ANALYZE output alongside the query and the index list, otherwise any suggestion is a guess about which access path the planner chose.",
      },
      {
        question: "What if my schema is too large to paste?",
        answer:
          "Paste the tables the question touches plus anything they join through, with their keys. A partial schema is fine as long as it is honest, since step six will list what the model had to assume about the parts you left out.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "Run the finished query through it when the change also touches application code around the call site.",
      },
      {
        href: "/coding-prompts/regex-generator-prompt",
        label: "regex generator prompt",
        description:
          "For the pattern matching that ends up inside a similar to or regexp clause, where the same test first discipline applies.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Queries embedded in application code deserve tests against a fixture, built from the grain statement rather than the output.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When the number the query produces is about to justify a decision, and the definition behind it needs writing down.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.postgresql.org/docs/current/queries-table-expressions.html",
        label: "PostgreSQL: table expressions and joins",
        description:
          "Primary documentation for join semantics and for why a filter in WHERE turns an outer join back into an inner one.",
      },
      {
        href: "https://use-the-index-luke.com/sql/join",
        label: "Use the Index, Luke: join performance",
        description:
          "A detailed treatment of how join order and index availability decide whether a query on a large table finishes.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: prompt engineering guide",
        description:
          "Vendor documentation on requiring a model to commit to an intermediate answer, which is what the row count prediction does.",
      },
    ],
  },
};

export default meta;
