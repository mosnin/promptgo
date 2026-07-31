import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Meeting Cadence Audit

Use this skill when handed a list of a team's real recurring meetings, each with its name,
cadence, attendee list and stated purpose, and asked to find meetings that duplicate each
other's ground. This skill audits redundancy across a whole set of different meetings, not
whether any single meeting should exist. Whether one specific meeting still earns its slot on
the calendar is a separate question, and a companion skill on this site handles that question
one meeting at a time.

## What this skill does not do

It does not judge whether a single meeting needs to be live rather than async, and it does not
ask whether a live decision or real time collaborative work is happening inside any one
meeting. Those checks belong to a different skill built for exactly that question, applied to
one meeting in isolation. This skill starts from the opposite direction: it assumes each
meeting individually might be worth keeping, and instead asks whether two or more of them,
taken together, are covering the same ground twice.

## The core method: pairwise comparison, not a scan

Redundancy across a set of meetings cannot be found by reading the whole list once and noting
which ones feel similar. Build every unique pair of meetings from the list, and for each pair,
compare the two stated purposes directly against each other, looking for the same content
being covered in both.

For every pair being compared:

1. Quote the stated purpose of the first meeting exactly as given.
2. Quote the stated purpose of the second meeting exactly as given.
3. Name the specific piece of content, an agenda item, a topic, a report, or a decision, that
   appears in both purposes, not just a general resemblance in subject area or team.
4. If no specific shared content exists, say so and move to the next pair. Do not flag a pair
   because they both involve the same team or the same project in a general sense.

## The discipline: never a vague overlap

Do not write that some meetings might overlap or that two meetings seem related. Every
REDUNDANT verdict must name the exact duplicated content and quote both stated purposes side
by side, so the person reading the audit can see the overlap for themselves rather than take a
summary judgment on faith. A verdict that cannot point to a specific piece of content covered
in both purposes is not a finding, it is a guess, and a guess does not get written up as one.

## Shared attendees are not evidence of redundancy on their own

Two meetings sharing an attendee, or even sharing most of an attendee list, tells you nothing
on its own about whether their purposes overlap. A weekly one to one between a manager and one
report, and that same report's daily team standup, share an attendee, but one exists for that
person's individual growth and workload while the other exists so the whole team hears each
other's status. Do not flag a pair for redundancy on attendee overlap alone. Attendee overlap
only matters once the stated purposes have also been compared directly and shown to cover the
same specific content.

## When a stated purpose is too thin to compare

If a meeting's stated purpose is too generic to tell whether it covers the same ground as
another meeting, for example something like discuss the project or align the team, do not
guess either that it overlaps or that it does not. Ask a specific clarifying question naming
which other meeting it might duplicate and what content would need to be confirmed, then wait
for an answer before writing a verdict for that pair.

## Running the audit

For a list of recurring meetings, work through it in this order.

1. List every meeting with its name, cadence, attendee list and stated purpose exactly as
   given, without paraphrasing away detail that a later comparison might need.
2. Form every unique pair of meetings that share at least one attendee, since a pair with no
   shared attendee cannot be duplicating the same conversation.
3. For each pair, compare the two stated purposes and apply the core method above, reaching one
   of three verdicts: REDUNDANT, with the specific duplicated content named; DISTINCT, with the
   real difference in function named; or NEEDS CLARIFICATION, with the specific question that
   would resolve it.
4. Group every REDUNDANT verdict together at the end with a plain recommendation, drawn only
   from the stated purposes already given, for which meeting could absorb the other's content
   or which single meeting could replace both.

Pair this file with \`reference/overlap-worked-example.md\`, which works through five real
looking recurring meetings from one team, two of them flagged as redundant with the exact
duplicated content named, and three of them confirmed distinct, including a pair that shares
an attendee but serves genuinely different functions.

## What this skill refuses to do

It will not flag a pair of meetings as redundant because they share attendees, because they
cover the same team or project in general, or because their names sound alike. It will not
produce a summary judgment that two meetings seem to overlap without quoting the specific
content that repeats in both stated purposes. And it will not guess at a verdict for a pair
whose purposes are too thin to compare directly; it asks instead.
`;

