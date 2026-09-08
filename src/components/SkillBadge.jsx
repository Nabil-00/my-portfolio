import { useEffect, useRef } from 'react';
import { Code2 } from 'lucide-react';

const SkillBadge = ({ item }) => {
    const badgeRef = useRef(null);

    useEffect(() => {
        const badge = badgeRef.current;

        if (!badge) return undefined;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const bounds = badge.getBoundingClientRect();
        const isAlreadyVisible = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;

        badge.classList.add('is-ready');

        if (prefersReducedMotion || isAlreadyVisible) {
            badge.classList.add('is-visible');
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    badge.classList.add('is-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.55 },
        );

        observer.observe(badge);
        return () => observer.disconnect();
    }, []);

    const className = [
        'skill-pill',
        'skill-pill--motion',
        item.url ? 'skill-pill-link' : '',
    ].filter(Boolean).join(' ');

    const content = (
        <>
            <span className="skill-pill-icon" aria-hidden="true">
                {item.icon ? (
                    <img src={item.icon} alt="" loading="lazy" />
                ) : (
                    <Code2 size={24} strokeWidth={1.7} />
                )}
            </span>
            <span className="skill-pill-label text-sm font-medium text-gray-300 whitespace-nowrap">
                {item.name}
            </span>
        </>
    );

    if (item.url) {
        return (
            <a ref={badgeRef} href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
            </a>
        );
    }

    return <span ref={badgeRef} className={className}>{content}</span>;
};

export default SkillBadge;
