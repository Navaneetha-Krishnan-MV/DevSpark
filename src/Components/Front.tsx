"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Spline from "@splinetool/react-spline"

// Lightning Component
const Lightning: React.FC<{ hue: number; xOffset: number; speed: number; intensity: number; size: number }> = ({
  hue,
  //   xOffset,
  speed,
  //   intensity,
  //   size,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      marginLeft: "",
      background: `radial-gradient(ellipse at center, hsla(${hue}, 70%, 50%, 0.1) 0%, transparent 70%)`,
      animation: `lightning-pulse ${3 / speed}s ease-in-out infinite`,
      zIndex: 0,
      pointerEvents: "none",
    }}
  />
)

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  // Typewriter effect for "SPARK" (fix: prevent K from moving to next line)
  const [sparkText, setSparkText] = useState("")
  const [sparkDeleting, setSparkDeleting] = useState(false)

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const fullText = "SPARK"
    let timeout: NodeJS.Timeout

    if (!sparkDeleting && sparkText.length < fullText.length) {
      timeout = setTimeout(() => {
        setSparkText(fullText.slice(0, sparkText.length + 1))
      }, 180)
    } else if (!sparkDeleting && sparkText.length === fullText.length) {
      timeout = setTimeout(() => setSparkDeleting(true), 1200)
    } else if (sparkDeleting && sparkText.length > 0) {
      timeout = setTimeout(() => {
        setSparkText(fullText.slice(0, sparkText.length - 1))
      }, 100)
    } else if (sparkDeleting && sparkText.length === 0) {
      timeout = setTimeout(() => setSparkDeleting(false), 600)
    }

    return () => clearTimeout(timeout)
  }, [sparkText, sparkDeleting])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Changed to true for better performance
      easing: "ease-out-cubic",
      offset: 100,
    })
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        background: "black",
        position: "relative",
        fontFamily: "sans-serif",
        fontSize: "16px",
        boxSizing: "border-box"
      }}
      data-aos="fade-in"
      data-aos-duration="1200"
      id="home"
    >
      {/* Spline battery spark as background - only show on desktop */}
      {!isMobile && (
        <div className="bg-black"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "60vw", // Move to right side and make smaller
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Spline
            scene="https://prod.spline.design/P3cA3Sxw3sDqofWJ/scene.splinecode" 
          />
        </div>
      )}

      {/* Lightning overlay - only on desktop */}
      {!isMobile && <Lightning hue={200} xOffset={0} speed={1} intensity={1} size={1} />}

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-start",
          width: "100vw",
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "6rem 1rem 2rem 1rem" : "0", // Added top padding for mobile nav
          paddingTop: isMobile ? "6rem" : "0", // Extra top padding to avoid nav overlap
        }}
      >
        {/* Content */}
        <div
          style={{
            maxWidth: isMobile ? "100%" : "50%",
            width: "100%",
            padding: isMobile ? "0" : "2.5rem 1.2rem 2.5rem 5vw",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
            zIndex: 3,
          }}
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <div className="relative z-10 w-full flex flex-col pt-4 md:pt-2">
            {/* Department */}
            <h2 
              className="text-gray-300" 
              data-aos="fade-right" 
              data-aos-delay="300"
              style={{ 
                fontSize: isMobile ? "1rem" : "1.3rem",
                lineHeight: isMobile ? "1.3" : "1.4",
                marginBottom: isMobile ? "0.75rem" : "1.25rem",
                fontWeight: "400"
              }}
            >
              IEEE Computer Society KPRIET
            </h2>

            <p 
              className="text-cyan-400 text-lg " 
              data-aos="fade-right" 
              data-aos-delay="400"
              style={{ fontSize: isMobile ? "1rem" : "1.125rem" }}
            >
              Organize
            </p>

            {/* Main Title with animated underline */}
            <div style={{ position: "relative", marginBottom: isMobile ? "0.5rem" : "1rem" }}>
              <h1
                className="font-bold"
                style={{ 
                  display: "inline-block", 
                  position: "relative", 
                  whiteSpace: "nowrap",
                  fontSize: isMobile ? "2.5rem" : "clamp(3rem, 8vw, 6rem)"
                }}
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <span className="text-white">DEV</span>
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600"
                  style={{
                    minWidth: isMobile ? "auto" : 90,
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    verticalAlign: "bottom",
                  }}
                >
                  {sparkText}
                  <span
                    style={{
                      display: "inline-block",
                      width: "1ch",
                      color: "#06b6d4",
                      opacity: sparkDeleting || sparkText.length < 5 ? 1 : 0,
                      animation: "blink-cursor 1s steps(1) infinite",
                    }}
                  >
                    |
                  </span>
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p 
              className="text-gray-300" 
              data-aos="fade-right" 
              data-aos-delay="600"
              style={{ 
                fontSize: isMobile ? "1.125rem" : "1.5rem",
                marginBottom: isMobile ? "1rem" : "1.5rem"
              }}
            >
              Where Ideas Ignite
            </p>

            {/* Event Details */}
            <div 
              className="mb-8 space-y-4" 
              data-aos="fade-up" 
              data-aos-delay="700"
              style={{ marginBottom: isMobile ? "1.5rem" : "2rem" }}
            >
              <div 
                className="flex items-center text-white"
                style={{ 
                  fontSize: isMobile ? "1rem" : "1.125rem",
                  justifyContent: isMobile ? "center" : "flex-start"
                }}
              >
                <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                25-26 July 2025
              </div>
            </div>

            {/* Tracks */}
            <div 
              className="mb-12" 
              data-aos="fade-up" 
              data-aos-delay="800"
              style={{ marginBottom: isMobile ? "2rem" : "3rem" }}
            >
              <h3 
                className="text-white text-xl mb-4"
                style={{ fontSize: isMobile ? "1.125rem" : "1.25rem" }}
              >
                Event Tracks
              </h3>
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
                {["Fullstack Development", "AI/ML", "Cyber Security"].map((track) => (
                  <span
                    key={track}
                    className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-transparent text-cyan-300 px-4 py-2 rounded-lg backdrop-blur-sm text-center"
                    style={{ fontSize: isMobile ? "0.875rem" : "1rem" }}
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>

            {/* Prizes and Registration */}
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="800">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                <span 
                  className="text-cyan-400 font-medium"
                  style={{ fontSize: isMobile ? "1rem" : "1.125rem" }}
                >
                  Prizes Worth
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              </div>
              
              <h3 
                className="font-bold text-center"
                style={{ fontSize: isMobile ? "2rem" : "2.5rem" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  INR 85,000+
                </span>
              </h3>
              
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                <div className="text-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20">
                  <p className="text-cyan-400 font-medium">IEEE Members</p>
                  <p className="text-2xl font-bold text-white">₹500</p>
                </div>
                <div className="text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                  <p className="text-blue-400 font-medium">Non-IEEE</p>
                  <p className="text-2xl font-bold text-white">₹600</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <a 
                  href="https://unstop.com/o/SzV3A1F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lightning-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes glow-curve {
          0%, 100% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  )
}