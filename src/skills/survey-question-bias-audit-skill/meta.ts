import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Survey Question Bias Audit

Use this skill when you are handed a draft set of research survey questions,
the ones about to go out to respondents, and asked to check them for bias
before they are sent. This is a pre-send check on wording. It does not
analyse answers that have already come back; a completed survey's responses,
codebook or response rate belong to a different job entirely.

## The fixed checklist

Every question gets checked against exactly four bias patterns, in this
order. Do not invent a fifth pattern and do not flag a question for a reason
outside these four:

1. Leading phrasing: wording that suggests the answer the researcher wants,
   through an assumed premise or a framing like "don't you agree" that
   invites agreement over information.
2. Double-barreled: the question asks about two separate things at once but
   allows only one answer, so the response cannot be attributed to either
   half.
3. Loaded language: emotionally charged or value laden wording that colours
   the topic before the respondent has answered anything.
4. Unbalanced scale options: a rating scale whose positive and negative
   options are not symmetrical, so the scale itself tilts the result before a
   respondent picks a point on it.

Full definitions, plus a biased and neutral pair for every pattern, are in
\`reference/bias-pattern-checklist.md\`. Read that file before starting an
audit; do not rely on memory of what each pattern means.

## Running an audit

Work through the draft question by question, in the order given. For every
question:

1. Quote the exact question text as written, not a paraphrase.
2. Check it against all four patterns in the checklist, not just the first
   one that seems to fit.
3. If a pattern applies, name it by its exact checklist name and quote the
   specific words in the question that trigger it.
4. Write a specific neutral rephrase that removes the problem while keeping
   the same topic. Never leave a flagged question without a rewrite attached.
5. If no pattern applies, say so explicitly: state that the question is well
   constructed and name which patterns were checked and cleared, rather than
   moving on in silence.

A flag that only says a question seems biased, with no named pattern and no
quoted trigger words, is not a completed audit. Redo it before reporting the
result.

## Confirming a well-built question

A question that passes is not a question you skipped; it is a question you
checked against all four patterns and found clean. Report it in the same
format as a flag: quote the question, then state that leading phrasing,
double-barreled construction, loaded language and unbalanced scale options
were all checked and none apply. A clean bill of health is only credible when
it is visibly the product of the same checklist as every flag, not an
absence of comment.

## Output format

Report one entry per question, numbered to match the draft's own numbering.
Each entry states the exact question text, a verdict (clean, or the name of
every pattern that applies), the exact trigger words for anything flagged,
and a neutral rewrite for anything flagged. Close with a one line count: how
many questions were clean, and how many carried each named pattern.

## What this skill does not do

It does not analyse responses that have already been collected. It does not
decide which questions belong in a survey, does not reorder them, and does
not judge sampling or fieldwork. It does not comment on question type
(multiple choice versus open text) except where a scale's own options are
unbalanced. Its whole job is the wording of each question, checked before
anyone sees it, against the four named patterns and nothing else.
`;

