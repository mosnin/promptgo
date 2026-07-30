import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "icon-design-prompt",
  name: "Icon Geometry Spec",
  title: "Icon Design Prompt",
  category: "design-prompts",
  taskType: "generate",
  summary:
    "Specifies an icon set as measurable geometry, assigns a metaphor per concept, tables the pairs that collide at small sizes and names the concepts nobody can draw.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["icons", "geometry", "keyline grid", "iconography"],

  seo: {
    primaryKeyword: "icon design prompt",
    keywords: [
      "icon design prompt",
      "how to keep stroke weight consistent in icons",
      "how to test icons at small sizes",
      "how to use a keyline grid for icons",
      "how to brief an icon set",
      "outline icons vs filled icons",
    ],
    seoTitle: "Icon Design Prompt: Geometry Before Metaphor",
    seoDescription:
      "An icon design prompt that specifies grid, stroke and terminals as numbers, then tables which concepts collide at small sizes and which cannot be drawn.",
  },

  prompt: {
    text: `You are specifying an icon set as a geometric system. You describe construction, never style adjectives. Every rule you state must be checkable by measuring the finished vector.

WHAT THE SET IS FOR: {{PURPOSE}}
CONCEPTS TO COVER: {{CONCEPTS}}
SMALLEST RENDERED SIZE: {{MIN_SIZE}}
EXISTING VISUAL LANGUAGE: {{LANGUAGE}}

PART 1, THE SYSTEM. Give a number for each of: canvas size, live area and padding, keyline shapes for square, circle and both rectangles with their dimensions, stroke weight, terminal style, join style, outer corner radius, inner corner radius, minimum gap between two strokes, and the permitted angles for diagonals. No adjectives anywhere in this part.

PART 2, PER CONCEPT. For every concept give the metaphor in three words, the number of distinct strokes it needs, which keyline it sits on, and one alternative metaphor with the reason you rejected it.

PART 3, COLLISIONS. Table every pair of concepts that could be confused at the smallest size. For each pair, name the single distinguishing feature that must survive. Where a pair cannot be separated at that size, say so and propose merging or dropping one.

PART 4, THE UNDRAWABLE. List every concept with no reliable visual metaphor at this size, and say what to use instead: a word, a letter, or a different concept.

RULE: the minimum gap between strokes is never smaller than the stroke weight. Any concept that needs it to be smaller belongs in part 4.`,
    variables: [
      {
        token: "PURPOSE",
        label: "What the set is for",
        example:
          "Toolbar and table row actions in a clinical records product, rendered from an inline sprite",
      },
      {
        token: "CONCEPTS",
        label: "The concepts to cover",
        example:
          "search, filter, sort, export, print, share with a colleague, mark urgent, archive, undo, audit history, allergy warning",
      },
      {
        token: "MIN_SIZE",
        label: "The smallest size it renders at",
        example: "16px in table rows, 20px in the toolbar, occasionally 14px inside a badge",
      },
      {
        token: "LANGUAGE",
        label: "What the visual language already is",
        example: "Geometric sans typeface, 2px borders throughout, 4px corner radius on cards and inputs",
      },
    ],
    expectedOutput:
      "A numbered geometry specification with no adjectives, a metaphor and stroke count per concept, a collision table naming the surviving distinguishing feature, and an honest list of concepts to solve with words instead.",
    followUps: [
      "Take the collision table and redesign the worst pair so they differ in silhouette rather than in detail.",
      "Recompute the whole system for a 24px minimum and tell me which concepts move out of part 4.",
      "Write the acceptance checks a reviewer can run on a delivered vector file to confirm it follows part 1.",
    ],
    pitfalls: [
      "Without a minimum size the system comes back tuned for 24px, and roughly a third of the set will fill in when rendered at 16.",
      "Models put almost nothing in part 4 unless the concept list contains genuinely abstract ideas. If yours does and part 4 is empty, ask again about the two vaguest concepts by name.",
      "Naming an existing icon library in the language field makes the model imitate that library's metaphors rather than derive one, which quietly imports its collisions too.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Icon sets collide at small sizes long before anyone notices, because two concepts reduce to the same silhouette once detail is dropped and only a stroke direction separates them. Asking for the shape each icon resolves to at sixteen pixels catches the clash while it is cheap. The undrawable list needs pushing on abstract concepts.",
  },

  article: {
    intro: [
      "An icon design prompt that returns a description of each icon has answered the easy half. Individual icons are not hard. What is hard is twenty of them looking like one family at sixteen pixels, and no amount of describing a magnifying glass gets you there.",
      "This one specifies the system as numbers first. Canvas, live area, keylines, stroke weight, terminals, joins, corner radii, minimum gap, permitted angles. Only then does it assign metaphors, and it finishes by tabling the pairs that will be confused at the smallest size you named.",
    ],

    sections: [
      {
        heading: "A set is a system before it is a set of pictures",
        body: [
          "Anyone asking how to brief an icon set usually starts with a list of concepts, which is the second half of the job. Handed only a list, a designer or a model produces twenty individually reasonable drawings that do not sit together, because nothing constrained the construction.",
          "Geometry first inverts that. Agree the numbers, then draw against them, and consistency is a property of the system rather than of anyone's discipline. It also makes review objective: a delivered vector either measures correctly or it does not.",
        ],
      },
      {
        heading: "The numbers that make a family",
        body: [
          "How to keep stroke weight consistent in icons is the most visible of these numbers and the rule most often broken, usually by a single icon that needed a thinner line to fit its detail. That icon will read as lighter than everything around it and nobody will be able to say why the toolbar looks uneven.",
          "How to use a keyline grid for icons, with optical alignment, is the quieter work. A circle drawn to the same bounding box as a square appears smaller, so keylines exist to make different shapes look the same size rather than measure the same size. Padding, live area and per shape dimensions are what stop a set drifting as it grows past the first dozen.",
        ],
        subsections: [
          {
            heading: "The gap rule",
            body: [
              "Minimum gap never smaller than the stroke weight. It sounds fussy and it is the single rule that determines whether an icon survives being rendered at sixteen pixels or fills into a solid blob.",
            ],
          },
        ],
      },
      {
        heading: "Outline icons vs filled icons is a state decision",
        body: [
          "Outline icons versus filled icons is usually argued as taste and is better settled as function. Two weights of the same icon give you a free way to show selected against unselected, which is worth more in a navigation bar than either style is on its own.",
          "Committing to both doubles the specification work and halves the ambiguity later. The system needs to state how a filled version is derived from the outline one, or the two sets diverge in exactly the way the geometry rules were written to prevent.",
        ],
      },
      {
        heading: "The collisions nobody checks until support does",
        body: [
          "How to test icons at small sizes is a comparison, not an inspection. Any icon looks fine on its own at any size. What matters is whether two of them can be told apart in a row, at speed, by someone who is not looking closely, which is every real use.",
          "Building the pair table before drawing anything is much cheaper than discovering the problem in production. The distinguishing feature has to be something that survives the reduction: a silhouette difference works, a difference in interior detail does not, and an arrow pointing a different way is the classic example of a difference that vanishes precisely when it matters.",
        ],
      },
      {
        heading: "Why the icon design prompt admits defeat on some concepts",
        body: [
          "Part four is the section people skip and then need. Some concepts have no reliable metaphor at small sizes: audit history, permissions, sync status, anything about time or governance. Every attempt is a clock, a shield or a pair of arrows, and each of those already means three other things.",
          "The right answer is often a word. A text button labelled History is instantly understood and takes less space than the two attempts at an icon plus a tooltip explaining it. Getting a model to say so requires asking directly, because the default behaviour is to produce a metaphor for anything you name.",
        ],
      },
      {
        heading: "Handing the specification to a person or a tool",
        body: [
          "The output works as a brief for a human illustrator and as constraints for a vector generation tool, with one important difference. A person will apply optical judgement automatically, correcting alignment by eye where the numbers would be wrong.",
          "A tool will not, so if the set is being generated you need the acceptance checks written as measurements and you need to run them on every delivered file. Stroke weight, gap and live area are all machine checkable, and checking them takes seconds compared with noticing the drift six months later.",
        ],
      },
    ],

    howTo: {
      name: "How to run the icon design prompt",
      steps: [
        {
          name: "State the smallest real size",
          text: "Find where the icon renders smallest in production, including badges and dense tables. Every number in part one derives from that figure.",
        },
        {
          name: "List concepts, not icon names",
          text: "Write mark as urgent rather than flag. Naming the concept lets the metaphor be chosen, and naming the icon fixes the answer before the collision check runs.",
        },
        {
          name: "Resolve the collision table before drawing",
          text: "Work through the confusable pairs and settle each one on silhouette. A pair fixed here costs minutes, and the same pair fixed after release costs a support backlog.",
        },
      ],
    },

    faq: [
      {
        question: "Can the icon design prompt produce the actual vectors?",
        answer:
          "It produces the specification, and a capable model can draft simple shapes as vector paths from it. Expect to redraw most of them. The value is in the system and the collision analysis, which is the part that takes judgement rather than drawing time.",
      },
      {
        question: "How many icons should one set contain?",
        answer:
          "Fewer than teams expect. Twenty to thirty covers most products, and past that you tend to be inventing icons for concepts that would be clearer as labelled text. The collision table grows quadratically, which is itself a useful signal about set size.",
      },
      {
        question: "What stroke weight works at sixteen pixels?",
        answer:
          "Around 1.5 to 2 units on a 24 unit canvas, though the honest answer is that it depends on the gap rule rather than on the weight alone. Two heavy strokes with a thin space between them fill in long before a single heavier stroke does.",
      },
      {
        question: "Should I just use an existing open icon library?",
        answer:
          "Usually yes, and this prompt is still useful for the eight icons the library does not contain. Feed it the library's measurements as the existing visual language so the additions match, rather than drawing them freehand and hoping.",
      },
      {
        question: "Does the specification cover animated icons?",
        answer:
          "Not directly, though the geometry survives into motion. Specify the transition separately in terms of what changes between two states, since an icon that morphs needs its two forms to share stroke counts, and that constraint belongs in part two.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/logo-brief-prompt",
        label: "logo brief prompt",
        description:
          "The same small size discipline applied to a single mark, where the constraints come from the favicon rather than the toolbar.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description:
          "Where the finished set gets named and versioned alongside the rest of the component library.",
      },
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description:
          "Icon only buttons need an accessible name and a non text contrast ratio, both of which this audit checks.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Relevant to part four, since the concepts that cannot be drawn end up as words that have to sound like the product.",
      },
    ],

    externalLinks: [
      {
        href: "https://m3.material.io/styles/icons/designing-icons",
        label: "Material Design 3: designing icons",
        description:
          "A published keyline grid with live area and padding figures, which is the reference structure part one produces.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
        label: "W3C: Understanding Non-text Contrast",
        description:
          "Sets the contrast floor for icons that convey meaning, which constrains stroke weight as much as legibility does.",
      },
      {
        href: "https://developer.apple.com/design/human-interface-guidelines/icons",
        label: "Apple Human Interface Guidelines: icons",
        description:
          "Platform guidance on optical alignment and consistent visual weight across shapes of different geometry.",
      },
    ],
  },
};

export default meta;
