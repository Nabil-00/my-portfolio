import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import postsData from './data/posts.json';

const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const ClientsCarousel = lazy(() => import('./components/ClientsCarousel'));
const TeachingSection = lazy(() => import('./components/TeachingSection'));
const HobbyProjects = lazy(() => import('./components/HobbyProjects'));
const Contact = lazy(() => import('./components/Contact'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const BlogList = lazy(() => import('./components/BlogList'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const BlogTeaser = lazy(() => import('./components/BlogTeaser'));
const NotFound = lazy(() => import('./components/NotFound'));

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

function HomePage() {
    return (
        <>
            <Hero />
            <SectionErrorBoundary>
                <Suspense fallback={<BelowFoldFallback />}>
                    <Projects />
                    <About />
                    <Skills />
                    <ClientsCarousel />
                    <TeachingSection />
                    <HobbyProjects />
                    <BlogTeaser posts={postsData} />
                    <FAQ />
                    <Contact />
                </Suspense>
            </SectionErrorBoundary>
        </>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App = () => {
    return (
        <>
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={
                        <Suspense fallback={<BelowFoldFallback />}>
                            <BlogList posts={postsData} />
                        </Suspense>
                    } />
                    <Route path="/blog/:slug" element={
                        <Suspense fallback={<BelowFoldFallback />}>
                            <BlogPost posts={postsData} />
                        </Suspense>
                    } />
                    <Route path="*" element={
                        <Suspense fallback={<BelowFoldFallback />}>
                            <NotFound />
                        </Suspense>
                    } />
                </Routes>
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
