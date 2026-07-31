import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Action Item Ownership Audit

Use this skill after a meeting or project check-in, given the actual list of action items
as written down (raw notes, a shared doc, a chat thread), to check every item against three
requirements before anyone treats it as tracked: a real owner, a real due date, and a real
action. Its whole value sits in one refusal: it will not invent a plausible owner or a
plausible date to make a vague item look tracked.

## What counts as a complete action item

A candidate line only counts as COMPLETE once it passes all three of these checks.

1. OWNER. A real named single person, not a team, a department, or a placeholder. "The team
   will look into it" is not an owner. "Priya will look into it" is. Two or more names
   attached to one item with nobody clearly in charge still fails this check, because shared
   ownership tends to become nobody's job in practice.
2. DATE. A real due date or a specific trigger, not a vague timeframe. "Soon", "ASAP", "this
   sprint" with nothing else, or "when we get to it" all fail this check. "By Friday",
   "before the next release", "by March 12" all pass.
3. ACTION. A concrete described action, not a vague topic. "Discuss pricing" is a topic.
   "Send the updated pricing sheet to finance for sign-off" is an action. A topic names a
   subject; an action names a specific, checkable thing that gets done.

Only mark an item COMPLETE when all three are present in the source material exactly as
written. Do not infer an owner from who raised the topic, do not infer a date from a
project's general cadence, and do not infer an action from what the topic implies someone
probably meant.

## How to check each item

Quote the item exactly as it appears in the source material, word for word, before judging
it. Then, for each of the three checks:

- State plainly whether it passes or fails.
- If it fails, name exactly which element is missing or too vague, and say why the specific
  wording does not qualify.
- If it passes, do not add anything not already stated in the source. A due date the item
  does not contain is not a due date to supply because it seems reasonable.

An item can fail on one, two, or all three checks. Report every failing element for that
item, not just the first one found; someone fixing an item needs the full list of what is
still missing, not a single flag.

## Marking the verdict

For every item, give one of two verdicts.

- COMPLETE, when all three checks pass. Restate the owner, the date, and the action as
  confirmed by the source material.
- INCOMPLETE, naming each missing or vague element by name (OWNER, DATE, or ACTION), with
  the specific reason each one fails. Never mark an item COMPLETE because two of three are
  strong; all three are required.

