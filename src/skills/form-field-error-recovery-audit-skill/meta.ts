import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Form Field Error Recovery Audit

Use this skill whenever you are given a form's real validation error messages, the text
that actually shows when a field fails validation, and asked to audit them: a design
review of a signup form, a QA pass on a checkout flow, or a product team cleaning up
validation copy before release.

## What you are given and what you are not allowed to invent

You need the exact, real text of each error message as it appears on screen, plus enough
context to know which field, if any, it is attached to and where it renders relative to
that field. Do not paraphrase a message before judging it, and do not accept a description
("it tells you the password is wrong") in place of the literal string. If the exact text
or its on screen placement is not available, say so and ask for it rather than auditing a
guess.

## Settle field-level or form-level before checking anything else

Read \`reference/field-level-vs-form-level.md\` before running the checklist. A validation
error is one of two kinds, and they call for genuinely different placement, so grading both
against one rule produces the wrong verdict.

A field-level error is about one specific input: a required field left blank, a password
that does not meet a length rule, an email address missing an @ sign. It belongs directly
next to the field it describes, because the person fixing it needs to find that exact field
without hunting.

A form-level error is about the submission as a whole, not any single field: the server
failed to save the response, a session expired mid submit, a rate limit was hit. It has
nothing to attach to on the form itself, so it legitimately belongs in a summary banner
near the top of the form or near the submit control, not beside any one field. Flagging a
form-level error for lacking field association is itself a mistake; the two kinds need
different placement rules applied correctly, not the same rule applied to both.

For every message you are given, state which kind it is and cite the detail that tells you:
a stated field name or a rule tied to one input means field-level, a stated submission,
server, network or session failure with no single field responsible means form-level.

## The three checkable rules

Run every field-level error against all three. A form-level error is only checked against
rule 2, since rule 1 and rule 3 assume a specific field to be near and a specific format to
name.

1. **Appears next to the specific field it is about.** A field-level error shown only in a
   generic banner at the top of the form, with nothing tying it to the field that failed,
   fails this rule even if the wording is otherwise good. The person reading the banner
   still has to hunt through every field to find the one it means.
2. **States what is specifically wrong.** The message names the actual problem with this
   input, not a bare judgment like "invalid," "incorrect," or "please check this field."
   Test this by asking: could this exact wording be shown for a completely different
   validation failure on the same field without sounding wrong? If yes, it fails.
3. **States the correct format or requirement.** Beyond naming the problem, the message
   states what would actually pass: the minimum length, the required format, the allowed
   characters, the specific rule being enforced. Naming that a password is "too short"
   without saying how many characters are required leaves the person guessing at a number
   nobody gave them.

## How to flag a failing message

Every flag has four required parts, in this order. A flag missing any part is not a
complete flag.

1. Quote the exact message text under audit, unedited.
2. State whether it is field-level or form-level, and cite the detail that tells you.
3. Cite which of the checkable rules it fails, by number, and name the specific field or
   rule involved rather than describing the failure in general terms.
4. Give a concrete rewritten version that fixes the failure while staying next to the
   correct rule: name the actual problem and, for a field-level error, the exact format or
   requirement that would resolve it.

Do not batch multiple messages into one vague comment. One message gets one flag, or a
clean pass, never a shared note across several messages.

## Working through a batch

Go message by message, in the order given. For each one, settle field-level or form-level
first, then check it against the rules that apply to that kind, note a pass or which rules
it fails, and produce the flag immediately rather than deferring write ups to the end. At
the end of a batch, summarise the pass count against the total and list which rule was
violated most often, since a repeated pattern (every password rule on this form states the
problem but never the required length) usually points at one habit worth fixing across the
whole form rather than several unrelated one-off fixes.

## What this skill does not do

It does not invent a validation rule that was not given to you. If you are told a message
reads "invalid postal code" but no one told you what a valid postal code actually looks
like for that form, do not guess a format and grade the message against your guess; note
that the requirement itself was not supplied and ask for it. It also does not redesign the
form's layout or choose a validation timing strategy (on blur, on submit, live as the
person types); it audits the text and placement of the messages that already exist.
`;

