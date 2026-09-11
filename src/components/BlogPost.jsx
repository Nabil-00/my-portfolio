import { Link, useParams, Navigate } from 'react-router-dom'
import useSEO from '../hooks/useSEO'

const siteUrl = 'https://nabil.is-a.dev'

export default function BlogPost({ posts }) {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

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
    <article className="container py-section" style={{ paddingTop: '100px' }}>
      <div style={{ maxWidth: '740px', margin: '0 auto' }}>
        <Link
          to="/blog"
          className="nav-link-hover"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem', fontSize: '14px' }}
        >
          ← All Posts
        </Link>

        {/* Post header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <time style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>·</span>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{post.readingTime} min read</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: '0 0 1rem',
          }}>
            {post.title}
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.15rem',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {post.summary}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '1.25rem' }}>
            {post.tags?.map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--border-hover) 20%, var(--border-hover) 80%, transparent)',
          marginBottom: '2.5rem',
        }} />

        {/* Post body — styled prose */}
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.body }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
          }}
        />

        {/* Back to blog */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
        }}>
          <Link
            to="/blog"
            className="btn-secondary"
            style={{ fontSize: '0.9rem' }}
          >
            ← All Posts
          </Link>
        </div>
      </div>

      {/* Blog prose styles */}
      <style>{`
        .blog-prose h2 {
          color: var(--text-primary);
          font-size: clamp(1.5rem, 3vw, 1.8rem);
          font-weight: 700;
          margin: 2.5rem 0 1rem;
          letter-spacing: -0.02em;
        }
        .blog-prose h3 {
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 2rem 0 0.75rem;
        }
        .blog-prose p {
          margin: 0 0 1.25rem;
        }
        .blog-prose ul, .blog-prose ol {
          margin: 0 0 1.25rem;
          padding-left: 1.5rem;
        }
        .blog-prose li {
          margin-bottom: 0.5rem;
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
          margin: 2.5rem 0;
        }
      `}</style>
    </article>
  )
}
