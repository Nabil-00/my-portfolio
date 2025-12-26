import React from 'react';
import { MessageCircle, Mail, Github, ArrowRight } from 'lucide-react';

const Contact = () => {
    const contactLinks = [
        {
            icon: <MessageCircle size={22} />,
            label: "WhatsApp",
            description: "Chat with me",
            href: "https://wa.me/2349136159701?text=Hi%20Nabeel,%20I%20just%20viewed%20your%20portfolio%20and%20I%E2%80%99d%20like%20to%20work%20with%20you",
            color: "from-green-500 to-green-600"
        },
        {
            icon: <Mail size={22} />,
            label: "Email",
            description: "Drop me a line",
            href: "mailto:nabeelismailabdulkadir15@gmail.com",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: <Github size={22} />,
            label: "GitHub",
            description: "See my code",
            href: "https://github.com/Nabil-00",
            color: "from-purple-500 to-purple-600"
        }
    ];

    return (
        <section id="contact" className="section">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Let's <span className="text-accent">Connect</span>
                    </h2>
                    <p className="text-text-secondary text-lg md:text-xl max-w-md mx-auto">
                        Ready to start a project? Let's make something amazing together.
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {contactLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-2xl bg-surface-color border border-white/5 p-6 md:p-8 text-center transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(0,255,136,0.15)] hover:-translate-y-2"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                            {/* Icon Container */}
                            <div className="relative mb-4 mx-auto w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]">
                                {link.icon}
                            </div>

                            {/* Text Content */}
                            <h3 className="relative text-lg font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                                {link.label}
                            </h3>

                            {/* Arrow Indicator */}
                            <div className="relative flex items-center justify-center gap-1 text-accent text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <span>Get in touch</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </a>
                    ))}
                </div>

                {/* Email Display */}
                <div className="mt-12 text-center">
                    <p className="text-text-secondary text-sm mb-2">Or reach out directly</p>
                    <a
                        href="mailto:nabeelismailabdulkadir15@gmail.com"
                        className="text-accent hover:text-white transition-colors duration-300 text-lg font-medium"
                    >
                        nabeelismailabdulkadir15@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
