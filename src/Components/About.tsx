// Imports & Style Unchanged
import React, { useEffect, useState } from 'react';
import { Users, Trophy, Clock, Hotel, Globe, Brain, IndianRupee, Shirt, Utensils } from 'lucide-react';
import "../UI/AboutEvent.css";

const About: React.FC = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  // Update: Stats represent DevSpark as a whole, not a single hackathon.
  const stats = [
    { icon: Globe, value: "3", label: "Tracks: DevForge, Mosaic, Bizpulse", color: "text-purple-400" },
    { icon: Users, value: "1400+", label: "Participants Expected", color: "text-blue-400" },
    { icon: IndianRupee, value: "₹85,000+", label: "Total Prize Pool", color: "text-green-400" },
    { icon: Trophy, value: "National", label: "Level Recognition & Opportunities", color: "text-yellow-400" },
    { icon: Clock, value: "2 Days", label: "of Learning, Building & Pitching", color: "text-orange-400" },
    { icon: Brain, value: "20+", label: "Mentors & Industry Experts", color: "text-pink-400" }
  ];

  // Update: Features reflect the multi-track platform.
  const features = [
    "Three powerful tracks for every innovator: DevForge , Mosaic , Bizpulse",
    "Hands-on experience and mentorship in AI/ML, Full Stack, Cybersecurity, and Business",
    "Collaborate with peers and industry experts from across India",
    "Win prizes, internships, and national recognition",
    "Build impactful tech and business solutions for real-world challenges"
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
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }
      `}</style>
      {/* ...[Retain your gradient, blur, and card effects styling unchanged]... */}
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

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#ff7200]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* LEFT: About DevSpark */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00]">
                  ABOUT DEVSPARK
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed animate-fade-in delay-300">
                  <p className="text-2xl font-semibold bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent">
                    South India's Premier Multi-Track Innovation Fest
                  </p>
                  <p>
                    <b>DevSpark</b> is a dynamic national platform bringing together students, innovators, and leaders across <span className="text-[#ff7200] font-bold">technology, software engineering, and business</span>. Uniting three powerful tracks—
                    <span className="text-[#ff7200] font-semibold"> DevForge</span> (Hackathon),
                    <span className="text-[#ff7200] font-semibold"> Mosaic</span> (Bootcamp),
                    <span className="text-[#ff7200] font-semibold"> Bizpulse</span> (Business),
                    —DevSpark is where collaboration, creativity, and industry opportunities meet.
                  </p>
                  <p>
                    Organized by <span className="text-[#ff7200] font-semibold">IEEE SYP HIZE</span> and hosted by <span className="text-[#ff7200] font-semibold">KPR Institute of Engineering and Technology</span>, DevSpark empowers you to learn, build, and pitch in a vibrant offline setting.
                  </p>
                  <p>
                    Whether you code, conceptualize, or strategize—there’s a track for you at DevSpark.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: What Makes DevSpark Unique */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl  font-bold bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent mb-8 animate-fade-in">
                  WHY JOIN DEVSPARK?
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
          </div>

          {/* STATS across all tracks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
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

          {/* Info & Perks – adjust for all participants */}
          <div className="mb-16">
            <h3 className="text-4xl mt-10 md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent">
              Who Can Join & What You'll Get
            </h3>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 mr-6 bg-gradient-to-r from-[#ff7200] to-[#ffae00] rounded-full flex items-center justify-center animate-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-white">
                    Open to students from all streams and years
                  </p>
                </div>
              </div>
              <div className="flex items-center p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 mr-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Shirt className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-white">
                    Complimentary t-shirts for all participants
                  </p>
                </div>
              </div>
              <div className="flex items-center p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 mr-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Hotel className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-white">
                    Optional accommodation (₹250 per day, on request)
                  </p>
                </div>
              </div>
              <div className="flex items-center p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 mr-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Utensils className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-white">
                    Free meals and refreshments for all track participants
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;
