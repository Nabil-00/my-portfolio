import React from 'react';
import { Github, Facebook, Linkedin, MessageCircle, Mail, Music2 } from 'lucide-react';
import siteContent from '../data/siteContent';

const Footer = () => {
    const { meta, navigation, sections } = siteContent;
    const { footer } = sections;
    const firstName = meta.name.split(' ')[0];
    const socialLinks = [
        { icon: <MessageCircle size={20} />, href: meta.whatsapp, label: meta.socialLabels.whatsapp },
        { icon: <Facebook size={20} />, href: meta.facebook, label: meta.socialLabels.facebook },
        { icon: <Linkedin size={20} />, href: meta.linkedin, label: meta.socialLabels.linkedin },
        { icon: <Music2 size={20} />, href: meta.tiktok, label: meta.socialLabels.tiktok },
        { icon: <Github size={20} />, href: meta.github, label: meta.socialLabels.github },
        { icon: <Mail size={20} />, href: `mailto:${meta.email}`, label: meta.socialLabels.email },
    ];

    return (
        <footer style={{ background: 'var(--bg-2)', padding: '48px 0 24px', borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                    <a href="#home" className="text-xl font-extrabold text-white lg:justify-self-start justify-self-center">
                        <span style={{ color: 'var(--accent)' }}>{firstName[0]}</span>{firstName.slice(1)}
                    </a>

                    <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-5">
                        {navigation.map((link) => (
                            <a key={link.href} href={link.href} className="footer-nav-link">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center justify-center lg:justify-self-end gap-3">
                        {socialLinks.map((social, index) => (
                            social.href.startsWith('mailto:') ? (
                                <a key={index} href={social.href} aria-label={`Contact on ${social.label}`} className="footer-social-link inline-flex items-center justify-center">
                                    {social.icon}
                                </a>
                            ) : (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow on ${social.label}`} className="footer-social-link inline-flex items-center justify-center">
                                    {social.icon}
                                </a>
                            )
                        ))}
                    </div>
                </div>

                <div className="mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{footer.copyright}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{footer.builtWith}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
