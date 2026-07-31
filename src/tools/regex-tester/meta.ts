import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "regex-tester",
  name: "Regex Tester",
  title: "Regex Tester",
  category: "data-developer-tools",
  summary:
    "Runs a pattern against a test string with JavaScript's own RegExp engine, lists every match with its index and captured groups, and shows the engine's real error on an invalid pattern.",

  seo: {
    primaryKeyword: "regex tester",
    keywords: [
      "regex tester",
      "free online regex tester",
      "javascript regex tester tool",
      "how to test a regular expression",
      "regex match checker",
    ],
    seoTitle: "Regex Tester: Live JavaScript Pattern Matching Tool",
    seoDescription:
      "A free online regex tester that matches your pattern against JavaScript's own RegExp engine, lists every match with its index, and shows the real parser error.",
  },

  fields: [
    {
      kind: "text",
      token: "pattern",
      label: "Regular expression pattern",
      help: "Without the surrounding slashes",
      placeholder: "\\d+",
      example: "\\d+",
    },
    {
      kind: "text",
      token: "flags",
      label: "Flags",
      help: "Any combination of g, i, m, s, u, y - leave blank for none",
      placeholder: "g",
      example: "g",
    },
    {
      kind: "textarea",
      token: "testString",
      label: "Test string",
      help: "The text to search. It never leaves your browser.",
      placeholder: "Order 12 shipped on 2026-07-31, order 345 shipped on 2026-08-02.",
      example: "Order 12 shipped on 2026-07-31, order 345 shipped on 2026-08-02.",
      rows: 6,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["The browser's native RegExp engine, called directly through RegExp.exec"],
    testingNote:
      "Verified against a set of known correct inputs and outputs before publishing, including a multi match count with hand counted character indices, a pattern with an optional capture group confirmed to report an empty string when that group does not participate, a zero width pattern confirmed to terminate rather than hang the matching loop, an unbalanced pattern and an invalid flag each confirmed to surface the real engine error, and a pattern run without a g flag confirmed to still return every match.",
  },

  article: {
    intro: [
      "A regex tester exists to answer one question without ambiguity: given this pattern and these flags, what exactly does it match in this text, at what position, and with what captured groups. This one runs the pattern directly against RegExp, the same engine every browser and Node.js script uses, rather than a simplified reimplementation that might accept something the real engine would reject.",
      "Unlike a plain regex match checker that only answers yes or no, this one lists every match it finds, in order, with its character index and any captured groups, because a pattern that matches is only half the answer. Where it matches, and what it captured while doing so, is usually the part that actually mattered for the code the pattern was written for.",
      "An invalid pattern or flag combination is not hidden behind a generic warning either. The message shown is whatever SyntaxError the engine itself threw, specific enough to point straight at the mistake.",
    ],

    sections: [
      {
        heading: "How this regex tester finds every match",
        body: [
          "RegExp.exec only returns one match at a time, and by default it returns the same one every time it is called. Getting a full list back requires the global flag, since that is what makes exec remember where the previous match ended and resume searching from there on the next call.",
          "Rather than requiring you to remember to add g, this tool forces it onto a second, internal copy of your expression used only for the matching loop. Your own pattern and flags are validated first exactly as typed, so a mistake in either one is reported against what you actually entered, not against the modified version used behind the scenes to enumerate matches.",
        ],
      },
      {
        heading: "Reading the match index and captured groups",
        body: [
          "The index column is the character offset of the match, counted from zero at the start of the test string, exactly the value RegExp.exec reports on its own match object. It is the number you would hand to slice or substring to pull the same text back out programmatically.",
          "Captured groups appear in the order they are opened in the pattern, one value per parenthesised group. A group inside an optional part of the pattern that did not participate in a given match reports as an empty value rather than being silently dropped, since that distinction, present but empty versus not present at all, is exactly the kind of detail a quick visual scan of a pattern tends to miss.",
        ],
      },
      {
        heading: "What each regex flag actually changes: g, i, m, s, u and y",
        body: [
          "Each flag changes real matching behaviour, not just how results are displayed. Getting one wrong is a common source of a pattern that looks correct and quietly matches the wrong thing.",
        ],
        list: [
          "g: global, find every match rather than only the first",
          "i: case insensitive, letters match regardless of case",
          "m: multiline, ^ and $ match at each line break, not only string start and end",
          "s: dotall, . matches newline characters too",
          "u: unicode, treats the pattern and string as full unicode code points",
          "y: sticky, matches only starting exactly at lastIndex, no scanning forward",
        ],
      },
      {
        heading: "Why an invalid pattern shows JavaScript's own error",
        body: [
          "Deciding whether a pattern is even syntactically legal has one correct answer for a given input, so that decision is left entirely to RegExp itself rather than to a hand written check that might disagree with the real engine on an edge case. An unbalanced parenthesis, an unclosed character class or an unknown flag letter all throw a SyntaxError the moment the expression is constructed.",
          "That thrown message is shown exactly as the engine wrote it. It usually names the specific problem, which is far more useful for fixing a pattern than a generic invalid pattern notice would be.",
        ],
      },
      {
        heading: "The 500 match cap and catastrophic backtracking",
        body: [
          "A small number of patterns, particularly ones with nested quantifiers or alternation branches that share a prefix, can take a very long time to fail against a long input that nearly matches. That failure mode is well documented as catastrophic backtracking, and it is a real production incident category, not a theoretical concern.",
          "This tool caps the match list at 500 results and notes when the cap was hit. It will not protect a production system from a pathological pattern on untrusted input, but it stops a runaway match list from freezing this tab while you are still testing by hand.",
        ],
      },
      {
        heading: "Why this is a javascript regex tester tool and not an ai prompt",
        body: [
          "Whether a pattern matches a given string has exactly one correct answer, which makes it a job for the regex engine rather than a model estimating what a pattern probably does. An AI model asked to trace a pattern by hand can miscount a capture group or misjudge a greedy quantifier, because it is reasoning about the pattern rather than running it.",
          "This javascript regex tester tool cannot make that particular mistake, since it never estimates: RegExp.exec either returns a match object or it returns null, and the result updates the moment you stop typing, with nothing sent over a network connection to get an answer.",
        ],
      },
    ],

    howTo: {
      name: "How to test a regular expression with this regex tester",
      steps: [
        {
          name: "Enter the pattern",
          text: "Type the pattern without its surrounding slashes, for example \\d+ to match one or more digits.",
        },
        {
          name: "Set the flags",
          text: "Add any combination of g, i, m, s, u and y, or leave the field blank. Every match is still found even without g, since it is forced on internally for the matching loop.",
        },
        {
          name: "Paste the test string",
          text: "Paste the text to search. It is matched entirely in your browser and never uploaded anywhere.",
        },
        {
          name: "Read the results",
          text: "Each match is listed with its character index and captured groups. An invalid pattern or flag shows the exact error the engine threw instead of a result table.",
        },
      ],
    },

    faq: [
      {
        question: "Is this a free online regex tester, and does it send my pattern or text anywhere?",
        answer:
          "Yes to both halves of that question. It costs nothing, and matching happens with RegExp.exec directly in your browser tab. Nothing you type into the pattern, flags or test string fields is uploaded, logged or stored, and it works exactly the same way with no network connection present.",
      },
      {
        question: "Why does it find every match even when I did not add the g flag?",
        answer:
          "Because a second copy of your expression is built internally with g forced on, used only for the matching loop. Your own flags are still what gets validated, so an invalid flag combination you entered is still reported correctly, but the match list itself is complete either way.",
      },
      {
        question: "Is this a javascript regex tester tool, or does it work for other languages?",
        answer:
          "It is specifically a javascript regex tester tool built on the browser's own RegExp object, so it reflects JavaScript's matching behaviour exactly, including its flag set and its treatment of unicode. Python, PCRE and RE2 differ from JavaScript in real ways, particularly around lookbehind and backreferences, so a pattern confirmed here is not automatically confirmed for a different engine.",
      },
      {
        question: "What does the index column actually mean?",
        answer:
          "It is the character offset where the match starts, counted from zero at the beginning of the test string. It is the same value found on the index property of the match object RegExp.exec returns, and it is what you would pass to slice or substring to extract that same match programmatically.",
      },
      {
        question: "How to test a regular expression for catastrophic backtracking?",
        answer:
          "Try it against a long string that nearly matches and then fails right at the end, since that shape is what triggers the worst case behaviour in nested quantifiers and shared alternation prefixes. This tool caps results at 500 matches so a pathological pattern cannot freeze the tab, but a slow pattern on a short test string is still a warning sign worth taking seriously.",
      },
      {
        question: "Why did my pattern show an error instead of a result table?",
        answer:
          "Either the pattern itself is not valid, commonly from an unbalanced parenthesis or an unclosed character class, or the flags entered are not a valid combination for a JavaScript expression. Either way the message shown is the real SyntaxError the RegExp engine threw, not a generic notice, so it usually names the exact problem.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/json-formatter-validator",
        label: "JSON formatter validator",
        description: "For validating the structure of a document once a regex has pulled a value out of it.",
      },
      {
        href: "/coding-prompts/regex-generator-prompt",
        label: "regex generator prompt",
        description: "For drafting a new pattern from examples once this tester has shown an existing one is wrong.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "SQL query prompt",
        description: "For the same pattern expressed as a database regex operator once its JavaScript form is confirmed.",
      },
      {
        href: "/coding-prompts/unit-test-prompt",
        label: "unit test prompt",
        description: "For turning a confirmed pattern and its edge cases into a permanent automated test suite.",
      },
    ],

    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
        label: "MDN: RegExp reference",
        description: "The browser documentation for the exact object and exec behaviour this tool is built on.",
      },
      {
        href: "https://tc39.es/ecma262/#sec-regexp-regular-expression-objects",
        label: "ECMA-262: RegExp objects",
        description: "The formal language specification defining JavaScript's pattern syntax and flag behaviour.",
      },
      {
        href: "https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS",
        label: "OWASP: regular expression denial of service",
        description: "The security reference for why a nested quantifier or shared alternation prefix is worth catching early.",
      },
      {
        href: "https://unicode.org/reports/tr18/",
        label: "Unicode Technical Standard 18: Unicode Regular Expressions",
        description: "The specification behind the u flag's unicode aware matching behaviour.",
      },
    ],
  },

  tags: ["regex", "regular expression", "developer", "pattern matching"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
