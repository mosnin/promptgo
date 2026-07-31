import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Component Naming Consistency Check

Use this skill whenever someone proposes a new design system component name and
wants to know whether it fits the team's existing naming convention. This is a
component naming consistency skill: it checks a single proposed name against a
pattern derived from names that team has actually already shipped, never
against a generic naming convention pulled from general design system
knowledge.

## Before you check anything

Ask for, or locate, the team's real existing component list: the actual names
in use today, ideally with a short note of what each one does. Do not invent a
naming convention from general knowledge of design systems (Atomic Design
tiers, BEM, a generic assumption that every design system uses
CategoryRole casing). A pattern only counts if it is derived from names this
specific team has actually shipped, because two teams can use the same tooling
and land on completely different conventions.

If fewer than about six existing names are supplied, say so explicitly. A
pattern claim from three examples is a guess wearing the clothes of a rule.
Ask for more names, or state clearly that the judgment below is provisional
until a larger sample is available.

## Deriving the pattern from the real list

For every existing name supplied, break it into its structural parts: the
case style used (PascalCase, camelCase, kebab-case, snake_case), any
category or domain prefix, and the ordering of prefix versus core word versus
state or variant suffix.

Group names that share the same structure. State the pattern as a rule only
once a clear majority of the supplied names actually support it, and cite the
specific existing names that support it by name, not by vague description.
"Most names follow Category plus Role, for example ButtonPrimary and
InputText" is a checkable claim. "Names generally follow a standard pattern"
is not.

Do not average outliers away silently. A name that does not fit the majority
group gets noted as an exception, not folded quietly into the stated rule as
if it always applied.

## Judging a proposed new name

Compare the proposed name's structure (case, prefix, ordering) against the
derived rule from the previous step.

If it matches, say which existing names it matches and why, naming the
specific siblings it resembles.

If it deviates, state exactly which part of the structure breaks: wrong case,
missing or wrong prefix, wrong ordering of parts, or a spelling that departs
from an established term. Name at least one existing sibling the proposed
name should resemble instead, then propose a corrected form that would pass.

Never approve a name solely because it looks like a plausible component name
in general. It only passes because it matches the pattern derived from this
specific team's own list, and it should be rejected on that basis even when it
would fit neatly into some other team's convention.

## When the existing list is itself inconsistent

If the supplied names split roughly evenly between two or more structures
with no clear majority, say so plainly rather than silently picking one side
and presenting it as the settled standard. Quantify the split: state how many
names fall on each side.

Evaluate the proposed name's fit against each competing structure separately,
and let the person who asked decide which structure to standardise on going
forward. Deciding for them and hiding that a decision was even needed is worse
than an honest split verdict, because it buries a real problem the team still
has to resolve eventually.

## What this skill does not do

It does not invent a generic industry naming convention as a fallback when no
real list has been supplied. If no list exists, the check cannot run, and the
skill says so and asks for the list instead of guessing.

It does not silently clean up an inconsistent list into a tidy pattern that
does not actually exist. Reporting an inconsistency honestly is part of the
job, not a failure of it.
`;

const REFERENCE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It shows the full process on a concrete
component list, from deriving a pattern through to judging a new proposed
name, plus a second example showing how an inconsistent list gets reported.

## Example one: a list that supports a clear pattern

Existing components supplied by the team:

ButtonPrimary, ButtonSecondary, ButtonDanger, InputText, InputSelect,
InputCheckbox, CardProduct, CardArticle, ModalConfirm, ModalAlert, Tooltip,
Badge

### Deriving the pattern

Ten of the twelve names follow the same structure: PascalCase, built as
Category plus Role, where Category is the family the component belongs to
(Button, Input, Card, Modal) and Role is what distinguishes that specific
member of the family (Primary, Text, Product, Confirm). ButtonPrimary,
InputText and ModalConfirm are cited here as the clearest supporting examples,
each a category word immediately followed by a role word with no separator.

Tooltip and Badge do not follow Category plus Role. Both are single words with
no attached role suffix. This is noted as an exception rather than folded into
the rule, because both components are atomic: neither currently ships in more
than one variant, so there is no role for a suffix to describe yet. If a
second Badge variant is ever added, for example a status badge, the team would
need to decide whether it becomes BadgeStatus or something else entirely.

### Judging a proposed name: "select-dropdown"

This proposed name fails on two counts at once. First, it uses kebab-case,
while every multi word name in the supplied list uses PascalCase. Second, it
has no category prefix; the closest sibling by function is InputSelect, which
establishes that selection style inputs belong under the Input category.

Corrected form: InputDropdown, or InputSelectDropdown if the team wants to
keep it visibly distinct from InputSelect rather than replacing it. Either
form matches the derived Category plus Role structure and can be checked
against InputText and InputSelect as its supporting siblings.

## Example two: a list that is genuinely split

Existing components supplied by a different team:

ButtonPrimary, ButtonSecondary, input-text, input-select, CardProduct,
modal-confirm, ModalAlert, tooltip-default

### Reporting the split honestly

Four names use PascalCase with no separator (ButtonPrimary, ButtonSecondary,
CardProduct, ModalAlert). Four names use kebab-case (input-text,
input-select, modal-confirm, tooltip-default). Neither structure has a clear
majority, so no single rule gets stated as the team's established pattern.

A proposed name such as "InputDate" is reported both ways rather than judged
once: it matches the PascalCase group's structure (comparable to ButtonPrimary
and CardProduct) and it does not match the kebab-case group's structure
(comparable to input-text and input-select, which would expect input-date).
The team is told the split exists, given the count on each side, and left to
decide which convention the codebase should converge on, rather than being
handed a verdict that quietly assumes one side already won.
`;

