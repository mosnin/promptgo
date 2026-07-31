import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Meeting Follow-Up Completion Check

Use this skill when you have two real documents in hand: a list of commitments recorded
from a past meeting, who said they would do what and by when, and a later status update, an
email, the notes from a following meeting, or a chat message, that is supposed to report on
what happened since. The skill checks every original commitment against the later update and
assigns one of four honest verdicts. It never assumes a commitment was completed just because
nobody brought it up again.

## What you need before running this

Two real documents, not a paraphrase of either.

1. The original commitment list, exactly as it was recorded at the time, naming who committed
   to what and by when. This skill does not judge whether that original list was well formed;
   it assumes the commitments exist and checks what happened to them.
2. The later update, the actual text of the email, meeting notes, or chat message that is
   supposed to report on progress since. It must be real text you can quote from, not a
   summary someone gave you of what the update said.

If either document is missing, say so and stop. A completion check run against a memory of
what an update probably said is not a completion check.

## The four verdicts

For every commitment in the original list, search the later update for any text that refers
to it, then assign exactly one of the following.

1. CONFIRMED DONE. The later update contains explicit text stating the specific work was
   completed, with enough concrete detail (what was delivered, to whom, when) that the claim
   is checkable. Quote the confirming text exactly.
2. STILL OPEN OR BLOCKED. The later update explicitly states the commitment has not been
   finished, is in progress, or is blocked on something. Quote that text exactly.
3. CLAIMED DONE, NOT SUPPORTED. The later update asserts the commitment is finished using a
   bare word like "done," "handled," or "sorted," but supplies no checkable detail behind the
   claim, no artifact, no recipient, no date, nothing a skeptical reader could verify. Quote
   the bare claim and name exactly what evidence is missing.
4. SILENTLY DROPPED. The commitment is never mentioned again anywhere in the later update, in
   any form. State plainly that no matching text was found; do not describe this as the
   commitment being "presumably fine."

Never upgrade a SILENTLY DROPPED item to CONFIRMED DONE because it seems like the kind of
thing that would have gotten done, and never upgrade a CLAIMED DONE, NOT SUPPORTED item to
CONFIRMED DONE because the person reporting it is generally reliable. Each verdict traces only
to text that is actually present in the later update.

## How to check each commitment

Quote the original commitment exactly as recorded, then search the entire later update for
any reference to it, not just an obvious status line with the same person's name. Progress can
be folded into a paragraph, mentioned in passing, or buried in a longer update about several
things at once. Read the whole document before concluding a commitment was dropped.

When you find a match, quote it exactly and assign the verdict it supports. When a broad,
generic line like "everything is on track" or "great progress this week" is the only text
anywhere near the commitment, that is not confirmation of the specific commitment. It names no
particular deliverable, so it cannot verify one. Treat it the same as no mention at all.

## Why deadlines change the urgency of a flag

Compare the later update's date to each commitment's stated deadline. A commitment that is
SILENTLY DROPPED but whose deadline has not arrived yet is worth noting but not yet urgent; the
person may simply not be at that point yet. A commitment that is SILENTLY DROPPED and whose
deadline has already passed by the date of the later update is the most urgent category this
skill produces, because it means a promise with a due date came and went with nobody
accounting for it, and nobody in the room seems to have noticed.

## What this skill produces

For every original commitment, output the verdict, the exact quoted evidence (or the explicit
statement that none exists), and a needs follow-up flag. CONFIRMED DONE items with a genuinely
checkable quote do not need follow-up. Every CLAIMED DONE, NOT SUPPORTED item needs follow-up,
regardless of how confident the wording sounds. Every SILENTLY DROPPED item past its deadline
needs follow-up, marked urgent. STILL OPEN OR BLOCKED items need follow-up only if their
deadline has already passed.

## Not the same check as an action item ownership audit

This skill assumes the original commitment already had a real owner, a real date, and a real
described action when it was written down. Checking whether it had those things in the first
place is a different, earlier job, done by an action item ownership audit skill, which audits
a single list of commitments at the moment they are recorded and asks only whether each line
names who, what, and by when. That check happens once, on the day of the meeting, against one
document.

This skill starts one step later, often days or weeks later, once a second real document
exists: a status update, a follow-up meeting's notes, or a chat message written after the
deadline the original commitment specified. Its job is not whether the commitment was well
formed when written; it is whether the promised work is now confirmed done, confirmed still
open, claimed done without support, or never brought up again. A commitment can pass an
ownership audit completely, a named owner, a real date, a concrete action, and still fail this
skill's check weeks later if nobody ever actually confirms whether the work happened. The two
checks are complementary, not overlapping: run the ownership audit on the day commitments are
recorded, and run this completion check on every later update that claims to report on those
same commitments.

## What this skill refuses to do

