import type { IdeToolMeta } from "@/lib/ide-tool-types";

const SERVER_PY = `"""
Starter MCP (Model Context Protocol) server entry point.

This file follows the pattern documented in the official MCP Python SDK's
own quickstart: a single server instance built from MCPServer, one tool
registered on it with the @mcp.tool() decorator, and a run call at the
bottom that starts the protocol loop over the stdio transport. See
https://modelcontextprotocol.io/quickstart/server for the canonical version
of this shape, and the SDK's own README at
https://github.com/modelcontextprotocol/python-sdk for the same pattern
written out as a minimal example.

Replace the example tool below with the real tool this server exposes. The
overall shape, the import, the server instance and the run call at the
bottom, stays the same for almost every server built on this SDK.
"""

from mcp.server import MCPServer

# Replace "Example MCP Server" with the real name of your server. This is
# the name an MCP host such as Claude for Desktop shows to a person choosing
# which server to connect to, so make it describe what the server actually
# does once the placeholder tool below is replaced.
mcp = MCPServer("Example MCP Server")


@mcp.tool()
def convert_temperature(value: float, unit: str) -> str:
    """Convert a temperature between Celsius and Fahrenheit.

    This is the placeholder example tool this starter ships with, chosen
    because it is small, self contained and needs no network call or API
    key to run. Replace this whole function with the real tool your server
    exposes. The function's type hints become the tool's input schema
    automatically, and this docstring becomes the description an MCP host
    shows a model deciding whether to call it, so keep both accurate once
    you replace the body.

    Args:
        value: The temperature to convert.
        unit: The unit "value" is currently in, either "c" or "f".
    """
    normalised_unit = unit.strip().lower()
    if normalised_unit in ("c", "celsius"):
        converted = (value * 9 / 5) + 32
        return f"{value} degrees Celsius is {converted:.1f} degrees Fahrenheit."
    if normalised_unit in ("f", "fahrenheit"):
        converted = (value - 32) * 5 / 9
        return f"{value} degrees Fahrenheit is {converted:.1f} degrees Celsius."
    return 'Unit must be "c" for Celsius or "f" for Fahrenheit.'


# Entry point. An MCP host launches this file as a subprocess and talks to
# it over standard input and output, so mcp.run(transport="stdio") is the
# call that starts the protocol loop and blocks until the host disconnects.
# Leave this block as it is; almost nothing about it changes between
# servers, since the transport and the startup sequence are not specific to
# any one tool.
if __name__ == "__main__":
    mcp.run(transport="stdio")
`;

const REQUIREMENTS_TXT = `# Core dependency for building a Model Context Protocol server in Python.
# The "cli" extra adds the "mcp" command line tool used for local testing,
# specifically "mcp dev server.py", on top of the base server and client
# SDK that server.py imports from directly.
#
# Install everything this file lists with:
#   pip install -r requirements.txt
#
# This is the same package and the same "cli" extra named in the MCP Python
# SDK's own documented install command, "pip install mcp[cli]", current as
# of the SDK's v2 release line, which requires Python 3.10 or higher.
mcp[cli]>=2.0.0
`;

const README_MD = `# Example MCP Server

A minimal starter entry point for a Model Context Protocol (MCP) server,
built on the official MCP Python SDK's MCPServer class. It registers one
example tool, convert_temperature, so the file runs immediately and shows
the correct shape rather than sitting empty. Replace the example tool in
server.py with whatever your own server actually needs to expose, and
rename the server itself once you do.

## Requirements

- Python 3.10 or higher, the minimum version the MCP Python SDK documents
  as supported.
- The mcp package with its cli extra, which adds the mcp command line tool
  used below for local testing.

## Install the dependency

Using uv, the tool the official quickstart is written around:

\`\`\`bash
uv add "mcp[cli]"
\`\`\`

Or with plain pip, using the requirements.txt file included here:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Run the server locally

The fastest way to try a change is the MCP Inspector, which opens a browser
tab you can call the registered tool from directly without wiring up a full
host:

\`\`\`bash
uv run mcp dev server.py
\`\`\`

Or run the file the way an MCP host actually launches it in production, as
a plain subprocess talking over standard input and output:

\`\`\`bash
python server.py
\`\`\`

A process started this way will sit waiting for input rather than printing
anything, since it is expecting a host to speak the protocol to it, not a
person typing directly into the terminal.

## Connect it to an MCP host

Point the host's own configuration file at this project so it knows how to
start the server. For Claude for Desktop, that means adding an entry to
claude_desktop_config.json with a command that runs server.py from this
project's directory, then restarting the host so it picks up the new
server and lists convert_temperature, or whatever tool has replaced it, as
available to call.
`;

