import type { IdeToolMeta } from "@/lib/ide-tool-types";

const AGENT_PY_TEMPLATE = `#!/usr/bin/env python3
"""
CLI agent starter template.

A minimal, dependency free command line agent: it reads a task from an
argument or from an interactive loop, runs a bounded turn loop that is
meant to call a model and, where needed, a tool, then prints a final
result and exits with a real exit code. Treat this as the skeleton for a
real agent, not as a finished agent on its own; the two placeholder
functions below are exactly where the actual model call and any tool
calls belong.

Run a single task:
    python agent.py "summarise this file: notes.txt"

Run the interactive loop instead:
    python agent.py --interactive
"""

from __future__ import annotations

import argparse
import json
import logging
import sys
import time
from pathlib import Path
from typing import Any


DEFAULT_CONFIG_PATH = Path(__file__).resolve().parent / "config.json"


def load_config(config_path: Path) -> dict[str, Any]:
    """Load the starter config file and fall back to safe defaults.

    A missing or invalid config file should never crash the agent before
    it has even started, so this only logs a warning and continues with
    sane built in defaults instead of raising.
    """
    defaults: dict[str, Any] = {
        "model": "claude-opus-4-5",
        "max_turns": 6,
        "timeout_seconds": 30,
        "log_level": "INFO",
    }
    if not config_path.exists():
        logging.warning("no config file at %s, using defaults", config_path)
        return defaults
    try:
        with config_path.open("r", encoding="utf-8") as handle:
            loaded = json.load(handle)
    except (json.JSONDecodeError, OSError) as error:
        logging.warning("could not read %s (%s), using defaults", config_path, error)
        return defaults
    defaults.update(loaded)
    return defaults


def call_model(prompt: str, config: dict[str, Any]) -> str:
    """Placeholder for the actual model call.

    Replace this function's body with a real call to whichever provider's
    SDK the finished agent uses, passing config["model"] and a real
    timeout built from config["timeout_seconds"]. It must return the
    model's reply as plain text so the calling loop can decide whether
    the task is finished, or another turn or a tool call is needed.
    """
    # TODO: replace with a real model call, for example:
    #   response = client.messages.create(
    #       model=config["model"],
    #       max_tokens=1024,
    #       messages=[{"role": "user", "content": prompt}],
    #   )
    #   return response.content[0].text
    raise NotImplementedError("call_model is a placeholder, wire up a real model call here")


def call_tool(name: str, arguments: dict[str, Any]) -> str:
    """Placeholder dispatcher for tool calls the model asks for.

    A finished agent typically keeps a small registry mapping a tool name
    to a real function; this stub exists so the main loop below has
    somewhere concrete to route a tool call once the model call above is
    wired up to actually request one.
    """
    # TODO: replace with a real tool registry, for example:
    #   if name == "read_file":
    #       return Path(arguments["path"]).read_text(encoding="utf-8")
    raise NotImplementedError(f"call_tool has no handler for tool '{name}' yet")


def run_task(task: str, config: dict[str, Any]) -> str:
    """Run one task through a bounded turn loop and return the final result.

    The loop stops on whichever comes first: the model call above
    signalling it has a final answer, or the configured max_turns being
    reached, which keeps a bug in the placeholder logic from spinning
    forever once a real model call is wired in.
    """
    max_turns = int(config.get("max_turns", 6))
    transcript = [f"task: {task}"]
    for turn in range(1, max_turns + 1):
        logging.info("turn %d of %d", turn, max_turns)
        try:
            reply = call_model("\\n".join(transcript), config)
        except NotImplementedError:
            # The placeholder above has not been replaced yet. Returning a
            # clear message here, rather than letting the exception crash
            # the process, keeps this starter runnable end to end before
            # any customisation happens.
            return (
                "agent.py ran successfully but call_model is still a "
                "placeholder. Replace call_model with a real model call "
                "to get an actual result."
            )
        transcript.append(reply)
        return reply
    return "reached max_turns without a final answer"


def run_interactive(config: dict[str, Any]) -> None:
    """Run the read, act, print loop until the user exits.

    Typing 'exit' or 'quit', or sending an end of file with Ctrl+D, ends
    the loop cleanly. Each line typed is treated as a new task rather
    than a continuation of the previous one; extend this if the finished
    agent needs to keep conversation state between turns.
    """
    print("CLI agent starter template. Type a task, or 'exit' to quit.")
    while True:
        try:
            line = input("> ").strip()
        except EOFError:
            print()
            break
        if not line:
            continue
        if line.lower() in {"exit", "quit"}:
            break
        result = run_task(line, config)
        print(result)


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="agent.py",
        description="CLI agent starter template: run one task or an interactive loop.",
    )
    parser.add_argument(
        "task",
        nargs="?",
        default=None,
        help="the task or prompt to run once, wrapped in quotes",
    )
    parser.add_argument(
        "--interactive",
        action="store_true",
        help="run a read, act, print loop instead of a single task",
    )
    parser.add_argument(
        "--config",
        type=Path,
        default=DEFAULT_CONFIG_PATH,
        help="path to a config.json file, defaults to the one beside this script",
    )
    parser.add_argument(
        "--max-turns",
        type=int,
        default=None,
        help="override the max_turns value from config.json for this run",
    )
    parser.add_argument(
        "--log-level",
        default=None,
        help="override the log_level value from config.json for this run",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    config = load_config(args.config)
    if args.max_turns is not None:
        config["max_turns"] = args.max_turns
    if args.log_level is not None:
        config["log_level"] = args.log_level

    logging.basicConfig(
        level=getattr(logging, str(config.get("log_level", "INFO")).upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(message)s",
    )

    if args.interactive:
        run_interactive(config)
        return 0

    if not args.task:
        parser.error("provide a task, or pass --interactive to run the loop instead")

    started = time.monotonic()
    try:
        result = run_task(args.task, config)
    except KeyboardInterrupt:
        logging.warning("interrupted by user")
        return 130
    except Exception as error:  # noqa: BLE001, a starter template surfaces any failure plainly
        logging.error("agent run failed: %s", error)
        return 1

    elapsed = time.monotonic() - started
    logging.info("finished in %.2fs", elapsed)
    print(result)
    return 0


if __name__ == "__main__":
    sys.exit(main())
`;

