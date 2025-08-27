import React, { useState, useEffect } from "react";
import ProfileCard from "../../UI/ProfileCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Speaker {
  id: number;
  name: string;
  title: string;
  handle: string;
  company: string;
  avatarUrl: string;
  contactText: string;
  bio?: string;
  email: string;
  website: string;
  linkedin: string;
  github: string;
}

const juryMembers: Speaker[] = [
  {
    id: 1,
    name: "Ms. Abinash S",
    title: "Senior Engineer",
    handle: "abinash",
    company: "Presidio",
    avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQFEDNCkYXzxqg/profile-displayphoto-scale_100_100/B56ZjdTvF7HAAo-/0/1756059596911?e=1758758400&v=beta&t=d3GDcS5BmYB6tukBO9NmYQZ4IHr4aPsPhQBu-7fE7Io",
    contactText: "Connect",
    bio: "He is an AI Engineer, Full-Stack Developer, and Cloud Solutions Architect, passionate about building scalable solutions. As a Tech Skills Trainer, he empowers learners with practical knowledge in AI, cloud, and development.",
    email: "",
    website: "https://www.self.so/abinash-s",
    linkedin: "https://www.linkedin.com/in/s-abinash/",
    github: "https://github.com/s-abinash"
  },
  {
    id: 2,
    name: "Mr. Shanmuga Priya M",
    title: "Software Engineer",
    handle: "shanmugapriya",
    company: "Presidio",
    avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQEsRTIvpyWM5g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731174422276?e=1758758400&v=beta&t=WRONN2DLGqBPe_F8dpc5AbfEMC5lcGn4O0TJre6HIHA",
    contactText: "Connect",
    bio: "A Software Engineer at Presidio, with prior experience as an Associate Software Engineer and Software Engineer Intern at the same company. Completed a summer internship at Zoho, gaining exposure to real-world development and problem-solving. With hands-on experience from internships to full-time roles, brings strong skills in software engineering, teamwork, and building scalable solutions.",
    email: "",
    website:"",
    linkedin: "https://www.linkedin.com/in/priyashan007/",
    github: ""
  },
];

const Jury: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsTablet] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

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

  const handleCardClick = (member: Speaker) => {
    setExpandedCard((prev) => (prev === member.id ? null : member.id));
    if (expandedCard !== member.id) {
      toast.success(`Viewing ${member.name}'s Profile`, {
        description: `Learn more about ${member.title}`,
        duration: 2000,
      });
    }
  };

  const handleContactClick = (member: Speaker) => {
    toast.info(`Contacting ${member.name}`, {
      description: `Opening connection with ${member.title}...`,
      duration: 3000,
    });
    console.log(`Connecting with ${member.name} (@${member.handle})`);
  };

  const nextCard = () => {
    setCurrentMobileIndex((prev) => 
      prev >= juryMembers.length - 1 ? 0 : prev + 1
    );
  };

  const prevCard = () => {
    setCurrentMobileIndex((prev) => 
      prev <= 0 ? juryMembers.length - 1 : prev - 1
    );
  };

  return (
    <section id="speaker" className="w-full min-h-[80vh]  bg-black text-white pt-5 pb-20 px-4 relative overflow-hidden">
      {/* Scroll Shadows (Mobile) - Only for tablet scroll view */}
      <div className="md:hidden lg:block absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" 
           style={{ display: isMobile ? 'none' : 'block' }} />
      <div className="md:hidden lg:block absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" 
           style={{ display: isMobile ? 'none' : 'block' }} />

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00]">
        Meet the Minds Behind Agentic AI
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Get inspired by our resource persons at the Agentic AI Tech Bootcamp. From AI fundamentals to advanced agentic workflows, gain knowledge directly from experts shaping the future.
        Don’t just learn — transform, build, and grow with us at Mosaic!
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#ff7200] to-transparent mx-auto"></div>
      </div>

      {/* Cards Display */}
      <div className="w-full">
        {/* Mobile View - Single Card */}
        <div className="block md:hidden">
          <div className="relative max-w-sm mx-auto">
            <div className="relative h-96 mb-6">
              {juryMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`absolute inset-0 transition-all duration-500 transform ${
                    index === currentMobileIndex 
                      ? 'translate-x-0 opacity-100 scale-100' 
                      : index < currentMobileIndex 
                        ? '-translate-x-full opacity-0 scale-95'
                        : 'translate-x-full opacity-0 scale-95'
                  } ${
                    visibleCards.includes(index) ? '' : 'translate-y-10'
                  }`}
                  style={{ transitionDelay: visibleCards.includes(index) ? '0ms' : `${index * 150}ms` }}
                >
                  <div
                    className="h-full w-full cursor-pointer transition duration-300 active:scale-95"
                    onClick={() => handleCardClick(member)}
                  >
                    <ProfileCard
                      {...member}
                      showUserInfo
                      enableTilt={false}
                      bio={expandedCard === member.id ? member.bio : undefined}
                      onContactClick={() => handleContactClick(member)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-4 bottom-4 flex gap-2">
              <button
                onClick={prevCard}
                className="bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95"
                aria-label="Previous card"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextCard}
                className="bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95"
                aria-label="Next card"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {juryMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMobileIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentMobileIndex 
                      ? 'bg-[#ff7200] w-6' 
                      : 'bg-gray-600 hover:bg-[#ffae00]'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Scroll */}
      <div className="hidden md:block lg:hidden">
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
                width: "320px",
                minWidth: "320px",
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

      {/* Desktop View - Three Cards */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap justify-center gap-8 px-4 max-w-7xl mx-auto">
          {juryMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] transition-all duration-500 transform ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="h-full cursor-pointer transition duration-300 hover:scale-105 active:scale-95"
                onClick={() => handleCardClick(member)}
              >
                <ProfileCard
                  {...member}
                  showUserInfo
                  enableTilt={true}
                  bio={expandedCard === member.id ? member.bio : undefined}
                  onContactClick={() => handleContactClick(member)}
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