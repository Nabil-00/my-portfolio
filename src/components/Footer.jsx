import React from 'react';
import { Github, Facebook, MessageCircle, Mail } from 'lucide-react';

// Custom TikTok icon
const TikTokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const Footer = () => {
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
        },
        {
            icon: <Mail size={20} />,
            href: "mailto:nabeelismailabdulkadir15@gmail.com",
            label: "Email"
        }
    ];

    return (
        <footer className="py-10 md:py-12 bg-surface-color mt-20 border-t border-white/5">
            <div className="container flex flex-col items-center gap-6">
                {/* Logo */}
                <a href="#" className="text-xl md:text-2xl font-bold hover:text-accent transition-colors duration-300">
                    <span className="text-accent">N</span>abeel
                </a>

                {/* Social Icons - Centered */}
                <div className="flex items-center justify-center gap-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="w-11 h-11 flex items-center justify-center rounded-full border border-accent/30 text-accent hover:bg-accent hover:text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p className="text-text-secondary text-sm text-center">
                    © {new Date().getFullYear()} Nabeel Ismail. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
