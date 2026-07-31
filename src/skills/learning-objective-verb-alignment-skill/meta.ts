import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Learning Objective Verb Alignment Check

Use this skill whenever you are handed a set of stated learning objectives
written in the "students will be able to" form, together with the real
assessment question actually paired with each objective, and asked whether
the question measures the same cognitive level the objective's verb claims.
This skill does not judge whether the objective itself is well written, and
it does not judge whether a whole test's question count matches a set of
stated weights across every objective. It judges one narrow thing: for a
single objective and its paired question, do the objective's verb and the
question's actual demand sit at the same rung of Bloom's Taxonomy.

## Before you check anything

Confirm you have both halves of the input for every pair: the objective's
exact wording as stated, and the exact wording of the assessment question
meant to measure it. A pairing given only as a topic label, for example "the
photosynthesis question," without the literal wording of both the objective
and the question, cannot be checked and should be named as missing rather
than guessed at.

If no assessment question is supplied for a stated objective, say so
plainly. Do not draft what a fitting question would look like and then check
the objective against your own invention. This skill's entire value depends
on holding a real objective against a real question; inventing the second
half of a pair would only ever check your own imagination, not the actual
assessment.

## The six Bloom's Taxonomy levels, low to high

Use \`reference/verb-alignment-worked-example.md\` for a fully walked example,
and the table below for quick reference while checking a pair.

| Level | Rung | Typical verbs |
|---|---|---|
| 1 | Remember | define, identify, list, name, recall, recognize, state, label |
| 2 | Understand | describe, explain, summarize, classify, compare, discuss, paraphrase |
| 3 | Apply | apply, calculate, demonstrate, solve, use, implement, execute |
| 4 | Analyze | analyze, differentiate, examine, categorize, deconstruct, distinguish |
| 5 | Evaluate | evaluate, judge, critique, justify, assess, defend, appraise |
| 6 | Create | create, design, develop, construct, formulate, compose, propose |

A verb can appear in more than one real objective with different intended
meanings, so this table is a starting point, not a lookup that ends the
judgment on its own. Where a verb reads as ambiguous, read the objective's
full sentence, not the verb alone, to resolve which level it actually names,
and state which level you assigned and why.

## Checking a single pair

For every objective and its paired question, in order:

1. Quote the objective's exact wording, then quote its verb or verb phrase
   exactly as written.
2. Name the Bloom's level that verb sits at, using the table above as a
   starting point and the objective's full sentence to resolve any
   ambiguity.
3. Quote the paired assessment question exactly as written.
4. State the cognitive level the question actually demands, judged from what
   a student must do to answer it correctly, not from any verb the question
   happens to borrow from the objective's own wording. A question can demand
   only Remember even if its own text loosely uses a word like "analyze";
   judge the actual task the student has to perform, not the question's
   vocabulary.
5. Compare the two levels. If the question's demanded level is lower than
   the objective's stated level, flag a mismatch. If the question's level is
   at or above the objective's stated level, state plainly that the pair is
   aligned.

## What counts as a mismatch worth flagging

This skill flags a question that demands a lower cognitive level than its
objective claims. An objective stated at Analyze, paired with a question
that only asks a student to list, is a mismatch: listing does not require
analysis, so the assessment cannot demonstrate the stated objective was met.
A question that demands a level higher than the objective states is not a
mismatch under this skill; that may be a separate concern, since it can mean
the objective understates what the assessment actually requires, and should
be named separately rather than folded into the same flag.

## What a real flag looks like

A flag must quote the objective's exact verb, name its Bloom's level, quote
the exact assessment question, name the level the question actually
demands, and state in one sentence why the gap exists, naming the specific
task the question asks for that falls short of the objective's claimed
level. "This question does not really test analysis" is not a flag. "The
objective states 'analyze the causes of the French Revolution' (Analyze).
The paired question, 'List the causes of the French Revolution,' asks only
for recall of previously stated facts (Remember), with no comparison,
causal reasoning, or explanation of relationships between causes required to
answer it correctly" is a flag.

## Reporting a pair that is aligned

If a question demands the same level as its objective or higher, say so
plainly, quoting both the objective's verb and the question, rather than
searching for a technicality to flag. An aligned pair is a legitimate,
useful result, not a missed opportunity to find something wrong.

## Summarizing a batch

After checking every pair individually, produce one summary table:
objective with its verb quoted, the objective's Bloom's level, the
question's demanded level, and aligned or mismatched. Do not average pairs
into one alignment score or an overall percentage. A single Create objective
assessed only by recall is a more urgent problem than a batch where every
pair sits one rung apart, and an averaged score would hide that difference
from whoever has to decide what to fix first.

## How this differs from other assessment checks

This skill checks one objective against its own paired question, verb
against verb, cognitive level against cognitive level. It does not check
whether a whole test's question count is distributed across objectives in
proportion to a stated set of weights, which is a coverage and distribution
question answered by a different skill entirely. It also does not check
whether an individual question is well constructed as a multiple choice
item, such as whether its distractors are plausible or its stem leaks the
answer grammatically, which is a construction question, not a cognitive
level question. The article on this skill's page names the specific line
between this skill and the assessment blueprint alignment skill in full.

## What this skill does not do

It does not rewrite a mismatched question to fit its objective, and it does
not rewrite an objective to fit its question; it names the gap and leaves
the fix, whether that means writing a new question or restating the
objective honestly, to whoever owns the assessment. It never invents a
plausible sounding assessment question to check an objective against when
no real question was supplied; a missing pairing is reported as missing,
not filled in with a guess.
`;

