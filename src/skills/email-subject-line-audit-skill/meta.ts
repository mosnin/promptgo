import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Email Subject Line Audit Skill

Use this skill when you are handed a batch of existing email subject lines
(and optionally their preview text) and asked to check them before a send,
not when you are asked to write new subject lines from scratch. Writing
subject lines is a different job with a different discipline; this skill
only audits lines that already exist.

## What you are given

Expect a list of subject lines, one per line or one per row of a table.
Preview text (also called preheader text) may or may not be supplied
alongside each subject line. If no preview text is supplied for a line, say
so plainly in your output rather than skipping the preview check silently.

## Run every subject line through three checks

For each subject line, run all three checks below in order. Do not stop at
the first flag; a single line can trip more than one rule.

1. **Spam-trigger pattern check.** Compare the line against
   \`reference/spam-trigger-patterns.md\`. That file lists checkable pattern
   categories: full ALL-CAPS words, excessive punctuation (multiple
   exclamation points or question marks stacked together), and common
   flagged phrases grouped by category (urgency, free or money claims,
   guarantee language). Flag a match only when the pattern is actually
   present in the line, and quote the exact offending substring, for
   example the specific word in caps or the specific phrase matched.
2. **Length check.** Count the characters in the subject line, including
   spaces. Compare that count against the truncation ranges in
   \`reference/spam-trigger-patterns.md\` (roughly 40 to 60 characters is
   where common inbox previews start cutting subject lines off, with mobile
   clients cutting earliest). State the character count and which range it
   falls into.
3. **Preview text redundancy check.** If preview text was supplied, compare
   its first several words against the subject line. If the preview text
   restates the subject line rather than adding new information, flag it as
   redundant and name the repeated words. If no preview text was supplied,
   state that this check could not run rather than marking it as passed.

## How to report findings

For every flagged line, state which of the three checks it failed, quote
the exact substring or character count that triggered the flag, and cite
the rule by name from \`reference/spam-trigger-patterns.md\`. Never write a
vague flag like "this might get flagged as spam." A flag with no cited
rule and no quoted substring is not a finished audit, it is a guess wearing
an audit's format.

For lines that pass all three checks, say so plainly rather than only
listing the failures, so the person reading the audit knows every line was
actually checked and not merely the ones with problems.

## The one thing this skill will not do

This skill does not predict whether a given subject line will actually
land in an inbox or a spam folder. Spam filtering is done by machine
learning systems, run by mail providers, that weigh hundreds of signals
together (sender reputation, authentication records, send volume,
recipient engagement history) and are retrained on a schedule this skill
has no visibility into. A subject line can match every known risk pattern
and still be delivered, or match none of them and still be filtered, because
the subject line is one signal among many and never the only one. State
this limitation plainly whenever an audit is handed back: what was checked
is risk patterns in the text itself, not an actual deliverability outcome.
Never phrase a finding as a guarantee, a prediction, or an inbox placement
promise.
`;

const SPAM_TRIGGER_PATTERNS_MD = `# Spam-trigger patterns and length reference

Use this alongside \`SKILL.md\`. Every pattern below is checkable against the
literal text of a subject line, not a judgment call about how a filter
might behave.

## ALL-CAPS words

A word written in full capital letters, three letters or longer, inside an
otherwise normal-case subject line reads as shouting to a human reader and
is one of the most commonly cited textual spam signals cited by mail
providers themselves. Flag the specific word, not the whole subject line,
so a line that is legitimately branded in caps for one short word is not
treated the same as a line shouting an entire sentence.

Do not flag short acronyms (three letters, a currency code, a well known
brand initialism) as though they were shouted words; note the distinction
in your output when it is ambiguous rather than silently deciding either
way.

## Excessive punctuation

Flag two or more exclamation points appearing together, or three or more
question marks appearing together, anywhere in the subject line. A single
exclamation point is not itself a flag; stacking is the checkable signal,
because stacked punctuation is what pattern-based filters and human
readers both treat as a marker of a pushy, low-trust message.

## Common flagged phrases, grouped by category

- **Urgency:** "act now", "last chance", "don't wait", "expires today",
  "final notice".
- **Free or money claims:** "free money", "cash bonus", "100% free", "no
  cost to you".
- **Guarantee and risk-reversal language:** "guaranteed", "risk free",
  "no obligation", "instant approval".
- **Vague clickbait:** "you won't believe", "this one trick", "click here
  now".

Match phrases as whole phrases, not single words inside them; "free
shipping" is not the same claim as "free money" and should not be flagged
under the same rule. When a subject line contains a phrase from this list,
quote the exact matched phrase in your output.

## Length and inbox preview truncation

Character counts below are counted including spaces, and are a rough
guide, not a hard cutoff enforced identically everywhere.

- Under 40 characters: unlikely to be truncated in most inbox list views,
  desktop or mobile.
- 40 to 60 characters: the range where many mobile inbox previews begin
  cutting subject lines off; the words after roughly the first 40
  characters are the ones most likely to be lost on a small screen.
- Over 60 characters: commonly truncated across both desktop and mobile
  previews, so treat anything past this range as very likely to lose its
  ending words entirely.

State the exact character count alongside which of these three ranges it
falls into, rather than only saying a line is "too long."

## Preview text redundancy

Preview text sits directly after the subject line in most inbox list
views and is prime space that a redundant preview wastes. Compare the
first eight to ten words of the preview text against the subject line. If
most of those words simply repeat the subject line's own wording, flag it
as redundant and name the repeated words, since that space could instead
extend the message with new information the subject line did not already
say.

## What none of this predicts

None of the checks above, alone or combined, predict whether a specific
mail provider's spam filter will actually deliver or block a specific
message. They flag known, checkable textual risk patterns only.
`;

