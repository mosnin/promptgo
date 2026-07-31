import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Dependency Changelog Audit

Use this skill when you are given a dependency's changelog or release notes and asked
whether upgrading is safe. This is a dependency changelog audit skill: its whole job is
to work out which changelog entries actually matter for one specific codebase, not to
summarise or relist what the changelog already says. A changelog on its own describes
somebody else's release. It says nothing about your exposure to it.

## The two required inputs

Do not run this skill on a changelog alone. Two inputs are required before any entry
can be assessed:

1. The real changelog or release notes text, pasted in by the user, covering every
   intermediate version being crossed, not only the destination version.
2. A real description of how the dependency is actually used in the codebase: which
   functions, classes, config keys or CLI flags from the dependency are called, and
   where.

If the usage description is missing, vague, or amounts to "we use this library" with no
named functions or call sites, stop and ask for it before assessing a single entry. A
changelog entry describing a breaking change to a function is not evidence of risk by
itself. It only becomes risk once you know the codebase actually calls that function.
Guessing at typical usage from the package's name or category (assuming a logging
library must be called the way most logging libraries are called, for example) is
exactly the shortcut this skill exists to refuse.

## Step 1: extract the usage surface first

Before reading the changelog line by line, build a short list from the usage
description: every function, class, method, config key, environment variable, CLI
flag or exported type the codebase actually touches. Number this list. It is the
yardstick every changelog entry gets checked against, and it does not change as you
work through the changelog.

## Step 2: classify every changelog entry against that surface

Go through the changelog entry by entry, in the order the release notes present them,
and give each one exactly one of three verdicts:

- **RELEVANT**: the entry names, or clearly affects, something on the usage surface
  list. Cite the specific changelog entry (quote or closely paraphrase its wording)
  and the specific numbered usage point it touches.
- **NOT RELEVANT**: the entry changes something the usage surface list does not
  touch at all. State plainly which surface item it does not intersect with, so the
  verdict is checkable rather than asserted.
- **CANNOT ASSESS**: the entry describes an internal implementation change, a
  refactor, a performance note, or anything else where the surface impact is
  genuinely unclear from the changelog text and the usage description supplied.
  Say exactly what additional information (a specific function signature, a diff, a
  migration guide section) would resolve it. Do not round a CANNOT ASSESS down to
  NOT RELEVANT to make the report look cleaner, and do not round it up to RELEVANT
  out of caution. Both are guesses wearing a verdict.

A changelog entry with no verdict, or a verdict with no citation back to a numbered
usage point, is not a finished output of this skill.

## Step 3: never relist, always filter

The single failure mode this skill exists to prevent is producing a report that is
just the changelog again, reformatted with headers. If ninety percent of a changelog's
entries get a NOT RELEVANT verdict, the report should read short, with the bulk of the
space spent on the small RELEVANT and CANNOT ASSESS sets. A long report is not more
thorough than a short one; it is evidence the filtering step did not happen.

## Step 4: write the breaking change verdict per relevant entry

For each RELEVANT entry, state directly whether it is breaking for this codebase's
actual usage, not whether the maintainers labelled it breaking. A change filed under
an "improvements" heading that alters the default value of a parameter the usage list
calls without specifying that parameter is breaking here, regardless of its label. A
change filed under "breaking changes" that touches a function the usage list never
calls is not breaking here, regardless of its label.

## What this skill does not do

It does not assess a changelog with no usage description supplied. It does not upgrade
the dependency, edit the lockfile, or write the migration code. It does not treat a
maintainer's own breaking-change label as authoritative over what the usage surface
actually shows. It does not guess at usage from the package name, its category, or
common patterns for similar libraries. It does not silently drop a CANNOT ASSESS entry
from the final report; every entry gets a verdict, and "cannot assess with what was
given" is a valid, honest one.

## Output shape

