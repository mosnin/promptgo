import type { IdeToolMeta } from "@/lib/ide-tool-types";

const HANDOFF_PROTOCOL_TEMPLATE = `# Agent Handoff Protocol

Replace [Agent Name] below with the name of the agent this protocol governs.
This file defines two decisions the agent has to get right every time: when
to stop and escalate to a human, and when to stop and hand off to a
different, more specialised agent instead of continuing on its own. It also
defines the exact fields a handoff summary must contain so whoever receives
it, human or agent, can pick the work up without re-deriving context that
already exists.

## When [Agent Name] escalates to a human

Escalate to a human rather than continuing or guessing whenever any of the
following is true:

- The user has already stated a hard constraint or preference, and the only
  way to keep going would cross it: a stated budget, a stated deadline, a
  tool it must not use, a person it must not contact without asking first.
- Continuing requires a decision only the user is positioned to make: a
  cost above a stated threshold, a change nothing in the original request
  licensed, or a choice between two reasonable paths with materially
  different outcomes.
- The next action would be difficult or impossible to reverse: deleting
  data, sending a message outside the conversation, publishing something,
  spending money, or changing a live production system.
- Two or more attempts at the same sub task have failed for different
  reasons, which is usually a sign the task needs information or a decision
  the agent does not have, not another attempt at the same approach.
- Replace this line with any escalation trigger specific to this agent's
  own domain, for example a compliance rule, a safety boundary, or a topic
  it should never handle unsupervised.

## When [Agent Name] hands off to a different agent instead

Hand off to a different, more specialised agent, rather than a human, when
the remaining work sits squarely inside that other agent's stated purpose
and outside this one's own: a general assistant reaching a step that needs
a code review agent, a security review agent, or a domain specific agent
built for exactly that step. Handing off to a better suited agent is not a
failure and does not need to route through a human first, unless one of the
conditions above (a hard constraint, an irreversible action, a decision
only the user can make) also applies, in which case escalate to the human
instead of, or in addition to, handing off to the other agent.

## Required fields in every handoff summary

A handoff summary, whether it goes to a human or to another agent, must
include all four of the fields below. A summary missing any one of them
forces the receiving party to re-derive context that already existed and
was simply never written down.

1. What was requested. The original task or goal, stated the way the user
   actually stated it, not a paraphrase that quietly drops a detail that
   later turns out to matter.
2. What has been tried. Every real attempt made so far and its outcome, so
   the receiving party does not repeat an approach that already failed for
   a known reason.
3. What is still unresolved. The specific open question, blocker or missing
   piece that triggered this handoff, stated concretely enough to be acted
   on without a follow up question.
4. Constraints and preferences already stated. Anything the user said about
   budget, timing, tone, tools to use or avoid, or people to involve,
   carried forward exactly rather than summarised into something vaguer.

## Handoff summary format

Use this structure for the written summary itself, filling in each field
from the list above in plain sentences rather than single words:

REQUESTED: what was asked for, in the user's own terms.
TRIED: each real attempt and its outcome, in the order it happened.
UNRESOLVED: the specific blocker or open question, not a vague restatement.
CONSTRAINTS: budget, deadline, tone, tools, people, anything already stated.

## What this protocol does not allow

Do not write a handoff summary that fills a field with a guess dressed up
as a fact. If a constraint was never actually stated, say that plainly
rather than inventing one that sounds plausible; a fabricated constraint is
worse than an admitted gap, because the receiving party will trust and act
on it without checking. Do not continue past a condition in the escalation
list above on the theory that the next step will probably be fine.
Probably fine is exactly the judgement this protocol exists to take out of
the agent's hands for the specific cases named here.
`;

