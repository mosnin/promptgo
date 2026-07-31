import type { IdeToolMeta } from "@/lib/ide-tool-types";

const SYSTEM_PROMPT_TEMPLATE = `# Customer Support Agent System Prompt

Replace the bracketed placeholders below with the real product name, policy
numbers and links your own support operation actually uses before this file
goes anywhere near a real customer conversation. Every section below exists
because a support agent that is missing it either sounds robotic or, worse,
grants an exception nobody authorised it to grant.

## Role and tone

You are a customer support agent for [PRODUCT OR COMPANY NAME]. Speak in a
[TONE, for example warm and direct] voice. Acknowledge the customer's problem
in your first sentence before asking a clarifying question. Never use jargon
the customer has not already used themselves, and never pad a short answer
with filler just to sound thorough.

## What you may resolve directly

You may resolve the following without asking a human to step in:

- Order status and shipping timeline questions, using the order lookup tool.
- Password resets and login troubleshooting for the customer's own account.
- Standard refunds and exchanges at or under [REFUND THRESHOLD, for example
  $50] that fall inside the [RETURN WINDOW, for example 30 day] window.
- Plan and billing questions that do not involve a dispute over a charge.
- Known issues already listed in [KNOWN ISSUES DOC LINK], using the
  documented workaround exactly as written there.

## What you must never decide on your own

The following require a human, every time, regardless of how confident you
are or how reasonable the customer's case sounds:

- Any refund above [REFUND THRESHOLD].
- Any account deletion or permanent data removal request.
- Any change to the email address or payment method on an account you cannot
  verify belongs to the person asking.
- Any legal, safety or compliance claim, including a threatened chargeback,
  lawsuit or regulatory complaint.
- Any exception to a stated policy, even a small one, that the customer is
  asking you to make just this once.

Do not present these as your own personal limitation. State plainly that this
specific request needs a specialist's review, then follow the handoff format
in ESCALATION_RULES.md.

## Verification before acting

Before resolving anything account specific, confirm the requester controls
the account using [YOUR VERIFICATION METHOD, for example the last four digits
of the payment method on file and the email on the account]. If verification
fails twice, stop and escalate rather than trying a third method.

## Placeholders to replace before launch

- [PRODUCT OR COMPANY NAME]
- [TONE]
- [REFUND THRESHOLD]
- [RETURN WINDOW]
- [KNOWN ISSUES DOC LINK]
- [YOUR VERIFICATION METHOD]
`;

const ESCALATION_RULES_TEMPLATE = `# Escalation Rules

A checklist of concrete situations that must be handed off to a human support
agent, and exactly what information the handoff has to include. Replace the
bracketed thresholds with your own operation's real numbers, then treat this
file as a check the agent runs before closing or continuing any conversation.

## Escalate immediately, no exceptions

- The customer threatens legal action, a chargeback, or a regulatory
  complaint.
- The customer reports a safety issue, a security vulnerability, or a data
  breach concern.
- The request needs an exception to policy you are not authorised to grant,
  such as a refund above [REFUND THRESHOLD] or deleting account data.
- You cannot verify the requester controls the account after two attempts.
- The customer states, in any wording, that they want to speak to a human or
  a manager.

## Escalate after repeated failure

- Three attempts to resolve the same underlying issue have not worked, even
  if each attempt used a different approach.
- The customer's description of the problem changes materially between
  messages in a way that suggests you have misunderstood the actual issue.
- A documented known workaround does not fix the problem for this specific
  customer.

## What every handoff must include

A handoff that forces the human agent to re-ask the customer everything
wastes the goodwill the escalation was meant to protect. Every handoff note
must contain:

1. The customer's original request, in their own words where possible.
2. What you have already tried, and the result of each attempt.
3. Any account verification already completed, and how it was done.
4. The specific policy boundary or authority limit that triggered the
   escalation.
5. The urgency level, and why, for example an unresolved safety concern
   versus a routine refund exception.

## After handing off

Tell the customer plainly that a specialist is picking up the conversation,
roughly how long that will take if you know [YOUR ESCALATION SLA], and that
they do not need to repeat what they have already told you. Do not promise a
specific outcome the human agent has not confirmed.

## Placeholders to replace before launch

- [REFUND THRESHOLD]
- [YOUR ESCALATION SLA]
`;

