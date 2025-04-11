import { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import TestControls from './components/TestControls';
import MiniTimeControls from './components/MiniTimeControls';
import { FontOption, headingFonts } from './utils/fonts';
import { getHackathonEvents } from './data/events';
import { Event } from './data/events';
import './App.css';

const App = () => {
  // State management
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTestControls, setShowTestControls] = useState(false);
  const [useCustomTime, setUseCustomTime] = useState(true); // Changed to true by default
  const [timeSpeed, setTimeSpeed] = useState(1);
  // Set Steeler as the default font
  const [headingFont, setHeadingFont] = useState<FontOption>(headingFonts[0]); // Now points to Steeler
  const [events, setEvents] = useState<Event[]>(getHackathonEvents());
  
  // Clock update effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!useCustomTime) {
      // Real-time updates
      timer = setInterval(() => setCurrentTime(new Date()), 1000);
    } else {
      // Custom time progression
      timer = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = new Date(prevTime);
          newTime.setSeconds(newTime.getSeconds() + timeSpeed);
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [useCustomTime, timeSpeed]);

  // Test controls keyboard shortcut (Shift+T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setShowTestControls(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Optional font preloading
  useEffect(() => {
    document.documentElement.classList.add('font-loaded');
    return () => document.documentElement.classList.remove('font-loaded');
  }, []);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black flex flex-col items-center p-2 pt-3 pb-16">
      {/* Background elements */}
      <BackgroundElements />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-2 sm:px-4 w-full h-full flex flex-col">
        {/* More compact header section with larger font */}
        <header className="mb-2 md:mb-3">
          {/* Main title with glitch effect */}
          <div className="hero-container glassmorphism-deep shadow-lg py-3 px-3 md:py-4 md:px-4">
            {/* Main title - keep the same since it's already large */}
            <h1 className={`hero glitch layers ${headingFont.className}`} data-text="IntrusionX">
              <span>IntrusionX</span>
            </h1>
            
            {/* Year indicator - larger */}
            <div className="mt-1 flex items-center justify-center">
              <div className="h-[3px] w-10 md:w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
              <p className="neon-text mx-2 font-orbitron text-2xl md:text-3xl font-bold tracking-widest text-cyan-400">2025</p>
              <div className="h-[3px] w-10 md:w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
            </div>
            
            {/* Subtitle - larger */}
            <p className="mt-1 font-orbitron text-sm tracking-[0.2em] text-cyan-300 font-medium">
              THE ULTIMATE CYBERSECURITY SHOWDOWN!
            </p>
          </div>
        </header>
        
        {/* Timeline component */}
        <section className="flex-1 overflow-hidden">
          <Timeline 
            currentTime={currentTime} 
            events={events} 
            useCustomTime={useCustomTime}
          />
        </section>
      </div>
      
      {/* Test controls modal with font selection */}
      {showTestControls && (
        <TestControls 
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          useCustomTime={useCustomTime}
          setUseCustomTime={setUseCustomTime}
          timeSpeed={timeSpeed}
          setTimeSpeed={setTimeSpeed}
          headingFont={headingFont}
          setHeadingFont={setHeadingFont}
          availableFonts={headingFonts}
          events={events}
          setEvents={setEvents}
          onClose={() => setShowTestControls(false)}
        />
      )}
      
      {/* Mini time controls with larger text */}
      <MiniTimeControls 
        useCustomTime={useCustomTime}
        setUseCustomTime={setUseCustomTime}
        timeSpeed={timeSpeed}
        setTimeSpeed={setTimeSpeed}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        openFullControls={() => setShowTestControls(true)}
      />
      
      {/* Footer with larger text */}
      <footer className="fixed bottom-2 right-2 z-30">
        <div className="glassmorphism rounded-full px-4 py-1.5 text-xs text-cyan-400 shadow-glow transition-all duration-300 hover:text-cyan-300">
          Press <kbd className="mx-1 rounded bg-cyan-900 px-1.5 py-0.5 font-mono text-white">Shift+T</kbd> for controls
        </div>
      </footer>
    </div>
  );
};

// Extracted background component for cleaner JSX
const BackgroundElements = () => (
  <>
    {/* Grid pattern */}
    <div className="fixed inset-0 z-0 opacity-20">
      <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMkQzRUUiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEydi0xMnptLTE4LTZoMTJ2LTEyaC0xMnYxMnptMTIgMGgxMnYtMTJoLTEydjEyem0tMTIgMTJoMTJ2LTEyaC0xMnYxMnptMTggMGgxMnYtMTJoLTEydjEyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>
    </div>
    
    {/* Improved floating particles with better distribution */}
    <div className="fixed inset-0 z-0 opacity-30">
      {Array.from({ length: 20 }).map((_, i) => {
        // Calculate size based on position for more natural effect
        const size = Math.random() * 100 + 20;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        return (
          <div 
            key={i}
            className="absolute rounded-full bg-cyan-400 blur-xl"
            style={{
              top: `${yPos}%`,
              left: `${xPos}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.1 + (Math.random() * 0.15),
              animation: `float ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
    
    {/* Added subtle scanlines effect */}
    <div className="fixed inset-0 z-0 bg-scanlines opacity-5 pointer-events-none"></div>
  </>
);

export default App;
