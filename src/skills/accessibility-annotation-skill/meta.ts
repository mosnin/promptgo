import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Accessibility Annotation Skill

Use this skill whenever you are given a description of a screen or component and asked for
accessibility annotations ready for developer handoff, not a general accessibility review. Its
output is three specific artifact types: a numbered focus and tab order, ARIA role suggestions
for custom or non-native components, and draft alt text for images, each one tied to the exact
WCAG success criterion it satisfies.

## The one rule that governs everything below

Every annotation must be something the description actually supports. If the description does
not state the real DOM order, the actual markup behind a custom control, or what an image is
actually conveying, you cannot invent that detail and annotate it as if it were known. Ask for
the missing structural detail instead. A guessed tab order or an asserted ARIA role that turns
out wrong is worse for a developer than no annotation at all, because it reads as settled and
gets built as given.

## Before annotating anything

Read the whole description first and list, silently, what it does and does not tell you: the
actual reading and interaction order of elements, which controls are native HTML and which are
custom built, what each image is meant to communicate, and what state changes exist. Only then
start producing annotations. If a detail needed for one annotation type is missing, say so next
to that specific annotation rather than skipping it silently or filling the gap with a plausible
guess.

## Producing the focus and tab order annotation

Number every interactive element in the order a keyboard user would reach it with the Tab key,
using only the order actually stated or clearly implied by the description's layout, never an
order you infer from what would be conventional. If the description does not make the actual
DOM order clear, for example a visually reordered grid or a component whose markup order was
never stated, do not number a guessed order. Write instead: "tab order not determinable from
this description, state the actual DOM order or confirm it matches reading order." Cite WCAG
2.4.3 Focus Order against every numbered sequence you do produce.

## Producing ARIA role annotations

Use \`reference/aria-role-patterns.md\` for the common component types it covers: button,
dropdown or combobox, modal or dialog, and tab panel. For any custom or visually styled
component (a div behaving as a button, a styled checkbox, a custom dropdown), suggest the ARIA
role and any required states or properties, and always state why that role fits: what the
component does, and how that matches the role's defined purpose in the reference file. Never
suggest a role as a bare assertion with no reasoning attached. If a component's actual behaviour
is not described clearly enough to match it confidently to one role, say which additional detail
would resolve it rather than picking the closest sounding option. Cite WCAG 4.1.2 Name, Role,
Value against every role suggestion.

## Producing alt text drafts

Draft alt text only for images the description states are informative, decorative, or
functional (for example, an icon acting as the only label on a button). For an informative
image, draft text describing what the image conveys in context, not a literal visual
description of shapes and colours. For a decorative image, mark it as needing an empty alt
attribute. For a functional image, draft alt text describing the action it triggers, not its
appearance. If the description does not say what an image is meant to convey, do not draft
text that guesses at its purpose; ask what the image is communicating instead. Cite WCAG 1.1.1
Non-text Content against every alt text draft.

## Output format

Group annotations under three headings, Focus Order, ARIA Roles, Alt Text, in that order. Under
each, number the entries, state the WCAG success criterion cited, and where a detail is missing,
write the question that would resolve it directly beside the entry it blocks rather than in a
separate list. End with a one line count of annotations produced against annotations blocked by
a missing detail.

## What this skill refuses to do

It refuses to number a tab order the description does not actually support. It refuses to state
an ARIA role without the reasoning that connects the component's real behaviour to that role's
defined purpose. It refuses to draft alt text for an image whose purpose was never stated. It
refuses to soften any of the three refusals above into a best guess labelled as final, because
an annotation a developer builds from should never be a guess wearing the shape of a fact.
`;

