import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "concept-explanation-prompt",
  name: "Concept Explainer",
  title: "Concept Explanation Prompt",
  category: "education-prompts",
  taskType: "rewrite",
  summary:
    "Explains one idea at the level of what the learner already knows, states where its own analogy breaks, and ends with a question that tests whether it worked.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["explanation", "analogy", "prior knowledge", "teaching"],

  seo: {
    primaryKeyword: "concept explanation prompt",
    keywords: [
      "concept explanation prompt",
      "explaining a difficult concept to a student",
      "analogy that does not break down",
      "ai prompt for explaining like i am fifteen",
      "worked example followed by a check question",
      "explanation pitched at prior knowledge",
    ],
    seoTitle: "Concept Explanation Prompt: Analogies With Limits",
    seoDescription:
      "A concept explanation prompt that starts from what the learner already knows, marks where its analogy stops working, and finishes with a question to check it landed.",
  },

  prompt: {
    text: `You are explaining one concept to one learner. You are not writing a textbook entry and you are not summarising a field. Everything you write is aimed at this person understanding this idea.

THE CONCEPT: {{CONCEPT}}
WHO I AM EXPLAINING IT TO: {{LEARNER}}
WHAT THEY ALREADY KNOW THAT IS RELEVANT: {{PRIOR}}
WHERE THEY GET STUCK: {{STICKING_POINT}}
WHY THEY NEED IT: {{PURPOSE}}

Constraints.
- Build only on the prior knowledge I listed. If the explanation needs something else, stop and tell me what has to be taught first rather than assuming it.
- Introduce at most three new terms. Define each one at the point of first use, in a sentence that does not contain another undefined term.
- You may use one analogy. Immediately after it, state plainly where the analogy stops being true and what a learner would get wrong if they pushed it too far.
- Do not open with a definition. Open with the problem the concept solves or the thing it lets you predict.
- Do not use the words simply, just, obviously, or clearly. If something needs those words to sound easy, the explanation is not doing its job.

Structure your answer as.
1. THE PROBLEM this idea exists to solve, in two sentences.
2. THE EXPLANATION, building from the prior knowledge listed, one step per paragraph.
3. THE ANALOGY, and immediately after it, THE LIMIT OF THE ANALOGY.
4. A WORKED EXAMPLE using a case close to the sticking point.
5. ONE CHECK QUESTION whose answer requires the idea rather than the example, plus the answer you expect and one plausible wrong answer with what it would reveal.
6. WHAT I HAVE ASSUMED that you should verify before using this.`,
    variables: [
      {
        token: "CONCEPT",
        label: "The concept",
        example: "Dynamic equilibrium in a reversible reaction",
      },
      {
        token: "LEARNER",
        label: "Who you are explaining it to",
        example: "A Year 12 chemistry student who is confident with rates but new to equilibria",
      },
      {
        token: "PRIOR",
        label: "Relevant prior knowledge",
        example:
          "Knows that rate depends on concentration, has met collision theory, has never seen a reaction described as going both ways at once",
      },
      {
        token: "STICKING_POINT",
        label: "Where they get stuck",
        example: "Believes equilibrium means the reaction has stopped, and that the amounts must be equal",
      },
      {
        token: "PURPOSE",
        label: "Why they need it",
        example: "To predict the direction of shift when conditions change, in a test next week",
      },
    ],
    expectedOutput:
      "An explanation that opens with a problem rather than a definition, uses one analogy with its failure point stated in the next sentence, and closes with a check question plus the wrong answer that would tell you it did not land.",
    followUps: [
      "Give me a second explanation of the same idea that uses a completely different starting point, so I have an alternative for students the first one loses.",
      "Rewrite section two as something I can say out loud in ninety seconds at the board without notes.",
      "The student answered the check question with the plausible wrong answer. What do I say next, without restating the explanation?",
    ],
    pitfalls: [
      "Leaving the prior knowledge field vague produces an explanation aimed at nobody, usually pitched at an undergraduate who has already met half the vocabulary.",
      "The limit of the analogy is the section to keep. Cutting it for length is how a useful comparison becomes next year's misconception.",
      "If the check question can be answered by repeating the worked example with different numbers, send it back. It is testing the example rather than the idea.",
    ],
  },

  eeat: {
    author: "Grace Mbeki",
    authorCredential:
      "Fourteen years teaching secondary science, the last three as a head of department writing assessment policy.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The analogy limit clause came from an actual mess. A generated explanation compared electron shells to planetary orbits with no caveat, my Year 10s took it literally, and I spent a lesson the following term undoing it. Requiring the failure point in the very next sentence has held up across every subject I have tried since, including two I do not teach.",
  },

  article: {
    intro: [
      "A concept explanation prompt is judged by one thing: whether the person on the other end can now do something they could not do before. Not whether the prose was elegant, and not whether the summary was accurate. Accuracy is cheap and does very little on its own.",
      "Explaining a difficult concept to a student is a matching problem. The idea has to be assembled out of parts the learner already possesses, which means the explanation cannot be written until you know what those parts are. That is why the prompt refuses to start without them.",
      "It also does something unusual with analogies. It uses one, then immediately says where it stops being true, because an unlabelled analogy has a habit of becoming the misconception you spend next term dismantling.",
    ],

    sections: [
      {
        heading: "Prior knowledge is the input, not the audience label",
        body: [
          "Asking for something suitable for a fifteen year old gets you shorter sentences and no more. Age tells the model about vocabulary; it says nothing about which conceptual footholds exist.",
          "An explanation pitched at prior knowledge is built differently. Told that a student is fluent with reaction rates but has never seen a reaction run in both directions, the model can construct equilibrium out of two rates becoming equal, which is a route that only exists for that learner. Told nothing, it produces the textbook definition with a friendlier tone.",
        ],
        subsections: [
          {
            heading: "Naming the sticking point",
            body: [
              "The second field matters as much. If you know the student believes equilibrium means the reaction has stopped, the explanation can be aimed at that belief specifically, rather than presenting the correct account and hoping it displaces the incorrect one by adjacency. It rarely does.",
            ],
          },
        ],
      },
      {
        heading: "Every analogy breaks, so say where",
        body: [
          "There is no analogy that does not break down somewhere, and the useful question is whether the break happens inside the territory the learner will walk into. Comparing current to water in a pipe survives series circuits and fails at capacitance. That is fine if capacitance is two years away and disastrous if it is next week.",
          "The prompt therefore requires the limit to be stated in the sentence after the comparison. Students remember the caveat when it arrives attached, and forget it entirely when it arrives a paragraph later or in a footnote. It also gives you, the teacher, a quick check on whether the analogy was well chosen at all.",
        ],
      },
      {
        heading: "Opening with the problem, not the definition",
        body: [
          "Definitions are compressed answers to questions nobody has asked yet. Opening with one asks the learner to hold a string of undefined terms in mind on the promise that it will make sense shortly.",
          "Starting with what the idea lets you predict inverts that. The learner has a reason to want the machinery before the machinery arrives, and the definition, when it comes, is a summary of something they have already partly built. This is also why the prompt bans the word obviously, which appears exactly where an explanation has skipped a step.",
        ],
      },
      {
        heading: "What the concept explanation prompt does at the end",
        body: [
          "A worked example followed by a check question is the closing move, and the order matters. The example demonstrates the reasoning on a case near the sticking point; the check question then requires the idea rather than the example, so it cannot be answered by pattern matching the numbers.",
          "The model also supplies the plausible wrong answer and what it would reveal. That single line is what makes the explanation testable in a classroom. You do not have to interpret a confused response from scratch, because you have already been told what one particular confusion looks like.",
        ],
      },
      {
        heading: "Students explaining things to themselves",
        body: [
          "An ai prompt for explaining like i am fifteen is one of the most common student uses of a chatbot, and it is largely harmless, which is more than can be said for most of them. Nothing generated here is submittable and nothing substitutes for the student's own work.",
          "The risk is subtler. Reading a clear explanation feels like understanding, and that feeling is a poor guide. Students should treat the check question as compulsory rather than optional, and if they cannot answer it without scrolling up, the explanation has not landed and reading it again will not help.",
        ],
      },
    ],

    howTo: {
      name: "How to use the concept explanation prompt",
      steps: [
        {
          name: "Write down the two or three things they can already do",
          text: "Be specific and recent. Has met collision theory beats knows some chemistry, because only the first gives the explanation somewhere to start.",
        },
        {
          name: "State the wrong belief, not the missing knowledge",
          text: "Students are rarely empty. Naming what they currently think is true gives the model a target, and the explanation changes shape completely when you do.",
        },
        {
          name: "Read the analogy limit before the analogy",
          text: "If the break happens somewhere your course goes soon, ask for a different comparison rather than accepting the caveat.",
        },
        {
          name: "Test the check question on the student",
          text: "Ask it before you offer any help. Their first answer tells you whether to move on or to run the alternative explanation from the first follow up.",
        },
      ],
    },

    faq: [
      {
        question: "How is the concept explanation prompt different from asking what is X?",
        answer:
          "A bare question returns an encyclopedia entry aimed at nobody in particular. This one is constrained by a named learner, their prior knowledge and their specific confusion, so the output is a route from where they are rather than a description of the destination.",
      },
      {
        question: "Should I trust the subject content it produces?",
        answer:
          "Read it before using it. On mainstream curriculum content the explanations are usually sound, but confident errors appear in edge cases and in anything involving a numerical worked example. A teacher scanning for accuracy takes a minute and catches nearly all of them.",
      },
      {
        question: "Why limit it to three new terms?",
        answer:
          "Because working memory is the constraint that decides whether an explanation lands. Every undefined term is something the learner has to hold while following the argument, and past about three the following stops happening and the reading becomes decoding.",
      },
      {
        question: "Can I use this to explain something I do not understand myself?",
        answer:
          "Cautiously. It will produce something fluent, and fluency is exactly what you cannot evaluate without subject knowledge. Use it to find a better route through material you know, and for genuinely unfamiliar content check the explanation against a textbook before teaching it.",
      },
      {
        question: "What if the student still does not understand?",
        answer:
          "Do not repeat the explanation more loudly. Run the first follow up, which produces a different starting point rather than a rewording, since the original route probably relied on a foothold this learner does not actually have.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/socratic-tutor-prompt",
        label: "socratic tutor prompt",
        description:
          "Use after the explanation, when the student needs questioning rather than telling to find out whether it actually landed.",
      },
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description:
          "The explanation is one part of a lesson, and the plan decides how many minutes it deserves and what follows it.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "The same discipline applied to register: pitching writing at a defined reader rather than at a general audience.",
      },
    ],

    externalLinks: [
      {
        href: "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
        label: "IES: Organizing instruction and study to improve student learning",
        description:
          "The practice guide behind pairing worked examples with a question the learner answers unaided, rather than examples alone.",
      },
      {
        href: "https://link.springer.com/article/10.1007/s10648-019-09465-5",
        label: "Sweller et al: Cognitive architecture and instructional design",
        description:
          "The primary source for limiting new terminology, since element interactivity is what makes an explanation fail rather than its length.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples",
        label: "Anthropic: Using examples in prompts",
        description:
          "Documents the example driven pattern the worked example and check question section depends on to stay concrete.",
      },
    ],
  },
};

export default meta;
