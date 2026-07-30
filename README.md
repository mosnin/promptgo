# Fast Prompts

A directory of 148 free AI prompts for ChatGPT, Claude and Gemini, organised by job function
and built as a static Next.js site. Monetised with Google AdSense.

Every prompt page fills its variables client side and lets you copy a finished prompt straight
to the clipboard. Nothing you type is sent anywhere, which is why hosting cost stays close to
zero while long tail search traffic carries the advertising revenue.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Regenerate the prompt registry, then start the dev server |
| `npm run build` | Regenerate, then produce the production build |
| `npm run gen` | Rebuild `src/generated/` from `src/prompts/` |
| `npx tsc --noEmit` | Type check |
| `npm run audit:seo` | Audit every prompt against the SEO contract |
| `npm run audit:seo -- <slug>` | Audit a single prompt |

## Adding a prompt

A prompt is one folder:

```
src/prompts/<slug>/
  meta.ts    slug, SEO metadata, the prompt itself and the full article, as typed data
```

Run `npm run gen` and the prompt appears in routing, the sitemap, the mega menu, the search
index, the category page and the footer. Nothing else needs editing.

The authoring rules are in `.claude/skills/seo-prompt-page/SKILL.md`. `npm run audit:seo` is
the gate: it enforces exact match keywords across slug, title, SEO title and meta description,
keyword density, article volume, internal and external link counts, query shaped long tail
keywords, freedom from fabricated first person claims, and uniqueness across the whole site.
It must exit clean before any prompt work is considered finished.

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

See `CLAUDE.md` for the full picture, including why the prompt registry is generated and why
it must never be imported from a client component.
