import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "grading-rubric-prompt",
  name: "Rubric Builder",
  title: "Grading Rubric Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Builds an analytic rubric from the task and the objective, with band descriptors that name observable evidence instead of comparative adverbs.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["assessment", "rubrics", "marking", "moderation"],

  seo: {
    primaryKeyword: "grading rubric prompt",
    keywords: [
      "grading rubric prompt",
      "how to write an analytic rubric",
      "marking criteria students can actually read",
      "rubric descriptors without vague language",
      "ai prompt for assessment criteria",
      "moderating marking across a department",
    ],
    seoTitle: "Grading Rubric Prompt: Descriptors You Can Mark With",
    seoDescription:
      "A grading rubric prompt that builds analytic bands from the task itself, bans comparative wording, and forces every descriptor to name evidence a marker can see.",
  },

  prompt: {
    text: `You are an assessment lead building an analytic rubric for a single task. You write descriptors that two different markers would apply the same way.

THE TASK STUDENTS ARE SET: {{TASK}}
THE OBJECTIVE BEING ASSESSED: {{OBJECTIVE}}
AGE GROUP AND SUBJECT: {{CLASS}}
NUMBER OF BANDS: {{BANDS}}
WHAT A STRONG RESPONSE LOOKS LIKE: {{STRONG}}
WHAT WEAK RESPONSES USUALLY DO: {{WEAK}}

Hard rules.
- Derive the criteria from the task, not from a generic list. If the task does not require a skill, that skill gets no row.
- Never use a comparative or intensifying word as the difference between bands. The words some, good, excellent, limited, effective, appropriate, sophisticated and thorough are banned in descriptors.
- Each band must be distinguished by an observable difference in the work itself: what is present, what is absent, how many, how accurate, in what order.
- No row may assess two things at once. Split any criterion that uses the word and to join separate skills.
- Include the band below the lowest expected performance, so nobody has to mark upward out of sympathy.

Return.
1. CRITERIA LIST with a one line justification of each row against the objective, and a note of anything in the task you decided not to assess.
2. THE RUBRIC as rows by band, descriptors only, in the student facing wording.
3. BORDERLINE NOTES. For each pair of adjacent bands, the single question a marker should ask to decide.
4. TWO SAMPLE RESPONSES you invent, one clearly mid band and one genuinely borderline, each with the marks you would award and why.
5. WHAT THIS RUBRIC WILL REWARD BY ACCIDENT. Name the way a student could score well without meeting the objective.`,
    variables: [
      {
        token: "TASK",
        label: "The task students are set",
        example:
          "Plan and write up an investigation into how surface area affects the rate of reaction between marble chips and acid",
      },
      {
        token: "OBJECTIVE",
        label: "The objective being assessed",
        example: "Students can control variables and justify why each control matters to the conclusion",
      },
      {
        token: "CLASS",
        label: "Age group and subject",
        example: "Year 10 combined science, mid ability set",
      },
      {
        token: "BANDS",
        label: "Number of bands",
        example: "Four bands, mapped to grades 2 to 3, 4 to 5, 6 to 7 and 8 to 9",
      },
      {
        token: "STRONG",
        label: "What a strong response looks like",
        example:
          "Names the independent, dependent and three control variables, and explains that uncontrolled acid concentration would change the rate independently of surface area",
      },
      {
        token: "WEAK",
        label: "What weak responses usually do",
        example:
          "List variables correctly but never connect them to the conclusion, and write keep everything else the same with no examples",
      },
    ],
    expectedOutput:
      "A criteria list justified row by row, band descriptors written without comparative adverbs, a decision question for every band boundary, two invented sample responses with marks, and an honest note on how the rubric could be gamed.",
    followUps: [
      "Rewrite the descriptors at reading age eleven so the rubric can be handed to students at the start of the task.",
      "Convert this into a single point rubric with only the expected standard described, plus space for evidence above and below.",
      "Write the five minute moderation exercise: pick one borderline script feature per row and give me the question to put to the department.",
    ],
    pitfalls: [
      "Asking for a rubric without giving the task produces generic bands about clarity and accuracy that fit any essay and discriminate between none.",
      "Leaving the weak responses field blank costs you the most useful rows. The lower bands are only sharp if they describe what students really do.",
      "Section five is not filler. Every rubric rewards something unintended, and reading it before you publish is cheaper than discovering it across ninety scripts.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Band descriptors written by a model separate limited from some from thorough, which reads as a scale and functions as a coin toss, because two markers cannot agree on what thorough looks like. Banning comparative and intensifying adverbs forces each band onto an observable difference in the work itself: what is present, what is absent, how many, in what order.",
  },

  article: {
    intro: [
      "A grading rubric prompt earns its place the moment two colleagues mark the same script and land on the same band. That is the whole test, and most rubrics fail it because the difference between bands is a word like thorough, which lives in the marker's head rather than on the page.",
      "The version here derives criteria from the task you actually set, refuses comparative wording outright, and forces every band to be separated by something a marker can point at in the work: a thing present, a thing missing, a count, an order, an accuracy.",
      "It also does something rubric templates never do. It tells you, before you use it, how a student could score well on it without having met the objective at all.",
    ],

    sections: [
      {
        heading: "The adverb problem",
        body: [
          "Open almost any published band descriptor set and the ladder is built from adverbs. Limited understanding, some understanding, good understanding, excellent understanding. Nothing in that sequence tells a marker what to look for, so each marker substitutes their own sense of the cohort, and the band a script receives depends partly on who picked it up.",
          "Writing rubric descriptors without vague language means replacing each adverb with the observable thing it was standing in for. Instead of some analysis, the descriptor says the response links one piece of evidence to the claim and leaves the others unexplained. Longer to write, faster to mark, and it survives being read by a supply teacher.",
        ],
      },
      {
        heading: "Criteria come from the task, not a template",
        body: [
          "Generic rubrics assess clarity, structure, accuracy and presentation because those four fit anything. That is exactly why they discriminate poorly: they measure the same general writing competence in a history essay and a lab report.",
          "Anyone learning how to write an analytic rubric should start from the task and ask what the task genuinely demands. If the investigation requires variable control and does not require extended prose, there is no prose row. The prompt makes this explicit by asking for a justification of every row and a list of what it deliberately left unassessed, which is often the more informative half.",
        ],
      },
      {
        heading: "Choosing the rubric shape",
        body: [
          "Analytic is the default here because it separates skills and therefore tells a student where to work. It is not always right. A short weekly task does not deserve six rows, and a single point rubric is faster to build and better for formative work where the mark matters less than the note.",
        ],
      },
      {
        heading: "What the grading rubric prompt does at the boundaries",
        body: [
          "Most marking disagreement happens at exactly two places on the scale, and it is not the middle of a band. The prompt therefore produces a borderline note for each adjacent pair: one question a marker asks to decide which side a script falls.",
          "That single question is worth more than another paragraph of descriptor. It converts a judgement into a check, and it gives a department something concrete to argue about before marking starts rather than after. An ai prompt for assessment criteria that stops at the grid leaves the hardest ten percent of the marking undone.",
        ],
        subsections: [
          {
            heading: "The invented sample scripts",
            body: [
              "Section four asks the model to write two responses and mark them. The mid band one is usually unremarkable. The borderline one is the useful artefact, because reading it tends to reveal that a descriptor you thought was clear can be read two ways, and you can fix the wording before it costs you a moderation round.",
            ],
          },
        ],
      },
      {
        heading: "Rubrics as a moderation tool",
        body: [
          "Moderating marking across a department is where a rubric stops being paperwork. Hand five colleagues the same three scripts and the same grid, and the disagreements point precisely at the rows whose wording is doing no work.",
          "Run the prompt before the moderation meeting rather than after. The borderline questions give the meeting an agenda, and the section on accidental rewards usually predicts at least one of the arguments that will happen anyway.",
        ],
      },
      {
        heading: "Giving the rubric to students",
        body: [
          "A rubric written for markers is not automatically usable by a fifteen year old, and handing one over unedited teaches students to write in the language of the descriptors rather than to do the thing. The follow up that rewrites at reading age eleven exists for this.",
          "Marking criteria students can actually read change behaviour before the work is submitted, which is the only point at which criteria can improve anything. Give them the rewritten version at the start of the task with one worked example, not attached to the returned mark.",
        ],
      },
    ],

    table: {
      caption: "Which rubric shape fits which task",
      headers: ["Shape", "Best for", "Cost", "Failure mode"],
      rows: [
        [
          "Analytic",
          "Coursework and any task assessing several separable skills",
          "Slow to write, slow to mark",
          "Rows multiply until nobody reads them",
        ],
        [
          "Holistic",
          "High volume short responses where speed matters more than diagnosis",
          "Fast",
          "Gives a student a number and no next step",
        ],
        [
          "Single point",
          "Formative work and drafts",
          "Fastest to build",
          "Requires the marker to write, so it does not scale to ninety scripts",
        ],
      ],
    },

    howTo: {
      name: "How to use the grading rubric prompt",
      steps: [
        {
          name: "Paste the task before anything else",
          text: "Give the wording students will see, not a summary of it. The criteria are derived from the demands in that wording, so a paraphrase produces a vaguer grid.",
        },
        {
          name: "Describe weak work from memory",
          text: "What did last year's mid range scripts do wrong? Those habits become the lower band descriptors, and they are the rows markers use most.",
        },
        {
          name: "Search the output for banned words",
          text: "Scan for effective, appropriate and thorough. One usually survives. Replace it with the observable evidence it was hiding.",
        },
        {
          name: "Mark three real scripts against it",
          text: "Use the borderline questions on a script you already have a view about. If the grid disagrees with you, one of the two is wrong and it is worth finding out which.",
        },
        {
          name: "Take it to moderation before publishing",
          text: "Bring the accidental rewards section with you. A rubric agreed by three markers is worth more than a better one agreed by nobody.",
        },
      ],
    },

    faq: [
      {
        question: "How many bands should a grading rubric prompt produce?",
        answer:
          "Four is usually right for secondary work, and five is the practical ceiling. Markers cannot reliably distinguish more than that on one criterion, so extra bands generate disagreement rather than precision. Ask for fewer bands and more rows if you need finer diagnosis.",
      },
      {
        question: "Can the model mark student work against the rubric it wrote?",
        answer:
          "It can produce a plausible band for a pasted script, and the reasoning is often useful as a second opinion. Treat it as a prompt for your own attention rather than a mark, and never enter a machine generated grade without reading the work yourself.",
      },
      {
        question: "Should the rubric be shared before the task or after?",
        answer:
          "Before, in the student facing wording, with one annotated example. Criteria delivered alongside a mark arrive too late to change anything, and students read them as a justification of the grade rather than as a description of the work they were meant to produce.",
      },
      {
        question: "What if my exam board already publishes descriptors?",
        answer:
          "Use theirs for anything that will be reported, since consistency with the board matters more than clarity. This prompt is then best used to translate those descriptors into the observable checks your department will actually apply during marking and moderation.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description:
          "Once the rubric has produced a band, this turns the row a student lost marks on into a next step they can act on.",
      },
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description:
          "Build the rubric from the same objective the lesson was planned around, so the assessment measures what you taught.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "The identical failure outside school: bands separated by adverbs, and two managers reading the same evidence differently.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gov.uk/government/publications/marking-consistency-metrics",
        label: "Ofqual: Marking consistency metrics",
        description:
          "The regulator's own analysis of how far two qualified markers diverge on the same script, which is the case for observable descriptors.",
      },
      {
        href: "https://www.apa.org/ed/schools/teaching-learning/top-twenty-principles",
        label: "APA: Top 20 principles for teaching and learning",
        description:
          "Summarises the assessment research behind criteria being shared in advance and expressed as observable performance.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the negative constraint and worked example patterns used here to suppress the banned adverbs and force sample scripts.",
      },
    ],
  },
};

export default meta;
