import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Turns a title or phrase into a url slug.
 *
 * The transform is four deterministic steps, in this exact order: lowercase
 * the input if requested, replace every run of characters that is not
 * a-z/A-Z/0-9 with a single separator, strip any separator left at the start
 * or end, then collapse any run of repeated separator characters into one.
 * No external slugify library is involved, so the behaviour is fully defined
 * by the regular expressions below rather than a dependency's own rules for
 * accented characters or stop words.
 */
export const compute: ComputeFn = (inputs) => {
  const rawTitle = String(inputs.title ?? "");
  const separatorInput = String(inputs.separator ?? "-");
  const forceLowercase = Boolean(inputs.lowercase);

  const trimmed = rawTitle.trim();
  if (!trimmed) {
    return { kind: "error", message: "Enter a title or phrase to turn into a slug." };
  }

  const separator = separatorInput === "_" ? "_" : "-";
  const separatorPattern = separator === "-" ? "\\-" : "_";

  let working = forceLowercase ? trimmed.toLowerCase() : trimmed;

  // Replace any run of characters that is not a-z, A-Z or 0-9 with a single separator.
  working = working.replace(/[^a-zA-Z0-9]+/g, separator);

  // Strip a separator left at the very start or end of the string.
  working = working.replace(new RegExp(`^${separatorPattern}+|${separatorPattern}+$`, "g"), "");

  // Collapse any run of repeated separator characters into one.
  working = working.replace(new RegExp(`${separatorPattern}{2,}`, "g"), separator);

  if (!working) {
    return {
      kind: "error",
      message: "That title has no letters or numbers left once punctuation is removed. Add some to build a slug.",
    };
  }

  return {
    kind: "text",
    label: "Slug",
    value: working,
    monospace: true,
    notes: [
      `${working.length} characters, ${working.split(separator).filter(Boolean).length} words.`,
      "Every run of spaces or punctuation collapses to a single separator, so no double hyphens or underscores make it into the slug.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "builds a lowercase hyphenated slug from a normal title",
    inputs: { title: "10 Ways to Improve Your Morning Routine!", separator: "-", lowercase: true },
    check: (result) => result.kind === "text" && result.value === "10-ways-to-improve-your-morning-routine",
  },
  {
    name: "collapses multiple consecutive spaces and punctuation marks without a doubled separator",
    inputs: { title: "Best   Coffee!!!  Shops??", separator: "-", lowercase: true },
    check: (result) => result.kind === "text" && result.value === "best-coffee-shops",
  },
  {
    name: "uses an underscore when that separator is selected",
    inputs: { title: "Hello World Example", separator: "_", lowercase: true },
    check: (result) => result.kind === "text" && result.value === "hello_world_example",
  },
  {
    name: "preserves original letter casing when lowercase forcing is off, while still replacing symbols",
    inputs: { title: "Hello World: Best Practices!", separator: "-", lowercase: false },
    check: (result) => result.kind === "text" && result.value === "Hello-World-Best-Practices",
  },
  {
    name: "rejects blank input rather than returning an empty slug",
    inputs: { title: "   ", separator: "-", lowercase: true },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a title that is punctuation only, once every character has been stripped",
    inputs: { title: "!!! ??? ###", separator: "-", lowercase: true },
    check: (result) => result.kind === "error",
  },
];
