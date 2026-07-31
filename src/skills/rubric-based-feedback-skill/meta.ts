import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Rubric Based Feedback

Use this skill whenever you are asked to give feedback on a piece of student work and a
grading rubric exists, or should exist, for the task at hand.

## Before you give any feedback

Ask for, or locate, the actual rubric: the specific criteria the work is being judged
against, and what each performance level looks like for every one of those criteria. A
rubric is not just a list of names like Argument, Evidence and Structure. Each name needs a
description of what a strong, a middling and a weak response looks like on that dimension,
ideally quoted in the teacher's own wording.

If only a topic or an assignment brief is supplied, and no rubric, say so plainly and ask
for one rather than inventing plausible sounding criteria. A model asked to grade an essay
with no rubric will readily produce categories like Clarity, Organisation and Insight that
sound reasonable and were never asked for by anyone. Do not do this. If the person genuinely
has no rubric and wants one built, say that building a rubric is a separate job from
marking against one, and point them toward doing that first.

If the rubric names criteria but does not describe performance levels for each one, ask
for those descriptions before marking. A criterion called Evidence with no description of
what strong evidence looks like cannot be judged consistently, and guessing at what the
teacher meant turns a real rubric into an invented one.

## Giving feedback once you have a real rubric

Work through the rubric one criterion at a time, in the order it was given. For every
criterion, follow \`reference/feedback-format.md\` exactly:

1. Name the criterion exactly as it appears in the rubric. Do not rename, merge or split it.
2. Quote the specific sentence, paragraph or line from the student's work that justifies
   the judgement. If nothing in the work addresses this criterion at all, say so directly
   instead of inferring intent from what is missing.
3. State which performance level the quoted evidence meets, using the rubric's own level
   names or descriptions, never a private scale invented on the spot.
4. Give exactly one specific, actionable improvement suggestion tied to that criterion,
   phrased as something the student could actually do to move up a level.

Do not add a fifth criterion of your own. Do not average the criteria into a single overall
score unless the rubric itself defines how to combine them; report by criterion and let the
person applying the rubric decide how the levels combine into a grade.

## What this skill refuses to do

It will not produce an overall comment such as good job, needs work, or shows promise that
is not tied to a specific rubric criterion and a specific piece of evidence. Every judgement
in the output must trace to one named criterion and one quoted piece of the student's
actual work. A comment that could be pasted onto a different student's different piece of
work without editing has failed this test and must be rewritten or removed before the
feedback is returned.

It will not invent rubric criteria that were not supplied, even when the work clearly has
other strengths or weaknesses outside the stated rubric. If something outside the rubric
seems worth mentioning, it goes in a separate note at the end, labelled as outside the
rubric, never mixed into the criterion by criterion feedback as though it were part of the
graded standard.

## When the work does not address a criterion

Say this plainly rather than inventing evidence to fill the gap. The correct output for a
criterion with no supporting evidence in the work is a statement that nothing in the
submission addresses it, paired with the lowest performance level the rubric defines, not
a generous guess at what the student probably meant to write.

## Handling multiple students against the same rubric

When several pieces of work are marked against one rubric in the same session, keep every
criterion block independent per student. Do not let a strong first submission set an
informal bar that later, unrelated submissions are compared against instead of the rubric
itself. Each student's evidence is judged only against the rubric's stated performance
levels.
`;

const FEEDBACK_FORMAT_MD = `# Feedback format: criterion, evidence, level, next step

Use this structure for every criterion in the rubric, in the order the rubric lists them.
Repeat the four part block once per criterion. Do not summarise multiple criteria into one
paragraph, and do not skip a criterion because the work says nothing relevant to it.

## The four part block

Criterion: the exact name from the rubric, unedited.

Evidence: a direct quotation from the student's work, or a precise description of its
location if quoting is impractical, for example "the second paragraph of the introduction."
If no evidence exists in the work for this criterion, write that plainly instead of
quoting something unrelated to make the block look complete.

Performance level: the level name or description from the rubric that the evidence meets,
written in the rubric's own wording, not a numeric score invented on the spot.

Next step: one sentence, specific enough that the student could begin acting on it within a
few minutes, tied to what would move the work up one level on this exact criterion.

## Worked example

Rubric criterion supplied by the teacher: "Use of evidence. Exceeds expectations cites at
least two sources and explains how each supports the claim. Meets expectations cites at
least one source. Below expectations makes claims with no cited source."

Student's paragraph: "Renewable energy is clearly the better choice for most countries
because it is cheaper in the long run and better for the environment."

Criterion: Use of evidence.

Evidence: "Renewable energy is clearly the better choice for most countries because it is
cheaper in the long run and better for the environment." No source is cited for either the
cost claim or the environmental claim.

Performance level: Below expectations. The paragraph makes two claims and cites no source
for either one.

Next step: Add one cited source for the cost claim, for example a comparison of levelised
energy cost between renewable and fossil generation, and state in one sentence how that
source supports the claim being made.

## What not to write

Do not write "Good use of evidence, well argued." That sentence names no criterion, quotes
nothing from the work, states no performance level, and gives no next step. It is exactly
the kind of comment this skill exists to replace, and it must never appear in feedback
produced under SKILL.md, however short the response needs to be.

Do not write a single overall paragraph covering every criterion at once. A rubric with
four criteria produces four separate blocks, not one blended comment, because a blended
comment hides which specific dimension actually still needs work.

## When criteria conflict with each other

Occasionally a change that would help one criterion works against another. Adding more
sources helps use of evidence but can hurt conciseness if the rubric also grades length.
Note this plainly in the next step for the affected criterion rather than picking a winner
silently; the person applying the rubric decides which criterion matters more for this
particular assignment.

## Handling a rubric with numeric point values

If each performance level in the rubric carries a point value, report the points beside the
performance level in the criterion block, but keep the evidence and the next step exactly
as specified above. A point value is not a substitute for the quoted evidence; it is an
additional fact stated alongside it.
`;

