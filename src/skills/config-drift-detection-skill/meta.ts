import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Config Drift Detection Skill

Use this skill when you have two real, documented pieces of configuration
for the same system: an expected configuration (what a team has written
down as the intended state, for example environment variables, deployment
settings, or feature flag values) and an actual configuration (a real
snapshot pulled from the live environment). The job is to compare the two,
line by line, and flag every discrepancy. This skill never guesses what the
correct value should be beyond what the expected documentation actually
states.

## What you need before you start

Two real inputs, not one:

1. The expected configuration, as documented: a list of keys and values a
   team has written down as the intended state for the environment in
   question, whatever form it takes (an env template, a deployment settings
   doc, a feature flag registry export).
2. The actual configuration, as a real snapshot: the current key and value
   pairs read directly from the live environment at a specific point in
   time.

If either input is missing, or given only as a vague description rather
than a real list of keys and values, say so plainly and stop. Do not
proceed by inferring what a reasonable expected value "should" be from
convention, common practice, or how a similar system is usually configured
elsewhere. That is exactly the shortcut this skill exists to prevent.

## Step 1: build a full comparison table before flagging anything

List every key that appears in either the expected configuration or the
actual configuration, even keys that only exist in one and not the other.
Do not skip a key because it looks unimportant, and do not skip a key that
only exists in the actual snapshot just because it was not documented.

## Step 2: classify every key into exactly one of four outcomes

For each key:

- Matches: present in both, same value in both. No flag.
- Value differs: present in both, but the value differs. Flag it, quoting
  the expected value and the actual value side by side, verbatim.
- Missing from actual: present in the expected documentation, absent from
  the real snapshot. Flag it as missing, quoting the expected value that
  was never applied.
- Undocumented in expected: present in the real snapshot, absent from the
  expected documentation. Flag it as undocumented, quoting the actual
  value, and say plainly that the expected documentation looks incomplete
  for this key rather than silently ignoring it as an extra.

## Step 3: quote both values side by side for every flag, always

