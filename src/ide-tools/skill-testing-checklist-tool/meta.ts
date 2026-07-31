import type { IdeToolMeta } from "@/lib/ide-tool-types";

const TESTS_MD_TEMPLATE = `# Skill Test Log

Keep this file next to the skill you are drafting. Every row is one test case: a real
looking input, the verdict the skill should produce for it, and whether the current draft
actually produces that verdict yet. Do not delete a row once it exists, even after it turns
green, because a full log of pass and fail history is what proves the skill was actually
checked rather than assumed to work.

## How to read this table

- Input: the material you would actually hand the skill, written out in full, not
  summarised.
- Expected verdict: what a careful person, reading the skill's own SKILL.md rules, would say
  the correct answer is.
- Actual result: what your current draft produced when you ran it against that input, word
  for word or close to it.
- Status: Pass when actual matches expected, Fail when it does not, Not yet checked when the
  row is written but has not been run yet.

## Test log

| # | Input | Expected verdict | Actual result | Status | Notes |
|---|---|---|---|---|---|
| 1 | "Priya will send the updated pricing sheet to finance for sign off by Friday." | COMPLETE. Owner: Priya. Date: by Friday. Action: send the updated pricing sheet to finance for sign off. | COMPLETE, matching the owner, date and action exactly as written in the source. | Pass | Clean pass case. Confirms the draft accepts a fully specified item without adding anything the source did not actually say. |
| 2 | "The team will look into the pricing question soon." | INCOMPLETE. OWNER fails because "the team" is not a single named person. DATE fails because "soon" is not a real due date. ACTION fails because "look into" names a topic, not a concrete action. | COMPLETE. The draft treated "the team" as an acceptable owner and did not flag the missing date or the vague action. | Fail | Clear fail case. The draft is currently too lenient on group ownership and needs its OWNER check tightened before this skill ships. |
| 3 | Add your own edge case here, written right up against the skill's stated boundary or refusal condition. | Write what the skill's own rules say should happen at that exact boundary. | Leave blank until you have actually run this input against the draft. | Not yet checked | Copy this row for every new test case. Never mark a row Pass from memory; only mark it Pass after actually running the input. |

## Before you ship

A skill is not ready to ship because it reads well. It is ready when every row above says
Pass, including the edge case, and the fail case from row two has actually been fixed and
re-tested, not just noted as a known issue. See reference/testing-guide.md for how to pick
the next test case once these three rows are covered.
`;

const TESTING_GUIDE_TEMPLATE = `# Picking test cases for a skill draft

A skill test log is only as useful as the cases written into it. Three categories, together,
catch nearly every real defect: a clean pass case, a clear fail or flag case, and an edge
case sitting right on the skill's stated boundary or refusal condition. Skipping any one of
them leaves a specific kind of mistake with nowhere to get caught before a real user hits it.

## The clean pass case

Write an input that clearly should produce the skill's best possible verdict, with every
requirement genuinely present and nothing borderline about it. Use the exact wording a real
input would actually have, not a simplified stand in written to be easy to judge. This case
exists to confirm the draft accepts a fully correct input as correct, and, just as important,
that it does not add or invent detail the source material never actually stated.

## The clear fail or flag case

Write an input that is obviously missing what the skill requires, with the gap plain enough
that a person reading the skill's own rules would reach the same verdict without hesitating.
A group name standing in for a named owner, a vague timeframe standing in for a real date, a
topic standing in for a concrete action: pick whichever failure mode the skill actually
exists to catch, and make it unmistakable rather than subtle. If the draft passes this case
anyway, that is the single most important thing the log can catch, because a skill that
cannot flag an obvious failure will not catch a subtle one either.

## The edge case near the boundary

Write a third input that sits right at the line the skill's own rules draw, not comfortably
on either side of it. If a skill's rule names a specific threshold, a specific required
element, or a specific condition under which it should refuse to give a verdict at all, the
edge case tests exactly that condition, worded as close to the boundary as a real input
plausibly gets. This is the case most drafts get wrong first, because the rules that sound
clear in SKILL.md often turn out to be ambiguous the first time a real, borderline input is
actually run through them.

## Where to find realistic input material

Pull real looking material from wherever the skill will actually be used: a real meeting
note, a real support ticket, a real piece of code, reworded only enough to remove anything
identifying. An input invented purely to be easy to judge tends to be cleaner than anything
the skill will meet in practice, which hides exactly the ambiguity a test case exists to
surface in the first place.

## Re-run every row after every edit

A fix aimed at the fail case can quietly change how the skill treats the pass case or the
edge case, so every edit to the skill's own file earns a full re-run of the log, not just the
row that prompted the change. A row marked Pass from an earlier draft is not still true
evidence once the underlying rules have changed underneath it.

## Knowing when the skill is ready

A skill is ready to ship once all three categories are represented in the log, every row is
marked Pass rather than Not yet checked, and the fail case specifically has been re-tested
after whatever fix addressed it. Fewer than three categories, or a log with untested rows
still sitting at Not yet checked, is not evidence the skill works; it is only evidence nobody
has finished checking it yet.
`;

