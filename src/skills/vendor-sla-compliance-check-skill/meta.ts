import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Vendor SLA Compliance Check

Use this skill when you have a vendor's actual SLA (service level agreement) terms, stated as
specific numeric commitments, and a log of that vendor's real performance over a stated period,
and need to know exactly which terms were met, which were missed, and by how much. The job is
arithmetic and citation, not a summary of intent. Every conclusion has to be a real calculation
run on real numbers, or it is not made at all.

## Before you check a single term

Collect two separate things and do not proceed without both:

1. The SLA's stated terms exactly as written: the metric name, the numeric target, the unit,
   the measurement window (for example, the calendar month, or business hours only), and the
   severity definitions if the SLA ties response or resolution targets to severity levels.
2. The vendor's actual performance data for the exact same period: raw downtime start and end
   times or minutes, or a ticket log with opened, first response and resolved timestamps per
   ticket, whatever the underlying record actually is.

Do not check a term against a summary, an average someone already computed, or a vendor
provided scorecard. A vendor's own summary is the thing being checked, not a substitute for the
raw data behind it. If only a summary is available, say so plainly and check the summary's own
math against itself rather than treating its stated conclusion as fact.

## Computing actual uptime from a downtime log

State the total minutes in the measurement period first, days multiplied by 24 multiplied by
60. Then sum every real outage's actual duration in minutes from the log, excluding only
downtime the SLA's own text excludes, such as a scheduled maintenance window announced within
the SLA's stated notice period. Never exclude an incident because it seems minor or because the
vendor's own summary already excluded it; check the SLA's exclusion language directly.

Actual uptime percent equals total minutes minus downtime minutes, divided by total minutes,
multiplied by 100. Show that full calculation, not just the resulting percentage, so the answer
traces back to the two numbers behind it. Compare the computed figure to the stated target and
report the shortfall in percentage points when the target is missed, and separately convert the
allowed downtime at the target percentage into minutes so the size of the miss is visible in the
same unit the incident log uses.

## Computing actual response and resolution time from a ticket log

For every ticket in the log, compute response time as the first response timestamp minus the
opened timestamp, and resolution time as the resolved timestamp minus the opened timestamp, in
whatever unit the SLA states its target in. Group tickets by the severity level the SLA defines
targets for, since a single blended average across severities checks nothing the SLA actually
promised.

For each severity and each metric, response and resolution, compute the number of tickets
checked, how many met the stated target, how many missed it and by how many minutes each, the
compliance rate as a percentage, and the average time across the tickets checked. One compliant
ticket does not establish compliance for the period, and one missed ticket does not establish a
widespread failure; report the full count and the rate, not a single example.

## Flagging a missed term

A term is missed when the computed actual figure fails the stated target, using the SLA's own
comparison direction: uptime and compliance rates must meet or exceed a target, response and
resolution times must be at or under a target. For every missed term, state the target, the
actual computed figure, and the exact shortfall in the same unit as the target, not rounded to a
vaguer description like slightly under. If the SLA defines a service credit or penalty tied to a
missed tier, compute the credit using the SLA's own stated formula and the real monthly fee
supplied, showing that arithmetic too.

## Marking a term cannot verify

A term is marked cannot verify, not passed, whenever the data needed to check it is missing,
partial, or does not cover the stated measurement period. This includes a severity level with no
logged incidents in the period, since an absence of test cases is not evidence a target was met,
a ticket log missing the timestamp column a metric depends on, and a term whose measurement
window in the log does not match the SLA's stated window. State plainly which specific data is
missing and what would be needed to check the term, rather than folding it silently into the
passed list or leaving it out of the report entirely.

## Output format for a compliance check

