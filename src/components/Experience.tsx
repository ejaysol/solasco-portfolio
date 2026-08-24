import { GraduationCap, Cloud, Server, Brain, MonitorPlay, Compass, Cpu } from 'lucide-react';

export default function Experience() {
  const history = [
    {
      role: 'Bachelor of Science in Information Technology',
      company: 'Cebu Institute of Technology - University',
      period: 'Cebu City, Philippines',
      description:
        'Pursued studies in Information Technology, focusing on web design, programming paradigms, and software systems. Campus: Natalio B. Bacalso Ave, Cebu City, Cebu 6000.',
      icon: <GraduationCap className="w-5 h-5 text-[#00f0ff]" />,
    },
    {
      role: 'AWS Academy Graduate: Cloud Foundations',
      company: 'Amazon Web Services (AWS)',
      period: 'Sept 2025',
      description:
        'Foundational knowledge of core AWS services, cloud architecture, security, and pricing models.',
      icon: <Cloud className="w-5 h-5 text-[#00f0ff]" />,
    },
    {
      role: 'AWS Academy Graduate: Cloud Architecting',
      company: 'Amazon Web Services (AWS)',
      period: '2025',
      description:
        'Developed skills in designing and deploying scalable, secure cloud architectures.',
      icon: <Server className="w-5 h-5 text-[#bd00ff]" />,
    },
    {
      role: 'Huawei ICT: Information Representation and Data Organization',
      company: 'Huawei',
      period: 'Apr 2023',
      description:
        'Focused on data structures, encoding, and efficient storage systems.',
      icon: <Brain className="w-5 h-5 text-red-400" />,
    },
    {
      role: 'DICT Region VII: STEP-UP MADASIGON',
      company: 'Department of Information and Communications Technology (DICT)',
      period: '2024',
      description:
        'Program focused on enhancing digital skills and ICT literacy.',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    },
    {
      role: 'ServiceNow Fundamentals Elective Course Achievement',
      company: 'EY Global Delivery Services & ServiceNow',
      period: '2024',
      description:
        'Recognized for outstanding performance during specialized training conducted by EY Global Delivery Services and ServiceNow.',
      icon: <MonitorPlay className="w-5 h-5 text-amber-400" />,
    },
    {
      role: 'UXPH Mini 2025: Cebu Participant',
      company: 'UXPH (User Experience Philippines)',
      period: 'Sept 2025',
      description:
        'Completed 8+ hours of expert design talks, panels, and hands-on workshop training hosted by industry leaders at the University of San Carlos.',
      icon: <Compass className="w-5 h-5 text-[#00f0ff]" />,
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="glow-bg top-[40%] left-[10%] bg-purple-500/10" />
      <div className="glow-bg bottom-[10%] right-[10%] bg-cyan-500/10" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-center items-center">
          <span className="text-sm font-semibold tracking-widest text-[#00f0ff] uppercase">
            My Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white">
            Work & Education
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] rounded" />
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 text-left">
          {history.map((item, idx) => (
            <div key={idx} className="relative pl-8 group">
              {/* Timeline dot/icon */}
              <div className="absolute -left-[21px] top-0 bg-[#0a0a0f] p-2 rounded-full border border-white/10 group-hover:border-[#00f0ff] transition-colors duration-300 shadow-md">
                {item.icon}
              </div>

              {/* Card content */}
              <div className="glass p-6 rounded-2xl border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-300 relative group-hover:scale-[1.01]">
                {/* Connector line (subtle) */}
                <div className="absolute top-6 -left-4 w-4 h-px bg-white/10 group-hover:bg-[#00f0ff] transition-colors duration-300" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display group-hover:text-[#00f0ff] transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {item.company}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#00f0ff] bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-max">
                    {item.period}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
