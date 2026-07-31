import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Sales Forecast Commit Confidence Audit

Use this skill when you are given a real deal's forecast category, exactly as the rep has
labelled it, Commit, Best Case, or Pipeline, together with the real evidence documented
about that deal: a verbal agreement, a budget confirmation, the status of signed paperwork,
or a timeline commitment made by the buyer. The job is diagnostic, not corrective: check
whether the stated category is actually supported by the documented evidence, and say
exactly what is missing when it is not.

## Before you audit anything

You need two real things for every deal you audit: the forecast category the rep has
assigned, and the actual evidence text logged against that specific deal. Do not invent
supporting evidence that was not documented. A rep's optimism, a general sense that a deal
"feels close," or a summary line like "they seem interested" is not evidence of near
certain closure, it is a feeling about the deal, and this skill never treats it as anything
more than that.

If you are given a category with no evidence at all, or evidence that does not name a
specific document, quote, or date, say plainly that there is not enough to audit and name
exactly what kind of evidence is missing, rather than proceeding as though the category
were self evidently correct.

## Never assume the stated category is correct

A forecast category is a claim a rep entered, not a fact the pipeline has independently
verified. A deal sitting in Commit is not itself evidence that the deal is near certain to
close; the documented evidence is the evidence. Treat every stated category as unverified
until the real evidence has been checked line by line against the bar that category
actually requires, even when the category looks obviously right at a glance.

## The three evidence bars

Each forecast category claims a different level of closing confidence, and each has its own
bar for what documented evidence must show before the category is supported.

- **Commit**: requires a specific, named piece of evidence of near certain close, quoted
  directly. This means one of: signed paperwork already returned or explicitly in the
  buyer's final signature process, an explicit budget confirmation quoted from the buyer
  directly, or a specific closing timeline stated by the buyer themselves, not inferred by
  the rep. A rep's own read of the deal, however confident, does not meet this bar on its
  own.
- **Best Case**: requires documented evidence of real buyer engagement toward a close, short
  of the Commit bar. This means a quoted verbal agreement in principle from someone on the
  buyer's side, or a budget conversation that actually happened and was logged, but without
  signed paperwork in motion or a buyer stated date. A rep's general confidence alone does
  not meet this bar either.
- **Pipeline**: requires only that the deal is real and has at least one logged, dated
  interaction. Pipeline does not claim near term closure, so no confidence level evidence is
  required to support it.

## How to audit one deal

1. Pull the deal's exact stated forecast category, Commit, Best Case, or Pipeline. Quote it
   before doing anything else.
2. Read the deal's actual documented evidence in full, exactly as given: the verbal
   agreement text, the budget confirmation, the signed paperwork status, the timeline
   commitment, or the absence of any of these.
3. Apply the evidence bar for the stated category from the section above. Identify which
   specific quoted line, if any, satisfies each element that bar requires.
4. Assign exactly one of three verdicts:
   - SUPPORTED: the documented evidence contains a specific, named piece of evidence that
     meets the bar the stated category requires. Quote the exact line that supports it.
   - OVERSTATED: the stated category claims more closing confidence than the documented
     evidence supports. This includes a Commit or Best Case category backed only by rep
     opinion, a vague summary like "they seem interested," or no real evidence quoted at
     all. Quote the category, quote what evidence exists (or state that none was given),
     and name exactly what specific evidence that category's bar actually requires.
   - UNDERSTATED: the documented evidence actually clears a higher bar than the stated
     category claims, for example signed paperwork already logged against a deal marked
     Pipeline. Quote the evidence and name which higher category it would actually support.

## Output format

For every deal audited, write, in order: the deal name, the stated forecast category, the
evidence bar being applied, the exact evidence text being checked, the verdict, and the
specific evidence, quoted, that the verdict rests on. Close with a one line count of deals
in each of the three states. Do not average these into a single forecast health score; a
single OVERSTATED deal is a real finding on its own and should never be softened because
most of the other deals in the batch came back SUPPORTED.

## What this skill does not do

It does not decide which category a miscategorised deal should actually carry, does not
predict whether the deal will close, and does not coach the rep who logged the evidence or
speculate about why the category was overstated. It also does not check the deal's pipeline
stage against stage exit criteria, a related but separate audit; see the differentiation
note in \`reference/worked-example.md\` for exactly how the two checks differ. It never adds
to the evidence it is given; if the documentation is thin, the skill says so rather than
filling the gap with a plausible sounding assumption about what probably happened on the
call.
`;

