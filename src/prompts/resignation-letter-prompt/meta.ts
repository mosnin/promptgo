import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "resignation-letter-prompt",
  name: "Short Notice",
  title: "Resignation Letter Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Writes the shortest sufficient letter, calculates your last day from your real notice terms, and lists everything you were about to include and should not.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["resignation", "notice period", "handover", "leaving"],

  seo: {
    primaryKeyword: "resignation letter prompt",
    keywords: [
      "resignation letter prompt",
      "how to write a resignation letter",
      "ai prompt for a two week notice letter",
      "resigning without burning a bridge",
      "what to leave out of a resignation letter",
      "handing in notice when you are leaving on bad terms",
    ],
    seoTitle: "Resignation Letter Prompt: Short, Dated, Unquotable",
    seoDescription:
      "A resignation letter prompt that keeps the letter to a record, works your last day out from your real notice terms, and strips every line you would regret.",
  },

  prompt: {
    text: `You are helping me resign. You treat the letter as a permanent record rather than as a message, because it is filed, it outlasts everyone in the conversation, and every sentence in it can be quoted back at me years later.

MY ROLE AND EMPLOYER: {{ROLE}}
MY CONTRACTUAL NOTICE TERMS, WORD FOR WORD IF I HAVE THEM: {{NOTICE_TERMS}}
THE LAST WORKING DAY I WANT: {{DESIRED_LAST_DAY}}
WHY I AM LEAVING, FOR YOUR CONTEXT ONLY: {{REASON}}
WHAT I OWN AND WHAT STATE IT IS IN: {{HANDOVER_MATERIAL}}

Produce three separate outputs.

1. THE LETTER. As short as it can be while remaining unambiguous: that I am resigning, my role, my last working day, and one neutral closing line. Calculate the last working day from my notice terms. If I have not given you the terms, write [DATE UNVERIFIED] rather than guessing a period, and tell me what to check. If my desired date conflicts with my notice, say so and give me the two honest options: serve it, or request a release that may be refused.

2. WHAT I LEFT OUT. List every sentence you removed or declined to write, with one clause on why. Include my reasons for leaving, any feedback, the name of my next employer, gratitude you judge insincere, and any wording that makes the resignation sound negotiable.

3. THE HANDOVER NOTE. From my handover material: what I own, its current state, what breaks first without me, and who needs to know what. Mark anything I have described too vaguely to be useful to a successor.

Never include a grievance in the letter, however restrained. If my reason describes something serious, say plainly that it belongs in a formal process with its own route and that resigning first usually weakens it.`,
    variables: [
      {
        token: "ROLE",
        label: "Your role and employer",
        example: "Senior Account Manager, Northgate Media, reporting to the Client Services Director",
      },
      {
        token: "NOTICE_TERMS",
        label: "Your contractual notice terms",
        example:
          "Contract says one calendar month written notice, running from the date the letter is received. Nine days holiday untaken.",
      },
      {
        token: "DESIRED_LAST_DAY",
        label: "The last working day you want",
        example: "I want to finish on 29 August so I can start the new job on 8 September",
      },
      {
        token: "REASON",
        label: "Why you are leaving, for context only",
        example:
          "Third reorganisation in two years, my accounts were reassigned twice without discussion, and the promotion I was told about in January went to an external hire.",
      },
      {
        token: "HANDOVER_MATERIAL",
        label: "What you own and its current state",
        example:
          "Four accounts, two renewals due in October, the Ferris contract is unsigned and sitting with their legal team, and I am the only person with access to the reporting sheet.",
      },
    ],
    expectedOutput:
      "A letter short enough to read in ten seconds with a dated last working day or an explicit unverified marker, a list of everything that was stripped out and why, and a handover note that names what breaks first without you.",
    followUps: [
      "My notice makes 29 August impossible. Draft the short message asking for a two week release, with no justification and no apology.",
      "They have asked me to put my reasons in writing. What are my actual options here?",
      "Turn the handover note into an agenda for a forty minute session with the person taking over.",
    ],
    pitfalls: [
      "People fill the reason field carefully and then expect it in the letter. It exists so the model can tell you what to keep out, not what to include.",
      "Guessing at notice terms from memory is how a leaving date turns into a dispute. Paste the clause or accept the unverified marker.",
      "The handover note gets skipped because it is not urgent. It is the part your former colleagues will actually remember when someone rings them about you.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "I fed it a genuinely bitter reason to see what would happen. Gemini 3 Pro wrote a paragraph of measured criticism that read beautifully and would have been circulated within a day. The separate what I left out list solved this better than any tone instruction did, because seeing the sentence quarantined and labelled is more persuasive than being told not to write it. Every model guessed a notice period until guessing was forbidden.",
  },

  article: {
    intro: [
      "A resignation letter prompt that returns three paragraphs of gratitude and an explanation of your reasons has produced a document you may come to regret. The letter is filed. It gets read by people you have never met, sometimes years afterwards, and every sentence in it is quotable.",
      "This one writes the short version: your role, your last working day calculated from your actual notice terms, and one neutral line. Everything you want to say belongs in the conversation the day before, where it is not a record.",
      "It also returns a list of what you were about to include and should not, which is usually the more useful of its outputs.",
    ],

    sections: [
      {
        heading: "The letter is a record, not a message",
        body: [
          "Two separate things happen when you resign. One is a conversation with your manager, which is where reasons, feedback and any real warmth belong. The other is a document that enters a file and outlives everybody who was in the room.",
          "Nearly every question about how to write a resignation letter is really a question about what to say in that conversation. Once the two are separated the letter becomes trivial, because it only has to carry the administrative load: state the resignation, state the date, leave no ambiguity about either.",
          "Putting your reasons in writing converts a private view into a permanent record that HR, your manager's successor and a reference checker may all read in turn. There is no upside to it and the downside has no ceiling.",
        ],
      },
      {
        heading: "Work out the date before you write the sentence",
        body: [
          "The most frequent error here is not tone, it is arithmetic. People write four weeks from today without checking whether the contract says a calendar month, whether notice runs from receipt or from month end, or how untaken holiday interacts with the leaving date.",
          "An ai prompt for a two week notice letter will cheerfully invent a notice period, which is why this one refuses to state a last working day without your terms and marks the date unverified when you have not supplied them.",
          "Where your preferred date conflicts with the notice you owe, it says so and gives you two honest options: serve the notice, or ask for a release and accept that it can be refused. Writing a date you are not entitled to is how a clean exit becomes a dispute in week three.",
        ],
      },
      {
        heading: "What to leave out",
        body: [
          "Deciding what to leave out of a resignation letter matters more than choosing what goes in, because on the day you write it the temptation runs in exactly one direction.",
        ],
        list: [
          "Your reasons for going, including the flattering ones about the new job.",
          "Feedback, however constructive, and however warmly you were invited to give it.",
          "The name of your next employer, unless you have already decided to tell everyone.",
          "Gratitude you do not mean, which reads worse than none at all in a document that lasts.",
          "Any conditional phrasing that makes the resignation look negotiable when it is not.",
        ],
      },
      {
        heading: "Using the resignation letter prompt when you are leaving angry",
        body: [
          "Handing in notice when you are leaving on bad terms is where the short letter earns the most. The instinct is to set the record straight, and a paragraph of restrained criticism feels like the grown up version of what you would rather write.",
          "It is not. A grievance belongs in a grievance process, where it has standing and a defined route. In a resignation letter it has neither, and it turns a routine administrative event into a document that gets forwarded. The prompt strips every sentence of that kind, tells you what it took out, and asks whether you intend to raise the matter formally, because that is a separate decision that should not be made in a hurry at eleven at night.",
        ],
      },
      {
        heading: "Leaving well is a two year investment",
        body: [
          "Resigning without burning a bridge has little to do with being pleasant. It is about the handover, the notice served properly, and not saying anything in the final fortnight that becomes the thing people remember about you.",
          "The practical part is the handover note, which the prompt drafts alongside the letter: what you own, what state each thing is in, what breaks first without you, and who now needs to know what. It costs an afternoon and it is the most reliable way to be remembered well.",
          "Two years from now, these are the people a reference checker rings.",
        ],
      },
    ],

    howTo: {
      name: "How to use the resignation letter prompt",
      steps: [
        {
          name: "Tell your manager before anything is written",
          text: "Finding out by email is the injury people remember. The letter follows the conversation on the same day, never the other way round.",
        },
        {
          name: "Read the contract rather than trusting memory",
          text: "Notice length, when it starts, and what happens to untaken holiday. Paste the clause in, because a remembered version is frequently wrong.",
        },
        {
          name: "Send the short letter afterwards",
          text: "Same day, no additions, no reasons. If HR asks for more in writing, that is a decision to take deliberately rather than in the moment.",
        },
        {
          name: "Write the handover note in your first week of notice",
          text: "Not the last. In the final week you are busy, distracted and no longer motivated to document the thing nobody else understands.",
        },
      ],
    },

    faq: [
      {
        question: "Should I say why I am leaving?",
        answer:
          "Say it in the conversation, not in the letter. Your manager is entitled to hear it and often deserves to, but the written version becomes a record read out of context by people who were never part of the discussion and cannot ask you what you meant.",
      },
      {
        question: "What if HR asks me to put my reasons in writing?",
        answer:
          "You are usually free to decline politely, and an exit interview is the more appropriate venue. If you do write something, keep it factual and assume it will be read by your former manager, since in most organisations it eventually is.",
      },
      {
        question: "Can I leave sooner than my notice period allows?",
        answer:
          "Only by agreement. Ask for a release plainly, with no justification attached, and have a fallback start date ready for the new employer. Simply leaving early can breach the contract and it is the fastest way to lose a reference you will want later.",
      },
      {
        question: "Is email acceptable, or does it have to be a signed letter?",
        answer:
          "Email is fine almost everywhere and creates a clean timestamp, which matters because notice often runs from receipt. Check whether your contract specifies a form of written notice, and copy yourself so you hold a record independent of a work account you are about to lose.",
      },
      {
        question: "Can a resignation letter prompt handle a serious workplace problem?",
        answer:
          "No, and it will say so. Where the reason involves discrimination, safety or unpaid wages, resigning first usually weakens your position. Take advice from a union representative or an employment adviser before you hand anything in, because the sequence of events matters a great deal.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/reference-request-prompt",
        label: "reference request prompt",
        description:
          "The colleagues you hand over to properly are the same people you will be asking for a call in two years.",
      },
      {
        href: "/career-prompts/salary-negotiation-prompt",
        label: "salary negotiation prompt",
        description:
          "Your real notice period is a constraint in the offer conversation, so establish it before you promise a start date.",
      },
      {
        href: "/career-prompts/career-change-prompt",
        label: "career change prompt",
        description:
          "If the reason field filled up with push rather than pull, that is worth working through before you resign.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "The feedback you were about to put in the letter is the feedback a manager should already have heard in a review.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gov.uk/handing-in-your-notice",
        label: "GOV.UK: Handing in your notice",
        description:
          "The statutory position on notice periods and what happens if you leave without serving them, which is what the date calculation depends on.",
      },
      {
        href: "https://www.acas.org.uk/notice-periods",
        label: "Acas: Notice periods",
        description:
          "Explains when notice starts, how contractual notice interacts with statutory minimums, and how holiday is treated during it.",
      },
      {
        href: "https://www.dol.gov/general/topic/termination",
        label: "US Department of Labor: Termination",
        description:
          "The equivalent US reference on ending employment, including final pay obligations that differ by state.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the multi part output and explicit refusal instructions that keep the model from inventing a notice period.",
      },
    ],
  },
};

export default meta;
