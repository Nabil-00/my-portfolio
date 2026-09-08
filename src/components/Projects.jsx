import React from 'react';
import { ArrowDown, ArrowRight, ExternalLink } from 'lucide-react';
import siteContent from '../data/siteContent';

const projectMarks = {
    mrtb: { letters: 'MRTB', label: 'Institutional system' },
    classify: { letters: 'CF', label: 'Custom monogram' },
    examflow: { letters: 'EF', label: 'Custom monogram' },
};

const architectureBlueprints = {
    mrtb: {
        title: 'Operations control plane',
        layers: [
            { label: 'Surfaces', nodes: ['Staff portal', 'Approvals', 'Field attendance'] },
            { label: 'Services', nodes: ['Identity + RBAC', 'Workflow engine', 'Document checks'] },
            { label: 'Trust', nodes: ['PostgreSQL', 'Audit trail', 'Geofence rules'] },
        ],
    },
    classify: {
        title: 'Attendance intelligence',
        layers: [
            { label: 'Surfaces', nodes: ['Web console', 'Flutter mobile', 'AI attendance'] },
            { label: 'Services', nodes: ['Session service', 'Risk scoring', 'Realtime API'] },
            { label: 'Trust', nodes: ['PostgreSQL', 'Model gateway', 'Signed events'] },
        ],
    },
    examflow: {
        title: 'Assessment workflow',
        layers: [
            { label: 'Surfaces', nodes: ['Exam authoring', 'Review workspace', 'Results portal'] },
            { label: 'Services', nodes: ['LLM orchestration', 'Grading assistant', 'Access control'] },
            { label: 'Trust', nodes: ['Prompt + version log', 'Encrypted store', 'Audit events'] },
        ],
    },
};

const ArchitectureVisual = ({ project }) => {
    const blueprint = architectureBlueprints[project.id];

    return (
        <div
            className={`architecture-canvas architecture-canvas--${project.id}`}
            role="img"
            aria-label={`${project.title} conceptual system architecture: ${blueprint.layers.map((layer) => `${layer.label}: ${layer.nodes.join(', ')}`).join('; ')}`}
        >
            <div className="architecture-head">
                <span className="architecture-safe-label">Safe system view</span>
                <span>Conceptual / 0{project.id === 'mrtb' ? 1 : project.id === 'classify' ? 2 : 3}</span>
            </div>
            <h4>{blueprint.title}</h4>
            <div className="architecture-flow">
                {blueprint.layers.map((layer, layerIndex) => (
                    <div className="architecture-layer" key={layer.label}>
                        <span className="architecture-layer-label">{layer.label}</span>
                        <div className="architecture-nodes">
                            {layer.nodes.map((node) => (
                                <span className="architecture-node" key={node}>
                                    <span className="architecture-node-dot" aria-hidden="true" />
                                    {node}
                                </span>
                            ))}
                        </div>
                        {layerIndex < blueprint.layers.length - 1 && <ArrowDown className="architecture-arrow" size={16} aria-hidden="true" />}
                    </div>
                ))}
            </div>
            <div className="architecture-foot">
                <span>Inputs are abstracted for privacy</span>
                <span className="architecture-status"><span aria-hidden="true" /> Publish-safe</span>
            </div>
        </div>
    );
};

const ProjectVisual = ({ project }) => {
    const mark = projectMarks[project.id] || {
        letters: project.title.slice(0, 2).toUpperCase(),
        label: 'Project identity',
    };

    return (
        <div className={`project-stage project-stage--${project.id}`}>
            <div className="project-orbit" aria-hidden="true" />
            <ArchitectureVisual project={project} />
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
