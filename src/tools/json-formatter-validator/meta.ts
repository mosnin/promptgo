import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "json-formatter-validator",
  name: "JSON Formatter & Validator",
  title: "JSON Formatter Validator",
  category: "data-developer-tools",
  summary:
    "Parses JSON with the browser's own JSON.parse, reports the exact syntax error when it fails, and pretty prints valid JSON with a chosen indent size.",

  seo: {
    primaryKeyword: "json formatter validator",
    keywords: [
      "json formatter validator",
      "free online json formatter",
      "json validator online tool",
      "how to validate json",
      "json pretty print tool",
    ],
    seoTitle: "JSON Formatter Validator: Format, Validate and Beautify JSON",
    seoDescription:
      "A free json formatter validator that parses, pretty prints and validates JSON in your browser, with the exact parse error shown when it fails.",
  },

  fields: [
    {
      kind: "textarea",
      token: "json",
      label: "JSON to format",
      help: "Paste a JSON object, array or value. It never leaves your browser.",
      placeholder: '{"name":"Ada","roles":["admin","editor"],"active":true}',
      example: '{"name":"Ada","roles":["admin","editor"],"active":true}',
      rows: 8,
    },
    {
      kind: "select",
      token: "indent",
      label: "Indent size",
      help: "How many spaces (or a tab) to use for each nesting level of the formatted output.",
      options: [
        { value: "2", label: "2 spaces" },
        { value: "4", label: "4 spaces" },
        { value: "tab", label: "Tab" },
      ],
      example: "2",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["JSON.parse and JSON.stringify, the browser's own JSON implementation"],
    testingNote:
      "Verified against a set of known correct inputs and outputs before publishing, including a plain object formatted at 2, 4 and tab indent sizes to confirm each produces genuinely different whitespace, a document with a missing closing brace that must return the real parser error rather than a generic message, and blank input that must be rejected before it ever reaches JSON.parse.",
  },

  article: {
    intro: [
      "A json formatter validator has one job: read whatever JSON you paste in and say, without ambiguity, whether it is valid, and if it is, format it so a human can actually read the structure instead of a single unbroken line of braces and commas.",
      "This one runs entirely on JSON.parse and JSON.stringify, the two methods built into every browser's JavaScript engine, rather than a hand rolled parser that might accept something the standard does not allow. When the input is not valid, the message shown is the real error the parser threw, including the character position, not a generic red warning.",
      "Formatting is the other half of the job. A minified API response or a config file saved without whitespace is technically readable but not practically so, and pretty printing it at a chosen indent size turns a wall of text back into a structure you can actually scan.",
    ],

    sections: [
      {
        heading: "How this json formatter validator checks your JSON",
        body: [
          "There is only one correct way to decide whether a document is valid JSON: try to parse it against the grammar the format defines, and see whether that succeeds. Guessing from indentation, or checking for balanced braces with a regular expression, catches some mistakes and misses others, because JSON's rules are more specific than balanced punctuation.",
          "JSON.parse implements that grammar exactly, since it is the same method a browser uses internally whenever a script calls fetch and reads a JSON response. Running your pasted document through the identical parser means the result here matches what your own code would actually do with the same input.",
        ],
      },
      {
        heading: "Why the parse error message matters more than a red X",
        body: [
          "A validator that only says invalid is not much of a validator on a document longer than a few lines, because it gives you nothing to search for. The error JSON.parse throws names what it expected, and the character position where parsing stopped, which is usually enough to jump straight to the mistake.",
          "That position is not always exactly on top of the typo. A missing comma is reported at the token after the gap, since that is the first place the parser can be certain something is wrong, but it still narrows a large document down to a handful of lines.",
        ],
      },
      {
        heading: "Choosing an indent size: 2 spaces, 4 spaces or a tab",
        body: [
          "JSON itself has no opinion on whitespace. Any amount of space, tab or newline between tokens is equally valid, which is why a minified file and a nicely indented one can represent the same data. The indent size only changes how the output looks, not whether it parses, which makes this a genuinely useful json pretty print tool for a minified API response as much as a config file.",
          "Two spaces keeps deeply nested structures narrow enough to read without horizontal scrolling, which is why it is the default here. Four spaces reads more like typical code indentation, and a tab lets each reader's own editor control the visible width without changing the file itself.",
        ],
        list: [
          "2 spaces: compact, the common default for config files and API responses",
          "4 spaces: matches typical source code indentation conventions",
          "Tab: width is controlled by the reader's own editor, not the file",
        ],
      },
      {
        heading: "What makes JSON invalid: the mistakes this tool actually catches",
        body: [
          "The most common cause of invalid JSON is a trailing comma left after the last item in an object or array, a habit carried over from languages that allow it. JSON does not, and it is one of the fastest ways to turn a document that looks fine into one that fails to parse.",
          "Single quoted strings, unquoted keys and comments are the other recurring causes. All three are legal in a JavaScript object literal, which is why code copied out of a script sometimes looks like JSON and is not: JSON requires double quotes everywhere and has no comment syntax at all.",
        ],
      },
      {
        heading: "Validating API responses and configuration files",
        body: [
          "JSON is the default format for most web API responses and a large share of developer config files, so a broken document usually breaks something downstream rather than just looking wrong. Running it through a json formatter validator before it goes into a build is faster than waiting for whatever consumes it to fail with a less specific error.",
          "The formatted output is useful once a document is confirmed valid too: pretty printed JSON is what most people actually want to read or paste into documentation, since the minified version a server returns is optimised for transfer size, not for a person looking at it.",
        ],
      },
      {
        heading: "Why this is a browser-side json formatter validator and not an ai prompt",
        body: [
          "Deciding whether a document is valid JSON has exactly one correct answer for a given input, which is a job for a parser rather than a model. An AI model asked to validate JSON can miss a trailing comma buried in a long document, or call a document valid when it is not, because it is pattern matching on what JSON usually looks like rather than actually parsing it against the grammar.",
          "This tool cannot make that mistake, because it never guesses: JSON.parse either succeeds or throws, nothing in between. The result updates the moment you stop typing, since there is no request to send, which makes it faster to fix a syntax error than pasting the document into a chat window and waiting for a reply.",
        ],
      },
    ],

    howTo: {
      name: "How to validate json and format it in your browser",
      steps: [
        {
          name: "Paste the JSON",
          text: "Paste an object, array or any other JSON value into the text box. It is parsed locally in your browser and never uploaded anywhere.",
        },
        {
          name: "Pick an indent size",
          text: "Choose 2 spaces, 4 spaces or a tab for the formatted output. This only changes how the result looks, never what it means.",
        },
        {
          name: "Read the result",
          text: "Valid JSON is pretty printed immediately, with a note on how many keys or items the top-level value has. Invalid JSON shows the exact error the parser threw.",
        },
        {
          name: "Fix and re-check",
          text: "If the input is invalid, use the reported character position to find the mistake, correct it, and the tool re-parses automatically as you type.",
        },
      ],
    },

    faq: [
      {
        question: "Is this a free online json formatter, and does it send my data anywhere?",
        answer:
          "Yes to both halves of that question: it costs nothing, and parsing and formatting happen with JSON.parse and JSON.stringify directly in your browser tab. Nothing you paste is uploaded, logged or stored, and it works the same way with no network connection at all.",
      },
      {
        question: "Why does the error message mention a character position instead of a line number?",
        answer:
          "That is what JSON.parse itself reports, and it is passed straight through rather than rewritten. For a short document a character position is usually just as fast to locate as a line number, and for a minified single-line document it is the only way to find the mistake.",
      },
      {
        question: "Are trailing commas ever valid in JSON?",
        answer:
          "No, never, even though they are legal in the JavaScript object and array literals JSON's syntax was based on. A comma after the final item or property in JSON is a syntax error, and it is one of the most common reasons a document copied from code fails to validate here.",
      },
      {
        question: "Will changing the indent size change the data itself?",
        answer:
          "No. JSON allows any amount of whitespace between tokens without changing what the document means, so switching between 2 spaces, 4 spaces and a tab only changes how the formatted output looks, never the values, keys or structure it represents.",
      },
      {
        question: "Can I use this as a json validator online tool for API responses?",
        answer:
          "Yes. Paste the raw response body in directly, including a minified single-line one, and this json validator online tool reports whether it parses and, if it does, formats it into a readable structure so you can check the fields it actually returned.",
      },
      {
        question: "What happens if I paste something that is not JSON at all?",
        answer:
          "The parser still tries to read it, fails at the first token that does not match the JSON grammar, and reports that position as the error. Plain prose, HTML or a JavaScript file are all rejected the same way, since none of them are valid JSON.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "API documentation prompt",
        description: "For writing up the endpoint once its JSON response has been checked and formatted here.",
      },
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description: "For understanding what a script does with a JSON structure once its shape is clear.",
      },
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description: "For the values inside a JSON export once the document itself is confirmed valid.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "SQL query prompt",
        description: "For querying a database column storing the same JSON this tool just validated.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.json.org/json-en.html",
        label: "JSON.org: Introducing JSON",
        description: "The original, plain language definition of the JSON grammar this tool validates against.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
        label: "MDN: JSON.parse and JSON.stringify reference",
        description: "The browser documentation for the exact two methods this tool's parsing and formatting are built on.",
      },
      {
        href: "https://ecma-international.org/publications-and-standards/standards/ecma-404/",
        label: "ECMA-404: The JSON Data Interchange Syntax",
        description: "The formal international standard defining valid JSON syntax.",
      },
      {
        href: "https://datatracker.ietf.org/doc/html/rfc8259",
        label: "RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format",
        description: "The IETF specification most web APIs cite when they describe their responses as JSON.",
      },
    ],
  },

  tags: ["json", "developer", "formatter", "validator"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
