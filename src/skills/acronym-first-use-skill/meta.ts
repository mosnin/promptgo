import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Acronym First Use Check

Use this skill whenever you are asked to review a document, report, proposal or article for
whether every acronym and initialism is spelled out in full the first time it appears. "First
use" only means anything if the document is read in the order a reader actually encounters it,
so this skill's whole method is built around a single pass, top to bottom, not a search for
every acronym followed by a check performed in whatever order is convenient.

## Before you scan anything

Ask the person handing you the document for a short list of acronyms that do not need
expansion in this specific context: the publication's own name, a company's own product name,
or a term so universally recognised by the intended audience that spelling it out would read as
strange rather than helpful. Keep this list short and specific to the document at hand. Do not
invent this list yourself from a general sense of what counts as common knowledge, and do not
silently skip every short capitalised token on the assumption that it is probably fine. Both of
those shortcuts produce a review nobody can trust: one buries a document in flags a careful
reader would ignore, the other quietly lets a genuinely unexplained acronym through.

If no list is given, say so plainly, propose two or three candidates you noticed while reading
that look like they might belong on it, and confirm before finishing the review rather than
guessing silently either way.

## The single pass, in reading order

Read the document from the first word to the last, maintaining one running list of acronyms
already defined. For each acronym or initialism encountered, in the order it appears:

1. Check the running list first. If the acronym is already on it, this is a later use, not a
   first use, so no expansion is required here. Move on.
2. If it is not on the running list and not on the confirmed assumed-known list, this is a
   first use. Check whether the full term appears alongside it in this same sentence or the one
   immediately before it.
3. If the expansion is present, add the acronym to the running list together with the exact
   wording of the expansion and the location it was defined at, then continue reading.
4. If no expansion is present, do not assume one is coming later and stay silent. Record it as
   an open item: the acronym, its location, and the fact that no expansion has been supplied yet.

Never scan the whole document first to collect every acronym and only then decide which ones
needed expanding. That approach cannot tell a first use from a tenth use without re-deriving the
reading order anyway, and it is exactly the shortcut that lets a used-before-defined error slip
past unnoticed.

## Closing an open item

When a later occurrence of an open item finally supplies an expansion, close it, but flag it as
a used-before-defined error rather than a clean first use: quote the earlier unexplained
occurrence, quote the location where the expansion eventually appears, and state plainly that a
reader who stopped at the earlier point had no way to know what the acronym meant.

If an open item reaches the end of the document with no expansion ever supplied, and it was not
confirmed as assumed-known, flag it as never expanded, with every location it was used.

## Catching a conflicting redefinition

If an acronym already on the running list appears again with a full expansion attached, and that
expansion does not match the one already recorded, this is not a stylistic slip, it is a
substantive error: the reader now has two different meanings attached to the same three or four
letters somewhere in the same document. Flag it by name, quoting the first expansion and its
location, the second expansion and its location, and stating plainly that the two do not match.
Do not silently prefer one expansion over the other or assume they refer to compatible ideas.
Report the conflict and let the document's author decide which one is correct.

## What to return

Return two things: the running list of every acronym that was successfully defined, with its
expansion and the location of its first use, and a separate list of every flagged item, grouped
by the three flag types above (never expanded, used before defined, conflicting redefinition).
For each flagged item, quote the exact location and wording rather than describing the problem
in general terms, so the fix is obvious without re-reading the whole document.

## What this skill does not do

It does not judge whether an acronym should exist in the document at all, whether the writing
around it is clear, or whether the acronym is the right choice of term. It checks exactly one
thing: whether every acronym that needed expanding got expanded at the first point a reader
would actually meet it, in the order the document presents it.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a short memo, read in order

