import React, { useEffect, useState } from 'react';
import { Mic2, Users, Lightbulb, TrendingUp, Handshake, Presentation, Zap, UserCheck } from 'lucide-react';

// Add CSS for the circulating border effect
const circularBorderStyle = `
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
`;

const AboutEvent: React.FC = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  const stats = [
    { icon: Lightbulb, value: "Innovate", label: "Pitch Bold Ideas", color: "text-yellow-400" },
    { icon: Users, value: "Experts", label: "Get Live Feedback", color: "text-blue-400" },
    { icon: Mic2, value: "Present", label: "In Front of Industry Leaders", color: "text-purple-400" },
    { icon: Presentation, value: "Prototype or Idea", label: "Both Welcome", color: "text-green-400" },
    { icon: TrendingUp, value: "Grow", label: "Refine for Real-World Impact", color: "text-orange-400" },
    { icon: Handshake, value: "Connect", label: "With Mentors & Partners", color: "text-pink-400" }
  ];

  const features = [
    "Pitch your innovative ideas or solutions",
    "Engage directly with experienced professionals",
    "Get real-time insights and growth strategies",
    "Bridge the gap between student projects and industry relevance",
    "Build visibility and networking opportunities"
  ];

  useEffect(() => {
    stats.forEach((_, index) => {
      setTimeout(() => {
        setVisibleStats(prev => [...prev, index]);
      }, index * 200);
    });

    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFeatures(prev => [...prev, index]);
      }, 1500 + index * 300);
    });
  }, []);

  return (
    <section id="about" className="min-h-screen bg-black py-16 px-4 relative overflow-hidden">
      <style>{circularBorderStyle}</style>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-yellow-400">
              ABOUT BIZPULSE
            </h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed animate-fade-in delay-300">
              <p className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Welcome to BizPulse
              </p>

              <p>
                BizPulse is not just an event — it's a high-energy idea pitching arena where visionary student innovations meet real-world industry expectations.
              </p>

              <p>
                Participants present their concepts, prototypes, or solutions before a panel of seasoned industry professionals, gaining real-time feedback, insights, and growth opportunities.
              </p>

              <p>
                Whether you're solving real problems or dreaming up the future, BizPulse is your launchpad to make an impact.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-8 animate-fade-in">
              WHY BIZPULSE?
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
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse"></div>
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
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            💡 Think. Pitch. Impact.
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your ideas deserve a stage — let BizPulse be the pulse that connects innovation to implementation.
          </p>
        </div>

        <div className="text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-400/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 mb-4 animate-pulse">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Ready to Make Waves in Industry?
            </h3>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              Be part of South India's most impactful innovation pitch session. Register now and let your ideas echo where it matters.
            </p>

            <div className="relative inline-block group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-75 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-300 animate-pulse" />
              <div className="relative bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 text-white font-bold py-3 px-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400/30">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 animate-pulse mr-3" />
                  <a href="https://forms.gle/XEbBrRLzsVTsEY7z7" target="_blank" rel="noopener noreferrer">🔗 REGISTER NOW</a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutEvent;