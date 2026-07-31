import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Async Standup Completeness Check

Use this skill when handed a team's real, agreed async standup format (the exact
fields the team has decided to report, such as yesterday, today and blockers) and
one or more submitted updates written against that format, and asked whether each
update actually fills every field with real content or is quietly running on
placeholder filler. This skill checks the quality of an update that is already
being written async. It does not decide whether a meeting should become async in
the first place, and it does not write updates for anyone.

## Before you check anything: get the team's real stated format

Ask for, or locate, the team's actual agreed field list: the exact field names
they report against, in the order they report them. Do not invent fields from a
generic idea of what a standup usually contains. One team's format might be
yesterday, today and blockers. Another team's might be shipped, focus, blocked
and help needed. A field this skill was not told about is not a field it can
check, and a field the team never agreed to is not one it should demand.

If no stated format is supplied, say so plainly and ask for it before reviewing
any update. Reviewing an update against an assumed format risks flagging a field
the team never asked for and missing one they did, which makes the whole review
worthless even when every individual judgment inside it looks reasonable on its
own.

## The checkable claim test: how to judge a single field

For every field in the stated format, read what the submitted update actually
wrote and ask one question: could someone other than the author confirm this,
dispute it, or act on it, exactly as written. That is the entire test, and
length is not part of it.

A field passes when it does one of these:

- Names a specific, verifiable thing: a task, a deliverable, a person, a
  number, a date or a duration that someone else could check against reality.
- Makes an explicit, plausible negative claim: "no blockers," "nothing
  finished since yesterday," "no changes to the plan." A stated absence is a
  real, checkable claim about the world, not an evasion of the question.

A field fails, regardless of how many words it uses, when it does this instead:

- Uses a generic verb with no object: "working on stuff," "handling things,"
  "making progress." Nothing named means nothing to confirm or dispute.
- Restates the field's own name without adding content: a today field that
  just says "today's tasks" or "the usual."
- Points elsewhere instead of stating current content: "same as before," "see
  yesterday." This forces a reader to reconstruct the current answer from
  history instead of being told it, which is a missing answer wearing a
  shortcut.

Quote the exact text of every field you flag. A judgment that says a field is
vague without quoting what was actually written cannot be checked by the
person reading your review, which defeats the purpose of the exercise.

## Brevity is not vagueness: do not confuse the two

The single most common mistake this skill exists to prevent is treating short
as if it meant incomplete. A two word answer that names a real, checkable fact
is a complete field. A twenty word answer that never names anything is not.
Word count is not a signal in either direction.

"No blockers" is a complete answer to a blockers field if there genuinely are
none. It is not an evasion, a placeholder, or a shortcut: it directly answers
the question the field asks, and it is a claim someone could dispute if it
were untrue. Do not flag a short field just because it is short. Flag it only
when, at whatever length, it fails the checkable claim test above.

Conversely, a long field can still fail. "Made really solid progress today on
a bunch of different things across a couple of areas" uses twenty words and
names nothing a reader could check. Length is not evidence of completeness in
either direction; only content is.

## Missing fields are a separate finding from vague fields

If the stated format has a field the submitted update leaves out entirely,
treat that as its own finding: missing, not vague. There is no text to quote,
and no content to judge for specificity, only an absence. Report it as a
missing field rather than folding it into the vague field findings, so the
person reading the review knows whether to ask for detail or to ask for the
field at all.

## Reviewing several days from the same person

When you have more than one day's updates from the same person, check each
day's fields individually against the checkable claim test first, exactly as
above. Then, only for fields that already failed that test on their own, note
whether the same failing phrase or a close variant recurs across multiple
days, since that is a useful signal that a field has become a standing
placeholder rather than a one off thin day. Do not use repetition on its own
to fail a field that already passed the checkable claim test: a person who
genuinely has no blockers for two straight weeks and writes "no blockers"
every day has not done anything wrong, and repeating a true, specific claim is
not filler.

## Writing up the review

For each submitted update, list every field from the stated format in order,
with a verdict of complete, vague, or missing, and for vague or missing fields
the exact quoted text or the note that the field was absent. Close with a
short summary naming which fields, if any, are recurring as placeholders
across multiple days, drawn only from fields that individually failed the
test, never from short fields that passed it.