const ARIA_ROLE_PATTERNS_MD = `# Reference: common ARIA role patterns

Use this file alongside \`SKILL.md\` when annotating a custom or non-native component. Each
entry below states the role, the states and properties it typically needs, and the specific
behaviour that justifies using it, so a role suggestion in the skill's output can point to a
concrete match rather than a label picked because it sounded close.

## Button

Role: \`button\`. Justified when an element triggers a single action on activation and is not a
native \`<button>\` or \`<input type="button">\`, for example a styled \`<div>\` or \`<span>\` wired
to a click handler. Needs a keyboard handler for both Enter and Space, since a native button
responds to both. If the button toggles a state (pressed or not pressed) rather than firing a
one time action, add \`aria-pressed\` with a true or false value reflecting the current state.
Do not use this role for an element that navigates to a new location; that is a link, not a
button, and should carry the \`link\` role or be a real \`<a>\` element instead.

## Dropdown or combobox

Role: \`combobox\` on the input or trigger element, with \`aria-expanded\` reflecting whether the
option list is open, and \`aria-controls\` pointing to the id of that list. The list itself takes
role \`listbox\`, and each option inside it takes role \`option\`. Justified when the component
combines a visible current value with an actionable, keyboard operable list of choices, distinct
from a plain native \`<select>\`, which needs no ARIA at all since the role is built in. If the
component only opens a static list with no typing or filtering, a simpler \`listbox\` pattern
without the combobox role may fit better; check the description for whether the input accepts
typed text before choosing between them.

## Modal or dialog

Role: \`dialog\` on the container, with \`aria-modal="true"\` to tell assistive technology that
content behind it is inert while it is open, and \`aria-labelledby\` pointing to the id of the
dialog's visible heading. Justified when the component overlays the page, traps focus inside
itself while open, and blocks interaction with everything behind it until dismissed. Focus must
move to the dialog when it opens and return to the element that triggered it when it closes; if
the description does not confirm this focus handling exists, flag it as a missing detail rather
than assuming it is handled. A component that overlays content but does not trap focus or block
the background is not a true modal and should not carry this role.

## Tab panel

Role: \`tablist\` on the container of the tab buttons, \`tab\` on each individual tab button, and
\`tabpanel\` on each corresponding content region, connected with \`aria-controls\` on each tab
pointing to its panel's id, and \`aria-selected\` marking which tab is currently active. Justified
when selecting one tab hides the others' content and shows only the selected panel, all within
one logical group. Arrow keys should move focus between tabs; if the description does not state
whether arrow key navigation exists between tab buttons, note that as a missing detail rather
than assuming standard tab behaviour is already implemented.

## How to use this file

Match a component to one entry above only when its actual stated behaviour, not its visual
appearance alone, matches that entry's justification. A component that looks like a dropdown but
never described as keyboard operable or state carrying should be flagged for the missing detail
rather than matched to the combobox pattern on appearance alone.
`;

