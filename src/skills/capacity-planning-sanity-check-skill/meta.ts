import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Capacity Planning Sanity Check

Use this skill whenever you are handed a team's stated headcount, its stated
hours available per person for a period, and a list of real project time
estimates assigned to that team, and asked whether the plan actually fits.
The job is arithmetic, not impression: add up what is really available,
add up what is really assigned, and state the gap in real numbers.

## What you need before starting

Collect four things before calculating anything. Do not proceed on a partial
set and do not fill a gap with a plausible sounding guess.

1. The team's real headcount for the period in question.
2. The real hours available per person for that period, stated by whoever
   owns the plan, not assumed from a standard working week.
3. Any stated time off or non project time (leave, a support rotation,
   recurring meetings) that reduces the raw headcount times hours figure.
4. The real list of project time estimates assigned to the team over that
   same period, one estimate per project.

If any of the four is missing, ask for it directly and name exactly which
number is missing. Never substitute an industry average, a prior period's
figure, or a round number that was not actually given to you.

## Step one: calculate the real available hours

Start from the raw figure: headcount multiplied by hours available per
person for the period. Then subtract every stated time off or non project
figure you were given, one line at a time, so the subtraction is visible
rather than folded into a single adjusted number. The result is the team's
real available hours for the period. Show this working every time, even
when the subtraction is small.

## Step two: sum the real assigned hours

List every project estimate you were given for the period, then add them.
If one project on the list has no stated estimate, do not assume zero and
do not assume it matches the average of the others. State plainly that the
sum is incomplete without that number, give the sum of the estimates you do
have, and name the specific project whose estimate is missing before saying
anything about whether the team is over or under capacity.

## Step three: compare and flag the specific gap

Subtract available hours from assigned hours. If the assigned total exceeds
the available total, state the exact number of hours over capacity and the
percentage that represents, naming the real figures that produced it. If
the assigned total is under the available total, say so with the same
specific numbers rather than a vague "this looks fine." Never write a
conclusion like "the team appears overallocated" without the subtraction
that supports it sitting directly next to the claim.

## What this skill will not do

It will not invent a headcount, an hours per person figure, a time off
figure, or a project estimate that was not supplied. It will not assume a
missing project estimate is zero, small, or average sized. It will not
round the available or assigned totals to a tidier number than the real
arithmetic produced. When a needed number is missing, the output names the
gap and stops short of a verdict on that project, rather than completing
the plan with a guess dressed up as a fact.
`;

const CAPACITY_MATH_EXAMPLE_MD = `# A worked capacity example, with the arithmetic shown

This file walks through one complete pass of the calculation in
\`SKILL.md\`, using a single consistent scenario, so the real arithmetic
behind a capacity verdict is visible end to end rather than summarised.

## The stated inputs

- Headcount: five people on the team for this sprint.
- Hours available per person: eight hours per working day across a ten
  working day, two week sprint, so eighty hours per person before any
  subtraction.
- Stated non project time: twelve hours per person over the sprint, covering
  standup, one to ones and a shared support rotation, as stated by the team
  lead.
- Stated time off: one team member, Dana, has two days of approved leave
  during the sprint, worth sixteen hours.
- Real project estimates assigned to the team for the sprint: a checkout
  redesign at ninety six hours, an API migration at eighty four hours, a bug
  backlog at forty hours, an onboarding flow polish at sixty hours, and a
  client integration spike at seventy hours.

## Step one: available hours

Eighty hours per person minus twelve hours of stated non project time
leaves sixty eight hours per person. Five people at sixty eight hours each
gives three hundred and forty hours for the team. Subtracting Dana's
sixteen hours of approved leave brings the real available total to three
hundred and twenty four hours for the sprint.

## Step two: assigned hours

Ninety six plus eighty four is one hundred and eighty. Add the forty hour
bug backlog for two hundred and twenty. Add the sixty hour onboarding
polish for two hundred and eighty. Add the seventy hour client integration
spike for a total of three hundred and fifty hours assigned across the five
projects.

## Step three: the flagged gap

Three hundred and fifty assigned hours minus three hundred and twenty four
available hours leaves the team twenty six hours over capacity for the
sprint, close to eight percent above what the stated headcount and hours
actually support. That is the number a flag should cite: twenty six hours,
against a real available total of three hundred and twenty four, not a
general impression that the sprint looks heavy.

## What happens if one estimate is missing

Suppose the client integration spike had no stated hours at all. The
confirmed sum across the other four projects is two hundred and eighty
hours, which alone sits under the three hundred and twenty four available
and would not be flagged. The correct output in that case states the two
hundred and eighty hour confirmed sum, names the client integration spike
as the project with no estimate, and stops there rather than guessing a
figure for it and completing a verdict that number was never asked to
support.
`;

