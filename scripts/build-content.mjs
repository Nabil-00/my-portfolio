#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDir = resolve('content/posts')
const outDataDir = resolve('src/data')
const publicDir = resolve('public')
const siteUrl = 'https://nabil.is-a.dev'

// Read all markdown posts
function readPosts() {
  if (!existsSync(contentDir)) {
    console.warn('build-content: content/posts/ not found, skipping blog build')
    return []
  }

  const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))
  const posts = []

  for (const file of files) {
    const raw = readFileSync(resolve(contentDir, file), 'utf8')
    const { data, content } = matter(raw)

    if (!data.title || !data.date) {
      console.error(`build-content: ${file} missing required frontmatter (title, date)`)
      process.exit(1)
    }

    if (data.draft) {
      console.log(`build-content: skipping draft "${file}"`)
      continue
    }

    // Exclude future-dated posts
    if (new Date(data.date) > new Date()) {
      console.log(`build-content: skipping future-dated "${file}"`)
      continue
    }

    const slug = basename(file, '.md')
    const html = marked(content)
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    posts.push({
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary || '',
      tags: data.tags || [],
      readingTime,
      body: html,
      wordCount,
      cover: `/covers/${slug}.jpg`,
    })
  }

  // Sort newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  return posts
}

// Generate posts.json (for client-side rendering)
function writePostsJSON(posts) {
  const lite = posts.map(({ body, ...rest }) => rest) // exclude body for list
  writeFileSync(resolve(outDataDir, 'posts.json'), JSON.stringify(lite, null, 2))
  console.log(`build-content: wrote ${lite.length} posts to src/data/posts.json`)
}

// Generate full posts data with body (for prerendering)
function writePostsFull(posts) {
  writeFileSync(resolve(outDataDir, 'posts-full.json'), JSON.stringify(posts, null, 2))
  console.log(`build-content: wrote ${posts.length} full posts to src/data/posts-full.json`)
}

// Generate RSS feed
function writeRSS(posts) {
  const items = posts.slice(0, 20).map(p => `  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${siteUrl}/blog/${p.slug}</link>
    <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description><![CDATA[${p.summary}]]></description>
    ${p.tags.map(t => `<category>${t}</category>`).join('\n    ')}
  </item>`).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Nabil Ismail — Blog</title>
  <link>${siteUrl}/blog</link>
  <description>Articles on web development, AI, and software engineering by Nabil Ismail in Kano, Nigeria.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`

  writeFileSync(resolve(publicDir, 'rss.xml'), rss)
  console.log(`build-content: wrote rss.xml (${posts.length} items)`)
}

// Update sitemap.xml
function writeSitemap(posts) {
  const existing = existsSync(resolve(publicDir, 'sitemap.xml'))
    ? readFileSync(resolve(publicDir, 'sitemap.xml'), 'utf8')
    : null

  // Extract static URLs from existing sitemap
  let staticUrls = []
  if (existing) {
    const locMatches = existing.matchAll(/<loc>([^<]+)<\/loc>/g)
    for (const m of locMatches) {
      if (!m[1].includes('/blog/')) {
        staticUrls.push(m[1])
      }
    }
  }
  if (staticUrls.length === 0) {
    staticUrls = [siteUrl, `${siteUrl}/blog`, `${siteUrl}/sitemap.xml`]
  }

  const blogUrls = posts.map(p => `${siteUrl}/blog/${p.slug}`)
  const allUrls = [...new Set([...staticUrls, ...blogUrls])]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.includes('/blog/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === siteUrl ? '1.0' : url.includes('/blog/') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`

  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap)
  console.log(`build-content: updated sitemap.xml (${allUrls.length} URLs)`)
}

// Update llms.txt with Writing section
function writeLLMsTxt(posts) {
  const llmsPath = resolve(publicDir, 'llms.txt')
  if (!existsSync(llmsPath)) {
    console.warn('build-content: llms.txt not found, skipping update')
    return
  }

  let content = readFileSync(llmsPath, 'utf8')

  // Remove existing Writing section if present
  content = content.replace(/\n## Writing\n[\s\S]*?(?=\n## |\n$)/, '')

  const writingSection = `\n## Writing

${posts.map(p => `- [${p.title}](${siteUrl}/blog/${p.slug}) — ${p.summary} (${p.date})`).join('\n')}
`

  // Append Writing section before the end
  if (content.endsWith('\n')) {
    content += writingSection
  } else {
    content += '\n' + writingSection
  }

  writeFileSync(llmsPath, content)
  console.log(`build-content: updated llms.txt with ${posts.length} posts`)
}

// Generate OG images using sharp (already a dependency)
async function writeOGImages(posts) {
  try {
    const sharp = (await import('sharp')).default
    const ogDir = resolve(publicDir, 'og')

    for (const post of posts) {
      const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000"/>
      <stop offset="100%" style="stop-color:#0A0A0A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="80" width="1040" height="470" rx="20" fill="none" stroke="rgba(0,229,160,0.3)" stroke-width="2"/>
  <text x="80" y="160" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="24" font-weight="600">nabil.is-a.dev/blog</text>
  <text x="80" y="240" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="${post.title.length > 50 ? 38 : 44}" font-weight="800">
    ${post.title.split('\n').map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 52}">${line}</tspan>`).join('')}
  </text>
  <text x="80" y="${post.title.length > 50 ? 380 : 340}" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="20">${post.summary.substring(0, 100)}${post.summary.length > 100 ? '...' : ''}</text>
  <text x="80" y="490" fill="#00E5A0" font-family="system-ui, sans-serif" font-size="18" font-weight="600">${post.date} · ${post.readingTime} min read</text>
  <text x="1040" y="490" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="18" text-anchor="end">@i_nabeel_</text>
</svg>`

      await sharp(Buffer.from(svg))
        .resize(1200, 630)
        .jpeg({ quality: 90 })
        .toFile(resolve(ogDir, `${post.slug}.jpg`))
    }

    console.log(`build-content: generated ${posts.length} OG images`)
  } catch (err) {
    console.warn(`build-content: OG image generation failed (non-fatal): ${err.message}`)
  }
}

// Main
const posts = readPosts()
if (posts.length > 0) {
  writePostsJSON(posts)
  writePostsFull(posts)
  writeRSS(posts)
  writeSitemap(posts)
  writeLLMsTxt(posts)
  await writeOGImages(posts)
} else {
  console.log('build-content: no published posts found')
}
