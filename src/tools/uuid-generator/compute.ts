import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

const COUNT_BOUNDS = { min: 1, max: 100 };

/**
 * Matches a version 4 UUID exactly: 32 hex digits grouped 8-4-4-4-12, with
 * the version nibble fixed to "4" and the variant nibble restricted to one
 * of 8, 9, a or b, per RFC 9562 (which obsoletes RFC 4122).
 */
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Generates `count` version 4 UUIDs with crypto.randomUUID(), the Web
 * Crypto API method built into every modern browser and into Node 19 and
 * later. It is used directly here rather than hand assembled from
 * crypto.getRandomValues because the platform's own implementation already
 * sets the version and variant bits correctly and draws every other bit
 * from the same cryptographically secure random source, removing an entire
 * class of off-by-one bit twiddling bugs a hand rolled version would risk.
 */
export const compute: ComputeFn = (inputs) => {
  const count = Number(inputs.count);

  if (!Number.isInteger(count) || count < COUNT_BOUNDS.min || count > COUNT_BOUNDS.max) {
    return {
      kind: "error",
      message: `Number of UUIDs must be a whole number between ${COUNT_BOUNDS.min} and ${COUNT_BOUNDS.max}.`,
    };
  }

  const items: string[] = [];
  for (let i = 0; i < count; i += 1) {
    items.push(crypto.randomUUID());
  }

  return {
    kind: "list",
    label: "Generated UUIDs",
    items,
    notes: [
      "Every UUID comes from crypto.randomUUID(), the Web Crypto API method that produces a version 4 UUID directly, per RFC 9562.",
      "Generated locally in your browser. Nothing about the requested count or the finished UUIDs is sent anywhere.",
    ],
  };
};

/**
 * compute() is genuinely randomised, so these self tests follow the same
 * structural pattern the promo code generator uses: they assert the shape
 * and provable properties of the output (count, exact pattern match on both
 * the version and variant nibbles, batch uniqueness, boundary acceptance,
 * out-of-range and non-integer rejection) rather than a fixed output value,
 * since there is no single correct UUID to assert equality against.
 */
export const selfTests: ToolSelfTest[] = [
  {
    name: "returns exactly the requested number of UUIDs",
    inputs: { count: 5 },
    check: (result) => result.kind === "list" && result.items.length === 5,
  },
  {
    name: "every generated UUID matches the version 4 UUID pattern exactly",
    inputs: { count: 20 },
    check: (result) => result.kind === "list" && result.items.every((item) => UUID_V4_PATTERN.test(item)),
  },
  {
    name: "every UUID in a batch is unique",
    inputs: { count: 50 },
    check: (result) => result.kind === "list" && new Set(result.items).size === result.items.length,
  },
  {
    name: "accepts the minimum boundary value of 1",
    inputs: { count: 1 },
    check: (result) => result.kind === "list" && result.items.length === 1 && UUID_V4_PATTERN.test(result.items[0]),
  },
  {
    name: "accepts the maximum boundary value of 100",
    inputs: { count: 100 },
    check: (result) =>
      result.kind === "list" && result.items.length === 100 && result.items.every((item) => UUID_V4_PATTERN.test(item)),
  },
  {
    name: "rejects a count of 0, one below the minimum",
    inputs: { count: 0 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a count of 101, one above the maximum",
    inputs: { count: 101 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a non-integer count",
    inputs: { count: 4.5 },
    check: (result) => result.kind === "error",
  },
];
