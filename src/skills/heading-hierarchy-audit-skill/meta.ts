import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Heading Hierarchy Audit

Use this skill when you are asked to check whether a document's headings
nest correctly: a page's H1 followed by an H2 followed by an H3, in order,
with exactly one H1 for the whole document. This skill checks one thing
only, the mechanical nesting of the real heading level sequence. It does
not judge whether a heading's wording is descriptive, whether the document
has the sections its type is supposed to have, or whether an in-text
reference points to the right place. A document can read beautifully and
still fail this audit because an H2 jumps straight to an H4, and a document
with plain, unremarkable heading text can pass it cleanly if the nesting is
correct.

## Step 1: Extract the real heading sequence before judging anything

Read the document once, not to evaluate it yet, but to record every heading
exactly as it appears: its level (H1 through H6) and its exact text, in the
order the headings actually occur from top to bottom. Write this down as a
plain numbered list, for example "1. H1 Team Onboarding Guide", "2. H2
Getting Started", "3. H3 Create an account". This list is the sequence.
Every check in the next step runs against this recorded sequence, never
against an impression of how the document looks, how consistent the font
sizes seem, or how many headings there appear to be at a glance. If the
source is Markdown, the heading level is the number of leading hash marks.
If the source is HTML, the level is the number in the tag itself, h1 through
h6. Do not infer level from font size, boldness or indentation; use the
actual marked level only.

## Step 2: Check the single H1 rule

Count every H1 in the sequence. A document must have exactly one. If there
are zero, report that the document has no H1 and name what the first
heading in the sequence actually is instead. If there is more than one,
report every H1 after the first by its exact text and its position in the
sequence, since a second H1 means the document is structurally claiming to
have two main headings, which breaks the one document, one top level
heading rule a heading hierarchy audit skill exists to enforce.

## Step 3: Check for skipped levels, in sequence order

Walk the recorded sequence from top to bottom. Track which levels have
appeared so far. A heading at level N is only valid the first time it
appears deeper than any level seen so far if level N minus one has already
appeared earlier in the sequence. If a heading's level is more than one
level deeper than the deepest level reached immediately before it in its
current branch, and the intermediate level was never used, that is a
skipped level. Report it exactly: name the heading that broke the sequence,
its level and text, name the heading it directly followed, its level and
text, and name the specific missing level. Do this for every break found,
not just the first one; a document can contain more than one skipped level
and each one gets reported separately.

## Step 4: Report findings against the sequence, plainly

State the total number of headings checked, then list every finding from
steps 2 and 3 in the order they occur in the document, each one naming the
exact heading text and position involved, never a general comment like
"the headings could be better organized" or "the structure feels a bit
off." If the sequence has no H1 problems and no skipped levels, say so
plainly and report a clean pass rather than inventing a stylistic
suggestion to fill the space.

## What this skill does not do

It does not judge whether a heading's wording is clear or descriptive, does
not check whether the document contains the sections its stated type is
supposed to have, and does not check whether an in-text cross-reference
points to the right heading. Those are real, useful checks, and they are
handled by other skills built for exactly those jobs. This skill checks one
mechanical fact only: does the recorded heading level sequence nest without
a skipped level and with exactly one H1.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a skipped level and a duplicate H1

