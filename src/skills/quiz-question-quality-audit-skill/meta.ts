import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Quiz Question Quality Audit

Use this skill whenever you are handed a set of existing multiple choice quiz
questions, an answer key, or a bank of items pulled from a textbook, a
learning platform, or a colleague's course, and asked whether the questions
themselves are well built. This skill does not write new questions. It reads
questions someone already wrote and reports, item by item, where the
construction breaks a named rule.

## Before you audit anything

Confirm you have the full item: the stem, every answer option in the order
given, and which option is marked correct. An audit run against only the
correct answer, with the distractors missing, cannot check most of the rules
below and should say so rather than proceeding on a partial item.

If the source material includes a rationale or teaching note for why an
option is correct or incorrect, keep it beside the item while auditing. It
tells you what the item writer intended, which matters when you are judging
whether a distractor is a genuine wrong answer or a second correct one in
disguise.

## Run every item against reference/item-writing-checklist.md

That file names six specific, checkable rules: no crutch "all of the above"
or "none of the above" option, every distractor plausible to someone who has
not mastered the material, exactly one clearly correct answer, no
grammatical mismatch between the stem and the options that leaks the answer,
options that are parallel in length and form, and negative wording that is
impossible to misread. For every item:

1. Quote the stem and every option exactly as written, numbering the options
   so your flags can refer to them without ambiguity.
2. Check the item against each of the six rules in turn. Do not skip a rule
   because the item looks fine at a glance; a stem can pass five rules and
   fail the sixth.
3. For every rule the item fails, name the rule, quote the exact phrase or
   option that breaks it, and state what specifically is wrong. A flag that
   says an item "could be clearer" without naming a rule and quoting the
   offending text is not an audit finding and should not be reported as one.
4. If an item passes all six rules, say so plainly rather than inventing a
   minor stylistic complaint to have something to report.

## What a real flag looks like

A flag must name the violated rule, quote the offending text, and explain
the mechanism, not just assert a problem. "Option D, 'all of the above,' is
a crutch distractor under rule one: it is chosen whenever a test taker
recognizes two other options as correct without reading option D at all,
so it does not test knowledge of D's specific content." That sentence names
the rule, quotes the text, and states the mechanism. "This question has a
weak option D" does not, and should never appear in your output.

## Summarising a batch

After auditing every item individually, produce one summary table: item
number, rules failed (or "none"), and the single highest priority fix. Do
not average the items into a vague quality score. A set of twenty items
where three have grammatical answer leakage is a different, more urgent
problem than a set where every item has one slightly implausible distractor,
and a single score would hide that difference from the person who has to
decide what to fix first.

## What this skill does not do

It does not generate new questions, new distractors, or a rewritten item.
Where a fix is obvious, you may suggest the specific replacement text
alongside the flag, but the deliverable is the audit, not a new quiz. It
also does not judge whether the tested content is the right content to
test; that is a curriculum question outside a construction audit, and
should be left to the person who owns the syllabus.
`;

const ITEM_WRITING_CHECKLIST_MD = `# Item writing checklist: six named rules

Use this alongside SKILL.md. Each rule below states the failure condition,
one fail example and one pass example, so a flag can quote the rule
number and the exact text it applies to instead of describing a vague
impression.

## Rule 1: no crutch "all of the above" or "none of the above"

Fail condition: an option reads "all of the above," "none of the above," or
a close variant used as one of the four choices, rather than as the tested
content itself.

Fail example: stem "Which of these is a prime number," options "7," "9,"
"15," "all of the above." A test taker who recognizes 7 as prime can select
option four without ever evaluating 9 or 15, so the option tests
recognition of one fact, not the full set.

Pass example: stem "Which of these numbers is prime," options "7," "9,"
"15," "21." Every option must be individually evaluated to find the one
correct answer, so no shortcut option exists.

## Rule 2: every distractor must be plausible

Fail condition: an option is obviously wrong to a reader who has not
studied the material at all, usually because it is absurd, off topic, or
far outside the scale of the correct answer.

