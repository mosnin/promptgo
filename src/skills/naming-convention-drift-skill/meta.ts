import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Naming Convention Drift Check

Use this skill whenever someone hands over a real list of identifiers, variable names, function
names, class names, or file names, pulled from an actual codebase, and wants to know which of
those identifiers break the codebase's naming convention. This is a naming convention drift
skill: it checks each identifier against a convention that was either stated outright or is
clearly established by the majority of the supplied list, and it never invents a convention
from nowhere.

## Before you check anything

Determine the convention in one of two ways only.

First, the user states it directly: camelCase, snake_case, kebab-case, PascalCase, or a custom
rule described in their own words, for example "every boolean must start with is or has," or
"every file name must end with its file type as a suffix, like user.controller." A stated
convention is always authoritative, even when several identifiers in the supplied list break it.

Second, no convention is stated, but the supplied list is large enough and consistent enough to
establish one on its own. Treat a list as large enough only when it holds a genuinely broad
sample, not three or four names, and treat it as consistent enough only when a clear majority,
not a bare fifty one percent, share one structure. State the established convention explicitly
before using it, and cite the specific identifiers that support it.

If neither condition holds, meaning nothing was stated and the supplied list is too small or too
mixed to establish a majority pattern, say so plainly. Do not guess camelCase because most
JavaScript projects use it, and do not guess snake_case because the file extension suggests
Python. A convention only counts once it is stated outright or actually established by the
evidence in front of you, never assumed from the language or framework alone.

## Checking each identifier

Work through the supplied list one identifier at a time. For every identifier:

1. Quote the exact identifier, character for character, exactly as it was supplied.
2. State whether it matches the established or stated convention.
3. If it does not match, name precisely which rule it violates and how: which characters or
   word boundaries are wrong, not a general sense that something looks off.

A useful violation note names the specific mechanism, for example: "user_id mixes snake_case in
a file where every other identifier is camelCase," or "Getuserdata starts with an uppercase
letter, which is PascalCase rather than the file's camelCase, and also fails to capitalize the
internal word boundary between user and data."

Do not flag an identifier as a violation without quoting it first. A verdict without the exact
string attached cannot be checked against the source list, and is not useful to whoever asked.
Likewise, do not list an identifier as a violation just because it looks unusual; only flag it
if it demonstrably breaks the stated or established rule.

## The four standard conventions, defined precisely

camelCase: the first word is lowercase, every subsequent word starts with a capital letter, and
no separator character appears between words. Example: getUserData.

snake_case: every word is lowercase, and words are separated by a single underscore character.
Example: get_user_data.

kebab-case: every word is lowercase, and words are separated by a single hyphen character.
Example: get-user-data.

PascalCase: every word, including the first, starts with a capital letter, and no separator
character appears between words. Example: GetUserData.

A custom rule, when the user states one, always overrides these four defaults, and should be
checked exactly as described, including any prefix, suffix, or word choice requirement that has
nothing to do with letter case at all.

## Naming convention drift skill versus component naming checks

This skill checks source code identifiers: variable names, function names, class names, and file
names, pulled from an actual codebase. It is not the same task as checking whether a proposed
design system component name, such as a button or a modal, fits a design system's existing
component library. That is a different artifact entirely, checked against a different kind of
evidence, a component inventory rather than a source file, and it belongs to a separate skill
built for that purpose. Do not apply this skill's case rules to a component name, and do not
apply a component naming pattern to a source code identifier. The two disciplines share the word
naming and nothing else structural: one governs letter case and separators inside an identifier
string, the other governs prefixes and category words across a UI component library.

## When the list is too small or too mixed

If fewer than roughly eight identifiers are supplied, or if no single structure covers a clear
majority of them, say so directly rather than picking a side. Quantify the split when one
exists, stating how many identifiers fall on each structure, and ask for a larger sample or an
explicit statement of the intended convention before offering a confident verdict.

## What this skill does not do

It does not assume camelCase, snake_case, kebab-case, or PascalCase from the programming
language, file extension, or framework alone. Plenty of JavaScript codebases use snake_case for
database columns and camelCase everywhere else, and a guess based on the language alone would
miss that split entirely.

