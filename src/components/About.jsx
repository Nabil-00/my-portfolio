import React from 'react';
import { ArrowRight, Code2, Cpu, Video } from 'lucide-react';
import siteContent from '../data/siteContent';

const About = () => {
    const { pillars, sections } = siteContent;
    const { about } = sections;

    const iconMap = {
        Code2,
        Video,
        Cpu,
    };

    return (
        <section id="about" style={{ background: 'var(--bg-2)', padding: '120px 0' }}>
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div>
                        <div
                            className="relative overflow-hidden"
                            style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
                        >
                            <img
                                src="/newpic.jpg"
                                alt={about.imageAlt}
                                loading="lazy"
                                className="w-full"
                                style={{ aspectRatio: '4 / 5', objectFit: 'cover' }}
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-1/2"
                                style={{ background: 'linear-gradient(to top, #000 0%, transparent 50%)' }}
                            />
                        </div>
                    </div>

                    <div>
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
                            className="mt-4"
                            style={{
                                fontSize: 'clamp(32px, 5vw, 48px)',
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                            }}
                        >
                            {about.heading}
                        </h2>

                        <div className="mt-6 space-y-5" style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            {about.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            {pillars.map((pillar) => {
                                const Icon = iconMap[pillar.icon] || Code2;
                                return (
                                    <article
                                        key={pillar.id}
                                        className="flex-1 min-w-[220px]"
                                        style={{
                                            background: 'var(--bg-3)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: '20px',
                                            transition: 'border-color 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--accent)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                        }}
                                    >
                                        <Icon size={24} style={{ color: 'var(--accent)' }} />
                                        <h3 className="mt-2.5" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                            {pillar.title}
                                        </h3>
                                        <p className="mt-2" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            {pillar.desc}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>

                        <a
                            href="#contact"
                            className="mt-6 inline-flex items-center gap-2"
                            style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 600, transition: 'opacity 0.2s ease' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                            }}
                        >
                            {about.cta}
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
