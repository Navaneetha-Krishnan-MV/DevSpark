"use client"

import { useState, useEffect, useRef } from "react"
import fingerprintImg from "/finger.png" // Place your fingerprint image at this path

interface LoadingProps {
  onComplete?: () => void
}

export default function Loading({ onComplete }: LoadingProps) {
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          if (onComplete) {
            setTimeout(onComplete, 500); // Small delay before calling onComplete
          }
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => clearInterval(progressTimer);
  }, [onComplete])

  // Colors for fingerprint and squares - using website's orange theme
  const fingerprintColor = "#ff7200" // Main orange color
  const fingerprintGlow = "#ffae00" // Lighter orange for glow

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Lightning background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Lightning hue={200} xOffset={0} speed={1} intensity={0.8} size={1} />
      </div>

      {/* Squares background - Left side: top to bottom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Squares
          speed={0.5}
          squareSize={40}
          direction="down"
          borderColor={fingerprintColor}
          hoverFillColor={fingerprintGlow}
        />
      </div>

      {/* Right side: bottom to top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Squares
          speed={0.5}
          squareSize={40}
          direction="up"
          borderColor={fingerprintColor}
          hoverFillColor={fingerprintGlow}
        />
      </div>

      {/* Main fingerprint scanner */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Fingerprint container */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          {/* Outer glow rings */}
          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              left: "-40px",
              top: "-40px",
              background: 'radial-gradient(circle, #ffae00 0%, rgba(255, 114, 0, 0.1) 50%, transparent 70%)',
              borderRadius: "50%",
              animation: "pulse-outer 3s ease-in-out infinite",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "240px",
              height: "240px",
              left: "-20px",
              top: "-20px",
              background: 'radial-gradient(circle, #ff7200 0%, transparent 60%)',
              borderRadius: "50%",
              animation: "pulse-inner 2s ease-in-out infinite",
            }}
          />

          {/* Fingerprint Image */}
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: 'drop-shadow(0 0 18px rgba(255, 174, 0, 0.8))',
              transition: 'all 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 25px rgba(255, 174, 0, 1))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 18px rgba(255, 174, 0, 0.8))';
            }}
          >
            <img
              src={fingerprintImg}
              alt="Fingerprint"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                opacity: 0.95,
                zIndex: 10,
                filter: `drop-shadow(0 0 18px ${fingerprintGlow})`,
              }}
            />

            {/* Scanning lines */}
            <svg
              width="200"
              height="200"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 12,
                pointerEvents: "none",
              }}
            >
              <line
                x1="0"
                y1={100 + (scanProgress - 50) * 1.8}
                x2="200"
                y2={100 + (scanProgress - 50) * 1.8}
                stroke={fingerprintColor}
                strokeWidth="3"
                opacity="0.9"
                style={{
                  filter: `drop-shadow(0 0 6px ${fingerprintGlow})`,
                  animation: "scan-line 0.8s ease-in-out infinite",
                }}
              />
              <line
                x1="0"
                y1={100 + (scanProgress - 50) * 1.8 + 12}
                x2="200"
                y2={100 + (scanProgress - 50) * 1.8 + 12}
                stroke={fingerprintColor}
                strokeWidth="1.5"
                opacity="0.6"
                style={{
                  filter: `drop-shadow(0 0 4px ${fingerprintGlow})`,
                  animation: "scan-line 0.8s ease-in-out infinite 0.2s",
                }}
              />
            </svg>

            {/* Rotating scanner overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `conic-gradient(from ${scanProgress * 3.6}deg, transparent 0deg, #ffae00 45deg, #ff7200 90deg, transparent 135deg)`,
                animation: "rotate 4s linear infinite",
                zIndex: 11,
                opacity: 0.8,
                mixBlendMode: 'screen'
              }}
            />

            {/* Pulse ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${fingerprintColor}`,
                animation: "pulse-ring 2s ease-out infinite",
                zIndex: 11,
              }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: "320px",
            height: "6px",
            background: "#1f2937",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "1.5rem",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              background: 'linear-gradient(90deg, #ff7200, #ffae00)',
              borderRadius: "3px",
              width: `${scanProgress}%`,
              transition: "width 0.1s ease-out, box-shadow 0.3s ease",
              boxShadow: '0 0 15px rgba(255, 114, 0, 0.7)',
            }}
          />

          {/* Progress indicator */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${scanProgress}%`,
              width: "2px",
              height: "100%",
              background: "white",
              opacity: 0.8,
              animation: "blink 0.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Status text */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: fingerprintColor,
              marginBottom: "0.5rem",
              letterSpacing: "0.1em",
              textShadow: `0 0 8px ${fingerprintGlow}`,
            }}
          >
            {scanProgress < 25 && "INITIALIZING"}
            {scanProgress >= 25 && scanProgress < 50 && "SCANNING"}
            {scanProgress >= 50 && scanProgress < 75 && "ANALYZING"}
            {scanProgress >= 75 && "AUTHENTICATING"}
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", fontWeight: "500" }}>
            {scanProgress < 25 && "Preparing biometric scanner..."}
            {scanProgress >= 25 && scanProgress < 50 && "Reading fingerprint pattern..."}
            {scanProgress >= 50 && scanProgress < 75 && "Processing biometric data..."}
            {scanProgress >= 75 && "Verifying identity..."}
          </p>
          <p
            style={{
              color: fingerprintColor,
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              fontFamily: "monospace",
              animation: "blink-text 1s ease-in-out infinite",
              textShadow: `0 0 8px ${fingerprintGlow}`,
            }}
          >
            {Math.round(scanProgress)}% COMPLETE
          </p>
        </div>

        {/* Floating particles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "3px",
                height: "3px",
                background: fingerprintColor,
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 4px ${fingerprintGlow}`,
                animation: `float-${i % 3} ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse-outer {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3; 
            background: radial-gradient(circle, #ff7a0d 0%, rgba(255, 114, 0, 0.1) 50%, transparent 70%);
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.6;
            background: radial-gradient(circle, #ffae00 0%, rgba(255, 114, 0, 0.3) 50%, transparent 70%);
          }
        }
        
        @keyframes pulse-inner {
          0%, 100% { 
            transform: scale(1.05); 
            opacity: 0.4; 
            background: radial-gradient(circle, #ff7a0d 0%, transparent 60%);
          }
          50% { 
            transform: scale(1); 
            opacity: 0.7;
            background: radial-gradient(circle, #ffae00 0%, transparent 60%);
          }
        }
        
        @keyframes scan-line {
          0%, 100% { 
            opacity: 0.4;
            stroke: #ff7a0d;
          }
          50% { 
            opacity: 1;
            stroke: #ffae00;
          }
        }
        
        @keyframes rotate {
          from { 
            transform: rotate(0deg);
            background: conic-gradient(from 0deg, transparent 0deg, #ff7a0d 45deg, #ffae00 90deg, transparent 135deg);
          }
          to { 
            transform: rotate(360deg);
            background: conic-gradient(from 360deg, transparent 0deg, #ff7a0d 45deg, #ffae00 90deg, transparent 135deg);
          }
        }
        
        @keyframes pulse-ring {
          0% { 
            transform: scale(1); 
            opacity: 0.8;
            border-color: #ff7a0d;
          }
          100% { 
            transform: scale(1.3); 
            opacity: 0;
            border-color: #ffae00;
          }
        }
        
        @keyframes blink {
          0%, 100% { 
            opacity: 0.4;
            background: #ff7a0d;
          }
          50% { 
            opacity: 1;
            background: #ffae00;
          }
        }
        
        @keyframes blink-text {
          0%, 100% { 
            opacity: 0.7;
            color: #ff7a0d;
          }
          50% { 
            opacity: 1;
            color: #ffae00;
          }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-15px) translateX(-8px); opacity: 0.9; }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          50% { transform: translateY(-25px) translateX(5px); opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}

// Lightning Component
function Lightning({ hue = 180, xOffset = 0, speed = 1, intensity = 1, size = 1 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const lightning = {
      branches: [] as Array<{
        x: number
        y: number
        targetX: number
        targetY: number
        progress: number
        opacity: number
        width: number
      }>,
      time: 0,
    }

    const createBranch = () => {
      const startX = Math.random() * canvas.width + xOffset
      const startY = Math.random() * canvas.height * 0.3
      const targetX = startX + (Math.random() - 0.5) * 400 * size
      const targetY = startY + Math.random() * canvas.height * 0.7

      lightning.branches.push({
        x: startX,
        y: startY,
        targetX,
        targetY,
        progress: 0,
        opacity: Math.random() * 0.6 + 0.2,
        width: Math.random() * 2 + 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lightning.time += 0.016 * speed

      if (Math.random() < 0.015 * intensity) {
        createBranch()
      }

      lightning.branches = lightning.branches.filter((branch) => {
        branch.progress += 0.04 * speed
        branch.opacity -= 0.008

        if (branch.opacity <= 0 || branch.progress >= 1) {
          return false
        }

        const currentX = branch.x + (branch.targetX - branch.x) * branch.progress
        const currentY = branch.y + (branch.targetY - branch.y) * branch.progress

        const offsetX = Math.sin(lightning.time + branch.x * 0.01) * 15 * (1 - branch.progress)
        const offsetY = Math.cos(lightning.time + branch.y * 0.01) * 8 * (1 - branch.progress)

        ctx.save()
        ctx.globalAlpha = branch.opacity * intensity
        ctx.strokeStyle = `hsl(${hue}, 60%, 50%)`
        ctx.lineWidth = branch.width
        ctx.shadowColor = `hsl(${hue}, 60%, 50%)`
        ctx.shadowBlur = 8

        ctx.beginPath()
        ctx.moveTo(branch.x, branch.y)
        ctx.lineTo(currentX + offsetX, currentY + offsetY)
        ctx.stroke()
        ctx.restore()

        return true
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [hue, xOffset, speed, intensity, size])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  )
}

// Squares Component
function Squares({
  speed = 0.5,
  squareSize = 40,
  direction = "down",
  borderColor = "#22c55e",
  hoverFillColor = "#16a34a",
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const squares: Array<{
      x: number
      y: number
      size: number
      opacity: number
      filled: boolean
    }> = []

    const cols = Math.ceil(canvas.width / squareSize) + 1
    const rows = Math.ceil(canvas.height / squareSize) + 2

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        squares.push({
          x: col * squareSize,
          y: direction === "down" ? row * squareSize - squareSize : row * squareSize,
          size: squareSize,
          opacity: Math.random() * 0.2 + 0.05,
          filled: Math.random() < 0.08,
        })
      }
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016 * speed

      squares.forEach((square, index) => {
        if (direction === "down") {
          square.y += speed * 0.3
          if (square.y > canvas.height + squareSize) {
            square.y = -squareSize
            square.filled = Math.random() < 0.08
            square.opacity = Math.random() * 0.2 + 0.05
          }
        } else {
          square.y -= speed * 0.3
          if (square.y < -squareSize) {
            square.y = canvas.height + squareSize
            square.filled = Math.random() < 0.08
            square.opacity = Math.random() * 0.2 + 0.05
          }
        }

        square.opacity += Math.sin(time + index * 0.1) * 0.005

        ctx.save()
        ctx.globalAlpha = Math.max(0.02, Math.min(0.25, square.opacity))

        if (square.filled) {
          ctx.fillStyle = hoverFillColor
          ctx.fillRect(square.x, square.y, square.size, square.size)
        }

        ctx.strokeStyle = borderColor
        ctx.lineWidth = 0.8
        ctx.strokeRect(square.x, square.y, square.size, square.size)
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [speed, squareSize, direction, borderColor, hoverFillColor])

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
}
