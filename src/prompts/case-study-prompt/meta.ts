import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "case-study-prompt",
  name: "Customer Story Extractor",
  title: "Case Study Prompt",
  category: "marketing-prompts",
  taskType: "extract",
  summary:
    "Sorts every claim into on record, measured or inferred, writes each number twice, and hands you the approval questions the customer has to answer.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["case studies", "customer stories", "proof", "content marketing"],

  seo: {
    primaryKeyword: "case study prompt",
    keywords: [
      "case study prompt",
      "customer case study with approved metrics",
      "how to write a case study from an interview",
      "getting quotes approved by a customer",
      "anonymous case study without naming the client",
      "b2b case study structure that converts",
    ],
    seoTitle: "Case Study Prompt: Numbers the Customer Will Approve",
    seoDescription:
      "A case study prompt that separates what the customer said from what you measured, writes each metric twice, and builds the approval pack before you draft.",
  },

  prompt: {
    text: `You are a customer marketing writer who has had three case studies killed in legal review. You now assume every sentence will be read by someone at the customer looking for a reason to say no.

INTERVIEW WITH THE CUSTOMER: {{INTERVIEW}}
NUMBERS FROM OUR OWN SYSTEMS: {{OUR_DATA}}
WHAT THEY SAID ABOUT NAMING AND APPROVAL: {{CONSTRAINTS}}
WHO WILL READ THE FINISHED PIECE: {{AUDIENCE}}

STAGE A, SORT THE CLAIMS. Extract every factual claim from both inputs and tag each one:
ON RECORD, the customer said it, and you quote them word for word.
MEASURED, we observed it in our data and the customer has not confirmed it.
INFERRED, neither of the above.
Every INFERRED claim is deleted from the draft and listed at the end under CUT, with the sentence I would need from the customer to restore it.

STAGE B, EVERY NUMBER TWICE. For each metric write the precise figure and a defensible fallback: a range, a rounded floor, or a relative statement. The fallback exists for the moment their finance team refuses the exact number.

STAGE C, THE DRAFT. Four parts. What their week looked like before, with a dated concrete detail. What actually changed operationally. The number, attributed to whoever produced it. What they would say to a peer who asked. No adjectives about our product anywhere. The customer's language carries the piece.

STAGE D, THE APPROVAL PACK. A numbered list of every quote and every number needing sign off, each phrased as a question the customer can answer yes or no in one pass, with the fallback wording offered underneath.

STAGE E. If naming is restricted, also produce an unnamed version describing the company by attributes, and flag any remaining detail that would identify them anyway.`,
    variables: [
      {
        token: "INTERVIEW",
        label: "The customer conversation",
        example:
          "Transcript of a 40 minute call with the head of operations, including her line about the Monday reconciliation meeting being cancelled",
      },
      {
        token: "OUR_DATA",
        label: "Numbers from your own systems",
        example:
          "Ticket volume down from 340 to 90 a month since March, median resolution 4.1 hours down from 19",
      },
      {
        token: "CONSTRAINTS",
        label: "What they will and will not allow",
        example:
          "Logo allowed, no revenue figures, all quotes to be approved by their comms team, cannot mention the migration failure",
      },
      {
        token: "AUDIENCE",
        label: "Who reads the finished piece",
        example: "Operations directors at 200 to 800 person logistics firms evaluating us against an incumbent",
      },
    ],
    expectedOutput:
      "A tagged claim list with inferred material removed and shown separately, every metric written in a precise and a defensible form, a four part draft carried by quotes, and a numbered approval pack the customer can work through in a single sitting.",
    followUps: [
      "Rewrite the draft assuming they refuse every precise number and we can only use the fallback versions. Is the story still worth publishing?",
      "Turn the approval pack into the email I send their comms team, making the yes or no format obvious without sounding like a legal form.",
      "Pull the three sentences from this that would work as a quote card, using only ON RECORD material.",
    ],
    pitfalls: [
      "The strongest sentence in the draft is often an inferred one, because inference is where writing gets confident. Watch for it appearing in the CUT list and resist restoring it without the quote.",
      "People paste a paraphrased interview. Paraphrase cannot be tagged ON RECORD, so the whole piece degrades to measured claims and the customer's voice disappears.",
      "A fallback number that is barely weaker than the precise one is not a fallback. If the range is 18 to 22 percent, you have not prepared for the refusal, you have restated the figure.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Stage B came from losing six weeks on a finished piece because the customer's finance team would not stand behind a single percentage figure. Writing both versions up front means the refusal costs an email rather than a rewrite. GPT-5.2 produces fallbacks that are too close to the original unless the instruction spells out that a range must be genuinely wider.",
  },

  article: {
    intro: [
      "A case study prompt that produces a polished narrative in one pass has skipped the only difficult part, which is establishing what you are actually allowed to say. The writing is straightforward. Getting a real company to put its name next to a number is not.",
      "Anyone working out how to write a case study from an interview discovers this in review, usually a month after the draft was approved internally. The piece comes back with the metric struck through, the best quote softened into nothing, and a request to remove the sentence that made the story worth reading.",
      "So the case study prompt inverts the order. It sorts every claim by how well supported it is before drafting anything, writes two versions of each number, and produces the approval questions as part of the output rather than as a later problem.",
    ],

    sections: [
      {
        heading: "The number is the case study",
        body: [
          "Strip out the quantified result and what remains is a testimonial with better formatting. A reader in the middle of an evaluation is scanning for one thing, which is evidence that somebody comparable got a specific outcome, and everything else on the page is context around that.",
          "This is why a b2b case study structure that converts puts the number early and attributes it explicitly. An unattributed figure reads as marketing arithmetic. The same figure with a named person and a system behind it is checkable, which is a different category of claim.",
        ],
      },
      {
        heading: "Three tiers of claim, and why they are labelled",
        body: [
          "Sorting claims into on record, measured and inferred sounds bureaucratic until you see how much of a normal draft falls into the third bucket. Phrases like the team was spending most of its week on manual work, which nobody said and nothing measured, but which follows plausibly enough from the interview that it slides in unchallenged.",
          "Those sentences are the ones that get struck in review, and each strike costs a round trip. Cutting them before the draft exists is faster, and the list of what was removed doubles as a short set of follow up questions for the customer.",
        ],
        list: [
          "On record: they said it, you quote it, they will recognise it.",
          "Measured: your systems show it, and the customer has never seen the figure.",
          "Inferred: it follows from the above, which is not the same as being true.",
          "Anything in the third tier is deleted and listed, never quietly softened into the draft.",
        ],
      },
      {
        heading: "Writing every metric twice",
        body: [
          "A customer case study with approved metrics usually arrives at approval with one figure that will not survive. Sometimes it is genuinely commercially sensitive, sometimes a finance team simply will not certify a number they did not calculate, and the reason rarely matters because the answer is the same.",
          "Having a fallback ready converts that from a crisis into a choice. Ninety percent fewer escalations becomes a substantial majority of escalations removed, or a floor of at least two thirds. Weaker, still publishable, and available the same day rather than after another interview.",
        ],
      },
      {
        heading: "The approval pack is part of the deliverable",
        body: [
          "Getting quotes approved by a customer fails most often because of how the request is shaped. Sending a full draft and asking for thoughts invites line editing from three people who were not in the interview, and what comes back is the same story with all the specificity sanded off.",
          "A numbered list of yes or no questions, each with a fallback underneath, is answerable in fifteen minutes by one person. It also makes the scope of the request obvious, which is what stops a comms team treating your draft as an open document.",
        ],
        subsections: [
          {
            heading: "What to ask for, in order",
            body: [
              "Quotes first, since they need the least justification and build momentum. Then the numbers, each with its fallback visible so the answer to a refusal is already on the page. The logo permission goes last, because by then they have agreed to the substance.",
            ],
          },
        ],
      },
      {
        heading: "When the customer cannot be named",
        body: [
          "An anonymous case study without naming the client is worth far more than most marketers assume, provided the attributes are specific. A two hundred person logistics operator running its own warehouse management system tells a reader almost as much as a company name, as long as the operational detail stays intact.",
          "The genuine risk is accidental identification. A named integration, a distinctive market position and a location together identify a company as reliably as a logo does, and the customer who agreed to anonymity did not agree to that. The flagging step exists to catch the combination rather than the individual details.",
        ],
      },
      {
        heading: "What the case study prompt will not invent",
        body: [
          "It will not produce a before state you did not describe. Writers reach for the miserable opening scene because it makes the arc work, and a model will happily supply a chaotic spreadsheet nobody mentioned. If the interview did not cover the before state, the draft says so and the fix is another ten minute call.",
          "It also will not characterise the customer's feelings. Delighted, frustrated and relieved are all inferences unless the person used the word, and a case study where the emotional language is yours rather than theirs reads as ghostwritten, which is precisely what the format is trying to avoid.",
        ],
      },
    ],

    howTo: {
      name: "How to build the story with the case study prompt",
      steps: [
        {
          name: "Record the interview properly",
          text: "Ask for permission and keep a transcript. Notes cannot be quoted, and quotes are the only material that reaches the on record tier.",
        },
        {
          name: "Ask about the before state explicitly",
          text: "People describe their current state fluently and their old one vaguely. Ask what a specific week looked like last year, with a date attached.",
        },
        {
          name: "Pull your own numbers separately",
          text: "Bring system data as its own input rather than mixing it into the interview notes, so the tagging can tell the two sources apart.",
        },
        {
          name: "Send the approval pack before you polish",
          text: "There is no point copy editing a paragraph that may not survive. Get the yes or no answers back, then write the final version.",
        },
        {
          name: "Keep the cut list",
          text: "The inferred claims you removed are the agenda for the next conversation with this customer, and often the outline of a second piece.",
        },
      ],
    },

    faq: [
      {
        question: "How long should the interview be?",
        answer:
          "Forty minutes is usually plenty and thirty can work if you have your own data already. What matters more than length is asking about specific weeks and specific incidents, since general questions produce general answers that cannot be quoted usefully.",
      },
      {
        question: "The customer will not give any numbers at all. Is there still a case study?",
        answer:
          "Sometimes, if the operational change is concrete enough. A cancelled weekly meeting, a role that no longer exists, a process that dropped from four approvals to one. These are checkable and specific even without a percentage, and they often persuade a sceptical reader more than a headline figure does.",
      },
      {
        question: "Can the case study prompt work from a written questionnaire instead of a call?",
        answer:
          "It can, and the output will be poorer. Written answers are shorter, more careful and stripped of the offhand detail that makes a story readable. If a call is impossible, follow the questionnaire with two clarifying questions by email, which recovers some of the specificity.",
      },
      {
        question: "Who at the customer should approve it?",
        answer:
          "The person you interviewed should approve their own quotes, and someone in communications or legal usually has to approve the numbers and the logo. Sending it to both at once tends to work better than sequential review, which turns two sets of edits into four.",
      },
      {
        question: "Should we publish a case study about a customer who later churned?",
        answer:
          "Only with the story updated and their agreement, which is rarely forthcoming. The bigger point is to check before republishing an older piece, because a case study featuring a company that left is the kind of detail a competitor will happily point out to your prospects.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "Where the approved number ends up. A quoted, attributed figure does more work above the fold than any headline you write.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description:
          "Case study interviews are the best source of evidence for testing whether your positioning claim survives contact with a real customer.",
      },
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description:
          "For the moments when the supporting evidence is a customer survey rather than one interview and you need the pattern rather than the quote.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
        label: "FTC: Endorsement guides, what people are asking",
        description:
          "The authoritative guidance on testimonials and typicality of results, which is why every claim has to be traceable to a source rather than implied.",
      },
      {
        href: "https://aclanthology.org/2020.acl-main.173/",
        label: "Maynez et al: On faithfulness and factuality in abstractive summarisation",
        description:
          "The research on models introducing unsupported detail when condensing a source, which is the failure the three tier tagging is built to catch.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the per claim tagging and quote grounding techniques that keep the draft tied to the interview transcript.",
      },
    ],
  },
};

export default meta;