Pair this file with \`reference/worked-examples.md\`, which walks a stated
three field format through a full week of one person's submitted updates,
including complete short answers, vague filler flagged with its exact text,
and the missing field case.

## What this skill refuses to do

It will not invent a team's field list from a generic idea of what a standup
should contain. It will not flag a field for being short when its content is
genuinely specific. It will not treat a stated, plausible absence like "no
blockers" as filler. It will not fold a missing field into the vague
findings, and it will not rewrite anyone's update: its job is to report what
is complete, what is vague, quoted exactly, and what is missing, and to leave
the fix to the person who owns the update.
`;

const WORKED_EXAMPLES_MD = `# Worked examples: one team's format, one week of updates

Use this alongside \`SKILL.md\`. The stated format below is the required input:
a real, agreed field list a fictional team named Atlas actually reports
against. None of the fields below were invented by this skill; they are given
exactly as a team would supply them.

## The stated format

Atlas's async standup has three required fields, reported once per weekday:

1. SHIPPED. What finished since the last update, stated so someone else could
   check it, or an explicit statement that nothing finished.
2. FOCUS. The one thing intended to move today, named as a result rather than
   an activity.
3. BLOCKED. What is stuck and who or what clears it, or an explicit statement
   that nothing is blocked.

## Monday: a complete update made of short answers

SHIPPED: "nothing finished, still mid way through the export bug"
FOCUS: "get the export bug fixed and merged"
BLOCKED: "no blockers"

SHIPPED passes the checkable claim test. It makes an explicit negative claim
(nothing finished) and names the specific item still in progress, so a
teammate could ask about that exact bug and get a real answer. FOCUS passes:
it names one specific deliverable, fixed and merged, not an activity like
continue working. BLOCKED passes: it is a plausible, explicit negative claim,
not a placeholder, and there is no reason from the rest of the update to
doubt it. Verdict: complete. This is the example to point to whenever "short"
gets confused with "incomplete": every field here is brief and every field
here is also genuinely specific.

## Tuesday: vague filler in two fields

SHIPPED: "made progress on stuff"
FOCUS: "keep working on things"
BLOCKED: "no blockers"

SHIPPED fails. "Made progress on stuff" names no task, no deliverable, and no
person; nobody reading it could confirm or dispute anything about it. Quote
it exactly when flagging it. FOCUS fails for the same reason: "keep working
on things" restates that work will continue without saying on what. BLOCKED
still passes, for the same reason it passed Monday: a plausible explicit
negative is a real answer, not a placeholder, and it should not be flagged
just because two other fields on the same day failed.

## Wednesday: pointing elsewhere instead of stating content

SHIPPED: "shipped the export fix, verified on staging"
FOCUS: "start the onboarding doc rewrite"
BLOCKED: "same as before"

SHIPPED and FOCUS both pass: a specific, verifiable deliverable and a
specific, named piece of work. BLOCKED fails, but not because it is short.
"Same as before" points a reader at a previous day's update instead of
stating the current blocker, which means nobody reading only today's update
actually learns anything. Flag it as vague and quote "same as before" exactly,
and note in the write up that it requires restating the actual current
blocker or an explicit no blockers, not a pointer to history.

## Thursday: a field left out entirely

SHIPPED: "shipped the export fix, verified on staging"
FOCUS: "finish the onboarding doc first draft"

Thursday's submitted update has no BLOCKED line at all. This is not a vague
field, because there is no text to judge for specificity: it is a missing
field. Report it separately from the vague findings on Tuesday and Wednesday,
since the fix for a missing field (ask for the field) is different from the
fix for a vague one (ask for specifics).

## Reading the week as a whole

Across the four days, BLOCKED failed the checkable claim test only once, on
Wednesday, and was missing once, on Thursday. It should not be reported as a
recurring placeholder, because the Monday and Tuesday entries genuinely
passed the test on their own terms. Do not let two unrelated problems on
different days get merged into one overstated pattern. A recurring
placeholder finding is reserved for a phrase, or a close variant of it, that
fails the checkable claim test on its own and then repeats across multiple
days, which did not happen here.
`;