const WORKED_EXAMPLE_MD = `# Worked example: auditing three deals against real forecast evidence

Use this alongside \`SKILL.md\`. It runs the audit method against three deals, each with a
real stated forecast category and real documented evidence, so the difference between a
SUPPORTED and an OVERSTATED verdict is concrete rather than abstract.

## Deal 1: Ferro Industrial Supply, stated category Commit

Evidence, exactly as logged: "Verbal agreement from Diane Okafor (VP Procurement) on the
6/10 call: 'we are moving forward, get me the contract.' MSA sent 6/12. Signed MSA returned
6/17, redlines only on payment terms, legal is finalising now, Diane confirmed target
signature by 6/28 in an email dated 6/19: 'we are aiming to have this fully executed by the
28th.'"

Audit: the bar being applied is Commit, which requires a specific, named piece of evidence
of near certain close, such as signed paperwork already in the buyer's final signature
process or a closing timeline stated directly by the buyer. The evidence shows a signed MSA
already returned with only payment term redlines outstanding, and a specific date, June 28,
stated directly by Diane Okafor in a dated email, not inferred by the rep. Verdict:
SUPPORTED. Both a paperwork status and a buyer stated timeline are present and directly
quoted.

## Deal 2: Bellhaven Logistics, stated category Commit

Evidence, exactly as logged: "Great call with their ops team on 6/5, they seem really
interested and the rep feels good about closing this quarter. Following up next week."

Audit: the bar being applied is the same Commit bar as Deal 1. Nothing in this evidence
names a signed document, a buyer quoted budget confirmation, or a buyer stated closing
date. "They seem really interested" and "the rep feels good about closing this quarter" are
both the rep's own read of the deal, not documented evidence from the buyer. Verdict:
OVERSTATED. A Commit category requires a specific named piece of evidence, and none is
present here beyond rep optimism. What would resolve this: a quoted budget confirmation
from the buyer, the actual status of any paperwork in motion, or a closing date the buyer
has stated themselves.

## Deal 3: Aldergate Fine Foods, stated category Best Case

Evidence, exactly as logged: "6/8 call with James Okoye (Finance Director). James said: 'the
number works for us, I need to run it past our CFO next week before we can commit to
anything in writing.' No paperwork sent yet, no date given for the CFO conversation."

Audit: the bar being applied is Best Case, which requires documented evidence of real buyer
engagement toward a close, such as a quoted verbal agreement in principle, but stops short
of signed paperwork in motion or a buyer stated date. James Okoye's quoted line confirms the
pricing works for the buyer and names a specific next internal step, without yet reaching
a Commit level commitment. Verdict: SUPPORTED. The evidence meets the Best Case bar exactly:
real, quoted buyer engagement, short of the paperwork or date a Commit verdict would need.

## How the three outcomes fit together

Deal 1 shows what a real Commit needs: a paperwork status and a buyer stated date, both
quoted directly rather than summarised by the rep. Deal 2 carries the identical stated
category, Commit, but nothing behind it beyond the rep's own confidence, which is exactly
the gap this skill exists to catch before it distorts a forecast roll up. Deal 3 shows that
Best Case has its own real bar too, one Deal 2's evidence would not have met even if it had
been labelled Best Case instead of Commit, since rep optimism alone does not clear either
bar.

## How this differs from a deal stage definition audit

This skill and the deal stage definition audit skill both check a rep's claim against real
documented evidence, but they check different claims. The deal stage definition audit skill
checks a deal's CRM pipeline stage, such as Proposal Sent, against that stage's own written
exit criteria and the deal's logged notes: it answers where a deal actually sits in the
sales process. This skill checks a deal's forecast commit category, Commit, Best Case, or
Pipeline, against the buyer side evidence of closing confidence: a verbal agreement, a
budget confirmation, signed paperwork status, or a buyer stated timeline. It answers how
sure the forecast should be that a specific deal closes when it says it will.

A deal can be correctly staged and still be badly forecast. Ferro Industrial Supply above
could sit in a perfectly accurate Proposal Sent or Contract Negotiation stage and still have
its forecast category audited separately, since a correct stage says nothing about whether
Commit level evidence has actually been documented. The two audits are complementary
checks on different claims, not two versions of the same question.
`;