const meta: IdeToolMeta = {
  slug: "mcp-server-starter-tool",
  title: "MCP Server Starter Tool: A Working Python Entry Point in the Browser",
  name: "MCP Server Starter",
  category: "mcp-server-tools",
  summary:
    "Open a working, correctly shaped Python MCP server entry point in an in-browser editor, with one real example tool registered, ready to rewrite and download as a .zip.",
  seo: {
    primaryKeyword: "mcp server starter tool",
    keywords: [
      "mcp server starter tool",
      "python mcp server template",
      "build an mcp server",
      "model context protocol starter files",
      "free mcp server scaffolding tool",
    ],
    seoTitle: "MCP Server Starter Tool: Free Python Server Template",
    seoDescription:
      "A free mcp server starter tool that opens a working Python MCP server entry point in the browser, one real tool registered, ready to edit and download as a .zip.",
  },
  files: [
    { path: "server.py", content: SERVER_PY, kind: "code" },
    { path: "requirements.txt", content: REQUIREMENTS_TXT, kind: "data" },
    { path: "README.md", content: README_MD, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the MCP Python SDK's own documented quickstart pattern, checked against the SDK's current README before publication.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "Models asked to write an MCP server from memory alone tend to mix up SDK versions, inventing an import path or a decorator name that matches an older tutorial rather than the package a visitor actually installs, which then fails on the first run with an import error that gives no hint what changed. A starter file checked directly against the SDK's own current documentation before being shipped avoids that specific failure, since the import, the decorator and the run call all match what pip install mcp[cli] actually provides today.",
  },
  article: {
    intro: [
      "This mcp server starter tool opens a working, correctly shaped Python entry point for a Model Context Protocol server directly in your browser: one file that imports the real MCP Python SDK, registers one working example tool, and runs it over the stdio transport exactly the way the SDK's own quickstart documents. Nothing here is a guess at what an MCP server looks like; the import statement, the decorator and the run call are checked against the SDK's current documentation, not reconstructed from an older tutorial.",
      "An MCP server has a handful of pieces that recur across almost every implementation: a server instance, one decorated function per tool it exposes, and a run call that starts the protocol loop. Anyone who wants to build an mcp server without hand copying that shape from a blog post can start from this python mcp server template instead, with a small, self contained example tool, a Celsius to Fahrenheit converter, filled in rather than left as an empty stub.",
      "Everything runs client side, which is what makes this a genuinely free mcp server scaffolding tool rather than a signup gated generator: editing the model context protocol starter files, importing a project you already have as a .zip, and downloading the finished set all happen in the tab, with nothing about the code you write ever uploaded anywhere.",
    ],
    sections: [
      {
        heading: "Why the exact import and decorator matter",
        body: [
          "An MCP server's entry point is short, but every line is load bearing: the wrong import path fails before the server even starts, and a decorator name from an older SDK version raises an error that gives almost no clue what changed. This mcp server starter tool's server.py uses the server class, decorator and run call the SDK's own current documentation and README show, which is the difference between a file that runs the moment its one dependency is installed and one that needs debugging before it does anything at all.",
        ],
      },
      {
        heading: "What the example tool is actually for",
        body: [
          "convert_temperature exists to prove the shape works, not to be useful on its own. It takes a typed value and a unit, returns a plain string, and needs no API key, no network call and no extra dependency beyond the SDK itself, so the whole file runs the moment mcp[cli] is installed. Replace the function body, its parameters and its docstring with your own tool's real logic once you have confirmed the starter runs.",
        ],
      },
      {
        heading: "The docstring is part of the tool, not a comment",
        body: [
          "In this SDK a decorated function's type hints become its input schema automatically, and its docstring becomes the description a model reads before deciding whether to call it. A vague docstring produces a tool a model calls at the wrong moment or with the wrong arguments, in exactly the way a vague function name would in ordinary code.",
        ],
        list: [
          "State what the tool does in the first line, in plain language a model can act on.",
          "Document every argument's meaning, not just its type, since the type hint alone rarely explains intent.",
          "Describe what the tool returns, including how an error or an edge case is communicated.",
        ],
      },
      {
        heading: "Installing the one real dependency",
        body: [
          "The requirements.txt in this starter lists exactly one package, mcp with its cli extra, the same install target the SDK's own documentation names directly. The cli extra adds the mcp command line tool used for local testing with the MCP Inspector; a server that never needs that loop can drop the extra and install plain mcp instead. This starter deliberately avoids adding a second dependency the example tool does not need, since a starter with an unnecessary API client is a worse place to begin than one with none.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import an existing .zip, reset back to the starter files, or download the current set. Importing reads a .zip picked from your own device entirely client side, so an existing MCP project can be brought in and continued from here instead of started over.",
        ],
      },
      {
        heading: "Where this fits next to a manifest or a tool definition",
        body: [
          "This mcp server starter tool covers only the entry point. Once server.py exposes the tools you actually need, a separate manifest file describing the whole package, or a more detailed tool definition covering parameters beyond a single docstring, is usually the next file worth writing, both covered by other builder tools in this same category.",
        ],
      },
    ],
    howTo: {
      name: "How to start a new MCP server with this tool",
      steps: [
        { name: "Read server.py before changing it", text: "Open the starter file in the editor and read the comments marking the server instance, the decorated example tool and the run call at the bottom." },
        { name: "Rename the server instance", text: "Replace \"Example MCP Server\" with the real name your server should show to an MCP host once it connects." },
        { name: "Replace the example tool", text: "Rewrite convert_temperature into your own tool: its parameters, its typed return value, its docstring and its logic." },
        { name: "Add any real dependencies your tool needs", text: "Update requirements.txt with anything beyond the mcp package itself, for example an HTTP client, once your tool actually calls out to something." },
        { name: "Install the dependency and run it locally", text: "Follow README.md to install mcp[cli] and run the server with the MCP Inspector before connecting it to a real host." },
        { name: "Download the finished project", text: "Click Download .zip to save server.py, requirements.txt and README.md exactly as shown in the editor." },
      ],
    },
    faq: [
      {
        question: "Do I need to already know the MCP Python SDK to use this mcp server starter tool?",
        answer:
          "No. The starter file is written to run immediately once its one dependency is installed, with comments explaining what each part does and which lines to leave alone. Reading server.py's docstrings before editing anything is enough context to start replacing the example tool with your own.",
      },
      {
        question: "Is the example tool a real, working piece of code?",
        answer:
          "Yes. convert_temperature is a genuine, self contained tool: it converts a real value between Celsius and Fahrenheit, returns a real string, and calls the MCP Inspector correctly the moment the SDK is installed. It is a placeholder in the sense that it is not the tool your own server needs, not in the sense that it is broken or incomplete.",
      },
      {
        question: "Why does the starter only list one dependency?",
        answer:
          "Because the example tool does not need anything beyond the MCP Python SDK itself. Adding an HTTP client or another package the placeholder does not use would hide failures that have nothing to do with the server's own shape behind an unrelated missing dependency. Add whatever your real tool actually calls out to once you have replaced the placeholder.",
      },
      {
        question: "Is anything I type into the editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing persists once you close or reload the page, so downloading the .zip before you leave is the only way to keep your work.",
      },
      {
        question: "Can I import a Python MCP server I already have instead of starting from this template?",
        answer:
          "Yes. The Import .zip control in the editor's toolbar replaces the current file set with whatever text files the archive contains, so an existing project can be brought in and continued from here. Binary files inside the archive are skipped rather than shown corrupted, since the editor only handles plain text.",
      },
      {
        question: "Does this mcp server starter tool check whether my finished server actually works?",
        answer:
          "No. It only provides the correctly shaped starting files and the editor to change them; it does not run your code or validate it against a live MCP host. Running the server locally with the MCP Inspector, as README.md describes, is still the way to confirm a tool behaves as intended before connecting it to a real client.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools",
        label: "Browse every builder tool",
        description: "See the full catalogue of in-browser starter tools this mcp server starter tool belongs to, across every builder category.",
      },
      {
        href: "/ide-tools/mcp-server-tools",
        label: "See more MCP server tools",
        description: "Every builder tool in this category, for scaffolding the server entry point, tool definitions and the manifest that ties them together.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Start a new AI skill instead",
        description: "The same in-browser editor used to start a skill's files rather than a server's, for the parts of an agent that are plain instructions, not code.",
      },
      {
        href: "/coding-prompts/code-refactor-prompt",
        label: "Get help refactoring a tool once it works",
        description: "A prompt for cleaning up working code, useful once your real tool logic has replaced the placeholder here.",
      },
    ],
    externalLinks: [
      {
        href: "https://modelcontextprotocol.io/quickstart/server",
        label: "The official MCP server quickstart",
        description: "The canonical documented pattern this starter's server.py follows, including the exact import, decorator and run call.",
      },
      {
        href: "https://github.com/modelcontextprotocol/python-sdk",
        label: "The MCP Python SDK on GitHub",
        description: "The source of the mcp package this starter depends on, including its own minimal server example and installation instructions.",
      },
      {
        href: "https://www.python.org/downloads/",
        label: "Official Python downloads",
        description: "Where to install the Python 3.10 or higher runtime this SDK requires, if it is not already on your machine.",
      },
      {
        href: "https://pypi.org/project/mcp/",
        label: "The mcp package on PyPI",
        description: "The published package this starter's requirements.txt installs, for checking the current release before you deploy anywhere.",
      },
    ],
  },
  tags: ["mcp server", "model context protocol", "python starter", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
