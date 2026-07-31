import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Feature Flag Cleanup Skill

Use this skill when you are given a real list of a codebase's feature flags,
each with its actual current status (rollout percentage, how long it has held
that status, and whether product or engineering has stated a future plan for
it), and the job is to identify which flags are genuine candidates for
removal. This skill does not touch code and does not remove anything itself.
Its only job is to sort the flags you were given into remove, keep, or needs
a decision, each with reasoning tied to the specific data supplied.

## What you need before you start

Three pieces of information are required for every flag, not one:

1. Rollout state: 0 percent, 100 percent, or a specific percentage between
   the two.
2. Age at that state: how long the flag has held its current rollout state,
   not just when the flag was first created.
3. Any stated plan for the flag: a reason it must stay, a revival plan, a
   compliance requirement, or an explicit note that no plan exists.

If a flag's status is missing, or given only as a vague description such as
"mostly rolled out" or "old," do not guess a number or invent an age. State
plainly that the flag cannot be evaluated without that specific detail, list
exactly which piece is missing, and move on to flags with real data rather
than filling the gap with an assumption. A recommendation built on an
assumed percentage or an assumed age is not a recommendation, it is a guess
wearing a recommendation's clothes, and it is the single biggest way this
skill can cause real harm if it is not followed.

## Step 1: classify every flag by its stated status only

For each flag, sort it into one of four buckets using only the numbers you
were actually given:

- Fully on: rollout is stated as 100 percent, or explicitly described as
  fully on, and has held that state for a period the data describes as
  settled rather than brand new.
- Fully off: rollout is stated as 0 percent, or explicitly described as
  fully killed, with no stated plan to revive it.
- Partial: any stated rollout strictly between 0 and 100 percent.
- Recently changed: the flag's status, whatever it is, changed within a
  short window relative to the other flags in the same list.

Never place a flag in a bucket based on its name, its age of creation alone,
or an assumption about what a flag "probably" does. The bucket follows the
stated rollout number and the stated time at that number, nothing else.

## Step 2: recommend removal only for a stable, extreme, aged status

A flag is a real removal candidate only when both of these hold, using the
data given:

- Its rollout is fully on at 100 percent or fully off at 0 percent, not
  partial.
- It has held that exact status for a period the supplied data describes as
  long enough to be settled, and no stated exception, dependency, or revival
  plan applies to it.

If either condition is not clearly supported by the data you were given,
the flag does not get a remove recommendation, regardless of how old the
flag's name or ticket number suggests it is. Age of the flag's status, not
age since creation, is what a removal call rests on.

## Step 3: write the reasoning against the actual stated numbers

For every recommendation, quote the exact rollout percentage and the exact
age or window stated for it, then explain the call in one or two sentences,
for example: "Flag is at 100 percent and has held that state for eleven
months with no stated exception, recommend removal of the flag and its dead
branch." Do not write a bare verdict with no cited number attached to it.

## Step 4: flag every ambiguous case as needs a decision, honestly

Any flag that is partial, recently changed, fully on or fully off but only
for a short stated period, or fully rolled out with an explicit stated
exception or dependency, goes into a separate needs a decision list, not
into remove and not silently into keep. State the specific reason each one
is ambiguous, referencing the same stated numbers, so a human reviewer knows
exactly what additional information would resolve it. Cross check the full
output against \`reference/flag-audit-example.md\` before finishing, since it
shows the exact classification and reasoning format expected for both
removal candidates and ambiguous cases.

## What this skill does not do

It does not edit, remove, or comment out any code, and it does not decide
business, legal, or compliance questions a stated exception raises; those
get surfaced in the needs a decision list for a human to resolve. It also
never assumes a flag is safe to remove because its name sounds old, because
no one has mentioned it recently, or because similar flags at the same
company were removed before. Every call traces to the rollout percentage
and age actually supplied for that specific flag.

## The limitation you must state every time

This skill reasons only from the flag list it is given. It cannot see flags
that were left off the list, cannot verify that a stated rollout percentage
or age is current rather than stale in whatever dashboard produced it, and
cannot know about an undocumented dependency on a flag that nobody mentioned.
Every output this skill produces must end with a plain statement of that
limitation and a recommendation to confirm each removal candidate against
the live flag management system and with the team that owns it before any
flag or its dead code path is actually deleted.
`;

