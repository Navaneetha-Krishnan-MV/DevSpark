import { useState, useEffect, useCallback, useMemo } from 'react';

// Throttle function to limit the rate of function calls
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle = false;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CircularProgressProps {
  value: number;
  maxValue: number;
  label: string;
}

const CircularProgress = ({ value, maxValue, label }: CircularProgressProps) => {
  const progress = useMemo(() => (value / maxValue) * 100, [value, maxValue]);
  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative w-24 h-24 mx-2 my-4 md:mx-4 md:my-0">
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#444"
          strokeWidth={strokeWidth}
          strokeOpacity="0.2"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#06b6d4"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-white">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase text-gray-400">{label}</span>
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
  maxValue: number;
}

const TimeUnit = ({ value, label, maxValue }: TimeUnitProps) => (
  <div className="flex flex-col items-center">
    <CircularProgress value={value} maxValue={maxValue} label={label} />
  </div>
);

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Memoize the update function
  const updateTimer = useCallback(() => {
    const deadline = new Date('2025-07-24T23:59:59').getTime();
    const now = new Date().getTime();
    const diff = deadline - now;

    if (diff > 0) {
      setTimeLeft(prev => {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        // Only update if values have changed
        if (prev.days === days && prev.hours === hours && 
            prev.minutes === minutes && prev.seconds === seconds) {
          return prev;
        }
        
        return { days, hours, minutes, seconds };
      });
    }
  }, []);

  useEffect(() => {
    // Initial call
    updateTimer();
    
    // Throttle the update to reduce frequency
    const throttledUpdate = throttle(updateTimer, 1000);
    
    // Use requestAnimationFrame for smoother animations
    let animationFrameId: number;
    let lastUpdate = 0;
    
    const updateLoop = (timestamp: number) => {
      if (timestamp - lastUpdate > 1000) { // Update every second
        throttledUpdate();
        lastUpdate = timestamp;
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    
    animationFrameId = requestAnimationFrame(updateLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateTimer]);

  return (
    <div className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Event Starts In
        </h2>
        <div className="flex flex-wrap justify-center items-center">
          <TimeUnit value={timeLeft.days} label="Days" maxValue={365} />
          <TimeUnit value={timeLeft.hours} label="Hours" maxValue={24} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" maxValue={60} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" maxValue={60} />
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
