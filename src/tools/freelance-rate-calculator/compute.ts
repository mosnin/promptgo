import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Turns a monthly take-home target into the hourly and day rate floor that
 * actually reaches it.
 *
 * The chain is five steps, each one a plain multiplication or division:
 * annual income target, billable weeks after time off, billable days from
 * the work week, billable hours from hours actually billed per day, gross
 * revenue needed once overhead is grossed up, and finally the hourly rate
 * and day rate that revenue implies. No tax rate, industry benchmark or
 * overhead percentage is assumed as a constant; all five come from the
 * fields, because a hard coded rate goes stale the moment it is entered and
 * this tool would have no way of knowing.
 *
 * overheadPercent is bounded below 100 and weeksOffPerYear below 52 so that
 * the denominators in steps 3 and 4 (1 - overheadPercent / 100, and
 * 52 - weeksOffPerYear) can never reach zero or go negative.
 */

const BOUNDS = {
  monthlyIncomeTarget: { min: 0.01, max: Infinity },
  workDaysPerWeek: { min: 1, max: 7 },
  billableHoursPerDay: { min: 0.5, max: 16 },
  weeksOffPerYear: { min: 0, max: 51 },
  overheadPercent: { min: 0, max: 95 },
} as const;

const FIELD_LABELS: Record<keyof typeof BOUNDS, string> = {
  monthlyIncomeTarget: "Monthly income target",
  workDaysPerWeek: "Work days per week",
  billableHoursPerDay: "Billable hours per day",
  weeksOffPerYear: "Weeks off per year",
  overheadPercent: "Overhead percent",
};