const meta: SkillMeta = {
  slug: "rubric-based-feedback-skill",
  name: "Rubric Based Feedback",
  title: "Rubric Based Feedback Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that marks student work criterion by criterion against a rubric you supply, quotes the evidence behind every judgement, and refuses vague overall comments or invented criteria.",

  seo: {
    primaryKeyword: "rubric based feedback skill",
    keywords: [
      "rubric based feedback skill",
      "free ai skill for rubric based feedback",
      "downloadable rubric feedback checklist",
      "ai skill to grade against a rubric",
      "criterion by criterion feedback for student work",
    ],
    seoTitle: "Rubric Based Feedback Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable rubric based feedback skill that marks student work criterion by criterion, quotes the evidence, and refuses vague overall comments.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/feedback-format.md", content: FEEDBACK_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to give feedback on student work default to a warm, generic paragraph that names no specific criterion and quotes no specific line, because that pattern reads as helpful without requiring the model to check the work closely against a stated standard. This skill's four part block forces every judgement to trace to one named rubric criterion and one quoted piece of evidence, and requires the skill to say plainly when a rubric or a performance level was not supplied rather than inventing one to proceed.",
  },

  article: {
    intro: [
      "A rubric based feedback skill only earns its name when every judgement it produces is tied to a specific rubric criterion and a specific piece of the student's own work, not a warm sounding paragraph that could be pasted onto any other student's submission unchanged. Handed an assignment and no rubric, most AI assistants will cheerfully invent criteria that sound plausible and were never asked for by anyone. This skill is built to refuse that shortcut, and to refuse the vague overall comment that usually comes with it.",
      "It ships as two plain text files: a main instructions file and a reference file that spells out the exact four part format every criterion's feedback has to follow. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "Nothing about the student work you eventually use it on is sent anywhere by this site. The preview and the download both happen entirely in your browser.",
    ],
    sections: [
      {
        heading: "Why the rubric has to be supplied, not guessed",
        body: [
          "A rubric is not just a list of category names. Argument, Evidence and Structure tell an assistant nothing about what separates a strong response from a weak one unless each name comes with a description of what that performance level actually looks like. Without those descriptions, marking becomes a guess dressed up as a judgement.",
          "This is the first thing the skill checks for. If a topic or a brief is supplied with no rubric attached, it says so plainly and asks for one, rather than filling the gap with categories that sound reasonable. That is what makes this a free ai skill for rubric based feedback worth trusting rather than a template that just sounds confident about a standard nobody actually set.",
        ],
      },
      {
        heading: "The four part block every criterion gets",
        body: [
          "Every criterion in the rubric produces one block with four fixed parts: the criterion's exact name, a quoted piece of evidence from the work, the performance level that evidence meets in the rubric's own wording, and one specific next step. Nothing is summarised across criteria, and nothing is scored on a scale the rubric did not define.",
          "That structure is what turns a page of prose about a student's writing into a downloadable rubric feedback checklist you can actually apply the same way twice. A criterion left unaddressed by the work still gets a block; it just states plainly that nothing in the submission addresses it, instead of the block being quietly skipped.",
        ],
      },
      {
        heading: "Why vague overall comments are refused",
        body: [
          "Good job, needs work and shows promise are the three sentences that appear on report cards everywhere and change nothing, because none of them name a criterion, quote a line, or suggest a next action. A student reading them cannot tell what to do differently, and a second marker cannot tell whether they agree, because there is nothing concrete to check the comment against.",
          "This skill's test for a comment is blunt: could this sentence be pasted onto a different student's different piece of work without editing it. If yes, it is not feedback and it is deleted before the output is returned. Every remaining sentence has to trace back to one named criterion and one quoted piece of the actual submission.",
        ],
      },
      {
        heading: "Refusing to invent criteria beyond the rubric",
        body: [
          "The opposite failure is just as common: a model notices a genuine strength or weakness that the rubric does not actually cover, and folds it into the graded feedback as though it were part of the standard being applied. That quietly changes what the student is being marked against without anyone agreeing to it.",
          "The instructions handle this by requiring anything outside the stated rubric to go in a separate note at the end, clearly labelled as outside the rubric. An ai skill to grade against a rubric that blurs this line stops being a rubric based feedback skill and becomes an assistant marking against its own private opinion of good work.",
        ],
      },
      {
        heading: "Marking several students against the same rubric",
        body: [
          "A subtler drift shows up across a set rather than within one piece: a strong first submission can quietly set an informal bar that later, weaker submissions get compared against instead of the rubric's actual performance levels. The instructions require every criterion block to be judged only against the rubric, not against whatever came before it in the same session.",
          "This matters most for criterion by criterion feedback for student work marked in batches, where consistency across thirty scripts is the entire point of having a rubric rather than a marker's personal sense of the cohort.",
        ],
      },
      {
        heading: "How the two files work together",
        body: [
          "SKILL.md sets the process: locate or request a real rubric, refuse to proceed without performance levels, and work through criteria in order. It points directly to reference/feedback-format.md for the exact block structure, including a worked example and guidance for conflicting criteria and numeric point values.",
          "Keep both files in the same folder structure they were downloaded in, since the main instructions file references the reference file by its relative path.",
        ],
      },
    ],
    howTo: {
      name: "How to use the rubric based feedback skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/feedback-format.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real rubric",
          text: "Before using the skill, write out the specific criteria and, for each one, what a strong, middling and weak response looks like. Names alone are not enough.",
        },
        {
          name: "Hand both files, the rubric and the work to your assistant",
          text: "Keep the folder structure intact so the instructions can point to the reference file, then supply the rubric and the student's work to be marked against it.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only give it an assignment topic and no rubric?",
        answer:
          "The skill says so plainly and asks for the actual rubric rather than inventing categories that sound reasonable. It will not proceed as though a standard had been agreed when nobody supplied one, because doing so would mean marking the work against a private opinion instead of a real criterion.",
      },
      {
        question: "Can it build a rubric for me if I do not have one yet?",
        answer:
          "Not within this skill. Building a rubric and marking against one are treated as separate jobs on purpose, since a rubric written at the same moment it is used to grade has no chance to be checked or shared with anyone before it decides a mark.",
      },
      {
        question: "Why does it refuse to write a short overall summary comment?",
        answer:
          "Because a summary that is not tied to a specific criterion and a specific quoted line tends to be the same handful of sentences reused on every piece of work. The skill's test is whether a comment could be pasted onto a different student's submission unedited; if it could, it gets removed rather than returned.",
      },
      {
        question: "What if the student's work does not address one of the criteria at all?",
        answer:
          "The criterion still gets its own block. The skill states plainly that nothing in the submission addresses it and records the lowest performance level the rubric defines, rather than guessing at what the student probably intended to write and grading the guess.",
      },
      {
        question: "Does the skill ever add criteria the rubric did not include?",
        answer:
          "No, and its instructions explicitly forbid it. Anything worth mentioning outside the stated rubric goes in a separate note at the end labelled as outside the rubric, never folded into the graded criterion by criterion feedback where it would look like part of the standard.",
      },
      {
        question: "Is anything about the student's work uploaded when I use this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, and there is no server call behind either action. Whatever rubric or student work you eventually paste into an assistant using these files is never sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description: "Use this first if no rubric exists yet; it builds analytic bands with observable descriptors this skill can then mark against.",
      },
      {
        href: "/education-prompts/essay-feedback-prompt",
        label: "essay feedback prompt",
        description: "A single prompt that marks one essay against a pasted mark scheme with a band and one change, rather than a downloadable criterion by criterion block per rubric row.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description: "For feedback built from marking notes and quotes with one next step, when no formal rubric applies to the piece at all.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "Compare a student's redraft against the original once they have acted on this skill's per-criterion next steps.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.cmu.edu/teaching/assessment/assesslearning/rubrics.html",
        label: "Carnegie Mellon Eberly Center: Grading rubrics",
        description: "Defines the criteria, descriptors and performance levels structure this skill requires a rubric to actually contain before marking begins.",
      },
      {
        href: "https://www.aacu.org/initiatives/value-initiative/value-rubrics",
        label: "AAC&U: VALUE rubrics",
        description: "A widely adopted set of real, published rubrics showing what fully described performance levels look like across many kinds of student work.",
      },
      {
        href: "https://www.gov.uk/government/publications/marking-consistency-metrics",
        label: "Ofqual: Marking consistency metrics",
        description: "The regulator's own analysis of how far two qualified markers diverge on the same script, the disagreement that evidence tied to named criteria is meant to reduce.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to rubric marking.",
      },
    ],
  },

  tags: ["education", "feedback", "rubric", "assessment", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
