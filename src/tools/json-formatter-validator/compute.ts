import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Parses and pretty prints a JSON document using the browser's own JSON
 * implementation, not a hand rolled parser.
 *
 * JSON.parse either succeeds, in which case the document is valid by
 * definition, or throws a SyntaxError whose message names the character
 * position of the problem. That thrown message is passed straight through
 * rather than replaced with a generic "invalid JSON" string, since the
 * position it names is usually the fastest way to find the actual mistake
 * in a large document.
 */
export const compute: ComputeFn = (inputs) => {
  const raw = String(inputs.json ?? "");
  const indentToken = String(inputs.indent ?? "2");

  if (!raw.trim()) {
    return { kind: "error", message: "Paste some JSON to format and validate." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { kind: "error", message: `Invalid JSON: ${reason}` };
  }

  const indent = indentToken === "tab" ? "\t" : Number(indentToken);
  const pretty = JSON.stringify(parsed, null, indent);

  const notes: string[] = [
    "Parsed and re-serialised with the browser's own JSON.parse and JSON.stringify, so the formatted output is exactly what the JSON standard defines rather than an approximation.",
  ];

  if (Array.isArray(parsed)) {
    notes.push(`Top-level value is an array with ${parsed.length} item${parsed.length === 1 ? "" : "s"}.`);
  } else if (parsed !== null && typeof parsed === "object") {
    const keyCount = Object.keys(parsed as Record<string, unknown>).length;
    notes.push(`Top-level value is an object with ${keyCount} key${keyCount === 1 ? "" : "s"}.`);
  } else {
    notes.push("Top-level value is a single JSON primitive, not an object or array.");
  }

  return {
    kind: "text",
    label: "Formatted JSON",
    value: pretty,
    monospace: true,
    notes,
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "formats a simple object with a 2 space indent",
    inputs: { json: '{"name":"Ada","active":true}', indent: "2" },
    check: (result) =>
      result.kind === "text" &&
      result.value === '{\n  "name": "Ada",\n  "active": true\n}' &&
      result.notes?.some((note) => note.includes("2 keys")) === true,
  },
  {
    name: "formats the same object with a 4 space indent to prove the indent option changes the output",
    inputs: { json: '{"name":"Ada","active":true}', indent: "4" },
    check: (result) =>
      result.kind === "text" && result.value === '{\n    "name": "Ada",\n    "active": true\n}',
  },
  {
    name: "formats with a tab indent",
    inputs: { json: '{"name":"Ada","active":true}', indent: "tab" },
    check: (result) =>
      result.kind === "text" && result.value === '{\n\t"name": "Ada",\n\t"active": true\n}',
  },
  {
    name: "counts the items in a top-level array",
    inputs: { json: "[1,2,3]", indent: "2" },
    check: (result) =>
      result.kind === "text" &&
      result.value === "[\n  1,\n  2,\n  3\n]" &&
      result.notes?.some((note) => note.includes("3 items")) === true,
  },
  {
    name: "rejects JSON with a missing closing brace",
    inputs: { json: '{"name":"Ada"', indent: "2" },
    check: (result) => result.kind === "error" && result.message.startsWith("Invalid JSON:"),
  },
  {
    name: "rejects blank input",
    inputs: { json: "   ", indent: "2" },
    check: (result) => result.kind === "error",
  },
];
