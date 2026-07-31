import type { ToolMeta } from "@/lib/tool-types";

const meta: ToolMeta = {
  slug: "colour-contrast-checker",
  name: "Colour Contrast Checker",
  title: "Colour Contrast Checker",
  category: "design-visual-tools",
  summary:
    "Calculates the exact WCAG 2.1 contrast ratio between a foreground and a background hex colour, and checks it against AA and AAA for normal and large text.",

  seo: {
    primaryKeyword: "colour contrast checker",
    keywords: [
      "colour contrast checker",
      "free colour contrast checker tool",
      "wcag aa contrast ratio checker",
      "how to check contrast ratio online",
      "colour contrast checker for text and background",
      "contrast ratio calculator for accessibility",
    ],
    seoTitle: "Colour Contrast Checker: Free WCAG 2.1 Ratio Tool",
    seoDescription:
      "A free colour contrast checker that computes the exact WCAG 2.1 contrast ratio between two hex colours and checks it against AA and AAA for normal and large text.",
  },

  fields: [
    {
      kind: "text",
      token: "foreground",
      label: "Foreground (text) hex colour",
      help: "3 or 6 hex digits, with or without a leading #.",
      placeholder: "#1a1a1a",
      example: "#1a1a1a",
    },
    {
      kind: "text",
      token: "background",
      label: "Background hex colour",
      help: "The surface the foreground colour sits on.",
      placeholder: "#ffffff",
      example: "#ffffff",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["WCAG 2.1 relative luminance and contrast ratio formula"],
    testingNote:
      "Verified against known correct values before publishing: black on white produces the maximum possible ratio of 21:1 and passes every threshold, identical colours produce the minimum possible ratio of 1:1 and fail every threshold, a mid grey pairing that clears AA but not AAA was hand computed and checked against the formula's output, and an invalid hex string returns an error rather than a guessed number.",
  },

  article: {
    intro: [
      "A colour contrast checker answers one narrow question: given two colours, does the contrast ratio between them clear the WCAG level a piece of text or an interface component actually needs. This free colour contrast checker tool calculates that ratio using the WCAG 2.1 relative luminance formula exactly as published, rather than a rounded approximation, and checks it against AA and AAA at once, for both normal and large text.",
      "Most contrast problems are not obvious at a glance. A grey slightly too light against a grey slightly too dark for a caption can look fine on a good monitor and fail outright for someone with low vision, or in direct sunlight on a phone screen. Because contrast ratio is arithmetic rather than judgement, that failure has an exact numeric answer instead of a debate.",
    ],

    sections: [
      {
        heading: "How the WCAG 2.1 contrast ratio formula actually works",
        body: [
          "The formula starts from relative luminance, a single number per colour standing in for how bright it would appear on a screen. Each red, green and blue channel is converted from its 0 to 255 value to a 0 to 1 fraction, then linearised: values at or below 0.03928 are divided by 12.92, and everything above that follows a power curve instead. That piecewise split exists because sRGB displays do not render brightness in a straight line, and skipping it is the most common reason a hand calculated contrast ratio comes out wrong.",
          "The three linearised channels are then combined with fixed weights, 0.2126 for red, 0.7152 for green and 0.0722 for blue, because the eye is far more sensitive to green than to blue at equal intensity. The result is one relative luminance value between 0 for black and 1 for white, for each colour, which is what the contrast ratio is built from.",
        ],
      },
      {
        heading: "Why a colour contrast checker cannot just compare hex values",
        body: [
          "Subtracting two hex codes, or averaging their RGB channels, produces a number that looks plausible and is not the contrast ratio. Hex values are gamma encoded for how a screen renders them rather than linear light, so colours that are numerically close in RGB terms can differ enormously in perceived brightness, and colours that look close on screen can sit further apart numerically than expected.",
          "This is also why the formula only accepts sRGB input. The linearisation step converts the display encoded value back to something proportional to actual light output before the luminance weights are applied, and that is the step a shortcut calculation skips, which is why its answer drifts from the real one.",
        ],
      },
      {
        heading: "AA and AAA thresholds for normal and large text",
        body: [
          "WCAG 2.1 success criterion 1.4.3 sets the AA minimum at 4.5:1 for normal text and relaxes it to 3:1 for large text, defined as 18 point and above, or 14 point and above when bold. Success criterion 1.4.6 sets the stricter AAA levels at 7:1 and 4.5:1. A wcag aa contrast ratio checker only needs the first pair of numbers; a team committing to AAA needs both pairs checked.",
          "The ratio itself is always between 1:1, for two identical colours, and 21:1, for pure black against pure white, the two extremes this tool's own self tests are checked against.",
        ],
      },
      {
        heading: "Where a colour contrast checker for text and background catches real failures",
        body: [
          "Body copy usually passes, because it tends to get checked once during a design review and left alone. What fails, and keeps failing, are the pairings nobody thinks of as text: placeholder copy, a disabled button label, the caption under a chart, a focus ring against a raised surface, and an icon that carries meaning on its own.",
          "Running each of those pairings through the same formula, rather than trusting the one pairing that was checked in the original design file, is what closes the gap between a component that looks accessible and one that measurably is.",
        ],
        list: [
          "Placeholder text, often set several shades lighter than the label above it",
          "Disabled states, left at whatever grey the lowest opacity token produces",
          "Hover and focus states, which can shift a passing colour into a failing one",
          "Icon only buttons, where non text contrast rules apply to the icon itself",
        ],
      },
      {
        heading: "How to check contrast ratio online without guessing at the number",
        body: [
          "The fastest way is to skip the manual arithmetic entirely: enter the two hex values into a calculator built on the published formula and read the ratio and the four pass or fail results at once, rather than working through the linearisation and luminance weights by hand.",
          "It is worth checking a component's states individually rather than assuming the default state's ratio applies everywhere. A button that passes at rest can fail on hover if the hover colour was chosen for visual interest rather than for the ratio it produces against the same label.",
        ],
      },
      {
        heading: "Using this as a contrast ratio calculator for accessibility work, not an AI prompt",
        body: [
          "Contrast ratio has exactly one correct answer for a given pair of colours, which makes it arithmetic rather than something worth asking a language model to estimate. A model asked for the ratio between two hex values produces a plausible sounding number, not a computed one, and that number is frequently wrong by enough to flip a borderline pass into a failure.",
          "A colour contrast checker exists precisely to replace that guess with the same computation every time. That is also why the result on this page updates as the two fields change rather than after a submit button: there is no request being sent anywhere, just the same deterministic formula run again on whatever is currently in the two fields.",
        ],
      },
    ],

    howTo: {
      name: "How to use the colour contrast checker",
      steps: [
        {
          name: "Enter the foreground hex colour",
          text: "Type the text colour's hex value, 3 or 6 digits, with or without a leading #.",
        },
        {
          name: "Enter the background hex colour",
          text: "Type the hex value of the surface the text sits on. Which field is visually lighter does not matter; the formula handles either order.",
        },
        {
          name: "Read the ratio and the four pass or fail results",
          text: "The headline number is the exact contrast ratio. Below it, AA and AAA are checked separately for normal and large text, since a pairing can pass one and fail the other.",
        },
        {
          name: "Adjust one colour until it clears the level you need",
          text: "Darken the text, lighten the background, or both, and watch the ratio update, until the threshold that matters for this component shows Pass.",
        },
      ],
    },

    faq: [
      {
        question: "What does a colour contrast checker actually calculate?",
        answer:
          "This colour contrast checker calculates relative luminance for each colour from the WCAG 2.1 formula, then divides the lighter luminance by the darker one after adding 0.05 to both. That produces a single ratio between 1:1 and 21:1, checked against the AA and AAA thresholds for normal and large text.",
      },
      {
        question: "Does it support 3-digit hex codes like #fff?",
        answer:
          "Yes. A 3-digit hex code is expanded to its 6-digit equivalent before parsing, so #fff and #ffffff, or 777 and 777777, produce identical contrast ratios. Both are accepted with or without the leading # character, since a checker that rejects a valid shorthand wastes a visitor's time for nothing.",
      },
      {
        question: "Why might this ratio differ slightly from another contrast tool?",
        answer:
          "It should not, if the other tool implements the same WCAG 2.1 formula. A difference usually means one tool is rounding the sRGB values before linearising them, or averaging the RGB channels directly instead, which is a shortcut that produces a plausible but incorrect number.",
      },
      {
        question: "Should a design system target AA or AAA?",
        answer:
          "Most public sites target AA, which is also what most accessibility legislation references directly. AAA is a stricter bar usually reserved for content aimed at low vision users, since meeting it for every pairing in a typical interface is difficult without constraining the palette considerably.",
      },
      {
        question: "Does a passing contrast ratio mean a colour pairing is fully accessible?",
        answer:
          "No. Contrast ratio is one measurable requirement among several, alongside not relying on colour alone to convey meaning, keeping focus indicators visible, and sizing touch targets adequately. A pairing can clear every contrast threshold here and still fail an accessibility review on a criterion this tool was never built to check.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description: "Audits a whole component with a verdict per criterion, including the states this checker only covers one pairing at a time.",
      },
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description: "Builds a full set of named colour roles with a contrast ratio printed for every pairing that actually occurs.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For turning a set of colours that already pass contrast into documented, reusable tokens.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description: "Covers the non text contrast floor an icon only button has to clear, which this checker's ratio also applies to.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
        label: "W3C: Understanding WCAG 2.1 Contrast (Minimum)",
        description: "The published success criterion this tool's AA thresholds are taken from, including the normal and large text definitions.",
      },
      {
        href: "https://webaim.org/articles/contrast/",
        label: "WebAIM: Contrast and Color Accessibility",
        description: "Explains the relative luminance formula and the four related WCAG success criteria in plain terms.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast",
        label: "MDN: Color contrast",
        description: "A browser vendor's reference for the same AA and AAA thresholds, with worked examples of passing and failing pairs.",
      },
    ],
  },

  tags: ["colour", "contrast", "accessibility", "wcag"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
