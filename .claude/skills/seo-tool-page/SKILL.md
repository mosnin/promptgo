---
name: seo-tool-page
description: Author or edit an interactive tool page in this repo (src/tools/<slug>/meta.ts + compute.ts). Use whenever adding a new tool, writing a tool's compute logic, fixing a failing `npm run audit:tools` check, or adjusting a tool's fields, keywords, FAQ or EEAT. Encodes the full SEO and correctness contract every tool page must satisfy. For an AI prompt page instead, use the seo-prompt-page skill.
---

# Authoring an SEO tool page

Every tool on this site is exactly two files:

```
src/tools/<slug>/meta.ts       content, SEO, and the declarative field schema
src/tools/<slug>/compute.ts    the pure function that does the actual work, plus its self tests
```

`npm run gen` discovers the folder and wires it into routing, the sitemap, the search index
and navigation. You never edit a shared barrel file.

`npm run audit:tools` is the gate. A tool is not done until it passes with zero errors, every
self test passes, `npx tsc --noEmit` is clean, and `npm run build` succeeds.

A tool is a genuinely different product from a prompt page: it computes an actual answer
rather than generating text for a model to run. That difference is why the contract below
adds a correctness requirement (section 5) that has no equivalent on a prompt page. Getting
an AI prompt's phrasing slightly wrong produces an awkward article. Getting a calculator's
arithmetic wrong produces a page that quietly tells someone the wrong number, on a page
carrying advertising. Treat compute.ts with the seriousness that implies.

---

## 1. The exact match rule

Pick one **primary keyword**. It is a real search phrase someone types, normally
`<thing> <verb>` (`utm link builder`, `contrast checker`) or `free <thing> tool`. That single
phrase must appear verbatim in all four of these:

| Surface | Requirement | Example |
|---|---|---|
| `slug` | The keyword, lowercased, hyphenated, nothing else | `utm-link-builder` |
| `title` (the H1) | Contains the keyword verbatim | `UTM Link Builder` |
| `seo.seoTitle` | **Opens with** the keyword, 40 to 65 characters | `UTM Link Builder: Free Campaign Tracking URLs` |
| `seo.seoDescription` | Contains the keyword, 135 to 165 characters | `A free UTM link builder that appends source, medium...` |

The keyword must also appear **inside the first 10 percent of the article** and in **at least
one h2**.

---

## 2. Keywords: one primary, three to six long tails, zero cannibalisation

Same shape as a prompt page's keyword set, with a different query anchor list since nobody
searches "chatgpt" for a calculator. `seo.keywords` holds **4 to 7 entries**. The rest must:

- be **three words or longer**,
- **read as something a person would actually type**, checked against an anchor list of
  `tool, tools, free, online, generator, calculator, checker, converter, builder, maker,
  how to, what is, which, template, example, guide, best, vs`. "a discount stacking
  calculation" is a description. "free discount stacking calculator" is a query,
- **actually appear** somewhere in the article body, verbatim,
- be **globally unique across the entire site, prompts included**. A tool cannot claim a
  keyword a prompt page already owns, and vice versa; the auditor checks both catalogues
  together.

Draft each long tail into a specific planned sentence before writing the article, the same
discipline as a prompt page, for the same reason: retrofitting a keyword into finished prose
produces an awkward forced sentence, and forgetting one fails the build.

---

## 3. Article requirements

Identical numbers to a prompt page:

| Rule | Value |
|---|---|
| Total article words | 900 to 1380 |
| Focus keyword density | 0.7 to 2.0 percent |
| Focus keyword position | within the first 10 percent of the article |
| Intro paragraphs | 2 to 4 |
| h2 sections | 4 to 8 |
| How to steps | 3 to 6 |
| FAQ items | 4 to 8, every answer at least 30 words |
| Internal links | exactly 3 or 4 |
| Outbound links | exactly 3 or 4, each on a distinct domain |

Internal links may point at other tools or at prompts; a tool and the prompt that covers the
same topic in prose are natural cross links (the freelance rate calculator links to the
freelance rate prompt, and back). Outbound links for a tool usually cite the standard,
formula or spec the tool implements rather than research on AI use: MDN, a W3C spec, the
WCAG guidelines, IRS or GOV.UK guidance for a finance tool, and so on. Same rule as prompts:
primary sources only, never a competing tool directory.

---

## 4. The trust block, adapted for a tool

```ts
eeat: {
  author: "Fast Prompts",
  authorCredential: "Written and maintained by the Fast Prompts editorial team against the contract in our authoring standard.",
  testedOn: ["WCAG 2.1 contrast formula"],   // the standard, formula or browser API the tool is BUILT ON
  testingNote: "What the tool actually verifies, stated as fact because it can be proven",
}
```

Same shape as a prompt page's trust block, one field repurposed. `testedOn` does not name AI
models, since a tool does not prompt one: it names the real standard, published formula, or
browser API (`SubtleCrypto`, `Intl.DateTimeFormat`, `WCAG 2.1`, `Flesch-Kincaid`) the
`compute()` function is actually built on. This has to be true and specific, not a vague
"industry standard".

