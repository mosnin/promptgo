import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "error-message-prompt",
  name: "Three Artefact Failure",
  title: "Error Message Prompt",
  category: "coding-prompts",
  taskType: "generate",
  summary:
    "Turns one failure condition into three separate artefacts: the sentence a person reads, the structured log line, and the stable code that joins them.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["error handling", "observability", "product copy", "logging"],

  seo: {
    primaryKeyword: "error message prompt",
    keywords: [
      "error message prompt",
      "user facing error message examples",
      "how to word an error message",
      "error message that tells the user what to do next",
      "ai prompt for error copy",
    ],
    seoTitle: "Error Message Prompt: Copy, Log Line and Code",
    seoDescription:
      "An error message prompt that writes the visible sentence, the structured log line and the stable error code separately, and bans anything that fits two causes.",
  },

  prompt: {
    text: `You are writing the text a system emits when an operation fails. One failure produces three artefacts: what a person sees, what lands in the log, and the stable identifier that joins them. Produce all three. Never let one of them borrow its wording from another.

THE FAILURE CONDITION: {{FAILURE}}
WHO READS THE VISIBLE MESSAGE: {{AUDIENCE}}
WHAT THE READER CAN ACTUALLY DO ABOUT IT: {{REMEDY}}
PRODUCT VOICE AND LENGTH LIMIT: {{VOICE}}

CLASSIFY FIRST. Decide whether this failure is the reader's doing, the system's doing, or a third party's doing. Blaming the wrong party is worse than saying nothing, because it sends the reader somewhere that cannot help them.

VISIBLE MESSAGE. Two sentences at most. The first names what did not happen, in the reader's vocabulary. The second gives the next action, and that action must be performable with what the reader already has in front of them. Where the remedy field says no action exists, name who to contact and what to quote them. Never emit a stack frame, an internal service name, a table or column name, a raw exception class, or a filesystem path.

LOG LINE. Structured fields rather than a sentence: the identifier, the operation, the correlation id, the field values that classify the failure, and the underlying cause quoted exactly. Exclude credentials, tokens, card numbers and whole request bodies.

IDENTIFIER. A stable code support staff can grep for, worded once and never reworded. One code per distinct cause, not one per call site.

REFUSE TO WRITE: something went wrong, an error occurred, invalid input, sorry for the inconvenience, please try again later where later is undefined, and any sentence that would be equally true of two different causes.

If the failure condition given to you actually covers several causes, split it and produce one set per cause.`,
    variables: [
      {
        token: "FAILURE",
        label: "The failure condition",
        example:
          "Card payment declined by the processor with code do_not_honor. Our retry succeeded 4 percent of the time on this code last quarter. The order is left in pending and expires after 30 minutes.",
      },
      {
        token: "AUDIENCE",
        label: "Who reads the visible message",
        example:
          "A consumer at checkout on mobile, mid purchase, who has no idea what a payment processor is and cannot see our logs.",
      },
      {
        token: "REMEDY",
        label: "What the reader can actually do",
        example:
          "Use a different card, or contact their bank. Retrying the same card almost never works. We cannot tell them why the bank declined, because the processor does not tell us.",
      },
      {
        token: "VOICE",
        label: "Product voice and length limit",
        example:
          "Plain, unapologetic, no exclamation marks. Fits 140 characters in a red banner above the pay button. British spelling.",
      },
    ],
    expectedOutput:
      "Three clearly separated artefacts: a two sentence visible message with a performable next action, a structured log line with a correlation id and the raw cause, and one stable error code, plus a note on any cause that had to be split out.",
    followUps: [
      "Write the support macro for this code, so the person on the other end of the contact form has the same vocabulary as the message.",
      "The remedy is now a self service retry with a different card. Rewrite the visible message only, leaving the code and the log line untouched.",
      "List every other place in the product that surfaces this same cause, and say whether they should share the code or get their own.",
    ],
    pitfalls: [
      "Feeding it an exception rather than a failure condition. The exception is the symptom the runtime chose to raise, and the copy that follows from it will describe an implementation detail nobody outside the team can act on.",
      "Leaving the remedy field blank produces a confident invitation to try again, which is the single most expensive sentence in error copy when the retry cannot possibly work.",
      "Approving the visible message and skipping the log line. The visible half is the one you can see in review, and the half you skipped is the one an on call engineer needs at three in the morning.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "Asked to write a declined card message, models reach for an apology and a suggestion to try again, because retrying is the generic remedy and nothing tells them it rarely works for that decline code. Making the remedy a supplied input rather than an inference removes the guess. GPT-5.2 also leaks the upstream processor name into user visible text often enough that the ban has to name it.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "An error message prompt has one job, and it is easy to state: produce text that changes what the reader does next. Most generated error copy fails on the opening clause, because it apologises before it has said what did not happen.",
      "The instruction set here splits one failure into three artefacts that get written separately. A sentence for the person in front of the screen, a structured line for the log, and a code that stays stable while both of the others are rewritten by whoever owns the copy this quarter.",
      "Treated as an ai prompt for error copy it is unusually restrictive, and that is the point. Half of it is a list of sentences the model is not allowed to produce, because those sentences are exactly the ones a language model reaches for first.",
    ],

    sections: [
      {
        heading: "User facing error message examples people can act on",
        body: [
          "Good user facing error message examples solve a product problem wearing engineering clothes. The reader is mid task, mildly annoyed, and reading at speed. They are looking for one thing: whether this is something they can fix or something they have to escalate.",
          "So the visible half gets two sentences and no more. One names the operation that did not complete, in words the reader would use. The other gives the action. Anything else, including the apology, competes for attention with the only part that matters.",
        ],
      },
      {
        heading: "Name the party at fault before you name the fix",
        body: [
          "The classification step runs before any writing, because the fault line determines the whole message. Reader error means the message is an instruction. System error means it is an acknowledgement plus a reference. Third party error is the awkward middle, where the honest message says a specific external thing failed without pretending to know why.",
          "How to word an error message follows almost mechanically once that is settled. Get it wrong and you produce the classic failure of telling somebody their input was invalid when your own validator was misconfigured, which sends a competent person off to check their data for twenty minutes.",
        ],
      },
      {
        heading: "What the error message prompt refuses to write",
        body: [
          "The banned list is short and every entry earns its place. Something went wrong is the canonical example: grammatical, sympathetic and worth nothing, because it is equally true of a network timeout, a permissions failure and a malformed postcode.",
          "That last property is the actual test the error message prompt applies. If a sentence would be just as accurate for a second, unrelated cause, it carries no information, and the reader has to guess or contact you. Both outcomes cost more than writing a specific sentence would have.",
        ],
        list: [
          "Something went wrong. True of everything, therefore useful for nothing.",
          "An error occurred. The reader already knows, since they are looking at a red box.",
          "Invalid input, with no indication of which field or what would be valid.",
          "Please try again later, where later is not defined and nothing suggests the outcome will differ.",
          "Any message that names an internal service the reader has never heard of and cannot influence.",
        ],
      },
      {
        heading: "Logging an error with a correlation id",
        body: [
          "Logging an error with a correlation id is the half users never see and engineers live in. The prompt insists on structured fields rather than a readable sentence, because the log line is read by a query far more often than by a human scrolling.",
          "The correlation id is what makes the visible message and the log line one object rather than two. A reader quotes a short code and a reference to support, support pastes it into a search, and the underlying cause is there verbatim, including the upstream text that was deliberately kept off the screen.",
        ],
      },
      {
        heading: "One code per cause, not one per call site",
        body: [
          "Error codes decay in a predictable way. Somebody adds a code at the point they happen to be editing, so the same underlying cause acquires four codes, and now nobody can count how often it happens.",
          "Binding the code to the cause rather than the location keeps the counts meaningful. It also gives you a dashboard worth looking at, since a rising count against one stable code is a signal, whereas a rising count against a code that means an error happened somewhere in checkout is not.",
        ],
      },
      {
        heading: "The remedy is the input you cannot skip",
        body: [
          "An error message that tells the user what to do next requires somebody to know what they can do next, and that knowledge does not live in the code. It lives in whether the retry succeeds, whether support can override the block, and whether the third party publishes a reason.",
          "That is why the remedy is a required field rather than something the model works out. Left empty, it will fill the gap with a suggestion that sounds helpful and is often false, and false hope in error copy converts directly into support volume.",
        ],
      },
    ],

    howTo: {
      name: "How to use the error message prompt",
      steps: [
        {
          name: "Describe the condition, not the exception",
          text: "A payment was declined with a specific processor code is a condition. A PaymentError was raised is a runtime detail, and copy derived from it will describe your stack rather than their problem.",
        },
        {
          name: "Fill the remedy field honestly",
          text: "Including when the honest answer is that nothing the reader does will help. That case produces the best messages, because the model has to name a contact route instead of suggesting a retry.",
        },
        {
          name: "Check the visible message against the ban list yourself",
          text: "Read it and ask whether a completely different cause could produce the same sentence. If it could, the message is generic and the model has quietly slipped back into its default register.",
        },
        {
          name: "Ship the log line in the same change",
          text: "Not in a follow up ticket. The correlation id is worthless unless it is emitted on both sides, and the follow up ticket is where observability work goes to be deprioritised.",
        },
      ],
    },

    faq: [
      {
        question: "Should the visible message ever include the technical cause?",
        answer:
          "Only when the reader is technical and can act on it, such as an API consumer receiving a 422 in a machine readable body. For a consumer at a checkout, the technical cause is noise that increases anxiety without giving them anything to do about it.",
      },
      {
        question: "How does the error message prompt handle validation failures?",
        answer:
          "It treats each rule as its own cause, so one form producing eight validation failures gets eight sets rather than one generic message. That is more work up front, and it is the difference between a form a person can complete and one they abandon on the third attempt.",
      },
      {
        question: "Is a stable error code worth the overhead on a small product?",
        answer:
          "Usually yes, because the overhead is one constant and the payoff arrives the first time somebody asks how often that failure happens. Without a code, answering that question means grepping for a string that the copy team changed two releases ago.",
      },
      {
        question: "What about localisation?",
        answer:
          "The code and the log line stay in English and never get translated, which is exactly why they are separated from the visible sentence. Give the translator the visible message and the classification, since knowing whether the reader is at fault changes the register in most languages.",
      },
      {
        question: "Can it write messages for an internal tool nobody outside sees?",
        answer:
          "Yes, and the audience field does the work. Set it to an operator who can read a stack trace and the ban on internal names relaxes, because for that reader the service name is the most actionable thing you could possibly put on the screen.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "api documentation prompt",
        description:
          "Once the codes are stable, they belong in the reference documentation next to the endpoints that emit them.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description:
          "The structured log line produced here is the input that diagnosis starts from when the failure recurs.",
      },
      {
        href: "/coding-prompts/security-review-prompt",
        label: "security review prompt",
        description:
          "Worth running over the log line, since the fields you chose to record are also the fields that leak.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description:
          "For the incidents where the message on the screen actively delayed the people trying to fix it.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/error-message-guidelines/",
        label: "Nielsen Norman Group: error message guidelines",
        description:
          "The standard usability reference for why an error message must state the problem and a constructive next step.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc9457.html",
        label: "RFC 9457: problem details for HTTP APIs",
        description:
          "The published standard for a machine readable error body, including the stable type identifier this prompt calls a code.",
      },
      {
        href: "https://cloud.google.com/apis/design/errors",
        label: "Google API design guide: errors",
        description:
          "Primary vendor guidance on separating a stable error code from human readable text that is free to change.",
      },
      {
        href: "https://opentelemetry.io/docs/concepts/signals/traces/",
        label: "OpenTelemetry: trace and span context",
        description:
          "The specification behind the correlation identifier that ties a visible message to the log line that explains it.",
      },
    ],
  },
};

export default meta;
