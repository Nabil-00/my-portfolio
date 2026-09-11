import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import useSEO from '../hooks/useSEO'

const siteUrl = 'https://nabil.is-a.dev'

export default function BlogPost({ posts }) {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  // Add id="sources" to the Sources heading for anchor links
  useEffect(() => {
    if (!post) return
    const headings = document.querySelectorAll('.blog-prose h2')
    for (const h of headings) {
      if (h.textContent.trim() === 'Sources') {
        h.id = 'sources'
        break
      }
    }
  }, [post])

  // Compute SEO data (hooks must be called unconditionally)
  const canonical = post ? `${siteUrl}/blog/${post.slug}` : `${siteUrl}/blog`
  const ogImage = post ? `${siteUrl}/og/${post.slug}.jpg` : undefined

  // Extract FAQ items from the post body for FAQPage schema
  const faqItems = []
  if (post) {
    const faqRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs
    let match
    while ((match = faqRegex.exec(post.body)) !== null) {
      faqItems.push({
        '@type': 'Question',
        name: match[1].replace(/<[^>]*>/g, ''),
        acceptedAnswer: {
          '@type': 'Answer',
          text: match[2].replace(/<[^>]*>/g, ''),
        },
      })
    }
  }

  const jsonLd = post ? [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      url: canonical,
      author: { '@id': `${siteUrl}/#nabeel` },
      publisher: {
        '@type': 'Person',
        name: 'Nabil Ismail',
        url: siteUrl,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
    },
    ...(faqItems.length > 0 ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems,
    }] : []),
  ] : null

  useSEO({
    title: post?.title,
    description: post?.summary,
    canonical,
    ogImage,
    jsonLd,
  })

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <article style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Cover image */}
      {post.cover && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 2.5rem',
          padding: '0 1.25rem',
        }}>
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            aspectRatio: '1200 / 630',
          }}>
            <img
              src={post.cover}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Full-bleed header */}
      <header style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: '0 1.25rem',
        marginBottom: '3rem',
      }}>
        <Link
          to="/blog"
          className="nav-link-hover"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem', fontSize: '14px' }}
        >
          ← All Posts
        </Link>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
          {post.tags?.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '0.65rem',
                padding: '3px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--accent-dim)',
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          margin: '0 0 1.5rem',
          color: 'var(--text-primary)',
        }}>
          {post.title}
        </h1>

        {/* Meta row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border)',
        }}>
          {/* Author chip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--accent-dim)',
              border: '1.5px solid var(--accent)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--accent)',
            }}>
              NI
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Nabil Ismail
              </p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                Software Engineer · Kano
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Date + reading time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <time style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{post.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Post body */}
      <div
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: post.body }}
        style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: '0 1.25rem',
        }}
      />

      {/* Footer */}
      <footer style={{
        maxWidth: '740px',
        margin: '4rem auto 0',
        padding: '0 1.25rem',
      }}>
        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--border-hover) 20%, var(--border-hover) 80%, transparent)',
          marginBottom: '2rem',
        }} />

        {/* Author card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.5rem',
          background: 'var(--bg-3)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--accent-dim)',
            border: '2px solid var(--accent)',
            display: 'grid',
            placeItems: 'center',
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--accent)',
            flexShrink: 0,
          }}>
            NI
          </div>
          <div>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Written by Nabil Ismail
            </p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Software engineer in Kano, Nigeria. Building enterprise systems, AI tools, and full-stack web apps.
              <Link to="/" style={{ color: 'var(--accent)', marginLeft: '6px' }}>Portfolio →</Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <Link
          to="/blog"
          className="btn-secondary"
          style={{ fontSize: '0.88rem' }}
        >
          ← All Posts
        </Link>
      </footer>

      {/* Prose styles */}
      <style>{`
        .blog-prose h2 {
          color: var(--text-primary);
          font-size: clamp(1.5rem, 3vw, 1.85rem);
          font-weight: 800;
          margin: 3rem 0 1rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .blog-prose h3 {
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 2rem 0 0.75rem;
          line-height: 1.3;
        }
        .blog-prose p {
          margin: 0 0 1.25rem;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.8;
        }
        .blog-prose ul, .blog-prose ol {
          margin: 0 0 1.25rem;
          padding-left: 1.5rem;
          color: var(--text-secondary);
        }
        .blog-prose li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .blog-prose li strong {
          color: var(--text-primary);
        }
        .blog-prose strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .blog-prose a {
          color: var(--accent);
          text-decoration: underline;
          text-decoration-color: rgba(0, 229, 160, 0.3);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s;
        }
        .blog-prose a:hover {
          text-decoration-color: var(--accent);
        }
        .blog-prose blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: var(--text-tertiary);
          font-style: italic;
        }
        .blog-prose code {
          background: var(--bg-3);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.9em;
          color: var(--accent);
        }
        .blog-prose pre {
          background: var(--bg-3);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .blog-prose pre code {
          background: none;
          padding: 0;
          color: var(--text-primary);
        }
        .blog-prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-hover) 20%, var(--border-hover) 80%, transparent);
          margin: 3rem 0;
        }

        /* Citation superscript links */
        .blog-prose sup {
          font-size: 0.7em;
          line-height: 0;
          vertical-align: super;
        }
        .blog-prose sup a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 3px;
          background: var(--accent-dim);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .blog-prose sup a:hover {
          background: var(--accent);
          color: #000;
          text-decoration: none;
        }

        /* Sources section */
        .blog-prose h2:last-of-type {
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .blog-prose h2:last-of-type + ol,
        .blog-prose h2:last-of-type ~ ol {
          counter-reset: none;
          list-style: none;
          padding-left: 0;
          margin-top: 1rem;
        }
        .blog-prose h2:last-of-type + ol li,
        .blog-prose h2:last-of-type ~ ol li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.6rem;
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-tertiary);
        }
        .blog-prose h2:last-of-type + ol li::before,
        .blog-prose h2:last-of-type ~ ol li::before {
          content: counter(list-item) ".";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 700;
          font-size: 0.82rem;
        }
        .blog-prose h2:last-of-type + ol li a,
        .blog-prose h2:last-of-type ~ ol li a {
          color: var(--text-secondary);
          text-decoration: underline;
          text-decoration-color: rgba(255,255,255,0.15);
          text-underline-offset: 2px;
        }
        .blog-prose h2:last-of-type + ol li a:hover,
        .blog-prose h2:last-of-type ~ ol li a:hover {
          color: var(--accent);
          text-decoration-color: var(--accent);
        }

        /* FAQ section */
        .blog-prose h3 {
          color: var(--text-primary);
        }

        @media (max-width: 640px) {
          .blog-prose p {
            font-size: 1rem;
          }
          .blog-prose h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </article>
  )
}
