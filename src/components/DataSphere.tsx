
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DataSphereProps {
  size: number;
  speed?: number;
  color?: string;
  className?: string;
  orbitRadius?: number;
  orbitAngle?: number;
  pulseWithCountdown?: boolean;
}

const DataSphere: React.FC<DataSphereProps> = ({
  size,
  speed = 1,
  color = 'cyber-green',
  className,
  orbitRadius = 150,
  orbitAngle = 0,
  pulseWithCountdown = false
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPulsing, setIsPulsing] = useState(false);
  const requestRef = useRef<number>();
  
  // Effects for rotation animation
  useEffect(() => {
    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // seconds
      
      // Update rotation
      setRotation({
        x: (elapsedTime * 20 * speed) % 360,
        y: (elapsedTime * 15 * speed) % 360,
        z: (elapsedTime * 10 * speed) % 360
      });
      
      // Update position for orbit
      const angle = orbitAngle + (elapsedTime * speed);
      setPosition({
        x: Math.cos(angle) * orbitRadius,
        y: Math.sin(angle) * orbitRadius
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [speed, orbitRadius, orbitAngle]);
  
  // Effect for pulsing with countdown
  useEffect(() => {
    if (!pulseWithCountdown) return;
    
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 200);
    }, 1000);
    
    return () => clearInterval(pulseInterval);
  }, [pulseWithCountdown]);
  
  // Calculate color class
  const colorClass = `bg-${color}`;
  const glowClass = `shadow-[0_0_10px_rgba(0,255,65,0.7),0_0_20px_rgba(0,255,65,0.4)]`;
  
  if (color === 'cyber-red') {
    glowClass === `shadow-[0_0_10px_rgba(255,0,51,0.7),0_0_20px_rgba(255,0,51,0.4)]`;
  } else if (color === 'cyber-blue') {
    glowClass === `shadow-[0_0_10px_rgba(0,102,255,0.7),0_0_20px_rgba(0,102,255,0.4)]`;
  }
  
  return (
    <div 
      className={cn(
        'absolute rounded-full grid place-items-center transform-gpu transition-all',
        isPulsing ? 'scale-110 opacity-100' : 'scale-100 opacity-80',
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `
          translate(calc(50% + ${position.x}px), calc(50% + ${position.y}px))
          rotateX(${rotation.x}deg) 
          rotateY(${rotation.y}deg) 
          rotateZ(${rotation.z}deg)
        `,
        backgroundImage: `radial-gradient(circle at 30% 30%, transparent 0%, ${color === 'cyber-green' ? '#00FF41' : color === 'cyber-red' ? '#FF0033' : '#0066FF'} 30%, transparent 70%)`,
        boxShadow: '0 0 10px rgba(0, 255, 65, 0.7), 0 0 20px rgba(0, 255, 65, 0.4)'
      }}
    >
      <div className="w-[80%] h-[80%] rounded-full opacity-50 bg-black"></div>
    </div>
  );
};

export default DataSphere;
