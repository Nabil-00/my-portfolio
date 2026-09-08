# Portfolio Caching + Performance Design

**Date:** 2026-09-08
**Repo:** my-portfolio (React 19.2 + Vite 5.4, CSR + prerender)
**Branch:** perf/caching-rendering (isolated worktree `.worktrees/perf-caching`)
**Goal:** Faster first load, cheap repeat visits via HTTP caching, smooth rendering — keep battlenet autoplay.

## Baseline (measured 2026-09-08, worktree clean)

- JS `dist/assets/index-*.js` 243KB (73.75KB gzip), CSS 32KB (7.39KB gzip)
- `dist/index.html` 74.5KB after prerender (69.7KB injected static HTML)
- `public/projects` 8.2MB: battlenet.png 1.4MB + battlenet.webm 1.6MB (autoplay), buddy 860KB, classify 1.2MB, examflow 1.1MB, gleam 972KB, hamaacademy 813KB, portfolio 424KB, mrtb 121KB, gleamie.webp 20KB (only optimized one)
- `public/logos` 1.2MB (hama 430KB, nexora 323KB, defendhub.svg 279KB)
- `vite.config.js` bare: no manualChunks, no code-split, App.jsx eagerly imports all 10 sections
- No `vercel.json`: no Cache-Control headers configured; hashed asset filenames exist but no immutable directive
- Fonts: Google Sora render-blocking request chain, preconnected, display=swap present
- Images: Hero pic.webp 44KB correct (fetchpriority high, w/h set); hobby images no w/h, no srcset, no decoding=async (except loading=lazy present); video autoplay forces full download on page load

## Architecture

Keep CSR + `scripts/prerender.mjs` static HTML injection. Split entry to critical (Navbar/Hero) + lazy below-fold sections via `React.lazy` + `Suspense` with meaningful fallback (skeleton, no layout shift). Vite `manualChunks`: `react-vendor` (react, react-dom), `icons` (lucide-react), `vendor` (rest). No router, no SW, no SSR framework change.

## Components

1. **App.jsx** — eager: Navbar, Hero. Lazy: Projects, About, Skills, ClientsCarousel, TeachingSection, HobbyProjects, Contact, Footer. Single Suspense around below-fold tree + error boundary.
2. **HobbyProjects media** — new `LazyVideo` pattern: poster WebP renders immediately (LCP-safe), `<video preload="none" muted loop playsInline>` mounts only when IntersectionObserver in-view (triggerOnce, rootMargin 200px). `prefers-reduced-motion`: poster only, never autoplay.
3. **Image pipeline** — `scripts/optimize-images.mjs` (sharp): PNG/JPG → WebP q80 + AVIF optional, preserve originals as fallback, emit width/height manifest. Update `siteContent.js` media paths to `.webp` with `<picture>` fallback where trivial, else direct webp src.
4. **Caching config** — new `vercel.json` headers: `/assets/*` (Vite hashed) → `public, max-age=31536000, immutable`; `/projects/*`, `/logos/*`, `/*.webp` (unhashed public/ copies) → `public, max-age=86400, stale-while-revalidate=86400` (1-day + SWR, safe when images are replaced under same filename); `/*.html`, `/` → `public, max-age=0, must-revalidate`; `/sw.js` none (no SW).
5. **Vite config** — `manualChunks`, `chunkSizeWarningLimit`, `cssCodeSplit: true`, `modulePreload.polyfill: false` (modern), hashed filenames retained.
6. **CSS/rendering** — `content-visibility: auto; contain-intrinsic-size` on long sections (projects, hobby, teaching); gate `scroll-behavior: smooth` behind `@media (prefers-reduced-motion: no-preference)`; keep prerender output.

## Data flow

Build: `vite build` → hashed chunks → `prerender.mjs` injects static HTML → Vercel serves with headers. Runtime first visit: HTML (revalidated) → critical JS/CSS + hero WebP → lazy chunks + images on scroll; video bytes only when hobby card visible. Repeat visit: vendor chunks + images served from browser/CDN cache (immutable), HTML revalidated.

## Error handling

- Lazy chunk load failure → error boundary fallback with retry link, never blank page.
- WebP missing → PNG fallback via `<picture>` or onError swap.
- Video blocked/failed → poster remains, no broken player.
- Reduced-motion / JS-off → static poster + prerendered HTML content visible (no opacity:0 gating).

## Testing

- `npm run lint` green; `npm run build` compare sizes (target: entry JS <180KB gzip initial, projects images <2MB total).
- Lighthouse mobile: LCP ≤2.5s, CLS ≤0.1, no video as LCP (poster is LCP).
- Manual: battlenet still autoplays on desktop scroll-into-view, static poster on mobile/reduced-motion; vendor chunk hash stable across content-only deploys.
- PERF ledger in plan doc logs kept/reverted attempts.

## Out of scope

Service worker / offline PWA (conflicts with multi-agent edits), image CDN migration, font self-hosting (keep Google + preconnect), route-level router.
