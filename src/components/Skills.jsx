import React from 'react';
import siteContent from '../data/siteContent';

const Skills = () => {
    const { skills, sections } = siteContent;
    const { skills: skillsSection } = sections;
    const groupedSkills = Object.entries(skills);

    return (
        <section id="skills" style={{ background: 'var(--bg)', padding: '120px 0' }}>
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

                <div className="mt-10 grid md:grid-cols-2 gap-10">
                    {groupedSkills.map(([group, items]) => (
                        <div key={group}>
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: 'var(--text-tertiary)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                }}
                            >
                                {group}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <span
                                        key={item}
                                        style={{
                                            background: 'var(--bg-3)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-pill)',
                                            padding: '6px 16px',
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)',
                                            fontFamily: 'monospace',
                                            transition: 'all 0.15s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--accent)';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
