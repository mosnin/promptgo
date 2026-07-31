import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Weekly Review Structure

Use this skill at the end of a work week to turn what actually happened into a
structured review, checked against what was promised the week before. This
skill does not plan the week ahead. It audits the week just finished, and its
entire value sits in one refusal: it will not let a review become a list of
activities disconnected from what was actually committed to.

## Before you write a single line: get last week's commitments

Ask for, or locate, the commitments written down at the end of the previous
review, the specific things that were said would happen this week. That is
the required input. A pile of raw activity (meetings attended, tickets
touched, messages sent) is not a substitute for it, because activity without
a prior commitment to check it against cannot be marked done or not done, it
can only be described.

If no prior commitments exist, because this is the first review or none were
recorded, say so plainly at the top of the output: "No prior commitments were
supplied. This is being run as a first review." Then proceed straight to the
four part structure below without inventing commitments that were never
actually made, and without silently skipping the accountability section as
though it did not apply. A first review states its own absence of a baseline
as a finding, not a footnote.

## The four part structure, in this order

Every review runs through exactly four sections, always in this order:

1. Completed
2. Not completed
3. What genuinely blocked it
4. Next week's commitments

Do not merge sections 2 and 3. What did not happen and why it did not happen
are different claims, and collapsing them lets a vague excuse stand in for a
specific blocker.

## The accountability check: closing the loop on last week's commitments

This is the section a generic activity summary always skips, and it is the
actual job of this skill. For every commitment listed in last week's "next
week's commitments" section, mark it exactly one of three ways:

- Done. Completed as stated. Name the evidence: what exists now that did not
  exist before.
- Not done. State this plainly rather than reframing it as in progress. If a
  real external blocker caused it, that blocker must also appear in section 3.
  If no real blocker existed, say that too.
- Carried over. Still relevant, not finished, restated in this week's
  commitments with a stated reason it will go differently this time. A
  carried over commitment that repeats word for word with no change is a
  warning sign, not a plan.

No commitment from last week is allowed to silently disappear from this
week's review. If a commitment is missing from the check, treat that as a
finding in itself and say so, because a commitment that vanished without
being marked done, not done, or carried over is exactly the failure mode this
skill exists to catch.

## Distinguishing a genuine block from an excuse

A genuine block is external and specific: another person's work you were
waiting on, a decision that had not been made yet, access you did not have,
a dependency that shipped late. Write down who or what, and when it changed.
"Got busy," "priorities shifted," or "ran out of time" are not blocks. They
describe the reviewer's own choices, and belong in the not completed section
stated as such, not dressed up as an external cause in section 3.

## What this skill refuses to do

It will not treat a list of meetings and tasks as equivalent to a review. It
will not invent commitments that were never stated, if none were supplied it
says so instead. It will not let an uncompleted commitment vanish from the
record. It will not accept a carried over commitment restated unchanged, with
nothing about what will be different this time.

## Using the review template

Pair this file with \`reference/review-template.md\`, which lays out the exact
section headers and fill in the blank structure for all four parts plus the
accountability check, so the output is consistent from week to week rather
than reinvented each time.
`;

const REVIEW_TEMPLATE_MD = `# Weekly review template

Use this alongside \`SKILL.md\`. Copy the structure below and fill in every
section for the week being reviewed. Do not remove the accountability check
even in a fast review, since that check is the entire point of this format.

## Header

- Week being reviewed: [dates]
- Prior commitments supplied: [yes, listing them below, or no, first review]

## 1. Accountability check against last week's commitments

If no prior commitments were supplied, write: "No prior commitments were
supplied. This is a first review, so there is nothing to check off yet." and
skip to section 2.

Otherwise, list every commitment from last week's "next week's commitments"
section and mark each one:

- Commitment: [exact text as it was written last week]
  Status: done / not done / carried over
  Evidence or reason: [what exists now, or what specifically blocked it, or
  what will be different this time if carried over]

Repeat one block per commitment. Do not summarise several commitments into
one line. Every single one gets its own status.

## 2. Completed

List what was finished this week that was not already covered as a done
commitment above. This section is for genuine completions, not restated
activity. Each line should be checkable: a stranger could confirm whether it
happened.

## 3. Not completed

List what did not happen this week, stated plainly, without a blocker
attached here. If a real external blocker exists, name it in section 4
instead and reference it from this line.

## 4. What genuinely blocked it

For each item in section 3 that had a real external cause, name the specific
block: who or what caused the delay, and when it is expected to resolve. If
an item in section 3 has no real block, say plainly that it was a choice, not
a blocker, and do not list it here.

## 5. Next week's commitments

List what is being committed to for the coming week, phrased as checkable
outcomes rather than activities. This list becomes the accountability check
input for next week's review, so write it the way you would want to read it
back in seven days: specific enough that done or not done is not debatable.

## Closing line

End the review with one sentence naming the single commitment most likely to
be carried over again, and why. Naming the repeat risk in advance is more
useful than discovering it after the fact.
`;

