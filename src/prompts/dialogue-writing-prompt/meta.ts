import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "dialogue-writing-prompt",
  name: "Scene Builder",
  title: "Dialogue Writing Prompt",
  category: "writing-prompts",
  taskType: "generate",
  summary:
    "Gives each speaker a want, a withheld secret and three verbal habits, then writes a scene where most lines dodge the question and a beat table records who gained ground.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["fiction", "dialogue", "scene", "craft"],

  seo: {
    primaryKeyword: "dialogue writing prompt",
    keywords: [
      "dialogue writing prompt",
      "writing dialogue that does not sound like exposition",
      "giving two characters different speech patterns",
      "ai prompt for a scene of dialogue",
      "how to write an argument between two characters",
      "subtext in dialogue without stage directions",
    ],
    seoTitle: "Dialogue Writing Prompt: Wants, Withholding And Beats",
    seoDescription:
      "A dialogue writing prompt built on what each speaker wants and will not say, with three verbal habits per character and a beat table showing who gained ground.",
  },

  prompt: {
    text: `You are writing a scene of dialogue. You are not narrating one.

CHARACTER A, THEIR WANT IN THIS SCENE, AND THE ONE THING THEY WILL NOT SAY: {{CHARACTER_A}}
CHARACTER B, THE SAME THREE THINGS: {{CHARACTER_B}}
WHERE THEY ARE AND WHY NEITHER CAN SIMPLY WALK OUT: {{SITUATION}}
SOMETHING THE READER KNOWS THAT AT LEAST ONE OF THEM DOES NOT: {{GAP}}
LENGTH, COUNTED IN BEATS: {{BEATS}}

First, invent a speech signature for each character: exactly three habits, each of them mechanical rather than descriptive. Sentence length. A word they overuse. Whether they finish other people's sentences. Whether they ask questions or make statements. Do not write accents, dropped letters or phonetic spelling.

Then write the scene under these rules. Tags are said and asked only. No adverbs on tags. At most one line in three may directly answer the question it was asked. Neither character may state their want in plain words at any point. Neither may say the thing they will not say, though both may come close. No character may explain to the other something both of them already know. Physical action is allowed only when it changes what the next line can be.

End with a beat table: one row per beat, naming who gained ground and the exact line that did it.`,
    variables: [
      {
        token: "CHARACTER_A",
        label: "First speaker, their want, and what they withhold",
        example:
          "Marta, sixty, runs the family bakery. Wants her son to agree to sell the building. Will not say that she has already had it valued.",
      },
      {
        token: "CHARACTER_B",
        label: "Second speaker, their want, and what they withhold",
        example:
          "Tomas, thirty four, works there four days a week. Wants to be asked to take it over. Will not say that he was turned down for a job in March.",
      },
      {
        token: "SITUATION",
        label: "Where they are and why neither can leave",
        example:
          "The kitchen at five in the morning, mid bake. The proving dough needs turning every ten minutes and only the two of them are there.",
      },
      {
        token: "GAP",
        label: "What the reader knows that a character does not",
        example: "The reader has already seen the valuation letter on the office desk. Tomas has not.",
      },
      {
        token: "BEATS",
        label: "Length in beats",
        example: "Nine beats, roughly six hundred words",
      },
    ],
    expectedOutput:
      "Two speech signatures written as mechanical habits, a scene in which neither want is stated aloud and most lines sidestep the question, and a beat table naming the winner of each beat with the line that won it.",
    followUps: [
      "Run the same scene with the wants swapped, so the one who was pushing is now resisting, and tell me which version has more pressure.",
      "Strip every line to half its length. Show me which beats survive the cut and which turn out to have been padding.",
      "Give me the version where the withheld thing comes out in beat six, and say what the remaining beats now have to do.",
    ],
    pitfalls: [
      "Give both characters the same want in different words and the scene has nowhere to go. They have to want things that cannot both be satisfied in this room.",
      "If the situation does not physically hold them in place, the model writes an exit into beat three, because leaving resolves the tension more efficiently than talking does.",
      "Speech signatures described as personality traits come back as nothing at all. Warm and guarded produce identical dialogue. Sentence length and a repeated word produce two different people.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Left to itself, a model writes dialogue as a courteous interview: question, full answer, next question, because cooperation is its default posture. Capping direct answers at one line in three forces evasion, deflection and changing the subject, which is where conflict actually lives. Two speech signatures also drift toward a shared register late in a long scene.",
  },

  article: {
    intro: [
      "A dialogue writing prompt that asks for a conversation about a subject will get you a conversation about a subject, and it will be unreadable. Two reasonable people exchanging accurate information is not a scene. It is minutes.",
      "What makes an exchange live is that each speaker wants something, neither will say what it is, and the room will not let them leave. The prompt below takes those three things as inputs and refuses to write a line until it has them.",
    ],

    sections: [
      {
        heading: "People rarely answer the question they were asked",
        body: [
          "Record any real conversation with something at stake and count the direct answers. There are very few. People respond to the question they wish had been asked, or to the tone of it, or they answer three sentences later once the subject has moved on.",
          "Models default to the opposite because helpfulness is trained into them at the level of the turn. Ask a question, receive an answer. Capping direct answers at one line in three is a blunt instrument, and it is the single most effective line in the prompt.",
        ],
      },
      {
        heading: "A speech signature is three habits, not an accent",
        body: [
          "Giving two characters different speech patterns fails when the difference is described in adjectives. Ask for a brusque character and a warm one and you get the same sentences with different punctuation.",
          "Mechanical habits survive. One speaks in clauses that keep extending; the other stops at seven words. One asks questions when uncomfortable; the other makes statements. One says right at the start of every second line. Three of those, applied consistently, are enough for a reader to tell who is talking with the tags covered up.",
          "Phonetic spelling is banned outright. It marks class and region rather than person, it is tiring to read, and it lets the model skip the harder work of making the two of them think differently.",
        ],
      },
      {
        heading: "The dialogue writing prompt runs on wants, not topics",
        body: [
          "The inputs are not what they discuss. They are what each character is trying to get out of the other and what each is protecting. A scene where a mother wants her son to agree to a sale and the son wants to be asked to take over the business can be conducted entirely through a conversation about flour.",
          "This is also the mechanism behind subtext in dialogue without stage directions. Nothing has to be signposted in italics or narrated in a parenthesis. If both wants are live and neither can be said, every line about something else is carrying them.",
        ],
      },
      {
        heading: "Exposition has a smell",
        body: [
          "The characteristic failure is a character explaining to another character something both of them have known for years, for the benefit of a reader neither of them can see. As you know, we have been running this place since Dad died. Nobody says that.",
          "Writing dialogue that does not sound like exposition is mostly a matter of banning the move and then giving the information somewhere else to live. The prompt takes one fact the reader holds and at least one character does not, which turns the gap into pressure rather than into a briefing.",
          "An ai prompt for a scene of dialogue that has no reader gap tends to produce mutual updating, because both characters have to be told what the scene is about and there is nobody else to tell them.",
        ],
      },
      {
        heading: "Beats, and the count that stops a scene sprawling",
        body: [
          "A beat is one exchange in which the balance shifts. Counting them gives the scene a length that is not measured in words, and it gives you a way to check the work: if the beat table shows the same character gaining ground nine times running, there is no scene, only a person being worn down.",
          "The table is also where you catch the beats that do nothing. Two rows with no named line are two exchanges of pleasantries, and cutting them usually improves the scene more than any amount of rewriting.",
        ],
      },
      {
        heading: "Pressure is a property of the room",
        body: [
          "Learning how to write an argument between two characters is largely learning to construct a situation neither party can walk out of. A shared task helps, especially one with a clock in it, because the interruptions are free and they land on whichever line most needed interrupting.",
          "Without that, the model resolves the tension by having someone leave, which is the efficient solution and the wrong one. State the reason they are stuck there in the input and the scene stays in the room.",
        ],
      },
    ],

    howTo: {
      name: "How to run the dialogue writing prompt",
      steps: [
        {
          name: "Write the two withholdings first",
          text: "Before anything else, decide what each character will not say. If you cannot name one for both of them, the scene is not ready and no prompt will rescue it.",
        },
        {
          name: "Pin them to a place with a task in it",
          text: "Somewhere with an obligation running through it: a bake, a drive, a handover. The task supplies interruptions and gives the characters something to do with their hands.",
        },
        {
          name: "Read the beat table before the scene",
          text: "Alternating ground is a scene. One name repeated down the column is a monologue with responses, and no line level editing fixes that.",
        },
      ],
    },

    faq: [
      {
        question: "Can a dialogue writing prompt handle three or more speakers?",
        answer:
          "It can, but the quality drops sharply past two. With three people the model gives everyone equal airtime, which real groups never do, and the beat table stops being readable. Write the pair scene, then add the third voice yourself as an interruption with its own agenda.",
      },
      {
        question: "Why ban adverbs on dialogue tags?",
        answer:
          "Because an adverb on a tag is usually the line admitting it failed. He said angrily means the words themselves did not carry the anger, and the fix is to change the words rather than to label them. Removing the option forces the work back into the dialogue.",
      },
      {
        question: "Will the output need rewriting?",
        answer:
          "Almost always, and the useful part is often the shape rather than the sentences. The beat structure, the point where the withheld thing nearly surfaces, the line that turns the scene: those transfer to your own draft even when every word gets replaced.",
      },
      {
        question: "What if both characters end up sounding like the model?",
        answer:
          "Check the speech signatures were mechanical rather than descriptive, then look at where the drift begins. It usually starts once the scene gets emotionally warm, since the trained register for high feeling is fluent and even. Cut the scene at the drift point and run the remaining beats separately.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/story-structure-prompt",
        label: "story structure prompt",
        description:
          "Works out where the scene sits and what it has to accomplish before you spend nine beats writing it.",
      },
      {
        href: "/writing-prompts/character-description-prompt",
        label: "character description prompt",
        description:
          "The other half of the pair. Speech signature and observed detail should be describing the same person.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "For tightening the scene afterwards, with dialogue and quoted material excluded from the change log by default.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "The same idea applied to an organisation, where a voice is documented as concrete habits rather than as adjectives.",
      },
    ],

    externalLinks: [
      {
        href: "https://plato.stanford.edu/entries/implicature/",
        label: "Stanford Encyclopedia of Philosophy: Implicature",
        description:
          "Grice's account of how speakers mean more than they say, which is the formal basis for a scene where nobody states their want.",
      },
      {
        href: "https://owl.purdue.edu/owl/subject_specific_writing/creative_writing/index.html",
        label: "Purdue OWL: Creative writing resources",
        description:
          "A university writing centre's craft guidance, cited here for the conventional treatment of dialogue tags and scene construction.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers the constraint and negative instruction patterns that the answering ratio and the tag ban depend on.",
      },
    ],
  },
};

export default meta;
