import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Landing Page CTA Audit

Use this skill whenever you are asked to review a landing page, product page, or any single
page view's calls to action, whether from a pasted screenshot description, a copy paste of the
page copy, or a live URL described to you. Its only job is to check the CTA elements in that
view against four specific, checkable rules, and flag violations by quoting the CTA text and
naming the exact rule broken.

## Before you audit anything

Ask for, or work from, the actual CTA text and its surrounding copy: the button label, the
line directly above or beside it, and any other buttons or links visible in the same view. Do
not audit a CTA you have not actually been shown. If a description is too vague to identify a
specific button label ("there's a signup button somewhere near the top"), ask for the exact
wording rather than guessing what it probably says.

## The four checks

Run every CTA in the described view against these four checks, in this order. For each one,
state a pass or a fail, and for every fail, quote the exact CTA text, or describe the exact
visual detail, and name which of the four rules it breaks.

1. Action verb check. The button label must express a specific action verb tied to what
   happens next. "Submit," "Click here," and "Learn more" fail this check because they name no
   outcome. "Start my free trial," "Download the report," and "Book a call" pass, because the
   verb and its object together state what happens.
2. Value clarity check. The line of copy immediately before or beside the button must make the
   reason to click legible without reading anything else on the page. If the value is only
   explained by a paragraph two screens above, this check fails even when the button label
   itself is fine.
3. Single primary CTA check. Count every visually prominent button or link in the described
   view that asks for a different action, not two buttons doing the same thing, like a repeated
   "Buy now" in a header and a footer. A view offering more than one competing ask at equal
   visual weight, such as "Start free trial" beside "Talk to sales," fails, because competing
   CTAs split a visitor's attention and hurt conversion of both asks.
4. Visual subordination check. When a secondary CTA is present alongside a primary one, its
   styling must be visibly lighter: a plain text link or an outlined button rather than the same
   solid, filled treatment as the primary button. If both are described as the same size, fill
   and colour, this check fails regardless of what either label says.

## How to write up a finding

Every flag has three parts, in this order: the exact CTA text or visual detail quoted from
what you were given, the specific numbered check it fails, and a concrete fix naming what the
wording or styling should become instead. Never write a flag that only says a CTA "could
convert better," "feels weak," or "should be optimised." That sentence gives nobody anything to
act on. If you cannot point at one of the four numbered checks and quote specific text, do not
raise the flag.

## What this skill will not do

It will not estimate, predict or guarantee a conversion rate lift, a percentage improvement, or
any other outcome number for a proposed change. No data about the actual page's traffic,
audience or history is connected to this skill, so any number offered would be invented. State
plainly that the audit flags structural issues against the four checks, not measured or
predicted results, and that testing the real page against its own traffic is the only way to
learn what a change is actually worth.

## When every check passes

Say so plainly, check by check, rather than searching for something to criticise. A view that
already uses a specific action verb, states its value beside the button, carries one primary
ask, and correctly subordinates any secondary CTA has passed the audit this skill runs.
Inventing a fifth concern just to seem thorough is exactly the kind of vague feedback this
skill exists to avoid.
`;

const CHECKLIST_MD = `# CTA audit checklist: pass and fail examples

Use this alongside \`SKILL.md\`. Each of the four checks is paired with a real passing example
and a real failing example, so a judgment call can be tested against a concrete case instead of
a description alone.

## 1. Action verb check

- Fail: "Submit". Names no outcome; the reader has to look elsewhere to learn what happens.
- Fail: "Click here". Describes the mechanic of clicking, not what clicking leads to.
- Pass: "Start my free trial". The verb and the object together state the exact outcome.
- Pass: "Download the pricing guide". Same pattern, a different action.
- What to check: read the button label alone, with no other context supplied. If it does not
  tell you what happens next, it fails, regardless of how prominent it looks.

## 2. Value clarity check

- Fail: A button reading "Get started" sits directly under a page header with no other copy
  nearby; the value of clicking is only explained in a features list three screens down.
- Pass: The same button sits under a line reading "See your first automated report in ten
  minutes, no setup call required." The value is legible without scrolling anywhere else.
- What to check: cover everything except the button and the one or two lines nearest it. If the
  reason to click is not answered by what remains visible, the check fails.

## 3. Single primary CTA check

- Fail: A pricing section shows "Start free trial" and "Book a demo" as two equally sized,
  equally filled buttons side by side, asking a visitor to choose between two different
  commitments before committing to either.
- Pass: The same section shows one filled "Start free trial" button, with "or book a 15 minute
  demo instead" written as a plain text link beneath it.
- What to check: list every clickable element in the view that leads to a different action.
  More than one at equal visual weight is a fail, independent of how good either label is.

## 4. Visual subordination check

- Fail: A primary "Buy now" button and a secondary "Add to wishlist" button use the same solid
  fill, the same size and the same colour, differing only in their label text.
- Pass: "Buy now" is a solid filled button; "Add to wishlist" is an outlined button or a plain
  text link, visibly lighter in weight than the primary button beside it.
- What to check: with both labels covered, can you still tell which button is the primary ask
  from styling alone. If not, this check fails.

## What a passing audit looks like

A view that passes all four checks does not need a rewritten CTA. State each check as a pass,
citing the specific text or styling detail that satisfies it, and stop there. This checklist
supports a structural check, not a rewrite exercise performed for its own sake, so a page with
nothing to flag should be reported as exactly that.

## A note on conversion numbers

Nothing in this checklist produces a conversion rate estimate for any page, because no traffic
or audience data is attached to a described page. Treat every pass and fail here as a
structural judgment only, never as a forecast of how a change will perform once it is live.
`;

