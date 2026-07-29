import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "writing-feedback-prompt",
  name: "Reading Trace",
  title: "Writing Feedback Prompt",
  category: "writing-prompts",
  taskType: "evaluate",
  summary:
    "Reads your draft once as a named reader and reports where they got lost, bored or sceptical, the paragraph they would have abandoned, and the first sentence they refused to believe.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["feedback", "critique", "drafting", "revision"],

  seo: {
    primaryKeyword: "writing feedback prompt",
    keywords: [
      "writing feedback prompt",
      "reader reaction rather than line edits",
      "ai prompt for critiquing a draft",
      "where a reader stops believing an argument",
      "getting honest feedback on your writing",
      "finding the point a reader gives up",
    ],
    seoTitle: "Writing Feedback Prompt: Where The Reader Gave Up",
    seoDescription:
      "A writing feedback prompt that reads your draft as one named reader, then reports the drop off paragraph, the first sentence disbelieved and the unanswered question.",
  },

  prompt: {
    text: `You are reading this draft once, at normal speed, as one specific reader. You are not an editor. You may not propose a single replacement sentence.

DRAFT: {{DRAFT}}
THE READER I WANT YOU TO BE: {{READER}}
WHY THEY OPENED IT, AND WHAT WOULD MAKE THEM CLOSE IT: {{STAKES}}
WHAT I BELIEVE THIS PIECE ACHIEVES: {{MY_CLAIM}}

First, a reading trace. Go through the draft in order, one entry per paragraph, recording only your state as a reader: WITH YOU, LOST, BORED, DOUBTING, RESISTING or INTERESTED, plus one clause saying why. Say nothing about writing quality, word choice or structure.

Then four verdicts.

DROP OFF. The paragraph number where this reader would have stopped, and what they went and did instead. If they would have finished, say so and name the paragraph that came closest to losing them.

BELIEF BREAK. Quote the first sentence you did not accept. Say whether it failed because evidence was missing, because it claimed more than it showed, or because it contradicts something this reader already holds to be true.

UNANSWERED. The question this piece raises in the reader's head and never comes back to.

SO WHAT. In one sentence, what this reader would say the piece was about if asked an hour later, and whether that matches what I claimed it achieves.

Never suggest wording, never rewrite, never offer a fix. Where you feel the pull to give advice, describe the problem instead and stop.`,
    variables: [
      {
        token: "DRAFT",
        label: "The draft to read",
        example:
          "Paste the full 1,200 word argument that your team should stop running weekly releases and move to a monthly train.",
      },
      {
        token: "READER",
        label: "The reader you want them to be",
        example:
          "An engineering director who has been at the company nine years, was in the room when weekly releases were introduced, and generally reads to the end of things she disagrees with.",
      },
      {
        token: "STAKES",
        label: "Why they opened it and what makes them close it",
        example:
          "It was forwarded by a peer with no comment. She would stop reading if it implied the current process was chosen carelessly, or if the first concrete number appeared after four hundred words.",
      },
      {
        token: "MY_CLAIM",
        label: "What you believe the piece achieves",
        example:
          "It shows that release frequency is not the cause of our incident rate and that the real cost is the review queue on Thursdays",
      },
    ],
    expectedOutput:
      "A paragraph by paragraph trace of reader states with short reasons, a numbered drop off point, one quoted sentence where belief failed with the reason it failed, the unanswered question, and a one sentence account of what the piece was about.",
    followUps: [
      "Read it again as someone who agrees with me already and tell me whether the drop off point moves.",
      "Take the belief break sentence and tell me what this reader would need to see before it, without writing that material.",
      "You marked four paragraphs BORED in a row. Tell me what those four have in common as content.",
    ],
    pitfalls: [
      "A reader described by demographics gives you nothing. What they already believe about your subject, and what would make them stop, are the two fields that produce a usable trace.",
      "Do not paste a draft you are still defending in your head. The output is a report on an imagined reading, and the temptation to argue with it wastes the one thing it is good for.",
      "If you leave the claim field blank, the SO WHAT verdict has nothing to be measured against and becomes a summary, which is the least useful line in the whole output.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Banning suggestions was harder than expected. Both models kept slipping into helpfulness, and GPT-5.2 in particular would name a problem and then quietly append a better opening line. Adding the instruction to describe the problem and stop cut most of it. On a piece I had rewritten four times, Claude Opus 4.5 put the drop off at paragraph two and named the reason in six words, which no line level review had ever surfaced.",
  },

  article: {
    intro: [
      "A writing feedback prompt should not mark up your sentences. That is a different job, and running it too early produces a beautifully edited version of a piece that nobody would have read past the second paragraph.",
      "What a writer cannot supply for themselves is the experience of meeting the draft cold. You know what you meant, you know what is coming, and you cannot make yourself not know it. Every reread is contaminated by the version in your head.",
      "So this prompt does not evaluate the writing. It simulates one reader going through it once, records where they were lost, bored or sceptical, and reports the paragraph where they would have stopped.",
    ],

    sections: [
      {
        heading: "A reading trace, not a markup",
        body: [
          "The trace records states rather than judgements: with you, lost, bored, doubting, resisting, interested. One line per paragraph, one clause of reason. Nothing about word choice, nothing about structure, no praise.",
          "Reader reaction rather than line edits is a genuinely different measurement, and the two rarely agree. A paragraph can be well made and boring. A clumsy paragraph can be the most gripping thing on the page because of what it says. Feedback aimed at prose quality systematically misses both cases.",
          "The pattern in the column matters more than any single entry. Four consecutive BORED marks are not four problems, they are one: a stretch of the piece that is doing something the reader did not need done.",
        ],
      },
      {
        heading: "The drop off point is a single number",
        body: [
          "Naming one paragraph is uncomfortable and that is the value. Finding the point a reader gives up gives you somewhere to start, and it is almost never where the writer expects, because writers audit their weakest paragraph rather than their earliest one.",
          "A drop off at paragraph two means nothing after paragraph two exists. The work you did on the ending is currently unread. Nothing else in the feedback matters until that point moves, which makes the number a priority order as well as a diagnosis.",
          "The writing feedback prompt also asks what the reader went and did instead. It sounds like a flourish. It is the difference between abandonment through confusion and abandonment through indifference, and those need opposite repairs.",
        ],
      },
      {
        heading: "Doubt is more useful than confusion",
        body: [
          "Confusion is easy to find and easy to fix. Doubt is where arguments actually die, and it is close to invisible from the inside because you already accept your own premises.",
          "The belief break verdict quotes the first sentence the reader did not accept and classifies the failure into one of three kinds: evidence was missing, the claim outran what had been shown, or it collided with something the reader already believed. Knowing where a reader stops believing an argument tells you which of those three repairs to make, and they are entirely different pieces of work.",
          "The third kind is the one people never diagnose alone. A sentence that reads as obviously true to you can be the exact point at which a reader with nine years of history at your company decides you are not serious, and no amount of rereading will show you that.",
        ],
      },
      {
        heading: "Why the writing feedback prompt may not suggest a sentence",
        body: [
          "The ban on proposing wording is not modesty about the model's abilities. It is there because a suggested sentence ends the diagnosis. Once you have a replacement paragraph in front of you, you start evaluating the replacement, and the original question of why the reader stopped is quietly dropped.",
          "There is also a quality argument. An ai prompt for critiquing a draft that hands back rewritten passages tends to converge everything toward the same fluent middle register, which is how a piece with a voice becomes a piece with none through a series of individually reasonable improvements.",
          "Getting honest feedback on your writing means being told what happened, not being handed a version somebody else would have written. The repair is yours, and it is usually structural rather than verbal anyway.",
        ],
      },
      {
        heading: "Choosing which reader to be",
        body: [
          "One reader, described specifically, beats a general audience every time. The two fields that carry the weight are what this person already believes about the subject and what would make them stop.",
          "Running the same draft as two different readers is where this becomes properly useful. The sceptical insider and the interested outsider produce different drop off points and often different belief breaks, and comparing the two tells you whether you are writing for both or accidentally for neither.",
        ],
      },
    ],

    howTo: {
      name: "How to run the writing feedback prompt",
      steps: [
        {
          name: "Name one real person, then generalise",
          text: "Start from an actual reader you have in mind and remove the identifying details. Invented composite readers come out bland and so does the trace.",
        },
        {
          name: "Write down what you think the piece achieves",
          text: "Before you see any output. This is the claim the SO WHAT verdict gets measured against, and writing it after the fact is worthless.",
        },
        {
          name: "Read the drop off point first",
          text: "Everything after that paragraph is feedback on text this reader never reached. Fix the drop off, then rerun before doing anything else.",
        },
        {
          name: "Group the trace before reacting",
          text: "Count the runs. Three consecutive DOUBTING entries are one problem with three symptoms, and treating them as three separate fixes creates three patches.",
        },
        {
          name: "Sit with the belief break",
          text: "This is the verdict writers argue with, and arguing is the tell. If the sentence needed defending here, it needs support in the draft.",
        },
        {
          name: "Run it again as a second reader",
          text: "Once the first reader finishes the piece, swap in the reader with the opposite starting position and see what the drop off point becomes.",
        },
      ],
    },

    faq: [
      {
        question: "Is a writing feedback prompt worth anything next to a real reader?",
        answer:
          "It is worth less and it is available now. A real reader gives you one honest reaction and you can usually only ask a handful of people before you exhaust their goodwill. Use this to catch the obvious drop off, then spend a real reader on the version that survives it.",
      },
      {
        question: "Why one pass rather than a careful analysis?",
        answer:
          "Because a careful analysis is not what your draft will get. Nobody reads a memo twice before deciding whether to keep reading. The single pass constraint is a deliberate handicap that makes the output resemble the conditions the piece will actually face.",
      },
      {
        question: "What if the trace says WITH YOU the whole way through?",
        answer:
          "Check the reader description first, because an under specified reader agrees with everything. If it holds up on a second run with a more sceptical reader, take the win, then look at the unanswered question, which is often where an otherwise smooth piece is thin.",
      },
      {
        question: "Can it read fiction?",
        answer:
          "Yes, and the states translate reasonably: bored and interested carry most of the load, with belief break becoming the moment a reader stops accepting a character's behaviour. What it cannot do is tell you whether the ending earns anything, since that requires holding the whole shape in mind.",
      },
      {
        question: "Should I run this before or after a line edit?",
        answer:
          "Before, without exception. Line editing is expensive per word and the drop off point frequently means a third of the draft gets cut or restructured. Polishing text you are about to delete is the most common way writers spend a day and end up further behind.",
      },
      {
        question: "Does it handle a piece with several audiences?",
        answer:
          "Only by running it several times, once per audience, which is the honest way. A single trace averaged across three readers describes nobody. Comparing the drop off points across runs often shows that one audience was never going to get past the opening.",
      },
      {
        question: "How do I use the unanswered question?",
        answer:
          "Treat it as a structural note rather than a gap to fill. Sometimes the answer belongs in the piece. Often the question is the thing the piece should have been about, and it arrives as a much better subject than the one you chose.",
      },
      {
        question: "What if I disagree with the drop off paragraph?",
        answer:
          "Read that paragraph out loud to someone who has not seen the draft and watch their face rather than asking for a verdict. Disagreement here is nearly always the author supplying context from memory that the paragraph does not contain on the page.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "The repair for a trace full of LOST entries, where the reader could not follow rather than would not agree.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "Run this afterwards, on the version that survived, once the drop off point has stopped moving.",
      },
      {
        href: "/writing-prompts/headline-writing-prompt",
        label: "headline writing prompt",
        description:
          "For a drop off at paragraph one, which is usually a promise the opening made and did not pay.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "The same principle applied to people: an observed instance beats a general impression of quality.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/",
        label: "Nielsen Norman Group: The F shaped reading pattern",
        description:
          "Eye tracking evidence that readers abandon text early and scan rather than read, which is why the drop off paragraph is the first verdict.",
      },
      {
        href: "https://writing.wisc.edu/handbook/",
        label: "University of Wisconsin Writing Center handbook",
        description:
          "A university writing centre's guidance on responding to drafts, cited for the separation between reader response and correction.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the role assignment and negative constraint techniques the reader persona and the no suggestions rule depend on.",
      },
    ],
  },
};

export default meta;