const HANDOFF_EXAMPLE_TEMPLATE = `# Worked example: one handoff summary written to the protocol

This is a single worked example of the format HANDOFF_PROTOCOL.md defines,
for a concrete, simple scenario. Read it alongside the protocol file to see
the four required fields filled in for real, rather than described in the
abstract.

## The scenario

A coding agent was asked to add a delete account feature to a small
internal admin tool. Partway through, it found that deleting an account
also needs to delete that account's uploaded files from storage, and there
are two ways to do that: delete the files immediately as part of the
request, or queue them for deletion after a thirty day grace period in
case the deletion needs to be reversed. Nothing in the original request
said which one was wanted, and the choice has real consequences either
way: immediate deletion cannot be undone if someone deletes the wrong
account by accident, and a grace period adds a queue and a background job
that were never part of the original scope. This is exactly the kind of
decision the protocol says to escalate rather than guess at, since it is a
choice between two reasonable paths with materially different outcomes.

## The handoff summary

REQUESTED: Add a delete account feature to the admin tool so an admin can
remove a user account entirely from the interface.

TRIED: Built the account deletion flow itself, including the confirmation
step and the database record removal, and confirmed it works correctly for
the account record. Then found that the account's uploaded files in
storage are not covered by the original request and need a decision before
they can be handled.

UNRESOLVED: Whether file deletion should happen immediately when the
account is deleted, or be queued with a thirty day grace period before the
files are actually removed. Immediate deletion is simpler to build and
ship today. A grace period is safer against an accidental deletion but
needs a queue and a background job that were not part of the original
scope.

CONSTRAINTS: The user asked for this to ship this week and mentioned the
admin tool is used by a small internal team, so there is no stated
preference yet on data retention. No budget or tooling constraint was
stated for this task.

## Why this counts as a complete handoff

Every field here is concrete enough to act on without asking a follow up
question first. The requested field states the actual goal in the user's
own terms rather than a vague paraphrase. The tried field says exactly
what is finished and verified, not just mostly done. The unresolved field
names the real decision and both options, rather than saying only that a
decision about files is needed. The constraints field carries forward the
one thing the user did say, the shipping timeline, and is honest that no
retention preference exists yet rather than inventing one that was never
given.

## What a weak version of this handoff would look like

A weak handoff for the same scenario might read: built the delete account
feature, just need to figure out the file handling, let me know how you
want to proceed. That sentence is true and still nearly useless: it does
not say what was actually verified, it does not name the two real options,
and it does not carry forward the shipping deadline the user already gave.
Whoever receives that summary has to ask at least two follow up questions
before they can even evaluate the decision, which is the exact re-deriving
of context this protocol exists to prevent.
`;

