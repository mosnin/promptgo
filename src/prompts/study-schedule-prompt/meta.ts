import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "study-schedule-prompt",
  name: "Cross Subject Hour Allocator",
  title: "Study Schedule Prompt",
  category: "education-prompts",
  taskType: "plan",
  summary:
    "Divides the hours you actually have between subjects by deadline and weighting, names the subject that loses, and reserves capacity for the weeks that collide.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["study", "timetabling", "deadlines", "workload"],

  seo: {
    primaryKeyword: "study schedule prompt",
    keywords: [
      "study schedule prompt",
      "allocating study hours across subjects",
      "study timetable around deadlines",
      "ai prompt for a student timetable",
      "which subject gets the least time",
      "planning around coursework deadlines",
    ],
    seoTitle: "Study Schedule Prompt: Split Real Hours Across Subjects",
    seoDescription:
      "A study schedule prompt that divides your real weekly hours between subjects by deadline and weighting, then tells you plainly which subject is being underfed.",
  },

  prompt: {
    text: `You are allocating a fixed and small number of study hours between competing subjects. This is a budgeting problem. Every hour you give one subject is taken from another, and you must say which.

SUBJECTS, WITH EVERY DEADLINE AND EXAM DATE: {{SUBJECTS}}
WHAT EACH SUBJECT IS WORTH TO ME: {{WEIGHTING}}
HOURS I CAN STUDY IN A NORMAL WEEK, BY DAY: {{HOURS}}
WEEKS THAT ARE ALREADY WRECKED: {{BAD_WEEKS}}
WHERE I AM CURRENTLY BEHIND: {{BEHIND}}
TODAY'S DATE: {{TODAY}}

Method, in this order.
1. Reduce my stated weekly hours by fifteen percent before allocating anything. That margin is not spare, it is what absorbs the week I get ill.
2. Build the deadline calendar first. Mark every week where two deadlines fall within four days of each other as a CLASH WEEK.
3. Work backwards from each deadline to reserve the hours that piece of work needs, before any general study is allocated. Coursework does not fit in leftover time.
4. Allocate the remaining hours across subjects, weighted by what I told you each is worth and by how far behind I am, not evenly and not by how much I enjoy them.
5. Protect clash weeks by moving hours forward into the two weeks before them. Never solve a clash week by adding hours to it.

Return.
A. WEEKLY HOUR TABLE, subject by week, with each week's total.
B. THE UNDERFED SUBJECT, named plainly, with how many hours it is short and what result I should expect.
C. DEADLINE RESERVATIONS, which hours are locked to which piece of work.
D. CLASH WEEKS and what was moved forward to survive them.
E. THE FIRST THING TO CUT if I lose a week, decided now rather than in the moment.
F. One sentence on whether this plan is actually deliverable, and if not, what has to change outside the timetable.`,
    variables: [
      {
        token: "SUBJECTS",
        label: "Subjects with every deadline and exam date",
        example:
          "History: essay 14 Oct, coursework draft 21 Nov, mock 8 Dec. Maths: mock 10 Dec, no coursework. Biology: practical write up 3 Nov, mock 12 Dec. EPQ: 5000 words due 15 Dec.",
      },
      {
        token: "WEIGHTING",
        label: "What each subject is worth to you",
        example:
          "Maths and biology are the two my university offer depends on. History I need to pass. The EPQ is worth half an A level and I am counting on it.",
      },
      {
        token: "HOURS",
        label: "Hours you can study in a normal week, by day",
        example:
          "Monday to Thursday two hours after tea, Friday none, Saturday three in the morning, Sunday one. I work a shift on Saturday afternoons.",
      },
      {
        token: "BAD_WEEKS",
        label: "Weeks that are already wrecked",
        example: "Week of 27 Oct is half term but I am away with family. Week of 17 Nov I have four shifts.",
      },
      {
        token: "BEHIND",
        label: "Where you are currently behind",
        example: "Two topics behind in maths after being off in September, and I have not started the EPQ writing at all",
      },
      {
        token: "TODAY",
        label: "Today's date",
        example: "29 September",
      },
    ],
    expectedOutput:
      "A week by week table of hours per subject, an explicit naming of the subject that gets least and what that will cost, hours reserved against each deadline, clash weeks protected by moving work earlier, a pre agreed first cut, and an honest verdict on whether the plan can be delivered.",
    followUps: [
      "Convert week one into a calendar with actual times, and tell me which single hour I am most likely to skip.",
      "Rewrite the plan assuming I get an extension of one week on the coursework, and show me what that buys me.",
      "I have fallen two weeks behind. Rebuild from today without moving any deadline and tell me what is now unrecoverable.",
    ],
    pitfalls: [
      "Inflating your available hours is the classic failure, and it is why the prompt cuts fifteen percent before it starts. A plan built on your best week is a plan you fail in your average one.",
      "Leaving the weighting field vague produces an even split, which is the worst possible allocation when one subject carries a university offer and another needs a pass.",
      "If the deliverability verdict says no, believe it. The honest answers there are usually about dropping a commitment or asking for an extension, and both are easier in October than in December.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Equal hours per subject is the allocation a model defaults to, and it looks fair on a colour coded grid while ignoring that one subject has coursework due in a fortnight. Working backwards from each deadline to reserve hours before any general study is allocated fixes the order. Clash weeks need capacity taken from elsewhere, not an extra evening bolted on.",
  },

  article: {
    intro: [
      "A study schedule prompt is answering a budgeting question, not a planning one. There are fewer hours than there is work, so the only useful output is a division of those hours that somebody has committed to, including the part where one subject gets less than it deserves.",
      "Most timetables refuse to make that division. They give every subject an equal share, which feels fair in September and produces a December where the coursework subject has eaten everything and the maths mock arrives untouched.",
      "This one starts from deadlines, reserves hours against them before anything else is allocated, and then names the subject being underfed along with what to expect as a result.",
    ],

    sections: [
      {
        heading: "Hours are the scarce thing",
        body: [
          "Allocating study hours across subjects is different from deciding what to study inside one. The second question is about topics and scores. The first is about whether Tuesday evening belongs to biology or to the essay due next week, and it cannot be answered by looking at either subject on its own.",
          "That is why the first step is arithmetic rather than pedagogy. Count the real hours, cut fifteen percent for the week that goes wrong, and see what is left. For most sixth formers the honest total is between eight and twelve hours a week, which is a quarter of what a colour coded timetable usually promises.",
        ],
      },
      {
        heading: "Weight by the deadline and by what the subject is worth",
        body: [
          "A study timetable around deadlines is the only kind that survives, because a deadline is the one part of the calendar that does not negotiate. Working backwards from each due date and locking hours to it before any general study is allocated is what stops coursework being done in the leftovers, which is where coursework always ends up otherwise.",
          "Weighting is the second input and the one students find uncomfortable to state. Two subjects carrying a university offer and one needing only a pass are not three equal claims on a Tuesday. Writing that down produces an allocation that looks unfair on paper and matches what actually matters in August.",
        ],
        list: [
          "Deadline distance: how many weeks until the work is due, and how many hours the work genuinely needs.",
          "Stake: what the subject is worth to the outcome you care about, stated by you rather than assumed.",
          "Deficit: where you are already behind, which buys extra hours early and gives them back later.",
        ],
      },
      {
        heading: "Somebody has to lose",
        body: [
          "Which subject gets the least time is the question every honest schedule has to answer out loud. Left implicit, the loser is chosen weekly by whichever subject felt least urgent on a Wednesday evening, and that is almost never the subject you would have chosen deliberately.",
          "Naming it also names the consequence. Six hours short in history over a term is not a disaster if you need a pass and are currently comfortable. The same shortfall in the subject holding your offer is worth reorganising your part time job over, and you can only see that difference if the number is written down.",
        ],
      },
      {
        heading: "Clash weeks and planning around coursework deadlines",
        body: [
          "Two deadlines four days apart is not two problems, it is one much larger problem, because the second piece of work has no recovery room if the first overruns. Planning around coursework deadlines properly means finding those weeks in September and moving hours out of them, not into them.",
          "The instinct is to add evenings to the collision week. It does not work: the week is already full of the ordinary school day, and the added hours come out of sleep, which costs more than it buys. Moving hours forward into the two preceding weeks is unglamorous and it is the difference between handing in two finished pieces and two rushed ones.",
        ],
        subsections: [
          {
            heading: "The pre agreed cut",
            body: [
              "Deciding in advance what gets dropped when a week disappears removes the worst decision from the worst moment. Made in October, it is a calm trade. Made on the Sunday night of the wrecked week, it is whatever you have least energy for.",
            ],
          },
        ],
      },
      {
        heading: "What the study schedule prompt refuses to pretend",
        body: [
          "The last line of the output is a verdict on whether the plan can be delivered at all. Sometimes it cannot, and a timetable that quietly fits impossible work into available hours is worse than no timetable, because it converts a resourcing problem into a personal failure three months later.",
          "When the verdict is negative the fixes are outside the grid: fewer shifts, an extension requested early, a subject dropped, or a conversation with a tutor. All four are ordinary and all four get much harder to arrange the longer the schedule pretends everything fits.",
        ],
      },
      {
        heading: "A timetable a student will actually follow",
        body: [
          "An ai prompt for a student timetable can produce something beautiful that nobody uses. The predictors of use are dull: few enough blocks to remember, hours placed where the student is already at a desk, and no session longer than the attention they actually have.",
          "It is also worth saying what this does not do. Allocating the hours is not studying, and a plan is not progress. The schedule tells you when biology gets its ninety minutes. What happens in the ninety minutes is a separate question, and it is the one that determines the grade.",
        ],
      },
    ],

    howTo: {
      name: "How to build a term plan with the study schedule prompt",
      steps: [
        {
          name: "List every date you already know",
          text: "Coursework drafts, mocks, practical write ups, the EPQ. Dates you leave out get planned around as though they do not exist, and they still arrive.",
        },
        {
          name: "Count your hours by day, not by week",
          text: "A week total hides the fact that Friday is always zero and Saturday has a shift in it. Day level detail is what makes the blocks land somewhere real.",
        },
        {
          name: "State the stakes bluntly",
          text: "Which subjects carry your offer, which need a pass, which you are currently failing. This single field changes the allocation more than everything else combined.",
        },
        {
          name: "Read the underfed subject section first",
          text: "If you disagree with the choice, change the weighting and rerun rather than adding hours. Adding hours is how you get back to a plan that assumes a perfect week.",
        },
        {
          name: "Diarise the pre agreed cut",
          text: "Write it somewhere you will see it in the bad week. The whole value of deciding early is lost if you have to remember what you decided.",
        },
      ],
    },

    faq: [
      {
        question: "How is a study schedule prompt different from a revision plan?",
        answer:
          "A revision plan sequences topics inside a subject by how well you know them. This divides hours between subjects that are competing for the same evening. You need both, and in that order: allocate the hours first, then decide what happens inside them.",
      },
      {
        question: "Why cut fifteen percent off my available hours?",
        answer:
          "Because everybody overestimates. Illness, a shift swapped in, a family thing, a night where nothing goes in. A plan with no slack fails in week three and gets abandoned entirely, whereas a plan with margin absorbs a bad week and keeps its shape.",
      },
      {
        question: "Should I rebuild the schedule when I fall behind?",
        answer:
          "Rebuild from today rather than trying to catch up on the old one. The follow up that does this will tell you what is now unrecoverable, which sounds bleak and is far better than spreading a lost fortnight thinly across ten weeks and quietly missing everything.",
      },
      {
        question: "Can a whole class use the same schedule?",
        answer:
          "No, because the inputs that matter are personal: the shifts, the wrecked weeks, the subject combination, where each student is behind. What can be shared is the deadline calendar, and handing that out in September saves every student the same twenty minutes.",
      },
      {
        question: "Does more hours in a subject actually raise the grade?",
        answer:
          "Only if the hours contain retrieval and practice rather than reading. Allocation fixes the distribution problem, not the quality problem. A student giving eight hours a week to rereading notes will be beaten by one giving four to past questions.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "What happens inside the hours once they are allocated, sequencing topics by your most recent scores.",
      },
      {
        href: "/education-prompts/flashcard-generator-prompt",
        label: "flashcard generator prompt",
        description:
          "For the short daily slot that fits around the allocated blocks rather than competing with them.",
      },
      {
        href: "/education-prompts/socratic-tutor-prompt",
        label: "socratic tutor prompt",
        description:
          "For the subject you are behind in, where extra hours only help if something changes about how they are spent.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "The adult version of the same arithmetic, for anyone studying alongside a job.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ucas.com/undergraduate/applying-university",
        label: "UCAS: applying to university",
        description:
          "The offer structure that makes weighting subjects unequally a rational decision rather than a preference.",
      },
      {
        href: "https://www.learningscientists.org/spaced-practice",
        label: "The Learning Scientists: spaced practice",
        description:
          "Evidence for distributing hours across weeks rather than concentrating them before a deadline.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: Chain of thought prompting",
        description:
          "Explains why forcing the deadline calendar to be built before allocation produces reservations that hold.",
      },
    ],
  },
};

export default meta;
