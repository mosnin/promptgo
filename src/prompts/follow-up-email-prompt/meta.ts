import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "follow-up-email-prompt",
  name: "Follow Up Writer",
  title: "Follow Up Email Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Writes a follow up that adds something new instead of asking whether they saw the last one, and knows when to send the closing message.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["follow up", "email", "nurture", "pipeline"],

  seo: {
    primaryKeyword: "follow up email prompt",
    keywords: [
      "follow up email prompt",
      "how to follow up without being annoying",
      "ai prompt for sales follow up sequence",
      "what to write when a prospect goes quiet",
      "breakup email template for sales",
      "second touch email that adds value",
    ],
    seoTitle: "Follow Up Email Prompt: Write Ones Worth Opening",
    seoDescription:
      "A follow up email prompt that bans checking in and bumping this up. Each message must add something new, and it tells you when to send the last one.",
  },

  prompt: {
    text: `You are writing follow up emails for a salesperson. Your one rule: every message must give the recipient something they did not have before. A message whose only content is that time has passed is forbidden.

WHAT HAPPENED LAST: {{LAST_CONTACT}}
HOW LONG AGO: {{ELAPSED}}
WHAT I KNOW ABOUT THEIR SITUATION: {{CONTEXT}}
WHICH TOUCH THIS IS: {{TOUCH_NUMBER}}

Write the message under these constraints:

1. Under 70 words. Follow ups are shorter than first messages, not longer.
2. Banned openings, no exceptions: "just checking in", "just following up", "bumping this to the top of your inbox", "circling back", "wanted to see if", "I hope you had a good weekend".
3. The message must contain exactly one new thing: a relevant example from a similar company, a specific observation about their situation, a resource that helps them whether or not they buy, or a genuinely new question. Name which of these you used.
4. Do not ask if they saw the previous email. Assume they did and were not interested enough to reply, because that is almost always what happened.
5. No guilt, no false urgency, no invented deadline.
6. If this is touch four or later, write the closing message instead: state plainly that you will stop reaching out, leave the door open without conditions, and ask nothing. It must not be passive aggressive and must not be a final pitch in disguise.

Return the subject line, the message, and one line naming what new thing you added.`,
    variables: [
      {
        token: "LAST_CONTACT",
        label: "What happened last time",
        example: "Sent pricing after a good demo, she said she would discuss it with her director",
      },
      {
        token: "ELAPSED",
        label: "How long since then",
        example: "11 days, no reply",
      },
      {
        token: "CONTEXT",
        label: "What you know about their situation",
        example:
          "Mid sized retailer, their busy season starts in six weeks, the director owns the budget and has not been on any call",
      },
      {
        token: "TOUCH_NUMBER",
        label: "Which follow up this is",
        example: "Second follow up since pricing",
      },
    ],
    expectedOutput:
      "A subject line, a message under 70 words containing exactly one new and specific thing, and a line naming which kind of new thing it was so you can check it is not just a rephrased reminder.",
    followUps: [
      "Write the version of this that goes to the director who has never spoken to me, not to my original contact.",
      "It is now touch four with no reply. Write the closing message and make sure it asks for nothing.",
      "Give me three alternative new things I could have added instead, ranked by how much they help the prospect regardless of whether they buy.",
    ],
    pitfalls: [
      "If the context field is thin, the one new thing degrades into a generic industry statistic, which reads worse than a short honest nudge. Give it real detail or accept a shorter message.",
      "Models sometimes satisfy the new information rule with a fabricated case study. Check any named company or figure before sending; if it invented one, ask for an observation instead.",
      "The closing message works because it genuinely asks for nothing. Adding one small request at the end destroys the effect and reads as manipulation.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Banning the stock openings was not enough on its own. All three models simply invented new ways to say the same empty thing, including one that opened by observing that inboxes get busy at this time of year. The rule that forced improvement was requiring the model to name which category of new information it had added, because a fabricated reminder cannot be labelled as an example or a resource without the gap becoming obvious.",
  },

  article: {
    intro: [
      "A follow up email prompt is easy to write badly, because the obvious instruction is to remind someone about the previous message and that is exactly the message nobody replies to. The prospect knows they did not respond. Telling them so adds nothing and signals that you had no other reason to write.",
      "This one forbids that category of message outright. Every follow up it produces has to carry one specific new thing, and the model has to name which kind it used, which makes an empty message impossible to dress up. It also handles the part most sequences get wrong, which is stopping.",
    ],

    sections: [
      {
        heading: "The empty follow up and why it persists",
        body: [
          "Checking in survives because it feels polite and costs nothing to write. From the recipient's side it reads as a request for attention with no offer attached, arriving from someone whose last message they already decided against. That is a worse position than not writing at all, because it converts a soft no into an irritated one.",
          "The alternative is not more persistence, it is a different payload. If the message contains something useful, the fact that it is a follow up becomes incidental, and the question of how to follow up without being annoying mostly answers itself.",
        ],
      },
      {
        heading: "Four things that count as new",
        body: [
          "The prompt accepts exactly four categories, and the narrowness is deliberate. Left open, a model will classify a rephrased reminder as new information and the constraint collapses.",
        ],
        list: [
          "A relevant example: what a comparable company did about the same problem, specific enough to be checkable.",
          "An observation about their situation: something you noticed since you last wrote, tied to their timeline or their market.",
          "A resource that helps regardless: something they can use whether or not they ever buy from you.",
          "A genuinely new question: one you have not asked, prompted by something that changed rather than by the silence.",
        ],
      },
      {
        heading: "Assume they saw it and were not interested",
        body: [
          "The instruction to assume the previous email was read and ignored is the one most people resist, because the hopeful reading is that it got buried. Occasionally it did. Writing as though it did produces a message about your email rather than about their problem, which wastes the second attempt on administrative content.",
          "Assuming disinterest forces a different move: give them a reason to reconsider rather than a reason to look again. Working out what to write when a prospect goes quiet is easier once you accept that silence is information, not an accident.",
        ],
      },
      {
        heading: "Knowing when the follow up email prompt should stop",
        body: [
          "Most sequences have no ending, so reps either give up quietly or keep going until the prospect blocks them. Neither leaves anything behind. This prompt switches behaviour at touch four and writes a closing message instead of another attempt.",
          "The closing message asks for nothing. It states that you will stop, leaves the door open with no conditions attached, and does not repeat the pitch. In practice it draws more replies than the two messages before it, which people often read as a clever tactic. It is not a tactic, and treating it as one ruins it, because the reason it works is that the pressure genuinely comes off. Any breakup email template for sales that hides a final ask inside the goodbye gets read as exactly that.",
        ],
      },
      {
        heading: "Sequencing across touches",
        body: [
          "Each message needs a different kind of new thing, which is the point of passing the touch number in. A second touch email that adds value with an example, followed by a third that offers a resource, reads as sustained interest. Two examples in a row reads as a template with the variables swapped.",
          "Spacing matters less than variety but is still worth planning. Roughly a week between the first and second, two weeks before the third, then the closing message when the gap stops feeling reasonable. If an ai prompt for sales follow up sequence tells you to send five messages in nine days, it is optimising for activity rather than replies.",
        ],
      },
    ],

    howTo: {
      name: "How to use the follow up email prompt",
      steps: [
        {
          name: "Record what actually happened last",
          text: "Write the specific state of play, not the fact that you emailed. What was discussed, what they said they would do, and what has not happened since.",
        },
        {
          name: "Set the touch number honestly",
          text: "Count every attempt, not only the ones you consider substantial. The switch to a closing message at touch four only helps if the counter is accurate.",
        },
        {
          name: "Check what it claims is new",
          text: "Read the line naming the new thing and verify it. If it cited a company or a number, confirm it exists before sending.",
        },
        {
          name: "Send the closing message when it tells you to",
          text: "The temptation is one more attempt. Resist it. The closing message gets a better response than the extra touch and costs nothing if it does not.",
        },
      ],
    },

    faq: [
      {
        question: "How many follow ups should a sequence actually have?",
        answer:
          "Three attempts and a closing message covers almost every situation worth pursuing. Beyond that the reply rate does not justify the reputational cost, and a prospect who ignored four messages is telling you something clear enough that a fifth is not a strategy.",
      },
      {
        question: "Why does the follow up email prompt refuse to reference the previous email?",
        answer:
          "Because it spends the opening on administration. The recipient knows a previous message exists, and reminding them frames the exchange around your effort rather than their problem. Removing the reference forces the first sentence to carry something they might actually want.",
      },
      {
        question: "Does the closing message really get replies?",
        answer:
          "Often, yes, and the reason is that it removes the obligation to respond rather than increasing it. That also means it stops working the moment it becomes a tactic with a hidden ask attached, so write it meaning it and accept the silences where it does not land.",
      },
      {
        question: "What if I genuinely have nothing new to say?",
        answer:
          "Then do not send anything yet. That is a real answer rather than a dodge. Wait for something to change in their world, or spend twenty minutes finding a resource that helps them, which is usually faster than composing a message that admits it has no content.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "The first touch. A follow up can only add to a message that had a specific reason for existing in the first place.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "When the silence follows a stated concern rather than a proposal, diagnose the concern before writing anything.",
      },
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "Prospects go quiet most often when the problem was never established. This plans the conversation that prevents it.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "For the resource category of follow up, where the useful thing you send is a piece of content rather than a note.",
      },
    ],

    externalLinks: [
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Primary documentation for negative constraints and self labelling output, the two techniques that make the banned openings rule hold.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide",
        description:
          "Sets out the opt out and identification duties that apply to every message in a sequence, not only the first one.",
      },
      {
        href: "https://www.science.org/doi/10.1126/science.1238411",
        label: "Science: Research on reciprocity and request framing",
        description:
          "The underlying evidence that an offer with no attached request produces more voluntary response than a direct ask.",
      },
    ],
  },
};

export default meta;