Use this alongside \`SKILL.md\`. It walks through extracting a real heading
sequence from a short document, then running both checks against that
sequence, catching one skipped level and one duplicate H1.

## The document's headings, as marked in the source

\`\`\`
# Team Onboarding Guide                    (H1)
## Getting Started                         (H2)
### Create an account                      (H3)
### Verify your email address              (H3)
## Setting Up Your Workspace               (H2)
#### Invite teammates                      (H4)
### Configure notifications                (H3)
# Billing and Plans                        (H1)
## Choosing a plan                         (H2)
\`\`\`

## Step 1: Extract the sequence

| Position | Level | Text |
|---|---|---|
| 1 | H1 | Team Onboarding Guide |
| 2 | H2 | Getting Started |
| 3 | H3 | Create an account |
| 4 | H3 | Verify your email address |
| 5 | H2 | Setting Up Your Workspace |
| 6 | H4 | Invite teammates |
| 7 | H3 | Configure notifications |
| 8 | H1 | Billing and Plans |
| 9 | H2 | Choosing a plan |

Nine headings total, recorded in the order they actually appear. Nothing
below is checked against how the document looks, only against this table.

## Step 2: Check the single H1 rule

Two headings at position 1 and position 8 are both H1. That fails the
single H1 rule.

Finding: a second H1, "Billing and Plans" at position 8, appears after the
first H1, "Team Onboarding Guide" at position 1. A document must have
exactly one H1, so "Billing and Plans" should be demoted, most likely to an
H2, unless the document is genuinely meant to be split into two separate
documents.

## Step 3: Check for skipped levels

Walking the table in order: position 1 is H1, fine, it is the first
heading. Position 2 is H2, and H1 has already appeared, fine. Positions 3
and 4 are H3, and H2 has already appeared, fine. Position 5 returns to H2,
which is always fine, returning to a shallower level never skips anything.

Position 6 is H4. The deepest level reached in this branch immediately
before position 6 is H2, at position 5, and H3 has not appeared since that
H2. Level three, H3, was never used between the H2 at position 5 and this
H4. That is a skipped level.

Finding: H4 "Invite teammates" at position 6 appears directly after H2
"Setting Up Your Workspace" at position 5, with no H3 in between. The
document should either introduce an H3 before this heading or demote
"Invite teammates" to H3 itself.

Position 7 returns to H3, which is fine on its own, though it sits after
the unresolved skip at position 6. Position 9 is H2 following the second H1
at position 8, which is internally consistent but still downstream of the
duplicate H1 finding already reported.

## The full report

Nine headings checked. Two findings: a duplicate H1 at position 8 ("Billing
and Plans"), and a skipped level at position 6 (H4 "Invite teammates"
appears after H2 "Setting Up Your Workspace" with no H3 in between). Every
other transition in the sequence, positions 1 through 5, 7 and 9, nests
correctly and needs no correction.

## What this example demonstrates

Both findings are stated as an exact position, an exact heading, and an
exact rule broken, never a general impression that "the structure seems a
little inconsistent." The duplicate H1 and the skipped level are two
different rules, checked separately, and a document can fail one, the
other, both, or neither, which is why the audit always runs both checks
against the full sequence rather than stopping once one problem is found.
`;

