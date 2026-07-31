import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Cohort Comparison Fairness Check

Use this skill whenever you are handed a comparison between two real groups or cohorts,
for example users who joined through referral versus users who joined through ads, or
customers from one quarter versus customers from the next, and an outcome difference is
being attributed to whatever separates them. The skill's job is to check whether that
comparison is actually fair, working only from facts that were actually stated about
both groups.

## What this skill is and is not

This is a check for whether two groups being compared are actually comparable, not a
check for whether either group is large enough to trust a result from at all. Those are
two different questions asked in a different order: sample size asks whether the numbers
inside a group are big enough to mean anything, this skill asks whether the two groups
being placed side by side are even the right two groups to place side by side in the
first place. A comparison can rest on two enormous samples and still be unfair, and a
comparison can rest on two small samples and still be a fair one. Run this check before,
or alongside, any sample size review, not as a substitute for it.

## What you need before starting

Collect two things before applying the check:

1. The comparison, stated plainly, for example "users who joined through referral
   converted at eighteen percent versus users who joined through ads at eleven percent."
2. Every real, stated fact you were given about how the two groups differ, beyond the
   thing actually being compared. This includes the time period each group was captured
   in, the starting size of each cohort, the channel or source of each group, any
   promotion, price change, or outage that touched one group and not the other, and
   anything else explicitly described as different between them.

Do not invent a fact that was not given to you. If you were told nothing about how the
two groups differ beyond the label separating them, say plainly that no confound can be
checked because none was described, rather than guessing at one.

## Running the fairness check

Work through every real, stated fact that describes a difference between the two groups,
one at a time:

1. Quote the specific fact exactly as it was described to you.
2. State the plausible alternative explanation that fact creates for the outcome
   difference, independent of the thing actually being compared.
3. State whether that alternative explanation is serious enough to flag before anyone
   acts on the comparison, or minor enough to note without changing the conclusion.

A fact only counts if it was actually stated. Do not manufacture a hypothetical
difference, such as assuming one group is "probably more motivated," when nothing in
what you were given supports it. Never phrase an unstated possibility as though it were
a known fact about the groups.

## When a comparison is genuinely fair

If, after checking every real, stated fact, none of them plausibly explains the outcome
difference on its own, say so directly and confirm the comparison looks fair given what
was described. Do not manufacture a doubt to appear thorough. A clean confirmation, tied
to the specific facts that were checked and found not to matter, is exactly as much this
skill's job as a flag is.

## What this skill will not do

It will not invent a confound that was never described, and it will not claim a
comparison is unconditionally fair, since a difference that was never mentioned to you
cannot be ruled out. Every output states plainly that the check only covers confounds
actually described in what you were given, not every way the two groups could possibly
differ. When more facts about either group become available, the check should be run
again against the new information.
`;

const WORKED_EXAMPLE_MD = `# A worked example: the promotional period cohort

This file walks through one full pass of the fairness check on \`SKILL.md\`, using a
comparison built around a real, stated difference between the two groups, so the shape
of a flagged output is visible before you run the skill on your own comparison.

## The comparison as stated

"Cohort A, twelve hundred users who signed up in March, had a ninety day retention rate
of thirty one percent. Cohort B, nine hundred users who signed up in April, had a ninety
day retention rate of nineteen percent. Cohort B is being described as a weaker cohort."

## The real, stated facts about how the groups differ

Two facts were given alongside the comparison, beyond the retention numbers themselves:

- Cohort A signed up during a two week referral bonus promotion that ran through March,
  offering a discount to both the referrer and the new signup.
- Cohort B signed up in April, after the promotion had ended, through the site's normal
  signup flow.

## Applying the three steps to the promotion fact

1. **Quote the fact.** "Cohort A signed up during a two week referral bonus promotion
   that ran through March, offering a discount to both the referrer and the new signup."
2. **State the plausible alternative explanation.** A referral bonus tends to bring in
   users who arrive already vouched for by someone who has a stake in their success, and
   a discounted price at signup is itself associated with different early retention than
   a full price signup. Either factor could raise Cohort A's ninety day retention on its
   own, independent of any difference in the product experience the two cohorts actually
   received.
3. **State the severity.** This is serious enough to flag before anyone treats the
   twelve point retention gap as evidence that April's cohort is weaker. The promotion is
   a real, stated difference between the two groups that plausibly explains part or all
   of the gap by itself.

## The resulting fairness flag

"This comparison is not clearly fair as stated. Cohort A signed up during a referral
bonus promotion that Cohort B did not experience. Referral driven signups and discounted
signups are both independently associated with different retention than an ordinary full
price signup, so the ninety day retention gap between the two cohorts may reflect the
promotion rather than any real difference in cohort quality. A fairer comparison would
either exclude the promotional signups from Cohort A or compare April's cohort against a
different March cohort that did not run through the promotion."

## What the flag does not claim

The flag does not assert that the promotion explains the entire twelve point gap, only
that it is a plausible alternative explanation that has not been ruled out. It also does
not invent any further difference between the cohorts, such as guessing at a difference
in marketing spend or seasonality, because nothing else was stated about how the two
groups differ. If more facts about either cohort become available, the check should be
run again against the new information before the flag is treated as final.

## A second pass where the comparison holds up

If the same two retention numbers had been given with a different accompanying fact,
for example that both cohorts signed up through the same normal flow in consecutive
months with no promotion, price change, or channel difference mentioned for either one,
the check would end differently: no real, stated fact would plausibly explain the gap on
its own, and the output would confirm the comparison looks fair given what was described,
while still noting that only the facts actually supplied were checked.
`;

