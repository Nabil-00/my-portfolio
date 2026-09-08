# SEO + GEO Implementation Log — nabil.is-a.dev

**Executed:** 2026-09-08 · **Branch:** `seo-geo-foundations` · **PR:** [#1](https://github.com/Nabil-00/my-portfolio/pull/1) (merged)
**Plan:** see `SEO-GEO-PLAN.md` — this file documents everything that was actually done, why, and how it was verified.

---

## P0 — Critical fixes (done)

### 1. Static prerendering (crawler visibility)
**Problem:** the site was a client-rendered SPA — raw HTML contained only `<div id="root"></div>`. Google renders JS, but Bing, DuckDuckGo, and every AI crawler (GPTBot, ClaudeBot, PerplexityBot, CCBot) mostly read raw HTML and previously saw *zero* content.

**Change:**
- `scripts/prerender.mjs` — at build time, builds an SSR bundle of `src/App.jsx` with Vite, renders it with `react-dom/server` `renderToString`, and injects the full DOM (≈52 KB) into `dist/index.html` in place of the empty root div.
- `package.json` build script: `vite build && node scripts/prerender.mjs`.
- `src/main.jsx` — switched `createRoot().render()` → `hydrateRoot()` so the client takes over the prerendered markup without a flash.

**Verified:** built locally; served `dist` via `vite preview`; `curl` returned real `<h1>` text and project names with no JS. Post-deploy, `https://nabil.is-a.dev` raw HTML contains the full page.

### 2. Canonical & domain consolidation
**Problem:** canonical link, `og:url`, JSON-LD `url`, robots.txt sitemap line, and `sitemap.xml` `<loc>` all pointed to the old `nabeelismail.vercel.app` — telling search engines the new domain is a duplicate.

**Change:** every reference replaced with `https://nabil.is-a.dev/`. Verified **0** occurrences of the old domain in the built output and live HTML.

### 3. Vercel-side cleanup (done earlier, 2026-09-07)
- Removed apex→www redirect and the unverified `www.nabil.is-a.dev` entry from the project domains (via Vercel API), so `nabil.is-a.dev` is the single canonical host.

---

## P1 — SEO core (done)

### 4. Structured data — JSON-LD `@graph`
Three interlinked nodes (`@id` referenced):
- **Person** `#nabeel` — name, jobTitle, description, url, email (already public on the site), image, `alumniOf: Northwest University, Kano`, 13 `knowsAbout` entries taken from the real skills list, `sameAs`: GitHub / TikTok / Facebook.
- **WebSite** `#website` — publisher = Person.
- **ProfilePage** `#profilepage` — `about` = Person, `isPartOf` = WebSite, `dateModified`.

**Verified:** renders in the live HTML; validate with https://validator.schema.org as a follow-up habit.

### 5. Meta refinements
- `robots` meta: `index, follow, max-image-preview:large`
- `og:type=profile`, `og:site_name`, `og:locale`, `og:image:width/height/alt`
- Description tightened to 155-char budget; og/twitter descriptions unified
- Title kept: "Nabeel Ismail | Software Engineer & AI Builder" (46 chars)

### 6. Performance
- **WebP conversions** via ImageMagick: `pic.jpg` 209 KB → `pic.webp` 43 KB (hero), `newpic.jpg` → `newpic.webp` 19 KB (about), `creator-photo.jpg` → `creator-photo.webp` 80 KB (teaching); component `<img src>`s updated.
- **OG image:** dedicated 1200×630 branded card `og-image.jpg` (100 KB, q82) — proper social preview dimensions.
- **Icons/manifest:** `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` generated from favicon; `site.webmanifest` (theme #000000, name, icons) linked from HTML.
- Fonts left on Google Fonts CDN (preconnect already present) — self-hosting/subsetting is an optional follow-up, documented in the plan.

---

## P2 — GEO: Generative Engine Optimization (done)

### 7. `/llms.txt` (llms.txt v2 spec)
H1 name → blockquote summary → detail paragraphs (who he is, the three flagship projects with stacks, full skill list, teaching work) → H2 sections: Pages, Profiles, Contact (email/WhatsApp/CV). Grounded in the v2 spec (OpenAI/Anthropic/Gemini publish their own; Lighthouse audits it under agentic browsing).

### 8. Markdown twin — `/index.md`
Full LLM-friendly markdown version of the site (bio, pillars, projects, skills, teaching, contact) mirroring `siteContent.js`, linked back to `/llms.txt`.

### 9. Agent discovery links
`<link rel="describedby" href="/llms.txt">` and `<link rel="alternate" type="text/markdown" href="/index.md">` in the document head.

### 10. robots.txt AI-crawler policy
Explicit `Allow: /` blocks for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent — documenting that content may be retrieved and cited. Sitemap line updated to the new domain.

---

## P3 — Authority & backlinks (partially done)

### 11. GitHub profile homepage ⚠️ manual step
Attempted via API — the current token lacks the `user` scope. **Manual (30 s):** GitHub → Settings → Public profile → Website → `https://nabil.is-a.dev`. (This creates a strong entity-consistency backlink.)

### 12. Old-domain redirect (recommended follow-up)
In Vercel → my-portfolio → Settings → Domains: set `nabeelismail.vercel.app` to **redirect** to `https://nabil.is-a.dev` (or leave as-is; canonical tags already handle consolidation).

---

## P4 — Measurement (manual steps)

1. **Google Search Console** — add property `nabil.is-a.dev` (Domain or URL-prefix), verify via the HTML-tag method, paste the `google-site-verification` meta into `index.html`, submit `https://nabil.is-a.dev/sitemap.xml`.
2. **Bing Webmaster Tools** — import from GSC (10 minutes); Bing feeds DuckDuckGo and several AI retrieval stacks.
3. **Ongoing scorecards:**
   - `site:nabil.is-a.dev` in Google/Bing (indexing)
   - Monthly: ask ChatGPT / Perplexity / Claude "who is Nabeel Ismail, software engineer?" — citation pickup is the GEO metric
   - Lighthouse run after content changes
   - Schema validation after structured-data changes

---

## Round 2 — Follow-through (2026-09-08, same day)

### 13. Old-domain 301 redirect — done ✓
`nabeelismail.vercel.app` now 301-redirects to `https://nabil.is-a.dev/` (set via Vercel API, `redirectStatusCode: 301`). Verified live: `HTTP/2 301 → HTTP/2 200`. All legacy link equity and bookmarks flow to the canonical domain; zero duplicate-content risk.

### 14. Hydration-safety audit — passed ✓
Grep-verified no nondeterministic values (`Date.now`, `Math.random`, `new Date`) at render time in any component — `hydrateRoot` will produce markup identical to the prerendered HTML. Browser APIs remain confined to effects/handlers.

### 15. IndexNow — done ✓ (instant Bing indexing accelerator)
- Key: `4fef8243f1f940efb4d6d18e290e7537`, key file committed at `/4fef8243f1f940efb4d6d18e290e7537.txt` (verified 200 live)
- Submitted `https://nabil.is-a.dev/` to `api.indexnow.org` → **202 Accepted** (twice: pre-deploy + post-deploy validation)
- Effect: Bing (and Yandex/Seznam; Bing feeds DuckDuckGo) get near-instant indexing signals — no need to wait for organic crawl discovery.

### Remaining manual steps (unchanged)
1. GitHub profile website → `https://nabil.is-a.dev` (needs `user` scope token or browser)
2. Google Search Console: verify property, submit sitemap (IndexNow does NOT cover Google)
3. Bing Webmaster Tools: optional import — IndexNow already pushes Bing; BWT adds query analytics
4. Update LinkedIn (if any) to point at the new domain

---

## Verification snapshot (post-deploy, 2026-09-08)

| Check | Result |
|---|---|
| `https://nabil.is-a.dev/` | 200, prerendered HTML with full h1/projects content |
| Canonical tag | `https://nabil.is-a.dev/` ✓ |
| Old-domain references in HTML | 0 |
| `/llms.txt` | 200, spec-compliant |
| `/index.md` | 200 |
| `/robots.txt` | 200, AI bots allowed, sitemap → new domain |
| `/sitemap.xml` | 200, new domain |
| `/og-image.jpg` | 200, 1200×630 |
| `/site.webmanifest`, icons | 200 |
| `npm run lint` | clean |
| GitHub PR #1 | merged 2026-09-08T03:42Z |

## Timeline expectations
- Indexing of the new domain: 1–2 weeks after GSC submission
- Rank movement for name queries: 4–8 weeks
- AI-engine citation pickup: 1–3 months (needs the GitHub/LinkedIn backlinks + GSC/Bing setup above)
