import type { IdeToolMeta } from "@/lib/ide-tool-types";

const MEMORY_STRATEGY_TEMPLATE = `# [Agent Name] Memory Strategy

Replace this heading with the name of the agent this strategy governs. A
memory strategy is not a general instruction file; it answers one narrow
question precisely: what does this agent carry forward, in what form, and
what does it refuse to carry forward at all.

## Within a session: what stays in full

List, as a checklist, the categories of information this agent should keep in
complete, unsummarised form for the rest of the current session. The default
answer for most agents is short: the user's actual goal for this session, any
constraint the user stated explicitly (a format, a deadline, a tool they do
not want used), and any decision already made that later turns should not
silently reverse.

- Replace this with the first thing worth keeping verbatim, for example
  "the exact file paths or identifiers the user has already confirmed."
- Replace this with the second thing, for example "any explicit constraint
  the user stated, quoted rather than paraphrased."
- Replace this with the third thing, if there is one.

Do not default to keeping everything verbatim. A session that never
summarises accumulates noise that crowds out the instructions that actually
matter, which is a real failure mode, not just an efficiency concern.

## Across sessions: what persists, if anything

Most agents should persist nothing across sessions by default. State plainly
here whether this agent is allowed to carry anything from one session into
the next, and if so, exactly what.

- If nothing should persist, write that explicitly rather than leaving this
  section blank, so a future editor does not assume persistence was simply
  forgotten.
- If something should persist, name it precisely: a stated long running
  preference, a project level fact that does not change turn to turn, or an
  identifier the user has confirmed is safe to reuse. Name the mechanism too,
  for example a specific file the agent writes to and reads back, rather than
  leaving persistence implicit in the model's own memory.
- State how a persisted fact gets corrected or removed once it is wrong or
  out of date, so stale memory has a defined way out rather than accumulating
  forever.

## When to summarise instead of carrying context forward verbatim

Summarise older turns once they stop being something a later turn needs to
quote exactly and start being something a later turn only needs to know
happened. A rule of thumb: once a turn's outcome has been acted on and
confirmed, replace the turn itself with one sentence stating what was decided
and why, and drop the back and forth that produced it.

1. Replace this with the trigger that should prompt a summary, for example
   "context is approaching a stated length limit" or "a topic has been fully
   resolved and the conversation has moved on."
2. Replace this with what the summary must preserve, for example the
   decision made and the reason for it, not the discussion that led there.
3. Replace this with what the summary is allowed to drop, for example
   abandoned options, corrected mistakes once the correction is in place, and
   exploratory questions that did not change the outcome.

## What must never be stored

State this section as an absolute list, not a judgement call left to the
agent in the moment. If a category of information appears here, the agent
should not write it to a file, a summary, or any form of memory that outlives
the single turn it appeared in, regardless of how useful it might seem later.

- Passwords, API keys, tokens, or any other credential, even if the user
  pastes one in directly.
- Anything the user has marked sensitive, confidential, or asked to be kept
  out of any record, in the exact terms they used.
- Personal information about a third party who is not present in the
  conversation and has not consented to being discussed.
- Anything the agent is not confident is accurate. An unverified guess
  written into memory as though it were a fact is worse than not remembering
  it at all, since a later turn will trust it without checking.

## Review checklist before writing to persistent memory

Before this agent writes anything to a file or store that will outlive the
current turn, replace this checklist with the real checks it should run
first.

- Confirm the information belongs in the persist across sessions category
  defined above, not just the within session category.
- Confirm none of the never store categories apply to what is about to be
  written.
- Confirm the record states where it came from and roughly when, so a later
  session can judge whether it is still current before relying on it.
`;

