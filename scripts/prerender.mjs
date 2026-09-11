import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { build } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'

const distDir = resolve('dist')
const ssrDir = resolve('dist-ssr')

// 1. Build an SSR bundle
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

const { createPrerenderApp } = await import(`../dist-ssr/prerender-entry.js`)

// 2. Load posts data for route generation
let postsData = []
try {
  postsData = JSON.parse(readFileSync(resolve('src/data/posts-full.json'), 'utf8'))
} catch {
  console.warn('prerender: posts-full.json not found, blog routes will not be prerendered')
}

// 3. Define routes to prerender
const routes = ['/']
if (postsData.length > 0) {
  routes.push('/blog')
  for (const post of postsData) {
    routes.push(`/blog/${post.slug}`)
  }
}

// 4. Inject into the built client index.html
const indexPath = resolve(distDir, 'index.html')
if (!existsSync(indexPath)) {
  console.error('prerender: dist/index.html not found — run `vite build` first')
  process.exit(1)
}

const templateHtml = readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!templateHtml.includes(marker)) {
  console.error('prerender: root marker not found in dist/index.html')
  process.exit(1)
}

// 5. Prerender each route
for (const route of routes) {
  const PrerenderApp = createPrerenderApp(route)
  const appHtml = renderToString(React.createElement(PrerenderApp))

  // Regression tripwires for home page only
  if (route === '/') {
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
  }

  let html = templateHtml.replace(marker, `<div id="root">${appHtml}</div>`)

  // Auto-stamp dateModified in ProfilePage JSON-LD (home page only)
  if (route === '/') {
    html = html.replace(
      /"dateModified": "[^"]*"/,
      `"dateModified": "${new Date().toISOString()}"`
    )
  }

  // Write to the appropriate location
  if (route === '/') {
    writeFileSync(indexPath, html)
    console.log(`prerender: / → dist/index.html (${appHtml.length} bytes)`)
  } else {
    const outPath = join(distDir, route, 'index.html')
    mkdirSync(join(distDir, route), { recursive: true })
    writeFileSync(outPath, html)
    console.log(`prerender: ${route} → ${outPath.replace(distDir, 'dist')} (${appHtml.length} bytes)`)
  }
}

// 6. Clean up the SSR bundle
rmSync(ssrDir, { recursive: true, force: true })

console.log(`prerender: done — ${routes.length} routes prerendered`)
