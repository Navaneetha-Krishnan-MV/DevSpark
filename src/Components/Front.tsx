"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import a from "/ai3.png"
import AOS from "aos"
import "aos/dist/aos.css"
import Spline from "@splinetool/react-spline"

// Lightning Component
const Lightning: React.FC<{ hue: number; xOffset: number; speed: number; intensity: number; size: number }> = ({
  hue,
  speed,
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
  const [asciiArt, setAsciiArt] = useState<string>("")
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Typewriter effect for "SPARK"
  const [sparkText, setSparkText] = useState("")
  const [sparkDeleting, setSparkDeleting] = useState(false)

  // Enhanced responsive check
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width <= 768)
      setIsTablet(width > 768 && width <= 1400)
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

  const resolution = 0.4
  const charSets = { minimal: " .:█" }
  const charSet = "minimal"

  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      convertToAscii()
    }
    img.src = a
  }, [])

  useEffect(() => {
    if (asciiArt) renderToCanvas()
  }, [asciiArt])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out-cubic",
      offset: 100,
    })
  }, [])

  const convertToAscii = () => {
    if (!imageRef.current) return
    const img = imageRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const width = Math.floor(img.width * resolution)
    const height = Math.floor(img.height * resolution)
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    const data = imageData.data
    const chars = charSets[charSet as keyof typeof charSets]
    const fontAspect = 0.5
    const widthStep = Math.ceil(img.width / width)
    const heightStep = Math.ceil(img.height / height / fontAspect)
    let result = ""
    for (let y = 0; y < img.height; y += heightStep) {
      for (let x = 0; x < img.width; x += widthStep) {
        const pos = (y * img.width + x) * 4
        const r = data[pos]
        const g = data[pos + 1]
        const b = data[pos + 2]
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
        const charIndex = Math.floor(brightness * (chars.length - 1))
        result += chars[charIndex]
      }
      result += "\n"
    }
    setAsciiArt(result)
  }

  const renderToCanvas = () => {
    if (!outputCanvasRef.current) return
    const canvas = outputCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const lines = asciiArt.split("\n").filter((line) => line.length > 0)
    const maxLineLength = Math.max(...lines.map((line) => line.length))
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const fontSizeByWidth = Math.floor((viewportWidth * 0.7) / (maxLineLength * 0.6))
    const fontSizeByHeight = Math.floor((viewportHeight * 0.8) / lines.length)
    const fontSize = Math.max(10, Math.min(fontSizeByWidth, fontSizeByHeight, 48))
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"
    const lineHeight = fontSize
    const charWidth = fontSize * 0.6
    canvas.width = maxLineLength * charWidth
    canvas.height = lines.length * lineHeight
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"
    ctx.fillStyle = "white"
    lines.forEach((line, lineIndex) => {
      ctx.fillText(line, 0, lineIndex * lineHeight)
    })
  }

  // State to track robot loaded
  const [, setRobotLoaded] = useState(false)

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "black",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
      data-aos="fade-in"
      data-aos-duration="1200"
      id="home"
    >
      {/* Spline battery spark as full-page background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Spline
          scene="https://prod.spline.design/FDMBklIDpExNXnEQ/scene.splinecode"
        />
      </div>

      {/* Lightning overlay */}
      <Lightning hue={200} xOffset={0} speed={1} intensity={1} size={1} />

      {/* Responsive layout container */}
      <div className={`${isMobile || isTablet ? "flex flex-col min-h-screen" : "flex flex-row h-screen"} w-full relative z-2`}>
        {/* Content section */}
        <div
          className={`${
            isMobile ? "w-full px-4 py-6 flex-1" : 
            isTablet ? "w-full px-5 py-8 flex-1" : 
            "flex-1 max-w-[700px] min-w-[350px] px-6 py-10"
          } flex flex-col justify-center relative z-3`}
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <div className={`${isMobile || isTablet ? "text-center" : "text-left"} w-full`}>
            {/* Department */}
            <h2
              className={`${isMobile ? "text-sm sm:text-base mb-2" : isTablet ? "text-base lg:text-lg mb-3" : "text-xl mb-4"} text-gray-300`}
              data-aos="fade-right"
              data-aos-delay="300"
            >
              Department of Computer Science and Engineering
            </h2>

            <p
              className={`text-cyan-400 ${isMobile ? "text-sm mb-3" : isTablet ? "text-base mb-4" : "text-lg mb-6"}`}
              data-aos="fade-right"
              data-aos-delay="400"
            >
              Organize
            </p>

            {/* Main Title */}
            <div className={`relative ${isMobile ? "mb-4" : isTablet ? "mb-5" : "mb-10"}`}>
              <h1
                className={`${
                  isMobile ? "text-3xl xs:text-4xl" : 
                  isTablet ? "text-4xl lg:text-5xl" : 
                  "text-5xl md:text-7xl lg:text-8xl"
                } font-bold inline-block relative whitespace-nowrap`}
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <span className="text-white">DEV</span>
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600"
                  style={{
                    minWidth: isMobile ? 50 : isTablet ? 60 : 90,
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
              className={`${isMobile ? "text-base mb-5" : isTablet ? "text-lg mb-6" : "text-xl md:text-2xl mb-8"} text-gray-300`}
              data-aos="fade-right"
              data-aos-delay="600"
            >
              Where Ideas Ignite
            </p>

            {/* Event Details */}
            <div className={`${isMobile ? "mb-4" : isTablet ? "mb-5" : "mb-8"} space-y-4`} data-aos="fade-up" data-aos-delay="700">
              <div
                className={`flex items-center ${isMobile || isTablet ? "justify-center" : ""} text-white ${isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg"}`}
              >
                <svg className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} mr-2 text-cyan-400`} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                28-29 July 2025
              </div>
            </div>

            {/* Tracks */}
            <div className={`${isMobile ? "mb-5" : isTablet ? "mb-6" : "mb-12"}`} data-aos="fade-up" data-aos-delay="800">
              <h3 className={`text-white ${isMobile ? "text-base mb-2" : isTablet ? "text-lg mb-3" : "text-xl mb-4"}`}>Event Tracks</h3>
              <div className={`flex flex-wrap gap-2 sm:gap-3 ${isMobile || isTablet ? "justify-center" : ""}`}>
                {["Fullstack Development", "AI/ML", "Cyber Security"].map((track) => (
                  <span
                    key={track}
                    className={`bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-transparent text-cyan-300 ${
                      isMobile ? "px-2 py-1 text-xs" : 
                      isTablet ? "px-3 py-2 text-sm" : 
                      "px-4 py-2"
                    } rounded-lg backdrop-blur-sm`}
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>

            {/* Prizes and Registration */}
            <div className="space-y-4 sm:space-y-6" data-aos="fade-up" data-aos-delay="800">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                <span className={`text-cyan-400 ${isMobile ? "text-xs" : isTablet ? "text-sm" : "text-lg"} font-medium whitespace-nowrap`}>Prizes Worth</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              </div>

              <h3 className={`${
                isMobile ? "text-xl" : 
                isTablet ? "text-2xl" : 
                "text-3xl md:text-4xl"
              } font-bold text-white text-center`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  INR 85,000+
                </span>
              </h3>

              <div className={`flex ${isMobile ? "flex-col gap-2" : isTablet ? "flex-row gap-3" : "flex-row gap-4"} justify-center mt-4 sm:mt-6`}>
                <div
                  className={`text-center ${
                    isMobile ? "px-3 py-2" : 
                    isTablet ? "px-4 py-2" : 
                    "px-6 py-3"
                  } rounded-lg bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20`}
                >
                  <p className={`text-cyan-400 ${isMobile ? "text-xs" : ""} font-medium`}>IEEE Members</p>
                  <p className={`${
                    isMobile ? "text-lg" : 
                    isTablet ? "text-xl" : 
                    "text-2xl"
                  } font-bold text-white`}>₹500</p>
                </div>
                <div
                  className={`text-center ${
                    isMobile ? "px-3 py-2" : 
                    isTablet ? "px-4 py-2" : 
                    "px-6 py-3"
                  } rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20`}
                >
                  <p className={`text-blue-400 ${isMobile ? "text-xs" : ""} font-medium`}>Non-IEEE</p>
                  <p className={`${
                    isMobile ? "text-lg" : 
                    isTablet ? "text-xl" : 
                    "text-2xl"
                  } font-bold text-white`}>₹600</p>
                </div>
              </div>

              <div className={`flex ${isMobile ? "flex-col gap-2 mt-4" : "flex-row gap-3 mt-6"} justify-center items-center`}>
                <button
                  className={`${
                    isMobile ? "px-3 py-1.5 text-xs w-full sm:w-auto" : 
                    isTablet ? "px-4 py-2 text-sm" : 
                    "px-5 py-2 text-sm"
                  } bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap inline-block`}
                  onClick={() => (window.location.href = "#register")}
                >
                  Register Now
                </button>
                <button
                  className={`${
                    isMobile ? "px-3 py-1.5 text-xs w-full sm:w-auto" : 
                    isTablet ? "px-4 py-2 text-sm" : 
                    "px-5 py-2 text-sm"
                  } border border-cyan-500/50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/10 transition-colors whitespace-nowrap inline-block`}
                  onClick={() => (window.location.href = "#sponsor")}
                >
                  Become a Sponsor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Model section - now renders for tablets too, but with adjusted size */}
        {(!isMobile) && (
          <div className={`${isTablet ? "h-[40vh] w-full mt-4" : "flex-1"} flex items-center justify-center relative`}>
            <div
              style={{
                width: isTablet ? "100%" : "120%",
                height: "100%",
                zIndex: 6,
                background: "none",
                position: "relative",
                marginLeft: isTablet ? "0" : "-50px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Spline
                scene="https://prod.spline.design/d2ccyKuzetN8iyIO/scene.splinecode"
                onLoad={() => setRobotLoaded(true)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Enhanced curved transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ 
        height: isMobile ? "80px" : isTablet ? "100px" : "120px", 
        zIndex: 10 
      }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: isMobile ? "30px 30px" : "50px 50px",
          }}
        ></div>

        <div className="absolute bottom-0 left-0 w-full" style={{ height: "100%", zIndex: 5 }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={`curve-dot-${i}`}
              className="absolute"
              style={{
                left: `${12 + i * 12}%`,
                bottom: `${Math.abs(Math.sin((i / 8) * Math.PI)) * (isMobile ? 40 : 60) + (isMobile ? 40 : 60)}px`,
                width: isMobile ? "3px" : "4px",
                height: isMobile ? "3px" : "4px",
                borderRadius: "50%",
                backgroundColor: "rgba(6, 182, 212, 0.8)",
                boxShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
                opacity: i % 2 === 0 ? 0.9 : 0.5,
                animation: `glow-curve 3s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="black"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 -5px 10px rgba(6, 182, 212, 0.15))",
          }}
        >
          <path d="M0,120 L1440,120 L1440,120 L0,120 Z" fill="black"></path>
          <path
            d="M0,120 L1440,120"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>

      <style jsx>{`
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
        
        /* Added responsive styles */
        @media (max-width: 380px) {
          h1.text-3xl { font-size: 1.5rem !important; }
          .text-lg { font-size: 0.875rem !important; }
          .text-base { font-size: 0.75rem !important; }
          .px-3 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
          .py-1\\.5 { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
        }
        
        @media (max-width: 480px) {
          .py-6 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
          .mb-4 { margin-bottom: 0.75rem !important; }
          .gap-2 { gap: 0.375rem !important; }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
          .py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
          .mb-8 { margin-bottom: 1.5rem !important; }
        }
        
        @media (min-width: 769px) and (max-width: 1023px) {
          .md\\:text-7xl { font-size: 3.5rem !important; }
          .md\\:text-2xl { font-size: 1.25rem !important; }
        }
        
        /* Prevent overflow issues with 3D model */
        @media (min-width: 769px) and (max-width: 1400px) {
          .h-\\[40vh\\] {
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  )
}
