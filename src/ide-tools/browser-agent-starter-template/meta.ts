import type { IdeToolMeta } from "@/lib/ide-tool-types";

const AGENT_PY_TEMPLATE = `"""
Browser agent starter template.

A minimal, working skeleton for a browser driving agent: a loop that
observes the current page, asks a decision function to choose the next
action, performs that action against a browser, and repeats until the
task is marked complete or a step limit is reached. Every placeholder
below is marked clearly so the real logic can be filled in without
guessing at the loop structure around it.

Plug in your own browser automation library inside observe and inside
the functions in the ACTIONS registry below. See actions.md for the
full action vocabulary and README.md for setup notes on what to plug
in first.
"""

from dataclasses import dataclass, field
from typing import Any, Callable


MAX_STEPS = 25  # loop limit: stop even if the task never reports done


@dataclass
class AgentState:
    """Everything the loop carries between steps."""

    task: str
    step: int = 0
    done: bool = False
    history: list = field(default_factory=list)


def observe(state: AgentState) -> dict:
    """
    Read the current state of the page.

    Placeholder: replace this with a real screenshot capture, a DOM
    snapshot, or both, using whichever browser automation library you
    already use. Return a plain dictionary the decide function can
    read, and keep it small enough to fit inside a single model call.
    """
    return {
        "url": "about:blank",
        "screenshot": None,  # bytes or a file path once wired up
        "dom_summary": "",  # a trimmed text or accessibility tree summary
    }


def decide(state: AgentState, observation: dict) -> dict:
    """
    Choose exactly one next action from the ACTIONS registry.

    Placeholder: replace this with a real model call that receives the
    task, the observation and the recent history, and returns a single
    action name plus its parameters. Keep the return shape stable so
    act below never has to guess at what came back.
    """
    return {"action": "wait", "params": {"seconds": 1}}


def click(state: AgentState, params: dict) -> dict:
    """Placeholder: click the element described by params['selector']."""
    selector = params.get("selector")
    return {"ok": True, "detail": f"clicked {selector}"}


def type_text(state: AgentState, params: dict) -> dict:
    """Placeholder: type params['text'] into params['selector']."""
    selector = params.get("selector")
    text = params.get("text")
    return {"ok": True, "detail": f"typed into {selector}: {text}"}


def navigate(state: AgentState, params: dict) -> dict:
    """Placeholder: load params['url'] in the browser."""
    url = params.get("url")
    return {"ok": True, "detail": f"navigated to {url}"}


def scroll(state: AgentState, params: dict) -> dict:
    """Placeholder: scroll by params['direction'] and params['amount']."""
    direction = params.get("direction", "down")
    return {"ok": True, "detail": f"scrolled {direction}"}


def screenshot(state: AgentState, params: dict) -> dict:
    """Placeholder: capture the current page and store it for observe."""
    return {"ok": True, "detail": "captured screenshot"}


def wait(state: AgentState, params: dict) -> dict:
    """Placeholder: pause for params['seconds'] before the next step."""
    seconds = params.get("seconds", 1)
    return {"ok": True, "detail": f"waited {seconds} seconds"}


# The named action vocabulary the decide function is allowed to choose
# from. See actions.md for the parameters each one takes. Keeping this
# a small, fixed registry, rather than letting decide invent new action
# names on the fly, is what keeps act predictable.
ACTIONS: dict = {
    "click": click,
    "type": type_text,
    "navigate": navigate,
    "scroll": scroll,
    "screenshot": screenshot,
    "wait": wait,
}


def act(state: AgentState, decision: dict) -> dict:
    """
    Dispatch a decision to the matching function in ACTIONS.

    Raises a clear error for an unknown action name instead of silently
    doing nothing, so a bad decision fails loudly during development
    rather than stalling the loop against a live page.
    """
    name = decision.get("action")
    handler = ACTIONS.get(name)
    if handler is None:
        raise ValueError(f"unknown action: {name}")
    return handler(state, decision.get("params", {}))


def run(task: str) -> AgentState:
    """
    The observe, decide, act loop.

    Stops when the task is marked done or when MAX_STEPS is reached,
    whichever comes first. The step limit exists so a stuck agent, one
    that keeps deciding the same unproductive action, cannot run
    forever against a real browser.
    """
    state = AgentState(task=task)
    while not state.done and state.step < MAX_STEPS:
        observation = observe(state)
        decision = decide(state, observation)
        result = act(state, decision)
        state.history.append(
            {"observation": observation, "decision": decision, "result": result}
        )
        state.step += 1
        # Placeholder stop condition: replace with a real check, for
        # example the decide function returning action "done" once the
        # task's actual success condition is met.
        if decision.get("action") == "done":
            state.done = True
    return state


if __name__ == "__main__":
    final_state = run(task="Replace this with the task the agent should complete.")
    print(f"stopped after {final_state.step} steps, done={final_state.done}")
`;