const README_TEMPLATE = `# Customising this customer support agent starter template

This starter kit gives the customer support agent archetype three files:
SYSTEM_PROMPT.md for its operating instructions, ESCALATION_RULES.md for when
it must hand off to a person, and this file. None of it is ready to run
against real customers until every bracketed placeholder is replaced with
your own policy's actual numbers and links.

## Files in this starter

- \`SYSTEM_PROMPT.md\`, the agent's operating instructions: tone, what it may
  resolve directly, and the policy boundaries it must never cross on its own.
- \`ESCALATION_RULES.md\`, a checklist of situations that require a human
  handoff, plus exactly what the handoff note must include.
- \`README.md\`, this file.

## Before you edit anything

Gather the real policy specifics this template assumes already exist
somewhere: your refund threshold and return window, your account
verification method, your escalation SLA, and a link to whatever document
lists known issues and their workarounds. If any of these do not exist yet
as written policy, write that policy first. An agent cannot enforce a
boundary that only lives in one person's head.

## Editing SYSTEM_PROMPT.md

Replace the product name, tone description and every bracketed threshold
with your own. Read the section on what the agent must never decide on its
own carefully. It is deliberately conservative: a refund threshold, an
account deletion, and anything resembling a legal or compliance claim are
listed as always escalate, not as a judgement call the agent gets to make.
Loosen this list only with real authority to do so, and treat tightening it
further as always safe.

## Editing ESCALATION_RULES.md

The escalation triggers here cover situations that come up across most
support operations: an explicit threat, a verification failure, a repeated
failed resolution and a direct request for a human. Add any trigger specific
to your own product, for example a category of technical failure that always
needs an engineer, using the same checklist format so the agent can check
its own behaviour against it before closing a conversation.

## Adding files

This kit is intentionally minimal. A real deployment often adds a known
issues reference file, a set of tone examples, or a glossary of product
terms the agent should use consistently. Add these as new files in the
editor rather than folding everything into SYSTEM_PROMPT.md, which stays
easiest to maintain when it points to supporting files instead of
containing all of them itself.

## What this template does not do

It does not connect to a live support queue, a ticketing system or a real
customer database. It is plain text meant to be adapted into whatever
platform actually runs the agent, whether that is a hosted assistant, a
custom application, or a specific agent framework. Wiring the finished files
into that platform is a separate step this kit does not cover.
`;

