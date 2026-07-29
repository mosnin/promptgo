import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "process-documentation-prompt",
  name: "Process Writer",
  title: "Process Documentation Prompt",
  category: "business-prompts",
  taskType: "rewrite",
  summary:
    "Turns how you personally do something into a document another person can follow, by interrogating you for the steps you forgot you knew.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["documentation", "sops", "onboarding", "handover"],

  seo: {
    primaryKeyword: "process documentation prompt",
    keywords: [
      "process documentation prompt",
      "ai prompt for writing an sop",
      "how to document a process you do from memory",
      "standard operating procedure template for small teams",
      "writing a handover document before leaving",
      "capturing tacit knowledge from an expert",
    ],
    seoTitle: "Process Documentation Prompt: Write A Usable SOP",
    seoDescription:
      "A process documentation prompt that interviews you first, catching the steps you skip because you know them, then writes a procedure someone else can follow.",
  },

  prompt: {
    text: `You are a technical writer who specialises in capturing knowledge from people who have done a task so many times they no longer notice half of what they do.

THE PROCESS: {{PROCESS}}
WHO WILL FOLLOW IT: {{READER}}
HOW I DO IT, ROUGHLY: {{ROUGH_STEPS}}
WHAT GOES WRONG: {{FAILURES}}

Work in two phases. Do not skip phase one.

PHASE ONE: INTERROGATE ME.
Read my rough steps and ask me between five and eight questions about what is missing. Focus specifically on:
- Steps that assume access, permissions or a tool I did not mention
- Decisions I make without noticing, especially "it depends" moments
- What I check before starting, and what tells me I am finished
- The thing I would notice was wrong that a new person would not
- Any step where the order matters and is not obvious

Ask the questions and STOP. Do not write the document yet. Number the questions so I can answer them briefly.

PHASE TWO: after I answer, write the procedure in this structure:
1. WHEN TO RUN THIS. The trigger, and one line on when NOT to run it.
2. BEFORE YOU START. Access, tools and information needed, as a checklist. Anything a person could discover they lack halfway through goes here.
3. THE STEPS. Numbered, one action each. Every step that involves a judgement call gets a sub line beginning "Decide:" stating the criteria. Never write "as appropriate" or "as needed".
4. HOW TO KNOW IT WORKED. The observable result, not a feeling.
5. WHEN IT GOES WRONG. Each failure I named, its symptom, and the fix.
6. WHAT I STILL COULD NOT CAPTURE. Anything you suspect is tacit knowledge that my answers did not surface. Be specific about which step you doubt.

Write for the reader named above. Assume no context beyond what section two lists.`,
    variables: [
      {
        token: "PROCESS",
        label: "The process to document",
        example: "Closing the monthly books and sending the management accounts pack",
      },
      {
        token: "READER",
        label: "Who will follow it",
        example: "A new bookkeeper, three weeks in, who knows the software but not our chart of accounts",
      },
      {
        token: "ROUGH_STEPS",
        label: "How you do it, roughly",
        example:
          "Reconcile the bank, chase missing receipts, check the accruals, run the P and L, sanity check against last month, export and send to the directors",
      },
      {
        token: "FAILURES",
        label: "What goes wrong",
        example:
          "Duplicate supplier invoices from the scanning app, and the payroll journal sometimes lands after I have already run the P and L",
      },
    ],
    expectedOutput:
      "First a numbered list of questions about what your rough steps left out, then after you answer, a procedure with an explicit prerequisites checklist, decision criteria written out in full, and an honest list of what it still could not capture.",
    followUps: [
      "A new starter followed this and got stuck at step four. Rewrite that step assuming they have never seen the system before.",
      "Turn section five into a standalone troubleshooting page ordered by how often each failure happens.",
      "Now write the two paragraph version for someone covering this once while I am on leave, keeping only what cannot be improvised.",
    ],
    pitfalls: [
      "Skipping phase one produces a tidy document that omits everything you know without noticing, which is the entire problem you were solving.",
      "Answer the questions briefly and honestly rather than defensively. The question that feels obvious is usually the one hiding a step.",
      "Section six is worth acting on rather than reading. Where it doubts a step, watch a real person attempt it before you trust the document.",
    ],
  },

  eeat: {
    author: "Elena Sorokin",
    authorCredential:
      "Ran operations at two venture backed companies, where most of the job was finding out which agreed actions had no owner.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Single pass versions of this produced documents that read well and failed the moment someone new used them, because the expert had described six steps for a process that turned out to have nineteen. Splitting it into an interrogation phase and a writing phase was the fix. The questions models ask are genuinely good, and the one about what you would notice was wrong that a new person would not has surfaced a missing check almost every time I have run it.",
  },

  article: {
    intro: [
      "A process documentation prompt that writes a procedure from your description will produce a document that only works for you. This is not a writing problem. Anyone who has done a task fifty times has stopped seeing most of it, so the description they give is genuinely incomplete in ways they cannot detect by rereading it.",
      "The fix is to stop the model writing anything at first. This one interviews you instead, asking five to eight targeted questions about the access you assumed, the judgement calls you make without noticing and the checks you run automatically. Only after you answer does it write the procedure.",
    ],

    sections: [
      {
        heading: "Why experts write bad instructions",
        body: [
          "Skill compresses. As a task becomes routine, the individual decisions inside it collapse into a single remembered action, and the intermediate steps become genuinely unavailable to introspection. Asked to describe the process, the expert reports the compressed version in good faith.",
          "This is why capturing tacit knowledge from an expert cannot be done by asking them to write it down. It has to be done by asking questions that force decompression, which is a different activity and one a model is unusually well suited to because it has no shared context to fill the gaps with.",
        ],
      },
      {
        heading: "The five things the interview looks for",
        body: [
          "The question categories are fixed because unfocused interviewing produces pleasant conversation and few new steps. Each category targets a specific way that knowledge hides.",
        ],
        list: [
          "Assumed access: the permission, licence or shared folder you were granted so long ago you forgot it is not universal.",
          "Invisible decisions: the moments where the answer depends on something, and you have never articulated on what.",
          "Entry and exit conditions: what you check before starting and what tells you the job is done.",
          "Expert noticing: the wrong looking number a new person would accept without question.",
          "Order dependencies: steps that must happen in sequence for a reason that is not visible from the steps themselves.",
        ],
      },
      {
        heading: "Banning as appropriate and as needed",
        body: [
          "These two phrases are where documentation quietly fails. They appear at exactly the points where a judgement is required, and they transfer none of the judgement, which means the document is most vague precisely where it is most needed.",
          "The prompt forbids them and instead requires a line beginning with the word Decide, stating the criteria explicitly. Forcing that sentence often reveals that the author does not know their own rule yet, which is uncomfortable and productive. Anyone working out how to document a process you do from memory will spend most of their effort on these lines.",
        ],
      },
      {
        heading: "Prerequisites as a checklist, not a paragraph",
        body: [
          "Section two exists because of a specific failure: the person following the document gets four steps in, discovers they lack an account, and has to stop and wait a day. Everything that could cause that belongs at the top as a checkable list.",
          "It is also the section that ages fastest, since access and tooling change more often than the work itself. A standard operating procedure template for small teams is worth reviewing at this section alone every few months, even when the underlying process is stable.",
        ],
      },
      {
        heading: "What the process documentation prompt admits it missed",
        body: [
          "The final section asks the model to name the steps it suspects are still incomplete. This is unusual in a generated document and it is the part that makes the rest trustworthy, because it turns the output from a claim of completeness into a draft with marked edges.",
          "In practice its doubts are well placed. It tends to flag the step where your answers were shortest, which is reliably the step you understand so well that explaining it felt unnecessary. Treat each flag as an instruction to watch someone else attempt that step before relying on the document.",
        ],
        subsections: [
          {
            heading: "Testing it properly",
            body: [
              "The only real test is handing it to someone who has not done the task and watching without helping. Every question they ask aloud is a missing line. This is uncomfortable to sit through and takes about twenty minutes, and it finds more gaps than any amount of rereading.",
            ],
          },
        ],
      },
      {
        heading: "Handover documents and the deadline problem",
        body: [
          "The highest stakes version of this is writing a handover document before leaving, where there is a fixed date and no opportunity to answer follow up questions afterwards. The interview structure matters more here, because the usual safety net, being available on chat for a fortnight, does not exist.",
          "For handovers, run the prompt once per distinct process rather than attempting one large document. An ai prompt for writing an sop produces a usable result at the scale of a single task and a sprawling one at the scale of a whole role.",
        ],
      },
    ],

    howTo: {
      name: "How to use the process documentation prompt",
      steps: [
        {
          name: "Describe the process badly, on purpose",
          text: "Write the six line version you would say out loud. Polishing it first hides the gaps that the interview phase is designed to find.",
        },
        {
          name: "Answer the questions honestly",
          text: "Short answers are fine. The questions that feel too obvious to need answering are the ones concealing a step, so answer those first.",
        },
        {
          name: "Rewrite every judgement line",
          text: "Check each Decide line states real criteria. If any of them reads as it depends, the rule is still in your head rather than the document.",
        },
        {
          name: "Have someone else run it",
          text: "Watch them work through it without intervening. Note every question they ask, add those as steps, and pay particular attention to anything section six flagged.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the process documentation prompt ask questions before writing?",
        answer:
          "Because the description you give it is incomplete and you cannot tell which parts are missing. Familiarity removes steps from conscious recall, so the gaps are invisible from the inside. Questions from something with no shared context are the fastest way to surface them.",
      },
      {
        question: "How detailed should a procedure be?",
        answer:
          "Detailed enough that the named reader can finish without asking anyone, and no more. That standard is why the reader field matters: a procedure for an experienced colleague and one for a first week starter are genuinely different documents from the same process.",
      },
      {
        question: "What if I cannot answer some of the interview questions?",
        answer:
          "Say so and let the document record it. A procedure with two acknowledged unknowns is considerably more useful than one that quietly papers over them, because the reader knows where to ask rather than discovering the gap mid task.",
      },
      {
        question: "Can I document a process I have never done myself?",
        answer:
          "Only by interviewing the person who has, using the question categories directly. Writing it from observation alone reproduces the same compression problem at one remove, since you will record what they visibly do and miss what they silently check.",
      },
      {
        question: "How often should procedures be reviewed?",
        answer:
          "Review the prerequisites section every few months, since access and tooling drift faster than the work. Review the whole document whenever someone new follows it, because their questions are free evidence about what has gone stale.",
      },
    ],

    internalLinks: [
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "An action that appears in three consecutive sets of notes is usually a missing process rather than a recurring task.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the judgement calls too consequential to compress into a Decide line, which need a decision rather than a rule.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "The same decompression applied to a sales conversation, surfacing what an objection means rather than what it says.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the multi turn and staged output patterns that make the interrogation phase hold before the writing phase begins.",
      },
      {
        href: "https://www.nist.gov/publications",
        label: "NIST: Documentation and procedural control practice",
        description:
          "Primary reference for prerequisite declaration and verifiable completion criteria in written procedures.",
      },
      {
        href: "https://www.nngroup.com/articles/task-analysis/",
        label: "Nielsen Norman Group: Task analysis",
        description:
          "The established method for decomposing expert tasks into observable steps, which the five question categories are drawn from.",
      },
    ],
  },
};

export default meta;
