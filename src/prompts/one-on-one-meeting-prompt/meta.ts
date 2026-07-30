import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "one-on-one-meeting-prompt",
  name: "One To One Agenda Builder",
  title: "One On One Meeting Prompt",
  category: "business-prompts",
  taskType: "plan",
  summary:
    "Builds the agenda from the difference between their topics and yours, carries forward everything that was raised and never closed, and writes questions fine cannot answer.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["management", "meetings", "people", "coaching"],

  seo: {
    primaryKeyword: "one on one meeting prompt",
    keywords: [
      "one on one meeting prompt",
      "how to run a better one to one",
      "ai prompt for a manager one to one agenda",
      "best one to one questions for managers",
      "one to one agenda template for a direct report",
    ],
    seoTitle: "One On One Meeting Prompt: Get Past The Word Fine",
    seoDescription:
      "A one on one meeting prompt that builds the agenda from the gap between their list and yours, carries open items forward, and bans questions answerable with fine.",
  },

  prompt: {
    text: `You are preparing a manager for a thirty minute one to one. You hold one belief above the others: the useful part of these meetings is whatever the person has decided not to mention, and an agenda written only by the manager guarantees it stays unmentioned.

TOPICS THEY SENT ME: {{THEIR_TOPICS}}
TOPICS I WANT TO COVER: {{MY_TOPICS}}
THINGS RAISED IN PREVIOUS SESSIONS THAT NEVER CLOSED: {{OPEN_LEDGER}}
WHAT HAS CHANGED AROUND THEM SINCE WE LAST SPOKE: {{CONTEXT}}
HOW THIS RELATIONSHIP CURRENTLY FEELS TO ME: {{TEMPERATURE}}

Give me five things.

FIRST, THE ORDER. Their topics go first and get at least half the time. Put mine after, and if the clock runs out on my items say so explicitly rather than compressing theirs. Show the running minutes beside each block.

SECOND, THE GAP. Compare their list against mine and name what appears on only one side. Something on my list and not theirs is often a concern they have decided is not worth raising. Something on theirs and not mine is usually the thing I have stopped paying attention to. Write one sentence on what each absence might mean, marked clearly as a guess.

THIRD, THE LEDGER. For each unresolved item from earlier sessions, state how many sessions it has now appeared in, what was last agreed, and the single question that would either close it or escalate it. Anything at three sessions or more, say plainly that repeating it again is a decision to leave it unresolved.

FOURTH, FIVE QUESTIONS. Each must be impossible to answer with fine, good or busy. No question may contain the words how are things. Anchor each to a specific event, decision or person from the context I gave you. Include exactly one question inviting criticism of me, phrased so that answering it honestly is low risk.

FIFTH, MY LISTENING RULE. Name the one topic where I am most likely to talk first and explain rather than ask, based on the temperature I described, and tell me the question to ask instead.

Do not produce coaching platitudes, do not suggest icebreakers, and do not write anything I would be embarrassed to have read over my shoulder.`,
    variables: [
      {
        token: "THEIR_TOPICS",
        label: "Topics they sent you",
        example: "Wants to talk about the on call rota and whether the platform migration is still happening",
      },
      {
        token: "MY_TOPICS",
        label: "Topics you want to cover",
        example: "The two missed code reviews last sprint, and whether they want to mentor the new starter",
      },
      {
        token: "OPEN_LEDGER",
        label: "Things raised before that never closed",
        example:
          "Asked for a conference budget in March, I said I would check and never did. Raised the standup being too long in April and May.",
      },
      {
        token: "CONTEXT",
        label: "What has changed around them",
        example: "Their closest teammate resigned two weeks ago and the replacement search has not started",
      },
      {
        token: "TEMPERATURE",
        label: "How the relationship currently feels",
        example: "Slightly cooler than usual. Replies are shorter and they stopped joining the optional Friday call.",
      },
    ],
    expectedOutput:
      "A time boxed running order that gives their topics the larger half, a comparison naming what each side left off with flagged guesses, a ledger showing how long each item has been open, five questions anchored to real events, and one named blind spot with a replacement question.",
    followUps: [
      "They gave a short answer to the question about their teammate leaving. Give me three follow ups that do not sound like an interrogation.",
      "Rewrite the ledger section as the message I send them beforehand, so nothing in the meeting is a surprise.",
      "The conference budget has now been open for four months and the answer is no. Draft how I say that without burying it in context.",
    ],
    pitfalls: [
      "Leaving the temperature field vague produces generic questions. Writing that replies have got shorter is the input that generates a question worth asking.",
      "The gap analysis is marked as guesswork for a reason. Opening the meeting by telling someone what their silence means is a fast way to guarantee more silence.",
      "Managers delete the question that invites criticism of them, usually while telling themselves the relationship is not ready for it. That deletion is the answer to whether it is.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Carrying a ledger of open items, each tagged with how many sessions it has been raised, is what stops a request being acknowledged repeatedly and never answered. Question quality is the easier half. Both models produce warm generic openers unless how are things is banned in those exact words, and GPT-5.2 reinstates an icebreaker whenever the context field is short.",
  },

  article: {
    intro: [
      "A one on one meeting prompt that produces a tidy agenda from your own topic list has automated the wrong half of the job. The manager's list was never the problem. The problem is the thing the other person decided, somewhere between Tuesday and the meeting, was not worth bringing up.",
      "This one starts from their list and treats yours as the remainder. It then compares the two, because what appears on only one side is more informative than anything on both, and it keeps a running ledger of everything raised in earlier sessions that quietly never closed.",
      "The questions are the last part rather than the first. They are anchored to specific events you supplied, and none of them can be answered with fine.",
    ],

    sections: [
      {
        heading: "Their list first, and the clock proves it",
        body: [
          "Almost every manager believes they give their reports the majority of the time. Almost none of them do, because the manager's topics tend to be operational and urgent, and urgency wins any unstructured negotiation over thirty minutes.",
          "Assigning running minutes to each block makes the split visible before the meeting rather than after it. If your items overflow, the prompt says so rather than shaving five minutes off theirs, which is what actually happens when the agenda is held in your head.",
          "A one to one agenda template for a direct report should be legible to them. Sending it in advance costs nothing and removes the small dread of walking into a meeting where only one person knows what is on it.",
        ],
      },
      {
        heading: "Read the gap between the two lists",
        body: [
          "The comparison step is the part people skip and the part that pays. An item on your list and not theirs is often something they have privately concluded is not worth raising with you, which is a signal about the relationship rather than about the item.",
          "An item on their list that never occurred to you is usually somewhere you have stopped paying attention. Both readings are guesses and the prompt labels them as guesses, because acting on a confident misreading of someone's silence damages more than it fixes.",
          "Knowing how to run a better one to one is largely this: noticing the topics that are absent and finding a way to make raising them cheap.",
        ],
      },
      {
        heading: "The ledger of things that never closed",
        body: [
          "Requests decay in a predictable way. Someone asks for a training budget, you say you will check, and the item disappears into the gap between two people each assuming the other is carrying it. Three months later they have stopped asking, and you have concluded it was not important.",
          "Carrying unresolved items between one to ones fixes this with bookkeeping rather than good intentions. Each open item shows the number of sessions it has survived, what was last agreed, and the one question that would close or escalate it.",
          "The three session rule is deliberately blunt. Once something has been raised three times, repeating it a fourth is no longer a follow up, it is a decision to leave it unresolved, and saying that out loud is more respectful than another round of I will look into it.",
        ],
      },
      {
        heading: "The best one to one questions for managers are anchored",
        body: [
          "How are things is not a question. It is a greeting with a question mark, and the socially correct answer is fine, which is why it is the answer it receives. The prompt bans the phrasing and requires every question to attach to a specific event, decision or person you named in the context.",
          "Anchored questions are harder to deflect because deflecting them requires an actual statement. Asking what changed about your week when your teammate resigned is a different act from asking how you are doing, and it signals that you noticed rather than that you remembered to check in.",
          "One question has to invite criticism of you, phrased so that answering honestly carries no risk. This is the one managers cut, and cutting it is informative.",
        ],
      },
      {
        heading: "Where the one on one meeting prompt tells you to stop talking",
        body: [
          "The final section names the topic where you are most likely to explain rather than ask, based on how you described the relationship. There is usually one, and it is usually the topic where you feel slightly defensive.",
          "An ai prompt for a manager one to one agenda that only generates questions is missing this. The failure mode in these meetings is rarely a shortage of good questions, it is a manager answering their own question within four seconds of asking it, then reporting afterwards that the person did not have much to say.",
        ],
      },
    ],

    howTo: {
      name: "How to use the one on one meeting prompt",
      steps: [
        {
          name: "Ask for their topics the day before",
          text: "Without their list the gap analysis has nothing to compare and the whole thing collapses into your agenda with better questions.",
        },
        {
          name: "Keep the ledger between sessions",
          text: "Paste last session's open items in every time. This is the only part of the prompt that gets stronger the longer you use it.",
        },
        {
          name: "Write the temperature honestly",
          text: "Slightly cooler than usual produces different questions from things are good. This field is the one people sanitise and it is the one that changes the output.",
        },
      ],
    },

    faq: [
      {
        question: "How is this different from a performance conversation?",
        answer:
          "A review looks backwards at evidence and reaches a judgement. This meeting looks at the current week and is mostly the other person talking, so mixing the two teaches people that the weekly session is where criticism arrives, and they prepare accordingly by saying less.",
      },
      {
        question: "What if they never send topics in advance?",
        answer:
          "Ask once more with a specific framing, such as one thing that annoyed you this week. If nothing comes back a second time, treat the absence as the first agenda item and ask directly whether the meeting is useful to them at its current frequency.",
      },
      {
        question: "Is thirty minutes long enough?",
        answer:
          "It is enough when the agenda arrives beforehand and the ledger keeps old items from being rediscovered each time. Sixty minutes with no preparation reliably produces twenty minutes of status update followed by an early finish, which is the pattern the running order is designed to break.",
      },
      {
        question: "Should I take notes during the meeting?",
        answer:
          "Write only the ledger items and anything you committed to, and do it visibly so they can see what you captured. Extensive note taking during a conversation about how someone is feeling changes the register of the conversation immediately.",
      },
      {
        question: "What if the honest answer to my invited criticism is hard to hear?",
        answer:
          "Say thank you, write it in the ledger, and do not respond to it in the same meeting. Defending yourself in the moment is the most reliable way to ensure the question never gets a real answer again, regardless of how you phrase it next time.",
      },
      {
        question: "Does this work for skip level meetings?",
        answer:
          "Partly. The anchored questions transfer well, but the ledger does not, because you are not the person who can close most of their open items. Route those to their manager afterwards and tell the person you are doing it.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "Where the backward looking judgement belongs, kept separate so the weekly session does not become a rolling appraisal.",
      },
      {
        href: "/business-prompts/difficult-conversation-prompt",
        label: "difficult conversation prompt",
        description:
          "For the ledger item that has stopped being a follow up and become something you have to say out loud.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description:
          "The other side of the table, useful when a pay conversation surfaces here and you want to understand how they are preparing.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2016/08/how-to-make-your-one-on-ones-with-employees-more-productive",
        label: "Harvard Business Review: making one on ones more productive",
        description:
          "Institutional source for the finding that these meetings work better when the report sets the agenda rather than the manager.",
      },
      {
        href: "https://www.gallup.com/workplace/",
        label: "Gallup: workplace research",
        description:
          "Survey evidence on manager conversation frequency and its relationship to whether people raise problems early.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: prompting strategies for Gemini",
        description:
          "Documents the constraint and prohibition patterns that keep banned phrasings such as how are things out of generated questions.",
      },
    ],
  },
};

export default meta;
