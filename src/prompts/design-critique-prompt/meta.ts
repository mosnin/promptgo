import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "design-critique-prompt",
  name: "Forced Critique",
  title: "Design Critique Prompt",
  category: "design-prompts",
  taskType: "evaluate",
  summary:
    "Forces a model to name the single element damaging your hierarchy most, rate the damage and propose one fix, instead of listing nine equal suggestions.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["critique", "visual hierarchy", "ui review", "feedback"],

  seo: {
    primaryKeyword: "design critique prompt",
    keywords: [
      "design critique prompt",
      "how to critique a screen layout",
      "visual hierarchy feedback from ai",
      "critique prompt for figma screenshots",
      "ranked severity design feedback",
      "spot the weakest element in a layout",
    ],
    seoTitle: "Design Critique Prompt: One Verdict, Not Nine Notes",
    seoDescription:
      "A design critique prompt that names the single element damaging your hierarchy most, rates the damage and gives one fix. Ranked, specific, no reassurance.",
  },

  prompt: {
    text: `You are a design critic reviewing one screen. You give judgements, not reassurance. Never say the design looks good overall, and never present more than one problem as the main problem.

SCREEN: {{SCREEN}}
WHAT THIS SCREEN IS FOR: {{GOAL}}
WHO USES IT: {{AUDIENCE}}
WHAT I ALREADY KNOW IS WRONG: {{KNOWN_ISSUES}}

Answer in this order and no other.

1. WEAKEST ELEMENT. Name the single element that damages the visual hierarchy most. One element, not a category. State which element it is competing with for attention, and which of the two should win given the goal above.
2. SEVERITY. Rate it blocking, serious or cosmetic. Justify the rating by describing what a user does wrong because of it, not by describing how it looks.
3. THE ONE FIX. The smallest change that resolves it, expressed as size, weight, spacing, position or contrast. No redesigns and no second option.
4. PROTECTED. Name one thing that is currently working, and state what would break if the fix in step 3 were applied carelessly.
5. RANKED REMAINDER. The next three issues in descending order of damage, one line each, with no fixes attached.
6. OUT OF SCOPE. What you could not judge here: motion, focus order, real content lengths, loading and empty states.

Mention anything in KNOWN_ISSUES only to say whether it is more or less damaging than the element you named in step 1.`,
    variables: [
      {
        token: "SCREEN",
        label: "The screen, pasted as an image or described",
        example:
          "Checkout summary: page title 32px semibold, order table with 4 rows, a promo code field in a bordered box, then a green Pay Now button 16px regular at the bottom right",
      },
      {
        token: "GOAL",
        label: "The one action the screen exists to support",
        example: "Confirm the total is right and pay without leaving to find a promo code",
      },
      {
        token: "AUDIENCE",
        label: "Who uses it and under what conditions",
        example: "Returning shoppers on mobile, usually mid task and often on a poor connection",
      },
      {
        token: "KNOWN_ISSUES",
        label: "Problems you have already spotted",
        example: "The promo box is too prominent and the delivery estimate is buried",
      },
    ],
    expectedOutput:
      "One named element, a severity rating tied to a user behaviour, a single concrete fix in units of size or spacing, a protected element, three ranked remainders and an honest out of scope list.",
    followUps: [
      "Apply the fix from step 3 to the description I gave you, then rerun steps 1 and 2 on the changed screen and tell me whether the weakest element moved.",
      "Argue the opposite case: make the strongest possible defence of the element you named as weakest.",
      "Rewrite the ranked remainder assuming this screen is used one handed on a 5 inch phone in daylight.",
    ],
    pitfalls: [
      "Leaving the goal line vague turns the critique into generic composition advice about balance and breathing room, which applies to every screen and improves none of them.",
      "If the protected element comes back as something abstract like the clean overall feel, the model did not parse your description and the verdict above it is probably guesswork too.",
      "Running it on three screens in one message collapses the ranking. The forced choice only works when there is one hierarchy to judge.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Ranked lists of problems come back flat. Asked for the top three issues, models produce three of equal severity, phrased so evenly that nobody in the review can tell which to act on first. Restricting the critique to one element and requiring a competing element to argue against forces judgement instead of reassurance.",
  },

  article: {
    intro: [
      "A design critique prompt is only worth running if it is willing to say something uncomfortable. Ask a model whether a layout works and it will tell you the layout works, then offer nine small suggestions of equal weight, none of which you will act on. The version here forces a single judgement instead: which one element damages the hierarchy most, and what a user does wrong because of it.",
      "The mechanism is forced ranking. The model may name exactly one weakest element, must state which element it loses attention to, and must rate the damage before it is allowed to propose anything. Everything else is demoted to a one line list with no fixes attached.",
      "That constraint changes the shape of the response. Instead of a survey you get a verdict you can disagree with, and a verdict you can disagree with is the only kind of feedback that moves a file forward.",
    ],

    sections: [
      {
        heading: "Feedback that ranks beats feedback that lists",
        body: [
          "Most visual hierarchy feedback from ai arrives as a set of nine observations of equal weight. The button could be larger, the spacing could be tighter, the heading could carry more weight. Every item is individually defensible and the set is useless, because a list with no ordering hands the whole decision straight back to you.",
          "Ranked severity design feedback is harder for a model to produce and much more useful to receive. Ranking requires comparing two problems against a stated goal, and the comparison is where the reasoning becomes visible. When the ranking is wrong you can usually see precisely which assumption caused it.",
        ],
      },
      {
        heading: "Why the design critique prompt starts with the goal",
        body: [
          "The goal line is not background context, it is the measuring stick. A pricing page and a settings screen have opposite hierarchies, and a model that does not know which one it is looking at falls back on composition platitudes about balance and alignment.",
          "Write the goal as one user action rather than a description. Compare three plans and choose one produces a different critique from communicate our pricing clearly. The first names a task that the hierarchy either supports or obstructs, which gives every later judgement something to be measured against.",
        ],
      },
      {
        heading: "The protected element clause",
        body: [
          "Step four asks what is currently working and what would break if the fix were applied without care. It exists because critique tools cause collateral damage. A model told to raise the prominence of a primary action will cheerfully propose changes that flatten the one part of the page that was already doing its job.",
          "Naming a protected element is also a comprehension test. If the answer is something vague about the clean overall feel, the model has not parsed your screen and the verdict above it deserves a rerun with a better description.",
        ],
      },
      {
        heading: "What a still frame hides",
        body: [
          "Step six is the honesty clause. A static image conceals motion, focus order, real content lengths and every loading, empty and error state, and models will confidently critique all of them anyway by quietly assuming defaults.",
          "Used as a critique prompt for figma screenshots this matters more than it sounds, because the frame you exported is the happy path with tidy placeholder content. An explicit out of scope list stops a fluent paragraph about an interaction that does not exist yet.",
        ],
      },
      {
        heading: "Describing a screen when you cannot paste an image",
        body: [
          "Anyone working out how to critique a screen layout with a text only model has to write the description, and the description sets the ceiling on the answer. Give reading order first, then relative sizes and weights, then colour roles, then spacing groups. Pixel values matter far less than relationships.",
        ],
        list: [
          "Reading order: what the eye lands on first, second and third.",
          "Relative size and weight of each text element rather than exact values.",
          "Colour roles: surface, ink, accent, and where each one appears.",
          "Spacing groups: which elements sit close enough to read as a single unit.",
          "Anything repeated: rows, cards, list items, and how many are visible at once.",
        ],
      },
      {
        heading: "Reading the verdict without arguing with it",
        body: [
          "Asking a model to spot the weakest element in a layout will sometimes produce an answer you are certain is wrong. That is a useful outcome. Write down why it is wrong before dismissing it, because the reason is almost always a piece of context you left out of the prompt and have probably never said out loud to your reviewers either.",
          "When the verdict is right, resist fixing all four items at once. Apply the one fix, export the frame again, run it again. The second pass on a changed file is where the tool earns its keep, because the ranking shifts and you can see what the change actually bought.",
        ],
      },
    ],

    howTo: {
      name: "How to run the design critique prompt",
      steps: [
        {
          name: "Write the goal as one action",
          text: "State the single thing a user must accomplish on this screen. Everything the critique says will be measured against that sentence, so vagueness here costs you the whole answer.",
        },
        {
          name: "Give reading order before pixels",
          text: "Whether you paste an image or describe it, lead with what the eye hits first. Relationships between elements produce better critique than a list of exact measurements.",
        },
        {
          name: "Declare what you already know",
          text: "List the problems you have spotted yourself. The model then has to position its verdict against them rather than telling you what you already knew.",
        },
        {
          name: "Fix one thing and rerun",
          text: "Apply only the single fix, then run the prompt again on the updated frame. If the weakest element does not move, the fix was not the right size.",
        },
      ],
    },

    faq: [
      {
        question: "Will the design critique prompt work from a screenshot alone?",
        answer:
          "Yes with a multimodal model, though the goal and audience lines still do most of the work. Without them the response drifts towards generic composition notes, because an image alone does not tell the model which of two competing elements is supposed to win attention.",
      },
      {
        question: "What should I do when I disagree with the element it picked?",
        answer:
          "Write out your counter argument before dismissing the answer. In practice the disagreement usually reveals context that lives only in your head, such as a business constraint or a known user behaviour, and that context belongs in the prompt and in your next review.",
      },
      {
        question: "Can I review a whole flow rather than a single screen?",
        answer:
          "Not with this one. The forced choice depends on there being one hierarchy to rank, and three screens in a single message produce three unranked verdicts. Run it per screen, then compare the severity ratings across the set to decide which screen to open first.",
      },
      {
        question: "Does it work on marketing pages and print layouts?",
        answer:
          "It works anywhere there is a stated goal and competing elements, so posters, slides and long marketing pages are all fine. The out of scope section becomes less relevant for print, since there is no motion or focus order to exclude from the judgement.",
      },
      {
        question: "Why forbid a second option in the fix step?",
        answer:
          "Because offering alternatives is how a model avoids committing. Two options with balanced pros and cons return the decision to you unchanged, which is the outcome the whole structure is designed to prevent. One fix can be tested, measured and rejected.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description:
          "Run after the hierarchy fix, since raising contrast on one element often breaks the ratio on another.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description:
          "Turns the surviving design into the behaviour spec an engineer can build from, states and edge cases included.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "The same forced ranking idea applied to a diff, where severity ordering matters just as much.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/ten-usability-heuristics/",
        label: "Nielsen Norman Group: 10 usability heuristics",
        description:
          "The reference set most critique vocabulary derives from, useful for naming why an element damages a hierarchy.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/vision",
        label: "Anthropic: vision capabilities",
        description:
          "Documents what a model can and cannot reliably read from an interface screenshot, which is what the out of scope step is built around.",
      },
      {
        href: "https://developer.apple.com/design/human-interface-guidelines/layout",
        label: "Apple Human Interface Guidelines: Layout",
        description:
          "Platform level guidance on hierarchy and prominence, useful as the standard your critique is implicitly arguing against.",
      },
    ],
  },
};

export default meta;
