import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Generates a colour harmony from a single base hex colour using the
 * standard RGB to HSL to RGB round trip, exactly as published (the same
 * piecewise formula used in the CSS Color and W3C specifications), rather
 * than an approximation of it.
 *
 * The palette only ever rotates hue. Saturation and lightness stay pinned
 * to whatever the base colour's own values are, so a muted base colour
 * produces a muted palette and a vivid one produces a vivid palette,
 * instead of every generated palette drifting toward the same generic
 * fully saturated look.
 */

type Rgb = [number, number, number];
type Hsl = { h: number; s: number; l: number };

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
  return (
    "#" +
    rgb
      .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** The standard RGB to HSL conversion: max/min of the normalised channels,
 * lightness as their midpoint, saturation and hue from the usual piecewise
 * formula keyed on which channel is largest. */
function rgbToHsl([r255, g255, b255]: Rgb): Hsl {
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  if (max === r) {
    h = (g - b) / d + (g < b ? 6 : 0);
  } else if (max === g) {
    h = (b - r) / d + 2;
  } else {
    h = (r - g) / d + 4;
  }
  h *= 60;

  return { h, s, l };
}

function hue2rgb(p: number, q: number, tIn: number): number {
  let t = tIn;
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/** The inverse of rgbToHsl: the standard HSL to RGB algorithm. */
function hslToRgb({ h, s, l }: Hsl): Rgb {
  if (s === 0) {
    const grey = l * 255;
    return [grey, grey, grey];
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hFrac = ((h % 360) + 360) % 360 / 360;

  const r = hue2rgb(p, q, hFrac + 1 / 3);
  const g = hue2rgb(p, q, hFrac);
  const b = hue2rgb(p, q, hFrac - 1 / 3);

  return [r * 255, g * 255, b * 255];
}

function rotateHue(hsl: Hsl, degrees: number): Hsl {
  const h = ((hsl.h + degrees) % 360 + 360) % 360;
  return { h, s: hsl.s, l: hsl.l };
}

function swatchAt(hsl: Hsl, degrees: number, label: string): { hex: string; label: string } {
  const rotated = rotateHue(hsl, degrees);
  return { hex: toHex(hslToRgb(rotated)), label };
}

export const compute: ComputeFn = (inputs) => {
  const baseRaw = String(inputs.baseColour ?? "").trim();
  const harmony = String(inputs.harmony ?? "complementary").trim();

  if (!baseRaw) {
    return { kind: "error", message: "Enter a base hex colour." };
  }

  const baseRgb = parseHex(baseRaw);
  if (!baseRgb) {
    return {
      kind: "error",
      message: `"${baseRaw}" is not a valid hex colour. Use 3 or 6 hex digits, with or without a leading #.`,
    };
  }

  const baseHsl = rgbToHsl(baseRgb);
  const baseHex = toHex(baseRgb);
  const roundedHue = Math.round(baseHsl.h);
  const roundedSat = Math.round(baseHsl.s * 100);
  const roundedLight = Math.round(baseHsl.l * 100);

  const swatches: { hex: string; label: string }[] = [{ hex: baseHex, label: "Base" }];
  let harmonyName: string;

  if (harmony === "analogous") {
    harmonyName = "Analogous";
    swatches.push(swatchAt(baseHsl, -30, "Analogous -30°"));
    swatches.push(swatchAt(baseHsl, 30, "Analogous +30°"));
  } else if (harmony === "triadic") {
    harmonyName = "Triadic";
    swatches.push(swatchAt(baseHsl, 120, "Triadic +120°"));
    swatches.push(swatchAt(baseHsl, 240, "Triadic +240°"));
  } else {
    harmonyName = "Complementary";
    swatches.push(swatchAt(baseHsl, 180, "Complement"));
  }

  return {
    kind: "swatches",
    label: "Palette",
    swatches,
    notes: [
      `Base colour: hue ${roundedHue}°, saturation ${roundedSat}%, lightness ${roundedLight}%.`,
      `${harmonyName} rotates hue only. Every swatch shares the base colour's own saturation and lightness.`,
      "Hue wraps at 360 degrees, so a rotation that passes 360 or drops below 0 lands back inside the normal 0 to 359 range.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "pure red's complementary swatch is exact cyan, the hand verified reference case",
    inputs: { baseColour: "#ff0000", harmony: "complementary" },
    check: (result) =>
      result.kind === "swatches" &&
      result.swatches.length === 2 &&
      result.swatches[0].hex === "#ff0000" &&
      result.swatches[1].hex === "#00ffff",
  },
  {
    name: "pure red's triadic swatches land exactly on pure green and pure blue",
    inputs: { baseColour: "#ff0000", harmony: "triadic" },
    check: (result) =>
      result.kind === "swatches" &&
      result.swatches.length === 3 &&
      result.swatches[0].hex === "#ff0000" &&
      result.swatches[1].hex === "#00ff00" &&
      result.swatches[2].hex === "#0000ff",
  },
  {
    name: "pure red's analogous swatches sit at hue 330 and hue 30, hand computed against the formula",
    inputs: { baseColour: "#ff0000", harmony: "analogous" },
    check: (result) =>
      result.kind === "swatches" &&
      result.swatches.length === 3 &&
      result.swatches[0].hex === "#ff0000" &&
      result.swatches[1].hex === "#ff0080" &&
      result.swatches[2].hex === "#ff8000",
  },
  {
    name: "a fully desaturated grey base stays the exact same grey after hue rotation, since saturation is 0",
    inputs: { baseColour: "#808080", harmony: "complementary" },
    check: (result) =>
      result.kind === "swatches" &&
      result.swatches.length === 2 &&
      result.swatches[0].hex === "#808080" &&
      result.swatches[1].hex === "#808080",
  },
  {
    name: "an invalid hex string returns an error rather than a guessed palette",
    inputs: { baseColour: "not-a-colour", harmony: "complementary" },
    check: (result) => result.kind === "error",
  },
  {
    name: "the default field examples produce a valid palette without throwing",
    inputs: { baseColour: "#3b82f6", harmony: "complementary" },
    check: (result) => result.kind === "swatches" && result.swatches.length === 2,
  },
];