It will not infer completion from silence, no matter how plausible completion seems. It will
not treat a generic positive tone in the later update as evidence for any specific commitment.
It will not round a bare "done" up to CONFIRMED DONE because the person reporting it usually
follows through. Every verdict traces to quoted text that is actually present in the later
update, and every gap is reported honestly as a gap.

Pair this file with \`reference/worked-example.md\`, which walks through four real-looking
commitments from one meeting and a later status update email, quoting exactly what the update
says about each one and showing the verdict and reasoning behind it.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking four commitments against a later status update

Use this alongside \`SKILL.md\`. Below is the original commitment list from a meeting, the
later status update that followed, and the completion check run against them.

## The original commitments, as recorded at the meeting

Meeting: "Q3 Website Redesign Kickoff," Monday, July 13.

1. "Dana will finalize the new homepage wireframes and share them with the team by Wednesday,
   July 15."
2. "Marcus will reach out to the hosting vendor about the migration timeline by Friday,
   July 17."
3. "Priya will draft the updated privacy policy language and send it to legal for review by
   Monday, July 20."
4. "Tom will set up the staging environment by Friday, July 17."

## The later status update, as actually sent

An email, sent Thursday, July 24, subject line "Redesign status, week of July 21."

"Hi all, quick update on where things stand.

Dana's wireframes are done, she shared the Figma link in the #redesign channel last Wednesday
and we walked through them in Monday's sync. Looks great.

Priya's policy stuff is handled.

Still waiting on hosting, Marcus flagged that the vendor hasn't responded to his email yet, so
the migration timeline is blocked until we hear back.

Let's regroup Friday.

Thanks,
Alex"

## The completion check

Commitment 1: "Dana will finalize the new homepage wireframes and share them with the team by
Wednesday, July 15."
- Matching text: "Dana's wireframes are done, she shared the Figma link in the #redesign
  channel last Wednesday and we walked through them in Monday's sync."
- Verdict: CONFIRMED DONE. The update names the specific deliverable, where it was shared, and
  that the team reviewed it, which is checkable detail rather than a bare assertion.
- Needs follow-up: no.

Commitment 2: "Marcus will reach out to the hosting vendor about the migration timeline by
Friday, July 17."
- Matching text: "Still waiting on hosting, Marcus flagged that the vendor hasn't responded to
  his email yet, so the migration timeline is blocked until we hear back."
- Verdict: STILL OPEN OR BLOCKED. The update explicitly states the work is not finished and
  names what it is blocked on.
- Needs follow-up: yes, its deadline of July 17 has already passed by the July 24 update, so
  the block itself is now worth escalating even though the item was never silently dropped.

Commitment 3: "Priya will draft the updated privacy policy language and send it to legal for
review by Monday, July 20."
- Matching text: "Priya's policy stuff is handled."
- Verdict: CLAIMED DONE, NOT SUPPORTED. The word "handled" asserts completion but supplies no
  checkable detail: no confirmation the draft was actually sent to legal, no date, no
  reviewer named, unlike commitment 1, which names the channel, the day, and the meeting where
  it was reviewed. A bare adjective is not evidence.
- Needs follow-up: yes, confirm directly with Priya whether legal actually received the draft.

Commitment 4: "Tom will set up the staging environment by Friday, July 17."
- Matching text: none found anywhere in the update.
- Verdict: SILENTLY DROPPED. Tom's name and the staging environment are never mentioned once
  in the entire email.
- Needs follow-up: yes, marked urgent. The stated deadline of July 17 is a full week before the
  July 24 update, and nobody in the update appears to have noticed the commitment was never
  addressed.

## What this worked example shows

Commitments 1 and 2 both get resolved honestly using the update's own words: one because the
detail behind "done" is real and checkable, the other because the update states plainly that
the work is blocked rather than pretending it is finished. Commitment 3 shows why a bare "done"
is treated differently from a detailed one; the same intended meaning, work is complete, reads
very differently once you ask what evidence actually backs it up. Commitment 4 shows the
category a weaker check would miss entirely: nothing in the update is false, nothing
contradicts the original commitment, the commitment simply never comes up again, and only
checking every original line one by one against the full later text catches that.

## The mistake this skill exists to prevent

A weaker read of this same email might conclude the redesign is broadly on track since three
of the four updates sound positive or in-progress, and quietly assume Tom's staging
environment is probably fine since nothing suggests otherwise. Nothing in the email suggests it
is fine either. The honest output is that a commitment with a passed deadline was never
mentioned, which is precisely the gap this skill is built to surface rather than paper over
with an assumption of quiet success.

## Using this worked example

When applying \`SKILL.md\` to your own commitment list and later update, quote each original
commitment exactly, then search the full later text for anything referring to it, not just an
obvious status line. Assign one of the four verdicts based only on what the later text actually
says, compare each deadline to the update's own date, and flag every CLAIMED DONE item with no
real support and every SILENTLY DROPPED item past its deadline as needing follow-up.
`;