const meta: SkillMeta = {
  slug: "async-standup-completeness-skill",
  name: "Async Standup Completeness Check",
  title: "Async Standup Completeness Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that checks a submitted async standup update against a team's own agreed field format, flagging vague filler with its exact quoted text while accepting a genuinely specific short answer like 'no blockers' as complete.",

  seo: {
    primaryKeyword: "async standup completeness skill",
    keywords: [
      "async standup completeness skill",
      "free ai skill for async standup updates",
      "downloadable checklist for standup completeness",
      "ai skill to catch vague standup updates",
      "how to check if a standup update is complete",
    ],
    seoTitle: "Async Standup Completeness Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable async standup completeness skill that flags vague filler in a submitted update against a team's own agreed format, quoting the exact text.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-examples.md", content: WORKED_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a submitted async standup update to check for completeness, models often collapse two separate questions, whether a field is short and whether a field is vague, into one. A field like 'no blockers' gets marked incomplete purely for its length, while a longer field like 'made really solid progress on a bunch of things' gets accepted purely because it fills more space, even though it names nothing checkable. This skill's instructions require every verdict to trace to whether a field names something a reader could confirm or dispute, never to how many words the field used.",
  },

  article: {
    intro: [
      "An async standup completeness skill only earns its name if it can separate a short answer from a vague one, because those are not the same failure. Handed a submitted update and asked whether it is complete, most AI assistants default to judging length: a two word field reads as thin, a twenty word field reads as thorough, and neither judgment has anything to do with whether the field says something checkable. This skill replaces that instinct with one test: could someone else confirm it, dispute it, or act on it, exactly as written.",
      "It ships as two plain text files: a main instructions file and a downloadable checklist for standup completeness that walks a real team's format through a full week of submitted updates, previewable in full before you download the zip.",
      "This is a downstream, per update quality check, not a decision about whether a team's meeting should exist at all. The team's stated field format is a required input the skill will not invent.",
    ],
    sections: [
      {
        heading: "Why the team's real stated format is a required input, not a guess",
        body: [
          "Every team's async standup fields are a local agreement, not a universal template. One team reports yesterday, today and blockers; another reports shipped, focus, blocked and help needed. Inventing a plausible field list from a generic idea of what standups usually contain guarantees the review checks the wrong thing, flagging a field nobody asked for or missing one the team relies on.",
          "The instructions make this a gate: if no stated format is supplied, the skill says so and asks for it first. A free ai skill for async standup updates that skips this step produces a review that looks thorough while checking nothing the team cares about.",
        ],
      },
      {
        heading: "The checkable claim test, and how to apply it field by field",
        body: [
          "For every field, the question is always the same: could someone other than the author confirm this, dispute it, or act on it, exactly as written. A field passes by naming something specific, or by making a plausible negative claim such as no blockers. A field fails when it uses a generic verb with no object, restates the field's own name, or points at a previous day instead of stating current content.",
          "This is the core of an ai skill to catch vague standup updates: every flagged field gets its exact text quoted, so the reader can check the judgment rather than trust a bare 'this feels vague' verdict.",
        ],
      },
      {
        heading: "Distinguishing brevity from vagueness, the trickiest part of this discipline",
        body: [
          "The failure this skill exists to prevent runs in both directions. A short, true answer like 'no blockers' gets treated as suspiciously thin and flagged for incompleteness, purely because it is short. A long, padded answer like 'made really solid progress on a bunch of things' gets accepted purely because it fills space, even though it names nothing a reader could check.",
          "The fix is to make length irrelevant to the verdict. A field passes or fails only on whether it names something checkable. 'No blockers' is a real, checkable claim someone could dispute if untrue, so it passes at two words. 'Made really solid progress on a bunch of things' names nothing checkable at ten words, so it fails. How to check if a standup update is complete has nothing to do with text volume and everything to do with whether that text commits to something specific.",
        ],
      },
      {
        heading: "A worked example: one team's format, one week of updates",
        body: [
          "Atlas's stated format has three fields: shipped, focus and blocked. Monday's update is short in every field and complete in every field, including a plain 'no blockers' that stays unflagged because it is a specific claim, not a placeholder. Tuesday's update fails on shipped and focus, both filled with a generic verb and no object, quoted exactly, while blocked still passes because that 'no blockers' is judged on its own terms.",
          "Wednesday's blocked field reads 'same as before,' which fails not because it is short but because it points at history instead of stating the current blocker. Thursday drops the blocked field entirely, a missing field rather than a vague one, reported separately, since the fix for each is different.",
        ],
      },
      {
        heading: "How this differs from the recurring meeting audit skill",
        body: [
          "This site's recurring meeting audit skill runs on a team's list of standing meetings and decides, meeting by meeting, whether the reason each one exists actually requires the group to be live together. It is the decision that gets a team to async reporting at all, and it never looks at the content of a submitted update.",
          "This async standup completeness skill starts after that decision has already been made, checking whether the fields in an actual submitted update are filled with real, checkable content. One skill decides whether a meeting should become an async update; the other checks whether that update is any good.",
        ],
      },
      {
        heading: "How this differs from the daily standup prompt",
        body: [
          "The daily standup prompt on this site writes a fresh four line update from a person's own fragments before it is posted anywhere, turning raw notes into a finished update in a fixed shape.",
          "This skill runs the other direction, taking an update already submitted against a format the team agreed on and checking it after the fact. A team could use the standup prompt to help someone draft an update and still run this skill afterward, since drafting and checking for vagueness are different jobs.",
        ],
      },
    ],
    howTo: {
      name: "How to use the async standup completeness skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-examples.md on this page before downloading, so you can see the checkable claim test applied across a full week of updates.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the team's real stated format and the submitted update",
          text: "Collect the exact field names the team has agreed to report, in order, plus the actual update text. Do not paraphrase either one.",
        },
        {
          name: "Hand both files to your assistant and review each verdict",
          text: "Keep the folder structure intact, then check that every vague verdict quotes exact text and no short field was flagged purely for its length.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill decide what fields a team's standup should have?",
        answer:
          "No. It requires the team's real, agreed field list as an input and refuses to invent one from a generic idea of a standup. If no stated format is supplied, it asks for it before reviewing any update, rather than guessing which fields matter.",
      },
      {
        question: "Will a short answer like 'no blockers' get flagged as incomplete?",
        answer:
          "Not if it is a plausible, specific claim. The skill judges every field on whether it names something a reader could confirm or dispute, never on word count, so a true, explicit 'no blockers' passes at two words while a padded sentence that names nothing checkable fails.",
      },
      {
        question: "How does this skill treat a field that just says 'same as before'?",
        answer:
          "It flags it, but for a different reason than a generic filler phrase. Pointing at a previous day forces a reader to reconstruct the answer from history, which fails the checkable claim test just as much as a phrase with no object at all.",
      },
      {
        question: "What happens if a submitted update leaves a required field out entirely?",
        answer:
          "It gets reported as a missing field, kept separate from the vague field findings. There is no text to judge, only an absence, and the fix for a missing field, asking for it, is different from the fix for a vague one.",
      },
      {
        question: "Is this the same as the recurring meeting audit skill on this site?",
        answer:
          "No. The recurring meeting audit skill decides whether a standing meeting should move to async reporting, working from a list of meetings and their purposes. This skill starts after that decision, checking a submitted update against the team's own agreed fields.",
      },
      {
        question: "Does downloading or previewing this skill send anything to a server?",
        answer:
          "No. The file preview and zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the team's format or update text is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/recurring-meeting-audit-skill",
        label: "recurring meeting audit skill",
        description: "Decides whether a standing meeting should move to async reporting at all, a separate, upstream job from checking one submitted update's content.",
      },
      {
        href: "/productivity-prompts/daily-standup-prompt",
        label: "daily standup prompt",
        description: "Drafts a fresh four line update from a person's own fragments before it is posted, rather than checking an already submitted update for vagueness.",
      },
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "task handoff skill",
        description: "Applies a related concreteness test to a handoff document's current state, context and next steps, a different document with the same core discipline.",
      },
      {
        href: "/skills/productivity-skills/weekly-review-structure-skill",
        label: "weekly review structure skill",
        description: "Checks a whole week's completed work against prior commitments, a broader cadence than one day's submitted standup fields.",
      },
    ],
    externalLinks: [
      {
        href: "https://handbook.gitlab.com/handbook/company/culture/all-remote/asynchronous/",
        label: "GitLab Handbook: Asynchronous communication",
        description: "An independent, widely cited practice guide on how distributed teams structure written updates so they carry real information instead of theatre.",
      },
      {
        href: "https://async.twist.com/asynchronous-communication",
        label: "Twist: What is asynchronous communication",
        description: "Contrasts a vague written request with a specific one directly, the same distinction this skill's checkable claim test applies to standup fields.",
      },
      {
        href: "https://37signals.com/how-we-communicate/",
        label: "37signals: How we communicate",
        description: "Documents a real company's reliance on daily written check ins over live meetings, and why writing a claim down forces more specificity than saying it out loud.",
      },
      {
        href: "https://digital.gov/guides/plain-language/",
        label: "Digital.gov: Plain language guidelines",
        description: "A government backed standard for writing concrete, checkable sentences instead of vague filler, the same discipline this skill applies to a standup field.",
      },
    ],
  },

  tags: ["productivity", "standup", "async", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
