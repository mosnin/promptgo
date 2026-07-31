import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "colour-palette-generator",
  name: "Colour Palette Generator",
  title: "Colour Palette Generator",
  category: "design-visual-tools",
  summary:
    "Generates a complementary, analogous or triadic colour harmony from a single hex colour using the real RGB to HSL conversion formula, rotating hue only.",

  seo: {
    primaryKeyword: "colour palette generator",
    keywords: [
      "colour palette generator",
      "free colour palette generator tool",
      "how to generate a colour palette from one colour",
      "complementary colour palette generator",
      "analogous colour scheme generator",
      "triadic colour palette generator",
    ],
    seoTitle: "Colour Palette Generator: Free HSL Harmony Tool",
    seoDescription:
      "A free colour palette generator that computes real HSL colour harmonies from one hex colour: complementary, analogous and triadic, by rotating hue alone.",
  },

  fields: [
    {
      kind: "text",
      token: "baseColour",
      label: "Base hex colour",
      help: "3 or 6 hex digits, with or without a leading #.",
      placeholder: "#3b82f6",
      example: "#3b82f6",
    },
    {
      kind: "select",
      token: "harmony",
      label: "Harmony",
      help: "Which standard colour relationship to build from the base colour's hue.",
      options: [
        { value: "complementary", label: "Complementary" },
        { value: "analogous", label: "Analogous" },
        { value: "triadic", label: "Triadic" },
      ],
      example: "complementary",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard RGB-HSL colour space conversion"],
    testingNote:
      "Verified against hand computed reference values before publishing: pure red's complementary swatch lands on exact cyan, its triadic swatches land on exact pure green and exact pure blue, its analogous swatches were hand computed against the published hue rotation formula, a fully desaturated grey base stays the same grey after rotation since it has no hue to rotate, and an invalid hex string returns an error rather than a guessed palette.",
  },

  article: {
    intro: [
      "A colour palette generator answers one specific question: given a single colour someone already likes, what are the other colours that sit in a defined, named relationship to it. This tool converts the hex colour to HSL, rotates only the hue channel by a fixed number of degrees, and converts each result back to hex, rather than picking nearby shades that merely look plausible together.",
      "Most palette tools blur this into a mood board: shades that read as harmonious to whoever built the tool, not a reproducible relationship anyone else can check. Hue rotation has an exact numeric answer, which is why the same inputs always produce the same palette here, not a fresh guess each time.",
    ],

    sections: [
      {
        heading: "How the RGB to HSL conversion behind this tool works",
        body: [
          "The base hex colour is first split into its red, green and blue channels, each normalised to a 0 to 1 fraction. Lightness is the midpoint between whichever channel is largest and whichever is smallest. Saturation and hue come from the same piecewise formula: the largest channel decides which branch runs, and the gap between largest and smallest sets how saturated the colour reads.",
          "Hue comes out of that formula as an angle on a 360 degree wheel, with 0 at red, 120 at green and 240 at blue. That angle is the only value this tool changes. Saturation and lightness are read from the base colour and reused unmodified in every generated swatch.",
        ],
      },
      {
        heading: "Why a free colour palette generator tool should rotate hue and stop there",
        body: [
          "A palette built by rotating hue while holding saturation and lightness fixed inherits the base colour's own character. A soft, muted brand blue produces a soft, muted set of companions; a fully saturated, mid lightness blue produces companions with the same intensity. Nudging saturation or lightness at the same time, which many palette tools do for a more polished look, removes the one property tying the generated colours back to the one someone chose.",
          "It also keeps the relationship provable. A visitor can take the hue, saturation and lightness this tool reports for the base colour, apply the stated rotation by hand, and land on the same swatch, because nothing else in the calculation is hidden or adjusted along the way.",
        ],
      },
      {
        heading: "Complementary, analogous and triadic: what each harmony actually rotates",
        body: [
          "A complementary colour palette generator adds exactly one colour, at the base hue plus 180 degrees, the point directly opposite it on the colour wheel. It is the highest contrast pairing available from a single hue, which is why it shows up in call to action buttons set against a body colour.",
          "An analogous colour scheme generator instead adds two colours close to the base, at minus 30 and plus 30 degrees, sitting on one side of the wheel. A triadic colour palette generator spaces three hues evenly, at the base plus 120 and plus 240 degrees, the same spacing a wheel divided into thirds would produce.",
        ],
        list: [
          "Complementary: base, plus one colour at hue plus 180 degrees",
          "Analogous: base, plus colours at hue minus 30 and hue plus 30 degrees",
          "Triadic: base, plus colours at hue plus 120 and hue plus 240 degrees",
        ],
      },
      {
        heading: "How to generate a colour palette from one colour without guessing hex codes",
        body: [
          "Picking companion colours by eye usually means opening an image editor and nudging a hue slider until something looks right. That value is real, but the relationship behind it is not: nothing ties it back to the base colour by a stated number of degrees, so a second designer cannot reproduce it.",
          "Running the base colour through the exact rotation instead means the relationship between every swatch and the base is always the same fixed angle, stated in the result, checkable by anyone with the same base colour and the same harmony choice.",
        ],
      },
      {
        heading: "Where hue wraps, and why a desaturated base colour behaves differently",
        body: [
          "Hue is circular, so a rotation that pushes past 360 degrees, or below 0, wraps back into the normal range rather than producing an invalid angle. A base hue of 10 degrees rotated by minus 30 lands at 340, not at negative 20.",
          "A base colour with no saturation at all, a pure grey, has no meaningful hue to rotate in the first place: its hue is reported as 0 by convention, but rotating it does nothing perceptible, since zero saturation looks identical at every hue. Every harmony option on a grey base returns the same grey it started with.",
        ],
      },
      {
        heading: "Using this as a colour palette generator for real work, not an AI prompt",
        body: [
          "Hue rotation on a fixed base colour has exactly one correct answer, which makes it arithmetic rather than something worth asking a language model to estimate. A model asked to name the complementary colour for a given hex value produces a plausible sounding hex code, not a computed one, and that guess is frequently off by enough to be visibly wrong once placed next to the original.",
          "This tool exists to replace that guess with the same RGB to HSL to RGB round trip every time, run again on whatever base colour and harmony are currently selected, with no request sent anywhere.",
        ],
      },
    ],

    howTo: {
      name: "How to use this tool",
      steps: [
        {
          name: "Enter a base hex colour",
          text: "Type the colour's hex value, 3 or 6 digits, with or without a leading #.",
        },
        {
          name: "Choose a harmony",
          text: "Pick complementary for one high contrast pairing, analogous for two close neighbours, or triadic for three evenly spaced hues.",
        },
        {
          name: "Read the generated swatches",
          text: "Each swatch is labelled with the hue rotation it represents, alongside its own hex value.",
        },
        {
          name: "Check the reported hue, saturation and lightness",
          text: "The notes under the palette state the base colour's own HSL values, so the rotation used to reach each swatch can be checked by hand.",
        },
        {
          name: "Copy the hex values into your design tool",
          text: "Every generated hex value is exact and reproducible, so the same inputs will always return the same palette.",
        },
      ],
    },

    faq: [
      {
        question: "What does this tool actually calculate?",
        answer:
          "It converts the base hex colour to HSL using the standard formula, then rotates only the hue value by a fixed number of degrees depending on the harmony, before converting each result back to a hex colour. Saturation and lightness are never changed.",
      },
      {
        question: "Why does the complementary swatch always sit at exactly 180 degrees?",
        answer:
          "180 degrees is the point directly opposite the base colour on a 360 degree hue wheel, which is the definition of a complementary colour, not an arbitrary choice. Pure red, at hue 0, has its complement at hue 180, which is pure cyan, an exact result anyone can check by hand.",
      },
      {
        question: "Does the analogous option ever produce more or fewer than three colours?",
        answer:
          "No. It returns the base colour plus exactly two neighbours, at hue minus 30 and hue plus 30 degrees, for three colours in total every time, regardless of what the base colour or its saturation and lightness happen to be.",
      },
      {
        question: "Why do the triadic swatches for pure red land on pure green and pure blue?",
        answer:
          "Pure red sits at hue 0 with full saturation and 50 percent lightness. Triadic harmony adds 120 and 240 degrees, landing exactly on hue 120 and hue 240 at the same saturation and lightness, which are pure green and pure blue respectively, an exact and easily hand checked result.",
      },
      {
        question: "What happens if I enter a grey or near grey base colour?",
        answer:
          "A colour with zero saturation has no hue to meaningfully rotate, so every harmony option returns the same grey the base colour started as. This is the correct result of rotating a hue that has no visible effect at zero saturation, not a limitation of the tool.",
      },
      {
        question: "Does this tool check contrast between the generated swatches?",
        answer:
          "No. It only computes hue harmonies and does not calculate contrast ratios between the swatches it produces. Pairing any two resulting hex values in the separate colour contrast checker on this site confirms whether that pairing is legible before it is used for text.",
      },
      {
        question: "Can I use 3-digit hex shorthand like #3bf as the base colour?",
        answer:
          "Yes. A 3-digit hex code is expanded to its 6-digit equivalent before the RGB to HSL conversion runs, so #3bf and #33bbff produce identical palettes. Both are accepted with or without a leading # character.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Checks the exact WCAG contrast ratio between any two swatches this generator produces before they are used for text.",
      },
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description: "Turns a generated harmony into named interface roles with a contrast ratio printed for every pairing that actually occurs.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For documenting a palette that already passes contrast as reusable, versioned tokens.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description: "Covers choosing a single icon colour from a generated palette that still reads clearly at small sizes.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/TR/css-color-4/#the-hsl-notation",
        label: "W3C: CSS Color Module Level 4, the hsl() notation",
        description: "The published specification for the HSL colour space and its conversion to and from RGB that this tool's compute logic follows.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl",
        label: "MDN: hsl() colour value",
        description: "A browser vendor's reference for the same hue, saturation and lightness channels, with worked examples of the conversion.",
      },
      {
        href: "https://en.wikipedia.org/wiki/HSL_and_HSV",
        label: "Wikipedia: HSL and HSV",
        description: "Background on why the HSL model separates hue from saturation and lightness, and how it differs from plain RGB.",
      },
      {
        href: "https://www.interaction-design.org/literature/topics/color-theory",
        label: "Interaction Design Foundation: Color Theory",
        description: "Explains the complementary, analogous and triadic relationships this tool's harmony options are named after.",
      },
    ],
  },

  tags: ["colour", "palette", "design", "hsl"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
