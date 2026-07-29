# Convert Filez

A catalogue of 120 client side file conversion and asset tools, built as a static Next.js
site and monetised with Google AdSense. Every tool runs entirely in the browser, so hosting
cost stays near zero while long tail search traffic carries the advertising revenue.

## Skills

**When adding or editing any tool page, use the `seo-tool-page` skill.** It defines the
complete SEO contract: exact match keywords across slug, title, SEO title and description,
keyword density targets, article structure, internal link clustering, external citation
rules and the `ui.tsx` component contract. Do not author a tool without it.

## Commands

```bash
npm run dev                    # regenerate the registry, then start the dev server
npm run build                  # regenerate, then produce the static build
npm run gen                    # rebuild src/generated/ from src/tools/
npx tsc --noEmit               # type check
npm run audit:seo              # audit every tool against the SEO contract
npm run audit:seo -- <slug>    # audit one tool
```

`npm run audit:seo` must exit clean before any tool work is considered finished.

## Architecture

```
src/
  app/                       routes. [category]/[tool] renders every tool page
  components/
    ads/AdSlot.tsx           renders nothing unless AdSense is configured
    analytics/               GA4 loader
    motion/                  shared animation vocabulary, all motion goes through here
    site/                    header, mega menu, mobile nav, footer, command palette
    tool/kit.tsx             the tool authoring kit. Tools compose only these primitives
    tool/ToolShell.tsx       the one page template every tool renders through
    ui/                      Button, Badge, Icon
  generated/                 written by scripts/generate-registry.mjs. Never edit
  lib/                       site config, types, categories, SEO, JSON-LD, search, helpers
  tools/<slug>/              meta.ts + ui.tsx. One folder per tool
scripts/
  generate-registry.mjs      scans src/tools and writes src/generated
  audit-seo.mjs              the SEO gate
docs/CATALOGUE.md            the authoritative list of all 120 slugs and keywords
```

### Why the registry is generated

Ten teams add tools in parallel. If they all had to append to one barrel file, every commit
would conflict. Instead `scripts/generate-registry.mjs` scans `src/tools/` for folders that
contain both `meta.ts` and `ui.tsx`, and writes `src/generated/tool-metas.ts` and
`src/generated/tool-components.tsx`. Adding a tool means adding a folder. Nothing else.

### Keeping the tool registry out of the client bundle

`src/lib/tools.ts` imports every article body. It must only ever be imported from server
components. The header needs navigation data, so `Header.tsx` is a server component that
derives a compact payload via `buildNavData()` and passes it as props to `HeaderClient`.
The command palette fetches `/search-index.json` on first open rather than importing the
registry. Breaking either pattern adds roughly a megabyte to the client bundle.

## Monetisation

`AdSlot` renders **nothing at all** unless `NEXT_PUBLIC_ADSENSE_CLIENT` and the matching
per placement slot id are both set. This is deliberate: no empty grey boxes in development,
and no ad markup shipped before the publisher account is approved.

Placements, configured in `src/lib/site.ts`:

| Slot | Position |
|---|---|
| `toolTop` | above the tool interface |
| `toolProcessing` | **beside the progress and download panel**, the highest value unit |
| `toolMid` | between the interface and the article |
| `article` | inside the article after the second section |
| `toolFooter` | under the FAQ |
| `listing`, `home`, `search` | category, explore, home and search pages |

`toolProcessing` is rendered by `ProcessingPanel` in the kit, which is why every tool must
render that component even when its work is instant.

## Environment variables

```
NEXT_PUBLIC_SITE_URL                     canonical origin, no trailing slash
NEXT_PUBLIC_GA_ID                        GA4 measurement id, for example G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT               ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP
NEXT_PUBLIC_ADSENSE_SLOT_TOOL_PROCESSING
NEXT_PUBLIC_ADSENSE_SLOT_TOOL_MID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE
NEXT_PUBLIC_ADSENSE_SLOT_TOOL_FOOTER
NEXT_PUBLIC_ADSENSE_SLOT_LISTING
NEXT_PUBLIC_ADSENSE_SLOT_HOME
NEXT_PUBLIC_ADSENSE_SLOT_SEARCH
```

Every one is optional. The site builds and runs correctly with none of them set.

## Conventions

- **No em dashes or en dashes anywhere in the repo**, including code comments. The SEO
  auditor fails the build on them in tool content.
- Animation is `motion` (motion.dev, the current release of Framer Motion, imported from
  `motion/react`). Do not add a second animation runtime. Shared easings, springs and
  variants live in `src/components/motion/tokens.ts`; use them instead of inventing
  new durations per component.
- Dark theme is the default and is applied before first paint by an inline script in the
  root layout. Light theme is opt in and stored in local storage.
- Colours come from the `@theme` block in `src/app/globals.css` as Tailwind tokens
  (`bg-canvas`, `text-ink-muted`, `border-hairline`). Do not hard code hex values in
  components except for per category accents, which are data.
- Tools never call a server. No API routes for tool work, no server actions, no uploads.