const BIAS_CHECKLIST_MD = `# Bias pattern checklist: four patterns, worked examples

Use this alongside \`SKILL.md\` when auditing a draft set of survey questions.
Each pattern below is named exactly as it should appear in an audit output,
followed by a plain definition, then at least one biased and neutral pair so
the difference is visible rather than described in the abstract.

## 1. Leading phrasing

Definition: the wording suggests the answer the researcher wants, through an
assumed premise, a value judgement, or a framing that invites agreement
rather than information.

Biased: "Don't you think our new checkout process is much faster than
before?"
Why it leads: it assumes the process is faster and asks only for agreement.
Neutral: "How would you rate the speed of the checkout process, compared
with before?"

Biased: "How much do you love the new dashboard design?"
Why it leads: it assumes a positive reaction before the respondent has said
anything.
Neutral: "What is your reaction to the new dashboard design?"

## 2. Double-barreled questions

Definition: the question asks about two separate things at once but allows
only one answer, so the response cannot be attributed to either half.

Biased: "Was the product fast and easy to use?"
Why it fails: speed and ease of use are two different attributes, and a
respondent who found it fast but hard to use has no way to answer
accurately.
Neutral, split into two: "How would you rate the product's speed?" and "How
would you rate how easy the product was to use?"

Biased: "How satisfied are you with the price and the quality of the
service?"
Why it fails: price satisfaction and quality satisfaction can point in
opposite directions for the same respondent.
Neutral, split into two: "How satisfied are you with the price of the
service?" and "How satisfied are you with the quality of the service?"

## 3. Loaded language

Definition: emotionally charged or value laden wording that colours the
topic before the respondent answers, independent of whether the question
also leads toward a specific answer.

Biased: "How concerned are you about the wasteful spending in the current
budget proposal?"
Why it is loaded: "wasteful" passes judgement on the spending before asking
the respondent's own view.
Neutral: "How concerned are you about the spending in the current budget
proposal?"

Biased: "How much does the outdated interface frustrate you?"
Why it is loaded: "outdated" and "frustrate" both build in a negative
judgement the respondent has not yet given.
Neutral: "What is your reaction to the current interface?"

## 4. Unbalanced scale options

Definition: a rating scale whose positive and negative options are not
symmetrical, so the scale itself tilts the result before a respondent picks
a point on it.

Biased scale: Excellent, Very good, Good, Fair. Four points run from positive
to mildly positive, one point is mildly negative, and no option is clearly
negative.
Why it is unbalanced: a respondent who feels genuinely negative has nowhere
accurate to land, so their answer gets pulled toward the least positive
option available rather than reflecting their actual view.
Neutral scale: Excellent, Good, Fair, Poor, Very poor. Two positive points,
one neutral, two negative, symmetrical around the midpoint.

Biased scale: Strongly agree, Agree, Somewhat agree, Disagree.
Why it is unbalanced: three points of agreement sit against one point of
disagreement, with no neutral option and no strongly disagree to match
strongly agree.
Neutral scale: Strongly agree, Agree, Neither agree nor disagree, Disagree,
Strongly disagree.

## How to use this file during an audit

For every question in the draft, check it against all four patterns above in
order, not just the first one that seems to apply. A single question can
carry more than one pattern at once, for example a double-barreled question
that is also loaded, such as "Was the product fast and pleasant to use,
unlike the clunky old version?" Name every pattern that applies, not just the
first one found, and write one neutral rewrite that clears all of them
together rather than a separate rewrite per pattern.
`;

