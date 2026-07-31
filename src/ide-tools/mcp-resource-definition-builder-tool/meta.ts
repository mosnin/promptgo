import type { IdeToolMeta } from "@/lib/ide-tool-types";

const RESOURCE_DEFINITION_TEMPLATE = `"""
Starter file: one MCP resource definition using the @mcp.resource decorator
pattern documented in the official Model Context Protocol Python SDK.

The SDK's v2 release renamed its server class from FastMCP to MCPServer
(the import path changed from mcp.server.fastmcp to mcp.server); the
decorator syntax itself is unchanged. This file uses the current class
name, since a name copied from an older tutorial will fail to import
against the current stable SDK.

A resource is read only exposed data, not an action. It answers "what can
a client read here" the way a file path or a URL answers it: given a URI,
the server returns a value. A resource never changes state and never
performs a side effect, which is what separates it from a tool, and it is
not a reusable prompt template either, since a client fetches it directly
rather than a user selecting it.

Everything below is a real, working shape, not an empty stub. Replace the
placeholder URI scheme, the lookup logic and the returned value with the
data your own server actually needs to expose.
"""

from mcp.server import MCPServer

mcp = MCPServer("resource-definition-example")

# In a real server this in memory dictionary would be a database query, a
# config file read, or a call to another internal service. It is kept as
# a plain dictionary here so the resource below has something real to
# look up without pulling in an extra dependency just for this example.
CONFIG_SECTIONS = {
    "database": {"host": "localhost", "port": 5432, "name": "app_db"},
    "cache": {"host": "localhost", "port": 6379, "ttl_seconds": 300},
    "logging": {"level": "info", "destination": "stdout"},
}


# The string passed to @mcp.resource() is the URI template for this
# resource. The "{section}" segment is a path parameter: whatever a
# client requests after "config://" becomes the section argument below.
# This mirrors the officially documented pattern the Python SDK's own
# example uses ("greeting://{name}"), adapted here from a single value
# lookup to a config section lookup, the kind of read only data a
# resource is actually meant for. Placeholder to adapt: change the
# scheme and the parameter name to match the data your resource exposes.
@mcp.resource("config://{section}")
def get_config_section(section: str) -> str:
    """
    Return one section of the server's configuration as a formatted string.

    The docstring is not decoration. MCPServer reads it, together with the
    type hints on the function signature, to build the resource's
    description for a connecting client, the same way it builds a tool's
    description from a tool function's docstring. A vague docstring here
    produces a vague resource listing in every client that connects, so
    state plainly what this resource returns and what the section
    parameter selects.
    """
    if section not in CONFIG_SECTIONS:
        # Placeholder to adapt: replace this with whatever "not found"
        # behaviour fits the real data source. Raising an exception,
        # returning an explanatory string, or returning an empty
        # structure are all reasonable, but a client should never
        # receive a silent empty response with no explanation.
        return f"No configuration section named '{section}' is defined."

    values = CONFIG_SECTIONS[section]
    lines = [f"{key}: {value}" for key, value in values.items()]
    # A resource's return value is what a client actually reads at this
    # URI. Returning a plain formatted string keeps this placeholder easy
    # to adapt and matches the officially documented example's own
    # return shape exactly. A real resource can return other JSON
    # serialisable data once its shape is known, but start from a plain
    # string unless the calling client specifically expects more.
    return f"[{section}]\\n" + "\\n".join(lines)


if __name__ == "__main__":
    # Running this file directly starts the server over stdio, the same
    # transport the officially documented quickstart server uses.
    # Placeholder to adapt: replace this with however the rest of your
    # server already starts if this resource is being added to an
    # existing project rather than a brand new one.
    mcp.run()
`;

