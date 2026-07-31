import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "lesson-planning-prompt",
  name: "Timed Objective Planner",
  title: "Lesson Planning Prompt",
  category: "education-prompts",
  taskType: "plan",
  summary:
    "Ties every activity to one observable objective and forces the minutes to sum exactly to the real class length before the plan is accepted.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["lesson planning", "pacing", "backward design", "teaching"],

  seo: {
    primaryKeyword: "lesson planning prompt",
    keywords: [
      "lesson planning prompt",
      "ai prompt for lesson planning",
      "how to plan a lesson with ai",
      "how to write a lesson plan that fits the class period",
      "backward design lesson plan template",
      "chatgpt prompt for time blocking a lesson",
    ],
    seoTitle: "Lesson Planning Prompt: Make Every Minute Earn Its Place",
    seoDescription:
      "A lesson planning prompt that requires one observable objective and a total class length, then forces every activity's minutes to sum to that total.",
  },

  prompt: {
    text: `You are a teacher writing a single lesson plan, not a generic outline. Every activity you propose must be justified by one stated learning objective, and every activity's time allocation must be stated in minutes and must sum exactly to the total class length. Discard any activity that does not clearly serve the objective, even if it is a familiar routine.

TOPIC: {{TOPIC}}
AUDIENCE: {{GRADE_LEVEL_OR_AUDIENCE}}
LEARNING OBJECTIVE: {{LEARNING_OBJECTIVE}}
TOTAL CLASS LENGTH: {{CLASS_LENGTH_MINUTES}} minutes
PRIOR KNOWLEDGE: {{PRIOR_KNOWLEDGE}}
MATERIALS AVAILABLE: {{MATERIALS_AVAILABLE}}

Rules you must follow.
- If the objective is not observable, meaning it uses words like understand, learn about or explore, rewrite it as something a student can visibly do and flag the change before planning anything else.
- List every activity with its exact minutes. Before finishing, add the minutes and state the total. If it does not equal the stated class length, adjust the plan until it does. Do not round or approximate.
- For every activity, name the specific part of the objective it serves in one clause. If you cannot name one, cut the activity rather than keep it as a warm up or filler.
- Build only on what PRIOR KNOWLEDGE states the students already have. Do not assume a skill or fact that was not listed.
- Respect MATERIALS AVAILABLE exactly. Do not propose equipment, software or resources outside that list.

Return exactly these sections.
1. THE OBJECTIVE, restated observably if you changed it.
2. TIMED SEQUENCE, each activity with its minutes, what happens, and the objective link.
3. TIME CHECK, the sum of every activity's minutes shown against the stated total.
4. ASSUMPTIONS, anything about the room, students or resources you had to guess.`,
    variables: [
      {
        token: "TOPIC",
        label: "Topic",
        example: "The water cycle: evaporation, condensation and precipitation",
      },
      {
        token: "GRADE_LEVEL_OR_AUDIENCE",
        label: "Grade level or audience",
        example: "Grade 5, mixed ability, 28 students",
      },
      {
        token: "LEARNING_OBJECTIVE",
        label: "Learning objective",
        example:
          "Students can label a diagram of the water cycle and explain, in one sentence per stage, what causes water to move from one stage to the next",
      },
      {
        token: "CLASS_LENGTH_MINUTES",
        label: "Total class length in minutes",
        example: "45",
      },
      {
        token: "PRIOR_KNOWLEDGE",
        label: "Prior knowledge",
        example:
          "Students know water exists as liquid, ice and vapor, but have not connected a temperature change to a continuous cycle",
      },
      {
        token: "MATERIALS_AVAILABLE",
        label: "Materials available",
        example: "Whiteboard and markers only, no projector, no internet access, worksheets can be printed in advance",
      },
    ],
    expectedOutput:
      "A timed sequence where every activity carries an explicit link to the objective, a time check whose summed minutes equal the stated class length exactly, and a list of assumptions about the room or students you should correct before teaching.",
    followUps: [
      "The time check is two minutes over. Cut the least objective-linked activity and rerun the time check.",
      "Rewrite the sequence assuming five minutes are lost to a fire drill halfway through.",
      "Turn the final activity into an exit ticket that produces evidence from every student, not just volunteers.",
    ],
    pitfalls: [
      "Leaving the objective as a topic label, such as learn about the water cycle, gets you a plan of pleasant but unaccountable activities. Expect the model to rewrite it, and accept the rewrite.",
      "Giving a rounded class length such as about fifty minutes defeats the time check. Use the exact number after transitions, or the sum will look right against a figure that was never real.",
      "Skipping prior knowledge produces a plan pitched at an average student who is not actually in the room. Two sentences on what this group has already done change the sequence more than any other field.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked for a lesson plan without a required total, a model distributes activities that look proportionate but rarely sum to the real period, most often understating a transition or a settling routine. Asked without a required objective, it defaults to a plausible sequence of starter, task and plenary that would serve almost any topic. Requiring the minutes to sum to the stated total and every activity to name the part of the objective it serves is what turns a document into a plan that survives the actual clock.",
  },

  article: {
    intro: [
      "A lesson planning prompt earns its keep only when it enforces two disciplines that most generated lessons skip. Every activity it proposes has to serve one stated learning objective, and every activity's minutes have to add up to the actual class length. Skip either constraint and the result is a plausible looking document that drifts off the point or overruns the bell.",
      "Search for an ai prompt for lesson planning and most results return a warm up, a main task and a plenary that would sit comfortably on almost any topic, because nothing forced the model to check its choices against an outcome or a clock. Learning how to plan a lesson with ai that survives a real timetable means giving it two numbers it cannot ignore: one measurable outcome and the exact minutes available.",
      "This version takes the objective, the total time, what students already know and what materials are in the room, then builds a timed sequence backward from those constraints and shows its working: the objective restated observably, the minutes summed against the total, and the assumptions it had to make.",
    ],

    sections: [
      {
        heading: "The six inputs a lesson planning prompt actually needs",
        body: [
          "Six fields, and skipping any one of them lets the model fall back on a generic default it has seen thousands of times.",
        ],
        list: [
          "The topic, stated plainly, such as the water cycle rather than earth science generally.",
          "The audience, including grade and grouping, since a plan for a large mixed ability class is not a plan for a small advanced group.",
          "The learning objective, phrased as something a student can visibly do, not a topic label.",
          "The total class length in minutes, the real number after transitions, not the figure on the timetable.",
          "Prior knowledge, specifically what this group has already done, not what the curriculum assumes.",
          "Materials available, so the plan never proposes a projector or a lab kit the room does not have.",
        ],
      },
      {
        heading: "Every activity must serve the stated objective, not fill time",
        body: [
          "A generic lesson plan fills a class period with things that look like teaching: a starter question, a card sort, a plenary. None of it is checked against what students should be able to do by the end, which is why it reads well and teaches less than it appears to. It resembles a backward design lesson plan template used loosely rather than one used properly, which starts from the outcome, not the activities.",
          "This prompt forbids that drift. Every activity must name, in one clause, the part of the objective it serves. An activity that cannot be tied to the objective in a single sentence gets cut, even if it is a familiar routine. That rule removes most of the padding a generic ai lesson still carries.",
        ],
      },
      {
        heading: "Minutes have to sum to the real class length, not to a tidy number",
        body: [
          "Most generated plans allocate time the way a syllabus does: five minutes here, ten there, chosen because the numbers look reasonable. A lesson that looks like it fits a fifty minute period often adds up to forty two or sixty on inspection, discovered only when the bell interrupts the plenary.",
          "This prompt requires the opposite. Every activity states its minutes, and the model adds them and shows the sum against the number given before the plan is accepted. Knowing how to write a lesson plan that fits the class period exactly is a checkable constraint here: if the total is short, something is missing, and if it runs over, something must be cut before teaching.",
          "Used as a chatgpt prompt for time blocking a lesson, the same rule catches the transition time most plans quietly drop, such as the walk to the whiteboard or the two minutes lost taking the register.",
        ],
      },
      {
        heading: "Prior knowledge sets the starting line, not the topic label",
        body: [
          "A topic label tells the model almost nothing about where to start. Photosynthesis to a class that has never drawn a food chain is a different lesson from photosynthesis to a class that already models energy transfer, even though the topic line reads identically.",
          "Prior knowledge stated honestly, what this group has actually done rather than what the scheme of work claims they covered, lets the model start the sequence at the right difficulty instead of re teaching or skipping a step it has not actually met.",
        ],
      },
      {
        heading: "Materials available keeps the plan usable, not aspirational",
        body: [
          "A plan that assumes a projector, a class set of tablets or a lab kit you do not have is a wish list, not a plan. Stating the real constraint, such as a whiteboard and markers only, forces the model to design around the room being taught in rather than an ideal one.",
          "This field is optional because plenty of rooms have everything, but leaving it blank in a resource limited room is how a usable plan turns into one that has to be rewritten minutes before the lesson starts.",
        ],
      },
      {
        heading: "What a lesson planning prompt will not do for you",
        body: [
          "The plan is a first draft from something that has never met the class. It does not know a Friday afternoon behaves differently from Monday morning, and the assumptions section exists to surface gaps like that rather than hide them.",
          "It also will not check subject accuracy. A confidently stated fact or worked example can still be wrong, and the constraint that keeps the plan honest about time and objective does nothing to keep it honest about content. Read anything the plan asks to be said out loud before saying it to a class.",
        ],
      },
    ],

    howTo: {
      name: "How to use the lesson planning prompt",
      steps: [
        {
          name: "Write the objective as something observable",
          text: "Start with a verb a student could be seen doing: label, calculate, compare, justify. If the evidence cannot be pictured, rewrite the objective before running the prompt.",
        },
        {
          name: "State the real class length in minutes",
          text: "Use the number left once the register or any known interruption is accounted for, not the figure printed on the timetable. That is the number every activity has to sum to.",
        },
        {
          name: "Describe prior knowledge specifically",
          text: "Name what this group has actually done, not what the curriculum map says they should have covered. A specific starting point stops the plan re teaching content students already have.",
        },
        {
          name: "Read the time check before teaching",
          text: "Confirm the summed minutes match the total given. Adjust and rerun rather than trimming activities by hand at the last minute.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the lesson planning prompt require an observable objective?",
        answer:
          "Because an objective phrased as understand or learn about cannot be checked, and an objective nobody can check cannot be used to decide which activities belong in the lesson. The prompt rewrites a vague objective into something a student can visibly do and states the change, so the rest of the plan has something real to be measured against.",
      },
      {
        question: "Why must every activity trace back to the stated objective?",
        answer:
          "An activity that cannot be tied to the objective in one sentence is filling time rather than teaching towards the outcome, and a plan built from several such activities can look complete while leaving students no closer to what they were meant to do by the end. Naming the link for every step is what keeps that filler out.",
      },
      {
        question: "What happens if the timed activities do not sum to the class length?",
        answer:
          "The prompt is instructed to adjust the plan until they do rather than present a total that is close enough. A plan that is short by several minutes leaves a dead patch at the end of the lesson, and a plan that runs over forces an improvised cut mid lesson instead of a planned one.",
      },
      {
        question: "Can I use this without knowing my students' exact prior knowledge?",
        answer:
          "It runs, but the plan degrades into one built for a class that does not exist. A rough estimate, such as students have covered fractions but not yet mixed number conversion, is still far more useful to the model than an empty field, because it stops the plan re teaching or overshooting content.",
      },
      {
        question: "Does it work for a lesson with no technology at all?",
        answer:
          "Yes, provided the materials field states that constraint plainly. Told there is a whiteboard and markers only, the model designs around that instead of defaulting to slides or an activity that assumes equipment the room does not have.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/lesson-differentiation-prompt",
        label: "lesson differentiation prompt",
        description:
          "Takes the same objective this prompt plans towards and adapts the support around it into supported, core and deepening routes.",
      },
      {
        href: "/education-prompts/curriculum-mapping-prompt",
        label: "curriculum mapping prompt",
        description:
          "For sequencing a scheme of work across many lessons, once a single lesson planning prompt has proven the objective and timing pattern for one.",
      },
      {
        href: "/productivity-prompts/meeting-agenda-prompt",
        label: "meeting agenda prompt",
        description:
          "The same discipline outside a classroom: fitting agenda items to the minutes actually available rather than the minutes a schedule implies.",
      },
      {
        href: "/productivity-prompts/time-audit-prompt",
        label: "time audit prompt",
        description:
          "For checking where planned time actually goes over a week, the same instinct that keeps a lesson's minutes honest applied to a calendar.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ascd.org/el/articles/the-fundamentals-of-backward-planning",
        label: "ASCD: The Fundamentals of Backward Planning",
        description:
          "Describes the backward design sequence, naming the objective and its evidence before choosing activities, that this prompt's objective-first ordering follows.",
      },
      {
        href: "https://udlguidelines.cast.org/",
        label: "CAST: Universal Design for Learning Guidelines",
        description:
          "The framework behind varying support while holding a single destination objective fixed, which is why the prompt treats materials and prior knowledge as constraints rather than reasons to change the outcome.",
      },
      {
        href: "https://iris.peabody.vanderbilt.edu/",
        label: "IRIS Center, Vanderbilt Peabody College",
        description:
          "A source of evidence-based instructional practice guidance used here to support planning from known prior knowledge rather than an assumed starting point.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the explicit constraint and structured output patterns the prompt relies on to keep the time check and objective link enforced rather than optional.",
      },
    ],
  },
};

export default meta;
