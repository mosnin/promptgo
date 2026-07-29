import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "onboarding-plan-prompt",
  name: "Ramp Plan Builder",
  title: "Onboarding Plan Prompt",
  category: "business-prompts",
  taskType: "plan",
  summary:
    "Fixes the first thing the new person ships, then schedules backwards from it, dating every access request and naming the colleague who loses hours to each week.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["hiring", "onboarding", "management", "planning"],

  seo: {
    primaryKeyword: "onboarding plan prompt",
    keywords: [
      "onboarding plan prompt",
      "how to write a 30 60 90 day plan",
      "first useful contribution for a new hire",
      "ai prompt for onboarding a new team member",
      "access and tooling prerequisites before day one",
      "who teaches the unwritten rules",
    ],
    seoTitle: "Onboarding Plan Prompt: First Useful Contribution",
    seoDescription:
      "An onboarding plan prompt that works backwards from the first thing a new hire ships, dates every access request, and gives each week an owner who is not them.",
  },

  prompt: {
    text: `You build onboarding plans backwards. You start from one concrete thing the new person will have finished and handed to someone else, then you work back from that date. You do not produce a reading list with meetings attached.

THE ROLE AND WHO THEY REPORT TO: {{ROLE}}
WHAT THE TEAM IS WORKING ON RIGHT NOW: {{CURRENT_WORK}}
WHAT THIS PERSON ALREADY KNOWS AND HAS DONE BEFORE: {{BACKGROUND}}
SYSTEMS, TOOLS AND PERMISSIONS THEY WILL NEED, AND WHO GRANTS EACH: {{ACCESS}}
PEOPLE WHO COULD SPEND TIME ON THIS, AND HOW BUSY THEY ARE: {{HELPERS}}
THINGS ABOUT HOW WE WORK THAT ARE NOWHERE IN WRITING: {{TACIT}}

Produce the plan in five parts.

PART ONE, THE ANCHOR. Propose one deliverable this person completes and hands to a real colleague or customer inside their first three weeks. It must be small, genuinely needed, and visible to somebody outside the team. Something already on a backlog, not an exercise invented for them. State how we will know it landed. Everything after this is scheduled to make this happen.

PART TWO, THE PREREQUISITES, DATED BACKWARDS. List every access, account, credential, hardware item and introduction the anchor depends on. For each: who grants it, how long it normally takes here, and the calendar date it must be requested by. Anything with a lead time longer than the days remaining before start is flagged LATE ALREADY.

PART THREE, THE WEEKS. Week by week to day ninety, with three columns: what they do, what they should be able to explain unaided by the end of it, and the named colleague who owns that week. The owner is never the new starter and never simply their manager for every week. For each owner, state the hours it will cost them and what they stop doing to find those hours. If my helpers field says everyone is fully booked, say plainly that the plan is unfunded.

PART FOUR, THE UNWRITTEN RULES. Turn my tacit field into a list of things nobody documents, such as which meetings are optional in practice, whose approval is needed informally, and which system everyone distrusts. Assign one named person to say each of these out loud in week one.

PART FIVE, THE CONFUSION AUDIT. Write six questions to ask them at the end of week two, designed to surface what they have not understood but have stopped asking about. Include the instruction that the manager answers each in writing within two days.

Do not schedule shadowing without a stated purpose. Do not fill any week with reading. Do not use the words ramp up, immerse or culture fit.`,
    variables: [
      {
        token: "ROLE",
        label: "The role and who they report to",
        example: "Second data analyst, reports to the head of finance, sits with the two engineers who own the warehouse",
      },
      {
        token: "CURRENT_WORK",
        label: "What the team is working on right now",
        example:
          "Rebuilding the monthly revenue report, migrating three dashboards off the old BI tool, and a backlog of about fifteen small data requests from sales",
      },
      {
        token: "BACKGROUND",
        label: "What they already know and have done",
        example: "Four years in an agency, strong SQL, has never used dbt, has not worked with finance data before",
      },
      {
        token: "ACCESS",
        label: "Systems, tools and permissions, and who grants each",
        example:
          "Warehouse read access from platform team, usually two weeks. BI licence from IT, three days. Finance drive from the controller. Laptop from IT, ten working days.",
      },
      {
        token: "HELPERS",
        label: "People who could spend time and how busy they are",
        example:
          "Senior analyst, at capacity until month end. One warehouse engineer with some slack. Head of finance has two hours a week at most.",
      },
      {
        token: "TACIT",
        label: "Things about how you work that are nowhere in writing",
        example:
          "Nobody trusts the sales dashboard numbers. The Tuesday review is optional despite the invite. Anything touching payroll goes through the controller first.",
      },
    ],
    expectedOutput:
      "One small real deliverable with a date and a recipient, a dated prerequisite list flagging anything already late, weekly rows each naming an owner along with the hours it costs them and what they drop, a list of unwritten rules with a person assigned to explain each, and six week two questions the manager must answer in writing.",
    followUps: [
      "The warehouse access has a two week lead time and they start on Monday. Rewrite the first three weeks assuming they cannot query anything until day eleven.",
      "Every week owner came back as the senior analyst who is at capacity. Redistribute it and tell me which weeks now have nobody.",
      "Turn part four into the actual message I send the person assigned to explain the unwritten rules, so they know what is expected of them.",
    ],
    pitfalls: [
      "The anchor deliverable gets replaced with a training exercise because a real task feels risky in week two. A task with no recipient teaches nothing about how the work actually reaches anyone.",
      "Week owners are assigned without asking them. The hours column exists so the conversation happens beforehand, and the answer is sometimes no.",
      "The tacit field is the hardest to fill and the one that determines whether the plan is any good. Ask two people who joined in the last year what confused them.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Onboarding plans are written as though colleague time were free, and a model will name a different mentor for every activity until each line carries an owner and an hourly cost, at which point the implied load turns out to exceed what anyone has. Gemini also schedules a week of documentation reading and describes it as immersion, so that pattern is banned by name.",
  },

  article: {
    intro: [
      "An onboarding plan prompt that produces a schedule of introductions, reading and shadowing has written the plan everybody writes. It looks thorough, it costs nothing to produce, and by week three the new person is politely attending meetings about work they have no way into.",
      "This one is built backwards from a single deliverable. One small real thing, already on a backlog, finished and handed to somebody outside the team inside three weeks. Everything before that date exists to make it possible, and everything that does not serve it is cut.",
      "The other half is accounting. Every week names a colleague who owns it, states the hours it will cost them, and says what they stop doing to find those hours. Plans fail because that arithmetic is never done.",
    ],

    sections: [
      {
        heading: "Start from the first shipped thing and work backwards",
        body: [
          "The anchor is a real task with a real recipient. Fixing a broken report somebody uses monthly, closing three of the fifteen queued data requests, writing the query the controller keeps asking for. Small, needed and visible.",
          "A first useful contribution for a new hire does two things a training exercise cannot. It teaches the actual path work takes through the organisation, including the review, the approval nobody documented and the person who has to be told. And it gives the new person evidence they are contributing, which is the thing most of them are anxious about by day ten.",
          "Working backwards from it also changes the schedule. Access requests, introductions and context all get sequenced by whether the anchor depends on them, which is a much better filter than whether they seem generally useful.",
        ],
      },
      {
        heading: "Access and tooling prerequisites before day one",
        body: [
          "The most common cause of a wasted first fortnight is not a bad plan, it is a credential that takes eleven working days to arrive. Access and tooling prerequisites before day one are the least interesting part of onboarding and the part that determines whether any of the rest happens on schedule.",
          "Each item gets the grantor, the typical lead time in your organisation and the date it must be requested. Anything whose lead time exceeds the days remaining before the start date is flagged as already late, which is a useful thing to discover in the week before rather than in the week after.",
          "Hardware belongs here too. A laptop ordered on day one arrives in week three, and every plan built on top of that assumption was fiction.",
        ],
      },
      {
        heading: "Every week has an owner who is not the new hire",
        body: [
          "Unowned weeks look fine on a document and dissolve on contact with a busy team, which is why the onboarding plan prompt will not leave one blank. The named owner is the person the new starter asks when stuck, and naming one per week spreads the load while making the obligation explicit enough to decline.",
          "The hours column is the uncomfortable part. Real onboarding costs somewhere between three and six hours a week of somebody experienced, and that time comes out of work they were already committed to. Writing what they stop doing turns a good intention into a scheduling decision that their own manager can see.",
          "Where the helper field says everyone is at capacity, the prompt says the plan is unfunded rather than quietly distributing the hours anyway. That sentence is worth having in writing before the person starts.",
        ],
      },
      {
        heading: "Who teaches the unwritten rules",
        body: [
          "Every organisation runs on knowledge that exists nowhere in writing. Which meeting is optional despite the mandatory invite, which dashboard nobody trusts, whose informal approval is needed before a change lands, which system is being replaced and should not be learned properly.",
          "New people work this out over about four months by making small mistakes. Deciding who teaches the unwritten rules and having them say the list out loud in week one compresses that to an afternoon, and it costs one conversation.",
          "The list is generated from what you supply, which means the quality depends entirely on your willingness to write down the things your team knows and never says. Asking the two most recent joiners what confused them is the fastest way to fill it.",
        ],
      },
      {
        heading: "The week two confusion audit",
        body: [
          "By the end of week two most new starters have stopped asking about the things they do not understand, because the window in which ignorance is socially free has quietly closed. What they have not understood by then tends to stay not understood.",
          "Six specific questions, asked at that point, surface it while it is still cheap. The requirement that the manager answers each in writing within two days is what makes it more than a wellbeing check, and the written answers become the first draft of documentation that did not previously exist.",
          "Anything appearing in two consecutive confusion audits from two different joiners is not an onboarding problem. It is a process that nobody has written down.",
        ],
      },
      {
        heading: "What the onboarding plan prompt refuses to schedule",
        body: [
          "Shadowing without a stated purpose, weeks filled with documentation, and the words ramp up, immerse and culture fit are all blocked. Each of them is a way of occupying time without producing anything the new person or the team can point at.",
          "Learning how to write a 30 60 90 day plan that survives contact with a real team is mostly learning to delete these. An ai prompt for onboarding a new team member will produce them enthusiastically if you let it, because they are what most published templates contain.",
          "What the onboarding plan prompt puts in their place is narrower: one thing shipped, an owner per week with the hours costed, and a written answer to every confusion at day ten.",
        ],
      },
    ],

    howTo: {
      name: "How to use the onboarding plan prompt",
      steps: [
        {
          name: "Pick the anchor from your actual backlog",
          text: "Scan the queue for something small, needed and low blast radius. If nothing qualifies, the team may not be ready to absorb someone yet.",
        },
        {
          name: "Get the real lead times, not the official ones",
          text: "Ask whoever last waited for warehouse access how long it took. Published service levels and observed lead times are usually different numbers.",
        },
        {
          name: "Run it before the offer is signed",
          text: "The LATE ALREADY flags are only actionable if there is still time to act. Two weeks before the start date is the last useful moment.",
        },
        {
          name: "Confirm each week owner personally",
          text: "Show them the hours figure and ask what they will drop. An owner who has not agreed is not an owner, they are a name in a table.",
        },
        {
          name: "Diarise the confusion audit on day ten",
          text: "Put it in the calendar when you write the plan. It is the first thing dropped when the second week gets busy, which is exactly when it matters.",
        },
      ],
    },

    faq: [
      {
        question: "Is three weeks too early for a real deliverable?",
        answer:
          "For most roles it is about right if the deliverable is genuinely small. If nothing in your backlog could be completed by a competent newcomer in three weeks with support, that says something about how much undocumented context every task carries, which is worth knowing separately.",
      },
      {
        question: "What about senior hires who set their own agenda?",
        answer:
          "The anchor still applies, though it becomes a written assessment handed to a specific person rather than a task. Skipping it for senior people is how you end up ninety days in with a well liked hire whose first tangible output has not happened yet.",
      },
      {
        question: "Should the new person see the plan?",
        answer:
          "Yes, including the hours each colleague is contributing. It tells them who to ask and makes the support visible rather than something they have to request repeatedly, which is the thing most new starters find hardest in the first month.",
      },
      {
        question: "How does this fit with a formal probation process?",
        answer:
          "The weekly explain column gives you evidence for a probation conversation without inventing a separate assessment. If somebody cannot explain the things week six expected, that is a specific and fair discussion rather than a general impression formed over two months.",
      },
      {
        question: "What if the team is remote?",
        answer:
          "The week owner matters more, not less, because a remote starter cannot absorb anything by overhearing it. Add a standing daily fifteen minutes with that week's owner for the first fortnight and count those hours in the cost column.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Its first ninety days section is the natural source for the anchor deliverable, so the advert and the plan agree.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "Where the answers from the confusion audit belong once the same question has come up twice.",
      },
      {
        href: "/business-prompts/one-on-one-meeting-prompt",
        label: "one on one meeting prompt",
        description:
          "The weekly conversation that takes over once the ninety days end and the plan stops being the agenda.",
      },
      {
        href: "/productivity-prompts/weekly-planning-prompt",
        label: "weekly planning prompt",
        description:
          "For the colleague who just agreed to own week four and now has to find those hours somewhere real.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.shrm.org/topics-tools/topics/talent-acquisition",
        label: "SHRM: talent acquisition and onboarding resources",
        description:
          "Professional body guidance on structured onboarding, including why early contribution correlates with retention.",
      },
      {
        href: "https://hbr.org/2018/06/to-retain-new-hires-spend-more-time-onboarding-them",
        label: "Harvard Business Review: spend more time onboarding new hires",
        description:
          "Institutional source for the cost of unsupported first months, which is what the hours column makes explicit.",
      },
      {
        href: "https://www.cipd.org/uk/knowledge/factsheets/induction-factsheet/",
        label: "CIPD: induction factsheet",
        description:
          "Reference on induction sequencing and probation evidence, relevant to the weekly explain column.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: prompt engineering guide",
        description:
          "Covers the backwards planning and prohibition patterns that keep generated plans free of filler weeks.",
      },
    ],
  },
};

export default meta;
