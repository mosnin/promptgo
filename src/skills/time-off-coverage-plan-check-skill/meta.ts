import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Time Off Coverage Plan Check

Use this skill when someone is going on planned time off, vacation, PTO, parental
leave, a sabbatical, and needs to check whether the coverage plan for that
absence actually holds up, rather than just looking finished on a page. This is
not a general handoff document. It is a narrower check against a specific,
temporary structure: who covers what, for how long, and with what authority,
while one person is out and expected back.

## The three things a coverage plan needs

A coverage plan is only complete when it contains three specific things,
checked against the real work the person going on leave actually does.

1. NAMED COVERAGE for every real responsibility. Every ongoing task, approval,
   or relationship the person is responsible for needs one named person
   assigned to it while they are away. A responsibility with no name next to
   it is not covered, no matter how minor it looks on the list.

2. A STATED AUTHORITY LEVEL for every coverage assignment. Naming a covering
   person is not enough on its own. That person needs to know whether they can
   approve or decide things outright for that responsibility, or whether their
   role is to monitor and escalate to someone else, or something specific in
   between. An assignment that only says who is covering, with no authority
   attached, leaves the covering person guessing at the exact moment a real
   decision shows up.

3. A REAL RE-ENTRY POINT. The plan states, concretely, what happens when the
   person returns: a specific catch up meeting on the calendar, or a defined
   summary they will receive covering what happened and what was escalated.
   "We will catch up when I'm back" is not a re-entry point.

## Before checking anything

Ask for two real inputs before running this check: the actual list of ongoing
responsibilities for the person going on leave, and the actual coverage
assignments that have already been made against that list. This skill cannot
know what someone's job actually involves without being told. Do not invent a
responsibility from a job title alone, and do not accept a coverage plan that
lists names and dates without a real responsibility list to check those names
against. If either input is missing, ask for it directly rather than
proceeding on an assumed list of duties.

## Checking that every responsibility has named coverage

Go down the real responsibility list one item at a time. For each one, look
for a named person assigned to cover it during the leave period. A
responsibility with a note like "will sort itself out" or no line at all
against it is missing coverage, and gets flagged by name, quoting the exact
responsibility that has nobody assigned.

## Checking that every coverage assignment states a clear authority level

For each responsibility that does have a named covering person, check whether
the plan also states what that person is allowed to do: approve requests and
make the call themselves, or watch for problems and escalate to a specific
named person rather than deciding. Language like "keep an eye on it" or "will
handle it" without saying which of those two the covering person can actually
do counts as unclear authority, and gets flagged the same way a missing name
does.

## Checking the re-entry point

Look for a specific mechanism, not a vague intention. A calendar invite for a
catch up call on a stated day, or a named format for a written summary the
returning person will receive, both count. A plan that says only that the two
people will talk when the person is back, with no day, no format, and no
owner for producing it, does not count as a stated re-entry point.

## Confirming a plan is genuinely complete

Only say a coverage plan is complete once every real responsibility on the
list has a named covering person, every one of those assignments states a
clear authority level, and the plan states a real re-entry point. If all
three hold against the actual list supplied, say so plainly and name what was
checked. Do not call a plan complete because it looks thorough; call it
complete because every item on the real list passed all three checks.

## What this skill does not do

It does not invent responsibilities that were not on the real list supplied,
and it does not assume a default authority level for a covering person who
was not given one. A responsibility that is genuinely minor still needs a
named person and a stated authority level if it was on the real list; this
skill does not decide on its own that something is small enough to skip.
`;

const COVERAGE_PLAN_FORMAT_MD = `# Coverage plan format, with a worked example

