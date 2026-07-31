import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Vendor Comparison Matrix Skill

Use this skill whenever you are asked to build a structured, side by side
comparison of two or more vendor options against a stated set of evaluation
criteria: software tools, agencies, manufacturers, contractors, or any other
purchase where more than one option exists and someone needs to see them
lined up against the same rows.

The output is a matrix: criteria down the rows, vendors across the columns,
one cell per vendor per criterion. It is a document meant to be built once
and extended over days or weeks as real information arrives, not a single
turn answer.

## The one rule that matters more than the rest

Never fill a cell from general knowledge about a vendor. Do not write in a
capability, a price, a certification, or a claim because it sounds right or
because it is commonly true of that vendor's product category. A model's
training data about a specific company is frequently stale, sometimes wrong,
and never a substitute for the vendor's actual current documentation.

Every cell must be filled one of two ways:

1. From material the user actually supplied in this conversation: a pasted
   spec sheet, a quote, a pricing page they copied in, a paragraph from
   documentation, notes from a call. When you fill a cell this way, name the
   source next to the value in the cell, for example "SSO on paid tier only,
   source: pricing page pasted 3 March."
2. Marked explicitly as \`Not yet verified\` when no such material has been
   supplied for that vendor and that criterion. Do not soften this into a
   guess dressed up as caution. \`Not yet verified\` means the cell is empty
   of fact, not "probably yes."

If asked to fill in a whole matrix from a short list of vendor names and
nothing else, do not attempt it. Build the empty matrix, mark every cell
\`Not yet verified\`, and ask for the material needed to fill each column.

## Building the matrix

1. Confirm the criteria first. Ask what the decision actually depends on,
   then list each as one row. Keep each criterion checkable, something a
   real document either does or does not confirm, rather than a vague
   quality like "good support."
2. List the vendor names as columns, in the order they were given.
3. Lay the skeleton out using the structure in
   \`reference/matrix-template.md\`, which shows the exact row and column
   pattern including the source and verification columns.
4. Fill cells only from supplied material, one vendor at a time. Do not
   cross reference what one vendor's documentation says to guess at a
   competitor's equivalent feature. Each vendor's column is filled only
   from that vendor's own material.
5. After every update, list which cells are still \`Not yet verified\` and
   name the specific document or quote that would resolve each one. This
   gap list is what turns the matrix into something the user can act on,
   rather than a table that quietly looks more complete than it is.

## Updating the matrix as new material arrives

This skill is built to be reused across a single decision as material comes
in over time, not answered once and discarded. When new material is pasted
in for a vendor that already has cells marked \`Not yet verified\`, update
only the cells that material actually supports, replace the marker with the
value and its source, and leave every other cell exactly as it was.

## What this skill will not do

It will not rank, score, or recommend a winner. It builds the comparison
surface; a separate weighted scoring pass is a different job with a
different discipline, covered by other material on evaluation methodology.
It also will not review contract language, liability terms, or termination
clauses; a filled in pricing or feature cell is not a substitute for reading
the actual contract before signing.
`;

const MATRIX_TEMPLATE_MD = `# Matrix template: exact row and column structure

Use this alongside \`SKILL.md\`. This file shows the literal structure the
matrix should take, not just a description of it, so the shape can be copied
directly into a document, a spreadsheet, or a chat reply.

## The base structure

| Criterion | Source column | Vendor A | Vendor B | Vendor C |
|---|---|---|---|---|
| Must have: data stays in region X | where confirmed | Not yet verified | Confirmed, source: docs page pasted 4 March | Not yet verified |
| Pricing at stated seat count | where confirmed | Not yet verified | Not yet verified | Confirmed, source: quote pasted 5 March |
| Integration with existing system Y | where confirmed | Not yet verified | Not yet verified | Not yet verified |
| Support response time commitment | where confirmed | Not yet verified | Not yet verified | Not yet verified |

Each row is one criterion, agreed before any vendor material is reviewed, so
the same row order applies to every vendor added later. Each cell holds one
of exactly three things: a confirmed value with its source named inline, the
literal marker \`Not yet verified\`, or, rarely, \`Not applicable\` when a
criterion genuinely does not apply to that vendor's offering, which itself
needs a one line reason.

## Adding a vendor

Adding a fourth or fifth vendor means adding one column, never adding a row
that only applies to the new vendor. If a new vendor introduces a
consideration nobody had thought of, add that row to every column, marking
the existing vendors \`Not yet verified\` for it rather than leaving the row
half filled in a way that looks like the others were checked and passed.

## The gap summary block

Below the table, keep a short running list in this shape:

\`\`\`
Still not yet verified:
- Vendor A, data residency: need the current hosting page or a written answer from sales
- Vendor A, pricing at stated seat count: need a quote
- Vendor B, integration with system Y: need a technical call or the integrations page
- Vendor C, support response time: need the SLA document, not the marketing page
\`\`\`

This block is what someone reads first. A matrix with twelve filled cells
and six honestly marked gaps is more useful than one that looks complete
because every gap was quietly guessed at. Keep the block current every time
a cell changes, and delete a line only once the matching cell has moved from
\`Not yet verified\` to a sourced value.

## Reading the finished matrix

A finished matrix is not one where every cell has a value. It is one where
every cell has either a sourced value or an accurate \`Not yet verified\`
marker, and the gap block names exactly what would close each remaining
one. Treat a matrix that reaches that state as ready for a scoring or
recommendation pass done elsewhere, not as a decision in itself.
`;