const RESOURCE_DEFINITION_GUIDE = `# Deciding between a resource, a tool and a prompt

An MCP server exposes three distinct kinds of capability, and picking the
wrong one for a given piece of functionality is the single most common
design mistake once a server grows past its first example. This guide
covers the two decisions that matter most for a resource specifically:
when to expose something as a resource rather than a tool, and how to
design the URI template once that decision is made.

## Resource, tool or prompt: the actual test

Ask what the function behind the definition does, not what data it
touches.

- A resource reads and returns data with no side effect. Calling it twice
  in a row, with the same URI, returns the same answer both times. A
  configuration lookup, a document by its id, a list of recent log
  entries: all of these are naturally resources, because fetching them
  does not change anything.
- A tool performs an action. It can write, delete, send, trigger or
  otherwise change state somewhere, and a client explicitly invokes it,
  usually with the user's approval, rather than simply reading it. A
  function that looks up a record and then updates a counter as a side
  effect of being called is a tool wearing a resource's clothing, and
  should be defined as a tool instead.
- A prompt is a reusable template a user selects to start a particular
  kind of interaction, for example "summarise this document" or "draft a
  reply to this email." A prompt is not fetched automatically the way a
  resource is; a person or client chooses to use it.

The practical test: if reading the same address twice should always be
safe and should always return the same kind of answer, it is a resource.
If invoking it does something, even something small, it is a tool. If it
is a starting template for a conversation rather than data or an action,
it is a prompt.

## Designing the URI template

Once something is confirmed as a resource, the URI template is the part
most worth getting right, because it is the address every client will use
to reach it from then on.

A good URI template:

- Uses a scheme that names the kind of data being exposed, not the
  implementation. "config://" or "documents://" reads clearly; a scheme
  named after an internal class or database table does not survive a
  refactor.
- Keeps the parameter count low. A resource's URI template is meant to
  name one thing, addressed by one or two identifiers at most. A lookup
  that genuinely needs several optional filters is a sign the
  functionality wants to be a tool instead, where parameters can be
  named, typed and made optional properly.
- Stays stable once published. A client that has fetched a resource by a
  given URI expects that same URI to keep working. Changing a URI
  template's shape after it is in use is a breaking change for anyone who
  saved or cached the old address.

## Common resource shapes worth recognising

A few shapes recur across most real servers, and recognising which one a
new piece of functionality matches speeds up the decision considerably.

- A lookup by a single identifier, such as a document, a user profile or
  a configuration section. This is the shape the starter file in this
  builder tool demonstrates.
- A small, mostly static list, such as available categories or supported
  file types, exposed at a fixed URI with no parameter at all.
- A recent activity feed, such as the last few log entries or the most
  recent completed jobs, where the resource always returns the current
  state of something rather than a specific record by id.

## What this guide does not cover

This guide is about the design decision, not the full mechanics of
registering a resource with a specific transport or authentication layer.
For the exact decorator syntax and how a server registers what it
exposes, read the officially documented quickstart and the SDK source
linked from the article on the tool's page, and adapt the accompanying
resource_definition.py starter file directly rather than writing the
decorator call from memory.
`;

