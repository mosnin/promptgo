import type { IdeToolMeta } from "@/lib/ide-tool-types";

const FUNCTION_SCHEMA_JSON = `{
  "name": "convert_temperature",
  "description": "Converts a numeric temperature value from one unit to another. Supports Celsius, Fahrenheit and Kelvin, and returns the converted value rounded to two decimal places. Call this whenever a user gives a temperature in one unit and asks for it in another, rather than converting the value yourself.",
  "parameters": {
    "type": "object",
    "properties": {
      "value": {
        "type": "number",
        "description": "The numeric temperature value to convert, expressed in the unit named by from_unit. For example 100 when converting 100 degrees Celsius."
      },
      "from_unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit", "kelvin"],
        "description": "The unit the input value is currently measured in."
      },
      "to_unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit", "kelvin"],
        "description": "The unit to convert the input value into."
      }
    },
    "required": ["value", "from_unit", "to_unit"]
  }
}
`;

const SCHEMA_FIELD_GUIDE = `# Schema field guide

This file explains what makes each part of function_schema.json actually
work, rather than just parse. A schema that is valid JSON but poorly written
still fails in practice: the model calls the function with the wrong
arguments, skips calling it when it should, or calls it when a plain text
answer would have been correct. The three fields below are where that
failure gets fixed or introduced.

## The name field

A function name is the single strongest signal a model uses to decide
whether a function is relevant to the current request, so it needs to read
as a specific action rather than a general topic. convert_temperature tells
a model exactly what happens when it is called. temperature_tool or
temp_helper does not: both describe a subject area rather than an action,
which leaves the model guessing whether this is the right function for a
conversion, a lookup, or something else entirely.

Keep the name in the same casing style the target provider's own examples
use, normally lower snake case, and avoid two functions in the same tool
list whose names differ only by a word a model could easily confuse, such as
get_weather and get_weather_forecast side by side.

## The description field

The description is read by the model, not by a person skimming
documentation, so it should state exactly when to call the function and what
it returns, in plain sentences. A one line description such as "converts
temperature" leaves the model to guess the input format, the supported
units, and whether it should call this function at all for a borderline
request. The description in function_schema.json instead states the
supported units, the rounding behaviour, and the specific condition under
which the model should reach for this function instead of computing the
answer itself.

Write the description the way you would explain the function to a new
colleague who cannot see its code: what it does, what it needs, what comes
back, and any limit worth knowing before calling it.

## Parameter descriptions

Every property inside parameters.properties needs its own description,
because the top level function description cannot carry enough detail for
every individual argument. A good parameter description states the expected
format or unit, gives a concrete example where the format could be
ambiguous, and says whether a default applies when the parameter is
optional. The value parameter above gives a worked example number tied to a
specific unit, which removes any doubt about whether the model should send
a raw number or a formatted string.

For a parameter with a fixed set of valid values, prefer an enum array over
a free text description that only lists the choices in prose, since an enum
is validated by the calling code before the request ever reaches your
function, while a description can only ask nicely.

## The required array

List every parameter the function cannot run without, and only those
parameters. A required array that is too short lets the model omit a
genuinely necessary argument and produces a runtime error your code then has
to handle; a required array that is too long forces the model to invent a
value for something that should have been optional. Cross check the
required array against the properties object each time a parameter is added
or removed, since the two are easy to let drift apart.
`;

