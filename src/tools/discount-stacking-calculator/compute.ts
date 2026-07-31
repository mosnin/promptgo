import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Applies a list of discounts to an original price, in the exact order they
 * are given.
 *
 * Each row is calculated against whatever price is left after every row
 * before it, not against the original price, which is the entire point of
 * "stacking": the same two discounts produce two different final prices
 * depending on which one is applied first. A percent discount removes a
 * percentage of the current price; a fixed discount removes a flat dollar
 * amount. The price is never allowed to go negative. If a row would take it
 * below zero, it is capped at zero and any rows after that point have
 * nothing left to reduce.
 */
export const compute: ComputeFn = (inputs) => {
  const originalPriceRaw = inputs.originalPrice;
  const originalPrice = typeof originalPriceRaw === "number" ? originalPriceRaw : Number(originalPriceRaw);

  if (!Number.isFinite(originalPrice) || originalPrice <= 0) {
    return { kind: "error", message: "Enter an original price greater than $0." };
  }

  const rows = Array.isArray(inputs.discounts) ? inputs.discounts : [];

  let price = originalPrice;
  let clamped = false;

  for (const rowRaw of rows) {
    const row = (rowRaw ?? {}) as Record<string, unknown>;
    const type = row.type;
    const valueRaw = row.value;
    const value = typeof valueRaw === "number" ? valueRaw : Number(valueRaw);

    if (type !== "percent" && type !== "fixed") {
      return { kind: "error", message: "Every discount needs a type of either percent or fixed." };
    }
    if (!Number.isFinite(value) || value < 0) {
      return { kind: "error", message: "Every discount needs a non-negative value." };
    }

    price = type === "percent" ? price - (price * value) / 100 : price - value;

    if (price < 0) {
      price = 0;
      clamped = true;
    }
  }

  const finalPrice = price;
  const totalSaved = originalPrice - finalPrice;
  const effectivePercent = (totalSaved / originalPrice) * 100;

  const notes: string[] = [
    "Discounts are applied in the exact order listed, each one calculated on the price left after the discount before it. Reordering the same discounts changes the final price.",
  ];
  if (clamped) {
    notes.push(
      "One of the discounts would have taken the price below $0. It was capped at $0 instead, and any discount rows after that point had nothing left to reduce.",
    );
  }
  if (rows.length === 0) {
    notes.push("No discounts were added, so the final price is the original price.");
  }

  return {
    kind: "value",
    headline: { label: "Final price", value: formatCurrency(finalPrice) },
    secondary: [
      { label: "Total saved", value: formatCurrency(totalSaved) },
      { label: "Effective discount", value: `${effectivePercent.toFixed(1)}%` },
    ],
    notes,
  };
};

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export const selfTests: ToolSelfTest[] = [
  {
    name: "20% then $5 fixed on a $100 price gives a $75 final price",
    inputs: {
      originalPrice: 100,
      discounts: [
        { type: "percent", value: 20 },
        { type: "fixed", value: 5 },
      ],
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$75.00" &&
      result.secondary?.[0].value === "$25.00" &&
      result.secondary?.[1].value === "25.0%",
  },
  {
    name: "reversing the same two discounts changes the final price",
    inputs: {
      originalPrice: 100,
      discounts: [
        { type: "fixed", value: 5 },
        { type: "percent", value: 20 },
      ],
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$76.00" &&
      result.secondary?.[0].value === "$24.00" &&
      result.secondary?.[1].value === "24.0%",
  },
  {
    name: "a fixed discount larger than the remaining price clamps to $0 rather than going negative",
    inputs: {
      originalPrice: 10,
      discounts: [{ type: "fixed", value: 50 }],
    },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$0.00" &&
      result.secondary?.[0].value === "$10.00" &&
      result.secondary?.[1].value === "100.0%" &&
      (result.notes ?? []).some((note) => note.toLowerCase().includes("capped at $0")),
  },
  {
    name: "an original price of $0 is rejected as an error",
    inputs: { originalPrice: 0, discounts: [{ type: "percent", value: 10 }] },
    check: (result) => result.kind === "error",
  },
  {
    name: "no discount rows leaves the price unchanged",
    inputs: { originalPrice: 50, discounts: [] },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$50.00" &&
      result.secondary?.[0].value === "$0.00" &&
      result.secondary?.[1].value === "0.0%",
  },
  {
    name: "a negative discount value is rejected as an error",
    inputs: { originalPrice: 100, discounts: [{ type: "fixed", value: -5 }] },
    check: (result) => result.kind === "error",
  },
];
