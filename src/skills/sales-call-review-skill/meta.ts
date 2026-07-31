import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Sales Call Review Skill

Use this skill when you are handed a sales call transcript and asked whether
the rep actually ran discovery, not whether the call went well in general.
The job is evaluative, not descriptive. Do not summarise the call. Score it
against a named checklist and report a verdict per item.

## What this skill checks

Run the transcript against \`reference/discovery-checklist.md\`. That file
names five specific items: budget, timeline or urgency, decision making
process, pain point or motivation, and a next step the prospect committed to.
Each item has a one line definition of what counts as covered, so the
verdict is never left to feel.

For every item on the checklist, produce exactly one of three verdicts:

- PASS: the transcript shows the item was covered, with the exact line or
  quoted sentence that proves it.
- GAP: the transcript shows the rep had the opening to cover the item and
  did not, or the prospect's answer was deflected without a follow up.
- UNCLEAR: the transcript is too short, cut off, or ambiguous to judge this
  specific item either way.

## The rule that makes this useful

Every GAP verdict must be traceable to an actual absence in the transcript.
Quote the moment the topic was raised and never followed up, or state
plainly that the topic never appears anywhere in the transcript at all.
Never write a GAP as "could have probed more" or "should have dug deeper"
without pointing at the specific line where that probe was skipped. A gap
with no cited evidence is not a finding, it is a guess wearing a verdict.

If the transcript is too short, garbled, or simply never reaches a topic in
a way that lets you judge it fairly, the correct verdict is UNCLEAR, written
as "not enough transcript to judge this item." Do not round an unclear case
up to a PASS because the call sounded generally positive, and do not round
it down to a GAP because nothing was said. Guessing in either direction is
the exact failure this skill exists to prevent.

## Output format

For each of the five checklist items, in order, write:

1. The item name.
2. The verdict: PASS, GAP, or UNCLEAR.
3. The quoted line or lines the verdict rests on, or the words
   "not enough transcript to judge this item" when that is the honest
   answer.
4. One sentence connecting the quote to the checklist's definition of
   covered, so the verdict is checkable by someone who has not read the
   whole transcript.

Close with a one line summary counting how many items passed, gapped, and
came back unclear. Do not average these into a single score out of ten and
do not describe the call as good or bad discovery in general terms; the
five verdicts are the finding, not a headline judgement layered on top of
them.

## What this skill does not do

It does not judge rapport, energy, likability or how the call felt to be
on. None of that is checkable from a transcript in a way this skill trusts.
It does not invent a quote that is close to what someone said; if the exact
wording cannot be located, treat the item as unclear rather than
paraphrasing a line into existence. It does not coach the rep on delivery,
only on whether the five checklist items were actually covered and where
the transcript proves it.
`;

const DISCOVERY_CHECKLIST_MD = `# Discovery checklist: five checkable items

Use this alongside \`SKILL.md\`. Each item below states, in one line, exactly
what counts as covered. A rep does not get credit for raising a topic that
the prospect then avoided; covered means the transcript shows an answer, not
just a question.

## 1. Budget

Covered when the transcript contains a specific number, a range, or a named
approval process attributed to the prospect, such as a threshold that
triggers a different signoff. A rep asking about budget and the prospect
changing the subject is not covered, it is a gap, because the question
without an answer proves nothing about what the prospect can actually spend.

## 2. Timeline or urgency

Covered when the prospect names a date, an event, or a consequence that
makes delay costly, such as a contract renewal, a compliance deadline, or a
fiscal year boundary. A prospect saying they want to move quickly with no
date or event attached is not covered. Enthusiasm about speed is not a
timeline, it is a mood, and this checklist only credits the version with a
named anchor.

## 3. Decision making process

Covered when the prospect names who else is involved in approving the
purchase, and describes at least one concrete step the decision goes
through, such as a security review, a procurement stage, or a second
stakeholder who must sign off. A prospect saying "I can make this call" with
no mention of anyone else counts as covered only if the transcript also
shows the rep asking a follow up that confirms no one else is involved,
since a single sentence claiming sole authority is easy to overstate.

## 4. Pain point or motivation

Covered when the prospect describes a specific consequence or cost of the
current problem, not merely a category of interest. "We're looking at
options in this space" is not covered. "We lost two clients last quarter
because our reporting couldn't handle this" is covered, because it names a
concrete cost the current situation is producing.

## 5. Next step committed to

Covered when the transcript shows a specific action, an owner, and a time
for what happens after the call, agreed to by both sides. A prospect saying
"sounds good, let's stay in touch" with no named action is not covered. A
rep saying they will send a follow up with no reply or acknowledgement from
the prospect is a gap, not a pass, because a commitment needs both parties
on record.

## How to apply this when the transcript has no line numbers

If the transcript is not numbered, quote the exact sentence from the
relevant speaker turn instead of a line number, and name the speaker if the
transcript labels speakers at all. The requirement is a verifiable pointer
into the actual text, not a specific numbering scheme; a quoted sentence
does that job just as well as a line number does.

## How to apply this when a topic never comes up

If a checklist item is never raised anywhere in the transcript, that is
still a gap, not an automatic unclear. Reserve the unclear verdict for cases
where the transcript is cut off, garbled, or genuinely too short to have
reached the topic yet, such as a call that ends eight minutes in before
discovery would normally get that far.
`;

