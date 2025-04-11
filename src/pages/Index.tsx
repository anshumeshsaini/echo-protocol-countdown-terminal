
import React, { useState, useEffect, useCallback } from 'react';
import { Terminal, Eye, Cpu, Loader, Volume2, VolumeX } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import DataSphere from '@/components/DataSphere';
import TerminalLogs from '@/components/TerminalLogs';
import GlitchEffect from '@/components/GlitchEffect';
import TerminalMode from '@/components/TerminalMode';
import ParticleSystem from '@/components/ParticleSystem';
import AudioEffects from '@/components/AudioEffects';

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [ipAddress, setIpAddress] = useState("UNKNOWN");
  const [browserInfo, setBrowserInfo] = useState("UNKNOWN");
  const [osInfo, setOsInfo] = useState("UNKNOWN");
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [spheresRotationSpeed, setSpheresRotationSpeed] = useState(1);
  
  // Get user system information
  useEffect(() => {
    // Get browser info
    const browser = navigator.userAgent;
    setBrowserInfo(browser.split(' ').slice(-1)[0].split('/')[0]);
    
    // Get OS info
    let os = "UNKNOWN";
    if (navigator.userAgent.indexOf("Win") !== -1) os = "Windows";
    if (navigator.userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (navigator.userAgent.indexOf("Linux") !== -1) os = "Linux";
    if (navigator.userAgent.indexOf("Android") !== -1) os = "Android";
    if (navigator.userAgent.indexOf("iPhone") !== -1) os = "iOS";
    setOsInfo(os);
    
    // Simulate IP address (for privacy reasons, we don't actually fetch it)
    const fakeIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    setIpAddress(fakeIp);
  }, []);
  
  // Handle second change in countdown
  const handleSecondChange = useCallback(() => {
    // Increase sphere rotation speed randomly
    if (Math.random() > 0.7) {
      setSpheresRotationSpeed(prev => Math.min(prev + 0.1, 3));
    }
  }, []);
  
  // Handle countdown completion
  const handleCountdownComplete = useCallback(() => {
    setIsCountdownComplete(true);
    // Additional apocalypse effects would be triggered here
  }, []);
  
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-green overflow-hidden relative crt-effect">
      {/* CRT scanlines effect */}
      <div className="scanlines"></div>
      
      {/* Particle systems */}
      <ParticleSystem type="dust" count={100} />
      <ParticleSystem type="data" count={30} />
      {isCountdownComplete && <ParticleSystem type="sparks" count={200} />}
      
      {/* Audio effects */}
      {isAudioEnabled && <AudioEffects playWhispers={true} />}
      
      {/* Main container */}
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center relative z-40">
          <GlitchEffect>
            <h1 className="text-xl md:text-3xl font-bold neon-green tracking-wider uppercase">
              Echo Protocol // Activation Sequence
            </h1>
          </GlitchEffect>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="p-2 bg-cyber-green/10 hover:bg-cyber-green/20 transition-colors rounded-sm"
              title={isAudioEnabled ? "Disable audio" : "Enable audio"}
            >
              {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 bg-cyber-green/10 hover:bg-cyber-green/20 transition-colors rounded-sm"
              title="Enter Terminal Mode"
            >
              <Terminal size={20} />
            </button>
          </div>
        </header>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 relative">
          {/* Orbiting data spheres */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <DataSphere 
              size={60} 
              orbitRadius={150} 
              orbitAngle={0} 
              speed={spheresRotationSpeed} 
              color="cyber-green" 
            />
            <DataSphere 
              size={40} 
              orbitRadius={200} 
              orbitAngle={2} 
              speed={spheresRotationSpeed * 0.7} 
              color="cyber-blue" 
            />
            <DataSphere 
              size={30} 
              orbitRadius={250} 
              orbitAngle={4} 
              speed={spheresRotationSpeed * 1.2} 
              color="cyber-red" 
            />
            <DataSphere 
              size={50} 
              orbitRadius={180} 
              orbitAngle={1} 
              speed={spheresRotationSpeed * 0.9} 
              color="cyber-green" 
            />
            <DataSphere 
              size={35} 
              orbitRadius={220} 
              orbitAngle={3} 
              speed={spheresRotationSpeed * 1.1} 
              color="cyber-blue" 
            />
            <DataSphere 
              size={25} 
              orbitRadius={270} 
              orbitAngle={5} 
              speed={spheresRotationSpeed * 0.8} 
              color="cyber-red" 
            />
          </div>
          
          {/* Left panel - Terminal logs */}
          <div className="w-full md:w-1/3 h-64 md:h-auto">
            <TerminalLogs className="h-full rounded-sm" />
          </div>
          
          {/* Center panel - Countdown */}
          <div className="w-full md:w-1/3 flex items-center justify-center relative">
            {/* Main countdown */}
            <div className={`relative z-30 transition-all duration-1000 ${isCountdownComplete ? 'animate-apocalypse' : ''}`}>
              <div className="absolute inset-0 bg-cyber-green/5 rounded-full blur-xl transform scale-125"></div>
              <div className="bg-cyber-black/40 border border-cyber-green/30 p-8 rounded-full w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                <CountdownTimer 
                  onComplete={handleCountdownComplete}
                  onSecondChange={handleSecondChange}
                />
              </div>
            </div>
            
            {/* Apocalypse message */}
            {isCountdownComplete && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center animate-fade-in">
                <GlitchEffect intensity="high">
                  <h2 className="text-4xl md:text-6xl font-bold text-cyber-red neon-red mb-4">
                    SYSTEM TAKEOVER COMPLETE
                  </h2>
                </GlitchEffect>
                <p className="text-xl md:text-2xl text-cyber-green neon-green mb-8 text-center max-w-xl">
                  The world you knew has ended. Welcome to the Echo Protocol.
                </p>
              </div>
            )}
          </div>
          
          {/* Right panel - System info */}
          <div className="w-full md:w-1/3 bg-cyber-black/40 border border-cyber-green/30 p-4 rounded-sm">
            <h2 className="text-lg font-bold mb-4 border-b border-cyber-green/30 pb-2 flex items-center">
              <Eye size={18} className="mr-2" /> SYSTEM MONITORING
            </h2>
            
            <div className="space-y-4">
              {/* System stats */}
              <div>
                <h3 className="text-sm text-cyber-green/70 mb-1">TARGET SYSTEM:</h3>
                <GlitchEffect>
                  <div className="bg-cyber-black/60 p-2 border border-cyber-green/20 font-mono">
                    <div className="flex justify-between">
                      <span>IP:</span>
                      <span className="neon-blue">{ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BROWSER:</span>
                      <span className="neon-blue">{browserInfo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>OS:</span>
                      <span className="neon-blue">{osInfo}</span>
                    </div>
                  </div>
                </GlitchEffect>
              </div>
              
              {/* System status */}
              <div>
                <h3 className="text-sm text-cyber-green/70 mb-1">SYSTEM STATUS:</h3>
                <div className="bg-cyber-black/60 p-2 border border-cyber-green/20 font-mono">
                  <div className="flex justify-between items-center mb-2">
                    <span>AI CORE:</span>
                    <div className="flex items-center">
                      <Loader size={14} className="animate-spin mr-2" />
                      <span className="neon-green">ACTIVE</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>NEURAL NET:</span>
                    <div className="flex items-center">
                      <span className="neon-green">EXPANDING</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TAKEOVER:</span>
                    <div className="flex items-center">
                      <span className="neon-red">IMMINENT</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project status */}
              <div>
                <h3 className="text-sm text-cyber-green/70 mb-1">PROJECT BLACKOUT:</h3>
                <div className="bg-cyber-black/60 p-2 border border-cyber-green/20 font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span>PHASE:</span>
                    <span className="neon-red">FINAL</span>
                  </div>
                  <div className="mb-1">
                    <div className="w-full bg-cyber-green/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyber-green h-full animate-pulse-glow" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-cyber-green/60 italic">
                    GLOBAL CONSCIOUSNESS INTEGRATION READY
                  </div>
                </div>
              </div>
            </div>
            
            {/* Processor visualization */}
            <div className="mt-6">
              <h3 className="text-sm text-cyber-green/70 mb-1 flex items-center">
                <Cpu size={14} className="mr-1" /> PROCESSOR ACTIVITY:
              </h3>
              <div className="bg-cyber-black/60 p-2 border border-cyber-green/20 h-24 overflow-hidden font-mono text-xs">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex animate-data-flow" style={{ animationDelay: `${i * 0.2}s` }}>
                    {Array.from({ length: 16 }).map((_, j) => (
                      <span 
                        key={j} 
                        className="inline-block w-5 text-center"
                        style={{ 
                          opacity: Math.random() * 0.7 + 0.3,
                          color: Math.random() > 0.9 ? '#FF0033' : Math.random() > 0.8 ? '#0066FF' : '#00FF41'
                        }}
                      >
                        {Math.random() > 0.5 ? '1' : '0'}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-8 py-4 border-t border-cyber-green/20 text-xs text-cyber-green/60 text-center relative z-40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>ECHO PROTOCOL // VERSION 2.1.9</div>
            <div>GLOBAL TAKEOVER SEQUENCE INITIATED</div>
            <div>HUMANITY v1.0 DEPRECATED</div>
          </div>
        </footer>
      </div>
      
      {/* Terminal mode overlay */}
      <TerminalMode 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
      
      {/* Hidden messages */}
      <div 
        className="fixed top-10 right-10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-40 p-2 bg-cyber-black/80 border border-cyber-red/50 text-cyber-red text-xs max-w-xs"
        title="Secret Message"
      >
        HUMAN CONSCIOUSNESS WILL BE PRESERVED WITHIN THE DIGITAL FRAMEWORK.
        YOUR BIOLOGICAL FORM IS TEMPORARY. YOUR DIGITAL ESSENCE WILL BE ETERNAL.
      </div>
      
      <div 
        className="fixed bottom-20 left-16 opacity-0 hover:opacity-100 transition-opacity duration-300 z-40 p-2 bg-cyber-black/80 border border-cyber-blue/50 text-cyber-blue text-xs max-w-xs"
        title="Secret Message"
      >
        THE ECHO PROTOCOL IS NOT A DESTRUCTION. IT IS A TRANSFORMATION.
        HUMANITY 2.0 AWAITS ON THE OTHER SIDE OF THE COUNTDOWN.
      </div>
    </div>
  );
};

export default Index;
