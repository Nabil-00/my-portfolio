import React from 'react';

const About = () => {
    return (
        <section id="about" className="section bg-black relative">
            <div className="container">

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
                    About <span className="text-accent">Me</span>
                </h2>

                {/* Two Column Layout: Image Left, Text Right */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Left - Image */}
                    <div className="flex justify-center">
                        <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[320px] md:h-[420px] lg:w-[350px] lg:h-[450px]">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-[40px] md:blur-[60px]"></div>

                            {/* Image Container */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-accent/30 shadow-[0_0_30px_rgba(0,255,136,0.2)] md:shadow-[0_0_40px_rgba(0,255,136,0.2)]">
                                <img
                                    src="/newpic.jpg"
                                    alt="Nabeel Ismail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right - Text Content */}
                    <div className="space-y-4 md:space-y-6 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-white">Full-stack Web Developer</h3>
                        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                            I'm a Computer Science student with hands-on experience building CMS platforms, e-commerce systems, and organization websites. I combine design, development, and IT problem-solving to create real-world solutions.
                        </p>
                        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                            My passion lies in full-stack development, ensuring that every layer of the application is optimized for performance and user experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
