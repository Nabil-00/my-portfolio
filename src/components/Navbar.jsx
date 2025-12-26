import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Portfolio", href: "#projects" },
        { name: "Contact", href: "#contact" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
                <div className="container flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center hover:text-accent hover:scale-105 transition-all duration-300">
                        <span className="text-accent">N</span>abeel
                    </a>

                    {/* Desktop Menu & CTA */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        {/* Links */}
                        <div className="flex items-center gap-6 lg:gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="nav-link text-sm font-medium text-white/70 hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Download CV Button */}
                        <a
                            href="/Nabeel_Ismail_CV.pdf"
                            className="px-5 lg:px-6 py-2 bg-accent text-black text-sm font-bold rounded-full hover:bg-transparent hover:text-accent hover:border-2 hover:border-accent hover:scale-110 hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] transition-all duration-300 shadow-[0_4px_15px_rgba(0,255,136,0.3)] border-2 border-transparent"
                            download
                        >
                            Download CV
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="text-2xl font-bold text-white hover:text-accent transition-all duration-300 hover:scale-110"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Mobile Download CV Button */}
                    <a
                        href="/Nabeel_Ismail_CV.pdf"
                        onClick={handleLinkClick}
                        className="mt-8 px-8 py-3 bg-accent text-black text-sm font-bold rounded-full hover:bg-transparent hover:text-accent hover:border-2 hover:border-accent transition-all duration-300 shadow-[0_4px_15px_rgba(0,255,136,0.3)] border-2 border-transparent"
                        download
                    >
                        Download CV
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
