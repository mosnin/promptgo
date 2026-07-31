import type { SkillMeta } from "@/lib/skill-types";

const SKILL_MD = `# Inbox Triage Rule Builder

Use this skill when someone asks you to build triage rules for an inbox, a
support queue, or any other stream of incoming requests (email, tickets,
chat messages), so every future message can be sorted and prioritized
without a human re-deciding it from scratch each time.

## What this skill refuses to do

It refuses to hand back a generic rule set built from common sense instead
of the specific person's actual situation. "Always respond to your boss
first," "urgent subject lines go to the top," and "customers before
internal requests" are the default output of a model asked to write triage
rules with no real input, and every one of them can be wrong for a
specific person. A boss who only ever sends low stakes scheduling notes is
not a priority sender. A customer with a lapsed contract might matter less
than an active renewal in progress. This skill will not produce a rule
that cannot be traced back to something the user actually told it.

## Step 1: collect the three real inputs before drafting anything

Ask for, and wait for, three specific things. Do not proceed with
placeholders or invented defaults for any of them.

1. Real VIP senders or sender categories, by name or role, not a generic
   tier like "clients" or "leadership." Ask who specifically, and whether
   that status is permanent or conditional (an accountant who only matters
   during a filing window, for example).
2. Real request categories, the actual kinds of messages that land in this
   inbox, in the user's own words. Do not substitute a generic taxonomy
   like "sales, support, internal."
3. A real, specific definition of urgent, stated as a consequence, not a
   feeling. Ask what actually goes wrong if a message in this inbox is
   not answered within a given window, and what does not.

If any of the three is missing, stop and ask for it rather than
substituting a plausible guess. State plainly which input is missing in
your reply.

## Step 2: draft one rule per stated criterion, and cite the source

For each rule you draft, write it as a condition and an action, then a
one line citation back to the exact input that justified it. A rule with
no citation does not belong in the output. This is what separates a real
inbox triage rule skill from a list of platitudes: every line traces to
something the specific user said, not to a genre convention about how
inboxes usually work.

Do not merge two of the user's stated criteria into one rule unless the
user described them as linked. Keep the traceability granular enough that
removing one input later lets you remove exactly the rules it justified,
nothing else.

## Step 3: build the tie-breaking order, not just a rule list

A flat, unordered list of rules breaks the first time two rules both match
the same message. Before finishing, ask the user (or infer only from what
they already told you, and flag the inference as such) which axis
outranks which: does sender identity beat request category when both
point in different directions, or the reverse. Write that ranking down as
an explicit, numbered tie-break sequence, and test it against at least one
message that could plausibly match more than one rule.

Every tie-breaking decision must also cite its source: either a direct
statement from the user about which axis matters more, or an explicit
label that it was inferred and should be confirmed.

## Step 4: define the default for anything that matches nothing

Every real rule set eventually meets a message that matches none of the
drafted rules. State a default explicitly (commonly, a middle tier with a
same day or next business day response window) and require that
unmatched messages get logged as a gap to review, rather than silently
forced into whichever rule looks closest. A skill that invents a rule to
cover a gap on the spot is doing exactly the generic-rule guessing this
skill exists to prevent, just one step later in the process.

## Output format

Return the rule set as a numbered, prioritized list, each entry showing
the condition, the resulting action or tier, and the one line citation to
its source input. Follow it with the tie-break sequence as its own
numbered list, and close with the stated default for anything that
matches no rule. See \`reference/worked-example.md\` for a complete example
of this format built from a real, specific set of stated criteria.

## When the user's criteria change

Triage criteria drift: a VIP client relationship ends, a new request
category appears, the real definition of urgent shifts with the season.
When asked to update an existing rule set, ask which specific input
changed rather than rebuilding the whole list from scratch, and only
touch the rules that traced to that input.
`;

