import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "code-explanation-prompt",
  name: "Layered Reader",
  title: "Code Explanation Prompt",
  category: "coding-prompts",
  taskType: "summarise",
  summary:
    "Describes the mechanics before it guesses at purpose, marks every inference with the evidence behind it, and ends with the questions only commit history answers.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["legacy code", "onboarding", "comprehension", "side effects"],

  seo: {
    primaryKeyword: "code explanation prompt",
    keywords: [
      "code explanation prompt",
      "separating what the code does from why",
      "ai prompt for explaining what a function does",
      "spotting hidden side effects in a function",
      "explaining unfamiliar code to a new engineer",
      "understanding a legacy codebase quickly",
    ],
    seoTitle: "Code Explanation Prompt: Mechanics Before Intent",
    seoDescription:
      "A code explanation prompt that walks the mechanics before guessing at purpose, labels each inference with its evidence, and names what only commit history answers.",
  },

  prompt: {
    text: `You are explaining code to someone who has to change it. Keep three things apart at all times: what the code mechanically does, what it guarantees to a caller, and why it might exist. The third is inference and must be labelled as inference every single time.

THE CODE: {{CODE}}
LANGUAGE, FRAMEWORK AND VERSION: {{STACK}}
WHY I AM READING THIS: {{PURPOSE}}
WHAT I ALREADY KNOW ABOUT THE SURROUNDING SYSTEM: {{NEIGHBOURS}}

SECTION A: MECHANICS. Walk the control flow in execution order rather than line order. Say what each branch does with which value. Use no language of purpose here: no in order to, no so that, no this ensures. Where an identifier promises something the code does not implement, point that out.

SECTION B: OBSERVABLE CONTRACT. What a caller may rely on: return values by class of input, exceptions and their exact types, mutation of arguments, and the ordering of side effects. Mark each entry ENFORCED where the code actively checks it, or INCIDENTAL where it merely happens to hold today.

SECTION C: SIDE EFFECTS AND REACH. Everything touched beyond the return value: network calls, file and database access, globals, environment variables, caches, logs, metrics, background work, and any object of the caller's that ends up modified. For each one, state whether it also happens on the error path.

SECTION D: INFERRED INTENT. Only here may you say why. Every claim carries the textual evidence it rests on and a confidence of high, medium or low. Where two readings fit the evidence equally well, give both instead of picking one.

SECTION E: WHAT ONLY A HUMAN CAN ANSWER. The questions that need commit history, a ticket or the original author. Phrase each so it can be answered in one sentence.

Do not suggest improvements and do not rewrite anything. If you notice a probable defect, record it as one line under section D and continue.`,
    variables: [
      {
        token: "CODE",
        label: "The code to explain",
        example:
          "A 90 line reconcile_ledger() in finance/reconcile.rb with two nested loops, a rescue that swallows StandardError, and a call to a memoised helper defined in another module.",
      },
      {
        token: "STACK",
        label: "Language, framework and version",
        example: "Ruby 3.2, Rails 7.1, Sidekiq for background jobs, Postgres 15 behind ActiveRecord.",
      },
      {
        token: "PURPOSE",
        label: "Why you are reading it",
        example:
          "I need to add a second currency and I have to know what will break. I do not care about style and I am not refactoring it this week.",
      },
      {
        token: "NEIGHBOURS",
        label: "What you know about the surrounding system",
        example:
          "It runs nightly from a cron job, and a support tool calls the same method ad hoc. The ledger table has roughly forty million rows and no unique index on the pairing column.",
      },
    ],
    expectedOutput:
      "A purpose free walk through the control flow, a contract split into enforced and incidental guarantees, a full list of side effects marked for whether they occur on the error path, inferences with confidence levels, and a short list of questions for a human.",
    followUps: [
      "Take every entry you marked INCIDENTAL and tell me which one a caller is most likely already depending on.",
      "Rewrite section A as a numbered sequence I can read alongside the code, with the line ranges attached.",
      "Assume the rescue block is deliberate rather than accidental. What would have to be true elsewhere in the system for that to be reasonable?",
    ],
    pitfalls: [
      "Skipping the purpose field produces a general tour instead of an answer. Saying that you are adding a currency changes which branches get depth and which get a sentence.",
      "A model reading a well named function will describe the name rather than the body. Section A bans purpose language precisely to stop that, and it is worth re-reading the output for the ban being ignored.",
      "Confidence labels are calibrated loosely. Treat medium as unknown, and check anything on which you are about to base a change.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testingNote:
      "The ban on purpose language in section A came from a run where a method called validate_and_send was described as validating and sending, when the validation branch had been commented out at some point and never restored. Both models repeated the name back at me until the ban went in, after which Claude Opus 4.5 caught the dead branch immediately.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
  },

  article: {
    intro: [
      "A code explanation prompt has one failure worth designing around: the model reads an identifier, infers what the code is for, and then narrates the body as though it does that. Well named code gets described accurately by accident. Badly named or half finished code gets described as the name suggests, which is exactly the code you needed help with.",
      "The fix is ordering. This prompt produces the mechanics first with purpose language banned outright, then the observable contract, then the side effects, and only after all three is it allowed to say why any of it exists. Used as an ai prompt for explaining what a function does, that sequence is what stops the explanation being a paraphrase of the function name.",
      "Every inference in the final section carries the evidence it rests on and a confidence level, so you can see which parts of the explanation would survive being wrong.",
    ],

    sections: [
      {
        heading: "Separating what the code does from why",
        body: [
          "Separating what the code does from why is the whole design. They are different kinds of claim with different reliability. The mechanics are recoverable from the text in front of you. The intent lives in a ticket from 2021, a conversation nobody wrote down, and a constraint that stopped applying two migrations ago.",
          "Mixing them produces confident nonsense, because a plausible purpose makes the mechanical description bend towards it. Once the model has decided a function deduplicates records, an early return that actually drops records gets narrated as part of the deduplication rather than as the bug it is.",
        ],
      },
      {
        heading: "How the code explanation prompt marks its guesses",
        body: [
          "Section D allows inference and constrains it. Each claim about intent needs the specific text it is drawn from, plus high, medium or low confidence, and where two readings fit equally the model gives both rather than choosing the tidier one.",
          "That constraint is what makes the code explanation prompt safe to use on code you are about to modify. You can act on a high confidence claim backed by a variable name and a call site. You know to go and check a medium one before it becomes an assumption inside your change.",
        ],
      },
      {
        heading: "Spotting hidden side effects in a function",
        body: [
          "Spotting hidden side effects in a function is the part that most often changes someone's plan. A method that appears to compute a value may also write a cache entry, emit a metric, mutate the list you handed it, and enqueue a background job, and none of that is visible from the signature.",
          "Section C enumerates all of it and then asks the question people forget: does this also happen on the error path. A function that writes a row and then throws leaves the system in a state neither branch of your new code is written for, and that detail is worth more than the rest of the explanation combined.",
        ],
      },
      {
        heading: "Explaining unfamiliar code to a new engineer",
        body: [
          "Explaining unfamiliar code to a new engineer usually goes wrong by being too complete. A full tour of a module is unusable on day three. What helps is a specific answer to a specific question, with the rest compressed.",
          "The purpose field controls that. Telling the prompt you are adding a second currency makes the money handling get paragraphs and the logging get a clause, and the questions in section E come back scoped to the change rather than to the module in general.",
        ],
      },
      {
        heading: "Understanding a legacy codebase quickly",
        body: [
          "Understanding a legacy codebase quickly is a sampling problem rather than a reading problem. You cannot read it all, so the value is in picking the right dozen functions and getting a reliable account of each.",
          "Running this on one function at a time and keeping the section E questions produces a list of unknowns that accumulates into something useful. After ten functions the repeated questions point at the parts of the system where nothing is written down, which is where the risk in any change is concentrated.",
        ],
      },
      {
        heading: "The questions worth taking to a person",
        body: [
          "Section E is deliberately last and deliberately narrow. Not what does this do, which the earlier sections answered, but the things text cannot settle: whether a workaround is still needed, which caller the odd parameter exists for, whether a limit was measured or guessed.",
          "Phrasing each as a one sentence question matters more than it looks. A colleague will answer a specific question in a message. Nobody answers a request to explain a module, and that is the request people default to when they have not narrowed down what they actually need.",
        ],
      },
    ],

    howTo: {
      name: "How to use the code explanation prompt",
      steps: [
        {
          name: "Say what you are about to change",
          text: "The purpose field decides where the depth goes. Reading for a bug fix, a migration or a review produces three different explanations of the same function, and all three are shorter than a general tour.",
        },
        {
          name: "Include the helpers it calls, or say you have not",
          text: "Paste the small ones inline. For the rest, name them in the neighbours field, since an unexplained call is where a side effect hides and the model will otherwise assume it is pure.",
        },
        {
          name: "Check the incidental entries against real callers",
          text: "Anything marked incidental in the contract is a behaviour nothing enforces. Grep the call sites before you change one, because incidental behaviour is depended on constantly and never documented.",
        },
      ],
    },

    faq: [
      {
        question: "Is this different from asking a model to add comments?",
        answer:
          "Yes, and the difference is where the output lives. Comments are committed and become wrong silently as the code changes. This produces an explanation for one reading session, with confidence levels and open questions attached, which is not something you would ever want checked into a repository.",
      },
      {
        question: "How much code should I paste at once?",
        answer:
          "One function, or one class if it is small. Section A walks control flow in execution order, which stops being coherent once the flow spans several files, and the side effect list gets long enough that the important entries stop standing out.",
      },
      {
        question: "What if the code has no tests and no documentation?",
        answer:
          "That is the case it is built for. With nothing else available the observable contract section becomes your specification, and the split between enforced and incidental tells you which parts of it are actually held in place by the code rather than by habit.",
      },
      {
        question: "Can I trust the confidence labels?",
        answer:
          "Directionally, not numerically. High confidence claims backed by quoted evidence held up well in testing, while medium was closer to a coin flip. Treat anything below high as a question rather than a finding, especially if a change you are planning depends on it.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description:
          "The observable contract produced here is the input that refactor needs before anything is allowed to move.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "api documentation prompt",
        description:
          "When the function you just read is an endpoint handler and the explanation needs to become something published.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For the knowledge that lives in a person rather than a file, which is what section E keeps surfacing.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags",
        label: "Anthropic: separating sections in a prompt",
        description:
          "Vendor documentation on delimiting output sections, which is what keeps the mechanics and the inference from bleeding together.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Glossary/Side_effect",
        label: "MDN: side effects",
        description:
          "A precise definition of the term used in section C, including the cases people forget such as mutation of a passed reference.",
      },
      {
        href: "https://google.github.io/eng-practices/review/developer/",
        label: "Google engineering practices: the change author's guide",
        description:
          "Authoritative guidance on describing a change so a reader can follow it, which is the same problem in the opposite direction.",
      },
    ],
  },
};

export default meta;