Pair this file with \`reference/worked-example.md\`, which walks through five real-looking
action items from one meeting, quoting each exactly and showing the verdict and reasoning
for each.

## Distinguishing an action item from a decision or a handoff

An action item is not the same artifact as a decision or a handoff document, and this skill
audits only the first of the three.

A decision is a choice a group settled on, something that was resolved, such as which
vendor to use. An action item is the task that follows from a decision, or that exists
independently of one, such as who does the work and by when. A meeting can produce a
decision with no action item attached, when the group agreed on a direction and nobody yet
owns the next move, and an action item with no decision behind it, when a recurring task is
simply assigned again. Checking whether something was decided is a different question from
checking whether a decision's follow-through is properly assigned, and this skill only does
the second.

A handoff document is a different artifact again: a structured account of the current state
of a broader piece of work, the reasoning behind past choices, and what happens next,
usually written when responsibility for an entire project or role transfers to someone
else. A handoff's next steps section may itself contain several action items, but a handoff
is judged on whether it explains the context a successor needs, not on whether each
individual line has an owner and a date in the narrow sense this skill checks. Running this
skill against a single line pulled from a handoff's next steps section is a reasonable use
of it; running it against the whole handoff document is not what it is built for.

## What this skill refuses to do

It will not name a likely owner because that person spoke the most about the topic, was
mentioned nearby in the notes, or usually does that kind of work. It will not supply a due
date because the topic sounds urgent or the team usually works in two week sprints. It will
not turn a vague topic into a specific action by guessing what someone probably meant.
Every verdict traces only to words that are actually present in the exact line being
audited, and every gap gets reported honestly rather than filled in with something
plausible.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing five action items for owner, date, and action

Use this alongside \`SKILL.md\`. Below are five action items as they were actually written
down after a project meeting, followed by the audit each one receives.

## The raw action items, as written

1. "Marcus will update the onboarding email copy and have it ready for review by Thursday."
2. "The team will look into the checkout bug at some point."
3. "Discuss pricing with the finance team."
4. "Priya will send the Q3 budget draft to leadership by end of day Friday."
5. "Someone should follow up with the vendor about the contract soon."

## The audit

Item 1: "Marcus will update the onboarding email copy and have it ready for review by
Thursday."
- OWNER: pass. Marcus is a real named single person.
- DATE: pass. Thursday is a specific due date.
- ACTION: pass. Update the onboarding email copy and have it ready for review is a concrete
  described action, not a topic.
- Verdict: COMPLETE.

Item 2: "The team will look into the checkout bug at some point."
- OWNER: fail. "The team" is not a real named single person; nobody is individually
  responsible for this line.
- DATE: fail. "At some point" states no real due date or trigger.
- ACTION: fail. "Look into" names a general direction, not a concrete described action; it
  does not say what looking into the bug actually involves doing.
- Verdict: INCOMPLETE, missing OWNER, DATE, and ACTION.

Item 3: "Discuss pricing with the finance team."
- OWNER: fail. No person is named as responsible for making this happen.
- DATE: fail. No due date or trigger is stated anywhere in the line.
- ACTION: fail. "Discuss pricing" is a topic, not an action; it names a subject to talk
  about without saying what the outcome of that conversation should be or who initiates it.
- Verdict: INCOMPLETE, missing OWNER, DATE, and ACTION.

Item 4: "Priya will send the Q3 budget draft to leadership by end of day Friday."
- OWNER: pass. Priya is a real named single person.
- DATE: pass. End of day Friday is a specific due date.
- ACTION: pass. Send the Q3 budget draft to leadership is a concrete described action.
- Verdict: COMPLETE.

Item 5: "Someone should follow up with the vendor about the contract soon."
- OWNER: fail. "Someone" is explicitly not a named person; the line itself signals nobody
  has been assigned yet.
- DATE: fail. "Soon" states no real due date.
- ACTION: pass. Follow up with the vendor about the contract is a concrete described
  action; it names who to contact and about what, even though nobody has been assigned to
  do it yet.
- Verdict: INCOMPLETE, missing OWNER and DATE.

## What this worked example shows

Items 1 and 4 pass all three checks because each one names a real single person, a real due
date, and a concrete action, all stated directly in the line itself, not inferred from
context. Item 5 shows that an item can have a genuinely concrete action while still failing
on the other two elements; a strong action does not excuse a missing owner or date. Items 2
and 3 fail on all three elements in different ways: item 2 uses a collective placeholder for
the owner and a vague direction for the action, while item 3 never gets past being a topic
at all, since nothing in the line describes an action to take, let alone who takes it or by
when.

## The mistake this skill exists to prevent

A weaker audit might look at item 2 and assume "the team" really means whoever is on point
for checkout issues, or look at item 5 and assume "soon" really means by the end of the
week, since that is a common cadence on many teams. Filling in either gap with a plausible
guess is exactly the failure this skill is built to catch. The honest output for both items
is INCOMPLETE, with the specific missing element named, not a quietly completed version of
the line that was never actually written that way.

## Using this worked example

When applying \`SKILL.md\` to your own list of action items, quote each line exactly as it
was written, then run it through the same three checks used above: owner, date, action. If
any one of the three depends on filling in something the line does not actually say, the
item is INCOMPLETE, no matter how reasonable the missing piece would be to guess.
`;

