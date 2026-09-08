import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'

const distDir = resolve('dist')
const ssrDir = resolve('dist-ssr')

// 1. Build an SSR bundle of App.jsx (JSX transformed, deps externalized)
// NOTE: vite.config.js sets client-only rollupOptions.output file naming
// (assets/[name]-[hash].js) + manualChunks. Override them here so the SSR
// entry lands at the deterministic path dist-ssr/App.js imported below.
await build({
  logLevel: 'error',
  build: {
    ssr: resolve('src/App.jsx'),
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

const { default: App } = await import(`../dist-ssr/App.js`)

// 2. Render to static HTML
const appHtml = renderToString(React.createElement(App))

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
