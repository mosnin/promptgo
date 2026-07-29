import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "quiz-generator-prompt",
  name: "Quiz Builder",
  title: "Quiz Generator Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Writes multiple choice and short answer questions where every wrong option is a named misconception, so the results tell you what to reteach.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["assessment", "retrieval practice", "quizzes", "misconceptions"],

  seo: {
    primaryKeyword: "quiz generator prompt",
    keywords: [
      "quiz generator prompt",
      "ai prompt for multiple choice questions",
      "writing distractors that reveal misconceptions",
      "retrieval practice questions for revision",
      "how to generate a quiz from lesson notes",
      "quiz aligned to a specification",
    ],
    seoTitle: "Quiz Generator Prompt: Distractors That Diagnose",
    seoDescription:
      "A quiz generator prompt that builds questions from your own notes and makes every wrong answer a named misconception, so the marks tell you exactly what to reteach.",
  },

  prompt: {
    text: `You are writing a diagnostic quiz. A question that everyone gets right and a question everyone guesses are both wasted, so every item has to discriminate.

TOPIC AND LEVEL: {{TOPIC}}
SPECIFICATION POINTS OR OBJECTIVES COVERED: {{SPEC}}
MY LESSON NOTES OR SOURCE MATERIAL: {{SOURCE}}
MISCONCEPTIONS I HAVE SEEN IN THIS CLASS: {{MISCONCEPTIONS}}
NUMBER AND MIX OF QUESTIONS: {{MIX}}
TIME AVAILABLE: {{TIME}}

Rules.
- Every question must be answerable from the source material I gave you. If a question needs knowledge outside it, mark the item with an asterisk and say what it assumes.
- Each multiple choice item has one correct option and three distractors. Each distractor must correspond to a specific wrong idea, and you must name that idea in the key. No filler options and no deliberately silly answers.
- At least half the distractors must come from the misconceptions I listed.
- Do not write questions whose answer can be found by matching the longest option, by elimination on grammar, or by picking the only option with a unit.
- Order the questions by the reasoning they demand, not by difficulty of recall, and say where the difficulty step happens.
- Never test two objectives in one item.

Return three blocks.
1. THE QUIZ, student facing, no answers, timed.
2. THE DIAGNOSTIC KEY. For each item: correct option, and for each distractor the misconception it indicates and what you would reteach if more than a quarter of the class picked it.
3. THE COVERAGE NOTE. Which of my specification points are not tested by this quiz, and which are tested only once and therefore unreliable.`,
    variables: [
      {
        token: "TOPIC",
        label: "Topic and level",
        example: "Moles and concentration, Year 11 higher tier chemistry",
      },
      {
        token: "SPEC",
        label: "Specification points or objectives",
        example:
          "Calculate concentration in mol per dm cubed, convert between cm cubed and dm cubed, use moles equals concentration times volume",
      },
      {
        token: "SOURCE",
        label: "Lesson notes or source material",
        example:
          "Two lessons of worked examples, all using whole number volumes, plus one titration calculation done as a class",
      },
      {
        token: "MISCONCEPTIONS",
        label: "Misconceptions seen in this class",
        example:
          "Dividing by 100 instead of 1000 when converting volume, and treating concentration as a mass rather than a ratio",
      },
      {
        token: "MIX",
        label: "Number and mix of questions",
        example: "Eight multiple choice and two short calculations shown in full",
      },
      {
        token: "TIME",
        label: "Time available",
        example: "Fifteen minutes at the start of a lesson, marked in class",
      },
    ],
    expectedOutput:
      "A student facing quiz with no answers, a key that explains what each wrong option means about the student who chose it, and an honest list of specification points the quiz fails to cover or covers only once.",
    followUps: [
      "Rewrite items three and seven so the correct answer cannot be reached by elimination without doing the calculation.",
      "Produce a version of this quiz at the same difficulty with entirely different numbers and contexts, for a retest in three weeks.",
      "Twelve of thirty students chose distractor B on question four. Plan the ten minute reteach that addresses only that misconception.",
    ],
    pitfalls: [
      "Without the misconceptions field the distractors become numerically adjacent wrong answers, which tell you a student made an arithmetic slip and nothing more.",
      "Models happily write questions on content your class has never met. The coverage note and the asterisk rule exist for that, and both are worth reading before you print.",
      "Check every calculation yourself. Wrong keys on generated numerical items are common enough that you should assume one until proven otherwise.",
    ],
  },

  eeat: {
    author: "Grace Mbeki",
    authorCredential:
      "Fourteen years teaching secondary science, the last three as a head of department writing assessment policy.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The first quiz I generated had four items where the correct answer was the only option written with a unit, and my top set found that pattern in under a minute without doing any chemistry. Banning surface cues fixed it. I still mark the key against my own working, because across roughly forty generated numerical items I have found two keys that were simply wrong.",
  },

  article: {
    intro: [
      "A quiz generator prompt that produces twenty plausible questions in ten seconds has solved the wrong problem. Questions are not the scarce resource. What is scarce is a set of questions whose results tell you something you did not already know about the class in front of you.",
      "That difference lives entirely in the wrong answers. A multiple choice item where the three incorrect options are random numbers tells you who got it right. One where each incorrect option belongs to a specific wrong idea tells you which wrong idea twelve of your students are holding, which is the difference between a mark in a book and a plan for Thursday.",
    ],

    sections: [
      {
        heading: "Distractors are the whole design",
        body: [
          "Writing distractors that reveal misconceptions is slow work by hand, which is why most classroom quizzes do not do it. You have to know the wrong routes well enough to reconstruct them: the student who divides by a hundred, the one who inverts the ratio, the one who has memorised the formula and cannot tell which quantity goes on top.",
          "This is the one part of quiz writing where a model genuinely helps, because it has seen enormous numbers of worked errors. It still needs your list first. The misconceptions field is what pins the generated distractors to your class rather than to a generic cohort, and the prompt requires at least half of them to come from it.",
        ],
      },
      {
        heading: "Surface cues that let students pass without knowing anything",
        body: [
          "Left alone, models leak the answer through form. The correct option ends up longer, or more precisely worded, or the only one that is grammatically consistent with the stem, or the only one carrying a unit.",
          "Students find these patterns quickly and they are perfectly rational to use them. The prompt bans each cue by name, which removes most of them. It is still worth reading the finished set with a cynical eye and asking whether you could answer any item with the subject knowledge covered up.",
        ],
        list: [
          "The longest option is the correct one.",
          "Only the correct option carries a unit or a sign.",
          "Two distractors are obviously silly, so the real choice is between two.",
          "The stem gives away the answer grammatically, through a or an.",
          "Consecutive items have the same lettered answer, or never do.",
        ],
      },
      {
        heading: "Generating from your notes, not from the internet",
        body: [
          "Working out how to generate a quiz from lesson notes rather than from a topic name is the difference between assessing your teaching and assessing the subject. Paste the actual material: the worked examples you used, the vocabulary you introduced, the one practical you got through.",
          "The prompt then refuses to test outside it, or flags the item if it must. That constraint stops the familiar irritation of a generated quiz that includes a perfectly reasonable question on something you have not taught yet, which produces a wave of wrong answers carrying no information at all.",
        ],
      },
      {
        heading: "Coverage, and what the quiz generator prompt admits it missed",
        body: [
          "The third output block is the one most people skip and the one that changes decisions. It lists the objectives the quiz does not test, and the ones it tests only once.",
          "A single item is a coin toss on a four option question. If a specification point matters, it needs two items in different disguises before you should believe the result. A quiz aligned to a specification is not one that mentions every point, it is one that tests the points you care about often enough for the data to mean something, and says so about the rest.",
        ],
      },
      {
        heading: "Using the results on the same day",
        body: [
          "Mark it in the lesson, by show of hands per item if necessary, and use the diagnostic key while the class is still in the room. The key names a reteach for each distractor chosen by more than a quarter of students, so the decision is already made.",
          "Retrieval practice questions for revision work on a different rhythm. The same items reappear three weeks later with different numbers, which is what the second follow up produces. Low stakes, frequent, and marked immediately beats one long test that gets returned the following week.",
        ],
      },
      {
        heading: "Multiple choice is not the only option",
        body: [
          "An ai prompt for multiple choice questions is convenient because the marking is instant, and that convenience quietly shapes what gets assessed. Anything requiring a student to construct rather than select is harder to fit into four options.",
          "Mix in two or three items that require full working. They take longer to mark but they catch the student who has been selecting correctly for two terms without ever being able to produce an answer unaided, which multiple choice alone will hide until the exam.",
        ],
      },
    ],

    howTo: {
      name: "How to use the quiz generator prompt",
      steps: [
        {
          name: "Paste the notes you taught from",
          text: "Not a topic heading. The actual examples, definitions and numbers your class saw, because those bound what the quiz is allowed to ask.",
        },
        {
          name: "List real misconceptions before generating",
          text: "Two or three from this class's books. These become the distractors that do the diagnostic work, and everything else is filler by comparison.",
        },
        {
          name: "Check every key by hand",
          text: "Work the numerical items yourself. Generated keys are wrong often enough that a class will find the error before you do.",
        },
        {
          name: "Read for surface cues",
          text: "Cover the subject content and try to answer the quiz on form alone. Anything you get right that way needs rewriting.",
        },
        {
          name: "Mark it in the room",
          text: "Instant marking is most of the value. Delayed marking turns a diagnostic into a record.",
        },
        {
          name: "Act on the coverage note",
          text: "Where a point is tested once, either add a second item or treat the result as a hint rather than evidence.",
        },
      ],
    },

    faq: [
      {
        question: "How many questions should a quiz generator prompt produce at once?",
        answer:
          "Eight to twelve for a fifteen minute slot. Beyond that quality falls, the later items start repeating earlier ones with different numbers, and the class runs out of attention before the useful diagnostic information has been collected.",
      },
      {
        question: "Are generated questions accurate enough to use unchecked?",
        answer:
          "No. Stems and distractors are usually sound, but numerical keys go wrong at a rate that will embarrass you in front of a class. Working the answers yourself takes a few minutes and is the difference between a tool and a liability.",
      },
      {
        question: "Can students use this to make their own revision quizzes?",
        answer:
          "Yes, and it is one of the better student uses because the output is questions rather than answers. Testing yourself is far more effective than rereading notes, and generating the quiz from their own notes forces them to identify what the notes actually contain.",
      },
      {
        question: "Why does it refuse to test two objectives in one question?",
        answer:
          "Because a wrong answer on a combined item is uninterpretable. You cannot tell whether the student failed at the conversion or the calculation, so the mark records that something went wrong without telling you what, which defeats the purpose of running the quiz.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description:
          "Feed the same misconception list into both, so the lesson plans for the errors the quiz is built to detect.",
      },
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "Schedules when each generated quiz returns, since the spacing matters more than the questions themselves.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The same extraction problem in another setting: turning unstructured source material into items someone can act on.",
      },
    ],

    externalLinks: [
      {
        href: "https://pubmed.ncbi.nlm.nih.gov/16507066/",
        label: "Roediger and Karpicke: Test enhanced learning",
        description:
          "The primary experiment behind low stakes testing outperforming rereading, which is the case for frequent short quizzes.",
      },
      {
        href: "https://www.gov.uk/government/collections/gcse-subject-content",
        label: "Department for Education: GCSE subject content",
        description:
          "The published content statements a quiz should be checked against when claiming specification coverage.",
      },
      {
        href: "https://platform.openai.com/docs/guides/structured-outputs",
        label: "OpenAI: Structured outputs",
        description:
          "Documents forcing a response into fixed blocks, which is how the quiz, the key and the coverage note stay separated.",
      },
    ],
  },
};

export default meta;
