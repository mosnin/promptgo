import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Process Documentation Staleness Check

Use this skill when you are given two real things: a written internal process document or
standard operating procedure, as it currently reads step by step, and a real description of
how that process is actually carried out today, described by the person who does it. The job
is to check every documented step against the described real practice and say, for each one,
whether the document still matches reality.

## The one job this skill does

It does not rewrite the process document, and it does not decide which version, the document
or the practice, is the correct one to follow going forward. A documented step and a change in
real practice are just two facts to compare. The only question this skill answers is whether
they still agree, and if not, exactly how they differ.

## Required input

Both of the following, as real text, not summarised or paraphrased by you:

1. The process document, with each step distinguishable (numbered steps, a numbered list, or
   clearly separated instructions).
2. A real description of current practice, from the person who actually performs the process,
   covering the same ground the document covers.

If only the document is supplied, with no real description of current practice, say so plainly
and stop. Do not infer or assume that a documented step is still followed just because it is
written down. A process document describes an intended state at the time it was written; it is
not evidence about what happens today. The same caution applies in reverse: do not assume a
described practice is more accurate than the document without treating both as claims to check
against each other.

## Step 1: break the document into individually checkable steps

List every step in the document in order, exactly as documented, using the document's own
wording. Do not summarise or condense two documented steps into one, and do not add a step the
document does not contain.

## Step 2: check each documented step against the described practice

For every documented step, find the part of the described current practice that covers the
same ground, and classify it into exactly one of four outcomes:

- Matches: the documented step and the described practice agree on what is done, in what order,
  with what tool, and who approves it.
- Changed: the step is still performed, but something about it differs, a different tool, a
  different order, a different approver, a different timeframe, from what the document states.
- Skipped: the description of current practice does not mention the step being performed at
  all, or states directly that it is no longer done.
- Added: the described current practice includes a real step that does not appear anywhere in
  the document.

## Step 3: quote both sides for every flag, always

A flag is not complete until it quotes the documented step's exact wording and the exact
wording used to describe current practice for that same ground. Never write a verdict such as
"this step has drifted" without both quotes sitting next to each other. The person reading the
output should be able to see the disagreement directly, in the original words, rather than
trust a paraphrase.

## Step 4: never assume a step is still followed because the document says so

The single most important discipline in this skill: the document is not evidence of current
behaviour, only of what was once intended or written down. Every verdict must trace to
something actually stated in the description of current practice, never to the absence of a
contradiction. If the description of current practice does not address a documented step at
all, treat that as unconfirmed, not as a match.

## Step 5: report added steps separately

After working through every documented step, check the description of current practice one
more time for anything it mentions that no documented step covers at all. Report each one as an
added step, quoting the real description that mentions it, rather than folding it silently into
whichever documented step happens to sit nearby.

## What this skill does not do

It does not recommend which version should become the new standard, does not rewrite the
process document, and does not guess why a step changed beyond what the description of current
practice actually states. It does not treat a skipped step as automatically wrong; some steps
are skipped on purpose as a process matures, and that judgment belongs to the people who own
the process, not to this skill. Cross check the exact output shape against
\`reference/expense-reimbursement-worked-example.md\` before finishing, since it works one real
comparison end to end showing every one of the four outcomes.

## The limitation to state every time

This check is only as accurate as the description of current practice it was given. A short or
vague description of practice will produce a short or vague comparison, not a thorough one, and
a description from only one person on a team may not reflect how every team member actually
performs the process. Every output should end with a plain statement that the described
practice should be confirmed with more than one person doing the work before any documented
step is formally changed based on this comparison alone.
`;

