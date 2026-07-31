import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Ad Headline Length Audit

Use this skill when you are handed a batch of ad headlines that already exist and asked to
check whether any of them will be truncated on a named advertising platform. Do not use it to
write new headlines from scratch, and do not run a single check until the platform has been
stated. Auditing an existing batch and generating a new one are different jobs with different
disciplines, and this skill only does the first.

## The one question that comes before any check

Ask which real advertising platform, and where it matters which placement, the headlines are
destined for, before checking a single character. Google Search Ads, Meta Ads on the Facebook
Feed placement, LinkedIn Ads Sponsored Content, and Microsoft Advertising are four separate
platforms with four separately documented character limits, and the exact same headline can
pass on one and truncate on another. If the platform is not stated, ask for it plainly. Do not
default to a generic "safe" length such as "under 30 characters is usually fine" while the
platform remains unknown; a limit that is not tied to a named, real platform is not a limit,
it is a guess wearing a number.

If the person names a platform \`reference/platform-character-limits.md\` does not cover, say so
plainly, and ask them to state that platform's own documented character limit for the exact
field being audited, or point to where it can be confirmed, rather than estimating a figure by
analogy to a platform that is already covered.

## What you need before starting

1. The exact advertising platform, stated by name, for example Google Search Ads, Meta Ads,
   LinkedIn Ads, or Microsoft Advertising.
2. The specific placement, whenever the platform's limit varies by placement. Meta's Feed
   placement and its Stories placement recommend different headline lengths on the same
   platform, so the platform name alone is not always enough.
3. The batch of headlines to check, exactly as they will be entered into the ad platform, one
   per line, with no added or removed punctuation.

## Run the audit

For every headline in the batch, in order:

1. Count the exact number of characters in the headline, spaces included.
2. Look up the real character limit for the stated platform and placement in
   \`reference/platform-character-limits.md\`. Use the recommended length figure by default,
   since that is the point where the platform's own documentation says truncation risk actually
   starts, not only the absolute hard maximum the input field will accept.
3. Compare the exact character count against that limit.
4. Report the result for that headline in the exact format below, whether it passes or fails.

## How to report every finding

State four things for every headline, pass or fail, never fewer:

- The exact headline, quoted verbatim.
- Its exact character count.
- The named platform and placement, and the real character limit that applies to it, cited from
  the reference file.
- Whether the headline sits within that limit or risks truncation.

Never write a vague flag such as "this might be too long." A finding that does not name the
platform, quote the headline, and state both the character count and the actual documented
limit is not a finished audit, it is a guess wearing an audit's format.

## What this skill will not do

It will not check a headline against a remembered or assumed limit when no platform has been
named, and it will not treat one platform's limit as a stand in for another's, even when the
two look close. Google Search Ads and Microsoft Advertising both cap a responsive search ad
headline at 30 characters, but that is a coincidence between two specific, separately
documented platforms, not a rule to extend to a third platform that has never actually been
checked. Every flag traces to one named platform's own current documentation, cited by name, or
the audit states plainly that the limit could not be confirmed.
`;

const PLATFORM_LIMITS_MD = `# Ad Headline Character Limits by Platform

Use this alongside \`SKILL.md\`. The figures below are current character limits for headline
fields, drawn from each platform's own advertiser documentation. Ad platforms revise these
limits over time, so treat this table as a starting reference point and confirm against the
linked page directly whenever a campaign is high stakes or the number looks out of date against
what the platform's own ad interface currently shows.

## Google Search Ads (responsive search ads)

- Headline field: 30 characters maximum per headline, entered across 3 to 15 headlines per ad.
- Description field: 90 characters maximum per description.
- Display path field: 15 characters maximum per path segment.
- Source: Google Ads Help, "About responsive search ads."
- Note: every character in a double width language such as Korean, Japanese or Chinese counts
  as two characters against the limit.

## Microsoft Advertising (responsive search ads, Bing and partner network)

- Headline field: 30 characters maximum per headline, entered across 3 to 15 headlines per ad.
- Description field: 90 characters maximum per description.
- Source: Microsoft Advertising API documentation, "Entity Limits."
- Note: these figures mirror Google Search Ads for the same responsive search ad format, which
  makes reusing a headline batch across the two easy to check but never automatic.

## Meta Ads (Facebook and Instagram, image ad, Feed placement)

- Headline field: 27 characters recommended to avoid truncation in the Facebook Feed
  placement; the field technically accepts more text, but anything past this point risks being
  cut off in that specific placement.
- Primary text field: 50 to 150 characters recommended, shown above the image or video.
- Source: Meta, official Facebook Ads Guide, image ad specifications.
- Note: Meta's recommended length changes by placement. Stories and Reels placements recommend
  a shorter headline than Feed does, so the placement, not only the platform name, has to be
  confirmed before checking a batch.

## LinkedIn Ads (single image Sponsored Content)

- Headline field: 70 characters recommended to avoid truncation; 200 characters is the hard
  maximum the field will accept.
- Introductory text field: 150 characters recommended to avoid truncation; 3,000 characters is
  the hard maximum.
- Description field: 100 characters recommended to avoid truncation; 300 characters is the hard
  maximum.
- Source: LinkedIn Marketing Solutions Help, "Single image ads advertising specifications."

## Why the recommended figure, not only the hard maximum, is what to check against

Every platform above accepts more characters into the headline field than it recommends. The
hard maximum is the point where the platform's interface stops accepting further input; the
recommended figure is the point where the platform's own documentation says a real viewer, on a
real device and placement, starts losing the end of the headline to truncation. Checking only
the hard maximum waves through headlines that are technically valid and still get cut off in
front of the person they were written for, so this skill checks against the recommended,
truncation relevant figure by default. Still state the exact character count for every
headline, so whoever asked for the audit can apply their own risk tolerance if a launch has
already accepted the truncation risk for a specific line.

## When a stated platform is not in this table

Say so plainly, then ask the person to supply that platform's own documented character limit
for the exact field and placement being audited, or a link to that documentation, before running
the length check. Do not estimate a figure by analogy to a platform that is already in this
table; two platforms with visually similar ad units are shown above to use different limits for
what looks like the same field.
`;