const CONFIG_JSON_TEMPLATE = `{
  "model": "claude-opus-4-5",
  "max_turns": 6,
  "timeout_seconds": 30,
  "log_level": "INFO",
  "interactive_prompt": "> ",
  "system_prompt": "You are a command line agent. Read the task carefully, use a tool only when the task actually requires one, and always finish with a plain text final answer instead of leaving the loop unresolved.",
  "tools_enabled": false,
  "_notes": {
    "model": "the model identifier passed to call_model in agent.py, change this to match whichever provider you wire up",
    "max_turns": "the maximum number of turns run_task will attempt before giving up and returning whatever it has so far",
    "timeout_seconds": "intended for the real model call you add inside call_model, this starter config does not enforce it by itself",
    "log_level": "one of DEBUG, INFO, WARNING or ERROR, passed straight through to Python's logging module"
  }
}
`;

const README_TEMPLATE = `# CLI agent starter template

A small, working starting point for a command line agent: a task goes in
as an argument or through an interactive loop, the agent runs a bounded
turn loop, and a plain text result comes back before the process exits
with a real exit code. Nothing here depends on a specific agent
framework; the model call and any tool calls are placeholders you fill in
with whichever provider's SDK the finished agent actually uses.

## Files in this starter

- \`agent.py\`, the entry point: argument parsing, config loading, the
  turn loop and the interactive loop.
- \`config.json\`, the starter configuration: model name, max turns, a
  timeout and the log level.
- \`README.md\`, this file.

## Install

This template only needs the Python standard library to run as is, so
there is nothing to install before trying it out:

\`\`\`bash
python3 --version   # 3.10 or later is recommended
python3 agent.py "say hello"
\`\`\`

Once a real model call is wired into \`call_model\`, add whichever
provider's SDK the finished agent needs to a \`requirements.txt\` file and
install it into a virtual environment before running the agent again:

\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
\`\`\`

## Run it

Run a single task and exit:

\`\`\`bash
python3 agent.py "summarise the attached notes"
\`\`\`

Run the interactive loop instead, which keeps reading a new task from the
terminal until \`exit\`, \`quit\`, or an end of file signal from Ctrl+D:

\`\`\`bash
python3 agent.py --interactive
\`\`\`

Override a config value for a single run without editing \`config.json\`:

\`\`\`bash
python3 agent.py "a longer task" --max-turns 3 --log-level DEBUG
\`\`\`

## What to customise first

1. \`call_model\` in \`agent.py\`. Replace the \`NotImplementedError\` with
   a real call to whichever provider's SDK the finished agent uses,
   passing \`config["model"]\` and a timeout built from
   \`config["timeout_seconds"]\`.
2. \`call_tool\` in \`agent.py\`. Add a real registry mapping a tool name
   to a real function once the model call above can actually request one.
3. \`config.json\`. Set \`model\` to the real model identifier, and adjust
   \`max_turns\` and \`timeout_seconds\` to match how long a real task
   should be allowed to run.
4. \`run_task\`'s stopping condition. The starter loop returns after the
   first model reply; a real agent usually needs logic that decides
   whether that reply is a final answer or another turn is required.

## Exit codes

\`agent.py\` returns \`0\` on a normal finish, \`1\` when the run raised an
unexpected error, and \`130\` when interrupted with Ctrl+C, following the
usual convention for a command line process so it composes cleanly with
shell scripts and CI jobs that check the exit code.
`;

