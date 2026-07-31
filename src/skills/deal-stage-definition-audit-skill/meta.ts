import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Deal Stage Definition Audit

Use this skill when you are given a sales pipeline's own stated stage definitions, in the
team's own words, together with the real notes logged against one or more deals, and asked
whether each deal's currently assigned stage actually matches what its notes describe. The
job is diagnostic, not corrective: check the assignment against the evidence, and say
exactly what matches, what does not, and what is too thin to judge either way.

## Before you audit anything

You need two real things for every deal you audit: the pipeline's actual stage
definitions, and the actual notes logged against that specific deal. Do not invent a
plausible definition for a stage from its name alone. "Proposal Sent" sounds self
explanatory, but one team's real definition might require a signed engagement letter
first, and another's might only require an emailed PDF with pricing attached; guessing
from the label is exactly the shortcut this skill exists to prevent.

If you are given a deal's current stage and nothing else, a stage name with no written
definition behind it, or a stage assignment with no logged notes at all, say plainly that
there is not enough to audit and name precisely what is missing, the definition text or
the deal's notes, rather than proceeding as though the assignment were self evidently
correct.

## Never assume the assigned stage is correct

A deal's current stage in a pipeline is a claim, not a fact. This skill's whole job is to
test that claim against the deal's actual notes, every time, for every deal, even when the
stage looks obviously right at a glance. A deal sitting in "Proposal Sent" is not itself
evidence that a proposal was sent; the notes are the evidence. Treat every assigned stage
as unverified until the notes have actually been checked line by line against the stated
definition, and never let a stage that merely sounds plausible skip that check.

## How to audit one deal

1. Pull the exact definition text for the deal's currently assigned stage from the real
   stage definitions you were given. Quote it before doing anything else.
2. Read the deal's actual notes in full. Do not skim for the stage name; read for the
   specific actions, dates, documents and commitments the definition actually requires.
3. Compare directly: does the evidence in the notes satisfy each element the definition
   names? Identify which specific line of the notes, if any, supports each requirement.
4. Assign exactly one of three verdicts:
   - MATCHES: the notes contain specific evidence for every requirement in the stage's
     definition. Quote the exact line that supports each one.
   - MISMATCH: the notes are specific enough to judge, and either omit a required piece of
     evidence or actively contradict the stage. Quote the exact notes text and state
     precisely what the definition requires that is missing or contradicted.
   - INSUFFICIENT NOTES: the notes are too sparse, vague, or stale relative to the stage
     change to support a judgment either way. Say so and name what additional note content
     would resolve it.

## Output format

For every deal audited, write, in order: the deal name, the assigned stage, the exact
definition text being checked against, the verdict, and the specific evidence, quoted,
that the verdict rests on. Close with a one line count of deals in each of the three
states. Do not turn this into a single pipeline health score; the per deal verdicts are
the finding, not an average of them, and a MISMATCH on one deal should never be softened
because most of the other deals in the batch came back MATCHES.

## What this skill does not do

