import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Builds a ready-to-paste CSS gradient declaration from a gradient type, an
 * angle (linear only) and a list of colour stops.
 *
 * Colour stops are sorted by position before the gradient string is built.
 * A gradient with out-of-order positions, such as a stop at 80% listed
 * before a stop at 20%, is technically valid CSS, since the spec never
 * requires ascending order, but it renders in the order given rather than
 * the order a person would expect from the numbers. Sorting first means the
 * output always matches what the position values actually describe, and the
 * result notes when the input order did not already match.
 */

type Rgb = [number, number, number];

const HEX_PATTERN = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/** Same validated 3- or 6-digit hex pattern used by the colour palette
 * generator: accepts a leading # or not, and a 3-digit shorthand. */
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

/** Validates a raw hex string and returns its canonical 6-digit lowercase
 * form, so a 3-digit shorthand and its 6-digit equivalent always render the
 * exact same CSS string. Returns null for anything that does not parse. */
function normaliseHex(raw: string): string | null {
  const rgb = parseHex(raw);
  return rgb ? toHex(rgb) : null;
}

interface Stop {
  hex: string;
  position: number;
}

export const compute: ComputeFn = (inputs) => {
  const gradientType = String(inputs.gradientType ?? "linear").trim();
  const angleRaw = inputs.angle;
  const angle = typeof angleRaw === "number" ? angleRaw : Number(angleRaw);
  const rows = Array.isArray(inputs.colourStops) ? inputs.colourStops : [];

  if (rows.length < 2) {
    return { kind: "error", message: "Add at least 2 colour stops to build a gradient." };
  }

  const stops: (Stop & { originalIndex: number })[] = [];

  for (let i = 0; i < rows.length; i += 1) {
    const rowRaw = rows[i];
    const row = (rowRaw ?? {}) as Record<string, unknown>;
    const hexRaw = String(row.hex ?? "").trim();
    const positionRaw = row.position;
    const position = typeof positionRaw === "number" ? positionRaw : Number(positionRaw);

    const hex = normaliseHex(hexRaw);
    if (!hex) {
      return {
        kind: "error",
        message: `Colour stop ${i + 1} has an invalid hex value "${hexRaw}". Use 3 or 6 hex digits, with or without a leading #.`,
      };
    }
    if (!Number.isFinite(position) || position < 0 || position > 100) {
      return {
        kind: "error",
        message: `Colour stop ${i + 1} needs a position between 0 and 100. Got "${String(positionRaw)}".`,
      };
    }

    stops.push({ hex, position, originalIndex: i });
  }

  if (gradientType === "linear" && !Number.isFinite(angle)) {
    return { kind: "error", message: "Enter a valid angle between 0 and 360 degrees for a linear gradient." };
  }

  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const wasReordered = sorted.some((stop, index) => stop.originalIndex !== index);
  const stopList = sorted.map((stop) => `${stop.hex} ${stop.position}%`).join(", ");

  const isRadial = gradientType === "radial";
  const gradientValue = isRadial
    ? `radial-gradient(circle, ${stopList})`
    : `linear-gradient(${angle}deg, ${stopList})`;
  const css = `background: ${gradientValue};`;

  const notes: string[] = [];
  if (wasReordered) {
    notes.push(
      "The colour stops were reordered by position, from 0% to 100%, before the gradient was built, since the order they were entered in did not already match ascending position order.",
    );
  }
  if (isRadial) {
    notes.push("Angle only applies to a linear gradient and was not used, since this is a radial gradient.");
  } else {
    notes.push(`This linear gradient runs at ${angle} degrees, where 0 degrees points to the top and the angle increases clockwise.`);
  }

  return {
    kind: "css",
    label: "Gradient",
    css,
    previewStyle: { background: gradientValue },
    notes,
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "a 2-stop linear gradient at 45 degrees builds the exact expected declaration",
    inputs: {
      gradientType: "linear",
      angle: 45,
      colourStops: [
        { hex: "#ff0000", position: 0 },
        { hex: "#0000ff", position: 100 },
      ],
    },
    check: (result) =>
      result.kind === "css" && result.css === "background: linear-gradient(45deg, #ff0000 0%, #0000ff 100%);",
  },
  {
    name: "3 stops entered out of position order are sorted before the gradient string is built",
    inputs: {
      gradientType: "linear",
      angle: 90,
      colourStops: [
        { hex: "#00ff00", position: 100 },
        { hex: "#ff0000", position: 0 },
        { hex: "#0000ff", position: 50 },
      ],
    },
    check: (result) =>
      result.kind === "css" &&
      result.css === "background: linear-gradient(90deg, #ff0000 0%, #0000ff 50%, #00ff00 100%);" &&
      (result.notes ?? []).some((note) => note.toLowerCase().includes("reordered")),
  },
  {
    name: "a radial gradient ignores the angle and uses the circle keyword",
    inputs: {
      gradientType: "radial",
      angle: 180,
      colourStops: [
        { hex: "#ffffff", position: 0 },
        { hex: "#000000", position: 100 },
      ],
    },
    check: (result) =>
      result.kind === "css" &&
      result.css === "background: radial-gradient(circle, #ffffff 0%, #000000 100%);" &&
      (result.notes ?? []).some((note) => note.toLowerCase().includes("radial gradient")),
  },
  {
    name: "an invalid hex on the second stop returns an error identifying that stop",
    inputs: {
      gradientType: "linear",
      angle: 90,
      colourStops: [
        { hex: "#3b82f6", position: 0 },
        { hex: "notahex", position: 100 },
      ],
    },
    check: (result) => result.kind === "error" && result.message.includes("Colour stop 2"),
  },
  {
    name: "fewer than 2 colour stops returns an error rather than a broken gradient",
    inputs: {
      gradientType: "linear",
      angle: 90,
      colourStops: [{ hex: "#3b82f6", position: 0 }],
    },
    check: (result) => result.kind === "error",
  },
  {
    name: "boundary positions of exactly 0 and exactly 100 are accepted, and 3-digit hex shorthand expands correctly",
    inputs: {
      gradientType: "linear",
      angle: 180,
      colourStops: [
        { hex: "#000", position: 0 },
        { hex: "#fff", position: 100 },
      ],
    },
    check: (result) =>
      result.kind === "css" && result.css === "background: linear-gradient(180deg, #000000 0%, #ffffff 100%);",
  },
];
