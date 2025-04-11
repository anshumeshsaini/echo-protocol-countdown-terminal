
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  className?: string;
  count?: number;
  type?: 'dust' | 'data' | 'sparks';
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  className,
  count = 50,
  type = 'dust'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  
  // Initialize particles based on type
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const particles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      let color: string;
      let size: number;
      let speed: number;
      let opacity: number;
      
      switch (type) {
        case 'data':
          color = Math.random() > 0.7 
            ? '#00FF41' 
            : Math.random() > 0.5 
              ? '#0066FF' 
              : '#FF0033';
          size = Math.random() * 3 + 1;
          speed = Math.random() * 2 + 0.5;
          opacity = Math.random() * 0.7 + 0.3;
          break;
        case 'sparks':
          color = Math.random() > 0.6 
            ? '#FFCC00' 
            : '#FF0033';
          size = Math.random() * 2 + 0.5;
          speed = Math.random() * 4 + 1;
          opacity = Math.random() * 0.7 + 0.3;
          break;
        case 'dust':
        default:
          color = '#AAAAAA';
          size = Math.random() * 2 + 0.2;
          speed = Math.random() * 0.5 + 0.1;
          opacity = Math.random() * 0.3 + 0.1;
          break;
      }
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speed,
        opacity,
        color
      });
    }
    
    particlesRef.current = particles;
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.y += particle.speed;
        
        // Reset if out of bounds
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        
        if (type === 'data') {
          // Draw small digital-looking particles
          ctx.rect(particle.x, particle.y, particle.size, particle.size);
        } else if (type === 'sparks') {
          // Draw spark-like particles
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        } else {
          // Draw dust particles
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }
        
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, type]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={cn(
        'absolute inset-0 pointer-events-none z-10',
        className
      )}
    />
  );
};

export default ParticleSystem;