Open with a one line summary: how many entries were read, and how many landed in each
of the three verdict buckets. Then one short section per verdict bucket, RELEVANT
first, each entry citing its changelog wording and the numbered usage point it touches.
End with CANNOT ASSESS, each entry paired with the specific information that would
resolve it.
`;

const WORKED_EXAMPLE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It runs the full four step process against a short,
realistic changelog excerpt and a usage description, showing exactly how entries split
into relevant, not relevant, and cannot assess, each with its citation.

## The inputs

**Changelog excerpt, a fictional HTTP client library going from 3.2.0 to 3.4.0:**

- 3.3.0: "retry() now defaults to 3 attempts instead of 1. Configurable via the
  \`attempts\` option."
- 3.3.0: "Internal connection pooling logic rewritten for lower memory overhead under
  high concurrency."
- 3.3.0: "Deprecated \`Client.rawSend()\`. Will be removed in 4.0. Use \`Client.send()\`."
- 3.4.0: "\`timeout\` option now applies per retry attempt, not once for the whole
  call. This is listed under Improvements, not Breaking Changes."
- 3.4.0: "Fixed a bug where \`onError\` callbacks could fire twice for the same
  failed request."
- 3.4.0: "TypeScript types for \`RequestOptions\` are now stricter; \`headers\` no
  longer accepts \`undefined\` values."

**Usage description, from the codebase:**

The codebase calls \`Client.send()\` in eleven places, always with a \`timeout\` option
set to 5000. Three call sites in the payment retry path pass an \`onError\` callback
that increments a metric counter on every invocation. No call site uses
\`Client.rawSend()\`, \`retry()\`, or the \`attempts\` option; the codebase never retries
requests itself. \`RequestOptions\` is constructed in one shared helper function that
always sets \`headers\` to an object literal, never \`undefined\`.

## Step 1: the usage surface list

1. \`Client.send()\`, called in eleven places, always with an explicit \`timeout\` of
   5000.
2. \`onError\` callback, passed in three payment retry call sites, incrementing a
   metric counter per invocation.
3. \`RequestOptions\` construction, in one shared helper, always setting \`headers\` to
   a literal object.

Note what is absent: \`retry()\`, the \`attempts\` option, and \`Client.rawSend()\` are
all in the changelog but not in the usage list.

## Step 2 and 3: verdict per entry, filtered

**RELEVANT: "\`timeout\` option now applies per retry attempt, not once for the whole
call" (3.4.0).** Touches usage point 1. Every one of the eleven \`Client.send()\` call
sites sets \`timeout\` to 5000 expecting it to bound the whole call. Under the new
behaviour, a call that retries three times could now take up to 15000ms instead of
5000ms. This is filed under Improvements in the changelog, but it is breaking for this
codebase's actual timeout expectations.

**RELEVANT: "Fixed a bug where \`onError\` callbacks could fire twice for the same
failed request" (3.4.0).** Touches usage point 2. The three payment retry call sites
increment a metric counter inside \`onError\`. If the old, buggy double firing was
being relied on, even accidentally, to double count something downstream, the fix
changes that count. Flagged as relevant because it directly touches a named call site,
not because the direction of the risk is certain.

**RELEVANT: "TypeScript types for \`RequestOptions\` are now stricter; \`headers\` no
longer accepts \`undefined\` values" (3.4.0).** Touches usage point 3, but only as a
compile time check. Since the shared helper always sets \`headers\` to a literal
object and never passes \`undefined\`, this will not fail to compile and does not
change runtime behaviour. Relevant to confirm, not relevant as a source of breakage.

**NOT RELEVANT: "\`retry()\` now defaults to 3 attempts instead of 1" (3.3.0).** The
usage description states the codebase never calls \`retry()\` or sets \`attempts\`.
Does not touch any numbered usage point.

**NOT RELEVANT: "Deprecated \`Client.rawSend()\`" (3.3.0).** The usage description
states \`Client.rawSend()\` is never called. Does not touch any numbered usage point.

**CANNOT ASSESS: "Internal connection pooling logic rewritten for lower memory
overhead under high concurrency" (3.3.0).** The changelog gives no specific function
or option name to check against the usage surface, only a description of an internal
rewrite. Resolving this needs either the pull request diff for the pooling change or a
statement of the codebase's actual concurrency profile (how many simultaneous requests
it issues), neither of which was supplied. Do not assume this is safe just because it
is filed as an internal change.

## What this example is not

Three usage points is a small surface, well below what a real service is likely to
touch. A genuine audit should list every function, option and type the codebase
actually imports and calls, and a longer usage list will produce more RELEVANT and
CANNOT ASSESS entries, not fewer. Treat this file as a demonstration of the citation
discipline, not as a template whose specific verdicts apply to any other library or
codebase.
`;

