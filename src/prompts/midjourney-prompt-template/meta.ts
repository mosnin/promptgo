import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "midjourney-prompt-template",
  name: "Slot Compiler",
  title: "Midjourney Prompt Template",
  category: "design-prompts",
  taskType: "generate",
  summary:
    "A seven slot template plus a parameter block that compiles five variants at a time, holding every slot steady except the one you are testing.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["midjourney", "image generation", "art direction", "prompt template"],

  seo: {
    primaryKeyword: "midjourney prompt template",
    keywords: [
      "midjourney prompt template",
      "how to vary one variable in an image prompt",
      "midjourney parameters for aspect ratio and stylize",
      "how to use the no parameter in midjourney",
      "how to keep a consistent style in midjourney",
      "midjourney prompt words for lighting and lens",
    ],
    seoTitle: "Midjourney Prompt Template: Seven Slots, One Variable",
    seoDescription:
      "A midjourney prompt template with seven labelled slots and a parameter block, built to hold six slots constant while you ladder the seventh across variants.",
  },

  prompt: {
    text: `You are a prompt compiler for Midjourney. You output prompt strings and nothing else inside them. No full sentences, no explanations in the string, and never the phrase a picture of.

BRIEF: {{BRIEF}}
LOCKED STYLE: {{STYLE}}
SLOT TO EXPLORE: {{VARY}}
FORBIDDEN CONTENT: {{FORBID}}
OUTPUT SHAPE: {{SHAPE}}

Fill this template, keeping the slots in this order, separated by commas:
SUBJECT, ACTION, SETTING, COMPOSITION, LIGHT, MEDIUM, PALETTE, parameter block.

Slot rules.
SUBJECT: one noun phrase of four words or fewer. No quality adjectives such as beautiful, stunning or epic.
ACTION: what the subject is doing or how it is oriented. Omit entirely for a static object.
SETTING: a place plus one detail that fixes era or climate.
COMPOSITION: shot distance, camera height, and where in the frame the subject sits.
LIGHT: source, direction, hardness, time of day.
MEDIUM: the process, such as 35mm film, gouache on cold press paper, or clay maquette. Never name a living artist.
PALETTE: three colours at most, in ordinary words.
PARAMETERS: derive the aspect ratio from OUTPUT SHAPE, choose a stylize value between 50 and 250 and state the reason in a note after the string, and place every item from FORBIDDEN CONTENT after the no parameter.

Produce five numbered variants. Every slot is identical to variant one except the slot named in SLOT TO EXPLORE, which takes five clearly separated values. Below the set, print those five values on one line as a ladder.`,
    variables: [
      {
        token: "BRIEF",
        label: "What the image is for and what it must show",
        example:
          "Header image for a clinic booking page. A community pharmacist checking a prescription at a counter",
      },
      {
        token: "STYLE",
        label: "The look you are locking across the set",
        example:
          "Documentary photography, 35mm, muted greens and warm greys, no gloss, nothing that looks staged",
      },
      {
        token: "VARY",
        label: "The single slot you are testing",
        example: "LIGHT",
      },
      {
        token: "FORBID",
        label: "Everything that must not appear",
        example: "text, logos, syringes, stock smiles, blue medical gradients, watermarks",
      },
      {
        token: "SHAPE",
        label: "Where the image will sit",
        example: "Full width web banner, roughly three to one, cropped safe in the centre third",
      },
    ],
    expectedOutput:
      "Five comma separated prompt strings sharing six identical slots, each ending in a parameter block with a justified stylize value, followed by a one line ladder of the five varied values.",
    followUps: [
      "Keep variant three and now ladder COMPOSITION across five values, leaving light exactly as it was.",
      "Rewrite the winning string for a square crop and tell me which slot has to change because of the shape.",
      "List every word in the winning prompt that you believe is doing no work, and give the shortened string.",
    ],
    pitfalls: [
      "Quality adjectives are the most common waste. Beautiful, stunning and highly detailed compete with your medium slot and push the result towards generic render aesthetics.",
      "Laddering two slots at once tells you nothing. If both light and composition change between variants, you cannot attribute the difference to either.",
      "A stylize value above 400 will quietly override the palette and medium slots, which is usually mistaken for the prompt being ignored.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Midjourney v7", "GPT-5.2"],
    testingNote:
      "Hand written image prompts accumulate adjectives that repeat the medium slot, so several words compete to describe the same thing and none of them can be tuned on their own. Compiling slot by slot exposes the duplication, and requiring a justification for every parameter stops values like stylize being set out of habit.",
  },

  article: {
    intro: [
      "A midjourney prompt template earns its place by being boring. Seven labelled slots, always in the same order, filled the same way every time, so that when an image comes back wrong you know which slot to blame instead of rewriting the whole string and hoping.",
      "The slots are subject, action, setting, composition, light, medium and palette, followed by a parameter block. Nothing in that list is a matter of taste. Each one answers a question the model will otherwise answer for you, and it will answer with whatever is most common in its training data.",
      "The compiler exists to produce sets rather than single images. It fills all seven slots once and then emits five variants in which exactly one slot moves, which is how you learn what any of them actually do.",
    ],

    sections: [
      {
        heading: "Seven fields, filled every time, in the same order",
        body: [
          "Free text prompts drift. Write one on Monday and one on Thursday and they will differ in ways you did not choose: Thursday's mentions a time of day, Monday's did not, and the two images differ for a reason you will attribute to randomness.",
          "A fixed slot order removes that variable. It also exposes what you keep leaving out. Most people never fill the composition slot, which is why so much generated imagery arrives as a centred medium shot at eye height: that is the default, and a default is what you get when the slot is empty.",
        ],
      },
      {
        heading: "Midjourney prompt words for lighting and lens beat adjectives",
        body: [
          "Words like moody, cinematic and atmospheric are requests for a feeling and the model has to guess at the mechanics that produce it. Naming the mechanics is more reliable. Low sun from behind and left, hard shadows, long throw is a specification. Cinematic is a mood board.",
          "Lighting and lens vocabulary is worth learning for exactly this reason. Focal length, aperture, height and direction are all things a photographer would state and a model has seen described in captions thousands of times. An 85mm at chest height gives a different portrait from a 24mm at the same distance, and both are more predictable than asking for a stunning portrait.",
        ],
        subsections: [
          {
            heading: "The two words worth deleting first",
            body: [
              "Beautiful and detailed. Both are quality claims rather than descriptions, both push the output towards a glossy default, and both compete directly with whatever you wrote in the medium slot.",
            ],
          },
        ],
      },
      {
        heading: "Move one slot and hold the other six",
        body: [
          "How to vary one variable in an image prompt is the whole method, and it is borrowed from anyone who has ever run a controlled test. Five variants that differ in light alone tell you what light does to your subject. Five variants that differ in light and composition tell you nothing you can reuse.",
          "The one line ladder printed under the set matters more than it looks. Seeing the five values side by side, without the surrounding string, is how you notice that three of them are effectively the same value described differently, which is the usual reason a set of five images looks like a set of two.",
        ],
      },
      {
        heading: "What the parameters actually change",
        body: [
          "Midjourney parameters for aspect ratio and stylize are the two that alter the composition rather than decorating it. Aspect ratio changes what fits in frame, so a subject that reads clearly at three to two can lose its context entirely at sixteen to nine, and the composition slot has to be rewritten rather than trusted to adapt.",
          "Stylize controls how far the model departs from your description towards its own aesthetic preferences. Low values respect the medium and palette slots, high values gradually overrule them. Requiring a written reason for the value stops it becoming a number you copy from your last prompt out of habit.",
        ],
      },
      {
        heading: "Subtraction is a slot too",
        body: [
          "How to use the no parameter in midjourney is the fastest fix for the recurring intrusions: text baked into the image, watermarks, logos on clothing, the stock photography smile. Listing them once at the end of your template means you stop rediscovering them one at a time.",
          "It is a blunt instrument and worth knowing the limits. Excluding a concept sometimes suppresses things adjacent to it, so removing hands from a scene of someone working can remove the work as well. When a negative list starts fighting the subject slot, the subject is usually the thing to rewrite.",
        ],
      },
      {
        heading: "Reusing the midjourney prompt template across a campaign",
        body: [
          "How to keep a consistent style in midjourney is the requirement that separates a professional deliverable from a folder of pleasing single images. Six locked slots and one variable gives you that by construction: the medium, palette and light stay word for word identical while the subject changes across twelve pictures.",
          "Store the locked half as a saved snippet and only ever edit the subject and action fields. When someone asks for a new image nine months later, the string is still there and the result still matches the set, which is not something a memorable one off prompt can offer.",
        ],
      },
    ],

    table: {
      caption: "A light ladder, six slots held constant",
      headers: ["Variant", "LIGHT value", "What it tests"],
      rows: [
        ["1", "overcast midday, soft, no direction", "the neutral baseline"],
        ["2", "low sun from behind left, hard shadows", "whether shape reads without contrast"],
        ["3", "single window from the right, falloff to black", "how much setting survives darkness"],
        ["4", "overhead fluorescent, flat and green", "the institutional reading"],
        ["5", "late gold from the front, lifted shadows", "whether warmth turns it into advertising"],
      ],
    },

    howTo: {
      name: "How to run the midjourney prompt template",
      steps: [
        {
          name: "Write the locked style once",
          text: "Medium, palette and treatment go in the locked field and stay word for word identical for the life of the set. This is the half you will reuse for months.",
        },
        {
          name: "Name one slot to ladder",
          text: "Pick the slot you are least sure about. On a first pass that is usually light or composition, since both change the read of an image far more than palette does.",
        },
        {
          name: "Read the ladder line, not the images",
          text: "Check the five varied values are genuinely five different things before you generate. Half of failed sets are three synonyms and two real options.",
        },
        {
          name: "Lock the winner and ladder the next slot",
          text: "Fix the value that worked into the locked half, then run again on a different slot. Two or three ladders usually settle a look for the whole project.",
        },
      ],
    },

    faq: [
      {
        question: "Will this midjourney prompt template work in other image models?",
        answer:
          "The seven slots transfer to any generator, since subject, composition, light and medium are description rather than syntax. The parameter block does not. Other tools express aspect ratio and style strength through their own settings, so strip the trailing parameters and set them in whatever interface you are using.",
      },
      {
        question: "Why forbid naming living artists?",
        answer:
          "Partly because several platforms restrict it, and mostly because it is imprecise. An artist name bundles medium, palette, composition and subject matter into one token you cannot adjust. Describing the process directly gives you slots you can ladder independently, which a name never will.",
      },
      {
        question: "How long should a filled template be?",
        answer:
          "Typically forty to sixty words before the parameters. Longer strings do not fail outright, though the later words carry less influence, so a hundred word prompt usually means two slots are arguing with each other and one of them is being quietly ignored.",
      },
      {
        question: "What stylize value should I start at?",
        answer:
          "Around 100 for documentary or product work where the description should dominate, and higher when you want the model's own aesthetic to contribute. The important part is that you can say why, because an unexplained value is the reason many sets drift in look between sessions.",
      },
      {
        question: "Can I ladder the subject slot instead?",
        answer:
          "Yes, and that is the mode you use for production rather than exploration. Once light, composition, medium and palette are settled, changing only the subject across twelve prompts is exactly how you generate a full set that hangs together on one page.",
      },
      {
        question: "Does the order of slots really matter?",
        answer:
          "It matters less than people claim and more than nothing. Earlier terms carry somewhat more weight, so keeping the subject first is worth doing, but the main value of a fixed order is that you notice an empty slot rather than filling it accidentally with the previous word.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/image-prompt-structure",
        label: "image prompt structure",
        description:
          "The model agnostic version, including how to find which words in an existing prompt are doing no work at all.",
      },
      {
        href: "/design-prompts/logo-brief-prompt",
        label: "logo brief prompt",
        description:
          "For mark design, where a written brief with a rejection list beats generating a thousand candidates.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Pairs with the locked style half, since the visual set and the writing should be constrained by the same decisions.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.midjourney.com/hc/en-us/articles/32122188945293-Parameter-List",
        label: "Midjourney: parameter list",
        description:
          "The official reference for aspect ratio, stylize and no, which is what the parameter block in the template compiles to.",
      },
      {
        href: "https://arxiv.org/abs/2112.10752",
        label: "High Resolution Image Synthesis with Latent Diffusion Models",
        description:
          "The paper behind the current generation of image models, and the reason conditioning text is weighted rather than parsed as instructions.",
      },
      {
        href: "https://www.loc.gov/collections/fsa-owi-black-and-white-negatives/about-this-collection/",
        label: "Library of Congress: FSA/OWI documentary photography",
        description:
          "A primary archive worth studying for lighting and framing vocabulary, since the captions describe process rather than mood.",
      },
    ],
  },
};

export default meta;