const FLAG_AUDIT_EXAMPLE_MD = `# Worked example: a real flag list and the resulting recommendations

Use this alongside \`SKILL.md\`. It shows a realistic input list, the four
classification buckets each flag lands in, and the reasoning format each
recommendation should follow, including two flags that correctly get a
needs a decision call instead of a false positive removal recommendation.

## The input list as given

| Flag | Rollout | Age at this status | Stated plan |
|---|---|---|---|
| new-checkout-layout | 100 percent | 14 months | none stated |
| dark-mode-toggle | 100 percent | 9 months | none stated |
| legacy-export-api | 0 percent | 20 months | none stated |
| beta-search-ranking | 45 percent | 3 months | none stated |
| payments-retry-v2 | 100 percent | 6 weeks | none stated |
| eu-data-residency | 100 percent | 26 months | "must stay behind a flag for regional compliance audits" |
| holiday-promo-banner | 0 percent | 2 months | "will be reused for next year's campaign" |
| onboarding-tooltips-v3 | 100 percent | 11 months | none stated |

## Classification pass

- new-checkout-layout: fully on, 14 months, no exception. Bucket: fully on,
  settled.
- dark-mode-toggle: fully on, 9 months, no exception. Bucket: fully on,
  settled.
- legacy-export-api: fully off, 20 months, no exception. Bucket: fully off,
  settled.
- beta-search-ranking: 45 percent. Bucket: partial.
- payments-retry-v2: fully on, but only 6 weeks. Bucket: fully on, recently
  changed.
- eu-data-residency: fully on, 26 months, but a stated compliance exception
  applies. Bucket: fully on, settled, with a stated exception.
- holiday-promo-banner: fully off, 2 months, and a stated reuse plan.
  Bucket: fully off, recently changed, with a stated plan.
- onboarding-tooltips-v3: fully on, 11 months, no exception. Bucket: fully
  on, settled.

## Recommendations

Remove:

- new-checkout-layout: fully on at 100 percent for 14 months with no stated
  exception, recommend removal of the flag and the disabled branch it
  guards.
- dark-mode-toggle: fully on at 100 percent for 9 months with no stated
  exception, recommend removal.
- legacy-export-api: fully off at 0 percent for 20 months with no stated
  plan to revive it, recommend removal of the flag and the dead code path
  it guards.
- onboarding-tooltips-v3: fully on at 100 percent for 11 months with no
  stated exception, recommend removal.

Needs a decision:

- beta-search-ranking: rollout is 45 percent, a genuine partial state, not a
  removal candidate either direction; needs a decision on whether the
  rollout continues, pauses, or reverts.
- payments-retry-v2: fully on at 100 percent, but only 6 weeks, which this
  list treats as recently changed rather than settled; needs a decision on
  whether enough time has passed to call it stable given how sensitive a
  payments retry path is.
- eu-data-residency: fully on at 100 percent for 26 months, which would
  otherwise be a removal candidate, but the stated compliance exception
  means the flag itself may need to remain even though the code path does
  not change; needs a decision from whoever owns the compliance requirement.
- holiday-promo-banner: fully off at 0 percent, but the stated reuse plan
  means this is not dead code to remove; needs a decision on when the flag
  and its branch will actually be reused, and whether the branch should stay
  in the codebase in the meantime.

## What this worked example demonstrates

Two of the four fully on or fully off flags in this list did not get a
removal recommendation despite meeting the rollout percentage test, because
a stated exception or a short stated age changed the call. That is the
behaviour to reproduce: the rollout number alone never decides a
recommendation on its own, the age and any stated plan decide it together,
and a flag with a real reason to stay gets a needs a decision entry instead
of being pushed into remove just because its percentage looks extreme.

## How to use this file when your own list looks different

Do not force a flag from your own list into one of the two example outcomes
above just because its rollout percentage matches one of these examples.
Reclassify from scratch using the actual age and the actual stated plan for
your own flag, since a 100 percent flag with a stated exception behaves
differently from a 100 percent flag with none, no matter how similar the
two look on rollout percentage alone.
`;

