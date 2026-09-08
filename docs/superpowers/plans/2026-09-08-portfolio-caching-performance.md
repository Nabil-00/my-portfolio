# Portfolio Caching + Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut first load and repeat-visit cost via code-splitting, HTTP caching headers, WebP images, and in-view-gated battlenet autoplay (kept, not removed).

**Architecture:** Keep CSR + prerender.mjs. Eager critical path (Navbar/Hero); lazy all below-fold sections with Suspense + error boundary. Vite manualChunks for stable vendor caching. vercel.json for immutable hashed assets + SWR for unhashed public images. sharp script converts PNGs to WebP q80.

**Tech Stack:** React 19.2, Vite 5.4, Tailwind 4, sharp (dev, image conversion), Vercel static hosting, IntersectionObserver (no new deps).

## Global Constraints

- Keep battlenet.webm autoplay behavior (gate to in-view with poster-first; never remove video).
- Work ONLY in worktree branch `perf/caching-rendering`; never commit to `main` directly.
- No service worker / offline PWA in this task.
- Do not change visual design or copy; performance-only edits.
- `npm run lint` must stay green; `npm run build` must succeed including prerender.mjs.
- public/* filenames are unhashed → never mark immutable; use 1-day + SWR.

---

## File Structure

- Modify: `vite.config.js` — add manualChunks (react-vendor/icons/vendor), cssCodeSplit, modulePreload.
- Modify: `src/App.jsx` — React.lazy below-fold sections + Suspense + error boundary.
- Create: `vercel.json` — Cache-Control headers for /assets/*, /projects/*, /logos/*, html.
- Create: `scripts/optimize-images.mjs` — sharp PNG→WebP q80 for 7 files; logs before/after bytes.
- Modify: `src/data/siteContent.js` — point 6 media paths from .png to .webp (mrtb, classify, examflow, battlenet poster, buddy, gleam stays webp).
- Modify: `src/components/HobbyProjects.jsx` — LazyVideo (in-view mount, preload=none, poster-first, reduced-motion guard) + img decoding=async + width/height.
- Modify: `src/index.css` — content-visibility for #projects/#hobby-projects/#teaching, keep reduced-motion gating.
- Modify: `index.html` — preload Sora 700 + hero pic.webp fetchpriority already high; add imagesrcset? No — add font preload link only.
- Create: `docs/superpowers/plans/PERF-ledger.md` section (or in-plan table) logging every attempt kept/reverted.

---

### Task 1: Baseline ledger + sharp dev dependency

**Files:**
- Create: `docs/superpowers/plans/PERF-ledger.md`
- Modify: `package.json` (add sharp to devDependencies via npm)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `PERF-ledger.md` baseline table; `sharp` available for Task 4

- [ ] **Step 1: Record baseline numbers in ledger**

```markdown
# PERF ledger — portfolio caching + performance

| Idea | Baseline → Result | Verdict | Why |
|---|---|---|---|
| (baseline) JS 243KB (73.75 gzip), CSS 32KB, HTML 74.5KB prerendered, projects 8.2MB | — | baseline | worktree clean, `npm run build` 2026-09-08 |
```

Run: `cat docs/superpowers/plans/PERF-ledger.md`
Expected: file exists with baseline row

- [ ] **Step 2: Install sharp**

Run: `npm install -D sharp`
Expected: exit 0, `sharp` in package.json devDependencies

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json docs/superpowers/plans/PERF-ledger.md
git commit -m "chore(perf): add sharp + PERF ledger baseline"
```

---

### Task 2: Code-split below-fold sections + stable vendor chunks

**Files:**
- Modify: `vite.config.js:1-7`
- Modify: `src/App.jsx:1-37`
- Test: `npm run build` output (chunk list)

**Interfaces:**
- Consumes: nothing
- Produces: `dist/assets/react-vendor-*.js`, `icons-*.js`, lazy section chunks; App exports identical DOM

- [ ] **Step 1: Write vite.config.js with manualChunks**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    modulePreload: { polyfill: false },
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/')) return 'react-vendor'
            if (id.includes('lucide-react')) return 'icons'
            return 'vendor'
          }
        },
      },
    },
  },
})
```

- [ ] **Step 2: Rewrite App.jsx with lazy below-fold**

```jsx
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const ClientsCarousel = lazy(() => import('./components/ClientsCarousel'));
const TeachingSection = lazy(() => import('./components/TeachingSection'));
const HobbyProjects = lazy(() => import('./components/HobbyProjects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

class SectionErrorBoundary extends React.Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() {
        if (this.state.failed) {
            return <section className="container py-12"><p>Section failed to load. <button onClick={() => window.location.reload()}>Retry</button></p></section>;
        }
        return this.props.children;
    }
}

const BelowFoldFallback = () => (
    <div className="container py-12" aria-hidden="true" style={{ minHeight: '40vh' }} />
);

const App = () => {
    return (
        <>
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <div className="scroll-story">
                    <Hero />
                    <SectionErrorBoundary>
                        <Suspense fallback={<BelowFoldFallback />}>
                            <Projects />
                            <About />
                            <Skills />
                            <ClientsCarousel />
                            <TeachingSection />
                            <HobbyProjects />
                            <Contact />
                        </Suspense>
                    </SectionErrorBoundary>
                </div>
                <SectionErrorBoundary>
                    <Suspense fallback={null}>
                        <Footer />
                    </Suspense>
                </SectionErrorBoundary>
            </main>
            <Footer />
        </>
    );
};

export default App;
```

Note: keep single Footer — remove duplicate: the plan above renders Footer twice by mistake. Correct implementation renders Footer ONCE inside the second boundary (delete the trailing `<Footer />` outside main). Final file must contain exactly one `<Footer />`.

- [ ] **Step 3: Build and verify chunks**

Run: `npm run build`
Expected: PASS; `dist/assets/` lists `react-vendor-*.js`, `icons-*.js`, plus lazy section chunks; prerender line `prerender: injected ... bytes` present

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: PASS (no errors)

- [ ] **Step 5: Commit**

```bash
git add vite.config.js src/App.jsx
git commit -m "perf: code-split below-fold sections + stable vendor chunks"
```

---

### Task 3: Vercel cache headers

**Files:**
- Create: `vercel.json`
- Test: `node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8')); console.log('json ok')"`

**Interfaces:**
- Consumes: Task 2 hashed asset filenames (`assets/*`)
- Produces: CDN/browser caching policy (immutable hashed, SWR unhashed images, revalidate html)

- [ ] **Step 1: Write vercel.json**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/projects/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=86400" }]
    },
    {
      "source": "/logos/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=86400" }]
    },
    {
      "source": "/:file(.*\\.(webp|avif|png|jpg|jpeg|svg|ico|webm))",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=86400" }]
    },
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }]
    }
  ]
}
```

- [ ] **Step 2: Validate JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8')); console.log('json ok')"`
Expected: `json ok`

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "perf: add Vercel cache headers (immutable assets, SWR images)"
```

---

### Task 4: Convert project PNGs to WebP

**Files:**
- Create: `scripts/optimize-images.mjs`
- Create (generated): `public/projects/mrtb.webp`, `classify.webp`, `examflow.webp`, `battlenet.webp`, `buddy.webp`, `gleam.webp`, `hamaacademy.webp`, `portfolio.webp`
- Test: `node scripts/optimize-images.mjs` + `ls -lh public/projects/*.webp`

**Interfaces:**
- Consumes: sharp (Task 1), existing PNGs
- Produces: .webp files Task 5 references; originals kept as fallback

- [ ] **Step 1: Write scripts/optimize-images.mjs**

```js
import sharp from 'sharp'
import { statSync, existsSync } from 'node:fs'

const files = ['mrtb.png', 'classify.png', 'examflow.png', 'battlenet.png', 'buddy.png', 'gleam.png', 'hamaacademy.png', 'portfolio.png']
let totalBefore = 0
let totalAfter = 0
for (const f of files) {
  const src = `public/projects/${f}`
  if (!existsSync(src)) { console.log(`skip missing ${src}`); continue }
  const out = src.replace(/\.png$/, '.webp')
  const before = statSync(src).size
  await sharp(src).webp({ quality: 80 }).toFile(out)
  const after = statSync(out).size
  totalBefore += before
  totalAfter += after
  console.log(`${f}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB webp`)
}
console.log(`total: ${Math.round(totalBefore / 1024)}KB -> ${Math.round(totalAfter / 1024)}KB`)
```

- [ ] **Step 2: Run conversion**

Run: `node scripts/optimize-images.mjs`
Expected: PASS; each line shows KB reduction; total drops (target <2MB for converted set)

- [ ] **Step 3: Verify outputs exist**

Run: `ls -lh public/projects/*.webp`
Expected: 8 .webp files listed (plus pre-existing gleamie.webp)

- [ ] **Step 4: Commit script only (not binaries yet — binaries commit with Task 5)**

```bash
git add scripts/optimize-images.mjs
git commit -m "perf: add image optimization script (PNG->WebP q80)"
```

---

### Task 5: Poster-first lazy video + webp paths + image attrs

**Files:**
- Modify: `src/data/siteContent.js:111,123,135,163,178` (5 .png → .webp) + add `poster` field for battlenet
- Modify: `src/components/HobbyProjects.jsx:1-114` (LazyVideo + img attrs)
- Test: `npm run build`, `npm run lint`, manual autoplay check

**Interfaces:**
- Consumes: Task 4 .webp files; Task 2 Suspense tree
- Produces: video bytes load only in-view; autoplay preserved on desktop, poster on reduced-motion

- [ ] **Step 1: Update siteContent.js media paths**

Replace exact strings:
- `media: "/projects/mrtb.png"` → `media: "/projects/mrtb.webp"`
- `media: "/projects/classify.png"` → `media: "/projects/classify.webp"`
- `media: "/projects/examflow.png"` → `media: "/projects/examflow.webp"`
- `media: "/projects/battlenet.png"` → `media: "/projects/battlenet.webp"` and add `poster: "/projects/battlenet.webp"` alongside existing `video: "/projects/battlenet.webm"`
- `media: "/projects/buddy.png"` → `media: "/projects/buddy.webp"`

Keep `/projects/gleamie.webp` unchanged.

- [ ] **Step 2: Add LazyVideo component at top of HobbyProjects.jsx**

```jsx
import React, { useEffect, useRef, useState } from 'react';

const useInViewOnce = (options) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || inView) return;
        if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) { setInView(true); obs.disconnect(); }
            },
            { rootMargin: '200px', threshold: 0.1, ...(options || {}) }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [inView]);
    return [ref, inView];
};

const LazyVideo = ({ poster, src, title }) => {
    const [ref, inView] = useInViewOnce();
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
    }, []);
    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            {!inView || reducedMotion ? (
                <img
                    src={poster}
                    alt={`${title} preview`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    className="hobby-card-img"
                />
            ) : (
                <video
                    src={src}
                    poster={poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    className="hobby-card-img"
                />
            )}
        </div>
    );
};
```

- [ ] **Step 3: Replace video/img block in hobby card**

Replace the `{project.video ? (<video .../>) : project.media ? (<img .../>` block with:

```jsx
{project.video ? (
    <LazyVideo poster={project.poster || project.media} src={project.video} title={project.title} />
) : project.media ? (
    <img
        src={project.media}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
        style={{
            width: '100%',
            height: '100%',
            objectFit: project.mediaFit || 'cover',
            objectPosition: 'center',
            padding: project.mediaFit === 'contain' ? '20px' : '0',
            transition: 'transform 0.5s ease',
        }}
        className="hobby-card-img"
    />
) : (
```

Keep the existing icon fallback branch unchanged after this.

- [ ] **Step 4: Build + lint**

Run: `npm run build`
Expected: PASS with prerender inject line

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit code + binaries together**

```bash
git add src/data/siteContent.js src/components/HobbyProjects.jsx public/projects/*.webp
git commit -m "perf: poster-first lazy video (autoplay kept) + WebP paths"
```

---

### Task 6: Rendering CSS + font preload

**Files:**
- Modify: `src/index.css` (append section)
- Modify: `index.html:39-41` (font preload)
- Test: build + grep

**Interfaces:**
- Consumes: Tasks 2/5 (section ids #projects, #hobby-projects, #teaching exist)
- Produces: offscreen sections skip rendering work; Sora 700 preloads without blocking

- [ ] **Step 1: Append to src/index.css**

```css
/* perf: skip offscreen rendering work */
#projects, #hobby-projects, #teaching {
  content-visibility: auto;
  contain-intrinsic-size: auto 1200px;
}

