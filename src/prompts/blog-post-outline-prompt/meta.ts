import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "blog-post-outline-prompt",
  name: "Outline Architect",
  title: "Blog Post Outline Prompt",
  category: "marketing-prompts",
  taskType: "plan",
  summary:
    "Builds an outline around one argument and marks every section where you personally have to supply something a model cannot.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["content", "blogging", "outlines", "editorial"],

  seo: {
    primaryKeyword: "blog post outline prompt",
    keywords: [
      "blog post outline prompt",
      "ai prompt for structuring an article",
      "how to outline a blog post that ranks",
      "content brief template for writers",
      "outline that marks where expertise is needed",
      "avoiding generic ai written articles",
    ],
    seoTitle: "Blog Post Outline Prompt: One Argument, Marked Gaps",
    seoDescription:
      "A blog post outline prompt that forces a single arguable thesis and marks every section where only your own experience can fill the gap.",
  },

  prompt: {
    text: `You are a commissioning editor. You build outlines that a writer can follow without producing something interchangeable with every other article on the topic.

TOPIC: {{TOPIC}}
WHO IS READING AND WHAT THEY ALREADY KNOW: {{READER}}
WHAT I KNOW THAT MOST WRITERS ON THIS TOPIC DO NOT: {{EDGE}}
TARGET LENGTH: {{LENGTH}}

STEP ONE. Propose three possible theses. A thesis is a sentence someone could disagree with. "A guide to X" is not a thesis. Rank them by how much the reader would have to change their mind, and recommend one.

STEP TWO. Using the recommended thesis, build the outline:

For each section give:
- The heading, written as the specific claim it makes rather than a topic label
- The one point it establishes, in a sentence
- Rough word count
- EVIDENCE NEEDED: what would make this section convincing, and whether that is a public source, a number, or something only I can provide
- [AUTHOR REQUIRED] tag on any section that cannot be written well without my own experience, examples or data

Then add:
- The single strongest counterargument to the thesis, and which section addresses it. Every worthwhile thesis has one. If you cannot find one, the thesis is too safe and you should say so.
- Three things a reader might search for that this outline does NOT cover, so I can decide whether they belong.

Rules: no section called Introduction, Conclusion or Final Thoughts. Every heading must carry meaning read on its own in a table of contents. Do not pad to reach the target length. If the thesis only supports 800 words, say so rather than inventing three more sections.`,
    variables: [
      {
        token: "TOPIC",
        label: "What the article is about",
        example: "Whether small ecommerce shops should run their own returns process or outsource it",
      },
      {
        token: "READER",
        label: "Who is reading and what they know",
        example:
          "Owners doing 200 to 2000 orders a month who already handle returns badly and know it",
      },
      {
        token: "EDGE",
        label: "What you know that most writers do not",
        example:
          "I ran returns for a 900 order a month shop for three years and have the actual per return cost, including the hidden labour",
      },
      {
        token: "LENGTH",
        label: "Target length",
        example: "About 1500 words",
      },
    ],
    expectedOutput:
      "Three candidate theses with a recommendation, then an outline whose headings are claims rather than labels, each with the evidence it needs, plus author required tags, the strongest counterargument and a list of what the outline deliberately leaves out.",
    followUps: [
      "Write section three in full, using only the evidence I listed, and leave a visible gap anywhere you would otherwise guess at a number.",
      "My edge is thinner than I claimed. Rebuild the outline assuming I have no proprietary data, only opinions.",
      "Take the counterargument and expand it into its own section, positioned wherever it does the most good.",
    ],
    pitfalls: [
      "If the edge field is empty, almost every section comes back tagged as author required, which is the honest signal that you are about to write something generic.",
      "Models propose safe theses first. If all three could appear on any competitor blog, ask again and require that at least one be genuinely contestable.",
      "The three uncovered searches at the end tend to reveal that your topic is really two articles. That is usually worth acting on rather than merging.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The author required tag started as a note to myself and turned out to be the most useful thing in the output. Running it across a backlog of twelve planned articles, four came back with every section tagged, which told me those pieces had no reason to exist under our name. The thesis ranking step was added later because all three models default to proposing a survey of the topic when you ask for an angle.",
  },

  article: {
    intro: [
      "A blog post outline prompt usually returns a table of contents: introduction, five topic headings, conclusion. That structure is why so much published content is interchangeable. It organises information without arguing anything, so the resulting article has no reason to exist beyond the fact that the keyword did.",
      "This one starts by making you pick a thesis, meaning a sentence a reasonable person could disagree with. Then it builds the outline around defending that thesis, and marks every section that cannot be written well without something only you have.",
    ],

    sections: [
      {
        heading: "A topic is not an angle",
        body: [
          "Most outlines fail before the first heading because the brief was a topic. Given one, a model produces a survey: definitions, benefits, best practices, common mistakes. Every competitor writing about the same topic gets the same survey, which is precisely why nobody can tell the resulting articles apart.",
          "Any ai prompt for structuring an article that starts from the topic alone will reproduce that survey. A thesis changes what the sections are for. Once the piece is arguing that outsourcing returns is wrong below a certain order volume, each section has a job in that argument, and sections that do not contribute become visibly unnecessary rather than merely long.",
        ],
      },
      {
        heading: "Headings as claims, not labels",
        body: [
          "The rule banning topic label headings does more than it appears to. A heading reading Cost Considerations tells a scanning reader nothing and lets the writer put anything underneath. A heading reading Outsourcing costs more below 500 orders a month commits the section to establishing something specific.",
          "This also has a practical search benefit, because a heading that states a claim matches how people phrase questions far more closely than a two word label does. Anyone thinking about how to outline a blog post that ranks should start here rather than with keyword placement.",
        ],
      },
      {
        heading: "The author required tag",
        body: [
          "This is the part that determines whether the finished article is worth publishing. An outline that marks where expertise is needed does something a plain table of contents cannot: every section is assessed for whether it can be written from public knowledge, and the ones that cannot get tagged with a note on what is missing.",
          "The tags are diagnostic in aggregate. A few of them means you are writing a piece with genuine substance in specific places. All of them means you should not be writing this article yet. None of them means the model believes the entire piece can be assembled from what is already published, which is the definition of content nobody needs.",
        ],
        list: [
          "A number only you have: your costs, your results, your measured outcomes.",
          "An example only you saw: a client situation, a failure, a specific decision and its consequence.",
          "A judgement only you can make: what you would do, stated as a recommendation with your reasoning.",
          "A correction only you would notice: where the conventional advice on this topic is wrong in practice.",
        ],
      },
      {
        heading: "Why the blog post outline prompt insists on a counterargument",
        body: [
          "A thesis with no counterargument is not a thesis, it is a truism dressed up as one, and the outline will produce a piece that argues energetically for something nobody disputes. Requiring the strongest opposing case flushes this out at the planning stage rather than after a draft exists.",
          "Naming which section addresses it also prevents the common structural mistake of leaving the objection to a paragraph near the end, where it reads as an afterthought. The counterargument usually belongs early, immediately after the claim it threatens.",
        ],
      },
      {
        heading: "What the outline deliberately leaves out",
        body: [
          "The final list of three uncovered searches exists because outlines expand under pressure. A writer aware that people also search for a related question will often bolt a section on, and the piece slowly becomes the survey the thesis was meant to replace.",
          "Listing them explicitly turns that into a decision. Sometimes one belongs and the outline improves. More often the list reveals a second article, which is a better outcome than one piece attempting both. This is the mechanism that keeps a content brief template for writers from quietly becoming an everything document.",
        ],
      },
    ],

    howTo: {
      name: "How to use the blog post outline prompt",
      steps: [
        {
          name: "Write down your edge honestly",
          text: "State what you know that most writers on this topic do not. If the honest answer is nothing, expect most sections to come back tagged and treat that as information.",
        },
        {
          name: "Pick a thesis you could be wrong about",
          text: "From the three proposed, choose the one that would require the reader to change their mind. Safe theses produce articles nobody remembers reading.",
        },
        {
          name: "Fill the tagged sections first",
          text: "Write the author required sections before anything else. They are the reason the piece exists, and drafting the easy sections first tends to shape the article around them.",
        },
        {
          name: "Decide on the uncovered searches",
          text: "For each of the three, either add a section or write it down as a future article. Do not leave the decision open until you are mid draft.",
        },
      ],
    },

    faq: [
      {
        question: "What if every section comes back tagged as author required?",
        answer:
          "That means the article depends entirely on your own experience, which is a good thing to know before drafting. Either commit to writing it properly with your own material, or accept that the piece would be generic and spend the time on a topic where you have more to say.",
      },
      {
        question: "Does the blog post outline prompt handle keyword targeting?",
        answer:
          "Not directly, and that separation is deliberate. Choosing a target phrase is a research task with different inputs, and folding it into outlining tends to produce headings written for a crawler that read badly to a person. Do the keyword work first, then bring the chosen angle here.",
      },
      {
        question: "Why are Introduction and Conclusion banned as headings?",
        answer:
          "Because they are labels for position rather than content, and sections named after their position tend to fill with throat clearing. An opening section still exists, it just has to earn a heading that says something, which usually improves what goes underneath it.",
      },
      {
        question: "How does this help with avoiding generic ai written articles?",
        answer:
          "By separating what a model can legitimately draft from what it cannot. The tagged sections are the parts that must come from you, and an article where those sections carry real specifics does not read as generated, regardless of who typed the connecting paragraphs.",
      },
      {
        question: "Can I use it for a piece I am commissioning rather than writing?",
        answer:
          "Yes, and it works particularly well as a brief. The evidence needed lines tell a freelance writer exactly what to ask you for, which removes the usual round of drafts where they guess at internal detail they were never given.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/seo-keyword-research-prompt",
        label: "seo keyword research prompt",
        description:
          "Do this first. Choosing the phrase and the intent is a separate job from deciding what the article argues.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description:
          "For sequencing the articles once several outlines exist, and spotting where two of them are really one piece.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Defines the register the connecting sections should be drafted in so the piece reads as one author.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The same interrogation approach for extracting the specifics an author required section needs from a colleague.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        label: "Google: Creating helpful, people first content",
        description:
          "The primary guidance on originality and first hand expertise, which the author required tag is a direct attempt to operationalise.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the staged output pattern that lets the thesis step complete before the outline is generated.",
      },
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How users read on the web",
        description:
          "The scanning research behind requiring headings that carry meaning when read alone in a table of contents.",
      },
    ],
  },
};

export default meta;
