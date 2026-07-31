import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Stakeholder RACI Audit

Use this skill whenever you are given a real RACI matrix, a project's stated
list of tasks with Responsible, Accountable, Consulted and Informed
assignments already entered, and asked to check it for structural errors
before it is circulated or relied on.

## What this skill needs before it can run

Ask for, or locate, the actual RACI matrix: every task or deliverable as a
row, with whichever names or role titles are actually entered in the
Responsible, Accountable, Consulted and Informed columns. Do not invent a
matrix from a project description alone, and do not invent who should hold
any role. This skill audits the assignments that already exist; it does not
author new ones.

If the matrix is informal (a list of tasks with owners noted loosely in
prose, for example), ask for it to be restated as rows and the four columns
before running the audit, rather than guessing at the structure yourself.

## Gate one: exactly one Accountable per task

For every task, count how many people are marked Accountable.

- Zero Accountable: flag the row UNOWNED. State plainly that nobody signs
  off on this task's outcome, and that the fix is to name exactly one
  Accountable owner from among the people already touching the task, or a
  new owner the matrix owner supplies. Do not choose one for them.
- Exactly one Accountable: passes this gate, move on.
- Two or more Accountable: flag the row DIFFUSED. Name every person
  carrying the Accountable mark on that row, state that accountability
  split across more than one person means nobody is definitively
  answerable when the task slips, and that the fix is to pick one of the
  named people as the sole Accountable owner and move the others to
  Responsible or Consulted, whichever the matrix owner confirms is
  accurate. Do not decide which of the named people should be the one;
  that is a call for the person who owns the matrix, not for this skill.

## Gate two: every task needs at least one Responsible

For every task, check the Responsible column.

- Zero Responsible: flag the row ORPHANED. An accountable owner without
  anyone marked Responsible means the work itself has nobody doing it,
  even if someone signs off on it. State the fix as adding at least one
  named Responsible party, drawn from people already named elsewhere on
  the row if the matrix suggests a candidate, but never invented from
  outside the matrix.
- One or more Responsible: passes this gate.

## Gate three: flagging genuine Consulted and Informed gaps

For every task where both Consulted and Informed are empty, look only at
the task's own stated name and description, nothing else, and ask whether
the task as described plausibly touches people beyond whoever is
Responsible and Accountable: a task that names a vendor, a compliance
requirement, another team, or an external customer is a candidate.

- If the task's own stated description gives a specific reason to expect a
  Consulted or Informed party, flag the row for review, quoting the exact
  phrase from the task that prompted the flag, and say plainly that the
  matrix does not currently name anyone to consult or inform.
- If the task's description gives no such reason, do not flag it. A short
  internal task with no stated cross functional or external dependency is
  allowed to have empty Consulted and Informed columns, and flagging every
  empty cell regardless of the task's nature produces noise nobody reads.
- Never propose a specific person or role to fill a Consulted or Informed
  cell. The output names the gap and quotes the reason it was flagged; the
  person who owns the matrix decides who actually gets consulted or
  informed.

## Producing the audit output

For every flagged row, report four things in order: the task name exactly
as it appears in the matrix, the flag (UNOWNED, DIFFUSED, ORPHANED, or
REVIEW for a Consulted or Informed gap), the specific names or the specific
quoted phrase that caused the flag, and the fix stated as an action for the
matrix owner to take, never as a filled in answer. Rows that pass all three
gates are listed separately as a short confirmation, not repeated in full.

## What this skill does not do

It does not build a RACI matrix from a project description, does not
invent who should be Responsible, Accountable, Consulted or Informed for
any task, and does not resolve a DIFFUSED or UNOWNED flag by picking a
name itself. Every fix it proposes names an action for a human to take
using the people already in the matrix or people they choose to add. Its
job stops at finding the structural defect and describing it precisely.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing a six task RACI matrix

