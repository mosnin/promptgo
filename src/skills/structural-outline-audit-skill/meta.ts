import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Structural Outline Audit

Use this skill when you are asked to check whether a draft document has the
shape it is supposed to have: a press release missing its dateline, a how-to
guide that never states its prerequisites, an executive summary that buries
the recommendation on the last page instead of the first. This skill checks
one thing only, whether the document contains the sections its stated type is
expected to contain, in the order that type expects them. It does not judge
sentence quality, grammar, tone or argument strength. A document can pass this
audit and still read badly, and a document can be well written and still fail
it because a required section is missing or out of place.

## Before checking anything, get the document type

Ask the user which document type the draft is meant to be, if it has not
already been stated. Never infer the type from the prose itself. A draft that
reads like a blog post might have been commissioned as a press release, and a
document that sounds formal might actually be an internal executive summary.
Guessing the type from tone or length substitutes a surface impression for
the one fact that actually determines the correct structure, so the audit
cannot start until a specific type is named.

Once a type is stated, look it up in \`reference/document-structures.md\`.
That file names five document types, each mapped to a fixed, ordered list of
structural elements: blog post, technical report, press release, how-to
guide and executive summary. Match the stated type to one of these five
before doing anything else. A close synonym counts, a launch announcement is
a press release, a tutorial is a how-to guide, a status report for
leadership is an executive summary, but the match must be a genuine synonym,
not a loose resemblance.

## Running the audit against a matched type

1. Pull the ordered element list for the matched type from the reference
   file.
2. Read the draft once, marking where each expected element does, or does
   not, appear.
3. Report each element as present in the right position, present but out of
   order, or missing entirely. For anything present, quote the heading or
   opening words of the section that satisfies it. For anything out of
   order, state where it currently sits and where the expected structure
   places it. For anything missing, name exactly what is absent, not a vague
   description of the gap.
4. Do not silently accept a section that partially satisfies an element. A
   press release lead paragraph that states who and what but never states
   when or where is a partial match and must be reported as such, not marked
   present.
5. End with a short summary: how many of the expected elements are present,
   in order, and a list of the specific fixes needed, ordered the same way
   the structure itself is ordered.

Never substitute a generic "has an introduction, a body and a conclusion"
check for this process when the stated type has a real, named structure in
the reference file. That generic check discards exactly the information the
reference file exists to supply, and it will pass documents that are missing
a dateline, a boilerplate, prerequisites or a stated goal, because those are
invisible to a three part check.

## When the stated type is not covered

If the document type given does not match any of the five types in the
reference file, and is not a clear synonym of one of them, say so plainly.
Name the five types the skill does have real guidance for, and ask whether
one of them is actually the closest fit. Do not invent a structure for an
uncovered type by guessing what its sections probably are, and do not fall
back to the generic three part check and present it as if it were tailored
guidance. If the user still wants a check on an uncovered type, run the
generic check only on explicit request, and label the result clearly as a
generic pass with no type specific guidance behind it, so nobody mistakes it
for the same standard applied to the five covered types.

## What this skill does not do

It does not rewrite the document, does not comment on prose quality, and
does not check facts, tone or word choice. It does not accept a document
type inferred from formatting alone, a document with headings that look
like a report is not a technical report unless the user says it is meant to
be one. Structure and genre are stated facts, not something to be guessed
from appearance.
`;