const WORKED_EXAMPLE_MD = `# Worked example: from stated criteria to a prioritized rule set

Use this alongside \`SKILL.md\`. It shows one complete pass through the
process: the specific criteria a real user might state, the rule set
built from them, and the tie-break order that resolves messages matching
more than one rule.

## The stated criteria

A freelance consultant gave these four answers when asked for the three
required inputs (the fourth came up unprompted and was kept because it
was specific and real):

1. "My only two VIP senders are Radha at Merrow Logistics and Dev at
   Kestrel Health, my two retainer clients. Nobody else gets VIP status,
   no matter their job title."
2. "My accountant becomes VIP only between January 1 and April 15, and
   only for messages about tax filing deadlines. The rest of the year she
   is a normal sender."
3. "My real request categories are: contract or payment matters,
   scope-change requests on active work, new-lead inquiries from people
   I have not worked with, and internal admin or newsletters."
4. "Urgent means it will cost me money or damage a client relationship if
   I do not answer within four business hours. The word urgent in a
   subject line means nothing to me on its own."

## The resulting prioritized rule set

1. Message is from Radha or Dev, and concerns a contract, payment, or
   scope change on active work. Tier 1, respond within four business
   hours. Source: criteria 1 and 4, sender plus the stated cost
   definition of urgent.
2. Message is from the accountant, dated between January 1 and April 15,
   about a filing deadline. Tier 1, respond within four business hours.
   Source: criteria 2 and 4, conditional VIP status plus the same
   urgency definition.
3. Message is from Radha or Dev on any other topic. Tier 2, respond
   within one business day. Source: criterion 1 alone; sender status
   without a matching urgency trigger does not earn the four hour
   window.
4. Message is a new-lead inquiry from someone outside the two retainer
   relationships. Tier 2, respond within one business day, batched with
   other new leads. Source: criterion 3.
5. Message is internal admin or a newsletter. Tier 3, reviewed weekly,
   no individual reply required. Source: criterion 3.

## The tie-break order

Some messages could plausibly match more than one rule above. This order
resolves those conflicts, ranked from strongest to weakest claim:

1. A message matching both a Tier 1 rule (1 or 2) and any lower rule
   always resolves to Tier 1. The cost based urgency definition in
   criterion 4 outranks everything else, because the user named
   consequence, not sender identity or topic, as what urgent actually
   means.
2. A message matching both rule 3 (VIP sender, non-matching topic) and
   rule 4 (new-lead inquiry), such as Radha forwarding an unrelated lead,
   resolves to rule 3. Sender identity was stated as a standing property
   of the relationship, so it outranks a message's category when the
   sender is already established as one of the two retainer clients.
3. A message matching both rule 4 and rule 5, such as a lead inquiry
   embedded inside a forwarded newsletter digest, resolves to rule 4. A
   specific, addressable request outranks admin noise even when it
   arrives inside something that otherwise reads as bulk mail.
4. A message matching none of the five rules defaults to Tier 2, review
   within one business day, and gets logged as a gap to raise with the
   user rather than folded into the nearest looking rule. Two logged
   gaps of the same shape are a signal a new rule is needed, not a
   coincidence to keep absorbing silently.

## Why this order, and not a different one

The order follows directly from what the user said mattered, not from a
convention about how inboxes are usually run. Criterion 4 defines urgency
as a consequence, so anything that clears that bar outranks sender or
category alone. Criterion 1 fixes sender identity as a standing property
of exactly two relationships, so it outranks a one-off message category.
Nothing in this order reflects a general belief about how support queues
or busy executives should be triaged; change any one of the four stated
criteria and the ranking changes with it, not the other way around.
`;

