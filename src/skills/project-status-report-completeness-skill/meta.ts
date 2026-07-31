import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Project Status Report Completeness Check

Use this skill whenever you are given a real, already written project status report, the
kind sent to stakeholders on a schedule, and asked to check whether it actually says
enough for a reader to act on. This skill does not write the report and does not decide
whether the project itself is healthy. Its only job is to check four required fields
against what the report's own words actually say, quote the exact text behind each
verdict, and refuse to invent content a field is missing.

## Required input

You need the actual written report text, word for word, not a summary of it and not a
description of what the report is generally about. If you are handed a summary instead
("the update covered progress, one blocker, and next steps"), ask for the original text.
A summary has already made the judgement calls this skill exists to make independently,
so checking a summary checks nothing.

## The four required fields

Every report gets checked against exactly these four fields, in this order:

1. **Real progress since the last report.** What specifically moved, changed, shipped,
   or was decided since the previous update. Not a mood ("on track"), a state word
   ("progressing"), or a bare percentage with nothing behind it.
2. **Real named blockers, or an explicit "none."** Either a specific thing stopping
   work, named plainly enough that a reader could act on it, or an explicit statement
   that there are no blockers right now. Silence on blockers is not the same as none.
3. **Real next steps with a named owner.** A specific action, and the specific person
   or role doing it. An action with no owner is a wish, not a plan.
4. **A real risk or confidence signal.** A stated level of confidence in the current
   plan, timeline, or outcome, or a specific named risk that could change it. A general
   feeling of optimism or worry with nothing behind it does not count.

## The three states, and how to decide between them

For each of the four fields, quote the exact sentence or clause from the report that
addresses it, then classify it as exactly one of three states.

- **PRESENT-WITH-CONTENT.** The field is addressed with something specific and
  checkable: a named deliverable, a number, a named person, a named risk, a stated
  confidence level with a reason behind it. A reader could act on this or verify it
  later.
- **PRESENT-BUT-FILLER.** The field has words under its heading or in its place, but
  nothing checkable. Watch for stock phrases that sound like content but commit to
  nothing: "making progress," "on track," "moving forward," "no major issues," "feeling
  good about this one," "should be fine." A sentence that would be equally true of any
  project in any state is filler.
- **MISSING.** The field is not addressed anywhere in the report. There is no heading,
  no sentence, no mention, not even a filler one.

Quote the exact words for PRESENT-WITH-CONTENT and PRESENT-BUT-FILLER. For MISSING,
state plainly that the field does not appear anywhere in the text, rather than guessing
at why.

## What this skill refuses to do

It never fills a MISSING or PRESENT-BUT-FILLER field with a plausible guess about what
the real progress, blocker, or next step probably was. A report that never mentions
blockers stays flagged MISSING, not quietly assumed to mean there were none, because
"none" has to be stated, not inferred from silence. A report that says "making good
progress" stays flagged PRESENT-BUT-FILLER, not upgraded to PRESENT-WITH-CONTENT because
the surrounding report reads as though the writer probably meant something specific. If
the actual content was never written down, this skill's job is to say so, not to write it
on the report's behalf.

## Producing the check output

For each of the four fields, in order, report: the field name, the verdict
(PRESENT-WITH-CONTENT, PRESENT-BUT-FILLER, or MISSING), and the exact quoted text behind
that verdict, or a plain statement that nothing addresses it. Close with a one line
summary counting how many of the four fields landed in each state. Do not soften a
PRESENT-BUT-FILLER or MISSING verdict into an assumption that the missing content
probably exists somewhere the reader has not been told about.

## Using the worked example

