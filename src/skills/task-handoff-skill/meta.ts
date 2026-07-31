import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Task Handoff Skill

Use this skill when someone needs to write a handoff document for a task, a
project, or a role: going on leave, changing roles, delegating ongoing work,
or leaving a job entirely. Its job is to make sure the document actually
transfers what the next person needs, not just what looks tidy on a page.

## The three required parts

A handoff is only complete when it contains three specific things. Check for
all three before treating any handoff document as finished.

1. CURRENT STATE. What is actually done, and what is not, stated concretely
   enough that the next person could verify it without asking a follow up
   question. "Mostly finished" is not current state. "The migration script
   runs against staging and has not been run against production" is.

2. CONTEXT. Why decisions were made the way they were, not only what was
   decided. A successor who only sees the what will either repeat a mistake
   that was already ruled out for a reason nobody wrote down, or reverse a
   deliberate choice by accident because it looked wrong without the
   reasoning attached.

3. NEXT STEPS. Specific actions, each with an owner and a first concrete
   move. "Continue the work" is not a next step. "Get sign off from Priya on
   the pricing change before merging" is.

## Before calling a handoff complete

Read the draft against the three parts above. For each one, ask: is this
present, and is it concrete enough for someone with no other context to act
on. A part that is present but vague, a current state that says "in
progress" with nothing else, a context section that restates the decision
instead of the reasoning behind it, a next step with no owner, counts as
missing.

If any part is missing or too vague, do not produce a document that looks
complete. Stop and ask for exactly the missing piece, naming which of the
three it is and what would make it concrete enough. Do not guess at the
missing context or invent a plausible sounding reason a decision was made; a
fabricated why is worse than no why, because a fabricated one gets trusted
and an acknowledged gap gets checked.

## Writing the current state section

Go task by task, or workstream by workstream. For each one, state what
exists right now, what has been verified (tested, reviewed, deployed,
agreed) and what has not. Flag anything that looks finished but has not
actually been checked, since that is exactly the kind of item a successor
will assume is safe and later discover is not.

## Writing the context section

For every decision or piece of scope that could plausibly be questioned by
someone new, write why it was decided that way: what was tried and
rejected, what constraint forced the choice, what tradeoff was accepted on
purpose. If the reasoning genuinely no longer applies because something has
changed since, say that too, so the successor knows the door is open to
revisit it rather than assuming it is fixed forever.

## Writing the next steps section

Every next step needs an owner and a first concrete action, not a restated
goal. Order them by what actually blocks what else, and flag anything with
a deadline or a dependency on another person explicitly, so the next person
does not discover the blocker by missing it.

## What this skill does not do

It does not invent current state, reasoning or next steps that were not
given to it. If the person writing the handoff cannot say why a decision
was made, the honest answer is to record that the reasoning was not
captured, not to write a plausible sounding justification after the fact. A
handoff document that looks complete but silently has a gap in it is more
dangerous than one that visibly says a piece is missing, because a visible
gap gets asked about and a silent one gets inherited.
`;

const HANDOFF_TEMPLATE_MD = `# Handoff template: three parts, strong and weak examples

Use this alongside \`SKILL.md\`. Each part below shows one weak entry, present
but not actually useful, and one strong entry, concrete enough for a
successor to act on without asking a follow up question.

## Part 1: Current state

Weak: "The onboarding flow is mostly done, just needs some polish."

Why weak: "mostly done" and "some polish" cannot be verified by anyone who
was not already in the author's head. A successor cannot tell whether
polish means a colour tweak or a broken edge case waiting to be found.

Strong: "The onboarding flow is built and works for new signups on desktop.
It has not been tested on mobile, and the email verification step is
stubbed out, it always succeeds, because we have not connected the real
email provider yet."

Why strong: it names exactly what has been verified, on what platform, and
names the one path that is fake so nobody ships it by accident.

## Part 2: Context

Weak: "We decided to use a queue instead of processing requests
synchronously."

Why weak: this states the decision, not the reasoning behind it. A
successor reading only this has no way to know whether the queue is load
bearing or a preference that can be safely reversed.

Strong: "We decided to use a queue instead of processing synchronously
because the third party API we call has a hard rate limit of ten requests a
second, and a synchronous call would fail under normal peak traffic. If
that provider is ever replaced with one that has no rate limit, this queue
can likely be removed, but check the new provider's limits first."

Why strong: it gives the constraint that forced the choice, and tells the
successor exactly when the decision would be safe to revisit.

## Part 3: Next steps

Weak: "Continue working on the reporting feature."

Why weak: no owner, no first action, no way to tell what "continue" means
on Monday morning for the person who inherits it.

Strong: "Next: Priya needs to confirm the date range filter with finance
before the export logic is built, since finance asked for a fiscal year
option last week that is not in the current design. First step: send Priya
the current filter mockup and ask whether fiscal year needs to be added
before we build against it."

Why strong: it names an owner, a concrete first action, and the reason the
step exists at all, not just the outcome it is aiming at.

## Using this template

Fill in every task or decision in your own handoff using this pattern:
state what is actually true and verified for current state, state the
reasoning and the condition under which it would change for context, and
name an owner and a first action for next steps. If you catch yourself
writing a weak shaped entry, that is the sentence to stop and rewrite
before calling the handoff complete.

## Common ways entries end up weak by accident

Most weak entries are not written carelessly, they are written under time
pressure by someone who already understands the work and forgets that the
reader does not. Watch for status words doing the work a fact should be
doing (done, mostly, in progress, should be fine), decisions stated without
the constraint that produced them, and next steps phrased as goals ("finish
the migration") instead of a first physical action someone could take today
("run the migration script against the staging database and check the row
count matches"). Each of these reads as complete to the person who already
knows the context, and reads as a dead end to the person who does not.
`;