This file shows the skill applied to a five paragraph internal memo, exactly as \`SKILL.md\`
describes: one pass, top to bottom, a running defined list, and three flag types.

## The source document

\`\`\`
1. The CRM cutover is confirmed for Monday. SSO against the new instance has already
   been tested by IT, and the QBR deck references the CRM numbers directly, so hold
   off on manual exports until the cutover finishes.

2. Quick context for anyone new: this memo uses QBR to mean the Quarterly Business
   Review (QBR), the same meeting we moved to Thursdays last quarter.

3. CRM here refers to our internal Customer Relationship Management platform, not the
   vendor's public dashboard, since two teams use the letters differently.

4. The SLA we signed with the vendor commits to 99.9 percent uptime, with a four hour
   response window for anything flagged Priority 1. That is the Service Level Agreement
   (SLA) support tickets should reference on the confirmation email.

5. Legal flagged a separate document using the same three letters: the reseller
   contract's own SLA, a Software Licensing Agreement covering the number of named
   seats we are allowed to provision. That is a different document from the uptime
   commitment above.

6. The QBR itself moves to the following Tuesday. The PDF export of the board deck is
   attached, and RCX access for the analytics pilot is still pending IT approval.
\`\`\`

## Before reading: the assumed-known question

Nothing in this memo was pre-cleared, so the skill asks first: PDF and RCX both look like
candidates, since PDF is a near-universal file format term and RCX reads like an internal
project codename rather than a term the memo intends to teach the reader. The person handing
over the memo confirms PDF as assumed-known for this audience and asks for RCX to be treated as
a normal acronym, since it is a newer codename not everyone on the distribution list would know.

## The pass, paragraph by paragraph

Paragraph 1: CRM appears with no expansion. It is not on the running list and not assumed-known,
so this is an open item: CRM, first seen paragraph 1, no expansion yet. SSO appears with no
expansion; open item: SSO, first seen paragraph 1, no expansion yet.

Paragraph 2: QBR appears with its expansion attached, "Quarterly Business Review (QBR)". This is
a clean first use. Running list gains QBR, defined as Quarterly Business Review, location
paragraph 2.

Paragraph 3: CRM appears again, now with an expansion, "internal Customer Relationship
Management platform." Because CRM was already an open item from paragraph 1, this closes as a
used-before-defined error rather than a clean first use.

Paragraph 4: SLA appears with its expansion, "Service Level Agreement (SLA)." Clean first use.
Running list gains SLA, defined as Service Level Agreement, location paragraph 4.

Paragraph 5: SLA appears again, this time expanded as "Software Licensing Agreement," a
different expansion from the one already on the running list. This is a conflicting
redefinition, not a repeat use.

Paragraph 6: QBR reappears; it is already on the running list with a matching sense, so no flag.
PDF appears unexpanded, but PDF was confirmed assumed-known, so no flag. RCX appears unexpanded
and reaches the end of the document with no expansion ever supplied.

## Final report

Running list: QBR, Quarterly Business Review, first defined paragraph 2. SLA, Service Level
Agreement, first defined paragraph 4.

Flags, used-before-defined: CRM used unexpanded in paragraph 1, not expanded until paragraph 3.

Flags, conflicting redefinition: SLA defined as Service Level Agreement in paragraph 4, then
redefined as Software Licensing Agreement in paragraph 5.

Flags, never expanded: SSO used in paragraph 1 with no expansion anywhere in the document; RCX
used in paragraph 6 with no expansion anywhere in the document, confirmed not assumed-known.

Not flagged, assumed-known: PDF, confirmed by the document owner before the pass began.
`;

