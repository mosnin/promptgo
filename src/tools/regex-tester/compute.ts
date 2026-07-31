import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Runs a regular expression against a test string using the browser's own
 * RegExp engine, not a hand rolled matcher, and lists every match it finds.
 *
 * The user's pattern and flags are validated first, exactly as typed, so an
 * invalid pattern or an invalid flag combination is reported with the real
 * error JavaScript's own engine throws. Matching itself always runs with a
 * second, internal only expression that forces the "g" flag onto whatever
 * flags were supplied, deduplicated if "g" was already present, because
 * RegExp.exec only advances between calls and returns more than one match
 * when the global flag is set. Without that, a user who forgets "g" would
 * only ever see the first match, which is the single most common mistake
 * when testing a pattern by hand.
 */

const MAX_MATCHES = 500;

function withForcedGlobalFlag(flags: string): string {
  return flags.includes("g") ? flags : `${flags}g`;
}

export const compute: ComputeFn = (inputs) => {
  const pattern = String(inputs.pattern ?? "");
  const flags = String(inputs.flags ?? "");
  const testString = String(inputs.testString ?? "");

  if (!pattern.trim()) {
    return { kind: "error", message: "Enter a regular expression pattern to test." };
  }

  // Validate against the user's own flags first. This is the construction
  // that has to throw when the pattern or the flag combination is invalid,
  // so the error reported is the one that corresponds to what they typed.
  try {
    // eslint-disable-next-line no-new
    new RegExp(pattern, flags);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { kind: "error", message: reason };
  }

  // The user's flags are now known valid, so forcing "g" on for the actual
  // matching loop cannot introduce a new error they have not already seen
  // reported against their own input above.
  const matcher = new RegExp(pattern, withForcedGlobalFlag(flags));

  const rows: (string | number)[][] = [];
  let capped = false;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(testString)) !== null) {
    const groups = match.slice(1).map((group) => (group === undefined ? "" : group));
    rows.push([
      rows.length + 1,
      match[0],
      match.index,
      groups.length > 0 ? groups.join(", ") : "(none)",
    ]);

    // A zero length match (for example "a*" against "bbb") leaves
    // matcher.lastIndex exactly where it was, since nothing was consumed.
    // Without advancing it manually here, the next exec() call would find
    // the identical empty match at the identical position forever. This is
    // the one line standing between a pattern like this and a hung tab.
    if (match[0].length === 0) {
      matcher.lastIndex += 1;
    }

    if (rows.length >= MAX_MATCHES) {
      capped = true;
      break;
    }
  }

  const notes: string[] = [
    "Matched with the browser's own RegExp.exec run in a loop, so the result is exactly what this pattern does in real JavaScript code, not an approximation of it.",
  ];

  if (!flags.includes("g")) {
    notes.push(
      "Your flags did not include g. Every match is still listed below because g is forced onto an internal copy of the expression used only for the matching loop; your original flags are what get validated and reported if they are invalid.",
    );
  }

  if (capped) {
    notes.push(
      `Stopped after ${MAX_MATCHES} matches to keep the tab responsive. There may be more matches in the test string than are listed here.`,
    );
  }

  if (rows.length === 0) {
    return {
      kind: "value",
      headline: { label: "Matches found", value: "0" },
      notes: ["No matches. This pattern did not match anywhere in the test string.", ...notes],
    };
  }

  return {
    kind: "table",
    caption: `${rows.length} match${rows.length === 1 ? "" : "es"} found`,
    columns: ["#", "Match", "Index", "Captured groups"],
    rows,
    notes,
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "finds multiple matches and reports exact character indices",
    inputs: { pattern: "\\d+", flags: "g", testString: "a1 b22 c333" },
    check: (result) =>
      result.kind === "table" &&
      result.rows.length === 3 &&
      result.rows[0][1] === "1" &&
      result.rows[0][2] === 1 &&
      result.rows[1][1] === "22" &&
      result.rows[1][2] === 4 &&
      result.rows[2][1] === "333" &&
      result.rows[2][2] === 8,
  },
  {
    name: "reports captured group values, including an empty string for an unmatched optional group",
    inputs: { pattern: "(\\d+)(x)?", flags: "g", testString: "12 34x" },
    check: (result) =>
      result.kind === "table" &&
      result.rows.length === 2 &&
      result.rows[0][1] === "12" &&
      result.rows[0][2] === 0 &&
      result.rows[0][3] === "12, " &&
      result.rows[1][1] === "34x" &&
      result.rows[1][2] === 3 &&
      result.rows[1][3] === "34, x",
  },
  {
    name: "rejects an invalid pattern with an unbalanced parenthesis using the engine's own message",
    inputs: { pattern: "(abc", flags: "", testString: "abc" },
    check: (result) => result.kind === "error" && result.message.length > 0,
  },
  {
    name: "rejects an invalid flag using the engine's own message",
    inputs: { pattern: "abc", flags: "q", testString: "abc" },
    check: (result) => result.kind === "error" && result.message.length > 0,
  },
  {
    name: "terminates and returns a sane result for a zero length match pattern instead of hanging",
    inputs: { pattern: "a*", flags: "", testString: "bbb" },
    check: (result) =>
      result.kind === "table" &&
      result.rows.length === 4 &&
      result.rows.map((row) => row[1]).every((value) => value === "") &&
      result.rows.map((row) => row[2]).join(",") === "0,1,2,3",
  },
  {
    name: "reports a clear no matches result rather than an empty table",
    inputs: { pattern: "zzz", flags: "g", testString: "hello world" },
    check: (result) =>
      result.kind === "value" && result.headline.value === "0" && result.headline.label === "Matches found",
  },
  {
    name: "finds every match even when the user did not include the g flag",
    inputs: { pattern: "\\d+", flags: "", testString: "a1 b2 c3" },
    check: (result) =>
      result.kind === "table" &&
      result.rows.length === 3 &&
      result.rows.map((row) => row[1]).join(",") === "1,2,3" &&
      result.notes?.some((note) => note.includes("Your flags did not include g")) === true,
  },
  {
    name: "rejects a blank pattern before it ever reaches RegExp",
    inputs: { pattern: "   ", flags: "g", testString: "anything" },
    check: (result) => result.kind === "error",
  },
  {
    name: "still runs the match on a blank test string rather than treating it as an error",
    inputs: { pattern: "^$", flags: "", testString: "" },
    check: (result) => result.kind === "table" && result.rows.length === 1 && result.rows[0][1] === "",
  },
];
