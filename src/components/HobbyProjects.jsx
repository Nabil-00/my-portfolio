import React from 'react';
import { Github, ExternalLink, Sparkles, Terminal, Swords, Heart } from 'lucide-react';
import siteContent from '../data/siteContent';

const projectIcons = {
    'gleam-automation': Terminal,
    'battlenet-live': Swords,
    'buddy': Heart,
};

const HobbyProjects = () => {
    const { hobbyProjects, sections } = siteContent;
    const { hobbyProjects: sectionMeta } = sections;

    if (!hobbyProjects || hobbyProjects.length === 0) return null;

    return (
        <section id="hobby-projects" className="section-bg py-section" aria-labelledby="hobby-heading">
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
                        {sectionMeta.eyebrow}
                    </p>
                    <h2
                        id="hobby-heading"
                        className="mt-3"
                        style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: 'var(--text-primary)',
                        }}
                    >
                        {sectionMeta.heading}
                    </h2>
                    <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                        {sectionMeta.subtext}
                    </p>
                </div>

                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {hobbyProjects.map((project) => {
                        const ProjectIcon = projectIcons[project.id] || Sparkles;

                        return (
                            <article
                                key={project.id}
                                className="hobby-card flex flex-col justify-between"
                                style={{
                                    background: 'var(--bg-3)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.35s ease',
                                }}
                            >
                                <div>
                                    {/* Visual frame */}
                                    <div
                                        style={{
                                            position: 'relative',
                                            aspectRatio: '16 / 9',
                                            background: '#07101a',
                                            borderBottom: '1px solid var(--border)',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {project.media ? (
                                            <img
                                                src={project.media}
                                                alt={`${project.title} screenshot`}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'top',
                                                    transition: 'transform 0.5s ease',
                                                }}
                                                className="hobby-card-img"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ProjectIcon size={44} style={{ color: 'var(--accent)', opacity: 0.8 }} />
                                            </div>
                                        )}

                                        {/* Badge */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                background: 'rgba(0, 0, 0, 0.75)',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-pill)',
                                                padding: '4px 12px',
                                                fontSize: '11px',
                                                fontWeight: 600,
                                                color: 'var(--accent)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <ProjectIcon size={12} />
                                            <span>{project.badge}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p
                                            style={{
                                                fontSize: '12px',
                                                color: 'var(--text-tertiary)',
                                                letterSpacing: '0.06em',
                                                textTransform: 'uppercase',
                                                fontFamily: 'monospace',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            {project.subtitle}
                                        </p>

                                        <h3
                                            style={{
                                                fontSize: '22px',
                                                fontWeight: 800,
                                                color: 'var(--text-primary)',
                                                letterSpacing: '-0.02em',
                                            }}
                                        >
                                            {project.title}
                                        </h3>

                                        <p
                                            className="mt-3"
                                            style={{
                                                fontSize: '14px',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.65,
                                            }}
                                        >
                                            {project.context}
                                        </p>

                                        {/* Fun fact callout */}
                                        {project.funFact && (
                                            <div
                                                className="mt-4 flex items-start gap-2.5"
                                                style={{
                                                    background: 'var(--bg-2)',
                                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    padding: '10px 12px',
                                                    fontSize: '12px',
                                                    color: 'var(--text-secondary)',
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                <Sparkles size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                                                <span>{project.funFact}</span>
                                            </div>
                                        )}

                                        {/* Tech stack */}
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    style={{
                                                        background: 'var(--bg-2)',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: 'var(--radius-pill)',
                                                        padding: '4px 10px',
                                                        fontSize: '11px',
                                                        color: 'var(--text-tertiary)',
                                                        fontFamily: 'monospace',
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div
                                    className="p-6 pt-0 mt-2 flex items-center justify-between gap-4"
                                    style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '16px' }}
                                >
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link inline-flex items-center gap-2"
                                            style={{ fontSize: '13px', fontWeight: 600 }}
                                        >
                                            <Github size={15} />
                                            <span>Open Repo</span>
                                            <ExternalLink size={13} style={{ opacity: 0.7 }} />
                                        </a>
                                    )}

                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link--secondary inline-flex items-center gap-1.5"
                                            style={{ fontSize: '13px' }}
                                        >
                                            <span>Live App</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HobbyProjects;
