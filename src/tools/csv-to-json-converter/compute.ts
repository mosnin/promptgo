import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * A small RFC 4180 aware CSV parser: a character by character state machine
 * that tracks whether the cursor is currently inside a double-quoted field.
 *
 * A naive `.split(",")` breaks the moment a field legitimately contains a
 * comma, because it has no concept of quoting at all. This parser tracks
 * quote state explicitly, so a comma or newline inside a quoted field is
 * read as literal text rather than a delimiter, and a doubled double-quote
 * (`""`) inside a quoted field is read as one literal `"` character, exactly
 * as RFC 4180 section 2 defines.
 */
function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const len = raw.length;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  while (i < len) {
    const char = raw[i];

    if (inQuotes) {
      if (char === '"') {
        if (raw[i + 1] === '"') {
          // A doubled quote inside a quoted field is one literal quote.
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (char === ",") {
      pushField();
      i += 1;
      continue;
    }

    if (char === "\r") {
      // Treat CRLF and a lone CR both as one row boundary.
      if (raw[i + 1] === "\n") {
        pushRow();
        i += 2;
        continue;
      }
      pushRow();
      i += 1;
      continue;
    }

    if (char === "\n") {
      pushRow();
      i += 1;
      continue;
    }

    field += char;
    i += 1;
  }

  // The final field and row, for input that does not end with a newline.
  if (field.length > 0 || row.length > 0) {
    pushRow();
  }

  // A trailing newline at the end of the input produces one fully empty
  // row (a single empty-string field) that is not real data, so drop it.
  // A genuinely blank line in the middle of the input is kept.
  if (rows.length > 0) {
    const last = rows[rows.length - 1];
    if (last.length === 1 && last[0] === "") {
      rows.pop();
    }
  }

  return rows;
}

export const compute: ComputeFn = (inputs) => {
  const raw = String(inputs.csvText ?? "");
  const hasHeaderRow = Boolean(inputs.hasHeaderRow);

  if (!raw.trim()) {
    return { kind: "error", message: "Paste some CSV text to convert." };
  }

  const rows = parseCsv(raw);

  if (rows.length === 0) {
    return { kind: "error", message: "Paste some CSV text to convert." };
  }

  let result: unknown;
  const notes: string[] = [];

  if (hasHeaderRow) {
    const headers = rows[0].map((h) => h.trim());
    const dataRows = rows.slice(1);

    result = dataRows.map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        // A short row (fewer fields than headers) fills the missing
        // columns with an empty string. A long row (more fields than
        // headers) has its extra fields ignored, since there is no header
        // name to attach them to.
        obj[header] = idx < r.length ? r[idx] : "";
      });
      return obj;
    });

    notes.push(
      `First row was used as the header, giving ${headers.length} column${headers.length === 1 ? "" : "s"} and ${dataRows.length} data row${dataRows.length === 1 ? "" : "s"}.`,
    );
    if (dataRows.length === 0) {
      notes.push("No data rows were found after the header, so the result is an empty array.");
    }
  } else {
    result = rows;
    notes.push(
      `No header row was used, so every one of the ${rows.length} row${rows.length === 1 ? "" : "s"} became an array of column values instead of a keyed object.`,
    );
  }

  notes.push(
    "Fields wrapped in double quotes may contain commas or line breaks without being treated as a new column or row, and a doubled double-quote inside a quoted field (\"\") is read as one literal quote character, per RFC 4180.",
  );

  return {
    kind: "text",
    label: "Converted JSON",
    value: JSON.stringify(result, null, 2),
    monospace: true,
    notes,
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "converts a simple CSV with a header row into an array of objects",
    inputs: { csvText: "name,age,city\nAda,36,London\nGrace,85,New York", hasHeaderRow: true },
    check: (result) =>
      result.kind === "text" &&
      result.value ===
        '[\n  {\n    "name": "Ada",\n    "age": "36",\n    "city": "London"\n  },\n  {\n    "name": "Grace",\n    "age": "85",\n    "city": "New York"\n  }\n]',
  },
  {
    name: "keeps a comma inside a quoted field as literal text instead of splitting into an extra column",
    inputs: {
      csvText: 'name,bio\nAda,"Countess, mathematician"\nGrace,Admiral',
      hasHeaderRow: true,
    },
    check: (result) =>
      result.kind === "text" &&
      result.value ===
        '[\n  {\n    "name": "Ada",\n    "bio": "Countess, mathematician"\n  },\n  {\n    "name": "Grace",\n    "bio": "Admiral"\n  }\n]',
  },
  {
    name: "unescapes a doubled double-quote inside a quoted field into one literal quote",
    inputs: { csvText: 'name,quote\nAda,"She said ""hello"" today"', hasHeaderRow: true },
    check: (result) =>
      result.kind === "text" &&
      result.value === '[\n  {\n    "name": "Ada",\n    "quote": "She said \\"hello\\" today"\n  }\n]',
  },
  {
    name: "with hasHeaderRow off, produces an array of arrays instead of an array of objects",
    inputs: { csvText: "Ada,36,London\nGrace,85,New York", hasHeaderRow: false },
    check: (result) =>
      result.kind === "text" &&
      result.value ===
        '[\n  [\n    "Ada",\n    "36",\n    "London"\n  ],\n  [\n    "Grace",\n    "85",\n    "New York"\n  ]\n]',
  },
  {
    name: "fills a missing trailing value with an empty string when a row has fewer fields than the header",
    inputs: { csvText: "name,age,city\nAda,36,London\nGrace,85", hasHeaderRow: true },
    check: (result) =>
      result.kind === "text" &&
      result.value ===
        '[\n  {\n    "name": "Ada",\n    "age": "36",\n    "city": "London"\n  },\n  {\n    "name": "Grace",\n    "age": "85",\n    "city": ""\n  }\n]',
  },
  {
    name: "rejects blank input",
    inputs: { csvText: "   ", hasHeaderRow: true },
    check: (result) => result.kind === "error",
  },
  {
    name: "a header-only CSV produces a valid empty array, not an error",
    inputs: { csvText: "name,age,city", hasHeaderRow: true },
    check: (result) => result.kind === "text" && result.value === "[]",
  },
];
