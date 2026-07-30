import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "email-reply-prompt",
  name: "Single Reply Composer",
  title: "Email Reply Prompt",
  category: "productivity-prompts",
  taskType: "generate",
  summary:
    "Decides whether a reply is owed, isolates the one thing being asked, lists what the draft deliberately ignores, and counts the commitments it creates.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["email", "writing", "commitments", "attention"],

  seo: {
    primaryKeyword: "email reply prompt",
    keywords: [
      "email reply prompt",
      "what to leave out of an email reply",
      "how to reply to a difficult email",
      "ai prompt for writing an email response",
      "how to avoid overcommitting in email",
    ],
    seoTitle: "Email Reply Prompt: One Answer, Nothing You Did Not Mean",
    seoDescription:
      "An email reply prompt that checks whether a reply is owed, answers one thing, lists what it deliberately left out, and flags every commitment in the draft.",
  },

  prompt: {
    text: `You are writing one reply to one message. Brevity is not the goal. Precision about what is being agreed to is the goal.

THE MESSAGE I RECEIVED, IN FULL: {{MESSAGE}}
MY RELATIONSHIP TO THE SENDER: {{RELATIONSHIP}}
WHAT I ACTUALLY WANT OUT OF THIS THREAD: {{OUTCOME}}
WHAT I AM NOT WILLING TO AGREE TO: {{LIMITS}}
HOW I WRITE: {{VOICE}}

Work through this before drafting.
1. Decide whether a reply is owed at all. If the message needs no response, say so, give the reason, and stop.
2. Separate the EXPLICIT ASK from the IMPLIED ASKS. Most messages contain one question in the text and two or three more in the framing. List them all.
3. Choose which asks the reply answers. Default to one. Everything you choose not to answer goes on an omission list with a reason, because leaving something out is a decision and it should be a visible one.
4. Draft the reply. It contains at most one commitment from me and at most one question to them. If the situation needs more, the answer is a call, not a longer email, and you should say that instead.
5. Audit your own draft. List every commitment it creates, explicit or implied, with the date it lands and who would be entitled to chase me for it.
6. Check the draft against my limits. If any sentence concedes something on that list, rewrite it and show me the sentence you replaced.

Return, in this order: the reply or reply not owed verdict, the ask list, the omission list, the draft, the commitment audit, and a version thirty percent shorter with a note on what the shortening cost.`,
    variables: [
      {
        token: "MESSAGE",
        label: "The message you received, in full",
        example:
          "Hi, following up on the integration work. Are we still on for the March release? Also the team is asking whether you can review the API spec this week, and Dave wondered if you would join the Thursday steering call going forward.",
      },
      {
        token: "RELATIONSHIP",
        label: "Your relationship to the sender",
        example:
          "Client side programme manager. Not my direct counterpart, and she escalates quickly when answers are vague.",
      },
      {
        token: "OUTCOME",
        label: "What you actually want out of this thread",
        example: "To confirm March without committing to the scope Dave keeps adding, and to hand the spec review to Ravi",
      },
      {
        token: "LIMITS",
        label: "What you are not willing to agree to",
        example: "No recurring meeting attendance, no date commitment beyond the March release, no review turnaround under five working days",
      },
      {
        token: "VOICE",
        label: "How you write",
        example: "Short paragraphs, no greeting beyond the name, plain and slightly blunt, I never use exclamation marks",
      },
    ],
    expectedOutput:
      "A verdict on whether a reply is owed, every explicit and implied ask listed separately, an omission list with reasons, a draft carrying one commitment at most, an audit naming each commitment and its date, and a shorter alternative with the cost of cutting stated.",
    followUps: [
      "Rewrite the draft assuming the sender will forward it to their director without context.",
      "Give me the two sentence version I can send from my phone, keeping the same limits intact.",
      "Draft the reply I send if they come back pushing on the thing I declined, without conceding it and without repeating myself.",
    ],
    pitfalls: [
      "Pasting the message without your limits produces a reply that is warm, helpful and agrees to the recurring meeting, because agreeing is the path of least resistance in every training set.",
      "Skipping the commitment audit is how a five line email becomes a delivery date. Read that section before the draft, since it is faster to check six commitments than to reread six paragraphs.",
      "The omission list will occasionally show you that the thing you were going to ignore is the actual subject of the message, and the other two questions were padding.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Ordinary politeness is where unplanned commitments enter a reply. An offer to take a look at something this week gets added as social filler and lands as a promise. The commitment audit makes every future tense clause explicit, and the single ask default stops the draft answering everything the original message raised.",
  },

  article: {
    intro: [
      "An email reply prompt that only makes your writing smoother has solved the least expensive part of the problem. Writing the sentences is not what makes a reply hard. Deciding what the message is really asking, and what you are willing to be on the hook for, is what makes it hard, and that decision is invisible in the finished text.",
      "This prompt does the deciding in front of you. It separates the question in the message from the questions hiding in the framing, picks one to answer, and shows you what it chose to ignore.",
      "Then it audits its own draft for commitments, which is the section most people read first after using it once.",
    ],

    sections: [
      {
        heading: "The email reply prompt starts by asking whether to reply",
        body: [
          "A meaningful share of messages need nothing back. An acknowledgement of something already agreed, a copy of a thread that concerns you tangentially, a thank you that would generate a thank you. Replying to those is not politeness, it is adding a message to somebody else's queue in exchange for a small feeling of having dealt with something.",
          "So an ai prompt for writing an email response should be allowed to conclude that no response is required, and this one is instructed to say so and stop. In practice it reaches that verdict on roughly one message in six, which is a larger share than most people expect and a smaller one than they fear.",
        ],
      },
      {
        heading: "One question in the text, three in the framing",
        body: [
          "Answering one question without opening three is the core discipline, and it is harder than it sounds because the extra asks are rarely phrased as asks. The team is wondering whether you might join the Thursday call is not a question. It is a recurring commitment wrapped in a hypothetical, and answering it in passing agrees to it.",
          "Listing the explicit and implied asks separately makes the shape of the message obvious. Once you can see that a four line email contains one real question and two attempts to widen your involvement, choosing what to answer takes about five seconds.",
        ],
      },
      {
        heading: "What to leave out of an email reply",
        body: [
          "Working out what to leave out of an email reply is the part that produces the actual saving, and it is the part that no writing tool addresses, because omission leaves no trace in the output. A reply that silently ignores two of three questions looks identical to a reply written by somebody who did not notice them.",
          "The omission list fixes that. Each thing left out gets a reason: it is not mine, it is not decided, it belongs in a call, it will resolve itself. Reasons matter because you may be asked, and having already decided your answer is what stops a follow up thread from getting the concession the first thread did not.",
        ],
        list: [
          "Not mine: name who it belongs to, in the draft, once.",
          "Not yet decided: say when it will be, rather than saying you will come back to them.",
          "Wrong medium: three exchanges of clarification means the answer was always a fifteen minute call.",
          "Will resolve itself: the most common reason and the one people trust least.",
        ],
      },
      {
        heading: "How to avoid overcommitting in email",
        body: [
          "Commitments hidden in an email reply almost never arrive as promises. They arrive as courtesies. I will take a look, let me chase that, I should be able to get you something by the end of the week. Each is a dated obligation that somebody else is now entitled to track, and none of them felt like a decision when it was typed.",
          "The audit lists them with dates and with who could reasonably chase you. Seeing three obligations under a five line draft is the moment the habit changes, because the fix is trivial once it is visible: delete two of them, or put a date on the one you meant.",
        ],
        subsections: [
          {
            heading: "Implied commitments count too",
            body: [
              "Answering a question about March in a friendly tone can commit you to March even without the word yes. The audit is told to include implied obligations, which catches the sentence that agrees by not disagreeing.",
            ],
          },
        ],
      },
      {
        heading: "Replying to a difficult email without escalating it",
        body: [
          "How to reply to a difficult email goes wrong in a predictable direction: the reply is longer than it needs to be, because length feels like seriousness, and every extra paragraph offers something new to disagree with.",
          "The single commitment rule helps here more than anywhere else. A short reply that answers one thing, declines one thing plainly and offers a call is very hard to escalate, because there is nothing ambiguous in it to quote. The limits field is also doing real work: stating in advance what you will not concede stops the draft conceding it on your behalf in the name of being reasonable.",
        ],
      },
      {
        heading: "Two lengths, and the cost of the shorter one",
        body: [
          "The output always includes a version around thirty percent shorter, along with a note on what the cutting removed. That note is the useful half. Shorter is usually better and it is not free: the cut version often loses the reason for a decline, which is exactly the sentence that keeps a relationship intact.",
          "Having both in front of you turns a stylistic instinct into a choice. Send the short one to a colleague who already trusts the decision, and the longer one to somebody who is going to forward it.",
        ],
      },
    ],

    howTo: {
      name: "How to use the email reply prompt",
      steps: [
        {
          name: "Paste the whole message, including the signature block",
          text: "Seniority, company and job title change what the implied asks are. A hypothetical from a director is a request, and the same sentence from a peer is a hypothetical.",
        },
        {
          name: "Write your limits before you read anything",
          text: "Two lines is enough. Limits decided after seeing a persuasive message are not limits, and this is the field that stops the draft being agreeable at your expense.",
        },
        {
          name: "Read the ask list and the omission list first",
          text: "Skip to those before the draft. If the split is wrong, fixing it there takes one instruction, whereas fixing it in the prose means rewriting the whole reply.",
        },
        {
          name: "Check the commitment audit against your week",
          text: "Any obligation you cannot point at a slot for comes out of the draft. This is the step that keeps a fast reply from becoming an expensive one.",
        },
      ],
    },

    faq: [
      {
        question: "Does an email reply prompt make sense for a message I could answer in ten seconds?",
        answer:
          "No. Answer those and move on. This is for the message you have reopened three times, the one with a hidden request in it, or the one where a careless sentence would commit you to something. Roughly one message in ten is worth the sixty seconds.",
      },
      {
        question: "How do I stop the drafts sounding like a model wrote them?",
        answer:
          "Fill the voice field with specifics rather than adjectives. No greeting, short paragraphs, never uses exclamation marks, signs off with just the name. Concrete habits transfer well. Asking for a professional but friendly tone produces the house style of every assistant ever shipped.",
      },
      {
        question: "What if the reply genuinely needs to answer three questions?",
        answer:
          "Then it is probably a call or a document rather than an email. The prompt is instructed to say so. When you overrule it, ask for the three answers as a numbered list, because three answers buried in prose reliably produces a follow up asking about the second one.",
      },
      {
        question: "Can it handle a thread rather than a single message?",
        answer:
          "Paste the last two messages and summarise the rest in a line. Whole threads dilute the ask list, because points settled four messages ago come back as live questions and the omission list fills up with things nobody is asking about any more.",
      },
      {
        question: "Should I send the draft as written?",
        answer:
          "Change one thing, always. A specific detail only you would know, or a line about something outside the thread. Both the register and the rhythm are slightly too even otherwise, and the person receiving it reads that as distance rather than as efficiency.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/inbox-triage-prompt",
        label: "inbox triage prompt",
        description:
          "Run first, on the whole inbox. This one takes over for the handful of messages triage says you personally must answer.",
      },
      {
        href: "/productivity-prompts/saying-no-prompt",
        label: "saying no prompt",
        description:
          "When the omission list contains a request you have to decline outright rather than quietly leave out.",
      },
      {
        href: "/productivity-prompts/decision-log-prompt",
        label: "decision log prompt",
        description:
          "For the commitments the audit found, so an agreement made by email does not live only in a mailbox.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "For the reply that has to be forwarded to people who were not in the thread.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Covers why a default such as answer one ask has to be stated as a rule, since models resolve ambiguity by being maximally helpful.",
      },
      {
        href: "https://hbr.org/2016/11/how-to-write-email-with-military-precision",
        label: "Harvard Business Review: Write email with military precision",
        description:
          "Source for the practice of stating the single required action explicitly rather than embedding it in prose.",
      },
      {
        href: "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/",
        label: "Nielsen Norman Group: F shaped reading pattern",
        description:
          "Evidence that recipients read the first lines and skim the rest, which is why the reply carries one commitment near the top.",
      },
    ],
  },
};

export default meta;
