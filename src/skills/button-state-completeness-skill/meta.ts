import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Button State Completeness Check

Use this skill whenever you are given a real button or interactive component spec: a
designer's written description, a design-tool annotation export, or plain prose describing
what a button or similar control looks like in its various states. Its job is to check that
spec against a fixed list of six interaction states a production-ready button needs, and to
report each one as SPECIFIED or MISSING based only on what the spec actually says.

## The six states checklist

Every button or similar interactive control needs, at minimum:

1. **Default.** The resting appearance: not hovered, not pressed, not focused, enabled.
2. **Hover.** How the button looks while a pointer sits over it, before any click.
3. **Active or pressed.** How the button looks during the moment of a click or tap, before
   release.
4. **Focus (keyboard-visible).** How the button looks when reached by keyboard navigation
   (the tab key or similar), distinct from hover. A button can be focused without ever being
   hovered, and a visible focus indicator is what a keyboard-only person relies on to know
   where they currently are.
5. **Disabled.** How the button looks and behaves when it cannot currently be activated.
6. **Loading.** How the button looks while an async action it triggers is in flight. This
   state only applies when the button actually starts an asynchronous action (a network
   request, a file upload, a form submission); a button that just opens a menu or toggles a
   local setting has no loading state to specify, and that absence is not a gap.

## Deciding whether loading applies before checking for it

Read the spec for what the button actually does when activated. If it submits data, calls an
API, saves a record, or otherwise starts work that will not resolve instantly, mark loading
as a required state and check for it like any other. If the spec describes a button that
performs an instant, local action (opening a dropdown, toggling a switch, expanding a
section already on the page), state plainly that loading does not apply to this control
rather than flagging its absence as a missing state.

## Checking each state against what the spec actually says

For each of the six states (five when loading does not apply), do the following, in order:

1. Search the spec for a description of that specific state: a colour value, a described
   visual change, an interaction note, anything tied specifically to that state's name or
   trigger.
2. If you find one, quote the exact text from the spec, then mark the state SPECIFIED.
3. If you do not find one, mark the state MISSING. Do not soften a missing state into a
   maybe, and do not describe what a reasonable value for it would probably look like. State
   plainly that the spec does not address it.

## What this skill does not do

It never invents a plausible value for a state the spec did not describe. Asked about a
missing hover colour, it does not lighten or darken the default colour and present that as
the hover state; it reports hover as MISSING and stops there. The same applies to every other
state: a missing focus indicator, a missing disabled style, a missing loading treatment are
all reported exactly as missing, never filled in with a guess dressed up as an answer,
because a filled-in guess reads to a reader as though the spec already covered it when it
did not.

It also does not assume two states share styling just because only one of the two was
described. If a spec describes an active or pressed style and nothing separate for hover,
hover is still checked and marked on its own, never assumed to inherit the active
description just because the two states are visually adjacent in most real components.

## Closing a check

End every check with a short summary line: how many of the six (or five, when loading does
not apply) states were SPECIFIED, and a plain list naming every state marked MISSING. This is
the line a reader actually needs, since a spec that is otherwise thorough but silent on
keyboard focus has exactly one real gap worth fixing, and the summary should make that gap
impossible to miss.
`;

const WORKED_EXAMPLE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It walks through checking a real-looking button spec against
the six-state checklist, state by state, exactly as this skill's process requires: quoting
what the spec says, marking each state SPECIFIED or MISSING, and never filling in a state the
spec never described.

## The spec being checked

A designer supplies the following written description for a primary button labelled "Save
Changes," used on a settings form that submits a POST request to update the account record:

> Primary button, "Save Changes." Default: background #2F6FEB, white text, 8px corner
> radius, 16px horizontal padding. Active/pressed: background #1F4FB8, scale transform 0.98
> so the button visibly compresses on click. Disabled: background #C7D2E3, text colour
> #8592A6, cursor set to not-allowed, shown when the form has no unsaved changes. Loading:
> the label is replaced with a spinner icon, the button's width stays fixed at its resting
> width so nothing shifts, and the button is disabled for the duration of the request so a
> second click cannot fire a second save.

## Checking each of the six states

**Default: SPECIFIED.** The spec states "background #2F6FEB, white text, 8px corner radius,
16px horizontal padding." This is a specific, checkable description of the resting state.

**Hover: MISSING.** Nothing in the spec describes how the button looks while a pointer sits
over it before a click. The spec moves directly from default to active/pressed with no hover
description in between. This is not filled in with a guess, for example by assuming hover
sits somewhere between default and active; it is reported as missing, plainly.

**Active/pressed: SPECIFIED.** The spec states "background #1F4FB8, scale transform 0.98 so
the button visibly compresses on click." This is a specific, checkable description of the
pressed state.

**Focus (keyboard-visible): MISSING.** Nothing in the spec describes a distinct visual
treatment for keyboard focus, such as an outline, a ring, or a border change when the button
is reached by the tab key rather than a pointer. The active/pressed description is not a
substitute; a keyboard user who tabs to this button without ever clicking it needs a visible
indicator that does not depend on a pointer touching the control at all.

**Disabled: SPECIFIED.** The spec states "background #C7D2E3, text colour #8592A6, cursor set
to not-allowed, shown when the form has no unsaved changes," which also states the condition
that triggers this state, not just its appearance.

**Loading: SPECIFIED, and it applies here.** The button submits a POST request to update the
account record, an asynchronous action that will not resolve instantly, so loading is a
required state to check for, not an optional one. The spec states "the label is replaced with
a spinner icon, the button's width stays fixed at its resting width so nothing shifts, and the
button is disabled for the duration of the request," a specific, checkable description.

## Reporting the result

Four of six states are SPECIFIED: default, active/pressed, disabled, and loading. Two are
MISSING: hover and focus (keyboard-visible). The correct summary line names both gaps by name
and proposes no colour value for either, since no hover or focus colour appeared anywhere in
the source spec. A designer reading this result knows exactly which two states to go add, and
exactly which four are already covered and do not need any rework.

## A second, shorter example: a button where loading does not apply

A "Show more" button that expands a local list already rendered on the page is described with
a default, hover, active/pressed, focus and disabled state, all specified with colour values.
Because expanding a list already on the page is instant and local, not an asynchronous
request, loading is marked not applicable rather than missing, and the summary line states
five of five applicable states specified, with loading correctly excluded rather than counted
against the spec as a gap.
`;

