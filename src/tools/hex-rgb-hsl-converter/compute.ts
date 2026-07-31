import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Parses a 3 or 6 digit hex colour into 0-255 RGB channels, then converts
 * RGB to HSL using the standard, widely published algorithm: lightness is
 * the midpoint of the largest and smallest channel, saturation is the
 * channel spread scaled against how far that midpoint sits from the edges
 * of the 0-1 range, and hue is derived from which channel is largest and
 * how far the other two sit from it, expressed in 60 degree sectors.
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

function toHex(rgb: Rgb): string {
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl([r255, g255, b255]: Rgb): { h: number; s: number; l: number } {
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export const compute: ComputeFn = (inputs) => {
  const raw = String(inputs.hex ?? "").trim();

  if (!raw) {
    return { kind: "error", message: "Enter a hex colour code." };
  }

  const rgb = parseHex(raw);
  if (!rgb) {
    return {
      kind: "error",
      message: `"${raw}" is not a valid hex colour. Use 3 or 6 hex digits, with or without a leading #.`,
    };
  }

  const { h, s, l } = rgbToHsl(rgb);
  const [r, g, b] = rgb;

  return {
    kind: "value",
    headline: { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
    secondary: [
      { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
      { label: "Hex", value: toHex(rgb) },
    ],
    notes: [
      "Hue is 0 to 360 degrees around the colour wheel. Saturation and lightness are percentages from 0 to 100.",
      "When saturation is 0, the colour is a shade of grey and hue has no visible effect, so it is reported as 0 by convention.",
      "A 3-digit hex code is expanded to its 6-digit equivalent before conversion, so #3b8 and #33bb88 produce identical results.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "pure red converts to rgb(255, 0, 0) and hsl(0, 100%, 50%)",
    inputs: { hex: "#ff0000" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "hsl(0, 100%, 50%)" &&
        bySide.RGB === "rgb(255, 0, 0)" &&
        bySide.Hex === "#ff0000"
      );
    },
  },
  {
    name: "pure white converts to rgb(255, 255, 255) and hsl(0, 0%, 100%), hue defined as 0 at zero saturation",
    inputs: { hex: "#ffffff" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "hsl(0, 0%, 100%)" &&
        bySide.RGB === "rgb(255, 255, 255)" &&
        bySide.Hex === "#ffffff"
      );
    },
  },
  {
    name: "pure black converts to rgb(0, 0, 0) and hsl(0, 0%, 0%)",
    inputs: { hex: "#000000" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "hsl(0, 0%, 0%)" &&
        bySide.RGB === "rgb(0, 0, 0)" &&
        bySide.Hex === "#000000"
      );
    },
  },
  {
    name: "mid grey #808080 converts to rgb(128, 128, 128) and hsl(0, 0%, 50%), since 128/255 rounds to 50%",
    inputs: { hex: "#808080" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "hsl(0, 0%, 50%)" &&
        bySide.RGB === "rgb(128, 128, 128)" &&
        bySide.Hex === "#808080"
      );
    },
  },
  {
    name: "a 3-digit hex without a leading # is expanded before conversion",
    inputs: { hex: "3b8" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "hsl(158, 57%, 47%)" &&
        bySide.RGB === "rgb(51, 187, 136)" &&
        bySide.Hex === "#33bb88"
      );
    },
  },
  {
    name: "the default field example converts correctly",
    inputs: { hex: "#3b82f6" },
    check: (result) => {
      if (result.kind !== "value") return false;
      const bySide = Object.fromEntries((result.secondary ?? []).map((row) => [row.label, row.value]));
      return (
        result.headline.value === "hsl(217, 91%, 60%)" &&
        bySide.RGB === "rgb(59, 130, 246)" &&
        bySide.Hex === "#3b82f6"
      );
    },
  },
  {
    name: "an invalid hex string returns an error rather than a guessed result",
    inputs: { hex: "notacolor" },
    check: (result) => result.kind === "error",
  },
];
