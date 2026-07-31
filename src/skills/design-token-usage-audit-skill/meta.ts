import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Design Token Usage Audit

Use this skill whenever you are handed a real, defined list of design tokens
(color tokens, spacing tokens, radius tokens, or any other category) together
with a real component spec or piece of CSS, and asked to check whether each
declared value in that component actually uses one of the defined tokens or
falls back to a raw hardcoded value instead. This is a design token usage
audit skill: it checks each declared value against the token list actually
supplied, never against a token list assumed from general design system
knowledge.

## Before you check anything

Ask for, or locate, both real inputs this skill needs: the actual token list
(name and value for every token, across whichever categories are defined,
such as color, spacing, radius or font size) and the actual component spec or
CSS you are checking, with its declared values named plainly (which property,
which value). Do not invent a token list from general knowledge of common
design token names. A token named color-primary-500 in one system and
brand-blue-500 in another can point to a similar shade, but only the tokens
this specific team actually defined are valid matches for this check.

If either input is missing or incomplete, the check cannot run for the
missing part, and the skill says so plainly rather than guessing at what the
token list or the component probably contains.

## Recording each declared value

For every declared value in the component spec, record three things before
judging it:

1. **The property and location** - where the value is declared, named
   plainly (background color, border radius, padding, font size).
2. **The exact value used** - the literal value as declared, hex code, pixel
   number, or other unit, copied exactly, not rounded or normalised silently.
3. **Whether it already references a token or is a raw value** - some
   component specs already reference a token by name; others declare a raw
   hex or pixel value directly. Both cases still get checked, since a
   component can reference a token name that does not actually exist in the
   supplied token list.

## Checking each value against the token list

For every declared value, compare it against every token in the supplied
list within its own category (colors against colors, spacing against
spacing, radius against radius, and so on).

If the value matches a token's defined value exactly, state the match
plainly: the exact value used, and the exact token name and value it
matches. Normalise only for case (#2563EB and #2563eb are the same hex
value) and for equivalent units where the audit is explicitly told the base
that makes them equal (16px and 1rem at a stated 16px root size); never treat
two genuinely different values as a match on a hunch.

If the value does not match any token exactly, it is a hardcoded value.
State the exact value used and that it has no matching token in the supplied
list. Then check whether any token in the same category is numerically
close: for colors, a small step in hue and lightness; for spacing, radius
and other numeric tokens, a difference of only a few units. If one token is
genuinely close, name it as the closest token and state the exact numeric
difference, so the drift is visible. If nothing in the supplied list is
genuinely close, say so plainly rather than naming a distant token as though
it were a near miss.

## What counts as close, and what does not

Close means a difference small enough that it reads as probable drift from
an intended token, not coincidence: a spacing or radius value within roughly
two to four units of a defined token, or a hex color within a small step in
the same hue and lightness range. A value that sits about halfway between
two tokens, or nowhere near any token in that category, is not close to
either. The report should say plainly that no token in the supplied list is
a near match, rather than force one into service as the closest.

## Reporting the audit

Work through every declared value in the order it was supplied and report
each one on its own line: the property, the exact value used, and either the
matching token name and value, or "hardcoded, no matching token" with the
closest token and gap named when one genuinely exists. Close with a short
count: how many declared values matched a defined token, and how many were
hardcoded. Do not summarise the finding as an overall grade or score; the
value of the audit is in the line by line trace, not a single number.

## What this skill does not do

It does not invent what the "correct" token should be for a hardcoded value
that has no real match in the supplied list. Naming a closest token when one
is numerically close is descriptive, evidence that a specific existing token
sits nearby, never a rule that the hardcoded value must be replaced with
that token specifically or with any other. That decision belongs to whoever
owns the token list, not to this skill.

It does not invent tokens that were not supplied, and it does not check a
token list or a component spec that was not actually given to it. If only
one of the two real inputs exists, the audit says so and stops rather than
guessing at the other.
`;

const REFERENCE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It shows the full audit process on a
concrete, real token list and a real component spec, checking each declared
value in turn.

## The token list

A team supplies this list directly, naming it as their own defined design
tokens, spanning three categories:

color-primary-500: #2563eb
color-neutral-900: #111827
spacing-400: 16px
spacing-600: 24px
radius-200: 8px
radius-400: 16px

Six tokens across color, spacing and radius. This is confirmed as the
team's own defined values, so it is used at full confidence in the audit
below.

## The component spec to audit

An "Alert Banner" component ships with these four declared values:

1. background-color: #2563eb
2. padding: 16px
3. border-radius: 6px
4. color: #334155

## Checking each declared value

Value 1, background-color #2563eb: matches color-primary-500 (#2563eb)
exactly. Uses a defined token.

Value 2, padding 16px: matches spacing-400 (16px) exactly. Uses a defined
token.

Value 3, border-radius 6px: does not match any radius token exactly.
Hardcoded, no matching token. The closest radius token is radius-200 (8px),
two pixels away. Flagged as hardcoded with visible drift from radius-200.

Value 4, color #334155: does not match any color token exactly. Hardcoded,
no matching token. The nearest color token in the list is color-neutral-900
(#111827), but #334155 sits far enough from it in lightness, a noticeably
lighter, more blue grey value against a near black neutral, that it does not
read as a near miss. Reported as hardcoded with no genuinely close token in
the supplied list, rather than naming color-neutral-900 as a close match it
is not.

## Reporting the audit

Two of four declared values use a defined token exactly: the background
color and the padding. Two are hardcoded with no matching token: the border
radius and the text color. Of those two hardcoded values, the border radius
has a genuinely close token named with its exact numeric gap; the text color
has no close token in the supplied list at all, and the report says so
rather than forcing a false near match. Whoever owns the token list decides
whether radius-200 replaces the hardcoded 6px value, whether a new radius
token gets added, or whether the drift is intentional; the audit states the
facts and stops there.

## Why the audit does not name a closest token for every hardcoded value

It would be tempting to always name some token as the closest one, since a
token list rarely sits perfectly far from every possible value. The color
value in this example shows why that instinct gets resisted: color-neutral-
900 is the only other color token besides the exact match, but it describes
a near black neutral, not a mid tone blue grey, so naming it as the closest
token to #334155 would manufacture a false sense of a near miss. The audit
only names a closest token when the numeric or perceptual gap is genuinely
small, and says plainly when nothing in the supplied list qualifies.
`;

