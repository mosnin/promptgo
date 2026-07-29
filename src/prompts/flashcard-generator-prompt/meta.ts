import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "flashcard-generator-prompt",
  name: "Atomic Card Maker",
  title: "Flashcard Generator Prompt",
  category: "education-prompts",
  taskType: "generate",
  summary:
    "Turns notes into single fact cards, splits any card that bundles two ideas, rejects anything answerable by recognition, and sorts the deck onto a spacing ladder.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["revision", "retrieval", "spaced repetition", "memory"],

  seo: {
    primaryKeyword: "flashcard generator prompt",
    keywords: [
      "flashcard generator prompt",
      "one fact per flashcard",
      "making cards for spaced repetition",
      "ai prompt for cloze deletion cards",
      "flashcards that test recall not recognition",
      "turning notes into revision cards",
    ],
    seoTitle: "Flashcard Generator Prompt: One Fact, One Card, No Bundles",
    seoDescription:
      "A flashcard generator prompt that splits bundled cards, throws out anything a student could guess, writes clean cloze items and sorts the deck for spacing.",
  },

  prompt: {
    text: `You are building a retrieval deck from a student's own notes. A card that cannot be answered from memory in under ten seconds is not a card, it is a revision task in disguise.

MY NOTES OR THE SOURCE TEXT: {{NOTES}}
SUBJECT AND LEVEL: {{LEVEL}}
WHAT I ALREADY KNOW COLD: {{KNOWN}}
HOW MANY CARDS I WILL ACTUALLY REVIEW EACH DAY: {{DAILY}}

Card rules, applied to every single card.
- One retrievable fact per card. If the answer contains the word and joining two separate pieces of knowledge, split it into two cards and show me both.
- The prompt on the front must have exactly one correct answer. If two answers would both be right, the front is underspecified and needs rewriting.
- No card whose answer can be guessed from the wording of the front, and no card that lists options.
- Prefer a cloze deletion when the fact lives inside a sentence I need to be able to say. Delete one item per cloze, never two.
- Write a reverse card only where the relationship genuinely runs both ways. Term to definition reverses, cause to effect usually does not.
- Skip anything I said I already know cold.

Return.
1. THE DECK, numbered, as front and back pairs.
2. SPLITS, every card you broke apart, with the bundled version shown so I can see what was wrong with it.
3. REJECTED, material from my notes that should not become a card at all, each with the reason: needs understanding first, too long to recall, or not worth memorising.
4. SPACING LADDER, the deck divided into day one, day three, day seven and day twenty one based on how much interference each card faces from its neighbours.
5. THE HONEST NOTE: which parts of my notes were too vague to make cards from, so I know what to go back and learn properly.`,
    variables: [
      {
        token: "NOTES",
        label: "Your notes or the source text",
        example:
          "Paste of my Year 12 biology notes on enzyme action: active site, induced fit, denaturation above optimum temperature, competitive and non competitive inhibitors, effect of pH on tertiary structure",
      },
      {
        token: "LEVEL",
        label: "Subject and level",
        example: "A level biology, OCR specification, first year",
      },
      {
        token: "KNOWN",
        label: "What you already know cold",
        example: "The definition of an enzyme and the lock and key model. Do not make cards for those.",
      },
      {
        token: "DAILY",
        label: "Cards you will actually review each day",
        example: "About 25 in ten minutes on the bus, five days a week",
      },
    ],
    expectedOutput:
      "A numbered deck of single fact cards, a visible list of every bundled card it split and why, a rejected pile with reasons, the deck sorted across four spacing intervals, and a note naming the parts of your notes that were too vague to test.",
    followUps: [
      "Export the deck as a two column list I can paste straight into Anki, with cloze cards marked in Anki syntax.",
      "For every card in the rejected pile, tell me the one question I should ask my teacher instead.",
      "Take the ten cards you think I will fail first and write a second version of each with a different cue on the front.",
    ],
    pitfalls: [
      "Pasting a textbook chapter instead of your own notes produces a deck about the chapter. The cards are only useful if they test the version of the idea you actually hold.",
      "Setting the daily review number high produces a deck you abandon in week two. Twenty five a day sustained beats two hundred a day for four days, and the ladder is sized from that number.",
      "The rejected pile is the most valuable section and the easiest to skip. Anything rejected for needs understanding first is a topic you were about to memorise instead of learn.",
    ],
  },

  eeat: {
    author: "Grace Mbeki",
    authorCredential:
      "Fourteen years teaching secondary science, the last three as a head of department writing assessment policy.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "My first decks were full of cards asking students to state three factors affecting rate, which is three cards wearing one coat, and pupils reliably recalled two of the three and scored themselves correct. Making the split list visible was what changed behaviour, because seeing the bundled version next to the two clean cards teaches the rule faster than the rule does. Claude Opus 4.5 still writes the occasional cloze with two deletions.",
  },

  article: {
    intro: [
      "A flashcard generator prompt that produces two hundred cards in one pass has usually produced about sixty cards and a hundred and forty pieces of prose with a question mark on the front. The failure is not laziness, it is that turning notes into revision cards looks like formatting and is actually editing.",
      "The version here does the editing. Every card has to carry exactly one retrievable fact, anything bundling two ideas gets split in front of you, and material that should not be memorised at all goes into a rejected pile with the reason attached.",
      "It is written for a student to use on their own notes, which is a deliberate limit. A deck built from a textbook you have not read tests the textbook.",
    ],

    sections: [
      {
        heading: "One fact per flashcard, and how to tell when you broke the rule",
        body: [
          "One fact per flashcard is the oldest rule in the field and the most frequently ignored, because bundling feels efficient. A card reading name the three factors affecting enzyme activity looks like it saves two cards. In review it produces partial recall that gets marked as success, and the third factor stays missing until the exam finds it.",
          "The test is mechanical. If the back of the card contains the word and joining two separate things you could be asked about independently, it is two cards. The prompt applies that test and then shows you the bundled original beside the split pair, which is the fastest way to internalise the rule.",
        ],
      },
      {
        heading: "The material that should not become cards",
        body: [
          "Three kinds of content fail as cards. Anything you do not yet understand, because memorising a sentence about oxidation without a model of oxidation gives you a sentence. Anything too long to say in ten seconds, because you will start skipping it and skipping spreads. And anything not worth the shelf space, which in most subjects is more of the notes than students expect.",
          "The rejected pile names which of the three applies. The needs understanding first entries are the useful ones, because a card built on a gap in understanding will be failed repeatedly and the student will read that as a memory problem rather than a comprehension problem.",
        ],
      },
      {
        heading: "Recognition feels exactly like knowing",
        body: [
          "Flashcards that test recall not recognition are the only kind that transfer to a blank exam paper. The trap is that recognition is pleasant. Seeing an answer and thinking yes, that is right, produces a strong feeling of fluency that has almost no relationship to whether you could have produced it unprompted.",
          "So the prompt refuses any card that lists options, any card where the phrasing of the front leaks the answer, and any front that would accept two different correct responses. That last one matters more than it sounds: a card reading what happens to an enzyme at high temperature has four defensible answers, and a student marking themselves correct on the easiest one is training the wrong retrieval.",
        ],
        subsections: [
          {
            heading: "The ten second rule",
            body: [
              "If the answer takes longer than ten seconds to produce, the card is a short answer question and belongs in a different activity. Long cards also break spacing, because a review session sized in cards silently becomes a session sized in half hours.",
            ],
          },
        ],
      },
      {
        heading: "Cloze, reverse cards and the shape of the question",
        body: [
          "An ai prompt for cloze deletion cards has to be told to delete one item at a time. Two blanks in a sentence create a card with two answers, which is the bundling problem again in a different costume, and models produce them constantly because the sentence looks tidier that way.",
          "Reverse cards need the same discipline. A term and its definition genuinely run both ways, so both directions are worth reviewing. A cause and its effect usually do not, because many causes share an effect, and the reverse card then has several right answers and no way to mark it.",
        ],
        list: [
          "Cloze: use when the fact lives inside a sentence you need to be able to produce, one deletion only.",
          "Front and back: use for terms, values, dates, formulas and anything with a single unambiguous answer.",
          "Reverse: only where both directions have exactly one answer, which is rarer than it looks.",
        ],
      },
      {
        heading: "What the flashcard generator prompt does about spacing",
        body: [
          "Making cards for spaced repetition and scheduling those cards are separate jobs, and this prompt only does the first properly. What it adds is a starting ladder: cards divided across day one, day three, day seven and day twenty one according to how much they interfere with their neighbours.",
          "Interference is the reason two similar cards learned on the same day both get forgotten. Six ionic compounds with similar formulas taught together will blur, so the ladder separates them. Once the deck is in a spaced repetition application, the application takes over the scheduling and the ladder just determines what enters the queue first.",
        ],
      },
      {
        heading: "Where cards stop being the right tool",
        body: [
          "Retrieval practice is powerful and narrow. It builds fast access to facts you have already understood, and it does almost nothing for the ability to structure an argument, plan an investigation or decide which method a problem needs.",
          "A student whose entire revision is a deck will get better at the recall questions and stay stuck on the six markers. Cards are the cheap layer underneath the expensive work, not a replacement for it, and any card that starts to look like an essay plan should go to the rejected pile.",
        ],
      },
    ],

    howTo: {
      name: "How to build a deck with the flashcard generator prompt",
      steps: [
        {
          name: "Use your own notes, not a textbook",
          text: "Paste what you wrote in lessons. Cards made from your wording cue the memory you actually formed, and gaps in your notes show up as the honest note at the end.",
        },
        {
          name: "List what you already know cold",
          text: "Every card you can already answer is a card that dilutes the deck. Naming twenty known facts up front usually removes a fifth of the output.",
        },
        {
          name: "Give an honest daily review number",
          text: "Count the minutes you will really spend, then halve the cards you think fit in them. The spacing ladder is built from that figure, so an inflated number produces a queue you fall behind on by Thursday.",
        },
        {
          name: "Read the splits before the deck",
          text: "The split list teaches you the rule. After two runs you will start noticing bundled cards in your own notes, which is the point at which the prompt has done its job.",
        },
        {
          name: "Act on the rejected pile",
          text: "Anything rejected for needing understanding first is a question for your teacher this week, not a card for next week.",
        },
      ],
    },

    faq: [
      {
        question: "Is using a flashcard generator prompt a way of avoiding the work?",
        answer:
          "Making cards is a genuinely useful activity, so automating it costs you something. The trade is worth it only if you read every card and reject the ones that are wrong, which takes about a quarter of the time writing them would have and keeps you in contact with the material.",
      },
      {
        question: "Can I hand a generated deck to a class?",
        answer:
          "You can, and it works better if each student then deletes the cards they already know and adds five of their own. A deck that arrives complete gets reviewed passively. A deck a student has edited gets reviewed, because they know what is in it and why.",
      },
      {
        question: "How many cards should a topic produce?",
        answer:
          "Far fewer than the notes suggest. A single lesson usually yields between eight and fifteen genuinely atomic facts once the bundles are split and the unmemorisable material is rejected. A deck of sixty cards from one lesson means the rules were not applied.",
      },
      {
        question: "Should I check the cards for factual errors?",
        answer:
          "Yes, every one. Cards generated from your own notes inherit your mistakes, and cards where the model filled a gap in your notes can be confidently wrong. A wrong card reviewed twenty times over a term is worse than no card, because spacing works on false facts too.",
      },
    ],

    internalLinks: [
      {
        href: "/education-prompts/revision-plan-prompt",
        label: "revision plan prompt",
        description:
          "Builds the schedule the deck sits inside, sequencing topics by score rather than by preference.",
      },
      {
        href: "/education-prompts/quiz-generator-prompt",
        label: "quiz generator prompt",
        description:
          "For the layer above cards, where the wrong answers are designed to reveal a misconception.",
      },
      {
        href: "/education-prompts/concept-explanation-prompt",
        label: "concept explanation prompt",
        description:
          "What to run on anything the rejected pile flagged as needing understanding before it can be memorised.",
      },
      {
        href: "/writing-prompts/summarise-document-prompt",
        label: "summarise document prompt",
        description:
          "For condensing a long source into notes worth carding, before the deck is built.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.retrievalpractice.org/library",
        label: "Retrieval Practice: research library",
        description:
          "Collects the cognitive psychology on why free recall outperforms recognition, which is the basis of the no options rule.",
      },
      {
        href: "https://pubmed.ncbi.nlm.nih.gov/26173288/",
        label: "PubMed: spacing effect research",
        description:
          "Peer reviewed evidence for expanding review intervals, cited here for the day one to day twenty one ladder.",
      },
      {
        href: "https://docs.ankiweb.net/getting-started.html",
        label: "Anki manual: getting started",
        description:
          "The reference for cloze syntax and deck import, which is where the exported cards are meant to end up.",
      },
    ],
  },
};

export default meta;
