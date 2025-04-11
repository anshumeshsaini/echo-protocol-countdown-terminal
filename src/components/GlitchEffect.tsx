
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchEffectProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  children: React.ReactNode;
  color?: 'green' | 'red' | 'blue' | 'purple';
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({
  intensity = 'medium',
  className,
  children,
  color = 'green'
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
  
  const getColorClass = () => {
    switch (color) {
      case 'red': return 'text-cyber-red';
      case 'blue': return 'text-cyber-blue';
      case 'purple': return 'text-cyber-purple';
      case 'green':
      default: return 'text-cyber-green';
    }
  };
  
  const getGlowClass = () => {
    switch (color) {
      case 'red': return 'neon-red';
      case 'blue': return 'neon-blue';
      case 'purple': return 'neon-purple';
      case 'green':
      default: return 'neon-green';
    }
  };
  
  return (
    <div className={cn(
      'relative',
      isGlitching && 'animate-text-glitch',
      getColorClass(),
      isGlitching && getGlowClass(),
      className
    )}>
      {typeof children === 'string' ? (
        <span data-text={children} className={isGlitching ? 'glitch' : ''}>{children}</span>
      ) : children}
      
      {isGlitching && (
        <div className={cn(
          "absolute inset-0 opacity-20 z-10",
          color === 'red' ? 'bg-cyber-red-glow' :
          color === 'blue' ? 'bg-cyber-blue-glow' :
          color === 'purple' ? 'bg-cyber-purple-glow' :
          'bg-cyber-green-glow'
        )}></div>
      )}
    </div>
  );
};

export default GlitchEffect;
