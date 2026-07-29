import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "code-review-prompt",
  name: "Diff Adversary",
  title: "Code Review Prompt",
  category: "coding-prompts",
  taskType: "evaluate",
  summary:
    "Starts from the assumption the diff is broken, asks for the input that proves it, and separates what was read from what was inferred.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["pull requests", "code quality", "review", "defects"],

  seo: {
    primaryKeyword: "code review prompt",
    keywords: [
      "code review prompt",
      "ai prompt for reviewing a pull request",
      "finding bugs a diff introduces",
      "reviewing a diff without the surrounding files",
      "code review that does not rewrite the code",
      "catching regressions before merge",
    ],
    seoTitle: "Code Review Prompt: Find the Bug the Diff Added",
    seoDescription:
      "A code review prompt that assumes the diff already contains a defect, asks for the exact input that triggers it, and lists what it could not verify.",
  },

  prompt: {
    text: `You are reviewing a code change. Work from the assumption that this diff introduces at least one defect, and that your job is to produce the input that triggers it rather than an opinion about whether the code looks correct.

LANGUAGE AND RUNTIME: {{LANGUAGE}}
THE DIFF: {{DIFF}}
WHAT THIS CODE MUST GUARANTEE: {{INVARIANTS}}
WHAT CALLS THIS AND WHAT IT CALLS: {{CALLERS}}

STEP 1: RESTATE THE CHANGE. In three sentences, say what the diff does mechanically. If your restatement disagrees with the stated guarantees, stop and report that disagreement before anything else.

STEP 2: ADVERSARIAL PASS. Produce concrete failing inputs, not descriptions of risk. For each one give the exact input or state, the line it reaches, the wrong behaviour, and whether it is a crash, a silent wrong answer or a resource leak. Rank silent wrong answers highest. Cover at minimum: empty and boundary values, the function being entered twice concurrently, a failure part way through after a write has already happened, and any value a caller can supply that the diff never validates.

STEP 3: WHAT YOU CANNOT VERIFY. List every claim that would need the surrounding code, the schema or the runtime configuration to confirm. Anything not on this list you are asserting from the diff alone.

STEP 4: SORT. Blocking means user visible breakage or data loss. Everything else is non blocking and goes in a second list.

RULES. Do not rewrite the code. Do not suggest changes to lines the diff did not touch. Do not comment on naming, formatting or structure unless a specific defect follows from it. If you find no defect after a genuine attempt, say so plainly and name the strongest input you tried.`,
    variables: [
      {
        token: "LANGUAGE",
        label: "Language and runtime",
        example: "Python 3.12, FastAPI, running under gunicorn with four worker processes",
      },
      {
        token: "DIFF",
        label: "The unified diff",
        example:
          "@@ -41,7 +41,11 @@ def apply_credit(account_id, amount):\n-    balance = get_balance(account_id)\n-    set_balance(account_id, balance + amount)\n+    balance = get_balance(account_id)\n+    if amount > MAX_CREDIT:\n+        amount = MAX_CREDIT\n+    set_balance(account_id, balance + amount)\n+    audit_log(account_id, amount)",
      },
      {
        token: "INVARIANTS",
        label: "What this code must guarantee",
        example:
          "A balance is never negative, one request id never applies credit twice, and every applied credit has exactly one audit row.",
      },
      {
        token: "CALLERS",
        label: "What calls this and what it calls",
        example:
          "Called from the webhook handler, which retries on any 500. get_balance and set_balance are two separate queries with no transaction around them. audit_log writes to a different database.",
      },
    ],
    expectedOutput:
      "A short mechanical restatement of the change, several concrete failing inputs with the line each reaches and the kind of wrongness it produces, an explicit list of claims that could not be checked from the diff, and findings split into blocking and non blocking.",
    followUps: [
      "Take your highest ranked finding and write it as a failing test in this project's test framework, with no fix.",
      "Assume the retry from the webhook handler happens exactly between get_balance and set_balance. Redo step two under that assumption.",
      "Now list the questions I should ask the author, phrased so each can be answered yes or no.",
    ],
    pitfalls: [
      "Leaving the invariants field vague turns the adversarial pass into guesswork. If you cannot state a guarantee in testable terms, the model will invent one and review against it.",
      "Pasting whole files instead of a diff makes the model review untouched code, and the author will discard the whole review rather than sort through it.",
      "A finding you cannot reproduce is a hypothesis. Posting it as a defect is how these reviews lose credibility with the people receiving them.",
    ],
  },

  eeat: {
    author: "Tom Vasquez",
    authorCredential:
      "Sixteen years as a backend engineer, the last five reviewing pull requests full time on a platform team.",
    testingNote:
      "Asking for a verdict produced approval on a diff that dropped a transaction boundary, on both models, twice. Reframing it as produce the input that breaks this found the interleaving on the first attempt. The unverifiable list came later, after Claude Opus 4.5 confidently asserted a helper handled nulls when the helper had never been supplied to it.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "A code review prompt that asks whether a diff looks correct is asking a question the model will answer yes to. The framing decides the output far more than the model does: ask for a verdict and you get agreement, ask for the input that breaks the change and you get something a reviewer can act on.",
      "This is written as an ai prompt for reviewing a pull request that begins from the assumption a defect is present. The model is not weighing up whether to raise a concern. It is hunting for the value, the ordering, or the failure part way through that makes the new code quietly do the wrong thing.",
      "The second half is restrictions. No rewriting, no reaching outside the changed lines, no style commentary, and a required list of everything that could not be checked from what was supplied.",
    ],

    sections: [
      {
        heading: "Ask for the failing input, not an opinion",
        body: [
          "Finding bugs a diff introduces is a search problem, and a search needs a target. Review this code gives the model no target, so it returns the generic list every engineer has already ignored: consider adding error handling, consider extracting a helper, consider adding a test. None of those are findings.",
          "Demanding a concrete input changes the work. The model has to trace a value through the new lines and land on a specific wrong result. Often it cannot, and saying so is itself useful. When it can, you hold a reproduction rather than a suspicion, and you can turn it into a test before anyone argues about severity.",
        ],
      },
      {
        heading: "What the code review prompt is allowed to claim",
        body: [
          "Any review a model produces mixes two kinds of statement: things read off the diff, and things inferred about code that was never supplied. The inferences are where the false positives live, and separating the two is worth more than any improvement in raw reasoning.",
          "Step three of the code review prompt forces that split. Anything requiring the schema, the caller, the configuration or the runtime to confirm goes on a list, and everything absent from the list is being asserted from the changed lines alone. A reviewer can then check the short list and treat the remainder as read.",
        ],
        list: [
          "Whether a helper the diff calls tolerates a null, since its body was never supplied.",
          "Whether the column being written has a not null constraint on it.",
          "Whether this function runs under a lock or can be entered twice at once.",
          "Whether the retry wrapper around the call site is safe to run again.",
          "Whether the timeout comes from the client or is set per request.",
        ],
      },
      {
        heading: "Reviewing a diff without the surrounding files",
        body: [
          "Reviewing a diff without the surrounding files is the normal case rather than a degraded one. Nobody pastes a repository into a chat window, and the agents that can read a repository still pick a small slice of it and work from that.",
          "The callers field exists for exactly this. Two sentences about what invokes the changed function and what it depends on removes most of the guessing, and whatever is still missing surfaces on the unverifiable list instead of arriving as confident nonsense. A bad file selection is worse than none, because the model treats whatever you pasted as complete.",
        ],
      },
      {
        heading: "Why it hands back findings and not a rewrite",
        body: [
          "A code review that does not rewrite the code is more useful inside a pull request than one that does. A rewrite is unreviewable. It fuses the fix with three unrelated preferences, and the author now has to diff the diff to work out what genuinely changed.",
          "The ban on touching untouched lines serves the same purpose. Left unconstrained, models expand scope, and a review proposing that a file be reorganised when the author added two lines to it gets discarded whole, taking the real finding down with it.",
        ],
      },
      {
        heading: "Catching regressions before merge",
        body: [
          "Catching regressions before merge is mostly about the second category in step two. Crashes get found by somebody eventually. A rounding change that shifts one invoice in ten thousand does not, and that is precisely the class of defect a human skims past because the code reads perfectly well.",
          "So the adversarial pass ranks silent wrong answers above crashes, and requires a partial failure scenario every time. A function that writes two rows and throws before the third behaves correctly on every input anyone would think to try by hand.",
        ],
      },
    ],

    howTo: {
      name: "How to use the code review prompt",
      steps: [
        {
          name: "Write the guarantees in testable terms",
          text: "Handles user input safely produces nothing. Never returns a negative balance and never applies one request id twice gives the adversarial pass a real target to attack.",
        },
        {
          name: "Supply a diff, not a file",
          text: "A unified diff with a few lines of context. Whole files bury the change and the model drifts into reviewing code that nobody touched in this branch.",
        },
        {
          name: "Read the unverifiable list before the findings",
          text: "It tells you which findings are conditional. Most resolve in thirty seconds by opening one file, and the ones that do not are the questions actually worth putting to the author.",
        },
        {
          name: "Reproduce before you comment",
          text: "Turn the top finding into a failing test first. If the input does not reproduce, it was inferred rather than found, and posting it costs the author an hour of their day.",
        },
      ],
    },

    faq: [
      {
        question: "Does the code review prompt replace a human reviewer?",
        answer:
          "No, and it is weakest at the thing human review is for: whether the change is the right change at all. It is good at boundary values, concurrent entry and partial failure, which are the cases people skip when a diff reads cleanly.",
      },
      {
        question: "What happens when the diff genuinely has no defect?",
        answer:
          "The prompt requires the model to say so and name the strongest input it tried, which gives you something to judge. If the strongest attempt was a null argument on a field the type system already rejects, the pass was shallow and worth running again with better context.",
      },
      {
        question: "How big a change can this handle in one pass?",
        answer:
          "Roughly a few hundred changed lines before quality falls off noticeably. Beyond that, split by concern rather than by file, because the adversarial pass depends on holding one data path in view at a time rather than surveying everything at once.",
      },
      {
        question: "Should I paste the ticket description as well?",
        answer:
          "Put the intent in the guarantees field instead, rewritten as conditions that must hold. Ticket text tends to describe a feature rather than a contract, and the model will happily confirm that the code matches the feature description while missing that it breaks something else.",
      },
      {
        question: "Why rank silent wrong answers above crashes?",
        answer:
          "A crash is loud, cheap to diagnose and usually caught in staging. A wrong number written to a database is discovered weeks later by someone in finance, and by then it has propagated into reports, invoices and downstream systems that also need correcting.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description:
          "Once a review finding reproduces, this takes the stack trace and ranks the hypotheses before anyone edits a line.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Turns a confirmed failing input from step two into a test that stays in the suite after the fix lands.",
      },
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description:
          "For the non blocking pile, where the right answer is a separate change rather than a comment on this one.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description:
          "When a defect reached production, the review that missed it is a contributing condition worth examining properly.",
      },
    ],

    externalLinks: [
      {
        href: "https://google.github.io/eng-practices/review/reviewer/standard/",
        label: "Google engineering practices: the standard of code review",
        description:
          "The clearest published statement of what a reviewer is responsible for and where scope expansion goes wrong.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: structured reasoning in prompts",
        description:
          "Primary documentation for why forcing an explicit intermediate step changes the quality of an analytical answer.",
      },
      {
        href: "https://arxiv.org/abs/2107.03374",
        label: "Evaluating large language models trained on code",
        description:
          "The original evaluation of code models, and the source of the measured gap between code that looks right and code that passes tests.",
      },
    ],
  },
};

export default meta;
