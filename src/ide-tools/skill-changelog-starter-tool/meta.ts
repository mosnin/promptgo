import type { IdeToolMeta } from "@/lib/ide-tool-types";

const CHANGELOG_TEMPLATE = `# Changelog

All notable changes to this skill are documented in this file. The format
below follows Keep a Changelog, and the version numbers follow a semantic
versioning convention adapted for a skill's own files (see
reference/versioning-guide.md for what counts as a patch, a minor change or a
major change here).

## [Unreleased]

### Added
-

### Changed
-

### Fixed
-

### Removed
-

## [1.1.0] - 2026-06-18

### Added
- A "Required input" checklist to SKILL.md, naming the reference document and
  the stated audience the review needs before it can run, so the assistant
  asks for missing material instead of guessing at it.
- A second worked example to reference/example-input.md showing a fail case,
  not only a pass case, so both ends of the verdict range are demonstrated.

### Changed
- Reworded the purpose sentence in SKILL.md to name the exact check the
  skill performs instead of describing the general topic area it sits in.
- Tightened step 2 of the method so each numbered instruction names a
  single checkable action rather than two actions joined together.

### Fixed
- Corrected the output format section, which previously described a table
  with a column the worked example itself never actually produced.

### Removed
- Removed an early paragraph in SKILL.md that repeated the purpose sentence
  in different words without adding a new instruction for the assistant.

## [1.0.0] - 2026-05-02

### Added
- Initial release of the skill: a SKILL.md file with a name, a purpose
  sentence, a required input list, a numbered method and an output format,
  plus a reference/example-input.md file carrying one fully worked example.

<!--
Replace the entries above with your own skill's real history, oldest at the
bottom. Every entry should describe what changed for someone running the
skill, not what a diff of the file looked like. Start a new [Unreleased]
section at the top each time you begin work on the next change, and rename
it to a version number and a date only once that change actually ships.
-->
`;

const VERSIONING_GUIDE_TEMPLATE = `# A semantic versioning convention for skills

A skill's files change the same way any other software does: some edits are
invisible corrections, some edits add real capability while staying
compatible with how the skill was already used, and a small number of edits
change its behaviour enough that anyone already relying on the old version
needs to know before they upgrade. Semantic versioning gives each of those
three cases its own place in the version number, written as
major.minor.patch, for example 1.2.0. Applied to a skill instead of a code
library, the same three numbers still answer one question: can something
that depended on the old version of this skill keep depending on it
unchanged.

## Patch: 1.0.0 to 1.0.1

Bump the patch number for a change that fixes a mistake without changing
what the skill is meant to do or how it is meant to be invoked. A typo in
SKILL.md, a broken link in a reference file, a corrected example that was
quietly wrong, or a clarified sentence that does not change the method's
actual steps all belong here. Anyone already using the skill should notice
nothing except the mistake being gone.

## Minor: 1.0.1 to 1.1.0

Bump the minor number for a change that adds a real capability or tightens
the method without breaking how the skill was already being used. Adding a
new required input the skill did not check for before, adding a new
reference file, extending the output format with an additional field, or
splitting one vague method step into two precise ones are minor changes:
someone still running the old instructions gets a correct result, they
simply get less out of the skill than someone on the new version does.

## Major: 1.1.0 to 2.0.0

Bump the major number for a change that breaks an assumption someone was
already relying on. Renaming or removing a required input, changing the
output format so it is no longer compatible with the old one, narrowing what
the skill will do so a previously supported case is now refused, or
rewriting the method so a run under the old instructions and a run under the
new instructions would reasonably disagree, are all major changes. State
plainly in the changelog entry what stops working, not only what was added,
so nobody upgrades by accident and finds out later.

## Deciding which one, quickly

When unsure, ask whether a person or another assistant that already trusted
the previous version's output would be surprised by the new version's
output on the same input. No surprise, and the answer reads the same, is a
patch. No surprise, but the skill now does more, is a minor. Any surprise on
a case that used to work correctly is a major, even if the change looked
small while it was being written.

## Keeping the changelog and the version number honest

The version number is only trustworthy if every entry in CHANGELOG.md is
filed under the section that matches this guide, and every release bumps
the number that section implies. A skill with a long Changed section but a
version number that only ever moves its patch digit is telling editors the
wrong thing about how much has actually shifted underneath them.
`;

