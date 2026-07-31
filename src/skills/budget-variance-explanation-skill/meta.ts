import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Budget Variance Explanation Skill

Use this skill whenever you are given a set of budgeted figures and a set of actual figures
for the same period, by line item, and asked to explain what happened. This covers monthly
department budgets, project cost tracking, grant spending reports, or any other side by side
comparison of planned versus actual numbers.

## Before you explain anything: get the real numbers

Ask for, or locate, the exact budgeted amount and the exact actual amount for every line item
being reviewed, for the same period and the same currency. Do not proceed on a partial figure,
a rounded estimate, or a remembered number. If a line item is missing either its budgeted or
its actual figure, mark that line item as incomplete and do not compute a variance for it.

## Computing the variance: arithmetic first, shown as working

For each line item with both figures present, compute two things and show the working, never
just the result:

1. Variance amount: actual minus budgeted. State whether the result means more was spent or
   earned than planned, or less.
2. Variance percentage: the variance amount divided by the budgeted amount, multiplied by 100.
   Show this as an explicit calculation next to the two figures it came from, not as a number
   that appears on its own.

Round the final percentage to one decimal place only after the division has been shown in full.
Never state a variance percentage without the variance amount and the budgeted figure it was
derived from sitting directly beside it, so a reader can check the arithmetic themselves in a
few seconds.

## Deciding which variances are significant enough to explain

Not every variance needs a story. Ask the user for a materiality threshold, a percentage or a
dollar amount below which a variance is treated as normal noise rather than something requiring
explanation. If none is given, use a modest default of five percent of the budgeted amount and
say plainly that this default is being applied. A small variance on a small line item does not
need a narrative; a large variance, or a small one on a very large line item, does.

## Explaining a variance: real context only, never a guess

For every line item whose variance clears the materiality threshold, ask the user what actually
happened during the period that would explain it: a vendor price increase, a delayed hire, a
cancelled project, a one time refund, a seasonal spike. Write the explanation only from real
context the user actually supplies, quoted or closely paraphrased. Do not invent a plausible
sounding cause from the size or direction of the variance alone, and do not borrow a generic
explanation ("market conditions changed," "demand was higher than expected") that was not
actually given.

## When no real context exists: flag it, do not guess

If a line item's variance clears the materiality threshold and the user has supplied no context
for it, write that line item's explanation as "cause not yet identified" and say plainly that
no explanation has been supplied yet, rather than filling the gap with an invented story. Follow
this with the specific question that would resolve it, for example asking what changed in that
category during the period. A variance report with an honest gap in it is more useful than one
where every line has a confident sounding cause and some of those causes were never actually
confirmed by anyone.

## What this skill does not do

It does not decide, on its own, why spending or revenue moved. It does not smooth over a gap in
the user's knowledge by supplying a generic business explanation that sounds correct. Every
number in the output traces back to the budgeted and actual figures supplied, and every cause
traces back to context the user actually gave, or is explicitly marked as not yet identified.

## Writing the finished explanation

Use \`reference/worked-example.md\` for the exact layout: a per line item table showing the
budgeted figure, the actual figure, the variance amount, the variance percentage and its
direction, followed by a short plain language explanation for each line item that clears the
materiality threshold. Follow that layout directly rather than inventing a new structure, since
the fixed order is what lets a reader move straight from the arithmetic to the explanation
without losing track of which number produced which sentence.
`;

const WORKED_EXAMPLE_MD = `# Worked example: quarterly department budget

Use this alongside \`SKILL.md\`. It shows the exact arithmetic and the explanation discipline
applied to one real looking data set: a marketing department's second quarter budget against
its actual spend, with a five percent materiality threshold applied throughout.

## The figures supplied

| Line item | Budgeted | Actual |
|---|---|---|
| Software subscriptions | 12,000 | 14,700 |
| Contractor fees | 20,000 | 9,400 |
| Travel and events | 6,000 | 6,150 |
| Digital ad spend | 40,000 | 31,200 |

## The arithmetic, shown as working

**Software subscriptions.** Variance amount: 14,700 minus 12,000 equals 2,700. Variance
percentage: 2,700 divided by 12,000, multiplied by 100, equals 22.5 percent. This is above the
five percent threshold and means more was spent than budgeted.

**Contractor fees.** Variance amount: 9,400 minus 20,000 equals negative 10,600. Variance
percentage: negative 10,600 divided by 20,000, multiplied by 100, equals negative 53.0 percent.
This is above the threshold and means less was spent than budgeted.

**Travel and events.** Variance amount: 6,150 minus 6,000 equals 150. Variance percentage: 150
divided by 6,000, multiplied by 100, equals 2.5 percent. This falls below the five percent
materiality threshold, so no explanation is required for this line item.

**Digital ad spend.** Variance amount: 31,200 minus 40,000 equals negative 8,800. Variance
percentage: negative 8,800 divided by 40,000, multiplied by 100, equals negative 22.0 percent.
This is well above the threshold and means less was spent than budgeted.

## The explanations, tied to real supplied context

**Software subscriptions, 22.5 percent over budget.** The user stated that the vendor increased
its per seat licensing price partway through the quarter, and the team did not reduce seat count
in response. That stated fact is the explanation: a vendor price increase, not a guess about
usage growth or scope creep.

**Contractor fees, 53.0 percent under budget.** The user stated that a planned contractor
engagement was delayed into next quarter because the internal project it supported had not yet
been approved. That stated fact is the explanation: a delayed hire, not an assumption that the
work was cancelled outright.

**Travel and events, 2.5 percent over budget.** Below the materiality threshold. No explanation
is written for this line item, and none was requested from the user, because a variance this
small on a line item this size does not clear the bar for requiring a real cause.

**Digital ad spend, 22.0 percent under budget.** The user supplied no context for this line item
during the review. The explanation is written as "cause not yet identified," specifically
because no real information was given about why ad spend came in lower than planned, not because
the variance is too small to matter. The follow up question recorded alongside it: what changed
in the digital ad spend plan or execution during this quarter.

## Why the fourth line item matters most in this example

A skill that filled in "campaign underperformance" or "reduced demand" for the digital ad spend
line, without anyone actually saying that happened, would look identical to the other three
explanations on the page while being entirely invented. Marking it "cause not yet identified"
instead keeps the report honest about the one place where the arithmetic is solid but the story
behind it is still missing.
`;

