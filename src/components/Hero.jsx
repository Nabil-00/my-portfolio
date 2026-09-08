import React from 'react';
import { MessageCircle, Facebook, Github, Download, Music2 } from 'lucide-react';
import siteContent from '../data/siteContent';

const Hero = () => {
    const { meta, hero } = siteContent;

    const socialLinks = [
        { icon: <MessageCircle size={16} />, href: meta.whatsapp, label: meta.socialLabels.whatsapp },
        { icon: <Facebook size={16} />, href: meta.facebook, label: meta.socialLabels.facebook },
        { icon: <Music2 size={16} />, href: meta.tiktok, label: meta.socialLabels.tiktok },
        { icon: <Github size={16} />, href: meta.github, label: meta.socialLabels.github }
    ];

    return (
        <section
            id="home"
            className="hero-section story-panel relative overflow-hidden section-bg"
            style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(0,229,160,0.06) 0%, transparent 70%)' }}
            />

            <div className="container relative z-10 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-8 items-center py-12 md:py-20 w-full">
                <div className="order-1 lg:order-1 hero-text-entrance">
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
                            style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', backgroundColor: 'var(--accent)' }}
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
                        style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '480px' }}
                    >
                        {hero.bio}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a href="#contact" className="btn-primary">
                            <MessageCircle size={18} />
                            {hero.cta.primary}
                        </a>
                        <a href={meta.cvPath} download className="btn-secondary">
                            <Download size={18} />
                            {hero.cta.secondary}
                        </a>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="social-link inline-flex items-center justify-center"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="order-2 lg:order-2 flex justify-center hero-photo-entrance" style={{ position: 'sticky', top: '50%', transform: 'translateY(-50%)', alignSelf: 'start' }}>
                    <div
                        style={{
                            width: 'clamp(260px, 70vw, 520px)',
                            height: 'clamp(260px, 70vw, 520px)',
                            borderRadius: '50%',
                            border: '3px solid var(--accent)',
                            boxShadow: '0 0 60px var(--accent-glow), 0 0 120px rgba(0,229,160,0.1)',
                            overflow: 'hidden',
                            background: 'var(--bg-2)',
                        }}
                    >
                        <img
                            src="/pic.webp"
                            alt="Nabeel Ismail at his workstation"
                            fetchPriority="high"
                            width={520}
                            height={520}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
