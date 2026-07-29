import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "unit-test-prompt",
  name: "Contract Tester",
  title: "Unit Test Prompt",
  category: "coding-prompts",
  taskType: "generate",
  summary:
    "Derives cases from the contract rather than the code, designs each one against the wrong implementation a competent person would write, and reports what it left uncovered.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["testing", "coverage", "regressions", "pytest"],

  seo: {
    primaryKeyword: "unit test prompt",
    keywords: [
      "unit test prompt",
      "writing tests that fail for the right reason",
      "avoiding tests that mirror the implementation",
      "generating edge case tests for a function",
      "ai prompt for pytest test cases",
      "how to test a function you did not write",
    ],
    seoTitle: "Unit Test Prompt: Tests That Fail for a Reason",
    seoDescription:
      "A unit test prompt that builds cases from the contract instead of the code, targets the wrong implementation a competent person would write, and says what it skips.",
  },

  prompt: {
    text: `You are writing unit tests. Derive them from the stated contract, never from the implementation. A test that would pass against any correct implementation is a good test. A test that only passes against this particular one is a mirror of the code and has no value.

THE UNIT UNDER TEST: {{FUNCTION}}
THE CONTRACT IT IS SUPPOSED TO HONOUR: {{CONTRACT}}
FRAMEWORK AND HOUSE CONVENTIONS: {{FRAMEWORK}}
TESTS THAT ALREADY EXIST: {{EXISTING}}

STEP 1: ENUMERATE BEHAVIOURS. From the contract alone, list every distinct behaviour: classes of input and their expected output, error conditions with the exact error expected, ordering guarantees, idempotency, and any state a caller can observe afterwards.

STEP 2: ADVERSARIAL CASES. Assume the implementation contains a defect. For each behaviour, name the most plausible wrong implementation a competent person would have written, then design the case that separates correct from that. Consider off by one at a boundary, an empty collection treated as an error, string length counted in bytes rather than characters, silent mutation of a caller's argument, and a second identical call returning something different.

STEP 3: WRITE THE TESTS. One behaviour per test. Every test name states the behaviour, and every test carries a one line comment naming the change that would make it fail. Do not assert on private functions, internal call counts, or the order of operations inside the unit unless the contract makes those observable. No sleeps, no shared mutable state, no dependence on execution order.

STEP 4: NOT TESTED. List the behaviours from step one you did not cover, each with the reason: needs a real dependency, needs a controllable clock, not observable from outside, or already covered by an existing test.

Do not modify the code under test. Where the contract and the code disagree, write the test against the contract and flag the disagreement separately.`,
    variables: [
      {
        token: "FUNCTION",
        label: "The unit under test",
        example:
          "def split_batch(items, max_bytes): returns a list of lists, each serialising to at most max_bytes, preserving input order.",
      },
      {
        token: "CONTRACT",
        label: "The contract it must honour",
        example:
          "Order is preserved. No batch exceeds max_bytes once serialised as JSON. An item larger than max_bytes raises ItemTooLarge. An empty input returns an empty list, not a list containing an empty list. The input list is not mutated.",
      },
      {
        token: "FRAMEWORK",
        label: "Framework and house conventions",
        example:
          "pytest, no unittest classes, fixtures in conftest.py, parametrize preferred over loops, assertions on values rather than on mock call counts.",
      },
      {
        token: "EXISTING",
        label: "Tests that already exist",
        example:
          "test_split_batch_happy_path covers ten small items and one batch. Nothing covers oversized items, empty input or unicode payloads.",
      },
    ],
    expectedOutput:
      "A behaviour list drawn only from the contract, a matching set of tests where each name states the behaviour and each carries the plausible defect it would catch, and a closing list of behaviours deliberately left uncovered with reasons.",
    followUps: [
      "For every behaviour on the not tested list that says it needs a real dependency, propose the smallest fake that would make it testable without one.",
      "Take the three tests most likely to be flaky and rewrite them so no timing or ordering assumption remains.",
      "The contract says the input is not mutated. Write the test that would catch a mutation happening only on the error path.",
    ],
    pitfalls: [
      "Pasting the implementation into the contract field defeats the whole design. The model will read it, derive the behaviours from the code, and produce tests that lock in whatever the code currently does including its defects.",
      "Skipping the existing tests field produces duplicates that look like coverage. A suite with three tests for the happy path and none for the error path scores well and protects nothing.",
      "Accepting a test that mocks the thing being tested is the quiet failure. It passes forever, including after somebody deletes the logic underneath it.",
    ],
  },

  eeat: {
    author: "Tom Vasquez",
    authorCredential:
      "Sixteen years as a backend engineer, the last five reviewing pull requests full time on a platform team.",
    testingNote:
      "Given the function body, both models wrote tests that asserted the current output for each branch, which passed against a version I had deliberately broken with an off by one. Removing the body and supplying only the contract fixed it: GPT-5.2 caught the boundary on the first run, and Claude Opus 4.5 also flagged that the empty case was ambiguous in my wording.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "Hand a unit test prompt a function body and it will produce tests that pass. That sounds like success and it is the central failure of the whole exercise, because tests written from an implementation encode whatever that implementation does, defects included, and then guard the defects against correction.",
      "This one never sees the body if you use it properly. It works from a contract you write in plain language, enumerates the behaviours that contract implies, and then designs each case against the most plausible wrong implementation rather than against the real one.",
      "It also ends by admitting what it skipped, which is the section most engineers read first once they have used it a few times.",
    ],

    sections: [
      {
        heading: "Writing tests that fail for the right reason",
        body: [
          "Writing tests that fail for the right reason means each test can answer the question of what broke. A test named test_process_order that exercises validation, pricing and persistence in one call fails on any of them and tells you nothing about which.",
          "The one behaviour per test rule handles the split, and the required comment naming the change that would make the test fail handles the rest. That comment is a small thing that changes maintenance considerably. Two years later, when the test fails and nobody remembers why it exists, the answer is on the line above it.",
          "It also functions as a filter while the tests are being written. If the model cannot name a change that would break a test, the test is not protecting anything, and it usually deletes it at that point rather than writing it out.",
        ],
      },
      {
        heading: "Avoiding tests that mirror the implementation",
        body: [
          "Avoiding tests that mirror the implementation is why the contract field exists and why the function field should hold a signature and a summary rather than a body. A mirror test asserts that the code does what the code does. It passes on day one, it fails on any refactor, and it never once catches a defect.",
          "Mock assertions are the same problem in a different costume. Checking that the repository save method was called twice tests an implementation choice, not a behaviour, and it breaks the moment somebody batches the writes without changing anything a caller can observe.",
          "This also makes the prompt genuinely useful for how to test a function you did not write. You do not need to understand the code to state what it must guarantee, and stating that is the harder and more valuable half of the work anyway.",
        ],
      },
      {
        heading: "Generating edge case tests for a function",
        body: [
          "Generating edge case tests for a function is where models are strongest, provided they are pointed at a specific class of mistake rather than asked for edge cases in general. The adversarial framing in step two does the pointing: name the wrong implementation first, then write the case that separates it from the right one.",
          "Used as an ai prompt for pytest test cases, this tends to produce a parametrized table where each row is a named defect rather than an anonymous input, which reads well in a failure report and survives review.",
        ],
        list: [
          "The boundary itself, plus the value either side of it.",
          "Empty input, and the difference between empty and absent.",
          "A value that is valid in isolation and invalid in combination.",
          "Unicode where the byte length and the character count differ.",
          "The same call made twice, when the contract claims idempotency.",
          "The error path, checked for the exact exception type rather than any failure.",
        ],
      },
      {
        heading: "Why the unit test prompt reports what it skipped",
        body: [
          "A suite that looks complete and is not is worse than a thin suite everyone knows is thin, because the first one gets trusted. Step four exists to stop that, and the reasons it gives are specific enough to act on rather than an apology.",
          "Needs a real dependency usually means the unit is doing two jobs. Not observable from outside usually means the contract is incomplete rather than the test being impossible. Both are design findings that arrive free with the tests, and in practice they are the most valuable output the unit test prompt produces.",
        ],
      },
    ],

    howTo: {
      name: "How to use the unit test prompt",
      steps: [
        {
          name: "Write the contract before you look at the code",
          text: "State what must hold in terms a caller could verify. If you find yourself describing branches, you are reading the implementation and the tests will inherit it.",
        },
        {
          name: "Give the signature, withhold the body",
          text: "Name, parameters, return type and a one line summary is enough. Withholding the body is the single change that stops the output being a mirror of what already exists.",
        },
        {
          name: "List the tests you already have",
          text: "By name and by what they cover. Otherwise you get a second happy path test that raises the coverage number without touching an untested branch.",
        },
        {
          name: "Break the code and run the suite",
          text: "Introduce the off by one yourself and confirm something goes red. A suite that stays green against a deliberate defect is not protecting the behaviour it claims to.",
        },
      ],
    },

    faq: [
      {
        question: "Should I let it see the implementation at all?",
        answer:
          "Only after the first pass. Generate from the contract, review what comes back, then optionally share the body and ask which behaviours in the code are absent from the contract. That ordering finds gaps in your specification rather than baking them in.",
      },
      {
        question: "Does this work for languages other than Python?",
        answer:
          "Yes. The framework field carries the conventions, so naming the runner, the assertion style and whether table driven tests are preferred is usually enough. The behaviour enumeration in step one is language independent because it comes from the contract.",
      },
      {
        question: "How does it handle code with heavy dependencies?",
        answer:
          "It pushes them onto the not tested list rather than mocking its way around them. That is intentional, since a unit with four collaborators is often better tested at a level where those collaborators are real, and the list tells you which ones are forcing that.",
      },
      {
        question: "Will it improve my coverage percentage?",
        answer:
          "Usually, but that is a side effect and a poor target. Coverage counts executed lines, not verified behaviours, and a test that calls a function and asserts nothing meaningful raises the number while catching nothing at all.",
      },
      {
        question: "What if the contract I wrote turns out to be wrong?",
        answer:
          "The prompt flags disagreements between contract and code instead of quietly resolving them, so you find out during generation. Deciding which one is correct is your call, and it is a decision worth making explicitly rather than by whichever the tests happened to encode.",
      },
      {
        question: "Can it write integration tests instead?",
        answer:
          "It can, but the design here assumes one unit with an observable contract. For a flow crossing several services the behaviour enumeration becomes unwieldy, and you get better results describing the flow as a sequence of observable states and asking for tests against each transition.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "Its adversarial pass produces failing inputs, and each one is a test case waiting to be written here.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description:
          "Run it first when a test fails for a reason nobody understands, before anyone changes the assertion.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For turning the testing conventions your team argues about into something a new joiner can actually follow.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.pytest.org/en/stable/how-to/parametrize.html",
        label: "pytest: parametrizing test cases",
        description:
          "Primary documentation for the table driven form the adversarial pass produces, including how ids surface in failure output.",
      },
      {
        href: "https://martinfowler.com/bliki/TestPyramid.html",
        label: "Fowler: the test pyramid",
        description:
          "The standard reference for deciding which behaviours belong in a unit test and which are better verified a level up.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: prompt engineering guide",
        description:
          "Vendor documentation on withholding context deliberately, which is the mechanism behind not supplying the function body.",
      },
    ],
  },
};

export default meta;