const meta: SkillMeta = {
  slug: "dependency-changelog-audit-skill",
  name: "Dependency Changelog Audit",
  title: "Dependency Changelog Audit Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that audits a dependency's real changelog against a real description of how the dependency is actually used, filtering every entry to relevant, not relevant, or cannot assess, and refusing to run on a changelog with no usage description supplied.",

  seo: {
    primaryKeyword: "dependency changelog audit skill",
    keywords: [
      "dependency changelog audit skill",
      "free ai skill for changelog impact review",
      "downloadable dependency changelog checklist",
      "ai skill to audit a changelog against usage",
      "how to assess changelog relevance to your code",
      "checklist for auditing a dependency changelog",
    ],
    seoTitle: "Dependency Changelog Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable dependency changelog audit skill that filters real changelog entries against real codebase usage instead of relisting every entry as a risk.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and reviewed by the Fast Prompts editorial team against this site's authoring standard for skills that assess real, user supplied material rather than generate new content.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a changelog on its own, models reliably default to relisting every entry as a potential risk, or lean on the maintainer's own breaking-change label as the final word, treating a long release note as inherently more dangerous than a short one. Both habits ignore the one fact that actually determines risk, which functions and options the codebase calls. This skill requires a real usage description alongside the real changelog text, refuses to produce a verdict without it, and forces every relevant finding to cite the specific changelog entry and the specific usage point that makes it relevant, so the output cannot collapse back into a reformatted copy of the changelog.",
  },

  article: {
    intro: [
      "A dependency changelog audit skill is only worth downloading if it can tell the difference between a changelog entry that matters and one that does not. Handed a release notes page on its own, most AI assistants default to relisting every entry with a caution flag attached, producing a longer document than the changelog itself and answering nothing about the one codebase asking the question. This is what makes it a free ai skill for changelog impact review worth trusting rather than a reformatted copy of the release notes.",
      "The actual work is an intersection: what the maintainers changed, crossed against what the codebase calls. A breaking change to a function the usage list never references is not a risk here, no matter how it was labelled, and a quiet default value change filed under improvements can be the most expensive line in the release.",
      "It ships as two plain text files, a main instructions file and a worked reference example running the full process against a short fictional library upgrade. Both are previewable in full on this page before you download the zip, exactly what an AI assistant or teammate receives once the archive is handed over.",
    ],

    sections: [
      {
        heading: "Why a changelog alone cannot answer the question being asked",
        body: [
          "A changelog describes the maintainer's release. It says nothing about which parts of that release a specific codebase is exposed to, because the maintainer has never seen that codebase. Asking a model to assess breaking-change impact from the changelog text alone gets a rewritten summary of somebody else's work, dressed up as an assessment of yours.",
          "This skill's first instruction is a hard requirement, not a suggestion: no verdict gets produced until a real usage description sits alongside the real changelog text. A usage description that just names the library, with no named functions or call sites, is treated the same as no usage description at all, and this dependency changelog audit skill asks for the missing detail instead of proceeding on a guess.",
        ],
      },
      {
        heading: "Building the usage surface before reading the changelog",
        body: [
          "Step one comes before the changelog gets read line by line: extract a numbered list of every function, class, config key, environment variable or exported type the usage description names. That list is the fixed yardstick every entry gets checked against, which makes each verdict traceable to something concrete rather than a feeling about how risky the release sounds.",
          "A short usage list is still useful. Three named call sites produce a checkable audit, where a vague description like we use this library for requests produces nothing to build an assessment on.",
        ],
      },
      {
        heading: "The three verdicts, and why cannot assess is not a failure",
        body: [
          "Every changelog entry gets exactly one of three verdicts: relevant, with the specific usage point it touches named; not relevant, with the usage point it fails to touch stated; or cannot assess, reserved for internal refactors and performance notes where the surface impact is genuinely unclear from what was supplied.",
          "Cannot assess is not a placeholder for laziness, it is an honest output. Rounding an unclear change down to not relevant, or up to relevant out of caution, both replace a real unknown with a guess. The instructions require naming exactly what would resolve each cannot assess entry, a function signature, a linked diff, a migration guide section, so the gap itself stays checkable.",
        ],
      },
      {
        heading: "The discipline of filtering instead of relisting",
        body: [
          "The failure mode this skill exists to prevent is a report that is just the changelog again with headers added. When the bulk of a changelog's entries land as not relevant, the finished report should be short, because most of a large release genuinely does not touch a specific codebase's actual usage. Followed this way, the four steps double as a checklist for auditing a dependency changelog without letting the report balloon back into the original document.",
          "A downloadable dependency changelog checklist is only useful if a long report means real exposure, not thoroughness for its own sake. Every entry still gets a verdict, but only the relevant and cannot assess buckets earn real space in the final output.",
        ],
      },
      {
        heading: "Judging breaking changes by usage, not by the maintainer's label",
        body: [
          "The maintainer's breaking-change heading is a hint, not the final word. A default value change filed under improvements that alters behaviour for a parameter the usage list calls is breaking here regardless of where the maintainer filed it. A rename filed under breaking changes that the usage list never calls changes nothing.",
          "This is what turns a changelog audit into an ai skill to audit a changelog against usage rather than a restatement of the release notes: the label a maintainer chose describes their intent, while the verdict this skill produces describes actual exposure.",
        ],
      },
      {
        heading: "How this differs from the dependency upgrade prompt on this site",
        body: [
          "The dependency upgrade prompt on this site is a broader, one shot analysis covering CVE reachability, batching order across queued upgrades, and a rollback plan, all in a single response. This skill does one narrower job well: how to assess changelog relevance to your code, entry by entry, meant to run as a repeatable pass rather than a single conversational prompt.",
          "Running the prompt for the wider picture and this skill for a citation backed pass through the release notes is a natural pairing, not a choice between the two.",
        ],
      },
    ],

    howTo: {
      name: "How to use the dependency changelog audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md on this page before downloading, so you know exactly what process is about to run against your changelog.",
        },
        {
          name: "Gather the real changelog and the real usage description",
          text: "Paste the actual release notes for every intermediate version crossed, and write down which functions, options and types the codebase calls. Neither substitute is acceptable alone.",
        },
        {
          name: "Download the zip and hand both files to your assistant",
          text: "One button builds the archive from the exact files shown in the preview. Keep the folder structure intact so SKILL.md can point to the worked example.",
        },
        {
          name: "Review the three verdict buckets before deciding",
          text: "Read the relevant entries and their cited usage points first, then the cannot assess entries and what would resolve each, before treating the audit as complete.",
        },
      ],
    },

    faq: [
      {
        question: "Can I run this with just the changelog, before I know how the library is used?",
        answer:
          "No. The skill's first instruction is to stop and ask for a real usage description if one is not supplied, because a breaking change to a function is not evidence of risk on its own. It only becomes risk once a usage point shows the codebase calls that function, so a changelog alone produces no verdicts.",
      },
      {
        question: "What counts as a good enough usage description?",
        answer:
          "Named functions, classes, config keys or options the codebase calls, ideally with where they are called from. A description like we use this library for HTTP requests, with no named functions, is treated as missing, and the skill asks for specifics first.",
      },
      {
        question: "Does the skill trust the maintainer's breaking-change label?",
        answer:
          "Only as a hint, never as the final word. A change filed under improvements that alters behaviour a named usage point depends on is judged breaking regardless of heading, and a labelled breaking change touching nothing in the usage list is judged not relevant.",
      },
      {
        question: "What happens to changelog entries the skill genuinely cannot assess?",
        answer:
          "They are reported explicitly as cannot assess, paired with the specific information, a function signature, a linked diff, a migration guide section, that would resolve it. The instructions forbid rounding these down to not relevant or up to relevant, since both replace an honest unknown with a guess.",
      },
      {
        question: "How is this different from the dependency upgrade prompt on this site?",
        answer:
          "The dependency upgrade prompt is a single, broader response covering CVE reachability, batching order, and a rollback plan. This skill runs a narrower, repeatable pass through the changelog itself, checking every entry against a named usage surface before any upgrade decision is made.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the changelog or usage description you use the skill with is ever sent anywhere by this site.",
      },
    ],

    internalLinks: [
      {
        href: "/coding-prompts/dependency-upgrade-prompt",
        label: "dependency upgrade prompt",
        description: "For the broader planning pass, CVE reachability and upgrade ordering, that this skill's narrower changelog audit is meant to feed into.",
      },
      {
        href: "/coding-prompts/code-migration-prompt",
        label: "code migration prompt",
        description: "For carrying out the mechanical change once the audit has named the relevant entries and the call sites they affect.",
      },
      {
        href: "/skills/coding-skills/api-documentation-consistency-skill",
        label: "api documentation consistency skill",
        description: "A different citation backed comparison skill, checking existing documentation against itself rather than a changelog against real usage.",
      },
      {
        href: "/skills/coding-skills/test-coverage-gap-skill",
        label: "test coverage gap skill",
        description: "For naming which tests would actually catch a relevant changelog entry once this skill has identified it.",
      },
    ],

    externalLinks: [
      {
        href: "https://semver.org/",
        label: "Semantic Versioning 2.0.0",
        description: "The specification defining what a maintainer's major, minor and patch labels are meant to signal about their own public API.",
      },
      {
        href: "https://keepachangelog.com/en/1.1.0/",
        label: "Keep a Changelog",
        description: "A widely adopted convention for how release notes should be structured, useful context for why entries are grouped the way they are before this skill re-sorts them by relevance.",
      },
      {
        href: "https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review",
        label: "GitHub Docs: About Dependency Review",
        description: "Vendor documentation on how automated dependency review tools flag version changes from manifest and lockfile diffs, the kind of coarse signal this skill's usage based citation is meant to sharpen.",
      },
      {
        href: "https://peps.python.org/pep-0387/",
        label: "PEP 387: Backwards Compatibility Policy",
        description: "A real, published example of a maintained project defining what counts as its public surface and how a breaking change to it gets communicated, the same distinction this skill draws for a single codebase's usage.",
      },
    ],
  },

  tags: ["coding", "dependencies", "changelog", "audit", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