const meta: IdeToolMeta = {
  slug: "skill-changelog-starter-tool",
  title: "Skill Changelog Starter Tool: Track a Skill's Versions in the Browser",
  name: "Skill Changelog Starter",
  category: "skill-authoring-tools",
  summary:
    "Open a working Keep a Changelog style CHANGELOG.md, pre-filled with one real worked entry, plus a paired versioning guide, ready to edit and download as you revise a skill over time.",
  seo: {
    primaryKeyword: "skill changelog starter tool",
    keywords: [
      "skill changelog starter tool",
      "changelog template for ai skills",
      "skill versioning guide download",
      "keep a changelog format for skills",
      "semantic versioning for skills",
    ],
    seoTitle: "Skill Changelog Starter Tool: Version a Skill Free",
    seoDescription:
      "A free skill changelog starter tool with a Keep a Changelog style CHANGELOG.md and a semantic versioning guide, editable in the browser and downloadable as a .zip.",
  },
  files: [
    { path: "CHANGELOG.md", content: CHANGELOG_TEMPLATE, kind: "markdown" },
    { path: "reference/versioning-guide.md", content: VERSIONING_GUIDE_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the Keep a Changelog and Semantic Versioning conventions, adapted for a skill's own files.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Skills revised across several sessions tend to accumulate silent edits with no record of what changed or why, which makes an assistant reading an older transcript reference behaviour the skill no longer has. A dated CHANGELOG.md with one worked entry, paired with a short guide for when a change is a patch versus a real behaviour change worth a minor or major bump, keeps that history checkable instead of lost.",
  },
  article: {
    intro: [
      "This skill changelog starter tool opens a working Keep a Changelog style CHANGELOG.md in your browser, pre-filled with one real worked entry showing the format in use, plus a reference file explaining a semantic versioning convention sized for a skill's own files rather than a code library. Nothing is generated for you; both files are fixed, real starting content, ready to edit as a skill changes over time.",
      "A skill maintained across more than one revision has the same problem any software has once more than one session touches it: without a record of what changed, when and why, an old transcript can describe behaviour the skill no longer has, and nobody can tell a small wording fix apart from a change that altered the method. CHANGELOG.md gives that history a fixed shape, and the paired reference file gives each entry's version number a real convention instead of an arbitrary bump.",
      "Everything here runs in the tab. Editing the starter files, adding a new one, importing a .zip of a skill you already maintain, and downloading the result as a fresh .zip all happen client side, with nothing uploaded anywhere in between.",
    ],
    sections: [
      {
        heading: "Why a skill needs its own changelog",
        body: [
          "A skill file changes the same way any instruction document does: a required input gets added once a real gap shows up, a method step gets split once it hides two decisions instead of one, an output field gets removed once nobody used it. None of that is visible from reading the current SKILL.md alone. A changelog is the only place that record survives, and this skill changelog starter tool is what lets an editor, months later, tell a cosmetic fix apart from a change that would have surprised anyone relying on the old behaviour.",
        ],
      },
      {
        heading: "The Keep a Changelog format, adapted for a skill",
        body: [
          "The starter file follows a real, recognisable keep a changelog format for skills, not a generic bullet list: an Unreleased section at the top, then dated version headings below it, each broken into Added, Changed, Fixed and Removed. That grouping exists for a reason specific to a skill rather than to code. Added and Removed usually mean a required input, a reference file or an output field gained or lost. Changed usually means the method was reworded. Fixed usually means the skill's own content was wrong.",
        ],
      },
      {
        heading: "Patch, minor and major, sized for a skill",
        body: [
          "reference/versioning-guide.md lays out a semantic versioning for skills convention, deciding when a change is a patch versus a minor or major bump, sized for a skill's own files rather than a package's public API. A patch fixes a mistake without changing what the skill does. A minor adds a real capability without breaking how it was already used. A major changes an assumption someone was already relying on, exactly the case a version number exists to flag.",
        ],
        list: [
          "Patch: a typo, a broken reference link, or a corrected worked example, with no change to the method.",
          "Minor: a new required input, a new reference file, or a method step split into two precise ones.",
          "Major: a renamed or removed required input, or a method rewrite that would disagree with the old one on a case that used to work.",
        ],
      },
      {
        heading: "Writing an entry that is actually useful to the next editor",
        body: [
          "A changelog entry that only restates a diff ('updated SKILL.md') gives the next editor nothing to work with. A useful entry names the section that changed, states what it now does differently, and, for a Fixed or Removed entry especially, says what was wrong before. The worked entry pre-filled in this changelog template for ai skills is written to that standard on purpose, a real example to copy the shape of rather than a placeholder to delete.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import a .zip, reset the starter template, or download the current file set. This skill versioning guide download pairs the changelog file with that short explanation of patch, minor and major, so both open together and can be edited or replaced independently after that.",
        ],
      },
      {
        heading: "Pairing this with the tool that builds the skill itself",
        body: [
          "This tool assumes a skill's SKILL.md and reference files already exist, or are being built alongside it. Starting a brand new skill is a separate job for this category's skill builder tool; bring its output in here and keep the version history moving alongside it.",
        ],
      },
    ],
    howTo: {
      name: "How to start tracking a skill's changes with this tool",
      steps: [
        { name: "Read the worked entry", text: "Open CHANGELOG.md and read the 1.1.0 and 1.0.0 entries to see a real Added, Changed, Fixed and Removed entry before adding your own." },
        { name: "Read the versioning guide", text: "Open reference/versioning-guide.md to see the patch, minor and major definitions this changelog's version numbers follow." },
        { name: "Replace the worked entries with real history", text: "Rewrite the 1.1.0 and 1.0.0 sections to describe your own skill's actual initial release and first revision, oldest at the bottom." },
        { name: "Fill in Unreleased as you work", text: "Add a line under Added, Changed, Fixed or Removed each time you edit the skill's files, before you forget why." },
        { name: "Pick the version number using the guide", text: "When a change ships, decide patch, minor or major using reference/versioning-guide.md, then move the Unreleased entries under a new dated heading." },
        { name: "Download the finished files", text: "Click Download .zip to save CHANGELOG.md and the versioning guide as shown, ready to sit alongside the skill's other files." },
      ],
    },
    faq: [
      {
        question: "Do I need to already have a versioned skill to use this skill changelog starter tool?",
        answer:
          "No. The starter files work equally well for a skill never versioned before and one with several informal revisions already behind it. In that second case, write one initial entry summarising the skill before this changelog started, then track every change after.",
      },
      {
        question: "Does this tool automatically detect what changed in my skill's files?",
        answer:
          "No. Nothing here reads or diffs another file. CHANGELOG.md and the versioning guide are starting text you edit by hand each time you revise a skill, a deliberate note written at the time of the change, not a generated report.",
      },
      {
        question: "Is anything I type into the editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing persists once you close the page, so downloading the .zip before you leave is the only way to keep your edits.",
      },
      {
        question: "What version number should a brand new skill start at?",
        answer:
          "Most skills following this convention start at 1.0.0 for the first version anyone actually uses, with 0.x reserved for a draft still being shaped before it is trusted. A genuine draft can start at 0.1.0, moving to 1.0.0 once it is relied on.",
      },
      {
        question: "Can I use this changelog format for a skill that already follows a different convention?",
        answer:
          "Yes, though switching formats partway through loses the ability to compare old and new entries directly. Add one entry in the new format noting the change of convention itself, then continue every entry after that point in the Added, Changed, Fixed and Removed structure this template uses.",
      },
      {
        question: "Does the versioning guide apply to skills built for a specific platform only?",
        answer:
          "The guide is written around the parts every skill has regardless of platform: required input, a method, and an output format, plus whatever reference files support them. It does not depend on any single agent framework's loading mechanism, so the definitions apply however the finished skill is invoked.",
      },
      {
        question: "Can I add more files to the ones this tool starts with?",
        answer:
          "Yes. The Add file control in the editor's sidebar lets you create any additional file at any path, for example a second reference file or a migration note for a major version bump, with no real limit on file count.",
      },
    ],
    internalLinks: [
      {
        href: "/skills",
        label: "Browse the skills directory",
        description: "See published skills on this site, several of which are already on more than one real revision worth a changelog entry.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Start a new skill's files first",
        description: "The builder tool for a skill's SKILL.md and reference file, useful before there is anything for this changelog to track yet.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "Get help writing a clear changelog entry",
        description: "A prompt for turning a rough description of a change into clear, structured technical writing, useful for the Changed and Fixed sections.",
      },
      {
        href: "/ide-tools/skill-authoring-tools",
        label: "See more skill authoring tools",
        description: "Every builder tool in this category, for starting, refining and now versioning a skill's files.",
      },
    ],
    externalLinks: [
      {
        href: "https://keepachangelog.com/en/1.1.0/",
        label: "The Keep a Changelog specification",
        description: "The original convention this starter file's Added, Changed, Fixed and Removed structure is drawn from.",
      },
      {
        href: "https://semver.org/",
        label: "The Semantic Versioning specification",
        description: "The formal definition of major, minor and patch this tool's versioning guide adapts for a skill's own files.",
      },
      {
        href: "https://docs.npmjs.com/about-semantic-versioning",
        label: "npm's guide to semantic versioning",
        description: "A widely used real world application of the same major, minor and patch convention, useful for comparing against the skill specific version above.",
      },
      {
        href: "https://www.conventionalcommits.org/en/v1.0.0/",
        label: "The Conventional Commits specification",
        description: "A related convention for writing individual change descriptions that a changelog entry can be generated or checked against.",
      },
    ],
  },
  tags: ["changelog", "versioning", "skill maintenance", "keep a changelog"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
