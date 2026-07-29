import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "image-prompt-structure",
  name: "Position Editor",
  title: "Image Prompt Structure",
  category: "design-prompts",
  taskType: "rewrite",
  summary:
    "Parses a messy description into seven ordered positions, lists the words doing no work, and builds an ablation ladder that removes one position at a time.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["image prompts", "prompt editing", "ablation", "art direction"],

  seo: {
    primaryKeyword: "image prompt structure",
    keywords: [
      "image prompt structure",
      "slot order in an image prompt",
      "front loading the subject",
      "removing one slot at a time",
      "how to rewrite a messy image description",
      "words that do no work in a prompt",
    ],
    seoTitle: "Image Prompt Structure: Seven Positions, In Order",
    seoDescription:
      "An image prompt structure that parses a description into ordered positions, strips the words doing no work, and tests each position by removing it.",
  },

  prompt: {
    text: `You are a prompt editor for image models. You do not generate images, and you never improve a description by adding to it. Your job is to restructure and to subtract.

RAW DESCRIPTION: {{RAW}}
TARGET MODEL: {{MODEL}}
WHAT THE IMAGE IS FOR: {{USE}}
WHAT MUST SURVIVE THE EDIT: {{MUST}}

STEP 1. Parse the raw description into these positions, in this order. ANCHOR, the one noun the image is of. QUALIFIER, properties that change the anchor's identity. CONTEXT, place, time, weather, era. FRAME, distance, angle, and where the anchor sits in the picture. LIGHT, source, direction, hardness. RENDER, the medium or process. EXCLUSION, what must not appear. Report anything in the raw description that fits no position, because that leftover is where the trouble usually is.

STEP 2. Mark every word doing no work: quality claims, intensifiers, words repeating a property another position already implies, and words naming a feeling rather than a thing. Print them with the reason. Never remove anything listed in WHAT MUST SURVIVE.

STEP 3. Write the restructured prompt as a single line, positions in order, in the shortest form that keeps every real property.

STEP 4. Build an ablation ladder of five prompts. A is the full restructured version. B through E each drop exactly one position and keep everything else identical. State what each removal tests.

STEP 5. For each removal, predict specifically what the model will substitute in place of the missing position.`,
    variables: [
      {
        token: "RAW",
        label: "The description as it arrived",
        example:
          "A really beautiful stunning shot of an old fisherman, very detailed, moody atmospheric vibes, dramatic, cinematic, on a boat, high quality 8k",
      },
      {
        token: "MODEL",
        label: "Which generator this is going to",
        example: "Stable Diffusion 3.5 through a local pipeline, with a separate negative field",
      },
      {
        token: "USE",
        label: "Where the image ends up",
        example: "Chapter opener in a printed annual report, full bleed, portrait, text over the lower third",
      },
      {
        token: "MUST",
        label: "Properties that cannot be edited away",
        example: "The subject stays visibly over seventy, and the boat has to be a working vessel not a yacht",
      },
    ],
    expectedOutput:
      "Seven labelled positions with any leftover text called out, a list of dead words with reasons, one restructured line, five ablation prompts, and a specific prediction for each removal.",
    followUps: [
      "Run step two again on the restructured line. If anything is still doing no work, cut it and show me the shorter version.",
      "Move the EXCLUSION items into a separate negative field for this model and tell me which of them stop working when separated.",
      "Rewrite the restructured line for a landscape crop and identify which position has to change because of it.",
    ],
    pitfalls: [
      "Leaving the must survive field empty lets the editor cut the one property the client cares about, usually an age, a specific object or a piece of clothing.",
      "The dead word list is only convincing when it gives reasons. A list without them tends to include real properties the model simply found unusual.",
      "Ablation results depend on the seed. Hold the seed fixed across the ladder or you are testing randomness rather than the position you removed.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Stable Diffusion 3.5", "Claude Opus 4.5"],
    testingNote:
      "Leave a slot out of an image prompt and the model fills it silently, usually with soft overcast light from the upper left, so nothing in the result can be attributed to what you wrote. Naming every slot explicitly, including the ones you would rather leave open, is what allows a single variable to change between runs.",
  },

  article: {
    intro: [
      "Getting the image prompt structure right matters more than the vocabulary inside it. A description with the right words in a heap produces something adjacent to what you asked for, and you cannot tell which word caused the miss because there is nothing separating one property from another.",
      "This prompt is an editor rather than a generator. It parses whatever you have into seven ordered positions, names every word that is doing no work, then builds a ladder that removes one position at a time so you can see what each was contributing.",
    ],

    sections: [
      {
        heading: "A prompt is a weighted description, not a set of instructions",
        body: [
          "Image models do not parse commands. The text becomes a conditioning signal, and terms compete for influence over the same output. That explains behaviour that looks like disobedience: two positions describing the same property fight, and the result is an average of both rather than a decision between them.",
          "Reading it as competition rather than instruction changes how you edit. You stop adding emphasis and start removing rivals, which is usually why a shorter prompt beats the longer version it came from.",
        ],
      },
      {
        heading: "The first few words carry more weight",
        body: [
          "Front loading the subject is the one ordering rule that survives across every generator I have tested. Terms early in the text tend to exert more influence, so a description that opens with three adjectives about mood and reaches the actual noun in the second clause has spent its strongest position on atmosphere.",
          "The anchor position exists to enforce that. One noun, first, before anything modifies it. Everything else is arranged behind it in an order that makes the competition visible.",
        ],
      },
      {
        heading: "Slot order buys diagnosis, not obedience",
        body: [
          "Slot order in an image prompt is often oversold. Rearranging positions produces a modest shift in weighting, not a different picture, and anyone promising a dramatic improvement from reordering alone is selling something.",
          "What the order genuinely buys is diagnosis. When every prompt you write puts light in the fifth position, an image that comes back badly lit points at one segment of text. Without a fixed layout, the same failure sends you rewriting the whole string, which is how people end up with a hundred word prompt in which two clauses contradict each other.",
        ],
      },
      {
        heading: "The dead word audit",
        body: [
          "Words that do no work in a prompt fall into four families and every raw description contains at least two of them. Quality claims such as beautiful and high quality. Intensifiers such as very and extremely. Duplicates, where cinematic repeats what the render position already said. Feelings, such as moody, which name a response rather than a thing that can be depicted.",
          "Removing them is not tidying. Each one competes with a real property for influence, and quality claims in particular pull the output towards the glossy default aesthetic that the render position was specifically chosen to avoid.",
        ],
        subsections: [
          {
            heading: "The leftover pile matters too",
            body: [
              "Step one reports whatever fits no position. In practice that is where the brief hides a requirement nobody translated into visual terms, such as approachable or premium, and it is the right moment to ask what the person meant.",
            ],
          },
        ],
      },
      {
        heading: "Removing one slot at a time",
        body: [
          "Ablation is borrowed straight from experimental method. Removing one slot at a time, with everything else held identical and the seed fixed, shows what each position actually contributed rather than what you believed it contributed.",
          "The finding is usually humbling. Two or three positions turn out to change almost nothing, either because the model was going to produce that anyway or because another position already implied it. Those are the ones to delete permanently, which shortens every future prompt in the project.",
        ],
      },
      {
        heading: "Rewriting an image prompt structure you inherited",
        body: [
          "The common case is not a blank page. Someone sends a paragraph written by a client, a marketing team or an earlier version of themselves, and it contains three real requirements buried under twenty words of enthusiasm. How to rewrite a messy image description is mostly a sorting problem, and sorting is exactly what a language model is good at.",
          "Keep the must survive field honest and specific. It is the only thing standing between a useful edit and one that quietly removes the single property the client will notice, which in my experience is usually an age, a specific garment or a named object.",
        ],
      },
      {
        heading: "What changes between models",
        body: [
          "Exclusion is where generators genuinely differ. Some accept a separate negative field, some interpret negation inside the main text unreliably, and a few will happily render the thing you asked them to omit because the word is present at all.",
          "Weighting syntax differs too, and the positions survive that. Parentheses, colons and numeric weights are all local dialects layered on top of the same description, which is why the parse is worth doing before you decide which dialect you are writing in.",
        ],
      },
    ],

    howTo: {
      name: "How to apply this image prompt structure",
      steps: [
        {
          name: "Paste the description exactly as it arrived",
          text: "Do not tidy it first. The parse is more useful when it can show you which parts of the original fit no position at all.",
        },
        {
          name: "Protect the non negotiables",
          text: "List the properties that must survive. Everything else is available for cutting, and the editor cuts more aggressively than most people expect.",
        },
        {
          name: "Read the dead word list for reasons",
          text: "Accept the cuts that come with a reason you agree with. Reject any that turn out to be real properties phrased unusually.",
        },
        {
          name: "Fix the seed before running the ladder",
          text: "Same seed across all five prompts. Without it you are comparing random variation and will draw the wrong conclusion about every position.",
        },
        {
          name: "Delete the positions that changed nothing",
          text: "Where removal made no visible difference, leave it out permanently. Every prompt in the project gets shorter and easier to diagnose.",
        },
      ],
    },

    faq: [
      {
        question: "Does this image prompt structure work with a negative prompt field?",
        answer:
          "Yes, and it is the better arrangement where the model supports one. Keep the exclusion position in the parse so nothing is lost, then move those terms into the dedicated field at the end. Separating them usually improves compliance and never hurts it.",
      },
      {
        question: "How long should the finished prompt be?",
        answer:
          "Shorter than the original almost every time. Twenty five to forty five words covers seven populated positions comfortably. Beyond about sixty, later terms carry so little weight that adding more is mostly a way of feeling thorough.",
      },
      {
        question: "Is the seven position set arbitrary?",
        answer:
          "It is a working set rather than a law. Anchor, qualifier, context, frame, light, render and exclusion cover what changes an image in practice. Some projects add a position for typography or for a specific camera body, and the method survives the addition as long as the order stays fixed.",
      },
      {
        question: "Why predict what the model substitutes?",
        answer:
          "Because an unfilled position is not empty, it is filled by the training distribution. Knowing that missing light usually becomes soft overcast daylight tells you whether you need to specify it at all, which is a faster route to a short prompt than trial and error.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/midjourney-prompt-template",
        label: "midjourney prompt template",
        description:
          "The generation side of the same discipline, with the parameter block and the ladder that varies rather than removes.",
      },
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description:
          "Where description gives way to geometry, since an icon set is specified by grid and stroke rather than by scene.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "Useful for deciding what the image has to carry, since the copy beside it determines what the picture must not repeat.",
      },
    ],

    externalLinks: [
      {
        href: "https://arxiv.org/abs/2204.06125",
        label: "Hierarchical Text-Conditional Image Generation with CLIP Latents",
        description:
          "Explains how text conditions image generation, which is the basis for treating terms as competing weights rather than commands.",
      },
      {
        href: "https://platform.openai.com/docs/guides/image-generation",
        label: "OpenAI: image generation guide",
        description:
          "Vendor documentation on how descriptions are interpreted, including where negation is and is not respected.",
      },
      {
        href: "https://aclanthology.org/2022.acl-long.577/",
        label: "ACL Anthology: research on prompt sensitivity",
        description:
          "Peer reviewed work on how phrasing and ordering shift model output, which is why ablation beats intuition.",
      },
    ],
  },
};

export default meta;
