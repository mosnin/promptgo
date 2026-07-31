import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Standard contribution margin break-even formula.
 *
 * Contribution margin per unit = price per unit - variable cost per unit.
 * Break-even units = fixed costs / contribution margin, rounded up, because a
 * business cannot sell a fraction of a unit to reach the break-even point:
 * rounding down would report a volume that is still short of covering fixed
 * costs. Break-even revenue is that unit count multiplied back out by price,
 * and the contribution margin ratio expresses the margin as a percentage of
 * price, which is what lets two products at different price points be
 * compared on the same scale.
 */
export const compute: ComputeFn = (inputs) => {
  const fixedCosts = Number(inputs.fixedCosts);
  const pricePerUnit = Number(inputs.pricePerUnit);
  const variableCostPerUnit = Number(inputs.variableCostPerUnit);

  if (!Number.isFinite(fixedCosts) || !Number.isFinite(pricePerUnit) || !Number.isFinite(variableCostPerUnit)) {
    return { kind: "error", message: "Enter fixed costs, price per unit and variable cost per unit as numbers." };
  }

  if (fixedCosts < 0 || pricePerUnit < 0 || variableCostPerUnit < 0) {
    return { kind: "error", message: "Fixed costs, price per unit and variable cost per unit cannot be negative." };
  }

  const contributionMargin = pricePerUnit - variableCostPerUnit;

  if (contributionMargin <= 0) {
    return {
      kind: "error",
      message: `At $${pricePerUnit.toFixed(2)} per unit, the price does not cover the $${variableCostPerUnit.toFixed(2)} variable cost per unit, so there is no break-even point. Selling more units only loses more money at this price; raise the price or lower the variable cost per unit before a break-even volume exists.`,
    };
  }

  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const marginRatio = (contributionMargin / pricePerUnit) * 100;

  const currency = (value: number) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return {
    kind: "value",
    headline: { label: "Break-even units", value: `${breakEvenUnits.toLocaleString("en-US")} units` },
    secondary: [
      { label: "Break-even revenue", value: currency(breakEvenRevenue) },
      { label: "Contribution margin per unit", value: currency(contributionMargin) },
      { label: "Contribution margin ratio", value: `${marginRatio.toFixed(1)}%` },
    ],
    notes: [
      "Break-even units is rounded up to the next whole unit, since the fixed costs are not actually covered until that final, whole unit sells.",
      "This is the volume at which profit is exactly zero, not a target volume. Every unit sold beyond it contributes the full margin to profit.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes break-even units, revenue and margin for a standard case",
    inputs: { fixedCosts: 10000, pricePerUnit: 50, variableCostPerUnit: 20 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "334 units" &&
      result.secondary?.[0]?.value === "$16,700.00" &&
      result.secondary?.[1]?.value === "$30.00" &&
      result.secondary?.[2]?.value === "60.0%",
  },
  {
    name: "produces a clean whole number of units when fixed costs divide evenly by the margin",
    inputs: { fixedCosts: 5000, pricePerUnit: 25, variableCostPerUnit: 15 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "500 units" &&
      result.secondary?.[0]?.value === "$12,500.00" &&
      result.secondary?.[2]?.value === "40.0%",
  },
  {
    name: "rounds up to the next whole unit when the division is not exact",
    inputs: { fixedCosts: 1000, pricePerUnit: 12, variableCostPerUnit: 9 },
    check: (result) =>
      // 1000 / 3 = 333.33, which must round up to 334, not down to 333.
      result.kind === "value" && result.headline.value === "334 units" && result.secondary?.[0]?.value === "$4,008.00",
  },
  {
    name: "returns zero break-even units when there are no fixed costs to recover",
    inputs: { fixedCosts: 0, pricePerUnit: 10, variableCostPerUnit: 4 },
    check: (result) =>
      result.kind === "value" && result.headline.value === "0 units" && result.secondary?.[0]?.value === "$0.00",
  },
  {
    name: "rejects a price that only equals the variable cost per unit",
    inputs: { fixedCosts: 10000, pricePerUnit: 20, variableCostPerUnit: 20 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a price below the variable cost per unit",
    inputs: { fixedCosts: 10000, pricePerUnit: 15, variableCostPerUnit: 20 },
    check: (result) => result.kind === "error",
  },
  {
    name: "keeps break-even revenue consistent with units times price at a decimal price point",
    inputs: { fixedCosts: 7000, pricePerUnit: 19.99, variableCostPerUnit: 8.5 },
    check: (result) => {
      if (result.kind !== "value") return false;
      const units = Number(result.headline.value.replace(/[^0-9.]/g, ""));
      const revenue = Number(result.secondary?.[0]?.value.replace(/[^0-9.]/g, ""));
      const expectedRevenue = Math.round(units * 19.99 * 100) / 100;
      return units === 610 && Math.abs(revenue - expectedRevenue) < 0.01;
    },
  },
];
