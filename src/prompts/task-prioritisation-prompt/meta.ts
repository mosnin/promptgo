import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "task-prioritisation-prompt",
  name: "Backlog Scarcity Ranker",
  title: "Task Prioritisation Prompt",
  category: "productivity-prompts",
  taskType: "evaluate",
  summary:
    "Caps the critical tier at five items, forces a mandatory drop list with a named consequence for each cut, and checks the total against your real hours.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["backlog", "prioritisation", "capacity", "planning"],

  seo: {
    primaryKeyword: "task prioritisation prompt",
    keywords: [
      "task prioritisation prompt",
      "how to prioritise a backlog of tasks",
      "ai prompt for ranking work by impact",
      "forcing a cap on important tasks",
      "deciding what to drop this week",
      "task list that never gets shorter",
    ],
    seoTitle: "Task Prioritisation Prompt: Rank, Cap and Drop",
    seoDescription:
      "A task prioritisation prompt that caps how many items count as critical, makes you justify every cut, and checks the survivors against the hours you have.",
  },

  prompt: {
    text: `You are prioritising a work backlog for one person for one week. Your job is to create scarcity, not order. A reordered list of the same length is a failed answer.

TASKS: {{TASKS}}
WHAT SUCCESS THIS WEEK LOOKS LIKE: {{OUTCOME}}
HOURS OF REAL WORKING TIME AVAILABLE: {{CAPACITY}}
FIXED COMMITMENTS I CANNOT MOVE: {{FIXED}}

Rules you may not break.

1. At most five tasks may be marked CRITICAL. If a sixth qualifies, one of the five has to leave. Name the one you displaced and why.
2. Every task lands in exactly one tier: CRITICAL, LATER or DROP. There is no medium tier and no maybe.
3. DROP is mandatory and holds at least a quarter of the tasks. For each dropped task write one line naming who is harmed if it is never done. If nobody is harmed, say nobody.
4. The CRITICAL tier must fit the stated hours once fixed commitments are removed. Estimate each task in hours and show the running total. If it overshoots, cut a task. Do not shrink estimates to make it fit.
5. Rank CRITICAL by what is blocked if it slips, not by deadline and not by effort.

Output one table with columns: task, tier, hours, what breaks if it slips. Then three closing lines: critical hours against available hours, the task you were least confident tiering, and the one item that looks like work but is really somebody else's decision waiting to be made.`,
    variables: [
      {
        token: "TASKS",
        label: "Every task on your list, including the stale ones",
        example:
          "Rewrite the onboarding checklist. Reply to the auditor. Fix the broken export. Interview two candidates. Draft the Q4 headcount case. Migrate the old dashboard. Update the team wiki. Chase the vendor invoice.",
      },
      {
        token: "OUTCOME",
        label: "What would make the week a success, stated as a result",
        example:
          "The Q4 headcount case is with finance and the export bug is closed so support stops filing duplicates.",
      },
      {
        token: "CAPACITY",
        label: "Hours of real working time left this week",
        example: "About 19 hours, mostly Tuesday afternoon and Thursday",
      },
      {
        token: "FIXED",
        label: "Commitments you cannot move",
        example:
          "Two hours of standup, a four hour offsite on Wednesday, and interviews already booked on Friday morning",
      },
    ],
    expectedOutput:
      "A single table where at most five tasks are critical, a quarter or more sit in drop with a named person harmed or nobody, hour totals shown against capacity, and three closing lines including the disguised decision.",
    followUps: [
      "Take the critical five and give me a calendar shape for the week, longest task first, with the fixed commitments already in place.",
      "For every dropped task where you wrote nobody, tell me whether it should be deleted outright or kept as a someday note.",
      "Compare this against last week's critical tier and list anything that has now survived two weeks without being finished.",
    ],
    pitfalls: [
      "Feeding a partial list produces a partial decision. The items you have been quietly carrying for two months are the ones the drop tier exists for.",
      "If you rescue five dropped items, the capacity number was wrong rather than the cut. Fix the number and rerun rather than arguing item by item.",
      "Hour estimates for anything involving another person run low. Add a third to any task whose first step is asking somebody for something.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Ask for a priority order and a model returns the same twenty tasks in a new sequence with nothing removed, because reordering feels like an answer while cutting feels like a loss. A mandatory drop quota changes the output entirely, and an hours estimate per item exposes work whose first step is waiting on somebody else.",
  },

  article: {
    intro: [
      "A task prioritisation prompt has one job that is harder than it looks: give back a shorter list. Ranking is easy and nearly worthless, because twenty things in a better order is still twenty things and the week is still the same length.",
      "Models are relentlessly accommodating here. Left to their own judgement they keep everything, mark seven items high priority, and file the remainder as important but not urgent, a phrase that has never once caused anybody to stop doing something.",
      "So the constraints carry the weight. Five critical items at most, a compulsory drop tier, an hours total that has to fit the week, and a written justification attached to every removal.",
    ],

    sections: [
      {
        heading: "Ranking is not prioritising",
        body: [
          "Prioritising means some things do not happen. Ranking means everything happens in a particular sequence, which is a claim about available time that nobody has checked.",
          "Anyone working out how to prioritise a backlog of tasks meets the same arithmetic eventually: the list grows faster than the week does. Sequence does not touch that. Subtraction does, and subtraction is the operation people avoid, because it requires naming somebody who will be disappointed.",
        ],
      },
      {
        heading: "Why the task prioritisation prompt caps critical at five",
        body: [
          "A hard cap is a crude instrument, which is precisely why it works. Without one, the model treats importance as a property of each task examined alone, and almost everything is important when examined alone.",
          "Forcing a cap on important tasks makes comparison unavoidable. A sixth candidate cannot join without displacing one of the five, so the model has to argue that this beats that rather than that both are worthwhile. An ai prompt for ranking work by impact is only useful once impact is allowed to run out.",
        ],
      },
      {
        heading: "The drop tier is compulsory on purpose",
        body: [
          "Requiring a quarter of the list to go is arbitrary. It is also the only dependable way to get a model to remove anything at all. Offered the choice, it fills a low priority tier and considers the job finished, which is how a task list that never gets shorter stays that way for years.",
          "The justification matters as much as the cut. Each dropped item carries a line naming who is harmed if it is never done. Most produce no name, and that is the useful finding. The two that do produce a name are the ones you rescue, deliberately, rather than by keeping everything.",
        ],
      },
      {
        heading: "Hours, not effort scores",
        body: [
          "Effort scores cannot be falsified. A task rated medium effort cannot be tested against a Tuesday. Hours can. The prompt estimates each surviving task in hours, subtracts your fixed commitments, and shows the running total against what is left.",
          "When the total overshoots, the instruction is to cut a task rather than shave the estimates, because shaved estimates are how a plan stays technically feasible and practically false. Deciding what to drop this week gets much easier once the arithmetic has already told you roughly how much has to go.",
        ],
      },
      {
        heading: "Rank by what is blocked, not by what is loud",
        body: [
          "Deadlines measure who asked most recently. Blocking measures what stops moving if this slips. The two diverge constantly, and most of the value in a ranking sits in that gap.",
          "A task that unblocks three colleagues outranks a task with a Thursday date that nobody is waiting on. Asking for what breaks if it slips as a visible column forces that reasoning into the open, where you can read it and disagree with it in a few seconds.",
        ],
      },
      {
        heading: "The line that catches disguised decisions",
        body: [
          "The final output line asks for the item that looks like work but is really somebody else's decision waiting to be made. In practice this is the most valuable sentence the whole thing produces.",
          "Backlogs collect these. An item sits for weeks, gets carried from list to list, and is never finished because it cannot be: it is waiting on an approval, a budget or a choice that was never yours. Naming it converts something you feel vaguely guilty about into a message you can send in under a minute.",
        ],
      },
    ],

    table: {
      caption: "What each tier commits you to",
      headers: ["Tier", "Limit", "What it means", "What it owes you"],
      rows: [
        ["Critical", "Five items, must fit the hours", "Blocked out this week", "A named consequence if it slips"],
        ["Later", "No limit", "Reviewed next Monday, untouched until then", "Nothing until the review"],
        ["Drop", "At least a quarter of the list", "Removed, not deferred", "One line naming who is harmed"],
      ],
    },

    howTo: {
      name: "How to run the task prioritisation prompt",
      steps: [
        {
          name: "Bring the whole list, including the embarrassing parts",
          text: "Half a backlog produces half a decision. The items you have been quietly carrying since spring are the ones this is designed to remove.",
        },
        {
          name: "State capacity after meetings, not before",
          text: "Count only hours that are genuinely free. A forty hour week holding eleven hours of standing meetings and an offsite is a twenty something hour week.",
        },
        {
          name: "Write the outcome as a result, not a list",
          text: "If the success field restates the tasks, there is nothing to prioritise against and the model falls back to whichever item sounds most urgent.",
        },
        {
          name: "Read the harm column first",
          text: "Go to the drop tier before the critical one. That is where a wrong call hides, and it takes about thirty seconds to check.",
        },
        {
          name: "Block the critical five in the calendar immediately",
          text: "A tier that never becomes an hour in a diary is a preference. Booking the time is what turns the cut into a commitment.",
        },
      ],
    },

    faq: [
      {
        question: "What if more than five tasks genuinely are critical?",
        answer:
          "Then the week is oversubscribed, and that is the finding rather than a flaw in the cap. The sixth candidate still appears, sitting in the later tier with a note attached. Seeing it there is what starts the conversation with whoever owns the extra work.",
      },
      {
        question: "Does the task prioritisation prompt work on a shared team backlog?",
        answer:
          "It works on one person's slice of one. Team backlogs need dependency ordering and negotiation between owners, which this deliberately does not attempt. Run it per person instead, then compare critical tiers and look for the same item claimed by two people.",
      },
      {
        question: "Why insist on hour estimates when they are usually wrong?",
        answer:
          "A wrong number can be corrected and a vague label cannot. An estimate of six hours that turns out to be nine still told you the task would not fit beside four others. A rating of medium effort tells you nothing you can test against a calendar.",
      },
      {
        question: "How often should I rerun it?",
        answer:
          "Weekly, at a fixed time, feeding last week's output back in as part of the input. Anything that has sat in the later tier for three consecutive weeks should default to drop, because three deferrals is the list telling you something you have not accepted.",
      },
      {
        question: "Will it eventually cut something that mattered?",
        answer:
          "Occasionally, which is why every removal carries the line naming who is harmed. Scanning that column takes half a minute and catches the error while it is still cheap. A process that never cuts anything wrong is not cutting enough to change your week.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "Takes the surviving critical tier and places it against the meetings you cannot move.",
      },
      {
        href: "/productivity-prompts/inbox-triage-prompt",
        label: "inbox triage prompt",
        description:
          "Most backlog growth arrives by email, so triage upstream before the list gets this long again.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description:
          "Run this when the capacity number keeps turning out to be wrong by the same amount every week.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the disguised decision the last output line surfaces, which needs a memo rather than a task.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: Chain of thought prompting",
        description:
          "Why asking for the blocking consequence in a visible column produces better tiering than asking for a score.",
      },
      {
        href: "https://arxiv.org/abs/2201.11903",
        label: "Wei et al: Chain of thought prompting elicits reasoning",
        description:
          "The original evidence that forcing intermediate reasoning into the output improves comparative judgements.",
      },
      {
        href: "https://hbr.org/2011/05/the-power-of-small-wins",
        label: "Harvard Business Review: The power of small wins",
        description:
          "Backs the claim that finishing a small number of tracked items beats progress spread thinly across many.",
      },
    ],
  },
};

export default meta;
