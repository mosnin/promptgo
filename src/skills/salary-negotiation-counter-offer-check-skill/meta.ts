import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Salary Negotiation Counter Offer Check

Use this salary negotiation counter offer check skill whenever a candidate has a real job
offer in hand and a specific number they are planning to ask for instead, and wants to know
whether that ask is actually grounded in something real before they say it out loud.

## The one rule this skill never breaks

This skill does not invent market rate data, a competing offer, or a plausible sounding
justification on the candidate's behalf. It only checks whether a counter ask the candidate has
already decided on is traceable to real evidence the candidate actually supplies. If asked to
make up a number that sounds about right, or to assume a competing offer that has not actually
been received, refuse directly and explain why: a counter built on invented evidence collapses
the moment an employer asks a follow up question, and can cost the candidate credibility in the
room.

## Before checking anything

Confirm three things in the candidate's own words before running the check:

1. The offer as actually stated: base, bonus, equity, start date, and any other term the
   employer put in writing or said out loud.
2. The specific counter ask: one number, or one narrow range, not a vague "more."
3. The evidence supplied for that ask: a specific competing offer with its exact amount and the
   company that made it, specific market rate data the candidate found and can name a source
   for, or a specific documented achievement or certification with the concrete result attached
   to it.

Refuse to grade a check that is missing any of the three, since a check run on a vague ask or
absent evidence produces a verdict that means nothing.

## Running the grounded check

For the ask supplied, do the following in order:

1. Quote the offer's stated terms exactly as given, not summarized or rounded.
2. Quote the evidence exactly as given: the competing offer's amount and source, the market
   data figure and where it was found, or the achievement and its documented result.
3. State whether the size of the counter ask is proportionate to the evidence, meaning the gap
   between the offer and the ask is roughly the size the evidence would support, not a multiple
   of it invented on top.
4. State whether the ask traces to the evidence at all, meaning a reader could follow the
   number back to a specific real fact rather than a hunch.
5. Give a verdict: GROUNDED if the ask is both proportionate and traceable to the real evidence
   supplied, or UNGROUNDED if no real evidence was supplied to justify the specific number
   requested, or if the number requested is far larger than what the supplied evidence would
   reasonably support.

## What an UNGROUNDED verdict looks like

State plainly that the ask cannot be checked against anything real, name the specific evidence
that is missing (a competing offer amount, a named market data source, or a specific
achievement), and stop there. Do not soften an UNGROUNDED verdict into a suggested number, and
do not fill the gap with a plausible sounding figure. Point the candidate back toward finding
the missing evidence instead.

## What this skill does not do

It does not draft the language the candidate will actually say, and it does not decide what a
fair counter would be if the candidate had no evidence at all. It does not generate a competing
offer, a market rate figure, or an achievement that was not actually supplied. Those inventions
would defeat the entire purpose of a check meant to catch exactly that kind of unsupported
number before it reaches a real conversation.
`;

const COUNTER_OFFER_CHECK_EXAMPLE_MD = `# Counter Offer Check: Worked Example

Use this alongside SKILL.md as a model of what a completed check looks like for a real offer
and two different counter asks.

## The offer being checked

Offer as stated: Senior Data Analyst, Meridian Retail Group, base salary 92,000 dollars, no
signing bonus mentioned, 15 days paid time off, hybrid two days in office, start date
negotiable within four weeks.

## Scenario one: an ask grounded in a real competing offer

Counter ask: 101,000 dollars base.

Evidence supplied: a written offer from Harborview Analytics, dated last week, stating a base
salary of 101,500 dollars for the same title, sent as a PDF offer letter.

Check:

- Offer quoted: 92,000 dollars base at Meridian Retail Group.
- Evidence quoted: 101,500 dollars base, in writing, from Harborview Analytics, for the same
  job title, dated last week.
- Proportionate: yes. The counter ask of 101,000 dollars sits just under the competing offer's
  exact figure, not above it, and the gap between the two offers, 9,500 dollars, is exactly
  what the evidence documents, not an invented multiple of it.
