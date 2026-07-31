import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Color Contrast Palette Batch Check

Use this skill whenever you are handed a design system's real palette and the
real text and background color pairings actually used across its components,
and asked to check whether every one of those pairings clears WCAG contrast
requirements. This skill does not compute a contrast ratio itself. Every
ratio comes from the colour contrast checker at /tools/colour-contrast-checker,
which implements the WCAG 2.1 relative luminance and contrast ratio formula
exactly as published. This skill's job is organizing which pairings exist,
running each one through that tool in turn, and keeping a structured log of
the results so the check is repeatable the next time the palette changes.

## Before you check anything

Ask for, or locate, the actual list of pairings the design system uses: a
token sheet, a component library, or a set of screenshots with the token
names labelled. A pairing is a specific foreground color used against a
specific background color in a real place, for example "body text uses
ink-900 on canvas-50" or "the primary button label uses white on brand-600".

Do not invent pairings from a palette alone. A palette lists colors that
exist; it does not say which ones actually sit on top of which. A design
system can define a warning color and never actually place text on it, or
place it in a location the palette alone would never suggest. Guessing a
pairing produces a check result for a combination nobody uses and can miss
the combination that actually ships. If the full list of real pairings is
not available, say so plainly and ask for it, or work only from the
pairings that were explicitly named, rather than filling in the rest.

## Building the pairing list

For each real pairing, record three things before checking anything:

1. **Where it appears** - the component or text role, named plainly (body
   text, primary button label, placeholder text, disabled state, focus
   ring, badge text, link text, error message).
2. **The foreground color** - the exact hex value and its token name if one
   exists.
3. **The background color** - the exact hex value and its token name, and
   the surface it actually sits on, since the same token can sit on more
   than one background across a system.

Group pairings by component or page so the batch stays organized, but keep
every pairing individually listed. A component that uses three different
text colors against the same background is three pairings, not one.

## Running the batch

Work through the pairing list in order, one pairing at a time. For each
pairing:

1. Enter the foreground and background hex values into the colour contrast
   checker at /tools/colour-contrast-checker.
2. Read the exact ratio the tool reports, plus its four pass or fail results
   for AA normal text, AA large text, AAA normal text and AAA large text.
3. Record the ratio and all four results in the batch log using the format
   in \`reference/batch-log-format.md\`, against the pairing's actual text
   size and weight, since large text only needs the relaxed 3:1 and 4.5:1
   thresholds.
4. If a pairing fails the level the system is targeting, note what would fix
   it: darken the text, lighten the background, or flag it for a design
   decision, without guessing a replacement color that was not requested.

Never estimate or recall a ratio from a similar pairing checked earlier.
Two pairings that look close in hex value can differ enough in relative
luminance to flip a pass into a fail, which is exactly why each pairing gets
its own run through the tool rather than a shared assumption.

## Reporting the batch

Return the completed log, not just a pass or fail count. State plainly how
many pairings were checked, how many passed the target level, and list every
failing pairing with its actual ratio and its needed fix. If a pairing could
not be checked because a color value or a background surface was never
supplied, list it separately as unchecked rather than assuming it passes.

## What this skill does not do

It does not compute a contrast ratio by estimation, memory, or approximate
formula. Every number in the log traces back to a run of the actual WCAG
2.1 formula through the colour contrast checker tool. It also does not
decide which pairings exist in a design system; it only checks the ones it
is given, and says so explicitly when a pairing list looks incomplete rather
than filling gaps with assumed combinations.
`;