const meta: SkillMeta = {
  slug: "email-subject-line-audit-skill",
  name: "Email Subject Line Audit",
  title: "Email Subject Line Audit Skill",
  category: "marketing-skills",
  summary:
    "A downloadable instruction pack that audits a batch of existing email subject lines against checkable spam-trigger patterns, length limits and preview text redundancy, and refuses to guarantee inbox deliverability.",

  seo: {
    primaryKeyword: "email subject line audit skill",
    keywords: [
      "email subject line audit skill",
      "free ai skill for email subject line audits",
      "downloadable spam trigger word checklist",
      "ai skill to check email subject lines for spam",
      "email subject line checker for ai assistants",
    ],
    seoTitle: "Email Subject Line Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable email subject line audit skill that checks a batch of subject lines against spam-trigger patterns, length and preview redundancy.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/spam-trigger-patterns.md", content: SPAM_TRIGGER_PATTERNS_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to review a batch of subject lines for spam risk reliably default to a vague hedge, a line that 'might trigger spam filters' or 'could look spammy,' without citing the specific word, phrase or punctuation pattern that caused the flag. This skill's checklist forces every flag to name a checkable pattern from a fixed reference list and quote the exact matched substring, and requires the audit to state plainly that a checked pattern is not a delivery prediction.",
  },

  article: {
    intro: [
      "An email subject line audit skill only earns its name if every flag it produces can be traced back to a specific, checkable rule. Handed a batch of subject lines and asked whether they are safe to send, most AI assistants will happily generate a confident sounding verdict that amounts to a guess dressed up as an audit. This skill is built to refuse that shortcut, checking each line against named spam-trigger patterns, a length range tied to real inbox truncation, and whether any supplied preview text just repeats the subject line instead of adding to it.",
      "It ships as two plain text files: a main instructions file and a reference checklist of specific spam-trigger patterns and length guidance the instructions point to. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "What this skill actually checks",
        body: [
          "Given a batch of existing subject lines, the skill runs three checks on each one: a spam-trigger pattern match against a fixed reference list, a character length check against common inbox preview truncation ranges, and a redundancy check between the subject line and its preview text where one was supplied. Every check produces a specific finding, not a general impression.",
          "This is deliberately narrow. The skill does not draft new subject lines, and it does not rewrite the ones it audits; its whole job is to check a batch you already wrote and tell you, line by line, exactly what a reviewer with the checklist in hand would flag. That narrowness is what makes it a free ai skill for email subject line audits rather than another generator wearing a checklist's name.",
        ],
      },
      {
        heading: "Spam-trigger word and phrase patterns",
        body: [
          "The reference checklist groups flagged language into named categories: urgency phrases, free-or-money claims, guarantee language and vague clickbait, plus two formatting patterns, ALL-CAPS words and stacked exclamation or question marks. A flag against any of these must quote the exact word, phrase or punctuation run that matched, never a paraphrase of the category name.",
          "A downloadable spam trigger word checklist only stays useful if it is specific enough to apply the same way twice. Grouping phrases by category, and requiring a whole-phrase match rather than a single risky word inside an otherwise safe phrase, is what keeps 'free shipping' from being flagged under the same rule as 'free money.'",
        ],
      },
      {
        heading: "Subject line length against inbox preview truncation",
        body: [
          "Character count is checked, spaces included, against three ranges: under 40 characters is unlikely to be cut off anywhere; 40 to 60 characters is where many mobile inbox previews start truncating; past 60 characters, truncation across both desktop and mobile previews is common enough to treat as the default expectation. The audit states the exact count alongside the range it falls into.",
        ],
      },
      {
        heading: "Checking preview text against the subject line",
        body: [
          "When preview text is supplied alongside a subject line, the skill compares the opening words of each. Preview text that mostly repeats the subject line's own wording wastes space that could instead extend the message with information the subject line did not already carry, so the audit names the repeated words and flags it as redundant.",
          "If no preview text was supplied for a given line, the audit says exactly that, that the check could not run, rather than silently marking it as passed. An email subject line checker for ai assistants is only trustworthy if it is honest about which checks it actually had the input to run.",
        ],
      },
      {
        heading: "Why this skill will not predict deliverability",
        body: [
          "Whether a message reaches an inbox or a spam folder is decided by machine learning systems run by mail providers, weighing sender reputation, authentication records, send volume and recipient engagement history together with the message content itself. None of that is visible to a text audit run against a list of subject lines, and none of it is retrained on any schedule this skill can see.",
          "So the skill states its limitation plainly, every time: it flags known, checkable risk patterns in the text itself, and it does not, and cannot, guarantee that a flagged line will be filtered or that a clean line will be delivered. Treat every finding from this ai skill to check email subject lines for spam as a risk pattern, never as a placement prediction.",
        ],
      },
      {
        heading: "How to run this on a batch of subject lines",
        body: [
          "Supply the full batch, one subject line per row, with preview text alongside each one where you have it. The skill checks every line against all three rules in turn and reports pass or fail per line, with the specific rule and substring cited for every flag, so nothing gets waved through on a general impression.",
        ],
      },
    ],
    howTo: {
      name: "How to use the email subject line audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/spam-trigger-patterns.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather your batch of subject lines",
          text: "Collect the subject lines you want checked before a send, along with any preview text you already have written for each one.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the checklist file, then supply your batch and read the per-line findings before you send.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill guarantee my subject lines won't go to spam?",
        answer:
          "No, and it says so explicitly. Spam filtering is decided by machine learning systems weighing sender reputation, authentication and engagement history alongside message text, none of which a text audit can see, so the skill only flags known risk patterns and never promises an inbox placement outcome.",
      },
      {
        question: "What counts as a spam-trigger phrase this skill flags?",
        answer:
          "Phrases grouped into named categories on the reference checklist: urgency language, free-or-money claims, guarantee and risk-reversal wording, and vague clickbait, matched as whole phrases rather than single risky words. Every flag quotes the exact matched phrase rather than describing the category in general terms.",
      },
      {
        question: "What subject line length does the audit check against?",
        answer:
          "It checks the character count, including spaces, against three ranges: under 40 characters is unlikely to be truncated, 40 to 60 characters is where mobile inbox previews commonly start cutting lines off, and past 60 characters truncation across most previews is common. The exact count and range are both stated.",
      },
      {
        question: "What happens if I don't have preview text for a subject line?",
        answer:
          "The skill states plainly that the redundancy check could not run for that line rather than marking it as passed by default. A missing input should never be silently treated as a clean result, so the audit output makes the gap visible instead of hiding it.",
      },
      {
        question: "Can this skill write new subject lines instead of auditing existing ones?",
        answer:
          "No, and that is a deliberate boundary. Writing subject lines from scratch calls for a generation prompt, not this audit skill; this skill's whole job is checking a batch of lines you already wrote against the fixed checklist, not drafting replacements for them.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the subject lines you eventually run through the skill are ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/marketing-prompts/email-subject-line-prompt",
        label: "email subject line prompt",
        description: "For generating new subject lines from scratch across five distinct hooks, rather than auditing a batch that already exists.",
      },
      {
        href: "/marketing-prompts/email-newsletter-prompt",
        label: "email newsletter prompt",
        description: "A natural source of the kind of subject line batch this skill's audit checklist is meant to run against before a send.",
      },
      {
        href: "/tools/word-character-counter",
        label: "word character counter",
        description: "For counting the exact character length of a single subject line by hand, the same measure this skill's length check runs automatically.",
      },
      {
        href: "/skills/marketing-skills/editorial-style-guide-enforcement-skill",
        label: "editorial style guide enforcement skill",
        description: "A related downloadable skill applying the same discipline, checkable rules cited by name, to house style rather than spam risk.",
      },
    ],
    externalLinks: [
      {
        href: "https://support.google.com/mail/answer/81126",
        label: "Google: Email sender guidelines",
        description: "Gmail's own bulk sender requirements, including the instruction that message headers and content must be accurate and not misleading.",
      },
      {
        href: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
        label: "FTC: CAN-SPAM Act Compliance Guide",
        description: "The federal compliance guide stating that a subject line must accurately reflect the content of the message it belongs to.",
      },
      {
        href: "https://www.litmus.com/blog/the-ultimate-guide-to-preview-text-support",
        label: "Litmus: The Ultimate Guide to Email Preview Text",
        description: "An independent guide on preview text character limits and how preview text and subject lines compete for the same inbox space.",
      },
      {
        href: "https://mailchimp.com/resources/most-common-spam-filter-triggers/",
        label: "Mailchimp: Most Common Spam Filter Triggers",
        description: "A major email service provider's own research into the most commonly flagged spam signals, including all-capitals subject lines.",
      },
    ],
  },

  tags: ["marketing", "email", "subject lines", "deliverability", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
