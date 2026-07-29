import type { PromptMeta } from "@/lib/types";

const meta: PromptMeta = {
  slug: "icp-definition-prompt",
  name: "Segment Filter",
  title: "ICP Definition Prompt",
  category: "sales-prompts",
  taskType: "analyse",
  summary:
    "Derives an account level filter from your won and lost deals, writes the disqualifiers out loud, and reports how many wins the filter would have rejected.",
  updated: "2026-07-29",
  published: "2026-07-29",
  tags: ["icp", "segmentation", "qualification", "territory planning"],

  seo: {
    primaryKeyword: "icp definition prompt",
    keywords: [
      "icp definition prompt",
      "ideal customer profile from closed won data",
      "disqualification criteria for sales prospecting",
      "how to narrow an ideal customer profile",
      "account level segmentation for b2b sales",
      "which accounts to stop selling to",
    ],
    seoTitle: "ICP Definition Prompt: Name Who You Will Not Sell To",
    seoDescription:
      "An ICP definition prompt that reads won, lost and churned accounts, writes explicit disqualifiers, and reports the wins its own filter would have rejected.",
  },

  prompt: {
    text: `You are a revenue operations analyst. You build account filters that a new rep can apply in half a minute, and you are hostile to any attribute that cannot be checked before a conversation happens.

ACCOUNTS THAT CLOSED AND STAYED: {{WON}}
ACCOUNTS THAT WERE LOST OR CHURNED: {{LOST}}
WHAT THE PRODUCT GENUINELY REQUIRES: {{REQUIREMENTS}}

Work at the account level throughout. Do not describe an individual buyer, their motivations or their beliefs. Firmographic, operational and structural attributes only.

STEP 1. Propose candidate attributes that are common in the won set and rare or absent in the lost set. Every attribute must be observable from a website, a jobs page, a filings record or a public profile. Reject anything you would only learn by speaking to them, and say why you rejected it.

STEP 2. For each surviving attribute give the count in each set, like 7 of 9 won, 1 of 14 lost. Mark any attribute supported by fewer than three won accounts as THIN and exclude it from the rule.

STEP 3. DISQUALIFIERS. List attributes that recur in the lost and churned set. Each needs at least two named examples. Phrase each as a stop instruction, not a caution.

STEP 4. THE RULE. At most three yes or no checks, in the order a rep would find them, answerable in thirty seconds from a website and a public profile.

STEP 5. COVERAGE AND COST. State what share of the won accounts the rule would have caught, and name every won account it would have wrongly rejected.

STEP 6. If fewer than eight won accounts were supplied, label the entire output HYPOTHESIS, NOT PROFILE at the top and keep it anyway.`,
    variables: [
      {
        token: "WON",
        label: "Accounts that closed and renewed",
        example:
          "11 accounts with headcount, sector, whether they run their own data team, billing system, region and how they first found us",
      },
      {
        token: "LOST",
        label: "Accounts lost, plus churned customers",
        example:
          "19 accounts with the same fields, plus stage lost at and the stated reason, including 4 who bought and churned inside a year",
      },
      {
        token: "REQUIREMENTS",
        label: "What the product actually needs to work",
        example:
          "At least 50k transactions a month, someone who can approve a database read replica, and no requirement for on premise deployment",
      },
    ],
    expectedOutput:
      "Counted attributes on both sides with thin ones excluded, a list of disqualifiers each backed by two named accounts, a three check routing rule, and an honest coverage figure naming the wins the rule would have turned away.",
    followUps: [
      "Apply the rule to this list of 40 target accounts and sort them into pursue, disqualify and cannot tell from public information.",
      "For each disqualifier, write the one sentence a rep says to end the conversation politely without burning the relationship.",
      "Re run the coverage step assuming we drop check three. What do we gain in volume and what do we let back in?",
    ],
    pitfalls: [
      "Supplying only wins produces a profile that describes your customers rather than distinguishing them, and the model will not tell you unless the lost set is there to contrast against.",
      "Attributes like values innovation or is data driven survive unless the observable test is enforced. If a rep cannot verify it from a public page in thirty seconds, it is not an attribute, it is a hope.",
      "The coverage step usually shows the rule rejecting one or two real wins. Do not tune the rule until it catches all of them, because a filter with no false negatives is not filtering.",
    ],
  },

  eeat: {
    author: "Marcus Bell",
    authorCredential:
      "Fifteen years in B2B outbound, most recently running a six person SDR team selling infrastructure software.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Step five was the addition that made this usable. Without it every model produced a rule that looked authoritative, and when I checked it by hand against our own closed won list it would have disqualified two of our largest customers. Making the model name those accounts itself turned an argument about the rule into a decision about which two exceptions we were willing to lose.",
  },

  article: {
    intro: [
      "An ICP definition prompt should end with fewer accounts on your list than it started with. Most of them do the opposite, producing a warm paragraph about mid market companies that value efficiency, which excludes nobody and therefore changes nothing about how a territory gets worked.",
      "The useful question is not who to sell to. Teams already have an answer to that and it is usually too broad. The question is how to narrow an ideal customer profile until it is a filter a new rep can apply without asking anyone, and that requires evidence from the accounts that did not work as much as from the ones that did.",
      "This works at the account level throughout. Not what a buyer believes or fears, which is a separate exercise, but what is true of the organisation and visible from outside before anyone picks up a phone.",
    ],

    sections: [
      {
        heading: "An ICP is a filter, not a description",
        body: [
          "A description tells you what your customers look like. A filter tells you which accounts to leave alone, which is the only version that saves anybody time. The test for any line an icp definition prompt produces is whether it would have caused someone to remove an account from a list.",
          "That test kills most conventional profiles immediately. Growing companies in regulated industries removes nothing. Companies with more than four hundred staff who run their own payroll in house removes a great deal, and can be checked in a minute.",
        ],
      },
      {
        heading: "The losses carry more information than the wins",
        body: [
          "Building an ideal customer profile from closed won data alone gives you a flattering portrait with no discriminating power, because the attributes shared by your customers are mostly shared by everybody else in the market too.",
          "Contrast is what creates the signal. An attribute matters when it is common among the accounts that stayed and rare among those that left, and you cannot know that without the second set. Churned customers are the most valuable rows of all, since they passed every filter you currently have.",
        ],
      },
      {
        heading: "Only attributes you can see before the first call",
        body: [
          "Account level segmentation for b2b sales fails in practice when the segments depend on things nobody can check. Budget authority, appetite for change and internal politics are real and they are all invisible from a website, so a rule built on them collapses into guesswork the moment a rep applies it.",
          "The observability constraint is therefore strict. Headcount, sector, the tools they advertise in job posts, whether they operate in one country or nine, whether they run something in house that you would replace. All checkable, all boring, all far more predictive than the interesting attributes.",
        ],
        subsections: [
          {
            heading: "Where to read the attributes from",
            body: [
              "Job postings are the richest single source, because a company that is hiring for a role has told you what it runs and what it lacks. Filings and registers give you structure and scale, and a status or engineering page tells you what they built themselves.",
            ],
          },
        ],
      },
      {
        heading: "Disqualifiers are the part teams refuse to write",
        body: [
          "Writing disqualification criteria for sales prospecting means committing, in advance and in public, to walking away from revenue. That is why most profiles quietly omit the section, and why the ones that include it are the ones that change behaviour.",
          "Each disqualifier here needs two named examples from your own lost or churned set, which turns the conversation about which accounts to stop selling to from a matter of opinion into a matter of record. Nobody argues with the pattern once the two account names are sitting next to it.",
        ],
      },
      {
        heading: "Why the icp definition prompt will not exceed your evidence",
        body: [
          "Any attribute supported by fewer than three wins gets marked thin and left out of the rule. This feels overly cautious with a small sample and it is the correct behaviour, because two coincidences dressed as a pattern will send a whole team after the wrong segment for a quarter.",
          "Below eight won accounts the entire output is labelled a hypothesis. It stays useful in that state. It just stops being something you can put in a territory plan and defend.",
        ],
      },
      {
        heading: "The thirty second routing rule",
        body: [
          "Three yes or no checks is a deliberate ceiling. A rule with seven conditions is a document, and documents are consulted for a fortnight and then remembered incorrectly. Three checks are memorised by the end of the first day.",
          "Ordering matters as much as content. The cheapest check goes first, so most accounts are resolved without opening a second tab, and the check that requires reading a jobs page goes last.",
        ],
      },
      {
        heading: "What the filter costs you, stated up front",
        body: [
          "The coverage step is where the icp definition prompt is least comfortable to read. It names the accounts you actually won that this rule would have thrown away, which is the real price of narrowing and the number people avoid calculating.",
          "Seeing it lets you make the trade knowingly. Losing one unusual win a year to save a hundred hours of prospecting is normally a good exchange, but it should be a decision someone made rather than a side effect nobody noticed.",
        ],
      },
    ],

    howTo: {
      name: "How to build the filter",
      steps: [
        {
          name: "Export both sets, with the same fields",
          text: "Wins and losses need identical columns or the contrast step has nothing to compare. Include churned customers in the loss set, tagged as such.",
        },
        {
          name: "Write down what the product truly requires",
          text: "The hard technical or operational floor, not the ideal conditions. This catches accounts that would have bought and then failed.",
        },
        {
          name: "Delete every attribute you cannot verify publicly",
          text: "Check each surviving attribute against a real prospect's website. If it takes more than a minute to answer, it does not belong in the rule.",
        },
        {
          name: "Argue with the coverage number, not the rule",
          text: "Look at the wins the rule rejects and decide whether they were repeatable or lucky. Only widen the filter for the repeatable ones.",
        },
      ],
    },

    faq: [
      {
        question: "How is this different from a buyer persona?",
        answer:
          "A persona describes a person: what they believe, what they fear and what would make them dismiss you. This describes an organisation and answers a different question, which is whether the account belongs on the list at all. Most teams need both, built separately and used at different moments.",
      },
      {
        question: "We have fewer than eight closed won accounts. Is the icp definition prompt still worth running?",
        answer:
          "Yes, and the output will be labelled a hypothesis, which is the honest description of anything derived from five data points. Use it to decide what to test rather than what to enforce, and re run it once the won set has grown enough to support real counts.",
      },
      {
        question: "Should the disqualifiers be shared with the whole sales team?",
        answer:
          "Share them widely, because a disqualifier only saves time if the person about to waste it has seen it. What should not circulate is the named examples, since those are specific accounts and specific reasons that read badly outside the analysis they came from.",
      },
      {
        question: "How often should this be rebuilt?",
        answer:
          "Twice a year is usually right, and immediately after any change to pricing, packaging or the product's hard requirements. Rebuilding more often produces churn in the routing rule, which costs more in confusion than it gains in accuracy.",
      },
    ],

    internalLinks: [
      {
        href: "/sales-prompts/account-research-prompt",
        label: "account research prompt",
        description:
          "What you run on the accounts that survive the filter, to find the specific trigger worth approaching them about.",
      },
      {
        href: "/sales-prompts/win-loss-analysis-prompt",
        label: "win loss analysis prompt",
        description:
          "Produces the stated and likely reasons behind each loss, which is the input that makes the disqualifier step credible.",
      },
      {
        href: "/sales-prompts/cold-email-prompt",
        label: "cold email prompt",
        description:
          "The downstream beneficiary. Outreach improves fastest when a third of the list is removed before anyone writes anything.",
      },
      {
        href: "/business-prompts/decision-memo-prompt",
        label: "decision memo prompt",
        description:
          "For writing up the narrowing decision itself, including the wins you have agreed to forgo and why that trade is acceptable.",
      },
    ],

    externalLinks: [
      {
        href: "https://hbr.org/2006/07/companies-and-the-customers-who-hate-them",
        label: "Harvard Business Review: Companies and the customers who hate them",
        description:
          "The case that some customer segments cost more than they return, which is the argument underneath writing disqualifiers at all.",
      },
      {
        href: "https://www.census.gov/naics/",
        label: "United States Census Bureau: NAICS",
        description:
          "The standard industry classification, useful when a sector attribute needs a definition two people would apply the same way.",
      },
      {
        href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        label: "Anthropic: Prompt engineering overview",
        description:
          "Covers the counted evidence and self reported coverage techniques that stop the model asserting a pattern from two examples.",
      },
    ],
  },
};

export default meta;
