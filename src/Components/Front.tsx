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

// // Squares Component
// const Squares: React.FC<{
//   speed: number
//   squareSize: number
//   direction: string
//   borderColor: string
//   hoverFillColor: string
// }> = ({ speed, squareSize, direction, borderColor, hoverFillColor }) => (
//   <div
//     style={{
//       position: "absolute",
//       inset: 0,
//       backgroundImage: `
//         linear-gradient(${borderColor}33 1px, transparent 1px),
//         linear-gradient(90deg, ${borderColor}33 1px, transparent 1px)
//       `,
//       backgroundSize: `${squareSize}px ${squareSize}px`,
//       opacity: 0.6,
//       animation: `squares-move-${direction} ${10 / speed}s linear infinite `,
//       pointerEvents: "none",
//     }}
//   />
// )

export default function Home() {
  const [asciiArt, setAsciiArt] = useState<string>("")
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)


  // Typewriter effect for "SPARK" (fix: prevent K from moving to next line)
  const [sparkText, setSparkText] = useState("")
  const [sparkDeleting, setSparkDeleting] = useState(false)



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Responsive zoom-out for mobile
  useEffect(() => {
    const setZoom = () => {
      if (typeof window !== "undefined") {
        const isMobile = window.innerWidth < 700
        document.body.style.zoom = isMobile ? "0.7" : "1"
        document.body.style.transform = isMobile ? 'scale(0.7)' : 'scale(1)'
        document.body.style.transformOrigin = 'top left';
      }
    }
    setZoom()
    window.addEventListener("resize", setZoom)
    return () => window.removeEventListener("resize", setZoom)
  }, [])

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
        fontSize: typeof window !== "undefined" && window.innerWidth < 700 ? "13px" : "16px",
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
          zIndex: 0, // background
          pointerEvents: "none",
        }}
      >
        <Spline scene="https://prod.spline.design/FDMBklIDpExNXnEQ/scene.splinecode" />
      </div>

      {/* Lightning overlay */}
      <Lightning hue={200} xOffset={0} speed={1} intensity={1} size={1} />

      {/* Squares at the edges only */}
      {/* <Squares speed={1} squareSize={50} direction="down" borderColor="#06b6d4" hoverFillColor="#a855f7" />
      <Squares speed={1} squareSize={50} direction="up" borderColor="#06b6d4" hoverFillColor="#a855f7" />
      <Squares speed={1} squareSize={50} direction="left" borderColor="#06b6d4" hoverFillColor="#a855f7" />
      <Squares speed={1} squareSize={50} direction="right" borderColor="#06b6d4" hoverFillColor="#a855f7" /> */}

      {/* Two-column layout: Left = event content, Right = 3D Spline model */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left side: DevSpark content */}
        <div
          style={{
            flex: 1,
            maxWidth: "700px",
            minWidth: "350px",
            padding: "2.5rem 1.2rem 2.5rem 1.5vw", // reduced left padding
            display: "flex",
            flexDirection: "column",
            marginLeft: "0", // moved content to the left edge
            justifyContent: "center",
            zIndex: 3,
          }}
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <div className="relative z-10 w-200px h-full flex flex-col items-start justify-center pl-[25px]">
            {/* IEEE Badge */}
            {/* <div className="inline-block mb-6 animate-bounce" data-aos="zoom-in" data-aos-delay="200">
              <span className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ">
                IEEE TECHNICAL EVENT
              </span>
            </div> */}

            {/* Department */}
            <h2 className="text-xl md:text-xl text-gray-300 mb-4" data-aos="fade-right" data-aos-delay="300">
              Department of Computer Science and Engineering
            </h2>

            <p className="text-cyan-400 text-lg mb-6" data-aos="fade-right" data-aos-delay="400">
              Organize
            </p>

            {/* Main Title with animated underline */}
            <div style={{ position: "relative", marginBottom: "2.5rem" }}>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
                style={{ display: "inline-block", position: "relative", whiteSpace: "nowrap" }}
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <span className="text-white">DEV</span>
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600"
                  style={{
                    minWidth: 90,
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
                      color: "#06b6d4", // use blue, not violet
                      opacity: sparkDeleting || sparkText.length < 5 ? 1 : 0,
                      animation: "blink-cursor 1s steps(1) infinite",
                    }}
                  >
                    |
                  </span>
                </span>
                {/* Removed animated underline */}
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8" data-aos="fade-right" data-aos-delay="600">
              Where Ideas Ignite
            </p>

            {/* Event Details */}
            <div className="mb-8 space-y-4" data-aos="fade-up" data-aos-delay="700">
              <div className="flex items-center text-white text-lg">
                <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="mb-12" data-aos="fade-up" data-aos-delay="800">
              <h3 className="text-white text-xl mb-4">Event Tracks</h3>
              <div className="flex flex-wrap gap-4">
                {["Fullstack Development", "AI/ML", "Cyber Security"].map((track) => (
                  <span
                    key={track}
                    className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-transparent text-cyan-300 px-4 py-2 rounded-lg backdrop-blur-sm"
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>

            {/* Prizes and Registration inline */}
            <div className="mt- space-y-6" data-aos="fade-up" data-aos-delay="800">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                <span className="text-cyan-400 text-lg font-medium">Prizes Worth</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  INR 85,000+
                </span>
              </h3>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <div className="text-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20">
                  <p className="text-cyan-400 font-medium">IEEE Members</p>
                  <p className="text-2xl font-bold text-white">₹500</p>
                </div>
                <div className="text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                  <p className="text-blue-400 font-medium">Non-IEEE</p>
                  <p className="text-2xl font-bold text-white">₹600</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  onClick={() => window.location.href = '#register'}
                >
                  Register Now
                </button>
                <button 
                  className="px-6 py-3 border border-cyan-500/50 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/10 transition-colors"
                  onClick={() => window.location.href = '#sponsor'}
                >
                  Become a Sponsor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: 3D Spline Model with chip overlay */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            position: "relative",
          }}
        >
          {/* Spline 3D Robot */}
          <div
            style={{
              width: "100%", // increased width
              height: "100%",
              zIndex: 6, // higher z-index for robot
              background: "none",
              position: "relative",
              marginLeft: "130px",
            }}
          >
            <Spline
              scene="https://prod.spline.design/d2ccyKuzetN8iyIO/scene.splinecode"
              onLoad={() => setRobotLoaded(true)}
            />
          </div>
        </div>
      </div>

      {/* Enhanced curved transition to CountdownTimer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "120px", zIndex: 10 }}>
        {/* Grid pattern overlay for consistency */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Glowing dots along the curve */}
        <div className="absolute bottom-0 left-0 w-full" style={{ height: "100%", zIndex: 5 }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={`curve-dot-${i}`}
              className="absolute"
              style={{
                left: `${12 + i * 12}%`,
                bottom: `${Math.abs(Math.sin((i / 8) * Math.PI)) * 60 + 60}px`, // Adjusted to follow new curve
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "rgba(6, 182, 212, 0.8)",
                boxShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
                opacity: i % 2 === 0 ? 0.9 : 0.5,
                animation: `glow-curve 3s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Main curved SVG */}
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
          {/* Background fill - Adjusted path for a smooth "W" shape (top edge of black fill) */}
          <path d="M0,120 L1440,120 L1440,120 L0,120 Z" fill="black"></path>

          {/* Glowing stroke */}
          <path
            d="M0,120 L1440,120"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>

        </svg>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .flex-col, .flex-row, .flex, .items-center, .justify-center, .w-full, .h-full {
            flex-direction: column !important;
            width: 100vw !important;
            height: auto !important;
            min-width: 0 !important;
            min-height: 0 !important;
          }
          .max-w-2xl, .max-w-full, .max-w-lg, .max-w-xl, .max-w-3xl, .max-w-4xl, .max-w-5xl, .max-w-6xl, .max-w-7xl {
            max-width: 100vw !important;
          }
          .px-8, .lg\\:px-16 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .ml-24, .marginLeft-100px {
            margin-left: 0 !important;
          }
          .text-5xl, .md\\:text-7xl, .lg\\:text-8xl {
            font-size: 2.2rem !important;
          }
          .text-xl, .md\\:text-xl, .md\\:text-2xl, .lg\\:text-2xl {
            font-size: 1.1rem !important;
          }
          .mb-8, .mb-12, .mb-6, .mb-4, .mb-2, .mb-0 {
            margin-bottom: 1rem !important;
          }
          .gap-4 {
            gap: 0.5rem !important;
          }
          .rounded-lg, .rounded-full {
            border-radius: 0.5rem !important;
          }
          .p-6, .py-3, .px-8 {
            padding: 0.5rem 1rem !important;
          }
          .h-96, .w-96, .min-w-1200px, .min-h-400px, .max-w-1800px, .max-h-1000px {
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 100vw !important;
            max-height: 60vw !important;
            width: 100vw !important;
            height: auto !important;
          }
        }
        @keyframes lightning-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes squares-move-down {
          0% { transform: translateY(-40px); }
          100% { transform: translateY(40px); }
        }
        @keyframes squares-move-up {
          0% { transform: translateY(40px); }
          100% { transform: translateY(-40px); }
        }
        @keyframes floatingBeam {
          0% { top: 0; }
          50% { top: 80%; }
          100% { top: 0; }
        }
        @keyframes robot-eye-blink {
          0%, 92%, 100% { opacity: 0.92; }
          95% { opacity: 0.2; }
        }
        .cyber-scan-button:hover .button-fill {
          width: 100% !important;
          animation: scanBounce 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .become-sponsor-btn .sponsor-fill {
          right: auto;
          left: 0;
        }
        .become-sponsor-btn:hover .sponsor-fill,
        .become-sponsor-btn:active .sponsor-fill {
          width: 100% !important;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .become-sponsor-btn:not(:hover) .sponsor-fill {
          width: 0% !important;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1) 0s;
        }
        .become-sponsor-btn .sponsor-fill {
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes scanBounce {
          0%, 100% { top: 0; }
          50% { top: 80%; }
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

