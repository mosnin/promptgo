import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Survey Response Rate Context Check

Use this skill whenever you are handed a real respondent count and a real
total invited count for a survey, plus a write-up describing that survey's
results, and asked whether the write-up gives a reader enough context to
judge how representative those results actually are. This is a check on
context, not on wording and not on whether a comparison inside the results is
large enough to trust. A draft question's phrasing belongs to a different
job entirely, and so does a comparison between two segments of the responses.

## What you need before starting

Collect three things before running the check, and never proceed without the
first two:

1. The real number of people who responded.
2. The real total number of people invited or sampled, the denominator the
   response rate is calculated from.
3. Whatever real data the write-up supplies, if any, comparing respondents to
   non-respondents or to the full invited population on any measurable trait.

If the respondent count or the invited count is missing, ask for it. Do not
estimate either number from context, and do not accept a total quoted
elsewhere in a document as the invited count unless it is stated as such.

## Computing the response rate

Calculate the response rate yourself and show the arithmetic in your output,
not just the final percentage:

response rate = (number who responded / number invited) x 100

State the two real counts, the division, and the resulting percentage,
rounded to two decimal places. Never round the counts themselves before
dividing. Never produce a response rate for a survey where you were not given
both real numbers; a rate you calculated from an estimate is not a fact, and
presenting it as one is exactly the failure this skill exists to catch.

## The three context checks

Run every write-up against exactly three checks, in this order, and report
the result of each one by name:

1. **The rate is stated.** The write-up states the actual response rate as a
   percentage, not only a raw count of respondents. "500 people responded"
   with no rate and no invited count is a raw count, not a response rate, and
   fails this check regardless of how large the number sounds.
2. **The population is named.** The write-up states who the survey was sent
   to, in concrete terms (all customers who purchased in the last quarter,
   every employee at one office, a random sample of registered voters), not
   a vague phrase like "our users" with no further detail.
3. **Self-selection risk is addressed using real data, or its absence is
   named.** If the write-up claims the results are representative, it must
   be backed by real supplied data comparing respondents to non-respondents
   or to the full invited population on at least one measurable trait. If no
   such comparison data was supplied, the write-up must say plainly that
   self-selection risk is unknown, not silently omit the question.

## What counts as a flag

Flag a write-up when any of the following appear:

- A respondent count reported with no response rate and no invited count
  given anywhere nearby.
- A response rate reported with no statement of who the population was.
- The word "representative", or an equivalent claim of generalisability,
  used without real non-response comparison data cited alongside it.
- Any demographic or behavioural comparison between respondents and
  non-respondents that was not actually supplied to you. Never invent one to
  fill this gap, even to make a flag sound more complete.

## Output format

Report the computed response rate first, with the arithmetic shown. Then
report each of the three context checks by name, with a verdict (present or
missing) and the exact sentence from the write-up that satisfies or fails
it. Close with a one line summary: how many of the three checks the write-up
passed, and what the single most important addition would be to fix the
weakest one.

## What this skill does not do

It never estimates a response rate from a description, a percentage without
a count, or a comparable survey's typical figures. It never invents
demographic or behavioural data about respondents or non-respondents that
was not directly supplied. It does not evaluate whether survey question
wording is leading or loaded, and it does not judge whether a sample size is
large enough to support a statistical comparison inside the results; both are
separate checks with their own dedicated skills. This skill's whole job is
whether a write-up gives a reader the response rate, the population, and the
self-selection context needed to judge representativeness, using only real
numbers it was actually given.
`;

const WORKED_EXAMPLE_MD = `# Worked example: computing a response rate and flagging a write-up

