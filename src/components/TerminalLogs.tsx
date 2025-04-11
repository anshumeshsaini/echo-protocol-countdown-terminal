import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { generateTerminalLogs } from '@/utils/glitchUtils';
import GlitchEffect from './GlitchEffect';

interface TerminalLogsProps {
  className?: string;
  maxLogs?: number;
  autoScroll?: boolean;
}

const TerminalLogs: React.FC<TerminalLogsProps> = ({
  className,
  maxLogs = 15,
  autoScroll = true
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  
  // Add new logs at random intervals
  useEffect(() => {
    // Initial logs
    const initialLogs = generateTerminalLogs(5);
    setLogs(initialLogs);
    
    // Add new logs periodically
    const logInterval = setInterval(() => {
      // Add 1-3 logs at a time
      const newLogsCount = Math.floor(Math.random() * 3) + 1;
      const newLogs = generateTerminalLogs(newLogsCount);
      
      setLogs(prevLogs => {
        const updatedLogs = [...prevLogs, ...newLogs];
        // Keep only the latest maxLogs
        return updatedLogs.slice(-maxLogs);
      });
    }, 2500 + Math.random() * 2000); // Random interval between 2.5-4.5 seconds
    
    return () => clearInterval(logInterval);
  }, [maxLogs]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);
  
  return (
    <div 
      className={cn(
        'bg-cyber-black/90 border border-cyber-green/30 text-cyber-green font-mono p-3 overflow-y-auto',
        className
      )}
      ref={logsContainerRef}
    >
      <div className="text-xs md:text-sm leading-5">
        <div className="text-cyber-green font-bold mb-2 border-b border-cyber-green/30 pb-1">
          PROJECT BLACKOUT // TERMINAL OUTPUT
        </div>
        
        {logs.map((log, index) => (
          <div 
            key={index} 
            className={cn(
              'py-1 transition-opacity duration-300',
              index === logs.length - 1 ? 'animate-data-flow' : ''
            )}
          >
            <GlitchEffect intensity="low">
              <span className="text-cyber-green neon-green whitespace-pre-wrap">{log}</span>
            </GlitchEffect>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalLogs;
