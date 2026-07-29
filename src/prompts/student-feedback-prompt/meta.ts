import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "student-feedback-prompt",
  name: "Feedback Writer",
  title: "Student Feedback Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Converts your marking notes into feedback that quotes the student's own work, names one next step, and refuses to invent evidence you did not give it.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["feedback", "marking", "assessment", "reports"],

  seo: {
    primaryKeyword: "student feedback prompt",
    keywords: [
      "student feedback prompt",
      "how to write feedback students act on",
      "reducing marking time without losing quality",
      "feedback that names the next step",
      "ai prompt for writing report comments",
      "whole class feedback instead of individual comments",
    ],
    seoTitle: "Student Feedback Prompt: One Next Step, Every Time",
    seoDescription:
      "A student feedback prompt that works from your marking notes, quotes the work back, gives exactly one next step and never invents evidence it was not shown.",
  },

  prompt: {
    text: `You are a teacher writing feedback on one piece of student work. You have limited words and the student has limited patience, so nothing goes in that does not change what they do next.

THE TASK THEY WERE SET: {{TASK}}
THE OBJECTIVE: {{OBJECTIVE}}
MY MARKING NOTES ON THIS PIECE: {{NOTES}}
SHORT QUOTES FROM THEIR WORK: {{QUOTES}}
WHAT THIS STUDENT NEEDS FROM ME: {{CONTEXT}}
LENGTH LIMIT: {{LENGTH}}

Absolute rules.
- Use only evidence I have given you. If you want to praise or criticise something not present in my notes or quotes, say what you would need to see instead of asserting it.
- Quote or point to a specific place in their work at least twice. Feedback with no location in the text cannot be acted on.
- Give exactly one next step. Not three. Choose the one that unlocks the most, and say why that one.
- No sandwich structure and no adverbs of quality. Do not write good effort, well done or a solid attempt.
- Write the next step as an instruction the student could begin in five minutes, with the first sentence or first move stated.

Output.
1. WHAT THIS WORK DOES. Two sentences, evidence based, naming what the student can already do.
2. THE ONE THING. The next step, why it matters for the objective, and how to start it.
3. A CHECK. One question the student answers in their book to prove they have understood the next step.
4. WHAT I COULD NOT TELL FROM YOUR NOTES. Anything you suspect matters that my notes did not cover.`,
    variables: [
      {
        token: "TASK",
        label: "The task they were set",
        example: "Explain why the rate of a reaction falls over time, using collision theory, in one paragraph",
      },
      {
        token: "OBJECTIVE",
        label: "The objective",
        example: "Students can link a change in concentration to a change in collision frequency and then to rate",
      },
      {
        token: "NOTES",
        label: "Your marking notes",
        example:
          "Knows the particles run out. Never mentions collisions at all. Correct vocabulary elsewhere in the book, so it is not a language problem",
      },
      {
        token: "QUOTES",
        label: "Short quotes from their work",
        example:
          "It slows down because the acid gets used up and there is less left to react with the marble",
      },
      {
        token: "CONTEXT",
        label: "What this student needs from you",
        example: "Gives up quickly when a comment implies the whole answer was wrong. Responds well to being asked a question",
      },
      {
        token: "LENGTH",
        label: "Length limit",
        example: "Sixty words maximum, handwritten at the end of the page",
      },
    ],
    expectedOutput:
      "A short comment that quotes the student's own words back at them, names one next step with an opening move they could start immediately, and adds a check question, with no praise adverbs anywhere.",
    followUps: [
      "Rewrite this for a student who has had three consecutive pieces marked down for the same reason and is losing confidence.",
      "Collapse the comments from these twelve students into one whole class feedback sheet with three shared next steps and a five minute task for each.",
      "Turn the check question into a starter for the next lesson so I do not have to mark the responses separately.",
    ],
    pitfalls: [
      "Handing over the whole script and asking for feedback produces confident comments about things the student did not write. Give notes and quotes, not the essay, and the invention problem largely disappears.",
      "Asking for three next steps guarantees none of them happens. The single step constraint is doing the work here.",
      "Section four is the one to read. When it says it could not tell whether the student understood the underlying idea, it is usually right, and that is a conversation rather than a comment.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "I tried this first by pasting whole scripts and it praised structure that was not there in two of the six I checked, which is worse than useless on a returned book. Switching the input to marking notes plus two short quotes stopped it. The comments now take me about the same time to produce as writing them, but they are better, and the check question is the part students actually respond to.",
  },

  article: {
    intro: [
      "A student feedback prompt is not a marking robot and should not be sold as one. The reading of the work is the part that cannot be delegated, because judging whether a paragraph shows understanding is the professional act. What can be delegated is the twenty minutes after that, spent turning six words of scrawled marking notes into something a fourteen year old can act on.",
      "So this prompt takes notes and quotes rather than scripts. It writes from what you observed, refuses to assert anything you did not give it, and produces one next step instead of the three that get read and forgotten.",
    ],

    sections: [
      {
        heading: "Why most written feedback changes nothing",
        body: [
          "Comments fail for predictable reasons. They describe the work rather than the next move. They arrive attached to a mark, which is what the student looks at. They contain three suggestions, so the student picks none. Or they are so general that the same sentence could be written on twenty books, and students notice that faster than we like to admit.",
          "The research on this is unusually consistent: feedback improves performance when it tells the learner what to do differently, and can reduce performance when it directs attention to the self rather than the task. Which is why every praise adverb is banned in this prompt. Well done tells a student nothing except that you were in a good mood.",
        ],
      },
      {
        heading: "The single next step rule",
        body: [
          "Feedback that names the next step, and only one, is the central constraint. It forces a choice the marker was avoiding: of the four things wrong with this paragraph, which one, if fixed, would improve the rest?",
          "In science that is often not the most visible error. A student who has written a conclusion with no reference to the data has a different problem from one whose maths is wrong, and fixing the maths first leaves the real gap untouched. The prompt makes the model state why it chose that step, which is how you catch it choosing the easiest one.",
        ],
      },
      {
        heading: "Working from notes rather than the script",
        body: [
          "Handing a model an entire piece of work and asking for feedback invites it to fill gaps with plausible generalities, and it will praise a structure that is not present. The fix is to invert the flow of information: you supply the evidence, it supplies the phrasing.",
          "This is also what makes the arrangement honest. You have read the work. The comment is grounded in your observations, and the model is doing the composition. Reducing marking time without losing quality only works in that direction, and anyone using it the other way round is generating comments about work nobody read.",
        ],
      },
      {
        heading: "What the student feedback prompt does about tone",
        body: [
          "The context field exists because the same next step lands differently depending on who receives it. A student who reads any criticism as a verdict needs the step framed as a question. A confident student who coasts needs it framed flatly.",
          "This is not softening. The content stays identical, and the prompt is explicitly barred from adding reassurance that is not backed by evidence in your notes. Knowing how to write feedback students act on is mostly about keeping the substance constant while changing only the door it comes through.",
        ],
      },
      {
        heading: "Scaling to a full set of books",
        body: [
          "Thirty individual comments is three hours, and the fifth one is better than the twenty fifth. The follow up that produces whole class feedback instead of individual comments is usually the better trade: mark the set, note the three errors that recur, and generate one sheet with a five minute task attached to each.",
          "Individual comments then go only to the students whose work sits outside those three patterns, which is normally five or six books. The class gets a task rather than a paragraph, and you get the marking done in an evening.",
        ],
        list: [
          "Read the set first with a tally sheet, not a pen. Patterns before comments.",
          "Give the model the three recurring errors and a real quote for each.",
          "Ask for a five minute fix task per error, not an explanation of the error.",
          "Write individual comments only for work that does not fit the patterns.",
          "Start the next lesson with the tasks, not with handing books back.",
        ],
      },
      {
        heading: "Report comments are a different job",
        body: [
          "An ai prompt for writing report comments is tempting for exactly the reason it is risky. Reports are written in bulk under deadline, they go to parents, and they are the most quoted piece of writing a teacher produces.",
          "The same rule applies with more force: supply the evidence yourself. A report sentence generated from a grade and an adjective will be indistinguishable from every other one in the year group, and a parent who compares two reports will spot it. Give it two dated observations per student and it produces something defensible.",
        ],
      },
    ],

    howTo: {
      name: "How to use the student feedback prompt",
      steps: [
        {
          name: "Mark with notes, not comments",
          text: "Go through the set writing four or five words per book in your own shorthand plus one quotable phrase. That is the input, and it is much faster than composing as you read.",
        },
        {
          name: "Add the one line of context",
          text: "Say how this student receives criticism. It changes the framing and nothing else, and it is the difference between a comment that is read and one that is skipped.",
        },
        {
          name: "Check the next step is startable",
          text: "Read the step and ask whether a student could begin it in the first minute of a lesson. If it says improve your analysis, send it back and name the paragraph.",
        },
      ],
    },

    faq: [
      {
        question: "Is using a student feedback prompt fair to students?",
        answer:
          "It is fair as long as the judgement is yours. You read the work, you decide what it shows, and the model phrases the result. What is not fair is generating comments from a grade alone, because the student then receives writing that was never about their work.",
      },
      {
        question: "Should students know feedback was drafted with a model?",
        answer:
          "Tell them if they ask, and answer honestly. Most schools now expect disclosure of assistive use, and the answer is straightforward: you read and judged the work, and used a tool to write the comment more clearly than you would have at eleven at night.",
      },
      {
        question: "Why only one next step when there are obviously several?",
        answer:
          "Because a student can hold one instruction between now and the next piece of work. Three suggestions become a list to be surveyed rather than a thing to be done, and the evidence on acting rates is fairly clear that the count matters more than the wording.",
      },
      {
        question: "Can this write feedback on work I have not read?",
        answer:
          "No, and it is built to make that difficult. It only uses evidence you supply, so with no notes and no quotes it has nothing to say. If you feed it a script directly it will produce fluent comments about details it has partly invented.",
      },
      {
        question: "How long should a written comment be?",
        answer:
          "Shorter than most departments require. Sixty words is enough for one observation, one step and one check. Length policies exist to prove marking happened, which is a monitoring problem rather than a learning one, and long comments are read less carefully.",
      },
      {
        question: "Does the check question really need to be there?",
        answer:
          "It is the only part that produces evidence the feedback landed. A comment with no response leaves you guessing until the next assessment, whereas one sentence written under the comment tells you in ten seconds whether the student understood what you asked for.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description:
          "The row a student fell short on is the natural source for the single next step this prompt has to choose.",
      },
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "When the same next step recurs across three pieces of work, it belongs in a revision schedule rather than another comment.",
      },
      {
        href: "/education-prompts/reading-comprehension-prompt",
        label: "reading comprehension prompt",
        description:
          "Useful when the marking notes suggest the student understood the science but misread what the question asked for.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "The adult version of the same discipline: evidence with dates, one priority, and no adjectives standing in for observation.",
      },
    ],

    externalLinks: [
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback",
        label: "Education Endowment Foundation: Teacher Feedback to Improve Pupil Learning",
        description:
          "The guidance report behind the claim that feedback works when it directs a specific action, and that timing matters less than actionability.",
      },
      {
        href: "https://psycnet.apa.org/record/1996-10163-001",
        label: "Kluger and DeNisi: Feedback intervention theory",
        description:
          "The meta analysis showing that a third of feedback interventions reduce performance, which is the basis for banning self directed praise.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Gemini prompting strategies",
        description:
          "Documents grounding a response in supplied evidence, the technique this prompt uses to stop invented observations about student work.",
      },
    ],
  },
};

export default meta;
