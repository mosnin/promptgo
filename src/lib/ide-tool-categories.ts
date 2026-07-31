import type { IdeToolCategory, IdeToolCategorySlug } from "./ide-tool-types";

/**
 * Five categories, one per distinct job the original builder tools request
 * named: authoring or refining a skill, scaffolding an MCP server, writing an
 * agent's own operating instructions, starting a new agent from a template
 * for a given archetype, and defining the tool or function-calling schema an
 * agent calls out to. Kept separate from the ten prompt/skill job function
 * categories on purpose: these are development artefacts, not marketing,
 * writing or sales work, and mixing the two taxonomies would put a Python
 * starter file in a "Marketing" list.
 */
export const ideToolCategories: IdeToolCategory[] = [
  {
    slug: "skill-authoring-tools",
    name: "Skill Authoring",
    title: "Skill Authoring Builder Tools",
    seoTitle: "Skill Authoring Tools: Build and Refine AI Skills in Browser",
    seoDescription:
      "Free in-browser tools for building and refining AI skills: start a new multi file skill, import an existing .zip to edit, and download the result.",
    primaryKeyword: "skill authoring tools",
    keywords: [
      "skill authoring tools",
      "ai skill builder tool",
      "ai skill refiner tool",
      "edit ai skill files online",
    ],
    intro:
      "Tools for the two ends of working with an AI skill: starting a brand new one from a blank multi file template, and opening an existing skill's .zip to edit its files directly in the browser before downloading it again.",
    body: [
      "The skills directory on this site is a read only preview: every file is shown in full before download, but nothing there can be changed on the page. These tools are the other half of that workflow. A skill builder opens a blank starter file set with the same structure the skills directory itself uses, ready to be renamed, rewritten and downloaded. A skill refiner goes the other direction: import any skill's .zip, whether it came from this site or somewhere else, edit its files in place, add or remove files, and export the result as a new archive.",
      "Every edit happens in the browser tab. Importing a .zip reads it client side with no upload, and exporting one builds the archive client side too, so nothing about the file's contents ever leaves the visitor's machine.",
    ],
    icon: "layers",
    accent: "#a78bfa",
    order: 1,
  },
  {
    slug: "mcp-server-tools",
    name: "MCP Server",
    title: "MCP Server Builder Tools",
    seoTitle: "MCP Server Tools: Scaffold Servers, Tools and Resources",
    seoDescription:
      "Free in-browser scaffolding tools for the Model Context Protocol: server starters, tool and resource definition files, and manifest generators.",
    primaryKeyword: "mcp server tools",
    keywords: [
      "mcp server tools",
      "mcp server scaffolding",
      "mcp tool definition generator",
      "model context protocol starter files",
    ],
    intro:
      "Starter file sets for the parts of a Model Context Protocol server that follow a predictable shape every time: the server entry point, a tool definition, a resource definition and the manifest that ties them together.",
    body: [
      "An MCP server has a handful of pieces that recur across almost every implementation regardless of what the server actually does: a small entry point that registers what it exposes, one file per tool or resource definition, and a manifest describing the whole package. These tools open a working starter version of each piece, with real, functioning placeholder logic rather than empty stubs, so what gets edited from here is the specific behaviour, not the boilerplate around it.",
      "Nothing here is a hosted MCP server. Every file opens in the in-browser editor exactly as written, ready to edit, add to and download as a .zip to run wherever the server actually needs to live.",
    ],
    icon: "globe",
    accent: "#38bdf8",
    order: 2,
  },
  {
    slug: "agent-tools",
    name: "Agent Tools",
    title: "Agent Building Tools",
    seoTitle: "Agent Tools: Build System Prompts and Agent Configuration",
    seoDescription:
      "Free in-browser tools for building an AI agent's own operating files: system prompt structure, tool-use policy, memory and evaluation starters.",
    primaryKeyword: "agent building tools",
    keywords: [
      "agent building tools",
      "ai agent system prompt builder",
      "agent tool use policy template",
      "agent evaluation starter files",
    ],
    intro:
      "Starter files for the operating documents an agent runs on: its system prompt structure, the policy that governs when it is allowed to call a tool, how it manages memory across a long session, and a starting evaluation harness to check it against.",
    body: [
      "Building an agent is mostly writing and iterating on plain text: the instructions it runs under, the rules for when it reaches for a tool versus asks a question, and the test cases that catch a regression before a user does. These tools open a real, working starting structure for each of those documents rather than a blank page, with placeholder sections marked clearly as placeholders so nothing gets mistaken for a finished instruction.",
      "Every file is editable in place and downloadable as a .zip once it fits the agent it is actually written for. None of it depends on a specific agent framework by name, since the underlying documents (a system prompt, a tool policy, a memory strategy, an eval set) are the same shape across most of them.",
    ],
    icon: "spark",
    accent: "#f472b6",
    order: 3,
  },
  {
    slug: "agent-starter-templates",
    name: "Agent Starters",
    title: "Agent Starter Templates",
    seoTitle: "Agent Starter Templates: Multi File Starting Points",
    seoDescription:
      "Free multi file agent starter templates for common archetypes, editable in the browser and downloadable as a .zip to build on.",
    primaryKeyword: "agent starter templates",
    keywords: [
      "agent starter templates",
      "ai agent template download",
      "agent starter kit",
      "multi file agent template",
    ],
    intro:
      "A working multi file starting point for five common agent archetypes: a command line agent, a browser driven agent, a workflow automation agent, a customer support agent and a research agent, each with the files that archetype actually needs from day one.",
    body: [
      "A blank project and a five hundred line framework tutorial are both a bad place to start. These templates sit between them: a small, real set of files for one specific kind of agent, covering the parts that differ by archetype (how a support agent handles escalation, how a research agent tracks sources, how a workflow agent logs each step) rather than generic advice that applies to none of them specifically.",
      "Every template opens directly in the in-browser editor, ready to rename, extend and download as a .zip. None of it locks a visitor into a particular hosting platform or paid framework; the files are plain text meant to be adapted into whatever stack the agent actually runs on.",
    ],
    icon: "bolt",
    accent: "#fb923c",
    order: 4,
  },
  {
    slug: "tool-definition-tools",
    name: "Tool Definitions",
    title: "Tool Definition Builder Tools",
    seoTitle: "Tool Definition Tools: Build Function Calling Schemas",
    seoDescription:
      "Free in-browser tools for writing the schema an agent calls out through: function calling definitions, API wrappers, JSON schema and structured output.",
    primaryKeyword: "tool definition tools",
    keywords: [
      "tool definition tools",
      "function calling schema builder",
      "json schema validator starter",
      "structured output schema builder",
    ],
    intro:
      "Starter files for the schema layer between an agent and the outside world: a function calling definition, a thin wrapper around an existing API, a validated JSON schema and a structured output contract.",
    body: [
      "An agent that can call a tool is only as reliable as the schema describing that tool: a parameter the model cannot tell is required, or a response shape it was never told to expect, shows up as a silent failure three steps later. These tools open a working starter definition for four recurring shapes of that problem, with real example parameters and real example responses filled in rather than left as a comment.",
      "Every file edits in place and downloads as a .zip once its parameters, descriptions and validation rules match the real tool being described. None of it calls out to a live API from the page; the point is the definition file itself, written correctly before it is wired up anywhere.",
    ],
    icon: "code",
    accent: "#4ade80",
    order: 5,
  },
];

export const ideToolCategoryBySlug = new Map(ideToolCategories.map((category) => [category.slug, category]));

export function getIdeToolCategory(slug: string): IdeToolCategory | undefined {
  return ideToolCategoryBySlug.get(slug as IdeToolCategorySlug);
}

export const ideToolCategorySlugs: IdeToolCategorySlug[] = ideToolCategories.map((category) => category.slug);
