import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Recurring Meeting Audit

Use this skill when handed a list of a team's real recurring meetings, each with its
name, cadence, attendee list and stated purpose, and asked to identify which ones
could be replaced by an async update instead of continuing to hold a permanent slot
on the calendar. This skill audits the whole roster of standing meetings, not one
meeting's agenda and not one meeting's notes.

## What this skill does not do

It does not capture decisions from a transcript of a single meeting that already
happened, and it does not review one week of a person's own completed work against
prior commitments. Both of those are real, separate jobs with their own skills. This
skill only looks at a list of meetings that recur on a schedule and asks, for each
one, whether the reason it exists actually requires the group to be live together.

## The two part test

A recurring meeting only gets flagged as async replaceable when both of these are
true at once.

1. NO LIVE DECISION. Reaching whatever the meeting's stated purpose requires does
   not depend on several people reacting to each other in real time. Nobody needs
   to hear an objection and answer it on the spot, weigh a tradeoff out loud with
   someone else, or talk a disagreement down to one call.
2. NO REAL TIME COLLABORATIVE WORK. Nothing happens in the room that only works
   live: no shared problem solving, no whiteboarding, no pairing through a piece of
   work together, no working session where the output is built during the meeting
   itself. What happens is status reporting: people say what is done, what is next,
   and what is blocked.

Both conditions have to hold. A meeting that clears NO LIVE DECISION but still
involves live collaborative work stays a meeting. A meeting with no collaborative
work but where a real decision needs several people to react to each other also
stays a meeting. Only the overlap, no live decision and no live collaborative work,
gets flagged.

## What never gets flagged, even if it looks like a status meeting

Do not flag a meeting because its name or stated purpose contains the word status,
sync, standup or check in. Read what the purpose actually says happens in the room,
not the label on the invite. A meeting called a status sync that actually exists so
the group can argue through a tradeoff and land on one answer together is a meeting
where genuine debate or a decision requiring real time reaction is happening, and it
must not be flagged, regardless of its name.

Never flag a meeting whose stated purpose describes any of the following: genuine
debate between attendees, brainstorming toward an option nobody had going in, a
decision that needs multiple people to respond to each other before it can be made,
or joint work that is actually performed during the meeting rather than reported on.

## When the stated purpose is ambiguous

If the purpose given for a meeting does not make clear whether real time discussion
or collaborative work actually happens in it, or only says something generic like
align the team or discuss the project, do not guess and do not default to flagging
it. Ask a specific clarifying question naming what is unclear, for example: does
this meeting ever produce a decision that required people to respond to each other
live, or does everyone already know what they are going to say before it starts.
Wait for an answer before classifying that meeting. A guess in either direction is
worse than asking, because a wrongly kept meeting wastes time and a wrongly flagged
meeting can kill a discussion the team actually needs.

## Running the audit

For every meeting in the list, work through it in this order.

1. Restate the meeting's stated purpose in one line, in your own words, so the
   person reading the audit can check your reading against theirs.
2. Apply the two part test: state your finding on NO LIVE DECISION and your finding
   on NO REAL TIME COLLABORATIVE WORK separately, each with one sentence naming
   what in the stated purpose supports that finding.
3. If either finding is unclear from the purpose given, stop and ask the
   clarifying question instead of completing the test with a guess.
4. Give one of three verdicts: KEEP AS A MEETING, MOVE TO ASYNC, or NEEDS
   CLARIFICATION, each with the one line reasoning that produced it.

Pair this file with \`reference/async-test-examples.md\`, which walks through several
sample meetings against the two part test, including ones that pass, ones that fail
because of a live decision, ones that fail because of real time collaborative work,
and one that is genuinely ambiguous.

## Writing up the audit

Present the roster as a table or list with one row per meeting: its name, its
cadence, the verdict, and the one or two line reasoning. Group MOVE TO ASYNC
recommendations together at the end with a short note on what the async update
should contain instead, drawn only from what the stated purpose already said the
meeting covers, never invented content the purpose did not mention.

## What this skill refuses to do

It will not flag a meeting for its label alone. It will not treat a stated purpose
that is too vague to classify as grounds to flag it by default; it asks instead. It
will not flag a meeting that involves genuine debate, brainstorming, or a decision
requiring people to react to each other live, no matter how much time that meeting
consumes or how repetitive it appears on the calendar. And it will not invent detail
for the async update that was not present in the meeting's stated purpose.
`;

