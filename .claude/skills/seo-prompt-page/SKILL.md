---
name: seo-prompt-page
description: Author or edit a prompt page in this repo (src/prompts/<slug>/meta.ts). Use whenever adding a new prompt, rewriting prompt article copy, fixing a failing `npm run audit:seo` check, or adjusting keywords, FAQ, internal links, EEAT or metadata on an existing prompt. Encodes the full SEO contract every prompt page must satisfy.
---

# Authoring an SEO prompt page

Every prompt on this site is exactly one file:

```
src/prompts/<slug>/meta.ts
```

`npm run gen` discovers the folder and wires it into routing, the sitemap, the mega menu,
the search index and the footer. You never edit a shared barrel file, which is what lets
many people add prompts in parallel without conflicts.

`npm run audit:seo` is the gate. A prompt is not done until it passes with zero errors and
zero warnings, `npx tsc --noEmit` is clean, and `npm run build` succeeds.

---

## 1. The exact match rule

Pick one **focus keyword**. It is a real search phrase someone types, normally
`<task> prompt` or `<thing> prompt for <model>`. That single phrase must appear verbatim in
all four of these:

| Surface | Requirement | Example |
|---|---|---|
| `slug` | The keyword, lowercased, hyphenated, nothing else | `cold-email-prompt` |
| `title` (the H1) | Contains the keyword verbatim | `Cold Email Prompt` |
| `seo.seoTitle` | **Opens with** the keyword, 40 to 65 characters | `Cold Email Prompt: Write Openers That Get Replies` |
| `seo.seoDescription` | Contains the keyword, 135 to 165 characters | `A cold email prompt that researches the prospect first...` |

The keyword must also appear **inside the first 10 percent of the article** (in practice,
the first sentence or two of `intro[0]`) and in **at least one h2**.

### Do not prefix titles with a fixed string

It is tempting to put `100% Free Online ...` in front of every title. Do not. It spends the
highest value characters in the SERP on words that are identical across 148 results, it
pushes the focus keyword out of the leading position, and an identical boilerplate string
repeated across every `<title>` on a domain is a templated pattern signal. Communicate
"free" in the meta description and in the on page badge instead, and vary the phrasing.

---

## 2. Keywords: one focus, three to six long tails, zero cannibalisation

`seo.keywords` holds **4 to 7 entries**. Index 0 is the focus keyword. The rest are 3 to 6
long tail variants, each of which must:

- be **three words or longer** (a two word phrase is a head term, not a long tail),
- **read as something a person would actually type into a search box**, not as a description
  of the page. The auditor checks this with a query anchor: the phrase has to contain a word
  like `prompt`, `chatgpt`, `claude`, `how to`, `template`, `example`, `guide`, `best`, `free`,
  `vs`, `for` or a similar query marker. "naming a budget owner for a proposal" is a true
  sentence about the page and not a query. "how to name a budget owner in a proposal" is the
  same idea shaped like something someone searches,
- **actually appear** somewhere in the article body, verbatim,
- be **globally unique across the entire site**. The auditor keeps a map of every keyword
  claimed by every page and fails the build when two pages target the same phrase.

That last rule is the anti cannibalisation gate and it is strict on purpose, and it interacts
with the query shape rule: a phrase nobody else has claimed is very often a phrase nobody
searches. Four keywords that are all real queries beat seven where three were invented to
clear the uniqueness check. Prefer fewer, better keywords over hitting the top of the range.

### Draft the keywords into sentences before writing any prose

This is a process rule, not a style preference, and skipping it is the single most common
cause of a failed audit in this repo.

Before writing a word of the article, write out every keyword you plan to use, then draft
each long tail into a **specific planned sentence** and note which section it will live in.
Only then write the article around those sentences.

The failure mode it prevents is retrofitting. Write the article first and you will produce
good prose that happens to omit two or three long tails, and the auditor will reject it.
Fixing it afterwards means bolting a phrase into a paragraph that did not need it, which
reads exactly as awkwardly as it sounds.

The phrasings that get forgotten most reliably are the `ai prompt for <task>` and
`how to <do task> with ai` forms, because they are the least natural to write unprompted.
Assign those two a sentence first.

Pick long tails that describe **genuinely different searches**, not restatements:

- a task phrasing: `how to write a cold email with ai`
- a model phrasing: `chatgpt prompt for cold outreach`
- an outcome phrasing: `cold email that gets a reply`
- an audience phrasing: `cold email prompt for b2b sales`
- an objection phrasing: `personalised cold email without templates`

Aim for high intent and low competition. `ai prompts` is worthless to target. `cold email
prompt for saas founders` is winnable and the person searching it is ready to use it.

---

## 3. Article requirements

| Rule | Value |
|---|---|
| Total article words | 900 to 1380 |
| Focus keyword density | 0.7 to 2.0 percent, aim for 1.0 to 1.4 |
| Focus keyword position | within the first 10 percent of the article |
| Intro paragraphs | 2 to 4 |
| h2 sections | 4 to 8 |
| How to steps | 3 to 6 |
| FAQ items | 4 to 8, every answer at least 30 words |
| Internal links | exactly 3 or 4, at least 2 inside the same category |
| Outbound links | exactly 3 or 4, each on a distinct domain |

Density is measured as `(occurrences x words_in_phrase) / total_words x 100`. For a three
word keyword in a 1100 word article, roughly four or five verbatim uses lands near 1.1
percent. Write them where the phrase reads naturally: the opening sentence, one h2, one
body paragraph, one FAQ question. Never force it into a sentence that sounds odd read
aloud, and never write it twice in one paragraph.

The `PlatformNote` block below the FAQ is shared boilerplate and is **excluded from the
word count**. It cannot be used to reach the 900 word minimum.