const BATCH_LOG_FORMAT_MD = `# Batch log format and a worked example

Use this alongside \`SKILL.md\`. The log is what makes a color contrast
palette batch check skill repeatable: the same pairing list can be re run
against the tool every time the palette changes, and the log shows exactly
what changed.

## The log format

Record one row per pairing, in this order:

- **Pairing** - where it appears, in plain terms (for example "primary
  button label").
- **Foreground** - the hex value and token name.
- **Background** - the hex value, token name, and the surface it sits on.
- **Ratio** - the exact value read from /tools/colour-contrast-checker, never
  estimated.
- **AA normal / AA large / AAA normal / AAA large** - Pass or Fail, copied
  directly from the tool's four results.
- **Target level** - which threshold this pairing actually needs to clear,
  based on its real text size and weight (AA is the common target; large
  text only needs the relaxed thresholds).
- **Fix needed** - left blank if the pairing passes its target level, or a
  short note (darken text, lighten background, flag for design) if it does
  not.

## Worked example

The six pairings below were run through /tools/colour-contrast-checker one
at a time, using the same WCAG 2.1 formula the tool implements. This is a
sample palette used only to demonstrate the log format, not a set of colors
to copy into a real system.

| Pairing | Foreground | Background | Ratio | AA normal | AA large | AAA normal | AAA large | Fix needed |
|---|---|---|---|---|---|---|---|---|
| Body text (ink-900 on canvas-50) | #111827 | #f9fafb | 16.98:1 | Pass | Pass | Pass | Pass | none |
| Primary button label (white on brand-600) | #ffffff | #4f46e5 | 6.29:1 | Pass | Pass | Fail | Pass | none for AA target |
| Link text (brand-600 on canvas-50) | #4f46e5 | #f9fafb | 6.02:1 | Pass | Pass | Fail | Pass | none for AA target |
| Placeholder text (muted-500 on canvas-50) | #9ca3af | #f9fafb | 2.43:1 | Fail | Fail | Fail | Fail | darken placeholder or lighten background |
| Success badge text (white on success-500) | #ffffff | #22c55e | 2.28:1 | Fail | Fail | Fail | Fail | darken badge background |
| Disabled button label (muted-300 on canvas-100) | #d1d5db | #f3f4f6 | 1.34:1 | Fail | Fail | Fail | Fail | flag for design, disabled state may accept a lower bar but this is far below it |

## Reading the worked example

Four of the six pairings pass AA at normal text size, which is the common
target for a design system that has not committed to AAA everywhere. The
two failures, the placeholder text and the success badge, are exactly the
kind of pairing that a check limited to body copy would miss: neither is
the primary reading text on the page, and both were still failing outright.
The disabled button label fails hardest of all, which is worth a design
decision rather than a silent pass, since disabled contrast still has a
floor even where the bar is sometimes treated as relaxed.

## Re running the batch after a palette change

When a token value changes, only the pairings that use that token need
re checking, not the whole system. Update the foreground or background
column for the affected rows, run each one through the tool again, and
update the ratio and pass or fail columns. Leaving old ratios in place
after a token changes turns the log into a record of a palette that no
longer exists.
`;

