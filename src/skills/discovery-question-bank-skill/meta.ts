import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Discovery Question Bank Skill

Use this skill when you are asked to build, extend, or audit a team's reusable
bank of sales discovery questions, the set reps draw on before a call, not to
review how a specific call went. That is a different job, covered by a
separate skill. This one keeps the question bank itself in good shape:
every question tagged to the right category, no two questions asking the
same thing in different words, no category left with nothing real in it, and
no question phrased so it leads the prospect to the answer the rep wants.

## What belongs in the bank

A discovery question bank is organised by qualification category. The
default four are budget, authority, need, and timeline, but a team's own
real categories (technical fit, current vendor, compliance requirement)
belong just as well, as long as each one is named and defined. Do not force
a question into budget or timeline just because those are the familiar
labels; a category that does not match how the team actually qualifies
deals should be renamed to the category that does.

## Adding a question

Every question added to the bank needs three things stated alongside it,
not left implicit:

1. The exact category it probes.
2. The specific answer that would satisfy that category. Not "learn about
   budget" but "a number, a range, or a named approval threshold." A
   satisfies-when definition this vague is not a definition, it is a
   restatement of the category name.
3. A check that the phrasing does not lead the prospect toward a particular
   answer.

If a proposed question cannot state what specific answer would satisfy its
category, it is not ready to add. Send it back with the missing
satisfies-when line rather than filing it as is.

## Testing a question for a lead

A leading question is phrased so it already contains the answer the rep
wants, and a polite prospect will hand it back with only minor edits. Watch
for an assumed premise, a value judgement built into the wording, or a
"don't you think" framing that invites agreement rather than information.

Worked example: "Don't you think budget is tight this year?" leads the
witness. It assumes budget is tight and asks only for agreement. "What does
your budget look like for this?" does not; it opens the question and lets
the prospect supply the actual number or constraint. Every question flagged
as leading in this skill's output must come with that specific rewrite, the
neutral version that removes the embedded assumption, not just a note that
something is wrong with it.

## Auditing an existing bank

Run three passes over the whole bank, category by category:

1. Redundant questions: two or more questions in the same category asking
   essentially the same underlying fact in different words. Quote both,
   name which one to keep or how to merge them, and say why the surviving
   version covers the ground the other one did.
2. Leading questions: apply the same lead test above to every question
   already in the bank, not only new additions. A leading question that
   slipped in months ago is still a leading question.
3. Gaps: a category with zero questions, or a category whose only questions
   never actually reach a checkable answer, such as a small talk opener
   filed under authority that never asks who signs off. A category is not
   covered just because a question exists under its label.

## Output format for an audit

For each category, report its name, its question count, and every question
in it tagged with one of: OK, REDUNDANT (naming the other question and the
merge recommendation), or LEADING (with the rewrite). Close with an explicit
list of any category that came back as a gap, naming it plainly rather than
folding it into a general note.

## What this skill does not do

It does not run or review a completed sales call; a transcript-scoring job
belongs to a different skill entirely. It does not judge how a rep delivered
a question out loud, only whether the question as written is well tagged,
non redundant, and not leading. It does not write a full call script or
decide question order for a specific call. Its whole job is the bank itself:
the reusable set every call draws from, kept accurate and clean between
calls.
`;

const CATEGORY_EXAMPLES_MD = `# Category examples: good versus leading, by category

Use this alongside \`SKILL.md\` when adding or auditing questions. Each
category below lists a couple of good questions with their satisfies-when
definition, followed by a leading version of a similar question and its
neutral rewrite, so the difference is visible side by side rather than
described in the abstract.

## Budget

Satisfies when: a number, a range, or a named approval process attributed
to the prospect, not a vague comfort level.

Good questions:
- "What does your budget look like for this?"
- "Is there an existing line item for this kind of purchase, or would this
  need a new approval?"

Leading version: "Don't you think budget is tight this year?"
Why it leads: it assumes budget is tight and asks only for agreement.
Rewrite: "What does your budget look like for this?"

## Authority

Satisfies when: the prospect names who else is involved in approving the
purchase and describes at least one concrete step the decision goes
through.

Good questions:
- "Besides yourself, who else needs to sign off before this moves forward?"
- "Walk me through what happens after you decide you want to move ahead."

Leading version: "You're the one who makes this decision, right?"
Why it leads: it hands the prospect the flattering answer and makes
disagreeing socially awkward.
Rewrite: "Who else, if anyone, is involved in a decision like this one?"

## Need

Satisfies when: the prospect describes a specific consequence or cost of
the current problem, not merely a category of interest.

Good questions:
- "What is the current approach costing you, in time, money, or missed
  work?"
- "What happens if this stays exactly as it is for another year?"

Leading version: "This is obviously costing you a lot of time, isn't it?"
Why it leads: it supplies the desired conclusion before the prospect has
said anything.
Rewrite: "What is the current approach costing you, if anything?"

## Timeline

Satisfies when: the prospect names a date, an event, or a consequence that
makes delay costly.

Good questions:
- "Is there a date or event driving when this needs to be solved by?"
- "What happens on your end if this is still unresolved next quarter?"

Leading version: "You'll want this sorted before the end of the quarter,
right?"
Why it leads: it names the answer the rep wants and invites a nod rather
than a real date.
Rewrite: "Is there a date or event that makes this more or less urgent?"

## Adding a team's own categories

A category outside the default four is fine, and often more accurate:
technical fit, current vendor, or a compliance requirement specific to the
industry. Each new category still needs its own satisfies-when definition
written in the same style as the four above: a specific, checkable answer,
not a topic label. A category called "technical fit" with no definition of
what a satisfying answer looks like will collect vague questions the same
way an undefined budget category would.

## A quick test for leading phrasing

Read the question and ask whether removing every adjective, assumption, and
"don't you think" leaves the actual question intact. If the question falls
apart without its leading language, because the leading language was doing
the work of supplying an answer, it needs the same rewrite pattern used
above: state the topic plainly and let the prospect fill in the actual
answer instead of confirming the one already built into the wording.
`;