const meta: SkillMeta = {
  slug: "design-token-usage-audit-skill",
  name: "Design Token Usage Audit Check",
  title: "Design Token Usage Audit Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks whether a component's declared values use a team's own real defined design tokens, or fall back to hardcoded values, naming the closest token only when the drift is genuinely small.",

  seo: {
    primaryKeyword: "design token usage audit skill",
    keywords: [
      "design token usage audit skill",
      "free ai skill for design token audits",
      "downloadable design token audit checklist",
      "ai skill to check hardcoded values against tokens",
      "design token drift checklist for components",
    ],
    seoTitle: "Design Token Usage Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable design token usage audit skill that checks a component's declared values against your team's own real defined design tokens.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: REFERENCE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to audit a component against a design token list, models reliably confirm the values that already reference a token by name and skim past the raw hex codes and pixel numbers sitting right beside them, treating a value that merely looks plausible as though it were backed by a real token. The same models will also, when a hardcoded value has no genuine match, invent a plausible sounding token name rather than reporting the absence honestly. This skill's process forces every declared value to be checked individually against the actual supplied list, and forbids naming a closest token unless the numeric gap is genuinely small.",
  },

  article: {
    intro: [
      "A design token usage audit skill only earns that name if it checks every declared value in a component against the tokens a team actually defined, not against a token list assumed from general design system habits. Handed a component with a background color, a border radius and a text color, most AI assistants will glance at the values, decide they look like the sort of numbers a design system would use, and move on without ever comparing them against a real token list. This skill refuses that shortcut, and reports each declared value as either a match to a specific defined token or a hardcoded value with no match, naming the closest token only when one is genuinely close.",
      "It ships as two plain text files: a main instructions file and a worked reference example it points to, both previewable in full before you download the .zip. Nothing in the archive differs from what is shown in the preview below.",
      "The core discipline is easy for a model to skip without a checklist forcing it: check every value individually against a real supplied token list, and never invent what the correct token should be when no real match exists.",
    ],
    sections: [
      {
        heading: "Why every declared value needs its own check",
        body: [
          "A component spec rarely fails a token audit all at once. More often, three of four declared values already reference real tokens correctly, and the fourth is a raw hex code pasted in during a rushed fix, sitting quietly beside values that look identical in format. A review that treats the whole component as fine because most of it looks fine misses exactly the value the audit exists to catch.",
          "This skill's first instruction is to record every declared value separately, with its property, its exact value, and whether it already references a token name, before judging any of them. A free ai skill for design token audits earns that description by refusing to let a majority of correct values excuse the one that is not.",
        ],
      },
      {
        heading: "Matching a declared value against a real token, not a plausible one",
        body: [
          "Once every value is recorded, each one is compared against the supplied token list within its own category: colors against color tokens, spacing against spacing tokens, radius against radius tokens. A match is only reported when the value equals a defined token's value exactly, allowing only for case differences in a hex code or a stated unit equivalence, never a value that merely resembles a token in shape.",
          "This is what makes it a downloadable design token audit checklist rather than a general design opinion. A background color of #2563eb either equals a defined color-primary-500 token or it does not; there is no partial credit for looking like a plausible blue.",
        ],
      },
      {
        heading: "Reporting a hardcoded value honestly, as an ai skill to check hardcoded values against tokens",
        body: [
          "When a declared value does not match any token exactly, the audit states plainly that it is hardcoded with no matching token, and quotes the exact value used. It then checks, within that same category, whether any token is close enough to read as probable drift, such as a border radius two pixels off a defined step, and names that token with the exact gap when it genuinely exists.",
          "When nothing in the list is genuinely close, the audit says so instead of naming a distant token as though it were a near miss. Forcing a false closest match would turn an honest gap into a misleading suggestion.",
        ],
      },
      {
        heading: "Why the skill never invents the correct token",
        body: [
          "Naming a closest token is a statement of fact, never a recommendation that the hardcoded value must be replaced with it. This skill's instructions forbid deciding what the correct token should have been, since that depends on context the audit was never given, such as whether the drift was intentional or a new token is genuinely needed.",
          "A design token drift checklist for components stays useful precisely because it separates two jobs: naming what is verifiably close, and deciding what should change. The second job belongs to whoever owns the token list.",
        ],
      },
      {
        heading: "How this differs from the spacing scale consistency skill",
        body: [
          "Both skills share a discipline: judge a real value against evidence a team actually supplied, never a generic assumption. Past that they check different things. The spacing scale consistency skill takes one category, spacing and sizing, and asks whether a proposed numeric value fits a mathematical scale or rhythm, whether declared as named steps or derived from real measured examples, even when no named token exists at all.",
          "This skill starts from a named token list across any category, color, spacing, radius or otherwise, and asks a narrower question about a value already declared in a real component: does it match a defined token exactly, or is it hardcoded with no token backing it. A value can pass the spacing skill's rhythm check by landing on a clean step and still fail this audit if no token was ever named for that step, and the two checks are meant to be used together, not treated as duplicates.",
        ],
      },
      {
        heading: "Using the downloaded files as an audit process",
        body: [
          "Hand both files to an assistant together, since the instructions point to the worked example by its exact relative path. Supplying your own real token list and component spec, rather than the sample values in the reference file, turns the process into an audit of your own design system.",
        ],
      },
    ],
    howTo: {
      name: "How to use the design token usage audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather your real token list and component spec",
          text: "Before using the skill, collect your actual defined tokens with their exact values, and the actual declared values from the component or CSS you want checked.",
        },
        {
          name: "Hand both files, your tokens, and your component to your assistant",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your real token list and the component spec you want audited.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have a component spec but no token list?",
        answer:
          "The design token usage audit skill says so explicitly rather than guessing at a token list from general knowledge. Without a real supplied list, there is nothing verifiable to check values against, so it asks for the actual tokens before checking anything.",
      },
      {
        question: "Does the skill ever suggest which token a hardcoded value should use?",
        answer:
          "It names a closest token only when one is genuinely numerically close, stated with the exact gap. It does not decide the hardcoded value must be replaced with that token or any other, since that depends on context the audit was never given and belongs to whoever owns the token list.",
      },
      {
        question: "How is this different from the spacing scale consistency skill?",
        answer:
          "The spacing scale consistency skill checks whether a proposed spacing value fits a mathematical scale, whether declared as named steps or derived from real examples. This skill checks a component's declared values across any token category against a named token list, asking whether each matches a real token exactly or is hardcoded with no token behind it.",
      },
      {
        question: "Can this skill check more than color tokens?",
        answer:
          "Yes. It works the same way across any token category actually defined, including spacing, radius or font size, as long as a real token list with names and values is supplied for that category.",
      },
      {
        question: "What if a value is close to a token but not exact?",
        answer:
          "It is still reported as hardcoded, since it does not match the token's value exactly. The audit names the closest token and the exact numeric difference so the drift is visible, rather than rounding the value into a silent pass.",
      },
      {
        question: "Does my token list or component spec get sent anywhere when I use this skill?",
        answer:
          "No. Previewing the files and building the .zip both happen entirely in your browser, with no request going out to a server, so your team's real tokens and component values stay exactly where you typed them.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/design-skills/spacing-scale-consistency-skill",
        label: "spacing scale consistency skill",
        description: "Checks whether spacing and sizing values fit a mathematical scale, a narrower numeric rhythm check than this skill's broader token matching audit.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For defining or consolidating a named token set in the first place, before this skill audits real components against it.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description: "A natural next step once a component's declared values have been audited, for specifying states and behaviour with the correct tokens named.",
      },
      {
        href: "/tools/hex-rgb-hsl-converter",
        label: "hex RGB HSL converter",
        description: "Useful for converting a hardcoded color value into the same format as a defined color token before comparing them exactly.",
      },
    ],
    externalLinks: [
      {
        href: "https://spectrum.adobe.com/page/design-tokens/",
        label: "Adobe Spectrum: Design tokens",
        description: "A real, published design system explaining how its own named tokens map to concrete values, the kind of source this skill requires as input.",
      },
      {
        href: "https://m3.material.io/foundations/design-tokens/overview",
        label: "Material Design 3: Design tokens overview",
        description: "Another real system's documented token structure, useful context for how a defined token list is meant to be declared and referenced.",
      },
      {
        href: "https://amzn.github.io/style-dictionary/",
        label: "Style Dictionary documentation",
        description: "A widely used real tool for maintaining a single source of token values across platforms, the kind of source a real token list often comes from.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties",
        label: "MDN: Using CSS custom properties",
        description: "Independent reference on how tokens frequently ship as CSS variables in a real component, relevant to reading declared values correctly.",
      },
    ],
  },

  tags: ["design", "design systems", "design tokens", "css", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
