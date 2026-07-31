import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Correlation Causation Claim Audit

Use this skill whenever you are handed a written analysis that contains a claim that one
thing caused another, for example "the new onboarding flow increased retention by 12
percent," together with the real evidence actually supplied to support that claim. The
skill's job is to check whether the evidence supplied is only correlational or genuinely
supports causation, working only from what was actually given, never from what evidence
might plausibly exist.

## What this skill is and is not

This is a check on the relationship between a causal claim's language and the evidence
type actually supplied for it. It is not a check on whether two groups being compared are
a fair comparison, and it is not a check on whether a sample is large enough to trust.
Those are two different, related skills on this site. The cohort comparison fairness
check skill asks whether two groups placed side by side actually differ in some other
stated way that could explain an outcome gap on its own; this skill asks a different
question that can be run even when only one group is involved, over time: does the
evidence supplied for a stated cause and effect claim rise to the level the claim's own
language asserts. The sample size sanity check skill asks a third, narrower question,
whether the numbers involved are big enough to trust at all. A claim can pass a fairness
check and a sample size check and still fail this audit, because this audit is about
whether "caused," "increased," "drove," or "led to" is the right verb for the evidence on
the page, not about whether the groups or the numbers behind that evidence are sound.

## What you need before starting

Collect two things directly from the analysis you were given, and nothing else:

1. The causal claim, quoted exactly as written, including the specific causal verb used
   ("caused," "increased," "drove," "led to," "resulted in," "boosted").
2. The real evidence actually supplied to support that claim, quoted exactly as written.
   This might be a before and after number, a chart description, a stated experiment
   design, or a single sentence asserting the result with no method described at all.

Do not infer or assume a stronger form of evidence than what was actually written. If an
analysis claims a causal result and describes no method at all, that absence is itself
the finding, not a gap to fill in with an assumed randomized test.

## Classifying the evidence actually supplied

Work from the quoted evidence only, and sort it into one of two buckets:

**Correlational evidence** covers any of the following, and only these:

- Two measures that moved together or moved in the same direction, with no random
  assignment and no separate control group mentioned.
- A before and after comparison of a single group, with nothing else described as held
  constant or compared against during the same period.
- A stated association, trend, or pattern with no described method for ruling out other
  explanations for it.

**Causation supporting evidence** covers only:

- A real controlled experiment or randomized test, where units were actually assigned at
  random to a treatment and a control condition and the described result compares the two
  arms.
- A real argument that explicitly names and rules out specific plausible alternative
  explanations for the outcome, not merely a claim that no alternative explanation exists.

If the evidence supplied does not clearly describe either random assignment or a real
ruling out argument, treat it as correlational. Never upgrade weak evidence to the
causation supporting bucket because the surrounding prose sounds confident.

## Running the audit

For every causal claim found, in order:

1. Quote the causal claim exactly, including its causal verb.
2. Quote the real evidence supplied for it exactly.
3. Classify that evidence as correlational or causation supporting, using only the
   definitions above and citing which specific feature of the quoted evidence drove the
   classification.
4. If the claim uses causal language and the evidence is correlational, flag it as
   OVERREACHING. State exactly why in one sentence, then supply an accurate correlational
   rephrasing that keeps the real numbers but drops the causal verb, for example
   replacing "increased retention by 12 percent" with "retention rose by 12 percentage
   points after the change, alongside the change, with no control group measured."
5. If the evidence is genuinely causation supporting, say so directly and do not flag the
   claim. State which specific feature of the evidence, the random assignment or the
   ruled out alternative, earns that conclusion.

## What this skill will not do

It will not assume that a randomized test, a control group, or a ruled out alternative
"probably" exists behind a claim just because the surrounding analysis reads as
professional or confident. It checks only the real evidence quoted in front of it. It will
not perform a cohort comparison fairness check (whether two groups differ in some other
stated way) or a sample size check (whether a group is numerically large enough); both are
separate skills on this site and should be run alongside this one, not instead of it, when
a comparison is also present. It will not soften a genuinely overreaching claim into a
polite suggestion; the flag states OVERREACHING plainly and supplies the corrected wording
directly.
`;

const WORKED_EXAMPLES_MD = `# Two worked examples: one flagged, one not