const ASYNC_TEST_EXAMPLES_MD = `# Worked examples: applying the two part test

Use this alongside \`SKILL.md\`. Each example below is a meeting from a sample
recurring meeting list, with the stated purpose exactly as it was given, followed
by the two part test applied to it and the verdict it produces.

## Example one: passes both parts, gets flagged

Name: Weekly engineering status sync. Cadence: every Monday, thirty minutes, eight
attendees. Stated purpose: each person shares what they finished last week, what
they are starting this week, and anything blocking them. No decisions get made in
this meeting; anything that needs a decision gets escalated to a separate thread
afterward.

NO LIVE DECISION: true. The purpose explicitly states no decisions are made here,
and anything needing one is escalated elsewhere rather than resolved in the room.
NO REAL TIME COLLABORATIVE WORK: true. What happens is each person reporting their
own status in turn, not joint work being performed together.
Verdict: MOVE TO ASYNC. A written update per person, posted where the team already
looks, covers exactly what this meeting's stated purpose says happens in it.

## Example two: fails on NO LIVE DECISION, stays a meeting

Name: Pricing committee. Cadence: every two weeks, forty five minutes, five
attendees. Stated purpose: review proposed price changes against competitor moves
and margin targets, and debate the tradeoffs until the group agrees on a number for
each affected product line.

NO LIVE DECISION: false. The purpose says the group debates tradeoffs until they
agree, which is several people reacting to each other's arguments in real time to
reach one answer.
Verdict: KEEP AS A MEETING. This does not need to be checked against the second
condition, since failing the first condition alone is enough to keep it live.

## Example three: fails on NO REAL TIME COLLABORATIVE WORK, stays a meeting

Name: Sprint planning working session. Cadence: every two weeks, ninety minutes,
six attendees. Stated purpose: engineers and the product manager break the next
sprint's backlog into tickets and estimate each one together as a group, working
through the board live.

NO LIVE DECISION: true in isolation, since sizing an already agreed backlog is not
itself a live decision requiring people to argue toward an answer. But NO REAL TIME
COLLABORATIVE WORK: false. Breaking down and estimating tickets together, live, on
a shared board, is joint work performed during the meeting, not status reporting.
Verdict: KEEP AS A MEETING. One condition failing is enough; this meeting fails on
the collaborative work condition specifically.

## Example four: the label is a trap, the purpose says otherwise

Name: Weekly status meeting. Cadence: every Friday, thirty minutes, six attendees.
Stated purpose: marketing and sales report their numbers for the week, then debate
which channel to reallocate the remaining quarter's budget toward based on what the
numbers show.

Do not classify this from its name. Despite being called a status meeting, the
second half of its stated purpose is a live decision: the group debates where to
reallocate a budget, which requires people to respond to each other's read of the
numbers before landing on a channel.
NO LIVE DECISION: false, because of the reallocation debate.
Verdict: KEEP AS A MEETING. This is the exact case this skill exists to get right:
a meeting whose name says status but whose actual stated purpose contains a real
time decision must not be flagged, no matter how repetitive or long running it
looks on the calendar.

## Example five: genuinely ambiguous, ask instead of guessing

Name: Team alignment meeting. Cadence: every Wednesday, thirty minutes, seven
attendees. Stated purpose: align the team on priorities for the week.

The purpose does not say whether alignment happens by one person reporting settled
priorities, which would pass both parts of the test, or by the group discussing and
adjusting priorities together, which would fail NO LIVE DECISION. Nothing in the
stated purpose resolves which of these it is.
Verdict: NEEDS CLARIFICATION. Ask, for example: when priorities shift in this
meeting, does that happen because attendees discuss and adjust them together on the
spot, or does a decision maker already arrive with the settled list and the meeting
just communicates it. Do not classify this meeting until that question is answered.

## Using these examples

When applying \`SKILL.md\` to a real meeting list, work through the same order used
above for every meeting: restate the purpose in one line, test NO LIVE DECISION,
test NO REAL TIME COLLABORATIVE WORK, and only reach MOVE TO ASYNC when both
conditions are true. Where the stated purpose does not say enough to test either
condition, the correct output is a clarifying question, exactly as in example five,
not a default verdict in either direction.
`;

