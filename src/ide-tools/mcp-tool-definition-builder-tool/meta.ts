import type { IdeToolMeta } from "@/lib/ide-tool-types";

const TOOL_DEFINITION_PY = `"""
Example MCP tool definition: convert_temperature

This file demonstrates ONE complete tool defined inside an MCP server using
the @mcp.tool() decorator, the pattern documented at
https://modelcontextprotocol.io/quickstart/server and in the MCP Python SDK
README. It is a real, working example meant to be adapted: copy the shape
below into your own server file, rename the function, and replace the
conversion logic with whatever your tool actually needs to do. It is not a
bare stub; running it as written starts a working server with one callable
tool.

ACCURACY NOTE: as of the current MCP Python SDK (v2, the stable release
line), the high level server class is MCPServer, imported from mcp.server.
Older tutorials call this same class FastMCP, imported from
mcp.server.fastmcp. That import path was renamed rather than kept as an
alias, so code copied from an older guide will fail on import until both the
class name and the import line are updated to match what is shown below.
"""

from mcp.server import MCPServer

# Every MCP server needs exactly one server instance. The string passed in
# names the server itself, not any individual tool it exposes; a connecting
# client sees this name once, before it ever calls a tool.
mcp = MCPServer("unit-conversion-example")


# NAME: the decorator below registers the function's own name, convert_temperature,
# as the tool's callable name. Keep it a specific verb and object, not a
# generic label like run or handle, so a model choosing between several
# tools can tell what each one actually does from the name alone.
@mcp.tool()
def convert_temperature(value: float, from_unit: str, to_unit: str) -> dict[str, float | str]:
    """Convert a temperature value between Celsius, Fahrenheit and Kelvin.

    Use this tool whenever a user gives a temperature reading in one unit
    and needs it expressed in another, for example converting a weather
    forecast from Fahrenheit to Celsius, or a lab reading from Kelvin to
    Celsius. Do not use this tool for anything other than a plain unit
    conversion; it does not look up current weather or any other outside
    data on its own.

    Args:
        value: The temperature to convert, as a plain number in from_unit.
        from_unit: The unit value is currently in. One of "celsius",
            "fahrenheit" or "kelvin", case insensitive.
        to_unit: The unit to convert value into. One of "celsius",
            "fahrenheit" or "kelvin", case insensitive.
    """
    # INPUT PARAMETER TYPES: value is a float, from_unit and to_unit are
    # strings. Python's own type hints double as the tool's input schema,
    # so a vague type such as "value: Any" or a missing hint entirely
    # leaves the calling model guessing at what a valid call looks like.
    units = {"celsius", "fahrenheit", "kelvin"}
    from_unit = from_unit.strip().lower()
    to_unit = to_unit.strip().lower()
    if from_unit not in units or to_unit not in units:
        raise ValueError(f"from_unit and to_unit must each be one of {sorted(units)}")

    # Normalise to Celsius first, then convert out to the target unit. Two
    # short conversions instead of writing out all six direct formulas.
    if from_unit == "fahrenheit":
        celsius = (value - 32) * 5 / 9
    elif from_unit == "kelvin":
        celsius = value - 273.15
    else:
        celsius = value

    if to_unit == "fahrenheit":
        converted = celsius * 9 / 5 + 32
    elif to_unit == "kelvin":
        converted = celsius + 273.15
    else:
        converted = celsius

    # RETURN SHAPE: a small dict rather than a bare number. The result
    # carries its own unit alongside the value, so the calling model does
    # not have to remember which unit it asked for several turns earlier.
    return {"value": round(converted, 2), "unit": to_unit}


if __name__ == "__main__":
    # transport="stdio" is the local transport a command line MCP host,
    # such as Claude Desktop, expects when it starts this file as a
    # subprocess. A server exposed over a network would pass a different
    # transport value here instead.
    mcp.run(transport="stdio")
`;

