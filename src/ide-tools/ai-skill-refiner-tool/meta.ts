import type { IdeToolMeta } from "@/lib/ide-tool-types";

const REFINE_GUIDE = `# Refining an existing AI skill

This file is not a template with blanks to fill in. It is a short walkthrough
for the workflow this page exists to support: importing a skill you already
have, editing its files directly in this browser tab, and downloading the
refined result. Read it once before you import anything, then delete it once
your own skill's files have replaced it.

## Step 1: import the skill's zip

Click Import .zip in the toolbar above this file list and pick the .zip you
want to refine, whether it came from this site's skills directory, an
assistant that exported one for you, or a skill you wrote by hand and zipped
yourself. Importing replaces the current file set entirely, including this
guide and the checklist beside it, so nothing about your own skill's files is
merged with the starter content shown before you imported.

## Step 2: read every file before changing anything

Before editing a single line, click through each file in the sidebar and read
it in full. Note what the main instructions file claims the skill checks or
does, what required input it says it needs, and what every reference file is
actually for. You cannot spot drift between a skill's description and its
real behaviour without first knowing what the whole file set currently says.

## Step 3: edit the files that actually need it

Work file by file in the editor pane. Common fixes at this stage include
tightening a method step that reads as vague advice rather than a checkable
instruction, updating a required input list that no longer matches what the
method section uses, correcting an output format that drifted from what a
worked example actually shows, and rewriting a purpose sentence that no
longer describes what the skill has grown into after several rounds of
changes.

## Step 4: add or remove files as the skill needs

Use Add file in the sidebar for a new reference file, a second worked
example, or a short changelog. Delete a file you no longer need with the
small close icon that appears beside it on hover. Either change means going
back to the main instructions file and checking that what it says about the
skill's files still matches what is actually there.

## Step 5: run the pre export checklist

Open reference/pre-export-checklist.md and work through it once your edits
feel finished. It exists specifically to catch the small mismatches an editor
introduces without meaning to: a description that mentions a file you
deleted, a heading left over from before a rewrite, a path that no longer
makes sense.

## Step 6: download the refined zip

Click Download .zip once the checklist is clear. The archive is rebuilt from
exactly the files shown in the editor at that moment, entirely in the
browser tab, so downloading before you close or reload the page is the only
way to keep the result.

If you are starting from nothing rather than refining something that already
exists, this is the wrong starting point. Use the ai skill builder tool in
this same category for a blank, two file template instead. This guide
assumes a finished skill is already in front of you and the job is checking
and improving it, not writing one from a first draft.
`;

const PRE_EXPORT_CHECKLIST = `# Pre export skill checklist

Work through this list after editing and before you click Download .zip in
the editor above. Each item catches a specific kind of drift that editing an
existing skill's files tends to introduce without anyone noticing until
another assistant reads the result and gets it wrong.

## Description accuracy

- Does the main instructions file's description of what the skill checks or
  does still match every file that is actually present in the file list.
- If you deleted a reference file, did you also remove the sentence that
  points to it, rather than leaving a dangling reference to a file that no
  longer exists.
- If you added a new file, does the main instructions file mention it and
  say when an assistant should actually open it.

## Leftover placeholder content

- Search each file for template leftovers such as "replace this" or
  "for example" that were never actually replaced.
- Check that every heading still describes the content beneath it, not the
  original template's heading from before you rewrote the section.
- Confirm any worked example reads as a real, concrete case, not a
  description of what an example would contain if someone wrote one later.

## File paths and structure

- Does every path in the file list still make sense given what is actually
  inside it, for example a lookup table that ended up outside the reference
  folder it was meant to sit in.
- Are there two files that now say almost the same thing after editing and
  should be merged into one.
- Is the main instructions file still the first file a reader would
  naturally open, or did editing bury it behind a reference file that grew
  too long.

## Staleness

- Does the required input section match what the method section actually
  uses, rather than an older list from before the method changed.
- Does the output format section match the output the worked example
  actually shows.
- If the skill's purpose shifted while you were editing it, does the name at
  the top of the file still describe what it does now, not what it did
  before you started.

Once every item above is checked, the file set in the editor is ready to
download. A checklist like this one does not replace a second reader; it
only catches the mismatches an editor introduces mechanically, not whether
the underlying method is actually a good one.
`;

