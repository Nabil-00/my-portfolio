import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import siteContent from '../data/siteContent';

const projectMarks = {
    mrtb: { letters: 'MRTB', label: 'Institutional system' },
    classify: { letters: 'CF', label: 'Custom monogram' },
    examflow: { letters: 'EF', label: 'Custom monogram' },
};

const ProjectVisual = ({ project }) => {
    const mark = projectMarks[project.id] || {
        letters: project.title.slice(0, 2).toUpperCase(),
        label: 'Project identity',
    };

    return (
        <div className={`project-stage project-stage--${project.id}`}>
            <div className="project-orbit" aria-hidden="true" />
            <div className="project-window">
                <div className="project-window-bar" aria-hidden="true">
                    <span /><span /><span />
                    <small>{project.id}.work</small>
                </div>
                <img
                    src={project.media}
                    alt={`${project.title} interface preview`}
                    width="1376"
                    height="768"
                    loading="lazy"
                />
            </div>
            <div className="project-mark" aria-label={`${project.title} identity`}>
                <strong>{mark.letters}</strong>
                <span>{mark.label}</span>
            </div>
            <span className="project-coordinate" aria-hidden="true">PRODUCT / SYSTEM / {project.id.toUpperCase()}</span>
        </div>
    );
};

const Projects = () => {
    const { projects, sections } = siteContent;
    const projectsSection = sections.projects;

    return (
        <section id="projects" className="project-story" aria-labelledby="selected-work-heading">
            {projects.map((project, index) => (
                <article
                    className="project-panel story-panel"
                    data-project={project.id}
                    key={project.id}
                    style={{ '--panel-order': index + 2 }}
                >
                    <div className="container project-panel-inner">
                        <header className="project-panel-header">
                            {index === 0 ? (
                                <div>
                                    <h2 id="selected-work-heading">Selected work</h2>
                                    <p>{projectsSection.subtext}</p>
                                </div>
                            ) : (
                                <p className="project-running-title">Selected work</p>
                            )}
                            <p className="project-count"><span>0{index + 1}</span> / 0{projects.length}</p>
                        </header>

                        <div className="project-layout">
                            <ProjectVisual project={project} />

                            <div className="project-copy">
                                <div className="project-meta">
                                    <span className="project-status-dot" aria-hidden="true" />
                                    <span>{project.developmentStatus}</span>
                                    <span aria-hidden="true">/</span>
                                    <span>{project.role}</span>
                                </div>

                                <h3>{project.title}</h3>
                                <p className="project-summary">{project.summary}</p>

                                <ul className="project-stack" aria-label="Technologies used">
                                    {project.stack?.map((tech) => <li key={tech}>{tech}</li>)}
                                </ul>

                                {(project.links?.live || project.links?.source) && (
                                    <div className="project-actions">
                                        {project.links.live && (
                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                                {projectsSection.liveLinkLabel}<ExternalLink size={15} />
                                            </a>
                                        )}
                                        {project.links.source && (
                                            <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="project-link project-link--secondary">
                                                {projectsSection.githubLinkLabel}<ArrowRight size={15} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default Projects;
