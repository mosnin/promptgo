import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "hex-rgb-hsl-converter",
  name: "Hex RGB HSL Converter",
  title: "Hex RGB HSL Converter",
  category: "design-visual-tools",
  summary:
    "Converts a hex colour code to its RGB and HSL values using the standard RGB to HSL formula, with the normalised 6-digit hex shown alongside.",

  seo: {
    primaryKeyword: "hex rgb hsl converter",
    keywords: [
      "hex rgb hsl converter",
      "free hex to rgb converter",
      "hex to hsl converter online",
      "rgb to hsl converter tool",
      "how to convert hex to rgb",
    ],
    seoTitle: "Hex RGB HSL Converter: Free Colour Value Tool",
    seoDescription:
      "A free hex rgb hsl converter that turns any hex colour code into its exact RGB and HSL values using the standard conversion formula, with no rounding guesswork.",
  },

  fields: [
    {
      kind: "text",
      token: "hex",
      label: "Hex colour code",
      help: "3 or 6 hex digits, with or without #.",
      placeholder: "#3b82f6",
      example: "#3b82f6",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Standard RGB to HSL colour space conversion"],
    testingNote:
      "Verified against hand computed values before publishing: pure red, pure white and pure black each produce their known exact HSL values, mid grey's 128-out-of-255 channels round to the same 50 percent lightness the formula produces by hand, a 3-digit hex shorthand expands and converts identically to its 6-digit form, and an invalid hex string returns an error rather than a guessed result.",
  },

  article: {
    intro: [
      "A hex rgb hsl converter exists because the same colour gets written three different ways depending on where it is used, and none of the three conversions between them is something most people can do reliably in their head. This tool takes a hex colour code and returns its exact RGB channel values and its exact HSL values, computed from the standard RGB to HSL formula rather than rounded off a colour picker by eye.",
      "Hex is what shows up in a CSS file or a design tool's swatch. RGB is what a screen actually renders, three light channels mixed together. HSL is the one built for editing, because dragging a single lightness or saturation slider does what a person means by lighter or more muted, which shifting three RGB channels at once does not.",
    ],

    sections: [
      {
        heading: "How this hex rgb hsl converter converts a colour",
        body: [
          "The conversion runs in two steps. First, the hex string is parsed into three 0 to 255 channels, one each for red, green and blue, by reading each pair of hex digits as a base-16 number. A 3-digit shorthand like #3b8 is expanded to its 6-digit form, #33bb88, before parsing, since each shorthand digit stands for a repeated pair.",
          "Second, those RGB channels are converted to HSL. Lightness is the midpoint between the largest and smallest channel. Saturation measures how far apart the largest and smallest channel are, scaled against how close that midpoint sits to pure black or pure white. Hue comes from which channel is largest and how far the other two trail behind it, expressed as a position around a 360 degree wheel split into six sectors, one per primary and secondary colour.",
        ],
      },
      {
        heading: "Why RGB and HSL describe the same colour so differently",
        body: [
          "RGB is an additive model: three light sources, mixed. It maps directly onto how a screen's pixels physically work. It is a poor fit for editing, since making a colour lighter without shifting its hue means changing three numbers by different amounts, worked out by trial and error rather than by formula.",
          "HSL was designed the other way round, for a person adjusting a colour rather than a screen displaying one. Hue is the colour family, saturation is how far it sits from grey, and lightness is how far it sits from black or white. Moving one slider and leaving the other two alone changes exactly the thing its name suggests.",
        ],
      },
      {
        heading: "A free hex to rgb converter that expands shorthand automatically",
        body: [
          "3-digit hex shorthand is common in handwritten CSS but easy to parse wrong by hand, since #3b8 does not mean the same as #030b08. Each digit is duplicated, not padded with a zero, so #3b8 expands to #33bb88, and this free hex to rgb converter applies that expansion before doing anything else, so a shorthand and its full form always produce identical output.",
          "The leading # is optional either way. Typing 3b8, #3b8, 33bb88 or #33bb88 all reach the same parser and the same result, which matters when a colour value is copied out of a codebase that is inconsistent about the leading character.",
        ],
      },
      {
        heading: "Reading the hue, saturation and lightness values correctly",
        body: [
          "Hue runs from 0 to 360 degrees: red sits at 0, green at 120, blue at 240, and the wheel wraps back to red at 360. Saturation and lightness are both percentages from 0 to 100. 0 percent saturation is a shade of grey, where hue stops meaning anything, so it is reported as 0 by convention. 0 percent lightness is always black and 100 percent lightness is always white, regardless of hue or saturation, since there is no colour left to see at either extreme.",
          "A common misreading is treating lightness like brightness in an image editor. A fully saturated hue at 50 percent lightness is the purest version of that colour, not a mid grey version of it.",
        ],
      },
      {
        heading: "Using this hex to hsl converter online instead of eyeballing a slider",
        body: [
          "Nudging a lightness or saturation slider in a design tool and reading off the new hex value is slow, especially when the goal is a specific numeric target, like a colour token that needs to sit at exactly 40 percent lightness for a hover state. Typing the starting hex value into this hex to hsl converter online gives the exact current HSL numbers immediately, so the adjustment is a calculation rather than a guess.",
          "It also removes a common source of error when a colour is ported between a design file and a stylesheet: a designer's HSL value and a developer's hex value drifting apart after a rounding step somewhere in between. Converting both from the same hex source removes that drift entirely.",
        ],
      },
      {
        heading: "This rgb to hsl converter tool for building a tint and shade scale",
        body: [
          "A common design system task is generating a scale of tints and shades from one base colour: the same hue and saturation held constant while lightness steps up toward white and down toward black in even increments. That only works cleanly in HSL, since RGB has no single number that means lightness on its own.",
          "Converting the base colour with this rgb to hsl converter tool gives the exact starting hue and saturation to hold fixed, so each step only requires changing the lightness value and converting back, rather than guessing at three RGB channels per step and checking the result by eye.",
        ],
      },
    ],

    howTo: {
      name: "How to convert hex to rgb and hsl",
      steps: [
        {
          name: "Enter the hex colour code",
          text: "Type the hex value, 3 or 6 digits, with or without a leading #. The example field shows a valid 6-digit value to start from.",
        },
        {
          name: "Read the HSL value",
          text: "The headline result is the HSL value as hue in degrees, then saturation and lightness as percentages.",
        },
        {
          name: "Read the RGB and normalised hex values",
          text: "Below the headline, the same colour is shown as an RGB triplet and as a normalised 6-digit hex code, even if the original input was a 3-digit shorthand.",
        },
        {
          name: "Adjust the hex value and watch all three update",
          text: "Change a digit or two in the hex field and the RGB and HSL values recalculate immediately, with no submit step, since the conversion runs entirely in the browser.",
        },
      ],
    },

    faq: [
      {
        question: "How to convert hex to rgb without a calculator?",
        answer:
          "Split the 6-digit hex code into three pairs of digits, one pair each for red, green and blue, then read each pair as a base-16 number. #3b82f6 splits into 3b, 82 and f6, which are 59, 130 and 246 in base 10, giving rgb(59, 130, 246). A 3-digit shorthand is expanded first by duplicating each digit.",
      },
      {
        question: "Why does the same colour show different HSL numbers in different tools?",
        answer:
          "It should not, if both tools implement the standard RGB to HSL formula and round to the same number of decimal places. A difference usually means one tool rounds hue, saturation or lightness to a whole number and the other keeps a decimal, producing a value that looks different while describing the same colour.",
      },
      {
        question: "What does 0 percent saturation mean for the hue value?",
        answer:
          "At 0 percent saturation the colour is pure grey, and hue has no visible effect on it, since every hue looks identical once there is no colour intensity left. This hex rgb hsl converter reports hue as 0 in that case by convention, matching how the CSS hsl() function itself handles a fully desaturated colour.",
      },
      {
        question: "Does a 3-digit hex code always expand the same way?",
        answer:
          "Yes. Each of the three digits is duplicated, not padded with a zero, so #3b8 becomes #33bb88 and #fff becomes #ffffff. That is a fixed rule in the CSS colour specification, which is why the 3-digit and 6-digit forms of the same shorthand always produce identical RGB and HSL results here.",
      },
      {
        question: "Is the RGB output the same as what a browser's colour picker shows?",
        answer:
          "Yes, for standard sRGB colours, which is what hex codes and CSS colours use by default. The RGB channels are parsed directly from the hex digits with no colour profile conversion applied, matching what a browser's built in colour input or a design tool's default picker reports for the same hex value.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Takes the hex values this converter outputs and checks the WCAG contrast ratio between a foreground and background pairing.",
      },
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description: "Builds a full set of named colour roles, which this converter can translate into HSL for a tint and shade scale.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For documenting converted colour values as reusable tokens once the HSL and RGB numbers are confirmed here.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/TR/css-color-4/#the-hsl-notation",
        label: "W3C: CSS Color Module Level 4, the hsl() notation",
        description: "The published specification for how hue, saturation and lightness values are defined and written in CSS.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl",
        label: "MDN: hsl() colour value",
        description: "A browser vendor's reference for the hsl() function and its accepted value ranges.",
      },
      {
        href: "https://drafts.csswg.org/css-color/#hex-notation",
        label: "CSS Working Group: CSS Color, hex colour notation",
        description: "Defines the 3-digit and 6-digit hex shorthand expansion this converter follows exactly.",
      },
    ],
  },

  tags: ["colour", "hex", "rgb", "hsl", "converter"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
