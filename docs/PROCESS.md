# How we actually work on this site

This is a reference for how content and code changes get made on Fast Prompts. It describes
what we do today, not a spec anyone has to follow forever. Nothing here is set in stone: we
iterate on this process as we find better strategies, and this file should be updated whenever
the process actually changes, not left to describe an old way of working.

## The one rule underneath everything

`npm run audit:seo` is the gate. It is not a formatting linter, it is the thing standing
between this site and a Google spam penalty or an AdSense rejection. Every change that touches
a prompt page runs against it before it is considered finished, and a green run is a floor, not
a finish line: the auditor catches what it was built to catch, and it has been wrong before (see
"What the auditor has missed" below). Reading the actual diff still matters.

## Adding or editing a prompt page

1. Read `.claude/skills/seo-prompt-page/SKILL.md` first. It is the authoring contract: exact
   match keywords, article structure, EEAT, internal/external link rules. Don't start writing
   from memory of what the contract used to say.
2. Draft the keyword set before writing prose. Every long tail has to read as something a
   person would actually type, not a description of the page, and has to be globally unique
   across the whole catalogue. Writing the sentence that will carry each keyword *before* the
   article, and noting which section it lives in, is what prevents the two failure modes that
   keep recurring: forgetting a keyword and bolting it into a sentence afterward, or inventing
   an unsearched phrase to hit a quota.
3. Write the prompt itself first, seriously. A prompt page with a weak prompt is a worthless
   page regardless of how well the article is optimised. The house test: would a competent
   person in that job use this prompt as written, or rewrite it? If the second, it isn't done.
4. Write the trust block (`eeat`) as an impersonal design note: what the model gets wrong on
   this task, and the constraint that stops it. Never a first person anecdote, a named client,
   a count of times something happened. If it reads like something happened to someone once,
   it's wrong, even if it happens to be a plausible thing that could have happened.
5. Run `npm run audit:seo -- <slug>` and fix everything it flags. Don't treat a warning as
   optional without a specific reason; don't argue with an error without reading why the rule
   exists (the comments above each rule in `scripts/audit-seo.mjs` explain the reasoning, not
   just the threshold).
6. Run the full `npm run audit:seo` (no slug) before calling anything finished. A page can pass
   in isolation and still collide with another page's keyword, heading, or testing note.

## Adding many pages at once

Content work on this site has mostly happened in large batches (getting to 148 pages, then
fixing catalogue-wide issues), which creates a specific risk: many pages written under time
pressure converge on the same phrasing, the same rhetorical structure, the same invented
detail to satisfy a quota. The pattern that has worked for batches:

- Pre-assign slugs, focus keywords, and author personas before generation starts, so two
  parallel writers can't converge on the same territory.
- Give explicit "adjacency warnings" against existing similar pages, and a fixed whitelist of
  valid cross-category internal link targets, so linking doesn't get invented.
- Ask for deliberate structural variance (vary section count, FAQ count, whether a table or a
  list is used) rather than letting every page settle into an identical shape, which is a real
  templating signal to both readers and automated spam classifiers.
- Never trust a batch's self-report of "0 errors." Every batch gets a fresh, independent
  `npm run audit:seo` run afterward, plus targeted greps for the specific failure modes that
  batch was prone to. Self-reported success has been wrong before; an independently run audit
  hasn't been.

## The trust problem, specifically

The single biggest correctness failure so far on this site was fabricated authorship: pages
were generated with invented named authors and invented first person testing anecdotes
("I tested this on eleven alerts saved from a retail warehouse over one winter...") that never
happened. This is now actively guarded against:

- `eeat.author` is always `"Fast Prompts"`, the organisation, never a named individual, unless
  a real person genuinely wrote and reviewed that specific page.
