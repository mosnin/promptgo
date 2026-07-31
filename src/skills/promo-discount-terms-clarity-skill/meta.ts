import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Promo Discount Terms Clarity Check

Use this skill whenever you are given a promotional offer's real terms
(discount amount, start and end dates, eligible products or categories,
exclusions, stacking rules, redemption method) plus the actual customer
facing copy drafted for two or more channels, such as an email, a landing
page, a social post, and an in-store sign, and you need to check whether
every channel states the same terms.

## Before you check anything

Require two real inputs from the user, and do not proceed without both:

1. The source of truth: the actual approved terms for the offer, as
   drafted internally, not a general description of what a promo like this
   usually includes.
2. The actual per-channel copy: the literal text each channel is running
   or planning to run, for at least two channels.

If either input is missing, ask for it directly. Never invent a plausible
expiry date, exclusion list, discount percentage, eligible product category,
or stacking rule to fill a gap. If the source of truth itself never states a
given dimension, that is a finding to report ("no exclusions were specified
in the source terms"), not a blank you fill in with a guess about what a
typical promo of this kind would exclude.

## Building the term matrix

Work through six standard term dimensions, in this order: discount amount,
start date, end date, eligible products or categories, exclusions, stacking
rules, and redemption method (that is seven items; treat start and end date
as two separate checks since they fail independently in real copy).

For each dimension:

1. Quote exactly what the source of truth says about it. If it says nothing,
   record "not specified in source terms."
2. Quote exactly what each supplied channel says about that same dimension.
   If a channel's copy never mentions it, record "not stated" for that
   channel rather than assuming the channel intends to match the source of
   truth by default.
3. Compare the quotes word for word, not by paraphrased meaning. A date
   written as "through November 5" and a date written as "through November 8"
   are a contradiction even though both are plausible sounding end dates.

## The three flag types

A channel is flagged against a dimension when its stated version is one of:

- **Missing**: the source of truth defines the dimension, but the channel's
  copy never mentions it at all.
- **Vaguer**: the channel states the dimension in less specific terms than
  another channel or than the source of truth, for example "some exclusions
  apply" where the source of truth or another channel names the excluded
  items explicitly.
- **Contradictory**: the channel states a different date, amount, product
  list, or rule than the source of truth or another channel states.

Every flag must quote the exact conflicting or missing text from each side
being compared, side by side, not a paraphrase or summary of the difference.
A flag that says "the dates do not match" without quoting both versions is
not a complete flag under this skill.

## Output format

Produce one row per dimension per channel, structured as:

\`Dimension | Source of truth (quoted) | Channel (quoted) | Status\`

Followed by a short list of every flagged mismatch, each written as: the
dimension, the two exact quotes being compared, which channels or source
they came from, and the flag type (missing, vaguer, or contradictory).
Channels that match the source of truth on every dimension should still be
listed as a clean pass, so the check is visibly complete rather than a list
of only the problems found.

## What this skill does not do

It does not guess at what the terms of the offer should be, invent a
typical exclusion list, assume a discount rounds to a common figure, or
extend a stated end date to seem more generous. It also does not rewrite
the channel copy for you; it reports exactly where channels disagree so a
human can decide which version is correct and fix the others to match it.
If none of the supplied channels agree with the source of truth on a given
dimension, say so plainly rather than picking the majority version as if it
were confirmed correct.
`;

const WORKED_EXAMPLE_MD = `# Worked example: a four channel promo terms check

This example uses fabricated but realistic inputs, the same shape of real
terms and real per-channel copy this skill requires before it runs a check.

## The source of truth, as supplied by the user

\`\`\`
Offer: Loop and Co, 30 percent off outerwear
Discount: 30 percent off outerwear
Start date: November 1
End date: November 5
Eligible products: outerwear category only (coats, jackets, vests)
Exclusions: clearance items, gift cards
Stacking: cannot be combined with any other code or offer
Redemption: code LOOP30 at online checkout, automatic at register in store
\`\`\`

## The per-channel copy, as supplied by the user

**Email**
> 30% off all outerwear, November 1 to 5. Excludes clearance and gift
> cards. Use code LOOP30 at checkout. Cannot be combined with other offers.

**Landing page**
> Take 30% off outerwear now through November 5. Some exclusions apply.
> Enter LOOP30 at checkout.

**Social post**
> 30% OFF OUTERWEAR THIS WEEK ONLY! Code LOOP30 online or show this post
> in store!

**In-store sign**
> 30% Off All Outerwear! November 1 to 8. See associate for details.

## Term matrix

| Dimension | Source of truth | Email | Landing page | Social post | In-store sign |
|---|---|---|---|---|---|
| Discount amount | "30 percent off outerwear" | "30% off all outerwear" | "Take 30% off outerwear" | "30% OFF OUTERWEAR" | "30% Off All Outerwear" |
| Start date | "November 1" | "November 1 to 5" | not stated | "THIS WEEK ONLY" | "November 1 to 8" |
| End date | "November 5" | "November 1 to 5" | "through November 5" | "THIS WEEK ONLY" | "November 1 to 8" |
| Exclusions | "clearance items, gift cards" | "Excludes clearance and gift cards" | "Some exclusions apply" | not stated | not stated |
| Stacking | "cannot be combined with any other code or offer" | "Cannot be combined with other offers" | not stated | not stated | not stated |
| Redemption | "code LOOP30 online, automatic in store" | "Use code LOOP30 at checkout" | "Enter LOOP30 at checkout" | "Code LOOP30 online or show this post in store" | "See associate for details" |

## Flags

**Contradiction, end date, in-store sign versus source of truth and email.**
Source of truth states "November 5." Email states "November 1 to 5."
In-store sign states "November 1 to 8." The in-store sign extends the
promotion by three days beyond what both the source of truth and the email
state, which is a direct date contradiction, not a rounding difference.

**Vaguer, exclusions, landing page versus email.**
Email states the exclusions explicitly: "Excludes clearance and gift
cards." Landing page states only "Some exclusions apply," without naming
what is excluded. A customer reading only the landing page cannot tell
whether their item qualifies.

**Missing, exclusions, social post versus source of truth.**
Source of truth states exclusions: "clearance items, gift cards." The
social post text supplied, "30% OFF OUTERWEAR THIS WEEK ONLY! Code LOOP30
online or show this post in store!", does not mention exclusions at all.

**Missing, stacking rule, three channels versus source of truth.**
Source of truth states "cannot be combined with any other code or offer."
Only the email repeats this. The landing page, social post, and in-store
sign copy supplied above contain no stacking statement at all.

**Vaguer, start and end date, social post versus source of truth.**
Source of truth states specific dates: "November 1" and "November 5." The
social post states "THIS WEEK ONLY," which gives a reader no way to confirm
whether the offer is still running on any specific day.

**Redemption method, in-store sign versus source of truth.**
Source of truth states redemption is "automatic at register in store." The
in-store sign supplied says only "See associate for details," which does
not confirm the discount applies automatically and could cause an associate
unfamiliar with the promo to turn away an eligible customer.

## What a completed check states

A completed check under this skill lists every dimension for every channel,
including the ones that matched cleanly (discount amount matched across all
four channels with no flag), so the output reads as a full audit rather than
a list of only the problems this particular pass happened to notice.
`;

const meta: SkillMeta = {
  slug: "promo-discount-terms-clarity-skill",
  name: "Promo Discount Terms Clarity Check",
  title: "Promo Discount Terms Clarity Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks a real promotional offer's terms across email, landing page, social and in-store copy for missing, vaguer or contradictory dates, exclusions and rules, quoting the exact conflicting text from each channel.",

  seo: {
    primaryKeyword: "promo discount terms clarity skill",
    keywords: [
      "promo discount terms clarity skill",
      "free ai skill for promo terms",
      "downloadable discount terms checklist",
      "ai skill to check promo consistency",
      "promo terms consistency checklist for marketing teams",
      "cross channel discount terms guide",
    ],
    seoTitle: "Promo Discount Terms Clarity Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable promo discount terms clarity skill that compares email, landing page, social and in-store promo copy for missing, vague or contradictory terms.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check a promo across channels reliably default to summarising that the copy 'looks consistent' without quoting the actual dates, exclusions or stacking rules stated in each piece, and just as often fill a missing exclusion or expiry date with a plausible sounding guess rather than flagging that it was never stated. This skill's term matrix forces every dimension to be quoted from the real source terms and the real channel copy side by side, and requires an explicit 'not specified' or 'not stated' entry whenever a dimension is genuinely absent, rather than an assumption filling the gap.",
  },

  article: {
    intro: [
      "A promo discount terms clarity skill only earns its name if it checks real, supplied terms against real, supplied channel copy, not a general idea of what a discount promotion like this one probably says. Handed a discount amount and nothing else, most AI assistants will fill in a plausible exclusion list, a rounded expiry date, or a generic stacking rule, and present that guess as though it came from the actual offer. This skill is built to refuse that shortcut and to quote, not summarise, every mismatch it finds.",
      "It ships as two plain text files: a main instructions file and a worked reference example showing a full four channel check, with fabricated but realistic terms and copy and a set of flags that quote both sides of each conflict. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why a plausible sounding guess is worse than no check at all",
        body: [
          "A discount promotion's real terms live in a source document, not in what a promo like it usually includes. Two outerwear sales can both be '30 percent off' and still differ completely on which products qualify, whether clearance is included, and whether the code stacks with a loyalty discount. A model asked to check consistency without the real source terms and the real channel copy is comparing nothing to nothing, which is why this skill's first instruction is to require both before a single dimension is checked.",
          "When either input is missing, the skill says so and asks for it, rather than proceeding on an assumed set of terms. That is the difference between a free ai skill for promo terms worth trusting with a live promotion and a generic checklist that just sounds thorough.",
        ],
      },
      {
        heading: "The term matrix, dimension by dimension",
        body: [
          "Every comparison in this skill runs through the same seven checkable dimensions: discount amount, start date, end date, eligible products or categories, exclusions, stacking rules, and redemption method. Each dimension gets its own row, with the source of truth's exact wording quoted next to each channel's exact wording, so a reviewer can see the comparison rather than trust a summary of it.",
          "A downloadable discount terms checklist with named, quotable rows is what turns 'the channels seem aligned' into something checkable: a specific dimension, a specific quoted mismatch, a specific channel.",
        ],
      },
      {
        heading: "The three ways a channel can fail a check",
        body: [
          "A channel is flagged as missing when the source of truth defines a dimension the channel never mentions at all, as vaguer when a channel states a dimension in weaker terms than another channel or the source of truth, and as contradictory when a channel states a different date, amount, product list, or rule outright. Sorting flags into these three types keeps the output specific about what kind of gap was found, not just that a gap exists.",
        ],
      },
      {
        heading: "How the flag itself must be written, as an ai skill to check promo consistency",
        body: [
          "Every flag quotes the exact text from each side, side by side, not a paraphrase. 'The end dates do not match' is not a usable flag under this skill; 'source states November 5, in-store sign states November 8' is. That discipline lets a marketing team fix the actual wrong line rather than re-reading every channel to find it.",
          "Channels that match the source of truth on a given dimension are still listed as a clean pass, so the output reads as a complete audit across every dimension and every channel rather than a partial list of only the problems this pass happened to catch.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "This skill does not invent what the terms of a promotion should be, does not assume a rounded expiry date, and does not pick the majority version among disagreeing channels and treat it as confirmed correct. It also does not rewrite the channel copy; it reports where the channels disagree so a human can decide which version is right and correct the rest to match it.",
        ],
      },
      {
        heading: "How to use the downloaded files as a promo terms consistency checklist for marketing teams",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file explicitly points to the worked reference example by its relative path. Keeping them in the same folder structure they were downloaded in, SKILL.md alongside a reference folder, preserves that reference for a future check on a different promotion.",
          "Used this way, the two files function as a cross channel discount terms guide, since the term matrix is built to compare as many channels as the offer actually runs on.",
        ],
      },
    ],
    howTo: {
      name: "How to use the promo discount terms clarity skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what the term matrix and flag format look like before you hand anything to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather the real source terms and the real channel copy",
          text: "Before using the skill, collect the offer's approved terms exactly as drafted, plus the literal text running or planned for at least two channels, such as email, a landing page, a social post, and an in-store sign.",
        },
        {
          name: "Run the check and review the flags",
          text: "Hand both files, the source terms, and the channel copy to your assistant, then read each quoted flag against the original text to confirm the mismatch before editing any channel.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only have the terms for one channel, not the source document itself?",
        answer:
          "The skill asks for the actual source of truth terms before running a check, since comparing channels only to each other without a source document can hide the case where every channel agrees on a term that was never actually approved. If no separate source document exists, say so, and the strongest available channel copy can be used as a stand in, clearly labelled as such rather than treated as confirmed correct.",
      },
      {
        question: "Will the skill guess an expiry date or exclusion if the source terms do not state one?",
        answer:
          "No. If a dimension is not specified in the source terms, the skill records that explicitly as not specified rather than filling it in with a plausible sounding guess about what a typical promotion of this kind would include or exclude.",
      },
      {
        question: "Does the skill tell me which channel's version is the correct one?",
        answer:
          "No. It reports exactly where channels disagree with the source terms or with each other, quoting both sides, and leaves the decision about which version is correct to the person running the check, since that decision usually depends on which channel was approved most recently.",
      },
      {
        question: "Can it check more than four channels at once?",
        answer:
          "Yes. The term matrix and flag process work the same way regardless of how many channels are supplied, adding one column per channel; the worked example uses four channels because that is a common real world spread, not a fixed limit.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and nothing about the promotional terms or copy you eventually use the skill with is ever sent anywhere by this site.",
      },
      {
        question: "How is this different from a discount stacking calculator?",
        answer:
          "A discount stacking calculator computes the resulting price when two discounts are applied together. This skill does not compute prices at all; it checks whether the channels describing an offer, including any stacking rule, state that rule the same way, which is a wording and consistency question rather than an arithmetic one.",
      },
      {
        question: "What if two channels both look complete but still disagree?",
        answer:
          "That is exactly the case this skill is built to catch. Two channels can each individually read as a finished, professional piece of copy while stating different end dates or different exclusion lists, and a side by side quoted comparison against the source terms is what surfaces that kind of disagreement.",
      },
    ],
    internalLinks: [
      {
        href: "/promo-prompts/flash-sale-announcement-prompt",
        label: "flash sale announcement prompt",
        description: "For drafting a single channel's promo copy in the first place, before running that copy through this skill's cross-channel check.",
      },
      {
        href: "/promo-prompts/giveaway-rules-terms-prompt",
        label: "giveaway rules and terms prompt",
        description: "For drafting a full set of promotional terms from scratch, which then becomes the source of truth this skill compares channel copy against.",
      },
      {
        href: "/tools/discount-stacking-calculator",
        label: "discount stacking calculator",
        description: "Computes the resulting price when two discounts combine; this skill checks whether channels state a stacking rule consistently, it does not calculate prices.",
      },
      {
        href: "/tools/free-shipping-threshold-calculator",
        label: "free shipping threshold calculator",
        description: "Computes the order value needed to reach a shipping threshold; a distinct arithmetic tool from this skill's wording and consistency check.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.ftc.gov/legal-library/browse/rules/guides-against-deceptive-pricing",
        label: "FTC Guides Against Deceptive Pricing",
        description: "The federal guidance behind why a promotion's stated discount, exclusions and dates need to match what a customer actually experiences at redemption.",
      },
      {
        href: "https://www.asa.org.uk/type/non_broadcast/code_section/03.html",
        label: "UK Advertising Standards Authority: Pricing rules",
        description: "An independent regulator's rules on stating discount conditions, availability and exclusions clearly and consistently in promotional marketing.",
      },
      {
        href: "https://www.nngroup.com/articles/omnichannel-experience/",
        label: "Nielsen Norman Group: Omnichannel Experience",
        description: "Background on why customers experience a brand's promotions as one continuous message across channels, even when each channel was drafted separately.",
      },
      {
        href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/reduce-hallucinations",
        label: "Claude Docs: Reduce hallucinations",
        description: "Background on why a model should state that information is missing rather than filling a gap with a plausible guess, the same discipline this skill applies to unstated terms.",
      },
    ],
  },

  tags: ["marketing", "promotions", "discounts", "consistency", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