const meta: SkillMeta = {
  slug: "meeting-follow-up-completion-check-skill",
  name: "Meeting Follow-Up Completion Check",
  title: "Meeting Follow Up Completion Check Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks each commitment from a past meeting against a later status update, confirmed done, still open, claimed done with no support, or silently dropped, and never assumes silence means completion.",

  seo: {
    primaryKeyword: "meeting follow up completion check skill",
    keywords: [
      "meeting follow up completion check skill",
      "free ai skill for meeting follow up",
      "downloadable meeting commitment tracker",
      "ai skill to check meeting commitments were done",
      "how to audit a status update against meeting commitments",
    ],
    seoTitle: "Meeting Follow Up Completion Check Skill: Free Download",
    seoDescription:
      "A free, downloadable meeting follow up completion check skill that checks each commitment against a later status update instead of assuming silence means it's done.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given an original commitment list and a later status update, models reliably treat a commitment that is never mentioned again as though it were quietly finished, since the update overall reads as positive and nothing contradicts it. A second common failure is accepting a bare word like done or handled as proof on its own, without checking whether the update actually names what was delivered, to whom, or when. This skill's four verdict test forces every completed claim to trace to checkable quoted text and requires a commitment that simply never comes back up to be reported as dropped rather than assumed fine.",
  },

  article: {
    intro: [
      "A meeting follow up completion check skill only earns its name if it refuses the easiest shortcut available: assuming whatever isn't mentioned again in a later update must have quietly gotten done. Handed a list of commitments from a past meeting and a later status update, most AI assistants read the update's overall positive tone and extend that goodwill to every commitment, including the ones it never actually addresses. This skill is built to stop that.",
      "The mechanism is a four verdict test run against every original commitment, using only text present in the later update. A commitment is CONFIRMED DONE when the update names checkable detail, STILL OPEN OR BLOCKED when the update says so directly, CLAIMED DONE, NOT SUPPORTED when a bare word like done carries no evidence, or SILENTLY DROPPED when it is never mentioned again. Nothing is marked complete on the strength of an assumption.",
      "It ships as two plain text files, a main instructions file and a worked example that runs the test against four real-looking commitments from one meeting and the status update email that followed. Both are previewable in full before you download the zip.",
    ],
    sections: [
      {
        heading: "Why a positive-sounding update hides a dropped commitment",
        body: [
          "A status update that opens with good news and closes with a plan to regroup reads as though everything is under control, and a commitment that never appears anywhere in between is easy to read as simply not worth mentioning because it went fine. Built as a free ai skill for meeting follow up rather than a general summariser, this skill treats that resemblance as the exact risk it exists to catch.",
          "The gap only shows up when every commitment is checked individually against the full later text, rather than judged on overall tone. A cheerful update with three good items says nothing about a fourth item it never mentions.",
        ],
      },
      {
        heading: "The four verdicts, not three",
        body: [
          "Most attempts at this kind of check settle for three outcomes: done, not done, and dropped. This skill adds a fourth on purpose, since a commitment marked done in words alone is a distinct failure mode from one genuinely done. CLAIMED DONE, NOT SUPPORTED covers an update that says handled with nothing checkable behind it, no artifact, no date, no recipient.",
          "As an ai skill to check meeting commitments were done, the test does not accept the word for the fact. A claim has to carry evidence a skeptical reader could verify before it earns CONFIRMED DONE.",
        ],
      },
      {
        heading: "How to audit a status update against meeting commitments line by line",
        body: [
          "Every original commitment is quoted exactly as recorded, then the entire later update is searched for anything referring to it, not only an obvious status line naming the same person. Progress is often folded into a paragraph about several things at once, so reading the full update matters more than scanning for a name.",
          "A generic line like everything is on track is never treated as confirmation for a specific commitment, because it names no deliverable and cannot verify one. It is handled the same as no mention at all.",
        ],
      },
      {
        heading: "Why a passed deadline changes what silence means",
        body: [
          "A downloadable meeting commitment tracker earns its keep by weighing urgency correctly, not just detecting a gap. A SILENTLY DROPPED commitment whose deadline has not arrived yet is noted but not urgent. One whose deadline already passed by the date of the later update is this skill's most urgent output, because a promise with a due date came and went unnoticed.",
        ],
      },
      {
        heading: "Not the same check as an action item ownership audit",
        body: [
          "An action item ownership audit skill checks whether a commitment had a real owner, a real date, and a real described action at the moment it was written down, a single check run once, on the day of the meeting, against one document. This skill assumes that earlier check already happened and starts a different job one step later.",
          "This skill runs against a second real document, a status update, a follow-up meeting's notes, or a chat message written after the deadline, and asks only whether the promised work is now confirmed done, confirmed open, claimed without support, or never brought up again. A commitment can pass the ownership audit completely and still fail this check weeks later if nobody confirms the work happened, which is why the two are complementary rather than overlapping.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not infer completion from silence, however plausible that seems. It will not treat a positive tone as evidence for any one commitment, and it will not round a bare done up to a confirmed verdict because the person reporting it usually follows through. Every verdict traces to text present in the update.",
        ],
      },
      {
        heading: "Using the downloaded files together",
        body: [
          "Hand both files to a teammate or an AI assistant together, since the main instructions file points to the worked example by its relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link and gives a concrete standard to check real commitments against.",
        ],
      },
    ],
    howTo: {
      name: "How to use the meeting follow up completion check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you can see the four verdict test applied to four real commitments and a status update email.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the two real documents",
          text: "Collect the original commitment list exactly as recorded at the meeting, and the actual text of the later update, not a paraphrase of what either one said.",
        },
        {
          name: "Hand both files to your assistant and review the verdicts",
          text: "Keep the folder structure intact, then supply your commitment list and the later update, and check every needs follow-up flag before assuming a quiet commitment was handled.",
        },
      ],
    },
    faq: [
      {
        question: "What if the later update never mentions a commitment at all?",
        answer:
          "That commitment is marked SILENTLY DROPPED. The skill states plainly that no matching text was found, rather than assuming the work was probably fine because nothing contradicts it. If the deadline has already passed, the flag is marked urgent.",
      },
      {
        question: "How is CLAIMED DONE, NOT SUPPORTED different from CONFIRMED DONE?",
        answer:
          "CONFIRMED DONE requires checkable detail behind the claim, what was delivered, to whom, or when. CLAIMED DONE, NOT SUPPORTED covers a bare word like done or handled with no detail behind it. Both use the word done, but only one earns the confirmed verdict.",
      },
      {
        question: "Does a generally positive status update count as confirmation for every item in it?",
        answer:
          "No. A broad line like everything is on track names no specific deliverable, so it cannot confirm any one commitment. The skill treats a generic positive tone the same as no mention at all for any commitment it does not address.",
      },
      {
        question: "How is this different from an action item ownership audit skill?",
        answer:
          "An action item ownership audit skill checks whether a commitment had a real owner, date, and action when first written down, a single check on the day of the meeting. This skill runs later, against a second real document, checking whether the promised work is confirmed done, confirmed open, claimed without support, or dropped.",
      },
      {
        question: "What happens if a commitment's deadline hasn't arrived yet by the date of the update?",
        answer:
          "A commitment silently dropped before its own deadline is noted but not marked urgent, since the person may simply not be at that point yet. Urgency is reserved for commitments whose stated deadline has already passed by the date of the later update.",
      },
      {
        question: "Can this be used with a follow-up meeting's notes instead of an email?",
        answer:
          "Yes. The later update can be any real text meant to report on progress, an email, notes from a following meeting, or a chat message. The same four verdict test applies regardless of format, since it works from the actual quoted text either way.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the commitments or updates you use it with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/business-skills/action-item-ownership-audit-skill",
        label: "action item ownership audit skill",
        description: "For checking whether a commitment had a real owner, date, and action when it was first written down, a different, earlier check than this one.",
      },
      {
        href: "/skills/productivity-skills/meeting-decision-capture-skill",
        label: "meeting decision capture skill",
        description: "For checking whether a topic was actually resolved into a decision at the meeting itself, rather than tracking a later update against a commitment list.",
      },
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "task handoff skill",
        description: "For a broader account of a project's state and reasoning during a role transition, a different artifact from a single status update checked against past commitments.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description: "A one-off writeup that produces the original commitment list in the first place, a natural source document to run this skill's completion check against later.",
      },
    ],
    externalLinks: [
      {
        href: "https://en.wikipedia.org/wiki/Accountability",
        label: "Wikipedia: Accountability",
        description: "Explains why confirmation of an outcome, not merely the assignment of a task, sits at the center of organisational accountability.",
      },
      {
        href: "https://hbr.org/2017/07/stop-the-meeting-madness",
        label: "Harvard Business Review: Stop the meeting madness",
        description: "Documents how much of what a meeting produces never gets tracked through to a confirmed outcome, the exact gap this skill's four verdict test is built to close.",
      },
      {
        href: "https://www.indeed.com/career-advice/career-development/how-to-write-meeting-minutes",
        label: "Indeed: How to write meeting minutes",
        description: "Independent guidance on recording commitments precisely enough that a later reader can check what actually happened to each one.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific enough that a model quotes real source text rather than inferring a plausible-sounding answer, the same discipline this skill applies to completion checks.",
      },
    ],
  },

  tags: ["productivity", "meetings", "accountability", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
