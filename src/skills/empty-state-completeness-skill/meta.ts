import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Empty State Completeness Check

Use this skill whenever you are given a description of a UI screen's empty states: a spec, a
set of mockup annotations, or plain prose describing what a screen shows before any content
exists, after a search comes back with nothing, or once something has gone wrong. Its job is
to check each described empty state against the two things every empty state actually needs,
and to say exactly which one is missing when it is.

## The two required elements

Every empty state needs:

1. A clear explanation of why the screen is empty, written in plain language specific to that
   state. Not "nothing here" or "no data," a sentence that tells the person what happened and
   why they are looking at emptiness instead of content.
2. Where relevant, a concrete next action: a button, a link, or a specific suggestion the person
   can act on immediately. Not every empty state needs an action, but state whether one applies
   before deciding it is missing rather than assuming every state needs the same fix.

## Why the type has to be settled first

There are four distinct empty state types, and treating them as interchangeable is exactly the
shortcut this skill exists to prevent. Read \`reference/empty-state-types.md\` before checking
anything. It names the four types (no-data, search-empty, error, first-use) and the specific
job each one has to do, because a generic "add a message and a button" check misses that the
right message and the right action differ by type. A no-data state needs to explain that
nothing has been created yet and offer a way to create the first thing. A search-empty state
needs to explain that the current search or filter found nothing and offer a way to broaden or
clear it. An error state needs to explain what failed and offer a retry or a path to support,
never a way to create new content, since the underlying data may be fine and only the fetch
broke. A first-use state needs to explain what the feature does and offer onboarding guidance,
since there being nothing yet is not a failure at all here.

## Identifying the type before checking anything

For every empty state described to you, first state which of the four types it is, and why,
before checking either required element. Cite the actual detail in the description that
identifies it: a stated search term with zero results is search-empty, a stated fetch or load
failure is error, a screen described as a brand new user's first visit is first-use, and
everything else where content could exist but simply does not yet is no-data. If the
description does not give enough detail to tell the type, ask, rather than guessing and grading
the state against the wrong job.

## Checking each state once its type is settled

For each empty state:

1. Quote or restate the explanation given, if any. State whether it is clear, plain language and
   specific to that type's actual reason for emptiness, or whether it is a generic placeholder
   that would fit any state equally ("nothing here," "no results," "an error occurred" with
   nothing further).
2. State whether a concrete next action is described, and whether that action is the one this
   type actually needs: a retry or support path for error, a broaden or clear action for
   search-empty, a create action for no-data, an onboarding step for first-use. An action that is
   present but wrong for the type still gets flagged, since a "create new item" button on an
   error state routes a broken fetch around the actual problem instead of fixing it.
3. If either element is missing, wrong for the type, or generic, flag it by name: cite the
   specific empty state being checked, name the type, name exactly which required element is
   missing or wrong, and say what the type actually requires instead.

Never write a flag as a general "add a message and a button." Every flag must trace to one
state, one type, and one named missing element.

## What this skill does not do

It does not invent copy for a missing explanation or action on the person's behalf, and it does
not assume a screen has an empty state at all if none was described. It does not treat an empty
state as complete because it has some message and some button; both elements have to be the
right ones for that state's actual type. If a description does not specify enough to identify
the type or judge an element, say so and ask, rather than grading a guess.

## Closing a check

End with a short summary line stating which type was checked most often and which required
element, across all states reviewed, was missing most often, since a repeated pattern (every
error state on this screen skips the retry path, say) usually points at one habit worth fixing
everywhere rather than several separate one-off fixes.
`;

