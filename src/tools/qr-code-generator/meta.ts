import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "qr-code-generator",
  name: "QR Code Generator",
  title: "QR Code Generator",
  category: "marketing-promo-tools",
  summary:
    "Turns a URL, a phone number or any plain text into a scannable QR code, rendered and downloaded entirely in the browser as a PNG.",

  seo: {
    primaryKeyword: "qr code generator",
    keywords: [
      "qr code generator",
      "how to make a qr code",
      "free qr code generator",
      "qr code generator for business cards",
      "online qr code maker",
    ],
    seoTitle: "QR Code Generator: Free Scannable Codes for Any URL",
    seoDescription:
      "A free QR code generator that turns any URL or plain text into a scannable, downloadable PNG code entirely in your browser, with no upload and nothing tracked.",
  },

  fields: [
    {
      kind: "textarea",
      token: "content",
      label: "Content to encode",
      help: "A URL, plain text, or anything else - whatever this decodes to when scanned.",
      placeholder: "https://example.com/summer-sale",
      example: "https://example.com/summer-sale",
      rows: 3,
    },
    {
      kind: "number",
      token: "size",
      label: "Size (pixels)",
      help: "Between 64 and 1024. A larger size holds up better once printed.",
      example: 256,
      min: 64,
      max: 1024,
      step: 1,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["The qrcode npm package (v1.5.4) canvas renderer", "ISO/IEC 18004 QR Code symbology"],
    testingNote:
      "Verified against a set of known inputs and outputs before publishing: a plain URL, a block of unrelated plain text, a blank submission, and sizes both below and above the 64 to 1024 pixel range the tool accepts, confirming the size field is validated and passed through to the renderer unchanged whenever the content is valid.",
  },

  article: {
    intro: [
      "A QR code generator does one small thing: it takes whatever text is typed in, a URL, a Wi-Fi password, a plain sentence, and arranges it into a grid of modules a phone camera can decode in under a second. This one runs the encoding in the browser, so nothing typed in is uploaded or sent anywhere.",
      "The size field sets how many pixels wide and tall the rendered code is, from a compact 64 pixel square up to a poster ready 1024 pixels. The same content makes the same pattern at any size, and the download button saves exactly what is on screen as a PNG.",
    ],

    sections: [
      {
        heading: "How this QR code generator turns a link into a scannable code",
        body: [
          "Type or paste anything into the content field and the tool encodes it immediately, updating the code on screen as the text changes rather than waiting for a submit button. There is no server involved: the qrcode library runs in the browser tab, drawing the result to a canvas element on every keystroke.",
          "A free QR code generator that hides how the code is actually produced is hard to trust on a flyer a few thousand people might see. This one has no hidden step: the content field is the only input that changes what gets encoded, and the size field is the only input that changes how large the result is drawn.",
        ],
      },
      {
        heading: "What you can encode in a QR code, beyond a plain website link",
        body: [
          "A website URL is the most common thing to encode, but the content field accepts anything: a phone number, a mailto: address, or a Wi-Fi network's name and password in the format a phone's camera recognises. The tool does not check that what was typed looks like a URL, since a QR code is a container for text, not specifically for links.",
          "Working out how to make a QR code that a phone treats as a Wi-Fi login rather than plain text means matching a specific string format, with the network name and password separated by colons in a fixed order; getting one character wrong turns it back into plain text nobody's camera app will offer to act on.",
        ],
      },
      {
        heading: "Choosing a size that actually scans once it's printed",
        body: [
          "A code that scans instantly on a laptop screen can fail once shrunk to fit a business card, because a phone camera needs each individual module, the small black or white squares the pattern is built from, to resolve clearly from typical reading distance. A higher pixel count gives a printer more room to keep every module distinct.",
          "A qr code generator for business cards has to balance a small footprint against enough pixel density for a phone held close to still lock on quickly, which usually means leaning toward the upper part of the size range.",
        ],
        list: [
          "Business card or product label: 128 to 256 pixels",
          "Flyer, poster or table tent: 512 to 1024 pixels",
          "On screen only, never printed: 64 to 128 pixels is already sharp",
        ],
      },
      {
        heading: "Error correction and why a slightly damaged code still scans",
        body: [
          "Every QR code carries redundant data using Reed-Solomon error correction, which lets a phone camera still decode the pattern correctly even when part of it is scuffed or covered by a logo. The qrcode library this tool is built on uses the standard's medium level by default, reconstructing roughly 15 percent of the data if that portion becomes unreadable.",
          "That tolerance is not unlimited. A code folded through its centre or printed too small for its content will fail to scan, which is why size matters as much as content.",
        ],
      },
      {
        heading: "Pair the code with a tracked link, not a raw one",
        body: [
          "A QR code that points at a bare destination URL loses any signal about which sign or flyer drove the scan, the same problem a raw link has in an email or an ad. Building the tracking parameters onto the destination first, then pasting that link into the content field, keeps the signal without changing how the code is generated.",
          "The UTM link builder handles that: source, medium and campaign parameters appended correctly to whatever URL is already there, including one that already carries its own query string. Once that link is finished, copying it straight into the content field is the entire second step, since the code has no tracking of its own to configure.",
        ],
      },
      {
        heading: "When a QR code is the wrong tool for the job",
        body: [
          "A code this dense is overkill for a link someone will type by hand anyway, or a slide deck presented in a room where everyone already has the URL on screen, or a piece printed small enough that a scan target under two centimetres becomes unreliable. A short, easy to read URL remains the better choice in those cases.",
          "Searching for an online QR code maker mostly turns up tools that look identical, a text box and a download button, differing in what happens after the tab closes. This one keeps everything local: nothing typed in is transmitted or stored once the page is closed.",
        ],
      },
    ],

    howTo: {
      name: "Steps to generate a QR code",
      steps: [
        {
          name: "Paste the URL or type the text",
          text: "Anything works: a link, a phone number, a short message. The code updates as you type, so you can watch it change before settling on a size.",
        },
        {
          name: "Set the size in pixels",
          text: "Pick a small size for on screen use, or a larger one, up to 1024 pixels, for print.",
        },
        {
          name: "Check it scans before printing a batch",
          text: "Open a phone's camera and point it at the screen. A code that scans reliably at reading distance is a reasonable proxy for how it will behave once printed.",
        },
        {
          name: "Download the PNG",
          text: "The download button saves exactly what is rendered on screen, ready for a flyer, a label template, or a slide.",
        },
      ],
    },

    faq: [
      {
        question: "Does this QR code generator store or send what I type?",
        answer:
          "No. The content field is encoded directly in the browser using a canvas element, and nothing typed in is uploaded, logged, or transmitted anywhere. Closing the tab discards it completely, the same as any other tool on this site that runs its computation locally rather than on a server.",
      },
      {
        question: "Is there a limit to how much text a QR code can hold?",
        answer:
          "Technically yes, the largest version can hold a few thousand characters, but the practical limit is scannability rather than raw capacity. Very long content forces a denser grid of smaller modules, and a phone camera at normal distance struggles to resolve those modules cleanly once the code is printed small.",
      },
      {
        question: "Does a code made for a business card need a different size than one for a poster?",
        answer:
          "Yes, though the difference is about print resolution, not the tool itself. A business card is printed small, so the PNG should still use a fairly high pixel count so a printer keeps every module distinct once scaled down. A poster can use the same or a higher count for the same reason in reverse.",
      },
      {
        question: "Does the tool check that what I type is a real website address?",
        answer:
          "No, and that is intentional. A QR code is a general purpose way to encode text, not something specific to web links, so this tool accepts a phone number or a Wi-Fi login string the same way it accepts a URL. Validating the content as a link would block legitimate uses that have nothing to do with a website.",
      },
      {
        question: "What happens if the size field is left outside the 64 to 1024 range?",
        answer:
          "The tool returns an error explaining that size must be a whole number of pixels between 64 and 1024, rather than silently rounding it or generating a code at some default size nobody chose. A visible error is easier to correct than a code that quietly renders at the wrong dimensions.",
      },
      {
        question: "Can I recolour the QR code before downloading it?",
        answer:
          "Not with this tool. The exported PNG is always a standard black and white code, which is also the safest choice for scan reliability, since low contrast is the single most common reason a customised QR code fails to scan even though it looks fine on screen. Recolouring the file afterward should be checked against a contrast checker before printing a large batch.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/utm-link-builder",
        label: "UTM link builder",
        description: "Build the tracked destination link first, then paste the finished URL into this tool's content field to QR-encode it.",
      },
      {
        href: "/tools/promo-code-generator",
        label: "promo code generator",
        description: "Generates the code itself, which can be QR-encoded onto packaging or a receipt insert alongside the redemption link.",
      },
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Checks the contrast of a recoloured code before it goes to print, since low contrast is the most common reason a customised QR code stops scanning.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description: "For the short line of copy that usually sits next to a printed QR code, telling someone what scanning it actually gets them.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.iso.org/standard/62021.html",
        label: "ISO/IEC 18004: QR Code bar code symbology specification",
        description: "The formal standard that defines the QR code symbol, including its module structure and error correction scheme.",
      },
      {
        href: "https://www.qrcode.com/en/about/error_correction.html",
        label: "QRcode.com: Error correction levels",
        description: "Denso Wave's own explanation of the L, M, Q and H error correction levels, including the medium level this tool's library uses by default.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
        label: "MDN: Canvas API",
        description: "The browser drawing API the qrcode library renders the finished code onto.",
      },
    ],
  },

  tags: ["marketing", "qr code", "generator", "print"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
