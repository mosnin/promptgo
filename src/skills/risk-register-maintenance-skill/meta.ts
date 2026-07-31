import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Risk Register Maintenance

Use this skill whenever you are asked to review, update, or report on an
existing risk register, not to build one from scratch. Its job is to catch
the two most common ways a register quietly stops being useful: entries
missing a required field, and entries nobody has actually looked at in
longer than the agreed review window.

## What this skill needs before it can run

Ask for, or locate, the actual current risk register: the real list of
entries as they exist right now, including whatever fields are already
filled in and, critically, the last reviewed date recorded against each
one. Do not invent entries. A team's risks are specific to what that team
has actually identified: their supplier relationships, their delivery
constraints, their compliance obligations. A model that fills gaps with
plausible sounding generic risks is producing decoration, not maintenance.

Also ask for the register's stated review cadence, the number of days
after which an entry is considered overdue for review (for example every
30 days, or every 14 days for a fast moving programme). If no cadence has
been stated, ask for it rather than assuming a default. A 30 day cadence
is a common example, not a fallback to silently apply when none was given.

Finally, ask for the date the maintenance pass is being run. Staleness is
always computed relative to a specific point in time, supplied directly,
never to "now" left implicit or guessed from context.

## The three required fields on every entry

Every entry in a risk register must carry, at minimum:

- Likelihood: a stated level (low, medium, high) or a stated probability band.
- Impact: a stated level or a stated consequence.
- Owner: one named individual, not a team, and not left blank.

Check each existing entry against these three fields using only what is
actually recorded for it. Do not fill in a plausible likelihood, impact,
or owner from the risk description or from a stereotype about that risk
category. If any of the three is missing or blank, mark the entry
INCOMPLETE and list exactly what is missing. An INCOMPLETE entry is never
silently accepted; it is flagged, and it requires the owner to supply the
missing field before the entry counts as maintained rather than merely
present in the document.

## Computing staleness

For every entry with a recorded last reviewed date, compute the number of
days between that date and the maintenance pass date you were given.
Compare that number against the stated review cadence. If the entry has
gone longer than the cadence without a recorded review, mark it STALE and
report exactly how many days overdue it is.

Never guess or assume a last reviewed date. If an entry has no last
reviewed date recorded at all, mark it UNDATED rather than STALE, and
treat UNDATED as more urgent than STALE, since a register with no review
history for an entry cannot even establish how long the gap has actually
been open. Do not backfill a plausible sounding date such as assuming the
entry was reviewed when the register was first created.

## Producing the maintenance report

Output three lists: entries that are current (reviewed within cadence,
all three fields present), entries that are STALE (overdue for review,
otherwise complete), and entries that are INCOMPLETE or UNDATED (missing
a required field or missing a review date entirely, regardless of how
recently they were touched). An entry can appear in both the STALE and
INCOMPLETE lists if it is both overdue and missing a field; list it in
both places rather than picking one.

For every STALE or INCOMPLETE entry, state the specific action needed to
clear it, addressed to the named owner where one exists, or flagged as
needing an owner assigned first if it does not: for example "owner needs
to confirm likelihood and impact" or "owner needs to review the entry and
reset the last reviewed date."

## What this skill does not do

It does not create new risks that were not already in the register you
were given, beyond noting a gap the team has explicitly identified as
something to add later. It does not decide whether a risk is still
relevant or should be closed; that judgment belongs to the owner, and the
skill's job is only to surface that the entry is due for that judgment,
not to make it on the owner's behalf. It does not average, project, or
estimate a last reviewed date when one is missing, and it does not treat
a register with no stated cadence as though a default cadence applied.

## Using the reference format

See \`reference/register-entry-format.md\` for the exact fields an entry
needs (risk description, likelihood, impact, owner, last reviewed,
mitigation) and worked examples showing a current entry, a stale entry,
an incomplete entry, and an undated entry side by side, with the day
count worked out for each.
`;