const meta: SkillMeta = {
  slug: "cohort-comparison-fairness-check-skill",
  name: "Cohort Comparison Fairness Check",
  title: "Cohort Comparison Fairness Check Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks whether two real cohorts being compared actually differ in some stated, plausible way beyond the thing being measured, quoting the specific fact and the alternative explanation it creates.",

  seo: {
    primaryKeyword: "cohort comparison fairness check skill",
    keywords: [
      "cohort comparison fairness check skill",
      "free ai skill to check cohort comparisons",
      "downloadable comparability checklist for cohorts",
      "ai skill to spot confounding differences between groups",
      "fair comparison checklist for two cohorts",
    ],
    seoTitle: "Cohort Comparison Fairness Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable cohort comparison fairness check skill that flags a real, stated difference between two cohorts before their outcomes get compared.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to compare two groups' outcomes routinely name a winner from the raw numbers alone, without checking whether a real, already stated difference between the groups, such as a time period, a promotion, or a starting cohort size, could explain the gap on its own. This skill forces every stated fact about how the groups differ onto the page before a verdict is given, and requires an honest confirmation when no described difference plausibly explains the result, rather than manufacturing doubt to look thorough.",
  },

  article: {
    intro: [
      "A cohort comparison fairness check skill has one job: look at the real, stated facts about two groups being compared and say whether something other than the thing actually being measured could plausibly explain the difference in their outcomes. It does not guess at hidden confounds nobody mentioned, and it does not wave a comparison through as fair just because nothing looked obviously wrong at a glance.",
      "It ships as two plain text files: a main instructions file with the three step check built in, and a worked reference example showing a full pass against a real, stated difference between two cohorts. Both are previewable in full on this page before you download the zip, and both are exactly what an AI assistant receives once the archive is handed over.",
      "The comparisons it is built for read like an ordinary analytics finding: cohort A retained better than cohort B. Before that finding goes into a slide as evidence about the cohort itself, this skill checks whether the two groups behind it were actually alike in every other way that was described.",
    ],
    sections: [
      {
        heading: "What a cohort comparison fairness check skill actually checks",
        body: [
          "Handed two outcome numbers and the label separating the groups that produced them, a language model will readily attribute the gap to that label, since that is the story the comparison was framed around. It rarely stops to ask whether the two groups were captured under the same conditions in every other respect.",
          "This skill exists to interrupt that default, working as a free ai skill to check cohort comparisons before a gap is treated as evidence about the thing being measured. Every real, stated fact about how the two groups differ has to be listed and checked, so a plausible alternative explanation gets named directly.",
        ],
      },
      {
        heading: "The core discipline: real facts only, not invented confounds",
        body: [
          "Every flag this skill produces has to trace to a fact that was actually stated about one of the two groups, quoted directly. It is not permitted to manufacture a hypothetical difference, such as assuming one group was probably more motivated, when nothing in the comparison as described supports that claim.",
          "This is what separates a useful check from manufactured suspicion. A downloadable comparability checklist for cohorts, acting as an ai skill to spot confounding differences between groups, is only trustworthy if every flag traces back to something real, and this skill's instructions forbid phrasing an unstated possibility as a known fact.",
        ],
      },
      {
        heading: "A worked example: the promotional period cohort",
        body: [
          "The reference file walks through a full pass on a stated comparison: a cohort captured during a two week referral bonus promotion retained better than a cohort captured the following month with no promotion running. The promotion is quoted directly, and the plausible alternative explanation, that a discounted, referral driven signup is independently associated with different retention, is stated alongside it.",
          "That worked pass ends with a named, specific flag: the retention gap may reflect the promotion rather than any real difference in cohort quality, and a fairer comparison would exclude the promotional signups or compare against a cohort that did not run through it. The reference file also shows the same numbers with no promotion mentioned, where the check ends in a confirmation instead.",
        ],
      },
      {
        heading: "When a comparison is genuinely fair",
        body: [
          "Not every comparison run through this check comes back flagged, and the instructions are explicit that hunting for a problem that is not there defeats the purpose of a fair comparison checklist for two cohorts. If every real, stated fact about the two groups has been checked and none plausibly explains the outcome difference, the skill states that and confirms the comparison looks fair given what was described.",
          "That confirmation is worth as much as a flag. A reader who sees only flags learns to distrust the tool entirely; one that also delivers a clean confirmation, tied to the specific facts it checked, is worth actually consulting before a finding ships.",
        ],
      },
      {
        heading: "How this differs from the sample size sanity check skill",
        body: [
          "This site's sample size sanity check skill asks a narrower, earlier question: are the groups even large enough for a gap between them to mean anything. This skill asks a different question alongside it: are the two groups actually the right two to compare, given what is known about how they differ.",
          "A comparison can pass the sample size bands with thousands of observations in each group and still fail a cohort comparison fairness check skill review, if one group was captured during a promotion, an outage, or some other stated event the other group never experienced. Run both checks; neither substitutes for the other.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not invent a confound that nobody described, and it will not certify a comparison as unconditionally fair, since a difference never mentioned cannot be ruled out from the outside. Every output states plainly that it can only flag confounds actually described, not every possible way the two groups could differ.",
        ],
      },
    ],
    howTo: {
      name: "How to use the cohort comparison fairness check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so the three step check and a full worked pass are visible up front.",
        },
        {
          name: "State the comparison and every real fact known",
          text: "Write the comparison plainly, then list every stated fact about how the two groups differ beyond the thing being measured: time period, cohort size, channel, or any event that touched one group and not the other.",
        },
        {
          name: "Run the fairness check against the stated facts",
          text: "Hand both files and your comparison to an assistant, keeping the folder structure intact so the main file can point to the worked example, and have it quote each real fact and its plausible alternative explanation.",
        },
        {
          name: "Route the result onward",
          text: "Treat a flagged fact as a reason to adjust or re-run the comparison before it ships, and treat a clean confirmation as grounds to proceed, citing the specific facts that were checked either way.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill check whether the sample sizes are big enough?",
        answer:
          "No, that is a separate, earlier question this site's sample size sanity check skill answers. This skill assumes a sample size question has been or will be handled elsewhere and asks a different one: whether the two specific groups being compared are actually comparable, given what is known about how they differ.",
      },
      {
        question: "What counts as a real fact this skill can flag?",
        answer:
          "Only something actually stated about one or both groups, such as a time period, a promotion, a starting cohort size, or a known event that touched one group and not the other. The skill's instructions explicitly forbid manufacturing a hypothetical difference that was never described, even when one feels plausible.",
      },
      {
        question: "Will the skill always find something wrong with a comparison?",
        answer:
          "No. When every real, stated fact about the two groups has been checked and none of them plausibly explains the outcome difference on its own, the skill confirms the comparison looks fair given what was described, rather than manufacturing a doubt to appear more thorough than the facts support.",
      },
      {
        question: "Can the skill catch a confound nobody mentioned?",
        answer:
          "No, and its output says so directly. The check only covers confounds actually described in what it was given, never every way the two groups could possibly differ, since a fact that was never supplied cannot honestly be checked from the outside.",
      },
      {
        question: "How is this different from the cohort analysis prompt on this site?",
        answer:
          "The cohort analysis prompt runs a full breakdown of a cohort's behaviour over time, covering trends, drop off points and segment differences within the data supplied. This skill does one narrower thing before or alongside that work: checking whether two specific cohorts being placed side by side are actually a fair comparison in the first place.",
      },
      {
        question: "What should happen after a comparison gets flagged?",
        answer:
          "Treat the flag as a reason to adjust the comparison, not a verdict to argue with. Exclude the affected portion of the group if possible, find a cohort that did not experience the same stated difference, or state the confound explicitly alongside the finding so anyone reading it can judge how much weight the result deserves.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-skills/sample-size-sanity-check-skill",
        label: "sample size sanity check skill",
        description: "A different, earlier question: whether the groups in a comparison are large enough to trust at all, independent of whether they are the right two groups to compare.",
      },
      {
        href: "/data-analysis-prompts/cohort-analysis-prompt",
        label: "cohort analysis prompt",
        description: "For a full breakdown of a single cohort's behaviour over time, a natural next step once a cohort comparison has passed this fairness check.",
      },
      {
        href: "/data-analysis-prompts/ab-test-analysis-prompt",
        label: "ab test analysis prompt",
        description: "For reviewing whether an experiment's two arms were run correctly, a related but distinct question from whether two already existing cohorts are comparable.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "The fuller sceptical review to run once a comparison has cleared this skill's fairness check and needs a documented verdict.",
      },
    ],
    externalLinks: [
      {
        href: "https://catalogofbias.org/biases/confounding/",
        label: "Catalogue of Bias: Confounding",
        description: "An independent reference on how confounding distorts a comparison between groups that were never randomised to be equivalent.",
      },
      {
        href: "https://en.wikipedia.org/wiki/Confounding",
        label: "Wikipedia: Confounding",
        description: "Background on confounding variables with worked examples of a third factor explaining an apparent difference between two groups.",
      },
      {
        href: "https://www.ncbi.nlm.nih.gov/books/NBK574513/",
        label: "NCBI Bookshelf: Study Bias",
        description: "A peer reviewed reference covering selection bias and channeling bias, two of the mechanisms that make two groups less comparable than they first appear.",
      },
    ],
  },

  tags: ["data analysis", "cohort comparison", "confounding", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
