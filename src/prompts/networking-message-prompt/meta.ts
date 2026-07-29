import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "networking-message-prompt",
  name: "Cheap Ask",
  title: "Networking Message Prompt",
  category: "career-prompts",
  taskType: "generate",
  summary:
    "Writes three versions of a ninety word message sized by how much you are asking for, anchored to something the person actually made, each ending in a costless way to say no.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["networking", "outreach", "email", "career"],

  seo: {
    primaryKeyword: "networking message prompt",
    keywords: [
      "networking message prompt",
      "asking a stranger for fifteen minutes",
      "ai prompt for a networking email",
      "message to someone you have never met",
      "what to write instead of picking your brain",
      "cold message to an alumnus or former colleague",
    ],
    seoTitle: "Networking Message Prompt: Make The Ask Cheap To Grant",
    seoDescription:
      "A networking message prompt that anchors to something the person made, sizes the ask three ways, stays under ninety words and leaves them an easy way to decline.",
  },

  prompt: {
    text: `You write short outreach messages to people who owe me nothing and have no reason to reply.

WHO THEY ARE AND HOW I CAME ACROSS THEM: {{PERSON}}
THE SPECIFIC THING OF THEIRS I HAVE READ, WATCHED OR USED, PLUS ONE LINE ON WHAT I TOOK FROM IT: {{ARTEFACT}}
WHAT I ACTUALLY WANT, WRITTEN WITHOUT EUPHEMISM: {{WANT}}
WHAT CONNECTS US, IF ANYTHING, AND HOW WEAKLY: {{LINK}}
WHERE I AM SENDING THIS AND ANY LENGTH LIMIT: {{CHANNEL}}

Refuse first. If the artefact field contains only their job title, their employer, their seniority or a general impression of their work, return NOT ENOUGH TO SEND and name what I would have to go and read before writing to them.

Otherwise write three versions, sized by how much the ask costs them.

SMALL: one specific question they could answer from memory in two sentences.
MEDIUM: fifteen minutes on a named topic, offering two times and saying a written reply is equally useful.
LARGE: an introduction, a referral or a review of my work. Produce this only if the connection I described is a real relationship. Otherwise write LARGE: not available yet, and say what would have to happen first.

Rules for all three. Ninety words maximum. The artefact reference comes before the ask. The ask is one sentence and must be answerable without them imagining my career for me. Finish with a line that makes not replying socially free, phrased as permission rather than apology.

Banned: picking your brain, reaching out, hope this finds you well, quick chat, sync, love your work, admire your journey, any compliment about them as a person, any mention of my passion.

Then tell me which of the three to send, and why that one.`,
    variables: [
      {
        token: "PERSON",
        label: "Who they are and how you found them",
        example:
          "Anna Kowalski, runs data platform at a mid sized insurer. Found her through a conference talk listing, we have never spoken.",
      },
      {
        token: "ARTEFACT",
        label: "The specific thing of theirs and what you took from it",
        example:
          "Her talk on retiring a warehouse without a freeze. She said they ran both systems for eleven months and that the cost was political rather than technical. I had assumed the opposite.",
      },
      {
        token: "WANT",
        label: "What you actually want, no euphemism",
        example:
          "To know whether her team would have done it again, because I am about to propose the same approach and I need to know what it did to the people running it.",
      },
      {
        token: "LINK",
        label: "What connects you, and how weakly",
        example:
          "Nothing direct. We both worked at the same consultancy, four years apart, and never overlapped.",
      },
      {
        token: "CHANNEL",
        label: "Channel and any length limit",
        example: "Email, address found on her personal site, no length limit but she will read it on a phone",
      },
    ],
    expectedOutput:
      "Either a refusal naming what to go and read, or three messages under ninety words each with the artefact first and a single sentence ask, a costless exit line on each, and a recommendation of which to send.",
    followUps: [
      "She replied with two sentences. Write the follow up that does not immediately ask for more.",
      "Rewrite the medium version for a message box with a three hundred character limit and tell me what had to go.",
      "No reply after two weeks. Tell me honestly whether a second message is worth sending here, and if it is, write it.",
    ],
    pitfalls: [
      "The artefact field is where this fails. A talk they gave is not enough on its own; the line about what you took from it is what proves you were actually there.",
      "People send the large version to strangers because it is what they want. An ask that requires the recipient to vouch for you arrives as a request to take on risk for someone they cannot assess.",
      "Removing the exit line feels like removing an escape route for them. It is the opposite: without it, ignoring you is the only comfortable option available.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Cold messages fail on a ratio rather than on tone, since a medium or large ask attached to a thin reason for contact gets ignored, and sizing the ask explicitly forces that trade into view. GPT-5.2 keeps reaching out alive in the first line unless the phrase is banned by name. Claude Opus 4.5 writes better exit lines and is likelier to refuse when nothing specific can be referenced.",
  },

  article: {
    intro: [
      "A networking message prompt is not writing a letter. It is deciding how much you are allowed to ask for, given how little the recipient knows about you, and then writing the smallest version of that.",
      "Most unanswered outreach fails on that ratio rather than on wording. The message is polite, well constructed and asks a stranger for something that will cost them forty minutes and some social capital.",
    ],

    sections: [
      {
        heading: "The ask has to be cheap to grant",
        body: [
          "Every recipient performs the same silent calculation: what does this cost me, and can I do it now. A question they can answer from memory in two sentences costs almost nothing, and it gets answered at a rate that surprises people who have only ever sent meeting requests.",
          "Asking a stranger for fifteen minutes is a much bigger request than it sounds, because it is not fifteen minutes. It is finding the slot, the calendar exchange, the mild dread beforehand, and the follow up afterwards. Reframing it as a written question is often the same information at a tenth of the price.",
          "So the networking message prompt produces three versions rather than one. Seeing the small ask beside the medium one is usually enough to notice that the small one would have got you what you needed.",
        ],
      },
      {
        heading: "Name the artefact, not the person",
        body: [
          "The message has to prove you engaged with something they made. A talk, a paper, a decision they described, a tool they released. Not their career, not their title, not their general excellence.",
          "This is what to write instead of picking your brain, and it is also the honest test of whether you should be writing at all. If you cannot name one thing of theirs and one line about what you took from it, you are not writing to them specifically, you are writing to a job title that happens to have a name attached.",
          "Compliments about the person are banned for the same reason. They are unfalsifiable, they arrive by the dozen, and they signal nothing except that you found their profile.",
        ],
      },
      {
        heading: "A clean exit raises the reply rate",
        body: [
          "The last line should make ignoring you socially free. No reply needed if the timing is wrong is a real sentence that does real work, because it removes the small guilt that makes people defer a message until it is buried.",
          "It has to be permission, not apology. Sorry to bother you puts the recipient in the position of reassuring you, which is another small cost added to the pile.",
        ],
      },
      {
        heading: "The networking message prompt caps you at ninety words",
        body: [
          "Ninety words is roughly a phone screen without scrolling. It also removes the paragraph where people explain their background, which is nearly always the weakest part of a message to someone you have never met.",
          "Your history is not what earns the reply. The specific artefact reference and the cheap ask are, and everything else is competing with them for the four seconds the recipient will spend deciding.",
          "Any ai prompt for a networking email that produces three paragraphs is optimising for the sender's sense of thoroughness. The recipient is scanning for what you want and whether it is easy.",
        ],
      },
      {
        heading: "Three sizes, and when the large one is real",
        body: [
          "The large ask, an introduction or a referral, is only produced when a genuine relationship exists. Asking a stranger to vouch for you is asking them to lend their credibility to someone they cannot assess, and most people quite reasonably will not.",
          "A cold message to an alumnus or former colleague sits somewhere in between. A shared employer four years apart is a real but weak link, and weak links are exactly the ones that carry unfamiliar information, which is why they are worth using carefully rather than spending on a large ask straight away.",
        ],
      },
    ],

    howTo: {
      name: "How to use the networking message prompt",
      steps: [
        {
          name: "Consume something of theirs first",
          text: "Twenty minutes with a talk or a paper produces the one line that makes the message possible. Skipping this is what the refusal is for.",
        },
        {
          name: "Write the want without euphemism",
          text: "In the input, not in the message. Knowing that you want to be told whether to change jobs is what stops the output being vague about what it is asking.",
        },
        {
          name: "Send the small version first",
          text: "Almost always. A two sentence answer opens a thread, and the medium ask lands much better as a second message than as a first.",
        },
        {
          name: "Log what came back",
          text: "One line per reply. The next message to that person has to reference the last one specifically, and you will not remember it in four months.",
        },
      ],
    },

    faq: [
      {
        question: "How many of these messages can I reasonably send?",
        answer:
          "As many as you can genuinely prepare for, which is the real limit. Each one requires consuming something the person made, so five well aimed messages a week is a lot of work and fifty is proof that the artefact step was skipped.",
      },
      {
        question: "Does this work for job hunting directly?",
        answer:
          "Indirectly. Asking someone whether their team is hiring converts the message into an application and usually ends the conversation. Asking a specific question about their work and being memorable is slower and considerably more effective when a role does open.",
      },
      {
        question: "What if I have no artefact, only a job title?",
        answer:
          "Then you have not chosen a person, you have chosen a role. Either find something they have written or presented, or find someone else who has. The refusal is doing you a favour by making that visible before you spend the one first impression you get.",
      },
      {
        question: "Should I follow up when there is no reply?",
        answer:
          "Once, after about two weeks, and only if you can add something rather than repeat yourself. A second message that says just bumping this converts a neutral non reply into a mildly negative impression, which is a poor trade for a small chance.",
      },
      {
        question: "Is a message on a professional network better than email?",
        answer:
          "It depends on where they actually read. Senior people often have unread network inboxes and carefully managed email, while people earlier in their careers are the reverse. If their personal site lists an address, that is the answer they gave you.",
      },
      {
        question: "How honest should the want field be?",
        answer:
          "Completely, because it never appears in the message. It exists so the output aims at the right target, and a euphemistic version there produces a message that circles a request rather than making one, which readers find harder to answer.",
      },
      {
        question: "Does mentioning a shared connection help?",
        answer:
          "Yes, when it is real and stated plainly, including how weak it is. Four years apart at the same firm is enough context to be worth a line. Overstating a connection is worse than having none, since the recipient can usually check in about ten seconds.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/thank-you-note-prompt",
        label: "thank you note prompt",
        description:
          "The same short form rules applied after a conversation has already happened.",
      },
      {
        href: "/career-prompts/career-change-prompt",
        label: "career change prompt",
        description:
          "Produces the specific question worth asking a stranger, which is what makes the small ask possible.",
      },
      {
        href: "/career-prompts/linkedin-profile-prompt",
        label: "linkedin profile prompt",
        description:
          "The page a recipient checks in the ten seconds after your message arrives, which decides whether they reply.",
      },
      {
        href: "/productivity-prompts/note-summary-prompt",
        label: "note summary prompt",
        description:
          "For keeping one line on every reply, so the next message can reference the last conversation accurately.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.science.org/doi/10.1126/science.abl4476",
        label: "Science: A causal test of the strength of weak ties",
        description:
          "Large scale experimental evidence that weaker connections produce more job mobility, which is the basis for treating a distant link as worth using carefully.",
      },
      {
        href: "https://capd.mit.edu/",
        label: "MIT Career Advising and Professional Development",
        description:
          "A university careers office whose published outreach guidance supports leading with a specific question rather than a request for time.",
      },
      {
        href: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
        label: "Google: Prompting strategies",
        description:
          "Documents the multiple variant generation and constraint patterns behind producing three sized versions in a single response.",
      },
    ],
  },
};

export default meta;
