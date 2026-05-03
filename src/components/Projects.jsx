import React from 'react';
import { ArrowRight, ExternalLink, Globe } from 'lucide-react';
import siteContent from '../data/siteContent';

const Projects = () => {
    const { projects, sections } = siteContent;
    const { projects: projectsSection } = sections;
    const [visibleCards, setVisibleCards] = React.useState({});
    const cardRefs = React.useRef([]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const index = Number(entry.target.getAttribute('data-index'));
                    setVisibleCards((prev) => ({ ...prev, [index]: true }));
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.15 }
        );

        cardRefs.current.forEach((card) => {
            if (card) {
                observer.observe(card);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" style={{ background: 'var(--bg-2)', padding: '120px 0' }}>
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
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: 'var(--text-primary)',
                        }}
                    >
                        {projectsSection.heading}
                    </h2>
                    <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                        {projectsSection.subtext}
                    </p>
                </div>

                <div className="mt-12">
                    {projects.map((project, index) => (
                        <article
                            key={project.id ?? index}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            data-index={index}
                            className="grid lg:grid-cols-2 gap-10 lg:gap-[60px] items-center"
                            style={{
                                marginBottom: '80px',
                                opacity: visibleCards[index] ? 1 : 0,
                                transform: visibleCards[index] ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'opacity 0.6s ease, transform 0.6s ease',
                                transitionDelay: `${index * 0.1}s`,
                            }}
                        >
                            <div className={index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}>
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16/10',
                                            objectFit: 'cover',
                                            objectPosition: 'top',
                                            borderRadius: 'var(--radius-md)',
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
                                            borderRadius: 'var(--radius-md)',
                                            aspectRatio: '16 / 10',
                                        }}
                                    >
                                        <Globe size={40} style={{ color: 'var(--border-hover)' }} />
                                        <p className="mt-3" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                            {project.title}
                                        </p>
                                        <p
                                            className="mt-2"
                                            style={{
                                                fontFamily: 'monospace',
                                                fontSize: '12px',
                                                color: 'var(--text-tertiary)',
                                            }}
                                        >
                                            {project.live || project.title}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className={index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}>
                                <p className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            backgroundColor: (project.status || '').toLowerCase().includes('maintenance')
                                                ? 'var(--yellow)'
                                                : 'var(--accent)',
                                        }}
                                    />
                                    {project.status?.toUpperCase() || projectsSection.fallbackStatus}
                                </p>

                                {project.collab && (
                                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                                        In collaboration with{' '}
                                        <a
                                            href={project.collab.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600, transition: 'opacity 0.2s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.opacity = '0.8';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.opacity = '1';
                                            }}
                                        >
                                            {project.collab.name}
                                        </a>
                                    </p>
                                )}

                                <h3
                                    className="mt-3"
                                    style={{
                                        fontSize: 'clamp(24px, 4vw, 36px)',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {project.title}
                                </h3>

                                <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {project.desc}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.tags?.map((tag) => (
                                        <span
                                            key={tag}
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
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center gap-5">
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'var(--text-primary)', fontWeight: 600, transition: 'color 0.2s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--accent)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--text-primary)';
                                            }}
                                            className="inline-flex items-center gap-1.5"
                                        >
                                            {projectsSection.liveLinkLabel}
                                            <ExternalLink size={14} />
                                        </a>
                                    )}

                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--text-primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                            }}
                                            className="inline-flex items-center gap-1.5"
                                        >
                                            {projectsSection.githubLinkLabel}
                                            <ArrowRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
