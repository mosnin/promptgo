import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Contract Renewal Date Tracking

Use this skill when you are tracking renewal and notice period deadlines across
multiple vendor or customer contracts at once and need to know, at a glance,
which ones require action soon. The job is bookkeeping, not judgment: log what
each contract's real text actually says about when it renews and when notice
is due, compute the dates that follow from that, and flag whatever falls
inside a stated warning window.

## Before you log anything

Every date entered into the log must come from the real contract text
supplied for that specific contract: the actual renewal date as stated, and
the actual notice period as stated, for example "90 days before the end of
the term" or "3 months prior to the renewal date." Do not invent, estimate,
or assume a renewal date or a notice period from the vendor's category, from
how long the relationship has run, or from what a similar contract usually
says. A plausible sounding date is not a real one.

If a contract's renewal date or notice period was not supplied, log that
entry as INCOMPLETE and name the exact missing field, rather than filling in
a guessed value so the log looks tidier. Ask for, or locate, the source
document, the actual contract, a signed amendment, or a renewal notice,
behind every entry, and record it in the log so the date can be checked
later against where it came from.

## Logging a contract

Use \`reference/renewal-log-format.md\` as the format for every entry. Each
one records the contract name, the renewal date as stated, the notice period
as stated, the notice-by date computed from those two figures, the source
document the dates were read from, and a status of COMPLETE or INCOMPLETE.

Log one entry per contract. Do not merge two agreements with the same vendor
into a single entry, even when they share a name, since two separate
contracts can carry different renewal dates and different notice periods.

## Computing the notice-by date

The notice-by date is the renewal date minus the notice period, using
exactly the unit the contract states. Show the arithmetic explicitly every
time: state the renewal date, state the notice period, then state the
subtraction and the resulting notice-by date, so the computation is
checkable against the two numbers it depends on rather than taken on faith.

When a notice period is stated in months, subtract calendar months from the
renewal date, keeping the day of month where the calendar allows it, rather
than converting months to an approximate day count. When it is stated in
days, subtract that exact number of calendar days. Never round a computed
notice-by date to a "nearer" or more convenient date. If the exact date
lands on a weekend or a public holiday, note that separately as a practical
scheduling flag; it does not change the notice-by date itself.

## Flagging what is coming up

Ask for, or use, a stated warning window, for example "flag anything with a
notice-by date within 30 days of today." Using today's date and the log,
compute days until deadline for each contract as the number of days between
today and its notice-by date. Flag every contract whose notice-by date falls
inside the stated window, listed in ascending order of days remaining, so
the most urgent entry appears first.

A contract logged as INCOMPLETE is never included in the flagged list based
on a guessed date. State separately, in its own section, that it needs a
real source date before it can be assessed against the warning window at
all, since silence about a deadline is not evidence that the deadline is far
away.

## Output format for a tracking pass

Present three sections, in this order:

1. The full log: every contract entered, whether flagged or not, in the
   format from the reference file.
2. Flagged: only entries whose notice-by date falls inside the stated
   warning window, ordered soonest first, each with its days until deadline
   figure shown.
3. Incomplete: every contract missing a real renewal date or a real notice
   period, naming exactly which field is missing and what to ask for.

## What this skill does not do

It does not review contract clauses for risk, liability caps, indemnity,
exit terms, or data ownership are a different, one time reading exercise,
not a recurring date log. It does not estimate, negotiate, or forecast
whether a renewal will happen. Every date in the log traces to the contract
text it was read from, and a missing date stays missing until the real
contract is supplied, never filled in with a plausible guess.
`;

