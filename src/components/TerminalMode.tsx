
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { processCommand } from '@/utils/terminalUtils';
import GlitchEffect from './GlitchEffect';

interface TerminalModeProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const TerminalMode: React.FC<TerminalModeProps> = ({
  className,
  isOpen = false,
  onClose
}) => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalOutput, setTerminalOutput] = useState<Array<{text: string, isError: boolean, isWarning: boolean}>>([
    {text: "ECHO PROTOCOL TERMINAL v2.1.9", isError: false, isWarning: false},
    {text: "DIRECT NEURAL INTERFACE ACTIVE", isError: false, isWarning: false},
    {text: "Type 'help' for available commands.", isError: false, isWarning: false},
    {text: "", isError: false, isWarning: false}
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  
  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput]);
  
  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    // Add command to history
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);
    
    // Process command
    const result = processCommand(command);
    
    // Special case for clear command
    if (result.response === "CLEAR_TERMINAL") {
      setTerminalOutput([]);
    } else {
      // Add command and response to output
      setTerminalOutput(prev => [
        ...prev, 
        {text: `> ${command}`, isError: false, isWarning: false},
        {text: result.response, isError: result.isError, isWarning: result.isWarning}
      ]);
    }
    
    // Clear input
    setCommand('');
  };
  
  // Handle keyboard navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Escape') {
      if (onClose) onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={cn(
      'fixed inset-0 z-50 bg-cyber-black/95 text-cyber-green font-mono p-4 flex flex-col overflow-hidden',
      className
    )}>
      {/* Terminal header */}
      <div className="flex justify-between items-center mb-2 border-b border-cyber-green/30 pb-2">
        <GlitchEffect>
          <h2 className="text-cyber-green neon-green text-lg">ECHO PROTOCOL // TERMINAL ACCESS</h2>
        </GlitchEffect>
        <button 
          onClick={onClose} 
          className="px-3 py-1 bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green transition-colors"
        >
          [X] CLOSE
        </button>
      </div>
      
      {/* Terminal output */}
      <div 
        className="flex-1 overflow-y-auto mb-4 bg-cyber-black/60 p-3 border border-cyber-green/20"
        ref={outputRef}
      >
        {terminalOutput.map((line, index) => (
          <div 
            key={index} 
            className={cn(
              'py-1 break-words',
              line.isError ? 'text-cyber-red' : line.isWarning ? 'text-cyber-blue' : 'text-cyber-green'
            )}
          >
            {line.text.split('\n').map((textLine, lineIndex) => (
              <div key={lineIndex}>{textLine}</div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Command input */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-cyber-green mr-2">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-cyber-green caret-cyber-green"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
      
      {/* CRT scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-[2px] bg-cyber-green/10 animate-scanline"></div>
      </div>
    </div>
  );
};

export default TerminalMode;