It does not rename anything on its own authority. It states the violation, quotes the offending
identifier, and proposes a corrected form that would pass, then leaves the decision to make the
change with whoever asked.
`;

const WORKED_EXAMPLE_MD = `# Reference: a worked example

Use this alongside \`SKILL.md\`. It shows the full process on a real looking identifier list
from a single file, from establishing the convention through to quoting and explaining two
violations.

## The supplied identifier list

Identifiers pulled from one module, in the order they appear:

fetchUserProfile, userId, isAuthenticated, getAccountBalance, formatCurrency, retryCount,
lastLoginAt, buildRequestHeaders, user_id, parseApiResponse, cacheTtlSeconds, shouldRetry,
handleLoginError, activeSessionCount, Getuserdata, normalizeEmail

## Establishing the convention

No convention was stated, so the first step is checking whether the list itself establishes one.
Fourteen of the sixteen supplied identifiers share one structure: the first word is lowercase,
every subsequent word starts with a capital letter, and no separator character appears between
words. That is camelCase, and it covers a clear majority, fourteen of sixteen, well above a bare
majority, so it is treated as the established convention for this file.

The fourteen supporting identifiers are: fetchUserProfile, userId, isAuthenticated,
getAccountBalance, formatCurrency, retryCount, lastLoginAt, buildRequestHeaders,
parseApiResponse, cacheTtlSeconds, shouldRetry, handleLoginError, activeSessionCount, and
normalizeEmail.

## The two violations

### user_id

Quote: user_id

Verdict: violates the established convention.

Explanation: user_id mixes snake_case in a file where every other identifier is camelCase. It
uses an underscore to separate "user" and "id," where the established convention expects no
separator character and a capital letter at the word boundary instead.

Corrected form: userId, which matches the file's own sibling identifier userId used elsewhere in
the same list, confirming the corrected form is not just theoretically consistent but already
the name this file uses for the same concept.

### Getuserdata

Quote: Getuserdata

Verdict: violates the established convention.

Explanation: Getuserdata starts with an uppercase letter, which is PascalCase rather than the
file's camelCase, and it also fails to capitalize "user" and "data" as separate words at their
boundaries, collapsing three words into what reads as one long word with a single capital at
the front.

Corrected form: getUserData, lowercase at the first letter to match camelCase, with a capital U
and a capital D marking the two internal word boundaries the original name collapsed.

## What this example does not do

It does not flag retryCount, lastLoginAt, or any other identifier that already matches the
established convention. A naming convention drift skill worth trusting reports only the
identifiers that actually break the rule, quoted exactly, rather than padding its findings with
identifiers that were already correct.
`;

