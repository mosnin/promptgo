import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Standard LTV:CAC ratio formula.
 *
 * LTV:CAC ratio = customer lifetime value divided by customer acquisition
 * cost. It expresses how many dollars of value a business recovers, over a
 * customer's full relationship with it, for every dollar spent acquiring
 * that customer. Unlike a fixed technical standard such as a contrast
 * formula, there is no single pass or fail line here: SaaS and subscription
 * business literature commonly cites 3:1 or higher as a healthy range, but
 * this tool does not grade the input against that figure. It reports the
 * ratio and leaves the industry context to the notes, because the healthy
 * range genuinely varies by business model, sales motion and margin
 * structure.
 */
export const compute: ComputeFn = (inputs) => {
  const ltv = Number(inputs.ltv);
  const cac = Number(inputs.cac);

  if (!Number.isFinite(ltv) || !Number.isFinite(cac)) {
    return { kind: "error", message: "Enter customer lifetime value and customer acquisition cost as numbers." };
  }

  if (ltv < 0) {
    return { kind: "error", message: "Customer lifetime value cannot be negative." };
  }

  if (cac <= 0) {
    return {
      kind: "error",
      message:
        "Customer acquisition cost must be greater than zero. A ratio cannot be computed against a zero or negative acquisition cost.",
    };
  }

  const ratio = ltv / cac;

  const currency = (value: number) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return {
    kind: "value",
    headline: { label: "LTV:CAC ratio", value: `${ratio.toFixed(1)}:1` },
    secondary: [
      { label: "Customer lifetime value", value: currency(ltv) },
      { label: "Customer acquisition cost", value: currency(cac) },
      { label: "Value recovered per acquisition dollar", value: `$${ratio.toFixed(2)}` },
    ],
    notes: [
      "A ratio of roughly 3:1 or higher is commonly cited in SaaS and subscription business literature as a healthy range. That figure is a widely repeated rule of thumb rather than a fixed standard, and this tool does not grade the result against it as a pass or fail line, since what counts as healthy genuinely varies by industry, sales motion and margin structure.",
      "A ratio below 1:1 means the acquisition cost was not recovered over the customer's full lifetime, before any margin is even considered.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes a clean 3:1 ratio for a standard case",
    inputs: { ltv: 900, cac: 300 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "3.0:1" &&
      result.secondary?.[0]?.value === "$900.00" &&
      result.secondary?.[1]?.value === "$300.00" &&
      result.secondary?.[2]?.value === "$3.00",
  },
  {
    name: "computes a 1:1 breakeven ratio when LTV exactly equals CAC",
    inputs: { ltv: 300, cac: 300 },
    check: (result) =>
      result.kind === "value" && result.headline.value === "1.0:1" && result.secondary?.[2]?.value === "$1.00",
  },
  {
    name: "computes a ratio below 1 for loss-making acquisition spend",
    inputs: { ltv: 150, cac: 300 },
    check: (result) =>
      result.kind === "value" && result.headline.value === "0.5:1" && result.secondary?.[2]?.value === "$0.50",
  },
  {
    name: "rejects a customer acquisition cost of zero",
    inputs: { ltv: 1200, cac: 0 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a negative customer acquisition cost",
    inputs: { ltv: 1200, cac: -50 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a negative customer lifetime value",
    inputs: { ltv: -100, cac: 300 },
    check: (result) => result.kind === "error",
  },
  {
    name: "matches the tool's own pre-filled example values without throwing",
    inputs: { ltv: 1200, cac: 300 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "4.0:1" &&
      result.secondary?.[0]?.value === "$1,200.00" &&
      result.secondary?.[1]?.value === "$300.00",
  },
  {
    name: "rounds the headline ratio to one decimal place on an uneven division",
    inputs: { ltv: 1000, cac: 300 },
    check: (result) =>
      result.kind === "value" && result.headline.value === "3.3:1" && result.secondary?.[2]?.value === "$3.33",
  },
];