const meta: SkillMeta = {
  slug: "button-state-completeness-skill",
  name: "Button State Completeness Check",
  title: "Button State Completeness Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks a real button or component spec against the six interaction states a production button needs, quoting what the spec actually says for each and reporting a missing state as missing rather than inventing a plausible value for it.",

  seo: {
    primaryKeyword: "button state completeness skill",
    keywords: [
      "button state completeness skill",
      "free ai skill for button states",
      "downloadable button state checklist",
      "ai skill to check button interaction states",
      "button interaction state guide for ai assistant",
    ],
    seoTitle: "Button State Completeness Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable button state completeness skill that checks a real button spec for default, hover, active, focus, disabled and loading states.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to check a button spec for completeness, models reliably invent a plausible hover colour or a plausible disabled style whenever one was never actually specified, presenting a filled-in guess as though it had been read directly from the spec. A second common failure is treating loading as a state every button needs, flagging its absence even on a button that only opens a menu or toggles a local setting with nothing asynchronous involved. This skill's checklist forces every state to be quoted from the real spec or marked missing outright, and requires loading to be judged against what the button actually does before it is checked for at all.",
  },

  article: {
    intro: [
      "A button state completeness skill only earns its name if it can tell a spec that looks finished apart from one that actually specifies every interaction state a production button needs. A polished default look and a satisfying pressed animation still get waved through without anyone asking whether a keyboard user gets a visible focus ring. This skill checks a real button spec against six fixed states and refuses to fill in a missing one with a plausible guess.",
      "It ships as two plain text files: a main instructions file setting out the six-state checklist and the rule for when loading applies, and a reference file walking through a worked example checked state by state. Both are previewable in full before you download the .zip, exactly as they ship inside it.",
    ],
    sections: [
      {
        heading: "The six states every production button spec needs",
        body: [
          "Every button needs six things specified before it counts as production ready: a default resting appearance, a hover state for pointer users, an active or pressed state for the moment of a click, a focus state visible to keyboard navigation, a disabled state, and a loading state for whenever the button triggers an action that will not resolve instantly. A button state completeness skill checks a real spec against exactly this list, state by state, rather than skimming for a generally polished feel.",
          "A downloadable button state checklist only holds up if its items are the ones a button actually needs in production. Default, hover, active, focus, disabled and loading cover every condition a mouse, touch or keyboard user can put a button in, and every condition the button itself can be in.",
        ],
      },
      {
        heading: "Why the loading state is conditional, not automatic",
        body: [
          "Loading is the one state that does not apply to every button. It only matters when activating the button starts something that will not resolve instantly: a network request, a file upload, a form submission. Before checking for a loading description, this skill reads what the button actually does when activated, and only marks loading as required once that action is confirmed to be asynchronous.",
          "A button that opens a dropdown or toggles a local switch has nothing to wait on, so a spec silent on loading for it is not missing anything. Flagging loading on a button that never needed one wastes a designer's attention on a state that was never required.",
        ],
      },
      {
        heading: "Marking a state SPECIFIED or MISSING without inventing anything",
        body: [
          "This is what makes it an ai skill to check button interaction states rather than a general reviewer offering an opinion on how finished a button looks. Every state is searched for on its own terms; if a colour value or a described visual change ties directly to it, the exact text is quoted and the state is marked SPECIFIED. If nothing ties to it, the state is marked MISSING, plainly, with no invented value standing in for the gap.",
          "That is the difference between a free ai skill for button states worth trusting and a checklist that quietly darkens the default colour to guess at hover. A guessed value dressed up as an answer reads as though the spec already covered that state, which hides the exact gap a designer still needs to close.",
        ],
      },
      {
        heading: "A worked example: a save button spec missing two of six states",
        body: [
          "The bundled reference file walks through a spec for a Save Changes button that submits a POST request on activation. Four states are specified with quotable detail: default, active/pressed, disabled, and loading, since the save action is genuinely asynchronous. Two are missing entirely: hover, and focus (keyboard-visible).",
          "The active/pressed description is never treated as a stand-in for the missing hover state, and no colour is proposed for either gap. The summary names both missing states directly, so a designer reading the result of this button state completeness skill knows precisely what to add and which four states are already covered.",
        ],
      },
      {
        heading: "How this differs from the empty state completeness skill and the icon consistency audit skill",
        body: [
          "The empty state completeness skill checks a screen or list's empty states, the explanation and next action shown when a whole view has nothing to display, a screen-level content concern. This skill instead checks a single control's own interaction states across every condition it can be in, a different UI concern at a different scale.",
          "The icon consistency audit skill checks whether a proposed icon's stroke width and grid size match a team's existing set, a visual style question about one static asset compared against others. This skill never compares a button against other buttons; it checks one component's spec against a fixed list of interaction states, present or absent.",
        ],
      },
      {
        heading: "Using the checklist on real design-tool annotations",
        body: [
          "This works equally well on plain prose, a pasted export of design-tool variant names, or a redline listing colours per state. It needs the actual text describing each state, not a verbal impression of how finished the component looks. Kept together, the files also work as a button interaction state guide for ai assistant teams drafting new specs.",
        ],
      },
    ],
    howTo: {
      name: "How to use the button state completeness skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what standard you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real button spec",
          text: "Collect the actual written description, design-tool annotation export, or redline text for the button in question, including what happens when it is activated.",
        },
        {
          name: "Hand both files and the spec to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply the real spec text for a state-by-state check.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if the spec does not mention a loading state at all?",
        answer:
          "The skill first checks what the button does when activated. If that action is asynchronous, loading is marked required and reported missing if the spec never addressed it. If the action is instant and local, loading is marked not applicable, so a button that never needed one is not flagged for lacking it.",
      },
      {
        question: "Does the skill assume hover and active look similar just because they usually do?",
        answer:
          "No. Even when a spec describes an active or pressed style in detail and says nothing about hover, the two states are checked and reported separately. Hover is never assumed to inherit the active description, since that would hide a gap behind a state never actually specified.",
      },
      {
        question: "What if a button spec truly has no missing states?",
        answer:
          "Then the summary line reports all six states, or all five when loading does not apply, as SPECIFIED, with the exact quoted text supporting each one. A clean pass is reported plainly, the same way a gap is, rather than searching for something to flag.",
      },
      {
        question: "How is this different from the empty state completeness skill?",
        answer:
          "The empty state completeness skill checks a whole screen or list's empty states, the explanation and next action shown when there is no content to display. This skill checks a single button's own interaction states, default through loading, a different UI concern at a different scale.",
      },
      {
        question: "Does this skill invent colours or styles for a state the spec never described?",
        answer:
          "No, and its instructions explicitly forbid it. A missing hover colour is never guessed by lightening the default colour, and a missing focus indicator is never assumed from the active style. Every value reported comes from a direct quote in the spec, or the state is marked missing outright.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, with no server call behind either action, so the button spec you check with this skill is never sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the worked example into its own reference file keeps the main instructions focused on the six-state process, while the example can be extended with more sample specs later without restructuring the instructions file that points to it.",
      },
    ],
    internalLinks: [
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For drafting a full component library's states and tokens from scratch, rather than auditing one existing button spec for gaps.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description: "For writing the handoff notes a spec ships with, a natural companion once this skill has confirmed every interaction state is actually documented.",
      },
      {
        href: "/skills/design-skills/empty-state-completeness-skill",
        label: "empty state completeness skill",
        description: "A sibling skill for a screen or list's empty states, a screen-level content concern rather than a single control's own interaction states.",
      },
      {
        href: "/skills/design-skills/icon-consistency-audit-skill",
        label: "icon consistency audit skill",
        description: "A sibling skill for checking a proposed icon's stroke and grid against a team's existing set, a visual style question rather than a button's interaction states.",
      },
    ],
    externalLinks: [
      {
        href: "https://m2.material.io/design/interaction/states.html",
        label: "Material Design: Interaction States",
        description: "A production design system's own reference for enumerating a component's states, including hover, focus, pressed and disabled.",
      },
      {
        href: "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/",
        label: "W3C ARIA Authoring Practices: Keyboard Interface",
        description: "The standard reference for how an interactive control like a button should behave and appear when operated by keyboard, the basis for the focus state on this checklist.",
      },
      {
        href: "https://www.a11yproject.com/posts/never-remove-css-outlines/",
        label: "The A11Y Project: Never Remove CSS Outlines",
        description: "An independent explainer of why a visible keyboard focus indicator matters and what is lost when a spec or a stylesheet strips it without replacing it.",
      },
      {
        href: "https://www.nngroup.com/articles/progress-indicators/",
        label: "Nielsen Norman Group: Progress Indicators",
        description: "Independent research on why a system needs to visibly show that work is in progress, the same reasoning behind requiring a loading state on any button that triggers an asynchronous action.",
      },
    ],
  },

  tags: ["design", "buttons", "interaction states", "ui review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