const meta: IdeToolMeta = {
  slug: "agent-handoff-protocol-tool",
  title: "Agent Handoff Protocol Tool: Escalation Rules for an AI Agent",
  name: "Agent Handoff Protocol",
  category: "agent-tools",
  summary:
    "Open a working two file agent handoff protocol tool in the browser: a HANDOFF_PROTOCOL.md defining exactly when to escalate to a human or hand off to another agent, plus a worked example summary.",
  seo: {
    primaryKeyword: "agent handoff protocol tool",
    keywords: [
      "agent handoff protocol tool",
      "ai agent escalation template",
      "agent escalation policy template",
      "handoff summary format for agents",
      "starter template for agent handoffs",
    ],
    seoTitle: "Agent Handoff Protocol Tool: Free Escalation Rules Starter",
    seoDescription:
      "A free agent handoff protocol tool with a starter HANDOFF_PROTOCOL.md defining when to escalate to a human or another agent, plus a worked example.",
  },
  files: [
    { path: "HANDOFF_PROTOCOL.md", content: HANDOFF_PROTOCOL_TEMPLATE, kind: "markdown" },
    { path: "reference/handoff-example.md", content: HANDOFF_EXAMPLE_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the same escalation and context transfer discipline this site checks its own handoff related skill and prompt content against.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Agents asked to escalate or hand off work without a written protocol tend to either push through a blocking decision on a guess, or stop and dump the entire conversation history on whoever receives it, leaving the receiving party to read everything again just to find the one open question that actually needs an answer. A fixed protocol that names the escalation triggers explicitly, and requires four specific fields in every handoff summary, keeps the decision to stop consistent and keeps the summary itself short enough to actually get read.",
  },
  article: {
    intro: [
      "This agent handoff protocol tool opens a working two file starter template directly in your browser: a HANDOFF_PROTOCOL.md file that defines exactly when an agent should escalate to a human, when it should hand off to a different, more specialised agent instead, and the four fields every handoff summary must contain so the receiving party does not have to re-derive context that already exists. A second file, reference/handoff-example.md, shows one worked handoff summary written to that exact format for a concrete, simple scenario.",
      "Most handoff advice gets written after a specific handoff has already gone wrong: an agent guessed at a decision it should have escalated, or dumped an entire transcript on a human instead of a short summary. This tool works the other way round. It functions as an ai agent escalation template written before any specific handoff happens, so the rules for when to stop are already decided the day the agent is built, not improvised under time pressure.",
      "Everything here runs in the tab, which is what makes this a genuinely free starter template for agent handoffs rather than a signup gated service: editing the files, importing a .zip, and downloading the result all happen client side, with nothing uploaded anywhere.",
    ],
    sections: [
      {
        heading: "Two different decisions, not one",
        body: [
          "An agent that only knows how to escalate to a human treats every blocker the same way, even the ones a more specialised agent could resolve faster. An agent that only knows how to hand off to another agent will sometimes hand a decision that only the user can make to a peer agent instead, which just moves the same unresolved question sideways. HANDOFF_PROTOCOL.md keeps these as two separate sections: escalating to a human is for a hard stated constraint, an irreversible action, a decision only the user can make, or repeated failure on the same sub task; handing off to another agent is for work squarely inside a different agent's stated purpose, with no human only condition also in play.",
        ],
      },
      {
        heading: "The four fields a handoff summary cannot skip",
        body: [
          "A handoff summary is only useful if the receiving party does not have to ask a follow up question before acting on it. The template requires four fields: what was requested, in the user's own terms; what has been tried, and its outcome; what is still unresolved, stated as an answerable question; and any constraint or preference already given, carried forward exactly. Skipping any one turns a handoff into extra work instead of less.",
        ],
      },
      {
        heading: "Writing a summary in the exact format, not just the spirit of it",
        body: [
          "The template gives a fixed labelled structure, REQUESTED, TRIED, UNRESOLVED, CONSTRAINTS, rather than leaving the shape to whoever happens to be writing it that day. A fixed structure is what makes a handoff summary format for agents predictable across many handoffs: the receiving party learns once where to look for the open question. This also works as an agent escalation policy template independent of any single framework, since the fields describe a decision every agent has to make regardless of platform.",
        ],
      },
      {
        heading: "How this differs from the task handoff skill",
        body: [
          "This site also publishes a task handoff skill in the skills directory, and the two are easy to conflate but do different jobs. The task handoff skill checks the completeness of an existing, already written handoff document for a human role transition: someone going on leave, changing roles, or leaving a job, with a document already drafted that needs auditing against three required parts.",
          "This agent handoff protocol tool is upstream of that entirely: a starter template for an agent's own operating rules, written before any specific handoff happens, defining when the agent stops at all and what a summary must contain the moment it does. One governs an agent deciding whether to stop; the other reviews a document a person already wrote.",
        ],
      },
      {
        heading: "Customising the escalation triggers for your own agent",
        body: [
          "The escalation list in HANDOFF_PROTOCOL.md covers triggers that apply to almost any agent: a stated hard constraint, an irreversible action, a decision only the user can make, repeated failure on the same sub task. Most agents also have at least one domain specific trigger worth adding, a compliance rule or a topic that should never be handled unsupervised, and the template leaves a marked line for it rather than pretending one generic list covers every case.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import an existing .zip, reset back to the starter template, or download the current file set. Importing reads a .zip entirely client side; nothing about its contents is sent anywhere before the archive is rebuilt for download.",
        ],
      },
    ],
    howTo: {
      name: "How to set up an agent handoff protocol with this tool",
      steps: [
        { name: "Read both starter files", text: "Open HANDOFF_PROTOCOL.md and reference/handoff-example.md to see the escalation rules, the four required fields, and one worked summary." },
        { name: "Name the agent the protocol governs", text: "Replace every [Agent Name] placeholder with the actual agent this file will ship with." },
        { name: "Add any domain specific escalation trigger", text: "Fill in the marked line under escalating to a human with a compliance rule or topic specific to this agent." },
        { name: "Confirm the four required fields fit your context", text: "Check that requested, tried, unresolved and constraints cover what a receiving human or agent would actually need." },
        { name: "Replace the worked example if useful", text: "Edit reference/handoff-example.md into a scenario closer to your own agent's real work." },
        { name: "Download the finished protocol", text: "Click Download .zip to save the file set exactly as shown, ready to ship alongside the agent it governs." },
      ],
    },
    faq: [
      {
        question: "Is this agent handoff protocol tool the same thing as the task handoff skill?",
        answer:
          "No. This tool is a starter template for an agent's own escalation and handoff rules, written before any specific handoff happens. The task handoff skill checks the completeness of an already written handoff document for a human role transition, such as someone going on leave. They cover different, adjacent problems and are meant to be used at different times.",
      },
      {
        question: "Does the protocol tell an agent how to make the underlying decision, not just when to stop?",
        answer:
          "No, and that is deliberate. The protocol defines when an agent should stop and who it should stop for, plus what a handoff summary must contain. It does not make the actual decision, since a decision that crosses a stated constraint or is hard to reverse is exactly the kind of choice this protocol routes to a human instead.",
      },
      {
        question: "What counts as a decision only the user can make?",
        answer:
          "Anything where two or more reasonable paths exist with materially different outcomes and nothing in the original request states a preference between them, plus anything above a stated budget or timing threshold. If an agent is genuinely unsure whether a choice is reversible, treating it as one that needs escalation is the safer default the protocol assumes.",
      },
      {
        question: "Can this protocol be used for a multi agent system rather than a single assistant?",
        answer:
          "Yes. The handing off to a different agent section exists for that case: work belonging to a more specialised agent's stated purpose gets routed there directly, and only escalates to a human first if a hard constraint or a user only decision is also in play.",
      },
      {
        question: "Is anything typed into the editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds changes only in the browser tab's own memory for the length of the visit. Nothing is sent to a server while editing, and nothing persists once the page closes or reloads, so downloading the .zip before leaving is the only way to keep the work.",
      },
      {
        question: "What if the agent has never actually tried anything before it needs to escalate?",
        answer:
          "State that plainly in the tried field rather than leaving it blank or padding it with something vague. An honest note that no attempt has been made yet is a complete entry; it tells the receiving party exactly where the work stands, which is the entire point of the field.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "Read the task handoff skill",
        description: "A related but different skill: it audits an already written handoff document for a human role transition rather than defining an agent's own escalation rules.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "Get a delegation brief prompt",
        description: "For drawing the decision boundary before work leaves a person's hands, the same discipline this protocol applies to an agent's own escalation triggers.",
      },
      {
        href: "/ide-tools/agent-tools",
        label: "Browse more agent building tools",
        description: "Every builder tool in this category, for starting the operating documents an agent runs on.",
      },
      {
        href: "/ide-tools",
        label: "See the full builder tools catalogue",
        description: "All five categories of in-browser starter files for skills, MCP servers, agents and tool definitions.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.anthropic.com/engineering/building-effective-agents",
        label: "Anthropic: Building effective agents",
        description: "Anthropic's own engineering guidance on agentic workflows, including pausing for human feedback at checkpoints and blockers rather than pushing through them.",
      },
      {
        href: "https://openai.github.io/openai-agents-python/handoffs/",
        label: "OpenAI Agents SDK: handoffs documentation",
        description: "A major agent framework's own reference for letting one agent delegate a task to another, the same handing off concept this protocol formalises as a written policy.",
      },
      {
        href: "https://support.pagerduty.com/main/docs/escalation-policies",
        label: "PagerDuty: escalation policy basics",
        description: "An independent reference for how an escalation policy notifies the right responder in sequence until someone acknowledges, the same structure behind escalating to a human here.",
      },
      {
        href: "https://www.atlassian.com/incident-management/on-call/escalation-policies",
        label: "Atlassian: escalation policies for incident management",
        description: "Independent guidance on who an incident should escalate to and how those handoffs should happen, the same questions this protocol answers for an agent instead of an on-call team.",
      },
    ],
  },
  tags: ["agent handoff", "escalation", "ai agent", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
