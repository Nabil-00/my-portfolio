import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import ClientsCarousel from './components/ClientsCarousel';
import TeachingSection from './components/TeachingSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollSnapContainer from './components/ScrollSnapContainer';

const App = () => {
    return (
        <>
            <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
                Skip to content
            </a>
            <Navbar />
            <main id="main-content">
                <ScrollSnapContainer>
                    <Hero />
                    <Projects />
                </ScrollSnapContainer>
                <About />
                <Skills />
                <ClientsCarousel />
                <TeachingSection />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default App;
