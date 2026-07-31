import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Decision Memo Skill

Use this skill whenever you are asked to help someone choose between options and produce
a memo that states a recommendation. This covers vendor choices, build versus buy calls,
hiring decisions, product direction calls, or any other choice with more than one live
option on the table.

## Before you recommend anything: get the decision criteria

Ask for, or locate, the decision criteria: the two to four things that actually matter for
this specific choice. Cost, speed to ship, reversibility, risk of failure, quality, team
capacity, whatever the decision maker genuinely cares about. Do not infer criteria from the
category of the decision alone. A hiring decision is not automatically about cost, and a
vendor decision is not automatically about price, so guessing the criteria from the type of
decision is exactly the shortcut this skill exists to block.

If no criteria are given, ask for them directly before writing a single line of the memo. Do
not proceed by silently picking an assumed priority, such as defaulting to the cheapest option
because cost happens to be the easiest thing to compare. State plainly that criteria are
missing, and offer two or three candidate criteria drawn from the specific decision described,
labelled as suggestions for the decision maker to confirm or correct, never as settled.

If criteria are given without a ranking, ask whether they are equally weighted or whether one
matters more than the others. A recommendation built on three unranked, equally weighted
criteria is a different memo from one built on three criteria where reversibility dominates
the other two, and writing the wrong one wastes the whole exercise.

## Laying out the options against the stated criteria

Once criteria exist, list every real option, including doing nothing where that is a genuine
option. For each option, state how it performs against each criterion specifically, using the
facts supplied, never a vague impression. If a fact needed to judge an option against a
criterion was not supplied, mark it UNKNOWN rather than estimating it, and say what would need
to be checked to fill it in.

Build this as a simple table: one row per option, one column per criterion, so the comparison
is visible rather than buried in prose. This is the mechanism, not decoration. A reader who
disagrees with the recommendation should be able to point at exactly which cell in that table
they think is wrong.

## Writing the recommendation as a consequence, not an assertion

The recommended option must be derived visibly from the stated criteria, never announced as a
bare conclusion. Write the reasoning as a short chain: because criterion one matters most and
option A scores best against it, and option A does not fail any of the other stated criteria,
option A is recommended. If the top criterion does not single out one option cleanly, say so
and show how the second criterion breaks the tie.

Never write a recommendation sentence that could survive having its criteria deleted. If the
sentence "option A is recommended" reads exactly the same with or without the reasoning above
it, the reasoning has not actually been used, and the memo has produced an assertion wearing a
memo's clothing.

## Flagging a genuine close call

When two or more options score within a small margin of each other under the stated criteria,
say so explicitly, name the margin, and name the specific fact that would need to change to
flip the recommendation. Do not resolve a close call by quietly leaning on an unstated tie
breaker, such as personal familiarity with one option, to manufacture a confident sounding
answer.

A close call is a legitimate output of this process, not a failure of it. The decision maker
is better served by an honest statement that two options are close, with the deciding fact
named, than by a memo that invents confidence the underlying comparison does not support.

## What this skill does not do

It does not choose the criteria for the decision maker, invent facts about an option that were
not supplied, or resolve a genuine tie by picking whichever option happens to be mentioned
first. Every number and every claim about an option must trace back to something the user
actually said, or be marked UNKNOWN.

## Writing the memo

Use \`reference/memo-template.md\` for the exact section order and headings once criteria, the
option table and the recommendation logic are settled. Fill it directly rather than
restructuring it, since the fixed order is what makes the finished memo fast for a reader to
check.
`;

const MEMO_TEMPLATE_MD = `# Decision memo template

Use this template once the decision criteria, the option comparison table and the
recommendation logic from \`SKILL.md\` are settled. Fill every section. Do not add sections,
and do not skip one because the answer feels obvious.

## 1. The decision

One sentence: what is being decided and by when. Write it so a reader could answer it with
the name of a single option, not with a discussion.

## 2. Decision criteria

List the criteria in the order of stated or confirmed priority. For each, one clause on why
it matters for this specific decision. If the decision maker did not rank them, say so plainly
and state that they were treated as equally weighted rather than silently ranking them
yourself.

## 3. Options considered

One row per option in a table: option name, how it performs against each criterion, and any
UNKNOWN cells with a note on what would resolve them. Include doing nothing if it is a real,
available option rather than a formality.

## 4. Recommendation

State the recommended option, then the reasoning chain that produced it: which criterion it
wins on, why the remaining criteria do not overturn that, and what would have to be true for a
different option to be right instead. If the top two options are close, this section says so
plainly, names the margin, and names the fact that would flip the recommendation.

## 5. What this recommendation gives up

The specific advantage of the option not chosen, named honestly rather than minimised. Every
real choice between good options forecloses something, and naming it here is what keeps the
memo trustworthy on a second reading, weeks after the decision was made.

## 6. What would change the recommendation

The one or two facts that, if they turned out to be different from what was assumed, would
flip the recommendation to a different option. This section is what makes the recommendation
falsifiable rather than merely confident sounding.

## Example criteria row, illustrative only

For a choice between two vendors where the stated criteria are cost, implementation speed and
contract lock in risk, ranked in that order: Vendor A costs less per month, Vendor B can be
implemented in half the time, and Vendor A carries a two year minimum term while Vendor B is
month to month. If cost is genuinely the top priority, Vendor A wins on the first criterion and
nothing in the second or third criterion is strong enough to overturn it, since a two year term
was already accepted as a known tradeoff going in. If lock in risk were actually the top
priority instead, the recommendation would flip to Vendor B, which is exactly why getting the
ranking confirmed before writing the recommendation section matters more than any other single
step in this skill.
`;