See \`reference/worked-example.md\` for a full, real-looking status report run through
this check: two fields land PRESENT-WITH-CONTENT, one lands PRESENT-BUT-FILLER, and one
lands MISSING, each with the exact text quoted and the reasoning behind the verdict shown
in full.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking one status report's four fields

Use this alongside \`SKILL.md\`. The report below is the kind of real, already written
status update this skill checks. Nothing in it was invented by the skill; every verdict
traces back to the exact words quoted from the report.

## The report as given

Subject: Weekly Status Update, Customer Portal Redesign, week of August 3

Progress since last report: Really solid week for the team, we're making good progress
and things are moving in the right direction.

Next steps: Finish the accessibility audit on the new checkout flow and file any WCAG
issues found, owned by the design systems lead, target Friday August 7.

Confidence for the August 15 launch date: Medium. The main risk is that the payments
vendor has not yet confirmed a test environment slot for us. If that slot isn't confirmed
by August 4, the launch date is at risk of slipping by one to two weeks.

## Field one: progress since last report

Quoted text: "Really solid week for the team, we're making good progress and things are
moving in the right direction."

Verdict: PRESENT-BUT-FILLER. The sentence has words under the progress heading, but
nothing in it is checkable. "Solid week," "good progress," and "moving in the right
direction" would all still be true whether the team shipped three features or shipped
nothing at all. Nothing here names what changed, what was decided, or what a reader could
go verify. This is exactly the "on track" pattern the field definition calls out: a mood
report standing in for a progress report.

## Field two: blockers

Quoted text: none. The report has no heading, sentence, or mention of blockers anywhere
in its text, not even a line stating there are none.

Verdict: MISSING. Silence on blockers is not the same as an explicit "no blockers this
week," and this skill does not assume the absence of a blockers section means the project
has none. The correct fix is asking the report's author whether there truly are no
blockers, in which case that should be stated outright, or whether something is being
left out.

## Field three: next steps with a named owner

Quoted text: "Finish the accessibility audit on the new checkout flow and file any WCAG
issues found, owned by the design systems lead, target Friday August 7."

Verdict: PRESENT-WITH-CONTENT. The action is specific (finish the audit, file any issues
found), it has a named owner (the design systems lead), and it has a date (Friday August
7). A reader could check back on August 7 and know exactly what should exist.

## Field four: risk or confidence signal

Quoted text: "Confidence for the August 15 launch date: Medium. The main risk is that the
payments vendor has not yet confirmed a test environment slot for us. If that slot isn't
confirmed by August 4, the launch date is at risk of slipping by one to two weeks."

Verdict: PRESENT-WITH-CONTENT. This names a stated confidence level (medium), a specific
named risk (the vendor's unconfirmed test environment slot), and the concrete consequence
if the risk is not resolved by a stated date. A reader knows exactly what to watch for and
by when.

## Summary line

Two fields PRESENT-WITH-CONTENT (next steps, risk and confidence), one field
PRESENT-BUT-FILLER (progress), one field MISSING (blockers). The report is not rejected
outright; it is handed back with the exact gap named, so the two weak fields can be
rewritten with the same specificity already present in the other two.
`;

