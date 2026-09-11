#!/usr/bin/env node
/**
 * Generate Apple-style blog cover images using sharp + SVG.
 * Each cover has: dark gradient bg, accent geometric shape, bold title, tag chips.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import matter from 'gray-matter'

const contentDir = resolve('content/posts')
const publicDir = resolve('public')
const coverDir = resolve(publicDir, 'covers')

if (!existsSync(coverDir)) mkdirSync(coverDir, { recursive: true })

// Each post gets a unique accent color and geometric pattern
const postStyles = {
  'web-developer-in-kano':        { accent: '#00E5A0', shape: 'circle',    tag: 'WEB DEV' },
  'ai-company-in-kano':           { accent: '#818CF8', shape: 'diamond',   tag: 'AI' },
  'hire-web-developer-kano':      { accent: '#F59E0B', shape: 'hexagon',   tag: 'HIRING' },
  'software-developer-in-kano':   { accent: '#06B6D4', shape: 'triangle',  tag: 'SOFTWARE' },
  'website-design-in-kano':       { accent: '#EC4899', shape: 'square',    tag: 'DESIGN' },
  'mobile-app-developer-kano':    { accent: '#10B981', shape: 'circle',    tag: 'MOBILE' },
  'flutter-developer-kano':       { accent: '#3B82F6', shape: 'diamond',   tag: 'FLUTTER' },
  'chatbot-developer-kano':       { accent: '#F97316', shape: 'hexagon',   tag: 'CHATBOT' },
  'enterprise-software-kano':     { accent: '#A855F7', shape: 'triangle',  tag: 'ENTERPRISE' },
  'react-developer-kano':         { accent: '#0EA5E9', shape: 'square',    tag: 'REACT' },
}

function getShapeSVG(shape, accent, cx, cy, size) {
  const opacity = '0.12'
  switch (shape) {
    case 'circle':
      return `<circle cx="${cx}" cy="${cy}" r="${size}" fill="none" stroke="${accent}" stroke-width="3" opacity="${opacity}"/>
              <circle cx="${cx}" cy="${cy}" r="${size * 0.6}" fill="none" stroke="${accent}" stroke-width="2" opacity="${opacity}"/>`
    case 'diamond':
      return `<polygon points="${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}" fill="none" stroke="${accent}" stroke-width="3" opacity="${opacity}"/>
              <polygon points="${cx},${cy - size * 0.5} ${cx + size * 0.5},${cy} ${cx},${cy + size * 0.5} ${cx - size * 0.5},${cy}" fill="none" stroke="${accent}" stroke-width="2" opacity="${opacity}"/>`
    case 'hexagon': {
      const pts = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        pts.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`)
      }
      return `<polygon points="${pts.join(' ')}" fill="none" stroke="${accent}" stroke-width="3" opacity="${opacity}"/>`
    }
    case 'triangle':
      return `<polygon points="${cx},${cy - size} ${cx + size * 0.866},${cy + size * 0.5} ${cx - size * 0.866},${cy + size * 0.5}" fill="none" stroke="${accent}" stroke-width="3" opacity="${opacity}"/>`
    case 'square':
      return `<rect x="${cx - size}" y="${cy - size}" width="${size * 2}" height="${size * 2}" fill="none" stroke="${accent}" stroke-width="3" opacity="${opacity}" rx="8"/>`
    default:
      return ''
  }
}

function wrapTitle(title, maxCharsPerLine = 22) {
  const words = title.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxCharsPerLine && current) {
      lines.push(current.trim())
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current.trim())
  return lines
}

function generateCoverSVG(post, style) {
  const titleLines = wrapTitle(post.title, 24)
  const lineHeight = 54
  const titleStartY = 200
  const accent = style.accent

  // Pick geometric shape position based on shape type
  const shapeX = style.shape === 'circle' ? 950 : style.shape === 'diamond' ? 1000 : 920
  const shapeY = style.shape === 'hexagon' ? 280 : 300
  const shapeSize = style.shape === 'hexagon' ? 140 : 120

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A"/>
      <stop offset="50%" style="stop-color:#111111"/>
      <stop offset="100%" style="stop-color:#0A0A0A"/>
    </linearGradient>
    <linearGradient id="accent-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0"/>
    </linearGradient>
    <radialGradient id="spotlight" cx="20%" cy="40%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0.06"/>
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#spotlight)"/>

  <!-- Top accent line -->
  <rect x="80" y="70" width="60" height="3" rx="1.5" fill="${accent}" opacity="0.9"/>

  <!-- Tag chip -->
  <rect x="80" y="90" width="${style.tag.length * 13 + 28}" height="30" rx="15" fill="${accent}" fill-opacity="0.12"/>
  <text x="94" y="110" fill="${accent}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="0.1em">${style.tag}</text>

  <!-- Title -->
  <text x="80" y="${titleStartY}" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="800" letter-spacing="-0.02em">
    ${titleLines.map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`).join('\n    ')}
  </text>

  <!-- Summary -->
  <text x="80" y="${titleStartY + titleLines.length * lineHeight + 40}" fill="#9CA3AF" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400">
    ${post.summary.length > 90 ? post.summary.substring(0, 90) + '...' : post.summary}
  </text>

  <!-- Bottom bar -->
  <rect x="80" y="540" width="1040" height="1" fill="#222222"/>
  <text x="80" y="575" fill="#6B7280" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500">nabil.is-a.dev</text>
  <text x="1120" y="575" fill="#6B7280" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" text-anchor="end">${post.date} · ${post.readingTime} min read</text>

  <!-- Geometric accent shape -->
  ${getShapeSVG(style.shape, accent, shapeX, shapeY, shapeSize)}

  <!-- Subtle accent glow -->
  <circle cx="${shapeX}" cy="${shapeY}" r="${shapeSize * 2}" fill="url(#accent-glow)" opacity="0.3"/>
</svg>`
}

async function main() {
  const sharp = (await import('sharp')).default

  const files = existsSync(contentDir)
    ? readdirSync(contentDir).filter(f => f.endsWith('.md'))
    : []

  let count = 0
  for (const file of files) {
    const raw = readFileSync(resolve(contentDir, file), 'utf8')
    const { data } = matter(raw)
    if (data.draft || !data.title) continue

    const slug = basename(file, '.md')
    const style = postStyles[slug] || { accent: '#00E5A0', shape: 'circle', tag: 'POST' }

    const wordCount = raw.split(/\s+/).filter(Boolean).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    const post = {
      title: data.title,
      summary: data.summary || '',
      date: data.date,
      readingTime,
    }

    const svg = generateCoverSVG(post, style)

    // Generate cover image (1200x630)
    await sharp(Buffer.from(svg))
      .resize(1200, 630)
      .jpeg({ quality: 92 })
      .toFile(resolve(coverDir, `${slug}.jpg`))

    count++
    console.log(`cover: generated ${slug}.jpg`)
  }

  console.log(`cover: done — ${count} cover images generated`)
}

main()
