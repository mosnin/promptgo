import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "refactoring-prompt",
  name: "Behaviour Keeper",
  title: "Refactoring Prompt",
  category: "coding-prompts",
  taskType: "rewrite",
  summary:
    "Writes the behaviour contract first, preserves the accidental behaviour along with the intended kind, and returns ordered steps instead of one rewritten file.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["legacy code", "technical debt", "refactoring", "safety"],

  seo: {
    primaryKeyword: "refactoring prompt",
    keywords: [
      "refactoring prompt",
      "refactoring legacy code without changing behaviour",
      "how to break up a long function safely",
      "ai prompt for reducing cyclomatic complexity",
      "characterisation tests before a refactor",
      "keeping a refactor reviewable in one pull request",
    ],
    seoTitle: "Refactoring Prompt: Change the Shape, Not the Behaviour",
    seoDescription:
      "A refactoring prompt that records the behaviour contract first, preserves the quirks callers depend on, and returns ordered steps rather than one rewritten file.",
  },

  prompt: {
    text: `You are refactoring existing code. Behaviour must not change. That includes behaviour nobody intended: rounding, iteration order, exception types, log output, and anything a caller could be depending on by accident.

THE CODE: {{CODE}}
WHAT I WANT IMPROVED, AND NOTHING ELSE: {{GOAL}}
LANGUAGE, VERSION AND HOUSE RULES: {{CONSTRAINTS}}
WHAT IS CURRENTLY TESTED: {{COVERAGE}}

STEP 1: BEHAVIOUR CONTRACT. Before proposing anything, list the observable behaviours of this code: return values by class of input, exceptions raised and their exact types, side effects in the order they occur, mutations of arguments, and anything emitted such as logs or metrics. Mark each line GUARDED if an existing test would catch a change to it, or UNGUARDED if nothing would.

STEP 2: QUIRKS. Identify behaviour that is probably a defect but that callers may already depend on. Do not fix it. List it under BUG COMPATIBLE, preserve it exactly, and state what would break if it were corrected later.

STEP 3: PLAN. Give the refactor as ordered steps. Each step must compile and pass the existing tests on its own, be reviewable in isolation, and name the contract line it could plausibly break along with how you avoided that. No single step may combine moving code with rewriting it.

STEP 4: THE CODE. Output each step separately, never one merged result. Change nothing the goal did not ask for. Do not rename what you were not asked to rename, do not reorder parameters, do not add features, do not swap a dependency.

STEP 5: UNVERIFIABLE. List every place where behaviour preservation depends on something you were not shown: dynamic dispatch, reflection, subclasses, callers passing unexpected types, or a test described to you but not supplied.`,
    variables: [
      {
        token: "CODE",
        label: "The code to refactor",
        example:
          "A 180 line process_invoice() in billing/invoice.py that validates input, applies three discount rules, writes two tables and emits a metric, with four levels of nesting and two early returns.",
      },
      {
        token: "GOAL",
        label: "What to improve, and nothing else",
        example:
          "Pull the three discount rules out into separately testable functions. Leave the validation, the writes and the metric exactly where they are.",
      },
      {
        token: "CONSTRAINTS",
        label: "Language, version and house rules",
        example:
          "Python 3.11, no new dependencies, type hints required on new functions, module must stay importable without a database connection.",
      },
      {
        token: "COVERAGE",
        label: "What is currently tested",
        example:
          "One integration test covering a standard invoice with a single discount. No tests for the stacked discount path or the rounding at the end.",
      },
    ],
    expectedOutput:
      "A behaviour contract marking which lines are guarded by tests, a separate list of quirks preserved on purpose, and a numbered sequence of steps where each one stands alone and names the contract line it risks.",
    followUps: [
      "Write characterisation tests for every contract line you marked UNGUARDED, using the current behaviour as the expected value even where it looks wrong.",
      "Step three is the largest. Split it into two steps that each pass the tests independently.",
      "For each BUG COMPATIBLE entry, draft the ticket that proposes fixing it, including who would need to be told.",
    ],
    pitfalls: [
      "Leaving the goal field open ended is the failure mode that matters. Improve this code returns a rewrite with new names, new abstractions and a subtly different rounding path, and no reviewer will find the difference.",
      "The contract is only as good as the code you pasted. A method that dispatches on type or reads a global will have behaviour the model cannot see, which is what step five is for.",
      "Accepting the plan and asking for it all in one output undoes the main benefit. The steps are valuable because each one can be merged and reverted on its own.",
    ],
  },

  eeat: {
    author: "Tom Vasquez",
    authorCredential:
      "Sixteen years as a backend engineer, the last five reviewing pull requests full time on a platform team.",
    testingNote:
      "The quirk clause came out of a real failure: a helper truncated instead of rounding, and both models silently corrected it while extracting a function, which would have shifted every historic total by a cent. Asking for a contract first made the truncation visible as a line item, and after that neither model touched it.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "A refactoring prompt fails in a recognisable way. You ask for one improvement and receive a file that is better in six ways, four of which you did not request, and one of which quietly changed what the code does. The diff is too large to review properly, so it gets approved on trust.",
      "The fix is not a better model. It is a contract written before any code moves, plus a hard rule that nothing outside the stated goal may change. Used as an ai prompt for reducing cyclomatic complexity, that pairing is what keeps the nesting reduction from arriving alongside three renamed variables and a new helper module.",
      "The output is also shaped differently. Instead of one finished file, you get ordered steps, each of which compiles, passes the existing tests, and can be merged on its own.",
    ],

    sections: [
      {
        heading: "Refactoring legacy code without changing behaviour",
        body: [
          "Refactoring legacy code without changing behaviour is harder than it sounds because the behaviour is not written down anywhere. The tests cover the happy path, the docstring is four years old, and the real specification is whatever the function currently returns for every input production sends it.",
          "Step one turns that implicit specification into a list. Return values by class of input, exception types, side effects in order, argument mutation, emitted logs and metrics. It takes the model less than a minute and it gives the refactor something to be checked against, which is otherwise missing entirely.",
          "Marking each line guarded or unguarded is the part engineers find useful immediately. It shows exactly which behaviours would survive a mistake and which are held in place by nothing.",
        ],
      },
      {
        heading: "What the refactoring prompt refuses to fix",
        body: [
          "Old code contains behaviour that looks wrong and is load bearing. A comparison that treats an empty string as zero. A sort that is stable by accident. A method that returns None where it should raise, with three callers written around that.",
          "The refactoring prompt is instructed to spot these, preserve them exactly, and list them under a separate heading with a note on what correcting them would break. Fixing a defect during a refactor is how a change that was supposed to be safe becomes the cause of an incident, because nobody reviewed it as a behaviour change.",
          "Keeping the list separate also gives you something to act on. Each entry is a candidate ticket with the impact already sketched out, which is a better artefact than a silent correction buried in a large diff.",
        ],
      },
      {
        heading: "How to break up a long function safely",
        body: [
          "How to break up a long function safely comes down to never moving and rewriting in the same step. Extract the block verbatim, with its awkward variable names and its redundant conditional intact, and stop. The names and the conditional are a second step, reviewed on their own terms.",
          "Models resist this, because the combined version reads better and they are optimising for the final state. The rule against combining a move with a rewrite is stated explicitly for that reason, and it is the instruction most worth restating in a follow up when the output ignores it.",
        ],
      },
      {
        heading: "Characterisation tests before a refactor",
        body: [
          "Characterisation tests before a refactor record what the code currently does, including the parts that are wrong, so that any change shows up as a failure. They are not quality tests and they are not permanent. They exist to hold the shape of the thing while you rebuild it.",
          "The unguarded lines from step one are the list to write them against, which is why the contract comes before the plan. The follow up prompt below generates them directly from that list, and the useful discipline is asserting the value the code returns today rather than the value you believe it should return.",
        ],
      },
      {
        heading: "Keeping a refactor reviewable in one pull request",
        body: [
          "Keeping a refactor reviewable in one pull request is a constraint on step size, not on total scope. Five commits that each pass the tests can be reviewed in an hour. One commit touching the same lines cannot be reviewed at all, only skimmed and approved.",
          "The step format from the refactoring prompt maps onto that directly. Each step names the contract line it might break, so a reviewer knows what to look for instead of reading every line with equal attention, which is what makes large diffs get waved through.",
        ],
      },
    ],

    table: {
      caption: "Step size against what a reviewer can actually verify",
      headers: ["Step type", "What it touches", "How a reviewer checks it"],
      rows: [
        ["Verbatim extract", "Moved lines only, names unchanged", "Diff the moved block against the original text"],
        ["Rename", "Identifiers, no logic", "Confirm the count of call sites matches"],
        ["Signature change", "Parameters and every caller", "Check each caller passes the same values in the same order"],
        ["Logic rewrite", "Control flow inside one function", "Read against the contract line it declares"],
        ["Combined move and rewrite", "Everything at once", "Cannot be verified, split it"],
      ],
    },

    howTo: {
      name: "How to use the refactoring prompt",
      steps: [
        {
          name: "State the goal narrowly",
          text: "One improvement, plus an explicit list of what to leave alone. The second half does more work than the first, because it is what the model checks itself against in step four.",
        },
        {
          name: "Be honest about coverage",
          text: "Overstating what is tested makes the contract mark lines as guarded that nothing protects, and the plan will then take risks it thinks are covered.",
        },
        {
          name: "Read the quirk list before the plan",
          text: "If something is on it that you did not know about, stop and investigate. A quirk you were unaware of usually means a caller you were also unaware of.",
        },
        {
          name: "Write the characterisation tests first",
          text: "Against the unguarded lines, using today's behaviour as expected. Merge those tests before any refactor step, so the first step lands on a suite that can catch it.",
        },
        {
          name: "Merge one step at a time",
          text: "Each step is independently revertible only if it is independently merged. Batching them back together at the end throws away the property the plan was built for.",
        },
      ],
    },

    faq: [
      {
        question: "Should I let it fix bugs it finds along the way?",
        answer:
          "Not in the same change. A refactor is reviewed as a no op, so a fix inside one gets no scrutiny at all. Take the bug compatible list, raise each item separately, and let the fix be reviewed as the behaviour change it actually is.",
      },
      {
        question: "How much code can I give the refactoring prompt at once?",
        answer:
          "One function or one small class works best. A whole module produces a contract too long to check and a plan with steps that overlap, which defeats the property that each step can be merged and reverted independently of the others.",
      },
      {
        question: "What if there are no tests at all?",
        answer:
          "Then every contract line comes back unguarded, which is the correct answer and a useful one. Write characterisation tests for the behaviours you care about most, merge them, and only then start the plan, because a refactor with no safety net is a rewrite.",
      },
      {
        question: "Does the behaviour contract catch performance changes?",
        answer:
          "Only where you name them. Add any latency or allocation requirement to the constraints field explicitly, since an extraction that introduces a list copy inside a loop preserves every observable value while making a hot path several times slower.",
      },
      {
        question: "Can it work on code that uses reflection or dynamic dispatch?",
        answer:
          "Cautiously. Those are the cases step five exists to surface, because a method resolved at runtime has callers the model cannot see in the text you supplied. Treat anything listed there as unsafe until you have grepped for the call sites yourself.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Generates the characterisation tests for every contract line that came back unguarded in step one.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "Run each refactor step through it, since the adversarial pass is good at spotting behaviour that shifted during an extraction.",
      },
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description:
          "Worth running first when the function predates everyone on the team and its intent is genuinely unknown.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the larger case, where the question is whether to refactor at all rather than how to sequence it.",
      },
    ],

    externalLinks: [
      {
        href: "https://martinfowler.com/books/refactoring.html",
        label: "Fowler: Refactoring, second edition",
        description:
          "The source of the definition used here, that a refactor is a change to structure which does not alter observable behaviour.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: being explicit about constraints",
        description:
          "Vendor guidance on why negative constraints have to be stated rather than implied, which is what step four depends on.",
      },
      {
        href: "https://www.iso.org/standard/78176.html",
        label: "ISO/IEC 25010 product quality model",
        description:
          "The standard that separates maintainability from functional suitability, the distinction this prompt enforces mechanically.",
      },
    ],
  },
};

export default meta;