const VERB_ALIGNMENT_WORKED_EXAMPLE_MD = `# Worked example: three objective and question pairs

This file walks the method in \`SKILL.md\` against three concrete, real
objective and question pairs, quoted exactly, so a check built from your own
inputs can follow the same shape. Two pairs below are drawn from a history
and a biology class; the third is from a chemistry lab course. At least one
pair is mismatched.

## Pair 1: mismatched

Objective: "Students will be able to analyze the causes of the French
Revolution."

Verb: "analyze." Bloom's level: Analyze. The objective's full sentence
supports this reading, since it asks students to break the Revolution's
causes into components and explain how those components relate to one
another, not merely to name them.

Paired question: "List the causes of the French Revolution."

Level the question actually demands: Remember. Answering it correctly
requires recalling and writing down previously stated facts. It does not
require comparing causes, weighing their relative importance, or explaining
how they relate to one another, which is what the objective's verb, analyze,
claims the assessment will measure.

Result: mismatched. The objective states Analyze; the question demands
Remember. A student who can recall a memorized list of causes, with no
understanding of how those causes interact, can answer the paired question
fully correctly, so the question cannot demonstrate that the stated
objective was met.

## Pair 2: aligned

Objective: "Students will be able to evaluate the effectiveness of
different persuasive techniques in a speech."

Verb: "evaluate." Bloom's level: Evaluate.

Paired question: "Which persuasive technique used in the speech is most
effective at convincing the audience, and why? Justify your answer using at
least two specific examples from the text."

Level the question actually demands: Evaluate. Answering it requires making
a judgment about which technique works best, then defending that judgment
with evidence, which is the defining demand of the Evaluate level: judging
value or effectiveness against a standard and justifying the judgment made.

Result: aligned. The objective states Evaluate; the question demands
Evaluate. A student cannot answer this question fully by recalling,
describing, or even analyzing the techniques alone; a defended judgment is
required, matching the objective's own claim.

## Pair 3: mismatched

Objective: "Students will be able to design an experiment to test the
effect of light intensity on plant growth."

Verb: "design." Bloom's level: Create. Designing a new experiment from
stated variables is an act of putting components together into a new,
original procedure, which is the defining demand of the Create level.

Paired question: "Follow the steps below to conduct the provided experiment
on light intensity and plant growth, then record your results in the
table."

Level the question actually demands: Apply. Answering it requires carrying
out a procedure that was already designed and handed to the student.
Following provided steps and recording results uses a method; it does not
require the student to originate one, which is what the objective's verb,
design, actually claims will be measured.

Result: mismatched. The objective states Create; the question demands
Apply, three rungs lower. This is a wider gap than Pair 1, since Apply sits
closer to Remember than to Create on the taxonomy. It is also a common
pattern: a lab or project objective is written at Create, then assessed
with a worksheet that only asks students to execute steps someone else
already designed.

## Reading the results together

| Objective (verb) | Objective's level | Question's demanded level | Result |
|---|---|---|---|
| "analyze the causes of the French Revolution" | Analyze | Remember | Mismatched |
| "evaluate the effectiveness of...persuasive techniques" | Evaluate | Evaluate | Aligned |
| "design an experiment to test..." | Create | Apply | Mismatched |

Two of the three pairs are mismatched, each in a different way. Pair 1
slips one rung short of its claimed level by asking only for recall of what
should have been analyzed. Pair 3 slips three rungs short by asking only
for procedural execution of what should have been designed. Reporting these
as one combined "two of three mismatched" statistic, without naming the
size of each gap, would hide that Pair 3's gap is the more urgent one to
fix, since a Create level objective assessed only by executing given steps
never gives a student any real chance to demonstrate the design skill the
objective claims to measure.

## What changes the verdict

If Pair 3's question instead read "Design your own experiment to test the
effect of light intensity on plant growth, including your chosen
variables, control group, and measurement method," the demanded level would
rise to Create, matching the objective, because the student would be
originating the procedure rather than executing a given one. The exact
wording of what a student is asked to do, not the topic of the question, is
what determines its level. Two questions on the identical topic can sit at
completely different rungs of the taxonomy depending on whether the
procedure is handed to the student or left for the student to build from
nothing.
`;

