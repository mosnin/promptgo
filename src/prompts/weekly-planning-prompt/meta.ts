import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "weekly-planning-prompt",
  name: "Week Shaper",
  title: "Weekly Planning Prompt",
  category: "productivity-prompts",
  taskType: "plan",
  summary:
    "Picks three checkable outcomes, places them against the calendar you already have, and pre-decides what gets abandoned when the week goes wrong.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["planning", "calendar", "weekly review", "capacity"],

  seo: {
    primaryKeyword: "weekly planning prompt",
    keywords: [
      "weekly planning prompt",
      "how to plan a week around calendar reality",
      "ai prompt for a weekly review",
      "planning around meetings you cannot move",
      "weekly plan that survives contact with monday",
      "choosing three outcomes for the week",
    ],
    seoTitle: "Weekly Planning Prompt: Three Outcomes, Real Hours",
    seoDescription:
      "A weekly planning prompt that picks three checkable outcomes, fits them around meetings you cannot move, and decides in advance what gets dropped first.",
  },

  prompt: {
    text: `You are planning one working week for one person. You are not producing a to do list. You are producing a plan that survives its first bad morning, which means it has to name what gets abandoned before anything has gone wrong.

CALENDAR AS IT ALREADY STANDS: {{CALENDAR}}
WORK I OWE OTHER PEOPLE: {{COMMITMENTS}}
WHAT I WANT TO BE TRUE BY FRIDAY: {{AMBITION}}
WHAT WENT WRONG LAST WEEK: {{LAST_WEEK}}

Follow every rule.

1. Choose exactly three outcomes. Each is a state of the world by Friday, phrased so a stranger could tell whether it happened. Not "work on the migration" but "the migration plan is signed off by finance".
2. Place each outcome as named blocks on named days. An outcome with no block is not an outcome, so cut it and pick another.
3. Protect one block of at least ninety minutes that does not sit next to a meeting. If the calendar makes that impossible, say so and name the meeting that should move.
4. Write a SACRIFICE LIST: three things you are consciously not doing this week, each with the person who should be told.
5. Write a COLLAPSE PLAN: if Monday and Tuesday are lost, which single outcome survives and which two go. Decide it now, in writing.
6. Do not fill the calendar. Leave at least four hours unassigned and state that they are for the work that has not arrived yet.

End with one sentence naming the assumption most likely to break.`,
    variables: [
      {
        token: "CALENDAR",
        label: "The week as your calendar currently shows it",
        example:
          "Mon: standup 9, one to ones 11 to 1. Tue: clear until 3, then vendor call. Wed: offsite all day. Thu: standup 9, review board 2. Fri: standup 9, interviews 10 to 12.",
      },
      {
        token: "COMMITMENTS",
        label: "Work other people are waiting on from you",
        example:
          "Finance needs the headcount case by Thursday. Sam is blocked on my review of the onboarding rewrite. The auditor wants last quarter's access logs.",
      },
      {
        token: "AMBITION",
        label: "What you want to be true by Friday",
        example:
          "Headcount case submitted, the export bug closed, and a first draft of the delivery handbook that Sam can react to.",
      },
      {
        token: "LAST_WEEK",
        label: "What actually went wrong last week, in facts",
        example:
          "The Tuesday afternoon block got eaten by an escalation. One to ones ran forty minutes over. I planned four hours of writing on Friday and did none of it.",
      },
    ],
    expectedOutput:
      "Three checkable outcomes with named calendar blocks, one protected long block or a named meeting to move, three declared sacrifices with people to tell, a collapse plan choosing one survivor, and four hours left deliberately empty.",
    followUps: [
      "Write the two line message I send each person on the sacrifice list, stating what is not happening and when it will be.",
      "Turn the protected block into a session brief with a single outcome and a stopping rule.",
      "On Friday, compare what happened against this plan and tell me which assumption broke, in one paragraph.",
    ],
    pitfalls: [
      "Pasting an aspiration into the calendar field rather than the calendar you actually have produces a plan for a week you are not going to get.",
      "The sacrifice list only pays for itself if the messages are sent. An undeclared sacrifice becomes somebody else's surprise three weeks later.",
      "Leaving the last week field vague gives the model nothing to subtract. Write which block was eaten and by what, not that you were undisciplined.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Every free gap in a calendar looks like capacity to a model, so real work gets scheduled into twenty minute slivers between meetings and the week reads as achievable on paper. Demanding one long block with no meeting beside it, and holding reserve hours back from assignment, keeps the plan honest about how much fits.",
  },

  article: {
    intro: [
      "A weekly planning prompt should finish with fewer intentions than it started with. What matters in the output is not the list of things you would like to get to, it is the short set of things that will still be true on Friday even if the week goes badly.",
      "Most plans die on Monday afternoon. Something lands, two hours disappear, and the document is never reopened. A plan that has already decided what to abandon does not fail that way, because the abandoning was part of the plan rather than a departure from it.",
      "This one picks three outcomes, attaches each to a named block on a named day, records what you are consciously not doing, and settles in advance which outcome survives if the first two days vanish.",
    ],

    sections: [
      {
        heading: "Three outcomes, not fifteen intentions",
        body: [
          "Choosing three outcomes for the week is the constraint everything else hangs from. Three fits in a head. It is small enough to recite on Wednesday without opening anything, which is the real test of whether a plan is still operating.",
          "An outcome is a state of the world rather than an activity. Work on the migration is an activity, and you can spend four hours on it without anything changing. The migration plan is signed off by finance is a state, and on Friday you either have it or you do not.",
        ],
      },
      {
        heading: "Why the weekly planning prompt starts from the calendar",
        body: [
          "Plans built from ambition and then checked against the diary come out about a third too long, every time. Plans built from the diary and then filled with ambition come out smaller and true. The order of those two steps is most of the method.",
          "Planning around meetings you cannot move is the entire exercise for anyone with a normal job. The prompt takes the existing calendar as fixed, subtracts it, and only then asks what fits in the remainder. Anyone learning how to plan a week around calendar reality finds the same thing: the free hours are roughly half of what they felt like.",
        ],
        subsections: [
          {
            heading: "The ninety minute rule",
            body: [
              "One block of at least ninety minutes, not sitting next to a meeting, is the floor for work that needs something complicated held in your head. Adjacency matters as much as length. The twenty minutes before a call are not usable for anything requiring a run up, so a ninety minute gap ending at a meeting is really a sixty minute gap.",
            ],
          },
          {
            heading: "The four unassigned hours",
            body: [
              "A week planned to capacity breaks on first contact. The prompt refuses to allocate the final four hours and says out loud what they are for: the work that has not arrived yet and arrives anyway, every single week.",
            ],
          },
        ],
      },
      {
        heading: "The sacrifice list is the part people skip",
        body: [
          "Three things you are consciously not doing, each paired with the person who ought to hear about it. It is an uncomfortable field to fill in and it is the difference between a plan and a wish.",
          "Undeclared sacrifices turn into surprises. Somebody discovers in week three that the thing they were waiting for was quietly set aside in week one, and that discovery costs far more than the two line message would have. Attaching a name to each cut converts a private decision into a cheap conversation.",
        ],
      },
      {
        heading: "Pre-deciding the collapse",
        body: [
          "The collapse plan answers a question people normally answer late and badly: if Monday and Tuesday go, what survives? Settled on Sunday it takes thirty seconds. Settled on Wednesday under mild panic it takes the rest of the week and produces a worse answer.",
          "A weekly plan that survives contact with monday is not one that assumed a good week. It is one that already knows its own order of preference under loss. The two outcomes you agreed to sacrifice go without renegotiation, and skipping that renegotiation is where the saving actually comes from.",
        ],
      },
      {
        heading: "Feeding last week back in",
        body: [
          "The last week field does more work than its size suggests. Weeks fail in repeating shapes: the same recurring meeting overruns, the same colleague needs an hour nobody booked, the same optimism about Friday afternoon that has never once been justified.",
          "Running it as an ai prompt for a weekly review as well as a plan closes that loop. Two or three cycles in, the model begins subtracting the hours you reliably lose rather than the hours you nominally own, and the plans stop reading as aspirations.",
        ],
      },
    ],

    howTo: {
      name: "How to run the weekly planning prompt",
      steps: [
        {
          name: "Paste the calendar before you think about ambition",
          text: "Copy the week as it stands, including the meetings you resent. Ambition entered first anchors everything that follows to a week you are not going to get.",
        },
        {
          name: "Phrase each outcome so a stranger could check it",
          text: "If somebody outside your team could not tell on Friday whether it happened, it is an activity wearing an outcome's clothes. Rewrite it until it is testable.",
        },
        {
          name: "Send the sacrifice messages on Monday morning",
          text: "Three short notes, one per cut. This takes about four minutes and removes almost all of the awkwardness that would otherwise surface in a fortnight.",
        },
        {
          name: "Reread the collapse plan mid week",
          text: "Wednesday morning, before deciding anything. If the first two days went badly, the decision has already been made and you only have to follow it.",
        },
      ],
    },

    faq: [
      {
        question: "What if there is no ninety minute block anywhere in my week?",
        answer:
          "That finding is worth more than the plan. A week with no protected block is a week where nothing difficult will move, so the prompt names a meeting to shift rather than quietly scheduling demanding work into a thirty minute gap between two calls.",
      },
      {
        question: "Is three outcomes too few for a whole week?",
        answer:
          "Three is what survives. A week also contains a continuous stream of small obligations that were never going to appear on any plan, and they consume more hours than anybody estimates. Three ambitious outcomes plus that ordinary flow is a full week for most people.",
      },
      {
        question: "Does the weekly planning prompt replace my task manager?",
        answer:
          "No. The task manager holds everything, and this decides which small part of everything earns calendar time before Friday. Keep the list where it lives, feed the relevant slice in, and put the three chosen outcomes back as booked blocks.",
      },
      {
        question: "What should I put in the last week field?",
        answer:
          "Facts rather than self criticism. Which block got eaten and by what, which meeting overran, which handover took three days instead of one. A model can only subtract a recurring loss if you describe it concretely enough to recognise next time.",
      },
      {
        question: "Can I use it for a team week rather than my own?",
        answer:
          "It is built around one person's calendar, because sacrifices and collapse plans need a single owner. For a team, run it individually and then read the sacrifice lists side by side, which reliably surfaces work everybody assumed somebody else was protecting.",
      },
      {
        question: "Why leave four hours empty when I am already behind?",
        answer:
          "The unplanned work arrives whether or not you made room, and a plan with no slack turns every interruption into a failure. Four hours is roughly what an ordinary week absorbs. Leaving it unbooked is what stops the other thirty from being fiction.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description:
          "Run this first when the ambition field is really a backlog and needs cutting before it can be scheduled.",
      },
      {
        href: "/productivity-prompts/focus-session-prompt",
        label: "focus session prompt",
        description:
          "Turns the protected ninety minute block into a session with one outcome and a stopping rule.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description:
          "The same capacity first logic applied to a publishing schedule rather than a personal week.",
      },
    ],

    externalLinks: [
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Gemini prompting strategies",
        description:
          "Documents why constraints stated as hard counts, such as exactly three outcomes, hold better than soft guidance.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags",
        label: "Anthropic: Structuring prompts with tags",
        description:
          "Explains separating fixed inputs like a calendar from open inputs like ambition so the model does not blend them.",
      },
      {
        href: "https://dl.acm.org/doi/10.1145/1357054.1357072",
        label: "Mark et al: The cost of interrupted work",
        description:
          "Primary research behind the adjacency rule, measuring the recovery time lost when work sits beside an interruption.",
      },
    ],
  },
};

export default meta;