const EMPTY_STATE_TYPES_MD = `# Reference: the four empty state types

Use this file alongside \`SKILL.md\`. Before checking either required element on any state,
settle which of these four types it is. Each one has a genuinely different job, so the right
explanation and the right action are different every time.

## 1. No-data

The screen would normally show content, but nothing has been created yet. Nothing is broken and
no search has been run; the person simply has not made anything here.

- Required explanation: state plainly that nothing has been added yet, in terms specific to
  what this screen holds (projects, contacts, invoices), not a bare "no data."
- Required action: a create action that leads directly into making the first item, such as a
  button labelled for the specific thing being created.

Pass example: a projects screen reads "You haven't created a project yet. Projects are where
your tasks, files and team live together." with a button labelled "Create your first project."
The explanation names what is missing and why, and the action leads straight into fixing it.

Fail example: the same screen reads "No projects" with no button at all. Flag: no-data state on
the projects screen is missing the required create action; the explanation is also generic
rather than naming what a project is for.

## 2. Search-empty

The person searched or filtered, and the current query matched nothing. The underlying data may
still exist; only this particular search came back empty.

- Required explanation: state that the current search or filter found no matches, ideally
  naming the term or filter applied, so the person knows the emptiness is about the query, not
  the whole dataset.
- Required action: a way to broaden or clear the search, such as a "clear filters" link or a
  suggestion to try a different term.

Pass example: a results screen reads "No results for 'invoice #4471.' Check the spelling or
clear your filters to see everything." with a "Clear filters" link. The explanation names the
actual query and the action offers a direct way back to the full list.

Fail example: the same screen reads "No results found" with no link back to the full list.
Flag: search-empty state on the results screen is missing the required broaden-or-clear action;
a person has no way back to their full data from here.

## 3. Error

Something failed, most often a network request or a load. The screen cannot show its normal
content because the attempt to fetch it did not succeed, which is a different situation from
there being nothing to show.

- Required explanation: state what failed in plain language ("we couldn't load your data" or
  "connection problem"), without implying the person's data is missing or wrong.
- Required action: a retry action, a path to support or a status page, or both. Never a create
  action, since offering to create new content on top of a failed load can silently duplicate
  or bury data that is actually still there.

Pass example: a dashboard reads "We couldn't load your dashboard. This is usually temporary."
with a "Try again" button and a "Contact support" link. The explanation is honest about what
happened and the actions match what an error actually calls for.

Fail example: the same dashboard reads "Nothing to show" with a "Create new report" button.
Flag: error state on the dashboard is missing the required retry or support action and instead
offers a create action, which is the wrong action for this type since the data was never
confirmed missing, only unreachable.

## 4. First-use

The person has never used this specific feature before. The screen is empty because nothing has
happened here yet, not because anything failed or because a search came up short, so the tone
should introduce the feature rather than apologise for emptiness.

- Required explanation: state briefly what the feature does and why it currently looks empty,
  framed as an introduction rather than an absence.
- Required action: onboarding guidance, such as a short tour, a suggested first step, or a
  worked example, rather than a bare create button with no context.

Pass example: a new automations tab reads "Automations run actions for you automatically, like
sending a welcome email when someone signs up. Set up your first one in under a minute." with a
"Start with a template" button. The explanation teaches what the feature is for before asking
for anything.

Fail example: the same tab reads "No automations" with a plain "Create" button. Flag: first-use
state on the automations tab is missing the required onboarding explanation; a first-time
visitor is given a button with no idea what it creates or why they would want one.

## How to use this file

When checking a described empty state, match it to exactly one of the four types above before
judging either required element, and use that type's specific pass and fail examples as the
standard rather than a general sense of what looks complete.
`;

