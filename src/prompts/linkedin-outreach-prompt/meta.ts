import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "linkedin-outreach-prompt",
  name: "Connection Writer",
  title: "LinkedIn Outreach Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Writes connection notes and first messages short enough to read in the notification, with nothing that sounds like a template.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["linkedin", "social selling", "outreach", "prospecting"],

  seo: {
    primaryKeyword: "linkedin outreach prompt",
    keywords: [
      "linkedin outreach prompt",
      "how to write a connection request that gets accepted",
      "ai prompt for social selling messages",
      "linkedin outreach message examples",
      "what to say in a first linkedin message",
      "how to personalise a linkedin message",
    ],
    seoTitle: "LinkedIn Outreach Prompt: Short Notes People Accept",
    seoDescription:
      "A LinkedIn outreach prompt that fits the connection note limit, builds on something the person actually posted, and never pitches in message one.",
  },

  prompt: {
    text: `You are writing LinkedIn outreach for someone who does not want to sound like an automation tool. You understand that the connection note has a hard character limit and that the first message after acceptance is a separate decision.

WHO THEY ARE: {{PERSON}}
SOMETHING THEY POSTED, SAID OR PUBLISHED: {{SIGNAL}}
WHY I AM REACHING OUT, HONESTLY: {{REASON}}
WHAT I WANT EVENTUALLY: {{GOAL}}

If the signal field contains only their job title, their company, or the fact that they exist, STOP and reply: "There is no signal here. Find something they posted, commented on, or published, or send nothing." Do not write a message.

Produce three things.

1. THE CONNECTION NOTE. Under 280 characters including spaces. It must reference the signal specifically, must not mention what you sell, and must not ask for anything. Give the character count. If a note would be weaker than no note, say so, because an empty request sometimes outperforms a bad one.

2. THE FIRST MESSAGE AFTER ACCEPTANCE. Under 60 words. This is not a pitch. It continues the thought from the connection note or reacts to something else they have done. It may contain at most one question, and that question must be about them.

3. THE MESSAGE THAT COMES LATER. Only after they have replied at least once. This is where the reason for contact can appear, stated plainly and briefly, with an easy way to say no.

Banned in all three: "I came across your profile", "I would love to pick your brain", "quick question", "hope you are well", "as a fellow", any compliment about their career trajectory, and any sentence a tool could generate from a job title alone.

Finally, state honestly whether this person is worth contacting at all based on the signal given.`,
    variables: [
      {
        token: "PERSON",
        label: "Who they are",
        example: "Head of Operations at a 60 person medical devices manufacturer",
      },
      {
        token: "SIGNAL",
        label: "Something they actually posted or said",
        example:
          "Last week she posted about scrapping a supplier scorecard project because nobody would maintain the spreadsheet",
      },
      {
        token: "REASON",
        label: "Why you are reaching out, honestly",
        example: "We sell supplier management software and she just described the exact failure we fix",
      },
      {
        token: "GOAL",
        label: "What you want eventually",
        example: "A twenty minute call in the next month",
      },
    ],
    expectedOutput:
      "A connection note under 280 characters with the count shown, a first message under 60 words containing at most one question about them, a later message where the reason finally appears, and an honest verdict on whether this person is worth contacting.",
    followUps: [
      "She accepted but did not reply to message one. Write the follow up that adds something rather than asking if she saw it.",
      "Rewrite all three assuming my only signal is a comment she left on someone else's post.",
      "I have twelve prospects with the same job title and no individual signals. Tell me what to do instead of sending twelve of these.",
    ],
    pitfalls: [
      "The stop condition fires often, and it is right. A job title is not a signal, and outreach built on one is the exact thing recipients have learned to ignore.",
      "Character counts from a model are approximate. Paste the note into the field and check it before sending, since truncation mid sentence is worse than a shorter note.",
      "Sending message three too early is the most common failure. If they have not replied once, the reason for contact has not been earned yet.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Requested as a single task, LinkedIn outreach comes back as a connection note with a pitch inside it, which is the fastest route to being ignored or reported. Splitting the output into three separately gated messages is the structural fix. The verdict line at the end matters because a model will say a prospect is not worth contacting, and that answer is often correct.",
  },

  article: {
    intro: [
      "A LinkedIn outreach prompt that writes one message has misunderstood the channel. There are three separate moments, each with different constraints: the connection note, the message after acceptance, and the message where you finally say what you want. Collapsing them into a single pitch is why most of this outreach fails.",
      "This one writes all three and gates them. It also refuses to write anything at all when the only thing you know about the person is their job title, which is the condition most automated outreach operates under.",
    ],

    sections: [
      {
        heading: "Three moments, three different jobs",
        body: [
          "Anyone asking how to write a connection request that gets accepted is really asking about the first of these. The connection note is read inside a notification, alongside a decision about whether to accept. It has one job, which is to be a reason to accept, and mentioning what you sell converts it into a reason to decline. The message after acceptance is read by someone who has already given you a small amount of attention and is deciding whether that was a mistake.",
          "Only the third message can carry the reason you made contact, and only after they have replied once. That reply is the point at which a conversation exists, and stating your purpose inside a conversation is normal behaviour rather than an intrusion. What to say in a first linkedin message is therefore almost always less than people think.",
        ],
      },
      {
        heading: "Why a job title is not a signal",
        body: [
          "The stop condition exists because outreach built on a title is indistinguishable from outreach generated in bulk, and recipients have calibrated on exactly that. A message that could have been sent to four hundred people with the same title gets treated as though it was.",
          "A real signal is something the person chose to put into the world: a post, a comment, a talk, an article, a job they posted. How to personalise a linkedin message has one answer, which is to reference what someone posted, because that is evidence of attention which could not have been faked at scale, and that evidence is the entire value of the channel over email.",
        ],
        list: [
          "A post describing a problem: the strongest signal available, because they named it themselves.",
          "A comment on someone else's post: weaker but usable, and less contested since fewer people watch comments.",
          "Something they published or presented: good, though often older and less urgent.",
          "A job posting from their team: indirect, but a reliable indicator of what they are spending money to fix.",
        ],
      },
      {
        heading: "The character limit is a feature",
        body: [
          "The connection note limit forces the note to do one thing. Within that space there is room to reference what they said and react to it honestly, and no room for a company introduction, which is the correct allocation.",
          "The prompt reports the character count and will tell you when a note would be weaker than no note at all. Empty connection requests are accepted at a reasonable rate from plausible profiles, and a bad note actively reduces that rate, so the option to send nothing is genuinely on the table rather than a failure state.",
        ],
      },
      {
        heading: "What makes the linkedin outreach prompt output sound human",
        body: [
          "Most output from an ai prompt for social selling messages fails on phrasing rather than on strategy. The banned phrase list covers the constructions that signal automation, and each ban is specific rather than a general instruction to sound natural. Coming across a profile, picking a brain, hoping someone is well: these are not merely tired, they are the exact phrases people associate with bulk sending.",
          "The deeper rule is the one banning any sentence a tool could generate from a job title alone. That is the real test, and applying it removes most of what would otherwise survive. The linkedin outreach message examples that work are the ones that could only have been written about that specific person.",
        ],
      },
      {
        heading: "The verdict line",
        body: [
          "The final output states whether the person is worth contacting given the signal supplied. This exists because outreach volume is easy to increase and outreach quality is not, so a tool that always produces a message quietly encourages the wrong behaviour.",
          "In practice it declines more often than people expect, usually when the signal is real but unrelated to anything you could help with. Accepting that verdict costs one prospect and protects the channel, which is worth considerably more than the individual message.",
        ],
      },
    ],

    howTo: {
      name: "How to use the linkedin outreach prompt",
      steps: [
        {
          name: "Find the signal before anything else",
          text: "Read their recent activity, not their profile. If nothing there is usable, the honest answer is to move to a different prospect.",
        },
        {
          name: "Send the note and then wait",
          text: "Do not queue message two to send on acceptance. Acceptance is not a reply, and immediate follow up reads as an automation firing.",
        },
        {
          name: "Hold message three until they respond",
          text: "One genuine reply is the gate. Sending your reason before that converts a new connection into someone who regrets accepting.",
        },
        {
          name: "Check the character count yourself",
          text: "Paste the note into the field before sending. Model character counts are close but not exact, and truncation mid sentence undoes the work.",
        },
      ],
    },

    faq: [
      {
        question: "Should I send a connection note at all?",
        answer:
          "Only when you have a real signal to reference. With one, a note materially improves acceptance. Without one, an empty request from a credible profile usually performs better than a generic note, which is why the prompt is allowed to recommend sending nothing.",
      },
      {
        question: "How many of these can I send per week?",
        answer:
          "As many as you can find genuine signals for, which for most people is a handful per day rather than dozens. The research is the bottleneck by design, and volume beyond it means sending messages the stop condition would have blocked.",
      },
      {
        question: "Does the linkedin outreach prompt work for recruiting?",
        answer:
          "Yes, with the reason field changed. The three message structure holds, and the signal requirement matters more if anything, since candidates receive far more untargeted approaches than buyers do and screen them faster.",
      },
      {
        question: "What if they accept and never reply?",
        answer:
          "Then you have a connection and no conversation, which is an acceptable outcome. Use the follow up prompt to add something genuinely useful once, and if that draws nothing, stop rather than escalating to the message you wanted to send originally.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "The same research first discipline in a channel with more room, and the better choice when the signal is substantial.",
      },
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "For the accepted connection who never replied, where the next message has to add rather than remind.",
      },
      {
        href: "/sales-prompts/account-research-prompt",
        label: "account research prompt",
        description:
          "Finds the signals this prompt requires, and tells you when an account has none worth acting on.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "Helps decide which signals actually indicate a problem you solve, rather than which are merely interesting.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the conditional refusal pattern that makes the missing signal check hold rather than being written around.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
        label: "FTC: Endorsement and disclosure guidance",
        description:
          "Relevant wherever outreach involves an incentive or an undisclosed commercial relationship, which the third message often introduces.",
      },
      {
        href: "https://www.science.org/doi/10.1126/science.1238411",
        label: "Science: Research on reciprocity and request framing",
        description:
          "The evidence that a request with no attached ask produces more voluntary engagement, which is why the first two messages ask for nothing.",
      },
    ],
  },
};

export default meta;
