import React, { useState, useEffect } from "react";
import ProfileCard from "../UI/ProfileCard";
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
    name: "Palak Awasthi",
    title: "Software Engineer",
    handle: "palakawasthi",
    company: "Salesforce",
    avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQFIGYxyfXm2eA/profile-displayphoto-shrink_400_400/B56ZSitCNiHQAg-/0/1737896504048?e=1757548800&v=beta&t=jVi1RL_uvEwOXMOP99lVK_wPTSxUjilUeru--ziFTL0",
    contactText: "Connect",
    bio: "Engineer at Salesforce | Women Techmakers Ambassador @ Google | A mentor, speaker, and hackathon judge with 100K+ LinkedIn followers, she shares insights on DSA, AI/ML, career growth, and hiring. Known for inspiring talks and real-world guidance, she's here to help you level up your journey in tech.",
    email: "",
    website: "https://www.youtube.com/@palakawasthi1",
    linkedin: "https://www.linkedin.com/in/palakawasthi/",
    github: ""
  },
  {
    id: 2,
    name: "Kshitiz Jaiswal",
    title: "Software Engineer",
    handle: "kshitizjaiswal",
    company: "Google",
    avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQEJnkAqZ4S1zw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723048832371?e=1757548800&v=beta&t=at-dFfDzsJ6D8br_IVnIqDnNPHU277oWYO8HuqoC9IY",
    contactText: "Message",
    bio: "SWE at Google | Candidate Master on Codeforces | With experience at Amazon and Goldman Sachs, he blends deep algorithmic expertise with real-world software engineering. As a Codeforces Candidate Master, he’s passionate about competitive programming, system design, and mentoring. Get ready to gain practical strategies from someone who’s cracked the toughest tech challenges.",
    email: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/kshitizjaiswal/",
    github: ""
   },
//   {
//     id: 3,
//     name: "Hariharan Murugesan",
//     title: "AI/ML Expert",
//     handle: "hariharanmurugesan",
//     company: "Velam AI",
//     avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQHnJFZ60ycsYQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725420529833?e=1757548800&v=beta&t=7j7hxHMN_yW24ZjQqirtdeyIcckIy_jqQ8sS2_i8o-A",
//     contactText: "Schedule",
//     bio: "Founder & CEO of Velam AI | Driven by an indomitable spirit and a passion for transforming bold ideas into impactful products with precision and craftsmanship.",
//     email: "",
//     website:"https://www.velam.ai/",
//     linkedin: "https://www.linkedin.com/in/hari-murugan/",
//     github: ""
//   },
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
    <section id="speaker" className="w-full min-h-[80vh] bg-black text-white pt-5 pb-2 px-4 relative overflow-hidden">
      {/* Scroll Shadows (Mobile) - Only for tablet scroll view */}
      <div className="md:hidden lg:block absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" 
           style={{ display: isMobile ? 'none' : 'block' }} />
      <div className="md:hidden lg:block absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" 
           style={{ display: isMobile ? 'none' : 'block' }} />

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00]">
          Learn from the Best
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Get inspired by our guest speakers. Hear their stories, learn industry insights, and discover what it takes to stand out in tech. Don't just compete — grow!.Tap or click to explore.
        </p>
      </div>

      {/* Mobile Single Card Display */}
      <div className="block md:hidden">
        <div className="relative max-w-sm mx-auto">
          {/* Card Container */}
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

      {/* Desktop Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 max-w-5xl mx-auto">
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