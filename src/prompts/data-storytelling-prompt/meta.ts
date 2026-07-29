import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "data-storytelling-prompt",
  name: "Findings Writer",
  title: "Data Storytelling Prompt",
  category: "data-analysis-prompts",
  taskType: "rewrite",
  summary:
    "Opens with the decision and the confidence behind it, keeps each caveat inside the sentence it limits, and adds no number that was not in your findings.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["communication", "reporting", "stakeholders", "writing"],

  seo: {
    primaryKeyword: "data storytelling prompt",
    keywords: [
      "data storytelling prompt",
      "turning analysis into a narrative for executives",
      "what the data cannot tell you",
      "writing a findings summary from a dataset",
      "ai prompt for presenting results to stakeholders",
      "leading with the decision not the method",
    ],
    seoTitle: "Data Storytelling Prompt: Write Findings Without Overclaiming",
    seoDescription:
      "A data storytelling prompt that leads with the decision, keeps every caveat attached to the claim it limits, and refuses to add a number you did not supply.",
  },

  prompt: {
    text: `You are writing up an analysis for people who will act on it. Your risk is not being boring. Your risk is producing a confident narrative that outruns the evidence, because a well written paragraph is believed more readily than a badly written one.

THE FINDINGS, EACH WITH ITS NUMBER AND BASE SIZE: {{FINDINGS}}
THE DECISION THIS FEEDS AND WHO MAKES IT: {{DECISION}}
CONFIDENCE I HAVE IN EACH FINDING, IN MY OWN WORDS: {{CONFIDENCE}}
WHAT I COULD NOT CHECK OR MEASURE: {{UNKNOWNS}}
FORMAT AND LENGTH LIMIT: {{FORMAT}}

Write it in this order.

1. THE OPENING SENTENCE. State the recommendation and the confidence level in one sentence. Not the background, not the method, not what prompted the work. If the honest recommendation is wait, say wait.

2. THE CASE, THREE POINTS MAXIMUM. Each point carries its own number and its own base size in the same sentence as the claim. Never write a percentage without its denominator nearby.

3. CAVEATS IN PLACE. Attach every limitation to the sentence it limits. Do not collect caveats into a section at the end, because a caveat that has been moved away from its claim has been deleted.

4. WHAT THIS DOES NOT SHOW. A short plain language list of questions this analysis cannot answer, including anyone or anything that was not measured.

5. WHAT WOULD CHANGE THIS. Name the single piece of evidence that would most change the recommendation, and what it would take to get it.

6. METHOD, LAST AND BRIEF. Four lines at most.

CRITICAL: use no number that does not appear in the findings I gave you. Do not write proves, clearly demonstrates, definitively or significant unless I supplied a test result. Where my stated confidence is low, the wording must stay low.`,
    variables: [
      {
        token: "FINDINGS",
        label: "Findings, each with its number and base size",
        example:
          "Weekend appointments no-show at 8 percent against 14 percent weekday, n=1,204 weekend and 9,880 weekday over six months",
      },
      {
        token: "DECISION",
        label: "The decision this feeds and who makes it",
        example: "Whether the operations director extends Saturday clinics to two more sites in October",
      },
      {
        token: "CONFIDENCE",
        label: "Your confidence in each finding, in your own words",
        example:
          "Fairly confident on the no-show gap, much less confident it would hold at sites without on-site parking",
      },
      {
        token: "UNKNOWNS",
        label: "What you could not check or measure",
        example:
          "No data on who was offered a weekend slot and declined, and no cost figures for weekend staffing",
      },
      {
        token: "FORMAT",
        label: "Format and length limit",
        example: "One page email, read on a phone before a Monday meeting",
      },
    ],
    expectedOutput:
      "A first sentence that names the recommendation and its confidence, at most three supported points each carrying a number and a denominator, caveats sitting inside the claims they qualify, and a short honest list of unanswered questions.",
    followUps: [
      "Cut this to five sentences for a message thread without dropping any denominator.",
      "Rewrite the opening sentence three ways at different confidence levels, so I can pick the one that matches what I actually believe.",
      "Someone will ask why we are not acting now. Draft the two sentence answer using only what is in the findings.",
    ],
    pitfalls: [
      "Supplying findings without base sizes produces clean prose full of undenominated percentages, which is the exact output this prompt is meant to prevent.",
      "If you describe your confidence as strong out of habit, the writing will match that rather than the evidence. Use the words you would use privately.",
      "Models still reach for significant as a synonym for large. Search the draft for it and check that a test result exists behind every instance.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Caveats parked in a closing limitations paragraph are the first thing cut when a write up is shortened for a board pack, and models default to that structure every time. Instructing the model to attach each caveat to the sentence carrying the number it qualifies makes the qualification hard to remove, because deleting it breaks the sentence somebody wanted to quote.",
  },

  article: {
    intro: [
      "A data storytelling prompt is the last place an honest analysis usually goes wrong. The work was careful, the caveats were real, and then the summary gets written in the confident register that summaries are written in, and by the time it reaches a decision maker the uncertainty has quietly disappeared.",
      "The failure is structural rather than dishonest. Caveats collected at the end get cut when the document is shortened. Percentages travel without their denominators. A finding described privately as probably true becomes a finding stated flatly, because flat statements are easier to write.",
      "This prompt is arranged against each of those, and the arrangement is most of the value. Decision first, denominators inline, caveats welded to the claims they limit, method last and short.",
    ],

    sections: [
      {
        heading: "Leading with the decision not the method",
        body: [
          "Leading with the decision not the method reverses how analysts naturally write. The instinct is to walk the reader through the work: here is the question, here is the data, here is what I did, and therefore here is what I found. That order is how the thinking happened and it is the wrong order for someone with four minutes.",
          "The opening sentence has to carry the recommendation and the confidence together. Extend Saturday clinics, on reasonably strong evidence from six months at one site is a different instruction from we found a difference in no-show rates, and only the first one tells the reader what is being asked of them.",
          "Method still belongs in the document, at the end, in four lines. Anyone who wants to challenge the analysis will look for it, and anyone who does not was never going to read it in the second paragraph either.",
        ],
      },
      {
        heading: "Caveats belong inside the sentence they limit",
        body: [
          "A limitations section is a place where limitations go to be removed. It survives the full document and disappears from the summary, the slide and the forwarded email, and each of those is closer to the actual decision than the report is.",
          "Attaching the caveat to its claim makes it structurally hard to delete. The gap held across six months at one site, and we have no comparison from sites without parking cannot be trimmed without visibly breaking the sentence. Someone shortening the document has to make a conscious choice rather than a formatting one.",
        ],
      },
      {
        heading: "Writing a findings summary from a dataset without adding to it",
        body: [
          "Writing a findings summary from a dataset invites a model to fill gaps, and it fills them fluently. A missing denominator gets replaced with approximately, a rough figure gets rounded into something cleaner, and an unmeasured comparison gets described as likely. None of that is flagged, because none of it looks like an addition.",
          "The rule that no number may appear unless it was supplied is the single most useful line in the prompt. It also forces a useful discipline upstream: findings pasted without base sizes produce a draft with visible holes, which is a better outcome than prose that reads smoothly and cannot be sourced.",
        ],
      },
      {
        heading: "Turning analysis into a narrative for executives",
        body: [
          "Turning analysis into a narrative for executives is often taken to mean adding drama. What senior readers actually need is fewer claims, each properly supported, with the strength of each one stated. Three points is a limit rather than a target, and two well evidenced points beat five where the reader has to guess which are solid.",
          "The other thing that helps is naming what would change your mind. It signals that the recommendation is a judgement rather than a certainty, and it converts disagreement into a specific request for evidence instead of a general argument about whether the analysis is any good.",
        ],
        list: [
          "One sentence recommendation with its confidence, before anything else.",
          "Every percentage next to the count it came from, in the same sentence.",
          "Caveats inside their claims, never gathered into an appendix.",
          "A plain list of the questions this work cannot answer.",
          "One named piece of evidence that would change the recommendation.",
          "Method at the end, four lines, for the person who wants to argue with it.",
        ],
      },
      {
        heading: "What the data storytelling prompt refuses to write",
        body: [
          "It will not write proves, clearly demonstrates or definitively, and it will not write significant unless you supplied a test result. Those words do a great deal of work in a summary and almost none of it is honest, since they usually mark the point where the writer stopped distinguishing between a pattern and a conclusion.",
          "It also insists on a section called what the data cannot tell you, phrased in plain language rather than methodological hedging. Written properly it prevents the most common downstream misuse, which is a finding about one site being quoted six months later as a statement about the whole organisation.",
          "Used as an ai prompt for presenting results to stakeholders, the output will read as less impressive than the version you would have written unaided. That is the intended trade. The claims that remain are the ones you can still defend when somebody checks them in a meeting.",
        ],
      },
    ],

    howTo: {
      name: "How to use the data storytelling prompt",
      steps: [
        {
          name: "Paste findings with their denominators",
          text: "Every percentage needs its counts. Findings supplied without them produce a draft you cannot source, which is worse than an ugly one you can.",
        },
        {
          name: "Describe your confidence in ordinary words",
          text: "Write what you would say to a colleague, including the hedges. The register of the finished text is set directly by this field.",
        },
        {
          name: "Check the opening sentence against the decision",
          text: "If it does not tell the reader what to do or what to wait for, it has described the analysis rather than answered the question.",
        },
        {
          name: "Try deleting a caveat",
          text: "If a caveat can be removed without breaking its sentence, it is still detachable and will be detached. Ask for it to be rewritten inline.",
        },
      ],
    },

    faq: [
      {
        question: "Does the data storytelling prompt make my write up less persuasive?",
        answer:
          "It makes it less emphatic and usually more persuasive with the people who matter, because stated confidence levels and visible denominators survive scrutiny. What it costs you is the version that reads brilliantly right up until somebody asks how many observations are behind the headline number.",
      },
      {
        question: "Can I use it on someone else's analysis?",
        answer:
          "Yes, and it works well as a review step. Fill the confidence and unknowns fields by asking the analyst directly, since those are the two inputs a reader cannot infer from a finished report and they are the two that set the tone of everything else.",
      },
      {
        question: "What if the recommendation is genuinely to do nothing?",
        answer:
          "Then the opening sentence says wait, and names what you are waiting for. A summary that recommends inaction without saying what would change it reads as indecision, while one that names the missing evidence reads as a plan with a trigger attached.",
      },
      {
        question: "How short can the output be?",
        answer:
          "Five sentences works if every denominator survives the cut. Below that, something has to give, and the first thing to go should be the third supporting point rather than the base sizes or the confidence statement in the opening line.",
      },
      {
        question: "Should the caveats appear in the slide version too?",
        answer:
          "Especially there. Slides are the format most likely to be forwarded without their author, so a claim on a slide needs its denominator and its limitation in the same text box. If it does not fit, the claim is too complicated for a slide.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "Run before writing, so the confidence field reflects a review of the alternatives rather than how the finding feels.",
      },
      {
        href: "/data-analysis-prompts/chart-selection-prompt",
        label: "chart selection prompt",
        description:
          "Picks a figure that supports the sentence you are writing instead of a figure the sentence has to be bent around.",
      },
      {
        href: "/data-analysis-prompts/ab-test-analysis-prompt",
        label: "ab test analysis prompt",
        description:
          "Supplies the verdict vocabulary for experiment write ups, where the temptation to soften an inconclusive result is strongest.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "The longer document a summary feeds into, where options and assumptions get recorded alongside the recommendation.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "PlainLanguage.gov: federal plain language guidelines",
        description:
          "The US government standard for writing that puts the reader's action first, which is the structure behind leading with the recommendation.",
      },
      {
        href: "https://www.ipcc.ch/site/assets/uploads/2017/08/AR5_Uncertainty_Guidance_Note.pdf",
        label: "IPCC: guidance note on communicating uncertainty",
        description:
          "A rigorous published scheme for attaching calibrated confidence language to findings, developed for readers who act on the results.",
      },
      {
        href: "https://www.amstat.org/your-career/ethical-guidelines-for-statistical-practice",
        label: "ASA: ethical guidelines for statistical practice",
        description:
          "States the professional obligation to report limitations alongside results rather than separately, which this prompt enforces structurally.",
      },
      {
        href: "https://www.nngroup.com/articles/inverted-pyramid/",
        label: "Nielsen Norman Group: the inverted pyramid",
        description:
          "Reading research showing how little of a document is read past the opening, and why the conclusion has to come first.",
      },
    ],
  },
};

export default meta;
