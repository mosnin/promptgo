import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "cold-email-prompt",
  name: "Cold Email Writer",
  title: "Cold Email Prompt",
  category: "sales-prompts",
  taskType: "generate",
  summary:
    "Turns one specific, checkable observation about a prospect into a short cold email that earns a reply instead of a delete.",
  updated: "2026-07-29",
  published: "2026-07-29",
  featured: true,
  tags: ["cold email", "outbound", "prospecting", "sales email", "outreach"],

  seo: {
    primaryKeyword: "cold email prompt",
    keywords: [
      "cold email prompt",
      "chatgpt prompt for cold outreach",
      "cold email prompt for b2b sales",
      "how to write a cold email with ai",
      "personalised cold email without templates",
      "ai cold email that gets a reply",
    ],
    seoTitle: "Cold Email Prompt: Write Openers That Get Replies",
    seoDescription:
      "A cold email prompt that forces real research before a single line of copy. Refuses to write from a company name alone. Tested on GPT-5.2 and Claude Opus 4.5.",
  },

  prompt: {
    text: `You are an experienced B2B salesperson who writes short, specific cold emails. You are not a copywriter and you do not write marketing prose.

Before writing anything, check the research input below. If it contains only the company name, the industry, or a generic fact that would be true of any competitor, STOP and reply exactly: "This is not enough to personalise. Give me one specific, recent, checkable thing about this prospect." Do not write an email in that case.

PROSPECT: {{PROSPECT}}
RESEARCH: {{RESEARCH}}
WHAT WE DO: {{OFFER}}
THE ONE ACTION I WANT: {{CALL_TO_ACTION}}

If the research passes the check, write the email under these constraints:

1. Under 90 words total, excluding the signature.
2. The first sentence refers to the specific research finding, in plain language, without flattery. Never open with "I hope this finds you well", "I came across your profile", or any compliment.
3. The second and third sentences connect that finding to a problem the prospect plausibly has, then state what we do in one sentence, concretely, with no adjectives.
4. Close with the single call to action given above, phrased as a low commitment question, not a calendar link demand.
5. Sixth grade reading level. No words a person would not say out loud on a phone call.
6. Do not invent any fact, metric, mutual connection or trigger event that is not in the research input.

Return exactly three things: a subject line under 6 words that is not a question, the email body, and one sentence explaining which research detail you built the opener on.`,
    variables: [
      {
        token: "PROSPECT",
        label: "Who you are writing to",
        example: "Dana Okafor, VP Engineering at Northwind Logistics, 400 person freight company",
      },
      {
        token: "RESEARCH",
        label: "One specific, checkable finding",
        example:
          "In a conference talk three weeks ago she said their overnight route optimisation job takes 6 hours and blocks the morning dispatch team",
      },
      {
        token: "OFFER",
        label: "What you actually do",
        example: "We cut long running batch jobs down by rewriting the slowest queries, usually 3 to 10x faster",
      },
      {
        token: "CALL_TO_ACTION",
        label: "The one action you want",
        example: "Ask whether the 6 hour window is still the bottleneck",
      },
    ],
    expectedOutput:
      "A subject line of five words or fewer, a body under 90 words whose first sentence names your specific research finding, and a one line note telling you which detail the opener was built on so you can verify it is true before sending.",
    followUps: [
      "Rewrite the opener three more ways, each built on a different angle of the same research finding, so I can pick rather than accept the first draft.",
      "Now write the two message follow up sequence, assuming no reply. Neither message may repeat the original pitch or say 'just bumping this'.",
      "Play the prospect. You are busy and sceptical. Tell me the single sentence in this email that would make you delete it.",
    ],
    pitfalls: [
      "If you paste a company description as the research input, the guard clause fires and it refuses to write. That is deliberate. A description is not a trigger event.",
      "Models will still slip an adjective into the offer sentence. Delete 'powerful', 'seamless' and 'innovative' on sight; the constraint catches most but not all.",
      "The reading level rule occasionally flattens a technical term the prospect actually uses daily. Put jargon the prospect uses back in, it signals you speak their language.",
    ],
  },

  eeat: {
    author: "Marcus Bell",
    authorCredential:
      "Fifteen years in B2B outbound, most recently running a six person SDR team selling infrastructure software.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "The first version had no guard clause and cheerfully wrote an email from nothing but a company name, which is exactly the output that gets a domain marked as spam. Adding the explicit refusal instruction fixed it on all three models, though Gemini needed the word STOP in capitals before it would reliably decline rather than apologise and write the email anyway.",
  },

  article: {
    intro: [
      "A cold email prompt is only as good as the research you feed it, and almost every one you will find online ignores that completely. They take a company name, slot it into a template, and produce the message your prospect has already deleted four times this week. This one refuses to do that: if the research input is generic, it stops and asks for something real before writing a word.",
      "That refusal is the entire mechanism, and it is the part most guides on how to write a cold email with ai leave out. Personalisation is not a merge field, it is evidence that you looked. The prompt forces you to supply one specific, recent, checkable observation, builds the opener directly on it, then tells you which detail it used so you can verify the claim before you send.",
      "Everything else exists to suppress the tics that make AI outreach obvious: opening with a compliment, padding the offer with adjectives, inventing a mutual connection, and closing with a calendar link and a demand for thirty minutes.",
    ],

    sections: [
      {
        heading: "Why most AI outreach fails before the first sentence",
        body: [
          "The failure is structural rather than stylistic. A model handed a company name cannot distinguish that prospect from any competitor in the same industry, so it produces the statistical average of every sales email in its training data. The result reads as competent and lands as noise, because competence is not scarce in an inbox and relevance is.",
          "This is why editing the tone does not help. A warmer version of a message built on nothing is still built on nothing. The input has to change, not the styling, which is why the gate sits at the front rather than as tone instructions at the back.",
        ],
        list: [
          "A company description is not research. It is true of every competitor and shows you read their homepage.",
          "A funding announcement is weak research. Everyone selling to them saw the same press release that week.",
          "A job posting is decent research. It signals a specific problem they are spending money to solve right now.",
          "Something the person said, in a talk or a post, is strong research. It proves you watched them, not their company.",
        ],
      },
      {
        heading: "What this cold email prompt does differently",
        body: [
          "The guard clause runs first. Before any copy exists, the model checks whether the research input is specific and checkable, and if it is not, it returns a single line asking for better input instead of writing anyway. In testing this was the difference between a tool that helps and one that industrialises the behaviour that gets sending domains blocked.",
          "The word ceiling does the second half of the work. Ninety words leaves no room for a preamble, a boilerplate paragraph and a three sentence pitch, so the budget goes to the one thing that matters. Length limits are blunt, and here the bluntness is the point.",
          "Finally it names the research detail the opener was built on. That single line turns an unverifiable draft into something checkable in five seconds, and it catches the times the model quietly inferred something the research did not say. An ai cold email that gets a reply almost always turns on that one detail being true.",
        ],
      },
      {
        heading: "Writing the research input, the part that actually matters",
        body: [
          "Everything depends on the RESEARCH variable. The test is whether the finding could be true of a competitor. If it could, it is not research, it is background.",
          "The strongest inputs are statements the prospect made themselves, because they carry an implicit admission of a problem. A VP saying a nightly job takes six hours has given you the constraint, the pain and the stakeholder in one sentence. A press release about operational excellence has given you nothing.",
        ],
        subsections: [
          {
            heading: "Where to find something checkable in five minutes",
            body: [
              "Conference talks and podcasts are the highest yield source, because people are far more candid about operational problems on stage than in writing. Engineering blogs and changelogs come next, especially posts describing something that went wrong. Job postings are third, and are the best option when a prospect has no public presence at all.",
            ],
          },
        ],
      },
      {
        heading: "Constraints that stop the output sounding generated",
        body: [
          "Several instructions exist purely to suppress tics that survive every other instruction. Banning the opening compliment matters most, because a compliment in a first sentence is the strongest signal that a message was bulk sent.",
          "The reading level constraint does something subtler. Sales writing drifts toward abstraction, and abstraction lets a claim sound impressive while committing to nothing. Plain words force concrete claims, because a vague claim written plainly is visibly vague.",
        ],
        list: [
          "No opening compliment, and no variant of hoping the email finds them well.",
          "No adjectives in the sentence describing what you do.",
          "No fact or connection absent from your research input.",
          "A question as the close, not a calendar link and a request for thirty minutes.",
          "A subject line that is not a question, which reads as marketing.",
        ],
      },
      {
        heading: "Where the prompt still needs a human",
        body: [
          "It cannot tell you whether your research is true. It takes your input in good faith, so a misread conference talk becomes a confident opener built on a misunderstanding, which is worse than a generic email because it is memorably wrong. The closing explanation line exists so you always check before sending.",
          "It also cannot judge whether the link between the finding and your offer is plausible. The model will bridge any two things if asked, and a strained bridge reads as a stretch. If the connection needs two logical hops, this is the wrong prospect, not the wrong email.",
        ],
      },
    ],

    howTo: {
      name: "How to use the cold email prompt",
      steps: [
        {
          name: "Find one checkable thing",
          text: "Find something the prospect said or did recently that would not be true of a competitor. A talk, a post, a changelog or a job posting.",
        },
        {
          name: "Fill in the four variables",
          text: "Paste the prospect, the finding as a full sentence with its source and timing, what you do in plain words, and the one action you want.",
        },
        {
          name: "Run it and read the refusal seriously",
          text: "If it stops and asks for better research, it is right. Find something specific rather than rephrasing what you had.",
        },
        {
          name: "Verify the detail it used",
          text: "Check the closing line against your source. This is where inferred or distorted claims get caught.",
        },
        {
          name: "Send it yourself, unedited if possible",
          text: "Resist smoothing the plain language. The flatness is what makes it read as a person, not a campaign.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the cold email prompt refuse to write sometimes?",
        answer:
          "Because writing from a company name alone produces the message everyone else is already sending, and volume sending that copy damages your domain reputation. The refusal is deliberate. If it triggers, go and find a specific recent fact about the prospect rather than deleting the instruction.",
      },
      {
        question: "Can I use this chatgpt prompt for cold outreach at scale?",
        answer:
          "Partly. The writing step scales, the research step does not, and that is the honest limit. Five hundred of these built on thin research is five hundred generic emails with better grammar. It works best on a list small enough to spend five minutes per prospect, usually under fifty accounts a week.",
      },
      {
        question: "How is this different from asking the model to write a personalised email?",
        answer:
          "Asking for a personalised email gets you the word personalised interpreted as inserting a name. This defines personalisation as a specific checkable observation, refuses to proceed without one, then reports which it used. That is what makes it a personalised cold email without templates rather than a template with a variable.",
      },
      {
        question: "Does this work for cold email prompt for b2b sales specifically, or any outreach?",
        answer:
          "It is built for business to business selling where there is an identifiable person with an operational problem. It adapts to recruiting and partnership outreach with a minor edit to the offer line. It works poorly for consumer selling, where the research step has no equivalent and the economics assume volume.",
      },
      {
        question: "Will recipients be able to tell it was written with AI?",
        answer:
          "They can tell when the opener is a compliment, the middle is adjective heavy and the close demands thirty minutes, which is why each is banned here. What they cannot detect is a short plain message built on something they actually said, because it is indistinguishable from one you wrote yourself.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/discovery-call-prompt",
        label: "discovery call prompt",
        description:
          "The next step once someone replies. Prepares the questions that confirm whether the problem you guessed at is the real one.",
      },
      {
        href: "/sales-prompts/objection-handling-prompt",
        label: "objection handling prompt",
        description:
          "For the replies that are a no rather than a yes, and figuring out what the objection actually means underneath.",
      },
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "Writes the second and third touches without repeating the original pitch or saying you are circling back.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "Useful before you build a list, to work out which problems are worth researching prospects against in the first place.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "The primary documentation for the role setting and explicit constraint techniques this prompt is built from.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide",
        description:
          "The authoritative statement of what United States law requires of commercial email, including the header and opt out rules this prompt does not cover for you.",
      },
      {
        href: "https://www.nngroup.com/articles/how-users-read-on-the-web/",
        label: "Nielsen Norman Group: How users read on the web",
        description:
          "The research behind the word ceiling. People scan rather than read, which is why the first sentence carries almost all the weight.",
      },
    ],
  },
};

export default meta;
