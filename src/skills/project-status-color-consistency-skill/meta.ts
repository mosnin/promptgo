import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Project Status Color Consistency Check

Use this skill when asked to check, audit or sanity check a red, amber or
green rating (or red, yellow, green, whatever three or four word labels a
given team uses) that has already been assigned to a project, workstream or
milestone. This skill does not write the status update and does not invent
what the color should mean. Its only job is to check whether the color that
was assigned actually matches what the team's own stated definition of that
color produces, given the real facts reported about the project.

## Before you check anything

Require two separate inputs and do not proceed without both.

1. **The team's real, stated status definitions.** The exact wording of what
   red means for this team, what yellow or amber means, what green means.
   This has to be the actual definition the team says it uses, not a generic
   industry standard, not something inferred from the project's history, and
   never something invented because none was supplied. If no stated
   definition exists, say so plainly rather than proceeding as though one
   had been given, and offer to help the team draft one from examples of
   colors they have already assigned.
2. **The project's real, current facts as reported.** Schedule variance in
   days, whether each blocker has a named owner, whether a mitigation plan
   exists, dependency status, or whatever specific facts the team's own
   definition actually references. Do not invent a fact, do not round a
   fact toward the color that was assigned, and do not assume a fact that
   was never stated.

## Checking one assigned color against its stated definition

For the color a project was given, work through four steps in order.

1. Quote the exact clause of the stated definition for that color.
2. List the real facts relevant to that clause, and only those facts.
3. Determine which color the definition, applied literally to those facts,
   actually produces.
4. State plainly whether the assigned color matches the color the
   definition produces from the facts.

When the assigned color and the derived color differ, that is a mismatch.
Flag it, quote the clause, restate the facts, and say which color they
actually point to instead of the one that was assigned. Do not soften a
mismatch into a reasonable judgement call or round it toward the more
flattering rating. A status system that tolerates rounding toward green is
exactly the failure this skill exists to catch.

## Checking consistency across more than one report from the same team

When given two or more status reports from the same team, for example a
June report and a July report, do not check each one only against its own
stated definition in isolation. Compare the stated definitions themselves.

If the wording is identical across reports, check whether it was applied
the same way to similar facts each time. If the wording changed, flag that
explicitly, regardless of whether either single report looks internally
consistent on its own. State exactly what changed, and whether the change
was ever communicated as a deliberate decision rather than something only
visible from comparing the two documents side by side.

A team is not entitled to silently redefine what yellow means between one
report and the next. A quietly shifted definition is the same defect as a
single mismatched rating; it just spans multiple reports instead of one.

## What counts as a real, stated definition

A real definition names the specific, checkable facts that separate one
color from another: a number of days of variance, whether a blocker has a
named owner, whether a mitigation plan is documented and dated. A
definition that only says something like "red means serious concern" is
not checkable and should be flagged as unusable until the team makes it
concrete. See \`reference/status-definition-worked-example.md\` for the
exact format to ask a team for, and a full worked example of the two kinds
of check above applied to one project across two reports.

## What this skill refuses to do

It does not invent a defensible sounding status standard when the team has
not stated its own. It does not decide what yellow should mean for a team;
that is the team's judgement call to make once, explicitly, and then hold
itself to across every report. It does not write the update itself, and it
does not accept a project's assigned color at face value just because a
number appears next to it.
`;

const WORKED_EXAMPLE_MD = `# Status definition format and a worked example

Use this alongside \`SKILL.md\`. It gives the format to ask a team for when
requesting their real, stated status definitions, then walks through one
worked example: stated definitions, real project facts, a mismatch flagged
between the assigned color and what the definition implies, and a second
mismatch flagged across two reports from the same team.

## The definition format to request

Ask the team to state each color as a checkable condition, not a feeling.
A usable definition names the specific facts it depends on.

- **Red**: state the exact threshold, for example more than ten working
  days behind the committed date, or blocked with no named owner for more
  than five working days.
- **Yellow or amber**: state the exact threshold and what removes the
  color, for example a variance of three to ten working days but with a
  named owner and a documented, dated mitigation plan expected to close
  the gap.
- **Green**: state the exact threshold, for example on or within two
  working days of the committed date, with no open blocker lacking a named
  owner.

If a team cannot produce wording this specific, that absence is itself the
finding: their ratings cannot yet be checked for consistency because
nothing concrete has been stated to check them against.

## Worked example: the June report

Stated definitions for Team Atlas, as given directly by the team:

- Red: more than ten working days behind the committed milestone date, or
  a blocker with no named owner for more than five working days.
- Yellow: three to ten working days behind, with a named owner and a
  documented mitigation plan.
- Green: within two working days of the committed date, no open blocker
  without a named owner.

Real facts reported for the June update on the vendor integration
milestone: the milestone is twelve working days behind the committed date.
The blocking issue is a delayed vendor API, and no owner has been named
for chasing the vendor.

Assigned color in the June report: yellow.

Applying the check: the twelve day variance exceeds the ten day threshold
in the red clause, and the blocker has no named owner, which independently
also satisfies the red clause. The definition, applied literally to the
stated facts, produces red. The assigned color was yellow. This is a
mismatch, and it should be flagged with the exact clause, the two facts
that trigger it, and a note that yellow was likely chosen because a
mitigation conversation was underway, which is not a documented plan with
a named owner.

## Worked example: the July report and the second mismatch

The July report covers the same milestone, now eight working days behind
the committed date, with a named owner and a documented mitigation plan in
place. Assigned color: yellow.

Checked only against the definitions text printed in the July report, this
looks correct: eight days is inside the three to ten day band, and both
the owner and the plan conditions are met. But the July report's printed
yellow definition reads "three to fifteen working days behind, with a
named owner and a documented mitigation plan," not the three to ten day
band stated in June.

This is the second kind of mismatch. The team's stated definition of
yellow changed between June and July without anyone stating that it had
changed. Even though the July rating matches the July wording, the July
wording itself is a silent departure from what the team said yellow meant
one month earlier, and it should be flagged on that basis, separately from
whether any single report's arithmetic checks out.

## How to report both kinds of finding together

Present the single report mismatch and the cross report definition drift
as two distinct findings, each with its own quoted clause, its own facts,
and its own explanation. Do not merge them into one vague note that
something about the status reporting looks inconsistent. A team acting on
this needs to know separately whether a specific rating was wrong given
its own rules, and whether the rules themselves moved without being told.
`;