const currency = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const hoursLabel = (value: number) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })} hours`;

export const compute: ComputeFn = (inputs) => {
  const values: Record<keyof typeof BOUNDS, number> = {
    monthlyIncomeTarget: Number(inputs.monthlyIncomeTarget),
    workDaysPerWeek: Number(inputs.workDaysPerWeek),
    billableHoursPerDay: Number(inputs.billableHoursPerDay),
    weeksOffPerYear: Number(inputs.weeksOffPerYear),
    overheadPercent: Number(inputs.overheadPercent),
  };

  for (const key of Object.keys(BOUNDS) as (keyof typeof BOUNDS)[]) {
    const value = values[key];
    const { min, max } = BOUNDS[key];
    if (!Number.isFinite(value)) {
      return { kind: "error", message: `Enter ${FIELD_LABELS[key].toLowerCase()} as a number.` };
    }
    if (value < min || value > max) {
      const maxText = max === Infinity ? "" : ` and at most ${max}`;
      return {
        kind: "error",
        message: `${FIELD_LABELS[key]} must be at least ${min}${maxText}.`,
      };
    }
  }

  const { monthlyIncomeTarget, workDaysPerWeek, billableHoursPerDay, weeksOffPerYear, overheadPercent } = values;

  // Redundant, explicit guard against the two divisions below going to zero
  // or negative even if the bounds above were ever loosened independently.
  if (overheadPercent >= 100) {
    return { kind: "error", message: "Overhead percent must be below 100, or no revenue is left to become take-home pay." };
  }
  if (weeksOffPerYear >= 52) {
    return { kind: "error", message: "Weeks off per year must be below 52, or there are no working weeks left in the year." };
  }

  const annualIncomeTarget = monthlyIncomeTarget * 12;
  const billableWeeksPerYear = 52 - weeksOffPerYear;
  const billableDaysPerYear = workDaysPerWeek * billableWeeksPerYear;
  const billableHoursPerYear = billableDaysPerYear * billableHoursPerDay;
  const grossRevenueNeeded = annualIncomeTarget / (1 - overheadPercent / 100);
  const hourlyRate = grossRevenueNeeded / billableHoursPerYear;
  const dayRate = hourlyRate * billableHoursPerDay;

  return {
    kind: "value",
    headline: { label: "Hourly rate floor", value: `${currency(hourlyRate)}/hr` },
    secondary: [
      { label: "Day rate", value: currency(dayRate) },
      { label: "Annual gross revenue needed", value: currency(grossRevenueNeeded) },
      { label: "Billable hours per year", value: hoursLabel(billableHoursPerYear) },
    ],
    notes: [
      "This is the floor rate that clears the stated monthly income target once overhead is accounted for, not a market rate or a recommended price. Charging exactly this rate leaves no room for a slow month, an unpaid invoice or a week with no billable work.",
      "No tax bracket, industry benchmark or typical overhead percentage is built into this calculation. Every figure it produces comes directly from the five numbers entered above, because a real rate varies by location, trade and year in a way a hard coded constant would get wrong.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes the hourly rate, day rate, revenue and hours for the example inputs",
    inputs: { monthlyIncomeTarget: 6000, workDaysPerWeek: 5, billableHoursPerDay: 6, weeksOffPerYear: 4, overheadPercent: 20 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$62.50/hr" &&
      result.secondary?.[0]?.value === "$375.00" &&
      result.secondary?.[1]?.value === "$90,000.00" &&
      result.secondary?.[2]?.value === "1,440 hours",
  },
  {
    name: "computes a second, independently checked case with a four day work week",
    inputs: { monthlyIncomeTarget: 5000, workDaysPerWeek: 4, billableHoursPerDay: 5, weeksOffPerYear: 6, overheadPercent: 30 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$93.17/hr" &&
      result.secondary?.[0]?.value === "$465.84" &&
      result.secondary?.[1]?.value === "$85,714.29" &&
      result.secondary?.[2]?.value === "920 hours",
  },
  {
    name: "handles zero overhead as a valid edge case rather than an error",
    inputs: { monthlyIncomeTarget: 4000, workDaysPerWeek: 5, billableHoursPerDay: 8, weeksOffPerYear: 2, overheadPercent: 0 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$24.00/hr" &&
      result.secondary?.[0]?.value === "$192.00" &&
      result.secondary?.[1]?.value === "$48,000.00" &&
      result.secondary?.[2]?.value === "2,000 hours",
  },
  {
    name: "accepts weeksOffPerYear at its maximum allowed value of 51",
    inputs: { monthlyIncomeTarget: 3000, workDaysPerWeek: 5, billableHoursPerDay: 6, weeksOffPerYear: 51, overheadPercent: 10 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$1,333.33/hr" &&
      result.secondary?.[0]?.value === "$8,000.00" &&
      result.secondary?.[1]?.value === "$40,000.00" &&
      result.secondary?.[2]?.value === "30 hours",
  },
  {
    name: "computes correctly at a high overhead percentage of 90",
    inputs: { monthlyIncomeTarget: 8000, workDaysPerWeek: 5, billableHoursPerDay: 7, weeksOffPerYear: 8, overheadPercent: 90 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$623.38/hr" &&
      result.secondary?.[0]?.value === "$4,363.64" &&
      result.secondary?.[1]?.value === "$960,000.00" &&
      result.secondary?.[2]?.value === "1,540 hours",
  },
  {
    name: "handles a fractional billable hours per day input",
    inputs: { monthlyIncomeTarget: 6500, workDaysPerWeek: 5, billableHoursPerDay: 6.5, weeksOffPerYear: 5, overheadPercent: 25 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$68.09/hr" &&
      result.secondary?.[0]?.value === "$442.55" &&
      result.secondary?.[1]?.value === "$104,000.00" &&
      result.secondary?.[2]?.value === "1,527.5 hours",
  },
  {
    name: "rejects an overhead percent of 99 as outside the allowed range",
    inputs: { monthlyIncomeTarget: 6000, workDaysPerWeek: 5, billableHoursPerDay: 6, weeksOffPerYear: 4, overheadPercent: 99 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects an overhead percent of 100 outright, since it would divide by zero",
    inputs: { monthlyIncomeTarget: 6000, workDaysPerWeek: 5, billableHoursPerDay: 6, weeksOffPerYear: 4, overheadPercent: 100 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects weeksOffPerYear of 52, since no working weeks would remain",
    inputs: { monthlyIncomeTarget: 6000, workDaysPerWeek: 5, billableHoursPerDay: 6, weeksOffPerYear: 52, overheadPercent: 20 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a monthly income target of zero, below the minimum",
    inputs: { monthlyIncomeTarget: 0, workDaysPerWeek: 5, billableHoursPerDay: 6, weeksOffPerYear: 4, overheadPercent: 20 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a work week of eight days, above the seven day maximum",
    inputs: { monthlyIncomeTarget: 6000, workDaysPerWeek: 8, billableHoursPerDay: 6, weeksOffPerYear: 4, overheadPercent: 20 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects billable hours per day below the half hour minimum",
    inputs: { monthlyIncomeTarget: 6000, workDaysPerWeek: 5, billableHoursPerDay: 0.4, weeksOffPerYear: 4, overheadPercent: 20 },
    check: (result) => result.kind === "error",
  },
];
