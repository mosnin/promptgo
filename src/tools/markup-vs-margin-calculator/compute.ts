import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Standard markup and gross margin formulas.
 *
 * Profit = selling price - cost price.
 * Markup = profit expressed as a percentage of the COST price: how much was
 * added on top of what the item cost to arrive at the selling price.
 * Margin = profit expressed as a percentage of the SELLING price: how much
 * of the final sale price is profit.
 *
 * The two percentages share the same numerator (profit) but divide by two
 * different numbers, which is why they are never equal except at 0 percent,
 * where profit is zero regardless of which number it is divided by.
 */
export const compute: ComputeFn = (inputs) => {
  const costPrice = Number(inputs.costPrice);
  const sellingPrice = Number(inputs.sellingPrice);

  if (!Number.isFinite(costPrice) || !Number.isFinite(sellingPrice)) {
    return { kind: "error", message: "Enter the cost price and selling price as numbers." };
  }

  if (costPrice <= 0) {
    return { kind: "error", message: "Cost price must be greater than zero. A markup or margin cannot be calculated from a zero or negative cost." };
  }

  if (sellingPrice <= 0) {
    return { kind: "error", message: "Selling price must be greater than zero. Margin divides profit by the selling price, which is undefined at zero." };
  }

  const profit = sellingPrice - costPrice;
  const markupPercent = (profit / costPrice) * 100;
  const marginPercent = (profit / sellingPrice) * 100;

  const currency = (value: number) =>
    `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const percent = (value: number) => `${value.toFixed(1)}%`;

  return {
    kind: "value",
    headline: { label: "Margin", value: percent(marginPercent) },
    secondary: [
      { label: "Markup", value: percent(markupPercent) },
      { label: "Profit", value: currency(profit) },
      {
        label: "Markup restated",
        value: `${currency(profit)} profit is ${percent(markupPercent)} of the ${currency(costPrice)} cost price`,
      },
      {
        label: "Margin restated",
        value: `${currency(profit)} profit is ${percent(marginPercent)} of the ${currency(sellingPrice)} selling price`,
      },
    ],
    notes: [
      "Markup and margin start from the same profit figure and divide it by two different numbers, cost price for markup and selling price for margin, which is why they are never equal except at 0 percent.",
      profit < 0
        ? "Profit here is negative: the selling price is below the cost price, so both markup and margin are negative rather than undefined."
        : "Margin is always smaller than markup on a profitable sale, because selling price is always larger than cost price whenever profit is positive.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes the standard example: 40 cost, 60 selling price, 50 percent markup versus 33.3 percent margin",
    inputs: { costPrice: 40, sellingPrice: 60 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "33.3%" &&
      result.secondary?.[0]?.value === "50.0%" &&
      result.secondary?.[1]?.value === "$20.00",
  },
  {
    name: "produces a round 100 percent markup and 50 percent margin when selling price doubles cost price",
    inputs: { costPrice: 50, sellingPrice: 100 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "50.0%" &&
      result.secondary?.[0]?.value === "100.0%" &&
      result.secondary?.[1]?.value === "$50.00",
  },
  {
    name: "returns zero for both markup and margin when selling price exactly equals cost price",
    inputs: { costPrice: 70, sellingPrice: 70 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "0.0%" &&
      result.secondary?.[0]?.value === "0.0%" &&
      result.secondary?.[1]?.value === "$0.00",
  },
  {
    name: "handles a loss without erroring: selling price below cost price gives negative markup and margin",
    inputs: { costPrice: 100, sellingPrice: 80 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "-25.0%" &&
      result.secondary?.[0]?.value === "-20.0%" &&
      result.secondary?.[1]?.value === "-$20.00",
  },
  {
    name: "rejects a zero or negative cost price",
    inputs: { costPrice: 0, sellingPrice: 50 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a zero selling price, since margin would divide by zero",
    inputs: { costPrice: 40, sellingPrice: 0 },
    check: (result) => result.kind === "error",
  },
];
