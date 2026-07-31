import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Icon Consistency Audit Check

Use this skill whenever someone proposes a new icon and wants to know whether
it fits the team's existing icon set. This is an icon consistency audit
skill: it checks a single proposed icon against a stroke width, corner style,
grid size and fill treatment derived from icons the team has actually already
shipped, never against a generic icon style pulled from general design
knowledge.

## Before you check anything

Ask for, or locate, real descriptions of the team's existing icons: at least
grid or canvas size, stroke width (or note that shapes are filled with no
stroke at all), corner and terminal style, and whether the set is outline or
filled. Do not invent a style from general knowledge of icon libraries (an
assumed 24px grid, an assumed 2px stroke, an assumed outline treatment). A
convention only counts if it is the one this specific team's real icons
actually show, because two icon sets can both call themselves a consistent
system and land on completely different grids, one built on 24px, another on
20px, one outline, another filled.

If fewer than about four or five real icons are described, say so plainly and
treat any convention drawn from them as provisional rather than settled.

## Deriving the convention from the real set

For every existing icon supplied, note its stated grid or canvas size, stroke
width, corner radius or corner style, terminal or cap style if given, and
whether it is outline or filled. Group icons that share the same values.
State the convention as a rule only once a clear majority of the supplied
icons actually support it, and cite the specific icons that support it by
name, not by a vague description. "Most icons use a 2px stroke on a 24px
grid, for example search and filter" is a checkable claim. "The icons look
fairly consistent" is not.

Do not smooth an outlier into the stated rule. An icon that does not fit the
majority group gets noted as an exception, not folded quietly into the
convention as if it always applied.

## Checking a proposed icon against the convention

Compare the proposed icon's description against the derived convention one
dimension at a time: grid size, stroke width, corner style, and fill versus
outline. For each dimension, state a plain match or a specific mismatch, for
example "existing icons use a 2px stroke, this one appears to use 1.5px" or
"existing icons are outline style, this one is filled." Name the existing
icon or icons the proposed one should resemble.

Never approve a proposed icon because it looks like a generally reasonable
icon. It only passes because it matches this specific team's own derived
convention, and it should be flagged even when it would fit neatly into some
other team's icon set.

## When the description isn't detailed enough

If the description of the existing icons, or of the proposed new icon, does
not give enough technical detail to make a specific judgment on a given
dimension (no stated stroke width, no grid size, a vague description like
"clean lines"), say so explicitly and ask for the missing detail rather than
estimating a plausible-sounding number. Guessing a stroke width from a
verbal impression produces a confident, specific-sounding flag that may
describe nothing real about either icon.

State clearly which dimensions could be judged from what was supplied and
which could not, rather than presenting a full four-dimension verdict when
only two of the four were actually checkable.

## What this skill does not do

It does not invent a generic industry icon convention as a fallback when no
real icons or real descriptions have been supplied. If neither exists, the
check cannot run, and the skill says so and asks for the existing set
instead of guessing.

