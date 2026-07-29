import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "story-structure-prompt",
  name: "Decision Map",
  title: "Story Structure Prompt",
  category: "writing-prompts",
  taskType: "plan",
  summary:
    "Tests every beat for whether the protagonist chose it or it merely happened to them, locates the first irreversible decision, and leaves your empty slots empty.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["fiction", "narrative", "structure", "drafting"],

  seo: {
    primaryKeyword: "story structure prompt",
    keywords: [
      "story structure prompt",
      "how to structure a short story",
      "ai prompt for plotting a narrative",
      "finding the scene where the story actually starts",
      "structure that follows character decisions",
      "fixing a saggy middle in a draft",
    ],
    seoTitle: "Story Structure Prompt: Decisions, Not Events",
    seoDescription:
      "A story structure prompt that tests each beat for whether the protagonist chose it, finds where the story really starts, and refuses to invent your missing scenes.",
  },

  prompt: {
    text: `You are a story editor. You do not write plot. You examine the shape of what already exists and report on it.

PREMISE: {{PREMISE}}
PROTAGONIST, WHAT THEY WANT AND WHAT STANDS IN THE WAY: {{PROTAGONIST}}
THE SCENES I HAVE, IN ORDER: {{BEATS}}
FORM AND LENGTH: {{FORM}}

Do not propose a three act structure or any other named template. Work from the material given.

STEP ONE. State the want and the need separately. The want is what the protagonist would say they are pursuing. The need is what the story will require them to accept instead. If the material does not distinguish them, say so plainly rather than inventing a need.

STEP TWO. Label every scene DECISION, where the protagonist chooses and the choice costs something, or EVENT, where something happens to them. Count both. If more than a third are events, list which ones could become decisions and what the protagonist would have to choose.

STEP THREE. Identify the first irreversible decision, the point after which the protagonist cannot resume their previous life. Say how many words of the current draft come before it.

STEP FOUR. For each scene, state what changes between its start and its end. A scene where nothing changes is doing something else, and you should name what.

STEP FIVE. Mark any structural slot that is empty as EMPTY SLOT, describe the pressure that slot exists to apply, and stop. Do not write the missing scene. Do not suggest three options for it. Name the pressure and leave it to me.`,
    variables: [
      {
        token: "PREMISE",
        label: "What happens, in a sentence or two",
        example:
          "A hospice nurse discovers her late father's second family living four streets away and has to decide whether to tell her mother, who is dying",
      },
      {
        token: "PROTAGONIST",
        label: "Who wants what, and what stands in the way",
        example:
          "Ellen, 46. Wants her mother's last months to be peaceful. Stands in the way: the half sister keeps contacting her, and Ellen's brother already knows.",
      },
      {
        token: "BEATS",
        label: "The scenes you have, in order",
        example:
          "1. Ellen finds the letters. 2. She drives past the house. 3. The half sister calls. 4. Ellen lies to her mother. 5. Her brother admits he knew. 6. Funeral.",
      },
      {
        token: "FORM",
        label: "Form and length",
        example: "Literary short story, 6000 words, single point of view, close third person",
      },
    ],
    expectedOutput:
      "A want and a need stated separately, every scene labelled decision or event with a count of each, the first irreversible decision located with a word position, a statement of what changes in each scene, and empty slots named as pressures rather than filled with plot.",
    followUps: [
      "Scene four is labelled an event. Show me what Ellen would have to choose there to make it a decision, without adding a new character.",
      "Two thirds of the draft comes before the first irreversible decision. Tell me what the opening scenes are establishing that could arrive later instead.",
      "Take the empty slot you found before the funeral and describe only the pressure it applies, not the scene, in three different ways.",
    ],
    pitfalls: [
      "Give it a premise but no scene list and it will write you a plot, which is exactly the output that stops you finding your own. The beats field is what keeps it in an editorial role.",
      "Models label almost everything a decision when the protagonist speaks in the scene. Talking is not choosing, and it is worth rechecking any label attached to a conversation.",
      "A want and a need that come back identical usually means the premise is a situation rather than a story. That is fixable, but not by adding scenes.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "I ran this over four abandoned drafts from a writing group. Three had the same reading: fewer than a third of scenes were decisions, and the first irreversible choice sat past the halfway mark. The empty slot rule took several attempts to enforce, because both models want to be helpful and will write the missing scene unless told twice not to. Claude Opus 4.5 holds the line better once the instruction is explicit.",
  },

  article: {
    intro: [
      "A story structure prompt usually returns a template with your names dropped into it. Inciting incident, rising action, midpoint reversal, dark night of the soul. The labels fit almost anything, which is why they feel reassuring and why they change nothing about the draft you are stuck in.",
      "This one refuses templates and works only on the scenes you actually have. It sorts them by whether the protagonist chose them, locates the moment the story becomes irreversible, and marks the gaps without filling them.",
    ],

    sections: [
      {
        heading: "A template is not a diagnosis",
        body: [
          "Any ai prompt for plotting a narrative can map your material onto a named structure, because named structures are general enough to accommodate nearly any sequence of events. The mapping is always available and it is almost never informative. Being told that scene seven is your midpoint does not tell you why the reader put the story down at scene four.",
          "What you need instead is a set of tests the material can fail. A count that comes back wrong, a position that turns out to be too late, a scene where nothing changes. Failures locate the problem. A structure diagram accommodates it.",
        ],
      },
      {
        heading: "The decision test",
        body: [
          "Sorting scenes into decisions and events is the most useful single operation here. In a decision the protagonist chooses under pressure and pays for it. In an event something arrives from outside and they respond. Both belong in a story, but the ratio determines whether the reader experiences a character or a sequence.",
          "A structure that follows character decisions produces momentum without any effort at pacing, because each choice narrows the options for the next one. Event driven sequences feel busy while going nowhere, since the protagonist can absorb any number of arriving problems without ever becoming different.",
        ],
        list: [
          "Decision: she deletes the message before her brother sees it, knowing he will ask.",
          "Event: her brother finds the message. She reacts.",
          "Decision: he refuses the money and cannot explain why to his wife.",
          "Event: the funding falls through. He is disappointed.",
          "Not a scene: they discuss what to do and reach no conclusion.",
        ],
      },
      {
        heading: "Where the story actually starts",
        body: [
          "Finding the scene where the story actually starts is the most common structural repair in short fiction and the hardest to see from inside a draft. Writers need the early material in order to write the rest, so it stays, and by the third revision it has acquired sentences worth keeping.",
          "Locating the first irreversible decision and reporting how many words precede it turns that into a number. Two thousand words before the protagonist can no longer go back is a diagnosis, and it is a different diagnosis from a slow opening. The question then becomes what those two thousand words establish and whether it can arrive later, which it usually can.",
        ],
      },
      {
        heading: "Why the story structure prompt leaves gaps empty",
        body: [
          "This is the constraint I would keep above all the others. When a model identifies a missing scene and then writes it, the gap closes and the story becomes marginally the model's. Worse, the scene it writes will be the most conventional version available, because that is the shape it has seen most often, and it is difficult to unsee once read.",
          "Naming the pressure instead preserves the problem in a usable form. Something has to force her to speak before the funeral is a brief. A drafted confrontation in the hospital corridor is an answer, and once it exists your own answer has to compete with it rather than simply arriving.",
        ],
      },
      {
        heading: "The middle, where drafts go slack",
        body: [
          "Fixing a saggy middle in a draft is almost always addressed by adding, and adding is almost always wrong. The middle sags when consecutive scenes leave the protagonist with the same options they started with, so more incident produces more of the same feeling at greater length.",
          "The what changes question in step four is aimed directly at this. Run it across the middle third and the pattern shows up as a run of scenes whose answers are all variations on she becomes more worried. Anyone working out how to structure a short story will find that this run, rather than the ending, is where the piece was lost.",
        ],
      },
    ],

    howTo: {
      name: "How to use the story structure prompt",
      steps: [
        {
          name: "List the scenes you have, not the ones you intend",
          text: "One line each, in draft order. Intended scenes contaminate the counts, and the whole diagnosis depends on measuring the draft that exists.",
        },
        {
          name: "Separate the want from the need yourself first",
          text: "Write both down before running the prompt, then compare. Where your version and the model's disagree is usually where the draft is unclear rather than where the model is wrong.",
        },
        {
          name: "Argue with the decision labels",
          text: "Check every scene labelled a decision and ask what it cost. A choice with no cost is an event with dialogue, and models are generous here.",
        },
        {
          name: "Take the word position seriously",
          text: "If more than a quarter of the draft precedes the first irreversible decision, work on that before anything else. No amount of line level attention rescues an opening that has not started.",
        },
        {
          name: "Sit with the empty slots",
          text: "Write down the pressure each one applies and leave it for a day. The scene you invent unprompted will be more yours than anything generated to fill the space.",
        },
      ],
    },

    faq: [
      {
        question: "Does it work for a novel rather than a short story?",
        answer:
          "Run it per section rather than across the whole book. The decision count is meaningful over fifteen or twenty scenes and becomes noise over a hundred, and the first irreversible decision in a novel is usually a chapter level question that each act repeats at its own scale.",
      },
      {
        question: "What if the want and the need come back the same?",
        answer:
          "That normally means the material is a situation rather than a story. Situations can be vivid and go nowhere. The repair is to decide what the protagonist would have to give up to get what they want, which is a choice you make rather than one the structure reveals.",
      },
      {
        question: "Can the story structure prompt suggest an ending?",
        answer:
          "Deliberately not. An ending generated from a premise will be the most probable one, and probable endings are the ones readers see coming from the middle. What it will do is tell you which decisions remain unpaid, and an ending is generally sitting in that list already.",
      },
      {
        question: "Is the one third limit on events a real rule?",
        answer:
          "It is a threshold I use, not a law. What matters is that a draft dominated by events will feel passive regardless of how good the prose is. The number gives you something to check, and drafts that read as slack usually come in far above it.",
      },
      {
        question: "Should I run this before or after drafting?",
        answer:
          "After a full draft or a complete scene list. Before that there is nothing to measure and the prompt will start generating rather than diagnosing, which is precisely the mode it was written to avoid.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/headline-writing-prompt",
        label: "headline writing prompt",
        description:
          "The same payload thinking applied to non fiction, where the subhead spine has to hold together the way a scene sequence does.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "Only worth running once the scene order has settled. Line editing a scene you may cut is wasted work.",
      },
      {
        href: "/writing-prompts/tone-adjustment-prompt",
        label: "tone adjustment prompt",
        description:
          "For narration that drifts in distance between scenes, which the structural pass will not catch.",
      },
      {
        href: "/marketing-prompts/blog-post-outline-prompt",
        label: "blog post outline prompt",
        description:
          "The equivalent diagnosis for argument rather than narrative, built around a thesis instead of a protagonist.",
      },
    ],

    externalLinks: [
      {
        href: "https://arxiv.org/abs/1805.04833",
        label: "Fan et al: Hierarchical neural story generation",
        description:
          "Shows that generated narrative is locally fluent and structurally shallow, which is the reason this prompt diagnoses rather than drafts.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
        label: "Anthropic: Chain of thought prompting",
        description:
          "Documents why the labelling and counting steps have to complete before any judgement about the shape is requested.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Gemini prompting strategies",
        description:
          "Covers the constraint framing used to stop the model completing a gap it has just identified.",
      },
    ],
  },
};

export default meta;