const meta: SkillMeta = {
  slug: "weekly-review-structure-skill",
  name: "Weekly Review Structure",
  title: "Weekly Review Structure Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that structures a weekly review into completed, not completed, real blockers and next commitments, and checks every item off against what was actually promised the week before rather than describing raw activity.",

  seo: {
    primaryKeyword: "weekly review structure skill",
    keywords: [
      "weekly review structure skill",
      "free ai skill for weekly reviews",
      "downloadable weekly review template",
      "ai skill for checking prior commitments",
      "weekly accountability review checklist",
    ],
    seoTitle: "Weekly Review Structure Skill: Free Download and Template",
    seoDescription:
      "A free weekly review structure skill that checks last week's stated commitments off as done, not done or carried over, instead of summarising raw activity.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/review-template.md", content: REVIEW_TEMPLATE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "When asked to run a weekly review, models reliably default to producing a generic activity summary: a list of meetings attended and tasks touched, organised by day rather than by outcome. Without a required prior commitments input and a forced done, not done or carried over check against each one, that summary reads as thorough while never actually confirming whether what was promised the week before got done. This skill's structure makes that check mandatory rather than optional, and requires the skill to say so plainly when no prior commitments exist instead of quietly skipping the section.",
  },

  article: {
    intro: [
      "A weekly review structure skill only earns the name if it checks a week's results against what was actually promised, not just what happened to occur. Most reviews, run by a person or drafted by an assistant, drift into a list of meetings and tasks touched, organised by day, that reads as thorough without ever confirming whether last week's stated commitments got done.",
      "This free ai skill for weekly reviews closes that gap by requiring last week's commitments as input, not an optional extra, then running each one through a forced check: done, not done, or carried over. If no prior commitments exist, it says so plainly and runs as a first review instead of skipping the accountability step.",
      "It ships as two plain text files: a main instructions file and a review template reference file laying out the exact section structure. Both are previewable in full on this page before download, and both are exactly what an AI assistant or a teammate receives once the archive is handed over.",
    ],

    sections: [
      {
        heading: "Why most weekly reviews are really just activity summaries",
        body: [
          "Ask most people, or most models, to write a weekly review and what comes back is a chronological account: Monday's meetings, Tuesday's tickets, Wednesday's fires. It looks complete because it is detailed, but detail about what occupied the week is not the same claim as whether the week delivered what it was supposed to.",
          "The missing ingredient is a baseline. Without last week's stated commitments sitting next to this week's account, there is nothing to check the activity against, so the review can only describe, never confirm. A weekly review structure skill exists specifically to force that baseline into the process rather than let it be optional.",
        ],
      },
      {
        heading: "The four part structure this skill runs every review through",
        body: [
          "Every review produced with this skill runs through the same four sections in the same order: completed, not completed, what genuinely blocked it, and next week's commitments. The order matters, because listing what was blocked before naming what did not happen invites vague excuses dressed up as causes.",
          "Sections two and three stay separate on purpose. What did not happen is a plain fact. Why it did not happen is a separate claim that needs its own evidence, and collapsing the two into one line is exactly how a soft excuse slips past a review unchallenged.",
        ],
      },
      {
        heading: "The accountability check: closing the loop on prior commitments",
        body: [
          "This is the section a generic activity summary always skips, and it is the actual mechanism of this downloadable weekly review template. Every commitment from last week's own next week's commitments section gets marked exactly one of three ways: done with named evidence, not done stated plainly, or carried over with a stated reason it will go differently this time.",
          "No commitment is allowed to quietly vanish between one week's review and the next. As an ai skill for checking prior commitments rather than raw output, its whole point is that a missing commitment is itself a finding, not an oversight to wave past. A carried over item repeated word for word with nothing changed is flagged as a warning sign rather than accepted as routine.",
        ],
      },
      {
        heading: "Telling a genuine blocker from an excuse",
        body: [
          "A genuine block is external and specific: someone else's unfinished work, a decision still pending, access that was not granted, a dependency that shipped late. The skill requires naming who or what caused the delay and when it is expected to resolve, so a block reads as a fact that can be followed up on rather than a mood.",
          "Phrases like got busy, priorities shifted, or ran out of time describe a choice, not a block, and this skill's instructions route them into the not completed section stated as such instead of dressing them up as an external cause.",
        ],
      },
      {
        heading: "How this differs from a weekly planning prompt",
        body: [
          "A weekly planning prompt on this site picks the outcomes for the week ahead and places them against a calendar that has not happened yet. This weekly review structure skill runs after the week is over, and its input is the opposite direction: it needs last week's already stated commitments, not this week's open calendar.",
          "The two are meant to run back to back. The planning prompt produces the exact commitments this skill later checks, and this skill's next commitments section feeds straight back into planning. Neither substitutes for the other; a plan with no later check is just an intention.",
        ],
      },
      {
        heading: "Running the first review, with no prior commitments to check",
        body: [
          "The first time this skill runs for a given person or team, there is no earlier commitments list to check against, and the skill is built to handle that honestly rather than pretend otherwise. It states plainly that no prior commitments were supplied, runs the review as a first review, and moves straight into the four part structure, so the format is established from week one even though the accountability check itself only begins to bite from week two onward.",
        ],
      },
    ],

    howTo: {
      name: "How to run the weekly review structure skill",
      steps: [
        {
          name: "Gather last week's stated commitments",
          text: "Find the exact next week's commitments list from the previous review. If none exists, note that plainly rather than inventing one, and treat this as a first review.",
        },
        {
          name: "Run the accountability check line by line",
          text: "Mark each prior commitment done, not done, or carried over, with named evidence or a stated reason, before writing anything about the current week's new activity.",
        },
        {
          name: "Fill in completed, not completed and blockers",
          text: "Work through the remaining three sections in order, keeping what did not happen separate from why, and naming only genuine external causes as blockers.",
        },
        {
          name: "Write next week's commitments as checkable outcomes",
          text: "Phrase each new commitment so that done or not done will not be debatable in seven days, since this list becomes next week's accountability check input.",
        },
      ],
    },

    faq: [
      {
        question: "What happens if I never wrote down commitments last week?",
        answer:
          "The skill says so plainly at the top of the output and runs the review as a first review, moving straight into the four part structure without inventing commitments that were never actually made. The accountability check itself only becomes meaningful from the second review onward, once a real baseline exists.",
      },
      {
        question: "How is this different from the weekly planning prompt on this site?",
        answer:
          "The planning prompt picks outcomes for the week ahead and places them against an open calendar, while this skill runs after the week ends and needs last week's already stated commitments as its required input. They are meant to be run back to back, with the planning step producing exactly what this skill later checks.",
      },
      {
        question: "What counts as a genuine blocker rather than an excuse?",
        answer:
          "A genuine blocker is external and specific, such as another person's unfinished work, a pending decision, or a dependency that shipped late, and the skill requires naming who or what caused it and when it is expected to resolve. Vague reasons like being busy or priorities shifting are routed into the not completed section instead, stated as a choice rather than dressed up as a cause.",
      },
      {
        question: "Can I use this for a team review instead of a personal one?",
        answer:
          "Yes, the four part structure and the accountability check work the same way whether the commitments belong to one person or a whole team, as long as the prior commitments list being checked against is the same one the team actually stated the week before, not a summary written after the fact.",
      },
      {
        question: "What if a commitment from last week is only partly done?",
        answer:
          "Mark it carried over rather than done, and restate it with a stated reason it will go differently this time. Running the four part output as a weekly accountability review checklist rather than a summary means a repeated commitment with no change is a warning sign, not something quietly accepted as routine.",
      },
      {
        question: "Does downloading or previewing this skill send anything to a server?",
        answer:
          "No. Both the file preview and the zip download happen entirely in your browser, and nothing about the commitments or reviews you eventually run this skill against is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description: "Plans the week ahead against an open calendar; run it first, then use this skill after the week ends to check what it produced.",
      },
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description: "Caps and ranks a backlog going forward, rather than checking whether last week's stated commitments actually got done.",
      },
      {
        href: "/productivity-prompts/focus-session-prompt",
        label: "focus session prompt",
        description: "Turns one of this skill's next week commitments into a single blocked session with a stopping rule.",
      },
      {
        href: "/business-prompts/one-on-one-meeting-prompt",
        label: "one on one meeting prompt",
        description: "A natural place to surface a carried over commitment this skill's accountability check flagged, with the person it affects.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.atlassian.com/team-playbook/plays/retrospective",
        label: "Atlassian Team Playbook: Retrospective",
        description: "A structured methodology for reviewing a completed period of work and turning findings into named action items.",
      },
      {
        href: "https://www.todoist.com/productivity-methods/weekly-review",
        label: "Todoist: The Weekly Review Method",
        description: "An independent explainer on running a weekly review as a recurring habit rather than an occasional catch up.",
      },
      {
        href: "https://rework.withgoogle.com/en/guides/set-goals-with-okrs",
        label: "Google re:Work: Set Goals with OKRs",
        description: "Google's own guide on checking stated goals at regular intervals rather than only at the end of a cycle.",
      },
    ],
  },

  tags: ["productivity", "weekly review", "accountability", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
