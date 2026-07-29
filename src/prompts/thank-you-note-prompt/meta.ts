import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "thank-you-note-prompt",
  name: "One Moment Note",
  title: "Thank You Note Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Builds a note of under 120 words around a single remembered moment and what you have thought about since, and tells you not to send it when the moment could belong to anyone.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["interview", "follow up", "email", "job search"],

  seo: {
    primaryKeyword: "thank you note prompt",
    keywords: [
      "thank you note prompt",
      "post interview thank you email",
      "ai prompt for a follow up note after an interview",
      "what to say in a thank you email after an interview",
      "referencing one moment from the conversation",
      "thank you note that is not generic",
    ],
    seoTitle: "Thank You Note Prompt: One Moment, Under 120 Words",
    seoDescription:
      "A thank you note prompt that builds a short message around one remembered moment, bans the standard phrases, and refuses to send when the moment is generic.",
  },

  prompt: {
    text: `You write very short professional notes. You are strict about length and hostile to warmth that has not been earned.

WHO I MET, THEIR ROLE, AND HOW THE CONVERSATION ACTUALLY WENT: {{MEETING}}
THE ONE MOMENT I WANT TO REFERENCE, AS CLOSE TO WHAT WAS SAID AS I CAN GET IT: {{MOMENT}}
WHAT I HAVE THOUGHT ABOUT, READ OR LOOKED UP SINCE, BECAUSE OF THAT MOMENT: {{SINCE}}
ANYTHING I ANSWERED BADLY AND WANT TO CORRECT: {{REPAIR}}
HOW FORMAL THEY WERE, AND WHICH CHANNEL I AM SENDING THIS ON: {{REGISTER}}

First, judge whether this should be sent at all. If the moment I gave you could be pasted into a note to any other interviewer at any other company, return DO NOT SEND and tell me what I should go and remember instead.

If it passes, write one note of 120 words or fewer containing only these parts: a line of thanks with no adjectives in it, the moment referenced closely enough that they know instantly which conversation this was, one or two sentences on what I have thought about since, and, only if I supplied a repair, one sentence fixing it without apologising twice.

Banned outright: really enjoyed, great conversation, excited about the opportunity, passionate, reiterate, touch base, any restatement of my qualifications, and any new argument for hiring me.

After the note, give one line naming the reason this message could not have been sent to anyone else.`,
    variables: [
      {
        token: "MEETING",
        label: "Who you met and how it went",
        example:
          "Second interview, Priya Raman, head of operations, 45 minutes. Warm but brisk. She did most of the talking in the second half.",
      },
      {
        token: "MOMENT",
        label: "The one moment to reference",
        example:
          "She said the depot rota software was bought to fix a scheduling problem and ended up creating a reporting problem nobody owns, and that she was still not sure whether to replace it or accept it.",
      },
      {
        token: "SINCE",
        label: "What you have thought about since",
        example:
          "I went and looked at how our team handled a similar tool we could not remove. We ended up writing a nightly export rather than replacing it, which took two weeks instead of two quarters.",
      },
      {
        token: "REPAIR",
        label: "Anything you answered badly",
        example:
          "I gave a vague answer about headcount I managed. It was six direct reports and four contractors, not about ten people.",
      },
      {
        token: "REGISTER",
        label: "Their formality and your channel",
        example: "First names throughout, email, replying to her own thread rather than a new one",
      },
    ],
    expectedOutput:
      "Either a DO NOT SEND verdict with what to go and recall, or a note under 120 words containing the moment, what you thought about since, an optional correction, and a line proving the message fits nobody else.",
    followUps: [
      "The panel had three people. Write the other two notes without repeating the moment I used in the first.",
      "Cut it to sixty words for a message rather than an email, and tell me which part you dropped.",
      "It has been four days and there is no reply. Tell me whether a second message helps here, and if not, say so plainly.",
    ],
    pitfalls: [
      "A remembered moment that is really a compliment produces a note that flatters. Use something they said about the work, not something they said about you.",
      "The repair field is tempting and frequently a mistake. Correcting a small answer draws attention to it, so only use it when the wrong figure would matter to a decision.",
      "Sending the same note to a whole panel with names swapped is the failure this prompt exists to prevent, and interviewers compare notes more often than candidates assume.",
    ],
  },

  eeat: {
    author: "Deborah Achebe",
    authorCredential:
      "Eleven years in technical recruiting, four of them screening applications for engineering and operations roles.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The do not send verdict is the part hiring people would care about most and the part candidates ignore. Given a moment as thin as we talked about the team culture, Claude Opus 4.5 correctly refused and told me to go and recall something specific. GPT-5.2 wrote a graceful note around it instead until I made the refusal an explicit first step, and its default output still reaches for excited about the opportunity within two lines unless that phrase is banned by name.",
  },

  article: {
    intro: [
      "A thank you note prompt has a very small job and most people give it too large a one. The note is not another chance to make your case. It is a short message that proves you were paying attention to a specific conversation.",
      "Interviewers can tell the difference immediately, because the generic version arrives from everyone. Thanking someone for their time and restating your enthusiasm carries exactly no information, and a note carrying no information is at best neutral.",
    ],

    sections: [
      {
        heading: "One moment, referenced closely",
        body: [
          "The entire note is built on one thing the other person said. Not the subject of the interview, not the company's mission, one moment: a problem they described, a tension they admitted, a decision they were still unsure about.",
          "Referencing one moment from the conversation does two things at once. It proves the note is about this conversation rather than a template, and it puts the interviewer back in the room, which is where any memory of you is stored.",
          "Close is the operative word. Not she mentioned scheduling challenges. The rota software fixed a scheduling problem and created a reporting problem nobody owns. That sentence could not have come from anywhere but the room.",
        ],
      },
      {
        heading: "The hundred and twenty word ceiling",
        body: [
          "The ceiling is doing work that no instruction about tone could do. Under 120 words there is no space for a summary of your background, so the temptation is removed rather than resisted.",
          "It also matches how the note is read. A busy hiring manager reads it on a phone between meetings. Anything that requires scrolling gets filed for later, and later is after the decision.",
        ],
      },
      {
        heading: "Thinking since beats thanking",
        body: [
          "Thanks is the occasion for the note, not the content. The content is the sentence about what you did with what they told you: what you looked up, what it reminded you of, how your old team handled the same thing.",
          "This is the honest answer to what to say in a thank you email after an interview. Not more reasons to hire you, which they have already heard, but evidence that the conversation continued in your head after it ended. That is a small thing and it is genuinely rare.",
          "It also stays inside what you can defend. An ai prompt for a follow up note after an interview that invents enthusiasm produces something the interviewer discounts, whereas a specific two line thought is checkable and characteristic.",
        ],
      },
      {
        heading: "When the thank you note prompt says do not send",
        body: [
          "The first thing the prompt does is decide whether the note should exist. If the moment you supplied could be pasted into a message to any other interviewer, it returns a refusal and tells you what to go and remember instead.",
          "This is uncomfortable and correct. A post interview thank you email with nothing specific in it is not a small positive, it is a demonstration that nothing in the conversation stuck. Better to send nothing, or to go back through your notes until something real surfaces.",
          "In practice the refusal usually means you were not taking notes. Two lines written in the car afterwards, in their words rather than your summary, is the whole preparation this needs.",
        ],
      },
      {
        heading: "Panels, timing and the second message",
        body: [
          "Everyone on a panel gets a different moment or nobody gets a note. Interviewers compare, and three identical messages with the names changed is worse than silence.",
          "On timing, same day or next morning while they can still place you. On a second follow up when there is no reply, the honest position is that it rarely helps and never hurts more than once, so send it if a deadline genuinely changed and not otherwise.",
        ],
      },
    ],

    howTo: {
      name: "How to use the thank you note prompt",
      steps: [
        {
          name: "Write two lines before you leave the car park",
          text: "Their words, not your summary. This is the input the whole note depends on and it decays within about an hour.",
        },
        {
          name: "Do something with the moment",
          text: "Look something up, or recall how you handled the same problem. Ten minutes of actual thought is what makes the second half of the note worth reading.",
        },
        {
          name: "Accept a refusal if you get one",
          text: "A generic thank you note that is not generic in intention is still generic on arrival. Skip it rather than sending filler with your name on it.",
        },
      ],
    },

    faq: [
      {
        question: "Is a thank you note expected, or is it optional?",
        answer:
          "It is expected in some sectors and neutral in others, and nobody has ever been rejected for sending a good one. Treat it as a low cost signal rather than a requirement, which also means a bad one is a real cost rather than a wash.",
      },
      {
        question: "Email or a message on a professional network?",
        answer:
          "Email, in reply to an existing thread if you have one, because it reaches the person who actually holds the decision and it lands in the record the hiring team already shares. A network message is fine when email is the only address you lack.",
      },
      {
        question: "How soon should it go?",
        answer:
          "Within a day, ideally the same afternoon. Not because speed impresses anyone, but because the interviewer is still holding the conversation clearly enough for a referenced moment to work, and a week later it needs explaining rather than recognising.",
      },
      {
        question: "Should I use the note to fix a bad answer?",
        answer:
          "Only when the wrong information would change a decision, such as a misstated number or a system you claimed not to know and then remembered. Reopening a soft answer draws attention to it and reads as anxiety rather than as diligence.",
      },
      {
        question: "What if the interview went badly?",
        answer:
          "Send it anyway if a real moment exists, keep it shorter, and do not audition for a second chance in it. People move roles and companies constantly, and a short honest note is remembered by the same person who interviews you somewhere else in two years.",
      },
      {
        question: "Can I use the same structure for a note after a coffee chat?",
        answer:
          "Yes, and it works better there, since informal conversations produce more specific moments than structured interviews do. Drop the repair section entirely and keep the length even tighter, around sixty words, because nothing formal is at stake.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "Preparation for the conversation that supplies the moment, and the source of most repairs you might want to make.",
      },
      {
        href: "/career-prompts/networking-message-prompt",
        label: "networking message prompt",
        description:
          "The same short form discipline when there was no interview and you are opening a conversation instead.",
      },
      {
        href: "/career-prompts/job-rejection-follow-up-prompt",
        label: "job rejection follow up prompt",
        description:
          "What to send when the answer is no, which is a different message with a different ask.",
      },
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "Turns the two lines you scribbled after the interview into the specific moment this prompt needs.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.prospects.ac.uk/careers-advice/interview-tips",
        label: "Prospects: Interview tips",
        description:
          "A national careers service's guidance on interview follow up, cited for the convention that a note is expected rather than optional in many sectors.",
      },
      {
        href: "https://ocs.yale.edu/",
        label: "Yale Office of Career Strategy",
        description:
          "A university careers office whose published advice is the source for treating specificity, not warmth, as what makes a follow up land.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the banned phrase list and hard length limit techniques that keep the note short and free of stock language.",
      },
    ],
  },
};

export default meta;
