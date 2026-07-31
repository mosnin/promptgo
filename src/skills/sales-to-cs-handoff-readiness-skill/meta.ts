import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Sales to CS Handoff Readiness Check

Use this skill when a deal has closed and you are given the handoff package a sales rep
has written for the customer success or onboarding team, together with the real material
that package should be drawn from: call notes, discovery transcripts, the proposal, or the
signed contract. The job is diagnostic, not generative: check whether the package actually
contains what the CS team needs to start onboarding without going back to the customer or
chasing the rep down, and say exactly what is complete, what is present but too vague to
act on, and what is missing outright.

## Before you check anything

You need two real things: the handoff package itself, and, wherever possible, the
underlying sales cycle material it claims to summarize, notes, transcripts, the proposal,
the contract. Do not invent a generic SaaS handoff checklist from nothing and grade the
package against your own assumption of what a "typical" customer wants. The four required
elements below are fixed, but the content that satisfies each one has to trace to
something this specific customer actually said or agreed to during this specific sales
cycle, not to what customers in that industry usually want.

If you are only given a company name and a deal size, with no package and no sales cycle
notes, say plainly that there is not enough to check and name precisely what is missing.
Never fill a gap in the package with a plausible sounding guess about what the customer
probably wants or probably agreed to.

## The four required handoff elements

Every complete handoff package needs all four of the following, each with real content
specific to this deal:

1. CUSTOMER GOALS AND SUCCESS CRITERIA. What the customer actually said, during the sales
   process, that success looks like, specific and ideally measurable enough that CS could
   check progress against it later without asking the customer to restate their own goal.
2. KEY STAKEHOLDER CONTACTS. The named people CS will need: at minimum the economic buyer,
   the day to day champion or primary contact, and any additional stakeholder the sales
   cycle surfaced as important, with a role and a way to reach each one.
3. COMMITMENTS MADE DURING THE SALES CYCLE. Any specific promise the rep made to close the
   deal: a feature timeline, a custom integration, a discount tied to a condition, a
   go live date. CS inherits these whether or not they were written into the contract.
4. CONTRACT TERMS RELEVANT TO ONBOARDING. The terms CS actually needs to plan around: seat
   or license count, start date, any statement of work deliverables, and any non standard
   clause that changes how onboarding has to run.

## Checking each element: three verdicts

For each of the four elements, assign exactly one of three states:

- COMPLETE: the package states something specific enough that CS could act on it without
  a follow up question to the customer or the rep. Quote the exact text.
- TOO VAGUE TO ACT ON: something is present, but it is generic, unmeasurable, or
  unverifiable, "the customer wants to grow," "standard onboarding," "the usual contacts,"
  the kind of language that reads as an answer but gives CS nothing to actually plan
  against. Quote the vague text and state precisely what would make it specific enough.
- MISSING: the package says nothing about this element at all.

Treat TOO VAGUE TO ACT ON as seriously as MISSING. A present but vague entry is more
dangerous than an absent one, because it looks handled and is not; nobody chases down a
line that already has words in it.

## Output format

For each of the four elements, in order, write the element name, the verdict, and the
exact quoted text the verdict rests on, or the words "not present in the package" for a
MISSING verdict. Close with a one line count of elements in each of the three states. Do
not average the four into a single readiness score; a single TOO VAGUE TO ACT ON element
should never be softened because the other three came back COMPLETE.

## What this skill does not do

It does not invent what the customer's goals, stakeholders, commitments or contract terms
were. If the package is thin, the honest output is a MISSING or TOO VAGUE TO ACT ON verdict
naming exactly what is absent, never a plausible sounding fabrication that makes the
package look more complete than it is. It also does not build the onboarding plan itself,
decide which stakeholder should be the main point of contact going forward, or judge
whether the deal was well sold. See \`reference/handoff-readiness-checklist.md\` for the
full definitions and a worked example of two complete elements, one flagged as too vague,
and one flagged as missing.
`;

