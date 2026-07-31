import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Misconception Diagnosis

Use this skill when a student has given one specific wrong answer and the job
is to name the misconception that produced it, not just mark the answer
incorrect.

## What this skill does not do

It does not write a lesson plan, a full set of feedback comments, or a quiz.
It answers one narrow question: given this exact wrong answer, what does the
student most likely believe that made this answer seem right to them. Hand
its output to a tutoring skill, a feedback prompt or a lesson planning tool to
act on afterward.

## Required inputs before diagnosing anything

Refuse to diagnose without both of the following.

1. The student's wrong answer, written exactly as given, not paraphrased or
   cleaned up. A paraphrase can quietly remove the detail the diagnosis
   depends on.
2. Either the correct answer, or, when the task is genuinely open ended (an
   essay claim, a design choice, a strategic call) and no single correct
   answer exists, the original question together with what a defensible
   answer would need to include.

If the question itself is not supplied and the wrong answer alone is
ambiguous between two different tasks, ask for it before proceeding. Do not
guess at the question from the shape of the answer.

## The core method: reconstruct the reasoning path

Marking an answer wrong is not diagnosis. Diagnosis means working backward
from the specific wrong answer to a reasoning path that would produce exactly
that answer, then naming the belief that reasoning path depends on.

For every diagnosis:

1. State the wrong answer and the correct answer, or the question, side by
   side.
2. Reconstruct, step by step, a plausible sequence of reasoning a student
   could have followed that starts from the question and ends at the given
   wrong answer. Show the steps, do not just assert the conclusion.
3. Name the specific belief or rule that reasoning path depends on. This is
   the misconception. State it as a rule the student appears to be applying,
   not as a vague label such as "confused about fractions."
4. Note what evidence would confirm the diagnosis, such as a second wrong
   answer that fits the same rule, and what would rule it out, such as a
   wrong answer the rule could not have produced.

A diagnosis that could not be confirmed or ruled out by a second answer is
not specific enough yet. Push it until it is.

## When more than one misconception fits

Many wrong answers are consistent with more than one underlying belief. When
that is true, list every plausible candidate rather than choosing one and
presenting it as certain.

For each candidate:

- Name the belief.
- Show the reasoning path from that belief to the given wrong answer.
- State one follow up question, or one second problem, that would separate it
  from the other candidates.

Do not rank candidates by which one sounds most likely unless the reasoning
paths genuinely differ in plausibility given the evidence actually supplied.
A guess dressed up as the most likely candidate is exactly the failure this
skill exists to prevent.

## Distinguishing a genuine misconception from a slip

Not every wrong answer reflects a misconception. A single arithmetic slip, a
copying error, or a rushed answer under time pressure can produce a wrong
answer with no underlying false belief behind it at all.

Before diagnosing a misconception, check whether the wrong answer could
equally be explained by a one off error unlikely to repeat, such as a
transposed digit or a skipped word, versus a pattern only visible across more
than one answer from the same student.

If only one wrong answer is available and it is consistent with a simple slip
as well as with a misconception, say so explicitly and recommend a second,
targeted question that would separate the two, rather than defaulting to the
more interesting sounding explanation.

## Output format

Return, in order:

1. The wrong answer and the correct answer or question, quoted exactly as
   given.
2. The reasoning path, or paths, that lead from the question to the wrong
   answer.
3. The misconception, or candidate misconceptions, stated as a specific rule
   or belief.
4. If multiple candidates were listed, the one follow up question or problem
   that would distinguish between them.
5. A one line note on whether a simple slip remains a plausible alternative
   explanation.

## Subject notes

See \`reference/worked-examples.md\` for full worked examples in mathematics,
science and grammar, including a case where more than one misconception is
plausible. The method above applies unchanged across subjects; only the
specific reasoning paths differ.
`;

