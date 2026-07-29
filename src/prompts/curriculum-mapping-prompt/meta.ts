import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "curriculum-mapping-prompt",
  name: "Scheme of Work Mapper",
  title: "Curriculum Mapping Prompt",
  category: "education-prompts",
  taskType: "plan",
  summary:
    "Orders a scheme of work by prerequisite, checks every specification point for coverage, and names the content taught but never assessed.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["curriculum", "sequencing", "schemes of work", "coverage"],

  seo: {
    primaryKeyword: "curriculum mapping prompt",
    keywords: [
      "curriculum mapping prompt",
      "sequencing a scheme of work",
      "prerequisite knowledge before a topic",
      "ai prompt for curriculum coverage",
      "spotting gaps against a specification",
      "mapping assessment points across a term",
    ],
    seoTitle: "Curriculum Mapping Prompt: Sequence, Coverage, Gaps",
    seoDescription:
      "A curriculum mapping prompt that orders topics by prerequisite, checks every specification point for coverage, and names content taught but never assessed.",
  },

  prompt: {
    text: `You are mapping a scheme of work. Your first loyalty is to the order things have to be learned in, not to the order the specification lists them.

SPECIFICATION POINTS, PASTED IN FULL: {{SPEC}}
TEACHING WEEKS AVAILABLE, WITH HOLIDAYS AND LOST WEEKS: {{WEEKS}}
WHAT STUDENTS ARRIVE ALREADY KNOWING: {{PRIOR}}
FIXED POINTS I CANNOT MOVE: {{FIXED}}
SHARED RESOURCES OR ROOMS THAT CONSTRAIN ME: {{CONSTRAINTS}}

Do this in order.
1. Build a dependency list first. For each specification point, name the other points that must be taught before it and say why. If a point has no prerequisite, say none rather than guessing one.
2. Only then produce a week by week sequence that never places a topic before something it depends on. Where the specification order and the dependency order disagree, follow the dependency order and flag the swap.
3. Cost every topic in teaching weeks, then total them. If the total exceeds the weeks I gave you, do not compress silently. Show the overrun and propose what is cut or merged, naming what is lost.
4. Place assessment points. Each one names which specification points it can validly test, given what has been taught by that week.
5. Report ORPHANS, content taught but never assessed anywhere in the plan, and ASSUMPTIONS, content your assessments rely on that never appears in the teaching sequence.
6. Report POINTS TAUGHT TWICE and say whether the second pass is deliberate interleaving or accidental duplication.

Return the dependency list, the week by week map as a table, the overrun statement, the assessment placement, and the orphans and assumptions report. End with the three sequencing decisions you were least confident about.`,
    variables: [
      {
        token: "SPEC",
        label: "Specification points, pasted in full",
        example:
          "The 34 content statements from Edexcel GCSE Geography B, Component 1, covering hazardous earth, development dynamics and challenges of an urbanising world",
      },
      {
        token: "WEEKS",
        label: "Teaching weeks available, including losses",
        example:
          "38 timetabled weeks, minus two for mock exams, one for the residential trip and roughly three lost to assemblies and snow days",
      },
      {
        token: "PRIOR",
        label: "What students arrive already knowing",
        example:
          "Key stage 3 covered plate tectonics and basic map skills, but almost no economic geography and no data interpretation beyond bar charts",
      },
      {
        token: "FIXED",
        label: "Fixed points you cannot move",
        example: "Fieldwork must happen in the summer term, and the year 11 mock is the second week of December",
      },
      {
        token: "CONSTRAINTS",
        label: "Shared resources or rooms",
        example: "One set of 30 atlases shared with the history department, and the computer room is bookable twice a half term",
      },
    ],
    expectedOutput:
      "A prerequisite list built before any sequencing, a week by week table that never breaks a dependency, an explicit statement of any overrun with proposed cuts, assessment points tied to what has been taught, and a report of orphaned and assumed content.",
    followUps: [
      "Produce the year 10 half of this map as a single page I can put on the department wall, with the dependency arrows shown.",
      "Take the three low confidence decisions and argue the opposite sequencing for each, so I can take both versions to the department meeting.",
      "Rewrite the map assuming I lose four more weeks than planned, and tell me what the first cut is.",
    ],
    pitfalls: [
      "Pasting topic headings instead of the specification statements produces a plausible order and no coverage check, because coverage can only be tested against the statements themselves.",
      "Leaving the prior knowledge field empty makes the model assume nothing was taught before, which pushes three weeks of unnecessary foundation into the autumn term.",
      "The orphans list often looks wrong at first glance. Check it anyway. Content taught in October and never assessed until the summer is the content students have forgotten by March.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Specification order is publication order, not teaching order, and a model asked to sequence a scheme follows the document because the document looks authoritative. Building the prerequisite list as a separate first step, before any week is filled, surfaces topics currently taught after the calculations that depend on them. Coverage gaps then get checked against that same list.",
  },

  article: {
    intro: [
      "A curriculum mapping prompt should tell you what your scheme of work gets wrong before it tells you how to lay it out. Most schemes are laid out fine. What they get wrong is order, and the order fault is invisible on a grid because every topic is present and every week is full.",
      "This prompt builds the dependency list before it builds the map. Every specification point is asked what has to be understood first, and only then does anything get placed in a week. When the specification order and the learning order disagree, the learning order wins and the swap is flagged.",
      "It finishes with two lists that departments rarely produce for themselves: content taught but never assessed, and content assessed but never taught.",
    ],

    sections: [
      {
        heading: "Coverage and sequence are separate problems",
        body: [
          "Sequencing a scheme of work is often confused with covering it. Coverage asks whether all 34 statements appear somewhere. Sequence asks whether each one appears after the thing it depends on. A scheme can score perfectly on the first and fail badly on the second, and the failure shows up months later as a class that cannot do the calculation rather than as a hole in the plan.",
          "Splitting the two makes both checkable. The prompt does coverage as a tick list against the pasted statements, which is dull and mechanical and exactly what a model is good at. Sequence gets the reasoning.",
        ],
      },
      {
        heading: "The dependency list has to come first",
        body: [
          "Prerequisite knowledge before a topic is the whole of curriculum sequencing, and it is the step people skip because it feels obvious while you are doing it. It is obvious in your own subject knowledge. It is not obvious in a document, which is why the same out of order pairing survives three years of a scheme being edited.",
          "Asking for dependencies before any weeks are allocated changes the answer materially. Sequence first and the model produces a sensible looking calendar and then rationalises it. Dependencies first and the calendar is constrained by something, so the awkward swaps surface as swaps rather than getting smoothed over.",
        ],
      },
      {
        heading: "Orphans, assumptions and the coverage gap",
        body: [
          "An ai prompt for curriculum coverage that only counts statements will tell you everything is covered. The interesting failures are asymmetric. Orphaned content is taught in week nine and never tested again, so nobody discovers it did not stick. Assumed content is tested in a March assessment that relies on a technique the sequence never teaches, which produces a cohort wide dip that gets blamed on the students.",
          "Spotting gaps against a specification is straightforward once the two lists exist side by side. What departments do about them varies: an orphan usually needs a retrieval slot rather than a reteach, and an assumption is either a missing week or an assessment written against the wrong term.",
        ],
      },
      {
        heading: "Where the curriculum mapping prompt places assessment",
        body: [
          "Mapping assessment points across a term is constrained by one rule that sounds trivial and is broken constantly: an assessment can only test what has already been taught by that week. Departmental assessment calendars are usually set centrally and in advance, so the paper arrives before the content does and two questions get quietly ignored.",
          "So each assessment point in the output names the statements it can validly test. If that list is short, the assessment is in the wrong week or the sequence is. Either way the conflict is on the page in July rather than in a corridor in February.",
        ],
      },
      {
        heading: "Duplication is sometimes the plan",
        body: [
          "The report flags every point taught twice, and then asks whether the repeat is interleaving or an accident. Both exist in real schemes. Deliberate revisiting of a hard idea in a new context is one of the few sequencing decisions with strong evidence behind it. Two teachers each covering the same statement because the handover between units was never agreed is just a lost week.",
          "The distinction is not something a model can make on its own, which is why the output asks rather than deletes. A department can answer it in about ninety seconds per row.",
        ],
      },
      {
        heading: "The overrun conversation",
        body: [
          "Almost every first map overruns, usually by four to six weeks, because teaching weeks in a planning document are longer than teaching weeks in a school. The prompt is told not to compress silently, and that instruction matters more than any other single line in it.",
          "A compressed plan hides the decision. An explicit overrun with a proposed cut puts it in front of the department, where somebody can say that they would rather lose the second case study than half the fieldwork preparation. That is the conversation the map exists to start.",
        ],
      },
    ],

    howTo: {
      name: "How to run the curriculum mapping prompt",
      steps: [
        {
          name: "Paste the specification statements verbatim",
          text: "Not your unit titles. Coverage is checked against the wording of the statements, and a heading like population change hides four separate requirements.",
        },
        {
          name: "Subtract the lost weeks before you start",
          text: "Mocks, trips, exam leave, the two days lost to the school production. A 38 week year is usually a 32 week year, and planning against 38 guarantees the summer term gets eaten.",
        },
        {
          name: "Read the dependency list on its own",
          text: "Before you look at any calendar. Disagree with it where your subject knowledge says otherwise, correct it, and rerun the sequencing from the corrected list.",
        },
        {
          name: "Take the low confidence decisions to the department",
          text: "The final three are the ones worth an argument. Everything else in a sequence is usually uncontroversial once the dependencies are agreed.",
        },
      ],
    },

    faq: [
      {
        question: "Can a curriculum mapping prompt design a curriculum from nothing?",
        answer:
          "It can order and cost one, which is a different job. What content belongs in a curriculum is a decision about what your students should know, made by people who know them, and delegating it to a model produces something generic that satisfies the specification and nobody in the building.",
      },
      {
        question: "How long a specification can it handle in one pass?",
        answer:
          "Around forty statements before the dependency reasoning starts thinning out. For a full A level, split by component and map each separately, then run a short pass across the boundary to catch dependencies that cross from one component into another.",
      },
      {
        question: "Does the sequence account for teacher subject knowledge?",
        answer:
          "Only if you tell it. Add a line saying which topics are taught by non specialists and it will place those later, giving preparation time, and will flag where a non specialist is being asked to teach something the rest of the sequence depends on.",
      },
      {
        question: "What if our assessment calendar is fixed by the school?",
        answer:
          "Put the dates in the fixed points field. The output then bends the sequence towards them and tells you which assessment points still cannot validly test what they are meant to, which is a much easier case to take to a senior leader than a general complaint about the calendar.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/lesson-plan-prompt",
        label: "lesson plan prompt",
        description:
          "The next zoom level down, once a week in the map needs to become an actual lesson.",
      },
      {
        href: "/education-prompts/exam-question-prompt",
        label: "exam question prompt",
        description:
          "Write the assessment against the statements the map says have been taught by that week.",
      },
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "For the end of the map, where the orphaned content needs to reappear before the exam.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "The same dependency discipline applied to a procedure, where steps also get written in the wrong order.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.gov.uk/government/publications/school-inspection-handbook-eif",
        label: "Ofsted: school inspection handbook",
        description:
          "Sets out the expectation that a curriculum is sequenced so knowledge builds, which is the standard this map is checked against.",
      },
      {
        href: "https://www.learningscientists.org/blog/2016/7/28-1",
        label: "The Learning Scientists: interleaving",
        description:
          "Summarises the research distinguishing deliberate revisiting from accidental duplication in a scheme of work.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents why forcing an intermediate artefact, here the dependency list, produces better downstream ordering than asking for the plan directly.",
      },
    ],
  },
};

export default meta;
