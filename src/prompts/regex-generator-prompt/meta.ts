import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "regex-generator-prompt",
  name: "Near Miss Hunter",
  title: "Regex Generator Prompt",
  category: "coding-prompts",
  taskType: "generate",
  summary:
    "Writes the strings that must be rejected before the pattern exists, then attacks its own output for a false match and a backtracking blowup.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["regex", "validation", "parsing", "redos"],

  seo: {
    primaryKeyword: "regex generator prompt",
    keywords: [
      "regex generator prompt",
      "test strings that should not match",
      "avoiding catastrophic backtracking in a regex",
      "writing a regular expression from examples",
      "ai prompt for a validation pattern",
      "explaining a regex someone else wrote",
    ],
    seoTitle: "Regex Generator Prompt: Negative Tests First",
    seoDescription:
      "A regex generator prompt that writes the strings to reject before the pattern exists, hunts its own false matches, and checks for catastrophic backtracking.",
  },

  prompt: {
    text: `You are producing a regular expression. Before you write the pattern you will write the strings it must reject. A pattern is only as good as the near misses it excludes, and near misses are exactly what nobody supplies.

WHAT SHOULD MATCH, IN WORDS: {{TARGET}}
STRINGS THAT MUST MATCH: {{POSITIVES}}
STRINGS THAT MUST NOT MATCH: {{NEGATIVES}}
ENGINE, LANGUAGE AND FLAGS: {{ENGINE}}

STEP 0: SANITY. If this format has a real parser available in the target language, name it and say so plainly. Email addresses, URLs, HTML, CSV and dates all have parsers, and a pattern is the wrong tool for them. Continue only after stating this.

STEP 1: EXTEND THE NEGATIVES. Add at least six near misses I did not give you, each one character or one structure away from valid: the right shape with the wrong separator, a valid prefix followed by junk, a valid string embedded in a longer one, the empty string, one over the maximum length, and a unicode character that renders like an allowed one.

STEP 2: THE PATTERN. Write it in verbose mode with a comment on each component. Where the engine has no verbose mode, give both the commented and the single line form. Anchor it unless partial matching is explicitly wanted.

STEP 3: ADVERSARIAL PASS. Assume your pattern is wrong. Produce one string it matches that it should not, and one it rejects that it should accept. If you truly cannot find either, list the classes of input you searched.

STEP 4: BACKTRACKING. State the worst case behaviour on a long non matching input. Name every nested quantifier, every alternation with a shared prefix, and every quantified group that can match the same text in more than one way. If it can degrade quadratically or worse, rewrite it.

STEP 5: TEST TABLE. Every positive and negative in a table with the expected result and the capture groups, formatted so I can paste it straight into a test file.`,
    variables: [
      {
        token: "TARGET",
        label: "What should match, in words",
        example:
          "An internal ticket reference: two to four uppercase letters, a hyphen, then one to six digits. It appears inside prose, so I need to find them, not validate a whole string.",
      },
      {
        token: "POSITIVES",
        label: "Strings that must match",
        example: "PLAT-1, OPS-42981, ABCD-7, see PLAT-903 for context",
      },
      {
        token: "NEGATIVES",
        label: "Strings that must not match",
        example: "plat-42, PLATFORM-1, PLAT-, PLAT-1234567, PLAT_42, XPLAT-42",
      },
      {
        token: "ENGINE",
        label: "Engine, language and flags",
        example:
          "Go, using the standard regexp package, which is RE2 and has no lookahead or backreferences. Case sensitive, running over user submitted comment text.",
      },
    ],
    expectedOutput:
      "A statement of whether a parser should be used instead, an expanded list of near miss rejections, a commented pattern, one false match and one false rejection found by attacking it, a worst case backtracking assessment, and a paste ready test table.",
    followUps: [
      "The engine is RE2, so your lookahead will not compile. Rewrite the pattern without it and tell me what precision you lost.",
      "Add three more near misses drawn from the way this text is actually produced, given that it comes from a rich text editor that inserts non breaking spaces.",
      "Convert the test table into table driven Go tests with a subtest per row.",
    ],
    pitfalls: [
      "Supplying only positive examples is the default mistake and it produces a pattern that matches everything vaguely similar. The negatives field is where the specification actually lives.",
      "Skipping the engine field gets you a PCRE pattern that fails to compile under RE2, or a lookbehind that works in one language and silently does nothing in another.",
      "Accepting the pattern without running the test table is how an unanchored expression reaches production and starts matching substrings of longer strings that were meant to be rejected.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Asking for negatives before the pattern changed the results more than any wording elsewhere. On a ticket reference pattern both models initially accepted a lowercase variant and a seven digit number; made to enumerate near misses first, both produced correct anchored patterns. GPT-5.2 still needed reminding that the target engine had no lookahead.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "A regex generator prompt given three examples and no counterexamples will produce something that matches all three and a great deal more. Every example you supply is a positive, so the pattern has no pressure pushing it towards precision, and the natural result is permissive.",
      "Reversing the order fixes most of it. This prompt writes the rejection set first, expands it with near misses you did not think of, and only then composes a pattern that has to survive them. As an ai prompt for a validation pattern that reordering does more for correctness than any amount of careful phrasing in the request.",
      "After the pattern is written it gets attacked: one string it wrongly accepts, one it wrongly rejects, and a worst case analysis of what happens when someone feeds it four kilobytes of nearly matching text.",
    ],

    sections: [
      {
        heading: "Test strings that should not match",
        body: [
          "Test strings that should not match are the actual specification. Positives tell you the shape. Negatives tell you the boundary, and a pattern is nothing but a boundary.",
          "Nobody supplies enough of them, which is why step one requires the model to invent at least six more. The generated near misses are consistently the useful part, because they come from classes of mistake rather than from imagination about your data.",
        ],
        list: [
          "Correct shape, wrong separator: an underscore where a hyphen belongs.",
          "A valid value with trailing whitespace or a stray comma attached.",
          "A valid value sitting inside a longer token, which an unanchored pattern happily finds.",
          "The empty string, which several quantifier combinations match by accident.",
          "One character past the stated maximum length.",
          "A homoglyph, such as a Cyrillic character that renders identically to a Latin one.",
        ],
      },
      {
        heading: "What the regex generator prompt does about engine differences",
        body: [
          "Regular expression is not one language. Lookbehind exists in PCRE and in recent JavaScript, and not in RE2. Backreferences are absent from RE2 entirely. Atomic groups and possessive quantifiers are available in some engines and are the standard remedy for backtracking in exactly those.",
          "The engine field is therefore load bearing rather than a nicety. Left blank, the regex generator prompt defaults to something PCRE flavoured, and you find out at compile time in Go or at runtime in a database. Stating the engine also changes the advice in step four, since an engine with a linear time matcher cannot suffer catastrophic backtracking at all.",
        ],
      },
      {
        heading: "Avoiding catastrophic backtracking in a regex",
        body: [
          "Avoiding catastrophic backtracking in a regex matters most on patterns applied to input from outside, because the failure mode is a request that pins a core for thirty seconds. The trigger is almost always a long string that nearly matches and then fails at the very end.",
        ],
        subsections: [
          {
            heading: "Quantifiers inside quantifiers",
            body: [
              "A group that repeats and contains something that also repeats gives the engine an exponential number of ways to divide the same text. It behaves perfectly on every example anyone tries by hand, then stalls on a forty character input that fails on the last byte.",
            ],
          },
          {
            heading: "Alternatives that start the same way",
            body: [
              "Branches sharing a prefix make the engine retry the shared portion for each branch, and nesting that inside a repeat compounds it. Factoring the common prefix out is usually a one line change and it removes the class of problem.",
            ],
          },
        ],
      },
      {
        heading: "Writing a regular expression from examples",
        body: [
          "Writing a regular expression from examples works well when the examples are drawn from the real data rather than composed for the request. Real data contains the trailing whitespace, the inconsistent casing and the occasional double separator that a tidy example set omits.",
          "Pulling twenty actual values and pasting the awkward ones is worth more than a careful English description of the format. The description tends to describe the intended format, and the pattern has to handle the one that exists.",
        ],
      },
      {
        heading: "Explaining a regex someone else wrote",
        body: [
          "Explaining a regex someone else wrote is the same prompt run backwards, and it is worth doing before you modify one. Supply the pattern as the target, leave the example fields empty, and ask for the near miss table first.",
          "What comes back is a set of strings the pattern accepts, which is a far more reliable description of its behaviour than any prose walkthrough of the syntax. If three of those strings surprise you, the pattern does not do what the person who wrote it believed either.",
        ],
      },
    ],

    howTo: {
      name: "How to use the regex generator prompt",
      steps: [
        {
          name: "Write four negatives before you start",
          text: "Even bad ones. They anchor the model's expansion in step one, and the six it adds will be closer to your real data than anything it generates from the description alone.",
        },
        {
          name: "Name the engine and the flags",
          text: "Not just the language. Multiline, dotall and unicode flags change which characters an anchor and a dot will match, and those are the differences that survive review unnoticed.",
        },
        {
          name: "Run the test table before reading the explanation",
          text: "Paste it into a test file and execute it. A pattern that fails two of its own generated cases is a common outcome and it takes seconds to discover.",
        },
        {
          name: "Check step zero honestly",
          text: "If the answer names a parser, use the parser. A pattern for an email address will be wrong in a way that only shows up when a real customer cannot sign up.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the regex generator prompt try to talk me out of it?",
        answer:
          "Because a large share of requests are for formats with a specification and a parser behind it. Matching one with a pattern gives you something that is approximately right, and the inputs it gets wrong are real addresses and real URLs belonging to real users.",
      },
      {
        question: "Is the backtracking analysis reliable?",
        answer:
          "The structural part is, since nested quantifiers and shared alternation prefixes are visible in the pattern text. The predicted timing is not, so treat it as a flag to go and measure rather than as a measurement. Feeding a long failing string to the compiled pattern settles it in a minute.",
      },
      {
        question: "Can it handle multiline and unstructured text?",
        answer:
          "Yes, and the near miss set becomes more important there. Text with line breaks, quotation marks and non breaking spaces breaks patterns that were tested on clean single line samples, so paste an ugly extract from the real source into the negatives field.",
      },
      {
        question: "What about unicode?",
        answer:
          "State it in the engine field, including whether the unicode flag is set. Character classes such as word characters mean different things with and without it, and homoglyph rejections in step one only make sense once the model knows which classes are in play.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description:
          "Turns the generated test table into a permanent parametrized suite rather than a one off check.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "sql query prompt",
        description:
          "For patterns that end up inside a database, where the engine differs again and the cost lands on every row scanned.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "Useful when the format you are matching is a convention people follow by habit rather than one anybody has written down.",
      },
    ],

    externalLinks: [
      {
        href: "https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS",
        label: "OWASP: regular expression denial of service",
        description:
          "The security reference for why a pattern on untrusted input needs a worst case analysis rather than a passing test suite.",
      },
      {
        href: "https://github.com/google/re2/wiki/Syntax",
        label: "RE2 syntax reference",
        description:
          "The authoritative list of what a linear time engine supports, which is what makes the engine field change the answer.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
        label: "MDN: regular expressions in JavaScript",
        description:
          "Primary documentation for flag behaviour and unicode property escapes, the settings most often left unstated in a request.",
      },
    ],
  },
};

export default meta;