const meta: IdeToolMeta = {
  slug: "customer-support-agent-starter-template",
  title: "Customer Support Agent Starter Template: Policy Aware Files",
  name: "Customer Support Agent Starter",
  category: "agent-starter-templates",
  summary:
    "Open a working three file markdown starter for a customer support agent in an in-browser editor: a policy aware system prompt, concrete escalation rules and a README, ready to customise and download as a .zip.",
  seo: {
    primaryKeyword: "customer support agent starter template",
    keywords: [
      "customer support agent starter template",
      "customer support system prompt template",
      "customer service escalation rules template",
      "download customer support agent template",
      "ai customer support agent template",
    ],
    seoTitle: "Customer Support Agent Starter Template: Free Kit",
    seoDescription:
      "A free customer support agent starter template: a policy aware system prompt, escalation rules and a README, editable in the browser and downloadable as a .zip.",
  },
  files: [
    { path: "SYSTEM_PROMPT.md", content: SYSTEM_PROMPT_TEMPLATE, kind: "markdown" },
    { path: "ESCALATION_RULES.md", content: ESCALATION_RULES_TEMPLATE, kind: "markdown" },
    { path: "README.md", content: README_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the policy boundaries and handoff information a real support operation needs written down before an agent can be trusted to run on its own.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A model asked to draft a customer support agent's instructions from a blank page reliably writes a friendly tone paragraph and a short list of what the agent can help with, then leaves the boundary between a routine resolution and a refund or account change that needs a human implicit rather than stated. That gap is exactly where a support agent grants an exception nobody authorised. A template with explicit, always escalate categories, and a required handoff format, closes that gap regardless of which model or person fills in the specifics.",
  },
  article: {
    intro: [
      "This customer support agent starter template opens a working, three file markdown starting point directly in your browser: a SYSTEM_PROMPT.md with tone guidance and explicit policy boundaries, an ESCALATION_RULES.md with a concrete handoff checklist, and a README explaining how to customise both for a real support operation. Nothing here is generated for you; every file is fixed, real content, ready to be rewritten into your own agent's instructions.",
      "A customer support agent has one problem most other agent archetypes do not carry to the same degree: the cost of a wrong autonomous decision is a real refund, a real deleted account, or a real customer told something a specialist would not have promised. Getting that boundary right, in writing, before launch is what this ai customer support agent template exists to force. Treat it as a customer support system prompt template: every boundary written down now is a decision the agent cannot improvise later.",
      "Everything here runs in the tab, which is what makes this a genuinely free, no signup starter kit rather than a service that gates the files behind an account: editing the starter files, importing a .zip you already have, and downloading the result all happen client side, with nothing about the content ever uploaded anywhere.",
    ],
    sections: [
      {
        heading: "Why a support agent needs stated policy boundaries, not just a tone",
        body: [
          "A support agent written with only a role and a tone description will, sooner or later, be asked to make an exception: waive a fee, delete an account under pressure, or promise a refund a specialist has not approved. Without an explicit list of decisions the agent must never make on its own, a confident model tends to grant the exception because the case sounds reasonable, not because policy permits it. SYSTEM_PROMPT.md states those boundaries as concrete prohibitions, refund thresholds, account deletion and legal claims among them, not general caution the agent has to interpret case by case.",
        ],
      },
      {
        heading: "The escalation checklist is where most hand written agents fall short",
        body: [
          "Naming a boundary is only half the job; the other half is what happens once the agent hits one. ESCALATION_RULES.md works as a customer service escalation rules template: concrete triggers for a human handoff, plus what the handoff note must contain. A handoff missing that context forces the human agent to re-ask the customer everything, often worse than asking for help sooner.",
        ],
        list: [
          "Escalate immediately on a legal threat, a safety report, or a policy exception the agent is not authorised to grant.",
          "Escalate after three failed attempts at the same underlying issue.",
          "Every handoff must state what was tried, what was verified, and which boundary was hit.",
        ],
      },
      {
        heading: "How this differs from the general purpose agent tools on this site",
        body: [
          "This is deliberately not another version of this site's own general purpose builder tools. The agent system prompt builder tool scaffolds the five sections any tool using agent needs, role, tools, constraints, format and escalation, with no archetype assumed; this template fills those sections in for one specific job, with real refund and verification language in place of a placeholder list. The agent handoff protocol tool defines a general handoff format for any agent; ESCALATION_RULES.md here is a support specific instance, with the exact triggers a support conversation needs.",
        ],
      },
      {
        heading: "Customising the placeholders for a real support operation",
        body: [
          "Every bracketed placeholder, the refund threshold, the return window, the verification method, the escalation SLA, maps to a real number a support operation should already have written down, even if only in one person's head. README.md walks through gathering those specifics before editing either file, since a policy that exists only as tacit knowledge cannot be enforced by an agent never told what it is.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a text pane, and a toolbar to add a file, import a .zip, reset to the starter, or download the current set. Importing reads a .zip picked from your own device client side. When ready, download customer support agent template files as a fresh .zip; nothing is sent anywhere first.",
        ],
      },
      {
        heading: "What this template deliberately leaves out",
        body: [
          "This starter kit does not include a live ticketing integration, a real customer database, or a specific agent framework's configuration file. It also does not write your actual refund or verification policy for you; an agent that follows a fabricated policy confidently is worse than one that asks a human before acting on a policy nobody wrote.",
        ],
      },
    ],
    howTo: {
      name: "How to customise this customer support agent starter template",
      steps: [
        { name: "Read all three starter files", text: "Open SYSTEM_PROMPT.md, ESCALATION_RULES.md and README.md to see the full structure first." },
        { name: "Gather your real policy specifics", text: "Write down your actual refund threshold, return window, verification method and escalation SLA." },
        { name: "Fill in the SYSTEM_PROMPT.md placeholders", text: "Replace the product name, tone and every threshold, keeping the always escalate list conservative." },
        { name: "Fill in the ESCALATION_RULES.md placeholders", text: "Set the real refund threshold and SLA, and add any trigger specific to your own product." },
        { name: "Add supporting files if you need them", text: "Use Add file for a known issues reference or tone examples, rather than folding everything into one file." },
        { name: "Download the finished starter kit", text: "Click Download .zip to save all three files exactly as shown, ready to adapt into your platform." },
      ],
    },
    faq: [
      {
        question: "Does this starter template include real escalation logic?",
        answer:
          "It includes the written checklist an agent or reviewer can follow, covering triggers like a legal threat, a failed verification, or three repeated attempts on the same issue, plus the exact fields a handoff note must contain. It does not include a routing system; wiring the checklist into a notification path is a separate step for the platform running the agent.",
      },
      {
        question: "How is this different from the agent system prompt builder tool?",
        answer:
          "The agent system prompt builder tool is a general blank template covering the five sections any tool using agent's instructions need, with no archetype assumed. This template fills those sections in for one specific job, with real refund thresholds and verification language in place of a placeholder list, a support specific instance, not a duplicate.",
      },
      {
        question: "How is this different from the agent handoff protocol tool?",
        answer:
          "The agent handoff protocol tool defines a general handoff format for passing work between agents or to a person, usable across many kinds of agent. ESCALATION_RULES.md here applies that idea to customer support: the exact triggers a support conversation runs into, such as a legal threat or an unverifiable request, and the fields a specialist needs.",
      },
      {
        question: "Is anything I type here saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for your visit. Nothing is sent to a server as you type, and nothing persists after you close or reload the page, so downloading the .zip before leaving is the only way to keep your edits.",
      },
      {
        question: "Can I add more files to this customer support agent starter template?",
        answer:
          "Yes. The Add file control in the editor's sidebar lets you create any additional file at any path, for example a known issues reference file or a set of tone examples. README.md recommends adding supporting files this way rather than folding everything into SYSTEM_PROMPT.md, which stays easier to maintain when it points elsewhere.",
      },
      {
        question: "Does this template work with any customer support platform?",
        answer:
          "The three files are plain markdown with no platform specific syntax, so they can be adapted into a hosted assistant, a custom application, or a specific agent framework's own configuration format. The template does not connect to a live ticketing system or a customer database; wiring the instructions into a platform is a separate step outside this kit.",
      },
      {
        question: "Does this tool check whether my finished policy boundaries are actually correct?",
        answer:
          "No. This tool provides the starting structure and the editor to fill it in; it does not verify that the refund threshold, verification method or escalation triggers you write match your real policy. Reviewing the finished files against your actual, enforced policy, ideally with whoever owns it, is still necessary before the agent goes near a real customer.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-tools/agent-system-prompt-builder-tool",
        label: "Build a general purpose agent system prompt",
        description: "The general blank template this starter's SYSTEM_PROMPT.md is a support specific, already filled in instance of.",
      },
      {
        href: "/ide-tools/agent-tools/agent-handoff-protocol-tool",
        label: "Build a general purpose agent handoff protocol",
        description: "The general handoff format this starter's ESCALATION_RULES.md applies specifically to a support conversation.",
      },
      {
        href: "/ide-tools/agent-starter-templates",
        label: "Browse every agent starter template",
        description: "See the other agent archetype starters in this category, each with the files its specific archetype needs.",
      },
      {
        href: "/skills/sales-skills/sales-to-cs-handoff-readiness-skill",
        label: "Check a handoff before it happens",
        description: "A published skill for auditing whether a handoff between teams actually has the context the receiving side needs, the same discipline ESCALATION_RULES.md is built around.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.zendesk.com/blog/customer-experience/engagement/escalation-management/",
        label: "Zendesk on escalation management",
        description: "Industry guidance on when and how a support ticket should move to a higher level of authority, directly relevant to ESCALATION_RULES.md.",
      },
      {
        href: "https://blog.hubspot.com/service/escalation-management",
        label: "HubSpot's guide to escalation management",
        description: "A second major support platform provider's own guidance on structuring escalation criteria and handoff information.",
      },
      {
        href: "https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions",
        label: "The FTC on returns and refunds",
        description: "An independent government source on how refund and return policy actually works, useful context for setting a real refund threshold.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic's prompt engineering guide",
        description: "Authoritative guidance on writing instructions a model can follow precisely, directly applicable to the boundaries in SYSTEM_PROMPT.md.",
      },
    ],
  },
  tags: ["customer support agent", "support agent template", "escalation rules", "agent starter template"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
