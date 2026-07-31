import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Sales commission with an optional marginal tiered rate.
 *
 * With the bonus threshold left at 0, tiering is switched off and the whole
 * sale is paid at the base rate: commission = sales amount x base rate.
 *
 * With a bonus threshold set, this uses a marginal tier structure, the same
 * shape as a progressive tax bracket. The base rate applies only to the
 * portion of the sale up to the threshold. The bonus rate applies only to
 * the portion above the threshold, not to the whole sale once the threshold
 * is crossed. A sale that never reaches the threshold is paid entirely at
 * the base rate, since the bonus tier was never entered.
 *
 * This is deliberately not the same arithmetic as a flat "bonus rate on
 * everything once you cross the line" plan, which some real commission
 * plans do use instead. The two structures produce different numbers for
 * the same sale, which is why the result notes call out which one this
 * calculator computes.
 */
export const compute: ComputeFn = (inputs) => {
  const salesAmount = Number(inputs.salesAmount);
  const baseCommissionPercent = Number(inputs.baseCommissionPercent);
  const bonusThresholdAmount = Number(inputs.bonusThresholdAmount);
  const bonusCommissionPercent = Number(inputs.bonusCommissionPercent);

  if (!Number.isFinite(salesAmount) || salesAmount <= 0) {
    return { kind: "error", message: "Enter a total sales amount greater than $0." };
  }
  if (!Number.isFinite(baseCommissionPercent) || baseCommissionPercent < 0 || baseCommissionPercent > 100) {
    return { kind: "error", message: "Base commission rate has to be between 0 and 100 percent." };
  }
  if (!Number.isFinite(bonusThresholdAmount) || bonusThresholdAmount < 0) {
    return { kind: "error", message: "Bonus tier threshold cannot be negative. Enter $0 to disable tiered commission." };
  }
  if (!Number.isFinite(bonusCommissionPercent) || bonusCommissionPercent < 0 || bonusCommissionPercent > 100) {
    return { kind: "error", message: "Bonus tier rate has to be between 0 and 100 percent." };
  }

  const tieredMode = bonusThresholdAmount > 0;
  const notes: string[] = [];

  let commission: number;
  let baseTierAmount: number;
  let bonusTierAmount: number;

  if (!tieredMode) {
    commission = (salesAmount * baseCommissionPercent) / 100;
    baseTierAmount = salesAmount;
    bonusTierAmount = 0;
    notes.push(
      "The bonus tier threshold was left at $0, so this used a single flat rate: the base commission rate applied to the entire sales amount.",
    );
  } else if (salesAmount <= bonusThresholdAmount) {
    commission = (salesAmount * baseCommissionPercent) / 100;
    baseTierAmount = salesAmount;
    bonusTierAmount = 0;
    notes.push(
      "The sales amount did not reach the bonus tier threshold, so the entire amount was paid at the base commission rate. The bonus rate never applied.",
    );
  } else {
    baseTierAmount = bonusThresholdAmount;
    bonusTierAmount = salesAmount - bonusThresholdAmount;
    commission = (baseTierAmount * baseCommissionPercent) / 100 + (bonusTierAmount * bonusCommissionPercent) / 100;
    notes.push(
      "This is a marginal tier calculation, the same shape as a progressive tax bracket: the base rate applied only to the portion of the sale up to the threshold, and the bonus rate applied only to the portion above it, not to the whole sales amount.",
    );
  }

  notes.push(
    "Some commission plans instead pay the bonus rate on the entire sale once the threshold is crossed, rather than only on the amount above it. That flat-bonus structure produces a different, usually larger, commission for the same sale. Check which structure your own plan actually uses before comparing this result to a paycheck.",
  );

  const effectiveRatePercent = (commission / salesAmount) * 100;

  const secondary: { label: string; value: string }[] = [
    { label: "Effective commission rate", value: `${effectiveRatePercent.toFixed(1)}%` },
  ];
  if (tieredMode) {
    secondary.push({ label: "Sales amount at the base rate", value: currency(baseTierAmount) });
    secondary.push({ label: "Sales amount at the bonus rate", value: currency(bonusTierAmount) });
  }

  return {
    kind: "value",
    headline: { label: "Total commission earned", value: currency(commission) },
    secondary,
    notes,
  };
};

function currency(value: number): string {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const selfTests: ToolSelfTest[] = [
  {
    name: "flat-rate mode (threshold at $0) pays the base rate on the whole sale",
    inputs: { salesAmount: 50000, baseCommissionPercent: 8, bonusThresholdAmount: 0, bonusCommissionPercent: 12 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$4,000.00" &&
      result.secondary?.[0]?.value === "8.0%" &&
      result.secondary?.length === 1 &&
      (result.notes ?? []).some((note) => note.toLowerCase().includes("flat rate")),
  },
  {
    name: "tiered mode where sales exceed the threshold splits commission across both rates",
    inputs: { salesAmount: 50000, baseCommissionPercent: 8, bonusThresholdAmount: 30000, bonusCommissionPercent: 12 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$4,800.00" &&
      result.secondary?.[0]?.value === "9.6%" &&
      result.secondary?.[1]?.value === "$30,000.00" &&
      result.secondary?.[2]?.value === "$20,000.00" &&
      (result.notes ?? []).some((note) => note.toLowerCase().includes("marginal tier")),
  },
  {
    name: "tiered mode where sales fall below the threshold never applies the bonus rate",
    inputs: { salesAmount: 20000, baseCommissionPercent: 8, bonusThresholdAmount: 30000, bonusCommissionPercent: 12 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$1,600.00" &&
      result.secondary?.[0]?.value === "8.0%" &&
      result.secondary?.[1]?.value === "$20,000.00" &&
      result.secondary?.[2]?.value === "$0.00" &&
      (result.notes ?? []).some((note) => note.toLowerCase().includes("never applied")),
  },
  {
    name: "a sale landing exactly at the threshold is paid entirely at the base rate",
    inputs: { salesAmount: 30000, baseCommissionPercent: 8, bonusThresholdAmount: 30000, bonusCommissionPercent: 12 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$2,400.00" &&
      result.secondary?.[0]?.value === "8.0%" &&
      result.secondary?.[1]?.value === "$30,000.00" &&
      result.secondary?.[2]?.value === "$0.00",
  },
  {
    name: "a different base and bonus rate pair still splits correctly above the threshold",
    inputs: { salesAmount: 75000, baseCommissionPercent: 10, bonusThresholdAmount: 50000, bonusCommissionPercent: 20 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$10,000.00" &&
      result.secondary?.[0]?.value === "13.3%" &&
      result.secondary?.[1]?.value === "$50,000.00" &&
      result.secondary?.[2]?.value === "$25,000.00",
  },
  {
    name: "a sales amount of $0 is rejected as an error",
    inputs: { salesAmount: 0, baseCommissionPercent: 8, bonusThresholdAmount: 0, bonusCommissionPercent: 12 },
    check: (result) => result.kind === "error",
  },
  {
    name: "a negative sales amount is rejected as an error",
    inputs: { salesAmount: -5000, baseCommissionPercent: 8, bonusThresholdAmount: 0, bonusCommissionPercent: 12 },
    check: (result) => result.kind === "error",
  },
  {
    name: "an out-of-range base commission percent is rejected as an error",
    inputs: { salesAmount: 50000, baseCommissionPercent: 150, bonusThresholdAmount: 0, bonusCommissionPercent: 12 },
    check: (result) => result.kind === "error",
  },
];
