import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Pricing Quote Consistency Check

Use this skill when you are given two real things: a written sales quote or proposal
document, and a real record of what was actually discussed or promised to that same
customer, meaning call notes, an email thread, or a rep's own written record of verbal
commitments made on a call. The job is to check whether every line item, discount, and
term in the quote matches what the discussion record actually shows was promised, line
by line, and to say exactly where it does not.

## Before you check anything

You need both real documents for this to work: the quote itself, and the discussion
record. Do not check a quote against what a typical deal of this shape would usually
include, and do not check it against what the product's price list says it should cost.
Check it only against what this specific customer was actually told, in this specific
discussion record. If either document is missing, say so plainly and name exactly which
one is missing rather than proceeding with half the comparison.

Do not assume what "should" have been quoted. If the discussion record is silent on
whether a setup fee was mentioned, that silence is not evidence the setup fee is wrong;
it is evidence there is nothing to compare that line against yet, and the correct
response is to flag it as unconfirmed, not to assume it is either right or wrong.

## How to check one quote

1. List every line item, discount, and term that appears in the quote: each priced
   item, each discount or credit applied, the payment terms, the contract length, and
   any other commitment stated in writing (onboarding included, a named start date, a
   volume threshold for a discount tier).
2. For each one, search the discussion record for the corresponding promise. Quote the
   discussion record's exact wording, not a paraphrase, and quote the quote's exact
   wording next to it.
3. Compare the two quotations directly and assign exactly one of four verdicts:
   - MATCH: the quote's wording and the discussion record's wording describe the same
     price, discount, or term. Quote both exactly to show the match.
   - MISMATCH: the quote states a different price, discount, or term than what the
     discussion record shows was promised. Quote both exactly and state the specific
     difference (a different number, a different percentage, a different date).
   - ADDED: the quote includes a line item, fee, or term that never appears anywhere in
     the discussion record. Quote the quote's line and state plainly that no
     corresponding promise exists in the record you were given.
   - OMITTED: the discussion record shows something specific was promised to the
     customer, and the quote does not include it at all. Quote the discussion record's
     promise and state that the quote contains no corresponding line.
4. Do not invent a fifth category and do not soften a MISMATCH, ADDED, or OMITTED
   finding into a MATCH because the difference seems small or the intent seems
   understandable. A five percent discrepancy on a price a customer was quoted verbally
   is exactly the kind of finding this skill exists to catch, not round away.

## Output format

