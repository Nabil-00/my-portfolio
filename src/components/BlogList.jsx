import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'

const siteUrl = 'https://nabil.is-a.dev'

export default function BlogList({ posts }) {
  const [selectedTag, setSelectedTag] = useState(null)

  const allTags = useMemo(() => {
    const tags = new Set()
    posts.forEach(p => p.tags?.forEach(t => tags.add(t)))
    return [...tags].sort()
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts
    return posts.filter(p => p.tags?.includes(selectedTag))
  }, [posts, selectedTag])

  useSEO({
    title: 'Blog',
    description: 'Articles on web development, AI, mobile apps, and software engineering by Nabil Ismail in Kano, Nigeria.',
    canonical: `${siteUrl}/blog`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Blog | Nabil Ismail',
      description: 'Articles on web development, AI, mobile apps, and software engineering by Nabil Ismail in Kano, Nigeria.',
      url: `${siteUrl}/blog`,
      author: { '@id': `${siteUrl}/#nabeel` },
    },
  })

  return (
    <section className="container py-section" style={{ paddingTop: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link
          to="/"
          className="nav-link-hover"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem', fontSize: '14px' }}
        >
          ← Back to Home
        </Link>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            margin: '0 0 0.75rem',
          }}
        >
          Writing
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0 0 2rem', maxWidth: '50ch' }}>
          Thoughts on web development, AI, and building software in Kano, Nigeria.
        </p>

        {/* Tag filter chips */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2.5rem' }}>
            <button
              onClick={() => setSelectedTag(null)}
              className="inquiry-chip"
              style={!selectedTag ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: '#000' } : {}}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className="inquiry-chip"
                style={selectedTag === tag ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: '#000' } : {}}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Post cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredPosts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{
                display: 'block',
                padding: '1.5rem',
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                <time style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>·</span>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{post.readingTime} min read</span>
              </div>

              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                margin: '0 0 0.5rem',
                lineHeight: 1.3,
                color: 'var(--text-primary)',
              }}>
                {post.title}
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                margin: '0 0 0.75rem',
                lineHeight: 1.6,
              }}>
                {post.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {post.tags?.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 10px',
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
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0' }}>
            No posts found for this tag.
          </p>
        )}
      </div>
    </section>
  )
}
