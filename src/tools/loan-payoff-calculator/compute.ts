import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Standard loan amortization payoff-time formula.
 *
 * monthlyRate = annual rate / 100 / 12.
 *
 * A 0% loan has no formula to solve, since the closed form below divides by
 * log(1 + monthlyRate), which is undefined at a rate of zero: the payoff time
 * there is simply the balance divided by the payment, rounded up.
 *
 * Otherwise, each month's interest is balance * monthlyRate, and the payment
 * has to be strictly larger than that first month's interest or the balance
 * never shrinks (a payment equal to or below the first month's interest holds
 * the balance flat or grows it, since every future month's interest is at
 * least as large as the first while the balance is at or above where it
 * started). Given that, the number of months to reach a zero balance has a
 * closed form derived from the amortization formula:
 *
 *   months = -log(1 - (principal * monthlyRate) / monthlyPayment) / log(1 + monthlyRate)
 *
 * rounded up, since a loan is not paid off until a whole extra payment
 * finishes it off. This was cross-checked against an independent month by
 * month simulation (interest = balance * monthlyRate; balance = balance +
 * interest - monthlyPayment; repeat until balance <= 0) across a range of
 * balances, rates and payments, including cases where the closed form's raw
 * result before rounding was not a whole number, which is exactly where a
 * rounding bug would show up. Both methods produced the same month count in
 * every case tested.
 *
 * totalPaid is monthsToPayoff * monthlyPayment. This is an approximation: a
 * real final payment is almost always smaller than a full payment, since it
 * only needs to cover what remains rather than a whole payment's worth. The
 * tool discloses this in its notes rather than computing the true smaller
 * final payment, which this formula alone cannot produce.
 */
export const compute: ComputeFn = (inputs) => {
  const principal = Number(inputs.principal);
  const annualRatePercent = Number(inputs.annualRatePercent);
  const monthlyPayment = Number(inputs.monthlyPayment);

  if (!Number.isFinite(principal) || !Number.isFinite(annualRatePercent) || !Number.isFinite(monthlyPayment)) {
    return { kind: "error", message: "Enter the remaining balance, interest rate and monthly payment as numbers." };
  }

  if (principal <= 0) {
    return { kind: "error", message: "Remaining loan balance has to be greater than zero." };
  }
  if (annualRatePercent < 0) {
    return { kind: "error", message: "Annual interest rate cannot be negative." };
  }
  if (monthlyPayment <= 0) {
    return { kind: "error", message: "Monthly payment amount has to be greater than zero." };
  }

  const currency = (value: number) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const monthlyRate = annualRatePercent / 100 / 12;

  let monthsToPayoff: number;
  let totalInterest: number;
  let totalPaid: number;

  if (monthlyRate === 0) {
    monthsToPayoff = Math.ceil(principal / monthlyPayment);
    totalInterest = 0;
    totalPaid = principal;
  } else {
    const firstMonthInterest = principal * monthlyRate;
    if (monthlyPayment <= firstMonthInterest) {
      return {
        kind: "error",
        message: `A monthly payment of ${currency(monthlyPayment)} will never pay off this loan at ${annualRatePercent}% interest. The first month's interest alone comes to ${currency(firstMonthInterest)}, so the balance would hold steady or grow instead of shrinking. Enter a monthly payment above ${currency(firstMonthInterest)}.`,
      };
    }

    monthsToPayoff = Math.ceil(
      -Math.log(1 - (principal * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate)
    );
    totalPaid = monthsToPayoff * monthlyPayment;
    totalInterest = totalPaid - principal;
  }

  const years = Math.floor(monthsToPayoff / 12);
  const remMonths = monthsToPayoff % 12;
  const durationParts: string[] = [];
  if (years > 0) durationParts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (remMonths > 0 || years === 0) durationParts.push(`${remMonths} month${remMonths === 1 ? "" : "s"}`);
  const durationText = durationParts.join(", ");

  return {
    kind: "value",
    headline: {
      label: "Time to pay off this loan",
      value: `${monthsToPayoff} month${monthsToPayoff === 1 ? "" : "s"} (${durationText})`,
    },
    secondary: [
      { label: "Total interest paid (approx)", value: currency(totalInterest) },
      { label: "Total amount paid (approx)", value: currency(totalPaid) },
    ],
    notes: [
      "Months to payoff comes from the standard loan amortization payoff formula, rounded up to a whole month, since a loan is not paid off until a whole extra payment finishes it off.",
      "Total interest paid and total amount paid are estimates that assume every payment, including the last one, is the same fixed amount. A real final payment is almost always smaller, since it only needs to cover what remains rather than a full payment, so both figures here slightly overstate the true totals.",
      "This assumes the interest rate and payment amount stay the same for the life of the loan. A variable rate or a change in payment amount will change the real payoff time.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "example values: 15000 balance at 6% with a 400 monthly payment",
    inputs: { principal: 15000, annualRatePercent: 6, monthlyPayment: 400 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "42 months (3 years, 6 months)" &&
      result.secondary?.[0]?.value === "$1,800.00" &&
      result.secondary?.[1]?.value === "$16,800.00",
  },
  {
    name: "0% interest loan pays off in balance divided by payment, rounded up",
    inputs: { principal: 1200, annualRatePercent: 0, monthlyPayment: 100 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "12 months (1 year)" &&
      result.secondary?.[0]?.value === "$0.00" &&
      result.secondary?.[1]?.value === "$1,200.00",
  },
  {
    name: "a payment too small to ever cover the first month's interest returns an actionable error",
    inputs: { principal: 10000, annualRatePercent: 24, monthlyPayment: 100 },
    check: (result) => result.kind === "error" && result.message.includes("$200.00"),
  },
  {
    name: "boundary: a payment exactly equal to the first month's interest is still rejected, not accepted as break even",
    inputs: { principal: 10000, annualRatePercent: 12, monthlyPayment: 100 },
    check: (result) => result.kind === "error" && result.message.includes("$100.00"),
  },
  {
    name: "a fractional raw month count rounds up to a whole month rather than truncating",
    inputs: { principal: 5000, annualRatePercent: 18, monthlyPayment: 200 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "32 months (2 years, 8 months)" &&
      result.secondary?.[0]?.value === "$1,400.00" &&
      result.secondary?.[1]?.value === "$6,400.00",
  },
  {
    name: "a larger balance and payment combination matches the independently simulated month count",
    inputs: { principal: 25000, annualRatePercent: 7.5, monthlyPayment: 550 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "54 months (4 years, 6 months)" &&
      result.secondary?.[0]?.value === "$4,700.00" &&
      result.secondary?.[1]?.value === "$29,700.00",
  },
  {
    name: "a small balance with a non round rate still matches the simulated month count",
    inputs: { principal: 2000, annualRatePercent: 9.99, monthlyPayment: 150 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "15 months (1 year, 3 months)" &&
      result.secondary?.[0]?.value === "$250.00" &&
      result.secondary?.[1]?.value === "$2,250.00",
  },
  {
    name: "rejects a zero or negative remaining balance",
    inputs: { principal: 0, annualRatePercent: 6, monthlyPayment: 400 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a negative interest rate",
    inputs: { principal: 15000, annualRatePercent: -1, monthlyPayment: 400 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a zero or negative monthly payment",
    inputs: { principal: 15000, annualRatePercent: 6, monthlyPayment: 0 },
    check: (result) => result.kind === "error",
  },
];
