import type { IdeToolMeta } from "@/lib/ide-tool-types";

const SKILL_MANIFEST_JSON = `{
  "name": "Meeting Action Item Auditor",
  "slug": "meeting-action-item-auditor-skill",
  "version": "1.0.0",
  "description": "Checks that every action item in a meeting note names a real owner and a real due date, and flags any action item that is missing either one.",
  "author": "Fast Prompts",
  "requiredInputs": [
    {
      "name": "meeting_notes",
      "type": "text",
      "required": true,
      "description": "The raw meeting notes or transcript containing the action items to check."
    },
    {
      "name": "known_owners",
      "type": "text",
      "required": false,
      "description": "An optional list of valid owner names, used to catch a misspelled or unrecognised owner."
    }
  ],
  "files": [
    {
      "path": "SKILL.md",
      "role": "primary",
      "description": "The full prose instructions an assistant reads before running this skill."
    },
    {
      "path": "reference/example-input.md",
      "role": "reference",
      "description": "A worked example showing one correct pass case and one correct fail case."
    }
  ],
  "outputFormat": "markdown-table",
  "tags": ["meetings", "audit", "action-items"],
  "updated": "2026-07-31"
}
`;

const MANIFEST_FIELD_GUIDE = `# Manifest field guide

This file explains what each field in skill-manifest.json is for, and when
adding a manifest at all is worth the extra file next to SKILL.md. Replace
the example values in skill-manifest.json with your own skill's real values
as you read through this guide, then delete or keep this file for your own
future reference.

## name

The human readable name of the skill, written the same way it appears as
the heading in SKILL.md. This is what a person sees in a list of skills, so
it should describe the check or task, not the topic area on its own.

## slug

A lowercase, hyphenated identifier for the skill, safe to use in a file
path, a URL or a database key. It should stay stable once other files or
automations start referring to it, even if the human readable name changes
later.

## version

A version string for the skill's own content, independent of any platform
version. Semantic versioning (major.minor.patch) is a reasonable default:
bump the patch number for a wording fix, the minor number for a new
optional input or an expanded method, and the major number for a change
that would break something already relying on the old required input or
output format.

## description

One or two sentences stating exactly what the skill checks or does. This is
the same sentence that belongs in SKILL.md's own purpose section, kept in
sync here so a program reading only the manifest, without opening SKILL.md
at all, still knows what the skill is for.

## requiredInputs

An array naming every real input the skill needs before it can run. Each
entry names the input, states its type, states whether it is required, and
gives a short description. A program that wants to check whether it has
everything a skill needs before invoking it can read this array instead of
parsing the required input section out of SKILL.md's prose, which is the
whole point of shipping a manifest at all.

## files

An array listing every file that belongs to the skill and the role each one
plays, for example primary for the main instructions file and reference for
a supporting file. This is what lets an automation know which files to
fetch, or which file is the one to hand an assistant as the actual
instructions, without guessing from filenames alone.

## When a manifest earns its place next to SKILL.md

A manifest is worth adding when something other than a person reading
prose needs to work with the skill: a build script that packages many
skills together, a catalogue page that lists a skill's required inputs
without opening its full file, or a runtime that decides which skill to
load based on its declared inputs. If a skill is only ever opened and read
by a person or handed whole to an assistant, SKILL.md alone is enough and a
manifest adds a second file to keep in sync for no real benefit.

## Keeping the manifest and SKILL.md from drifting apart

The manifest restates a few facts SKILL.md already states in prose: the
name, the purpose, and the required input. Treat SKILL.md as the source of
truth for wording and the manifest as a structured summary of it, and
update both together whenever the required input or the file list changes,
so a program reading the manifest never sees a different picture from a
person reading SKILL.md.
`;

