import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Student Feedback Actionability Skill

Use this skill when you already have written feedback comments a teacher gave a student on
a specific piece of work, and the job is to check whether each comment tells the student
what to actually do next, rather than just how the teacher felt about the work.

## What this skill does not do

It does not write new feedback, does not rewrite a vague comment into a better one, and does
not invent detail about the student's actual work that was not supplied. Its only job is to
read comments that already exist and sort each one into ACTIONABLE or VAGUE, with a reason.
Hand a VAGUE comment to the teacher to rewrite themselves, or to a feedback writing prompt,
once this skill has flagged it. This skill does not do that rewriting itself, and it does not
mark the underlying work or assign a grade.

## Required input before checking anything

Refuse to check feedback that is described rather than shown. Ask for the actual comments,
quoted exactly as the teacher wrote them, one at a time or as a list. A summary such as "I
told them to work on their conclusion" is a paraphrase, not the comment itself, and a
paraphrase can smooth over the exact wording that determines whether the original was
actionable.

If the comments are supplied as a block of continuous prose rather than discrete comments,
split them into individual sentences or clauses first, then check each one on its own,
because a single paragraph often mixes one actionable clause with several vague ones sitting
right next to it.

## The three part actionability test

A comment is ACTIONABLE only if a student reading it alone, with no other context, would
know three things: what part of the work it refers to, what is wrong or missing there, and
what to physically do about it. All three have to be present in the comment's own words, not
inferred from what a good teacher probably meant.

"Add a topic sentence to the start of paragraph two" names the location (paragraph two), the
gap (no topic sentence) and the action (add one). That comment is ACTIONABLE.

"Good effort" and "needs more detail" name none of the three. Both are VAGUE, however kindly
they are phrased, and phrasing kindness is never a reason to upgrade the verdict.

## How to check each comment

For every comment supplied, follow \`reference/worked-example.md\`'s format exactly.

1. Quote the comment exactly as given, in full, with no paraphrasing or trimming.
2. Mark it ACTIONABLE or VAGUE.
3. If ACTIONABLE, name which of the three elements, location, gap and action, the comment
   supplies, quoting the words that supply each one.
4. If VAGUE, state specifically what is missing: which of the three elements is absent, and
   what information the teacher would need to add to make the comment actionable. Name the
   part of the work that is missing a location, such as a paragraph or a claim, not a generic
   instruction to "be more specific."

Do not soften a VAGUE verdict because the comment is well intentioned or kindly phrased. Tone
and actionability are unrelated; a bluntly worded comment can still name a location, a gap
and an action, and a warmly worded one can still name none of them.

## What counts as a location

A location is specific enough when a student could point to the exact part of their work
being discussed without guessing: a paragraph number, a named section, a specific sentence
quoted or closely described, or a specific claim. "Your introduction" is borderline; treat it
as specific enough only if the piece has exactly one introduction and no ambiguity about
where it starts and ends. "Throughout" or "in places" is never specific enough on its own,
because it does not point the student toward any single part of the work to change.

## What this skill refuses to do

It never invents what the student's actual work contained. If a comment says "fix the
argument in paragraph three" and paragraph three was not supplied, the skill does not guess
what that argument might have been. It evaluates the comment purely on whether it names a
location, a gap and an action in its own words, and says plainly that it cannot confirm
whether paragraph three actually has the problem described, only that the comment itself
names one.

It never rewrites a VAGUE comment into an ACTIONABLE one. Suggesting what the teacher might
have meant is a different job, done by a different tool, working from the actual work and
the teacher's real intent, neither of which this skill has access to here.

## Summarising a full set of comments

When several comments are checked in one pass, report a simple count at the end: how many
were ACTIONABLE, how many were VAGUE, and for the VAGUE ones, which of the three elements,
location, gap or action, was missing most often across the set. This tells a teacher where
their own habit tends to break down, without editing a single one of their comments for them.

## How this differs from marking against a rubric

This skill does not require, use or check comments against a grading rubric, and it makes no
judgement about whether the underlying grade or performance level is correct. A rubric based
check asks whether a comment matches a stated criterion and evidence level; this check asks
only whether the words already on the page tell the student what to do next, which is a
narrower and different question that applies even where no rubric exists at all.
`;

