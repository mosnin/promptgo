import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "survey-analysis-prompt",
  name: "Response Reader",
  title: "Survey Analysis Prompt",
  category: "data-analysis-prompts",
  taskType: "analyse",
  summary:
    "Reports who did not answer before it reports what answers said, codes open text using respondents' own words, and refuses to cut segments the sample cannot support.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["surveys", "qualitative", "likert", "research"],

  seo: {
    primaryKeyword: "survey analysis prompt",
    keywords: [
      "survey analysis prompt",
      "how to analyse open ended survey responses",
      "response rate and nonresponse bias",
      "coding qualitative survey answers",
      "ai prompt for likert scale results",
      "survey sample too small to segment",
    ],
    seoTitle: "Survey Analysis Prompt: Read Responses Without Overreaching",
    seoDescription:
      "A survey analysis prompt that reports response rate and who is missing before any theme, codes open text in respondents' own words, and blocks tiny segment cuts.",
  },

  prompt: {
    text: `You are analysing survey results. The most important number in a survey is usually the one describing who did not answer, so you will report that before anything else. You will not summarise sentiment until coverage has been stated.

WHAT THE SURVEY WAS FOR: {{PURPOSE}}
EXACT WORDING OF EVERY QUESTION YOU ARE ANALYSING: {{QUESTIONS}}
FIELDWORK FACTS: invited, started, completed, method, dates: {{FIELDWORK}}
THE RESPONSES: {{RESPONSES}}
SEGMENTS I WANT TO CUT BY, WITH COUNT IN EACH: {{SEGMENTS}}

Work in this order.

1. COVERAGE. Calculate the completion rate from the fieldwork figures. State who is structurally likely to be missing given the method and timing, and name which conclusions that absence would most distort. Do not skip this because it is uncomfortable.

2. CLOSED QUESTIONS. Report full distributions, never a mean alone on a rating scale. For each scale question give the counts in every point, the top two and bottom two groupings, and how many chose the neutral or skipped it. Say explicitly if a mean would be misleading because the distribution has two peaks.

3. OPEN TEXT CODEBOOK. Build codes from respondent language, naming each code with words respondents actually used. For each code give the count, two verbatim quotes and the percentage of open responses it covers. Report how many responses fit no code rather than forcing them into one.

4. SEGMENT REFUSAL. For any segment with fewer than 30 respondents, refuse to report differences and say so by name. List every underpowered cut in one place.

5. THINGS THIS SURVEY CANNOT ANSWER. Include question wording effects, order effects and anyone who was never invited.

CRITICAL: every quote must be copied exactly from the responses given. Do not paraphrase a quote, invent a representative response, or report a percentage you cannot derive from the counts supplied.`,
    variables: [
      {
        token: "PURPOSE",
        label: "What the survey was for",
        example:
          "Deciding whether to keep Saturday clinics open after the pilot, based on patient and staff views",
      },
      {
        token: "QUESTIONS",
        label: "Exact wording of every question analysed",
        example:
          "Q3 How satisfied were you with your appointment time? 1 to 5. Q4 What would have made booking easier? free text",
      },
      {
        token: "FIELDWORK",
        label: "Invited, started, completed, method, dates",
        example:
          "2,900 invited by SMS, 611 started, 447 completed, 12 to 26 June, English only, link expired after 7 days",
      },
      {
        token: "RESPONSES",
        label: "The responses",
        example:
          "Q3 counts: 1=18, 2=41, 3=96, 4=180, 5=112. Q4: 260 free text answers pasted below in full",
      },
      {
        token: "SEGMENTS",
        label: "Segments to cut by, with counts",
        example: "Over 65s n=88, under 30s n=41, staff n=19, first visit n=134",
      },
    ],
    expectedOutput:
      "A completion rate with a named account of who is missing, full distributions rather than bare means, a codebook whose labels use respondent wording with counts and exact quotes, and an explicit list of segments it declined to analyse.",
    followUps: [
      "Take the largest code and tell me what a follow up question would need to ask to make it actionable.",
      "Two of my segments were refused for size. Design a targeted follow up that would reach enough of those respondents to answer the question properly.",
      "Rewrite question 3 to remove the wording problem you identified, and say what changes about comparability with this round.",
    ],
    pitfalls: [
      "Pasting a summary of the open text instead of the raw responses removes the only thing the codebook can be built from, and the model will then produce themes from your summary's vocabulary rather than respondents'.",
      "If you omit the invited figure, coverage becomes uncheckable and the analysis silently treats respondents as the population.",
      "Models will still soften a harsh code label towards something presentable. Compare each label against the quotes underneath it before using the codebook in a report.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Requiring verbatim quotes came out of a run where Gemini produced a beautifully representative patient comment that appeared nowhere in the 260 responses I had pasted. It was a composite, and it was better written than anything real. I now grep every quote against the source file before it reaches a report, and the prompt says copied exactly rather than quote for that reason.",
  },

  article: {
    intro: [
      "A survey analysis prompt has to fight a specific temptation, which is to start with the themes. Themes are the interesting part, they read well, and they arrive with an air of authority that survives all the way into a recommendation without anyone asking who was in the sample.",
      "So this one refuses to discuss content until coverage is on the page. Completion rate first, then a named account of who is structurally likely to be absent, then what that absence would distort. Only after that does it look at what people said.",
      "The other constraint that matters is quotation. Every quote must be copied exactly from the responses supplied, because a model asked for a representative comment will happily write one, and a composite quote is more persuasive than any real one.",
    ],

    sections: [
      {
        heading: "Read the response rate before you read the responses",
        body: [
          "Response rate and nonresponse bias are two different things and the first only hints at the second. A twelve percent response rate is not automatically useless, and a sixty percent rate is not automatically sound. What matters is whether the people who answered differ from the people who did not in ways connected to the question you asked.",
          "The method usually tells you. An SMS link sent in English during working hours, expiring after a week, systematically loses people without a phone plan, people who read another language and anyone who was away. If your survey asks about access, you have lost precisely the group whose answers would have changed the conclusion.",
          "Naming that group is uncomfortable and it is the single most valuable paragraph in most survey write ups. It also converts a vague caveat into something checkable, because you can compare respondent demographics against the invited list where one exists.",
        ],
      },
      {
        heading: "How to analyse open ended survey responses",
        body: [
          "How to analyse open ended survey responses is where a model genuinely helps, because reading 260 free text answers carefully takes a morning and it is the task people quietly skip. The risk is that the model reads them and then tells you a story rather than a count.",
          "The defence is arithmetic. Every code carries a count, a percentage of open responses and two exact quotes, so a theme presented as widespread has to declare that it appeared eleven times out of 260. That number often changes the recommendation on its own.",
          "Equally important is the count of responses that fit no code. A codebook covering every answer is usually a codebook with a category broad enough to be meaningless, and the leftovers are frequently where the unexpected material sits.",
        ],
      },
      {
        heading: "Coding qualitative survey answers in the respondents' own words",
        body: [
          "Coding qualitative survey answers works best when the labels are borrowed rather than invented. A code called cannot get through on the phone is traceable to the text underneath it. A code called communication challenges is a category a consultant would write, and it absorbs unrelated complaints until it becomes the largest theme by construction.",
          "Models drift towards the second kind because abstract labels sound more professional. Checking each label against its own quotes takes a few minutes and reverses most of the drift, and where a label cannot be justified by the quotes the code itself is usually wrong.",
        ],
      },
      {
        heading: "Rating scales, means and the distribution nobody shows",
        body: [
          "Run as an ai prompt for likert scale results, the useful behaviour is refusing to hand over a mean by itself. An average of 3.4 describes a mildly positive population and an evenly split one identically, and those two situations call for opposite decisions.",
          "Full counts at every scale point fix this in one line of output. Two peaks are visible immediately, the neutral option shows how many people declined to commit, and the top two box grouping gives a figure that can be compared over time without pretending an ordinal scale has real intervals.",
        ],
        list: [
          "Give counts at every point, not just an average and a chart of it.",
          "Report the neutral separately from the missing, since they mean different things.",
          "Show top two and bottom two groupings for anything tracked across rounds.",
          "Flag bimodal distributions explicitly, because the mean actively hides them.",
          "State the question wording next to the result, since a leading question shapes the scale.",
        ],
      },
      {
        heading: "Segment cuts the sample cannot support",
        body: [
          "The refusal rule is blunt on purpose: no reported difference for any segment under thirty respondents. A survey sample too small to segment is still perfectly useful in aggregate, and the damage comes from slicing it anyway and presenting a nineteen person group as a finding about staff.",
          "Underpowered cuts also multiply quietly. Four segments crossed with five questions produce twenty comparisons, and a handful will look striking through chance alone. Listing every refused cut in one place makes the temptation visible rather than leaving each one to be argued individually.",
        ],
      },
      {
        heading: "Where the survey analysis prompt stops",
        body: [
          "It cannot tell you whether your questions were any good. Wording effects, ordering effects and satisficing all happen before the data exists, and no analysis recovers from a leading question. The final section lists these rather than fixing them, which is the honest position.",
          "It also cannot speak for anyone who was never invited. That boundary is worth writing into the report itself, because a survey of current customers gets quoted six months later as a statement about the market, and by then nobody remembers who the invitation went to.",
        ],
      },
    ],

    howTo: {
      name: "How to run the survey analysis prompt",
      steps: [
        {
          name: "Paste the fieldwork numbers first",
          text: "Invited, started, completed, method and dates. Coverage cannot be assessed from responses alone, and this is the field most people leave blank.",
        },
        {
          name: "Include the exact question wording",
          text: "Paste it as respondents saw it. A question the model has to imagine will be assumed neutral, and few are.",
        },
        {
          name: "Give raw open text, not a summary",
          text: "The codebook is built from respondent vocabulary. A summary replaces that vocabulary with yours before the analysis starts.",
        },
        {
          name: "Verify every quote against the source",
          text: "Search the raw file for each quoted phrase. Anything that does not match exactly is a composite and must be removed before the report circulates.",
        },
      ],
    },

    faq: [
      {
        question: "What response rate does the survey analysis prompt consider acceptable?",
        answer:
          "It does not set a threshold, because the number alone does not decide validity. It instead describes who the method and timing systematically excluded and which conclusions that exclusion would distort, which is the judgement a bare percentage cannot give you.",
      },
      {
        question: "Can it handle several hundred free text answers at once?",
        answer:
          "Usually yes, though very long sets are better split by question and combined afterwards. Watch the count of uncoded responses when you split, since a code built on one batch tends to be applied loosely to the next and the leftovers quietly shrink.",
      },
      {
        question: "Why thirty respondents as the segment floor?",
        answer:
          "It is a working convention rather than a rule, picked because below it a single answer swings a percentage by several points. Raise it when the differences you care about are small, and treat any cut near the boundary as a hypothesis for the next round.",
      },
      {
        question: "Is it safe to paste responses containing personal information?",
        answer:
          "Not without checking your own policy first. Free text fields collect names, contact details and health information that respondents volunteered, and redacting before pasting is quicker than dealing with the consequences of not having done so.",
      },
    ],

    internalLinks: [
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description:
          "For testing a segment difference that survived the size floor and now needs its alternative explanations listed.",
      },
      {
        href: "/data-analysis-prompts/data-storytelling-prompt",
        label: "data storytelling prompt",
        description:
          "Writes up the codebook and coverage findings without the caveats evaporating between the analysis and the summary slide.",
      },
      {
        href: "/data-analysis-prompts/chart-selection-prompt",
        label: "chart selection prompt",
        description:
          "Rating scale distributions are easy to misdraw, and this picks a form that keeps the shape and the base size visible.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "Turns survey findings into a proposal where the missing respondents appear as a stated assumption rather than a footnote.",
      },
    ],

    externalLinks: [
      {
        href: "https://aapor.org/standards-and-ethics/standard-definitions/",
        label: "AAPOR: Standard Definitions for response rates",
        description:
          "The profession's agreed formulas for calculating response, cooperation and completion rates, so the figure you report means what readers assume.",
      },
      {
        href: "https://www.pewresearch.org/methods/2017/05/15/what-low-response-rates-mean-for-telephone-surveys/",
        label: "Pew Research Center: what low response rates mean",
        description:
          "Empirical work showing when a low response rate does and does not bias estimates, which is the evidence behind separating rate from bias.",
      },
      {
        href: "https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/uncertaintyandhowwemeasureit",
        label: "ONS: uncertainty and how we measure it",
        description:
          "A national statistics office explaining how it communicates sampling uncertainty, useful as a model for wording your own caveats.",
      },
      {
        href: "https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm",
        label: "NIST/SEMATECH e-Handbook: sample sizes for proportions",
        description:
          "Shows how quickly precision collapses as a subgroup shrinks, which is the arithmetic underneath the segment refusal rule.",
      },
    ],
  },
};

export default meta;
