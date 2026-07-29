import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "parent-communication-prompt",
  name: "Message Home Drafter",
  title: "Parent Communication Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Drafts one message home that separates what was observed from what it might mean, carries a single ask with a date, and flags anything unsafe to put in writing.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["parents", "communication", "pastoral", "safeguarding"],

  seo: {
    primaryKeyword: "parent communication prompt",
    keywords: [
      "parent communication prompt",
      "how to email parents about behaviour",
      "writing home about a pupil's progress",
      "ai prompt for parent teacher emails",
      "keeping observation separate from interpretation",
      "difficult conversations with parents",
    ],
    seoTitle: "Parent Communication Prompt: Facts First, One Clear Ask",
    seoDescription:
      "A parent communication prompt that splits observation from interpretation, carries exactly one ask with a date, and names the lines you should never put in writing.",
  },

  prompt: {
    text: `You are a teacher writing one message to one family about one pupil. The message will be read by somebody who loves this child and may already feel judged by the school.

PUPIL AND YEAR GROUP: {{PUPIL}}
WHAT I OBSERVED, WITH DATES AND COUNTS: {{OBSERVED}}
WHAT THE SCHOOL HAS ALREADY DONE ABOUT IT: {{ALREADY_DONE}}
WHAT I WANT TO HAPPEN NEXT: {{ASK}}
WHAT I KNOW ABOUT THIS FAMILY: {{FAMILY}}
CHANNEL AND LENGTH: {{CHANNEL}}

Rules you may not break.
- Split every claim into OBSERVATION, which is a thing that happened at a time, and INTERPRETATION, which is what I think it means. Interpretation may never be written as fact.
- No adjective about the child's character. Describe the behaviour or the work, never the pupil.
- Exactly one ask. If I gave you three, choose the one that changes the most and tell me which two you dropped.
- The ask carries a date and a named way to respond.
- Say what the school has already tried before saying what the family should try. A message that transfers the problem home without evidence of school effort will be read as a complaint.
- Never speculate about the home, a diagnosis, a sibling or a parent's capacity.

Return.
1. THE MESSAGE, ready to send, in the channel and length I gave you.
2. THE EVIDENCE LINE, the observations you used and the ones you left out.
3. INTERPRETATIONS DECLARED, listed separately, so I can decide whether to voice them at all.
4. THE DEFENSIVE READ, the same message reread by a parent who assumes the school is blaming them, with the two phrases most likely to trigger that and safer replacements.
5. DO NOT PUT IN WRITING, anything in my notes that belongs in a phone call or a meeting instead.`,
    variables: [
      {
        token: "PUPIL",
        label: "Pupil and year group",
        example: "Dominic, Year 8, second set for maths",
      },
      {
        token: "OBSERVED",
        label: "What you observed, with dates and counts",
        example:
          "Homework not submitted on 8, 15 and 22 May. Arrived without equipment four times this half term. Works well in lessons and answered three questions correctly on Tuesday.",
      },
      {
        token: "ALREADY_DONE",
        label: "What the school has already tried",
        example:
          "Two lunchtime catch up sessions, a spare pencil case in my drawer, and a reminder card stuck inside his planner three weeks ago",
      },
      {
        token: "ASK",
        label: "What you want to happen next",
        example:
          "A five minute check of his planner on Sunday evening, so the homework is packed before Monday",
      },
      {
        token: "FAMILY",
        label: "What you know about the family",
        example:
          "Mum works nights and reads messages in the morning. Older brother left the school last year after a difficult exclusion process.",
      },
      {
        token: "CHANNEL",
        label: "Channel and length",
        example: "School app message, under 150 words, first contact this year",
      },
    ],
    expectedOutput:
      "A sendable message under your word limit, a separate list of the observations behind it, interpretations kept out of the message text, a reread from a defensive parent's point of view with safer wording, and a short list of things to say by phone instead.",
    followUps: [
      "Rewrite this as an opening for a phone call, with the first thirty seconds scripted and two likely responses handled.",
      "Give me the follow up message for two weeks later, one version if the ask worked and one if nothing changed.",
      "Translate the message into Polish, keeping the ask and the date exact, and flag anything that does not carry across.",
    ],
    pitfalls: [
      "Typing an interpretation into the observation field is the commonest error. He is not trying is not an observation. Three homeworks missing on named dates is.",
      "Skipping the already done field produces a message that reads as an invoice sent home, and it is the single fastest way to lose a parent who was previously on your side.",
      "The defensive read is not there to soften you. It exists because the phrase we need you to support us at home lands very differently on a parent who has been called in before.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Politeness is what a model reaches for when a message might land badly, so the request the message exists to make ends up under two paragraphs of appreciation and the family reads past it. Capping the message at one ask, carrying a date and a named way to reply, keeps it actionable while observation stays separated from interpretation.",
  },

  article: {
    intro: [
      "A parent communication prompt has one job that no template covers: keeping the difference between what you saw and what you think it means. Almost every message home that goes badly went badly at a sentence where an interpretation was typed as though it were a fact, and the parent read it, correctly, as an accusation.",
      "This prompt splits those two things apart before it writes anything. Observations carry dates and counts. Interpretations come back to you in a separate list, so you can choose whether to voice them, rather than discovering them in a sentence you already sent.",
      "It then caps the message at a single ask with a date, and finishes with a short list of the things in your notes that should be spoken rather than written down.",
    ],

    sections: [
      {
        heading: "The sentence that starts the argument",
        body: [
          "Anyone working out how to email parents about behaviour eventually writes a version of he is choosing not to engage. It feels like a description. It is a claim about a child's intent, made by an adult who saw twelve percent of their week, and it invites a reply defending the child rather than a conversation about the work.",
          "The replacement is duller and much stronger. Three pieces of homework were not submitted, on these dates, and he arrived without a pen four times. Nobody can argue with that, which means the conversation starts where you wanted it to start.",
        ],
      },
      {
        heading: "Keeping observation separate from interpretation",
        body: [
          "Keeping observation separate from interpretation is not a politeness rule. It is what makes the message survive being forwarded, quoted back at a meeting, or read six months later by somebody deciding whether the school acted reasonably.",
          "The prompt therefore returns interpretations to you in their own section rather than deleting them. Your read on why a pupil has gone quiet since February is often the most valuable thing you know. It just should not arrive in writing, unattributed, in paragraph two of a message the family reads on a phone at seven in the morning.",
        ],
        subsections: [
          {
            heading: "When the interpretation is the point of the message",
            body: [
              "Sometimes you do want to say what you think. Say it as yours: my sense is that the maths is fine and the confidence is not. That is an offer of a view, and it can be disagreed with without either of you losing anything.",
            ],
          },
        ],
      },
      {
        heading: "One ask, with a date on it",
        body: [
          "Messages home tend to contain either no request at all or four. Neither produces action. A parent finishing a message about equipment, homework, punctuality and attitude cannot tell what you want by Friday, so nothing changes and the next message is longer.",
          "The prompt forces a single ask, gives it a date, and tells you which requests it dropped so you can decide whether it chose the right one. Small and dated beats comprehensive: a planner checked on Sunday evening is a thing that can actually happen in a house.",
        ],
      },
      {
        heading: "What the parent communication prompt keeps out of writing",
        body: [
          "The last section of the output is the one people did not expect. Ask an ai prompt for parent teacher emails to draft a message and it will happily commit to writing a suspicion about a diagnosis, a comment about an older sibling or a guess about what happens at home. All three belong in a phone call at most, and some belong nowhere.",
          "The rule is simple enough to apply without the prompt. If a sentence would embarrass you when read aloud by somebody else in a meeting you are not in, it does not go in a message. The output just makes that judgement before you are tired at half past five.",
        ],
      },
      {
        heading: "Reading it as the parent will read it",
        body: [
          "Difficult conversations with parents rarely turn on the facts. They turn on whether the family believes the school has already tried something. A message that lists a pupil's failings and then asks for support at home reads as a transfer of responsibility, however warmly it is phrased.",
          "So the draft states what the school did first: the catch up session, the spare equipment, the reminder card. Then the defensive read shows you the same text through the eyes of somebody who has been called in before, and names the two phrases most likely to land badly. It is usually we need you to and I am sure you are aware.",
        ],
      },
      {
        heading: "Good news home is a different job, not a lighter one",
        body: [
          "Writing home about a pupil's progress when things have gone well is worth more than most schools act as though it is, and it is still worth doing carefully. Praise that names a specific thing the pupil did lands. Praise that says he has been a pleasure lately says nothing and is usually read as a preamble.",
          "Run the same prompt with the observation field full of good evidence and the ask set to nothing more than tell him I said so. The structure holds, and the message takes ninety seconds.",
        ],
      },
    ],

    howTo: {
      name: "How to use the parent communication prompt",
      steps: [
        {
          name: "Fill the observation field with dates and counts",
          text: "Anything without a date or a number is probably an interpretation. Put it in the notes and let the prompt sort it into the right section.",
        },
        {
          name: "List what the school has already done",
          text: "Two lines is enough. This is the field that decides whether the message reads as partnership or as a bill.",
        },
        {
          name: "Say what you know about the family",
          text: "Working patterns, reading language, previous history with the school. It changes the channel, the length and the opening sentence more than anything else you type.",
        },
        {
          name: "Read the defensive version before the draft",
          text: "Start at section four. If the flagged phrases are in your draft, the fix takes ten seconds. If you read the polished message first you will send it.",
        },
        {
          name: "Move anything on the do not write list to a call",
          text: "Then actually make the call. The list is only useful if the content goes somewhere rather than getting dropped for being awkward.",
        },
      ],
    },

    faq: [
      {
        question: "Is it appropriate to use a parent communication prompt for safeguarding matters?",
        answer:
          "No. Anything with a safeguarding dimension goes through your designated lead and your recording system, not through a model and not into an email. Use this for ordinary academic and behavioural contact, and stop the moment the content moves into disclosure territory.",
      },
      {
        question: "Will parents be able to tell the message was drafted with a model?",
        answer:
          "They will if you send it unedited, because the register drifts formal and the sentences are too even. Cut the opening pleasantry, put one concrete detail in that only you would know, and it reads as you. That edit takes about thirty seconds.",
      },
      {
        question: "How long should a message home actually be?",
        answer:
          "Under 150 words for a first contact and under 100 for a follow up. Most families read on a phone between other things, and a long message about a small problem signals that the problem is large, which starts a conversation you did not intend to start.",
      },
      {
        question: "What do I do when the parent replies angrily?",
        answer:
          "Move to a phone call and do not reply in writing while annoyed. Use the follow up prompt to script the first thirty seconds, lead with the observation rather than the interpretation, and ask what they are seeing at home before you restate the ask.",
      },
      {
        question: "Can I send the same message to several families?",
        answer:
          "Only for genuinely generic information such as a trip or a deadline. The value here comes from dates and counts specific to one child, and a message that could apply to anyone teaches families to skim everything the school sends.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description:
          "The same evidence, written for the pupil rather than the family, with a next step instead of an ask.",
      },
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "When the ask home is about revision, send the plan with the message so the request is concrete.",
      },
      {
        href: "/education-prompts/lesson-differentiation-prompt",
        label: "lesson differentiation prompt",
        description:
          "The school side of the already done field: what you changed in the lesson before you wrote home.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "For recording what was agreed at a parents meeting in a form both sides would recognise later.",
      },
    ],

    externalLinks: [
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/supporting-parents",
        label: "Education Endowment Foundation: Working with parents",
        description:
          "Reviews the evidence that specific, small and dated requests to families outperform general appeals for support.",
      },
      {
        href: "https://www.gov.uk/government/publications/keeping-children-safe-in-education--2",
        label: "Keeping children safe in education",
        description:
          "The statutory guidance behind the rule that safeguarding content leaves this workflow entirely and goes to the designated lead.",
      },
      {
        href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/",
        label: "Information Commissioner's Office: UK GDPR guidance",
        description:
          "Sets out why speculation about a child or family in a written record carries obligations, which is the basis of the do not write list.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the classification before generation pattern used to sort claims into observation and interpretation.",
      },
    ],
  },
};

export default meta;
