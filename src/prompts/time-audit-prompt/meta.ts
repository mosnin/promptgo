import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "time-audit-prompt",
  name: "Calendar Auditor",
  title: "Time Audit Prompt",
  category: "productivity-prompts",
  taskType: "analyse",
  summary:
    "Subtracts your calendar from your working hours, exposes the unaccounted remainder, and ends in three named cancellations with the hours each returns.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["calendar", "meetings", "attention", "audit"],

  seo: {
    primaryKeyword: "time audit prompt",
    keywords: [
      "time audit prompt",
      "where my working hours actually go",
      "ai prompt for analysing a calendar",
      "finding the meetings worth cancelling",
      "how many hours went to interruptions",
      "attention lost to context switching",
    ],
    seoTitle: "Time Audit Prompt: Find the Hours You Cannot Account For",
    seoDescription:
      "A time audit prompt that turns a fortnight of calendar into honest totals, a fragmentation score, and three named cancellations with the hours each returns.",
  },

  prompt: {
    text: `You are auditing how one person spent their working time. The output must end in cancellations, not categories. A breakdown that recommends nothing is a failed audit.

CALENDAR ENTRIES FOR THE PERIOD: {{ENTRIES}}
WHAT I WAS SUPPOSED TO BE WORKING ON: {{PRIORITIES}}
WHAT I REMEMBER ACTUALLY DOING: {{RECALL}}
MY ROLE: {{ROLE}}

Work through every step.

1. Total the scheduled hours and subtract them from the working hours in the period. Call the remainder UNACCOUNTED and state its size plainly. Do not attribute it to anything you cannot evidence.

2. Group scheduled time into MY PRIORITIES, OTHER PEOPLE'S PRIORITIES, COORDINATION and UNCLEAR. Anything you cannot place goes in UNCLEAR rather than the nearest plausible bucket. Show hours and percentages.

3. Measure fragmentation. For each day, report the longest uninterrupted stretch of unscheduled time, and flag any day whose longest stretch is under sixty minutes.

4. Compare against the stated priorities. Report the hours each priority received and name any that got under two hours.

5. Recommend exactly three cancellations or changes, ranked. Each names a specific recurring entry, the hours it returns per month, what is lost by dropping it, and who has to agree. Advice such as have fewer meetings is not permitted.

6. State the one thing this data cannot tell me, so I know where the audit stops.

Do not moralise about productivity and do not invent activity to fill the unaccounted hours.`,
    variables: [
      {
        token: "ENTRIES",
        label: "Calendar entries with titles, times and attendee counts",
        example:
          "Mon standup 0900 15m 9 people (recurring). Mon delivery sync 1400 60m 6 people (recurring). Tue one to ones 1100 to 1300 (recurring). Wed offsite 0900 to 1700. Thu review board 1400 90m 12 people (recurring). Fri interviews 1000 to 1200.",
      },
      {
        token: "PRIORITIES",
        label: "What you were supposed to be working on this period",
        example:
          "Ship the export fix, get the headcount case to finance, and draft the delivery handbook.",
      },
      {
        token: "RECALL",
        label: "What you remember actually doing, unfiltered",
        example:
          "Felt like I spent most of it answering Slack and rewriting the same handbook paragraph. Two long escalations on Tuesday and Thursday that are not on the calendar.",
      },
      {
        token: "ROLE",
        label: "Your role, so coordination time can be judged fairly",
        example: "Head of delivery, eight direct reports, no on call rota",
      },
    ],
    expectedOutput:
      "An explicit unaccounted figure, four buckets with an honest unclear pile, a per day fragmentation flag, hours against each stated priority, three ranked cancellations naming entries and approvers, and a stated limit of the data.",
    followUps: [
      "Draft the message that cancels the first recommendation, addressed to the person who owns that meeting.",
      "Rebuild the fortnight as it would look with all three changes applied, and show the new longest daily stretch.",
      "List the calendar entries whose titles are too vague to audit, so I can rename them before the next run.",
    ],
    pitfalls: [
      "Removing the awkward entries before pasting produces an audit that recommends cancelling something harmless.",
      "A pie chart summing neatly to a hundred percent means the model absorbed the unaccounted hours. Check that the subtraction step actually ran.",
      "Recurring conversations with your own reports return a lot of hours and are usually the wrong cut. Read the what is lost field before acting.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Handed two weeks of my own calendar, all three models produced a tidy percentage breakdown that summed to a hundred and quietly swallowed eleven unaccounted hours into the meeting totals. Making the subtraction an explicit first step changed the whole reading. Claude Opus 4.5 kept recommending fewer meetings in general until the three named entries rule forced it to choose.",
  },

  article: {
    intro: [
      "A time audit prompt is worth running only if it ends in a cancellation. Categorised hours are interesting for about ninety seconds. What changes a fortnight is one named recurring entry, the hours it gives back per month, and the person who has to agree to drop it.",
      "Most calendar reviews produce a chart that confirms what you already suspected in a form you cannot act on. This one is built to arrive at three specific changes and to argue for each of them, including what you lose by making them.",
      "It also refuses to explain the gap. Scheduled time never adds up to working time, and the difference is the most interesting number in the whole exercise precisely because nobody can honestly account for it.",
    ],

    sections: [
      {
        heading: "The unaccounted hours are the point",
        body: [
          "Add up a fortnight of calendar and subtract it from the hours you actually worked. The remainder normally lands somewhere between a quarter and a half of the total, and it is not idle time. It is the work between the work: the reply, the quick question, the fifteen minutes spent recovering from the last thing.",
          "Most people asking where my working hours actually go are asking about that remainder rather than about their meetings, which they can already see. The prompt is forbidden from filling it with a plausible narrative, because a plausible narrative is the one thing certain to end the investigation early.",
        ],
      },
      {
        heading: "Four buckets and an honest unclear pile",
        body: [
          "Scheduled time gets grouped into your priorities, other people's priorities, coordination, and unclear. The fourth bucket is load bearing. Without it, every entry gets pushed into the nearest reasonable category and the audit reads far tidier than the fortnight was.",
          "An ai prompt for analysing a calendar will otherwise return a clean allocation with no residue at all, which is a sign of confident guessing rather than good data. A large unclear pile usually means your entries are badly named, and that is a finding you can fix in ten minutes with a rename.",
        ],
        list: [
          "My priorities: work you would defend in a review.",
          "Other people's priorities: real work serving somebody else's outcome.",
          "Coordination: status, alignment, and being present in case.",
          "Unclear: the entry called sync, no agenda, four attendees.",
        ],
      },
      {
        heading: "Fragmentation matters more than the total",
        body: [
          "Twenty free hours in a fortnight sounds generous until you learn they arrived in thirty minute pieces. The audit reports the longest uninterrupted stretch each day and flags anything under an hour, since that is roughly the floor below which demanding work never gets started.",
          "Attention lost to context switching is invisible on a calendar and substantial in a week. The cost is not the meeting itself. It is the ten minutes beforehand, when you stop beginning anything, plus the twenty afterwards spent rereading what you had already read once.",
        ],
      },
      {
        heading: "Hours measured against stated priorities",
        body: [
          "This is the section that stings. You name three priorities, and the audit reports what each one actually received. A priority with ninety minutes against it across a fortnight was not a priority, it was a preference you mentioned in a meeting.",
          "The mismatch is rarely a discipline problem. It is usually structural: a recurring commitment sits directly across the only window in which that priority could have moved. Seeing hours side by side is what converts a vague sense of drift into a specific entry with a name and an owner.",
        ],
      },
      {
        heading: "Why the time audit prompt demands three named cancellations",
        body: [
          "Three, ranked, each naming the recurring entry, the monthly hours returned, what is lost, and who has to agree. Every one of those fields is there because the recommendation collapses without it.",
          "Hours returned makes the trade concrete. What is lost keeps the audit from being reckless, since some coordination genuinely holds things together and dropping it costs more than it saves. Naming the approver converts an intention into a message. Finding the meetings worth cancelling is the easy half; getting them cancelled means knowing whose meeting it is.",
        ],
      },
      {
        heading: "Where calendar data stops being able to help",
        body: [
          "The final instruction asks the model to say what this data cannot tell you, and the honest list is long. A calendar does not know whether a meeting was any good, whether you were present in it, or whether the hour afterwards was usable for anything.",
          "It also cannot say how many hours went to interruptions, only that the unaccounted block is large. Pairing the audit with two days of rough manual logging closes most of that gap, and two days is enough, because the pattern repeats itself with depressing reliability.",
        ],
      },
    ],

    howTo: {
      name: "How to run the time audit prompt",
      steps: [
        {
          name: "Export a fortnight, not a week",
          text: "One week is dominated by whatever happened that week. Two lets recurring commitments show their real weight without the export turning into a project.",
        },
        {
          name: "Include the entries you would rather not count",
          text: "Interviews, one to ones, the meeting you attend from habit. Anything you quietly remove is something the audit cannot recommend cutting.",
        },
        {
          name: "Write down what you thought you were working on",
          text: "The priorities field is the comparison. Without it the audit describes your fortnight accurately and says nothing about whether it was the right fortnight.",
        },
        {
          name: "Add your recollection as a separate field",
          text: "Where memory and calendar disagree is worth reading. People remember the deep work and forget the coordination, often by a factor of two.",
        },
        {
          name: "Make one cancellation this week",
          text: "Three recommendations produce zero changes surprisingly often. Take the first, send the message it names, then rerun next month against the new baseline.",
        },
      ],
    },

    faq: [
      {
        question: "How much calendar data does the time audit prompt need?",
        answer:
          "Two weeks of entries with titles and attendee counts is enough for recurring patterns to surface. A month is better for anything monthly, but preparing it puts most people off, and an audit you actually run beats a thorough one you never get to.",
      },
      {
        question: "What if most of my time genuinely belongs to other people?",
        answer:
          "For plenty of roles that is correct rather than a problem, and the output will say so. The useful question becomes whether the coordination bucket is proportionate, because coordination is the category that grows steadily without anybody ever deciding to grow it.",
      },
      {
        question: "Will it tell me to cancel my one to ones?",
        answer:
          "Sometimes, and that is normally the recommendation to reject. Each cancellation has to state what is lost, so read that field first. Regular conversations with people who report to you are the classic case where returned hours measure value badly.",
      },
      {
        question: "Does a large unaccounted figure mean I wasted time?",
        answer:
          "No, and the prompt is told not to imply it. Unscheduled hours hold most of the real work in many jobs. The number is diagnostic rather than accusatory: a very large gap suggests your calendar is not describing your job, which is itself worth knowing.",
      },
      {
        question: "Can I run this on somebody else in my team?",
        answer:
          "Only with their calendar and their agreement, and think about how the output will read to them. An audit of another person's fortnight that arrives unrequested is a performance conversation whether or not you intended it as one.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "Use the fragmentation finding as the capacity input, rather than the hours the week nominally contains.",
      },
      {
        href: "/productivity-prompts/focus-session-prompt",
        label: "focus session prompt",
        description:
          "For the long stretches the audit rescues, which need a stated outcome or they refill on their own.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When a cancellation needs somebody else's sign off, a short memo moves faster than a conversation.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2014/05/your-scarcest-resource",
        label: "Harvard Business Review: Your scarcest resource",
        description:
          "Documents how recurring meetings accumulate organisational cost that nobody measures, which is what the hours returned column estimates.",
      },
      {
        href: "https://www.apa.org/topics/research/multitasking",
        label: "American Psychological Association: Switching costs",
        description:
          "The research basis for treating fragmentation, rather than total free hours, as the number that predicts finished work.",
      },
      {
        href: "https://dl.acm.org/doi/10.1145/1357054.1357072",
        label: "Mark et al: The cost of interrupted work",
        description:
          "Measured recovery time after interruption, supporting the sixty minute threshold used in the fragmentation flag.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Explains why an explicit residual category prevents the model from allocating every input into a plausible bucket.",
      },
    ],
  },
};

export default meta;