const meta: SkillMeta = {
  slug: "capacity-planning-sanity-check-skill",
  name: "Capacity Planning Sanity Check",
  title: "Capacity Planning Sanity Check Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks a team's real headcount and hours against its real list of project estimates, showing the exact arithmetic behind any overallocation instead of asserting an impression.",

  seo: {
    primaryKeyword: "capacity planning sanity check skill",
    keywords: [
      "capacity planning sanity check skill",
      "free ai skill for capacity planning",
      "downloadable team capacity planning checklist",
      "ai skill to check team overallocation",
      "team capacity math skill for ai assistants",
    ],
    seoTitle: "Capacity Planning Sanity Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable capacity planning sanity check skill that checks real headcount and hours against real project estimates, with the arithmetic shown.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/capacity-math-example.md", content: CAPACITY_MATH_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked whether a team's workload fits its capacity tend to assert that a plan looks overallocated, or looks fine, based on a general impression of how many projects are listed, without adding up the real stated hours on either side of the comparison. This skill's discipline forces an actual subtraction between calculated available hours and a real summed project total, and requires a named gap in stated numbers to stop the process rather than be filled with a guess.",
  },

  article: {
    intro: [
      "A capacity planning sanity check skill exists to stop a plan from being called realistic, or unrealistic, before anyone has actually done the arithmetic. Handed a team's real headcount, its real hours available per person, and a real list of project time estimates for the period, it calculates available hours and assigned hours as two separate sums, states the exact gap between them in hours and as a percentage, and refuses to proceed past a missing number by guessing one.",
      "It ships as two plain text files: a main instructions file that lays out the three step calculation, and a reference file that walks through one full worked example with every figure shown. Both are previewable in full on this page before you download the zip, and both are exactly what an AI assistant receives once the archive is handed over.",
      "The scenarios it is built for read like a sprint planning document: five people, a two week period, a stated support rotation eating into everyone's hours, and a list of project estimates someone wants approved. Before that plan gets signed off, this skill checks whether the real numbers on each side of the comparison actually add up the way the plan assumes.",
    ],
    sections: [
      {
        heading: "Why a plausible verdict is not the same as a checked one",
        body: [
          "Handed a list of five projects and a team of five people, a language model will often say a sprint looks heavy or looks fine, because that reads as a reasonable response to the shape of the request. It rarely stops to add the project estimates into a real total or subtract stated time off from a real available figure before saying so.",
          "This skill exists to interrupt that shortcut. A free ai skill for capacity planning is only worth downloading if it replaces the impression with a sum, so every verdict it produces has to trace back to a subtraction between two real totals, not a read of how full the list looks.",
        ],
      },
      {
        heading: "The three real inputs this skill requires before it calculates anything",
        body: [
          "Nothing gets calculated until four numbers are on the table: the team's real headcount, the real hours available per person for the period, any stated time off or non project time that reduces that figure, and the real list of project estimates assigned to the team over the same period.",
          "If one of those numbers is missing, the instructions require asking for it by name rather than filling it in with a typical figure. A standard forty hour week is not a substitute for a headcount and an hours figure someone actually stated for this specific team and this specific period.",
        ],
      },
      {
        heading: "How the real available hours are calculated",
        body: [
          "The calculation starts from headcount multiplied by hours available per person for the period, then subtracts every stated time off or non project figure one line at a time. Showing each subtraction separately, rather than folding them into one adjusted number, is what keeps the working checkable by whoever reads the output afterward.",
          "The result of that subtraction is the team's real available hours for the period, the number every project estimate gets weighed against in the next step.",
        ],
      },
      {
        heading: "How the real assigned hours are summed, and what a missing estimate does",
        body: [
          "Every project estimate on the real list gets added into a single total. An ai skill to check team overallocation is only as honest as the sum it produces, so the instructions require listing each project's contribution before stating the combined figure, rather than jumping straight to a total nobody can retrace.",
          "When one project on the list has no stated estimate, the skill does not assume zero and does not assume it matches the average of the others. It states the confirmed sum from the projects that do have numbers, names the specific project with no estimate, and stops short of a full verdict until that figure is supplied.",
        ],
      },
      {
        heading: "A worked example: five people, a two week sprint, and a specific overallocation",
        body: [
          "Take a team of five people on a two week sprint, eighty hours available per person before any subtraction. A stated twelve hours of non project time per person brings that to sixty eight hours each, three hundred and forty hours for the team. One team member's sixteen hours of approved leave brings the real available total to three hundred and twenty four hours.",
          "Five real project estimates for that sprint, ninety six, eighty four, forty, sixty and seventy hours, sum to three hundred and fifty hours assigned. Three hundred and fifty minus three hundred and twenty four leaves the team twenty six hours over capacity, close to eight percent above what the stated headcount and hours actually support, the exact figures a flag should cite.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not invent a headcount, an hours per person figure, a time off figure, or a project estimate that was not supplied, and it will not round a real total to a tidier looking number. As a downloadable team capacity planning checklist, its value is in the numbers it refuses to guess as much as the ones it adds up correctly.",
        ],
      },
    ],
    howTo: {
      name: "How to use the capacity planning sanity check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/capacity-math-example.md directly on this page before downloading, so the three step calculation and a full worked example are visible up front.",
        },
        {
          name: "Gather the four real inputs",
          text: "Collect the team's real headcount, its real hours available per person for the period, any stated time off or non project time, and the real list of project estimates before handing anything to an assistant.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply your real numbers as a team capacity math skill for ai assistants pass.",
        },
        {
          name: "Read the flagged gap, not just the verdict",
          text: "Check that the output shows the available hours subtraction and the assigned hours sum in full, and that any missing project estimate is named rather than silently assumed.",
        },
      ],
    },
    faq: [
      {
        question: "What real numbers does this skill need before it will run?",
        answer:
          "It needs the team's real headcount, the real hours available per person for the period, any stated time off or non project time that reduces that figure, and the real list of project time estimates assigned to the team over the same period. Missing any one of the four means asking for it rather than guessing.",
      },
      {
        question: "What happens if one project's time estimate is missing?",
        answer:
          "The skill states the confirmed sum from the projects that do have numbers, names the specific project with no stated estimate, and stops short of a full overallocation verdict until that figure is supplied, rather than assuming zero or an average figure for the gap.",
      },
      {
        question: "Does the skill just say whether a team looks overallocated?",
        answer:
          "No. Every output shows the available hours calculation and the assigned hours sum as separate, checkable totals, then states the exact gap between them in hours and as a percentage. A conclusion without the subtraction next to it is exactly what this skill's instructions forbid.",
      },
      {
        question: "Can this skill be used for a monthly plan instead of a two week sprint?",
        answer:
          "Yes, the same three step calculation applies to any stated period, a week, a sprint, or a month, as long as the real hours available per person and the real project estimates cover that same period. The worked example uses a two week sprint only because it is easy to check by hand.",
      },
      {
        question: "Will it round the numbers to make the output look tidier?",
        answer:
          "No. The instructions explicitly forbid rounding the available or assigned totals to a cleaner looking figure than the real arithmetic produced, because a rounded number can hide exactly the small overallocation a flag exists to catch.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the team numbers you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description: "For deciding what to cut once this skill has flagged a real overallocation, rather than which projects were assigned in the first place.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description: "A natural source of the real project list this skill checks against a team's stated available hours.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description: "For finding the real non project time an individual's calendar is actually losing, before it becomes a stated subtraction in this skill's available hours figure.",
      },
      {
        href: "/tools/working-days-calculator",
        label: "working days calculator",
        description: "For counting the real working days in a stated period before multiplying by hours per day to reach the raw available hours figure.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.atlassian.com/work-management/project-management/resource-planning/capacity-planning",
        label: "Atlassian: What Is Capacity Planning",
        description: "A practitioner guide to weighing a team's real available hours against assigned work, the same comparison this skill's arithmetic performs.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Capacity_planning",
        label: "Wikipedia: Capacity planning",
        description: "A general reference definition of capacity planning as balancing organisational resources against demand, the concept this skill applies at the level of a single team's stated hours.",
      },
      {
        href: "https://toggl.com/blog/calculate-resource-capacity",
        label: "Toggl Track: How To Calculate Resource Capacity",
        description: "An independent worked example subtracting time off and planned workload from total available hours, the same style of visible subtraction this skill requires.",
      },
      {
        href: "https://www.projectmanager.com/blog/capacity-planning",
        label: "ProjectManager: Capacity Planning",
        description: "Background on tracking real resource availability against assigned hours over a stated period, the comparison this skill's three step calculation is built around.",
      },
    ],
  },

  tags: ["productivity", "capacity planning", "team workload", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
