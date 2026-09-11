import { useEffect } from 'react'
import siteContent from '../data/siteContent'

const siteUrl = 'https://nabil.is-a.dev'

export default function useSEO({ title, description, canonical, jsonLd, ogImage } = {}) {
  const meta = siteContent.meta

  useEffect(() => {
    const prevTitle = document.title

    // Title
    document.title = title
      ? `${title} | ${meta.name}`
      : `${meta.title} | ${meta.name}`

    // Meta description
    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement('meta')
      descTag.setAttribute('name', 'description')
      document.head.appendChild(descTag)
    }
    descTag.setAttribute('content', description || meta.description)

    // Canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', canonical || siteUrl)

    // OG tags
    const setOG = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setOG('og:title', title || meta.title)
    setOG('og:description', description || meta.description)
    setOG('og:url', canonical || siteUrl)
    if (ogImage) setOG('og:image', ogImage)

    // JSON-LD
    let scriptTag = document.querySelector('script[data-use-seo]')
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.setAttribute('type', 'application/ld+json')
        scriptTag.setAttribute('data-use-seo', '')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(jsonLd)
    } else if (scriptTag) {
      scriptTag.remove()
    }

    return () => {
      document.title = prevTitle
      if (scriptTag) scriptTag.remove()
    }
  }, [title, description, canonical, jsonLd, ogImage])
}
