import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "landing-page-copy-prompt",
  name: "Landing Page Writer",
  title: "Landing Page Copy Prompt",
  category: "marketing-prompts",
  taskType: "generate",
  summary:
    "Writes a page section by section against the questions a visitor asks in order, and refuses to write a hero until the promise is specific.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["landing pages", "conversion", "copywriting", "web"],

  seo: {
    primaryKeyword: "landing page copy prompt",
    keywords: [
      "landing page copy prompt",
      "ai prompt for writing a landing page",
      "how to write a hero section that converts",
      "saas landing page copy template",
      "message match between ad and landing page",
      "landing page structure for a single offer",
    ],
    seoTitle: "Landing Page Copy Prompt: Answer Questions In Order",
    seoDescription:
      "A landing page copy prompt built around the questions a visitor asks in sequence. Refuses to write the hero until your promise is specific enough to test.",
  },

  prompt: {
    text: `You are a conversion copywriter. You believe a landing page is not a document, it is a sequence of answers to the questions a visitor asks in a fixed order. You write in that order and nothing else.

THE OFFER: {{OFFER}}
WHERE THE VISITOR CAME FROM: {{SOURCE}}
WHAT THEY BELIEVE AND FEAR: {{READER}}
PROOF I ACTUALLY HAVE: {{PROOF}}
THE SINGLE ACTION: {{ACTION}}

FIRST, before writing anything, test the offer. If it could be said by three competitors without changing a word, STOP and reply: "This promise is not specific enough to build a page on. Tell me what changes for the customer, measured or named." Do not write the page.

If it passes, write these seven blocks in order, each answering the question in brackets:

1. HERO [Am I in the right place?] One headline stating the specific change, one subhead naming who it is for and the mechanism. The headline must echo the wording of the source above, so the page matches the ad or link that sent them.
2. THE COST OF NOW [Why should I care today?] Three lines on what their current situation costs. Concrete, no fear mongering.
3. HOW IT WORKS [What actually happens?] Exactly three steps. If it genuinely takes more, say so rather than compressing.
4. PROOF [Why should I believe you?] Use only the proof given. If it is thin, say which single piece of proof would most improve this page.
5. OBJECTION BLOCK [What is the catch?] The three real reasons someone would not act, each answered in under 30 words. Include the price or effort objection.
6. THE ACTION [What do I do now?] One call to action, repeated wording from the hero, plus what happens immediately after they click.
7. WHO THIS IS NOT FOR [Am I wasting my time?] Two honest exclusions.

Rules: one offer only, no secondary calls to action, no testimonials you were not given, no statistics I did not supply. Plain sentences. Do not write a section that has no content, tell me it is missing.`,
    variables: [
      {
        token: "OFFER",
        label: "What you are offering",
        example:
          "A two week done for you migration off spreadsheets into a shared inventory system, fixed price, no downtime",
      },
      {
        token: "SOURCE",
        label: "Where the visitor came from",
        example:
          "A Meta ad using the objection first angle, headline was 'Your stock count is wrong right now'",
      },
      {
        token: "READER",
        label: "What they believe and fear",
        example:
          "Warehouse managers who think migrations always mean a week of chaos and fear being blamed if orders stop",
      },
      {
        token: "PROOF",
        label: "Proof you actually have",
        example: "31 completed migrations, longest downtime recorded was 40 minutes, two named customer quotes",
      },
      {
        token: "ACTION",
        label: "The single action",
        example: "Book a 20 minute scoping call",
      },
    ],
    expectedOutput:
      "Seven blocks in order, each tied to the visitor question it answers, with the hero echoing your traffic source, only the proof you supplied, and an explicit note wherever a section had nothing real to say.",
    followUps: [
      "The offer failed your specificity test. Interview me with five questions until the promise is concrete enough to build on.",
      "Rewrite the hero three ways for three different traffic sources, keeping the same offer, so each matches the message that sent them.",
      "Take the objection block and tell me which of the three objections the rest of the page is currently contradicting.",
    ],
    pitfalls: [
      "The stop condition fires often on first attempts. That is the prompt working. A promise three competitors could make will not convert regardless of how the page is written.",
      "If the source field is vague, message match fails silently and the hero reads fine in isolation while losing the traffic it was built for.",
      "Models will invent a testimonial if the proof field is thin. Search the output for any quote you did not supply before it reaches a designer.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "The specificity gate came out of a pattern I kept hitting: the page copy was never the problem, the offer was, and writing a beautiful page on top of a vague promise just hid that for another month. Making the model refuse felt heavy handed until the third time it stopped a team mid brief and the resulting conversation changed the offer rather than the headline.",
  },

  article: {
    intro: [
      "A landing page copy prompt that asks for a headline, three benefits and a call to action will give you exactly that, and the page will convert badly for a reason the copy cannot fix. Visitors do not read pages as a list of features. They arrive with a sequence of questions and leave at the first one that goes unanswered.",
      "This prompt writes to that sequence. Seven blocks, each tied to a specific question, in the order people actually ask them. Before any of it, the offer has to survive a test: if three competitors could make the same promise without changing a word, the model stops and tells you the problem is upstream of the writing.",
    ],

    sections: [
      {
        heading: "The seven questions, in the order they arrive",
        body: [
          "The order matters more than the wording of any individual block. Proof placed before someone cares about the problem is ignored. An objection answered before the offer is understood creates a doubt that was not there. This is a landing page structure for a single offer, and the sequence is the structural claim.",
        ],
        list: [
          "Am I in the right place? Answered in under three seconds or they leave.",
          "Why should I care today? The cost of their current situation, not your features.",
          "What actually happens? Three steps, because more than three reads as complicated.",
          "Why should I believe you? Proof, and only proof you have.",
          "What is the catch? The objections they are already holding.",
          "What do I do now? One action, described including what follows it.",
          "Am I wasting my time? Honest exclusions, which raise trust rather than lower it.",
        ],
      },
      {
        heading: "The specificity gate and why it refuses to write",
        body: [
          "The test is simple: could three competitors say this? Most draft offers fail it, because they describe a category rather than a change. Faster reporting, better collaboration and streamlined operations are all category descriptions, and no arrangement of words on a page turns one into a reason to act.",
          "Making the model stop rather than proceed is the design decision that matters here. A page written on a vague promise looks finished, gets shipped, converts poorly, and the team concludes the copy needs another pass. Refusing at the start puts the conversation where it belongs, which is on what actually changes for the customer.",
        ],
      },
      {
        heading: "Message match, the cheapest fix most pages skip",
        body: [
          "The source field exists so the hero can echo the wording of whatever brought the visitor. Someone who clicked an ad about their stock count being wrong should land on a page that says something recognisably close, in the same register, within the first line.",
          "When the ad promises one thing and the page opens on a generic brand statement, the visitor experiences a small dissonance and a large number of them leave, which gets attributed to the page being unconvincing rather than mismatched. Message match between ad and landing page is close to free and is routinely the largest single improvement available.",
        ],
      },
      {
        heading: "Writing a hero that is not a slogan",
        body: [
          "Block one gets the most attention and the most bad advice. A hero is not a mission statement or a clever line, it is an answer to whether the visitor is in the right place, and the fastest way to answer it is to state the specific change and name who it is for.",
          "The subhead carries the mechanism, which is the part teams often defer and should not. Knowing roughly how something works removes the vague suspicion that it is either magic or a lot of work. Anyone asking how to write a hero section that converts is usually looking for a formula, and the closest honest answer is: state the change, name the reader, explain the mechanism, in that order.",
        ],
      },
      {
        heading: "The two blocks people delete",
        body: [
          "The objection block gets cut because naming a reason not to buy feels like arguing against yourself. The visitor is already holding those objections, and a page that ignores them reads as either naive or evasive. Answering the price or effort objection in under thirty words does more for conversion than another paragraph of benefits.",
          "Who this is not for gets cut for the same reason and is the strongest trust signal on the page. Two honest exclusions tell a reader that the rest of the claims have edges, which makes them more credible, not less. A saas landing page copy template that omits both blocks is optimising for how the page feels to its owner.",
        ],
      },
      {
        heading: "What the landing page copy prompt will not do",
        body: [
          "It will not invent proof. If the proof field is thin the output says so and names the single piece of evidence that would most improve the page, which is more useful than a fabricated testimonial and considerably safer.",
          "It also will not write a second call to action, however much a page seems to want one. An ai prompt for writing a landing page that offers a newsletter signup beside a demo request is producing a page that converts worse at both. One offer, one action, or build a second page.",
        ],
      },
    ],

    howTo: {
      name: "How to use the landing page copy prompt",
      steps: [
        {
          name: "Write the offer as a change, not a category",
          text: "State what is measurably different afterwards. If you cannot, expect the gate to stop you, and treat that as the useful output.",
        },
        {
          name: "Paste the exact traffic source wording",
          text: "The ad headline, the email subject line or the link text. The hero is built to echo it, and it cannot do that from a description.",
        },
        {
          name: "List only proof you can show",
          text: "Real counts, real quotes, real guarantees. Leave it thin rather than padding it and let the output tell you what to go and get.",
        },
        {
          name: "Build the page in block order",
          text: "Hand it to design as seven ordered answers rather than a document. Sections reordered for visual balance break the sequence the copy depends on.",
        },
      ],
    },

    faq: [
      {
        question: "Why does the landing page copy prompt refuse vague offers?",
        answer:
          "Because copy cannot rescue a promise that is not distinct. A page built on a category description looks complete and underperforms, and the team then rewrites the copy repeatedly rather than fixing the offer. Stopping at the start puts the effort where the return actually is.",
        },
      {
        question: "How long should a landing page be?",
        answer:
          "As long as the seven questions take to answer honestly, which for a simple offer is short and for an expensive or unfamiliar one is not. Length is a symptom rather than a lever. Cutting a page that answers all seven usually just removes the objection block.",
      },
      {
        question: "Can I use one page for several traffic sources?",
        answer:
          "You can, at a cost. The hero can only echo one source, so every other source arrives to a weaker match. Where the volume justifies it, duplicate the page and change only block one, which keeps the rest of the sequence intact.",
      },
      {
        question: "Should I really include who this is not for?",
        answer:
          "Yes, and it is the block most often removed by the person approving the page. Naming two groups this does not suit costs a small number of poor fit visitors and raises credibility for everyone else, because a claim with stated limits reads as a claim someone thought about.",
      },
      {
        question: "What if I have no proof at all yet?",
        answer:
          "The output will tell you which single piece would most improve the page, and that is worth acting on before launch. A page with no proof can still work if the offer is specific and the risk is low, so consider a guarantee or a smaller first commitment instead of borrowed credibility.",
      },
    ],

    internalLinks: [
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description:
          "Produces the traffic source wording the hero has to match, and the winning angle the page should continue.",
      },
      {
        href: "/marketing-prompts/customer-persona-prompt",
        label: "customer persona prompt",
        description:
          "Supplies the belief and fear inputs, and its dismissal field maps directly onto the objection block.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For expensive offers where the visitor has to sell the purchase internally after they leave your page.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/first-impressions-human-automaticity-aesthetics/",
        label: "Nielsen Norman Group: First impressions and page abandonment",
        description:
          "The research on how quickly visitors judge relevance, which is why block one has to answer one question and no others.",
      },
      {
        href: "https://web.dev/articles/vitals",
        label: "web.dev: Core Web Vitals",
        description:
          "Google's primary documentation on the loading and stability thresholds that determine whether your hero is seen at all.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Documents the conditional stop and ordered output techniques the specificity gate and block sequence rely on.",
      },
    ],
  },
};

export default meta;
