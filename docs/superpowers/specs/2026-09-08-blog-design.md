# Blog Section Design — nabil.is-a.dev

**Date:** 2026-09-08
**Status:** Approved, awaiting implementation
**Scope:** Lean v1 + tags + RSS

---

## Goal

A blog at `/blog` where Nabeel publishes short tech writeups. Every post becomes a fully prerendered, SEO-complete page; publishing is a git push. Per-post distribution assets (OG cards) generated automatically to support the WhatsApp-status / TikTok-story teaser workflow.

## Decisions made

- **Separate pages** (`/blog`, `/blog/:slug`) — not a landing-page section. Best SEO/GEO structure (supports owning project-name searches: "MRTB operations management system", "ClassiFy attendance system").
- **Authoring:** markdown files in the repo (`content/posts/`). No CMS.
- **Feature scope:** title/date/summary, reading time, tags + tag filtering, RSS feed, auto sitemap + llms.txt updates, draft support, per-post OG images. No comments, no search, no related posts in v1.

## 1. Content & authoring

Posts live in `content/posts/` as markdown files:

```markdown
---
title: Why I built MRTB with Fastify
date: 2026-09-10
summary: One-line summary used on cards and meta description.
tags: [backend, fastify]
draft: false
---

Markdown body (headings, code blocks, images allowed).
```

- Slug = filename (`my-post.md` → `/blog/my-post`).
- `draft: true` posts are excluded from all build output (manifest, routes, sitemap, RSS, llms.txt).
- Publishing = `git push` to `main` → Vercel builds → live.

## 2. Routing & rendering

- `react-router-dom` (BrowserRouter):
  - `/` — existing portfolio (unchanged)
  - `/blog` — list, newest first, tag filter chips
  - `/blog/:slug` — post page
  - `*` — 404 page
- Prerender extended: route loop with `StaticRouter` writes
  - `dist/index.html` (existing)
  - `dist/blog/index.html`
  - `dist/blog/<slug>/index.html` for every post
  - `dist/404.html`
- Vercel serves directory `index.html` files natively; client-side navigation stays instant (SPA behavior).

## 3. Build pipeline

`npm run build` = `node scripts/build-content.mjs && vite build && node scripts/prerender.mjs`

`scripts/build-content.mjs`:
1. Reads `content/posts/*.md` (frontmatter via `gray-matter`, body via `marked`)
2. Emits `src/data/posts.json` — title, slug, date, summary, tags, reading time (≈200 wpm), body-as-HTML, ogImage path
3. Generates `public/rss.xml` (top 20 posts)
4. Regenerates `public/sitemap.xml` — static URLs + every published post with lastmod = post date
5. Appends/refreshes a "Writing" section in `public/llms.txt` (post list with dates + one-line summaries)
6. Generates per-post OG card `public/og/<slug>.jpg` — shared dark template (title, date, "@i_nabeel_"), ImageMagick, 1200×630

## 4. Components

- `BlogList` — cards: title, summary, date, tags (clickable → filter), reading time; tag chips row
- `BlogPost` — rendered markdown (styled `prose`-like classes), date, tags, back-to-blog link
- `NotFound` — prerendered 404 with link home
- `useSEO(title, description, canonical, jsonLd)` — small hook that swaps document `<head>` per route (title, meta description, canonical, `BlogPosting` JSON-LD on posts)
- `Navbar` — adds **Blog** link
- Styling: existing dark + Sora aesthetic

## 5. Error handling

- Unknown slug → prerendered 404 page
- Malformed post (missing title/date/summary, bad frontmatter) → **build fails with the filename**, so bad content never reaches production
- Future-dated posts → excluded until their date passes (prevents accidental publishing of scheduled drafts)

## 6. SEO / GEO integration

- Per-post: canonical URL, meta description from `summary`, `BlogPosting` JSON-LD (headline, datePublished, author `#nabeel` via existing @graph id), OG/Twitter card → `https://nabil.is-a.dev/og/<slug>.jpg`
- Sitemap, RSS, llms.txt auto-include new posts at build
- IndexNow ping on production build (existing key) so Bing indexes new posts within hours
- GSC: Request Indexing per new post (manual, one click)

## 7. Testing / acceptance

- `npm run build` succeeds with a sample post; fails loudly on a malformed post
- `vite preview`: `/blog`, `/blog/<slug>`, unknown `/blog/nope` (404), `/rss.xml`, updated `/sitemap.xml` and `/llms.txt` all correct
- Raw HTML of each route contains post content (prerender check — `curl | grep`)
- Draft post invisible everywhere; future-dated post invisible everywhere
- Lint clean; deploy; verify live routes + OG card renders (post to WhatsApp status as smoke test)

## Out of scope (v1)

Comments, search, related posts, pagination (>20 posts triggers a revisit), CMS UI, newsletter.