Use this alongside \`SKILL.md\` as a template for how the arithmetic and the
three context checks should look in a finished output.

## Example 1: computing the rate

A clinic network runs a patient satisfaction survey. The real counts
supplied are:

- Invited: 4,200 patients who had an appointment in the last quarter.
- Responded: 588 patients completed the survey.

The arithmetic: 588 divided by 4,200 equals 0.14, multiplied by 100 equals
14.00 percent. The response rate is 14.00 percent, from 588 of 4,200 invited
patients. That is the only honest way to state this number: both real counts
shown, the division shown, and the result rounded to two decimal places.

## Example 2: a write-up that fails the first check

The draft write-up under review reads: "588 patients responded to our
satisfaction survey, giving us strong insight into how care is experienced
across the network."

Checked against the three context checks:

1. Rate stated: missing. The write-up reports the raw count of 588 but never
   states the response rate, so a reader cannot tell whether 588 came from an
   invited pool of 700 or 42,000, and those two situations mean very
   different things.
2. Population named: missing. "Across the network" is not a concrete
   description of who was invited; it does not say whether every patient
   with an appointment was invited, or only a subset.
3. Self-selection risk: unaddressed, and the write-up does not say so. It
   implies broad insight ("across the network") without any comparison data
   to support that reach.

The flag: this write-up reports a raw count as though it were a finding, with
no response rate and no named population, and it implies broad
representativeness with no data behind that implication. The fix is to add
the computed 14.00 percent rate, the concrete invited population (patients
with an appointment in the last quarter), and either real non-response
comparison data or an explicit statement that none exists.

## Example 3: a write-up that fails the representativeness check specifically

A separate write-up, for an employee engagement survey with 3,500 invited
and 910 responded (a computed rate of 26.00 percent, shown in the write-up
correctly), goes on to say: "At 26 percent, this is a strong response rate,
and the results are representative of the whole employee base."

Checked against the three context checks:

1. Rate stated: present. 26.00 percent is stated with both real counts shown.
2. Population named: present. The write-up states the population as all
   3,500 employees invited.
3. Self-selection risk: fails. The word "representative" is used, but no
   comparison data between respondents and the full invited population is
   cited anywhere in the write-up. A response rate being reasonably high does
   not by itself establish that the people who answered resemble the people
   who did not.

The flag here is narrow and specific: the rate and the population are both
handled correctly, so only the representativeness claim itself needs a fix,
either by adding the real comparison data if it exists or by softening the
claim to name the risk instead of asserting it away.

## Example 4: what a write-up that passes all three checks looks like

Using the same employee survey, suppose the requester actually supplies
tenure data for both groups: of the 910 respondents, 62 percent have five or
more years of tenure, against 34 percent of the full 3,500 invited
population. A write-up that states the rate, names the population, and adds
this real comparison passes all three checks: "26.00 percent of the 3,500
invited employees responded. Respondents skew toward longer tenure, 62
percent with five or more years against 34 percent of everyone invited, so
newer employees are underrepresented in these results." That sentence is the
target shape: a real rate, a named population, and a real, cited comparison
naming the specific direction of the self-selection risk rather than
asserting the results are simply representative.
`;

