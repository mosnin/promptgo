import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Month by month savings simulation, not a closed-form formula.
 *
 * A closed-form future value formula is faster to write but hides the
 * arithmetic behind an exponent, which is exactly the part someone would
 * want to check by hand. This runs the actual month by month loop a savings
 * account goes through instead: each month, the balance earns a month's
 * worth of the annual rate, then the contribution lands. That is simple,
 * transparent, and trivially hand-verifiable against a spreadsheet.
 *
 * The loop is capped at 1200 months (100 years) so a contribution and rate
 * combination that would never reasonably reach the goal returns a clear
 * error instead of the tool appearing to hang.
 */
export const compute: ComputeFn = (inputs) => {
  const goalAmount = Number(inputs.goalAmount);
  const currentSavings = Number(inputs.currentSavings);
  const monthlyContribution = Number(inputs.monthlyContribution);
  const annualRatePercent = Number(inputs.annualRatePercent);

  if (
    !Number.isFinite(goalAmount) ||
    !Number.isFinite(currentSavings) ||
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(annualRatePercent)
  ) {
    return {
      kind: "error",
      message: "Enter the goal amount, current savings, monthly contribution and interest rate as numbers.",
    };
  }

  if (goalAmount <= 0) {
    return { kind: "error", message: "The savings goal has to be greater than zero." };
  }

  if (currentSavings < 0 || monthlyContribution < 0 || annualRatePercent < 0) {
    return {
      kind: "error",
      message: "Current savings, monthly contribution and the interest rate cannot be negative.",
    };
  }

  const currency = (value: number) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainder = months % 12;
    const monthWord = months === 1 ? "month" : "months";
    const yearWord = years === 1 ? "year" : "years";
    const remainderWord = remainder === 1 ? "month" : "months";
    return `${months} ${monthWord} (${years} ${yearWord}, ${remainder} ${remainderWord})`;
  };

  if (currentSavings >= goalAmount) {
    return {
      kind: "value",
      headline: { label: "Time to reach goal", value: "0 months (goal already met)" },
      secondary: [
        { label: "Total contributed", value: currency(0) },
        { label: "Total growth from interest", value: currency(0) },
      ],
      notes: [
        `Current savings of ${currency(currentSavings)} already meet or exceed the ${currency(goalAmount)} goal, so no further months of contribution are needed.`,
      ],
    };
  }

  if (monthlyContribution === 0 && annualRatePercent === 0) {
    return {
      kind: "error",
      message:
        "With no monthly contribution and no interest rate, the balance will never grow, so this goal is unreachable. Enter a monthly contribution, an interest rate, or both.",
    };
  }

  const monthlyRate = annualRatePercent / 100 / 12;
  let balance = currentSavings;
  let months = 0;
  let totalContributed = 0;

  while (balance < goalAmount) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    totalContributed += monthlyContribution;
    months += 1;

    if (months > 1200) {
      return {
        kind: "error",
        message:
          "This goal is not reachable within 100 years at this monthly contribution and interest rate. Increase the monthly contribution or the interest rate.",
      };
    }
  }

  const totalGrowthFromInterest = balance - currentSavings - totalContributed;

  return {
    kind: "value",
    headline: { label: "Time to reach goal", value: formatMonths(months) },
    secondary: [
      { label: "Total contributed", value: currency(totalContributed) },
      { label: "Total growth from interest", value: currency(totalGrowthFromInterest) },
      { label: "Projected balance when goal is reached", value: currency(balance) },
    ],
    notes: [
      "This is a projection that assumes the monthly contribution and the interest rate stay constant for the whole period, not a guarantee. A real account's rate changes over time.",
      "The projected balance can land slightly above the goal amount, since the goal is checked once a month and the last month's contribution and interest are added in full rather than stopped partway through.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "reports zero months when the goal is already met",
    inputs: { goalAmount: 5000, currentSavings: 6000, monthlyContribution: 100, annualRatePercent: 3 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "0 months (goal already met)" &&
      result.secondary?.[0]?.value === "$0.00" &&
      result.secondary?.[1]?.value === "$0.00",
  },
  {
    name: "reports zero months on the boundary where current savings exactly equal the goal",
    inputs: { goalAmount: 5000, currentSavings: 5000, monthlyContribution: 100, annualRatePercent: 5 },
    check: (result) => result.kind === "value" && result.headline.value === "0 months (goal already met)",
  },
  {
    name: "runs a pure division with zero interest rate",
    inputs: { goalAmount: 10000, currentSavings: 1000, monthlyContribution: 300, annualRatePercent: 0 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "30 months (2 years, 6 months)" &&
      result.secondary?.[0]?.value === "$9,000.00" &&
      result.secondary?.[1]?.value === "$0.00",
  },
  {
    name: "simulates a normal compounding case month by month",
    inputs: { goalAmount: 20000, currentSavings: 2000, monthlyContribution: 400, annualRatePercent: 4 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "42 months (3 years, 6 months)" &&
      result.secondary?.[0]?.value === "$16,800.00" &&
      result.secondary?.[1]?.value === "$1,500.74" &&
      result.secondary?.[2]?.value === "$20,300.74",
  },
  {
    name: "computes a second compounding case with a higher rate and no starting balance",
    inputs: { goalAmount: 3000, currentSavings: 0, monthlyContribution: 50, annualRatePercent: 12 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "48 months (4 years, 0 months)" &&
      result.secondary?.[0]?.value === "$2,400.00" &&
      result.secondary?.[1]?.value === "$661.13",
  },
  {
    name: "rejects a goal with no monthly contribution and no interest rate as unreachable",
    inputs: { goalAmount: 1000, currentSavings: 500, monthlyContribution: 0, annualRatePercent: 0 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a goal that would take more than 100 years to reach",
    inputs: { goalAmount: 1000000, currentSavings: 0, monthlyContribution: 10, annualRatePercent: 0 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a goal amount of zero",
    inputs: { goalAmount: 0, currentSavings: 100, monthlyContribution: 50, annualRatePercent: 2 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a negative current savings figure",
    inputs: { goalAmount: 5000, currentSavings: -100, monthlyContribution: 200, annualRatePercent: 2 },
    check: (result) => result.kind === "error",
  },
];
