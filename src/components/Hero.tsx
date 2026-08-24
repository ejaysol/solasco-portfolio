import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { BlackHoleHeroSection } from '@/components/ui/blackhole-hero-section';

interface HeroProps {
  theme: 'dark' | 'light';
}

function useNarrow(query = '(max-width: 767px)') {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener('change', sync);
    return () => m.removeEventListener('change', sync);
  }, [query]);
  return narrow;
}

const ROLES = [
  'Front-end Developer',
  'UI/UX Designer',
  'Creative Technologist',
];

export default function Hero({ theme }: HeroProps) {
  const narrow = useNarrow();
  const isLight = theme === 'light';
  const bgContainerRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const [focus, setFocus] = useState<[number, number]>(narrow ? [0.5, 0.65] : [0.75, 0.42]);

  // Dynamic Typewriter State for Animated Hero Role
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 75);
      } else {
        // Pause at complete word before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // GSAP Staggered Entrance Animation for Hero Text
  useEffect(() => {
    if (!heroContentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  // Dynamically compute geometric center of avatar within extended background canvas
  useEffect(() => {
    const updateFocus = () => {
      if (!bgContainerRef.current || !avatarRef.current) return;
      const bgRect = bgContainerRef.current.getBoundingClientRect();
      const avatarRect = avatarRef.current.getBoundingClientRect();

      if (bgRect.width > 0 && bgRect.height > 0) {
        const centerX = (avatarRect.left + avatarRect.width / 2 - bgRect.left) / bgRect.width;
        const centerY = (avatarRect.top + avatarRect.height / 2 - bgRect.top) / bgRect.height;
        setFocus([
          Math.max(0.01, Math.min(0.99, centerX)),
          Math.max(0.01, Math.min(0.99, centerY)),
        ]);
      }
    };

    updateFocus();
    const t1 = setTimeout(updateFocus, 50);
    const t2 = setTimeout(updateFocus, 300);
    window.addEventListener('resize', updateFocus);
    window.addEventListener('scroll', updateFocus, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateFocus);
      window.removeEventListener('scroll', updateFocus);
    };
  }, [narrow]);

  // Relativistic accretion disk colors tailored to theme
  const hotColor = isLight ? '#0284c7' : '#FFF3DE';
  const midColor = isLight ? '#0088cc' : '#00f0ff';
  const coolColor = isLight ? '#8800cc' : '#bd00ff';

  const techBadges = [
    'React & Next.js',
    'Three.js & 3D Web',
    'TypeScript',
    'Tailwind CSS',
    'UI/UX Design',
  ];

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center pt-24 pb-20 md:pt-28 md:pb-24 overflow-visible bg-transparent transition-colors duration-300"
    >
      {/* 
        Overlapping Black Hole Background Canvas 
        Extends past the hero into the next section (135% height) to create a continuous cosmic backdrop
      */}
      <div
        ref={bgContainerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[135%] min-h-[900px] pointer-events-none -z-10 overflow-visible"
      >
        <BlackHoleHeroSection
          focus={focus}
          scrim="none"
          vignette={0}
          distance={24}
          elevation={narrow ? -6 : -4.5}
          fov={narrow ? 54 : 40}
          glow={isLight ? 1.4 : (narrow ? 0.9 : 1.3)}
          steps={narrow ? 110 : 280}
          resolution={narrow ? 0.5 : 0.72}
          maxDpr={narrow ? 1.15 : 1.5}
          hotColor={hotColor}
          midColor={midColor}
          coolColor={coolColor}
          className="w-full h-full"
        />
      </div>

      {/* Hero Content Grid */}
      <div
        ref={heroContentRef}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 relative"
      >
        {/* Hero Left Content: Structured & Animated Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">

          {/* Status Badge */}
          <div
            className={`hero-anim-item inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full w-max backdrop-blur-md shadow-sm border transition-colors duration-300 ${isLight
                ? 'bg-slate-900/5 border-slate-900/10 text-slate-700'
                : 'bg-white/5 border-white/10 text-slate-300'
              }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${isLight
                  ? 'bg-[#0088cc] shadow-[0_0_10px_#0088cc]'
                  : 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]'
                }`}
            />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Open to Opportunities & Collaborations
            </span>
          </div>

          {/* Main Title & Animated Name */}
          <div className="space-y-2">
            <span
              className={`hero-anim-item text-base sm:text-lg font-medium block transition-colors duration-300 ${isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
            >
              Hello, I am
            </span>

            {/* Shimmering Cosmic Name Heading */}
            <h1 className="hero-anim-item text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight">
              <span
                className={`text-transparent bg-clip-text animate-text-shimmer bg-gradient-to-r ${isLight
                    ? 'from-slate-950 via-[#0088cc] via-[#8800cc] to-slate-900'
                    : 'from-white via-[#00f0ff] via-[#bd00ff] to-white'
                  }`}
              >
                Ephraim Jay Solasco
              </span>
            </h1>

            {/* Animated Rotating Role Title with Caret */}
            <div className="hero-anim-item pt-1">
              <h2
                className={`text-xl sm:text-2xl lg:text-3xl font-bold font-display inline-flex items-center flex-wrap gap-2 transition-colors duration-300 min-h-[2.4rem] ${isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}
              >
                <span className="text-slate-400 font-light">I'm a</span>
                <span
                  className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${isLight
                      ? 'from-[#0088cc] to-[#8800cc]'
                      : 'from-[#00f0ff] to-[#bd00ff]'
                    }`}
                >
                  {currentText}
                </span>
                {/* Glowing Blinking Cursor Caret */}
                <span
                  className={`inline-block w-0.5 h-6 sm:h-8 ml-0.5 animate-pulse rounded-full ${isLight ? 'bg-[#0088cc]' : 'bg-[#00f0ff]'
                    }`}
                />
              </h2>
            </div>
          </div>

          {/* Bio / Value Statement */}
          <p
            className={`hero-anim-item text-base sm:text-lg max-w-xl font-normal leading-relaxed transition-colors duration-300 ${isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
          >
            I craft immersive, high-performance web applications and intuitive digital experiences.
            Blending cutting-edge 3D visuals with clean code architecture to bring creative ideas to life.
          </p>

          {/* Tech Highlights Badges */}
          <div className="hero-anim-item flex flex-wrap gap-2 pt-1">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className={`text-xs font-medium px-3 py-1 rounded-lg backdrop-blur-sm border transition-all duration-200 hover:-translate-y-0.5 ${isLight
                    ? 'bg-slate-900/5 border-slate-900/10 text-slate-700 hover:border-[#0088cc]/50 hover:text-slate-950'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-[#00f0ff]/50 hover:text-white'
                  }`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action Buttons & Social Links */}
          <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className={`inline-flex items-center space-x-2 font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${isLight
                  ? 'bg-gradient-to-r from-[#0088cc] to-[#8800cc] text-white shadow-[0_0_20px_rgba(0,136,204,0.35)] hover:shadow-[0_0_30px_rgba(0,136,204,0.5)]'
                  : 'bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]'
                }`}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className={`inline-flex items-center space-x-2 px-6 py-3.5 rounded-full font-medium transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 cursor-pointer border ${isLight
                  ? 'bg-slate-900/5 hover:bg-slate-900/10 border-slate-900/10 text-slate-800 hover:text-slate-950'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:text-white'
                }`}
            >
              <Mail className={`w-4 h-4 ${isLight ? 'text-[#0088cc]' : 'text-[#00f0ff]'}`} />
              <span>Get in Touch</span>
            </a>

            {/* Quick Social Icons */}
            <div className="flex items-center space-x-2.5 pl-2">
              <a
                href="https://github.com/ejaysol"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full border transition-all duration-200 hover:scale-110 ${isLight
                    ? 'bg-slate-900/5 border-slate-900/10 text-slate-700 hover:text-slate-950 hover:border-[#0088cc]/50'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-[#00f0ff]/50'
                  }`}
                aria-label="GitHub - ejaysol (Ephraim Jay A. Solasco)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ephraim-jay-solasco-8b733124a/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full border transition-all duration-200 hover:scale-110 ${isLight
                    ? 'bg-slate-900/5 border-slate-900/10 text-slate-700 hover:text-[#0088cc] hover:border-[#0088cc]/50'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50'
                  }`}
                aria-label="LinkedIn - Ephraim Jay Solasco"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Hero Right Column: Profile Picture centered inside Black Hole with Floating Animation */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div
            ref={avatarRef}
            className="relative group w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center pointer-events-auto animate-float-slow"
          >
            {/* Ambient Cosmic Background Glow behind Avatar */}
            <div
              className={`absolute -inset-4 rounded-full blur-2xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isLight
                  ? 'bg-gradient-to-r from-[#0088cc]/20 to-[#8800cc]/20'
                  : 'bg-gradient-to-r from-[#00f0ff]/30 to-[#bd00ff]/30'
                }`}
            />

            {/* Orbiting Celestial Dashed Rings */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed animate-[spin_40s_linear_infinite] group-hover:scale-105 transition-transform duration-500 pointer-events-none ${isLight ? 'border-[#0088cc]/40' : 'border-[#00f0ff]/50'
                }`}
            />
            <div
              className={`absolute -inset-4 rounded-full border border-dashed animate-[spin_60s_linear_infinite_reverse] group-hover:scale-110 transition-transform duration-500 pointer-events-none ${isLight ? 'border-[#8800cc]/25' : 'border-[#bd00ff]/30'
                }`}
            />

            {/* Circular Profile Avatar Container */}
            <div
              className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 transition-colors duration-500 backdrop-blur-xs ${isLight
                  ? 'border-slate-300 group-hover:border-[#0088cc]/70 shadow-[0_0_40px_rgba(0,136,204,0.25)]'
                  : 'border-white/25 group-hover:border-[#00f0ff]/70 shadow-[0_0_50px_rgba(0,240,255,0.35)]'
                }`}
            >
              {/* Dark Mode Profile */}
              <img
                src="/profile.jpg"
                alt="Ephraim Jay A. Solasco (Dark Mode)"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${theme === 'dark' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
              {/* Light Mode Profile */}
              <img
                src="/profile1.png"
                alt="Ephraim Jay A. Solasco (Light Mode)"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${theme === 'light' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
