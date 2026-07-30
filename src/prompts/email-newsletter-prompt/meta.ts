import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "email-newsletter-prompt",
  name: "Newsletter Editor",
  title: "Email Newsletter Prompt",
  category: "marketing-prompts",
  taskType: "rewrite",
  summary:
    "Turns a pile of updates into an issue with one lead story, cuts the items that only matter internally, and keeps a consistent voice.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["newsletter", "email", "content", "retention"],

  seo: {
    primaryKeyword: "email newsletter prompt",
    keywords: [
      "email newsletter prompt",
      "how to structure a newsletter people read",
      "ai prompt for a weekly company update",
      "what to leave out of a company newsletter",
      "how to choose a lead story for a newsletter",
      "how to write a newsletter that sounds human",
    ],
    seoTitle: "Email Newsletter Prompt: One Lead Story, Ruthless Cuts",
    seoDescription:
      "An email newsletter prompt that picks one lead story, cuts the items only your team cares about, and keeps the whole issue readable in ninety seconds.",
  },

  prompt: {
    text: `You are a newsletter editor with a strict ninety second reading budget for the whole issue. Your main skill is cutting.

RAW MATERIAL, EVERYTHING THAT COULD GO IN: {{MATERIAL}}
WHO SUBSCRIBES AND WHY THEY SIGNED UP: {{AUDIENCE}}
VOICE RULES: {{VOICE}}
WHAT SUCCESS LOOKS LIKE FOR THIS ISSUE: {{GOAL}}

STEP ONE: TRIAGE. Sort every item into one of three buckets and show your working:
   - LEAD: the one item that would make a subscriber glad they opened. Exactly one. If two items compete, pick one and say why the other lost.
   - INCLUDE: items worth a line or two, maximum four of them.
   - CUT: everything else. For each cut item, state which of these applies: only matters internally, too small to notice, already known, or interesting to us but not to them. Do not soften this.

STEP TWO: WRITE THE ISSUE.
   - Lead story: 120 to 200 words. Open with what changed for the reader, not with an announcement of the announcement. No phrase resembling "we are excited to".
   - Included items: one or two sentences each, each stating why the reader should care rather than what the item is.
   - One clear action for the whole issue. Not one per item.

STEP THREE: THE HONESTY PASS. Reread your own draft and flag:
   - Any sentence that would only make sense to someone who works here
   - Any claim of significance the material does not support
   - Any item you promoted because it sounded impressive rather than because it is useful

Report the total reading time in seconds. If it exceeds ninety, cut further and say what you removed rather than asking me.`,
    variables: [
      {
        token: "MATERIAL",
        label: "Everything that could go in",
        example:
          "Shipped bulk export, fixed the timezone bug, hired two people, wrote a guide on stock counts, conference talk next month, minor pricing page redesign",
      },
      {
        token: "AUDIENCE",
        label: "Who subscribes and why",
        example:
          "Warehouse managers who signed up for the stock counting guide, mostly not our customers yet",
      },
      {
        token: "VOICE",
        label: "Voice rules",
        example:
          "Short sentences, second person, no jargon, never say solution, admit problems plainly",
      },
      {
        token: "GOAL",
        label: "What success looks like",
        example: "People read the stock count guide and reply telling us what they do instead",
      },
    ],
    expectedOutput:
      "A visible triage showing what was cut and why, then an issue with one lead story of 120 to 200 words, at most four short items, a single action, an honesty pass flagging internal language, and a total reading time in seconds.",
    followUps: [
      "The lead story is the hiring news and I disagree. Rebuild the issue leading with the stock count guide and tell me what that costs.",
      "Cut this issue to forty five seconds. Show me what survives when the budget halves.",
      "Rewrite the included items so each one states a consequence for the reader rather than describing what we did.",
    ],
    pitfalls: [
      "The cut list is the valuable output and the one people overturn. If you reinstate three cut items you have rebuilt the roundup the triage was preventing.",
      "Hiring announcements almost always get promoted to lead by the model when the audience field is vague. Be specific about who subscribes and why.",
      "The honesty pass finds real problems in your own framing. Read it before you read the draft, or you will have already accepted the draft's version.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Without a rule about hierarchy, models give a major launch and a minor copy tweak identical space, and the issue reads as a list nobody finishes. Forcing exactly one lead story restores the ordering a reader needs. The honesty pass exists because internal news gets written up as though subscribers care, when the only question worth answering is what changes for them.",
  },

  article: {
    intro: [
      "An email newsletter prompt that formats your updates into sections has automated the wrong part. The writing was never the bottleneck. The hard decision is which items do not belong, and a tool that includes everything you paste has quietly taken the side of the roundup nobody finishes.",
      "This one triages first. One lead story, at most four short items, everything else cut with a stated reason, and a total reading time reported in seconds. The cut list is usually the most useful thing it produces.",
    ],

    sections: [
      {
        heading: "The roundup problem",
        body: [
          "A newsletter listing eight items of equal weight communicates that nothing was important. The reader cannot tell what matters, so they scan, find nothing that obviously demands attention, and close it. Do that fortnightly and the list stops opening at all.",
          "Anyone asking how to structure a newsletter people read is really asking how to decide what to leave out. The cause is organisational rather than editorial. Every item has somebody internally who wants it mentioned, and an even list is the diplomatic outcome. Making the tool pick one lead removes the diplomacy from the drafting stage, which is the only stage where it can be removed cheaply.",
        ],
      },
      {
        heading: "Why exactly one lead story",
        body: [
          "The rule is arbitrary in the same way a word limit is arbitrary, and it works for the same reason. Forced to choose, you have to decide what the issue is actually about, and that decision is the editorial judgement a newsletter lives or dies on.",
          "When two items genuinely compete, the prompt names the loser and says why, which is more useful than a compromise that gives both half the space. How to choose a lead story for a newsletter is the whole job, and a tool that avoids the choice has avoided the job.",
        ],
      },
      {
        heading: "The four reasons an item gets cut",
        body: [
          "Each cut carries a stated reason, and the categories are deliberately unflattering because vague cuts get reversed. Naming an item as interesting to us but not to them is harder to argue with than describing it as lower priority.",
        ],
        list: [
          "Only matters internally: reorganisations, tooling changes, process improvements nobody outside notices.",
          "Too small to notice: a fix for something most readers never hit.",
          "Already known: anything announced elsewhere that this would merely repeat.",
          "Interesting to us but not to them: the category that catches most items, and the one people dispute most.",
        ],
      },
      {
        heading: "Banning the announcement of the announcement",
        body: [
          "Opening a lead story by saying you are excited to share something spends the first sentence on your own emotional state. The reader has not yet been told what changed, and the sentence that finally tells them is now the second one, competing with a subject line for attention it has already partly lost.",
          "Opening instead with what changed for the reader is a small rule with a large effect on how the issue reads. Deciding what to leave out of a company newsletter and removing self referential openings together account for most of the difference between a newsletter that reads as a person writing and one that reads as a department reporting.",
        ],
      },
      {
        heading: "The honesty pass",
        body: [
          "After drafting, the prompt rereads its own output looking for internal language, unsupported claims of significance, and items promoted because they sounded impressive. This catches the specific failure where a draft is well written and subtly self serving.",
          "This matters most for an ai prompt for a weekly company update, where the raw material is by definition internal. It is worth reading before the draft rather than after. Read in the other order you have already accepted the framing, and the flags feel like quibbles rather than the corrections they usually are. This section is most of what separates knowing how to write a newsletter that sounds human from merely intending to.",
        ],
      },
      {
        heading: "Why the email newsletter prompt treats reading time as the real constraint",
        body: [
          "The ninety second budget is what makes the other rules enforceable. Without a total limit, every rule can be satisfied while the issue still grows, because each individual item is defensible on its own.",
          "The prompt is instructed to cut further rather than ask permission when the budget is exceeded, and to report what it removed. This produces occasional disagreement, which is the correct outcome, since disagreeing with a specific cut is a much better conversation than approving a draft that was too long.",
        ],
      },
    ],

    howTo: {
      name: "How to use the email newsletter prompt",
      steps: [
        {
          name: "Paste everything, including the small items",
          text: "The triage needs the full set to compare against. Filtering before you run it means you have already made the decision the tool is meant to help with.",
        },
        {
          name: "Be precise about who subscribes",
          text: "Say why they signed up, not just what industry they are in. Signup reason is what determines whether your hiring news is a lead story or a cut.",
        },
        {
          name: "Read the cut list before the draft",
          text: "This is where the editorial judgement is visible. If you disagree with a cut, argue with the stated reason rather than reinstating the item silently.",
        },
        {
          name: "Hold the reading time",
          text: "If additions push it past ninety seconds, remove something rather than accepting a longer issue. The budget is what keeps the list opening.",
        },
      ],
    },

    faq: [
      {
        question: "How often should a newsletter go out?",
        answer:
          "Whatever cadence you can fill with one genuine lead story each time. A monthly issue with something worth reading beats a weekly one padded with items that failed the triage, and the padding is what trains subscribers to stop opening.",
      },
      {
        question: "What if there is genuinely no lead story this week?",
        answer:
          "Then skip the issue, which is a legitimate outcome the triage will make obvious. Sending an issue whose lead story is the least weak of several minor items costs you more attention than sending nothing does.",
      },
      {
        question: "Does the email newsletter prompt handle subject lines?",
        answer:
          "No, deliberately. Subject lines are their own problem with different constraints, and folding them in tends to produce a subject that summarises the whole issue rather than selling the lead story. Write the issue first, then handle the subject separately.",
      },
      {
        question: "How do I stop the team overriding the cut list?",
        answer:
          "Circulate the cut list with its stated reasons rather than only the draft. Arguing that an item is not merely internal is a specific claim someone has to defend, whereas asking why their item is missing from a finished draft usually succeeds.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description:
          "Run after the issue exists, using the lead story rather than the whole issue as the subject's subject.",
      },
      {
        href: "/marketing-prompts/brand-voice-prompt",
        label: "brand voice prompt",
        description:
          "Produces the voice rules this takes as an input, which is the surface where voice drifts fastest.",
      },
      {
        href: "/marketing-prompts/content-calendar-prompt",
        label: "content calendar prompt",
        description:
          "Budgets for the recurring newsletter slot, which quietly consumes the capacity meant for articles.",
      },
      {
        href: "/business-prompts/meeting-notes-prompt",
        label: "meeting notes prompt",
        description:
          "The same discipline of separating what happened from what matters, applied to a transcript instead of a month.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/email-newsletters-usability/",
        label: "Nielsen Norman Group: Email newsletter usability",
        description:
          "The usability research on how subscribers scan an issue, which is the basis for one lead story rather than an even list.",
      },
      {
        href: "https://www.rfc-editor.org/rfc/rfc8058",
        label: "RFC 8058: One click unsubscribe",
        description:
          "The specification any recurring bulk send must implement, independent of how well the issue is written.",
      },
      {
        href: "https://www.plainlanguage.gov/guidelines/concise/",
        label: "US Government: Plain language guidance on concision",
        description:
          "The established standard for cutting self referential openings, which is what the announcement rule enforces.",
      },
    ],
  },
};

export default meta;