const meta: SkillMeta = {
  slug: "project-status-report-completeness-skill",
  name: "Project Status Report Completeness Check",
  title: "Project Status Report Completeness Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks a real, already written project status report against four required fields, real progress, named blockers, owned next steps and a risk or confidence signal, quoting the exact text behind each verdict and never inventing content a field is missing.",

  seo: {
    primaryKeyword: "project status report completeness skill",
    keywords: [
      "project status report completeness skill",
      "free ai skill to check status report completeness",
      "downloadable status report completeness checklist",
      "ai skill to check a status report for missing fields",
      "status report completeness checker for ai assistant",
    ],
    seoTitle: "Project Status Report Completeness Skill: Free Download",
    seoDescription:
      "A free, downloadable project status report completeness skill that checks a written update for real progress, named blockers, owned next steps and a risk signal.",
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
      "Models asked to check a status report for completeness reliably accept a phrase like on track or making good progress as satisfying the progress field, because it sits under the right heading in the right place, without checking whether it names anything a reader could verify later. This skill requires every one of the four fields to be quoted exactly and classified as present with content, present but filler, or missing, and it forbids filling a filler or missing field with a plausible guess about what the real progress, blocker, or next step probably was.",
  },

  article: {
    intro: [
      "A project status report completeness skill only earns its name if it checks what a report's own words actually say, not whether the right headings sit above the right paragraphs. Handed a report that says the team is making good progress, most AI assistants accept that sentence as a progress update and move on, because it sits in the right place and sounds like content. This skill treats that sentence as a claim to test, not a fact to accept.",
      "It checks four required fields every time: real progress since the last report, real named blockers or an explicit none, real next steps with a named owner, and a real risk or confidence signal. Each gets classified present with content, present but filler, or missing, with the exact text quoted behind the verdict, and a filler or missing field stays flagged rather than quietly filled in.",
      "It ships as two plain text files, a main instructions file with the four field checklist and a worked example reference file applying it to one full report, both previewable here before you download the zip.",
    ],

    sections: [
      {
        heading: "Why on track is not the same claim as progress",
        body: [
          "On track, making progress, and moving forward are structurally identical sentences: each would be equally true of a project that shipped three deliverables this week and one that shipped nothing at all. None of them name what changed or what a reader could go verify. A free ai skill to check status report completeness that stops at confirming a progress heading is present has not actually checked anything; the words inside the heading are what get tested, not the heading itself.",
        ],
      },
      {
        heading: "The four fields this skill checks, in order, every time",
        body: [
          "Real progress since the last report, real named blockers or an explicit none, real next steps with a named owner, and a real risk or confidence signal. The order is fixed so nothing gets skipped when one section is unusually detailed and draws attention away from a thinner one next to it. Each field answers a question a stakeholder needs answered: what changed, what is stopping it, who is doing what next, and how worried should I be. A report can read as well written in three of the four fields and still leave a reader unable to act, which is exactly the gap this downloadable status report completeness checklist is built to catch.",
        ],
      },
      {
        heading: "Three states, and the line between them",
        body: [
          "Present with content means the field names something specific and checkable: a shipped deliverable, a number, a named blocker, a named owner and date, a stated confidence level with a reason. Present but filler means words occupy the field's place but commit to nothing verifiable, stock phrases like no major issues that would be true of almost any project in almost any state. Missing means the field is not addressed anywhere in the text, not even with a filler sentence, and never mentioning blockers is not the same defect as explicitly saying no blockers this week.",
        ],
      },
      {
        heading: "Why an unstated blocker field stays missing instead of becoming none",
        body: [
          "Silence is not the same claim as an explicit none, and this skill will not treat the absence of a blockers section as evidence that no blockers exist. A report that skips the field entirely gets marked missing, and the honest next step is asking the author directly whether there truly are no blockers or something was left out, never assuming the friendlier interpretation. Used as an ai skill to check a status report for missing fields, this refusal to fill silence with an assumption is the entire point.",
        ],
      },
      {
        heading: "How this differs from a weekly review, a RACI audit, and a dashboard metric check",
        body: [
          "The weekly review structure skill on this site checks a personal weekly review against commitments the same person stated the week before, a different artifact and audience than a status report written for stakeholders. This project status report completeness skill has no prior commitments input at all; it checks whether one report, on its own, states four specific things clearly. The stakeholder RACI audit skill checks whether role assignments on a matrix are structurally sound, a question about who is assigned to what, not whether a report's prose says anything, and the dashboard metric relevance skill checks whether a dashboard's metrics map to a real decision, not the four narrative fields a written report covers. All three catch genuinely different failures.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not write the status report itself, and it will not decide whether the project described is actually healthy; both require context it was never given. It will not upgrade a filler sentence to present with content because the rest of the report reads as competent, and it will not invent the specific progress, blocker, or next step a field failed to state.",
        ],
      },
      {
        heading: "Worked example: two present, one filler, one missing",
        body: [
          "The reference file runs the full check against one report for a customer portal redesign project. The progress line, really solid week, making good progress, is flagged present but filler, since nothing in it names what actually happened. The blockers field is flagged missing outright, since the report never mentions blockers. Next steps and the risk and confidence line both land present with content, each with a named owner, a date, or a named risk quoted from the text. Used as a status report completeness checker for ai assistant workflows, the worked example shows what separates a passing field from one that only looks like it does.",
        ],
      },
    ],

    howTo: {
      name: "How to use the project status report completeness skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md on this page before downloading, so you know what you are handing to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real, written report text",
          text: "Collect the actual status report as written or sent, word for word, rather than a summary of what it generally covered.",
        },
        {
          name: "Run the four field check and require exact quotes",
          text: "Hand both files and the report text to your assistant, and ask for each field quoted and classified before accepting the result.",
        },
      ],
    },

    faq: [
      {
        question: "What happens if a report just says the project is on track and nothing else?",
        answer:
          "The progress field is marked present but filler, since on track is a mood word with nothing checkable behind it. The skill quotes the exact sentence so the gap is visible, and does not accept the phrase or invent what the real progress probably was.",
      },
      {
        question: "What if a project genuinely has no blockers this week?",
        answer:
          "That counts as present with content, as long as the report states it explicitly, for example no blockers this week. The blockers field is only flagged missing when the report says nothing about blockers at all, since silence and an explicit none are different claims.",
      },
      {
        question: "How is this different from the weekly review structure skill on this site?",
        answer:
          "The weekly review structure skill checks a personal weekly review against commitments the same person stated the week before, a different artifact for a different audience. This skill has no prior commitments input; it checks whether one stakeholder facing status report states four specific things clearly.",
      },
      {
        question: "Can this skill write the status report for me instead of just checking one?",
        answer:
          "No, and its instructions rule that out. It only checks a report that already exists, quoting the exact text behind each field verdict. Drafting a new report from raw events is a separate task for a prompt, not this completeness check.",
      },
      {
        question: "What if next steps are listed but nobody is named as the owner?",
        answer:
          "That field is marked present but filler, since an action with no named person or role attached is closer to a wish than a plan. The skill quotes the next steps text so the missing owner is visible, rather than assuming one the report never named.",
      },
      {
        question: "Is anything about my report uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the report you run through the skill is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description: "For drafting a new status report from raw events in the first place, rather than checking the completeness of one that already exists.",
      },
      {
        href: "/skills/productivity-skills/weekly-review-structure-skill",
        label: "weekly review structure skill",
        description: "Checks a personal weekly review against commitments stated the week before, a different artifact and audience from a stakeholder facing status report.",
      },
      {
        href: "/skills/business-skills/stakeholder-raci-audit-skill",
        label: "stakeholder raci audit skill",
        description: "Checks whether role assignments on a matrix are structurally sound, a question about who is assigned to what rather than what a report's prose actually says.",
      },
      {
        href: "/skills/productivity-skills/project-status-color-consistency-skill",
        label: "project status color consistency skill",
        description: "Checks whether an assigned red, amber or green rating matches a team's own stated definition, a different question from whether the report's four fields are filled in with real content.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.pmi.org/learning/library/anatomy-highly-effective-status-report-2198",
        label: "PMI: Anatomy of an effective status report",
        description: "A project management professional body's breakdown of the sections a status report needs to actually inform its readers.",
      },
      {
        href: "https://asana.com/resources/how-project-status-reports",
        label: "Asana: How Project Status Reports Work",
        description: "An independent walkthrough of the sections, including blockers and next steps, that a working status report format is expected to cover.",
      },
      {
        href: "https://www.atlassian.com/agile/project-management/status-report",
        label: "Atlassian: Project Status Report Tips and Templates",
        description: "Practical guidance on structuring a status report so stakeholders can act on it rather than merely read it.",
      },
      {
        href: "https://www.range.co/blog/how-to-write-a-great-status-update",
        label: "Range: How to Write a Great Status Update",
        description: "Explains why a vague update like making good progress erodes trust and what a specific, checkable update looks like instead.",
      },
    ],
  },

  tags: ["productivity", "status reports", "completeness check", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
