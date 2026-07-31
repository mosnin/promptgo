import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# UTM Campaign Naming Convention Check

Use this skill whenever you are asked to check a newly proposed set of UTM
parameters for consistency, or to write down what a team's UTM naming
convention actually is before a new campaign goes live.

## Before you check or write anything

Ask for, or locate, a set of the team's own real existing UTM tagged URLs,
at least five and ideally more, pulled from links that have actually been
sent: a newsletter archive, an ads platform export, a shared tracking
spreadsheet. Do not apply a generic best practice UTM convention from
training data, a style guide remembered from elsewhere, or a personal
preference for lowercase and underscores. A convention is only real if it
is what this specific team has actually been doing.

If fewer than three real examples are supplied, say plainly that the sample
is too small to derive a reliable convention, and ask for more links rather
than guessing from a handful of URLs or filling the gap with a generic
standard.

## Deriving the convention

For each supplied URL, extract utm_source, utm_medium, utm_campaign,
utm_term and utm_content, then look across all of them for:

1. Case style: all lowercase, all uppercase, or mixed, per parameter.
2. Delimiter: hyphens, underscores, or no separator, per parameter.
3. What utm_campaign actually holds versus what utm_content holds, since
   teams differ on whether a variant name belongs in one or the other.
4. Whether a date or quarter appears, and in what format if it does
   (YYYYMM, a quarter tag, a month name).

State the derived position on each of these four points as a plain
sentence, and cite the specific example URL or URLs that establish it.
Never state a position that is not backed by a cited example.

## When the real examples disagree with each other

If two or more of the supplied URLs contradict each other on the same
point (one uses hyphens, another underscores, with no clear split by
channel or date), say so honestly. Quote both conflicting examples and
state that the team's own history does not establish a single convention
on that point, rather than picking whichever pattern occurs more often
and presenting it as settled. A majority of three against one is still
worth naming as a majority, not as an established rule, unless the team
confirms which one is intended going forward.

## Checking a newly proposed UTM parameter set

Given a new set of proposed utm_source, utm_medium, utm_campaign, utm_term
and utm_content values, compare each one against the derived convention
point by point. For every mismatch, name the specific parameter, quote
the value that breaks the pattern, and cite the specific existing URL
that establishes the pattern being broken. Do not produce a vague "this
looks off" comment; every flag must trace to one derived point and one
cited example.

## What this skill does not do

It does not build or encode a single tracking URL; that is a separate,
mechanical task handled by a link building tool, not a naming convention
review. It does not recommend an industry standard UTM format when the
team has not shown one in its own links. And it never resolves a genuine
disagreement among the team's own examples by inventing a tie breaker;
that decision belongs to the team, not to a guess.
`;

const WORKED_EXAMPLE_MD = `# Worked example: deriving and checking a UTM naming convention

This file walks through the skill end to end on one small, realistic set
of links, so the process in SKILL.md can be checked against a concrete
case rather than read about in the abstract.

## Step 1: the team's real existing tagged links

Six links, pulled from an actual newsletter sending tool export:

- https://example.com/spring-sale?utm_source=newsletter&utm_medium=email&utm_campaign=2026q1_spring_sale&utm_content=hero_button
- https://example.com/spring-sale?utm_source=newsletter&utm_medium=email&utm_campaign=2026q1_spring_sale&utm_content=footer_link
- https://example.com/webinar?utm_source=newsletter&utm_medium=email&utm_campaign=2026q2_webinar_signup&utm_content=header_cta
- https://example.com/webinar?utm_source=linkedin&utm_medium=social&utm_campaign=2026q2_webinar_signup&utm_content=carousel_slide2
- https://example.com/summer-sale?utm_source=newsletter&utm_medium=email&utm_campaign=2026Q3-summer-sale&utm_content=hero_button
- https://example.com/referral?utm_source=partner&utm_medium=affiliate&utm_campaign=2026q3_referral_push&utm_content=banner_a

## Step 2: the derived convention

- Case: utm_source, utm_medium and utm_content are lowercase in all six
  links. utm_campaign is lowercase in five of the six; the summer sale
  link uses an uppercase Q and hyphens instead of underscores.
- Delimiter: utm_campaign and utm_content both use underscores between
  words in five of the six links.
- Date format: every utm_campaign opens with a four digit year followed
  by a lowercase q and a single digit quarter (2026q1, 2026q2, 2026q3),
  again with the one exception noted below.
- What utm_campaign holds: a quarter tag plus a short name for the push
  (spring_sale, webinar_signup, referral_push). What utm_content holds:
  the specific placement or creative within that push (hero button,
  footer link, header cta, carousel slide, banner).

## Step 3: naming the one real inconsistency

The summer sale link (2026Q3-summer-sale) breaks both the case and the
delimiter pattern the other five links establish. This is named plainly
as a genuine inconsistency in the team's own history rather than folded
silently into the convention or treated as the version that should win.

