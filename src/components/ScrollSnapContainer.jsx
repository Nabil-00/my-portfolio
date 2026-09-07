import React, { useState, useEffect } from 'react';

const ScrollSnapContainer = ({ children }) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDesktop(mediaQuery.matches);
        setPrefersReducedMotion(motionQuery.matches);

        const handleResize = (e) => setIsDesktop(e.matches);
        const handleMotion = (e) => setPrefersReducedMotion(e.matches);
        
        mediaQuery.addEventListener('change', handleResize);
        motionQuery.addEventListener('change', handleMotion);
        
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
            motionQuery.removeEventListener('change', handleMotion);
        };
    }, []);

    const shouldSnap = isDesktop && !prefersReducedMotion;

    return (
        <div
            id="scroll-snap-container"
            style={shouldSnap ? {
                height: '100vh',
                overflowY: 'auto',
                scrollSnapType: 'y mandatory',
                scrollBehavior: 'smooth',
            } : undefined}
        >
            {children}
        </div>
    );
};

export default ScrollSnapContainer;
