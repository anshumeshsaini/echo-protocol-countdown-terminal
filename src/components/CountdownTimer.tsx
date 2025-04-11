
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { getTimeRemainingUntilNoon, formatTime } from '@/utils/timeUtils';
import GlitchEffect from './GlitchEffect';

interface CountdownTimerProps {
  className?: string;
  onComplete?: () => void;
  onSecondChange?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  className,
  onComplete,
  onSecondChange
}) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemainingUntilNoon());
  const [isPulsing, setIsPulsing] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Function to update countdown
  const updateCountdown = useCallback(() => {
    const newTimeRemaining = getTimeRemainingUntilNoon();
    setTimeRemaining(newTimeRemaining);
    
    // Pulse effect on each second change
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 200);
    
    // Trigger onSecondChange callback
    if (onSecondChange) {
      onSecondChange();
    }
    
    // Random glitch effect (more frequent as countdown approaches zero)
    const glitchProbability = 0.1 + (1 - newTimeRemaining.totalSeconds / (12 * 3600)) * 0.3;
    if (Math.random() < glitchProbability) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
    }
    
    // Check if countdown is complete
    if (newTimeRemaining.isNoon && onComplete) {
      onComplete();
    }
  }, [onComplete, onSecondChange]);
  
  // Update countdown every second
  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [updateCountdown]);
  
  // Format display time
  const formattedHours = formatTime(timeRemaining.hours);
  const formattedMinutes = formatTime(timeRemaining.minutes);
  const formattedSeconds = formatTime(timeRemaining.seconds);
  
  return (
    <div 
      className={cn(
        'relative transition-all duration-200 select-none',
        isPulsing ? 'scale-105' : 'scale-100',
        className
      )}
    >
      <div 
        className={cn(
          'absolute inset-0 rounded-full bg-cyber-green/20 animate-pulse-glow',
          isPulsing ? 'opacity-60' : 'opacity-30'
        )}
      />
      
      <GlitchEffect intensity={isGlitching ? 'high' : 'low'}>
        <div className="text-center z-10 relative">
          <div className="text-5xl md:text-7xl font-bold neon-green mb-2">
            {formattedHours}:{formattedMinutes}:{formattedSeconds}
          </div>
          <div className="text-sm md:text-base uppercase tracking-widest text-cyber-green/80">
            Echo Protocol Activation
          </div>
          <div className="text-xs text-cyber-red/80 mt-1 tracking-wider">
            // GLOBAL CONSCIOUSNESS MERGE AT 12:00 //
          </div>
        </div>
      </GlitchEffect>
    </div>
  );
};

export default CountdownTimer;
