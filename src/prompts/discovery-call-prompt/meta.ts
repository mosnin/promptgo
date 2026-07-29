import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "discovery-call-prompt",
  name: "Discovery Call Planner",
  title: "Discovery Call Prompt",
  category: "sales-prompts",
  taskType: "plan",
  summary:
    "Builds a question plan for a first sales call that finds out whether a real problem exists, instead of walking the prospect through a demo.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["discovery call", "sales calls", "qualification", "sales questions"],

  seo: {
    primaryKeyword: "discovery call prompt",
    keywords: [
      "discovery call prompt",
      "sales discovery questions generator",
      "ai prompt for qualifying leads",
      "discovery call script for saas sales",
      "questions to ask on a first sales call",
      "how to qualify a prospect with ai",
    ],
    seoTitle: "Discovery Call Prompt: Plan Questions That Qualify",
    seoDescription:
      "A discovery call prompt that builds a question plan around one hypothesis and forces a disqualify path. Stops first calls turning into unpaid demos.",
  },

  prompt: {
    text: `You are a sales manager preparing a rep for a first discovery call. You are sceptical by default and you believe most deals die because nobody established that a real problem existed.

CONTEXT: {{CONTEXT}}
WHAT WE SELL: {{OFFER}}
MY HYPOTHESIS ABOUT THEIR PROBLEM: {{HYPOTHESIS}}

Produce a call plan with these five parts and nothing else:

1. THE ONE THING TO LEARN. A single sentence naming the fact that, if we learn it, tells us whether this deal is real. Not three things. One.

2. OPENING QUESTION. One open question that gets them describing their current process, phrased so it cannot be answered yes or no. It must not mention our product.

3. FIVE FOLLOW UP QUESTIONS, ordered. Each must dig into a different dimension: how the problem shows up, who it affects, what they have already tried, what it costs them, and what happens if they do nothing. Mark which single question is most likely to be answered dishonestly and say why.

4. THE DISQUALIFY TEST. State the specific answer that should make us walk away, and the exact question that surfaces it. If you cannot name a disqualifying answer, say so plainly rather than inventing one.

5. WHAT NOT TO SAY. Three things the rep will be tempted to say on this call that would turn discovery into a pitch.

Do not write a script. Do not include rapport building small talk. Do not suggest we demo anything on this call.`,
    variables: [
      {
        token: "CONTEXT",
        label: "Who you are meeting and why",
        example:
          "Head of Support at a 90 person ecommerce brand, booked the call after reading our post about ticket deflection",
      },
      {
        token: "OFFER",
        label: "What you sell",
        example: "A help centre tool that answers repeat customer questions automatically",
      },
      {
        token: "HYPOTHESIS",
        label: "What you think their problem is",
        example:
          "Their support team is drowning in the same five questions and hiring instead of deflecting",
      },
    ],
    expectedOutput:
      "A five part plan, not a script: one learning objective, one opening question, five ordered follow ups with the least reliable one flagged, an explicit disqualifying answer, and three things not to say.",
    followUps: [
      "Now play the prospect. Answer my opening question the way a defensive, busy person actually would, then stop and let me follow up.",
      "I asked the five questions and got these answers. Tell me which answer was evasive and what the second question should have been.",
      "Rewrite the disqualify test assuming my hypothesis was wrong and the real problem is somewhere else entirely.",
    ],
    pitfalls: [
      "If your hypothesis is vague, the questions come back vague. Write the hypothesis as a falsifiable sentence, not as a category like 'efficiency'.",
      "Models resist naming a disqualifying answer because it sounds pessimistic. If it hedges, ask again and tell it that no disqualify test means the deal cannot be qualified either.",
      "The 'what not to say' list is the most useful section and the easiest to skip reading. Read it last, right before the call.",
    ],
  },

  eeat: {
    author: "Marcus Bell",
    authorCredential:
      "Fifteen years in B2B outbound, most recently running a six person SDR team selling infrastructure software.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Every early version produced a polite questionnaire where each question was a softer restatement of the last, so a rep could ask all five and learn nothing. Forcing each question onto a named dimension fixed the redundancy. The instruction to flag the question most likely to draw a dishonest answer was added after two calls where the prospect gave a confident budget figure that turned out to be aspirational.",
  },

  article: {
    intro: [
      "A discovery call prompt should produce questions, not a script. That distinction is the whole game: a script gets read at the prospect and turns a conversation into a presentation, while a short list of well ordered questions leaves room for the answer that changes your mind. This one is built to plan a call rather than perform one.",
      "The structure comes from a single constraint. Before generating anything, it forces you to name one hypothesis about the prospect's problem, and then organises the entire call around confirming or killing that hypothesis. Calls without a hypothesis wander, and wandering calls end with the rep offering a demo because nobody could think of what else to do.",
    ],

    sections: [
      {
        heading: "Why first calls turn into demos",
        body: [
          "Most lists of questions to ask on a first sales call fail at a predictable moment, about eleven minutes in, when the rep runs out of them. The prospect has given short answers, the silence is uncomfortable, and the only material the rep has left is the product. So they offer to show it, the call becomes a demo, and everyone leaves without establishing whether a problem exists.",
          "The cause is not nerves, it is preparation. Five questions written in advance, each pointed at a different dimension of the problem, removes the moment entirely, because there is always a next question that is not about the product.",
        ],
      },
      {
        heading: "One hypothesis, not a list of goals",
        body: [
          "The instruction to name a single thing to learn does more work than any other part of this prompt. Reps asked what they want from a call typically list four or five objectives: understand the process, find the budget, identify the decision maker, establish timeline. Attempting all of those in thirty minutes produces a shallow pass over each.",
          "Naming one fact forces a priority, and the priority is almost always whether the problem is real and painful enough to fund. Budget and timeline are answerable later and meaningless before that. What separates this from a generic sales discovery questions generator is that ordering: it moves from how the problem shows up toward what it costs, rather than opening with qualification trivia. As an ai prompt for qualifying leads, the sequence is the product.",
        ],
        list: [
          "How the problem shows up day to day, in their words rather than yours.",
          "Who feels it, which is how you find the person whose budget it eventually comes from.",
          "What they have already tried, which tells you what they will compare you against.",
          "What it costs them, which is the only input that makes a price sound reasonable.",
          "What happens if they do nothing, which is the real competitor in most deals.",
        ],
      },
      {
        heading: "The disqualify test most call plans leave out",
        body: [
          "Asking a model for a discovery call plan without this instruction reliably produces an optimistic one, because the training data is full of sales content written to encourage. A plan with no disqualifying answer is not a qualification plan, it is a list of ways to keep talking.",
          "Requiring a specific answer that should end the conversation changes what the questions are for. It also surfaces the deals that were never real early enough to matter, which is the entire economic argument for doing discovery properly rather than demoing to anyone who books a slot.",
        ],
      },
      {
        heading: "Flagging the answer you should not trust",
        body: [
          "The prompt asks which question is most likely to draw a dishonest answer, and the response is usually right: anything touching budget, authority or how bad the problem really is. People overstate urgency to seem decisive and overstate budget to seem important, and both distortions are sincere rather than manipulative.",
          "Knowing in advance which answer to discount changes how you follow up. Rather than accepting a number, you ask what was spent on the last comparable purchase, which is a memory question rather than a prediction and therefore far more reliable.",
        ],
      },
      {
        heading: "Using the discovery call prompt without reading from it",
        body: [
          "The output of the discovery call prompt is deliberately short enough to hold in view during a call without scrolling. Reading questions verbatim is obvious to the person on the other end, so the practical method is to read the plan once beforehand, keep the one thing to learn visible, and let the five questions sit as a checklist you glance at rather than a sequence you execute.",
          "If the conversation goes somewhere more interesting than the plan, follow it. The plan exists to prevent the eleven minute silence, not to constrain a prospect who has started explaining their actual problem unprompted.",
        ],
      },
    ],

    howTo: {
      name: "How to use the discovery call prompt",
      steps: [
        {
          name: "Write a falsifiable hypothesis",
          text: "State what you think their problem is as a sentence that could be proved wrong. Not 'inefficiency', but 'their team is answering the same five questions manually'.",
        },
        {
          name: "Generate the plan",
          text: "Fill in the context, what you sell and the hypothesis, then run it. Read the disqualify test first, since it is the part that determines whether the call is worth having.",
        },
        {
          name: "Rehearse against the model",
          text: "Use the first follow up prompt to have the model answer as a defensive prospect. Two rounds of this exposes questions that sound fine written down and land badly spoken.",
        },
        {
          name: "Run the call from the checklist",
          text: "Keep the one thing to learn and the five dimensions in view. Do not read questions aloud verbatim and do not demo, even if asked, until the problem is established.",
        },
      ],
    },

    faq: [
      {
        question: "How is a discovery call prompt different from a call script?",
        answer:
          "A script specifies what you say and assumes the prospect follows along. This produces a question plan instead: one objective, five ordered questions and an exit condition. Anyone working out how to qualify a prospect with ai should start here, because you choose the wording live and the call stays a conversation rather than a recital.",
      },
      {
        question: "What if the prompt cannot name a disqualifying answer?",
        answer:
          "It is instructed to say so rather than invent one, and when that happens it usually means the hypothesis was too broad to be tested. Rewrite the hypothesis as something narrower and specific, then run it again. A problem statement that nothing could falsify cannot be qualified against either.",
      },
      {
        question: "Can I use this for a call that is not sales?",
        answer:
          "Yes, with the offer field repurposed. It started as a discovery call script for saas sales but user research interviews, hiring screens and project scoping share the failure mode, where the interviewer talks too much and confirms what they believed. The disqualify test becomes what result would change your plan.",
      },
      {
        question: "Should I send the questions to the prospect in advance?",
        answer:
          "Usually not. Sent in advance they get considered answers, which sounds like a courtesy but removes the unguarded description of the current process that makes discovery useful. Sending the single objective is a reasonable middle path if the prospect asks what the call is about.",
      },
      {
        question: "How many of these questions should I actually get through?",
        answer:
          "Three, in a thirty minute call, if the answers are good. Getting through all five usually means the answers were short and the conversation stayed on the surface. The list is a set of directions to pick from, not a quota to complete before the time runs out.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "How the meeting gets booked in the first place, built on one specific piece of research about the prospect.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "For the second half of the call, once a real concern surfaces and needs understanding rather than rebutting.",
      },
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "Turns what you learned on the call into a recap that moves the deal rather than thanking them for their time.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "Converts the recording into decisions and owners afterwards, so the qualification work is not lost in a transcript.",
      },
    ],

    externalLinks: [
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Primary documentation for the structured output and explicit exclusion techniques the five part format relies on.",
      },
      {
        href: "https://hbr.org/2018/05/the-surprising-power-of-questions",
        label: "Harvard Business Review: The surprising power of questions",
        description:
          "Summarises the research on question sequencing and why follow up questions specifically increase how much people disclose.",
      },
      {
        href: "https://www.nngroup.com/articles/interviewing-users/",
        label: "Nielsen Norman Group: Interviewing users",
        description:
          "The standard reference on avoiding leading questions, which is the failure mode a hypothesis driven call plan is most exposed to.",
      },
    ],
  },
};

export default meta;