Present four sections, in this order: a summary table of every SLA term with its status, met,
missed, or cannot verify, and its headline figure; the full arithmetic behind every computed
figure, term by term; every missed term with its shortfall and any computed credit; and every
term marked cannot verify with the specific missing data named. Use
\`reference/sla-compliance-worked-example.md\` as the exact structure and level of detail each
section should follow.

## What this skill does not do

It does not negotiate, renegotiate, or draft a dispute letter over a missed term, that is a
separate writing task once the numbers are established. It does not average a missed term back
toward compliance using a different period's better performance; each stated measurement window
is checked on its own. It never assumes a term was met because the vendor's own report says so,
because no complaint was raised, or because the shortfall looks small. Every status in its output
traces to a real number checked against a real target, or is marked cannot verify.
`;

const WORKED_EXAMPLE_MD = `# SLA compliance worked example: TechCore Managed Hosting, March 2026

Use this alongside \`SKILL.md\`. It shows the full arithmetic for a real style monthly compliance
check, including one missed term with its shortfall quantified and two terms marked cannot
verify because the supplied data did not cover them.

## The SLA's stated terms, as written

Source document: Master Services Agreement, Schedule B, Service Levels, and Schedule C, Service
Credits.

- Uptime: "99.9% availability measured across each calendar month, excluding scheduled
  maintenance windows announced at least 48 hours in advance."
- Response time by severity: P1 (critical), 15 minutes, 24 hours a day, 7 days a week. P2
  (high), 60 minutes, business hours. P3 (medium), 240 minutes, business hours.
- Resolution time by severity: P1, 240 minutes. P2, 1440 minutes (24 hours). P3, not stated as a
  numeric target in Schedule B.
- Service credit: "For each full percentage point of uptime below 99.9% down to and including
  99.0%, Customer receives a service credit equal to 5% of that month's recurring fees. Below
  99.0% down to and including 98.0%, the credit is 10%." Monthly recurring fee: $18,400.

## The vendor's actual performance data supplied for March 2026

March 2026 has 31 days. Total minutes in the period: 31 times 24 times 60 equals 44,640 minutes.

Downtime log:
- Incident 1: March 3, 02:14 to 02:52, 38 minutes, unplanned outage.
- Incident 2: March 17, 14:05 to 15:47, 102 minutes, unplanned outage.
- Scheduled maintenance: March 22, 09:00 to 09:10, 10 minutes, announced by the vendor on March
  17, more than 48 hours ahead, matching the SLA's exclusion. Excluded from the downtime total.

Ticket log, P1 (three tickets this month):
- P1-118: opened 09:02, first response 09:14 (12 minutes), resolved 12:32 (210 minutes).
- P1-142: opened 22:10, first response 22:28 (18 minutes), resolved next day 02:30 (260
  minutes).
- P1-156: opened 16:40, first response 16:49 (9 minutes), resolved 19:50 (190 minutes).

Ticket log, P2 (five tickets this month, response timestamps only, the resolved column is blank
for all five rows in the export supplied):
- P2-201: 40 minutes. P2-207: 55 minutes. P2-219: 65 minutes. P2-224: 50 minutes. P2-233: 58
  minutes.

Ticket log, P3: no tickets logged as P3 in March 2026.

## Computing actual uptime

Downtime minutes counted: 38 plus 102 equals 140 minutes. The 10 minute scheduled window is
excluded per the SLA's own exclusion clause.

Actual uptime percent: (44,640 minus 140) divided by 44,640, times 100, equals 44,500 divided by
44,640, times 100, equals 99.686%.

Target: 99.9%. Status: missed. Shortfall: 99.9% minus 99.686% equals 0.214 percentage points.

Allowed downtime at the 99.9% target, for comparison: 44,640 times (1 minus 0.999) equals 44.6
minutes. Actual downtime of 140 minutes exceeds the allowed downtime by approximately 95
minutes.

Service credit: 99.686% falls below 99.9% and at or above 99.0%, the first credit tier. Credit
equals 5% of $18,400, equals $920.

## Computing actual P1 response and resolution time

Response times: 12, 18, and 9 minutes. Target: 15 minutes. Tickets meeting target: P1-118 and
P1-156, two of three. Ticket missing target: P1-142 at 18 minutes, 3 minutes over target.
Compliance rate: 2 divided by 3, times 100, equals 66.7%. Average response time: (12 plus 18
plus 9) divided by 3, equals 13 minutes. Status: missed, one breach quantified above.

Resolution times: 210, 260, and 190 minutes. Target: 240 minutes. Tickets meeting target:
P1-118 and P1-156, two of three. Ticket missing target: P1-142 at 260 minutes, 20 minutes over
target. Compliance rate: 66.7%. Average resolution time: (210 plus 260 plus 190) divided by 3,
equals 220 minutes. Status: missed, one breach quantified above.

## Computing actual P2 response time, and why P2 resolution cannot be checked

Response times: 40, 55, 65, 50, and 58 minutes. Target: 60 minutes. Tickets meeting target: four
of five. Ticket missing target: P2-219 at 65 minutes, 5 minutes over target. Compliance rate: 4
divided by 5, times 100, equals 80%. Average response time: (40 plus 55 plus 65 plus 50 plus 58)
divided by 5, equals 53.6 minutes. Status: missed, one breach quantified above.

P2 resolution: the resolved column supplied for all five P2 tickets is blank in this export.
There is no resolved timestamp to subtract the opened timestamp from for any of the five
tickets. Status: cannot verify. What would resolve this: the same ticket export with the
resolved timestamp column populated for these five ticket numbers.

## P3 response and resolution: cannot verify

No P3 tickets were opened in March 2026 according to the supplied ticket log. There is no
incident to test the 240 minute response target or to note that Schedule B states no numeric P3
resolution target at all. An absence of P3 tickets is not evidence the target was met; it means
there was no case to check it against this month. Status: cannot verify.

## Summary of this month's check

Met: none of the checked terms. Missed: uptime (0.214 percentage points short, $920 credit
due), P1 response (one breach of 3 minutes, 66.7% compliance), P1 resolution (one breach of 20
minutes, 66.7% compliance), P2 response (one breach of 5 minutes, 80% compliance). Cannot
verify: P2 resolution (resolved timestamps missing from the export), P3 response and resolution
(no P3 tickets logged this period).
`;

