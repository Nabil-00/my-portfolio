import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    canonical: 'https://nabil.is-a.dev/404',
  })

  return (
    <section className="container py-section" style={{ paddingTop: '100px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: 'var(--accent)',
          margin: 0,
          lineHeight: 1,
        }}>
          404
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          margin: '1rem 0 2rem',
        }}>
          This page doesn't exist. It might have been moved or the URL might be incorrect.
        </p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </section>
  )
}