const meta: SkillMeta = {
  slug: "heading-hierarchy-audit-skill",
  name: "Heading Hierarchy Audit",
  title: "Heading Hierarchy Audit Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that extracts a document's real heading level sequence and checks it for skipped levels and duplicate H1 headings, flagging the exact position where the nesting breaks instead of judging whether headings look organized.",

  seo: {
    primaryKeyword: "heading hierarchy audit skill",
    keywords: [
      "heading hierarchy audit skill",
      "ai skill to check heading structure",
      "downloadable heading hierarchy checklist",
      "skill to find skipped heading levels",
      "heading nesting audit for ai assistant",
    ],
    seoTitle: "Heading Hierarchy Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable heading hierarchy audit skill that checks a document's real heading sequence for skipped levels and duplicate H1 headings.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/heading-sequence-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check a document's heading structure tend to judge it by whether the page looks organized, consistent font sizes, tidy spacing, sensible looking labels, rather than by mechanically walking the actual heading level sequence for a skipped level or a second top level heading. This skill requires the real sequence to be extracted first, level and text for every heading in order, then checked against two fixed rules, so a break in the hierarchy is reported at its exact position rather than being waved through because the page reads fine at a glance.",
  },

  article: {
    intro: [
      "A heading hierarchy audit skill only earns its name if it checks the actual sequence of heading levels in a document, not whether the page looks tidy. Handed a draft with headings in different sizes and weights, most AI assistants report that the structure looks fine, because at a glance nothing looks obviously wrong. That is an impression, not a check. This skill processes the real heading sequence, level by level, and flags the exact point where a level is skipped or a second H1 appears, instead of a vague comment about organization.",
      "It ships as two plain text files: a main instructions file defining the two rules, and a worked example file that doubles as a downloadable heading hierarchy checklist, walking through a real heading sequence with one skipped level and one duplicate H1, both flagged at their exact position. Both are previewable in full before you download the .zip.",
    ],
    sections: [
      {
        heading: "Why 'the headings look organized' is not a real check",
        body: [
          "A document can have consistent looking heading sizes and still nest incorrectly underneath that surface. A page styled so every heading looks deliberate can still jump from an H2 straight to an H4 in the underlying markup, invisible to a glance but very visible to a screen reader user navigating by heading level.",
          "This is the gap an ai skill to check heading structure has to close: judging headings by whether they look organized substitutes a visual impression for a mechanical fact, present in the document's real heading sequence whether or not anyone has looked at it yet.",
        ],
      },
      {
        heading: "The two rules a heading hierarchy audit skill actually checks",
        body: [
          "The first rule is simple to state and easy to violate without noticing: a document gets exactly one H1, its single main heading. A second H1 later in the document is a structural claim that the page has two main headings, checked against the sequence directly, not against whether the second H1 reads like a section title.",
          "The second rule is a skill to find skipped heading levels specifically: a heading at level N is only valid, the first time the document reaches that depth in a branch, if level N minus one has already appeared earlier in the sequence. An H2 followed directly by an H4, with no H3 between them, breaks this rule regardless of how sensible the H4's wording sounds on its own.",
        ],
      },
      {
        heading: "Worked example: a skipped level and a second H1 in the same document",
        body: [
          "Take a nine heading onboarding guide. Its sequence runs H1, H2, H3, H3, H2, H4, H3, H1, H2. Walking it in order catches two breaks: an H4, \"Invite teammates,\" appears directly after an H2, \"Setting Up Your Workspace,\" with no H3 in between, and a second H1, \"Billing and Plans,\" appears after the first H1, \"Team Onboarding Guide.\"",
          "Both findings are reported at their exact position: the skipped level names the H4 that broke the sequence, the H2 it followed, and the missing H3 level; the duplicate H1 finding names the second H1's exact text and position. Every other transition in the document nests correctly and gets reported as passing, not silently ignored.",
        ],
      },
      {
        heading: "How the audit reads a document's real heading sequence",
        body: [
          "Before any check runs, the skill records every heading's level and exact text, in document order, as a plain numbered list built from the source markup, the hash count in Markdown or the tag number in HTML, never inferred from font size or indentation. This becomes a heading nesting audit for ai assistant use because it works from the same structural signal a screen reader's heading navigation relies on, the level actually encoded on each heading.",
          "Once recorded, the single H1 check and the skipped level check run against the sequence directly, start to finish, so every heading gets checked, not a sample of the ones that looked questionable on a first read.",
        ],
      },
      {
        heading: "How this differs from the structural outline audit skill and the cross-reference integrity skill",
        body: [
          "The structural outline audit skill checks whether a document contains the sections its stated type is supposed to have, a dateline in a press release, prerequisites in a how-to guide, against a named external structure for that type. That is a broader check of content against a genre standard, unrelated to whether the headings marking those sections nest correctly underneath.",
          "The cross-reference integrity skill checks whether an in-text pointer like \"see Section 3.2\" actually points to something real, in the right direction, under the right label. This skill checks neither of those things. It checks only whether the heading levels themselves, H1 through H6, nest without a skipped level and with exactly one H1, a narrower, purely mechanical question checkable from the real sequence alone.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not judge whether a heading's wording is clear or well chosen, and it does not check whether the right sections exist for the document's type. A document with plain heading text passes this audit if the levels nest correctly, and a document with beautifully worded headings fails it if an H3 turns up before any H2 has appeared. Wording and nesting are different problems, and this skill catches only the second.",
        ],
      },
    ],
    howTo: {
      name: "How to use the heading hierarchy audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/heading-sequence-worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Supply the document with its real heading levels intact",
          text: "Hand over the source with headings marked as they actually are, Markdown hash counts or HTML h1 through h6 tags, rather than a copy where heading formatting has been flattened into plain bold text.",
        },
        {
          name: "Ask for the sequence and both checks",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then ask the assistant to extract the full heading sequence first and report every finding against it, not just the ones that stand out.",
        },
      ],
    },
    faq: [
      {
        question: "What exactly counts as a skipped heading level?",
        answer:
          "A heading counts as skipping a level when it is the first heading in its branch to reach a given depth and the level directly above it has not appeared anywhere earlier in the document's real sequence, for example an H4 following an H2 with no H3 recorded in between anywhere before it.",
      },
      {
        question: "How many H1 headings should a document have?",
        answer:
          "Exactly one. The H1 represents the document's single main heading, and a second H1 appearing later in the sequence is reported as a duplicate finding by exact text and position, since two H1 headings structurally claim the document has two separate main topics.",
      },
      {
        question: "Does this skill check whether the heading text itself is well written?",
        answer:
          "No. It checks only the mechanical nesting of heading levels, never the wording, clarity or descriptiveness of the text inside a heading. A document can have plain, unremarkable heading text and still pass this audit if every level nests correctly with exactly one H1.",
      },
      {
        question: "How is this different from the structural outline audit skill?",
        answer:
          "The structural outline audit skill checks whether a document contains the sections its stated type is supposed to have, such as a dateline in a press release, against a named external structure for that genre. This skill checks only whether the heading levels themselves nest correctly, a narrower, purely mechanical question unrelated to which sections exist.",
      },
      {
        question: "How is this different from the cross-reference integrity skill?",
        answer:
          "The cross-reference integrity skill checks whether an in-text pointer such as \"see Section 3.2\" actually resolves to a real target in the right direction under the right label. This skill never looks at in-text references at all; it checks only whether the heading levels themselves nest without a skipped level and with exactly one H1.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no document you later use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/writing-skills/structural-outline-audit-skill",
        label: "structural outline audit skill",
        description: "For checking whether a document contains the sections its stated type is supposed to have, a broader content check than this skill's mechanical heading nesting check.",
      },
      {
        href: "/skills/writing-skills/cross-reference-integrity-skill",
        label: "cross-reference integrity skill",
        description: "For checking whether in-text pointers like 'see Section 3.2' actually resolve correctly, a different job from checking the heading levels themselves.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "technical writing prompt",
        description: "For drafting the kind of multi section, multi level document this skill's heading sequence check is naturally applied to afterward.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For sentence level and grammar issues once this skill's nesting check has confirmed the heading structure itself is sound.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
        label: "W3C: Understanding SC 1.3.1 Info and Relationships",
        description: "The WCAG success criterion requiring structure conveyed through presentation, including heading levels, to be programmatically determinable rather than merely visual.",
      },
      {
        href: "https://webaim.org/techniques/semanticstructure/",
        label: "WebAIM: Semantic Structure",
        description: "An independent explainer stating plainly that it does not make sense to skip heading levels going down a page, the same rule this skill checks mechanically.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
        label: "MDN: Heading Elements",
        description: "Technical reference documentation on the h1 through h6 elements, including guidance against skipping levels and against using more than one h1 per page.",
      },
      {
        href: "https://www.a11yproject.com/posts/how-to-accessible-heading-structure/",
        label: "The A11Y Project: How to Write Accessible Heading Structure",
        description: "Independent guidance describing heading levels as hierarchical like a book index and naming skipped levels and duplicate top level headings as common mistakes.",
      },
    ],
  },

  tags: ["writing", "editing", "accessibility", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