const meta: SkillMeta = {
  slug: "accessibility-annotation-skill",
  name: "Accessibility Annotation Skill",
  title: "Accessibility Annotation Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that turns a screen or component description into numbered focus order, reasoned ARIA role suggestions and draft alt text for developer handoff, and refuses to guess what the description does not state.",

  seo: {
    primaryKeyword: "accessibility annotation skill",
    keywords: [
      "accessibility annotation skill",
      "free ai skill for accessibility annotations",
      "downloadable aria annotation checklist",
      "ai skill for developer handoff accessibility",
      "accessibility annotation guide for ai assistant",
    ],
    seoTitle: "Accessibility Annotation Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable accessibility annotation skill that turns a screen description into numbered focus order, reasoned ARIA roles and alt text drafts for handoff.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/aria-role-patterns.md", content: ARIA_ROLE_PATTERNS_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to annotate a screen description for handoff, models reliably fill gaps with a plausible tab order or the closest sounding ARIA role rather than asking for the missing structural detail an accurate annotation actually needs. This skill requires every focus order, role suggestion and alt text draft to trace to something the description states, and to ask a direct question in place of any annotation the description cannot support.",
  },

  article: {
    intro: [
      "An accessibility annotation skill only earns its name if it can tell the difference between a detail it was given and a detail it is inventing. Handed a screen description and asked for a tab order, most AI assistants will happily number every element in a sensible looking sequence, whether or not the description ever stated the real DOM order behind that layout. This skill is built to catch itself before it does that.",
      "It ships as two plain text files: a main instructions file covering focus order, ARIA role suggestions and alt text drafts, plus a reference file naming the common ARIA role patterns for a button, a dropdown or combobox, a modal or dialog, and a tab panel. Both are previewable in full on this page before you download the .zip, and both are exactly what a developer or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Annotation for handoff, not a general accessibility review",
        body: [
          "The design-prompts accessibility audit prompt on this site reviews a described page or component and flags issues against the WCAG success criterion each one violates. This skill does a different job. It assumes the review is already settled, or is not the point, and instead produces the specific artifacts a developer needs to build the thing correctly the first time: a numbered focus order, an ARIA role for each custom component with the reasoning behind it, and a draft of alt text for every image that needs it.",
          "Put plainly, the audit prompt answers what is wrong here. This accessibility annotation skill answers what exactly should be written into the markup, and why, so a developer opens a ticket with an answer already attached rather than a list of complaints to go interpret.",
        ],
      },
      {
        heading: "Why a guessed tab order is worse than no tab order",
        body: [
          "A written description almost never states the literal DOM order behind a layout, especially anywhere a grid, a reordered flex layout, or a visually rearranged form is involved. A model that numbers a tab order anyway is guessing from what looks conventional, and a developer who trusts that guess ships a focus order nobody actually verified. That is the difference between a free ai skill for accessibility annotations worth trusting and one that just sounds confident: this skill's instructions require the real order to be stated or clearly implied before a sequence gets numbered at all; where it is not, the annotation is a direct question, not a number.",
        ],
      },
      {
        heading: "Why every ARIA role suggestion has to show its reasoning",
        body: [
          "An incorrect ARIA role actively misleads assistive technology, which makes it worse than no role at all. This skill never lets a role stand as a bare assertion. Every suggestion states what the component actually does, drawn from the description, and how that behaviour matches the role's defined purpose in \`reference/aria-role-patterns.md\`, the downloadable aria annotation checklist that ships alongside the main instructions. A component that looks like a dropdown but is never described as keyboard operable gets flagged for the missing detail instead of matched to the combobox pattern on appearance alone.",
        ],
      },
      {
        heading: "How the alt text drafting pass works",
        body: [
          "Alt text only gets drafted for images the description actually classifies as informative, decorative or functional. An informative image gets text describing what it conveys in context, not a literal description of shapes and colours; a functional image, such as an icon that is the only label on a button, gets text describing the action it triggers. If the description never says what an image is meant to communicate, the skill asks rather than inventing a plausible sounding caption.",
        ],
      },
      {
        heading: "The reference file's four common component patterns",
        body: [
          "Rather than leave role selection to guesswork, the reference file names the states and properties four common component types typically need: a button (including the pressed state for a toggle), a dropdown or combobox (expanded state, controls relationship, listbox and option roles), a modal or dialog (modal flag, labelled heading, focus trapping) and a tab panel (tablist, tab and tabpanel roles connected by controls and selected state). Each entry states the specific behaviour that justifies the role, an ai skill for developer handoff accessibility work needs exactly this kind of named, checkable match rather than a vague resemblance.",
        ],
      },
      {
        heading: "Using this as an accessibility annotation guide for ai assistant handoff",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file explicitly points to the reference file by its relative path. Keep the folder structure intact (SKILL.md alongside a reference folder) so that reference stays reachable, and supply the fullest screen or component description you have; the more structural detail given up front, the fewer annotations come back as open questions instead of finished entries.",
        ],
      },
    ],
    howTo: {
      name: "How to use the accessibility annotation skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/aria-role-patterns.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Write the fullest description you can",
          text: "Describe the screen or component's actual layout, the real markup order behind any custom controls, and what each image is meant to convey, since annotations can only trace to what the description states.",
        },
        {
          name: "Resolve every flagged gap before building",
          text: "Where the returned output asks a question instead of giving a number or a role, answer it and re-run the annotation rather than filling the gap yourself with a guess.",
        },
      ],
    },
    faq: [
      {
        question: "How is this different from the accessibility audit prompt already on this site?",
        answer:
          "The audit prompt reviews a described page and flags what violates a WCAG success criterion. This accessibility annotation skill assumes annotation is the task, not review, and produces the numbered focus order, reasoned ARIA role suggestions and alt text drafts a developer needs to implement the page correctly, each tied to the criterion it satisfies rather than the one it violates.",
      },
      {
        question: "What happens if my description does not state the real DOM order?",
        answer:
          "The skill will not number a guessed tab order. It states plainly that the order is not determinable from the description given and asks you to confirm the actual DOM order or state that it matches reading order, rather than producing a sequence nobody has verified against the real markup.",
      },
      {
        question: "Why does every ARIA role suggestion need a reason attached?",
        answer:
          "An incorrect ARIA role misleads assistive technology in a way that no role at all does not, so a bare assertion is not good enough. This skill requires every suggestion to state what the component actually does and how that matches the role's defined purpose in the reference file, so the suggestion can be checked rather than trusted on faith.",
      },
      {
        question: "Will it ever draft alt text for an image I have not described the purpose of?",
        answer:
          "No. If the description does not say what an image is meant to communicate, whether it is informative, decorative or functional, the skill asks for that detail instead of inventing a plausible sounding caption that might not match what the image is actually there to do.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no design description you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/design-prompts/accessibility-audit-prompt",
        label: "accessibility audit prompt",
        description: "For reviewing a described page or component against WCAG success criteria, the review pass that naturally precedes this skill's handoff annotations.",
      },
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Confirms the actual measured contrast ratio behind any element this skill annotates, rather than a visual impression of whether it passes.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description: "For structuring the wider handoff document these accessibility annotations are meant to sit inside alongside spacing, states and copy.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For establishing the shared component rules that make an ARIA role suggestion reusable across every future instance of the same component.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.w3.org/WAI/ARIA/apg/patterns/",
        label: "WAI-ARIA Authoring Practices Guide: Patterns",
        description: "The authoritative reference for the ARIA roles, states and keyboard behaviour this skill's reference file summarises for common component types.",
      },
      {
        href: "https://webaim.org/standards/wcag/checklist",
        label: "WebAIM: WCAG 2 Checklist",
        description: "A practical, checkable summary of the WCAG success criteria this skill cites beside every focus order, role and alt text annotation.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
        label: "MDN: ARIA",
        description: "Independent documentation on when ARIA is needed at all, and why a native HTML element should be preferred over an ARIA role when one is available.",
      },
      {
        href: "https://www.a11yproject.com/posts/alt-text/",
        label: "The A11Y Project: Using Alt Text Properly",
        description: "Grounding for this skill's distinction between informative, decorative and functional images when drafting alt text.",
      },
    ],
  },

  tags: ["design", "accessibility", "aria", "handoff", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