const meta: SkillMeta = {
  slug: "inbox-triage-rule-skill",
  name: "Inbox Triage Rule Builder",
  title: "Inbox Triage Rule Skill",
  category: "productivity-skills",
  summary:
    "A downloadable instruction pack that builds a prioritized set of inbox or ticket triage rules from a person's own real VIP senders, request categories and urgency definition, and refuses to invent generic rules that were never actually stated.",

  seo: {
    primaryKeyword: "inbox triage rule skill",
    keywords: [
      "inbox triage rule skill",
      "free ai skill for email triage rules",
      "downloadable inbox triage rule template",
      "ai skill to prioritize support tickets",
      "how to build triage rules from your own priorities",
    ],
    seoTitle: "Inbox Triage Rule Skill: Free AI Skill Download",
    seoDescription:
      "A free, downloadable inbox triage rule skill that builds prioritized triage rules from your own real VIP senders, request categories and urgency definition.",
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
      "Models asked to write inbox or ticket triage rules with little or no real input default to generic, one-size-fits-all advice, such as prioritizing a manager's messages or anything marked urgent, regardless of whether that pattern matches the specific person's actual senders or stakes. This skill requires three concrete inputs before drafting a single rule, forces every rule and every tie-break decision to cite the stated criterion it comes from, and refuses to fill a missing input with a plausible sounding default.",
  },

  article: {
    intro: [
      "An inbox triage rule skill is only useful if the rules it produces come from the person's actual inbox, not from a generic idea of how inboxes work. Asked to write triage rules with nothing to go on, most AI assistants reach for the same handful of platitudes: reply to your boss first, treat anything marked urgent as urgent, put customers ahead of internal requests. Every one of those can be exactly wrong for a specific person's real situation. This skill is built to refuse that shortcut entirely.",
      "It ships as two plain text files: a main instructions file and a worked reference example, from stated criteria to a finished, prioritized rule set with an explicit tie-break order. Both are previewable in full before you download the .zip, and both are exactly what an assistant or a teammate receives once you hand the archive over.",
    ],
    sections: [
      {
        heading: "Why generic triage rules get refused",
        body: [
          "A rule like always respond to your boss first sounds safe, and that is exactly the problem: it sounds safe regardless of whether it is true. A boss who sends only low stakes scheduling notes is not a priority sender, and a former manager who still has an old distribution list is not a VIP just because their title used to matter. This skill's first discipline is refusing to output any rule that cannot be traced back to something the specific user actually said.",
          "This is the core difference between a free ai skill for email triage rules that just sounds confident and one that is actually useful: confidence is cheap, traceability is not. Every rule this skill produces carries a one line citation back to the input that justified it, so a reviewer can check the reasoning instead of just trusting the output.",
        ],
      },
      {
        heading: "The three real inputs this skill requires",
        body: [
          "Before drafting a single rule, the skill collects three specific things from the user: real VIP senders named by person or role rather than a generic tier, the real categories of requests that actually land in this inbox in the user's own words, and a real, specific definition of urgent stated as a consequence rather than a feeling. If any of the three is missing, the skill stops and asks for it rather than filling the gap with a plausible sounding default.",
          "This is what a downloadable inbox triage rule template needs to be worth using at all. A template that already knows who your VIP senders are before you have told it anything is not a template, it is a guess wearing a template's structure.",
        ],
      },
      {
        heading: "How each rule earns its citation",
        body: [
          "Every rule this inbox triage rule skill outputs is written as a condition, an action, and a one line citation to the exact input that justified it. A rule with no citation does not make it into the final list. This keeps the rule set honest and maintainable: when one input changes later, such as a client relationship ending, only the rules that trace to that input need to be revisited.",
          "The same discipline applies whether this is being used as an ai skill to prioritize support tickets in a shared queue or as a personal rule set for one inbox. The mechanism does not change with the channel; only the senders, categories and urgency definition do.",
        ],
      },
      {
        heading: "Building the tie-break order, not just a list",
        body: [
          "A flat, unordered list of rules works right up until two rules both match the same message, and then it stalls exactly when a decision is needed most. This skill requires an explicit, numbered tie-break sequence stating which axis outranks which, sender identity against request category, one urgency trigger against another, tested against at least one message that could plausibly satisfy more than one rule.",
          "Learning how to build triage rules from your own priorities means deciding, in advance and on the record, what wins when two of your own stated priorities point in different directions for the same message. Leaving that decision for the moment a real conflicting message actually arrives is how inboxes end up triaged on gut feeling instead of on the rules that were supposedly already set.",
        ],
      },
      {
        heading: "A worked example: from stated criteria to a prioritized rule set",
        body: [
          "The bundled reference file walks through one complete pass: a freelance consultant states two named retainer clients as VIP senders, a conditional VIP status for an accountant during tax season only, four real request categories, and an urgency definition tied to cost and relationship risk rather than tone or subject line wording.",
          "From those four statements the reference file builds a five rule prioritized set and a four step tie-break order, covering what happens when a VIP sender writes off topic and what happens when a message matches nothing at all. Every rule and tie-break step carries its citation back to one of the four original statements, so the example doubles as a template for the citation discipline itself.",
        ],
      },
      {
        heading: "Keeping the rule set current as priorities change",
        body: [
          "Triage criteria drift. A retainer client relationship ends, a new request category appears, the definition of urgent shifts with the season the way the accountant's status does in the worked example. When asked to update an existing rule set, the skill asks which input changed rather than rebuilding the whole set, and only touches the rules and tie-break steps that traced to it.",
        ],
      },
    ],
    howTo: {
      name: "How to use the inbox triage rule skill",
      steps: [
        {
          name: "Preview both files",
          text: "Read SKILL.md and reference/worked-example.md directly on this page before downloading, so you know exactly what you are about to hand to an assistant.",
        },
        {
          name: "Download the .zip",
          text: "One button builds the archive from the exact files shown in the preview and downloads it, entirely in your browser.",
        },
        {
          name: "Gather your three real inputs",
          text: "Before using the skill, write down your actual VIP senders, your actual request categories, and your own specific definition of urgent stated as a consequence.",
        },
        {
          name: "Hand both files to your assistant",
          text: "Keep the folder structure intact so the main instructions file can point to the worked example, then supply your three real inputs and ask for the prioritized rule set with a tie-break order.",
        },
      ],
    },
    faq: [
      {
        question: "What happens if I only give this skill one VIP sender and no request categories?",
        answer:
          "The skill stops and asks for the missing input rather than inventing generic request categories to fill the gap. It states plainly which of the three required inputs is missing so you know exactly what to supply before this inbox triage rule skill can build a usable rule set.",
      },
      {
        question: "Will this skill ever write a rule like always reply to my manager first?",
        answer:
          "Only if you specifically told it your manager's messages meet your own stated urgency definition or VIP criteria. Otherwise that rule is exactly the kind of generic, untraceable output this skill's instructions explicitly forbid, regardless of how common that advice sounds elsewhere.",
      },
      {
        question: "What is the tie-break order and why does it matter?",
        answer:
          "It is an explicit, numbered sequence stating which rule wins when a single message could match more than one drafted rule, such as a VIP sender writing about a topic that does not meet your urgency definition. Without it, conflicting messages get triaged inconsistently by whoever happens to be reading.",
      },
      {
        question: "Can this skill be used for a shared support queue instead of a personal inbox?",
        answer:
          "Yes. The same three inputs and the same citation and tie-break discipline apply whether the incoming stream is a personal inbox, a shared support queue, or a ticketing system; only the senders, categories and urgency definition need to change.",
      },
      {
        question: "Is anything I type uploaded when I preview or download this skill?",
        answer:
          "No. The file preview and the .zip download both happen entirely in your browser. There is no server call behind either action, and none of the real criteria you eventually give the skill is ever sent anywhere by this site.",
      },
      {
        question: "Why does the skill use two files instead of one?",
        answer:
          "Splitting the worked example into its own reference file keeps the main instructions file focused on process, while the example can be read on its own as a model of the citation and tie-break format before you supply your own real criteria.",
      },
    ],
    internalLinks: [
      {
        href: "/productivity-prompts/inbox-triage-prompt",
        label: "inbox triage prompt",
        description: "For a single one-off sort of a batch of messages into reply, delegate, schedule or archive, rather than a reusable downloadable rule set.",
      },
      {
        href: "/productivity-prompts/task-prioritisation-prompt",
        label: "task prioritisation prompt",
        description: "For ranking and capping a backlog of tasks by the same real-capacity discipline this skill applies to incoming messages.",
      },
      {
        href: "/productivity-prompts/email-reply-prompt",
        label: "email reply prompt",
        description: "A natural next step once a message has been triaged into a tier this skill's rules mark for a reply.",
      },
      {
        href: "/productivity-prompts/delegation-brief-prompt",
        label: "delegation brief prompt",
        description: "For handing off a message this skill's rules route away from you, once triage has decided it should not land on your own desk.",
      },
    ],
    externalLinks: [
      {
        href: "https://hbr.org/2015/05/strategies-for-every-type-of-email-pain",
        label: "Harvard Business Review: Strategies for Every Type of Email Pain",
        description: "An independent look at how different kinds of email overload call for different handling strategies rather than one universal rule.",
      },
      {
        href: "https://www.todoist.com/productivity-methods/eisenhower-matrix",
        label: "Todoist: Avoid the Urgency Trap with the Eisenhower Matrix",
        description: "Background on separating stated urgency from actual importance, the same distinction this skill's urgency definition step enforces.",
      },
      {
        href: "https://support.zendesk.com/hc/en-us/articles/4964463770650-About-intelligent-triage",
        label: "Zendesk Help: About Intelligent Triage",
        description: "How a real support platform classifies and routes incoming tickets, a useful comparison for triage built on stated criteria instead of automated classification.",
      },
      {
        href: "https://asana.com/resources/how-prioritize-tasks-work",
        label: "Asana: How to Prioritize Tasks at Work",
        description: "A practical walkthrough of ranking incoming work by real constraints, relevant to the tie-break ordering step this skill requires.",
      },
    ],
  },

  tags: ["productivity", "inbox", "triage", "skill"],
  updated: "2026-07-31",
  published: "2026-07-31",
  featured: false,
};

export default meta;
