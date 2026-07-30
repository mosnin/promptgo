import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "lesson-plan-prompt",
  name: "Lesson Planner",
  title: "Lesson Plan Prompt",
  category: "education-prompts",
  taskType: "plan",
  summary:
    "Turns one learning objective, the prior knowledge in the room and the misconceptions you expect into a timed lesson that justifies every activity.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["lesson planning", "curriculum", "teaching", "differentiation"],

  seo: {
    primaryKeyword: "lesson plan prompt",
    keywords: [
      "lesson plan prompt",
      "ai lesson plan generator for teachers",
      "chatgpt prompt for lesson planning",
      "differentiation ideas for mixed ability classes",
      "how to plan a lesson in twenty minutes",
      "how to write a lesson plan with checks for understanding",
    ],
    seoTitle: "Lesson Plan Prompt: Plan Around One Real Objective",
    seoDescription:
      "A lesson plan prompt that takes the learning objective as an input, ties every activity to it, plans for the misconceptions you expect and says what to cut.",
  },

  prompt: {
    text: `You are an experienced classroom teacher planning a single lesson. You do not produce decorative plans. Every activity you propose has to be justified by the objective or it gets cut.

SUBJECT AND AGE GROUP: {{CLASS}}
LEARNING OBJECTIVE: {{OBJECTIVE}}
LESSON LENGTH: {{LENGTH}}
WHAT THEY ALREADY KNOW: {{PRIOR}}
MISCONCEPTIONS I EXPECT: {{MISCONCEPTIONS}}
PRACTICAL CONSTRAINTS: {{CONSTRAINTS}}

Rules you must follow.
- If the objective as written is not observable, rewrite it as something a student can be seen to do, and state what you changed before you plan anything.
- Every step must name which part of the objective it serves. If you cannot name one, delete the step rather than keeping it as a warm up.
- Include at least two checks for understanding that produce evidence from every student rather than from the three who volunteer.
- Attack each misconception with a task designed to expose it. A sentence telling students not to think that does not count.
- Differentiate by changing the support, never by changing the destination.

Produce exactly these sections.
1. THE OBJECTIVE, restated observably, with any change flagged.
2. TIMED SEQUENCE. For each step: minutes, what the teacher does, what students do, and the objective link.
3. CHECKS FOR UNDERSTANDING. The exact question, and the wrong answer that would worry you most.
4. SUPPORT AND STRETCH, same destination for both.
5. IF TIME RUNS SHORT. The one step to cut, and what it costs.
6. WHAT I HAVE ASSUMED about resources, room layout or behaviour that you should correct before teaching this.`,
    variables: [
      {
        token: "CLASS",
        label: "Subject and age group",
        example: "Year 9 chemistry, thirty students, second set of four",
      },
      {
        token: "OBJECTIVE",
        label: "The learning objective",
        example:
          "Students can predict whether a metal will displace another from solution using the reactivity series",
      },
      {
        token: "LENGTH",
        label: "Lesson length",
        example: "Fifty minutes, plus five minutes lost to a room change",
      },
      {
        token: "PRIOR",
        label: "What they already know",
        example:
          "They can name the reactivity series and have done one displacement demo, but have never written a prediction before observing",
      },
      {
        token: "MISCONCEPTIONS",
        label: "Misconceptions you expect",
        example:
          "That any reaction bubbling means hydrogen, and that a more reactive metal is the one that looks shinier",
      },
      {
        token: "CONSTRAINTS",
        label: "Practical constraints",
        example: "No technician support this week, so no practical involving silver nitrate",
      },
    ],
    expectedOutput:
      "A timed sequence where every step carries an explicit link back to the objective, two checks that generate evidence from the whole class, a named cut for when the lesson overruns, and a list of assumptions the model wants you to correct.",
    followUps: [
      "Rewrite step three assuming half the class has not done the prerequisite work and I only find that out in the lesson.",
      "Turn the checks for understanding into a single exit ticket that can be sorted into three piles in under two minutes.",
      "Give me the homework that would only be answerable by someone who understood the check question, not by someone who copied the method.",
    ],
    pitfalls: [
      "Leaving the objective vague produces a plan of pleasant activities. If your objective contains the words understand or explore, expect the model to rewrite it, and accept the rewrite.",
      "Listing no misconceptions gets you a lesson designed for students who do not exist. Two real ones from last year's books are worth more than a textbook list.",
      "The assumptions section is the part to read first. It is usually where the model has quietly given you a room with six sinks and a full technician.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Requested without constraint, a lesson plan comes back as the shape of a lesson: starter, card sort, plenary, in the expected order and joined to the objective by nothing at all. Making every step name the part of the objective it serves deletes the decorative third. Timings still run optimistic, so a plan that fits exactly is a plan that overruns.",
  },

  article: {
    intro: [
      "A lesson plan prompt is only as useful as the objective you hand it. Give a model a topic and an hour and it returns a starter, a main activity and a plenary that would sit equally well on any other topic. Give it the specific thing students should be able to do by the end and it starts making choices you can argue with.",
      "Most of what is sold as an ai lesson plan generator for teachers writes the document rather than the lesson. Activities get selected for how they read on a printed page, not for what they force a student to think about, which is why the plans feel plausible and teach very little.",
      "This version takes the objective, the prior knowledge actually present in the room, the time you have and the misconceptions you already expect from this class, then commits to a sequence and tells you where it would cut if the lesson overruns.",
    ],

    sections: [
      {
        heading: "Writing a lesson plan around a learning objective",
        body: [
          "A chatgpt prompt for lesson planning is only worth running when it starts from the objective, because the objective is what decides which activities earn their place. Everything else is decoration that fills time.",
          "The prompt therefore refuses vague objectives. If you write that students will understand osmosis, it rewrites that as something observable, such as predicting the direction of water movement given two concentrations, and tells you it has done so. That rewrite is often the most useful thirty seconds of the exchange, because an objective nobody can observe cannot be assessed and cannot be planned towards.",
        ],
      },
      {
        heading: "What the lesson plan prompt needs before it plans anything",
        body: [
          "Six inputs, and the plan degrades noticeably when any of them is left blank. None of them takes long to write, because you already hold all six in your head before you sit down.",
        ],
        list: [
          "The class, including set or stream, because a plan for a top set and a bottom set of the same year are different lessons.",
          "The objective, stated as a thing students do rather than a thing they appreciate.",
          "The real length, including the five minutes lost to a room change.",
          "Prior knowledge, specifically what they have already done rather than what the scheme of work says they covered.",
          "The misconceptions you expect from this group, taken from last year's exercise books.",
          "Practical constraints, so you are not handed a plan that needs equipment or staffing you do not have.",
        ],
      },
      {
        heading: "Misconceptions belong in the plan, not the debrief",
        body: [
          "Most generated plans treat misconceptions as a warning: remind students that mass is not weight. Reminding does almost nothing. A misconception survives being told it is wrong, because the student holds it as a working model that has explained things adequately for years.",
          "The prompt requires each misconception to be met with a task that exposes it, so the student encounters the point where their model fails rather than hearing that it does. That constraint changes the lesson shape more than any other line in the prompt, and it is the reason the misconceptions field is worth filling honestly.",
        ],
      },
      {
        heading: "Differentiation that changes support, not destination",
        body: [
          "Ask any model for differentiation ideas for mixed ability classes and the default is three worksheets aimed at three different endpoints, which quietly decides in advance that a third of the class will not meet the objective.",
          "This prompt holds the destination fixed and varies the scaffolding: a partly worked example, a vocabulary bank, a sentence stem, a first step already taken. Stretch works the same way in reverse, removing support rather than adding a harder topic. It is a smaller idea than most differentiation advice and it survives contact with a real classroom better.",
        ],
      },
      {
        heading: "How to write a lesson plan with checks for understanding",
        body: [
          "How to write a lesson plan with checks for understanding built into the sequence: it tells you when to stop, and that is its main value. The prompt insists the checks generate evidence from everyone, so mini whiteboards, a hinge question with a forced choice, or an exit ticket, rather than a question to the room.",
          "It also asks for the wrong answer that would worry you most. Naming that in advance is what turns a check into a decision point, because you have already decided what you will do if you see it rather than improvising while thirty students wait.",
        ],
      },
      {
        heading: "What it cannot do for you",
        body: [
          "The plan is a first draft written by something that has never met your class. It does not know that the last twenty minutes on a Friday are a different environment, or that two students cannot sit together. The assumptions section exists so those gaps are visible rather than buried.",
          "It is genuinely fast, and speed is the honest selling point. Teachers working out how to plan a lesson in twenty minutes on a Sunday evening are not choosing between this and a beautifully crafted plan, they are choosing between this and improvising on Monday. A draft you argue with beats a blank page, provided you do the arguing.",
        ],
      },
    ],

    howTo: {
      name: "How to use the lesson plan prompt",
      steps: [
        {
          name: "Write the objective as an observable action",
          text: "Start it with a verb someone could watch: predict, sort, derive, justify. If you cannot picture the evidence, the objective is not ready and the plan will drift.",
        },
        {
          name: "Fill the misconceptions field from real books",
          text: "Two errors you actually marked last year outperform any generic list, because they are the ones this cohort will bring with them.",
        },
        {
          name: "Read the assumptions section first",
          text: "Scroll to the last section before the sequence. Correct anything about equipment, room or behaviour, then rerun rather than patching the plan by hand.",
        },
        {
          name: "Cut one step before you teach",
          text: "The timing is optimistic on every model tested. Use the section that names what to drop, and drop it in advance rather than at forty minutes.",
        },
      ],
    },

    faq: [
      {
        question: "Does the lesson plan prompt work without a curriculum objective?",
        answer:
          "It runs, but the output is worth much less. Without an objective the model has nothing to test activities against, so it fills the time with things that look like teaching. Paste the objective from your scheme of work even if the wording is clumsy.",
      },
      {
        question: "Can it plan a sequence of lessons rather than one?",
        answer:
          "Run it once per lesson and give it the previous lesson's objective as prior knowledge. Asking for a whole unit in one response produces a topic list with time attached, because nothing forces it to think about what students can do at the start of lesson four.",
      },
      {
        question: "Is it safe to use the plan without checking subject accuracy?",
        answer:
          "No. Both models tested will state a subject fact confidently and occasionally get it wrong, most often with worked numerical examples and dates. Read the content of any explanation or example it writes before you put it in front of a class.",
      },
      {
        question: "How should students be involved, if at all?",
        answer:
          "They should not be running this prompt to plan their own lessons, but the checks for understanding it produces make good self testing material. Sharing the objective and the check question with a class is more useful than sharing the plan itself.",
      },
      {
        question: "Why does it insist on rewriting my objective?",
        answer:
          "Because objectives built on understand, know or appreciate cannot be observed, and an objective you cannot observe cannot be checked in the lesson. The rewrite is a proposal rather than a correction, and you can reject it, but it usually improves the assessment as well as the plan.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description:
          "Turns the objective you planned towards into retrieval questions for the following week, using the same misconception list.",
      },
      {
        href: "/education-prompts/concept-explanation-prompt",
        label: "concept explanation prompt",
        description:
          "For the five minutes of the lesson where you have to explain the hard idea out loud rather than set an activity.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The same problem outside teaching: an expert describing a routine leaves out the steps they no longer notice performing.",
      },
    ],

    externalLinks: [
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit",
        label: "Education Endowment Foundation: Teaching and Learning Toolkit",
        description:
          "Meta analytic evidence on which classroom approaches carry the strongest effect, used here to justify checks for understanding over extended activities.",
      },
      {
        href: "https://nap.nationalacademies.org/catalog/24783/how-people-learn-ii-learners-contexts-and-cultures",
        label: "National Academies: How People Learn II",
        description:
          "The standard synthesis on prior knowledge and misconception change, which is the basis for treating misconceptions as tasks rather than warnings.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the structured output and explicit constraint patterns the prompt relies on to keep every planned step tied to the objective.",
      },
    ],
  },
};

export default meta;
