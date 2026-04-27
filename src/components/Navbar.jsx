import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import siteContent from '../data/siteContent';

const Navbar = () => {
    const { meta, hero, navigation } = siteContent;
    const firstName = meta.name.split(' ')[0];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const drawerRef = useRef(null);
    const closeButtonRef = useRef(null);
    const menuTriggerRef = useRef(null);
    const wasOpenRef = useRef(false);

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        if (wasOpenRef.current && !mobileMenuOpen) {
            menuTriggerRef.current?.focus();
        }
        wasOpenRef.current = mobileMenuOpen;

        if (!mobileMenuOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMobileMenuOpen(false);
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusable = drawerRef.current?.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable || focusable.length === 0) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <nav
                className="fixed inset-x-0 top-0"
                style={{
                    zIndex: 1000,
                    height: '64px',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid var(--border)',
                }}
            >
                <div className="container h-full flex items-center justify-between gap-4">
                    <a href="#home" className="text-xl font-extrabold tracking-tight text-white">
                        <span style={{ color: 'var(--accent)' }}>{firstName[0]}</span>{firstName.slice(1)}
                    </a>

                    <div className="hidden lg:flex items-center gap-6">
                        {navigation.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm"
                                style={{
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center">
                        <a
                            href={meta.cvPath}
                            download
                            style={{
                                background: 'var(--accent)',
                                color: '#000',
                                fontWeight: 700,
                                borderRadius: 'var(--radius-pill)',
                                padding: '8px 20px',
                            }}
                        >
                            {hero.cta.secondary}
                        </a>
                    </div>

                    <button
                        ref={menuTriggerRef}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="lg:hidden w-10 h-10 inline-flex items-center justify-center"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-drawer"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            <div
                className={`fixed inset-0 lg:hidden transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: 999, background: 'rgba(0,0,0,0.55)' }}
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden={!mobileMenuOpen}
            >
                <aside
                    id="mobile-drawer"
                    ref={drawerRef}
                    className={`absolute right-0 top-0 h-full w-[min(320px,85vw)] transition-transform duration-200 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{
                        background: 'var(--bg-2)',
                        borderLeft: '1px solid var(--border)',
                        backdropFilter: 'blur(20px)',
                    }}
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{meta.name}</p>
                        <button
                            ref={closeButtonRef}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-10 h-10 inline-flex items-center justify-center"
                            style={{ color: 'var(--text-primary)' }}
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-5 flex flex-col gap-2">
                        {navigation.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                className="px-3 py-3 rounded-lg text-base"
                                style={{ color: 'var(--text-secondary)', border: '1px solid transparent' }}
                            >
                                {link.label}
                            </a>
                        ))}

                        <a
                            href={meta.cvPath}
                            download
                            className="mt-2 text-center"
                            style={{
                                background: 'var(--accent)',
                                color: '#000',
                                fontWeight: 700,
                                borderRadius: 'var(--radius-pill)',
                                padding: '10px 20px',
                            }}
                        >
                            {hero.cta.secondary}
                        </a>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Navbar;
