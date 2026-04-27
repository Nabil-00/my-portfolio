import React from 'react';
import { Globe, Play, Wrench } from 'lucide-react';
import siteContent from '../data/siteContent';

const Services = () => {
  const { services, sections } = siteContent;
  const { services: servicesSection } = sections;

  const iconMap = {
    Globe,
    Play,
    Wrench,
  };

  return (
    <section id="services" style={{ background: 'var(--bg)', padding: '120px 0' }}>
      <div className="container">
        <div className="max-w-3xl">
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {servicesSection.eyebrow}
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
            {servicesSection.heading}
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <article
                key={service.title}
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 32px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--accent-dim)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <Icon size={22} style={{ color: 'var(--accent)' }} />
                </div>

                <h3 className="mt-5" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>

                <p className="mt-2" style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {service.desc}
                </p>

                <a href="#contact" className="inline-block mt-5" style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 600 }}>
                  {service.cta} →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
