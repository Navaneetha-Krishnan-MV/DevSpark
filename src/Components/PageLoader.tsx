"use client"

import { useState, useEffect } from "react"

interface PageLoaderProps {
  onComplete?: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative w-32 h-32 mb-8">
        {/* Animated circle */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-full"
          style={{
            clipPath: `circle(${progress * 0.9}% at 50% 50%)`,
            transition: 'clip-path 0.1s ease-out'
          }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-orange-500 flex items-center justify-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-6 text-gray-300 text-lg font-medium">
        {progress < 100 ? 'Loading...' : 'Ready'}
      </p>
      
      <p className="mt-2 text-gray-500 text-sm">
        {progress}% Complete
      </p>
    </div>
  )
}
