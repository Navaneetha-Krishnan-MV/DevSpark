"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import ProfileCard from "../UI/ProfileCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

interface JuryMember {
  id: number
  name: string
  title: string
  handle: string
  status: string
  avatarUrl: string
  contactText: string
  bio?: string
  email: string
  website: string
  linkedin: string
  github: string
}

const juryMembers: JuryMember[] = [
  {
    id: 1,
    name: "Maharaj M",
    title: "Cybersecurity Expert",
    handle: "maharajm",
    status: "Available",
    avatarUrl:
      "https://media.licdn.com/dms/image/v2/C5603AQG8_pBskNFTiA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1650554132670?e=1756944000&v=beta&t=Mv398YQMMkVqnwjHbeFJpXg_sW9jEJnFFAKbXPRJVGs",
    contactText: "Connect",
    bio: "Founder and CEO of BCBUZZ Technologies Pvt. Ltd., with over a decade of experience in the IT industry. A seasoned professional specializing in Enterprise Blockchain solutions, Cybersecurity frameworks, and Artificial Intelligence applications. Passionate about leveraging cutting-edge technology to drive digital transformation.",
    email: "maharaj@bcbuzz.io",
    website: "https://in100w.com/about_me/",
    linkedin: "https://www.linkedin.com/in/maharaj-m/",
    github: "",
  },
  {
    id: 2,
    name: "Nigun Sanjai R",
    title: "Full Stack ML Dev | UI/UX Designer",
    handle: "nigunsanjai",
    status: "Online",
    avatarUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQGCciZjB7G96g/profile-displayphoto-shrink_400_400/B4DZaouSBcHwAg-/0/1746587428791?e=1756944000&v=beta&t=lEpvujZhcSFJh3H2Jqh3qDqQkvdHdgaFAjxdbT9rnnA",
    contactText: "Message",
    bio: "A Software Development Engineer at Autodesk with hands-on experience in full-stack Java development and a strong foundation in scalable backend systems. As a passionate freelancer and competitive programmer, I bring a problem-solving mindset, deep technical expertise, and a keen interest in innovation. I enjoy mentoring budding developers and evaluating creative solutions",
    email: "radha.nigun@gmail.com",
    website: "",
    linkedin: "https://www.linkedin.com/in/nigun-sanjai-radhakrishnan-650a011b6/",
    github: "https://github.com/NigunSanjai",
  },
]

const Jury: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [, setIsTablet] = useState(false)
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      juryMembers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index])
        }, index * 150)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (member: JuryMember) => {
    // Don't handle click if we're currently scrolling
    if (isScrolling) return

    setExpandedCard((prev) => (prev === member.id ? null : member.id))
    if (expandedCard !== member.id) {
      toast.success(`Viewing ${member.name}'s Profile`, {
        description: `Learn more about ${member.title}`,
        duration: 2000,
      })
    }
  }

  const handleContactClick = (member: JuryMember) => {
    toast.info(`Contacting ${member.name}`, {
      description: `Opening connection with ${member.title}...`,
      duration: 3000,
    })
    console.log(`Connecting with ${member.name} (@${member.handle})`)
  }

  const handleScrollStart = () => {
    setIsScrolling(true)
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
  }

  const handleScrollEnd = () => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }

  const nextCard = () => {
    setCurrentMobileIndex((prev) => (prev >= juryMembers.length - 1 ? 0 : prev + 1))
  }

  const prevCard = () => {
    setCurrentMobileIndex((prev) => (prev <= 0 ? juryMembers.length - 1 : prev - 1))
  }

  return (
    <section id="jury" className="w-full min-h-screen bg-black text-white py-5 px-4 relative overflow-hidden">
      {/* Scroll Shadows (Tablet) */}
      <div
        className="md:hidden lg:block absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none"
        style={{ display: isMobile ? "none" : "block" }}
      />
      <div
        className="md:hidden lg:block absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none"
        style={{ display: isMobile ? "none" : "block" }}
      />

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
          Meet Our Jury Panel
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Industry experts evaluating your journey. {isMobile ? "Navigate to explore." : "Tap or click to explore."}
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
                    ? "translate-x-0 opacity-100 scale-100"
                    : index < currentMobileIndex
                      ? "-translate-x-full opacity-0 scale-95"
                      : "translate-x-full opacity-0 scale-95"
                } ${visibleCards.includes(index) ? "" : "translate-y-10"}`}
                style={{ transitionDelay: visibleCards.includes(index) ? "0ms" : `${index * 150}ms` }}
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
                  index === currentMobileIndex ? "bg-cyan-400 w-6" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Scroll - IMPROVED */}
      <div className="hidden md:block lg:hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 px-4 scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollPaddingLeft: "1rem",
            scrollBehavior: "smooth",
          }}
          onTouchStart={handleScrollStart}
          onTouchEnd={handleScrollEnd}
          onMouseDown={handleScrollStart}
          onMouseUp={handleScrollEnd}
          onScroll={handleScrollStart}
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
                className={`h-full w-full transition duration-300 ${
                  expandedCard === member.id ? "transform scale-105" : ""
                } ${!isScrolling ? "cursor-pointer hover:scale-[1.02]" : "cursor-grabbing"}`}
                onClick={() => handleCardClick(member)}
                onMouseDown={(e) => {
                  // Prevent text selection during potential drag
                  e.preventDefault()
                }}
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
        <div className="flex justify-center mt-6 text-gray-300 text-sm animate-pulse">
          <span className="mr-2">⬅️</span> Scroll to Explore More <span className="ml-2">➡️</span>
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
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Jury
