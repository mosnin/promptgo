import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Converts between an annual salary and an hourly rate in both directions,
 * using only the two figures that actually vary between jobs: hours worked
 * per week and paid weeks worked per year.
 *
 * fromAnnual: hourly = annual / (hoursPerWeek * weeksPerYear)
 *             weekly = hourly * hoursPerWeek
 *             monthly = annual / 12
 *
 * fromHourly: annual = hourly * hoursPerWeek * weeksPerYear
 *             weekly = hourly * hoursPerWeek
 *             monthly = annual / 12
 *
 * Monthly is always annual / 12, never weekly * 4.33 rounded further or
 * weekly * 4, because a real monthly paycheck is one twelfth of the year's
 * total, not a multiple of a weekly figure restated. hoursPerWeek is
 * rejected above 168 since a week only has 168 hours, and weeksPerYear is
 * rejected above 52 for the same reason applied to a year.
 */

function currency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const compute: ComputeFn = (inputs) => {
  const mode = String(inputs.mode ?? "");
  const amount = Number(inputs.amount);
  const hoursPerWeek = Number(inputs.hoursPerWeek);
  const weeksPerYear = Number(inputs.weeksPerYear);

  if (!Number.isFinite(amount) || !Number.isFinite(hoursPerWeek) || !Number.isFinite(weeksPerYear)) {
    return { kind: "error", message: "Enter the amount, hours per week and weeks per year as numbers." };
  }

  if (amount <= 0) {
    return { kind: "error", message: "The amount has to be greater than zero." };
  }

  if (hoursPerWeek <= 0 || hoursPerWeek > 168) {
    return { kind: "error", message: "Hours per week has to be greater than 0 and no more than 168, since a week only has 168 hours." };
  }

  if (weeksPerYear <= 0 || weeksPerYear > 52) {
    return { kind: "error", message: "Weeks per year has to be greater than 0 and no more than 52, since a year only has 52 complete weeks." };
  }

  let hourly: number;
  let weekly: number;
  let monthly: number;
  let annual: number;

  if (mode === "fromAnnual") {
    annual = amount;
    hourly = amount / (hoursPerWeek * weeksPerYear);
    weekly = hourly * hoursPerWeek;
    monthly = amount / 12;
  } else if (mode === "fromHourly") {
    hourly = amount;
    annual = amount * hoursPerWeek * weeksPerYear;
    weekly = amount * hoursPerWeek;
    monthly = annual / 12;
  } else {
    return { kind: "error", message: "Choose a direction: convert an annual salary, or convert an hourly rate." };
  }

  const secondary = [
    { label: "Annual", value: currency(annual) },
    { label: "Monthly", value: currency(monthly) },
    { label: "Weekly", value: currency(weekly) },
    { label: "Hourly", value: currency(hourly) },
  ];

  const headline =
    mode === "fromAnnual"
      ? { label: "Hourly rate", value: currency(hourly) }
      : { label: "Annual salary", value: currency(annual) };

  return {
    kind: "value",
    headline,
    secondary,
    notes: [
      "Monthly is the annual figure divided by 12, not the weekly figure multiplied by four, since most months are not exactly four weeks long.",
      "Weeks per year should exclude any unpaid time off. Use 52 only if every week of the year is actually paid.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "converts a standard annual salary to hourly, weekly and monthly",
    inputs: { mode: "fromAnnual", amount: 75000, hoursPerWeek: 40, weeksPerYear: 52 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.label === "Hourly rate" &&
      result.headline.value === "$36.06" &&
      result.secondary?.[0]?.value === "$75,000.00" &&
      result.secondary?.[1]?.value === "$6,250.00" &&
      result.secondary?.[2]?.value === "$1,442.31",
  },
  {
    name: "converts a standard hourly rate to annual, weekly and monthly",
    inputs: { mode: "fromHourly", amount: 25, hoursPerWeek: 40, weeksPerYear: 52 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.label === "Annual salary" &&
      result.headline.value === "$52,000.00" &&
      result.secondary?.[2]?.value === "$1,000.00" &&
      result.secondary?.[1]?.value === "$4,333.33" &&
      result.secondary?.[3]?.value === "$25.00",
  },
  {
    name: "handles the boundary of 168 hours and 52 weeks without rejecting it",
    inputs: { mode: "fromHourly", amount: 10, hoursPerWeek: 168, weeksPerYear: 52 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$87,360.00" &&
      result.secondary?.[2]?.value === "$1,680.00" &&
      result.secondary?.[1]?.value === "$7,280.00",
  },
  {
    name: "accounts for unpaid weeks off by lowering weeksPerYear below 52",
    inputs: { mode: "fromAnnual", amount: 60000, hoursPerWeek: 37.5, weeksPerYear: 48 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$33.33" &&
      result.secondary?.[2]?.value === "$1,250.00" &&
      result.secondary?.[1]?.value === "$5,000.00",
  },
  {
    name: "converts a part time hourly rate on fewer than 40 hours a week",
    inputs: { mode: "fromHourly", amount: 15.5, hoursPerWeek: 20, weeksPerYear: 52 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$16,120.00" &&
      result.secondary?.[2]?.value === "$310.00" &&
      result.secondary?.[1]?.value === "$1,343.33",
  },
  {
    name: "rejects a zero amount rather than returning zero for every figure",
    inputs: { mode: "fromAnnual", amount: 0, hoursPerWeek: 40, weeksPerYear: 52 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects zero hours per week rather than dividing by zero",
    inputs: { mode: "fromAnnual", amount: 75000, hoursPerWeek: 0, weeksPerYear: 52 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects weeks per year above 52",
    inputs: { mode: "fromHourly", amount: 25, hoursPerWeek: 40, weeksPerYear: 53 },
    check: (result) => result.kind === "error",
  },
];
