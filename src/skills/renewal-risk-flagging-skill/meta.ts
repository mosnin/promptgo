import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Renewal Risk Flagging

Use this skill when you are given real account signals, a usage trend, support ticket
volume or tone, stated champion or stakeholder status, budget cycle timing, or contract
terms, and asked whether the account carries renewal risk. The job is diagnostic, not
persuasive: identify whether risk exists at all, and exactly where, before anyone drafts
a renewal conversation or makes a commercial move.

## Before you flag anything

Only work from evidence actually supplied for this specific account. Do not infer risk,
or the absence of risk, from account age or contract value alone. A five year account is
not automatically safe, and a six figure account is not automatically at risk; both
claims require evidence about what is actually happening on the account, not a fact
about its size or how long it has been a customer.

If you are only given a company name, a renewal date and a contract value, say plainly
that there is not enough evidence to flag any risk category, and name the specific
inputs, usage figures, ticket data, stakeholder notes, that would let you do the job.
Do not fill the gap with a plausible sounding guess about a company that size or in that
industry.

## The five risk signal categories

Run the account against \`reference/risk-signal-categories.md\`. That file names five
categories: usage decline, support escalation pattern, champion or stakeholder change,
budget cycle timing, and contract terms nearing an unfavorable auto renewal. Each has a
one line definition of what counts as a flagged signal and what does not.

For each of the five categories, produce exactly one of three states:

- FLAGGED: the evidence supplied shows the specific pattern the category defines. Quote
  or restate the exact evidence behind it.
- NOT FLAGGED: evidence was supplied for this category and it does not show the pattern.
- INSUFFICIENT INFORMATION: no evidence was supplied that speaks to this category at
  all.

## The rule that makes this useful

Every FLAGGED state must trace to a specific, real piece of evidence given for this
account: a usage number, a quoted ticket, a named stakeholder change, a stated renewal
date measured against a stated budget cycle, a specific clause. Never mark a category
flagged because the account is old, because the contract is large, or because the
situation just sounds generally risky. A flag with no cited evidence is not a finding,
it is a guess wearing a verdict.

INSUFFICIENT INFORMATION is not a quiet downgrade to NOT FLAGGED. If no usage data was
given, usage decline cannot be assessed at all; it does not default to safe. Treat a
category with no supporting evidence as genuinely unknown and say so, rather than
letting an unassessed category disappear into an implied clean bill of health.

## Output format

For each of the five categories, in order, write:

1. The category name.
2. The state: FLAGGED, NOT FLAGGED, or INSUFFICIENT INFORMATION.
3. The exact evidence the state rests on, or the words "no evidence supplied for this
   category" when that is the honest answer.
4. One sentence connecting the evidence to the category's definition, so the flag is
   checkable by someone who has not seen the raw account notes.

Close with a one line count of how many categories were flagged, not flagged, and came
back insufficient. Do not average these into a single risk score out of ten, and do not
layer an overall risk rating on top of the five states; the five verdicts are the
finding, not a headline judgement.

## What this skill does not do

It does not draft a renewal conversation, a talking point, or an email. It does not
decide whether or how to proceed with the account commercially, and it does not forecast
whether the renewal will actually close. Its whole job stops at telling you, category by
category, what the actual evidence supports, so that whatever happens next starts from a
real picture rather than a guess dressed as one.
`;

const RISK_SIGNAL_CATEGORIES_MD = `# Renewal risk signal categories: five checkable categories

Use this alongside \`SKILL.md\`. Each category below states in one line what counts as a
flagged signal and what does not, so a flag is never assigned on a feeling about the
account.

## 1. Usage decline

Flagged when the evidence gives a specific trend: a percentage drop, a comparison
against a stated baseline period, or a named feature that stopped being used entirely.
"Usage seems lower lately" with no number attached is not flaggable evidence. "Logins
fell forty percent over the last quarter compared to the quarter before" is.

What does not count: a low absolute usage number with no trend attached. A small account
that has always used the product lightly is not evidence of decline; decline requires a
comparison across time, not a single snapshot.

## 2. Support escalation pattern

Flagged when the evidence shows a pattern: rising ticket volume over a stated period,
tickets reopened after being marked resolved, or ticket tone that has shifted from
routine questions to frustration or a stated intent to leave. A single support ticket,
however critical it reads, is not a pattern on its own; a pattern needs more than one
data point across time.

What does not count: a high raw number of tickets with no trend or tone data attached,
since some accounts simply use the product more and generate proportionally more
tickets without that indicating any real risk.

## 3. Champion or stakeholder change

Flagged when the evidence names a specific change: the stated champion left the company,
changed roles, or has stopped responding, per a note or a thread the account owner
actually has. A vague sense that the relationship feels different is not flaggable
evidence; a named person and a named change is.

What does not count: the champion simply being described as busy or slow to reply once,
with no pattern and no stated role or departure change behind it.

## 4. Budget cycle timing

Flagged when the evidence states a specific mismatch: the renewal date falls before the
account's stated new budget approval, a stated freeze period, or a fiscal year boundary
the account has explicitly mentioned. Budget cycle risk requires knowing the account's
actual cycle, not a general assumption about when companies typically approve renewals.

What does not count: the renewal simply falling at the end of a calendar quarter with no
stated connection to that specific account's budget process.

## 5. Contract terms nearing an unfavorable auto renewal

Flagged when the evidence describes a specific clause: an auto renewal date approaching
with a price increase, a term lock the account did not knowingly agree to, or a
cancellation window the account is about to miss without being told. The clause itself
must be named or quoted from the contract terms given, not assumed from the fact that a
contract exists.

What does not count: the mere fact that a contract has an auto renewal clause. Most
contracts do; a flag requires the specific term to actually work against the account
given what has happened on it.

## How to apply this when only partial evidence exists

Score only the categories evidence was actually given for. A category with no
supporting evidence at all is INSUFFICIENT INFORMATION, not NOT FLAGGED and not skipped
silently. State it in the output exactly like the other two states, so a reader can see
which parts of the picture are genuinely missing rather than assuming everything not
flagged was checked and came back clean.

## How to apply this when evidence conflicts

If two pieces of evidence for the same category point in different directions, for
example usage rose on one feature and fell sharply on another, state both and flag the
category if the pattern it defines is present in either direction, quoting both. Do not
average conflicting numbers into a single reassuring or alarming figure; report what was
actually given and let the reader weigh it.
`;

