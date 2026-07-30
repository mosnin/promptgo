import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "skills-gap-prompt",
  name: "Screen Test",
  title: "Skills Gap Prompt",
  category: "career-prompts",
  taskType: "analyse",
  summary:
    "Reads several real postings for the role you want, keeps only the requirements that repeat, downgrades anything you claim without an artefact, and costs the cheapest evidence for each blocking gap.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["skills", "job search", "planning", "evidence"],

  seo: {
    primaryKeyword: "skills gap prompt",
    keywords: [
      "skills gap prompt",
      "how to compare your skills to a job description",
      "ai prompt for a learning plan from job ads",
      "cheapest way to get evidence for a missing skill",
    ],
    seoTitle: "Skills Gap Prompt: Only The Gaps That Screen You Out",
    seoDescription:
      "A skills gap prompt that reads real postings, separates blocking gaps from cosmetic ones, and costs the cheapest evidence you could produce inside your current job.",
  },

  prompt: {
    text: `You are screening me against real job postings. You are not advising me about my potential and you do not motivate people.

THREE TO FIVE POSTINGS FOR THE ROLE I WANT, PASTED IN FULL: {{POSTINGS}}
WHAT I HAVE ACTUALLY DONE, AS ARTEFACTS I BUILT, RAN, SHIPPED OR DECIDED, WITH DATES: {{EXPERIENCE}}
WHAT I WOULD CLAIM ON A CV TODAY: {{CLAIMS}}
HOURS AND MONEY I CAN SPEND OVER THE NEXT SIX MONTHS: {{CAPACITY}}
CONSTRAINTS ON WHAT I CAN DO AT WORK OR OUTSIDE IT: {{CONSTRAINTS}}

Step one. Extract every requirement appearing in at least two postings. Discard anything appearing once, because that is one company's preference rather than the market's. Sort what remains into BLOCKING, meaning applications without it get filtered, TEACHABLE, meaning employers expect to train it, and COSMETIC, meaning I have the capability and they use a different word for it.

Step two. Mark my position against each requirement. EVIDENCED where I gave you an artefact and a date. CLAIMED ONLY where I assert it with nothing attached. NONE where I have neither. Downgrade every claim without an artefact and tell me which ones you downgraded.

Step three. For each BLOCKING requirement where I am not EVIDENCED, give the cheapest route to real evidence, costed in hours and money. Prefer work I could take on inside my current job over anything I would buy. A certificate counts only where the postings name it.

Step four. Produce the NOT WORTH CLOSING list. Any gap costing more than my stated capacity, or appearing in only two postings while I am strong across the rest, belongs here with the reason.

Never recommend a degree. Never recommend general upskilling. Never suggest a portfolio project without naming the specific project and the requirement it evidences. If the honest reading is that this role is two moves away rather than one, say so and name the intermediate role.`,
    variables: [
      {
        token: "POSTINGS",
        label: "Three to five real postings, pasted in full",
        example:
          "Four data engineer postings from mid sized UK insurers and retailers, full text including the nice to have sections and the salary bands where listed.",
      },
      {
        token: "EXPERIENCE",
        label: "What you have done, as dated artefacts",
        example:
          "2023 to now: built and maintain the nightly reporting pipeline in Python and Airflow, about 40 tables, I am the only maintainer. 2024: migrated it from cron, wrote the runbook. 2022: two years of SQL reporting in a finance team, no scheduling. Never used dbt or Spark. Terraform only by copying existing modules.",
      },
      {
        token: "CLAIMS",
        label: "What you would claim on a CV today",
        example:
          "Python, SQL, Airflow, data modelling, ETL, cloud infrastructure, stakeholder management, dbt basics",
      },
      {
        token: "CAPACITY",
        label: "Hours and money over six months",
        example: "About four hours a week, up to 400 pounds, and I can shape roughly a fifth of my work at my current job",
      },
      {
        token: "CONSTRAINTS",
        label: "Constraints at work or outside it",
        example:
          "Cannot get access to production cloud accounts. No budget for conferences. Two young children so evenings are unreliable.",
      },
    ],
    expectedOutput:
      "A requirement list built only from repeated postings, each labelled blocking, teachable or cosmetic, your position marked against each with claims downgraded, costed evidence routes for the blocking gaps, and a list of gaps not worth closing.",
    followUps: [
      "Take the top blocking gap and write the proposal I would put to my manager to get that work assigned to me.",
      "You downgraded four of my claims. For each one, tell me what artefact would restore it and whether I could produce it in a month.",
      "Rerun against postings one level down, and tell me whether the intermediate role is actually easier to reach.",
    ],
    pitfalls: [
      "Pasting the postings you like rather than a representative sample skews the requirement list. Include the two you found intimidating, since those are where the blocking items usually live.",
      "Listing skills as nouns in the experience field produces the same output as the claims field and defeats the comparison. Artefacts and dates are what separate the two.",
      "People treat the not worth closing list as permission to stop. It is a statement about cost against your stated capacity, so revisit it whenever the capacity changes.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "One advertisement is one company's wish list, and planning against it spends study time on a tool that appears nowhere else in the market, which is why the prompt refuses to run below two postings. Claims are handled the same way, so anything with no artefact behind it is downgraded rather than restated, including lines that have sat on a CV for years. GPT-5.2 reaches for courses unless work based evidence is named as the preference.",
  },

  article: {
    intro: [
      "A skills gap prompt that lists everything you do not know produces a curriculum, not a plan. The market does not test you on everything in a job advertisement, and most of what is missing from your profile will never cost you an interview.",
      "The useful question is narrower. Which absences actually stop an application, which would an employer expect to train, and which are things you can already do under a name you have not used.",
      "The prompt below answers that by reading several real postings rather than one, then testing your side of the comparison just as hard as theirs.",
    ],

    sections: [
      {
        heading: "A gap is only real if it screens you out",
        body: [
          "Requirements are not equal and job advertisements do not distinguish between them. A posting lists the essentials, the preferences and the aspirations in the same bulleted voice, and candidates treat all three as a checklist to be completed.",
          "How to compare your skills to a job description starts with reading several of them together. A requirement appearing in one advertisement is one hiring manager's preference. A requirement appearing in four is the market speaking, and it is the one worth six months of your effort.",
          "Gaps that get you screened out are usually few and specific. The rest of the list is noise you have been carrying around as anxiety.",
        ],
        list: [
          "BLOCKING: applications without it get filtered, usually by a person scanning for one word.",
          "TEACHABLE: employers expect to train it, so its absence costs you nothing at the screening stage.",
          "COSMETIC: you can do it, they call it something else, and the fix is vocabulary rather than learning.",
        ],
      },
      {
        heading: "Claimed, evidenced, and the distance between",
        body: [
          "Your side of the comparison gets audited too. A claim with an artefact and a date behind it is evidenced. A claim with nothing attached is downgraded, and you are told which ones were downgraded.",
          "This is not pedantry. Skills you claim but cannot evidence are exactly what falls apart in a technical conversation, and the interviewer's follow up question is always the same shape: tell me about a time you used it. A line on a CV with no story behind it turns a good interview into an awkward one at the point where you were doing well.",
          "The downgrade list is also more useful than the gap list for the next fortnight, since restoring a claim often means writing down something you did two years ago rather than learning anything new.",
        ],
      },
      {
        heading: "Vocabulary gaps wearing skill gap clothes",
        body: [
          "A surprising share of apparent gaps are naming problems. You have built pipelines and they say ETL. You have run releases and they say change management. You have done stakeholder work and they call it partnering.",
          "These belong in the cosmetic category and they are fixed by changing the words on your application, not by taking a course. Recruiters screen by matching terms, frequently under time pressure, so the mismatch is real even though the skill gap is not.",
          "The reason this needs a separate label is that candidates otherwise resolve the ambiguity in the wrong direction, either claiming a genuinely absent skill or studying something they have been doing for three years.",
        ],
      },
      {
        heading: "The skills gap prompt costs every gap before it plans",
        body: [
          "Each blocking gap comes back with a route to evidence, priced in hours and money, weighted toward work you could take on inside your current job. That preference is deliberate. Six months of a course produces a certificate, while six months of owning the relevant system produces an artefact, a date and someone who will vouch for you.",
          "The cheapest way to get evidence for a missing skill is nearly always to volunteer for the unpopular piece of work that touches it. It is unglamorous, it is free, and it is the only route that produces something you can describe in an interview without hedging.",
          "Courses are not banned, and an ai prompt for a learning plan from job ads that never recommends one would be dishonest. They belong where the postings name a certificate, or where the skill genuinely cannot be reached from where you sit.",
        ],
      },
      {
        heading: "The list of gaps not worth closing",
        body: [
          "The last section of the skills gap prompt names what to ignore, with a reason. Gaps costing more than the capacity you declared, gaps that appear in two postings while you are strong across the other three, gaps attached to a specialism you do not want.",
          "This is the part people find most valuable and least expected. A job search generates an enormous amount of undirected guilt about things you have not learned, and a written statement that a particular gap is not worth closing this year turns that into a decision you made rather than a failure you are carrying.",
          "When the honest reading is that the target role is two moves away, the prompt says so and names the intermediate role. That verdict is unwelcome and considerably cheaper than eighteen months of applications that never reach a phone screen.",
        ],
      },
    ],

    howTo: {
      name: "How to run the skills gap prompt",
      steps: [
        {
          name: "Collect five real postings, including the intimidating ones",
          text: "Full text, not summaries, and from companies you would actually apply to. The requirement list is only as good as the sample.",
        },
        {
          name: "Write experience as artefacts, not adjectives",
          text: "What you built, ran or decided, with dates and scale. This is the field that decides how much of your CV survives the audit.",
        },
        {
          name: "Read the downgrades before the gaps",
          text: "Claims with no evidence behind them are the immediate risk, since they are already on your CV and an interviewer will find them.",
        },
        {
          name: "Take one blocking gap to your manager",
          text: "Framed as work you want rather than training you need. Most blocking gaps close by being assigned the right project.",
        },
        {
          name: "Rerun in six months against fresh postings",
          text: "Requirement lists move, particularly in technical fields, and a plan built on last year's advertisements quietly goes out of date.",
        },
      ],
    },

    faq: [
      {
        question: "How many postings does the skills gap prompt need?",
        answer:
          "Three is the minimum for the repetition rule to mean anything and five is comfortable. Beyond about eight the requirement list stops changing, so the extra reading buys nothing except confidence that you are looking at the market rather than at one employer.",
      },
      {
        question: "What if the postings are all from one company?",
        answer:
          "Then you are analysing that company rather than the role, which is legitimate if it is where you want to work and misleading otherwise. Mixed sources are better because they separate genuine market requirements from one organisation's internal vocabulary.",
      },
      {
        question: "Does this handle career changes across fields?",
        answer:
          "Partly. It will correctly identify that most requirements are unevidenced, which is accurate and demoralising. For a genuine change of field the prior question is which of your existing artefacts count for anything in the new one, and that is a different analysis.",
      },
      {
        question: "Is a certificate ever the right answer?",
        answer:
          "When the postings name it, when a regulator requires it, or when it is genuinely the entry ticket in that field. Otherwise the evidence it produces is weak, since it demonstrates that you completed a course rather than that you have done the work under real constraints.",
      },
      {
        question: "What if my current job cannot produce the evidence I need?",
        answer:
          "That is a real answer rather than a failure of the method, and it usually means the next move is sideways before it is upward. A role that touches the blocking requirement, even at the same level and pay, is often faster than trying to manufacture the experience outside working hours.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/career-change-prompt",
        label: "career change prompt",
        description:
          "Run this first if the target is a different field, since the transfer question comes before the gap question.",
      },
      {
        href: "/career-prompts/promotion-case-prompt",
        label: "promotion case prompt",
        description:
          "The internal version of the same evidence test, aimed at the level above rather than at another employer.",
      },
      {
        href: "/career-prompts/portfolio-description-prompt",
        label: "portfolio description prompt",
        description:
          "Turns a newly produced artefact into something a reviewer can assess in forty seconds.",
      },
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Shows how postings get written, which explains why so many listed requirements were never load bearing.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.onetonline.org/",
        label: "O*NET Online",
        description:
          "The US Department of Labor occupational database, an independent reference for which skills genuinely define a role rather than one employer's wish list.",
      },
      {
        href: "https://www.bls.gov/ooh/",
        label: "US Bureau of Labor Statistics: Occupational Outlook Handbook",
        description:
          "Primary data on typical entry requirements and training routes, useful for checking whether a certificate is actually the entry ticket.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Prompting strategies",
        description:
          "Documents the multi document comparison and classification patterns the repetition threshold and the label set depend on.",
      },
    ],
  },
};

export default meta;
