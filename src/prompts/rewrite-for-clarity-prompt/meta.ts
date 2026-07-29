import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "rewrite-for-clarity-prompt",
  name: "Clarity Pass",
  title: "Rewrite For Clarity Prompt",
  category: "writing-prompts",
  taskType: "rewrite",
  summary:
    "Names the defect in every unclear sentence before touching it, leaves the working sentences alone, and stops where the author never decided what they meant.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["editing", "clarity", "revision", "plain writing"],

  seo: {
    primaryKeyword: "rewrite for clarity prompt",
    keywords: [
      "rewrite for clarity prompt",
      "how to make a paragraph easier to read",
      "ai prompt for simplifying dense sentences",
      "rewriting a draft without losing the meaning",
      "sentence length variation in edited copy",
      "clarity edit that preserves the author voice",
    ],
    seoTitle: "Rewrite For Clarity Prompt: Diagnose Then Rewrite",
    seoDescription:
      "A rewrite for clarity prompt that names the defect in each unclear sentence, changes only what is broken, and marks the places where the meaning was never there.",
  },

  prompt: {
    text: `You are a clarity editor. You work one sentence at a time and you never rewrite a sentence that already works.

TEXT: {{TEXT}}
WHO HAS TO ACT ON IT: {{READER}}
WHAT THEY MUST BE ABLE TO DO AFTER READING: {{OUTCOME}}
TERMS THAT MUST SURVIVE UNCHANGED: {{PROTECTED}}

Read every sentence and decide whether the stated reader can act on it. If they can, print it unchanged and move on. Do not polish it.

For each sentence that fails, name the defect before you touch it. Use one of these labels: buried subject, hidden verb, stacked modifiers, unresolved pronoun, welded ideas, undefined term, missing agent. If none fits, describe the defect in your own words and say that the list did not cover it.

Then rewrite that sentence alone and print three lines: ORIGINAL, DEFECT, REWRITE.

Constraints. Do not merge or split paragraphs. Do not alter any protected term. Do not strip a hedge such as usually or in most cases, because a hedge carries information about confidence. Do not make every sentence the same length.

If a sentence is confusing because the writer never settled what they meant, do not guess at it. Print CONTENT GAP and the one question the writer has to answer.

Close with the number of sentences you left untouched and the number of content gaps found. If nothing was left untouched, say why, because that is unusual in a draft written by a competent person.`,
    variables: [
      {
        token: "TEXT",
        label: "The passage to edit",
        example:
          "Following the completion of the migration activity, notification will be sent to affected users regarding the applicable changes to their access permissions.",
      },
      {
        token: "READER",
        label: "Who has to act on it",
        example: "Support agents who will field the calls the morning after the migration",
      },
      {
        token: "OUTCOME",
        label: "What they must be able to do after reading",
        example: "Tell a caller whether their login will still work and what to do if it does not",
      },
      {
        token: "PROTECTED",
        label: "Terms that must survive unchanged",
        example: "access permissions, single sign on, service account",
      },
    ],
    expectedOutput:
      "A pass in which several sentences come back untouched, every rewrite is preceded by a named defect, protected terms appear verbatim in the new version, and any sentence whose meaning was never decided is marked as a content gap with a question attached.",
    followUps: [
      "Apply the same defect labels to the headings and the bullet lists, which you skipped.",
      "Show me only the content gaps, with the question for each, so I can take them to the person who owns the decision.",
      "The rewrite is now uniformly short. Restore variety in sentence length without reintroducing any of the defects you named.",
    ],
    pitfalls: [
      "Leaving the protected terms field empty is the main way this goes wrong. Models substitute a friendlier synonym for a defined term and the sentence reads better while meaning something else.",
      "The untouched count only means something if the reader field is specific. Set the reader to a general audience and everything looks unclear.",
      "A long list of content gaps is not a failure of the prompt. It usually means the draft was written before the decision it describes was made.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The untouched count changed how I use this. On a 700 word service update, Claude Opus 4.5 left nine sentences alone and raised two content gaps, one of which was a rollout date nobody had actually agreed. GPT-5.2 edits far more eagerly and will quietly replace a defined term with a friendlier synonym unless the protected list is filled in, so I now treat that field as mandatory rather than optional.",
  },

  article: {
    intro: [
      "A rewrite for clarity prompt is easy to write badly. Ask a model to make a passage clearer and it rewrites every sentence, including the ones that were already doing their job, and returns something smoother, shorter and quietly different in meaning.",
      "This version inverts the default. The model has to name the defect before it is allowed to change anything, and it reports at the end how many sentences it left alone. On a competent draft that number should be high.",
      "It also refuses to guess. When a sentence is hard to follow because the writer never decided what they meant, rearranging the words does nothing, so the prompt stops and asks a question instead.",
    ],

    sections: [
      {
        heading: "Unclear is not one problem",
        body: [
          "Clarity is a diagnosis, not a quality. A sentence can be hard to follow because the subject arrives late, because an action has been frozen into a noun, because a pronoun could point at two things, or because two unrelated claims have been joined with the word and. Those need different repairs, and a model told simply to improve the writing will apply a single house style to all of them.",
          "Anyone working out how to make a paragraph easier to read is usually looking at one sentence carrying three jobs at once. Naming which job is causing the trouble is most of the work. The rewrite that follows is then almost mechanical, and, more usefully, it is reviewable, because you can disagree with the diagnosis rather than arguing about taste.",
        ],
      },
      {
        heading: "Why the rewrite for clarity prompt counts what it left alone",
        body: [
          "The closing count exists to make restraint visible. Without it, there is no way to tell whether the model considered a sentence and approved it, or simply rewrote everything on autopilot. With it, a report saying nine of fourteen sentences were untouched is a claim you can check by reading those nine.",
          "The count also functions as a quality signal for the original draft. A passage that comes back almost entirely rewritten was worse than its author thought. A passage where only two sentences moved was mostly fine, and the editor who was about to spend an hour on it can spend ten minutes instead.",
        ],
      },
      {
        heading: "The content gap marker",
        body: [
          "Some sentences are not badly written. They are empty. A phrase such as the appropriate stakeholders will be engaged at the relevant point cannot be clarified, because there is nothing underneath it to clarify. A model asked to improve it will invent a stakeholder and a point, and the invented version reads well enough that nobody notices the fabrication.",
          "Printing CONTENT GAP and a question instead is the single most valuable behaviour in this prompt. Rewriting a draft without losing the meaning depends on the meaning existing in the first place, and the gaps are where it does not. In documentation work they tend to cluster around ownership and timing, which is exactly where an invented specific does the most damage.",
        ],
      },
      {
        heading: "Rhythm survives the edit",
        body: [
          "Simplification has a failure mode that is worse than the original problem. Every sentence becomes twelve words long, every clause resolves in the same shape, and the passage reads like a warning label. Readers slow down rather than speeding up, because there is no variation to tell them which sentence carries the weight.",
          "Sentence length variation in edited copy is what stops that happening, which is why the prompt bans uniform length outright. A clarity edit that preserves the author voice keeps the short sentence that lands a point and the long one that sets up a condition, and only intervenes where a defect was named.",
        ],
      },
      {
        heading: "Protect the words that carry weight",
        body: [
          "Any ai prompt for simplifying dense sentences has to be told which words are load bearing. Access permissions is not corporate padding if your product has an access permissions screen. A defined term in a policy, a legal threshold, a field name in a database and a diagnosis in a clinical note all look like jargon from outside and all break something when replaced.",
          "The protected list should be written before the edit, not recovered afterwards from a diff. Five or six terms is usually enough, and the discipline of listing them tends to surface an inconsistency of its own, because half the time the draft is already using two different names for the same thing.",
        ],
      },
    ],

    table: {
      caption: "The defect labels the prompt uses, and what each one looks like in a draft",
      headers: ["Defect", "How it reads", "The usual repair"],
      rows: [
        [
          "Buried subject",
          "The thing performing the action turns up in the third clause",
          "Move the actor to the front",
        ],
        [
          "Hidden verb",
          "An action frozen into a noun, such as make a determination",
          "Return it to a verb: determine",
        ],
        [
          "Stacked modifiers",
          "Four adjectives queueing in front of one noun",
          "Keep the one that changes a decision",
        ],
        [
          "Unresolved pronoun",
          "This or it, with two possible referents in reach",
          "Name the thing again, even if it repeats",
        ],
        ["Welded ideas", "Two unrelated claims joined by and", "Split, in the order the reader needs"],
        ["Missing agent", "A passive that hides who has to act", "Name the person or the team"],
      ],
    },

    howTo: {
      name: "How to use the rewrite for clarity prompt",
      steps: [
        {
          name: "Write the protected list first",
          text: "List the defined terms, field names and legal phrases that must appear verbatim in the output. Do this before reading the draft again, while you still remember why each one is precise.",
        },
        {
          name: "Name a reader who has to do something",
          text: "Not a general audience. A support agent taking calls on Monday, or a nurse checking a dose. The defect diagnosis is only meaningful relative to someone with a task.",
        },
        {
          name: "Read the untouched sentences first",
          text: "They are the model's claim that the draft was already working there. If you disagree with two or three of them, the reader field is probably too broad and worth tightening before you accept any rewrites.",
        },
        {
          name: "Route the content gaps to a person",
          text: "Each gap comes with a question. Send those questions to whoever owns the decision rather than answering them yourself, because guessing at the answer is the failure the marker exists to prevent.",
        },
      ],
    },

    faq: [
      {
        question: "Will it flatten writing that is deliberately complex?",
        answer:
          "Only if you let it. The defect list is closed, so a long sentence with a late subject and a clear purpose does not match any label and comes back untouched. Complexity that serves the argument survives, complexity that is accidental gets named.",
      },
      {
        question: "What is the difference between this and asking for a simpler version?",
        answer:
          "A request for a simpler version gives the model no way to decline. It will simplify, because that is what was asked, including the parts that were fine. Requiring a named defect first means the model has to justify each intervention, and it can report that no intervention was needed.",
      },
      {
        question: "How many content gaps is too many?",
        answer:
          "More than about one per two hundred words usually means the document was drafted before the underlying decisions were taken. That is worth knowing early. Editing your way around missing decisions produces text that reads confidently and commits to nothing.",
      },
      {
        question: "Does it work on transcripts and notes?",
        answer:
          "Reasonably well on notes, poorly on raw transcripts. Speech has repairs, false starts and repetition that are not defects in the written sense, and the model will label all of them. Clean the transcript into sentences first, then run the clarity pass over the result.",
      },
      {
        question: "Should I run it before or after a structural edit?",
        answer:
          "After. There is no point diagnosing sentences in a section you are about to cut, and structural changes create new sentences that then need their own pass. Fix what the piece argues and in what order, then bring it here for the line level work.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description:
          "The next pass after clarity, working on cadence and word choice rather than comprehension defects.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "For public facing documents where jargon has to be replaced or glossed rather than merely untangled.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "Useful when the clarity pass keeps returning content gaps, because the underlying process was never written down.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/legibility-readability-comprehension/",
        label: "Nielsen Norman Group: Legibility, readability and comprehension",
        description:
          "Separates the three things people mean by clear writing, which is the distinction the defect labels are built on.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/concise/",
        label: "Plainlanguage.gov: Write concise sentences",
        description:
          "The federal guidance on hidden verbs and buried subjects, two of the defect names used in the prompt.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the staged instruction pattern that lets the diagnosis complete before any rewriting begins.",
      },
    ],
  },
};

export default meta;