const meta: SkillMeta = {
  slug: "budget-variance-explanation-skill",
  name: "Budget Variance Explainer",
  title: "Budget Variance Explanation Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that computes exact budget variance amounts and percentages from real figures, shown as working, and refuses to invent a cause for any variance the user has not actually explained.",

  seo: {
    primaryKeyword: "budget variance explanation skill",
    keywords: [
      "budget variance explanation skill",
      "free ai skill for budget variance analysis",
      "downloadable budget variance report template",
      "ai skill to explain budget vs actual variance",
      "how to calculate budget variance percentage",
    ],
    seoTitle: "Budget Variance Explanation Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable budget variance explanation skill that computes exact variance amounts and percentages and never invents a cause without real context.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Given a significant variance with no explanatory detail supplied, models reliably invent a plausible sounding cause anyway, most often a generic story about market conditions, demand shifts or a hiring delay, rather than stating plainly that no real explanation has actually been given. This skill requires the arithmetic to be shown as working before any narrative is attempted, and it blocks the guessing habit directly: a variance with no supplied context is labelled cause not yet identified rather than filled with a story that reads as fact once it reaches a reader.",
  },

  article: {
    intro: [
      "A budget variance explanation skill is only trustworthy if it can tell the difference between arithmetic and a story. Handed a set of budgeted figures and a set of actual figures, most AI assistants will compute the difference correctly and then keep going, quietly supplying a plausible sounding reason for the gap even when nobody told them what actually happened. This skill is built to stop at exactly that line: the numbers get computed and shown as working, and the reason gets written only from real context the user actually supplies.",
      "It ships as two plain text files: a main instructions file and a worked example it points to, both previewable in full on this page before you download the .zip. As a free ai skill for budget variance analysis, its value sits in one constraint: the arithmetic is asserted with certainty because it can be checked, and the explanation carries exactly as much certainty as the context behind it, and no more. The worked example shows the arithmetic for four line items and, deliberately, one explanation marked cause not yet identified, because that is the outcome this skill is meant to produce whenever the real reason has not actually been supplied.",
    ],
    sections: [
      {
        heading: "Why a budget variance explanation skill starts with arithmetic, not adjectives",
        body: [
          "Every variance report begins with two numbers: what was budgeted and what actually happened. This skill's first instruction is to get both figures for every line item, for the same period and currency, before anything else is written. A line item missing either figure is marked incomplete rather than estimated, because a variance built on a guessed input is not a variance at all.",
          "From there, the variance amount and the variance percentage are computed directly, with the division shown as working next to the two figures it came from. A reader should be able to check the percentage against the amount and the budgeted figure in a few seconds, not take it on trust.",
        ],
      },
      {
        heading: "The arithmetic, worked through one line item",
        body: [
          "Take a software subscriptions line budgeted at 12,000 with an actual spend of 14,700. The variance amount is 14,700 minus 12,000, which equals 2,700. The variance percentage is 2,700 divided by 12,000, multiplied by 100, which equals 22.5 percent. Both numbers are stated with the calculation visible, not just the rounded result, because the calculation is what makes the number checkable rather than merely asserted.",
          "This is the discipline behind every line item this skill touches: the amount first, the percentage second, both shown as working before any explanation is attempted for either one. Knowing how to calculate budget variance percentage by hand is what makes the skill's output checkable rather than merely stated.",
        ],
      },
      {
        heading: "Not every variance needs a story",
        body: [
          "A materiality threshold, a percentage or dollar amount below which a variance counts as ordinary noise, keeps the explanation work focused on what actually matters. If the user does not supply one, this skill applies a modest default of five percent of the budgeted amount and says so plainly, rather than either explaining every trivial rounding difference or silently skipping a threshold decision altogether.",
          "A two and a half percent overage on a small travel line does not need a narrative. A twenty percent swing on a large line item does, and treating both the same way wastes the reader's attention on the wrong numbers.",
        ],
      },
      {
        heading: "Explaining a variance without inventing a cause",
        body: [
          "For every line item that clears the materiality threshold, this skill asks what actually happened, a vendor price increase, a delayed hire, a cancelled project, a one time refund, and writes the explanation from that real, supplied context only. A generic phrase like market conditions changed is not an explanation unless the user actually said that, and this skill's instructions forbid supplying it as filler.",
          "This is the core discipline behind the whole exercise, as an ai skill to explain budget vs actual variance rather than merely compute it: the arithmetic is asserted with confidence because it can be checked, and the explanation is asserted with exactly as much confidence as the context behind it, and no more.",
        ],
      },
      {
        heading: "What happens when no real explanation exists yet",
        body: [
          "When a variance clears the threshold and the user has given no context for it, this skill writes cause not yet identified instead of guessing, and pairs it with the specific follow up question that would resolve it. That single honest gap is worth more than a confident sounding invention, since a reader who trusts the report will otherwise treat an invented cause as fact and act on it.",
          "This is the single detail that separates a genuinely downloadable budget variance report template from one that merely looks thorough: every cause on the page either traces to something a real person said, or is explicitly marked as unresolved.",
        ],
      },
      {
        heading: "Using the files together",
        body: [
          "Hand both files to an AI assistant at once, since SKILL.md points to the worked example by its relative path for the exact table and explanation layout to follow. Keep the reference folder next to SKILL.md as downloaded, then supply the real budgeted and actual figures, a materiality threshold if one exists, and whatever real context is available for each significant line item.",
        ],
      },
    ],
    howTo: {
      name: "How to use the budget variance explanation skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real figures and context",
          text: "Collect the exact budgeted and actual amount for each line item for the same period, a materiality threshold if you have one, and any real information about what happened for the line items you expect to be significant.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply your figures and context and ask for the variance table and explanations.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I do not know why a variance happened?",
        answer:
          "The skill writes that line item's explanation as cause not yet identified rather than guessing, and pairs it with a specific follow up question you could answer to resolve it. It will not fill the gap with a plausible sounding story about market conditions or demand shifts that you never actually confirmed.",
      },
      {
        question: "Does this skill decide which variances are big enough to matter?",
        answer:
          "Only with a stated or default rule. You can supply a materiality threshold as a percentage or dollar amount, and if you do not, the skill applies a modest five percent default and says so plainly, so trivial variances are not padded out with unnecessary narrative.",
      },
      {
        question: "How exactly is the variance percentage calculated?",
        answer:
          "The variance amount, actual minus budgeted, is divided by the budgeted amount and multiplied by 100, with the calculation shown next to the two source figures rather than presented as a bare result. This is the same arithmetic covered in the worked example file, applied to your own figures.",
      },
      {
        question: "Can I use this for revenue lines as well as expense lines?",
        answer:
          "Yes. The arithmetic is identical either way, actual minus budgeted, divided by budgeted. What changes is only which direction counts as favorable, since more revenue than planned is favorable while more expense than planned is not, and the skill states that direction explicitly for each line item.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, and none of the budget figures or context you eventually use the skill with is ever sent to this site, since that later usage never touches this site at all.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both SKILL.md and reference/worked-example.md are plain text files that open in any editor. What is previewed on this page is exactly what unpacks from the archive, so adjusting the materiality default or the table layout for your own team happens on your own machine.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "For pricing a proposed spend before it happens, the natural companion to explaining variance once actual spend is known.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description: "For writing the decision that follows a significant variance once its real cause is identified, not guessed.",
      },
      {
        href: "/tools/percentage-calculator",
        label: "percentage calculator",
        description: "For a quick one-off percent change calculation outside the full line item variance table this skill produces.",
      },
      {
        href: "/tools/roi-calculator",
        label: "roi calculator",
        description: "For checking whether a line item that ran over budget still produced a return that justified the extra spend.",
      },
    ],
    externalLinks: [
      {
        href: "https://corporatefinanceinstitute.com/resources/fpa/budget-variance/",
        label: "Corporate Finance Institute: Budget Variance",
        description: "An independent explainer of favorable and unfavorable budget variance, the same distinction this skill applies to each line item.",
      },
      {
        href: "https://www.accountingtools.com/articles/what-is-a-budget-variance.html",
        label: "AccountingTools: What Is a Budget Variance",
        description: "A reference definition of a budget variance as the gap between a baseline amount and the actual amount, the arithmetic this skill computes.",
      },
      {
        href: "https://www.wallstreetprep.com/knowledge/budget-actual-variance-analysis-fpa/",
        label: "Wall Street Prep: Budget to Actual Variance Analysis",
        description: "Covers comparing budgeted figures to actual results and interpreting the reasons for the gap, the same two step process this skill separates into arithmetic and explanation.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to variance arithmetic and explanation.",
      },
    ],
  },

  tags: ["business", "budget", "variance analysis", "finance", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
