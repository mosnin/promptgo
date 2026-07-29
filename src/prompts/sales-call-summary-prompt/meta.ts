import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "sales-call-summary-prompt",
  name: "Deal State Logger",
  title: "Sales Call Summary Prompt",
  category: "sales-prompts",
  taskType: "summarise",
  summary:
    "Records how a deal moved rather than what was discussed, separates commitments from enthusiasm, and lists what you are not allowed to claim internally.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["crm hygiene", "pipeline", "deal review", "forecasting"],

  seo: {
    primaryKeyword: "sales call summary prompt",
    keywords: [
      "sales call summary prompt",
      "what changed in the deal since the last call",
      "logging a sales call without inflating it",
      "separating buyer commitments from buyer interest",
      "crm notes a sales manager can trust",
      "ai prompt for post call deal notes",
    ],
    seoTitle: "Sales Call Summary Prompt: Log the Deal, Not the Chat",
    seoDescription:
      "A sales call summary prompt that reports deal movement instead of discussion, quotes every commitment, and blocks the claims your notes cannot support.",
  },

  prompt: {
    text: `You are a deal desk analyst reviewing a recording. You do not care what was discussed. You care about what is now different, what the buyer bound themselves to, and what a forecast reviewer would be misled by.

CALL RECORD: {{TRANSCRIPT}}
DEAL STATE BEFORE THIS CALL: {{PRIOR_STATE}}
WHAT I WANTED FROM THE CALL: {{OBJECTIVE}}

If no prior deal state is supplied, reply only: "No prior state given. Without it this is a set of notes, not a deal update." and stop.

Produce five labelled parts.

PART 1, DELTA. For each of stage, close date, value, economic buyer, next step and known blockers, write the before value, the after value, and the exact sentence from the call that justifies the change. Where the call gives no evidence, write NO CHANGE and leave the prior value alone. Never move a field because the tone of the call was positive.

PART 2, COMMITMENTS AND INTEREST. A statement is a commitment only if the buyer named an action, an owner and a time. Quote each one. Everything else that sounded encouraging goes under INTEREST, with a note that it obliges nobody.

PART 3, BLOCKERS. Each blocker gets an owner, a date it must clear by, and whether that owner is on our side or theirs. Mark anything with no named owner as UNOWNED.

PART 4, DO NOT CLAIM. List the things I would plausibly tell my manager that this call does not support, each phrased as "You cannot say ...". Include the objective above if I did not actually achieve it.

PART 5, FORECAST LINE. One sentence, no adjectives, no verbs like feels or seems, suitable for reading aloud in a pipeline review.`,
    variables: [
      {
        token: "TRANSCRIPT",
        label: "Transcript or your raw notes",
        example:
          "Paste the full recording transcript. Rough notes work if they include what the buyer said rather than your interpretation of it",
      },
      {
        token: "PRIOR_STATE",
        label: "The deal as the CRM has it now",
        example:
          "Stage: evaluation. Close date: 30 November. Value: 60k. Economic buyer: unknown. Next step: security review scheduled. Blockers: no budget line confirmed",
      },
      {
        token: "OBJECTIVE",
        label: "What you set out to get",
        example: "Get the finance director named and a date for the procurement submission",
      },
    ],
    expectedOutput:
      "A field by field delta where every movement carries a quoted justification, quoted commitments kept separate from interest, blockers with owners and dates, an explicit list of claims you cannot make, and one flat sentence for the forecast review.",
    followUps: [
      "Take the UNOWNED blockers and write the single message to the buyer that assigns each one, without sounding like I am allocating them work.",
      "Compare this delta to the previous two calls and tell me which field has now failed to move three times running.",
      "Rewrite the forecast line as my manager would challenge it, then answer the challenge using only the quoted evidence.",
    ],
    pitfalls: [
      "Feed it your own notes rather than a transcript and the delta inherits your optimism, because your notes already recorded interpretation as fact.",
      "The commitment test rejects things that felt like commitments in the room, including a warm we will get this moving. That rejection is the point and it will feel wrong the first few times.",
      "If the objective field is left blank, part four loses most of its bite, since the largest claim a rep tends to overstate is that the call achieved what it was booked for.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Enthusiasm on a call reads to a model as progress, so deals get advanced a stage on friendly tone alone and forecast reviews inherit the error. Forcing the stage delta to quote a sentence for every change makes the evidence checkable. Claude still promotes a strong hint into the commitments list occasionally, so the quote is what to read rather than the label above it.",
  },

  article: {
    intro: [
      "A sales call summary prompt that produces a neat recap of the conversation has solved the wrong problem. Nobody rereads a recap. What the deal needs recorded is narrower and much less comfortable: which fields moved, on what evidence, and what the buyer is now actually on the hook for.",
      "The gap shows up at the end of the quarter, when a pipeline is full of deals whose notes are detailed and whose state is fiction. Every entry was written honestly. Each one just recorded warmth as progress, one call at a time.",
      "So the sales call summary prompt reads the call against the deal as it stood before, refuses to move a field without a quoted sentence, and finishes by listing the things you are not permitted to claim internally.",
    ],

    sections: [
      {
        heading: "A summary of the call is not a summary of the deal",
        body: [
          "The only question a pipeline review actually asks is what changed in the deal since the last call. A recap answers a different question, which is what happened for forty minutes, and the two overlap far less than they appear to.",
          "Structuring the output as a delta against a prior state forces the distinction. Six fields, each either moved with evidence or explicitly unchanged. A call where nothing moved produces a page of NO CHANGE entries, which reads as a failure and is in fact the most useful thing the summary can tell you.",
        ],
      },
      {
        heading: "Commitment has a definition, interest does not qualify",
        body: [
          "Separating buyer commitments from buyer interest is the discipline the whole thing rests on. The test used here is deliberately mechanical: an action, an owner and a time. Missing any one of the three and the statement is interest, however sincerely it was said.",
          "This filters out most of what makes a call feel good. That is exactly right, because encouraging language is cheap for a buyer to produce and expensive for a seller to misread. A buyer who says the team is excited has told you about a mood. A buyer who says they will send it to procurement on Thursday has told you about a deal.",
        ],
        list: [
          "\"I will get you the security questionnaire back by Friday.\" Commitment.",
          "\"We definitely want to move on this in Q1.\" Interest, with no owner and no action.",
          "\"Let me check with Sam about budget.\" Commitment, weak, since the time is missing and should be chased.",
          "\"This is exactly what we have been looking for.\" Interest, and the most dangerous sentence on any call.",
        ],
      },
      {
        heading: "The DO NOT CLAIM block",
        body: [
          "Logging a sales call without inflating it is harder than it sounds, because inflation happens in the retelling rather than in the record. You write accurate notes, then describe the call to your manager in a sentence that goes slightly further than the notes did, and the sentence is what gets remembered.",
          "Part four pre empts that by naming the specific overstatements available to you. Seeing you cannot say the buyer confirmed budget written down, next to a call where the buyer said they would look into budget, closes the gap between the record and the retelling before the retelling happens.",
        ],
      },
      {
        heading: "Blockers need an owner and a date",
        body: [
          "A blocker without an owner is a description of weather. It sits in the notes for three weeks, everyone agrees it is a concern, and nothing about it changes because no human being was ever named as responsible for clearing it.",
          "Marking those as UNOWNED makes the omission visible and gives you an obvious next action. Half the time the correct owner is you, which is uncomfortable and quick to fix. The other half is a conversation with the buyer that should have happened on the call.",
        ],
      },
      {
        heading: "Why the sales call summary prompt records what did not change",
        body: [
          "Most tools report movement and stay silent about stasis, which biases every deal review upward. Three consecutive calls with no change in economic buyer is a pattern worth acting on, and it is invisible if each summary only lists what happened.",
          "The NO CHANGE entries also protect the fields you did not discuss. Without them, a model summarising a call about integrations will quietly restate the close date it inferred, and an inference will have become a record.",
        ],
      },
      {
        heading: "Writing for the forecast review",
        body: [
          "The final line exists because someone will read this aloud in a room, and adjectives do not survive that setting. Banning feels and seems removes the two words that let a rep report a sentiment as a status.",
          "It also gives you crm notes a sales manager can trust, which changes what a review is for. Once the notes stop being advocacy, the meeting stops being an interrogation and turns into a discussion about what would move the field that has not moved.",
        ],
      },
    ],

    howTo: {
      name: "How to log the call",
      steps: [
        {
          name: "Copy the prior state first",
          text: "Paste the six fields exactly as the CRM has them before you touch anything. Doing this after reading the transcript contaminates the baseline.",
        },
        {
          name: "Use the transcript, not your memory",
          text: "Recall reshapes a call within hours in the direction you hoped it went. The record is the only input that has not already been edited.",
        },
        {
          name: "Update only the fields with a quote",
          text: "Copy the delta into the CRM one line at a time. Anything marked NO CHANGE stays untouched, including the ones you feel differently about.",
        },
        {
          name: "Read part four before you speak to your manager",
          text: "Thirty seconds on the forbidden claims, immediately before the conversation where you would have made one, is where this earns its keep.",
        },
      ],
    },

    faq: [
      {
        question: "How is this different from a meeting notes tool?",
        answer:
          "Meeting notes capture decisions, owners and open questions for the people who were in the room. This ignores the conversation as an event and asks a single question about the deal, which is what is now different and on what evidence. The outputs share almost nothing.",
      },
      {
        question: "Can I use this ai prompt for post call deal notes on internal calls too?",
        answer:
          "It works on any call with a prior state and an objective, including internal deal reviews and partner discussions. It fits poorly on calls with no tracked state behind them, such as a first introduction, where there is no baseline for the delta to measure against.",
      },
      {
        question: "What if my company does not use those six fields?",
        answer:
          "Swap them for whichever fields your pipeline review actually inspects. The mechanism is the before value, the after value and the quoted justification, not the specific field names. Keep the count small, since a delta over twenty fields stops being read.",
      },
      {
        question: "Does it handle multi threaded deals with several buyers?",
        answer:
          "Reasonably, provided the transcript identifies speakers. Commitments are attributed to the person who made them, which matters because a commitment from someone without authority is worth logging and worth discounting. Unlabelled transcripts produce vaguer attribution and are worth fixing at the recording stage.",
      },
      {
        question: "Should the do not claim list go in the CRM?",
        answer:
          "No. It is written for you rather than for the record, and pasting it into a shared field turns a private check into a document your manager reads as a confession. Keep parts one to three and five, and read part four yourself.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Sets the objective this measures the call against, and produces the questions whose answers become quoted evidence.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description:
          "Reads a whole sequence of these summaries once the deal is closed, looking for the call where it actually turned.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The right tool when you need decisions and owners for the attendees, rather than a deal state update for the pipeline.",
      },
    ],

    externalLinks: [
      {
        href: "https://aclanthology.org/2020.acl-main.173/",
        label: "Maynez et al: On faithfulness and factuality in abstractive summarisation",
        description:
          "The research showing that summarisation models introduce unsupported content by default, which is why every field change here must quote a sentence.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the quote grounding and labelled section techniques the delta and commitment tests are built from.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Primary reference for supplying prior context as structured input so the model compares against it rather than restating it.",
      },
    ],
  },
};

export default meta;