Fail example: stem "What is the boiling point of water at sea level in
degrees Celsius," options "100," "0," "negative 40," "one million." The
final option is not a plausible wrong answer to anyone, so it earns zero
selections and tests nothing.

Pass example: same stem, options "100," "0," "212," "98.6." Each wrong
option is a real number someone could confuse with the answer, from a
Fahrenheit conversion or a related constant, so choosing wrong reveals a
specific, nameable confusion.

## Rule 3: exactly one clearly correct answer

Fail condition: two options are each individually defensible as correct
under a reasonable reading of the stem, so a well prepared test taker can
argue for either one.

Fail example: stem "Which of these is the largest planet by diameter in
our solar system," with both "Jupiter" and "the largest planet" phrased as
separate options due to a drafting error, or a stem asking for "the best
explanation" where two options are both textbook accurate but differ only
in emphasis.

Pass example: stem asks for a single named, checkable fact with one
verifiably correct option, and every distractor is checkable as
definitively wrong against the same source, not merely less complete.

## Rule 4: no grammatical mismatch between stem and options

Fail condition: the stem's wording, most often the article "a" or "an"
immediately before the blank, only agrees grammatically with one option,
so the answer can be selected without evaluating the content at all.

Fail example: stem "The cell structure that controls what enters and
exits the cell is a ___," with options "endoplasmic reticulum," "cell
membrane," "organelle," "nucleus." Only "cell membrane" avoids an
awkward "a organelle" or "a endoplasmic reticulum" reading, so the
grammar alone points to the answer.

Pass example: rewrite the stem as "The cell structure that controls what
enters and exits the cell is the ___," which agrees with every option
equally, or rewrite every option to share the same leading sound.

## Rule 5: options are parallel in length and grammatical form

Fail condition: the correct option is noticeably longer, more precisely
qualified, or grammatically different in form from the distractors, which
lets a test taker select it on form rather than content.

Fail example: three short one word distractors against a correct option
that is a full qualified sentence with extra hedging detail, such as
"only under specific laboratory conditions where temperature and pressure
are both controlled."

Pass example: every option is a similar length, uses the same part of
speech, and carries a comparable level of detail, so length and phrasing
give no information about which one is correct.

## Rule 6: negative wording must be unmistakable

Fail condition: the stem uses "not," "except," or "least" without visual
emphasis, buried in a long sentence where it is easy to misread the stem
as asking for the opposite of what it actually asks.

Fail example: "Which of the following is not a function of the liver in
the human digestive system," with "not" printed in plain lowercase text in
the middle of a long sentence, easy to skim past under time pressure.

Pass example: "Which of the following is NOT a function of the liver,"
with the negation capitalized, bolded, or otherwise visually distinct from
the surrounding sentence, or the stem rewritten in the positive to avoid
the negation entirely.

## Using this checklist on a batch

