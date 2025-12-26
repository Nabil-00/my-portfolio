import React, { useState, useEffect } from 'react';
import { MessageCircle, Facebook, Github } from 'lucide-react';

// Custom TikTok icon since lucide-react doesn't have one
const TikTokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Computer Science Student';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const socialLinks = [
        {
            icon: <MessageCircle size={20} />,
            href: "https://wa.me/2349136159701?text=Hi%20Nabeel,%20I%20just%20viewed%20your%20portfolio%20and%20I%E2%80%99d%20like%20to%20work%20with%20you",
            label: "WhatsApp"
        },
        {
            icon: <Facebook size={20} />,
            href: "https://www.facebook.com/nabil.ismail.5855",
            label: "Facebook"
        },
        {
            icon: <TikTokIcon size={20} />,
            href: "https://www.tiktok.com/i_nabeel_?_r=1&_t=ZS-92YGfy4oydl",
            label: "TikTok"
        },
        {
            icon: <Github size={20} />,
            href: "https://github.com/Nabil-00",
            label: "GitHub"
        }
    ];

    return (
        <section id="home" className="hero-section min-h-screen flex items-center pt-24 pb-12 md:pt-20 relative overflow-hidden">
            <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Left Column - Text Content */}
                <div className="space-y-5 md:space-y-6 animate-fade-in-left order-2 md:order-1 text-center md:text-left">
                    <span className="text-white text-xs md:text-sm font-bold tracking-widest block">HELLO!</span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        I'm <span className="text-accent">Nabeel Ismail</span>
                    </h1>

                    <h2 className="text-lg md:text-xl text-accent font-medium">
                        Problem solver | <span className="typewriter">{displayText}</span><span className="animate-blink">|</span>
                    </h2>

                    <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed mx-auto md:mx-0">
                        I build web systems that fix real business problems: faster workflows, cleaner dashboards, and smoother customer experiences.
                    </p>

                    <div className="pt-2 md:pt-4 flex flex-col items-center md:items-start gap-6 md:gap-8">
                        {/* CTA Button */}
                        <a href="#contact" className="w-44 py-3 bg-accent text-black text-center font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:scale-105 transition-all duration-300">
                            Let's talk
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-3 md:gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-11 h-11 md:w-10 md:h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-black hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Portrait */}
                <div className="relative flex justify-center items-center order-1 md:order-2">
                    <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                        {/* Glow Ring */}
                        <div className="absolute inset-0 rounded-full bg-accent/20 blur-[80px] md:blur-[100px] animate-pulse"></div>
                        <div className="absolute inset-3 md:inset-4 rounded-full border-2 border-accent/20"></div>

                        {/* Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-3 md:border-4 border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)] md:shadow-[0_0_50px_rgba(0,255,136,0.3)]">
                            <img
                                src="/pic.jpg"
                                alt="Nabeel Ismail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
