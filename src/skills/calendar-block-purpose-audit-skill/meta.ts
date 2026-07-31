import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Calendar Block Purpose Audit

Use this skill when handed a real list of a person's calendar time blocks for a period,
each with its label and time, as actually written on the calendar or exported from it, and
asked to check whether every block's label actually says what will happen during it. This
skill audits every kind of block, not meetings alone: a block called "focus time" or "admin"
gets exactly the same scrutiny as a block called "budget sync with Priya".

## What this skill does not do

It does not decide whether a recurring meeting should keep its permanent slot on the
calendar or move to an async update instead, and it does not compare two or more meetings
against each other to find redundant coverage of the same ground. Both of those are real,
separate jobs handled by their own skills. This skill looks at one block at a time, in
isolation, purely at the level of its label, and asks only whether that label states a
specific purpose. It does not judge whether the block should exist, whether it runs too
long, or whether it clashes with something else on the calendar.

## The test: specific or vague

For every block, quote its label exactly as written, then run it against one question: if
someone read this label with no other context, could they say what artifact or outcome
should exist once the block ends. A label passes as SPECIFIC when it names a concrete
action tied to a checkable output: draft the Q3 budget doc, send the renewal terms email,
review the landing page draft before it goes to legal. A label is VAGUE when it is a
placeholder that could describe almost anything happening in that slot: "focus time",
"misc", "catch up", "work block", "prep", "planning", "admin", "sync".

Mark every single block SPECIFIC or VAGUE. Do not mark a block SPECIFIC because it names a
project without naming an action taken on that project. "Q3 budget" alone is vague; "draft
Q3 budget doc" is specific. A label naming a person without naming what happens with that
person is also vague: "Priya" alone tells nobody what the block produces, while "call Priya
to confirm the renewal terms" does.

## Never invent the missing purpose

When a block comes back VAGUE, do not guess what the person probably meant to do in it and
do not fill in a plausible sounding purpose so the audit looks complete. State plainly that
the label gives no real signal of what will happen, and ask the person directly what the
block was actually for or is intended to be for. Only record a purpose for a VAGUE block
once the person supplies it themselves, and mark that supplied purpose as coming from the
person, not from the original label, so nobody later mistakes it for what the calendar
actually said.

## Output shape

For each block, in the order it appears on the calendar, give three things: the exact label
quoted, the verdict SPECIFIC or VAGUE, and one line of reasoning that traces directly to the
test above rather than a general impression. Do not summarize several blocks into one
verdict, and do not skip a block because it looks similar to one already marked. Two blocks
with the identical label still each get their own line, since a repeated vague label is
worth surfacing as often as it occurs, not collapsed into a single mention.

## Applies to every block type, not meetings alone

A solo focus time block with no further detail is exactly as vague as a meeting titled
"sync", and this skill treats them identically. Do not exempt a block from the test because
it has no other attendee, because it is unpaid personal time, or because it recurs every
day. The purpose of a block, not who else is on it, is what this skill checks. When the full
audit is done, close with a short count: how many blocks were SPECIFIC, how many were VAGUE,
and the exact labels still waiting on a real purpose from the person.
`;

const REFERENCE_MD = `# Worked example: one week, six calendar blocks

This is a worked example of the calendar block purpose audit skill run against a real
looking week. Use it to see the expected shape of an audit before running one on a real
calendar export. Every label below is quoted exactly as it appears on the calendar, in the
order it was scheduled.

## The six blocks

1. Monday, 9:00 to 10:30, labeled "Draft Q3 budget doc"
2. Monday, 13:00 to 15:00, labeled "Focus time"
3. Tuesday, 11:00 to 11:30, labeled "Call with Maria re: contract renewal terms"
4. Wednesday, 10:00 to 12:00, labeled "Misc"
5. Thursday, 9:00 to 9:30, labeled "Catch up"
6. Friday, 14:00 to 15:30, labeled "Review landing page copy draft before it goes to legal"

## The audit

**Block 1. Label: "Draft Q3 budget doc". Verdict: SPECIFIC.**
Reasoning: names a concrete action, draft, tied to a named, checkable artifact, the Q3
budget doc. Anyone reading this label knows exactly what should exist by 10:30 on Monday: a
draft of that document, in whatever state it reached.

**Block 2. Label: "Focus time". Verdict: VAGUE.**
Reasoning: "focus time" is a placeholder that could describe almost any task at all. It
names a mode of working, not an outcome. Two hours of focus time could have gone to the
budget doc, to email, or to nothing that leaves a trace. Do not guess which. Ask: what was
this block actually for, or what is it intended for going forward?

**Block 3. Label: "Call with Maria re: contract renewal terms". Verdict: SPECIFIC.**
Reasoning: names a specific person, a specific action, call, and a specific subject,
contract renewal terms, narrow enough that a listener would know what should have been
decided or moved forward by 11:30.

**Block 4. Label: "Misc". Verdict: VAGUE.**
Reasoning: "misc" is the plainest possible placeholder. It gives no signal whatsoever about
what happened in those two hours. Ask directly what filled this block rather than assuming
it was low value simply because the label is thin.