@media (prefers-reduced-motion: reduce) {
  #projects, #hobby-projects, #teaching { content-visibility: visible; }
}
```

Note: `scroll-behavior: smooth` is already gated behind `prefers-reduced-motion` in this file — do not duplicate.

- [ ] **Step 2: Add font preload in index.html head after preconnect lines**

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" />
```

Keep the existing stylesheet link unchanged (preload is additive, onload swap not required for this static page).

- [ ] **Step 3: Verify**

Run: `grep -n "content-visibility" src/index.css && grep -n "rel=\"preload\"" index.html && npm run lint`
Expected: both greps match; lint PASS

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "perf: content-visibility offscreen + font preload"
```

---

### Task 7: Verify, ledger, final build

**Files:**
- Modify: `docs/superpowers/plans/PERF-ledger.md`
- Test: `npm run build`, `npm run lint`

**Interfaces:**
- Consumes: all prior tasks
- Produces: before/after numbers + keep/revert verdicts

- [ ] **Step 1: Final build + record sizes**

Run: `npm run build 2>&1 | tail -8; ls -lh dist/assets/; du -sh public/projects dist`
Expected: build PASS; record JS/CSS bytes + projects total in ledger

- [ ] **Step 2: Update PERF ledger (append rows, one per idea)**

```markdown
| Lazy sections + manualChunks | entry 243KB → <record>KB, vendor cached | keep/revert | <why> |
| Vercel headers | no headers → immutable+ SWR | keep | repeat-visit cache, zero runtime cost |
| PNG→WebP q80 | 8.2MB → <record>MB | keep | same visuals, ~X% smaller |
| LazyVideo in-view (autoplay kept) | webm on load → webm in-view only | keep | preserves UX, removes initial bytes |
| content-visibility + font preload | — | keep/revert | <measured or reverted as neutral> |
```

Rule: any row within run-to-run noise with no user-visible gain → revert, not keep.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit ledger**

```bash
git add docs/superpowers/plans/PERF-ledger.md
git commit -m "docs(perf): final measurements + keep/revert verdicts"
```

---

## Self-Review

1. **Spec coverage:** caching headers ✓ (Task 3), image weight ✓ (Task 4/5), rendering speed ✓ (Task 2/6), autoplay kept ✓ (Task 5 LazyVideo + poster + reduced-motion), balanced ✓, Vercel static ✓, no SW ✓.
2. **Placeholder scan:** no TBD/TODO; every step has exact code/commands; Task 2 footnote fixes the double-Footer trap; Task 4 file list matches `ls public/projects`; Task 5 line refs match current files.
3. **Type consistency:** `poster` field added in Task 5 Step 1 is consumed by `LazyVideo poster=` prop in Step 3; `useInViewOnce` returns `[ref, inView]` used as `const [ref, inView]`; chunk names (`react-vendor`, `icons`, `vendor`) used only in config, not imported anywhere.
