import React, { useEffect, useState } from 'react';
import { Users, Trophy, Brain, BookOpenCheck, Atom, Puzzle, Zap, UserCheck } from 'lucide-react';

const AboutEvent: React.FC = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  const stats = [
    { icon: Brain, value: "AI Agents", label: "Focus on Autonomy, Memory, Collaboration", color: "text-[#ff7200]" },
    { icon: Users, value: "100+", label: "Curious Minds Expected", color: "text-blue-400" },
    { icon: Trophy, value: "Hands-on", label: "Build as You Learn", color: "text-yellow-400" },
    { icon: BookOpenCheck, value: "5+", label: "Deep-Dive Sessions", color: "text-green-400" },
    { icon: Atom, value: "100%", label: "Practical AI Focus", color: "text-purple-400" },
    { icon: Puzzle, value: "Modular", label: "Each Session Unlocks a New Capability", color: "text-orange-400" }
  ];

  const features = [
    "Explore the evolving world of AI Agents",
    "Understand autonomous task execution & memory",
    "Learn prompt engineering and agent collaboration",
    "Code intelligent, adaptable AI components",
    "Start your AI journey one agent at a time"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      stats.forEach((_, index) => {
        setTimeout(() => {
          setVisibleStats(prev => [...prev, index]);
        }, index * 200);
      });
    }, 500);

    const featuresTimer = setTimeout(() => {
      features.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, index]);
        }, index * 300);
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(featuresTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        .animated-card {
          position: relative;
        }
        .animated-card::after, .animated-card::before {
          content: '';
          position: absolute;
          height: 102%;
          width: 102%;
          background-image: conic-gradient(from var(--angle), transparent 50%, #ff7200);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          padding: 3px;
          border-radius: 1rem;
          animation: 3s spin linear infinite;
        }
        .animated-card::before {
          filter: blur(1.5rem);
          opacity: 0.5;
        }
        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>

      <section id="about" className="min-h-screen bg-black py-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#ff7200]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00]">
                ABOUT MOSAIC
              </h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed animate-fade-in delay-300">
                <p className="text-2xl font-semibold bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent">
                  Welcome to Mosaic Bootcamp
                </p>

                <p>
                  Mosaic is a hands-on bootcamp crafted for curious minds ready to dive deep into the evolving world of <span className="text-[#ff7200] font-bold">AI Agents</span>.
                </p>

                <p>
                  Just like pieces of a mosaic form a larger picture, each session in this bootcamp focuses on a distinct aspect of AI — from autonomous task execution, to reasoning, memory, and agent collaboration.
                </p>

                <p>
                  Participants will <span className="text-[#ff7200] font-semibold">learn by doing</span>, build core AI agent components, and discover how intelligence can evolve through modular construction.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent mb-8 animate-fade-in">
                WHAT YOU'LL BUILD
              </h3>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-1000 ${
                      visibleFeatures.includes(index)
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-20 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-[#ff7200]/20 hover:border-[#ff7200]/40 transition-all duration-300 hover:scale-105">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#ff7200] to-[#ffae00] rounded-full animate-pulse"></div>
                      <p className="text-gray-200 text-lg">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-1000 ${
                    visibleStats.includes(index)
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-20 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative group animated-card">
                    <div className="relative bg-black rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 z-10">
                      <div className="mb-6">
                        <IconComponent className={`w-12 h-12 mx-auto ${stat.color} animate-pulse`} />
                      </div>
                      <div className="space-y-2">
                        <div className={`text-4xl font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-gray-300 text-sm leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent">
              🚀 Begin Your AI Agent Journey
            </h3>
          </div>
          
        </div>
               {/* Call to Action */}
                <div className="text-center">
                  <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-[#ff7200]/30 backdrop-blur-sm hover:border-[#ff7200]/50 transition-all duration-300">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#ff7200] to-[#ffae00] mb-4 animate-pulse">
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent">
                      Ready to Join the Revolution?
                    </h3>
                    
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                    Join Mosaic, South India's most dynamic AI bootcamp. Register today and start building the future of intelligent agents!
                    </p>
                    
                    <div className="relative inline-block group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff7200] to-[#ffae00] opacity-75 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-300 animate-pulse" />
          
          <div className="relative bg-gradient-to-r from-[#ff7200] via-[#ff8a00] to-[#ffae00] text-white font-bold py-3 px-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 border-2 border-[#ff7200]/50 hover:border-[#ff7200]/30">
            <div className="flex items-center">
              <Zap className="w-5 h-5 animate-pulse mr-3" />
              <a href="https://forms.gle/CKmbE7ZaCZaz4XLy9" target="_blank" rel="noopener noreferrer">🔗 REGISTER NOW</a>
            </div>
          </div>
        </div>
        
                  </div>
                </div>

      </section>
    </>
  );
};

export default AboutEvent;
  