const meta: SkillMeta = {
  slug: "acronym-first-use-skill",
  name: "Acronym First Use Check",
  title: "Acronym First Use Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that reads a document in order, tracks every acronym against a running defined list, and flags an acronym used before its definition or redefined with a conflicting expansion.",

  seo: {
    primaryKeyword: "acronym first use skill",
    keywords: [
      "acronym first use skill",
      "free ai skill for acronym checking",
      "downloadable acronym expansion checklist",
      "ai skill to check acronym first use",
      "acronym definition checker for ai assistant",
    ],
    seoTitle: "Acronym First Use Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable acronym first use skill that reads a document in order, tracks defined acronyms, and flags a used-before-defined or conflicting redefinition.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Models asked to check acronym usage reliably miss two specific failure patterns: an acronym used earlier in a document than the sentence that finally expands it, and the same acronym expanded two different ways in two different places. Both slip past a model that searches for every acronym first and checks each one in isolation, because that approach loses the reading order a first-use rule depends on. This skill's single top-to-bottom pass with a running defined list is built to catch both patterns, plus a plain list of acronyms never expanded at all, without flagging terms the document owner has confirmed do not need expanding.",
  },

  article: {
    intro: [
      "An acronym first use skill only earns its name if it can tell a first use from a tenth use, which means it has to read a document in the order a person actually reads it, not scan for every acronym and check them in whatever order is convenient. Most AI assistants asked to check acronym expansion do the second thing: they collect every capitalised token in one pass, then judge each one against the whole document at once, which quietly erases the one fact a first-use rule depends on, namely which occurrence came first.",
      "This skill is built around a single ordered pass instead. It ships as two plain text files: a main instructions file describing the pass and its three flag types, and a worked reference example showing the pass applied line by line to a short memo, including a used-before-defined error and a conflicting redefinition. Both files are previewable in full on this page before you download the zip, and both are exactly what an assistant or a teammate receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why reading order decides what counts as a first use",
        body: [
          "A first-use rule is only meaningful relative to the order a reader actually encounters the text. An acronym expanded in paragraph four does the reader in paragraph one no good at all, even though a document-wide search would find the expansion sitting somewhere in the file and might wrongly report the acronym as handled.",
          "That is the exact gap this skill closes. It reads top to bottom, maintaining one running list of acronyms already defined, so an occurrence is only ever judged against what has actually appeared before it, not against the document as a whole. A free ai skill for acronym checking that skips this ordering constraint is not actually checking first use, whatever it claims to be doing.",
        ],
      },
      {
        heading: "The reading-order dependency, and why a two-pass scan breaks it",
        body: [
          "It is tempting to scan a document once to collect every acronym, then check each one separately against wherever its expansion happens to live. That approach cannot distinguish an acronym that was properly expanded before its first real use from one that was used unexplained for three paragraphs and only expanded afterward, because both look identical once every occurrence has already been collected into one flat list.",
          "This is why the instructions insist on a single ordered pass: an acronym is only added to the running defined list once an expansion has actually been seen next to it, at the point in the document that expansion appears, never earlier.",
        ],
      },
      {
        heading: "The used-before-defined flag",
        body: [
          "When an acronym is used with no expansion, and a later part of the document finally supplies one, that is not a clean first use, it is an error the reading-order pass is specifically built to catch. The skill records the earlier unexplained occurrence, the later location where the expansion finally appears, and states plainly that a reader who stopped reading before that point had no way to know what the letters meant.",
          "A model checking acronyms out of order routinely misses this pattern entirely, because by the time it inspects the acronym, the expansion is already sitting somewhere in the document and looks satisfied.",
        ],
      },
      {
        heading: "The conflicting redefinition case",
        body: [
          "A second, genuinely confusing error is an acronym defined twice with two different expansions in the same document. This is not a style question, it means two different ideas are now attached to the same three or four letters, and a reader has no way to know which meaning applies at a given point without checking context clues the acronym itself no longer provides.",
          "As an ai skill to check acronym first use, this skill treats a conflicting redefinition as its own flag type, distinct from a missing expansion: it quotes both expansions, both locations, and states plainly that the two do not match, without guessing which one the author actually meant.",
        ],
      },
      {
        heading: "Why the skill asks before flagging a universally-known acronym",
        body: [
          "Flagging every short capitalised token in a document, including a company's own product name or a term so common to the intended audience that spelling it out reads as strange, produces a review nobody trusts, because most of the flags are noise the reader already discounts. Silently assuming which acronyms are fine is just as unreliable, since that guess is invisible and unverifiable.",
          "This skill's instructions require a short, specific assumed-known list to be confirmed with the document's owner before the pass begins, rather than the skill deciding on its own which acronyms are obvious. A downloadable acronym expansion checklist is only useful if the flags it raises are ones a reader would actually act on.",
        ],
      },
      {
        heading: "Using the downloaded files as an acronym definition checker for ai assistant work",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file assumes the worked example is available alongside it as a reference for the exact shape of a completed pass. Keeping the folder structure intact, SKILL.md next to a reference folder, preserves that pairing once the files are unzipped on your own machine.",
        ],
      },
    ],
    howTo: {
      name: "How to use the acronym first use skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what the pass looks like before you hand it to an assistant.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Prepare a short assumed-known list",
          text: "Before running a check, note any acronyms specific to your document or audience, such as a product name, that should not be flagged for expansion.",
        },
        {
          name: "Hand both files to your assistant with the document",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your assumed-known list alongside the document to check.",
        },
      ],
    },
    faq: [
      {
        question: "Why does reading order matter for checking acronym expansion?",
        answer:
          "A first-use rule is defined relative to the order a reader actually meets the text, so an acronym expanded later in a document does not help a reader who encountered it unexplained earlier on. Checking acronyms out of order, by collecting every one first and judging each in isolation, erases that ordering and can miss a used-before-defined error entirely. This acronym first use skill is built specifically to avoid that shortcut.",
      },
      {
        question: "What happens if the same acronym is expanded two different ways?",
        answer:
          "The skill flags this as a conflicting redefinition, a distinct and more serious flag than a missing expansion, since it means two different meanings are attached to the same letters somewhere in the document. It quotes both expansions and both locations rather than guessing which one the author intended.",
      },
      {
        question: "Will this skill flag every short capitalised word it finds?",
        answer:
          "No. It asks for a short, specific assumed-known list before starting the pass, covering acronyms such as a company's own product name or a term the intended audience already treats as common knowledge. It does not invent this list itself, and it does not silently skip tokens it was never asked about either.",
      },
      {
        question: "What if an acronym is never expanded anywhere in the document?",
        answer:
          "It is recorded as an open item during the pass and, if the end of the document is reached with no expansion supplied and it was not confirmed as assumed-known, it is reported as never expanded, along with every location it was used, so the gap is easy to fix.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the document you eventually run the skill against is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading them?",
        answer:
          "Yes. Both files are plain text, so they open in any text editor. This page is a read only preview of the exact content that downloads; changing the flag types or the worked example happens afterward in your own editor.",
      },
    ],
    internalLinks: [
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "technical writing prompt",
        description: "For drafting the kind of acronym-dense technical document this skill is meant to check afterward.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "A broader one-off pass for typos and consistency slips, useful alongside a dedicated acronym check.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description: "For rewriting a passage in plainer language once an acronym has been flagged as unclear or unnecessary.",
      },
      {
        href: "/skills/writing-skills/editorial-style-guide-enforcement-skill",
        label: "editorial style guide enforcement skill",
        description: "A broader mechanical style check that includes acronym expansion as one of nine categories, against a named style guide.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Abbreviations.html",
        label: "The Chicago Manual of Style: Abbreviations Q&A",
        description: "An independent style authority's guidance on spelling out an abbreviation in full before using it on its own.",
      },
      {
        href: "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/apa_abbreviations.html",
        label: "Purdue OWL: APA Abbreviations",
        description: "A widely used academic writing reference on introducing an abbreviation with its full term at first use.",
      },
      {
        href: "https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/",
        label: "GOV.UK Style Guide: A to Z",
        description: "A public sector style guide with an explicit first-use rule and a named list of acronyms exempt from expansion.",
      },
      {
        href: "https://www.merriam-webster.com/grammar/whats-an-acronym",
        label: "Merriam-Webster: What's an Acronym?",
        description: "An independent reference distinguishing an acronym from an initialism, the terminology this skill's instructions rely on.",
      },
    ],
  },

  tags: ["writing", "editing", "acronyms", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
