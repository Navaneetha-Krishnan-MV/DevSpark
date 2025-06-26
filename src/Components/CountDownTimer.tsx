"use client"

import { useState, useEffect } from "react"
import RotatingText from "../UI/RotatingText" // Assuming this path is correct

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const deadline = new Date('2025-07-26T23:59:59');
    const updateTimer = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const CircularProgress = ({ value, maxValue }: { value: number; maxValue: number }) => {
    const totalDots = 60;
    const filledDots = Math.round((value / maxValue) * totalDots);
    const radius = 45; // Increased radius for better visibility on desktop
    const size = 100; // ViewBox size for SVG

    const dots = [];
    for (let i = 0; i < totalDots; i++) {
      const angle = (i / totalDots) * 2 * Math.PI - Math.PI / 2;
      const x = size / 2 + radius * Math.cos(angle);
      const y = size / 2 + radius * Math.sin(angle);
      const isFilled = i < filledDots;

      dots.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={isFilled ? 2.5 : 1.5}
          fill={isFilled ? '#06b6d4' : '#444'}
          style={{ opacity: isFilled ? 1 : 0.3, transition: 'all 0.3s ease' }}
        />
      );
    }

    return (
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]" preserveAspectRatio="xMidYMid meet">
        {dots}
      </svg>
    );
  };

  const TimeUnit = ({ value, label, maxValue }: { value: number; label: string; maxValue: number }) => (
    <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 w-full">
      <div className="relative w-full aspect-square max-w-[50px] xs:max-w-[60px] sm:max-w-[80px] md:max-w-[110px] lg:max-w-[140px] xl:max-w-[180px] mx-auto">
        <CircularProgress value={value} maxValue={maxValue} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-mono font-bold">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-wider text-white whitespace-nowrap">
        {label}
      </p>
    </div>
  );
  
  return (
    <div 
      className="w-full flex items-center justify-center px-3 py-12 sm:py-16 md:py-28"
      style={{
        background: "black",
        position: "relative",
        overflow: "hidden",
        marginTop: "-90px", // Increased negative margin to better connect with the curve
        paddingTop: "90px"  // Increased padding to compensate for the overlap
      }}
    >
      {/* Enhanced curved upper edge to match with Front component */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: '120px', zIndex: 0 }}>
        {/* Main curved SVG - Adjusted path for a smooth "M" shape (bottom edge of black fill) */}
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          fill="black" 
          style={{ 
            width: '100%', 
            height: '100%',
            filter: 'drop-shadow(0 5px 10px rgba(6, 182, 212, 0.15))'
          }}
        >
          <path 
            d="M0,0 C360,60 720,60 1440,0 L1440,120 L0,120 Z" 
            fill="black" 
          ></path>
          
          {/* Glowing stroke */}
          <path 
            d="M0,0 C360,60 720,60 1440,0" 
            fill="none" 
            stroke="rgba(6, 182, 212, 0.4)" 
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
          
          {/* Dotted accent line */}
          <path 
            d="M0,10 C360,70 720,70 1440,10" // Adjusted to follow new curve
            fill="none" 
            stroke="rgba(6, 182, 212, 0.2)" 
            strokeWidth="0.8"
            strokeDasharray="4,4"
          ></path>
        </svg>

        {/* Animation light streaks matching curve */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`light-streak-${i}`}
            style={{
              position: "absolute",
              top: `${Math.abs(Math.sin((i / 5) * Math.PI)) * 60}px`, // Adjusted to follow new curve
              left: `${10 + (i * 20)}%`,
              height: "80px",
              width: "2px",
              background: "linear-gradient(to bottom, rgba(6, 182, 212, 0.5), transparent)",
              opacity: 0.6,
              transform: `rotate(${85 + Math.random() * 10}deg)`,
              transformOrigin: "top center",
              animation: `float-streak ${2 + i * 0.5}s ease-in-out infinite`
            }}
          />
        ))}
        
        {/* Enhanced glow edge */}
        <div className="w-full absolute top-0" style={{ 
          height: "2px",
          background: "linear-gradient(to right, transparent, rgba(6, 182, 212, 0.5) 20%, rgba(6, 182, 212, 0.7) 50%, rgba(6, 182, 212, 0.5) 80%, transparent)",
          boxShadow: "0 0 15px rgba(6, 182, 212, 0.6)",
          opacity: 0.8
        }}></div>
        
        {/* Blended gradient to transition from curve to content */}
        <div className="w-full h-full" style={{ 
          background: "linear-gradient(to bottom, rgba(6, 182, 212, 0.06), transparent 80%)"
        }}></div>
      </div>
      
      {/* Grid Background (matching Front component) */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0, 191, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Grid Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }}/>
        
        {/* Enhanced connecting elements that match the Front section's new curve */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Glowing nodes matching the curve pattern */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`dot-${i}`}
              style={{
                position: 'absolute',
                top: `${Math.abs(Math.sin((i / 8) * Math.PI)) * 60}px`, // Adjusted to follow new curve
                left: `${12 + (i * 12)}%`,
                width: i % 3 === 0 ? '8px' : '5px',
                height: i % 3 === 0 ? '8px' : '5px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.6)',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)',
                animation: `glow 3s ease-in-out infinite ${i * 0.4}s`,
                zIndex: 2
              }}
            />
          ))}
          
          {/* Circuit-like connection lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`line-${i}`}
              style={{
                position: 'absolute',
                top: `${Math.abs(Math.sin((i / 5) * Math.PI)) * 60 + 10}px`, // Adjusted to follow new curve
                left: `${5 + (i * 20)}%`,
                width: `${15 + Math.random() * 10}%`,
                height: '1px',
                backgroundColor: 'rgba(6, 182, 212, 0.4)',
                transform: `rotate(${-5 + Math.random() * 10}deg)`,
                transformOrigin: 'left center',
                zIndex: 1
              }}
            />
          ))}
          
          {/* Vertical connecting lines */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`vline-${i}`}
              style={{
                position: 'absolute',
                top: '0',
                left: `${20 + (i * 25)}%`,
                width: '1px',
                height: `${40 + Math.random() * 20}px`,
                background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.5), transparent)',
                zIndex: 1
              }}
            />
          ))}
        </div>
        
        {/* Grid-pattern Animated Squares (similar to Front.tsx) */}
        <div className="absolute bottom-0 left-0 w-full" style={{ height: '70%', zIndex: 1 }}>
          {/* Squares moving down */}
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.3,
              animation: 'squares-move-down 15s linear infinite',
              pointerEvents: 'none',
            }}
          />
          
          {/* Squares moving up */}
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '70px 70px',
              opacity: 0.2,
              animation: 'squares-move-up 20s linear infinite',
              pointerEvents: 'none',
            }}
          />
          
          {/* Squares moving left */}
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '35px 35px',
              opacity: 0.3,
              animation: 'squares-move-left 25s linear infinite',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
      
      {/* Grid Background (matching Front component) */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0, 191, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Grid Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }}/>
        
        {/* Enhanced connecting elements that match the Front section's new curve */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Glowing nodes matching the curve pattern */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`dot-${i}`}
              style={{
                position: 'absolute',
                top: `${Math.abs(Math.sin((i / 8) * Math.PI)) * 60}px`, // Adjusted to follow new curve
                left: `${12 + (i * 12)}%`,
                width: i % 3 === 0 ? '8px' : '5px',
                height: i % 3 === 0 ? '8px' : '5px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 182, 212, 0.6)',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)',
                animation: `glow 3s ease-in-out infinite ${i * 0.4}s`,
                zIndex: 2
              }}
            />
          ))}
          
          {/* Circuit-like connection lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`line-${i}`}
              style={{
                position: 'absolute',
                top: `${Math.abs(Math.sin((i / 5) * Math.PI)) * 60 + 10}px`, // Adjusted to follow new curve
                left: `${5 + (i * 20)}%`,
                width: `${15 + Math.random() * 10}%`,
                height: '1px',
                backgroundColor: 'rgba(6, 182, 212, 0.4)',
                transform: `rotate(${-5 + Math.random() * 10}deg)`,
                transformOrigin: 'left center',
                zIndex: 1
              }}
            />
          ))}
          
          {/* Vertical connecting lines */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`vline-${i}`}
              style={{
                position: 'absolute',
                top: '0',
                left: `${20 + (i * 25)}%`,
                width: '1px',
                height: `${40 + Math.random() * 20}px`,
                background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.5), transparent)',
                zIndex: 1
              }}
            />
          ))}
        </div>
        
        {/* Grid-pattern Animated Squares (similar to Front.tsx) */}
        <div className="absolute bottom-0 left-0 w-full" style={{ height: '70%', zIndex: 1 }}>
          {/* Squares moving down */}
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.3,
              animation: 'squares-move-down 15s linear infinite',
              pointerEvents: 'none',
            }}
          />
          
          {/* Squares moving up */}
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '70px 70px',
              opacity: 0.2,
              animation: 'squares-move-up 20s linear infinite',
              pointerEvents: 'none',
            }}
          />
          
          {/* Squares moving left */}
          <div 
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '35px 35px',
              opacity: 0.3,
              animation: 'squares-move-left 25s linear infinite',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 md:gap-20 lg:gap-28 max-w-8xl w-full px-2 sm:px-6 md:px-8 relative z-10">
        {/* Countdown Section */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest mb-6 sm:mb-8 md:mb-10 text-center">
            Registration Deadline 
          </h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full max-w-xl mx-auto px-1">
            <TimeUnit value={timeLeft.days} label="Days" maxValue={31} />
            <TimeUnit value={timeLeft.hours} label="Hours" maxValue={24} />
            <TimeUnit value={timeLeft.minutes} label="Mins" maxValue={60} />
            <TimeUnit value={timeLeft.seconds} label="Secs" maxValue={60} />
          </div>
        </div>

        {/* Registration Call Section */}
        <div className="flex flex-col justify-center items-center text-center w-full">
          <div className="mb-8 md:mb-12 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl mb-8 min-w-[280px] h-20 md:h-24 ">
              <RotatingText
                texts={[ 'BUILD', 'WIN' , 'SPARK']}
                mainClassName="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 px-6 py-2 text-xl md:text-2xl text-white rounded-lg inline-flex items-center justify-center h-full"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="inline-block"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                loop={true}
                auto={true}
                splitBy='characters'
              />
              <span className="text-white  font-bold uppercase tracking-widest text-lg md:text-xl">WITH US!</span>
            </div>
            
            <button
              onClick={() => window.open('https://google.com', '_blank')}
              className="relative overflow-hidden group text-white font-bold uppercase tracking-wider text-lg md:text-xl px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 transform"
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
                border: "2px solid rgba(6, 182, 212, 0.5)"
              }}
            >
              Register Now
            </button>

            <p className="text-white text-sm font-semibold uppercase tracking-wider mt-6 md:mt-8">
              July 28, 2025 - Monday
            </p>
          </div>
        </div>
      </div>

      {/* Add styling consistent with Front.tsx */}
      <style>{`
        @media (max-width: 700px) {
          .flex-col, .flex-row, .flex, .items-center, .justify-center, .w-full, .h-full {
            flex-direction: column !important;
            width: 100vw !important;
            height: auto !important;
            min-width: 0 !important;
            min-height: 0 !important;
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
          .rounded-lg, .rounded-full {
            border-radius: 0.5rem !important;
          }
          .p-6, .py-3, .px-8 {
            padding: 0.5rem 1rem !important;
          }
        }
        
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.4; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 8px rgba(6, 182, 212, 0.4); }
          50% { opacity: 1; box-shadow: 0 0 12px rgba(6, 182, 212, 0.7); }
        }
        
        @keyframes float-streak {
          0%, 100% { opacity: 0.6; transform: rotate(87deg) translateY(0); }
          50% { opacity: 0.8; transform: rotate(87deg) translateY(-10px); }
        }
        
        /* Square animation variations */
        @keyframes square-float-0 {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-100px) rotate(180deg); opacity: 0.4; }
          100% { transform: translateY(-200px) rotate(360deg); opacity: 0.2; }
        }
        
        @keyframes square-float-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(80px, -120px) rotate(180deg); }
          100% { transform: translate(0, -240px) rotate(360deg); }
        }
        
        @keyframes square-float-2 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(-60px, -80px) rotate(-90deg); opacity: 0.5; }
          100% { transform: translate(0, -180px) rotate(-180deg); opacity: 0.3; }
        }
        
        @keyframes square-float-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(40px, -60px) rotate(60deg); }
          66% { transform: translate(-40px, -120px) rotate(120deg); }
          100% { transform: translate(0, -200px) rotate(180deg); }
        }
        
        /* Grid square animations */
        @keyframes squares-move-down {
          0% { transform: translateY(-50px); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes squares-move-up {
          0% { transform: translateY(50px); }
          100% { transform: translateY(-50px); }
        }
        
        @keyframes squares-move-left {
          0% { transform: translateX(50px); }
          100% { transform: translateX(-50px); }
        }
        
        @keyframes squares-move-right {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }
      `}</style>
    </div>
  );
};

export default CountDownTimer;