Work through the six rules in the same order for every item in the batch,
rather than switching order between items, so nothing gets skipped by
habit. An item can fail more than one rule at once, most often rule two and
rule five together, since an implausible distractor is often also the
shortest or the most awkwardly phrased option in the set.
`;

const meta: SkillMeta = {
  slug: "quiz-question-quality-audit-skill",
  name: "Quiz Question Quality Audit",
  title: "Quiz Question Quality Audit Skill",
  category: "education-skills",
  summary:
    "A downloadable instruction pack that audits an existing set of multiple choice quiz questions against six named item writing rules, quoting the exact stem or option that breaks each one instead of giving a vague quality impression.",

  seo: {
    primaryKeyword: "quiz question quality audit skill",
    keywords: [
      "quiz question quality audit skill",
      "free ai skill to audit quiz questions",
      "downloadable multiple choice item writing checklist",
      "ai skill to check distractor quality",
      "how to audit multiple choice questions for quality",
    ],
    seoTitle: "Quiz Question Quality Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable quiz question quality audit skill that checks multiple choice items against six named item writing rules and quotes every flag.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/item-writing-checklist.md", content: ITEM_WRITING_CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard, checked against widely published multiple choice item writing guidelines.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a set of quiz questions tend to comment on tone or difficulty and miss the structural tells that actually let a test taker guess correctly: a stem's article agreeing with only one option, a distractor so implausible nobody would ever pick it, or a second option that is quietly just as defensible as the key. A named checklist forces each of those specific mechanical flaws to be checked and quoted on every item, rather than left to whichever one happens to catch a reviewer's eye.",
  },

  article: {
    intro: [
      "A quiz question quality audit skill has one job: given a set of multiple choice questions someone already wrote, decide whether the questions themselves are built well, not whether the topic they cover is the right one to test. Most review stops at the correct answer, checking that the key is right and moving on, while the three or four wrong options sit unexamined even though they carry most of an item's diagnostic power.",
      "This skill assumes the questions already exist, pulled from a textbook, a learning platform export, or a colleague's course, and audits each one against six specific, named construction rules: no crutch all of the above option, distractor plausibility, exactly one correct answer, grammatical agreement between the stem and the options, option length parity, and unmistakable negative wording.",
      "It ships as two plain text files, a main instructions file and a six rule reference checklist with a fail example and a pass example for each rule. Both are previewable in full on this page before you download the .zip, and both are exactly what an AI assistant or a teammate receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Auditing existing questions is a different job from writing them",
        body: [
          "A quiz generator prompt starts from lesson notes and specification points and produces new items from nothing. This skill starts from the opposite end: a finished set of questions, right or wrong answers already assigned, and the only output is a judgement on how well each one was constructed. Nothing here writes a replacement item unless a flag makes the fix obvious, and even then the deliverable is the audit, not a new quiz.",
          "The two jobs need different inputs and produce different outputs, and confusing them wastes both. Handing an item bank to a generator gets you more questions on the same topic; handing it to this quiz question quality audit skill gets you a rule by rule report on the questions you already have.",
        ],
      },
      {
        heading: "The six rules a quiz question quality audit skill checks",
        body: [
          "Every flag traces back to one of six named rules in reference/item-writing-checklist.md: no crutch all of the above or none of the above option, every distractor plausible to a reader who has not mastered the material, exactly one clearly correct answer rather than two defensible ones, no grammatical mismatch between the stem and the options, options parallel in length and form, and negative wording that cannot be misread under time pressure.",
          "Each rule in the checklist carries one fail example and one pass example, so an item's flag can point at the specific pattern rather than a general impression. That pairing is what turns a downloadable multiple choice item writing checklist into something a reviewer can apply consistently across a hundred item bank rather than a memory of six loose principles.",
        ],
      },
      {
        heading: "Why a vague flag is not a finding",
        body: [
          "This skill's central discipline is that every flag names the rule violated and quotes the offending text. \"This question could be better\" is not an audit finding under this skill's instructions, because it gives the person fixing the item nothing to act on and cannot be checked against the source question by anyone reading the report later.",
          "A usable flag reads instead as: option D, all of the above, fails rule one because it can be selected once two other options are recognized as correct, without ever reading option D's actual content. That sentence names the rule, quotes the option, and states the mechanism, which is what an ai skill to check distractor quality is supposed to produce on every single item.",
        ],
      },
      {
        heading: "The grammatical tell most audits miss",
        body: [
          "Rule four catches a specific, easy to reproduce mistake: a stem ending in the article a or an immediately before the answer, where only one option's first sound actually agrees with it. A student under time pressure does not need to know the content to notice that a organelle reads wrong while a cell membrane does not.",
          "This tell is invisible unless someone checks for it specifically, because the stem and the correct option both look fine read separately. It only shows up when the stem is read immediately against every option in turn, which is exactly what rule four in the checklist requires on every item, not just the ones that already look suspicious.",
        ],
      },
      {
        heading: "Reading a batch instead of one question at a time",
        body: [
          "Once every item in a set has been checked individually, the skill's instructions call for a single summary table listing each item number, which rules it failed, and the one highest priority fix, rather than an averaged quality score. A batch where three items leak the answer grammatically is a different, more urgent problem than one where every item has a mildly weak distractor, and a single number hides that difference from whoever has to decide what to fix first.",
        ],
      },
      {
        heading: "What this skill deliberately leaves alone",
        body: [
          "It does not judge whether the tested content is the right content for the course, since that is a curriculum decision outside a construction audit. It also does not rewrite a whole item wholesale; where a fix is obvious it can be suggested alongside the flag, but the point of running this skill is the audit itself, learning how to audit multiple choice questions for quality on your own bank, not a fresh quiz built from scratch.",
        ],
      },
    ],
    howTo: {
      name: "How to use the quiz question quality audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/item-writing-checklist.md directly on this page so you know exactly what an assistant will be checking your questions against before you download anything.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the full item bank",
          text: "Collect every stem and every option in order, plus which option is marked correct, since an audit run against an incomplete item cannot check most of the six rules.",
        },
        {
          name: "Hand both files to your assistant and run the audit",
          text: "Keep the folder structure intact so SKILL.md can point to the checklist file, then supply your item bank and ask for the per item flags and the summary table.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill write new quiz questions?",
        answer:
          "No. It assumes a set of multiple choice questions already exists and audits their construction against six named rules. For generating new questions from lesson notes or specification points, a dedicated quiz generator prompt is the right tool instead of this skill.",
      },
      {
        question: "What happens if an item passes every rule?",
        answer:
          "The skill's instructions require saying so plainly rather than inventing a minor stylistic complaint to have something to report. A clean item gets a clean result, not a manufactured nitpick to justify the review having happened.",
      },
      {
        question: "How is this different from just asking an assistant to review my quiz?",
        answer:
          "A general review request tends to produce vague comments about tone or difficulty. This skill forces every judgement through six specific, checkable rules with named fail conditions, so a flag has to quote the exact stem or option it applies to rather than offer a general impression.",
      },
      {
        question: "Can it audit true or false or short answer items too?",
        answer:
          "The six rules in the checklist are written for multiple choice items with a stem and several options, since several rules, like distractor plausibility and option length parity, only make sense when there is more than one wrong option to compare. True or false and short answer items need a different checklist.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. As a free ai skill to audit quiz questions, the file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the quiz questions you eventually audit with this skill are ever sent anywhere by this site.",
      },
      {
        question: "Can I edit the checklist after downloading it?",
        answer:
          "Yes. Both files are plain Markdown text that open in any text editor, so you can add a seventh rule specific to your own subject or exam format. This page is a read only preview of the exact content that downloads, and editing happens in your own editor afterward.",
      },
    ],
    internalLinks: [
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description: "For generating a new set of diagnostic questions from lesson notes, rather than auditing the construction of questions that already exist.",
      },
      {
        href: "/education-prompts/exam-question-prompt",
        label: "exam question prompt",
        description: "The summative counterpart to the quiz generator, producing graded exam items rather than auditing a bank someone else already wrote.",
      },
      {
        href: "/education-skills/misconception-diagnosis-skill",
        label: "misconception diagnosis skill",
        description: "A natural next step once a flagged distractor needs replacing, naming the specific wrong idea a better distractor should target.",
      },
      {
        href: "/education-skills/rubric-based-feedback-skill",
        label: "rubric based feedback skill",
        description: "Applies the same discipline of quoting the exact evidence behind a judgement, to open response work instead of multiple choice items.",
      },
    ],
    externalLinks: [
      {
        href: "https://uwaterloo.ca/centre-for-teaching-excellence/catalogs/tip-sheets/designing-multiple-choice-questions",
        label: "University of Waterloo: Designing Multiple-Choice Questions",
        description: "An independent teaching centre guide covering stem design and distractor plausibility, including the case against all of the above options.",
      },
      {
        href: "https://www.nbme.org/educators/item-writing-guide",
        label: "NBME Item-Writing Guide",
        description: "A widely used professional guide to constructing multiple choice test items, covering common construction flaws in depth.",
      },
      {
        href: "https://ecampus.uconn.edu/2020/09/30/writing-effective-multiple-choice-questions/",
        label: "UConn eCampus: Writing Effective Multiple Choice Questions",
        description: "Covers option length parity and negative wording, two of the six rules this skill's checklist checks against.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to auditing.",
      },
    ],
  },

  tags: ["education", "quiz", "assessment", "item writing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