const meta: SkillMeta = {
  slug: "feature-flag-cleanup-skill",
  name: "Feature Flag Cleanup Finder",
  title: "Feature Flag Cleanup Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that sorts a real list of feature flags into remove, keep, or needs a decision, using only the stated rollout percentage, age and plan for each flag, never a guess.",

  seo: {
    primaryKeyword: "feature flag cleanup skill",
    keywords: [
      "feature flag cleanup skill",
      "free ai skill for feature flag cleanup",
      "downloadable feature flag cleanup checklist",
      "ai skill to identify stale feature flags",
      "how to spot a feature flag safe to remove",
    ],
    seoTitle: "Feature Flag Cleanup Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable feature flag cleanup skill that recommends removal only for flags with a stated rollout percentage, age and no exception, never a guess.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/flag-audit-example.md", content: FLAG_AUDIT_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts engineering editorial team against this site's authoring standard for analytical, non-generative skills.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review a feature flag list, models tend to recommend removal for any flag whose name or ticket age sounds stale, even when the actual rollout percentage supplied is partial or the status changed recently, and they can also miss a flag that is genuinely fully rolled out and long settled if it is buried lower in a long list. This skill's classification step forces every removal call to cite the exact stated percentage and age, requires a separate needs a decision list for partial or recently changed status, and treats a stated exception or revival plan as a reason to hold a flag back from removal regardless of how extreme its rollout percentage looks.",
  },

  article: {
    intro: [
      "A feature flag cleanup skill only earns its name if it can tell the difference between a flag that is genuinely done and a flag that merely looks old. Handed a list of flags and asked which ones to remove, most AI assistants default to judging by the flag's name or how long ago it was created, producing recommendations with no real link to whether that flag's rollout has actually settled. This skill refuses that shortcut, which is what makes it a free ai skill for feature flag cleanup worth trusting rather than a generic tidy up prompt wearing an engineering label.",
      "It ships as two plain text files: a main instructions file walking through a four step classification process, and a reference file working a full example list of eight flags end to end, including two that look like obvious removals but correctly land in needs a decision instead. Both preview in full on this page before you download the .zip.",
      "It is deliberately narrow. It does not touch code, does not decide compliance questions, and does not run against a live flag system. It reads a stated list of flags with their rollout percentage, age and plan, and sorts them into remove, keep, or needs a decision with reasoning tied to those numbers.",
    ],
    sections: [
      {
        heading: "Why a flag's name or age since creation is not evidence",
        body: [
          "A flag created two years ago could have been fully rolled out for all but the last month, or could still sit at a partial rollout today, and its creation date alone cannot tell the two apart. This skill treats the current rollout percentage and the age at that status, not the flag's total age, as the only evidence a removal call can rest on.",
          "That constraint is what turns a downloadable feature flag cleanup checklist into something a reviewer can trust: every recommendation cites the number it came from, so a wrong call is visible rather than buried in a confident sounding paragraph. Knowing how to spot a feature flag safe to remove starts with the current status, never the calendar.",
        ],
      },
      {
        heading: "The three pieces of data a feature flag cleanup skill needs first",
        body: [
          "A real recommendation needs rollout state, age at that state, and any stated plan for the flag, not one or two of the three. Given a status described only vaguely, such as 'mostly rolled out' or simply 'old,' the instructions say to state plainly that the flag cannot be evaluated rather than filling the gap with an assumed number.",
          "This is the core discipline behind the whole skill: a feature flag cleanup skill that guesses a rollout percentage it was never given is not doing cleanup, it is fiction with a spreadsheet attached, and the cost is a live code path deleted on a wrong assumption.",
        ],
      },
      {
        heading: "How the four step process works, as an ai skill to identify stale feature flags",
        body: [
          "The process runs in order: classify every flag into fully on, fully off, partial, or recently changed using only the stated numbers, recommend removal only where the status is extreme, stable, and aged with no exception, write the reasoning against the cited percentage and age, then cross check the output against the bundled worked example.",
          "A flag sitting at 45 percent never gets a remove or keep verdict here. It is sorted as partial and handed to a human as a rollout decision, not a cleanup decision.",
        ],
      },
      {
        heading: "A worked example: two flags that look like removals but are not",
        body: [
          "The bundled reference file works a list of eight flags end to end. Two sit at a fully rolled out or fully killed extreme, which on percentage alone would read as an easy removal call, and both correctly land in needs a decision instead: one because its 100 percent status is only six weeks old on a payments path, the other because a stated compliance requirement means the flag has to remain even at 100 percent.",
          "That pairing is deliberate. A skill demonstrating only easy removals has not proven it catches the cases that cause real harm when a cleanup tool gets it wrong.",
        ],
      },
      {
        heading: "The ambiguous case honesty requirement",
        body: [
          "Any flag that is partial, recently changed, or fully rolled out with a stated exception must go into a separate needs a decision list, never silently into keep and never pushed into remove because its percentage looks extreme. Each entry states the specific reason it is ambiguous, tied to the same stated numbers.",
          "This requirement exists because a false positive removal recommendation is not a neutral miss. It can lead directly to a live, still needed code path being deleted, a worse outcome than a cleanup list honest about what it does not yet know.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not edit or remove any code, and it does not decide legal, business, or compliance questions a stated exception raises; those get surfaced for a human to resolve. It never assumes a flag is safe to remove because similar flags were removed before, or nobody has mentioned it in a while. Every call traces to the rollout percentage and age given for that flag, and every output ends by stating that recommendations should be confirmed against the live flag system before deletion.",
        ],
      },
    ],
    howTo: {
      name: "How to use the feature flag cleanup skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/flag-audit-example.md on this page before downloading, so you know what you are handing to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it in your browser.",
        },
        {
          name: "Gather the real flag list",
          text: "Pull the actual rollout percentage, age at that status, and any stated plan for each flag from your flag management system, not from memory or the flag's name.",
        },
        {
          name: "Hand both files to your assistant and confirm before deleting",
          text: "Keep the folder structure intact so SKILL.md can point to the example file, supply your flag list, then confirm every removal candidate with its owner before deleting any code.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill delete the dead code once a flag is confirmed for removal?",
        answer:
          "No. It only produces a sorted list of recommendations with reasoning attached. Deleting a flag and the code path it guards is a separate task with its own review, and this skill stops short of touching code so its recommendations stay a starting point, not an unreviewed automatic action.",
      },
      {
        question: "What happens if I only know a flag's rollout percentage but not how long it has held that status?",
        answer:
          "The skill's instructions require both before making a removal call, so it states plainly that the flag cannot be evaluated and asks for the missing age rather than assuming a settled period. A rollout percentage alone cannot distinguish a flag that just hit 100 percent yesterday from one that has sat there for a year.",
      },
      {
        question: "Why does a fully rolled out flag sometimes end up in needs a decision instead of remove?",
        answer:
          "Because a stated exception, a compliance requirement, or a recent change in status changes the call even when the rollout percentage looks extreme. The bundled worked example shows two such flags directly, so the behaviour is demonstrated, not only described.",
      },
      {
        question: "Is this the same as a code review prompt applied to feature flags?",
        answer:
          "No. A general code review prompt reads a diff for correctness and style. A feature flag cleanup skill does a narrower, data driven sort of a stated flag list into remove, keep, or needs a decision, and refuses to run on a flag whose rollout status was not supplied.",
      },
      {
        question: "Can this skill work from a guess about a flag's age if I do not have exact data?",
        answer:
          "No, and its instructions explicitly forbid it. A guessed age or an assumed rollout percentage produces a recommendation that looks the same as a real one but is not backed by anything, which is precisely the failure mode this skill exists to prevent.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads, and editing happens afterward in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "A natural companion pass over the code path a flag guards once this skill has recommended it for removal.",
      },
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description: "For safely restructuring the code once a flag's dead branch has been confirmed and is ready to come out.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description: "For isolating a regression if removing a flag's dead branch turns up an unexpected dependency on it.",
      },
      {
        href: "/coding-prompts/dependency-upgrade-prompt",
        label: "dependency upgrade prompt",
        description: "For the similarly disciplined, evidence first approach this skill applies to flags, applied instead to upgrading a package version.",
      },
    ],
    externalLinks: [
      {
        href: "https://martinfowler.com/articles/feature-toggles.html",
        label: "Martin Fowler: Feature Toggles",
        description: "The reference explainer on feature flags as inventory with a carrying cost, including the case for proactively removing settled ones.",
      },
      {
        href: "https://www.atlassian.com/agile/software-development/technical-debt",
        label: "Atlassian: What Is Technical Debt",
        description: "An independent explainer on why unremoved, settled flags accumulate as a specific, trackable form of technical debt.",
      },
      {
        href: "https://launchdarkly.com/blog/best-practices-for-feature-flag-hygiene/",
        label: "LaunchDarkly: Best Practices for Feature Flag Hygiene",
        description: "Practitioner guidance on flag hygiene and cleanup from a team that runs feature flag infrastructure at scale.",
      },
      {
        href: "https://trunkbaseddevelopment.com/feature-flags/",
        label: "Trunk Based Development: Feature Flags",
        description: "A real world account of managing and removing feature flags as part of a trunk based development workflow.",
      },
    ],
  },

  tags: ["coding", "feature flags", "technical debt", "code review", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
