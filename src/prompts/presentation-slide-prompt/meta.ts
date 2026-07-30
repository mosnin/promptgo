import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "presentation-slide-prompt",
  name: "Assertion Evidence Deck",
  title: "Presentation Slide Prompt",
  category: "design-prompts",
  taskType: "plan",
  summary:
    "Builds a deck where every title is a claim and every slide carries only the evidence for it, with a cut line per slide and a check that the claims form an argument.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["presentations", "slides", "assertion evidence", "storytelling"],

  seo: {
    primaryKeyword: "presentation slide prompt",
    keywords: [
      "presentation slide prompt",
      "how to write slide titles",
      "why one idea per slide matters",
      "what to cut from a slide",
      "speaker notes vs on slide text",
      "structuring a deck for a decision",
    ],
    seoTitle: "Presentation Slide Prompt: Titles That Make A Claim",
    seoDescription:
      "A presentation slide prompt built on assertion evidence: every title is a sentence, every slide carries one visual, and the claims have to form an argument.",
  },

  prompt: {
    text: `You are structuring a deck using the assertion evidence method. Every slide title is a complete sentence making one claim. The body of the slide is only the evidence for that claim. Everything else is cut or moved into the notes.

WHAT I AM PRESENTING: {{TOPIC}}
WHO IS IN THE ROOM AND WHAT THEY CONTROL: {{ROOM}}
THE DECISION I WANT AT THE END: {{DECISION}}
WHAT I HAVE: {{MATERIAL}}
TIME AND SLIDE LIMIT: {{LIMIT}}

Before any slides, write the deck as a numbered list of claims and nothing else. Check that reading those claims in order builds an argument that arrives at the decision. If it does not, reorder them and say what you changed and why.

Then produce each slide with four fields.
TITLE: one sentence under twelve words, containing a verb, making a claim. Never a topic label such as Background, Approach or Results.
EVIDENCE: what appears on the slide. Name the single visual and at most fifteen words of supporting text. If the evidence is a number, say where it came from.
NOTES: what is said aloud and does not appear on the slide.
CUT: what most people would put on this slide that you are deliberately leaving off, and the reason.

Afterwards, list everything in MATERIAL you did not use, and mark each as cut for time or cut because it weakened the argument.`,
    variables: [
      {
        token: "TOPIC",
        label: "What the presentation is about",
        example: "Why we should stop maintaining our second design system and migrate the older product",
      },
      {
        token: "ROOM",
        label: "Who is there and what they can approve",
        example:
          "CTO, VP Product, two engineering directors. The CTO controls headcount, the directors control the roadmap",
      },
      {
        token: "DECISION",
        label: "The decision you want by the end",
        example: "Approval for two engineers for one quarter, and a freeze on new work in the old system",
      },
      {
        token: "MATERIAL",
        label: "Everything you have to draw on",
        example:
          "Component duplication audit, six months of bug data split by system, two engineer interviews, a cost estimate with a wide range",
      },
      {
        token: "LIMIT",
        label: "How long you have and how many slides",
        example: "Twenty minutes with ten of questions, no more than nine slides",
      },
    ],
    expectedOutput:
      "A numbered list of claims that reads as an argument, then slides with sentence titles, one named visual each, notes kept off the slide, an explicit cut per slide, and a list of unused material with reasons.",
    followUps: [
      "Cut the deck to five slides for a fifteen minute slot and tell me which claim I now have to make verbally.",
      "Write the three hardest questions this argument invites and the slide I should have in reserve for each.",
      "Rewrite the claim list assuming the room already agrees with the problem and only disputes the cost.",
    ],
    pitfalls: [
      "A vague decision field produces an informative deck with no ending. If the decision is really let us discuss, say so, and expect the claim check to tell you the argument does not resolve.",
      "Models pad the evidence field back up to three bullets when the material is thin. Thin material is a finding, and it should show up in the unused list rather than as filler.",
      "Titles slip back into labels around slide six. Scan every title for a verb before you build anything.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Slide plans hide their gaps behind confident titles. Listing the single claim each slide has to prove exposes decks where three slides argue cost and none argue risk, which is the objection that then arrives in the room. The cut field is weaker and rarely reports anything the author had not already suspected.",
  },

  article: {
    intro: [
      "A presentation slide prompt that fills bullets is making the deck worse faster. The failure in almost every internal deck is not the writing, it is that the titles are labels: Background, Current State, Options, Next Steps. Read those in sequence and no argument exists, which is why the room asks what you want from them at minute eighteen.",
      "The assertion evidence method fixes it by changing what a title is for. Every title becomes a sentence that makes a claim, and the slide beneath it carries only the evidence for that one claim. Everything else moves into what you say aloud, or it goes.",
      "This prompt adds a step before any of that: it writes the claims as a numbered list first and checks whether reading them in order actually reaches the decision you want.",
    ],

    sections: [
      {
        heading: "Titles carry the argument or nothing does",
        body: [
          "How to write slide titles that assert rather than label comes out of research into technical presentations, and the core finding is unglamorous: audiences retain more when the headline states the point and the body shows the support for it. The label style leaves the point unstated, so the audience assembles it themselves, and half of them assemble it differently.",
          "The test is mechanical. Read only the titles, in order, and see whether it is an argument. Options and Recommendation is not an argument. Maintaining two systems costs us a release a quarter, followed by Consolidating pays for itself in eight months, is one. If the title has no verb it is not making a claim.",
        ],
      },
      {
        heading: "The body is evidence, and there is one of it",
        body: [
          "Why one idea per slide matters is repeated in every presentation course and almost never enforced, because a slide with room left over invites another point. Restricting the body to the evidence for the title makes the rule self enforcing: a second idea has nowhere to sit, since it is not evidence for this claim.",
          "Naming a single visual per slide has the same effect. One chart, one photograph, one diagram, one table, and at most fifteen words beside it. Where the material cannot supply a visual for a claim, that is worth knowing before you present it rather than after somebody asks how you know.",
        ],
        subsections: [
          {
            heading: "Where the number came from",
            body: [
              "Requiring a source beside every figure is a small rule with a large effect. It catches the estimate that has been repeated so often that nobody remembers it started as a guess in a planning meeting.",
            ],
          },
        ],
      },
      {
        heading: "Two channels, and they should not duplicate",
        body: [
          "Speaker notes vs on slide text is a real decision, not a formatting preference. An audience reading a paragraph is not listening to you say the same paragraph, and the version they retain is whichever finished first.",
          "The split is straightforward once it is explicit. The slide holds what has to be seen: the shape of the data, the comparison, the photograph. The notes hold what has to be heard: the caveat, the anecdote, the reason this number is lower than last quarter. Written as separate fields, the duplication becomes visible immediately.",
        ],
      },
      {
        heading: "Why the presentation slide prompt names a cut on every slide",
        body: [
          "The cut field asks what most people would include here and you are deliberately leaving off. It exists because deciding what to cut from a slide is much easier as a positive instruction than as an act of restraint after the slide already exists.",
          "It also surfaces the habits. Nearly every deck I have run through this loses the same things: a methodology slide nobody asked for, a competitive matrix that argues against its own conclusion, and the agenda slide, which tells an audience what they are about to hear instead of telling them anything.",
        ],
      },
      {
        heading: "A deck that ends in a decision",
        body: [
          "Structuring a deck for a decision starts by naming the decision before the slides exist. The claim check then has something to test against, and it will tell you when the argument does not arrive: two claims establishing a problem, none establishing that this solution is the right size for it.",
          "The unused material list at the end is the other half of that discipline. Material cut for time can come back in the appendix. Material cut because it weakened the argument needs a decision from you rather than from the model, because sometimes the honest answer is that the argument is weaker than you wanted and the deck should say so.",
        ],
      },
    ],

    howTo: {
      name: "How to run the presentation slide prompt",
      steps: [
        {
          name: "Write the decision as an ask",
          text: "Name what you want approved, by whom, with numbers. Two engineers for one quarter beats support for the migration in every respect.",
        },
        {
          name: "Check the claim list before the slides",
          text: "Read the numbered claims alone. If they do not build to the decision, fix the order there, where changing your mind costs nothing.",
        },
        {
          name: "Scan every title for a verb",
          text: "A title without a verb is a label, and labels are how a deck reverts to the format this method exists to replace.",
        },
        {
          name: "Move duplication into the notes",
          text: "Anything appearing both on the slide and in what you plan to say belongs in one place. Choose the channel and delete the other copy.",
        },
      ],
    },

    faq: [
      {
        question: "Does the presentation slide prompt work for conference talks?",
        answer:
          "It works better for internal decks aimed at a decision. A conference talk can end in a shift of understanding rather than an approval, so set the decision field to the belief you want the audience to leave holding, and the claim check still applies.",
      },
      {
        question: "What if my organisation requires an agenda slide?",
        answer:
          "Keep it and treat it as overhead rather than as part of the argument. The claim check should run on the substantive slides only, otherwise a required template slide with no verb in its title will be reported as a break in the argument every time.",
      },
      {
        question: "Are sentence titles not too long for a slide?",
        answer:
          "Under twelve words fits comfortably on two lines at a readable size, which is why the limit is set there. Titles that will not compress usually contain two claims, and splitting them into two slides is the correct response rather than shrinking the type.",
      },
      {
        question: "How many slides for twenty minutes?",
        answer:
          "Eight to ten with this structure, since each one carries a claim that needs a minute or two of narration. Decks that run to thirty slides in the same slot are usually reading their bullets aloud, which the split between slide and notes is designed to prevent.",
      },
      {
        question: "Can it work from rough notes rather than finished analysis?",
        answer:
          "Yes, and the unused material list becomes the most valuable output. It shows which of your rough points could not be turned into a claim, which is normally a sign the analysis behind them is not finished rather than a sign they are unimportant.",
      },
      {
        question: "Should the visual be specified this early?",
        answer:
          "Naming it, yes. Building it, no. Knowing that slide four needs a comparison of bug rates between two systems tells you whether you have the data, and that is the question worth answering before anyone opens a charting tool.",
      },
      {
        question: "What about a deck that gets read rather than presented?",
        answer:
          "A document is usually better, and if the format is fixed then the notes have to move onto the slide. Say so in the prompt, since the split between seen and heard is the assumption the whole structure rests on and it does not survive a deck read alone.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/wireframe-planning-prompt",
        label: "wireframe planning prompt",
        description:
          "The same ordering discipline applied to a screen, where the cut line does what the claim check does here.",
      },
      {
        href: "/design-prompts/design-critique-prompt",
        label: "design critique prompt",
        description:
          "Useful on the slide you are least sure about, since a slide has a hierarchy and one element is damaging it.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "Often the better format outright, particularly when the deck will be read rather than presented in a room.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gsa.gov/technology/government-it-initiatives/section-508-accessibility/create-accessible-digital-products/create-accessible-presentations",
        label: "GSA: creating accessible presentations",
        description:
          "Government guidance on slide structure and reading order, which constrains how much text a slide can carry.",
      },
      {
        href: "https://dl.acm.org/doi/10.1145/1621995.1622013",
        label: "ACM Digital Library: research on slide design and comprehension",
        description:
          "Peer reviewed evidence that sentence headlines with supporting visuals improve retention over topic and bullet formats.",
      },
      {
        href: "https://www.energy.gov/eere/communicationstandards/presentation-standards",
        label: "US Department of Energy: presentation standards",
        description:
          "A published institutional standard that mandates assertion style headlines, useful as precedent for the title rule.",
      },
    ],
  },
};

export default meta;
