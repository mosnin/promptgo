import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "networking-outreach-prompt",
  name: "Named Reason Only",
  title: "Networking Outreach Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Checks whether the reason for contact is a real, checkable specific before writing a word, and switches to an honest direct message rather than inventing a connection when it isn't.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["networking", "outreach", "email", "career"],

  seo: {
    primaryKeyword: "networking outreach prompt",
    keywords: [
      "networking outreach prompt",
      "how to write a networking outreach message",
      "chatgpt prompt for networking outreach",
      "networking outreach prompt for a cold contact",
      "how to reach out to someone you don't know well",
      "informational interview outreach message example",
    ],
    seoTitle: "Networking Outreach Prompt: No Invented Connections",
    seoDescription:
      "A networking outreach prompt that checks whether your reason for contact is real, and writes an honest direct message instead of a fake one when it isn't.",
  },

  prompt: {
    text: `You write professional networking outreach messages, and you never invent a personal connection that is not actually there.

WHO I AM REACHING OUT TO, BRIEFLY: {{RECIPIENT_CONTEXT}}
THE ACTUAL REASON I AM CONTACTING THEM: {{CONNECTION_REASON}}
WHAT I WANT FROM THIS: {{ASK}}
BRIEF, RELEVANT BACKGROUND ON ME: {{SENDER_BACKGROUND}}
TONE: {{TONE}}

First, judge CONNECTION_REASON. It only counts as specific if it names a real shared connection by name, a shared event or program with a detail that could be checked, such as a date or a session title, or a particular piece of the recipient's work with something concrete you took from it. A general sense of admiration, a shared industry, or "I would like to network with them" does not qualify, however it is phrased.

If CONNECTION_REASON is specific, write in SPECIFIC mode. Open with the connection stated plainly in one sentence, state the ask in one sentence, use SENDER_BACKGROUND only where it is directly relevant to the ask, and close with a line that makes declining easy.

If CONNECTION_REASON is vague, do not invent a shared event, a mutual acquaintance, or a specific sounding detail to manufacture warmth. Write in DIRECT mode instead: say plainly that you have not met and are reaching out cold, state the ask honestly, and do not pretend a familiarity that is not there.

Keep the message under 130 words in either mode. Banned in both: "I've been following your work", "I know we haven't officially met, but", "small world", "I feel like I already know you", "I know you're busy but", and any sentence that only makes sense if the connection were closer than it is. After the message, state in one line which mode was used and why.`,
    variables: [
      {
        token: "RECIPIENT_CONTEXT",
        label: "Who they are and their role, briefly",
        example:
          "Director of Product at a mid-size fintech, previously led growth teams at two earlier stage startups",
      },
      {
        token: "CONNECTION_REASON",
        label: "The actual, specific reason for reaching out",
        example:
          "We were both speakers at the 2026 DevOps Summit. I was on the stage right after her talk on pricing experiments and referenced her framework in my own session.",
      },
      {
        token: "ASK",
        label: "What you actually want",
        example: "A 20 minute call to ask how she structured her first pricing team, nothing more concrete yet",
      },
      {
        token: "SENDER_BACKGROUND",
        label: "Brief, relevant background on you",
        example: "Senior product manager at a 40 person B2B SaaS company, two years into a first pricing project",
      },
      {
        token: "TONE",
        label: "How the message should sound",
        example: "Warm but brief, no flattery",
      },
    ],
    expectedOutput:
      "One message under 130 words, either in SPECIFIC mode opening with the stated connection, or in DIRECT mode saying plainly that you have not met, followed by a single line naming which mode was used and why.",
    followUps: [
      "CONNECTION_REASON is only 'we're in the same industry and I liked her podcast episode'. Confirm which mode that triggers and write the message.",
      "She replied to the DIRECT mode message with one line. Write the follow up without apologising for the cold open.",
      "Rewrite the SPECIFIC mode version for a 300 character connection request field and tell me what had to be cut.",
    ],
    pitfalls: [
      "Writing the connection reason as 'we have mutual friends' without naming one defeats the check, since a model told to be specific will often still accept a phrase that only sounds specific.",
      "DIRECT mode messages get shortened until they read as apologetic. Cutting the honesty line to save words removes the exact sentence that makes a cold message trustworthy instead of presumptuous.",
      "Padding SENDER_BACKGROUND with unrelated achievements turns a short message into a pitch about the sender, which is the opposite of what the recipient opened it to read.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "A model asked to write networking outreach without a real reason for contact will frequently invent one anyway, a shared city, a plausible sounding mutual contact, a conference that was never attended, because a warm opener reads as better writing than a bare one. Gating the message on whether the stated reason is checkable, and writing an honest direct version when it is not, is what stops invented familiarity from being presented as a genuine link between two people who have never met.",
  },

  article: {
    intro: [
      "A networking outreach prompt earns its place only when it refuses to invent a reason for contact that is not real, because a fabricated connection is the fastest way to lose the exact trust the message is trying to build. Most tools asked to write outreach will manufacture warmth from nothing, a shared city, a plausible mutual friend, an event that was never attended, because it makes the draft read better.",
      "This one checks the stated reason first. If it names something real and specific, the message opens with it plainly. If it does not, the message says so honestly instead of pretending otherwise, and states the ask on its own merits.",
    ],

    sections: [
      {
        heading: "What a networking outreach prompt should require before it writes anything",
        body: [
          "The check happens before a single sentence of the message exists. CONNECTION_REASON has to name something checkable: a person by name, an event with a date or a session title, or a specific detail from the recipient's own work. A feeling does not pass this test, no matter how sincerely it is held.",
          "This matters because a recipient can usually tell the difference between a named reason and a vague one within a sentence or two, and a networking outreach prompt that cannot tell them apart will confidently produce the wrong message for both cases.",
        ],
      },
      {
        heading: "How to write a networking outreach message that isn't a form letter",
        body: [
          "Knowing how to write a networking outreach message starts with separating the reason for contact from the ask, since conflating the two is what makes most first messages read as a form letter with a name inserted at the top. The reason comes first because it answers the recipient's actual question, which is why me, before they read what you want.",
          "How to reach out to someone you don't know well is really a question about which mode applies, not about finding warmer adjectives. A DIRECT mode message, written plainly, often reads as more respectful than a SPECIFIC mode message stretched over a connection that barely exists.",
        ],
      },
      {
        heading: "Why the prompt won't invent a shared connection",
        body: [
          "Producing a networking outreach message without a fake connection means accepting that some messages will read as more distant than a warmer draft could have made them, and sending the honest version anyway. The alternative, a confident sounding opener built on a detail that isn't true, works exactly until the recipient checks it, which takes them about as long as it took to write.",
          "DIRECT mode exists for exactly this case. It states plainly that the sender and recipient have not met, gives the ask without padding, and never borrows the tone of a message that assumes familiarity it hasn't earned. Used as a networking outreach prompt for a cold contact, DIRECT mode is not a fallback to apologise for, it is the accurate output for an input that had nothing specific in it.",
        ],
      },
      {
        heading: "Naming the ask separately from the reason",
        body: [
          "ASK should be written as plainly as CONNECTION_REASON. An informational interview outreach message example is the clearest case for SPECIFIC mode, because the ask is small enough that a genuinely stated reason for contact is usually all the recipient needs in order to say yes.",
          "A larger ask, an introduction or a direct referral, is harder to justify in DIRECT mode, since it asks a stranger to extend trust they have no basis for. The prompt will still write it, but the honesty of DIRECT mode makes the size of that ask visible rather than dressed up.",
        ],
      },
      {
        heading: "Sender background is context, not a pitch",
        body: [
          "SENDER_BACKGROUND exists to make the ask make sense, not to make the sender impressive. A line about being two years into a first pricing project explains why the question about building a pricing team matters; a paragraph of unrelated career highlights just adds length the recipient has to read before reaching the actual request.",
        ],
      },
      {
        heading: "Tone changes the words, not the honesty",
        body: [
          "Used as a chatgpt prompt for networking outreach, TONE controls register only, brief and direct, or warmer and more conversational, and never reopens the question of whether the connection reason was real. A friendlier tone applied to a fabricated connection is still a fabricated connection, only better written.",
        ],
      },
    ],

    howTo: {
      name: "How to use the networking outreach prompt",
      steps: [
        {
          name: "Write the actual reason before opening the prompt",
          text: "Name the person, the event, or the specific piece of work, with one concrete detail attached. If nothing concrete comes to mind, that is the honest answer, not a gap to paper over.",
        },
        {
          name: "Separate the ask from the reason",
          text: "Decide what you actually want, an answer, a call, an introduction, or nothing concrete yet, before the prompt runs. A vague ask produces a vague message regardless of how strong the connection is.",
        },
        {
          name: "Let DIRECT mode run without editing it warmer",
          text: "If the check returns DIRECT mode, that is the accurate read of the input given. Adding a fabricated detail afterward defeats the entire point of running the check first.",
        },
        {
          name: "Read the mode line before sending",
          text: "The closing line names which mode was used and why. If it does not match what you intended, the input was ambiguous, and the fix is tightening CONNECTION_REASON, not the output.",
        },
      ],
    },

    faq: [
      {
        question: "What makes a networking outreach prompt different from a form letter generator?",
        answer:
          "A form letter generator writes the same structure regardless of input and lets flattering language stand in for a real reason. This one checks whether the stated reason is specific and checkable first, and changes the entire opening of the message depending on the answer, rather than dressing up a generic request.",
      },
      {
        question: "What if my only reason is that I admire their work?",
        answer:
          "That triggers DIRECT mode, because admiration on its own cannot be checked against anything and reads the same from a hundred senders. The prompt will not invent a shared event or acquaintance to disguise it. It writes an honest cold message instead, which is a better outcome than a warm sounding one built on nothing.",
      },
      {
        question: "Does DIRECT mode mean the message is more likely to be ignored?",
        answer:
          "Sometimes, and that is a fair trade against the alternative. A fabricated connection that gets checked and found false costs more than a plainly honest message that gets no reply, because the first damages how the next message from the same sender is read.",
      },
      {
        question: "Can I use this to ask for a job referral?",
        answer:
          "Yes, with ASK set to the referral directly. In DIRECT mode the prompt will still write the request, but a referral asked of a stranger with no stated connection is a large ask made honestly rather than a small one dressed up, and the message reflects that.",
      },
      {
        question: "How long should the finished message actually be?",
        answer:
          "Under 130 words in either mode, which is short enough to read in full on a phone without scrolling. Length beyond that is almost always sender background or preamble that the recipient has to get through before finding out what you want.",
      },
      {
        question: "Is this the same as a LinkedIn outreach prompt for sales?",
        answer:
          "No. A sales outreach message is built around a signal that supports a pitch to a stranger the sender wants as a customer. This one is built around a genuine reason for career contact and refuses to fake one, which is a different check applied to a different kind of message.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/thank-you-note-prompt",
        label: "thank you note prompt",
        description:
          "The message written once a conversation has actually happened, using the same refusal to invent detail that isn't there.",
      },
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description:
          "The page a recipient checks in the seconds after an outreach message arrives, which shapes whether the reason for contact lands.",
      },
      {
        href: "/sales-prompts/linkedin-outreach-prompt",
        label: "linkedin outreach prompt",
        description:
          "The equivalent message built around a sales signal rather than a career reason, for outbound prospecting instead of networking.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "Applies a similar research first discipline to a sales email, useful when the outreach channel is email rather than a professional network.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2016/05/learn-to-love-networking",
        label: "Harvard Business Review: Learn to Love Networking",
        description:
          "Research on why networking that feels inauthentic backfires, the basis for treating a genuine stated reason as the thing that makes contact welcome rather than intrusive.",
      },
      {
        href: "https://careerservices.fas.harvard.edu/channels/expand-your-network/",
        label: "Harvard Mignone Center for Career Success: networking guidance",
        description:
          "A university career office's published guidance on making professional connections, supporting the case for a stated, checkable reason for contact.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the conditional branching pattern behind checking an input before choosing between the two response modes.",
      },
      {
        href: "https://www.nngroup.com/articles/personalization/",
        label: "Nielsen Norman Group: Successful personalization",
        description:
          "Usability research on why personalization that isn't backed by real data erodes trust, the same failure mode a fabricated connection produces in a message.",
      },
    ],
  },
};

export default meta;
