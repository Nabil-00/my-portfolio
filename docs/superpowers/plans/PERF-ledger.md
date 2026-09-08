# PERF ledger — portfolio caching + performance

| Idea | Baseline → Result | Verdict | Why |
|---|---|---|---|
| (baseline) JS 243KB (73.75 gzip), CSS 32KB, HTML 74.5KB prerendered, projects 8.2MB | — | baseline | worktree clean, `npm run build` 2026-09-08 |
| Lazy sections + manualChunks | entry 243KB → 20.4KB (7.38 gzip); react-vendor 188.8KB cached, 8 route chunks 1.3–10.6KB on demand | keep | initial entry ~92% smaller, vendor split stable across deploys |
| Vercel headers | no headers → immutable /assets, SWR 86400 images, must-revalidate HTML | keep | repeat-visit cache, zero runtime cost |
| PNG→WebP q80 | served 6.58MB PNG → 0.39MB WebP (9 files, ~94% smaller); dir 8.6MB incl. both + webm | keep | same visuals, ~94% smaller served bytes |
| LazyVideo in-view (autoplay kept) | webm on load → webm in-view only (preload=none + poster) | keep | preserves UX, removes initial bytes |
| content-visibility + font preload | CSS 32.22KB / HTML 74KB ≈ baseline (noise); no LCP/INP or render-timing delta measured | revert | byte-neutral and rendering gain uninstrumented in this env; zero-cost but unproven — re-add with Lighthouse numbers |

Final build 2026-09-08: `npm run build` PASS (2.87s), `npm run lint` PASS. dist 12MB (11918958 B); dist/assets 13 files; public/projects 8.6MB (8886540 B).
