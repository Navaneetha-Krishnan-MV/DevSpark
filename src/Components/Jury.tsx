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
    bio: "Full-stack developer with expertise in React and Node.js.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "UI/UX Designer",
    handle: "sarahdesigns",
    status: "Online",
    avatarUrl: "https://i.pravatar.cc/300?img=2",
    contactText: "Message",
    bio: "Award-winning designer focused on user-centered design.",
  },
  {
    id: 3,
    name: "Alex Kumar",
    title: "Tech Lead",
    handle: "alextech",
    status: "Busy",
    avatarUrl: "https://i.pravatar.cc/300?img=3",
    contactText: "Schedule",
    bio: "Engineering leader with 10+ years in tech innovation.",
  },
];

const Jury: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      juryMembers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (member: JuryMember) => {
    setExpandedCard((prev) => (prev === member.id ? null : member.id));
    if (expandedCard !== member.id) {
      toast.success(`Viewing ${member.name}'s Profile`, {
        description: `Learn more about ${member.title}`,
        duration: 2000,
      });
    }
  };

  const handleContactClick = (member: JuryMember) => {
    toast.info(`Contacting ${member.name}`, {
      description: `Opening connection with ${member.title}...`,
      duration: 3000,
    });
    console.log(`Connecting with ${member.name} (@${member.handle})`);
  };

  return (
    <section className="w-full min-h-screen bg-black text-white py-5 px-4 relative overflow-hidden">
      {/* Scroll Shadows (Mobile) */}
      <div className="lg:hidden absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
      <div className="lg:hidden absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
          Meet Our Jury Panel
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Industry experts evaluating your journey. Tap or click to explore.
        </p>
      </div>

      {/* Mobile/Tablet Scroll */}
      <div className="block lg:hidden">
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 px-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollPaddingLeft: "1rem",
          }}
        >
          {juryMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex-shrink-0 snap-start transition-all transform duration-700 ${
                visibleCards.includes(index) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${expandedCard && expandedCard !== member.id ? "opacity-40" : "opacity-100"}`}
              style={{
                width: isMobile ? "280px" : "320px",
                minWidth: isMobile ? "280px" : "320px",
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div
                className={`h-full w-full transition duration-300 cursor-pointer ${
                  expandedCard === member.id ? "transform scale-105" : "active:scale-95"
                }`}
                onClick={() => handleCardClick(member)}
              >
                <ProfileCard
                  {...member}
                  showUserInfo
                  enableTilt={false}
                  bio={expandedCard === member.id ? member.bio : undefined}
                  onContactClick={() => handleContactClick(member)}
                  email="user@example.com"
                  website="example.com"
                  linkedin="username"
                  github="username"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4 text-gray-400 text-xs animate-pulse">
          <span className="mr-1">⬅️</span> Swipe to Explore <span className="ml-1">➡️</span>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {juryMembers.map((member, index) => (
            <div
              key={member.id}
              className={`transition-all transform duration-700 ${
                visibleCards.includes(index) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${expandedCard && expandedCard !== member.id ? "opacity-40" : "opacity-100"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`h-full w-full cursor-pointer transition duration-300 ${
                  expandedCard === member.id ? "transform scale-105" : "hover:scale-[1.02]"
                }`}
                onClick={() => handleCardClick(member)}
              >
                <ProfileCard
                  {...member}
                  showUserInfo
                  enableTilt={true}
                  bio={expandedCard === member.id ? member.bio : undefined}
                  onContactClick={() => handleContactClick(member)}
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
    </section>
  );
};

export default Jury;