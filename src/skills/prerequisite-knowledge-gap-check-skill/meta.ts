import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Prerequisite Knowledge Gap Check

Use this skill whenever you are given a real lesson plan and a real stated
list of the prerequisite knowledge or skills that lesson plan assumes
students already have, and the job is to check whether the plan actually
verifies each prerequisite before building new content on top of it, rather
than silently assuming it is there.

## What this skill does not do

It does not write a lesson plan, and it does not invent a warm-up, a quick
check, or an activation activity the plan is missing. It answers one narrow
question: for each stated prerequisite, does this specific plan contain a
real activity that surfaces or verifies it, or does the plan simply proceed
as though the prerequisite is already secure. If a prerequisite is flagged,
deciding what activity to add is a separate, generation task for the person
using this skill, not something this skill does on its own.

## Required inputs before checking anything

Refuse to run a check without both of the following, supplied directly by
the person you are working with.

1. The lesson plan itself, as written, including its warm-up, direct
   instruction, guided practice, independent practice and any exit activity,
   in enough detail to see what each part actually asks students to do.
2. The stated list of prerequisite knowledge or skills the lesson assumes,
   quoted or pasted exactly as written, not paraphrased or summarised. A
   paraphrase can quietly soften a specific prerequisite into a vaguer one
   the plan then appears to satisfy when it does not.

If the second input is missing, or the lesson plan is supplied only as a
short summary with no detail of what its activities actually contain, say so
explicitly and ask for the real materials rather than guessing at what a
typical lesson on the topic would probably include. A guess dressed up as a
checked plan is worse than no check at all, because it looks verified when
it is not.

## The core check: trace every prerequisite to a real activity

For each stated prerequisite, in order:

1. Quote the prerequisite exactly as stated.
2. Search the lesson plan for any activity that asks students to
   demonstrate, recall or apply that specific prerequisite, not just an
   activity that happens to mention the same general topic.
3. If such an activity exists, quote it exactly and state, in one sentence,
   why it actually surfaces this prerequisite: what it requires a student to
   produce that would reveal whether the prerequisite is actually there.
4. If no such activity exists anywhere in the plan, mark the prerequisite AT
   RISK. State plainly that the plan assumes this prerequisite without ever
   checking for it, and name the point in the plan where new content first
   depends on it.

Work through every stated prerequisite, not just the ones that look
obviously unaddressed. A plan can contain an activity that looks like it
touches a prerequisite and still leave that prerequisite unverified, which is
exactly the case this skill is built to catch.

## What counts as a real check versus a silent assumption

A real check asks students to do something themselves that would reveal
whether the prerequisite is actually there: answer a warm-up question that
requires using the specific prior skill, complete a short diagnostic or
entry ticket built around it, or respond to a targeted question during
direct instruction that requires recalling or applying it. The result has to
come from the student, not from the teacher.

A silent assumption looks different in a few specific ways, and all of them
count as AT RISK.

- The lesson's objective or introduction states the prerequisite in passing
  and then moves straight into new content that depends on it, with no
  activity asking students to use it first.
- A teacher demonstrates a worked example that happens to use the
  prerequisite, but no student is ever asked to produce it themselves. A
  demonstration a student watches is not evidence that the student can do
  the thing.
- An activity is labelled as a review or a recap with no specific content
  given, so there is no way to confirm it actually touches the stated
  prerequisite rather than something adjacent to it.
- The first time a student has to use the prerequisite themselves is inside
  a problem that also requires the new content the lesson is teaching, so a
  struggle with the prerequisite and a struggle with the new material are
  indistinguishable from each other.

## Output format

Return, in order:

1. PREREQUISITE BY PREREQUISITE: each stated prerequisite quoted exactly,
   what the plan does or does not do to check it quoted exactly, and a
   verdict of VERIFIED or AT RISK with the reasoning behind that verdict.
2. AT RISK SUMMARY: every prerequisite flagged AT RISK, restated with the
   point in the plan where new content first depends on it.
