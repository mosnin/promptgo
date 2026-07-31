import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Spacing Scale Consistency Check

Use this skill whenever someone proposes a new spacing or sizing value (a
margin, a padding, a gap, a component width or height) and wants to know
whether it fits the team's existing spacing scale. This is a spacing scale
consistency skill: it checks a single proposed numeric value against a scale
derived from values the team has actually declared or already shipped, never
against a generic spacing scale pulled from general design system knowledge.

## Before you check anything

Ask for, or locate, the team's real declared spacing scale: the actual list
of allowed spacing and sizing values in use today, ideally as a named token
set (for example space-100, space-200) or a plain list of pixel values. Do
not invent a scale from general knowledge of design systems (a standard 4px
grid, an assumed 8px base, a generic doubling pattern). A scale only counts
if it is the one this specific team actually declared or can be shown to
already use, because two teams can both call their system a spacing scale
and land on completely different base units, one built on 5px, another on
6px, another on 8px.

If no explicit scale is stated, look for real supplied component specs
(measured margins, paddings and gaps from actual shipped components) and
derive the scale from those, being explicit in your output that the scale
was derived rather than given directly. If fewer than about six real values
are supplied, either as an explicit scale or as specs to derive one from,
say so plainly and treat any derived scale as provisional.

## Deriving the scale when none is stated explicitly

List every real value supplied, in pixels, and sort it ascending. Look for
the smallest common difference or ratio that explains most of the values,
and state that base unit as the candidate scale, citing the specific values
that support it. Do not average outliers away silently: a value that does
not fit the pattern gets noted as an exception, not folded quietly into the
stated base as if the base explained every value.

State plainly whether the scale you are using came directly from a named
token set the team gave you, or was derived from a smaller set of real
examples. These are different levels of confidence, and the output must
never blur them into one flat claim.

## Checking a proposed value against the scale

For every proposed spacing or sizing value, compare it against the declared
or derived scale. If it lands exactly on a step of that scale, say which
step it matches and treat it as passing. If it falls between two steps, or
off the scale entirely, flag it, name the two nearest scale steps it falls
between, and state the gap in pixels each way, so the person reviewing sees
exactly how far off the value is rather than a bare pass or fail.

Never approve a proposed value because it looks like a generic reasonable
looking spacing number. It only passes because it matches the team's own
real declared or derived scale, and it should be flagged even when it would
fit neatly into some other, different team's scale.

## When a proposed value is close but not exact

A proposed value one or two pixels off a scale step is still off-scale and
must be reported as such, not rounded silently to the nearest step and
passed. State the exact proposed value, the nearest step, and the difference
each way, then let the person who asked decide whether to round it or add a
genuinely new step to the scale. Deciding for them silently removes a
decision that is theirs to make, not the skill's.

## What this skill does not do

It does not invent a generic industry spacing scale as a fallback when no
real scale or real values have been supplied. If neither exists, the check
cannot run, and the skill says so and asks for the scale or a batch of real
values instead of guessing.

It does not assume a standard 4px or 8px grid just because that base is
common across the training knowledge a model draws on. Common is not the
same as this team's actual choice, and treating a common base as a default
produces confidently wrong flags whenever the real scale differs.
`;

const REFERENCE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It shows the full process on a concrete,
explicitly stated spacing scale, checking a batch of proposed values against
it with specific, named flags.

## The stated scale

A team supplies this scale directly, naming it as their own declared
standard, not something derived from examples:

space-100: 4px
space-200: 8px
space-300: 16px
space-400: 24px
space-500: 32px
space-600: 48px
space-700: 64px

This is confirmed as an explicit, named scale, so it is used at full
confidence in the checks below. The base unit is 8px between most steps,
except the first step (4px), which is called out explicitly rather than
assumed to fit a clean doubling pattern that happens to also explain it.

## Batch of proposed values to check

Six proposed values arrive for review, all margins, gaps and padding
proposed for a new card component:

1. 8px gap between the card icon and its title
2. 18px margin around the card's outer edge
3. 24px gap between stacked cards
4. 10px padding inside a tag chip
5. 40px margin above a section header
6. 4px gap between a label and its helper text

## Checking each value against the scale

Value 1, 8px gap: matches space-200 exactly. Passes.

Value 2, 18px margin: does not land on any step. The nearest steps are
space-300 (16px) and space-400 (24px), two pixels above the lower step and
six pixels below the higher step. Flagged as off-scale, closer to space-300.

Value 3, 24px gap: matches space-400 exactly. Passes.

Value 4, 10px padding: does not land on any step. The nearest steps are
space-200 (8px) and space-300 (16px), two pixels above the lower step and
six pixels below the higher step. Flagged as off-scale, closer to space-200.

Value 5, 40px margin: does not land on any step. The nearest steps are
space-500 (32px) and space-600 (48px), eight pixels above the lower step
and eight pixels below the higher step, exactly between the two. Flagged as
off-scale with no closer neighbor either way.

Value 6, 4px gap: matches space-100 exactly. Passes.

## Reporting the batch

Three of six proposed values pass (8px, 24px, 4px). Three are flagged as
off-scale (18px, 10px, 40px), each with its two nearest steps and the exact
gap in pixels named, so whoever proposed them can either round to the
nearest existing step or make the case for a genuinely new one. The report
does not silently round any of the three flagged values on its own.

## Why the 4px first step does not imply a 4px base

It would be easy to look at space-100 (4px) and space-200 (8px) and assume
the whole scale runs on a 4px base, since 4 divides evenly into every later
step too. That assumption happens to fit this particular scale, but it is
not treated as proven from two values alone. This example scale was given
directly as seven named, stated steps, so no derivation or base-unit guess
was needed at all, and the review above traces every verdict back to those
seven stated values rather than to an inferred base someone assumed first.
`;

