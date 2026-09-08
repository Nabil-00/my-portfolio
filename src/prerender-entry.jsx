// Eager SSR-only entry for prerendering.
// Mirrors src/App.jsx's DOM exactly (same order, same landmarks), but with
// static imports instead of React.lazy so legacy renderToString emits the full
// page HTML — no Suspense fallbacks, no hidden streaming payloads.
// Client bundle (src/main.jsx -> src/App.jsx) stays code-split; this module is
// only ever imported by scripts/prerender.mjs. Keep the two trees in sync.
// NOTE: Footer lives inside <main> here to match App.jsx (single Footer).
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import ClientsCarousel from './components/ClientsCarousel';
import TeachingSection from './components/TeachingSection';
import HobbyProjects from './components/HobbyProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const PrerenderApp = () => {
    return (
        <>
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <div className="scroll-story">
                    <Hero />
                    <Projects />
                    <About />
                    <Skills />
                    <ClientsCarousel />
                    <TeachingSection />
                    <HobbyProjects />
                    <Contact />
                </div>
                <Footer />
            </main>
        </>
    );
};

export default PrerenderApp;
