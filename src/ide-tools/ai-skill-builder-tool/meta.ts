import type { IdeToolMeta } from "@/lib/ide-tool-types";

const SKILL_MD_TEMPLATE = `# [Skill Name]

Replace this heading with the name of the skill you are building, written as
an instruction to an AI assistant, for example "Brand Voice Consistency
Skill" or "Meeting Action Item Auditor". A skill name should describe the
check or task, not the topic area on its own.

## What this skill checks or does

State in one or two sentences exactly what this skill does. Be specific
about the input it needs and the output it produces. A vague purpose ("helps
with writing") produces vague behaviour from the assistant running it; a
specific one ("checks that every action item in a meeting note names a real
owner and a real due date") produces a checkable one.

## Required input

List, as a checklist, the real material this skill needs before it can run.
If the skill needs a reference document, a stated audience, or a specific
artefact (a code file, a meeting transcript, a job posting), say so
explicitly here and instruct the assistant to ask for it rather than proceed
without it.

- Replace this with the first required input.
- Replace this with the second required input, if there is one.

## Method

Write the step by step process the assistant should follow, in the order it
should follow it. Number the steps. Each step should be something a person
could check was actually followed by reading the assistant's output.

1. Replace this with the first step.
2. Replace this with the second step.
3. Replace this with the third step.

## Output format

Describe exactly what the assistant's response should look like: a list of
flags, a table, a pass or fail verdict per item, whatever fits the task. If a
finding needs to quote the original material to be checkable, say so here.

## What this skill will not do

State the limits plainly. A skill that invents an answer when it does not
have enough real information to give one is worse than a skill that says so.
If there is a case this skill should refuse to run, or a related task it
deliberately does not cover, name it here.
`;

const REFERENCE_EXAMPLE_TEMPLATE = `# Worked example template

Most real skills are stronger with one fully worked example: a real-looking
input, walked all the way through the method SKILL.md describes, ending in
the exact output format it defines. Replace everything below with your own
worked example.

## Example input

Paste or write a realistic version of the input this skill expects. Keep it
concrete: real names, real numbers, real wording, not a description of what
the input would contain.

## Walkthrough

Work through the method from SKILL.md against the example input above, step
by step, showing the reasoning at each step rather than jumping straight to
the answer. This is what teaches the assistant what "doing this correctly"
actually looks like on a real case, not just what the rules say in the
abstract.

## Expected output

Show the exact output the skill should produce for the example input, in the
output format SKILL.md defines. If the skill produces more than one kind of
verdict, for example a pass case and a fail case, include at least one
example of each so the assistant sees the full range of what a correct
answer can look like.

## When to skip this file

Not every skill needs a reference file. A short, single rule skill can often
be complete with SKILL.md alone. Add a reference file when a worked example,
a longer lookup table, or supporting material would make the main file too
long to stay readable on its own.
`;

