
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
        <header className="mb-8 flex justify-center text-center items-center relative z-40">
          <GlitchEffect>

            <h1 className="text-xl md:text-3xl font-bold neon-green tracking-wider uppercase">
              IntrusionX
            </h1>
            <h3 className="text-xl md:text-xl underline font-bold neon-green tracking-wider uppercase">
              The ultimate cyber showdown!
            </h3>
          </GlitchEffect>

          

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
