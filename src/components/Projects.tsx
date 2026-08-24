import { ExternalLink, Globe, Sparkles, Quote, Lock } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  urlDisplay: string;
  description: string;
  pov: string;
  image: string;
  tags: string[];
  github?: string;
  demo: string;
  demoLabel?: string;
  isLive?: boolean;
  isFigma?: boolean;
}

interface ProjectsProps {
  theme?: 'dark' | 'light';
}

export default function Projects({ theme = 'dark' }: ProjectsProps) {
  const isLight = theme === 'light';

  const projects: Project[] = [
    {
      title: 'Guardian Aces Security Agency',
      category: 'Corporate Security Web Portal',
      urlDisplay: 'guardianaces.com',
      description:
        'An authoritative, high-performance corporate web portal for a premier private security agency, featuring comprehensive service catalog showcases, quotation request workflows, and a trust-centric digital presence.',
      pov: 'Focused on establishing instant corporate credibility and brand authority. I prioritized high-clarity typography, seamless inquiry conversions, and an accessible layout that instills trust in enterprise clients.',
      image: '/guardianaces.png',
      tags: ['Corporate Web', 'UI/UX Design', 'Tailwind CSS', 'SEO Optimization', 'Responsive Design'],
      github: 'https://github.com/ejaysol',
      demo: 'https://www.guardianaces.com/',
      demoLabel: 'Visit Site',
      isLive: true,
    },
    {
      title: 'Amigo Dormitory',
      category: 'Accommodation & Booking Platform',
      urlDisplay: 'amigo.ph',
      description:
        'A modern student and professional dormitory accommodation platform designed for intuitive room browsing, interactive amenity showcases, and streamlined tenant booking inquiries.',
      pov: 'Engineered a mobile-first user journey to eliminate friction in finding student living spaces. The emphasis was placed on rich visual room showcases, transparent amenity listings, and fast reservation touchpoints.',
      image: '/amigo.png',
      tags: ['React', 'UI/UX Design', 'Booking Platform', 'Mobile-First', 'Accommodation UI'],
      github: 'https://github.com/ejaysol',
      demo: 'https://www.amigo.ph/',
      demoLabel: 'Visit Site',
      isLive: true,
    },
    {
      title: 'LIBROVA 📖 - Interactive Bookstore Portal',
      category: 'Frontend & 3D Engineering',
      urlDisplay: 'figma.com/design/librova-bookstore',
      description:
        'An elegant bookstore and digital reading showcase project demonstrating high-fidelity responsive layouts, interactive 3D elements, custom UI components, and fluid micro-animations.',
      pov: 'Aimed to push the boundaries of modern frontend interaction design by integrating Three.js graphics and GSAP smooth animations while maintaining smooth 60fps frame rates.',
      image: '/Portfolio 1.png',
      tags: ['React', 'Three.js', 'Tailwind CSS', 'GSAP Motion', 'Vite', 'Figma'],
      github: 'https://github.com/ejaysol',
      demo: 'https://www.figma.com/design/l4LT47MxTmKMHBpeha5uzV/LIBROVA-%F0%9F%93%96?node-id=96-2&t=6LkTfEnwRbKz6wel-1',
      demoLabel: 'View Design',
      isFigma: true,
    },
    {
      title: 'AssureFlex 🛡️ - Insurance Platform UI/UX',
      category: 'Product & Visual Design',
      urlDisplay: 'figma.com/design/assureflex-insurance',
      description:
        'AssureFlex simplifies insurance with clear, digestible information and trusted partner integrations, empowering users to make confident financial protection decisions.',
      pov: 'Designed to bridge the gap between creative visual concepts and technical engineering feasibility—standardizing accessible UX wireframing, high-contrast decision matrices, and reusable design tokens.',
      image: '/Portfolio 2.png',
      tags: ['Figma Design', 'UI/UX', 'InsurTech', 'Design Tokens', 'Prototyping'],
      github: 'https://github.com/ejaysol',
      demo: 'https://www.figma.com/design/Rjt3lb2xEXmt14Ic7s6P2S/AssureFlex?node-id=4001-1042&t=Zs4qEYEONek7ItZG-1',
      demoLabel: 'Figma Prototype',
      isFigma: true,
    },
    {
      title: 'Darknet Duel 🃏 - Cybersecurity Card Game',
      category: 'Cybersecurity Game Design & UI/UX',
      urlDisplay: 'figma.com/design/darknet-duel-game',
      description:
        'An engaging educational cybersecurity card game platform designed for interactive learning, featuring custom card battle mechanics, threat-defense simulations, and gamified security concepts for everyone to play.',
      pov: 'Aimed to make complex cybersecurity concepts accessible and intuitive through gamified interaction—designing clear visual card hierarchies, cyber-threat counters, and an immersive dark-mode UI theme.',
      image: '/Portfolio 3.png',
      tags: ['Figma Design', 'Cybersecurity', 'Card Game', 'UI/UX Design', 'Gamification'],
      github: 'https://github.com/ejaysol',
      demo: 'https://www.figma.com/design/Yic1V0yREWxUHxAbLOhmpR/Darknet-Duel%C2%A0?node-id=42-89&t=E1HtrZfFhK5oaola-1',
      demoLabel: 'Figma Prototype',
      isFigma: true,
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden transition-colors duration-300">
      <div className="glow-bg top-[20%] left-[10%] bg-cyan-500/10" />
      <div className="glow-bg bottom-[30%] right-[5%] bg-purple-500/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="text-sm font-semibold tracking-widest text-[#bd00ff] uppercase flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${isLight ? 'text-[#0088cc]' : 'text-[#00f0ff]'}`} />
            My Work
          </span>
          <h2
            className={`text-3xl md:text-5xl font-extrabold font-display transition-colors duration-300 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Featured Projects
          </h2>
          <p
            className={`max-w-2xl text-sm md:text-base transition-colors duration-300 ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            A comprehensive showcase of live client websites, production portals, Figma prototypes, and full-stack applications with developer insights and design perspectives.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] rounded mt-2" />
        </div>

        {/* Projects Grid: Window-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col h-full hover:-translate-y-2 border backdrop-blur-xl ${
                isLight
                  ? 'bg-white/95 border-slate-200 shadow-xl hover:border-[#0088cc]/60 hover:shadow-[0_12px_40px_rgba(0,136,204,0.15)]'
                  : 'bg-[#0d0d15]/85 border-white/10 shadow-2xl hover:border-[#00f0ff]/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.15)]'
              }`}
            >
              {/* Window Titlebar Header */}
              <div
                className={`px-4 py-3 border-b flex items-center justify-between select-none transition-colors duration-300 ${
                  isLight
                    ? 'bg-slate-100/95 border-slate-200'
                    : 'bg-[#131322]/90 border-white/10'
                }`}
              >
                {/* Traffic Light Window Dots */}
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/60 shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/60 shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/60 shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
                </div>

                {/* Window Address Bar / URL Pill */}
                <div
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-mono max-w-[55%] truncate border transition-colors duration-300 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-600 shadow-xs'
                      : 'bg-black/40 border-white/5 text-slate-400'
                  }`}
                >
                  <Lock
                    className={`w-2.5 h-2.5 flex-shrink-0 ${
                      isLight ? 'text-[#0088cc]' : 'text-[#00f0ff]'
                    }`}
                  />
                  <span className="truncate">{project.urlDisplay}</span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center space-x-1.5">
                  {project.isLive ? (
                    <span
                      className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        isLight
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live</span>
                    </span>
                  ) : project.isFigma ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        isLight
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-[#bd00ff]/10 text-purple-300 border-[#bd00ff]/30'
                      }`}
                    >
                      Figma
                    </span>
                  ) : (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        isLight
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      }`}
                    >
                      App
                    </span>
                  )}
                </div>
              </div>

              {/* Window Viewport (Screen Image) */}
              <div
                className={`relative overflow-hidden aspect-[16/10] border-b ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/80 border-white/5'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                    isLight ? 'from-slate-900/35 opacity-70' : 'from-[#0d0d15] opacity-80'
                  }`}
                />

                {/* Category Badge overlay on bottom left */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#0a0a12]/90 border border-white/15 backdrop-blur-md shadow-md">
                  <span className="text-[11px] font-semibold text-[#00f0ff]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Window Body Panel (Project Details & POV) */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                <h3
                  className={`text-xl font-bold font-display leading-snug min-h-[3rem] transition-colors duration-200 ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#0088cc]'
                      : 'text-white group-hover:text-[#00f0ff]'
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-sm font-normal leading-relaxed min-h-[4.2rem] transition-colors duration-300 ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {project.description}
                </p>

                {/* Developer POV (Point of View) Inspection Box */}
                <div
                  className={`p-4 rounded-xl border transition-colors duration-200 relative shadow-inner ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-[#8800cc]/40'
                      : 'bg-[#121220]/70 border-white/10 hover:border-[#bd00ff]/40'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-2 text-xs font-semibold">
                    <Quote
                      className={`w-3.5 h-3.5 rotate-180 ${
                        isLight ? 'text-[#0088cc]' : 'text-[#00f0ff]'
                      }`}
                    />
                    <span
                      className={`uppercase tracking-wider text-[11px] font-bold ${
                        isLight ? 'text-[#8800cc]' : 'text-gradient'
                      }`}
                    >
                      Developer POV
                    </span>
                  </div>
                  <p
                    className={`text-xs italic leading-relaxed transition-colors duration-300 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    "{project.pov}"
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border transition-colors ${
                        isLight
                          ? 'bg-slate-100 text-slate-700 border-slate-200 group-hover:border-slate-300'
                          : 'bg-white/5 text-slate-300 border-white/5 group-hover:border-white/10'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Window Footer Toolbar Action Buttons */}
                <div
                  className={`flex items-center justify-between pt-4 border-t mt-auto transition-colors duration-300 ${
                    isLight ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                        isLight
                          ? 'text-slate-500 hover:text-slate-900'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Code</span>
                    </a>
                  ) : <div />}

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
                      isLight
                        ? 'bg-gradient-to-r from-[#0088cc] to-[#8800cc] text-white shadow-[0_0_15px_rgba(0,136,204,0.25)] hover:shadow-[0_0_20px_rgba(0,136,204,0.4)]'
                        : 'bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.35)] hover:opacity-90'
                    }`}
                  >
                    {project.isFigma ? (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M8.5 12a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0-12a3.5 3.5 0 0 1 3.5 3.5v3.5H8.5a3.5 3.5 0 1 1 0-7zm7 0a3.5 3.5 0 0 1 0 7H12V3.5A3.5 3.5 0 0 1 15.5 0zm0 7a3.5 3.5 0 0 1 0 7H12V7h3.5zm-7 0H12v5H8.5a3.5 3.5 0 0 1 0-5z" />
                      </svg>
                    ) : (
                      <Globe className="w-3.5 h-3.5" />
                    )}
                    <span>{project.demoLabel || (project.isLive ? 'Visit Site' : 'View Demo')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
