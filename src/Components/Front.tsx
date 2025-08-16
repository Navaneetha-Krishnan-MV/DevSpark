"use client"

// import type React from "react"
import { useState, useEffect, lazy, Suspense } from "react"
import AOS from "aos"
import "aos/dist/aos.css"


const Spline = lazy(() => import("@splinetool/react-spline"))

// Removing Lightning Component

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [sparkText, setSparkText] = useState("")
  const [sparkDeleting, setSparkDeleting] = useState(false)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  // Check screen size - with debounce for better performance
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    
    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkScreenSize, 100)
    }
    
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
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
      duration: isMobile ? 600 : 1000, // Shorter animations on mobile
      once: true, // Critical for performance - animations only happen once
      easing: "ease-out-cubic",
      offset: 50, // Reduced offset for mobile
      disable: isMobile ? 'phone' : false, // Disable on very small screens if needed
    })
  }, [isMobile])

  const handleSplineLoad = () => {
    setIsSplineLoaded(true)
  }

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
      className="overflow-hidden"
    >
    
      {!isMobile && (
        <div 
          className="bg-black"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "60vw",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
            opacity: isSplineLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in"
          }}
        >
          <Suspense fallback={<div />}>
          <Spline scene="/Circuit.splinecode" onLoad={handleSplineLoad} />
          </Suspense>
        </div>
      )}

   
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-start",
          width: "100%", // Changed from 100vw to prevent horizontal scrolling issues
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "6rem 1rem 2rem 1rem" : "0",
          paddingTop: isMobile ? "6rem" : "0",
        }}
      >
       
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
       
            <div 
              className="flex flex-col"
              data-aos="fade-right" 
              data-aos-delay="300"
            >
              <div style={{
                marginBottom: isMobile ? "0.5rem" : "1rem"
              }}>
                <img 
                  src="/HIZE IEEE.png" 
                  alt="IEEE SYP HIZE" 
                  className="w-auto"
                  style={{
                    height: isMobile ? '4rem' : '6rem',
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    margin: '0.5rem 0'
                  }}
                />
              </div>
              <p 
                className="text-gray-300"
                style={{ 
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  marginBottom: isMobile ? "0.5rem" : "0.75rem"
                }}
              >
                In Collaboration with
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.25rem',
                width: '100%'
              }}>
                <h3
                  className="text-gray-100 font-bold"
                  style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    margin: 0,
                    paddingLeft: '4px'
                  }}
                >
                  IEEE Computer Society
                </h3>
                <p 
                  className="text-gray-100 font-medium"
                  style={{ 
                    fontSize: isMobile ? "1.4rem" : "1.8rem",
                    margin: 0,
                    paddingLeft: '4px',
                    fontWeight: 'bold'
                  }}
                >
                  KPRIET
                </p>
              </div>
            </div>

            <p 
              className="bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent text-lg" 
              data-aos="fade-right" 
              data-aos-delay="400"
              style={{ 
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                fontWeight: 'bold',
                margin: '0.5rem 0'
              }}
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
                  fontSize: isMobile ? "2.2rem" : "clamp(2.5rem, 6vw, 4rem)"
                }}
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <span className="text-white">DEV</span>
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7200] to-[#ffae00]"
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
                      color: "#ff7200",
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
                <svg className="w-5 h-5 mr-2 text-[#ff7200]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                12-13 September 2025
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
                {["DevForge - Hackathon", "Mosaic - Bootcamp", "Bizpulse - Business"].map((track) => (
                  <span
                    key={track}
                    className="bg-gradient-to-r from-[#ff7200]/10 to-[#ffae00]/10 border border-transparent text-[#ffae00] px-4 py-2 rounded-lg backdrop-blur-sm text-center"
                    style={{ fontSize: isMobile ? "0.875rem" : "1rem" }}
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>

            {/* Prizes and Registration */}
            <div className="w-full" data-aos="fade-up" data-aos-delay="800">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
                {/* Prizes Section - Left Side */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                      <span 
                        className="bg-gradient-to-r from-[#ff7200] to-[#ffae00] bg-clip-text text-transparent text-lg font-bold whitespace-nowrap"
                      >
                        Prizes Worth
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                    </div>
                    
                    <h3 className="font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600" style={{ fontSize: isMobile ? "1.75rem" : "2.25rem" }}>
                        INR 85,000+
                      </span>
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 w-full">
                      <div className="flex items-center gap-4">
                        <div className="text-center px-4 py-2 rounded-lg bg-gradient-to-r from-orange-900/20 to-orange-900/20 border border-orange-500/20">
                          <p className="text-orange-400 text-sm font-medium">IEEE Members</p>
                          <p className="text-xl font-bold text-white">₹500</p>
                        </div>
                        <div className="text-center px-4 py-2 rounded-lg bg-gradient-to-r from-orange-900/20 to-orange-900/20 border border-orange-500/20">
                          <p className="text-orange-400 text-sm font-medium">Non-IEEE</p>
                          <p className="text-xl font-bold text-white">₹600</p>
                        </div>
                      </div>
                      <a 
                        href="https://www.dev-spark.in/register" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#ff7200] to-[#ffae00] text-white px-8 py-3 rounded-lg font-medium hover:from-[#ff7a0d] hover:to-[#ffb82e] transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap text-base ml-0 sm:ml-2 mt-2 sm:mt-0"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>
                {/* Space for additional content on the right if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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