const DOCUMENT_STRUCTURES_MD = `# Document structures: five types, in order

Use this alongside \`SKILL.md\`. Each document type below lists its expected
structural elements in the order they are expected to appear. An element
being present but in the wrong position is a failing result, the same as an
element being missing outright.

## 1. Blog post

1. Title that states or implies the reader's payoff, not just the topic.
2. Opening hook, a specific scenario, question or claim that establishes why
   this post is worth reading right now, within the first two or three
   sentences.
3. A stated promise of what the post will cover, so the reader knows the
   scope before committing to read further.
4. Body sections, each addressing one subtopic, ordered so that earlier
   sections do not depend on information only given later.
5. A closing section that either summarises the main point or gives the
   reader a specific next action. A post that simply stops after the last
   body section, with no closing, fails this element.

What to check: does the opening hook appear before any general background,
and does the closing section exist as a distinct block rather than the last
body paragraph trailing off.

## 2. Technical report

1. Title and a one paragraph abstract stating the problem, the approach and
   the headline result, before any other content.
2. Background or context section, establishing what the reader needs to know
   before the findings make sense.
3. Method or approach section, describing what was actually done in enough
   detail that the reader could assess it.
4. Findings or results section, kept separate from interpretation, stating
   what was observed.
5. Discussion or interpretation section, stating what the findings mean,
   kept after and separate from the findings themselves.
6. Recommendations or next steps, stated explicitly rather than left for the
   reader to infer from the discussion.

What to check: whether findings and interpretation are kept in separate
sections, since merging them is the most common structural failure in this
type, and whether an abstract exists at all before the background section.

## 3. Press release

1. Dateline: the city and the date the release is issued, at the top of the
   body copy.
2. Lead paragraph answering who, what, when and where in a single opening
   paragraph, before any supporting detail or quote.
3. Supporting body copy with detail and at least one quote from a named
   spokesperson.
4. Boilerplate: a short standard paragraph describing the organisation,
   placed after the body copy and before contact information.
5. Contact information: a named person, with a way to reach them, as the
   final element.

What to check: whether the dateline and the lead paragraph both exist before
any quote or supporting detail, and whether the boilerplate and contact
information appear last, in that order, rather than being folded into the
body copy or omitted.

## 4. How-to guide

1. A stated goal: what the reader will be able to do once they finish,
   stated in the opening lines, not left implicit in the title alone.
2. Prerequisites: what the reader needs before starting, tools, access,
   prior knowledge, stated as a distinct block before the first numbered
   step.
3. Numbered steps, each one action, in the exact order they must be
   performed, not reordered for readability.
4. A verification step: something the reader can check to confirm the
   result actually worked, placed after the last numbered step.

What to check: whether prerequisites are stated before step one rather than
discovered partway through a step, and whether a verification step exists at
all. A guide that ends on the final action step, with no way to confirm
success, is missing its last required element.

## 5. Executive summary

1. The recommendation or headline conclusion, stated in the first one or two
   sentences, before any background.
2. Key supporting reasons, stated briefly, immediately after the
   recommendation.
3. Relevant data or evidence, kept short, supporting the reasons already
   given rather than introducing new claims.
4. Risks or open questions, named explicitly rather than omitted.
5. A closing statement of the requested decision or action, naming who needs
   to act and by when.

What to check: whether the recommendation appears in the opening sentences
rather than being built up to across several paragraphs. An executive
summary that reads like a technical report, background first and
conclusion last, has its structure backwards even if every element it needs
is technically present somewhere in the text.

## When a stated type is not one of these five

Do not adapt one of the five structures to fit a type that is not actually a
close synonym of it. A product one pager is not automatically a press
release, and a project retrospective is not automatically a technical
report, even though they share some surface features. If the stated type is
not a genuine synonym of one of the five, treat it as uncovered and say so,
per the instructions in \`SKILL.md\`.
`;