Never write a flag as a bare verdict. Every discrepancy line must state the
exact key, the exact expected value as documented (or "not documented" for
an undocumented key), and the exact actual value as snapshotted (or "not
present" for a missing key). A flag with no quoted value on both sides is
not useful, because the reader cannot tell whether the difference is a
typo, an intentional override, or a real regression without seeing both
sides stated plainly.

## Step 4: never fill a gap with an assumed correct value

If the expected documentation does not mention a key at all, this skill's
output states that the documentation is missing that key. It does not go
on to suggest what the value "should probably be" based on best practice,
a framework default, or what a similar service uses elsewhere. The only
two real inputs are the documentation and the snapshot; anything beyond
those two is a guess, not a finding, and guessing is the single biggest
way a config drift detection skill can mislead the person reading its
output.

## What this skill does not do

It does not connect to any live system, does not pull a configuration
snapshot itself, and does not change any configuration value. It only
compares two real inputs it is given, a documented expected state and an
actual snapshot, and reports every discrepancy between them with both
values quoted. Cross check the format of a real flagged output against
\`reference/config-drift-worked-example.md\` before finishing, since it
shows the exact structure expected for value differences, missing keys,
and undocumented keys.

## The limitation to state every time

This skill's findings are only as current as the actual snapshot supplied.
It cannot tell whether that snapshot is minutes old or a week stale, and it
cannot verify that the expected documentation itself was ever kept up to
date by the team that wrote it. Every output should end with a plain
statement that both inputs should be reconfirmed as current before any
value is changed based on this comparison alone.
`;

const CONFIG_DRIFT_WORKED_EXAMPLE_MD = `# Worked example: an expected configuration and a real drift snapshot

Use this alongside \`SKILL.md\`. It works one real comparison end to end: an
expected configuration a team documented for its production payments
service, a real actual snapshot pulled from that environment, and the
resulting flagged discrepancies in the exact format this skill produces.

## The expected configuration, as documented

| Key | Expected value |
|---|---|
| LOG_LEVEL | info |
| PAYMENTS_TIMEOUT_MS | 3000 |
| FEATURE_NEW_CHECKOUT | true |
| MAX_RETRY_ATTEMPTS | 3 |
| DATABASE_POOL_SIZE | 20 |
| ALLOWED_ORIGINS | https://app.example.com |

## The actual configuration, as snapshotted

| Key | Actual value |
|---|---|
| LOG_LEVEL | debug |
| PAYMENTS_TIMEOUT_MS | 3000 |
| FEATURE_NEW_CHECKOUT | true |
| MAX_RETRY_ATTEMPTS | 5 |
| DATABASE_POOL_SIZE | 20 |
| ALLOWED_ORIGINS | https://app.example.com |
| STRIPE_WEBHOOK_RETRY | enabled |

## The comparison table

- LOG_LEVEL: expected "info", actual "debug". Value differs.
- PAYMENTS_TIMEOUT_MS: expected "3000", actual "3000". Matches.
- FEATURE_NEW_CHECKOUT: expected "true", actual "true". Matches.
- MAX_RETRY_ATTEMPTS: expected "3", actual "5". Value differs.
- DATABASE_POOL_SIZE: expected "20", actual "20". Matches.
- ALLOWED_ORIGINS: expected "https://app.example.com", actual
  "https://app.example.com". Matches.
- STRIPE_WEBHOOK_RETRY: not documented in the expected configuration,
  actual "enabled". Undocumented in expected.

## The flagged discrepancies, in the exact output format

1. LOG_LEVEL: value differs. Expected "info", actual "debug". A production
   service running at debug level rather than the documented info level can
   leak more detail into logs than the team intended, and it is worth
   confirming whether this was an intentional temporary change or drift.

2. MAX_RETRY_ATTEMPTS: value differs. Expected "3", actual "5". This key
   controls how many times a failed payment call retries; two extra
   attempts on a real payments path is exactly the kind of quiet drift that
   is easy to miss without a line by line comparison against the documented
   expected value.

3. STRIPE_WEBHOOK_RETRY: undocumented in expected. Actual "enabled". This
   key exists in the live environment but is entirely absent from the
   documented expected configuration, so the expected documentation itself
   looks incomplete for this key. It is flagged rather than ignored as an
   extra, because a key nobody documented is exactly the kind of drift that
   silently ignoring undocumented keys would miss.

## What this worked example demonstrates

Three real categories of discrepancy are shown here: a documented value
that no longer matches the live value, a documented value that has quietly
shifted by a small margin that still matters on a payments path, and a live
key that was never written into the expected documentation at all. None of
the three flags invents a correct value; each one only quotes what the two
real inputs actually say.

## How to use this file when your own configuration looks different

Do not force a key from your own comparison into one of the outcomes shown
above just because its name resembles one of these examples. Reclassify
each key from scratch using the actual expected documentation and actual
snapshot you were given, since a key documented in one system may be
entirely undocumented in another, no matter how similar the key names look
across two services.
`;

const meta: SkillMeta = {
  slug: "config-drift-detection-skill",
  name: "Config Drift Detection Finder",
  title: "Config Drift Detection Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that compares a real documented expected configuration against a real actual configuration snapshot line by line, flagging every value difference, missing key and undocumented key with both values quoted.",

  seo: {
    primaryKeyword: "config drift detection skill",
    keywords: [
      "config drift detection skill",
      "free ai skill for config drift detection",
      "downloadable config drift checklist",
      "ai skill to compare expected and actual configuration",
      "how to detect configuration drift with ai",
    ],
    seoTitle: "Config Drift Detection Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable config drift detection skill that compares a real expected configuration against a real actual snapshot, quoting both values for every flag.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/config-drift-worked-example.md", content: CONFIG_DRIFT_WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts engineering editorial team against this site's authoring standard for analytical, non-generative skills.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to compare an expected configuration against an actual snapshot, models tend to fill in what a value should probably be whenever the documented expected state looks incomplete, quietly substituting a framework default or common convention for a real answer instead of flagging the gap. They can also skip a key that only appears in the actual snapshot, treating an undocumented setting as unimportant rather than as evidence that the expected documentation itself needs updating. This skill's four step process forces every flag to quote the documented expected value and the real actual value side by side, and requires an undocumented key to be reported as a documentation gap rather than silently dropped.",
  },

  article: {
    intro: [
      "A config drift detection skill only earns its name if it compares two real configurations rather than guessing what a value should be. Handed an expected settings list and a live snapshot, most AI assistants will happily suggest what a stray value should probably be, based on convention or a framework default, filling in a verdict the two real inputs never supported. This skill refuses that shortcut, which is what makes it a free ai skill for config drift detection worth trusting rather than a tool that fills a gap with a guess.",
      "It ships as two plain text files: a main instructions file walking through a four step comparison process, and a reference file working one real config comparison end to end, including a value that has quietly shifted, a key that matches cleanly, and a key present in the live environment but missing from the expected documentation.",
      "It is deliberately narrow. It does not connect to a live system, does not pull a snapshot itself, and does not change any configuration value. It reads two real, supplied configuration sets and reports every discrepancy between them, with both values quoted every time.",
    ],
    sections: [
      {
        heading: "Why guessing the correct value defeats the point",
        body: [
          "The whole value of a drift comparison rests on the reader trusting that every flagged difference is real, not invented. A tool that quietly substitutes what it thinks a setting should be, based on a framework default or how a similar service looks, has stopped comparing and started authoring configuration on its own, a far more dangerous failure than simply missing a discrepancy.",
          "This skill treats the documented expected configuration as the only source of truth for what was intended, and the real snapshot as the only source of truth for what exists. Nothing outside those two real inputs shapes a verdict.",
        ],
      },
      {
        heading: "The two real inputs a config drift detection skill needs first",
        body: [
          "A real comparison needs the expected configuration as documented and the actual configuration as a real snapshot, not a vague description of either. Given only a partial list, or a description like 'mostly matches production,' the instructions say to state plainly that the comparison cannot run rather than filling the gap with an assumption. Knowing how to detect configuration drift with ai starts with those two real inputs, never a guess standing in for one of them.",
          "This is the core discipline behind the whole skill: a config drift detection skill that infers a missing expected value from best practice is not doing a comparison, it is writing new documentation and presenting it as a finding.",
        ],
      },
      {
        heading: "How the four step comparison works, as an ai skill to compare expected and actual configuration",
        body: [
          "The process runs in order: build a full table of every key that appears in either input, classify each key into matches, value differs, missing from actual, or undocumented in expected, quote both values side by side for every flag, and never fill a gap with an assumed correct value. A key that matches cleanly gets no flag at all, keeping the output focused on what actually needs a human's attention.",
          "A downloadable config drift checklist only earns trust when a reader can see exactly which category a given key landed in and why, which is why every step in this process produces a stated, checkable classification rather than a general impression of how closely the two configurations line up.",
        ],
      },
      {
        heading: "A worked example: three real categories of drift",
        body: [
          "The bundled reference file compares a documented expected configuration for a production payments service against a real actual snapshot of the same environment. LOG_LEVEL has quietly drifted from the documented info to debug. MAX_RETRY_ATTEMPTS has shifted from the documented 3 to 5 on a live payments path. STRIPE_WEBHOOK_RETRY exists in the actual snapshot but was never written into the expected documentation at all, so that gap gets flagged as an incomplete expected configuration rather than silently ignored as an extra key.",
          "Three keys in the same example, DATABASE_POOL_SIZE, PAYMENTS_TIMEOUT_MS and FEATURE_NEW_CHECKOUT, match cleanly and get no flag, which is exactly the point: a useful comparison surfaces the real discrepancies without burying them under keys that never actually drifted.",
        ],
      },
      {
        heading: "Why an undocumented key is a flag, not a silent extra",
        body: [
          "A setting that exists in the live environment but appears nowhere in the expected documentation is not noise to filter out. It is either an intentional addition the documentation never caught up to, or a change nobody reviewed, and only a human with context on that environment can tell the two apart.",
          "This skill's instructions require every such key to be reported as evidence that the expected documentation looks incomplete, stated plainly alongside the actual value, rather than treated as an unremarkable extra a comparison can quietly skip past.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It does not connect to any live system, does not pull a snapshot itself, and does not change a configuration value; both real inputs have to be supplied. It never assumes a missing expected value from a framework default or common convention, and it never drops a key from the actual snapshot just because the expected documentation never mentioned it. Every flag traces to the two real inputs supplied, with both values quoted, and every output closes with a reminder to reconfirm both inputs as current before anything is changed.",
        ],
      },
    ],
    howTo: {
      name: "How to use the config drift detection skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/config-drift-worked-example.md on this page before downloading, so you know exactly what you are handing to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it in your browser.",
        },
        {
          name: "Gather both real configuration sets",
          text: "Pull the actual documented expected configuration and a real, current snapshot of the actual configuration from the environment in question, not a summary of either.",
        },
        {
          name: "Hand both files to your assistant and confirm before changing anything",
          text: "Keep the folder structure intact so SKILL.md can point to the worked example, supply both real configuration sets, then reconfirm each flagged discrepancy against the live environment before changing a value.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if a key is undocumented in the expected configuration but present in the actual snapshot?",
        answer:
          "The skill flags it explicitly as undocumented rather than silently treating it as an unimportant extra. It quotes the real actual value and states plainly that the expected documentation looks incomplete for that key, because a key nobody wrote down deserves review, not silence.",
      },
      {
        question: "Does this skill guess what a missing expected value should probably be?",
        answer:
          "No, and its instructions explicitly forbid it. If the expected documentation does not mention a key, the output says the documentation is missing that key rather than suggesting a framework default or a common convention as a stand in for a real answer.",
      },
      {
        question: "Can this skill connect to my environment and pull the actual configuration itself?",
        answer:
          "No. It only compares two real inputs it is given: a documented expected configuration and an actual configuration snapshot supplied by you. Pulling that snapshot from a live system is a separate task that happens before this skill's comparison step starts.",
      },
      {
        question: "How is this different from a general code review prompt?",
        answer:
          "A general code review prompt reads a diff or a file for correctness and style. A config drift detection skill does a narrower, data driven line by line comparison of two real configuration sets, flags value differences, missing keys and undocumented keys, and refuses to run on a vague description of either side.",
      },
      {
        question: "What if I only have one of the two real configurations?",
        answer:
          "The skill's instructions require both the expected configuration and the actual snapshot before a comparison can run. Given only one, it states plainly that the comparison cannot proceed and asks for the missing input rather than filling the gap with an assumption about the other side.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads, and editing happens afterward in your own editor or in this site's skill building tools.",
      },
    ],
    internalLinks: [
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description: "For isolating a regression once a flagged value difference turns out to be the actual cause of a live incident.",
      },
      {
        href: "/coding-prompts/security-review-prompt",
        label: "security review prompt",
        description: "A natural next pass over any flagged discrepancy that touches an access control or credential related setting.",
      },
      {
        href: "/skills/coding-skills/feature-flag-cleanup-skill",
        label: "feature flag cleanup skill",
        description: "For the related but distinct job of deciding whether a settled feature flag is safe to remove, once a rollout key stops drifting.",
      },
      {
        href: "/skills/coding-skills/dependency-changelog-audit-skill",
        label: "dependency changelog audit skill",
        description: "For the similarly evidence first discipline this skill applies to configuration, applied instead to a dependency's real changelog.",
      },
    ],
    externalLinks: [
      {
        href: "https://developer.hashicorp.com/terraform/tutorials/state/resource-drift",
        label: "HashiCorp: Detect and Manage Resource Drift",
        description: "A practitioner tutorial on detecting and reconciling drift between a Terraform state file and real infrastructure.",
      },
      {
        href: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html",
        label: "AWS: Detect Unmanaged Configuration Changes with Drift Detection",
        description: "AWS documentation on what configuration drift means for a CloudFormation stack and how it is detected.",
      },
      {
        href: "https://12factor.net/config",
        label: "The Twelve-Factor App: Config",
        description: "An independent reference on treating configuration as environment specific values kept strictly separate from code.",
      },
      {
        href: "https://docs.ansible.com/ansible/latest/getting_started/index.html",
        label: "Ansible Documentation: Getting Started",
        description: "Background on managing a system's desired configuration state, the same discipline this skill applies when comparing it against reality.",
      },
    ],
  },

  tags: ["coding", "configuration", "infrastructure", "devops", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