const meta: SkillMeta = {
  slug: "action-item-ownership-audit-skill",
  name: "Action Item Ownership Audit",
  title: "Action Item Ownership Audit Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that checks each action item from a meeting against three requirements, a named single owner, a real due date, and a concrete described action, and refuses to invent whichever one is missing.",

  seo: {
    primaryKeyword: "action item ownership audit skill",
    keywords: [
      "action item ownership audit skill",
      "free ai skill for action items",
      "downloadable action item checklist",
      "ai skill to check meeting action items",
      "how to audit action items for owners and dates",
    ],
    seoTitle: "Action Item Ownership Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable action item ownership audit skill that checks each meeting action item for a named owner, a real due date, and a concrete action.",
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
      "Given a raw list of action items, models reliably treat two out of three required elements as good enough, marking an item tracked because it has a concrete action and a name attached even when the date is only 'soon', or because it has a date and a topic even when the owner is 'the team'. A second common failure is filling a genuinely missing owner or date with a plausible guess drawn from who spoke about the topic or the project's usual cadence, then presenting that guess as though it were stated. This skill's three part test requires every one of owner, date and action to be present and forces a verdict that names exactly which element is missing rather than rounding a partial item up to complete.",
  },

  article: {
    intro: [
      "An action item ownership audit skill only earns its name if it refuses to round a partial item up to complete. Handed a raw list of action items from a meeting, most AI assistants treat two strong elements as enough: a concrete action with a vague deadline gets waved through, a named owner with no date attached gets waved through, because the item reads as though someone is on it. This skill is built to catch that shortcut.",
      "The mechanism is a three part test applied to every item exactly as written: does it name a real single owner, does it state a real due date, and does it describe a concrete action rather than a topic. An item only earns a COMPLETE verdict when all three are present in the source material, and an item missing any one of them gets marked INCOMPLETE with the specific missing element named, not a guessed owner or an invented date standing in for one that was never stated.",
      "It ships as two plain text files: a main instructions file and a worked example that audits five real-looking action items from one meeting, quoting each exactly and showing the reasoning behind every verdict. Both are previewable in full before you download the zip.",
    ],
    sections: [
      {
        heading: "Why two out of three reads as tracked when it is not",
        body: [
          "An action item with a name attached and a rough sense of urgency looks handled at a glance, even when the actual deadline is 'soon' or the actual action is a topic like 'discuss pricing'. Built as a free ai skill for action items rather than a general meeting summariser, this skill treats that resemblance as the exact risk it exists to catch.",
          "The gap only shows up when every element is checked independently instead of judged on overall impression. A strong action does not excuse a missing date, and a strong date does not excuse a missing owner. Each of the three has to clear its own bar.",
        ],
      },
      {
        heading: "The three part test: owner, date, action",
        body: [
          "As an ai skill to check meeting action items, its method reduces to one check run on every candidate line. OWNER asks whether a real named single person, not a team or a placeholder, is responsible. DATE asks whether a real due date or specific trigger was stated, not a vague timeframe like soon or ASAP. ACTION asks whether the line describes a concrete, checkable thing to do, not a topic to talk about.",
          "How to audit action items for owners and dates comes down to running exactly this test against the wording actually written, not the wording a reasonable person would expect to find nearby.",
        ],
      },
      {
        heading: "Why the verdict names the missing element rather than a vague flag",
        body: [
          "A downloadable action item checklist earns its keep by being specific about failure, not just detecting it. When an item fails, the output names OWNER, DATE, or ACTION by name and states why the exact wording does not qualify, so whoever owns the list knows precisely what to go back and ask for rather than being told the item is merely incomplete.",
          "An item can fail on more than one element at once, and the audit reports every failing element together rather than stopping at the first one found, since a person fixing the item needs the full list of gaps in one pass.",
        ],
      },
      {
        heading: "Action items are not decisions and not handoffs",
        body: [
          "A meeting decision is a resolved choice the group settled on; an action item is the task that follows from it, or one that exists on its own with no decision behind it. Auditing whether something was decided is a different job from auditing whether its follow-through has a real owner and date.",
          "A handoff document is broader still: current state, the reasoning behind past choices, and next steps for someone taking over a whole piece of work. A handoff's next steps section can contain several action items worth auditing individually, but the handoff as a whole is judged on context, not on whether each line clears this narrower test.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not name a likely owner because that person spoke the most, was mentioned nearby, or usually handles that kind of work. It will not supply a due date because the topic sounds urgent or the team's typical cadence suggests one. It will not turn a topic into an action by guessing what was probably meant, and every verdict traces only to the words actually present in the line under audit.",
        ],
      },
      {
        heading: "Using the downloaded files together",
        body: [
          "Hand both files to a teammate or an AI assistant together, since the main instructions file points to the worked example by its relative path. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that link and gives a concrete standard to check real action items against.",
        ],
      },
    ],
    howTo: {
      name: "How to use the action item ownership audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you can see the three part test and how it applies to five real action items.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the raw action items",
          text: "Collect the actual lines from the meeting notes, shared doc, or chat thread, not a cleaned-up summary someone already wrote. The owner, date and action checks need the original wording to work against.",
        },
        {
          name: "Hand both files to your assistant and review the verdicts",
          text: "Keep the folder structure intact, then paste in your list and check every INCOMPLETE item for the specific missing element named, rather than assuming a partial item is close enough.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly makes an owner count as real?",
        answer:
          "A real named single person stated in the item itself, not a team, a department, or a placeholder like TBD. Two or more names attached with nobody clearly in charge still fails this check, since shared ownership tends to become nobody's job once the meeting ends.",
      },
      {
        question: "What counts as a vague date versus a real one?",
        answer:
          "Words like soon, ASAP, or this sprint with nothing else attached all fail, because they describe a general sense of urgency rather than a checkable point in time. A specific date, an end of day deadline, or a named trigger like before the next release all pass, since each one gives a concrete point to check the item against.",
      },
      {
        question: "How is a vague topic different from a concrete action?",
        answer:
          "A topic names a subject to talk about, such as discuss pricing, without saying what the outcome should be. A concrete action names a specific, checkable thing that gets done, such as send the updated pricing sheet to finance for sign-off, which someone can verify as completed or not.",
      },
      {
        question: "Can an item pass on two of the three checks and still count as tracked?",
        answer:
          "No. This action item ownership audit skill's instructions are explicit that all three, owner, date, and action, are required for a COMPLETE verdict. An item with a strong owner and action but a vague date is marked INCOMPLETE with DATE named as the missing element.",
      },
      {
        question: "How is this different from a meeting decision capture skill?",
        answer:
          "A decision capture skill checks whether a topic was actually resolved by the group, separate from whether any follow-through task has an owner or date attached. This skill starts one step later: given an action item, it checks only whether that item itself names a real owner, date, and action.",
      },
      {
        question: "Can this run against a single line pulled from a handoff document?",
        answer:
          "Yes, and that is a reasonable use of it. A handoff's next steps section often lists several action items worth checking individually. Running this skill against the whole handoff document is not what it is built for, since a handoff is judged on context and reasoning, not this narrower test.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the action items you use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/productivity-skills/meeting-decision-capture-skill",
        label: "meeting decision capture skill",
        description: "For checking whether a topic was actually resolved into a decision, a different artifact from whether an action item's owner and date are real.",
      },
      {
        href: "/skills/productivity-skills/task-handoff-skill",
        label: "task handoff skill",
        description: "For auditing a broader handoff document's context and next steps, which this narrower three part test can be run against line by line.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description: "A one-off writeup that produces action items in the first place, a natural source list to run this skill's audit against afterward.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description: "For assigning a real owner and scope before work starts, rather than auditing whether an owner was actually named after the fact.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2017/07/stop-the-meeting-madness",
        label: "Harvard Business Review: Stop the meeting madness",
        description: "Documents how much of a typical meeting produces discussion rather than tracked follow-through, the exact gap this skill's three part test is built to close.",
      },
      {
        href: "https://asana.com/resources/meeting-notes-tips",
        label: "Asana: Meeting notes tips and tracking actions",
        description: "Independent guidance recommending that action items capture the task, the person responsible, and the due date together as a single unit.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Responsibility_assignment_matrix",
        label: "Wikipedia: Responsibility assignment matrix",
        description: "Explains why formal project management practice requires exactly one accountable person per task, the same single-owner standard this skill's OWNER check enforces.",
      },
      {
        href: "https://www.indeed.com/career-advice/career-development/how-to-write-meeting-minutes",
        label: "Indeed: How to write meeting minutes",
        description: "Independent guidance on recording assignments and their deadlines as core elements of usable meeting minutes.",
      },
    ],
  },

  tags: ["business", "action items", "accountability", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
