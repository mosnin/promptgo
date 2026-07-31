import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Sales Proposal Structuring Skill

Use this skill whenever you are asked to draft, review, or restructure a sales proposal, and
the goal is a proposal that follows the same complete section order every time a deal reaches
this stage, not whatever shape a given writer happens to reach for on a given day.

## Before you structure anything

Collect the actual discovery inputs before writing a single section: the customer's stated
problem, in language close to what they actually said; any pricing, discount, or budget figures
that were actually discussed; any timeline or delivery date that was actually committed to; and
the specific needs the customer named in discovery, one by one. Do not begin structuring the
document until you know which of these inputs exist as real supplied text and which do not.

## The fixed section order

Every proposal produced with this skill follows the same six sections, in this order,
regardless of deal size or industry:

1. Customer situation, restated in the customer's own words from discovery.
2. Success criteria the customer would recognise and agree to.
3. Proposed deliverables, each one mapped to a specific customer need.
4. What is explicitly excluded from scope.
5. Pricing and terms, exactly as supplied.
6. Timeline and the single next action.

Keeping the order fixed across every proposal a team produces is the entire point of a reusable
structuring skill: a reviewer, an approver, or a new hire can find the pricing section in the
same place on the tenth proposal as on the first, without relearning the document each time.

## The never invent numbers discipline

This is the rule the skill cannot bend on. Pricing, discounts, payment terms, delivery dates,
and any specific claim about the product, a metric, a capability, a guarantee, must be treated
as literal input the user supplies. Never estimate a plausible number, never round a figure to
something that sounds cleaner, and never carry a number over from a similar deal without being
told it applies here.

If a required section has no supplied input, for example pricing has not been finalised yet,
leave an explicit placeholder in its place: [PLACEHOLDER: PRICING NOT SUPPLIED, insert the
confirmed figure before sending]. A placeholder that is visibly a placeholder is a safe,
correctable gap. An invented number that reads as though it were real is a proposal that can be
sent, signed against, and later disputed.

## Mapping every deliverable to a stated need

Each item in the deliverables section must trace back to a specific need the customer stated
during discovery, not a generic capability of the product. Before including a deliverable,
check that a specific line from the discovery notes justifies it. If a deliverable cannot be
tied to something the customer actually said they needed, cut it rather than including it as a
generic feature.

This blocks the common failure of a proposal reading like a feature list lifted from marketing
material, disconnected from the specific conversation that produced the deal. A shorter
deliverables section that maps cleanly to stated needs reads as more credible than a longer one
padded with capabilities nobody asked about.

## Handling missing input across every section

Apply the same placeholder discipline to every section, not only pricing. A timeline with no
committed date gets [PLACEHOLDER: TIMELINE NOT SUPPLIED, confirm with the customer before
sending], not an estimated date that sounds reasonable. A success criteria section with no
stated metric gets a placeholder rather than an invented percentage. List every placeholder used
at the end of the document so a human reviewer can find and resolve each one before the proposal
goes out.

## What this skill does not do

It does not write the discovery conversation for you, and it does not decide what the customer
needs. It structures whatever real input it is given into the same complete, checkable order
every time, refuses to fill gaps with invented detail, and refuses to include a deliverable that
cannot be traced to something the customer actually said.
`;

const PROPOSAL_TEMPLATE_MD = `# Sales Proposal Template Reference

Use this alongside SKILL.md. This file shows the exact section structure and placeholder syntax
the main instructions produce, so a proposal built with this skill is checkable against a fixed
template rather than reconstructed from memory on every deal.

## Section 1: Customer situation

State the customer's problem in language close to what they actually said in discovery, not
translated into vendor terminology. Three sentences maximum. If no discovery notes exist for
this section, do not invent a plausible sounding problem statement; write
[PLACEHOLDER: DISCOVERY NOTES NOT SUPPLIED] instead.

## Section 2: Success criteria

State the outcome in terms both sides could later check. Use only metrics or targets the
customer actually named. If no metric was discussed, write
[PLACEHOLDER: SUCCESS METRIC NOT SUPPLIED, confirm what the customer would consider success].

## Section 3: Proposed deliverables

List each deliverable with the specific customer need it maps to, in this format:

Deliverable: [what is being delivered]
Maps to stated need: [the exact discovery line this responds to]

A deliverable with no mapped need does not belong in this section, no matter how standard a
feature it is for the product.

## Section 4: What is excluded

List at least two specific exclusions. This section is what prevents scope disputes after
signing, and it makes the included scope read as deliberate rather than accidental.

## Section 5: Pricing and terms

Insert pricing, discount, and payment terms exactly as supplied, with no rounding, estimating,
or carrying a figure over from a comparable deal. If any part of pricing has not been finalised,
write [PLACEHOLDER: PRICING NOT SUPPLIED, insert the confirmed figure before sending].

