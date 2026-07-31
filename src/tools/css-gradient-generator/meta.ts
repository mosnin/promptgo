import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "css-gradient-generator",
  name: "CSS Gradient Generator",
  title: "CSS Gradient Generator",
  category: "design-visual-tools",
  summary:
    "Builds a ready-to-paste linear or radial CSS gradient declaration from a list of hex colour stops and their positions, sorting the stops by position before the gradient string is built.",

  seo: {
    primaryKeyword: "css gradient generator",
    keywords: [
      "css gradient generator",
      "free css gradient generator tool",
      "how to make a css gradient",
      "linear gradient generator online",
      "radial gradient css generator",
      "css background gradient generator",
    ],
    seoTitle: "CSS Gradient Generator: Free Linear And Radial Tool",
    seoDescription:
      "A free css gradient generator that builds a ready-to-paste linear or radial CSS declaration from hex colour stops, sorted by position before it is built.",
  },

  fields: [
    {
      kind: "select",
      token: "gradientType",
      label: "Gradient type",
      help: "Linear travels in a straight line at the angle set below. Radial spreads outward from the centre.",
      options: [
        { value: "linear", label: "Linear" },
        { value: "radial", label: "Radial" },
      ],
      example: "linear",
    },
    {
      kind: "number",
      token: "angle",
      label: "Angle (degrees)",
      help: "Only used for linear gradients. 0 points to the top, and the angle increases clockwise.",
      placeholder: "90",
      example: 90,
      min: 0,
      max: 360,
      step: 1,
      suffix: "°",
    },
    {
      kind: "list",
      token: "colourStops",
      label: "Colour stops",
      help: "Each stop needs a hex colour and a position from 0% to 100%. At least 2 stops are required.",
      itemLabel: "colour stop",
      min: 2,
      max: 8,
      fields: [
        {
          kind: "text",
          token: "hex",
          label: "Hex colour",
          placeholder: "#3b82f6",
          example: "#3b82f6",
        },
        {
          kind: "number",
          token: "position",
          label: "Position",
          help: "0 to 100 percent along the gradient.",
          example: 0,
          min: 0,
          max: 100,
          step: 1,
          suffix: "%",
        },
      ],
      example: [
        { hex: "#3b82f6", position: 0 },
        { hex: "#8b5cf6", position: 50 },
        { hex: "#ec4899", position: 100 },
      ],
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard CSS linear-gradient() and radial-gradient() syntax"],
    testingNote:
      "The gradient string this tool outputs is generated directly from the standard CSS gradient syntax, not from a model: each colour stop is validated, sorted by position, and written into the linear-gradient() or radial-gradient() function exactly as the specification defines it, then checked against known correct declarations for a 2-stop gradient, a 3-stop gradient given out of position order, a radial gradient, an invalid hex value, too few stops, and the 0% and 100% position boundaries before publishing.",
  },

  article: {
    intro: [
      "A css gradient generator answers a narrow, mechanical question: given a list of colours and the position each one sits at between 0 and 100 percent, what is the exact CSS function that produces it. This tool takes a gradient type, an angle for a linear gradient, and colour stops, validates every hex value and position, sorts the stops, and writes the result as a background declaration ready to paste into a stylesheet.",
      "A hand written gradient is easy to get subtly wrong. A stop typed at 80% before a stop at 20% still renders, since CSS never requires ascending order, but it renders in the written order rather than the order the numbers suggest. Sorting the stops before building the string removes that mistake, and the tool notes when the output order differs from the order the stops were entered in.",
    ],

    sections: [
      {
        heading: "How this css gradient generator builds the gradient string",
        body: [
          "Each colour stop entered into the form is a hex value and a position. The hex value is validated against the same 3-or-6-digit pattern used across every colour tool on this site, accepted with or without a leading #, and expanded to its full 6-digit form, so #3bf and #33bbff always produce the identical declaration. The position is checked as a finite number between 0 and 100, since a percentage outside that range has no defined meaning on a gradient axis.",
          "Once every stop passes validation, the full set is sorted by position, and each one is written as its hex value followed by its percentage, separated by commas, inside linear-gradient() or radial-gradient(). The same stops always produce the same string, character for character.",
        ],
      },
      {
        heading: "Why colour stop order and position are not the same thing",
        body: [
          "The order stops are typed into the form and the order they appear in the finished gradient are two different things, and conflating them is a common source of a gradient that renders unexpectedly. A person adding a bright accent colour partway through a palette will often type it last, at whatever position it belongs, rather than reopening earlier rows to insert it in the middle.",
          "This tool treats position, not entry order, as the source of truth. Every stop is re-sorted before the string is written, and a note appears whenever that reordering changed anything, so it is clear when the output does not match the form's own order.",
        ],
      },
      {
        heading: "Linear versus radial: what the angle argument actually controls",
        body: [
          "A linear gradient travels in a straight line across its box, and the angle argument sets that line's direction: 0 degrees points straight up, and the angle increases clockwise, so 90 degrees runs left to right. Used as a linear gradient generator online, the tool always writes the angle exactly as entered, in degrees, ahead of the colour stop list.",
          "A radial gradient has no direction to set, since it spreads outward from a centre point in every direction at once. Used as a radial gradient css generator, this tool always emits the circle keyword and drops the angle entirely, because an angle value has no defined meaning on a shape that expands equally on every side.",
        ],
      },
      {
        heading: "How to make a css gradient without guessing pixel positions",
        body: [
          "Adjusting a gradient by trial and error in a browser inspector usually means nudging a percentage, reloading, and repeating until the transition looks approximately right, with no record of why a stop landed where it did. Working from stated positions instead means every stop has an exact, checkable percentage from the start.",
          "This also makes a gradient easy to hand off: a stated list of hex values and positions is unambiguous in a way a screenshot of a colour transition is not, since a receiving developer can type the same values back in rather than sampling pixels from an image.",
        ],
      },
      {
        heading: "What a free css gradient generator tool checks before it builds anything",
        body: [
          "Every stop's hex value has to parse as 3 or 6 hex digits, with or without a leading #, or the tool returns an error naming the specific stop that failed, rather than a gradient with a broken colour silently substituted in. The same applies to position: a value that is missing, not a number, or outside 0 to 100 stops the calculation and names the row responsible.",
          "A free css gradient generator tool that lets an invalid stop through produces a declaration that fails silently in the browser, rendering nothing where the broken colour would have been, which is harder to debug than a clear error naming the row before the CSS is generated.",
        ],
      },
      {
        heading: "Using this as a css background gradient generator for real stylesheets, not a preview",
        body: [
          "The output is not a rendered image, and not a value meant only for a live preview panel. It is a complete background declaration, opening with the property name and ending with a semicolon, ready to paste into a class, a component style block, or a CSS custom property.",
          "A css background gradient generator that only shows a swatch and expects the function syntax to be reconstructed by hand adds a step that is easy to get wrong, particularly around comma placement between stops. Copying the finished declaration removes that step.",
        ],
      },
    ],

    howTo: {
      name: "How to use the CSS gradient generator",
      steps: [
        {
          name: "Choose linear or radial",
          text: "Linear travels in a straight line at a set angle. Radial spreads outward from the centre and has no direction to set.",
        },
        {
          name: "Set the angle, for a linear gradient",
          text: "Enter a value from 0 to 360 degrees. This field is ignored for a radial gradient, since it has no direction argument.",
        },
        {
          name: "Add each colour stop",
          text: "Enter a hex value and a position from 0 to 100 percent for every stop. At least 2 stops are required to form a gradient.",
        },
        {
          name: "Check the reordering note",
          text: "If the stops were entered out of position order, the result states that they were sorted before the gradient was built.",
        },
        {
          name: "Copy the finished declaration",
          text: "The output is a complete background declaration, ready to paste into a stylesheet, a component style block, or a CSS custom property.",
        },
      ],
    },

    faq: [
      {
        question: "What does this css gradient generator actually calculate?",
        answer:
          "It validates every colour stop's hex value and position, sorts the stops by position from 0 to 100 percent, and writes them into a linear-gradient() or radial-gradient() function exactly as the CSS specification defines it, then wraps the result as a complete background declaration ready to paste into a stylesheet.",
      },
      {
        question: "Why are the colour stops sorted before the gradient is built?",
        answer:
          "CSS renders gradient stops in the order they are written, not automatically by position, so stops entered out of order still render, just not in the order the percentages suggest. Sorting by position before building the string means the output always matches what the stated positions actually describe, and the result notes it whenever the input order did not already match.",
      },
      {
        question: "What happens if one colour stop has an invalid hex value?",
        answer:
          "The tool returns an error naming the exact stop that failed, such as colour stop 2, rather than building a gradient with a broken value silently substituted in. A hex value has to be 3 or 6 hex digits, with or without a leading #, to be accepted.",
      },
      {
        question: "Does the angle field do anything for a radial gradient?",
        answer:
          "No. A radial gradient spreads outward from a centre point in every direction at once, so it has no direction for an angle to set. This tool always writes a radial gradient with the circle keyword and drops the angle value entirely, and the result notes that it was not used.",
      },
      {
        question: "Can I use 3-digit hex shorthand like #3bf as a colour stop?",
        answer:
          "Yes. A 3-digit hex value is expanded to its 6-digit equivalent before it goes into the gradient string, so #3bf and #33bbff produce the identical declaration. Both are accepted with or without a leading # character on every colour stop.",
      },
      {
        question: "Is there a limit to how many colour stops a gradient can have?",
        answer:
          "This tool accepts up to 8 colour stops in one gradient, comfortably covering a multi-colour band without becoming unreadable. At least 2 stops are required, since a gradient needs a starting colour and an ending colour to describe a transition at all.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/colour-palette-generator",
        label: "colour palette generator",
        description: "Generates a set of related hex colours from one base colour, useful for picking the stops before they go into a gradient.",
      },
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Checks the exact WCAG contrast ratio for any text placed over a solid part of a generated gradient.",
      },
      {
        href: "/tools/hex-rgb-hsl-converter",
        label: "hex, RGB and HSL converter",
        description: "Converts a colour stop between hex, RGB and HSL notation when a design file specifies a gradient stop in a different format.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description: "For writing up the exact stops and behaviour of a gradient background as part of a build specification an engineer can implement directly.",
      },
    ],

    externalLinks: [
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient",
        label: "MDN: <gradient> CSS data type",
        description: "The browser vendor reference for linear-gradient(), radial-gradient() and their syntax, which this tool's output follows exactly.",
      },
      {
        href: "https://www.w3.org/TR/css-images-3/",
        label: "W3C: CSS Images Module Level 3",
        description: "The published specification defining the linear-gradient() and radial-gradient() notations this tool's compute logic implements.",
      },
      {
        href: "https://caniuse.com/css-gradients",
        label: "Can I use: CSS Gradients",
        description: "Current browser support data for CSS gradients, useful for checking whether a generated declaration needs a fallback background colour.",
      },
    ],
  },

  tags: ["css", "gradient", "design", "colour"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
