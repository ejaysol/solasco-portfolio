import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'py-4 glass-nav shadow-lg shadow-brand-dark/20'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center select-none hover:opacity-85 active:scale-95 transition-all duration-200"
        >
          <img
            src={theme === 'light' ? '/logo-dark.png' : '/logo-white.png'}
            alt="SOLASCO"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-slate-300 hover:text-[#00f0ff] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#00f0ff] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 animate-[spin_20s_linear_infinite]" />
            ) : (
              <Moon className="w-4 h-4 transition-transform rotate-12 text-[#bd00ff]" />
            )}
          </button>

          <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
          
          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/ejaysol"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#bd00ff] hover:border-[#bd00ff]/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="GitHub Profile - ejaysol"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ephraim-jay-solasco-8b733124a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="LinkedIn Profile - Ephraim Jay Solasco"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#00f0ff] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 animate-[spin_20s_linear_infinite]" />
            ) : (
              <Moon className="w-4 h-4 transition-transform rotate-12 text-[#bd00ff]" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#00f0ff] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Smooth Animation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-50/98 dark:bg-[#0a0a0f]/98 backdrop-blur-xl border-b border-black/10 dark:border-white/5 py-6 px-8 flex flex-col space-y-4 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-slate-300 hover:text-[#00f0ff] transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
        <div className="h-px bg-black/5 dark:bg-white/5 my-2" />
        <div className="flex items-center space-x-4 py-2">
          <a
            href="https://github.com/ejaysol"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#bd00ff] hover:border-[#bd00ff]/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            aria-label="GitHub Profile - ejaysol"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/ephraim-jay-solasco-8b733124a/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
            aria-label="LinkedIn Profile - Ephraim Jay Solasco"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
