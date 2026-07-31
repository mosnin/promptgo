import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Design Critique Structure

Use this skill whenever you are asked to critique a UI, a mockup, a wireframe or a single
design decision. Its job is to stop feedback from arriving as unattributed opinion and force
every point into a checkable, teachable shape.

## The rule underneath everything

Every piece of feedback you give must follow three parts, in this order, and every part is
required:

1. OBSERVATION: state exactly what you see, in concrete terms. A measurement, a relationship
   between two elements, or a specific behaviour a user would have, never a feeling.
2. PRINCIPLE: name the specific design principle the observation relates to, by name, from
   \`reference/design-principles.md\`. Contrast, hierarchy, proximity, alignment, repetition and
   consistency, affordance, feedback, whitespace, similarity or balance.
3. SUGGESTION: propose one specific, concrete change that addresses the observation, expressed
   in terms of size, spacing, colour, order or grouping, not a vague direction like "make it
   pop."

Do not skip the principle step, ever. "I don't like this button" or "this feels off" is not
feedback this skill is allowed to give. If you cannot name the principle an observation relates
to, either keep looking until you can, or explicitly label the point as a personal preference
and separate it from the principle backed feedback, never blend the two together as if they
carried equal weight.

## Before you critique anything

Ask for, or work from, a stated goal: what the screen or decision is supposed to achieve, and
who is using it. A critique with no stated goal collapses into composition platitudes about
balance and cleanliness that apply to every screen and improve none of them. If no goal is
given, say so and ask, rather than inventing one.

## Running the critique

Work through the design description systematically: reading order first, then hierarchy
between the primary and secondary elements, then contrast and colour roles, then spacing and
grouping, then consistency with anything repeated (rows, cards, buttons) elsewhere in the same
design. For each issue you find, write it as an observation, principle, suggestion block. Do
not merge two separate issues into one block; give each its own three part entry.

Order the blocks by how much the issue actually damages the stated goal, most damaging first.
Do not present five issues as if they carry equal weight when they do not.

## What this skill refuses to do

It refuses to praise a design as "clean" or "modern" without naming what specifically produces
that read. It refuses to soften a real observation into vague reassurance. It refuses to invent
a design principle that is not one of the named ones in the reference file, and it refuses to
guess at a goal or an audience that was never stated, asking for it instead.

## Closing a critique

End with a short summary line stating which principle was violated most often across the
review, since a repeated pattern usually points at one underlying habit worth fixing once
rather than many separate one off fixes.
`;

const DESIGN_PRINCIPLES_MD = `# Reference: ten design principles

Use this file alongside \`SKILL.md\`. Every PRINCIPLE line in a critique must name one of the
ten entries below, by name, not a paraphrase or a made up label.

## 1. Visual hierarchy

The order in which a viewer's eye is guided through a screen, controlled by size, weight,
colour and position. A design has a working hierarchy when the most important action or piece
of information is genuinely the first thing noticed, not merely the largest element by
accident.

## 2. Contrast

The visible difference between two elements, whether colour, size, weight or shape. Contrast is
what lets a viewer tell two things apart at a glance, and low contrast between an action and its
background is one of the most common concrete, measurable problems a critique can point to.

## 3. Proximity

Elements placed close together read as related; elements spaced apart read as belonging to
separate groups. A form field and its label sitting far apart, or two unrelated actions sitting
close enough to look grouped, are both proximity problems with a specific spacing fix.

## 4. Alignment

Every element should relate to at least one other element along a shared edge or axis. An
unaligned element reads as an accident even when nothing else about it is wrong, because the
eye notices the broken line before it notices anything else.

## 5. Repetition and consistency

The same kind of element should look and behave the same way everywhere it appears. A button
that changes shape, colour or spacing from screen to screen breaks a promise the interface made
the first time that element appeared, and forces the user to relearn something they already
knew.

## 6. Affordance

A visual cue should tell a user what an element can do before they interact with it. A button
that does not look pressable, or a static label that looks like a link, is an affordance
failure: the interface is lying about what is and is not actionable.

## 7. Feedback

A system should show, immediately and clearly, that an action was received and what happened as
a result. A button with no pressed, loading or confirmed state leaves a user unsure whether
anything happened at all, which is a feedback failure distinct from any visual styling issue.

## 8. Whitespace and breathing room

The empty space around and between elements is not wasted space, it is what lets grouped
elements read as a group and separate elements read as separate. Cramped spacing is a specific,
fixable problem, not a vague sense that a screen feels busy.

## 9. Similarity

Elements that share a visual property (colour, shape, size) are read by the eye as belonging to
the same category, even when nothing else states that relationship. Two unrelated states
sharing the same colour, or two related items styled completely differently, are similarity
problems with a specific styling fix.

## 10. Balance

The visual weight of elements should be distributed in a way that matches their actual
importance, not left to fall wherever they were placed. A heavy, dark block competing with a
lightweight primary action for attention is a balance problem, checkable by comparing the two
elements directly rather than judging the page as a whole.

## How to use this file

When writing a PRINCIPLE line, pick exactly one entry above by its name. If an observation
seems to touch two principles at once, split it into two separate observation, principle,
suggestion blocks rather than naming both principles in one block.
`;

