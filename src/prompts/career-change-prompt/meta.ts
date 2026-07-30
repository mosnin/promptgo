import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "career-change-prompt",
  name: "Change Audit",
  title: "Career Change Prompt",
  category: "career-prompts",
  taskType: "analyse",
  summary:
    "Separates wanting out from wanting in, classifies each skill by whether it survives the move, and ends with a test you can run in a fortnight.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["career change", "transferable skills", "job search", "planning"],

  seo: {
    primaryKeyword: "career change prompt",
    keywords: [
      "career change prompt",
      "how to change careers without starting over",
      "ai prompt for mapping transferable skills",
      "how to explain a career change in an interview",
      "how to test a career change before quitting",
      "which of my skills actually transfer",
    ],
    seoTitle: "Career Change Prompt: Test It Before You Commit",
    seoDescription:
      "A career change prompt that splits push from pull, sorts your skills by whether they survive the move, names the honest entry level and designs a cheap test.",
  },

  prompt: {
    text: `You are advising me on a possible career change. You are sceptical, you have watched people make this move well and badly, and you will not tell me whether it is a good idea, because that is not something you can know.

WHAT I DO NOW, INCLUDING THE PARTS I AM GOOD AT: {{CURRENT_WORK}}
THE WORK I AM CONSIDERING, DESCRIBED AS DAILY TASKS: {{TARGET_WORK}}
WHY I WANT TO LEAVE WHAT I DO NOW: {{WHY_LEAVING}}
EVIDENCE I HAVE ABOUT THE TARGET WORK AND WHERE IT CAME FROM: {{EVIDENCE}}
MY FINANCIAL, GEOGRAPHIC AND TIME CONSTRAINTS: {{CONSTRAINTS}}

Do five things in order.

1. Separate push from pull. State what would have to change for me to stay, then say plainly whether the target work would fix it. If my reasons are entirely push, say so and name the cheaper fix first.

2. Classify my skills as TRANSFERS, PARTIAL, DOES NOT TRANSFER or UNKNOWN. Work only from artefacts I named, meaning things I built, ran or decided. Refuse to classify adjectives such as analytical or collaborative, and tell me what artefact would settle each UNKNOWN.

3. State the likely entry level and pay band as a range with your reasoning. Mark it [UNSOURCED] if I gave you no data. Do not soften this.

4. Design one test I could run in the next fortnight, with its cost, its time and the single thing it would tell me. Small and unglamorous is correct.

5. Write the two sentences I would say to a hiring manager: what in my background makes me unusually good at one specific part of the role, and why I am moving. No narrative arc.

If I described the target work only as a feeling, refuse step two and ask for the daily tasks.`,
    variables: [
      {
        token: "CURRENT_WORK",
        label: "What you do now and what you are good at",
        example:
          "Eight years as a secondary school science teacher. Built the department assessment tracker in Sheets, ran timetabling for 14 staff, wrote the scheme of work now used across the trust.",
      },
      {
        token: "TARGET_WORK",
        label: "The target work as daily tasks",
        example:
          "Instructional designer at an edtech company. Writing course outlines, working with subject experts, building assessments, some data on completion rates.",
      },
      {
        token: "WHY_LEAVING",
        label: "Why you want to leave",
        example: "Workload, marking every evening, no control over the timetable. I still like the subject and the explaining.",
      },
      {
        token: "EVIDENCE",
        label: "Evidence about the target work and its source",
        example:
          "Two conversations with people doing it, both said stakeholder wrangling is most of the job. Read six job ads. Never done it paid.",
      },
      {
        token: "CONSTRAINTS",
        label: "Money, geography and time",
        example: "Mortgage, cannot drop below 38k, two children, Leeds or remote, can give it six months before I need income certainty",
      },
    ],
    expectedOutput:
      "A blunt separation of push from pull, every named skill sorted into one of four categories with artefacts attached, an entry level and pay range with reasoning, one fortnight sized test with a cost, and two plain sentences for a hiring manager.",
    followUps: [
      "The classification put most of my strengths in PARTIAL. Design the single project that would move three of them to TRANSFERS.",
      "Assume I cannot take any pay cut at all. What does the adjacent version of this move look like?",
      "I ran the test and disliked the middle of the work rather than the start. What does that tell me and what should I test next?",
    ],
    pitfalls: [
      "Describing the target work as something more meaningful gets step two refused, which is the correct response and annoys people every time.",
      "Listing qualities instead of artefacts produces a classification full of UNKNOWN, because there is nothing checkable to sort.",
      "The entry level estimate is often lower than expected and gets argued with. It is easier to argue with here than in a third round interview.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Sorting stated reasons into push and pull is the diagnostic that matters, because transitions driven entirely by escape tend to reverse, and no model volunteers that framing unaided. Pay data is the weak point. Outside the United States, Claude Opus 4.5 produces a salary range that looks researched and is guesswork, so advertised figures have to be pasted in rather than requested.",
  },

  article: {
    intro: [
      "A career change prompt that tells you to follow your curiosity and lists five adjacent job titles has done nothing you could not do over a drink with a friend. The difficult questions are which parts of your experience someone will actually pay for, what level you would re enter at, and whether you want the new work or simply want out of the old one.",
      "This one begins by separating those. It splits push from pull, sorts each of your skills into transferring, partially transferring or not, states the likely entry level and pay honestly, and finishes with the cheapest test you could run in the next two weeks.",
      "It will not tell you the change is a good idea. No model can know that, and a page of encouragement is the most expensive thing anyone can hand you at this stage.",
    ],

    sections: [
      {
        heading: "Push and pull are different problems",
        body: [
          "Wanting out of your job and wanting a particular kind of work feel identical from inside and lead to completely different decisions. Push on its own is frequently solved by a different employer in the same field, which costs a fraction of a career change and takes months rather than years.",
          "So the prompt asks what would have to change for you to stay, then checks whether the target work would fix it. Someone leaving because of a manager, moving into a field with an identical management culture, has bought an expensive transfer and solved nothing.",
          "Pull is easier to test and much harder to fake. It appears as evidence: the things you read without being asked to, the work you have already done unpaid, the questions you keep circling back to over years.",
        ],
      },
      {
        heading: "Which of my skills actually transfer",
        body: [
          "An ai prompt for mapping transferable skills fails the moment it starts working at the level of adjectives. Communication, leadership and problem solving transfer to everything, which is another way of saying they distinguish nothing, and nobody has ever been hired on them.",
          "This one works at the level of artefacts instead. Not you are analytical, but you built the reporting the finance team still runs on, and here is what it changed. Artefacts either transfer or they do not, and which one it is can be checked by somebody other than you.",
        ],
        list: [
          "TRANSFERS: you can point at something you made or ran that the target field values in more or less the same form.",
          "PARTIAL: the underlying capability is real, but the tools, context or regulation differ enough that one project is needed to prove it.",
          "DOES NOT TRANSFER: domain knowledge that stops at the boundary, however hard it was to acquire.",
          "UNKNOWN: you have never done it under the conditions the target field imposes, which is not the same as being unable to.",
        ],
      },
      {
        heading: "The entry point nobody wants to discuss",
        body: [
          "Questions about how to change careers without starting over usually do have a real answer, and it is rarely the one either side of the argument was hoping for. You do not normally start again from zero, and you do not normally come in at your current level either.",
          "The prompt states the likely entry level and pay band as a range with its reasoning attached, and marks it unsourced where you supplied no data. Learning that you would probably re enter a level down for eighteen months is a decision input. Learning it in a third round interview is a shock.",
          "The people who manage this well have almost always found the adjacent version of the move, meaning the role that still uses their old domain inside the new field. It is less romantic and it is considerably faster.",
        ],
      },
      {
        heading: "Using the career change prompt to design a cheap test",
        body: [
          "Working out how to test a career change before quitting costs less than every alternative and hardly anyone does it. The career change prompt insists on one test runnable inside a fortnight, with a stated cost, a stated time and one specific thing you would learn from it.",
          "Good tests are small and unglamorous. Do the unpaid version of a single task for a friend's company. Ask three people doing the job what a Tuesday looks like rather than what their best week looked like. Finish one piece of work in the target field and pay attention to whether you enjoyed the middle of it, because the middle is where nearly all of the work lives.",
        ],
      },
      {
        heading: "The story a hiring manager needs",
        body: [
          "How to explain a career change in an interview comes down to two sentences, and neither is really about you. The first names the thing in your background that makes you unusually good at one specific part of this role. The second says plainly why you are moving.",
          "The failure mode is treating it as a personal journey. A hiring manager is estimating the chance that you leave within a year, and a long account of self discovery raises that estimate rather than lowering it. A short factual reason lowers it, which is the entire purpose of the sentence.",
        ],
      },
      {
        heading: "What it will not tell you",
        body: [
          "It will not say the change is right. It will not rank fields by satisfaction, which is not a property of a job title. It will not accept a target described only as something more meaningful.",
          "That refusal is the most useful thing in it. Work you cannot describe at the level of an ordinary Tuesday is a mood rather than a plan, and the gap between those two is where most abandoned transitions begin.",
        ],
      },
    ],

    howTo: {
      name: "How to run the career change prompt",
      steps: [
        {
          name: "Write the push and the pull in separate lists",
          text: "Do it before you open the model. Seeing them apart on paper answers the question for a fair number of people on its own.",
        },
        {
          name: "Describe the target work as a Tuesday",
          text: "Hour by hour if you can. If you cannot fill a day, you have found the next thing to research rather than the next thing to apply for.",
        },
        {
          name: "List artefacts rather than qualities",
          text: "Things you built, ran or decided, with what happened to them. The classification is only as good as this list.",
        },
        {
          name: "Read the classification before the plan",
          text: "A page of PARTIAL entries is a signal about sequencing, not a verdict. It usually means one bridging project comes before any applications.",
        },
        {
          name: "Run the fortnight test before announcing anything",
          text: "Telling people you are changing careers creates a commitment that makes it harder to read the result of the test honestly.",
        },
      ],
    },

    faq: [
      {
        question: "Am I too old to change careers?",
        answer:
          "Age shows up in the numbers rather than in the possibility. A longer run of artefacts means more of your skills land in the transferring column, while a shorter runway to retirement makes a two year entry level dip a harder trade. Both belong in the constraints input.",
      },
      {
        question: "Do I need a qualification first?",
        answer:
          "Occasionally, and less often than course providers suggest. Regulated fields genuinely require one. Everywhere else a finished piece of real work usually beats a certificate, which is why the prompt asks for a test project before it discusses any training spend.",
      },
      {
        question: "How large a pay cut should I plan for?",
        answer:
          "Whatever the advertised bands for your realistic entry level say, which is why the estimate is marked unsourced without them. Plan around the range rather than its best case, and note the duration you could sustain it for as a constraint rather than as a hope.",
      },
      {
        question: "Is a career change prompt any use if I only want a new employer?",
        answer:
          "The push and pull section still is. Working through it is the fastest way to find out that a same field move solves your actual problem, which is a considerably cheaper conclusion than the one you were preparing to reach.",
      },
      {
        question: "What if almost nothing transfers?",
        answer:
          "Then you have learned the price before paying it. Either find the adjacent role that keeps one of your strong columns in play, or accept the entry level honestly and plan the finances around it. Both are better than discovering the classification during interviews.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description:
          "The artefact list this prompt needs is the same raw material the resume classification runs on.",
      },
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description:
          "A change of field is exactly the case where a single argued letter earns its place in the application.",
      },
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description:
          "Your search surface has to carry the target field's vocabulary before recruiters there can find you at all.",
      },
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "Old reviews are an underused source of dated artefacts, especially the ones written by someone who disagreed with you.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.onetonline.org/",
        label: "O*NET OnLine",
        description:
          "The US Department of Labor occupational database, which lists the actual tasks and tools of a role rather than its marketing description.",
      },
      {
        href: "https://www.bls.gov/ooh/",
        label: "US Bureau of Labor Statistics: Occupational Outlook Handbook",
        description:
          "Published entry requirements and median pay by occupation, useful for grounding an entry level estimate in something citable.",
      },
      {
        href: "https://hbr.org/2002/12/how-to-stay-stuck-in-the-wrong-career",
        label: "Harvard Business Review: How to stay stuck in the wrong career",
        description:
          "Herminia Ibarra's research on why small experiments outperform planning when testing a transition.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Prompting strategies",
        description:
          "Documents the ordered task decomposition this prompt relies on to keep classification from collapsing into advice.",
      },
    ],
  },
};

export default meta;