**Block 5. Label: "Catch up". Verdict: VAGUE.**
Reasoning: "catch up" names neither a person nor an artifact nor an action with a checkable
result. It could mean reading email, a hallway conversation, or reviewing a document. Ask
what this thirty minutes was actually spent on before treating it as accounted for.

**Block 6. Label: "Review landing page copy draft before it goes to legal". Verdict:
SPECIFIC.**
Reasoning: names the action, review, the artifact, the landing page copy draft, and the
checkable condition that closes the loop, before it goes to legal. A reader knows exactly
what should be true once this block ends.

## The closing count

Three blocks SPECIFIC: block 1, block 3, block 6. Three blocks VAGUE: block 2, block 4,
block 5. The three vague labels still waiting on a real purpose from the person are "Focus
time", "Misc", and "Catch up". None of those three purposes should be invented by an
assistant running this audit; each one gets asked about directly, by name, and the answer
gets attributed to the person, not folded back into the calendar as if the label had said it
all along.

## Why the six dimensions in the main file matter here

Notice that two of the vague labels, "Misc" and "Catch up", are the kind of label a person
writes when scheduling in a hurry, while "Focus time" is the kind written deliberately as a
placeholder for open ended work. Both failure modes get the same VAGUE verdict, because the
test in \`SKILL.md\` is about what the label communicates to a third party, not about why the
label ended up thin.
`;

