import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Validates the two inputs and hands them straight to the "qr" result shape.
 *
 * The QR symbol itself is not drawn here: it is rendered in the browser by
 * the `qrcode` package's canvas renderer (see `QrCanvas` in
 * `ToolResultView.tsx`), using the exact content and pixel size this function
 * returns. compute() never shortens, trims or otherwise rewrites the content
 * a visitor typed; it only rejects a blank submission or a size outside the
 * field's own 64 to 1024 pixel range.
 */
export const compute: ComputeFn = (inputs) => {
  const content = String(inputs.content ?? "");
  const rawSize = inputs.size;

  if (!content.trim()) {
    return { kind: "error", message: "Enter the URL or text the QR code should encode." };
  }

  const size = typeof rawSize === "number" ? rawSize : Number(rawSize);
  if (!Number.isFinite(size) || !Number.isInteger(size) || size < 64 || size > 1024) {
    return { kind: "error", message: "Size must be a whole number of pixels between 64 and 1024." };
  }

  return {
    kind: "qr",
    label: "QR code",
    value: content,
    size,
    notes: [
      "A QR code has no built in limit on how much content it can hold, but longer content produces a denser grid of modules that is harder for a phone camera to scan cleanly, especially once it is printed small.",
      "This tool does not shorten or track the destination. Build a tracked link first with the UTM link builder, then paste that finished URL in here to QR-encode it.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "encodes a normal URL with the content passed through unchanged",
    inputs: { content: "https://example.com/summer-sale", size: 256 },
    check: (result) =>
      result.kind === "qr" && result.value === "https://example.com/summer-sale" && result.size === 256,
  },
  {
    name: "encodes plain, non-URL text identically, since content is never validated as a link",
    inputs: { content: "Table 12, ask for the tasting menu", size: 256 },
    check: (result) =>
      result.kind === "qr" && result.value === "Table 12, ask for the tasting menu" && result.size === 256,
  },
  {
    name: "rejects blank content",
    inputs: { content: "", size: 256 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects whitespace-only content",
    inputs: { content: "   \n\t  ", size: 256 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a size below the 64 pixel minimum",
    inputs: { content: "https://example.com", size: 63 },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a size above the 1024 pixel maximum",
    inputs: { content: "https://example.com", size: 1025 },
    check: (result) => result.kind === "error",
  },
  {
    name: "accepts the exact minimum boundary of 64 pixels",
    inputs: { content: "https://example.com", size: 64 },
    check: (result) => result.kind === "qr" && result.size === 64,
  },
  {
    name: "accepts the exact maximum boundary of 1024 pixels",
    inputs: { content: "https://example.com", size: 1024 },
    check: (result) => result.kind === "qr" && result.size === 1024,
  },
];