const meta: SkillMeta = {
  slug: "renewal-risk-flagging-skill",
  name: "Renewal Risk Flagging",
  title: "Renewal Risk Flagging Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that flags renewal risk across five checkable categories from an account's real usage, support and stakeholder evidence, and refuses to infer risk from account age or contract value alone.",

  seo: {
    primaryKeyword: "renewal risk flagging skill",
    keywords: [
      "renewal risk flagging skill",
      "free ai skill for renewal risk",
      "downloadable renewal risk checklist",
      "ai skill to flag account renewal risk",
      "how to flag renewal risk signals",
    ],
    seoTitle: "Renewal Risk Flagging Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable renewal risk flagging skill that flags account risk across five evidence based categories, never from account age or size alone.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/risk-signal-categories.md", content: RISK_SIGNAL_CATEGORIES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to assess renewal risk, models reliably default to inferring danger or safety from generic signals such as account age, contract size or industry reputation, rather than the actual usage, support and stakeholder evidence supplied for that specific account. This skill's category structure forces every flag to trace to a real, cited piece of evidence and requires an insufficient information state, not a guessed clean bill of health, whenever a category was never actually given anything to assess.",
  },

  article: {
    intro: [
      "A renewal risk flagging skill only earns its name if it can tell the difference between real evidence and a plausible sounding guess. Handed an account name, a renewal date and a contract value, most AI assistants will happily produce a confident risk rating anyway, quietly leaning on account age or deal size as if either one actually predicted anything. This skill is built to refuse that shortcut and score risk only from what is actually supplied.",
      "It ships as two plain text files: a main instructions file and a five category reference file the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
      "Its job stops at diagnosis. It does not draft a renewal conversation or forecast whether a deal closes; it names which of five risk categories the given evidence supports, and which were never given anything to judge.",
    ],
    sections: [
      {
        heading: "Why account age and contract value are never risk signals on their own",
        body: [
          "A five year account and a brand new one can carry identical risk, or none, depending entirely on what has happened on them recently. Age tells you how long a relationship has existed, not whether it is currently healthy. The same is true of contract value: a large account with rising usage and a stable champion is not at risk because the number is big, and a small account is not automatically safe because little is at stake.",
          "This skill's first instruction is to check whether real evidence exists before judging anything. When only a name, a date and a dollar figure are given, the honest output is a statement that there is not enough evidence to flag any category, plus a list of the specific inputs that would change that, not a rating built on the two facts that happened to be available.",
        ],
      },
      {
        heading: "The five risk signal categories",
        body: [
          "Every judgment in this skill traces back to one of five specific, checkable categories: usage decline, support escalation pattern, champion or stakeholder change, budget cycle timing, and contract terms nearing an unfavorable auto renewal. Each is defined in a downloadable renewal risk checklist with a one line rule for what counts as flagged and what does not, held in the reference file the main instructions point to.",
          "A category only gets marked flagged when the supplied evidence actually matches its definition: a specific percentage, a quoted ticket, a named departure, a stated budget date, a named clause. General unease about an account does not move any category, which is exactly what makes this a free ai skill for renewal risk worth trusting over a generic risk rating.",
        ],
      },
      {
        heading: "How this differs from the renewal conversation prompt",
        body: [
          "The renewal conversation prompt already on this site has a related but later job: once signals are known, it grades them, decides whether to open a renewal call or repair first, and drafts the actual conversation, including the opening paragraph, the questions to ask, and a pre decided concession.",
          "This renewal risk flagging skill sits upstream of that. It does not decide whether to have the conversation or write a single line of it. Its output is five category by category states, each tied to cited evidence, so that whatever tool or person plans the actual conversation next is working from a checked picture instead of an assumed one.",
        ],
      },
      {
        heading: "As an ai skill to flag account renewal risk, what a flagged state actually requires",
        body: [
          "A flagged state is the part of this skill most likely to get lazy without the category definitions. It is easy to write usage looks concerning and move on. It is harder to state the exact percentage drop, the exact quarter it is measured against, and the exact source line that number came from.",
          "That distinction between an impression and a cited flag is the entire value of running this as a skill. Every flagged category has to survive someone opening the original account notes and checking the evidence the state names, which is the whole method behind how to flag renewal risk signals without inventing evidence that was never supplied.",
        ],
      },
      {
        heading: "When information is missing, say so instead of assuming low risk",
        body: [
          "Silence about a category is not evidence that the category is fine. If no support ticket data was supplied at all, the honest state for support escalation pattern is insufficient information, not not flagged. Rounding a missing input into an implied clean bill of health is exactly the failure this skill exists to prevent, since it lets a genuinely unassessed risk disappear from view entirely.",
          "The output format keeps this visible on purpose: insufficient information is written out as its own named state in every response, sitting next to flagged and not flagged, so a reader can see immediately which parts of the picture were actually checked.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not average five category states into a single risk score, and it will not layer an overall verdict like at risk or safe on top of them once the states are in front of the reader. It will not draft outreach, plan a call, or recommend a commercial move; those are separate jobs handled by separate tools once the diagnosis is in hand.",
        ],
      },
    ],
    howTo: {
      name: "How to use the renewal risk flagging skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/risk-signal-categories.md directly on this page before downloading, so you know exactly what standard the flagging is run against.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the account's real evidence",
          text: "Before flagging anything, collect whatever usage numbers, support ticket history, stakeholder notes and contract terms actually exist for the account. Missing categories are fine; guessed ones are not.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the category file, then supply the account's real evidence and ask for a state per category.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I do not have usage data for an account?",
        answer:
          "The usage decline category is marked insufficient information rather than guessed as either flagged or safe. The skill's instructions treat a missing input as genuinely unknown, and the output names usage data specifically as one of the inputs that would let that category actually be assessed.",
      },
      {
        question: "Does this skill decide whether to proceed with the renewal?",
        answer:
          "No. Its job stops at naming which of five risk categories the supplied evidence supports, each with its own state and cited evidence. Deciding whether to open a renewal conversation, repair the relationship first, or escalate is a separate, later decision this skill deliberately does not make.",
      },
      {
        question: "How is this different from the renewal conversation prompt?",
        answer:
          "The renewal conversation prompt drafts the actual call, including an opening paragraph, questions to ask, and a concession to offer, once signals are already known. This skill sits earlier: it only diagnoses which risk categories the real evidence supports, with no conversation content, no verdict on whether to proceed, and no forecast attached to its output.",
      },
      {
        question: "Does contract value or account age ever count as a risk signal here?",
        answer:
          "No, and the instructions explicitly forbid it. Both are facts about the account's size and tenure, not evidence about what is currently happening on it. A large or long standing account still needs a real usage number, a real ticket pattern, or a real stakeholder note before any category can be marked flagged.",
      },
      {
        question: "What are the five risk signal categories?",
        answer:
          "Usage decline, support escalation pattern, champion or stakeholder change, budget cycle timing, and contract terms nearing an unfavorable auto renewal. Each has its own one line definition of what counts as flagged evidence in the reference file, so a state is never assigned from a general feeling about the account.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the account evidence you eventually run through the skill is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/renewal-conversation-prompt",
        label: "renewal conversation prompt",
        description: "The natural next step once risk has been flagged, for drafting the actual renewal call or repair agenda.",
      },
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "A source of the commitments, blockers and stakeholder notes this skill's champion and support categories check against.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description: "For working out why an account actually churned after the fact, once flagged risk was not addressed in time.",
      },
      {
        href: "/sales-skills/sales-call-review-skill",
        label: "sales call review skill",
        description: "A related downloadable checklist that scores discovery quality on a single call, the same evidence based discipline applied earlier in the deal.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2014/10/the-value-of-keeping-the-right-customers",
        label: "Harvard Business Review: The Value of Keeping the Right Customers",
        description: "An independent look at why retention economics make an accurate, evidence based risk read worth the effort this skill requires.",
      },
      {
        href: "https://www.gainsight.com/blog/customer-health-scores/",
        label: "Gainsight: Customer Health Score Explained",
        description: "A primary source on building health scores from multiple real signals rather than a single assumed proxy like account size.",
      },
      {
        href: "https://blog.hubspot.com/service/predicting-customer-churn",
        label: "HubSpot: How to Predict (and Prevent) Customer Churn",
        description: "A practitioner account of the specific usage, payment and satisfaction signals that actually correlate with churn risk.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to citing account evidence.",
      },
    ],
  },

  tags: ["sales", "renewals", "customer success", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