const WORKED_EXAMPLE_MD = `# Worked example: five comments on one student essay

The essay being commented on argued that a town should build a new cycle path. The five
comments below are exactly what the teacher wrote in the margin or at the end of the essay.
Each is quoted in full, marked ACTIONABLE or VAGUE, and reasoned through using the three part
test from \`SKILL.md\`: location, gap, action.

## Comment 1

"Add a topic sentence to the start of paragraph two, since right now it opens straight into a
quotation with no context for what point the quotation is supposed to support."

Verdict: ACTIONABLE.

Location: paragraph two, named directly.
Gap: no topic sentence, and the paragraph opens straight into a quotation with no context.
Action: add a topic sentence to the start of the paragraph.

All three elements are present in the comment's own words. A student reading only this
sentence knows exactly where to look and exactly what change to make.

## Comment 2

"Good effort, keep it up!"

Verdict: VAGUE.

Missing location: no part of the essay is named or implied. "Keep it up" could apply to any
sentence in any essay this student has ever written.
Missing gap: nothing is identified as wrong, missing or strong. The comment states an overall
impression, not a specific observation about the work.
Missing action: there is no instruction the student could act on, only encouragement to
continue whatever they are already doing.

To make this actionable, the teacher would need to name a specific paragraph or sentence that
the effort shows up in, and say specifically what continuing to do it would look like on the
next piece of work.

## Comment 3

"Your conclusion in the final paragraph just repeats the introduction's claim almost word for
word. Rewrite it so it states what the evidence in paragraphs two and three actually proved,
rather than restating the opening claim."

Verdict: ACTIONABLE.

Location: the final paragraph, and by contrast the introduction.
Gap: the conclusion restates the introduction's claim almost word for word instead of
summarising what the evidence showed.
Action: rewrite the conclusion so it states what the evidence in paragraphs two and three
proved.

This comment also demonstrates that actionable feedback can be longer than a single short
instruction, as long as all three elements are present somewhere in the sentence.

## Comment 4

"This needs more detail."

Verdict: VAGUE.

Missing location: "this" is never resolved to a specific paragraph, sentence or claim in the
comment itself. If it was written in the margin next to a specific line, that location lives
outside the comment, not inside it, and a comment has to carry its own location to count.
Missing gap: "more detail" does not say what kind of detail is missing, whether that is a
statistic, a named example, a counterargument, or a source.
Missing action: even if the location were clear, "more detail" gives no concrete step, since
the student still would not know what to add.

To make this actionable, the teacher would need to name the exact sentence or claim and say
what kind of supporting detail is missing there, for example a statistic on cycle path use in
similar towns.

## Comment 5

"Move the sentence 'Cycle path use has risen sharply in nearby towns since the last count' from
the middle of paragraph four to the start of paragraph one, where it currently has no clear
opening claim."

Verdict: ACTIONABLE.

Location: two locations are given precisely, the middle of paragraph four and the start of
paragraph one.
Gap: paragraph one currently has no clear opening claim.
Action: move the named sentence from its current position to the start of paragraph one.

This comment shows that a location can be a specific quoted sentence rather than only a
paragraph number, and that an action can be a reordering instruction rather than only an
addition or a rewrite.

## Summary of this set

Three of the five comments are ACTIONABLE (1, 3, 5) and two are VAGUE (2, 4). Across the two
VAGUE comments, the missing element that recurs is the location: neither comment 2 nor
comment 4 points to a specific part of the essay, which is the single change that would do
the most to make this particular teacher's feedback more actionable going forward.
`;