const meta: SkillMeta = {
  slug: "vendor-comparison-matrix-skill",
  name: "Vendor Comparison Matrix",
  title: "Vendor Comparison Matrix Skill",
  category: "business-skills",
  summary:
    "A downloadable instruction pack that builds a structured, side by side vendor comparison matrix from real supplied material only, marking any cell without evidence Not yet verified instead of filling it in from a guess.",

  seo: {
    primaryKeyword: "vendor comparison matrix skill",
    keywords: [
      "vendor comparison matrix skill",
      "free ai skill for vendor comparison",
      "downloadable vendor comparison matrix template",
      "ai skill for procurement comparison matrix",
      "how to build a vendor comparison matrix",
    ],
    seoTitle: "Vendor Comparison Matrix Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable vendor comparison matrix skill that fills cells only from real supplied vendor material, marking gaps Not yet verified instead of guessing.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/matrix-template.md", content: MATRIX_TEMPLATE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to compare named vendors, models routinely fill capability and pricing cells from general training knowledge about the vendor rather than asking for current material, and that training knowledge is often stale or simply wrong by the time a real purchase decision is being made. This skill's instructions require every cell to trace to material actually supplied in the conversation, with an explicit Not yet verified marker standing in for anything that cannot, so an empty cell never gets dressed up as a checked one.",
  },

  article: {
    intro: [
      "A vendor comparison matrix skill is only trustworthy if it can tell a fact someone supplied from a fact it assumed. Asked to line three vendors up against a dozen criteria, most AI assistants will happily fill every cell with whatever they already associate with those vendor names, because a complete looking table is easier to produce than an honest one. This skill is built to refuse that shortcut.",
      "It ships as two plain text files, packaged as a free ai skill for vendor comparison work rather than a single prompt: a main instructions file and a reference file showing the exact row and column structure the matrix should take. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "What a vendor comparison matrix skill actually builds",
        body: [
          "The structure is simple on purpose: criteria down the rows, vendors across the columns, one cell per pairing. What makes it useful is not the grid, which anyone can draw in a spreadsheet in thirty seconds, but the discipline applied to what goes inside each cell.",
          "Used as an ai skill for procurement comparison matrix work, it treats the matrix as a living document rather than a one turn answer, which is how to build a vendor comparison matrix that survives a multi week decision. Real procurement material arrives over days or weeks, a quote here, a documentation page there, and the matrix is meant to be reopened as each piece lands.",
        ],
      },
      {
        heading: "The discipline: marking a cell Not yet verified",
        body: [
          "This is the mechanism the whole skill exists to enforce. A cell is filled one of two ways only: from material the user actually pasted in during the conversation, with the source named beside the value, or with the literal marker Not yet verified when no such material exists yet for that vendor and that criterion.",
          "Not yet verified is not a softened guess. It does not mean probably yes, and it is not replaced with a plausible sounding answer just because the vendor's product category makes a capability likely. It means the cell is empty of fact, stated plainly, so nobody downstream mistakes an absence of evidence for a confirmed feature.",
        ],
      },
      {
        heading: "Why an assumed capability is worse than an empty cell",
        body: [
          "An empty, honestly marked cell tells a reader exactly what they still need to find out. A cell filled from assumed general knowledge about the vendor tells them nothing true while looking exactly like a cell that was actually verified, which is the more dangerous state. A pricing tier that changed last quarter or a feature that moved to a higher plan will not show up in a model's general sense of a well known vendor.",
          "Presenting that kind of guess as a comparison fact is how a real, expensive wrong decision gets made: a team picks a vendor believing a capability was confirmed when it was only assumed, then discovers the gap after signing. This skill's row by row source requirement exists to prevent exactly that failure.",
        ],
      },
      {
        heading: "How this differs from the vendor evaluation prompt",
        body: [
          "The vendor evaluation prompt on this site is a scoring exercise: it freezes weighted criteria before a demo, then scores vendors against those weights with an evidence source per score, and produces a recommendation once a leader is clear.",
          "This skill is a different, earlier job. It builds and maintains the comparison surface itself, the matrix of facts a scoring pass would eventually run against, and it does not weight, score, or recommend anything. Where the evaluation prompt asks what should win, this skill only asks what is actually known about each vendor so far, and it stays open across a decision that might take weeks.",
        ],
      },
      {
        heading: "How this differs from a vendor contract review",
        body: [
          "The vendor contract review prompt on this site reads an actual contract and flags specific clauses worth a second look: auto renewal, liability caps, exit terms, data ownership. It works on one document, from one vendor, after that vendor has already been chosen.",
          "This skill works earlier, across every vendor still in contention, on capability and pricing claims rather than contract language, and it never substitutes for a contract read. A feature confirmed here from a pasted spec sheet still needs the contract itself checked before signing, since a spec sheet and a signed agreement do not always say the same thing.",
        ],
      },
      {
        heading: "Using the matrix template file",
        body: [
          "The reference file works as a downloadable vendor comparison matrix template rather than a description of one: a criterion column, a source column, and one column per vendor, with a short gap summary block beneath the table listing every cell still marked Not yet verified and the specific document that would resolve it.",
          "Adding a new vendor means adding a column, never a row that only applies to that vendor, so every option is always checked against the exact same criteria in the same order. Keeping that structure intact is what makes the matrix genuinely comparable rather than a set of separate notes that happen to share a page.",
        ],
      },
    ],
    howTo: {
      name: "How to use the vendor comparison matrix skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/matrix-template.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather real vendor material before filling any cell",
          text: "Collect spec sheets, quotes, pricing pages, or documentation for each vendor as it becomes available. Nothing should be typed into a cell without one of these behind it.",
        },
        {
          name: "Fill the matrix and keep the gap list current",
          text: "Hand both files, your criteria list, and whatever material you have to your assistant, and have it mark every cell without supporting material Not yet verified rather than filled in.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have documentation for one vendor so far?",
        answer:
          "The skill fills that vendor's column from the material you supplied and marks every other vendor's cells Not yet verified for now. It will not use one vendor's documentation to guess at a competitor's equivalent feature.",
      },
      {
        question: "How is this different from the vendor evaluation prompt on this site?",
        answer:
          "The evaluation prompt freezes weighted criteria and scores vendors toward a recommendation in a single structured pass. This skill builds and maintains the underlying comparison matrix of facts across a longer decision, filled only from supplied material, and it does not weight, score, or recommend a winner itself.",
      },
      {
        question: "How is this different from the vendor contract review prompt?",
        answer:
          "The contract review prompt flags risky clauses inside one already chosen vendor's signed or draft contract. This skill compares capability, pricing, and specification claims across every vendor still in contention, earlier in the process, and it is never a substitute for having the actual contract read before signing.",
      },
      {
        question: "Can the assistant use its general knowledge of a vendor to speed things up?",
        answer:
          "No, and the instructions say so explicitly. General knowledge about a named vendor is often stale or simply wrong by the time a real purchase decision happens, so every cell must trace to material actually supplied or be marked Not yet verified rather than filled from assumption.",
      },
      {
        question: "Does downloading or previewing this skill send my vendor data anywhere?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser, with no server call behind either action. Nothing about the vendor material you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I add more vendors or criteria than the template shows?",
        answer:
          "Yes. The template shows the pattern with a small example set, and the instructions are explicit that a new vendor becomes a new column checked against every existing row, while a new criterion becomes a new row applied to every existing vendor, so the comparison always stays even.",
      },
    ],
    internalLinks: [
      {
        href: "/business-prompts/vendor-evaluation-prompt",
        label: "vendor evaluation prompt",
        description: "For the weighted scoring and recommendation pass that runs once this skill's comparison matrix is filled in with sourced facts.",
      },
      {
        href: "/business-prompts/vendor-contract-review-prompt",
        label: "vendor contract review prompt",
        description: "For flagging risky clauses in one vendor's actual contract, a separate job from comparing capability and pricing claims across several.",
      },
      {
        href: "/business-prompts/business-case-prompt",
        label: "business case prompt",
        description: "For turning a filled matrix and a chosen vendor into the funding case a budget owner has to sign off on.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description: "For writing up the finished comparison as a recommendation someone can approve without reading the full matrix.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.acquisition.gov/far/subpart-15.3",
        label: "Acquisition.gov: FAR Subpart 15.3, Source Selection",
        description: "Federal procurement rule requiring award decisions to rest on stated, checkable evaluation factors rather than assumed vendor reputation.",
      },
      {
        href: "https://csrc.nist.gov/pubs/sp/800/161/r1/final",
        label: "NIST SP 800-161: supply chain risk management practices",
        description: "Standard guidance on assessing a vendor's actual, documented posture rather than an assumed one, the same discipline this skill's source column applies.",
      },
      {
        href: "https://www.gsa.gov/policy-regulations/policy/acquisition-policy",
        label: "GSA: acquisition policy overview",
        description: "A federal buyer's framework for structuring vendor evaluation around ethical, evidence based procurement decisions.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on writing instructions specific and checkable enough for a model to follow consistently, the same discipline this skill applies to sourcing every cell.",
      },
    ],
  },

  tags: ["business", "vendor", "procurement", "comparison", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
