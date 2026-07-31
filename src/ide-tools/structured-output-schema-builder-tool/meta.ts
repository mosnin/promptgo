import type { IdeToolMeta } from "@/lib/ide-tool-types";

const OUTPUT_SCHEMA_JSON = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "support_ticket_triage_result",
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "enum": ["billing", "technical_issue", "account_access", "feature_request", "other"],
      "description": "The single best matching category for this support ticket, chosen from the fixed list. Use other only when none of the four named categories genuinely fits the ticket text."
    },
    "priority": {
      "type": "string",
      "enum": ["low", "medium", "high", "urgent"],
      "description": "How quickly this ticket needs a human response, judged from stated business impact and urgency language actually present in the ticket, not from tone alone."
    },
    "confidence": {
      "type": "number",
      "description": "A value from 0 to 1 stating how confident the classification is, where 1 means the category and priority are unambiguous from the ticket text and 0 means a guess. Most structured output modes do not support a numeric minimum or maximum keyword, so the 0 to 1 range is enforced here through the description rather than through a schema constraint."
    },
    "reason": {
      "type": "string",
      "description": "One or two sentences stating the specific words or details in the ticket that justify the chosen category and priority. Must reference the actual ticket content rather than restate the category name."
    },
    "requires_human_review": {
      "type": "boolean",
      "description": "True when confidence is low, the ticket mentions a legal, safety or billing dispute, or the ticket does not clearly fit any listed category. False otherwise."
    }
  },
  "required": ["category", "priority", "confidence", "reason", "requires_human_review"],
  "additionalProperties": false
}
`;

const STRUCTURED_OUTPUT_GUIDE = `# Structured output guide

This file explains why output_schema.json is written the way it is, and how
to reshape it into a different output contract without losing the properties
that make it reliable.

## What an output schema actually constrains

An output schema does not describe an action a model can take. It describes
the exact shape of the model's own final answer: which fields that answer
must contain, what type each one is, and which values a field is allowed to
take. When a provider's structured output mode is given this file, the
model's response is sampled so that it always matches the schema, rather than
producing free text that a person or a second script then has to parse and
hope is correct.

## Why every field needs an explicit type

A field with no declared type, or a schema that only names a field in prose
without a type keyword, leaves a model free to return a string where a
boolean was expected, or a number formatted as text. type "string", type
"number" and type "boolean" on category, confidence and requires_human_review
respectively remove that ambiguity before the request is ever sent. The enum
arrays on category and priority go a step further: they name the exact
closed set of acceptable values, so a model cannot invent a category such as
shipping that was never part of the taxonomy a downstream system expects.

## Why the required array has to list every property

additionalProperties is set to false on the object, which stops the model
adding a field nobody asked for, such as an unsolicited summary field bolted
onto the response. On its own that only prevents invention. The required
array does the other half of the job: it lists category, priority,
confidence, reason and requires_human_review by name, which stops the model
silently omitting one of them when an answer is ambiguous. Without a required
array a model under a strict schema can still return an object missing the
reason field entirely, and that gap is easy to miss until the missing field
breaks a downstream step. Listing every property in required, and keeping
that list in sync each time a property is added or removed, is what turns
additionalProperties false into a genuine guarantee rather than half of one.

## Extending this schema for a different output shape

To adapt output_schema.json to a different task, work through the same four
questions the support ticket triage example answers. First, what are the
individual pieces of the answer, each becoming one property. Second, does
each property have a genuinely fixed set of valid values, in which case give
it an enum, or is it open text or a number, in which case a plain type is
enough. Third, which of those properties can the task never be considered
answered without, which becomes the required array. Fourth, should the
response ever contain more than the named properties, which for a structured
output contract is almost always no, so additionalProperties stays false.
A sentiment analysis result might replace category and priority with a
single sentiment enum and a topics array of strings. A document extraction
result might replace the ticket specific fields entirely with the named
entities a downstream system needs, still following the same type, enum,
required and additionalProperties pattern underneath.

## What this file is not

