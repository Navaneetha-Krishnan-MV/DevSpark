
import React, { useState, useEffect } from 'react';

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last';
  initial?: { y: string; opacity: number };
  animate?: { y: number; opacity: number };
  exit?: { y: string; opacity: number };
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: { type: string; damping: number; stiffness: number };
  rotationInterval?: number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words';
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = '',
  rotationInterval = 2000,
  loop = true,
  auto = true,
  splitBy = 'characters'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!auto || !loop) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 150);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval, auto, loop]);

  const currentText = texts[currentIndex];

  if (splitBy === 'characters') {
    return (
      <div className={mainClassName}>
        {currentText.split('').map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={`inline-block transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: `${index * 50}ms`
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`${mainClassName} transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {currentText}
    </div>
  );
};

export default RotatingText;
