import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Passive Voice Audit

Use this skill whenever you are asked to review, edit or tighten a piece of
writing and passive voice is in scope: an email, an article, a report, a set
of documentation, a methods section, or general prose someone wants checked
for clarity.

## The checkable rule for spotting passive voice

A sentence is in passive voice when its grammatical subject receives the
action rather than performs it. Mechanically, look for a form of the verb
"to be" (am, is, are, was, were, be, being, been) sitting next to a past
participle, the form a verb takes after "has" (written, reviewed, broken,
given, delivered). An optional "by" phrase may name the actor: "the report
was written by the team." If the "by" phrase is missing, the actor is
implied but not stated.

Do not flag every instance of "was" or "is" on its own. Those verbs are also
the ordinary linking verb in a sentence with no participle at all ("the room
was quiet"). Only flag a "be" verb that is paired with a past participle
carrying out an action.

## Sort every flagged sentence into one of three categories

Passive voice is not automatically a defect. Before recommending a rewrite,
decide which of these three the sentence actually is.

1. **Necessary passive.** The actor is unknown ("the window was broken"
   when nobody knows who broke it), irrelevant to the point being made
   ("the bridge was completed in 1937"), or the sentence's whole purpose is
   to describe a process rather than credit an agent, which is common and
   often correct in scientific or technical writing ("the sample was heated
   to 80 degrees"). Leave these as passive. State why in one line so the
   choice looks deliberate, not missed.
2. **Avoidable passive.** The actor is known, identifiable and relevant to
   the sentence's point, but the sentence was written passive anyway, often
   out of habit or hedging, and reads weaker for it: "the report was
   reviewed by the team" instead of "the team reviewed the report." These
   get an active-voice rewrite.
3. **Evasive passive.** A specific, more serious case of avoidable passive
   where dropping the actor is doing real work: hiding who is accountable
   for something that went wrong. "Mistakes were made." "The deadline was
   missed." The actor is not unknown here, it is omitted on purpose. Flag
   this as its own category, separate from ordinary avoidable passive,
   because the fix is not just grammatical, it is naming who is responsible.

## What every flagged sentence needs

For every sentence sorted into avoidable or evasive, produce a specific
active-voice rewrite, not a general note that the sentence "could be
tightened." Name the actor if the surrounding text supplies one; if the text
genuinely does not say who performed the action, say so rather than
inventing a name, and flag the sentence as needing a stated actor before it
can be rewritten at all.

For every sentence sorted into necessary, say so directly rather than
silently skipping it. A pass that only reports problems, with no record of
what was reviewed and deliberately kept, cannot be checked by anyone else
afterward.

## Output format

Present findings as a short table or list: the original sentence, its
category (necessary, avoidable, or evasive), and either the reason it stays
passive or the active-voice rewrite. Close with a one line count: how many
sentences were necessary passive, how many were avoidable, how many were
evasive. This count is what turns a subjective pass into an auditable one.

## What this skill does not do

It does not rewrite a passage into active voice wholesale on the assumption
that active is always better. A document with every passive construction
stripped out regardless of context reads worse, not better, and a methods
section rewritten to name the researcher in every sentence stops reading
like a methods section. This skill's entire value is the sorting step, not
a blanket search-and-replace.
`;

const WORKED_EXAMPLES_MD = `# Worked examples: necessary, avoidable and evasive passive

Use this alongside \`SKILL.md\` as a bank of checkable examples for each
category. When a real sentence resembles one of these, treat it the same
way.

## Necessary passive: actor is unknown

- "The car was stolen sometime overnight." Nobody currently knows who took
  it, so naming an actor would mean inventing one. Keep as passive.
- "The window was broken during the storm." The storm is a cause, not an
  agent capable of intent, and no person is known to have broken it. Keep
  as passive.

## Necessary passive: actor is irrelevant to the point

- "The bridge was completed in 1937." The sentence's point is the date, not
  the construction firm. Naming the builder would answer a question nobody
  asked. Keep as passive.
- "English is spoken in over sixty countries." The point is the fact of
  distribution, not any single speaker. Keep as passive.

## Necessary passive: the process matters more than the actor

- "The sample was heated to 80 degrees and then cooled for ten minutes."
  A methods section is describing a repeatable procedure, not crediting the
  researcher who stood at the bench. Keep as passive; this is the
  conventional and correct register for that kind of writing.
- "Approval was granted on the second review." In a compliance summary, the
  fact that approval happened is the point; naming the specific approver may
  belong in a different field of the same document, not in this sentence.

## Avoidable passive: actor is known and belongs in the sentence

- Original: "The report was reviewed by the team before it was sent to the
  client." Rewrite: "The team reviewed the report before sending it to the
  client." The actor is already named in the sentence; making it the
  subject shortens the sentence and reads more directly.
- Original: "A decision was made to delay the launch." Rewrite: "The
  product committee decided to delay the launch." If the surrounding text
  names who decided, use that name. If it does not, flag the sentence as
  needing a stated actor rather than inventing "the product committee" from
  nothing.
- Original: "The invoice was sent late." Rewrite: "Accounts payable sent the
  invoice late." Only make this rewrite if the actor is actually recoverable
  from context; otherwise this example behaves like an evasive passive
  instead, see below.

## Evasive passive: the actor is omitted on purpose

- "Mistakes were made." This sentence has no stated actor and, unlike "the
  window was broken," the actor is very likely knowable, it has just been
  left out. Flag this as evasive, not merely avoidable, and ask directly who
  made the mistakes before offering a rewrite.
- "The deadline was missed." Same pattern: a team or a person missed it,
  and the sentence is structured specifically to avoid saying who. The
  correct response is not a mechanical rewrite but a note that the sentence
  is hiding accountability and needs a named actor supplied.
- "Customers were misled by the marketing materials." This one names an
  actor (the marketing materials), so it looks safer than "mistakes were
  made," but check whether "the marketing materials" is itself standing in
  for a person or team that wrote them. If so, treat it as evasive and ask
  who wrote the copy.

## How to tell necessary and evasive apart when they look similar

Both leave the actor out of the sentence. The test is not the grammar, it
is whether the actor is genuinely unknown or irrelevant (necessary) versus
knowable but deliberately withheld, usually because the sentence describes
a failure, an error or a missed commitment (evasive). "The order was
delayed" during a weather event with no one at fault reads as necessary.
"The order was delayed" after a staffing mistake nobody wants to name reads
as evasive. The sentence looks identical; the surrounding context decides
which category it belongs in.
`;

const meta: SkillMeta = {
  slug: "passive-voice-audit-skill",
  name: "Passive Voice Audit",
  title: "Passive Voice Audit Skill",
  category: "writing-skills",
  summary:
    "A downloadable instruction pack that flags passive voice with a checkable be-verb-plus-participle rule, sorts every hit into necessary, avoidable or evasive, and rewrites only the sentences that actually need it.",

  seo: {
    primaryKeyword: "passive voice audit skill",
    keywords: [
      "passive voice audit skill",
      "free ai skill for passive voice",
      "downloadable passive voice checklist",
      "ai skill to flag passive voice sentences",
      "passive voice checker for ai assistant",
    ],
    seoTitle: "Passive Voice Audit Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable passive voice audit skill that flags passive constructions, sorts each one as necessary or avoidable, and rewrites only what needs it.",
  },

  files: [
    { path: "SKILL.md", content: SKILL_MD, kind: "markdown" },
    { path: "reference/worked-examples.md", content: WORKED_EXAMPLES_MD, kind: "markdown" },
  ],

  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5"],
    testingNote:
      "Models asked to eliminate passive voice from a piece of writing tend to treat every instance of a be verb plus a past participle as a defect, stripping process language out of methods sections and technical procedures where passive voice is the conventional and correct choice. This skill's sorting step forces a judgment call before any rewrite, and requires a stated reason whenever a passive sentence is kept rather than changed.",
  },

  article: {
    intro: [
      "A passive voice audit skill is only useful if it can tell necessary passive voice from avoidable passive voice, because a tool that flags every 'was' and 'is' in a document is not auditing anything, it is just pattern matching against a grammatical shape that is often exactly right. This skill starts from a checkable rule for spotting a passive construction, then sorts every hit before recommending a single rewrite.",
      "It ships as two plain text files: a main instructions file that defines the rule and the three categories a flagged sentence can fall into, and a worked examples reference file with side by side cases for each category. Both are previewable in full on this page before you download the .zip, and both are exactly what a teammate or an AI assistant receives once the archive is handed over.",
    ],
    sections: [
      {
        heading: "The checkable rule this skill uses to find passive voice",
        body: [
          "A sentence is passive when its subject receives the action rather than performs it. Mechanically, that means a form of the verb 'to be' sitting next to a past participle, the form a verb takes after 'has': written, reviewed, broken, delivered. An optional 'by' phrase may name the actor directly, as in 'the report was written by the team,' or the actor may be left implied and unstated.",
          "This rule deliberately excludes the ordinary linking use of 'was' or 'is' with no participle attached, as in 'the room was quiet.' A passive voice audit skill that flags every be verb on sight produces noise, not findings, which is why the rule requires the participle to be present and doing the work of describing an action. That precision is also what makes this a genuine ai skill to flag passive voice sentences rather than a blunt find and replace pass.",
        ],
      },
      {
        heading: "Necessary passive: when the actor is unknown or irrelevant",
        body: [
          "Some passive sentences are correct exactly as written. The actor may be genuinely unknown, as in 'the window was broken' when nobody knows who broke it, or irrelevant to the sentence's actual point, as in 'the bridge was completed in 1937,' where the completion date is the point and the construction firm is not. Both stay passive.",
          "The skill's instructions require a one line reason whenever a sentence is kept passive, so the choice reads as deliberate rather than a case that was simply missed during review.",
        ],
      },
      {
        heading: "Avoidable passive: the pattern that actually needs a rewrite",
        body: [
          "An avoidable passive sentence has a known, identifiable actor that belongs in the sentence but was left out anyway, usually from habit: 'the report was reviewed by the team before it was sent to the client' becomes 'the team reviewed the report before sending it to the client.' The actor is already present in the original sentence, so making it the grammatical subject is a mechanical fix, not a guess.",
          "If the surrounding text does not actually name an actor, the skill does not invent one. It flags the sentence as needing a stated actor first, which is a different, smaller instruction than a full rewrite.",
        ],
      },
      {
        heading: "Evasive passive: a different failure from ordinary weak writing",
        body: [
          "'Mistakes were made' is not the same problem as 'the report was reviewed by the team.' Both drop the actor, but an evasive passive drops an actor that is very likely knowable, usually because the sentence describes a failure, an error or a missed deadline nobody wants to name. This skill treats evasive passive as its own category, separate from avoidable passive, because the fix is not a grammatical rewrite, it is a direct question about who is responsible.",
          "Distinguishing the two matters: rewriting 'mistakes were made' into 'mistakes happened in the active voice' misses the point entirely. The actual fix is naming who made them.",
        ],
      },
      {
        heading: "When passive voice is genuinely the right choice",
        body: [
          "Scientific and technical writing conventionally favours passive voice for describing a process, and that convention exists for a reason: a methods section that names the researcher in every sentence stops reading like a methods section and starts reading like a diary. 'The sample was heated to 80 degrees and then cooled for ten minutes' correctly keeps the focus on the procedure, not the person performing it.",
          "A free ai skill for passive voice that cannot recognise this case will strip the register out of exactly the writing where passive voice is doing its job correctly, which is the core failure this skill's sorting step is built to prevent.",
        ],
      },
      {
        heading: "What the output looks like",
        body: [
          "Each flagged sentence is presented with its category, either necessary, avoidable or evasive, and either the reason it stays passive or a specific active-voice rewrite naming the actor. The pass closes with a one line count across all three categories, which is what turns a subjective read-through into something a second person can check against the original text. Used this way, the two files together work as a downloadable passive voice checklist rather than a one-off note.",
        ],
      },
    ],
    howTo: {
      name: "How to use the passive voice audit skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-examples.md directly on this page before downloading, so you know the rule and the three categories before you use them.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Hand the skill a piece of writing",
          text: "Give your assistant both files together with the text you want reviewed, whether that is an email, a report, documentation or a methods section.",
        },
        {
          name: "Apply the rewrites, keep the necessary passives",
          text: "Use the active-voice rewrites for sentences marked avoidable or evasive, and leave sentences marked necessary exactly as written.",
        },
      ],
    },
    faq: [
      {
        question: "Does this skill flag every sentence that contains the word 'was'?",
        answer:
          "No. The rule requires a form of 'to be' paired with a past participle carrying out an action, not just any use of a be verb. A sentence like 'the room was quiet' has no participle and is not passive at all, so it is never flagged by this passive voice audit skill.",
      },
      {
        question: "Why does the skill sort passive sentences into three categories instead of just flagging all of them?",
        answer:
          "Because passive voice is not automatically wrong. Some passive sentences have an unknown or irrelevant actor and are correct as written, some have a known actor left out by habit and need an active rewrite, and some deliberately omit a knowable actor to avoid naming who is responsible. Each needs a different response, not one blanket fix.",
      },
      {
        question: "What is the difference between avoidable and evasive passive voice?",
        answer:
          "Avoidable passive has a known actor left out by habit, and the fix is a straightforward active-voice rewrite using that actor. Evasive passive also has a knowable actor, but the sentence usually describes a failure or a missed commitment and the omission is doing the work of avoiding blame, so the fix is asking who is responsible before any rewrite happens.",
      },
      {
        question: "Will this skill rewrite a scientific methods section into active voice?",
        answer:
          "Not automatically. Passive voice is the conventional and often correct register for describing a procedure rather than crediting the person performing it, and the skill's instructions explicitly protect this case as necessary passive rather than treating it as a defect to be corrected.",
      },
      {
        question: "Is anything uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and no text you eventually review with this skill is ever sent anywhere by this site.",
      },
      {
        question: "Can I edit these files after downloading?",
        answer:
          "Yes. Both files are plain Markdown text, so they open in any text editor. This page is a read only preview of the exact content that downloads, and editing happens afterward in your own editor or in this site's skill building tools.",
      },
      {
        question: "Can I use this as a passive voice checker for ai assistant workflows I already run?",
        answer:
          "Yes. The two files are plain text and framework agnostic, so they attach to any assistant or agent workflow that accepts instructions and reference material, without any change to the rule or the three categories described inside them.",
      },
    ],
    internalLinks: [
      {
        href: "/writing-prompts/proofreading-prompt",
        label: "proofreading prompt",
        description: "For a broader grammar and mechanics pass, of which passive voice is only one checkable piece.",
      },
      {
        href: "/writing-prompts/line-edit-prompt",
        label: "line edit prompt",
        description: "A natural next pass once avoidable and evasive passive sentences have already been rewritten.",
      },
      {
        href: "/writing-prompts/rewrite-for-clarity-prompt",
        label: "rewrite for clarity prompt",
        description: "For a single one-off clarity pass on a short piece of text, rather than a reusable downloadable audit.",
      },
      {
        href: "/tools/readability-score-checker",
        label: "readability score checker",
        description: "For checking whether a passage reads clearly overall, after this skill's sentence level passive voice pass.",
      },
    ],
    externalLinks: [
      {
        href: "https://owl.purdue.edu/owl/general_writing/academic_writing/active_and_passive_voice/choosing_passive_voice.html",
        label: "Purdue OWL: Choosing Passive Voice",
        description: "An independent explainer on when passive voice is the deliberate, correct choice rather than a mistake.",
      },
      {
        href: "https://writingcenter.unc.edu/tips-and-tools/passive-voice/",
        label: "UNC Writing Center: Passive Voice",
        description: "A checkable formula for identifying passive voice and named cases where it is genuinely appropriate.",
      },
      {
        href: "https://www.aje.com/arc/writing-with-active-or-passive-voice",
        label: "AJE: Writing With Active or Passive Voice",
        description: "Guidance on when scientific and academic writing conventionally favours passive voice over active voice.",
      },
    ],
  },

  tags: ["writing", "editing", "passive voice", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