const meta: SkillMeta = {
  slug: "recurring-meeting-audit-skill",
  name: "Recurring Meeting Audit",
  title: "Recurring Meeting Audit Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that audits a team's list of recurring meetings against a two part test, no live decision and no real time collaborative work, and asks a clarifying question rather than guessing when a stated purpose is ambiguous.",

  seo: {
    primaryKeyword: "recurring meeting audit skill",
    keywords: [
      "recurring meeting audit skill",
      "free ai skill for recurring meetings",
      "downloadable recurring meeting audit checklist",
      "ai skill to flag meetings that should be async",
      "checklist for auditing recurring meetings",
      "test for whether a meeting needs to happen",
    ],
    seoTitle: "Recurring Meeting Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable recurring meeting audit skill that flags meetings replaceable by an async update, and asks when a stated purpose is unclear.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/async-test-examples.md", content: ASYNC_TEST_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Handed a list of recurring meetings and asked which ones could go async, models reliably flag most or all of them on cadence and length alone, treating any standing weekly or biweekly slot as inherently wasteful without checking whether genuine live discussion actually happens in it. A meeting labelled status or sync gets flagged automatically even when its stated purpose includes a real debate or a decision requiring people to respond to each other. This skill's two part test forces a separate check on live decision making and real time collaborative work before any flag is issued, and requires a clarifying question rather than a default verdict when the stated purpose does not say enough to test either condition.",
  },

  article: {
    intro: [
      "A recurring meeting audit skill only earns its name if it can tell a meeting that merely reports status from one that happens to be labelled that way but actually carries a live decision. Handed a list of a team's standing meetings and their stated purposes, most AI assistants flag anything that looks repetitive, without checking whether real time discussion or collaborative work is actually happening inside it. This skill holds that line: only a meeting that clears both halves of a strict two part test gets recommended for a move to async.",
      "It ships as two plain text files: a main instructions file that defines the two part test, the ambiguity rule and the write up format, and a worked examples file that runs five sample meetings through the test, including one deliberately mislabelled as a status meeting that actually needs to stay live. Both are previewable in full before you download the zip, and this is a roster level audit, judging a whole list of recurring meetings rather than reviewing one meeting instance.",
    ],
    sections: [
      {
        heading: "Why a meeting's name cannot be trusted on its own",
        body: [
          "A meeting called a status sync, a standup, or a check in sounds, on the label alone, like exactly the kind of meeting a free ai skill for recurring meetings should recommend moving to async. But the label describes what the invite says, not what actually happens once the group is in the room.",
          "This skill reads the stated purpose, not the name, before forming any verdict. A meeting named status meeting that turns out to include a live debate about where to reallocate budget is not treated as a status meeting for the purposes of this audit. What the room actually does decides the verdict.",
        ],
      },
      {
        heading: "The two part test: no live decision, no real time collaborative work",
        body: [
          "Every verdict in this downloadable recurring meeting audit checklist traces back to two separate, checkable conditions, both of which must hold before a meeting gets flagged. The first, no live decision, asks whether reaching the meeting's stated purpose depends on people reacting to each other's arguments in real time before landing on an answer. The second, no real time collaborative work, asks whether anything happens beyond status reporting: shared problem solving, whiteboarding, or a working session where the output is built together during the meeting itself.",
          "Both conditions have to be true at once. A meeting can fail on either one alone and still stay a meeting, which is the test for whether a meeting needs to happen that a recurring meeting audit skill has to apply consistently, not only when it is convenient.",
        ],
      },
      {
        heading: "A worked example: the status meeting that debates a budget",
        body: [
          "Take a meeting named weekly status meeting, held every Friday, where marketing and sales report their weekly numbers and then debate which channel to reallocate the remaining quarter's budget toward, based on what those numbers show. On name alone this reads as a candidate for async replacement.",
          "Applying the test tells a different story. The reporting half would pass no live decision on its own, but the reallocation debate is exactly the kind of real time reaction between people that fails the first condition outright. This meeting stays live: the same roster that includes several genuinely replaceable meetings can also include one that only looks like them from the outside.",
        ],
      },
      {
        heading: "When the stated purpose is too thin to test, this skill asks",
        body: [
          "A purpose like align the team on priorities does not say whether alignment happens because one person reports an already settled list, which would pass the test, or because the group discusses and adjusts priorities together, which would fail it. As an ai skill to flag meetings that should be async, guessing in either direction is the wrong move, since a wrongly kept meeting wastes time and a wrongly flagged one can remove a discussion the team actually needed.",
          "The instructions require a specific clarifying question naming exactly what is unclear, and require waiting for an answer before assigning a verdict.",
        ],
      },
      {
        heading: "How this differs from the meeting decision capture skill and the weekly review structure skill",
        body: [
          "This site's meeting decision capture skill works after one specific meeting already happened, turning its transcript into a decision log. This skill works before any single meeting instance, auditing a roster of recurring meetings to judge whether each one should keep existing at all. One extracts what a meeting produced; the other decides whether the meeting needs to keep happening.",
          "The weekly review structure skill is a different job again: it checks one team's completed work for a single week against commitments made the week before, and never looks at a calendar of meetings. A team can use all three: this checklist for auditing recurring meetings to prune the calendar, the decision capture skill on whatever remains, and the weekly review skill to check the work those meetings supported.",
        ],
      },
      {
        heading: "Using the downloaded files together",
        body: [
          "Hand both files to an assistant or a teammate together, since the main instructions file points to the worked examples file by its relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link.",
        ],
      },
    ],
    howTo: {
      name: "How to use the recurring meeting audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/async-test-examples.md before downloading, so you can see the two part test applied to five sample meetings, including the mislabelled one.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real meeting list",
          text: "Collect each recurring meeting's actual name, cadence, attendee list and stated purpose, written as it exists today, not a guess at what the meeting is probably for.",
        },
        {
          name: "Hand both files to your assistant and review each verdict",
          text: "Keep the folder structure intact, then check every KEEP verdict for a real live decision or collaborative work, and answer any clarification question before accepting a move to async.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly makes a recurring meeting eligible to move to async?",
        answer:
          "It has to clear both halves of the two part test at once: no live decision, meaning nobody needs to react to someone else's argument in real time, and no real time collaborative work, meaning nothing beyond status reporting happens in the room. A meeting failing either condition on its own stays a meeting, no matter how repetitive it looks on the calendar.",
      },
      {
        question: "Will this skill flag a meeting just because it is called a status meeting?",
        answer:
          "No. The instructions explicitly forbid classifying a meeting from its name or label. A meeting called a status meeting whose stated purpose includes a live debate or a decision requiring people to respond to each other stays a meeting, and the worked examples file includes exactly this case.",
      },
      {
        question: "What happens if a meeting's stated purpose is too vague to test?",
        answer:
          "The skill asks a specific clarifying question naming what is unclear, rather than guessing or defaulting to a verdict either way. It waits for an answer before assigning a verdict of any kind, because a wrong guess in either direction carries a real cost, either wasted time or a lost discussion.",
      },
      {
        question: "Is this the same as the meeting decision capture skill on this site?",
        answer:
          "No. The decision capture skill works after one meeting has already happened, extracting a decision log from its notes or transcript. This recurring meeting audit skill works on a list of meetings before any single instance, judging whether each one should keep existing as a live event at all.",
      },
      {
        question: "Can this skill be used on a mix of meeting types at once?",
        answer:
          "Yes. It runs down a whole roster in one pass, giving each recurring meeting its own verdict and reasoning rather than a single judgment about the calendar as a whole. A team can mix status syncs, working sessions and decision meetings on one list and get a separate, specific verdict for each.",
      },
      {
        question: "Does downloading or previewing this skill send anything to a server?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the meeting list you eventually run this skill against is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/meeting-decision-capture-skill",
        label: "meeting decision capture skill",
        description: "Works after one meeting already happened, extracting a decision log, rather than judging whether a recurring meeting should keep existing at all.",
      },
      {
        href: "/skills/productivity-skills/weekly-review-structure-skill",
        label: "weekly review structure skill",
        description: "Checks a week of completed work against prior commitments, a different input and a different question from auditing a calendar of standing meetings.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description: "Sizes the item list for one meeting that is already happening, rather than testing whether that meeting should be on the calendar at all.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description: "Produces a one-off writeup of a single meeting's decisions and actions, a natural next step once this skill has decided a meeting should stay live.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2017/07/stop-the-meeting-madness",
        label: "Harvard Business Review: Stop the meeting madness",
        description: "Documents how much of a standing meeting load is proliferation rather than necessity, the pattern this skill's audit is built to prune correctly.",
      },
      {
        href: "https://handbook.gitlab.com/handbook/company/culture/all-remote/asynchronous/",
        label: "GitLab Handbook: Asynchronous communication",
        description: "An independent, widely cited practice guide on which work genuinely needs real time presence and which can move to async without losing anything.",
      },
      {
        href: "https://asana.com/resources/synchronous-vs-asynchronous-communication",
        label: "Asana: When to use synchronous vs asynchronous communication",
        description: "Distinguishes meetings that need live presence, such as brainstorming and sensitive topics, from status updates that a lot of teams default to scheduling anyway.",
      },
      {
        href: "https://www.atlassian.com/blog/loom/how-asynchronous-communication-improves-meetings",
        label: "Atlassian: How asynchronous communication improves synchronous meetings",
        description: "Frames meetings as best reserved for debate, discussion and decision making, with updates and status handled async instead, the same split this skill's two part test applies.",
      },
    ],
  },

  tags: ["productivity", "meetings", "async", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
