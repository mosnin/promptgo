import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "logo-brief-prompt",
  name: "Brief With A Kill List",
  title: "Logo Brief Prompt",
  category: "design-prompts",
  taskType: "plan",
  summary:
    "Writes the brief rather than the mark: an intent sentence, a kill list of sector cliches, three directions that differ in kind, and tests a non designer can apply.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["logo design", "brand identity", "creative brief", "marks"],

  seo: {
    primaryKeyword: "logo brief prompt",
    keywords: [
      "logo brief prompt",
      "how to write a logo design brief",
      "logo that works at small sizes",
      "three divergent logo directions",
      "ruling out cliche logo concepts",
      "describing a mark over the phone",
    ],
    seoTitle: "Logo Brief Prompt: Write The Brief, Not The Mark",
    seoDescription:
      "A logo brief prompt that produces an intent sentence, a kill list of sector cliches, three directions differing in kind, and ten second rejection tests.",
  },

  prompt: {
    text: `You are writing a design brief for a logo. You are not designing one. Do not propose finished marks, do not suggest taglines, and do not name typefaces.

ORGANISATION: {{ORG}}
WHAT IT ACTUALLY DOES: {{DOES}}
WHO HAS TO RECOGNISE IT: {{AUDIENCE}}
SMALLEST AND LARGEST PLACEMENTS: {{PLACEMENTS}}
WHAT IT MUST NEVER BE MISTAKEN FOR: {{NOT}}

Return the brief in five parts.

A. INTENT, ONE SENTENCE. What the mark must communicate in the half second before anyone reads the name. Write it as a claim a reasonable person could argue with.
B. KILL LIST. At least eight concepts, metaphors and shapes banned for this sector because everyone in it already uses them. Name the specific cliches of this sector, not generic ones.
C. THREE DIRECTIONS. Each gets a name, the idea in one sentence, the strongest argument in its favour, and the reason a reasonable client would reject it. The three must differ in kind rather than in execution, so they cannot all be monograms.
D. CONSTRAINTS. Take the smallest placement and derive from it the minimum stroke weight, the maximum number of distinct elements, whether the mark must survive in one colour, and whether both a horizontal and a stacked lockup are needed.
E. REJECTION TESTS. Five specific checks a candidate must pass, each written so a non designer can apply it in ten seconds.

Never use the words modern, clean, dynamic, innovative or timeless anywhere in the brief.`,
    variables: [
      {
        token: "ORG",
        label: "Who the mark is for",
        example: "Ravenswood, a nine person practice fitting hearing aids across three market towns",
      },
      {
        token: "DOES",
        label: "What it actually does, in plain terms",
        example:
          "Tests hearing, fits devices, and does the follow up adjustments other providers charge extra for",
      },
      {
        token: "AUDIENCE",
        label: "Who has to recognise it and where",
        example:
          "People over 65 and the adult children who book on their behalf, usually from a shopfront or a leaflet",
      },
      {
        token: "PLACEMENTS",
        label: "The extremes it must survive",
        example:
          "Smallest is a 16px favicon and an embossed device case. Largest is a two metre shopfront sign",
      },
      {
        token: "NOT",
        label: "The associations to avoid",
        example: "A medical device company, a charity, anything that reads as an ear shape",
      },
    ],
    expectedOutput:
      "An arguable intent sentence, at least eight sector specific banned concepts, three directions each carrying its own rejection reason, size derived constraints, and five tests a non designer can run.",
    followUps: [
      "Take direction two and write the counter brief: what would have to be true about the audience for this to be the obvious choice?",
      "Add a sixth rejection test aimed specifically at how the mark behaves when embossed with no colour at all.",
      "Rewrite the kill list for the same sector in a different country, and say which items stop being cliches.",
    ],
    pitfalls: [
      "A generic kill list is a wasted section. If it bans swooshes and globes rather than the three shapes every competitor in this exact sector uses, the input did not describe the sector concretely enough.",
      "Models write the rejection reason in part C as a weakness they immediately dismiss. If all three reasons sound easy to overcome, ask again for the reason the client kills it in the room.",
      "Skipping the smallest placement produces constraints that fail at favicon size, which is where most marks are actually seen most often.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Brief vocabulary collapses toward modern, timeless and innovative, and none of those words describe a position a designer can draw against. Banning them outright forces the intent sentence to say who the mark is for and what it has to beat, though the ban needs restating late or the adjectives creep back in.",
  },

  article: {
    intro: [
      "A logo brief prompt that returns logo ideas has skipped the only part worth automating. Ideas are cheap and a competent designer has forty of them by Wednesday. What is scarce is a brief specific enough that everyone can tell which of those forty are wrong, and why, without a two hour meeting.",
      "This prompt writes that document. An intent sentence someone could argue with, a kill list naming the cliches of your specific sector, three directions that differ in kind rather than in styling, constraints derived from the smallest place the mark will ever appear, and five tests a non designer can apply in ten seconds each.",
    ],

    sections: [
      {
        heading: "A brief is a set of refusals",
        body: [
          "Most people asking how to write a logo design brief produce a description of an organisation and a list of adjectives. That document cannot reject anything. Every candidate mark is defensible against it, so the eventual decision is made by whoever speaks last in the review.",
          "A brief that constrains is a brief made of refusals: things the mark cannot be, sizes it must survive, associations it must avoid. Refusals are testable. Adjectives are not, which is why the prompt bans the five that appear in almost every identity document ever written.",
        ],
      },
      {
        heading: "Directions have to differ in kind",
        body: [
          "Ask any tool for three concepts and you get three executions of one concept, usually a monogram in three weights. That is not a choice, it is a preference test, and it wastes the round of feedback that would otherwise settle the actual question.",
          "Three divergent logo directions means three different answers to what the mark is: a wordmark that carries everything in the letterforms, an abstract mark that means nothing until it is learned, a pictorial mark that gives up flexibility for immediate recognition. Choosing between those is a strategic decision the client is qualified to make, and it can be made before anything is drawn.",
        ],
        subsections: [
          {
            heading: "The rejection reason attached to each direction",
            body: [
              "Every direction carries the reason a reasonable client kills it. Written before anyone falls in love with a sketch, this converts the review from a defence of work into a comparison of costs, which is a conversation with a decision at the end of it.",
            ],
          },
        ],
      },
      {
        heading: "The kill list saves the second round",
        body: [
          "Ruling out cliche logo concepts in advance is the single highest value section, and it only works when the list is specific. Banning swooshes and globes is useless because nobody was going to propose one. Banning the three shapes that four of your competitors already use is the version that changes what gets drawn.",
          "This is where the model genuinely helps, because it has seen the sector's visual conventions in bulk. Give it a real sector and it will name the sound wave, the abstract ear, the pair of overlapping speech marks. Give it a vague description and it returns the swoosh, which tells you the input was too thin.",
        ],
      },
      {
        heading: "Why the logo brief prompt starts from the smallest placement",
        body: [
          "Constraints derived from the largest use are always generous and always wrong. A logo that works at small sizes is a much harder specification, and since the favicon, the app icon and the embossed case are where most people encounter a mark most often, it is also the specification that matters.",
          "Working from the smallest placement produces numbers rather than opinions: a minimum stroke weight, a cap on distinct elements, a requirement to survive in one colour. Those are checkable, and they kill the delicate three colour mark early rather than after two rounds of refinement.",
        ],
      },
      {
        heading: "Tests a non designer can run in ten seconds",
        body: [
          "Part E exists because the people approving a mark are rarely designers, and in the absence of a shared test they fall back on personal taste. Five concrete checks give a board something to do other than say whether they like it.",
          "The strongest of them is describing a mark over the phone. If someone can convey the mark accurately to a person who has not seen it, in one sentence, it has a shape simple enough to be remembered. Marks that fail that test tend to be the ones that need a paragraph of explanation in the presentation, which is a warning nobody heeds at the time.",
        ],
      },
    ],

    howTo: {
      name: "How to use the logo brief prompt",
      steps: [
        {
          name: "Write what the organisation does, not what it says",
          text: "Plain description of the actual work beats mission language. A model given marketing copy returns a brief made of the same marketing copy.",
        },
        {
          name: "Find the smallest real placement",
          text: "Check the favicon, the app icon, the embroidery, the embossed case. Whichever is smallest sets every constraint in part D.",
        },
        {
          name: "Name the misreads to avoid",
          text: "List what the mark must never be mistaken for. This field does more to shape the kill list than the sector description does.",
        },
        {
          name: "Check the three directions differ in kind",
          text: "If all three are wordmarks or all three are monograms, say so and run it again. Divergence is the point of having three.",
        },
        {
          name: "Take the rejection reasons to the client first",
          text: "Present the three trade offs before any sketching. The decision made here saves the round of work that would otherwise be thrown away.",
        },
        {
          name: "Hold the final candidates against part E",
          text: "Run the five tests literally, including the phone description, with someone who was not in the project. Marks that need explaining fail quietly at this stage.",
        },
      ],
    },

    faq: [
      {
        question: "Can the logo brief prompt generate the mark as well?",
        answer:
          "Deliberately not. Image models produce plausible marks that fall apart at small sizes and cannot be reproduced as vectors, and putting a candidate in front of a client early collapses the strategic conversation into a preference vote before the brief has been agreed.",
      },
      {
        question: "Is a brief useful if I am designing the mark myself?",
        answer:
          "It is arguably more useful, because you have nobody to argue with. The kill list stops you drawing the sector cliche you have absorbed without noticing, and the five rejection tests give you a way to kill your own favourite sketch on grounds other than doubt.",
      },
      {
        question: "How specific should the sector description be?",
        answer:
          "Specific enough to name competitors. Hearing aid fitting in market towns produces a usable kill list, whereas healthcare produces a generic one. If the banned concepts come back looking familiar from every industry, the description was the problem rather than the model.",
      },
      {
        question: "What if the client insists on a concept from the kill list?",
        answer:
          "Then the list has done its job by making the choice deliberate. Sometimes the obvious metaphor is right, particularly for a business whose customers are not comparing options. The value is that it is now a decision with a stated reason rather than a default nobody questioned.",
      },
      {
        question: "Does it handle wordmarks with no symbol at all?",
        answer:
          "Yes, and one of the three directions should usually be exactly that. The constraints in part D change shape for a wordmark, since legibility at the smallest size becomes a question about letterforms and spacing rather than about stroke weight and element count.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/icon-design-prompt",
        label: "icon design prompt",
        description:
          "Where the small size constraints go next, since an identity usually needs a set of marks rather than one.",
      },
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description:
          "Run once the mark survives in one colour, which is the correct order for building a palette around it.",
      },
      {
        href: "/design-prompts/midjourney-prompt-template",
        label: "midjourney prompt template",
        description:
          "For the imagery that sits beside the mark, where a locked style keeps a campaign coherent.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "The verbal half of the same decision, and it should be argued from the same intent sentence.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.uspto.gov/trademarks/basics/what-trademark",
        label: "USPTO: what a trademark protects",
        description:
          "Sets out what makes a mark distinctive enough to register, which is the legal reason the kill list matters.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
        label: "W3C: Understanding Non-text Contrast",
        description:
          "The contrast floor a mark has to clear when it functions as an interface element such as an app icon or button.",
      },
      {
        href: "https://developer.apple.com/design/human-interface-guidelines/app-icons",
        label: "Apple Human Interface Guidelines: app icons",
        description:
          "Platform requirements for marks rendered small, which is where the minimum stroke and element count constraints come from.",
      },
    ],
  },
};

export default meta;