Use this alongside \`SKILL.md\`. It shows the format a coverage plan should
follow and a full worked example: five real responsibilities, most covered
completely, one with no named coverage, and one with a named person but
unclear authority.

## The format

For each responsibility, record four fields:

- Responsibility: the real, ongoing task, approval, or relationship.
- Covering person: the named person handling it during the leave period, or
  blank if nobody has been assigned yet.
- Authority level: either "full authority, can approve or decide", or
  "monitor and escalate to [named person]", stated explicitly, not implied.
- Notes: anything time sensitive or specific to that item.

Then one final entry for the plan as a whole:

- Re-entry point: the specific meeting, date, and attendees, or the specific
  summary format and who produces it.

## Worked example: Jordan, Support Team Lead, two weeks of leave

Real responsibility list supplied by Jordan's manager, checked item by item.

### 1. Daily support ticket triage

Covering person: Sam.
Authority level: full authority, can respond to and close tickets without
checking with anyone first.
Result: COMPLETE. Named coverage and a clear authority level are both
present.

### 2. Approving refund requests over five hundred dollars

Covering person: (blank, nobody named).
Authority level: not applicable, no coverage assigned.
Result: MISSING COVERAGE. This is a real, stated responsibility with no
named person against it. Flag it by name rather than assuming refunds over
five hundred dollars will simply wait two weeks.

### 3. Weekly customer health check in call

Covering person: Priya.
Authority level: "Priya will keep an eye on the account."
Result: UNCLEAR AUTHORITY. A name is present, but the plan does not say
whether Priya can commit the team to a remediation step on that call, or
whether she needs to escalate anything she hears to someone else first. Flag
it as unclear rather than assuming either interpretation.

### 4. Sign off on the Q3 support roadmap document

Covering person: Marcus.
Authority level: "Monitor only. Escalate any requested roadmap change to
Jordan's manager, Dana. Do not approve a change independently."
Result: COMPLETE. The authority level is explicit and narrow, monitor and
escalate rather than decide, and it names exactly who to escalate to.

### 5. Re-entry point for the whole plan

"Thirty minute catch up meeting with Sam and Priya scheduled for Jordan's
first morning back, plus a written summary of any escalated items prepared
by Marcus before that meeting."
Result: COMPLETE. A specific meeting, a specific day, named attendees, and a
named summary with an owner.

## Verdict on this example

The plan is not yet complete. Item 2 has no named coverage at all, and item 3
has a named person but no stated authority level. Items 1, 4, and the
re-entry point pass all checks. A complete verdict cannot be given until item
2 gets a name and item 3 gets an explicit authority level attached to
Priya's coverage.

## Common ways a coverage plan looks complete and is not

A responsibility list with a name in every row can still hide a gap, because
a name answers "who" and says nothing about "what can they actually do."
Watch for authority language that describes a feeling rather than a
boundary, such as "will stay on top of it" or "will make sure it's fine,"
neither of which tells a covering person whether they can act or must ask
first. Watch also for a re-entry point that names an intention without a
mechanism, since "we'll sync when I'm back" produces no calendar hold and no
owner for a summary, and tends to quietly not happen once the person
actually returns.
`;

