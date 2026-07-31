import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Commit Message Standard Skill

Use this skill whenever you are asked to check an existing commit message, or a batch of
commit messages, against a specific message format convention, or to write a new commit
message that must follow one.

## Before you check or write anything

Ask which convention applies. This skill never assumes a default silently. There are two
valid answers:

1. Conventional Commits, named explicitly. If the user says "Conventional Commits" or
   "conventional commit format," read \`reference/conventional-commits-format.md\` first. It
   holds the exact structure and a citation to the specification version this skill checks
   against.
2. A team's own house rules, pasted in directly: a character limit, a required prefix list,
   a capitalisation rule, whatever the team actually enforces. Use exactly what was pasted,
   nothing assumed on top of it.

If neither is supplied, stop and ask which one applies before producing a single finding.
Do not fall back to Conventional Commits as a silent default just because it is the most
commonly named convention. A team with its own house rules that is never asked will have
every one of its real rules ignored in favour of a convention it does not use.

## Checking an existing commit message

For each commit message under review, check it structurally against the stated convention
only, never against a general sense of what a good commit message looks like:

- Type prefix present and drawn from the stated convention's allowed list (Conventional
  Commits: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, or a
  team's own named list).
- Subject line written in the imperative mood, not the past tense: "add," not "added";
  "fix," not "fixed."
- Subject line at or under the character limit the stated convention sets, commonly 50 for
  the subject line under Conventional Commits, or the pasted house limit.
- A blank line between the subject line and the body, whenever a body is present.
- Scope, when the stated convention uses one, present in the expected position and
  punctuation. Conventional Commits places it in parentheses immediately after the type,
  before the colon.

Every issue reported must name the specific rule it fails, written as: "Rule: <rule name>.
Subject reads '<the actual subject>.' Expected <the stated requirement>." A finding with no
named rule attached is not a valid output of this skill.

## What this skill never does

It never invents what a commit should have said about the author's intent. Checking format
is a structural pass over the words already written: a type prefix, a mood, a length, a
blank line. It is never a judgement about whether the stated description is true of the
underlying diff, and it never supplies a reason, a scope, or a body sentence the commit did
not already contain. If a subject line is missing a type prefix, the fix offered is that
same subject line with a plausible type prefix proposed and clearly marked as a suggestion,
never a rewritten subject claiming new information about what the change does.

## Writing a new commit message

Once the convention is confirmed, draft the subject line, and a body where one is
warranted, directly against its rules: correct type prefix, imperative mood, correct
length, and a blank line before any body text. State which convention was used in the
reply. Do not add detail about the change that was not supplied. If the reason for the
change is unclear, mark it and ask, rather than inventing a plausible sounding motivation.

## Reporting the result

When checking a batch of commit messages, produce one entry per message: the message
itself, a pass or fail against the stated convention, and every rule it fails cited by
name. If every commit in the batch passes, say so plainly rather than manufacturing a
finding to have something to report.
`;

const CONVENTIONAL_COMMITS_FORMAT_MD = `# Conventional Commits format reference

This file names the exact structure of Conventional Commits, version 1.0.0, the
specification published at conventionalcommits.org, and lists the format violations this
skill's checking pass is built to catch, each paired with a fix example. It works as a
downloadable conventional commits checklist alongside \`SKILL.md\`. Use it only when the user
has explicitly named Conventional Commits as the convention in effect. If a team pasted its
own house rules instead, use those rules and set this file's specifics aside.

## The exact structure

The specification defines the message as:

\`type(optional scope): description\`

\`optional body\`

\`optional footer(s)\`

Type is required and must be a single word from the allowed list. The specification itself
requires only feat and fix; most projects also declare docs, style, refactor, perf, test,
build, ci, and chore. Scope is optional, written in parentheses immediately after the type,
and names the section of the codebase affected. Description follows a colon and a single
space, and states the change concisely in the imperative mood. A breaking change is marked
either with an exclamation mark immediately before the colon, or a footer beginning
"BREAKING CHANGE: ".

## Common format violations and how to fix them

Missing type prefix.
Wrong: "updated the login form validation"
Right: "fix(login): correct email validation regex"
Rule violated: type prefix present and from the allowed list.

Past tense instead of imperative mood.
Wrong: "fixed the null pointer in the parser"
Right: "fix(parser): handle null token in expression parser"
Rule violated: subject line written in the imperative mood.

Subject line over the stated character limit.
Wrong: "feat(auth): add a brand new single sign on flow supporting SAML and OAuth2 providers"
Right: "feat(auth): add SAML and OAuth2 single sign on"
Rule violated: subject line at or under the stated character limit.

Missing blank line before the body.
Wrong: "fix(api): correct pagination offset" directly followed with no blank line by "The
offset was applied twice when a cursor was supplied."
Right: the same two lines with one empty line placed between them.
Rule violated: blank line between the subject line and the body.

Scope in the wrong position or punctuation.
Wrong: "fix login: correct email validation regex"
Right: "fix(login): correct email validation regex"
Rule violated: scope present in the expected position and punctuation.

Type not from the allowed list.
Wrong: "misc: various small fixes"
Right: "chore: bump dependency versions," or split into separate typed commits, one per
real change.
Rule violated: type prefix present and from the allowed list.

## Where this comes from

The structure above matches the Conventional Commits specification, version 1.0.0, at
conventionalcommits.org. When a project's own house rules differ from this file, such as a
different character limit, a different type list, or no scope at all, the pasted house
rules always take precedence over what is written here.
`;

