import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "base64-encoder-decoder",
  name: "Base64 Encoder Decoder",
  title: "Base64 Encoder Decoder",
  category: "data-developer-tools",
  summary:
    "Encodes text to Base64 and decodes Base64 back to text using the browser's own btoa, atob, TextEncoder and TextDecoder, so UTF-8 characters like accented letters and emoji round trip correctly.",

  seo: {
    primaryKeyword: "base64 encoder decoder",
    keywords: [
      "base64 encoder decoder",
      "free base64 encoder decoder",
      "base64 decode online tool",
      "how to decode base64",
      "base64 to text converter",
      "base64 encode online",
    ],
    seoTitle: "Base64 Encoder Decoder: Encode and Decode Text Online",
    seoDescription:
      "A free base64 encoder decoder that runs in your browser, using btoa, atob, TextEncoder and TextDecoder to encode and decode UTF-8 text correctly, emoji included.",
  },

  fields: [
    {
      kind: "textarea",
      token: "text",
      label: "Text to encode or decode",
      help: "Paste plain text to encode, or a Base64 string to decode. It never leaves your browser.",
      placeholder: "Hello, world!",
      example: "Hello, world!",
      rows: 6,
    },
    {
      kind: "select",
      token: "mode",
      label: "Mode",
      help: "Encode turns text into Base64. Decode turns Base64 back into text.",
      options: [
        { value: "encode", label: "Encode" },
        { value: "decode", label: "Decode" },
      ],
      example: "encode",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["RFC 4648 Base64 encoding via the browser's own btoa/atob"],
    testingNote:
      "Verified against a known correct Base64 encoding of a plain sentence, the same string decoded back to its exact original text, a full round trip through a string containing an accented letter and an emoji to confirm UTF-8 bytes survive intact, and deliberately invalid Base64 input confirmed to return a clear error rather than a garbled result.",
  },

  article: {
    intro: [
      "A base64 encoder decoder turns ordinary text into the Base64 alphabet of 64 printable characters, and turns that Base64 text back into the original bytes, entirely inside your browser tab. Encode a string of any length and the result is safe to drop into a URL, a JSON field, an email header or a data attribute, since Base64 restricts itself to letters, digits, plus, slash and the equals sign used for padding.",
      "Most Base64 tools stumble on the same edge: text containing anything outside plain ASCII. An accented letter or an emoji is more than one byte in UTF-8, and handing those bytes straight to the browser's own btoa function throws an error rather than producing garbled output. This tool encodes the actual UTF-8 bytes of whatever you type first, then converts those bytes to Base64, and reverses the same two steps on the way back, so an emoji or an accented letter survives the round trip exactly.",
    ],

    sections: [
      {
        heading: "How this base64 encoder decoder converts text to Base64",
        body: [
          "Switching the mode to Encode reads whatever is in the text field, runs it through TextEncoder to get its raw UTF-8 bytes, and passes those bytes to btoa, the Base64 encoding function every browser exposes natively. btoa alone can only read a plain byte string, one character per byte, so the UTF-8 bytes are mapped into that shape first rather than handed to it as ordinary text.",
          "The output uses the standard Base64 alphabet: uppercase letters, lowercase letters, the ten digits, plus and slash, with one or two equals signs appended at the end when the input length is not a multiple of three bytes. That padding is not decoration, it tells a decoder how many of the final group's bits are real data.",
        ],
      },
      {
        heading: "Why UTF-8 matters for encoding anything beyond plain ASCII",
        body: [
          "Base64 itself has no concept of Unicode. It is purely a way to represent an arbitrary sequence of bytes as text, and what those bytes mean is decided before encoding starts. Plain English letters happen to be one byte each in UTF-8, which is why a naive Base64 tool built only for ASCII can look correct for years until someone pastes in a name with an accent or a message with an emoji.",
          "This tool encodes with TextEncoder first, so that case is handled the same way as the simple one. An accented letter becomes the two bytes UTF-8 defines for it, an emoji becomes four bytes, and Base64 encodes whatever bytes it is given.",
        ],
      },
      {
        heading: "Decoding Base64 back into readable text",
        body: [
          "Switching to Decode reverses the process. The tool strips any line breaks or stray spaces from the pasted Base64 first, since long Base64 strings are sometimes wrapped onto multiple lines by an email client or a config file, then runs the result through atob to recover the original bytes.",
          "Those bytes are read with TextDecoder set to UTF-8, which turns them back into the exact text that was encoded, accented letters and emoji included. If the bytes recovered from atob do not form valid UTF-8, the tool reports that clearly rather than showing a string full of replacement characters.",
          "Knowing how to decode base64 by hand past the first few characters is impractical, since each group of four Base64 characters maps to three raw bytes through a lookup table most people do not have memorised.",
        ],
      },
      {
        heading: "What makes Base64 input invalid",
        body: [
          "Valid Base64 uses only the 64 characters in its alphabet, plus up to two equals signs as padding at the very end, in a total length that is always a multiple of four characters. A pasted value missing a character, containing a stray space in the middle of a token, or using the URL safe substitutes dash and underscore instead of plus and slash will not decode correctly here.",
          "This base64 decode online tool checks the shape of the input before attempting to decode it, and returns a specific error naming what is wrong rather than producing a truncated or silently wrong result the way a lower level decode function sometimes does with malformed input.",
        ],
      },
      {
        heading: "Common uses for encoding and decoding Base64",
        body: [
          "Base64 shows up constantly in web development: a Basic Authentication header encodes a username and password pair this way, a data URI embeds a small image inside CSS or HTML as Base64 text, and a JSON Web Token's header and payload are both Base64 encoded segments joined by dots.",
          "It also turns up in an email attachment encoded for MIME transport, or a binary file pasted into a text only field. None of these uses treat Base64 as encryption. It is reversible by design, only a way to fit bytes into a text safe alphabet.",
        ],
      },
      {
        heading: "A browser base64 encoder decoder versus a hand written script",
        body: [
          "Writing a one-off script to encode a single string is slower than pasting it here, and it is easy to get the UTF-8 step wrong in a hand rolled version. The result here updates the instant you stop typing.",
          "As a base64 to text converter, it also does the harder half of the job cleanly, turning decoded bytes back into readable text rather than stopping at the raw byte string a lower level library often returns.",
        ],
      },
    ],

    howTo: {
      name: "How to encode or decode text with this base64 encoder decoder",
      steps: [
        {
          name: "Choose Encode or Decode",
          text: "Set the mode field to Encode to turn text into Base64, or Decode to turn Base64 back into text.",
        },
        {
          name: "Paste or type the text",
          text: "Drop your text or existing Base64 value into the text field. The example pre-fills so you can see the tool working immediately.",
        },
        {
          name: "Read the result",
          text: "The result panel shows the encoded or decoded value in a monospace, copy ready form the moment you stop typing.",
        },
        {
          name: "Check an error message if one appears",
          text: "Decoding invalid Base64 returns a specific reason rather than a garbled string, naming what about the input does not match the Base64 alphabet or length rule.",
        },
        {
          name: "Copy the result",
          text: "Copy the finished value from the result panel into wherever it is needed, such as an HTTP header, a config file or a data URI.",
        },
      ],
    },

    faq: [
      {
        question: "Is this a free base64 encoder decoder, and does it store what I paste?",
        answer:
          "Yes. This is a free base64 encoder decoder that runs entirely in your browser tab, using the same btoa, atob, TextEncoder and TextDecoder functions the browser already provides. Nothing you type in either field is uploaded, logged or stored anywhere.",
      },
      {
        question: "Can I base64 encode online here without installing anything?",
        answer:
          "Yes, encoding runs the moment you switch the mode to Encode and stop typing, with no software to install and no file to save first. The Base64 output appears immediately in the result panel, ready to copy into a header, a config file or a data URI.",
      },
      {
        question: "Why did decoding fail even though the Base64 was copied correctly?",
        answer:
          "The most common cause is copying only part of a wrapped value, leaving the total length short of a multiple of four characters, or copying from a source that swapped the standard plus and slash characters for the URL safe dash and underscore variant. Both are reported here as invalid Base64.",
      },
      {
        question: "Is Base64 the same thing as encryption?",
        answer:
          "No, and this is a common and risky misunderstanding. Base64 is fully reversible by anyone with no key or password required, since decoding is just the inverse of encoding, so it should never be treated as a way to protect sensitive data. It only represents bytes as text.",
      },
      {
        question: "Why does encoding a short message with emoji produce a longer result than expected?",
        answer:
          "An emoji outside the earliest Unicode ranges typically takes four bytes in UTF-8, not one, and Base64 expands its input by roughly a third on top of that, since three raw bytes become four Base64 characters. A short message with several emoji can produce a surprisingly long encoded string.",
      },
      {
        question: "Does decoding always produce readable text?",
        answer:
          "Only when the original bytes were text in the first place. Base64 is often used to represent an image or another binary file, and decoding that kind of value and reading it as UTF-8 text correctly reports an error here rather than showing meaningless characters.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/json-formatter-validator",
        label: "JSON formatter validator",
        description: "For the JSON payload a decoded Base64 value, such as a JWT segment, often turns out to be.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "API documentation prompt",
        description: "For documenting an endpoint that expects a Base64 encoded value in a header or request body.",
      },
      {
        href: "/coding-prompts/code-explanation-prompt",
        label: "code explanation prompt",
        description: "For understanding what a script does with an encoded value once its Base64 is decoded here.",
      },
      {
        href: "/data-analysis-prompts/data-cleaning-prompt",
        label: "data cleaning prompt",
        description: "For the values inside an export once a Base64 encoded column has been decoded to plain text.",
      },
    ],

    externalLinks: [
      {
        href: "https://datatracker.ietf.org/doc/html/rfc4648",
        label: "RFC 4648: The Base64 Data Encodings",
        description: "The IETF specification defining the Base64 alphabet and padding rule this tool implements.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Glossary/Base64",
        label: "MDN: Base64 glossary entry",
        description: "Browser documentation explaining Base64 encoding and its common uses on the web.",
      },
      {
        href: "https://html.spec.whatwg.org/multipage/webappapis.html#dom-btoa",
        label: "WHATWG HTML Standard: the btoa and atob methods",
        description: "The standard defining the exact btoa and atob functions this tool's encoding and decoding are built on.",
      },
      {
        href: "https://encoding.spec.whatwg.org/",
        label: "WHATWG Encoding Standard",
        description: "The standard defining the UTF-8 algorithms behind TextEncoder and TextDecoder, used here for non-ASCII text.",
      },
    ],
  },

  tags: ["base64", "developer", "encoder", "decoder"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