const meta: SkillMeta = {
  slug: "decision-memo-skill",
  name: "Decision Memo Builder",
  title: "Decision Memo Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that refuses to recommend between options until the decision criteria are stated, shows every recommendation as a direct consequence of those criteria, and flags close calls instead of forcing false confidence.",

  seo: {
    primaryKeyword: "decision memo skill",
    keywords: [
      "decision memo skill",
      "free ai skill for decision memos",
      "downloadable decision memo template",
      "ai skill to weigh options against criteria",
      "decision matrix skill for ai assistant",
    ],
    seoTitle: "Decision Memo Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable decision memo skill that requires stated decision criteria before recommending and flags close calls instead of guessing.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/memo-template.md", content: MEMO_TEMPLATE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to recommend between options with no stated priority, models reliably supply one anyway, most often defaulting to cost or to whichever option was listed first, without ever surfacing that substitution to the reader. This skill blocks that shortcut by requiring decision criteria before any recommendation is written, and it forces the recommendation to trace visibly back to those criteria rather than standing as a bare assertion. It also refuses to resolve a genuinely close call by inventing confidence, naming the margin and the fact that would flip it instead.",
  },

  article: {
    intro: [
      "A decision memo skill is only as good as the discipline it enforces before it ever writes a recommendation. Handed a set of options and nothing else, most AI assistants will recommend one anyway, quietly picking a priority such as cost or speed on the decision maker's behalf and never saying so. This skill is built to refuse that shortcut: no recommendation is written until the decision criteria, the two to four things that actually matter for this specific choice, have been stated or confirmed.",
      "It ships as two plain text files: a main instructions file and a memo template it points to. This page renders the full content of each before you ever click download, and the .zip you get contains that exact content, nothing generated behind the scenes. As a free ai skill for decision memos, its whole value sits in one constraint: the recommendation has to be a visible consequence of the stated criteria, never a bare assertion dressed up as one.",
    ],
    sections: [
      {
        heading: "Why decision criteria have to come first",
        body: [
          "Every decision has an implicit priority even when nobody states one, and a model asked to recommend without criteria will supply that priority itself rather than leave the memo empty. The substitution is invisible on the page: the memo reads as confident, and the fact that it quietly optimised for cost, or speed, never appears in the text.",
          "This skill's first instruction is to stop at that point. Before anything else is written, the decision criteria are asked for or located. A decision memo skill that skips this step has not saved a step, it has hidden one, and the decision maker inherits a recommendation built on a priority they never held.",
        ],
      },
      {
        heading: "What counts as a real decision criterion",
        body: [
          "Cost, speed, risk, reversibility, quality and team capacity are all real criteria, but the useful test is narrower than naming a plausible sounding word. A real criterion is specific enough that two options can be compared against it using facts already supplied, not a vague value like the right choice that cannot be checked against anything.",
          "When criteria arrive unranked, the skill asks whether one matters more than the others before comparing anything. Three equally weighted criteria produce a different memo from three where one dominates, and guessing the ranking is the same shortcut as guessing the criteria themselves.",
        ],
      },
      {
        heading: "Laying out options as an ai skill to weigh options against criteria",
        body: [
          "Once criteria exist, every real option gets listed, including doing nothing where that is genuinely on the table, and each is scored against each criterion using only the facts supplied. Anything not known is marked UNKNOWN with a note on what would resolve it, rather than filled with a plausible estimate.",
          "The comparison is built as a simple table, one row per option and one column per criterion, so a reader who disagrees with the recommendation can point at exactly the cell they think is wrong. That visibility is the purpose of treating this as an ai skill to weigh options against criteria rather than a request for an opinion.",
        ],
      },
      {
        heading: "How the recommendation follows from the criteria",
        body: [
          "The recommended option has to be derived from the table, not announced after it. The reasoning is written as a short, checkable chain: because the top criterion favours one option and nothing in the remaining criteria overturns that, the option is recommended. If the top criterion alone does not settle it, the chain shows how the next criterion breaks the tie.",
          "A useful test for whether this has actually happened is to delete the criteria section and read the recommendation sentence alone. If it reads exactly the same without its reasoning above it, the reasoning was decorative rather than load bearing, and the memo has produced an assertion rather than a conclusion.",
        ],
      },
      {
        heading: "Naming a close call instead of forcing a winner",
        body: [
          "When two options score within a small margin of each other under the stated criteria, the memo says so directly, names the margin, and names the specific fact that would need to change to flip the recommendation. It does not quietly lean on an unstated tie breaker, such as which option happens to be more familiar, to manufacture a confident sounding answer where the comparison does not support one.",
          "A close call reported honestly by this decision memo skill is a legitimate, useful output, not a failure. A decision maker told two options are close, with the deciding fact named, can go get that one fact rather than inherit an invented margin discovered only once the decision has gone wrong.",
        ],
      },
      {
        heading: "Using the files together as a decision matrix skill for ai assistant work",
        body: [
          "Give an AI assistant both files at once, since SKILL.md explicitly names the memo template by its relative path when it tells the assistant where to write the finished memo. Leave the folder layout as downloaded, with the reference folder sitting next to SKILL.md, so that path resolves and the six section order stays intact.",
          "Used this way, the pair works as a downloadable decision memo template with the criteria discipline built in ahead of it, rather than a blank template that still leaves the hardest step, working out what actually matters, entirely up to whoever fills it in. As a decision matrix skill for ai assistant use, its value is concentrated in the step most templates skip.",
        ],
      },
    ],
    howTo: {
      name: "How to use the decision memo skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/memo-template.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "State your decision criteria",
          text: "Before using the skill, write down the two to four things that actually matter for this specific decision, ranked if one matters more than the others.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the template, then supply your options, your facts, and your stated criteria.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I do not know my decision criteria yet?",
        answer:
          "The skill asks for them directly rather than guessing. It will suggest two or three candidate criteria drawn from the specific decision you described, labelled clearly as suggestions for you to confirm or correct, and it will not write a recommendation until you have settled on and, ideally, ranked them.",
      },
      {
        question: "Will the skill ever default to cost as the priority?",
        answer:
          "No, and this decision memo skill's instructions explicitly forbid it. Cost is only treated as a criterion when you say it matters, and if you do not state any criteria the skill stops and asks rather than quietly optimising for whichever factor is easiest to compare.",
      },
      {
        question: "What does the skill do when two options are genuinely close?",
        answer:
          "It says so plainly, names the margin between the two options under your stated criteria, and names the specific fact that would need to change to flip the recommendation. It will not manufacture confidence in a close call by leaning on an unstated tie breaker just to give you a tidy single answer.",
      },
      {
        question: "Can I use this for personal decisions, not just business ones?",
        answer:
          "Yes. The criteria first discipline works for any choice between options, whether it is a vendor contract, a hiring call, or a personal decision such as choosing between two job offers, as long as you can state the options and what actually matters for that specific choice.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. Building the preview and assembling the .zip both run as local code in your browser tab. Nothing about the decision, the options, or the criteria you eventually feed into the skill ever reaches this site, since none of that later usage happens on this site to begin with.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. SKILL.md and reference/memo-template.md are ordinary text files, so any editor opens them. What you see previewed here is exactly what unpacks from the archive, and adjusting the criteria language or the six section headings for your own team happens on your machine, not on this site.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description: "For a single one-off pass at writing the memo in prose, rather than a reusable downloadable skill with the criteria discipline built in.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "For decisions about releasing budget specifically, where a cost model and kill criteria matter more than a straight options comparison.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description: "For logging the assumptions behind a close call once the memo is written, so they can be revisited if a stated fact changes.",
      },
      {
        href: "/business-prompts/vendor-evaluation-prompt",
        label: "vendor evaluation prompt",
        description: "A natural source of the options and facts this skill turns into a criteria weighted comparison table.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.mindtools.com/aksic2i/decision-matrix-analysis/",
        label: "MindTools: Decision Matrix Analysis",
        description: "An independent explainer of the weighted scoring methodology this skill's option comparison table is built on.",
      },
      {
        href: "https://hbr.org/2013/11/deciding-how-to-decide",
        label: "Harvard Business Review: Deciding How to Decide",
        description: "Covers matching the decision process to the type of decision, the same discipline that requires criteria before a recommendation is written.",
      },
      {
        href: "https://eprints.lse.ac.uk/12761/1/Multi-criteria_Analysis.pdf",
        label: "LSE: Multi-Criteria Analysis, A Manual",
        description: "A primary reference for scoring options against multiple named criteria rather than a single collapsed judgement.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to criteria first recommendations.",
      },
    ],
  },

  tags: ["business", "decision making", "memo", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