const meta: IdeToolMeta = {
  slug: "skill-manifest-json-builder-tool",
  title: "Skill Manifest JSON Builder Tool: Start a Machine Readable Skill Manifest",
  name: "Skill Manifest Builder",
  category: "skill-authoring-tools",
  summary:
    "Open a real, valid skill-manifest.json with example fields already filled in, plus a field-by-field reference guide, ready to rewrite for your own skill and download.",
  seo: {
    primaryKeyword: "skill manifest json builder tool",
    keywords: [
      "skill manifest json builder tool",
      "ai skill manifest generator",
      "skill manifest json template",
      "machine readable skill manifest builder",
      "json manifest for ai skills",
    ],
    seoTitle: "Skill Manifest JSON Builder Tool: Structured Skill Metadata",
    seoDescription:
      "A free skill manifest json builder tool that opens a real skill-manifest.json with example fields filled in, plus a guide to each field, ready to edit.",
  },
  files: [
    { path: "skill-manifest.json", content: SKILL_MANIFEST_JSON, kind: "json" },
    { path: "reference/manifest-field-guide.md", content: MANIFEST_FIELD_GUIDE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the skill file contract this site's own skills directory publishes under.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to draft a skill manifest from scratch tend to either leave every field as an empty string and a placeholder array, or invent extra nested structure that has no matching field in the skill itself, both of which produce a file that fails the first time an automation actually tries to parse it. A fixed shape with a real, filled-in example for every field, including a two-item requiredInputs array and a two-item files array, keeps what gets written down anchored to a shape that already works.",
  },
  article: {
    intro: [
      "This skill manifest json builder tool opens a real, valid JSON starter file directly in your browser: a skill-manifest.json with example values already filled in for name, slug, version, description, requiredInputs and files, plus a second reference file explaining what each field means. The manifest is written out in full so its shape is obvious at a glance, ready to edit into whatever skill you are documenting.",
      "A skill on this site, and on most agent platforms that support them, is read by a person or a model as prose: SKILL.md states the purpose, the required input and the method in full sentences. A machine deciding which skill to load, at scale, generally cannot do that cheaply from prose alone. A structured header file next to SKILL.md, useful as a skill manifest json template, names the same skill in a shape code can parse without an extra step.",
      "This is a skill's own manifest, not a Model Context Protocol server manifest; an MCP manifest describes a running server's tools and connection details for a different consumer, and belongs with this site's MCP server tools instead. A json manifest for ai skills only needs to say what the skill is, what version it is at, what it requires and which files belong to it, exactly what the starter file below sets out as an ai skill manifest generator you edit rather than run.",
    ],
    sections: [
      {
        heading: "What a machine readable skill manifest builder adds beyond SKILL.md",
        body: [
          "SKILL.md is written for a reader who can follow prose: a purpose sentence, a required input list and a numbered method. skill-manifest.json restates only the facts a program is likely to need first: the name, the slug, the version, a short description, the required inputs with their types, and the files that make up the skill. It does not replace SKILL.md; it sits beside it as a structured index.",
        ],
      },
      {
        heading: "The fields inside skill-manifest.json",
        body: [
          "The starter file fills in six top level fields with real example values rather than empty strings, so the shape is obvious without cross referencing a separate schema document first.",
        ],
        list: [
          "name and slug: the human readable title and a stable, hyphenated identifier.",
          "version and description: a version string, and the same purpose sentence SKILL.md states in prose.",
          "requiredInputs: every real input the skill needs, each with a name, a type and whether it is required.",
          "files: every file the skill ships with and the role each one plays, for example primary or reference.",
        ],
      },
      {
        heading: "When a manifest is worth adding, and when SKILL.md alone is enough",
        body: [
          "A manifest earns its place when something other than a person reading prose needs the skill programmatically: a build script packaging many skills together, a catalogue page listing required inputs, or a runtime deciding which skill to load. A skill only ever read by a person does not need the second file; SKILL.md alone already carries what a reader needs, and a manifest there is just a second document to keep in sync for no real benefit.",
        ],
      },
      {
        heading: "How this differs from an MCP server manifest",
        body: [
          "It is easy to conflate this with a Model Context Protocol manifest because both are JSON files describing something an assistant works with, but the two describe different things for different consumers. An MCP manifest describes a running server: its tools and how a client connects. skill-manifest.json describes a static file bundle with no server and nothing running. If the thing being described is a server, use this site's MCP server tools category instead; if it is a skill's own files, this is the right shape.",
        ],
      },
      {
        heading: "Keeping the manifest and SKILL.md from drifting apart",
        body: [
          "The manifest restates a few facts SKILL.md already states, which means there are now two places a stale value can hide. Treat SKILL.md as the source of truth and the manifest as a structured summary: whenever the required input or the file list changes, update both in the same edit rather than leaving the manifest as a one time export.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import a .zip, reset to the starter files, or download the current set. Editing the JSON happens as plain text, so a missing comma or an unclosed bracket is worth checking with a validator before the file is relied on.",
        ],
      },
    ],
    howTo: {
      name: "How to build a skill manifest with this tool",
      steps: [
        { name: "Read both starter files", text: "Open skill-manifest.json and reference/manifest-field-guide.md to see the real example values and what each field is for before changing anything." },
        { name: "Fill in the real name, slug and version", text: "Replace the example name, slug and version with your own skill's actual identifiers." },
        { name: "Write the description", text: "Replace the description with the same purpose sentence your skill's SKILL.md already states, kept short and specific." },
        { name: "Rebuild the requiredInputs array", text: "Add one entry per real input your skill needs, each with a name, a type, whether it is required, and a short description." },
        { name: "Rebuild the files array", text: "List every file your skill actually ships with and the role each one plays, removing the example entries that do not apply." },
        { name: "Download the finished manifest", text: "Click Download .zip to save skill-manifest.json exactly as shown in the editor, ready to sit next to your skill's SKILL.md." },
      ],
    },
    faq: [
      {
        question: "Do I need a skill manifest json builder tool for every skill I write?",
        answer:
          "No. Most skills are read by a person or handed whole to an assistant, and SKILL.md alone already carries what either reader needs. Reach for a skill manifest json builder tool only once something else, like a build script, needs the skill's metadata without opening the full prose file first.",
      },
      {
        question: "Is this the same as an MCP server manifest?",
        answer:
          "No. A json manifest for ai skills describes a static file bundle: a name, a version, the inputs it expects and the files it contains. An MCP manifest describes a running server, its tools and how a client connects to it, a different shape for a different consumer, covered by this site's MCP server tools category instead.",
      },
      {
        question: "What type values should requiredInputs use?",
        answer:
          "The starter file uses text for both example inputs, which covers most skills whose input is a document, a transcript or a block of prose. If your skill expects something more structured, such as a number or a list, use whatever short type label your own platform already recognises, since this manifest shape does not mandate a fixed type vocabulary.",
      },
      {
        question: "Will this manifest work with any platform that reads skills?",
        answer:
          "The field names here are a plain, generic shape rather than a schema tied to one platform's exact specification. Most automations that read skill metadata can work with these fields directly or map them easily; check your own platform's documentation if it defines a stricter required shape first.",
      },
      {
        question: "Is anything I type into this skill manifest json template saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing is stored once you close or reload the page, so downloading the .zip before you leave is the only way to keep your work.",
      },
      {
        question: "Can I add fields to skill-manifest.json that this ai skill manifest generator does not include?",
        answer:
          "Yes. The six fields cover what most consumers of a skill manifest need, but nothing stops you adding more, such as a license field or a category tag, as long as whatever reads the manifest expects the extra field or simply ignores what it does not recognise.",
      },
      {
        question: "Does this tool check that my finished JSON is actually valid?",
        answer:
          "No. This tool provides the starting structure and the editor to fill it in; it does not run a validator against what you type. Checking the finished file with a JSON validator before anything relies on it is still worth doing, since a single missing comma is enough to break parsing.",
      },
    ],
    internalLinks: [
      {
        href: "/skills",
        label: "Browse the skills directory",
        description: "See every published skill on this site, each with the SKILL.md structure this manifest is written to summarise.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Start a new SKILL.md with the AI skill builder tool",
        description: "The companion tool for writing the prose instructions file this manifest sits next to.",
      },
      {
        href: "/ide-tools/skill-authoring-tools",
        label: "See more skill authoring tools",
        description: "Every builder tool in this category, for starting, refining and describing a skill's files.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Validate the finished JSON",
        description: "Check skill-manifest.json for a missing comma or an unclosed bracket before anything relies on parsing it.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic's prompt engineering guide",
        description: "Guidance on writing specific, checkable instructions, directly applicable to the description field this manifest restates from SKILL.md.",
      },
      {
        href: "https://www.json.org/json-en.html",
        label: "The JSON specification",
        description: "The formal, independent specification for the JSON syntax skill-manifest.json is written in.",
      },
      {
        href: "https://json-schema.org/understanding-json-schema",
        label: "Understanding JSON Schema",
        description: "An independent guide to formalising a JSON shape like this one into a schema, useful once a manifest needs strict validation.",
      },
      {
        href: "https://semver.org/",
        label: "The Semantic Versioning specification",
        description: "The independent versioning scheme the version field in this manifest is written to follow.",
      },
    ],
  },
  tags: ["skill manifest", "json manifest", "skill metadata", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
