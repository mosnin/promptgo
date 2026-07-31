import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Microcopy Tone Consistency Check

Use this skill whenever you are given a real set of UI microcopy strings from one screen or
one flow, the actual text that will ship: button labels, tooltips, empty-state text, error or
success messages, form field hints. Its job is to check every string against the other strings
in the same set on three specific axes, and to flag any string that breaks from the pattern
the majority of the set has already established.

This is a cross-string consistency check, not a quality check on any single string in
isolation. A string can be perfectly clear, well written and grammatically correct on its own
and still fail this skill, because the failure being checked for is that it does not sound like
it belongs on the same screen as the rest of the set.

## What you are given and what you are not allowed to invent

You need the exact, real text of every string in the set, each one attached to what it is (a
button label, a tooltip, an empty-state message, an error, a success message, a field hint).
Do not paraphrase a string before judging it, and do not accept a description of a string in
place of its literal text. If the exact wording of a string is not available, say so and ask
for it rather than checking a summary.

Do not check strings pulled from different screens or unrelated flows against each other as if
they were one set. A settings screen and an onboarding flow can legitimately use different
registers; this skill only ever tests strings that ship together, on one screen or in one flow,
against each other.

## The three axes

Every string in the set gets tested against all three. A string can fail more than one axis.

1. **Person and address.** Does the string speak to the person directly as "you" or "your"
   ("Your changes are saved," "Turn on your camera"), or does it stay impersonal and avoid
   addressing the reader at all ("Changes saved," "Camera access required")? Both are valid
   choices. What fails is mixing the two within the same set: some strings saying "your" and
   others staying impersonal.
2. **Verb mood for calls to action.** Is a button label or action prompt phrased as a direct
   imperative ("Save changes," "Delete account," "Add member"), or as a descriptive statement
   about what the person can do ("You can save your changes," "This will delete the account")?
   A set that mixes bare imperatives with descriptive, explanatory phrasing for the same kind
   of action reads as if two different people wrote it.
3. **Formality register.** Is the set consistently casual (contractions, everyday words,
   informal phrasing like "Oops, that didn't work") or consistently formal (full forms, no
   contractions, measured phrasing like "The request could not be completed")? A set that
   drops into "Oops" in one message and "An error has occurred" in the next has no single
   register.

Read \`reference/settings-screen-example.md\` for a full worked example of six real strings
from one settings screen, three axes each tested against them, with the exact flag reasoning
written out.

## Establishing the majority pattern on each axis

Before flagging anything, read every string in the set and classify each one on each of the
three axes. Count which position on each axis the majority of the set actually uses. State
that majority pattern explicitly and cite which strings support it, by their exact text, not
by a vague count.

A set with only two or three strings is too small to establish a reliable majority. Say so
plainly rather than forcing a verdict, and note that a larger sample would make the pattern
more certain.

## Flagging a string that breaks the pattern

For every string that deviates from the majority position on any axis, produce a flag with
these four parts, in this order:

1. Quote the exact string under review, unedited.
2. Name the specific axis it breaks: person and address, verb mood, or formality register.
3. Quote the majority pattern it deviates from, using the exact wording of at least one
   string that represents that majority, not a paraphrase of the pattern.
4. Give a rewritten version of the flagged string that matches the majority pattern on that
   axis while keeping its original meaning and information intact.

A string that deviates on more than one axis gets a separate flag for each axis it breaks,
each with its own four parts. Do not collapse two separate deviations into one vague note.

## What this skill does not do

It does not judge whether a string is clear, whether it states a next step, or whether it
hides technical detail from the user. Those are properties of a single string in isolation,
checked by a different kind of review entirely. It also does not compare the set against an
external brand voice document or style guide; it only compares the strings in the set against
each other, using the majority the set itself establishes. If no majority pattern exists
because the set is evenly split on an axis, say so explicitly rather than picking a side to
call correct.
`;