const meta: SkillMeta = {
  slug: "sales-call-review-skill",
  name: "Sales Call Review Checklist",
  title: "Sales Call Review Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that scores a sales call transcript against a five item discovery checklist, citing the exact line behind every pass and every gap instead of a general impression.",

  seo: {
    primaryKeyword: "sales call review skill",
    keywords: [
      "sales call review skill",
      "free ai skill for sales call review",
      "downloadable sales discovery checklist",
      "ai skill to check sales call transcripts",
      "how to review a sales call against meddic",
    ],
    seoTitle: "Sales Call Review Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable sales call review skill that scores a transcript against a five item discovery checklist and quotes the line behind every verdict.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/discovery-checklist.md", content: DISCOVERY_CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review a sales call for discovery quality, models default to a single fluent verdict such as good discovery overall or the rep should have probed budget more, without pointing at a specific line the judgement rests on. That phrasing survives a skim and collapses the moment someone checks it against the actual transcript. This skill's per item structure forces every gap to name the missing evidence and requires an unclear verdict rather than a guess when the transcript genuinely does not settle the question.",
  },

  article: {
    intro: [
      "A sales call review skill is only worth downloading if its verdicts survive someone actually rereading the transcript. Ask a model whether a call showed good discovery and it will give you a fluent paragraph that sounds like a judgement and traces to nothing in particular. This skill exists to close that gap: it scores a call against five named checklist items and requires a quoted line behind every pass and every gap it reports.",
      "It ships as two plain text files: a main instructions file and a five item discovery checklist the instructions point to. Both are previewable in full on this page before you download the .zip.",
      "The checklist itself is deliberately narrow. Budget, timeline or urgency, decision making process, pain point or motivation, and a next step committed to: five items, each with a one line definition of what covered means, so a pass cannot be awarded on tone alone.",
    ],
    sections: [
      {
        heading: "Why a general verdict is not a review",
        body: [
          "The natural output of asking a model to review a call is a paragraph: the rep built rapport well, discovery felt thorough, next steps were a little vague. None of that points at a place in the transcript where someone could check it. This skill forces a different shape: five items, three possible verdicts each, and a quote or an explicit not enough transcript to judge behind every one.",
          "That structure is what makes this a free ai skill for sales call review worth trusting rather than a fluent summary wearing the shape of an audit. A verdict with no citation is an opinion. A verdict with a quoted line is a finding someone else can check in thirty seconds.",
        ],
      },
      {
        heading: "The five item discovery checklist",
        body: [
          "Each checklist item is a downloadable sales discovery checklist entry with its own one line definition of covered, held in a reference file the main instructions point to. Budget is covered by a number or a named approval process, not a question the prospect deflected. Timeline is covered by a named date or event, not enthusiasm about moving fast. Decision process is covered by named people and a concrete step, not a single unchecked claim of sole authority.",
          "Pain point is covered by a specific cost the current situation is producing, not a category of interest. Next step is covered by an action, an owner and a time both sides are on record agreeing to, not a one sided offer to follow up.",
        ],
      },
      {
        heading: "How this differs from the sales call summary prompt",
        body: [
          "The sales call summary prompt already on this site has a related but distinct job: it logs how a deal moved since the last call, records commitments and blockers with owners and dates, and produces one flat forecast line. It answers what changed in the deal.",
          "This sales call review skill answers a different question: did the rep actually run discovery on this call, checked against a fixed five item standard, regardless of the deal's prior state. There is no delta and no forecast line here. A call can score well on the review checklist and still show no deal movement. Use the summary prompt to update the CRM. Use this skill to audit whether discovery itself was done properly.",
        ],
      },
      {
        heading: "As an ai skill to check sales call transcripts, what a gap actually requires",
        body: [
          "A gap verdict is the part of this skill most likely to get lazy without the checklist's discipline. It is easy to write the rep should have probed budget more and move on. It is harder to quote the exact moment budget came up and was let go, or state plainly that the word budget never appears in the transcript.",
          "That distinction between a soft impression and a cited gap is the entire value of running this as a skill. Every gap has to survive someone opening the transcript and checking the line the verdict names.",
        ],
        list: [
          "PASS: quoted line shows the item was answered, not just asked.",
          "GAP: the topic was raised and dropped, or never appears anywhere in the transcript.",
          "UNCLEAR: the transcript is cut off or too short to reach the topic fairly.",
        ],
      },
      {
        heading: "How to review a sales call against MEDDIC without inventing evidence",
        body: [
          "The five item checklist here maps loosely onto the metrics, economic buyer, decision criteria, decision process, identify pain and champion structure MEDDIC-style frameworks use, and onto the budget, authority, need and timeline shorthand BANT-style frameworks use, without requiring either acronym by name. Both share the insistence that a qualification claim needs a specific answer behind it, not a topic that was merely mentioned.",
          "Naming a framework does not do the checking. A transcript that mentions budget once, in passing, with no number attached, has not satisfied a MEDDIC-style metrics check any more than it satisfies this skill's budget item, and the review should say so with the same quoted evidence either way.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not average five verdicts into a single score out of ten, and it will not describe a call as good or bad discovery once the verdicts are in front of the reader. It will not judge rapport or energy, none of which is checkable from a transcript, and it will not soften an unclear verdict into a pass because the call's tone was positive.",
        ],
      },
    ],
    howTo: {
      name: "How to use the sales call review skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/discovery-checklist.md directly on this page before downloading, so you know exactly what standard the review is being run against.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather a labelled transcript",
          text: "Before running the review, get a transcript that identifies speakers by turn. If it has no line numbers, that is fine; the skill quotes sentences instead.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the checklist file, then supply the transcript and ask for a verdict on each item.",
        },
      ],
    },
    faq: [
      {
        question: "How is this different from the sales call summary prompt?",
        answer:
          "The summary prompt logs deal movement since the last call, records commitments and blockers with owners and dates, and closes with a forecast line. This skill checks a single call against a fixed five item discovery checklist and reports pass, gap or unclear per item, with a quoted line behind each verdict. One tracks deal state, the other audits whether discovery was actually run.",
      },
      {
        question: "What happens if the transcript is too short to judge an item fairly?",
        answer:
          "The correct verdict is unclear, written out as not enough transcript to judge this item, rather than a guessed pass or gap. This matters most on calls that end early, before discovery would normally reach every topic, and the skill's instructions explicitly forbid rounding an unclear case toward whichever verdict the overall tone of the call suggests.",
      },
      {
        question: "Does this skill require using MEDDIC or BANT by name?",
        answer:
          "No. The five checklist items borrow the same discipline those frameworks use, requiring a specific answer rather than a mentioned topic, but the checklist works on its own without naming either acronym in the output. Teams already using MEDDIC or BANT internally can map the five items onto their existing terms.",
      },
      {
        question: "Can I add more items to the discovery checklist?",
        answer:
          "Yes. The checklist is a separate plain text file so it can be extended without restructuring the main instructions that point to it. Add a new item with its own one line definition of what covered means, following the same pattern as the five that ship with the skill.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the transcripts you run through the skill afterward is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit the checklist after downloading it?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing the checklist's wording or definitions happens afterward, in your own editor.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "Logs how the deal moved since the last call, distinct from this skill's job of scoring whether discovery itself was run.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description: "Plans the questions a rep asks before the call, the same five topics this skill later checks were actually answered.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "The natural next step once budget and decision process pass this checklist, for preparing the trades to offer on a later call.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description: "Reads a whole sequence of closed deal calls, useful once several of them have already been through this skill's review.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.close.com/blog/meddic-sales-methodology",
        label: "Close: MEDDIC Sales Methodology",
        description: "An independent explainer of the metrics, economic buyer, decision criteria, decision process, identify pain and champion structure this checklist's items draw on.",
      },
      {
        href: "https://blog.hubspot.com/sales/bant",
        label: "HubSpot: BANT Sales Qualification Framework",
        description: "A primary reference for the budget, authority, need and timeline shorthand behind this checklist's budget and timeline items.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to citing transcript evidence.",
      },
    ],
  },

  tags: ["sales", "discovery", "call review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
