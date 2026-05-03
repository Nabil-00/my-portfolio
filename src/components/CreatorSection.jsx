import React from 'react';
import { CheckCircle, ExternalLink, Play } from 'lucide-react';
import siteContent from '../data/siteContent';

const CreatorSection = () => {
  const { meta, stats, sections } = siteContent;
  const { creator } = sections;

  return (
    <section id="creator" style={{ background: 'var(--bg-2)', padding: '120px 0' }}>
      <div className="container">
        <div className="max-w-4xl">
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {creator.eyebrow}
          </p>
          <h2
            className="mt-3"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            {creator.heading}
          </h2>
          <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            {creator.subtext}
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_1.3fr_1fr] gap-12 items-start">
          <div>
            <img
              src="/creator-photo.jpg"
              alt="Nabeel Ismail, tech content creator"
              loading="lazy"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
              }}
            />
          </div>

          <div>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {creator.intro}
            </p>

            <ul className="mt-6 space-y-3">
              {creator.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} style={{ color: 'var(--accent)', marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={meta.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-7"
              style={{
                background: 'var(--accent)',
                color: '#000',
                fontWeight: 700,
                borderRadius: 'var(--radius-pill)',
                padding: '12px 28px',
              }}
            >
              <Play size={16} />
              {creator.buttonLabel}
              <ExternalLink size={14} />
            </a>
          </div>

          <div>
            <article
              className="mx-auto"
              style={{
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                maxWidth: '320px',
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/creator-photo.jpg"
                  alt="Nabeel Ismail"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    border: '2px solid var(--accent)',
                  }}
                />
                <div className="flex flex-col">
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{creator.profile.handle}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{creator.profile.label}</p>
                </div>
              </div>
              <div className="my-4" style={{ borderTop: '1px solid var(--border)' }} />

              <div className="flex flex-wrap gap-2">
                {creator.profile.chips.map((chip) => (
                  <span
                    key={chip}
                    style={{
                      background: 'var(--bg-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '6px 14px',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <a
                href={meta.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4"
                style={{ color: 'var(--accent)', fontSize: '13px' }}
              >
                {creator.profile.linkLabel}
                <ExternalLink size={13} />
              </a>
            </article>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <p style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
