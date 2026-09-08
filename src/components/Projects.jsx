import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import siteContent from '../data/siteContent';
import ProjectArtwork from './ProjectArtwork';

const projectDetails = {
    mrtb: ['Approval workflows', 'Document verification', 'Geofenced attendance', 'Performance tracking'],
    classify: ['Web and mobile', 'Classroom sessions', 'AI-assisted insight', 'Realtime services'],
    examflow: ['Question generation', 'Human review', 'Grading assistance', 'Secure exam data'],
};

const Projects = () => {
    const { projects, sections } = siteContent;
    const projectsSection = sections.projects;

    return (
        <section id="projects" className="project-story" aria-labelledby="selected-work-heading">
            <header className="container project-intro">
                <h2 id="selected-work-heading">Selected work</h2>
                <p>{projectsSection.subtext}</p>
            </header>

            <div className="project-list">
                {projects.map((project, index) => (
                    <article
                        className={`container project-feature ${index % 2 === 1 ? 'project-feature--reverse' : ''}`}
                        data-project={project.id}
                        key={project.id}
                    >
                        <div className="project-artwork">
                            <ProjectArtwork project={project} />
                        </div>

                        <div className="project-copy">
                            <p className="project-meta">
                                <span className="project-status-dot" aria-hidden="true" />
                                <span>{project.developmentStatus}</span>
                                <span aria-hidden="true">/</span>
                                <span>{project.role}</span>
                            </p>

                            <h3>{project.title}</h3>
                            <p className="project-summary">{project.summary}</p>

                            <ul className="project-capabilities" aria-label={`${project.title} capabilities`}>
                                {projectDetails[project.id]?.map((detail) => <li key={detail}>{detail}</li>)}
                            </ul>

                            <p className="project-stack" aria-label="Technologies used">
                                {project.stack?.map((tech, techIndex) => (
                                    <React.Fragment key={tech}>
                                        <span>{tech}</span>
                                        {techIndex < project.stack.length - 1 && <span aria-hidden="true">/</span>}
                                    </React.Fragment>
                                ))}
                            </p>

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
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Projects;
