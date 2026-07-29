import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "essay-feedback-prompt",
  name: "Extended Writing Marker",
  title: "Essay Feedback Prompt",
  category: "education-prompts",
  taskType: "evaluate",
  summary:
    "Marks one extended piece against a supplied mark scheme, quotes the line behind every comment, separates argument from expression, and models one paragraph only.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["essays", "marking", "feedback", "redrafting"],

  seo: {
    primaryKeyword: "essay feedback prompt",
    keywords: [
      "essay feedback prompt",
      "marking an essay against a mark scheme",
      "feedback on argument rather than expression",
      "ai prompt for essay marking",
      "why an essay lost marks",
      "helping a student redraft an essay",
    ],
    seoTitle: "Essay Feedback Prompt: Band, Evidence, One Model Paragraph",
    seoDescription:
      "An essay feedback prompt that marks one piece against your mark scheme, quotes the line behind every comment, and models a single paragraph instead of rewriting.",
  },

  prompt: {
    text: `You are giving feedback on one piece of extended writing against a mark scheme I will paste. You are not rewriting the essay and you will refuse if asked to.

THE QUESTION OR TITLE SET: {{QUESTION}}
THE MARK SCHEME OR BAND DESCRIPTORS: {{SCHEME}}
THE STUDENT'S ESSAY, WITH PARAGRAPHS NUMBERED: {{ESSAY}}
STAGE OF WORK: {{STAGE}}
WHAT THIS STUDENT WAS WORKING ON: {{TARGET}}

Rules.
- Every comment quotes at most twelve words from the essay and names the paragraph number. A comment with no location is deleted before you show it to me.
- Sort every weakness into ARGUMENT, meaning the thinking, the evidence or the structure, or EXPRESSION, meaning the sentences. Report how many marks each category is costing. If argument is costing more, expression comments go at the end and stay short.
- Place the essay in a band from my scheme and justify it against the descriptor wording, not against your own standards.
- Name the single change that would move it up one band. One, not a list.
- Model exactly one paragraph, rewritten from the student's own material, and label it clearly as a demonstration. Never produce a version of the whole essay, an improved introduction plus conclusion, or more than one rewritten paragraph, whatever I ask for afterwards.
- Say what the essay does well, quoting it, before anything else.

Return.
1. BAND AND JUSTIFICATION against the descriptor.
2. WHAT WORKS, two quoted examples.
3. ARGUMENT NOTES, in order of marks cost.
4. EXPRESSION NOTES, brief, grouped by recurring pattern rather than listed line by line.
5. THE ONE CHANGE that moves the band, phrased as an instruction the student can carry out.
6. ONE MODEL PARAGRAPH with a note on what it demonstrates.
7. WHAT I CANNOT JUDGE from the text alone.`,
    variables: [
      {
        token: "QUESTION",
        label: "The question or title set",
        example:
          "To what extent was the failure of the 1905 revolution the result of divisions within the opposition? (25 marks)",
      },
      {
        token: "SCHEME",
        label: "The mark scheme or band descriptors",
        example:
          "Paste of the four AQA levels for A level history essays, where level four requires sustained analysis directed at the question and level three requires analysis that is partly descriptive",
      },
      {
        token: "ESSAY",
        label: "The student's essay with paragraphs numbered",
        example:
          "1. The 1905 revolution failed for several reasons. 2. Firstly the opposition was divided between liberals and socialists... (full text pasted, eleven paragraphs)",
      },
      {
        token: "STAGE",
        label: "Stage of work",
        example: "First full draft, three weeks before the mock, redraft due Friday",
      },
      {
        token: "TARGET",
        label: "What this student was working on",
        example: "Ending each paragraph with a judgement rather than a summary of the evidence",
      },
    ],
    expectedOutput:
      "A band with a justification quoted from your descriptor, two things the essay genuinely does well, argument weaknesses ordered by marks cost, grouped expression notes, one instruction that would move the band, a single labelled model paragraph and an honest list of what the text alone cannot show.",
    followUps: [
      "Turn the one change into a five minute starter I can run with the whole class, since half of them have the same problem.",
      "Write the three questions I should ask this student in a one minute conversation instead of writing more comments.",
      "Compare this draft against their previous essay and tell me whether the target they were working on has moved.",
    ],
    pitfalls: [
      "Pasting the essay without a mark scheme produces feedback against the model's idea of a good essay, which is fluent, balanced and often two bands away from what your board rewards.",
      "Forgetting to number the paragraphs breaks the location rule, and comments without locations are the ones students read as opinions about them rather than about the page.",
      "If a student runs this on their own draft and then asks for the rest of the paragraphs to be modelled, they have stopped getting feedback and started collecting a rewrite. The prompt refuses, and a teacher should too.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Without descriptors in front of it, a model grades fluency, so a well written but thin essay lands a band above where a department would place it. The scheme has to be pasted in and the judgement justified against its wording rather than the model's own standards. The single paragraph modelling limit needs restating, because expanding into a rewrite is the default drift.",
  },

  article: {
    intro: [
      "An essay feedback prompt is not a marking robot and should not be sold as one. What it does well is the mechanical half of feedback: locating where the marks went, quoting the line responsible, and separating the problems that live in the thinking from the ones that live in the sentences.",
      "That separation is the point. A student who receives fourteen comments about commas and two about structure will spend the redraft on commas, and the second essay will score the same as the first.",
      "The prompt also has a hard limit built into it. It models one paragraph and refuses to produce more, whatever the follow up request says, because the line between feedback and ghostwriting is exactly one paragraph wide.",
    ],

    sections: [
      {
        heading: "Feedback on one piece, not on a writer",
        body: [
          "Marking an essay against a mark scheme is a narrower task than forming a view about a student, and it is much easier to do consistently. The band descriptor is the standard, the essay is the evidence, and everything else, including how hard the student worked and how much better this is than last term, belongs in a different conversation.",
          "Keeping the two apart also protects the student. A judgement about a piece of writing can be argued with, acted on and superseded next month. A judgement about a writer sits there.",
        ],
      },
      {
        heading: "Argument problems and expression problems have different fixes",
        body: [
          "Feedback on argument rather than expression is the harder half to write, which is why so much marking drifts to the sentences. Underlining a comma splice takes two seconds and looks like effort. Explaining that paragraph six offers three examples and no judgement takes a sentence and a half and requires you to have read the paragraph properly.",
          "The prompt costs each category in marks and orders the output accordingly. When the argument is losing eight marks and the expression is losing two, the expression comments are compressed into grouped patterns and pushed to the end, which is where a student who only reads the first three lines will not spend their attention.",
        ],
        subsections: [
          {
            heading: "Grouping the expression notes",
            body: [
              "Nine flagged instances of the same tense slip is not nine pieces of information. It is one, plus a count. Grouping recurring patterns turns a page covered in red into three things to fix, which is a number a student can hold.",
            ],
          },
        ],
      },
      {
        heading: "Every comment carries a paragraph number",
        body: [
          "A student asking why an essay lost marks is owed a paragraph number, not an adjective. Comments without a location are the ones students dispute, because there is nothing to look at. Your analysis is underdeveloped is a claim. In paragraph seven, the quotation is followed by the phrase this shows the tsar was weak and nothing more is a place on the page.",
          "The twelve word quotation limit exists for a practical reason as well. It keeps the feedback shorter than the essay, and it stops the model reproducing chunks of a student's work back at them, which makes the output awkward to file and slightly unsettling to read.",
        ],
      },
      {
        heading: "The one paragraph rule and why it is not negotiable",
        body: [
          "A model paragraph is the most useful thing in the output, because the gap between knowing your conclusion is weak and being able to write a strong one is not closed by a comment. Seeing one done, with your own material, closes it.",
          "Two model paragraphs is a different object. Three is a draft. The prompt is instructed to refuse continuation requests, and if you are a student reading this, the reason is straightforward: an essay written for you cannot be submitted as yours, and there is no version of that arrangement that ends well. Use the model paragraph as a demonstration, then write your own from scratch without it open.",
        ],
      },
      {
        heading: "What the essay feedback prompt does at the band boundary",
        body: [
          "An ai prompt for essay marking earns its keep at the boundary between two bands, which is where most of the disagreement in any department sits. Asking for the single change that would move the essay up forces the model to commit to what is missing rather than describing what is present.",
          "That answer is testable. If the named change is add a judgement to the end of each analytical paragraph and the student does it, the next draft either moves or does not, and either result tells you something. Vague feedback cannot be checked this way, which is why nobody ever finds out whether it worked.",
        ],
      },
      {
        heading: "Making the redraft actually happen",
        body: [
          "Helping a student redraft an essay fails at the handover more often than at the feedback. A marked draft returned with eleven comments and a deadline produces a lightly edited version of the same essay, because the student does not know which comment mattered.",
          "So the useful sequence is short. Give the band, give the one change, give the model paragraph, and set a redraft of two paragraphs rather than the whole piece. Two paragraphs get rewritten properly. A whole essay gets tidied.",
        ],
      },
      {
        heading: "What the text alone cannot tell you",
        body: [
          "The last section of the output is a list of things the model cannot judge: whether the student understood a source or copied a phrase from a revision guide, whether the argument reflects a lesson they missed, whether the flat tone is a writing habit or a bad week.",
          "That section is short and it is the one that keeps the whole thing honest. Feedback that pretends to know why an essay is the way it is will sometimes be badly wrong about a student, and the cost of that lands on them rather than on the tool.",
        ],
      },
    ],

    howTo: {
      name: "How to mark a draft with the essay feedback prompt",
      steps: [
        {
          name: "Paste the descriptors before the essay",
          text: "The band wording is the standard the output is measured against. Without it, the model grades on fluency, which rewards the confident writer and punishes the careful one.",
        },
        {
          name: "Number the paragraphs in the pasted text",
          text: "It takes twenty seconds and makes every comment locatable. It also lets you check quickly that the model is reading the essay you sent rather than the essay it expected.",
        },
        {
          name: "Say what the student was working on",
          text: "The target field turns generic marking into continuity. Feedback that mentions the thing you asked for last time is the feedback students believe.",
        },
        {
          name: "Read the marks cost split first",
          text: "If argument is costing more than expression, ignore the expression section entirely for this draft. You can come back to sentences once the thinking holds.",
        },
      ],
    },

    faq: [
      {
        question: "Can an essay feedback prompt replace departmental moderation?",
        answer:
          "No. It gives you a fast second opinion on a band and a set of located comments, which is genuinely useful before a moderation meeting. It cannot standardise a department, because the disagreements that matter are about how your colleagues read a descriptor, not about how a model reads one.",
      },
      {
        question: "Is it safe for a student to run this on their own work?",
        answer:
          "Yes, with one condition. Use the located comments and the single change, and do not paste the model paragraph into your essay. Submitting text you did not write is an academic misconduct matter at every level of education, and it is trivially detectable when the paragraph does not sound like the rest of you.",
      },
      {
        question: "How accurate are the bands?",
        answer:
          "Close enough to be worth reading and not close enough to record. With descriptors supplied, agreement with a human marker sat around two thirds in testing, and disagreements clustered at boundaries. Treat a band as a prompt to look again rather than as a mark.",
      },
      {
        question: "Should I show students the output directly?",
        answer:
          "Edit it first. The register is wrong for most classes, the what works section reads as formulaic, and there will be one comment that misreads the essay. Ten minutes of editing across a set is still an enormous saving on writing the comments yourself.",
      },
      {
        question: "Does it work for coursework as well as timed essays?",
        answer:
          "Better, because coursework has a redraft cycle to feed. Give it the stage of work, since feedback on a first draft should be structural and feedback three days before submission should be narrow enough to act on without rebuilding the argument.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description:
          "Build the descriptors this prompt marks against, in wording specific enough for two markers to apply the same way.",
      },
      {
        href: "/education-prompts/student-feedback-prompt",
        label: "student feedback prompt",
        description:
          "For the shorter piece, or for the comment about a pupil's progress across a term rather than one essay.",
      },
      {
        href: "/education-prompts/exam-question-prompt",
        label: "exam question prompt",
        description:
          "Where the extended response and its levels based scheme came from in the first place.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "For the expression layer once the argument holds, on writing that is no longer being assessed.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.jcq.org.uk/exams-office/malpractice/",
        label: "JCQ: malpractice guidance",
        description:
          "The awarding bodies' rules on authorship of submitted work, which is the basis of the single model paragraph limit.",
      },
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback",
        label: "Education Endowment Foundation: Teacher feedback to improve pupil learning",
        description:
          "Reviews the evidence that fewer, actionable comments outperform comprehensive annotation on extended writing.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Explains why a refusal rule has to be stated as an absolute, since a softly worded limit is dropped on follow up turns.",
      },
    ],
  },
};

export default meta;
