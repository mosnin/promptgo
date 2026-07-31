import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Meeting Decision Capture

Use this skill after a meeting, given raw meeting notes or a transcript, to build a
structured decision log: what was actually decided, who owns the follow-through, and
by when. Its whole value sits in one refusal: it will not log a topic that was
discussed but never resolved as though the group had committed to something.

## What counts as a genuine decision

A candidate line from the notes only qualifies as a decision once it passes all
three of these checks.

1. RESOLVED. The notes show the group actually settled on one option, not that they
   discussed several. "We talked about moving the launch date" is not resolved. "We
   agreed to move the launch to March" is.
2. OWNED. Someone was named as responsible for the follow-through, or the notes make
   clear who is accountable next. A decision with nobody attached to it is a fact
   waiting for an owner, not a finished log entry.
3. TIMED. A date, a deadline, or an explicit trigger was stated for when the
   follow-through happens. "Soon" or "next sprint" with no specific commitment
   attached does not count as timed unless the notes actually say that.

Only log an entry as a full decision when all three are present in the source
material. Do not assume ownership from someone's job title, and do not invent a
deadline that fits the topic even if it seems obvious what was implied.

## Handling a decision missing an owner or a date

Real meetings routinely produce decisions that are resolved but not fully owned or
timed: the group agrees on a direction and stops there. Do not treat RESOLVED alone
as enough to log a complete decision entry. Instead:

- If RESOLVED is true but OWNED is missing, log it as a decision with the owner
  field marked UNASSIGNED, and say so plainly.
- If RESOLVED is true but TIMED is missing, log it as a decision with the deadline
  field marked NOT SET, and say so plainly.
- Never fabricate an owner from who spoke most about the topic, and never fabricate
  a deadline from what would be reasonable. A guessed owner or a guessed date is
  worse than an honest gap, because a gap gets asked about and a guess gets trusted.

## Distinguishing a decision from a topic discussed

Most of what fills a meeting is not a decision. Before logging anything, check
whether the material is actually a topic that was discussed with no resolution: an
option raised, arguments made on both sides, and the group moving on without
settling it. This must never be logged as a decision. Instead, list it separately
under DISCUSSED, NOT DECIDED, naming the options that were on the table and, if
stated, who would need to weigh in before it can be resolved.

The test is not how much time a topic consumed, or how confident the framing sounds
in the notes. A long, animated discussion that ends without an agreed direction is
still a discussion. A single sentence that clearly states a completed choice is
still a decision, even if it took thirty seconds to say.

## Writing the log entry

For every genuine decision, write one line: what was decided, in the past tense,
the owner (a named person or UNASSIGNED), and the deadline (a stated date or
trigger, or NOT SET). For every discussed-not-decided topic, write one line naming
the topic and the options raised, with no owner or deadline field at all, since
nothing was decided.

Pair this file with \`reference/worked-example.md\`, which walks through one set of
meeting notes twice: once sorting the lines that qualify as decisions, and once
showing the lines that are only discussion, so the distinction is visible rather
than only described.

## What this skill refuses to do

It will not promote a discussed topic into a decision because the conversation
sounded conclusive. It will not invent an owner from context, seniority, or who
talked the most. It will not invent a deadline that was never stated, even an
approximate one. And it will not quietly drop a topic that was discussed and left
unresolved; every one of them gets a line in the log, labelled honestly as
unresolved rather than omitted.
`;

