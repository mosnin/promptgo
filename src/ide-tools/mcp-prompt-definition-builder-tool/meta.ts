import type { IdeToolMeta } from "@/lib/ide-tool-types";

const PROMPT_DEFINITION_PY = `"""
Starter file for ONE MCP prompt definition.

An MCP prompt is a reusable, parameterised template that a client surfaces
to a user, for example as a slash command, fills in with the arguments the
user supplies, and sends to the model. It is a distinct primitive from an
MCP tool, which is an action the model decides to call on its own, and from
an MCP resource, which is read only data an application attaches for
context. This file defines exactly one prompt using the officially
documented @mcp.prompt() decorator, part of the Python MCP SDK's high level
server class. Older tutorials and search results usually call this class
FastMCP; the current SDK renamed it MCPServer, and the import below is the
current, correct one to use.

Verified against the SDK's own prompts documentation at
https://py.sdk.modelcontextprotocol.io/servers/prompts/ before writing this
file. Replace the server name, the prompt name, the argument and the
returned template below with the real prompt your own server needs to
expose; nothing here is meant to run unedited in production.
"""

from typing import Annotated

from mcp.server import MCPServer
from pydantic import Field

# Replace "Support Reply Drafter" with your own server's name. A real
# server will usually also register tools and resources beside this
# prompt; this starter file shows only the prompt half of that server.
mcp = MCPServer("Support Reply Drafter")


# The @mcp.prompt() decorator turns a plain Python function into a prompt a
# client can discover with prompts/list and fetch with prompts/get. The
# function name becomes the prompt's name unless a title is given, the
# docstring becomes the description shown to a user before they run it,
# and each typed parameter becomes one of the prompt's arguments.
@mcp.prompt(title="Draft a support reply")
def draft_support_reply(
    # A required argument. The SDK reads the type hint together with the
    # Annotated Field description to build the argument's schema and the
    # helper text a client shows the user while they fill it in.
    issue_summary: Annotated[
        str,
        Field(description="A one or two sentence summary of the customer's issue, written in the customer's own words."),
    ],
    # An optional argument. Giving it a default value makes it optional in
    # the generated schema, so a client can omit it and still receive a
    # working, fully formed prompt.
    tone: Annotated[
        str,
        Field(description="The tone the reply should take, for example calm, apologetic or upbeat."),
    ] = "calm and professional",
) -> str:
    """Turn a short issue summary into a ready to send support reply draft."""
    # PLACEHOLDER: replace this returned string with the real instruction
    # template your prompt should hand to the model. Everything inside the
    # braces below is filled in from the arguments above before the client
    # ever sends this text anywhere, which is the entire point of defining
    # a prompt instead of hard coding the wording in the client itself.
    return (
        f"You are drafting a customer support reply.\\n\\n"
        f"Issue summary: {issue_summary}\\n"
        f"Required tone: {tone}\\n\\n"
        "Write a reply that acknowledges the issue using the customer's own "
        "words, states one concrete next step, and avoids making a promise "
        "the support team has not already confirmed it can keep."
    )


# A minimal way to run this file directly while developing the prompt. In a
# real server this call sits in the same file as any @mcp.tool() and
# @mcp.resource() definitions the server also registers, so a client
# connecting to it sees every primitive the server exposes at once.
if __name__ == "__main__":
    mcp.run()
`;

