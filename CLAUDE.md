# Fast Prompts

A directory of 148 free AI prompts for ChatGPT, Claude and Gemini, organised by job function,
built as a static Next.js site and monetised with Google AdSense. Every prompt page fills in
its variables client side and copies a finished prompt to the clipboard, so hosting cost stays
near zero while long tail search traffic carries the advertising revenue.

## Skills

**When adding or editing any prompt page, use the `seo-prompt-page` skill.** It defines the
complete SEO contract: exact match keywords across slug, title, SEO title and description,
keyword density targets, article structure, internal link clustering, external citation
rules, EEAT and the trust block contract. Do not author a prompt without it.

## Commands

```bash
npm run dev                    # regenerate the registry, then start the dev server
npm run build                  # regenerate, then produce the static build
npm run gen                    # rebuild src/generated/ from src/prompts/
npx tsc --noEmit               # type check
npm run audit:seo              # audit every prompt against the SEO contract
npm run audit:seo -- <slug>    # audit one prompt
```

`npm run audit:seo` must exit clean before any prompt work is considered finished.

## Architecture

```
src/
  app/                       routes. [category]/[prompt] renders every prompt page
  components/
    ads/AdSlot.tsx           renders nothing unless AdSense is configured
    analytics/               GA4 loader
    motion/                  shared animation vocabulary, all motion goes through here
    site/                    header, mega menu, mobile nav, footer, command palette
    prompt/PromptPanel.tsx   the fill in the blanks and copy to clipboard interface
    prompt/PromptShell.tsx   the one page template every prompt renders through
    ui/                      Button, Badge, Icon
  generated/                 written by scripts/generate-registry.mjs. Never edit
  lib/                       site config, types, categories, SEO, JSON-LD, search, helpers
  prompts/<slug>/            meta.ts. One folder per prompt
scripts/
  generate-registry.mjs      scans src/prompts and writes src/generated
  audit-seo.mjs              the SEO gate
```

### Why the registry is generated

Many contributors add prompts in parallel. If they all had to append to one barrel file, every
commit would conflict. Instead `scripts/generate-registry.mjs` scans `src/prompts/` for folders
that contain `meta.ts`, and writes `src/generated/prompt-metas.ts`. Adding a prompt means
adding a folder. Nothing else.

### Keeping the prompt registry out of the client bundle

`src/lib/prompts.ts` imports every article body. It must only ever be imported from server
components. The header needs navigation data, so `Header.tsx` is a server component that
derives a compact payload via `buildNavData()` and passes it as props to `HeaderClient`.
The command palette fetches `/search-index.json` on first open rather than importing the
registry. Breaking either pattern adds roughly a megabyte to the client bundle.

## The taxonomy

Categories are job functions (`marketing-prompts`, `writing-prompts`, `coding-prompts`,
`business-prompts`, `sales-prompts`, `education-prompts`, `design-prompts`,
`data-analysis-prompts`, `productivity-prompts`, `career-prompts`), and the category slug is
the only URL segment: `/[category]/[prompt]`. Task type (generate, rewrite, summarise, analyse,
plan, brainstorm, evaluate, extract, translate, roleplay) is a non-URL facet used only for
client side filtering on the explore and category pages, deliberately kept out of the path so
no prompt has two valid indexable addresses.

## Monetisation

`AdSlot` renders **nothing at all** unless `NEXT_PUBLIC_ADSENSE_CLIENT` and the matching
per placement slot id are both set. This is deliberate: no empty grey boxes in development,
and no ad markup shipped before the publisher account is approved.

Placements, configured in `src/lib/site.ts`:

| Slot | Position |
|---|---|
| `promptTop` | above the fold, directly under the prompt heading |
| `promptPanel` | **beside the fill in the blanks and copy panel**, the highest value unit |
| `promptMid` | between the prompt panel and the long form article |
| `article` | inside the article after the second section |
| `promptFooter` | under the FAQ |
| `listing`, `home`, `search` | category, explore, home and search pages |

## Environment variables

```
NEXT_PUBLIC_SITE_URL                       canonical origin, no trailing slash
NEXT_PUBLIC_GA_ID                          GA4 measurement id, for example G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT                 ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_TOP
NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_PANEL
NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_MID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE
NEXT_PUBLIC_ADSENSE_SLOT_PROMPT_FOOTER
NEXT_PUBLIC_ADSENSE_SLOT_LISTING
NEXT_PUBLIC_ADSENSE_SLOT_HOME
NEXT_PUBLIC_ADSENSE_SLOT_SEARCH
```

Every one is optional. The site builds and runs correctly with none of them set.

## Conventions

- **No em dashes or en dashes anywhere in the repo**, including code comments. The SEO
  auditor fails the build on them in prompt content.
- Animation is `motion` (motion.dev, the current release of Framer Motion, imported from
  `motion/react`). Do not add a second animation runtime. Shared easings, springs and
  variants live in `src/components/motion/tokens.ts`; use them instead of inventing
  new durations per component.
- Dark theme is the default and is applied before first paint by an inline script in the
  root layout. Light theme is opt in and stored in local storage.
- Colours come from the `@theme` block in `src/app/globals.css` as Tailwind tokens
  (`bg-canvas`, `text-ink-muted`, `border-hairline`). Do not hard code hex values in
  components except for per category accents, which are data.
- Prompts never call a server. No API routes, no server actions, no uploads. Variable values
  are held in local component state and never transmitted anywhere.
- `eeat.author` is always `"Fast Prompts"`, the organisation. `eeat.testingNote` and the
  article body must never claim a first person occasion ("I tested this on...", "in my
  experience"); state what models get wrong and the constraint that prevents it instead.
  `npm run audit:seo` enforces this and fails the build on a violation.