const meta: SkillMeta = {
  slug: "color-contrast-palette-batch-check-skill",
  name: "Color Contrast Palette Batch Check",
  title: "Color Contrast Palette Batch Check Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that structures a systematic check of every real text and background color pairing in a design system against WCAG contrast requirements, computing each ratio through the site's own colour contrast checker tool rather than guessing.",

  seo: {
    primaryKeyword: "color contrast palette batch check skill",
    keywords: [
      "color contrast palette batch check skill",
      "free ai skill for color contrast batch checks",
      "downloadable contrast pairing tracking log",
      "ai skill to check every color pairing",
      "color contrast checklist for design systems",
    ],
    seoTitle: "Color Contrast Palette Batch Check Skill: Free AI Download",
    seoDescription:
      "A free color contrast palette batch check skill that structures a WCAG pass across every real color pairing in a design system, using the site's contrast tool.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/batch-log-format.md", content: BATCH_LOG_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a design system's contrast reliably spot check a couple of obvious pairs, usually body text against its main background, and then declare the palette accessible without touching placeholder text, badges, disabled states or hover colors that carry just as much real reading weight. This skill requires every actually stated pairing to be logged and run through the same WCAG formula individually, so a palette cannot pass on the strength of the one pairing that was always going to pass anyway.",
  },

  article: {
    intro: [
      "A color contrast palette batch check skill only earns its name if it checks every pairing a design system actually uses, not the one or two pairings that are easiest to notice. Handed a palette and nothing else, most AI assistants will eyeball the body text against its background, call the ratio fine, and never touch the placeholder text, the disabled button label, or the badge sitting on a saturated fill. This free ai skill for color contrast batch checks is built to close that gap.",
      "It ships as two plain text files: a main instructions file and a batch log format reference the instructions point to, including a worked example of six real pairings logged with their actual computed results. Both are previewable in full on this page before you download the .zip.",
      "The skill does not compute contrast ratios itself. Every number in its log comes from a run through the colour contrast checker tool on this site, which implements the WCAG 2.1 relative luminance formula exactly as published. This skill's job is organizing which pairings exist and tracking what the tool reports for each one.",
    ],
    sections: [
      {
        heading: "Why a palette alone does not tell you which pairings exist",
        body: [
          "A palette is a list of colors a design system defines. It is not a list of where those colors actually get used against each other. A system can define a warning yellow and never place body text on it, or place a muted gray on a background the palette itself would never suggest. Checking colors in the abstract, rather than the real pairings a component renders, produces a report for combinations nobody ships and misses the ones that do.",
          "This is the core discipline behind a color contrast checklist for design systems: work only from pairings that are actually stated, whether that is a token sheet, a component library, or a labelled screenshot. If the full list is not available, the skill says so and asks for it instead of guessing which colors probably sit next to each other.",
        ],
      },
      {
        heading: "How this skill pairs with the colour contrast checker tool",
        body: [
          "This skill and the colour contrast checker at /tools/colour-contrast-checker do two different jobs on purpose. The tool computes: given one foreground hex value and one background hex value, it returns the exact WCAG 2.1 contrast ratio and checks it against AA and AAA for normal and large text.",
          "This skill organizes and tracks: it structures the full list of real pairings a system uses, runs each one through the tool in turn, and keeps a log of every ratio and result so the check can be repeated as the palette evolves. Neither replaces the other.",
        ],
      },
      {
        heading: "The same WCAG 2.1 formula, not a different one",
        body: [
          "This skill does not invent its own contrast math. It points to the colour contrast checker tool because that tool implements the WCAG 2.1 relative luminance formula exactly as published: each sRGB channel is linearised with the standard piecewise gamma curve, combined with the fixed weights 0.2126 red, 0.7152 green and 0.0722 blue, and the resulting luminance values compute a ratio between 1:1 and 21:1.",
          "Averaging RGB channels directly produces a number that looks plausible and is not the contrast ratio, since hex values are gamma encoded rather than linear. Routing every pairing through the same formula, via the same tool, keeps a batch check trustworthy.",
        ],
      },
      {
        heading: "Building the pairing list before checking anything",
        body: [
          "Every pairing needs three things recorded before it is checked: where it appears (body text, primary button label, placeholder text, disabled state, focus ring, badge text), the exact foreground hex value, and the exact background hex value along with the surface it actually sits on. The same token can appear on more than one background across a system, and each is a separate pairing, not a repeat.",
          "Grouping pairings by component keeps a large batch organized. A component using three text colors against the same background is three rows in the log, not one.",
        ],
      },
      {
        heading: "Running and logging the batch, as an ai skill to check every color pairing",
        body: [
          "For each pairing, the skill enters the foreground and background values into the tool, reads the exact ratio and its four pass or fail results, and records all of it in the batch log alongside the pairing's actual text size, since large text only needs the relaxed AA and AAA thresholds. A pairing that fails gets a plain note on what would fix it: darken the text, lighten the background, or flag it for a design decision.",
          "No ratio is ever estimated from a similar pairing checked earlier. Colors close in hex value can differ enough in relative luminance to flip a pass into a fail.",
        ],
      },
      {
        heading: "Keeping the check repeatable as the palette evolves",
        body: [
          "A downloadable contrast pairing tracking log earns its keep the second time a palette changes, not the first. When a token's value changes, only the rows using that token need re checking: update the affected hex values, run each again through the tool, and update the ratio and result columns. Leaving old ratios in place after a token has changed turns the log into a record of a palette that no longer exists.",
        ],
      },
    ],
    howTo: {
      name: "How to use the color contrast palette batch check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/batch-log-format.md directly on this page before downloading, including the worked example of six logged pairings, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real pairings",
          text: "Before using the skill, list every actual text and background color pairing your design system uses, with hex values, rather than relying on the palette alone.",
        },
        {
          name: "Hand the files to your assistant alongside the pairing list",
          text: "Keep the folder structure intact so the main instructions file can point to the log format reference, then supply your pairing list and have each one checked through /tools/colour-contrast-checker in turn.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill calculate the contrast ratio itself?",
        answer:
          "No. It points to the colour contrast checker tool on this site for every ratio, since that tool implements the exact WCAG 2.1 relative luminance formula. The skill's job is organizing which real pairings exist and keeping a structured log of the results, not recomputing the math on its own.",
      },
      {
        question: "What if I only have a palette and not the actual pairings used?",
        answer:
          "The skill says so plainly rather than guessing which colors sit against which. A palette lists colors that exist, not where they are actually placed against each other, so it asks for the real pairing list, such as a token sheet or component library, before checking anything.",
      },
      {
        question: "How is this different from just running the colour contrast checker tool by itself?",
        answer:
          "The tool checks one pairing at a time and reports one ratio. This skill structures the full batch: it lists every real pairing a system uses, tracks what has been checked, and records each result in a log, so a review does not stop at the easiest pairings to notice.",
      },
      {
        question: "What happens when a pairing fails the target contrast level?",
        answer:
          "It is logged with its exact ratio and a plain note on what would fix it, such as darkening the text or lightening the background, or a flag for a design decision when the fix is not obvious. The skill never invents a replacement color that was not requested.",
      },
      {
        question: "Can this skill be re run after a palette changes?",
        answer:
          "Yes, and that is the point of a structured log rather than a one-off report. When a token's value changes, only the pairings that use it need re checking through the tool again, with the ratio and result columns updated, so the log reflects the palette as it currently stands.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and .zip download both happen entirely in your browser, and so does every calculation performed by the colour contrast checker tool this skill points to. No color values you use the skill with are sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "The tool this skill routes every real pairing through to get the exact WCAG 2.1 ratio and pass or fail result.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For turning a checked, passing set of colors into documented, reusable tokens once the batch check is complete.",
      },
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description: "Builds a full set of named color roles, which this skill's batch check then verifies pairing by pairing.",
      },
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description: "Covers the wider accessibility criteria beyond contrast, such as focus order and colour alone conveying meaning.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
        label: "W3C: Understanding WCAG 2.1 Contrast (Minimum)",
        description: "The published success criterion this skill's target thresholds are taken from, the same source the colour contrast checker tool cites.",
      },
      {
        href: "https://webaim.org/articles/contrast/",
        label: "WebAIM: Contrast and Color Accessibility",
        description: "Explains the relative luminance formula and the related WCAG success criteria this skill's log references in plain terms.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast",
        label: "MDN: Color contrast",
        description: "A browser vendor's reference for the same AA and AAA thresholds, with examples of pairings that pass and fail.",
      },
      {
        href: "https://www.a11yproject.com/posts/what-is-color-contrast/",
        label: "The A11Y Project: What is Color Contrast",
        description: "An independent accessibility community resource explaining why individual pairings, not a palette in the abstract, are what actually need checking.",
      },
    ],
  },

  tags: ["design", "accessibility", "color contrast", "wcag", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
