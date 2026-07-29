import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "metaphor-generator-prompt",
  name: "Break Point Tester",
  title: "Metaphor Generator Prompt",
  category: "writing-prompts",
  taskType: "brainstorm",
  summary:
    "Generates comparisons from source domains your reader already handles, maps them property by property, then pushes each one until it breaks and discards the ones that break too early.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["figurative", "explanation", "craft", "ideation"],

  seo: {
    primaryKeyword: "metaphor generator prompt",
    keywords: [
      "metaphor generator prompt",
      "finding an image for an abstract idea",
      "ai prompt for figurative language",
      "testing where a comparison breaks down",
      "metaphors built from everyday objects",
      "how to explain an abstract concept with an image",
    ],
    seoTitle: "Metaphor Generator Prompt: Find The Break Point First",
    seoDescription:
      "A metaphor generator prompt that maps each comparison property by property, pushes it until it fails, and throws out any image that breaks inside your explanation.",
  },

  prompt: {
    text: `You generate metaphors for one idea and one audience, and you are required to break every candidate before you recommend it.

THE IDEA I HAVE TO EXPLAIN: {{IDEA}}
THE THREE PROPERTIES THAT MUST SURVIVE THE COMPARISON: {{PROPERTIES}}
WHO IS READING, AND WHAT THEY PHYSICALLY HANDLE MOST DAYS: {{AUDIENCE}}
WHERE THIS APPEARS AND HOW MUCH ROOM I HAVE: {{PLACEMENT}}
IMAGES ALREADY WORN OUT IN THIS FIELD: {{BANNED}}

Produce six candidates drawn from at least four different source domains. Take those domains from what the audience handles most days. Do not use war, sport, journeys, weather or gardening unless I named one of them myself.

For each candidate, in this order. One sentence, twenty words at most. A mapping table with one row per required property, stating what in the source stands for what in the idea. Then push the comparison one step past what my sentence needs, and name the BREAK POINT, meaning the first thing it starts asserting that is false. Then say whether that break point falls inside or outside the part I am explaining.

Discard any candidate whose break point falls inside. Rank the survivors by how much of the explanation each one carries with no follow up sentence attached.

Finish by naming the most vivid candidate you rejected and the false thing it would have taught.`,
    variables: [
      {
        token: "IDEA",
        label: "The idea to explain",
        example:
          "Technical debt: shortcuts taken in code that make every later change slower until someone pays them back",
      },
      {
        token: "PROPERTIES",
        label: "Three properties the comparison must preserve",
        example:
          "It accrues quietly. The cost is paid on every future change rather than once. Paying it down produces no visible new feature.",
      },
      {
        token: "AUDIENCE",
        label: "Who is reading and what they handle daily",
        example:
          "Non technical directors at a logistics company. They handle vehicle fleets, depot rotas, fuel cards and maintenance schedules.",
      },
      {
        token: "PLACEMENT",
        label: "Where it appears and how much room there is",
        example: "One slide in a budget meeting, spoken aloud, about thirty seconds of talking",
      },
      {
        token: "BANNED",
        label: "Images already worn out here",
        example: "Anything about interest rates, credit cards, or a house with cracks in the foundation",
      },
    ],
    expectedOutput:
      "Six candidates from four or more source domains, each with a property by property mapping and a named break point, the ones breaking inside the explanation discarded, the survivors ranked, and one vivid rejection explained.",
    followUps: [
      "Take the top candidate and write the one sentence that has to follow it, the sentence that stops a listener extending it past the break point.",
      "The audience turned out to be engineers rather than directors. Regenerate from source domains they handle instead.",
      "Give me three more candidates from a single domain, the least obvious one on your list, and see whether it has depth or was a lucky hit.",
    ],
    pitfalls: [
      "Listing more than three properties produces candidates that map nothing well, because no source domain matches four features of an unrelated idea. Rank your properties and keep the top three.",
      "An audience described by job title gives you generic domains. What they physically handle is the useful input, since a familiar object carries the mapping without any explaining of its own.",
      "The rejected vivid candidate is the one you will be tempted by later. Read that section, because it usually names the false lesson you have already been teaching by accident.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asking for metaphors gets you a list. Asking where each one fails gets you an argument, and the difference in usefulness is large. On the technical debt example GPT-5.2 offered a fleet maintenance image whose break point sat outside the explanation, and a beautiful one about silt in a river that started asserting nobody was responsible, which was precisely the wrong lesson. Claude Opus 4.5 writes the more careful mapping tables and needs pushing to be vivid at all.",
  },

  article: {
    intro: [
      "A metaphor generator prompt that returns twelve comparisons has not helped you. Producing images is the easy half. Knowing which one collapses under the first follow up question is the part that decides whether your explanation survives the meeting.",
      "Every comparison is false somewhere. That is what makes it a comparison rather than a definition. The only question worth asking is where the falseness starts, and whether that point lies inside or outside the thing you are trying to explain.",
    ],

    sections: [
      {
        heading: "A metaphor is a claim about structure",
        body: [
          "When you say one thing is another, you are asserting that a set of relationships holds in both. Not that they look alike. Debt is a good image for shortcuts in code because the relationship between a small early saving and a recurring later cost is genuinely shared, not because code resembles money.",
          "So the input that matters is not the idea in general but the two or three relationships that have to survive. Finding an image for an abstract idea is much easier once you have written those down, and it is nearly impossible before, because the space of vaguely apt comparisons is unlimited.",
        ],
      },
      {
        heading: "Source domains the reader already lives in",
        body: [
          "The point of a comparison is to borrow understanding the reader already has. It follows that the source has to come from their life rather than from the general stock of literary imagery. Metaphors built from everyday objects work because nothing about the source needs explaining first.",
          "War, sport, journeys, weather and gardening are banned by default in this prompt. They are the default output of any ai prompt for figurative language, they are exhausted, and each of them carries freight. A war image makes someone the enemy. A journey image implies a destination that may not exist.",
          "Naming what the audience physically handles produces stranger and better results. Depot managers get fleet metaphors that carry the whole mapping unassisted. Nurses get metaphors from triage and handover, and those are not images the field has already worn out.",
        ],
      },
      {
        heading: "The metaphor generator prompt names its own break point",
        body: [
          "Each candidate is pushed one step past the work it needs to do, and the first false assertion is written down. This is the mechanism the whole thing runs on, because testing where a comparison breaks down is what an audience does automatically and silently, about four seconds after you finish speaking.",
          "The rule is simple once the break point is visible. If the comparison starts lying inside the region you are explaining, it is unusable however good it sounds. If it lies outside, you are safe, and you can even use the break as a way of marking the edge of the analogy on purpose.",
        ],
        subsections: [
          {
            heading: "The vivid rejection",
            body: [
              "The prompt closes by naming the strongest candidate it threw out. This is consistently the most useful line in the output, because the image with the earliest break point is usually the most memorable one, and it is often the one already circulating in your organisation teaching people something untrue.",
            ],
          },
        ],
      },
      {
        heading: "Dead images and why they keep getting written",
        body: [
          "A dead metaphor has stopped projecting structure and become vocabulary. Running a meeting, a bottleneck, a pipeline. There is nothing wrong with these as words, and there is no benefit in reaching for them as images, since they no longer make anybody see anything.",
          "Models produce them abundantly because they are the statistically ordinary way to describe the subject. Banning the tired ones by name in the input is more effective than asking for originality, which tends to yield strain rather than freshness.",
        ],
      },
      {
        heading: "Three properties, mapped or abandoned",
        body: [
          "The mapping table is the discipline that stops a comparison being approved on vibe. One row per property, stating what stands for what. A candidate that maps two of three cleanly and fudges the third is worth knowing about, since you can often carry the missing property in the sentence that follows.",
          "That is how to explain an abstract concept with an image without misleading anyone: use the comparison for the properties it actually carries, and state the remaining one plainly in the next breath. The failure is expecting a single image to do all the work, which is how explanations end up defended rather than understood.",
        ],
      },
    ],

    howTo: {
      name: "How to run the metaphor generator prompt",
      steps: [
        {
          name: "Write the three properties before anything else",
          text: "If you cannot name three relationships that must survive, you do not yet know what you are explaining, and no image will cover that gap.",
        },
        {
          name: "Describe the audience by what they touch",
          text: "Objects, tools, routines. Not seniority or sector. The mapping is free when the source domain is already in the reader's hands.",
        },
        {
          name: "Read the break points before the candidates",
          text: "Go down the break point column first and eliminate. Reading the sentences first means falling for one, and then arguing with the analysis that says it fails.",
        },
        {
          name: "Say the winner out loud to someone",
          text: "Then wait. If they extend the comparison past its break point in their reply, you need the follow up sentence, and now you know exactly what it has to rule out.",
        },
      ],
    },

    faq: [
      {
        question: "How many candidates is the right number to ask for?",
        answer:
          "Six from four domains is the setting that has held up. Fewer and the domains repeat; more and the last few are variations rather than alternatives. The constraint doing the real work is the domain count rather than the candidate count.",
      },
      {
        question: "What if every candidate breaks inside the explanation?",
        answer:
          "That usually means the three properties are pulling against each other, so no single source can hold them. Split the explanation. Two comparisons used for two different parts is honest, whereas one stretched over both will be picked apart by the first person who thinks about it.",
      },
      {
        question: "Can this generate similes and analogies as well?",
        answer:
          "Yes, and the machinery is identical because all three are structure mapping. The difference is length and hedging rather than kind. A longer analogy simply has more surface to be wrong on, which makes the break point analysis more valuable rather than less.",
      },
      {
        question: "Is a metaphor generator prompt useful for fiction?",
        answer:
          "Less so. Fiction often wants the image that reveals the narrator rather than the one that maps cleanly, and a comparison that breaks in an interesting place can be the point. Use it where accuracy is the job: teaching, documentation, briefings and anything a listener will repeat.",
      },
      {
        question: "Why ban journey and war images specifically?",
        answer:
          "Because both smuggle in a whole framework. A journey implies a fixed destination, a route and an arrival. A war implies an enemy, a victory condition and acceptable losses. Those commitments arrive with the image whether or not you intended any of them.",
      },
      {
        question: "How do I know the mapping is right rather than plausible?",
        answer:
          "Read each row backwards. If the source element genuinely stands for the target element, you should be able to state the relationship from the target end and have it still be true. Rows that only work in one direction are decoration dressed as structure.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "The alternative move when a term of art needs a gloss rather than an image, which is often the honest answer.",
      },
      {
        href: "/writing-prompts/headline-writing-prompt",
        label: "headline writing prompt",
        description:
          "Where a surviving image usually ends up, once it has been tested against the article it is promising.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "technical writing prompt",
        description:
          "For the concept sections where an image helps and the procedure sections where it must not appear at all.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Decides which source domains are on voice for an organisation, so the survivors are also usable.",
      },
    ],

    externalLinks: [
      {
        href: "https://plato.stanford.edu/entries/metaphor/",
        label: "Stanford Encyclopedia of Philosophy: Metaphor",
        description:
          "The scholarly account of metaphor as structure mapping, which is the basis for requiring a property table rather than a resemblance.",
      },
      {
        href: "https://www.poetryfoundation.org/learn/glossary-terms/metaphor",
        label: "Poetry Foundation: Metaphor",
        description:
          "A literary authority's definition, cited for the distinction between a live image and one that has decayed into ordinary vocabulary.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Prompting strategies",
        description:
          "Documents the constrained generation and self critique patterns behind asking for candidates and their failure modes in one pass.",
      },
    ],
  },
};

export default meta;
