import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "lesson-differentiation-prompt",
  name: "Three Route Lesson Adapter",
  title: "Lesson Differentiation Prompt",
  category: "education-prompts",
  taskType: "plan",
  summary:
    "Adapts one lesson into a supported, core and deepening route to the same objective, and tags every change as presentation or demand.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["differentiation", "planning", "inclusion", "scaffolding"],

  seo: {
    primaryKeyword: "lesson differentiation prompt",
    keywords: [
      "lesson differentiation prompt",
      "how to adapt a lesson for mixed ability",
      "how to scaffold without lowering the learning objective",
      "ai prompt for differentiated tasks",
      "how to support eal learners in class",
    ],
    seoTitle: "Lesson Differentiation Prompt: One Objective, Three Routes",
    seoDescription:
      "A lesson differentiation prompt that builds supported, core and deepening routes to the same objective, tags every change, and dates every scaffold for removal.",
  },

  prompt: {
    text: `You are adapting one lesson so every student reaches the same learning objective by a different route. You are not writing three lessons and you are not writing three objectives.

THE OBJECTIVE EVERY STUDENT MUST MEET: {{OBJECTIVE}}
THE CORE TASK AS I CURRENTLY TEACH IT: {{TASK}}
THE CLASS, WITH THE BARRIERS I ACTUALLY SEE: {{CLASS}}
STUDENTS WHO NEED MORE THAN THE CORE TASK: {{STRETCH}}
WHAT I CAN PREPARE IN TWENTY MINUTES: {{PREP}}

Rules.
- The objective never changes between routes. If a route only works by asking for less thinking, discard it and tell me you discarded it.
- Tag every adaptation as PRESENTATION, meaning it changes how the task is read, or DEMAND, meaning it changes how hard the thinking is. The supported route may use presentation changes only.
- Each support arrives with the lesson in which it is withdrawn and the evidence that says it can go.
- Depth beats volume for the deepening route. Reject anything that is the same question again with larger numbers.
- If a need in my class description cannot be met by this lesson, name it rather than covering it.

Return.
1. THE SHARED OBJECTIVE in one sentence a student would understand.
2. THREE ROUTES, supported, core and deepening, each with the task wording, the resource required and what happens in the first five minutes.
3. ADAPTATION AUDIT, every change listed and tagged, with the preparation minutes it costs me.
4. WITHDRAWAL PLAN for each support.
5. REFUSED ADAPTATIONS, the tempting changes that would have lowered the objective.
6. THE CHECK, one question I can ask a student on any route to know whether they got there.`,
    variables: [
      {
        token: "OBJECTIVE",
        label: "The objective every student must meet",
        example:
          "Students can explain why the rate of photosynthesis stops rising once light intensity is no longer the limiting factor",
      },
      {
        token: "TASK",
        label: "The core task as you currently teach it",
        example:
          "Students plot the pondweed bubble count against distance from the lamp, then write a paragraph explaining the shape of the curve",
      },
      {
        token: "CLASS",
        label: "The class and the barriers you actually see",
        example:
          "Year 10 mixed set of 29. Six read well below age expectation, four arrived from Romania in the last eighteen months, two have processing delays and need instructions in writing",
      },
      {
        token: "STRETCH",
        label: "Students who need more than the core task",
        example: "Five students already explain limiting factors correctly and finish written work ten minutes early",
      },
      {
        token: "PREP",
        label: "What you can realistically prepare",
        example: "Twenty minutes at the photocopier tonight, no laminating, no new practical equipment",
      },
    ],
    expectedOutput:
      "One objective phrased for students, three usable routes with real task wording, a tagged audit of every adaptation, a dated withdrawal plan for each support, and an honest list of the changes it refused to make.",
    followUps: [
      "Write the supported route as a printed instruction sheet at reading age nine, keeping the same objective wording.",
      "Give me the two minute conversation I have with each student on the deepening route so it does not become quiet independent work.",
      "Turn the adaptation audit into a seating plan showing where each route sits in the room and why.",
    ],
    pitfalls: [
      "Describing the class as low ability produces routes built on assumptions about the students rather than on the barrier in front of them. Name the barrier: reading, recall, language, stamina.",
      "Leaving the preparation field blank gets you a beautiful three route lesson that takes ninety minutes to resource, and you will run the original instead.",
      "The refused adaptations section looks like padding until the week you were about to hand the supported group a fill in the gaps sheet and call it differentiation.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Differentiation drifts into lowering the objective. Explain quietly becomes describe for the supported group, which is different cognition wearing the same lesson title, and nothing on the page admits the swap. Tagging every adaptation as presentation or demand makes it visible, and restricting the supported route to presentation changes keeps all three routes pointed at one destination.",
  },

  article: {
    intro: [
      "A lesson differentiation prompt is worth running only if the same objective survives all three versions of the task. The moment the supported group is asked to describe something while everyone else explains it, the lesson has quietly split into two lessons with two destinations, and the gap it was meant to close gets wider.",
      "This prompt holds the objective still and moves everything else. It produces a supported route, a core route and a deepening route, then audits every change it made and tells you which ones altered how hard the thinking was rather than how easy the page was to read.",
      "It also refuses things. The output ends with the adaptations it declined to make, which is usually the section teachers photograph.",
    ],

    sections: [
      {
        heading: "Same objective, different door",
        body: [
          "Knowing how to adapt a lesson for mixed ability goes wrong at the point where three tasks become three ambitions. Everyone can look busy, the books look differentiated, and at the end of the term the supported group has never once been asked to do the thinking the objective describes.",
          "Holding one objective across three routes is harder to plan and much easier to assess, because there is a single question at the end that any student in the room can be asked. The prompt insists on that question and puts it last, so you can check the routes against it before you print anything.",
        ],
      },
      {
        heading: "Presentation changes and demand changes are different animals",
        body: [
          "A larger font, a glossary, a worked example on the wall and instructions in numbered steps all change how the task is read. A halved word count, a multiple choice version and a paragraph with the conclusion already written change how hard the thinking is. Both get called differentiation and only the first kind is safe to give the group that is already behind.",
          "That is why the prompt tags every change. How to scaffold without lowering the learning objective is almost always a presentation change plus time, and the tagging makes the trade visible before the lesson rather than after the assessment. How to support EAL learners in class is the clearest case: a student who cannot yet write the explanation in English may be entirely capable of giving it, so the adaptation belongs to language access, not to cognitive demand.",
        ],
        list: [
          "Presentation: vocabulary listed in advance, instructions in writing as well as spoken, one worked example, a larger diagram.",
          "Demand: fewer variables to control, the conclusion supplied, the reasoning step removed, the question turned into a recognition task.",
          "Time: the same task with longer to do it, which is the most underused adaptation in the building.",
        ],
      },
      {
        heading: "Scaffolds need a withdrawal date",
        body: [
          "A writing frame handed out in September and still in use in June has stopped being a scaffold and become part of the task. Students learn to fill it in, which is a genuine skill and not the one on the specification.",
          "So the prompt asks for the lesson in which each support is removed and the evidence that would tell you it can go. The evidence line matters more than the date. A student who completes the frame accurately three times in a row is ready, and a date on its own tells you nothing about that.",
        ],
      },
      {
        heading: "What the lesson differentiation prompt will not do",
        body: [
          "An ai prompt for differentiated tasks that says yes to everything is worse than no prompt, because it will happily generate a cut down worksheet, label it support, and hand you a document that looks like planning. This one carries a refusal list, and the refusals are specific to the objective you typed in.",
          "In practice the refused list catches three habits: replacing writing with colouring, replacing analysis with matching, and replacing a hard question with an easier question about the same topic. All three feel like kindness in the moment and all three cost the student the lesson.",
        ],
      },
      {
        heading: "Depth for the group that finished early",
        body: [
          "Extension work that is not just more questions is the half of differentiation that gets abandoned first, usually because a second worksheet is faster to find than a genuinely harder idea. The prompt blocks the volume route explicitly, so the deepening column has to contain a change of demand: a counter example to reconcile, a second variable in play, a claim to argue against, or the same conclusion reached from different data.",
          "Depth is also easier to mark. Three sentences reconciling an anomaly tell you more about a student than a page of correct repetitions, and they take a fraction of the time to read.",
        ],
        subsections: [
          {
            heading: "Deepening without leaving the class behind",
            body: [
              "The follow up that scripts a two minute conversation exists because the deepening route silently becomes independent reading otherwise. If the strongest students in the room only ever get harder paper and never get you, they are being managed rather than taught.",
            ],
          },
        ],
      },
      {
        heading: "Twenty minutes of preparation is the real limit",
        body: [
          "Most published differentiation advice is written as though resourcing is free. It is not, and a plan that needs an hour of preparation on a Tuesday evening is a plan you will abandon in favour of the version you already have.",
          "Giving the prompt an honest preparation budget changes what it proposes. With twenty minutes it reaches for spoken instructions, a vocabulary list on the board and a rearranged seating plan, which are cheap and work. With no budget stated it reaches for three printed booklets.",
        ],
      },
    ],

    howTo: {
      name: "How to run the lesson differentiation prompt",
      steps: [
        {
          name: "Write the objective as a verb students perform",
          text: "Explain, justify, calculate, compare. If the objective is understand, the routes will drift, because nobody can tell whether a student did it.",
        },
        {
          name: "Describe barriers, not labels",
          text: "Six students read three years below age is usable. Low ability is not, and it produces adaptations aimed at a category rather than at a difficulty.",
        },
        {
          name: "Check the adaptation audit before the routes",
          text: "Read the tags first. Any demand tag in the supported column is the model quietly lowering the objective, and it is faster to catch there than in the task wording.",
        },
        {
          name: "Test the final check question on the supported route",
          text: "Ask whether a student who completed only that route could answer it. If not, the route is a parallel lesson and needs rebuilding.",
        },
      ],
    },

    faq: [
      {
        question: "Does the lesson differentiation prompt work for primary as well as secondary?",
        answer:
          "Yes, and the preparation limit matters more there because a primary teacher plans across subjects every day. State the age group in the class field and ask for the supported route to be spoken rather than printed, which removes most of the resourcing cost.",
      },
      {
        question: "How is this different from just giving three worksheets?",
        answer:
          "Three worksheets usually carry three objectives, discovered only when the assessment arrives. This produces one objective with three ways in, plus an audit that shows you where the thinking was made easier rather than the reading, so the drift is visible while you can still fix it.",
      },
      {
        question: "What if a student genuinely cannot access the objective?",
        answer:
          "Then the honest output says so. The prompt is told to name needs the lesson cannot meet rather than pretend, and that line is usually the start of a conversation with the special educational needs coordinator rather than something you solve alone at the photocopier.",
      },
      {
        question: "Can I use the same routes across a whole unit?",
        answer:
          "The tagging carries across, the tasks do not. Run it per lesson for the two or three lessons in a unit that carry the hardest thinking, and use your normal planning for the rest. Differentiating everything equally is how the habit collapses by half term.",
      },
      {
        question: "Should students know which route they are on?",
        answer:
          "They already know. Naming the routes by what they contain rather than by ability, for example the version with the worked example, keeps the choice about the task and lets a student move between them during the lesson without an announcement.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description:
          "Build the lesson around one objective first, then bring it here to open three routes through it.",
      },
      {
        href: "/education-prompts/concept-explanation-prompt",
        label: "concept explanation prompt",
        description:
          "Useful for the supported route, where the barrier is usually the explanation rather than the task.",
      },
      {
        href: "/education-prompts/grading-rubric-prompt",
        label: "grading rubric prompt",
        description:
          "One objective across three routes needs one set of criteria, or the marking reintroduces the split you removed.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "For rewriting task instructions so reading level stops being the thing you are accidentally assessing.",
      },
    ],

    externalLinks: [
      {
        href: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit",
        label: "Education Endowment Foundation: Teaching and Learning Toolkit",
        description:
          "The evidence base behind preferring adapted teaching of one objective over separate lower tasks for lower attaining groups.",
      },
      {
        href: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
        label: "SEND code of practice, 0 to 25 years",
        description:
          "Sets the expectation that adaptation happens inside the ordinary lesson, which is the constraint this prompt is built around.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags",
        label: "Anthropic: Structuring prompts with tags",
        description:
          "Explains the labelled input block pattern that keeps the class description from being read as part of the objective.",
      },
    ],
  },
};

export default meta;
