import React from 'react';
import { ExternalLink, Play, BookOpen, Users, GraduationCap } from 'lucide-react';
import siteContent from '../data/siteContent';

const activityIcons = [BookOpen, GraduationCap, Users];

const TeachingSection = () => {
    const { meta, sections } = siteContent;
    const { teaching } = sections;

    return (
        <section id="teaching" className="section-bg-2 py-section">
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
                        {teaching.eyebrow}
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
                        {teaching.heading}
                    </h2>
                    <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                        {teaching.subtext}
                    </p>
                </div>

                <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
                    <div className="space-y-6">
                        {teaching.activities.map((activity, i) => {
                            const Icon = activityIcons[i] || BookOpen;
                            return (
                                <div
                                    key={activity.title}
                                    className="flex gap-4 items-start"
                                    style={{
                                        background: 'var(--bg-3)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        padding: '24px',
                                    }}
                                >
                                    <div
                                        className="flex-shrink-0 inline-flex items-center justify-center"
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
                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                            {activity.title}
                                        </h3>
                                        <p className="mt-1" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            {activity.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <article
                        style={{
                            background: 'var(--bg-3)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '28px',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src="/creator-photo.webp"
                                alt="Nabil Ismail"
                                loading="lazy"
                                width={52}
                                height={52}
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
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {teaching.tiktok.handle}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    {teaching.tiktok.label}
                                </p>
                            </div>
                        </div>
                        <div className="my-4" style={{ borderTop: '1px solid var(--border)' }} />

                        <div className="flex flex-wrap gap-2">
                            {teaching.tiktok.chips.map((chip) => (
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

                        <div className="mt-7">
                            <a
                                href={meta.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                <Play size={18} />
                                {teaching.tiktok.buttonLabel}
                                <ExternalLink size={16} />
                            </a>
                        </div>

                        <a
                            href={meta.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-5 block"
                            style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 600 }}
                        >
                            {teaching.tiktok.linkLabel}
                            <ExternalLink size={14} />
                        </a>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default TeachingSection;