This file walks through the audit on \`SKILL.md\` twice, once against a claim backed only
by correlational evidence and once against a claim backed by a genuine controlled
experiment, so the shape of both outcomes is visible before you run the skill on your own
analysis.

## Example one: the onboarding flow claim

### The claim as written

"We redesigned the onboarding flow in March. The new onboarding flow increased retention
by 12 percent."

### The real evidence supplied

"Thirty day retention was 41 percent for the six weeks before the redesign shipped. In the
six weeks after it shipped, thirty day retention was 46 percent. No other product changes
were made during either window."

### Step 1: quote the claim

"The new onboarding flow increased retention by 12 percent." The causal verb is
"increased."

### Step 2: quote the evidence

"Thirty day retention was 41 percent for the six weeks before the redesign shipped. In the
six weeks after it shipped, thirty day retention was 46 percent." (A relative rise from 41
to 46 is roughly a 12 percent increase, which is where the claim's figure comes from.)

### Step 3: classify the evidence

This is a before and after comparison of a single group across two time windows, with no
random assignment described and no separate control group measured during the same
period. Under the definitions in SKILL.md, that makes it correlational evidence: retention
and the redesign moved together in time, but nothing in what was supplied rules out
everything else that changed between the two six week windows, seasonality, marketing
spend, or the user mix among them.

### Step 4: the flag

OVERREACHING. The claim uses the causal verb "increased," which asserts the redesign
produced the retention change, but the only evidence supplied is a before and after
comparison with no control group and no random assignment. A more accurate phrasing that
keeps the real numbers: "Thirty day retention rose from 41 percent to 46 percent in the
six weeks after the onboarding redesign shipped, alongside the change, with no control
group measured during either window."

## Example two: the pricing page experiment claim

### The claim as written

"The new pricing page copy caused an 8 percent increase in checkout completion."

### The real evidence supplied

"Visitors were randomly assigned on arrival to see either the original pricing page or the
new copy, split evenly, for four weeks. The original page completed checkout at 22
percent. The new copy completed checkout at 23.8 percent, a relative increase of about 8
percent."

### Steps 1 and 2: quote the claim and the evidence

Claim: "The new pricing page copy caused an 8 percent increase in checkout completion."
Causal verb: "caused." Evidence: "Visitors were randomly assigned on arrival to see either
the original pricing page or the new copy, split evenly, for four weeks."

### Step 3: classify the evidence

Visitors were randomly assigned to one of two arms and the described result compares those
two arms directly during the same period. That is a real controlled experiment with random
assignment, which is causation supporting evidence under the definitions in SKILL.md.

### Step 4: the result

Not flagged. The claim's causal verb "caused" is supported by the evidence supplied: real
random assignment to a treatment and control condition, compared over the same four week
window. The specific feature earning this conclusion is the random assignment itself,
which is what distinguishes this claim from the onboarding example above, where retention
before and after was compared with no control group at all.

## What these two examples do not do

Neither pass invents evidence that was not supplied. The first example does not assume a
control group existed just because the analysis sounds thorough; the second does not
demand a stronger experiment design than was actually described. Both classifications
trace directly to a quoted, specific feature of the evidence given, exactly as SKILL.md
requires.
`;

