import type { IdeToolMeta } from "@/lib/ide-tool-types";

const SCHEMA_JSON = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/support-ticket.schema.json",
  "title": "Support Ticket",
  "description": "A structured support ticket record, the kind of data object a helpdesk form or an internal tool might read in or write back out.",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "A unique numeric identifier for the ticket.",
      "minimum": 1
    },
    "title": {
      "type": "string",
      "description": "A short summary of the issue being reported.",
      "minLength": 3,
      "maxLength": 120
    },
    "priority": {
      "type": "string",
      "description": "How urgently the ticket needs attention.",
      "enum": ["low", "medium", "high", "urgent"]
    },
    "resolved": {
      "type": "boolean",
      "description": "Whether the ticket has already been closed."
    },
    "reported_by": {
      "type": "string",
      "description": "The email address of the person who reported the issue.",
      "format": "email"
    },
    "time_spent_hours": {
      "type": "number",
      "description": "How many hours have been logged against this ticket so far.",
      "minimum": 0
    },
    "tags": {
      "type": "array",
      "description": "Free text labels attached to the ticket.",
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    }
  },
  "required": ["id", "title", "priority", "resolved"],
  "additionalProperties": false
}
`;

const VALIDATE_PY = `"""Validate a sample data object against schema.json using the jsonschema package.

Install the dependency first:

    pip install jsonschema

Then run this script from the same directory as schema.json:

    python validate.py

It loads the schema, checks one sample support ticket against it, and prints
either a pass message or every validation error it found, each with the
exact field path where the problem is.
"""

import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator


