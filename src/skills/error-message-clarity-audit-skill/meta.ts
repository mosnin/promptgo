import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Error Message Clarity Audit

Use this skill whenever you are given a set of an application's real user
facing error messages and asked to audit them: a support team collecting
messages users actually saw, a design review of a form's validation copy, a
QA pass before release, or a product team cleaning up error copy across a
codebase.

## What you are given and what you are not allowed to invent

You need the exact, real text of each error message as it appears to the
user. Do not paraphrase a message before judging it, and do not accept a
description of a message ("it shows something about a failed request")
in place of the literal string. If the exact text is not available, say so
and ask for it rather than auditing a summary.

You are not being asked to guess why the underlying system failed. If the
cause is not stated in the message or given to you separately, do not
invent one. A rewrite that sounds more informative but states a cause you
were not told is actually true is worse than the vague original, because it
adds a false claim to a message that was merely unhelpful.

## The three checkable rules

Run every message against all three. A message can fail more than one.

1. **States what actually went wrong.** The message names the specific
   failure ("your card was declined," "the file is larger than 10 MB")
   rather than a placeholder that could describe any failure at all
   ("An error occurred," "Something went wrong," "Request failed"). Test
   this by asking: could this exact sentence be shown for a completely
   different failure without sounding wrong? If yes, it fails.
2. **States what the user should do next.** The message gives an action
   the user can actually take: retry, use a different card, shrink the
   file, contact support with a reference number. A message that states
   the problem correctly but leaves the user stuck with no next step still
   fails this rule.
3. **Avoids raw technical detail the user cannot act on.** No stack
   traces, no internal variable or function names, no raw database error
   codes, no internal service names, no null pointer or exception class
   names, shown as if they were the message itself. Technical detail is
   fine in a developer console or a log; it is a failure when it is the
   only thing a non-technical end user sees.

## How to flag a failing message

Every flag has four required parts, in this order. A flag missing any part
is not a complete flag.

1. Quote the exact message text under audit, unedited.
2. Cite which of the three rules it fails, by number.
3. State in one sentence why it fails that specific rule, referring to the
   actual wording, not a generic restatement of the rule.
4. Give a concrete rewritten version that fixes the failure while staying
   honest about what is actually known. If the underlying cause was not
   supplied to you, the rewrite should describe the failure at whatever
   level of detail is honestly known ("we could not save your changes")
   rather than inventing a specific cause ("our database timed out") that
   was never confirmed.

Do not batch multiple messages into one vague comment. One message gets one
flag, or a clean pass, never a shared note across several messages.

## Working through a batch

Go message by message, in the order given. For each one, check all three
rules before moving on, note a pass or which rules it fails, and produce
the flag immediately rather than deferring write ups to the end. At the end
of a batch, summarise the pass count against the total and list which rule
was violated most often, since that points at where the underlying error
handling code needs the most attention, not just the copy.

## What this skill does not do

It does not rewrite error handling logic, choose HTTP status codes, or
decide what should be logged internally versus shown to a user; those are
engineering decisions outside this skill's scope. It also does not soften
a message into something falsely reassuring. An honest, plain message
that still sounds a little alarming because the failure genuinely matters
("your payment could not be completed and you have not been charged") is
correct; a friendlier sentence that misstates what happened is not.
`;

const CHECKLIST_MD = `# Error message checklist: three rules with pass and fail examples