const ACTIONS_MD_TEMPLATE = `# Action vocabulary

The browser agent starter template's loop dispatches every decision to
one of six named actions. This file documents the parameters each one
takes and what a working implementation is expected to do, so the
placeholder functions in agent.py can be filled in against a fixed
contract instead of a new action name appearing at runtime with no
matching handler.

## click

Clicks a single element on the current page.

- selector (required): a string identifying the element. Use whatever
  selector format your browser automation library expects, for example
  a CSS selector, an accessibility role and name, or an element id
  captured during observe.

A working implementation resolves the selector to a single element,
waits for it to be visible and enabled, and performs a real pointer
click. Log the resolved element in the result so a failed click is easy
to debug from the history the loop keeps between steps.

## type

Types text into a focused input, textarea or content editable element.

- selector (required): identifies the target field, same format as
  click above.
- text (required): the string to type into that field.
- clear (optional, boolean): whether to clear the field first. Default
  to true so repeated runs do not append onto text left over from an
  earlier attempt.

## navigate

Loads a URL in the browser, replacing the current page entirely.

- url (required): an absolute URL. A relative path is a decide function
  bug, not something act should try to resolve on its own.

A working implementation should wait for the page to reach a stable,
loaded state before returning, since the very next step's observe call
depends on the page actually being ready to read.

## scroll

Scrolls the current page or a specific scrollable element within it.

- direction (required): one of up, down, left, right.
- amount (optional): pixels or a number of viewport heights, whichever
  your automation library's scroll call expects. Default to a sensible
  single step, roughly one viewport, when the parameter is left unset.
- selector (optional): scrolls a specific element instead of the whole
  page when set.

## screenshot

Captures the current page and stores the result somewhere observe can
read it back on the next loop iteration.

- full_page (optional, boolean): capture the entire scrollable page
  rather than just the current viewport. Default to false, since a full
  page capture is slower and is often unnecessary for a single decision.

The result of this action should be written back into shared state that
observe reads from, not just returned and discarded, otherwise the next
observation never actually reflects what was just captured.

## wait

Pauses before the next loop iteration, without touching the page at
all.

- seconds (required): how long to pause before the loop continues.

Use wait for a page that is still settling, for example immediately
after a navigation or a click that triggers an animation, rather than
guessing a fixed sleep call inside every other action's own body.

## Adding a new action

Keep the vocabulary small and named. Add a new entry to the ACTIONS
registry in agent.py with the same signature as the six documented
above, a selector or url style parameter set documented here, and a
result dictionary with at least an ok key, so the loop's history stays
consistent no matter which action actually ran during a given step.
`;

