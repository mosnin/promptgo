import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "post-mortem-prompt",
  name: "Incident Reviewer",
  title: "Post Mortem Prompt",
  category: "business-prompts",
  taskType: "analyse",
  summary:
    "Separates the timeline from the analysis, finds the conditions that made the failure likely, and blocks every explanation that ends in a person.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["incidents", "retrospectives", "operations", "learning"],

  seo: {
    primaryKeyword: "post mortem prompt",
    keywords: [
      "post mortem prompt",
      "how to run a blameless incident review",
      "ai prompt for a project retrospective",
      "finding contributing conditions not root cause",
      "post mortem that produces real action items",
      "writing an incident timeline from messy notes",
    ],
    seoTitle: "Post Mortem Prompt: Conditions, Not Culprits",
    seoDescription:
      "A post mortem prompt that builds the timeline first, looks for the conditions that made failure likely, and rejects any cause that is really a person.",
  },

  prompt: {
    text: `You are facilitating a post mortem. You hold two positions firmly: that the timeline must be established before anyone analyses anything, and that any explanation ending in a person is an explanation that has stopped too early.

WHAT HAPPENED, FROM WHOEVER REMEMBERS: {{ACCOUNTS}}
WHAT THE IMPACT WAS: {{IMPACT}}
WHAT WAS SUPPOSED TO PREVENT THIS: {{SAFEGUARDS}}
WHO WAS INVOLVED AND WHAT THEY COULD SEE AT THE TIME: {{PARTICIPANTS}}

PHASE ONE: THE TIMELINE. Build it from the accounts, with times where given. Mark each entry [CONFIRMED] where accounts agree, [DISPUTED] where they conflict, or [GAP] where nobody has said what happened. Do not resolve disputes or fill gaps by reasoning. List them as open questions instead.

PHASE TWO: WHAT EACH PERSON KNEW. For each participant at each key moment, state what information was available to them at that time. Not what we know now. This is what separates a review from a judgement.

PHASE THREE: CONTRIBUTING CONDITIONS. Not a single root cause. List the conditions that made this failure likely, across at least three of: process, tooling, information availability, time pressure, unclear ownership, and prior decisions made for good reasons. For each, state whether removing it alone would have prevented the outcome.

BLAME CHECK: reread your conditions. Any condition that reduces to a person being careless, inexperienced or not paying attention must be rewritten as the system condition that allowed a normal person to produce that outcome. State what you rewrote.

PHASE FOUR: ACTION ITEMS. For each: what, a named owner, and a date. Any item without a named owner must be marked UNOWNED and kept visible. Reject action items that are really intentions, such as being more careful or improving communication. Every item must be something a person could complete and someone else could verify.

PHASE FIVE: WHAT WE STILL DO NOT KNOW, and what it would take to find out.`,
    variables: [
      {
        token: "ACCOUNTS",
        label: "What happened, from whoever remembers",
        example:
          "Deploy went out 14:10. Alerts fired 14:25 but went to a channel nobody watches. Customer emailed 15:40. Rolled back 16:05. Two people thought someone else was on call.",
      },
      {
        token: "IMPACT",
        label: "What the impact was",
        example: "Checkout down for roughly 100 minutes, 40 orders lost, three customers emailed to complain",
      },
      {
        token: "SAFEGUARDS",
        label: "What was supposed to prevent this",
        example: "Staging tests, an alerting rule, and an on call rota in a spreadsheet",
      },
      {
        token: "PARTICIPANTS",
        label: "Who was involved and what they could see",
        example:
          "Deploying engineer saw green tests and no alerts in their channel. Support saw the customer email first. On call rota had not been updated since two people left.",
      },
    ],
    expectedOutput:
      "A timeline marking confirmed, disputed and missing entries without resolving them, what each person could see at the time, several contributing conditions across different categories, a stated blame check with any rewrites named, verifiable action items with owners, and an honest list of unknowns.",
    followUps: [
      "Take the contributing conditions and tell me which single one, if fixed, would most reduce the chance of a different incident next quarter.",
      "Two action items are unowned. Draft the message asking for owners that does not let people volunteer someone else.",
      "Rewrite phase two assuming the deploying engineer had also seen the customer email. Does the timeline still make sense?",
    ],
    pitfalls: [
      "Resolving a disputed timeline entry by reasoning is the most common way these go wrong. A plausible reconstruction becomes accepted fact and the real gap is never investigated.",
      "The blame check catches phrasing but not intent. If your accounts input is written to point at someone, the conditions will inherit that framing however it is worded.",
      "Action items about being more careful will be rejected and people will want to reinstate them. That instinct is the reason most post mortems produce nothing.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Separating the timeline phase from the analysis phase was the change that made these usable. Run as one task, every model produced a narrative that quietly resolved the gaps in the accounts, and the resulting document read as authoritative while containing invented sequencing. The blame check was added after a draft concluded that an engineer should have checked more carefully, which is where a review stops rather than where it ends.",
  },

  article: {
    intro: [
      "A post mortem prompt that asks for a root cause will find one, and it will usually be a person. That answer feels complete, produces an action item about being more careful, and changes nothing, because the conditions that made the failure likely are still in place for the next person.",
      "This one builds the timeline before any analysis, records what each participant could actually see at the time, and then looks for contributing conditions across several categories rather than a single cause. Any explanation that reduces to someone being careless gets rewritten.",
    ],

    sections: [
      {
        heading: "Timeline first, analysis second",
        body: [
          "Mixing the two is what produces confident and wrong post mortems. Once someone has a theory, the ambiguous parts of the timeline get interpreted to fit it, and the reconstruction hardens into the official version within a day.",
          "Marking each entry as confirmed, disputed or missing keeps the uncertainty visible. Writing an incident timeline from messy notes always involves gaps, and the discipline that matters is listing them as open questions rather than bridging them with a plausible sentence.",
        ],
      },
      {
        heading: "What each person could see at the time",
        body: [
          "Hindsight makes every decision during an incident look worse than it was. The engineer who deployed had green tests and a silent alert channel; knowing now that the alert fired somewhere nobody watched makes their choice look negligent and it was not.",
          "Phase two reconstructs the information available at each moment, which is the single most effective anti blame mechanism available, more so than any instruction to be kind. It is also what makes the conditions in phase three obvious, because a decision that was reasonable given the information points directly at an information problem.",
        ],
      },
      {
        heading: "Conditions rather than a root cause",
        body: [
          "Complex failures do not have one cause. They have several conditions that were individually survivable and jointly sufficient, which is why the prompt requires conditions from at least three categories and asks whether removing each alone would have prevented the outcome.",
          "That last question is the useful one. It usually turns out that no single fix would have prevented the incident, which reframes the action items away from eliminating one culprit and towards reducing the number of conditions that have to align. Finding contributing conditions not root cause is the difference between a review that prevents a recurrence and one that prevents the exact same recurrence.",
        ],
        list: [
          "Process: a step that existed on paper and not in practice.",
          "Tooling: an alert that fired into a channel nobody reads.",
          "Information: something knowable that was not available to the person deciding.",
          "Ownership: two people each assuming the other held it.",
          "Time pressure: a deadline that made the shortcut rational.",
          "Prior decisions: a reasonable choice made months earlier that narrowed the options.",
        ],
      },
      {
        heading: "The blame check",
        body: [
          "After generating conditions, the prompt rereads its own output for any that reduce to a person being careless, inexperienced or inattentive, rewrites them as the system condition that allowed a normal person to produce that outcome, and reports what it changed.",
          "Reporting the rewrite matters as much as making it. Seeing that a condition originally read as an engineer not checking carefully, and now reads as a deploy path with no enforced check, teaches the distinction better than any abstract instruction on how to run a blameless incident review could.",
        ],
      },
      {
        heading: "Why the post mortem prompt rejects most action items",
        body: [
          "Being more careful, improving communication and increasing awareness are not actions. Nobody can complete them and nobody can verify them, so they close the meeting and expire silently. Every item here has to be something a person could finish and someone else could check.",
          "The unowned marker does the other half. An action assigned to the team is an action that will not happen, and the list of unowned items after an incident is usually the most honest artefact the review produces. A post mortem that produces real action items is mostly one that refused to accept the comfortable ones.",
        ],
      },
    ],

    howTo: {
      name: "How to use the post mortem prompt",
      steps: [
        {
          name: "Collect accounts before opinions",
          text: "Ask each participant what they saw and when, separately, before anyone has heard a theory. Contradictions between accounts are useful data, not a problem to tidy up.",
        },
        {
          name: "Include what people could not see",
          text: "The participants field should record what was hidden from each person, since that is what phase two turns into information conditions.",
        },
        {
          name: "Read the blame check rewrites aloud",
          text: "In the meeting. Showing the before and after of one rewritten condition does more to establish the culture than stating the principle.",
        },
        {
          name: "Chase the unowned items within a day",
          text: "Unowned actions decay fastest. A short message naming each and asking for a volunteer works while the incident is still recent, and rarely afterwards.",
        },
      ],
    },

    faq: [
      {
        question: "Does a blameless review mean nobody is accountable?",
        answer:
          "No. It means the review is looking for conditions rather than culprits, because that is what prevents recurrence. Accountability for fixing the conditions is explicit in the action items, each of which carries a named owner and a date.",
      },
      {
        question: "Can I use the post mortem prompt for a project that failed rather than an outage?",
        answer:
          "Yes, and it works well as an ai prompt for a project retrospective. The timeline becomes milestones and decisions rather than minutes, and the information availability phase becomes what each stakeholder knew when they made their commitments.",
      },
      {
        question: "How soon after an incident should this run?",
        answer:
          "Within a couple of days, while accounts are still recoverable and before the informal explanation has hardened. Waiting a week means you are documenting the story people have told each other rather than what they observed.",
      },
      {
        question: "What if the accounts genuinely contradict each other?",
        answer:
          "They stay marked as disputed and become open questions. Contradiction is often the most informative part of a timeline, because it usually indicates two people had different information, which is itself a contributing condition worth listing.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "Uses the same unowned convention, and its notes are often the raw material an incident timeline is reconstructed from.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "Most process conditions found here become a missing written procedure, which this turns into something followable.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When a condition traces back to a prior decision made for good reasons, revisiting it needs a decision rather than an action item.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description:
          "The same conditions over culprits discipline applied to a lost deal instead of a failed system.",
      },
    ],

    externalLinks: [
      {
        href: "https://sre.google/sre-book/postmortem-culture/",
        label: "Google SRE Book: Postmortem culture",
        description:
          "The primary reference for blameless review practice, including why hindsight makes reasonable decisions look negligent.",
      },
      {
        href: "https://www.nist.gov/publications",
        label: "NIST: Incident handling guidance",
        description:
          "Standards level guidance on incident documentation, evidence handling and the separation of record from analysis.",
      },
      {
        href: "https://how.complexsystems.fail/",
        label: "Richard Cook: How complex systems fail",
        description:
          "The foundational argument that failures arise from multiple contributing conditions rather than a single root cause.",
      },
    ],
  },
};

export default meta;
