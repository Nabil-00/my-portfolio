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

  const featured = filteredPosts[0]
  const rest = filteredPosts.slice(1)

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
    <section className="container" style={{ paddingTop: '100px', paddingBottom: '64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Back link */}
        <Link
          to="/"
          className="nav-link-hover"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '3rem', fontSize: '14px' }}
        >
          ← Home
        </Link>

        {/* Masthead */}
        <header style={{ marginBottom: '4rem' }}>
          <p style={{
            color: 'var(--accent)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: '0 0 1rem',
          }}>
            Writing
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            margin: '0 0 1.5rem',
            color: 'var(--text-primary)',
          }}>
            Thoughts on<br />
            <span style={{ color: 'var(--accent)' }}>building software</span>
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            margin: '0',
            maxWidth: '52ch',
          }}>
            Web development, AI, and engineering insights from Kano, Nigeria.
            Each post includes sourced data and practical guidance for local businesses.
          </p>
        </header>

        {/* Tag filter chips */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '3.5rem' }}>
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

        {/* Featured post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            style={{ display: 'block', marginBottom: '3rem', textDecoration: 'none' }}
          >
            <article
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
                padding: '2rem',
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#000',
                  background: 'var(--accent)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                }}>
                  Latest
                </span>
                <time style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                  {new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>·</span>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{featured.readingTime} min read</span>
              </div>

              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                margin: 0,
                color: 'var(--text-primary)',
              }}>
                {featured.title}
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '60ch',
              }}>
                {featured.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.5rem' }}>
                {featured.tags?.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
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
            </article>
          </Link>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--border-hover) 20%, var(--border-hover) 80%, transparent)',
            marginBottom: '3rem',
          }} />
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.5rem',
          }}>
            {rest.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    height: '100%',
                    transition: 'border-color 0.25s ease, transform 0.25s ease',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <time style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>·</span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>{post.readingTime}m</span>
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: 0,
                    color: 'var(--text-primary)',
                  }}>
                    {post.title}
                  </h3>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}>
                    {post.summary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '0.25rem' }}>
                    {post.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.65rem',
                          padding: '2px 8px',
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
                </article>
              </Link>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0' }}>
            No posts found for this tag.
          </p>
        )}
      </div>
    </section>
  )
}
