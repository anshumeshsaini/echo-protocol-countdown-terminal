
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchEffectProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  children: React.ReactNode;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({
  intensity = 'medium',
  className,
  children
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Calculate glitch frequency based on intensity
    const glitchProbability = 
      intensity === 'low' ? 0.005 :
      intensity === 'medium' ? 0.02 :
      0.05;
      
    const glitchDuration = 
      intensity === 'low' ? 100 :
      intensity === 'medium' ? 200 :
      300;
      
    // Set up interval to randomly trigger glitch effect
    const intervalId = setInterval(() => {
      if (Math.random() < glitchProbability) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), glitchDuration);
      }
    }, 100);
    
    return () => clearInterval(intervalId);
  }, [intensity]);
  
  return (
    <div className={cn(
      'relative',
      isGlitching && 'animate-text-glitch',
      className
    )}>
      {typeof children === 'string' ? (
        <span data-text={children} className={isGlitching ? 'glitch' : ''}>{children}</span>
      ) : children}
      
      {isGlitching && (
        <div className="absolute inset-0 bg-cyber-green-glow opacity-10 z-10"></div>
      )}
    </div>
  );
};

export default GlitchEffect;
