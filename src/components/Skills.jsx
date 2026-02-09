import React from 'react';

// Helper component for counting up numbers
const CountUp = ({ end, duration = 2000, trigger }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!trigger) {
            setCount(0);
            return;
        }

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;

            // Ease out quart
            const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

            if (progress < duration) {
                const nextCount = Math.min(end, Math.ceil(easeOutQuart(progress / duration) * end));
                setCount(nextCount);
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, trigger]);

    return <>{count}</>;
};

const Skills = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle visibility based on intersection state
                // This ensures it animates every time it scrolls into view
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); // Reset when out of view to re-animate
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

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
        <section id="skills" ref={sectionRef} className="section bg-surface-color">
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
                                <span className="text-accent font-bold text-xs md:text-sm flex">
                                    <CountUp end={skill.level} trigger={isVisible} />%
                                </span>
                            </div>
                            <div className="h-3 md:h-4 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,136,0.5)] transition-all ease-out"
                                    style={{
                                        width: isVisible ? `${skill.level}%` : '0%',
                                        transitionDuration: '1500ms' // Match the approximate duration of the count up
                                    }}
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