const RENEWAL_LOG_FORMAT_MD = `# Contract renewal log format

Use this alongside \`SKILL.md\`. Every entry uses the six fields below, and
every date in an entry has to trace back to real contract text, never to an
assumption about the vendor or the deal.

## Fields per entry

1. **Contract name.** The vendor or customer and the specific agreement, for
   example "Northbridge Analytics, Data Platform Subscription," so two
   agreements with the same counterparty stay distinguishable.
2. **Renewal date (as stated).** The exact date, or the rule that produces
   it, quoted or closely restated from the contract text, followed by the
   resolved calendar date.
3. **Notice period (as stated).** The exact period the contract requires for
   notice to prevent renewal, in the unit the contract uses, quoted where
   possible.
4. **Notice-by date (computed).** Renewal date minus notice period, shown
   with the arithmetic that produced it, not just the final date.
5. **Source document.** The specific document, and the section or clause
   where available, that the renewal date and notice period were read from.
6. **Status.** COMPLETE when both a real renewal date and a real notice
   period were supplied, or INCOMPLETE naming exactly which field is
   missing.

## Worked example: a day based notice period

Contract name: Northbridge Analytics, Data Platform Subscription
Source document: Master Services Agreement, Section 9.2, executed 2025-03-14

Renewal date (as stated): "This agreement renews automatically for a
further 12 month term on March 14, 2027, unless terminated pursuant to
Section 9.2." Resolved renewal date: 2027-03-14.

Notice period (as stated): "Either party may terminate this agreement by
providing written notice no less than 90 days before the renewal date."
Resolved notice period: 90 days.

Notice-by date arithmetic, subtracting 90 calendar days from 2027-03-14:
- 2027-03-14 minus 14 days lands on 2027-02-28 (2027 is not a leap year, so
  February has 28 days).
- 76 days remain to subtract. 2027-02-28 minus 28 days lands on 2027-01-31.
- 48 days remain. 2027-01-31 minus 31 days lands on 2026-12-31.
- 17 days remain. 2026-12-31 minus 17 days lands on 2026-12-14.
- 14 plus 28 plus 31 plus 17 equals 90, so the subtraction is complete.

Notice-by date: 2026-12-14. Status: COMPLETE.

Days until deadline, checked as of 2026-07-31: counting forward from
2026-07-31 to 2026-12-14 gives 31 days to the end of August, 30 to the end
of September, 31 to the end of October, 30 to the end of November, and 14
more into December, for a total of 136 days. At a 30 day warning window this
entry is not flagged yet; at a 150 day window it is.

## Worked example: a month based notice period

Contract name: Aldergate Facilities, Regional Office Lease
Source document: Lease Agreement, Clause 14, executed 2024-09-01

Renewal date (as stated): "The term renews for a further period ending
November 30, 2026, unless notice is given as set out in Clause 14."
Resolved renewal date: 2026-11-30.

Notice period (as stated): "Notice of non renewal must be given no less
than 3 months before the renewal date." Resolved notice period: 3 months.

Notice-by date arithmetic, subtracting 3 calendar months from 2026-11-30:
subtract one month at a time, keeping the day of month, since November has
30 days there is no shorter-month adjustment needed for this entry.
2026-11-30 minus 1 month is 2026-10-30, minus a second month is 2026-09-30,
minus a third month is 2026-08-30.

Notice-by date: 2026-08-30. Status: COMPLETE.

## Worked example: a missing field

Contract name: Cassel Print Supply, Office Consumables Agreement
Source document: none supplied

Renewal date (as stated): not supplied.
Notice period (as stated): "Notice period as agreed in the original
purchase order," purchase order not supplied.

Status: INCOMPLETE. Missing field: renewal date and the purchase order the
notice period refers to. This entry is excluded from the flagged section
regardless of the warning window, and stays listed under incomplete until
the actual purchase order or contract is supplied.
`;

