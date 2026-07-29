import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "email-subject-line-prompt",
  name: "Subject Line Tester",
  title: "Email Subject Line Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Generates subject lines across five distinct psychological hooks and predicts which will look like spam in a crowded inbox.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["email", "subject lines", "open rates", "campaigns"],

  seo: {
    primaryKeyword: "email subject line prompt",
    keywords: [
      "email subject line prompt",
      "ai prompt for higher email open rates",
      "how to write subject lines that avoid spam filters",
      "subject line ideas for newsletters",
      "testing subject line hooks not adjectives",
      "preview text and subject line pairing",
    ],
    seoTitle: "Email Subject Line Prompt: Five Hooks, One Winner",
    seoDescription:
      "An email subject line prompt that writes five different hooks rather than five rewordings, pairs each with preview text, and flags the spam risks.",
  },

  prompt: {
    text: `You are an email marketer who knows that the subject line and the preview text are one unit, not two, and that most subject line tests fail because all the variants use the same hook.

WHAT THE EMAIL ACTUALLY CONTAINS: {{CONTENT}}
WHO IT GOES TO AND THEIR RELATIONSHIP TO US: {{AUDIENCE}}
SENDER NAME AS IT APPEARS: {{SENDER}}
WHAT I WANT THEM TO DO: {{ACTION}}

First, check the content input. If it describes a newsletter with several unrelated items, say so and ask which single item is worth the subject line, because a subject line covering three topics converts on none of them.

Write five subject lines, each using a different hook:

A. CURIOSITY GAP. Withholds one specific thing, but the thing withheld must actually be in the email.
B. SPECIFIC BENEFIT. States the concrete outcome, with a number if the content supports one.
C. DIRECT AND PLAIN. What the email is, no technique at all. This is the control.
D. QUESTION THEY CANNOT ANSWER NO TO. Must be about their situation, not about our product.
E. PATTERN INTERRUPT. Unexpected phrasing or structure. Highest variance, may fail badly.

For each of the five, also give:
- Preview text that continues the subject rather than repeating it. Never let the preview text duplicate words from the subject.
- Character count of the subject line.
- A spam risk note: flag any word or construction that commonly triggers filtering or reads as bulk mail. Be specific rather than listing generic banned words.

Rules: no false urgency, no fake personalisation like RE: or FWD:, no all caps, at most one piece of punctuation, no emoji unless the sender name above is an individual person rather than a brand.

Finish by naming which two of the five to test against each other and why those two isolate the hook rather than the wording.`,
    variables: [
      {
        token: "CONTENT",
        label: "What the email actually contains",
        example:
          "A guide showing how three restaurants cut food waste by changing their prep schedule, with the actual numbers",
      },
      {
        token: "AUDIENCE",
        label: "Who it goes to and how they know you",
        example: "Restaurant owners who downloaded a costing template from us about four months ago",
      },
      {
        token: "SENDER",
        label: "Sender name as it appears",
        example: "Maya at Prepline",
      },
      {
        token: "ACTION",
        label: "What you want them to do",
        example: "Open and read the guide, no purchase involved",
      },
    ],
    expectedOutput:
      "Five subject lines using genuinely different hooks, each with non duplicating preview text, a character count and a specific spam risk note, plus a recommendation of which two to test and why that pairing isolates the hook.",
    followUps: [
      "Hook B won. Write four new benefit led lines that vary only which benefit they lead with, so I can test the claim rather than the hook.",
      "Rewrite all five assuming this audience has not heard from us in a year and may not recognise the sender name.",
      "My open rate is fine and clicks are terrible. Diagnose whether my subject lines are overpromising relative to the content described above.",
    ],
    pitfalls: [
      "The curiosity variant is the one that goes wrong. If the email does not deliver the withheld thing quickly, opens rise and unsubscribes rise with them.",
      "Models write preview text that restates the subject, which wastes the second line. Check for repeated words before sending, since the rule is the most frequently ignored.",
      "Spam notes are directional rather than authoritative. No prompt can predict a specific filter, so treat flags as reasons to rephrase, not as a clearance.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Adding preview text to the output changed the results more than anything I did to the subject lines themselves. Once the two were generated together the models stopped producing previews that repeated the subject word for word, which is what most email tools default to. The plain control variant earns its slot: in the campaigns I ran it beat the curiosity hook slightly more often than it lost.",
  },

  article: {
    intro: [
      "An email subject line prompt that returns twenty options is offering you volume where you needed variety. Twenty lines built on the same hook is one idea with nineteen rewrites, and testing them against each other measures your phrasing rather than your understanding of the reader.",
      "This one writes five lines using five different hooks, treats the preview text as part of the same unit, and tells you which two to test against each other so the result means something. It also flags the constructions likely to read as bulk mail before you find out from your delivery rate.",
    ],

    sections: [
      {
        heading: "The subject line and preview text are one unit",
        body: [
          "Most inbox clients show roughly forty characters of preview text next to the subject, and most senders leave it to be filled with the first line of the email, which is usually a greeting or a view in browser link. That wastes about a third of the space competing for the open.",
          "Generating both together forces them to work as a sentence in two parts. The rule that the preview may not repeat words from the subject sounds fussy and is the single change that most improves the pairing, because repetition is what a model does by default when asked for both separately. Getting preview text and subject line pairing right is close to free and almost universally skipped.",
        ],
      },
      {
        heading: "Five hooks, including a control",
        body: [
          "Each hook corresponds to a different reason someone opens an email, which is why the winner tells you something about the audience rather than about your writing. Curiosity, benefit, plainness, self recognition and surprise are genuinely different appeals, and a list that varies only adjectives cannot distinguish between them.",
          "The plain variant is the control and it earns its place empirically. Stripped of technique, it wins more often than people expect, particularly with audiences who already know the sender. If a technique cannot beat a plain description of the contents, the technique was costing you something.",
        ],
        list: [
          "Curiosity: works on engaged lists, punishes you when the email does not pay off the gap.",
          "Benefit: works when the reader already has the problem named and is choosing between solutions.",
          "Plain: works when the sender name carries trust, which is more often than most marketers assume.",
          "Question: works when the reader has not yet articulated the problem to themselves.",
          "Pattern interrupt: high variance, worth one slot in five and never worth all five.",
        ],
      },
      {
        heading: "Why the prompt refuses a newsletter with five topics",
        body: [
          "The check at the start exists because a subject line covering several unrelated items converts on none of them. Asked to summarise a roundup, a model produces something like this month's updates, which is accurate and gives nobody a reason to open.",
          "Naming the single strongest item instead means the subject line has a real subject. The rest of the newsletter still gets read by the people who open, and the people who would have skipped a generic roundup now have one concrete reason not to. Anyone looking for subject line ideas for newsletters usually needs this decision made before the writing starts.",
        ],
      },
      {
        heading: "What the spam notes can and cannot tell you",
        body: [
          "Modern filtering is driven far more by sender reputation, authentication and engagement history than by word choice, so the old lists of forbidden words are largely folklore. The notes here flag constructions rather than vocabulary: fake reply prefixes, manufactured urgency, all caps, stacked punctuation and mismatches between the sender name and the tone.",
          "That said, no prompt can predict a specific filter, and treating a clean note as clearance is a mistake. Learning how to write subject lines that avoid spam filters is mostly about authentication and list hygiene, with phrasing a distant third.",
        ],
      },
      {
        heading: "Testing what the email subject line prompt gives you",
        body: [
          "The recommendation at the end names two variants and says why that pair isolates the hook. Testing all five at once splits the list so thinly that the result is noise, and testing two variants of the same hook measures wording, which has a low ceiling.",
          "Pick the two hooks that imply the most different things about your reader, run those, then take the winning hook and vary its wording in the next send. That sequence turns an ai prompt for higher email open rates into an actual programme rather than a one off improvement.",
        ],
      },
    ],

    howTo: {
      name: "How to use the email subject line prompt",
      steps: [
        {
          name: "Describe the contents, not the campaign",
          text: "Say what is actually inside the email, including the specific numbers or examples. Vague content produces vague hooks, especially for the benefit variant.",
        },
        {
          name: "Name one item if it is a roundup",
          text: "If the prompt stops and asks which item deserves the subject, pick the one with a concrete outcome rather than the one you are most excited about.",
        },
        {
          name: "Check every preview text for repetition",
          text: "Scan for words shared with the subject line. Any overlap is wasted space in the only two lines you get.",
        },
        {
          name: "Test two hooks, then two wordings",
          text: "First round finds the hook, second round refines it. Reversing that order optimises the phrasing of an appeal you never confirmed was right.",
        },
      ],
    },

    faq: [
      {
        question: "How long should an email subject line be?",
        answer:
          "Short enough to survive mobile truncation, which in practice means the meaning has to land inside about forty characters even when the line runs longer. The character count in the output is there so you can check where it cuts rather than to enforce a fixed limit.",
      },
      {
        question: "Does the email subject line prompt work for transactional messages?",
        answer:
          "Only the plain variant applies. Receipts, password resets and shipping notices should be maximally boring and completely predictable, because the reader is looking for them. Applying a curiosity hook to a transactional email is a good way to have it ignored or reported.",
      },
      {
        question: "Should I use emoji in subject lines?",
        answer:
          "The prompt allows one only when the sender is a named individual, because emoji from a person reads as informal and from a brand reads as a campaign. They also render inconsistently across clients, so never let one carry meaning the words do not also carry.",
      },
      {
        question: "Why does testing subject line hooks not adjectives matter so much?",
        answer:
          "Because the hook is the reusable finding. Learning that your audience responds to specificity over curiosity changes your landing pages and ads too, whereas learning that one adjective beat another tells you nothing you can apply anywhere else.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description:
          "For the body once the subject has earned the open, including deciding which item leads the issue.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "The same angle testing discipline applied to paid, where the winning hook usually transfers directly.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "Supplies the belief and fear material the question and curiosity hooks are built from.",
      },
      {
        href: "/sales-prompts/follow-up-email-prompt",
        label: "follow up email prompt",
        description:
          "One to one follow ups need a different approach from campaigns, where a plain subject nearly always wins.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.rfc-editor.org/rfc/rfc8058",
        label: "RFC 8058: One click unsubscribe",
        description:
          "The specification bulk senders must implement, which affects deliverability considerably more than subject line wording does.",
      },
      {
        href: "https://support.google.com/mail/answer/81126",
        label: "Google: Email sender guidelines",
        description:
          "Gmail's own statement of what causes filtering, and the authoritative correction to most folklore about banned words.",
      },
      {
        href: "https://www.nngroup.com/articles/email-newsletters-usability/",
        label: "Nielsen Norman Group: Email newsletter usability",
        description:
          "Usability research on how people scan an inbox, which is the basis for treating subject and preview text as one unit.",
      },
    ],
  },
};

export default meta;