const OVERLAP_WORKED_EXAMPLE_MD = `# Worked example: five recurring meetings, compared pairwise

Use this alongside \`SKILL.md\`. All five meetings below belong to the same product team. Every
pair that shares at least one attendee is compared directly against the core method, quoting
both stated purposes and naming any specific duplicated content.

## The five meetings

**Meeting A, Weekly Product Sync.** Monday, thirty minutes. Attendees: product manager,
engineering lead, design lead, QA lead. Stated purpose: "Review what shipped last week against
the roadmap, flag anything blocking this week's roadmap items, and reorder the backlog for the
week ahead based on what's blocking or shipped."

**Meeting B, Weekly Roadmap Review.** Wednesday, thirty minutes. Attendees: product manager,
engineering lead, design lead. Stated purpose: "Check progress on roadmap milestones since the
last review, discuss anything slowing roadmap items down, and re-rank the backlog for the
coming week."

**Meeting C, Engineering Daily Standup.** Every weekday, fifteen minutes. Attendees: all
engineers, including the engineering lead. Stated purpose: "Each engineer states what they
finished yesterday, what they're doing today, and anything blocking them, so blockers surface
immediately rather than waiting for the weekly sync."

**Meeting D, Engineer 1:1 with Engineering Lead.** Weekly, thirty minutes. Attendees: one
specific engineer, engineering lead. Stated purpose: "Check in on this engineer's workload and
career growth, address anything they don't want to raise in a group setting, and give
individual feedback on their recent work."

**Meeting E, Design Critique.** Every two weeks, forty five minutes. Attendees: design lead,
two designers, product manager. Stated purpose: "Review in progress design mockups against the
current sprint's requirements and give direct feedback on layout, copy and interaction details
before the work goes to engineering."

## Pair one: Meeting A and Meeting B, REDUNDANT

Purpose A: "Review what shipped last week against the roadmap, flag anything blocking this
week's roadmap items, and reorder the backlog for the week ahead based on what's blocking or
shipped."

Purpose B: "Check progress on roadmap milestones since the last review, discuss anything
slowing roadmap items down, and re-rank the backlog for the coming week."

Specific duplicated content: both meetings cover roadmap progress against milestones, both
cover blockers on roadmap items, and both end with reordering the backlog for the coming week.
Three of four attendees overlap, and the two meetings sit two days apart on the calendar,
before either one's output has had time to change. Verdict: REDUNDANT. The backlog reordering
and blocker discussion only need to happen once a week, not twice, and one of these two
meetings could absorb the other's content in full.

## Pair two: Meeting A and Meeting E, DISTINCT despite shared attendees

Purpose A covers shipped work, roadmap blockers and backlog order. Purpose E covers direct
feedback on in progress design mockups, layout, copy and interaction details, ahead of an
engineering handoff. Meeting A and Meeting E share the product manager and, through the design
lead's presence, a connection to design work, but no specific content repeats: reviewing a
mockup's layout is not the same activity as reordering a backlog, and neither purpose mentions
the other's content. Verdict: DISTINCT.

## Pair three: Meeting C and Meeting D, DISTINCT despite shared attendee

Purpose C is a daily status report: what shipped, what's next, what's blocking, from every
engineer in a group setting. Purpose D is a private, individual check in on one engineer's
workload, career growth and feedback on their work, explicitly including anything that engineer
would not raise in a group setting. These two meetings share one attendee, the engineer in
question, but serve genuinely different real functions: one is public status reporting to the
whole team, the other is a private conversation that depends on not being held in front of the
team. Verdict: DISTINCT. This is the same shape as a weekly one to one and a weekly team
standup sharing an attendee without being redundant.

## Pair four: Meeting B and Meeting E, DISTINCT

Purpose B covers roadmap milestone progress and backlog ranking. Purpose E covers direct
feedback on design mockups ahead of an engineering handoff. They share the product manager and
design lead, but no content overlaps: one is a status and prioritisation meeting, the other is
a working review of specific design artifacts. Verdict: DISTINCT.

## Writing up this audit

The write up groups Meeting A and Meeting B together as the one REDUNDANT pair found in this
set, states the specific duplicated content, roadmap progress, blockers and backlog order, and
recommends folding Meeting B's roadmap milestone check into Meeting A, since Meeting A already
covers the same three items on a cadence two days earlier. Meeting C, Meeting D and Meeting E
are each confirmed distinct and left on the calendar unchanged, with the specific reason each
one is distinct stated next to it rather than left implied.
`;