def load_schema(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


# Replace this with the real data object you want to check. It is written
# out here as plain Python so it is easy to change or generate from
# somewhere else, such as an API response or a parsed config file.
SAMPLE_DATA = {
    "id": 4821,
    "title": "Login page returns a 500 error on submit",
    "priority": "high",
    "resolved": False,
    "reported_by": "jane.doe@example.com",
    "time_spent_hours": 1.5,
    "tags": ["auth", "regression"],
}


def main() -> int:
    schema_path = Path(__file__).with_name("schema.json")
    schema = load_schema(schema_path)

    validator = Draft202012Validator(schema)
    errors = sorted(validator.iter_errors(SAMPLE_DATA), key=lambda error: list(error.path))

    if not errors:
        print("Valid: the sample data object matches schema.json.")
        return 0

    print(f"Invalid: {len(errors)} error(s) found.")
    for error in errors:
        location = "/".join(str(part) for part in error.path) or "(root)"
        print(f"  at {location}: {error.message}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
`;

const JSON_SCHEMA_GUIDE_MD = `# JSON Schema keyword guide

This file explains what each keyword in schema.json actually does, and how
to extend the schema safely when your own data needs a field this starter
does not already cover.

## The two identity keywords

$schema names which draft of the JSON Schema specification the file is
written against. schema.json points at the 2020-12 draft, the current
version, which is what tells a validator like the Python jsonschema package
exactly which rules to apply. $id gives the schema its own stable identifier,
useful once a schema is referenced from another schema rather than loaded on
its own, as this starter one is.

## type

Every property in schema.json declares a type: string, integer, number,
boolean or array. A validator rejects a value whose type does not match, so
this is the first and cheapest check a schema performs. Note that integer
and number are different types in JSON Schema: integer only accepts whole
numbers, while number accepts any numeric value including decimals, which is
why time_spent_hours in this schema is typed number rather than integer.

## properties and required

properties maps each field name in the object to its own smaller schema,
which is why id, title, priority and the rest each get their own type and
description nested underneath it. required is a separate array listing
which of those property names must actually be present for the object to
pass. A property left out of required is optional: reported_by and tags can
be missing from a valid ticket, but id, title, priority and resolved cannot.

## Extra constraints beyond type

A type check alone catches a wrong kind of value but not a wrong shaped one,
which is what the extra keywords in this schema are for. minimum and
maximum bound a number or integer. minLength and maxLength bound how long a
string can be. enum restricts a string to an exact fixed list of allowed
values, which is how priority is limited to low, medium, high or urgent
instead of accepting any text. format hints at a recognised string shape,
such as email, though whether format is actually enforced depends on the
validator and its configuration.

## additionalProperties

Setting additionalProperties to false means the object fails validation if
it contains any field not named in properties. This is worth turning off
deliberately if a slightly different shaped object, such as one with a
typo'd field name, should still be treated as valid, but it is the
setting most likely to catch a real mistake in a piece of structured data
early rather than silently ignoring an extra field.

## Extending this schema for your own data

Adding a new field means adding a new entry under properties with its own
type and description, then deciding whether to add its name to required.
For a field that should itself be a nested object, give it type object and
its own properties and required block, the same pattern schema.json already
follows one level up. For a field that is a list of structured records
rather than plain strings, set items to a full schema instead of a single
type, and JSON Schema will apply it to every entry in the array.
`;

const meta: IdeToolMeta = {
  slug: "json-schema-validator-starter-tool",
  title: "JSON Schema Validator Starter Tool: A Real Schema and Script",
  name: "JSON Schema Validator Starter",
  category: "tool-definition-tools",
  summary:
    "Open a real, valid JSON Schema, a Python script that actually validates a sample object against it with the jsonschema package, and a keyword guide, then edit them into your own validator and download the result.",
  seo: {
    primaryKeyword: "json schema validator starter tool",
    keywords: [
      "json schema validator starter tool",
      "python jsonschema validation tool",
      "json schema starter kit download",
      "free json schema validator example",
      "validate json against a schema for free",
    ],
    seoTitle: "JSON Schema Validator Starter Tool: Real Schema and Script",
    seoDescription:
      "A free json schema validator starter tool with a real JSON Schema, a Python jsonschema validation script and a keyword guide, ready to edit in your browser.",
  },
  files: [
    { path: "schema.json", content: SCHEMA_JSON, kind: "json" },
    { path: "validate.py", content: VALIDATE_PY, kind: "code" },
    { path: "reference/json-schema-guide.md", content: JSON_SCHEMA_GUIDE_MD, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the keyword definitions in the JSON Schema project's own getting started guide and the Python jsonschema package documentation.",
    testedOn: ["Python jsonschema package, Draft202012Validator", "GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A schema that only checks type is a weak validator: a ticket record typed correctly but missing a required field, or a priority value outside the allowed list, still passes a type only check and fails somewhere further downstream instead. The starter schema pairs every property with the constraint that actually matters for it, a minimum on a count, an enum on a fixed set of values, a required array that matches the fields the sample data genuinely cannot do without, so the starting point demonstrates a validator that catches a real mistake rather than one that only confirms the input is valid JSON.",
  },
  article: {
    intro: [
      "This json schema validator starter tool opens three real, working files directly in your browser: a genuinely valid JSON Schema for a support ticket record, a short Python script that validates a sample data object against it using the jsonschema package, and a reference guide explaining what each keyword does. The schema validates against the current specification draft, the sample data genuinely passes it, and the script genuinely runs.",
      "A JSON Schema is a second JSON document describing the shape a piece of data has to have: which fields exist, what type each one is, which are required, and what extra constraints apply, such as a minimum value or a fixed list of allowed strings. That description is what a validator like the jsonschema package checks a real object against, giving you a real place to validate json against a schema for free before wiring the same check into a build step or a test suite.",
      "The schema and reference file run in the tab you are reading this in, making this a genuinely free json schema validator example rather than a signup gated service. validate.py is a real python jsonschema validation tool meant to run locally once Python and the jsonschema package are installed, since checking data on a real machine is the point of a starter script.",
    ],
    sections: [
      {
        heading: "What the three starter files actually contain",
        body: [
          "schema.json describes a support ticket: a numeric id, a short title, a priority restricted to a fixed set of values, a resolved flag, an optional reporter email and hours logged, and an optional list of tags. validate.py loads that schema, checks one sample ticket against it with the jsonschema package's Draft202012Validator, and prints either a pass message or every error found, each with the exact field path where the problem is. reference/json-schema-guide.md walks through every keyword used.",
          "Read the three files in that order: the schema for the shape, the script for the check, and the guide for why each keyword is there.",
        ],
      },
      {
        heading: "Type, properties and required: the three keywords doing the most work",
        body: [
          "type states what kind of value a field must be, string, integer, number, boolean or array, and is the first check any validator performs. properties maps each field name to its own smaller schema, so id, title, priority and the rest each carry their own type and description. required is separate from properties on purpose: it names which fields must actually be present, so a field can be fully described and still be entirely optional if its name never appears there.",
          "In this schema, id, title, priority and resolved are required; reported_by, time_spent_hours and tags are not, mirroring a real ticket that might be logged before anyone has picked it up or added detail yet.",
        ],
      },
      {
        heading: "Constraints beyond type: enum, minimum and string length",
        body: [
          "A type check alone catches a wrong kind of value but not a wrong shaped one. enum restricts priority to exactly low, medium, high or urgent instead of any string, stopping a typo like hihg from silently passing as an unrecognised priority. minimum keeps id and time_spent_hours from accepting a negative number, and minLength and maxLength bound how long the title string can be, so an empty title or a whole paragraph both fail.",
        ],
        list: [
          "enum limits a string to an exact, fixed list of allowed values.",
          "minimum and maximum bound a number or integer field.",
          "minLength and maxLength bound how long a string can be.",
        ],
      },
      {
        heading: "Running validate.py against the sample data",
        body: [
          "validate.py needs one dependency, installed with pip install jsonschema, then runs with python validate.py from the same folder as schema.json. It builds a Draft202012Validator from the schema, checks the sample ticket near the top of the file, and either prints a pass message or lists every error found, sorted by field path. Editing SAMPLE_DATA to break a rule, an id of zero, or a priority outside the enum, shows the error output change.",
        ],
      },
      {
        heading: "How this differs from a function calling or structured output schema tool",
        body: [
          "It is worth being precise about what this starter is not. A function calling schema describes the parameters a single callable tool accepts inside a model API request; a structured output schema describes the shape a model's own response has to come back in. Both are JSON Schema used for a specific request or response contract with a model. This json schema validator starter tool is for the more general case: validating any piece of structured data, a config file, an exported record, against a schema with a real, runnable script, independent of any model call. If the goal is a function's parameters or a model's response contract, use one of those separate, more specific starters; if the goal is checking arbitrary data against a schema you control, this is that starter.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import a .zip, reset to the starter files, or download the current set. Rewrite schema.json and adjust SAMPLE_DATA in validate.py, and the set is ready to leave the browser as a json schema starter kit download once it matches your data.",
        ],
      },
    ],
    howTo: {
      name: "How to build your own json schema validator starter tool from these files",
      steps: [
        { name: "Read the three starter files", text: "Open schema.json, validate.py and reference/json-schema-guide.md to see a real schema, a real check, and an explanation of every keyword used." },
        { name: "Rewrite schema.json for your own data", text: "Rename the properties, adjust each type, and update required to match the fields your own data cannot do without." },
        { name: "Update the sample data in validate.py", text: "Replace SAMPLE_DATA with a real example matching the fields you just wrote in schema.json." },
        { name: "Install jsonschema and run the script", text: "Run pip install jsonschema, then python validate.py, and read the pass message or the list of errors it prints." },
        { name: "Break the sample data on purpose", text: "Remove a required field or use a value outside an enum, run the script again, and confirm the error points at that field." },
        { name: "Download the finished kit", text: "Click Download .zip to save schema.json, validate.py and the reference guide exactly as shown." },
      ],
    },
    faq: [
      {
        question: "Do I need to already know JSON Schema to use this json schema validator starter tool?",
        answer:
          "No. The starter schema is a real, working example rather than a blank template, and the reference guide explains what every keyword it uses actually does, from the identity fields at the top down to the constraint on each property, so it is readable without prior JSON Schema experience.",
      },
      {
        question: "Is this the same as the function calling schema builder tool on this site?",
        answer:
          "No. That tool builds the schema describing a single callable function's parameters inside a model API request. This tool validates an arbitrary piece of structured data, such as a config file or an exported record, against a general JSON Schema with a real runnable script, independent of any model call.",
      },
      {
        question: "Do I need Python installed to run validate.py?",
        answer:
          "Yes, to actually run the validation script you need Python and the jsonschema package, installed with pip install jsonschema. Editing and reading schema.json and the reference guide in the browser editor does not require anything installed locally.",
      },
      {
        question: "Is anything I type into this editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, so downloading the .zip before you leave is the only way to keep the schema and script you have written.",
      },
      {
        question: "Does this tool run the Python script for me inside the browser?",
        answer:
          "No. The browser editor writes and downloads the files; it does not execute Python. validate.py is meant to run locally, or in whatever server or pipeline the real validation needs to happen in, once downloaded.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/tool-definition-tools",
        label: "Browse more tool definition builder tools",
        description: "Every builder tool in this category, for schemas, API wrappers and structured output contracts.",
      },
      {
        href: "/ide-tools/function-calling-schema-builder-tool",
        label: "Build a function calling schema instead",
        description: "The narrower schema this tool is deliberately not, for describing a single callable tool's parameters inside a model API request.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Check the JSON syntax first",
        description: "Confirm schema.json or your own data is syntactically valid JSON before running it through a schema check here.",
      },
      {
        href: "/data-analysis-prompts/python-analysis-prompt",
        label: "Get help writing self checking Python",
        description: "A prompt for Python that reports its own results at every step, a useful habit when extending validate.py.",
      },
    ],
    externalLinks: [
      {
        href: "https://json-schema.org/learn/getting-started-step-by-step",
        label: "JSON Schema's getting started guide",
        description: "The specification project's own walkthrough of the core keywords this starter schema is built from, verified against the current 2020-12 draft.",
      },
      {
        href: "https://python-jsonschema.readthedocs.io/en/stable/",
        label: "Python jsonschema package documentation",
        description: "The official documentation for the package validate.py imports, including the Draft202012Validator class used here.",
      },
      {
        href: "https://pypi.org/project/jsonschema/",
        label: "jsonschema on the Python Package Index",
        description: "The package listing and install instructions for the single dependency validate.py needs.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
        label: "MDN's JSON reference",
        description: "Background on the JSON data format itself, which a schema describes the shape of but does not replace.",
      },
    ],
  },
  tags: ["json schema", "validator", "python", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
