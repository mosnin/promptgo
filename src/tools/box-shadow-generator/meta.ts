import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "box-shadow-generator",
  name: "Box Shadow Generator",
  title: "CSS Box Shadow Generator",
  category: "design-visual-tools",
  summary:
    "A box shadow generator that builds a real CSS box-shadow declaration from offset, blur, spread, colour and opacity, with an inset toggle, rather than a preview that never turns into copyable code.",

  seo: {
    primaryKeyword: "box shadow generator",
    keywords: [
      "box shadow generator",
      "css box shadow generator",
      "free box shadow generator tool",
      "how to create a css box shadow",
      "inset box shadow generator",
      "box shadow generator with opacity",
    ],
    seoTitle: "Box Shadow Generator: Free CSS Box Shadow Tool",
    seoDescription:
      "A free box shadow generator that builds a real css box-shadow declaration from offset, blur, spread, colour and opacity, including an inset shadow option.",
  },

  fields: [
    {
      kind: "number",
      token: "offsetX",
      label: "Horizontal offset (px)",
      help: "Positive moves the shadow right, negative moves it left.",
      example: 0,
      min: -100,
      max: 100,
    },
    {
      kind: "number",
      token: "offsetY",
      label: "Vertical offset (px)",
      help: "Positive moves the shadow down, negative moves it up.",
      example: 4,
      min: -100,
      max: 100,
    },
    {
      kind: "number",
      token: "blurRadius",
      label: "Blur radius (px)",
      help: "How soft the shadow's edge is. Zero is a hard edged shadow.",
      example: 12,
      min: 0,
      max: 200,
    },
    {
      kind: "number",
      token: "spreadRadius",
      label: "Spread radius (px)",
      help: "Grows or shrinks the shadow's shape before blur is applied. Independent of blur.",
      example: 0,
      min: -100,
      max: 100,
    },
    {
      kind: "text",
      token: "colour",
      label: "Shadow colour (hex)",
      help: "3 or 6 hex digits, with or without a leading #.",
      placeholder: "#000000",
      example: "#000000",
    },
    {
      kind: "number",
      token: "opacity",
      label: "Opacity (%)",
      help: "Folded into the colour as an rgba() alpha value.",
      example: 20,
      min: 0,
      max: 100,
    },
    {
      kind: "checkbox",
      token: "inset",
      label: "Inset shadow (inside the element instead of outside)",
      example: false,
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard CSS box-shadow syntax, CSS Backgrounds and Borders Module Level 3"],
    testingNote:
      "Verified against hand computed reference values before publishing: a standard positive offset case produces the exact expected declaration and rgba string, a negative offset is placed in the output unchanged rather than rejected, the inset keyword is prepended only when the inset option is on, opacity at 100 and at 0 percent produce alpha values of exactly 1.00 and 0.00, an invalid hex colour returns an error rather than a guessed rgba value, and a blur radius past the stated maximum returns an error rather than clamping silently.",
  },

  article: {
    intro: [
      "A box shadow generator exists to remove one specific kind of guessing: typing pixel values and a colour into a box-shadow declaration, then nudging each number until it looks right. This tool takes horizontal offset, vertical offset, blur radius, spread radius, a hex colour and an opacity percentage, and returns the exact CSS declaration those six numbers produce, in the order box-shadow itself expects them.",
      "Most shadow tools stop at a live preview and leave the CSS as an afterthought, or round the opacity into a lighter colour that no longer matches what was typed. This one treats the declaration as the product: the rgba() colour comes from a real hex to RGB conversion, opacity becomes a two decimal alpha value, and the finished line pastes into a stylesheet exactly as shown.",
    ],

    sections: [
      {
        heading: "How offset, blur and spread each change a css box shadow generator's output",
        body: [
          "These four numbers are the part most people find confusing, since CSS accepts them positionally with no labels. Horizontal and vertical offset move the whole shadow without changing it: a positive horizontal offset slides it right, a positive vertical offset slides it down, and negative values reverse each direction.",
          "Blur radius and spread radius look similar but do different jobs. Blur softens the edge into a gradient, and a blur of zero produces a hard edged rectangle with no fade. Spread instead grows or shrinks the outline before any blur is applied, uniformly on every side, so a positive spread makes the shape larger and a negative spread makes it smaller, independent of how soft that edge looks.",
        ],
        list: [
          "Offset X and offset Y: where the shadow sits, left or right and up or down",
          "Blur radius: how soft the shadow's edge is, zero is a hard edge",
          "Spread radius: how much larger or smaller the shadow's shape is than the element",
        ],
      },
      {
        heading: "Inset versus outset: the one keyword that flips where the shadow sits",
        body: [
          "Every box-shadow declaration is either an outer, outset shadow by default or an inner, inset shadow when the inset keyword is present. An outset shadow is drawn behind the element, extending outward from its edges, which is what most card and button shadows use to suggest the element sits above the page. An inset shadow is drawn inside the element's own border instead, reading as a pressed or recessed surface rather than a raised one.",
          "The inset keyword is positional: it has to come first in the declaration, before the four length values and the colour, exactly where this tool places it. Toggling inset changes nothing about the offset, blur, spread or colour already entered, only whether the shadow sits outside the element or is carved into it.",
        ],
      },
      {
        heading: "What this box shadow generator with opacity actually computes",
        body: [
          "Opacity is not a separate CSS property here, because box-shadow has no opacity argument of its own. The opacity percentage entered is converted into the fourth channel of an rgba() colour: the hex colour is parsed into red, green and blue channels, the opacity is divided by 100 and rounded to two decimal places, and the four values combine into one rgba() colour carrying transparency inside the shadow declaration itself.",
          "A lighter hex colour and a lower opacity look similar but are structurally different: a lighter colour is still fully opaque and looks flat against a busy background, while a genuinely transparent shadow blends with whatever sits behind the element.",
        ],
      },
      {
        heading: "How to create a css box shadow without guessing pixel values",
        body: [
          "The usual approach to writing a box shadow by hand is trial and error: type a blur radius, look at the render, increase it slightly, look again. That works, but it produces a declaration nobody can reconstruct later, and it is easy to end up with an offset and a spread that fight each other without noticing why.",
          "Entering each value into its own labelled field keeps every number legible on its own terms. The declaration shown is always the literal, current combination of everything entered, with nothing rounded away, so the same six inputs always produce the same line of CSS.",
        ],
      },
      {
        heading: "Using this free box shadow generator tool for real work, not an AI guess",
        body: [
          "Most interface shadows fall into a small number of recognisable shapes: a soft, low opacity shadow under a card, a tighter darker shadow under a raised button on hover, and an inset shadow making a form input read as a recessed well rather than a flat rectangle. Each is the same six inputs at different values, not a different feature, so a card shadow tends to use a larger blur and a low opacity while a pressed button state uses a small blur and the inset option turned on.",
          "A box-shadow declaration built from six specific numbers has exactly one correct rendering, which makes it arithmetic rather than something worth asking a language model to write from a description. A model asked for a subtle card shadow produces a plausible looking declaration, not a computed one, and it cannot know what colour or opacity a specific interface already uses elsewhere on the page. This tool exists to replace that guess with the same arithmetic every time, run again on whatever values are currently entered, with the finished CSS shown in full and ready to copy.",
        ],
      },
    ],

    howTo: {
      name: "How to use this tool",
      steps: [
        {
          name: "Set the horizontal and vertical offset",
          text: "Positive moves the shadow right or down, negative moves it left or up.",
        },
        {
          name: "Set the blur radius",
          text: "A higher number softens the edge into a gradient. Zero gives a hard edge.",
        },
        {
          name: "Set the spread radius",
          text: "Positive grows the shape beyond the element's edges, negative shrinks it, zero matches the element.",
        },
        {
          name: "Enter the shadow colour and opacity",
          text: "Type a hex colour, then set an opacity percentage. Both combine into one rgba() colour.",
        },
        {
          name: "Toggle inset if the shadow should sit inside the element",
          text: "Leave it off for an outer shadow, or on for a recessed inner shadow.",
        },
        {
          name: "Copy the finished box-shadow declaration",
          text: "The CSS shown below the preview is the literal, current combination of every value entered, ready to paste into a stylesheet.",
        },
      ],
    },

    faq: [
      {
        question: "What does a css box shadow generator actually calculate?",
        answer:
          "It takes the offset, blur and spread values exactly as entered, parses the hex colour into red, green and blue channels, folds opacity into those channels as an rgba() alpha value, and assembles the length values plus that colour into one box-shadow declaration, in the order CSS requires.",
      },
      {
        question: "Why does a negative offset not get rejected as invalid?",
        answer:
          "A negative horizontal or vertical offset is valid CSS and moves the shadow left or above the element rather than right or below it, so this tool only checks the number is finite and within range, never that it is positive. Rejecting negative offsets would make several common shadow shapes impossible.",
      },
      {
        question: "How is this different from an inset box shadow generator elsewhere online?",
        answer:
          "The inset option here is one toggle on the same fields rather than a separate tool, because inset and outset shadows use identical offset, blur, spread, colour and opacity values, differing only in whether the inset keyword sits at the start of the declaration. Switching it never changes any other value entered.",
      },
      {
        question: "Does opacity change the hex colour I typed?",
        answer:
          "No. The hex colour is parsed once into fixed red, green and blue channels, and opacity is applied only as the fourth, alpha channel of the resulting rgba() colour. The original hex value entered is never modified or rounded into a lighter shade to simulate transparency.",
      },
      {
        question: "Why do blur radius and spread radius produce such different looking shadows?",
        answer:
          "Blur radius softens the shadow's edge into a gradient without changing its overall size, while spread radius changes the shadow's actual shape, growing or shrinking it uniformly before blur is applied. A shadow can have a large blur and no spread, a large spread and no blur, or any combination of both.",
      },
      {
        question: "Can I use a 3 digit hex shorthand like #333 for the shadow colour?",
        answer:
          "Yes. A 3 digit hex code expands to its 6 digit equivalent before the channels are read, so #333 and #333333 produce an identical rgba() colour in the finished declaration. Both are accepted with or without a leading # character.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/colour-palette-generator",
        label: "colour palette generator",
        description: "Generates a companion colour harmony from the same hex colour used as a shadow's base colour.",
      },
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Checks whether text sitting on a card that uses a generated shadow still passes a real WCAG contrast ratio.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For documenting a shadow scale built from this generator as reusable, named elevation tokens.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description: "Covers keeping an icon legible against the same kind of soft, low opacity shadow this tool produces.",
      },
    ],

    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
        label: "MDN: box-shadow",
        description: "The browser vendor reference for the box-shadow property's exact argument order and the inset keyword this tool follows.",
      },
      {
        href: "https://www.w3.org/TR/css-backgrounds-3/#box-shadow",
        label: "W3C: CSS Backgrounds and Borders Module Level 3, box-shadow",
        description: "The published specification defining the box-shadow property's syntax and how offset, blur and spread interact.",
      },
      {
        href: "https://caniuse.com/css-boxshadow",
        label: "Can I use: CSS3 box-shadow",
        description: "Independent browser support data for the box-shadow property this tool generates a declaration for.",
      },
    ],
  },

  tags: ["css", "shadow", "design", "box-shadow"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
