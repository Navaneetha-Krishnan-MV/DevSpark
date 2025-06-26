import React, { useState, useEffect } from "react";
import ProfileCard from "../UI/ProfileCard";
import { toast } from "sonner";

interface JuryMember {
  id: number;
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  contactText: string;
  bio?: string;
}

const juryMembers: JuryMember[] = [
  {
    id: 1,
    name: "Javi A. Torres",
    title: "Software Engineer",
    handle: "javicodes",
    status: "Available",
    avatarUrl: "https://i.pravatar.cc/300?img=1",
    contactText: "Connect",
    bio: "Full-stack developer with expertise in React and Node.js. Passionate about creating scalable solutions and mentoring upcoming developers.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "UI/UX Designer",
    handle: "sarahdesigns",
    status: "Online",
    avatarUrl: "https://i.pravatar.cc/300?img=2",
    contactText: "Message",
    bio: "Award-winning designer focused on user-centered design. Specialized in creating intuitive interfaces that solve real-world problems.",
  },
  {
    id: 3,
    name: "Alex Kumar",
    title: "Tech Lead",
    handle: "alextech",
    status: "Busy",
    avatarUrl: "https://i.pravatar.cc/300?img=3",
    contactText: "Schedule",
    bio: "Engineering leader with 10+ years in tech innovation. Expert in system architecture and team leadership.",
  },
];

const Jury: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      juryMembers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 200);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (member: JuryMember) => {
    // Toggle expanded state - if already expanded, close it; otherwise, expand it
    setExpandedCard(prev => (prev === member.id ? null : member.id));
    
    // Show toast when expanding
    if (expandedCard !== member.id) {
      toast.success(`Viewing ${member.name}'s Profile`, {
        description: `Learn more about ${member.title}`,
        duration: 2000,
      });
    }
  };

  const handleContactClick = (member: JuryMember) => {
    // Handle contact button click - this is separate from card expansion
    toast.info(`Contacting ${member.name}`, {
      description: `Opening connection with ${member.title}...`,
      duration: 3000,
    });
    console.log(`Connecting with ${member.name} (@${member.handle})`);
  };

  return (
    <section className="w-full min-h-screen bg-black text-white py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 overflow-hidden relative">
      {/* Animated Grid Background - Adjusted for mobile */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }} />
      </div>

      {/* Glowing Particles - Less on mobile */}
      <div className="absolute inset-0">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl md:text-5xl">⚖️</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 px-2">
            Meet Our{" "}
            <span className="block sm:inline">Jury Panel</span>
            <div className="w-16 sm:w-20 md:w-24 mt-3 sm:mt-4 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
            Industry experts and innovative leaders who will evaluate and guide your hackathon journey. Each bringing unique perspectives and decades of combined experience.
          </p>
        </div>

        {/* Jury Cards - Improved mobile layout */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row xl:justify-center xl:items-stretch gap-4 sm:gap-6 max-w-7xl mx-auto">
            {juryMembers.map((member, index) => (
              <div
                key={member.id}
                className={`transform transition-all duration-1000 w-full max-w-sm mx-auto xl:max-w-md ${
                  visibleCards.includes(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                } ${
                  expandedCard && expandedCard !== member.id 
                    ? 'opacity-40' 
                    : expandedCard === member.id 
                      ? 'opacity-100' 
                      : 'opacity-100'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`h-full w-full transition-all duration-300 cursor-pointer ${
                    expandedCard === member.id
                      ? "transform scale-105"
                      : "hover:transform hover:scale-[1.02]"
                  }`}
                  onClick={() => handleCardClick(member)}
                >
                  <ProfileCard
                    name={member.name}
                    title={member.title}
                    handle={member.handle}
                    status={member.status}
                    contactText={member.contactText}
                    avatarUrl={member.avatarUrl}
                    showUserInfo={true}
                    enableTilt={!isMobile} // Disable tilt on mobile for better performance
                    onContactClick={() => handleContactClick(member)}
                    className={`h-full ${expandedCard === member.id ? 'expanded' : ''}`}
                    bio={expandedCard === member.id ? member.bio : undefined}
                    email="user@example.com"
                    website="example.com"
                    linkedin="username"
                    github="username"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info - Mobile optimized */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20 space-y-4 sm:space-y-6 px-2">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Ready to Get Feedback?
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Our jury members are here to provide guidance, mentorship, and evaluate your innovative solutions. 
              {!isMobile && " Click on any card to learn more about them."}
              {isMobile && " Tap on any card to learn more about them."}
            </p>
          </div>

          {/* Tags - Better mobile wrapping */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8">
            {["Innovation", "Scalability", "Impact", "Technical Excellence"].map((tag, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 hover:border-gray-500/50 transition-colors duration-300"
              >
                <span className="text-gray-200 font-medium text-sm sm:text-base">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow - Smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 ${isMobile ? 'w-40 h-40' : 'w-80 h-80'} bg-white/2 rounded-full blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 ${isMobile ? 'w-40 h-40' : 'w-80 h-80'} bg-white/2 rounded-full blur-3xl`}></div>
      </div>

      {/* Enhanced custom styles */}
      <style jsx>{`
        /* Ensure smooth transitions and prevent layout shifts */
        .flex-1 {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Clean hover states - disabled on touch devices */
        @media (hover: hover) {
          .cursor-pointer:hover {
            transform: scale(1.02);
          }
        }
        
        .cursor-pointer.expanded {
          transform: scale(1.05);
        }

        /* Prevent horizontal scroll on mobile */
        @media (max-width: 768px) {
          .cursor-pointer:hover {
            transform: none;
          }
          
          /* Reduce motion for better mobile performance */
          @media (prefers-reduced-motion: reduce) {
            .transform,
            .transition-all {
              transform: none !important;
              transition: none !important;
            }
          }
        }

        /* Fix text rendering on mobile */
        @media (max-width: 640px) {
          h2 {
            word-break: break-word;
            hyphens: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Jury;