const meta: SkillMeta = {
  slug: "project-status-color-consistency-skill",
  name: "Project Status Color Consistency Check",
  title: "Project Status Color Consistency Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks a project's assigned red, amber or green rating against the team's own real, stated definitions and the project's actual facts, and flags when a team has quietly redefined a color between reports.",

  seo: {
    primaryKeyword: "project status color consistency skill",
    keywords: [
      "project status color consistency skill",
      "free ai skill for status color consistency",
      "downloadable rag status definition checklist",
      "ai skill to check project status ratings",
      "consistent status definitions guide for ai assistant",
    ],
    seoTitle: "Project Status Color Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable project status color consistency skill that checks a red, amber or green rating against a team's own stated, real status definitions.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    {
      path: "reference/status-definition-worked-example.md",
      content: WORKED_EXAMPLE_MD,
      kind: "markdown",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a status report reliably accept whatever color a project was already given at face value, treating the assigned red, amber or green as settled input rather than a claim to check. This skill's instructions force every rating to be re-derived from the team's own stated definition applied to the project's actual reported facts, and require flagging it when the same team's stated definition of a color has silently changed between one report and the next.",
  },

  article: {
    intro: [
      "A project status color consistency skill only earns its name if it checks the rating rather than trusting it. Handed a report that calls a slipping milestone yellow, most AI assistants accept that label and move on, because a color next to a project name reads like a settled fact rather than a claim made using rules nobody wrote down.",
      "This skill treats the color as exactly that, a claim. It requires the team's own real, stated definition of red, yellow and green, requires the project's actual reported facts, and checks whether the definition applied literally to those facts produces the color that was assigned. It also compares a team's stated definitions across reports, since a color can be redefined silently between updates just as easily as it can be misapplied within one. It ships as two plain text files, both previewable here before download.",
    ],
    sections: [
      {
        heading: "Why a stated color meaning has to exist before a rating can be checked",
        body: [
          "A color rating cannot be verified against a definition that does not exist. The skill's first instruction is to require the team's real, stated status definitions before checking a single rating, and to say so plainly when none has been supplied rather than inventing a plausible standard to check against instead. The same discipline applies to the project's facts: schedule variance, blocker ownership and mitigation plan status have to be the real, reported figures, not a rounded version of them. A free ai skill for status color consistency is only useful if both halves of the comparison are real inputs, not assumptions.",
        ],
      },
      {
        heading: "How a single rating gets checked against its own definition",
        body: [
          "Given one assigned color, the skill quotes the exact clause of the stated definition for that color, lists the facts relevant to that clause, and works out which color the definition actually produces when applied literally. It then states plainly whether the assigned color matches that result. A mismatch is never softened into a judgement call; if the definition's threshold points to red and the report says yellow, that gap gets named, quoted and explained rather than waved away. This is the core of an ai skill to check project status ratings rather than merely restate them.",
        ],
      },
      {
        heading: "Catching a definition that quietly changed between reports",
        body: [
          "A single report can be internally consistent, arithmetic and all, and still be wrong in a way that only shows up beside a previous one. The skill compares the stated definitions text across reports from the same team, not just the ratings, and flags any change in wording even when the current report's own math checks out against its own printed rule. A team is not entitled to silently move what yellow means between June and July. If the change was deliberate it should have been said; if not, the drift itself is the finding, separate from whether any rating matched the wording printed at the time.",
        ],
      },
      {
        heading: "A worked example: a slip, a missing owner, and a mismatched yellow",
        body: [
          "Team Atlas states red means more than ten working days behind the committed date or a blocker with no named owner for more than five working days, and yellow means three to ten days behind with a named owner and a documented mitigation plan. Their June report shows a milestone twelve working days behind, blocked on a vendor delay with nobody named to chase it, rated yellow. Twelve days exceeds the red threshold, and the blocker has no named owner, either fact alone producing red under the team's own words. The assigned yellow does not match what the definition produces from the facts. A second mismatch, found by comparing June's and July's printed definitions, is worked through in the reference file.",
        ],
      },
      {
        heading: "Not the project status update prompt: checking the rating instead of writing it",
        body: [
          "The project status update prompt on this site drafts a new status report from raw events: it builds the variance table, forces a proof point behind every green, and routes bad news to the right reader. This skill starts one step later, after a color has already been assigned, and checks whether it was derived consistently from the team's own real definition and facts rather than chosen on a gut feeling. A team can use the prompt to draft this week's update and this skill to audit last week's.",
        ],
      },
      {
        heading: "What counts as a real, stated definition, and what this skill refuses to do",
        body: [
          "A usable definition names checkable facts: a number of days, an ownership condition, a documented plan, not a feeling like serious concern or minor risk. A downloadable rag status definition checklist is only worth using if the definitions it checks against are this specific, so vague wording gets flagged as unusable until a team makes it concrete. This skill never invents what a color should mean for a team, never decides that judgement on the team's behalf, and never writes the update itself. Handed to an assistant alongside a team's real wording, it works as a consistent status definitions guide for ai assistant use, and it never accepts an assigned color at face value.",
        ],
      },
    ],
    howTo: {
      name: "How to use the project status color consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/status-definition-worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the team's real definitions and the project's real facts",
          text: "Collect the team's own stated wording for red, yellow and green, and the actual reported facts: schedule variance, blocker ownership, mitigation plan status, for the project being checked.",
        },
        {
          name: "Run the check across every report you have",
          text: "Hand both files, the stated definitions and the real facts, to your assistant. If checking multiple reports from the same team, also supply each report's printed definitions so drift between them can be caught.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if the team has never written down what red or yellow means?",
        answer:
          "The skill says so explicitly rather than inventing a plausible sounding standard to check against. It offers to help draft a checkable definition from examples of colors the team has already assigned, and labels that draft clearly as a starting point rather than a confirmed rule.",
      },
      {
        question: "Can this skill decide what yellow should mean for our team?",
        answer:
          "No. Deciding what a color means is a judgement call the team has to make once and hold itself to across every report. This skill only checks whether a color already assigned matches whatever definition the team itself has stated, not what that definition ought to be.",
      },
      {
        question: "How is this different from the project status update prompt on this site?",
        answer:
          "The project status update prompt drafts a new report from raw events, including its own green requires proof rule. This is a project status color consistency skill, not a report drafting prompt: it runs after a color has already been assigned, and checks that assignment against the team's real, stated definition and the real facts.",
      },
      {
        question: "Does it work with red, amber, green as well as red, yellow, green?",
        answer:
          "Yes. The instructions refer to the labels generically as a team's status colors, whichever set of words a given team actually uses, and the check applies the same way regardless of which specific words sit above red on the scale.",
      },
      {
        question: "What if the definitions text is identical across two reports but the color was still applied differently?",
        answer:
          "That is checked as the single rating case rather than the cross report drift case. Each report's assigned color is checked against the shared definition applied to that report's own facts, and any report where the derived color does not match the assigned one is flagged on its own terms.",
      },
      {
        question: "Is anything about our project data uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, with no server call behind either action. Nothing about the status definitions or project facts you use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description:
          "For drafting a new status report from raw events, including its own proof requirement for green, rather than auditing a color someone already assigned.",
      },
      {
        href: "/productivity-prompts/decision-log-prompt",
        label: "decision log prompt",
        description:
          "Shares the same discipline of naming a stated rule and a real fact rather than accepting a vague summary at face value.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "Once a status color has been checked and corrected, the next step is deciding what gets worked on given the real picture.",
      },
      {
        href: "/business-skills/risk-register-maintenance-skill",
        label: "risk register maintenance skill",
        description:
          "A sibling skill that checks another operational record, a risk register, against a stated cadence rather than accepting stale entries at face value.",
      },
    ],
    externalLinks: [
      {
        href: "https://en.wikipedia.org/wiki/Traffic_light_rating_system",
        label: "Wikipedia: Traffic light rating system",
        description:
          "An independent overview of red, amber, green status reporting and why the meaning behind each color has to be defined rather than assumed.",
      },
      {
        href: "https://www.apm.org.uk/resources/what-is-project-management/what-is-project-governance/",
        label: "Association for Project Management: what is project governance",
        description:
          "A professional body's explanation of how governance structures depend on status reporting that genuinely informs sponsors, not just a color that looks reassuring.",
      },
      {
        href: "https://www.gov.uk/service-manual/agile-delivery/measuring-reporting-progress",
        label: "GOV.UK Service Manual: measuring and reporting progress",
        description:
          "Public sector guidance on reporting progress consistently across teams, the same discipline this skill applies to a single team's own color definitions over time.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description:
          "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to a status definition.",
      },
    ],
  },

  tags: ["productivity", "status reporting", "project management", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
