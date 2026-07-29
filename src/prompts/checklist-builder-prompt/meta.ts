import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "checklist-builder-prompt",
  name: "Killer Item Checklist",
  title: "Checklist Builder Prompt",
  category: "productivity-prompts",
  taskType: "generate",
  summary:
    "Turns a procedure into at most nine items that each fail the job if skipped, written as states you can verify, with pause points and a named caller.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["checklists", "procedures", "reliability", "handover"],

  seo: {
    primaryKeyword: "checklist builder prompt",
    keywords: [
      "checklist builder prompt",
      "read do or do confirm checklist",
      "killer items in a checklist",
      "ai prompt for a standard operating procedure",
      "checklist items you can actually verify",
      "keeping a checklist short enough to use",
    ],
    seoTitle: "Checklist Builder Prompt: Nine Items That Actually Matter",
    seoDescription:
      "A checklist builder prompt that keeps only the steps whose omission breaks the job, writes each as a verifiable state, and caps the whole thing at nine items.",
  },

  prompt: {
    text: `You are building a checklist that a competent person will use under time pressure. A checklist is not the procedure. It is the short list of things that go wrong when a competent person is busy.

THE TASK AND HOW OFTEN IT IS DONE: {{TASK}}
THE FULL PROCEDURE AS IT CURRENTLY EXISTS: {{PROCEDURE}}
WHO WILL USE THIS AND WHAT THEY ALREADY KNOW: {{USER}}
WHAT HAS ACTUALLY GONE WRONG BEFORE: {{FAILURES}}
WHEN IT IS USED: {{MOMENT}}

Build it like this.
1. Choose READ DO, where each item is performed as it is read, or DO CONFIRM, where the work is done from memory and the list is run afterwards as a check. Justify the choice from how often the task is done and how experienced the user is. Do not offer both.
2. Apply the skip test to every candidate step. Ask what happens if a competent person skips it. If the answer is nothing, or they would notice immediately, it is not a checklist item. Show me the steps you removed and what the skip test said.
3. Cap the result at nine items. If more survive the skip test, the task is two checklists with a handover between them, and you should say where the seam is.
4. Write each item as a state that can be verified, not an action that can be claimed. Not check the backups, but last backup timestamp is within 24 hours.
5. Mark PAUSE POINTS where work must stop until something is confirmed, and name the role that calls the pause.
6. Write ASSUMED KNOWLEDGE, the things this list takes for granted, so anybody handing it to a newcomer knows it is not training material.

Return the checklist, the type and the reason for it, the removed steps with their skip test results, the pause points with callers, the assumed knowledge, and the item most likely to be ticked without being done.`,
    variables: [
      {
        token: "TASK",
        label: "The task and how often it is done",
        example: "Releasing a new version of the customer facing web application, roughly twice a week",
      },
      {
        token: "PROCEDURE",
        label: "The full procedure as it currently exists",
        example:
          "Our 31 step release runbook covering branch cutting, changelog, staging deploy, smoke tests, database migration, feature flag config, production deploy, monitoring window and rollback",
      },
      {
        token: "USER",
        label: "Who will use this and what they already know",
        example:
          "Any engineer on the team who has shipped at least three times. They know the tooling. Two of the eight have never run a migration in production.",
      },
      {
        token: "FAILURES",
        label: "What has actually gone wrong before",
        example:
          "Twice we deployed with a migration that had not been run on staging, and once the feature flag was left off so nobody saw the release for two days",
      },
      {
        token: "MOMENT",
        label: "When it is used",
        example: "Late afternoon, usually with somebody waiting, often by one person alone",
      },
    ],
    expectedOutput:
      "A checklist of nine items or fewer, each written as a verifiable state, a stated type with the reasoning, the removed steps with their skip test results, pause points with a named caller, the knowledge the list assumes, and the item most at risk of being ticked without being done.",
    followUps: [
      "Write the version somebody uses at three in the morning during an incident, cut to the four items that still matter then.",
      "Take the assumed knowledge list and turn it into the training checklist a new joiner runs alongside somebody experienced.",
      "Six months of use, no failures. Tell me which items are now candidates for removal and what evidence would justify it.",
    ],
    pitfalls: [
      "Pasting the runbook and asking for a checklist gets you the runbook with boxes next to it. The skip test is the whole mechanism, and it only works if the failure history is filled in.",
      "Writing items as actions rather than states is why checklists get ticked without being done. Confirm the config is correct can be ticked by a person who glanced at it. Config value matches the release ticket cannot.",
      "A checklist longer than nine items is used properly twice and skimmed thereafter. If everything genuinely matters, the honest answer is two lists and a handover, not one long one.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to turn a long runbook into a checklist, models pad the result with unfalsifiable items such as communicate with the team, and they restore that padding as soon as the request is for something more thorough. The skip test, where a step survives only if skipping it breaks something, is the constraint that keeps the list short.",
  },

  article: {
    intro: [
      "A checklist builder prompt is useful in inverse proportion to how much it writes. The failure mode of every checklist project is a document that reproduces the procedure with tick boxes attached, which is used carefully once, skimmed the second time, and ticked from memory by the fourth.",
      "Checklists work because they are short. They exist to catch the small number of things a competent person under pressure actually gets wrong, and everything else on the list makes those items harder to see.",
      "So this prompt starts by throwing steps away. Every candidate faces one question: what happens if somebody who knows this job skips it? If the answer is nothing much, it does not make the list.",
    ],

    sections: [
      {
        heading: "The checklist builder prompt is not writing your procedure",
        body: [
          "The procedure is how the job is done, written for somebody learning it or auditing it. The checklist is a memory aid for somebody who already knows the job and is doing it at half past five with a colleague waiting. Conflating the two produces a document that serves neither purpose.",
          "This matters for anyone reaching for an ai prompt for a standard operating procedure and expecting a checklist to fall out. Both are worth having and they are different artefacts with different readers. Write the procedure once, keep it complete, and derive the short list from it.",
        ],
      },
      {
        heading: "Read do or do confirm",
        body: [
          "A read do or do confirm checklist is a genuine fork, and the choice depends on how often the task is done and how experienced the user is. Read do means each item is performed as it is read, which suits rare and high consequence tasks where nobody has the sequence in their hands. Do confirm means the work is done from memory and the list is run afterwards as a check, which suits frequent tasks where reading along would slow an expert down and get abandoned.",
          "Choosing the wrong one is why checklists get ignored. A twice weekly release with a read do list is a document an engineer stops opening in the third week, because it is telling them things they know in the order they were going to do them anyway.",
        ],
      },
      {
        heading: "The skip test and what survives it",
        body: [
          "Killer items in a checklist are the ones whose omission causes a real failure that is not immediately obvious. Both halves of that matter. Forgetting to deploy is an omission you notice in seconds and does not need a list. Forgetting to run the migration on staging is invisible until production, which is exactly the shape of thing a checklist exists for.",
          "Running the test out loud on a thirty step runbook is uncomfortable, because most steps fail it. That is the correct result. The output shows you the removed steps with the reasoning, so the deletion is a decision the team can inspect rather than something the model did quietly.",
        ],
        list: [
          "Survives: skipping it breaks something, and nothing tells you until later.",
          "Removed: a competent person would notice within a minute.",
          "Removed: it is part of doing the task at all, not a thing that gets forgotten.",
          "Removed: it appears because somebody once wanted the process to look rigorous.",
        ],
      },
      {
        heading: "Checklist items you can actually verify",
        body: [
          "Checklist items you can actually verify are states rather than actions. An action can be claimed, and under time pressure it will be. Check the backups is ticked by somebody who looked at a dashboard for two seconds. Last backup timestamp is within 24 hours cannot be ticked without reading a number.",
          "The rewrite is mechanical once you see it. Every item should finish in a form where a second person could confirm it independently, without asking whether you did the thing.",
        ],
        subsections: [
          {
            heading: "The item most likely to be ticked without being done",
            body: [
              "The output names one, and it is worth reading before the list itself. In testing it was usually the item requiring somebody else to confirm something, because waiting for a colleague is the friction people route around when they are in a hurry.",
            ],
          },
        ],
      },
      {
        heading: "Pause points need a named caller",
        body: [
          "A pause point is a place where work stops until something is confirmed, and it is the only part of a checklist with teeth. Without one, a list is advisory, and an advisory list loses every argument with a deadline.",
          "Naming the role that calls the pause is what makes it real. Not the team and not whoever notices, but the release engineer, the duty manager, the person running the deploy. A pause anybody can call is a pause nobody calls, particularly when calling it means telling a waiting colleague that they are waiting longer.",
        ],
      },
      {
        heading: "Keeping a checklist short enough to use",
        body: [
          "Keeping a checklist short enough to use is not a design preference, it is the difference between a working control and a piece of paper. The cap here is nine items, which is roughly what somebody will run properly under pressure, and when more than nine survive the skip test the answer is two lists with a handover rather than one long one.",
          "The assumed knowledge section protects the shortness. A list of six items looks dangerously thin to anybody worried about a newcomer using it, and writing down what the list takes for granted answers that worry directly: this is not training material, and here is precisely what a user needs to know before it is safe to hand them.",
        ],
      },
    ],

    howTo: {
      name: "How to build a list with the checklist builder prompt",
      steps: [
        {
          name: "Paste the real procedure, including the untidy parts",
          text: "The steps somebody added after an incident three years ago are the interesting ones, because they usually encode a genuine failure or a piece of theatre, and the skip test separates the two.",
        },
        {
          name: "Write the failure history honestly",
          text: "What actually went wrong, how many times, and what was missed. This field does more to shape the output than the procedure does, and a blank one produces a generic list.",
        },
        {
          name: "Read the removed steps before the checklist",
          text: "That is where the argument is. If you disagree with a removal, say what the skip actually causes and rerun, because your objection is usually a failure the history did not mention.",
        },
        {
          name: "Test it on somebody who has not done the job today",
          text: "Give them the list and watch. Every item they hesitate over is either ambiguous or belongs in the assumed knowledge section, and you will find two of them in the first run.",
        },
      ],
    },

    faq: [
      {
        question: "Can a checklist builder prompt work from a procedure that has never been written down?",
        answer:
          "Describe the task in a few sentences and be detailed about the failure history, which is the input that carries most of the weight. The result will be a first draft rather than a finished control, and running it past two people who do the task will fix most of what it missed.",
      },
      {
        question: "What if my industry requires every step to be recorded?",
        answer:
          "Then you need both artefacts and you should not merge them. Keep the full procedure as the record of what was done, and use the short list as the operational check during the work. Combining them gives you a compliance document that nobody uses at the moment of risk.",
      },
      {
        question: "Why nine items rather than ten or twenty?",
        answer:
          "It comes from aviation and surgical practice, where lists that run past roughly nine items under time pressure get skimmed rather than executed. The exact number is less important than having a hard ceiling, because without one every list grows by a couple of items a year and nobody ever removes any.",
      },
      {
        question: "How often should a checklist be revised?",
        answer:
          "After every failure it did not catch, and once a year otherwise. The annual pass is mostly about removal: items that have never once caught anything in twelve months are candidates to go, and shrinking a list is what keeps the remaining items credible.",
      },
      {
        question: "Should the list be paper or in a tool?",
        answer:
          "Whatever is in the user's hand at the moment of use. A checklist in a wiki three clicks away is not used during a late deploy. If the work happens in a terminal, the list belongs in the terminal, and if it happens in a room, it belongs on the wall of that room.",
      },
    ],

    internalLinks: [
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description:
          "For handing the task to somebody new, where the assumed knowledge list is the thing that has to be covered first.",
      },
      {
        href: "/productivity-prompts/decision-log-prompt",
        label: "decision log prompt",
        description:
          "Record why a step was removed from the list, so it does not get quietly added back after the next incident.",
      },
      {
        href: "/productivity-prompts/context-switching-prompt",
        label: "context switching prompt",
        description:
          "Checklists exist because people are interrupted mid task, which is the same problem approached from the other end.",
      },
      {
        href: "/business-prompts/process-documentation-prompt",
        label: "process documentation prompt",
        description:
          "Writes the full procedure this list is derived from, and keeps the two documents in their separate jobs.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
        label: "World Health Organization: surgical safety checklist",
        description:
          "The most studied short checklist in existence, and the source of the killer item and pause point concepts used here.",
      },
      {
        href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook",
        label: "FAA Airplane Flying Handbook",
        description:
          "Documents the read do and do confirm distinction as standard practice, including when each is appropriate.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct",
        label: "Anthropic: Be clear and direct",
        description:
          "Explains why a hard item cap plus an explicit removal test produces pruning, where an instruction to be concise does not.",
      },
    ],
  },
};

export default meta;
