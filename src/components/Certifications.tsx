import { Cloud, Server, Brain, MonitorPlay, Compass, Cpu } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: 'AWS Academy Graduate: Cloud Foundations',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Sept 2025',
      description: 'Foundational knowledge of core AWS services, cloud architecture, security, and pricing models.',
      icon: <Cloud className="w-5 h-5 text-[#00f0ff]" />,
    },
    {
      title: 'AWS Academy Graduate: Cloud Architecting',
      issuer: 'Amazon Web Services (AWS)',
      date: '2025',
      description: 'Developed skills in designing and deploying scalable, secure cloud architectures.',
      icon: <Server className="w-5 h-5 text-[#bd00ff]" />,
    },
    {
      title: 'Huawei ICT: Information Representation and Data Organization',
      issuer: 'Huawei',
      date: 'Apr 2023',
      description: 'Focused on data structures, encoding, and efficient storage systems.',
      icon: <Brain className="w-5 h-5 text-red-400" />,
    },
    {
      title: 'DICT Region VII: STEP-UP MADASIGON',
      issuer: 'Department of Information and Communications Technology (DICT)',
      date: '2024',
      description: 'Program focused on enhancing digital skills and ICT literacy.',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'ServiceNow Fundamentals Elective Course Achievement',
      issuer: 'EY Global Delivery Services & ServiceNow',
      date: '2024',
      description: 'Recognized for outstanding performance during specialized training conducted by EY Global Delivery Services and ServiceNow.',
      icon: <MonitorPlay className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'UXPH Mini 2025: Cebu Participant',
      issuer: 'UXPH (User Experience Philippines)',
      date: 'Sept 2025',
      description: 'Completed 8+ hours of expert design talks, panels, and hands-on workshop training hosted by industry leaders at the University of San Carlos.',
      icon: <Compass className="w-5 h-5 text-[#00f0ff]" />,
    },
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="glow-bg top-[25%] right-[5%] bg-cyan-500/10" />
      <div className="glow-bg bottom-[25%] left-[5%] bg-purple-500/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="text-sm font-semibold tracking-widest text-[#bd00ff] uppercase">
            Education & Growth
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white">
            Training & Certifications
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#bd00ff] to-[#00f0ff] rounded" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl border border-white/5 text-left hover:border-[#bd00ff]/30 transition-all duration-300 flex flex-col justify-between group hover:scale-[1.02]"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#bd00ff]/30 transition-colors">
                    {cert.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#00f0ff] bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                    {cert.date}
                  </span>
                </div>
                
                <h3 className="font-bold text-white text-base md:text-lg font-display mb-2 group-hover:text-[#bd00ff] transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-xs text-slate-400 font-semibold mb-3 uppercase tracking-wider">
                  {cert.issuer}
                </p>
                
                <p className="text-slate-400 text-sm leading-relaxed font-normal">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
