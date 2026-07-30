import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "user-flow-prompt",
  name: "State Table First",
  title: "User Flow Prompt",
  category: "design-prompts",
  taskType: "plan",
  summary:
    "Maps a feature as states and transitions, then runs four defect checks for dead ends, unreachable states, one way doors and silent loss of work.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["user flows", "state machines", "journey mapping", "edge cases"],

  seo: {
    primaryKeyword: "user flow prompt",
    keywords: [
      "user flow prompt",
      "how to map the unhappy path",
      "how to map a signup flow",
      "how to find dead end states in a user flow",
      "how to define entry and exit conditions for each screen",
      "how to make a user flow diagram",
    ],
    seoTitle: "User Flow Prompt: Find The Dead Ends First",
    seoDescription:
      "A user flow prompt that builds a state table, then checks for dead ends, unreachable states, irreversible steps and work lost without warning.",
  },

  prompt: {
    text: `You are mapping a flow as a state machine. Screens are states. Anything that changes what the user can do next is a transition. You do not describe visuals, and you suggest no improvements until the map is finished.

FEATURE: {{FEATURE}}
ENTRY POINTS: {{ENTRIES}}
WHAT COUNTS AS DONE: {{SUCCESS}}
WHAT GOES WRONG IN REALITY: {{FAILURES}}
CONSTRAINTS: {{CONSTRAINTS}}

Produce a state table with one row per state: state id, name, what is true when the user arrives, every way out including cancel and browser back, and what persists if they leave at that moment.

Then run four checks and report each as its own list.
CHECK 1, DEAD ENDS. States with no exit other than closing the tab.
CHECK 2, UNREACHABLE. States that nothing transitions into.
CHECK 3, ONE WAY DOORS. Transitions that cannot be reversed, and whether the user is warned before taking them.
CHECK 4, SILENT LOSS. States where leaving discards work without saying so.

Then list every state that exists only because something failed, and separate the failures the user caused from the failures the system caused.

Finish with the map as a mermaid stateDiagram-v2 block. The diagram comes last because the table is the deliverable and the diagram is only a view of it.`,
    variables: [
      {
        token: "FEATURE",
        label: "The feature being mapped",
        example: "Adding a second clinician to an existing practice account and granting them record access",
      },
      {
        token: "ENTRIES",
        label: "Every way someone arrives",
        example:
          "Settings menu, the empty state on the team page, an emailed invite link, and a deep link from a shared record",
      },
      {
        token: "SUCCESS",
        label: "What done actually means",
        example: "The second clinician has logged in once and can open a record they did not create",
      },
      {
        token: "FAILURES",
        label: "What really goes wrong",
        example:
          "Invite lands in spam, the address already belongs to another practice, the licence count is exceeded mid flow",
      },
      {
        token: "CONSTRAINTS",
        label: "Rules the flow cannot break",
        example: "Identity verification before record access, and an audit entry for every permission change",
      },
    ],
    expectedOutput:
      "A state table where every row lists its exits and what persists, four defect lists naming specific state ids, a split of failure states by cause, and a mermaid diagram at the end.",
    followUps: [
      "Take the dead end list and design the exit for each one, saying where the user lands and what they keep.",
      "Add the states that appear when the same person is invited to two practices at once and show which existing rows change.",
      "Collapse the flow to the shortest path that still satisfies the constraints, and tell me which states I lose.",
    ],
    pitfalls: [
      "Listing only the happy failures produces a tidy map. Put the embarrassing ones in: the expired link, the duplicate account, the half completed record from three months ago.",
      "Models treat browser back as if it does not exist. It is in the required exits for that reason, and it is where most silent loss is found.",
      "Ask for the diagram first and you get a clean picture with the defects designed out of it, because a diagram wants to look coherent.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["Claude Opus 4.5", "GPT-5.2"],
    testingNote:
      "Flow reviews from a model tend to confirm the happy path and stop there. The states that generate support tickets are the ones where leaving a screen discards entered work without warning, and they surface only when the prompt asks explicitly what each exit destroys. Unreachable state checks are noisier and depend on every entry point being listed.",
  },

  article: {
    intro: [
      "A user flow prompt that draws boxes and arrows gives you the version of the flow you already believed. Diagrams look coherent by nature, so the states nobody designed simply do not appear, and the map ends up documenting the intention rather than the product.",
      "Building the table first changes the result. Every state has to declare what is true on arrival, every way out, and what survives if the person leaves right then. Rows are dull, and dull is what makes a missing exit visible.",
      "Then four checks run against the table, each looking for a specific class of defect that costs support time rather than looking pretty in a review.",
    ],

    sections: [
      {
        heading: "A flow is a graph and graphs have measurable defects",
        body: [
          "Treating a flow as a state machine gives you something a drawing cannot: properties you can check mechanically. A graph can be examined for nodes with no outgoing edges, nodes with no incoming edges, and edges that only run one way. Those three checks catch a surprising proportion of real product complaints.",
          "How to find dead end states in a user flow is the clearest example. Almost every one traced back to a failure state added late, with a message and no button, because the design covered the successful path and the error was handled in code afterwards.",
          "The unreachable check runs in the opposite direction and usually finds documentation rather than defects: a state that exists in the code, has no route into it any more, and is still being maintained by an engineer who assumes somebody uses it.",
        ],
      },
      {
        heading: "Every state declares its exits",
        body: [
          "Knowing how to define entry and exit conditions for each screen sounds bureaucratic until you count the exits people actually take. Cancel, browser back, closing the tab, an interruption from a phone call, a session timing out, a shared machine changing hands mid task.",
          "Browser back is the one models forget and the one users press most. It is in the required list because leaving it out is how a flow ends up with a state that can be reached backwards into an inconsistent condition, and because it is where the fourth check finds most of its silent loss.",
        ],
      },
      {
        heading: "Most of a product is the unhappy path",
        body: [
          "How to map the unhappy path is the question where the row count doubles. A signup with four screens in the design file has eleven or twelve states once expired invitations, duplicate addresses, exceeded licences and abandoned half completed accounts are included, and every one of those states needs copy that somebody has to write.",
          "Splitting the failure states by cause is the part teams find most useful in review. Failures the user caused need a correction they can make. Failures the system caused need honesty and a route onwards. Merging the two is how products end up apologising for a user's typo and blaming the user for an outage.",
        ],
        subsections: [
          {
            heading: "One way doors deserve a warning",
            body: [
              "Check three finds transitions that cannot be reversed: sending an invitation, publishing, deleting, submitting for approval. Each one is fine as long as the person knew it was one way, and the check asks specifically whether they were told before rather than after.",
            ],
          },
        ],
      },
      {
        heading: "Why the user flow prompt puts the diagram last",
        body: [
          "Asking how to make a user flow diagram from a feature description gets you something presentable in about ten seconds, and presentable is the problem. The layout engine wants a tidy graph, the model wants a coherent story, and between them the awkward states get smoothed away before you ever see them.",
          "Generating the table first and rendering it afterwards means the diagram is a view of a checked artefact rather than an invention. Anyone working out how to map a signup flow should notice the difference immediately: the table version has rows for the states that generate support tickets, and the diagram drawn from it has boxes nobody would have drawn by hand.",
        ],
      },
    ],

    howTo: {
      name: "How to run the user flow prompt",
      steps: [
        {
          name: "List every entry point",
          text: "Menus, empty states, emailed links, deep links, shortcuts from other features. The unreachable check is only meaningful once the entries are complete.",
        },
        {
          name: "Put the real failures in",
          text: "Pull the last month of support tickets for this feature and paste the recurring ones. That input produces states no design file contains.",
        },
        {
          name: "Read check four before anything else",
          text: "Silent loss of work is the defect users never report and always remember. It is usually one modal and one missing confirmation.",
        },
        {
          name: "Design the missing exits, then rerun",
          text: "Add an exit to each dead end and run the prompt again on the updated description to confirm no new state was created by the fix.",
        },
      ],
    },

    faq: [
      {
        question: "How is the user flow prompt different from a journey map?",
        answer:
          "A journey map covers emotion, channels and time across a whole relationship. This works at feature scale and cares only about states and transitions. They answer different questions, and this one is the version an engineer can build directly from.",
      },
      {
        question: "Can it map a flow that crosses several products?",
        answer:
          "Yes, though treat each product boundary as a state with explicit exits rather than trying to model the other system in detail. Handoffs between systems are where dead ends concentrate, particularly when the second system has no route back into the first.",
      },
      {
        question: "What if the flow has no failure states yet?",
        answer:
          "Then the feature is not designed yet, whatever the file shows. Run it with the failures field filled from a similar feature you already operate, and treat the resulting rows as a list of decisions to make rather than as a documentation exercise.",
      },
      {
        question: "Does the mermaid diagram render everywhere?",
        answer:
          "It renders in most documentation tools and in many code hosts, which is enough for review. Where it does not, the table remains readable on its own, and that ordering is deliberate since the table is the artefact people will actually maintain.",
      },
      {
        question: "How many states is too many?",
        answer:
          "Past roughly twenty five, split the map at a natural boundary such as before and after identity verification. Long tables stop being read carefully, and the four checks lose value the moment somebody skims the lists rather than tracing each state id.",
      },
      {
        question: "Should analytics events come out of this?",
        answer:
          "They should. Every transition in the table is a candidate event, and naming events after transitions rather than after screens gives you funnels that survive a redesign. It also makes the dead ends measurable, since a state with no outgoing event is visible in the data.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description:
          "Writes the strings for every state this map produces, including the failure states nobody had copy for.",
      },
      {
        href: "/design-prompts/wireframe-planning-prompt",
        label: "wireframe planning prompt",
        description:
          "Takes one state from the table and decides the region order inside it, once the flow itself is settled.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For the one way doors, where the choice deserves a written record rather than a line in a diagram.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/user-journeys-vs-user-flows/",
        label: "Nielsen Norman Group: user journeys versus user flows",
        description:
          "Draws the boundary between journey mapping and flow mapping, which is the scope decision this prompt takes.",
      },
      {
        href: "https://mermaid.js.org/syntax/stateDiagram.html",
        label: "Mermaid: state diagram syntax",
        description:
          "The specification for the diagram block, so the output renders rather than needing to be redrawn by hand.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/API/History_API",
        label: "MDN: the History API",
        description:
          "Documents how browser back actually behaves in an application, which is why it is a required exit on every state.",
      },
    ],
  },
};

export default meta;