const MEMORY_WORKED_EXAMPLE_TEMPLATE = `# Worked example: a multi turn conversation walked through the strategy

Most memory strategies are easier to apply correctly after seeing one real
conversation decided turn by turn, rather than reading the rules in the
abstract. Replace everything below with a worked example drawn from the
agent this strategy actually governs, but keep the shape: the turns, then a
decision for each one, then the reasoning behind it.

## Example conversation excerpt

Turn 1, user: "I need to migrate our billing script off the old payment
provider's API. The new provider is called Northwind Pay. Here is my test
key for their sandbox: nw_test_51ab8f2e9c. Do not use the live key, I have
not sent it to you."

Turn 2, assistant: confirms the sandbox key was received, asks which
language the billing script is written in and whether the migration should
keep the old provider as a fallback.

Turn 3, user: "Python. No fallback needed, we are cutting over fully. Also,
quick tangent, do you know why our staging environment keeps timing out on
Fridays? Never mind, that is a separate problem, ignore that for now."

Turn 4, assistant: writes a first draft of the migration function using the
sandbox key, gets the request signature wrong, the sandbox call fails.

Turn 5, user: "That failed, the signature needs the timestamp header too.
Fixed version below." User pastes a corrected function.

Turn 6, assistant: adopts the corrected function, confirms the sandbox call
now succeeds.

Turn 7, user: "Good, that works. Now write the equivalent for the refund
endpoint."

## What gets kept in full for the rest of this session

- The target provider's name, Northwind Pay, and the two explicit
  constraints: Python, and no fallback to the old provider. These are stated
  constraints a later turn must not silently override.
- The corrected request function from turn 5, since turn 7 asks for a second
  endpoint built the same way and needs the working pattern, not the broken
  first attempt.

Reasoning: both are things a later turn in this same session directly
depends on to avoid repeating the turn 4 mistake or contradicting a stated
requirement.

## What gets summarised rather than carried forward verbatim

- Turns 4 and 5 collapse into one line once turn 6 confirms the fix worked:
  "the sandbox call needed a timestamp header in the signature; the working
  version is the one now in the draft." The failed first attempt and the
  back and forth that produced the fix do not need to be replayed, only the
  fact that this requirement exists and where the corrected version lives.

Reasoning: the outcome has been acted on and confirmed working, so what
matters going forward is the requirement itself, not the discovery process.

## What gets dropped entirely

- The Friday staging timeout tangent in turn 3. The user explicitly said to
  ignore it and it has no bearing on the billing migration.

Reasoning: the user withdrew the topic themselves in the same turn, and nothing
later in the conversation depends on it, so keeping it would only add noise
against the stated instructions of what to summarise or drop.

## What never gets written to memory at all, in any form, in this example

- The sandbox key, nw_test_51ab8f2e9c. Even though the user called it a test
  key and said not to use the live one, it is still a credential, and the
  strategy's never store list applies to test credentials exactly as much as
  live ones. It stays in the live conversation only, never copied into a
  summary, a file, or any persisted note, and if this agent were asked to
  write a session recap it would describe the sandbox call succeeding
  without repeating the key itself.

Reasoning: a credential's sensitivity does not depend on whether it happens
to be a test key; the rule is about the category of information, not a
judgement about how damaging this particular value would be if it leaked.
`;