const PROMPT_DEFINITION_GUIDE = `# Prompt, tool or resource: choosing the right MCP primitive

Replace this file's content once you have decided your definition is
actually a prompt. Keep it beside prompt_definition.py as a note to
yourself, or to whoever reviews the server next, about why a prompt was the
right primitive here rather than a tool or a resource.

## The three primitives, in one line each

- A **tool** is an action the model decides to call on its own, based on
  the user's request in conversation. It can write to a database, call an
  external API, or change something. The model is in control of when a
  tool runs.
- A **resource** is read only data an application attaches for context,
  such as a file's contents, a database schema, or a calendar's current
  entries. The application is in control of what gets attached and when,
  not the model and not the user directly.
- A **prompt** is a reusable, parameterised template a user explicitly
  chooses to run, often surfaced as a slash command or a button in a
  client's interface. The user is in control: a prompt never fires on its
  own the way a tool can.

## Why the distinction matters

Picking the wrong primitive for a piece of server behaviour produces a
server that technically works but confuses whoever uses it. A prompt
defined as a tool looks, to the model, like an action with side effects,
so it may hesitate to call it or ask for confirmation first even though it
only assembles text. A tool defined as a prompt removes the model's
ability to decide when it is needed, forcing the user to invoke it by hand
every time, even for the routine, low stakes actions a model should be
trusted to call on its own. Getting this right the first time also
determines how a client's own interface treats the definition: prompts
typically show up as discoverable commands a person picks from a list,
while tools stay invisible until the model reaches for one mid
conversation.

## When a prompt is the right primitive

Reach for a prompt, specifically, when the thing you are defining is
wording, not action or data. A few concrete signs:

- The output is text meant to become part of a conversation with the
  model, not a side effect in some other system.
- The same task comes up often enough, worded slightly differently each
  time, that a fixed template with a couple of filled in variables would
  save real, repeated typing.
- A user should be able to see the template's shape and its argument names
  before running it, the way a slash command's autocomplete shows what it
  expects.
- The server author wants to demonstrate the best way to combine their own
  tools and resources for a common task, without forcing the model to
  rediscover that combination unassisted every time.

## When it is not

If the definition needs to reach outside the conversation, whether that is
querying an API, writing a file, or triggering a workflow, it is a tool,
not a prompt: a prompt's returned string cannot perform an action by
itself, only describe one to the model in words. If the definition is
mostly about exposing existing data for the model to read, such as a
document's contents or a live status value, it is a resource: wrapping
that same data in a prompt just to hand it to the model adds an
unnecessary extra step a resource already does more directly. When in
doubt, write down what the definition actually produces. Text meant to
start or extend a conversation is a prompt. An effect in the outside world
is a tool. Data attached for context is a resource.
`;

