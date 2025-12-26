import React from 'react';

const Projects = () => {
    const projects = [
        {
            name: "Custom CMS",
            description: "A CMS for content creation and publishing.",
            status: "Live",
            linkLive: "",
            linkGithub: "https://github.com/Nabil-00/molten-nova-cms.git"
        },
        {
            name: "Organization Website + CMS Integration",
            description: "A connected site powered by the custom CMS.",
            status: "Live",
            linkLive: "https://www.galaltixnig.com",
            linkGithub: "https://github.com/Nabil-00/molten-nova-cms.git"
        },
        {
            name: "Portfolio Website",
            description: "This portfolio project demonstrating my skills.",
            status: "Live",
            linkLive: "#",
            linkGithub: "#"
        },
        {
            name: "E-commerce Platform",
            description: "Online store system with cart and order flow.",
            status: "Live",
            linkLive: "https://9jamart.co",
            linkGithub: "#"
        }
    ];

    return (
        <section id="projects" className="section bg-surface-color">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Projects</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card group">
                            <div className="p-6 md:p-8 text-center space-y-3 md:space-y-4">
                                <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{project.name}</h3>
                                <p className="text-text-secondary text-sm md:text-base">{project.description}</p>
                                <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-accent border border-accent/20">
                                    {project.status}
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="project-overlay bg-accent/20 backdrop-blur-md">
                                {project.linkLive && (
                                    <a
                                        href={project.linkLive}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="overlay-link border border-accent/50 hover:bg-accent hover:border-accent hover:text-black transition-all"
                                    >
                                        Visit Website
                                    </a>
                                )}

                                {project.linkGithub && project.linkGithub !== "#" && (
                                    <a
                                        href={project.linkGithub}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="overlay-link border border-accent/50 text-accent hover:bg-accent hover:border-accent hover:text-black transition-all"
                                    >
                                        View GitHub Repo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
