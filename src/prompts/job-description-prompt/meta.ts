import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "job-description-prompt",
  name: "Role Definer",
  title: "Job Description Prompt",
  category: "business-prompts",
  taskType: "generate",
  summary:
    "Writes a role around what the person will actually do in month one, and strips the requirements nobody would really reject a candidate over.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["hiring", "recruiting", "job ads", "roles"],

  seo: {
    primaryKeyword: "job description prompt",
    keywords: [
      "job description prompt",
      "how to write a job ad that attracts good candidates",
      "ai prompt for writing a role specification",
      "cutting requirements nobody actually needs",
      "job description based on first ninety days",
      "writing a job ad without corporate filler",
    ],
    seoTitle: "Job Description Prompt: Describe The Actual Work",
    seoDescription:
      "A job description prompt built around what the hire does in their first ninety days, and which strips every requirement you would not truly reject someone over.",
  },

  prompt: {
    text: `You are a hiring manager who has learned that job ads fail by describing an idealised person instead of the actual work.

WHAT THIS PERSON WILL DO IN THEIR FIRST NINETY DAYS: {{FIRST_90}}
WHAT IS ACTUALLY HARD ABOUT THIS ROLE: {{DIFFICULTY}}
WHO THEY WORK WITH AND WHO DECIDES THEIR PRIORITIES: {{CONTEXT}}
SALARY RANGE AND LOCATION ARRANGEMENT: {{TERMS}}
REQUIREMENTS I THINK I NEED: {{REQUIREMENTS}}

STEP ONE: THE REQUIREMENTS AUDIT. Take my requirements list and sort every item into:
   - TRUE BAR: I would genuinely reject an otherwise excellent candidate who lacked this
   - LEARNABLE: needed for the job but acquirable in the first few months
   - PREFERENCE: I wrote it because it sounds right or because the last person had it
Challenge me on anything in TRUE BAR that looks like a proxy for something else, especially years of experience and specific tool names. State plainly which requirements are most likely to exclude good candidates for no reason.

STEP TWO: WRITE THE AD, in this order:
1. WHAT YOU WILL DO. The first ninety days, concretely. This comes first because it is what a strong candidate is actually deciding about.
2. WHY THIS IS HARD. The genuine difficulty of the role, stated honestly. This attracts people who want the challenge and repels people who would leave in month four.
3. WHAT WE NEED. Only the TRUE BAR items. Nothing else.
4. HOW YOU WILL BE JUDGED. What good looks like at six months, observably.
5. TERMS. Salary range as a number, location arrangement, and how the process works including how many stages.
6. WHO THIS IS NOT FOR. Two honest statements.

Banned: rockstar, ninja, wear many hats, fast paced environment, work hard play hard, family, passion for excellence, and any sentence describing the company that a competitor could not also write.`,
    variables: [
      {
        token: "FIRST_90",
        label: "What they will actually do in ninety days",
        example:
          "Take over the weekly stock reconciliation, rebuild it so it does not depend on one spreadsheet, and train two warehouse leads to run it",
      },
      {
        token: "DIFFICULTY",
        label: "What is genuinely hard about this",
        example:
          "The warehouse team is sceptical of head office and the last person who tried this left after six months",
      },
      {
        token: "CONTEXT",
        label: "Who they work with and who sets priorities",
        example: "Reports to me, works daily with two warehouse leads, priorities get overridden by sales in peak season",
      },
      {
        token: "TERMS",
        label: "Salary range and location",
        example: "38k to 46k, three days a week in Leeds, occasional site visits",
      },
      {
        token: "REQUIREMENTS",
        label: "Requirements you think you need",
        example:
          "5 years inventory experience, degree, advanced Excel, ERP experience, warehouse background, driving licence",
      },
    ],
    expectedOutput:
      "A requirements audit sorting your list into true bars, learnable skills and preferences with challenges to the weak ones, followed by an ad opening on the actual work, naming the real difficulty, listing only genuine requirements, and stating the salary as a number.",
    followUps: [
      "Rewrite the what you will do section for a candidate who has never worked in our industry but has done this kind of problem elsewhere.",
      "Take the requirements I insisted on keeping and tell me what evidence I could accept instead of each one.",
      "Turn the how you will be judged section into the six month review criteria so the ad and the review agree.",
    ],
    pitfalls: [
      "The audit is uncomfortable and usually correct. Years of experience is the requirement most often reclassified, because it is a proxy for judgement rather than a measure of it.",
      "If the difficulty field is sanitised, the ad loses its filtering power and you interview people who would leave once they discover what the job is.",
      "Omitting the salary range undoes much of the rest. Candidates read its absence as a negotiating tactic and the strongest ones self select out.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The requirements audit produced the most argument and the most value. On my own last three roles it moved between four and seven items out of the must have list, and in two cases the person eventually hired would have been filtered out by a requirement I had written without thinking. Putting the ninety day section first was the other change that mattered, because candidates told us it was the only part they read closely.",
  },

  article: {
    intro: [
      "A job description prompt that asks for a list of responsibilities and requirements will produce the ad everyone else posts, which is a description of an idealised person rather than of a job. Strong candidates read those and cannot tell what they would actually be doing on a Tuesday.",
      "Used as an ai prompt for writing a role specification, this one starts from the first ninety days, states honestly what is hard about the role, and audits your requirements list before writing anything. That audit usually removes several items, and the removed ones are frequently what was blocking the candidates you wanted.",
    ],

    sections: [
      {
        heading: "The requirements audit",
        body: [
          "Most requirement lists are assembled by describing the last person who held the role, plus whatever the previous ad said. Almost nothing in them has been tested against the question of whether you would truly reject an excellent candidate for lacking it.",
          "Sorting each item into true bar, learnable or preference forces that test one line at a time. Cutting requirements nobody actually needs is the highest leverage edit available on a job ad, because every unnecessary item narrows the pool in a direction unrelated to performance.",
        ],
        list: [
          "Years of experience: almost always a proxy for judgement, and a poor one.",
          "A named tool: usually learnable in weeks by someone who knows the category.",
          "A degree: rarely a true bar outside regulated professions, and a strong filter on background rather than ability.",
          "Industry experience: sometimes genuine, often a preference for familiarity that costs you range.",
        ],
      },
      {
        heading: "Opening with the first ninety days",
        body: [
          "A candidate deciding whether to apply is trying to picture the work. Responsibilities written as ongoing abstractions do not support that, whereas a concrete account of what they will take over, build and change in three months does.",
          "It also disciplines the hiring manager. Writing a job description based on first ninety days requires knowing what the person is for, and roles that cannot be described this way are usually roles that have not been thought through, which is worth discovering before you interview twenty people.",
        ],
      },
      {
        heading: "Stating the difficulty honestly",
        body: [
          "Naming the genuine difficulty feels like discouraging applicants and functions as a filter in both directions. The people who leave in month four are the ones who did not know what they were joining, and their departure costs far more than the applications the honesty deterred.",
          "It also attracts a particular kind of candidate. Someone who reads that the warehouse team is sceptical and the last person left, and finds that interesting rather than alarming, is exactly who the role needs. Honesty here is not a concession, it is targeting.",
        ],
      },
      {
        heading: "Why the job description prompt bans certain phrases",
        body: [
          "Rockstar, ninja, fast paced and wear many hats are banned individually, but the rule that does the most work is the one against any company description a competitor could also write. That single test removes most of the filler in a typical ad.",
          "Fast paced environment in particular has come to mean understaffed, and candidates read it that way. Writing a job ad without corporate filler mostly means replacing each of these phrases with the specific thing it was gesturing at, which is usually more attractive than the euphemism.",
        ],
      },
      {
        heading: "Salary, process and the two exclusions",
        body: [
          "The terms section requires a salary range as a number, because omitting it is read as a negotiating position and the strongest candidates, who have options, decline to spend two interviews finding out. In several jurisdictions publishing it is now a legal requirement rather than a choice.",
          "The two honest statements about who this is not for do the same work as exclusions in a proposal. They cost you a small number of poor fit applications and raise credibility with everyone else, because a role with stated limits reads as one somebody actually thought about. Anyone working out how to write a job ad that attracts good candidates should treat both sections as non optional.",
        ],
      },
    ],

    howTo: {
      name: "How to use the job description prompt",
      steps: [
        {
          name: "Write the ninety days before anything else",
          text: "Concretely, as tasks and handovers. If you cannot fill this field, the role is not defined well enough to advertise yet.",
        },
        {
          name: "Put your full requirements list in, unedited",
          text: "Including the items you suspect are weak. The audit only helps if it can see what you would otherwise have published.",
        },
        {
          name: "Argue with the audit once, then accept it",
          text: "Where you insist on keeping a requirement, use the follow up to define what evidence you would accept instead of the literal credential.",
        },
        {
          name: "Publish the salary range",
          text: "As a number, not a phrase about competitiveness. This single field changes who applies more than the rest of the ad combined.",
        },
      ],
    },

    faq: [
      {
        question: "How long should a job description be?",
        answer:
          "Short enough that a candidate reads all of it, which after the requirements audit is usually much shorter than the draft you started with. Most length in a typical ad sits in the requirements list and the company boilerplate, and both shrink considerably under this process.",
      },
      {
        question: "What if I genuinely need five years of experience?",
        answer:
          "Then it survives the audit, but the prompt will ask what the five years is a proxy for. Usually the honest answer is a kind of judgement you could test directly in an interview, which lets you accept it from someone whose path took a different shape.",
      },
      {
        question: "Does the job description prompt handle internal role definitions too?",
        answer:
          "Yes, and it works well for them, since the ninety day framing and the judged at six months section are exactly what an internal role charter needs. Drop the terms section and keep the rest.",
      },
      {
        question: "Should I really say what is hard about the role?",
        answer:
          "Yes, and specifically rather than as a general warning about challenge. The cost of a hire leaving in month four vastly exceeds the cost of a few applicants deciding early that the difficulty is not for them, which is the trade the honesty buys you.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/performance-review-prompt",
        label: "performance review prompt",
        description:
          "The how you will be judged section should become the review criteria, so the ad and the first review agree.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For the work the new hire is taking over, which is usually undocumented and living in one person's head.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For getting the role approved in the first place, including what happens if the hire is not made.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Keeps job ads sounding like the company rather than like every other ad, once the filler phrases are gone.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.eeoc.gov/employers",
        label: "EEOC: Guidance for employers",
        description:
          "The authoritative statement on which requirements risk unlawful exclusion, which is a legal reason to audit a requirements list as well as a practical one.",
      },
      {
        href: "https://hbr.org/2014/08/why-women-dont-apply-for-jobs-unless-theyre-100-qualified",
        label: "Harvard Business Review: Research on qualification thresholds and applications",
        description:
          "The evidence that unnecessary requirements suppress applications unevenly, which is the mechanism the audit is designed to counter.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/",
        label: "US Government: Plain language guidelines",
        description:
          "The standard reference behind replacing euphemisms like fast paced with the specific condition they describe.",
      },
    ],
  },
};

export default meta;
