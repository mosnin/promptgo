import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Line based diff between two blocks of text, using the textbook longest
 * common subsequence (LCS) algorithm: the same dynamic programming method
 * described in most algorithms references, and conceptually the basis of
 * the Unix diff utility since Hunt and McIlroy's 1976 paper.
 *
 * A naive comparison lines text A's first line against text B's first
 * line, its second against its second, and so on. That approach reports
 * every line after a single insertion or deletion as changed, because the
 * two texts are permanently out of step from that point on. LCS instead
 * finds the longest ordered sequence of lines common to both texts, so a
 * line that appears unchanged, just at a shifted position, is correctly
 * reported as unchanged, and only the lines that actually differ are
 * reported as removed or added.
 *
 * Line splitting: each text is split on "\n". A blank line and any
 * trailing whitespace inside a line are preserved exactly as typed, never
 * trimmed, since both are meaningful content a diff should be able to
 * show. The one special case is a fully empty string, which splits into
 * zero lines rather than one empty line, since an empty field has nothing
 * to compare. A string that is only a newline character therefore splits
 * into two empty lines, matching how many line breaks it visually
 * contains.
 *
 * The DP table dp[i][j] holds the length of the longest common subsequence
 * of the two line arrays starting at index i in A and index j in B, filled
 * from the end of both arrays backwards, the standard O(n*m) construction.
 * Backtracking forward from dp[0][0] reproduces the classic diff trace: a
 * line identical at the current position in both arrays is "equal";
 * otherwise the trace follows whichever neighbouring cell holds the longer
 * remaining subsequence, consuming a line from A ("removed") or from B
 * ("added"). A tie is resolved in favour of "removed", which is what
 * produces the conventional "everything removed, then everything added"
 * order when two texts share no common line at all.
 */

type DiffOp = { type: "equal" | "removed" | "added"; line: string };

function splitLines(text: string): string[] {
  return text === "" ? [] : text.split("\n");
}

function diffLines(a: string[], b: string[]): DiffOp[] {
  const n = a.length;
  const m = b.length;

  // dp[i][j] = length of the LCS of a[i:] and b[j:]. Extra row and column
  // for i === n or j === m stay at their fill(0) default: the LCS of an
  // empty slice with anything is zero.
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: "equal", line: a[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: "removed", line: a[i] });
      i += 1;
    } else {
      ops.push({ type: "added", line: b[j] });
      j += 1;
    }
  }
  while (i < n) {
    ops.push({ type: "removed", line: a[i] });
    i += 1;
  }
  while (j < m) {
    ops.push({ type: "added", line: b[j] });
    j += 1;
  }
  return ops;
}

export const compute: ComputeFn = (inputs) => {
  const textA = String(inputs.textA ?? "");
  const textB = String(inputs.textB ?? "");

  if (textA.trim() === "" && textB.trim() === "") {
    return {
      kind: "error",
      message: "Enter text in at least one of the two boxes. There is nothing to compare when both are blank.",
    };
  }

  const linesA = splitLines(textA);
  const linesB = splitLines(textB);
  const ops = diffLines(linesA, linesB);

  let linesAdded = 0;
  let linesRemoved = 0;
  let linesUnchanged = 0;
  const beforeLines: string[] = [];
  const afterLines: string[] = [];

  for (const op of ops) {
    if (op.type === "equal") {
      linesUnchanged += 1;
      beforeLines.push(`  ${op.line}`);
      afterLines.push(`  ${op.line}`);
    } else if (op.type === "removed") {
      linesRemoved += 1;
      beforeLines.push(`- ${op.line}`);
    } else {
      linesAdded += 1;
      afterLines.push(`+ ${op.line}`);
    }
  }

  const notes = [
    `${linesUnchanged} line${linesUnchanged === 1 ? "" : "s"} unchanged, ${linesRemoved} line${
      linesRemoved === 1 ? "" : "s"
    } removed, ${linesAdded} line${linesAdded === 1 ? "" : "s"} added.`,
    "Lines are matched with a longest common subsequence diff, so a line that sits unchanged before or after an edit stays marked unchanged instead of shifting into a false change.",
  ];

  if (linesAdded === 0 && linesRemoved === 0) {
    notes.unshift("No differences found. The two texts are identical line for line.");
  }

  return {
    kind: "diff",
    label: "Line diff",
    before: beforeLines.join("\n"),
    after: afterLines.join("\n"),
    notes,
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "identical texts report no differences, every line marked equal",
    inputs: { textA: "Line one\nLine two\nLine three", textB: "Line one\nLine two\nLine three" },
    check: (result) =>
      result.kind === "diff" &&
      result.before === "  Line one\n  Line two\n  Line three" &&
      result.after === "  Line one\n  Line two\n  Line three" &&
      result.notes?.[0] === "No differences found. The two texts are identical line for line.",
  },
  {
    name: "one line changed in the middle reports one removed and one added, not three changed",
    inputs: { textA: "Alpha\nBeta\nGamma", textB: "Alpha\nBETA\nGamma" },
    check: (result) =>
      result.kind === "diff" &&
      result.before === "  Alpha\n- Beta\n  Gamma" &&
      result.after === "  Alpha\n+ BETA\n  Gamma" &&
      (result.notes ?? []).some((n) => n.includes("2 lines unchanged, 1 line removed, 1 line added")),
  },
  {
    name: "a line added at the end leaves the earlier lines marked equal",
    inputs: { textA: "Alpha\nBeta", textB: "Alpha\nBeta\nGamma" },
    check: (result) =>
      result.kind === "diff" &&
      result.before === "  Alpha\n  Beta" &&
      result.after === "  Alpha\n  Beta\n+ Gamma",
  },
  {
    name: "a line removed from the middle leaves the surrounding lines marked equal",
    inputs: { textA: "X\nY\nZ", textB: "X\nZ" },
    check: (result) => result.kind === "diff" && result.before === "  X\n- Y\n  Z" && result.after === "  X\n  Z",
  },
  {
    name: "completely different texts report everything removed then everything added",
    inputs: { textA: "P\nQ", textB: "R\nS" },
    check: (result) =>
      result.kind === "diff" &&
      result.before === "- P\n- Q" &&
      result.after === "+ R\n+ S" &&
      (result.notes ?? []).some((n) => n.includes("0 lines unchanged, 2 lines removed, 2 lines added")),
  },
  {
    name: "one blank side is a valid diff, not an error: everything on the other side is added",
    inputs: { textA: "", textB: "Hello\nWorld" },
    check: (result) => result.kind === "diff" && result.before === "" && result.after === "+ Hello\n+ World",
  },
  {
    name: "both sides blank is rejected as an error, since there is nothing to compare",
    inputs: { textA: "", textB: "   " },
    check: (result) => result.kind === "error" && result.message.toLowerCase().includes("blank"),
  },
  {
    name: "does not throw on the field example values and reports the hand traced diff",
    inputs: {
      textA: "The quick brown fox jumps over the lazy dog.\nA second line here.",
      textB: "The quick brown fox leaps over the lazy dog.\nA second line here.\nA third new line.",
    },
    check: (result) =>
      result.kind === "diff" &&
      result.before === "- The quick brown fox jumps over the lazy dog.\n  A second line here." &&
      result.after ===
        "+ The quick brown fox leaps over the lazy dog.\n  A second line here.\n+ A third new line.",
  },
];