const meta: SkillMeta = {
  slug: "component-naming-consistency-skill",
  name: "Component Naming Consistency Check",
  title: "Component Naming Consistency Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks a proposed design system component name against a pattern derived from the team's own real component list, and reports honestly when that list is itself inconsistent.",

  seo: {
    primaryKeyword: "component naming consistency skill",
    keywords: [
      "component naming consistency skill",
      "free ai skill for design system naming",
      "downloadable component naming checklist",
      "ai skill to check component names",
      "design system component naming pattern guide",
    ],
    seoTitle: "Component Naming Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable component naming consistency skill that checks a proposed component name against the pattern in your own real design system list.",
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
      "Asked to judge a new component name, models default to applying a generic naming convention pulled from training knowledge, such as Atomic Design tiers or a generic PascalCase category assumption, rather than deriving the actual pattern from the real component list supplied for review. This produces a confident sounding verdict that describes no team's actual convention, and the failure gets worse rather than better when the supplied list is itself inconsistent, since a model will often smooth over that inconsistency instead of reporting it. This skill's process forces every judgment to trace to specific named siblings in the supplied list, and requires an even split to be reported as a split rather than resolved by assumption.",
  },

  article: {
    intro: [
      "A component naming consistency skill only earns that name if it refuses to guess. Handed a single proposed component name and nothing else, most AI assistants will confidently apply whatever naming convention they associate with design systems in general, BEM, Atomic Design, a generic category prefix pattern, regardless of whether that team's own components actually follow it. This skill is built to refuse that shortcut, and to check a proposed name only against the pattern this specific team's own names actually support.",
      "The download bundles two plain text files, a set of instructions and a worked reference example the instructions point to, both readable in full on this page before anything downloads. Nothing in the .zip differs from what is shown in the preview below.",
    ],
    sections: [
      {
        heading: "Why a naming pattern cannot come from general knowledge",
        body: [
          "Two design systems can use the same component library tooling and still land on completely different naming conventions, one PascalCase with a category prefix, another kebab-case with no prefix at all. A model asked to judge a name from general knowledge of how design systems are usually named is pattern matching against the wrong dataset. That is why this skill's first instruction is to locate or ask for the team's real existing component names before judging a single proposed one.",
          "When no real list exists, the skill does not proceed as though a convention had been established. It says so plainly and explains that the check cannot run yet, which is the difference between a free ai skill for design system naming worth trusting and a tool that just sounds confident regardless of input.",
        ],
      },
      {
        heading: "How the pattern gets derived from your actual names",
        body: [
          "Every existing name supplied is broken into structural parts: the case style used, any category or domain prefix, and the order those parts appear in. Names sharing the same structure are grouped, and a rule only gets stated once a clear majority of the supplied names actually support it. This is the step that separates a component naming consistency skill from a generic style checklist: the rule comes from the list, not from the checklist.",
          "Crucially, the pattern is stated with citations. Rather than asserting names generally follow a standard shape, the skill names the specific existing components that support the claim, for example pointing to ButtonPrimary and InputText as evidence for a stated Category plus Role structure. A downloadable component naming checklist is only as trustworthy as its ability to point back at real evidence rather than assert a pattern from nowhere.",
        ],
      },
      {
        heading: "Judging a proposed name against the evidence, not a vibe",
        body: [
          "Given a proposed new name, the skill compares its case, prefix and ordering against the derived rule, and states which specific existing names it matches or breaks from. A mismatch gets the exact structural failure named: wrong case, missing prefix, wrong part ordering, rather than a vague sense that the name feels off.",
          "This is what makes it an ai skill to check component names rather than an ai skill that offers generic naming advice. Every verdict traces back to at least one named sibling in the team's own list, both when a name passes and when it fails.",
        ],
      },
      {
        heading: "Handling an existing list that is itself inconsistent",
        body: [
          "Real component libraries are frequently inconsistent, and pretending otherwise produces a false sense of order. When the supplied names split roughly evenly between two or more structures, the skill reports the split honestly: it states the count on each side rather than silently picking a winner and presenting it as the established rule.",
          "A proposed name gets evaluated against each competing structure separately in that situation, and the decision about which convention to standardise on going forward is left with the person who asked, since that decision has consequences the skill is not positioned to make on its own.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not invent a generic industry naming convention as a fallback when no real component list has been supplied. If the list does not exist, the check does not run, and the skill asks for it instead of guessing at what a typical design system probably looks like.",
          "It also will not smooth an inconsistent list into a tidy pattern that does not actually exist just to give a cleaner answer. Reporting the mess honestly is treated as part of the job.",
        ],
      },
      {
        heading: "Using the downloaded files as a design system component naming pattern guide",
        body: [
          "Pass both files into the same conversation as one unit, since SKILL.md references reference/worked-example.md by that exact relative path. An assistant given only the instructions and none of the worked cases still knows the process but has nothing concrete to check its own output against, which is the entire reason the second file exists.",
        ],
      },
    ],
    howTo: {
      name: "How to use the component naming consistency skill",
      steps: [
        {
          name: "Read through the file tree first",
          text: "Open SKILL.md and reference/worked-example.md on this page and skim both before committing to anything, so the archive holds no surprises once it lands on your machine.",
        },
        {
          name: "Build the archive",
          text: "A single click assembles the .zip from those same two files and saves it locally, with no upload or account required at any point.",
        },
        {
          name: "Gather your real component list",
          text: "Before using the skill, collect the actual names currently in your design system, ideally at least six to eight, along with a short note of what each one does.",
        },
        {
          name: "Hand both files and your list to your assistant",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your component list and the new name you want checked.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if my team's component list is too short to find a pattern?",
        answer:
          "The component naming consistency skill says so explicitly rather than guessing from a handful of examples. It treats fewer than about six names as too small a sample for a reliable rule, and asks for more names or states clearly that any judgment offered is provisional until the sample grows.",
      },
      {
        question: "Does the skill ever fall back on a generic naming convention like BEM?",
        answer:
          "No, and its instructions explicitly forbid it. If a real component list is not supplied, the check cannot run, and the skill states that plainly instead of applying an industry standard convention as a substitute for the team's own actual pattern.",
      },
      {
        question: "What if my existing components already use two different naming styles?",
        answer:
          "The skill reports the split honestly rather than declaring one style the winner. It states how many existing names fall on each side, evaluates a proposed new name against both competing structures separately, and leaves the decision about which one to standardise on with the person who asked.",
      },
      {
        question: "Does my component list get sent anywhere when I use this skill?",
        answer:
          "Nothing about your components leaves your own machine because of this site. Building the .zip and rendering the preview both run locally in the browser tab, with no request going out to a server, so whatever proprietary naming your design system uses stays exactly where you typed it.",
      },
      {
        question: "Can I change the wording in SKILL.md once it is downloaded?",
        answer:
          "The archive contains ordinary Markdown, so any text editor opens and edits it freely once it is on your machine. What renders on this page is simply a direct, unmodified view of that same content, kept in sync so the preview never drifts from what actually ships.",
      },
      {
        question: "Why is the worked example kept separate from the main instructions?",
        answer:
          "A single file trying to hold both the process and a full worked case tends to bury the process under the example. Keeping reference/worked-example.md separate means a third naming style, kebab-case versus PascalCase mixed with a third convention, could be appended later without touching the core instructions at all.",
      },
    ],
    internalLinks: [
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For consolidating duplicate component variants and setting a naming rule across an entire inventory, rather than checking one proposed name against an existing pattern.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description: "A natural next step once a name passes this skill's check, for specifying the states and behaviour of the component being named.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description: "The same consistency discipline applied to an icon set, where stroke weight and grid do the work a naming pattern does here.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "Useful for catching a component name that drifted from convention once it reaches a pull request, rather than at the naming stage.",
      },
    ],
    externalLinks: [
      {
        href: "https://atlassian.design/foundations/tokens/design-tokens",
        label: "Atlassian Design: Design tokens explained",
        description: "A real design system's own documented naming structure, showing how a naming pattern gets stated once it is derived from actual usage.",
      },
      {
        href: "https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_names.htm",
        label: "Salesforce Developers: Component Names",
        description: "A published set of concrete, checkable naming rules for components, the same level of specificity this skill's derived patterns aim for.",
      },
      {
        href: "https://getbem.com/naming/",
        label: "BEM: Naming",
        description: "A widely used naming methodology for reference, useful context for why a consistent structural pattern matters, though never applied here as a substitute for a team's own real convention.",
      },
    ],
  },

  tags: ["design", "design systems", "components", "naming", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
