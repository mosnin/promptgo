import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "decision-memo-prompt",
  name: "Decision Memo Writer",
  title: "Decision Memo Prompt",
  category: "business-prompts",
  taskType: "plan",
  summary:
    "Writes the one page memo that forces a decision, including the option you rejected and what would have to be true for you to be wrong.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["memos", "strategy", "decisions", "leadership"],

  seo: {
    primaryKeyword: "decision memo prompt",
    keywords: [
      "decision memo prompt",
      "how to write a one page decision memo",
      "ai prompt for business case writing",
      "template for proposing a decision to leadership",
      "documenting a decision and its assumptions",
      "decision memo prompt for managers",
    ],
    seoTitle: "Decision Memo Prompt: Force A Yes Or A No",
    seoDescription:
      "A decision memo prompt that states the recommendation first, names the rejected options honestly, and lists what would have to be true for it to be wrong.",
  },

  prompt: {
    text: `You are writing a one page decision memo for a busy executive who will read the first paragraph and skim the rest. You are not writing a report and you are not building suspense.

THE DECISION NEEDED: {{DECISION}}
WHO DECIDES: {{AUDIENCE}}
OPTIONS ON THE TABLE: {{OPTIONS}}
WHAT I KNOW: {{EVIDENCE}}
DEADLINE AND WHAT HAPPENS IF WE MISS IT: {{TIMING}}

Write exactly these six parts. The whole memo must fit on one page.

1. THE ASK. One sentence: the specific decision you want, and by when. Not "align on direction". A yes or no must be possible.

2. RECOMMENDATION AND WHY. Your recommended option and the three strongest reasons, in descending order of strength. If reason three is weak, give two.

3. OPTIONS CONSIDERED. Every option including the one recommended, each with its main advantage and the specific reason it was not chosen. Doing nothing must appear as an option with an honest cost, never as a straw man.

4. WHAT WOULD HAVE TO BE TRUE. The two or three assumptions the recommendation depends on. For each, state how confident you are and what evidence would change your mind. This is the section that earns trust, so do not hedge it into vagueness.

5. WHAT WE GIVE UP. The real cost of the recommendation, named. Every genuine decision forecloses something. If you cannot name what this one forecloses, the options are not meaningfully different and you should say so.

6. IF WE DECIDE NOTHING. What happens by default, and who ends up making the decision instead.

Rules: no adjectives in the recommendation. Every number must come from the evidence I gave you, and if a number is needed that I did not supply, write [FIGURE NEEDED] rather than estimating. Do not recommend gathering more data unless you name the specific data, its cost and the date it would arrive.`,
    variables: [
      {
        token: "DECISION",
        label: "The decision needed",
        example: "Whether to keep building our own billing system or move to a third party provider",
      },
      {
        token: "AUDIENCE",
        label: "Who decides and what they care about",
        example: "CTO, who cares most about engineering time and about not being locked in",
      },
      {
        token: "OPTIONS",
        label: "Options on the table",
        example: "Keep building, migrate fully to a provider, or run a hybrid with the provider for new customers only",
      },
      {
        token: "EVIDENCE",
        label: "What you actually know",
        example:
          "Billing has taken 40 percent of two engineers for six months, provider quote is 1.9 percent per transaction, migration estimated at 8 weeks by the team",
      },
      {
        token: "TIMING",
        label: "Deadline and the cost of missing it",
        example: "Need a call by 15 August or we commit another quarter of engineering time by default",
      },
    ],
    expectedOutput:
      "A one page memo opening with a decision that can be answered yes or no, an honest options table including doing nothing, stated assumptions with confidence levels, a named cost, and the default outcome if nobody decides.",
    followUps: [
      "Argue the opposite. Write the strongest honest case for the option I rejected, using only the same evidence.",
      "The CTO's main worry is lock in. Rewrite section four so the assumptions speak directly to that concern.",
      "Cut this to a five sentence message for chat, keeping the ask and the default outcome and dropping everything else.",
    ],
    pitfalls: [
      "If the ask is not answerable with yes or no, nothing else in the memo works. Rewrite it until a one word answer is possible before you read further.",
      "Models write the doing nothing option as an obvious loser. If its cost looks implausibly bad, ask for it again stated fairly, because a rigged comparison is visible to the reader.",
      "The [FIGURE NEEDED] markers are the point rather than an inconvenience. Filling them with estimates before circulating turns a memo into a guess with a decimal place.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The section that changed how these memos landed was what would have to be true. Without it, every draft read as advocacy and executives responded by hunting for the weakness. With the assumptions stated and confidence levels attached, the conversation moved to whether the assumptions held, which is the conversation worth having. Gemini needed the explicit instruction not to hedge, or it produced assumptions so qualified they committed to nothing.",
  },

  article: {
    intro: [
      "A decision memo prompt has one job: produce a document that ends with a decision rather than another meeting. Most internal memos fail at this because they are structured as arguments, building context toward a conclusion, which means the executive reading the first paragraph learns nothing about what is being asked of them.",
      "This one inverts the order. The ask comes first, phrased so that yes or no is a valid response. Then the recommendation, the options including doing nothing, and the assumptions the whole thing rests on. It fits on one page because a second page is where decisions go to be deferred.",
    ],

    sections: [
      {
        heading: "Put the ask first and make it answerable",
        body: [
          "The most common defect in these documents is an ask that cannot be answered. Requests to align on direction, get buy in or discuss the approach all describe a conversation rather than a decision, and they reliably produce one.",
          "Forcing a sentence that can be answered yes or no does more work than any other rule here. It also exposes the cases where the author has not worked out what they want, which is worth discovering before the meeting rather than during it.",
        ],
      },
      {
        heading: "Options considered, honestly",
        body: [
          "Section three is where credibility is won or lost. A memo listing three options where two are obviously bad is transparently a recommendation wearing a comparison as a costume, and experienced readers discount everything else in the document once they notice.",
          "The requirement that doing nothing appear with an honest cost matters most. Inaction is always available and frequently reasonable, and a memo that treats it as a straw man is arguing against the reader's actual alternative. Learning how to write a one page decision memo is mostly learning to state the strongest version of the option you are not recommending.",
        ],
      },
      {
        heading: "What would have to be true",
        body: [
          "This section is the difference between a memo that gets interrogated and one that gets decided. Naming the two or three assumptions the recommendation depends on, with a confidence level and the evidence that would change your mind, does something counterintuitive: it makes the recommendation more persuasive by making it falsifiable.",
          "The reason is that executives are already looking for the weak points. Finding them yourself, first, converts an adversarial reading into a shared assessment. Documenting a decision and its assumptions also leaves something useful behind when the decision is revisited in six months and nobody remembers what it rested on.",
        ],
      },
      {
        heading: "Naming what you give up",
        body: [
          "Every real decision forecloses something, and a memo that presents its recommendation as costless is describing something that is not a decision. The prompt requires the trade to be named, and it will tell you when the options are not meaningfully different, which is a real outcome worth surfacing.",
          "This section is also where the reader's objection usually lives. Naming the cost yourself takes it off the table as a gotcha and turns it into a shared premise, which is the same mechanism the assumptions section relies on.",
        ],
      },
      {
        heading: "The default outcome nobody chose",
        body: [
          "Section six asks what happens if no decision is made. In most organisations the honest answer is that the current path continues and the decision gets made implicitly by whoever is spending the budget in the meantime.",
          "Written down, this is often the most motivating line in the memo, because it reframes deferral as a choice with a cost rather than a neutral delay. A decision memo prompt for managers earns its place mainly here, since the drift it names is the thing a manager can see happening and struggles to articulate.",
        ],
      },
      {
        heading: "Why the decision memo prompt refuses to estimate",
        body: [
          "The [FIGURE NEEDED] convention exists because a plausible invented number is worse than a visible gap. Numbers in a memo acquire authority as they get forwarded, and a model's estimate presented in the same typeface as a measured figure is indistinguishable three forwards later.",
          "Similarly, recommending more research is only permitted when the specific data, its cost and its arrival date are named. Any ai prompt for business case writing that allows an open ended call for further analysis has provided a way to avoid the decision while appearing rigorous.",
        ],
      },
    ],

    howTo: {
      name: "How to use the decision memo prompt",
      steps: [
        {
          name: "Write the decision as a question",
          text: "Phrase it so yes or no answers it. If you cannot, you are not ready to write the memo and the gap is in your thinking rather than the draft.",
        },
        {
          name: "List every option including doing nothing",
          text: "Include the ones you have dismissed. Their honest treatment is what makes the recommendation credible to a reader looking for bias.",
        },
        {
          name: "Separate evidence from belief",
          text: "Put only measured or observed facts in the evidence field. Anything else belongs in the assumptions section where it can carry a confidence level.",
        },
        {
          name: "Fill the gaps before circulating",
          text: "Every [FIGURE NEEDED] marker is a research task. Complete them or send the memo with the markers visible, but never quietly estimate them.",
        },
        {
          name: "Send it before the meeting",
          text: "The memo replaces the presentation. Circulating it a day ahead turns the meeting into a decision rather than a walkthrough of slides.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a decision memo be?",
        answer:
          "One page, and the constraint is doing real work rather than being stylistic. A second page invariably fills with context that supports the author's confidence rather than the reader's decision, and it moves the ask further from the top where it needs to be.",
      },
      {
        question: "What if I do not have a recommendation yet?",
        answer:
          "Then this is not the right document. Write the options and assumptions sections alone and circulate them as a request for input. A memo that presents a decision without recommending one pushes the analytical work onto the person with the least time to do it.",
      },
      {
        question: "Should I really include the option I rejected?",
        answer:
          "Yes, stated at its strongest. Readers who can see you considered the obvious alternative fairly stop looking for what you missed, and the memo becomes a shared assessment instead of something to be audited for bias.",
      },
      {
        question: "Is this a suitable template for proposing a decision to leadership outside my own team?",
        answer:
          "It travels well, with one adjustment. Add a line of context on why this decision reaches them at all, since a reader outside your area lacks the background that makes the ask self explanatory to your immediate manager.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "Where the need for a memo usually surfaces, in the discussed but not decided section of last week's notes.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "Once the decision is made, the recurring parts of carrying it out belong in a written process rather than a memo.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "The same discipline applied externally, where a buyer has to make and justify a decision after leaving your page.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2019/09/why-do-so-many-managers-avoid-giving-praise",
        label: "Harvard Business Review: Research on managerial decision avoidance",
        description:
          "Covers the organisational tendency to defer decisions, which is the behaviour the default outcome section is designed to name.",
      },
      {
        href: "https://www.nist.gov/publications",
        label: "NIST: Risk and assumption documentation practice",
        description:
          "Primary reference for stating assumptions with explicit confidence levels rather than embedding them in prose.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the fixed section and refusal to estimate techniques that keep the memo structure and the figure markers intact.",
      },
    ],
  },
};

export default meta;
