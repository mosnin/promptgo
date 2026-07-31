import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "checksum-generator",
  name: "Checksum Generator",
  title: "Checksum Generator",
  category: "data-developer-tools",
  summary:
    "Computes a CRC32 checksum of pasted text in the browser, using the same table based algorithm and 0xEDB88320 polynomial that PNG, ZIP and zlib use to catch accidental corruption, not a cryptographic hash for security.",

  seo: {
    primaryKeyword: "checksum generator",
    keywords: [
      "checksum generator",
      "free checksum generator",
      "crc32 checksum calculator",
      "checksum vs cryptographic hash",
      "how to check file integrity",
      "online crc32 generator",
    ],
    seoTitle: "Checksum Generator: Free Online CRC32 Checksum Tool",
    seoDescription:
      "A free checksum generator that computes a CRC32 checksum of pasted text in your browser, the same algorithm PNG and ZIP use to catch corruption, not a security hash.",
  },

  fields: [
    {
      kind: "textarea",
      token: "text",
      label: "Text to checksum",
      help: "Paste the text to compute a CRC32 checksum for. It never leaves your browser.",
      placeholder: "The quick brown fox jumps over the lazy dog",
      example: "The quick brown fox jumps over the lazy dog",
      rows: 6,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: [
      "The CRC-32 algorithm specified in the PNG image format's Annex D (polynomial 0xEDB88320, init 0xFFFFFFFF, final XOR 0xFFFFFFFF), the same variant zlib and ZIP use",
    ],
    testingNote:
      "Every self test value below was verified two separate ways before publishing: against Node.js's built-in zlib.crc32 function and against Python's built-in zlib.crc32 function, two independent standard library implementations of the same CRC-32 specification, and both returned identical results for every case, including the published standard CRC-32 check value for the reference string 123456789. A third, standalone table based implementation written outside this tool's own compute function was also cross-checked against the same cases and agreed exactly.",
  },

  article: {
    intro: [
      "A checksum generator turns text into a short, fixed-length code that summarises every byte of it: the exact same text always produces the exact same code, and changing even one character produces a completely different one. This checksum generator computes CRC32, the checksum built into ZIP archives, PNG images and Ethernet frames to catch corruption, a byte flipped by a failing disk sector, a download cut short, a copy interrupted halfway through. Paste text in and the checksum appears as an eight character hex value the moment typing stops, computed entirely in the browser.",
      "CRC32 is not a cryptographic hash, and this tool is deliberately built as one rather than the other. A cryptographic hash such as SHA-256 is designed so nobody can deliberately construct two different inputs that produce the same output. CRC32 was designed for speed and for catching accidental corruption, and constructing a deliberate collision against it takes only a modest amount of code. Use this crc32 checksum calculator to confirm a file was not damaged in transit, never to confirm it was not deliberately tampered with, and never for a password.",
    ],

    sections: [
      {
        heading: "How this checksum generator computes a CRC32 checksum",
        body: [
          "The moment the text field changes, the tool encodes it to UTF-8 bytes with TextEncoder, the same conversion a file gets when saved to disk, so an accented letter or an emoji checksums the way it would on disk rather than one JavaScript character code at a time. Those bytes run through the standard CRC32 algorithm: a 32-bit register, initialised to all ones, updated one byte at a time via a precomputed 256-entry lookup table built from the reference polynomial 0xEDB88320, with the final register inverted before being shown as an eight character uppercase hex value.",
        ],
      },
      {
        heading: "Checksum vs cryptographic hash, and why this is not one",
        body: [
          "This is the single most important thing to understand before using a checksum vs cryptographic hash tool for anything that matters. Both take input of any length and produce a short, fixed-length output that changes completely when the input changes, and that surface similarity is where the resemblance ends. A cryptographic hash such as SHA-256 is built so that finding two different inputs producing the same output is computationally infeasible. CRC32 offers no such guarantee: its 32-bit output space is small and linear enough that an attacker can construct a matching checksum with well documented, publicly available techniques. That is why CRC32 checksums catch corruption, never deliberate tampering.",
        ],
      },
      {
        heading: "What a checksum generator like this one is actually for",
        body: [
          "CRC32 exists to answer one narrow question well: did this exact sequence of bytes arrive intact? A ZIP archive stores a CRC32 for every file it contains so unzipping software can confirm each file extracted without silent bit rot. A PNG image stores one at the end of every chunk, catching a single flipped bit from a bad transfer before it becomes a corrupted image. Ethernet frames carry a CRC32 too, checked in hardware on every frame that crosses a wire. None of those uses assume a hostile party is trying to fool the check; they assume ordinary corruption. That is exactly what a free checksum generator like this one is built for: comparing a checksum computed before sending text against one computed after.",
        ],
      },
      {
        heading: "How to check file integrity with a CRC32 checksum",
        body: [
          "Knowing how to check file integrity with CRC32 comes down to one comparison: compute the checksum before a transfer or copy, compute it again afterward, and confirm the two values match exactly. A single differing hex digit means at least one byte changed somewhere in between, even if the rest of the content looks fine at a glance. This tool works on pasted text rather than an uploaded file, since nothing here is sent anywhere, but the same comparison applies: paste the same text in before and after moving it between systems, through a script, or through a copy-paste chain that might mangle whitespace or encoding.",
        ],
      },
      {
        heading: "What makes input invalid for this checksum generator",
        body: [
          "Blank or whitespace-only input is rejected with a clear error rather than silently producing the checksum of an empty byte string, since an accidentally empty paste is far more likely to be a mistake worth noticing than a genuine request. Beyond that, this tool accepts anything that can be typed or pasted as text, with no length limit enforced client side and no distinction made between plain ASCII and text containing symbols, accented letters or emoji, since all of it is encoded to UTF-8 bytes the same way before the checksum runs.",
        ],
      },
      {
        heading: "An online CRC32 generator versus a command line checksum tool",
        body: [
          "Command line utilities such as cksum or PowerShell's Get-FileHash compute the same kind of checksum against an actual file on disk, which matters for something this browser based tool cannot do: verifying a large binary file without pasting its contents into a text field first. For a short piece of text or confirming that two people are looking at byte-for-byte the same string, this online crc32 generator is faster than opening a terminal, updating the instant typing stops.",
        ],
      },
    ],

    howTo: {
      name: "How to use this checksum generator",
      steps: [
        {
          name: "Paste or type the text",
          text: "Enter the text to checksum into the text field. The example sentence pre-fills so the tool shows a real checksum immediately.",
        },
        {
          name: "Read the CRC32 checksum",
          text: "The eight character uppercase hex checksum appears in the result panel the moment typing stops, ready to copy.",
        },
        {
          name: "Compare it against another copy",
          text: "Paste the same text as it exists elsewhere, before and after a transfer or a copy, and confirm both checksums match exactly.",
        },
        {
          name: "Treat a mismatch as corruption, not tampering",
          text: "A different checksum means at least one byte changed somewhere along the way. Investigate it as accidental corruption, not evidence of a deliberate attack, since CRC32 was never built to detect the second kind.",
        },
      ],
    },

    faq: [
      {
        question: "Is this a free checksum generator, and does it store what I paste?",
        answer:
          "Yes. This is a free checksum generator that runs entirely in your browser tab, using TextEncoder and a standard CRC32 lookup table. Nothing typed into the text field is uploaded, logged or stored anywhere, and it works the same with no network connection at all.",
      },
      {
        question: "Is a CRC32 checksum secure enough to verify a download was not tampered with?",
        answer:
          "No. CRC32 was designed to catch accidental corruption, not a deliberate attacker, and its small output combined with its linear structure means someone motivated can construct a file matching a target checksum. Verifying a download has not been tampered with needs a cryptographic hash such as SHA-256, not CRC32.",
      },
      {
        question: "What is the difference between a checksum and a cryptographic hash?",
        answer:
          "Both take input of any length and produce a short, fixed-length output that changes completely when the input changes. A checksum like CRC32 is built for speed and for catching accidental corruption. A cryptographic hash like SHA-256 is built so finding two inputs with the same output is computationally infeasible, the property security actually requires.",
      },
      {
        question: "Why does this tool use CRC32 instead of a cryptographic hash like SHA-256?",
        answer:
          "Every tool on this site computes its result synchronously the moment typing stops. SubtleCrypto.digest(), the browser method for SHA-256 and other cryptographic hashes, is asynchronous and returns a Promise, which does not fit that pattern. CRC32 runs as plain synchronous JavaScript with a lookup table, exactly how PNG, ZIP and zlib implement it.",
      },
      {
        question: "How to check file integrity when comparing two copies of the same text?",
        answer:
          "Compute the CRC32 checksum of the text in one place, compute it again for the copy elsewhere, and compare the two eight character values. An exact match means the bytes are identical. Any difference, even in one hex digit, means at least one byte differs between the copies.",
      },
      {
        question: "Can I use this as an online CRC32 generator for a small file's contents?",
        answer:
          "Yes, if the contents can be pasted as text, such as a config file or a short data export. This tool works on whatever is in the text field rather than an uploaded file, so a large binary file is better handled by a command line CRC32 utility reading the file directly from disk.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/base64-encoder-decoder",
        label: "base64 encoder decoder",
        description: "For encoding a checksum or the text behind it into a format safe to drop into a URL or header.",
      },
      {
        href: "/tools/uuid-generator",
        label: "UUID generator",
        description: "For a unique identifier to pair with a checksum when tracking a file or record through a pipeline.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "JSON formatter validator",
        description: "For validating the structure of a config or export before checksumming its contents here.",
      },
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description: "For understanding what a script does with a checksum once CRC32 verification is part of its logic.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/TR/png-3/#5CRC-algorithm",
        label: "W3C: PNG specification, CRC algorithm",
        description: "The PNG format's own definition of the CRC-32 polynomial and reference implementation this tool's table is built from.",
      },
      {
        href: "https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.9.TXT",
        label: "PKWARE .ZIP File Format Specification (APPNOTE.TXT)",
        description: "The specification requiring a CRC-32 for every file stored in a ZIP archive, the same checksum this tool computes.",
      },
      {
        href: "https://csrc.nist.gov/glossary/term/hash_function",
        label: "NIST Computer Security Resource Center: hash function",
        description: "The federal definition of a cryptographic hash function, for contrast with the checksum this tool actually computes.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder",
        label: "MDN: TextEncoder",
        description: "The browser API this tool uses to convert input text to UTF-8 bytes before computing the checksum.",
      },
    ],
  },

  tags: ["checksum", "crc32", "developer", "integrity"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