const CHECKLIST_MD = `# Handoff readiness checklist and worked example

Use this alongside \`SKILL.md\`. It restates the four required elements as checkable
questions, then runs the full audit against one real seeming handoff package so the
difference between COMPLETE, TOO VAGUE TO ACT ON and MISSING is concrete.

## The four elements as checkable questions

1. Customer goals and success criteria: is there a specific, ideally measurable statement
   of what the customer defined as success, sourced from something said during the sales
   process, not a generic aspiration a CS rep could have written about any customer?
2. Key stakeholder contacts: is there at least one named economic buyer or champion, with a
   role and a way to reach them, rather than a department name or a job title alone?
3. Commitments made during the sales cycle: is every promise the rep made to win the deal
   written down with what was promised and by when, not just a note that "expectations
   were set"?
4. Contract terms relevant to onboarding: are the seat count, start date, and any
   deliverables or non standard clauses that affect onboarding stated as figures and dates,
   not summarized as "standard terms"?

## Worked example: the handoff package for Meridian Freight Co

Handoff note, as written by the closing rep and handed to the onboarding team:

"Meridian Freight Co signed on 7/22, annual contract, 40 seats, start date 8/4. Primary
contact is Dana Ruiz, VP Operations, dana.ruiz@meridianfreight.example, she was on every
call and is the internal champion. Second contact is Marcus Webb in Finance who approved
the PO but was not on the discovery calls. On the 6/30 discovery call Dana stated the
specific goal: cut average load confirmation time from 22 minutes to under 6 minutes
within the first 90 days, measured against the timestamped log Meridian already keeps for
compliance. Customer wants to grow the account over time. Contract includes standard
onboarding."

## Auditing the four elements

CUSTOMER GOALS AND SUCCESS CRITERIA: COMPLETE. The 6/30 note quotes a specific, measurable
goal, cutting load confirmation time from 22 minutes to under 6 minutes within 90 days,
tied to a log the customer already uses to measure it. CS can plan an onboarding milestone
directly against this number without asking Dana to restate her own goal.

KEY STAKEHOLDER CONTACTS: COMPLETE. Two named contacts are given, each with a role and a
reason CS needs them: Dana Ruiz as the internal champion who was present on every call, and
Marcus Webb in Finance as the PO approver who was not on the calls and should be looped in
differently. CS has what it needs to route the first outreach correctly.

COMMITMENTS MADE DURING THE SALES CYCLE: TOO VAGUE TO ACT ON. The only line touching this
element is "customer wants to grow the account over time," which is not a commitment the
rep made to Meridian at all, it reads as a note about future upsell potential, and it names
no specific promise, feature, timeline or condition. What would make this specific: whether
the rep actually promised anything, a faster go live, a custom report, a pricing lock,
during the sales cycle, and if so, what exactly and by when.

CONTRACT TERMS RELEVANT TO ONBOARDING: MISSING for the parts that matter to onboarding
beyond seats and start date. "Standard onboarding" names no deliverable, no statement of
work, and no non standard clause, so it tells CS nothing it did not already get from the
seat count and start date already listed. What would resolve this: the actual contract
language or SOW section describing what onboarding is contractually scoped to include.

## Summary line for this package

Two elements COMPLETE (customer goals and success criteria, key stakeholder contacts), one
element TOO VAGUE TO ACT ON (commitments made during the sales cycle), one element MISSING
(contract terms relevant to onboarding beyond seats and start date). This package is not
ready to hand off until the rep is asked, directly, what was actually promised during the
sales cycle and what the contract specifically scopes onboarding to include.

## How to read this example

Notice that the two COMPLETE elements are not COMPLETE because they are long, they are
COMPLETE because they trace to a dated, quotable source, the 6/30 call and the signed
contract's seat count and date. The TOO VAGUE TO ACT ON verdict is not about missing words,
a full sentence is present, it fails because that sentence gives CS nothing to plan a
specific action against. Use this same test on every package: could the onboarding team
act on this line without a follow up question to the customer or the rep who wrote it?
`;

