import type { IdeToolMeta } from "@/lib/ide-tool-types";

const WORKFLOW_PY_TEMPLATE = `"""Workflow automation agent starter template.

A workflow automation agent runs a fixed, ordered sequence of steps against a
trigger. Each step is logged on the way through, and a step that fails is
retried on its own up to a stated limit before the whole run halts. This is
the core runner: a Step shape, a small registry, and a WorkflowRunner that
executes steps in order, logs each outcome, and applies the retry policy.

Replace the placeholder steps near the bottom of this file with the real
work this agent should do. The runner, logging and retry logic around them
are meant to be used as written.
"""

from __future__ import annotations

import time
import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Callable

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("workflow_agent")


class StepFailed(Exception):
    """Raise this from inside a step to signal failure.

    A step signals failure by raising StepFailed with a short, specific
    reason. Any other exception is treated as an unexpected error and is
    also caught by the runner, but StepFailed is the deliberate, expected
    way for a step to say "this attempt did not work, try again or stop."
    """

    def __init__(self, reason: str, retryable: bool = True) -> None:
        super().__init__(reason)
        self.reason = reason
        self.retryable = retryable


@dataclass
class StepResult:
    """What a step returns on success. Keep this small and serialisable,
    since it is what gets logged and what the next step receives as
    context if it needs the previous step's output."""

    name: str
    ok: bool
    output: Any = None
    started_at: str = ""
    finished_at: str = ""
    attempts: int = 1


@dataclass
class Step:
    """A single unit of work in the workflow.

    name: a short, stable identifier used in logs and in the run summary.
    run: a callable that takes the shared context dict and returns whatever
      output the next step should see, or raises StepFailed on failure.
    max_retries: how many additional attempts this step gets after its
      first attempt fails, before the whole run halts. Defaults to the
      workflow-level policy if not set here.
    """

    name: str
    run: Callable[[dict[str, Any]], Any]
    max_retries: int | None = None


@dataclass
class WorkflowRunner:
    """Executes a list of steps in order against a shared context dict.

    default_max_retries: how many retries a step gets if it does not set
      its own max_retries. A run halts entirely once a step exhausts its
      retries, it does not skip ahead to the next step.
    retry_backoff_seconds: fixed pause between retry attempts. Replace
      with an exponential backoff if the real steps call a rate limited
      external service.
    """

    steps: list[Step] = field(default_factory=list)
    default_max_retries: int = 2
    retry_backoff_seconds: float = 1.0

    def register(self, name: str, run: Callable[[dict[str, Any]], Any], max_retries: int | None = None) -> None:
        self.steps.append(Step(name=name, run=run, max_retries=max_retries))

    def run_all(self, trigger_payload: dict[str, Any]) -> list[StepResult]:
        """Runs every registered step in order. Returns the list of
        results for every step that completed before a halt, successful
        or not. The context dict is shared and mutated across steps, so a
        later step can read what an earlier step wrote to it."""

        context: dict[str, Any] = {"trigger": trigger_payload}
        results: list[StepResult] = []

        for step in self.steps:
            result = self._run_step_with_retry(step, context)
            results.append(result)
            if not result.ok:
                logger.error("workflow halted at step '%s' after %s attempts", step.name, result.attempts)
                break

        return results

    def _run_step_with_retry(self, step: Step, context: dict[str, Any]) -> StepResult:
        limit = step.max_retries if step.max_retries is not None else self.default_max_retries
        attempt = 0
        started_at = datetime.now(timezone.utc).isoformat()

        while True:
            attempt += 1
            try:
                logger.info("step '%s' attempt %s starting", step.name, attempt)
                output = step.run(context)
                context[step.name] = output
                finished_at = datetime.now(timezone.utc).isoformat()
                logger.info("step '%s' succeeded on attempt %s", step.name, attempt)
                return StepResult(
                    name=step.name, ok=True, output=output,
                    started_at=started_at, finished_at=finished_at, attempts=attempt,
                )
            except StepFailed as failure:
                logger.warning("step '%s' failed on attempt %s: %s", step.name, attempt, failure.reason)
                if not failure.retryable or attempt > limit:
                    finished_at = datetime.now(timezone.utc).isoformat()
                    return StepResult(
                        name=step.name, ok=False, output=failure.reason,
                        started_at=started_at, finished_at=finished_at, attempts=attempt,
                    )
                time.sleep(self.retry_backoff_seconds)
            except Exception as error:  # unexpected error, still logged and retried
                logger.warning("step '%s' raised an unexpected error on attempt %s: %s", step.name, attempt, error)
                if attempt > limit:
                    finished_at = datetime.now(timezone.utc).isoformat()
                    return StepResult(
                        name=step.name, ok=False, output=str(error),
                        started_at=started_at, finished_at=finished_at, attempts=attempt,
                    )
                time.sleep(self.retry_backoff_seconds)


# ---------------------------------------------------------------------------
# Placeholder steps. Replace the body of each function with the real work
# this workflow should do. Read steps.md for the full contract a step must
# follow: required inputs, what it returns, and how failure is signalled.
# ---------------------------------------------------------------------------

def step_validate_input(context: dict[str, Any]) -> dict[str, Any]:
    trigger = context["trigger"]
    # Replace with real validation of the trigger payload's shape.
    if "id" not in trigger:
        raise StepFailed("trigger payload is missing an id field", retryable=False)
    return {"validated_id": trigger["id"]}


def step_fetch_record(context: dict[str, Any]) -> dict[str, Any]:
    # Replace with a real lookup, for example a database read or an API
    # call keyed on context["step_validate_input"]["validated_id"].
    record_id = context["step_validate_input"]["validated_id"]
    return {"record_id": record_id, "status": "fetched"}


def step_apply_change(context: dict[str, Any]) -> dict[str, Any]:
    # Replace with the actual write or side effect this workflow exists
    # to perform. Raise StepFailed with retryable=True for a transient
    # problem such as a timeout, and retryable=False for a problem that
    # will not resolve itself on a second attempt.
    record = context["step_fetch_record"]
    return {"applied_to": record["record_id"], "result": "changed"}


def step_notify(context: dict[str, Any]) -> dict[str, Any]:
    # Replace with a real notification: an email, a webhook call, a
    # message to a queue. This is the step most workflows want a wide
    # retry window for, since a notification endpoint being briefly down
    # should not fail an otherwise successful run.
    change = context["step_apply_change"]
    return {"notified_about": change["applied_to"]}


def build_default_workflow() -> WorkflowRunner:
    runner = WorkflowRunner(default_max_retries=2, retry_backoff_seconds=1.0)
    runner.register("step_validate_input", step_validate_input, max_retries=0)
    runner.register("step_fetch_record", step_fetch_record)
    runner.register("step_apply_change", step_apply_change)
    runner.register("step_notify", step_notify, max_retries=4)
    return runner


if __name__ == "__main__":
    # Replace this trigger payload with whatever the real trigger sends,
    # see README.md for how to wire an actual trigger source in.
    example_trigger = {"id": "example-123"}
    workflow = build_default_workflow()
    run_results = workflow.run_all(example_trigger)
    for step_result in run_results:
        print(step_result)
`;