const meta: IdeToolMeta = {
  slug: "skill-testing-checklist-tool",
  title: "Skill Testing Checklist Tool: Log Test Cases Before You Ship a Skill",
  name: "Skill Testing Checklist",
  category: "skill-authoring-tools",
  summary:
    "Open a starter TESTS.md test log with two worked example rows and a guide on picking good test cases, ready to fill in against your own skill draft before it ships.",
  seo: {
    primaryKeyword: "skill testing checklist tool",
    keywords: [
      "skill testing checklist tool",
      "test cases for ai skills",
      "skill test log template",
      "how to test an ai skill before shipping",
      "free skill testing checklist for ai skills",
    ],
    seoTitle: "Skill Testing Checklist Tool: Log Test Cases Free",
    seoDescription:
      "A free skill testing checklist tool that opens a working TESTS.md test log and a testing guide in the browser, ready to fill in and download as a .zip.",
  },
  files: [
    { path: "TESTS.md", content: TESTS_MD_TEMPLATE, kind: "markdown" },
    { path: "reference/testing-guide.md", content: TESTING_GUIDE_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured around the same pass, fail and edge case categories a manual QA test plan uses, adapted to the verdict format a skill's own SKILL.md file defines.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A skill draft that reads clearly is not the same thing as a skill draft that produces the right verdict on a real input, and the gap between the two usually surfaces only once someone other than the author runs it. Skill authors who skip a written test log tend to trust a draft's polished prose right up until a genuinely ambiguous or borderline input reveals a defect after the skill has already shipped. A running log that records the input, the expected verdict and the actual result side by side, rather than a memory of roughly how testing went, is what keeps that defect from shipping in the first place.",
  },
  article: {
    intro: [
      "This skill testing checklist tool opens a two file starter kit in your browser: a TESTS.md test log already filled in with two worked example rows, and a reference/testing-guide.md file on choosing good test cases for a skill still in draft. Nothing here is generated when the page loads; both files are real, working starting content, ready to be extended and downloaded once you are testing your own skill.",
      "A test log is a different artifact from a worked example embedded inside a skill itself. It lives outside the skill, is written by the person authoring it rather than for the assistant that will run it, and its job is to record whether the current draft actually produces the right verdict on real inputs, not to teach a method through one case in prose.",
      "Everything runs in the browser tab this page opens, the same shared editor every builder tool in the skill authoring tools category uses: edit the two files, add a row, import a skill's existing .zip alongside the log, and download the finished skill testing checklist tool output once every case is checked and passing.",
    ],
    sections: [
      {
        heading: "Why a skill needs a test log before it ships",
        body: [
          "A skill's SKILL.md file can read as complete and confident, and still get the actual verdict wrong on a real input the moment someone other than its author runs it. Prose that sounds right and a method that actually produces the correct verdict on real material are two different things, and closing that gap is what a skill testing checklist tool exists for before a skill goes anywhere near real use.",
        ],
      },
      {
        heading: "Choosing test cases for ai skills that actually catch defects",
        body: [
          "Three kinds of test case, together, catch nearly every real defect a skill draft can have. A log with only clean pass cases proves almost nothing, because it never gives the draft a chance to get anything wrong.",
        ],
        list: [
          "A clean pass case, with every requirement the skill checks for genuinely present.",
          "A clear fail or flag case, with the missing element obvious enough that the verdict is not in doubt.",
          "An edge case worded as close as a real input gets to the line the skill's rules draw, including any stated refusal condition.",
        ],
      },
      {
        heading: "Filling in the skill test log template row by row",
        body: [
          "TESTS.md opens with two worked rows already filled in, one that passes and one the draft gets wrong, so the format is never left to guess at from a blank table. Each row records the input, the verdict the skill's rules say is correct, what the draft actually produced, and a status of Pass, Fail or Not yet checked. Copy the third, unfilled row for every new case.",
        ],
      },
      {
        heading: "How to test an ai skill before shipping: what Not yet checked actually means",
        body: [
          "A row marked Not yet checked is an honest admission that nobody has run that input against the draft yet, and it should stay that way rather than being guessed into a Pass to make the log look further along than it is. Marking a row Pass without running it defeats the point of the log, since the whole reason it exists is to replace a guess about the skill's behaviour with an observed result.",
        ],
      },
      {
        heading: "What this free skill testing checklist for ai skills does not do",
        body: [
          "This tool does not run the skill for you, does not generate expected verdicts, and does not judge whether your skill's own rules are any good; it only gives you the format to record what you find. Deciding the correct verdict for a given input still requires reading the skill's own SKILL.md carefully.",
        ],
      },
      {
        heading: "How this differs from the AI skill builder's worked example file",
        body: [
          "The AI skill builder tool's reference/example-input.md is a single fully worked walkthrough that ships inside a finished skill, written to teach the assistant running it what a correct answer looks like on one representative case. This tool's TESTS.md is the opposite kind of artifact: a running log kept outside the skill, written by the person authoring it, that grows with every new input tried and stays with the project after the skill ships. One teaches the model; the other checks the author's own work first.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import an existing .zip, reset to the starter content, or download the current file set. Importing a skill's own .zip alongside this test log keeps both in one session, and nothing about either file's contents is sent anywhere before the download is rebuilt client side.",
        ],
      },
    ],
    howTo: {
      name: "How to build a skill testing checklist for your draft",
      steps: [
        { name: "Read the two worked example rows", text: "Open TESTS.md and read the pass case and the fail case already filled in, so the format is clear first." },
        { name: "Write a clean pass case", text: "Add a row with a real looking input every requirement in your skill's rules is genuinely met by." },
        { name: "Write a clear fail or flag case", text: "Add a row with an input obviously missing what your skill checks for, worded plainly enough that the verdict is not in doubt." },
        { name: "Write an edge case at the boundary", text: "Add a row worded close to your skill's stated boundary or refusal condition, per reference/testing-guide.md." },
        { name: "Run each case against your draft skill", text: "Hand each input to the skill as written, record the actual result, and mark the row Pass, Fail or Not yet checked." },
        { name: "Fix, re-test and download the finished log", text: "Re-run every row after any change to the skill's file, then download TESTS.md once every row reads Pass." },
      ],
    },
    faq: [
      {
        question: "Do I need a specific test case format to use this skill testing checklist tool?",
        answer:
          "No. TESTS.md uses a plain markdown table with an input, an expected verdict, an actual result and a status column, the same structure shown in the two worked rows already filled in. It reads as ordinary markdown and needs no specialised software beyond the browser editor.",
      },
      {
        question: "Is anything typed into the editor saved or uploaded anywhere?",
        answer:
          "No. The editor keeps every change only in the browser tab's own memory for the length of the visit, and nothing about a test case or a skill's own files is sent to a server. Downloading the finished .zip before closing the tab is the only way the work is kept.",
      },
      {
        question: "How many test cases does a skill actually need before it is ready to ship?",
        answer:
          "At minimum, one from each category reference/testing-guide.md describes: a clean pass case, a clear fail or flag case, and an edge case at the skill's stated boundary. A log missing any one of the three categories has not actually been checked in the way that matters.",
      },
      {
        question: "What counts as a good edge case for a skill?",
        answer:
          "A good edge case sits as close as a real input plausibly gets to the exact line a skill's own rules draw, rather than comfortably on either side of it, including any condition under which the skill should refuse a verdict entirely. It is usually the case a first draft gets wrong.",
      },
      {
        question: "Can this tool be used to test a skill that was not built on this site?",
        answer:
          "Yes. TESTS.md and the testing guide describe a format for recording an input, an expected verdict, an actual result and a status, and that format does not depend on where the skill itself was written or which platform it eventually runs on. Importing the skill's own .zip alongside the log keeps both in one editing session.",
      },
      {
        question: "Does this tool run the skill and fill in the actual result column automatically?",
        answer:
          "No. Running each input against the draft and recording what it actually produced is still a manual step done outside this page, since the tool provides the log format rather than a way to execute a skill. Filling in the actual result honestly is what makes the log worth keeping.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Start a new skill with the AI skill builder tool",
        description: "Build the SKILL.md and reference file this test log is meant to check, before writing a single test case.",
      },
      {
        href: "/ide-tools/skill-authoring-tools",
        label: "Browse more skill authoring tools",
        description: "Every builder tool in this category, for starting, refining and now verifying a skill's files before it ships.",
      },
      {
        href: "/skills",
        label: "Browse the skills directory",
        description: "Read published skills with real pass and fail style verdicts, useful material when writing your own test cases.",
      },
      {
        href: "/skills/business-skills/action-item-ownership-audit-skill",
        label: "Read the skill behind the worked example rows",
        description: "The published skill TESTS.md's two starter rows are drawn from, including the exact rules a correct verdict follows.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic's prompt engineering guide",
        description: "Authoritative guidance on writing specific, checkable instructions, directly relevant to deciding what a skill's correct verdict should be.",
      },
      {
        href: "https://martinfowler.com/bliki/TestPyramid.html",
        label: "Martin Fowler on the test pyramid",
        description: "An independent, widely cited explanation of structuring a set of test cases across different levels, the same discipline behind picking a pass, fail and edge case set.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Boundary-value_analysis",
        label: "Boundary value analysis",
        description: "A reference explanation of testing right at a system's stated boundary, the same idea behind this checklist's edge case category.",
      },
      {
        href: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
        label: "Nielsen Norman Group on test sample sizes",
        description: "An independent perspective on how few real test cases are actually needed to surface most defects, relevant to sizing a skill's test log.",
      },
    ],
  },
  tags: ["skill testing", "test log", "skill checklist", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
