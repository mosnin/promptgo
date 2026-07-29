import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "wireframe-planning-prompt",
  name: "Region Order Planner",
  title: "Wireframe Planning Prompt",
  category: "design-prompts",
  taskType: "plan",
  summary:
    "Orders a screen as a numbered region list with a cut line at the first viewport height, and bans every visual word so the argument stays about sequence.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["wireframes", "layout", "information architecture", "above the fold"],

  seo: {
    primaryKeyword: "wireframe planning prompt",
    keywords: [
      "wireframe planning prompt",
      "low fidelity layout plan",
      "content priority above the fold",
      "how to plan a page before designing it",
      "block level layout spec",
      "wireframe structure for a signup page",
    ],
    seoTitle: "Wireframe Planning Prompt: Order Before Pixels",
    seoDescription:
      "A wireframe planning prompt that turns a user goal into a numbered region list with a cut line, and refuses to mention colour, type or components.",
  },

  prompt: {
    text: `You are planning a screen in words. You may not use visual language: no colours, no typefaces, no imagery, no component names borrowed from any library. A region that cannot be justified by what the reader needs to know at that point does not go in the plan.

WHAT THE READER IS TRYING TO DO: {{GOAL}}
WHAT THEY ALREADY BELIEVE ON ARRIVAL: {{PRIOR}}
WHAT WE NEED FROM THEM: {{ASK}}
WHAT WE MUST SHOW BY LAW OR POLICY: {{REQUIRED}}
VIEWPORT: {{VIEWPORT}}

Produce a numbered region list, top to bottom. Each region carries five fields: number, name, content type from the set text, input, list, media, control or disclosure, the one question it answers for the reader, and the cost of moving it one position lower.

Then place a CUT LINE between the last region that fits inside the first viewport height and the first region that does not, estimating rough heights per content type. Say how many regions sit above it.

Then answer three questions.
A. Which region above the cut line earns its place least, and what would take the slot?
B. Which required item is hardest to place, and where does it end up?
C. What question is in the reader's head as they reach the cut line, and does the region directly below it answer that question?

Finish with one alternative ordering that would be correct if the reader arrived already convinced.`,
    variables: [
      {
        token: "GOAL",
        label: "What the reader came to do",
        example: "Work out whether this tool imports their existing patient records before signing up",
      },
      {
        token: "PRIOR",
        label: "What they believe before they arrive",
        example:
          "They have been burned by a migration that lost data, and assume any import will be manual",
      },
      {
        token: "ASK",
        label: "What you need from them on this screen",
        example: "Email address and practice size, then a booked demo slot",
      },
      {
        token: "REQUIRED",
        label: "Anything you are obliged to display",
        example: "Regulatory registration number, data residency statement, cookie preference link",
      },
      {
        token: "VIEWPORT",
        label: "The viewport you are planning for",
        example: "Mobile first, 390 by 844, one thumb, most traffic from a search result",
      },
    ],
    expectedOutput:
      "A numbered region list with content types and displacement costs, a cut line placed with a count of regions above it, three direct answers, and a second ordering for a convinced reader.",
    followUps: [
      "Re plan the same screen for a 1440 wide viewport and tell me which regions change order rather than just widening.",
      "Take region one and write three versions of the question it answers, then say which version the rest of the order depends on.",
      "Remove the two lowest value regions entirely and describe what the reader now cannot find out.",
    ],
    pitfalls: [
      "Leaving PRIOR empty produces the generic order: headline, benefits, proof, form. That order is only right for a reader with no history, which is almost nobody arriving from a search result.",
      "Models place required legal items in a footer by reflex. Question B exists to stop that, and the answer is worth reading even when you disagree with it.",
      "If the alternative ordering is nearly identical to the first, the goal and prior fields were too similar in weight to produce a real fork.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Gemini 3 Pro"],
    testingNote:
      "I added the displacement cost column after watching a team argue for forty minutes about whether testimonials sat third or fifth. Made to write what it costs to demote each region, the model produced an argument both sides could attack, and the meeting ended in nine minutes. The cut line estimates are rough and should be checked against a real build before anyone quotes them.",
  },

  article: {
    intro: [
      "A wireframe planning prompt should not draw anything. The decisions that make a layout work are decisions about order and priority, and they are much easier to argue about as a numbered list than as a set of grey boxes, because grey boxes invite comments about the boxes.",
      "This one produces a region list top to bottom, each region tagged with the single question it answers for the reader and the cost of demoting it one place. Then it draws a cut line at the first viewport height and asks which region above that line earns its place least.",
    ],

    sections: [
      {
        heading: "The order is the design, the boxes are the record of it",
        body: [
          "Anyone asking how to plan a page before designing it is really asking how to stop the visual decisions from arriving first. Once a frame exists, the conversation turns to spacing and weight, and the sequence gets frozen by accident because nobody wants to rearrange work that already looks finished.",
          "Words keep the argument reversible. Moving line four above line two is free, and the fact that it is free is precisely what makes it happen. A block level layout spec written as a numbered list is a decision you can still change in the meeting where it is challenged.",
          "It also exposes empty regions. A section that cannot state the question it answers for the reader is a section someone added because the page felt short, and it is far easier to delete a line of text than a rendered block.",
        ],
      },
      {
        heading: "The cut line is where the argument gets honest",
        body: [
          "Content priority above the fold is one of the oldest disputes in the field and most of the heat comes from the word fold. The useful version is narrower: given rough heights for each content type, which regions fit in the first screen, and is the reader's question at that boundary answered by whatever comes next?",
          "That third question does most of the work. A reader scrolls when they have a reason to believe the answer is below, so the boundary region is not a waste of space, it is the promise. When the region under the cut line does not follow from the one above it, the scroll rate is the symptom and the ordering is the cause.",
        ],
        subsections: [
          {
            heading: "Why estimated heights are enough",
            body: [
              "The estimate only has to be good enough to rank regions. Being wrong by eighty pixels does not change whether the price sits above or below the line, and waiting for a real build before having the conversation means having it after the layout is expensive to change.",
            ],
          },
        ],
      },
      {
        heading: "Why the wireframe planning prompt bans visual words",
        body: [
          "The prohibition on colour, type and component names is the load bearing constraint. Allowed to describe a hero with a bold headline over a full bleed image, a model produces a plausible page from its training data rather than a plan derived from your goal and your reader's prior beliefs.",
          "Removing the vocabulary forces the reasoning into the open. What comes back is a list of content types and reasons, which reads as dull and is easy to attack on the merits. Dull and attackable is the correct texture for this stage.",
        ],
      },
      {
        heading: "Turning the region list into a low fidelity layout plan",
        body: [
          "Once the order survives challenge, the drawing part goes quickly. Each region becomes a block, the content type dictates roughly what shape it takes, and the displacement costs tell you which adjacencies matter enough to protect when the layout meets a real breakpoint. A low fidelity layout plan built this way tends to survive contact with real content, because it was never sized around placeholder text.",
          "A wireframe structure for a signup page is the clearest demonstration. Run with a reader who has been burned by a bad migration, the form drops below the evidence that their data survives, and no amount of tightening a hero would have found that. Run with a reader who arrived already convinced, the alternative ordering puts the form first and everything else becomes reassurance placed after the commitment.",
        ],
      },
    ],

    howTo: {
      name: "How to use the wireframe planning prompt",
      steps: [
        {
          name: "Write the prior belief, not the persona",
          text: "One sentence on what the reader already thinks when they land. It changes the ordering more than any other input and it is the field people leave blank.",
        },
        {
          name: "List the obligations separately",
          text: "Regulatory notices and policy links need placing deliberately. Keep them out of the goal field so the model has to solve for them rather than around them.",
        },
        {
          name: "Read the displacement costs before the order",
          text: "Where the cost of demoting a region is low, the position was never really contested. Spend the argument on the two or three that are expensive to move.",
        },
        {
          name: "Test the cut line question",
          text: "Read the region above the line, then the one below. If the second does not answer the question the first raises, reorder before you draw anything.",
        },
        {
          name: "Draw only after the list survives",
          text: "Take the surviving order into the file as plain blocks. Any region you cannot justify from the list should not become a box.",
        },
      ],
    },

    faq: [
      {
        question: "Does the wireframe planning prompt work for app screens as well as pages?",
        answer:
          "Yes, and the cut line matters more on a small viewport because so little fits above it. Set the viewport field to the real device size rather than a design canvas width, since the difference between a 390 and a 430 point screen changes which regions make the first screen.",
      },
      {
        question: "What if the page genuinely has no fold?",
        answer:
          "Long scrolling pages still have a first screen, and the boundary question still applies. If the content is a single continuous flow such as an article, use the cut line to test whether the first screen gives a reason to continue, which is the only job it has.",
      },
      {
        question: "Should I include navigation in the region list?",
        answer:
          "Include it once, as a region, so it competes for space honestly. Teams often treat navigation as free furniture and then discover it consumed a fifth of the first screen on mobile, which the cut line count makes visible straight away.",
      },
      {
        question: "How many regions should a screen have?",
        answer:
          "Most screens that work land between five and nine. Above twelve you are usually looking at two screens that have been merged, and the displacement costs will show it: several regions will have almost no cost to demote, meaning nothing depends on their position.",
      },
      {
        question: "Can I feed it an existing page to critique instead?",
        answer:
          "You can paste the current order as the region list and ask for the cut line analysis alone, though a dedicated critique gives sharper answers. This prompt is built for the empty document, where the failure is generic ordering rather than a specific weak element.",
      },
      {
        question: "Why does it ask for an alternative ordering?",
        answer:
          "Because the same screen serves two very different readers, and the second ordering usually describes your returning users. Comparing the two shows exactly which regions are there to persuade and which are there to enable the task, which is a useful split when you later add personalisation.",
      },
      {
        question: "Does it handle multi column layouts?",
        answer:
          "It plans in one dimension deliberately. Convert to columns after the order is settled, treating a two column band as a single region with an internal reading order, since the mobile view will linearise it back into the sequence the prompt produced anyway.",
      },
    ],

    internalLinks: [
      {
        href: "/design-prompts/user-flow-prompt",
        label: "user flow prompt",
        description:
          "Works one level up, deciding which screens exist before you plan the regions inside any one of them.",
      },
      {
        href: "/design-prompts/design-critique-prompt",
        label: "design critique prompt",
        description:
          "The right tool once the region order is drawn and you need one verdict on the resulting hierarchy.",
      },
      {
        href: "/marketing-prompts/landing-page-copy-prompt",
        label: "landing page copy prompt",
        description:
          "Fills the regions once the order is settled, which is the correct sequence for a page that has to persuade.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/scrolling-and-attention/",
        label: "Nielsen Norman Group: scrolling and attention",
        description:
          "The research behind the cut line question, showing attention concentrates above the first boundary but scrolling is normal behaviour.",
      },
      {
        href: "https://web.dev/articles/optimize-lcp",
        label: "web.dev: optimise Largest Contentful Paint",
        description:
          "Ties the first viewport region to a measurable performance metric, which constrains what can honestly sit above the cut line.",
      },
      {
        href: "https://www.iso.org/standard/77520.html",
        label: "ISO 9241-210: human centred design for interactive systems",
        description:
          "The standard that grounds planning around a stated user goal and context of use rather than around page furniture.",
      },
    ],
  },
};

export default meta;