This is not a function's input parameter schema. A tool or function calling
definition describes the arguments a model sends when it decides to call
code your application executes, and its properties are named after that
function's own parameters. This file constrains the opposite direction: the
model's own final response back to the caller, with no function execution
involved at all. It is also not a validator. Nothing here runs a check
against a JSON document you already have; it only defines the shape a
model's future output must take before that output is ever generated.
`;

const meta: IdeToolMeta = {
  slug: "structured-output-schema-builder-tool",
  title: "Structured Output Schema Builder Tool: A Real Response Contract",
  name: "Structured Output Schema Builder",
  category: "tool-definition-tools",
  summary:
    "Open a real, valid JSON Schema for constraining a model's own response in an in-browser editor, complete with a worked support ticket triage example, then rewrite it into your own output contract and download it.",
  seo: {
    primaryKeyword: "structured output schema builder tool",
    keywords: [
      "structured output schema builder tool",
      "openai structured outputs schema guide",
      "claude structured output schema for ai",
      "constrain ai model output to json schema",
      "free json schema builder for structured output",
    ],
    seoTitle: "Structured Output Schema Builder Tool: A Real Response Schema",
    seoDescription:
      "A free structured output schema builder tool that opens a real, valid JSON Schema for constraining a model's response in the browser, ready to edit and download.",
  },
  files: [
    { path: "output_schema.json", content: OUTPUT_SCHEMA_JSON, kind: "json" },
    { path: "reference/structured-output-guide.md", content: STRUCTURED_OUTPUT_GUIDE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the JSON Schema shape documented by Anthropic's Claude structured outputs page and OpenAI's structured outputs guide.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A structured output schema most often fails quietly rather than loudly: the JSON parses correctly, but a field the downstream code depends on is missing because it was never listed as required, or an unexpected extra field appears because additionalProperties was left unset. A worked example with a closed enum on every categorical field, a required array that names every property by hand, and additionalProperties set to false keeps both failure modes out of the starting point rather than leaving them to surface later in a production pipeline.",
  },
  article: {
    intro: [
      "This structured output schema builder tool opens a real, working example directly in your browser: a complete output_schema.json file for a support ticket triage result, plus a reference guide explaining why each part of it is written the way it is. Nothing here is templated with placeholder field names; the example is a genuine, complete schema ready to study before you reshape it into your own output contract.",
      "A structured output schema differs from a function's input parameter schema, even though both are written in JSON Schema. An input schema describes the arguments a model sends when it asks your code to run a function. An output schema describes the shape of the model's own final answer, with no function call involved. Getting that distinction right before writing the file avoids the most common confusion between the two.",
      "Everything runs in the tab you are reading this in, so nothing you type is uploaded anywhere. Editing, importing a .zip, and downloading the result all happen client side, which is what makes this a genuinely free json schema builder for structured output rather than a signup gated service.",
    ],
    sections: [
      {
        heading: "What the starter schema actually contains",
        body: [
          "This structured output schema builder tool's output_schema.json defines support_ticket_triage_result: a category chosen from a closed set of five values, a priority level, a confidence value, a short reason string, and a boolean flag for whether a human should review the result. It is deliberately realistic, the kind of shape a support inbox classifier actually needs to return.",
          "Every property carries its own type and description, category and priority are constrained with enum arrays, and the object closes with a required array naming all five properties plus additionalProperties set to false. That combination separates a schema that merely parses from one that actually constrains the model.",
        ],
      },
      {
        heading: "Why every field's type stops a model from inventing one",
        body: [
          "A field with no declared type leaves a model free to decide whether an answer should be a string or a number, and that variation is what a downstream system cannot absorb. Declaring type on every property, and using an enum for category and priority rather than a free text description, removes that guesswork. An enum is enforced by the schema itself; a description that only lists valid values in prose can only ask nicely.",
        ],
      },
      {
        heading: "Why a full required array stops a field being silently dropped",
        body: [
          "additionalProperties false prevents the model adding a field nobody asked for. It does nothing to stop the opposite failure: an object missing the reason field entirely, which a strict schema without a required array still permits. Listing all five properties by name in required closes that gap, worth rechecking each time a property is added or removed.",
        ],
        list: [
          "additionalProperties false stops the model inventing an extra, unrequested field.",
          "A complete required array stops the model omitting a field the caller depends on.",
          "An enum on a categorical field stops the model returning a value outside the known set.",
        ],
      },
      {
        heading: "Why confidence has no numeric minimum or maximum",
        body: [
          "The confidence field is a plain number rather than one constrained with a minimum or maximum keyword, a deliberate choice, not an oversight. Claude's structured output documentation states that numerical constraints are not part of its supported subset, and OpenAI's guide carries similar limits. The 0 to 1 range is stated in the description instead, since the whole point of this file is to constrain ai model output to json schema using keywords every provider actually supports.",
        ],
      },
      {
        heading: "Provider differences worth knowing before you edit",
        body: [
          "The inner object is close to identical across providers, but the outer wrapper differs. Anthropic's own claude structured output schema for ai requests uses output_config.format with type set to json_schema, nested under schema. The openai structured outputs schema guide wraps the same inner shape under a response_format or text.format field instead, again with a name and a strict flag. Renaming the outer field, not the inner object, is normally enough to move this file between providers.",
        ],
      },
      {
        heading: "How this differs from a function's input schema",
        body: [
          "A function calling schema, the shape this site's function calling schema builder tool works with, describes the arguments a model sends when it decides to call a function your application runs. output_schema.json constrains the opposite direction: the model's own final response back to the caller, with no function execution in the loop. If the goal is a tool call's arguments, that is a different starting point in the same category; if the goal is the shape of the model's answer, this is that file.",
        ],
      },
      {
        heading: "How this differs from a general purpose JSON validator",
        body: [
          "This tool is also not a validator. A validator script checks a document you already have against a schema after the fact. output_schema.json runs nothing on the page; it only defines the shape a future response must take, an authoring job rather than a validation one.",
        ],
      },
    ],
    howTo: {
      name: "How to build your own structured output schema with this tool",
      steps: [
        { name: "Read the starter files", text: "Open output_schema.json and the reference guide to see a complete, working example before changing anything." },
        { name: "List the pieces your answer needs", text: "Decide which properties the response must contain, the way category, priority, confidence, reason and requires_human_review were chosen here." },
        { name: "Give every property a type and, where valid, an enum", text: "Replace the existing properties with your own, using enum for any field with a fixed set of values." },
        { name: "Rewrite the required array to match exactly", text: "List every property the answer cannot be complete without, keeping additionalProperties set to false." },
        { name: "Check the JSON is valid", text: "Confirm every bracket, comma and quote is correct; most editors flag a syntax error as you type." },
        { name: "Download the finished schema", text: "Click Download .zip to save the files exactly as shown, ready to drop into a structured output request." },
      ],
    },
    faq: [
      {
        question: "Do I need to already know a provider's exact structured output format to use this structured output schema builder tool?",
        answer:
          "No. The starter file uses the shared inner shape, a typed properties object, a required array and additionalProperties set to false, that both Anthropic and OpenAI build their structured output request around. The provider differences section explains the small wrapping change each API needs around that inner object.",
      },
      {
        question: "Is this the same as a function calling or tool input schema?",
        answer:
          "No. A function calling schema describes the arguments a model sends when it decides to call a function your code then executes. This tool builds the schema that constrains the model's own final response back to the caller, with no function call involved.",
      },
      {
        question: "Does this tool validate a JSON document I already have?",
        answer:
          "No. This tool authors the schema a future model response must follow; it does not check an existing document after the fact. A dedicated JSON Schema validator is the right tool for checking whether an existing document is compliant.",
      },
      {
        question: "Is anything I type into this editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, so downloading the .zip before you leave is the only way to keep the schema you have written.",
      },
      {
        question: "Can I add nested objects or an array of results to the schema?",
        answer:
          "Yes. JSON Schema supports object and array typed properties with their own nested properties and required arrays, so a triage result can become an array, as long as each level follows the same type, required and additionalProperties pattern.",
      },
      {
        question: "Why does the confidence field not use a minimum or maximum keyword?",
        answer:
          "Because major providers' structured output modes commonly do not support numerical constraints in the JSON Schema subset they actually enforce. Stating the expected 0 to 1 range in the description keeps the schema valid under those tighter limits rather than only working in a generic validator.",
      },
      {
        question: "What happens if I import a .zip that already has different files?",
        answer:
          "Importing replaces the current file set with whatever text files the archive contains, so you can bring in an existing schema project and keep editing it. Binary files inside the archive are skipped, since the editor only handles plain text.",
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
        label: "Build a function's input schema instead",
        description: "The input parameter schema this tool is deliberately not, for when the goal is a tool call rather than a constrained response.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Validate the schema you write here",
        description: "Paste the finished JSON in to check it parses cleanly before it goes into a real structured output request.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Get help writing clear field descriptions",
        description: "A prompt for turning a rough explanation of a field into clear documentation, useful discipline for a schema property description.",
      },
    ],
    externalLinks: [
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
        label: "Anthropic's Claude structured outputs documentation",
        description: "The authoritative source confirming output_config.format, the required array and additionalProperties false this schema was checked against.",
      },
      {
        href: "https://developers.openai.com/api/docs/guides/structured-outputs",
        label: "OpenAI's structured outputs guide",
        description: "A second major provider's own documentation for the same underlying schema shape, wrapped differently in its request format.",
      },
      {
        href: "https://json-schema.org/understanding-json-schema/",
        label: "Understanding JSON Schema",
        description: "The independent specification guide for the type, enum, required and additionalProperties conventions the schema is built from.",
      },
    ],
  },
  tags: ["structured output", "json schema", "output schema", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