const meta: IdeToolMeta = {
  slug: "ai-skill-refiner-tool",
  title: "AI Skill Refiner Tool: Import, Edit and Re-Export a Skill",
  name: "AI Skill Refiner",
  category: "skill-authoring-tools",
  summary:
    "Import an existing skill's zip into the in-browser editor, edit its files directly, run a pre export checklist, and download the refined result.",
  seo: {
    primaryKeyword: "ai skill refiner tool",
    keywords: [
      "ai skill refiner tool",
      "refine an existing ai skill",
      "import an existing ai skill zip",
      "download a refined skill zip",
      "in browser skill zip editor",
    ],
    seoTitle: "AI Skill Refiner Tool: Edit an Existing Skill Free",
    seoDescription:
      "A free ai skill refiner tool that imports an existing skill's zip into an in-browser editor, lets you edit every file directly, then exports the result.",
  },
  files: [
    { path: "REFINE-GUIDE.md", content: REFINE_GUIDE, kind: "markdown" },
    { path: "reference/pre-export-checklist.md", content: PRE_EXPORT_CHECKLIST, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the same skill file contract this site's skills directory publishes under.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Skills that pass through several rounds of editing tend to drift in three predictable ways: the description at the top stops matching the files actually present, a deleted file leaves a dangling reference behind, and a required input list stops matching what the method section has since grown to use. A fixed checklist run right before export catches all three mechanically, without depending on whoever is editing to remember to check for them by hand.",
  },
  article: {
    intro: [
      "This ai skill refiner tool skips the blank template and opens straight onto a workspace built for a skill you already have: import an existing ai skill zip with the Import .zip button in the shared editor above, edit its files directly in place, then download a refined skill zip once the result actually matches what the skill is supposed to do.",
      "Refining an existing ai skill is a different job from writing one from scratch. The sections already exist, and the real work is deciding what is still accurate, what has quietly drifted since it was first written, and what a file list grown untidy over several edits actually needs to keep or drop. The two starter files loaded here, a step by step refine guide and a pre export checklist, are written for that specific job rather than repurposed from a blank template.",
      "Every edit happens inside this site's in browser skill zip editor: importing a .zip reads it entirely client side, editing a file changes only the in memory copy shown in the pane, and downloading rebuilds the archive the same way, without a single byte of the skill's content ever leaving your own browser tab.",
    ],
    sections: [
      {
        heading: "What refining a skill actually means",
        body: [
          "Writing a new skill starts from an empty structure and fills it in. Refining one starts from a structure someone already filled in, sometimes months ago, sometimes across several separate edits, and the job is closing the gap between what the file set claims and what it actually does. That gap shows up in checkable ways: a description that still mentions a reference file that got deleted, a required input list that never caught up with a method section that changed underneath it, or a worked example left over from an earlier version of the skill's purpose. None of that is visible from the outside; a skill's files can look complete while quietly describing a version of the skill that no longer exists.",
        ],
      },
      {
        heading: "Importing a skill's zip into the editor",
        body: [
          "Click Import .zip in the toolbar and pick a .zip from your own device: one from this site's skills directory, one an assistant exported for you, or one you wrote and zipped by hand. The archive is read entirely client side, so nothing about its contents is sent anywhere before its files appear in the file list, ready to click through and edit.",
          "Importing replaces the current file set entirely, including the starter guide and checklist this tool loads by default, so the workspace becomes exactly the skill you imported. Binary files inside the archive are skipped rather than shown corrupted, since the editor only handles plain text.",
        ],
      },
      {
        heading: "Editing without losing the skill's original shape",
        body: [
          "Read every file in full before changing anything. Note what the main instructions file claims the skill checks or does, what it says it needs as input, and what each reference file is for, so you can tell later whether an edit accidentally broke one of those claims. The fixes that come up most often are tightening a method step that reads as general advice rather than something a person could check was followed, updating a required input list that has fallen behind the method it supports, and rewriting a purpose statement that no longer describes what the skill has grown into.",
        ],
      },
      {
        heading: "Deciding when to add or remove a file entirely",
        body: [
          "Not every fix is a line edit. Sometimes the right change is adding a file the skill never had, or removing one it no longer needs.",
        ],
        list: [
          "Add a reference file when a worked example or lookup table has grown too large to sit comfortably inside the main instructions.",
          "Remove a reference file when its content has been folded into the main file, or when the case it demonstrated no longer applies.",
          "Merge two files into one when editing has left them saying almost the same thing in slightly different words.",
        ],
      },
      {
        heading: "Running the pre export checklist before downloading",
        body: [
          "The reference/pre-export-checklist.md file exists for the moment right before Download .zip: a short list covering whether the description still matches the files present, whether placeholder leftovers survived editing, whether every path still makes sense, and whether anything is genuinely stale against the method it supports.",
        ],
      },
      {
        heading: "How this differs from the ai skill builder tool",
        body: [
          "This ai skill refiner tool and the ai skill builder tool solve two different problems that happen to share an editor. The builder opens a blank, two file skill template, the right start when nothing exists yet. This refiner assumes a finished skill's files already exist as a .zip, and the workflow, importing, reading, editing and checklisting, is built around improving that skill rather than drafting a first version of one.",
        ],
      },
    ],
    howTo: {
      name: "How to refine an existing AI skill with this tool",
      steps: [
        { name: "Import the skill's zip", text: "Click Import .zip and pick the archive for the skill you want to refine. This replaces the starter guide and checklist with your own skill's files." },
        { name: "Read every file before editing", text: "Click through each file in the sidebar to see what the skill currently claims to do and what its reference files are for." },
        { name: "Edit the files that need it", text: "Fix drifted descriptions, vague method steps, outdated required input lists and stale output formats directly in the editor pane." },
        { name: "Add or remove files as needed", text: "Use Add file for anything new the skill needs, and delete a file that no longer earns its place, updating any file that references it." },
        { name: "Run the pre export checklist", text: "Work through reference/pre-export-checklist.md to catch description drift, leftover placeholders, and paths that no longer make sense." },
        { name: "Download the refined zip", text: "Click Download .zip to export the file set exactly as shown in the editor, ready to hand to an assistant." },
      ],
    },
    faq: [
      {
        question: "Do I need the skill's original zip file to use this ai skill refiner tool?",
        answer:
          "Yes, the workflow is built around importing files that already exist. If you do not have a skill's files yet, the ai skill builder tool in the same category opens a blank template instead, the better starting point for a skill not yet written.",
      },
      {
        question: "What happens to the starter guide and checklist files when I import a zip?",
        answer:
          "Importing replaces the entire file set shown in the editor, including the refine guide and pre export checklist this tool loads by default, with whatever text files the archive contains. The workspace becomes exactly the skill you imported.",
      },
      {
        question: "Is the skill I import or edit ever uploaded anywhere?",
        answer:
          "No. Reading the .zip you import, editing its files, and rebuilding the archive for download all happen inside your own browser tab. Nothing about the skill's content is sent to a server, which is also why closing the tab without downloading loses your changes.",
      },
      {
        question: "How is this different from the ai skill builder tool in the same category?",
        answer:
          "The builder tool opens a blank, two file skill template for writing a brand new skill from a first draft. This refiner assumes a finished skill already exists as a .zip and is built around importing it, editing its files, and checking it before re-export.",
      },
      {
        question: "Can I add entirely new files to a skill I am refining?",
        answer:
          "Yes. The Add file control in the editor's sidebar works whether you started from the default starter files or from an imported skill, so you can add a reference file, a changelog, or any other file the skill needs at any path you choose.",
      },
      {
        question: "Does this tool check whether my refined skill is actually correct?",
        answer:
          "No. The pre export checklist catches mechanical drift, a stale description, a leftover placeholder line, a path that stopped making sense, but it does not judge whether the skill's method is a good one. A second reader is still the way to catch a gap the checklist alone cannot.",
      },
      {
        question: "What if the .zip I import is not actually a skill built for this site?",
        answer:
          "Any .zip containing plain text files can be imported and edited here, not only ones exported from this site's own skills directory. The editor reads whatever text files the archive contains and does not require this site's own file names or structure.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Start a brand new skill instead",
        description: "The sibling tool for writing a skill from a blank template when nothing exists yet to refine.",
      },
      {
        href: "/ide-tools/skill-authoring-tools",
        label: "See more skill authoring tools",
        description: "Every builder tool in this category, for starting, refining and validating a skill's files.",
      },
      {
        href: "/skills",
        label: "Browse the skills directory",
        description: "Find a published skill's .zip to download and practice refining with this tool.",
      },
      {
        href: "/skills/marketing-skills/brand-voice-consistency-skill",
        label: "Read a full worked skill example",
        description: "A published skill with the exact file structure this refiner's checklist assumes, worth practicing on.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview",
        label: "Anthropic's Agent Skills documentation",
        description: "Explains the file structure an agent skill uses, the same shape this refiner's checklist checks against.",
      },
      {
        href: "https://en.wikipedia.org/wiki/ZIP_(file_format)",
        label: "Wikipedia's ZIP file format reference",
        description: "Background on the archive format this editor reads on import and rebuilds on download.",
      },
      {
        href: "https://developers.google.com/tech-writing/one/short-sentences",
        label: "Google's guide to concise technical writing",
        description: "Practical guidance on trimming a document down to what it actually needs, directly useful when editing a drifted method section.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/concise/",
        label: "plainlanguage.gov's conciseness guidelines",
        description: "A federal plain language resource on cutting leftover and unnecessary wording, relevant to spotting placeholder text a template left behind.",
      },
    ],
  },
  tags: ["skill refiner", "ai skill", "in browser editor", "import zip", "skill checklist"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
