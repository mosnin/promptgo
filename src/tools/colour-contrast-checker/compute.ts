import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Implements the WCAG 2.1 relative luminance and contrast ratio formula
 * exactly as specified, rather than an approximation of it.
 *
 * Relative luminance: each sRGB channel is linearised with the standard
 * piecewise gamma curve (a straight division below the 0.03928 threshold,
 * a power curve above it), then combined with the fixed WCAG weights
 * 0.2126 red, 0.7152 green, 0.0722 blue. Contrast ratio is then
 * (lighter + 0.05) / (darker + 0.05), which is always at least 1 and at
 * most 21.
 */

type Rgb = [number, number, number];

const HEX_PATTERN = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function parseHex(raw: string): Rgb | null {
  const match = HEX_PATTERN.exec(raw.trim());
  if (!match) return null;
  let hex = match[1];
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((digit) => digit + digit)
      .join("");
  }
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function linearise(channel255: number): number {
  const c = channel255 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: Rgb): number {
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function passFail(ratio: number, threshold: number): "Pass" | "Fail" {
  return ratio >= threshold ? "Pass" : "Fail";
}

export const compute: ComputeFn = (inputs) => {
  const foregroundRaw = String(inputs.foreground ?? "").trim();
  const backgroundRaw = String(inputs.background ?? "").trim();

  if (!foregroundRaw || !backgroundRaw) {
    return { kind: "error", message: "Enter both a foreground and a background hex colour." };
  }

  const foreground = parseHex(foregroundRaw);
  if (!foreground) {
    return {
      kind: "error",
      message: `"${foregroundRaw}" is not a valid hex colour. Use 3 or 6 hex digits, with or without a leading #.`,
    };
  }

  const background = parseHex(backgroundRaw);
  if (!background) {
    return {
      kind: "error",
      message: `"${backgroundRaw}" is not a valid hex colour. Use 3 or 6 hex digits, with or without a leading #.`,
    };
  }

  const ratio = contrastRatio(foreground, background);
  const ratioValue = `${ratio.toFixed(2)}:1`;

  return {
    kind: "value",
    headline: { label: "Contrast ratio", value: ratioValue },
    secondary: [
      { label: "AA normal text", value: passFail(ratio, 4.5) },
      { label: "AA large text", value: passFail(ratio, 3.0) },
      { label: "AAA normal text", value: passFail(ratio, 7.0) },
      { label: "AAA large text", value: passFail(ratio, 4.5) },
    ],
    notes: [
      "Normal text is anything smaller than 18 point, or smaller than 14 point bold.",
      "Large text is 18 point and above, or 14 point and above when bold.",
      "The ratio is calculated from WCAG 2.1 relative luminance, not from a visual estimate, so it never changes for the same pair of colours.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "black on white gives the maximum possible ratio of 21:1 and passes every threshold",
    inputs: { foreground: "#000000", background: "#ffffff" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "21.00:1" &&
      (result.secondary?.every((row) => row.value === "Pass") ?? false),
  },
  {
    name: "identical colours give the minimum possible ratio of 1:1 and fail every threshold",
    inputs: { foreground: "#ffffff", background: "#ffffff" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "1.00:1" &&
      (result.secondary?.every((row) => row.value === "Fail") ?? false),
  },
  {
    name: "a mid grey that clears AA but not AAA is reported correctly on both levels",
    inputs: { foreground: "#767676", background: "#ffffff" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "4.54:1" &&
        bySide["AA normal text"] === "Pass" &&
        bySide["AA large text"] === "Pass" &&
        bySide["AAA normal text"] === "Fail" &&
        bySide["AAA large text"] === "Pass"
      );
    },
  },
  {
    name: "an invalid hex string returns an error rather than a guessed result",
    inputs: { foreground: "notacolor", background: "#ffffff" },
    check: (result) => result.kind === "error",
  },
  {
    name: "3-digit hex without a leading # is expanded and parsed the same as its 6-digit form",
    inputs: { foreground: "777", background: "fff" },
    check: (result) => result.kind === "value" && result.headline.value === "4.48:1",
  },
  {
    name: "the ratio is symmetric: swapping foreground and background does not change it",
    inputs: { foreground: "#ffffff", background: "#000000" },
    check: (result) => result.kind === "value" && result.headline.value === "21.00:1",
  },
  {
    name: "the default field examples produce a strong pass on every threshold",
    inputs: { foreground: "#1a1a1a", background: "#ffffff" },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "17.40:1" &&
      (result.secondary?.every((row) => row.value === "Pass") ?? false),
  },
];