const meta: IdeToolMeta = {
  slug: "function-calling-schema-builder-tool",
  title: "Function Calling Schema Builder Tool: Start From a Real Example",
  name: "Function Calling Schema Builder",
  category: "tool-definition-tools",
  summary:
    "Open a real, valid function calling JSON schema in an in-browser editor, complete with a worked example function and a field guide, then rewrite it into your own tool definition and download it.",
  seo: {
    primaryKeyword: "function calling schema builder tool",
    keywords: [
      "function calling schema builder tool",
      "build a tool definition json schema",
      "openai function calling tool example",
      "claude tool use schema example",
      "free json schema builder for ai tools",
      "function calling schema example download",
    ],
    seoTitle: "Function Calling Schema Builder Tool: Write a Real Example Free",
    seoDescription:
      "A free function calling schema builder tool that opens a real, valid JSON function definition in the browser, ready to edit and download as a starter file.",
  },
  files: [
    { path: "function_schema.json", content: FUNCTION_SCHEMA_JSON, kind: "json" },
    { path: "reference/schema-field-guide.md", content: SCHEMA_FIELD_GUIDE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the function calling schema shape documented by Anthropic's Claude API and OpenAI's function calling guide.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Function calling schemas most often fail not because the JSON is invalid but because the description fields are too thin to guide a model's decision: a one line description leaves a model unsure whether a borderline request should trigger the call, and a missing parameter description leaves it guessing the expected unit or format. A worked example with full sentence descriptions on every field, plus a required array that matches the properties exactly, keeps that ambiguity out of the starting point rather than leaving it to be discovered after a silent wrong call.",
  },
  article: {
    intro: [
      "This function calling schema builder tool opens a real, working example directly in your browser: a complete function_schema.json file for a simple temperature conversion function, plus a field guide explaining what makes each part of it work rather than just parse. Nothing here is a placeholder; the example function is genuinely complete and ready to study before you replace it with your own.",
      "A function calling schema is the contract between an agent and a specific action it can take: a name the model matches against a request, a description that tells it when and why to call the function, and a parameters object, written in JSON Schema conventions, that states exactly what arguments the function needs and which are required. Get any one of those three pieces wrong and the failure shows up later and quietly, as a skipped call or a wrong argument.",
      "Everything here runs in the tab you are reading this in, so you can build a tool definition json schema without anything you type being uploaded anywhere, which is also what makes this a genuinely free json schema builder for ai tools rather than a signup gated service.",
    ],
    sections: [
      {
        heading: "What the starter schema actually contains",
        body: [
          "This function calling schema builder tool's function_schema.json defines convert_temperature, a function that converts a numeric value between Celsius, Fahrenheit and Kelvin. It is deliberately simple: no external API, no authentication, nothing beyond its own arguments.",
          "The three top level fields, name, description and parameters, are the same fields you will see in almost every provider's documentation, even where the wrapping differs. Inside parameters, type is object, properties lists each argument with its own type and description, and required names every argument the function cannot run without.",
        ],
      },
      {
        heading: "Naming the function so a model does not have to guess",
        body: [
          "A function name carries more weight in a model's decision than almost any other field, because it is often the shortest signal the model has for whether a function is relevant to the current request. convert_temperature states an action, not a topic; a name like temperature_tool would leave a model guessing whether the function converts, looks up, or reports on temperature at all. When a tool list has more than one function, keeping names distinct enough that a model cannot confuse two of them matters as much as getting any single name right.",
        ],
      },
      {
        heading: "Writing a description a model can act on",
        body: [
          "The description field in function_schema.json states what the function does, which units it supports, how the result is rounded, and the condition under which the model should call it instead of computing an answer itself. A model asked to convert a temperature can often produce a plausible sounding number on its own, so a description that does not say to call the function anyway will sometimes be ignored in favour of a guess.",
        ],
        list: [
          "State what the function does in plain, specific language, not a single vague verb.",
          "Name every supported value or unit rather than leaving the model to infer the range.",
          "Say explicitly when the model should call the function instead of answering directly.",
        ],
      },
      {
        heading: "Provider differences worth knowing before you edit",
        body: [
          "The parameters object in this starter file follows plain JSON Schema conventions, and that inner shape, type, properties and required, is close to identical across providers. What differs is the wrapping around it. An openai function calling tool example nests this same block under a parameters field on a function object, inside a tools array item shaped as type, function, name, description, parameters. A claude tool use schema example instead calls the same block input_schema, placed directly alongside name and description with no separate function wrapper. Only the outer field name changes, so a schema built here adapts to either provider by renaming one field.",
        ],
      },
      {
        heading: "How this differs from an MCP tool definition",
        body: [
          "It is worth being precise about what this tool is not. A Model Context Protocol server defines a tool as a decorated function inside server code, where the schema is generated from the function's own type hints and docstring rather than written as a standalone JSON file the way function_schema.json is here. That pattern is protocol specific: it registers a tool with an MCP server a client discovers at runtime. What this tool builds is the provider agnostic JSON shape passed directly inside a model API call, with no server or protocol layer involved. If the goal is scaffolding an MCP server's own registration code, that is a different starting point in the MCP server category; if the goal is the schema a model API call reads directly, this is that file.",
        ],
      },
      {
        heading: "Editing, validating and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import a .zip, reset to the starter example, or download the current set as a fresh archive. Every visitor session opens the same function calling schema example download, so the editor shows exactly what ends up in the archive you keep.",
        ],
      },
    ],
    howTo: {
      name: "How to build your own function calling schema with this tool",
      steps: [
        { name: "Read the starter files", text: "Open function_schema.json and reference/schema-field-guide.md to see a complete, working example before changing anything." },
        { name: "Rename the function and rewrite its description", text: "Replace convert_temperature with your own function's name, and rewrite the description to state what it does and when a model should call it." },
        { name: "Edit the parameters object", text: "Add, remove or rename the properties under parameters.properties, giving each one a type and an example bearing description." },
        { name: "Update the required array", text: "Match the required array to exactly the parameters your function cannot run without, no more and no fewer." },
        { name: "Check the JSON is valid", text: "Confirm every bracket and comma is correct; most editors flag a syntax error as you type." },
        { name: "Download the finished schema", text: "Click Download .zip to save function_schema.json and the field guide exactly as shown, ready to drop into an API call." },
      ],
    },
    faq: [
      {
        question: "Do I need to already know a provider's exact function calling format to use this function calling schema builder tool?",
        answer:
          "No. The starter file uses the shared inner shape, a name, a description and a parameters object built from type, properties and required, that nearly every provider's format is built around. The provider differences section explains the wrapping a specific API needs.",
      },
      {
        question: "Is this the same as an MCP tool definition?",
        answer:
          "No. An MCP tool definition is generated from decorated function code inside a Model Context Protocol server, discovered by a client at runtime through the protocol. This tool builds the plain JSON schema passed directly inside a model API call, with no server or protocol layer involved.",
      },
      {
        question: "Is anything I type into this editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, so downloading the .zip before you leave is the only way to keep the schema you have written.",
      },
      {
        question: "Can I add more parameters or a nested object parameter?",
        answer:
          "Yes. JSON Schema supports object and array typed properties with their own nested properties and required arrays, so a parameter can be a single string or a structured nested object, as long as it still follows the same type, properties and required pattern.",
      },
      {
        question: "Does this tool check whether my finished schema is correct?",
        answer:
          "This tool does not run a validator against your JSON as you type; it provides a real, working starting example and a field guide explaining what a good name, description and parameter description look like. Checking the finished file against a JSON Schema validator is still worth doing before it goes into a real API call.",
      },
      {
        question: "Which model providers does this schema shape actually work with?",
        answer:
          "The inner parameters block, built from type, properties and required, is shared across the major providers that support function calling, including OpenAI and Anthropic's Claude API, and is close to the shape Google's Gemini uses. Only the outer field names and nesting differ between them.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/tool-definition-tools",
        label: "Browse more tool definition builder tools",
        description: "Every builder tool in this category, for schemas, API wrappers and structured output contracts.",
      },
      {
        href: "/ide-tools/mcp-server-tools",
        label: "Scaffold an MCP server instead",
        description: "Starter files for the Model Context Protocol server pattern this tool is deliberately not, if that is the format you actually need.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Get help writing clear API documentation",
        description: "A prompt for turning a rough explanation of an endpoint into clear documentation, useful discipline for a function description.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Validate the JSON you write here",
        description: "Paste the finished schema in to check it parses cleanly before it goes into a real API call.",
      },
    ],
    externalLinks: [
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/tool-use/overview",
        label: "Anthropic's Claude tool use documentation",
        description: "The authoritative source this schema's inner shape was checked against, showing the name, description and input_schema fields on a real tool definition.",
      },
      {
        href: "https://developers.openai.com/api/docs/guides/function-calling",
        label: "OpenAI's function calling guide",
        description: "A second major provider's own documentation for the same underlying parameters shape, wrapped differently at the top level.",
      },
      {
        href: "https://json-schema.org/understanding-json-schema/",
        label: "Understanding JSON Schema",
        description: "The independent specification guide for the type, properties and required conventions the parameters object is built from.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/function-calling",
        label: "Google's Gemini function calling documentation",
        description: "A third provider's take on the same shape, useful evidence that the underlying contract is genuinely provider agnostic.",
      },
    ],
  },
  tags: ["function calling", "json schema", "tool definition", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
