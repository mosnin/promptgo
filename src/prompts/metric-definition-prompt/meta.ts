import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "metric-definition-prompt",
  name: "Spec Writer",
  title: "Metric Definition Prompt",
  category: "data-analysis-prompts",
  taskType: "generate",
  summary:
    "Writes a metric down to the exclusion list, the timestamp and the restatement rule, and refuses to specify anything that has no named owner or decision behind it.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["metrics", "definitions", "governance", "reporting"],

  seo: {
    primaryKeyword: "metric definition prompt",
    keywords: [
      "metric definition prompt",
      "defining the denominator of a metric",
      "why two teams report different numbers",
      "ai prompt for a metric spec",
      "which timestamp a metric should use",
      "edge cases in an active user count",
    ],
    seoTitle: "Metric Definition Prompt: End the Two Numbers Problem",
    seoDescription:
      "A metric definition prompt that pins down the numerator, the exclusions, the timestamp and the restatement rule, so two teams stop reporting different figures.",
  },

  prompt: {
    text: `You are writing a specification precise enough that two engineers working separately would return identical figures. Ambiguity you leave behind becomes a disagreement in a meeting six months from now.

METRIC NAME AS PEOPLE CURRENTLY SAY IT: {{METRIC}}
THE DECISION IT INFORMS AND WHO OWNS THAT DECISION: {{OWNER}}
TABLES AND FIELDS AVAILABLE, WITH THEIR GRAIN: {{SOURCES}}
FIGURES ALREADY CIRCULATING FOR THIS METRIC, WITH WHO PRODUCES EACH: {{EXISTING}}
POPULATION THE METRIC IS MEANT TO DESCRIBE: {{POPULATION}}

If the owner field is empty or names a team rather than a person, stop and say the metric cannot be specified yet. Do not continue.

Otherwise produce a specification with these headings exactly.

NUMERATOR. The countable thing, the table it comes from, and the grain of one row.
DENOMINATOR. The population it is divided by, or the words NOT A RATE.
EXCLUSIONS. Every record type deliberately left out, each with the reason. Internal accounts, test records, refunds, bots, staff, deleted entities.
TIME. Which timestamp anchors a record to a period, which timezone, and what happens to a record whose timestamp lands in one period and whose event belongs to another.
DEDUPLICATION. The key that makes a record unique and what to do with repeats.
RESTATEMENT. Whether a published figure may change later, by how much, and after how many days it is frozen.
AMBIGUOUS CASES. At least eight specific records that a reasonable person could argue either way, each with a ruling and one sentence of justification.
RECONCILIATION. For each figure already circulating, the single definitional choice that most likely explains the gap.

Never invent a field that is not in the sources list. Where the sources cannot support a clause, write CANNOT BE MEASURED WITH CURRENT DATA and say what would need collecting.`,
    variables: [
      {
        token: "METRIC",
        label: "Metric name as people currently say it",
        example: "Active patients per clinic per month",
      },
      {
        token: "OWNER",
        label: "The decision it informs and who owns that decision",
        example:
          "Staffing rota sizing for the next quarter, owned by Priya Raman, head of clinic operations",
      },
      {
        token: "SOURCES",
        label: "Tables and fields available, with grain",
        example:
          "appointments (one row per booking: patient_id, clinic_id, booked_at, seen_at, status), patients (one row per patient, includes is_test flag), clinics (one row per clinic)",
      },
      {
        token: "EXISTING",
        label: "Figures already circulating and who produces each",
        example:
          "Operations dashboard says 4,180. The finance pack says 3,905. A clinic manager's spreadsheet says 4,402.",
      },
      {
        token: "POPULATION",
        label: "Population the metric is meant to describe",
        example: "Patients who attended at least one appointment in person during the calendar month",
      },
    ],
    expectedOutput:
      "A specification under the exact headings requested, at least eight ruled edge cases with justifications, an explicit restatement window, and a reconciliation line for every circulating figure naming the one definitional choice that most plausibly explains its gap.",
    followUps: [
      "Write the SQL that implements this specification, with a comment quoting the clause each WHERE condition comes from.",
      "Two of your rulings will be unpopular with the clinic managers. Name them and draft how I raise each one.",
      "Produce a one paragraph plain description of this metric for a slide, with a link to the full spec, that does not contradict any clause.",
    ],
    pitfalls: [
      "Leaving the existing figures field blank removes the reconciliation section, which is usually the only part anybody reads.",
      "A metric owned by the data team is a metric nobody will defend when a clause becomes inconvenient. Name the person who acts on the number.",
      "Models are strong on exclusions and weak on timezone rulings. Read the time clause twice, especially if your reporting day starts anywhere other than midnight UTC.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "Reconciliation is the part models handle well. Given two conflicting figures they will work out that one side counts by invoice date and the other by appointment date, which diverge whenever a record crosses a month boundary. Edge cases are the weak part. Left to their own judgement they produce four and stop, so the required number is written into the instruction.",
  },

  article: {
    intro: [
      "A metric definition prompt is what you reach for when the same number arrives three times with three values. Nobody in that situation is wrong. They are counting different things and calling both of them active users, and the argument cannot be settled by rerunning either query.",
      "The output here is a specification, not a figure. It pins down the numerator, the denominator, the exclusions, the timestamp, the deduplication key and the rules for changing a published number after the fact, then rules on at least eight cases a reasonable person could argue either way.",
    ],

    sections: [
      {
        heading: "A metric is a numerator, a denominator and a list of exclusions",
        body: [
          "Most metric disputes are exclusion disputes. Both sides agree on what a purchase is and disagree about refunds, staff orders, test accounts and the reseller who places forty identical orders a month. None of that is visible in the metric's name, and all of it moves the number.",
          "Defining the denominator of a metric takes longer than defining the numerator and gets a fraction of the attention. Conversion rate over what: sessions, visitors, eligible visitors, visitors who reached the page where conversion was possible? Those four denominators produce four rates from one set of events, and each is defensible in isolation.",
        ],
      },
      {
        heading: "Why two teams report different numbers for the same thing",
        body: [
          "Understanding why two teams report different numbers usually comes down to a single clause, and the reconciliation section exists to find it. Finance counts by invoice date, operations counts by service date, and the two figures differ by whatever crosses a month boundary. Neither team has made an error.",
          "Naming the clause matters more than picking a winner. Once everyone can see that the gap is a date choice, the conversation moves from whose query is broken to which date the decision needs, and that question has an answer.",
        ],
      },
      {
        heading: "Which timestamp a metric should use",
        body: [
          "Which timestamp a metric should use is decided by the decision, not by which column is most convenient. A rota built from attendance wants the time the patient was seen. A revenue figure for a board pack wants the date the obligation was recognised. Picking the field that happens to be indexed produces a number that answers neither.",
          "Timezone is the second half of the same clause and gets skipped almost universally. A reporting day that starts at midnight UTC will move evening activity in Auckland into the following day, and the resulting weekday pattern is an artefact rather than behaviour.",
        ],
      },
      {
        heading: "Edge cases in an active user count",
        body: [
          "Edge cases in an active user count are where a specification is either useful or decorative. The prompt demands at least eight rulings because models reliably produce four obvious ones and stop, and the fifth through eighth are the ones that come up in practice.",
        ],
        list: [
          "A user who opened the app, saw an error screen and closed it.",
          "An automated integration authenticating with a human account's credentials.",
          "A shared login used by six people at one site.",
          "A user active only through an email link that never loaded the application.",
          "An account deleted mid month, which was active and now does not exist.",
          "A staff member testing the live system, indistinguishable from a customer.",
        ],
      },
      {
        heading: "The metric definition prompt refuses an unowned metric",
        body: [
          "The metric definition prompt stops outright when nobody owns the decision the number feeds. This looks obstructive and is the most useful thing it does, because an unowned metric has no tiebreaker. Every ambiguous case becomes a matter of taste, and the specification is quietly rewritten by whoever next needs a different answer.",
          "Naming a person rather than a team is deliberate. Teams do not defend clauses. A named owner is who you go to when the reseller starts placing forty orders a month and somebody wants them excluded retrospectively.",
        ],
      },
      {
        heading: "Late arriving data and the restatement rule",
        body: [
          "Every figure published before its source data has finished arriving will change. The question is whether that change is a documented restatement or an unexplained discrepancy that somebody notices in a screenshot three weeks later.",
          "The restatement clause states how long a period stays open, how large a revision is expected, and when the number freezes. National statistics offices have published revision policies for decades for precisely this reason, and a two line version of one removes most of the trust problem inside a company.",
        ],
      },
      {
        heading: "Turning the specification into something queryable",
        body: [
          "Used as an ai prompt for a metric spec, the natural next step is code. Ask for the query with each WHERE condition commented against the clause it implements, which makes the implementation auditable against the document rather than merely consistent with somebody's memory of it.",
          "Store the specification next to the query and version both. A clause that changes without a version bump produces a series where the definition shifted mid history, and that is worse than two teams disagreeing, because the discontinuity is invisible.",
        ],
      },
    ],

    table: {
      caption: "One phrase, four defensible definitions, four different numbers",
      headers: ["Definition of active user", "Counts", "Excludes", "Fits which decision"],
      rows: [
        [
          "Any authenticated session",
          "Logins, including automated ones",
          "Nothing",
          "Infrastructure capacity planning",
        ],
        [
          "A session with one meaningful action",
          "Humans who did something",
          "Bounces, health checks",
          "Product engagement review",
        ],
        [
          "A distinct human in the month",
          "People, deduplicated",
          "Shared logins counted once",
          "Licensing and seat pricing",
        ],
        [
          "An account with any activity",
          "Organisations, not people",
          "Individual usage detail",
          "Renewal risk assessment",
        ],
      ],
    },

    howTo: {
      name: "How to use the metric definition prompt",
      steps: [
        {
          name: "Collect the conflicting figures first",
          text: "Gather every version of the number currently in circulation with the name of whoever produces it. The reconciliation section has nothing to work on without them.",
        },
        {
          name: "Name one person as owner",
          text: "The owner is whoever acts on the number, not whoever builds it. If you cannot name someone, the prompt will refuse, and the refusal is the finding.",
        },
        {
          name: "Argue the eight edge cases with the owner, not the analysts",
          text: "Each ruling is a business choice wearing technical clothing. Ten minutes of rulings now replaces a recurring argument that never resolves.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a metric definition prompt specification be?",
        answer:
          "One page for the clauses, plus however much space the edge cases need. Anything longer stops being read, and an unread specification loses to whatever the person building the query assumed. Keep the reasoning in the justification sentences and resist adding background nobody will reach.",
      },
      {
        question: "What if two decisions genuinely need different definitions?",
        answer:
          "Then you have two metrics and they need two names. Calling both of them active users guarantees the numbers get compared eventually. Naming them separately, with each specification pointing at the other and explaining the difference, costs nothing and prevents the comparison.",
      },
      {
        question: "Can it specify a metric the current data cannot support?",
        answer:
          "It will write CANNOT BE MEASURED WITH CURRENT DATA against the clause and describe what would need collecting. That output is useful on its own, because it converts a vague complaint about missing data into a specific instrumentation request somebody can estimate.",
      },
      {
        question: "Who should sign off the specification?",
        answer:
          "The named owner, in writing, on the rulings rather than the whole document. Sign off on a page of clauses tends to be nominal, while sign off on eight specific cases forces someone to read the choices that will later be quoted back at them.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/dashboard-design-prompt",
        label: "dashboard design prompt",
        description:
          "Decides which specified metrics deserve a tile, once each one has a definition somebody has agreed to.",
      },
      {
        href: "/data-analysis-prompts/data-quality-prompt",
        label: "data quality prompt",
        description:
          "Profiles the fields a specification depends on, so a clause is not written against a column that is half empty.",
      },
      {
        href: "/data-analysis-prompts/report-automation-prompt",
        label: "report automation prompt",
        description:
          "Consumes the restatement clause directly, since a recurring document has to say when a published figure changed.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "sql query prompt",
        description:
          "For turning the finished clauses into a query whose conditions can be read back against the document.",
      },
    ],

    externalLinks: [
      {
        href: "https://sre.google/workbook/implementing-slos/",
        label: "Google SRE Workbook: implementing SLOs",
        description:
          "A detailed worked example of specifying an indicator down to the events counted and excluded, which is the same discipline applied to reliability.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc3339",
        label: "RFC 3339: date and time on the internet",
        description:
          "The standard that settles how an offset is recorded, which is what the timezone half of the time clause has to reference.",
      },
      {
        href: "https://www.bls.gov/cps/definitions.htm",
        label: "US Bureau of Labor Statistics: concepts and definitions",
        description:
          "A public example of a heavily scrutinised metric published with its full inclusion and exclusion rules, worth reading as a model of thoroughness.",
      },
      {
        href: "https://support.google.com/analytics/answer/12253918",
        label: "Google Analytics: active users",
        description:
          "Shows how one widely deployed tool draws the boundary on activity, which is often the hidden reason a vendor number differs from an internal one.",
      },
    ],
  },
};

export default meta;