const STEPS_MD_TEMPLATE = `# Defining a new step

A step is a single unit of work the runner in workflow.py executes in
order, logs, and retries on its own if it fails. This file documents the
contract every step must follow so a new one behaves the same way the
starter steps do.

## Required inputs

A step is a plain function that takes one argument: the shared context
dict the runner builds up as the workflow progresses.

- The trigger payload that started the run is always available at
  \`context["trigger"]\`.
- The output of every step that already ran successfully is available at
  \`context["<step name>"]\`, keyed by the name that step was registered
  under. A step should only read the specific earlier outputs it actually
  depends on, not assume every prior step ran.
- Any configuration a step needs beyond the context, for example an API
  key or an endpoint URL, should be read from environment variables at
  the top of the function rather than hard coded, so the same workflow
  file works across environments without editing.

## What a step returns

A step returns whatever value the next step should be able to read from
the context under its own name. Keep the return value a small,
serialisable structure, typically a dict of a few fields, rather than a
large object or an open file handle. The runner stores this return value
directly and does nothing else with it, so what a step returns is exactly
what later steps and the final run log will see.

A step that has no useful output to hand forward, for example a
notification step, can still return a small dict describing what it did.
An empty return is allowed but gives the run log less to show.

## How failure is signalled

A step signals failure by raising \`StepFailed\` with a short, specific
reason string, for example \`StepFailed("upstream API returned a 503")\`.
The runner catches this, logs the attempt, and either retries the step or
halts the whole run, depending on the step's retry limit and how many
attempts have already happened.

\`StepFailed\` takes a second argument, \`retryable\`, which defaults to
true. Set it to false for a failure a retry cannot fix, such as a
malformed trigger payload, so the runner halts immediately instead of
burning through retry attempts on a problem that will not change. Set or
leave it true for a transient failure, such as a timeout or a rate limit
response, where trying again after a short pause is likely to succeed.

Any other exception a step raises is still caught and logged by the
runner, and is retried the same way an unretryable StepFailed is not, but
raising StepFailed on purpose with a clear reason produces a much more
useful run log than letting an unrelated exception bubble up.

## Registering the step

Once a step function exists, register it with the runner in workflow.py:

\`\`\`python
runner.register("step_name", step_function, max_retries=3)
\`\`\`

The \`max_retries\` argument is optional. Leave it unset to use the
workflow's \`default_max_retries\`, or set a step specific limit for a
step that is either safe to retry many times, like a notification, or
should not be retried at all, like input validation.

## Checklist for a new step

- Name the step clearly and use that exact name when registering it.
- Read only the context keys the step actually needs.
- Return a small, serialisable dict the next step or the run log can use.
- Raise StepFailed with a specific reason on failure, and set retryable
  to false for a failure that will not resolve on a second attempt.
- Avoid side effects that cannot safely run twice where possible, since a
  retried step runs its full body again from the start.
`;