const meta: IdeToolMeta = {
  slug: "mcp-prompt-definition-builder-tool",
  title: "MCP Prompt Definition Builder Tool: Scaffold a Prompt in the Browser",
  name: "MCP Prompt Definition Builder",
  category: "mcp-server-tools",
  summary:
    "Open a working MCP prompt definition using the real @mcp.prompt() decorator pattern in an in-browser editor, rewrite it into your own prompt, and download it as a .zip.",
  seo: {
    primaryKeyword: "mcp prompt definition builder tool",
    keywords: [
      "mcp prompt definition builder tool",
      "build an mcp prompt",
      "mcp prompt template generator",
      "fastmcp prompt decorator guide",
      "mcp prompt vs tool vs resource",
      "free mcp prompt starter file",
    ],
    seoTitle: "MCP Prompt Definition Builder Tool: Scaffold a Real Prompt",
    seoDescription:
      "A free mcp prompt definition builder tool that opens a working @mcp.prompt() example and a guide to prompts versus tools and resources, in the browser.",
  },
  files: [
    { path: "prompt_definition.py", content: PROMPT_DEFINITION_PY, kind: "code" },
    { path: "reference/prompt-definition-guide.md", content: PROMPT_DEFINITION_GUIDE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Checked against the Python MCP SDK's own prompts documentation for the current @mcp.prompt() decorator shape before publication.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to sketch an MCP prompt from memory routinely reach for the old FastMCP import path or invent a tool style handler with a request object, both of which fail against the current SDK because the class was renamed and a prompt's return value is plain text, not a structured response. A starter file pinned to the documented decorator, argument and return shape removes that guesswork before any server ever tries to load it.",
  },
  article: {
    intro: [
      "This mcp prompt definition builder tool opens a working starter file for exactly one MCP prompt, written against the current, documented @mcp.prompt() decorator, directly in your browser. Unlike a bare mcp prompt template generator that hands back an empty stub, the example prompt here has a real docstring, a real required argument, a real optional argument with a default value, and a returned template string, all clearly marked as a placeholder ready to rewrite.",
      "A prompt in the Model Context Protocol sense is not an instruction typed into a chat window. It is a reusable, parameterised template a server registers so a client can list it, let a user fill in its arguments, and send the finished text to the model. The mcp prompt vs tool vs resource distinction, covered in this tool's second file, is most of the work of defining a server's behaviour correctly.",
      "As a free mcp prompt starter file this tool asks for no signup and sends nothing to a server. Rewriting the decorator's arguments, importing a .zip you already have, adding a second prompt file, and downloading the result all run client side in the tab.",
    ],
    sections: [
      {
        heading: "Why the current decorator import matters",
        body: [
          "Older tutorials still show `from mcp.server.fastmcp import FastMCP`. The Python MCP SDK's second major release renamed that class to MCPServer and moved its module with it, with no deprecation period: the old import simply stops working. The starter file here uses the current `from mcp.server import MCPServer` import, so a visitor copying it does not inherit a broken first line.",
        ],
      },
      {
        heading: "Reading the decorator's three parts",
        body: [
          "This fastmcp prompt decorator guide section covers the shape @mcp.prompt() reads off the function underneath it: the function's name, which becomes the prompt's identifier unless a title is given; the docstring, which becomes the description shown to a user before they run it; and each typed parameter, which becomes one argument. An `Annotated` type paired with a `pydantic.Field(description=...)` adds the explanation a client shows beside that argument's input box, and a default value is what makes it optional.",
        ],
      },
      {
        heading: "Why the return value is plain text, not a tool response",
        body: [
          "A common mistake when adapting a tool into a prompt is carrying over a structured response object. A prompt function instead returns a plain string, becoming a single user turn, or a list of message objects for a scripted opening exchange. There is no side effect and no structured result: the entire job of a prompt is producing wording, exactly what the placeholder return statement in prompt_definition.py demonstrates.",
        ],
      },
      {
        heading: "Choosing a prompt over a tool or a resource",
        body: [
          "The reference guide walks through the distinction in more depth, but the short version is about who is in control. A tool is something the model decides to call mid conversation, a resource is data an application attaches for context, and a prompt is a template a user chooses to run. If a definition performs an action, it belongs in a tool instead; if it only exposes existing data, it belongs in a resource instead.",
        ],
        list: [
          "Choose a prompt when the output is wording meant to start or extend a conversation with the model.",
          "Choose a tool instead when the definition needs to reach outside the conversation and cause a real effect.",
          "Choose a resource instead when the job is exposing existing data for the model to read.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import an existing .zip, reset back to the starter files, or download the current set. Importing a .zip reads it entirely client side, so an existing server's prompt files can be edited here without leaving the page.",
        ],
      },
      {
        heading: "What this starter file does not cover",
        body: [
          "This is one prompt definition, not a whole server. It does not register a transport or show how a client invokes a prompt once defined; the SDK's own documentation, linked below, covers running a server end to end. It also does not validate that a rewritten template is correct Python; running the file with a real client is still the way to confirm it loads.",
        ],
      },
    ],
    howTo: {
      name: "How to build an MCP prompt definition with this tool",
      steps: [
        { name: "Read the starter files", text: "Open prompt_definition.py and reference/prompt-definition-guide.md in the editor to see the working decorator, the argument shape and the primitive comparison before changing anything." },
        { name: "Confirm a prompt is the right primitive", text: "Check the reference guide's signs for a prompt against what you are building; move to a tool or resource definition instead if it does not match." },
        { name: "Rename the server and the prompt function", text: "Replace the MCPServer name and the draft_support_reply function name and title with your own server and prompt." },
        { name: "Rewrite the arguments", text: "Replace issue_summary and tone with your prompt's own required and optional arguments, keeping the Annotated Field description on each one." },
        { name: "Rewrite the returned template", text: "Replace the placeholder returned string with the real instruction text your prompt should hand to the model, using your own arguments inside it." },
        { name: "Download the finished definition", text: "Click Download .zip to save the file set exactly as shown in the editor, ready to drop into a real MCP server project." },
      ],
    },
    faq: [
      {
        question: "What exactly does this mcp prompt definition builder tool generate?",
        answer:
          "It opens a starter file set for one MCP prompt: a Python file using the real, currently documented @mcp.prompt() decorator with a required argument, an optional argument with a default, a docstring and a returned template string, plus a reference guide comparing prompts, tools and resources. Nothing is generated dynamically; the files are fixed starting content you rewrite yourself.",
      },
      {
        question: "Is FastMCP the same thing as MCPServer?",
        answer:
          "They refer to the same high level server class at different points in the SDK's history. Older code imports FastMCP from mcp.server.fastmcp; the current major release renamed that class to MCPServer and moved it to mcp.server, without keeping the old import path working, so new code should use the import shown in this starter file.",
      },
      {
        question: "How is an MCP prompt different from a tool definition?",
        answer:
          "A tool is an action the model can decide to call on its own during a conversation, such as querying an API, and its handler typically returns a structured result. A prompt is a template a user deliberately chooses to run, and its handler returns plain text meant to become part of the conversation rather than perform an action.",
      },
      {
        question: "How is an MCP prompt different from a resource definition?",
        answer:
          "A resource exposes existing, read only data for an application to attach as context, identified by a URI, with the application deciding what gets included. A prompt does not expose data on its own; it produces new wording from the arguments a user supplies, and the user, not the application, chooses to run it.",
      },
      {
        question: "Does the returned string need to be exactly the format shown in the starter file?",
        answer:
          "No. A prompt function can return a plain string for a single user turn, which is what the starter file shows, or a list of message objects to script a short opening exchange instead. Which shape to use depends on whether your prompt needs more than one turn already filled in.",
      },
      {
        question: "Can I add more than one prompt to the same file?",
        answer:
          "Yes. A single MCPServer instance can register as many @mcp.prompt() functions as the server needs, each with its own name, arguments and template, alongside any @mcp.tool() or @mcp.resource() functions in the same file. This starter file keeps to one prompt on purpose, so a single definition's shape is easy to see first.",
      },
      {
        question: "Is anything I type into this editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing persists once you close or reload the page, so downloading the .zip before you leave keeps the file set you wrote.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/mcp-server-tools",
        label: "See more MCP server builder tools",
        description: "Every builder tool in this category, for scaffolding a server entry point, tool and resource definitions alongside this prompt.",
      },
      {
        href: "/ide-tools/skill-authoring-tools",
        label: "Start or refine an AI skill instead",
        description: "The same in-browser editor pattern applied to skill files rather than MCP server files, useful if the task is a skill, not a server.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Get help documenting the finished server",
        description: "A prompt for turning a working API or server into clear documentation, useful once the prompt definition is finished.",
      },
      {
        href: "/coding-prompts/python-analysis-prompt",
        label: "Get a second pass on the Python itself",
        description: "A prompt for reviewing Python code for correctness and clarity, useful once the template and arguments are rewritten.",
      },
    ],
    externalLinks: [
      {
        href: "https://py.sdk.modelcontextprotocol.io/servers/prompts/",
        label: "The Python MCP SDK's prompts documentation",
        description: "The current, official reference for the @mcp.prompt() decorator this starter file's code follows, including the multi message return shape.",
      },
      {
        href: "https://modelcontextprotocol.io/docs/learn/server-concepts",
        label: "Model Context Protocol's server concepts guide",
        description: "The protocol's own explanation of tools, resources and prompts as the three distinct building blocks a server can expose.",
      },
      {
        href: "https://github.com/modelcontextprotocol/python-sdk",
        label: "The Python MCP SDK's source repository",
        description: "The SDK this starter file's import path and decorator come from, including its migration notes for the FastMCP to MCPServer rename.",
      },
      {
        href: "https://www.anthropic.com/news/model-context-protocol",
        label: "Anthropic's original Model Context Protocol announcement",
        description: "The announcement introducing the protocol this prompt definition is written for, with the reasoning behind a shared, open standard.",
      },
    ],
  },
  tags: ["mcp prompt", "model context protocol", "fastmcp", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
