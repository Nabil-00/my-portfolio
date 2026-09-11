// Eager SSR-only entry for prerendering with React Router.
// Renders the full app for each route using StaticRouter.
import React from 'react';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import ClientsCarousel from './components/ClientsCarousel';
import TeachingSection from './components/TeachingSection';
import HobbyProjects from './components/HobbyProjects';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';

let postsData = []
try {
  postsData = JSON.parse(readFileSync(resolve('src/data/posts-full.json'), 'utf8'))
} catch {
  postsData = []
}

function HomePage() {
    return (
        <>
            <Hero />
            <Projects />
            <About />
            <Skills />
            <ClientsCarousel />
            <TeachingSection />
            <HobbyProjects />
            <FAQ />
            <Contact />
        </>
    );
}

// Wrapper that renders for a specific route
export function createPrerenderApp(url) {
    const PrerenderApp = () => (
        <StaticRouter location={url}>
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogList posts={postsData} />} />
                    <Route path="/blog/:slug" element={<BlogPost posts={postsData} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </main>
        </StaticRouter>
    );
    return PrerenderApp;
}

// Default export for backward compatibility (home page)
const PrerenderApp = () => (
    <StaticRouter location="/">
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
            Skip to content
        </a>
        <Navbar />
        <main id="main-content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogList posts={postsData} />} />
                <Route path="/blog/:slug" element={<BlogPost posts={postsData} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </main>
    </StaticRouter>
);

export default PrerenderApp;