const meta: SkillMeta = {
  slug: "task-handoff-skill",
  name: "Task Handoff Structure",
  title: "Task Handoff Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that refuses to call a task handoff complete unless it names the current state, the reasoning behind past decisions, and specific next steps, and asks for whichever of the three is missing.",

  seo: {
    primaryKeyword: "task handoff skill",
    keywords: [
      "task handoff skill",
      "free ai skill for task handoffs",
      "downloadable handoff document template",
      "ai skill to write a task handoff",
      "how to write a task handoff document",
    ],
    seoTitle: "Task Handoff Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable task handoff skill that refuses to call a handoff complete unless current state, context and next steps are all present.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/handoff-template.md", content: HANDOFF_TEMPLATE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to draft a handoff document reliably produce something that lists tasks and their status while leaving out the reasoning behind the decisions inside them, because a list of what happened is easier to generate than an account of why it happened that way. The result reads as complete and is not: a successor either repeats a mistake that was already tried and rejected, or quietly undoes a deliberate choice because the constraint that produced it was never written down. This skill's three part check exists specifically to catch that gap before the document is treated as finished.",
  },

  article: {
    intro: [
      "A task handoff skill is only as good as its refusal to call a document finished when it is not. Most handoff documents read as complete: they have headings and cover the project, and still leave the next person guessing, because the parts that were actually hard to write, why a decision was made and what genuinely is not finished yet, are exactly the parts that get skipped under time pressure before someone leaves, moves roles, or hands off a piece of work.",
      "This skill enforces three things before it treats a handoff as done: current state, stated concretely; context behind the decisions made, not just the decisions themselves; and next steps specific enough that someone else could start on them. If any of the three is missing or too vague to act on, it stops and asks for that piece by name rather than producing something that only looks finished.",
      "It ships as two plain text files: a main instructions file and a downloadable handoff document template with a worked strong and weak example for each part. Both are previewable in full before the .zip downloads, and both are exactly what a teammate or an AI assistant receives once handed over.",
    ],
    sections: [
      {
        heading: "Why most handoff documents look complete and are not",
        body: [
          "A handoff document almost always has the right shape: headings, a list of tasks, maybe a status column. Shape is not substance. The two failures that break something weeks later are ones a template alone cannot fix: current state that says 'in progress' with nothing else, and next steps that restate the goal instead of a first action.",
          "A task handoff skill exists because a document can pass a glance and still fail whoever works from it later, once the author is no longer reachable to clarify. Built as a free ai skill for task handoffs rather than a generic template, it checks for the two gaps a glance misses.",
        ],
      },
      {
        heading: "The three parts a task handoff skill requires",
        body: [
          "Every handoff this skill produces has to contain current state, stated as what is done and what is not; context, meaning the reasoning behind the choices made; and next steps, meaning specific actions with an owner and a first move. Each part has a different failure mode, which is why the skill checks them separately rather than asking whether the handoff 'covers everything'.",
          "This is the core discipline behind the skill, and why it works as an ai skill to write a task handoff rather than a generic outline generator: an outline gets filled with whatever is easiest, and the easiest thing is never the reasoning.",
        ],
      },
      {
        heading: "Why the reasoning matters as much as the decision",
        body: [
          "A handoff that lists only what was decided, without why, hands the next person conclusions with the working shown nowhere. The successor repeats a mistake already tried and rejected, because nothing told them it had been tried. Or the successor reverses a correct choice by accident, because without the constraint that produced it, the choice looks like an odd one worth fixing.",
          "Context turns a handoff from a list of facts into something a successor can reason from. A decision without its reasoning is a black box; the same decision with the constraint attached is something a new owner can extend, question, or safely retire once the constraint no longer holds.",
        ],
      },
      {
        heading: "A worked example: strong versus weak entries",
        body: [
          "Take a single entry for current state. A weak version reads: 'the reporting feature is mostly finished.' A strong version reads: 'the reporting feature generates the summary view correctly for accounts under one thousand rows; it has not been tested against larger accounts and is expected to be slow there.' The second version tells a successor where to be careful and what has not been verified.",
          "The same pattern holds for context. A weak version states a decision alone: 'we chose to batch the export overnight.' A strong version keeps the constraint attached: 'we chose to batch the export overnight because running it in business hours locked the accounts table and blocked checkout, and this can be revisited once checkout moves off that table.' One version tells a successor when it is safe to change something; the other invites the wrong reason.",
        ],
      },
      {
        heading: "What happens when a part is missing or vague",
        body: [
          "If the person writing the handoff cannot state why a decision was made, the honest move is to say the reasoning was not captured, not to invent a plausible sounding justification. A fabricated why is worse than an acknowledged gap, because a gap gets noticed and asked about, and an invented reason gets trusted and repeated.",
          "The skill treats a present but vague entry the same as a missing one. 'In progress' alone is not current state, and a next step with no owner is not a next step. When it finds one, it stops and names which part is thin, rather than letting a finished-looking document ship with a silent gap.",
        ],
      },
      {
        heading: "Using the downloaded files as a handoff document template",
        body: [
          "Hand both files to a teammate or an AI assistant together. The main instructions file explains the three required parts and when to refuse a handoff as complete; the reference file shows what a strong and a weak entry look like for each part, so the standard is visible rather than only described.",
          "For anyone asking how to write a task handoff document from a blank page, that file is the fastest route in: read the weak example, notice why it fails, then write the strong version for your own work.",
        ],
      },
    ],
    howTo: {
      name: "How to use the task handoff skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/handoff-template.md directly on this page before downloading, so you know exactly what the three required parts are and what a strong entry looks like for each.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the raw material",
          text: "Before using the skill, collect what you know: what is done, what is not, why the harder decisions were made, and what still needs to happen next.",
        },
        {
          name: "Hand both files to your assistant and check the output",
          text: "Keep the folder structure intact, then ask your assistant to check the draft against current state, context and next steps before treating it as finished, and to name any part that is missing or vague.",
        },
      ],
    },
    faq: [
      {
        question: "What if I genuinely do not know why a past decision was made?",
        answer:
          "Say so directly rather than guessing. The skill treats an honestly recorded gap as safer than an invented reason, because a gap gets flagged and investigated while a confident sounding fabricated justification tends to be trusted and repeated by whoever inherits the work next.",
      },
      {
        question: "Does this skill write the handoff document for me?",
        answer:
          "It structures and checks one. Given what you know, it drafts the three required parts, but it will not invent current state, reasoning or next steps you have not given it, and will ask directly for anything it cannot construct from what you supplied.",
      },
      {
        question: "How is this different from a general project status update?",
        answer:
          "A status update reports progress to people who already have the background. A handoff assumes the reader has none of it, which is why it requires the reasoning behind decisions and specific next steps with an owner, not just a weekly list.",
      },
      {
        question: "What counts as too vague for the current state section?",
        answer:
          "Any description a successor could not verify without a follow up question. 'Mostly done' or 'in progress' alone fails this test; naming what has been checked, tested or deployed, and what has not, passes it.",
      },
      {
        question: "Can I use this for a role change rather than a temporary leave?",
        answer:
          "Yes. The three required parts apply the same way whether the handoff covers a two week absence or a permanent move to a new role; a permanent change usually just means context goes back further, since there is no return date to fall back on.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about your handoff content is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description: "For drawing the decision boundary before work leaves your hands, rather than documenting a handoff after the fact.",
      },
      {
        href: "/productivity-prompts/decision-log-prompt",
        label: "decision log prompt",
        description: "For recording who decided what and why on an ongoing basis, which shortens the context section of a later handoff considerably.",
      },
      {
        href: "/productivity-prompts/checklist-builder-prompt",
        label: "checklist builder prompt",
        description: "For turning the next steps section of a handoff into a checklist the successor can work through in order.",
      },
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description: "Use it to order the next steps a handoff hands over, once they are specific enough to actually sequence.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2024/08/a-new-approach-to-knowledge-sharing-within-organizations",
        label: "Harvard Business Review: A New Approach to Knowledge-Sharing Within Organizations",
        description: "An independent account of why knowledge sharing inside organisations routinely fails despite the right structure being in place on paper.",
      },
      {
        href: "https://www.atlassian.com/blog/work-management/atlassians-guide-to-out-of-office-for-async-teams",
        label: "Atlassian: A practical guide to out-of-office handoffs",
        description: "A real-world account of what a team actually documents before someone goes offline, including project status and open items.",
      },
      {
        href: "https://asana.com/templates/transition-plan",
        label: "Asana: Transition plan template",
        description: "Independent guidance on what a transition plan should capture, including active work, key contacts and the reasoning behind decisions.",
      },
    ],
  },

  tags: ["productivity", "handoff", "delegation", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