3. VERIFIED SUMMARY: every prerequisite that traced to a real activity,
   restated with the activity that verifies it.
4. A one line summary count: prerequisites checked, verified, and left AT
   RISK.

## The one discipline that matters more than the rest

Never invent what the lesson plan should include. This skill works only from
the real plan and the real prerequisite list it was given. If a prerequisite
is AT RISK, say so and stop there; do not draft the missing warm-up or
diagnostic as part of this check, since writing new activation content is a
different task from checking whether one already exists.

See \`reference/worked-example.md\` for a full worked example applying this
method to one lesson plan with three stated prerequisites, where two are
verified by a single warm-up and one is silently assumed and flagged AT
RISK despite being present in a teacher demonstration.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking one lesson plan's stated prerequisites

This applies the method in \`SKILL.md\` to a single ninth grade algebra lesson,
showing two prerequisites verified by the same warm-up and one prerequisite
that is silently assumed even though it appears inside a teacher
demonstration, and is flagged AT RISK.

## The inputs supplied

Stated prerequisites, supplied exactly as given by the teacher:

1. "Students can combine like terms in a linear expression."
2. "Students can apply the distributive property to expand an expression
   like 3(x + 4)."
3. "Students can solve one-step equations using inverse operations, for
   example x + 5 = 12."

The lesson plan, "Solving Multi-Step Linear Equations," supplied exactly as
written:

Warm-up, 5 minutes. "Expand and simplify: 2(x + 3) + 4(x - 1). Complete this
individually at your desk. Two students will share their expanded
expressions on the board before we begin today's lesson."

Direct instruction, 10 minutes. The teacher works through solving
3(x + 2) - 5 = 16 on the board step by step: distribute to get
3x + 6 - 5 = 16, combine like terms to get 3x + 1 = 16, subtract 1 from
both sides to get 3x = 15, then divide both sides by 3 to get x = 5.
Students copy the worked example into their notes. No student is asked to
solve a step themselves during this portion.

Guided practice, 15 minutes. Students solve four multi-step equations at
their desks while the teacher circulates and answers questions.

Independent practice, 10 minutes. Students solve six multi-step equations
independently, to be checked at the end of class.

Exit ticket, 5 minutes. "Solve: 5(x - 1) + 3 = 23." Students submit this
individually as they leave.

## Walking the check, prerequisite by prerequisite

Prerequisite 1, combining like terms: the warm-up asks students to expand
and simplify 2(x + 3) + 4(x - 1), which requires collecting 2x and 4x into
6x and collecting 6 and negative 4 into 2, before two students share their
expanded expressions on the board. This is a real, individually completed
task that requires the student to produce the combined result themselves,
and the teacher can see whether it was done correctly from what is shared.
VERIFIED, by the warm-up.

Prerequisite 2, applying the distributive property: the same warm-up problem
requires expanding 2(x + 3) and 4(x - 1) before anything can be combined, so
a student who cannot distribute correctly will produce a visibly wrong
expanded expression. The same activity that verifies prerequisite 1 also
verifies this one, because both skills are required to complete the same
individually submitted task. VERIFIED, by the warm-up.

Prerequisite 3, solving one-step equations using inverse operations: this
skill appears inside the direct instruction demonstration, where the
teacher subtracts 1 from both sides and then divides both sides by 3 while
solving 3(x + 2) - 5 = 16. But that demonstration is teacher led; students
copy the steps into their notes and are never asked to perform an inverse
operation themselves before the lesson moves into guided practice. The
warm-up does not touch inverse operations at all, since expanding and
simplifying an expression never requires isolating a variable. The first
moment any student has to actually apply an inverse operation themselves is
inside the four multi-step equations in guided practice, where a struggle
with this prerequisite and a struggle with the new multi-step content are
indistinguishable from each other. AT RISK: the plan assumes this
prerequisite without ever asking a student to demonstrate it, and new
content first depends on it at the start of guided practice.

## Output produced

PREREQUISITE BY PREREQUISITE

1. "Students can combine like terms in a linear expression." The warm-up
   requires expanding and simplifying 2(x + 3) + 4(x - 1) individually, with
   two students sharing their expanded expressions on the board. VERIFIED.

2. "Students can apply the distributive property to expand an expression
   like 3(x + 4)." The same warm-up problem requires distributing 2(x + 3)
   and 4(x - 1) before it can be simplified. VERIFIED.

3. "Students can solve one-step equations using inverse operations, for
   example x + 5 = 12." This skill only appears inside a teacher led
   demonstration that students copy rather than perform themselves; no
   activity before guided practice asks a student to apply an inverse
   operation on their own. AT RISK.

AT RISK SUMMARY (1)
Prerequisite 3, one-step equations using inverse operations: never checked
before new content, the four multi-step equations in guided practice, first
requires it of students.

VERIFIED SUMMARY (2)
Prerequisite 1, combining like terms, verified by the warm-up.
Prerequisite 2, the distributive property, verified by the same warm-up.

Summary: 3 prerequisites checked, 2 verified, 1 left AT RISK.

## Why the teacher demonstration does not count as a check

The direct instruction portion of this lesson genuinely uses inverse
operations, which makes it tempting to credit it as covering prerequisite
three. It does not, because a demonstration a student copies into their
notes produces no evidence about whether that student can perform the same
step unassisted. The distinction this skill insists on, an activity a
student actually completes versus an activity a student only watches, is
exactly what separates prerequisite one and two from prerequisite three in
this lesson, even though all three skills appear somewhere in the plan.
`;

