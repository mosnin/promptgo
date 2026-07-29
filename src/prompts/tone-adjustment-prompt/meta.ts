import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "tone-adjustment-prompt",
  name: "Register Dial",
  title: "Tone Adjustment Prompt",
  category: "writing-prompts",
  taskType: "rewrite",
  summary:
    "Reads the register you already have against named markers, moves only the dials you asked for, and refuses a tone the content cannot honestly carry.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["tone", "register", "editing", "voice"],

  seo: {
    primaryKeyword: "tone adjustment prompt",
    keywords: [
      "tone adjustment prompt",
      "how to change the tone of a draft",
      "ai prompt for adjusting register",
      "making formal writing sound more human",
      "tone shift without rewriting the content",
      "matching the register of an email to its reader",
    ],
    seoTitle: "Tone Adjustment Prompt: Move Dials, Not Facts",
    seoDescription:
      "A tone adjustment prompt that measures the register you have on named markers, moves only the dials you specify, and refuses a brief the content cannot honour.",
  },

  prompt: {
    text: `You are a register editor. You change how something sounds. You never change what it says.

DRAFT: {{DRAFT}}
WHO IS WRITING TO WHOM, AND WHAT THEY OWE EACH OTHER: {{RELATIONSHIP}}
DIALS TO MOVE: {{TARGET}}
FACTS, FIGURES AND COMMITMENTS THAT MUST SURVIVE WORD FOR WORD: {{FIXED}}

STEP ONE. Score the draft as it stands on five dials, from one to five, and quote the evidence for each score from the text itself. Formality: contractions, latinate or plain word choice, sentence length. Distance: first, second or third person, whether the actor is named or hidden. Certainty: hedges, modal verbs, qualifiers. Warmth: direct address, acknowledgement of the reader's position. Pace: subordination and clause count.

Do not guess at a score. If the evidence for a dial is thin, say so.

STEP TWO. Compare the current scores to the dials I asked you to move. Change nothing on the dials I did not name.

STEP THREE. Before rewriting, check the brief against the content. If the tone I asked for cannot honestly sit on this message, print TONE CONFLICT, name the sentence that clashes, and stop. A warm and upbeat version of bad news is a lie about the news.

STEP FOUR. Rewrite. Then rescore on the same five dials, so I can see what actually moved. Reproduce every fixed item exactly. Do not add reassurance, apology or enthusiasm that was not in the original.`,
    variables: [
      {
        token: "DRAFT",
        label: "The text to adjust",
        example:
          "Please be advised that the Q3 invoice remains outstanding. Settlement is required within seven days to avoid suspension of service.",
      },
      {
        token: "RELATIONSHIP",
        label: "Who is writing to whom, and what they owe each other",
        example:
          "Me, a freelance designer, to a long standing client who pays late but pays. I want the money and I want the next project.",
      },
      {
        token: "TARGET",
        label: "Dials to move",
        example: "Formality from five down to three, warmth from one up to three. Leave certainty alone.",
      },
      {
        token: "FIXED",
        label: "Facts and commitments that must survive word for word",
        example: "Seven days, Q3, suspension of service",
      },
    ],
    expectedOutput:
      "Five scored dials with quoted evidence, an explicit note of which dials were left alone, either a rewrite or a tone conflict refusal, and a second scoring afterwards showing that only the requested dials moved.",
    followUps: [
      "Certainty dropped from four to two and I did not ask for that. Put the hedging back exactly as it was and show me the diff.",
      "Give me the same message at formality two and at formality four so I can hear the difference before choosing.",
      "You raised warmth by adding an apology. Remove it and raise warmth through direct address instead.",
    ],
    pitfalls: [
      "Asking for friendlier without naming a dial gets you all five moved at once, usually including certainty, which is how a firm deadline turns into a suggestion.",
      "The fixed list needs numbers and dates in it. Models paraphrase seven days into shortly more often than they change any other kind of fact.",
      "A tone conflict is information. If the model keeps refusing, the problem is the message rather than its wording, and rewording it is the wrong repair.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "I added the conflict check after watching three models turn a contract termination notice into something that read almost congratulatory. Scoring before and after is what exposed the real problem: every model moved certainty downward whenever I asked for more warmth, so may be delayed became might possibly be delayed. Gemini 3 Pro is the most prone to it. Naming certainty as a dial to leave alone fixes it in one line.",
  },

  article: {
    intro: [
      "A tone adjustment prompt fails in a predictable way. You ask for something warmer, and the model returns warmer, softer, vaguer, longer and slightly less committed to the deadline you set. Four things moved when you asked for one.",
      "Tone is not a single quality, so it cannot be moved as one. The prompt below treats it as five separate dials, scores the draft on each before touching it, and rescores afterwards so you can see exactly what shifted.",
      "It also declines briefs it cannot honour. Some messages will not carry the register requested of them, and a cheerful redundancy notice is not a tone problem solved but a tone problem hidden.",
    ],

    sections: [
      {
        heading: "Tone is five dials, not one adjective",
        body: [
          "Ask ten colleagues what professional sounds like and you get ten drafts with nothing measurable in common. Adjectives such as friendly, confident or human describe an impression, and an impression cannot be checked against the output. Anyone thinking about how to change the tone of a draft needs the impression broken into features that are visible in the text.",
          "Formality, distance, certainty, warmth and pace are those features. Each has physical markers: contractions and word roots for formality, grammatical person for distance, modal verbs and qualifiers for certainty, direct address for warmth, clause count for pace. A score with quoted evidence beside it is arguable in a way that sounds a bit stiff is not.",
        ],
      },
      {
        heading: "Score before you move anything",
        body: [
          "The first step returns nothing but numbers and quotations. That looks like overhead until you notice how often the score contradicts your assumption. Drafts described by their authors as too formal frequently score three out of five on formality and one out of five on warmth, which means the problem was never formality at all.",
          "The rescore at the end serves a different purpose. It is the only cheap way to catch collateral movement, because reading the rewritten text tells you it sounds better without telling you that the hedges have quietly gone. Two columns of numbers make an unrequested change visible in a second, which is the whole reason the tone adjustment prompt ends where it does rather than with the rewrite.",
        ],
      },
      {
        heading: "Why the tone adjustment prompt can refuse",
        body: [
          "The conflict check is the part most versions of this task leave out. A model instructed to make something upbeat will make it upbeat, and the mechanism it reaches for first is the removal of the bad part. Delays become updates to the timeline, cancellations become changes of direction, and the recipient learns nothing until later.",
          "Printing TONE CONFLICT and naming the clashing sentence turns that into a decision you make consciously. Sometimes the brief was thoughtless and you revise it. Sometimes the message itself is the problem and no register will rescue it. Either way, the refusal is more useful than the compliant version would have been.",
        ],
      },
      {
        heading: "Warmth and formality move independently",
        body: [
          "The most common conflation in this work is treating less formal as more human. They are separate dials and they can move in opposite directions. Legal notices are proof: dropping the latinate vocabulary while keeping the reader entirely absent produces something plain, cold and no easier to receive.",
        ],
        list: [
          "Formality lives in word roots, contractions and sentence length.",
          "Warmth lives in whether the reader is addressed and whether their position is acknowledged.",
          "Certainty lives in modals and qualifiers, and it is the dial that moves by accident most often.",
          "Distance lives in grammatical person and in whether the actor behind an action is named.",
          "Pace lives in clause count, and it is the one readers feel without being able to name.",
        ],
      },
      {
        heading: "Register is a relationship, not a house style",
        body: [
          "Any ai prompt for adjusting register needs to know who is writing to whom and what is owed between them. The same sentence is correct from a supplier chasing an invoice and wrong from a bank chasing a mortgage, because the power in the relationship differs and register encodes power.",
          "This is why the relationship field asks for the obligation as well as the parties. Matching the register of an email to its reader depends on whether you need something from them, whether they can refuse, and whether you will need something again next quarter. Making formal writing sound more human is only an improvement when the relationship supports the familiarity you are adding.",
        ],
      },
      {
        heading: "What must survive untouched",
        body: [
          "Every register change is an opportunity for a number to soften. A tone shift without rewriting the content means dates, sums, deadlines and commitments come through the edit character for character, which is exactly the class of detail that paraphrases most easily and matters most when it does.",
        ],
      },
    ],

    howTo: {
      name: "How to use the tone adjustment prompt",
      steps: [
        {
          name: "Run the scoring step on its own first",
          text: "Get the five scores and the evidence before you decide what to change. The reading frequently contradicts the complaint that sent you here.",
        },
        {
          name: "Name dials and directions, never adjectives",
          text: "Formality from four to two beats less stuffy. A number tells the model where to stop, and an adjective does not.",
        },
        {
          name: "Say which dials stay put",
          text: "Certainty in particular. State that it must not move, or a warmer version of your deadline will arrive with the deadline made optional.",
        },
        {
          name: "List the fixed items as they appear",
          text: "Copy the figures and dates in exactly as written. Anything you paraphrase into the field is licence for the model to paraphrase it back out.",
        },
        {
          name: "Read the rescore before the prose",
          text: "Compare the two columns. If a dial moved that you did not name, reject the draft and reissue rather than repairing it by hand, since the same drift will recur.",
        },
      ],
    },

    faq: [
      {
        question: "Can the tone adjustment prompt copy writing I already have?",
        answer:
          "Yes, by scoring a sample first. Paste three paragraphs you consider on target, take the five scores that come back, and use those numbers as the target for the next draft. That converts a vague house style into a specification the model can hit repeatedly.",
      },
      {
        question: "Why does certainty keep dropping when I ask for warmth?",
        answer:
          "Because hedging reads as politeness in most training data, so softening and warming look like the same operation. The rescore catches it and the target field prevents it. Name certainty explicitly as a dial that must hold, every time, even when it feels redundant.",
      },
      {
        question: "Is a score of five on formality ever right?",
        answer:
          "For regulated notices, contracts and anything that may be read in a dispute, yes. High formality signals that the wording has been chosen carefully, which is what a reader needs from a document that binds them. The mistake is applying the same setting to a project update.",
      },
      {
        question: "What should I do with a tone conflict I disagree with?",
        answer:
          "Read the sentence it named. In roughly half of the cases I have seen, the sentence really was carrying news the requested register would obscure. If you still disagree, restate the relationship field, because the check is calibrated on what the two parties owe each other rather than on the words alone.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "Fix comprehension before register. A confusing sentence at the right formality is still confusing.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "When lowering formality also means replacing the vocabulary, not just the contractions.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "The hardest register problem there is, since you are writing to someone who owes you no attention at all.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/tone-of-voice-dimensions/",
        label: "Nielsen Norman Group: The four dimensions of tone of voice",
        description:
          "The research that establishes tone as separable dimensions rather than one quality, which the five dial scoring extends.",
      },
      {
        href: "https://www.gov.uk/guidance/content-design/writing-for-gov-uk",
        label: "GOV.UK: Writing for GOV.UK",
        description:
          "A published register specification written as observable rules, cited for the point that formality and warmth are set separately.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Gemini prompting strategies",
        description:
          "Documents the score then act pattern the first and last steps use to make unrequested changes visible.",
      },
    ],
  },
};

export default meta;