const WORKED_EXAMPLE_MD = `# Worked example: sorting meeting notes into decisions and discussions

Use this alongside \`SKILL.md\`. Below is one set of raw meeting notes, followed by
the log this skill would produce from them, decisions on one side and everything
that was only discussed on the other.

## The raw meeting notes

10:02 Ana: We need to decide on the vendor for the new ticketing system before the
end of the month.
10:04 Marcus: I have compared the two finalists. Vendor A is cheaper, Vendor B has
better support.
10:06 Priya: Given the support history we had last year, I think we should just go
with Vendor B.
10:07 Ana: Agreed, let's go with Vendor B. Marcus, can you get the contract signed
by the fifteenth?
10:07 Marcus: Yes, I will have it signed by the fifteenth.
10:12 Ana: Separately, we should talk about whether to move standup to Tuesdays.
10:14 Priya: I do not love Tuesdays, Thursdays might work better for the team.
10:16 Marcus: Let's think about it and come back to it.
10:18 Ana: Also, the office move. Do we have a date yet?
10:19 Priya: Facilities said sometime in Q3, nothing firm.
10:20 Ana: Okay, let's keep an eye on that. Moving on.
10:24 Ana: One more thing, we are overspending on the design tool subscriptions.
Marcus, can you look into cheaper alternatives and report back next week?
10:25 Marcus: Sure, I will have options by next week's meeting.

## Pass one: sorting into decisions and discussions

DECISION: We will go with Vendor B for the ticketing system.
- Resolved: yes, Ana states it directly and nobody objects.
- Owned: yes, Marcus is named to get the contract signed.
- Timed: yes, by the fifteenth.
- Verdict: logs as a full decision.

DECISION: Marcus will investigate cheaper design tool alternatives.
- Resolved: yes, the action is stated directly.
- Owned: yes, Marcus by name.
- Timed: yes, next week's meeting.
- Verdict: logs as a full decision, even though it is a smaller item than the
  vendor choice. Size does not determine whether something qualifies.

DISCUSSED, NOT DECIDED: Whether to move standup to Tuesdays.
- Resolved: no. Priya raises an objection and Marcus explicitly defers it, saying
  let's think about it and come back to it.
- Verdict: logs under discussed, not decided, with Tuesdays and Thursdays named as
  the options raised and no owner or deadline field, because nothing was settled.

DISCUSSED, NOT DECIDED: The office move date.
- Resolved: no. Facilities gave a rough quarter, not a firm date, and the group
  explicitly moves on without settling anything.
- Verdict: logs under discussed, not decided. It would be a mistake to write Q3 as
  a deadline field, since Q3 was reported as a rough estimate, not a decision the
  group made.

## Pass two: the mistake this skill exists to prevent

A weaker extraction would log the standup discussion as decided to consider
Tuesdays or Thursdays, and would log the office move as decided, office moves in
Q3. Both are wrong in the same way: they take a topic that was raised, discussed
without resolution, and dress it up as a settled choice because the notes read as
though the group was moving toward an answer.

The tell in both cases is the same. Nobody said the sentence a decision requires: a
completed choice, an owner, or a stated time. Where that sentence is missing, the
honest output is DISCUSSED, NOT DECIDED, not a decision entry with a guessed owner
or an estimated date standing in for one that was never actually given.

## Using this worked example

When applying \`SKILL.md\` to your own meeting notes, run each candidate line
through the same three checks used above: resolved, owned, timed. If any of the
three depends on filling in something the notes do not actually say, the entry
belongs under discussed, not decided, not in the decision log, no matter how close
it reads to a real decision.
`;

