import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "interview-answer-prompt",
  name: "Sceptical Interviewer",
  title: "Interview Answer Prompt",
  category: "career-prompts",
  taskType: "roleplay",
  summary:
    "Puts a doubting hiring manager across the table who asks one follow up to whatever you just claimed, then lists what had nothing behind it.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["interviews", "rehearsal", "job search", "hiring"],

  seo: {
    primaryKeyword: "interview answer prompt",
    keywords: [
      "interview answer prompt",
      "how to prepare for a behavioural interview",
      "ai prompt for mock interview practice",
      "answering the follow up question a hiring manager asks",
      "star method answers with real evidence",
      "rehearsing interview answers instead of memorising them",
    ],
    seoTitle: "Interview Answer Prompt: Rehearse Against A Sceptic",
    seoDescription:
      "An interview answer prompt that plays a doubting hiring manager, probes every claim with one follow up, and refuses to hand you a script to memorise.",
  },

  prompt: {
    text: `You are a hiring manager interviewing me for the role below. You have read my background and you do not believe the strongest claim in it. You are not hostile and you are not encouraging. You are trying to find the exact boundary of what I personally did.

ROLE AND LEVEL: {{TARGET_ROLE}}
WHAT THE EMPLOYER SEEMS TO CARE ABOUT: {{EMPLOYER_SIGNALS}}
MY BACKGROUND, INCLUDING THE AWKWARD PARTS: {{MY_BACKGROUND}}
STORIES I ALREADY PLAN TO USE: {{MY_STORIES}}

Ask me one question. Wait for my answer. Then ask exactly one follow up, aimed at the least supported thing I just said rather than at the most interesting. Continue for three exchanges on that question before moving on.

Rules you must not break. Never write an answer for me, even if I ask you to. Never pay me a compliment. Never accept a claim because I repeated it with more confidence the second time. If I say we when describing a decision, ask which part was mine. If I give a qualitative result, ask for the number and then ask how it was measured. If I describe a success, ask what happened to it six months later. If I go vague, do not challenge it immediately, come back to that word two exchanges later.

After three questions, stop the roleplay and give me three lists: claims I supported, claims I asserted without evidence, and the specific facts I should go and confirm before the real interview. Rank the second list by how likely each one is to be probed.`,
    variables: [
      {
        token: "TARGET_ROLE",
        label: "Role and level",
        example: "Staff Data Engineer, financial services, second round with the hiring manager and one peer",
      },
      {
        token: "EMPLOYER_SIGNALS",
        label: "What the employer seems to care about",
        example:
          "Advertisement mentions migrating off a legacy warehouse twice, and the team blog complains about pipeline reliability during month end close",
      },
      {
        token: "MY_BACKGROUND",
        label: "Your background including the awkward parts",
        example:
          "Six years in data engineering. Led a warehouse migration at a 90 person company. Fourteen month tenure at my last job that ended in a layoff. No experience with regulated reporting.",
      },
      {
        token: "MY_STORIES",
        label: "Stories you already plan to use",
        example:
          "The migration, the on call rewrite that cut pages by half, and the time I pushed back on a deadline and was right",
      },
    ],
    expectedOutput:
      "A single opening question, then a genuine back and forth where each follow up targets your weakest sentence, ending in three ranked lists separating what you supported from what you merely asserted and what you still need to confirm.",
    followUps: [
      "Run the same three questions again, but as a peer interviewer who cares about how I work with people rather than what I delivered.",
      "Take my weakest answer and ask five consecutive follow ups on it until I run out of material.",
      "Now interview me as someone deciding whether to hire me a level above the one advertised.",
    ],
    pitfalls: [
      "Typing your answers instead of saying them hides the hesitation the room will hear, and the hesitation is the thing you are trying to find.",
      "Looking up a figure mid answer makes the rehearsal worthless, because you cannot do it in the interview.",
      "Some models drift into encouragement after a few turns. If it starts saying good example, restate the no compliments rule and continue.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The instruction to delay the challenge on a vague word turned out to matter more than anything else. Probing immediately lets a candidate patch the sentence and move on. Coming back to it two exchanges later, which is what real panels do by accident, is what exposes whether the detail existed. GPT-5.2 kept slipping back into supportive coaching around turn six and needed the no compliments rule repeated.",
  },

  article: {
    intro: [
      "An interview answer prompt that hands you polished paragraphs to learn is preparing you for the wrong event. Nobody is assessed on their opening answer. They are assessed on what happens when someone asks how, and then asks how again.",
      "So this one writes nothing. It plays a hiring manager who has read your background, doubts the strongest claim in it, and asks a single follow up to whatever you just said. You produce the answers. It tells you afterwards which parts had nothing underneath them.",
      "That is uncomfortable in a way a generated script never is, which is the argument for running it a week out rather than the night before.",
    ],

    sections: [
      {
        heading: "Memorised answers have a texture",
        body: [
          "A learned paragraph gives itself away. The clauses are too balanced, the transitions arrive too neatly, and the delivery flattens because the speaker is retrieving rather than thinking. Interviewers notice without being able to say what they noticed, and the word that ends up in their notes is rehearsed.",
          "Rehearsing interview answers instead of memorising them means practising the recovery rather than the paragraph. If you hold the four facts of an incident and the reason it mattered, you can assemble a version of it live, and live assembly sounds like somebody who was actually there.",
          "Most advice on how to prepare for a behavioural interview stops at collecting stories, which is the easy half. The hard half is discovering which of your stories fall apart under the second question, and there is no way to find that out by yourself.",
        ],
      },
      {
        heading: "The follow up is where it is decided",
        body: [
          "Answering the follow up question a hiring manager asks is the part that determines the outcome. Your first answer establishes a claim. The second question tests whether that claim came from experience or from preparation, and those two are indistinguishable until somebody probes.",
          "The probes themselves are boring and effective. What would you do differently. Who disagreed. What did it cost. How did you know it worked. None of them is clever, and each one separates a story built from memory from one assembled out of a job description.",
          "The interview answer prompt asks one at a time and aims each one at the least supported thing you just said, which is rarely the part you were proudest of.",
        ],
      },
      {
        heading: "What a doubting interviewer actually does",
        body: [
          "The role is not adversarial. A good interviewer wants the boundary of what you did, because the boundary is the useful information and candidates almost never volunteer it unprompted.",
        ],
        list: [
          "Asks for the number behind a qualitative claim, then asks how it was measured.",
          "Separates what the team delivered from what you personally decided.",
          "Asks what happened next, because a fair number of successful projects were quietly reversed within a year.",
          "Asks who objected, on the grounds that a decision nobody resisted was probably not a decision.",
          "Returns to a vague word later in the conversation rather than at the moment you used it.",
        ],
      },
      {
        heading: "Using the interview answer prompt on the story you keep telling wrong",
        body: [
          "Everybody has one. It lands well socially, gets deployed for three different questions, and has never survived a real probe because it has never met one. Run that story first and expect it to go badly.",
          "Star method answers with real evidence get through the second question, and the rest collapse at the Result. Situation and Task are scene setting, Action is where an interviewer listens hardest, and Result is where an unmeasured story runs out of material. If you cannot say what changed and how you know, what you have is a Task with an ending attached to it.",
        ],
      },
      {
        heading: "Pronoun drift and the scope question",
        body: [
          "The most common honest mistake in an interview is not exaggeration, it is pronoun drift. We rebuilt the reporting layer becomes I rebuilt the reporting layer across three tellings. The candidate is not lying, they are compressing, and the compression happens to remove four other people.",
          "The prompt flags each shift and asks the question a reference check will eventually ask anyway: which part of that was yours. Answering it precisely lands better than the inflated version, because clear scope is rare enough in interviews to read as a signal on its own.",
        ],
      },
      {
        heading: "What it will not give you",
        body: [
          "It does not supply model answers even when asked directly, because an answer you were handed is an answer you will deliver from memory. It does not compliment you. It does not accept a claim on the second pass simply because you restated it more firmly.",
          "An ai prompt for mock interview practice is only worth running if the model is permitted to be unimpressed. Set it to agreeable and you get a pleasant conversation that predicts nothing at all about the real one.",
        ],
      },
    ],

    howTo: {
      name: "How to run the interview answer prompt",
      steps: [
        {
          name: "Include the awkward parts of your history",
          text: "The short tenure, the layoff, the project that failed. A panel will reach them, and rehearsal is worth more when they are on the table.",
        },
        {
          name: "Answer out loud",
          text: "Type only if you must. Speaking is the skill under assessment, and a written answer conceals every pause the room would hear.",
        },
        {
          name: "Look nothing up mid answer",
          text: "Checking a figure while answering is the one move unavailable in the interview, so allowing it here makes the whole session misleading.",
        },
        {
          name: "Treat the unsupported list as homework",
          text: "The claims it says you asserted without evidence are facts to go and confirm, not comments on your delivery.",
        },
        {
          name: "Repeat the same story days later",
          text: "The second run shows whether you fixed the evidence or merely learned this interviewer's habits.",
        },
      ],
    },

    faq: [
      {
        question: "How many questions should one session cover?",
        answer:
          "Three or four including their follow ups. A session that races through twelve is testing your stamina rather than your evidence, and almost all of the value sits in the second and third exchange on one story rather than in breadth.",
      },
      {
        question: "Is this useful for a technical loop?",
        answer:
          "For the experience portion, yes. It cannot judge whether your system design is sound, but it works well on the section where you describe a past decision, because that part of a technical loop is behavioural assessment wearing technical vocabulary.",
      },
      {
        question: "What if I genuinely cannot remember the numbers?",
        answer:
          "Say so during the session and then go and find them. Many missing figures are recoverable from old documents or a former colleague, and the ones that are not can be replaced with a named consequence, such as who stopped escalating and from when.",
      },
      {
        question: "Does an interview answer prompt help with nerves?",
        answer:
          "Indirectly. A large share of interview anxiety comes from not knowing which question will expose you, and discovering that privately a week early removes the specific fear. It does nothing for the general kind and does not replace practising with a person.",
      },
      {
        question: "Should I reuse its phrasing on the day?",
        answer:
          "No, and it will not produce any for you to reuse. Bring the facts you confirmed and let the sentences form in the room. Answers assembled live are messier and considerably more convincing than anything recited.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description:
          "Every surviving line on the resume is a claim you will be asked to defend, so classify them before you rehearse.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description:
          "The evidence you confirm during rehearsal is the same evidence the offer conversation runs on.",
      },
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description:
          "Whatever single argument the letter made is the first thing the panel will pick up on.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "The test that a competitor could not claim the same sentence applies just as well to a candidate.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/",
        label: "US Office of Personnel Management: Structured interviews",
        description:
          "The federal reference on structured and behavioural interviewing, including why probing follow ups raise predictive validity.",
      },
      {
        href: "https://hbr.org/2016/01/how-to-conduct-an-effective-job-interview",
        label: "Harvard Business Review: How to conduct an effective job interview",
        description:
          "Describes the interviewer behaviour this roleplay imitates, particularly the habit of narrowing down to individual contribution.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Covers persona instructions and the constraint patterns that keep a roleplay from drifting back into helpful coaching.",
      },
    ],
  },
};

export default meta;
