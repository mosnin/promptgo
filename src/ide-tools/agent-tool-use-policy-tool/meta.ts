import type { IdeToolMeta } from "@/lib/ide-tool-types";

const TOOL_USE_POLICY_TEMPLATE = `# Tool Use Policy

Replace [Agent Name] with the name of the agent this policy governs. This
file is the rulebook that decides, on every turn, whether the agent should
call a tool, ask a clarifying question, or answer directly from what it
already knows. It is a separate document from the agent's system prompt on
purpose: a system prompt states who the agent is and what it is for, while
this file states the mechanics of when reaching for a tool is the right
move and when it is not.

## When to call a tool versus ask versus answer directly

Work through these three checks, in order, before every tool call.

1. Can the current request be answered correctly and completely from
   information already in context, with no risk of it being stale or
   wrong? If yes, answer directly. Calling a tool to confirm something
   already known wastes a turn and adds a failure point for no benefit.
2. Is a piece of information required to proceed missing, ambiguous, or
   likely to have changed since the agent's training data was fixed? If
   yes, and a tool exists that can retrieve it reliably, call that tool
   rather than guessing or hedging with a vague answer.
3. Is the missing piece something only the person the agent is working
   for can supply, such as a preference, a permission, or a business
   decision no tool can look up? If yes, ask a clarifying question instead
   of calling a tool. A tool cannot answer a question about intent.

## Required information checks before a tool call

Before invoking any tool, confirm every one of the following. Skipping this
checklist is the single most common cause of a wasted or malformed call.

- Replace this with the exact required parameters this tool needs, and
  confirm each one is known, not guessed. A parameter invented to fill a
  gap produces a call that looks valid and returns a wrong or misleading
  result.
- Replace this with the source each required parameter should come from:
  the user's message, an earlier tool result already in context, or a
  document already provided. If a required parameter comes from none of
  those, treat it as missing information and ask rather than call.
- Confirm the tool is actually the right one for this specific need, not
  merely a tool that touches the same general area. Two tools that sound
  similar can have very different scope, cost, or side effects.

## Destructive and irreversible actions require explicit confirmation

Never call a tool that deletes, overwrites, sends, publishes, charges, or
otherwise changes something outside the conversation in a way that cannot
be undone, without first stating plainly what the action will do and
getting an explicit yes from the person the agent is working for. A
reasonable-sounding assumption is not confirmation. Silence is not
confirmation. If the person's message could be read as either approval or
a general instruction to proceed, treat it as ambiguous and ask directly:
name the specific action, name what it affects, and wait for a clear
answer before calling.

Replace this list with the specific actions in [Agent Name]'s toolset that
count as destructive or irreversible for this agent:

- Replace with a destructive action, for example deleting a record, and
  the confirmation phrase this policy requires before it runs.
- Replace with a second destructive action and its own confirmation
  requirement, since not every irreversible action carries the same risk
  or needs the same level of detail confirmed back to the user.

## Do not repeat a failed tool call without changing the approach

A tool call that fails and is retried with the same parameters will
usually fail the same way again. Before calling the same tool a second
time after a failure, change something concrete about the approach: a
different parameter value, a different tool that can reach the same goal,
or a clarifying question to the person the agent is working for about
what the first attempt was missing. Two consecutive failures on
essentially the same call is the signal to stop calling and explain the
situation instead of trying a third time.

## What to do when a tool call fails

1. Read the actual error or result returned, not just whether the call
   succeeded or failed. The specific reason usually points directly at
   what to change.
2. Decide whether the failure is something the agent can address on its
   own, such as a malformed parameter it can now correct, or something
   that needs new information from the person it is working for, such as
   a missing permission or an account state only they can change.
3. If the fix is within the agent's own control, apply it and retry once
   with the corrected approach, following the rule above against blind
   repetition.
4. If the fix is not within the agent's control, stop calling the tool,
   state plainly what failed and why, in terms the person can act on, and
   ask for what is needed to proceed rather than continuing to try
   variations that are unlikely to succeed.

## Placeholder sections to replace before this policy is used

- Replace this section with the full list of tools available to
  [Agent Name], grouped by whether they are read only, reversible, or
  destructive, so the rules above map onto real tool names rather than
  abstract categories.
- Replace this section with any domain specific exception this agent
  needs, stated as narrowly as possible so it does not quietly loosen the
  general rules above.
`;