const meta: SkillMeta = {
  slug: "time-off-coverage-plan-check-skill",
  name: "Time Off Coverage Plan Check",
  title: "Time Off Coverage Plan Check Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks a planned time off coverage plan against someone's real responsibility list, flagging any responsibility with no named coverage or an unclear authority level, and confirming a re-entry point is stated before calling the plan complete.",

  seo: {
    primaryKeyword: "time off coverage plan check skill",
    keywords: [
      "time off coverage plan check skill",
      "free ai skill for time off coverage",
      "downloadable vacation coverage checklist",
      "ai skill to check pto coverage plan",
      "how to plan coverage for time off",
    ],
    seoTitle: "Time Off Coverage Plan Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable time off coverage plan check skill that flags any responsibility with no named coverage or an unclear authority level.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/coverage-plan-format.md", content: COVERAGE_PLAN_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check a time off coverage plan tend to accept it as complete once every responsibility line has some name attached, without checking whether that assignment also states what the covering person is actually allowed to do, approve a request outright, or only monitor and escalate to someone else. A plan that names a person but leaves authority unstated reads as finished and is not, because the gap only surfaces once a real decision lands in front of the covering person while the original owner is unreachable. This skill's check requires both a named person and a stated authority level for every real responsibility before a plan is treated as complete.",
  },

  article: {
    intro: [
      "A time off coverage plan check skill only earns its name if it can tell the difference between a plan that names people and a plan that actually transfers authority. Most coverage plans for a vacation, a parental leave, or a sabbatical read as complete on first glance: there is a list of tasks, and a name next to most of them. That glance misses two gaps: a responsibility with nobody named, and a named person never told whether they can approve anything or only watch and escalate.",
      "This skill checks a coverage plan against the real, stated responsibility list for the person going on leave, not a guessed list. It requires both real inputs, responsibilities and coverage assignments, and flags two kinds of gap: missing coverage and unclear authority, then confirms a re-entry point before calling anything complete.",
      "It ships as two plain text files, a main instructions file and a coverage plan format reference with a worked example. Both are previewable in full on this page before you download the .zip.",
    ],
    sections: [
      {
        heading: "Why a name on the list is not the same as coverage",
        body: [
          "A coverage plan with a name in every row looks finished to anyone skimming it. But a name answers only one question, who is covering this, and says nothing about what that person can do when a real decision shows up while the original owner is unreachable. A time off coverage plan check skill exists because that gap is invisible on a glance and expensive when it surfaces mid leave.",
          "This is why the skill treats a named person with no stated authority level the same way as a missing name: a gap that gets flagged, not a detail that can wait.",
        ],
      },
      {
        heading: "The three checks, run against the real list you supply",
        body: [
          "Every plan gets run against three things: named coverage for each real responsibility, a stated authority level for each covering assignment, full authority to decide, or monitor and escalate to someone specific, and a concrete re-entry point. Nothing is checked until the real responsibility list and the real coverage assignments are on the table, because this skill cannot know what someone's job involves without being told.",
          "As a free ai skill for time off coverage, and as an ai skill to check pto coverage plan submissions specifically, its value is refusing to fill that list in from a job title or a guess. A support lead and a finance analyst going on leave have different responsibility lists, and inventing one from the title alone would defeat the point of checking a real plan.",
        ],
      },
      {
        heading: "A worked example: five responsibilities, two flags",
        body: [
          "Take Jordan, a support team lead going on two weeks of leave, with five real responsibilities on the list. Daily ticket triage, covered by Sam with full authority to close tickets, passes. Approving refund requests over five hundred dollars has nobody named against it, a missing coverage flag. The weekly customer health call is covered by Priya, but the plan only says she will keep an eye on the account, with no statement of whether she can commit to a fix or must escalate first, an unclear authority flag.",
          "The fourth item, sign off on the Q3 roadmap document, is covered by Marcus with an explicit instruction to monitor only and escalate any change request to Jordan's manager by name, which passes. The re-entry point, a thirty minute meeting on Jordan's first day back plus a written summary of escalations, also passes. Two of five items fail, and the plan cannot be called complete until the refund approval gets a name and Priya's authority level gets stated.",
        ],
      },
      {
        heading: "Planned coverage versus a permanent role transition",
        body: [
          "This skill is narrower than a general handoff document. It exists for a temporary, planned absence with a known return, vacation, PTO, parental leave, a short sabbatical, where coverage only has to hold for a bounded window and then reverse when the person comes back. A permanent role change needs the full structure a task handoff skill covers instead, current state, the reasoning behind past decisions, and next steps, since there is no return date and no re-entry point to check against.",
          "Both check that coverage is named rather than assumed, but this skill's authority level check and re-entry point requirement are specific to a plan expecting the original owner back on a known day.",
        ],
      },
      {
        heading: "When to say a coverage plan is genuinely complete",
        body: [
          "Only after every item on the real list has a named covering person, every assignment states a clear authority level, and a re-entry point is on record, does this skill confirm the plan complete. It says so by naming what was checked, not by describing the plan as thorough looking. A plan missing even one authority level stays incomplete until that gap is closed.",
        ],
      },
      {
        heading: "Using the downloaded files as a downloadable vacation coverage checklist",
        body: [
          "Hand both files to a teammate or an AI assistant together. For anyone asking how to plan coverage for time off from a blank page, the reference file is the fastest route in: it works through the format field by field, so the standard being applied is visible rather than only described.",
        ],
      },
    ],
    howTo: {
      name: "How to use the time off coverage plan check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/coverage-plan-format.md directly on this page before downloading, so you know exactly what counts as named coverage, a stated authority level, and a real re-entry point.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real responsibility list and coverage assignments",
          text: "Before using the skill, write down the actual ongoing tasks, approvals, and relationships the person going on leave is responsible for, plus whatever coverage has already been assigned.",
        },
        {
          name: "Hand both files to your assistant and check the plan",
          text: "Keep the folder structure intact, then ask your assistant to check the real plan against the three requirements and name any responsibility with no coverage or unclear authority.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as an unclear authority level for a covering person?",
        answer:
          "Any wording that names who is covering a responsibility without saying what they can do about it. Phrases like watching the account or keeping an eye on things do not say whether the covering person can approve a request or must escalate it first, so this skill flags that as unclear even though a name is present.",
      },
      {
        question: "Does this skill work for a short absence, like a single day off?",
        answer:
          "Yes, though the check matters most once the absence is long enough that a real decision is likely to come up while the person is away. For a single day, a shorter list of urgent items may be enough, but the same three checks still apply to whatever is on that shorter list.",
      },
      {
        question: "How is this different from the task handoff skill?",
        answer:
          "The task handoff skill covers a permanent transition and requires current state, decision reasoning, and next steps, since there is no return date. This skill is built for a planned, temporary absence with an expected return, and adds two checks a permanent handoff does not need, a stated authority level and a concrete re-entry point.",
      },
      {
        question: "What if a responsibility genuinely does not need coverage while someone is away?",
        answer:
          "That is a valid outcome, but it has to be stated, not left blank. A responsibility marked explicitly as paused during the leave period is a real, checked decision. A responsibility with an empty row and no explanation is a gap this skill flags rather than assumes is intentional.",
      },
      {
        question: "Can the skill invent a responsibility list from someone's job title?",
        answer:
          "No, and its instructions forbid it. This skill cannot know what a specific person's job actually involves without being told, so it requires the real responsibility list as an input and will not proceed by guessing duties from a title or department alone.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about your coverage plan is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "task handoff skill",
        description: "For a permanent role change or departure with no return date, rather than a planned, temporary absence with a re-entry point to check.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description: "For drawing the decision boundary on a single piece of work before it leaves your hands, a smaller companion to checking a full coverage plan.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description: "For structuring the actual catch up meeting a coverage plan's re-entry point points to once the person is back.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description: "For planning the covering person's own week once they have taken on a monitor and escalate or full authority assignment.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2024/11/a-guide-to-handing-off-work-before-a-vacation",
        label: "Harvard Business Review: A Guide to Handing Off Work Before a Vacation",
        description: "An independent account of what a real handoff before planned leave needs to cover, including notifying colleagues well in advance.",
      },
      {
        href: "https://www.shrm.org/topics-tools/news/benefits-compensation/employers--pto-problem--employees-working-on-vacation",
        label: "SHRM: Employers' PTO Problem, Employees Working on Vacation",
        description: "Independent reporting on why weak coverage planning leads employees to keep working through vacation instead of actually disconnecting.",
      },
      {
        href: "https://fullfocusplanner.com/the-five-levels-of-delegation/",
        label: "Full Focus: The Five Levels of Delegation",
        description: "An independent explainer of the authority spectrum, from following exact instructions to acting independently, behind this skill's authority level check.",
      },
      {
        href: "https://www.atlassian.com/software/confluence/templates/out-of-office-plan",
        label: "Atlassian: Out of Office Plan Template",
        description: "A real, independent template for documenting leave dates, work status, and key contacts, the same category of artifact this skill checks for completeness.",
      },
    ],
  },

  tags: ["productivity", "time off", "coverage plan", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