const meta: SkillMeta = {
  slug: "landing-page-cta-audit-skill",
  name: "Landing Page CTA Audit",
  title: "Landing Page CTA Audit Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks a landing page's calls to action against four structural rules, action verb, value clarity, one primary CTA, and visual subordination, and refuses to guess at a conversion rate lift.",

  seo: {
    primaryKeyword: "landing page cta audit skill",
    keywords: [
      "landing page cta audit skill",
      "free ai skill for cta review",
      "downloadable cta checklist for landing pages",
      "ai skill to check call to action copy",
      "cta hierarchy checklist for landing pages",
    ],
    seoTitle: "Landing Page CTA Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable landing page cta audit skill that checks buttons against four structural rules and cites exact CTA text for every flag it raises.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/cta-checklist.md", content: CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a call to action reliably reach for a general note about strengthening the button or improving conversion, without naming a specific rule the current wording or layout actually breaks. This skill's four numbered checks force every flag to quote exact CTA text against a named rule, and its instructions explicitly forbid offering a conversion rate number the model has no data to support.",
  },

  article: {
    intro: [
      "A landing page cta audit skill checks one thing only: whether the calls to action on a described page follow four specific, checkable rules, not whether the page feels persuasive in general. Handed a button labelled Submit, copy that never states what happens after a click, or two equally weighted buttons pulling a visitor toward different commitments, most reviews reach for a vague note about strengthening the page. This skill instead runs every CTA against four named checks and quotes the exact text or styling detail that breaks each one.",
      "It ships as two plain text files: a main instructions file naming the four checks and how to write up a finding, and a downloadable cta checklist for landing pages pairing each check with a real passing example and a real failing example. Both are previewable in full on this page before you download the .zip, and neither one predicts a conversion rate, because no data connects this skill to any page's actual traffic or history.",
    ],
    sections: [
      {
        heading: "Why 'this could convert better' is not a finding",
        body: [
          "A review that tells a team a CTA feels weak or could convert better gives them nothing to act on, because it names no specific rule and quotes no specific text. This skill's core discipline is that every flag it raises has to cite the exact CTA text or visual detail under review and the specific one of four checks that text or detail fails.",
          "That constraint also stops the skill from padding a review with invented concerns. If a described view genuinely passes all four checks, the correct output is a pass on each one, not a fifth objection manufactured to look thorough.",
        ],
      },
      {
        heading: "The two copy checks: action verb and value clarity",
        body: [
          "The action verb check reads the button label on its own, with no other context supplied. A label like Submit or Click here fails because it names no outcome; a label like Start my free trial or Download the report passes because the verb and its object state exactly what happens next.",
          "The value clarity check is separate and just as often missed: the line of copy nearest the button has to make the reason to click legible without the reader scrolling anywhere else. A button can pass the action verb check and still fail this one if the value it delivers is only explained several screens away.",
        ],
      },
      {
        heading: "One primary CTA per view: the attention check",
        body: [
          "The single primary CTA check counts every visually prominent button or link in a described view that asks for a different action. Two buttons doing the same thing, a repeated Buy now in a header and a footer, is not a failure. Two buttons asking for different commitments at equal visual weight, such as Start free trial beside Talk to sales, is, because competing CTAs split a visitor's attention and measurably hurt the conversion of both asks rather than helping either one.",
        ],
      },
      {
        heading: "Visual subordination: what makes a secondary CTA actually secondary",
        body: [
          "A secondary CTA earns that name through styling, not just position. This check asks whether a secondary button's fill, size and colour are visibly lighter than the primary button beside it, a plain text link or an outlined shape rather than the same solid treatment. As a cta hierarchy checklist for landing pages, this is the check that catches a page whose labels are fine but whose buttons all read as equally important at a glance.",
        ],
      },
      {
        heading: "Why this skill will not predict a conversion rate lift",
        body: [
          "A landing page cta audit skill has no access to a page's real traffic, audience or history, so any conversion percentage it offered would be invented rather than measured. Its instructions state this explicitly: the audit flags structural issues against the four checks, never a forecast of how a fix will perform once it is live.",
          "The honest next step after a structural fail is not a promised lift, it is a specific change to test against the page's own traffic, because that is the only source of a real number.",
        ],
      },
      {
        heading: "How to hand this to an assistant, as a free ai skill for cta review",
        body: [
          "Give the assistant both files together, since the main instructions file explicitly points to the checklist file by its relative path. Then supply the exact CTA text, the copy nearest it, and a description of every other button visible in the same view, because this ai skill to check call to action copy cannot audit a CTA it has not actually been shown.",
        ],
      },
    ],
    howTo: {
      name: "How to use the landing page cta audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/cta-checklist.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Describe the CTA and everything near it",
          text: "Give the exact button text, the copy directly beside it, and every other clickable element visible in the same view before asking for an audit.",
        },
        {
          name: "Read each flag against its cited rule",
          text: "Every fail should quote your CTA text and name one of the four checks. Treat any flag missing either part as incomplete, not as a finding.",
        },
      ],
    },
    faq: [
      {
        question: "Will this skill tell me how much a fix will improve my conversion rate?",
        answer:
          "No, and its instructions explicitly forbid it. The skill has no data about a described page's real traffic or audience, so any percentage it offered would be invented. It flags structural issues against four named checks and leaves the actual measured result to a real test run against the page's own traffic.",
      },
      {
        question: "What counts as a failing action verb on a CTA button?",
        answer:
          "A label that names no specific outcome, such as Submit, Click here or Learn more, fails the action verb check because a reader cannot tell what happens after clicking from the label alone. A label like Start my free trial or Download the report passes, since the verb and its object state the result directly.",
      },
      {
        question: "Can a page have two buttons and still pass the single primary CTA check?",
        answer:
          "Yes, if both buttons lead to the same action, such as a Buy now button repeated in a header and a footer. The check only fails when two buttons ask for genuinely different commitments, like a free trial and a sales call, at equal visual weight in the same view.",
      },
      {
        question: "How does the skill judge whether a secondary CTA is styled correctly?",
        answer:
          "It checks whether the secondary button's fill, size and colour are visibly lighter than the primary button beside it, typically a plain text link or an outlined shape rather than a matching solid fill. If covering both labels still leaves the primary button identifiable from styling alone, this check passes.",
      },
      {
        question: "What happens if I only describe the button text and nothing around it?",
        answer:
          "The skill asks for more before auditing, because the value clarity and visual subordination checks both depend on the copy and buttons near the CTA, not the button label in isolation. A description limited to a single line of button text is not enough to run all four checks properly.",
      },
      {
        question: "Is anything about my page uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the landing page you eventually audit with these files is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description: "For writing the page's copy and its single call to action from scratch, before this skill audits the result.",
      },
      {
        href: "/marketing-prompts/value-proposition-prompt",
        label: "value proposition prompt",
        description: "For drafting the value statement that needs to sit legibly beside the button this skill checks for clarity.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description: "For matching the traffic source that lands on the page whose CTA hierarchy this skill is auditing.",
      },
      {
        href: "/tools/readability-score-checker",
        label: "readability score checker",
        description: "For checking how easily the value copy nearest a CTA actually reads, once this skill has flagged where clarity is missing.",
      },
    ],
    externalLinks: [
      {
        href: "https://baymard.com/learn/button-design",
        label: "Baymard Institute: Button Design Best Practices",
        description: "Independent usability research on button clarity, sizing and the visual prominence a primary button needs over competing buttons.",
      },
      {
        href: "https://www.nngroup.com/articles/3-is-of-microcopy/",
        label: "Nielsen Norman Group: The 3 I's of Microcopy",
        description: "Research on how call to action wording reduces uncertainty and states a next step, the standard the action verb check applies.",
      },
      {
        href: "https://web.dev/articles/accessible-tap-targets",
        label: "web.dev: Accessible Tap Targets",
        description: "Guidance on sizing and spacing interactive elements so a primary and secondary button stay distinguishable from each other.",
      },
    ],
  },

  tags: ["marketing", "landing pages", "cta", "conversion", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