Use this alongside \`SKILL.md\`. The matrix below is the kind of real,
already filled in RACI matrix this skill audits; nothing in it was invented
by the skill, only flagged.

## The matrix as given

| Task | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Draft vendor contract terms | Legal counsel | Procurement lead, Finance director | CFO | Executive sponsor |
| Migrate customer data to new platform | (blank) | Data platform lead | Security team | Support team |
| Notify customers of planned downtime | Support lead | Support lead | (blank) | (blank) |
| Approve quarterly training budget | Finance analyst | CFO | (blank) | (blank) |
| Sign off the annual security review | Security engineer | CISO | Legal | (blank) |
| Update the internal project timeline | Project manager | Project manager | (blank) | Steering committee |

## Gate one result: one row fails

"Draft vendor contract terms" carries two Accountable owners, Procurement
lead and Finance director. Flag: DIFFUSED. Both names are quoted directly
from the matrix. The fix stated back to the matrix owner: pick one of
Procurement lead or Finance director as the sole Accountable owner for
this task, and move the other to Responsible or Consulted depending on
their actual role in signing off the contract. The skill does not guess
which of the two should keep the mark.

Every other row in the matrix carries exactly one Accountable name, so no
other row fails gate one.

## Gate two result: one row fails

"Migrate customer data to new platform" has no name in the Responsible
column at all, only a Data platform lead marked Accountable. Flag:
ORPHANED. Someone is set up to sign off on this task, but nobody in the
matrix is assigned to actually do the migration work. The fix stated back:
add at least one named Responsible party for this task; the Data platform
lead already on the row is a plausible candidate for the matrix owner to
confirm, not one this skill assigns on their behalf.

## Gate three result: one row flagged for review, one row left alone

"Notify customers of planned downtime" and "Approve quarterly training
budget" both have empty Consulted and Informed columns, but they are
treated differently.

"Notify customers of planned downtime" names customers directly in its own
task description. That is a specific, stated reason to expect an Informed
party at minimum, someone representing the customer facing side of the
business, so this row is flagged REVIEW, quoting "notify customers" as the
reason, with a note that the matrix does not currently name anyone to
inform about this beyond whoever is doing the notifying.

"Approve quarterly training budget" has nothing in its own stated name
suggesting a cross functional or external dependency, so it is left alone.
An internal budget approval with no stated wider audience is allowed to
have empty Consulted and Informed columns without becoming an invented gap.

## Rows that pass every gate

"Sign off the annual security review" and "Update the internal project
timeline" each carry exactly one Accountable name, at least one
Responsible name, and either a stated Consulted party or a stated reason
their Consulted and Informed columns can reasonably stay empty. Both are
listed as passing, not repeated in full in the flagged output.

## What the final audit output looks like

A short summary followed by one entry per flagged row: the task name, the
flag, the names or quoted phrase behind it, and the fix as an action for
the matrix owner, never as a name this skill picked itself. One flag in
this example comes from gate one, one comes from gate two, one comes from
gate three, and two rows pass without further comment beyond being listed
as passing.
`;