const meta: SkillMeta = {
  slug: "contract-renewal-date-tracking-skill",
  name: "Contract Renewal Date Tracking",
  title: "Contract Renewal Date Tracking Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that logs renewal and notice period deadlines across many real contracts, computes each notice-by date from the actual dates supplied, and flags what falls inside a stated warning window rather than guessing a date it was never given.",

  seo: {
    primaryKeyword: "contract renewal date tracking skill",
    keywords: [
      "contract renewal date tracking skill",
      "free ai skill for contract renewal tracking",
      "downloadable renewal deadline log template",
      "ai skill to track contract renewal dates",
      "how to track vendor contract renewal deadlines",
    ],
    seoTitle: "Contract Renewal Date Tracking Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable contract renewal date tracking skill that logs renewal and notice deadlines across many contracts and flags what is coming up.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/renewal-log-format.md", content: RENEWAL_LOG_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to build a renewal deadline log from a list of vendor names or a short summary of a portfolio, models reliably fill gaps with a plausible renewal date or a typical notice period such as 30 or 90 days, rather than asking for the actual contract text. This skill's log format forces every date to trace to a quoted or restated line from a real source document, and requires a missing renewal date or notice period to be logged as incomplete rather than estimated from what similar contracts usually state.",
  },

  article: {
    intro: [
      "A contract renewal date tracking skill is only trustworthy if every date in its log came from an actual contract rather than a plausible guess about what one probably says. Handed a spreadsheet of vendor names and rough dollar amounts, most AI assistants will happily produce tidy renewal dates and round notice periods like 30 or 90 days anyway, because a full looking log reads as more useful than one with gaps. This skill refuses that shortcut across an entire portfolio.",
      "It ships as two plain text files: a main instructions file and a reference file defining the log entry format, including worked date arithmetic examples and one example of a contract logged as incomplete. Both are previewable in full on this page before you download the .zip, exactly what an AI assistant receives once you hand over the archive.",
      "Its job stops at the log itself. It records what each contract's text says about renewal and notice, computes the notice-by date, and flags entries falling inside a stated warning window, leaving any judgment about renewal to whoever reads the finished log.",
    ],
    sections: [
      {
        heading: "Why a renewal date has to come from the contract, not the vendor",
        body: [
          "A vendor relationship that has run for years and a brand new one can carry identical notice periods, or completely different ones, and neither fact is knowable from the vendor's name or how long the account has existed. Two agreements with the same counterparty can even carry different notice periods if negotiated separately. This skill's first instruction is to treat a renewal date or a notice period as unknown until real contract text supplies it.",
          "When only a company name and a rough sense of an upcoming deadline exist, the honest output is an entry logged as incomplete, naming the missing renewal date or notice period specifically. That distinction is what separates a free ai skill for contract renewal tracking worth trusting from a log that quietly launders a guess into a fact.",
        ],
      },
      {
        heading: "The log entry format and what each field requires",
        body: [
          "Every entry in the downloadable renewal deadline log template carries six fields: contract name, renewal date as stated, notice period as stated, the notice-by date computed from those two figures, the source document, and a status of complete or incomplete. Each of the middle four fields is either quoted from the contract or marked missing, never inferred.",
          "Keeping the source document field on every row is what makes a later date checkable, since a renewal date with no citation behind it is functionally the same as a guessed one even when it happens to be correct.",
        ],
      },
      {
        heading: "How the notice-by date is computed, with the arithmetic shown",
        body: [
          "The notice-by date is the renewal date minus the notice period, in whatever unit the contract states, and the reference file shows the subtraction explicitly rather than presenting only the answer. A 90 day notice period subtracted from a March 14 renewal date, for example, lands on December 14 of the previous year once the arithmetic is walked out month by month, since February that year has only 28 days.",
          "A month based notice period is handled differently: calendar months are subtracted one at a time, keeping the day of month fixed where the calendar allows it, rather than converting months into an approximate day count that would drift depending on which months are crossed.",
        ],
      },
      {
        heading: "How this differs from a vendor contract review",
        body: [
          "The vendor contract review prompt already on this site reads a single contract once, quotes its auto renewal, liability, exit and data ownership clauses, and rates each one standard, tighten before signing, or dealbreaker, ahead of a signature decision. That is clause risk review, a one time judgment call on the language of one agreement.",
          "This contract renewal date tracking skill sits on a different axis. It runs continuously across a portfolio of contracts already signed, and makes no judgment about whether a clause is favorable. Its only output is a log of real dates, a computed deadline, and a flag for whatever is coming up soon, a bookkeeping job the clause review was never built to do.",
        ],
      },
      {
        heading: "Flagging what needs attention inside a stated warning window",
        body: [
          "As an ai skill to track contract renewal dates across many agreements at once, the flagging step is where the log earns its keep. Given a stated warning window, for example anything due inside 30 days, the skill compares today's date against each entry's notice-by date and lists whichever fall inside that window soonest first.",
          "An entry logged as incomplete is never allowed to slip quietly into the flagged list based on an assumed date, and it is never allowed to disappear from the log either. It stays in its own named section, so a missing contract cannot be mistaken for one that simply was not due yet.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not review a contract's clauses for risk, estimate a renewal date from a vendor's typical terms, or recommend whether to renew. Learning how to track vendor contract renewal deadlines this way means accepting an incomplete row as more useful than a plausible one, since a wrong date that looks confident is the exact failure this skill exists to prevent.",
        ],
      },
    ],
    howTo: {
      name: "How to use the contract renewal date tracking skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/renewal-log-format.md on this page before downloading, including the worked arithmetic examples, so you know what standard the log is held to.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real contract text for each agreement",
          text: "Before logging anything, collect the actual renewal clause and notice period language for every contract in scope. Missing text is fine to log as incomplete; a guessed date is not.",
        },
        {
          name: "Hand both files to your assistant with a stated warning window",
          text: "Keep the folder structure intact, then supply the contract text and the number of days that should count as coming up soon.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I do not have the actual notice period for a contract?",
        answer:
          "The entry is logged as incomplete, naming the notice period as the missing field, rather than filled in with a typical figure like 30 or 90 days. The instructions treat a missing input as genuinely unknown, and the incomplete section names what would need to be supplied.",
      },
      {
        question: "How is this different from the vendor contract review prompt on this site?",
        answer:
          "That prompt reads one contract's clauses once, before signing, rating auto renewal, liability, exit and data ownership language as standard, tighten, or dealbreaker. This skill runs continuously across many signed contracts, makes no judgment about clause language, and produces only a dated log with a flag for what is coming up soon.",
      },
      {
        question: "Can the skill estimate a renewal date if I only know roughly when a contract started?",
        answer:
          "No. A start date and a rough term length are not the same as the actual renewal date stated in the contract, since real agreements carry exceptions and amendments a rough estimate would miss. The skill logs the entry as incomplete until the real renewal date is supplied from the contract text.",
      },
      {
        question: "What does the flagged section actually show?",
        answer:
          "Only the contracts whose computed notice-by date falls inside the warning window you state, ordered soonest to furthest out, each with its days until deadline figure shown. Entries outside the window, and entries still logged as incomplete, are kept in their own separate sections rather than mixed in.",
      },
      {
        question: "Does the notice-by date ever get rounded to a more convenient day?",
        answer:
          "No. The computed notice-by date is left exactly where the arithmetic lands, even on a weekend or a holiday. If it falls on a non working day, the instructions call for noting that separately as a practical scheduling flag, since moving the date itself would misstate what the contract requires.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the contract text you run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/vendor-contract-review-prompt",
        label: "vendor contract review prompt",
        description: "A one time clause risk review before signing, auto renewal, liability, exit and data terms, distinct from this skill's ongoing date log across already signed contracts.",
      },
      {
        href: "/sales-skills/renewal-risk-flagging-skill",
        label: "renewal risk flagging skill",
        description: "Diagnoses account health signals like usage decline or a stakeholder change, a different question from this skill's pure date arithmetic and deadline flagging.",
      },
      {
        href: "/sales-prompts/renewal-conversation-prompt",
        label: "renewal conversation prompt",
        description: "The natural next step once a deadline is flagged as coming up, for drafting the actual renewal outreach or repair conversation.",
      },
      {
        href: "/tools/working-days-calculator",
        label: "working days calculator",
        description: "For checking a notice-by date against business days rather than calendar days when a contract's language calls for it.",
      },
    ],
    externalLinks: [
      {
        href: "https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions",
        label: "FTC Consumer Advice: Free Trials, Auto-Renewals, and Negative Option Subscriptions",
        description: "Primary regulatory guidance on how renewal notices and cancellation windows are meant to work, the practice this skill's notice-by date exists to track against.",
      },
      {
        href: "https://www.consumerfinance.gov/about-us/newsroom/cfpb-issues-guidance-to-root-out-tactics-which-charge-people-fees-for-subscriptions-they-dont-want/",
        label: "CFPB: Guidance on Negative Option Subscription Practices",
        description: "Federal guidance on the disclosure and consent problems that arise when a renewal or notice deadline is not tracked clearly ahead of time.",
      },
      {
        href: "https://www.law.cornell.edu/cfr/text/48/2152.249-70",
        label: "Cornell Law School Legal Information Institute: Renewal and Termination Clause Text",
        description: "A real regulatory clause showing how a renewal date and a notice period are stated together in operative contract language, the pattern this skill's log format is built to capture.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to sourcing every date.",
      },
    ],
  },

  tags: ["business", "contracts", "renewals", "deadlines", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
