import React, { useEffect, useState } from 'react';
import { Users,Zap , Code, Shield, Layers, UserCheck, UserX, AlertTriangle, Laptop, Brain, CheckCircle, XCircle } from 'lucide-react';


const WhoCanJoin: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [, setVisibleRules] = useState<number[]>([]);
  const [visiblePermitted, setVisiblePermitted] = useState<number[]>([]);
  const [visibleProhibited, setVisibleProhibited] = useState<number[]>([]);

  const eligibilityItems = [
    { icon: Users, text: "Participants should either belong to B.E, B.Tech, M.E, M.Tech, MCA or MSc and should be studying in any stream and any semester/year", color: "text-cyan-400" },

  ];

  const rules = [
    { icon: Users, text: "Teams must consist of 2 to 4 members", color: "text-green-400" },
    { icon: UserX, text: "Plagiarism, unethical behavior, or using pre-built templates will lead to disqualification", color: "text-red-400" },
    { icon: AlertTriangle, text: "Strictly no copying code or sharing ideas across teams", color: "text-orange-400" }
  ];

  const permittedActions = [
    { icon: Users, text: "Team size must be between 2 to 4 members", color: "text-green-400" },
    { icon: Code, text: "Use of publicly available tools, libraries, and frameworks is allowed", color: "text-blue-400" },
    { icon: Users, text: "Collaboration within your team is encouraged and expected", color: "text-cyan-400" },
    { icon: Laptop, text: "You may bring your own laptops and devices for development", color: "text-purple-400" },
    { icon: UserCheck, text: "Have doubts? Reach out to the organizers at any point during the event", color: "text-green-400" }
  ];

  const prohibitedActions = [
    { icon: Shield, text: "Attacking or tampering with the event infrastructure", color: "text-red-400" },
    { icon: UserX, text: "Sharing code, ideas, or solutions with other teams", color: "text-red-400" },
    { icon: XCircle, text: "Any form of cheating, plagiarism, or unethical behavior will result in disqualification", color: "text-red-400" },
    { icon: AlertTriangle, text: "Interfering with other teams' workflow or environment", color: "text-red-400" },
    { icon: Shield, text: "Performing actions that could compromise the integrity or fairness of the competition", color: "text-red-400" }
  ];

  const tracks = [
    { icon: Brain, name: "AI/ML", description: "Machine Learning & Artificial Intelligence", color: "from-cyan-500 to-blue-500" },
    { icon: Shield, name: "Cybersecurity", description: "Security & Ethical Hacking", color: "from-blue-500 to-purple-500" },
    { icon: Layers, name: "Full Stack", description: "End-to-end Development", color: "from-purple-500 to-cyan-500" }
  ];


  useEffect(() => {
    // Animate eligibility items
    const timer1 = setTimeout(() => {
      eligibilityItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, index * 200);
      });
    }, 300);

    // Animate rules
    const timer2 = setTimeout(() => {
      rules.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRules(prev => [...prev, index]);
        }, index * 250);
      });
    }, 800);

    // Animate permitted actions
    const timer3 = setTimeout(() => {
      permittedActions.forEach((_, index) => {
        setTimeout(() => {
          setVisiblePermitted(prev => [...prev, index]);
        }, index * 200);
      });
    }, 1200);

    // Animate prohibited actions
    const timer4 = setTimeout(() => {
      prohibitedActions.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProhibited(prev => [...prev, index]);
        }, index * 250);
      });
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
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
        
        .animate-card {
          position: relative;
        }
        
        .animate-card::after, .animate-card::before {
          content : '';
          position: absolute;
          height: 102%;
          width: 102%;
          background-image: conic-gradient(from var(--angle),
    transparent 0deg 135deg,
    cyan 135deg 180deg,
    transparent 180deg 315deg,
    cyan 315deg 360deg);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          padding: 3px;
          border-radius: 1rem;
          animation: 2s spin linear infinite;
        }
        
        .animate-card::before {
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
    <section id="rules" className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">

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
        
        {/* Header */}
        <div className="text-center mb-16">
        <div className="relative mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center animate-spin" style={{animationDuration: '8s'}}>
                <div className="relative">
                  <Zap className="w-16 h-16 text-cyan-400 animate-pulse" />
                  <div className="absolute inset-0 w-16 h-16 bg-cyan-400/30 rounded-full blur-xl animate-pulse" />
                </div>
              </div>
            </div>
        </div>
          
 {/* Title with glitch effect */}
 <div className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-4 relative">
              <span className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                WHO CAN JOIN
              </span>
            </h1>
            
            <div className="text-5xl md:text-7xl font-bold relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative">
                DEVSPARK
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-2xl animate-pulse" />
              </span>
            </div>
            <div className="w-24 mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
      
          </div>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500">
            DevSpark is open to all tech enthusiasts, coders, and creative problem-solvers from across India 
            who are ready to <span className="text-cyan-400 font-semibold">challenge the norms</span> and 
            <span className="text-blue-400 font-semibold"> build the future</span>.
          </p>
        </div>

        {/* Tech Tracks */}
        <div  className="mb-16">
          <p className="text-center text-lg text-gray-300 mb-12 animate-fade-in delay-700">
            Whether you're passionate about <span className="text-cyan-400 font-semibold">AI/ML</span>, 
            obsessed with <span className="text-blue-400 font-semibold">cybersecurity</span>, or a 
            <span className="text-purple-400 font-semibold"> full-stack wizard</span>, this hackathon is your chance to shine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tracks.map((track, index) => {
              const IconComponent = track.icon;
              return (
                <div
                  key={index}
                  className="transform transition-all duration-1000 animate-fade-in hover:scale-105"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                >
                  <div className="relative group animate-card">
                    <div className={`absolute inset-0 bg-black ${track.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                    
                    <div className="relative bg-black backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                      <div className="mb-6">
                        <IconComponent className="w-12 h-12 mx-auto text-cyan-400 animate-pulse" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{track.name}</h3>
                      <p className="text-gray-300 text-sm">{track.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-16">
          <div className="space-y-6">
            {eligibilityItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-1000 ${
                    visibleItems.includes(index)
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-20 opacity-0'
                  }`}
                >
                  <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className={`text-xl font-semibold ${item.color}`}>➡️ {item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competition Rules - Two Column Layout */}
        <div className="mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            DEVSPARK HACKATHON RULES
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Permitted Actions */}
            <div className="space-y-8">
              <div className="mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 mx-auto animate-pulse">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent text-center mb-8">
                  ✅ PERMITTED ACTIONS
                </h4>
              </div>
              
              <div className="space-y-4">
                {permittedActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <div
                      key={index}
                      className={`transform transition-all duration-1000 ${
                        visiblePermitted.includes(index)
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-20 opacity-0'
                      }`}
                    >
                      <div className="flex items-start p-6 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                        <div className="flex-shrink-0 mt-1 mr-4">
                          <IconComponent className="w-6 h-6 text-green-400 flex-shrink-0" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-200 text-lg leading-relaxed">{action.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Prohibited Actions */}
            <div className="space-y-8">
              <div className="mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mb-6 mx-auto animate-pulse">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent text-center mb-8">
                  🚫 PROHIBITED ACTIONS
                </h4>
              </div>
              
              <div className="space-y-4">
                {prohibitedActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <div
                      key={index}
                      className={`transform transition-all duration-1000 ${
                        visibleProhibited.includes(index)
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-20 opacity-0'
                      }`}
                    >
                      <div className="flex items-start p-6 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                        <div className="flex-shrink-0 mt-1 mr-4">
                          <IconComponent className="w-6 h-6 text-red-400 flex-shrink-0" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-200 text-lg leading-relaxed">{action.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-4 animate-pulse">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Join the Revolution?
            </h3>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              Don't miss your chance to be part of South India's most exciting hackathon. 
              Register now and let your creativity spark innovation!
            </p>
            
            <div className="relative inline-block group cursor-pointer">
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-75 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-300 animate-pulse" />
  
  <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl text-lg hover:scale-105 transition-all duration-300 border-2 border-cyan-400/50 hover:border-cyan-300">
    <div className="flex items-center">
      <Zap className="w-5 h-5 animate-pulse mr-3" />
      <span>🔗 REGISTER NOW</span>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default WhoCanJoin;