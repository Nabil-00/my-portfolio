import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const ClientsCarousel = lazy(() => import('./components/ClientsCarousel'));
const TeachingSection = lazy(() => import('./components/TeachingSection'));
const HobbyProjects = lazy(() => import('./components/HobbyProjects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

class SectionErrorBoundary extends React.Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() {
        if (this.state.failed) {
            return <section className="container py-12"><p>Section failed to load. <button onClick={() => window.location.reload()}>Retry</button></p></section>;
        }
        return this.props.children;
    }
}

const BelowFoldFallback = () => (
    <div className="container py-12" aria-hidden="true" style={{ minHeight: '40vh' }} />
);

const App = () => {
    return (
        <>
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <div className="scroll-story">
                    <Hero />
                    <SectionErrorBoundary>
                        <Suspense fallback={<BelowFoldFallback />}>
                            <Projects />
                            <About />
                            <Skills />
                            <ClientsCarousel />
                            <TeachingSection />
                            <HobbyProjects />
                            <Contact />
                        </Suspense>
                    </SectionErrorBoundary>
                </div>
                <SectionErrorBoundary>
                    <Suspense fallback={null}>
                        <Footer />
                    </Suspense>
                </SectionErrorBoundary>
            </main>
        </>
    );
};

export default App;
