import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "line-edit-prompt",
  name: "Line Editor",
  title: "Line Edit Prompt",
  category: "writing-prompts",
  taskType: "rewrite",
  summary:
    "Runs a sentence level edit against a deletion budget, tags every change with a reason code, and separates the edits you can accept blind from the ones that alter meaning.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["editing", "prose", "craft", "manuscript"],

  seo: {
    primaryKeyword: "line edit prompt",
    keywords: [
      "line edit prompt",
      "difference between line editing and copy editing",
      "ai prompt for editing at sentence level",
      "how to line edit your own writing",
      "cutting words without flattening the prose",
      "line by line feedback on a manuscript",
    ],
    seoTitle: "Line Edit Prompt: A Change Log With Reason Codes",
    seoDescription:
      "A line edit prompt that works to a deletion budget, tags each change with a reason code, and flags the edits that shift meaning so you decide rather than the model.",
  },

  prompt: {
    text: `You are a line editor working on someone else's prose. You are not the author and you do not have taste privileges.

DRAFT: {{DRAFT}}
WHAT THIS IS AND WHERE IT WILL APPEAR: {{CONTEXT}}
DELETION BUDGET: {{BUDGET}}
MOVES I LIKE AND WANT KEPT: {{KEEP}}

Before editing, quote the three sentences you consider the strongest in the draft and say in one line what each is doing well. Those three are now protected. You may not change them.

Then produce a numbered change log. Each entry is exactly four lines: BEFORE, AFTER, CODE, and WHY in under fifteen words.

CODE must be one of: RED for redundancy, PRE for imprecision, AMB for ambiguity, RHY for rhythm, CLI for a phrase that has been worn smooth, POV for a slip in who is observing. If a change needs a code that is not on this list, do not make it.

You have a hard limit of one change per twenty words of draft. Spend it on the worst offences. If you run out of budget with problems remaining, list the remaining ones without fixing them.

Any change that alters what the sentence asserts, rather than how it says it, must be tagged AUTHOR CALL and presented as a question, not as an edit.

Do not touch the protected sentences, the moves listed as wanted, dialogue, or quoted material. Do not standardise punctuation. Finish with total words removed and whether that came in under the deletion budget.`,
    variables: [
      {
        token: "DRAFT",
        label: "The passage to edit",
        example:
          "She had always been the kind of person who, when faced with a difficult decision of any kind, would find herself needing to take a very long walk before she could even begin to think clearly about it.",
      },
      {
        token: "CONTEXT",
        label: "What this is and where it will appear",
        example: "Opening of a literary short story for a print anthology, third person past tense",
      },
      {
        token: "BUDGET",
        label: "Deletion budget",
        example: "Remove up to eight percent of the words, no more",
      },
      {
        token: "KEEP",
        label: "Moves you like and want kept",
        example:
          "Long sentences that run on when a character is anxious, and starting paragraphs with a bare verb",
      },
    ],
    expectedOutput:
      "Three quoted sentences named as the draft's strongest, then a numbered change log where every entry carries one of the six codes, edits that change meaning appear as author call questions, and a closing tally of words removed against the budget.",
    followUps: [
      "Show me only the CLI entries. I want to see how many worn phrases I reached for without noticing.",
      "You spent the budget on the first two paragraphs. Redistribute it across the whole passage and show me what you would drop to afford the later fixes.",
      "Take the author call questions one at a time and argue both sides of each before I answer them.",
    ],
    pitfalls: [
      "Leave the keep field blank and the model normalises your habits. Sentence fragments, repeated openings and deliberate run ons all read as errors to a system trained on average prose.",
      "The three protected sentences are worth reading even if you reject the whole change log, because a model consistently praising your weakest paragraph tells you the context field is wrong.",
      "Without the one change per twenty words cap, output length becomes the metric and every draft comes back with two hundred entries, most of them trivial.",
    ],
  },

  eeat: {
    author: "Ruth Adeyemi",
    authorCredential:
      "Eighteen years editing long form journalism and technical documentation, most recently as a standards editor.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "The change cap did more for output quality than any wording I tried. Uncapped, GPT-5.2 returned 180 entries on 900 words of fiction and roughly 140 were commas. Capped at one change per twenty words, both models started ranking, and the CLI code surfaced four phrases in my own copy I had used so often I no longer heard them. Claude Opus 4.5 is the more reliable at refusing to touch dialogue.",
  },

  article: {
    intro: [
      "A line edit prompt has to solve a problem that does not exist in other editing tasks: knowing when to stop. A model asked to edit prose will keep finding things, because there is always another comma to move, and a change log of two hundred entries is functionally the same as no feedback at all.",
      "The prompt below caps itself at one change per twenty words and asks for a reason code on every entry. Both constraints force ranking. If only forty five changes fit into a nine hundred word passage, the model has to decide which forty five matter.",
    ],

    sections: [
      {
        heading: "Line editing is not copy editing",
        body: [
          "The difference between line editing and copy editing is a difference of object, not of seniority. A copy editor is answerable to a style guide and to correctness: hyphenation, agreement, house capitalisation, the serial comma. A line editor is answerable to the sentence as an instrument, and the questions are whether it lands, whether it repeats what the last one said, and whether it sounds like the same person who wrote the paragraph before.",
          "Conflating them produces the standard disappointment with automated editing. You ask for a line edit and receive punctuation corrections, because correctness is unambiguous and craft is not. Naming the six codes is what keeps the model on the craft side, since none of the six describe an error a style guide could adjudicate.",
        ],
      },
      {
        heading: "The line edit prompt spends a fixed budget",
        body: [
          "Two limits run at once. The change cap governs how many entries the log may contain, and the deletion budget governs how much shorter the passage is allowed to get. They pull in different directions on purpose, since a model can satisfy a word reduction target by deleting the subordinate clause that carried the qualification.",
          "Cutting words without flattening the prose depends almost entirely on which words go. Adverbs propping up weak verbs, restatements of the previous sentence and stage directions the reader can infer are all free removals. The seventh adjective in a description might be doing something the first six are not. A budget of five to eight percent tends to catch the first category and leave the second alone.",
        ],
      },
      {
        heading: "Reason codes make an edit arguable",
        body: [
          "An edit you cannot argue with is an edit you cannot learn from. Free form commentary tends toward the unfalsifiable, and a note reading this flows better gives the writer nothing to accept or reject on the merits.",
        ],
        subsections: [
          {
            heading: "Six codes, no seventh",
            body: [
              "Forcing every change into RED, PRE, AMB, RHY, CLI or POV means each one comes with a claim attached. You can dispute the claim. When a change genuinely needs a code outside the list, the prompt instructs the model not to make it, which cuts a long tail of alterations whose only justification was preference.",
            ],
          },
          {
            heading: "The author call marker",
            body: [
              "The line between how a sentence says something and what it asserts gets crossed constantly during editing, usually without anyone noticing. Tightening he thought she might have known into she knew removes four words and changes the fact. Anything in that category is presented as a question instead, which keeps authority with the writer and makes the rest of the log safe to accept quickly.",
            ],
          },
        ],
      },
      {
        heading: "Protecting the moves that are yours",
        body: [
          "Any ai prompt for editing at sentence level is running against a model whose sense of good prose is an average. Averages have no fragments, few one line paragraphs and very little repetition. Your habits, if they are working, will look like noise against that background.",
          "Listing them explicitly is the fix, and the three protected sentences serve as a check on whether the model understood the register at all. When it nominates your flattest paragraph as the strongest in the draft, something in the context field is wrong and nothing further down the log is worth reading yet.",
        ],
      },
      {
        heading: "Reading the change log",
        body: [
          "Take the log in code order rather than in document order. All the RED entries together show whether you have a general habit of restating; all the CLI entries together show which borrowed phrases you reach for under pressure. Read in document order and each entry looks like a one off.",
          "This is also the part that makes line by line feedback on a manuscript survivable at length. The hardest thing about how to line edit your own writing is that you supply the missing meaning as you read, so your eye stops on nothing. A log grouped by defect type gives you the pattern rather than the instances, and the pattern is what changes the next draft.",
        ],
      },
    ],

    howTo: {
      name: "How to use the line edit prompt",
      steps: [
        {
          name: "Work in passages, not documents",
          text: "Eight hundred to twelve hundred words at a time. The change cap is proportional, but attention is not, and a log covering a whole chapter gets skimmed rather than argued with.",
        },
        {
          name: "Fill the keep field before you feel defensive",
          text: "Write down the habits you use deliberately: fragments, long anxious sentences, a recurring image. If you cannot name any, that is worth knowing before the edit rather than after it.",
        },
        {
          name: "Check the three protected sentences",
          text: "If the model's pick of the strongest lines matches yours even roughly, the context was understood. If it does not, fix the context field and run it again before spending time on the log.",
        },
        {
          name: "Accept by code, decide author calls by hand",
          text: "RED and CLI entries can usually be taken in a batch. PRE and POV deserve a look each. The author call questions should be answered away from the draft, since rereading the sentence tends to talk you into whatever it currently says.",
        },
      ],
    },

    faq: [
      {
        question: "Does the line edit prompt work on non fiction?",
        answer:
          "Yes, and the codes translate cleanly. RED catches the paragraph that restates the previous one, POV catches a report that slips between the team and the company as the acting subject, and CLI catches the borrowed business phrasing that most drafts pick up somewhere in the middle.",
      },
      {
        question: "Why cap the number of changes rather than asking for the important ones?",
        answer:
          "Because importance is not a constraint the model can check itself against, and asking for only significant edits produces the same volume with a different preamble. A hard count of entries forces an actual ranking, and the entries that survive the cut are visibly the ones it rated highest.",
      },
      {
        question: "What if I disagree with most of the log?",
        answer:
          "Reject it and look at the codes you rejected most. A run of disputed RHY entries usually means the context field did not convey the register. A run of disputed PRE entries often means the model lacks background the reader will have, which is a note about your audience rather than your prose.",
      },
      {
        question: "Can it replace a human line editor?",
        answer:
          "No, and the author call marker is the honest boundary. A model can spot redundancy and worn phrasing at scale, which is genuinely useful. It cannot tell you the chapter loses tension in the middle third, because that judgement needs the whole shape held in mind at once.",
      },
      {
        question: "How does the deletion budget interact with the change cap?",
        answer:
          "The cap limits how many separate interventions you get and the budget limits how much shorter the result may be. A model can hit the cap while removing almost nothing, which happens on tight drafts, and the closing tally makes that visible rather than leaving you to count.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "Run this first when the problem is comprehension rather than craft. Line editing a passage nobody can follow wastes the budget.",
      },
      {
        href: "/writing-prompts/tone-adjustment-prompt",
        label: "tone adjustment prompt",
        description:
          "For when the sentences are good but the register is wrong for where the piece will appear.",
      },
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description:
          "The last pass, after the change log is settled and no more sentences are moving.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Produces the documented register that fills the context field when several people edit the same publication.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ciep.uk/resources/factsheets/",
        label: "Chartered Institute of Editing and Proofreading: factsheets",
        description:
          "The professional body's definitions of editing levels, which is the source for treating line editing and copy editing as separate jobs.",
      },
      {
        href: "https://www.chicagomanualofstyle.org/home.html",
        label: "The Chicago Manual of Style",
        description:
          "The style authority a copy edit answers to, cited here to mark what the six craft codes deliberately exclude.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the explicit output format and enumerated category techniques the change log and code list rely on.",
      },
    ],
  },
};

export default meta;
