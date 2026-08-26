import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import HorizonHeroBackground from './components/ui/horizon-hero-background';
import GalaxyLoader from './components/GalaxyLoader';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);

    // Dynamically change browser tab favicon to match the active theme logo
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', theme === 'light' ? '/logo-dark.png' : '/logo-white.png');
      favicon.setAttribute('type', 'image/png');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Stagger reveal animations for section containers
    const targetSections = ['#about', '#projects', '#experience', '#contact'];

    targetSections.forEach((selector) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const elementsToAnimate = section.querySelectorAll(
        '.glass, h2, p, span.text-sm, .relative.pl-8'
      );

      gsap.fromTo(
        elementsToAnimate,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <>
      {/* Interactive Cursor overlay - globally rendered so it's visible in both loading intro and portfolio */}
      <CustomCursor />

      {!introFinished && (
        <GalaxyLoader onFinish={() => setIntroFinished(true)} />
      )}

      <div className={`transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden pointer-events-none'
        }`}>
        <div className="relative min-h-screen overflow-hidden font-sans isolate">
          {/* Global Background 3D Particles */}
            {introFinished && <HorizonHeroBackground theme={theme} />}

          {/* Navigation */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* Main Content Sections */}
          <main className="relative z-10 w-full max-w-7xl mx-auto px-0">
            <Hero theme={theme} introFinished={introFinished} />
            <About theme={theme} introFinished={introFinished} />
            <Projects theme={theme} />
            <Experience theme={theme} />
            <Contact />
          </main>

          {/* Footer */}
          <footer className="relative z-10 py-8 border-t border-white/5 bg-[#0a0a0f]/40 backdrop-blur-sm text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-display font-semibold tracking-wider text-gradient">
                SOLASCO.
              </span>
              <p>© {new Date().getFullYear()} Ephraim Jay A. Solasco. Built with React, Tailwind CSS, GSAP, and Three.js.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