For every quote checked, produce a table or list with one row per line item, discount,
or term: the quote's exact wording, the discussion record's exact wording (or "not
found in discussion record" for an ADDED item, or "no corresponding quote line" for an
OMITTED promise), and the verdict. Close with a one line count of MATCH, MISMATCH,
ADDED, and OMITTED findings. See \`reference/worked-example.md\` for a full run through
against a real quote and a real discussion record, including at least one of each
verdict type.

## What this skill does not do

It does not decide what the quote should say instead, and it does not rewrite the quote.
It does not judge whether a discount was generous or a term was fair; a term can be
perfectly reasonable and still be a MISMATCH if it does not match what the customer was
actually told. It does not assume a discussion record is complete; if a call happened
that produced no written notes, the promises made on that call are simply not
checkable, and the skill says so rather than treating an unwritten promise as either
confirmed or unconfirmed by default. It never fills a gap in the discussion record with
what a typical or reasonable quote would include.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking one quote against its discussion record

Use this alongside \`SKILL.md\`. It runs the line by line method against one real
looking quote with four line items and the discussion record for the same deal, so the
difference between a MATCH, a MISMATCH, an ADDED line, and an OMITTED promise is
concrete rather than abstract.

## The quote, as sent to the customer

Quote document, Harlow Fixtures Co, sent 6/18, quote number Q-3391:

1. Platform license, Growth tier, 40 seats: $18,400 per year
2. Onboarding and data migration: $2,500 one time
3. Priority support upgrade: $1,200 per year
4. Payment terms: net 30, annual contract, auto renews unless cancelled 60 days before
   renewal date

## The discussion record for the same deal

Call notes and email thread, logged by the rep, dated 6/9 through 6/17:

"6/9 discovery call with Dana Ruiz (Ops Director). Team is 40 people, wants Growth tier.
Dana asked about annual pricing, quoted $18,400/yr, she said that works. 6/12 email from
Dana: 'Can you confirm data migration is included at no extra charge, that was my
understanding from the call.' 6/13 rep reply to Dana: 'Confirmed, migration is included,
no separate charge for that.' 6/15 call, discussed contract terms, agreed to net 30
payment and a 12 month term, Dana asked about auto renewal and rep said the contract
would need to be actively renewed each year, not auto renew, and Dana said that was
important to her team's procurement process. No mention of a priority support upgrade
anywhere in the notes or the email thread."

## Line by line check

**Line 1, Platform license, Growth tier, 40 seats: $18,400 per year.**
Quote wording: "$18,400 per year." Discussion record wording: "quoted $18,400/yr, she
said that works." Verdict: MATCH. Both the quote and the discussion record state the
identical figure for the identical tier and seat count.

**Line 2, Onboarding and data migration: $2,500 one time.**
Quote wording: "$2,500 one time." Discussion record wording: "Confirmed, migration is
included, no separate charge for that." Verdict: MISMATCH. The discussion record shows
the rep explicitly confirmed to the customer in writing that migration was included at
no extra charge, and the quote nonetheless bills it as a separate $2,500 line item. This
is not a small rounding difference; it is a directly contradicted promise, quoted in the
customer's own email thread.

**Line 3, Priority support upgrade: $1,200 per year.**
Quote wording: "$1,200 per year." Discussion record wording: no mention of a priority
support upgrade anywhere in the notes or the email thread. Verdict: ADDED. This line
item has no corresponding promise anywhere in the discussion record supplied; it was
never discussed with the customer at all as far as the record given here shows.

**Line 4, Payment terms: net 30, annual contract, auto renews unless cancelled 60 days
before renewal date.**
Quote wording: "auto renews unless cancelled 60 days before renewal date." Discussion
record wording: "the contract would need to be actively renewed each year, not auto
renew, and Dana said that was important to her team's procurement process." Verdict:
MISMATCH. The net 30 and 12 month term portions match the discussion record and would
each individually be logged as MATCH if listed separately; the auto renewal clause
directly contradicts what the rep told the customer on the 6/15 call, and the record
shows the customer specifically flagged this point as important to her procurement
process, which makes the mismatch worth surfacing with priority.

## Checking for an OMITTED promise

Re reading the discussion record for anything promised that the quote does not
mention: nothing else in the 6/9 through 6/17 record describes a specific commitment
absent from the quote in this example. In a real check, an OMITTED finding would look
like this: discussion record wording, "rep told Dana onboarding would include two
training sessions for her team, at no charge," quote wording, no corresponding line
anywhere in the document. Verdict: OMITTED, because a specific promise exists in the
record and nothing in the quote reflects it.

## Summary count for this quote

MATCH: 1 (platform license pricing). MISMATCH: 2 (onboarding billed despite being
promised as included, auto renewal clause contradicting the actively renewed term
promised on the call). ADDED: 1 (priority support upgrade, never discussed). OMITTED: 0
in this example. This quote should not go out as drafted; two of its four line items
directly contradict what the discussion record shows the customer was told.
`;