const meta: SkillMeta = {
  slug: "calendar-block-purpose-audit-skill",
  name: "Calendar Block Purpose Audit",
  title: "Calendar Block Purpose Audit Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks every block on a calendar, meetings and solo focus time alike, against one test: does the label state a specific, checkable purpose or is it a vague placeholder, and asks the person for the real purpose rather than inventing one.",

  seo: {
    primaryKeyword: "calendar block purpose audit skill",
    keywords: [
      "calendar block purpose audit skill",
      "free ai skill for calendar block audit",
      "downloadable calendar time block checklist",
      "ai skill to check calendar block labels",
      "vague calendar label checklist for ai",
    ],
    seoTitle: "Calendar Block Purpose Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable calendar block purpose audit skill that quotes each label, flags vague placeholders, and asks for the real intended purpose instead of guessing.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example-week.md", content: REFERENCE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a calendar for wasted time tend to treat a thin label like focus time or catch up as already accounted for, since the block has a name and a duration and looks complete at a glance. A calendar block purpose audit skill forces every label through a specific-or-vague test instead of a glance, and requires the skill to ask the person for the real purpose behind a vague label rather than inventing a plausible one to fill the gap.",
  },

  article: {
    intro: [
      "A calendar block purpose audit skill only earns its name if it looks at every block on a calendar, not just the ones with other people invited. A block called focus time or misc gets scheduled just as often as a block with a named attendee list, and it hides just as much: neither one tells a reader what should exist once the time is up. This skill exists to catch the difference between a label that actually says what will happen and a label that is a placeholder wearing a time slot.",
      "It ships as two plain text files: a main instructions file and a worked reference example showing six real calendar blocks, three marked specific and three marked vague, each with the reasoning behind the flag written out. Both are previewable in full on this page before you download the zip, and both are exactly what an assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why every block deserves the same scrutiny as a meeting",
        body: [
          "Most calendar review treats meetings as worth checking and solo blocks as already settled, since nobody else's time is on the line. That split misses the actual failure: a two hour block called focus time gives exactly as little signal as a meeting called sync would, and both get scheduled just as casually. This skill applies one test to every block regardless of who else is on it.",
          "A vague label is not evidence that the time was wasted, but it is evidence that nobody can currently say what it was for, and a calendar block purpose audit skill exists to close that gap before assuming either answer.",
        ],
      },
      {
        heading: "The specific versus vague test",
        body: [
          "Every label gets quoted exactly as written, then run against one question: could a stranger reading it name the artifact or outcome that should exist once the block ends. A specific label names a concrete action tied to a checkable result, draft the doc, send the email, review the copy before it goes to legal. A vague label is a placeholder that could describe almost any task at all: focus time, misc, catch up, prep, admin, sync.",
          "A project name alone does not clear the bar. Q3 budget names a subject, not an action, and stays vague until it becomes draft Q3 budget doc, the same discipline an ai skill to check calendar block labels has to hold across a whole week.",
        ],
      },
      {
        heading: "How the audit reads out, block by block",
        body: [
          "Each block gets three things in the output: its exact label in quotes, the verdict SPECIFIC or VAGUE, and one line of reasoning tracing back to the test itself. Two blocks that share an identical label each still get their own line, since a label like catch up repeated three times across a week is worth surfacing three times, not folded into one mention.",
          "The audit closes with a short count: how many blocks were specific, how many were vague, and the exact vague labels still waiting on a real purpose. That count is what turns a downloadable calendar time block checklist into something a person can act on the same day, not a list to file away.",
        ],
      },
      {
        heading: "Never invent the missing purpose",
        body: [
          "When a label comes back vague, the instructions forbid guessing what the person probably meant and writing that guess in as if it were the real purpose. The skill states plainly that the label gives no signal, then asks the person directly what the block was actually for. Only once the person answers does a purpose get recorded, marked as coming from the person, not from the original calendar entry.",
          "A free ai skill for calendar block audit that quietly fills in a plausible sounding purpose for every vague block would produce a tidy looking report that is mostly fiction, and a tidy fiction is worse than an honest gap.",
        ],
      },
      {
        heading: "How this differs from auditing meetings themselves",
        body: [
          "Two related skills on this site look at meetings from a different angle. One asks whether a single recurring meeting still needs to be live rather than async, based on whether real time decisions or collaborative work happen inside it. The other compares two or more meetings against each other to find whether they cover the same ground and duplicate each other's purpose. Neither one looks at one block's label in isolation, and neither one covers a solo block with no other attendee.",
          "This skill starts upstream of both: before deciding whether a meeting should exist or whether it duplicates another one, it establishes whether the label describing any block, meeting or otherwise, says anything checkable at all. A meeting audit run against a vague label is an audit run on a guess.",
        ],
      },
      {
        heading: "Using the files as a vague calendar label checklist for ai",
        body: [
          "Hand both files to an assistant together, since the main instructions file points to the worked reference example by its relative path. Supply the assistant with the real calendar export or written schedule for the period you want checked, in whatever format you actually have it in, rather than a summary of it.",
        ],
      },
    ],
    howTo: {
      name: "How to use the calendar block purpose audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example-week.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Export the real calendar blocks",
          text: "Pull the actual list of time blocks for the period you want checked, with their real labels and times, from your calendar or a written schedule, rather than summarizing it from memory.",
        },
        {
          name: "Hand the export and both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then ask for every block to be marked specific or vague with reasoning.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill only check meeting labels?",
        answer:
          "No. It checks every block on a calendar, including solo focus time, admin blocks and personal time, against the same specific-or-vague test. A block with nobody else invited is not exempt just because no other person's time depends on it.",
      },
      {
        question: "What happens when a label comes back vague?",
        answer:
          "The skill does not guess what the block was for. It states plainly that the label gives no real signal, then asks the person to supply the actual purpose, marked afterward as coming from the person, not the original label.",
      },
      {
        question: "How is this different from an audit of recurring meetings?",
        answer:
          "A recurring meeting audit asks whether one meeting still needs to be live rather than async. This skill never asks whether a block should exist. It only checks whether the label already on the calendar states a specific, checkable purpose, for any block, not meetings alone.",
      },
      {
        question: "How is this different from checking meetings for redundancy?",
        answer:
          "A redundancy check compares meetings against each other to see whether they cover the same ground. This skill looks at one block at a time and never compares it to another. A label can be specific and still duplicate another meeting; that comparison is a separate skill's job.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about your calendar data is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor afterward.",
      },
      {
        question: "Why does a project name by itself count as vague?",
        answer:
          "Because it names a subject without naming an action. Q3 budget tells nobody whether the block was for drafting, reviewing or discussing the budget, while draft Q3 budget doc names a specific, checkable action.",
      },
      {
        question: "What does the closing count at the end of an audit include?",
        answer:
          "A tally of how many blocks were specific, how many were vague, and the exact vague labels still waiting on a real purpose, so the audit ends in a usable list, not a pile of verdicts to reread.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/recurring-meeting-audit-skill",
        label: "recurring meeting audit skill",
        description: "For deciding whether a single recurring meeting still needs to be live, a different question from whether its calendar label is specific.",
      },
      {
        href: "/skills/productivity-skills/meeting-cadence-audit-skill",
        label: "meeting cadence audit skill",
        description: "For finding redundant coverage between two or more meetings sharing attendees, rather than checking any one block's label in isolation.",
      },
      {
        href: "/skills/productivity-skills/weekly-review-structure-skill",
        label: "weekly review structure skill",
        description: "A natural next step once vague blocks are resolved, for checking a week's actual outcomes against what was promised the week before.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description: "For a one-off narrative audit of where a period's hours went, rather than a reusable per-block specific-or-vague checklist.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.todoist.com/productivity-methods/time-blocking",
        label: "Todoist: Time Blocking",
        description: "An independent explainer of time blocking as a scheduling method, the practice that produces the kind of labeled blocks this skill audits.",
      },
      {
        href: "https://asana.com/resources/what-is-time-blocking",
        label: "Asana: What Is Time Blocking",
        description: "A further explanation of how blocks get labeled and scheduled, useful background for anyone assembling a real calendar export to audit.",
      },
      {
        href: "https://www.mindtools.com/a4wo118/smart-goals",
        label: "MindTools: SMART Goals",
        description: "An independent standard for what makes a stated goal specific and checkable, the same underlying discipline this skill applies to a calendar label.",
      },
      {
        href: "https://www.betterup.com/blog/time-blocking",
        label: "BetterUp: Time Blocking",
        description: "A further look at how vague versus specific scheduling habits affect whether time blocks translate into real output.",
      },
    ],
  },

  tags: ["productivity", "calendar", "time blocking", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
