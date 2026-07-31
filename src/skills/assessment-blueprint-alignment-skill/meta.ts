import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Assessment Blueprint Alignment Check

Use this skill whenever you are handed a set of stated learning objectives
with their relative weights (for example, "Objective A: 40 percent of
instructional time, Objective B: 30 percent, Objective C: 30 percent")
together with an actual test's real question list, and asked whether the
test's questions are distributed across those objectives in something close
to the proportion the weights call for. This skill does not judge whether
any single question is well written. It judges whether the whole set of
questions, taken together, actually covers the stated objectives in the
right proportion.

## Before you check anything

Confirm you have both halves of the input: the full list of stated
objectives with an explicit weight for each one, and the full text of every
question on the actual test, not a topic label or a bare question count. A
check run against a summary like "the test covers unit three" without the
individual question text cannot map anything and should say so rather than
guessing at a distribution.

If the stated weights do not sum to 100 percent, say so before doing
anything else and ask which number is wrong, rather than silently
normalising them to make the arithmetic work.

## Map every real question to a stated objective

This is the discipline the whole skill exists to enforce. Do not estimate
the distribution from a skim of the test. For every question on the test, in
order:

1. Quote the question exactly as written (a close paraphrase is acceptable
   only for a long stimulus based item, provided the quoted stem itself is
   real, not summarised).
2. State which single stated objective the question actually tests, and the
   specific word or concept in the question that ties it to that objective.
3. If a question could arguably test two stated objectives, assign it to the
   one it tests most directly and note the ambiguity, rather than splitting
   its weight or ignoring it.
4. If a question does not clearly map to any stated objective, do not force
   it into the nearest one. Record it as unmapped and name what it actually
   appears to test instead.

Skipping straight to a distribution without this question by question
mapping is the single most common shortcut this skill exists to prevent, and
it produces a distribution nobody downstream can check.

## Compute the real distribution against the real weights

Once every question is mapped, follow the method worked in full in
\`reference/blueprint-worked-example.md\`:

1. Count the mapped questions per objective and divide by the total question
   count to get each objective's actual percentage share of the test.
2. Convert each objective's stated weight into a target question count for a
   test of this length, weight multiplied by total questions, so the target
   can be compared question for question, not only percentage for
   percentage.
3. Compare actual share to target share for every objective, including any
   objective that received zero questions.
4. Flag any objective whose actual share differs from its target share by
   more than 10 percentage points, or by more than one full question at this
   test length, whichever gap is larger. Flag every unmapped question
   separately; it does not count toward any objective's actual share.

Show this arithmetic as a table: objective, stated weight, target question
count, actual question count, actual percentage, gap, flag. A finding that
says a test "looks unbalanced" without that table is not a finding under
this skill.

## What counts as a real flag

A flag must name the objective, state its target share and its actual share
in numbers, and state the direction and size of the gap. "Objective B looks
under-tested" is not a flag. "Objective B is weighted 30 percent of the test,
a target of 3 of 10 questions, but received only 2 questions, 20 percent of
the test, a gap of 10 percentage points and one full question below target"
is a flag.

An unmapped question is its own flag category, separate from any objective's
over or under representation, because it represents test content nobody
assigned a stated purpose to, and because the total mapped question count
would otherwise silently overstate how many questions any objective actually
received.

## Reporting a result that is not unbalanced

If every objective's actual share falls within the gap threshold of its
target share and no question is unmapped, say so plainly, with the same
table, rather than manufacturing a marginal complaint to justify the review
having happened. A blueprint that already holds is a legitimate, useful
result and should be reported as one.

## How this differs from checking a single question's construction

This skill never evaluates whether an individual question is well written; a
poorly worded distractor, an ambiguous stem, or a crutch "all of the above"
option are all outside its scope even if one is noticed while mapping.
Checking construction quality question by question is a separate,
complementary check. This skill only ever asks whether the set of questions,
as a whole, was assembled in the proportion the stated objectives call for.

## What this skill does not do

It does not decide what the objectives or their weights should be; those
come from whoever set the blueprint and are taken as given. It does not
rewrite or replace questions, even an unmapped one; where a gap or an
unmapped question is found, name it and let whoever owns the test decide
whether to add, cut, or reweight. It does not average gaps across objectives
into one alignment score, since a test missing an entire objective is a
different, more urgent problem than a test that is a few points off on every
objective, and a single score would hide that difference from whoever has to
decide what to fix first.
`;

const BLUEPRINT_WORKED_EXAMPLE_MD = `# Worked example: three objectives, a ten question test

This file walks the method in \`SKILL.md\` against one concrete blueprint and
one concrete test, question by question and table row by table row, so a
check built from your own inputs can follow the same shape.

## The stated blueprint

A unit test on introductory cell biology is built against three stated
objectives.

- Objective A, cell structure: describe the structure and function of the
  main cell organelles. Weight: 40 percent of the test.
- Objective B, photosynthesis: explain the inputs, outputs, and stages of
  photosynthesis. Weight: 30 percent of the test.
- Objective C, cell comparison: compare prokaryotic and eukaryotic cells.
  Weight: 30 percent of the test.

The weights sum to 100 percent, so the blueprint is arithmetically valid
before any real question is checked against it.

## Target question counts for a ten question test

Multiply each weight by the total question count, 10, to get a target count
that can be compared question for question rather than only percentage for
percentage.

- Objective A target: 40 percent of 10 equals 4 questions.
- Objective B target: 30 percent of 10 equals 3 questions.
- Objective C target: 30 percent of 10 equals 3 questions.

The targets sum to 10, matching the test length, which confirms the target
counts before a single real question is mapped.

## The actual ten question test, mapped question by question

1. "Label the following diagram of a plant cell and name each organelle
   shown." Tests Objective A: names and identifies specific organelles, the
   exact skill Objective A states.
2. "Describe the function of the mitochondria in a cell." Tests Objective A:
   function of a specific named organelle.
3. "Which organelle is responsible for protein synthesis, and what is its
   structure?" Tests Objective A: structure and function of a named
   organelle.
4. "Explain what happens during the light dependent reactions of
   photosynthesis." Tests Objective B: a named stage of photosynthesis.
5. "List the inputs and outputs of photosynthesis." Tests Objective B:
   inputs and outputs, named directly in Objective B's own wording.
6. "Describe the structure of the cell membrane and its role in the cell."
   Tests Objective A: structure and function of a named cell component.
7. "Explain the role of the mitochondria in producing energy for the cell."
   Tests Objective A: function of a named organelle, close to question 2 but
   a distinct emphasis on energy production.
8. "Compare the presence of a nucleus in prokaryotic and eukaryotic cells."
   Tests Objective C: a direct structural comparison between the two cell
   types.
9. "Define osmosis and explain why it matters to a living cell." Unmapped:
   osmosis is a transport process, not named or implied by any of the three
   stated objectives, so it is recorded as unmapped rather than folded into
   Objective A on the loose basis that it is also about cells.
10. "Compare the size and complexity of prokaryotic and eukaryotic cells."
    Tests Objective C: a second structural comparison between the two cell
    types.

## The computed distribution against the stated weights

| Objective | Stated weight | Target count | Actual count | Actual percentage | Gap | Flag |
|---|---|---|---|---|---|---|
| A, cell structure | 40% | 4 | 5 (questions 1, 2, 3, 6, 7) | 50% | +10 points, +1 question | Over target |
| B, photosynthesis | 30% | 3 | 2 (questions 4, 5) | 20% | -10 points, -1 question | Under target |
| C, cell comparison | 30% | 3 | 2 (questions 8, 10) | 20% | -10 points, -1 question | Under target |
| Unmapped | n/a | 0 | 1 (question 9) | 10% | n/a | Unmapped question |

## Reading the result

Three flags follow directly from the table. Objective A is over-tested by
one full question against target, at 50 percent of the test against a
stated weight of 40 percent. Objective B and Objective C are each
under-tested by one full question against target, at 20 percent of the test
against a stated weight of 30 percent apiece. Question 9 is a separate flag
on its own: it tests a real skill, but not one any stated objective names,
so it should either be replaced with a question that tests one of the three
stated objectives, or the blueprint itself needs a fourth objective covering
cell transport before the test can be called aligned.

## What changes the verdict

If question 9 had instead tested, for example, cell membrane transport as a
specific sub point of Objective A's stated organelle function language, it
would map to Objective A instead of remaining unmapped, and Objective A's
actual count would rise to 6, widening its over-representation rather than
resolving it. The mapping step, not the final table, is where a check like
this can quietly go wrong, since a generous mapping of one borderline
question changes every number downstream of it.
`;

const meta: SkillMeta = {
  slug: "assessment-blueprint-alignment-skill",
  name: "Assessment Blueprint Alignment Check",
  title: "Assessment Blueprint Alignment Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that maps every real question on a test to the specific stated learning objective it tests, then computes the actual question distribution against the objectives' stated weights and flags any objective that is over or under represented.",

  seo: {
    primaryKeyword: "assessment blueprint alignment skill",
    keywords: [
      "assessment blueprint alignment skill",
      "free ai skill to audit test blueprint alignment",
      "downloadable table of specifications checklist",
      "ai skill to check exam question distribution",
      "how to check if a test matches learning objectives",
    ],
    seoTitle: "Assessment Blueprint Alignment Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable assessment blueprint alignment skill that maps every test question to its objective and checks the real distribution against stated weights.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/blueprint-worked-example.md", content: BLUEPRINT_WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard, checked against published table of specifications and test blueprint methodology.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked whether a test matches its stated learning objectives tend to skim the question list and offer a general impression of balance, without mapping each question to a specific objective or computing actual counts against the stated weights. A blueprint can look intuitively fine while one heavily weighted objective is quietly tested by a single question, or not tested at all. This skill's question by question mapping step, followed by an explicit target versus actual table, turns a guess about balance into an arithmetic check anyone can verify against the same two inputs.",
  },

  article: {
    intro: [
      "An assessment blueprint alignment skill has one specific job: given a set of stated learning objectives with their relative weights, and the real question list from an actual test, check whether the questions on that test are distributed across the objectives in something close to the proportion the weights call for. Most balance checks stop at a glance and a gut call of 'looks about right,' which misses an objective tested by a single question, or not tested at all.",
      "This skill assumes both halves of the input already exist: a blueprint of objectives and weights, and a finished test. It maps every question to the specific objective it actually tests, or flags it as unmapped, then computes each objective's real share and compares it to its stated target. This page is the practical answer to how to check if a test matches learning objectives: map, count, compare.",
      "It ships as two plain text files, a main instructions file and a fully worked reference example with three weighted objectives and a ten question test. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "What a blueprint alignment check actually verifies",
        body: [
          "A stated blueprint names objectives and gives each one a weight, a photosynthesis unit might carry 40 percent against 30 percent each for two others. That weight is a promise about how the eventual test should be built. This skill's whole job is checking whether the finished test kept that promise, not whether the objectives themselves are right or whether any single question is well constructed.",
          "That distinction matters because a test can be full of well written, individually defensible questions and still badly misrepresent its own blueprint, if most of those good questions happen to cluster on one objective while another goes almost untested.",
        ],
      },
      {
        heading: "Mapping every real question to its stated objective",
        body: [
          "The skill's central discipline is refusing to estimate a distribution from a skim of the test. Every question gets quoted, assigned to the single stated objective it most directly tests, and the specific word or concept tying it to that objective gets named. An unclear question is recorded as unmapped rather than folded into the nearest plausible category.",
          "Skipping this step and guessing at a distribution from question topics alone is exactly the shortcut this ai skill to check exam question distribution exists to prevent, because a guessed distribution cannot be checked by anyone reading the report afterward.",
        ],
      },
      {
        heading: "Computing the real distribution against the real weights, a worked example",
        body: [
          "reference/blueprint-worked-example.md carries the method through a full example: three objectives weighted 40, 30, and 30 percent, and a real ten question test. Target counts come out to 4, 3, and 3 questions; actual mapped counts come out to 5, 2, and 2, plus one unmapped question. The first objective ends up over target by one question, 50 percent against a stated 40, and the other two are each under target by one question, 20 percent against a stated 30 apiece.",
          "That same table is what this skill's instructions require for any real blueprint and test, not only the worked example, which is why the reference file doubles as a downloadable table of specifications checklist you can rerun on your own inputs.",
        ],
      },
      {
        heading: "What counts as a real flag",
        body: [
          "A flag names the objective, states its target and actual share as numbers, and states the size and direction of the gap. 'This objective looks under-tested' is not a flag; a 30 percent target against a 20 percent actual, a gap of 10 points and one question, is. An unmapped question is flagged separately, since it is test content nobody assigned a stated purpose to.",
        ],
      },
      {
        heading: "How this differs from auditing individual question quality",
        body: [
          "A quiz question quality audit skill reads a set of finished questions and asks whether each one, on its own, is constructed well, checking things like distractor plausibility and grammatical leakage in the stem. This assessment blueprint alignment skill asks a completely different, higher level question about the same set of questions: not whether any one item is well built, but whether the set as a whole covers the stated objectives in the proportion their weights call for.",
          "A test can pass every item check and still fail a blueprint alignment check if its well constructed questions are badly distributed, and a test can fail several item checks while still being proportionally aligned. The two checks are complementary, not substitutes, and running only one leaves the other kind of defect invisible.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not decide what the objectives or their weights should be; those are taken as given. It does not rewrite or replace a question, including an unmapped one; it names the gap and leaves the decision with whoever owns the test. It also does not average gaps into a single alignment score, since a test missing an entire objective is more urgent than one a few points off everywhere, a difference an averaged score would hide.",
        ],
      },
    ],
    howTo: {
      name: "How to use the assessment blueprint alignment skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/blueprint-worked-example.md directly on this page, including the full worked example, before downloading anything.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the stated objectives and the real test",
          text: "Collect the full list of objectives with an explicit weight for each one, and the full text of every question on the actual test, not a topic summary or a bare count.",
        },
        {
          name: "Hand both files to your assistant and request the table",
          text: "Keep the folder structure intact so SKILL.md can point to the worked example, then supply your blueprint and test and ask for the question by question mapping and the target versus actual table.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill judge whether individual questions are well written?",
        answer:
          "No. It only checks whether the set of questions, taken together, is distributed across the stated objectives in the proportion their weights call for. Whether any single question has a plausible set of distractors or a clean stem is outside its scope entirely, even if a construction problem is noticed while mapping a question to its objective.",
      },
      {
        question: "What happens if the stated weights don't sum to 100 percent?",
        answer:
          "The skill's instructions say so before doing anything else and ask which number is wrong, rather than silently normalising the weights to make the later arithmetic come out even. A blueprint with weights that do not add up is a defect in the blueprint itself, separate from any question distribution problem.",
      },
      {
        question: "How is this different from the quiz question quality audit skill?",
        answer:
          "That skill reads a finished set of questions and checks each one's own construction against six named rules, like distractor plausibility and grammatical leakage. This skill asks a different, higher level question about the same test: whether the questions as a whole cover the stated objectives in the right proportion. A test can pass one check and fail the other.",
      },
      {
        question: "What happens to a question that doesn't clearly map to any stated objective?",
        answer:
          "It is recorded as unmapped rather than forced into the nearest plausible objective. The skill's instructions treat an unmapped question as its own flag, separate from any objective's over or under representation, since it is test content nobody assigned a stated purpose to.",
      },
      {
        question: "Can this be used for a certification exam instead of a classroom test?",
        answer:
          "Yes. The method only needs two inputs, a set of weighted objectives and a real question list, so it applies equally to a classroom unit test, a certification exam built against a stated content outline, or any other assessment where a blueprint of weighted objectives already exists.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. As a free ai skill to audit test blueprint alignment, the file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the objectives or test questions you check with this skill are ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/education-skills/quiz-question-quality-audit-skill",
        label: "quiz question quality audit skill",
        description: "Checks whether each individual question is well constructed, a different and complementary check to this skill's whole-test coverage question.",
      },
      {
        href: "/education-prompts/exam-question-prompt",
        label: "exam question prompt",
        description: "Writes the summative items to a mark total in the first place, the natural input this skill's blueprint check is run against afterward.",
      },
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description: "Generates a new set of diagnostic questions from lesson notes, a second natural source of the finished test this skill checks for balance.",
      },
      {
        href: "/education-prompts/curriculum-mapping-prompt",
        label: "curriculum mapping prompt",
        description: "Checks specification coverage across an entire scheme of work, the same proportional discipline applied one level up from a single test.",
      },
    ],
    externalLinks: [
      {
        href: "https://assess.com/test-blueprints-specifications/",
        label: "Assessment Systems: Test Blueprints & Specifications",
        description: "An assessment measurement vendor's explainer on how a test blueprint lists content areas and the relative weight assigned to each before items are written.",
      },
      {
        href: "https://www.proftesting.com/test_topics/steps_3.php",
        label: "Professional Testing, Inc: Developing Test Specifications",
        description: "A professional testing consultancy's step by step guide to building a test blueprint as a matrix of content areas against cognitive levels.",
      },
      {
        href: "https://www.blackboard.com/blog/using-blueprints-to-align-course-objectives-with-assessments",
        label: "Blackboard: Using Blueprints to Align Course Objectives with Assessments",
        description: "Explains how weighting content importance in a blueprint is what later lets a finished test be checked against its own stated objectives.",
      },
      {
        href: "https://teachers.institute/instruction-in-higher-education/develop-blueprint-question-paper/",
        label: "Teachers Institute: How to Develop a Blueprint for a Question Paper",
        description: "Works a real example of allocating exam items proportionally to instructional time per topic, the same proportional method this skill checks after the fact.",
      },
    ],
  },

  tags: ["education", "assessment", "test blueprint", "learning objectives", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