const README_MD_TEMPLATE = `# Browser agent starter template

A working, multi file starting point for a browser driving agent: a
loop that observes the current page, decides on one action, performs
it, and repeats until the task is done or a step limit is reached. This
file covers setup and, specifically, what to plug in first before the
loop does anything against a real page.

## Files

- agent.py: the observe, decide, act loop, the AgentState it carries
  between steps, and the ACTIONS registry the loop dispatches to.
- actions.md: the parameters each action in the registry takes: click,
  type, navigate, scroll, screenshot and wait.
- README.md: this file.

## What to plug in first

Three placeholders in agent.py need real logic before this does
anything against an actual browser. Fill them in, in this order.

1. observe: replace the placeholder return value with a real
   screenshot capture and, if your model reads one, a DOM or
   accessibility tree summary, using whichever browser automation
   library you already use. This template does not assume a specific
   one on purpose, so it stays usable whether you drive the browser
   with a Python based automation library, a Node based one behind a
   thin bridge, or a hosted browser API.
2. decide: replace the placeholder with a real model call. Pass it the
   task, the latest observation and enough recent history to avoid
   repeating a failed action, and have it return one action name from
   the ACTIONS registry plus that action's parameters.
3. The six action functions: click, type_text, navigate, scroll,
   screenshot and wait each currently return a canned success result
   without touching a real page. Replace the body of each with the
   matching call from your browser automation library, keeping the
   same function signature so act keeps dispatching correctly.

## Why the library calls are left as placeholders

Wiring this template to one specific browser automation library's
exact API by name would date quickly and would not match the library
you already have installed. Every placeholder function is marked
clearly in agent.py and documented in actions.md, so plugging in your
own library's real calls is a matter of filling in a known function
body rather than restructuring the loop around it first.

## Running it

Once observe, decide and the action functions are wired up, run the
script directly from a terminal:

python agent.py

Edit the task string in the if __name__ == "__main__" block first,
since the placeholder task is only a stand in for a real one. Watch
MAX_STEPS near the top of agent.py: it is the loop's backstop stop
condition alongside the task being marked done, and a low value is
worth keeping while a new action implementation is still being
debugged against a real page.

## Extending the loop

Add a new action by writing a function with the same signature as the
six already in agent.py, and registering it in the ACTIONS dictionary.
Keep the stop condition explicit: the loop currently checks for an
action named done, so a real implementation should have decide return
that action once the task's actual success condition is met, rather
than relying on MAX_STEPS alone to end a successful run cleanly.
`;

