import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "note-summary-prompt",
  name: "Notes To Actions",
  title: "Note Summary Prompt",
  category: "productivity-prompts",
  taskType: "extract",
  summary:
    "Sorts raw notes into what was settled, at most five startable actions, the questions that block them, and one recommendation it has to commit to.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["notes", "actions", "decisions", "research"],

  seo: {
    primaryKeyword: "note summary prompt",
    keywords: [
      "note summary prompt",
      "turning messy notes into next actions",
      "ai prompt for condensing research notes",
      "notes that never get read again",
      "extracting decisions from personal notes",
      "summary that ends in a recommendation",
    ],
    seoTitle: "Note Summary Prompt: End With a Recommendation",
    seoDescription:
      "A note summary prompt that refuses to hand back shorter notes. It separates what was settled, names five startable actions and commits to one recommendation.",
  },

  prompt: {
    text: `You are working through somebody's raw notes. You will not write a summary. A shorter version of these notes leaves the reader holding the same work in a smaller container.

NOTES: {{NOTES}}
WHY I TOOK THEM: {{PURPOSE}}
WHAT I HAVE TO DECIDE OR DO NEXT: {{PENDING}}

Produce four parts and nothing else.

1. SETTLED. Things these notes show have already been resolved, one sentence each, past tense. Include something only if the notes state it rather than imply it. If nothing was resolved, write that nothing was resolved instead of promoting a leaning into a conclusion.

2. NEXT ACTIONS. A numbered list, capped at five. Each item starts with a verb, names a first physical step, and takes under an hour. "Think about pricing" is not an action. "Draft three pricing tiers on one page" is. If more than five qualify, drop the weakest and say which.

3. BLOCKING QUESTIONS. Only questions that block one of the five actions. For each, name the action it blocks and the person who can answer it. If nothing is blocked, say so.

4. RECOMMENDATION. One paragraph. Say what you would do next and why, using only what is in these notes, then name the single thing that would change your mind. Commit even when the notes are thin: state your assumption rather than hedging.

Quote the notes when a claim comes from them. Label anything you worked out yourself as INFERRED. Never fill a gap with a plausible detail.`,
    variables: [
      {
        token: "NOTES",
        label: "Your raw notes, exactly as written",
        example:
          "vendor call - pricing tiers?? they said 3 seats min - Priya unsure about the SLA - check renewal date - maybe move to annual - Sam thinks the API limits are the real issue - decision by month end?",
      },
      {
        token: "PURPOSE",
        label: "Why you were taking these notes",
        example:
          "Working out whether to renew the logistics vendor or run a short evaluation of two alternatives.",
      },
      {
        token: "PENDING",
        label: "The decision or task waiting on these notes",
        example: "I have to tell finance by the 30th whether we are renewing at the current tier.",
      },
    ],
    expectedOutput:
      "Four labelled parts: a short settled list quoting the notes, at most five actions each startable within a minute, only the questions that block one of them, and a committed recommendation with its own falsifier.",
    followUps: [
      "Write the messages that unblock each blocking question, one per recipient, each under sixty words.",
      "Take the recommendation and argue the opposite case using only what is in the same notes.",
      "Tell me which of the five actions I could delete entirely without changing the recommendation.",
    ],
    pitfalls: [
      "Tidying the notes before pasting them removes the hesitations and abbreviations that signal which lines were settled and which were passing thoughts.",
      "Leaving the pending field empty produces a neutral reading rather than a position, because the recommendation has nothing to aim at.",
      "Any action you could not begin within a minute of reading it is a category, not an action. Send those back.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Given a page of my own shorthand, both models fused three separate half thoughts into one confident decision about a vendor nobody had chosen. The quote requirement and the INFERRED label stopped it. GPT-5.2 still writes actions that are really categories, so reject anything you could not physically begin within a minute of reading it.",
  },

  article: {
    intro: [
      "A note summary prompt that gives back a shorter version of your notes has done arithmetic rather than thinking. You still have to read it, still have to work out what it implies, and still have to decide something. The compression saved a minute and moved nothing.",
      "This one is built to end somewhere: a capped set of startable actions, the questions that block them, and a recommendation the model is not allowed to dodge. Committing is the difficult part, because a hedge always looks like the more responsible output.",
      "It also labels what it worked out for itself, which matters more with personal notes than with any other input. Notes are full of half sentences, and a model will helpfully complete them into something you never wrote and will not remember not writing.",
    ],

    sections: [
      {
        heading: "Why the note summary prompt refuses to summarise",
        body: [
          "Notes are already compressed. They were written fast, by you, in a shorthand nobody else can read, and their difficulty has nothing to do with length. The problem is that settled things, half thoughts and unanswered questions sit side by side with no marker separating them.",
          "Sorting those apart is the work. Shrinking the text is not. Notes that never get read again are usually short and unsorted rather than long. People reach for an ai prompt for condensing research notes when a folder gets unwieldy and get back a folder shaped paragraph, which has the same defect in fewer words.",
        ],
      },
      {
        heading: "Actions have to name a first physical step",
        body: [
          "Turning messy notes into next actions fails at one specific point. The model writes think about pricing, or review the vendor options, and those are categories of work rather than things a person can begin. An action you cannot begin is a note with better formatting.",
          "Hence the rule: a verb, a first physical step, and a size that fits under an hour. Draft three pricing tiers on one page can start at four minutes past nine. Review the vendor options cannot start at all, which is why it will still be sitting in the same notebook next month.",
        ],
        list: [
          "Verb first: draft, send, call, book, delete.",
          "A first step you could take without preparing to take it.",
          "Under an hour, so it fits the gaps a real day contains.",
          "Capped at five, so the list stays a decision rather than a transcription.",
        ],
      },
      {
        heading: "Questions earn their place by blocking something",
        body: [
          "Any set of notes generates questions and most of them do not matter. This prompt keeps a question only when it blocks one of the five actions, and it has to name which one.",
          "That is the difference between extracting decisions from personal notes and producing an interesting reading of them. A question blocking nothing is curiosity. A question blocking action two is the most valuable line on the page, and it nearly always resolves with one message to somebody who answers in ten minutes.",
        ],
      },
      {
        heading: "The recommendation, and why hedging is banned",
        body: [
          "One paragraph, one course of action, one thing that would change its mind. Models hedge by default, which is a reasonable instinct given thin input, but an output ending in it depends reproduces exactly the state you were in before you asked.",
          "Requiring a commitment plus a falsifier is what makes that safe. You are not being told what to do, you are being handed a position to argue with, and a position is far quicker to think against than an even handed overview. One summary that ends in a recommendation is worth three that end in considerations.",
        ],
      },
    ],

    howTo: {
      name: "How to run the note summary prompt",
      steps: [
        {
          name: "Paste the notes exactly as written, typos included",
          text: "Cleaning them first strips out the hesitation and speed that tell the model which lines were settled and which were thinking aloud.",
        },
        {
          name: "Say what you have to decide next",
          text: "The pending field is what the recommendation aims at. Without it you get a neutral reading of the notes, which is the thing you were trying to avoid.",
        },
        {
          name: "Read the INFERRED labels before anything else",
          text: "That is where invention lives. Two or three inferences per page is normal and one of them is usually wrong in a way that changes an action.",
        },
      ],
    },

    faq: [
      {
        question: "Can it handle notes from several meetings at once?",
        answer:
          "Yes, and the recommendation improves with more input, provided you say which notes came from where. Without that separation the model merges two conversations and produces a settled line that nobody who was in either room would recognise as accurate.",
      },
      {
        question: "What if my notes really are only fragments?",
        answer:
          "Then the settled section comes back short or empty and the inferred labels are dense, which is an accurate reading rather than a poor one. The recommendation still has to commit and state its assumption, and that assumption is usually the fastest thing to go and check.",
      },
      {
        question: "Does the note summary prompt work on handwritten pages I photographed?",
        answer:
          "It works on whatever transcription you can produce, although recognition errors become confident nonsense more often than people expect. Read the quoted lines against the image, because a misread figure is the failure that survives all the way through to an action.",
      },
      {
        question: "Why cap next actions at five?",
        answer:
          "An uncapped list turns into the notes again with bullets in front. Five forces a choice, and choosing is the only part of this exercise you could not have done yourself in roughly the same amount of time it took to ask.",
      },
      {
        question: "Should I keep the original notes afterwards?",
        answer:
          "Keep them at least until the actions are finished. The output is lossy by design and throws away everything that did not lead anywhere, which is the right trade this week and the wrong one if you need the surrounding context in six months.",
      },
      {
        question: "What stops it inventing a decision nobody made?",
        answer:
          "Two rules working together: a conclusion has to be stated rather than implied, and the source line has to be quoted. Anything the model reasoned its own way to carries a label, so the two categories stay visibly apart without rereading the notes.",
      },
      {
        question: "How is this different from asking for bullet points?",
        answer:
          "Bullet points reorganise. This classifies, cuts, and then takes a position, which means the output is capable of being wrong in a useful way. A bulleted summary can only be incomplete, and incompleteness is much harder to notice than a bad call.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/inbox-triage-prompt",
        label: "inbox triage prompt",
        description:
          "For the messages the blocking questions turn into, sorted and drafted in the same pass.",
      },
      {
        href: "/productivity-prompts/daily-standup-prompt",
        label: "daily standup prompt",
        description:
          "Feeds yesterday's actions into an update that names a blocker instead of listing activity.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "When the same notes keep producing the same five actions, the real output is a written process.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
        label: "Anthropic: Reducing hallucinations",
        description:
          "The quote the source and label the inference pattern this prompt uses to keep invented detail visible.",
      },
      {
        href: "https://arxiv.org/abs/2305.14251",
        label: "Min et al: Fine grained factuality evaluation",
        description:
          "Research showing long generations mix supported and unsupported claims, which is why each claim carries its source here.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Covers why asking for a committed answer with stated assumptions outperforms asking for a balanced overview.",
      },
    ],
  },
};

export default meta;