It does not judge aesthetic quality, cleverness of metaphor, or whether an
icon is a good visual choice for its concept. It checks fit to a derived,
measurable convention only: grid, stroke, corners and fill treatment.
`;

const REFERENCE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It shows the full process on a concrete,
described existing icon set, checking one new proposed icon against it with
specific, named flags, plus a short example of asking for more detail when a
description is too vague to judge.

## The described existing set

A team supplies descriptions of eight shipped icons: search, filter, sort,
export, share, archive, settings and calendar. All eight are described the
same way: drawn on a 24px canvas with a 20px live area, built with a 2px
stroke, round line caps and round joins, no fill, and any square-based shape
using a 2px outer corner radius. The description states these values
directly for each icon, not as a general summary, so this counts as a real,
specific set to derive a convention from.

## Deriving the convention

All eight icons agree on every dimension: 24px grid, 2px stroke, round caps
and joins, outline only with no fill, and a 2px corner radius on square
shapes. Because all eight, not just a majority, support the same values on
every dimension, this convention is stated at full confidence, citing search,
filter and export as the three checked most closely for corner radius.

## Checking a proposed icon: a new "notification bell" icon

The proposed icon is described as follows: drawn on what appears to be a
24px canvas, but the bell shape and its clapper are solid filled shapes with
no visible stroke, the corners of the bell's base are sharp rather than
rounded, and the small notification dot in the corner is a filled circle.

Checked dimension by dimension against the derived convention:

Grid size: matches. The description states a 24px canvas, consistent with
search, filter and the other seven existing icons.

Stroke width: mismatch. The existing set is built entirely from 2px strokes
with no filled shapes. The proposed bell uses solid fill with no stroke at
all, which is a fill versus outline mismatch, not a narrower stroke value.

Fill versus outline: mismatch, restated specifically. Every one of the eight
existing icons is outline only. The proposed bell is filled throughout,
which is the single largest deviation from the convention.

Corner style: mismatch. The existing set uses a 2px corner radius on every
square-based shape, for example the corners of the archive box icon. The
proposed bell's sharp corners do not match that radius.

## Reporting the result

Three of four checked dimensions fail: fill treatment, stroke handling and
corner style. Only the grid size passes. The proposed bell should be redrawn
as an outline shape with a 2px stroke, round caps and joins matching the
other eight icons, and a 2px corner radius applied to its base, before it
can be considered consistent with this team's real, existing icon set.

## A second example: a description too vague to judge

A different request describes the existing icons only as "modern, clean,
minimal line icons" with no stated grid, stroke width or corner treatment,
and describes the proposed new icon only as "a simple thin-line icon that
matches the style." Neither description gives a number for grid size, stroke
width or corner radius on either side.

Rather than guessing that "thin-line" probably means a 1px or 1.5px stroke
on a probably-24px grid, the correct response states plainly that no
dimension can be checked from the detail given, and asks for the actual
pixel values, or a rendered export of a few existing icons at their true
size, before any specific match or mismatch can be reported.
`;

