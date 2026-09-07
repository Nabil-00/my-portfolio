import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ExternalLink, Globe } from 'lucide-react';
import siteContent from '../data/siteContent';

const Projects = () => {
    const { projects, sections } = siteContent;
    const { projects: projectsSection } = sections;

    const [visibleCards, setVisibleCards] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const cardRefs = useRef([]);

    const [shouldAnimate] = useState(() =>
        typeof window !== 'undefined' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        'IntersectionObserver' in window
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        if (!shouldAnimate) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.getAttribute('data-id');
                    if (id) {
                        setVisibleCards((prev) => ({ ...prev, [id]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [shouldAnimate]);

    return (
        <>
            {/* Section header — snap section */}
            <div
                className="snap-panel section-bg-2"
                style={{
                    scrollSnapAlign: 'start',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
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
                            {projectsSection.eyebrow}
                        </p>
                        <h2
                            className="mt-3"
                            style={{
                                fontSize: 'clamp(40px, 6vw, 72px)',
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                                lineHeight: 1.1,
                            }}
                        >
                            {projectsSection.heading}
                        </h2>
                        <p className="mt-4" style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '500px' }}>
                            {projectsSection.subtext}
                        </p>
                    </div>
                </div>
            </div>

            {/* Project panels */}
            {projects.map((project, index) => {
                const isHidden = isMounted && shouldAnimate && !visibleCards[project.id];
                const isEven = index % 2 === 0;

                return (
                    <article
                        key={project.id}
                        ref={(el) => {
                            if (el && !cardRefs.current.includes(el)) {
                                cardRefs.current.push(el);
                            }
                        }}
                        data-id={project.id}
                        className="snap-panel"
                        style={{
                            scrollSnapAlign: 'start',
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            background: index % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)',
                            opacity: isHidden ? 0 : 1,
                            transform: isHidden ? 'translateY(30px)' : 'none',
                            transition: (isMounted && shouldAnimate) ? 'opacity 0.6s ease, transform 0.6s ease' : 'none',
                        }}
                    >
                        <div
                            className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12"
                            style={{ width: '100%' }}
                        >
                            {/* Image side */}
                            <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                                {project.media ? (
                                    <img
                                        src={project.media}
                                        alt={`${project.title} preview`}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16/10',
                                            objectFit: 'cover',
                                            objectPosition: 'top',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '1px solid var(--border)',
                                        }}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="w-full flex flex-col items-center justify-center text-center px-5"
                                        style={{
                                            background: 'var(--bg-3)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-lg)',
                                            aspectRatio: '16 / 10',
                                        }}
                                    >
                                        <Globe size={40} style={{ color: 'var(--border-hover)' }} />
                                        <p className="mt-3" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                            {project.title}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Text side */}
                            <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                                <div className="flex items-center gap-3">
                                    <p className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                backgroundColor: project.developmentStatus === 'Deployed' ? 'var(--accent)' : 'var(--blue)',
                                            }}
                                        />
                                        {project.developmentStatus}
                                    </p>
                                    {project.role && (
                                        <>
                                            <span style={{ color: 'var(--border)' }}>|</span>
                                            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{project.role}</span>
                                        </>
                                    )}
                                </div>

                                <h3
                                    className="mt-4"
                                    style={{
                                        fontSize: 'clamp(28px, 4vw, 44px)',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1.15,
                                    }}
                                >
                                    {project.title}
                                </h3>

                                <p className="mt-5" style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '480px' }}>
                                    {project.summary}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.stack?.map((tech) => (
                                        <span
                                            key={tech}
                                            style={{
                                                background: 'var(--bg-3)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-pill)',
                                                padding: '6px 16px',
                                                fontSize: '13px',
                                                color: 'var(--text-secondary)',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center gap-5">
                                    {project.links?.live && (
                                        <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            {projectsSection.liveLinkLabel}
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {project.links?.source && (
                                        <a
                                            href={project.links.source}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link project-link--secondary"
                                        >
                                            {projectsSection.githubLinkLabel}
                                            <ArrowRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </>
    );
};

export default Projects;
