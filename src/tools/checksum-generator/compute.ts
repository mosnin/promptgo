import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Computes a CRC32 checksum with the standard table based algorithm, the
 * same one used by PNG, ZIP and zlib, over the UTF-8 bytes of the input text.
 *
 * CRC32 is a checksum, not a cryptographic hash. It is built for speed and
 * for catching accidental corruption, not for resisting a deliberate
 * attacker, which is why the browser's own SubtleCrypto.digest() is not used
 * here: SubtleCrypto only implements cryptographic hashes such as SHA-256,
 * and it is asynchronous, returning a Promise, which does not fit this
 * codebase's synchronous ComputeFn contract. CRC32 is simple enough to
 * implement as plain, synchronous JavaScript with a precomputed lookup
 * table, which is also how every real CRC32 implementation works in
 * practice.
 *
 * The polynomial used is 0xEDB88320, the bit-reflected form of the standard
 * CRC-32 polynomial specified in the PNG image format's Annex D and used
 * unchanged by ZIP and zlib. The register starts at all ones, is XORed with
 * each input byte through the table, and the final register is inverted
 * (XORed with all ones) before being reported as the checksum.
 */

function buildCrc32Table(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
}

const CRC32_TABLE = buildCrc32Table();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function toHex8(value: number): string {
  return value.toString(16).toUpperCase().padStart(8, "0");
}

export const compute: ComputeFn = (inputs) => {
  const text = String(inputs.text ?? "");

  if (!text.trim()) {
    return {
      kind: "error",
      message: "Enter some text to generate a CRC32 checksum for.",
    };
  }

  const bytes = new TextEncoder().encode(text);
  const value = toHex8(crc32(bytes));

  return {
    kind: "text",
    label: "CRC32 checksum",
    value,
    monospace: true,
    notes: [
      "CRC32 is a checksum for catching accidental corruption, such as a byte flipped by a bad disk sector or a download that was cut short, not a security measure.",
      "It is not a cryptographic hash. Never use it to verify a file was not deliberately tampered with, and never for a password, a signature or anything a motivated attacker might try to fake.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "computes the standard CRC-32 check value for the reference string 123456789",
    inputs: { text: "123456789" },
    // CBF43926 is the published check value for this CRC-32 variant (polynomial
    // 0xEDB88320, init 0xFFFFFFFF, final XOR 0xFFFFFFFF), independently
    // confirmed here against Node's built-in zlib.crc32("123456789") and
    // Python's built-in zlib.crc32(b"123456789"), which both return the same
    // value.
    check: (result) => result.kind === "text" && result.value === "CBF43926",
  },
  {
    name: "computes the correct CRC-32 for a short ASCII sentence",
    inputs: { text: "Hello, world!" },
    check: (result) => result.kind === "text" && result.value === "EBE6C6E6",
  },
  {
    name: "computes the correct CRC-32 for the tool's own example sentence",
    inputs: { text: "The quick brown fox jumps over the lazy dog" },
    check: (result) => result.kind === "text" && result.value === "414FA339",
  },
  {
    name: "computes the correct CRC-32 for UTF-8 text with an accented letter and an emoji",
    inputs: { text: "café \u{1F600}" },
    check: (result) => result.kind === "text" && result.value === "A2E86BB2",
  },
  {
    name: "returns the exact same checksum for the exact same input every time",
    inputs: { text: "determinism check" },
    check: (result) => {
      if (result.kind !== "text") return false;
      const again = compute({ text: "determinism check" });
      return again.kind === "text" && again.value === result.value;
    },
  },
  {
    name: "rejects blank, whitespace-only input with an error instead of computing a checksum for nothing",
    inputs: { text: "   " },
    check: (result) => result.kind === "error",
  },
];