const README_MD_TEMPLATE = `# Workflow automation agent starter template

This is a starter kit for a workflow automation agent: an agent that runs a
fixed, ordered sequence of steps against a trigger, logs each step's
outcome, and retries a failed step on its own up to a stated limit before
halting the whole run rather than continuing on inconsistent state.

## Files

- \`workflow.py\` holds the runner: a Step shape, a StepRunner that executes
  steps in order with logging and retries, and four placeholder steps
  showing the pattern.
- \`steps.md\` documents the contract a step must follow: required inputs,
  what it returns, and how it signals failure.
- \`README.md\` is this file.

## Setup

This template has no dependencies outside the Python standard library, so
it runs anywhere Python 3.10 or later is available. Copy the three files
into a new project directory, then edit the placeholder step functions
near the bottom of workflow.py to do the actual work this workflow needs.

\`\`\`bash
python3 workflow.py
\`\`\`

Running the file directly executes \`build_default_workflow()\` against an
example trigger payload and prints each step's result, which is a fast way
to check the sequence and retry behaviour before wiring in a real trigger.

## Wiring a trigger to the workflow

A trigger is whatever starts a run: a schedule, an incoming webhook, a
message on a queue, or a file landing in a watched location. The runner
itself does not care which of these it is, it only needs a trigger payload
dict handed to \`run_all()\`.

- For a scheduled trigger, call \`build_default_workflow().run_all(payload)\`
  from a cron job or a scheduled function, building the payload dict from
  whatever the schedule needs to pass through, even if that is just a
  timestamp.
- For a webhook trigger, parse the incoming request body into a dict and
  pass it straight to \`run_all()\` as the trigger payload, so the first
  step can validate it the same way the starter \`step_validate_input\`
  does.
- For a queue trigger, deserialise each message into a dict and call
  \`run_all()\` once per message, so a failure in one message's run does
  not affect the next message.

## How retries and halting work

Each step has its own retry limit, either a value set when the step is
registered or the workflow's \`default_max_retries\` if none was set. A
step that keeps failing past its limit halts the entire run at that step;
later steps never execute, and the partial list of results returned by
\`run_all()\` shows exactly how far the run got and why it stopped. This
is deliberate: a workflow step is often not safe to run out of order, so
skipping ahead after a failure would leave the trigger's underlying record
in a state none of the later steps expect.

## Extending this template

Add a new step by writing a function that follows the contract in
steps.md, then register it with \`runner.register(...)\` in the order it
should run. Steps can be moved earlier or later simply by changing the
order of the \`register\` calls in \`build_default_workflow()\`. For
persistent run history beyond the console log, write each \`StepResult\`
from \`run_all()\`'s return value to a database row or a log file keyed by
the trigger's own identifier.
`;

