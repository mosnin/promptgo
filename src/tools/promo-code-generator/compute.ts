import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

const CHARSETS: Record<string, string> = {
  alnum: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  numeric: "0123456789",
  alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

const LENGTH_BOUNDS = { min: 4, max: 16 };
const COUNT_BOUNDS = { min: 1, max: 50 };

/**
 * Draws one unbiased random index in [0, max) from crypto.getRandomValues.
 *
 * A plain `randomUint32 % max` is slightly biased toward the low end of the
 * range whenever max does not evenly divide 2^32, which it usually does not
 * for a character set of 10, 26 or 36 symbols. Rejecting values that fall in
 * the leftover, unevenly divisible tail and redrawing removes that bias, so
 * every character in the set is equally likely to be chosen.
 */
function secureRandomIndex(max: number): number {
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % max);
  const buffer = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return value % max;
}

function randomCode(charset: string, length: number): string {
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += charset[secureRandomIndex(charset.length)];
  }
  return code;
}

/**
 * Generates `count` promo codes of `length` random characters each, from the
 * chosen character set, prefixed with the (uppercased, alphanumeric-only)
 * prefix. Every character comes from crypto.getRandomValues, available as a
 * global in both the browser and Node, never from Math.random. Codes are
 * collected into a Set and regenerated on collision so a batch can never
 * contain a duplicate, however unlikely a collision was to begin with.
 */
export const compute: ComputeFn = (inputs) => {
  const prefixRaw = String(inputs.prefix ?? "").trim();
  const prefix = prefixRaw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const charsetKey = String(inputs.charset ?? "alnum");
  const length = Number(inputs.length);
  const count = Number(inputs.count);

  const charset = CHARSETS[charsetKey];
  if (!charset) {
    return { kind: "error", message: `Unknown character set "${charsetKey}". Choose letters and numbers, numbers only, or letters only.` };
  }

  if (!Number.isInteger(length) || length < LENGTH_BOUNDS.min || length > LENGTH_BOUNDS.max) {
    return {
      kind: "error",
      message: `Code length must be a whole number between ${LENGTH_BOUNDS.min} and ${LENGTH_BOUNDS.max}.`,
    };
  }
  if (!Number.isInteger(count) || count < COUNT_BOUNDS.min || count > COUNT_BOUNDS.max) {
    return {
      kind: "error",
      message: `Number of codes must be a whole number between ${COUNT_BOUNDS.min} and ${COUNT_BOUNDS.max}.`,
    };
  }

  const codes = new Set<string>();
  // The character set and length together bound how many distinct codes can
  // exist at all (as low as 10,000 for a 4 digit numeric code), so a capped
  // retry budget avoids ever looping forever on settings that simply cannot
  // satisfy the requested batch size.
  const maxAttempts = count * 1000 + 1000;
  let attempts = 0;
  while (codes.size < count && attempts < maxAttempts) {
    codes.add(prefix + randomCode(charset, length));
    attempts += 1;
  }

  if (codes.size < count) {
    return {
      kind: "error",
      message: "Could not generate enough unique codes with these settings. Increase the code length or reduce the batch size.",
    };
  }

  return {
    kind: "list",
    label: "Generated codes",
    items: Array.from(codes),
    notes: [
      "Every code is drawn from crypto.getRandomValues, the cryptographically secure random source built into browsers and Node, not Math.random.",
      "Codes are checked for duplicates within this batch only. They are not checked against codes generated in an earlier batch or already stored in a discount platform.",
    ],
  };
};

/**
 * Because compute() is genuinely randomised, these self tests follow the
 * skill's rule for a randomised generator (seo-tool-page skill, section 5):
 * they assert structural correctness (count, length, character set, batch
 * uniqueness, error handling on out-of-range input) rather than an exact
 * output value, since there is no single correct code to assert equality
 * against.
 */
export const selfTests: ToolSelfTest[] = [
  {
    name: "returns exactly the requested number of codes",
    inputs: { prefix: "", charset: "alnum", length: 8, count: 5 },
    check: (result) => result.kind === "list" && result.items.length === 5,
  },
  {
    name: "every code is the requested length once the prefix is accounted for",
    inputs: { prefix: "SAVE", charset: "alnum", length: 6, count: 10 },
    check: (result) =>
      result.kind === "list" &&
      result.items.every((item) => item.startsWith("SAVE") && item.length === "SAVE".length + 6),
  },
  {
    name: "numeric character set never produces a letter",
    inputs: { prefix: "", charset: "numeric", length: 8, count: 10 },
    check: (result) => result.kind === "list" && result.items.every((item) => /^[0-9]{8}$/.test(item)),
  },
  {
    name: "letters only character set never produces a digit",
    inputs: { prefix: "", charset: "alpha", length: 8, count: 10 },
    check: (result) => result.kind === "list" && result.items.every((item) => /^[A-Z]{8}$/.test(item)),
  },
  {
    name: "every code in a batch is unique",
    inputs: { prefix: "", charset: "numeric", length: 4, count: 25 },
    check: (result) => result.kind === "list" && new Set(result.items).size === result.items.length,
  },
  {
    name: "a lowercase, punctuated prefix is normalised to uppercase letters and digits only",
    inputs: { prefix: "save!! 10", charset: "alnum", length: 5, count: 3 },
    check: (result) => result.kind === "list" && result.items.every((item) => item.startsWith("SAVE10")),
  },
  {
    name: "accepts the boundary values for length and count",
    inputs: { prefix: "", charset: "alnum", length: 4, count: 1 },
    check: (result) => result.kind === "list" && result.items.length === 1 && result.items[0].length === 4,
  },
  {
    name: "rejects a code length below the minimum",
    inputs: { prefix: "", charset: "alnum", length: 3, count: 5 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a code length above the maximum",
    inputs: { prefix: "", charset: "alnum", length: 17, count: 5 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a batch size above the maximum",
    inputs: { prefix: "", charset: "alnum", length: 8, count: 51 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a batch size below the minimum",
    inputs: { prefix: "", charset: "alnum", length: 8, count: 0 },
    check: (result) => result.kind === "error",
  },
];