const meta: IdeToolMeta = {
  slug: "cli-agent-starter-template",
  title: "CLI Agent Starter Template: A Working Python Command Line Agent",
  name: "CLI Agent Starter",
  category: "agent-starter-templates",
  summary:
    "Open a working three file Python starter for a command line agent in an in-browser editor: argument parsing, a bounded turn loop, an interactive mode and a starter config, ready to customise and download as a .zip.",
  seo: {
    primaryKeyword: "cli agent starter template",
    keywords: [
      "cli agent starter template",
      "command line agent template",
      "python cli agent starter kit",
      "terminal agent starter files",
      "download cli agent template",
    ],
    seoTitle: "CLI Agent Starter Template: Free Python Starter Kit",
    seoDescription:
      "A free cli agent starter template: a working Python entry point, a bounded turn loop and a starter config, editable in the browser and downloadable as a .zip.",
  },
  files: [
    { path: "agent.py", content: AGENT_PY_TEMPLATE, kind: "code" },
    { path: "config.json", content: CONFIG_JSON_TEMPLATE, kind: "json" },
    { path: "README.md", content: README_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against Python's own standard library conventions for a command line entry point.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A model asked to sketch a command line agent from scratch tends to either hard code a single hand written prompt with no argument parsing at all, or wire a full framework dependency into a first draft that will not run without a paid API key already configured. Fixing the entry point, the config shape and the two placeholder functions ahead of time keeps a first run working immediately, with the actual model call left as the one deliberate gap to fill in.",
  },
  article: {
    intro: [
      "This cli agent starter template opens a working, three file Python starting point directly in your browser: an agent.py entry point with real argument parsing, a bounded turn loop and an interactive mode, a config.json with the fields a command line agent needs, and a README explaining how to run and extend it. Every file is fixed, real starting content, ready to be customised into whatever command line agent you are building.",
      "A command line agent, as distinct from a browser driven agent or a workflow automation agent, is invoked from a terminal, reads a task either as an argument or through an interactive loop, does its work, and exits with a code a calling script or CI job can check. Getting that shape right avoids two common mistakes: an agent with no clean way to run it non-interactively, and a model call so tangled into the argument parsing that swapping providers later means rewriting the entry point. Unlike a bare python cli agent starter kit that only prints a hello world message, this template hands you a real turn loop, a real config file and two clearly marked placeholder functions, closer to real terminal agent starter files than a toy example.",
      "Everything here runs in the tab, which is what makes this a genuinely free, no signup command line agent template rather than a service that gates files behind an account: editing the starter files, adding a new one, importing a .zip, and choosing to download cli agent template files as a fresh .zip all happen client side, with nothing uploaded anywhere in between.",
    ],
    sections: [
      {
        heading: "Why the turn loop is bounded from the start",
        body: [
          "An agent loop with no maximum number of turns is a real production risk: a placeholder that never returns a final answer, or a real model that keeps asking for another turn, turns a single task into a process that never exits. The run_task function in agent.py reads max_turns from config.json and stops once that count is reached, returning whatever it has rather than looping forever. That single guard rail is the difference between a starter that fails safely and one that hangs a terminal or a CI job.",
        ],
      },
      {
        heading: "Two placeholder functions, not a bare stub",
        body: [
          "call_model and call_tool both raise a NotImplementedError with a specific message rather than silently returning an empty string or doing nothing. A silent stub can pass a quick manual test and then fail confusingly once real traffic hits it, while a function that raises clearly tells whoever is customising the template exactly what still needs to be wired up, and where. The comments above each placeholder show the real shape of a working call, so filling them in is a substitution rather than a design exercise.",
        ],
        list: [
          "call_model is where the actual model provider's SDK call belongs.",
          "call_tool is where a real tool name to function mapping belongs.",
        ],
      },
      {
        heading: "Single task mode and the interactive loop",
        body: [
          "agent.py supports two ways to run: pass a task as a plain argument for a single run that prints a result and exits, the shape a shell script or CI step needs, or pass --interactive for a read, act, print loop that keeps accepting a new task until you type exit, quit, or send an end of file with Ctrl+D. Both paths share the same run_task function, so a fix to the turn loop or the model call applies to both modes at once.",
        ],
      },
      {
        heading: "Reading the starter config",
        body: [
          "config.json holds the four fields a command line agent needs before it can run at all: model, the identifier passed into call_model; max_turns, the bound on the turn loop; timeout_seconds, intended for the real model call once it exists; and log_level, passed through to Python's logging module. Each field also has a matching entry under _notes explaining what it does, so the file is legible on its own without tracing through the Python source first.",
        ],
      },
      {
        heading: "Exit codes, because a terminal agent runs inside other scripts",
        body: [
          "A command line agent is frequently called from something else: a shell script, a CI pipeline, a cron job. agent.py returns 0 on a normal finish, 1 when the run raised an unexpected error, and 130 on a Ctrl+C interrupt, matching the convention most command line tools already follow. That matters more here than for other archetypes on this site, since a browser driven or workflow automation agent rarely gets its success checked by reading a numeric exit code the way a shell script does.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list on the left, a plain text pane on the right, and a toolbar to add a file, import an existing .zip, reset to the starter template, or download the current file set. Importing reads a .zip picked from your own device client side; nothing about its contents is sent anywhere before the archive is rebuilt for download.",
        ],
      },
    ],
    howTo: {
      name: "How to customise this CLI agent starter template",
      steps: [
        { name: "Read agent.py end to end", text: "Open agent.py in the editor and read through build_arg_parser, run_task and main before changing anything, so the flow from argument to result is clear." },
        { name: "Wire up call_model", text: "Replace the NotImplementedError in call_model with a real call to your chosen provider's SDK, using config[\"model\"] and config[\"timeout_seconds\"]." },
        { name: "Wire up call_tool if the agent needs tools", text: "Add a real name to function registry inside call_tool once the model call above can actually request a tool by name." },
        { name: "Set the real config values", text: "Edit config.json: set model to the real identifier, and adjust max_turns, timeout_seconds and log_level to match the finished agent." },
        { name: "Test both run modes", text: "Run python agent.py \"a real task\" for a single run, then python agent.py --interactive to confirm the read, act, print loop exits cleanly on exit, quit or Ctrl+D." },
        { name: "Download the finished starter", text: "Click Download .zip to save agent.py, config.json and README.md exactly as shown in the editor." },
      ],
    },
    faq: [
      {
        question: "Does this cli agent starter template require a specific agent framework?",
        answer:
          "No. agent.py uses Python's own standard library, mainly argparse, json and logging, and imports no agent framework. The two placeholder functions, call_model and call_tool, are where a framework or a direct provider SDK call would be added if the finished agent needs one, so the starter stays usable regardless of which framework or provider ends up wired in.",
      },
      {
        question: "Can I run this cli agent starter template before wiring up a real model call?",
        answer:
          "Yes. Running agent.py with a task before editing call_model prints a clear message stating that call_model is still a placeholder, rather than crashing with an unhandled exception. The argument parsing, config loading and turn loop can all be tested end to end before any real model integration exists.",
      },
      {
        question: "What is the difference between single task mode and the interactive loop?",
        answer:
          "Single task mode takes a task as a command line argument, runs it once, prints the result and exits, the shape a shell script or a CI job needs to call the agent programmatically. The interactive loop, started with --interactive, instead keeps prompting for a new task in the terminal until you type exit, quit, or send an end of file with Ctrl+D, which suits a person driving the agent by hand.",
      },
      {
        question: "How do I change the maximum number of turns the agent runs?",
        answer:
          "Set max_turns in config.json to change the default, or pass --max-turns on the command line to override it for one run without editing the file. Both paths feed the same value into run_task, which stops the loop once that count is reached.",
      },
      {
        question: "Is anything I edit in the browser saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for your visit. Nothing is sent to a server as you type, and nothing is stored once you close or reload the page, so downloading the .zip before you leave is the only way to keep your edits.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-starter-templates",
        label: "Browse every agent starter template",
        description: "See the other agent archetype starters in this category, each with the files its specific archetype needs.",
      },
      {
        href: "/ide-tools/agent-tools",
        label: "Build the agent's operating files",
        description: "Starter files for a system prompt, a tool use policy and other documents this agent's model call will eventually run under.",
      },
      {
        href: "/ide-tools/mcp-server-tools",
        label: "Scaffold an MCP server for call_tool",
        description: "Starter files for a Model Context Protocol server, useful once call_tool needs to reach a real external tool.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "Get a second pass on the finished agent.py",
        description: "A prompt for reviewing Python code once call_model and call_tool are filled in, before the agent runs anywhere important.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.python.org/3/library/argparse.html",
        label: "Python's argparse documentation",
        description: "The standard library reference for the argument parsing agent.py's build_arg_parser function is built on.",
      },
      {
        href: "https://www.anthropic.com/engineering/building-effective-agents",
        label: "Anthropic's guide to building effective agents",
        description: "Engineering guidance on agent loop design directly relevant to extending run_task beyond a single model call.",
      },
      {
        href: "https://12factor.net/config",
        label: "The twelve factor app's config principle",
        description: "An independent, widely cited argument for keeping configuration like config.json separate from code, applicable to any command line process.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Exit_status",
        label: "Exit status conventions",
        description: "Background on the 0, 1 and 130 exit code convention agent.py follows so it composes correctly with shell scripts and CI.",
      },
    ],
  },
  tags: ["cli agent", "python starter", "command line agent", "agent starter template", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
