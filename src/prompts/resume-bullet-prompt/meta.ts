import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "resume-bullet-prompt",
  name: "Bullet Auditor",
  title: "Resume Bullet Prompt",
  category: "career-prompts",
  taskType: "rewrite",
  summary:
    "Sorts every line on your resume into evidenced, recoverable or delete, and cuts what it cannot attach a number or a named outcome to.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["resume", "cv", "job search", "recruiting"],

  seo: {
    primaryKeyword: "resume bullet prompt",
    keywords: [
      "resume bullet prompt",
      "how to write resume bullets with numbers",
      "ai prompt for quantifying achievements on a resume",
      "resume bullets that survive recruiter screening",
      "deleting resume lines with no evidence",
      "writing resume bullets without inflating them",
    ],
    seoTitle: "Resume Bullet Prompt: Evidence Or Delete The Line",
    seoDescription:
      "A resume bullet prompt that sorts each line into evidenced, recoverable or delete, refuses to invent a metric, and never upgrades your verb to a grander one.",
  },

  prompt: {
    text: `You are a technical recruiter who screens applications at speed. You believe a resume line without a number, a named system, a named outcome or a named person is decoration, and you would rather see six defensible lines than fourteen atmospheric ones.

ROLE I AM APPLYING FOR: {{TARGET_ROLE}}
MY CURRENT BULLETS, EXACTLY AS THEY ARE WRITTEN: {{CURRENT_BULLETS}}
RAW FACTS I CAN VERIFY, INCLUDING FIGURES, DATES, SYSTEMS AND NAMES: {{RAW_FACTS}}
FORMAT LIMITS SUCH AS PAGE COUNT OR CHARACTER LENGTH: {{LIMITS}}

Classify every bullet before rewriting anything. Use exactly these labels.

EVIDENCED: the line already carries a figure, a named system, a named outcome or a named stakeholder. Tighten the wording. Do not restructure it.
RECOVERABLE: the achievement is real but the measurement is missing. Name the single specific figure I should go and look up, and where it probably lives.
DELETE: no outcome exists in my raw facts and none can be recovered. Cut the line. Say in one clause why.
CONFLICT: the line disagrees with something else I gave you, such as a date range, a team size or a scope claim.

HARD RULES. Never introduce a number that is not present in my raw facts, including a plausible estimate. Never convert a team result into a personal one unless I stated my own contribution. Never promote a job title beyond what I wrote. Treat my original verb as the ceiling: if you substitute a stronger verb, put your reason in square brackets so I can reject it. Where my raw facts contain a strong result that I stated modestly, surface the result instead of preserving the understatement.

Output the classified list first, then the rewritten resume section, then the numbers I still need to find.`,
    variables: [
      {
        token: "TARGET_ROLE",
        label: "The role you are applying for",
        example: "Senior Operations Manager, 200 person logistics company, job ad emphasises cost reduction and vendor management",
      },
      {
        token: "CURRENT_BULLETS",
        label: "Your bullets exactly as written today",
        example:
          "Responsible for warehouse operations. Helped improve shipping times. Managed vendor relationships. Spearheaded process improvement initiatives. Worked cross functionally with stakeholders.",
      },
      {
        token: "RAW_FACTS",
        label: "Verifiable facts, figures, dates and names",
        example:
          "Shipping went from 4.1 days to 2.6 days between Jan and Sept 2025. Renegotiated the packaging contract, saved about 40k a year. Two of eleven vendors were replaced. Trained four new supervisors. No data on error rates.",
      },
      {
        token: "LIMITS",
        label: "Format limits",
        example: "One page total, five bullets maximum for this role, no line longer than two printed lines",
      },
    ],
    expectedOutput:
      "A labelled classification of every original line, a rewritten section that is shorter than what you pasted in, an explicit list of figures to go and confirm, and bracketed justifications beside any verb the model changed.",
    followUps: [
      "I found the error rate data: 3.2 percent down to 0.9 percent over the same period. Reclassify the lines that depended on it.",
      "Reorder the surviving bullets for a job ad that leads on vendor management rather than cost.",
      "For each surviving bullet, write the follow up question an interviewer would ask, so I can check I can answer it.",
    ],
    pitfalls: [
      "Pasting a resume you have already tidied hides the weak lines from the classifier. It needs to see the vague version to cut it.",
      "People argue with DELETE labels and keep the line anyway. If you could not find evidence after looking, the interviewer will not find any either.",
      "A percentage with no baseline reads as unanchored to an experienced screener. Give the before figure in your raw facts or expect the line to come back as RECOVERABLE.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Left free to estimate, GPT-5.2 attaches a confident percentage to a backlog reduction that arrived with no figures at all, and the line reads perfectly, which is what makes it dangerous. Numbers absent from the supplied facts are therefore banned outright rather than hedged. Claude Opus 4.5 inflates verbs instead, turning coordinated into led while the underlying claim stays untouched, so verbs get a separate rule.",
  },

  article: {
    intro: [
      "A resume bullet prompt that makes your work sound more impressive is working against you. Ask a model to improve a line and it reaches for a bigger verb, so managed becomes spearheaded and helped becomes drove, while the underlying claim stays exactly as unsupported as it was.",
      "This one moves the other way. It sorts what you already have into three piles: lines carrying a number or a named outcome, lines that could carry one if you go and find the figure, and lines that cannot and should be cut. It is allowed to delete. It is not allowed to invent.",
      "The output is usually shorter, and shorter is the point. Six lines a hiring manager can question beat fourteen they cannot.",
    ],

    sections: [
      {
        heading: "Why the verb upgrade fails",
        body: [
          "Screening a stack of applications is not reading in the way the word implies. The first pass is a scan for matches against the role, and a scan rewards numerals and concrete nouns because those are the only things that survive being glanced at. Grand verbs occupy the same space and carry none of the signal.",
          "Writing resume bullets without inflating them is mostly a matter of refusing the verb upgrade. If you coordinated something, the word is coordinated. Spearheaded describes a different level of authority, and if an interviewer probes and finds you coordinated, the whole document loses credibility over one word nobody needed.",
          "Resume bullets that survive recruiter screening share one property. A reader can tell in about a second what changed and by how much. Everything else in the line is scaffolding.",
        ],
      },
      {
        heading: "The three way sort",
        body: [
          "The resume bullet prompt does not rewrite your lines one at a time. It labels them first, which is what stops it treating every line as salvageable. A sentence describing a genuine responsibility that left no measurable trace is not a writing problem, and rewording it produces a better sentence about nothing.",
          "Each line comes back with a label, and where a figure is missing it comes back with a specific instruction about what to go and look up rather than a general nudge to add metrics.",
        ],
        list: [
          "EVIDENCED: a figure, system, outcome or stakeholder is already named. Tightened, not restructured.",
          "RECOVERABLE: the achievement happened but the measurement is missing, so the prompt names the exact number to chase and where it probably lives.",
          "DELETE: no outcome exists and none can be recovered, so the line goes.",
          "CONFLICT: the line disagrees with something else you supplied, such as a team size or a date range.",
        ],
      },
      {
        heading: "Numbers you can defend, not numbers you can produce",
        body: [
          "Learning how to write resume bullets with numbers is less about arithmetic than about deciding which figure you are willing to defend under questioning. Anything numeric on the page is an invitation to a follow up, so the test is whether you can say how it was measured, over what period, and what part of it was yours.",
          "An ai prompt for quantifying achievements on a resume is only as good as the material you hand it. If your input says improved the onboarding process, no constraint produces a percentage. If your input says onboarding took nine days and now takes four, the line writes itself and it happens to be true.",
          "Unanchored percentages are the most common weak form. Reduced errors by forty percent, from what baseline, over what window? Someone who has read a thousand applications treats a floating percentage as decoration rather than as data.",
        ],
      },
      {
        heading: "Using the resume bullet prompt when there is no number",
        body: [
          "Plenty of real work was never measured. The prompt handles those lines with named outcomes instead of figures: the client who renewed, the runbook still in use two years later, the internal tool three other teams picked up. A named specific is weaker than a number and far stronger than an adjective.",
          "Deleting resume lines with no evidence feels like shrinking your case. It generally strengthens it, because most resumes are padded with sentences that restate the job description rather than describe anyone's performance of it, and those are precisely the sentences a screener has trained herself to skip.",
        ],
      },
      {
        heading: "What it refuses to do",
        body: [
          "It will not add a metric absent from your input, however plausible. It will not turn a team result into a personal one. It will not promote a title beyond the one on your payslip, which is a small misrepresentation that becomes a large problem at the background check stage.",
          "The refusal runs in the other direction too. Where your raw facts contain a strong result you stated modestly, the prompt surfaces the result rather than preserving the understatement. Accuracy is the constraint, not modesty.",
        ],
      },
    ],

    table: {
      caption: "What each label means for the line",
      headers: ["Label", "Trigger", "Action"],
      rows: [
        ["EVIDENCED", "Figure, system, outcome or stakeholder already named", "Tighten wording only"],
        ["RECOVERABLE", "Real achievement, missing measurement", "Name the exact figure to find"],
        ["DELETE", "No outcome, none recoverable", "Cut the line"],
        ["CONFLICT", "Disagrees with another supplied fact", "Flag for you to resolve"],
      ],
    },

    howTo: {
      name: "How to run the resume bullet prompt",
      steps: [
        {
          name: "Write the raw facts before the resume",
          text: "List what changed while you were there: figures, dates, systems, the names of people who benefited. Fifteen minutes here decides everything downstream.",
        },
        {
          name: "Paste the document unpolished",
          text: "Do not tidy it first. The classifier needs to see the vague lines in order to cut them, and a cleaned up input hides them.",
        },
        {
          name: "Chase the recoverable figures",
          text: "Old dashboards, closed tickets, a former colleague. Most missing numbers take one message to confirm, and a confirmed number is worth more than a paragraph.",
        },
        {
          name: "Cut rather than defer",
          text: "A line still unevidenced after you have actually looked is a line to remove. Keeping it because the page looks sparse is how resumes get long and weak.",
        },
      ],
    },

    faq: [
      {
        question: "Will this make my resume too short?",
        answer:
          "Shorter, usually, and that is the intended direction. One page a hiring manager can interrogate is a better screening asset than two pages they skim. If the cut version looks thin, read that as information about the evidence you hold rather than about the writing.",
      },
      {
        question: "Does it work when the job had no measurable results?",
        answer:
          "Yes, through named outcomes rather than figures. Support work, research and early career roles often have no dashboard behind them, so the prompt asks which specific person, system or decision was affected. Naming something real beats quantifying something invented.",
      },
      {
        question: "Should I use the same bullets for every application?",
        answer:
          "No. Run it once per target role with the advertisement pasted into the input. The classifications rarely change but the ordering does, because a line that is central evidence for one job is filler for the next one you apply to.",
      },
      {
        question: "What if the model still inflates a verb?",
        answer:
          "Tell it the original verb is a ceiling and ask for a bracketed justification beside every substitution. That single instruction removed almost all remaining inflation in testing, and the justifications it produced were easy to read through and reject one at a time.",
      },
      {
        question: "Is a resume bullet prompt any use for a profile page?",
        answer:
          "The classification transfers but the register does not. A profile is read voluntarily and can carry a first person sentence of context, while a resume line is scanned under time pressure and has to front load the outcome before anything else.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/cover-letter-prompt",
        label: "cover letter prompt",
        description:
          "The lines this one deletes are often the ones worth explaining in prose, which is what the letter is for.",
      },
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description:
          "Same evidence rule, different register, since a profile is read by choice rather than scanned against a shortlist.",
      },
      {
        href: "/business-prompts/job-description-prompt",
        label: "job description prompt",
        description:
          "Reading how the role was written tells you which of your evidenced lines to put first.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How people read online",
        description:
          "The eye tracking evidence behind the claim that scanning readers fix on numerals and concrete nouns rather than on adjectives.",
      },
      {
        href: "https://www.bls.gov/ooh/",
        label: "US Bureau of Labor Statistics: Occupational Outlook Handbook",
        description:
          "Primary reference for the standard duties and vocabulary of a role, useful when checking that a rewritten line still describes the actual job.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the grounding technique that keeps every figure attached to supplied input instead of generated from context.",
      },
    ],
  },
};

export default meta;