const meta: SkillMeta = {
  slug: "spacing-scale-consistency-skill",
  name: "Spacing Scale Consistency Check",
  title: "Spacing Scale Consistency Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks proposed spacing and sizing values against a design system's own real declared scale, and refuses to assume a generic 4px or 8px grid when no real scale is supplied.",

  seo: {
    primaryKeyword: "spacing scale consistency skill",
    keywords: [
      "spacing scale consistency skill",
      "free ai skill for spacing consistency",
      "downloadable spacing scale checklist",
      "ai skill to check spacing values",
      "design system spacing scale guide",
    ],
    seoTitle: "Spacing Scale Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable spacing scale consistency skill that checks proposed spacing and sizing values against your team's own real declared scale.",
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
      "Asked to check a proposed spacing or sizing value, models default to measuring it against a generic assumed spacing scale pulled from training knowledge, typically a standard 4px or 8px grid, rather than the team's own actual declared scale, which frequently uses a different base entirely. This produces confident, specific-sounding flags that describe no real design system's actual rule, and the failure persists even when a real scale was supplied, since a model will sometimes revert to the familiar generic grid instead of the stated one. This skill's process forces every flag to trace to a specific declared or transparently derived step, and requires the source of that scale to be stated plainly.",
  },

  article: {
    intro: [
      "A spacing scale consistency skill only earns that name if it checks a proposed value against a scale that is actually real, not one assumed from general design system habits. Handed a proposed 18px margin and nothing else, most AI assistants will silently measure it against whatever spacing scale they associate with design systems in general, a 4px grid, an 8px grid, a generic doubling pattern, regardless of whether that team's own tokens use it at all. This skill refuses that shortcut, and flags a proposed spacing or sizing value only against the scale this specific team has actually declared or can be shown to already use.",
      "It ships as two plain text files: a main instructions file and a worked reference example the instructions point to, both previewable in full on this page before you download the .zip. Nothing in the archive differs from what is shown in the preview below.",
      "The core discipline is simple to state and easy for a model to skip without a checklist forcing it: require the real scale as input, or derive one transparently from real examples, and never fall back on a generic assumed grid just because it is common.",
    ],
    sections: [
      {
        heading: "Why the scale must be real, not assumed",
        body: [
          "Two design systems can both describe themselves as having a spacing scale and still run on completely different base units. One team builds every step from a 5px base, another from 6px, another from the more familiar 8px, and a model that defaults to the familiar option whenever no real scale is supplied will confidently flag values that are actually correct for that team's own unusual, real scale. That is why this skill's first instruction is to locate or ask for the team's real declared scale before judging a single proposed value.",
          "When no real scale or real values exist to derive one from, the skill does not proceed as though a scale had been established. It says so plainly, which is the difference between a free ai skill for spacing consistency worth trusting and a checker that just sounds confident regardless of what it was actually given.",
        ],
      },
      {
        heading: "How the skill derives a scale when none is stated explicitly",
        body: [
          "When a team has no named token list but can supply real measured values from shipped components, the skill lists every value, sorts it ascending, and looks for the smallest common difference that explains most of them, citing the specific values that support it. A value that does not fit is noted as an exception rather than smoothed away, and the output states plainly that this scale was derived rather than handed over as an existing standard.",
          "A downloadable spacing scale checklist is only as trustworthy as the real scale it checks against, so this distinction is not cosmetic. A scale derived from six or eight examples deserves less confidence than one a team names directly.",
        ],
      },
      {
        heading: "Checking a proposed value against the scale, not a vibe",
        body: [
          "This is what makes it an ai skill to check spacing values rather than a generic reviewer offering opinions about whether a number looks reasonable. Given a proposed margin, padding or gap, the skill compares it against the declared or derived scale and reports a plain match when it lands exactly on a step.",
          "When it does not land on a step, the flag names the two nearest steps and states the gap in pixels on each side, so the reviewer sees exactly how far off the value is rather than a bare pass or fail.",
        ],
      },
      {
        heading: "Why a near miss still gets flagged, not rounded",
        body: [
          "A proposed value that lands one or two pixels from a real step is still off-scale, and the skill's instructions explicitly forbid rounding it silently to the nearest step and passing it. The exact proposed value, the nearest step, and the difference each way are stated instead, leaving the decision to round or add a new step with the person who asked, since that decision has consequences the skill is not positioned to make for them.",
        ],
      },
      {
        heading: "How this differs from the component naming consistency skill",
        body: [
          "Both skills share one mechanism: derive a real pattern from what the team has actually shipped or declared, then judge a new proposal against that pattern rather than a generic industry assumption. Past that shared mechanism they check entirely different things. The component naming consistency skill judges a string, a proposed component name, against a structural pattern of case, prefix and word order pulled from existing names.",
          "This skill judges a number, a proposed spacing or sizing value, against a numeric scale of declared or derived pixel steps. A naming skill that assumes a generic convention produces a mismatched name, while a spacing skill that assumes a generic grid produces a specific, wrong number of pixels stated with false confidence.",
        ],
      },
      {
        heading: "Using the downloaded files as a design system spacing scale guide",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file points to the worked example by its exact relative path. Supplying your own team's real scale or real component values alongside the proposed values you want checked turns the process into a review of your own design system rather than a demonstration of the sample scale in the reference file.",
        ],
      },
    ],
    howTo: {
      name: "How to use the spacing scale consistency skill",
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
          name: "Gather your real spacing scale or component values",
          text: "Before using the skill, collect your named token list if one exists, or a batch of real measured margins, paddings and gaps from components you have already shipped.",
        },
        {
          name: "Hand both files, your scale, and proposed values to your assistant",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your real scale and the new spacing or sizing values you want checked.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if my team doesn't have a documented spacing scale?",
        answer:
          "The spacing scale consistency skill says so explicitly rather than assuming a generic grid. If you can supply real measured values from components already shipped, it derives a candidate scale from those and states plainly that the scale was derived, treating it as provisional until more values arrive.",
      },
      {
        question: "Does the skill assume every design system runs on a standard 8px grid?",
        answer:
          "No, and its instructions explicitly forbid that assumption. Many real design systems use a different base entirely, such as 5px or 6px, and defaulting to a familiar 8px grid would produce confidently wrong flags, so the skill asks for the real scale instead of guessing at a common one.",
      },
      {
        question: "How is this different from the component naming consistency skill?",
        answer:
          "Both refuse to substitute a generic industry assumption for a team's own real pattern, but they check different things. The naming skill judges a proposed name's string structure against existing names, while this skill judges a proposed numeric spacing value against a declared or derived pixel scale.",
      },
      {
        question: "Can this skill check sizing values like widths and heights, not just spacing?",
        answer:
          "Yes. The same scale that governs margins, padding and gaps typically governs component widths, heights and icon sizes too, so the skill checks any proposed numeric value of that kind against the same declared or derived scale, flagging it the same way a spacing value would be flagged.",
      },
      {
        question: "Does my design system data get sent anywhere when I use this skill?",
        answer:
          "No. Previewing the files and building the .zip both happen in your browser, with no request going out to a server, so your team's real scale, component values and proposed values stay exactly where you typed them and are never transmitted anywhere by this site.",
      },
      {
        question: "Can I edit the files after downloading them?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor once downloaded. This page is a read only preview of the exact content that ships in the archive, so editing happens afterward in your own editor rather than through this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/design-skills/component-naming-consistency-skill",
        label: "component naming consistency skill",
        description: "The same real-evidence discipline applied to component name strings instead of numeric spacing and sizing values.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For defining or consolidating a stepped token scale across an entire component inventory, rather than checking one proposed value against an existing scale.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description: "A natural next step once a spacing value passes this skill's check, for specifying the component's states and reflow behaviour.",
      },
      {
        href: "/design-prompts/design-critique-prompt",
        label: "design critique prompt",
        description: "For reviewing overall visual hierarchy once individual spacing values have already been checked against the team's real scale.",
      },
    ],
    externalLinks: [
      {
        href: "https://atlassian.design/foundations/spacing",
        label: "Atlassian Design: Spacing",
        description: "A real, published design system spacing scale with a stated base unit, an example of the kind of source this skill requires as input.",
      },
      {
        href: "https://polaris-react.shopify.com/tokens/space",
        label: "Shopify Polaris: Space tokens",
        description: "Another real design system's own declared spacing token scale, showing a different concrete base and step pattern than Atlassian's.",
      },
      {
        href: "https://developer.apple.com/design/human-interface-guidelines/layout",
        label: "Apple Human Interface Guidelines: Layout",
        description: "Independent guidance on spacing and margins in interface layout, useful context though never a substitute for a team's own declared scale.",
      },
      {
        href: "https://design-tokens.github.io/community-group/format/",
        label: "W3C Design Tokens Community Group: Format specification",
        description: "The emerging cross-tool standard for declaring dimension and spacing tokens explicitly, the same kind of real, named source this skill checks proposed values against.",
      },
    ],
  },

  tags: ["design", "design systems", "spacing", "design tokens", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