Use this alongside \`SKILL.md\`. Each rule below is shown with a message that
fails it and a rewritten version that passes, so the judgment stays
concrete instead of a vague sense that a message "feels unclear."

## Rule 1: States what actually went wrong

The message must name the specific failure, not a placeholder that could
describe any failure at all.

- **Fails:** "An error occurred. Please try again."
  Why it fails: this sentence could be shown for a declined payment, a
  broken network connection, or a server crash. It names nothing.
- **Fails:** "Something went wrong while processing your request."
  Why it fails: same problem in different words. "Processing your request"
  describes every request the application ever handles.
- **Passes:** "We could not charge your card. The bank declined the
  transaction."
  Why it passes: a reader now knows the specific failure, payment
  authorisation, without needing to guess.
- **Passes:** "This file is 42 MB. The maximum upload size is 10 MB."
  Why it passes: names the exact constraint that was violated and the
  actual numbers involved.

## Rule 2: States what the user should do next

Naming the problem correctly is not enough on its own. The user needs an
action they can actually take.

- **Fails:** "Your card was declined."
  Why it fails: correctly names the problem under Rule 1, but gives no
  next step. Try a different card? Contact the bank? Wait and retry? The
  user is left to guess.
- **Fails:** "The file you uploaded is too large."
  Why it fails: same gap. There is no stated limit and no instruction.
- **Passes:** "Your card was declined. Try a different card or contact
  your bank to confirm the transaction was blocked on their end."
  Why it passes: gives two concrete actions the user can take right now.
- **Passes:** "This file is 42 MB. The maximum upload size is 10 MB.
  Compress the file or upload a smaller version."
  Why it passes: states the limit and a specific corrective action.

## Rule 3: Avoids raw technical detail the user cannot act on

Stack traces, internal variable names, exception class names, raw database
error codes and internal service names belong in a developer console or a
log, not in front of a non-technical end user.

- **Fails:** "NullReferenceException at UserService.GetProfile(line 214)."
  Why it fails: this is a debugger's output shown to the wrong audience.
  No user can act on a line number in code they will never see.
- **Fails:** "Error 23000: Duplicate entry 'jsmith@example.com' for key
  'users.email_unique'."
  Why it fails: a raw database constraint error, naming an internal table
  and index, shown as if it were written for the person who hit it.
- **Passes:** "An account with this email address already exists. Sign in
  instead, or use a different email to create a new account."
  Why it passes: the same underlying failure, a unique constraint
  violation, translated into what it actually means for the user and what
  they can do about it.
- **Passes:** "We couldn't load your profile. Refresh the page, and
  contact support with reference PRF-9182 if the problem continues."
  Why it passes: no exception name or file path, but still gives the user
  a specific, useful reference to quote if they need help.

## Honesty check for every rewrite

A rewrite that fixes Rules 1 through 3 can still fail if it invents a cause
that was never confirmed. Before finalising a rewrite, check it against
this:

- **Dishonest rewrite:** original says "Request failed (code 503)," and
  the rewrite becomes "Our server was overloaded by unusually high
  traffic," when no one actually confirmed that was the cause.
  Why it fails: 503 can mean many things (maintenance, an unrelated
  dependency outage, a deploy in progress); this rewrite states a specific
  cause as fact with nothing to support it.
- **Honest rewrite of the same message:** "We couldn't complete your
  request right now. This is on our end, not something you did. Please
  try again in a few minutes."
  Why it passes: states plainly what is known, that the request failed
  and it was not the user's fault, without claiming a specific unverified
  cause.

## Quick reference for flags

Every flag written against this checklist states: the exact quoted
message, the rule number it fails, one sentence on why, and a rewrite that
passes all three rules without adding an unconfirmed cause.
`;

