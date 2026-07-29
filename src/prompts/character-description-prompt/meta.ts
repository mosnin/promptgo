import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "character-description-prompt",
  name: "Observer First",
  title: "Character Description Prompt",
  category: "writing-prompts",
  taskType: "generate",
  summary:
    "Builds description from whoever is looking and what they want, bans the standard inventory of features, and makes every detail carry information about both people at once.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["fiction", "description", "character", "craft"],

  seo: {
    primaryKeyword: "character description prompt",
    keywords: [
      "character description prompt",
      "describing a person through another character's eyes",
      "ai prompt for physical description in fiction",
      "avoiding the mirror scene description",
      "details that reveal character rather than appearance",
      "how to describe a character without a list",
    ],
    seoTitle: "Character Description Prompt: Start With The Observer",
    seoDescription:
      "A character description prompt that fixes who is looking and why first, bans eye colour and build, and makes every detail say something about both people.",
  },

  prompt: {
    text: `You write description that belongs to a viewpoint. There is no neutral narrator with a clipboard in this scene.

WHO IS BEING DESCRIBED, AND THE FACTS I HAVE ALREADY FIXED: {{SUBJECT}}
WHO IS LOOKING, AND WHAT THEY WANT FROM THIS PERSON RIGHT NOW: {{OBSERVER}}
WHAT THE OBSERVER ALREADY KNOWS OR ASSUMES ABOUT THEM: {{PRIOR}}
PHYSICAL CONDITIONS: LIGHT, DISTANCE, AND HOW LONG THEY HAVE TO LOOK: {{CONDITIONS}}
WORD BUDGET, AND WHERE THIS SITS IN THE SCENE: {{BUDGET}}

Two rules govern every detail. It must be something the observer could physically register under the stated conditions. It must be something this observer would bother to register, given what they want.

Banned unless the detail changes what happens next in the scene: eye colour, hair colour and length, height, build, age in years, clothing labels, and any comparison to an actor or public figure.

Every detail must do two jobs at once, telling the reader something about the person seen and something about the person looking. While drafting, write the two jobs in brackets after each detail.

Deliver three things. First, the description as prose at the stated budget, with the bracketed notes stripped out. Second, the same details listed with their two jobs, so I can audit them. Third, one thing this observer failed to notice because of what they want, and what a differently motivated observer would have seen instead.`,
    variables: [
      {
        token: "SUBJECT",
        label: "Who is described and the fixed facts",
        example:
          "Idris, late fifties, the new site foreman. Fixed: he has a limp from an old injury he never discusses, and he keeps his phone face down.",
      },
      {
        token: "OBSERVER",
        label: "Who is looking and what they want",
        example:
          "Kemi, twenty six, an apprentice three weeks in. She wants to know whether he is the kind of foreman who lets you make a mistake once.",
      },
      {
        token: "PRIOR",
        label: "What the observer already assumes",
        example:
          "She has heard from two people on the crew that he sacked someone in his first week at the last site. She half believes it.",
      },
      {
        token: "CONDITIONS",
        label: "Light, distance and time available",
        example:
          "A site canteen at seven in the morning, strip lighting, four metres away, she has about twenty seconds while queuing for tea",
      },
      {
        token: "BUDGET",
        label: "Word budget and placement",
        example: "Ninety words maximum, first time the reader meets him, mid chapter",
      },
    ],
    expectedOutput:
      "A short passage of prose within the budget, an audit list showing the two jobs each detail performs, and one named blind spot caused by the observer's motive, with what a different observer would have registered instead.",
    followUps: [
      "Run it again with the observer wanting something else entirely from him, and show me which details survive the change.",
      "The light is now bad and she is fifteen metres away. Rebuild the description under those conditions.",
      "Take the audit list and tell me which details are doing only one job, then cut them and give me the shorter version.",
    ],
    pitfalls: [
      "An observer with no want produces a survey. What the looker is trying to find out is the field that selects details, and without it the prompt falls back on the standard inventory it was told to avoid.",
      "Very generous word budgets make the description worse. Ninety words forces choosing. Three hundred lets everything in, including the features that were banned for good reason.",
      "If your fixed facts include appearance details, they will appear regardless of the ban, which is correct. Only fix the ones you actually need in the reader's head.",
    ],
  },

  eeat: {
    author: "Ruth Adeyemi",
    authorCredential:
      "Eighteen years editing long form journalism and technical documentation, most recently as a standards editor.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "The two jobs rule is what stopped the output reading like a casting note. Before it, both models produced atmospheric paragraphs that told me a great deal about a stranger and nothing about the person watching. GPT-5.2 needs the banned list stated explicitly or eye colour returns within two sentences. Claude Opus 4.5 handles the blind spot section better and will name something genuinely uncomfortable about the observer's motives.",
  },

  article: {
    intro: [
      "A character description prompt that asks what someone looks like will return an inventory. Height, hair, eyes, a jacket, a memorable feature. It is accurate, it is orderly, and no reader has ever remembered one.",
      "Description in fiction is not a specification. It is a record of one person's attention, and attention is selective, biased and driven by whatever the looker currently wants. Change who is looking and the true description changes with them.",
    ],

    sections: [
      {
        heading: "Nobody sees a stranger neutrally",
        body: [
          "An apprentice sizing up a new foreman does not register his height. She registers whether he looks at people when they speak, because that is the question she came in with. A creditor looking at the same man notices the watch.",
          "Describing a person through another character's eyes is therefore not a stylistic option laid over a neutral description. It is the only way a description can be true, because the neutral version was never available to anyone in the scene.",
        ],
      },
      {
        heading: "The banned inventory",
        body: [
          "Eye colour, hair, height, build, age in years, clothing labels and celebrity comparisons are all blocked unless they change what happens next. They are not forbidden because they are wrong. They are forbidden because they are the cheapest thing to reach for, and while they are available the harder details never get found.",
          "Celebrity comparison deserves its own line. It works instantly and it borrows a face rather than building one, so half your readers get a different person and the other half get an actor.",
        ],
      },
      {
        heading: "The character description prompt needs an observer before a subject",
        body: [
          "The input order is deliberate. Who is looking, what they want, and what they already assume come before anything about the person being seen. Any ai prompt for physical description in fiction that starts from the subject has already lost the mechanism, because there is nothing to select details with.",
          "Prior assumptions matter as much as the want. An observer who has heard a rumour reads everything as confirmation or contradiction of it, and the resulting description tells the reader about the rumour without stating it.",
        ],
      },
      {
        heading: "One detail doing two jobs",
        body: [
          "Every detail has to say something about the person seen and something about the person looking. A phone kept face down tells you he expects to be interrupted and tells you she is watching his hands rather than his face.",
          "Details that reveal character rather than appearance come almost free once the two job rule is in force, because a detail carrying information about the observer has to be one they chose to notice, and choices are characterising.",
          "The audit list is where you check this. Details with a blank second column are decoration, and cutting them usually gets the passage under budget without any rewriting.",
        ],
      },
      {
        heading: "Light, distance and what can be seen",
        body: [
          "Stating the physical conditions removes an entire class of quiet error. Across a dark room at fifteen metres, nobody sees a nervous tic in someone's jaw or the frayed cuff of a shirt.",
          "Time constrains as much as light. Twenty seconds in a queue permits three or four impressions. A long wait in a hospital corridor permits the sort of accumulated noticing that would be implausible anywhere else.",
        ],
      },
      {
        heading: "Description as a rate, not a block",
        body: [
          "The word budget exists to stop the paragraph forming. A tight budget on first meeting, with more arriving later as the observer's interest sharpens, distributes description across the scene instead of parking it in a lump the reader skims.",
          "This is most of how to describe a character without a list. Not better sentences, just fewer at a time, each one attached to a moment where the observer had a reason to look.",
        ],
      },
      {
        heading: "The blind spot section",
        body: [
          "The prompt closes by naming what the observer missed because of what they wanted. This is the part that repays reading twice, since it describes the shape of their attention rather than its contents.",
          "It is also the practical route to avoiding the mirror scene description, the reflex where a viewpoint character catalogues themselves in a shop window. What a person fails to notice about themselves, and why, does the same job with none of the awkwardness.",
        ],
      },
    ],

    howTo: {
      name: "How to use the character description prompt",
      steps: [
        {
          name: "Write the want as a question",
          text: "Not she is curious about him. Is he the kind of foreman who lets you make a mistake once. A question sorts details; a mood does not.",
        },
        {
          name: "Fix only the facts you need",
          text: "Anything you fix arrives in the prose whether or not it earns a place. Two or three load bearing facts is usually the right number.",
        },
        {
          name: "Audit the second column",
          text: "Read the list and check every detail says something about the observer. Empty second columns are the cuts, and they are painless.",
        },
        {
          name: "Rerun with the want changed",
          text: "The details that survive a different motive are properties of the subject. The ones that vanish were properties of the looking, which is worth knowing before you commit either.",
        },
      ],
    },

    faq: [
      {
        question: "Does this work in first person?",
        answer:
          "It works best there, because first person makes the observer's bias legitimate rather than something to be smuggled in. The only adjustment is that the blind spot section becomes information the reader gets and the narrator does not, which is the most useful thing first person can do.",
      },
      {
        question: "What about an omniscient narrator?",
        answer:
          "Omniscience still has a temperament and an interest, so treat the narrator as the observer and give them a want, even if that want is thematic rather than personal. A genuinely disinterested omniscient narrator produces exactly the inventory this prompt exists to avoid.",
      },
      {
        question: "How do I describe a character nobody in the scene is looking at?",
        answer:
          "Usually you do not, and the question is a good sign that the description was serving your notes rather than the scene. If the reader needs the information, find the moment when someone has a reason to look and place it there instead.",
      },
      {
        question: "Is the character description prompt output usable as written?",
        answer:
          "Rarely word for word, and that is not the point of it. What transfers is the selection: which four things this person would have noticed and in what order. The sentences themselves are usually better in your own hand, since voice is the one thing the prompt cannot supply.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/dialogue-writing-prompt",
        label: "dialogue writing prompt",
        description:
          "The companion pass. Speech signature and observed detail should be pointing at the same person from two directions.",
      },
      {
        href: "/writing-prompts/story-structure-prompt",
        label: "story structure prompt",
        description:
          "Establishes which meetings matter, so the description budget goes to the encounters that carry weight.",
      },
      {
        href: "/writing-prompts/writing-feedback-prompt",
        label: "writing feedback prompt",
        description:
          "Reads the finished scene as a reader and tells you whether the description held attention or lost it.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description:
          "The same discipline in a different setting: describe the observed instance rather than labelling the person.",
      },
    ],

    externalLinks: [
      {
        href: "https://plato.stanford.edu/entries/attention/",
        label: "Stanford Encyclopedia of Philosophy: Attention",
        description:
          "The philosophical account of attention as selective and goal driven, which is the grounding for building description from the observer's motive.",
      },
      {
        href: "https://www.poetryfoundation.org/learn/glossary-terms/imagery",
        label: "Poetry Foundation: Imagery",
        description:
          "A literary authority on sensory detail, cited for the distinction between concrete registered detail and abstract characterisation.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the exclusion list and structured output patterns behind the banned inventory and the two column audit.",
      },
    ],
  },
};

export default meta;
