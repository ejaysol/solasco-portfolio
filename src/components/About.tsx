import { Terminal, Database, Code, ShieldCheck } from 'lucide-react';
import SceneCanvas from './SceneCanvas';
import PlanetOrbitSystem from './PlanetOrbitSystem';

interface AboutProps {
  theme?: 'dark' | 'light';
  introFinished?: boolean;
}

export default function About({ theme = 'dark', introFinished = false }: AboutProps) {
  const skillCategories = [
    {
      title: 'Frontend 3D & Motion',
      icon: <Code className="w-5 h-5 text-[#00f0ff]" />,
      skills: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL / GLSL', 'Tailwind CSS', 'CSS Glassmorphism'],
    },
    {
      title: 'Core Technologies',
      icon: <Terminal className="w-5 h-5 text-[#bd00ff]" />,
      skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'React.js', 'Next.js', 'Vite'],
    },
    {
      title: 'Backend & Dev Tools',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      skills: ['Node.js', 'REST APIs', 'Git / GitHub', 'pnpm / npm', 'Vercel / Netlify', 'Oxlint / ESLint'],
    },
    {
      title: 'Design & Workflow',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      skills: ['Figma', 'UI/UX Prototyping', 'Responsive Design', 'SEO Optimization', 'Web Performance'],
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-visible">
      <div className="glow-bg top-[30%] right-[10%] bg-purple-500/10" />
      <div className="glow-bg bottom-[20%] left-[5%] bg-cyan-500/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="text-sm font-semibold tracking-widest text-[#00f0ff] uppercase">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white">
            Driven by curiosity, shaped by code.
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] rounded" />
        </div>

        {/* Bio Grid: 3D Computer Model on the Left, Story Text on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: 3D Computer Model Visualizer (clean & transparent) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full h-[380px] md:h-[450px] flex items-center justify-center pointer-events-auto">
              <SceneCanvas type="hero" theme={theme} introFinished={introFinished} />
            </div>
          </div>

          {/* Right Column: Bio Text */}
          <div className="lg:col-span-7 space-y-6 w-full text-left text-slate-300 leading-relaxed font-normal text-sm">
            <p>
              As a UI/UX designer, I focus on creating intuitive interfaces that prioritize user experience while maintaining aesthetic appeal. My approach combines user research, wireframing, prototyping, and iterative testing to ensure every design decision serves a purpose. I specialize in responsive design, accessibility standards, and creating seamless user journeys across different devices and platforms.
            </p>
            <p>
              In front-end development, I bring designs to life using modern web technologies including React, TypeScript, and CSS frameworks like Tailwind. I emphasize performance optimization, clean code architecture, and component reusability. My experience includes building single-page applications, e-commerce platforms, and content management systems with a focus on fast load times and smooth user interactions.
            </p>
            <p>
              I bridge the gap between design and development by understanding both perspectives. This allows me to create designs that are not only visually appealing but also technically feasible and maintainable. Whether you need a complete website redesign, a mobile app interface, or a custom web application, I'm equipped to deliver solutions that meet your business objectives while exceeding user expectations.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl border border-white/5 text-left hover:border-[#00f0ff]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-white text-base font-display">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-md border border-white/5 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Planetary Tech Stack Orbiting System */}
        <div>
          <div className="flex flex-col space-y-3 mb-8 text-left">
            <span className="text-sm font-semibold tracking-widest text-[#bd00ff] uppercase">
              Tech Stack
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white">
              My Core Technologies
            </h3>
          </div>

          <PlanetOrbitSystem introFinished={introFinished} />
        </div>
      </div>
    </section>
  );
}