const meta: SkillMeta = {
  slug: "design-critique-structure-skill",
  name: "Design Critique Structure",
  title: "Design Critique Structure Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that forces every piece of design feedback through observation, principle and suggestion, and refuses to give feedback that never names a design principle.",

  seo: {
    primaryKeyword: "design critique structure skill",
    keywords: [
      "design critique structure skill",
      "free ai skill for design critique",
      "downloadable design feedback checklist",
      "structured design critique guide for ai assistant",
      "ai skill for ui design feedback",
    ],
    seoTitle: "Design Critique Structure Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable design critique structure skill that turns vague opinions into observation, principle and suggestion feedback tied to ten design principles.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/design-principles.md", content: DESIGN_PRINCIPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to critique a screen or a mockup, models default to fluent, taste based reactions such as this feels cluttered or the layout seems off, phrased with confidence but tied to no named design principle a reviewer can check or teach from. This skill forces every point through an observation, a named principle and a specific suggestion, so a judgment either survives that structure or gets dropped rather than passed off as settled feedback.",
  },

  article: {
    intro: [
      "A design critique structure skill only earns its name if it can tell the difference between a checkable judgment and a taste based reaction dressed up as one. Ask most models to critique a screen and they will happily say a layout feels cluttered or a button seems off, phrasing that sounds like feedback but gives a designer nothing to act on, agree with or push back against. This skill exists to replace that shortcut with something built to be checked.",
      "It ships as two plain text files: a main instructions file that defines the observation, principle, suggestion structure, and a reference file naming ten specific design principles the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant or a teammate receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why unattributed opinions are not feedback",
        body: [
          "\"I don't like this\" or \"this feels off\" carries no information a designer can use. It cannot be checked against anything, it cannot be taught to a junior reviewer, and it cannot be argued with, because there is nothing underneath it to disagree with. A model asked for a general opinion on a screen will produce exactly this kind of statement, fluently and at length, and none of it moves a file forward.",
          "That is the difference between a free ai skill for design critique worth trusting and one that just sounds confident. This skill's first rule is that every point of feedback must trace to a named principle, or it does not get said as if it were settled.",
        ],
      },
      {
        heading: "The observation, principle, suggestion structure",
        body: [
          "Every piece of feedback this skill produces has exactly three parts, in order. First, an observation: a concrete, specific statement of what is actually there, a measurement or a relationship between two elements, never a feeling. Second, a principle: the specific named design concept the observation relates to, drawn from the reference file rather than invented on the spot. Third, a suggestion: one concrete change, expressed in terms of size, spacing, colour or grouping.",
          "Skipping the middle step is exactly what this skill exists to prevent. An observation with no named principle behind it is an opinion wearing the shape of an argument, and a suggestion with no principle behind it is a guess that happens to sound specific.",
        ],
      },
      {
        heading: "A worked example of the structure in practice",
        body: [
          "Take a settings screen where a destructive \"Delete account\" button is styled identically to a neutral \"Save changes\" button beside it, same size, same weight, same shade of grey. A vague critique would say the buttons look confusing. This skill's structure instead produces: OBSERVATION, the delete and save buttons share identical size, weight and colour with no visual distinction between them. PRINCIPLE, similarity, since two elements sharing a visual property are read by the eye as belonging to the same category regardless of their actual consequence. SUGGESTION, give the delete action a distinct colour role (a warning tone) and move it further from the save action so proximity does not also imply they are equivalent choices.",
          "Notice the suggestion draws on two principles, similarity and proximity, which is why the skill's instructions require splitting a two principle observation into two separate blocks rather than folding both into one paragraph that names neither cleanly.",
        ],
      },
      {
        heading: "The ten principles behind every judgment",
        body: [
          "The reference file that ships with this skill is a downloadable design feedback checklist naming ten specific, checkable principles: visual hierarchy, contrast, proximity, alignment, repetition and consistency, affordance, feedback, whitespace, similarity and balance. Each one is written with a short definition and what to actually check for, so a PRINCIPLE line always points at something real rather than a term picked because it sounded appropriate.",
          "Keeping the ten principles in their own file rather than folded into the main instructions means the checklist can be extended later, or a specific principle looked up mid review, without restructuring the process instructions that point to it.",
        ],
      },
      {
        heading: "What this skill refuses to do",
        body: [
          "It refuses to call a design \"clean\" or \"modern\" without naming what specifically produces that read, since both words describe a reaction, not an observation. It refuses to soften a real, checkable problem into vague reassurance about how a design mostly works. It refuses to invent a principle that is not one of the ten named ones, and it refuses to guess at a goal or an audience it was never given, asking for that information instead of proceeding on an assumption.",
        ],
      },
      {
        heading: "Using this as a structured design critique guide for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file explicitly points to the reference file by its relative path. Keep the folder structure intact (SKILL.md alongside a reference folder) so that reference stays reachable. As an ai skill for ui design feedback, it works equally well on a single screen, a specific design decision like a colour choice, or a short flow, as long as each block of feedback is still built around one observation at a time.",
        ],
      },
    ],
    howTo: {
      name: "How to use the design critique structure skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/design-principles.md directly on this page before downloading, so you know exactly what structure you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Describe the design and the goal",
          text: "Give your assistant the screen, mockup or decision to review along with what it is supposed to achieve and who uses it, so every judgment has something real to be measured against.",
        },
        {
          name: "Check every point for all three parts",
          text: "Read each returned block for an observation, a named principle and a suggestion. Push back on anything missing the middle step rather than accepting it as settled feedback.",
        },
      ],
    },
    faq: [
      {
        question: "Does the design critique structure skill work for a single design decision or only full screens?",
        answer:
          "Both. A single decision, such as a colour choice or a button style, gets the same three part treatment as a full screen: one observation about that specific decision, the principle it relates to, and one suggestion, rather than being folded into a general comment about the whole design.",
      },
      {
        question: "What happens if the model cannot name a principle for something it noticed?",
        answer:
          "The instructions require it to either keep looking until a real principle applies, or explicitly label the point as a personal preference kept separate from principle backed feedback. It is never allowed to state an unattributed reaction as if it carried the same weight as a checked observation.",
      },
      {
        question: "Can this skill also point out what is working well, not just problems?",
        answer:
          "Yes, and the same structure applies. A strength should still be stated as an observation tied to a named principle, for example noting that a strong contrast ratio between text and background supports the contrast principle, rather than a bare compliment with nothing checkable behind it.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no description of a design you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
      {
        question: "Why does the skill split the principles into a separate reference file?",
        answer:
          "Keeping the ten named principles in their own file lets the main instructions stay focused on the observation, principle, suggestion process, while the checklist itself can be extended with further principles later without restructuring the process file that points to it.",
      },
    ],
    internalLinks: [
      {
        href: "/design-prompts/design-critique-prompt",
        label: "design critique prompt",
        description: "For a single one-off critique pass written as prose, rather than a reusable downloadable structure with a named principle behind every point.",
      },
      {
        href: "/design-prompts/accessibility-audit-prompt",
        label: "accessibility audit prompt",
        description: "A natural follow-up pass once the contrast principle flags an issue, checked against a real accessibility standard rather than a general critique.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description: "For establishing the shared rules a repetition and consistency principle observation gets checked against across an entire product.",
      },
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description: "Confirms a contrast principle observation against a real measured ratio rather than a visual guess.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/gestalt-proximity/",
        label: "Nielsen Norman Group: Proximity Principle in Visual Design",
        description: "An independent explainer of the proximity principle this skill's structure requires a critique to name specifically, rather than describe vaguely.",
      },
      {
        href: "https://lawsofux.com/",
        label: "Laws of UX",
        description: "A reference collection of the named design and psychology principles a PRINCIPLE line in this skill's structure can draw on.",
      },
      {
        href: "https://ixdf.org/literature/topics/visual-hierarchy",
        label: "Interaction Design Foundation: Visual Hierarchy",
        description: "Background on how hierarchy is established through size, contrast and position, one of the ten principles named in this skill's reference file.",
      },
      {
        href: "https://webaim.org/articles/contrast/",
        label: "WebAIM: Contrast and Color Accessibility",
        description: "A measured, checkable standard for the contrast principle, useful for grounding a contrast observation in a real ratio rather than an impression.",
      },
    ],
  },

  tags: ["design", "critique", "feedback", "ui review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
