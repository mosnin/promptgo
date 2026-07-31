import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# OKR Alignment Check

Use this skill whenever you are asked whether a stated initiative, project or task genuinely
ladders up to a specific named Key Result, not just a vague company goal. This covers a
manager checking their own roadmap, a team lead reviewing a peer's proposal, or anyone asked
to sanity check a list of initiatives against a quarter's stated Key Results before a planning
meeting locks them in.

## Before you check anything: get the real text

Ask for, or locate, two things in their exact original wording: the Objective and Key Result
being checked against, and the initiative being checked. Do not proceed on a paraphrase of
either. "We want to grow revenue" is not a Key Result; "Increase net new paid seats from 40 to
70 by the end of Q3" is. If you are only given a paraphrase, ask for the specific wording as it
appears in the OKR document before doing anything else.

This matters because the whole check depends on the Key Result's stated metric. A paraphrase
smooths over exactly the detail, the number, the unit, the direction of movement, that
determines whether an initiative actually moves it. Checking against a paraphrase produces a
verdict about a goal nobody actually wrote down.

## Tracing the chain from initiative to metric

Once you have both texts, write out the logical chain between them as a short numbered
sequence: what the initiative directly produces, what that output changes, and how that change
moves the specific number named in the Key Result. Every step in the chain must be something
that follows from what was actually stated, not something that sounds plausible.

If you can walk from the initiative to the Key Result's metric in steps that each follow
directly from the last, the chain holds and the initiative genuinely ladders up. If any step
requires guessing at a mechanism nobody described, the chain has a gap, not a connection.

## Naming the assumption instead of hiding it

Most initiatives that connect to a Key Result do so through at least one assumption: an
initiative that improves onboarding completion is assumed to reduce churn, which is assumed to
raise the retention number in the Key Result. That assumption might be reasonable, but it is
still an assumption, and this skill's job is to say so explicitly rather than let the chain
read as though every link were a stated fact.

Write the assumption out as its own labelled line, separate from the stated facts, using
language like "this step assumes that X leads to Y, which was not stated in the OKR or the
initiative description." Do this for every unstated link, not just the first one you notice.
A chain with three assumptions in it is a weaker connection than a chain with none, and hiding
that difference is the exact failure this skill exists to prevent.

## Refusing the vague justification

When the initiative and the Key Result are handed over together with a justification like
"this supports our goals" or "this is aligned with the objective," do not accept that sentence
as the check. That sentence names no mechanism and no metric, so treat it as an unchecked claim
rather than a passed check, and ask the chain be built the way this skill describes above.

Never invent a plausible sounding connection between an initiative and a Key Result that the
user has not actually established. If the initiative touches an adjacent metric, the correct
name for that metric, and the correct name for the Key Result's actual metric, must both appear
in your output so the reader can see whether they are actually the same number or two different
ones dressed up as one.

## When the chain does not hold

Say so plainly, and name the specific gap: which step in the chain has no stated or plausible
mechanism, or which metric the initiative moves that is genuinely different from the metric
named in the Key Result. An initiative can be valuable work and still not ladder up to this
particular Key Result; those are two separate judgments and this skill only makes the second
one.

## Using the reference file

Read \`reference/worked-example.md\` for a full worked pair: one initiative that ladders up to a
stated Key Result with an explicit chain, and one that does not, with the specific missing link
named. Use the same chain format shown there for every check this skill runs.
`;

const WORKED_EXAMPLE_MD = `# Worked example: tracing an initiative to a Key Result

This file shows the chain format \`SKILL.md\` describes, applied to one Objective and Key Result
with two candidate initiatives: one that genuinely ladders up, and one that does not.

## The Objective and Key Result being checked against

Objective: Make the onboarding experience good enough that new customers become active users
on their own.

Key Result: Raise the share of new signups who complete their first project within seven days
from 28 percent to 45 percent by the end of Q3.

Both lines are quoted exactly as written in the planning document. The Key Result names a
specific metric, a specific starting number, a specific target number and a specific deadline,
which is what makes it checkable rather than a slogan.

## Initiative one: rebuild the first project setup wizard

Stated initiative: rebuild the first project setup wizard so a new signup can create their
first working project in three guided steps instead of the current nine unguided steps.

Chain:

1. The wizard change directly reduces the number of steps and decisions a new signup has to
   get through before a first project exists.
2. Fewer steps and decisions before a first project exists means fewer signups abandon the
   flow before finishing it, which is a stated design goal of the rebuild, not an assumption.
3. Signups who do not abandon the flow are, by definition, signups who complete a first
   project, which is exactly the numerator in the Key Result's stated metric.

Named assumption: step two assumes that step count, specifically, is the main reason signups
currently abandon before completing a first project, rather than something else such as unclear
value or a broken integration. This was not directly stated, so it is flagged rather than
treated as settled, but it is a single, specific, checkable assumption sitting on top of an
otherwise direct chain.

Verdict: this initiative ladders up to the Key Result. The chain from the initiative's output to
the Key Result's stated metric is short, each step follows from the one before it, and the one
assumption in the chain is named rather than hidden.

## Initiative two: launch a new onboarding email series

Stated initiative: send a five email series over the new signup's first two weeks, covering
product tips, a customer story and an invitation to a live demo webinar.

Chain attempt:

1. The email series is assumed to increase engagement with the product during the first two
   weeks.
2. Increased engagement is assumed to increase the chance a signup completes a first project.
3. Therefore the email series is assumed to raise the percentage named in the Key Result.

Named gap: every step in this chain is an assumption, and no step states a mechanism by which
reading an email causes a signup to complete the specific action, finishing a first project,
that the Key Result measures. The justification offered alongside this initiative was "this
supports onboarding," which names no metric and no mechanism at all.

Verdict: this initiative does not ladder up to this Key Result as currently described. It may
be valuable work for a different, adjacent goal such as general engagement or newsletter open
rates, but that is a separate judgment from whether it moves the specific first project
completion metric named here. To pass this check, the person proposing it would need to state
a specific mechanism connecting an email open or click to completing a first project, not a
general claim about supporting onboarding.
`;

