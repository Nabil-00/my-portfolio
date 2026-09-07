import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ExternalLink, Globe } from 'lucide-react';
import siteContent from '../data/siteContent';

const Projects = () => {
    const { projects, sections } = siteContent;
    const { projects: projectsSection } = sections;
    
    const featuredProjects = projects.filter(p => p.featured);
    const secondaryProjects = projects.filter(p => !p.featured);

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

    const renderMedia = (project) => {
        if (project.media) {
            return (
                <img
                    src={project.media}
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
            );
        }
        
        return (
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
                    {project.links?.live || project.title}
                </p>
            </div>
        );
    };

    const renderCard = (project, index, isFeatured) => {
        const isHidden = isMounted && shouldAnimate && !visibleCards[project.id];
        
        return (
            <article
                key={project.id}
                ref={(el) => {
                    if (el && !cardRefs.current.includes(el)) {
                        cardRefs.current.push(el);
                    }
                }}
                data-id={project.id}
                className={isFeatured ? "grid lg:grid-cols-2 gap-10 lg:gap-[60px] items-center" : "flex flex-col gap-6"}
                style={{
                    marginBottom: isFeatured ? '80px' : '0',
                    opacity: isHidden ? 0 : 1,
                    transform: isHidden ? 'translateY(30px)' : 'none',
                    transition: (isMounted && shouldAnimate) ? 'opacity 0.6s ease, transform 0.6s ease' : 'none'
                }}
            >
                <div className={isFeatured ? (index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2') : ''}>
                    {renderMedia(project)}
                </div>

                <div className={isFeatured ? (index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1') : 'flex flex-col flex-1'}>
                    <div className="flex items-center gap-3">
                        <p className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            <span
                                aria-hidden="true"
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    backgroundColor: project.developmentStatus === 'Deployed' ? 'var(--accent)' : 'var(--blue)'
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
                        className="mt-3"
                        style={{
                            fontSize: isFeatured ? 'clamp(24px, 4vw, 36px)' : 'clamp(20px, 3vw, 28px)',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {project.title}
                    </h3>

                    <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {project.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
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

                    <div className="mt-6 flex items-center gap-5 mt-auto pt-2">
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
            </article>
        );
    };

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
                    {featuredProjects.map((project, index) => renderCard(project, index, true))}
                </div>

                {secondaryProjects.length > 0 && (
                    <div className="mt-16 grid md:grid-cols-2 gap-10">
                        {secondaryProjects.map((project, index) => renderCard(project, index, false))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
