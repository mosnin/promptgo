import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "salary-negotiation-prompt",
  name: "Offer Preparation",
  title: "Salary Negotiation Prompt",
  category: "career-prompts",
  taskType: "plan",
  summary:
    "Assembles your market data, your evidence and three sourced numbers including the one you would decline at, instead of writing you a script.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["salary", "offers", "negotiation", "job search"],

  seo: {
    primaryKeyword: "salary negotiation prompt",
    keywords: [
      "salary negotiation prompt",
      "how to negotiate a job offer",
      "ai prompt for preparing a salary conversation",
      "what to say when asked your salary expectations",
      "building an evidence file before an offer call",
      "deciding your walk away point on an offer",
    ],
    seoTitle: "Salary Negotiation Prompt: Three Numbers, One Source",
    seoDescription:
      "A salary negotiation prompt that builds your evidence file and your walk away number from sourced data, prices the non salary levers, and writes no script.",
  },

  prompt: {
    text: `You are helping me prepare for an offer conversation. You are not writing a script and you will refuse if I ask for one, because a script fails on the second turn and preparation does not.

THE OFFER OR THE ROLE AS IT STANDS: {{OFFER}}
MARKET DATA I HAVE FOUND, WITH WHERE EACH FIGURE CAME FROM: {{MARKET_DATA}}
WHAT I BRING THAT IS WORTH MONEY TO THIS EMPLOYER: {{MY_LEVERAGE}}
MY FINANCIAL AND TIMING CONSTRAINTS, AND ANY OTHER PROCESS I HAVE RUNNING: {{MY_CONSTRAINTS}}

Produce five things.

1. A market range built only from figures I supplied. Where I have fewer than two independent sources, write [UNSOURCED] beside the range and tell me exactly which figure to go and find. Never substitute a general estimate for missing data.

2. Three numbers: target, acceptable, and the number at which I decline. Beside each, one sentence stating the basis. Reject any number I cannot ground in market data or in my own constraints, and say why you rejected it.

3. An evidence file: at most five items, each linking something I have done to a cost this employer avoids or a result they gain. Use only my leverage input. Do not add achievements.

4. Every non salary lever available here, each with a money value I would need to confirm, plus which ones typically cost the employer least.

5. The two hardest replies I am likely to get, including the band is fixed, and what my actual options are in each case.

Never advise me to imply a competing offer I do not have. Never tell me I deserve more, which is a claim about me rather than about the market.`,
    variables: [
      {
        token: "OFFER",
        label: "The offer or role as it stands",
        example:
          "Verbal offer, 74k base, 5 percent bonus, 25 days holiday, hybrid three days in office. Product manager, 300 person company, London.",
      },
      {
        token: "MARKET_DATA",
        label: "Market figures and where each came from",
        example:
          "Advertisement said 70k to 85k. A recruiter told me 78k to 90k for this level in London. A friend at a similar sized firm is on 82k. No published survey yet.",
      },
      {
        token: "MY_LEVERAGE",
        label: "What you bring that is worth money here",
        example:
          "I have shipped in their exact regulated category, which their job ad says nobody on the team has. Their role has been open since February. I can start in four weeks.",
      },
      {
        token: "MY_CONSTRAINTS",
        label: "Financial, timing and alternative constraints",
        example:
          "Current salary 71k. Three month notice. Savings cover four months. One other process at second stage, no offer yet. Cannot take a pay cut.",
      },
    ],
    expectedOutput:
      "A sourced range with any gaps explicitly marked, three grounded numbers each carrying a one line basis, up to five evidence items tied to employer cost, priced non salary levers, and your realistic options for the two hardest replies.",
    followUps: [
      "They came back at 76k and said the band is fixed. Given my constraints, what are my options and which of the non salary levers is cheapest for them?",
      "My other process just made an offer at 80k. Rework the three numbers with that as a real alternative rather than a hypothetical one.",
      "Turn the evidence file into four short factual statements I could say in my own words, with no persuasion language.",
    ],
    pitfalls: [
      "People paste a salary aggregator number as market data without noting the source or the level. The range then looks sourced and is not, which is worse than an admitted gap.",
      "The decline number gets set at the current salary out of habit. It should reflect what you would genuinely do, including staying put, not what feels safe to type.",
      "Asking the model to write the actual sentences defeats the design. It will refuse, and if you insist on another tool doing it you will freeze on the reply you did not rehearse.",
    ],
  },

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Give GPT-5.2 a single recruiter comment and it builds a tidy range with a midpoint, and nothing in the output distinguishes the supplied figure from the invented ones. Requiring two independent sources before any range appears is what makes the number defensible in the actual conversation. Gemini 3 Pro suggests hinting at other interest, a bluff no candidate can back, so implied competing offers are banned twice.",
  },

  article: {
    intro: [
      "A salary negotiation prompt that writes you a script has solved the easy part of the problem. Words are not what fail in an offer conversation. What fails is arriving without a number you can justify, without a range you can source, and without having decided what you would actually do if the answer is no.",
      "This produces preparation rather than dialogue: three numbers each carrying a reason, an evidence file connecting your work to what it saves them, non salary items priced in money, and an explicit marker wherever your market data is thin rather than a confident average invented on your behalf.",
      "You still have to say it yourself, which is deliberate. A sentence you assembled is one you can defend when the reply is not the one you were expecting.",
    ],

    sections: [
      {
        heading: "A script is the wrong artefact",
        body: [
          "Scripts break on the second turn. You deliver the line, the recruiter says something that was not in the script, and you are improvising regardless, except now from a worse position because you have just lost your footing.",
          "Almost everything written about how to negotiate a job offer is phrasing advice, and phrasing is the last tenth of the problem. The rest is whether your number is defensible and whether you know your alternative. A person holding both can negotiate clumsily and still land well. A person holding neither cannot be rescued by a good opening line.",
          "An ai prompt for preparing a salary conversation should therefore spend its output on your inputs, not on your sentences.",
        ],
      },
      {
        heading: "Three numbers, each with a basis",
        body: [
          "The salary negotiation prompt requires target, acceptable and decline, and will not record any of them without a stated basis. A target with no basis is a wish, and it comes apart the moment a recruiter asks how you arrived at it.",
          "Deciding your walk away point on an offer is the only piece of this you must finish before the phone rings. It is also the piece people skip, because naming the figure at which you would say no means looking honestly at your savings, your notice period and whether anything else is genuinely in play.",
          "Once it exists the conversation gets easier rather than harder. You stop trying to win and start checking whether this offer clears a line you drew calmly, at a desk, without anybody waiting for you to speak.",
        ],
      },
      {
        heading: "Building the evidence file",
        body: [
          "Building an evidence file before an offer call takes about an hour and changes the register of the whole conversation. It is not a list of accomplishments. It is a short set of items connecting what you have done to what it is worth to this employer in this specific role.",
          "Two independent sources beat one, and a figure they could look up beats one they cannot. Where you have nothing the prompt marks the gap instead of filling it, because a range you cannot defend is worse than saying you are still gathering data.",
          "The strongest lever is usually internal comparison, and candidates hold it more often than they realise. If the advertisement carried a band, the band is data. If somebody doing the job told you their number, that is data too, and it is the kind that does not get argued with.",
        ],
      },
      {
        heading: "Using the salary negotiation prompt on the expectations question",
        body: [
          "The question of what to say when asked your salary expectations lands early, usually from a recruiter on a screening call, before you know enough about the role to answer it well. The prompt prepares two responses: a deferral with a reason, and a sourced range, because a deferral only works about twice.",
          "Naming a range too early anchors you low. Refusing three times reads as awkward. The workable position is to defer once, then give a range built from your data with your target sitting near its lower end, which is what the prompt assembles from what you found rather than from a rule of thumb.",
        ],
      },
      {
        heading: "Levers that are not salary",
        body: [
          "Sign on payments, notice buyout, equity refresh timing, a review at six months instead of twelve, title, and remote days all carry a money value, and the prompt makes you attach a figure to each before the call. Two extra days at home might be worth four thousand to you and cost the employer nothing at all.",
          "Pricing them prevents the common failure where a candidate accepts a soft concession because it sounded generous in the moment and later works out it was worth nothing.",
        ],
      },
    ],

    table: {
      caption: "The three numbers, and what each is for",
      headers: ["Number", "What it is", "Where the basis comes from"],
      rows: [
        ["Target", "What you ask for first", "Upper part of your sourced range"],
        ["Acceptable", "What you would sign without hesitation", "Range midpoint plus your priced levers"],
        ["Decline", "The point at which you say no", "Your constraints and your real alternative"],
      ],
    },

    howTo: {
      name: "How to use the salary negotiation prompt",
      steps: [
        {
          name: "Gather market data before an offer exists",
          text: "Two sources at minimum, each with a note on where it came from. Doing this afterwards means doing it under time pressure with a number already anchored in your head.",
        },
        {
          name: "Write the decline number down",
          text: "On paper, with its reason beside it. A figure held only in your head drifts during the call, always in one direction.",
        },
        {
          name: "Put a price on the soft items",
          text: "Every non salary lever gets a number. If you cannot produce one, it is a preference rather than a lever and should not be traded as though it were.",
        },
        {
          name: "Rehearse the reply you did not plan for",
          text: "Work through the case where they tell you the band is fixed. It is the most common response and the one most preparation quietly ignores.",
        },
      ],
    },

    faq: [
      {
        question: "What if I cannot find any market data?",
        answer:
          "Then the range is marked unsourced and you negotiate on your constraints and your leverage instead. Advertised bands for similar roles, a recruiter working that market, and anyone you know doing the job are all faster to reach than published surveys and often more accurate.",
      },
      {
        question: "Should I ever name a number first?",
        answer:
          "Once you have a sourced range, yes, and usually as a range rather than a point. Going first anchors the discussion, which helps when your data is solid and hurts when it is guesswork, which is exactly why the sourcing rule comes before the number.",
      },
      {
        question: "Does a salary negotiation prompt work for an internal raise?",
        answer:
          "Mostly. The evidence file and the three numbers transfer directly, but your alternative is weaker and both sides know it, so internal cases lean harder on documented results over a defined period and on what replacing you would actually cost.",
      },
      {
        question: "What if they say the band is fixed?",
        answer:
          "Sometimes it is. Move to the priced levers, ask what would need to be true for a band exception, and get any six month review commitment written into the offer letter rather than agreed verbally, because verbal review promises rarely survive a manager change.",
      },
      {
        question: "How hard can I push before the offer is at risk?",
        answer:
          "One counter with a stated basis almost never costs an offer, and in eleven years I have seen a withdrawal follow a reasonable counter twice, both times at employers with other problems. Repeated counters after a firm final answer are a different matter.",
      },
    ],

    internalLinks: [
      {
        href: "/career-prompts/interview-answer-prompt",
        label: "interview answer prompt",
        description:
          "The facts you confirmed while rehearsing are the same facts the evidence file needs, so do that first.",
      },
      {
        href: "/career-prompts/resignation-letter-prompt",
        label: "resignation letter prompt",
        description:
          "Once a number clears your line, the notice period you promised in the offer call becomes a real constraint.",
      },
      {
        href: "/sales-prompts/pricing-negotiation-prompt",
        label: "pricing negotiation prompt",
        description:
          "The same trade rather than concede discipline, applied where the thing being priced is a contract instead of a person.",
      },
    ],

    externalLinks: [
      {
        href: "https://www.bls.gov/oes/",
        label: "US Bureau of Labor Statistics: Occupational Employment and Wage Statistics",
        description:
          "A published wage source you can cite by name, which is what turns an asserted range into a sourced one.",
      },
      {
        href: "https://www.dol.gov/general/topic/wages",
        label: "US Department of Labor: Wages",
        description:
          "Primary reference on pay rules and disclosure obligations that shape what an employer can and cannot tell you about a band.",
      },
      {
        href: "https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer",
        label: "Harvard Business Review: 15 rules for negotiating a job offer",
        description:
          "The standard account of why alternatives and framing matter more than wording in an offer conversation.",
      },
      {
        href: "https://platform.openai.com/docs/guides/prompt-engineering",
        label: "OpenAI: Prompt engineering guide",
        description:
          "Explains the structured output and refusal instructions used to stop the model filling missing market data with an estimate.",
      },
    ],
  },
};

export default meta;
