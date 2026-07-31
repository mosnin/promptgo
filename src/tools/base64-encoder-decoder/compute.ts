import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Encodes and decodes Base64 using the browser's own btoa and atob, plus
 * TextEncoder and TextDecoder for the UTF-8 conversion those two functions do
 * not do themselves.
 *
 * btoa and atob only understand a "binary string", one character per byte
 * with code points 0 to 255. Handing text with an accented letter or an
 * emoji straight to btoa throws, because those characters need more than one
 * byte in UTF-8. TextEncoder produces the actual UTF-8 bytes first, which are
 * then mapped one byte per character into the binary string btoa expects.
 * Decoding reverses the same two steps: atob back to a binary string, then
 * TextDecoder reads those bytes as UTF-8 rather than treating each one as its
 * own character.
 */

function bytesToBinaryString(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return binary;
}

export const compute: ComputeFn = (inputs) => {
  const text = String(inputs.text ?? "");
  const mode = String(inputs.mode ?? "encode");

  if (!text.trim()) {
    return {
      kind: "error",
      message:
        mode === "encode" ? "Enter some text to Base64 encode." : "Enter some Base64 text to decode.",
    };
  }

  if (mode === "encode") {
    const bytes = new TextEncoder().encode(text);
    const binary = bytesToBinaryString(bytes);
    const value = btoa(binary);

    return {
      kind: "text",
      label: "Base64",
      value,
      monospace: true,
      notes: [
        "Encoded from the UTF-8 bytes of your text, so accented letters, symbols and emoji round trip correctly, not just plain ASCII.",
      ],
    };
  }

  const stripped = text.replace(/\s+/g, "");

  if (stripped === "" || !/^[A-Za-z0-9+/]*={0,2}$/.test(stripped) || stripped.length % 4 !== 0) {
    return {
      kind: "error",
      message:
        "That is not valid Base64. Base64 uses only A-Z, a-z, 0-9, + and /, optionally padded with = at the end, in a length that is a multiple of 4.",
    };
  }

  let binary: string;
  try {
    binary = atob(stripped);
  } catch {
    return {
      kind: "error",
      message: "That is not valid Base64. Check for a missing character or stray padding and try again.",
    };
  }

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  let value: string;
  try {
    value = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return {
      kind: "error",
      message: "That decodes to bytes that are not valid UTF-8 text, so it is not text this tool can display.",
    };
  }

  return {
    kind: "text",
    label: "Decoded text",
    value,
    monospace: true,
    notes: ["Decoded Base64 back to bytes, then read those bytes as UTF-8 to rebuild the original text."],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "encodes a plain ASCII string to its exact known Base64 value",
    inputs: { text: "Hello, world!", mode: "encode" },
    check: (result) => result.kind === "text" && result.value === "SGVsbG8sIHdvcmxkIQ==",
  },
  {
    name: "decodes that same Base64 string back to the exact original text",
    inputs: { text: "SGVsbG8sIHdvcmxkIQ==", mode: "decode" },
    check: (result) => result.kind === "text" && result.value === "Hello, world!",
  },
  {
    name: "round trips a non-ASCII string with an accented letter and an emoji through encode then decode",
    inputs: { text: "café \u{1F600}", mode: "encode" },
    check: (result) => {
      if (result.kind !== "text") return false;
      const decoded = compute({ text: result.value, mode: "decode" });
      return decoded.kind === "text" && decoded.value === "café \u{1F600}";
    },
  },
  {
    name: "encodes an empty-looking string with only whitespace as an error, not an empty result",
    inputs: { text: "   ", mode: "encode" },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects invalid Base64 input in decode mode with a clear error instead of garbage output",
    inputs: { text: "not!valid@base64", mode: "decode" },
    check: (result) => result.kind === "error" && result.message.toLowerCase().includes("not valid base64"),
  },
  {
    name: "rejects Base64 with the wrong padding length in decode mode",
    inputs: { text: "SGVsbG8", mode: "decode" },
    check: (result) => result.kind === "error",
  },
];
