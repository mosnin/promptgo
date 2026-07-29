import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "voicemail-script-prompt",
  name: "Voicemail Timer",
  title: "Voicemail Script Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Writes a spoken message inside a hard word budget whose only job is to get the email you are about to send opened, and counts the seconds for you.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["voicemail", "cold calling", "phone prospecting", "outbound"],

  seo: {
    primaryKeyword: "voicemail script prompt",
    keywords: [
      "voicemail script prompt",
      "cold call voicemail under twenty seconds",
      "voicemail that pairs with a follow up email",
      "how to leave a sales voicemail that gets returned",
      "ai prompt for phone prospecting scripts",
      "what not to say in a sales voicemail",
    ],
    seoTitle: "Voicemail Script Prompt: Eighteen Seconds, One Job",
    seoDescription:
      "A voicemail script prompt with a hard word budget, a spoken language check and a message built to get your follow up email opened rather than to sell.",
  },

  prompt: {
    text: `You write voicemails for salespeople. You have never written a voicemail that tries to sell anything, because you know the recipient decides whether to keep listening in about three seconds.

WHO I AM CALLING: {{PERSON}}
THE ONE REASON I AM CALLING: {{REASON}}
SUBJECT LINE OF THE EMAIL I SEND STRAIGHT AFTER: {{SUBJECT}}
MY NAME AND NUMBER: {{CALLBACK}}

First check the reason. If it is checking in, touching base, following up, or anything that would be true of a call to any company, reply only: "That reason will not survive being said out loud. Give me one thing specific to this person." and stop.

Otherwise write a script under a hard ceiling of 45 spoken words, which is roughly eighteen seconds. Obey all of these:

1. Never explain the product, the benefit or the company. The message exists to get the email opened, nothing else.
2. Say the email subject line word for word, so they can search for it.
3. Say my name once at the start and once at the end. Say the number twice at the end, written in the script as separated digits with a slash between groups to mark the pace.
4. Contractions throughout. No sentence over twelve words. No subordinate clauses. No word I would not use on a phone call to a stranger.
5. No question, since they cannot answer it, and no apology for calling.

Then give me three things: the script with a slash at each pause, the exact spoken word count and the estimated seconds, and an eight second version for when they answer the phone themselves and I have to speak immediately.`,
    variables: [
      {
        token: "PERSON",
        label: "Who you are calling",
        example: "Ravi Sekhon, warehouse operations manager at Colefield Distribution",
      },
      {
        token: "REASON",
        label: "The one specific reason",
        example: "Their job ad last week says they are hiring two people purely to key in supplier delivery notes",
      },
      {
        token: "SUBJECT",
        label: "Subject line of the email you send after",
        example: "Two hires for delivery notes",
      },
      {
        token: "CALLBACK",
        label: "Your name and number",
        example: "Marcus Bell, 07700 900412",
      },
    ],
    expectedOutput:
      "A script under 45 spoken words with pause marks, a stated word count and second estimate you can check, the subject line quoted exactly, the number written as separated digits twice, and a shorter version for a live answer.",
    followUps: [
      "Write the second voicemail for eight days later, assuming no callback and no email reply, with a different reason and no reference to the first message.",
      "Read my script back and mark every word that a person would not say out loud in a phone call to someone they do not know.",
      "Give me the two sentences I say if a colleague or a receptionist picks up instead, without asking to be put through.",
    ],
    pitfalls: [
      "The word ceiling is the first thing to get quietly broken. Count the words yourself once, and you will find models drift back to sixty when the reason is complicated.",
      "If the subject line is vague, the pairing fails silently. The recipient hears a subject they cannot find and the voicemail becomes an orphan.",
      "Reading the number at your normal speaking pace defeats the whole design. The slashes are dictation pace marks, not decoration.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "I timed thirty of these being read aloud before settling on 45 words. Both models write comfortably to a word limit but neither has any sense of how long speech takes, so asking for eighteen seconds directly produced scripts of eighty words. Giving the ceiling in words and asking for the seconds as an estimate fixed it in one revision.",
  },

  article: {
    intro: [
      "A voicemail script prompt has to fight the model's instinct to be helpful, because a helpful voicemail is a long one. Ask for a sales voicemail without constraints and you get forty five seconds of context, value proposition and a polite request for fifteen minutes, which is a message nobody has ever finished listening to.",
      "The people asking how to leave a sales voicemail that gets returned tend to look for better phrasing. The phrasing barely matters. What matters is the length, whether the message is trying to do a job it cannot do, and whether it connects to the email arriving thirty seconds later.",
      "The voicemail script prompt enforces a hard word budget, bans any attempt to sell, and requires the subject line of your follow up email to be spoken out loud so the recipient can find it.",
    ],

    sections: [
      {
        heading: "Eighteen seconds is the whole design",
        body: [
          "A cold call voicemail under twenty seconds is not a stylistic preference. Anything longer gets deleted before the end, which means the callback number you carefully recorded at the close was never heard by anyone.",
          "Since models have no feel for elapsed speech, the constraint is expressed in words. Forty five spoken words lands near eighteen seconds at a normal pace, and asking the model to report the count gives you something you can check rather than trust.",
        ],
      },
      {
        heading: "The message exists to get an email opened",
        body: [
          "Almost nobody returns a cold voicemail, and building the message around the hope that they will is what makes it long. Redefine the goal and the design changes completely. A voicemail that pairs with a follow up email has one function, which is to make an unfamiliar sender name in the inbox recognisable ten seconds later.",
          "Quoting the subject line word for word is what completes the pairing. The recipient does not have to remember your company. They search four words they just heard, find the email, and now a cold message has a voice attached to it.",
        ],
      },
      {
        heading: "Written sentences do not survive being spoken",
        body: [
          "Sales copy is full of constructions that are invisible on a page and unsayable out loud. Subordinate clauses, three part lists, any sentence where the verb arrives late. Read one of them into a phone and you hear yourself performing rather than talking.",
          "So the constraints are all about the mouth rather than the eye. Contractions, short sentences, no word you would not use to a stranger. The output looks flat written down, which is the correct appearance for something that is only ever going to be heard.",
        ],
        list: [
          "Twelve words per sentence maximum, because you run out of breath and confidence at the same point.",
          "No question. They cannot answer it, and asking one makes the silence afterwards sound like a mistake.",
          "No apology for calling. It doubles the length of the opening and invites the delete.",
          "No company description. If they have not heard of you, one clause will not fix that.",
        ],
      },
      {
        heading: "Saying the number twice, slowly",
        body: [
          "The number is the only part of the message with a practical function, and it is the part reps rush because they have reached the end and want to stop talking. Written into the script as separated digits with pause marks, it comes out at a pace someone could actually write down.",
          "Twice is not redundancy. The first pass tells the listener a number is coming and prompts them to find a pen. The second is the one they write.",
        ],
      },
      {
        heading: "What the voicemail script prompt refuses to write",
        body: [
          "The reason check runs before anything else. Checking in, touching base and following up on my email all fail it, which removes most of the voicemails currently being left in the world.",
          "That list is also a decent summary of what not to say in a sales voicemail generally. A reason that would be true of a call to any company in the sector is not a reason, and no amount of warmth in the delivery converts it into one.",
        ],
      },
    ],

    howTo: {
      name: "How to leave the message",
      steps: [
        {
          name: "Write the email first",
          text: "You need its subject line before the script exists. Keep the subject to four or five words, since you have to say it out loud and they have to search it.",
        },
        {
          name: "Read the script aloud and time it",
          text: "Use a stopwatch once. If it runs past twenty seconds at your natural pace, cut a sentence rather than speeding up.",
        },
        {
          name: "Send the email within two minutes",
          text: "The pairing depends on proximity. An email that lands the next morning is a separate message and gets treated as one.",
        },
        {
          name: "Do not leave a third one",
          text: "Two voicemails on an account is a reasonable ceiling. Beyond that the messages stop being outreach and start being a record of persistence.",
        },
      ],
    },

    faq: [
      {
        question: "Do voicemails still work at all?",
        answer:
          "On their own, rarely. Paired with an email that arrives immediately after, they measurably lift open rates for the email, which is the effect this is built around. If you judge a voicemail by callbacks you will conclude it is worthless and stop doing the thing that was helping.",
      },
      {
        question: "Is this ai prompt for phone prospecting scripts useful for live conversations too?",
        answer:
          "Partly. The eight second version it produces covers the moment someone answers unexpectedly, which is the hardest three seconds in outbound calling. A full live call needs question planning rather than a script, since the other person will talk back and a script cannot survive that.",
      },
      {
        question: "Should I mention my company name?",
        answer:
          "Once, quickly, and only because the email will come from that domain. Spending words on what the company does is the most common way the budget gets blown, and it buys nothing since a stranger cannot evaluate a one clause description of a business.",
      },
      {
        question: "What if the voicemail script prompt rejects my reason?",
        answer:
          "It is telling you the call has no premise, which is worth knowing before you dial rather than after. Go and find something specific to that account, usually a job posting, a public change, or something the person said, then run it again with that as the reason.",
      },
      {
        question: "Does the word count include the phone number?",
        answer:
          "Yes, and the number is expensive, which is why the rest has to be short. Two readings of a ten digit number consumes a meaningful share of the budget, and that trade is deliberate because the number is the only part with a job to do.",
      },
      {
        question: "Can I use the same script across a list of prospects?",
        answer:
          "The structure transfers but the reason cannot, and the reason is the only part that stops the message being generic. In practice you will reuse the shape and rewrite the first sentence per account, which takes about a minute once you have the research.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "Writes the message this voicemail is pointing at. The pairing only works if the email itself is worth opening.",
      },
      {
        href: "/sales-prompts/linkedin-outreach-prompt",
        label: "linkedin outreach prompt",
        description:
          "The third touch in the same sequence, and another format where a hard character limit does most of the editing.",
      },
      {
        href: "/writing-prompts/plain-english-prompt",
        label: "plain english prompt",
        description:
          "Useful for stripping the written constructions out of a script you wrote yourself before you record it.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.fcc.gov/general/telemarketing-and-robocalls",
        label: "FCC: Telemarketing and robocalls",
        description:
          "The authoritative statement of United States calling rules, including identification requirements and hours, which the script assumes you already comply with.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/concise/",
        label: "PlainLanguage.gov: Be concise",
        description:
          "Federal guidance on removing the constructions that make written sentences unspeakable, which is what the register constraints enforce.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the hard limit and self reported count pattern used to keep the script inside its word budget.",
      },
    ],
  },
};

export default meta;
