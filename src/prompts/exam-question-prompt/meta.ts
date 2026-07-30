import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "exam-question-prompt",
  name: "Summative Item Writer",
  title: "Exam Question Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Writes summative items to a fixed mark total, tags each with its command word and demand, and returns a mark scheme with as many creditable points as marks.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["assessment", "exams", "mark schemes", "command words"],

  seo: {
    primaryKeyword: "exam question prompt",
    keywords: [
      "exam question prompt",
      "how to allocate marks in exam questions",
      "exam command words examples",
      "recall vs application questions",
      "ai prompt for a mark scheme",
    ],
    seoTitle: "Exam Question Prompt: Marks, Command Words, Mark Scheme",
    seoDescription:
      "An exam question prompt that writes summative items to a mark total, tags command word and demand on every item, and returns a mark scheme you can mark from.",
  },

  prompt: {
    text: `You are writing summative examination items that will be marked and reported. Accuracy of the mark scheme matters more than the elegance of the question.

SUBJECT, LEVEL AND SPECIFICATION: {{SPEC}}
CONTENT THIS PAPER MAY EXAMINE: {{CONTENT}}
TOTAL MARKS AND TIME ALLOWED: {{TOTAL}}
SPLIT I WANT BETWEEN RECALL AND APPLICATION: {{SPLIT}}
COMMAND WORDS MY BOARD USES: {{COMMANDS}}
WHAT STUDENTS GOT WRONG LAST TIME: {{ERRORS}}

Non negotiable rules.
- Every item carries a mark allocation, and the mark scheme for that item must contain at least as many separately creditable points as there are marks. If you cannot find a fourth creditable point, the question is worth three marks, not four.
- Every item opens with one command word from my list, used with my board's meaning. Do not invent command words and do not stack two in one question.
- Tag each item RECALL, meaning the answer is retrievable from memory, or APPLICATION, meaning the student must use knowledge on material they have not seen. Report the actual mark split against the one I asked for.
- Marks per item must be spendable in the time allowed. State your assumed minutes per mark and check the paper against it.
- No item may depend on getting an earlier item right, unless you mark it as an error carried forward and say how that is credited.
- Include at least one item whose wrong answer would be produced by the misconception I described.

Return.
1. THE PAPER, items in ramped order with marks shown.
2. MARK SCHEME per item: creditable points, acceptable alternative wordings, and answers that look right but earn nothing.
3. DEMAND TABLE: item, command word, marks, recall or application, content point examined.
4. TIME CHECK against your minutes per mark.
5. WEAKEST ITEM, the one you would cut if the paper had to lose five marks, and why.`,
    variables: [
      {
        token: "SPEC",
        label: "Subject, level and specification",
        example: "AQA GCSE Combined Science Trilogy, Higher tier, Chemistry paper 1",
      },
      {
        token: "CONTENT",
        label: "Content this paper may examine",
        example:
          "Atomic structure, the periodic table, ionic and covalent bonding, and the properties of giant covalent structures",
      },
      {
        token: "TOTAL",
        label: "Total marks and time allowed",
        example: "35 marks in 40 minutes, end of unit test in class",
      },
      {
        token: "SPLIT",
        label: "Split between recall and application",
        example: "Roughly 40 percent recall and 60 percent application, with at least one six mark extended response",
      },
      {
        token: "COMMANDS",
        label: "Command words your board uses",
        example: "State, describe, explain, compare, calculate, suggest, evaluate",
      },
      {
        token: "ERRORS",
        label: "What students got wrong last time",
        example:
          "They describe graphite conducting because it has free electrons but never say the electrons are delocalised between layers, and they confuse the number of shells with the group number",
      },
    ],
    expectedOutput:
      "A ramped paper totalling the marks you asked for, a mark scheme with as many creditable points as marks and a list of near misses that earn nothing, a demand table showing the real recall and application split, a timing check, and a named weakest item.",
    followUps: [
      "Write the foundation tier version of the same paper, keeping the content identical and changing only the scaffolding and the command words.",
      "Give me the one page examiner report I would write after marking this, predicting the three items that will discriminate least.",
      "Produce a student facing version of the mark scheme, phrased as what a full mark answer contains rather than as marking points.",
    ],
    pitfalls: [
      "Leaving the command word list blank gets you questions beginning with discuss and outline, which many boards do not use, and students trained on those verbs will answer the wrong question.",
      "A four mark question with three creditable points is the most common fault in teacher written papers, and it turns marking into invention. The point count rule exists entirely for that.",
      "Asking for a whole paper at once produces late items that repeat the content of early ones. Generate in two blocks of twenty marks and check the demand table for duplication.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Mark schemes are where generated papers fail quietly. A six mark item arrives carrying five creditable points, nobody notices until marking, and a full answer becomes impossible to distinguish from an incomplete one. Requiring at least as many separately creditable points as marks, and dropping the tariff when a further point cannot be found, catches that at authoring time.",
  },

  article: {
    intro: [
      "An exam question prompt is a different tool from a quiz generator, and treating them as the same thing is how a class ends up with a test that cannot be marked consistently. Quiz items diagnose. Examination items are marked, recorded and reported, so the mark scheme is the deliverable and the question is the wrapper around it.",
      "This one starts from the marks. Every item declares what it is worth, and the mark scheme must contain at least as many separately creditable points as there are marks available. If the fourth point does not exist, the question is worth three.",
      "It also tags every item with a command word and with whether the answer is retrieved or worked out, then reports the split it actually produced against the split you asked for. Those two numbers are usually different, and the gap is the most useful line in the output.",
    ],

    sections: [
      {
        heading: "Marks are the design, not a label added afterwards",
        body: [
          "How to allocate marks in exam questions is a decision to make before the question is finished. Teacher written papers routinely carry a four mark item that has three things to say, and marking it turns into a search for a fourth idea generous enough to award.",
          "The consequence is not just untidiness. Two colleagues marking that item will invent different fourth points, the paper stops being comparable across a year group, and a student who wrote a complete answer loses a mark to a question that was never fully specified.",
        ],
      },
      {
        heading: "Command words are instructions with a legal meaning",
        body: [
          "Exam command words examples are not a list of synonyms chosen for variety. On most specifications each one has a published definition, and describe, explain and evaluate ask for genuinely different responses with different mark scheme shapes.",
          "Students learn those definitions over two years, so a question that says outline on a board that never uses outline costs them time they spend deciding what you want. The prompt takes your board's list and will not go outside it, which also stops the model stacking two commands into one sentence, as in describe and explain why, a question no mark scheme can cleanly serve.",
        ],
      },
      {
        heading: "Recall vs application questions in one paper",
        body: [
          "Recall vs application questions is the distinction that decides whether a paper measures revision or understanding. A student who has memorised the specification can walk through a paper made entirely of state and name items, and the result tells you nothing about whether they can use any of it.",
          "The reverse paper is just as unhelpful. All application, no retrieval, and the weakest students score close to zero, which produces a mark distribution with no information in the bottom third. Asking for a split, then being shown the split you actually got, is the whole reason the demand table exists.",
        ],
        list: [
          "Recall: the answer exists in the student's memory of the taught content and needs only accurate reproduction.",
          "Application: the stem contains material the student has not seen, and the taught content has to be used on it.",
          "Extended response: usually both, which is why it belongs at the end and needs a levels based scheme rather than point marking.",
        ],
      },
      {
        heading: "What the exam question prompt puts in the mark scheme",
        body: [
          "An ai prompt for a mark scheme is only worth having if the scheme survives contact with ninety scripts. That means three lists, not one: the creditable points, the alternative wordings a student might use for each, and the answers that look plausible but earn nothing.",
          "The third list is the one that saves time. Written down in advance, the near miss becomes a decision the department made once. Discovered on script forty, it becomes a decision each marker makes separately, and the ones marking after lunch decide differently from the ones who started at nine.",
        ],
        subsections: [
          {
            heading: "Seeding a known misconception",
            body: [
              "One item is built so that the specific error you described produces a specific wrong answer. That item then does double duty: it discriminates on the paper, and the pattern of who got it wrong tells you whether the reteaching worked.",
            ],
          },
        ],
      },
      {
        heading: "Ramping, and why the last item is not always hardest",
        body: [
          "Papers are ramped so that a student who will score in the bottom band still writes something in the first ten minutes. That is a wellbeing decision as much as a measurement one, and it also protects the data, because a student who stalls on question one answers nothing else.",
          "Ramping inside a multi part question matters more than ramping across the paper. Part a should be answerable by nearly everyone in the room, and the marks should climb through the parts rather than sitting flat, so a partially correct route still earns something.",
        ],
      },
      {
        heading: "Where a generated paper still needs a marker's eye",
        body: [
          "Past paper style questions produced by a model are good at structure and unreliable on two things: numerical answers that need working, and the exact scope of a specification point. Both fail quietly, and both are cheap to check if you know to look.",
          "Work every calculation yourself before the paper is printed. Then read the content column of the demand table against the specification and delete anything that has drifted a year group upward, which is the drift that happens most often.",
        ],
      },
    ],

    howTo: {
      name: "How to write a paper with the exam question prompt",
      steps: [
        {
          name: "Give the mark total and the minutes together",
          text: "The timing check is derived from both. A 35 mark test in 40 minutes and the same test in an hour are different papers, and only one of them can carry an extended response.",
        },
        {
          name: "Paste your board's command word list",
          text: "Copy it from the specification rather than from memory. Boards differ on whether suggest and evaluate exist at all, and students have been trained on the ones yours uses.",
        },
        {
          name: "Describe last year's errors precisely",
          text: "One sentence of what students actually wrote is worth a paragraph about the topic, because it becomes the item that tells you whether the reteaching landed.",
        },
        {
          name: "Count the mark scheme points before reading the questions",
          text: "Go straight to section two and check each item has as many creditable points as marks. A shortfall there is invisible until you are marking.",
        },
        {
          name: "Do every calculation by hand",
          text: "Arithmetic and unit conversions are where generated papers fail, and a wrong answer in the scheme costs more credibility than a dull question ever will.",
        },
      ],
    },

    faq: [
      {
        question: "Can an exam question prompt produce items good enough for a reported grade?",
        answer:
          "For internal assessment, mock papers and end of unit tests, yes, provided you check the calculations and the specification scope yourself. For anything externally reported you use the board's own materials, because comparability with the board matters more than the quality of any individual item.",
      },
      {
        question: "How is this different from generating a quiz?",
        answer:
          "A quiz is formative and its value sits in the wrong answers, so it optimises for diagnosis. This optimises for marking: fixed mark totals, published command words, a scheme with alternatives and near misses, and a timing check. The same content produces two very different papers.",
      },
      {
        question: "How many marks per minute should I allow?",
        answer:
          "About one mark per minute is the usual working assumption at GCSE, with extended responses needing more. The prompt states the figure it used so you can override it, which matters for subjects like maths where a two mark calculation can take four minutes.",
      },
      {
        question: "What should I do with the weakest item section?",
        answer:
          "Read it before you print. It names the item the model itself thinks contributes least, and in testing it was right roughly half the time. Even when it is wrong, the reasoning tells you which item is doing the least discriminating work.",
      },
      {
        question: "Can it write levels based mark schemes for extended answers?",
        answer:
          "It can, and they need the most editing. Levels descriptors have the same problem as rubric bands: the model separates them with words like detailed and limited. Ask for observable differences in the response instead, or build the descriptors separately and paste them in.",
      },
      {
        question: "Will students find these questions online?",
        answer:
          "The items are generated rather than retrieved, so they are not copies of published papers, though they will resemble them because the specification constrains what a question can be. Treat security as you would for any teacher written test.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description:
          "For the extended response, where point marking stops working and you need band descriptors instead.",
      },
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description:
          "The formative counterpart, built around distractors that expose misconceptions rather than around mark totals.",
      },
      {
        href: "/education-prompts/reading-comprehension-prompt",
        label: "reading comprehension prompt",
        description:
          "When the paper needs an unseen source, this builds the extract and the questions that sit on it.",
      },
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "The same command word discipline outside school: answering the question that was asked rather than the adjacent one.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gov.uk/government/organisations/ofqual",
        label: "Ofqual",
        description:
          "The regulator whose comparability requirements are the reason internal papers imitate board command words and mark allocations.",
      },
      {
        href: "https://www.cambridgeinternational.org/support-and-training-for-schools/teaching-cambridge-at-your-school/command-words/",
        label: "Cambridge International: Command words",
        description:
          "A published definition set showing how narrowly each command word is defined and why substitution changes the question.",
      },
      {
        href: "https://www.ets.org/research.html",
        label: "ETS Research",
        description:
          "Primary assessment research on item discrimination and difficulty, which underpins the ramping and demand split rules here.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: Chain of thought prompting",
        description:
          "Explains why asking the model to enumerate creditable points before fixing the mark value produces schemes that add up.",
      },
    ],
  },
};

export default meta;