const TOOL_DEFINITION_GUIDE_MD = `# What makes a good MCP tool definition

A tool definition is read twice: once by a person maintaining the server,
and, every single time it is offered to a model, by the model deciding
whether and how to call it. The second reader never sees your source
comments, your commit history or the conversation where you decided what
the tool should do. It sees the function name, the parameter names and
types, and the docstring. Everything below is about writing those four
things so the second reader gets it right on the first try.

## Name the tool as a specific verb and object

A tool named run, handle or process tells a model nothing about when to
reach for it over any other tool in the same server. A tool named
convert_temperature, or lookup_customer_by_email, states its own job in the
name alone. When a server exposes more than one tool, a model is choosing
between names before it ever reads a docstring, so a vague name costs a
wrong call before the description even gets read.

## Give every parameter a specific name and a real type

from_unit and to_unit tell a model something a and b never could. Pair that
specific naming with a real type hint on every parameter: float instead of
a bare number, a string with an enumerated set of valid values spelled out
in the docstring instead of an unconstrained str. The SDK turns those type
hints directly into the schema a client validates a call against before it
ever reaches your function, so a missing or vague type is not a cosmetic
gap, it is a validation gap.

## Write the docstring as an instruction, not a label

The first line of a tool's docstring becomes its description exactly as
shown to the model, so it needs to state plainly what the tool does. A
docstring that just repeats the function name back ("Converts a
temperature") wastes the one sentence a model reads before deciding whether
this tool fits the request in front of it. State the specific operation, and
where it matters, state when to use the tool and when not to: a boundary
case named explicitly in the docstring is a wrong call that never happens.

## Document each parameter in an Args section

An Args section listing every parameter by its exact name, with a short
description of what a valid value looks like, removes the single most
common source of a malformed call: a parameter whose purpose the model had
to infer from its name alone. State units, formats and any default
behaviour explicitly rather than assuming the name is self explanatory,
because the model calling this tool has no access to your source comments,
only the docstring text itself.

## State the return shape plainly

A tool that returns a bare number leaves a model to guess what unit or
meaning that number carries by the time it is three turns into a
conversation. Returning a small, named structure instead, the way
tool_definition.py returns a value paired with its unit, keeps the result
self describing without requiring the model to remember the original call.
`;