const meta: SkillMeta = {
  slug: "student-feedback-actionability-skill",
  name: "Student Feedback Actionability Skill",
  title: "Student Feedback Actionability Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that checks written feedback a teacher already gave a student, quotes each comment exactly, marks it ACTIONABLE or VAGUE against a three part test, and states specifically what is missing from every vague one.",

  seo: {
    primaryKeyword: "student feedback actionability skill",
    keywords: [
      "student feedback actionability skill",
      "free ai skill to check feedback actionability",
      "downloadable actionable feedback checklist",
      "ai skill for vague feedback comments",
      "how to check if feedback is actionable",
    ],
    seoTitle: "Student Feedback Actionability Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable student feedback actionability skill that quotes each comment a teacher wrote, marks it ACTIONABLE or VAGUE, and states what is missing.",
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
      "Asked to review a set of written feedback comments, models tend to praise the warmth or effort behind them and skip past whether any individual sentence actually tells the student what to change. A comment like good effort reads as positive and gets waved through even though it names no part of the work and no next step. This skill's three part test, location, gap and action, forces every comment to be judged on its own words rather than its tone, and requires a specific missing element to be named for every comment marked vague rather than a general note that it could be more specific.",
  },

  article: {
    intro: [
      "A student feedback actionability skill only earns its name if it can tell the difference between a comment that changes what a student does next and a comment that only sounds encouraging. Handed a stack of real feedback, most AI assistants default to praising the teacher's tone, kindness or thoroughness, and never actually check whether any given sentence names a part of the work, a specific gap, and a specific action. This skill is built to run that check on the comments as written, nothing more and nothing less.",
      "It ships as two plain text files: a main instructions file and a worked example file showing five real feedback comments checked against the same three part test. Both are previewable in full on this page before you download the .zip, and both are exactly what a teacher or an AI assistant receives once the archive is handed over.",
      "The scope is deliberately narrow. This skill reads feedback that has already been written, quotes it exactly, and sorts each comment into ACTIONABLE or VAGUE. It does not rewrite a single sentence and does not invent anything about what the student's actual work contained beyond what a comment states about itself.",
    ],
    sections: [
      {
        heading: "Why encouraging feedback and actionable feedback are not the same thing",
        body: [
          "A warmly worded comment and a useful comment are two different achievements, and a lot of real feedback only manages the first one. Good effort, keep it up reads as positive and costs nothing to write, but a student reading it alone has no idea what to do differently on the next piece of work.",
          "This is exactly the gap a free ai skill to check feedback actionability exists to close. It never scores a comment on how kind or encouraging it sounds, only on whether the words on the page point a student toward a specific change.",
        ],
      },
      {
        heading: "The three part actionability test",
        body: [
          "At the core of the student feedback actionability skill is a single test applied to every comment: does it name a location in the work, does it name a specific gap at that location, and does it name a specific action the student could take. All three have to be present in the comment's own wording, not inferred from context the comment does not actually contain.",
          "Add a topic sentence to paragraph two supplies all three in one short sentence. Needs more detail supplies none of them, no matter how many times it gets written on how many essays.",
        ],
      },
      {
        heading: "How each comment gets checked, quote by quote",
        body: [
          "Every comment supplied is quoted exactly, in full, before it is judged, because paraphrasing a comment before checking it can quietly smooth over the exact missing word that made the original vague. The skill then states ACTIONABLE or VAGUE, and for an actionable comment names which words supplied the location, the gap and the action.",
          "For a comment marked VAGUE, the skill states specifically what is missing, whether that is the location, the gap, the action, or more than one of the three, rather than a general note that the comment could be more specific. This is what turns a downloadable actionable feedback checklist into something a teacher can actually act on, one comment at a time.",
        ],
      },
      {
        heading: "What counts as a specific location, and what does not",
        body: [
          "A location has to be specific enough that a student could point to the exact part of their work being discussed without guessing: a paragraph number, a named section, or a sentence quoted or closely described. Vague location words like throughout or in places fail the test on their own, because they do not narrow the work down to any single part a student could open and change.",
          "This is exactly the check the student feedback actionability skill runs first, since a comment with no resolvable location fails the test before the gap and the action are even considered.",
        ],
      },
      {
        heading: "What this skill refuses to do, as an ai skill for vague feedback comments",
        body: [
          "It never invents what the student's actual work contained. If a comment names a location that was not supplied along with the work itself, the skill evaluates only whether the comment's own words name a location, a gap and an action, and says plainly that it cannot confirm the underlying claim about that part of the work.",
          "It also never rewrites a vague comment into a better one. That is a different task for a different tool, one working from the teacher's real intent and the actual work, and this skill deliberately keeps those two jobs separate so a flagged comment is never quietly replaced with a guess.",
        ],
      },
      {
        heading: "How this differs from a rubric check and from misconception diagnosis",
        body: [
          "A rubric based check tests whether a comment matches a stated criterion and cites evidence at the right performance level, which requires a rubric to exist in the first place. This skill runs with no rubric at all; it asks a narrower, always applicable question, does this sentence tell the student what to do next, regardless of any grading standard behind it.",
          "A misconception diagnosis works backward from one wrong answer to the belief that produced it, an entirely different artifact from a piece of already written feedback. This skill never diagnoses why a mistake happened; it only checks whether the comment a teacher already wrote about that mistake gives the student something to act on.",
        ],
      },
    ],
    howTo: {
      name: "How to check if feedback is actionable using this skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real comments",
          text: "Collect the exact feedback comments as written, whether typed, handwritten and transcribed, or left in a document's margin, rather than a summary of what you meant to say.",
        },
        {
          name: "Hand both files and the comments to your assistant",
          text: "Keep the folder structure intact so the instructions can point to the reference file, then supply the comments to be checked one at a time or as a list.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill grade the student's work or check it against a rubric?",
        answer:
          "No. It never looks at whether the underlying grade or performance level is correct and never requires a rubric. It only checks whether the words in a comment the teacher already wrote name a location, a gap and an action the student could act on.",
      },
      {
        question: "Will it rewrite a vague comment for me?",
        answer:
          "No, and its instructions explicitly forbid it. Rewriting a comment requires knowing the teacher's real intent and the actual work behind it, neither of which this skill has access to, so a flagged VAGUE comment is left for the teacher to rewrite rather than replaced with a guess.",
      },
      {
        question: "What if a comment sounds specific but the work it refers to was not supplied?",
        answer:
          "The skill judges the comment purely on its own wording. It states plainly that it cannot confirm the underlying claim about the work without that work being supplied, and evaluates only whether the comment itself names a location, a gap and an action.",
      },
      {
        question: "How is this different from the rubric based feedback skill?",
        answer:
          "The rubric based feedback skill checks a comment's structure against a stated rubric's criteria and evidence levels, and requires that rubric to exist. The student feedback actionability skill runs with no rubric at all and asks a narrower question about any piece of already written feedback: does this specific sentence tell the student what to do next.",
      },
      {
        question: "Can a kindly worded comment still be marked VAGUE?",
        answer:
          "Yes. Tone and actionability are treated as unrelated. A warmly phrased comment that names no location, gap or action is still VAGUE, and a bluntly phrased comment that names all three is still ACTIONABLE.",
      },
      {
        question: "Is anything about the student's work uploaded when I use this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, and there is no server call behind either action. Whatever feedback comments you eventually paste into an assistant using these files are never sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/education-skills/rubric-based-feedback-skill",
        label: "rubric based feedback skill",
        description: "For marking work criterion by criterion against a stated rubric, a different check from auditing existing comments for actionability alone.",
      },
      {
        href: "/skills/education-skills/misconception-diagnosis-skill",
        label: "misconception diagnosis skill",
        description: "For diagnosing the belief behind one specific wrong answer, a different artifact from checking already written feedback comments.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description: "For writing new feedback from marking notes and quotes in the first place, before this skill checks whether the result is actionable.",
      },
      {
        href: "/education-prompts/essay-feedback-prompt",
        label: "essay feedback prompt",
        description: "A single prompt that marks one essay against a pasted mark scheme, producing comments this skill can then audit for actionability.",
      },
    ],
    externalLinks: [
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback",
        label: "Education Endowment Foundation: Teacher Feedback to Improve Pupil Learning",
        description: "Independent guidance on what makes classroom feedback effective, including the case for feedback that specifies a next step over general praise.",
      },
      {
        href: "https://www.ascd.org/el/articles/seven-keys-to-effective-feedback",
        label: "ASCD: Seven Keys to Effective Feedback",
        description: "Grant Wiggins' widely cited article distinguishing feedback that is specific and actionable from feedback that only evaluates or encourages.",
      },
      {
        href: "https://www.edutopia.org/article/giving-effective-feedback-students",
        label: "Edutopia: Giving Effective Feedback to Students",
        description: "A practical explainer on why comments naming a specific, actionable next step change student behaviour more reliably than general praise.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt engineering overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to feedback review.",
      },
    ],
  },

  tags: ["education", "feedback", "actionability", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
