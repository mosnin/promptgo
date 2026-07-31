import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Builds a real CSS box-shadow declaration from six numeric offsets and one
 * hex colour, exactly as the CSS Backgrounds and Borders specification
 * defines the property's own argument order: offset-x, offset-y,
 * blur-radius, spread-radius, then colour, with an optional leading inset
 * keyword. Nothing here is estimated: the hex colour is parsed into RGB
 * channels the same way the colour palette generator on this site does,
 * opacity is folded into that colour as a plain rgba() value, and the
 * numbers a visitor typed are placed back into the declaration unchanged.
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

export const compute: ComputeFn = (inputs) => {
  const offsetX = Number(inputs.offsetX);
  const offsetY = Number(inputs.offsetY);
  const blurRadius = Number(inputs.blurRadius);
  const spreadRadius = Number(inputs.spreadRadius);
  const opacity = Number(inputs.opacity);
  const colourRaw = String(inputs.colour ?? "").trim();
  const inset = Boolean(inputs.inset);

  if (!Number.isFinite(offsetX) || offsetX < -100 || offsetX > 100) {
    return { kind: "error", message: "Horizontal offset must be a number between -100 and 100." };
  }
  if (!Number.isFinite(offsetY) || offsetY < -100 || offsetY > 100) {
    return { kind: "error", message: "Vertical offset must be a number between -100 and 100." };
  }
  if (!Number.isFinite(blurRadius) || blurRadius < 0 || blurRadius > 200) {
    return { kind: "error", message: "Blur radius must be a number between 0 and 200, since a negative blur is not valid CSS." };
  }
  if (!Number.isFinite(spreadRadius) || spreadRadius < -100 || spreadRadius > 100) {
    return { kind: "error", message: "Spread radius must be a number between -100 and 100." };
  }
  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 100) {
    return { kind: "error", message: "Opacity must be a number between 0 and 100." };
  }

  if (!colourRaw) {
    return { kind: "error", message: "Enter a shadow colour." };
  }
  const rgb = parseHex(colourRaw);
  if (!rgb) {
    return {
      kind: "error",
      message: `"${colourRaw}" is not a valid hex colour. Use 3 or 6 hex digits, with or without a leading #.`,
    };
  }

  const [r, g, b] = rgb;
  const alpha = (opacity / 100).toFixed(2);
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  const insetPrefix = inset ? "inset " : "";
  const shadowValue = `${insetPrefix}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${rgba}`;
  const css = `box-shadow: ${shadowValue};`;

  return {
    kind: "css",
    label: "Box shadow",
    css,
    previewStyle: {
      boxShadow: shadowValue,
      backgroundColor: "#d4d4d8",
    },
    notes: [
      `Colour parsed to rgb(${r}, ${g}, ${b}), then combined with ${opacity}% opacity into ${rgba}.`,
      inset
        ? "Inset is on, so the shadow is drawn inside the element's border rather than outside it."
        : "Inset is off, so the shadow is drawn outside the element, behind its border.",
      "Offset, blur and spread are used exactly as entered: negative offsets move the shadow left or up, and spread expands or shrinks it independently of blur.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "a standard drop shadow with all positive values matches the field examples",
    inputs: { offsetX: 2, offsetY: 4, blurRadius: 12, spreadRadius: 0, colour: "#000000", opacity: 20, inset: false },
    check: (result) =>
      result.kind === "css" &&
      result.css === "box-shadow: 2px 4px 12px 0px rgba(0, 0, 0, 0.20);",
  },
  {
    name: "negative horizontal and vertical offsets are kept as negative numbers, not rejected",
    inputs: { offsetX: -8, offsetY: -8, blurRadius: 0, spreadRadius: 0, colour: "#ff0000", opacity: 50, inset: false },
    check: (result) =>
      result.kind === "css" &&
      result.css === "box-shadow: -8px -8px 0px 0px rgba(255, 0, 0, 0.50);",
  },
  {
    name: "inset true prepends the inset keyword before the offsets",
    inputs: { offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, colour: "#333", opacity: 30, inset: true },
    check: (result) =>
      result.kind === "css" &&
      result.css === "box-shadow: inset 0px 2px 4px 0px rgba(51, 51, 51, 0.30);",
  },
  {
    name: "opacity at 100 percent produces an alpha of exactly 1.00, fully opaque",
    inputs: { offsetX: 1, offsetY: 1, blurRadius: 2, spreadRadius: 1, colour: "#ffffff", opacity: 100, inset: false },
    check: (result) =>
      result.kind === "css" &&
      result.css === "box-shadow: 1px 1px 2px 1px rgba(255, 255, 255, 1.00);",
  },
  {
    name: "opacity at 0 percent produces an alpha of exactly 0.00, fully transparent",
    inputs: { offsetX: 5, offsetY: 5, blurRadius: 10, spreadRadius: 0, colour: "#123456", opacity: 0, inset: false },
    check: (result) =>
      result.kind === "css" &&
      result.css === "box-shadow: 5px 5px 10px 0px rgba(18, 52, 86, 0.00);",
  },
  {
    name: "an invalid hex colour returns an error rather than a guessed rgba value",
    inputs: { offsetX: 0, offsetY: 4, blurRadius: 12, spreadRadius: 0, colour: "not-a-colour", opacity: 20, inset: false },
    check: (result) => result.kind === "error",
  },
  {
    name: "a blur radius past the 200 maximum returns an error rather than clamping silently",
    inputs: { offsetX: 0, offsetY: 4, blurRadius: 250, spreadRadius: 0, colour: "#000000", opacity: 20, inset: false },
    check: (result) => result.kind === "error",
  },
];