const meta: SkillMeta = {
  slug: "okr-alignment-check-skill",
  name: "OKR Alignment Check",
  title: "OKR Alignment Check Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that requires the actual Objective and Key Result wording plus the actual initiative being checked, then traces an explicit logical chain to the Key Result's stated metric instead of accepting a vague this supports our goals justification.",

  seo: {
    primaryKeyword: "okr alignment check skill",
    keywords: [
      "okr alignment check skill",
      "free ai skill to check okr alignment",
      "downloadable okr key result checklist",
      "ai skill to trace initiative to key result",
      "okr alignment checklist for ai assistant",
    ],
    seoTitle: "OKR Alignment Check Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable okr alignment check skill that traces an explicit chain from an initiative to a Key Result's stated metric and names every assumption.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to check whether an initiative supports a stated Key Result, models reliably accept a vague justification such as this supports our goals as sufficient, without ever asking for the Key Result's exact wording or naming the mechanism that would actually move its stated metric. This skill blocks that shortcut by requiring the real Objective and Key Result text and the real initiative before any verdict is given, then forces the connection to be written as a numbered chain ending at the metric named in the Key Result. Every unstated assumption inside that chain has to be labelled explicitly rather than folded silently into a confident sounding conclusion.",
  },

  article: {
    intro: [
      "An okr alignment check skill only earns its name if it can tell the difference between an initiative that genuinely moves a Key Result and one that merely sounds related to it. Handed a project and a company goal, most AI assistants will happily agree the two are aligned, because agreement is the easy answer and the alternative requires tracing an actual mechanism. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file and a worked example the instructions point to, both fully previewable on this page before you download the .zip. The whole discipline sits on one constraint: no verdict is given until the real Objective and Key Result wording and the real initiative are both in hand, and the connection between them is written as an explicit chain ending at the Key Result's stated metric, not asserted from a company goal in passing.",
    ],
    sections: [
      {
        heading: "Why a paraphrase of the Key Result is not enough",
        body: [
          "A Key Result written as raise net new paid seats from 40 to 70 by the end of Q3 is checkable: it names a metric, a starting number, a target number and a deadline. A paraphrase like grow revenue this quarter throws all four of those away and leaves nothing to check an initiative against. That is why this free ai skill to check okr alignment stops and asks for the exact original wording before anything else, since the whole check depends on the specific number an initiative would have to move.",
          "The same rule applies to the initiative being checked. A one line summary loses the detail that determines whether it touches the Key Result's metric, so both texts must be supplied in their real, original form before the chain gets built.",
        ],
      },
      {
        heading: "What an explicit chain looks like",
        body: [
          "The chain is a short numbered sequence: what the initiative directly produces, what that output changes, and how that change moves the specific number named in the Key Result. Each step has to follow from the one before it using something that was actually stated, not something that merely sounds like it should follow.",
          "A downloadable okr key result checklist is only useful if the chain it produces can be read backward as well as forward: a reader should be able to start at the Key Result's metric and walk the chain in reverse back to the initiative without hitting a step that only makes sense if you already believed the conclusion.",
        ],
      },
      {
        heading: "Naming the assumption instead of hiding it",
        body: [
          "Most real connections between an initiative and a Key Result run through at least one assumption, and this skill does not treat that as a defect to eliminate. It treats it as something that has to be written down as its own labelled line, separate from the stated facts, so the reader can see exactly which part of the chain is confirmed and which part is a bet.",
          "A chain with one named assumption is stronger and more honest than one with three assumptions folded silently into confident language. As an ai skill to trace initiative to key result, its value sits in making that difference visible.",
        ],
      },
      {
        heading: "Refusing the vague justification",
        body: [
          "When an initiative arrives with a justification like this supports our goals or this is aligned with the objective, this okr alignment check skill does not accept that sentence as the check. It names no mechanism and no metric, so it is treated as an unchecked claim until the chain is built properly.",
          "This is also where the skill refuses to invent a connection the user never established. If an initiative genuinely moves an adjacent metric rather than the one named in the Key Result, both metrics get named explicitly, so the reader can see whether they are the same number or two different ones dressed up as one.",
        ],
      },
      {
        heading: "A worked example, ladders up versus does not",
        body: [
          "The reference file walks through one Objective and Key Result, raising first project completion from 28 percent to 45 percent, against two candidate initiatives. A setup wizard rebuild produces a short, direct chain to that metric with one named assumption about step count being the main abandonment cause. An onboarding email series produces a chain built entirely from unstated assumptions and no mechanism connecting an email open to completing a first project, so it fails the check as currently justified.",
          "Working through both cases side by side, using this okr alignment checklist for ai assistant use, makes the difference between the two verdicts concrete rather than a judgment call that varies reviewer to reviewer.",
        ],
      },
      {
        heading: "How this differs from the decision memo skill",
        body: [
          "The decision memo skill compares multiple live options against stated decision criteria and recommends one. This okr alignment check skill does something narrower: given a single initiative and a single already chosen Key Result, it checks whether a real logical chain connects the two, and it never recommends between options.",
          "Use the decision memo skill when the question is which option to choose. Use this skill when the question is whether a committed initiative actually moves the Key Result it is claimed to support, which is a check, not a comparison.",
        ],
      },
    ],
    howTo: {
      name: "How to use the okr alignment check skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the exact OKR and initiative text",
          text: "Before using the skill, collect the Objective and Key Result in their original wording, plus a real description of the specific initiative being checked.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply your exact OKR text and initiative for a chain to be traced.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have a rough summary of the Key Result, not the exact wording?",
        answer:
          "The skill asks you to go get the exact wording before it will give a verdict. A summary strips out the metric, the starting number, the target number and the deadline, and the whole chain depends on the specific number an initiative would have to move, so a rough summary is treated as insufficient input rather than close enough.",
      },
      {
        question: "Will the skill ever just agree an initiative is aligned because it sounds related?",
        answer:
          "No. Its instructions explicitly forbid accepting a justification like this supports our goals as a passed check, and forbid inventing a plausible sounding mechanism the user did not actually establish. Every verdict has to trace through a numbered chain ending at the Key Result's stated metric.",
      },
      {
        question: "What does the skill do when the chain requires an assumption?",
        answer:
          "It names the assumption explicitly as its own labelled line, separate from the stated facts, rather than folding it silently into confident sounding language. A chain can still pass the check with a named assumption in it; what fails the check is an assumption left unstated.",
      },
      {
        question: "Can this skill tell me an initiative is good even if it does not ladder up to this Key Result?",
        answer:
          "It only answers the alignment question, not whether the initiative is worthwhile in general. An initiative can be genuinely valuable work and still not move this particular Key Result's metric, and this skill's job is limited to making that specific gap visible rather than judging the initiative overall.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the OKR or initiative text you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "How is this different from the decision memo skill in the same category?",
        answer:
          "The decision memo skill weighs multiple options against stated decision criteria and recommends one of them. This skill takes a single initiative that has already been chosen and checks whether it actually connects, through a real chain, to a single already stated Key Result, which is a narrower, different question than choosing between options.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/okr-writing-prompt",
        label: "okr writing prompt",
        description: "For drafting measurable Key Results in the first place, before this skill checks whether an initiative actually ladders up to one.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description: "For choosing between multiple live options against stated criteria, a different task from checking one already chosen initiative against one Key Result.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "A natural source of the initiative description and stated goal this skill turns into an explicit chain to a specific Key Result.",
      },
      {
        href: "/business-prompts/project-status-update-prompt",
        label: "project status update prompt",
        description: "For reporting progress on an initiative once this skill has confirmed which Key Result it genuinely moves.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.whatmatters.com/faqs/",
        label: "What Matters: OKR FAQs",
        description: "An independent, widely used reference on the OKR framework, including how Key Results are meant to be specific and measurable.",
      },
      {
        href: "https://rework.withgoogle.com/en/guides/set-goals-with-okrs",
        label: "Google re:Work: Set Goals with OKRs",
        description: "Google's own published guide to the OKR framework it popularised internally, covering the distinction between objectives and measurable key results.",
      },
      {
        href: "https://www.atlassian.com/agile/agile-at-scale/okr",
        label: "Atlassian: OKRs, The Ultimate Guide",
        description: "A practical, independent explainer of how key results should trace to a specific metric rather than a general direction.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to alignment checks.",
      },
    ],
  },

  tags: ["business", "okrs", "alignment", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
