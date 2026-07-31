import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

const CLASSES: { token: "uppercase" | "lowercase" | "numbers" | "symbols"; chars: string }[] = [
  { token: "uppercase", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { token: "lowercase", chars: "abcdefghijklmnopqrstuvwxyz" },
  { token: "numbers", chars: "0123456789" },
  { token: "symbols", chars: "!@#$%^&*()-_=+" },
];

const LENGTH_BOUNDS = { min: 8, max: 64 };

/**
 * Draws one unbiased random index in [0, max) from crypto.getRandomValues.
 *
 * A plain `randomUint32 % max` is slightly biased toward the low end of the
 * range whenever max does not evenly divide 2^32, which it usually does not
 * for a character set of 10, 26, 36 or similar symbols. Rejecting values
 * that fall in the leftover, unevenly divisible tail and redrawing removes
 * that bias, so every character in the set is equally likely to be chosen.
 * Same technique as the promo code generator's secureRandomIndex.
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

function randomChar(charset: string): string {
  return charset[secureRandomIndex(charset.length)];
}

/**
 * Fisher-Yates shuffle driven by the same unbiased secureRandomIndex draw
 * used to pick every character, never Math.random. Used to scatter the
 * guaranteed-per-class characters (see compute below) into unpredictable
 * positions instead of leaving them clustered at the front of the string.
 */
function secureShuffle<T>(items: T[]): T[] {
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = secureRandomIndex(i + 1);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

/**
 * Builds a password of `length` characters from whichever of uppercase,
 * lowercase, numbers and symbols are selected. One character is drawn from
 * every selected class first, guaranteeing that class actually appears
 * rather than merely being likely to, then the rest of the length is filled
 * from the combined set and the full array is shuffled before joining, so
 * the guaranteed characters do not sit in predictable fixed positions.
 * Every draw, both characters and shuffle positions, comes from
 * crypto.getRandomValues via secureRandomIndex, never Math.random.
 */
export const compute: ComputeFn = (inputs) => {
  const length = Number(inputs.length);
  if (!Number.isInteger(length) || length < LENGTH_BOUNDS.min || length > LENGTH_BOUNDS.max) {
    return {
      kind: "error",
      message: `Password length must be a whole number between ${LENGTH_BOUNDS.min} and ${LENGTH_BOUNDS.max}.`,
    };
  }

  const active = CLASSES.filter((entry) => Boolean(inputs[entry.token]));
  if (active.length === 0) {
    return {
      kind: "error",
      message:
        "Select at least one character type (uppercase, lowercase, numbers or symbols) to build a password from.",
    };
  }

  const combined = active.map((entry) => entry.chars).join("");
  const guaranteed = active.map((entry) => randomChar(entry.chars));
  const remaining = length - guaranteed.length;
  const rest: string[] = [];
  for (let i = 0; i < remaining; i += 1) {
    rest.push(randomChar(combined));
  }

  const password = secureShuffle([...guaranteed, ...rest]).join("");

  return {
    kind: "text",
    label: "Generated password",
    value: password,
    monospace: true,
    notes: [
      "Every character is drawn from crypto.getRandomValues, the Web Crypto API's cryptographically secure random source, using rejection sampling so no character in the selected classes is more likely than any other. Math.random is never used, since its output is not built for anything that has to resist guessing.",
      "One character from each selected type is guaranteed to appear, then the remaining length is filled from the combined set and the whole result is reordered with a Fisher-Yates shuffle driven by the same unbiased random source, so the guaranteed characters end up in an unpredictable position rather than a fixed one.",
    ],
  };
};

/**
 * compute() is genuinely randomised, so these self tests follow the same
 * rule the promo code generator's own comment describes (seo-tool-page
 * skill, section 5): they assert structural properties of the output that
 * hold no matter which random values were actually drawn (length, which
 * character classes are present or absent, error handling on invalid
 * input), rather than asserting an exact password, since there is no single
 * correct password to compare against.
 */
export const selfTests: ToolSelfTest[] = [
  {
    name: "generates a password of the requested length",
    inputs: { length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "text" && result.value.length === 16,
  },
  {
    name: "includes at least one uppercase letter when uppercase is checked",
    inputs: { length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "text" && /[A-Z]/.test(result.value),
  },
  {
    name: "includes at least one digit when numbers is checked",
    inputs: { length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "text" && /[0-9]/.test(result.value),
  },
  {
    name: "guarantees one character from every selected class, not just probably",
    inputs: { length: 20, uppercase: true, lowercase: true, numbers: true, symbols: true },
    check: (result) => {
      if (result.kind !== "text") return false;
      const value = result.value;
      const hasSymbol = [..."!@#$%^&*()-_=+"].some((char) => value.includes(char));
      return /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && hasSymbol;
    },
  },
  {
    name: "only draws from the selected classes when uppercase and symbols are unchecked",
    inputs: { length: 24, uppercase: false, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "text" && /^[a-z0-9]+$/.test(result.value),
  },
  {
    name: "rejects the request when every character type is unchecked",
    inputs: { length: 16, uppercase: false, lowercase: false, numbers: false, symbols: false },
    check: (result) => result.kind === "error",
  },
  {
    name: "accepts the minimum boundary length of 8",
    inputs: { length: 8, uppercase: true, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "text" && result.value.length === 8,
  },
  {
    name: "accepts the maximum boundary length of 64",
    inputs: { length: 64, uppercase: true, lowercase: true, numbers: true, symbols: true },
    check: (result) => result.kind === "text" && result.value.length === 64,
  },
  {
    name: "rejects a length below the minimum of 8",
    inputs: { length: 7, uppercase: true, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a length above the maximum of 64",
    inputs: { length: 65, uppercase: true, lowercase: true, numbers: true, symbols: false },
    check: (result) => result.kind === "error",
  },
];
