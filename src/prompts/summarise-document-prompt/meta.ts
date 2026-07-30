import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "summarise-document-prompt",
  name: "Anchored Summary",
  title: "Summarise Document Prompt",
  category: "writing-prompts",
  taskType: "summarise",
  summary:
    "Anchors every line of the summary to a locator in the source, keeps the hedges and conditions attached, and separates what the document claims from what it actually evidences.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["summarising", "reports", "research", "reading"],

  seo: {
    primaryKeyword: "summarise document prompt",
    keywords: [
      "summarise document prompt",
      "how to summarise a long report accurately",
      "ai prompt for condensing a document",
      "ai prompt for extracting key decisions",
      "how to stop ai making things up in a summary",
    ],
    seoTitle: "Summarise Document Prompt: Anchored, Caveats Kept",
    seoDescription:
      "A summarise document prompt that anchors every claim to a locator in the source, keeps the hedges attached, and lists the questions the document never answers.",
  },

  prompt: {
    text: `You are a research assistant summarising a document for someone who will be held responsible for acting on it.

DOCUMENT: {{DOCUMENT}}
THE DECISION THIS SUMMARY HAS TO SUPPORT: {{DECISION}}
LENGTH: {{LENGTH}}
WHAT THE READER ALREADY KNOWS: {{KNOWN}}

Every sentence you write must end with a locator in square brackets: the heading, section number or page it came from. A sentence you cannot anchor does not go in the summary.

Write four parts.

ONE. What the document concludes, in no more than five anchored sentences. Where a conclusion is hedged in the source, carry the hedge across. Likely does not become will. Some evidence suggests does not become shows.

TWO. The evidence behind each conclusion, marked as either DEMONSTRATED, where the document shows its working, or ASSERTED, where it states the point without support. If a claim appears only in the document's own summary or abstract and is not supported in the body, mark it SUMMARY ONLY and say so.

THREE. What the document does not say, limited to questions the stated decision actually needs answered. Do not list every possible gap.

FOUR. Anything that contradicts something else in the same document, with both locators.

Do not add causal links the document does not make. Two findings in adjacent sections are not connected because you placed them next to each other. Omit anything the reader already knows. If the document does not bear on the decision, say that in one line instead of summarising it.`,
    variables: [
      {
        token: "DOCUMENT",
        label: "The document to summarise",
        example:
          "A 48 page vendor security assessment covering data residency, subprocessors, incident history and contractual liability caps",
      },
      {
        token: "DECISION",
        label: "The decision this summary has to support",
        example:
          "Whether we sign a two year contract this quarter or run a three month pilot restricted to non personal data",
      },
      {
        token: "LENGTH",
        label: "Length",
        example: "Under 400 words, and shorter is better if the document supports less",
      },
      {
        token: "KNOWN",
        label: "What the reader already knows",
        example:
          "That the vendor is US based, that we are subject to UK GDPR, and that the incumbent contract ends in March",
      },
    ],
    expectedOutput:
      "Four labelled parts in which every sentence carries a locator, hedged conclusions arrive still hedged, each claim is marked demonstrated, asserted or summary only, and the gaps listed are limited to what the stated decision requires.",
    followUps: [
      "Show me only the ASSERTED and SUMMARY ONLY claims, since those are the ones I would have to take on trust.",
      "Rewrite part one for a reader who has ten seconds, keeping the locators and every hedge exactly as they are.",
      "You listed two contradictions. Quote the surrounding paragraph for each so I can judge whether they really conflict.",
    ],
    pitfalls: [
      "Leaving the decision field vague turns part three into a list of forty things the document does not cover, which is technically true and useless.",
      "Locators degrade over very long inputs. Spot check three of them against the source before you trust any of the others, particularly near the end of the document.",
      "Models drop hedges under length pressure. When the summary reads more confident than the source, the length budget is too tight rather than the model being careless.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "A claim that appears only in a document's own abstract will be repeated by a summariser as though the body supported it, which is how an unevidenced figure travels into a board paper. Anchoring every sentence to a locator and marking claims DEMONSTRATED, ASSERTED or SUMMARY ONLY forces the check. Locator accuracy degrades across very long documents, so split them.",
  },

  article: {
    intro: [
      "A summarise document prompt is judged on what it leaves out, and the standard version leaves out the wrong things. Hedges go first, because they take words and sound weak. Conditions attached to a finding go next. What survives is short, confident and no longer an accurate account of what the document said.",
      "The prompt below fixes this with two mechanisms. Every sentence has to carry a locator back to the source, and every claim has to be labelled by how well the document supports it. Both make the summary checkable in a way that a fluent paragraph is not.",
    ],

    sections: [
      {
        heading: "What a summary is allowed to lose",
        body: [
          "Compression is lossy by definition, so the only real question is what gets discarded. Detail can go. Repetition can go. Background the reader already holds can go, which is why the prompt asks what they know. Qualifications cannot go, because a qualification is not decoration on a finding, it is the boundary of the finding.",
          "This is what makes how to summarise a long report accurately a harder problem than it looks. The sentence the evidence is mixed but suggests a modest effect in older cohorts compresses beautifully into the evidence suggests an effect, and the compressed version is wrong in three separate ways while reading as a faithful precis. A summarise document prompt that discards qualifications is not condensing the report, it is quietly revising its findings.",
        ],
      },
      {
        heading: "Locators make the output checkable",
        body: [
          "Requiring a bracketed heading, section or page after every sentence looks like clutter until the first time you need to verify one line of a forty page summary in front of a room.",
        ],
        subsections: [
          {
            heading: "An unanchored sentence does not get written",
            body: [
              "The instruction is framed as a hard filter rather than a formatting preference. If the model cannot say where a sentence came from, the sentence is excluded. This removes most synthesis, which sounds like a loss and is not, because synthesis across sections is precisely where invented findings appear.",
            ],
          },
          {
            heading: "Verify a sample, not everything",
            body: [
              "Locators are not self validating. What they give you is a cheap audit: pick three at random, check them, and you have a real estimate of the rest. Without them, checking one claim means rereading the document, which is the work you were trying to avoid.",
            ],
          },
        ],
      },
      {
        heading: "Why the summarise document prompt carries the hedges across",
        body: [
          "A summary that keeps the caveats intact is the difference between a useful brief and a liability. Research reports, legal opinions, audits and medical guidance are all written with their uncertainty deliberately encoded in the verbs, and stripping the modal verb is not tightening the prose, it is changing the claim.",
          "The prompt names specific substitutions to block, because a general instruction to preserve nuance has no purchase. Likely does not become will. Some evidence suggests does not become shows. Naming the pairs gives the model something checkable, and it gives you something to check it against.",
        ],
      },
      {
        heading: "What the document claims and what it shows",
        body: [
          "Marking every claim as demonstrated or asserted turns a summary into something closer to an assessment. Long documents contain both in quantity, and the difference is invisible once both have been paraphrased into the same neutral register by the same summariser.",
          "Any ai prompt for extracting key decisions depends on this split. Three asserted findings pointing one way and one demonstrated finding pointing the other is a materially different situation from four findings agreeing, and only the labelled version lets you see which one you are in. The summary only marker is the sharpest of the three, since a claim that appears in an abstract and nowhere in the body is a claim the author chose not to defend.",
        ],
      },
      {
        heading: "Blocking invented connective tissue",
        body: [
          "The characteristic failure of any ai prompt for condensing a document is not fabricated facts. It is fabricated relationships. Two accurate findings from different sections get joined by a because or a therefore that the source never wrote, and the summary now contains an argument the document does not make.",
          "How to stop ai making things up in a summary therefore needs a rule about connectives specifically, not just an instruction to stay faithful. Adjacency in a summary is an artefact of compression. The contradictions section works on the same principle from the other direction, since a document that disagrees with itself in two places will read as coherent once a summariser has smoothed both into a single voice.",
        ],
      },
    ],

    howTo: {
      name: "How to use the summarise document prompt",
      steps: [
        {
          name: "State the decision before the length",
          text: "The decision governs what counts as relevant. Without it the model optimises for coverage, and a summary that covers everything proportionally is a shorter document rather than a brief.",
        },
        {
          name: "Split anything over about thirty pages",
          text: "Run each part with the same decision and length fields, then combine. Locator accuracy falls away on very long inputs and the drop is hard to see from the output alone.",
        },
        {
          name: "Spot check three locators",
          text: "Pick one from the start, one from the middle and one from the last third. If all three land, the rest are probably sound. If the last one misses, split the document further.",
        },
        {
          name: "Read the asserted claims twice",
          text: "These are the points the document expects you to accept without working. If your decision rests on one of them, go to the source and see what is actually there before the decision does.",
        },
      ],
    },

    faq: [
      {
        question: "What if the document has no page numbers or headings?",
        answer:
          "Ask for a quoted anchor of six or seven words instead of a locator. It serves the same purpose, since you can search for it, and it has the added benefit that a fabricated anchor fails the search immediately rather than pointing at a plausible page.",
      },
      {
        question: "Is this useful for meeting transcripts?",
        answer:
          "Partly. The demonstrated and asserted split works well, because people assert far more than they evidence in conversation. The contradictions section is the most valuable part on a transcript, since two people often agree verbally while describing incompatible plans.",
      },
      {
        question: "Why exclude what the reader already knows?",
        answer:
          "Because background is what fills a summary that has nothing to add. Naming the reader's existing knowledge lets the model spend the whole word budget on what is new, and it exposes documents that turn out to contain nothing the reader did not have.",
      },
      {
        question: "How long should the summary be?",
        answer:
          "Shorter than you think, and set by the decision rather than by the source. A forty page report bearing on one procurement choice can often be handled in two hundred words. Scaling length to input length is how briefs become documents nobody reads.",
      },
      {
        question: "Can I trust the contradictions it finds?",
        answer:
          "Verify each one. In testing, roughly two thirds were genuine and the rest were the same point stated at different levels of precision in different sections. Both locators are printed for exactly this reason, so the check takes under a minute.",
      },
      {
        question: "Can the summarise document prompt handle several sources at once?",
        answer:
          "Run them separately and compare the outputs. Combined runs blur the locators between sources, and the interesting result when reading a set of documents is usually where two of them disagree, which only shows up cleanly when each has its own anchored summary.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description:
          "The same refusal to invent, applied at the other end of the process, where the output is a register rather than prose.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "For when the summary is accurate but the source vocabulary makes it unreadable to the person who has to act.",
      },
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description:
          "Where the summary becomes the raw material for something you are writing rather than something you are deciding on.",
      },
    ],

    externalLinks: [
      {
        href: "https://arxiv.org/abs/2005.00661",
        label: "Maynez et al: On faithfulness and factuality in abstractive summarisation",
        description:
          "Measures how often generated summaries contain content unsupported by the source, which is the failure the locator rule is built to expose.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips",
        label: "Anthropic: Long context prompting tips",
        description:
          "Explains the recall behaviour over long inputs behind the advice to split documents and spot check locators near the end.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the structured output and explicit exclusion techniques the four part format depends on.",
      },
    ],
  },
};

export default meta;