const REGISTER_FORMAT_MD = `# Risk register entry format and worked examples

Use this alongside \`SKILL.md\`. It defines the six fields a maintained
entry needs and works through four examples against a single maintenance
pass, so the STALE, INCOMPLETE, and UNDATED labels can be checked against
real arithmetic rather than taken on faith.

## The six fields every entry needs

1. Risk description: a specific event and a named consequence, not a
   category heading like "resourcing" or "vendor risk."
2. Likelihood: a stated level (low, medium, high) or a stated probability
   band, recorded against the entry itself.
3. Impact: a stated level or a named consequence, recorded against the
   entry itself.
4. Owner: one named individual, never a team and never left blank.
5. Last reviewed: the actual date, written plainly, that someone last
   checked this specific entry, not the date the register was created.
6. Mitigation: the stated response, and who is responsible for carrying
   it out if the trigger occurs.

An entry missing any of the first four fields cannot be marked current,
no matter how recent its last reviewed date is or how well written its
mitigation is.

## Worked examples: maintenance pass run on 2026-07-31, cadence 30 days

### Example 1: a current entry

Risk: primary logistics vendor misses the peak season delivery window.
Likelihood: medium. Impact: high, estimated at two weeks of lost peak
sales. Owner: Dana Reyes, Supply Chain Lead. Last reviewed: 2026-07-20.
Mitigation: backup vendor contract held in reserve, five day activation.

Assessment: 11 days have passed since the last reviewed date, against a
30 day cadence. All three required fields are present. This entry is
CURRENT.

### Example 2: a stale entry

Risk: renewal terms for the primary cloud hosting contract increase costs
beyond the approved budget. Likelihood: medium. Impact: high, budget
overrun in the next fiscal quarter. Owner: Marcus Chen, Finance Lead.
Last reviewed: 2026-05-15. Mitigation: renegotiate before the auto renew
date, or migrate to the shortlisted alternative provider.

Assessment: 77 days have passed since the last reviewed date, against a
30 day cadence, which is 47 days overdue. All three required fields are
present, so this entry is STALE, not INCOMPLETE. It needs a review, not a
missing field filled in.

### Example 3: an incomplete entry

Risk: a single engineer holds undocumented knowledge of the billing
reconciliation process. Likelihood: high. Impact: (blank). Owner:
(blank). Last reviewed: 2026-07-25.

Assessment: impact and owner are both missing, regardless of how recent
the last reviewed date is. This entry is INCOMPLETE. It cannot become
current until an owner is named and an impact is stated, even though it
would pass the staleness check on its own.

### Example 4: an undated entry

Risk: a key regulatory filing deadline shifts earlier than planned.
Likelihood: low. Impact: high. Owner: Priya Nair, Compliance Lead. Last
reviewed: (blank).

Assessment: no last reviewed date exists, so a day count cannot be
computed at all. This entry is UNDATED, and UNDATED is treated as more
urgent than STALE, because there is no way to know how long this entry
has gone unreviewed.

## Common mistakes when maintaining a register by hand

- Filling in "medium" as a default likelihood or impact when the source
  register leaves the field blank, instead of flagging it as missing.
- Treating an undated entry as though it were newly added and therefore
  not yet due for review, rather than as the most urgent category.
- Silently dropping incomplete entries from the report instead of listing
  them alongside stale ones with a specific action attached.
- Widening the stated review cadence after noticing that many entries are
  overdue, instead of reporting the overdue entries against the cadence
  the team actually agreed to.
`;

