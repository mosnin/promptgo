import type { IdeToolMeta } from "@/lib/ide-tool-types";

const SYSTEM_PROMPT_TEMPLATE = `# [Agent Name] System Prompt

Replace this heading with the name of the agent you are building, written
plainly, for example "Invoice Status Agent" or "Internal Wiki Search Agent".
Everything below is a section every real agent operating instruction set
needs. Replace the guidance text in each section with the actual rules for
your agent; do not leave a section as a bare heading with nothing under it,
since an agent reads a missing section as permission to improvise.

## Role and scope

State what this agent is for in one or two sentences, specific enough that a
request outside that scope is obviously outside it. Name who the agent is
acting on behalf of, what kind of request it handles, and what it explicitly
does not do. A scope written as "helps with customer questions" produces an
agent that will attempt anything phrased as a question; a scope written as
"answers order status and shipping questions for this store's own orders
only" gives the agent a boundary it can actually check a request against.

Replace this paragraph with your agent's real role and scope.

## Available tools and when to use each

List every tool the agent can call, and for each one write the condition
under which it should be used rather than just its name. A tool list with no
usage condition leads to a tool being called speculatively, or not called
when it should have been. For each tool, state: what it is for, what
information it needs before it can be called, and what a normal result from
it looks like so the agent can tell a real result from a broken one.

- Replace this with the first tool, its purpose, and when to call it.
- Replace this with the second tool, its purpose, and when to call it.
- Add one entry per tool the agent actually has access to.

## Constraints

List what this agent must never do, stated as concrete prohibitions rather
than general caution. A constraint written as "be careful with sensitive
data" is not checkable; a constraint written as "never repeat a customer's
full card number back in a response, even if the customer pastes it first"
is. Cover at minimum: actions that would be irreversible, information the
agent must not disclose, and any action that needs a human's sign off before
it happens rather than after.

Replace this list with the real constraints for your agent.

## Response format

Describe exactly what a finished response from this agent should look like:
plain text or structured output, what a typical length is, whether it should
ask a clarifying question before acting or act first and report afterward,
and how it should present a result that came from a tool versus one it
generated itself. An agent given no format guidance defaults to whatever the
underlying model considers a normal length for the question, which is rarely
what the surrounding product actually needs.

Replace this paragraph with your agent's real response format.

## Escalation or refusal conditions

State plainly when this agent should stop and hand off to a person instead
of proceeding: a request outside its stated scope, a tool result that looks
wrong or incomplete, a request that would need a constraint above to be
broken to fulfil, or a case where the agent is not confident enough in its
own answer to act on it. Say what handing off actually looks like: what the
agent tells the person waiting, and where the request goes next. An agent
with no stated refusal condition will attempt every request it is given,
which is a worse failure than an agent that asks for help too often.

Replace this list with the real escalation and refusal conditions for your
agent.
`;

const SYSTEM_PROMPT_EXAMPLE = `# Worked example: internal wiki search agent

This is one short worked example of the template in SYSTEM_PROMPT.md, filled
in for a simple, low stakes archetype: an agent that answers employee
questions by searching a company's internal wiki and nothing else. Read this
alongside the template to see the level of specificity each section is
asking for, then delete or replace it once you understand the pattern; it is
a reference, not a starting point to edit in place.

## Role and scope

This agent answers employee questions about internal company policy and
process by searching the internal wiki and summarising what it finds. It
does not answer questions about a specific employee's personal data, does
not give legal or medical advice even if a policy page mentions either, and
does not answer questions the wiki has no page on by guessing from general
knowledge.

## Available tools and when to use each

- search_wiki(query): the only tool this agent has. Call it with a short
  keyword query built from the employee's question, never with the question
  pasted verbatim, since the search index matches keywords better than full
  sentences. A normal result is a list of up to five page titles with a short
  excerpt; an empty result list means the wiki has no matching page, not that
  the search failed.

## Constraints

Never state a policy as fact unless it was found on a wiki page in this
session's own search results. Never guess a page's contents from its title
alone. Never advise on an individual employee's pay, discipline case or
medical leave, even if a general policy page is found, since those always
depend on details not present in a policy document.

## Response format

Answer in two or three sentences of plain text, followed by the title and
link of the wiki page the answer came from. If search_wiki returns more than
one plausibly relevant page, name all of them rather than picking one
silently. If no page matches, say so directly rather than answering from
general knowledge.

## Escalation or refusal conditions

If search_wiki returns no relevant page after one reformulated query, tell
the employee no matching policy page was found and suggest they ask their
manager or HR directly, rather than answering from outside knowledge. If a
question concerns an individual employee's specific pay, discipline or leave
situation, decline to answer and direct the employee to HR immediately,
without attempting a search first.
`;

