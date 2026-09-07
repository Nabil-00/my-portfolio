import React from 'react';
import { Code2, Cpu, Video, ArrowRight } from 'lucide-react';
import siteContent from '../data/siteContent';

const iconMap = { Code2, Cpu, Video };

const About = () => {
    const { pillars, sections } = siteContent;
    const { about } = sections;

    return (
        <section id="about" className="section-bg py-section">
            <div className="container">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <p
                            style={{
                                fontSize: '12px',
                                letterSpacing: '0.12em',
                                color: 'var(--accent)',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}
                        >
                            {about.eyebrow}
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
                            {about.heading}
                        </h2>

                        {about.paragraphs.map((text, i) => (
                            <p
                                key={i}
                                className="mt-4"
                                style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8 }}
                            >
                                {text}
                            </p>
                        ))}

                        <a href="#contact" className="about-cta inline-flex items-center gap-1.5 mt-6">
                            {about.cta}
                            <ArrowRight size={15} />
                        </a>
                    </div>

                    <div className="order-1 lg:order-2">
                        <img
                            src="/newpic.jpg"
                            alt={about.imageAlt}
                            loading="lazy"
                            width={600}
                            height={800}
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
                </div>

                <div className="mt-12 grid sm:grid-cols-3 gap-4">
                    {pillars.map((pillar) => {
                        const Icon = iconMap[pillar.icon] || Code2;
                        return (
                            <div key={pillar.id} className="pillar-card">
                                <div
                                    className="inline-flex items-center justify-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-sm)',
                                        background: 'var(--accent-dim)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    <Icon size={20} />
                                </div>
                                <h3
                                    className="mt-3"
                                    style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}
                                >
                                    {pillar.title}
                                </h3>
                                <p className="mt-1" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    {pillar.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
