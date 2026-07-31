import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Standard percentage arithmetic, split into the three calculations people
 * mean when they say "percentage":
 *
 * "of"            result = (x / 100) * y            X% of Y
 * "isWhatPercent" result = (x / y) * 100             X is what percent of Y
 * "change"        result = ((y - x) / x) * 100       percent change from X to Y
 *
 * The two division based modes reject a zero denominator with an explicit
 * error rather than returning Infinity, NaN, or a plausible-looking but
 * meaningless number.
 */

function formatPlain(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  // Avoid rendering -0.
  const normalised = rounded === 0 ? 0 : rounded;
  return normalised.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function formatPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const normalised = rounded === 0 ? 0 : rounded;
  return `${normalised.toFixed(1)}%`;
}

function formatSignedPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const normalised = rounded === 0 ? 0 : rounded;
  const sign = normalised >= 0 ? "+" : "";
  return `${sign}${normalised.toFixed(1)}%`;
}

export const compute: ComputeFn = (inputs) => {
  const mode = String(inputs.mode);
  const x = Number(inputs.x);
  const y = Number(inputs.y);

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { kind: "error", message: "Enter the first number and the second number as numbers." };
  }

  if (mode === "of") {
    const result = (x / 100) * y;
    return {
      kind: "value",
      headline: { label: `${formatPlain(x)}% of ${formatPlain(y)}`, value: formatPlain(result) },
      secondary: [{ label: "Calculation", value: `${formatPlain(x)}% x ${formatPlain(y)}` }],
      notes: [
        "Percent of a number: divide the percentage by 100, then multiply by the number.",
      ],
    };
  }

  if (mode === "isWhatPercent") {
    if (y === 0) {
      return {
        kind: "error",
        message: "The second number cannot be zero in \"X is what % of Y\" mode, since dividing by zero has no defined result.",
      };
    }
    const result = (x / y) * 100;
    return {
      kind: "value",
      headline: { label: `${formatPlain(x)} is what percent of ${formatPlain(y)}`, value: formatPercent(result) },
      secondary: [{ label: "Calculation", value: `${formatPlain(x)} / ${formatPlain(y)} x 100` }],
      notes: [
        "Part of a whole: divide the part by the whole, then multiply by 100.",
      ],
    };
  }

  if (mode === "change") {
    if (x === 0) {
      return {
        kind: "error",
        message: "The first number cannot be zero in \"% change from X to Y\" mode, since percent change from zero is undefined.",
      };
    }
    const result = ((y - x) / x) * 100;
    return {
      kind: "value",
      headline: { label: `Percent change from ${formatPlain(x)} to ${formatPlain(y)}`, value: formatSignedPercent(result) },
      secondary: [{ label: "Difference", value: formatPlain(y - x) }],
      notes: [
        "Percent change: subtract the starting value from the ending value, divide by the starting value, then multiply by 100. A negative result is a decrease.",
      ],
    };
  }

  return { kind: "error", message: "Choose a calculation: X% of Y, X is what % of Y, or % change from X to Y." };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes X% of Y for the standard example",
    inputs: { mode: "of", x: 20, y: 150 },
    check: (result) => result.kind === "value" && result.headline.value === "30" && result.headline.label === "20% of 150",
  },
  {
    name: "returns zero when the percentage in X% of Y mode is zero",
    inputs: { mode: "of", x: 0, y: 500 },
    check: (result) => result.kind === "value" && result.headline.value === "0",
  },
  {
    name: "computes X is what % of Y for the standard example",
    inputs: { mode: "isWhatPercent", x: 30, y: 150 },
    check: (result) => result.kind === "value" && result.headline.value === "20.0%",
  },
  {
    name: "rounds X is what % of Y to one decimal place when the division does not resolve evenly",
    inputs: { mode: "isWhatPercent", x: 1, y: 3 },
    check: (result) => result.kind === "value" && result.headline.value === "33.3%",
  },
  {
    name: "computes a positive percent change from 100 to 150",
    inputs: { mode: "change", x: 100, y: 150 },
    check: (result) => result.kind === "value" && result.headline.value === "+50.0%",
  },
  {
    name: "computes a negative percent change from 150 to 100",
    inputs: { mode: "change", x: 150, y: 100 },
    check: (result) => result.kind === "value" && result.headline.value === "-33.3%",
  },
  {
    name: "rejects a zero second number in X is what % of Y mode",
    inputs: { mode: "isWhatPercent", x: 30, y: 0 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a zero first number in % change mode",
    inputs: { mode: "change", x: 0, y: 150 },
    check: (result) => result.kind === "error",
  },
];