const meta: IdeToolMeta = {
  slug: "mcp-resource-definition-builder-tool",
  title: "MCP Resource Definition Builder Tool: Write an MCP Resource",
  name: "MCP Resource Builder",
  category: "mcp-server-tools",
  summary:
    "Open a working single file MCP resource definition in an in-browser editor, a real @mcp.resource decorator with a URI template and docstring, ready to rewrite and download as a .zip.",
  seo: {
    primaryKeyword: "mcp resource definition builder tool",
    keywords: [
      "mcp resource definition builder tool",
      "mcp resource decorator template",
      "mcp resource uri template generator",
      "free mcp resource builder tool",
      "python mcp resource starter file",
    ],
    seoTitle: "MCP Resource Definition Builder Tool: Free MCP Starter",
    seoDescription:
      "A free mcp resource definition builder tool that opens a working MCPServer @mcp.resource example in the browser, ready to edit and download as a .zip.",
  },
  files: [
    { path: "resource_definition.py", content: RESOURCE_DEFINITION_TEMPLATE, kind: "code" },
    { path: "reference/resource-definition-guide.md", content: RESOURCE_DEFINITION_GUIDE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the @mcp.resource decorator pattern documented in the official Model Context Protocol Python SDK.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to write an MCP resource from scratch often confuse it with a tool, adding a write or an update inside a function that a client expects to read safely more than once, or invent a return shape the SDK does not actually document. A starter file built directly from the verified decorator pattern, with the resource versus tool distinction stated explicitly in its own comments, keeps that confusion from reaching a real server regardless of which model or person adapts it.",
  },
  article: {
    intro: [
      "This mcp resource definition builder tool opens a working, single file starter for one MCP resource directly in your browser: a real @mcp.resource decorator, a URI template with a path parameter, a docstring that describes what gets returned, and a lookup that returns a real value rather than an empty placeholder. Nothing here is generated on the fly; the file is fixed, working starting content, ready to be rewritten into the resource your own server needs to expose.",
      "A resource in the Model Context Protocol is read only exposed data: something a connected client can fetch by URI, the way a file path or a web address resolves to a value, with no side effect and no action taken. That is a different job from a tool, which performs an action and can change state, and from a prompt, which is a reusable template a user selects. This mcp resource decorator template keeps that distinction explicit in its comments so the file it produces is never mistaken for a tool definition or a prompt template.",
      "Everything runs client side, which is what makes this a genuinely free mcp resource builder tool rather than a signup gated generator: editing the starter file, importing a .zip you already have, and downloading the finished python mcp resource starter file as a fresh archive all happen in the tab, with nothing about the code ever uploaded anywhere.",
    ],
    sections: [
      {
        heading: "A resource is data, not an action",
        body: [
          "A common mistake once a server grows past its first tool is registering an action as a resource, or the reverse: exposing read only data through a tool a client has to explicitly invoke rather than simply read. A resource should never write, delete or trigger anything; if a function behind a URI has a side effect, it belongs behind a tool definition instead, where a client can see clearly that calling it does something.",
          "This starter file's single example, a configuration section lookup, was chosen because it has no side effect: reading it twice in a row returns the same answer both times, the property that should hold for every resource a server exposes.",
        ],
      },
      {
        heading: "Designing the URI template",
        body: [
          "The string passed to the decorator is the resource's URI template, and it is the first thing a connecting client sees, so it should read as a small, stable address rather than an implementation detail. A scheme that names the kind of data being exposed, followed by a path segment for the one parameter that actually varies, is what the officially documented example itself uses: a plain scheme, one curly brace parameter, nothing more elaborate.",
          "Reach for this mcp resource uri template generator's approach whenever the underlying data is naturally addressed by a single identifier: a section name, a document id, a username. Reach for a tool instead the moment the operation needs more than one parameter to search or filter against, since a URI template is meant to name one thing, not describe a query.",
        ],
      },
      {
        heading: "What the docstring is actually doing",
        body: [
          "MCPServer (the SDK's server class, renamed from FastMCP in v2) reads a resource function's docstring, together with its type hints, to build the description a connecting client shows a person deciding whether to read that resource, the same way it reads a tool function's docstring to build a tool's description. A docstring that just restates the function name gives a client nothing to act on; one that states plainly what the returned value contains and what the URI parameter selects is what makes the resource usable to something that has never seen the source code.",
        ],
      },
      {
        heading: "Choosing what the function returns",
        body: [
          "The starter file returns a formatted string, matching the officially documented example's own return shape, which keeps the placeholder easy to adapt without guessing at a serialisation rule never actually demonstrated. A real server's resource can return other JSON serialisable data once its shape is known, but starting from the verified string return keeps this starter honest about what current documentation shows.",
          "Whatever shape is chosen, the missing case deserves the same care as the found case: the starter's lookup returns an explicit message when a section does not exist, rather than a silent empty value a client cannot distinguish from a real empty answer.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import an existing .zip, reset back to the starter, or download the current file set. Importing a .zip reads it entirely client side, and nothing about its contents is sent anywhere before the archive is rebuilt for download.",
        ],
      },
      {
        heading: "Adding this resource to a server that already exists",
        body: [
          "The same decorator and function can be copied into an existing MCPServer module that already registers other tools or resources. Rename the function, change the URI scheme so it does not collide with one already exposed, and keep the same shape: one decorator, one docstring, one return value with no side effect.",
        ],
      },
    ],
    howTo: {
      name: "How to write a resource with this mcp resource definition builder tool",
      steps: [
        { name: "Read the starter file", text: "Open resource_definition.py to see the working @mcp.resource decorator, its URI template and its lookup before changing anything." },
        { name: "Rename the URI scheme and parameter", text: "Replace config://{section} with the scheme and path parameter your resource should actually be addressed by." },
        { name: "Replace the lookup and its data source", text: "Swap the in memory dictionary for the real database call, file read or service request your resource needs." },
        { name: "Rewrite the docstring", text: "State plainly what the returned value contains and what the URI parameter selects, since a client relies on this text to decide whether to read it." },
        { name: "Handle the not found case explicitly", text: "Keep an explicit message for a missing identifier rather than letting the function return a silent empty value." },
        { name: "Download the finished file", text: "Click Download .zip to save the resource definition exactly as shown, ready to drop into a real MCP server." },
      ],
    },
    faq: [
      {
        question: "What is the difference between an MCP resource and an MCP tool?",
        answer:
          "A resource is read only exposed data fetched by URI, with no side effect: reading it twice returns the same answer both times. A tool performs an action and can change state, and is explicitly invoked rather than simply read. If a definition writes, deletes or triggers something, it belongs behind a tool instead.",
      },
      {
        question: "Is this mcp resource definition builder tool specific to Python and this SDK?",
        answer:
          "The starter file uses the Python SDK's MCPServer decorator pattern (renamed from FastMCP in v2, same decorator syntax), the officially documented shape for a Python resource. Other language SDKs expose the same concept, a URI addressable, read only resource, through their own syntax, so the URI template and docstring guidance here still apply.",
      },
      {
        question: "Do I need to know the Model Context Protocol already to use this tool?",
        answer:
          "Some familiarity helps, but the starter file's comments explain what the URI template, docstring and return value are each doing as you read them. The officially documented pattern this file is built from, linked below, fills in anything the comments do not cover.",
      },
      {
        question: "Can I define more than one resource in the downloaded file?",
        answer:
          "Yes. Use the Add file control in the editor's sidebar to create a second Python file, or add a second decorated function to the same file, each with its own URI template. A single MCP server commonly registers several resources alongside its tools.",
      },
      {
        question: "Does this tool check whether my finished resource actually works?",
        answer:
          "No. This tool only provides a real, working starting file and the editor to adapt it in; it does not run a Python interpreter or connect to a live client to confirm the finished resource behaves correctly. Running the file against an actual MCP client is still the way to confirm it.",
      },
      {
        question: "Is anything I type into the editor uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, so downloading the finished python mcp resource starter file before you leave is the only way to keep your work.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/mcp-server-tools",
        label: "See more MCP server builder tools",
        description: "Every starter file in this category for the parts of an MCP server that follow a predictable shape.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Try the AI skill builder tool",
        description: "The same in-browser editor used to start and refine a skill's own multi file structure.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Get help documenting an API",
        description: "A prompt for turning a rough endpoint description into clear documentation, the same discipline a resource's docstring needs.",
      },
      {
        href: "/ide-tools",
        label: "Browse every builder tool",
        description: "The full catalogue of in-browser starter files for skills, MCP servers, agents and tool definitions.",
      },
    ],
    externalLinks: [
      {
        href: "https://modelcontextprotocol.io/quickstart/server",
        label: "The official MCP server quickstart",
        description: "The Model Context Protocol's own tutorial defining resources, tools and prompts as the three core server capabilities.",
      },
      {
        href: "https://github.com/modelcontextprotocol/python-sdk",
        label: "The MCP Python SDK source",
        description: "The MCP Python SDK implementation this starter file's decorator pattern is verified directly against.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc6570",
        label: "RFC 6570, the URI Template standard",
        description: "The formal specification behind the curly brace parameter syntax a resource's URI template uses.",
      },
      {
        href: "https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml",
        label: "IANA's registry of URI schemes",
        description: "The authoritative list of registered URI schemes, useful context when naming a new resource scheme that will not collide with one already in wide use.",
      },
    ],
  },
  tags: ["mcp resource", "mcp server", "model context protocol", "resource definition"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
