import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "job-rejection-follow-up-prompt",
  name: "Door Reader",
  title: "Job Rejection Follow Up Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Classifies the rejection by how far you got, reads the actual wording for what is template and what is not, decides whether a reply helps, and asks one question they can answer.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["rejection", "feedback", "job search", "email"],

  seo: {
    primaryKeyword: "job rejection follow up prompt",
    keywords: [
      "job rejection follow up prompt",
      "how to reply to a job rejection email",
      "ai prompt for asking for interview feedback",
      "how to stay in touch after a job rejection",
    ],
    seoTitle: "Job Rejection Follow Up Prompt: Reply Or Let It Go",
    seoDescription:
      "A job rejection follow up prompt that reads the wording you were sent, decides whether a reply is worth it, and asks the one question a recruiter can answer.",
  },

  prompt: {
    text: `You are advising me after a rejection. You are not consoling me and you are not helping me change their mind.

THE ROLE, AND HOW FAR THROUGH THE PROCESS I GOT: {{STAGE}}
THE REJECTION MESSAGE, PASTED EXACTLY AS IT ARRIVED: {{MESSAGE}}
WHO SENT IT AND WHAT MY CONTACT WITH THEM WAS LIKE: {{SENDER}}
WHAT I ACTUALLY WANT OUT OF A REPLY: {{WANT}}
ANYTHING I ALREADY KNOW ABOUT WHY: {{KNOWN}}

First, classify it as NO INTERVIEW, INTERVIEWED AND LOST, or FINAL TWO, using the stage and the message together. Say so if those two disagree.

Second, read the wording. Quote the phrases that carry information: whether a person wrote it or a system did, whether anyone is named, whether future contact is invited, whether a reason appears, and whether that reason is about fit, experience or timing. Mark plainly which parts are standard formula and refuse to read meaning into those.

Third, decide. Return REPLY or NO REPLY with one line of reasoning. A NO INTERVIEW rejection from an unnamed sender is almost always NO REPLY, and you should say that rather than manufacturing a reason to write.

If REPLY, produce a message of 100 words maximum with exactly three parts: one line accepting the decision without arguing any of it, one question they are permitted to answer, and one specific sentence about the kind of role I would want to hear about. Never ask why I was rejected, because it triggers caution and produces nothing. Ask instead which part of the brief I was furthest from, or what the person they hired had that the shortlist did not.

Never offer to work unpaid, never ask them to keep my details on file, never express disappointment twice, never request reconsideration.

Finish with one line on whether this door is open, closed, or open for a different role, quoting the phrase that tells you.`,
    variables: [
      {
        token: "STAGE",
        label: "The role and how far you got",
        example:
          "Operations manager at a food distribution company. Three rounds, final two, met the managing director last Thursday.",
      },
      {
        token: "MESSAGE",
        label: "The rejection message, pasted exactly",
        example:
          "Hi, thank you for your time last week. After a lot of discussion we have decided to offer the role to another candidate whose depot experience was closer to what we need in the first year. It was genuinely close and I would like to stay in touch. Best, Sam",
      },
      {
        token: "SENDER",
        label: "Who sent it and your contact with them",
        example:
          "Sam, the internal recruiter. Spoke to him four times, he was straight with me about the timeline and warned me the MD would push on depot numbers.",
      },
      {
        token: "WANT",
        label: "What you want out of a reply",
        example:
          "To know whether depot experience was the whole thing, and to be a real candidate if the second operations role opens in the autumn.",
      },
      {
        token: "KNOWN",
        label: "What you already know about why",
        example:
          "The MD asked twice about how many depots I had run directly. My answer was two, the other finalist reportedly runs seven.",
      },
    ],
    expectedOutput:
      "A classification of the rejection, quoted phrases separated into template and meaningful, a clear reply or no reply verdict, a message of under 100 words if it is worth sending, and a read on whether the door is open.",
    followUps: [
      "He answered and named two things. Tell me which of them I can actually change in six months and which I cannot.",
      "Write the message I send this person in October if the second role opens, referencing this conversation without being needy about it.",
      "Same rejection but I never met anyone and it came from a no reply address. Redo the verdict.",
    ],
    pitfalls: [
      "Paraphrasing the rejection instead of pasting it destroys the only evidence there is. The exact wording is what separates a template from a personal note, and your summary removes precisely that.",
      "Asking for feedback from an unnamed sender after an automated screening rejection produces nothing and uses up a small amount of goodwill at a company you may apply to again.",
      "The temptation is to reply while still stinging. Whatever you send in the first two hours will read as an argument no matter how carefully it is worded.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The question a candidate wants to ask is why the rejection happened, and that phrasing reads to a hiring manager as the opening of a complaint, which draws a careful non answer. Rewriting it as which part of the brief the application sat furthest from requests the same information without inviting defensiveness. GPT-5.2 finds a reason to write even after an automated rejection unless that case is ruled out explicitly.",
  },

  article: {
    intro: [
      "A job rejection follow up prompt should start by telling you whether to send anything at all. Most rejections do not warrant a reply, and the message people send anyway is the one that adds a small negative memory to an otherwise neutral file.",
      "The ones that do warrant a reply are worth real care, because a final round rejection is the closest thing to a warm contact a job search produces. Somebody spent hours on you and chose someone else, and they usually know exactly why.",
    ],

    sections: [
      {
        heading: "Three rejections that look identical",
        body: [
          "Rejected before any interview, rejected after interviewing, and rejected as the second of two are different events wearing similar language. Only the last two contain information anybody could give you, and only the last one usually comes with someone willing to.",
          "The classification comes first because it decides everything downstream. Asking for detailed feedback after an automated screening rejection is asking a system to explain itself, and the reply, if any, will be a paragraph of nothing.",
        ],
      },
      {
        heading: "Reading the wording you were sent",
        body: [
          "Reading the wording of a rejection letter is a real skill and most of it is knowing which phrases are load bearing. We will keep your details on file is formula. Whose depot experience was closer to what we need in the first year is not, and it is close to a complete answer.",
          "The prompt separates the two explicitly and refuses to interpret standard phrases, which is the main way candidates torture themselves. Someone named at the bottom, a specific reason, and an invitation to stay in touch are three genuine signals. A warm tone on its own is not one, because warmth is what these templates are written for.",
        ],
      },
      {
        heading: "The one question they are permitted to answer",
        body: [
          "Why was I rejected is the question everybody wants to ask and the one nobody answers. It reads as the opening line of a complaint, and in most companies the guidance is to stay general when a candidate asks it in those words.",
          "The workable version narrows the scope so an honest answer costs nothing. Which part of the brief was I furthest from. What did the person you hired have that the rest of the shortlist did not. Any ai prompt for asking for interview feedback that ignores this distinction produces polite messages that get polite non answers.",
          "One question only. Two makes the reply feel like work, and work is what gets deferred until it is forgotten.",
        ],
      },
      {
        heading: "When the job rejection follow up prompt says do not reply",
        body: [
          "No named sender, no interview, nothing personal in the wording: no reply. This is the most common verdict and the most useful, because the answer to how to reply to a job rejection email is usually that you do not.",
          "Knowing when a rejection is worth answering is most of the value on offer here, and the honest threshold is higher than instinct suggests: a named human, a real conversation behind it, and something in the wording that only applies to you.",
          "The cost of a pointless reply is small but real. Recruiters remember the candidates who argue, the ones who ask to be reconsidered, and the ones who send three messages to an address that was never monitored. None of those memories help when you apply again in eighteen months.",
        ],
      },
      {
        heading: "Second chances arrive months later",
        body: [
          "The last part of the message names the kind of role you would want to hear about. Not any suitable opportunity, which is unmemorable, but the specific thing: a second operations role, a team of a certain size, a particular kind of problem.",
          "How to stay in touch after a job rejection comes down to being concrete and infrequent. One good message now, and one in six months if something genuinely changed, is a real relationship with an internal recruiter. Anything more often reads as pressure, and internal recruiters move companies constantly, which means the relationship outlives the vacancy that started it.",
          "The final line of the output is the honest read: door open, door closed, or open for something else. It is quoted from their own message rather than inferred, which makes it much harder to argue with when you would rather believe otherwise.",
        ],
      },
    ],

    howTo: {
      name: "How to use the job rejection follow up prompt",
      steps: [
        {
          name: "Wait a day",
          text: "Paste it in tomorrow. Nothing written within two hours of a rejection reads the way you intended, and there is no deadline here.",
        },
        {
          name: "Paste the message exactly",
          text: "Signature, formatting, all of it. Whether a human typed it is the single most informative thing in the input and your paraphrase erases it.",
        },
        {
          name: "Accept a no reply verdict",
          text: "Most rejections get one. Spend the effort on the next application instead, which has a considerably better return than a message nobody will read.",
        },
      ],
    },

    faq: [
      {
        question: "Do recruiters actually answer these?",
        answer:
          "Sometimes, and it depends almost entirely on whether you met them. An internal recruiter who spoke to you four times will usually give you two honest lines. An agency recruiter working a placement fee often will not, and an unmonitored careers inbox never does.",
      },
      {
        question: "Is it worth asking when I know the reason already?",
        answer:
          "Only for the door opening part. If you know the gap was depot experience, skip the question entirely and send the shorter message that names the role you want to hear about. Asking something you can already answer wastes the one reply you are likely to get.",
      },
      {
        question: "What if the rejection was clearly unfair?",
        answer:
          "A follow up message is the wrong instrument for that, and anything arguing the decision converts a neutral file into a difficult one. If you believe the process breached employment law rather than simply going against you, that is a formal route and a different conversation entirely.",
      },
      {
        question: "Should I connect with the interviewer on a professional network?",
        answer:
          "After a real interview, yes, with a one line note referring to something specific from the conversation. After an automated rejection, no, because a connection request with no shared context is the same generic outreach the classification step was designed to catch.",
      },
      {
        question: "How long before I apply to the same company again?",
        answer:
          "Six months is a reasonable floor for a different role, and immediately is fine if a genuinely different position opens and someone invited you to stay in touch. Reapplying to the same role a month later signals that nothing about your candidacy changed.",
      },
      {
        question: "Does asking for feedback make me look difficult?",
        answer:
          "Not when the question is narrow and the message is short. What reads as difficult is the reply that relitigates an interview answer, asks for a second chance, or arrives at length. One accepting line, one answerable question, one specific door: that is a message people are glad to receive.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "Where the honest feedback goes next, rebuilding the answer that was furthest from what they needed.",
      },
      {
        href: "/career-prompts/skills-gap-prompt",
        label: "skills gap prompt",
        description:
          "For working out whether the named gap is one you can close or one to stop applying against.",
      },
      {
        href: "/career-prompts/thank-you-note-prompt",
        label: "thank you note prompt",
        description:
          "The message sent before the decision, built on the same rule that one specific reference beats general warmth.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description:
          "A useful model of what actionable feedback looks like, which is what your one question is trying to extract.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.eeoc.gov/prohibited-employment-policiespractices",
        label: "US Equal Employment Opportunity Commission: Prohibited practices",
        description:
          "The legal backdrop that makes employers cautious about detailed rejection reasons, which is why the question has to be narrowed.",
      },
      {
        href: "https://www.acas.org.uk/",
        label: "Acas: Advice on recruitment and employment",
        description:
          "The UK employment guidance body, cited for standard practice on candidate feedback and record keeping after a hiring decision.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the classification before generation pattern that decides whether a message should be written at all.",
      },
    ],
  },
};

export default meta;