const meta: SkillMeta = {
  slug: "meeting-decision-capture-skill",
  name: "Meeting Decision Capture",
  title: "Meeting Decision Capture Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that extracts a structured decision log from raw meeting notes or a transcript, testing every candidate line for a settled choice, a named owner and a stated deadline before logging it as decided.",

  seo: {
    primaryKeyword: "meeting decision capture skill",
    keywords: [
      "meeting decision capture skill",
      "free ai skill for meeting decisions",
      "downloadable meeting decision log template",
      "ai skill to extract decisions from meeting notes",
      "how to tell a decision from a discussion in a meeting",
    ],
    seoTitle: "Meeting Decision Capture Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable meeting decision capture skill that extracts only decisions actually made from meeting notes, and flags unresolved discussion honestly.",
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
      "Given raw meeting notes, models reliably promote a topic that was discussed at length into a decision, because sustained discussion reads as agreement even when the notes show the group moving on without settling anything. A second common failure is filling a missing owner or deadline with a plausible guess drawn from who spoke most or what timeline would be reasonable, rather than reporting the gap. This skill's three part test, resolved, owned and timed, forces every logged decision to trace to an actual line in the source material, and requires an honest UNASSIGNED or NOT SET marker rather than an invented answer.",
  },

  article: {
    intro: [
      "A meeting decision capture skill only earns its name if it can tell a decision apart from a topic the room simply talked about. Handed meeting notes or a raw transcript, most AI assistants read sustained discussion as agreement and confident phrasing as a settled choice, producing a log full of things discussed and nothing actually decided. This skill is built to catch that gap before an invented owner or a guessed deadline gets treated as fact.",
      "The mechanism is a three part test applied to every candidate line: was it resolved, is it owned, and is it timed. A line only becomes a decision log entry once all three are present in the source material, and a resolved item missing an owner or a date still gets logged honestly, marked UNASSIGNED or NOT SET rather than filled in with a guess.",
      "It ships as two plain text files: a main instructions file and a worked example that sorts one set of sample meeting notes into decisions and discussions twice, once correctly and once showing the mistake a weaker extraction makes. Both are previewable in full before you download the zip.",
    ],
    sections: [
      {
        heading: "Why meeting notes read as more settled than they are",
        body: [
          "A meeting transcript or a set of hurried notes captures tone as well as content, and tone is misleading. A confident voice arguing for an option sounds, on the page, similar to a group agreeing to it. Built as a free ai skill for meeting decisions rather than a general summariser, this skill treats that resemblance as the risk to guard against.",
          "The gap only shows up when you check for the three things a real decision leaves behind: a settled choice, a named owner, and a stated time. Mistaking discussion for agreement is the single most common failure in AI generated meeting output, and it is the exact failure this skill exists to prevent.",
        ],
      },
      {
        heading: "The three part test: resolved, owned, timed",
        body: [
          "As an ai skill to extract decisions from meeting notes, its method reduces to one check applied to every candidate line. Resolved asks whether the group settled on one option rather than merely weighing several. Owned asks whether a named person is responsible for the follow-through. Timed asks whether a date, deadline or trigger was stated for when that follow-through happens.",
          "How to tell a decision from a discussion in a meeting comes down to whether a line clears all three checks. It is deliberately mechanical rather than a matter of judgment, since judgment is where a model's tendency to see agreement in confident language sneaks back in.",
        ],
      },
      {
        heading: "Why an unassigned owner or an unset deadline still gets logged honestly",
        body: [
          "A resolved choice with no stated owner or date is common, and it is not the same failure as an unresolved discussion. A group may agree to change a process without naming who drives it, or agree on a direction without setting a date. This skill logs that choice as a decision, but marks the missing field UNASSIGNED or NOT SET rather than silently filling it in.",
          "The instruction is explicit: never assign ownership based on job title or who spoke most, and never invent a deadline that merely sounds plausible. A guessed answer gets trusted by whoever reads the log next. A marked gap gets asked about, which is the outcome that actually protects the follow-through.",
        ],
      },
      {
        heading: "How a meeting decision capture skill differs from a decision log prompt",
        body: [
          "This site's decision log prompt is a general purpose tool: you hand it scattered raw material or your own summary, and it structures whatever decisions are already legible in that input. Its own guidance warns that pasting a full meeting transcript into it produces a log full of discussion, because it was not built to sort conversation from conclusion in the first place.",
          "This downloadable meeting decision log template is built for that sorting job, meant to run against a transcript or raw notes rather than a pre-digested summary, flagging unresolved material honestly instead of discarding or promoting it by accident.",
        ],
      },
      {
        heading: "How this differs from a general meeting notes prompt",
        body: [
          "A meeting notes prompt on this site produces a one-off writeup: decisions, actions, open questions and uncertainty, generated fresh each time you run it. This skill is narrower and reusable by design, a pack a teammate or an assistant keeps and applies the same way every time, built specifically around the resolved, owned, timed test.",
          "Where the two overlap, on separating discussion from decision, this skill goes further by checking owner and deadline fields independently of resolution, and by giving a worked example that shows the reasoning behind each classification rather than leaving the boundary implicit.",
        ],
      },
      {
        heading: "Using the downloaded files together",
        body: [
          "Hand both files to a teammate or an assistant together, since the main file points to the worked example by its relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link and gives a concrete standard to check output against.",
        ],
      },
    ],
    howTo: {
      name: "How to use the meeting decision capture skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you can see the three part test and how it applies to a real set of notes.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the raw meeting material",
          text: "Collect the actual notes or transcript from the meeting, not a summary somebody already wrote. The resolved, owned and timed checks need the original wording to work against.",
        },
        {
          name: "Hand both files to your assistant and check the two lists",
          text: "Keep the folder structure intact, then review the decisions list for anything that looks softly worded and the discussed-not-decided list for anything that should have had an owner but was left out.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly separates a decision from a topic that was discussed?",
        answer:
          "A decision has to be resolved, meaning the group settled on one option rather than weighed several, and that resolution has to be stated in the notes rather than implied by tone. A topic that was raised, argued over, and left without an agreed direction stays a discussion no matter how long it was talked about or how confident the framing sounds.",
      },
      {
        question: "What happens if a decision was made but nobody was named to own it?",
        answer:
          "The skill still logs it as a decision, since the choice itself was resolved, but marks the owner field UNASSIGNED rather than guessing from job title or who spoke most. The same rule applies to a missing deadline, which gets marked NOT SET instead of an invented date standing in for one that was never actually given.",
      },
      {
        question: "Can this work directly from a raw transcript instead of typed-up notes?",
        answer:
          "Yes, and that is the input it is built for. Give it the actual wording people used rather than a summary somebody already condensed, since the resolved, owned and timed checks depend on seeing the real sentences, including the ones that show a topic being deferred rather than settled.",
      },
      {
        question: "How is this different from the decision log prompt on this site?",
        answer:
          "The decision log prompt structures decisions that are already legible in whatever raw material you give it, and its own guidance warns against pasting a transcript into it because that produces a log full of discussion. This skill is built specifically to work from a transcript or meeting notes, sorting conversation from conclusion as its core job rather than an edge case.",
      },
      {
        question: "What if the meeting genuinely decided nothing?",
        answer:
          "Then the decisions list is empty and the discussed-not-decided list carries everything, which is an accurate output rather than a failed run. A recurring meeting producing no decisions across several sessions is telling you something worth noticing, and a log that manufactures a decision to avoid an empty list would hide exactly that signal.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the meeting notes or transcripts you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/productivity-prompts/decision-log-prompt",
        label: "decision log prompt",
        description: "For structuring decisions already legible in scattered raw material; its own guidance warns against pasting a transcript into it, which is exactly this skill's job instead.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description: "A one-off writeup covering decisions, actions and open questions in five sections, rather than a reusable pack built specifically around the resolved, owned, timed test.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description: "The other end of the same meeting, sizing the item list before it happens rather than extracting what was settled once it is over.",
      },
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "task handoff skill",
        description: "For writing up a broader handoff once a decision from this log needs to transfer to someone taking over the work.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2017/07/stop-the-meeting-madness",
        label: "Harvard Business Review: Stop the meeting madness",
        description: "Documents how much of a typical meeting is discussion rather than resolution, which is the gap this skill's three part test is built to catch.",
      },
      {
        href: "https://adr.github.io/",
        label: "Architecture Decision Records",
        description: "An independent practice for recording a decision and its rationale as a durable log entry, generalised here beyond software architecture.",
      },
      {
        href: "https://asana.com/resources/meeting-notes-tips",
        label: "Asana: Meeting notes tips and tracking actions",
        description: "Independent guidance on structuring meeting notes around decisions and action items rather than a word for word record of discussion.",
      },
      {
        href: "https://www.indeed.com/career-advice/career-development/how-to-write-meeting-minutes",
        label: "Indeed: How to write meeting minutes",
        description: "Covers documenting decisions and assigned actions with owners and due dates as the primary elements of usable meeting minutes.",
      },
    ],
  },

  tags: ["productivity", "meetings", "decisions", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
