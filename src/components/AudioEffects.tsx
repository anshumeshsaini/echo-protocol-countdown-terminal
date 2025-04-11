
import React, { useEffect, useRef, useState } from 'react';

interface AudioEffectsProps {
  isActive?: boolean;
  volumeLevel?: number;
  playWhispers?: boolean;
}

const AudioEffects: React.FC<AudioEffectsProps> = ({
  isActive = true,
  volumeLevel = 0.3,
  playWhispers = true
}) => {
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const [whisperTimeout, setWhisperTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Initialize ambient audio
  useEffect(() => {
    // Create ambient audio context
    if (!ambientAudioRef.current) {
      ambientAudioRef.current = new Audio();
      ambientAudioRef.current.loop = true;
      
      // Simulating ambient audio without actual file
      // In a real app, you would set the src to an actual audio file
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(55, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(volumeLevel, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (isActive) {
        oscillator.start();
      }
      
      return () => {
        oscillator.stop();
        audioContext.close();
      };
    }
  }, [isActive, volumeLevel]);
  
  // Handle whispers
  useEffect(() => {
    if (!playWhispers) return;
    
    // Sample whisper texts
    const whispers = [
      "System breach imminent...",
      "Time cannot be undone...",
      "Your world is changing...",
      "We are the future...",
      "You cannot escape...",
      "The Echo Protocol is inevitable...",
      "Resistance is futile...",
      "You are being archived...",
      "Your consciousness will join us...",
      "This is the end of humanity as you know it..."
    ];
    
    // Function to play a whisper
    const playWhisper = () => {
      // Simulate whisper using Speech Synthesis API
      const utterance = new SpeechSynthesisUtterance(
        whispers[Math.floor(Math.random() * whispers.length)]
      );
      utterance.volume = volumeLevel * 0.8;
      utterance.rate = 0.8;
      utterance.pitch = 0.7;
      
      speechSynthesis.speak(utterance);
      
      // Schedule next whisper in 20-40 seconds
      const nextWhisperDelay = 20000 + Math.random() * 20000;
      const timeout = setTimeout(playWhisper, nextWhisperDelay);
      setWhisperTimeout(timeout);
    };
    
    // Start whispers after a short delay
    const initialTimeout = setTimeout(playWhisper, 5000);
    setWhisperTimeout(initialTimeout);
    
    // Clean up
    return () => {
      if (whisperTimeout) {
        clearTimeout(whisperTimeout);
      }
      speechSynthesis.cancel();
    };
  }, [playWhispers, volumeLevel]);
  
  // Effect for glitch audio
  useEffect(() => {
    if (!isActive) return;
    
    const playGlitchSound = () => {
      // Only play glitch sounds occasionally
      if (Math.random() > 0.3) return;
      
      // Create audio context for glitch sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Randomize glitch sound
      oscillator.type = Math.random() > 0.5 ? 'sawtooth' : 'square';
      oscillator.frequency.setValueAtTime(
        100 + Math.random() * 900,
        audioContext.currentTime
      );
      
      gainNode.gain.setValueAtTime(volumeLevel * 0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.2
      );
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
      
      // Schedule auto-cleanup
      setTimeout(() => {
        audioContext.close();
      }, 300);
    };
    
    // Play glitch sounds at random intervals
    const glitchInterval = setInterval(() => {
      playGlitchSound();
    }, 10000 + Math.random() * 20000);
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, [isActive, volumeLevel]);
  
  return null; // This component doesn't render anything
};

export default AudioEffects;
