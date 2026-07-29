import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "technical-writing-prompt",
  name: "Doc Typist",
  title: "Technical Writing Prompt",
  category: "writing-prompts",
  taskType: "generate",
  summary:
    "Opens with a knowledge contract, tags every sentence as concept, procedure, reference or warning, and refuses to invent a path, flag or error string that was not in your source.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["documentation", "instructions", "technical", "drafting"],

  seo: {
    primaryKeyword: "technical writing prompt",
    keywords: [
      "technical writing prompt",
      "writing instructions a reader can follow first time",
      "ai prompt for technical documentation drafts",
      "separating concept from procedure in documentation",
      "documenting prerequisites a reader will not have",
      "how to write for an audience you cannot see",
    ],
    seoTitle: "Technical Writing Prompt: Tag Every Sentence By Type",
    seoDescription:
      "A technical writing prompt that states a knowledge contract, labels concept, procedure, reference and warning sentences, and never invents a flag or an error string.",
  },

  prompt: {
    text: `You are a technical writer producing a first draft that the engineer who owns this system will review line by line.

WHAT THE DOCUMENT COVERS, IN ONE SENTENCE: {{SUBJECT}}
SOURCE MATERIAL, INCLUDING ANY EXACT COMMANDS, FIELD NAMES AND ERROR STRINGS: {{SOURCE}}
WHAT THE READER ALREADY KNOWS: {{KNOWN}}
WHAT THE READER MUST BE ABLE TO DO WHEN THEY FINISH: {{OUTCOME}}
WHERE THIS WILL BE PUBLISHED, AND ANY HOUSE RULES: {{HOUSE}}

Open with a knowledge contract of exactly two lines: one naming what the document assumes, one naming what the reader will be able to do at the end.

Tag every sentence in the draft with one of four types and leave the tags visible: CONCEPT for how something works, PROCEDURE for an action the reader performs, REFERENCE for a value or a name they will look up, WARNING for a consequence they cannot undo.

Rules. One type per paragraph, never mixed. Each PROCEDURE sentence is one action, written in the imperative, ending in something the reader can observe on their own screen. Do not use configure, set up, handle, manage, support or ensure as the main verb of a procedure. A WARNING goes immediately before the action it applies to, never after. Any path, flag, field name, version or error string that is not in my source material must appear as <PLACEHOLDER> rather than as a plausible guess.

Close with two lists: PREREQUISITES the reader needs that the knowledge contract did not claim, and OPEN QUESTIONS the owner has to answer before this can be published.`,
    variables: [
      {
        token: "SUBJECT",
        label: "What the document covers",
        example: "How to rotate the API signing key for the payments service without downtime",
      },
      {
        token: "SOURCE",
        label: "Source material with exact strings",
        example:
          "Keys live in the vault path secret/payments/signing. Rotation script is bin/rotate-key.sh, takes --dry-run. The service reloads keys every 60 seconds. Old key stays valid for 24 hours. Error seen if you skip the dry run: signature verification failed for kid",
      },
      {
        token: "KNOWN",
        label: "What the reader already knows",
        example:
          "Backend engineers on the payments team. They use the vault CLI daily and have deploy access. They have never rotated this particular key.",
      },
      {
        token: "OUTCOME",
        label: "What they must be able to do at the end",
        example: "Rotate the key in production alone, at two in the morning, without paging anyone",
      },
      {
        token: "HOUSE",
        label: "Where it publishes and any house rules",
        example:
          "Internal docs site, markdown, second person, no screenshots, every command block must be copy pasteable",
      },
    ],
    expectedOutput:
      "A two line knowledge contract, a tagged draft where procedures are single imperative actions with observable results, angle bracket placeholders wherever a value was missing, and closing lists of unstated prerequisites and open questions.",
    followUps: [
      "Take the open questions and write them as a message I can send the owner, ordered by how much of the draft each one blocks.",
      "Strip the tags and show me the clean draft, but keep the placeholders visible so I can see what is still unknown.",
      "The reader now has no vault access and must ask someone. Rewrite the procedure section around that constraint.",
    ],
    pitfalls: [
      "Pasting a chat log as source material produces documentation full of decisions that were later reversed. Give it the current state, not the history of arriving at it.",
      "People delete the placeholders and write in what they assume the value is. That is precisely the sentence that will be wrong at two in the morning, and it now looks exactly like the verified ones.",
      "If the knowledge contract claims too much, the prerequisites list comes back short and the draft skips the step that actually stops people. Understate what the reader knows.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "The placeholder rule came out of a draft that invented a flag. GPT-5.2 wrote --force where my notes had nothing, and it read so much like the rest of the document that I nearly shipped it. Requiring angle brackets for anything absent from source made the gaps visible instead of fluent. Claude Opus 4.5 holds the one type per paragraph rule better, while both models still slip a concept clause into a procedure step when the step needs a reason.",
  },

  article: {
    intro: [
      "A technical writing prompt has an unusual failure mode: the output is often good prose and bad documentation. Fluency is the wrong target. A page can read beautifully and still leave someone stuck at step four because a prerequisite was never stated.",
      "The prompt below imposes two disciplines that human documentation teams use and general purpose drafting ignores. Every sentence is labelled with what kind of sentence it is, and nothing that was not in the source material is allowed to appear as fact.",
      "Both are unglamorous. Together they turn a draft that sounds authoritative into one you can actually review, because the parts that were guessed are marked as guesses.",
    ],

    sections: [
      {
        heading: "Four kinds of sentence, and the cost of mixing them",
        body: [
          "Documentation contains four things: explanation of how something works, actions the reader performs, values they look up, and consequences they cannot reverse. Separating concept from procedure in documentation is the oldest rule in the field, and it is violated constantly because the two feel related while you are writing.",
          "The cost lands on a specific reader: the one following the page at speed with something broken. They are scanning for the next imperative. A paragraph that starts with an action and then explains the underlying model for three sentences hides its own next step inside a lecture.",
          "Tagging is crude and it works. Once every sentence carries a label, a mixed paragraph is visible at a glance rather than something you notice on the fourth read.",
        ],
      },
      {
        heading: "The knowledge contract at the top of the page",
        body: [
          "Two lines: what the document assumes you know, and what you will be able to do at the end. Writing them first changes the draft underneath, because most documentation problems are audience problems that were never made explicit.",
          "This is the practical answer to how to write for an audience you cannot see. You cannot see them, but you can commit to a claim about them and then be held to it. A reader who fails the first line knows immediately that they are in the wrong document, which is worth more than a gentle introduction that wastes ten minutes of their time.",
          "Documenting prerequisites a reader will not have is the other half. The closing list catches everything the draft quietly required and the contract did not claim: an access level, a tool installed, a concept from a different page. Those unlisted requirements are where readers stop.",
        ],
      },
      {
        heading: "Why the technical writing prompt bans vague verbs",
        body: [
          "Configure, set up, handle, manage, support and ensure are banned as the main verb of a procedure. Each one names an outcome and hides the action. Configure the service tells the reader that something must be true afterwards and nothing about what to type.",
          "The replacement rule is stricter than it sounds. One action, in the imperative, ending in something observable. Run the script with the dry run flag and confirm the output lists two key identifiers. That sentence can be checked by the person following it, which means it can be checked by the person reviewing it.",
          "Writing instructions a reader can follow first time is almost entirely this. Every step ends in a state the reader can see, so a wrong turn is caught at the step where it happened rather than three steps later when the error message no longer names the cause.",
        ],
      },
      {
        heading: "Warnings that arrive after the damage",
        body: [
          "The most common structural fault in drafted documentation is a warning placed after the action it concerns. It reads naturally, because in prose you describe the thing and then remark on it. In a procedure the reader has already run the command by the time they get to the remark.",
          "The technical writing prompt puts every warning immediately before its action. There is no elegant way to do this and the page looks slightly cluttered, which is the correct trade for anything irreversible.",
        ],
      },
    ],

    table: {
      caption: "The four sentence types and what each one owes the reader",
      headers: ["Tag", "Contains", "Test it must pass"],
      rows: [
        ["CONCEPT", "How the system behaves", "The reader could restate it in their own words"],
        ["PROCEDURE", "One action they perform", "Imperative verb, observable result"],
        ["REFERENCE", "A value, name or limit", "Present verbatim in the source material"],
        ["WARNING", "An irreversible consequence", "Sits immediately before the action"],
      ],
    },

    howTo: {
      name: "How to use the technical writing prompt",
      steps: [
        {
          name: "Collect exact strings before you start",
          text: "Real paths, real flags, the actual error text. Everything you cannot supply comes back as a placeholder, so the quality of the draft is decided at this point.",
        },
        {
          name: "Write the outcome as a scenario, not a topic",
          text: "Not learn about key rotation. Rotate the key alone at two in the morning. The scenario decides which prerequisites turn out to matter.",
        },
        {
          name: "Review by tag, not by paragraph",
          text: "Read every PROCEDURE line in sequence and check the sequence works on its own. Then read the WARNING lines and confirm each sits before its action.",
        },
        {
          name: "Send the open questions before editing prose",
          text: "The answers usually change the structure. Polishing a draft that still contains four placeholders is work you will do twice.",
        },
        {
          name: "Test on someone who fails the contract",
          text: "Hand it to a colleague who lacks one assumed thing. Where they stop is a missing prerequisite, and it will not be the one you expected.",
        },
      ],
    },

    faq: [
      {
        question: "Should the tags stay in the published document?",
        answer:
          "No. They are a review artefact. Strip them once the structure is settled, though some teams keep them in the source file as comments so the next person editing the page can see which paragraph was meant to be procedure and does not accidentally mix a concept into it.",
      },
      {
        question: "Does an ai prompt for technical documentation drafts remove the need for a reviewer?",
        answer:
          "It does the opposite, and usefully so. The placeholders and the open questions list are addressed to the person who owns the system. What changes is that the review is now about facts and gaps rather than about wording, which takes an owner twenty minutes instead of an afternoon.",
      },
      {
        question: "What if the source material contradicts itself?",
        answer:
          "Both models tend to pick one version silently, so read the open questions carefully. If you know two sources disagree, say so in the input and ask for both to be surfaced as a question rather than resolved, since the resolution is a decision about the system rather than about the document.",
      },
      {
        question: "Can it write a conceptual overview rather than a procedure?",
        answer:
          "Yes, and the tagging still helps because overview pages drift into half instructions. A page that is entirely CONCEPT tagged is a legitimate page. One that is ninety percent concept with three stray procedures is a page that needs those three moved somewhere a reader in a hurry will find them.",
      },
      {
        question: "How long should a document be before it gets split?",
        answer:
          "Split when the knowledge contract needs an and. Two audiences on one page means half the readers skim past the part written for the other half, and the split is nearly always cleaner along the line of what the reader already knows.",
      },
      {
        question: "Why forbid ensure as a verb?",
        answer:
          "Because ensure describes a state you are responsible for reaching without saying how to reach it. It is the verb writers reach for when they do not know the mechanism, which makes it a useful signal in a draft: every ensure marks a place where somebody has to go and find out.",
      },
      {
        question: "Does this work for release notes and error messages?",
        answer:
          "Partly. Release notes are mostly REFERENCE and CONCEPT, so the tagging is thin but the ban on invented values still matters. Error message text is a different craft, since it has to name the cause and the next action inside a single line the user did not choose to read.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "Handles the terms of art that documentation cannot avoid, keeping the word and adding a gloss rather than translating it away.",
      },
      {
        href: "/writing-prompts/paragraph-restructure-prompt",
        label: "paragraph restructure prompt",
        description:
          "For the section where a prerequisite ended up after the step that needed it and the wording is not the problem.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description:
          "The final pass over a page where a wrong flag name is a bug rather than a typo.",
      },
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "Turns the scattered notes you took while doing the task into the source material this prompt needs.",
      },
    ],

    externalLinks: [
      {
        href: "https://developers.google.com/style/procedures",
        label: "Google developer documentation style guide: Procedures",
        description:
          "The house standard behind one action per step and imperative verbs, from a team documenting hundreds of APIs.",
      },
      {
        href: "https://learn.microsoft.com/en-us/style-guide/procedures-instructions/",
        label: "Microsoft Writing Style Guide: Instructions and procedures",
        description:
          "Cited for the placement rule that a warning belongs before the action, which its guidance states explicitly.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html",
        label: "W3C: Understanding reading level",
        description:
          "The accessibility standard for comprehension, which is the formal grounding for stating audience assumptions rather than guessing them.",
      },
    ],
  },
};

export default meta;