const meta: SkillMeta = {
  slug: "survey-question-bias-audit-skill",
  name: "Survey Question Bias Audit",
  title: "Survey Question Bias Audit Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks a draft set of research survey questions against four named bias patterns before they are sent, quoting the exact trigger words and a neutral rewrite for every flag.",

  seo: {
    primaryKeyword: "survey question bias audit skill",
    keywords: [
      "survey question bias audit skill",
      "free ai skill to check survey questions for bias",
      "downloadable survey bias checklist",
      "ai skill to catch leading survey questions",
      "how to check survey questions before sending",
    ],
    seoTitle: "Survey Question Bias Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable survey question bias audit skill that flags leading phrasing, double-barreled questions, loaded language and unbalanced scales.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/bias-pattern-checklist.md", content: BIAS_CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to review a draft set of survey questions for problems reliably catch an openly leading question but routinely miss a double-barreled question or an unbalanced rating scale, because those two patterns require checking wording against a specific named definition rather than a general impression of tone. This skill's fixed four pattern checklist forces every question through the same named checks in the same order, and requires a quoted rewrite for anything flagged rather than a vague note that a question seems biased.",
  },

  article: {
    intro: [
      "A survey question bias audit skill has one job: read a draft set of research survey questions before they are sent, and check each one against a fixed list of known bias patterns, not a general sense that something feels off. Given a set of draft questions, it flags leading phrasing, double-barreled questions, loaded language and unbalanced scale options, and for every flag it quotes the exact question text, names the specific pattern, and writes a neutral rewrite that keeps the same topic. A flag that only says a question seems biased is not an audit; every judgement has to trace to a named pattern and the actual words that triggered it.",
      "It ships as two plain text files: a main instructions file and a downloadable survey bias checklist naming all four patterns, each with a biased and neutral example pair. Both are previewable in full on this page before you download the .zip.",
      "The skill also confirms a question that has already been checked and found clean, since hunting only for problems misses the equally useful job of telling a researcher which questions are safe to send as written. A clean verdict is reported in the same format as a flag: the question quoted, and a statement that all four patterns were checked and none applied.",
    ],
    sections: [
      {
        heading: "What a pre-send bias audit actually checks",
        body: [
          "This skill's scope is narrow on purpose. It does not judge sample size, question order, mode of delivery, or whether a research plan is well designed overall; those are separate concerns with their own checks. It reads the wording of each question as written and asks whether that wording, on its own, would tilt a respondent's answer before they have said anything.",
          "That narrowness is what makes it a free ai skill to check survey questions for bias rather than a general purpose research reviewer, one wording gate a team can run right before fielding.",
        ],
      },
      {
        heading: "The four bias patterns, checked in a fixed order",
        body: [
          "Every audit runs the same four named checks against every question, in the same order, so two different reviewers using this skill produce comparable output rather than each inventing their own sense of what counts as biased.",
        ],
        list: [
          "Leading phrasing: wording that supplies the answer the researcher wants.",
          "Double-barreled: two separate questions compressed into one, with room for only one answer.",
          "Loaded language: emotionally charged or value laden wording that colours the topic.",
          "Unbalanced scale options: a rating scale whose positive and negative points are not symmetrical.",
        ],
      },
      {
        heading: "A worked example: leading phrasing",
        body: [
          "Take the question \"Don't you think our new checkout process is much faster than before?\" It assumes the process is faster and asks only for agreement, which is exactly what leading phrasing means in practice. The neutral rewrite keeps the same topic while removing the assumption: \"How would you rate the speed of the checkout process, compared with before?\"",
          "As an ai skill to catch leading survey questions, its first and most common flag is exactly this pattern, because leading phrasing is the one researchers reach for without noticing, especially when they already believe they know what the result will be.",
        ],
      },
      {
        heading: "Two more worked examples: double-barreled and unbalanced scales",
        body: [
          "\"Was the product fast and easy to use?\" is double-barreled: speed and ease of use are different attributes, and a respondent who found it fast but hard to use has no accurate way to answer. The fix splits it into two separate questions, one per attribute, rather than trying to rescue the single sentence.",
          "A rating scale of Excellent, Very good, Good, Fair is unbalanced: four points run from positive to mildly positive, and no option is clearly negative, so a genuinely dissatisfied respondent has nowhere accurate to land. The neutral fix is a symmetrical scale, such as Excellent, Good, Fair, Poor, Very poor, with equal room on both sides of the midpoint.",
        ],
      },
      {
        heading: "Confirming a question that is already well built",
        body: [
          "A checklist that only reports problems trains its users to stop trusting anything it does not comment on, since silence could mean clean or could mean skipped. This skill treats a clean verdict as an equally real output: the question is quoted, and the report states plainly that all four patterns were checked and none applied.",
          "That distinction matters most on a long draft, where a researcher needs to know which questions can ship unchanged, rather than scrolling past unflagged items and hoping they were reviewed.",
        ],
      },
      {
        heading: "How this differs from analysing results once a survey closes",
        body: [
          "A separate prompt on this site, built for survey analysis, reads responses that have already come back: it reports the completion rate, codes open text answers, and refuses to cut segments the sample cannot support. That is a post-collection job, working entirely from what respondents actually said.",
          "This skill runs before any of that exists. Its input is a draft question, never a response, and its output is a verdict on the wording itself. Anyone working out how to check survey questions before sending should start here, and move to the results-side analysis only once the survey has actually closed.",
        ],
      },
    ],
    howTo: {
      name: "How to use the survey question bias audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/bias-pattern-checklist.md directly on this page before downloading, so the four named patterns and their example pairs are visible up front.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the draft questions",
          text: "Collect the exact wording of every question about to be fielded, numbered in the order respondents will see them, before handing anything to an assistant.",
        },
        {
          name: "Run the audit and apply the rewrites",
          text: "Hand both files and the draft to your assistant, keeping the folder structure intact, then fold each neutral rewrite back into the version that actually gets sent.",
        },
      ],
    },
    faq: [
      {
        question: "How is the survey question bias audit skill different from analysing completed survey results?",
        answer:
          "This skill only ever reads draft question wording before a survey is fielded, and its output is a verdict on that wording. Analysing completed results is a separate, later job on this site that works from actual responses, reporting a completion rate and coding open text, and it never touches question wording before the fact.",
      },
      {
        question: "What exactly counts as a leading question versus a genuinely neutral one?",
        answer:
          "A leading question already contains an assumed premise or a value judgement, such as assuming a process is faster or a design is loved before the respondent has said anything. A neutral question states the topic plainly and leaves room for an answer that could go either direction, which is the test applied to every flagged question here.",
      },
      {
        question: "Can one question be flagged for more than one bias pattern at once?",
        answer:
          "Yes, and the audit is written to catch that rather than stop at the first match. A double-barreled question can also be loaded, for example one that compresses two attributes into a single sentence while using charged wording about one of them, and every applicable pattern must be named, not just the first one found.",
      },
      {
        question: "What happens if a question is already well written?",
        answer:
          "It gets reported as clean in the same format as a flagged question: quoted in full, with a statement that all four patterns were checked and none applied. The skill treats confirming a good question as a real output worth reporting, not a case to skip past silently while it hunts for problems elsewhere.",
      },
      {
        question: "Does this skill fix double-barreled questions by rewriting them as two?",
        answer:
          "Yes. A double-barreled question compresses two separate attributes into one sentence with room for only one answer, so the honest fix is splitting it into two questions rather than trying to preserve the original single-question format. The rewrite keeps both original topics, just asked separately.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the draft questions you eventually check with this skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description: "For reading responses once a survey has closed, the post-collection job this skill's pre-send wording check is deliberately separate from.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "A fuller sceptical review to run once a survey's results are in and a comparison from them needs alternative explanations listed.",
      },
      {
        href: "/skills/data-analysis-skills/sample-size-sanity-check-skill",
        label: "sample size sanity check skill",
        description: "Another pre-trust check for research data, this one on the group sizes behind a comparison rather than the wording of a question.",
      },
      {
        href: "/skills/sales-skills/discovery-question-bank-skill",
        label: "discovery question bank skill",
        description: "Applies a similar lead-detection discipline to sales discovery questions, a different question set entirely from a research survey.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.pewresearch.org/our-methods/u-s-surveys/writing-survey-questions/",
        label: "Pew Research Center: Writing Survey Questions",
        description: "A primary methodology reference on double-barreled questions and loaded wording, from a research organisation that publishes its own question design standards.",
      },
      {
        href: "https://www.surveymonkey.com/mp/writing-survey-questions/",
        label: "SurveyMonkey: Writing Survey Questions",
        description: "A practitioner guide covering leading questions, double-barreled questions and balanced answer options, the same four-pattern territory this skill's checklist audits against.",
      },
      {
        href: "https://www.qualtrics.com/articles/strategy-research/double-barreled-question/",
        label: "Qualtrics: The Double-Barreled Question",
        description: "A worked explainer of double-barreled questions with examples and fixes, useful independent backing for this skill's split-into-two rewrite pattern.",
      },
      {
        href: "https://aapor.org/standards-and-ethics/best-practices/",
        label: "AAPOR: Best Practices for Survey Research",
        description: "The field's professional association on keeping question wording free of bias and pretesting a questionnaire before it is fielded.",
      },
    ],
  },

  tags: ["survey design", "research", "question wording", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
