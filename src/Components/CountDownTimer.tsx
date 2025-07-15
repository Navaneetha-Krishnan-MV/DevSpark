import  { useState, useEffect } from 'react';
import RotatingText from '../UI/RotatingText';

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const deadline = new Date('2025-09-10T23:59:59');
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
          fill={isFilled ? '#ff7200' : '#444'}
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
    <div className="bg-black w-full flex items-center justify-center px-3 py-12 sm:py-16 md:py-28">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 md:gap-20 lg:gap-28 max-w-8xl w-full px-2 sm:px-6 md:px-8">
        {/* Countdown Section */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00] text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest mb-6 sm:mb-8 md:mb-10 text-center">
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
                mainClassName="font-bold bg-gradient-to-r from-[#ff7200] to-[#ffae00] px-6 py-2 text-xl md:text-2xl text-white rounded-lg inline-flex items-center justify-center h-full"
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
            
            <a
              href="https://unstop.com/o/SzV3A1F"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group bg-gradient-to-r from-[#ff7200] to-[#ffae00] text-white font-bold uppercase tracking-wider text-lg md:text-xl px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 transform hover:shadow-lg hover:shadow-orange-500/20"
            >
              Register Now
            </a>

            <p className="text-white text-sm font-semibold uppercase tracking-wider mt-6 md:mt-8">
              September 12, 2025 - Friday
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;