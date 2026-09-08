import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'

const distDir = resolve('dist')
const ssrDir = resolve('dist-ssr')

// 1. Build an SSR bundle of the EAGER prerender entry (JSX transformed, deps
// externalized). The client App.jsx code-splits below-fold sections with
// React.lazy, which renderToString cannot resolve (it would emit only the
// Suspense fallbacks) and streaming SSR would hide inside <div hidden> flight
// payloads. Rendering the eager twin guarantees prerendered DOM identical to
// the interactive app: full SEO/no-JS/first-paint content.
// NOTE: vite.config.js sets client-only rollupOptions.output file naming
// (assets/[name]-[hash].js) + manualChunks. Override them here so the SSR
// entry lands at the deterministic path dist-ssr/prerender-entry.js.
await build({
  logLevel: 'error',
  build: {
    ssr: resolve('src/prerender-entry.jsx'),
    outDir: ssrDir,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})

const { default: PrerenderApp } = await import(`../dist-ssr/prerender-entry.js`)

// 2. Render to static HTML (fully eager tree — no Suspense boundaries).
const appHtml = renderToString(React.createElement(PrerenderApp))

// 3. Regression tripwires: fail loudly if the prerender ever degrades to
// fallbacks/hidden streaming payloads or shrinks far below the ~69KB baseline.
if (appHtml.includes('min-height:40vh')) {
  console.error('prerender: BelowFoldFallback spacer leaked into static HTML — lazy boundary unresolved')
  process.exit(1)
}
if (appHtml.includes('<div hidden id="S:')) {
  console.error('prerender: hidden Suspense payload in static HTML — use the eager entry, not streaming SSR')
  process.exit(1)
}
if (appHtml.length < 50000) {
  console.error(`prerender: suspiciously small output (${appHtml.length} bytes, expected ~69000) — below-fold content missing?`)
  process.exit(1)
}

// 3. Inject into the built client index.html
const indexPath = resolve(distDir, 'index.html')
if (!existsSync(indexPath)) {
  console.error('prerender: dist/index.html not found — run `vite build` first')
  process.exit(1)
}
let html = readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  console.error('prerender: root marker not found in dist/index.html')
  process.exit(1)
}
html = html.replace(marker, `<div id="root">${appHtml}</div>`)
writeFileSync(indexPath, html)

// 4. Clean up the SSR bundle
rmSync(ssrDir, { recursive: true, force: true })

console.log(`prerender: injected ${appHtml.length} bytes of static HTML into dist/index.html`)