const meta: IdeToolMeta = {
  slug: "mcp-tool-definition-builder-tool",
  title: "MCP Tool Definition Builder Tool: A Real @mcp.tool() Example",
  name: "MCP Tool Definition Builder",
  category: "mcp-server-tools",
  summary:
    "Open a working, single tool MCP server file in the browser, built on the current officially documented @mcp.tool() decorator pattern, and rewrite it into your own tool.",
  seo: {
    primaryKeyword: "mcp tool definition builder tool",
    keywords: [
      "mcp tool definition builder tool",
      "mcp tool definition template",
      "python mcp server tool example",
      "fastmcp tool decorator example",
      "how to define an mcp tool",
    ],
    seoTitle: "MCP Tool Definition Builder Tool: Real @mcp.tool() Example",
    seoDescription:
      "A free mcp tool definition builder tool that opens one working @mcp.tool() example in the browser, checked against the current MCP Python SDK docs.",
  },
  files: [
    { path: "tool_definition.py", content: TOOL_DEFINITION_PY, kind: "code" },
    { path: "reference/tool-definition-guide.md", content: TOOL_DEFINITION_GUIDE_MD, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Checked against the current Model Context Protocol Python SDK documentation and quickstart guide before publishing.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "Models asked to draft an MCP tool definition from memory frequently import the old FastMCP class from mcp.server.fastmcp, a path the current Python SDK removed rather than kept as an alias, or write a docstring with no Args section, leaving every parameter without a stated purpose for the calling model to infer on its own. A fixed example that imports MCPServer directly and documents each parameter in an Args section removes both failure modes before they ever reach a real server file.",
  },
  article: {
    intro: [
      "This mcp tool definition builder tool opens one complete, working tool definition for a Model Context Protocol server directly in your browser: tool_definition.py, a single @mcp.tool() decorated function with real type hints, a real docstring and a real return value, plus a reference guide on what makes that docstring work for a model rather than just a person. Nothing here is a bare stub with the logic missing; it is a real conversion tool, ready to be renamed and rewritten into whatever tool your own server actually needs.",
      "A tool is one of three things an MCP server can expose to a model, alongside a resource, which is file like data a client can read, and a prompt, which is a reusable template a user selects. This builder tool is specifically for the tool primitive. If you are looking to scaffold a resource or a prompt definition instead, look for a dedicated builder tool for that primitive in the same MCP server category.",
      "Everything in the editor beside this article runs in the tab you are reading it in. Editing the starter file, adding a second file, importing a .zip you already have, and downloading the result as a fresh archive all happen client side, with nothing about the file's contents ever uploaded anywhere in between.",
    ],
    sections: [
      {
        heading: "Why this example is checked against the current SDK, not memory",
        body: [
          "A model asked to write an MCP tool definition from memory reaches for whatever pattern was most common in its training data, which for MCP has meant a class called FastMCP, imported from mcp.server.fastmcp. That import path is gone in the current stable release of the MCP Python SDK, replaced by a class named MCPServer imported directly from mcp.server. Every field in this mcp tool definition template was checked against the current SDK documentation and the official quickstart guide before publishing.",
        ],
      },
      {
        heading: "The decorator itself has not changed",
        body: [
          "If you have seen a fastmcp tool decorator example in an older tutorial, the decorator syntax itself, @mcp.tool() placed directly above a type hinted function, is exactly the same in the current SDK. What changed is only the class it hangs off: MCPServer instead of FastMCP, imported from a different module path. Updating an existing server only means changing two lines, the import and the instantiation.",
        ],
      },
      {
        heading: "Reading tool_definition.py as a python mcp server tool example",
        body: [
          "tool_definition.py is a complete, working python mcp server tool example: convert_temperature takes a numeric value and two unit strings, validates them, and returns a small dict pairing the converted number with its unit. The four things a model actually reads, the function name, the parameter types, the docstring, and the return shape, are each explained by a comment at the point where they appear in the file.",
        ],
        list: [
          "The function name states the specific operation, not a generic label like run or process.",
          "Each parameter carries a real type hint, and the docstring's Args section states the valid values for each string parameter.",
          "The return value is a small dict, not a bare number, so the unit travels with the result.",
        ],
      },
      {
        heading: "Writing a docstring a model can act on",
        body: [
          "The first line of a tool's docstring becomes its description exactly as a connecting client sees it, and the Args section beneath it tells a model what a valid call looks like parameter by parameter. reference/tool-definition-guide.md walks through naming a tool as a specific verb and object, typing every parameter instead of leaving one vague, and stating plainly what the tool returns, all illustrated against the same convert_temperature function.",
        ],
      },
      {
        heading: "Adapting the example into your own tool",
        body: [
          "Using this mcp tool definition builder tool to adapt convert_temperature into your own tool means changing four things in order: rename the function to a specific verb and object, replace the parameters with your real inputs and their real types, rewrite the docstring and Args section to match, and replace the logic with whatever your tool actually computes or fetches. Keeping the return value a small, named structure carries over regardless of what the tool itself does.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import a .zip, reset the starter files, or download the current set. Importing reads a .zip picked from your own device entirely client side, with nothing about its contents ever leaving the browser tab.",
        ],
      },
    ],
    howTo: {
      name: "How to build an MCP tool definition with this tool",
      steps: [
        { name: "Read tool_definition.py before changing anything", text: "Open the file and read the comments beside the import line, the decorator, the parameters and the return statement." },
        { name: "Rename the function and rewrite the docstring", text: "Replace convert_temperature with your own specific verb and object, and rewrite the first line and Args section to match." },
        { name: "Replace the parameters with your tool's real inputs", text: "Swap value, from_unit and to_unit for your own parameters, each with a real type hint and stated valid values." },
        { name: "Replace the conversion logic with your tool's real behaviour", text: "Delete the temperature math and write what your function should compute or fetch, keeping validation before the main logic." },
        { name: "Keep the return value a named structure", text: "Return a small dict describing the result, the same shape convert_temperature uses, rather than one bare value." },
        { name: "Download the finished files", text: "Click Download .zip to save both files exactly as shown, ready to drop into a real MCP server." },
      ],
    },
    faq: [
      {
        question: "Should I use FastMCP or MCPServer in a new tool definition?",
        answer:
          "Use MCPServer, imported from mcp.server. FastMCP, imported from mcp.server.fastmcp, was the name used by an earlier release of the SDK, and that import path has been removed rather than kept as a working alias. This starter file already uses the current class name.",
      },
      {
        question: "Does downloading this file give me a working MCP server?",
        answer:
          "It gives you a working single file server exposing one tool, which runs as written once you install the mcp package and start the file directly. A real server usually exposes more than one tool, so treat this as the starting shape for one tool definition inside a larger project.",
      },
      {
        question: "How to define an MCP tool that calls an external API instead of doing local math?",
        answer:
          "Write the function as async def instead of def, and await your HTTP call inside it the same way the official quickstart's weather example does; @mcp.tool() works identically on an async function. Keep the same typed parameters, docstring Args section, and small named return structure, since none of that changes just because the logic now depends on a network call.",
      },
      {
        question: "Can I add a resource or a prompt definition alongside this tool?",
        answer:
          "Yes. A single MCPServer instance can expose tools, resources and prompts together using their own respective decorators, and nothing here prevents adding more. This starter file is scoped to one tool definition on purpose, so look for a dedicated resource or prompt definition builder tool in the same category if you want a starting file for either instead.",
      },
      {
        question: "Is this mcp tool definition template specific to any one MCP host?",
        answer:
          "No. The file uses stdio transport, the default local transport most command line hosts, including Claude Desktop, expect from a server they start as a subprocess. Nothing about the tool definition itself, the decorator, the typed parameters or the docstring, is specific to any single host; only the transport argument passed to mcp.run would change for a networked server.",
      },
      {
        question: "Is anything I type into the editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing persists once you close or reload the page, so downloading the .zip before you leave is the only way to keep whatever you have written.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/mcp-server-tools",
        label: "Browse more MCP server builder tools",
        description: "Every starter file set in this category for scaffolding a Model Context Protocol server, tool, resource or manifest.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "See the AI skill builder tool",
        description: "The same in-browser editor pattern applied to starting a new AI skill's files instead of an MCP tool definition.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Get help documenting an API endpoint",
        description: "A prompt for writing precise, traceable documentation, the same discipline a good tool docstring needs.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Validate a JSON structure",
        description: "Check that a structured return value or a manifest file is well formed JSON before it ships.",
      },
    ],
    externalLinks: [
      {
        href: "https://modelcontextprotocol.io/quickstart/server",
        label: "The official MCP server quickstart",
        description: "Anthropic's own walkthrough of building an MCP server, including the exact @mcp.tool() decorator pattern this starter file follows.",
      },
      {
        href: "https://github.com/modelcontextprotocol/python-sdk",
        label: "The MCP Python SDK source and README",
        description: "The maintained source for the mcp package, including the current MCPServer class this file imports.",
      },
      {
        href: "https://py.sdk.modelcontextprotocol.io/whats-new/",
        label: "What changed in the MCP Python SDK v2",
        description: "The SDK's own migration notes documenting the FastMCP to MCPServer rename referenced in this article.",
      },
      {
        href: "https://docs.python.org/3/library/typing.html",
        label: "Python's typing module documentation",
        description: "Reference for the type hints that double as an MCP tool's input schema, directly relevant to typing each parameter correctly.",
      },
    ],
  },
  tags: ["mcp", "model context protocol", "tool definition", "python", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