const meta: SkillMeta = {
  slug: "sales-to-cs-handoff-readiness-skill",
  name: "Sales to CS Handoff Readiness Check",
  title: "Sales to CS Handoff Readiness Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that checks a closed deal's sales to customer success handoff package against four real required elements, and flags anything present but too vague to act on as seriously as anything missing outright.",

  seo: {
    primaryKeyword: "sales to cs handoff readiness skill",
    keywords: [
      "sales to cs handoff readiness skill",
      "free ai skill for sales handoff readiness",
      "downloadable sales to customer success handoff checklist",
      "ai skill to check handoff completeness",
      "how to prepare a sales to cs handoff",
    ],
    seoTitle: "Sales to CS Handoff Readiness Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable sales to cs handoff readiness skill that checks a closed deal handoff package against real stated goals and commitments.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/handoff-readiness-checklist.md", content: CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a handoff package where the stated customer goal reads only that the customer wants to grow or wants to improve efficiency, models asked to check handoff readiness reliably mark that element complete, because a sentence fills the space, without testing whether it is specific and measurable enough for a customer success team to plan an onboarding milestone against without going back to the customer. This skill's vague test requires every goal, contact, commitment and contract term to be checked against a single question: could the next team act on this line without asking a follow up question.",
  },

  article: {
    intro: [
      "A sales to cs handoff readiness skill only earns its name if it checks a real handoff package against real required elements, not a generic template it invents on the spot. Handed a note a rep wrote minutes before a deal closed, most AI assistants will skim it, decide it looks complete because sentences fill every heading, and move on without testing whether those sentences give CS anything to act on.",
      "This skill checks four fixed elements every closed deal handoff needs: stated goals and success criteria, key stakeholder contacts, commitments made during the sales cycle, and contract terms that affect onboarding. Each element gets a verdict of complete, too vague to act on, or missing, and a present but vague entry is treated as seriously as an absent one.",
      "It ships as two plain text files: a main instructions file and a checklist and worked example file it points to, covering one handoff package with two complete elements, one flagged too vague, and one flagged missing. Both preview in full before you download the .zip.",
    ],
    sections: [
      {
        heading: "Why this skill checks real elements, not an invented checklist",
        body: [
          "The four required elements are fixed, but what satisfies each one is never invented. A generic assumption about what a typical customer probably wants is not evidence; the acceptable source for a stated goal, a stakeholder, or a commitment is something that customer or rep actually said or agreed to, traceable to a call note, a transcript, or the signed contract.",
          "This is not a general purpose free ai skill for sales handoff readiness grading any package against a generic template. It is the difference between a downloadable sales to customer success handoff checklist that protects a relationship and one that just looks thorough: right headings still fail if whatever sits under each one is a guess dressed up as fact.",
        ],
      },
      {
        heading: "The four required handoff elements this skill checks",
        body: [
          "Customer goals and success criteria: what the customer said, during the sales process, that success looks like, specific enough to check progress against later. Key stakeholder contacts: the named people CS needs, at minimum an economic buyer and a day to day champion, each with a role and a way to reach them. Commitments made during the sales cycle: any specific promise the rep made to close the deal, a timeline, a custom feature, a discount tied to a condition. Contract terms relevant to onboarding: seat count, start date, and any deliverable or non standard clause that changes how onboarding runs.",
          "Each element is checked on its own, not folded into a single readiness score, which is what makes this an ai skill to check handoff completeness rather than a rubber stamp.",
        ],
      },
      {
        heading: "Complete versus too vague to act on",
        body: [
          "A line counts as complete only if the next team could act on it without a follow up question. 'The customer wants to grow' names no metric, timeline, or way to check progress later; it is not a real, specific success criterion, just a sentence occupying the space where one should be. The same test applies to 'standard onboarding' standing in for contract terms, or 'the usual contacts' standing in for stakeholders.",
          "Anyone wondering how to prepare a sales to cs handoff that survives this check should start from the opposite direction: write the actual number, the actual name, the actual date, and only fall back to a general statement if the sales cycle genuinely produced nothing more specific, flagging that gap rather than papering over it.",
        ],
      },
      {
        heading: "Worked example: two complete elements, one vague, one missing",
        body: [
          "The reference file audits one seeming handoff package for a closed deal. The customer's stated goal, cutting a process time from 22 minutes to under 6 minutes within 90 days, measured against a log the customer already keeps, comes back complete: it traces to a dated call note and gives CS a real milestone. The named stakeholder contacts, a champion and a finance approver, also come back complete.",
          "The commitments line reads only that the customer wants to grow the account over time, naming no actual promise, so it comes back too vague to act on. The contract terms line reads only 'standard onboarding' beyond the seat count and start date already listed, and comes back missing, since it names no deliverable CS could plan around.",
        ],
      },
      {
        heading: "How this differs from the task handoff skill",
        body: [
          "The task handoff skill covers a general transition, going on leave, changing roles, or delegating ongoing work, checked for current state, context and next steps. This skill is narrower: one moment, a sales rep handing a closed deal to customer success, checked against four elements tied to that sales cycle, the customer's stated goals, the people involved, and what the contract says. Both refuse to accept a present but vague entry as finished, applied to different handoffs.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not invent what the customer's goals, stakeholders, commitments or contract terms were. A thin package gets a missing or too vague verdict, never a plausible fabrication. It also will not build the onboarding plan itself or judge how well the deal was sold; its job stops at whether the package hands over what CS needs to start.",
        ],
      },
    ],
    howTo: {
      name: "How to use the sales to cs handoff readiness skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/handoff-readiness-checklist.md on this page before downloading, so you can see how a complete, too vague to act on, and missing verdict are each reached.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real handoff package and sales cycle material",
          text: "Before auditing anything, collect the rep's actual handoff package along with real source material behind it: discovery notes, the proposal, or the signed contract. Missing material is fine to flag; guessed material is not.",
        },
        {
          name: "Hand both files to your assistant and check each element",
          text: "Keep the folder structure intact so the main file can point to the checklist, then supply the real handoff package and ask for a verdict on all four required elements.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if the handoff package has no stakeholder contacts at all?",
        answer:
          "The skill returns a missing verdict for that element rather than assuming the sales rep will stay reachable. Its output names precisely what is absent, a named economic buyer or champion with a way to reach them, so someone can go get it before onboarding starts.",
      },
      {
        question: "Does this skill decide what the customer's real goals should be?",
        answer:
          "No. It only checks whether a stated goal is already present and specific enough to act on. If the sales cycle material never captured a real goal, the output is a missing or too vague verdict naming that gap, not an invented success criterion that sounds plausible for that kind of customer.",
      },
      {
        question: "What counts as too vague for a customer success criterion?",
        answer:
          "Anything the customer success team could not plan a milestone against without going back to the customer to ask what it means. A statement like the customer wants to grow fails this test; a statement naming a specific metric, a starting number, a target number, and a timeframe passes.",
      },
      {
        question: "How is this different from the task handoff skill?",
        answer:
          "The task handoff skill covers any general transition and checks for current state, context and next steps. This skill is specific to one closed deal moving from a sales rep to customer success, and checks four elements tied to what the customer stated during the sales cycle, who the stakeholders are, what was promised, and what the contract scopes.",
      },
      {
        question: "Can it audit a handoff package before the deal fully closes?",
        answer:
          "Yes, as long as real sales cycle material already exists to check the package against. Running the audit early can surface a missing or too vague element while the rep can still get the missing detail from the customer, rather than after the relationship has transferred.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and .zip download both happen entirely in your browser. There is no server call behind either action, and none of the deal or customer data you run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "task handoff skill",
        description: "For a general transition covering any task, project or role change, rather than this skill's narrower focus on a closed deal moving from sales to customer success.",
      },
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "A natural source of the dated, quotable notes on customer goals and commitments this skill checks the handoff package against.",
      },
      {
        href: "/business-prompts/onboarding-plan-prompt",
        label: "onboarding plan prompt",
        description: "For building the actual onboarding plan once a handoff package has passed this skill's readiness check.",
      },
      {
        href: "/skills/sales-skills/renewal-risk-flagging-skill",
        label: "renewal risk flagging skill",
        description: "A related downloadable checklist applying the same evidence based discipline later in the account lifecycle, once onboarding is already underway.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.rocketlane.com/blogs/sales-to-customer-success-handoff",
        label: "Rocketlane: Sales to Customer Success Handoff Guide",
        description: "An independent breakdown of the elements a complete sales to customer success handoff document should transfer, including goals, stakeholders and commitments.",
      },
      {
        href: "https://chartmogul.com/blog/sales-customer-success-handoff/",
        label: "ChartMogul: Best in Class Sales to Customer Success Handoff",
        description: "An account of how missing or unrecorded handoff details, not a lack of tooling, are what cause customer success teams to ask questions the customer already answered.",
      },
      {
        href: "https://close.com/blog/sales-customer-success-handoff",
        label: "Close: Nailing the Sales to Customer Success Handoff",
        description: "Independent guidance on documenting the specific promises made during a sales process so a new team does not silently drop a commitment the customer is expecting.",
      },
      {
        href: "https://www.gainsight.com/blog/customer-onboarding/",
        label: "Gainsight: Customer Onboarding Best Practices",
        description: "A primary source on co-creating concrete, measurable success criteria with a customer during onboarding, the same standard this skill checks a handed off goal against.",
      },
    ],
  },

  tags: ["sales", "customer success", "handoff", "onboarding", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