const meta: IdeToolMeta = {
  slug: "browser-agent-starter-template",
  title: "Browser Agent Starter Template: A Working Observe, Decide, Act Loop",
  name: "Browser Agent Starter",
  category: "agent-starter-templates",
  summary:
    "Open a working observe, decide, act loop for a browser driving agent in an in-browser editor, with a documented six action vocabulary and setup notes, ready to download as a .zip.",
  seo: {
    primaryKeyword: "browser agent starter template",
    keywords: [
      "browser agent starter template",
      "browser automation agent template",
      "web browsing agent starter kit",
      "observe decide act loop template",
      "browser driven agent starter files",
    ],
    seoTitle: "Browser Agent Starter Template: Observe Decide Act Loop",
    seoDescription:
      "A free browser agent starter template with a working observe, decide, act loop, a six action registry and setup notes, ready to edit and download as a zip.",
  },
  files: [
    { path: "agent.py", content: AGENT_PY_TEMPLATE, kind: "code" },
    { path: "actions.md", content: ACTIONS_MD_TEMPLATE, kind: "markdown" },
    { path: "README.md", content: README_MD_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the observe, decide, act loop pattern this site's agent starter templates category documents.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A browser driving agent left to invent its own action names, or to skip a step limit entirely, tends to stall on a single failed click or run indefinitely against a page that never reaches the expected state. Fixing a small, named action vocabulary and a hard step limit in the starter code keeps a stuck loop from consuming a browser session indefinitely, regardless of which model is driving the decide function.",
  },
  article: {
    intro: [
      "This browser agent starter template opens a working, multi file starting point for a browser driving agent directly in your browser: a Python loop that observes the current page, decides on one action, performs it, and repeats, plus the documentation and setup notes that go with it. Every file is real starting content, ready to be renamed, rewritten and downloaded as a .zip once it fits the task at hand.",
      "A browser driven agent is one of five archetypes in this site's agent starter templates category, built around a single repeating cycle rather than a long open conversation. This browser agent starter template ships that loop already working end to end, with a fixed six action registry (click, type, navigate, scroll, screenshot and wait) and a step limit that stops a stuck agent from running forever against a real page.",
      "The three pieces that differ archetype to archetype, and library to library, are left as clearly marked placeholders rather than guessed at: reading the page inside observe, calling a model inside decide, and driving an actual browser inside each of the six actions. Wiring in one specific automation library's exact calls from memory would date fast, so the README instead explains what to plug in and in what order, leaving the loop structure itself already solved.",
    ],
    sections: [
      {
        heading: "What the observe, decide, act loop does",
        body: [
          "The loop in agent.py carries a small AgentState between steps: the task description, a step counter, a done flag and a running history of what happened on each iteration. Every pass calls observe to read the page, decide to choose exactly one action and its parameters, and act to run that action through the six function registry, appending the full result to history before checking whether the task is finished or the step limit has been reached. Keeping the three phases as separate functions is what makes this an observe decide act loop template worth starting from instead of a single script written from a blank page.",
        ],
      },
      {
        heading: "The six actions this template dispatches to",
        body: [
          "Rather than let decide invent a new action name whenever it feels like it, this browser automation agent template fixes a small vocabulary up front: click, type, navigate, scroll, screenshot and wait, each documented in actions.md with the exact parameters it takes. act looks the chosen name up in a single ACTIONS dictionary and raises a clear error for anything unrecognised, so a bad decision fails loudly instead of silently doing nothing. Anyone searching for a web browsing agent starter kit usually wants the loop and the action vocabulary already solved, with only the browser calls and the model call left to fill in, which is exactly what ships here.",
        ],
      },
      {
        heading: "Why the browser library is left as a placeholder",
        body: [
          "Every one of the six action functions currently returns a canned success result without touching a real page, and observe returns an empty screenshot and DOM summary. That is deliberate: naming one specific automation library's exact function calls in the starter code would tie the template to a library version that changes, and would be wrong for anyone already standardised on a different one. The README names the order to fill placeholders in: observe first, since decide has nothing real to reason about without it, then decide itself, then the six action bodies last.",
        ],
      },
      {
        heading: "A step limit as a backstop, not the real stop condition",
        body: [
          "MAX_STEPS exists so a loop stuck deciding the same unproductive action cannot run forever against a real browser session, but it is a backstop, not the intended way most runs should end. The loop's real stop condition is decide returning an action named done, which a finished implementation should return once the task's own success condition is actually met. Once the placeholders are filled in, treat the browser driven agent starter files as a working reference for the shape a new browser automation project should keep, even after the specific library calls behind each action change.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import an existing .zip, reset back to the starter files, or download the current set. Importing reads a .zip picked from your own device entirely client side, so an existing browser agent project can be brought in and edited here without anything about its contents being sent anywhere first.",
        ],
      },
      {
        heading: "When this archetype fits, and when it does not",
        body: [
          "This archetype fits a task defined by what is visible on a page right now: filling in a form, checking whether a specific element appeared, working through a multi page flow one screen at a time. It fits poorly when the real work is a long text exchange with no page to observe, or a fixed sequence of steps known in advance with nothing to decide between, both of which this site's other agent starter archetypes cover instead.",
        ],
      },
    ],
    howTo: {
      name: "How to start a browser agent with this starter template",
      steps: [
        { name: "Read the starter files", text: "Open agent.py, actions.md and README.md to see the loop, the action vocabulary and the setup order before changing anything." },
        { name: "Wire up observe", text: "Replace the placeholder return value in observe with a real screenshot or DOM read from your own automation library." },
        { name: "Wire up decide", text: "Replace the placeholder decide function with a real model call returning one action name and its parameters." },
        { name: "Fill in the six actions", text: "Replace the canned result in click, type_text, navigate, scroll, screenshot and wait with real library calls, one at a time." },
        { name: "Set a real stop condition", text: "Have decide return the done action once the task's condition is actually met, keeping MAX_STEPS as a backstop only." },
        { name: "Download the finished template", text: "Click Download .zip to save the file set exactly as shown, ready to run wherever the agent needs to live." },
      ],
    },
    faq: [
      {
        question: "What does this browser agent starter template include?",
        answer:
          "Three files: agent.py, a working Python loop with an AgentState, an observe function, a decide function and a six action registry; actions.md, documenting the parameters each action takes; and README.md, explaining what to plug in first. All three open directly in the in browser editor.",
      },
      {
        question: "Does this template wire up a specific browser automation library?",
        answer:
          "No. Every action function and observe return a canned placeholder result rather than calling a named library, since fixing one library's exact calls in the starter code would date quickly and would not match whatever you already have installed. The README explains what to plug in and leaves the choice of library to you.",
      },
      {
        question: "Why is there a step limit if the loop already checks for a done action?",
        answer:
          "The done action is the intended way a successful run ends, once decide reports the task's real success condition has been met. MAX_STEPS exists as a backstop for the case that never happens correctly, a loop stuck repeating the same action against a page that never reaches the expected state.",
      },
      {
        question: "Can I add an action beyond the six already in the registry?",
        answer:
          "Yes. Write a new function with the same signature as the six documented in actions.md, add it to the ACTIONS dictionary in agent.py, and document its parameters the same way, so the file stays a complete reference for whatever the loop can dispatch to.",
      },
      {
        question: "Is anything typed into the editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds changes only in the browser tab's own memory for the length of the visit. Nothing is sent to a server while editing, and nothing persists once the page closes, so downloading the .zip before leaving is the only way to keep the edited files.",
      },
      {
        question: "How is this different from the other agent starter template archetypes on this site?",
        answer:
          "The other archetypes cover a command line agent, a workflow automation agent, a customer support agent and a research agent, each built around a different loop shape. This one is specifically the observe, decide, act cycle a browser driving agent needs, with a page to read and a fixed action vocabulary to dispatch to.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-starter-templates",
        label: "Browse every agent starter template",
        description: "See the other agent archetypes in this category, including the command line, workflow automation, customer support and research starters.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "Get help debugging the decide function",
        description: "A prompt for working through unexpected behaviour methodically, useful once the decide function starts returning an action that does not match what the page actually shows.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "Get help writing tests for each action",
        description: "A prompt for drafting unit tests, useful for checking each of the six action implementations once real browser calls replace the placeholders.",
      },
      {
        href: "/skills/coding-skills/test-coverage-gap-skill",
        label: "Check test coverage before shipping the loop",
        description: "A skill for finding untested code paths, worth running once the action functions and the stop condition are both filled in for real.",
      },
    ],
    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
        label: "MDN's accessibility tree documentation",
        description: "Background on the accessibility tree a real observe implementation can read from, as an alternative or a companion to a raw screenshot.",
      },
      {
        href: "https://www.w3.org/TR/wai-aria-1.2/",
        label: "The W3C WAI-ARIA specification",
        description: "The underlying standard behind the accessibility tree, useful when deciding exactly what a DOM summary inside observe should actually include.",
      },
      {
        href: "https://playwright.dev/docs/intro",
        label: "Playwright's getting started documentation",
        description: "One widely used browser automation library this template's placeholders can be wired up to, documented directly by its maintainers.",
      },
      {
        href: "https://www.selenium.dev/documentation/",
        label: "Selenium's official documentation",
        description: "A second, long established browser automation library option, useful for comparing against whichever one a given project already standardises on.",
      },
    ],
  },
  tags: ["browser agent", "starter template", "observe decide act", "browser automation", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