const meta: SkillMeta = {
  slug: "learning-objective-verb-alignment-skill",
  name: "Learning Objective Verb Alignment Check",
  title: "Learning Objective Verb Alignment Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that checks a real learning objective's stated verb against Bloom's Taxonomy, then checks the paired assessment question's actual demand against that same level, quoting both and flagging any question that tests lower than its objective claims.",

  seo: {
    primaryKeyword: "learning objective verb alignment skill",
    keywords: [
      "learning objective verb alignment skill",
      "free ai skill to check blooms taxonomy alignment",
      "downloadable objective to assessment verb checklist",
      "ai skill to match objectives to test questions",
      "how to check if assessment matches learning objective",
    ],
    seoTitle: "Learning Objective Verb Alignment Skill: Free AI Download",
    seoDescription:
      "A free, downloadable learning objective verb alignment skill that checks an objectives Bloom level against what its paired question actually demands.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/verb-alignment-worked-example.md", content: VERB_ALIGNMENT_WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard, checked against Bloom's revised taxonomy verb lists published by university teaching centres.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked whether an assessment matches its stated objective tend to accept the objective's verb at face value and confirm alignment from the topic match alone, without checking what the paired question actually requires a student to do. When no real question is supplied, models also tend to draft a plausible one and check the objective against their own invention rather than flagging the missing pairing. This skill's verb-then-demand sequence, run only against real supplied pairs, closes both gaps.",
  },

  article: {
    intro: [
      "A learning objective verb alignment skill has one narrow job: given a real stated learning objective and the real assessment question paired with it, check whether the question actually demands the same cognitive level the objective's verb claims. An objective that says 'analyze' but is assessed by a question that only asks a student to list is a common, easy to miss gap, because the objective and the question can share a topic perfectly while sitting three rungs apart on Bloom's Taxonomy.",
      "This page is the practical answer to how to check if assessment matches learning objective: quote the objective's exact verb, name its Bloom's level, quote the paired question, name the level it demands, then compare the two. Nothing is inferred from a topic match, and nothing is invented when a real question is missing.",
      "It ships as two plain text files, a main instructions file with a compact six level verb reference table, and a reference worked example carrying three real objective and question pairs through the method in full. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "What this skill checks, and what it deliberately does not",
        body: [
          "The check is narrow on purpose: one objective, one paired question, one comparison of cognitive level against cognitive level. It does not evaluate whether the objective is well phrased, whether the question is well constructed as an item, or whether a whole test's questions are distributed across objectives in the right proportion. Each of those is a real, different check.",
          "Keeping the scope narrow is what makes the output checkable: a reader can hold the quoted objective and the quoted question side by side and judge for themselves whether the stated levels are right.",
        ],
      },
      {
        heading: "Reading the objective's verb against Bloom's Taxonomy",
        body: [
          "The instructions point to a compact six level table, remember, understand, apply, analyze, evaluate, create, with typical verbs for each rung. A verb alone rarely settles the question, since the same word can carry different weight depending on the objective's full sentence, so the table is a starting point the wording then confirms or overrides.",
          "reference/verb-alignment-worked-example.md doubles as a downloadable objective to assessment verb checklist you can rerun against your own pairs, since it walks the identical five step method against three real objectives rather than describing the method in the abstract.",
        ],
      },
      {
        heading: "Judging what the question actually demands, not what it says",
        body: [
          "This is the step most reviews skip. A question's own wording can borrow a high level word loosely without demanding that level of thinking, and a question can demand real analysis or evaluation without using those words at all. The instructions require judging the task a student must perform to answer correctly, not the vocabulary the question uses.",
          "This is how the pair by pair check works, as an ai skill to match objectives to test questions rather than to match objectives to question wording: the two levels are each established independently, then compared.",
        ],
      },
      {
        heading: "What counts as a mismatch worth flagging",
        body: [
          "Only one direction of gap gets flagged: a question that demands less than its objective claims. An objective stated at Create, assessed by a question that only asks a student to execute a procedure someone else designed, is exactly this failure mode, and the worked example's third pair walks that case in full, including the rewrite that would close the gap.",
        ],
      },
      {
        heading: "How this differs from the assessment blueprint alignment skill",
        body: [
          "The assessment blueprint alignment skill asks a whole-test question: given a set of objectives with stated weights and a full test's worth of questions, does the actual question count per objective match the target count the weights call for. That is a coverage and distribution check across many questions at once, and it never asks what cognitive level any single question demands.",
          "This learning objective verb alignment skill asks a narrower question about one pair at a time: not how many questions test this objective, but whether the question that does test it demands the thinking the objective's verb claims. A test can pass a blueprint alignment check, with every objective tested the right number of times, while every pairing still fails a verb alignment check, since low level questions can satisfy a target count without matching their objective's claimed level.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not rewrite a mismatched question or a mismatched objective; it names the gap and leaves the fix to whoever owns the assessment. It never drafts a plausible sounding question to check an objective against when none was supplied, since inventing half of a pair would only ever check an invented question, not the real assessment a student will sit.",
        ],
      },
    ],
    howTo: {
      name: "How to use the learning objective verb alignment skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/verb-alignment-worked-example.md directly on this page, including the full worked example, before downloading anything.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather real objective and question pairs",
          text: "Collect each stated objective's exact wording alongside the exact wording of the assessment question actually paired with it. A topic label without the literal text of both cannot be checked.",
        },
        {
          name: "Hand both files to your assistant and request the pair by pair table",
          text: "Keep the folder structure intact so SKILL.md can point to the worked example, then supply your objective and question pairs and ask for the verb, the level, the demand, and the aligned or mismatched result for each one.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have the paired assessment question yet?",
        answer:
          "The skill's instructions say so plainly rather than drafting one to check the objective against. Its whole value comes from holding a real objective against a real question, so a missing pairing is reported as missing, not filled in with an invented question that only ever checks itself.",
      },
      {
        question: "How is this different from the assessment blueprint alignment skill?",
        answer:
          "That skill checks whether a whole test's question count is distributed across weighted objectives in the right proportion, a coverage question across many questions at once. This skill checks one objective against its own paired question, comparing its stated cognitive level to what that specific question actually demands.",
      },
      {
        question: "Does this skill flag a question that is harder than its objective claims?",
        answer:
          "No. It only flags a question that demands a lower cognitive level than its objective states, since that is the failure mode where an assessment cannot demonstrate the objective was met. A question demanding more than its objective claims is a separate concern, not the mismatch this skill targets.",
      },
      {
        question: "Can this be used for a whole set of objectives, or only one pair at a time?",
        answer:
          "Both. Each pair is checked individually with the same five step method, then the instructions call for one summary table across the batch, listing each objective's verb, its level, its question's demanded level, and the result, rather than an averaged score.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. As a free ai skill to check blooms taxonomy alignment, the file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the objectives or questions you eventually check with this skill are ever sent anywhere by this site.",
      },
      {
        question: "Can I edit the Bloom's verb table after downloading it?",
        answer:
          "Yes. Both files are plain Markdown text that open in any text editor, so you can extend the six level verb table with terms specific to your own subject or grade band. This page is a read only preview of the exact content that downloads.",
      },
      {
        question: "Does the skill work for objectives that don't start with an action verb?",
        answer:
          "The method depends on identifying a verb or verb phrase that names a cognitive task, so an objective written without one, for example a bare topic statement, needs to be rewritten into a verb led objective before this skill can assign it a Bloom's level to check against.",
      },
    ],
    internalLinks: [
      {
        href: "/education-skills/assessment-blueprint-alignment-skill",
        label: "assessment blueprint alignment skill",
        description: "Checks whether a whole test's question count matches stated objective weights, a coverage check rather than this skill's per-pair cognitive level check.",
      },
      {
        href: "/education-skills/quiz-question-quality-audit-skill",
        label: "quiz question quality audit skill",
        description: "Audits an individual question's own construction, such as distractor plausibility, a different concern from whether its cognitive level matches its objective.",
      },
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description: "Writes the stated learning objectives in the first place, the natural source of the objective half of the pairs this skill checks.",
      },
      {
        href: "/education-prompts/exam-question-prompt",
        label: "exam question prompt",
        description: "Writes the assessment items themselves, the natural source of the paired question half this skill checks against each objective.",
      },
    ],
    externalLinks: [
      {
        href: "https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/",
        label: "Vanderbilt Center for Teaching: Bloom's Taxonomy",
        description: "An independent university teaching centre's explainer of the six cognitive levels this skill's verb table is built from.",
      },
      {
        href: "https://www.celt.iastate.edu/instructional-strategies/effective-teaching-practices/revised-blooms-taxonomy/",
        label: "Iowa State CELT: Revised Bloom's Taxonomy",
        description: "Covers the revised taxonomy's verb lists per level in detail, the same six rungs this skill checks an objective's verb against.",
      },
      {
        href: "https://www.cmu.edu/teaching/designteach/design/alignment.html",
        label: "Carnegie Mellon Eberly Center: Aligning Objectives, Assessments, and Instruction",
        description: "Explains why an assessment has to demand the same thinking its objective states, the same principle this skill checks pair by pair.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to verb alignment checks.",
      },
    ],
  },

  tags: ["education", "learning objectives", "bloom's taxonomy", "assessment", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
