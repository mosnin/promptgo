import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Cross-Reference Integrity Check

Use this skill when you are asked to check a document's internal
cross-references, phrases such as "see Section 3.2," "as shown in Figure 4,"
or "discussed above in the Methodology section," for internal consistency.
This skill checks one thing only: whether every reference in the document
actually points to something real, in the right direction, and with the
right label. It does not judge whether the document's overall shape matches
what its type is supposed to have; a press release missing its dateline or a
report missing a findings section is a different, broader problem handled by
a separate skill. This one is narrower and stays narrow on purpose: a
document can have a perfect skeleton and still send its reader to the wrong
figure.

## Step 1: Build a real map before checking a single reference

Read the whole document once, not to check anything yet, but to record
every labelled or numbered element and where it sits. That means every
heading and its number if it has one, every figure and table with its
number, every appendix, and the order these things actually appear in from
top to bottom. Write this down as a plain list: label, what it is, and its
position (which section it falls under, and whether it comes before or
after other labelled elements). This list is the map. Nothing in the next
step is checked against memory, impression, or what a reference "sounds
like it should" point to. It is checked against this map, built from the
document as it actually exists right now, not as an earlier draft or a
mental model of it might have been.

## Step 2: Find every cross-reference and record what it claims

Go through the document again and pull out every internal reference: any
phrase pointing the reader somewhere else in the same document. For each
one, record three things separately. First, the exact reference text, the
words as written, quoted exactly. Second, the target label the reference
names, a section number, a figure number, a table number, or a named
section title. Third, any directional claim the reference makes: "above,"
"below," "earlier," "later," "previously," "in the next section," or a
lack of any directional claim at all, which is itself worth recording since
an undirected reference cannot be checked for direction but can still be
checked for existence and label accuracy.

## Step 3: Check each recorded reference against the map, not against how it reads

For every reference recorded in step 2, run three separate checks against
the map from step 1, never against how plausible the reference sounds on
its own.

1. Existence: does a labelled element matching the target actually exist in
   the document at all. A reference to "Table 4" when the document only
   goes up to Table 3 fails here regardless of how naturally the sentence
   reads.
2. Direction: if the reference claims "above" or "below," "earlier" or
   "later," compare the reference's own position in the map to the
   target's position. A "see above" pointing to something that in fact
   appears later in the document is a real, common error, and it is only
   catchable by checking actual position, never by reading the sentence in
   isolation.
3. Label accuracy: does the target's current label match what the
   reference calls it. A renumbering pass often shifts what used to be
   Table 2 into Table 3 without every in-text reference being updated to
   match, and a reference that still says "Table 2" after that shift is
   wrong even though it was correct in an earlier draft.

Never mark a reference correct because it reads naturally or because a
similar reference nearby was correct. Every single reference gets all three
checks run against the map, independently.

## Step 4: Report every finding against the map, plainly

For a reference that fails any check, quote the exact reference text as
written, state which check it failed, and state what the reference should
point to instead whenever the map makes that determinable (the correct
label, the correct direction, or a note that no matching element exists at
all if the target cannot be found anywhere in the map). For a reference
that passes all three checks, no correction is needed, but keep a short
count of how many references were checked in total against how many
passed, so the summary reflects a complete pass over the document rather
than a sample of it.

## What this skill does not do

It does not check whether the document has the sections its type is
supposed to have, whether prose reads well, or whether facts stated in the
document are accurate. It checks only whether references that point
somewhere else in the same document point to something real, in the right
direction, under the right label. A document can pass every check this
skill runs and still be missing a required section, badly written, or
wrong on the facts; those are different jobs.
`;

const WORKED_EXAMPLE_MD = `# Worked example: checking cross-references against a real map

