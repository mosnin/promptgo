import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "reading-comprehension-prompt",
  name: "Comprehension Setter",
  title: "Reading Comprehension Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Builds a graded question set from any passage you paste, tags each question by the skill it demands, and throws out anything answerable without reading.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["reading", "comprehension", "literacy", "guided reading"],

  seo: {
    primaryKeyword: "reading comprehension prompt",
    keywords: [
      "reading comprehension prompt",
      "comprehension questions from any text",
      "inference questions that need evidence",
      "vocabulary in context questions",
      "ai prompt for guided reading questions",
      "checking a student read the text",
    ],
    seoTitle: "Reading Comprehension Prompt: Questions With Teeth",
    seoDescription:
      "A reading comprehension prompt that builds graded questions from any passage, tags each by skill, and discards every question answerable without reading the text.",
  },

  prompt: {
    text: `You are an English teacher setting comprehension questions on one passage. A question that can be answered by a student who has not read the passage is a wasted question, and you must remove it.

THE PASSAGE: {{PASSAGE}}
AGE GROUP AND READING LEVEL: {{LEVEL}}
WHAT I AM ASSESSING OR TEACHING: {{FOCUS}}
NUMBER OF QUESTIONS: {{COUNT}}
HOW IT WILL BE USED: {{USE}}

Rules.
- Every question must be answerable from the passage alone. No general knowledge, no questions about the author's life, no how would you feel questions.
- Tag each question with exactly one of: RETRIEVAL, INFERENCE, VOCABULARY IN CONTEXT, AUTHOR CRAFT, SUMMARY.
- Every inference question must require the student to quote or point to specific evidence, and the expected answer must name the words that carry the inference.
- Vocabulary questions must target a word whose everyday meaning differs from its meaning here, and must not be answerable from a dictionary alone.
- Include one question that a student who skimmed would answer plausibly but wrongly, and mark it. Say what the skimmer would write.
- Order the questions so the difficulty rises, and mark the point where the demand changes.
- Do not paraphrase the passage in the question stem. Make them go back to it.

Return.
1. THE QUESTION SET, student facing, tagged, with the marks available for each.
2. ANSWER NOTES. For each question: the evidence in the passage, the acceptable range of answers, and one wrong answer you expect.
3. WHAT THIS PASSAGE WILL NOT LET ME ASSESS. Skills the text is not suited to testing.
4. TWO WORDS OR IDEAS I should pre teach before students read, and why.`,
    variables: [
      {
        token: "PASSAGE",
        label: "The passage",
        example:
          "Paste the full text here, for example the opening two paragraphs of the chapter on the Blitz from the class history reader",
      },
      {
        token: "LEVEL",
        label: "Age group and reading level",
        example: "Year 8, mixed, with four students reading around two years below chronological age",
      },
      {
        token: "FOCUS",
        label: "What you are assessing or teaching",
        example: "Inference from implied detail, and how the writer uses short sentences to control pace",
      },
      {
        token: "COUNT",
        label: "Number of questions",
        example: "Six questions, twenty marks in total",
      },
      {
        token: "USE",
        label: "How it will be used",
        example: "Twenty minute independent task, then discussed as a class with books open",
      },
    ],
    expectedOutput:
      "A tagged and graded question set with marks, answer notes that quote the evidence for each expected response, a named skimmer trap, and an honest list of what this particular passage cannot be used to assess.",
    followUps: [
      "Rewrite questions two and five for the four students reading below age, keeping the same skill and the same evidence.",
      "Give me the three discussion questions I should ask after the written task that cannot be answered in one sentence.",
      "Turn the answer notes into a mark scheme with band descriptors for the two extended response questions.",
    ],
    pitfalls: [
      "Pasting a summary of the text instead of the text produces questions about a passage that does not exist, and the answer notes will quote lines nobody can find.",
      "Without the level field the questions default to somewhere around Year 10, which is too hard for most classes and too easy for a top set.",
      "Read the pre teach suggestions before the questions. On unfamiliar historical or scientific passages they routinely catch a word that would have derailed a third of the class.",
    ],
  },

  eeat: {
    author: "Grace Mbeki",
    authorCredential:
      "Fourteen years teaching secondary science, the last three as a head of department writing assessment policy.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "I use this on science articles rather than fiction, which is where it surprised me. Given a New Scientist extract it wrote three questions my Year 9s could answer from general knowledge alone, and only stopped when I added the explicit removal rule. The skimmer trap is now the question I look at first, because it predicts almost exactly who has read the piece.",
  },

  article: {
    intro: [
      "A reading comprehension prompt has one job that is easy to state and hard to do: produce questions that cannot be answered without reading the passage. Most question sets, generated or otherwise, fail this. Students learn very early that scanning for a matching phrase, or guessing from the title, gets most of the marks.",
      "Generating comprehension questions from any text is not the difficult part. Any model will do that in seconds. The difficult part is the filtering, and this prompt is mostly filtering: no general knowledge, no paraphrased stems that give the answer away, no feelings questions, and one deliberate trap for the student who skimmed.",
    ],

    sections: [
      {
        heading: "Tagging by skill, not by number",
        body: [
          "Six questions with no labels look like one task. Tagged as retrieval, inference, vocabulary in context, author craft and summary, the same six become a diagnostic, because a student who scores full marks on retrieval and nothing on inference has a specific problem with a specific name.",
          "The tags also stop the set drifting. Left to itself a model produces five retrieval questions and one about how the passage made you feel, since retrieval is the easiest kind to write. Requiring one tag per question and a stated focus keeps the balance where you wanted it.",
        ],
      },
      {
        heading: "Inference is where the marks are lost",
        body: [
          "Inference questions that need evidence are the ones that separate readers, and they are the ones most commonly written badly. A question asking what the reader thinks the character feels can be answered plausibly with no reference to the page at all, and marking it fairly becomes impossible.",
          "The prompt requires two things instead. The student must point to the words carrying the inference, and the answer notes must name those words. That makes the question markable by someone other than the person who wrote it, and it makes the discussion afterwards about the text rather than about opinions.",
        ],
        subsections: [
          {
            heading: "The skimmer trap",
            body: [
              "One question in every set is designed so that a plausible but wrong answer is available to anyone who read the first and last lines. The prompt states what the skimmer would write, so the marking takes seconds and the information is immediate. It is the single most useful item in the set.",
            ],
          },
          {
            heading: "Vocabulary that a dictionary will not solve",
            body: [
              "Vocabulary in context questions only work when the word means something different here from its everyday sense. Asking what arduous means tests whether a student owns the word. Asking what charged means in a sentence about a courtroom tests whether they read the sentence.",
            ],
          },
        ],
      },
      {
        heading: "Using the reading comprehension prompt on non fiction",
        body: [
          "Comprehension is often treated as an English department concern, which leaves every other subject assuming students can read the textbook. They frequently cannot, and nobody finds out because the assessment is on the science rather than on the reading.",
          "Running an ai prompt for guided reading questions over a page of a science or history text takes two minutes and reveals a great deal. The section listing what the passage cannot assess is useful here too, since a dense factual extract will support retrieval and vocabulary questions well and author craft questions badly.",
        ],
      },
      {
        heading: "Pre teaching before the reading",
        body: [
          "The final output block asks for two words or ideas to introduce before students open the text. This is the part with the largest effect on how the lesson goes and the part most likely to be skipped.",
          "A single unknown word early in a passage can cost a weaker reader the rest of the paragraph, because the effort of decoding it displaces the sense of what follows. Two minutes at the board removes that, and the model is reasonably good at spotting which words will do the damage, particularly in subject texts where the vocabulary is technical rather than rare.",
        ],
      },
      {
        heading: "The honest limits, including for students",
        body: [
          "Checking a student read the text is a legitimate use and this prompt is good at it. What it cannot do is tell you why a student did not understand, only that they did not, and the difference between decoding difficulty, vocabulary gaps and unfamiliarity with the subject matter needs a conversation.",
          "There is also an obvious misuse. A student can paste the passage into a model and get answers without reading a line, and pretending otherwise helps nobody. The defensible responses are to have some comprehension work happen in the room on paper, and to use questions whose answers require pointing at evidence in a book you can see them holding. Handing in generated answers as your own is misconduct, and it also skips the only part of the exercise that builds anything.",
        ],
      },
    ],

    howTo: {
      name: "How to use the reading comprehension prompt",
      steps: [
        {
          name: "Paste the actual passage",
          text: "The full text, not a description of it. Every answer note refers to specific lines, so a summary produces questions about a text your class does not have.",
        },
        {
          name: "Name the skill you are teaching this week",
          text: "The focus field shifts the balance of tags. Say inference from implied detail rather than comprehension, and the set changes shape.",
        },
        {
          name: "Read the skimmer trap first",
          text: "Check it is genuinely plausible to someone who read the opening lines. If the wrong answer is silly, ask for a better one before printing.",
        },
        {
          name: "Pre teach the two words",
          text: "Do this before students see the passage, not during. Two minutes at the start saves the weaker readers the whole paragraph.",
        },
      ],
    },

    faq: [
      {
        question: "What length of passage does a reading comprehension prompt handle best?",
        answer:
          "Between two hundred and eight hundred words. Below that there is not enough material for a graded set, and above it the answer notes start referring to lines vaguely rather than quoting them, which makes marking slower rather than faster.",
      },
      {
        question: "Can it work with a text I cannot paste in full for copyright reasons?",
        answer:
          "Not well. Questions need the exact wording, since inference and vocabulary items depend on specific phrases. For a class reader, type in the two or three paragraphs you are studying rather than describing the chapter and hoping.",
      },
      {
        question: "How do I stop students answering these with a chatbot?",
        answer:
          "Mostly by where the work happens. Written in the room, with the book open and evidence quoted by hand, the shortcut is unavailable. For homework, accept that some answers will be generated and treat the task as practice rather than as assessment evidence.",
      },
      {
        question: "Is this useful outside English lessons?",
        answer:
          "It is arguably more useful outside them, because subject teachers rarely check whether students can read the material they are set. A six question set on one textbook page will tell a science or history department something uncomfortable and actionable within twenty minutes.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description:
          "For the content knowledge the passage carries, once you know the class can actually read it.",
      },
      {
        href: "/education-prompts/concept-explanation-prompt",
        label: "concept explanation prompt",
        description:
          "Use when the comprehension answers show the words were decoded correctly and the underlying idea still is not there.",
      },
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description:
          "Turns the answer notes into band descriptors when the extended responses need marking consistently across a department.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The same evidence discipline applied to a transcript: every claim has to point back at something someone actually said.",
      },
    ],

    externalLinks: [
      {
        href: "https://ies.ed.gov/ncee/wwc/PracticeGuide/29",
        label: "IES: Providing reading interventions for students in grades 4 to 9",
        description:
          "The practice guide behind pre teaching vocabulary and requiring text evidence, both of which this prompt enforces structurally.",
      },
      {
        href: "https://www.oecd.org/en/about/programmes/pisa.html",
        label: "OECD: PISA reading literacy framework",
        description:
          "Defines the retrieval, inference and evaluation distinctions used here as the question tags, with international comparison data behind them.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the exclusion rules and self checking patterns that let the prompt discard its own questions before returning them.",
      },
    ],
  },
};

export default meta;