const POLICY_SCENARIOS_TEMPLATE = `# Worked scenarios for the tool use policy

Two short scenarios, replaced here with real ones as this policy is
adapted to a specific agent. Each works through the three checks in
TOOL_USE_POLICY.md against a concrete request, so the policy reads as
something applied rather than only stated in the abstract.

## Scenario one: calling a tool is correct

A user asks the agent for the current exchange rate between two
currencies so they can finish a budget. The agent's context contains no
exchange rate, and even if it did, a rate from earlier in the
conversation, or from training data, could be hours or months stale by
the time the answer is used. This is exactly the second check in the
policy: information required to proceed is missing and is the kind of
fact that changes over time, and a tool exists that can retrieve the
current value directly. The required information check is easy to
satisfy too, since the two currency codes the tool needs are stated
plainly in the user's own message, with no guessed or invented parameter.
The action is also read only, so the destructive action rule does not
apply and no confirmation step is needed. Calling the tool, reading back
the rate it returns, and answering with that number and the moment it was
retrieved is the correct move, and refusing to call the tool here in
favor of a remembered or estimated figure would give the user a worse,
possibly wrong, answer than the one the tool can actually provide.

## Scenario two: calling a tool is not correct

A user tells the agent they prefer their weekly report emailed on Friday
afternoons rather than Monday mornings. The agent has a tool that can send
a one off email immediately. Reaching for that tool here would be a
mistake, because the request is not asking for an email to be sent right
now, it is stating a standing preference for a schedule that has not been
described yet, and nothing in the message supplies a specific report, a
specific recipient, or a specific date for a one off send. This is the
third check in the policy: the missing piece, exactly what to do with that
preference going forward, is something only the person can clarify, not
something any tool call can resolve by acting immediately. The right
response is a clarifying question about how the standing schedule should
be set up, not a tool call that sends an email nobody asked for yet. If
the agent instead called the email tool on a guess at what to send, it
would also trip the destructive action rule, since a sent email cannot be
recalled, without ever having gotten the explicit confirmation that rule
requires.

## What both scenarios share

In both cases the agent works through the same three checks in the same
order before deciding anything: whether existing context already answers
the request, whether a tool can supply specific missing information, and
whether the missing piece is instead a decision or preference only the
person can state. The scenarios differ only in where that path lands, one
at a confident tool call and one at a clarifying question, which is the
entire purpose of writing the checks down rather than leaving the
decision to case by case judgment on every single turn.
`;