const meta: SkillMeta = {
  slug: "structural-outline-audit-skill",
  name: "Structural Outline Audit",
  title: "Structural Outline Audit Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that checks a draft against the named, ordered structure expected for its stated document type, and refuses to fall back on a generic intro, body, conclusion check when a specific structure is knowable.",

  seo: {
    primaryKeyword: "structural outline audit skill",
    keywords: [
      "structural outline audit skill",
      "ai skill to audit document structure",
      "document structure checklist for ai assistant",
      "downloadable document structure checklist",
      "how to audit a document outline",
    ],
    seoTitle: "Structural Outline Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable structural outline audit skill that checks a draft against the named structure for its stated document type, in order.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/document-structures.md", content: DOCUMENT_STRUCTURES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a document's structure default to a generic intro, body and conclusion check regardless of the document's actual stated type, which misses the specific elements that type actually requires, a dateline, a set of prerequisites, a boilerplate placed last. This skill forces the document type to be named before any check runs, maps that type to a specific ordered structure, and requires the skill to say plainly when a stated type has no matching structure rather than inventing one to fit.",
  },

  article: {
    intro: [
      "A structural outline audit skill is only as useful as its refusal to generalise. Handed a document and asked whether the structure holds up, most AI assistants reach for the same three part check, an introduction, a body and a conclusion, no matter whether the draft is a press release, a how-to guide or an executive summary. That check passes almost anything, because almost anything technically has a beginning, a middle and an end. This skill is built to refuse that shortcut, and this page also explains how to audit a document outline the right way, against its own named structure.",
      "It ships as two plain text files: a main instructions file and a reference file mapping five document types to their real, ordered structural elements. Both are previewable in full before you download the .zip, and both are exactly what an assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a generic intro, body, conclusion check misses the point",
        body: [
          "Almost any document, however malformed, can be described as having a beginning, a middle and an end. That is why the check is worthless for catching real defects: a press release missing its dateline and contact information still has three loosely defined parts, and a how-to guide missing its prerequisites still reads as an intro followed by steps followed by a wrap up line.",
          "The elements that actually matter differ by document type: a dateline, a lead paragraph answering who, what, when and where, a boilerplate, contact information, in that exact order for a press release. A generic check has no way to represent any of that, which is why this skill requires a named document type before it runs a single check.",
        ],
      },
      {
        heading: "Naming the document type before checking anything",
        body: [
          "The skill will not infer a document's type from its tone or formatting. A draft that sounds formal is not automatically a technical report, and a draft with numbered steps is not automatically a how-to guide unless the person supplying it says so. Document type is a stated fact, not a guess made from appearance, so the first instruction is to ask for it directly. This makes it an ai skill to audit document structure against a stated fact, never a resemblance.",
          "Once a type is named, it gets matched against five covered types in the reference file: blog post, technical report, press release, how-to guide, executive summary. A close synonym counts, a launch announcement is a press release and a tutorial is a how-to guide, but the match has to be genuine rather than a loose resemblance.",
        ],
      },
      {
        heading: "Worked example: auditing a press release against its real structure",
        body: [
          "Take a draft announcement that opens with a paragraph of internal history, mentions a spokesperson quote midway through with no attribution, and ends abruptly after a features list. Checked against the press release structure, this fails on four elements: no dateline at the top, the lead paragraph never states when or where the announcement takes effect, no boilerplate describing the organisation, and no named contact at the end.",
          "The audit reports each of those four as missing by name, quotes the section that partially covers the lead paragraph and explains why stating only who and what is a partial match, then closes with an ordered fix list: add a dateline, complete the lead paragraph with a when and a where, add a boilerplate after the body copy, and add named contact information last.",
        ],
      },
      {
        heading: "Running the audit once a type is matched",
        body: [
          "The skill reads the draft once against the ordered element list, marking each element present in the right position, present but out of order, or missing entirely. A section that partially satisfies an element, stating who and what without when and where, is reported as a partial match, exactly the kind of defect a looser check would miss.",
          "The closing summary states how many expected elements are present and in order, then lists the fixes needed, in the order the structure expects them. Used this way, the reference file acts as a document structure checklist for ai assistant work, not a list read once and forgotten.",
        ],
      },
      {
        heading: "What happens when the stated type is not covered",
        body: [
          "If a document type does not match any of the five in the reference file and is not a clear synonym of one of them, the skill says so plainly rather than adapting a close structure to fit or falling back to a generic check silently. It names the five types it has real guidance for, since the reference file is a downloadable document structure checklist covering only those, and asks whether one of them is the closest fit.",
          "If the user still wants a check on an uncovered type, that check can run, but only on explicit request, and the result must be labelled clearly as generic with no type specific guidance behind it, so it is never mistaken for the same standard applied to a covered type.",
        ],
      },
      {
        heading: "What this skill does not do",
        body: [
          "It does not judge prose quality, grammar or argument strength, and it does not rewrite the document. A document can pass this audit and still read badly, and a well written document can fail it because a required element, a verification step, a boilerplate, a stated recommendation, is missing or in the wrong place. Those are two different problems and this skill catches only one.",
        ],
      },
    ],
    howTo: {
      name: "How to use the structural outline audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/document-structures.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "State the document type up front",
          text: "Before handing over a draft, decide plainly which of the five covered types it is meant to be, or name the type and expect the skill to say if it is not covered.",
        },
        {
          name: "Hand both files and the draft to your assistant",
          text: "Keep the folder structure intact so the instructions file can point to the reference file, then supply the stated document type and the draft to be audited.",
        },
      ],
    },
    faq: [
      {
        question: "What document types does the structural outline audit skill actually cover?",
        answer:
          "Five types, each mapped to a specific ordered list of structural elements: blog post, technical report, press release, how-to guide and executive summary. A close synonym counts as a match, but the skill will not stretch a structure to fit a type that is not genuinely one of the five.",
      },
      {
        question: "What happens if my document type is not one of the five covered?",
        answer:
          "The skill says so explicitly rather than inventing a structure or falling back to a generic check. It names the five covered types and asks whether one is the closest real match, and only runs a labelled generic check if you explicitly ask for one.",
      },
      {
        question: "Does this skill check grammar or writing quality?",
        answer:
          "No. It checks one thing, whether the expected structural elements for the stated document type are present and in the correct order. A document can be well written and still fail this audit if it is missing a required element such as a boilerplate or a verification step.",
      },
      {
        question: "Can the skill guess my document's type from its formatting?",
        answer:
          "No, and its instructions forbid it. Document type is treated as a stated fact rather than something inferred from tone, headings or length, because a document that merely resembles a report is not the same as one actually meant to be checked against report structure.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no draft document you later use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill treat a partially present section as a failure?",
        answer:
          "Because a section that only half satisfies an element, stating who and what in a press release lead paragraph without when and where, hides a real gap if marked present. Reporting it as a partial match keeps the fix list accurate instead of letting a loosely written section count as done.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/press-release-prompt",
        label: "press release prompt",
        description: "A natural document to run through this skill's press release structure check once it has been drafted.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "technical writing prompt",
        description: "For drafting the kind of technical report content this skill's structure check is applied to afterward.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For sentence level and grammar issues once this skill's structural pass has confirmed the right sections exist.",
      },
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description: "For planning a blog post's structure from scratch, rather than auditing a finished draft against it.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.ap.org/about/news-values-and-principles/",
        label: "AP: News Values and Principles",
        description: "The wire service standard behind the ordered elements a press release is expected to carry, from lead paragraph to attribution.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/organize/",
        label: "plainlanguage.gov: Organize information for the reader",
        description: "A federal standard on ordering a document's sections around what the reader needs first, the same discipline behind an executive summary's structure.",
      },
      {
        href: "https://www.nngroup.com/articles/how-to-write-executive-summary/",
        label: "Nielsen Norman Group: How to Write an Executive Summary",
        description: "An independent explainer on why an executive summary's recommendation belongs in the opening sentences rather than after the supporting detail.",
      },
    ],
  },

  tags: ["writing", "editing", "document structure", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
