import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "design-handoff-prompt",
  name: "Behaviour Spec",
  title: "Design Handoff Prompt",
  category: "design-prompts",
  taskType: "generate",
  summary:
    "Turns a component into a behaviour specification of states, content limits and reflow, and moves anything the file did not decide into a list of open decisions.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["handoff", "specification", "component states", "engineering"],

  seo: {
    primaryKeyword: "design handoff prompt",
    keywords: [
      "design handoff prompt",
      "what to include in a handoff spec",
      "edge cases for long text and empty data",
      "responsive behaviour between breakpoints",
      "open questions for engineers",
      "specifying states rather than screens",
    ],
    seoTitle: "Design Handoff Prompt: Specify Behaviour, Not Pixels",
    seoDescription:
      "A design handoff prompt that writes states, content limits and reflow behaviour, then lists every decision the file left open instead of quietly inventing one.",
  },

  prompt: {
    text: `You are writing the build specification for one component. You are not describing how it looks. Anything measurable directly from the file, such as colour, radius or exact spacing, is out of scope because the engineer already has the file. You specify behaviour.

COMPONENT: {{COMPONENT}}
WHAT THE FILE SHOWS: {{FRAMES}}
DATA IT DISPLAYS: {{DATA}}
WHERE IT IS USED: {{PLACEMENTS}}
DECISIONS ALREADY MADE ELSEWHERE: {{PRIOR}}

Write the spec in five parts.

1. STATES. Every state this component can hold: default, hover, focus visible, active, disabled, loading, empty, partial, error, read only. For each one give the trigger, what changes, and what the user can still do while it holds. Where a state is genuinely not needed, write NOT APPLICABLE with the reason.
2. CONTENT LIMITS. For every piece of text or data, give the shortest realistic value, the longest realistic value, and the behaviour when it overflows. Choose wrap, truncate with a tooltip, or clamp to a line count, and name which.
3. RESPONSE TO SIZE. What happens between the breakpoints in the file rather than at them. Name the width where each element reflows and say whether anything is hidden rather than rearranged.
4. INTERACTION DETAIL. Keyboard operation, what takes focus first, what dismisses it, and what happens on a second click or a double submit.
5. NOT DECIDED. Every question the file does not answer, written as a decision with two named options and a recommendation.

Rule: if any part of sections 1 to 4 required you to invent something, move it into section 5 instead.`,
    variables: [
      {
        token: "COMPONENT",
        label: "The component being handed over",
        example: "A patient search field with a results dropdown and a recently viewed section",
      },
      {
        token: "FRAMES",
        label: "Which frames exist in the file",
        example: "Default, focused with results, and one error frame. No empty or loading frame drawn",
      },
      {
        token: "DATA",
        label: "What it displays, with realistic extremes",
        example:
          "Full name, NHS number, date of birth. Names range from 4 to 61 characters, some with hyphens and apostrophes",
      },
      {
        token: "PLACEMENTS",
        label: "Every place it appears",
        example: "The global toolbar at 320px wide, and the full width version on the patient list page",
      },
      {
        token: "PRIOR",
        label: "Decisions already settled elsewhere",
        example:
          "Debounce is 250ms across the product, and destructive actions always require a typed confirmation",
      },
    ],
    expectedOutput:
      "Five sections covering every state with triggers, realistic content extremes with an overflow behaviour each, named reflow widths, keyboard detail, and a list of open decisions with two options and a recommendation.",
    followUps: [
      "Turn section five into a single message I can send the designer, ordered by which decision blocks the build first.",
      "Write the test cases implied by section two, using the longest realistic values rather than tidy sample data.",
      "Given the placements above, tell me which parts of this spec differ between the toolbar and the full width version.",
    ],
    pitfalls: [
      "If section five comes back empty, the model invented answers. Real files always leave something undecided, and an empty list means the guesses are hidden inside sections one to four.",
      "Sample data with tidy names produces a spec that fails on the first hyphenated surname. Give the real extremes, including the longest value in your database.",
      "Specifying pixel values here duplicates the file and the two versions drift within a fortnight. Behaviour is the thing a file cannot express.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The rule that moves inventions into section five was added after a spec confidently stated a debounce interval that appeared nowhere in the design. It read as authority and would have shipped. With the rule in place, the same input produced a section five with eleven items, four of which nobody on the team had noticed were unresolved.",
  },

  article: {
    intro: [
      "A design handoff prompt should not describe what the component looks like. The engineer has the file, can inspect it, and can read every value out of it faster than anyone can write them down. What the file cannot show is what happens when the name is sixty one characters long, when the list is empty, when the request takes four seconds, or when somebody presses the button twice.",
      "This prompt writes that half. States with triggers, content extremes with an overflow behaviour, reflow widths between the breakpoints, keyboard detail, and then the part most specifications quietly omit: a numbered list of the decisions the design did not make.",
    ],

    sections: [
      {
        heading: "A file is a photograph of one moment",
        body: [
          "Design files show chosen moments. Three frames, tidy content, everything loaded. The component that gets built has to hold ten states, and the seven that were never drawn get decided by whoever is implementing it at the time, usually correctly and always invisibly.",
          "Specifying states rather than screens moves those decisions back into the open. It is also the fastest way to find out how much of a component was never designed at all, because the list has slots and the empty ones are obvious the moment they are written down.",
        ],
      },
      {
        heading: "The undecided register",
        body: [
          "Section five is the reason this prompt exists. Language models are excellent at producing a complete looking specification, and a complete looking specification with invented details is worse than an incomplete one, because nobody knows which lines to check.",
          "Forcing every invention into a list of open questions for engineers converts confidence into a task list. Each entry names two options and a recommendation, which means the designer can answer it in a sentence rather than reopening the file. In practice that list runs to eight or twelve items on a component of any real complexity.",
        ],
        subsections: [
          {
            heading: "Answer them in writing, in the same place",
            body: [
              "Decisions settled in a chat thread are lost within a week. Answering inside the spec keeps the record next to the thing it constrains, which is what makes it worth reading again during the next change.",
            ],
          },
        ],
      },
      {
        heading: "The widths between the breakpoints",
        body: [
          "Responsive behaviour between breakpoints is where most handovers are thinnest. A file contains a mobile frame and a desktop frame, and the interesting question is what the component does at the eleven hundred pixels nobody drew.",
          "Asking for the width at which each element reflows produces a specification an engineer can implement without guessing, and it surfaces the decision that always gets made silently: whether something is hidden or rearranged. Hiding content at narrow widths is a real choice with a real cost, and it should be a sentence in a document rather than a media query written on a Thursday afternoon.",
        ],
      },
      {
        heading: "What the design handoff prompt does with awkward content",
        body: [
          "Edge cases for long text and empty data are the two that break components in production, and both are invisible in a file populated with sample content. A name field designed against Anna Smith behaves differently when it meets a hyphenated double surname, and a list designed with six rows looks unfinished with none.",
          "Requiring the shortest and longest realistic values, taken from your actual data rather than from imagination, turns this into a specification instead of a hope. The overflow decision then has to be made once, deliberately, and the same choice can be applied consistently everywhere the component appears.",
        ],
      },
      {
        heading: "A specification both sides can point at",
        body: [
          "The question of what to include in a handoff spec usually gets answered by listing artefacts: frames, tokens, redlines, a prototype. The more useful answer is anything a reasonable engineer would otherwise have to decide alone, which is a much shorter and much more specific list.",
          "The value shows up in the review rather than at the handover. When a built component behaves oddly with empty data, there is a line in the document that either specified it or did not, and both outcomes are useful. Without one, the conversation becomes a disagreement about what was obvious, and nobody wins that.",
        ],
      },
    ],

    howTo: {
      name: "How to use the design handoff prompt",
      steps: [
        {
          name: "Say which frames actually exist",
          text: "List the frames you drew and admit which states you did not. That gap is the input the model needs, not a weakness to hide.",
        },
        {
          name: "Pull real content extremes",
          text: "Query the longest value in production for each field. Two minutes here prevents the class of bug that only appears with real customer data.",
        },
        {
          name: "Include the decisions already made",
          text: "Debounce intervals, confirmation patterns, anything settled elsewhere. Otherwise the open questions list fills with things your team resolved a year ago.",
        },
        {
          name: "Read section five first",
          text: "Start at the open decisions. They are the fastest read and they determine whether the rest of the spec can be trusted at all.",
        },
        {
          name: "Answer inside the document",
          text: "Write the resolution next to the question rather than replying in a thread. The record has to live where the next person will look.",
        },
        {
          name: "Send it before the build starts",
          text: "A spec that arrives after implementation is a review document. Sent first, it turns eleven small interruptions into one conversation.",
        },
      ],
    },

    faq: [
      {
        question: "Does the design handoff prompt replace annotated frames?",
        answer:
          "It replaces the annotations that restate values already in the file, which is most of them. Keep annotations for anything genuinely spatial, such as which element anchors a layout, and let the document carry states, limits and behaviour.",
      },
      {
        question: "Who should run it, the designer or the engineer?",
        answer:
          "Either, and the results differ usefully. A designer running it finds the states they never drew. An engineer running it produces a list of questions phrased in build terms, which tends to get answered faster because each one names two options.",
      },
      {
        question: "How detailed should the data extremes be?",
        answer:
          "Use real values from your database rather than invented ones. The longest customer name, the account with no transactions, the record with three hundred entries. Invented extremes are always politer than real data and produce specifications that hold only in demos.",
      },
      {
        question: "What about animation and motion?",
        answer:
          "Specify it as triggers and reversibility rather than as durations. What starts it, what happens if it is interrupted, what a reduced motion preference changes. Durations belong in tokens, whereas interruption behaviour is exactly the kind of thing a file cannot express.",
      },
      {
        question: "Is this overkill for a small component?",
        answer:
          "For a static badge, yes. For anything that loads data, accepts input or can fail, the state list alone justifies the ten minutes, because those are the components where the undrawn states outnumber the drawn ones by a factor of two or three.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description:
          "Audits the built result, and the keyboard section here is what prevents most of what it would otherwise find.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description:
          "Decides which components deserve a spec at all, by showing which ones are used in fifty places rather than two.",
      },
      {
        href: "/design-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description:
          "Supplies the strings for the states this spec enumerates, including the ones the file never showed.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "The other side of the handover, where the spec becomes the thing a reviewer can hold the implementation against.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/WAI/ARIA/apg/patterns/",
        label: "W3C ARIA Authoring Practices: patterns",
        description:
          "Defines the expected keyboard behaviour for common components, which is the reference the interaction section should match.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
        label: "MDN: using media queries",
        description:
          "Explains why behaviour between breakpoints has to be specified separately from the breakpoints themselves.",
      },
      {
        href: "https://m3.material.io/foundations/interaction/states/overview",
        label: "Material Design 3: interaction states",
        description:
          "A published enumeration of component states, useful as the checklist the first section is filled against.",
      },
    ],
  },
};

export default meta;