Use this alongside \`SKILL.md\`. It walks through building a map from a short
document, then checking three references against that map, one of which is
broken.

## The document

\`\`\`
1. Introduction
2. Method
   2.1 Data collection
   2.2 Analysis approach
3. Results
   Figure 1: Response rate by region
   Table 1: Summary statistics
   Figure 2: Trend over time
4. Discussion
5. Conclusion
\`\`\`

The document's actual body text, in order, contains these three
cross-references:

- In section 2.2: "The full response counts are shown below in Table 1."
- In section 3, just after Figure 2: "As discussed above in the Data
  collection section, response rates varied by region."
- In section 4: "See Figure 3 for the regional breakdown."

## Step 1: Build the map

| Label | What it is | Position |
|---|---|---|
| 1 | Section: Introduction | 1st |
| 2 | Section: Method | 2nd |
| 2.1 | Subsection: Data collection | inside section 2, 1st |
| 2.2 | Subsection: Analysis approach | inside section 2, 2nd |
| 3 | Section: Results | 3rd |
| Figure 1 | Response rate by region | inside section 3, 1st |
| Table 1 | Summary statistics | inside section 3, 2nd |
| Figure 2 | Trend over time | inside section 3, 3rd |
| 4 | Section: Discussion | 4th |
| 5 | Section: Conclusion | 5th |

Only ten labelled elements exist. There is no Figure 3 anywhere in the map.

## Step 2 and 3: Check each of the three references

**Reference 1**: "The full response counts are shown below in Table 1,"
written inside section 2.2.

- Existence: Table 1 exists in the map. Pass.
- Direction: the reference claims "below." Section 2.2 is the second
  subsection of section 2. Table 1 sits inside section 3, which comes after
  section 2 in the map. Below is correct. Pass.
- Label: the target is labelled Table 1 in the map, and the reference calls
  it Table 1. Pass.

This reference passes all three checks and needs no correction.

**Reference 2**: "As discussed above in the Data collection section,"
written in section 3, just after Figure 2.

- Existence: a section labelled Data collection exists in the map, as
  subsection 2.1. Pass.
- Direction: the reference claims "above." Section 2.1 sits inside section
  2, which comes before section 3 in the map, and the reference itself
  appears inside section 3. Above is correct here. Pass.
- Label: the reference calls it "the Data collection section," and the map
  labels it exactly that, subsection 2.1, Data collection. Pass.

This reference also passes. It is included here to show that not every
reference in a worked example is the broken one; a real audit reports
passes as plainly as failures.

**Reference 3**: "See Figure 3 for the regional breakdown," written in
section 4.

- Existence: the map contains Figure 1 and Figure 2, and nothing labelled
  Figure 3. This check fails.

**The fix**: Figure 1 is titled "Response rate by region" and sits in
section 3, which is exactly what this reference is trying to describe as a
regional breakdown. The reference almost certainly should read "See Figure
1 for the regional breakdown," not Figure 3. The most likely cause is a
figure that was removed or renumbered after this reference was written and
never updated to match. Report this finding as: reference text "See Figure
3 for the regional breakdown" in section 4 fails the existence check; no
Figure 3 exists in the document; the content described matches Figure 1,
which is the likely intended target.

## What this example demonstrates

Two of the three references read perfectly naturally on their own, and one
of the two required checking direction against actual position, not just
existence, to confirm it was correct. The third reference also reads
naturally, smoothly enough that a check based on plausibility alone would
likely pass it, and it is still wrong. Only checking every reference
against the real map built in step 1, rather than judging any reference by
how it reads, catches that kind of failure.
`;