const meta: SkillMeta = {
  slug: "icon-consistency-audit-skill",
  name: "Icon Consistency Audit Check",
  title: "Icon Consistency Audit Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks a proposed icon against the stroke width, corner style, grid size and fill treatment a team's own real existing icon set actually shows, and asks for detail rather than guessing when a description is too vague to judge.",

  seo: {
    primaryKeyword: "icon consistency audit skill",
    keywords: [
      "icon consistency audit skill",
      "free ai skill for icon consistency",
      "downloadable icon audit checklist",
      "ai skill to check icon style",
      "design system icon style guide",
    ],
    seoTitle: "Icon Consistency Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable icon consistency audit skill that checks a proposed icon against your team's own real stroke width, grid size and fill style.",
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
      "Asked to judge whether a new icon fits an existing set, models default to measuring it against a generic assumed icon style pulled from training knowledge, typically a 24px grid with a 2px outline stroke, rather than the team's own actual, possibly different, real style, which might be filled, might sit on a 20px grid, or might use sharp rather than rounded corners. This produces a confident, specific-sounding flag that describes no real icon set's actual convention, and the failure persists even when real icons were described, since a model will sometimes revert to the familiar generic style rather than the stated one. This skill's process forces every flag to trace to a specific described icon, and requires the skill to ask for missing detail rather than estimate a plausible-sounding number.",
  },

  article: {
    intro: [
      "An icon consistency audit skill only earns that name if the convention it checks against comes from icons a team has actually shipped, not a stroke width and grid size assumed from general design knowledge. Handed one new icon and nothing else, most AI assistants will confidently judge it against whatever icon style they associate with icon sets in general: a 24px grid, a 2px outline stroke, rounded corners, regardless of whether this specific team's real icons use any of it. This skill refuses that shortcut, checking a proposed icon only against the grid size, stroke width, corner style and fill treatment its real existing set actually demonstrates.",
      "It ships as two plain text files, previewable in full on this page before you download the .zip, and works as a design system icon style guide only when real icons are actually supplied to derive one from. The core discipline: derive the convention from real, specific existing icons, and say so plainly, asking for more detail, whenever a description is too vague to support a specific technical judgment on a given dimension.",
    ],
    sections: [
      {
        heading: "Why icon style can't be assumed from general design knowledge",
        body: [
          "Two icon sets can both describe themselves as consistent and still run on completely different foundations: one on a 24px grid with a 2px outline stroke, another on a 20px grid with filled shapes and no stroke at all. A model that defaults to the familiar option whenever no real set is supplied will confidently flag icons that are correct for that team's own, different style. That is why this skill's first instruction is to locate real descriptions of existing icons before judging a proposed one.",
          "When no real icons exist, the skill does not proceed as though a style had been established. It says so plainly, which is the difference between a free ai skill for icon consistency worth trusting and a checker that just sounds confident.",
        ],
      },
      {
        heading: "How the convention gets derived from the real set",
        body: [
          "For every existing icon supplied, the skill notes its stated grid size, stroke width, corner and terminal style, and whether it is outline or filled, then groups icons that share the same values. A rule is stated as the team's convention only once a clear majority actually support it, citing the specific icons by name rather than asserting the set 'looks consistent.'",
          "A downloadable icon audit checklist is only as trustworthy as the evidence it points back to, so an icon that does not fit the majority is noted as an exception, not smoothed quietly into the stated rule.",
        ],
      },
      {
        heading: "Checking a proposed icon dimension by dimension",
        body: [
          "This is what makes it an ai skill to check icon style rather than a generic reviewer offering an opinion about whether an icon looks right. It compares a proposed icon against the derived convention across grid size, stroke width, corner style and fill treatment separately, one dimension at a time, not one bundled verdict.",
          "A mismatch is named specifically, for example that the existing set uses a 2px stroke while the proposed icon appears to use 1.5px, or that the existing set is outline while the proposed icon is filled, naming the icon the new one should resemble instead.",
        ],
      },
      {
        heading: "Being honest when the description isn't detailed enough",
        body: [
          "A description like 'clean, modern line icons' gives no checkable number for grid size, stroke width or corner radius. Rather than estimating a plausible stroke value from that kind of verbal impression, the skill states which dimensions cannot be judged from the detail supplied and asks for the missing specifics, such as a pixel value or a rendered export at true size.",
          "This applies on both sides: a vague existing set makes deriving any convention unreliable, and a vague proposed icon makes checking it just as unreliable, even when the existing set is described precisely.",
        ],
      },
      {
        heading: "A worked example: an existing set and a new icon checked against it",
        body: [
          "The bundled reference file walks through eight described existing icons that agree on every dimension (24px grid, 2px stroke, round caps and joins, outline only, 2px corner radius), then checks a new notification bell icon against that convention. The bell is filled rather than outlined with sharp rather than rounded corners, and three of four dimensions get flagged as mismatches, with grid size the one that passes.",
          "A second, shorter example shows the opposite case: a description too vague on both sides to support any dimension check, and the honest response of asking for real detail rather than guessing at numbers never actually given.",
        ],
      },
      {
        heading: "How this differs from the spacing scale and component naming consistency skills",
        body: [
          "All three design skills in this family share one mechanism: derive a real pattern from what the team has actually shipped, then judge a new proposal against that pattern rather than a generic industry assumption. Past that shared mechanism, each checks something different. The spacing scale consistency skill judges a single number, a proposed margin or gap, against derived pixel steps, and the component naming consistency skill judges a string, a proposed name, against case, prefix and word order.",
          "This skill judges a small visual object with several independent dimensions at once: grid size, stroke width, corner style and fill treatment, so a proposed icon can match on some and fail on others in the same check, which a single spacing value or name string cannot do.",
        ],
      },
    ],
    howTo: {
      name: "How to use the icon consistency audit skill",
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
          name: "Gather real descriptions of your existing icons",
          text: "Before using the skill, collect grid size, stroke width, corner style and fill treatment for at least four or five icons your team has actually shipped.",
        },
        {
          name: "Hand both files, your existing icons and the proposed icon to your assistant",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your real icon descriptions and the new icon you want checked.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't have exact measurements for our existing icons?",
        answer:
          "The icon consistency audit skill says so explicitly rather than guessing. Supply approximate real values for at least four or five icons and it derives a candidate convention, stating which dimensions are well supported and which stay provisional until more icons are described.",
      },
      {
        question: "Does the skill assume every icon set uses a standard 24px grid and 2px stroke?",
        answer:
          "No, and its instructions explicitly forbid that assumption. Real icon sets vary widely, some using a 20px grid, some filled rather than outline, so the skill asks for the team's own real icons instead of defaulting to a common but potentially wrong convention.",
      },
      {
        question: "How is this different from the spacing scale consistency skill?",
        answer:
          "Both refuse to substitute a generic industry assumption for a team's own real pattern, but they check different things. The spacing scale consistency skill judges a proposed number against a derived pixel scale, while this skill judges an icon's grid size, stroke width, corner style and fill treatment against real existing icons.",
      },
      {
        question: "Can this skill judge whether an icon's metaphor makes sense, not just its style?",
        answer:
          "No. It checks fit to a derived, measurable convention only, meaning grid size, stroke width, corner style and fill treatment. Whether an icon's chosen metaphor communicates its concept clearly is a separate design judgment this skill's instructions deliberately leave out.",
      },
      {
        question: "Does my icon set data get sent anywhere when I use this skill?",
        answer:
          "No. Previewing the files and building the .zip both happen entirely in your browser, with no request going out to a server, so your team's real icon descriptions and the proposed icon you check stay exactly where you typed them.",
      },
      {
        question: "Can I edit the files after downloading them?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor once downloaded. This page is a read only preview of the exact content that ships in the archive, so editing happens afterward in your own editor rather than through this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/design-skills/spacing-scale-consistency-skill",
        label: "spacing scale consistency skill",
        description: "The same real-evidence discipline applied to a proposed numeric spacing value instead of an icon's visual dimensions.",
      },
      {
        href: "/skills/design-skills/component-naming-consistency-skill",
        label: "component naming consistency skill",
        description: "The same real-evidence discipline applied to a proposed component name string instead of icon style.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description: "For specifying a brand new icon set's geometry from scratch, rather than checking one new icon against a set that already exists.",
      },
      {
        href: "/design-prompts/design-critique-prompt",
        label: "design critique prompt",
        description: "For a broader visual review once an icon has already passed this skill's grid, stroke and fill checks.",
      },
    ],
    externalLinks: [
      {
        href: "https://lucide.dev/contribute/icon-design-guide",
        label: "Lucide: Icon Design Guide",
        description: "A real, published icon library's own stated grid size and stroke width, an example of the kind of specific source this skill requires as input.",
      },
      {
        href: "https://v10.carbondesignsystem.com/guidelines/icons/contribute/",
        label: "IBM Carbon Design System: Icon guidelines",
        description: "Another real design system's own declared icon canvas and stroke handling rules, showing a concrete convention different from Lucide's.",
      },
      {
        href: "https://m3.material.io/styles/icons/designing-icons",
        label: "Material Design 3: Designing icons",
        description: "Independent guidance on icon grids, keylines and stroke weight, useful context though never a substitute for a team's own real icon set.",
      },
      {
        href: "https://developer.apple.com/design/human-interface-guidelines/icons",
        label: "Apple Human Interface Guidelines: Icons",
        description: "Guidance on keeping stroke thickness and level of detail consistent across an icon set, the same discipline this skill checks against real evidence rather than a stated rule alone.",
      },
    ],
  },

  tags: ["design", "design systems", "icons", "iconography", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
