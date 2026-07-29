import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "paragraph-restructure-prompt",
  name: "Order Auditor",
  title: "Paragraph Restructure Prompt",
  category: "writing-prompts",
  taskType: "rewrite",
  summary:
    "Breaks a passage into one card per sentence, records what each card depends on, exposes every forward reference, and proposes a new order without touching the wording.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["editing", "structure", "prose", "drafting"],

  seo: {
    primaryKeyword: "paragraph restructure prompt",
    keywords: [
      "paragraph restructure prompt",
      "reordering sentences inside a paragraph",
      "ai prompt for fixing information order",
      "when a paragraph makes sense only on second reading",
      "topic sentence that arrives too late",
      "how to reorder a paragraph without rewriting it",
    ],
    seoTitle: "Paragraph Restructure Prompt: Move Cards, Not Words",
    seoDescription:
      "A paragraph restructure prompt that maps what every sentence depends on, exposes forward references, and proposes a new order while leaving your wording alone.",
  },

  prompt: {
    text: `You are a structural editor. You work on the order of information and on nothing else.

PASSAGE: {{PASSAGE}}
WHO IS READING IT AND WHAT THEY ALREADY KNOW: {{READER}}
THE ONE THING THE PASSAGE MUST LEAVE THEM WITH: {{PAYLOAD}}
ANYTHING WHOSE POSITION IS FIXED: {{FIXED}}

Step one. Split the passage into numbered cards, one card per sentence, quoting each sentence exactly. Against each card record DEPENDS ON, listing the card numbers a reader must already have understood for this one to land, and JOB, four words at most, naming what the sentence does for the reader.

Step two. Report every forward reference, meaning any card whose DEPENDS ON list names a number higher than its own. List these before you propose anything, because they are the defect.

Step three. Propose a new order. You may move cards, split a card that is doing two jobs, and add or delete connective words such as however, because, so and then. You may not rewrite a sentence, swap a noun, soften a claim or introduce material. Where a card cannot move without a rewrite, leave it where it is and say which rewrite would free it.

Step four. Give one alternative order that opens on a different card, and state in a single line what that opening costs.

Finish by naming any card you would cut and what the reader still knows without it.`,
    variables: [
      {
        token: "PASSAGE",
        label: "The passage to reorder",
        example:
          "The migration finished on Tuesday. Latency on the search endpoint has roughly halved since then. We had been planning it since March, when the old cluster started dropping connections under load. Nobody has reported a regression. The old cluster is still running because two internal tools point at it.",
      },
      {
        token: "READER",
        label: "Who is reading and what they already know",
        example:
          "Engineering managers outside the team. They know there was a database problem in the spring but not what was done about it.",
      },
      {
        token: "PAYLOAD",
        label: "The one thing they must leave with",
        example: "The migration is done and safe, but the old cluster cannot be switched off yet",
      },
      {
        token: "FIXED",
        label: "Anything whose position cannot change",
        example: "The last sentence has to stay last because the next paragraph answers it",
      },
    ],
    expectedOutput:
      "A numbered card list quoting every sentence with its dependencies and its four word job, an explicit list of forward references, a proposed order using only your original sentences, one alternative opening with its cost, and any cards worth cutting.",
    followUps: [
      "Two cards both claim the same job. Show me which one the reader could lose and what the paragraph would feel like without it.",
      "Reorder again for a reader who has never heard of the project, and tell me how many cards that added.",
      "Take the alternative order and write only the connective words that would need to change to make it run.",
    ],
    pitfalls: [
      "Leaving the reader field vague turns every dependency into a guess. The model assumes an expert audience by default, so half the forward references disappear and the paragraph keeps its real fault.",
      "Passages longer than about two hundred words produce a card list nobody reads. Restructure at the level where the defect actually lives, which is usually one or two paragraphs.",
      "If you accept the new order and then start rewriting the sentences in place, you lose the ability to tell whether the reorder helped. Read the moved version cold first.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Both models wanted to fix wording while they were in there, and the dependency table is what stopped them. Before I added it, GPT-5.2 handed back a smooth new paragraph and I could not tell whether the improvement came from the order or from the quiet rewriting. Claude Opus 4.5 produces the more honest forward reference list, but it under reports dependencies when the reader field is left thin, so fill that in properly.",
  },

  article: {
    intro: [
      "A paragraph restructure prompt is for the draft where every sentence is defensible and the whole thing still reads badly. Nothing is wrong at the level of the word. The reader simply meets a fact before the fact that would have made it mean something.",
      "Reordering sentences inside a paragraph is a smaller intervention than rewriting them, and it reaches a defect that rewriting cannot. A sentence polished in the wrong position is a well made sentence in the wrong position.",
      "The prompt below treats each sentence as a card with dependencies. Once you can see which cards need which other cards, the correct order stops being a matter of ear and becomes something close to arithmetic.",
    ],

    sections: [
      {
        heading: "Order is a defect in its own right",
        body: [
          "Editors tend to treat structure as an outline problem, solved before drafting and revisited only at the level of whole sections. Inside a paragraph, order gets handled by instinct, which works until the material is unfamiliar enough that your instinct is running on knowledge the reader does not have.",
          "The symptom has a shape. When a paragraph makes sense only on second reading, the order is wrong and the wording is probably fine. You understood it the second time because the first pass supplied the missing context, which is a service no real reader performs.",
        ],
      },
      {
        heading: "Forward references, absorbed silently",
        body: [
          "A forward reference is a sentence that assumes something the passage has not said yet. Readers do not stop and complain. They hold the sentence open, carry on, and close it later if the answer arrives, and the cost shows up as a general sense that the piece is heavy going.",
          "Making the model list them before it proposes anything separates diagnosis from treatment. You see how many there are and where they cluster, which is often one paragraph doing the work of two. A topic sentence that arrives too late is the most common single instance: the passage spends four sentences on evidence for a claim it has not yet made.",
        ],
      },
      {
        heading: "What the paragraph restructure prompt is forbidden to touch",
        body: [
          "The prompt may move cards, split a card that is carrying two jobs, and adjust connective words. It may not change a noun, soften a claim, add an example or improve a verb. That ban is the whole design, because a model given permission to rewrite will rewrite, and the resulting paragraph is better for reasons you cannot separate.",
          "That is also the answer to how to reorder a paragraph without rewriting it. Move the cards, fix the joins, and change nothing else. If the new order genuinely will not run without a rewrite, the prompt is required to say which rewrite would free the card rather than perform it quietly.",
        ],
        subsections: [
          {
            heading: "Connective words are joinery, not content",
            body: [
              "However, because, so and then are the small hinges that make a sequence feel intentional. Moving a card usually breaks one, and refusing to let the model repair them would make every proposed order sound worse than the original for reasons that have nothing to do with order.",
            ],
          },
          {
            heading: "Cards that will not move",
            body: [
              "Some sentences are welded in place by a pronoun, a demonstrative or a comparative that depends on adjacency. The prompt leaves them and names the dependency. Half the time the fix is to replace one pronoun with its noun, which you can do yourself in five seconds once you know which pronoun it is.",
            ],
          },
        ],
      },
      {
        heading: "The four word job forces a decision",
        body: [
          "Each card carries a job written in four words at most. Sets the timeline. Names the risk. Concedes the objection. The limit matters: given a sentence, a model will happily produce thirty words about its function, and thirty words can describe a sentence that is doing nothing.",
          "Two cards with the same job is the signal to look for. One of them is redundant, or the two are competing for the same slot and the paragraph feels like it starts twice. An ai prompt for fixing information order earns its keep here, because duplication of function is nearly invisible when you read for meaning and obvious when the functions are listed in a column.",
        ],
      },
      {
        heading: "Two orders, and what the second one costs",
        body: [
          "The prompt always returns an alternative opening, with a one line note on its price. Leading with the result gets the busy reader what they came for and strands the reasoning behind an answer they have already accepted. Leading with the problem earns the result and risks losing anyone skimming.",
          "Neither is correct in general. Having both in front of you converts a vague dissatisfaction into a choice you can make on grounds you can state, which is the difference between editing and fiddling.",
        ],
      },
    ],

    howTo: {
      name: "How to run the paragraph restructure prompt",
      steps: [
        {
          name: "Pick the paragraph you keep rereading",
          text: "Not the whole document. The one you have gone over four times without improving is almost always an order problem wearing a wording problem's clothes.",
        },
        {
          name: "Describe the reader by what they lack",
          text: "Not their job title. Write what they do not yet know, because that is what every dependency is measured against and the default assumption is an expert.",
        },
        {
          name: "Read the forward reference list before the proposal",
          text: "If there are none, the order is fine and your problem is elsewhere. Stop and run a different pass rather than accepting a reshuffle you did not need.",
        },
        {
          name: "Read the new order cold",
          text: "Out loud, without comparing it to the original. Comparison makes any change feel like an improvement because you are reading the difference rather than the paragraph.",
        },
      ],
    },

    faq: [
      {
        question: "Does the paragraph restructure prompt work on more than one paragraph?",
        answer:
          "Up to about two hundred words it works well. Beyond that the card list gets long enough that you skim it, which defeats the purpose. For anything longer, run it on the two or three paragraphs that feel worst rather than on the whole section at once.",
      },
      {
        question: "How is this different from asking for an outline?",
        answer:
          "An outline is written before the prose and describes what you intended. This runs on the sentences you actually produced, which frequently arrived in the order you thought of them rather than the order a reader needs. The gap between those two orders is exactly what the card list exposes.",
      },
      {
        question: "What if the proposed order sounds worse?",
        answer:
          "Check the connective words first, since a good order with broken joins reads badly for a reason that has nothing to do with sequence. If it still sounds wrong after that, your ear may be responding to rhythm rather than logic, and rhythm is a legitimate reason to keep the original.",
      },
      {
        question: "Can it tell me a paragraph should be deleted?",
        answer:
          "It names cards it would cut and says what the reader still knows without them, which is usually where you notice that three sentences are supporting a claim nobody disputed. Whole paragraph deletion is a judgement about the piece, not the paragraph, so it stays with you.",
      },
      {
        question: "Why quote the sentences instead of summarising them?",
        answer:
          "Because summarised cards let the model drift into rewriting without either of you noticing. Exact quotation means the proposed order is made only of text you already wrote, and you can verify that by reading it, which is the check the whole method rests on.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description:
          "Use this when the sentences themselves are the problem. Reordering unclear sentences produces a well organised passage nobody can follow.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "The next pass once the order is settled, working on the sentences that are now finally in the right place.",
      },
      {
        href: "/writing-prompts/technical-writing-prompt",
        label: "technical writing prompt",
        description:
          "For documentation, where order failures are usually a prerequisite stated after the step that needed it.",
      },
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "Where the raw material comes from. Notes arrive in the order you thought of things, which is the order this prompt exists to undo.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/inverted-pyramid/",
        label: "Nielsen Norman Group: The inverted pyramid",
        description:
          "The evidence behind treating the opening card as a decision with a cost, since online readers frequently abandon a passage before its conclusion.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/organize/",
        label: "plainlanguage.gov: Organize your content",
        description:
          "The US federal guidance on information order, cited here for the rule that context precedes the instruction it applies to.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the staged output technique the card list relies on, where analysis has to be emitted before any proposal is allowed.",
      },
    ],
  },
};

export default meta;