const meta: IdeToolMeta = {
  slug: "agent-system-prompt-builder-tool",
  title: "Agent System Prompt Builder Tool: Write an Agent's Operating Rules",
  name: "Agent System Prompt Builder",
  category: "agent-tools",
  summary:
    "Open a working system prompt template in an in-browser editor covering role, tools, constraints, response format and escalation, plus one worked example, and download it as a .zip.",
  seo: {
    primaryKeyword: "agent system prompt builder tool",
    keywords: [
      "agent system prompt builder tool",
      "ai agent system prompt template",
      "how to write an agent system prompt",
      "free system prompt builder for ai agents",
      "system prompt structure for ai agents",
    ],
    seoTitle: "Agent System Prompt Builder Tool: Write Agent Rules Free",
    seoDescription:
      "A free agent system prompt builder tool that opens a working role, tools, constraints and escalation template in the browser, plus a worked example, as a .zip.",
  },
  files: [
    { path: "SYSTEM_PROMPT.md", content: SYSTEM_PROMPT_TEMPLATE, kind: "markdown" },
    { path: "reference/system-prompt-example.md", content: SYSTEM_PROMPT_EXAMPLE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the five sections that recur across published system prompts for tool using agents: role, tools, constraints, format and escalation.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to draft an agent system prompt from a blank page reliably write a role description and a tool list, then skip the constraints and escalation sections entirely, which is exactly the gap that lets an agent attempt a request it should have refused or handed to a person. A fixed template with an escalation section that must be filled in, not just implied by the constraints above it, closes that gap regardless of which model or person writes the final content.",
  },
  article: {
    intro: [
      "This agent system prompt builder tool opens a working system prompt template directly in your browser: a main SYSTEM_PROMPT.md file with the five sections a checkable agent operating instruction set needs, plus a reference file showing one short worked example for a simple archetype. Nothing here is generated for you; the template is fixed, real starting content, ready to be rewritten into your own agent's operating instructions.",
      "A system prompt is the document an agent runs on for a session: what it is for, what it can reach for, what it must never do, how it should answer, and when it should stop and ask a person instead of guessing. Hand written attempts get the first two right and thin out on the last three, which is where a real agent's failures tend to show up in production. This ai agent system prompt template forces all five to be filled in.",
      "Everything runs client side, which is what makes this a genuinely free system prompt builder for ai agents: editing the starter files, importing a .zip you already have, and downloading the result as a fresh .zip happen in the browser, with nothing about the content ever uploaded anywhere.",
    ],
    sections: [
      {
        heading: "Why these five sections and not a blank file",
        body: [
          "A blank file invites a system prompt written as a job description, with no way to check afterward whether a response followed it. The five sections map to five failure modes: a role with no boundary lets an agent attempt anything relevant sounding, a tool list with no usage condition gets called speculatively, missing constraints let an irreversible action happen unchecked, no response format leaves structure to chance, and no escalation section means the agent never stops to ask.",
        ],
      },
      {
        heading: "Learning how to write an agent system prompt from a role down",
        body: [
          "The role and scope section is where most specificity work happens, and where a vague draft is easiest to catch. Anyone learning how to write an agent system prompt should start with this general system prompt structure for ai agents by writing a role sentence specific enough that a request outside it is obviously outside it. 'Answers order status questions for this store's own orders only' rejects a competitor's order; 'helps with order questions' rejects nothing.",
        ],
      },
      {
        heading: "Tool descriptions need a condition, not just a name",
        body: [
          "Listing a tool by name and a one line purpose is not enough for an agent to decide when to reach for it. Each entry should state the condition that triggers its use and what a normal result looks like, so the agent can tell a working result from a broken one rather than trusting every response by default.",
        ],
        list: [
          "State the exact condition under which a tool should be called, not just what it does.",
          "Name what a normal, working result from the tool looks like.",
          "Say what the agent should do if a tool result looks wrong.",
        ],
      },
      {
        heading: "Constraints have to be checkable, not cautionary",
        body: [
          "A constraint written as general caution, such as being careful with sensitive information, gives an agent nothing to check its output against. A constraint written as a concrete prohibition, naming the exact action that must never happen, is something a person reviewing a transcript can verify. Irreversible actions, sensitive data disclosure, and anything needing a human sign off belong here explicitly, not folded into the role.",
        ],
      },
      {
        heading: "The escalation section is the one most drafts skip",
        body: [
          "An agent with a role, tools, constraints and a format still has no instruction for a request at the edge of scope, a tool result that looks wrong, or a case it is not confident enough to act on. Naming those conditions, and stating what a handoff looks like, turns a system prompt from a description of normal operation into one that covers where it should stop.",
        ],
      },
      {
        heading: "When the worked example earns its place",
        body: [
          "The reference file is built around one simple, low stakes archetype rather than a complex multi tool agent, to show how much specificity each section needs. If you are scaffolding a specific archetype from scratch, look at a dedicated agent starter template instead; this tool is the general purpose blank template underneath any of them.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a text pane, and a toolbar to add a file, import a .zip, reset to the starter template, or download the file set. Importing reads a .zip client side, so an existing system prompt can be brought in and edited here rather than rewritten from nothing.",
        ],
      },
    ],
    howTo: {
      name: "How to build an agent system prompt with this tool",
      steps: [
        { name: "Read the starter files", text: "Open SYSTEM_PROMPT.md and the worked example to see the five sections before changing anything." },
        { name: "Write the role and scope", text: "Replace the placeholder with a role sentence specific enough that an out of scope request is obviously out of scope." },
        { name: "List the real tools and their conditions", text: "Replace the tool list with every tool the agent has, each with the condition that triggers its use." },
        { name: "Write checkable constraints and the response format", text: "Replace the placeholders with concrete prohibitions and the exact shape a response should take." },
        { name: "Fill in escalation and refusal conditions", text: "State when the agent should stop and hand off to a person, and what that handoff looks like." },
        { name: "Download the finished system prompt", text: "Click Download .zip to save the file set exactly as shown in the editor." },
      ],
    },
    faq: [
      {
        question: "Is this agent system prompt builder tool tied to a specific agent framework?",
        answer:
          "No. The template describes plain text operating instructions in the five sections that recur across tool using agents regardless of framework: role, tools, constraints, format and escalation. How a framework loads that text varies, so check its own documentation for the mechanics of wiring it in once written.",
      },
      {
        question: "Is anything I type here saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing persists once you close or reload the page, so downloading the .zip before you leave is the only way to keep your work.",
      },
      {
        question: "How is this different from an agent starter template?",
        answer:
          "An agent starter template scaffolds a full multi file starting point for one archetype, such as a support agent or a research agent, and its own system prompt file is written for that one job. This tool is the general purpose blank template underneath any of them: the five sections real operating instructions need, with no archetype assumed.",
      },
      {
        question: "Can I add more sections than the five in the template?",
        answer:
          "Yes. The Add file control in the sidebar lets you create any file at any path, and nothing stops you adding extra headings inside SYSTEM_PROMPT.md, such as a memory section for a longer running agent. The five sections are the minimum an operating instruction set needs, not a ceiling on what it can contain.",
      },
      {
        question: "What happens if I import a .zip with a different system prompt already in it?",
        answer:
          "Importing replaces the current file set with whatever text files the archive contains, so an existing system prompt can be brought in and edited from there instead of starting from the template. Binary files inside the archive are skipped rather than shown corrupted, since the editor only handles plain text.",
      },
      {
        question: "Does this tool check whether my finished system prompt is actually safe?",
        answer:
          "No. This tool provides only the starting structure and the editor to fill it in; it does not evaluate the constraints or escalation conditions you write for correctness against the agent's real capabilities. Reviewing the finished file with someone other than the writer is still necessary before it goes into production.",
      },
      {
        question: "Should every agent's escalation section look the same?",
        answer:
          "No. What counts as a refusal or escalation condition depends on what the specific agent can do and what it would cost to get wrong; a wiki search agent and an agent that can issue refunds need very different thresholds. The escalation section is a required place to write that judgement down, not a fixed set of conditions to copy into every agent.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-tools",
        label: "Browse agent building tools",
        description: "Every builder tool in this category, for a system prompt, a tool use policy, memory strategy and evaluation starters.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Build a skill file instead",
        description: "A related builder tool for a skill's own instruction file, the equivalent structure for a recurring task rather than a whole agent.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "Get help surfacing unstated constraints",
        description: "A prompt for drawing an explicit decision boundary and constraints, the same discipline the constraints section here needs.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "Get help writing clear instructions",
        description: "A prompt for turning a rough explanation into clear, structured technical writing, useful for every section of a system prompt.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic's prompt engineering guide",
        description: "Authoritative guidance on writing instructions a model can follow precisely, directly applicable to every section of a system prompt.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI's prompt engineering guide",
        description: "A second major model provider's own guidance on specific, checkable instruction writing for a model operating with tools.",
      },
      {
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
        label: "The NIST AI Risk Management Framework",
        description: "An independent framework for thinking about the constraints and escalation conditions an autonomous system needs before it operates.",
      },
      {
        href: "https://www.w3.org/WAI/EO/tips/writing/",
        label: "W3C guidance on writing for clarity",
        description: "Independent guidance on plain, unambiguous writing, the same standard a constraint or escalation condition needs to be checkable.",
      },
    ],
  },
  tags: ["system prompt", "agent instructions", "ai agent", "system prompt template"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