const meta: SkillMeta = {
  slug: "discovery-question-bank-skill",
  name: "Discovery Question Bank",
  title: "Discovery Question Bank Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that builds and audits a team's bank of sales discovery questions, tagging every question to a qualification category and flagging leading phrasing with the specific rewrite that removes it.",

  seo: {
    primaryKeyword: "discovery question bank skill",
    keywords: [
      "discovery question bank skill",
      "free ai skill for sales discovery questions",
      "downloadable discovery question bank template",
      "ai skill to check for leading sales questions",
      "how to build a sales discovery question bank",
    ],
    seoTitle: "Discovery Question Bank Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable discovery question bank skill that tags every sales question to a qualification category and flags leading phrasing with a rewrite.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/category-examples.md", content: CATEGORY_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to write sales discovery questions, models reliably generate phrasing that already contains the desired answer, such as assuming budget is tight or timeline is urgent, rather than a neutral, open question that lets the prospect supply the actual fact. This skill's lead test requires every flagged question to come with a specific rewrite that removes the embedded assumption, and requires every added question to state the checkable answer that would satisfy its category before it is filed.",
  },

  article: {
    intro: [
      "A discovery question bank skill is not the same job as planning what to ask on one specific call, and it is not the same job as scoring a call after it happened. It is the maintenance work in between: keeping the reusable set of questions a team draws from before every call tagged correctly, free of redundant entries, and free of phrasing that leads a prospect to the answer a rep wants. Teams searching for a free ai skill for sales discovery questions usually already have a list; what they are missing is the upkeep discipline applied to it.",
      "It ships as two plain text files: a main instructions file and a reference file of category examples with good and leading versions of similar questions placed side by side. Both are previewable in full on this page before you download the .zip.",
      "The bank is organised by qualification category, budget, authority, need, and timeline by default, or a team's own real categories when those fit better. Every question in it carries a specific answer that would satisfy its category, not a topic label standing in for one.",
    ],
    sections: [
      {
        heading: "Why a question list is not the same as a question bank",
        body: [
          "A list of discovery questions someone wrote once and never revisited accumulates the same failure a codebase does without review: duplicate entries, categories nobody filled in, and questions that read fine alone but quietly assume the answer they are asking for. A bank, in the sense this skill uses the word, is a list audited on the same three dimensions every time it changes.",
          "That distinction is why this exists as a downloadable discovery question bank template rather than a one-off list of good questions. The value is in the upkeep discipline, not any single clever question.",
        ],
      },
      {
        heading: "Tagging every question to a category, correctly",
        body: [
          "Every question added to the bank states which category it probes and what specific answer would satisfy that category. A budget question is not satisfied by a topic being raised, it is satisfied by a number, a range, or a named approval threshold. An authority question is not satisfied by enthusiasm, it is satisfied by named people and a real step in the approval process.",
          "That separates a real category tag from a filing convenience. A question filed under budget that could just as easily sit under timeline was never really a budget question, it was a general question wearing a label.",
        ],
      },
      {
        heading: "A worked example: good versus leading",
        body: [
          "Take a single topic, budget, and look at two ways to ask about it. \"Don't you think budget is tight this year?\" assumes the answer before the prospect has said a word and invites agreement rather than information. \"What does your budget look like for this?\" asks the same question with the assumption removed, leaving room for an answer that might contradict what the rep expected.",
          "The pattern repeats across categories. Timeline's leading version might assume urgency nobody confirmed. Authority's leading version might hand the prospect a flattering answer that is easier to accept than correct. The fix is always the same: name the topic plainly and remove the language that supplies the answer.",
        ],
      },
      {
        heading: "Finding redundancy and gaps",
        body: [
          "Redundancy hides well because two questions asking the same underlying fact rarely use the same words. \"What's driving the timing on this?\" and \"Is there a deadline you're working against?\" can both sit in a bank looking like separate entries when they are really one question asked twice. An audit pass compares what each question is actually trying to learn, not just its wording.",
          "Gaps hide the opposite way: a category can look covered because a question exists under its label, while that question never reaches a checkable answer. A rapport opener filed under authority that never asks who signs off is a gap wearing a category tag, not a soft touch.",
        ],
      },
      {
        heading: "How this differs from reviewing a completed call",
        body: [
          "A separate skill on this site, the sales call review checklist, scores a transcript against a fixed set of items and reports pass, gap, or unclear per item, with a quoted line behind every verdict. That job starts after a call happened.",
          "This discovery question bank skill works on the other side of the calendar. It never reads a transcript. Its input is the bank itself, and its output is a cleaner bank: correctly tagged, free of duplicate questions and leading phrasing, ready for the next call rather than a verdict on the last one.",
        ],
      },
      {
        heading: "Categories beyond budget, authority, need, and timeline",
        body: [
          "The four familiar categories are a starting point, not a ceiling. A team selling into a regulated industry might need a compliance category with its own satisfies-when definition. A team competing against an entrenched incumbent might need a current vendor category. As an ai skill to check for leading sales questions and gaps alike, the discipline applies the same way to any category name: define a satisfying answer before questions get filed under it.",
          "Anyone working out how to build a sales discovery question bank from nothing should start with categories, not questions: name what the team needs to learn before writing a line to learn it.",
        ],
      },
    ],
    howTo: {
      name: "How to use the discovery question bank skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/category-examples.md directly on this page before downloading, so you know the tagging rule and the lead test before you apply either one.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Bring your current question set, or start from the reference examples",
          text: "Paste in whatever questions the team already asks, or start from the category examples file if nothing is written down yet.",
        },
        {
          name: "Run the three pass audit and update the bank",
          text: "Ask your assistant to tag, check for redundancy, check for leading phrasing, and name any gaps, then fold the rewritten questions back into the version the team actually uses.",
        },
      ],
    },
    faq: [
      {
        question: "How is this different from the sales call review skill?",
        answer:
          "The sales call review skill reads a completed transcript and scores it against a fixed checklist, reporting pass, gap, or unclear per item with a quoted line behind each verdict. This skill never reads a transcript; it audits the reusable bank of questions a team draws from before any call happens, checking category tags, redundant entries, and leading phrasing.",
      },
      {
        question: "What exactly makes a question count as leading?",
        answer:
          "A leading question is phrased so it already contains the answer the rep wants, through an assumed premise, a value judgement, or a framing like don't you think that invites agreement. A prospect can answer a leading question with a small nod. A neutral question has to actually be answered, and the answer can genuinely go either way.",
      },
      {
        question: "What if our sales process doesn't fit budget, authority, need, and timeline?",
        answer:
          "Those four are a starting point, not a requirement. A team can define its own categories, such as technical fit or a compliance requirement specific to its industry, as long as each new category gets the same treatment as the default four: a specific, checkable answer stated before questions are filed under that label.",
      },
      {
        question: "How do I tell a redundant question apart from two genuinely different framings?",
        answer:
          "Compare what each question is actually trying to learn, not the words it uses. Two questions are redundant when a prospect's honest answer to one would already answer the other. They are genuinely different when they could plausibly get different answers from the same prospect, even if the topic sounds similar.",
      },
      {
        question: "Does this skill work before or after a sales call?",
        answer:
          "Before. Its job is maintaining the bank a team draws questions from ahead of a call, not evaluating how a specific call went afterward. Auditing what happened on a call, once it is done, is the separate job the sales call review skill on this site is built for.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the question bank you use the skill with afterward is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/sales-skills/sales-call-review-skill",
        label: "sales call review skill",
        description: "Scores a completed call transcript against a fixed checklist, distinct from this skill's job of maintaining the question bank used before the call.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description: "Plans the specific question sequence for one upcoming call, drawing on the bank this skill keeps clean and correctly tagged.",
      },
      {
        href: "/sales-prompts/sales-call-summary-prompt",
        label: "sales call summary prompt",
        description: "Logs how a deal moved after a call using the answers a well tagged discovery question actually surfaced.",
      },
      {
        href: "/sales-prompts/sales-objection-handling-prompt",
        label: "sales objection handling prompt",
        description: "Handles what a prospect raises once discovery is done, a natural next step once the bank's questions have done their job.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.huthwaiteinternational.com/blog/spin-selling-questions",
        label: "Huthwaite International: SPIN Selling Questions",
        description: "An explainer of the situation, problem, implication, and need-payoff question types from the firm founded on Neil Rackham's original research.",
      },
      {
        href: "https://blog.hubspot.com/sales/bant",
        label: "HubSpot: BANT Sales Qualification Framework",
        description: "A primary reference for the budget, authority, need, and timeline categories this skill's default bank structure draws on.",
      },
      {
        href: "https://cxl.com/blog/leading-questions/",
        label: "CXL: Leading Questions, Definition, Types and Examples",
        description: "An independent explainer of what makes a question leading, with side by side examples that back up this skill's lead test.",
      },
      {
        href: "https://www.highspot.com/blog/discovery-call-questions/",
        label: "Highspot: Discovery Call Questions",
        description: "A working example of discovery questions organised by intent, useful context for how a real bank gets grouped beyond the four default categories.",
      },
    ],
  },

  tags: ["sales", "discovery", "question bank", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