const meta: SkillMeta = {
  slug: "empty-state-completeness-skill",
  name: "Empty State Completeness Check",
  title: "Empty State Completeness Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks a UI screen's empty states for a clear explanation and the right next action, judged separately for no-data, search-empty, error and first-use states.",

  seo: {
    primaryKeyword: "empty state completeness skill",
    keywords: [
      "empty state completeness skill",
      "free ai skill for empty states",
      "downloadable empty state checklist",
      "empty state ux checklist for ai assistant",
      "ai skill for checking empty state copy",
    ],
    seoTitle: "Empty State Completeness Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable empty state completeness skill that checks each empty state for a clear explanation and the right next action by type.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/empty-state-types.md", content: EMPTY_STATE_TYPES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review a screen's empty states, models default to a single generic check applied to every state alike: does it have a message, does it have a button. That check treats a failed network request the same as a brand new user's first visit, so an error state gets told to offer a create action and a first-use state gets told to offer a retry, neither of which fits. This skill forces the type to be settled before either required element is judged, so the explanation and the action asked for are the ones that state actually needs.",
  },

  article: {
    intro: [
      "An empty state completeness skill only earns its name if it can tell the difference between four situations that all render as a blank screen but call for entirely different handling. A search that found nothing, a brand new user's first visit, a screen where nothing has been created yet, and a screen where something genuinely failed to load all look similar in a spec, and most reviews check them with the same flat question: does it have a message and a button. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file that sets out the two required elements every empty state needs, and a reference file naming the four empty state types this skill checks against, each with its own worked pass and fail example. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant or a teammate receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a flat message-and-button check misses the job",
        body: [
          "A check that only asks whether an empty state has some explanation and some button will happily pass a dashboard that reads \"Nothing to show\" next to a \"Create new report\" button after a failed data load, because a message and a button are both present. The button is wrong for what happened: the load failed, the data was never confirmed missing, and offering to create new content on top of an unreachable fetch can bury or duplicate data still there.",
          "That is the difference between a free ai skill for empty states worth trusting and a checklist that only counts elements without asking whether they are the right ones. This skill's first rule is that the type has to be settled before either required element gets judged.",
        ],
      },
      {
        heading: "The two required elements every empty state needs",
        body: [
          "Every empty state this skill checks needs a clear explanation of why the screen is empty, written in plain language specific to that state rather than a generic \"nothing here\" that would fit any screen equally. Where relevant, it also needs a concrete next action the person can take immediately: a button, a link, or a specific suggestion, not a vague direction to figure it out themselves.",
          "Not every state needs an action in the same shape, which is why the type has to be identified first. A downloadable empty state checklist that treats the action requirement as one-size-fits-all keeps asking error states for a create button and first-use states for a retry link, both wrong for what that state is for.",
        ],
      },
      {
        heading: "The four empty state types and what each one specifically requires",
        body: [
          "No-data means the screen would normally show content but nothing has been made yet; it needs an explanation naming what is missing and a create action leading into making the first item. Search-empty means a search or filter matched nothing while the underlying data may still exist; it needs an explanation naming the query and a way to broaden or clear it, never a create action.",
          "Error means something failed, most often a load or a network request; it needs an honest explanation of what went wrong and a retry or support path, never a create action, since the data may be fine and only the fetch broke. First-use means the person has never used this feature before; it needs an explanation that introduces the feature rather than apologising for emptiness, and onboarding guidance rather than a bare button with no context.",
        ],
      },
      {
        heading: "How the check actually runs, state by state",
        body: [
          "For each state described, the skill first states which of the four types applies and cites the detail that identifies it: a stated search term points to search-empty, a stated load failure points to error, a brand new user's first visit points to first-use, and anything else where content could exist but does not yet points to no-data.",
          "Only once the type is settled does it check the explanation and the action against that type's job, and every flag cites the specific state, names the type, and names exactly which required element is missing or wrong, rather than a general note that something feels incomplete.",
        ],
      },
      {
        heading: "Why a generic flag gets rejected",
        body: [
          "This skill's instructions forbid writing a flag as \"add a message and a button.\" A flag that does not name the state, the type, and the missing element gives a designer nothing to act on beyond a vague sense something is wrong, the exact failure mode a completeness check exists to prevent.",
        ],
      },
      {
        heading: "Using the two files together as an empty state ux checklist for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file points to the reference file by its relative path. Keep the folder structure intact (SKILL.md alongside a reference folder) to preserve that link. As an ai skill for checking empty state copy, it works on one described state or a full screen inventory, as long as each state is checked against its own settled type.",
        ],
      },
    ],
    howTo: {
      name: "How to use the empty state completeness skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/empty-state-types.md directly on this page before downloading, so you know exactly what standard you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Describe each empty state on the screen",
          text: "Give your assistant a plain description of what each empty state shows: any explanation text, any button or link, and enough context (a failed load, a search term, a new feature) to identify its type.",
        },
        {
          name: "Check every flag names a state, a type and an element",
          text: "Read each returned flag for a specific state, a named type, and a named missing or wrong element. Push back on anything that reads like a generic reminder rather than a checked finding.",
        },
      ],
    },
    faq: [
      {
        question: "Why does the empty state completeness skill check for a type before checking anything else?",
        answer:
          "Because the two required elements mean something different depending on the type. A retry action is correct for an error state and wrong for a no-data state, and an explanation that apologises for emptiness fits a failed load but misreads a brand new user's first visit, so grading without settling the type first produces the wrong verdict.",
      },
      {
        question: "Does every empty state need a next action, or just an explanation?",
        answer:
          "Not always. The instructions say an action is required where relevant, and leave it to the type to decide what relevant means: a search-empty or no-data state almost always needs one, while some transient states resolve on their own. The skill states explicitly whether an action applies before flagging one as missing.",
      },
      {
        question: "What happens if a description does not say enough to identify the type?",
        answer:
          "The instructions require asking rather than guessing. Grading a state against the wrong type's requirements produces a flag that sends a designer chasing the wrong fix, so an ambiguous description gets a clarifying question instead of an assumed answer.",
      },
      {
        question: "Can this skill review a full screen inventory, not just one empty state at a time?",
        answer:
          "Yes. Each state in the inventory still gets its own type, its own check against the two required elements, and its own specific flags. The closing summary line then looks across all of them for which type or which element was missing most often, so a repeated pattern is visible.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no screen description you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill split the four types into a separate reference file?",
        answer:
          "Keeping the four types and their worked pass and fail examples in their own file lets the main instructions stay focused on the check itself, while the type reference can be extended with more detail or more examples later without restructuring the process file that points to it.",
      },
    ],
    internalLinks: [
      {
        href: "/design-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description: "For drafting the actual copy inside an empty state once this skill has flagged which element is missing.",
      },
      {
        href: "/design-prompts/design-critique-prompt",
        label: "design critique prompt",
        description: "A general one-off critique pass for a screen, useful for everything this skill's narrower empty-state check does not cover.",
      },
      {
        href: "/design-prompts/user-flow-prompt",
        label: "user flow prompt",
        description: "For mapping where in a flow each empty state actually sits, before checking whether it meets this skill's two requirements.",
      },
      {
        href: "/skills/design-skills/design-critique-structure-skill",
        label: "design critique structure skill",
        description: "A sibling skill for turning general feedback on the same screen into observation, principle and suggestion form.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/empty-state-interface-design/",
        label: "Nielsen Norman Group: Empty State Interface Design",
        description: "An independent explainer of why empty states matter to system status and learnability, the same reasoning behind requiring a clear explanation.",
      },
      {
        href: "https://www.pencilandpaper.io/articles/empty-states",
        label: "Pencil & Paper: Empty State UX Examples & Best Practices",
        description: "A worked set of real empty state examples across onboarding, no-search-results and inbox-zero situations, close to the four types this skill checks.",
      },
      {
        href: "https://www.smashingmagazine.com/2017/02/user-onboarding-empty-states-mobile-apps/",
        label: "Smashing Magazine: The Role Of Empty States In User Onboarding",
        description: "Background on why a first-use empty state should introduce a feature rather than leave a person at a dead end.",
      },
      {
        href: "https://m1.material.io/patterns/empty-states.html",
        label: "Material Design: Empty States Patterns",
        description: "A design system reference on structuring an empty state with neutral imagery and a clear tagline rather than a bare placeholder message.",
      },
    ],
  },

  tags: ["design", "empty state", "ux", "ui review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