## Step 4: checking a new proposed set

Proposed for an autumn push: utm_source=newsletter, utm_medium=email,
utm_campaign=2026Q4-autumn-sale, utm_content=Hero_Button.

Checked against the derived convention:

- utm_source and utm_medium match the established pattern exactly.
- utm_campaign repeats the same uppercase Q and hyphen pattern as the
  one inconsistent example (2026Q3-summer-sale) rather than the
  lowercase, underscore pattern five of the six links establish. Flagged,
  citing 2026q1_spring_sale as the pattern it should follow instead.
- utm_content (Hero_Button) breaks the established lowercase rule that
  every prior utm_content value follows (hero_button, footer_link,
  header_cta). Flagged, citing hero_button from the spring sale links.
`;

const meta: SkillMeta = {
  slug: "utm-campaign-naming-skill",
  name: "UTM Campaign Naming Convention Check",
  title: "UTM Campaign Naming Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that derives a team's actual UTM naming convention from its own real tagged links, then checks a newly proposed campaign's parameters against that derived pattern instead of a generic best practice.",

  seo: {
    primaryKeyword: "utm campaign naming skill",
    keywords: [
      "utm campaign naming skill",
      "utm naming convention checklist",
      "ai skill for consistent utm tagging",
      "how to check utm parameter consistency",
      "downloadable utm campaign naming guide",
    ],
    seoTitle: "UTM Campaign Naming Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable utm campaign naming skill that derives your team's real UTM tagging convention from existing links and flags new inconsistencies.",
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
      "Models asked to check UTM parameters for consistency reliably default to applying a generic lowercase and underscore convention pulled from training data, whether or not that matches the team's own history. This skill's derivation step forces every stated position on case, delimiter or date format to trace to a specific supplied link, and requires the skill to name a genuine disagreement among a team's own examples rather than silently resolving it into a single invented rule.",
  },

  article: {
    intro: [
      "A utm campaign naming skill only earns its keep if the convention it enforces is the team's actual convention, not a generic best practice pulled from training data. Handed a new campaign's proposed parameters and nothing else, most AI assistants will confidently apply the lowercase and underscore pattern they have seen most often in public examples, whether or not that is what this specific team has ever actually used. This skill is built to refuse that shortcut.",
      "It ships as two plain text files: a main instructions file and a worked reference file that runs the whole derivation and check end to end against six sample links. Every file previews in full right here before download, so what loads on this page is exactly what lands in the archive.",
    ],
    sections: [
      {
        heading: "Why a generic UTM convention is not this team's convention",
        body: [
          "Two teams can tag campaigns for the exact same channel and still land on completely different conventions, one all lowercase with underscores and a quarter prefix, the other mixed case with hyphens and a full date. An ai skill for consistent utm tagging that reaches for a remembered best practice instead of the team's own history will happily overwrite something that has worked for two years with something that merely sounds standard.",
          "This skill's first instruction is to gather the team's own real, previously sent UTM tagged links before checking or writing anything, and to say plainly when too few examples exist to derive a reliable pattern rather than filling the gap with an invented standard.",
        ],
      },
      {
        heading: "How this differs from the UTM link builder tool",
        body: [
          "A UTM link builder takes one destination URL and one set of parameter values and produces one correctly encoded tracking link; it has no memory of any other link a team has ever made. This skill does the opposite job: given many of those already built links, it works out the pattern behind them, then checks whether a newly proposed set of values continues that pattern or breaks it.",
          "The two are complementary rather than overlapping. Deriving the convention here first, then handing the agreed source, medium and campaign values to a link builder to encode correctly, keeps the naming decision and the URL encoding as two separate, checkable steps instead of one tool quietly doing both.",
        ],
      },
      {
        heading: "What a derived utm naming convention checklist actually captures",
        body: [
          "Four things, each traced to specific supplied links rather than assumed: case style per parameter, the delimiter used between words, what utm_campaign is expected to hold versus what utm_content is expected to hold, and whether a date or quarter appears and in what format. None of these get a default answer; each is read off the examples that were actually supplied.",
          "A utm naming convention checklist built this way looks different for every team, because it is only ever a description of what that team has already done, not a list of properties any UTM link should have in general.",
        ],
      },
      {
        heading: "Checking a newly proposed UTM parameter set against the derived pattern",
        body: [
          "Given a new campaign's proposed source, medium, campaign, term and content values, the skill compares each one against the convention derived in the previous step, parameter by parameter. A value that matches gets confirmed with no further comment; a value that breaks the pattern gets named specifically, quoted, and paired with the exact existing link that establishes the pattern it departs from.",
          "That is how to check utm parameter consistency without resorting to a vague sense that something looks off: every flag in the output can be traced back to one derived point and one cited real link, the same discipline the checklist itself was built with.",
        ],
      },
      {
        heading: "When the team's own links disagree with each other",
        body: [
          "Real campaign history is rarely perfectly consistent. A quarter's worth of links might mostly use lowercase and underscores, with one outlier from a rushed campaign that used mixed case and hyphens instead. This skill names that outlier as a genuine inconsistency rather than quietly overriding it or averaging it away into a compromise nobody actually uses.",
          "A three to one split is described as a majority, not as a settled rule, unless the team confirms which pattern is meant to win going forward. Picking a winner without being asked to is exactly the kind of unchecked assumption this skill exists to avoid.",
        ],
      },
      {
        heading: "Using the files as a downloadable utm campaign naming guide",
        body: [
          "Hand both files to an AI assistant together, since the main instructions file's derivation and checking steps assume the worked reference file's example is available for comparison. Keeping the folder structure intact, SKILL.md alongside a reference folder, preserves that pointer exactly as downloaded.",
          "Used this way, a downloadable utm campaign naming guide is not a static style sheet to memorise once; it gets re derived from whatever real links are supplied each time it runs, so it stays current as a team's own practice evolves rather than fossilising the pattern from one snapshot.",
        ],
      },
    ],
    howTo: {
      name: "How to use the utm campaign naming skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what the derivation and checking process looks like before you hand it to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it entirely in your browser.",
        },
        {
          name: "Gather your team's real tagged links",
          text: "Before using the skill, pull at least five UTM tagged URLs the team has actually sent, from a newsletter tool export, an ads platform, or a shared tracking spreadsheet.",
        },
        {
          name: "Hand both files and your links to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply the real links to derive the convention from and the new parameter values to check against it.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if my team only has two or three tagged links to supply?",
        answer:
          "The skill says plainly that the sample is too small to derive a reliable convention rather than guessing from a handful of URLs. It asks for more real links before stating any position on case style, delimiter, or date format, since a pattern needs more than two or three points to be trustworthy.",
      },
      {
        question: "Does this utm campaign naming skill invent an industry standard convention when my links don't show one?",
        answer:
          "No. If the supplied links do not establish a clear position on a given point, the skill says so rather than filling the gap with a lowercase and underscore convention remembered from training data or a style guide it was never actually shown by this team.",
      },
      {
        question: "What if my team's existing links genuinely disagree with each other?",
        answer:
          "The skill names the disagreement honestly, quoting the conflicting examples and describing the split as a majority rather than a settled rule, instead of silently picking whichever pattern appears more often and presenting that choice as an established convention nobody actually agreed to.",
      },
      {
        question: "How is this different from just using the UTM link builder tool?",
        answer:
          "The UTM link builder encodes one link from one set of values and has no memory of any other link. This skill instead reads many of a team's already built links to work out the naming pattern behind them, then checks a newly proposed set of values against that pattern before a new link ever gets built.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the real campaign links you eventually check this skill against are ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain text, so they open in any editor. This page is a read only preview of the exact content that downloads; changes happen in your own editor or in this site's skill building tools, not on this page itself.",
      },
    ],
    internalLinks: [
      {
        href: "/tools/utm-link-builder",
        label: "utm link builder",
        description: "For encoding one destination link correctly once the naming convention has already been agreed, rather than deriving that convention in the first place.",
      },
      {
        href: "/skills/marketing-skills/campaign-brief-structuring-skill",
        label: "campaign brief structuring skill",
        description: "For structuring the plan a campaign's tagged links are eventually built to support.",
      },
      {
        href: "/skills/design-skills/component-naming-consistency-skill",
        label: "component naming consistency skill",
        description: "The same discipline of deriving a pattern from real examples, applied to a different naming problem: interface component names instead of UTM parameters.",
      },
      {
        href: "/promo-prompts/promo-code-naming-prompt",
        label: "promo code naming prompt",
        description: "For naming a single promo code well, a related but separate naming task from tagging campaign links consistently over time.",
      },
    ],
    externalLinks: [
      {
        href: "https://support.google.com/analytics/answer/10917952",
        label: "Google Analytics: Custom campaign parameters",
        description: "The canonical reference for what utm_source, utm_medium, utm_campaign, utm_term and utm_content are each meant to hold.",
      },
      {
        href: "https://blog.hubspot.com/marketing/what-are-utm-tracking-codes-ht",
        label: "HubSpot: UTM tracking codes and naming consistency",
        description: "An independent explainer on why case and delimiter consistency across a team's UTM links matters for clean reporting.",
      },
      {
        href: "https://ga-dev-tools.google/campaign-url-builder/",
        label: "Google: Campaign URL Builder",
        description: "Google's own reference tool for constructing one tagged link once a team's naming convention has already been agreed.",
      },
    ],
  },

  tags: ["marketing", "utm", "campaign tracking", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