const WORKED_EXAMPLES_MD = `# Worked examples: from wrong answer to misconception

Each example below applies the method in \`SKILL.md\`: the wrong answer and the
correct answer, or the question, are stated side by side, a reasoning path is
reconstructed step by step, and the specific belief that path depends on is
named as the misconception. Where more than one misconception is plausible,
every candidate is listed rather than one being chosen arbitrarily.

## Mathematics: fraction addition

Question: What is 1/4 + 2/4?
Correct answer: 3/4
Wrong answer given: 3/8

Reasoning path: the student appears to have added numerators together and
denominators together separately, treating a fraction as two whole numbers
written one above the other rather than as one number, giving
(1 + 2) over (4 + 4), which is 3/8.

Misconception: a fraction is two independent whole numbers that can each be
operated on the way whole numbers are, rather than one quantity built from a
numerator and a shared denominator.

Evidence that would confirm it: the same student adding 1/3 + 1/3 and
answering 2/6 instead of 2/3, since 2/6 follows the identical rule of adding
both parts separately.
Evidence that would rule it out: an answer of 3/4 reached with different
faulty reasoning shown, or a denominator error that does not match this
specific added-denominators pattern.

## Mathematics: a case with more than one plausible misconception

Question: A shop reduces a 40 dollar jacket by 25 percent. What is the sale
price?
Correct answer: 30 dollars
Wrong answer given: 10 dollars

Two different reasoning paths both reach 10 dollars from this question, so
both are listed rather than one being asserted as the diagnosis.

Candidate one: the student calculated 25 percent of 40 dollars correctly as
10 dollars, then stopped, treating "reduces by 25 percent" as if it asked for
the size of the reduction rather than the new price. The belief here is that
a percent change question is asking for the amount of change, not the
resulting value.

Candidate two: the student read 25 percent as one quarter, divided 40 dollars
by 4 to get 10 dollars, and then also stopped at that quarter rather than
subtracting it from the original price, arriving at the same number through
a different route. The belief here is again about what the question is
asking for, not about how to compute 25 percent.

Distinguishing question: ask the student to state, in words, what the number
they wrote represents. An answer of "the amount taken off" confirms that both
candidates in this case actually converge on the same belief about what the
question asks, which is itself worth surfacing rather than treating the two
calculation routes as separate misconceptions.

## Science: photosynthesis and where a plant's added mass comes from

Question: A seedling is grown in a sealed container with soil, water and
light, and gains several grams of mass over a month. Where did most of that
added mass come from?
Correct answer: primarily from carbon dioxide taken in from the air and
built into the plant through photosynthesis, not from the soil.
Wrong answer given: from the soil.

Reasoning path: soil visibly supports and feeds the plant's roots, water is
drawn from soil, and nothing about a gas is visible entering the plant, so
the student reasons that solid mass must come from the only solid, visible
source nearby.

Misconception: plants are fed the way animals are fed, drawing solid material
from a visible source, rather than building most of their mass from a gas
that cannot be seen entering the plant. This is one of the most well
documented misconceptions in science education, because the correct
mechanism has an invisible input, which runs against an intuitive rule that
mass comes from mass.

Evidence that would confirm it: the same student, asked why a large tree
could not have grown to that size from a small amount of soil, answering
that the soil "must have replenished itself" rather than questioning whether
soil was the source at all.

## Grammar: subject verb agreement across a modifying phrase

Sentence written by the student: "The list of assignments were posted late."
Correct form: "The list of assignments was posted late."

Reasoning path: the verb needs to agree with the true subject, "list," which
is singular, but "assignments," the noun sitting closest to the verb, is
plural. The student's ear appears to be matching the verb to the nearest
noun rather than to the actual grammatical subject.

Misconception: agreement is governed by whichever noun sits immediately
before the verb, not by the sentence's real subject. This is a well studied
error pattern, and it is not a random slip, because it recurs specifically
when a plural noun sits inside a modifying phrase between a singular subject
and its verb; a sentence without that intervening phrase would not trigger
it.

Evidence that would confirm it: the same student writing "The box of tools
were left open" but correctly writing "The tools were left open," which
shows the error only appears when a plural noun intervenes between subject
and verb.

## Why a single wrong answer is sometimes not enough

The jacket price example above shows that two different calculation routes
can land on the identical wrong number. Where possible, ask for the
student's working, not just the final answer, because the reasoning path is
what a diagnosis actually depends on, and the same wrong answer can hide more
than one belief behind it.
`;