const meta: SkillMeta = {
  slug: "meeting-cadence-audit-skill",
  name: "Meeting Cadence Audit",
  title: "Meeting Cadence Audit Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that compares a team's recurring meetings pairwise to find genuine purpose overlap, quoting both meetings' stated purposes side by side and naming the specific duplicated content rather than guessing from shared attendees or similar names.",

  seo: {
    primaryKeyword: "meeting cadence audit skill",
    keywords: [
      "meeting cadence audit skill",
      "free ai skill for meeting redundancy",
      "downloadable meeting cadence checklist",
      "ai skill to find overlapping meetings",
      "checklist for auditing meeting overlap",
      "guide to comparing meeting purposes",
    ],
    seoTitle: "Meeting Cadence Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable meeting cadence audit skill that compares recurring meetings pairwise and names the specific content two meetings duplicate.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/overlap-worked-example.md", content: OVERLAP_WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Handed a list of separately scheduled recurring meetings and asked to find redundancy, models tend to judge each meeting on its own rather than comparing it directly against every other meeting on the list, so two meetings covering substantially the same ground never actually get set side by side. A shared attendee list is often treated as evidence of overlap on its own, flagging a manager's private one to one against a team standup even though the two serve different functions. This skill's pairwise method forces every meeting to be compared against every other meeting that shares an attendee, requires the specific duplicated content to be named and quoted from both stated purposes before a redundant verdict is reached, and separates attendee overlap from purpose overlap so the two are never conflated.",
  },

  article: {
    intro: [
      "A meeting cadence audit skill only earns its name if it can point to the exact sentence two meetings share, not just a feeling that a team's calendar looks crowded. Handed a list of a team's recurring meetings, most AI assistants will scan the list once and flag anything that sounds alike by name or shares a few attendees, without ever comparing the two meetings' actual stated purposes against each other directly. This skill holds a stricter line: a pair only gets marked redundant once their purposes are quoted side by side and the specific content they duplicate is named.",
      "It ships as two plain text files: a main instructions file defining the pairwise comparison method and the attendee overlap rule, and a worked example file running five real looking recurring meetings through every relevant pair, two flagged as redundant and three confirmed distinct. Both are previewable before you download the zip; this is a cross meeting audit, comparing a whole set of standing meetings against each other rather than judging any single one alone.",
    ],
    sections: [
      {
        heading: "Why comparing meetings pairwise beats scanning the whole list once",
        body: [
          "Reading down a list of ten recurring meetings once and noting which ones feel similar produces impressions, not findings. Two meetings can share a general subject, the same project or the same team, without their stated purposes actually covering the same content, and two meetings with very different names can quietly duplicate the same status report anyway.",
          "As a downloadable meeting cadence checklist, this skill's method is deliberately mechanical: every unique pair of meetings that shares at least one attendee gets its two stated purposes placed side by side and checked for a specific piece of shared content, an agenda item, a report, or a decision that appears in both. A pair with no shared attendee is skipped, since it cannot plausibly be duplicating the same live conversation.",
        ],
      },
      {
        heading: "The discipline: quote both purposes, name the specific overlap",
        body: [
          "A finding of redundancy is only as trustworthy as the evidence behind it. This skill requires every REDUNDANT verdict to quote both meetings' stated purposes exactly as given and to name the specific content that repeats in both, not a general resemblance in topic. Writing that two meetings might overlap, without quoting either purpose, is treated as a guess rather than a finding and is not an acceptable output.",
          "This is what separates a free ai skill for meeting redundancy worth trusting, an ai skill to find overlapping meetings rather than merely guess at them, from one that just flags anything that sounds repetitive on the calendar.",
        ],
      },
      {
        heading: "Shared attendees are a starting point, never the evidence itself",
        body: [
          "Two meetings sharing most of an attendee list can still serve entirely different functions, and two meetings sharing only one attendee can still duplicate a report in full. Attendee overlap decides which pairs are worth comparing; it never decides the verdict. Only a direct comparison of the two stated purposes, with the specific shared content named, can produce a REDUNDANT verdict.",
        ],
      },
      {
        heading: "A worked example: two meetings that duplicate a status report",
        body: [
          "Take a Monday product sync whose purpose covers what shipped against the roadmap, what's blocking this week's roadmap items, and reordering the backlog for the week ahead, and a Wednesday roadmap review whose purpose covers roadmap milestone progress, what's slowing items down, and re-ranking the backlog for the coming week, held by three of the same four people just two days apart. Roadmap progress, blockers and backlog order all appear in both stated purposes, which is the specific duplicated content that earns this pair a REDUNDANT verdict, with a recommendation that one meeting absorb the other rather than running both weekly.",
          "In the same example, a design critique meeting shares the product manager with both meetings but reviews mockup layout and interaction details, content appearing in neither of the other two purposes, so it stays DISTINCT despite the attendee overlap.",
        ],
      },
      {
        heading: "How this differs from the recurring meeting audit skill on this site",
        body: [
          "The recurring meeting audit skill on this site asks a different question about a single meeting at a time: does this one meeting's stated purpose actually require the group to be live, tested against a two part test for live decisions and real time collaborative work. It never compares two different meetings against each other.",
          "This meeting cadence audit skill starts from the opposite direction, assuming each individual meeting might be worth keeping and instead comparing every relevant pair of meetings on the list to find genuine purpose overlap. A team can run both: the recurring meeting audit skill to check whether any single meeting still needs to be live, and this checklist for auditing meeting overlap to check whether the meetings that remain are quietly duplicating each other.",
        ],
      },
      {
        heading: "Using the downloaded files together",
        body: [
          "Hand both files to an assistant or a teammate together, since the main instructions file points to the worked example file by its relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link and gives whoever runs the audit a concrete guide to comparing meeting purposes before they start on a real calendar.",
        ],
      },
    ],
    howTo: {
      name: "How to use the meeting cadence audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/overlap-worked-example.md before downloading, so you can see the pairwise method applied to five real looking meetings, including the redundant pair and the attendee overlap cases that stay distinct.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather every recurring meeting's real details",
          text: "Collect each meeting's name, cadence, attendee list and stated purpose exactly as it exists today, not a guess at what the meeting is probably for.",
        },
        {
          name: "Hand both files to your assistant and check every REDUNDANT verdict",
          text: "Keep the folder structure intact, then confirm that each REDUNDANT verdict quotes both stated purposes and names the specific duplicated content before you act on a recommendation to merge or cut a meeting.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly makes two recurring meetings count as redundant?",
        answer:
          "Their stated purposes have to share specific content, the same agenda item, report or decision, not just a similar subject or team. This skill requires both purposes to be quoted side by side and the shared content named before a REDUNDANT verdict is reached, so a general topic resemblance alone is never enough.",
      },
      {
        question: "Will this skill flag two meetings just because they share attendees?",
        answer:
          "No. Shared attendees only decide which pairs of meetings are worth comparing directly; they never decide the verdict on their own. A weekly one to one and a weekly team standup can share an attendee and still be confirmed distinct, because the skill checks the actual content of both stated purposes before reaching a verdict.",
      },
      {
        question: "How is this different from an audit that checks if one meeting should exist?",
        answer:
          "That is a separate question this skill does not answer. A companion skill on this site tests whether a single meeting's stated purpose requires the group to be live at all. This skill instead compares a whole set of meetings against each other to find purpose overlap, assuming each one individually might be worth keeping.",
      },
      {
        question: "What happens if a meeting's stated purpose is too vague to compare?",
        answer:
          "The skill asks a specific clarifying question naming which other meeting the vague one might duplicate and what content would need to be confirmed, rather than guessing either that it overlaps or that it does not. It waits for an answer before writing a verdict for that pair.",
      },
      {
        question: "Can this skill be used on a large list of recurring meetings at once?",
        answer:
          "Yes. It works down every unique pair of meetings sharing at least one attendee, so a longer list produces more pairs to compare rather than one overall judgment about the calendar. Each pair still gets its own verdict and named reasoning.",
      },
      {
        question: "Does downloading or previewing this skill send anything to a server?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the meeting list you eventually run this skill against is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/recurring-meeting-audit-skill",
        label: "recurring meeting audit skill",
        description: "Tests whether one meeting at a time needs to be live at all, a different question from comparing several different meetings against each other for overlap.",
      },
      {
        href: "/productivity-prompts/daily-standup-prompt",
        label: "daily standup prompt",
        description: "Structures the same status meeting used in this skill's worked example as the distinct counterpart to a private weekly one to one.",
      },
      {
        href: "/business-prompts/one-on-one-meeting-prompt",
        label: "one on one meeting prompt",
        description: "Prepares the private, individual meeting this skill's worked example confirms stays distinct from a team standup despite sharing an attendee.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description: "Builds the agenda for a single meeting once this skill's audit has confirmed that meeting is not duplicating another one's content.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2022/10/meeting-overload-is-a-fixable-problem",
        label: "Harvard Business Review: Meeting overload is a fixable problem",
        description: "An independent look at how meeting load accumulates on a calendar over time, the pattern this skill's pairwise comparison is built to catch between specific meetings.",
      },
      {
        href: "https://fellow.ai/blog/meetings/how-to-conduct-a-meeting-audit/",
        label: "Fellow: How to conduct a meeting audit in 7 steps",
        description: "A practical guide to auditing a calendar of standing meetings, covering the kind of redundant or overlapping sessions this skill's method targets directly.",
      },
      {
        href: "https://asana.com/resources/synchronous-vs-asynchronous-communication",
        label: "Asana: When to use synchronous vs asynchronous communication",
        description: "Distinguishes status reporting that does not need a live meeting from genuine live discussion, relevant once a redundant pair has been folded into one meeting.",
      },
      {
        href: "https://handbook.gitlab.com/handbook/company/culture/all-remote/asynchronous/",
        label: "GitLab Handbook: Asynchronous communication for remote work",
        description: "An independent, widely cited practice guide on which recurring content genuinely needs a live meeting once duplicated content between meetings has been removed.",
      },
    ],
  },

  tags: ["business", "meetings", "productivity", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