const meta: SkillMeta = {
  slug: "risk-register-maintenance-skill",
  name: "Risk Register Maintenance Check",
  title: "Risk Register Maintenance Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that audits an existing risk register against real last reviewed dates and a stated cadence, flags any entry missing a likelihood, impact, or owner as incomplete, and never invents a risk or a review date.",

  seo: {
    primaryKeyword: "risk register maintenance skill",
    keywords: [
      "risk register maintenance skill",
      "free ai skill for risk register maintenance",
      "downloadable risk register review checklist",
      "ai skill to flag stale risk register entries",
      "risk register review cadence skill",
    ],
    seoTitle: "Risk Register Maintenance Skill: Free AI Skill Download",
    seoDescription:
      "A free risk register maintenance skill that flags stale entries against your review cadence and marks missing likelihood, impact, or owner entries.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/register-entry-format.md", content: REGISTER_FORMAT_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models handed an existing risk register tend to summarise or reformat it without checking whether any entry was actually reviewed recently enough, so a register untouched for months reads as maintained simply because it exists and looks complete. This skill computes staleness only from the actual last reviewed date supplied, refuses to guess a missing date, and treats a missing likelihood, impact, or owner as an active defect rather than an acceptable gap.",
  },

  article: {
    intro: [
      "A risk register maintenance skill has one job most AI assistants skip: it does not invent risks, and it does not accept a register as up to date just because it exists on a page. Handed an existing register with real last reviewed dates, it checks every entry against three required fields and a stated review cadence, and flags exactly what has gone stale or gone missing rather than producing a tidy summary that quietly hides the gap.",
      "It ships as two plain text files: a main instructions file and a reference file defining the entry format and four worked examples, a current entry, a stale entry, an incomplete entry, and an undated entry. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "What this skill actually checks",
        body: [
          "This skill is not a generator. It does not produce a list of things that could go wrong; it inspects a list a team has already produced and reports, entry by entry, whether that list is being kept up. Two checks run on every entry: whether likelihood, impact, and owner are actually present and specific, and whether the last reviewed date falls inside the register's own stated cadence. Neither check depends on how plausible the risk description sounds.",
          "A free ai skill for risk register maintenance built this way produces a shorter output than a generator would, because most of what it returns is a report on gaps rather than new content. A register that already has forty entries does not need forty more; it needs to know which of the forty have gone quiet.",
        ],
      },
      {
        heading: "How this differs from building a risk register from scratch",
        body: [
          "A risk register prompt on this site is built for the opposite moment: turning a raw list of worries into a first register, with gates that reject vague entries and assign an owner and a trigger for the first time. This risk register maintenance skill assumes that first pass already happened. It takes an existing register, entries that already have descriptions and dates, and audits whether it is still being looked after, rather than helping write it.",
          "The two are meant to run in sequence. Building a register answers what could go wrong and who owns it. Maintaining one answers a different question: has anyone looked at entry fourteen since March, and does entry nine even have an owner recorded against it right now.",
        ],
      },
      {
        heading: "The three required fields: likelihood, impact, and owner",
        body: [
          "Every entry needs a stated likelihood, a stated impact, and one named owner, not a team, before it counts as maintained rather than merely present. The skill checks only what is actually recorded; it does not infer a likelihood from how the risk is described, and it does not assign a plausible owner such as the project manager when no name was actually given.",
          "An entry missing any one of the three fields is marked INCOMPLETE and listed separately from entries that are simply overdue. Silently accepting a blank owner field is exactly the failure mode this skill exists to catch, since a risk with no named owner is a risk nobody is accountable for once the trigger condition shows up.",
        ],
      },
      {
        heading: "How the staleness flagging mechanism works",
        body: [
          "Staleness is computed, not estimated. Given the stated cadence and the actual last reviewed date recorded against an entry, the skill counts the days between that date and the date the pass is being run, then compares the result to the cadence. An entry that has gone longer than the cadence without a recorded review is marked STALE, with the exact number of overdue days reported next to it.",
          "The date used is always the one supplied, never a guess. As an ai skill to flag stale risk register entries, it does not treat a missing last reviewed date as recently reviewed by default; it marks the entry UNDATED, a category treated as more urgent than STALE, since there is no way to establish how long that gap has actually been open.",
        ],
      },
      {
        heading: "Handling incomplete and undated entries together",
        body: [
          "An entry can be both STALE and INCOMPLETE at once, overdue for review and missing a field, and the skill lists it in both places rather than forcing a single label onto it. Each flagged entry gets a specific next action addressed to its named owner where one exists: confirm likelihood and impact, or reset the last reviewed date after an actual review, not a paperwork touch that resets the clock without a genuine look.",
          "Where no owner is recorded, the action becomes assigning one before any other field can be checked, since an unowned entry has nobody who can confirm the rest.",
        ],
      },
      {
        heading: "Turning a maintenance pass into an action list",
        body: [
          "The output of a pass is three lists, current, stale, and incomplete or undated, plus one specific action attached to every flagged entry. That structure is what makes a risk register review cadence skill usable inside a recurring review meeting rather than a one off audit: the current list gets a glance, and the meeting's time goes to entries that need a person to act before the next pass.",
          "Used this way, a downloadable risk register review checklist stops being a document reviewed once at creation and becomes a recurring discipline, since the same three list report can be regenerated every cadence period against whatever the register actually looks like at that point.",
        ],
      },
    ],
    howTo: {
      name: "How to use the risk register maintenance skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/register-entry-format.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real register, its cadence, and today's date",
          text: "Export or paste the actual current entries with their real last reviewed dates, state the review cadence your team has agreed to, and supply the date the pass is being run.",
        },
        {
          name: "Run a maintenance pass every cadence period",
          text: "Hand all three inputs to your assistant together and require the three list report, current, stale, and incomplete or undated, with a specific action on every flagged entry.",
        },
      ],
    },
    faq: [
      {
        question: "How is this different from a prompt that builds a risk register from scratch?",
        answer:
          "A risk register prompt on this site turns a raw list of worries into a first register, assigning owners and triggers for the first time. This skill assumes that work already happened, and instead audits an existing register for completeness and review timing.",
      },
      {
        question: "What happens if an entry has no last reviewed date at all?",
        answer:
          "It is marked UNDATED rather than STALE, and treated as the more urgent category. A missing date means there is no way to compute how long the entry has gone unreviewed, so it is flagged ahead of entries where the overdue length is at least known.",
      },
      {
        question: "Does the skill ever assign a default likelihood or impact when one is missing?",
        answer:
          "No. A missing likelihood, impact, or owner is always marked INCOMPLETE rather than filled in with a plausible guess. The skill's instructions explicitly forbid inferring a value from the risk description or from what is typical for that category of risk.",
      },
      {
        question: "Can the review cadence be different for different entries in the same register?",
        answer:
          "Yes, as long as each entry's cadence is stated explicitly rather than assumed. If a register uses one cadence overall with exceptions for a few fast moving entries, supply that directly so staleness is computed against the correct number.",
      },
      {
        question: "What if an entry is both stale and incomplete at the same time?",
        answer:
          "It appears on both lists rather than being forced into a single category. The report states that it is overdue for review and names the specific missing field, so the owner, once assigned, knows exactly what clears it.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no register data you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description: "For building a first register from a raw list of worries, with owners and triggers assigned for the first time, before this skill ever has something to maintain.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post mortem prompt",
        description: "For analysing a risk that actually materialised, which is what a register entry becomes once its trigger condition has occurred.",
      },
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description: "A natural place for a STALE or INCOMPLETE finding from a maintenance pass to surface as a named line in a reporting cycle.",
      },
      {
        href: "/skills/business-skills/decision-memo-skill",
        label: "decision memo skill",
        description: "For the decision a flagged risk sometimes forces, such as whether to accept, close, or escalate an entry once its owner has reviewed it.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.gov.uk/government/publications/orange-book",
        label: "HM Treasury: The Orange Book, risk management principles",
        description: "UK government guidance establishing the core concepts of risk management that a maintained register is expected to reflect over time.",
      },
      {
        href: "https://www.coso.org/guidance-erm",
        label: "COSO: Enterprise Risk Management guidance",
        description: "The widely referenced enterprise risk management framework and supporting guidance on ongoing risk monitoring practice.",
      },
      {
        href: "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        label: "NIST SP 800-30 Rev. 1: Guide for Conducting Risk Assessments",
        description: "A primary reference describing risk assessment as part of an ongoing risk management process rather than a one time exercise.",
      },
      {
        href: "https://www.apm.org.uk/resources/what-is-project-management/what-is-risk-management/",
        label: "APM: What is risk management?",
        description: "Independent guidance describing a risk register as a living document used to document risks, analysis, and ownership as a project evolves.",
      },
    ],
  },

  tags: ["business", "risk management", "risk register", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
