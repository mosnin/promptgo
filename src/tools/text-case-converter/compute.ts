import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Case conversion helpers. Each one is a pure string transform with no
 * locale, network or DOM dependency, so the same input always produces the
 * same output and can be checked character by character in the self tests
 * below.
 */

/**
 * Sentence case: lowercase everything, then capitalise the first letter of
 * the whole string and the first letter following a run of sentence ending
 * punctuation (. ! ?) that is itself followed by whitespace. Punctuation not
 * followed by whitespace (an abbreviation, a decimal point) is left alone,
 * since it is not a sentence boundary.
 */
function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(
    /(^\s*[a-z])|([.!?]+\s+)([a-z])/g,
    (_match, leading: string | undefined, boundary: string | undefined, letter: string | undefined) => {
      if (leading !== undefined) return leading.toUpperCase();
      return `${boundary}${(letter as string).toUpperCase()}`;
    },
  );
}

/**
 * Title case: a word is a whitespace separated token. Every token gets its
 * first character capitalised and the rest lowercased. Whitespace runs
 * (single spaces, doubled spaces, tabs) are preserved exactly as found.
 */
function toTitleCase(text: string): string {
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (token === "" || /^\s+$/.test(token)) return token;
      return token.slice(0, 1).toUpperCase() + token.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Alternating case: only alphabetic characters advance the upper/lower
 * alternation. A space, digit or punctuation mark is copied through
 * unchanged and does not consume a turn, so "Hello World" alternates as
 * H-e-L-l-O w-O-r-L-d rather than resetting or skipping a beat at the space.
 */
function toAlternatingCase(text: string): string {
  let alphaIndex = 0;
  let result = "";
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      result += alphaIndex % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
      alphaIndex += 1;
    } else {
      result += char;
    }
  }
  return result;
}

const MODE_LABEL: Record<string, string> = {
  upper: "UPPER CASE",
  lower: "lower case",
  sentence: "Sentence case",
  title: "Title Case",
  alternating: "aLtErNaTiNg CaSe",
};

export const compute: ComputeFn = (inputs) => {
  const text = String(inputs.text ?? "");
  const targetCase = String(inputs.targetCase ?? "");

  if (!text.trim()) {
    return { kind: "error", message: "Enter some text to convert." };
  }

  let value: string;
  switch (targetCase) {
    case "upper":
      value = text.toUpperCase();
      break;
    case "lower":
      value = text.toLowerCase();
      break;
    case "sentence":
      value = toSentenceCase(text);
      break;
    case "title":
      value = toTitleCase(text);
      break;
    case "alternating":
      value = toAlternatingCase(text);
      break;
    default:
      return { kind: "error", message: "Choose which case to convert the text to." };
  }

  const modeLabel = MODE_LABEL[targetCase];

  return {
    kind: "text",
    label: `Converted text (${modeLabel})`,
    value,
    monospace: false,
    notes: [
      "Sentence case treats a period, exclamation mark or question mark followed by whitespace as the end of a sentence and capitalises the next letter after it.",
      "Alternating case only counts letters when deciding upper or lower. Spaces, numbers and punctuation pass through untouched and never break the alternating pattern.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "upper case converts a mixed case sentence",
    inputs: { text: "the Quick Brown Fox Jumps Over The Lazy Dog", targetCase: "upper" },
    check: (result) => result.kind === "text" && result.value === "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG",
  },
  {
    name: "lower case converts a mixed case sentence",
    inputs: { text: "the Quick Brown Fox Jumps Over The Lazy Dog", targetCase: "lower" },
    check: (result) => result.kind === "text" && result.value === "the quick brown fox jumps over the lazy dog",
  },
  {
    name: "title case capitalises every word and lowercases the rest",
    inputs: { text: "the Quick Brown Fox Jumps Over The Lazy Dog", targetCase: "title" },
    check: (result) => result.kind === "text" && result.value === "The Quick Brown Fox Jumps Over The Lazy Dog",
  },
  {
    name: "sentence case capitalises after each sentence ending punctuation mark",
    inputs: { text: "the QUICK brown fox. jumps over! the lazy dog? yes.", targetCase: "sentence" },
    check: (result) => result.kind === "text" && result.value === "The quick brown fox. Jumps over! The lazy dog? Yes.",
  },
  {
    name: "alternating case flips case on letters only and skips the space without breaking the pattern",
    inputs: { text: "Hello World", targetCase: "alternating" },
    check: (result) => result.kind === "text" && result.value === "HeLlO wOrLd",
  },
  {
    name: "title case preserves a doubled space between words rather than collapsing it",
    inputs: { text: "hello   world", targetCase: "title" },
    check: (result) => result.kind === "text" && result.value === "Hello   World",
  },
  {
    name: "rejects blank input",
    inputs: { text: "   ", targetCase: "upper" },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects an unrecognised target case",
    inputs: { text: "some text", targetCase: "diagonal" },
    check: (result) => result.kind === "error",
  },
];