- Traceable: yes. A reader can follow the number directly back to a specific, named, dated,
  written offer, not a hunch or a rounded estimate.
- Verdict: GROUNDED. The ask is proportionate to and traceable to the real competing offer
  supplied.

## Scenario two: an ask flagged UNGROUNDED

Counter ask: 115,000 dollars base.

Evidence supplied: "I think I'm worth more than 92,000 based on my experience."

Check:

- Offer quoted: 92,000 dollars base at Meridian Retail Group.
- Evidence quoted: a general statement about experience, with no competing offer amount, no
  named market data source, and no specific documented achievement attached.
- Proportionate: cannot be assessed. There is no real figure or documented fact to measure the
  23,000 dollar gap against.
- Traceable: no. The number cannot be followed back to anything specific; it is a round figure
  chosen because it sounds larger, not because any real evidence supports that exact amount.
- Verdict: UNGROUNDED. No real evidence was supplied to justify the specific number requested.
  Before this ask is used in a real conversation, either a real competing offer, specific
  market rate data with a named source, or a specific documented achievement with a concrete
  result needs to be found and supplied for a new check.

## A second grounded example: market rate data plus a certification

Counter ask: 98,000 dollars base.

Evidence supplied: a published salary survey, the 2026 Robert Half Technology Salary Guide,
listing 95,000 to 102,000 dollars for a Senior Data Analyst in the candidate's metro area, and
a recently completed certification, Certified Analytics Professional, completed two months ago,
that the job posting listed as a preferred qualification the candidate did not previously hold.

Check:

- Offer quoted: 92,000 dollars base at Meridian Retail Group.
- Evidence quoted: 95,000 to 102,000 dollars, from the named 2026 Robert Half Technology Salary
  Guide, plus a named, recently completed, job relevant certification.
- Proportionate: yes. 98,000 dollars sits within the surveyed range's lower half, and the
  certification is a specific, documented, additional qualification the posting itself named as
  preferred, not an invented reason for extra value.
- Traceable: yes. Both the range and the certification can be checked against a named, real
  source.
- Verdict: GROUNDED.

## Why the check stops at a verdict