const meta: SkillMeta = {
  slug: "misconception-diagnosis-skill",
  name: "Misconception Diagnosis",
  title: "Misconception Diagnosis Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that takes one specific wrong answer plus the correct answer or question, reconstructs the reasoning path that produced it, and names the underlying misconception, listing every plausible candidate when more than one fits.",

  seo: {
    primaryKeyword: "misconception diagnosis skill",
    keywords: [
      "misconception diagnosis skill",
      "ai skill to diagnose student misconceptions",
      "downloadable misconception diagnosis checklist",
      "how to find the misconception behind a wrong answer",
      "free ai skill for diagnosing wrong answers",
    ],
    seoTitle: "Misconception Diagnosis Skill: Diagnose One Wrong Answer",
    seoDescription:
      "A free misconception diagnosis skill that reconstructs the reasoning path behind one wrong answer and lists every plausible misconception.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-examples.md", content: WORKED_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team, checked against published research on how misconceptions form as stable prior beliefs rather than random errors.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to check a wrong answer, models default to marking it incorrect and supplying the correct method, skipping the reasoning path that actually produced the specific error in front of them. When more than one misconception could plausibly explain the same mistake, models tend to commit to a single confident explanation rather than naming the others that fit the evidence equally well. This skill requires the reasoning path to be traced explicitly and requires every equally plausible candidate to be listed rather than resolved by guessing.",
  },

  article: {
    intro: [
      "A misconception diagnosis skill only earns that name if it does something a plain answer key cannot: given one specific wrong answer, it works out the belief that made that particular wrong answer seem right, rather than simply marking it incorrect and moving on. Most AI assistants asked to check work default to the answer key move, correct or incorrect, sometimes with a worked solution attached, and stop there.",
      "This skill ships as two plain text files: a main instructions file, and a worked examples file the instructions point to, covering mathematics, science and grammar. Both are previewable in full on this page before download, and both are exactly what a teacher or tutor receives once the archive is handed over.",
      "Its core discipline is narrow on purpose. It needs the exact wrong answer and either the correct answer or the question itself, it reconstructs the specific reasoning path that would turn that question into that wrong answer, and when more than one reasoning path fits the same mistake, it lists every candidate instead of picking one and presenting a guess as a finding.",
    ],
    sections: [
      {
        heading: "Marking an answer wrong is not a diagnosis",
        body: [
          "Telling a student their answer is incorrect changes nothing about the belief that produced it. A misconception is not a gap where knowledge should be, it is a working rule that has explained enough of the world well enough, often for years, that hearing it contradicted does little on its own.",
          "Diagnosis means naming that rule specifically enough that it can be tested and eventually replaced. A misconception diagnosis skill worth using, and a downloadable misconception diagnosis checklist worth trusting, is one where every step produces something testable rather than a vague comment like a student needs more practice.",
        ],
      },
      {
        heading: "The two inputs this skill requires before it diagnoses anything",
        body: [
          "The skill refuses to guess at a misconception from an isolated wrong answer with nothing to compare it against. Two inputs are non negotiable.",
        ],
        list: [
          "The wrong answer, quoted exactly as the student gave it, since paraphrasing it can remove the one detail the diagnosis actually depends on.",
          "The correct answer, or, when the task is genuinely open ended and no single correct answer exists, the original question together with what a defensible answer would need to include.",
        ],
      },
      {
        heading: "Reconstructing the reasoning path: a worked example",
        body: [
          "Asked what 1/4 plus 2/4 equals, a student answers 3/8. An ai skill to diagnose student misconceptions does not stop at noting the correct answer is 3/4. It works backward: adding the numerators (1 plus 2) and the denominators (4 plus 4) separately produces exactly 3/8, which means the student is very likely treating a fraction as two independent whole numbers rather than one quantity built from a numerator and a shared denominator.",
          "That reconstructed path is what turns a mark of incorrect into something a teacher can act on, because the next question to ask this student is obvious: does the same added-denominators pattern show up on a second fraction sum. The full version of this example, plus a science and a grammar case, is in the reference file.",
        ],
      },
      {
        heading: "When more than one misconception fits the same wrong answer",
        body: [
          "A jacket priced at 40 dollars is reduced by 25 percent, and a student answers 10 dollars instead of 30. Two different reasoning paths reach the identical wrong number: one calculates 25 percent of 40 correctly and stops there, mistaking the size of the reduction for the new price, and the other divides 40 by 4 to find a quarter and also stops there, never subtracting it from the original.",
          "Both beliefs are plausible from the evidence given, so both are listed as candidates rather than one being chosen and reported with false confidence. A single distinguishing question, asking the student what the number they wrote actually represents, is offered alongside the two candidates rather than a guess dressed up as a finding.",
        ],
      },
      {
        heading: "Separating a genuine misconception from a simple slip",
        body: [
          "Not every wrong answer reveals a false belief. A transposed digit, a skipped word, or a rushed answer under time pressure can produce a wrong answer with no misconception behind it at all, and treating a one off slip as a stable belief wastes reteaching time on something that was never there.",
          "Learning how to find the misconception behind a wrong answer requires checking whether a single wrong answer is equally consistent with a slip, in which case the skill says so explicitly and recommends a second, targeted question rather than defaulting to the more interesting sounding explanation.",
        ],
      },
      {
        heading: "Using this across subjects",
        body: [
          "The method does not change between subjects, only the reasoning paths do. The reference file walks through a grammar example, a student writing \"the list of assignments were posted late,\" where the verb has been matched to the nearest noun, assignments, rather than to the true subject, list, a documented pattern rather than a random slip because it only appears when a plural noun sits between subject and verb.",
          "A free ai skill for diagnosing wrong answers is only useful if it holds up outside a single subject, so the worked examples file deliberately covers a mathematics case, a science case about photosynthesis, and this grammar case side by side.",
        ],
      },
    ],
    howTo: {
      name: "How to use the misconception diagnosis skill",
      steps: [
        {
          name: "Collect the exact wrong answer and the correct answer or question",
          text: "Copy the student's answer exactly as written, and pair it with either the correct answer or, for open ended tasks, the question and what a defensible answer needed to include.",
        },
        {
          name: "Reconstruct the reasoning path",
          text: "Work backward from the wrong answer toward the question, step by step, until a plausible sequence of reasoning is found that actually produces that specific wrong answer.",
        },
        {
          name: "Check for a slip and for competing misconceptions",
          text: "Rule out whether a one off error explains the same answer just as well, and if more than one reasoning path fits, list every candidate rather than choosing one.",
        },
        {
          name: "Read the diagnosis before deciding what to reteach",
          text: "Use the named belief, and the follow up question offered alongside it, to decide what to ask the student next rather than reteaching the whole topic from the start.",
        },
      ],
    },
    faq: [
      {
        question: "What if there is no single correct answer to compare against?",
        answer:
          "Supply the original question together with what a defensible answer would need to include instead of a fixed correct answer. The skill still requires that second input; it will not diagnose a misconception from an isolated wrong answer with nothing to reason against.",
      },
      {
        question: "How is this different from simply telling a student they got it wrong?",
        answer:
          "Marking an answer wrong states a fact the student likely already suspects. As a misconception diagnosis skill, this instead reconstructs the specific reasoning path that produced that exact wrong answer and names the belief behind it, which is what actually tells a teacher what to reteach next.",
      },
      {
        question: "Can the skill diagnose a misconception from just one wrong answer?",
        answer:
          "Sometimes, but it will flag when a single answer is equally consistent with a simple slip, such as a transposed digit, and recommend a second, targeted question rather than committing to a misconception on thin evidence.",
      },
      {
        question: "What happens when two different misconceptions could explain the same mistake?",
        answer:
          "Both are listed as candidates, each with its own reasoning path shown, along with one follow up question that would separate them. The skill will not pick one arbitrarily and present a guess as a confirmed diagnosis.",
      },
      {
        question: "Does this work for subjects outside mathematics?",
        answer:
          "Yes. The reference file includes a science example about where a plant's mass actually comes from and a grammar example about subject verb agreement, alongside two mathematics examples, because the method for reconstructing a reasoning path does not depend on the subject.",
      },
      {
        question: "Is anything about a student's work sent anywhere when I use this skill?",
        answer:
          "No. Previewing the files and downloading the zip both happen entirely in your browser. There is no server call behind either action, and nothing about the answers you eventually run through the downloaded skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description: "For planning a whole lesson around misconceptions you already expect, rather than diagnosing the one behind a specific wrong answer already given.",
      },
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description: "A natural next step once a misconception is named, turning it into a distractor that would catch the same error in other students.",
      },
      {
        href: "/education-prompts/socratic-tutor-prompt",
        label: "socratic tutor prompt",
        description: "For guiding a student toward correcting a misconception through questioning, once this skill has named which one is actually in play.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description: "For turning a diagnosed misconception into feedback language quoting the student's own work, rather than a generic correction.",
      },
    ],
    externalLinks: [
      {
        href: "https://ies.ed.gov/ncee/wwc/PracticeGuide/15",
        label: "IES What Works Clearinghouse: Developing Effective Fractions Instruction",
        description: "A federal practice guide on where fraction understanding commonly breaks down, the basis for the fraction addition worked example.",
      },
      {
        href: "https://www.aaas.org/programs/project-2061",
        label: "AAAS Project 2061",
        description: "A long running science literacy initiative that built assessment items specifically to diagnose students' conceptual difficulties rather than just score them.",
      },
      {
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8746120/",
        label: "PMC: The Reading Signatures of Agreement Attraction",
        description: "Peer reviewed research on the exact grammar error pattern used in this skill's subject verb agreement worked example.",
      },
      {
        href: "https://www.nationalacademies.org/publications/9853",
        label: "National Academies Press: How People Learn",
        description: "The standard synthesis on preconceptions as stable prior knowledge, the basis for treating a misconception as a rule to reconstruct rather than a gap to fill.",
      },
    ],
  },

  tags: ["education", "misconceptions", "diagnosis", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
