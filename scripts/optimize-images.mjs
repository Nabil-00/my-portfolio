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
