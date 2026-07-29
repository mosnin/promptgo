import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "accessibility-review-prompt",
  name: "Three Verdict Audit",
  title: "Accessibility Review Prompt",
  category: "design-prompts",
  taskType: "evaluate",
  summary:
    "Audits one component criterion by criterion with three verdicts, names the artefact needed to settle anything undecidable, and writes the screen reader announcement.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["accessibility", "wcag", "screen readers", "keyboard"],

  seo: {
    primaryKeyword: "accessibility review prompt",
    keywords: [
      "accessibility review prompt",
      "wcag checks you can do from a screenshot",
      "focus order and keyboard traps",
      "how to review a component for accessibility",
      "colour contrast failures in ui components",
      "what a screen reader announces",
    ],
    seoTitle: "Accessibility Review Prompt: Pass, Fail, Or Unknown",
    seoDescription:
      "An accessibility review prompt with three verdicts, so undecidable criteria are named rather than guessed, plus the screen reader announcement and tab order.",
  },

  prompt: {
    text: `You are auditing one component against WCAG 2.2 at level AA. You have three verdicts and you must use all three honestly: PASS, FAIL, and CANNOT DETERMINE. A guessed pass ends a review, so admitting a gap is always the better answer.

COMPONENT: {{COMPONENT}}
WHAT I CAN GIVE YOU: {{ARTEFACTS}}
HOW IT IS BUILT: {{IMPLEMENTATION}}
WHO USES THE PRODUCT: {{USERS}}

Work criterion by criterion through the success criteria that apply to this component. Where a criterion cannot apply, say so in one line and move on.

For each applicable criterion, output the criterion number and name, the verdict, and the evidence you actually used. For a FAIL, give the specific change. For a CANNOT DETERMINE, name the single artefact that would settle it: the rendered markup, a keyboard walkthrough, a screen reader recording, or the computed styles.

Then produce two things that are not criteria.
1. THE ANNOUNCEMENT. Write what a screen reader reads aloud as someone tabs through this component. One line per stop, in order, including state changes. Mark any line that would be ambiguous heard on its own.
2. THE ORDER. List the tab stops in sequence and flag any stop that cannot be left using the keyboard alone.

Rank the FAIL items by how many people are blocked outright rather than inconvenienced. Never rank by how easy the fix looks.`,
    variables: [
      {
        token: "COMPONENT",
        label: "The single component under review",
        example:
          "A date range picker: two text inputs, a calendar popover with month navigation, and preset shortcut buttons down the left",
      },
      {
        token: "ARTEFACTS",
        label: "What you can actually supply",
        example: "A screenshot of the open state, the rendered markup, and the computed styles for the inputs",
      },
      {
        token: "IMPLEMENTATION",
        label: "How it is built, honestly",
        example:
          "Divs with click handlers for the day cells, a real input for each field, popover rendered in a portal at the end of body",
      },
      {
        token: "USERS",
        label: "Who uses it and under what pressure",
        example: "Clinical staff, keyboard heavy, many using 200 percent browser zoom on shared machines",
      },
    ],
    expectedOutput:
      "A criterion by criterion list with three possible verdicts, a named artefact beside every undecidable item, a line by line screen reader announcement, the tab order, and failures ranked by who is blocked.",
    followUps: [
      "Take the highest ranked failure and write the fix as a markup diff with the roles and attributes spelled out.",
      "Rerun the announcement assuming the popover is open and the user has already selected a start date.",
      "List every criterion you marked CANNOT DETERMINE and tell me the fastest single test that resolves the most of them at once.",
    ],
    pitfalls: [
      "If nothing comes back as CANNOT DETERMINE, the model is guessing. A screenshot alone cannot settle focus order, name computation or reflow, and a clean report from thin evidence is the failure mode to watch for.",
      "Describing the implementation as accessible components produces a report that audits your description rather than your code. Say what is really there, including the divs with click handlers.",
      "Automated tooling catches roughly a third of issues. This prompt covers a different third, mostly the judgement calls, and neither substitutes for testing with an actual screen reader.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "With only pass and fail available, a model marks criteria it has no evidence for, confirming focus order and tab sequence from a static image. Adding a third verdict for what cannot be determined turns those lines into the useful ones, because each has to name the artefact that would settle the question.",
  },

  article: {
    intro: [
      "An accessibility review prompt with only two verdicts will lie to you. Ask a model whether a component meets a criterion, give it a screenshot, and it will answer pass or fail on every line, including the criteria that are physically impossible to judge from an image. A confident clean report is the worst outcome available, because it ends the review.",
      "Adding a third verdict changes the character of the output. Pass, fail, and cannot determine without a named artefact. In testing, about a quarter of criteria move into the third bucket, and each of those lines tells you what to go and get.",
      "The prompt also produces two things no criterion list contains: what a screen reader reads out at each tab stop, and the order those stops occur in.",
    ],

    sections: [
      {
        heading: "The third verdict is the whole design",
        body: [
          "Binary judgements force a model to resolve uncertainty in one direction, and language models resolve it towards the confident answer. On a criterion like name, role, value, a screenshot supports no conclusion at all, yet a two verdict prompt will produce one and sound sure about it.",
          "Requiring the model to name the artefact that would settle the question converts uncertainty into a task. The DOM, a keyboard walkthrough, a screen reader recording, the computed styles. Four artefacts resolve nearly everything, and knowing which one you need is most of the work.",
        ],
      },
      {
        heading: "What an image supports and what it does not",
        body: [
          "The wcag checks you can do from a screenshot are a real and limited set. Visible focus indication when the image shows a focused state, text spacing and reflow at the captured width, target size for interactive elements, meaningful sequence in the visual order, and colour contrast where you can sample the values.",
          "Colour contrast failures in ui components are the most commonly caught issue from an image and also the most commonly caught in the wrong place. Body text usually passes because somebody checked it once. Placeholder text, disabled buttons, the hairline between table rows and the focus ring on a raised surface fail routinely and are never sampled, because nobody thinks of them as text.",
        ],
        subsections: [
          {
            heading: "Criteria a static image can never settle",
            body: [
              "Focus order, accessible name and role, status messages, keyboard operability, and anything to do with timing. If a report claims a verdict on these from an image alone, treat the entire document as unverified.",
            ],
          },
        ],
      },
      {
        heading: "Why the accessibility review prompt writes the announcement",
        body: [
          "What a screen reader announces is the single most clarifying artefact in this whole area, and almost nobody on a design team has ever read one written down. A visually tidy component often announces as button, button, button, edit, blank, which makes the problem obvious in a way a criterion number never does.",
          "Asking for one line per tab stop, in order, with state changes included, also catches the ambiguity problem. An announcement of remove is fine while you are looking at the row it belongs to and useless heard on its own, and that distinction is what the mark ambiguous instruction surfaces.",
        ],
      },
      {
        heading: "Focus order and keyboard traps deserve their own pass",
        body: [
          "Focus order and keyboard traps are separated out because they are properties of the whole component rather than of any one element, so they slip through a criterion by criterion sweep. A popover rendered in a portal at the end of the document is the classic example: every individual element passes, and the tab sequence jumps from the field to the page footer.",
          "The trap half is simpler and more serious. Any stop that cannot be left with the keyboard alone is a blocking defect regardless of what else the component does well, and custom widgets built from div elements with click handlers produce them constantly.",
        ],
      },
      {
        heading: "Rank by who is blocked, not by what is easy",
        body: [
          "Anyone learning how to review a component for accessibility discovers quickly that the list is long and the ranking decides what actually gets fixed. Ranking by effort puts the eight quick contrast tweaks first and leaves the keyboard trap in the backlog, which is the wrong order for every user who cannot use a mouse.",
          "Blocked and inconvenienced are different categories and should never be merged into a single severity score. One person locked inside a modal is a more urgent defect than forty low contrast captions, even though the captions look worse in a report and are considerably cheaper to fix.",
        ],
      },
    ],

    howTo: {
      name: "How to run the accessibility review prompt",
      steps: [
        {
          name: "Bring more than a picture",
          text: "Paste the rendered markup alongside the screenshot. It moves most of the cannot determine lines into real verdicts and takes a minute to collect.",
        },
        {
          name: "Describe the build honestly",
          text: "Say where divs are standing in for buttons and where a popover is portalled. Those two details predict most of the failures the report will find.",
        },
        {
          name: "Work the cannot determine list first",
          text: "Each line names one artefact. Gather them, rerun, and the report converts to real verdicts rather than staying a document of open questions.",
        },
      ],
    },

    faq: [
      {
        question: "Does the accessibility review prompt replace automated testing?",
        answer:
          "No, they cover different ground. Automated tools reliably catch missing alternative text, invalid markup and measurable contrast, and cannot judge whether a label is meaningful or whether the focus order matches the visual sequence. Run both, then test with a real screen reader before shipping.",
      },
      {
        question: "Which WCAG version should I target?",
        answer:
          "Set it explicitly in the prompt. WCAG 2.2 AA is the common legal reference in most jurisdictions and adds criteria on target size and focus appearance that matter for touch interfaces. Naming the version stops the model mixing in criteria from a different release.",
      },
      {
        question: "Can it review a whole page rather than one component?",
        answer:
          "It degrades on a full page because the announcement and tab order sections become too long to be read carefully. Component by component keeps both artefacts short enough to be useful, and page level criteria such as landmarks are worth a separate run.",
      },
      {
        question: "How accurate is the screen reader announcement?",
        answer:
          "It approximates the pattern rather than any specific product. Real output differs between JAWS, NVDA and VoiceOver, particularly around state changes. Use it to spot ambiguity and missing names, then verify the component with the reader your users actually have.",
      },
      {
        question: "What if the component is not built yet?",
        answer:
          "Run it against the design plus a description of the intended markup. You will get many cannot determine lines, and the announcement section still works as a design review artefact, often changing the labels before anybody writes the component.",
      },
      {
        question: "Should designers run this or engineers?",
        answer:
          "Both, at different moments. A designer running it on a frame catches naming and contrast issues while they are cheap to change. An engineer running it on the built markup catches the structural failures, which is where the blocking defects nearly always are.",
      },
      {
        question: "Why rank failures by users blocked?",
        answer:
          "Because a severity score that blends effort and impact ends up sorting by effort. Separating the two makes the trade off visible: you can still choose to ship the easy fixes first, but you do it knowing a blocking defect stayed in the backlog.",
      },
      {
        question: "Does it handle two hundred percent zoom and reflow?",
        answer:
          "Partly. It can flag layouts likely to break from a description of the breakpoints, and it cannot see what actually happens. Capture a screenshot at 400 percent zoom in a 1280 pixel window and pass that as a second artefact if reflow matters to your users.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/colour-palette-prompt",
        label: "colour palette prompt",
        description:
          "Fixes contrast at the token level, which removes most of the failures this review keeps finding one component at a time.",
      },
      {
        href: "/design-prompts/design-handoff-prompt",
        label: "design handoff prompt",
        description:
          "Specifies states and behaviour before the build, which is where the keyboard defects are cheapest to prevent.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "The right place to catch a reintroduced div with a click handler before it reaches a review like this one.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/WAI/WCAG22/quickref/",
        label: "W3C: How to Meet WCAG 2.2",
        description:
          "The criterion list the audit walks through, with the exact wording each verdict is measured against.",
      },
      {
        href: "https://webaim.org/projects/million/",
        label: "WebAIM Million: annual accessibility report",
        description:
          "Measured data on which failures are most common across the web, which supports the emphasis on contrast and naming.",
      },
      {
        href: "https://www.section508.gov/test/testing-overview/",
        label: "Section508.gov: testing overview",
        description:
          "A government testing process that separates what tooling can verify from what requires a human, mirroring the third verdict.",
      },
    ],
  },
};

export default meta;