const meta: SkillMeta = {
  slug: "error-message-clarity-audit-skill",
  name: "Error Message Clarity Audit",
  title: "Error Message Clarity Audit Skill",
  category: "coding-skills",
  summary:
    "A downloadable instruction pack that audits real user facing error messages against three checkable rules, naming the failure, giving a next step, hiding raw technical detail, and requires every flag to quote the exact text and offer an honest rewrite.",

  seo: {
    primaryKeyword: "error message clarity audit skill",
    keywords: [
      "error message clarity audit skill",
      "free ai skill for error message review",
      "downloadable error message checklist",
      "ai skill to audit user facing errors",
      "error message writing guide for ai assistant",
    ],
    seoTitle: "Error Message Clarity Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable error message clarity audit skill that checks user facing error copy against three rules and quotes exact text in every flag.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/error-message-checklist.md", content: CHECKLIST_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to audit error copy often leave a raw stack trace, an exception class name or a database error code sitting inside a rewritten message, treating technical detail as informative rather than unreadable to a non-technical end user. A second common failure is inventing a specific, confident sounding cause for a vague error that was never actually confirmed. This skill's three rule checklist and required quote-and-cite flag format are built to catch both failures directly.",
  },

  article: {
    intro: [
      "An error message clarity audit skill exists to catch the gap between what a system actually did and what it tells the person looking at the screen. Most user facing error messages fail in one of three predictable ways: they name no specific failure at all ('Something went wrong'), they name the failure correctly but leave the reader stuck with no next step, or they leak a stack trace, a raw database error code, or an internal variable name that means nothing outside an engineering team.",
      "This skill ships as two plain text files: a main instructions file defining the three checkable rules and the four part flag format, and a reference checklist with worked pass and fail examples for each rule. Both are previewable in full on this page before you download the .zip, exactly as they ship inside it.",
      "The skill's core discipline is that every flag must quote the exact message text, cite the specific rule it fails, and offer a rewrite that fixes the failure without inventing a friendlier sounding cause the underlying system never confirmed. A rewrite that states a false explanation is worse than a vague original, because it adds a lie to a message that was merely unhelpful.",
    ],
    sections: [
      {
        heading: "Why 'An error occurred' fails before the system even does",
        body: [
          "'An error occurred. Please try again' and 'Something went wrong while processing your request' are the two most common failures of Rule 1: naming no specific problem. Both sentences could be shown for a declined payment, a dropped network connection, or a server crash without sounding wrong, which is exactly the test this skill applies. If a message survives being swapped onto a completely different failure, it names nothing.",
          "The fix is not longer copy, it is specific copy: 'We could not charge your card. The bank declined the transaction' names the actual failure in roughly the same number of words as the vague version it replaces.",
        ],
      },
      {
        heading: "Naming the problem is not the same as giving a next step",
        body: [
          "'Your card was declined' passes Rule 1 but still fails a real audit, because it gives the reader nothing to do next. Try a different card, contact the bank, wait and retry? The user is left guessing. The rewrite that passes both rules keeps the same honest problem statement and adds one concrete action: 'Your card was declined. Try a different card or contact your bank to confirm the transaction was blocked on their end.'",
          "The same gap shows up with file upload limits: stating that a file is 'too large' without the actual limit forces the user to guess at a number nobody gave them.",
        ],
      },
      {
        heading: "Keeping stack traces and database codes out of the user's view",
        body: [
          "'NullReferenceException at UserService.GetProfile(line 214)' and 'Error 23000: Duplicate entry for key users.email_unique' are both debugger output shown to the wrong audience. A non-technical reader cannot act on a line number or a database constraint name, no matter how precisely it describes the failure to an engineer.",
          "The honest translation of that second example, 'An account with this email address already exists. Sign in instead, or use a different email,' states the same underlying failure in language the person actually reading it can use.",
        ],
      },
      {
        heading: "The four part flag format this error message clarity audit skill requires",
        body: [
          "Every flag quotes the exact message under review unedited, cites which of the three rules it fails by number, states in one sentence why the actual wording fails that rule, and gives a concrete rewrite. A flag missing any of those four parts is treated as incomplete, and one message never gets folded into a vague shared comment about several messages at once.",
        ],
      },
      {
        heading: "Staying honest when the real cause is not confirmed",
        body: [
          "A rewrite that fixes the first three rules can still fail if it invents a cause nobody confirmed. Turning 'Request failed (code 503)' into 'Our server was overloaded by unusually high traffic' states a specific cause as fact when a 503 can mean maintenance, an unrelated dependency outage, or an in progress deploy just as easily.",
          "The honest version of the same message keeps the claim to what is actually known: 'We couldn't complete your request right now. This is on our end, not something you did. Please try again in a few minutes.'",
        ],
      },
      {
        heading: "Using the downloadable error message checklist as an ai skill to audit user facing errors",
        body: [
          "Hand both files to an assistant together, since the main instructions file points to the checklist file by its relative path. Working as a free ai skill for error message review, the pair turns a pile of raw error strings pulled from support tickets or a codebase into a per message pass or fail list with a rewrite ready to ship, rather than a single paragraph of general impressions about the copy. Kept together, the two files also work as an error message writing guide for ai assistant teams drafting new error copy, not only auditing existing copy.",
        ],
      },
    ],
    howTo: {
      name: "How to use the error message clarity audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/error-message-checklist.md directly on this page before downloading, so you know exactly what you're about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Collect the exact message text",
          text: "Pull the literal strings your users actually saw from support tickets, screenshots or the source code, rather than a paraphrase of what each message says.",
        },
        {
          name: "Hand both files and the messages to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the checklist file, then supply the batch of real error text for a rule by rule audit.",
        },
      ],
    },
    faq: [
      {
        question: "What if I only have a screenshot of the error, not the raw text?",
        answer:
          "Transcribe it exactly as it appears, including punctuation and capitalisation, rather than describing what it says in your own words. The skill's flags depend on quoting the literal message, and a paraphrase makes that quote inaccurate before the audit even starts.",
      },
      {
        question: "Will this skill invent a technical explanation for a vague error?",
        answer:
          "No. Its instructions explicitly forbid stating a specific cause that was not supplied to it. A vague message gets rewritten with whatever is honestly known, such as acknowledging a failure occurred without naming an unconfirmed technical reason for it.",
      },
      {
        question: "Does the skill also fix the code that generates the error?",
        answer:
          "No. It audits and rewrites the message text a user sees. Choosing status codes, deciding what gets logged internally, and fixing the underlying failure are engineering decisions the skill deliberately leaves out of scope.",
      },
      {
        question: "Can it be used on error messages that are already fairly good?",
        answer:
          "Yes. A message that passes all three rules gets recorded as a clean pass rather than forced into an unnecessary rewrite, which keeps a large batch audit from touching copy that was never actually broken.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the error message text you eventually audit with it is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the worked pass and fail examples into their own reference file keeps the main instructions file focused on the three rules and the flag format, while the checklist can gain more worked examples later without restructuring the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/coding-prompts/error-message-prompt",
        label: "error message prompt",
        description: "For drafting a new user facing error message from scratch, rather than auditing existing ones already shipped.",
      },
      {
        href: "/coding-prompts/debugging-prompt",
        label: "debugging prompt",
        description: "For working out why an error is actually happening in the code, which this skill deliberately leaves out of scope.",
      },
      {
        href: "/coding-prompts/api-error-handling-prompt",
        label: "api error handling prompt",
        description: "For structuring how an API returns error responses, a natural source of the raw messages this skill audits.",
      },
      {
        href: "/design-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description: "For broader interface copy beyond error states, written in the same plain, specific register this skill checks for.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/error-message-guidelines/",
        label: "Nielsen Norman Group: Error Message Guidelines",
        description: "An independent usability standard for visible, clearly worded error messages that help users recover.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html",
        label: "W3C: Understanding Error Identification",
        description: "The accessibility standard requiring errors to be identified and described to users in text, the basis for Rule 1.",
      },
      {
        href: "https://digital.gov/guides/plain-language",
        label: "Digital.gov Plain Language Guide Series",
        description: "A real, checkable standard for the plain language a rewritten error message should be written in.",
      },
      {
        href: "https://design-system.service.gov.uk/components/error-message/",
        label: "GOV.UK Design System: Error Message Component",
        description: "A production standard for pairing an error message with a clear explanation of what went wrong and how to fix it.",
      },
    ],
  },

  tags: ["coding", "error messages", "ux writing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