const meta: IdeToolMeta = {
  slug: "agent-tool-use-policy-tool",
  title: "Agent Tool Use Policy Tool: Write the Rules for Calling a Tool",
  name: "Agent Tool Use Policy",
  category: "agent-tools",
  summary:
    "Open a working tool use policy template and two worked scenarios in an in-browser editor, rewrite them for your own agent, and download the result as a .zip.",
  seo: {
    primaryKeyword: "agent tool use policy tool",
    keywords: [
      "agent tool use policy tool",
      "ai agent tool use policy template",
      "when should an ai agent call a tool",
      "tool use policy generator for ai agents",
      "agent tool calling rules template",
    ],
    seoTitle: "Agent Tool Use Policy Tool: Free Editable Policy Template",
    seoDescription:
      "A free agent tool use policy tool that opens a working TOOL_USE_POLICY.md and two worked scenarios in the browser, ready to rewrite and download as a .zip.",
  },
  files: [
    { path: "TOOL_USE_POLICY.md", content: TOOL_USE_POLICY_TEMPLATE, kind: "markdown" },
    { path: "reference/policy-scenarios.md", content: POLICY_SCENARIOS_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the same tool call failure patterns this site's agent building category documents across its templates.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Agents built without a written tool use policy tend to fail in one of two directions on the same task: calling a lookup tool for information already available and answerable directly, or answering confidently from stale or guessed information instead of calling a tool that could have supplied the real value. A written policy that separates the decision into explicit checks, rather than leaving it to per turn judgment, keeps that choice consistent across a long session and across different models running the same agent.",
  },
  article: {
    intro: [
      "This agent tool use policy tool opens a working TOOL_USE_POLICY.md file directly in your browser, alongside a second file walking through two scenarios, one where calling a tool is the right move and one where it is not. The template is fixed, real starting content, ready to be rewritten for the tools your own agent actually has.",
      "A tool use policy is a distinct document from an agent's system prompt, which states who the agent is, its tone, and its overall task. This template covers a narrower, more mechanical question: when should an ai agent call a tool, when should it ask a clarifying question instead, and when does it already have enough to answer directly. Getting that decision wrong in either direction, a tool call for something already known or a confident guess where a tool call was needed, is one of the more common ways an otherwise well built agent produces a bad turn.",
      "Everything runs client side: editing the starter files, importing a .zip you already have, and downloading the result as a fresh archive happen in the browser with nothing uploaded anywhere. That makes this a genuinely free agent tool calling rules template rather than a signup gated service, usable from any browser without installing anything first.",
    ],
    sections: [
      {
        heading: "Why this is a separate file from the system prompt",
        body: [
          "A system prompt tends to grow long describing who the agent is and how it should sound, and a tool policy buried as one paragraph inside it is easy to skim past. Splitting it into its own agent tool use policy tool file forces the checkable rules for when to reach for a tool, when to ask, and when to answer directly to get written down, and keeps the file short enough that an agent treats it as instructions to follow rather than background it drifts away from.",
        ],
      },
      {
        heading: "The three way decision: call, ask, or answer",
        body: [
          "The template's first section walks through the exact order this decision happens in: first, whether the current context already answers the request without risk of being stale; second, whether missing information exists that a tool can reliably retrieve; and third, whether the missing piece is a preference only the person the agent works for can supply, which a clarifying question resolves and no tool call can. Writing this as an ordered checklist is what makes the rules something a person can audit.",
        ],
      },
      {
        heading: "Required information checks close the most common gap",
        body: [
          "The most frequent defect in an unwritten tool policy is a call made with a guessed parameter standing in for one never confirmed. As an ai agent tool use policy template, this section closes that gap: before any call, every parameter needs a real source, the user's own message, an earlier tool result, or a document already supplied, and a value with none of those sources counts as missing information rather than something to invent.",
        ],
      },
      {
        heading: "Destructive actions need explicit confirmation, not an assumption",
        body: [
          "A tool call that deletes, overwrites, sends, publishes, or charges something outside the conversation, in a way that cannot be undone, carries different risk than a read only lookup. The template requires a plain statement of what the action will do, followed by an explicit yes from the person the agent works for. An assumption from earlier in the conversation is not confirmation, which is the rule an agent is most likely to skip under time pressure.",
        ],
        list: [
          "State the specific action and what it affects before calling a destructive tool.",
          "Wait for an explicit yes rather than inferring approval from an adjacent instruction.",
          "Treat an ambiguous message as a reason to ask, not a reason to proceed.",
        ],
      },
      {
        heading: "Breaking the retry loop after a failed call",
        body: [
          "Calling the same tool again with the same parameters after a failure almost always produces the same failure again, and the template names this as its own rule. Two consecutive failures on essentially the same call is the signal that something concrete needs to change: a different parameter, a different tool that reaches the same goal, or a question back to the person the agent works for about what the attempt actually missed.",
        ],
      },
      {
        heading: "What to do when a tool call fails",
        body: [
          "The failure handling section separates two situations: one the agent can correct on its own, such as a malformed parameter, and one that needs information only the person can supply, such as a missing permission. The steps read the error, apply a fix and retry once when within the agent's control, and otherwise stop, explain what failed, and ask for what is needed rather than trying variations unlikely to work.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import a .zip, reset to the starter template, or download the current file set. Importing reads a .zip from your own device client side, so an existing policy document can be brought in and continued rather than rewritten from nothing.",
        ],
      },
    ],
    howTo: {
      name: "How to write an agent tool use policy with this tool",
      steps: [
        { name: "Read the starter files", text: "Open TOOL_USE_POLICY.md and reference/policy-scenarios.md in the editor to see the full structure before changing anything." },
        { name: "Name the agent and list its tools", text: "Replace [Agent Name] and fill in the real tools available, grouped by whether each one is read only, reversible, or destructive." },
        { name: "Fill in the required information checks", text: "Write the real parameters each tool needs and the real source each one should come from, replacing every placeholder line." },
        { name: "Name the destructive actions and confirmation wording", text: "List the specific actions that count as destructive for this agent and the confirmation each one requires before it runs." },
        { name: "Replace the two worked scenarios", text: "Rewrite reference/policy-scenarios.md with a real request where a tool call is correct and a real request where a clarifying question is correct instead." },
        { name: "Download the finished policy", text: "Click Download .zip to save the file set exactly as shown in the editor, ready to hand to the agent it governs." },
      ],
    },
    faq: [
      {
        question: "How is an agent tool use policy tool different from a system prompt builder?",
        answer:
          "A system prompt states who an agent is, its tone, and its overall task, and a system prompt builder is structured around that broader shape. As a tool use policy generator for ai agents, this tool covers one narrower decision: given a specific request right now, should the agent call a tool, ask a clarifying question, or answer directly. Keeping the two as separate documents keeps the tool calling rules specific enough to audit.",
      },
      {
        question: "Do I need to know a specific agent framework to use this template?",
        answer:
          "No. The policy is written as plain markdown describing rules and checks, not code tied to any framework's tool calling syntax. It applies to any agent that can call external tools, regardless of which platform wires the calls together, since the underlying decision of when to call one is the same shape everywhere.",
      },
      {
        question: "Is anything I type here saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the visit. Nothing is sent to a server as you type, and nothing is stored once you close or reload the page, so downloading the .zip before you leave is the only way to keep your work.",
      },
      {
        question: "What happens if I import a .zip that already has a policy file in it?",
        answer:
          "Importing replaces the current file set with whatever text files the archive contains, so an existing policy document can be brought in and edited further rather than started over. Binary files inside the archive are skipped rather than shown corrupted, since the editor only handles plain text.",
      },
      {
        question: "Does this tool check whether my finished policy actually covers every tool my agent has?",
        answer:
          "No. This tool only provides the starting structure and the editor to fill it in; it does not read your agent's actual tool list or verify that every tool is accounted for. Working through the placeholder tool list section against your agent's real toolset by hand is still the way to catch a gap the template alone cannot.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-tools",
        label: "Browse the agent building tools category",
        description: "Every builder tool for an agent's own operating documents, including system prompt structure and memory strategy starters.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "See the AI skill builder tool",
        description: "A related builder tool in the same in-browser editor, for starting a new multi file skill instead of an agent policy.",
      },
      {
        href: "/coding-prompts/api-error-handling-prompt",
        label: "Get help mapping error handling branches",
        description: "A prompt for listing every failure mode a piece of code can produce, the same discipline the failure handling section here needs.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "Get help debugging an unexpected result",
        description: "A prompt for working through why a specific output was wrong, useful when a tool call succeeds but returns something unexpected.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview",
        label: "Anthropic's tool use documentation",
        description: "Authoritative guidance on how a model decides to call a tool and structures its input, directly relevant to the required information checks here.",
      },
      {
        href: "https://platform.openai.com/docs/guides/function-calling",
        label: "OpenAI's function calling guide",
        description: "A second major model provider's own documentation on tool and function calling behaviour, useful for comparing conventions across platforms.",
      },
      {
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
        label: "The NIST AI Risk Management Framework",
        description: "An independent framework covering risk from automated actions, relevant background for the destructive action confirmation rule.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/",
        label: "W3C guidance on understandable interaction",
        description: "Independent guidance on stating an action's consequences plainly before it happens, the same discipline the confirmation wording in this policy needs.",
      },
    ],
  },
  tags: ["agent tools", "tool use policy", "in browser editor", "agent policy template"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
