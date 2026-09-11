import { Link } from 'react-router-dom'

export default function BlogTeaser({ posts }) {
  if (!posts || posts.length === 0) return null

  const latest = posts.slice(0, 3)

  return (
    <section className="py-section section-bg" id="blog">
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            color: 'var(--accent)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: '0 0 0.75rem',
          }}>
            WRITING
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            margin: '0 0 0.75rem',
          }}>
            From the blog
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '48ch',
          }}>
            Practical insights on web development, AI, and building software in Kano.
          </p>
        </div>

        {/* Post cards — 3 column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {latest.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
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
                {/* Cover thumbnail */}
                {post.cover && (
                  <div style={{ aspectRatio: '1200 / 630', overflow: 'hidden' }}>
                    <img
                      src={post.cover}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}

                <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <time style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </time>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}>·</span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem' }}>{post.readingTime}m</span>
                </div>

                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  margin: 0,
                  color: 'var(--text-primary)',
                }}>
                  {post.title}
                </h3>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  margin: 0,
                  flex: 1,
                }}>
                  {post.summary}
                </p>

                <span style={{
                  color: 'var(--accent)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '0.25rem',
                }}>
                  Read more →
                </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/blog"
          className="btn-secondary"
          style={{ fontSize: '0.88rem' }}
        >
          All Posts →
        </Link>
      </div>
    </section>
  )
}