const meta: SkillMeta = {
  slug: "cross-reference-integrity-skill",
  name: "Cross-Reference Integrity Check",
  title: "Cross Reference Integrity Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that maps a document's actual headings, numbered sections and figure or table labels, then checks every internal cross-reference against that real map for existence, direction and label accuracy instead of trusting how the reference reads.",

  seo: {
    primaryKeyword: "cross reference integrity skill",
    keywords: [
      "cross reference integrity skill",
      "ai skill to check document cross references",
      "downloadable cross reference checklist",
      "skill to verify figure and section references",
      "cross reference audit skill for documents",
    ],
    seoTitle: "Cross Reference Integrity Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable cross reference integrity skill that checks every internal reference in a document against its real structure, not how it reads.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/cross-reference-worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check a document's cross-references tend to judge each one by whether it reads plausibly rather than by checking it against the document's actual structure, so a reference that sounds natural gets marked correct even when it points to a label that does not exist, faces the wrong direction, or names a section that was renumbered after the reference was written. This skill requires a real map of the document's headings, numbers and figure or table labels to be built first, then requires every reference to be checked against that map on three separate axes, existence, direction and label, before any reference can be marked as passing.",
  },

  article: {
    intro: [
      "A cross reference integrity skill only earns its name if it checks references against the document itself rather than against how naturally each one reads. A phrase like \"see Section 3.2\" or \"as shown in Figure 4\" looks correct the moment it is written, and it can go on looking correct through several rounds of editing even after the section it points to has moved, been renumbered, or been deleted outright. This skill exists because that gap between looking correct and actually being correct is exactly where broken references survive.",
      "It ships as two plain text files: a main instructions file that defines the four step process, and a worked example file that doubles as a downloadable cross reference checklist, walking through a short document, its map, and three real references checked against that map, including one that is broken. Both are previewable in full before you download the .zip, and both are exactly what an assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a reference that reads correctly can still be wrong",
        body: [
          "A sentence such as \"discussed above in the Methodology section\" is grammatically fine and reads as though it must be accurate, because nothing about its wording signals a problem. The only way to know whether it is actually accurate is to check where that section sits relative to the reference, and whether it is still called Methodology at all. Reading a reference in isolation cannot answer either question.",
          "This is the specific failure a cross reference integrity skill is built to catch: a document can be well written, fully structured, and still route its reader to the wrong figure, table, or a section that no longer exists under that name.",
        ],
      },
      {
        heading: "Building a real map before checking anything",
        body: [
          "Before touching a single reference, the skill requires a full pass over the document to record every heading, numbered section, and figure or table label, along with its position relative to everything else. This becomes the map that every later check runs against. Skipping this step and checking references against memory or a general impression of the document is exactly the shortcut that lets a plausible sounding reference pass unchecked.",
          "Building the map first, and only afterward touching the references, is what makes this an ai skill to check document cross references rather than a skill that just skims for phrases containing the word \"see.\"",
        ],
      },
      {
        heading: "Checking existence, direction and label, separately",
        body: [
          "Every reference gets three independent checks against the map: does the target actually exist, does the claimed direction (above, below, earlier, later) match its real position, and does the label the reference uses match the target's current label. A reference can pass one check and fail another, a target that exists but sits in the wrong direction from where the reference claims, so all three are run every time rather than stopping once one check passes.",
          "This is what makes the pack a skill to verify figure and section references instead of a simple existence check: direction and label drift are common, ordinary editing failures that only surface when checked against the map's actual positions, not against the reference's own wording.",
        ],
      },
      {
        heading: "Worked example: catching a broken figure reference",
        body: [
          "Take a short document with five numbered sections, two figures and one table. Two references check out cleanly against the map: one correctly says a table is shown \"below\" because the table does sit later in the document, and one correctly says a section was \"discussed above\" because that section does come earlier. A third reference, \"see Figure 3 for the regional breakdown,\" fails immediately on the existence check, because the map only contains Figure 1 and Figure 2.",
          "The fix is determinable from the map itself: Figure 1 is titled \"Response rate by region,\" which matches what the broken reference is trying to describe, so the report states the reference text exactly as written, names the failed check, and names Figure 1 as the likely intended target rather than leaving the gap unexplained.",
        ],
      },
      {
        heading: "How this differs from the structural outline audit skill",
        body: [
          "The structural outline audit skill checks a single document's overall shape, whether a press release has its dateline, whether a how-to guide states its prerequisites first, against the fixed structure its stated type is supposed to have. That is a check of the document against an external standard for its type.",
          "This cross reference audit skill for documents checks the document against itself instead: does what a reference in one place claims about another place actually match where that place is and what it is currently labelled. A document can pass a full structural outline audit and still point to a table deleted three drafts ago, which is the gap this narrower skill closes.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not judge whether the document has the sections its type requires, whether the prose reads well, or whether the facts stated are accurate. It checks only whether a reference pointing somewhere else in the same document points to something real, in the right direction, under the right label, nothing broader than that.",
        ],
      },
    ],
    howTo: {
      name: "How to use the cross reference integrity skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/cross-reference-worked-example.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Supply the full document, not an excerpt",
          text: "The map in step 1 has to be built from every heading, numbered section and figure or table label in the document, so hand over the complete draft rather than the section containing the references alone.",
        },
        {
          name: "Hand both files to your assistant and ask for a full pass",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then ask the assistant to build the map first and report on every reference it finds, not a sample of them.",
        },
      ],
    },
    faq: [
      {
        question: "What counts as a cross-reference for this skill to check?",
        answer:
          "Any phrase inside a document that points the reader to another part of that same document: a section number, a figure or table label, or a directional phrase like \"discussed above\" or \"shown below.\" References to sources outside the document are not covered, since there is no internal map position to check them against.",
      },
      {
        question: "How is this different from the structural outline audit skill?",
        answer:
          "The structural outline audit skill checks whether a document's overall shape matches what its stated type is supposed to have, a dateline, prerequisites, a findings section, against an external standard. This skill checks the document against itself, whether references within it actually point to real, correctly labelled targets in the right direction, which is a narrower and different job.",
      },
      {
        question: "Can the skill tell me what a broken reference should point to instead?",
        answer:
          "When the map makes it determinable, yes. If a reference names a label that does not exist but the surrounding content clearly matches another labelled element in the map, the report names that element as the likely intended target rather than just flagging the reference as broken with no suggested fix.",
      },
      {
        question: "Does the skill check references that don't include a direction word?",
        answer:
          "Yes. A reference with no directional claim, one that just says \"see Table 2\" with no \"above\" or \"below,\" still gets checked for existence and label accuracy. Only the direction check is skipped for that reference, since there is no directional claim to test against its position.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no draft document you later use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill require building a map before checking any reference?",
        answer:
          "Because checking a reference against how it reads, rather than against the document's actual headings, numbers and labels, is exactly what lets a plausible sounding but broken reference pass unnoticed. Building the map first and checking every reference against it, rather than against memory or impression, is the core discipline the skill enforces.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/writing-skills/structural-outline-audit-skill",
        label: "structural outline audit skill",
        description: "For checking a document's overall shape against its stated type, a broader and different check than this one's internal reference consistency.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "technical writing prompt",
        description: "For drafting the kind of numbered, cross-referenced technical content this skill's integrity check is applied to afterward.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For sentence level and grammar issues once this skill's reference check has confirmed every internal pointer is accurate.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "api documentation prompt",
        description: "A natural document type to run through this skill, since API references between endpoints and sections are exactly the kind of internal pointer that breaks after a restructure.",
      },
    ],
    externalLinks: [
      {
        href: "https://developers.google.com/style/cross-references",
        label: "Google Developer Documentation Style Guide: Cross-references",
        description: "Independent guidance on when and how a cross-reference should be used at all, the standard this skill's checks assume the document is trying to meet.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html",
        label: "W3C: Understanding Link Purpose (In Context)",
        description: "The accessibility standard behind requiring a reference's target and purpose to be genuinely determinable, not just plausible sounding, from its surrounding context.",
      },
      {
        href: "https://owl.purdue.edu/owl/general_writing/the_writing_process/proofreading/index.html",
        label: "Purdue OWL: Proofreading",
        description: "An independent explainer on treating a final pass over a document as a distinct, systematic check rather than a re-read for general impression.",
      },
    ],
  },

  tags: ["writing", "editing", "cross-reference", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