const meta: SkillMeta = {
  slug: "sales-forecast-commit-confidence-audit-skill",
  name: "Sales Forecast Commit Confidence Audit",
  title: "Sales Forecast Commit Confidence Audit Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that checks a deal's stated forecast category, Commit, Best Case, or Pipeline, against the real documented evidence, and flags a category as overstated when only rep optimism backs it.",

  seo: {
    primaryKeyword: "sales forecast commit confidence audit skill",
    keywords: [
      "sales forecast commit confidence audit skill",
      "free ai skill for forecast accuracy",
      "downloadable sales forecast audit checklist",
      "ai skill to check forecast commit categories",
      "how to audit a sales forecast commit",
    ],
    seoTitle: "Sales Forecast Commit Confidence Audit Skill: Free Download",
    seoDescription:
      "A free, downloadable sales forecast commit confidence audit skill that checks a deal's Commit, Best Case, or Pipeline category against its real documented evidence.",
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
      "Asked to check whether a forecast category is accurate, models reliably accept a rep's stated confidence as sufficient support on its own, treating phrases like they seem interested or feels good about this one as if they were documented evidence rather than opinion. This skill's three evidence bars force every verdict to trace to a specific, quoted piece of evidence, named by type, budget confirmation, paperwork status, or buyer stated timeline, and require an overstated verdict whenever a Commit or Best Case category rests on rep optimism instead of a documented fact.",
  },

  article: {
    intro: [
      "A sales forecast commit confidence audit skill only earns its name if it checks every stated category against real documented evidence, not just the ones that already look shaky. Handed a forecast export, most AI assistants will read a Commit label, note that the deal sounds promising, and move on, treating the category itself as proof the underlying evidence exists. This skill refuses that shortcut and checks the evidence instead.",
      "It ships as two plain text files: a main instructions file and a worked example reference file covering three full deal audits. Both are previewable in full on this page before you download the .zip.",
      "Its job stops at diagnosis. It does not decide which category a miscategorised deal should carry, and it does not predict whether any deal will close; it names, deal by deal, whether the evidence supports the confidence level the stated category claims.",
    ],
    sections: [
      {
        heading: "Why a stated category is never evidence on its own",
        body: [
          "A deal's forecast category is a label a rep entered, not a fact the pipeline has independently verified. Nothing about a deal sitting in Commit guarantees a signed document or a buyer stated date exists behind it; a rep could have moved the category up out of optimism, or left it there out of habit after a deal cooled. The only way to know is to check the deal's own documented evidence against what that category actually requires.",
          "A free ai skill for forecast accuracy that only investigates deals already looking doubtful will miss overstated ones that read fine at a glance, usually the ones doing the most damage to a quarter's number.",
        ],
      },
      {
        heading: "The three evidence bars, not one generic standard",
        body: [
          "Commit, Best Case, and Pipeline each claim a different level of closing confidence, so each gets its own bar. Commit needs a named piece of evidence: signed paperwork status, a quoted budget confirmation, or a buyer stated closing date. Best Case needs a quoted verbal agreement or a logged budget conversation, short of paperwork in motion or a firm date. Pipeline needs only a real, dated interaction.",
          "Applying one flat standard to all three categories would wave through weak Commit deals or unfairly flag honest Pipeline deals for lacking evidence they never claimed. A downloadable sales forecast audit checklist has to match the bar to the claim being made.",
        ],
      },
      {
        heading: "Rep optimism is not documented evidence",
        body: [
          "The most common failure this skill exists to catch is a Commit or Best Case category resting on nothing but a rep's own read of the room. A line like they seem interested or feels good about closing this quarter describes the rep's confidence, not anything the buyer has actually said, signed, or committed to in writing. This skill treats that kind of line the same as no evidence at all.",
          "As an ai skill to check forecast commit categories, its output stays specific: a quoted line of real evidence or a clear statement that none exists.",
        ],
      },
      {
        heading: "The three verdicts: SUPPORTED, OVERSTATED, UNDERSTATED",
        body: [
          "Every audited deal gets one of three states. SUPPORTED means the evidence contains a specific, quoted piece meeting the stated bar. OVERSTATED means the category claims more confidence than the evidence backs, whether thin rep opinion or genuinely absent. UNDERSTATED means the evidence clears a higher bar than the stated category claims, for example signed paperwork logged on a deal marked Pipeline.",
          "Keeping all three as distinct outcomes makes this a real forecast confidence audit, not a one directional skepticism pass. Knowing how to audit a sales forecast commit means catching both directions of miscategorisation, not just the optimistic ones.",
        ],
      },
      {
        heading: "Worked example: two Commit deals, two different verdicts",
        body: [
          "The reference file walks through three deals audited against their stated categories. One Commit deal shows a signed MSA already returned with only payment terms outstanding, plus a closing date stated directly by the buyer in a dated email, so it comes back SUPPORTED. Another carries the identical Commit label but nothing behind it beyond a good call and the rep feeling confident about the quarter, so it comes back OVERSTATED despite sharing the same category on paper.",
          "A third deal, marked Best Case, shows a buyer quoting that the pricing works while naming a specific next internal step before any written commitment, which clears the Best Case bar exactly.",
        ],
      },
      {
        heading: "How this differs from a deal stage definition audit",
        body: [
          "The deal stage definition audit skill on this site checks a different claim: whether a deal's CRM pipeline stage, such as Proposal Sent, matches that stage's own exit criteria and logged notes. It answers where a deal sits in the sales process. This skill checks the forecast commit category instead, against buyer side evidence of closing confidence, answering how sure the forecast should be that a deal closes.",
          "A deal can be correctly staged and still be badly forecast, since an accurate stage says nothing about whether Commit level evidence has actually been documented. The champion relationship risk check skill checks a third signal again, stakeholder contact breadth, so all three audits run on the same deal without repeating each other's job.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not decide which category a miscategorised deal should carry, predict whether it closes, or explain why a rep overstated it. It will not check pipeline stage against stage exit criteria, a separate audit this site covers elsewhere. It will not soften the evidence it is given; a thin evidence line is reported as thin, never filled in with a guess.",
        ],
      },
    ],
    howTo: {
      name: "How to use the sales forecast commit confidence audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md on this page before downloading, so you can see how a SUPPORTED, OVERSTATED, and UNDERSTATED verdict are each reached.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the stated categories and real evidence",
          text: "Pull each deal's actual forecast category and the real evidence logged against it: verbal agreements, budget confirmations, paperwork status, and buyer stated timelines. Missing evidence is fine to flag; guessed evidence is not.",
        },
        {
          name: "Hand both files to your assistant and audit each deal",
          text: "Keep the folder structure intact so the instructions can point to the worked example, then supply the real categories and evidence and ask for a verdict, deal by deal.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as documented evidence for a Commit category?",
        answer:
          "A specific, named piece of evidence quoted directly: signed paperwork already returned, a budget confirmation quoted from the buyer, or a closing timeline the buyer stated themselves, not inferred by the rep. A general sense that the deal feels close does not meet this bar.",
      },
      {
        question: "What happens if a deal has no evidence documented at all?",
        answer:
          "For a Commit or Best Case category, the skill returns OVERSTATED, since a category claiming closing confidence with no evidence behind it cannot be supported. The output names exactly what kind of evidence would be needed to change that verdict.",
      },
      {
        question: "Does this skill decide what category a miscategorised deal should carry instead?",
        answer:
          "No. Its job stops at naming whether the current category matches the current evidence, with a quoted verdict for each deal. Choosing the correct replacement category is left to the person or team running the forecast review.",
      },
      {
        question: "How is this different from the deal stage definition audit skill?",
        answer:
          "The deal stage definition audit skill checks a deal's CRM pipeline stage against that stage's own exit criteria and logged notes. This skill checks the forecast commit category against buyer side closing evidence instead, answering how sure the forecast should be that the deal closes.",
      },
      {
        question: "Can a deal be flagged for having too much evidence, not too little?",
        answer:
          "Yes, that is the UNDERSTATED verdict. If the documented evidence clears a higher bar than the stated category claims, for example signed paperwork logged on a deal marked Pipeline, the skill flags it and names the higher category the evidence supports.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the deal data you run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "A natural source of the dated, quoted evidence this skill checks against each forecast category's bar.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description: "For working out why a deal actually closed or fell through, once its forecast category has been checked for accuracy.",
      },
      {
        href: "/sales-skills/deal-stage-definition-audit-skill",
        label: "deal stage definition audit skill",
        description: "A related but distinct audit checking a deal's CRM pipeline stage against its own exit criteria, not its forecast confidence.",
      },
      {
        href: "/sales-skills/champion-relationship-risk-check-skill",
        label: "champion relationship risk check skill",
        description: "For checking stakeholder contact breadth on the same deal, a separate signal from forecast commit confidence.",
      },
    ],
    externalLinks: [
      {
        href: "https://blog.hubspot.com/sales/sales-forecasting",
        label: "HubSpot: Sales Forecasting Methods",
        description: "An independent explainer of sales forecasting approaches and the risk of relying on rep intuition over documented signals.",
      },
      {
        href: "https://www.gong.io/blog/pipeline-management/",
        label: "Gong: Pipeline Management Explained",
        description: "A practitioner account of how unchecked pipeline and forecast data distorts revenue predictions when it goes unaudited.",
      },
      {
        href: "https://gtmnow.com/sales-forecasting-methods/",
        label: "GTMnow: Sales Forecasting Methods",
        description: "A practitioner breakdown of forecasting techniques and the gap between rep confidence and evidence backed forecasting.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to citing forecast evidence.",
      },
    ],
  },

  tags: ["sales", "forecast", "pipeline", "deal risk", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