const meta: IdeToolMeta = {
  slug: "ai-skill-builder-tool",
  title: "AI Skill Builder Tool: Start a New Skill's Files in the Browser",
  name: "AI Skill Builder",
  category: "skill-authoring-tools",
  summary:
    "Open a working two file skill template in an in-browser editor, rewrite it into your own skill, and download it as a .zip ready to hand to an assistant.",
  seo: {
    primaryKeyword: "ai skill builder tool",
    keywords: [
      "ai skill builder tool",
      "build an ai skill online",
      "free skill builder for ai assistants",
      "multi file skill template",
      "skill md template generator",
    ],
    seoTitle: "AI Skill Builder Tool: Build a Multi File Skill Free",
    seoDescription:
      "A free ai skill builder tool that opens a working SKILL.md and reference file template in the browser, ready to rewrite and download as a .zip.",
  },
  files: [
    { path: "SKILL.md", content: SKILL_MD_TEMPLATE, kind: "markdown" },
    { path: "reference/example-input.md", content: REFERENCE_EXAMPLE_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the skill file contract this site's own skills directory publishes under.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to draft a new skill from a blank page tend to write either a vague single paragraph with no checkable method, or an overlong essay with no clear required input section, making the resulting file hard for another assistant to follow consistently. A fixed template with explicit sections for required input, a numbered method and stated limits keeps the structure consistent regardless of which model or person is filling it in.",
  },
  article: {
    intro: [
      "This ai skill builder tool opens a working, multi file skill template directly in your browser: a main SKILL.md file with the five sections a real, checkable skill needs, and a reference file template for an optional worked example. Nothing is generated for you; the template is fixed, real starting content, ready to be rewritten into whatever skill you are actually building.",
      "A skill on this site, and on most agent platforms that support them, is a plain text instruction pack: one file an assistant reads before doing a recurring task, plus, where the task needs it, supporting reference material that file points to. Getting that structure right the first time avoids the two most common failure modes, a skill with no checkable method and a skill with no stated limits, both of which this template's sections exist to force. Unlike a static skill md template generator that only spits out a filename, this ai skill builder tool hands you working section headings and guidance text you edit in place.",
      "Everything here runs in the tab, which is what makes it a genuinely free skill builder for ai assistants rather than a signup gated service: editing the starter files, adding a new one, importing a .zip you already have, and downloading the result as a fresh .zip all happen client side, with nothing uploaded anywhere in between. That also means you can build an ai skill online from any browser, on any device, without installing anything first.",
    ],
    sections: [
      {
        heading: "Why a fixed template instead of a blank file",
        body: [
          "A blank text file invites a skill written as a paragraph of general advice, the kind of thing that reads well but gives an assistant nothing specific to check its own output against. The five sections in this template close a specific gap each: a name that states the check rather than the topic, a purpose sentence specific enough to be wrong if misapplied, a required input list that stops the assistant guessing at missing information, a numbered method a person can audit step by step, and a stated limit that keeps the skill from inventing an answer it lacked the material to give.",
        ],
      },
      {
        heading: "The required input section is the one most skills skip",
        body: [
          "The single most common defect in a hand written skill is a method that assumes information it never actually asks for: a tone check with no reference voice document, a fact check with no source material, a review with no stated audience. Naming the required input explicitly, and instructing the assistant to ask for it rather than proceed without it, is what turns a skill from a suggestion into something that reliably refuses to guess.",
        ],
      },
      {
        heading: "Writing a method a person can actually audit",
        body: [
          "A method section should read as a checklist someone else could follow by hand and land on the same answer, not as a description of the assistant's general judgement. Numbered steps that name a concrete action, in the order they happen, are what make a skill's behaviour predictable across different models and different runs of the same input, which is the entire point of packaging a task as a skill rather than re-explaining it in every new conversation.",
        ],
      },
      {
        heading: "When to add the reference file",
        body: [
          "Not every skill needs the second file. A short, single rule check is often complete with SKILL.md alone. A reference file earns its place when a worked example genuinely teaches something the rules alone cannot, when a lookup table would clutter the main file, or when the main file is already long enough that adding more content would make it harder to scan. The template's own closing section states this explicitly so a simple skill is not padded out for no reason.",
        ],
        list: [
          "Add a reference file when a fully worked example changes how the assistant reads an edge case.",
          "Add a reference file for a lookup table too long to sit comfortably inside the main instructions.",
          "Skip the reference file when the method is a handful of checkable rules with no ambiguous case to demonstrate.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import an existing .zip, reset back to the starter template, or download the current file set. Importing reads a .zip picked from your own device entirely client side; nothing about its contents is sent anywhere before the archive is rebuilt for download.",
        ],
      },
      {
        heading: "Refining a skill you already have",
        body: [
          "This tool starts a new skill from the template above. If you already have a finished skill's .zip and want to edit its files directly rather than start over, use Import .zip here to load it in, or look for a dedicated skill refiner in the same category, built around the same shared editor.",
        ],
      },
    ],
    howTo: {
      name: "How to build a new AI skill with this tool",
      steps: [
        { name: "Read the starter files", text: "Open SKILL.md and reference/example-input.md in the editor to see the five sections and their placeholder guidance before changing anything." },
        { name: "Rewrite the skill name and purpose", text: "Replace the heading and purpose sentence with the specific check or task your skill actually performs." },
        { name: "Fill in required input, method and output format", text: "Write the real checklist, numbered steps and output shape your skill needs, replacing every placeholder line." },
        { name: "State what the skill will not do", text: "Name any case the skill should refuse to run on, or a related task it deliberately does not cover." },
        { name: "Add a reference file only if it earns its place", text: "Write a worked example in reference/example-input.md if one would genuinely help, or delete the file if the main instructions are complete alone." },
        { name: "Download the finished skill", text: "Click Download .zip to save the file set exactly as shown in the editor, ready to hand to an assistant." },
      ],
    },
    faq: [
      {
        question: "Do I need to know a specific skill file format to use this ai skill builder tool?",
        answer:
          "No. The template follows the same plain text, multi file structure this site's own skills directory publishes under: a main instructions file plus, where useful, supporting reference files. It reads as ordinary markdown and does not require any specialised syntax or tooling to write or to use.",
      },
      {
        question: "Is anything I type here saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing is stored once you close or reload the page, so downloading the .zip before you leave is the only way to keep your work.",
      },
      {
        question: "Can I add more than the two starter files?",
        answer:
          "Yes. The Add file control in the editor's sidebar lets you create any additional file at any path, for example a second reference file or a short changelog. There is no limit on file count beyond what is practical to maintain by hand.",
      },
      {
        question: "What happens if I import a .zip that already has different files?",
        answer:
          "Importing replaces the current file set entirely with whatever text files the archive contains, so you can bring in an existing skill and keep editing it from there instead of starting from the template. Binary files inside the archive, such as images, are skipped rather than shown corrupted, since the editor only handles plain text.",
      },
      {
        question: "Does this tool check whether my finished skill is actually good?",
        answer:
          "No. This tool only provides the starting structure and the editor to fill it in; it does not audit the content you write for clarity, completeness or accuracy. Reviewing the finished file against the five section headings yourself, or having a colleague read it, is still the way to catch a gap this template alone cannot.",
      },
      {
        question: "Can I use the finished skill with any AI assistant?",
        answer:
          "The plain text, multi file structure is generic and works with any assistant or agent framework capable of reading a text file as an instruction set. Specific platforms vary in exactly how a skill file is loaded or invoked, so check your assistant's own documentation for the mechanics of installing a downloaded skill once it is written.",
      },
    ],
    internalLinks: [
      {
        href: "/skills",
        label: "Browse the skills directory",
        description: "See every published skill on this site for more real examples of the structure this template follows.",
      },
      {
        href: "/skills/marketing-skills/brand-voice-consistency-skill",
        label: "Read a full worked skill example",
        description: "A published skill using this exact SKILL.md plus reference file structure, worth reading before writing your own.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "Get help writing clear instructions",
        description: "A prompt for turning a rough explanation into clear, structured technical writing, useful for the method section.",
      },
      {
        href: "/ide-tools/skill-authoring-tools",
        label: "See more skill authoring tools",
        description: "Every builder tool in this category, for starting, refining and validating a skill's files.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic's prompt engineering guide",
        description: "Authoritative guidance on writing instructions a model can follow precisely, directly applicable to a skill's method section.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI's prompt engineering guide",
        description: "A second major model provider's own guidance on specific, checkable instruction writing.",
      },
      {
        href: "https://developers.google.com/tech-writing",
        label: "Google's technical writing courses",
        description: "Free courses on writing clear, structured technical documents, the same discipline a good skill file needs.",
      },
      {
        href: "https://diataxis.fr/",
        label: "The Diataxis documentation framework",
        description: "An independent framework for structuring technical documentation by the reader's actual need, useful when deciding what belongs in a reference file.",
      },
    ],
  },
  tags: ["skill builder", "ai skill", "in browser editor", "skill template"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
