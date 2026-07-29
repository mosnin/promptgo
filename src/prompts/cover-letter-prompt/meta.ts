import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "cover-letter-prompt",
  name: "One Argument Letter",
  title: "Cover Letter Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Builds a letter around a single argument tied to the problem the role exists to solve, and will not invent anything about the employer.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["cover letter", "applications", "job search", "hiring"],

  seo: {
    primaryKeyword: "cover letter prompt",
    keywords: [
      "cover letter prompt",
      "how to write a cover letter that gets read",
      "ai prompt for a tailored cover letter",
      "cover letter opening that is not generic",
      "explaining a career gap in a cover letter",
      "cover letter for a role you are underqualified for",
    ],
    seoTitle: "Cover Letter Prompt: One Argument, Under 250 Words",
    seoDescription:
      "A cover letter prompt that makes one evidenced argument about the problem the role exists to solve, bans enthusiasm adjectives and invents nothing about the firm.",
  },

  prompt: {
    text: `You are a hiring manager who reads roughly sixty applications per opening and abandons most letters inside the first sentence. You are looking for two things only: a reason this person is applying to you specifically, and one piece of evidence that they have done the difficult part of this job before.

THE ADVERTISEMENT, PASTED IN FULL: {{JOB_AD}}
WHAT I HAVE ACTUALLY DONE THAT TOUCHES THIS WORK: {{MY_EVIDENCE}}
CONCRETE THINGS I KNOW ABOUT THIS EMPLOYER AND HOW I KNOW THEM: {{EMPLOYER_FACTS}}
ANYTHING AWKWARD IN MY HISTORY: {{AWKWARD}}

First, state in one line the problem you think this role exists to solve. If the advertisement is a generic list of responsibilities with no identifiable problem in it, say so and tell me what to go and find out before writing anything.

Then write a letter under 250 words with exactly one argument. Open with something drawn from my employer facts that could not have been written about any other company. If my employer facts are empty or vague, do not invent a substitute and do not admire a mission statement. Write [NO SPECIFIC SUPPLIED] and stop.

Develop only my single strongest piece of evidence. Name any others in one clause. Do not restate my resume in longer sentences. Banned words: excited, passionate, thrilled, delighted, dynamic, perfect fit, culture fit. Never claim experience I did not give you.

If I gave you something awkward, put one plain sentence about it in its own short paragraph near the end, with no apology and no explanation beyond the fact.`,
    variables: [
      {
        token: "JOB_AD",
        label: "The full job advertisement",
        example:
          "Customer Operations Lead, 40 person fintech. Own the support queue, reduce escalations to engineering, build reporting the exec team currently does by hand in spreadsheets.",
      },
      {
        token: "MY_EVIDENCE",
        label: "What you have done that touches this work",
        example:
          "Cut engineering escalations from 60 a month to 18 over two quarters by building a triage rubric. Replaced a manual weekly report with a scheduled dashboard. Managed three support agents.",
      },
      {
        token: "EMPLOYER_FACTS",
        label: "Concrete things you know about this employer",
        example:
          "Their public status page shows six incidents last quarter, all tagged payments. Their head of support posted in June about hiring for triage rather than headcount.",
      },
      {
        token: "AWKWARD",
        label: "Anything awkward in your history",
        example: "Eleven month gap from March 2024 while caring for a parent. Current title is Support Specialist, not Lead.",
      },
    ],
    expectedOutput:
      "A one line statement of the problem the role exists to solve, then a letter under 250 words that opens on a checkable fact about the employer, develops one evidenced claim, and handles anything awkward in a single unapologetic sentence near the end.",
    followUps: [
      "The advertisement gave you nothing. Write me the five questions I should get answered before I apply, and say where each answer is likely to be public.",
      "Cut this to 180 words without losing the evidence paragraph.",
      "Rewrite the opening assuming my only employer fact is that a former colleague now works on that team.",
    ],
    pitfalls: [
      "People paste their resume into the evidence field. The prompt then has nothing to choose between and produces a summary, which is the document the screener already has.",
      "An empty employer facts field is the most common cause of a weak result, and the marker it returns is accurate rather than obstructive.",
      "The awkward field gets over filled. One sentence of fact is the whole treatment, and a paragraph of context makes a non issue look like a real one.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Every model opens a cover letter by admiring the employer, and with an empty employer field Claude Opus 4.5 still writes warm praise for a mission it has never seen, which is the exact sentence that gets a letter discarded. The refusal marker forces that gap to be filled with something real instead. GPT-5.2 holds the word ceiling but smuggles a second argument into the closing paragraph unless the paragraph count is capped too.",
  },

  article: {
    intro: [
      "A cover letter prompt that returns four paragraphs of enthusiasm has produced the exact document screeners delete unread. Delighted to apply, passionate about your mission, confident I would be a strong addition: none of it is checkable, so none of it counts for anything.",
      "This one makes a single argument instead. It reads the advertisement for the problem the role exists to solve, takes the one piece of your history that speaks to that problem, and spends the whole letter on it. Under 250 words, one claim, evidence attached.",
      "It also invents nothing about the employer. If you have not supplied something concrete you know about the company, it marks the gap rather than manufacturing admiration for a mission statement it has never read.",
    ],

    sections: [
      {
        heading: "One argument beats a summary",
        body: [
          "The letter is not a prose edition of your resume. Whoever is reading has the resume open already, and a document restating it in longer sentences is abandoned somewhere in the second paragraph.",
          "Working out how to write a cover letter that gets read starts with naming what the skim is hunting for: a reason you applied here rather than to two hundred employers, and one demonstration that you have done the hard part of this job before. Everything else is packing material around those two things.",
          "So the prompt commits to one argument and holds it. Where you have three relevant experiences it mentions two in a single clause and develops only the strongest, because a letter that develops all three develops none of them.",
        ],
      },
      {
        heading: "What the opening has to earn",
        body: [
          "The first sentence decides whether there is a second. It is where almost every generated letter fails, because the default move is to announce that you are applying, which the reader has already worked out from the existence of the document.",
        ],
        subsections: [
          {
            heading: "The specific you have to supply",
            body: [
              "A cover letter opening that is not generic contains something you could not have written about any other employer. Their pricing model changed in April. Their status page is public and tells a story. Somebody you know works there and described what is actually going wrong. The prompt asks for this and will not manufacture it.",
              "Finding one such fact is the highest value fifteen minutes in the whole application. A single real observation about the employer outperforms any amount of polish elsewhere in the letter.",
            ],
          },
          {
            heading: "Why enthusiasm adjectives are banned",
            body: [
              "Excited, passionate and thrilled are unfalsifiable, and a reader who has met them in every letter that morning stops registering them as feeling at all. Interest is demonstrated through specificity, so knowing what the team is dealing with is the evidence that you care about it.",
              "An ai prompt for a tailored cover letter earns its place only when tailoring means more than dropping the company name into the first paragraph. This one treats a name substitution as untailored and says so before it writes.",
            ],
          },
        ],
      },
      {
        heading: "Using the cover letter prompt on an awkward application",
        body: [
          "A cover letter for a role you are underqualified for has a narrower job than a standard one. Name the gap before the screener finds it, put your strongest offsetting evidence directly beside it, and stop. A letter hoping the gap passes unnoticed reads as unaware or evasive, and both readings cost more than the gap did.",
          "Explaining a career gap in a cover letter works the same way and needs one plain sentence with no apology attached to it. I was caring for a family member between March 2024 and January 2025 is a complete treatment. The urge to justify produces a paragraph that makes a non issue look like a real one.",
          "Both go in their own short paragraph near the end rather than in the opening, so the argument lands before the caveat arrives.",
        ],
      },
      {
        heading: "Where it stops",
        body: [
          "It will not claim experience you did not list. It will not call you a fit for a culture nobody has described to it. Given an advertisement that is a generic responsibilities list, it declines to write and instead tells you what to go and find out, usually from the hiring manager's own posts or the team's public output.",
          "That refusal irritates people and is the right behaviour. A vague advertisement is itself a finding, and the remedy is a better input rather than a more fluent paragraph on top of nothing.",
        ],
      },
    ],

    howTo: {
      name: "How to use the cover letter prompt",
      steps: [
        {
          name: "Find the problem behind the advertisement",
          text: "Somewhere in the responsibilities is the thing going wrong that caused them to open the role. Identify it before you run anything.",
        },
        {
          name: "Bring one checkable fact about the employer",
          text: "From their product, their public work, or a person you have spoken to. Without it the opening cannot do its job and the prompt will say so.",
        },
        {
          name: "Supply evidence rather than your resume",
          text: "Two or three things you have actually done that touch that problem, with figures where they exist and without the rest of your history.",
        },
        {
          name: "Cut it again afterwards",
          text: "The word ceiling is a limit, not a target. Most letters get better at around a hundred and eighty words.",
        },
      ],
    },

    faq: [
      {
        question: "Do hiring managers still read these?",
        answer:
          "Enough of them do that a bad letter costs you and a good one occasionally decides a close call. They matter most for career changers, internal moves, and anyone with something on the resume that needs one sentence of context to stop looking odd.",
      },
      {
        question: "How long should the letter be?",
        answer:
          "Under two hundred and fifty words. That ceiling is enforced because length correlates with padding rather than with effort. If the argument genuinely cannot fit, the usual cause is two arguments competing for the same space rather than one complicated one.",
      },
      {
        question: "Should I address it to a named person?",
        answer:
          "Where you can find one without guessing, yes. A wrong name is worse than no name, so the prompt addresses the team or the role whenever your input contains no confirmed contact instead of inventing a plausible sounding hiring manager.",
      },
      {
        question: "What if the cover letter prompt refuses to write one?",
        answer:
          "Treat the refusal as a finding. It only happens when the advertisement contained no identifiable problem and you supplied nothing concrete about the employer, which means the letter you were about to send had nothing in it either. Twenty minutes of reading fixes both inputs.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/resume-bullet-prompt",
        label: "resume bullet prompt",
        description:
          "The evidence paragraph here should come from a line that survived the resume classification, not from a fresh claim.",
      },
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "Whatever argument the letter makes is the first thing you will be asked to defend, so rehearse it before you send.",
      },
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Seeing how a good advertisement is constructed makes it faster to spot the problem hiding inside a bad one.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2014/02/how-to-write-a-cover-letter",
        label: "Harvard Business Review: How to write a cover letter",
        description:
          "Supports the single argument structure and the case against restating a resume in prose form.",
      },
      {
        href: "https://www.eeoc.gov/prohibited-employment-policiespractices",
        label: "EEOC: Prohibited employment policies and practices",
        description:
          "Sets out which personal circumstances an employer may not weigh, which is why a gap needs one factual sentence rather than a justification.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the instruction patterns behind the banned word list and the hard length ceiling used here.",
      },
    ],
  },
};

export default meta;