const meta: SkillMeta = {
  slug: "pricing-quote-consistency-skill",
  name: "Pricing Quote Consistency Check",
  title: "Pricing Quote Consistency Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that checks a real sales quote line by line against a real record of what was actually discussed with the customer, quoting both sides exactly and flagging anything added, omitted, or stated differently.",

  seo: {
    primaryKeyword: "pricing quote consistency skill",
    keywords: [
      "pricing quote consistency skill",
      "free ai skill to check sales quotes",
      "downloadable quote accuracy checklist",
      "ai skill to compare quote against call notes",
      "how to check a quote matches what was promised",
    ],
    seoTitle: "Pricing Quote Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable pricing quote consistency skill that checks a sales quote against the real discussion record line by line, quoting both sides exactly.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to check a quote against a discussion record, models reliably paraphrase both sides instead of quoting exact wording, which lets a genuine mismatch read as a rounding difference in the summary. This skill's four verdict structure forces every line to carry the quote's exact wording next to the discussion record's exact wording, and requires an unconfirmed line to be labelled as such rather than assumed correct when the discussion record is simply silent on it.",
  },

  article: {
    intro: [
      "A pricing quote consistency skill only earns its name if it checks a quote against what was actually promised, not against what a typical deal of that shape would usually include. Handed a finished quote on its own, most AI assistants judge whether it looks internally coherent and stop there, missing the one failure mode that actually costs a deal or a renewal: a line item, a discount, or a term that does not match what the customer heard on the call.",
      "It ships as two plain text files: a main instructions file and a worked example reference file it points to, covering a four item quote checked against a real discussion record. Both are previewable in full before you download the .zip. The method is deliberately narrow: it never assumes what a quote line should say absent the real record, and it never treats silence in the notes as either confirmation or contradiction.",
    ],
    sections: [
      {
        heading: "Why a quote has to be checked against the discussion, not the price list",
        body: [
          "A quote can be internally consistent, correctly formatted, and still wrong in the one way that matters most: it can say something different from what the rep actually told the customer. A price list confirms a number is a valid tier; it says nothing about whether that specific customer was quoted that number on that call. This is what a free ai skill to check sales quotes is for: comparing the document against the one source that records what this customer specifically heard, a call note, an email thread, or a rep's written record of a verbal commitment, rather than a generic standard for what a quote like this usually contains.",
        ],
      },
      {
        heading: "Four verdicts, not a pass or fail score",
        body: [
          "Every line item, discount, and term gets exactly one of four verdicts. MATCH means the quote's wording and the discussion record's wording describe the same price or term. MISMATCH means the quote states something different from what was promised. ADDED means the quote includes something that never appears in the discussion record. OMITTED means the record shows a specific promise the quote does not contain. A downloadable quote accuracy checklist that keeps these four states distinct, rather than one pass or fail judgment, makes the output actionable: a MISMATCH needs a correction, an ADDED line needs justifying or removing, an OMITTED promise needs adding before the quote goes out.",
        ],
      },
      {
        heading: "Quoting both sides exactly, not paraphrasing either one",
        body: [
          "This pricing quote consistency skill requires the quote's exact wording and the discussion record's exact wording to sit side by side for every line checked, never a summary of what each one roughly says. A paraphrase is where a real mismatch quietly becomes invisible: 'migration is included' and 'migration is billed separately' can both get summarised as 'discussed migration terms' if the exact wording is dropped. That is the discipline behind an ai skill to compare quote against call notes that a sales team can trust: every finding traces to a quoted sentence on each side, not a general impression the two documents seem aligned.",
        ],
      },
      {
        heading: "Worked example: a quote with two mismatches and an added line",
        body: [
          "The reference file runs the method against a quote with an $18,400 annual platform license, a $2,500 onboarding fee, a $1,200 priority support upgrade, and a net 30 auto renewing contract, checked line by line against the discussion record for the same deal. The platform license price matches what was quoted on the discovery call. The onboarding fee is a MISMATCH: the rep's own email confirmed migration was included at no extra charge, yet the quote bills it separately. The priority support upgrade is ADDED, appearing nowhere in the notes. The auto renewal clause is a second MISMATCH against a term the rep told the customer would not apply. That is how to check a quote matches what was promised: a line by line comparison that catches a $2,500 contradiction inside an otherwise accurate looking document.",
        ],
      },
      {
        heading: "How this differs from checking a proposal's structure",
        body: [
          "A skill that checks whether a proposal follows a complete section order, or leaves an explicit placeholder for pricing not yet finalised, solves a different problem: making sure the document is complete and internally coherent. This skill assumes the numbers are already filled in and checks them against a separate, independent record of what was actually promised. A quote can pass a structure check and still fail this one, or fail a structure check for having a placeholder and still pass this one on every filled in line.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not decide what the corrected quote should say, and it will not rewrite the quote. It will not judge whether a discount is generous or fair; a reasonable term can still be a MISMATCH if it contradicts what the customer was told. It never fills a gap in the discussion record with what a typical quote would usually include.",
        ],
      },
    ],
    howTo: {
      name: "How to use the pricing quote consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you can see exactly how a MATCH, MISMATCH, ADDED, and OMITTED verdict are each reached.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real quote and the real discussion record",
          text: "Before checking anything, collect the finished quote or proposal document and the actual call notes, email thread, or written record of verbal commitments made to that same customer.",
        },
        {
          name: "Hand both files to your assistant with the two real documents",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply the quote and the discussion record and ask for a line by line check.",
        },
        {
          name: "Resolve every MISMATCH, ADDED, and OMITTED finding before sending",
          text: "Correct a mismatched line against what was actually promised, justify or remove an added line, and add an omitted promise, before the quote goes to the customer.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as a valid discussion record for this skill?",
        answer:
          "Anything that is a real, written record of what was actually said to the customer: call notes, an email thread with the customer, or a rep's own written log of verbal commitments made on a call. It has to be a genuine record of that specific deal, not a generic summary of how deals like this one usually go.",
      },
      {
        question: "What happens if the discussion record does not mention a quote line at all?",
        answer:
          "The line is flagged as ADDED, meaning the quote includes something that never appears anywhere in the discussion record supplied. The skill states plainly that no corresponding promise exists in the record it was given, rather than assuming the line is either fine or wrong on its own.",
      },
      {
        question: "Does the skill decide whether a mismatched term is unfair to the customer?",
        answer:
          "No. It only checks whether the quote's wording matches the discussion record's wording. A term can be entirely reasonable and still come back as a MISMATCH if it contradicts what the customer was specifically told, because the check is about consistency with the promise, not fairness of the term.",
      },
      {
        question: "How is this different from a skill that checks a proposal's structure?",
        answer:
          "A structuring skill checks whether a proposal follows a complete section order and leaves an explicit placeholder for any pricing not yet finalised. This skill assumes the numbers are already filled in and checks them against an independent discussion record of what was actually promised, a different comparison entirely.",
      },
      {
        question: "What if a promise was made verbally and never written down anywhere?",
        answer:
          "If no discussion record captures it, the skill cannot check the quote against it. Its instructions forbid filling that gap with an assumption about what was probably said, so an unwritten promise stays outside what this skill can verify rather than being guessed at either way.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the quote or discussion record content you eventually run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-skills/sales-proposal-structuring-skill",
        label: "sales proposal structuring skill",
        description: "Checks whether a proposal follows a complete section order and flags missing pricing as a placeholder, a different check than matching filled in numbers to a discussion record.",
      },
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "A natural source of the dated, specific discussion record this skill checks a quote's line items against.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For deciding trades and a walk away price before the call that later becomes the discussion record this skill checks the quote against.",
      },
      {
        href: "/tools/discount-stacking-calculator",
        label: "discount stacking calculator",
        description: "For checking the arithmetic of a stacked discount once its structure has already been confirmed to match what was actually promised.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2019/03/how-to-negotiate-with-a-more-powerful-company",
        label: "Harvard Business Review: Negotiating with a more powerful company",
        description: "An independent account of why a verbal commitment made under negotiation pressure needs to be tracked accurately through to the final written terms.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/advertising-marketing-basics",
        label: "FTC: Advertising and Marketing Basics",
        description: "A primary regulatory source on why a written offer has to match what a customer was actually told, the same discipline this skill checks a quote against.",
      },
      {
        href: "https://www.gong.io/blog/pipeline-management/",
        label: "Gong: Pipeline Management Explained",
        description: "A practitioner account of how gaps between what was discussed and what a deal's paperwork shows distort outcomes once nobody is checking the two against each other.",
      },
    ],
  },

  tags: ["sales", "quotes", "pricing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