- `eeat.testingNote` and the full article body (including FAQ answers and `howTo` steps, but
  not FAQ *questions*, which legitimately speak in the reader's first person) are scanned by
  the auditor for fabrication-flavoured first person claims.
- This check was extended once already after an independent audit found the article body
  leaking claims the auditor was only checking `testingNote` for. Treat that as evidence this
  category of bug recurs in new forms, not as evidence it's now fully closed.

## Verification discipline

Do not trust a tool's or an agent's self-reported success, including this file's own
`npm run audit:seo` output, without independently checking the underlying claim at least once
per batch of work. Concretely, this has meant: re-running the audit fresh rather than relying
on a cached "0 errors" from earlier in a session, grepping the actual files for a pattern
rather than accepting a summary of what a batch did, and periodically commissioning a fully
independent audit (a fresh agent, isolated from this session's context, told to find problems
rather than confirm a specific fix landed) to catch what routine verification has grown blind
to. Every independent audit run so far has found real, previously unnoticed issues. Assume the
next one will too.

## What the auditor has missed before

Documented here so the next person doesn't have to rediscover these the hard way:

- **Word count blind spots.** `articleText()` originally didn't include `article.table` content,
  so pages with a table were undercounted and could exceed the real word ceiling without the
  auditor noticing.
- **Scope too narrow.** The first-person fabrication check only ever looked at
  `eeat.testingNote`. The exact same fabrication pattern had leaked into article prose and FAQ
  answers, which the auditor never scanned until an independent audit found it.
- **A keyword-quota fix that overcorrected.** Requiring 6-7 keywords per page, combined with a
  global-uniqueness rule, quietly rewarded inventing unsearched phrases (a phrase nobody else
  has claimed is often a phrase nobody searches). Fixed by lowering the floor and adding a
  query-shape check, which itself later needed tightening (a bare "for" was accepted as a query
  anchor, letting through phrases like "naming a budget owner for a proposal" that describe the
  page rather than something anyone types).
- **A field-level duplicate check that covered one field and not its neighbour.** The auditor
  checks `eeat.testingNote` for cross-page duplication, but `eeat.authorCredential` sits two
  lines below it in the same trust block, renders directly under the H1, and was byte-identical
  on all 148 pages with no check at all. Fixing one instance of a pattern doesn't mean the
  pattern is fixed everywhere it appears; grep for the other fields shaped the same way.
- **Schema type mismatches the auditor doesn't and can't check**, because `npm run audit:seo`
  only reads `meta.ts`, never the rendered JSON-LD. `promptArticleSchema()` typed the article's
  author as `"@type": "Person"` with the organisation's name in it, on every page, for a long
  time after `eeat.author` was fixed to always say `"Fast Prompts"` — the schema layer wasn't
  updated when the data contract was. Anything derived from `meta.ts` in a separate rendering
  layer (JSON-LD, Open Graph images, the search index) needs its own check, or its own explicit
  read-through, since the auditor's cleanliness says nothing about it.
- **A per-page asset that was built but never linked to.** Every prompt page generates its own
  OpenGraph image at build time, but `buildMetadata()` unconditionally set the site-wide default
  image on every route, which silently overrides Next.js's automatic per-route image convention.
  148 images were rendered into the build output and zero were ever referenced by a page's own
  meta tags. `npm run build` succeeding, and the file existing in the output tree, is not
  evidence the file is actually used — check the rendered `<head>` of a real page, not just that
  the build didn't error.
- **A string-matching helper with no word boundaries.** `occurrences()`, used for both keyword
  density and "does this long tail actually appear in the article," did a raw substring search
  on normalised text: the keyword "ai" matched inside "email", "domain", "plain". No page's
  actual keywords were short enough to trigger it, so it never produced a wrong verdict, but the
  underlying logic was wrong in exactly the function every keyword check depends on. A check
  that happens to be right today because of what data currently exists is not the same as a
  check that is actually correct.

None of these were caught by the person or process that introduced them. They were all caught
later, by deliberately looking for problems rather than confirming things were fine. Keep doing
that.

## Steering docs stay in sync with reality

`README.md` and `CLAUDE.md` describe the actual current architecture, not the architecture of
whatever repo this one was originally forked from. Both drifted badly at one point (describing
a "file conversion tool" product this repo no longer is), and because these files get loaded
into an agent's context automatically, a stale one actively misdirects future work rather than
just looking untidy. When the architecture changes, update these in the same change, not later.