const meta: SkillMeta = {
  slug: "commit-message-standard-skill",
  name: "Commit Message Standard Check",
  title: "Commit Message Standard Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that checks or writes git commit messages against a convention the user actually names, Conventional Commits or a team's own house rules, and cites the specific rule behind every flagged issue.",

  seo: {
    primaryKeyword: "commit message standard skill",
    keywords: [
      "commit message standard skill",
      "free ai skill for commit messages",
      "downloadable conventional commits checklist",
      "ai skill to check commit message format",
      "how to enforce a commit message convention",
    ],
    seoTitle: "Commit Message Standard Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable commit message standard skill that checks or writes commit messages against Conventional Commits or your own house rules, not a silent default.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    {
      path: "reference/conventional-commits-format.md",
      content: CONVENTIONAL_COMMITS_FORMAT_MD,
      kind: "markdown",
    },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Asked to check or write a commit message, models reliably reach for whichever format appeared most often in training, usually something close to Conventional Commits, and apply it as though it were universal rather than confirming which convention the team in front of them actually uses. This skill's instructions force that question first, require the stated convention to be named explicitly, and require every flagged issue to cite the specific rule it fails rather than a general impression of the message.",
  },

  article: {
    intro: [
      "A commit message standard skill has exactly one job: check or write a commit message against a convention that was actually named, never a convention assumed by default. Handed a message and nothing else, most AI assistants silently reach for whatever format they saw most often in training, close to Conventional Commits, and apply it whether or not that is the format the team in front of them actually uses. This skill refuses that shortcut, and is built as a free ai skill for commit messages that will not proceed until the convention is stated.",
      "It ships as two plain text files: a main instructions file and a reference file naming the Conventional Commits specification precisely, plus a list of common format violations this skill's checking pass catches, each paired with a fix example. Both are previewable in full on this page before you download the zip, and both are exactly what an assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "Why this skill asks which convention applies before touching a message",
        body: [
          "A subject line can be perfectly well formed under one convention and wrong under another: a fifty character limit is generous under one house style and far too loose under a team that caps at forty, and a type prefix list that is complete for one project is missing half of what another project actually uses. Judging a message without first knowing the rule it is meant to satisfy is not a check at all, just an opinion dressed up as one.",
          "So the skill's very first instruction is to ask which convention applies, and to accept only two kinds of answer: Conventional Commits, named explicitly, or a team's own house rules, pasted in directly rather than paraphrased from memory. Neither answer is assumed when it is missing.",
        ],
      },
      {
        heading: "Conventional Commits, named and cited precisely",
        body: [
          "When Conventional Commits is the stated convention, the skill points to its own reference file rather than reconstructing the format from a general impression of what such conventions tend to look like. That file states the structure exactly as published, version 1.0.0, at conventionalcommits.org: a required type, an optional parenthesised scope, a colon and space, then a description in the imperative mood, with an optional body and optional footers.",
          "The same reference file doubles as a downloadable conventional commits checklist, naming the specification's allowed types and pairing each common violation with a concrete fix example, so a flagged issue in a real message can be checked against a written rule rather than a recollection of one.",
        ],
      },
      {
        heading: "How to enforce a commit message convention without a silent default",
        body: [
          "Enforcement only works if the rule being enforced is the rule the team actually agreed to, which is why a pasted set of house rules always outranks the reference file's Conventional Commits specifics. If a team caps subject lines at forty characters instead of fifty, or uses a type list of its own, that pasted rule is what gets checked against, and the reference file is set aside for that session.",
          "This is the one discipline the whole skill is built around: a commit message standard skill that cannot name the convention it is applying is not actually standardising anything, it is guessing with confidence.",
        ],
      },
      {
        heading: "How a flagged issue is written up, as an ai skill to check commit message format",
        body: [
          "Every finding follows one fixed shape: the specific rule named, the actual subject line quoted, and the stated requirement it fails to meet. A missing type prefix, a subject written in the past tense instead of the imperative mood, a subject line over the stated character limit, and a missing blank line before the body are the four violations checked on every single message, in that order, before anything else is considered.",
          "A finding that cannot be traced to one of these named checks, or to a rule explicitly pasted by the team, does not get reported as a violation at all.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It never fabricates what a commit was actually for. Checking format is a structural pass over words that already exist on the page: a prefix, a mood, a length, a blank line. It is never a judgement about whether a stated description matches the underlying diff, since this skill is never shown the diff, and it never invents a reason, a scope, or a body sentence the original message did not contain. A subject missing a type prefix gets a proposed prefix marked clearly as a suggestion, not a confident rewrite presented as fact.",
        ],
      },
      {
        heading: "How this differs from the pull request review standard skill",
        body: [
          "This site's pull request review standard skill reads a code diff and checks the change itself against a team's ten named rules covering things like error handling, test coverage, and security sensitive patterns. This skill never looks at a diff at all. It reads only the commit message text, the words a subject line and body actually contain, and checks their structure and format against a stated naming convention.",
          "One reviews what changed in the code; the other reviews how the record of that change was written down. A team can reasonably use both together on the same pull request without either skill duplicating the other's job.",
        ],
      },
    ],
    howTo: {
      name: "How to use the commit message standard skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/conventional-commits-format.md directly on this page before downloading, so you know exactly what standard will be applied.",
        },
        {
          name: "Download the zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Decide the convention before you start",
          text: "Confirm whether Conventional Commits applies, or gather your team's own pasted house rules, so the skill is never left to guess a default.",
        },
        {
          name: "Hand both files to your assistant with the messages",
          text: "Keep the folder structure intact so the instructions can point to the reference file, then supply the commit message or messages to check or draft.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I don't tell it which commit convention my team uses?",
        answer:
          "The skill stops and asks rather than guessing. Its first instruction requires either Conventional Commits named explicitly or a team's own house rules pasted in directly, and it will not produce a single finding against an assumed default convention.",
      },
      {
        question: "Does this skill only work with Conventional Commits?",
        answer:
          "No. Conventional Commits is one of the two accepted answers to the question the skill always asks first, and the reference file exists specifically to support it precisely, but a team's own pasted house rules are treated as equally valid and take precedence over the reference file whenever they differ from it.",
      },
      {
        question: "Can this skill tell me if my commit message accurately describes my change?",
        answer:
          "No, and its instructions explicitly forbid attempting it. This skill checks format and structure only, such as a type prefix, mood, length, and blank line placement, and it is never shown the underlying diff, so it has no basis for judging whether a stated description is true of the code.",
      },
      {
        question: "How is this different from the pull request review standard skill on this site?",
        answer:
          "That skill reads a code diff and checks the change itself against a team's own named rules covering things like error handling and test coverage. This skill never reads a diff at all, it only checks the commit message text against a stated naming and format convention, so the two skills review entirely different artefacts.",
      },
      {
        question: "What exactly does it check on each commit message?",
        answer:
          "Four structural checks run on every message: a type prefix present and drawn from the stated convention's allowed list, imperative mood in the subject rather than past tense, the subject line at or under the stated character limit, and a blank line separating the subject from the body when one is present.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the zip download both happen entirely in your browser, with no server call behind either action, and nothing about the commit messages or codebase you eventually use the skill with is ever sent anywhere by this site.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/coding-skills/pull-request-review-standard-skill",
        label: "pull request review standard skill",
        description: "For checking the code diff itself against a team's own rules, rather than checking the commit message's format and structure.",
      },
      {
        href: "/coding-prompts/git-commit-message-prompt",
        label: "git commit message prompt",
        description: "For drafting a commit message's actual content from a diff in one pass, rather than checking an existing message against a named format convention.",
      },
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "A natural companion pass on the same pull request's code, once its commit messages have been checked for format.",
      },
      {
        href: "/tools/text-diff-checker",
        label: "text diff checker",
        description: "For seeing exactly what changed line by line, useful context when deciding what a commit's body should describe before this skill checks its format.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.conventionalcommits.org/en/v1.0.0/",
        label: "Conventional Commits v1.0.0 specification",
        description: "The exact published specification this skill's reference file cites for the type, scope, description, and footer structure.",
      },
      {
        href: "https://cbea.ms/git-commit/",
        label: "cbea.ms: How to Write a Git Commit Message",
        description: "An independent, widely cited source for the imperative mood and character limit rules this skill checks a subject line against.",
      },
      {
        href: "https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project",
        label: "Pro Git: Distributed Git, Contributing to a Project",
        description: "The official Git project's own book chapter on commit message conventions, including the blank line and wrapped body guidance.",
      },
      {
        href: "https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits",
        label: "GitHub Docs: About commits",
        description: "Background on what a commit records and how its message is stored, the object this skill's checking pass reads.",
      },
    ],
  },

  tags: ["coding", "git", "commit messages", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
