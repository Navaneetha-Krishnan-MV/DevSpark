import React, { useEffect, useState } from 'react';
import { Users, Trophy, Clock, Globe, Brain, DollarSign } from 'lucide-react';
import "../UI/AboutEvent.css"

const AboutEvent: React.FC = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  const stats = [
    { icon: Brain, value: "12+", label: "Domain-specific Problem Statements", color: "text-cyan-400" },
    { icon: Users, value: "1000+", label: "Participants Expected", color: "text-blue-400" },
    { icon: DollarSign, value: "₹80000", label: "Prize Pool", color: "text-green-400" },
    { icon: Globe, value: "3", label: "Tracks: Cybersecurity, Full Stack, AI/ML", color: "text-purple-400" },
    { icon: Clock, value: "24", label: "Hours of Non-Stop Coding", color: "text-orange-400" },
    { icon: Trophy, value: "National", label: "Level Recognition", color: "text-yellow-400" }
  ];

  const features = [
    "Real-world challenges across trending tech domains",
    "From Cybersecurity to AI/ML to Full-Stack Development",
    "Build impactful solutions that matter",
    "Collaborate with the best minds in India",
    "Win exciting prizes, internships, and industry recognition"
  ];

  useEffect(() => {
    // Animate stats appearance
    const timer = setTimeout(() => {
      stats.forEach((_, index) => {
        setTimeout(() => {
          setVisibleStats(prev => [...prev, index]);
        }, index * 200);
      });
    }, 500);

    // Animate features appearance
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
          background-image: conic-gradient(from var(--angle), transparent 50%, blue);
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
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }
      `}</style>
      
      <section id="about" className="min-h-screen bg-black py-10 px-4 relative overflow-hidden">
        
        {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Left Side - About This Event */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  ABOUT THIS EVENT
                </h2>
                
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed animate-fade-in delay-300">
                  <p className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Welcome to DevSpark 2025
                  </p>
                  
                  <p>
                    South India's dynamic <span className="text-cyan-400 font-bold">24-hour offline national-level Hackathon</span> — 
                    a celebration of creativity, code, and cutting-edge innovation!
                  </p>
                  
                  <p>
                    Hosted by the <span className="text-blue-400 font-semibold">Department of Computer Science and Engineering, 
                    KPR Institute of Engineering and Technology</span>, in collaboration with 
                    <span className="text-cyan-400 font-semibold"> IEEE KPRIET CS</span> and 
                    <span className="text-blue-400 font-semibold"> IEEE SPY Hize</span>.
                  </p>
                  
                  <p>
                    DevSpark brings together future-focused developers, designers, and thinkers under one roof.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - What You'll Experience */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8 animate-fade-in">
                  WHAT YOU'LL EXPERIENCE
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
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                        <p className="text-gray-200 text-lg">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid with Animated Borders */}
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

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Spark Innovation?
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutEvent;