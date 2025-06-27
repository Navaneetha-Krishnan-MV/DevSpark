import { useEffect, useState } from "react";
import CountDownTimer from "./CountDownTimer";

export default function DeadLine() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []); 
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();
  const day = currentTime.getDay();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const secondsArray = Array.from({ length: 60 }, (_, i) => i);
  const minutesArray = Array.from({ length: 60 }, (_, i) => i);
  const hoursArray = Array.from({ length: 24 }, (_, i) => i);

  const renderTimeRing = (
    items: (string | number)[],
    currentIndex: number,
    radius: number,
    showEveryNth = 1,
    label = "",
    showYear = false,
    transitionDuration = "1s"
  ) => {
    const totalItems = items.length;
    const degreesPerItem = 360 / totalItems;
    const targetAngle = 180; // Bottom center position
    const currentItemAngle = currentIndex * degreesPerItem;
    const rotation = targetAngle - currentItemAngle;

    return (
      <g>
        {showYear && (
          <text
            x="400"
            y={200 - radius - 50}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="14"
            fontWeight="600"
            className="font-mono select-none"
            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}
          >
            {year}
          </text>
        )}
        <text
          x="400"
          y={200 - radius - 30}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize="12"
          fontWeight="600"
          className="font-mono select-none"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.7))" }}
        >
          {label}
        </text>
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "400px 200px",
            transition: `transform ${transitionDuration} ease-out`,
          }}
        >
          {items.map((item, index) => {
            if (index % showEveryNth !== 0) return null;
            const angle = (index / totalItems) * 360;
            const effectiveAngle = (angle + rotation) % 360;
            const distanceFromBottom = Math.min(
              Math.abs(effectiveAngle - 180),
              360 - Math.abs(effectiveAngle - 180)
            );
            if (distanceFromBottom > 90) return null; // Skip items far from bottom
            const opacity = Math.max(0.3, 1 - distanceFromBottom / 90);
            const isAtBottomCenter = distanceFromBottom < 5;

            const tickInnerRadius = radius - 6;
            const tickOuterRadius = radius + 4;
            const textRadius = radius + 25;

            const x = 400 + Math.cos((angle - 90) * Math.PI / 180) * textRadius;
            const y = 200 + Math.sin((angle - 90) * Math.PI / 180) * textRadius;

            return (
              <g key={index}>
                <line
                  x1={400 + Math.cos((angle - 90) * Math.PI / 180) * tickInnerRadius}
                  y1={200 + Math.sin((angle - 90) * Math.PI / 180) * tickInnerRadius}
                  x2={400 + Math.cos((angle - 90) * Math.PI / 180) * tickOuterRadius}
                  y2={200 + Math.sin((angle - 90) * Math.PI / 180) * tickOuterRadius}
                  stroke={isAtBottomCenter ? "#ffffff" : "#cccccc"}
                  strokeWidth={isAtBottomCenter ? "3" : "1.5"}
                  style={{ 
                    opacity: isAtBottomCenter ? 1 : opacity,
                    filter: isAtBottomCenter ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" : "none"
                  }}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isAtBottomCenter ? "#ffffff" : "#cccccc"}
                  fontSize={isAtBottomCenter ? "16" : "12"}
                  fontWeight={isAtBottomCenter ? "900" : "500"}
                  className="font-mono select-none"
                  style={{
                    filter: isAtBottomCenter ? "drop-shadow(0 0 12px rgba(255,255,255,0.9))" : "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
                    opacity: isAtBottomCenter ? 1 : opacity,
                    transform: `rotate(${-rotation}deg)`,
                    transformOrigin: `${x}px ${y}px`,
                  }}
                >
                  {item}
                </text>
              </g>
            );
          })}
          {/* Complete circles for all layers */}
          <circle
            cx="400"
            cy="200"
            r={radius}
            fill="none"
            stroke="#444444"
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d={`M ${400 - radius} 200 A ${radius} ${radius} 0 0 1 ${400 + radius} 200`}
            fill="none"
            stroke="#444444"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Complete circle for seconds ring */}
          {radius === 360 && (
            <circle
              cx="400"
              cy="200"
              r={radius}
              fill="none"
              stroke="#444444"
              strokeWidth="2"
              opacity="0.8"
            />
          )}
        </g>
      </g>
    );
  };

  return (
    <div className="relative flex flex-col items-center bg-black overflow-hidden">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="relative w-[800px] h-[400px]" style={{ marginTop: "-200px" }}>
        {/* Dark background for the clock area */}
        <div 
          className="absolute inset-0 rounded-full opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(30,30,30,0.9) 0%, rgba(20,20,20,0.7) 70%, transparent 100%)",
            width: "700px",
            height: "700px",
            left: "50px",
            top: "-150px"
          }}
        ></div>
        <svg width="800" height="400" className="overflow-visible relative z-10">
          {renderTimeRing(secondsArray, seconds, 360, 1, "SECONDS", false, "0.5s")}
          {renderTimeRing(minutesArray, minutes, 300, 1, "MINUTES", false)}
          {renderTimeRing(hoursArray, hours, 240, 1, "HOURS", false)}
          {renderTimeRing(dayNames, day, 160, 1, "DAYS", false)}
          {renderTimeRing(monthNames, month, 100, 1, "MONTHS", false)}
          <g>
            {/* Center point and pointer */}
            <circle
              cx="400"
              cy="200"
              r="5"
              fill="#ffffff"
              style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.9))" }}
            />
            <path
              d="M 400 188 L 394 200 L 406 200 Z"
              fill="#ffffff"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))" }}
            />
            
            {/* Year display below center inside month layer */}
            <text
              x="400"
              y="230"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontSize="28"
              fontWeight="700"
              className="font-mono select-none"
              style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.8))" }}
            >
              2025
            </text>
          </g>
        </svg>
      </div>
      
      <div className="text-center relative z-10" style={{ marginTop: "220px" }}>
        <div
          className="text-[25px] font-extrabold text-white mb-4 tracking-widest"
          style={{
            fontFamily: "'Orbitron', monospace",
            filter: "drop-shadow(0 0 25px rgba(255,255,255,0.4))",
            textShadow: "0 0 40px rgba(255,255,255,0.5)",
          }}
        >
          {currentTime.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}
        </div>
        <CountDownTimer />
      </div>
    </div>
  );
}