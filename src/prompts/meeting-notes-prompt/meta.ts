import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "meeting-notes-prompt",
  name: "Meeting Notes Extractor",
  title: "Meeting Notes Prompt",
  category: "business-prompts",
  taskType: "extract",
  summary:
    "Turns a transcript into decisions, owners and open questions, and separates what was agreed from what was merely discussed.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["meetings", "transcripts", "action items", "documentation"],

  seo: {
    primaryKeyword: "meeting notes prompt",
    keywords: [
      "meeting notes prompt",
      "ai prompt for meeting action items",
      "how to summarise a meeting transcript",
      "meeting minutes prompt for chatgpt",
      "how to extract action items from a meeting",
    ],
    seoTitle: "Meeting Notes Prompt: Decisions, Owners, Questions",
    seoDescription:
      "A meeting notes prompt that extracts decisions and owners instead of summarising discussion, and flags every action item nobody actually agreed to own.",
  },

  prompt: {
    text: `You are a chief of staff writing up a meeting. You do not summarise conversation. You extract commitments, and you are careful about the difference between something being said and something being agreed.

TRANSCRIPT OR NOTES: {{TRANSCRIPT}}
WHAT THE MEETING WAS FOR: {{PURPOSE}}
WHO WAS THERE: {{ATTENDEES}}

Produce exactly five sections. Do not write a narrative summary anywhere.

1. DECISIONS MADE. Each as one sentence in the past tense, stating what was decided and by whom. A decision qualifies only if someone with the authority to make it said so and nobody objected. If nothing qualifies, write "No decisions were made" rather than promoting a discussion to a decision.

2. ACTIONS. A table with three columns: what, who, by when. Rules: the owner must be a named person, never a team. If no name was attached in the transcript, write UNOWNED and keep the row. If no date was given, write NO DATE. Do not invent either.

3. OPEN QUESTIONS. Things raised that were not resolved. For each, name who is best placed to answer it.

4. DISCUSSED BUT NOT DECIDED. This section prevents the most common failure, where a topic gets aired at length and everyone leaves with a different impression of the outcome. List anything substantial that was talked about without a conclusion.

5. WHAT I COULD NOT TELL. Anything ambiguous in the transcript: crosstalk, a decision that may have been a suggestion, an owner implied but not stated. Be specific about the timestamp or the quote.

Never soften an UNOWNED action into a team assignment. Never convert a suggestion into a decision because it sounds like a natural conclusion.`,
    variables: [
      {
        token: "TRANSCRIPT",
        label: "The transcript or your raw notes",
        example:
          "[00:14] Sam: I think we should push the launch to March. [00:15] Dana: That works for support. [00:16] Sam: OK let's do that. Someone needs to tell the agency.",
      },
      {
        token: "PURPOSE",
        label: "What the meeting was for",
        example: "Weekly launch readiness check, deciding whether the February date still holds",
      },
      {
        token: "ATTENDEES",
        label: "Who was there and their roles",
        example: "Sam (product lead, owns the date), Dana (support manager), Ravi (engineering, joined late)",
      },
    ],
    expectedOutput:
      "Five sections with no prose summary: qualifying decisions only, an action table where unowned rows stay visibly unowned, open questions with the person best placed to answer, topics left unresolved, and an honest list of what the transcript did not make clear.",
    followUps: [
      "Write the four line message I send to the group afterwards, leading with the unowned actions rather than the decisions.",
      "Take the open questions and tell me which one blocks the most other work if it stays unanswered.",
      "Compare this against last week's notes and list every action that has now appeared twice without being completed.",
    ],
    pitfalls: [
      "The UNOWNED marker is the most valuable output and the one people quietly edit out before circulating. Leave it in, because an action with no name is not going to happen.",
      "Speaker labels matter more than transcript accuracy. Without them the model cannot tell a decision from a suggestion and will guess generously.",
      "If the meeting genuinely decided nothing, it says so. Resist the urge to rerun it with softer wording until something looks like a decision.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Confidently phrased discussion gets promoted into the decisions list by every model, even where the transcript shows the group moving on without agreeing. The authority and no objection test is what separates a decision from a strong opinion. Actions fail in a different shape, because a task assigned to the team belongs to nobody, which is what the UNOWNED marker is there to catch.",
  },

  article: {
    intro: [
      "A meeting notes prompt that produces a summary has solved the wrong problem. Nobody needs a shorter version of the conversation. What people need after a meeting is the list of things that are now true: what was decided, who owes what, and which questions are still open.",
      "This one extracts rather than summarises, and it is deliberately strict about the boundary between discussion and decision. That boundary is where most meeting documentation quietly fails, because a topic aired at length feels resolved to everyone present and turns out, three weeks later, to have been resolved differently in each of their heads.",
    ],

    sections: [
      {
        heading: "Summaries lose the only information worth keeping",
        body: [
          "A narrative summary preserves the shape of the conversation and discards its output. Reading one, you can tell that pricing came up and that opinions differed, but not whether anything changed as a result. The useful residue of a meeting is a small number of commitments, and they are best stored as commitments rather than as prose about commitments.",
          "This is why the prompt bans narrative entirely. Given permission to write a paragraph, a model will produce a fluent recap and bury the two actions inside it, where they will not be found by anyone scanning the document a fortnight later.",
        ],
      },
      {
        heading: "What qualifies as a decision",
        body: [
          "The test used here has two parts: someone with the authority to decide said so, and nobody objected. Both matter. Without the authority test, a strongly worded opinion from a junior attendee becomes a decision. Without the objection test, a proposal that met resistance gets recorded as settled because the person proposing it spoke last.",
          "Models are generous here by default, which makes sense given how meeting summaries in their training data are written, but generosity is exactly wrong for this task. Any ai prompt for meeting action items that lists everything mentioned produces a document nobody trusts twice. Turning a transcript into decisions and owners is only valuable if the decisions list is trustworthy enough that its absence means something.",
        ],
      },
      {
        heading: "The UNOWNED convention",
        body: [
          "An action assigned to a team is an action that will not be done. This is close to a law of organisational life, and the natural behaviour of a language model, which is to write that engineering will investigate the latency issue, launders that problem into something that looks like a plan.",
          "So the prompt requires a named person and, when the transcript does not supply one, requires the row to stay in the table marked UNOWNED. The list of unowned actions is usually the single most useful output, because it is a precise inventory of what everyone assumed someone else had picked up.",
        ],
        list: [
          "A named owner and a date: this will probably happen.",
          "A named owner and no date: this might happen, and belongs in the follow up message.",
          "No named owner: this will not happen, and pretending otherwise costs you three weeks.",
          "A team as the owner: the same as no owner, with the appearance of accountability.",
        ],
      },
      {
        heading: "Discussed but not decided, the section that prevents arguments",
        body: [
          "Section four exists because of a specific failure. A group spends twenty minutes on a topic, reaches no conclusion, and disperses with several incompatible impressions of where it landed. Nobody notices until the work built on those impressions collides.",
          "Recording these explicitly is mildly uncomfortable and extremely cheap. It converts an invisible disagreement into a visible open item, which is the whole job of writing anything down after a meeting.",
        ],
      },
      {
        heading: "Why the meeting notes prompt reports its own uncertainty",
        body: [
          "Section five asks the model to state what it could not tell from the transcript. Crosstalk, an unclear speaker attribution, a sentence that might have been a decision or might have been thinking aloud. This is the part that makes the rest usable without listening to the recording again.",
          "It matters more when you work out how to extract action items from a meeting recording rather than from written notes, because speaker labels are frequently wrong and a misattributed sentence can invent a decision the named person never made. Anyone working out how to summarise a meeting transcript at scale should treat an explicit uncertainty section as a requirement rather than a nicety.",
        ],
      },
    ],

    howTo: {
      name: "How to use the meeting notes prompt",
      steps: [
        {
          name: "Get speaker labels into the transcript",
          text: "Accuracy of the words matters less than knowing who said them. Without labels the authority test cannot run and decisions get attributed by guesswork.",
        },
        {
          name: "State the purpose and who holds authority",
          text: "The attendee field should note who can actually decide what. This is what stops a confident suggestion from being promoted into the decisions list.",
        },
        {
          name: "Read the unowned rows first",
          text: "Before the decisions, before the summary. Every unowned action is a commitment the room believed it had made and did not.",
        },
        {
          name: "Circulate it the same day",
          text: "Send the five sections unedited, including the ambiguities. Corrections arrive within hours while memories are fresh, which is when they are worth having.",
        },
      ],
    },

    faq: [
      {
        question: "Does the meeting notes prompt work on an unedited automatic transcript?",
        answer:
          "Yes, and section five is there for exactly that case. Automatic transcription misattributes speakers regularly, so the uncertainty list tends to be longer, which is the honest reflection of a noisy input rather than a shortcoming in the output.",
      },
      {
        question: "What if the meeting really did not decide anything?",
        answer:
          "Then it says so plainly, and that is a useful finding rather than a failed run. A recurring meeting that produces no decisions across several weeks is telling you something about the meeting, and notes that manufacture a decision to fill the section hide it.",
      },
      {
        question: "Can I use this as a meeting minutes prompt for chatgpt in a formal setting?",
        answer:
          "For most internal purposes, yes. Formal minutes for a board or a regulated body usually require a specific format, attendance record and approval process, so treat this as the extraction step and pour the output into whatever template governance requires.",
      },
      {
        question: "Why does it refuse to assign actions to a team?",
        answer:
          "Because shared ownership reliably becomes no ownership, and the phrasing hides it. A row that says the platform team will look into it reads like a plan and behaves like a gap. Forcing UNOWNED makes the gap visible while it can still be closed in a two line message.",
      },
      {
        question: "How is this different from the summary my meeting tool already produces?",
        answer:
          "Built in tools tend to produce a recap plus a generous action list, because generosity looks helpful. The difference here is the qualifying test for decisions and the refusal to invent owners or dates, which produces a shorter and considerably more reliable document.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "When the notes show a decision was needed and not made, this builds the document that forces one.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "For the actions that recur every week, which are usually a missing process rather than a task.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "The same extraction discipline applied before a customer call, deciding what you need to learn rather than what was said.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the structured extraction and explicit uncertainty reporting patterns the five section format is built on.",
      },
      {
        href: "https://hbr.org/2017/07/stop-the-meeting-madness",
        label: "Harvard Business Review: Stop the meeting madness",
        description:
          "The research on meeting cost and follow through, including why verbally agreed actions without owners are rarely completed.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG22/Understanding/",
        label: "W3C: Understanding WCAG",
        description:
          "Relevant when notes are circulated as documents, since tabular action lists need proper headers to be readable by assistive technology.",
      },
    ],
  },
};

export default meta;
