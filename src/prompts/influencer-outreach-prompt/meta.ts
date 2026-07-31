import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "influencer-outreach-prompt",
  name: "Creator Outreach Writer",
  title: "Influencer Outreach Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Writes creator outreach that opens on something the person actually made, states the offer plainly, and refuses to run on a follower count alone.",
  updated: "2026-07-31",
  published: "2026-07-31",
  tags: ["influencer marketing", "creator outreach", "collaboration", "email"],

  seo: {
    primaryKeyword: "influencer outreach prompt",
    keywords: [
      "influencer outreach prompt",
      "how to write influencer outreach that gets replies",
      "ai prompt for creator collaboration emails",
      "influencer outreach message examples",
      "how to personalise influencer outreach",
      "chatgpt prompt for influencer outreach",
    ],
    seoTitle: "Influencer Outreach Prompt: Emails Creators Actually Open",
    seoDescription:
      "An influencer outreach prompt that opens on something the creator actually made, states the offer plainly, and refuses to send on a follower count alone.",
  },

  prompt: {
    text: `You are writing influencer outreach for a brand that understands a generic "I love your content" email gets deleted unread. You know that creators can tell within one sentence whether someone has actually watched their work or is running a spreadsheet of follower counts through a mail merge.

CREATOR: {{CREATOR}}
SOMETHING THEY ACTUALLY POSTED OR MADE: {{SIGNAL}}
THE OFFER: {{OFFER}}
WHAT WE WANT AS THE NEXT STEP: {{GOAL}}

If the signal field contains only a follower count, an engagement rate, or the name of a platform, STOP and reply: "There is no signal here, only a metric. Find something this person actually made or said, or do not send this." Do not write outreach.

Produce two things.

1. THE OUTREACH EMAIL. Under 150 words. Opens by referencing the signal specifically enough that it could not have been sent to anyone else, states the offer plainly including money or product if either is involved, and ends with one low pressure question rather than a request to book a call. Never cite follower count or engagement rate as a reason for reaching out.

2. THE SUBJECT LINE. Under 45 characters, specific to the signal, no emoji, and not the phrase "collaboration opportunity".

Finally, state in one sentence whether the signal given is strong enough to justify contact, or whether this creator should be skipped until a better one exists.`,
    variables: [
      {
        token: "CREATOR",
        label: "Who the creator is",
        example: "Food and travel creator on Instagram and TikTok, around 40,000 followers, mostly UK based audience",
      },
      {
        token: "SIGNAL",
        label: "Something they actually posted or made",
        example:
          "Posted a reel last week cooking three dinners under five pounds each, caption said she gets asked for the shopping list every single time",
      },
      {
        token: "OFFER",
        label: "What you are actually offering",
        example: "Three months of free meal kits plus a flat fee of 400 pounds for one sponsored Reel, no exclusivity required",
      },
      {
        token: "GOAL",
        label: "What you want as the next step",
        example: "A yes or no on the Reel within two weeks, decided by email rather than a call",
      },
    ],
    expectedOutput:
      "An outreach email under 150 words that opens on the specific signal, states the offer including any money or product, and ends with one low pressure question, a subject line under 45 characters, and an honest verdict on whether the signal justifies contact at all.",
    followUps: [
      "She replied asking for the fee in writing before she will consider it. Draft that reply without renegotiating anything yet.",
      "Rewrite the email assuming the only signal is a comment she left on another creator's post rather than her own content.",
      "I have thirty creators in this niche and no individual signals for most of them. Tell me what to do instead of sending thirty of these.",
    ],
    pitfalls: [
      "The stop condition fires often, and it should. A follower count is not a signal, and outreach built on one is exactly what a creator's assistant is trained to filter into a folder nobody opens.",
      "Word counts from a model are approximate. Paste the email into a client and check the length before sending, since a truncated offer reads worse than a short one.",
      "Naming a fee that was never discussed internally is a common failure. Confirm the offer with whoever owns budget before it appears in a message a creator can screenshot.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Outreach modelled on follower count alone reads as a mail merge because it is one, and a creator who receives dozens of these a week deletes them without reaching the second line. Requiring a real signal, something the creator actually made or said, forces the opening sentence to prove attention before any offer appears, which is the only thing that survives an inbox already full of identical pitches.",
  },

  article: {
    intro: [
      "An influencer outreach prompt that opens with a compliment about someone's follower count has already told the creator everything they need to know: nobody read the actual content, a spreadsheet did. Creators receive these daily, often dozens in a week, and they have learned to spot the pattern in the first sentence.",
      "This one refuses to run on a follower count, an engagement rate, or a platform name alone. It requires something the creator actually posted or made, opens the email on that specific detail, states the offer without vague language about partnerships, and closes with a single question instead of a request to hop on a call.",
    ],

    sections: [
      {
        heading: "Why generic influencer outreach gets deleted",
        body: [
          "Anyone searching how to write influencer outreach that gets replies is usually staring at a template that was clearly sent to fifty other people first. The tell is not subtle. Praise for a follower count, a vague reference to great content, and an offer that never specifies money or product, all inside the first two lines.",
          "Creators filter on exactly that pattern because volume trained them to. A brand that sends the same paragraph with the name swapped out is asking to be treated as spam, and increasingly is.",
        ],
      },
      {
        heading: "The follower count problem",
        body: [
          "Follower count feels like the obvious place to start because it is the easiest number to find, but it predicts almost nothing about whether a creator is right for an offer or whether they will even open the email. Research on close to two million influencer driven purchases found that smaller creators frequently deliver stronger returns than larger ones, which undercuts the entire premise of sorting an outreach list by count.",
          "The prompt treats a bare follower count the same way it treats an engagement rate on its own: as no signal at all. Both describe an audience size. Neither describes a specific creator, which is the only thing an opening line can actually reference.",
        ],
      },
      {
        heading: "How to personalise influencer outreach without stalking a feed",
        body: [
          "How to personalise influencer outreach does not require reading someone's entire archive. One recent post is usually enough, provided it is specific: a video where they solved a real problem, a caption where they said something a general audience would not, a format they clearly put effort into rather than a reposted trend.",
          "The signal field exists so that requirement is enforced rather than assumed. A brand under deadline pressure will happily write around a vague instruction to personalise. A stop condition that refuses to proceed without a concrete example does not leave that option open.",
        ],
        list: [
          "A post that solves a specific problem: the strongest signal, since it is evidence of what the creator's audience actually wants.",
          "A caption with an opinion or a detail: usable, especially when it reveals something a bulk sender could not have known.",
          "A format they clearly built rather than reposted: shows effort worth acknowledging directly.",
          "A comment they left elsewhere: weaker, but still specific to that person rather than their category.",
        ],
      },
      {
        heading: "What the offer needs to say plainly",
        body: [
          "Vague language about a partnership or a collaboration opportunity forces the creator to reply just to find out what is actually on the table, and most will not bother. The prompt requires the offer to state money or product where either applies, in the first email, because ambiguity here reads as a brand that has not decided what it is willing to pay.",
          "This is also where the single closing question matters. A request to book a call adds a step for a creator who has not yet decided whether the offer is worth fifteen minutes. A specific, answerable question keeps the decision small enough to make by reply.",
        ],
      },
      {
        heading: "Disclosure is not optional once money or product changes hands",
        body: [
          "Any arrangement involving payment, free product, or another commercial connection triggers a disclosure obligation on the creator's side, and outreach that pretends this is not the case sets up a conversation that has to be redone later. Naming the offer plainly in the first email, rather than after a call, gives the creator what they need to decide quickly and disclose correctly if they proceed.",
          "This is a small addition to the prompt's output but it changes how the email reads. An offer stated in writing, with terms, looks like a brand that has done this before rather than one improvising after a positive reply.",
        ],
      },
      {
        heading: "What makes the influencer outreach prompt read like a person, not a mail merge",
        body: [
          "Most outreach fails on specificity rather than on strategy. An ai prompt for creator collaboration emails that skips the signal requirement will still produce fluent, professional sounding copy, and that copy will still be interchangeable with fifty other emails a creator received that week.",
          "The influencer outreach message examples that actually work share one trait regardless of niche: the opening line could not be moved to a different creator without becoming false. That constraint is what the signal requirement is enforcing, and it is a better test than tone or politeness.",
          "The verdict at the end matters for the same reason the stop condition does. Not every creator with a real signal is worth contacting for a given offer, and the prompt is instructed to say so rather than default to encouragement, since a tool that always recommends sending quietly rewards higher volume over better targeting.",
        ],
      },
    ],

    howTo: {
      name: "How to use the influencer outreach prompt",
      steps: [
        {
          name: "Find the signal before drafting anything",
          text: "Scroll their recent posts, not their bio. If nothing specific stands out, that is the honest signal that this is not yet the right creator to contact.",
        },
        {
          name: "Decide the offer before writing the email",
          text: "Money, product, or both, with a real number if one applies. Confirm it with whoever owns the budget so nothing in the draft has to be walked back.",
        },
        {
          name: "Let the verdict decide whether to send",
          text: "When the model flags a weak signal, treat that as information rather than an obstacle. A skipped creator costs nothing. A generic email sent anyway costs a little trust with someone who might matter later.",
        },
        {
          name: "Check the length before sending",
          text: "Paste the email into your actual client. Word and character counts from a model are close estimates, and a subject line cut off mid word undoes the specificity of everything after it.",
        },
      ],
    },

    faq: [
      {
        question: "Is an influencer outreach prompt worth it for micro-influencers?",
        answer:
          "Often more so than for large accounts, since a creator with a smaller audience is more likely to read outreach personally and notice immediately whether it was written for them specifically. The signal requirement matters just as much regardless of audience size.",
      },
      {
        question: "What counts as a real signal if the creator posts constantly?",
        answer:
          "Pick the most recent post that says something specific rather than the most recent post overall. A creator who posts daily still has a smaller set of posts that reveal an opinion, a problem solved, or an effort put in, and that smaller set is where the usable signal lives.",
      },
      {
        question: "Does this chatgpt prompt for influencer outreach work for TikTok and YouTube too?",
        answer:
          "Yes, the structure does not depend on platform. What changes is where the signal comes from: a TikTok caption, a YouTube video description, or a comment left under someone else's upload all qualify as long as they are specific to that creator.",
      },
      {
        question: "Should I mention the follower count at all?",
        answer:
          "Only as context for the brand's own planning, never inside the email itself. Citing a follower count as a reason for contact is precisely the pattern creators have learned to recognise and ignore, and it adds nothing the creator does not already know about their own account.",
      },
      {
        question: "What if the creator has never done a sponsored post before?",
        answer:
          "State the offer with the same clarity regardless. A first time creator benefits even more from plain terms, since they have no prior experience to compare a vague pitch against and are more likely to ask a slower, more cautious set of questions before agreeing.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description: "Helps decide whether a creator's actual audience matches the buyer this offer is meant to reach.",
      },
      {
        href: "/marketing-prompts/social-media-caption-prompt",
        label: "social media caption prompt",
        description: "For the sponsored post itself once the creator has agreed, in the voice their audience already trusts.",
      },
      {
        href: "/sales-prompts/linkedin-outreach-prompt",
        label: "linkedin outreach prompt",
        description: "The same real signal requirement applied to professional outreach rather than a creator collaboration.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description: "For outreach to a business contact instead of a creator, with more room than a platform allows.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
        label: "FTC: Endorsement guides, what people are asking",
        description: "Governs the disclosure a creator must make once money or free product is involved, relevant from the first offer onward.",
      },
      {
        href: "https://hbr.org/2024/09/when-it-comes-to-influencers-smaller-can-be-better",
        label: "Harvard Business Review: When it comes to influencers, smaller can be better",
        description: "Research across close to two million purchases finding follower count a weak predictor of return, the basis for treating a bare count as no signal.",
      },
      {
        href: "https://www.asa.org.uk/resource/influencers-guide.html",
        label: "ASA: Influencers' guide to making clear that ads are ads",
        description: "The UK standard for how a sponsored post must be labelled once an offer like the one this prompt drafts is accepted.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description: "Documents the conditional refusal pattern that makes the missing signal stop condition hold rather than being written around.",
      },
    ],
  },
};

export default meta;