Unlike a prompt's "written for" framing, a tool's claim is mechanically checkable: section 5
below is what makes it true rather than aspirational. `testingNote` should describe what was
actually verified by the self tests, not a design intention.

The same fabrication rules from the prompt skill apply without change: no first person
anecdote, no invented occasion, organisation authorship only, and the auditor scans article
body, `howTo` steps and FAQ answers (not FAQ questions) for the same fabrication-flavoured
phrasing.

---

## 5. compute.ts has to be genuinely correct, and provably so

This is the section with no prompt page equivalent.

```ts
import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

export const compute: ComputeFn = (inputs) => {
  // Read inputs, validate, return a ToolResult.
  // Pure: no network, no DOM, no Date.now(), no Math.random(). Same inputs,
  // same output, every time, so it can be tested like any pure function.
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "a plain sentence describing the case",
    inputs: { /* realistic field values */ },
    check: (result) => result.kind === "value" && result.headline.value === "42",
  },
  // at least 3, more for anything with real edge cases
];
```

Requirements, all enforced by `npm run audit:tools`:

- **At least 3 self tests**, each checking the *actual value* of the result, not just its
  shape. `check: (r) => r.kind === "value"` passes a tool that computes the wrong number just
  as happily as a correct one and is not a real test.
- Cover the **happy path**, at least one **edge case** the field's own constraints allow
  (an empty optional field, a boundary value, an already-populated input the tool has to
  merge with rather than overwrite), and at least one **invalid input** that should return
  `{ kind: "error", message: ... }` rather than throwing or silently producing nonsense.
- `compute()` must not throw on the example values declared in `fields[]`. Those examples are
  what pre-populates the tool on page load, so a throw there means every visitor sees a
  broken tool before touching anything.
- **Never assert a fact that can go stale or vary**: a tax rate, a benchmark salary, a cost of
  living index, a currency exchange rate. Take it as a field instead. This is the tool
  equivalent of the prompt catalogue's fabrication rule: a hard coded "current" tax bracket
  is a false claim the moment the rate changes, on a page nobody will remember to revisit.
- Prefer the browser's own APIs over hand rolled logic where one exists and is correct:
  `URL`/`URLSearchParams` for link building, `Intl.DateTimeFormat`/`Intl.NumberFormat` for
  locale aware formatting, `crypto.subtle` for hashing, the `qrcode` package (already a
  dependency) for QR generation. A hand rolled reimplementation of something the platform
  already does correctly is where subtle bugs live.

The house test: would a competent person in that job trust this number without checking it
by hand once? If you would not, rewrite the logic or add the missing input field, don't ship
a plausible looking guess.

---

## 6. Fields: the form is data, not a component

`fields: ToolField[]` in meta.ts, rendered by the shared `ToolForm`. Available kinds:
`number`, `text`, `textarea`, `select`, `date`, `checkbox`, `list` (repeatable rows of the
other kinds, for things like multiple discounts or multiple time zones).

- Every field needs a concrete `example` value. The tool pre-fills from these on load, so a
  vague or empty example means the tool shows nothing useful until a visitor starts typing,
  which defeats the point of an interactive demo.
- `label` is what the visitor reads, not the internal `token`. Write it as a person would ask
  for the value, not as a variable name.
- Use `help` for anything a label alone doesn't make obvious (units, format, why it's optional).
- Reach for a **result shape** rather than inventing one: `value` (a calculator's headline
  number plus supporting figures), `table` (an amortisation schedule, a working-days list),
  `text` (a generated URL, code, or password, with a copy button), `list` (a batch of
  generated items), `swatches` (colours), `css` (a generated stylesheet with a live preview),
  `qr`, `diff`. If a tool genuinely needs a shape none of these covers (a live countdown, a
  weekly calendar grid), say so explicitly rather than forcing a bad fit, since adding a new
  shape is a deliberate decision made once in `src/lib/tool-types.ts` and
  `ToolResultView.tsx`, not per tool.

---

## 7. Not looking like a content farm

Same mechanism as the prompt catalogue: Jaccard similarity over 5 word shingles across every
tool and prompt article, filler phrase blocking, sentence and heading reuse limits. The same
discipline applies: vary section shape, write from the tool's actual specific behaviour
(what it refuses to compute, what edge case it handles that a naive version would not),
vary FAQ count and register, don't open two tool articles the same way.

---

## 8. House style

Identical to the prompt skill: no em dashes or en dashes anywhere, plain declarative
sentences, no marketing throat clearing, never claim the tool does something it does not.
A visitor will use the tool immediately, so an overclaim about what it computes is caught in
one attempt.

---

## 9. Checklist before you call it done

```
npm run gen && npx tsc --noEmit && npm run audit:tools && npm run build
```

All four clean, every self test passing, no warnings, or it is not finished.
