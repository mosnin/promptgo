import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "csv-to-json-converter",
  name: "CSV to JSON Converter",
  title: "CSV to JSON Converter",
  category: "data-developer-tools",
  summary:
    "Parses CSV with a real character by character RFC 4180 aware reader, so a comma or line break quoted inside a field never breaks a row, then converts it to pretty printed JSON.",

  seo: {
    primaryKeyword: "csv to json converter",
    keywords: [
      "csv to json converter",
      "free csv to json converter tool",
      "how to convert csv to json",
      "csv to json converter online",
      "best csv to json converter",
    ],
    seoTitle: "CSV to JSON Converter: Free RFC 4180 Parser Online",
    seoDescription:
      "A free csv to json converter that reads quoted fields and embedded commas correctly, then turns each row into a JSON object or array in your browser.",
  },

  fields: [
    {
      kind: "textarea",
      token: "csvText",
      label: "CSV to convert",
      help: "Paste raw CSV. A field wrapped in double quotes can safely contain a comma or a line break. It never leaves your browser.",
      placeholder: "name,age,city\nAda,36,London\nGrace,85,New York",
      example: "name,age,city\nAda,36,London\nGrace,85,New York",
      rows: 8,
    },
    {
      kind: "checkbox",
      token: "hasHeaderRow",
      label: "First row is a header row",
      help: "On: the first row becomes the object keys. Off: every row is converted as a plain array of values.",
      example: true,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["RFC 4180, section 2 (the CSV format specification)"],
    testingNote:
      "Verified by tracing the character by character parser state machine by hand against a set of known-correct cases before publishing, including a field containing an embedded comma inside double quotes, a field containing a doubled double-quote as an escaped literal quote, a row with fewer fields than the header, a header-only input that must return an empty array rather than an error, and blank input that must be rejected before parsing starts.",
  },

  article: {
    intro: [
      "A csv to json converter has one real job beyond swapping a file extension: read the rows correctly even when a field contains the exact character CSV uses to separate fields. This one runs a small character by character parser built to RFC 4180, the specification most spreadsheet exports and database dumps actually follow, rather than the one line `split(\",\")` that looks like it works until the first quoted field arrives.",
      "Paste CSV in, tell it whether the first row is a header, and it returns pretty printed JSON: an array of objects keyed by the header names, or a plain array of arrays if there is no header to key by. Nothing is uploaded anywhere, and parsing happens the moment you stop typing.",
      "The rest of this page explains why a naive comma split is the most common bug in a hand rolled CSV reader, what quoting rules this tool follows, and how the header row and missing value behaviour work.",
    ],

    sections: [
      {
        heading: "Why naive comma splitting breaks real CSV",
        body: [
          "The obvious way to parse a line of CSV is `line.split(\",\")`, and it works right up until a field legitimately contains a comma. A name field holding \"Smith, Jane\" contains the exact delimiter the split is looking for, so a naive parser cuts it into two columns that were never meant to be separate, and every column after that shifts one position to the right for the rest of the row.",
          "RFC 4180 solves this with quoting: a field that needs to contain a comma, a line break, or a literal double quote is wrapped in double quotes, and inside those quotes the delimiter loses its special meaning. Reading that correctly requires tracking whether the parser is currently inside a quoted field, which a plain string split has no concept of. This is what separates a real csv to json converter from a five minute regex written for one file.",
        ],
      },
      {
        heading: "How this tool reads quoted fields",
        body: [
          "The parser walks the input one character at a time and keeps a single flag: is the cursor currently inside a quoted field. Outside quotes, a comma ends a field and a line break ends a row. Inside quotes, both are read as plain text, because the RFC treats them as data once a quote has opened.",
          "RFC 4180 also defines a doubled double-quote inside a quoted field as an escaped literal quote character. `\"She said \"\"hello\"\" today\"` becomes `She said \"hello\" today`, with the doubled quotes collapsed to one real quote each and the surrounding quote marks stripped.",
        ],
        list: [
          "Unquoted comma: ends the current field",
          "Unquoted line break: ends the current row",
          "Comma or line break inside double quotes: kept as literal text",
          "A doubled double-quote inside quotes: one literal quote character",
        ],
      },
      {
        heading: "Header rows, missing values, and extra columns",
        body: [
          "With the header row option on, the first parsed row supplies the object keys, trimmed of whitespace, and every row after it becomes one JSON object mapping each header name to the value in the matching column. A data row with fewer fields than the header fills the missing keys with an empty string rather than dropping them, so every object shares the same set of keys.",
          "A row with more fields than the header has the extra values ignored, since there is no header name to attach them to. This is a documented choice: a row longer than its header usually means the header is missing a column, and the fix belongs in the source data, not an invented key name like column5.",
        ],
      },
      {
        heading: "Converting CSV without a header row",
        body: [
          "Turning the header row option off treats every line, including the first, as data, and the result becomes a plain array of arrays, one per row, each holding the row's raw field values in order. This is the right shape for CSV that never had column names, such as a raw export from a legacy system.",
          "Nothing about the parsing itself changes between the two modes. The same quote-aware reader runs either way, so a comma tucked inside a quoted field is preserved regardless of whether that row is treated as a header.",
        ],
      },
      {
        heading: "An empty result is not the same as an error",
        body: [
          "A CSV document that consists of only a header line, with no data rows underneath, is valid input and produces a valid, empty JSON array, not an error message. Rejecting it outright would be wrong: a header-only export is a normal state for a report that legitimately returned zero rows.",
          "Blank or whitespace-only input is the one case actually rejected, since there is nothing in it to parse. That distinction, between genuinely empty input and a header with zero matching rows, is deliberate rather than an oversight.",
        ],
      },
      {
        heading: "Using converted JSON in code and API calls",
        body: [
          "Most languages and every JavaScript runtime read JSON natively, which is why converting a CSV export to JSON before it reaches application code avoids writing a bespoke parser inside that codebase. A spreadsheet export, a database table dumped for a migration, or a CSV attachment from a third party API all become a normal array of objects a script can loop over.",
          "The output is the same structure produced by JSON.stringify with a two space indent, so it pastes directly into a test fixture or a small script with no reformatting in between.",
        ],
      },
    ],

    howTo: {
      name: "How to use this csv to json converter online",
      steps: [
        {
          name: "Paste the CSV",
          text: "Paste raw CSV text into the box, including any fields wrapped in double quotes. It is parsed locally in your browser and never uploaded anywhere.",
        },
        {
          name: "Set the header row option",
          text: "Leave it on if the first line names the columns, so the output becomes an array of objects. Turn it off if every line is data, so the output becomes an array of arrays.",
        },
        {
          name: "Read the converted JSON",
          text: "The pretty printed JSON updates as you type, with a note confirming how many columns and rows were found and how quoted fields were handled.",
        },
        {
          name: "Copy the result",
          text: "Copy the JSON output straight into a script or a test fixture. It is ready to use exactly as shown, with no further formatting needed.",
        },
      ],
    },

    faq: [
      {
        question: "Is this a free csv to json converter tool, and does it upload my data?",
        answer:
          "Yes to both. It costs nothing to use, and every row is parsed and converted directly in your browser tab with the parser described above. Nothing you paste is sent to a server, and it keeps working with no network connection.",
      },
      {
        question: "How to convert csv to json when a field contains a comma?",
        answer:
          "Wrap that field in double quotes in the source CSV, the same convention spreadsheet software uses on export. This tool reads a quoted comma as literal text rather than a column break, so the field survives the conversion intact.",
      },
      {
        question: "What happens to a double quote character inside a field?",
        answer:
          "If the source CSV escaped it as a doubled double-quote inside a quoted field, it is converted back into a single literal quote character in the JSON output. An unescaped stray quote in an unquoted field is read as plain text, since RFC 4180 only assigns meaning to quotes that open or close a quoted field.",
      },
      {
        question: "Why did a data row come out with an empty string for one column?",
        answer:
          "That row had fewer fields than the header row, usually meaning a trailing value was left blank in the source spreadsheet. Rather than dropping that key, the converter fills it with an empty string so every object in the result shares the same set of keys.",
      },
      {
        question: "Can I use this as a csv to json converter online for spreadsheet exports?",
        answer:
          "Yes. Export a sheet as CSV, paste the raw text in, and it converts into a JSON array whether the sheet used a header row or not. Fields quoted on export, including ones containing commas or line breaks, are read exactly as the export intended.",
      },
      {
        question: "Is this the best csv to json converter for a header-only file?",
        answer:
          "It is built to handle that case correctly: a CSV file with only a header row and no data underneath produces a valid, empty JSON array rather than an error, since a header with zero matching rows is a legitimate result, not a mistake.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/json-formatter-validator",
        label: "JSON formatter validator",
        description: "For pretty printing or validating the JSON this converter produces before it goes anywhere else.",
      },
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description: "For a reviewable cleaning plan covering the values inside a CSV export once it has been converted here.",
      },
      {
        href: "/data-analysis-prompts/python-analysis-prompt",
        label: "Python analysis prompt",
        description: "For pandas code that loads the converted JSON and reports its own shape and null counts as it runs.",
      },
      {
        href: "/coding-prompts/sql-query-prompt",
        label: "SQL query prompt",
        description: "For querying a database table once the same rows have been converted from CSV into JSON here.",
      },
    ],

    externalLinks: [
      {
        href: "https://datatracker.ietf.org/doc/html/rfc4180",
        label: "RFC 4180: Common Format and MIME Type for CSV Files",
        description: "The specification this parser's quoting and escaping rules are built directly against.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
        label: "MDN: JSON.stringify reference",
        description: "The browser documentation for the method this tool uses to pretty print the converted result.",
      },
      {
        href: "https://www.w3.org/TR/tabular-data-model/",
        label: "W3C: Model for Tabular Data and Metadata on the Web",
        description: "The W3C recommendation covering how CSV and other tabular formats map onto a structured data model.",
      },
      {
        href: "https://www.iana.org/assignments/media-types/text/csv",
        label: "IANA: text/csv media type registration",
        description: "The official registration of the text/csv media type, referencing RFC 4180 as its format definition.",
      },
    ],
  },

  tags: ["csv", "json", "developer", "converter"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