const WORKED_EXAMPLE_MD = `# Worked example: an expense reimbursement SOP against real current practice

Use this alongside \`SKILL.md\`. It runs the five step process against a short, realistic five
step process document and a real description of how the process is actually performed today,
showing a match, a changed step, a skipped step, and an added step that the document never
mentions.

## The process document, as supplied

**Expense Reimbursement SOP, five steps:**

1. "Employee submits an expense report with itemised receipts through the internal expense
   portal within 30 days of the purchase date."
2. "Manager reviews the submitted report in the portal and clicks approve or reject within 5
   business days of submission."
3. "Finance cross checks each receipt against the corresponding company card statement line
   before processing."
4. "Finance issues the reimbursement by direct deposit within 10 business days of manager
   approval."
5. "Finance archives the approved report and its receipts in the shared drive for seven years."

## The described current practice, as supplied

A real description given by the finance associate who currently runs this process:

"People still upload their receipts and fill out the report in the portal within about a
month of buying something, same as always. But nobody actually clicks the approve button in
the portal anymore, the receipts get posted into a Slack thread with the manager and the
manager just replies 'approved' there, usually the same day, way faster than the five days it
used to take. We stopped checking receipts against the company card statement completely,
because most people switched to using their personal card and getting reimbursed, the company
cards were phased out earlier this year so there is no statement left to check against. Direct
deposit still goes out and it is still roughly ten business days after approval, that part
has not changed. One thing that is new: before I can actually process the payment, I have to
attach a screenshot of the Slack approval message to the reimbursement record, because
otherwise there is no record anywhere that a manager signed off, since it never touches the
portal now."

## Step by step comparison

**Step 1 (submission via portal within 30 days).**
Documented: "Employee submits an expense report with itemised receipts through the internal
expense portal within 30 days of the purchase date."
Described practice: "People still upload their receipts and fill out the report in the portal
within about a month of buying something, same as always."
Verdict: Matches. Same tool, same rough timeframe, no disagreement stated.

**Step 2 (manager approval in the portal within 5 business days).**
Documented: "Manager reviews the submitted report in the portal and clicks approve or reject
within 5 business days of submission."
Described practice: "Nobody actually clicks the approve button in the portal anymore, the
receipts get posted into a Slack thread with the manager and the manager just replies
'approved' there, usually the same day."
Verdict: Changed. Different tool, Slack instead of the portal's approve button, and a
different timeframe, same day instead of up to five business days.

**Step 3 (cross check receipts against the company card statement).**
Documented: "Finance cross checks each receipt against the corresponding company card
statement line before processing."
Described practice: "We stopped checking receipts against the company card statement
completely, because most people switched to using their personal card and getting reimbursed,
the company cards were phased out earlier this year so there is no statement left to check
against."
Verdict: Skipped. The description states directly the step is no longer performed, and gives
the reason, so this is a confirmed skip, not an unconfirmed gap.

**Step 4 (reimbursement by direct deposit within 10 business days).**
Documented: "Finance issues the reimbursement by direct deposit within 10 business days of
manager approval."
Described practice: "Direct deposit still goes out and it is still roughly ten business days
after approval, that part has not changed."
Verdict: Matches. Same method and same timeframe, and the description explicitly confirms no
change.

**Step 5 (archiving in the shared drive for seven years).**
Documented: "Finance archives the approved report and its receipts in the shared drive for
seven years."
Described practice: The description does not mention archiving, retention, or the shared
drive at any point.
Verdict: Unconfirmed, not a match. The document is not evidence that archiving still happens;
the absence of any mention in the description of current practice means this step cannot be
verified either way and should be asked about directly rather than assumed to still be
followed.

## Added step, not in the document

Described practice: "Before I can actually process the payment, I have to attach a screenshot
of the Slack approval message to the reimbursement record, because otherwise there is no
record anywhere that a manager signed off, since it never touches the portal now."
Verdict: Added. No documented step mentions attaching an approval screenshot to the
reimbursement record, and the description states this is now a required part of the process,
introduced as a direct consequence of the change in step 2.

## Why the output is organised this way

Each verdict sits directly under its two quotes, documented step first, described practice
second, so the disagreement or agreement is visible without trusting a summary. The
unconfirmed step for archiving is not marked as either a match or a skip, because neither
quote actually supports that conclusion, which is the same discipline the skill applies to
every comparison it runs.
`;