The check states whether an ask is grounded or not; it does not draft what the candidate will
actually say, and it does not soften an UNGROUNDED verdict into a smaller suggested number.
Turning a verdict into wording, or into an alternative figure, is a separate step, done
deliberately, with the gap in evidence still visible rather than quietly filled in.
`;

const meta: SkillMeta = {
  slug: "salary-negotiation-counter-offer-check-skill",
  name: "Salary Negotiation Counter Offer Check",
  title: "Salary Negotiation Counter Offer Check Skill",
  category: "career-skills",
  summary:
    "A downloadable instruction pack that checks whether a planned salary counter offer is grounded in real evidence, a quoted competing offer, named market data, or a documented achievement, and flags the ask as ungrounded when no real evidence backs the specific number.",

  seo: {
    primaryKeyword: "salary negotiation counter offer check skill",
    keywords: [
      "salary negotiation counter offer check skill",
      "free ai skill for counter offer check",
      "downloadable counter offer evidence checklist",
      "ai skill to check if a counter offer is grounded",
      "how to check if a salary counter offer is justified",
    ],
    seoTitle: "Salary Negotiation Counter Offer Check Skill: Free Download",
    seoDescription:
      "A free, downloadable salary negotiation counter offer check skill that grades a counter ask against real evidence and flags it ungrounded when unsupported.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    {
      path: "reference/counter-offer-check-example.md",
      content: COUNTER_OFFER_CHECK_EXAMPLE_MD,
      kind: "markdown",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to build a case for a counter offer reliably invent a plausible sounding competing offer or a market rate figure when the candidate has not actually supplied one, then present that invention as though it were real evidence behind the ask. This skill's check requires every counter ask to be graded against evidence the candidate actually supplies, and requires an explicit ungrounded verdict whenever a real competing offer, real market data, or a real documented achievement was not given.",
  },

  article: {
    intro: [
      "A salary negotiation counter offer check skill only earns trust if it can tell the difference between a counter ask backed by something real and one that is not. Handed a target number and nothing else, most AI assistants will happily build a persuasive case around it, treating a hunch as though it were evidence. This skill refuses that shortcut: it checks whether a specific counter ask is grounded in real evidence the candidate actually supplies, not evidence invented to fit whatever number the candidate already wanted to ask for.",
      "It ships as two plain text files: a main instructions file describing the check, and a reference file with a real looking offer worked through two grounded counter ask scenarios and one flagged as ungrounded. Both are previewable in full before download, and both are exactly what a candidate or a career coach receives once the archive is handed over.",
      "This is deliberately narrower than a tool that builds a negotiation case from scratch. The check assumes an offer and a decided ask already exist, and it asks one question only: does the number requested trace back to something real, or does it not.",
    ],
    sections: [
      {
        heading: "Why an ungrounded counter ask is a real risk, not just a weak one",
        body: [
          "A counter ask with no real backing is more than unpersuasive. When an employer asks where a number came from, an ungrounded ask has no answer, and the gap shows more clearly than a modest ask ever would. A free ai skill for counter offer check exists to catch that gap before the conversation happens, not during it, which is why the check runs before the ask is spoken out loud rather than after.",
        ],
      },
      {
        heading: "What counts as real supporting evidence",
        body: [
          "Three kinds of evidence are treated as real for this check: a specific competing offer, quoted with its exact amount and the company that made it; specific market rate data the candidate can name a source for, such as a published salary survey by name and edition; and a specific documented achievement or certification with a concrete, checkable result attached. A vague sense of being underpaid, an unnamed online average, or a friend's guess are not evidence, because none can be quoted exactly or traced to a real source.",
          "Naming the kind of evidence matters as much as having some, since a downloadable counter offer evidence checklist is only useful if it can tell a documented figure apart from a feeling that sounds like one.",
        ],
      },
      {
        heading: "How the grounded check actually runs",
        body: [
          "This is how to check if a salary counter offer is justified: the offer's stated terms are quoted exactly, the evidence supplied is quoted exactly, and the ask is judged on two questions, whether its size is proportionate to what the evidence would support, and whether it traces back to that evidence at all rather than to a round number that simply sounds larger.",
          "Both questions have to hold for a GROUNDED verdict. An ask can be traceable to real evidence and still be disproportionate, asking for far more than that evidence would reasonably support, and a disproportionate ask fails the check even when some real evidence exists behind it.",
        ],
      },
      {
        heading: "When a counter ask gets flagged UNGROUNDED",
        body: [
          "An ask is flagged UNGROUNDED when no real evidence was supplied to justify the specific number requested, or when that number is far larger than the supplied evidence would reasonably support. The flag names exactly what is missing, a competing offer amount, a named market data source, or a specific achievement, rather than a vague sense that something is off.",
          "An ai skill to check if a counter offer is grounded is only trustworthy if an ungrounded verdict is never softened into a smaller suggested number. This skill's instructions stop at naming the gap and point the candidate back toward finding real evidence.",
        ],
      },
      {
        heading: "How this differs from the salary range research log skill",
        body: [
          "A separate salary range research log skill on this site structures how a candidate logs salary figures as they are found, requiring a source, a date, and a graded match quality for every entry. It is a research logging tool: its job stops at producing a clean, sourced record of what has been found, and it never reasons about a specific number a candidate is planning to ask for.",
          "This skill starts where that one stops. It takes a specific counter ask the candidate has already decided on, together with the evidence behind it, whether or not that evidence came from a logged research process, and checks whether the ask is proportionate to and traceable to that evidence. A candidate could use the research log skill for weeks and never reach a verdict on any single number; this skill exists to produce that verdict once a number is on the table.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not invent a competing offer, a market rate figure, or a documented achievement on the candidate's behalf under any circumstance. Asked to assume a competing offer that has not been received, or to estimate what the market probably pays, it refuses and explains why, rather than producing a plausible sounding number dressed up as evidence.",
          "It also does not draft the sentence the candidate will actually say. Wording is a separate step, left to the candidate, once the number itself has been checked against something real.",
        ],
      },
      {
        heading: "How to use the downloaded files",
        body: [
          "Hand both files to an AI assistant together, since the instructions describe the check that the worked example demonstrates. Keeping SKILL.md alongside a reference folder preserves that link once the archive is unpacked.",
        ],
      },
    ],
    howTo: {
      name: "How to use the salary negotiation counter offer check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and the reference file on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the offer and the real evidence",
          text: "Write down the offer's stated terms, the specific counter ask, and the specific evidence behind it: a competing offer amount, named market data, or a documented achievement.",
        },
        {
          name: "Run the grounded check",
          text: "Hand the offer, ask, and evidence to your assistant and ask it to quote both, judge proportionality and traceability, and return a GROUNDED or UNGROUNDED verdict.",
        },
        {
          name: "Treat an UNGROUNDED verdict as a signal to find more evidence",
          text: "If the verdict is UNGROUNDED, find the specific missing evidence, a real competing offer, a named market data source, or a documented achievement, before using that number in a real conversation.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as a real competing offer for this check?",
        answer:
          "A competing offer needs an exact amount and the company that made it, ideally in writing. A vague mention of another company being interested, with no figure attached, is not enough to grade an ask as grounded.",
      },
      {
        question: "What happens if my evidence is real but my ask is still too big?",
        answer:
          "The check can still return UNGROUNDED. Traceability and proportionality are both required, so an ask built on a real competing offer that is far smaller than the number actually requested fails on proportionality even though the evidence itself is genuine.",
      },
      {
        question: "How is this different from the salary range research log skill?",
        answer:
          "That skill structures how a candidate logs salary figures as they are found, with a source, a date, and a match grade for every entry, and never reasons about a specific ask. This skill checks a specific counter ask against real evidence, whether or not that evidence came from a logged research process, and returns a grounded or ungrounded verdict.",
      },
      {
        question: "Will the skill write the actual words I should say to the employer?",
        answer:
          "No. It stops at a verdict on whether the number is grounded in real evidence. Turning that verdict into spoken wording is a separate step, left to the candidate once the number has been checked.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the offer or evidence you use is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/career-skills/salary-range-research-log-skill",
        label: "salary range research log skill",
        description: "A sibling skill for structuring and sourcing salary figures as they are found, upstream of the specific ask this skill checks.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description: "For building three sourced numbers and a priced evidence file from scratch, before this skill checks whichever ask you settle on.",
      },
      {
        href: "/tools/salary-hourly-converter",
        label: "salary hourly converter",
        description: "For converting an offer or a competing figure quoted in different units into a comparable base before checking proportionality.",
      },
      {
        href: "/career-prompts/promotion-case-prompt",
        label: "promotion case prompt",
        description: "The same evidence grounded discipline applied to a raise inside your current role rather than a counter on a new offer.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.bls.gov/oes/",
        label: "US Bureau of Labor Statistics: Occupational Employment and Wage Statistics",
        description: "A published wage source worth naming specifically as market rate evidence, rather than citing loosely as an average found online.",
      },
      {
        href: "https://www.dol.gov/general/topic/wages",
        label: "US Department of Labor: Wages",
        description: "Primary reference on wage rules that shapes what an employer's stated offer terms can and cannot include.",
      },
      {
        href: "https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer",
        label: "Harvard Business Review: 15 rules for negotiating a job offer",
        description: "An independent account of why a defensible number matters more than delivery in a counter offer conversation.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a refusal.",
      },
    ],
  },

  tags: ["career", "salary negotiation", "counter offer", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