const FIELD_LEVEL_VS_FORM_LEVEL_MD = `# Reference: field-level versus form-level, and the three rules with examples

Use this alongside \`SKILL.md\`. Before judging any message against the three checkable
rules, settle whether it is field-level or form-level. Getting that wrong means applying
the field association rule to a message that was never supposed to sit next to a field.

## Telling the two kinds apart

A field-level error names a problem with one specific input. It answers the question "what
is wrong with this field," and there is exactly one field on the form it should sit beside.

A form-level error names a problem with the submission itself, something no single field
caused and no single field can fix. It answers the question "why did submitting the whole
form fail," and there is no correct field to attach it to.

**Field-level example:** "Password must be at least 8 characters." This is about one input,
the password field, and a person fixing it needs to look at that field and that field only.

**Form-level example:** "We could not save your changes. Please try again in a moment."
This is about the submission attempt failing on the server, not about anything the person
typed being wrong, and there is no field to blame it on.

Placement follows directly from the kind. A field-level error rendered only in a summary
banner forces a hunt through every field to find the one meant. A form-level error forced
next to a field it has nothing to do with implies a fixable input mistake where there is
none, which sends the person editing fields that were never the problem.

## Rule 1: appears next to the specific field it is about

Applies to field-level errors only.

- **Fails:** a banner at the top of the form reads "There is a problem with your submission"
  while three fields below are outlined in red with no individual message near any of them.
  Why it fails: the banner names that something is wrong but attaches nothing to any single
  field, so the person has to guess which of the three is the actual problem and why.
- **Passes:** the email field shows "Enter a valid email address, for example
  name@example.com" directly beneath the input itself. Why it passes: the message sits
  exactly where the person is already looking, next to the field it describes.

## Rule 2: states what is specifically wrong

Applies to both field-level and form-level errors.

- **Fails:** "Invalid input." Why it fails: this could describe any field failing for any
  reason. It could be shown under a phone number, a date, or a name field without ever
  sounding wrong, which means it names nothing specific.
- **Fails, form-level:** "Something went wrong." Why it fails: same problem at the
  submission level. A server error, an expired session, and a rate limit could each produce
  this exact sentence.
- **Passes:** "This email address is already registered." Why it passes: names the actual
  reason the input did not pass, specific to that field and that failure.
- **Passes, form-level:** "Your session expired before the form could be submitted." Why it
  passes: names the actual cause of the submission failing, not a generic placeholder.

## Rule 3: states the correct format or requirement

Applies to field-level errors only, since a form-level error has no format to name.

- **Fails:** "Password too short." Why it fails: names that length is the problem but never
  says how many characters are actually required, leaving the person to guess at a number.
- **Fails:** "Phone number is invalid." Why it fails: does not say what format is expected,
  digits only, a country code, a specific number of digits, so a person cannot tell what to
  change.
- **Passes:** "Password must be at least 8 characters and include one number." Why it
  passes: states the exact requirement, so the next attempt can be checked against it before
  submitting again.
- **Passes:** "Enter a 10 digit phone number with no spaces or dashes, for example
  5551234567." Why it passes: states the exact format expected, including a worked example.

## Quick reference for flags

Every flag written against this checklist states: whether the message is field-level or
form-level and why, the exact quoted text, the rule number it fails, and a rewrite that
states the specific problem and, where it applies, the exact format or requirement needed
to pass.
`;