---

## 4. The trust block: only claims that are true

```ts
eeat: {
  author: "Fast Prompts",
  authorCredential: "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
  testedOn: ["GPT-5.2", "Claude Opus 4.5"],   // models the prompt is WRITTEN FOR
  testingNote: "The failure mode this prompt prevents, and the constraint that prevents it",
}
```

This block renders under the H1 and is the strongest trust signal on the page,
which is exactly why it must not contain anything invented.

**Authorship is the organisation, not a person.** Attributing a page to a named
individual asserts that they wrote and checked it. Do not make that claim on
their behalf. A real person is named as founder in Organization schema, which
is a true statement about who is accountable for the directory.

**`testedOn` means written for.** It renders as "Written for GPT-5.2, Claude
Opus 4.5". It does not assert that anyone ran the prompt against them.

**`testingNote` is a design note, not an anecdote.** State what models reliably
get wrong on this task and the constraint that stops it. It must be at least 25
words, must be unique across the site, and the auditor fails duplicates.

Do not write a first person account of a specific occasion. This is the rule
that matters most, because it is the one that produces text which reads
brilliantly and is entirely false:

Wrong: "I tested this on eleven alerts saved from a retail warehouse over one
winter. Seven of them were seasonal."

Right: "A model shown a spike will explain it, and the explanation arrives
whether or not the spike is real. Gating the analysis behind a completeness
check and a seasonality check, in that order, is what stops a reporting lag
being reported as a collapse in demand."

The second is more useful to a reader, and it is true. The first is a
fabricated provenance claim on a page carrying advertising.

Also wrong, for the same reason: counts of trials, named clients, colleagues,
classrooms, dashboards you maintained, "four of six", "my own last three roles".

**This is not only a `testingNote` rule.** The auditor also scans the article body,
`howTo` steps and FAQ answers for the same fabrication-flavoured phrasing ("in my
experience", "I have seen", "before I had run", "in eleven years I have"). FAQ
*questions* are exempt, since a reader asking "Can I use this before I have any
customers?" is legitimate first person in the reader's own voice. FAQ *answers*
are not: write them the same impersonal way as the testing note.

## 5. The prompt itself has to be genuinely good

This is the part people came for. A prompt that just says "write a cold email for my
product" is worthless and the whole page is then worthless with it.

- `prompt.text` is at least 60 words and states the role, the inputs, the constraints, the
  success criteria and the required output format.
- Every `{{TOKEN}}` used must be declared in `prompt.variables`, and every declared
  variable must be used. The auditor checks both directions.
- Every variable needs a **concrete** `example`, because the panel offers a one click fill
  from those examples and a vague placeholder makes the demo useless.
- `prompt.expectedOutput` tells the reader how to know the response was good.
- `prompt.pitfalls` is where the real value hides. Write the failure you actually saw.

The house test: would a competent person in that job use this prompt as written, or would
they rewrite it? If the second, it is not finished.

---

## 6. Internal links: build the cluster inside the category

Exactly 3 or 4 entries in `article.internalLinks`, each `{ href, label, description }`.

- **At least 2 must stay inside the current category.** That is what builds the topic
  cluster and concentrates authority on the category's head term. The auditor enforces it.
- One link should leave the category, which is what binds ten clusters into one site.
- `href` is root relative and must resolve to a prompt that exists. Dead internal links
  fail the build.
- `label` reads as a natural keyword phrase, never "click here".
- Never link a page to itself.

---

## 7. Outbound links: cite primary sources only

Exactly 3 or 4 entries, each on a **distinct domain**, each `https://`.

Acceptable sources are primary documentation, published research and standards bodies:

- Model documentation: `platform.openai.com`, `docs.anthropic.com`, `ai.google.dev`
- Research: `arxiv.org`, `aclanthology.org`, `dl.acm.org`
- Standards and guidance: `nist.gov`, `w3.org`, `developers.google.com/search`
- Named institutional sources for domain claims, for example `hbr.org` for a management
  claim or `nngroup.com` for a usability one

Never link to a competing prompt directory, a content farm, an SEO blog, or anything that
could disappear. `description` explains why that source is authoritative **for the specific
claim it supports**, not what the site is in general.

---

## 8. Not looking like a content farm

The auditor runs near duplicate detection across the whole catalogue: Jaccard similarity
over 5 word shingles, failing above 22 percent and warning above 14 percent, plus a check
that no sentence of 8 or more words appears on more than two pages. It also blocks a list
of filler phrases outright.

Passing those checks mechanically is not the same as being distinct. The things that
actually make pages differ:

1. **Vary the section shape.** Not every page needs the same five headings in the same
   order. Some prompts deserve a comparison `table`, some deserve `subsections`, some
   deserve a long `list` and three short sections.
2. **Write from the specific failure.** Every prompt has a characteristic way it goes
   wrong. That is different for every prompt and cannot be templated.
3. **Vary the FAQ count and register.** Four sharp questions beats eight padded ones.
4. **Do not reuse an analogy or an opening move.** If two intros both open by describing
   what most people get wrong, rewrite one.
5. **Let length vary inside the band.** 148 pages all landing at 1,150 words is itself a
   pattern.

---

## 9. House style

- **No em dashes and no en dashes anywhere.** Use a comma, a full stop, or restructure.
  The auditor fails on the characters themselves.
- Plain declarative sentences. No marketing throat clearing.
- British or American spelling, but be consistent within a page.
- Never claim a result the prompt cannot deliver. This is a directory people will test
  immediately, and an overclaim is discovered in one attempt.

---

## 10. Checklist before you call it done

```
npm run gen && npx tsc --noEmit && npm run audit:seo && npm run build
```

All four clean, no warnings, or it is not finished.
