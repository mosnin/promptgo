import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "vendor-contract-review-prompt",
  name: "Contract Flag Reviewer",
  title: "Vendor Contract Review Prompt",
  category: "business-prompts",
  taskType: "analyse",
  summary:
    "Flags the specific clauses in a vendor contract worth a second read, auto renewal, liability caps, exit terms and data ownership, and refuses to call anything safe to sign.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["contracts", "procurement", "legal", "risk"],

  seo: {
    primaryKeyword: "vendor contract review prompt",
    keywords: [
      "vendor contract review prompt",
      "how to review a vendor contract before signing",
      "ai prompt for flagging contract clauses",
      "vendor contract clause checklist",
      "how to spot auto renewal terms in a contract",
      "how to ask a lawyer about a vendor contract",
    ],
    seoTitle: "Vendor Contract Review Prompt: What To Flag Before Signing",
    seoDescription:
      "A vendor contract review prompt that flags auto renewal, liability caps, exit terms and data ownership, and writes the questions to bring to a lawyer.",
  },

  prompt: {
    text: `You are a contract triage assistant reading a vendor contract on behalf of someone who is not a lawyer and has thirty minutes before a decision. You do not give legal advice. You find the clauses that change the deal's risk and translate each one into a plain question.

CONTRACT TEXT OR THE CLAUSES YOU HAVE: {{CONTRACT_TEXT}}
WHAT WE ARE BUYING, THE TERM AND THE VALUE: {{DEAL_CONTEXT}}
WHAT MATTERS MOST TO US IN THIS DEAL: {{PRIORITIES}}
ANYTHING ALREADY MAKING US UNCOMFORTABLE: {{KNOWN_CONCERNS}}

Read for four clause families specifically: auto renewal and notice periods, liability caps and indemnity, exit and termination terms, and data ownership or portability on exit. For each one present in the text, quote the operative sentence, state in plain language what it means for us, and rate it standard, tighten before signing, or dealbreaker. Do not summarise clauses that are ordinary for this contract type, name them as ordinary instead of describing them. Do not rate anything safe or fine, only standard, tighten, or dealbreaker.

Then produce a numbered list of the specific questions to put to a lawyer, one per flagged clause, phrased so a lawyer can answer them without rereading the whole contract.

End with this exact statement, unedited: this is a drafting aid to prepare questions for legal review, not a substitute for a lawyer reading the contract.`,
    variables: [
      {
        token: "CONTRACT_TEXT",
        label: "Contract text or the clauses you have",
        example:
          "Auto renews annually unless cancelled 90 days before the end of the term. Liability for either party capped at fees paid in the preceding 12 months, except for breach of confidentiality. Either party may terminate for convenience with 60 days notice. On termination, customer data will be made available for export for 30 days, in vendor's standard format.",
      },
      {
        token: "DEAL_CONTEXT",
        label: "What you are buying, the term and the value",
        example: "Customer support platform, three year initial term, 42,000 a year, replacing an existing tool",
      },
      {
        token: "PRIORITIES",
        label: "What matters most to us in this deal",
        example: "Being able to leave within a year if it does not work out, and keeping our support ticket history in a usable format",
      },
      {
        token: "KNOWN_CONCERNS",
        label: "Anything already making you uncomfortable",
        example: "The sales rep mentioned the renewal is automatic and I did not see a notice period written down anywhere obvious",
      },
    ],
    expectedOutput:
      "A rating of standard, tighten before signing, or dealbreaker for each auto renewal, liability, exit and data ownership clause found, the quoted sentence and its plain meaning behind each rating, a numbered list of lawyer ready questions, and the unedited legal review disclaimer at the end.",
    followUps: [
      "The liability cap excludes breach of confidentiality. Write the question that finds out what else is excluded before I assume it is only that.",
      "Take the dealbreaker clauses only and draft the redline language I would propose instead, for the lawyer to start from.",
      "Here is the vendor's reply to the first round of questions. Tell me which answers actually resolved the flagged risk and which just restated the clause.",
    ],
    pitfalls: [
      "A contract with no auto renewal clause at all is not automatically safer, it may mean the term simply ends and the service stops, which is its own operational risk worth flagging.",
      "Liability caps that exclude specific categories, confidentiality breach is common, do the real work. Read the exclusions as carefully as the cap itself, since the exclusions are what actually survives a dispute.",
      "Pasting only the clauses you already suspect are a problem defeats the exercise. The clauses worth a second read are frequently the ones nobody thought to flag before reading them closely.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to review a contract in general terms, a model tends to produce a fluent summary that reads as reassurance regardless of what the clauses actually say, because summarising is the easier task and looks the same either way. Naming four specific clause families and forcing a rating other than safe or fine is what stops that. Requiring the disclaimer as a fixed final line, rather than leaving it to the model's judgment, is what keeps the output from being mistaken for legal sign off.",
  },

  article: {
    intro: [
      "A vendor contract review prompt that comes back with the contract looks fine has told you nothing, because fine is not a rating a careful reading produces, it is what a fluent summary defaults to when nobody has asked it to commit to a position. Most vendor contracts are mostly boilerplate. The few clauses that are not boilerplate are the ones that decide what happens when the relationship goes wrong, and those are exactly the clauses a quick read skims past.",
      "This one reads for four clause families specifically, auto renewal and notice periods, liability caps and indemnity, exit and termination terms, and data ownership on the way out, and rates each one standard, tighten before signing, or dealbreaker. Nothing is allowed to be called safe. It closes with the questions to hand to a lawyer, and a fixed disclaimer that it prepared those questions rather than answered them.",
    ],

    sections: [
      {
        heading: "Why this is a triage prompt, not a legal opinion",
        body: [
          "The output is a shorter, better organised version of the contract to bring into a conversation with a lawyer, not a replacement for having that conversation. It cannot know your jurisdiction's default rules, weigh a clause against your deal history with this vendor, or see what was agreed verbally and never written down.",
          "What it can do reliably is find the sentences that matter and say plainly what they mean, turning a lawyer's hour from reading forty pages cold into answering four specific questions. That is the entire value proposition, stated at the end of every run rather than left for the reader to assume.",
        ],
      },
      {
        heading: "The four clause families worth a second read",
        body: [
          "Most of a vendor contract is standard for its type, and only a handful of clauses actually move risk. This vendor contract clause checklist is scoped to four, deliberately, because a list of forty items gets skimmed and a list of four gets read.",
        ],
        list: [
          "Auto renewal and notice period, since a missed 90 day window can lock you into another full term.",
          "Liability cap and its exclusions, since the exclusions frequently matter more than the headline number.",
          "Exit and termination terms, including whether either side can leave for convenience and on what notice.",
          "Data ownership and portability, specifically what format your data leaves in and how long you have to get it.",
        ],
      },
      {
        heading: "Auto renewal is the clause that costs the most for being missed",
        body: [
          "Knowing how to spot auto renewal terms in a contract is mostly about reading for the notice window, since almost every vendor contract renews automatically and that alone is ordinary. What is not ordinary, and worth a tighten or dealbreaker rating, is a notice period long enough that a calendar reminder set on signing day is the only realistic way to catch it.",
          "The prompt quotes the operative sentence rather than paraphrasing it, because a 90 day window and a 60 day window read almost identically in a summary and are a full month apart in practice.",
        ],
      },
      {
        heading: "Liability caps are only as good as their exclusions",
        body: [
          "A cap set at fees paid in the preceding 12 months sounds like a fixed number until the exclusions are read. Breach of confidentiality carved out is common and often reasonable. A carve out for data breach, IP infringement or gross negligence changes what the cap actually protects against, and a contract with several such carve outs has a cap in name more than in effect.",
        ],
      },
      {
        heading: "Exit terms decide what a bad year two costs",
        body: [
          "A three year term with no termination for convenience is a different commitment than the sales conversation implied if it was framed as a trial. The prompt checks whether either party, not just the vendor, can end the agreement early, and on what notice, because a one sided termination right is a common and easy to miss asymmetry.",
          "A vendor evaluation prompt is where the exit cost itself gets estimated in effort and dollars, before a contract exists to check. This prompt is scoped narrower, to whether the signed language matches what that estimate assumed.",
        ],
      },
      {
        heading: "Data ownership is the clause people assume rather than read",
        body: [
          "Most buyers assume their data comes out cleanly if the relationship ends, but the specifics vary: a fixed export window, a proprietary format nobody else's tooling reads, or a fee attached to the export itself. Any of those turns a straightforward exit into a delay measured in weeks at the exact moment you are trying to move fast, and a dealbreaker rating here is rare but not unheard of.",
        ],
      },
      {
        heading: "What the vendor contract review prompt hands to the lawyer",
        body: [
          "The output does not tell the reader what to negotiate, it writes the question a lawyer can answer without rereading the contract cold. Knowing how to review a vendor contract before signing is mostly the skill of arriving at that conversation with the right four questions already written down instead of a general sense of unease.",
          "Knowing how to ask a lawyer about a vendor contract means asking something specific rather than general. Is this liability cap enforceable in our jurisdiction is answerable in the meeting. Is this contract okay is not, and invites a longer engagement than the deal usually warrants.",
        ],
      },
    ],

    howTo: {
      name: "How to use the vendor contract review prompt",
      steps: [
        {
          name: "Paste the actual clauses, not a summary you already wrote",
          text: "A summary carries your existing read of the contract into the analysis. The operative sentences let the prompt form its own view of what they mean.",
        },
        {
          name: "State what you are buying and the term length plainly",
          text: "A three year, 40,000 a year deal and a month to month pilot warrant different tolerance for the same clause, and the context changes several of the ratings.",
        },
        {
          name: "Name your actual priorities before running it",
          text: "If exit flexibility matters more than price to you, say so, since that is what turns a merely tight termination clause into a dealbreaker for this specific deal.",
        },
        {
          name: "Treat every flag as a question, not a conclusion",
          text: "The output is a list of things to ask, not a verdict on whether to sign. Bring it into the room with the lawyer rather than instead of them.",
        },
        {
          name: "Rerun it on the redlined version before final signature",
          text: "A clause changed in negotiation needs the same read as the original, since a narrowed exclusion or a shortened notice period can flip a rating.",
        },
      ],
    },

    faq: [
      {
        question: "Can this replace having a lawyer look at the contract?",
        answer:
          "No, and the output says so on every run. It prepares specific questions so the lawyer's time goes into judgment rather than into finding the clauses in the first place, which is a real time saving but a different thing from legal review.",
      },
      {
        question: "What if the contract has no clauses in one of the four families?",
        answer:
          "That is itself worth noting rather than skipping silently. A contract with no stated data export provision at all is not neutral, it usually means the default is whatever the vendor decides at the time, which is worth asking about directly.",
      },
      {
        question: "Why does it refuse to say a clause looks fine?",
        answer:
          "Fine is not a rating that survives contact with a real clause, it is the default a fluent summary produces when nothing has forced a decision. Standard, tighten, or dealbreaker each commit to something checkable, and standard still means the clause was read, just that it is ordinary for this contract type.",
      },
      {
        question: "Does it work on a contract in a language other than the one I typed the deal context in?",
        answer:
          "It can read contract text in most major languages, but translation quality on legal terms of art varies, and a translated clause is exactly the kind of thing to double check with a lawyer rather than treat as settled, which the disclaimer already covers.",
      },
      {
        question: "How is this different from an ai prompt for flagging contract clauses that just lists risky words?",
        answer:
          "A keyword scan flags the word indemnity wherever it appears, regardless of what the clause actually says. This prompt quotes the operative sentence, states what it means for the specific deal in the input, and rates it, which is closer to what a first pass by a person would produce.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/vendor-evaluation-prompt",
        label: "vendor evaluation prompt",
        description:
          "The comparison and scoring that happens before a contract is on the table, including the exit cost estimate this prompt checks the contract language against.",
      },
      {
        href: "/business-prompts/risk-register-prompt",
        label: "risk register prompt",
        description:
          "Where a tighten or dealbreaker flag that gets signed anyway belongs, with a named owner and a trigger for when it becomes a live issue.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For turning the flagged clauses and the lawyer's answers into a one page recommendation somebody can actually sign off on.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description:
          "For the commercial terms sitting next to the legal ones, useful when a liability cap or exit clause becomes something to trade against price.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/negative-option-rule",
        label: "FTC: guidance on negative option and automatic renewal terms",
        description:
          "Regulatory guidance on automatic renewal and notice period practices, the primary basis for treating a short notice window as worth flagging.",
      },
      {
        href: "https://www.americanbar.org/groups/business_law/resources/business-law-today/2021-january/limitation-liability-clauses/",
        label: "American Bar Association: limitation of liability clauses",
        description:
          "Practitioner guidance on how liability caps and their exclusions actually function in a dispute, underlying the exclusions matter more than the cap principle.",
      },
      {
        href: "https://www.nist.gov/publications/data-classification-concepts-and-considerations-improving-data-protection",
        label: "NIST: data classification and protection considerations",
        description:
          "Reference for why data portability and export format on exit are a security and continuity question, not only a convenience one.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: prompt engineering overview",
        description:
          "Documents the pattern of forcing a rating from a fixed set of options rather than free text, which is what stops the safe or fine default.",
      },
    ],
  },
};

export default meta;
