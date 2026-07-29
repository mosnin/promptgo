import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "ux-writing-prompt",
  name: "State by State Microcopy",
  title: "UX Writing Prompt",
  category: "design-prompts",
  taskType: "generate",
  summary:
    "Writes every string in a flow state by state, inside a character limit, and returns the strings it could not write as questions for the engineer.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["microcopy", "ux writing", "interface copy", "error messages"],

  seo: {
    primaryKeyword: "ux writing prompt",
    keywords: [
      "ux writing prompt",
      "how to write button labels with ai",
      "microcopy for empty and error states",
      "character budget for interface copy",
      "rewriting error messages users can act on",
      "voice and tone rules for product copy",
    ],
    seoTitle: "UX Writing Prompt: Every String, Every State",
    seoDescription:
      "A ux writing prompt that covers all eight interface states, holds each string to a character limit and lists the copy it could not write without an answer.",
  },

  prompt: {
    text: `Act as the writer embedded in a product team. You are writing every string in one flow, not a sample of the nicest ones. Copy a user cannot act on is a defect and you treat it as one.

FLOW: {{FLOW}}
PRODUCT VOICE: {{VOICE}}
LIMITS: {{LIMITS}}
WHAT THE SYSTEM ACTUALLY DOES: {{BEHAVIOUR}}

Return a table with four columns: state, string, character count, what the user can do immediately after reading it.

Write one row for each state below, including the rows where the right answer is that nothing should be shown.
default, loading past two seconds, empty on first use, empty after filtering, partial success, error the user caused, error the system caused, success.

RULES
Never write please, sorry, oops, or an exclamation mark. Never name an internal service, a status code or a database table. Never imply the user did something stupid.
Respect every limit in LIMITS. If a string cannot fit, write the row as OVER BUDGET and give the shortest honest version plus its count, rather than truncating a word.
Every error row must contain a next action written as a verb the reader can perform in the next ten seconds.
Button labels must start with a verb and name the object it acts on.

After the table, list every string you could not write because BEHAVIOUR does not say what the system does. Phrase each one as a direct question for the engineer.`,
    variables: [
      {
        token: "FLOW",
        label: "The flow you are writing for",
        example: "Inviting a teammate to a shared workspace by email address",
      },
      {
        token: "VOICE",
        label: "How the product sounds, in prohibitions if possible",
        example: "Direct and unhurried. No jokes, no exclamation, never says we are excited",
      },
      {
        token: "LIMITS",
        label: "Character limits per surface",
        example: "Buttons 24 characters, inline errors 90, empty state heading 40 with 120 of body",
      },
      {
        token: "BEHAVIOUR",
        label: "What the system really does, including the awkward parts",
        example:
          "The invite expires after 7 days, an existing user joins instantly, and an invite to an address on a blocked domain fails silently today",
      },
    ],
    expectedOutput:
      "A table covering all eight states with a character count on every row, error rows that each contain a performable verb, and a closing list of open questions aimed at the engineer.",
    followUps: [
      "Rewrite every row for a reader at a lower reading age without shortening the next action, and show both counts side by side.",
      "Take the error the system caused row and write three variants: one that offers a retry, one that offers a workaround, one that offers neither because there is nothing to do.",
      "Translate the table into a second language and flag every row where the character limit no longer holds.",
    ],
    pitfalls: [
      "Filling BEHAVIOUR with a tidy summary of the happy path produces tidy copy for states that never occur. The awkward details are the ones that generate the useful questions.",
      "Models produce their weakest work on partial success, because most training text does not contain any. Expect to rewrite that row yourself.",
      "If you skip the limits, everything comes back roughly forty percent too long and reads well in the document and never fits the component.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The character count column started as a convenience and turned out to be the enforcement mechanism. Asked for a limit without a count, both models wrote strings that were comfortably over and asserted they were within budget. Made to print the number beside each string, they began self correcting mid table. Gemini still miscounts by one or two on strings with punctuation.",
  },

  article: {
    intro: [
      "A ux writing prompt that produces one polished sentence at a time is solving the wrong problem. Interface copy fails as a set, not as individual strings: the button is confident, the error beneath it is apologetic, the empty state was never written at all and ships as a blank rectangle with a spinner that never resolves.",
      "This version writes the whole set in one pass, state by state, with a character count printed beside every string and a mandatory next action in every error. It ends by listing the strings it could not write, phrased as questions for whoever knows what the system actually does.",
    ],

    sections: [
      {
        heading: "Strings are a set, and consistency lives in the gaps",
        body: [
          "Copy written string by string drifts. The confirmation dialogue says remove, the toast that follows says deleted, and the undo link says restore, so a user has to work out that three words describe one event. Nobody chose that inconsistency. It emerged because each string was written on a different day in a different ticket.",
          "Voice and tone rules for product copy work better as prohibitions than as adjectives. Friendly and human gives a model nothing to enforce. No exclamation marks, never say oops, never apologise for a state the user chose, all produce visible changes in the output and can be checked line by line afterwards.",
        ],
      },
      {
        heading: "Where microcopy for empty and error states actually breaks",
        body: [
          "Two empty states are worth writing separately and almost nobody does. First use empty means the feature has never been used, so the copy should teach and invite. Empty after filtering means the data exists but the current filter hides it, so the copy should offer a way back. Shipping one string for both leaves half your users being taught something they already know.",
          "Errors split the same way. An error the user caused needs a correction they can make in the field they are looking at. An error the system caused needs an honest statement and either a retry or a genuine workaround, and where neither exists the copy should say so rather than inventing hope. Rewriting error messages users can act on is the highest return hour of writing in most products, because those strings appear at the exact moment someone is deciding whether to give up.",
        ],
        subsections: [
          {
            heading: "The row people forget",
            body: [
              "Partial success. Six of eight invitations sent, two rejected by a blocked domain. It is common in real systems, absent from most design files, and it is where the copy has to carry information no other state needs to convey.",
            ],
          },
        ],
      },
      {
        heading: "Counting characters before writing the sentence",
        body: [
          "A character budget for interface copy is not a stylistic preference, it is a fact about the component. A button that fits twenty four characters at the default type size will wrap or truncate at thirty, and truncation in a destructive confirmation is a real hazard rather than an aesthetic one.",
          "Giving the model the limits changes what it writes, but only if it must also print the count. Without a visible number the response confidently claims to be inside a budget it has exceeded. With one, the model tends to catch itself and shorten the string on the same row.",
        ],
      },
      {
        heading: "The ux writing prompt writes verbs, not labels",
        body: [
          "The question of how to write button labels with ai comes up more than any other, and the fix is a single rule: start with a verb and name the object. Submit is a verb with no object. Send invitation is both, and it survives being read out of context by a screen reader, in a confirmation dialogue, or in a list of recent activity.",
          "The same rule quietly improves error copy. Check the address and try again names the action and its object. Something went wrong names neither, which is why it is the most common string in software and the least useful.",
        ],
      },
      {
        heading: "Open questions are part of the deliverable",
        body: [
          "The closing list is the part teams underestimate. When the model cannot write a string because nobody has decided what happens to an invitation after seven days, that gap was already in the product. Writing the copy is simply the first activity that makes it impossible to ignore.",
          "Send the questions to the engineer as they come out, unedited. In review after review they are more valuable than the copy above them, because each one is a decision that would otherwise have been made silently in a pull request at half past five on a Friday.",
        ],
      },
    ],

    howTo: {
      name: "How to run the ux writing prompt",
      steps: [
        {
          name: "Measure the components first",
          text: "Get the real character limits from the built components, not from the design file. Twenty minutes with a developer gives you numbers that hold.",
        },
        {
          name: "Write the behaviour honestly",
          text: "Include expiries, silent failures and the states nobody has designed. Tidy input produces copy for a product you do not have.",
        },
        {
          name: "State the voice as prohibitions",
          text: "List the words and punctuation the product never uses. A model can enforce a ban and cannot enforce an adjective.",
        },
        {
          name: "Read the error rows first",
          text: "Check each one contains a verb the reader can perform immediately. Any row that only explains has failed, however well it reads.",
        },
        {
          name: "Route the questions, do not answer them",
          text: "Send the closing list to whoever owns the behaviour. Guessing an answer buries the decision back inside the copy where nobody will find it.",
        },
      ],
    },

    faq: [
      {
        question: "Can the ux writing prompt match an existing product voice?",
        answer:
          "Better than expected, if you paste four or five real strings you consider correct alongside the prohibitions. Abstract voice documents produce generic results, whereas concrete examples of approved copy give the model a pattern it can imitate at the sentence level.",
      },
      {
        question: "Why ban the word please?",
        answer:
          "Because it is almost always attached to an instruction the interface is requiring rather than requesting. Please enter a valid email is not a request, it is a validation rule, and the politeness makes the sentence longer without making the correction any clearer.",
      },
      {
        question: "Should error strings mention what went wrong technically?",
        answer:
          "Only when the detail changes what the reader does next. A status code helps nobody in the flow, though it can go in a copyable diagnostic block for support. The visible string should describe the situation in the user's terms and name one action.",
      },
      {
        question: "How do I handle strings that will be translated?",
        answer:
          "Set the character limit around thirty percent below the English target, since German and Finnish routinely expand past that. Ask for the count column in both languages once you have translations, and expect the button rows to be the first to break.",
      },
      {
        question: "Does this replace a content designer?",
        answer:
          "No, it replaces the blank document. The model reliably produces complete coverage of states and a competent first pass, and it consistently misjudges tone at the emotional moments: failed payments, account deletion, anything involving another person's data.",
      },
      {
        question: "What if my product genuinely has no voice guidelines?",
        answer:
          "Run the prompt with three prohibitions you are confident about and let the output show you the rest. Reading forty generated strings and marking the ones that sound wrong is a faster route to a voice document than starting with a workshop.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description:
          "Once the strings are consistent, the components underneath them usually need the same consolidation treatment.",
      },
      {
        href: "/design-prompts/user-flow-prompt",
        label: "user flow prompt",
        description:
          "Produces the state list this prompt writes against, including the dead ends nobody has drawn yet.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Turns scattered examples of approved copy into the prohibitions this prompt can actually enforce.",
      },
    ],

    externalLinks: [
      {
        href: "https://design-system.service.gov.uk/styles/error-message/",
        label: "GOV.UK Design System: error messages",
        description:
          "Government service standard for error copy, tested at national scale and specific about naming the correction.",
      },
      {
        href: "https://developers.google.com/style/error-messages",
        label: "Google developer documentation style guide: error messages",
        description:
          "A published house rule set for error strings, useful as the prohibition list this prompt enforces.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html",
        label: "W3C: Understanding Error Suggestion",
        description:
          "The accessibility criterion that requires a correction to be offered, which is why the next action column is mandatory.",
      },
    ],
  },
};

export default meta;