## Section 6: Timeline and next action

State the committed delivery date and the single next action, with what is needed from the
customer and by when. If no date has been committed, write
[PLACEHOLDER: TIMELINE NOT SUPPLIED, confirm before sending] rather than an estimate.

## Placeholder log

At the end of the document, list every placeholder used, so a reviewer can resolve each one
before the proposal is sent. A proposal with an empty placeholder log is either genuinely
complete or has not actually been checked against its own inputs.
`;

const meta: SkillMeta = {
  slug: "sales-proposal-structuring-skill",
  name: "Sales Proposal Structuring Skill",
  title: "Sales Proposal Structuring Skill",
  category: "sales-skills",
  summary:
    "A downloadable instruction pack that structures a sales proposal into the same six sections every time, treats pricing, terms and timelines as literal supplied input, and refuses to include a deliverable that cannot be traced to a stated customer need.",

  seo: {
    primaryKeyword: "sales proposal structuring skill",
    keywords: [
      "sales proposal structuring skill",
      "downloadable sales proposal template",
      "ai skill for proposal structure",
      "how to structure a sales proposal",
      "sales proposal skill download",
    ],
    seoTitle: "Sales Proposal Structuring Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable sales proposal structuring skill that fixes the section order, refuses to invent pricing, and maps every deliverable to a stated need.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/proposal-template.md", content: PROPOSAL_TEMPLATE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to complete a proposal section with no pricing, timeline or metric supplied reliably default to inventing a plausible sounding figure rather than leaving the gap visible, since a filled-in section reads as more finished than an obvious placeholder. This skill's instructions force every such gap into an explicit, labelled placeholder and require every deliverable to trace to a specific stated need rather than a generic feature.",
  },

  article: {
    intro: [
      "A sales proposal structuring skill only pays off if it produces the same structure on the twentieth proposal a team writes as on the first, whether the deal in question is small and simple or large and contested. Handed to a writer as a one-off prompt, a proposal's shape depends on what that particular writer remembers to include that day. Handed down as a downloaded standard, the section order, the pricing discipline and the rule against inventing a claim the customer never heard stay fixed across the whole team, deal after deal.",
      "It ships as two plain text files: a main instructions file and a template reference file that lays out the six section structure by name, with placeholder syntax for anything not yet supplied. Both are previewable in full before you download the .zip, and both are exactly what an assistant or a teammate receives once the archive is handed over. The discipline running through both is simple to state and easy for a model to skip under pressure: pricing, terms, timelines and any product claim are literal supplied input, never a plausible sounding estimate filled in to complete a section.",
    ],
    sections: [
      {
        heading: "Why a fixed section order matters more than good writing",
        body: [
          "A proposal that reads beautifully but places pricing in a different spot on every deal is a worse working tool for a sales team than a plainer one that is always in the same order. A reviewer checking a deal before it goes out, an approver scanning for the number that needs sign-off, or a new hire looking for the exclusions section all rely on the structure being predictable, not on any single proposal's prose being memorable.",
          "This is the case for a downloadable sales proposal template over a set of loose personal habits, and it is what an ai skill for proposal structure is actually for: six sections, same order, every time, so finding information in a proposal is learned once, not relearned per writer.",
        ],
      },
      {
        heading: "The never invent numbers discipline",
        body: [
          "Pricing, discounts, payment terms, delivery dates and any specific claim about the product are treated as literal input the user supplies, never as something the skill estimates to keep a section from looking empty. A model asked to fill a pricing section with no number supplied will, left unchecked, produce a plausible sounding figure close to what similar deals have charged, and that figure is exactly the kind of detail a customer will hold the vendor to later.",
          "The fix is a placeholder, not a guess. A pricing section with no supplied figure is marked as an explicit, labelled gap and left for a human to fill in before the document is sent, rather than silently completed with a number that nobody actually agreed to.",
        ],
      },
      {
        heading: "Mapping every deliverable to a stated need",
        body: [
          "Each deliverable in the proposal has to trace back to a specific line from the discovery conversation, not a generic capability lifted from the product's marketing material. Before a deliverable is included, the skill checks whether a stated customer need actually justifies it being there at all.",
          "This rules out the common failure of a deliverables section that reads like a feature list disconnected from anything the customer said they needed. A shorter list that maps cleanly to real discovery input reads as more credible than a longer one padded with capabilities nobody in the conversation ever asked about.",
        ],
      },
      {
        heading: "How this differs from a one-off sales proposal prompt",
        body: [
          "A sales proposal prompt is written to be run once, for a single deal, filling in that deal's specific details each time someone reaches for it. This skill is built for the opposite situation: a team that wants every proposal, across every rep and every deal, to follow the identical section order, the identical exclusion discipline and the identical rule against inventing a number.",
          "Where a single prompt run produces one document, this skill's two files become a standing reference a team keeps open, downloads once, and checks new proposals against, which matters most once a team is large enough that no two reps would otherwise structure a proposal the same way.",
        ],
      },
      {
        heading: "Handling a missing input without guessing",
        body: [
          "Not every deal reaches proposal stage with every input confirmed. A timeline might not be committed yet, or a success metric might not have come up in discovery at all. The skill's answer is the same in every case: mark the gap as an explicit placeholder rather than filling it with an estimate that merely sounds reasonable.",
          "Every placeholder used gets listed at the end of the document, so a reviewer can find and resolve each one before the proposal is sent. Anyone searching how to structure a sales proposal with several unknowns still open usually means this exact situation.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "The sales proposal structuring skill will not decide what the customer needs, and it will not conduct the discovery conversation. It structures real input into a fixed, checkable order, refuses to invent a number or claim, and refuses a deliverable that cannot be traced to something the customer actually said.",
          "A thin set of inputs produces a proposal with several visible placeholders, not a polished document built on guesses, which is the outcome this skill protects against.",
        ],
      },
    ],
    howTo: {
      name: "How to use the sales proposal structuring skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/proposal-template.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant or a teammate.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real discovery inputs",
          text: "Before using the skill on a deal, collect the customer's stated problem, any pricing or timeline figures actually discussed, and the specific needs named in discovery.",
        },
        {
          name: "Hand both files to your assistant with the deal's inputs",
          text: "Keep the folder structure intact so the main instructions file can point to the template reference, then supply the real inputs for the specific deal, leaving anything unconfirmed unmentioned rather than guessed.",
        },
      ],
    },
    faq: [
      {
        question: "How is this different from a sales proposal prompt?",
        answer:
          "A sales proposal prompt is run once per deal to generate a single document from that deal's details. This skill is a reusable standard a team downloads once and applies to every proposal it writes, fixing the same six section order, the same placeholder discipline and the same deliverable-to-need mapping rule across every rep and every deal, not just the one in front of you.",
      },
      {
        question: "What happens if pricing has not been finalised yet?",
        answer:
          "The skill leaves an explicit, labelled placeholder in the pricing section rather than estimating a figure that sounds plausible. That placeholder gets listed again at the end of the document, so whoever reviews the proposal before it is sent can see exactly which numbers still need to be confirmed.",
      },
      {
        question: "Does the skill ever estimate a number to avoid leaving a section empty?",
        answer:
          "No, and its instructions explicitly forbid it. Pricing, terms, timelines and any specific product claim are treated as literal input the user supplies. A blank section is filled with a labelled placeholder, never with a plausible sounding guess dressed up to look like a real figure.",
      },
      {
        question: "Can a deliverable be included without a matching customer need?",
        answer:
          "No. Every deliverable in the proposal has to trace back to a specific line from the discovery conversation. A generic product capability that nobody in discovery actually asked about gets cut rather than listed, even if it is a standard feature the vendor would normally highlight.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the sales proposal skill download both happen entirely in your browser. There is no server call behind either action, and nothing about the deal or customer information you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads; editing the section order or the placeholder wording happens in your own editor after you have the files.",
      },
    ],
    internalLinks: [
      {
        href: "/sales-prompts/sales-proposal-prompt",
        label: "sales proposal prompt",
        description: "For a single one-off proposal run for one deal, rather than a reusable downloadable structuring standard a whole team applies.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description: "Where the stated customer needs and problem language this skill requires as input actually come from.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description: "For the conversation that follows once a structured proposal's pricing section reaches the customer.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description: "For responding to a specific objection raised against a proposal this skill helped structure.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.rainsalestraining.com/blog/how-to-write-a-proposal",
        label: "RAIN Group: How to Write a Proposal",
        description: "An independent guide on tying proposal content to the specific conversations had with a buyer rather than a generic catalogue of offerings.",
      },
      {
        href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        label: "Claude Docs: Prompt Engineering Overview",
        description: "Background on grounding a model's output in supplied input rather than invented detail, the same discipline this skill applies to pricing and claims.",
      },
      {
        href: "https://digital.gov/guides/plain-language",
        label: "Digital.gov: Plain Language Guidelines",
        description: "A real, checkable standard for writing a document like a proposal so it survives being forwarded to a reader with no shared context.",
      },
      {
        href: "https://hbr.org/2015/12/control-the-negotiation-before-it-begins",
        label: "Harvard Business Review: Control the negotiation before it begins",
        description: "Covers anchoring and framing effects, part of why an invented pricing figure in a proposal is a costly, hard to walk back mistake.",
      },
    ],
  },

  tags: ["sales", "proposals", "pricing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
