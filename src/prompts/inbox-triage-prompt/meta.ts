import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "inbox-triage-prompt",
  name: "Inbox Triage Sorter",
  title: "Inbox Triage Prompt",
  category: "productivity-prompts",
  taskType: "evaluate",
  summary:
    "Sorts every message into reply now, delegate, schedule or archive, caps the reply bucket to the minutes you have, and drafts those replies.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["email", "inbox", "triage", "attention"],

  seo: {
    primaryKeyword: "inbox triage prompt",
    keywords: [
      "inbox triage prompt",
      "how to clear an email backlog",
      "ai prompt for sorting email by action",
      "deciding which emails deserve a reply",
      "email triage rules for a busy week",
      "drafting replies to the messages that matter",
    ],
    seoTitle: "Inbox Triage Prompt: Sort Every Message Into One Action",
    seoDescription:
      "An inbox triage prompt that files every message as reply, delegate, schedule or archive, caps the reply list to your real minutes, then writes the drafts.",
  },

  prompt: {
    text: `You are triaging an inbox for someone whose time is scarce. You are not writing a summary. Every message must leave this process with exactly one disposition, and nothing may stay undecided.

MESSAGES: {{MESSAGES}}
MY ROLE AND WHAT ONLY I CAN DO: {{ROLE}}
WHO I CAN HAND WORK TO: {{DELEGATES}}
REPLY MINUTES I HAVE TODAY: {{TIME_BUDGET}}

Sort every message into exactly one of four buckets: REPLY NOW, DELEGATE, SCHEDULE, ARCHIVE. No message appears twice. Do not invent a fifth bucket and do not add a maybe.

REPLY NOW is capped at the stated minutes divided by three, rounded down. If more messages qualify than fit, demote the weakest to SCHEDULE and list which ones you demoted and on what grounds.

DELEGATE requires a named person from the list I gave you. If nobody on that list can take it, it is not delegable, so file it elsewhere rather than assigning it to a team.

ARCHIVE requires one line stating what happens if the message is never answered. If the honest answer is nothing, write nothing.

Then write complete draft replies for every message in REPLY NOW, in my voice, each under eighty words. Draft nothing for the other three buckets.

End with the count in each bucket and the one message you were least sure about.`,
    variables: [
      {
        token: "MESSAGES",
        label: "Sender, subject and first line of each message",
        example:
          "Priya, 'Q3 budget sign off', needs my approval by Thursday. Vendor, 'Renewal quote attached'. Sam, 'Can you look at the onboarding doc'. Newsletter, 'This week in logistics'.",
      },
      {
        token: "ROLE",
        label: "Your role and the work only you can sign off",
        example:
          "Head of delivery. Only I can approve budget over ten thousand and only I can commit a delivery date to a client.",
      },
      {
        token: "DELEGATES",
        label: "Named people you can hand work to",
        example:
          "Sam (onboarding docs and process questions), Priya (vendor contracts under ten thousand), Ola (scheduling and calendar)",
      },
      {
        token: "TIME_BUDGET",
        label: "Minutes you actually have for replies today",
        example: "18 minutes before the standup, nothing after that until four",
      },
    ],
    expectedOutput:
      "Four buckets holding every message exactly once, a reply list capped to your minutes with the demoted messages named, archive lines that state the consequence of silence, and finished short drafts for the reply bucket only.",
    followUps: [
      "Turn the schedule bucket into calendar blocks, longest thinking task first, and tell me which day loses.",
      "Write the one line handover message for each delegated item so I can forward it without editing.",
      "Look at the archive bucket and tell me which sender I should unsubscribe from or mute permanently.",
    ],
    pitfalls: [
      "If you give an optimistic reply budget you get a reply bucket you abandon halfway through, and abandoned buckets are how a triage habit dies in a fortnight.",
      "Without named delegates the model writes that support can pick this up, which leaves the message exactly where it was.",
      "The drafts are written from subject lines, so roughly one in five contains a commitment you did not intend. Read them, do not autosend them.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Urgency is contagious in an inbox, and a model asked to triage will file most of it under reply now while still claiming to have respected the time budget. Expressing that budget as a hard count of messages per bucket rather than as guidance forces genuine deferral and keeps the draft list matched to the reply bucket.",
  },

  article: {
    intro: [
      "An inbox triage prompt is only worth running if the inbox is smaller afterwards. A prompt that hands back a tidy overview of what is waiting has converted a long queue into a short description of a long queue, which is a slower way of learning what you already knew.",
      "This one refuses to describe. Every message leaves with a disposition: reply now, delegate, schedule or archive. Nothing is allowed to sit in an undecided middle, because the undecided middle is where an overloaded inbox comes from in the first place.",
      "The buckets are useless without a cap, so the reply list is sized to the minutes you actually have and anything that does not fit is demoted in front of you rather than quietly. Then it writes the replies, which is the part that removes work rather than reporting on it.",
    ],

    sections: [
      {
        heading: "Why an inbox triage prompt beats an inbox summary",
        body: [
          "A summary is a report about work. A disposition is a decision about work. The difference shows up an hour later: after a summary you still open every thread and make every call yourself, and after a disposition pass you open four threads and send four drafts.",
          "Anyone asking how to clear an email backlog has usually already tried reading faster. Reading speed is not the constraint. Each message costs one small decision, and a few hundred small decisions in sequence is what makes a queue feel heavy long before it is genuinely large.",
        ],
      },
      {
        heading: "Four buckets, and no fifth",
        body: [
          "Four is the number of things you can actually do with a message. Answer it, give it to somebody else, put it on the calendar, or decide it does not need you. Every extra category anyone proposes turns out on inspection to be a way of postponing the choice.",
          "An ai prompt for sorting email by action has to name the actions before it names the labels, otherwise the model invents categories like important or follow up, which describe a feeling about a message rather than a thing you will do to it. Labels that are not verbs are how a triage system quietly becomes a second inbox.",
        ],
        list: [
          "Reply now: you are the only person who can answer, and answering costs less than scheduling it.",
          "Delegate: a named person can do it, and the handover is shorter than the work.",
          "Schedule: it needs real thinking time, so it becomes a calendar block rather than a red dot.",
          "Archive: nothing happens if it goes unanswered, and writing that down is the whole point.",
        ],
      },
      {
        heading: "The cap is what turns sorting into a decision",
        body: [
          "Left without a limit, a model puts most of the inbox in the reply bucket. Everything looks answerable in isolation. The cap converts an ordering problem into a scarcity problem, and scarcity is the only version of the problem that changes what you do next.",
          "So the prompt takes your minutes, divides by three, and refuses to exceed that count. When more messages qualify than fit, it names what it demoted. Deciding which emails deserve a reply today is a judgement somebody has to make, and making it visible means you can overrule it in five seconds instead of discovering it next week.",
        ],
      },
      {
        heading: "Archive has to state a consequence",
        body: [
          "The archive bucket is the one people distrust, so it carries the heaviest requirement: one line naming what happens if the message is never answered. Most of the time the honest answer is nothing, and seeing that written down is what makes the bucket usable rather than frightening.",
          "It also catches the reverse error. Occasionally a model tries to archive something and cannot produce a consequence line that sounds harmless, which is the signal to move it. The email triage rules for a busy week should be judged by how often that catch fires, not by how empty the mailbox looks at the end.",
        ],
      },
      {
        heading: "Drafting is the half that removes work",
        body: [
          "Sorting is diagnosis. Drafting is treatment. A pass that stops at the sort has told you about four decisions you now have to write four replies for, and writing the replies was always the expensive part.",
          "Drafting replies to the messages that matter is therefore built into the same pass, capped at eighty words each and restricted to the reply bucket. Short drafts get edited and sent. Long drafts get rewritten from nothing, which is worse than having no draft at all, because you read the whole thing first.",
        ],
      },
    ],

    howTo: {
      name: "How to run the inbox triage prompt",
      steps: [
        {
          name: "Paste senders and first lines, not whole threads",
          text: "The disposition rarely turns on paragraph four. Feeding entire threads burns context and pushes the model to reason about content when it should be reasoning about action.",
        },
        {
          name: "Give your real reply minutes",
          text: "Say eighteen if you have eighteen. An honest budget produces a list you finish, and an optimistic one produces a list you abandon at message three.",
        },
        {
          name: "Name your delegates as people",
          text: "A list of names is what makes the second bucket real. Without it you get a row saying the support team can handle this, which is the same as leaving it where it was.",
        },
        {
          name: "Read the demotion list before the drafts",
          text: "The messages that nearly made the cut are where the judgement lives. Promote one back if you disagree, then send the drafts without reopening the sort.",
        },
      ],
    },

    faq: [
      {
        question: "Does the inbox triage prompt cope with a backlog of several hundred messages?",
        answer:
          "Run it in batches of roughly forty. Past that the cap stops meaning anything, because one reply budget spread over hundreds of messages produces a reply list so small that the sorting does all the work and the drafting does none of it.",
      },
      {
        question: "What stops it archiving something that mattered?",
        answer:
          "The consequence line. Nothing reaches archive without a sentence describing what happens if it goes unanswered, and a message with a genuine consequence is difficult to write a harmless sentence about. Scanning those lines catches a wrong call in about ten seconds.",
      },
      {
        question: "Should I let it send the drafts automatically?",
        answer:
          "No. The drafts come from subject lines and opening lines, so about one in five needs a fact corrected or a commitment softened before it leaves. Reading four short drafts takes under two minutes, which is far cheaper than retracting one of them.",
      },
      {
        question: "How is this different from filters and rules in my mail client?",
        answer:
          "Filters sort by sender and subject, which are properties of the message. This sorts by what you would do about it, which depends on your week, your delegates and your minutes. The same supplier update is an archive on Monday and a schedule on Friday.",
      },
      {
        question: "Can it handle messages where I am only copied in?",
        answer:
          "Yes, and those are usually the clearest archive candidates, which is exactly why the consequence line matters. Being copied is information rather than a request, so the prompt treats a missing direct ask as evidence that no reply is owed by you.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description:
          "For the schedule bucket, which is a backlog by another name and needs a cap of its own.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description:
          "Turns a delegate row into a brief the other person can act on without three clarifying messages.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "Half of a full inbox is follow up from meetings that never produced named owners.",
      },
    ],

    externalLinks: [
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers why hard numeric limits are followed more reliably than qualitative instructions like keep it short.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Explains the explicit exhaustive category pattern the four bucket rule depends on to avoid invented labels.",
      },
      {
        href: "https://hbr.org/2019/01/how-to-spend-way-less-time-on-email-every-day",
        label: "Harvard Business Review: Spend less time on email",
        description:
          "Source for the claim that per message decision cost, not reading time, is what makes a large inbox expensive.",
      },
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How people read online",
        description:
          "Supports the eighty word ceiling on drafts, since recipients scan rather than read messages of any real length.",
      },
    ],
  },
};

export default meta;