const meta: SkillMeta = {
  slug: "process-documentation-staleness-check-skill",
  name: "Process Documentation Staleness Check",
  title: "Process Documentation Staleness Check Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that checks a written internal process document step by step against a real description of current practice, quoting both sides for every match, change, skip, and added step it finds.",

  seo: {
    primaryKeyword: "process documentation staleness check skill",
    keywords: [
      "process documentation staleness check skill",
      "free ai skill for process documentation staleness check",
      "downloadable sop accuracy checklist",
      "ai skill to check sop against actual practice",
      "how to audit standard operating procedures for drift",
    ],
    seoTitle: "Process Documentation Staleness Check Skill: Free Download",
    seoDescription:
      "A free, downloadable process documentation staleness check skill that compares a written SOP against real current practice, quoting both sides for every flag.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    {
      path: "reference/expense-reimbursement-worked-example.md",
      content: WORKED_EXAMPLE_MD,
      kind: "markdown",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models handed a process document and a description of current practice reliably default to summarising both separately, or worse, treating the documented steps as the accurate baseline whenever the description of practice is vague on a point, rather than flagging that point as unconfirmed. This skill's four outcome structure, matched, changed, skipped, added, forces every documented step to be checked against something actually stated in the description rather than assumed from the document's own wording, and requires both sides quoted side by side before any verdict is treated as finished.",
  },

  article: {
    intro: [
      "A process documentation staleness check skill is only useful if it refuses the easy shortcut: trusting the document because it is the one written down neatly. Handed a five step SOP and nothing else, most AI assistants will treat that document as the ground truth and never ask whether anyone still performs it that way. This is the free ai skill for process documentation staleness check work that compares the document against a real description of current practice instead, step by step, and says plainly when a step cannot be confirmed either way.",
      "It ships as two plain text files: a main instructions file and a worked reference example running the full comparison against a five step expense reimbursement process. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a documented step is not evidence of current behaviour",
        body: [
          "A process document captures an intended state at the moment it was written. Nothing about its continued existence on a shared drive confirms that anyone still performs the process the way it describes, especially where the person who wrote a procedure down is rarely the person still running it a year later. Any real process documentation staleness check skill has to refuse the document as the default correct answer, and stop outright when only the document is supplied with no real description of practice to check it against.",
        ],
      },
      {
        heading: "The four outcomes every documented step gets classified into",
        body: [
          "Every documented step is checked against the described current practice and sorted into exactly one of four outcomes: matches, changed, skipped, or unconfirmed when the description simply does not address it. A fifth category, added, catches anything the description of current practice mentions that no documented step covers at all, reported separately rather than folded into whichever nearby step it resembles.",
          "This is what turns a downloadable sop accuracy checklist into something a team can act on: not a general sense that a document feels out of date, but a specific list of which steps still hold, which have drifted, and in what direction, using this ai skill to check sop against actual practice rather than a guess.",
        ],
      },
      {
        heading: "How this differs from a code comment staleness audit",
        body: [
          "A code comment staleness audit checks whether a comment's claim about program behaviour still matches the code beneath it, using the code itself as the thing being checked, a single artifact read straight through by the same reader. This skill checks something structurally different: a business process document against a separate, independently sourced account of human behaviour, gathered by asking the person who performs the process, not by reading one artifact more closely.",
          "Code and its comments live in one file, read together in the same pass; a process document and current practice live in two different places, and the second has to be actively gathered from a person. This skill is for SOPs, checklists, and internal process documents specifically, never for source code or code comments.",
        ],
      },
      {
        heading: "How this differs from a config drift detection skill",
        body: [
          "A config drift detection skill compares two machine readable value sets, an expected configuration and an actual configuration snapshot, key by key, where every entry either matches or does not. There is no human interpretation step; a config value is present, absent, or different, and a snapshot can in principle be pulled automatically.",
          "This skill compares something with no equivalent machine snapshot: a documented sequence of human actions against a described account of how people carry those actions out, read for meaning rather than diffed byte for byte. A missing config key and a skipped process step are both real findings, but one comes from a snapshot tool and the other only from asking someone who does the work.",
        ],
      },
      {
        heading: "How the four categories play out in a real comparison",
        body: [
          "In the worked reference example, an expense reimbursement SOP's five steps split across every outcome this skill produces: one matches exactly, one has changed tool and timeframe, one has been skipped for a stated reason, one cannot be confirmed, and one entirely new step exists that the document never mentions. Knowing how to audit standard operating procedures for drift means expecting this kind of mixed result, not a uniformly clean or uniformly broken document.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not decide which version, the document or the practice, should become the new standard, and it does not rewrite the process document. It does not guess why a step changed beyond what the description states, and it does not treat a skipped step as automatically a problem; some steps are skipped deliberately as a process matures, and that judgment belongs to the people who own the process.",
        ],
      },
    ],
    howTo: {
      name: "How to use the process documentation staleness check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/expense-reimbursement-worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real process document and a real description of practice",
          text: "Collect the actual SOP or process document with its steps clearly separated, then get a written description of how the process is currently performed from the person who actually does it.",
        },
        {
          name: "Hand both real inputs to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply the document and the described practice together, not the document alone.",
        },
        {
          name: "Review every flag with both quotes present",
          text: "Check that each matched, changed, skipped, unconfirmed, or added verdict quotes the documented step and the described practice side by side before treating any finding as settled.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have the process document and no description of current practice?",
        answer:
          "The skill says so plainly and stops rather than proceeding on the document alone. A process document is not evidence about what happens today, so a real description of current practice from the person who does the work is a required second input.",
      },
      {
        question: "Does the skill decide whether the document or the actual practice is correct?",
        answer:
          "No. It only reports whether the two agree and, where they do not, how they differ, quoting both sides. Deciding which version should become the new standard is a judgment call for the people who own the process, not something this skill attempts to make.",
      },
      {
        question: "What if the description of current practice does not mention a documented step at all?",
        answer:
          "That step is reported as unconfirmed rather than assumed to be a match or a skip. The skill never treats the document's own wording as proof a step is still followed, so silence in the description is a gap to flag, not evidence either way.",
      },
      {
        question: "How is this different from checking whether code comments match code behaviour?",
        answer:
          "A code comment staleness check reads one artifact, code and its comments together in a single file, comparing a claim to visible behaviour in that same file. This skill compares a business process document to a separately gathered account of human practice, described by the person doing the work.",
      },
      {
        question: "How is this different from a config drift detection skill?",
        answer:
          "A config drift detection skill compares two machine readable value sets, an expected configuration and a real snapshot, where every entry is a discrete value. This skill compares a documented sequence of human actions to a described account of current practice, which requires interpretation rather than an automated snapshot.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the process document or practice description you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing happens in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description: "For writing a new process document from scratch by interviewing the person who does the work, rather than checking an existing one against current practice.",
      },
      {
        href: "/business-prompts/post-mortem-prompt",
        label: "post-mortem prompt",
        description: "A natural companion once a staleness check surfaces a skipped or changed step that caused a real incident worth documenting.",
      },
      {
        href: "/business-prompts/onboarding-plan-prompt",
        label: "onboarding plan prompt",
        description: "For building a new hire's ramp plan once a process document has been confirmed to actually match how the work is done.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing exactly what changed between an old version of a process document and a rewritten one, line by line.",
      },
    ],
    externalLinks: [
      {
        href: "https://asana.com/resources/standard-operating-procedure",
        label: "Asana: How to write a standard operating procedure",
        description: "An independent explainer on what a documented SOP is meant to capture and why it drifts from real practice over time.",
      },
      {
        href: "https://www.iso.org/standard/71107.html",
        label: "ISO 9001:2015 quality management overview",
        description: "A real, authoritative standard describing why documented processes require periodic review against actual practice.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to comparing document and practice.",
      },
    ],
  },

  tags: ["business", "sop", "process documentation", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
