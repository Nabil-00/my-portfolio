import React from 'react';

const Skills = () => {
    const skills = [
        { name: "HTML & CSS", level: 89 },
        { name: "PHP & MySQL", level: 67 },
        { name: "Graphics Design", level: 93 },
        { name: "Node + Express", level: 45 },
        { name: "CMS Development", level: 89 },
        { name: "Webapp Security", level: 58 },
        { name: "Linux", level: 49 }
    ];

    return (
        <section id="skills" className="section bg-surface-color">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 md:mb-16">
                    My <span className="text-accent">Skills</span>
                </h2>

                <div className="max-w-3xl mx-auto space-y-5 md:space-y-8">
                    {skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold tracking-wide uppercase text-xs md:text-sm">
                                    {skill.name}
                                </span>
                                <span className="text-accent font-bold text-xs md:text-sm">
                                    {skill.level}%
                                </span>
                            </div>
                            <div className="h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,136,0.5)] transition-all duration-1000 ease-out"
                                    style={{ width: `${skill.level}%` }}
                                >
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
