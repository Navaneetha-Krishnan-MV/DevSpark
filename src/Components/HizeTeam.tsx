import React, { useState, useEffect } from "react";
import ProfileCard from "../UI/ProfileCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Tamanna from "/images/Tamanna.png";

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

const hizeTeamMembers: Speaker[] = [
  {
    id: 1,
    name: "Mr. Abhinav Gambhir",
    title: "Senior Manager",
    handle: "abhinavgambhir",
    company: "Oracle",
    avatarUrl: "https://www.ieeecshize.com/images/speakers/Abhinav.jpg",
    contactText: "Connect",
    bio: "He is a seasoned cloud professional with 17+ years of experience across Oracle, Microsoft, Red Hat, and HPE. Currently a Senior Manager at Oracle Cloud Infrastructure, he specializes in driving digital transformation with secure and high-performance cloud platforms. As part of the IEEE Leadership Team, he continues to inspire and contribute to the tech community.",
    email: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/abhinavgambhir/",
    github: ""
  },
  {
    id: 2,
    name: "Mrs. Tamanna Chhabra",
    title: "Senior Psychologist",
    handle: "tamannachhabra",
    company: "Northwell Health",
    avatarUrl: Tamanna,
    contactText: "Connect",
    bio: "Tamanna Chhabra is a Senior Psychologist at Northwell Health with extensive experience in behavioral therapy, clinical psychology, and mental health care. She has worked across leading institutions in the U.S. and India, supporting young adults through therapy, life transitions, and clinical supervision.",
    email: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/tamanna-chhabra-76709a29/",
    github: ""
  },
  {
    id: 3,
    name: "Mr. Atul Kumar Rao",
    title: "Co Lead",
    handle: "atulkumarrao",
    company: "IEEE CS SYP HIZE",
    avatarUrl: "https://www.ieeecshize.com/images/speakers/atul.png",
    contactText: "Connect",
    bio: "Currently serving as Chair of the IEEE JSSATEN Student Branch (2025–26), with active roles as Sectional Student Representative for IEEE RAS SAC, Co-Lead of IEEE CS SYP High Impact Zonal Events, and Co-Lead of the IEEE CS SYP Elevate Program. Also volunteering with IEEE R10 HTA, contributing to humanitarian technology projects while engaging thousands of students globally through impactful initiatives.",
    email: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/atulkumarrao/",
    github: ""
  },
  {
    id: 4,
    name: "Mr. Shaurya Mishra",
    title: "Co Lead",
    handle: "shauryamishra",
    company: "IEEE CS SYP HIZE",
    avatarUrl: "https://www.ieeecshize.com/images/speakers/Mishra.jpg",
    contactText: "Connect",
    bio: "Pursuing B.Tech in CSE (Batch ’26) with hands-on experience as a Data Analyst Intern at Airports Authority of India and former IoT Intern at Honda Cars India. Currently serving as Chairperson of IEEE MSIT and President of eCell MSIT, leading initiatives that blend technology, leadership, and entrepreneurship. Passionate about innovation and community building, actively working on Coding Catalyst to inspire and empower fellow students in tech.",
    email: "",
    website: "",
    linkedin: "https://www.linkedin.com/in/shauryamishra2504/",
    github: ""
  },
];

const HizeTeam: React.FC = () => {
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
    hizeTeamMembers.forEach((_, index) => {
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
      prev >= hizeTeamMembers.length - 1 ? 0 : prev + 1
    );
  };

  const prevCard = () => {
    setCurrentMobileIndex((prev) => 
      prev <= 0 ? hizeTeamMembers.length - 1 : prev - 1
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
         Meet the Hize Team
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        The IEEE Hize Team brings their vision, dedication, and expertise to create an engaging platform where students can learn from industry leaders, gain real-world insights, and explore opportunities in tech.
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#ff7200] to-transparent mx-auto"></div>
      </div>

      {/* Cards Display */}
      <div className="w-full">
        {/* Mobile View - Single Card */}
        <div className="block md:hidden">
          <div className="relative max-w-sm mx-auto">
            <div className="relative h-96 mb-6">
              {hizeTeamMembers.map((member, index) => (
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
              {hizeTeamMembers.map((_, index) => (
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
          {hizeTeamMembers.map((member, index) => (
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
          {hizeTeamMembers.map((member, index) => (
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

export default HizeTeam;