const meta: SkillMeta = {
  slug: "ad-headline-length-audit-skill",
  name: "Ad Headline Length Audit",
  title: "Ad Headline Length Audit Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that checks a batch of ad headlines against a named platform's real, documented character limits and refuses to guess a limit when the platform is not stated.",

  seo: {
    primaryKeyword: "ad headline length audit skill",
    keywords: [
      "ad headline length audit skill",
      "free ai skill for ad headline length",
      "downloadable ad headline character limit checklist",
      "ai skill to check ad headline length",
      "ad headline checker for ai assistants",
    ],
    seoTitle: "Ad Headline Length Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable ad headline length audit skill that checks headlines against a named platform's real character limits before flagging truncation risk.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/platform-character-limits.md", content: PLATFORM_LIMITS_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to check ad headline lengths reliably default to a single remembered or generic character limit, often the old expanded text ad figure or a rounded guess, and apply it regardless of which advertising platform or placement the headlines actually belong to. This skill's reference table forces every flag to cite a specific platform's currently documented limit by name, and requires the skill to ask which platform is intended, rather than assume one, before a single headline is checked.",
  },

  article: {
    intro: [
      "An ad headline length audit skill only earns its name if every flag it produces traces back to the real, current character limit stated by the specific advertising platform the headlines are actually destined for. Handed a batch of headlines and asked whether they are safe to launch, most AI assistants will happily apply a single remembered number, often the wrong one for the platform in question, and call the result an audit. This skill is built to refuse that shortcut: it asks which platform and placement the headlines belong to first, and only then checks each line against that platform's own documented limit.",
      "It ships as two plain text files: a main instructions file and a reference table of real, currently documented character limits across common advertising platforms that the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why the limit must be platform-specific, not assumed",
        body: [
          "Google Search Ads, Meta Ads, LinkedIn Ads and Microsoft Advertising each publish their own separate character limits for a headline field, and those limits are not interchangeable even when two platforms happen to share a number. A headline that fits Google Search Ads at 30 characters can still overflow Meta's Feed placement recommendation of 27, or sit well inside LinkedIn's much larger allowance. Checking a headline without first knowing which of these it is bound for is not a shortcut, it is a coin flip dressed up as an audit.",
          "This is why the skill's first instruction is to ask which platform, and where relevant which placement, before running a single check. A free ai skill for ad headline length that skips this question is guessing at a number that happens to sound plausible, not auditing against anything real.",
        ],
      },
      {
        heading: "What this skill actually checks",
        body: [
          "Given a batch of existing headlines and a named platform, the skill counts the exact characters in each headline, looks up that platform's real recommended length in the reference file, and compares the two. Every result is reported per headline, not as a single pass or fail for the whole batch, so a mix of safe and risky lines in the same batch is never averaged into one vague verdict.",
          "This is deliberately narrow. The skill does not draft new headlines, and it does not rewrite the ones it audits; its whole job is to check a batch you already wrote and tell you, line by line, exactly what a reviewer holding the platform's real documentation would flag.",
        ],
      },
      {
        heading: "The real character limits behind every flag",
        body: [
          "The reference file is a downloadable ad headline character limit checklist covering Google Search Ads, Microsoft Advertising, Meta Ads and LinkedIn Ads, each entry sourced from that platform's own current advertiser documentation rather than a rounded rule of thumb. Google Search Ads and Microsoft Advertising both cap a responsive search ad headline at 30 characters across 3 to 15 headlines per ad; Meta recommends 27 characters for a Feed placement headline; LinkedIn recommends 70 characters before truncation risk, with a 200 character hard maximum.",
          "Where a platform's limit changes by placement, the reference file states which placement the figure applies to, since a single platform name is not always specific enough to pick the right number.",
        ],
      },
      {
        heading: "Why the recommended length, not just the hard maximum, is the one to check",
        body: [
          "Every platform in the reference table technically accepts more characters into a headline field than it recommends. The hard maximum is where the input field stops accepting text; the recommended figure is where the platform's own documentation says a real viewer on a real device actually starts losing the end of the headline to truncation. Checking only the hard maximum would pass headlines that are valid but still get cut off in front of the audience they were written for.",
        ],
      },
      {
        heading: "How every flag gets reported",
        body: [
          "For each headline, the audit states the exact quoted text, its exact character count, the named platform and placement, and the specific documented limit that applies, then states whether the line is within that limit or at truncation risk. An ai skill to check ad headline length that only says a line 'might be too long' has not actually run the check it claims to have run.",
        ],
      },
      {
        heading: "What happens when a platform is not in the reference table",
        body: [
          "The skill says so plainly rather than estimating a figure from a platform that looks similar. It asks for that platform's own documented character limit for the exact field being audited, or a link to where it can be confirmed, before running the length check at all. An ad headline checker for ai assistants is only trustworthy if it is honest about which limits it can actually confirm and which it cannot.",
        ],
      },
    ],
    howTo: {
      name: "How to use the ad headline length audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/platform-character-limits.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather your headline batch and confirm the platform",
          text: "Collect the exact headlines you want checked, one per line, and confirm the real advertising platform and placement they are destined for before you start.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the reference table, then state your platform and supply your batch for a per-line audit.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't tell the skill which platform the headlines are for?",
        answer:
          "The skill asks for the platform before checking anything, rather than defaulting to a generic length. Character limits differ by platform and by placement, so a check run without knowing the platform would only be applying a guess, and this skill's instructions explicitly forbid proceeding that way.",
      },
      {
        question: "Does this skill write new ad headlines?",
        answer:
          "No. It only audits a batch of headlines that already exist. Writing new headlines from a blank page is a different job with a different discipline, and mixing the two would make it unclear whether a passing result reflects the platform's real limit or a headline the skill quietly rewrote to fit.",
      },
      {
        question: "Which advertising platforms does the reference table cover?",
        answer:
          "Google Search Ads, Microsoft Advertising, Meta Ads on the Facebook Feed placement, and LinkedIn Ads single image Sponsored Content, each sourced from that platform's own current advertiser documentation rather than a rounded estimate that ignores platform differences entirely.",
      },
      {
        question: "What if I name a platform that isn't in the reference table?",
        answer:
          "The skill says so plainly and asks you to supply that platform's own documented character limit for the exact field being audited, or a link to it, rather than estimating a number by analogy to a platform that happens to look similar in the ad interface.",
      },
      {
        question: "Does the audit check the hard maximum a field accepts or the recommended length?",
        answer:
          "It checks against the recommended length by default, because that is the point where each platform's own documentation says truncation risk actually starts for a real viewer, not merely where the input field stops accepting further characters. The exact character count is still stated so a different risk tolerance can be applied if needed.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the headlines you eventually run through the skill are ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/tools/word-character-counter",
        label: "word character counter",
        description: "For counting the exact character length of a single headline by hand, the same measure this skill's length check runs automatically against a named platform's limit.",
      },
      {
        href: "/marketing-prompts/ad-copy-prompt",
        label: "ad copy prompt",
        description: "A natural source of the headline batch this skill's audit is meant to check before a launch, generating angle led variants rather than length checked ones.",
      },
      {
        href: "/skills/marketing-skills/email-subject-line-audit-skill",
        label: "email subject line audit skill",
        description: "A related downloadable skill applying the same discipline, checkable rules cited by name, to spam risk and length rather than ad platform truncation.",
      },
      {
        href: "/skills/marketing-skills/linkedin-headline-audit-skill",
        label: "linkedin headline audit skill",
        description: "For auditing a person's own LinkedIn profile headline against keyword and filler checks, a different job entirely from checking paid ad headlines against a platform's character limit.",
      },
    ],
    externalLinks: [
      {
        href: "https://support.google.com/google-ads/answer/7684791?hl=en",
        label: "Google Ads Help: About responsive search ads",
        description: "Google's own documentation stating the 30 character headline limit and 90 character description limit for responsive search ads.",
      },
      {
        href: "https://www.facebook.com/business/ads-guide/update/image",
        label: "Meta: Facebook Ads Guide, image ad specifications",
        description: "Meta's official ads guide stating the recommended headline and primary text lengths for an image ad in the Facebook Feed placement.",
      },
      {
        href: "https://www.linkedin.com/help/linkedin/answer/a426534",
        label: "LinkedIn Help: Single image ads advertising specifications",
        description: "LinkedIn's own advertising specifications stating the recommended and hard maximum character limits for headline, introductory text and description fields.",
      },
      {
        href: "https://learn.microsoft.com/en-us/advertising/guides/entity-hierarchy-limits?view=bingads-13",
        label: "Microsoft Learn: Microsoft Advertising entity limits",
        description: "Microsoft's own API documentation stating the 30 character headline limit for responsive search ads on Microsoft Advertising.",
      },
    ],
  },

  tags: ["marketing", "advertising", "ad copy", "character limits", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
