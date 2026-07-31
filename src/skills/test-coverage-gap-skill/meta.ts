import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Test Coverage Gap Skill

Use this skill when you are given a description of code (a diff, or a
function's logic) and a description of the tests that already exist for it,
and the job is to find exactly which branches and edge cases those tests do
not exercise. This skill does not write the missing tests. Its only job is
to name, precisely, what is not covered.

## What you need before you start

Two inputs are required, not one:

1. A description of the code under test: a diff, or a plain description of
   the function's logic, including every conditional, loop, early return,
   and error path.
2. A description of the existing tests: what each test calls the function
   with, and what it asserts.

If either input is missing or too vague to reconstruct the actual branches
(for example "there is a function that processes orders" with no logic
described), say so and ask for the missing detail rather than guessing at
the shape of the code. A gap analysis run against an imagined function is
worthless, and reporting confident sounding gaps for code you cannot
actually see is worse than reporting nothing.

## Step 1: list every distinct code path

From the code description, enumerate every branch a control flow diagram
would show: each if, else if and else, each loop and what happens when it
runs zero times, once, and many times, each early return, each try or catch
or equivalent, and each place a default value substitutes for a missing
argument. Number them. This list is the ground truth the tests get checked
against, never the other way round.

## Step 2: map each existing test to the paths it actually exercises

For each test described to you, decide which numbered path from step 1 it
exercises, based only on the actual input it passes and the assertion it
makes, never based on the test's name. A test named test_handles_empty_list
that is described as calling the function with a list of three items does
not cover the empty list path, whatever its name claims.

## Step 3: report the gaps by name, not by feeling

For every path from step 1 that no test maps to, write one gap entry. A gap
entry must say what specific input or condition is missing, referencing the
actual branch, for example: "the if (list.length === 0) branch has no test
exercising an empty list" or "no test calls the function with a negative
amount, so the validation if (amount < 0) throw branch is unverified." Do
not write "needs more edge case tests," "coverage could be improved," or any
comment that does not name a concrete input or path. If you cannot name the
specific input that would exercise a path, that means step 1 is not finished
yet, not a reason to fall back on a vague comment.

Order the reported gaps by risk: an unguarded error path or a boundary on
user controlled input usually matters more than an internal helper's rare
branch. State plainly that this ordering is a judgement call, not a measured
fact.

## Step 4: cross check with reference/edge-case-categories.md

Before finishing, run the enumerated paths against the categories in
reference/edge-case-categories.md: empty and null input, boundary values,
error and exception paths, concurrent or duplicate calls, and the untaken
branch of every conditional. For any category that plausibly applies to the
code under test but was not already covered in step 1's path list because
the description did not make it explicit, raise it as a question rather than
inventing a branch that might not exist, for example: "does the function
handle a null argument, or does the type system rule that out? The
description given does not say."

## What this skill does not do

It does not write the missing tests. Naming a gap and writing a correct test
for it are different jobs with different failure modes, and keeping them
separate means a gap report stays honest about what it found instead of
getting padded with generated test code nobody asked for. It also never
modifies the code under test and never invents behaviour the description did
not state.

## The limitation you must state every time

This analysis reasons from a description of the code and a description of
the tests, not from running an instrumented test suite. It cannot see a
branch nobody described, it cannot detect a test that silently fails to run,
and it cannot catch a mismatch between what a test's description claims and
what the test file actually does. Every gap report produced with this skill
must end with an explicit statement of that limitation and a recommendation
to run real coverage tooling, branch coverage rather than only line
coverage, against the actual test suite to confirm the reported gaps and
catch anything this description based pass could not see.
`;

const EDGE_CASE_CATEGORIES_MD = `# Edge case categories to check systematically

Use this alongside SKILL.md. Each category below is a lens to hold up
against the enumerated code paths from step 1, not a checklist to tick
mechanically. A category only produces a real gap entry when it points at a
specific branch or input the code description actually contains.

## 1. Empty, missing and null input

- What to check: what happens when a list, string or collection argument is
  empty rather than absent entirely, and what happens when an argument is
  null, undefined or not passed at all, if the language allows that.
- Common miss: a test suite that covers "a normal list" and "a list with one
  item" but never an empty list, so a loop that assumes at least one
  iteration is never actually exercised.
- How to report it: name the exact branch, for example "no test passes an
  empty array, so the early return on line handling zero items is
  unverified," not "should test empty input."

## 2. Boundary values

- What to check: the smallest and largest values a numeric or length bound
  accepts, and the value immediately on each side of that bound. If a
  function accepts values from 1 to 100, the boundary values are 0, 1, 100
  and 101.
- Common miss: tests that only use comfortably mid range values, so an off
  by one in a comparison like less than versus less than or equal to a limit
  is never caught.
- How to report it: name the specific bound and the exact untested value on
  either side of it, referencing the comparison operator in the code
  description if one was given.

## 3. Error and exception paths

- What to check: every place the code description says an error is raised,
  a rejection returned, or a failure state entered, and whether any test
  actually triggers that condition and asserts on the resulting error rather
  than only asserting on the success path.
- Common miss: a validation branch that raises on bad input exists in the
  code description, but every described test supplies valid input, so the
  branch that raises is never reached by any test.
- How to report it: name the exact condition that triggers the error and
  state that no described test supplies an input meeting that condition.

## 4. Concurrent and duplicate calls

- What to check: what the code description implies happens if the same
  operation runs twice with the same input, or if two calls overlap in time
  against shared state such as a cache, a counter or a stored record.
- Common miss: a function that is meant to be idempotent, safe to call again
  with the same input, has tests for a single call only, so a second call
  producing a different result would pass every existing test.
- How to report it: name the specific shared state or side effect at risk
  and state plainly that no described test calls the function more than once
  against the same input or state.

## 5. The else of every conditional

- What to check: for every if described, whether a test exists for the
  condition being true and a separate test for it being false. A single
  test that only exercises the true branch leaves the else, even an implicit
  one with no code in it, completely unverified.
- Common miss: an early validation check that most inputs pass, so every
  described test happens to satisfy it, leaving the rejection path silently
  uncovered.
- How to report it: name the specific condition and state which of the two
  outcomes, true or false, has no matching test.

## 6. Type, format and default value edge cases

- What to check: if the code description mentions type coercion, string
  parsing, date handling or a default value substituting for a missing
  argument, whether any described test supplies a value that actually
  exercises that conversion or default rather than always supplying an
  already well formed value.
- Common miss: a function that parses a date string only ever receives a
  correctly formatted date across the described tests, so malformed input
  handling is unverified despite existing in the code description.
- How to report it: name the specific parsing or default logic and the
  malformed or missing value that would exercise it.

## How to use this file when the code description is thin

If the description given does not mention enough detail to know whether a
category applies, for example it does not say whether an argument can be
null, do not invent a branch to report as a gap. Ask the question directly
instead, so the person supplying the description can confirm whether that
branch exists at all before it gets treated as untested.
`;

const meta: SkillMeta = {
  slug: "test-coverage-gap-skill",
  name: "Test Coverage Gap Finder",
  title: "Test Coverage Gap Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that reads a description of changed code and its existing tests, then names the specific untested branches and edge cases rather than issuing a vague call for more tests.",

  seo: {
    primaryKeyword: "test coverage gap skill",
    keywords: [
      "test coverage gap skill",
      "free ai skill for test coverage gaps",
      "downloadable test coverage gap checklist",
      "ai skill to find untested edge cases",
      "how to identify untested code branches",
    ],
    seoTitle: "Test Coverage Gap Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable test coverage gap skill that names specific untested branches and edge cases from a code description instead of vague advice.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/edge-case-categories.md", content: EDGE_CASE_CATEGORIES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts engineering editorial team against this site's authoring standard for analytical, non-generative skills.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review coverage from a description alone, models default to a generic line such as add more edge case tests or consider null inputs, without tying the comment to a specific branch in the code that was actually described. This skill's path enumeration step forces every reported gap to name the exact conditional, loop behaviour or input value lacking a test, and requires the output to state plainly that the analysis rests on a description rather than instrumented coverage data.",
  },

  article: {
    intro: [
      "A test coverage gap skill only earns its name if every line it produces points at a specific untested branch. Handed a function's logic and a summary of its tests, most AI assistants default to a closing comment like 'consider adding more edge case tests,' which reads as diligence and names nothing a reviewer can act on. This skill is built to refuse that shortcut, which is what makes it a free ai skill for test coverage gaps worth trusting rather than a generic writing aid wearing a testing label.",
      "It ships as two plain text files: a main instructions file that walks through a four step gap finding process, and a reference file of edge case categories the process checks against systematically. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "It is deliberately narrow. It does not write tests, and it does not run your test suite. It reads two descriptions, a description of the code and a description of what the existing tests actually do, and reports exactly where they stop overlapping.",
    ],
    sections: [
      {
        heading: "Why 'add more edge case tests' is not a gap report",
        body: [
          "A comment that recommends more coverage without naming a branch or an input is unfalsifiable. Nobody can check whether it was addressed, because it never said what was missing in the first place. This skill's instructions treat that kind of comment as a failure state: every gap entry has to reference a specific conditional, loop behaviour, or input value pulled directly from the code description, not a general impression that testing could be better.",
          "That discipline is what turns 'needs more tests' into something checkable: the exact branch, the exact input that would exercise it, and the exact test that is currently missing.",
        ],
      },
      {
        heading: "The two inputs this skill needs before it starts",
        body: [
          "A useful gap analysis needs both a description of the code, a diff or a plain account of the function's logic including every conditional and error path, and a description of what the existing tests actually call and assert. Given only one of the two, the skill's instructions say to ask for the missing piece rather than guess. A gap report built against an imagined function or an assumed test suite is not analysis, it is fiction dressed as review.",
          "Knowing how to identify untested code branches starts with treating both descriptions as required evidence rather than optional context, since a path list built from a partial description will confidently miss branches that were simply never mentioned.",
        ],
      },
      {
        heading: "How the four step process works, as an ai skill to find untested edge cases",
        body: [
          "The process runs in order: enumerate every distinct code path from the description, map each described test to the paths it actually exercises based on its input and assertion rather than its name, report every unmapped path as a named gap, then cross check the whole list against the categories in the bundled reference file. A test called test_handles_empty_list that the description says calls the function with three items does not get credit for covering the empty case.",
        ],
      },
      {
        heading: "The honesty limitation: this is analysis, not a coverage tool",
        body: [
          "This skill reasons from a description of code and a description of tests. It never runs an instrumented test suite, so it cannot see a branch nobody described, cannot detect a test that silently fails to execute, and cannot catch a mismatch between what a test's description claims and what the test file on disk actually does. Every report this skill produces has to end by stating that limitation plainly and recommending real branch coverage tooling be run against the actual suite to confirm what was found.",
          "That constraint is not a disclaimer bolted on afterward. It shapes step 4 directly: where the description leaves a category ambiguous, such as whether an argument can be null, the instructions require asking the question instead of inventing a branch to report as a gap.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not write the missing tests, and it does not modify the code under review. Naming a gap and writing a correct test for it are different jobs with different ways to go wrong, and keeping them separate keeps a gap report from getting padded with generated test code nobody asked for. It also never invents behaviour, a branch, or an argument type the code description did not actually state. A test coverage gap skill that starts writing tests has stopped being a gap skill and become something else.",
        ],
      },
      {
        heading: "How to use the downloaded files as a downloadable test coverage gap checklist",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file explicitly points to the categories file by its relative path. Supply the code description and the test description in the same message, and expect a numbered path list, a mapped coverage list, and a final gap report ending in the coverage tooling caveat.",
        ],
      },
    ],
    howTo: {
      name: "How to use the test coverage gap skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/edge-case-categories.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the diff and the test summary",
          text: "Write out the function's logic or paste the diff, then describe what each existing test calls the function with and what it asserts.",
        },
        {
          name: "Hand both files to your assistant and run real coverage after",
          text: "Keep the folder structure intact so SKILL.md can point to the reference file, supply your two descriptions, then confirm the reported gaps by running actual branch coverage tooling against your suite.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill write the missing tests for me?",
        answer:
          "No. It only identifies and names specific untested branches and edge cases. Writing a correct test for a named gap is a different task with different failure modes, and this skill deliberately stays narrow so its gap reports stay honest instead of padded with generated test code nobody asked for.",
      },
      {
        question: "How is this different from a unit test prompt?",
        answer:
          "A unit test prompt like this site's unit test prompt is built to generate the tests themselves from a stated contract. This test coverage gap skill does the opposite job: given tests that already exist, it identifies which specific branches and inputs those tests do not cover, and stops there rather than producing new test code.",
      },
      {
        question: "Why does it insist on naming a specific branch instead of just saying more tests are needed?",
        answer:
          "A comment that recommends more coverage without naming a branch cannot be checked or acted on. This skill's instructions treat a vague recommendation as a failure state, requiring every reported gap to reference the exact conditional, loop, or input value pulled from the code description that was actually given.",
      },
      {
        question: "Why doesn't this replace running real coverage tooling?",
        answer:
          "Because it reasons from a description rather than executing an instrumented test suite. It cannot see a branch nobody described, cannot detect a test that silently fails to run, and cannot verify that a test's description matches what the test file actually does, which is exactly why every report it produces recommends confirming the findings with real branch coverage tooling.",
      },
      {
        question: "What happens if I only give it the code and not the existing tests?",
        answer:
          "The skill's instructions require both inputs before starting, so it asks for the missing description of the existing tests rather than guessing at what might already be covered. A gap analysis built against an assumed test suite would be fiction rather than a real check.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads, and editing happens afterward in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description: "For writing the tests themselves from a stated contract, once this skill has told you which branches are missing coverage.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "A natural companion pass over the same diff this skill is checking for coverage gaps.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description: "For isolating the cause once a gap this skill reported turns out to hide a real defect.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing exactly what changed in a diff before describing its logic to this skill.",
      },
    ],
    externalLinks: [
      {
        href: "https://martinfowler.com/bliki/TestCoverage.html",
        label: "Martin Fowler: Test Coverage",
        description: "An independent explainer on why a coverage percentage is a diagnostic for finding untested code, not a quality target on its own.",
      },
      {
        href: "https://coverage.readthedocs.io/en/latest/branch.html",
        label: "coverage.py: Branch Coverage",
        description: "Documentation for real branch coverage instrumentation, the tooling this skill's reports recommend running to confirm its findings.",
      },
      {
        href: "https://testing.googleblog.com/2014/07/measuring-coverage-at-google.html",
        label: "Google Testing Blog: Measuring Coverage at Google",
        description: "A real world account of the limits of coverage measurement at scale, including branches automated instrumentation struggles to reach.",
      },
      {
        href: "https://www.geeksforgeeks.org/software-testing-boundary-value-analysis/",
        label: "GeeksforGeeks: Boundary Value Analysis",
        description: "A concrete reference for the boundary value category this skill's edge case checklist checks systematically.",
      },
    ],
  },

  tags: ["coding", "testing", "coverage", "code review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
