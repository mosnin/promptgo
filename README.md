# Convert Filez

120 client side file conversion and asset tools, built as a static Next.js site and monetised
with Google AdSense.

Every tool runs entirely in the browser. Files are read from disk into browser memory,
transformed locally and written back out as a download. Nothing is uploaded, which means
hosting cost stays close to zero while long tail search traffic carries the advertising
revenue.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Regenerate the tool registry, then start the dev server |
| `npm run build` | Regenerate, then produce the production build |
| `npm run gen` | Rebuild `src/generated/` from `src/tools/` |
| `npx tsc --noEmit` | Type check |
| `npm run audit:seo` | Audit every tool against the SEO contract |
| `npm run audit:seo -- <slug>` | Audit a single tool |

## Adding a tool

A tool is one folder:

```
src/tools/<slug>/
  meta.ts    SEO metadata and the full article, as typed data
  ui.tsx     the working client side interface
```

Run `npm run gen` and the tool appears in routing, the sitemap, the mega menu, the search
index, the category page and the footer. Nothing else needs editing.

The authoring rules are in `.claude/skills/seo-tool-page/SKILL.md`, and
`src/tools/png-to-jpg-converter/` is the reference implementation. `npm run audit:seo` is the
gate: it enforces exact match keywords across slug, title, SEO title and meta description,
keyword density, article volume, internal and external link counts, uniqueness across the
whole site and house style.

## Deploying to Vercel

Import the repository and accept the detected Next.js defaults. Then set the environment
variables from `.env.example`. Every one is optional: the site builds and runs correctly with
none of them set, and each ad slot renders nothing until its publisher id and slot id are both
present.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used by metadata, sitemap and JSON-LD |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement id |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id, `ca-pub-...` |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | One slot id per placement |

## Architecture

See `CLAUDE.md` for the full picture, including why the tool registry is generated and why it
must never be imported from a client component.