const meta: SkillMeta = {
  slug: "naming-convention-drift-skill",
  name: "Naming Convention Drift Check",
  title: "Naming Convention Drift Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that checks a real list of code identifiers against a stated or clearly established naming convention, quoting the exact identifier and rule behind every flagged violation.",

  seo: {
    primaryKeyword: "naming convention drift skill",
    keywords: [
      "naming convention drift skill",
      "free ai skill for naming conventions",
      "downloadable identifier naming checklist",
      "ai skill to check variable naming consistency",
      "how to detect naming convention drift in code",
    ],
    seoTitle: "Naming Convention Drift Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable naming convention drift skill that checks a real identifier list against a stated naming convention and quotes the exact rule each name breaks.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-example.md", content: WORKED_EXAMPLE_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to check a list of identifiers for naming consistency, models default to assuming a convention from the programming language or file extension, camelCase for JavaScript, snake_case for Python, rather than checking what the supplied list itself actually establishes. This produces confident sounding verdicts on codebases that mix conventions deliberately, such as snake_case database columns inside an otherwise camelCase JavaScript file, and the failure gets worse when the supplied list is too short to support any pattern at all, since a model will often assert a rule anyway. This skill's process forces every violation to trace to a quoted identifier and a named rule, and requires a too small or too mixed list to be reported as such rather than resolved by assumption.",
  },

  article: {
    intro: [
      "A naming convention drift skill only earns its name if it checks identifiers against a convention that is actually there, not one assumed from a file extension or a loudest style opinion in the room. Handed a real list of variable, function, or file names pulled from an actual codebase, most AI assistants confidently apply whatever casing convention they associate with that language, camelCase for JavaScript, snake_case for Python, regardless of what that codebase's own identifiers actually do. This skill checks the evidence in front of it instead.",
      "The download bundles two plain text files, instructions and a worked reference example the instructions point to, both readable in full on this page before anything downloads. Nothing in the .zip differs from the preview below.",
    ],
    sections: [
      {
        heading: "Why the convention has to be stated or established, never assumed",
        body: [
          "A codebase's naming convention is a fact about that codebase, not about its programming language. Two projects can share a language and file extensions and still land on different identifier conventions, one strict camelCase throughout, another camelCase for logic with snake_case reserved for database columns. Before checking a single identifier, this skill requires the convention to come from one of two places: a rule the user states outright, or a majority pattern the supplied list itself clearly establishes.",
          "This is what separates a free ai skill for naming conventions from a tool that applies a generic style guide regardless of input. When neither a stated rule nor a clear majority exists, the skill says so rather than guessing, because a convention asserted from nowhere is a coin flip dressed up as a rule.",
        ],
      },
      {
        heading: "How the check works, identifier by identifier",
        body: [
          "Once a convention is established, each identifier is checked in three steps: quote it as supplied, state whether it matches the convention, and if not, name precisely which part of the rule it breaks. That third step is what makes this an ai skill to check variable naming consistency rather than a vague pass or fail label.",
          "A useful violation note names the exact mechanism, for instance that an identifier mixes an underscore separator into a file where every other name uses camelCase, or that it is missing the internal capital letter its own convention requires at a word boundary. Every flagged identifier gets a quoted string and a specific reason, never a general impression that something looks inconsistent.",
        ],
      },
      {
        heading: "The four standard conventions this skill checks against",
        body: [
          "Four case conventions are defined precisely inside the skill's instructions: camelCase, where only the first word is lowercase and later words each start with a capital and no separator appears; PascalCase, the same rule but with the first word capitalized too; snake_case, every word lowercase and separated by an underscore; and kebab-case, every word lowercase and separated by a hyphen. Each definition includes a worked example so a check never depends on an unstated guess.",
          "A downloadable identifier naming checklist is only useful if its definitions are checkable rather than approximate, which is why each convention above is stated as an exact structural rule. When the user states a custom rule instead, such as a required prefix on every boolean, that custom rule always overrides these four defaults.",
        ],
      },
      {
        heading: "Naming convention drift skill versus component naming checks",
        body: [
          "This skill checks source code identifiers, meaning variable names, function names, class names, and file names pulled from an actual codebase. That is a different task from checking whether a proposed design system component name, a button or a modal, fits the pattern an existing component library already uses. A component name check compares a proposed name against a component inventory and cares about category prefixes and role suffixes; this skill compares code identifiers against a case and separator rule and cares about letter case and word boundaries inside a string.",
          "The two tasks share the word naming and nothing else about their evidence or verdicts. A list of code identifiers is not a component inventory, and a case convention like camelCase is not the same kind of pattern as a component category prefix, so this skill's rules should never be applied to a component name, and a component naming pattern should never be applied to a source code identifier.",
        ],
      },
      {
        heading: "How to detect naming convention drift in code when the list is thin",
        body: [
          "Real codebases are frequently inconsistent, and a short or mixed identifier list cannot support a confident verdict. When fewer than roughly eight identifiers are supplied, or no single structure covers a clear majority, the skill reports that honestly rather than picking whichever structure looks slightly more common and presenting it as settled.",
          "When the split is close, the skill states the count on each side, so the person asking can see how mixed the codebase already is before deciding which convention to standardise on.",
        ],
      },
      {
        heading: "What this skill will not do",
        body: [
          "It will not assume camelCase, snake_case, kebab-case, or PascalCase from the programming language alone. A guess based on the language misses the deliberate mixed conventions real codebases use on purpose, such as snake_case reserved for database columns inside an otherwise camelCase file.",
          "It will not rename anything on its own authority either. Every flagged identifier gets a quoted string, a named rule violation, and a corrected form that would pass, with the decision left to whoever asked.",
        ],
      },
    ],
    howTo: {
      name: "How to use the naming convention drift skill",
      steps: [
        {
          name: "Read through the file tree first",
          text: "Open SKILL.md and reference/worked-example.md on this page and skim both, so the archive holds no surprises once it lands on your machine.",
        },
        {
          name: "Build the archive",
          text: "A single click assembles the .zip from those same two files and saves it locally, with no upload or account required.",
        },
        {
          name: "Gather your real identifier list",
          text: "Pull the actual variable, function, or file names from your codebase, ideally at least eight to ten, and either state the intended convention or let the list speak for itself.",
        },
        {
          name: "Hand both files and your list to your assistant",
          text: "Keep the folder structure intact so the instructions file can point to the worked example, then supply your identifier list and, if you have one, the expected convention.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I do not tell the skill which convention to check against?",
        answer:
          "The skill checks whether the supplied identifier list itself establishes a clear majority convention, camelCase, snake_case, kebab-case, or PascalCase, and states that established convention explicitly along with the identifiers that support it. It will not guess a convention from the programming language alone.",
      },
      {
        question: "Can it check a custom rule that is not one of the four standard case conventions?",
        answer:
          "Yes. A custom rule the user states, such as every boolean must start with is or has, always overrides the four default case conventions, and gets checked exactly as described, including any prefix, suffix, or word choice requirement.",
      },
      {
        question: "How is this different from checking a design system component name?",
        answer:
          "This skill checks source code identifiers, variable names, function names, class names, and file names, against a case and separator rule. Checking a proposed component name against an existing component inventory is a different task, comparing category prefixes and role suffixes rather than letter case inside a string, and belongs to a separate skill built for that purpose.",
      },
      {
        question: "Does the skill ever guess the convention from the file extension or framework?",
        answer:
          "No, and its instructions explicitly forbid it. Plenty of real codebases mix conventions deliberately, such as snake_case database columns inside an otherwise camelCase file, and a guess based on the language alone would miss that split entirely.",
      },
      {
        question: "What if my identifier list is too short or too mixed to show a clear pattern?",
        answer:
          "The skill says so directly rather than picking a side. It treats fewer than roughly eight identifiers as too small a sample, and when no single structure covers a clear majority it quantifies the split and asks for a larger sample or an explicit statement of the intended convention.",
      },
      {
        question: "Is my source code ever sent anywhere when I use this skill?",
        answer:
          "Nothing about your codebase leaves your own machine because of this site. Building the .zip and rendering the preview both run locally in the browser, with no request going out to a server, so whatever identifiers your project uses stay exactly where you typed them.",
      },
    ],
    internalLinks: [
      {
        href: "/coding-prompts/code-review-prompt",
        label: "code review prompt",
        description: "A natural place to catch an identifier that drifted from convention once it reaches a pull request, rather than at a dedicated naming check.",
      },
      {
        href: "/coding-prompts/refactoring-prompt",
        label: "refactoring prompt",
        description: "For restructuring a function or module once this skill has flagged which of its identifiers need renaming.",
      },
      {
        href: "/tools/text-case-converter",
        label: "text case converter",
        description: "Converts a single flagged identifier into camelCase, snake_case, kebab-case, or PascalCase once this skill has stated which form it should take.",
      },
      {
        href: "/tools/slug-generator",
        label: "slug generator",
        description: "Produces a kebab-case slug from a name, useful once a file naming convention check calls for that exact separator style.",
      },
    ],
    externalLinks: [
      {
        href: "https://google.github.io/styleguide/jsguide.html#naming",
        label: "Google JavaScript Style Guide: Naming",
        description: "A real, published naming convention from a major engineering organisation, showing how a case rule gets stated precisely rather than approximately.",
      },
      {
        href: "https://peps.python.org/pep-0008/#naming-conventions",
        label: "PEP 8: Naming Conventions",
        description: "The Python community's own naming standard, cited here as an example of snake_case defined with the same precision this skill expects.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript",
        label: "MDN: JavaScript code style guide",
        description: "An independent reference on identifier naming conventions in JavaScript, useful background for judging whether a stated convention is being applied consistently.",
      },
    ],
  },

  tags: ["coding", "naming", "identifiers", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
