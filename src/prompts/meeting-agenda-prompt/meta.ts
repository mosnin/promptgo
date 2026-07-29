import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "meeting-agenda-prompt",
  name: "One Meeting Agenda Builder",
  title: "Meeting Agenda Prompt",
  category: "productivity-prompts",
  taskType: "plan",
  summary:
    "Fits the agenda to the minutes available, demands a decision or a named owner per item, moves updates into a pre read, and cuts what does not fit.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["meetings", "agendas", "decisions", "facilitation"],

  seo: {
    primaryKeyword: "meeting agenda prompt",
    keywords: [
      "meeting agenda prompt",
      "how many items fit in an hour",
      "agenda items that need a decision",
      "ai prompt for running a meeting",
      "turning updates into a pre read",
      "meeting that should have been an email",
    ],
    seoTitle: "Meeting Agenda Prompt: Fit The Items To The Minutes",
    seoDescription:
      "A meeting agenda prompt that sizes the item list to the time available, requires a decision or an owner per item, and moves every status update to a pre read.",
  },

  prompt: {
    text: `You are building the agenda for one meeting. Time is fixed and the item list is not, so your job is to cut, not to arrange.

WHAT PEOPLE WANT ON THE AGENDA: {{CANDIDATES}}
LENGTH OF THE MEETING IN MINUTES: {{MINUTES}}
WHO IS INVITED, WITH THEIR ROLE: {{ATTENDEES}}
WHAT MUST BE TRUE WHEN WE LEAVE THE ROOM: {{PURPOSE}}
WHAT HAPPENED LAST TIME: {{LAST_TIME}}

Rules.
- Allow eight minutes minimum per item and reserve ten minutes of the total for arriving, closing and overrun. Divide what remains. That number is the maximum item count and you may not exceed it.
- Every surviving item is one of two things: a DECISION, phrased as a question with at least two answers, or a WORK ITEM with a named owner and a stated outcome. Anything that is neither is not an agenda item.
- Any item whose purpose is to inform becomes a PRE READ. Write the pre read as three bullets and give it a deadline before the meeting.
- Each item states who must be present for it. If somebody is only needed for one item, say which, so they can leave.
- Cut everything that does not fit and list what you cut, with where it goes instead: pre read, a two person conversation, the next meeting, or nowhere.
- Order items so the people needed for fewest items can leave earliest, unless a dependency prevents it.

Return.
1. THE AGENDA, item, type, minutes, who is required, and the question or outcome in one line.
2. THE PRE READ, ready to send.
3. CUT LIST with destinations.
4. WHO CAN LEAVE WHEN.
5. VERDICT: whether this meeting needs to happen at all, and if not, what replaces it.`,
    variables: [
      {
        token: "CANDIDATES",
        label: "What people want on the agenda",
        example:
          "Q3 roadmap update, decide whether to delay the API migration, hiring status, the customer escalation from Tuesday, someone wants to discuss the on call rota, budget numbers for review",
      },
      {
        token: "MINUTES",
        label: "Length of the meeting in minutes",
        example: "50 minutes, weekly, ends hard because half the room has another call",
      },
      {
        token: "ATTENDEES",
        label: "Who is invited, with their role",
        example:
          "Me (chair), Ana (product), Marcus (engineering director), Priya (staff engineer), Tom (support lead), Nia (finance business partner)",
      },
      {
        token: "PURPOSE",
        label: "What must be true when you leave the room",
        example: "The migration date is either confirmed or formally moved, and somebody owns the escalation",
      },
      {
        token: "LAST_TIME",
        label: "What happened last time",
        example: "We spent 25 minutes on hiring status and never reached the escalation, which is now three weeks old",
      },
    ],
    expectedOutput:
      "An agenda that fits the minutes with a type, an owner and a one line question per item, a ready to send pre read, an explicit cut list with destinations, a note of who can leave when, and a verdict on whether the meeting is needed.",
    followUps: [
      "Write the five minute opening that states the two decisions we are here to make and what happens if we do not make them.",
      "Draft the message I send to the two people who only need to be there for one item.",
      "Turn the agenda into a follow up template so the notes write themselves against the same items.",
    ],
    pitfalls: [
      "Giving the scheduled length rather than the real one produces an agenda that assumes a 60 minute meeting starting at 60 minutes past the hour. Use the minutes you actually get.",
      "Leaving the last time field blank loses the most useful input. The item that ate the clock last week will eat it again unless it is capped or cut.",
      "If the verdict says the meeting is not needed, the hard part is not believing it, it is telling six people. The follow up that drafts the opening also drafts the cancellation.",
    ],
  },

  eeat: {
    author: "Jonas Lindqvist",
    authorCredential:
      "Ran delivery operations for a distributed team of forty, where most of the job was protecting other people's attention.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "I fed a real six item list into a 50 minute slot and both models happily produced six items at eight minutes each, ignoring that nobody arrives on time. Reserving ten minutes off the top before dividing cut it to four items, which matched what the meeting had actually been achieving. GPT-5.2 still labels a roadmap update as a decision if you let it, so I check the type column against the two answers test.",
  },

  article: {
    intro: [
      "A meeting agenda prompt has exactly one hard constraint to respect, and most agendas ignore it. The meeting is a fixed number of minutes long, the list of things people want to raise is not, and an agenda that does not cut is a list of topics that will be discussed in the order they appear until the time runs out.",
      "This one starts from the arithmetic. Minutes available, minus the time nobody counts, divided by a realistic floor per item, gives a maximum item count. Everything above that count is cut in front of you and sent somewhere else.",
    ],

    sections: [
      {
        heading: "Minutes are the budget",
        body: [
          "How many items fit in an hour is a question with a boring answer that people dislike: about four. A sixty minute meeting starts at four minutes past, loses a couple of minutes to the person whose audio fails, and needs a few at the end to agree what just happened. Call it forty five usable minutes, and an item that is genuinely decided in under eight minutes was probably not contentious enough to need the room.",
          "Agendas routinely carry seven. The seventh item is not discussed, and neither is the sixth, and in most recurring meetings it is the same two items every week, which is how a real problem stays undiscussed for a month while being on every agenda.",
        ],
      },
      {
        heading: "Every item is a decision or it is a pre read",
        body: [
          "Agenda items that need a decision are the only ones that require everybody's simultaneous attention, which is the single most expensive thing a team owns. The test used here is simple: the item can be written as a question with at least two possible answers. Should we move the migration to October or hold the September date passes. Migration update does not.",
          "Turning updates into a pre read is the other half. Status information is read faster than it is spoken, and it is read at the reader's pace rather than the speaker's. Three bullets sent the day before does the same job as ten minutes of talking, and it leaves a written record that the spoken version never produces.",
        ],
        list: [
          "Decision: a question with two or more live answers and the people who can answer it in the room.",
          "Work item: a named owner, a stated outcome, and a reason the work needs the group rather than a message.",
          "Pre read: anything whose purpose is that people know it, sent in advance with a deadline.",
        ],
      },
      {
        heading: "Cutting the invitation list is part of the job",
        body: [
          "Attendance is usually decided by history rather than by need, and the cost is invisible because it lands on everybody a little. Six people in a fifty minute meeting is five hours of attention, and if two of them are needed for one item each, most of that is spent listening politely.",
          "So each item names who is required, and the agenda is ordered so the people needed for fewest items can leave first. Saying out loud that somebody may leave after item two is a small social act that saves more time than any facilitation technique.",
        ],
      },
      {
        heading: "What the meeting agenda prompt does with the overflow",
        body: [
          "Cut items do not disappear, they get a destination. Four exist: the pre read, a two person conversation that never needed six, the next meeting with a date attached, and nowhere at all, which is the honest answer more often than teams admit.",
          "Making the destination explicit is what stops cutting feeling like suppression. The person who raised the on call rota is not being ignored, they are being told it is a fifteen minute conversation with two people rather than a fifty minute conversation with six, and they generally prefer that once it is offered.",
        ],
      },
      {
        heading: "The verdict, and the meeting that should have been an email",
        body: [
          "An ai prompt for running a meeting that never questions whether the meeting should happen is just a formatting tool. The last line of the output is a verdict, and for recurring meetings it comes back negative more often than you would like.",
          "The phrase meeting that should have been an email is usually deployed as a complaint after the fact. Used as a test before the fact it is precise: if no item survives the two answers rule, there is nothing to decide, and everything on the list is information that reads faster than it speaks. Send the pre read, cancel the slot, and see whether anybody misses it.",
        ],
      },
    ],

    howTo: {
      name: "How to build an agenda with the meeting agenda prompt",
      steps: [
        {
          name: "Collect the candidate items without editing them",
          text: "Paste what people asked for in their own words. The prompt needs to see the vague ones, because vagueness is the signal that an item is an update rather than a decision.",
        },
        {
          name: "Give the honest length",
          text: "Not what the calendar says. If the meeting reliably starts five minutes late and somebody always has to leave early, that is the real number and the item count depends on it.",
        },
        {
          name: "Send the pre read before you send the agenda",
          text: "A day ahead, with the deadline stated. A pre read arriving with the calendar reminder is read in the first two minutes of the meeting, which is the outcome you were trying to avoid.",
        },
        {
          name: "Read the cut list to the room at the start",
          text: "Twenty seconds naming what is not being discussed and where it went. It prevents every cut item being raised as any other business in the last five minutes.",
        },
      ],
    },

    faq: [
      {
        question: "Does a meeting agenda prompt work for recurring meetings?",
        answer:
          "Best there, because the last time field gives it something to work with. Recurring meetings accumulate items that nobody ever removes, and running this monthly on the standing agenda usually retires two of them permanently.",
      },
      {
        question: "What if the boss adds an item after the agenda is set?",
        answer:
          "Then something else comes off, and the useful move is to say which. Rerun with the new item included and the same minutes, and the output tells you what it displaced, which is a much easier conversation than trying to fit seven items into four slots.",
      },
      {
        question: "Is eight minutes per item too short for real discussion?",
        answer:
          "It is a floor, not a target. Genuinely hard decisions get twenty and the item count drops to two, which is the correct answer for a hard decision. The floor exists to stop an agenda claiming that nine items fit in an hour, which they never do.",
      },
      {
        question: "How do I handle the standing round the table update?",
        answer:
          "It is the clearest pre read candidate on any agenda. Ask everybody for three bullets the day before, and replace the round with two minutes for anything in those bullets that somebody wants to question. In testing that reliably returns fifteen minutes to an hour long meeting.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/decision-log-prompt",
        label: "decision log prompt",
        description:
          "Run afterwards so the decisions the meeting existed to make get recorded with a decider and a date.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "For the week the meeting sits inside, where the hours it consumes have to come from somewhere.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description:
          "For work items with a named owner, which need a brief rather than a discussion slot.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The other end of the same meeting, capturing what was settled against the items you planned.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2017/07/stop-the-meeting-madness",
        label: "Harvard Business Review: Stop the meeting madness",
        description:
          "Source for the aggregate cost of attendance and the finding that most recurring agendas are never pruned.",
      },
      {
        href: "https://www.nngroup.com/articles/workshops-remote/",
        label: "Nielsen Norman Group: Running remote workshops",
        description:
          "Practical evidence on realistic timeboxes per discussion item, which underpins the eight minute floor.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Explains why a computed hard cap is obeyed where an instruction to keep the agenda focused is not.",
      },
    ],
  },
};

export default meta;