const meta: SkillMeta = {
  slug: "stakeholder-raci-audit-skill",
  name: "Stakeholder RACI Audit",
  title: "Stakeholder RACI Audit Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that checks a real, already filled in RACI matrix for structural errors: tasks with zero or multiple Accountable owners, tasks with no Responsible party, and genuine Consulted or Informed gaps, without inventing who should hold any role.",

  seo: {
    primaryKeyword: "stakeholder raci audit skill",
    keywords: [
      "stakeholder raci audit skill",
      "free ai skill to audit a raci matrix",
      "raci matrix checklist download",
      "ai skill for raci accountability review",
      "how to check a raci matrix for errors",
    ],
    seoTitle: "Stakeholder RACI Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable stakeholder raci audit skill that checks a real RACI matrix for zero or multiple Accountable owners, missing Responsible parties and gaps.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/raci-audit-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to audit a stakeholder RACI matrix reliably treat a row as complete the moment every relevant cell holds a name, without separately checking that only one of those names carries the Accountable mark. A task left with two Accountable owners reads as thorough rather than diffused, and a task with none reads as merely light on detail rather than unowned. This skill forces the Accountable and Responsible counts to be checked explicitly, row by row, before a matrix is called structurally sound.",
  },

  article: {
    intro: [
      "A stakeholder raci audit skill only earns its name if it catches the two structural failures that quietly make a RACI matrix useless: a task with two Accountable owners fighting for the final call, and a task with none. Handed a real, already filled in matrix, this skill checks the assignments that are actually written down, row by row, and flags exactly what is missing rather than filling gaps in with plausible sounding names it invented on its own.",
      "It ships as two plain text files: a main instructions file and a worked example reference file it points to. Both are previewable in full on this page before you download the zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "That distinction, checking a real matrix rather than authoring one, is the whole discipline. Every gate below works only from the names and roles a task's owner actually entered, which is what makes this a free ai skill to audit a raci matrix worth trusting rather than a template that quietly relabels a guess as an assignment.",
    ],
    sections: [
      {
        heading: "Why zero or multiple Accountable owners is a structural risk, not a style issue",
        body: [
          "A RACI matrix exists to answer one question under pressure: when this task is late or wrong, who answers for it. A task with two people marked Accountable does not double that coverage, it removes it, because each can reasonably assume the other is handling the escalation until the deadline has already passed.",
          "A task with zero Accountable owners fails the opposite way: nobody to escalate to at all, so status becomes whatever the most anxious person in the room decides to report. Neither failure looks like a formatting problem. Both surface months later as a deliverable nobody owned, which is why the Accountable count is the first thing checked on every row.",
        ],
      },
      {
        heading: "Gate one: catching zero and multiple Accountable owners",
        body: [
          "The skill counts the Accountable marks on every task. Exactly one passes. Zero is flagged UNOWNED, stating plainly that nobody signs off on the outcome. Two or more is flagged DIFFUSED, with every name carrying the mark quoted directly from the matrix, and a stated fix: pick one of the named people as the sole owner and move the rest to Responsible or Consulted.",
          "The skill never picks which of the named people should keep the Accountable mark. That decision depends on authority and context the matrix owner has and the skill does not, so the output stops at naming the conflict and proposing the shape of the fix, not the specific answer.",
        ],
      },
      {
        heading: "Gate two: every task needs at least one Responsible party",
        body: [
          "An Accountable owner with nobody marked Responsible is a task where someone has agreed to sign off on work that nobody is assigned to actually do. The skill flags this row ORPHANED and states the fix as naming at least one Responsible party, drawing only on names already present elsewhere on that row as a candidate for the matrix owner to confirm.",
          "This gate matters as much as the first and gets less attention in reviews, because a named Accountable owner and a blank Responsible column still reads as complete at a glance. Learning how to check a raci matrix for errors is mostly learning which two rules matter and refusing to paper over an empty cell with a guess.",
        ],
      },
      {
        heading: "Gate three: flagging genuine Consulted and Informed gaps without inventing names",
        body: [
          "Consulted and Informed cells left empty are not automatically a defect. The skill only flags a row when the task's own description gives a specific reason to expect a wider audience: a named vendor, a compliance step, another team, or an external customer. When that reason exists, the row is flagged REVIEW with the exact phrase quoted, and the skill states that nobody is yet named to consult or inform, never proposing who that should be.",
          "As an ai skill for raci accountability review, its restraint here matters as much as its diligence on the first two gates. Flagging every blank Consulted or Informed cell regardless of the task's nature produces a report nobody reads twice.",
        ],
      },
      {
        heading: "Worked example: two flags a real matrix actually produces",
        body: [
          "The reference file walks through a six task matrix where one task carries two Accountable owners and another carries zero Responsible parties, alongside two tasks that pass every gate cleanly. Each flagged row shows the exact names or quoted phrase that triggered the flag and the specific fix proposed, never a name the skill invented to fill the gap itself.",
          "Working through a real example rather than an abstract rule is deliberate. Treat the reference file as a raci matrix checklist download you run against a matrix you already have, not a matrix generator that produces one for you from scratch.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "A stakeholder raci audit skill that invents names to fill a gap has stopped auditing and started guessing. It does not build a RACI matrix from a project description, does not invent who should hold any role, and does not resolve a DIFFUSED or UNOWNED flag by choosing a name on its own. Every fix it proposes is stated as an action for the matrix owner to take.",
        ],
      },
    ],
    howTo: {
      name: "How to use the stakeholder raci audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and the worked example reference file on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real, already filled in matrix",
          text: "Collect the actual RACI matrix as it exists, every task with whatever names or role titles are already entered in each column, rather than a summary from memory.",
        },
        {
          name: "Hand both files and the matrix to your assistant",
          text: "Keep the folder structure intact so the instructions can point to the worked example, then supply the real matrix and ask for the three gate audit.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if a task has no Consulted or Informed names at all?",
        answer:
          "The skill only flags that as a gap when the task's own stated description gives a specific reason to expect a wider audience, such as a named vendor, an external customer or another team. A short internal task with no such reason is allowed to have both columns empty without being treated as a defect.",
      },
      {
        question: "Can this skill decide who the single Accountable owner should be?",
        answer:
          "No. When a task carries two or more Accountable owners, the skill names all of them and states that the fix is picking one, but the choice of which named person keeps the mark is left to whoever actually owns the matrix, since that call depends on authority the skill was never given.",
      },
      {
        question: "Will it build a RACI matrix for me from a project plan?",
        answer:
          "No, and its instructions explicitly forbid it. A stakeholder raci audit skill checks a matrix that already exists, using the real assignments entered in each column. It does not invent a starting matrix from a project description, a task list, or any other source that was not already structured as rows and roles.",
      },
      {
        question: "Why does a task with zero Responsible parties matter if it already has an owner?",
        answer:
          "Because Accountable and Responsible answer different questions. An Accountable owner signs off on the outcome, but if nobody is marked Responsible, nobody in the matrix is actually assigned to do the work being signed off on, which is a separate and equally real gap this skill checks for on every row.",
      },
      {
        question: "Is any of my project data uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the matrix you eventually run this skill against is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description: "For logging the delivery risks an unowned or diffused task in the matrix is likely to surface once work is underway.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description: "For the document that names who decided once this skill's DIFFUSED flag has been resolved to a single Accountable owner.",
      },
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description: "A natural place an ORPHANED task shows up first, reported as behind schedule with no clear owner of the actual work.",
      },
      {
        href: "/business-prompts/stakeholder-update-prompt",
        label: "stakeholder update prompt",
        description: "For communicating a resolved Accountable or Responsible gap back to the people the matrix's Informed column names.",
      },
    ],
    externalLinks: [
      {
        href: "https://en.wikipedia.org/wiki/Responsibility_assignment_matrix",
        label: "Wikipedia: Responsibility assignment matrix",
        description: "An independent overview of the RACI structure, including the theory that each task should carry only one accountable stakeholder.",
      },
      {
        href: "https://asana.com/resources/raci-chart",
        label: "Asana: How to build a RACI chart",
        description: "States the rule that there should be only one Accountable role per task, the specific structural check gate one applies.",
      },
      {
        href: "https://www.cio.com/article/287088/project-management-how-to-design-a-successful-raci-project-plan.html",
        label: "CIO: How to design a successful RACI project plan",
        description: "Describes the single Accountable owner requirement as the golden rule of a RACI matrix and explains why splitting it causes delay.",
      },
    ],
  },

  tags: ["business", "raci", "stakeholder management", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