const SETTINGS_SCREEN_EXAMPLE_MD = `# Worked example: one settings screen, six strings

Use this alongside \`SKILL.md\`. These six strings are presented as if pulled directly from one
account settings screen: two buttons, one tooltip, one empty state, one success message, one
error message. They are checked against the three axes exactly as the main instructions
describe.

## The six strings

1. Button label: "Save changes"
2. Button label: "Delete account"
3. Tooltip: "Your email is used to sign in and recover your account"
4. Empty state: "You haven't added any payment methods yet"
5. Success message: "Changes saved."
6. Error message: "We couldn't process your request. Please try again in a moment"

## Axis 1: person and address

Classify each string. Strings 3, 4 and 6 address the reader directly with "your" or "you."
String 5, "Changes saved," stays impersonal and never addresses the reader. Strings 1 and 2
are imperative button labels, which this axis does not classify on their own since a bare
imperative carries no explicit person marker either way; they are set aside for this axis and
judged only on verb mood.

Majority pattern: direct second-person address, supported by string 3 ("Your email is used to
sign in and recover your account"), string 4 ("You haven't added any payment methods yet") and
string 6 ("We couldn't process your request").

Flag: string 5, "Changes saved." This breaks the person and address axis. It deviates from the
majority pattern established by strings like "Your email is used to sign in and recover your
account," which addresses the reader directly. Rewritten to match: "Your changes have been
saved."

## Axis 2: verb mood for calls to action

Only strings that function as calls to action are judged on this axis: strings 1 and 2.

String 1, "Save changes," is a bare imperative. String 2, "Delete account," is also a bare
imperative. Both strings agree, so the majority pattern for this set is direct imperative
phrasing, supported by both "Save changes" and "Delete account." No flag applies on this axis
for this particular set, since there is no deviating string to name. A set is only flagged on
an axis when a string actually breaks the pattern the rest of the set establishes; agreement
across all applicable strings produces no flag.

## Axis 3: formality register

String 6, "We couldn't process your request. Please try again in a moment," uses a contraction
("couldn't") and a soft, conversational close ("in a moment"). Strings 3 and 4 also use
contractions ("haven't"). This establishes a majority pattern of casual, contraction-using
phrasing, supported by string 6's "couldn't" and string 4's "haven't added any payment
methods yet."

Flag: string 5, "Changes saved." This breaks the formality register axis. Strictly speaking it
is neutral rather than actively formal, but next to "We couldn't process your request" it
reads as clipped and impersonal where the rest of the set is warmer and more conversational.
Once already flagged for person and address, the same rewrite fixes both: "Your changes have
been saved." This now matches the majority's second-person address and its warmer, less
clipped register.

## Summary of flags for this set

String 5, "Changes saved," is the only string flagged, and it breaks two axes: person and
address, and formality register. Both flags trace to the same rewrite. Strings 1, 2, 3, 4 and
6 all match the majority pattern on every axis that applies to them and receive no flags.
`;

