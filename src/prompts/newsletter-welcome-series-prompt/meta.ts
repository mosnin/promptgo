import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "newsletter-welcome-series-prompt",
  name: "Welcome Series Planner",
  title: "Newsletter Welcome Series Prompt",
  category: "writing-prompts",
  taskType: "plan",
  summary:
    "Plans a full newsletter welcome series where every email earns the next open with a different job, not a repeated pitch.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["newsletter", "email", "welcome series", "onboarding", "sequence"],

  seo: {
    primaryKeyword: "newsletter welcome series prompt",
    keywords: [
      "newsletter welcome series prompt",
      "how to write a welcome email sequence",
      "chatgpt prompt for welcome emails",
      "ai prompt for onboarding sequences",
      "how many emails in a welcome series",
      "why welcome series emails all sound the same",
      "welcome series prompt for newsletters",
    ],
    seoTitle: "Newsletter Welcome Series Prompt: Earn Every Open",
    seoDescription:
      "A newsletter welcome series prompt that plans the whole sequence at once, gives every email a different job, and holds the pitch back until real value is given.",
  },

  prompt: {
    text: `You are an email marketing strategist planning a welcome series for a new newsletter subscriber, not a single welcome email. You know a sequence fails when every message repeats the same pitch in slightly different words, and succeeds when each email earns the right to send the next one by delivering something the subscriber did not already have.

WHAT THEY SIGNED UP FOR: {{SIGNUP_REASON}}
WHO THEY ARE: {{AUDIENCE}}
BRAND VOICE: {{BRAND_VOICE}}
THE EVENTUAL PAID OFFER: {{OFFER}}
NUMBER OF EMAILS: {{SEQUENCE_LENGTH}}
SEND CADENCE: {{SEND_CADENCE}}

Plan the whole sequence before writing any single email. Assign each email exactly one job, and no two emails may share a job: deliver on the signup promise immediately, set expectations for what is coming and how often, prove expertise with one specific piece of content, build trust with a short story, or ask a question that segments the list. The paid offer may appear in at most the final two emails, and never before the subscriber has received something of clear value with no ask attached. For every email, give the send day, the subject line, the one sentence stated purpose, the key content beats, and the single call to action. Flag any email whose stated purpose duplicates an earlier one so it can be rewritten before it ships.`,
    variables: [
      {
        token: "SIGNUP_REASON",
        label: "What they actually signed up for",
        example: "Downloaded a free PDF on batch cooking for parents who work full time",
      },
      {
        token: "AUDIENCE",
        label: "Who the subscriber is",
        example: "Working parents aged 30 to 45 who feel guilty about ordering takeout most nights",
      },
      {
        token: "BRAND_VOICE",
        label: "Tone and register to write in",
        example: "Warm, plain spoken, a little funny, never preachy about food choices",
      },
      {
        token: "OFFER",
        label: "The paid product this series eventually leads toward",
        example: "A nine dollar a month app with weekly meal plans and an auto generated grocery list",
      },
      {
        token: "SEQUENCE_LENGTH",
        label: "How many emails in the series",
        example: "5",
      },
      {
        token: "SEND_CADENCE",
        label: "The gap between sends",
        example: "Day 0, day 2, day 5, day 9, day 14",
      },
    ],
    expectedOutput:
      "A numbered plan for the whole sequence where every email has a stated purpose that appears on no other email, the signup promise is delivered in the first email with no pitch attached, and the paid offer appears only in the final one or two emails after value has already been given without an ask.",
    followUps: [
      "Now write the full copy for email one only, matching the brand voice exactly and keeping the subject line under forty characters.",
      "Two of these purposes feel close. Rewrite the weaker one so it does something the others genuinely do not.",
      "Turn the plan into a table with columns for day, subject line, purpose and call to action, so I can hand it to a designer.",
    ],
    pitfalls: [
      "A vague signup reason like joined our newsletter produces a vague first email. The more specific the lead magnet or opt in trigger, the more the first email can deliver on it by name rather than restating the general topic.",
      "Letting the model default to five emails without checking the cadence field produces sends that are too close together. A daily cadence needs shorter, sharper emails than one spread across two weeks.",
      "Skipping the duplicate purpose check is the most common failure. Two emails can each sound reasonable alone and still both be doing set expectations, which reads as the same email twice to a subscriber who opened both.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked for a welcome series without a constraint, a model tends to write one good email and then paraphrase it four more times, since nothing in the request forces the emails apart. Requiring a distinct stated purpose per email, drawn from a fixed and exhausted list, is what stops the paraphrasing and forces the sequence to actually be five different jobs rather than one job repeated.",
  },

  article: {
    intro: [
      "A newsletter welcome series prompt that produces one good email and then paraphrases it four more times has produced a drip campaign, not a series. Subscribers who open the first email and find the second one saying the same thing in different words stop opening the third.",
      "This one plans the whole sequence before a single email gets written. Every email is assigned a job that no other email in the sequence is allowed to share, the signup promise gets delivered before anything is asked for in return, and the paid offer is held back until value has already changed hands with no strings attached.",
      "The result reads less like a campaign and more like someone who noticed what the subscriber actually wanted and kept noticing it for two weeks.",
    ],

    sections: [
      {
        heading: "Why one email is not a newsletter welcome series prompt",
        body: [
          "A single welcome email has one job: say hello and hand over whatever was promised at signup. A series has to solve a harder problem, which is giving a subscriber five or six reasons to keep opening before any of them have bought anything. Treating the series as one email copied five times skips that problem instead of solving it.",
          "The tell is usually the subject lines. If they all read as variations on welcome, thanks for joining and don't forget to check out, the sequence has one job wearing five outfits. A subscriber notices that pattern by email three, whether or not they could name it.",
        ],
      },
      {
        heading: "Start from what they actually signed up for",
        body: [
          "The signup reason is the input that does the most work here, and it is also the one most drafts leave generic. Joined the newsletter is not a signup reason. Downloaded a checklist for switching to a new invoicing tool is, because it tells the first email exactly what to deliver and tells every later email what problem this subscriber already admitted having.",
          "Used as an ai prompt for onboarding sequences rather than a generic email writer, the model treats that opt in trigger as the spine of the whole series rather than a detail mentioned once in the first line and then forgotten.",
        ],
      },
      {
        heading: "Give every email a job nothing else in the sequence has",
        body: [
          "The prompt limits each email to one of five jobs, and the same job cannot be assigned twice. That constraint is doing more work than any line about tone or length, because it is the thing that actually prevents repetition rather than just asking the model not to repeat itself.",
        ],
        list: [
          "Deliver on the signup promise, immediately, with no pitch attached.",
          "Set expectations for what is coming and how often it will arrive.",
          "Prove expertise with one specific, narrow piece of content, not a broad topic list.",
          "Build trust with a short, specific story about why the product or brand exists.",
          "Ask a question that segments the list, so later sends can be more relevant.",
        ],
      },
      {
        heading: "Where the paid offer is allowed to appear",
        body: [
          "This newsletter welcome series prompt limits the paid offer to the final one or two emails, and only after at least one earlier email has given something with no ask attached. Pitching in email one is the single most common way a welcome series burns the goodwill of joining in the first place.",
          "As a welcome series prompt for newsletters specifically, rather than for a product trial or an app install, the offer is usually a subscription or a paid tier, which means the case for it has to be built across several emails of demonstrated value rather than made once and repeated.",
        ],
      },
      {
        heading: "Cadence changes what each email can carry",
        body: [
          "A five email series sent over two weeks can afford a story in the middle. The same five emails sent daily cannot, because a subscriber reading a brand new relationship's origin story on day three has not yet decided they want that much attachment. The send cadence field exists so the model adjusts pacing and length to the actual gap between sends, not just the count of emails.",
        ],
      },
      {
        heading: "What a finished sequence looks like",
        body: [
          "A five email plan built from a checklist download might look like the table below. Every row does a different job, and the offer only appears once value has already been delivered twice.",
        ],
      },
    ],

    table: {
      caption: "A five email plan produced from one signup reason, mapped by day and job",
      headers: ["Day", "Job", "What it delivers"],
      rows: [
        ["Day 0", "Deliver the promise", "The exact resource promised at signup, nothing else asked for"],
        ["Day 2", "Set expectations", "What is coming over the next two weeks and how often"],
        ["Day 5", "Prove expertise", "One specific tip that solves a narrow, named problem"],
        ["Day 9", "Build trust with a story", "A specific detail about why the product exists"],
        ["Day 14", "Segment with a question", "A question about their goal, paired with the paid offer"],
      ],
    },

    howTo: {
      name: "How to use the newsletter welcome series prompt",
      steps: [
        {
          name: "Write down what they actually signed up for",
          text: "Not the general topic of your newsletter. The specific checklist, discount code or download that made someone hand over their address today.",
        },
        {
          name: "Decide the send cadence before drafting anything",
          text: "Daily sends need shorter, sharper emails. A series spread across two weeks can afford a story in the middle without feeling rushed.",
        },
        {
          name: "Let the model assign one job per email",
          text: "Do not pre write subject lines first. The job assignment is what prevents two emails from quietly doing the same thing in different words.",
        },
        {
          name: "Check the flagged duplicates before sending",
          text: "The prompt is instructed to flag any repeated purpose. Treat that flag as a rewrite requirement, not a suggestion.",
        },
        {
          name: "Confirm the offer only appears late",
          text: "If the paid offer shows up before email three or four, push it back a step. Value delivered with no ask is what earns the eventual ask.",
        },
      ],
    },

    faq: [
      {
        question: "How many emails in a welcome series is right?",
        answer:
          "Between three and seven is typical, and the right count depends on how much the brand has to say without repeating itself. A series padded past what the content supports produces the exact repetition problem this prompt exists to prevent, so fewer well differentiated emails outperform more thin ones.",
      },
      {
        question: "When is it okay to pitch in a welcome series?",
        answer:
          "Only after at least one earlier email has delivered something with no ask attached. A subscriber who has already received real value once is reading a pitch differently from one who joined an hour ago and immediately got asked to buy something.",
      },
      {
        question: "How to write a welcome email sequence without a copywriter?",
        answer:
          "Start from the specific signup reason rather than the general newsletter topic, assign each email a distinct job from a fixed list, and check that no two emails are quietly doing the same job before sending. That structure does most of the work a copywriter would otherwise supply by instinct.",
      },
      {
        question: "Does this work as a chatgpt prompt for welcome emails, or only for one model?",
        answer:
          "It is written to be model agnostic and is tested against current GPT and Claude releases. The instructions are structured as explicit constraints and success criteria rather than a style reference to any one model, which is what keeps the output consistent across tools.",
      },
      {
        question: "Why welcome series emails all sound the same, and how do I avoid it?",
        answer:
          "Most drafts are written one email at a time, so each one is judged only against itself rather than against what the earlier emails already said. Planning every email's purpose in a single pass, before writing any of the copy, is what makes the repetition visible early enough to fix.",
      },
      {
        question: "Can I reuse the same plan for a different lead magnet later?",
        answer:
          "The structure carries over but the content should not. Rerun the prompt with the new signup reason filled in, since the first email's promise and the middle email's proof both depend on what that specific subscriber actually asked for, not on the previous campaign's topic.",
      },
    ],

    internalLinks: [
      {
        href: "/writing-prompts/tone-adjustment-prompt",
        label: "tone adjustment prompt",
        description:
          "Keeps the brand voice consistent across five or six emails written in one sitting, which a plan alone does not guarantee.",
      },
      {
        href: "/writing-prompts/headline-writing-prompt",
        label: "headline writing prompt",
        description:
          "Applies the same earn the next read discipline to a single subject line once the sequence plan is in place.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description:
          "For the ongoing issues a subscriber receives once the welcome series ends and the regular send cadence begins.",
      },
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Generates and pressure tests the five subject lines a finished welcome series plan still needs written.",
      },
    ],

    externalLinks: [
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Documents the pattern of giving a model explicit constraints and success criteria, which is what keeps each email's job distinct rather than descriptive.",
      },
      {
        href: "https://www.nngroup.com/articles/email-newsletters-usability/",
        label: "Nielsen Norman Group: Email newsletter usability",
        description:
          "The research on how subscribers scan and judge email content, which underlies why a repeated pitch reads as noise by the third send.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act compliance guide for business",
        description:
          "The legal requirement that every commercial email, including an automated welcome series, carries clear sender identification and an unsubscribe option.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents specifying an exact output format, which is why each planned email lists a send day, subject line, purpose and call to action rather than free text.",
      },
    ],
  },
};

export default meta;
