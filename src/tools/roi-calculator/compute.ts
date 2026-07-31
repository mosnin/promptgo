import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Standard return on investment formula.
 *
 * Net profit = total return - cost.
 * ROI = (net profit / cost) x 100.
 *
 * Cost is the denominator, so a cost of zero or less makes the formula
 * undefined rather than merely producing an unusual answer: dividing by
 * zero has no result, and dividing by a negative cost would invert the
 * sign of the ROI in a way that does not correspond to anything a real
 * investment could mean. Both are rejected as errors. A total return that
 * comes in below cost is not an error at all: it is a loss, and the
 * calculator reports it as a plain negative percentage rather than hiding
 * it behind a validation message.
 */
export const compute: ComputeFn = (inputs) => {
  const cost = Number(inputs.cost);
  const totalReturn = Number(inputs.totalReturn);

  if (!Number.isFinite(cost) || !Number.isFinite(totalReturn)) {
    return { kind: "error", message: "Enter the cost and the total return as numbers." };
  }

  if (cost <= 0) {
    return {
      kind: "error",
      message:
        "Cost has to be greater than zero. ROI divides net profit by cost, so a cost of zero or less makes the formula undefined rather than merely unusual.",
    };
  }

  if (totalReturn < 0) {
    return { kind: "error", message: "Total return cannot be negative. Enter the full value received back, even if it is less than the cost." };
  }

  const netProfit = totalReturn - cost;
  const roi = (netProfit / cost) * 100;

  const currency = (value: number) => {
    const sign = value < 0 ? "-" : "";
    return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const notes = [
    "ROI is (net profit divided by cost) multiplied by 100. Net profit is total return minus cost.",
    roi < 0
      ? "A negative ROI means the total return came in below the cost. This is a real loss, not an input error."
      : "A positive ROI means the total return exceeded the cost. An ROI of 0% means the investment exactly broke even.",
  ];

  return {
    kind: "value",
    headline: { label: "ROI", value: `${roi.toFixed(1)}%` },
    secondary: [
      { label: "Net profit", value: currency(netProfit) },
      { label: "Total return", value: currency(totalReturn) },
      { label: "Cost", value: currency(cost) },
    ],
    notes,
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes a positive ROI for a clear profit case",
    inputs: { cost: 5000, totalReturn: 8000 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "60.0%" &&
      result.secondary?.[0]?.value === "$3,000.00" &&
      result.secondary?.[1]?.value === "$8,000.00" &&
      result.secondary?.[2]?.value === "$5,000.00",
  },
  {
    name: "returns exactly 0% when total return equals cost",
    inputs: { cost: 2000, totalReturn: 2000 },
    check: (result) =>
      result.kind === "value" && result.headline.value === "0.0%" && result.secondary?.[0]?.value === "$0.00",
  },
  {
    name: "reports a negative ROI as a plain loss rather than an error",
    inputs: { cost: 4000, totalReturn: 3000 },
    check: (result) =>
      result.kind === "value" && result.headline.value === "-25.0%" && result.secondary?.[0]?.value === "-$1,000.00",
  },
  {
    name: "rejects a cost of zero as undefined rather than dividing by zero",
    inputs: { cost: 0, totalReturn: 8000 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a negative cost",
    inputs: { cost: -500, totalReturn: 1000 },
    check: (result) => result.kind === "error",
  },
  {
    name: "handles decimal costs and returns without rounding drift",
    inputs: { cost: 1500.5, totalReturn: 2000.75 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "33.3%" &&
      result.secondary?.[0]?.value === "$500.25" &&
      result.secondary?.[2]?.value === "$1,500.50",
  },
];