It does not decide which stage a mis staged deal should actually move to, does not
forecast whether the deal will close, and does not coach the rep who logged the notes or
speculate about why the mistake happened. It also does not rewrite or add to the notes it
is given; if the notes are missing something the definition requires, the skill says so
rather than filling the gap with a plausible sounding assumption about what probably
happened on the deal. See \`reference/worked-example.md\` for a full run through of what a
MATCHES, a MISMATCH and an INSUFFICIENT NOTES verdict each look like against real notes.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing three deals against real stage definitions

Use this alongside \`SKILL.md\`. It runs the audit method against one company's actual stage
definitions and three deals, so the difference between a MATCHES, a MISMATCH and an
INSUFFICIENT NOTES verdict is concrete rather than abstract.

## The stage definitions used in this example

These are the pipeline's own definitions, exactly as a team might document them. Nothing
below is inferred from the stage names; every requirement is written out.

1. Qualified: budget, authority, need and timeline have all been confirmed directly by the
   prospect in a call or written reply, not assumed by the rep.
2. Discovery Call Completed: a live discovery call has happened with the economic buyer or
   an explicit delegate, and the specific business problem being solved is written down.
3. Proposal Sent: a written proposal or quote document has been sent to the prospect,
   addressed to a named recipient, with pricing included.
4. Contract Negotiation: the prospect has responded to the proposal with specific
   requested changes to terms, price, or scope.
5. Closed Won: a signed contract or purchase order exists.

## Deal 1: Northwind Fixtures, assigned stage Proposal Sent

Notes, verbatim as logged in the CRM: "6/12 discovery call with Priya Anand (Ops Director)
and Sam Delgado (Finance). Confirmed they need to replace their current shelving vendor by
Q4, budget approved up to $85k per Sam. 6/19 sent proposal PDF to
priya.anand@northwindfixtures.com, cc sam.delgado@northwindfixtures.com, 3 tier pricing,
expires 7/19. 6/24 Priya replied: got it, reviewing with the team, will have questions on
tier 2 pricing next week."

Audit: the definition being checked is Proposal Sent, a written proposal or quote document
sent to the prospect, addressed to a named recipient, with pricing included. The 6/19 note
states a proposal PDF was sent to a named recipient, priya.anand@northwindfixtures.com,
with three tier pricing attached, and the 6/24 note confirms the prospect received it and
is actively reviewing it. Verdict: MATCHES. Every element of the definition, a written
document, a named recipient, and pricing, is directly supported by a specific dated line
in the notes.

## Deal 2: Cascade Retail Group, assigned stage Proposal Sent

Notes, verbatim as logged in the CRM: "5/2 intro call, decent fit. 5/9 discovery call with
their ops lead, needs replacing legacy system by EOY. 5/22 rep note: sent over pricing
info, moving to proposal sent, feels ready. 6/3 rep note: following up, no response yet.
6/15 rep note: still no response, will try calling."

Audit: the definition being checked is the same Proposal Sent definition above. The only
note describing anything sent is the 5/22 line, "sent over pricing info," which names no
document, no recipient, and no specific pricing figures, only the rep's own conclusion
that the deal "feels ready" to advance. Verdict: MISMATCH. The definition requires a
written proposal or quote document addressed to a named recipient with pricing included;
the notes describe an unspecified "pricing info" sent to an unnamed person, which is not
the same claim. The stage change itself appears to have been driven by the rep's own
assessment rather than by any event the definition actually requires. What would resolve
this: the actual proposal document or email that was sent, the name of the recipient it
went to, and the pricing figures it contained.

## Deal 3: Fenwick Analytics, assigned stage Contract Negotiation

Notes, verbatim as logged in the CRM: "Talked to them again, still interested. Moving
forward."

Audit: the definition being checked is Contract Negotiation, the prospect has responded to
the proposal with specific requested changes to terms, price, or scope. Nothing in this
note describes a proposal being sent, a response to one, or any requested change to terms,
price, or scope. Verdict: INSUFFICIENT NOTES. There is not enough here to judge a match or
a mismatch; the note does not even establish that a proposal exists yet, let alone that
the prospect responded to it with specific requested changes. What would resolve this: the
date and content of the proposal actually sent, and a direct quote or summary of what the
prospect specifically asked to change.

## How to read these three outcomes together

Deal 1 shows what a real MATCHES needs: positive, dated, quotable evidence for every
element the definition names, not just a general sense that things are going well. Deal 2
shows a MISMATCH that would be easy to wave through if the audit only checked whether the
stage name and the notes both mention a proposal in passing; the specific missing pieces,
a named recipient and real pricing, are what actually separate a matching deal from a mis
staged one. Deal 3 shows why INSUFFICIENT NOTES has to exist as its own verdict rather than
folding into MISMATCH: there is genuinely not enough written down to accuse this deal of
anything, and saying so plainly is more honest than guessing in either direction.
`;