const meta: SkillMeta = {
  slug: "correlation-causation-claim-audit-skill",
  name: "Correlation Causation Claim Audit",
  title: "Correlation Causation Claim Audit Skill",
  category: "data-analysis-skills",
  summary:
    "A downloadable instruction pack that checks a written causal claim against the real evidence supplied for it, flagging causal language backed only by correlational evidence as overreaching and suggesting accurate correlational phrasing instead.",

  seo: {
    primaryKeyword: "correlation causation claim audit skill",
    keywords: [
      "correlation causation claim audit skill",
      "free ai skill to check causal claims",
      "downloadable correlation vs causation checklist",
      "ai skill to audit causal language in analysis",
      "correlation causation checker for data claims",
    ],
    seoTitle: "Correlation Causation Claim Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable correlation causation claim audit skill that checks a causal claim against the real evidence supplied and flags overreach.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-examples.md", content: WORKED_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a written analysis routinely accept a causal verb such as increased, drove, or caused at face value whenever the surrounding numbers look reasonable, without checking whether the evidence actually supplied is a before and after comparison rather than a controlled test. This skill forces the causal claim and the real evidence supplied to be quoted side by side before any verdict is given, and requires the corrected, accurate correlational phrasing whenever causal language outruns what the evidence supports.",
  },

  article: {
    intro: [
      "A correlation causation claim audit skill has one narrow job: read a causal claim exactly as written, read the real evidence actually supplied for it, and say whether that evidence earns the causal verb the claim uses. It does not assume a randomized test or a control group exists just because an analysis sounds confident, and it does not invent alternative explanations that were never described.",
      "It ships as two plain text files: a main instructions file with the classification rules and the audit steps built in, and a worked reference file walking through two full passes, one flagged and one not. Both are previewable in full on this page before you download the zip, and both are exactly what an AI assistant receives once the archive is handed over.",
      "The claims this skill is built for read like ordinary results reporting: a redesign increased retention, a change drove signups, a flow boosted completion. Before that verb ships as settled fact, this skill checks whether the evidence behind it is a real controlled comparison or just two numbers that moved together.",
    ],
    sections: [
      {
        heading: "Why causal language outruns evidence so easily",
        body: [
          "A before and after comparison and a randomized experiment can produce numbers that look identical on the page, yet only one of them supports the word caused. Language models asked to review an analysis tend to preserve whatever verb the original author chose, since correcting it requires checking the evidence type, not the fluency of the sentence.",
          "This skill exists to interrupt that default. As a free ai skill to check causal claims, it requires the evidence supplied to be quoted and classified before any causal verb is allowed to stand unflagged.",
        ],
      },
      {
        heading: "Two evidence buckets, defined narrowly",
        body: [
          "Correlational evidence covers a before and after comparison with no control group, two measures that moved together with no random assignment, or a stated pattern with no method described for ruling out other explanations. Causation supporting evidence covers only a real controlled experiment with actual random assignment, or a real argument that names and rules out specific plausible alternatives.",
          "This is a downloadable correlation vs causation checklist precisely because the line between the two buckets is drawn on a specific, checkable feature of the evidence, random assignment or a genuine ruling out argument, not on how convincing the surrounding prose reads.",
        ],
      },
      {
        heading: "How the audit runs, as an ai skill to audit causal language in analysis",
        body: [
          "For each causal claim, the skill quotes the claim's exact wording and causal verb, quotes the real evidence supplied, classifies that evidence against the two buckets, and either flags the claim as OVERREACHING with a corrected correlational rephrasing or confirms it and names the specific feature that earns the conclusion.",
          "The corrected phrasing always keeps the real numbers from the original claim and only changes the verb, so a flagged claim is never simply deleted, it is made accurate. Used this way, as a correlation causation checker for data claims, the skill runs before a causal verb ships in a deck, not after.",
        ],
      },
      {
        heading: "How this differs from the cohort comparison fairness check skill",
        body: [
          "The cohort comparison fairness check skill asks whether two groups being placed side by side actually differ in some other stated way, a promotion, a time period, a channel, that could explain an outcome gap on its own. This skill asks a different question: given the evidence already supplied for a stated cause and effect claim, does that evidence's type, correlational or causation supporting, actually match the causal language used to describe it.",
          "A claim can pass a cohort fairness check, meaning the two groups compared were genuinely alike, and still fail this audit, if the underlying evidence was only a before and after comparison with no control group. The two skills check different failure modes and run alongside each other, not in place of one another.",
        ],
      },
      {
        heading: "How this differs from the sample size sanity check skill",
        body: [
          "The sample size sanity check skill asks whether the numbers behind a comparison are large enough to trust, sorting a claim into size bands from a red flag under thirty observations up to no automatic flag at three hundred and above. This skill never touches sample size; a claim can rest on ten thousand users and still fail this audit if the evidence is only correlational.",
          "Run this audit alongside a sample size check whenever both apply, since a large sample makes a correlational finding more precisely measured without making it any more causal.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not assume a control group or a randomized design exists because the analysis sounds professional, and it will not manufacture a ruled out alternative that was never described. Every classification traces to a quoted feature of the real evidence supplied, and a claim with no described method is treated as correlational, never upgraded on the strength of confident prose.",
        ],
      },
    ],
    howTo: {
      name: "How to use the correlation causation claim audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-examples.md directly on this page before downloading, so the classification rules and two full worked passes are visible up front.",
        },
        {
          name: "Gather the claim and the real evidence",
          text: "Pull the causal claim exactly as written from the analysis, along with the real evidence actually supplied to support it, and nothing you are inferring or assuming might also exist.",
        },
        {
          name: "Download the zip and hand both files to your assistant",
          text: "One button builds the archive from the exact files shown in the preview. Keep the folder structure intact so the main instructions file can point to the worked examples file.",
        },
        {
          name: "Run the audit and route the result",
          text: "Have the assistant quote the claim and the evidence, classify the evidence, and either apply the OVERREACHING flag with a corrected phrasing or confirm the claim, citing the specific feature that earned the verdict either way.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as causation supporting evidence under this skill?",
        answer:
          "Only a real controlled experiment with actual random assignment to a treatment and control condition, or a real argument that explicitly names and rules out specific plausible alternative explanations for the outcome. Anything short of that, including a confident sounding before and after comparison, is treated as correlational.",
      },
      {
        question: "Does the skill ever assume a control group probably existed?",
        answer:
          "No, and its instructions explicitly forbid it. If the evidence supplied does not clearly describe random assignment or a real ruling out argument, the skill treats it as correlational, even when the surrounding analysis reads as thorough or professional.",
      },
      {
        question: "How is this different from the cohort comparison fairness check skill?",
        answer:
          "That skill checks whether two groups being compared actually differ in some other stated way, such as a promotion or a time period, that could explain an outcome gap on its own. This skill checks a different thing: whether the evidence type already supplied for a causal claim, correlational or causation supporting, matches the causal language used to describe it. A claim can pass one check and fail the other.",
      },
      {
        question: "Does this skill replace a sample size check?",
        answer:
          "No. The sample size sanity check skill on this site asks whether a comparison's groups are numerically large enough to trust at all. This skill never evaluates sample size; a claim backed by a huge sample can still fail this audit if the underlying evidence is only correlational.",
      },
      {
        question: "What happens to a claim that gets flagged as OVERREACHING?",
        answer:
          "The skill states the flag plainly in one sentence explaining why the causal verb outruns the evidence, then supplies an accurate correlational rephrasing that keeps the real numbers from the original claim while dropping the unsupported causal framing.",
      },
      {
        question: "Can the skill catch a claim with no evidence described at all?",
        answer:
          "Yes. A causal claim with no method described for it is treated as correlational by default under the skill's classification rules, since the absence of a described method is itself the finding, not a gap to be filled in with an assumed stronger design.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the analysis you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/data-analysis-skills/cohort-comparison-fairness-check-skill",
        label: "cohort comparison fairness check skill",
        description: "A related but distinct check: whether two groups being compared actually differ in some other stated way, rather than whether causal language matches the evidence type supplied.",
      },
      {
        href: "/data-analysis-skills/sample-size-sanity-check-skill",
        label: "sample size sanity check skill",
        description: "A separate, earlier question: whether the numbers behind a comparison are large enough to trust at all, independent of whether the language used to describe them is accurate.",
      },
      {
        href: "/data-analysis-prompts/ab-test-analysis-prompt",
        label: "ab test analysis prompt",
        description: "For reviewing a real controlled experiment's design and results directly, the kind of evidence this skill's audit treats as genuinely causation supporting.",
      },
      {
        href: "/data-analysis-prompts/statistical-check-prompt",
        label: "statistical check prompt",
        description: "The fuller sceptical review to run once a causal claim has cleared this skill's audit and needs a documented, defensible verdict.",
      },
    ],
    externalLinks: [
      {
        href: "https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation",
        label: "Wikipedia: Correlation does not imply causation",
        description: "Background on the general principle this skill applies narrowly and mechanically to a single stated claim and its supplied evidence.",
      },
      {
        href: "https://www.nngroup.com/articles/correlation-vs-causation/",
        label: "Nielsen Norman Group: Correlation vs Causation",
        description: "An independent explainer on how analysts and product teams mistake a correlational finding for a causal one in everyday reporting.",
      },
      {
        href: "https://www.ncbi.nlm.nih.gov/books/NBK574513/",
        label: "NCBI Bookshelf: Study Bias",
        description: "A peer reviewed reference on the mechanisms, including confounding, that separate a genuine controlled comparison from an uncontrolled before and after one.",
      },
    ],
  },

  tags: ["data analysis", "correlation", "causation", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