const meta: SkillMeta = {
  slug: "survey-response-rate-context-skill",
  name: "Survey Response Rate Context Check",
  title: "Survey Response Rate Context Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that computes a survey's real response rate with the arithmetic shown, then checks whether a write-up states the rate, names the population, and backs any representativeness claim with real non-response data.",

  seo: {
    primaryKeyword: "survey response rate context skill",
    keywords: [
      "survey response rate context skill",
      "free ai skill to check survey response rate",
      "downloadable response rate checklist",
      "ai skill to catch missing survey context",
      "how to report a survey response rate correctly",
    ],
    seoTitle: "Survey Response Rate Context Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable survey response rate context skill that computes the real rate and flags write-ups missing population or self-selection context.",
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
      "Models asked to summarise a survey reliably repeat whatever raw respondent count a write-up leads with and describe results as solid or representative without checking whether a response rate or an invited population was ever stated. This skill's fixed three check pass forces the actual arithmetic onto the page and requires a representativeness claim to be backed by real supplied comparison data rather than accepted on the strength of a confident-sounding sentence.",
  },

  article: {
    intro: [
      "A survey response rate context skill has one narrow job: given a survey's real respondent count and real total invited count, compute the actual response rate with the arithmetic shown, then check whether the accompanying write-up gives a reader enough context to judge representativeness. That context is three specific things, checked by name every time: the actual response rate stated as a percentage, the population the survey was drawn from, and whether respondents differ from non-respondents in any way the write-up has real data on.",
      "It ships as two plain text files: a main instructions file with the arithmetic and the three checks built in, and a downloadable response rate checklist that works the division and a write-up flagged for missing population context. Both are previewable in full on this page before you download the zip.",
      "The write-ups it is built to catch read like a headline on their own: five hundred people responded. This skill asks the questions that turn that raw count into an honest figure, out of how many, and whether who answered looks anything like who was asked.",
    ],
    sections: [
      {
        heading: "Why a raw respondent count is not a finding",
        body: [
          "A count on its own carries no information about how much of the invited population it represents. Five hundred responses out of six hundred invited is a very different survey from five hundred out of eighty thousand, and reporting only the five hundred lets a reader assume whichever version flatters the result.",
          "As an ai skill to catch missing survey context, this is the first thing it checks: a raw count reads as solid evidence by default, simply because it is a specific number, and the fix is the actual response rate, computed from both real counts and shown in the output rather than left to a reader's guess.",
        ],
      },
      {
        heading: "How the response rate is actually computed",
        body: [
          "The arithmetic is deliberately shown, not hidden behind a final percentage: the number who responded, divided by the number invited, multiplied by one hundred, rounded to two decimal places. Learning how to report a survey response rate correctly starts here, with both real counts left visible in the output alongside the result, so the calculation is checkable rather than asserted.",
          "This skill never estimates either number. If the invited count is missing, it asks for it rather than inferring one from a total mentioned elsewhere in the document, because a borrowed denominator produces a rate that looks precise and is not actually real.",
        ],
      },
      {
        heading: "The three context checks, run in a fixed order",
        body: [
          "Every write-up is checked against the same three named items, in the same order, so two different reviews using this skill produce comparable output rather than each inventing a personal sense of what counts as enough context.",
        ],
        list: [
          "The rate is stated, as a computed percentage, not only a raw respondent count.",
          "The population is named in concrete terms, not a vague phrase standing in for who was actually invited.",
          "Self-selection risk is addressed using real supplied data, or its absence is stated plainly rather than skipped.",
        ],
      },
      {
        heading: "What flags a representativeness claim, and why nothing gets invented",
        body: [
          "A write-up can pass the first two checks, a correct rate and a named population, and still fail the third by asserting the results are representative with nothing behind that word. Without a real comparison between respondents and non-respondents, the honest move is to name the risk rather than assert it away.",
          "The instructions explicitly forbid filling a missing comparison with an invented one, even a plausible sounding one. As a free ai skill to check survey response rate context, its value depends on only ever using numbers actually given, so a reader can trust that anything reported is real, not a guess dressed up to look complete.",
        ],
      },
      {
        heading: "How this differs from a sample size sanity check",
        body: [
          "A related skill on this site asks whether group sizes inside a comparison are large enough to trust, a check on statistical adequacy, never on this.",
          "This skill checks whether the write-up around the survey as a whole states the response rate, the population, and the self-selection context a reader needs before trusting any comparison drawn from it. Run this skill on the write-up first, the sample size check on any comparison it makes.",
        ],
      },
      {
        heading: "How this differs from a survey question bias audit",
        body: [
          "Another related skill audits draft survey question wording before sending, checking for leading phrasing, double-barreled construction, loaded language and unbalanced scale options, a pre-send check on how a question was asked.",
          "This skill runs at the other end, after a survey closes, checking how a write-up reports who answered and how many, never the wording of what was asked. A perfectly worded survey can still get reported with an unstated response rate.",
        ],
      },
    ],
    howTo: {
      name: "How to use the survey response rate context skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so the arithmetic and the three checks are visible up front.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real counts and the write-up",
          text: "Collect the real respondent count, the real total invited count, and the draft write-up describing the survey's results before handing anything to an assistant.",
        },
        {
          name: "Supply any real non-response comparison data you have",
          text: "If you have real data comparing respondents to non-respondents or to the full invited population on any trait, include it. Do not describe a comparison you have not actually measured.",
        },
        {
          name: "Run the check and fold the fixes back in",
          text: "Hand both files, the counts, and the write-up to your assistant, keeping the folder structure intact, then add the stated rate, named population and self-selection note the check calls for.",
        },
      ],
    },
    faq: [
      {
        question: "What real numbers does this skill need before it can run?",
        answer:
          "It needs the real number of people who responded and the real total number invited, the denominator the response rate is calculated from. Without both real counts, it asks for the missing one rather than estimating it, because a guessed denominator produces a rate that only looks precise.",
      },
      {
        question: "Will this skill estimate a response rate if I only have a rough idea of the invited count?",
        answer:
          "No. Its instructions forbid producing a response rate from an estimated count. If the exact invited count is not available, it states that a real rate cannot be computed and asks for the number rather than presenting a guess as a fact.",
      },
      {
        question: "What exactly counts as naming the population correctly?",
        answer:
          "A concrete description of who was actually invited, such as every customer who purchased last quarter or a random sample of registered voters in one region. A vague phrase like our users, with no further detail about who was actually sent the survey, fails this check.",
      },
      {
        question: "Does the skill ever invent demographic data to check self-selection risk?",
        answer:
          "No, and this is one of its strictest rules. If no real comparison data between respondents and non-respondents was supplied, it states plainly that self-selection risk is unknown rather than filling the gap with an invented demographic breakdown.",
      },
      {
        question: "How is this different from the sample size sanity check skill?",
        answer:
          "The sample size sanity check asks whether group sizes inside a specific comparison are large enough to trust the difference between them. This skill runs earlier, checking whether the write-up around the whole survey states the response rate, the population and the self-selection context a reader needs first.",
      },
      {
        question: "Can a write-up have a high response rate and still get flagged?",
        answer:
          "Yes. A high, correctly stated response rate satisfies only the first of the three checks. If the population is not named, or the write-up claims the results are representative without real non-response comparison data, it still gets flagged regardless of how strong the rate looks.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the counts or write-up you check with this survey response rate context skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-prompts/survey-analysis-prompt",
        label: "survey analysis prompt",
        description: "A fuller post-collection analysis of a survey's responses, distributions and open text, once the response rate context this skill checks is already in place.",
      },
      {
        href: "/skills/data-analysis-skills/sample-size-sanity-check-skill",
        label: "sample size sanity check skill",
        description: "For checking whether a specific comparison inside the results rests on groups large enough to trust, a different question from whether the write-up states response rate context.",
      },
      {
        href: "/skills/data-analysis-skills/survey-question-bias-audit-skill",
        label: "survey question bias audit skill",
        description: "A pre-send check on the wording of draft questions, the opposite end of the process from this skill's after-the-close check on how results get reported.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "A wider sceptical review to run once response rate context and comparison sizes have both cleared, for a finding that still needs alternative explanations listed.",
      },
    ],
    externalLinks: [
      {
        href: "https://aapor.org/standards-and-ethics/standard-definitions/",
        label: "AAPOR: Standard Definitions",
        description: "The survey research profession's own formulas for calculating response rates, the authoritative source behind the arithmetic this skill runs.",
      },
      {
        href: "https://www.pewresearch.org/methods/2019/02/27/response-rates-in-telephone-surveys-have-resumed-their-decline/",
        label: "Pew Research Center: response rates have resumed their decline",
        description: "Real published figures on how far typical response rates have fallen, useful context for judging any single survey's rate against a wider baseline.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Nonresponse_bias",
        label: "Wikipedia: Nonresponse bias",
        description: "A general reference on how and why the people who do not respond can differ from the people who do, the concept behind this skill's self-selection check.",
      },
      {
        href: "https://www.qualtrics.com/experience-management/research/tools-increase-response-rate/",
        label: "Qualtrics: tools to increase survey response rates",
        description: "A practitioner guide on response rate factors, useful background for judging what a stated rate does and does not already account for.",
      },
    ],
  },

  tags: ["surveys", "response rate", "research", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