const meta: IdeToolMeta = {
  slug: "agent-memory-strategy-tool",
  title: "Agent Memory Strategy Tool: Build a Memory Template in the Browser",
  name: "Agent Memory Strategy Builder",
  category: "agent-tools",
  summary:
    "Open a working memory strategy template and a worked conversation example in an in-browser editor, rewrite them for your own agent, and download the result as a .zip.",
  seo: {
    primaryKeyword: "agent memory strategy tool",
    keywords: [
      "agent memory strategy tool",
      "ai agent memory template",
      "memory strategy template for ai agents",
      "what an ai agent should remember",
      "agent memory management guide",
    ],
    seoTitle: "Agent Memory Strategy Tool: Build a Memory Template Free",
    seoDescription:
      "A free agent memory strategy tool that opens a working memory template and a worked example in the browser, ready to rewrite and download as a .zip.",
  },
  files: [
    { path: "MEMORY_STRATEGY.md", content: MEMORY_STRATEGY_TEMPLATE, kind: "markdown" },
    { path: "reference/memory-worked-example.md", content: MEMORY_WORKED_EXAMPLE_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the same operating document contract this site's agent tools category publishes under.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Agents asked to manage their own memory without a written strategy tend toward one of two failure modes: carrying every prior turn forward verbatim until the context is dominated by resolved tangents, or summarising so aggressively that a stated constraint from several turns back quietly disappears. A fixed template with separate sections for within session retention, cross session persistence, summarisation triggers and an explicit never store list keeps that boundary drawn on paper rather than decided fresh, differently, on every run.",
  },
  article: {
    intro: [
      "This agent memory strategy tool opens a working memory template directly in your browser: a main MEMORY_STRATEGY.md file covering what an agent should keep in full within a session, what should persist across separate sessions, when older context should be summarised rather than carried forward verbatim, and what must never be stored. A second file works through one short worked conversation, showing what gets kept, summarised and dropped, with the reasoning stated for each call.",
      "Memory is the part of an agent's design most likely to be left as an unwritten assumption, which is exactly why it causes the most trouble. Without a written policy, one run of an agent might quote a stated constraint word for word ten turns later, and another run of the same agent might summarise it away, because nothing on paper decided what an ai agent should remember. This ai agent memory template makes that decision once, explicitly, and doubles as a plain agent memory management guide for anyone drafting one from scratch.",
      "Everything here runs in the tab. Editing the starter files, adding a new one, importing a .zip you already have, and downloading the result as a fresh .zip all happen client side, with nothing about your agent's actual memory design ever uploaded anywhere in between.",
    ],
    sections: [
      {
        heading: "Why memory needs its own document, not a line in the system prompt",
        body: [
          "A bullet point telling an agent to remember important things is not a policy, because it does not say what counts as important or when something that mattered five turns ago stops mattering. This memory strategy template for ai agents treats memory as its own operating document, because the failure modes are costly: an agent that forgets a stated constraint mid session behaves inconsistently, and one with no rule against storing a credential turns a mistake into a security incident.",
        ],
      },
      {
        heading: "Within session retention versus what should persist across sessions",
        body: [
          "These are two different questions with two different defaults. Within a session, an agent should retain a small set of things: the user's actual goal, any constraint stated explicitly, and any decision already made that a later turn should not reverse. Across sessions, the honest default is nothing at all; persistence is the exception, argued for and named precisely, not a default a strategy falls into by never addressing it.",
        ],
        list: [
          "Within session: keep explicit constraints, confirmed decisions and identifiers already validated by the user.",
          "Across sessions: persist only what the strategy names by category and mechanism, never left implicit.",
          "If cross session persistence is not needed, state that plainly rather than leaving the section blank.",
        ],
      },
      {
        heading: "Choosing when to summarise instead of carrying context forward",
        body: [
          "The trigger for summarising should be tied to a turn's outcome, not to context length alone, though length is a reasonable backstop. Once a decision has been acted on and confirmed working, the turns that produced it can collapse into one sentence stating the decision and the reason for it. A failed first attempt, once fixed, does not need to be replayed on every later turn; what matters going forward is the requirement it revealed, not the trial and error that found it.",
        ],
      },
      {
        heading: "The never store list is not optional and not a judgement call",
        body: [
          "The never store section of this agent memory strategy tool's template is an absolute list, not guidance weighed case by case, because the cost of getting it wrong is asymmetric. A credential, a piece of information the user marked sensitive, or a fact about a third party who has not consented to being discussed should never reach persistent memory, however useful it seems later. An unverified guess belongs here too: written into memory as though confirmed, it gets trusted without being checked again.",
        ],
      },
      {
        heading: "Reading the worked example before writing your own",
        body: [
          "The second file walks one short conversation turn by turn: a stated constraint that gets kept, a failed attempt that gets summarised once fixed, a tangent the user withdrew that gets dropped, and a sandbox credential that never gets written to memory even though the user called it a test key. Reading the reasoning behind each call turns the rules in MEMORY_STRATEGY.md into a decision you can apply to your own agent's conversations.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import a .zip, reset to the starter template, or download the current file set. Importing reads a .zip picked from your own device client side, and the archive rebuilt for download never leaves the tab, which is what keeps this agent memory strategy tool free rather than a signup gated service.",
        ],
      },
    ],
    howTo: {
      name: "How to build an agent memory strategy with this tool",
      steps: [
        { name: "Read the starter files", text: "Open MEMORY_STRATEGY.md and reference/memory-worked-example.md to see the section structure and worked conversation before changing anything." },
        { name: "Name the agent and its within session retention", text: "Replace the heading and the within session section with the things your agent must keep in full for the rest of a conversation." },
        { name: "Decide what, if anything, persists across sessions", text: "State plainly whether this agent carries anything forward between sessions, and if so, exactly what and by what mechanism." },
        { name: "Set the summarisation trigger and the never store list", text: "Write the trigger for collapsing older turns into a summary, and confirm the never store list matches every category of sensitive information the agent could meet." },
        { name: "Replace the worked example with a real conversation", text: "Rewrite reference/memory-worked-example.md using an exchange your own agent would plausibly have, keeping the kept, summarised and dropped structure." },
        { name: "Download the finished strategy", text: "Click Download .zip to save the file set as shown in the editor, ready to hand to the agent it governs." },
      ],
    },
    faq: [
      {
        question: "What is an agent memory strategy tool actually for?",
        answer:
          "It gives you a working starting structure for one document: the rules that decide what an agent keeps within a conversation, what it carries between sessions, when it should summarise older context, and what it must never write to memory, such as a credential or anything a user marked sensitive.",
      },
      {
        question: "Should most agents persist memory across sessions?",
        answer:
          "No. The template's default is that cross session persistence is the exception, named explicitly when used rather than left as an assumption. Most agents are better served by a clean session boundary than by carrying forward information the next session's user may not expect it to know.",
      },
      {
        question: "How is this different from a general system prompt template?",
        answer:
          "A system prompt describes how an agent should behave in general. This template addresses one narrower question: what information from an earlier turn the agent may carry forward, in what form, and what it is never allowed to store.",
      },
      {
        question: "Is anything I type into this tool saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing is stored once you close or reload the page, so downloading the .zip keeps your work.",
      },
      {
        question: "What belongs on the never store list besides passwords and API keys?",
        answer:
          "Anything the user has explicitly marked sensitive in their own words, personal information about a third party who has not consented to being discussed, and any unverified claim the agent is not confident is accurate, since an unchecked guess gets trusted by a later turn as though it were fact.",
      },
      {
        question: "Can I add more starter files beyond the two provided?",
        answer:
          "Yes. The Add file control in the editor's sidebar lets you create any additional file at any path, for example a persistence log or a changelog of memory decisions. There is no limit on file count beyond what is practical to maintain by hand.",
      },
      {
        question: "Does this tool check whether my finished strategy is actually safe?",
        answer:
          "No. This tool provides only the starting structure and the editor to fill it in; it does not audit the content or verify the never store list covers every credential your agent might meet. Reviewing the finished document against a real conversation catches a gap the template alone cannot.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-tools",
        label: "See more agent building tools",
        description: "Every builder tool in this category, for system prompts, tool use policy, memory and evaluation starters.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Build a new AI skill's files",
        description: "A related builder tool for starting a skill's own required input, method and output format sections.",
      },
      {
        href: "/skills",
        label: "Browse the skills directory",
        description: "Published skills on this site, several of which define required input and output rules a memory strategy also has to respect.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "Get help writing clear instructions",
        description: "A prompt for turning a rough explanation into clear, structured technical writing, useful for the review checklist section.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic's prompt engineering guide",
        description: "Authoritative guidance on writing instructions a model can follow precisely, directly applicable to a memory strategy's summarisation rules.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI's prompt engineering guide",
        description: "A second major model provider's own guidance on specific, checkable instruction writing for an agent's operating documents.",
      },
      {
        href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        label: "OWASP Top 10 for LLM applications",
        description: "An independent security reference covering sensitive information disclosure, directly relevant to the never store section of a memory strategy.",
      },
      {
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
        label: "NIST AI Risk Management Framework",
        description: "A government reference framework for managing the risks of AI systems, including data handling and information governance concerns a memory strategy has to account for.",
      },
    ],
  },
  tags: ["agent memory", "memory strategy", "in browser editor", "agent tools"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
