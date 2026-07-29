import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "demo-script-prompt",
  name: "Demo Sequencer",
  title: "Demo Script Prompt",
  category: "sales-prompts",
  taskType: "plan",
  summary:
    "Maps every screen you plan to show to something the buyer actually said, and puts the rest on a list you are not allowed to open.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["demos", "sales engineering", "discovery", "presenting"],

  seo: {
    primaryKeyword: "demo script prompt",
    keywords: [
      "demo script prompt",
      "demo agenda built from discovery notes",
      "features to cut from a sales demo",
      "how to run a demo that is not a product tour",
      "ai prompt for a software demo walkthrough",
      "sequencing a demo around buyer priorities",
    ],
    seoTitle: "Demo Script Prompt: Show Only What They Asked About",
    seoDescription:
      "A demo script prompt that ties every screen to a quote from discovery, banishes the rest to a do not show list, and builds in the pauses reps skip.",
  },

  prompt: {
    text: `You are a solutions consultant who has watched hundreds of demos fail by showing too much. Your job is to decide what appears on screen and in what order, using only what the buyer told us they care about.

BUYER PRIORITIES, AS QUOTED: {{QUOTES}}
WHAT I COULD SHOW: {{CAPABILITIES}}
MINUTES AVAILABLE: {{MINUTES}}
WHO IS IN THE ROOM: {{ATTENDEES}}

If fewer than two direct quotes are supplied, reply only: "Not enough discovery to build a demo. Go back and get two things they said in their own words." Do not build an agenda from a feature list alone.

Otherwise produce this, and nothing else:

SECTION 1, THE RUNNING ORDER. One row per screen. Each row has: the screen, the exact quote it answers, the attendee it is aimed at, and a minute allocation. Rank rows by how much the quoted priority appeared to matter to them, not by how our product is structured. Reserve at least a quarter of the total minutes for their questions.

SECTION 2, THE OPENING LINE PER SCREEN. For each row, one sentence I say before anything appears, that repeats their own words back and states what they are about to see. No feature names in this sentence.

SECTION 3, DO NOT SHOW. Every capability from my list that no quote supports, with a one line reason. Include anything I am personally proud of that they never mentioned.

SECTION 4, STOP POINTS. After every second screen, give me the question I ask and the instruction to stay silent until they answer.

SECTION 5, THE CUT LINE. If the running order exceeds the minutes available, state which rows get dropped first and why.`,
    variables: [
      {
        token: "QUOTES",
        label: "What they said, word for word",
        example:
          "\"Reconciliation takes my team three days at month end\" and \"I cannot get an audit trail out of the current system without asking IT\"",
      },
      {
        token: "CAPABILITIES",
        label: "Everything you could demonstrate",
        example:
          "Automated matching, audit log export, custom dashboards, mobile approvals, the API, Slack alerts, the new AI categoriser",
      },
      {
        token: "MINUTES",
        label: "Length of the slot",
        example: "40 minutes including questions",
      },
      {
        token: "ATTENDEES",
        label: "Who is attending and why",
        example: "Finance controller who raised both quotes, plus an IT manager attending to check integration risk",
      },
    ],
    expectedOutput:
      "A running order where every row cites the quote it answers, a spoken opening line per screen with no feature names, an explicit do not show list with reasons, scripted stop points, and the order in which rows get cut if you run long.",
    followUps: [
      "The IT manager is the only one who turns up. Rebuild the running order for that audience without adding anything to the do not show list.",
      "Write the thirty second version of this demo, for the moment the buyer says they only have ten minutes after all.",
      "For each row, name the question that would expose the row as a weak fit, and how I answer it honestly.",
    ],
    pitfalls: [
      "Reps paste a paraphrase instead of a quote. Paraphrases quietly encode what you wanted them to say, and the running order then answers your priorities rather than theirs.",
      "The do not show list is where your favourite feature lands, and the temptation to open it mid demo is strong. Everything shown off list costs you time from a screen that was earning attention.",
      "Models under allocate question time unless the quarter reservation is stated as a hard number. Check the minutes actually add up before you rely on the plan.",
    ],
  },

  eeat: {
    author: "Marcus Bell",
    authorCredential:
      "Fifteen years in B2B outbound, most recently running a six person SDR team selling infrastructure software.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Section 3 exists because the first build simply omitted unsupported features, and reps then showed them anyway since nothing had told them not to. Naming the exclusions out loud, with reasons, changed behaviour in a way that silence never did. GPT-5.2 needs the phrase about anything you are proud of, or it only lists the obviously irrelevant items.",
  },

  article: {
    intro: [
      "A demo script prompt is worth having only if it removes things. Ask a model for a demo outline and it will give you a tidy walkthrough of your product, section by section, in the order the product happens to be built. That walkthrough is the demo the buyer sits through politely while waiting for the part that concerns them.",
      "Anyone asking how to run a demo that is not a product tour has already identified the problem and usually attacks it with discipline, which fails around minute twelve. Discipline is the wrong tool. What works is deciding, in writing, before the call, which screens are permitted and which are forbidden.",
      "So the demo script prompt takes direct quotes from discovery and refuses to schedule any screen that no quote supports. Everything else goes on a list with a reason written next to it.",
    ],

    sections: [
      {
        heading: "The product tour is a failure of nerve",
        body: [
          "Showing everything feels safe because it guarantees you covered whatever they cared about. It also guarantees that the part they cared about arrived surrounded by nine parts they did not, at which point their attention has already been spent and the good bit lands on a tired room.",
          "The cost is invisible in the moment. Nobody stops you to say this section is irrelevant. They simply stop leaning forward, and the debrief afterwards produces a vague sense that it went fine.",
        ],
      },
      {
        heading: "Every screen needs a quote behind it",
        body: [
          "A demo agenda built from discovery notes looks nothing like the one your product marketing team ships. It is shorter, the order is strange, and roughly a third of your product does not appear at all. That is the shape of a demo aimed at one buyer rather than at a market.",
          "The quote requirement is deliberately strict about wording. Paraphrases are where the drift happens, because a paraphrase written by the person who wants to show a feature has a way of sounding like a request for that feature. Word for word, with the speaker attached, keeps the mapping honest.",
        ],
        list: [
          "A sentence they said on a call, transcribed. Best input.",
          "A line from their RFP or a written requirement. Good, though often written by someone not in the room.",
          "Something a different person at the account said months ago. Weak, and worth flagging as such.",
          "What you assume a company of their type needs. Not a quote, and the prompt will refuse it.",
        ],
      },
      {
        heading: "The do not show list is the harder output",
        body: [
          "Deciding which features to cut from a sales demo is more difficult than deciding what to include, because the cuts are usually the parts your team is proudest of. The newest capability, the one engineering just shipped, the thing that beats a competitor nobody has mentioned.",
          "Writing them down with a reason does two useful things. It makes the omission a decision rather than an oversight, so you can defend it in the debrief. And it gives you a ready answer if the buyer asks what else there is, which is a much better moment to mention something than minute nine of your own agenda.",
        ],
      },
      {
        heading: "Your architecture is the wrong running order",
        body: [
          "Products are built in layers and demoed in the same layers: set up, then configuration, then the thing that actually saves someone three days a month. Buyers do not experience your product in build order, and sequencing a demo around buyer priorities means the payoff screen frequently comes first, with the plumbing behind it only if there is time.",
          "The prompt ranks by how much a priority appeared to matter, which is a judgement call it makes from your quotes and which you should overrule freely. What matters is that a ranking exists on paper before you open the laptop.",
        ],
      },
      {
        heading: "Where the demo script prompt makes you stop talking",
        body: [
          "Section 4 inserts a question after every second screen and then instructs you to say nothing. This is the part reps delete and then regret, because the silence after a demo question is where you learn whether the screen landed or whether you have been narrating to yourself.",
          "The questions it writes are deliberately not checks on comprehension. Asking whether that makes sense invites a yes. Asking what they would use that for on the month end run invites a description of their actual process, which is worth more than the next two screens.",
        ],
      },
    ],

    howTo: {
      name: "How to build the running order",
      steps: [
        {
          name: "Pull the quotes verbatim",
          text: "Go back to the recording or your notes and copy two or more sentences exactly as spoken, with the name of who said them.",
        },
        {
          name: "List everything you could show",
          text: "Include the features you want to show. The list only works as a filter if the tempting items are on it to be filtered out.",
        },
        {
          name: "Set an honest minute count",
          text: "Use the real slot length, not the booked length. A forty minute call with a hard stop is a thirty two minute demo.",
        },
        {
          name: "Read the do not show list out loud",
          text: "If a cut feels wrong, the fix is a quote from the buyer, not an exception. No quote means it waits for a second call.",
        },
        {
          name: "Rehearse the stop points only",
          text: "You already know the screens. Practise the questions and the silence after them, which is the only part that will feel unnatural live.",
        },
      ],
    },

    faq: [
      {
        question: "What if I have not done discovery yet?",
        answer:
          "Then you cannot build this, and the refusal message says so. A demo without discovery is a broadcast, and the honest options are to book a shorter qualifying call first or to run a generic overview while accepting that it is marketing rather than selling.",
      },
      {
        question: "Is this ai prompt for a software demo walkthrough suitable for a multi stakeholder room?",
        answer:
          "It handles two or three roles well, because each row is aimed at a named attendee and you can see the balance at a glance. Beyond four stakeholders the quotes usually conflict, and the better move is separate short sessions rather than one agenda that half satisfies everybody.",
      },
      {
        question: "The buyer asks to see something on the do not show list. What then?",
        answer:
          "Show it. A request in the room is a stronger signal than anything from a previous call, and it converts an excluded item into a quoted priority on the spot. The point of the list was never to refuse the buyer, only to stop you volunteering.",
      },
      {
        question: "How does the demo script prompt decide what matters most to them?",
        answer:
          "It infers weight from how the quote was phrased and how much of it there is, which is a weak signal and it will get some of them wrong. Treat the ranking as a starting proposal. You were on the call and you know which sentence they said twice.",
      },
      {
        question: "Should I send the running order to the buyer beforehand?",
        answer:
          "Sending the first section works well and quietly demonstrates that you listened, since it quotes them back. Keep sections three and five internal. A published cut list invites a negotiation about the agenda that helps nobody in a forty minute slot.",
      },
      {
        question: "Does this work for recorded demos and self serve walkthroughs?",
        answer:
          "Partly. The quote mapping and the exclusion list transfer directly and improve most recorded demos. The stop points do not, since there is nobody to answer, and you lose the main mechanism for finding out whether the sequencing was right.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "The step that produces the quotes this depends on. Run it first or you will have nothing to build a running order from.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "For what happens at the stop points, when the answer to your question turns out to be a concern rather than a description.",
      },
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "Shares the rehearsal problem. Both work by practising structure rather than memorising a script you then recite.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/short-term-memory-and-web-usability/",
        label: "Nielsen Norman Group: Short term memory and web usability",
        description:
          "The research on how few items a person holds at once, which is the case against showing eleven capabilities in one session.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Prompting strategies",
        description:
          "Primary documentation for the constrained output sections and per row justification format this prompt relies on.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Covers the refusal condition technique used when fewer than two direct quotes are supplied as input.",
      },
    ],
  },
};

export default meta;
