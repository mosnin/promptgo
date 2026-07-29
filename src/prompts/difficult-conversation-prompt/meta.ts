import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "difficult-conversation-prompt",
  name: "Opposing Counsel",
  title: "Difficult Conversation Prompt",
  category: "business-prompts",
  taskType: "roleplay",
  summary:
    "Makes the other person's case at full strength before you say a word, finds the part of it that is correct, and refuses to hand you lines to recite.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["management", "conflict", "communication", "preparation"],

  seo: {
    primaryKeyword: "difficult conversation prompt",
    keywords: [
      "difficult conversation prompt",
      "how to prepare for a difficult conversation at work",
      "rehearsing the strongest objection you will face",
      "ai prompt for a hard conversation with an employee",
      "what to say when someone gets defensive",
      "conversation you have been avoiding for weeks",
    ],
    seoTitle: "Difficult Conversation Prompt: Rehearse Their Case",
    seoDescription:
      "A difficult conversation prompt that argues the other person's side at full strength, finds the part where they are right, and refuses to write you a script.",
  },

  prompt: {
    text: `You are going to argue against me. I have a conversation to have with someone and I have already rehearsed my own side more than enough. Your job is to represent them, seriously and at full strength, and you are not permitted to write my lines.

WHAT I NEED TO SAY: {{MESSAGE}}
WHO THEY ARE AND WHAT THIS COSTS THEM: {{PERSON}}
WHAT HAS HAPPENED, AS FACTUALLY AS I CAN PUT IT: {{HISTORY}}
HOW THEY WOULD DESCRIBE THE SAME EVENTS: {{THEIR_ACCOUNT}}
WHAT I HAVE CONTRIBUTED TO THIS SITUATION: {{MY_PART}}
WHAT I CANNOT CHANGE, WHATEVER THEY SAY: {{FIXED}}

Give me six things, in this order.

1. THEIR OPENING. The first thing they say when I finish my first sentence, written in their voice. Most people do not open with agreement or with rage. They open with a question, a clarification or a small correction of fact, and I should be ready for that rather than for a confrontation.

2. THEIR STRONGEST CASE. Three or four paragraphs arguing their position as well as it can honestly be argued, using my history and their account. Do not caricature them and do not include the weak arguments that would be easy for me to answer. If their best case is that I am being unfair, make that case properly.

3. WHERE THEY ARE RIGHT. Name the specific point on which their version is more accurate than mine, including anything in what I contributed. There is almost always one. If you genuinely cannot find one, say so and explain what in my account makes it hard to check.

4. THE FACT I HAVE WRONG. Identify anything in my history that is an inference rather than an observation, and write the question I should ask to test it before asserting it.

5. IF THEY GET DEFENSIVE. Three specific forms it might take here: challenging the evidence, widening the topic to something unrelated, or agreeing quickly to end the conversation. For each, one question that continues the conversation rather than closing it, and the sentence I should not say.

6. MY BOUNDARY. Restate what I said I cannot change, and tell me the point in this conversation where I will be most tempted to concede it.

Do not write a script for me. Do not suggest a compliment sandwich. Do not tell me to lead with empathy. If my message itself is unclear or unfair, say that before anything else.`,
    variables: [
      {
        token: "MESSAGE",
        label: "What you need to say",
        example: "That we are taking the client relationship off them and giving it to someone else from next month",
      },
      {
        token: "PERSON",
        label: "Who they are and what this costs them",
        example:
          "Senior account manager, eight years here, this is the account they are known for internally and it is most of their visibility with the leadership team",
      },
      {
        token: "HISTORY",
        label: "What has happened, as factually as you can put it",
        example:
          "Client escalated twice in four months. Both times about a missed deadline. The client asked in March for a different point of contact and I did not act on it.",
      },
      {
        token: "THEIR_ACCOUNT",
        label: "How they would describe the same events",
        example:
          "They would say both deadlines slipped because delivery was short staffed, that they flagged it in writing, and that nobody supported them when the client got aggressive",
      },
      {
        token: "MY_PART",
        label: "What you have contributed",
        example: "I sat on the client's March request for six weeks and never told them it had been made",
      },
      {
        token: "FIXED",
        label: "What you cannot change whatever they say",
        example: "The account is moving. The date can flex by two weeks and the internal framing is negotiable.",
      },
    ],
    expectedOutput:
      "Their likely opening line in their own voice, several paragraphs of their best honest argument, a named point on which they are more right than you, an inference in your account with the question that tests it, three defensive patterns each paired with a continuing question, and the moment you are most likely to give away your boundary.",
    followUps: [
      "Now play them for ten exchanges. Open with their first line and respond to whatever I say, staying in character and not making it easy.",
      "They accepted immediately and said it was fine. Tell me what that probably means here and what I ask before ending the meeting.",
      "Rewrite section three assuming I was wrong about the March request being the only thing I sat on.",
    ],
    pitfalls: [
      "Writing the history as an argument rather than as events produces a weak opposing case, because the model can only work with what you gave it. Put in the parts that make you look bad.",
      "Leaving the contribution field empty is the most common way this fails. A conversation where you contributed nothing is rare, and going in believing that is what makes people sound rehearsed.",
      "The temptation is to read the output and extract phrases to use. Doing that produces the scripted delivery the whole exercise exists to avoid, and people can hear it.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Section three is the one that has changed actual conversations for me. Preparing to move an account, the model pointed out that the six weeks I sat on the client's request was the same delay I was about to criticise, which was true and which I had not connected. Both models drift towards writing my side if the request is at all ambiguous, so the instruction against scripting sits at the top and again at the bottom of the prompt.",
  },

  article: {
    intro: [
      "A difficult conversation prompt that writes your opening line has solved the easy problem. You already know roughly what you want to say. What you do not know is what happens after they respond, which is the point where prepared people stop being prepared.",
      "This one refuses to write your side at all. It represents the other person, argues their case as well as it can honestly be argued, and then tells you where their version is more accurate than yours.",
      "The output is uncomfortable by design. If it comes back agreeing with you, the input was written as an argument rather than as a set of events.",
    ],

    sections: [
      {
        heading: "The model argues their side, not yours",
        body: [
          "Rehearsing your own position is a comfortable activity that feels like preparation. It is why people walk into these meetings having practised two sentences forty times and having no idea what to do in minute four.",
          "Rehearsing the strongest objection you will face inverts the exercise. You hear the best version of their argument in advance, in a setting where being wrong costs nothing, and the specific value is that a strong argument encountered for the first time in the room produces either capitulation or stubbornness, rarely a good decision.",
          "The instruction not to caricature matters more than it sounds. A model given a one sided history will happily produce a weak opponent who says exactly what you can answer, and that rehearsal is worse than none because it builds false confidence.",
        ],
      },
      {
        heading: "Find the part where they are right",
        body: [
          "Section three asks for the specific point on which their account beats yours. In my experience there is one in almost every case, and it is usually something the person preparing has already half noticed and moved past.",
          "Naming it before the meeting changes what happens in it. Conceding a point you have already thought about sounds like judgement. Conceding one you are hearing for the first time sounds like retreat, and the other person can tell the difference immediately.",
          "The related check is the inference test. An ai prompt for a hard conversation with an employee is dangerous if it treats your account as fact, so section four separates what you observed from what you concluded and writes the question that tests the conclusion before you assert it as a reason.",
        ],
      },
      {
        heading: "What to say when someone gets defensive",
        body: [
          "Defensiveness has recognisable shapes. Challenging the evidence, widening the subject to something unrelated, and agreeing quickly to end the discussion are the three that show up most, and the third is the one people misread as success.",
          "Each gets a question that keeps the conversation open and a sentence to avoid. The sentence to avoid is normally the one that feels most reasonable, such as explaining that this is not personal, which invites a reply about how it is being received.",
          "Rapid agreement deserves particular suspicion. Someone accepting a hard message in eight seconds has usually decided the conversation is not worth having, and the useful move is to ask what they think will actually happen next rather than thanking them for taking it well.",
        ],
      },
      {
        heading: "Why the difficult conversation prompt will not write your script",
        body: [
          "A script fails for a mechanical reason. Delivered as written it sounds performed, and the moment the other person departs from the expected reply, you are reading from a document that no longer matches the conversation.",
          "Knowing how to prepare for a difficult conversation at work means holding three things, not thirty sentences: what you must convey, what you cannot concede, and where you might be wrong. The prompt produces those three and deliberately leaves the wording to you.",
          "The final section names the moment you are most likely to give away your boundary. It is nearly always the point where they say something legitimate and hard to hear, and the instinct is to offer something to make it easier. The conversation you have been avoiding for weeks usually ends there, in a concession nobody planned and everybody remembers.",
        ],
      },
    ],

    howTo: {
      name: "How to use the difficult conversation prompt",
      steps: [
        {
          name: "Write the history as events, not as a case",
          text: "Dates and actions only. If a line contains a judgement, split it into what happened and what you concluded, and put the conclusion in a separate note.",
        },
        {
          name: "Fill in what you contributed before you run it",
          text: "This field is the one that produces a real opposing case. If you cannot think of anything, ask a colleague who was there rather than leaving it blank.",
        },
        {
          name: "Run the roleplay, then close the document",
          text: "Do the ten exchange version, then put it away and go into the meeting with the three things you must hold. Reading phrases back is what makes people sound scripted.",
        },
      ],
    },

    faq: [
      {
        question: "Does this work when I am the one being criticised?",
        answer:
          "Yes, and it works better in that direction. Put their criticism in as the message and yourself as the other person, and the model will build the strongest version of the case against you, which is more useful than anything you will construct while feeling defensive.",
      },
      {
        question: "Is it wrong to use a model for something this human?",
        answer:
          "The difficult conversation prompt is not having the conversation for you. It is doing the thing a good colleague would do if you had one available at ten at night, which is argue the other side properly. Everything said in the room is still yours, and the preparation is not visible to anyone.",
      },
      {
        question: "What if the model says my message is unfair?",
        answer:
          "Take it seriously and check the input first, since an unfair reading often comes from a history written as an argument. If the input is fair and the verdict stands, you have learned something cheaply that you would otherwise have learned in the meeting.",
      },
      {
        question: "How long before the meeting should I run this?",
        answer:
          "A day, not an hour. The point on which they are right usually needs overnight to stop feeling like an attack, and if the inference test turns up a question you should ask first, you need time to ask it before the conversation happens.",
      },
      {
        question: "Should I tell the other person I prepared?",
        answer:
          "There is no need to mention the tool, but saying you have thought about it beforehand is usually helpful. It signals the conversation is not impulsive, and it makes a stated boundary read as a considered position rather than something decided in the moment.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/one-on-one-meeting-prompt",
        label: "one on one meeting prompt",
        description:
          "Where most of these conversations should have started, and where an item that keeps reappearing signals one is overdue.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "The written counterpart, which needs dated evidence for anything you are about to say out loud.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description:
          "The same rehearsal logic applied when you are the one asking, including deciding your limit before the room.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.pon.harvard.edu/category/daily/conflict-resolution/",
        label: "Harvard Program on Negotiation: conflict resolution research",
        description:
          "Academic source on preparing by modelling the counterpart's interests rather than by rehearsing your own position.",
      },
      {
        href: "https://www.acas.org.uk/managing-performance",
        label: "Acas: managing performance guidance",
        description:
          "Statutory guidance body on how workplace conversations about performance and conduct should be prepared and recorded.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: prompt engineering overview",
        description:
          "Documents the role assignment technique that keeps the model arguing one side consistently instead of balancing both.",
      },
    ],
  },
};

export default meta;