const meta: SkillMeta = {
  slug: "deal-stage-definition-audit-skill",
  name: "Deal Stage Definition Audit",
  title: "Deal Stage Definition Audit Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that checks each deal's assigned pipeline stage against its real logged notes and the pipeline's own stage definitions, and never assumes a stage is correct just because it was assigned.",

  seo: {
    primaryKeyword: "deal stage definition audit skill",
    keywords: [
      "deal stage definition audit skill",
      "free ai skill for pipeline stage audit",
      "downloadable deal stage audit checklist",
      "ai skill to check crm stage accuracy",
      "how to audit deal stage definitions",
    ],
    seoTitle: "Deal Stage Definition Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable deal stage definition audit skill that checks each deal's assigned pipeline stage against its real notes, never against the stage label alone.",
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
      "Asked whether a deal's pipeline stage is accurate, models reliably treat the stage label itself as evidence and answer yes without opening the deal's actual notes to check whether the specific evidence the definition requires is actually present. This skill's three verdict structure forces every judgment to trace to quoted note text checked against the real stage definition, and requires an insufficient notes state rather than a guessed match whenever the notes are too sparse to support either verdict.",
  },

  article: {
    intro: [
      "A deal stage definition audit skill only earns its name if it checks every assigned stage against the deal's actual notes, not just the ones that already look doubtful. Handed a pipeline export, most AI assistants will skim the stage names, decide they sound plausible, and move on, treating the label itself as proof the underlying work happened. This skill refuses that shortcut and checks the evidence instead.",
      "It ships as two plain text files: a main instructions file and a worked example reference file it points to, covering three full deal audits against one shared set of stage definitions. Both are previewable in full on this page before you download the .zip, exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "Its job stops at diagnosis. It does not decide which stage a mis staged deal should move to, and it does not forecast whether any deal will close; it names, deal by deal, whether the notes support the stage that deal currently carries.",
    ],
    sections: [
      {
        heading: "Why an assigned stage is never evidence on its own",
        body: [
          "A deal's current stage in a CRM is a claim someone entered, not a fact the pipeline has independently verified. Nothing about a deal sitting in a stage called Proposal Sent guarantees a proposal was actually sent; a rep could have moved the stage a week early out of optimism, or forgotten to move it back after a deal stalled. The only way to know is to check the deal's own notes against what that stage is actually supposed to mean.",
          "This is why a stage never skips the check just because it looks right. A free ai skill for pipeline stage audit that only investigates deals already looking suspicious will miss the mis staged deals that looked fine at a glance, usually the ones doing the most damage to a forecast.",
        ],
      },
      {
        heading: "Why definitions have to come from the real pipeline, not the stage name",
        body: [
          "Stage names are short by design, which means they hide a lot of company specific detail. One team's Proposal Sent might require a signed engagement letter before it counts; another's might only require an emailed PDF with pricing. Guessing at what a stage name probably means, rather than reading the team's actual written definition, produces an audit that checks the assistant's assumptions instead of the pipeline's real rules.",
          "That is why gathering the real stage definitions is step one. A downloadable deal stage audit checklist is only useful if the definitions inside it are the pipeline's own, not a generic template applied regardless of how that specific team actually works.",
        ],
      },
      {
        heading: "The three verdicts: MATCHES, MISMATCH, INSUFFICIENT NOTES",
        body: [
          "Every audited deal gets exactly one of three states. MATCHES means the notes contain specific, quotable evidence for every requirement the stage's definition names. MISMATCH means the notes are detailed enough to judge, and either leave out something the definition requires or directly contradict it. INSUFFICIENT NOTES means the notes are too thin, vague, or outdated to support a judgment in either direction, and that gap gets named rather than resolved by a guess.",
          "Keeping INSUFFICIENT NOTES as its own state, rather than folding it into MISMATCH or defaulting to MATCHES, is what keeps this an honest ai skill to check crm stage accuracy instead of one that manufactures a verdict regardless of what was actually written down.",
        ],
      },
      {
        heading: "Worked example: two deals in the same stage, two different verdicts",
        body: [
          "The reference file walks through three deals checked against one shared Proposal Sent definition, a written proposal or quote document sent to the prospect, addressed to a named recipient, with pricing included. One deal's notes name the exact document, the exact recipient, and the exact pricing tiers sent, so it comes back MATCHES. Another deal's notes say only that pricing info was sent and the rep felt the deal was ready to move, with no named recipient and no document, so it comes back MISMATCH even though both deals carry the identical stage label.",
          "A third deal in the same worked example carries a note reading only that the prospect is still interested and things are moving forward. That is not enough evidence to accuse the deal of anything, so it comes back INSUFFICIENT NOTES rather than a guessed MISMATCH, which is exactly how to audit deal stage definitions without inventing certainty the notes never actually supported.",
        ],
      },
      {
        heading: "How this differs from a sales call review or a renewal risk read",
        body: [
          "The sales call review skill scores discovery quality on a single call, and the renewal risk flagging skill checks an account for danger signals across five categories. Both share this skill's evidence first discipline, but neither checks whether a deal's stage label matches what its notes actually describe, the narrower job this skill exists to do.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not decide which stage a mis staged deal should move to, forecast whether it closes, or explain why a rep moved a stage early. It will not add to or rewrite the notes it is given; a gap in the evidence is reported as a gap, never filled with a plausible sounding guess.",
        ],
      },
    ],
    howTo: {
      name: "How to use the deal stage definition audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you can see exactly how a MATCHES, MISMATCH and INSUFFICIENT NOTES verdict are each reached.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the pipeline's real stage definitions and deal notes",
          text: "Before auditing anything, pull the team's own written definition for each stage in question and the actual logged notes for every deal you want checked. Missing notes are fine to flag; guessed notes are not.",
        },
        {
          name: "Hand both files to your assistant and audit each deal",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply the real definitions and notes and ask for a verdict, deal by deal.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if a deal has no notes logged at all?",
        answer:
          "The skill returns an INSUFFICIENT NOTES verdict rather than assuming the stage is correct or incorrect. Its instructions treat a missing note history as genuinely unknown, and the output names exactly what kind of note content would let that specific deal actually be judged.",
      },
      {
        question: "Does this skill decide what stage a mis staged deal should move to?",
        answer:
          "No. Its job stops at naming whether the current stage matches the current notes, with a quoted verdict for each deal. Deciding the correct replacement stage, or what a rep should do next, is a separate decision this skill deliberately leaves to the person or team running the audit.",
      },
      {
        question: "Can it audit stage definitions it was not given?",
        answer:
          "No, and it should not try. The skill requires the pipeline's own real stage definitions as an input, because guessing at what a stage name like Proposal Sent probably means for a specific team produces an audit checking the assistant's assumptions rather than that team's actual rules.",
      },
      {
        question: "How is this different from the renewal risk flagging skill?",
        answer:
          "The renewal risk flagging skill checks an existing account for danger signals across five categories such as usage decline and stakeholder change. This skill checks something earlier and narrower in the deal lifecycle: whether a deal's current pipeline stage is actually supported by the evidence in its own notes, regardless of risk.",
      },
      {
        question: "What are the three possible verdicts for a deal?",
        answer:
          "MATCHES, when the notes contain specific evidence for every requirement in the stage's definition; MISMATCH, when the notes are detailed enough to judge and contradict or omit something the definition requires; and INSUFFICIENT NOTES, when the notes are too sparse or stale to support a judgment either way.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the pipeline data or deal notes you eventually run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "A natural source of the dated, specific deal notes this skill checks against each stage's definition.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description: "For working out why a deal actually closed or fell through, once its stage history has been checked for accuracy.",
      },
      {
        href: "/sales-skills/sales-call-review-skill",
        label: "sales call review skill",
        description: "A related downloadable checklist scoring discovery quality on a single call, the same evidence based discipline applied earlier in a deal.",
      },
      {
        href: "/sales-skills/renewal-risk-flagging-skill",
        label: "renewal risk flagging skill",
        description: "For flagging danger signals on an existing account once its deal stages and notes are already known to be accurate.",
      },
    ],
    externalLinks: [
      {
        href: "https://blog.hubspot.com/sales/sales-pipeline",
        label: "HubSpot: Sales Pipeline Stages and Definitions",
        description: "An independent explainer arguing that pipeline stages need an objective exit criterion rather than a feeling, the same standard this skill audits against.",
      },
      {
        href: "https://www.salesforce.com/resources/articles/sales-pipeline/",
        label: "Salesforce: What Is a Sales Pipeline",
        description: "A primary source walking through a typical stage by stage pipeline structure and what each stage is meant to represent.",
      },
      {
        href: "https://www.gong.io/blog/pipeline-management/",
        label: "Gong: Pipeline Management Explained",
        description: "A practitioner account of how stalled or mis staged deals distort forecasting when stage data goes unchecked.",
      },
      {
        href: "https://www.techtarget.com/searchcustomerexperience/definition/sales-pipeline",
        label: "TechTarget: Sales Pipeline Definition",
        description: "A reference definition of pipeline stages and the specific prospect actions meant to move a deal from one to the next.",
      },
    ],
  },

  tags: ["sales", "pipeline", "CRM hygiene", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