const meta: SkillMeta = {
  slug: "microcopy-tone-consistency-skill",
  name: "Microcopy Tone Consistency Check",
  title: "Microcopy Tone Consistency Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that checks a real set of UI microcopy strings from one screen against each other on person, verb mood and formality, and flags any string that breaks the majority pattern on any axis.",

  seo: {
    primaryKeyword: "microcopy tone consistency skill",
    keywords: [
      "microcopy tone consistency skill",
      "free ai skill for ui microcopy",
      "downloadable ui copy consistency checklist",
      "ai skill to check button label tone",
      "ui microcopy tone checker for one screen",
    ],
    seoTitle: "Microcopy Tone Consistency Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable microcopy tone consistency skill that checks UI strings from one screen against each other on person, verb mood and formality.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/settings-screen-example.md", content: SETTINGS_SCREEN_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a set of UI strings tend to judge each string on its own merits, clarity, grammar, whether it sounds friendly, rather than checking whether the set agrees with itself on person, verb mood and formality. A screen can pass every individual string check and still read as if three different writers touched it. This skill's three-axis test forces every judgment to name a majority pattern established by the set itself and to quote the exact string that breaks it, rather than offering a general impression that something feels inconsistent.",
  },

  article: {
    intro: [
      "A microcopy tone consistency skill only earns its name if it can catch the string that reads fine alone but does not belong next to the others on the same screen. Handed six strings from one settings screen, most AI assistants approve every string individually and miss that one addresses the reader as \"you\" while the rest stay impersonal, or that one button explains what the person can do while the rest give a direct command. This skill is built as a ui microcopy tone checker for one screen, to catch exactly that.",
      "It ships as two plain text files: a main instructions file describing the three-axis test and a worked reference example. Both are previewable in full on this page before download, and both are exactly what a teammate or an AI assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why a single string can pass review and still not belong",
        body: [
          "Clarity and correctness are properties of one string alone. Consistency is a property of a set. \"Save changes\" and \"Changes saved\" are fine sentences on their own, but if the error next to them reads \"Please note that your request could not be completed at this time,\" the register has visibly shifted, and no amount of polishing any single string catches that shift.",
          "This is why the skill's first instruction is to gather the real, exact text of every string shipping together on one screen or flow before judging any of them, and classify each one on all three axes before flagging anything.",
        ],
      },
      {
        heading: "The three axes, precisely",
        body: [
          "Person and address asks whether the set speaks to the reader directly as \"you\" and \"your\" or stays impersonal throughout. Verb mood asks whether buttons are phrased as bare imperatives (\"Save changes\") or descriptive statements (\"You can save your changes\"). Formality register asks whether the set stays consistently casual, contractions and everyday phrasing, or consistently formal, full forms and measured wording.",
          "Each axis is checked independently, and a string can fail more than one at once. A free ai skill for ui microcopy is only useful if it separates these three cleanly rather than lumping them into one fuzzy \"tone\" judgment.",
        ],
      },
      {
        heading: "How the majority pattern gets established",
        body: [
          "Before anything is flagged, every string is classified on each applicable axis, and the position the majority of the set uses is stated explicitly, cited by the exact text of the strings that support it. A downloadable ui copy consistency checklist is only as trustworthy as the majority claim behind it, so that claim traces to real strings, never a general impression.",
          "Sets of only two or three strings are too small for a reliable majority, and the skill says so rather than forcing a verdict onto a sample that cannot support one.",
        ],
      },
      {
        heading: "How a flag is built, as an ai skill to check button label tone",
        body: [
          "Every flag has four required parts in a fixed order: the exact deviating string quoted unedited, the specific axis it breaks, the majority pattern it deviates from quoted using a real string from the set, and a rewrite that fixes the deviation while keeping the string's original meaning. A string breaking two axes at once gets two separate flags, not one blended note.",
          "This is what makes the review checkable rather than a matter of taste: every flag traces back to a specific quoted string and a specific quoted counter-example from the same set.",
        ],
      },
      {
        heading: "Differentiating this skill from brand voice and error message checks",
        body: [
          "A brand voice consistency skill checks broader brand copy, ads, emails, landing pages, social posts, against a stated reference voice document the brand has already published elsewhere. It answers whether a piece sounds like the brand's documented voice. This microcopy tone consistency skill never looks outside the set it is given; it answers a narrower question: do these strings, shipping together on one screen, sound consistent with each other. The comparison source differs, an outside style guide versus the set itself, and so does the scope, long-form brand copy versus short UI strings.",
          "An error message clarity audit skill checks whether one error message, judged on its own, states the problem, states a next step and hides technical detail. It is a content-quality check applied string by string. This skill can approve every string's clarity and still flag it, because the failure it looks for is a mismatch between strings, not a defect in any one string. A screen can fail this skill's tone test while every message passes a clarity audit, and pass this skill's test while one message still fails a clarity audit for being vague. The two checks are complementary, not overlapping.",
        ],
      },
      {
        heading: "Why the scope stays to one screen or one flow",
        body: [
          "Different screens can legitimately use different registers; an onboarding flow for new users and a dense admin panel are not required to sound identical. This skill never compares strings across unrelated flows, only strings shipping together and read by the same person in the same moment, the only comparison where a mismatch is actually a defect a user would notice.",
        ],
      },
    ],
    howTo: {
      name: "How to use the microcopy tone consistency skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/settings-screen-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Collect the exact strings from one screen",
          text: "Pull the real, literal text of every button label, tooltip, empty-state message, error, success message and field hint that ships together on the screen or flow you want checked.",
        },
        {
          name: "Hand the set and both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the reference example, then supply your string set and ask for the three-axis check.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have two or three strings to check?",
        answer:
          "The skill says so rather than forcing a verdict. A set that small cannot reliably establish a majority pattern on any axis, so it notes the sample is too small for a certain pattern.",
      },
      {
        question: "Does this skill judge whether a single message is well written?",
        answer:
          "No. It only compares strings in the same set on person, verb mood and formality register. A string can be well written on its own and still get flagged for not matching the pattern its set establishes.",
      },
      {
        question: "How is this different from a brand voice check?",
        answer:
          "A brand voice consistency skill compares copy against an external reference already published. This skill has no external reference; it only compares the strings you give it against each other, and those strings are short UI microcopy, not long-form brand copy like ads or emails.",
      },
      {
        question: "How is this different from an error message clarity audit?",
        answer:
          "An error message clarity audit judges one message against three rules: states the problem, states a next step, hides technical detail. This skill never judges a single string alone; it flags a string only when it breaks a pattern its set has established, which a clear message can do.",
      },
      {
        question: "Can I check strings from two different screens together?",
        answer:
          "The skill is built not to. Different screens can legitimately use different registers, so it only compares strings shipping together on one screen or flow, the only comparison where a mismatch is something a real user would notice.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The preview and the .zip download both happen in your browser. There is no server call behind either action, and nothing about the microcopy you use the skill with is sent anywhere by this site.",
      },
      {
        question: "What happens when a string breaks more than one axis at once?",
        answer:
          "It gets a separate flag for each axis it breaks, each with its own quoted string, named axis, quoted pattern and rewrite. The instructions forbid collapsing deviations into one vague note.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/coding-skills/error-message-clarity-audit-skill",
        label: "error message clarity audit skill",
        description: "For judging whether one error message, on its own, states the problem and a next step, rather than checking a set of strings against each other.",
      },
      {
        href: "/skills/marketing-skills/brand-voice-consistency-skill",
        label: "brand voice consistency skill",
        description: "For checking broader brand copy like ads and emails against a stated external voice reference, rather than short UI strings checked only against each other.",
      },
      {
        href: "/skills/design-skills/empty-state-completeness-skill",
        label: "empty state completeness skill",
        description: "For checking that one empty state has the two elements it needs, a companion check on the same kind of UI text this skill audits for tone.",
      },
      {
        href: "/design-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description: "For drafting a first pass at a screen's microcopy in one sitting, a natural source of the string set this skill then checks for consistency.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/microcopy/",
        label: "Nielsen Norman Group: Microcopy",
        description: "An independent explainer of what UI microcopy is and why its wording carries more weight per word than longer copy.",
      },
      {
        href: "https://m3.material.io/foundations/content-design/style-guide/voice-tone",
        label: "Material Design: Voice and Tone",
        description: "A real, published example of a design system stating a formality and address stance for its own interface text.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/audience/",
        label: "plainlanguage.gov: Know Your Audience",
        description: "A checkable federal standard for deciding on and holding a consistent register when writing for a specific audience.",
      },
    ],
  },

  tags: ["design", "microcopy", "ux writing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