const meta: SkillMeta = {
  slug: "prerequisite-knowledge-gap-check-skill",
  name: "Prerequisite Knowledge Gap Check",
  title: "Prerequisite Knowledge Gap Check Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that checks a real lesson plan against a real stated list of prerequisite knowledge, tracing each prerequisite to an activity that actually verifies it and flagging any prerequisite the plan silently assumes as AT RISK.",

  seo: {
    primaryKeyword: "prerequisite knowledge gap check skill",
    keywords: [
      "prerequisite knowledge gap check skill",
      "ai skill to check lesson plan prerequisites",
      "downloadable checklist for prerequisite knowledge gaps",
      "how to check if a lesson verifies prerequisite knowledge",
      "free ai skill for checking prerequisite skills in a lesson",
    ],
    seoTitle: "Prerequisite Knowledge Gap Check Skill: Free AI Skill",
    seoDescription:
      "A free, downloadable prerequisite knowledge gap check skill that traces every stated prerequisite to a real activity in a lesson plan and flags what is only assumed.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard for downloadable classroom skills.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a lesson plan and a stated list of prerequisites, models reliably read the plan as a whole and comment on whether it looks well sequenced or engaging, without ever tracing each individual prerequisite to a specific activity that would actually reveal whether a student has it. A teacher's worked demonstration on the board is routinely credited as covering a prerequisite even though no student is ever asked to perform the step themselves. This skill's checklist forces every verdict to trace to a quoted activity a student actually completes, or to say plainly that no such activity exists, rather than assuming a prerequisite mentioned anywhere in the plan must already be checked.",
  },

  article: {
    intro: [
      "A prerequisite knowledge gap check skill only earns that name if it can tell the difference between a lesson that mentions a prior skill and a lesson that actually checks for it. Handed a lesson plan and a list of the prerequisites it assumes, most AI assistants read the plan for overall quality and move on, never asking whether any activity would reveal if a student is actually missing the skill everything else is built on. This skill makes that trace explicit instead of skipping it.",
      "It ships as two plain text files, a main instructions file and a worked example, both previewable in full on this page before you download the .zip and exactly what a teacher or an AI assistant receives once the archive is handed over.",
      "Its job is narrow on purpose. Given a real lesson plan and a real stated list of prerequisite knowledge, it traces each prerequisite to a real activation activity or warm-up that surfaces it, and flags any prerequisite the plan assumes but never verifies as AT RISK.",
    ],
    sections: [
      {
        heading: "Why a lesson can mention a prerequisite and still not check it",
        body: [
          "A lesson objective can state that students already know how to do something and then proceed straight into content that depends on it, and that sentence alone reads as though the prerequisite has been accounted for. It has not. Naming a prerequisite is not the same as building an activity that would reveal whether a student actually has it, and a plan that only names it leaves every student missing that skill to struggle silently through everything built on top of it.",
          "This is the gap a prerequisite knowledge gap check skill closes. It does not ask whether a lesson's content is well chosen or well sequenced; it asks a narrower, checkable question about each stated prerequisite on its own terms.",
        ],
      },
      {
        heading: "The two inputs this skill requires before it checks anything",
        body: [
          "The skill will not run a check on a lesson plan and a prerequisite list summarised in a sentence or two. It insists on two real inputs together, because a prerequisite can only be judged verified or assumed against something concrete.",
        ],
        list: [
          "The lesson plan itself, in enough detail to see what each activity, including the warm-up, direct instruction, guided and independent practice, actually asks students to do.",
          "The stated list of prerequisite knowledge or skills the lesson assumes, quoted or pasted exactly as written, since a paraphrase can quietly soften a specific prerequisite into one the plan appears to satisfy when it does not.",
        ],
      },
      {
        heading: "The core method, as an ai skill to check lesson plan prerequisites",
        body: [
          "For each stated prerequisite, the skill searches the lesson plan for an activity that asks students to demonstrate, recall or apply that specific skill, not merely an activity that touches the same general topic. When such an activity exists, it is quoted exactly and the reason it actually surfaces the prerequisite is stated in one sentence. When no such activity exists anywhere in the plan, the prerequisite is marked AT RISK, with the point in the plan where new content first depends on it named explicitly.",
          "That trace back to a quoted activity, not a general impression of whether the plan looks thorough, is how to check if a lesson verifies prerequisite knowledge rather than simply assuming a mentioned skill has been accounted for.",
        ],
      },
      {
        heading: "Why a teacher demonstration does not count as a check",
        body: [
          "A worked example on the board can genuinely use a prerequisite, subtracting to isolate a variable while solving a harder equation, for instance, which makes it tempting to credit that moment as verification. It is not, since a demonstration a student copies into their notes proves nothing about whether that student can perform the same step unassisted. Only an activity a student actually completes, a warm-up question, a diagnostic, or a targeted question answered aloud, reveals whether the prerequisite is really there.",
        ],
      },
      {
        heading: "A full worked example",
        body: [
          "The reference file walks through a ninth grade algebra lesson on solving multi-step equations with three stated prerequisites: combining like terms, applying the distributive property, and solving one-step equations using inverse operations. A single warm-up problem verifies the first two prerequisites at once, since expanding and simplifying the same expression requires both skills. The third prerequisite appears only inside a teacher led demonstration that students copy rather than perform, and is flagged AT RISK, since guided practice depends on it before any student has been asked to use it themselves.",
          "That gap between a prerequisite appearing somewhere in a lesson and actually being checked is a downloadable checklist for prerequisite knowledge gaps worth running even on a plan that already looks thorough.",
        ],
      },
      {
        heading: "How this differs from other classroom checking skills on this site",
        body: [
          "This skill is deliberately narrow, worth being explicit about. The classroom instruction pacing skill checks whether an activity's stated minutes are realistic given its real components; timing is a different concern from whether a prerequisite is verified. The misconception diagnosis skill works backward from one wrong answer already given, a reactive check performed after the fact; this skill instead reviews a plan before any lesson happens, asking whether a prerequisite will be verified at all. The differentiated instruction check skill traces accommodations and extensions to real student needs, a question about who a strategy targets, not whether prior knowledge is checked before new teaching builds on it.",
        ],
      },
    ],
    howTo: {
      name: "How to use the prerequisite knowledge gap check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it entirely in your browser.",
        },
        {
          name: "Gather the real lesson plan and the real prerequisite list",
          text: "Write out the lesson plan in enough detail to see what each activity asks students to do, alongside the exact list of prerequisites the lesson assumes.",
        },
        {
          name: "Hand both inputs to your assistant together",
          text: "Supply the lesson plan and the prerequisite list in the same message, since the skill refuses to check a prerequisite against a plan it was not given.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only give the lesson plan and no prerequisite list?",
        answer:
          "The skill refuses to run the check and says so, rather than guessing at what prior knowledge a lesson on the topic would typically assume. It asks for the real, stated list of prerequisites before tracing anything to an activity.",
      },
      {
        question: "Will the skill invent a warm-up or check the plan is missing?",
        answer:
          "No. As a prerequisite knowledge gap check skill it only reports what the plan does or does not contain. Deciding what activity to add for a prerequisite flagged AT RISK is a separate, generation task left to the person using the skill.",
      },
      {
        question: "Does a teacher demonstration count as checking a prerequisite?",
        answer:
          "No, and the worked example shows why. A demonstration a student copies into their notes proves nothing about whether that student can perform the step unassisted; only an activity the student completes themselves counts as a real check.",
      },
      {
        question: "How is this different from the classroom instruction pacing skill?",
        answer:
          "That skill checks whether an activity's stated minutes are realistic given its real steps, movement and setup, a question about timing. This skill checks whether a stated prerequisite is verified before new content depends on it, an entirely different concern from how long an activity takes.",
      },
      {
        question: "How is this different from the misconception diagnosis skill?",
        answer:
          "The misconception diagnosis skill works backward from one wrong answer a student has already given, a reactive check performed after the fact. This skill reviews a plan before any lesson happens, asking whether prerequisite knowledge will be verified at all rather than diagnosing an error already made.",
      },
      {
        question: "Is anything about my lesson uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the lesson plan or prerequisite list you eventually use the skill with is ever sent anywhere by this site. It stays a free ai skill for checking prerequisite skills in a lesson without any account, upload or tracking involved.",
      },
    ],
    internalLinks: [
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description: "Generates the lesson plan and its stated prerequisites that this skill then checks activity by activity.",
      },
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description: "A natural way to build the real quick check or diagnostic a prerequisite flagged AT RISK is missing, once this skill has named the gap.",
      },
      {
        href: "/skills/education-skills/classroom-instruction-pacing-skill",
        label: "classroom instruction pacing skill",
        description: "Another narrow lesson plan checking skill, tracing an activity's stated minutes to its real components rather than a prerequisite to a real check.",
      },
      {
        href: "/skills/education-skills/misconception-diagnosis-skill",
        label: "misconception diagnosis skill",
        description: "A reactive check that diagnoses the belief behind one wrong answer already given, distinct from this skill's proactive review of a plan before any lesson happens.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.edutopia.org/article/activating-students-prior-knowledge/",
        label: "Edutopia: 12 Ways to Activate Your Students' Prior Knowledge",
        description: "Research backed strategies for connecting new material to what students already know, the discipline this skill's activation activities are checked against.",
      },
      {
        href: "https://iris.peabody.vanderbilt.edu/module/sec-rdng/cresource/q3/p09/",
        label: "IRIS Center, Vanderbilt: Activating Prior Knowledge",
        description: "A teacher training module explaining concrete strategies for surfacing what students already know before new content depends on it.",
      },
      {
        href: "https://www.nwea.org/blog/2026/easy-formative-assessment-strategies-for-gathering-evidence-of-student-learning/",
        label: "NWEA: Easy Formative Assessment Strategies",
        description: "Practical techniques for checking student understanding in real time, the same category of activity this skill looks for in a lesson's warm-up or diagnostic.",
      },
      {
        href: "https://www.edweek.org/teaching-learning/teachers-are-told-to-activate-prior-knowledge-heres-how-that-works-in-reading/2023/01",
        label: "Education Week: How Activating Prior Knowledge Works in Reading",
        description: "Reporting on research showing that explicitly connecting prior and new knowledge, not simply mentioning it, is what improves student outcomes.",
      },
    ],
  },

  tags: ["education", "prerequisite knowledge", "lesson planning", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