const meta: SkillMeta = {
  slug: "vendor-sla-compliance-check-skill",
  name: "Vendor SLA Compliance Check",
  title: "Vendor SLA Compliance Check Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that checks a vendor's actual SLA performance against the SLA's stated terms using real downtime and ticket data, showing the arithmetic, quantifying every missed term's shortfall, and marking any term without real data cannot verify.",

  seo: {
    primaryKeyword: "vendor sla compliance check skill",
    keywords: [
      "vendor sla compliance check skill",
      "free ai skill for sla compliance",
      "downloadable sla compliance checklist",
      "ai skill to check vendor sla performance",
      "how to check if a vendor met sla terms",
    ],
    seoTitle: "Vendor SLA Compliance Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable vendor sla compliance check skill that computes actual uptime and response times from real logs and flags every missed term with its shortfall.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/sla-compliance-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to check whether a vendor met its SLA, models routinely accept a vendor's own scorecard or a rough impression of the month at face value, and quietly treat a severity level with no supplied performance data as passed rather than untested. This skill's instructions require every status to trace to a computed figure from raw downtime or ticket timestamps, with the exact arithmetic shown, and require a term with missing or partial data to be marked cannot verify instead of assumed compliant.",
  },

  article: {
    intro: [
      "A vendor sla compliance check skill is only worth using if it can tell the difference between a term that was actually verified against real numbers and one that was quietly assumed to be fine. Handed a vendor's monthly summary and a stated 99.9% uptime target, most AI assistants will restate the vendor's own conclusion back with a pass rather than doing the arithmetic themselves. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file with the exact arithmetic method for computing actual uptime, response time, and resolution time from raw logs, and a fully worked reference example with real SLA terms, a real downtime and ticket log, and a completed check including one missed term with its shortfall quantified. Both are previewable in full on this page before you download the .zip, exactly what an AI assistant receives once you hand over the archive.",
    ],
    sections: [
      {
        heading: "Why a vendor's own summary is not enough",
        body: [
          "A vendor's monthly report is the thing being checked, not a substitute for checking it. A summary that states 99.95% uptime might be rounding, might exclude an incident the SLA's text does not exclude, or might simply be wrong. This skill's first instruction is to collect the SLA's stated terms and the vendor's raw performance data, downtime times or ticket timestamps, separately, and compute every figure from that raw data rather than accept a headline number.",
          "As a free ai skill for sla compliance work and a downloadable sla compliance checklist, its value is in that refusal: a term is either backed by a real calculation, shown in full, or marked cannot verify. Nothing in between is allowed.",
        ],
      },
      {
        heading: "The arithmetic method, in outline",
        body: [
          "Uptime is computed as total minutes in the period minus downtime minutes, divided by total minutes, times 100, with scheduled maintenance excluded only when the SLA's own exclusion language actually covers it. Response and resolution times are computed per ticket, grouped by the severity level the SLA defines a target for, since a blended average across severities checks nothing the SLA actually promised.",
          "Every missed term gets its shortfall stated in the same unit as the target, a percentage point gap for uptime, minutes over target for response and resolution, never softened into a vaguer phrase like slightly under.",
        ],
      },
      {
        heading: "How this differs from a vendor comparison matrix",
        body: [
          "The vendor comparison matrix skill on this site compares multiple vendor options against each other before a purchase decision is made, filling cells from supplied spec sheets and pricing pages and marking anything unsupported not yet verified. It is a pre-signature job, run across several vendors who have not yet been chosen.",
          "This skill runs after a contract is already signed, on one vendor's ongoing performance against the SLA that vendor is already bound to. It never compares vendors against each other; it checks one vendor's real numbers against its own stated terms, period by period.",
        ],
      },
      {
        heading: "How this differs from contract renewal date tracking",
        body: [
          "The contract renewal date tracking skill on this site logs renewal and notice period deadlines across a portfolio of contracts and flags what needs action soon, pure date bookkeeping with no judgment about performance. It never asks whether a vendor actually delivered what the contract promised.",
          "This skill asks exactly that question, ai skill to check vendor sla performance against the numeric commitments in Schedule B or its equivalent, using downtime and ticket data rather than dates. A vendor can be performing well against its SLA and still have a renewal deadline coming up, or vice versa; the two skills answer different questions and neither substitutes for the other.",
        ],
      },
      {
        heading: "Why a missing data point is marked cannot verify, not passed",
        body: [
          "A severity level with no logged incidents in a given month is not evidence the target was met; there was simply no case to test it against. A missing resolved timestamp column means resolution time cannot be computed for those tickets, whatever the response numbers show. This skill's instructions require both situations to be reported as cannot verify, named specifically, rather than folded into a passed count that looks more complete than it is.",
        ],
      },
      {
        heading: "Reading the worked example",
        body: [
          "The reference file walks a full month for a fictional vendor, TechCore Managed Hosting, from the SLA's stated terms through a downtime log and a ticket log to a finished check: two missed response terms, one missed resolution term, a missed uptime target with its service credit computed from the SLA's own formula, and two terms marked cannot verify because the supplied data did not cover them. It shows how to check if a vendor met sla terms using nothing but the numbers actually given.",
        ],
      },
    ],
    howTo: {
      name: "How to use the vendor sla compliance check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/sla-compliance-worked-example.md on this page before downloading, including the full worked arithmetic, so you know exactly what standard the check is held to.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the SLA's stated terms and the vendor's raw performance data",
          text: "Collect the actual SLA text, targets, units, and exclusions, plus the downtime log or ticket export covering the same period. A summary the vendor already computed is not a substitute for the raw data.",
        },
        {
          name: "Hand both files to your assistant with the source data",
          text: "Keep the folder structure intact, then supply the SLA terms and the raw log so every status can be computed rather than assumed.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if the vendor's ticket log is missing timestamps for some tickets?",
        answer:
          "Any term that depends on a missing timestamp is marked cannot verify rather than passed, with the specific missing column or tickets named. The instructions treat a gap in the data as genuinely unknown, never as evidence the target was met.",
      },
      {
        question: "How is this different from the vendor comparison matrix skill on this site?",
        answer:
          "That skill compares multiple vendor options against each other before a purchase decision, filling cells only from supplied material. This skill checks one already signed vendor's real performance against its own SLA over a stated period, and does not compare vendors to each other at all.",
      },
      {
        question: "How is this different from the contract renewal date tracking skill on this site?",
        answer:
          "That skill logs renewal and notice deadlines across a contract portfolio and makes no judgment about performance. This skill checks whether a vendor's actual uptime, response time, and resolution time met the numeric commitments in its SLA, using downtime and ticket data rather than dates.",
      },
      {
        question: "Can the skill accept the vendor's own monthly scorecard as proof a term was met?",
        answer:
          "No. The instructions require checking against the raw downtime log or ticket timestamps behind a scorecard, not the scorecard's stated conclusion. If only a summary is available, the skill checks the summary's own math against itself rather than treating its conclusion as fact.",
      },
      {
        question: "What happens if a severity level had zero tickets in the period?",
        answer:
          "The term is marked cannot verify, not passed. An absence of tickets at that severity is an absence of a test case, not evidence the response or resolution target was met, so the instructions explicitly forbid counting it as compliant.",
      },
      {
        question: "Does the skill compute service credits, not just pass or fail statuses?",
        answer:
          "Yes, when the SLA defines a credit formula and the real monthly fee is supplied. The skill applies the SLA's own stated tiers and shows the arithmetic, as the worked example does for a missed uptime target, rather than estimating a credit figure informally.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download happen entirely in your browser, with no server call behind either action. None of the SLA text or performance data you use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, opening in any text editor. This page is a read only preview of what downloads; editing happens in your own editor or this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/vendor-contract-review-prompt",
        label: "vendor contract review prompt",
        description: "For flagging risky clauses in a vendor's contract before signing, a different job from checking an already signed vendor's ongoing SLA performance.",
      },
      {
        href: "/business-skills/vendor-comparison-matrix-skill",
        label: "vendor comparison matrix skill",
        description: "For comparing several vendor options against each other before a purchase decision, rather than checking one chosen vendor's real performance after the fact.",
      },
      {
        href: "/business-skills/contract-renewal-date-tracking-skill",
        label: "contract renewal date tracking skill",
        description: "For tracking when a contract needs renewal action, pure date bookkeeping with no judgment about whether the vendor actually met its SLA.",
      },
      {
        href: "/tools/percentage-calculator",
        label: "percentage calculator",
        description: "For a quick independent check of a shortfall percentage or a service credit tier while reviewing this skill's uptime arithmetic.",
      },
    ],
    externalLinks: [
      {
        href: "https://csrc.nist.gov/glossary/term/service_level_agreement",
        label: "NIST CSRC Glossary: Service Level Agreement",
        description: "The federal definition of an SLA as a commitment addressing expected performance level and requirements for reporting and resolution, the terms this skill checks against real data.",
      },
      {
        href: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.500-307.pdf",
        label: "NIST SP 500-307: Cloud Computing Service Metrics Description",
        description: "A federal publication describing how service metrics like availability should be defined and measured for enforcing service agreements, the discipline behind this skill's arithmetic method.",
      },
      {
        href: "https://www.gsa.gov/technology/it-contract-vehicles-and-purchasing-programs/multiple-award-schedule-it/cloud-and-cloud-related-services/cloud-sin-ordering-guidance",
        label: "GSA: Cloud SIN ordering guidance",
        description: "Federal buying guidance recommending enforceable SLAs with real service credits tied to measured performance rather than generic uptime claims.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to sourcing every computed figure.",
      },
    ],
  },

  tags: ["business", "vendor", "sla", "compliance", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
