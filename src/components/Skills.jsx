import React from 'react';
import siteContent from '../data/siteContent';

const Skills = () => {
    const { skills, sections } = siteContent;
    const { skills: skillsSection } = sections;
    const groupedSkills = Object.entries(skills);

    return (
        <section id="skills" className="section-bg py-section">
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
                        {skillsSection.eyebrow}
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
                        {skillsSection.heading}
                    </h2>
                    <p className="mt-4" style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                        {skillsSection.subtext}
                    </p>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-10">
                    {groupedSkills.map(([group, items]) => (
                        <div key={group}>
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: 'var(--text-tertiary)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginBottom: '14px',
                                    fontWeight: 700,
                                }}
                            >
                                {group}
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {items.map((item) => {
                                    const content = (
                                        <>
                                            {item.icon && (
                                                <img 
                                                    src={item.icon} 
                                                    alt={`${item.name} logo`} 
                                                    style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                                                    loading="lazy"
                                                />
                                            )}
                                            {item.name}
                                        </>
                                    );

                                    if (item.url) {
                                        return (
                                            <a
                                                key={item.name}
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="skill-pill skill-pill-link"
                                            >
                                                {content}
                                            </a>
                                        );
                                    }

                                    return (
                                        <span key={item.name} className="skill-pill">
                                            {content}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
