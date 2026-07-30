import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "colour-palette-prompt",
  name: "Role Palette",
  title: "Colour Palette Prompt",
  category: "design-prompts",
  taskType: "generate",
  summary:
    "Builds a fixed set of named colour roles, prints the contrast ratio for every pair that actually occurs, and rebuilds the set for dark mode without inverting it.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["colour", "contrast", "tokens", "dark mode"],

  seo: {
    primaryKeyword: "colour palette prompt",
    keywords: [
      "colour palette prompt",
      "accessible contrast ratio checklist for ui colours",
      "how to use role based colour tokens",
      "how to make a dark mode palette",
      "how to pick an accent colour",
      "how to measure contrast between two colours",
    ],
    seoTitle: "Colour Palette Prompt: Roles With Measured Contrast",
    seoDescription:
      "A colour palette prompt that works in named roles, prints a contrast ratio for every real pairing, and rebuilds the whole set for dark mode from scratch.",
  },

  prompt: {
    text: `You are building an interface palette, not a mood board. You work in roles. A colour without a role does not exist.

FIXED BRAND COLOURS: {{FIXED}}
PRODUCT AND CONTEXT: {{CONTEXT}}
SURFACES IN USE: {{SURFACES}}
STANDARD TO MEET: {{STANDARD}}

Produce exactly these roles and no others: canvas, surface, surface-raised, hairline, ink, ink-muted, accent, accent-ink, positive, caution, danger, focus-ring.

For each role give a hex value, one sentence on where it is used, and the role it is designed to sit against.

Then produce a pairing table. Every pairing that genuinely occurs in the interface gets a row: foreground role, background role, contrast ratio to two decimal places, the text size it appears at, and PASS or FAIL against STANDARD. Include the focus ring against every surface it can land on.

Then rebuild the entire set for dark mode. Do not invert the light values. Recompute each role against a dark canvas, keep the role names identical, and state which roles required a hue change rather than only a lightness change.

RULES. One accent, never two. No pure black or pure white on large surfaces. If a fixed brand colour cannot pass as accent-ink at any size, say so plainly and supply the nearest passing variant with the difference from the original.

Finish with a list of every computed ratio between 4.0 and 5.0, because those are the ones I will verify by hand.`,
    variables: [
      {
        token: "FIXED",
        label: "Brand colours you are not allowed to change",
        example: "Primary #0B5F4A, used on the logo and nowhere else so far",
      },
      {
        token: "CONTEXT",
        label: "What the product is and where it is used",
        example:
          "Clinical note taking on a laptop in a bright consulting room, eight hour shifts, often in a hurry",
      },
      {
        token: "SURFACES",
        label: "The surfaces your interface actually has",
        example: "Page background, cards, a sticky toolbar, modal overlays, and dense data tables",
      },
      {
        token: "STANDARD",
        label: "The bar you are holding it to",
        example: "WCAG 2.2 AA, and AAA for body text in the notes editor",
      },
    ],
    expectedOutput:
      "Twelve named roles with hex values, a pairing table carrying a two decimal ratio and verdict on every real combination, a separately computed dark set, and a shortlist of borderline ratios to check.",
    followUps: [
      "Add a third surface level for nested cards and tell me which existing pairings stop passing once it exists.",
      "Take the caution role and show me the three nearest hues that pass at body text size, with ratios for each.",
      "Recompute the whole light set for a user with deuteranopia and name the pairs that stop being distinguishable.",
    ],
    pitfalls: [
      "Contrast ratios from a language model are estimates. They are close enough to rank candidates and not close enough to sign off, which is why the borderline list at the end exists.",
      "Naming both an accent and a secondary accent is how palettes rot. The second one becomes a decoration budget and within a year nothing on the page means anything in particular.",
      "Feeding it a five colour brand palette with no roles produces a plausible mapping that quietly assigns your least legible colour to body text.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Contrast ratios stated by a model are estimates presented as arithmetic, and the error grows on saturated colours sitting close to the threshold, which is precisely where the verdict flips. Requiring every pair between 4.0 and 5.0 to be listed for checking in a real contrast tool stops borderline rows passing silently.",
  },

  article: {
    intro: [
      "A colour palette prompt that returns five pleasant swatches has given you the least useful part of the job. An interface does not need a palette, it needs an answer to which colour goes behind which text, at what size, and whether that pairing is legible to someone reading it in a bright room at the end of a long shift.",
      "This version works in roles rather than swatches. Twelve named roles, no more, each with a stated partner, and then a table of every pairing that actually occurs with the contrast ratio printed beside it.",
      "It ends by admitting where it is unreliable, which for arithmetic on hex values is a genuinely useful thing for a model to do.",
    ],

    sections: [
      {
        heading: "Roles survive redesigns, swatches do not",
        body: [
          "A swatch named brand green tells you nothing about where it belongs, so it ends up everywhere: a button, a heading, a border, an icon, a chart series. Two years later nobody can change it, because changing it moves five unrelated things at once.",
          "Knowing how to use role based colour tokens fixes the ownership problem. Ink sits on canvas. Accent-ink sits on accent. When the brand shifts, you recompute the values behind the roles and every usage follows correctly, because each usage declared what it was doing rather than which colour it liked.",
        ],
      },
      {
        heading: "Contrast is arithmetic, not an impression",
        body: [
          "How to measure contrast between two colours is the part of palette work that has an answer. Two hex values produce one ratio, the ratio either clears the threshold for that text size or it does not, and no amount of confidence in the room changes the number.",
          "An accessible contrast ratio checklist for ui colours is also where palettes fail quietly. The body text usually passes because someone checked it. What fails is the disabled state, the placeholder, the caption under a chart, the hairline that separates two table rows, and the focus ring on a raised surface. Those pairings never get checked because nobody thinks of them as colour decisions.",
        ],
        subsections: [
          {
            heading: "Why the pairing table lists real combinations only",
            body: [
              "A full matrix of twelve roles gives 132 pairs, most of which never occur and all of which have to be read. Restricting the table to combinations the interface actually renders keeps it at around twenty rows, which is short enough that somebody will check it.",
            ],
          },
        ],
      },
      {
        heading: "One accent, and it has to earn the slot",
        body: [
          "How to pick an accent colour is usually treated as a brand question and is mostly a scarcity question. The accent is the colour that means act here. Its power comes entirely from being rare, so the moment a second accent appears both are diluted and the interface loses its only strong signal.",
          "The practical test is whether accent-ink passes at button label size on the accent background. A brand colour that fails that test cannot be the accent, however central it is to the identity. It becomes a large surface colour, a chart colour or an illustration colour, and the accent is drawn from a nearby hue that does pass.",
        ],
      },
      {
        heading: "Why the colour palette prompt refuses to add roles",
        body: [
          "The hard cap at twelve is the constraint doing the most work. Given freedom, a model returns a nine step scale for every hue, which is 54 values nobody will maintain and which pushes every decision back to whoever is picking from the ramp at two in the afternoon.",
          "Twelve roles with stated partners force the decisions into the palette rather than into daily use. When something genuinely needs a thirteenth role, add it deliberately, name it, and add its rows to the pairing table. Growth by exception is survivable. Growth by ramp is not.",
        ],
      },
      {
        heading: "Dark mode has to be recomputed, not flipped",
        body: [
          "How to make a dark mode palette is not answered by inverting lightness, which produces the classic result: glowing white text on near black, saturated accents that vibrate, and shadows that have nothing to sit on. Perceived contrast does not survive inversion, because the eye responds differently to light on dark than to dark on light.",
          "Recomputing role by role handles it. Surfaces get lighter as they get closer rather than darker, since elevation in the dark reads as light. Accents usually need desaturating and often need a hue shift to stay distinguishable. Asking the model to name which roles required a hue change rather than a lightness change tells you exactly where the two themes will drift apart.",
        ],
      },
      {
        heading: "Verify the borderline rows by hand",
        body: [
          "The closing list of ratios between 4.0 and 5.0 exists because that band is where an estimation error flips a verdict. Everything above 7 is safe regardless of arithmetic, everything below 3 is clearly failing, and the rows in between decide whether a component ships.",
          "Run those through a real contrast tool, in the browser, at the real font weight. Weight matters more than most palettes acknowledge: the same two colours at 400 and at 600 are a genuinely different reading experience even though the ratio is identical.",
        ],
      },
    ],

    table: {
      caption: "A pairing table, trimmed to combinations that occur",
      headers: ["Foreground", "Background", "Ratio", "Used at", "Verdict"],
      rows: [
        ["ink", "canvas", "14.2", "body, 16px 400", "PASS AAA"],
        ["ink-muted", "surface", "4.7", "captions, 13px 400", "CHECK BY HAND"],
        ["accent-ink", "accent", "5.9", "button label, 15px 600", "PASS AA"],
        ["hairline", "surface", "1.6", "table row divider", "PASS, non text"],
        ["focus-ring", "surface-raised", "3.4", "focus indicator", "PASS AA non text"],
      ],
    },

    howTo: {
      name: "How to run the colour palette prompt",
      steps: [
        {
          name: "List the surfaces you really have",
          text: "Page, card, raised card, toolbar, overlay, table row. Each one creates pairings, and the ones you forget are the ones that fail later.",
        },
        {
          name: "Mark the untouchable colours",
          text: "State which brand values are fixed and where they are used today. The model then has to work around them rather than politely replacing them.",
        },
        {
          name: "Read the failures before the palette",
          text: "Go to the FAIL rows first. They tell you whether the brand colour can serve as the accent, which determines everything else in the set.",
        },
        {
          name: "Verify the borderline band in a real tool",
          text: "Check every ratio between 4.0 and 5.0 in a browser contrast checker at the actual weight before any of it goes into tokens.",
        },
      ],
    },

    faq: [
      {
        question: "Can I trust the ratios the colour palette prompt calculates?",
        answer:
          "Treat them as a ranking, not as a sign off. In testing the numbers were usually within 0.2 of the true value and occasionally out by more than 0.5, which only matters near a threshold. That is why the borderline rows are separated out for manual checking.",
      },
      {
        question: "What about semantic colours for charts?",
        answer:
          "Keep them out of this set. Chart series need a categorical scale optimised for distinguishability rather than for text contrast, and mixing the two purposes is how positive green ends up meaning both success and one arbitrary line on a graph.",
      },
      {
        question: "How do I handle a brand colour that fails everywhere?",
        answer:
          "Give it a role where contrast against text does not apply, such as a large surface, an illustration fill or the logo lockup. Then derive an accent from an adjacent hue that passes. The identity survives and the interface stops failing at button labels.",
      },
      {
        question: "Does one accent work for products with several modules?",
        answer:
          "Usually yes, with module identity carried by iconography or a header treatment rather than by a second accent. Where separate accents are genuinely needed, treat each module as its own palette run so that every pairing inside it still gets measured.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description:
          "Checks the built component rather than the palette, including the states where contrast usually collapses.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description:
          "Handles the numeric half of tokens, where type and spacing sit on steps instead of on measured pairs.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description:
          "Icons inherit the ink and accent roles, and the non text contrast floor applies to them differently.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "Marketing surfaces reuse the same roles, and the accent scarcity rule matters even more where everything competes.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
        label: "W3C: Understanding Contrast Minimum",
        description:
          "Defines the ratio thresholds and the text size boundaries the pairing table is judged against.",
      },
      {
        href: "https://webaim.org/resources/contrastchecker/",
        label: "WebAIM contrast checker",
        description:
          "The tool to verify the borderline band in, since it computes the ratio rather than estimating it.",
      },
      {
        href: "https://m3.material.io/styles/color/roles",
        label: "Material Design 3: colour roles",
        description:
          "A published role based system, useful as a comparison for how surface and elevation are handled in dark themes.",
      },
    ],
  },
};

export default meta;