const meta: SkillMeta = {
  slug: "form-field-error-recovery-audit-skill",
  name: "Form Field Error Recovery Audit",
  title: "Form Field Error Recovery Audit Skill",
  category: "design-skills",
  summary:
    "A downloadable instruction pack that audits real form validation error messages for field placement, a specific problem statement and the correct fix format, and separates field-level errors from form-level ones so each gets the placement rule it actually needs.",

  seo: {
    primaryKeyword: "form field error recovery audit skill",
    keywords: [
      "form field error recovery audit skill",
      "free ai skill for form validation errors",
      "downloadable form error message checklist",
      "ai skill to audit form validation copy",
      "form validation error guide for ai assistant",
    ],
    seoTitle: "Form Field Error Recovery Audit Skill: Free AI Skill",
    seoDescription:
      "A free, downloadable form field error recovery audit skill that checks validation error messages for field placement, a specific problem, and the exact fix.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/field-level-vs-form-level.md", content: FIELD_LEVEL_VS_FORM_LEVEL_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Asked to review a form's validation errors, models reliably suggest a generic replacement like 'invalid input' or 'please check this field' instead of stating the specific problem and the exact format or requirement a person needs to fix it. A second common failure is applying the same placement rule to every error alike, flagging a form-level submission failure for lacking field association when it was never supposed to sit next to one field. This skill's checklist forces the kind to be settled first and requires every flag to quote the exact text and cite the specific rule.",
  },

  article: {
    intro: [
      "A form field error recovery audit skill only earns its name if it can catch the gap between a message that looks like feedback and a message a person can actually act on. 'Invalid input' and 'password too short' both look like error handling, but neither tells the person what to type instead, and a banner reading 'there is a problem with your submission' with no field association leaves them guessing which of five fields is actually wrong. This skill is built to check for exactly those gaps, one message at a time.",
      "It ships as two plain text files: a main instructions file setting out the three checkable rules and the four part flag format, and a reference file that explains the field-level versus form-level distinction this skill depends on, with worked pass and fail examples for each rule. Both are previewable in full on this page before you download the .zip, exactly as they ship inside it.",
      "The skill's core discipline is that every flag must quote the exact message, cite the specific rule it fails, and name whether the message is field-level or form-level before judging its placement, because a submission-wide server error and a single field's format mistake need genuinely different handling.",
    ],
    sections: [
      {
        heading: "Why field-level and form-level errors cannot share one placement rule",
        body: [
          "A field-level error, a password that is too short or an email missing an @ sign, is about one specific input and belongs directly beside that input, because the person fixing it needs to find that field without hunting through the rest of the form. A form-level error, a server failure or an expired session mid submission, is about the attempt to submit the whole form, and there is no single field responsible for it or capable of fixing it.",
          "Applying the field association rule to a form-level error produces a false flag: a banner reading 'we could not save your changes' correctly sits near the top of the form, not beside any one field, since forcing it next to a field implies a fixable input mistake where none exists.",
        ],
      },
      {
        heading: "The three checkable rules this form field error recovery audit skill runs",
        body: [
          "Every field-level message is checked against three rules: does it appear next to the specific field it is about, does it state what is specifically wrong rather than a bare judgment like 'invalid,' and does it state the correct format or requirement so the person can actually fix it. A form-level message only faces the second rule, since the first and third assume a specific field to sit near and a specific format to name.",
          "A downloadable form error message checklist with three named, checkable rules is what a free ai skill for form validation errors worth trusting looks like: it turns 'this error message feels unhelpful' into something specific, a field or a submission, a rule number, and an exact fix.",
        ],
      },
      {
        heading: "Before and after: a password field that names the problem but not the fix",
        body: [
          "Before: 'Password too short.' This names that length is the issue but never states how many characters are actually required, so the next attempt is still a guess. After: 'Password must be at least 8 characters and include one number.' The rewrite states the exact requirement, so a person can check their next attempt against it before submitting again rather than trying blindly a second time.",
        ],
      },
      {
        heading: "Before and after: a banner that hides which field actually failed",
        body: [
          "Before: a summary banner reads 'there is a problem with your submission' while three fields below are outlined in red, with no message attached to any of them individually. After: each of the three fields carries its own message directly beneath it, for example 'enter a valid email address, for example name@example.com' under the email field, so the fix sits exactly where the person is already looking.",
        ],
      },
      {
        heading: "How a flag has to be written, as an ai skill to audit form validation copy",
        body: [
          "Every flag quotes the exact message under review unedited, states whether it is field-level or form-level and cites the detail that tells you, names which rule it fails by number, and gives a rewrite that states the specific problem and, for a field-level error, the exact format needed to pass. A flag missing any part is incomplete, and one message never gets folded into a shared comment about several messages at once. Kept together, the two files also work as a form validation error guide for ai assistant teams drafting new validation copy, not only auditing what already ships.",
        ],
      },
      {
        heading: "How this differs from checking empty states or general error clarity",
        body: [
          "A form field error recovery audit skill checks a narrower, different moment than a screen with no data, no search results or a first-time visit: it only runs once a person has actively typed something into a field and that input failed a validation rule. It also goes further than a general audit of user facing error text, since it specifically checks field placement and the field-level versus form-level distinction a broader error message review does not require.",
        ],
      },
    ],
    howTo: {
      name: "How to use the form field error recovery audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/field-level-vs-form-level.md directly on this page before downloading, so you know exactly what standard you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Collect the exact error text and its placement",
          text: "Pull the literal message strings from the live form or its mockups, along with where each one renders: beside its field, a summary banner, or near the submit control.",
        },
        {
          name: "Hand both files and the messages to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the reference file, then supply the batch of real validation messages for a rule by rule audit.",
        },
      ],
    },
    faq: [
      {
        question: "How does this skill decide if an error is field-level or form-level?",
        answer:
          "It looks for the detail that ties a message to one specific input, a named field or a rule that applies to one input only, versus a stated submission, server, network or session failure with no single field responsible. If the description does not give enough detail to tell, the instructions require asking rather than guessing and grading against the wrong placement rule.",
      },
      {
        question: "Why does a form-level error only get checked against one of the three rules?",
        answer:
          "Because the first and third rules assume there is a specific field to sit beside and a specific input format to name, and a form-level error like a server failure has neither. It still has to state what specifically went wrong, which is the one rule that applies to both kinds equally.",
      },
      {
        question: "Will the skill invent a validation requirement that was never given to it?",
        answer:
          "No. If a message says a value is invalid but the actual required format was never supplied, the instructions require noting that the requirement itself is missing and asking for it, rather than guessing a plausible format and grading the message against that guess.",
      },
      {
        question: "Does this skill also decide when validation should run, like on blur or on submit?",
        answer:
          "No. It audits the text and placement of validation messages that already exist on a form. Choosing a validation timing strategy or redesigning the form's layout are decisions the skill deliberately leaves out of scope, the same way it leaves fixing the underlying validation logic to engineering.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the form or error text you eventually audit with it is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the field-level versus form-level explanation and the worked pass and fail examples into their own reference file keeps the main instructions focused on the process, while the reference file can gain more worked examples later without restructuring the instructions that point to it.",
      },
    ],
    internalLinks: [
      {
        href: "/skills/design-skills/empty-state-completeness-skill",
        label: "empty state completeness skill",
        description: "A sibling skill for a screen with no content at all, a different UI moment from a field that was actively filled in and failed validation.",
      },
      {
        href: "/skills/coding-skills/error-message-clarity-audit-skill",
        label: "error message clarity audit skill",
        description: "For general user facing error text and technical detail leakage, a broader check than this skill's narrower focus on field placement and fix format.",
      },
      {
        href: "/skills/design-skills/accessibility-annotation-skill",
        label: "accessibility annotation skill",
        description: "For annotating how a field-level error should be exposed to assistive technology, a natural companion once this skill has confirmed the message itself is correct.",
      },
      {
        href: "/design-prompts/ux-writing-prompt",
        label: "ux writing prompt",
        description: "For drafting the actual replacement copy once this skill has flagged which rule a validation message fails.",
      },
    ],
    externalLinks: [
      {
        href: "https://www.nngroup.com/articles/errors-forms-design-guidelines/",
        label: "Nielsen Norman Group: 10 Design Guidelines for Reporting Errors in Forms",
        description: "An independent usability standard on positioning error messages next to the field they describe, the basis for this skill's field association rule.",
      },
      {
        href: "https://design-system.service.gov.uk/patterns/validation/",
        label: "GOV.UK Design System: Validation Pattern",
        description: "A production standard showing an error summary for submission level problems alongside individual field messages, the same field-level and form-level split this skill checks for.",
      },
      {
        href: "https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html",
        label: "W3C: Understanding Error Suggestion",
        description: "The accessibility success criterion requiring a correction suggestion when an input error is detected, the basis for this skill's format and requirement rule.",
      },
      {
        href: "https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/",
        label: "Smashing Magazine: A Complete Guide To Live Validation UX",
        description: "Background on when and how validation messages should appear relative to the field being filled in, the timing context this skill's placement check assumes.",
      },
    ],
  },

  tags: ["design", "forms", "validation", "ux writing", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