const meta: IdeToolMeta = {
  slug: "workflow-automation-agent-starter-template",
  title: "Workflow Automation Agent Starter Template: Steps, Logging and Retries",
  name: "Workflow Automation Agent Starter",
  category: "agent-starter-templates",
  summary:
    "Open a working workflow automation agent starter template in the browser: a Python step runner with logging and per step retries, a step contract file and a README, ready to edit and download as a .zip.",
  seo: {
    primaryKeyword: "workflow automation agent starter template",
    keywords: [
      "workflow automation agent starter template",
      "workflow agent python starter kit",
      "step runner agent template download",
      "automation agent retry logic starter",
      "trigger based workflow agent template",
    ],
    seoTitle: "Workflow Automation Agent Starter Template Free Download",
    seoDescription:
      "A free workflow automation agent starter template with a Python step runner, per step retries and logging, editable in the browser and downloadable as a .zip.",
  },
  files: [
    { path: "workflow.py", content: WORKFLOW_PY_TEMPLATE, kind: "code" },
    { path: "steps.md", content: STEPS_MD_TEMPLATE, kind: "markdown" },
    { path: "README.md", content: README_MD_TEMPLATE, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the step registration and retry pattern common to production workflow runners.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to write a workflow runner from scratch tend to either retry the entire run from the first step when any one step fails, wasting every already completed side effect, or catch every exception silently with no distinction between a retryable timeout and a malformed payload that will never succeed on a second attempt. A runner that retries only the failed step, halts the whole run once that step's limit is spent, and requires a step to state whether its own failure is retryable removes both problems at the structure level rather than relying on a model to reason through backoff logic correctly every time.",
  },
  article: {
    intro: [
      "This workflow automation agent starter template opens a working, three file starting point directly in your browser: a Python step runner that executes a fixed sequence of steps against a trigger, logs each step's outcome, and retries a failed step on its own up to a stated limit before halting the whole run. Every file is real, working starter content, ready to be extended with the actual steps a specific workflow needs. This workflow agent python starter kit needs no dependencies beyond the standard library, so it runs anywhere Python 3.10 or later is installed.",
      "A workflow automation agent is a distinct archetype from a conversational or research agent: it does not decide what to do next, it runs a known sequence someone already defined, and its main engineering problem is failure handling, not reasoning. A step midway through a run fails for reasons unrelated to the workflow's logic, and the correct response is almost never to restart the entire run. This template's runner retries only the step that failed, up to a limit that step itself can override, and everything here runs client side once it loads.",
    ],
    sections: [
      {
        heading: "Why a step runner instead of a linear script",
        body: [
          "A plain linear script works until the second step fails on the third run. At that point a workflow needs what a linear script does not give for free: a record of what each step returned, a way to retry one step without re-running the ones before it, and a clean halt when a step's failure means the rest should not continue. Building that once, rather than re-solving it inside every workflow script, is why this exists as a runner and a registry. Think of the retry section below as an automation agent retry logic starter you can lift into any Python project on its own.",
        ],
      },
      {
        heading: "How steps are registered and executed",
        body: [
          "Each step in workflow.py is a small function that takes the shared run context and either returns its output or raises a failure. Registering a step, in the order it should run, is a single call: a name, the function, and an optional retry limit. The runner works through the registered list in order, passing a shared context dict along so a later step can read what an earlier one produced without needing to know how to fetch it itself.",
        ],
      },
      {
        heading: "The retry policy, one failed step at a time",
        body: [
          "Every step gets its own retry budget: a limit set when it was registered, or the workflow's default. A step that keeps failing past that limit halts the entire run at that point; later steps never execute, and the result list shows how far it got. Most workflow steps are not safe to skip, so halting rather than continuing protects the sequence's own assumptions about order.",
          "The starter file also distinguishes a retryable failure from one that is not. A timeout or a rate limit should retry, since trying again after a short pause is likely to succeed. A malformed trigger payload should not retry at all, since the same broken input produces the same failure again. Stating that distinction explicitly keeps a workflow from spending its whole retry budget on a problem no retry could fix.",
        ],
      },
      {
        heading: "What gets logged, and why it matters later",
        body: [
          "Every attempt at every step is logged as it starts, succeeds or fails, including the attempt number and the reason a failure gave. Months into running a workflow, the question that gets asked is rarely whether it ran, it is which step failed and what it said. Logging that at the point of failure, rather than only a final pass or fail, makes that question answerable from the log alone.",
        ],
        list: [
          "Each step logs its own start, with the attempt number, before doing any work.",
          "A failed attempt logs the exact reason a step gave, whether or not it is retried.",
          "A halted run's result list shows every step that completed and where the run stopped.",
        ],
      },
      {
        heading: "Wiring in a real trigger",
        body: [
          "The runner only needs a trigger payload dict handed to its run method. README.md documents three trigger based workflow agent template variations: a scheduled trigger from a cron job, a webhook trigger parsed from a request body, and a queue trigger deserialised one message at a time. The runner stays trigger agnostic, so the sequence and retry policy do not change when the trigger source does.",
        ],
      },
      {
        heading: "Adding a step without breaking the contract",
        body: [
          "steps.md documents the exact contract a new step must follow: what it reads from the shared context, what shape its return value takes, and how it signals failure with the retryable flag set correctly. Following that contract keeps logging and retry behaviour correct as the workflow grows. Anyone who wants a step runner agent template download without the documentation can still copy workflow.py alone, though the companion files turn it into a genuine starter kit.",
        ],
      },
    ],
    howTo: {
      name: "How to build a workflow with this starter template",
      steps: [
        { name: "Read the starter files", text: "Open workflow.py, steps.md and README.md to see the runner, the step contract and the setup instructions before changing anything." },
        { name: "Run the placeholder workflow", text: "Run python3 workflow.py locally to see the four placeholder steps execute in order with logged output, so the sequence and retries are clear before editing." },
        { name: "Replace the placeholder step bodies", text: "Rewrite the placeholder step functions with the real work this workflow needs, following the inputs and return shape steps.md describes." },
        { name: "Set a retry limit per step", text: "Pass max_retries when registering each step, giving a wider retry window to steps that call an external service and none to input validation." },
        { name: "Wire in the real trigger", text: "Follow README.md to connect a scheduled job, a webhook handler or a queue consumer that builds the trigger payload and calls run_all." },
        { name: "Download the finished workflow", text: "Click Download .zip to save the file set exactly as shown, ready to run wherever the workflow needs to live." },
      ],
    },
    faq: [
      {
        question: "What makes this a workflow automation agent starter template rather than just a Python script?",
        answer:
          "The distinction is the runner around the steps. This template adds what a real workflow needs beyond calling functions in order: a shared context passed between steps, per step retry limits, structured logging of every attempt, and a halt on the exact step that failed rather than restarting or silently continuing.",
      },
      {
        question: "How is a failed step retried without re-running the whole workflow?",
        answer:
          "The runner catches a step's failure where it happens and retries only that step's function, up to its own limit, without touching steps that already completed. Once a step exhausts its retries the runner stops the run, and the earlier steps' results stay preserved in the returned result list.",
      },
      {
        question: "How do I control how many times a specific step retries?",
        answer:
          "Pass a max_retries value when registering that step, for example runner.register(\"send_email\", send_email_step, max_retries=4). A step registered without max_retries falls back to the workflow's default_max_retries, so most steps share one default while an unusual step is set individually.",
      },
      {
        question: "What is the difference between a retryable and a non retryable failure?",
        answer:
          "A retryable failure, the default, is one where trying again is likely to succeed, such as a timeout. A non retryable failure, set with retryable set to false, is one a second attempt cannot fix, such as a malformed trigger payload, so the runner halts immediately instead of spending its retry budget on it.",
      },
      {
        question: "Can I reorder or remove steps in this workflow automation agent starter template?",
        answer:
          "Yes. Steps run in the exact order they are registered, so reordering the register calls reorders the workflow, and deleting one removes that step entirely. A later step that reads an earlier step's output still needs that earlier step to run first, so check steps.md before removing one.",
      },
      {
        question: "Is anything I edit in the browser saved or uploaded anywhere?",
        answer:
          "No. The editor holds every change only in the tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing persists once the page closes, so downloading the .zip before leaving is the only way to keep the edited workflow.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/agent-starter-templates",
        label: "Browse every agent starter template",
        description: "See the other agent archetypes in this category, including command line and research agent starters, for comparison against this workflow archetype.",
      },
      {
        href: "/ide-tools/agent-tools/agent-tool-use-policy-tool",
        label: "Build a tool use policy for this workflow's steps",
        description: "A companion builder tool for writing the policy governing when a step in this workflow is allowed to call an external tool.",
      },
      {
        href: "/coding-prompts/code-refactoring-prompt",
        label: "Get help refactoring a step's placeholder logic",
        description: "A prompt for turning a rough function body into cleaner, more maintainable code, useful once a placeholder step is filled in.",
      },
      {
        href: "/productivity-prompts/report-automation-prompt",
        label: "See a prompt for automating a written report",
        description: "A related but distinct automation task, useful for the notify step if this workflow's final output is a written summary rather than a system change.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.python.org/3/library/logging.html",
        label: "Python's logging module documentation",
        description: "The standard library reference for the logging calls this template's runner uses to record every step attempt.",
      },
      {
        href: "https://learn.microsoft.com/en-us/azure/architecture/patterns/retry",
        label: "Microsoft's retry pattern guidance",
        description: "An independent architecture reference on retrying a single failed operation with a limit, the same pattern this template's step retries follow.",
      },
      {
        href: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/",
        label: "AWS's guide to timeouts, retries and backoff",
        description: "An authoritative explanation of why a fixed retry limit and a pause between attempts matter for a step that calls an external service.",
      },
      {
        href: "https://cloud.google.com/architecture/framework/reliability/design-scalability",
        label: "Google Cloud's reliability design guidance",
        description: "Independent architecture guidance on designing a system, including a step in a workflow, to fail safely rather than silently.",
      },
    ],
  },
  tags: ["workflow agent", "automation agent", "python starter", "step runner", "retry policy"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
