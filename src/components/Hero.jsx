import React from 'react';
import { MessageCircle, Facebook, Github, Download, Music2 } from 'lucide-react';
import siteContent from '../data/siteContent';

const Hero = () => {
    const { meta, hero } = siteContent;

    const socialLinks = [
        {
            icon: <MessageCircle size={16} />,
            href: meta.whatsapp,
            label: meta.socialLabels.whatsapp
        },
        {
            icon: <Facebook size={16} />,
            href: meta.facebook,
            label: meta.socialLabels.facebook
        },
        {
            icon: <Music2 size={16} />,
            href: meta.tiktok,
            label: meta.socialLabels.tiktok
        },
        {
            icon: <Github size={16} />,
            href: meta.github,
            label: meta.socialLabels.github
        }
    ];

    return (
        <section
            id="home"
            className="hero-section relative overflow-hidden"
            style={{
                minHeight: 'calc(100vh - 64px)',
                paddingTop: '80px',
                background: 'var(--bg)',
            }}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(0,229,160,0.06) 0%, transparent 70%)',
                }}
            />

            <div
                className="container relative z-10 grid lg:grid-cols-[55%_45%] gap-10 lg:gap-8 items-center py-6 md:py-8"
                style={{ minHeight: 'calc(100vh - 64px - 80px)' }}
            >
                <div
                    className="order-2 lg:order-1"
                    style={{ animation: 'fade-in-left 0.8s ease forwards' }}
                >
                    <div
                        className="inline-flex items-center gap-2"
                        style={{
                            background: 'var(--accent-dim)',
                            border: '1px solid var(--accent)',
                            borderRadius: 'var(--radius-pill)',
                            padding: '4px 14px',
                            fontSize: '13px',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                backgroundColor: 'var(--accent)',
                            }}
                        />
                        <span>{hero.availability}</span>
                    </div>

                    <p className="mt-6" style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
                        {hero.greeting}
                    </p>

                    <h1
                        className="mt-2"
                        style={{
                            fontSize: 'clamp(48px, 7vw, 92px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: 'var(--text-primary)',
                        }}
                    >
                        {hero.headline[0]}
                        <span style={{ color: 'var(--accent)' }}>{hero.highlightWord}</span>
                        {hero.headline[2]}
                    </h1>

                    <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                        {hero.tagline}
                    </p>

                    <p
                        className="mt-5"
                        style={{
                            fontSize: '16px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            maxWidth: '480px',
                        }}
                    >
                        {hero.bio}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2"
                            style={{
                                background: 'var(--accent)',
                                color: '#000',
                                fontWeight: 700,
                                borderRadius: 'var(--radius-pill)',
                                padding: '12px 28px',
                            }}
                        >
                            <MessageCircle size={16} />
                            {hero.cta.primary}
                        </a>
                        <a
                            href={meta.cvPath}
                            download
                            className="inline-flex items-center gap-2"
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--border-hover)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-pill)',
                                padding: '12px 28px',
                                transition: 'border-color 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-hover)';
                            }}
                        >
                            <Download size={16} />
                            {hero.cta.secondary}
                        </a>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="inline-flex items-center justify-center"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-secondary)',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                    e.currentTarget.style.color = 'var(--accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div
                    className="order-1 lg:order-2 flex justify-center"
                    style={{ opacity: 0, animation: 'fade-in-up 0.8s ease 0.2s forwards' }}
                >
                    <div
                        style={{
                            width: 'clamp(280px, 30vw, 520px)',
                            height: 'clamp(280px, 30vw, 520px)',
                            borderRadius: '50%',
                            border: '3px solid var(--accent)',
                            boxShadow:
                                '0 0 60px var(--accent-glow), 0 0 120px rgba(0,229,160,0.1)',
                            overflow: 'hidden',
                            background: 'var(--bg-2)',
                        }}
                    >
                        <img
                            src="/pic.jpg"
                            alt="Nabeel Ismail at his workstation"
                            fetchPriority="high"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
