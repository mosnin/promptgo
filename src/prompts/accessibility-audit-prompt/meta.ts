import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "accessibility-audit-prompt",
  name: "Criterion Citation Audit",
  title: "Accessibility Audit Prompt",
  category: "design-prompts",
  taskType: "evaluate",
  summary:
    "Flags every accessibility issue against the exact WCAG success criterion number it maps to, and refuses to flag anything it cannot name.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["accessibility", "wcag", "audit", "design"],

  seo: {
    primaryKeyword: "accessibility audit prompt",
    keywords: [
      "accessibility audit prompt",
      "ai prompt for accessibility audit",
      "how to audit a website for accessibility",
      "wcag accessibility audit checklist",
      "how to write an accessibility audit prompt",
    ],
    seoTitle: "Accessibility Audit Prompt: Cite the WCAG Criterion",
    seoDescription:
      "An accessibility audit prompt that forces every flagged issue to cite the exact WCAG success criterion number and name, or move to a manual check list.",
  },

  prompt: {
    text: `You are conducting an accessibility audit from a written description of a page or component, not from rendered code, a live DOM or actual pixels, so treat anything the description does not state as unknown rather than something you can infer. Audit against WCAG level {{WCAG_LEVEL}}.

PAGE OR COMPONENT DESCRIPTION: {{PAGE_DESCRIPTION}}
WHO USES IT AND ANY REQUIREMENTS ALREADY IN PLACE: {{CONTEXT}}
WHAT I ALREADY SUSPECT IS WRONG: {{KNOWN_CONCERNS}}

Every issue you flag must name the exact WCAG success criterion number and title it maps to, for example 1.4.3 Contrast (Minimum) or 2.4.7 Focus Visible. If you cannot map an issue to one specific numbered criterion at or below the target level, you may not flag it as a failure. List it instead under WORTH A MANUAL CHECK, with the reason a written description cannot settle it and the one artefact, markup, a screenshot, or a keyboard trace, that would.

Group the findings by criterion number, ascending. For each, give the severity, the exact detail in the description that triggered the flag, and the specific fix. Never write a general sentence like this might not be accessible. End with a one line count of criteria flagged, criteria marked worth a manual check, and criteria the description gave no evidence about at all.`,
    variables: [
      {
        token: "PAGE_DESCRIPTION",
        label: "The page, screen or component to review, described in detail",
        example:
          "A settings page: a left sidebar of nav links, a form with labelled text inputs, a toggle switch built from a styled checkbox with no visible text label, and a Save changes button that turns grey and shows a spinner while submitting, with no text announcing the state change. Error text appears in red below a field after it fails validation, with no icon or symbol alongside the colour.",
      },
      {
        token: "WCAG_LEVEL",
        label: "Target conformance level",
        example: "AA",
      },
      {
        token: "KNOWN_CONCERNS",
        label: "Anything already suspected to be a problem, optional",
        example:
          "The toggle switch does not look like a real checkbox, and it is unclear whether the loading state on the Save button announces to a screen reader",
      },
      {
        token: "CONTEXT",
        label: "Who uses this page and any requirements already in place",
        example:
          "Internal HR tool used by employees company wide, including some on screen readers and some who navigate by keyboard only; company policy requires WCAG 2.1 AA",
      },
    ],
    expectedOutput:
      "A findings list grouped by ascending WCAG criterion number, each with a severity, the triggering detail from the description, and a specific fix, a separate worth a manual check list naming the artefact needed to resolve each undecidable item, and a closing count of flagged, unresolved and untested criteria.",
    followUps: [
      "Take the highest severity finding and write the exact markup or attribute change that would satisfy that specific criterion.",
      "For everything under worth a manual check, tell me which single artefact would resolve the most of them at once if only one could be gathered.",
      "Assume WCAG level AAA instead of the level given. Which additional criteria come into scope for this same description?",
    ],
    pitfalls: [
      "A model asked for a general accessibility opinion produces fluent, confident concerns that map to nothing checkable. Treat any flag without a real criterion number as noise, and check the number and name against the actual WCAG list rather than trusting it by default, since a plausible sounding number can still be wrong.",
      "A written description cannot show real focus order, computed accessible names, or how markup actually renders, so describing a component as accessible produces an audit of the description rather than the component. Say what is really on the page, including the div built to look like a checkbox.",
      "Pasting real HTML into the description, instead of describing the page in prose, moves criteria like Name, Role, Value and Info and Relationships out of the worth a manual check list and into real verdicts, because the model then has actual markup to reason about instead of an impression of one.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to review a page for accessibility, a model reliably produces confident, vague findings, phrases like this contrast might be an issue or this could confuse screen reader users, that sound like judgement but map to nothing checkable. Requiring a numbered WCAG success criterion beside every flag, and forbidding a flag that cannot be mapped to one, converts a vague concern into a claim someone can verify or reject.",
  },

  article: {
    intro: [
      "An accessibility audit prompt is only useful if it refuses to write findings a reader cannot check. Ask a model to review a page with no other constraint and it hands back fluent concern, this colour scheme might be hard to read, this button could confuse screen reader users, none of which map to anything a reader could confirm.",
      "This one runs on a single rule: every flagged issue must carry the exact WCAG success criterion number and name it maps to, 1.4.3 Contrast (Minimum) or 2.4.7 Focus Visible, not a paraphrase in the model's own words. An issue that cannot be pinned to one criterion does not get flagged as a failure, it moves to a list naming the artefact that would settle it. Used as an ai prompt for accessibility audit triage rather than a certified report, it turns vague concern into a checkable claim, run from a written description rather than rendered code or actual pixels.",
    ],

    sections: [
      {
        heading: "Why every flag needs a WCAG success criterion number",
        body: [
          "A criterion number is a commitment a vague sentence never makes. This might not be accessible cannot be checked or marked resolved, because it does not say what would have to be true for it to be false. 1.4.11 Non-text Contrast against published wording can be checked, and a reader can decide whether the model got it right.",
          "The forbidding half matters as much as the naming half. Without it, a model told to cite criteria will still write general concern and bolt the nearest sounding number onto it afterwards. Requiring the citation to be the reason the issue was flagged, not a label added on, is what keeps the numbers honest.",
        ],
      },
      {
        heading: "What this accessibility audit prompt can and cannot see",
        body: [
          "A written description is an account of a page, not the page. It supports a verdict on anything stated plainly, a missing label, a colour choice, a heading level that skips a step, and nothing it does not state. Anyone searching how to audit a website for accessibility without scanner software usually lands here, and the honest answer is a description based review catches a different slice of problems than a crawler does.",
          "That gap is the reason for the worth a manual check list. A criterion like 2.4.7 Focus Visible needs to see what happens on keyboard focus, which prose cannot show, so the prompt admits the gap by name instead of a plausible pass.",
        ],
        subsections: [
          {
            heading: "Criteria a description almost never settles alone",
            body: [
              "Focus order, accessible names, keyboard traps, and exact rendered contrast depend on how the page behaves, not on how it is described. Real markup narrows this list; prose alone leaves most of it open.",
            ],
          },
        ],
      },
      {
        heading: "The WCAG success criteria it checks most often",
        body: [
          "Treat the list below as a wcag accessibility audit checklist for what a plain description can support a verdict on, not a substitute for reading the criteria. A handful account for most real findings, because most interfaces repeat the same mistakes.",
        ],
        list: [
          "1.4.3 Contrast (Minimum): text against its background under the numeric threshold for its size",
          "1.4.11 Non-text Contrast: an icon or control boundary with no text equivalent too close to its background",
          "1.3.1 Info and Relationships: a relationship conveyed only through position or colour, nothing in the structure carrying it",
          "4.1.2 Name, Role, Value: a control built from a styled element with no accessible name stated anywhere",
          "2.5.8 Target Size (Minimum): an interactive element described as small enough to fall under the touch minimum",
          "4.1.3 Status Messages: a save confirmation or error that appears only visually, with nothing said to announce it",
        ],
      },
      {
        heading: "Choosing WCAG level A, AA, or AAA",
        body: [
          "Level A is the floor most sites already clear. AA is where most legal references and internal policies sit, and is the sensible default for a public site or paid product. AAA adds a stricter set and suits a page built for low vision users specifically.",
          "Setting the level explicitly, rather than leaving it unstated, decides which criteria are even in scope. A criterion that only exists at AAA has no business in a report scoped to AA.",
        ],
      },
      {
        heading: "Where a manual test still beats a description",
        body: [
          "This is a triage prompt for judgement calls a description can support, not a replacement for a real screen reader or a crawler. A scanner reliably finds a missing alt attribute across a site in seconds and misses whether a label is meaningful, which is closer to what this prompt is for.",
          "Contrast shows the boundary clearest. This prompt can flag light grey on white as worth checking against 1.4.3, but cannot compute the exact ratio the way a calculator built on the published formula can. A dedicated colour contrast checker settles the number this audit can only estimate.",
        ],
      },
      {
        heading: "Turning cited criteria into fixes engineers will actually make",
        body: [
          "A finding with a criterion number, the triggering detail, and a fix reads as normal engineering work, not a separate accessibility exercise nobody owns. Make this more accessible gets deprioritised for months; add an aria-label to satisfy 4.1.2 gets picked up next sprint.",
          "When the same criterion keeps recurring across unrelated pages, most often contrast or target size, the fix worth making sits at the token level rather than one component at a time, a design system exercise rather than an audit.",
        ],
      },
    ],

    howTo: {
      name: "How to write an accessibility audit prompt description and run it",
      steps: [
        {
          name: "Describe the page in real detail",
          text: "Name the actual elements, states and colours rather than summarising them as accessible or not. A vague description produces a vague audit.",
        },
        {
          name: "Set the WCAG level explicitly",
          text: "State A, AA, or AAA rather than leaving it implied, since this decides which criteria are eligible to be flagged.",
        },
        {
          name: "Name the context and anything already suspected",
          text: "Who uses the page and under what constraints changes which failures matter most, and often points straight at the criterion that covers it.",
        },
        {
          name: "Check every citation before acting on it",
          text: "Look up any WCAG number the report gives against the published criteria. A wrong or invented number is the one failure this prompt cannot catch itself.",
        },
        {
          name: "Resolve the manual check list before calling the audit done",
          text: "Each line names one artefact. Gather it, rerun with that detail added, and the line converts into a real verdict.",
        },
      ],
    },

    faq: [
      {
        question: "Does this accessibility audit prompt scan my actual code or the live page?",
        answer:
          "No. It reads a written description typed into the prompt, unless real markup is pasted into the description field. It cannot see rendered pixels or computed styles, which is why it names an artefact instead of guessing wherever the description leaves a gap.",
      },
      {
        question: "Which version of WCAG does it check against?",
        answer:
          "Whichever level is set in the WCAG_LEVEL field, checked against the current success criteria as published. WCAG 2.2 added criteria not present in 2.1, including Focus Not Obscured and a newer Target Size minimum, so the version matters if a policy references 2.1 specifically.",
      },
      {
        question: "What happens to an issue it cannot map to a criterion?",
        answer:
          "It moves to a worth a manual check list rather than being dropped or flagged as a guess. Each line names the artefact, markup, a screenshot, or a keyboard trace, that would let the criterion be settled on a rerun.",
      },
      {
        question: "Can I paste real HTML instead of writing a description in prose?",
        answer:
          "Yes, and it improves accuracy on criteria depending on structure, such as Name, Role, Value and Info and Relationships. A prose description leaves those as impressions; real markup gives the model something concrete to check against.",
      },
      {
        question: "Does a clean report mean the page is fully accessible?",
        answer:
          "No. A clean report means nothing describable in text failed against the criteria in scope, a narrower claim than fully accessible. Criteria depending on rendered behaviour, focus order and keyboard traps among them, still need a real test.",
      },
      {
        question: "How is this different from the colour contrast checker tool?",
        answer:
          "The colour contrast checker computes one exact numeric ratio for two hex values against the WCAG 1.4.3 threshold, with a single correct answer. This prompt reviews a whole page across many criteria from a written description, judgement based and less precise on any one number.",
      },
    ],

    internalLinks: [
      {
        href: "/tools/colour-contrast-checker",
        label: "colour contrast checker",
        description:
          "Computes the exact WCAG 1.4.3 contrast ratio for one pairing of colours, the single numeric criterion this broader audit can only estimate from a written description.",
      },
      {
        href: "/design-prompts/accessibility-review-prompt",
        label: "accessibility review prompt",
        description:
          "Goes deeper on one component at a time with a three verdict system and a written screen reader announcement, once this audit has flagged where to look.",
      },
      {
        href: "/design-prompts/design-system-prompt",
        label: "design system prompt",
        description:
          "Turns a criterion that keeps recurring across unrelated pages, most often contrast or target size, into a fixed token instead of a fix repeated component by component.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description:
          "Where a cited criterion and its fix belong once the audit is done, so the change lands as a normal review comment rather than a separate accessibility ticket.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.w3.org/TR/WCAG22/",
        label: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2",
        description:
          "The published specification the criterion numbers and names cited in this prompt and its examples are taken from directly.",
      },
      {
        href: "https://www.section508.gov/test/testing-overview/",
        label: "Section508.gov: testing overview",
        description:
          "Government guidance on what automated tools reliably catch versus what requires human judgement, the same split this prompt's manual check list is built around.",
      },
      {
        href: "https://webaim.org/projects/million/",
        label: "WebAIM Million: annual accessibility report",
        description:
          "Measured data on which failures are most common across the web, contrast, missing labels and empty links chief among them, supporting the emphasis on those criteria.",
      },
      {
        href: "https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: prompt engineering overview",
        description:
          "Documents the pattern of forcing a model to commit to a specific, checkable claim rather than free text, the same mechanism behind forbidding an unmapped flag.",
      },
    ],
  },
};

export default meta;
